# Visanam — website

Personalised values comics for children. The child gets the story; the parent
gets the conversation.

**Stack:** Vite · React 19 · TypeScript · wouter · tRPC · Drizzle (MySQL) ·
Stripe · Tailwind 4 · framer-motion

**To deploy, read [`DEPLOY.md`](./DEPLOY.md).** Step 0 of it is not optional.

---

## Quick start

```bash
cp .env.example .env
npm install
npm run dev          # http://localhost:3000
```

---

## Layout

```
api/index.ts          Vercel serverless entry — exports the Express app
server/
  app.ts              Express app factory (no listen, no static serving)
  routers.ts          tRPC procedures: leads, comments, checkout
  db.ts               Drizzle queries
  stripeWebhook.ts    Records paid orders
  _core/              Context, auth, tRPC setup, dev/prod static serving
shared/
  pricing.ts          THE pricing table — read by browser and server alike
  const.ts            Cookie names, OAuth state helpers
client/
  index.html          Meta, Open Graph, JSON-LD
  public/art/         Bundled WebP artwork
  src/
    App.tsx           Routes
    components/       SiteShell, Seo, Reveal, StorybookComments, ui/*
    hooks/useMotion   Site-wide scroll reveals, header, hero, image fade
    lib/visanam.ts    Characters, episodes, values, plan builder
    motion.css        The motion system
drizzle/              Schema + SQL migrations
docs/                 Design direction notes from the original build
```

---

## Things worth knowing before you change anything

### Pricing is server-authoritative

`shared/pricing.ts` is the single source of truth. The browser sends a **country
name** to `checkout.createSession`; the server looks the amount up itself.

This matters: the previous build let the browser send its own `amount`, so
anyone could open devtools and buy a season for one rupee. If you ever add a
plan or a discount, resolve it on the server — never accept a price from the
client.

### Money is only real when the webhook says so

`/checkout?success=true` is just a URL anyone can visit. Order records are
written by `/api/stripe/webhook` after signature verification, and the unique
`stripeSessionId` makes Stripe's retries idempotent.

### Moderation without an OAuth provider

`adminProcedure` accepts either a signed-in admin user *or* a matching
`x-admin-token` header (`ADMIN_TOKEN`). That is what lets `/story-notes` work on
your own domain. Comparison is constant-time.

### Artwork is bundled, not proxied

Twelve WebP images in `client/public/art/`, roughly 4 MB total, at two widths
each. The originals were 2–3 MB PNGs served through Manus storage — around
18 MB for a single page of character portraits.

To swap art, replace the file and keep the name. `small()` in `lib/visanam.ts`
gives you the `@sm` variant for `srcSet`.

### Motion

`client/src/motion.css` plus `client/src/hooks/useMotion.ts`. Everything
animates only `transform`, `opacity` and `filter`, so nothing triggers layout,
and the whole system switches off under `prefers-reduced-motion`.

Two deliberate design decisions in there, both of which cause visible bugs if
you undo them:

- **Only off-screen elements are revealed.** Hiding something the visitor can
  already see makes it fade *out* first — a wash-out on every page load.
- **The hero gets drift, not drift + parallax.** Both write `transform`, and a
  CSS animation always beats a plain declaration, so the parallax would silently
  do nothing.

Add `class="lift"` for a hover raise, `class="press"` for a tactile press.

---

## Content model

Everything editable is data, not markup:

| To change | Edit |
|---|---|
| Prices and countries | `shared/pricing.ts` |
| Characters | `lib/visanam.ts` → `characters` |
| Episodes | `lib/visanam.ts` → `episodes` |
| Values, prompts, questions | `lib/visanam.ts` → `valueOptions`, `planQuestions` |
| The parent plan generator | `lib/visanam.ts` → `buildPlan` |
| Navigation | `components/SiteShell.tsx` |

---

## Open questions for the founder

Two content decisions the site cannot make for you:

1. **Age bands.** The parent journey offers 4–6, 7–9 and 10–12. The comic's own
   canon is written for 6–9 with a 600-word cap. Selling to a four-year-old or a
   twelve-year-old sets up refunds.
2. **Vorax.** This site describes him as "a strange force beyond the hills". The
   story bible has him arriving alone, impersonating the teacher, and being
   hungry rather than wicked. Both cannot be true, and the sales page and the
   comic need to agree.
