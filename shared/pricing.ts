/* =========================================================================
   CANONICAL PRICING TABLE — the single source of truth.
   Imported by BOTH the browser (to display) and the server (to charge).

   The server never trusts a price sent from the browser. The checkout sends a
   country name; the server looks the amount up here. Editing a number in this
   file is the only way to change what a customer is charged.
   ========================================================================= */

export type PricingCurrency = "INR" | "USD" | "GBP" | "AED" | "CAD" | "AUD" | "EUR" | "JPY" | "BRL" | "MXN" | "IDR" | "MYR" | "THB" | "PHP" | "ZAR" | "KES" | "NGN" | "VND" | "TRY";

export type PricingTier = {
  country: string;
  currency: PricingCurrency;
  amount: number;
  display: string;
  timezones: string[];
};

export const pricingTiers: PricingTier[] = [
  { country: "India", currency: "INR", amount: 3500, display: "₹3,500", timezones: ["Asia/Kolkata", "Asia/Calcutta"] },
  { country: "United States", currency: "USD", amount: 129, display: "$129", timezones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Phoenix", "Pacific/Honolulu", "America/Anchorage"] },
  { country: "Singapore", currency: "USD", amount: 159, display: "$159", timezones: ["Asia/Singapore"] },
  { country: "United Kingdom", currency: "GBP", amount: 89, display: "£89", timezones: ["Europe/London"] },
  { country: "United Arab Emirates", currency: "AED", amount: 399, display: "AED 399", timezones: ["Asia/Dubai"] },
  { country: "Canada", currency: "CAD", amount: 169, display: "C$169", timezones: ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax"] },
  { country: "Australia", currency: "AUD", amount: 179, display: "A$179", timezones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Perth"] },
  { country: "Germany", currency: "EUR", amount: 119, display: "€119", timezones: ["Europe/Berlin"] },
  { country: "France", currency: "EUR", amount: 119, display: "€119", timezones: ["Europe/Paris"] },
  { country: "Italy", currency: "EUR", amount: 119, display: "€119", timezones: ["Europe/Rome"] },
  { country: "Spain", currency: "EUR", amount: 119, display: "€119", timezones: ["Europe/Madrid"] },
  { country: "Japan", currency: "JPY", amount: 18900, display: "¥18,900", timezones: ["Asia/Tokyo"] },
  { country: "Brazil", currency: "BRL", amount: 590, display: "R$590", timezones: ["America/Sao_Paulo"] },
  { country: "Mexico", currency: "MXN", amount: 2190, display: "MX$2,190", timezones: ["America/Mexico_City"] },
  { country: "Indonesia", currency: "IDR", amount: 1790000, display: "Rp1,790,000", timezones: ["Asia/Jakarta"] },
  { country: "Malaysia", currency: "MYR", amount: 529, display: "RM529", timezones: ["Asia/Kuala_Lumpur"] },
  { country: "Thailand", currency: "THB", amount: 4290, display: "฿4,290", timezones: ["Asia/Bangkok"] },
  { country: "Philippines", currency: "PHP", amount: 6490, display: "₱6,490", timezones: ["Asia/Manila"] },
  { country: "South Africa", currency: "ZAR", amount: 2090, display: "R2,090", timezones: ["Africa/Johannesburg"] },
  { country: "Kenya", currency: "KES", amount: 12500, display: "KSh12,500", timezones: ["Africa/Nairobi"] },
  { country: "Nigeria", currency: "NGN", amount: 149000, display: "₦149,000", timezones: ["Africa/Lagos"] },
  { country: "Vietnam", currency: "VND", amount: 2790000, display: "₫2,790,000", timezones: ["Asia/Ho_Chi_Minh"] },
  { country: "Türkiye", currency: "TRY", amount: 3490, display: "₺3,490", timezones: ["Europe/Istanbul"] },
  { country: "Everywhere else", currency: "USD", amount: 129, display: "$129", timezones: [] },
];

/** Resolve a market from an IANA timezone (a browser-side hint only). */
export function getPricingForTimezone(timezone?: string): PricingTier {
  const known = pricingTiers.find((tier) => tier.timezones.includes(timezone ?? ""));
  return known ?? pricingTiers[pricingTiers.length - 1];
}


/** Resolve a market by country name. Falls back to the "Everywhere else" tier. */
export function getPricingForCountry(country?: string): PricingTier {
  const known = pricingTiers.find((tier) => tier.country === country);
  return known ?? pricingTiers[pricingTiers.length - 1];
}

/** Resolve a market from an ISO country code (e.g. Vercel's x-vercel-ip-country). */
const ISO_TO_COUNTRY: Record<string, string> = {
  IN: "India", US: "United States", SG: "Singapore", GB: "United Kingdom",
  AE: "United Arab Emirates", CA: "Canada", AU: "Australia", DE: "Germany",
  FR: "France", IT: "Italy", ES: "Spain", JP: "Japan", BR: "Brazil",
  MX: "Mexico", ID: "Indonesia", MY: "Malaysia", TH: "Thailand",
  PH: "Philippines", ZA: "South Africa", KE: "Kenya", NG: "Nigeria",
  VN: "Vietnam", TR: "T\u00fcrkiye",
};

export function getPricingForIsoCode(code?: string | null): PricingTier {
  if (!code) return pricingTiers[pricingTiers.length - 1];
  return getPricingForCountry(ISO_TO_COUNTRY[code.toUpperCase()]);
}
