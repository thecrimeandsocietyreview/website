import { onRequestPost as submitManuscriptPost } from "./api/submit-manuscript";
import { onRequestGet as trackGet } from "./api/track";
import { onRequestPost as verifyTurnstilePost } from "./api/verify-turnstile";
import { onRequestPost as adminLoginPost } from "./api/admin/login";
import { onRequestGet as adminSubmissionsGet } from "./api/admin/submissions";
import { onRequestGet as adminDownloadGet } from "./api/admin/download";
import { onRequestPost as adminUpdateStatusPost } from "./api/admin/update-status";
import { onRequestPost as adminDeleteSubmissionPost } from "./api/admin/delete-submission";
import { onRequestPost as contactPost } from "./api/contact";
import { onRequestGet as adminContactEnquiriesGet, onRequestPost as adminContactEnquiriesPost } from "./api/admin/contact-enquiries";
import { onRequestGet as adminDeletedSubmissionsGet } from "./api/admin/deleted-submissions";
import { onRequestPost as adminRestoreSubmissionPost } from "./api/admin/restore-submission";
import { verifyAdminRequest } from "./api/admin/auth";

export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  DB?: D1Database;
  MANUSCRIPTS_BUCKET?: R2Bucket;
  TURNSTILE_SECRET?: string;
  CLOUDFLARE_TURNSTILE_SECRET_KEY?: string;
  JWT_SECRET?: string;
}

function getCorsOrigin(request: Request): string {
  const origin = request.headers.get("Origin");
  if (!origin) return "*";
  try {
    const originUrl = new URL(origin);
    const host = originUrl.hostname.toLowerCase();
    if (
      host === "thecsrjournal.com" ||
      host.endsWith(".thecsrjournal.com") ||
      host === "localhost" ||
      host === "127.0.0.1"
    ) {
      return origin;
    }
  } catch (e) {}
  return "https://thecsrjournal.com";
}

function getSecurityHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };
}

function addCorsAndSecurity(response: Response, request: Request): Response {
  const newHeaders = new Headers(response.headers);
  const allowedOrigin = getCorsOrigin(request);
  newHeaders.set("Access-Control-Allow-Origin", allowedOrigin);
  if (allowedOrigin !== "*") {
    newHeaders.set("Access-Control-Allow-Credentials", "true");
  }

  const sec = getSecurityHeaders();
  for (const [k, v] of Object.entries(sec)) {
    if (!newHeaders.has(k)) {
      newHeaders.set(k, v);
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

function jsonError(message: string, status: number, request: Request): Response {
  const res = new Response(JSON.stringify({ success: false, message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
  return addCorsAndSecurity(res, request);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method.toUpperCase();

    // CORS preflight
    if (pathname.startsWith("/api/") && method === "OPTIONS") {
      const allowedOrigin = getCorsOrigin(request);
      const preflightHeaders: Record<string, string> = {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      };
      if (allowedOrigin !== "*") {
        preflightHeaders["Access-Control-Allow-Credentials"] = "true";
      }
      return new Response(null, {
        status: 204,
        headers: preflightHeaders,
      });
    }

    // =========================================================================
    // ADMIN AUTHENTICATION GATEWAY
    // All /api/admin/* endpoints (except /api/admin/login) REQUIRE valid JWT
    // =========================================================================
    if (pathname.startsWith("/api/admin/") && pathname !== "/api/admin/login") {
      const auth = await verifyAdminRequest(request, env);
      if (!auth.authorized) {
        return jsonError(auth.error || "Unauthorized. Valid administrator session required.", 401, request);
      }
    }

    // Admin Session Verification Check
    if (pathname === "/api/admin/verify") {
      const auth = await verifyAdminRequest(request, env);
      if (!auth.authorized) {
        return jsonError(auth.error || "Invalid session.", 401, request);
      }
      return addCorsAndSecurity(
        new Response(JSON.stringify({ success: true, user: auth.user }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
        request
      );
    }

    // 1. Manuscript Submission
    if (pathname === "/api/submit-manuscript") {
      if (method === "POST") {
        const response = await submitManuscriptPost({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 2. Tracking Manuscript Status
    if (pathname === "/api/track") {
      if (method === "GET") {
        const response = await trackGet({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 3. Turnstile Verification
    if (pathname === "/api/verify-turnstile") {
      if (method === "POST") {
        const response = await verifyTurnstilePost({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 4. Admin Authentication Login
    if (pathname === "/api/admin/login") {
      if (method === "POST") {
        const response = await adminLoginPost({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 5. Admin Submissions List (Authenticated)
    if (pathname === "/api/admin/submissions") {
      if (method === "GET") {
        const response = await adminSubmissionsGet({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 6. Admin Manuscript Download (Authenticated)
    if (pathname === "/api/admin/download") {
      if (method === "GET") {
        const response = await adminDownloadGet({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 7. Admin Update Status (Authenticated)
    if (pathname === "/api/admin/update-status") {
      if (method === "POST") {
        const response = await adminUpdateStatusPost({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 8. Admin Delete Submission (Authenticated)
    if (pathname === "/api/admin/delete-submission") {
      if (method === "POST") {
        const response = await adminDeleteSubmissionPost({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 9. Contact Enquiry Form (Public)
    if (pathname === "/api/contact") {
      if (method === "POST") {
        const response = await contactPost({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 10. Admin Contact Enquiries List & Actions (Authenticated)
    if (pathname === "/api/admin/contact-enquiries") {
      if (method === "GET") {
        const response = await adminContactEnquiriesGet({ request, env });
        return addCorsAndSecurity(response, request);
      }
      if (method === "POST") {
        const response = await adminContactEnquiriesPost({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 11. Admin Deleted Submissions Archive (Authenticated)
    if (pathname === "/api/admin/deleted-submissions") {
      if (method === "GET") {
        const response = await adminDeletedSubmissionsGet({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // 12. Admin Restore Submission (Authenticated)
    if (pathname === "/api/admin/restore-submission") {
      if (method === "POST") {
        const response = await adminRestoreSubmissionPost({ request, env });
        return addCorsAndSecurity(response, request);
      }
      return jsonError("Method not allowed", 405, request);
    }

    // Unknown API endpoint
    if (pathname.startsWith("/api/")) {
      return jsonError("API endpoint not found", 404, request);
    }

    // Serve static assets from ./dist with security headers
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      const newHeaders = new Headers(assetResponse.headers);
      const sec = getSecurityHeaders();
      for (const [k, v] of Object.entries(sec)) {
        if (!newHeaders.has(k)) {
          newHeaders.set(k, v);
        }
      }
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers: newHeaders,
      });
    }

    return new Response("Static asset handler not bound", { status: 500 });
  },
};
