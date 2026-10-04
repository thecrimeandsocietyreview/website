import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import crypto from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function generateTrackingToken(length = 10): string {
  const bytes = crypto.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return result;
}

function localApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'local-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/submit-manuscript' && req.method === 'POST') {
          try {
            // 1. Collect request body stream
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(Buffer.from(chunk));
            }
            const bodyBuffer = Buffer.concat(chunks);

            // 2. Parse multipart/form-data via native Request
            const headers = new Headers();
            for (const [key, value] of Object.entries(req.headers)) {
              if (value) {
                headers.set(key, Array.isArray(value) ? value.join(', ') : value);
              }
            }

            const dummyReq = new Request('http://localhost' + req.url, {
              method: 'POST',
              headers,
              body: bodyBuffer,
            });

            const formData = await dummyReq.formData();

            const authorName = (formData.get('authorName') as string)?.trim() || '';
            const authorEmail = (formData.get('authorEmail') as string)?.trim() || '';
            const authorPhone = (formData.get('authorPhone') as string)?.trim() || '';
            const title = (formData.get('title') as string)?.trim() || '';
            const articleType = (formData.get('articleType') as string)?.trim() || 'Research Article';
            const abstractText = (formData.get('abstract') as string)?.trim() || '';
            const keywords = (formData.get('keywords') as string)?.trim() || '';
            const editorMessage = (formData.get('editorMessage') as string)?.trim() || '';

            const blindFile = formData.get('blindManuscriptFile') as File | null;
            const authorFile = formData.get('authorInfoFile') as File | null;

            if (!blindFile || typeof blindFile === 'string' || !authorFile || typeof authorFile === 'string') {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Both Blind Manuscript and Author Information files are required.' }));
              return;
            }

            // 3. Generate unhackable Tracking ID
            const year = new Date().getFullYear();
            const trackingId = `CSR-${year}-${generateTrackingToken(10)}`;

            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const r2Bucket = env.VITE_CLOUDFLARE_R2_BUCKET_NAME?.trim() || 'thecsrjournal-manuscripts';
            const r2AccessKey = env.CLOUDFLARE_R2_ACCESS_KEY_ID?.trim();
            const r2SecretKey = env.CLOUDFLARE_R2_SECRET_ACCESS_KEY?.trim();

            const d1DbId = env.CLOUDFLARE_D1_DATABASE_ID?.trim() || '588fea4b-4ee9-4aac-9772-9806398d1203';
            const cfToken = env.CLOUDFLARE_API_TOKEN?.trim();

            const sanitizedBlindName = blindFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            const sanitizedAuthorName = authorFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');

            const blindFileKey = `blind-manuscripts/${trackingId}/${sanitizedBlindName}`;
            const authorFileKey = `author-dossiers/${trackingId}/${sanitizedAuthorName}`;

            const blindBytes = Buffer.from(await blindFile.arrayBuffer());
            const authorBytes = Buffer.from(await authorFile.arrayBuffer());

            const blindFileSize = `${(blindBytes.length / (1024 * 1024)).toFixed(2)} MB`;
            const authorFileSize = `${(authorBytes.length / (1024 * 1024)).toFixed(2)} MB`;
            const nowIso = new Date().toISOString();

            // 4. Upload to Cloudflare R2 if credentials present
            if (accountId && r2AccessKey && r2SecretKey) {
              console.log(`[R2] Uploading files for ${trackingId} to bucket ${r2Bucket}...`);
              const s3 = new S3Client({
                region: 'auto',
                endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
                credentials: {
                  accessKeyId: r2AccessKey,
                  secretAccessKey: r2SecretKey,
                },
              });

              await s3.send(
                new PutObjectCommand({
                  Bucket: r2Bucket,
                  Key: blindFileKey,
                  Body: blindBytes,
                  ContentType: blindFile.type || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  Metadata: { trackingId, originalName: blindFile.name, category: 'blind-manuscript' },
                })
              );

              await s3.send(
                new PutObjectCommand({
                  Bucket: r2Bucket,
                  Key: authorFileKey,
                  Body: authorBytes,
                  ContentType: authorFile.type || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  Metadata: { trackingId, originalName: authorFile.name, category: 'author-dossier' },
                })
              );

              console.log(`[R2] SUCCESS: Files stored at:\n  - ${blindFileKey}\n  - ${authorFileKey}`);
            } else {
              console.warn('[R2] Skipped upload: CLOUDFLARE_ACCOUNT_ID is missing in .env!');
            }

            // 5. Insert into Cloudflare D1 Database via REST API
            if (accountId && d1DbId && cfToken) {
              console.log(`[D1] Inserting record ${trackingId} into database ${d1DbId}...`);

              // Ensure table exists
              await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${cfToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sql: `
                    CREATE TABLE IF NOT EXISTS submissions (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      tracking_number TEXT NOT NULL UNIQUE,
                      author_name TEXT NOT NULL,
                      author_email TEXT NOT NULL,
                      authorPhone TEXT NOT NULL,
                      title TEXT NOT NULL,
                      article_type TEXT NOT NULL,
                      abstract TEXT NOT NULL,
                      keywords TEXT NOT NULL,
                      blind_file_key TEXT NOT NULL,
                      blind_file_name TEXT NOT NULL,
                      blind_file_size TEXT NOT NULL,
                      author_file_key TEXT NOT NULL,
                      author_file_name TEXT NOT NULL,
                      author_file_size TEXT NOT NULL,
                      editor_message TEXT DEFAULT '',
                      status TEXT NOT NULL DEFAULT 'Submitted',
                      stage_number INTEGER NOT NULL DEFAULT 1,
                      editorial_decision_notes TEXT DEFAULT '',
                      assigned_reviewers TEXT DEFAULT '[]',
                      is_archived INTEGER NOT NULL DEFAULT 0,
                      submitted_at TEXT NOT NULL,
                      updated_at TEXT NOT NULL
                    );
                    CREATE INDEX IF NOT EXISTS idx_submissions_tracking ON submissions(tracking_number);
                  `,
                }),
              });

              // Insert submission
              const insertRes = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `
                      INSERT INTO submissions (
                        tracking_number, author_name, author_email, authorPhone,
                        title, article_type, abstract, keywords,
                        blind_file_key, blind_file_name, blind_file_size,
                        author_file_key, author_file_name, author_file_size,
                        editor_message, status, stage_number, submitted_at, updated_at
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', 1, ?, ?)
                    `,
                    params: [
                      trackingId,
                      authorName,
                      authorEmail,
                      authorPhone,
                      title,
                      articleType,
                      abstractText,
                      keywords,
                      blindFileKey,
                      blindFile.name,
                      blindFileSize,
                      authorFileKey,
                      authorFile.name,
                      authorFileSize,
                      editorMessage,
                      nowIso,
                      nowIso,
                    ],
                  }),
                }
              );

              const insertJson = await insertRes.json().catch(() => null);
              if (insertJson?.success) {
                console.log(`[D1] SUCCESS: Submission row inserted into Cloudflare D1!`);
              } else {
                console.error(`[D1] Error response:`, insertJson);
              }
            } else {
              console.warn('[D1] Skipped insert: CLOUDFLARE_ACCOUNT_ID is missing in .env!');
            }

            // 6. Return response to frontend
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                trackingId,
                submittedAt: nowIso.split('T')[0],
                blindFileName: blindFile.name,
                blindFileSize,
                authorFileName: authorFile.name,
                authorFileSize,
                message: 'Manuscript successfully ingested into Cloudflare storage and database.',
              })
            );
            return;
          } catch (err: any) {
            console.error('[API Submit Error]', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: err?.message || 'Server error' }));
            return;
          }
        }

        // =====================================================================
        // ADMIN AUTH ENDPOINT: POST /api/admin/login (Verify via Cloudflare D1)
        // =====================================================================
        if (req.url === '/api/admin/login' && req.method === 'POST') {
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(Buffer.from(chunk));
            const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
            const username = (body.username || '').trim().toLowerCase();
            const password = (body.password || '').trim();

            if (!username || !password) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Username and password are required.' }));
              return;
            }

            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const d1DbId = env.CLOUDFLARE_D1_DATABASE_ID?.trim() || '588fea4b-4ee9-4aac-9772-9806398d1203';
            const cfToken = env.CLOUDFLARE_API_TOKEN?.trim();

            if (!accountId || !cfToken) {
              res.statusCode = 503;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Database credentials missing.' }));
              return;
            }

            const queryRes = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${cfToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sql: `SELECT * FROM admin_users WHERE LOWER(username) = ? AND is_active = 1;`,
                  params: [username],
                }),
              }
            );

            const json: any = await queryRes.json().catch(() => null);
            const user = json?.result?.[0]?.results?.[0];

            if (!user) {
              res.statusCode = 401;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Invalid username or password.' }));
              return;
            }

            // Verify hash using crypto
            const crypto = await import('crypto');
            const hash = crypto.createHash('sha256').update(password + ':' + user.salt).digest('hex');

            if (hash !== user.password_hash) {
              res.statusCode = 401;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Invalid username or password.' }));
              return;
            }

            const nowIso = new Date().toISOString();
            // Update last_login
            await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${cfToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sql: `UPDATE admin_users SET last_login = ? WHERE id = ?;`,
                  params: [nowIso, user.id],
                }),
              }
            );

            const tokenPayload = {
              uid: user.id,
              username: user.username,
              displayName: user.display_name,
              role: user.role,
              exp: Date.now() + 24 * 60 * 60 * 1000,
            };
            const sessionToken = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                token: sessionToken,
                user: {
                  username: user.username,
                  displayName: user.display_name,
                  role: user.role,
                  lastLogin: nowIso,
                },
              })
            );
            return;
          } catch (e: any) {
            console.error('[Admin Login Error]', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e?.message || 'Login failed' }));
            return;
          }
        }

        // =====================================================================
        // ADMIN ENDPOINT: GET /api/admin/submissions (Fetch real D1 data)
        // =====================================================================
        if (req.url === '/api/admin/submissions' && req.method === 'GET') {
          try {
            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const d1DbId = env.CLOUDFLARE_D1_DATABASE_ID?.trim() || '588fea4b-4ee9-4aac-9772-9806398d1203';
            const cfToken = env.CLOUDFLARE_API_TOKEN?.trim();

            if (!accountId || !cfToken) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: 0, submissions: [] }));
              return;
            }

            const queryRes = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${cfToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sql: `SELECT * FROM submissions WHERE is_archived = 0 ORDER BY id DESC;`,
                }),
              }
            );

            const json: any = await queryRes.json().catch(() => null);
            const results = json?.result?.[0]?.results || [];

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, count: results.length, submissions: results }));
            return;
          } catch (e: any) {
            console.error('[Admin Submissions Query Error]', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e?.message || 'D1 query failed' }));
            return;
          }
        }

        // =====================================================================
        // ADMIN ENDPOINT: POST /api/admin/update-status (Update in Cloudflare D1)
        // =====================================================================
        if (req.url === '/api/admin/update-status' && req.method === 'POST') {
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(Buffer.from(chunk));
            const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');

            const { trackingNumber, status, stageNumber, editorialDecisionNotes = '', assignedReviewers = '[]' } = body;
            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const d1DbId = env.CLOUDFLARE_D1_DATABASE_ID?.trim() || '588fea4b-4ee9-4aac-9772-9806398d1203';
            const cfToken = env.CLOUDFLARE_API_TOKEN?.trim();

            if (accountId && cfToken && trackingNumber) {
              const nowIso = new Date().toISOString();
              await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `
                      UPDATE submissions 
                      SET status = ?, stage_number = ?, editorial_decision_notes = ?, assigned_reviewers = ?, updated_at = ?
                      WHERE tracking_number = ?
                    `,
                    params: [
                      status,
                      stageNumber || 1,
                      editorialDecisionNotes,
                      typeof assignedReviewers === 'string' ? assignedReviewers : JSON.stringify(assignedReviewers),
                      nowIso,
                      trackingNumber,
                    ],
                  }),
                }
              );
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Status updated successfully in Cloudflare D1' }));
            return;
          } catch (e: any) {
            console.error('[Admin Status Update Error]', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e?.message || 'Failed to update' }));
            return;
          }
        }

        // =====================================================================
        // ADMIN ENDPOINT: POST /api/admin/delete-submission (Retire & Delete)
        // =====================================================================
        if (req.url === '/api/admin/delete-submission' && req.method === 'POST') {
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(Buffer.from(chunk));
            const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
            const { trackingNumber, reason = 'Withdrawn by Admin' } = body;

            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const d1DbId = env.CLOUDFLARE_D1_DATABASE_ID?.trim() || '588fea4b-4ee9-4aac-9772-9806398d1203';
            const cfToken = env.CLOUDFLARE_API_TOKEN?.trim();

            if (accountId && cfToken && trackingNumber) {
              const nowIso = new Date().toISOString();

              // 1. Copy complete submission record into deleted_submissions table
              await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `
                      INSERT INTO deleted_submissions (
                        original_id, tracking_number, author_name, author_email, author_phone,
                        title, article_type, abstract, keywords,
                        blind_file_key, blind_file_name, blind_file_size,
                        author_file_key, author_file_name, author_file_size,
                        status, stage_number, editorial_decision_notes, assigned_reviewers,
                        submitted_at, deleted_at, deletion_reason
                      )
                      SELECT 
                        id, tracking_number, author_name, author_email, author_phone,
                        title, article_type, abstract, keywords,
                        blind_file_key, blind_file_name, blind_file_size,
                        author_file_key, author_file_name, author_file_size,
                        status, stage_number, editorial_decision_notes, assigned_reviewers,
                        submitted_at, ?, ?
                      FROM submissions
                      WHERE tracking_number = ?;
                    `,
                    params: [nowIso, reason, trackingNumber],
                  }),
                }
              ).catch((err) => console.error('[D1 Backup To Deleted Err]', err));

              // 2. Blacklist in retired_tracking_ids so tracking ID cannot be reused
              await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `INSERT OR IGNORE INTO retired_tracking_ids (tracking_number, retired_at, reason) VALUES (?, ?, ?);`,
                    params: [trackingNumber, nowIso, reason],
                  }),
                }
              ).catch((err) => console.error('[D1 Retire Tracking Err]', err));

              // 3. Permanently delete submission from active submissions table
              const deleteRes = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `DELETE FROM submissions WHERE tracking_number = ?;`,
                    params: [trackingNumber],
                  }),
                }
              );

              const deleteJson: any = await deleteRes.json().catch(() => null);
              if (!deleteJson?.success) {
                console.error('[D1 Delete Error]', deleteJson?.errors);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: false,
                  message: deleteJson?.errors?.[0]?.message || 'Failed to delete submission from Cloudflare D1'
                }));
                return;
              }
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Submission archived to deleted_submissions and removed from active list.' }));
            return;
          } catch (e: any) {
            console.error('[Admin Delete Error]', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e?.message || 'Failed to delete' }));
            return;
          }
        }

        // =====================================================================
        // ADMIN ENDPOINT: GET /api/admin/deleted-submissions (Fetch Deleted List)
        // =====================================================================
        if (req.url === '/api/admin/deleted-submissions' && req.method === 'GET') {
          try {
            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const d1DbId = env.CLOUDFLARE_D1_DATABASE_ID?.trim() || '588fea4b-4ee9-4aac-9772-9806398d1203';
            const cfToken = env.CLOUDFLARE_API_TOKEN?.trim();

            if (!accountId || !cfToken) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: 0, deleted: [], deletedSubmissions: [] }));
              return;
            }

            const queryRes = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${cfToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sql: `SELECT * FROM deleted_submissions ORDER BY id DESC;`,
                }),
              }
            );

            const json: any = await queryRes.json().catch(() => null);
            const results = json?.result?.[0]?.results || [];

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, count: results.length, deleted: results, deletedSubmissions: results }));
            return;
          } catch (e: any) {
            console.error('[Admin Deleted Submissions Query Error]', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e?.message || 'Failed to query deleted submissions' }));
            return;
          }
        }

        // =====================================================================
        // ADMIN ENDPOINT: POST /api/admin/restore-submission (Restore Deleted)
        // =====================================================================
        if (req.url === '/api/admin/restore-submission' && req.method === 'POST') {
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(Buffer.from(chunk));
            const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
            const { trackingNumber } = body;

            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const d1DbId = env.CLOUDFLARE_D1_DATABASE_ID?.trim() || '588fea4b-4ee9-4aac-9772-9806398d1203';
            const cfToken = env.CLOUDFLARE_API_TOKEN?.trim();

            if (accountId && cfToken && trackingNumber) {
              const nowIso = new Date().toISOString();

              // 1. Copy back from deleted_submissions into submissions
              await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `
                      INSERT INTO submissions (
                        tracking_number, author_name, author_email, author_phone,
                        title, article_type, abstract, keywords,
                        blind_file_key, blind_file_name, blind_file_size,
                        author_file_key, author_file_name, author_file_size,
                        status, stage_number, editorial_decision_notes, assigned_reviewers,
                        is_archived, submitted_at, updated_at
                      )
                      SELECT 
                        tracking_number, author_name, author_email, author_phone,
                        title, article_type, abstract, keywords,
                        blind_file_key, blind_file_name, blind_file_size,
                        author_file_key, author_file_name, author_file_size,
                        status, stage_number, editorial_decision_notes, assigned_reviewers,
                        0, submitted_at, ?
                      FROM deleted_submissions
                      WHERE tracking_number = ?;
                    `,
                    params: [nowIso, trackingNumber],
                  }),
                }
              );

              // 2. Remove from retired_tracking_ids
              await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `DELETE FROM retired_tracking_ids WHERE tracking_number = ?;`,
                    params: [trackingNumber],
                  }),
                }
              );

              // 3. Delete from deleted_submissions
              await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `DELETE FROM deleted_submissions WHERE tracking_number = ?;`,
                    params: [trackingNumber],
                  }),
                }
              );
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Submission restored successfully.' }));
            return;
          } catch (e: any) {
            console.error('[Admin Restore Error]', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e?.message || 'Failed to restore' }));
            return;
          }
        }

        // =====================================================================
        // ADMIN ENDPOINT: GET /api/admin/download (Stream from Cloudflare R2)
        // =====================================================================
        if (req.url?.startsWith('/api/admin/download') && req.method === 'GET') {
          try {
            const parsedUrl = new URL('http://localhost' + req.url);
            const key = parsedUrl.searchParams.get('key')?.trim() || '';
            const fileName = parsedUrl.searchParams.get('name')?.trim() || 'manuscript.docx';

            if (!key) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Missing key parameter' }));
              return;
            }

            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const r2Bucket = env.VITE_CLOUDFLARE_R2_BUCKET_NAME?.trim() || 'thecsrjournal-manuscripts';
            const r2AccessKey = env.CLOUDFLARE_R2_ACCESS_KEY_ID?.trim();
            const r2SecretKey = env.CLOUDFLARE_R2_SECRET_ACCESS_KEY?.trim();

            if (accountId && r2AccessKey && r2SecretKey) {
              const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
              const s3 = new S3Client({
                region: 'auto',
                endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
                credentials: {
                  accessKeyId: r2AccessKey,
                  secretAccessKey: r2SecretKey,
                },
              });

              const getCmd = new GetObjectCommand({
                Bucket: r2Bucket,
                Key: key,
              });

              const s3Res = await s3.send(getCmd);
              if (s3Res.Body) {
                res.statusCode = 200;
                res.setHeader('Content-Type', s3Res.ContentType || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileName)}"`);
                // Pipe stream to client
                (s3Res.Body as any).pipe(res);
                return;
              }
            }

            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'File not found in R2' }));
            return;
          } catch (e: any) {
            console.error('[Admin Download Error]', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e?.message || 'Download failed' }));
            return;
          }
        }

        // =====================================================================
        // TRACK ENDPOINT: GET /api/track (Track via Cloudflare D1)
        // =====================================================================
        if (req.url?.startsWith('/api/track') && req.method === 'GET') {
          try {
            const parsedUrl = new URL('http://localhost' + req.url);
            const tracking = parsedUrl.searchParams.get('tracking')?.trim() || '';

            if (!tracking) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Tracking ID is required' }));
              return;
            }

            const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim();
            const d1DbId = env.CLOUDFLARE_D1_DATABASE_ID?.trim() || '588fea4b-4ee9-4aac-9772-9806398d1203';
            const cfToken = env.CLOUDFLARE_API_TOKEN?.trim();

            if (accountId && cfToken) {
              const queryRes = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${d1DbId}/query`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${cfToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    sql: `SELECT * FROM submissions WHERE tracking_number = ? AND is_archived = 0;`,
                    params: [tracking],
                  }),
                }
              );

              const json: any = await queryRes.json().catch(() => null);
              const rows = json?.result?.[0]?.results || [];

              if (rows.length > 0) {
                const sub = rows[0];
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    found: true,
                    submission: {
                      trackingNumber: sub.tracking_number,
                      title: sub.title,
                      articleType: sub.article_type,
                      authorName: sub.author_name,
                      status: sub.status,
                      stageNumber: sub.stage_number,
                      submittedAt: sub.submitted_at,
                      updatedAt: sub.updated_at,
                      editorialDecisionNotes: sub.editorial_decision_notes || '',
                    },
                  })
                );
                return;
              }
            }

            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                found: false,
                message: 'No manuscript found matching the provided tracking number.',
              })
            );
            return;
          } catch (e: any) {
            console.error('[Track Error]', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: e?.message || 'Tracking failed' }));
            return;
          }
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), localApiDevPlugin(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: false,
      watch: {
        ignored: ['**/*.crdownload', '**/*.tmp'],
      },
    },
  };
});


