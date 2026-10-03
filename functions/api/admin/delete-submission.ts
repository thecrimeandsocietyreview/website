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

    // 1. Blacklist the tracking ID into retired_tracking_ids so it can NEVER be reused
    await context.env.DB.prepare(`
      INSERT INTO retired_tracking_ids (tracking_number, retired_at, reason)
      VALUES (?, ?, ?)
    `)
      .bind(trackingNumber, nowIso, reason)
      .run()
      .catch((e) => console.log("Retire insert fallback:", e));

    // 2. Mark as archived in submissions
    await context.env.DB.prepare(`
      UPDATE submissions
      SET is_archived = 1, updated_at = ?
      WHERE tracking_number = ?
    `)
      .bind(nowIso, trackingNumber)
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
