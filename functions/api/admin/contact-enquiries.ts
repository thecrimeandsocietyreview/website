// Cloudflare Pages Function: /api/admin/contact-enquiries
// Manages inquiries from D1 table: contact_page_office_enquiry for the Editorial Admin Console

interface Env {
  DB?: D1Database;
}

async function ensureContactTable(db: D1Database): Promise<void> {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS contact_page_office_enquiry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        category TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New',
        turnstile_token TEXT DEFAULT '',
        ip_address TEXT DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_contact_enquiry_created ON contact_page_office_enquiry(created_at);
      CREATE INDEX IF NOT EXISTS idx_contact_enquiry_status ON contact_page_office_enquiry(status);
      CREATE INDEX IF NOT EXISTS idx_contact_enquiry_email ON contact_page_office_enquiry(email);
    `);
  } catch (err) {
    console.error("D1 ensureContactTable error in admin:", err);
  }
}

// 1. GET: Fetch all inquiries
export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    if (!context.env.DB) {
      return new Response(
        JSON.stringify({ success: false, message: "D1 database connection unavailable." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    await ensureContactTable(context.env.DB);

    const { results } = await context.env.DB.prepare(
      `SELECT * FROM contact_page_office_enquiry ORDER BY id DESC`
    ).all();

    return new Response(
      JSON.stringify({
        success: true,
        count: results ? results.length : 0,
        enquiries: results || [],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Fetch contact enquiries error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to load enquiries from D1." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

// 2. POST: Update inquiry status or delete
export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    if (!context.env.DB) {
      return new Response(
        JSON.stringify({ success: false, message: "D1 database connection unavailable." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const body: any = await context.request.json().catch(() => null);
    if (!body || !body.id) {
      return new Response(
        JSON.stringify({ success: false, message: "Enquiry ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const enquiryId = Number(body.id);
    const action = body.action || "update_status"; // 'update_status' | 'delete'
    const status = body.status || "Replied";
    const nowIso = new Date().toISOString();

    if (action === "delete") {
      await context.env.DB.prepare(
        `DELETE FROM contact_page_office_enquiry WHERE id = ?`
      )
        .bind(enquiryId)
        .run();

      return new Response(
        JSON.stringify({ success: true, message: `Enquiry #${enquiryId} successfully deleted.` }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Default: update status
    await context.env.DB.prepare(
      `UPDATE contact_page_office_enquiry SET status = ?, updated_at = ? WHERE id = ?`
    )
      .bind(status, nowIso, enquiryId)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Enquiry #${enquiryId} status updated to ${status}.`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Update contact enquiry error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Failed to update enquiry." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
