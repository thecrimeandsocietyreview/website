// Cloudflare Pages Function: /api/admin/restore-submission
// Restores a submission from deleted_submissions back to active submissions and shifts files back to active R2 folders

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
      console.warn(`[R2 Restore Move] Source file not found: ${sourceKey}`);
      return false;
    }

    const buffer = await sourceObj.arrayBuffer();
    await bucket.put(destKey, buffer, {
      httpMetadata: sourceObj.httpMetadata,
      customMetadata: sourceObj.customMetadata,
    });

    await bucket.delete(sourceKey);
    console.log(`[R2 Restore Move] Successfully shifted ${sourceKey} -> ${destKey}`);
    return true;
  } catch (err) {
    console.error(`[R2 Restore Move Error] Failed to move ${sourceKey} to ${destKey}:`, err);
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

    // 1. Fetch latest record from deleted_submissions archive
    const deletedSub: any = await context.env.DB.prepare(
      `SELECT * FROM deleted_submissions WHERE tracking_number = ? ORDER BY id DESC LIMIT 1`
    )
      .bind(trackingNumber)
      .first();

    if (!deletedSub) {
      return new Response(
        JSON.stringify({ success: false, message: `No archive record found for ${trackingNumber}` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Compute active folder storage keys
    let restoredBlindKey = deletedSub.blind_file_key || "";
    if (restoredBlindKey) {
      if (restoredBlindKey.startsWith("deleted_blind-manuscripts/")) {
        restoredBlindKey = restoredBlindKey.replace(/^deleted_blind-manuscripts\//, "blind-manuscripts/");
      }
    }

    let restoredAuthorKey = deletedSub.author_file_key || "";
    if (restoredAuthorKey) {
      if (restoredAuthorKey.startsWith("deleted_author-dossier/")) {
        restoredAuthorKey = restoredAuthorKey.replace(/^deleted_author-dossier\//, "author-dossiers/");
      } else if (restoredAuthorKey.startsWith("deleted_author-dossiers/")) {
        restoredAuthorKey = restoredAuthorKey.replace(/^deleted_author-dossiers\//, "author-dossiers/");
      }
    }

    // 3. Shift files back to active R2 folders
    if (context.env.MANUSCRIPTS_BUCKET) {
      if (deletedSub.blind_file_key && deletedSub.blind_file_key !== restoredBlindKey) {
        await moveR2Object(context.env.MANUSCRIPTS_BUCKET, deletedSub.blind_file_key, restoredBlindKey);
      }
      if (deletedSub.author_file_key && deletedSub.author_file_key !== restoredAuthorKey) {
        await moveR2Object(context.env.MANUSCRIPTS_BUCKET, deletedSub.author_file_key, restoredAuthorKey);
      }
    }

    // 4. Insert back into active submissions table
    const nowIso = new Date().toISOString();
    await context.env.DB.prepare(`
      INSERT INTO submissions (
        tracking_number, author_name, author_email, author_phone, authorPhone,
        title, article_type, abstract, keywords,
        blind_file_key, blind_file_name, blind_file_size,
        author_file_key, author_file_name, author_file_size,
        status, stage_number, editorial_decision_notes, assigned_reviewers,
        submitted_at, is_archived, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?);
    `)
      .bind(
        deletedSub.tracking_number,
        deletedSub.author_name,
        deletedSub.author_email,
        deletedSub.author_phone || "",
        deletedSub.author_phone || "",
        deletedSub.title,
        deletedSub.article_type,
        deletedSub.abstract,
        deletedSub.keywords,
        restoredBlindKey,
        deletedSub.blind_file_name,
        deletedSub.blind_file_size,
        restoredAuthorKey,
        deletedSub.author_file_name,
        deletedSub.author_file_size,
        deletedSub.status || "Submitted",
        deletedSub.stage_number || 1,
        deletedSub.editorial_decision_notes || "",
        deletedSub.assigned_reviewers || "[]",
        deletedSub.submitted_at || nowIso,
        nowIso
      )
      .run();

    // 5. Remove from retired_tracking_ids so tracking works again
    await context.env.DB.prepare(`
      DELETE FROM retired_tracking_ids WHERE tracking_number = ?;
    `)
      .bind(trackingNumber)
      .run()
      .catch(() => {});

    // 6. Remove from deleted_submissions
    await context.env.DB.prepare(`
      DELETE FROM deleted_submissions WHERE tracking_number = ?;
    `)
      .bind(trackingNumber)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Submission ${trackingNumber} has been successfully restored to active submissions. Files shifted back to active folders.`,
        restoredFiles: {
          blindFile: restoredBlindKey,
          authorFile: restoredAuthorKey,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Admin restore submission error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to restore submission." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
