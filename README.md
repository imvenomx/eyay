# Eey Aay

Marketing site + admin dashboard. Built with Next.js 16 + React 19 + Tailwind 4.

## Local setup

```bash
cp .env.example .env.local
# at minimum: set ADMIN_PASSWORD
npm install
npm run dev
```

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## Storage

Two drivers — selected automatically:

- **file** (default) — writes JSON to `./data/`. Good for dev / self-hosted.
- **supabase** — used when `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are set.

Force a specific driver with `STORAGE_DRIVER=file|supabase`.

### Supabase setup

1. Create a project at supabase.com.
2. SQL editor → paste & run `supabase/schema.sql`.
3. Project settings → API → copy `Project URL` + `service_role` key into `.env.local`:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=ey...
   ```
4. Restart the dev server. The dashboard will now read/write Supabase.

The service-role key is server-side only (used from API routes + admin pages). RLS stays on; no public policies are granted.

## Service page images

Each service has 3 content blocks, each with an image. The site ships with 3 fallback images (`/img1.webp`, `/img2.webp`, `/img3.webp`) that rotate via a hash of the service title.

To generate **unique imagery per service** with OpenRouter:

1. Add to `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-...
   ```
2. Run:
   ```bash
   npm run gen:images               # all 45 images (~15 services × 3 blocks)
   npm run gen:images -- --dry-run  # preview prompts only, no API calls
   npm run gen:images -- --service=ai-chatbots          # one service
   npm run gen:images -- --service=ai-chatbots --block=2 --force  # one image, overwrite
   ```
3. Generated files land in `/public/services/<slug>-<n>.png`. The service page auto-detects them and falls back to the original imagery for any block without a generated file.

Cost is ~$2-3 total for all 45 images on OpenRouter's GPT-image tier. Default model: `openai/gpt-image-1`; override with `--model=<id>`.

## Deploying

For Vercel / serverless: switch to Supabase (the file driver's `./data/` directory is ephemeral on serverless).
