// Cloudflare Pages Function: /api/admin/permanent-delete-submission
// Permanently purges all files from Cloudflare R2 and deletes all records from D1 (no backup table retained)

interface Env {
  DB?: D1Database;
  MANUSCRIPTS_BUCKET?: R2Bucket;
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
    const reason = body.reason || "Permanently deleted by Editorial Office";
    const nowIso = new Date().toISOString();

    // 1. Fetch record to locate all R2 file keys before deleting
    let delSub: any = await context.env.DB.prepare(
      `SELECT * FROM deleted_submissions WHERE tracking_number = ? ORDER BY id DESC LIMIT 1`
    ).bind(trackingNumber).first();

    // Fallback: check submissions if not found in deleted_submissions
    if (!delSub) {
      delSub = await context.env.DB.prepare(
        `SELECT * FROM submissions WHERE tracking_number = ? LIMIT 1`
      ).bind(trackingNumber).first();
    }

    if (!delSub) {
      return new Response(
        JSON.stringify({ success: false, message: `Submission ${trackingNumber} not found.` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Permanently delete all files from Cloudflare R2 bucket
    if (context.env.MANUSCRIPTS_BUCKET) {
      const keysToDelete: string[] = [];
      if (delSub.blind_file_key) keysToDelete.push(delSub.blind_file_key);
      if (delSub.author_file_key) keysToDelete.push(delSub.author_file_key);

      // Also clean up any possible active or deleted path variants
      if (delSub.blind_file_name) {
        const cleanBlind = delSub.blind_file_name.replace(/[^a-zA-Z0-9._-]/g, "_");
        keysToDelete.push(`deleted_blind-manuscripts/${trackingNumber}/${cleanBlind}`);
        keysToDelete.push(`blind-manuscripts/${trackingNumber}/${cleanBlind}`);
      }
      if (delSub.author_file_name) {
        const cleanAuthor = delSub.author_file_name.replace(/[^a-zA-Z0-9._-]/g, "_");
        keysToDelete.push(`deleted_author-dossier/${trackingNumber}/${cleanAuthor}`);
        keysToDelete.push(`author-dossiers/${trackingNumber}/${cleanAuthor}`);
      }

      for (const key of Array.from(new Set(keysToDelete))) {
        try {
          await context.env.MANUSCRIPTS_BUCKET.delete(key);
        } catch (e) {
          console.warn(`[R2 Permanent Delete] Error deleting key ${key}:`, e);
        }
      }
    }

    // 3. Keep tracking number in retired_tracking_ids so the ID is never reissued
    await context.env.DB.prepare(`
      INSERT OR REPLACE INTO retired_tracking_ids (tracking_number, retired_at, reason)
      VALUES (?, ?, ?);
    `).bind(trackingNumber, nowIso, `Permanently deleted: ${reason}`).run().catch(() => {});

    // 4. Permanently erase record from deleted_submissions and submissions
    await context.env.DB.prepare(`DELETE FROM deleted_submissions WHERE tracking_number = ?`).bind(trackingNumber).run();
    await context.env.DB.prepare(`DELETE FROM submissions WHERE tracking_number = ?`).bind(trackingNumber).run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Submission ${trackingNumber} and all its uploaded files have been permanently deleted.`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Admin permanent delete error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to permanently delete submission." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
