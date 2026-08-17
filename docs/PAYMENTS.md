# Connecting payments

The checkout UI, geo-pricing and order summary are complete. Only the charge
itself is stubbed. This is the recommended setup for a business selling from
India to the world.

## Recommended split

| Market | Provider | Why |
|---|---|---|
| India (INR) | **Razorpay** | UPI, cards, netbanking, EMI, wallets. Stripe cannot collect domestic INR without significant setup. |
| Everywhere else | **Stripe** | Best multi-currency support, hosted checkout, strong fraud tooling. |

Route on `market.code`: `IN` → Razorpay, everything else → Stripe.

---

## The golden rule

**Never trust the amount sent from the browser.** The client tells the server
*which plan* and *which country*; the server looks the price up again in
`lib/pricing.ts` and charges that. Otherwise anyone can edit the request and buy
a season for ₹1.

```ts
// app/api/create-order/route.ts
import { marketFor, PLANS, type PlanId } from '@/lib/pricing';

export async function POST(req: Request) {
  const { planId, country } = await req.json();

  // Re-derive the price server-side. This is the authoritative number.
  const market = marketFor(country);
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return Response.json({ error: 'bad plan' }, { status: 400 });

  const amount = market[planId as PlanId];
  // …create the order with `amount` and `market.currency`
}
```

---

## Razorpay (India)

Install: `npm i razorpay`

1. **Server** — create an order:

   ```ts
   import Razorpay from 'razorpay';

   const rzp = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID!,
     key_secret: process.env.RAZORPAY_KEY_SECRET!,
   });

   const order = await rzp.orders.create({
     amount: amount * 100,        // paise
     currency: market.currency,   // 'INR'
     receipt: `cc_${Date.now()}`,
     notes: { planId, childName, values: values.join(',') },
   });
   ```

2. **Client** — load `https://checkout.razorpay.com/v1/checkout.js` and open it
   with the returned `order.id`.

3. **Verify** — always verify the signature server-side before fulfilling:

   ```ts
   import crypto from 'node:crypto';

   const expected = crypto
     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
     .digest('hex');

   if (expected !== razorpay_signature) throw new Error('Signature mismatch');
   ```

4. Also handle the `payment.captured` webhook — users close tabs.

Environment variables (add in Vercel → Settings → Environment Variables):

```
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

---

## Stripe (international)

Install: `npm i stripe`

```ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{
    quantity: 1,
    price_data: {
      currency: market.currency.toLowerCase(),
      unit_amount: amount * 100,          // see zero-decimal note below
      product_data: { name: `Cosmos Club — ${plan.name}` },
    },
  }],
  success_url: `${origin}/checkout/thank-you?s={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/pricing`,
  metadata: { planId, country: market.code, values: values.join(',') },
});

return Response.json({ url: session.url });
```

Then `window.location.href = url`.

> **Zero-decimal currencies.** JPY, KRW, VND and CLP are *not* multiplied by
> 100 — Stripe expects the plain integer. Your pricing table already contains
> whole numbers in those currencies, so branch on a small set:
> `const ZERO_DECIMAL = ['JPY','KRW','VND','CLP','IDR'];`
> (IDR is zero-decimal on Stripe even though the currency has minor units.)

Environment variables:

```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Fulfil on the `checkout.session.completed` webhook, not on the success page.

---

## After a successful payment

The order needs to carry the personalisation forward:

```
parentEmail, childName, childAge, values[] (max 3), planId, market.code
```

Those five fields are everything the parent-brief pipeline needs. Store them
wherever your fulfilment lives (Airtable, Notion, Supabase, a Google Sheet — it
does not matter at this volume) and trigger the Episode 1 brief from there.

---

## A sequencing note

You do not need payments to start selling. The Values Compass already captures
email addresses, which is the more valuable asset early on. It is entirely
reasonable to launch with the compass live, take the first cohort's payments
manually over UPI or a payment link, and wire the full integration once you know
which plan people actually pick.
