# Visanam presents **Cosmos Club** — website

A premium, interactive marketing and sales site for a values-personalised
children's comic subscription.

Built with **Next.js 15 (App Router) + React 19 + TypeScript**.
No CSS framework, no animation library, **zero third-party runtime
dependencies** — everything is hand-written CSS and native browser APIs. That
keeps the bundle tiny, the Lighthouse scores high, and the number of things
that can break your Vercel build close to zero.

---

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run typecheck            # TypeScript only
```

Node 18.18+ required.

---

## Deploy: GitHub → Vercel

1. Create an empty repo on GitHub.
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Cosmos Club website v1"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

3. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
   Framework preset is detected as Next.js. No environment variables are needed
   for v1. Click **Deploy**.
4. Add your custom domain in **Project → Settings → Domains**.
5. **Important:** open `lib/site.ts` and change `url` from
   `https://www.visanam.com` to your real domain. It drives canonical URLs,
   `sitemap.xml`, `robots.txt` and Open Graph tags.

### Why geo-pricing works automatically on Vercel

`app/layout.tsx` reads the `x-vercel-ip-country` header, which Vercel injects at
the edge. That means the correct currency is in the **first byte of HTML** — no
flash of the wrong price, no third-party API call. Locally (and on any non-Vercel
host) the header is absent and the browser falls back to an IP lookup, then to
USD. A visitor can always override it with the country selector, and the choice
is remembered in `localStorage`.

Reading that header makes pages server-rendered on every request rather than
statically cached. That is the right trade for a pricing-led site. If you ever
want fully static pages instead, delete the `headers()` call in
`app/layout.tsx` and pass `serverCountry={null}`.

---

## What's in here

| Route | What it is |
|---|---|
| `/` | Landing page — the guilt hook, how it works, live portal demo, cast, pricing, FAQ |
| `/values-compass` | **The flagship interactive.** 8-question quiz → 3 values, scored bars, sample TALK questions, email capture |
| `/how-it-works` | Episode-by-episode timeline, all 12 values, season arc |
| `/characters` | Cast explorer, the interactive Sprig mood meter, model-sheet section |
| `/peek-inside` | Deliberate glimpse: world art, 4 panels, one locked panel. **No plot.** |
| `/parent-portal` | Working demo of what a parent receives after each episode |
| `/pricing` | PPP geo-pricing, 3 plans, pricing FAQ |
| `/schools` | B2B — NEP 2020 SEL programme |
| `/celebrations` | B2B2C — bespoke wedding / event comics |
| `/journal`, `/journal/[slug]` | SEO blog, 4 full articles seeded |
| `/faq` | Long-form FAQ with `FAQPage` schema |
| `/checkout` | Full checkout UI in **demo mode** — payment provider not yet connected |
| `/contact` | Routed enquiry form (general / school / bespoke / press) |
| `/privacy`, `/terms` | Placeholder legal — **have a lawyer replace before you take money** |

---

## Editing content — where things live

Everything editable is plain data. You do not need to touch a component.

| To change… | Edit |
|---|---|
| Prices, currencies, countries | `lib/pricing.ts` |
| Plan names and feature lists | `lib/pricing.ts` → `PLANS` |
| The 12 values and their copy | `lib/values.ts` → `VALUES` |
| Quiz questions and scoring | `lib/values.ts` → `QUIZ` |
| Conversation questions per value | `lib/values.ts` → `talkQuestionsFor` |
| Characters, roles, blurbs | `lib/cast.ts` |
| Episode titles, panel captions | `lib/episodes.ts` |
| Blog posts | `lib/posts.ts` — append to `POSTS` |
| Brand name, email, domain, nav | `lib/site.ts` |
| Colours, type, spacing | `app/globals.css` (top of file) |

### Adding a blog post

Append an object to `POSTS` in `lib/posts.ts`. The route, metadata, JSON-LD,
sitemap entry and related-posts links are all generated for you.

---

## Images

All artwork lives in `public/images/`, already converted to WebP at two sizes
(~5 MB total for 30 files). Sources were your character sheets and key art.

```
public/images/
  scenery/   village-day, village-dusk, village-night, forest-day, forest-night, ship
  cast/      neo, dev, tara, sia, sprig, vorax        (uniform 2:3 crops)
  sheets/    cast-lineup, sprig-model, tara-model, dev-model, sia-model, neo-model
  og.jpg     1200×630 social share card
```

To swap art, replace the file and keep the name. `next/image` handles the rest.

---

## Not yet connected (deliberately)

These are the four wires to attach before launch. Each has a `TODO` comment at
the exact spot:

1. **Payments** — `app/checkout/CheckoutClient.tsx`. See `docs/PAYMENTS.md`.
2. **Email capture** — `components/ValuesCompass.tsx` (quiz result form).
3. **Contact form** — `app/contact/ContactForm.tsx`.
4. **Analytics / pixels** — see `docs/SEO-AND-MARKETING.md`.

Read `docs/NOTES-FOR-FOUNDER.md` before you publish — it lists the placeholder
copy to replace and two content questions only you can answer.
