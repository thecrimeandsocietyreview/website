import { onRequestPost as submitManuscriptPost } from "./api/submit-manuscript";
import { onRequestGet as trackGet } from "./api/track";
import { onRequestPost as verifyTurnstilePost } from "./api/verify-turnstile";
import { onRequestPost as adminLoginPost } from "./api/admin/login";
import { onRequestGet as adminSubmissionsGet } from "./api/admin/submissions";
import { onRequestGet as adminDownloadGet } from "./api/admin/download";
import { onRequestPost as adminUpdateStatusPost } from "./api/admin/update-status";
import { onRequestPost as adminDeleteSubmissionPost } from "./api/admin/delete-submission";

export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  DB?: D1Database;
  MANUSCRIPTS_BUCKET?: R2Bucket;
  TURNSTILE_SECRET?: string;
  CLOUDFLARE_TURNSTILE_SECRET_KEY?: string;
  JWT_SECRET?: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method.toUpperCase();

    // CORS preflight
    if (pathname.startsWith("/api/") && method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // 1. Manuscript Submission
    if (pathname === "/api/submit-manuscript") {
      if (method === "POST") {
        const response = await submitManuscriptPost({ request, env });
        return addCors(response);
      }
      return jsonError("Method not allowed", 405);
    }

    // 2. Tracking Manuscript Status
    if (pathname === "/api/track") {
      if (method === "GET") {
        const response = await trackGet({ request, env });
        return addCors(response);
      }
      return jsonError("Method not allowed", 405);
    }

    // 3. Turnstile Verification
    if (pathname === "/api/verify-turnstile") {
      if (method === "POST") {
        const response = await verifyTurnstilePost({ request, env });
        return addCors(response);
      }
      return jsonError("Method not allowed", 405);
    }

    // 4. Admin Authentication
    if (pathname === "/api/admin/login") {
      if (method === "POST") {
        const response = await adminLoginPost({ request, env });
        return addCors(response);
      }
      return jsonError("Method not allowed", 405);
    }

    // 5. Admin Submissions List
    if (pathname === "/api/admin/submissions") {
      if (method === "GET") {
        const response = await adminSubmissionsGet({ request, env });
        return addCors(response);
      }
      return jsonError("Method not allowed", 405);
    }

    // 6. Admin Manuscript Download
    if (pathname === "/api/admin/download") {
      if (method === "GET") {
        return adminDownloadGet({ request, env });
      }
      return jsonError("Method not allowed", 405);
    }

    // 7. Admin Update Status
    if (pathname === "/api/admin/update-status") {
      if (method === "POST") {
        const response = await adminUpdateStatusPost({ request, env });
        return addCors(response);
      }
      return jsonError("Method not allowed", 405);
    }

    // 8. Admin Delete Submission
    if (pathname === "/api/admin/delete-submission") {
      if (method === "POST") {
        const response = await adminDeleteSubmissionPost({ request, env });
        return addCors(response);
      }
      return jsonError("Method not allowed", 405);
    }

    // Unknown API endpoint
    if (pathname.startsWith("/api/")) {
      return jsonError("API endpoint not found", 404);
    }

    // Serve static assets from ./dist
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Static asset handler not bound", { status: 500 });
  },
};

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ success: false, message }), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function addCors(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
