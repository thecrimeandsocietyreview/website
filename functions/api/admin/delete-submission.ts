// Cloudflare Pages Function: /api/admin/delete-submission
// Permanently retires a tracking ID into the blacklist and removes the submission record

interface Env {
  DB?: D1Database;
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

    // 1. Ensure deleted_submissions table exists and backup the full record
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

    await context.env.DB.prepare(`
      INSERT INTO deleted_submissions (
        original_id, tracking_number, author_name, author_email, author_phone,
        title, article_type, abstract, keywords,
        blind_file_key, blind_file_name, blind_file_size,
        author_file_key, author_file_name, author_file_size,
        status, stage_number, editorial_decision_notes, assigned_reviewers,
        submitted_at, deleted_at, deletion_reason
      )
      SELECT 
        id, tracking_number, author_name, author_email, author_phone,
        title, article_type, abstract, keywords,
        blind_file_key, blind_file_name, blind_file_size,
        author_file_key, author_file_name, author_file_size,
        status, stage_number, editorial_decision_notes, assigned_reviewers,
        submitted_at, ?, ?
      FROM submissions
      WHERE tracking_number = ?;
    `)
      .bind(nowIso, reason, trackingNumber)
      .run()
      .catch((e) => console.log("Backup to deleted_submissions error:", e));

    // 2. Blacklist the tracking ID into retired_tracking_ids so it can NEVER be reused
    await context.env.DB.prepare(`
      INSERT OR IGNORE INTO retired_tracking_ids (tracking_number, retired_at, reason)
      VALUES (?, ?, ?)
    `)
      .bind(trackingNumber, nowIso, reason)
      .run()
      .catch((e) => console.log("Retire insert fallback:", e));

    // 3. Permanently delete from active submissions table
    await context.env.DB.prepare(`
      DELETE FROM submissions WHERE tracking_number = ?
    `)
      .bind(trackingNumber)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Submission ${trackingNumber} deleted and permanently retired from the tracking system.`,
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
