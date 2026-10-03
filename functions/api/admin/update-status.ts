// Cloudflare Pages Function: /api/admin/update-status
// Updates manuscript lifecycle status and editorial decision in Cloudflare D1 database

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

    const {
      trackingNumber,
      status,
      stageNumber,
      editorialDecisionNotes = "",
      assignedReviewers = "[]",
    } = body;

    const nowIso = new Date().toISOString();

    await context.env.DB.prepare(`
      UPDATE submissions
      SET 
        status = ?,
        stage_number = ?,
        editorial_decision_notes = ?,
        assigned_reviewers = ?,
        updated_at = ?
      WHERE tracking_number = ?
    `)
      .bind(
        status,
        stageNumber || 1,
        editorialDecisionNotes,
        typeof assignedReviewers === "string" ? assignedReviewers : JSON.stringify(assignedReviewers),
        nowIso,
        trackingNumber
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Manuscript ${trackingNumber} status updated to '${status}' in Cloudflare D1.`,
        updatedAt: nowIso,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Admin update status error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to update status in D1 database." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
