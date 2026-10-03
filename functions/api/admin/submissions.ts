// Cloudflare Pages Function: /api/admin/submissions
// Fetches all active manuscript submissions from Cloudflare D1 database for the Editorial Console

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
        JSON.stringify({ success: false, message: "Cloudflare D1 database binding (DB) not available." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Query active submissions ordered by newest first
    const { results } = await context.env.DB.prepare(
      `SELECT * FROM submissions WHERE is_archived = 0 ORDER BY id DESC`
    ).all();

    return new Response(
      JSON.stringify({
        success: true,
        count: results ? results.length : 0,
        submissions: results || [],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Admin fetch submissions error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to query submissions from D1 database." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
