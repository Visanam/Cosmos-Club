# SEO & digital marketing

## What is already done

- **Per-page metadata** — unique title, description and canonical on every route
  (`export const metadata` in each `page.tsx`).
- **Structured data (JSON-LD)** — `Organization` sitewide, `FAQPage` on `/faq`,
  `Article` on every journal post, `Quiz` on `/values-compass`.
- **`sitemap.xml`** — generated from `app/sitemap.ts`, includes every post.
- **`robots.txt`** — generated from `app/robots.ts`; `/checkout` is disallowed.
- **Open Graph + Twitter cards** — with a real 1200×630 share image
  (`/images/og.jpg`).
- **Semantic HTML** — one `h1` per page, correct heading order, skip link, alt
  text on every meaningful image, `aria` on all interactive controls.
- **Core Web Vitals** — no JS framework overhead beyond React, images are WebP
  and served through `next/image`, fonts load with `display=swap`, animation is
  GPU-only (`transform`/`opacity`) and fully disabled under
  `prefers-reduced-motion`.

## Before you launch — the 10-minute checklist

1. `lib/site.ts` → set `url` to your real domain. **Nothing else matters if you
   skip this.**
2. Fill in `email`, `phone`, `city` and the social links in the same file.
3. Google Search Console → add the property → submit `https://yourdomain.com/sitemap.xml`.
4. Bing Webmaster Tools → same.
5. Google Business Profile if you have a registered address.

## Adding analytics and ad pixels

The cleanest place is `app/layout.tsx`, inside `<head>`, using `next/script`:

```tsx
import Script from 'next/script';

// Google Analytics 4
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" strategy="afterInteractive" />
<Script id="ga4" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
`}</Script>
```

Meta Pixel and Google Ads conversion tags follow the same pattern. Use
`strategy="afterInteractive"` so they never block the first paint.

**Vercel Analytics** is one line and needs no cookie banner:
`npm i @vercel/analytics`, then `<Analytics />` in the layout body.

### Events worth tracking from day one

| Event | Where to fire it |
|---|---|
| `compass_started` | `ValuesCompass.tsx`, when stage becomes `quiz` |
| `compass_completed` | when stage becomes `result` |
| `compass_email_captured` | the result form's submit handler |
| `plan_selected` | the `Link` in `PricingTable.tsx` |
| `checkout_started` | `CheckoutClient` mount |
| `purchase` | your payment webhook (server-side — far more accurate) |

`compass_completed → compass_email_captured` is your single most important
conversion rate. Optimise that before you spend anything on ads.

---

## The keyword strategy this site is built for

You are not going to outrank Amazon for "comics for kids", and you should not
try. The traffic that converts is **problem-aware parent search**, which is
exactly what the journal targets:

| Cluster | Example queries | Landing page |
|---|---|---|
| Guilt / time | "not spending enough time with my child", "working parent guilt" | `/journal/the-five-minute-conversation-that-beats-an-hour` |
| Specific behaviour | "my child gets angry so quickly", "how to teach my child patience" | `/journal/anger-is-not-a-behaviour-problem` |
| Confidence | "my child gives up easily", "child says I can't do it" | `/journal/what-to-do-when-your-child-cannot-lose` |
| Courage | "how to make my child confident", "shy child birthday party" | `/journal/how-to-talk-to-your-child-about-courage` |
| Values / SEL | "value education for kids", "moral stories vs values" | `/how-it-works` |
| B2B | "NEP 2020 SEL programme", "social emotional learning schools India" | `/schools` |

**Write one article per value.** Twelve values, twelve articles — each ends with
the Values Compass call to action. That is the whole content engine, and it
doubles as the guide library subscribers receive, so nothing is wasted work.

### Paid, in priority order

1. **Meta (Instagram/Facebook)** — this product is emotionally visual and your
   audience is on Instagram. Lead with the *guilt* creative, not the comic art.
   Send traffic to `/values-compass`, never to `/pricing`.
2. **Google Search** — bid on the problem-aware queries above, not on "comics".
3. **YouTube pre-roll** on parenting content, once you have a 30-second film of
   a child reading and a parent asking the questions.

### The funnel this site is shaped around

```
Instagram ad (guilt)  →  /values-compass  →  email captured
                                          →  guide email sequence (one per value)
                                          →  /pricing  →  checkout
```

Do not shortcut to `/pricing`. Cold traffic does not buy a ₹3,500 subscription
for a product it has not felt. The compass is what makes them feel it.
