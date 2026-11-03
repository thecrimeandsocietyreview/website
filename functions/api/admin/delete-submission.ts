// Cloudflare Pages Function: /api/admin/delete-submission
// Permanently retires a tracking ID into the blacklist, shifts files to deleted R2 folders, and archives the record

interface Env {
  DB?: D1Database;
  MANUSCRIPTS_BUCKET?: R2Bucket;
}

/**
 * Safely moves an object in Cloudflare R2 from sourceKey to destKey
 */
async function moveR2Object(bucket: R2Bucket, sourceKey: string, destKey: string): Promise<boolean> {
  if (!sourceKey || !destKey || sourceKey === destKey) return false;
  try {
    const sourceObj = await bucket.get(sourceKey);
    if (!sourceObj) {
      console.warn(`[R2 Move] Source file not found: ${sourceKey}`);
      return false;
    }

    const buffer = await sourceObj.arrayBuffer();
    await bucket.put(destKey, buffer, {
      httpMetadata: sourceObj.httpMetadata,
      customMetadata: sourceObj.customMetadata,
    });

    await bucket.delete(sourceKey);
    console.log(`[R2 Move] Successfully shifted ${sourceKey} -> ${destKey}`);
    return true;
  } catch (err) {
    console.error(`[R2 Move Error] Failed to move ${sourceKey} to ${destKey}:`, err);
    return false;
  }
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    if (!context.env.DB) {
      return new Response(
        JSON.stringify({ success: false, message: "Cloudflare D1 database binding not available." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const body: any = await context.request.json().catch(() => null);
    if (!body || !body.trackingNumber) {
      return new Response(
        JSON.stringify({ success: false, message: "Tracking number is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const trackingNumber = body.trackingNumber.trim();
    const reason = body.reason || "Withdrawn or deleted by Editorial Office";
    const nowIso = new Date().toISOString();

    // 1. Ensure deleted_submissions table exists
    await context.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS deleted_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_id INTEGER,
        tracking_number TEXT NOT NULL,
        author_name TEXT,
        author_email TEXT,
        author_phone TEXT,
        title TEXT,
        article_type TEXT,
        abstract TEXT,
        keywords TEXT,
        blind_file_key TEXT,
        blind_file_name TEXT,
        blind_file_size TEXT,
        author_file_key TEXT,
        author_file_name TEXT,
        author_file_size TEXT,
        status TEXT,
        stage_number INTEGER,
        editorial_decision_notes TEXT,
        assigned_reviewers TEXT,
        submitted_at TEXT,
        deleted_at TEXT NOT NULL,
        deletion_reason TEXT
      );
    `).run().catch((e) => console.log("Create deleted table fallback:", e));

    // 2. Fetch the target submission row before deletion
    const sub: any = await context.env.DB.prepare(
      `SELECT * FROM submissions WHERE tracking_number = ?`
    )
      .bind(trackingNumber)
      .first();

    if (!sub) {
      return new Response(
        JSON.stringify({ success: false, message: `Submission with Tracking ID ${trackingNumber} not found.` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Calculate target storage keys in deleted folders
    // Folder 1: deleted_blind-manuscripts
    let newBlindKey = sub.blind_file_key || "";
    if (newBlindKey) {
      if (newBlindKey.startsWith("blind-manuscripts/")) {
        newBlindKey = newBlindKey.replace(/^blind-manuscripts\//, "deleted_blind-manuscripts/");
      } else if (!newBlindKey.startsWith("deleted_blind-manuscripts/")) {
        newBlindKey = `deleted_blind-manuscripts/${newBlindKey}`;
      }
    }

    // Folder 2: deleted_author-dossier
    let newAuthorKey = sub.author_file_key || "";
    if (newAuthorKey) {
      if (newAuthorKey.startsWith("author-dossiers/")) {
        newAuthorKey = newAuthorKey.replace(/^author-dossiers\//, "deleted_author-dossier/");
      } else if (!newAuthorKey.startsWith("deleted_author-dossier/")) {
        newAuthorKey = `deleted_author-dossier/${newAuthorKey}`;
      }
    }

    // 4. Shift files from active bucket folders to deleted folders in R2
    if (context.env.MANUSCRIPTS_BUCKET) {
      if (sub.blind_file_key && sub.blind_file_key !== newBlindKey) {
        await moveR2Object(context.env.MANUSCRIPTS_BUCKET, sub.blind_file_key, newBlindKey);
      }
      if (sub.author_file_key && sub.author_file_key !== newAuthorKey) {
        await moveR2Object(context.env.MANUSCRIPTS_BUCKET, sub.author_file_key, newAuthorKey);
      }
    }

    // 5. Insert submission record into deleted_submissions with updated file keys
    await context.env.DB.prepare(`
      INSERT INTO deleted_submissions (
        original_id, tracking_number, author_name, author_email, author_phone,
        title, article_type, abstract, keywords,
        blind_file_key, blind_file_name, blind_file_size,
        author_file_key, author_file_name, author_file_size,
        status, stage_number, editorial_decision_notes, assigned_reviewers,
        submitted_at, deleted_at, deletion_reason
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `)
      .bind(
        sub.id,
        sub.tracking_number,
        sub.author_name,
        sub.author_email,
        sub.author_phone || sub.authorPhone || "",
        sub.title,
        sub.article_type,
        sub.abstract,
        sub.keywords,
        newBlindKey,
        sub.blind_file_name,
        sub.blind_file_size,
        newAuthorKey,
        sub.author_file_name,
        sub.author_file_size,
        sub.status,
        sub.stage_number || 1,
        sub.editorial_decision_notes || "",
        sub.assigned_reviewers || "[]",
        sub.submitted_at,
        nowIso,
        reason
      )
      .run()
      .catch((e) => console.log("Backup to deleted_submissions error:", e));

    // 6. Blacklist the tracking ID into retired_tracking_ids so it can NEVER be reused
    await context.env.DB.prepare(`
      INSERT OR IGNORE INTO retired_tracking_ids (tracking_number, retired_at, reason)
      VALUES (?, ?, ?)
    `)
      .bind(trackingNumber, nowIso, reason)
      .run()
      .catch((e) => console.log("Retire insert fallback:", e));

    // 7. Permanently delete from active submissions table
    await context.env.DB.prepare(`
      DELETE FROM submissions WHERE tracking_number = ?
    `)
      .bind(trackingNumber)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Submission ${trackingNumber} deleted. Files safely shifted to deleted folders in R2.`,
        shiftedFiles: {
          blindFile: newBlindKey,
          authorFile: newAuthorKey,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Admin delete submission error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to delete submission from D1." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
