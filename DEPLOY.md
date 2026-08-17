# Deploying Visanam to GitHub + Vercel

Start to finish, about twenty minutes. Follow it in order — steps 0 and 1 are
not optional.

---

## Step 0 — Rotate the leaked credentials (do this first)

The build this was made from shipped a `.project-config.json` containing live
secrets in plaintext: a database URL with its password, a Stripe secret key, a
Stripe webhook secret and a JWT secret. That file has been deleted here and is
now in `.gitignore`, but **anything that was ever in it must be treated as
compromised.**

Before you push anything anywhere:

1. **Database** — rotate the password on your TiDB/PlanetScale cluster.
2. **Stripe** — Dashboard → Developers → API keys → *roll* the secret key.
   Then Developers → Webhooks → roll the signing secret.
3. **JWT_SECRET / ADMIN_TOKEN** — generate fresh ones:
   ```bash
   openssl rand -base64 32
   ```

If those secrets were only ever on your own machine and Manus, the risk is low.
Rotating anyway takes five minutes and removes the question entirely.

---

## Step 1 — Generate a lockfile, then push to GitHub

The original archive shipped a `pnpm-lock.yaml` that referenced a patch file and
build plugins that no longer exist, so it was removed rather than left to fail
mid-install. Generate a fresh lockfile once, locally, and commit it — otherwise
Vercel resolves the newest matching version of every dependency on every build,
and a deploy that worked on Monday can break on Tuesday.

```bash
cd visanam-web
npm install        # writes package-lock.json — commit this
```

Then:

```bash

git init
git add .
git commit -m "Visanam website v2.1 — deploy-ready"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Before committing, confirm nothing sensitive is staged:

```bash
git status --short | grep -E '\.env|project-config' && echo "STOP — secrets staged" || echo "clean"
```

`.gitignore` already excludes `.env*` (except `.env.example`), `.vercel`,
`node_modules`, `dist` and `.project-config.json`.

---

## Step 2 — Import into Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
2. Vercel reads `vercel.json`, so leave the build settings alone. For reference,
   it is doing:
   - Build command: `npm run build` (which is `vite build`)
   - Output directory: `dist/public`
   - Install command: `npm install`
3. Add the environment variables from step 3 **before** the first deploy.
4. Deploy.

### How the pieces fit together on Vercel

```
Browser
  ├── /  /pricing  /characters …   →  static SPA from dist/public  (Vercel CDN)
  ├── /art/*.webp                  →  static, cached one year
  └── /api/*                       →  api/index.ts  (serverless Express)
        ├── /api/trpc/*            →  tRPC router
        ├── /api/stripe/webhook    →  Stripe events
        └── /api/health            →  uptime check
```

The front-end is served by the CDN, never through a function — that is what
keeps it fast and cheap. `vercel.json` rewrites everything that is not a real
file to `/index.html` so client-side routing works on refresh and deep links.

---

## Step 3 — Environment variables

Set these in **Vercel → Settings → Environment Variables** (Production *and*
Preview). Full annotated list in `.env.example`.

| Variable | Needed for | Notes |
|---|---|---|
| `DATABASE_URL` | leads, notes, orders | MySQL-compatible. TiDB Serverless and PlanetScale both work. |
| `DRIZZLE_DATABASE_URL` | migrations | Same value. |
| `STRIPE_SECRET_KEY` | checkout | `sk_test_…` until you are ready to charge. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | checkout | `pk_test_…` |
| `STRIPE_WEBHOOK_SECRET` | order recording | From the webhook endpoint you create in step 5. |
| `ADMIN_TOKEN` | `/story-notes` moderation | Any long random string. |
| `JWT_SECRET` | sessions | Only used by the optional OAuth flow. |

Variables prefixed `VITE_` are compiled into the browser bundle, so **never put
a secret behind a `VITE_` name.** Everything else stays server-side.

> After changing an environment variable, redeploy. Vercel does not apply them
> to an existing build.

---

## Step 4 — Database

```bash
# once, locally, with DATABASE_URL set in .env
npm install
npm run db:migrate
```

If you would rather not run the tool, `drizzle/0003_orders.sql` is plain SQL you
can paste into any MySQL console. Migrations `0000`–`0002` create `users`,
`leads` and `storyComments`; `0003` adds `orders`.

The app degrades gracefully without a database: pages render, but lead forms,
community notes and order recording will report that they are unavailable.

---

## Step 5 — Stripe webhook

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. URL: `https://your-domain.com/api/stripe/webhook`
3. Events: `checkout.session.completed` and `charge.refunded`
4. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`, then redeploy.

Fulfilment must key off this webhook, never off the browser landing on
`/checkout?success=true` — anyone can type that URL.

**Test the whole path before you take real money.** Use a test card
(`4242 4242 4242 4242`, any future expiry, any CVC), complete a checkout, then
confirm a row appears in the `orders` table.

---

## Step 6 — Moderation access

Community notes arrive as `pending` and only appear publicly once approved.

Visit `/story-notes`, paste your `ADMIN_TOKEN`, and the review table unlocks.
The token is stored in that browser's `localStorage` and sent as an
`x-admin-token` header; it is compared server-side in constant time. "Forget
this device" clears it.

This exists because the original build gated moderation behind manus.im OAuth,
which does not work on your own domain.

---

## Step 7 — Domain and search

1. **Vercel → Settings → Domains** → add your domain.
2. Search-and-replace `visanam.com` with your real domain in:
   - `client/public/robots.txt`
   - `client/public/sitemap.xml`
   - `client/index.html` (the canonical link and `og:` tags)
3. Google Search Console → add the property → submit
   `https://your-domain.com/sitemap.xml`.

---

## Running locally

```bash
cp .env.example .env     # fill in what you have
npm install
npm run dev              # http://localhost:3000
```

`npm run dev` runs the Express server with Vite middleware, so the API and the
front-end share one origin exactly as they do in production.

Other scripts:

| Command | Does |
|---|---|
| `npm run build` | Production front-end build into `dist/public` |
| `npm run check` | TypeScript, no emit |
| `npm test` | Vitest suite |
| `npm run build:server` | Bundles the server too, for non-Vercel hosting |

---

## Troubleshooting

**Build fails on `vite-plugin-manus-runtime` or `@builder.io/vite-plugin-jsx-loc`**
You are deploying the old zip. Those were Manus-only build plugins and have been
removed here.

**Every page works except on refresh (404s)**
The SPA rewrite in `vercel.json` is missing or was overridden in the dashboard.

**`/api/trpc` returns 404**
Confirm `api/index.ts` exists and that `vercel.json` still contains the
`/api/(.*)` → `/api` rewrite.

**Images 404**
Artwork lives in `client/public/art/` and is copied to `dist/public/art/` at
build time. The old build proxied images from Manus storage — that path no
longer exists and no longer needs to.

**Checkout says "Secure checkout is not configured yet"**
`STRIPE_SECRET_KEY` is not set in that Vercel environment.

**Orders are not being recorded**
Check `DATABASE_URL`, that migration `0003` ran, and the webhook delivery log in
the Stripe dashboard.
