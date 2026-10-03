/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDFLARE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CLOUDFLARE_R2_BUCKET_NAME?: string;
  readonly VITE_CLOUDFLARE_D1_DATABASE_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
