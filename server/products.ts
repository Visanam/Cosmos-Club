import type Stripe from "stripe";

export const VISANAM_SEASON_ONE = {
  name: "Visanam Season 1",
  description: "Six illustrated episodes with a personalized parent wraparound.",
} as const;

export type CheckoutCurrency = "INR" | "USD" | "GBP" | "AED" | "CAD" | "AUD" | "EUR" | "JPY" | "BRL" | "MXN" | "IDR" | "MYR" | "THB" | "PHP" | "ZAR" | "KES" | "NGN" | "VND" | "TRY";

export function makeSeasonOneLineItem(currency: CheckoutCurrency, amount: number): Stripe.Checkout.SessionCreateParams.LineItem {
  return {
    quantity: 1,
    price_data: {
      currency: currency.toLowerCase(),
      unit_amount: currency === "JPY" || currency === "VND" ? amount : Math.round(amount * 100),
      product_data: {
        name: VISANAM_SEASON_ONE.name,
        description: VISANAM_SEASON_ONE.description,
      },
    },
  };
}
