# Notes for the founder — read before publishing

Things I decided, things I deliberately protected, and two things only you can
resolve.

---

## 1. Your storyline is NOT in this repository

You asked for glimpses, not the goods. So:

- `panels_full_E1_v9_sprig_glow_3zone.json` was read for context and **is not
  included anywhere in this codebase**. None of its prompt text, panel
  descriptions, page titles or scene continuity notes appear on the site.
- The captions on `/peek-inside` are written by me to be atmospheric and
  plot-free. They tell a visitor how the art feels, not what happens.
- Episode titles on `/how-it-works` and `/peek-inside` are evocative
  placeholders (`The signal`, `The visitor`, `The tell`…). Swap them for your
  real titles if you want — or keep them, since they give nothing away.
- One panel in the preview strip is deliberately **blurred and locked**. It
  converts better than showing more, and it protects the asset.

The scenery images used are establishing shots and landscape art — no character
beats, no story sequence, nothing that could be reconstructed into the episode.

---

## 2. Two content questions I could not answer for you

### a) The character role labels

I invented the one-line roles on the cast cards, because a marketing site needs
them and I would not guess at your plot:

| Character | Label I used |
|---|---|
| Neo | The one who goes first |
| Dev | The one who builds |
| Tara | The one who notices |
| Sia | The one who lightens it |
| Sprig | The one who feels it first |
| Vorax | Not what he looks like |

They are personality-true and plot-safe. **Please confirm or replace them** in
`lib/cast.ts` — they are the only editorial liberty in the whole build.

Sprig's is the one I am confident about, because it comes straight from your
model sheet: his glow is a feelings vocabulary. I built an interactive around it
on `/characters` (tap Calm / Joy / Scared / Digging deep and the glow changes),
and it is one of the strongest moments on the site.

### b) Your canon skill file is out of date

The `cosmos-club-canon` skill loaded in my session says:

- *"Tara the wordless glowing mascot"* — but your Aug 6–9 model sheets clearly
  show **Tara is a girl with glasses and a device**, and **Sprig is the wordless
  glowing creature**.
- *"five kid protagonists"* — the sheets show **four kids + Sprig**.
- `Dev` is listed as a **retired** June-era name, but Dev is in your current
  character sheets. A second "retired" name also reappears in the Aug 13 panel
  JSON.

I built the site from the **artwork and the panel JSON**, since those are dated
later and are unambiguous. But you should update that canon file, or the next
session that loads it will confidently contradict your own assets.

I also used **Neo** (the spelling on the model sheet) rather than `Nio` (the
filename) or `NEYO` (the panel JSON). Three spellings exist across your files —
pick one and standardise before print.

---

## 3. Vorax on a page parents will read

Your Vorax render is genuinely beautiful and genuinely dark — hooded, glowing
violet eyes, tattered form. Your own canon says he should read as *awe, never
dread*, and should pass the sleep test.

I have used him **once**, low on `/characters`, framed with copy that
pre-empts the fear ("hungry rather than wicked", "drawn for awe, never for
nightmares", "no sharp teeth, no predator eyes"). He is deliberately **not** on
the homepage, not in any hero, and not in the OG share card.

That is the right call for a site sold to anxious parents, but it is your
property — if you want him more prominent, he is one line to move.

---

## 4. Placeholder copy to replace

| Where | What |
|---|---|
| `lib/site.ts` | `url`, `email`, `phone`, `city`, all three social links |
| `/privacy`, `/terms` | Plain-English drafts. **Have a lawyer review before you take real money** — GDPR, India's DPDP Act 2023, and COPPA if you market to the US |
| Testimonials | There are none, on purpose. Do not fabricate them. Add real ones after your first cohort — a `<section>` slot on the homepage between the promises and the compass CTA is the natural place |
| "50+ markets" claim on `/pricing` | Currently true — the table has 52 entries. Keep it accurate if you trim the list |

---

## 5. The pricing table

Your three anchors are honoured exactly:

- India **₹3,500**
- USA **$129**
- Singapore — you said *USD 159*. I show **S$209**, which is ≈ USD 159 and reads
  as local. If you'd rather charge in USD there, change the `SG` row in
  `lib/pricing.ts` to `currency: 'USD'` and `season: 159`.

The other 49 markets are derived from World Bank PPP factors relative to the US,
then hand-rounded to natural local price points. India lands at 0.31× the US
price, which is what your own two anchors imply — so the whole table is
internally consistent with your instinct rather than with mine.

Three tiers were derived from your single anchor:

| Tier | Multiplier | India | USA |
|---|---|---|---|
| Digital Season | ~0.56× | ₹1,950 | $69 |
| **Season Pass** (your anchor) | 1.00× | **₹3,500** | **$129** |
| Founding Family (3 seasons) | ~2.5× | ₹8,750 | $319 |

The Founding Family tier exists to do two jobs: raise average order value, and
make the Season Pass look like the sensible middle choice. That is why it is the
only tier that includes the plushie — it ties your merchandise plan to your
highest-value customer.

---

## 6. What I would do next, in order

1. Replace the domain in `lib/site.ts` and deploy. Get it live today.
2. Wire the Values Compass email capture (`docs/PAYMENTS.md` is for later —
   this is more urgent). An email list you can start building this week is worth
   more than a checkout you might use next month.
3. Write the remaining eight value articles for `/journal`. They are both your
   SEO engine and your subscriber guide library — the same work, twice paid.
4. Film thirty seconds of a real child reading a real episode. Nothing on this
   site converts like that will.
5. Then payments.
