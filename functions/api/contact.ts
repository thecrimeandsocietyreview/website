// Cloudflare Pages Function: /api/contact
// Receives contact inquiries from /contact and persists to D1 table: contact_page_office_enquiry

interface Env {
  DB?: D1Database;
  TURNSTILE_SECRET?: string;
  CLOUDFLARE_TURNSTILE_SECRET_KEY?: string;
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
    console.error("D1 ensureContactTable error:", err);
  }
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    const body: any = await context.request.json().catch(() => null);
    if (!body) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid JSON payload." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const category = (body.category || "general").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();
    const turnstileToken = (body.turnstileToken || "").trim();

    // 1. Validate mandatory fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Name, email, subject, and message are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Validate Turnstile token if secret key is configured
    const secretKey = context.env.TURNSTILE_SECRET || context.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    const isProdTurnstile = secretKey && !secretKey.startsWith("1x0000");

    if (isProdTurnstile) {
      if (!turnstileToken) {
        return new Response(
          JSON.stringify({ success: false, message: "Security verification token is required. Please complete verification." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      try {
        const verifyBody = new URLSearchParams();
        verifyBody.append("secret", secretKey);
        verifyBody.append("response", turnstileToken);

        const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: verifyBody,
        });

        if (verifyRes.ok) {
          const outcome: any = await verifyRes.json();
          if (!outcome.success) {
            return new Response(
              JSON.stringify({ success: false, message: "Cloudflare security verification failed. Please try again." }),
              { status: 403, headers: { "Content-Type": "application/json" } }
            );
          }
        }
      } catch (err) {
        console.error("Turnstile verify error in contact API:", err);
      }
    }

    const nowIso = new Date().toISOString();
    const clientIp = context.request.headers.get("cf-connecting-ip") || context.request.headers.get("x-forwarded-for") || "";

    // 3. Persist to Cloudflare D1
    if (context.env.DB) {
      await ensureContactTable(context.env.DB);

      await context.env.DB.prepare(`
        INSERT INTO contact_page_office_enquiry (
          name,
          email,
          category,
          subject,
          message,
          status,
          turnstile_token,
          ip_address,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, 'New', ?, ?, ?, ?)
      `)
        .bind(
          name,
          email,
          category,
          subject,
          message,
          turnstileToken ? turnstileToken.slice(0, 32) : "",
          clientIp,
          nowIso,
          nowIso
        )
        .run();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your inquiry has been successfully dispatched to the editorial triage desk.",
        dispatchedAt: nowIso,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Contact API error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error?.message || "Internal server error while processing inquiry.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
