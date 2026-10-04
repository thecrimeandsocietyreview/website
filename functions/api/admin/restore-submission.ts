// Cloudflare Pages Function: /api/admin/restore-submission
// Restores a submission from deleted_submissions back to active submissions

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

    // 1. Insert back into active submissions table
    await context.env.DB.prepare(`
      INSERT INTO submissions (
        tracking_number, author_name, author_email, author_phone,
        title, article_type, abstract, keywords,
        blind_file_key, blind_file_name, blind_file_size,
        author_file_key, author_file_name, author_file_size,
        status, stage_number, editorial_decision_notes, assigned_reviewers,
        submitted_at, is_archived
      )
      SELECT 
        tracking_number, author_name, author_email, author_phone,
        title, article_type, abstract, keywords,
        blind_file_key, blind_file_name, blind_file_size,
        author_file_key, author_file_name, author_file_size,
        status, stage_number, editorial_decision_notes, assigned_reviewers,
        submitted_at, 0
      FROM deleted_submissions
      WHERE tracking_number = ?
      ORDER BY id DESC LIMIT 1;
    `)
      .bind(trackingNumber)
      .run();

    // 2. Remove from retired_tracking_ids so tracking works again
    await context.env.DB.prepare(`
      DELETE FROM retired_tracking_ids WHERE tracking_number = ?;
    `)
      .bind(trackingNumber)
      .run()
      .catch(() => {});

    // 3. Remove from deleted_submissions
    await context.env.DB.prepare(`
      DELETE FROM deleted_submissions WHERE tracking_number = ?;
    `)
      .bind(trackingNumber)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Submission ${trackingNumber} has been successfully restored to active submissions.`,
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
