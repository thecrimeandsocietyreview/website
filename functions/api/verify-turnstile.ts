// Cloudflare Pages Function: /api/verify-turnstile
// Implements canonical server-side Turnstile siteverify

interface Env {
  TURNSTILE_SECRET?: string;
  CLOUDFLARE_TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_HOSTNAMES?: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    const body = (await context.request.json()) as { token?: string; action?: string };
    const token = body?.token;
    const action = body?.action || "submit_manuscript";

    const secretKey = context.env.TURNSTILE_SECRET || context.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

    if (!token || typeof token !== "string" || token.length === 0 || token.length > 2048) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid or missing Turnstile token." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!secretKey) {
      // In local dev without wrangler secret, allow graceful bypass
      return new Response(
        JSON.stringify({ success: true, message: "Development bypass - secret key not set in environment" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const clientIp =
      context.request.headers.get("CF-Connecting-IP") ||
      context.request.headers.get("x-forwarded-for") ||
      "";

    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (clientIp) {
      formData.append("remoteip", clientIp);
    }

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    if (!verifyRes.ok) {
      return new Response(
        JSON.stringify({ success: false, message: `Cloudflare verify error: ${verifyRes.status}` }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const outcome: TurnstileVerifyResponse = await verifyRes.json();

    if (!outcome.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Turnstile verification failed. Please refresh and try again.",
          errors: outcome["error-codes"],
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        hostname: outcome.hostname,
        action: outcome.action || action,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error?.message || "Internal verification error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
