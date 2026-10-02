---
name: turnstile-spin
description: Cloudflare Turnstile integration workflow for The Crime & Society Review.
---

# Cloudflare Turnstile Integration

## Widget Metadata
- **Site Key**: `0x4AAAAAAFLt2iH7VYOSvoh1`
- **Secret Key Binding**: `CLOUDFLARE_TURNSTILE_SECRET_KEY` / `TURNSTILE_SECRET`
- **Protected Actions**:
  - `submit_manuscript` (`/submit` page)
  - `contact_enquiry` (`/contact` page)

## Endpoints & Verification
- Server-side siteverify endpoint: `/api/verify-turnstile` (Cloudflare Pages Function at `functions/api/verify-turnstile.ts`)
- Client Library: `@marsidev/react-turnstile`
- Token Reset Protocol: `turnstileRef.current?.reset()` on token expiration, submission completion, or verification rejection.
