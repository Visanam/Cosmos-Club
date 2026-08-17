import express, { type Express, type Request, type Response } from "express";
import Stripe from "stripe";
import { recordOrder } from "./db";

/**
 * Stripe posts here after a payment. This is the ONLY trustworthy signal that
 * money moved — the browser returning to /checkout?success=true is not, since
 * anyone can visit that URL.
 *
 * Must be registered BEFORE express.json(), because signature verification
 * needs the raw request body.
 */
export function registerStripeWebhook(app: Express) {
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const signature = req.headers["stripe-signature"];
    if (!secret || !webhookSecret || !signature) {
      return res.status(400).json({ error: "Webhook configuration is incomplete." });
    }

    let event: Stripe.Event;
    try {
      const stripe = new Stripe(secret);
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (error) {
      console.error("[Webhook] Signature verification failed", error instanceof Error ? error.message : "Unknown error");
      return res.status(400).json({ error: "Webhook signature verification failed." });
    }

    if (event.id.startsWith("evt_test_")) {
      return res.json({ verified: true });
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = session.metadata ?? {};

        await recordOrder({
          stripeSessionId: session.id,
          parentName: meta.parent_name ?? null,
          customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
          childNameAge: meta.child_name_age ?? null,
          valueFocus: meta.value_focus ?? null,
          country: meta.country ?? null,
          currency: (session.currency ?? meta.currency ?? "").toUpperCase() || null,
          amount: session.amount_total ?? null,
          status: "paid",
        });

        console.log("[Webhook] Order recorded", { session: session.id, value: meta.value_focus });
      }

      if (event.type === "charge.refunded") {
        const charge = event.data.object as Stripe.Charge;
        console.log("[Webhook] Refund received", { charge: charge.id });
      }
    } catch (error) {
      // Return 500 so Stripe retries — losing an order is worse than a retry.
      console.error("[Webhook] Failed to persist event", error);
      return res.status(500).json({ error: "Failed to record event." });
    }

    return res.json({ received: true });
  });
}
