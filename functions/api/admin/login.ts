// Cloudflare Pages Function: /api/admin/login
// Server-side authentication for Editorial Admin Console

import { createAdminToken, timingSafeEqual, getJwtSecret } from "./auth";

interface Env {
  DB?: D1Database;
  JWT_SECRET?: string;
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + ':' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  try {
    const body: any = await context.request.json().catch(() => ({}));
    const username = (body.username || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Both username and password are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!context.env.DB) {
      return new Response(
        JSON.stringify({ success: false, message: 'Database connection unavailable.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user: any = await context.env.DB.prepare(
      `SELECT * FROM admin_users WHERE LOWER(username) = ? AND is_active = 1`
    )
      .bind(username)
      .first();

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid username or password.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const computedHash = await hashPassword(password, user.salt);
    if (!timingSafeEqual(computedHash, user.password_hash)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid username or password.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update last_login
    const nowIso = new Date().toISOString();
    await context.env.DB.prepare(
      `UPDATE admin_users SET last_login = ? WHERE id = ?`
    )
      .bind(nowIso, user.id)
      .run();

    // Create cryptographically signed HMAC-SHA256 session token
    const tokenPayload = {
      uid: user.id,
      username: user.username,
      displayName: user.display_name,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };
    const sessionToken = await createAdminToken(tokenPayload, getJwtSecret(context.env));

    return new Response(
      JSON.stringify({
        success: true,
        token: sessionToken,
        user: {
          username: user.username,
          displayName: user.display_name,
          role: user.role,
          lastLogin: nowIso,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Admin Login Error]', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error during authentication.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
