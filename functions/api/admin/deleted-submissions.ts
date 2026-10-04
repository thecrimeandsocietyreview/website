// Cloudflare Pages Function: /api/admin/deleted-submissions
// Lists submissions saved in deleted_submissions for admin safety review & restore

interface Env {
  DB?: D1Database;
}

export const onRequestGet = async (context: {
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

    // Ensure deleted_submissions table exists
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
    `).run().catch(() => {});

    const { results } = await context.env.DB.prepare(
      `SELECT * FROM deleted_submissions ORDER BY id DESC`
    ).all();

    return new Response(
      JSON.stringify({
        success: true,
        count: results ? results.length : 0,
        deletedSubmissions: results || [],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Admin fetch deleted submissions error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to query deleted submissions." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
