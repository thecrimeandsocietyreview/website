// Cryptographic Authentication & Token Verification for Editorial Admin Console
// Uses Web Crypto API (HMAC-SHA256) compatible with Cloudflare Workers runtime

export interface AdminTokenPayload {
  uid: number;
  username: string;
  displayName: string;
  role: string;
  exp: number;
  iat?: number;
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function base64UrlEncode(str: string): string {
  const base64 = btoa(str);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return atob(base64);
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64UrlEncode(binary);
}

export function getJwtSecret(env: { JWT_SECRET?: string }): string {
  return env.JWT_SECRET || "CSR_ACADEMIC_JOURNAL_SECURE_HMAC_SECRET_2026_PROD";
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Creates an HMAC-SHA256 signed JWT
 */
export async function createAdminToken(
  payload: AdminTokenPayload,
  secret: string
): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${headerEncoded}.${payloadEncoded}`;

  const key = await getHmacKey(secret);
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(dataToSign)
  );

  const signatureEncoded = arrayBufferToBase64Url(signatureBuffer);
  return `${dataToSign}.${signatureEncoded}`;
}

/**
 * Verifies an HMAC-SHA256 signed JWT
 */
export async function verifyAdminToken(
  token: string,
  secret: string
): Promise<AdminTokenPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
  const dataToSign = `${headerEncoded}.${payloadEncoded}`;

  try {
    const key = await getHmacKey(secret);
    const enc = new TextEncoder();
    const expectedSigBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      enc.encode(dataToSign)
    );
    const expectedSigEncoded = arrayBufferToBase64Url(expectedSigBuffer);

    if (!timingSafeEqual(signatureEncoded, expectedSigEncoded)) {
      return null;
    }

    const payloadJson = base64UrlDecode(payloadEncoded);
    const payload: AdminTokenPayload = JSON.parse(payloadJson);

    // Expiry check
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * Middleware helper for verifying requests
 */
export async function verifyAdminRequest(
  request: Request,
  env: { JWT_SECRET?: string }
): Promise<{ authorized: boolean; user?: AdminTokenPayload; error?: string }> {
  const authHeader = request.headers.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return { authorized: false, error: "Missing or invalid Authorization header." };
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return { authorized: false, error: "Empty Bearer token." };
  }

  const secret = getJwtSecret(env);
  const user = await verifyAdminToken(token, secret);

  if (!user) {
    return { authorized: false, error: "Session token is invalid or has expired. Please log in again." };
  }

  return { authorized: true, user };
}
