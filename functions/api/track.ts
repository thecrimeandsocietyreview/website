// Cloudflare Pages Function: /api/track
// Secure tracking lookup for authors using their cryptographically generated Tracking ID

interface Env {
  DB?: D1Database;
}

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    const url = new URL(context.request.url);
    const trackingNumber = url.searchParams.get("tracking")?.trim() || "";
    const email = url.searchParams.get("email")?.trim()?.toLowerCase() || "";

    if (!trackingNumber) {
      return new Response(
        JSON.stringify({ success: false, message: "Tracking ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Format validation: CSR-YYYY-XXXXXXXXXX or legacy formats
    const trackingRegex = /^CSR-[A-Z0-9_-]+$/i;
    if (!trackingRegex.test(trackingNumber)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid Tracking ID format." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!context.env.DB) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Database connection not available in current environment.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Query active submissions
    let query = `
      SELECT 
        tracking_number, 
        title, 
        article_type, 
        author_name, 
        status, 
        stage_number, 
        submitted_at, 
        updated_at,
        blind_file_name,
        author_file_name,
        editorial_decision_notes
      FROM submissions 
      WHERE tracking_number = ?
    `;
    const params: any[] = [trackingNumber];

    if (email) {
      query += ` AND LOWER(author_email) = ?`;
      params.push(email);
    }

    const submission: any = await context.env.DB.prepare(query)
      .bind(...params)
      .first();

    if (submission) {
      return new Response(
        JSON.stringify({
          success: true,
          found: true,
          submission: {
            trackingNumber: submission.tracking_number,
            title: submission.title,
            articleType: submission.article_type,
            authorName: submission.author_name,
            status: submission.status,
            stageNumber: submission.stage_number,
            submittedAt: submission.submitted_at,
            updatedAt: submission.updated_at,
            blindFileName: submission.blind_file_name || "",
            authorFileName: submission.author_file_name || "",
            decisionNotes: submission.editorial_decision_notes || "",
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Check if tracking ID was retired or permanently closed
    const retired: any = await context.env.DB.prepare(
      `SELECT tracking_number, retired_at, reason FROM retired_tracking_ids WHERE tracking_number = ?`
    )
      .bind(trackingNumber)
      .first();

    if (retired) {
      return new Response(
        JSON.stringify({
          success: true,
          found: false,
          isRetired: true,
          message: `This tracking record (${retired.tracking_number}) has been retired or withdrawn.`,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        found: false,
        message: "No manuscript found matching the provided tracking number.",
      }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Track error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error during tracking lookup.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
