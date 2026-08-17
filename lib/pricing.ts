/* =========================================================================
   GEO-PRICING — purchasing-power-parity schematic
   -------------------------------------------------------------------------
   Founder-set anchors (do not change without updating the PPP index below):
     • India      ₹3,500        → Season Pass (print + digital)
     • USA        $129
     • Singapore  USD 159       → shown locally as S$209 (≈ USD 159)

   Every other market is derived from a PPP index relative to the USA (1.00)
   using World Bank PPP conversion factors, then hand-rounded to a locally
   natural "charm" price. India lands at ~0.31 of the US price, which is the
   ratio the founder anchors imply — the whole table is consistent with that.

   TO EDIT A PRICE: change the numbers in `season` / `digital` / `founding`.
   Nothing else needs to change.
   ========================================================================= */

export type PlanId = 'digital' | 'season' | 'founding';

export interface Market {
  /** ISO 3166-1 alpha-2 (or 'ZZ' for the rest-of-world fallback) */
  code: string;
  country: string;
  currency: string;
  locale: string;
  /** PPP index relative to USA = 1.00 (documentation / analytics only) */
  ppp: number;
  digital: number;
  season: number;
  founding: number;
}

/* -------------------------------------------------------------------------
   The markets table. `season` is the headline price.
   ------------------------------------------------------------------------- */
export const MARKETS: Market[] = [
  // --- Founder-set anchors -------------------------------------------------
  { code: 'IN', country: 'India',          currency: 'INR', locale: 'en-IN', ppp: 0.31, digital: 1950,   season: 3500,   founding: 8750 },
  { code: 'US', country: 'United States',  currency: 'USD', locale: 'en-US', ppp: 1.00, digital: 69,     season: 129,    founding: 319 },
  { code: 'SG', country: 'Singapore',      currency: 'SGD', locale: 'en-SG', ppp: 1.23, digital: 109,    season: 209,    founding: 519 },

  // --- High-income markets -------------------------------------------------
  { code: 'GB', country: 'United Kingdom', currency: 'GBP', locale: 'en-GB', ppp: 0.95, digital: 55,     season: 99,     founding: 249 },
  { code: 'IE', country: 'Ireland',        currency: 'EUR', locale: 'en-IE', ppp: 0.94, digital: 65,     season: 119,    founding: 295 },
  { code: 'DE', country: 'Germany',        currency: 'EUR', locale: 'de-DE', ppp: 0.92, digital: 65,     season: 119,    founding: 295 },
  { code: 'FR', country: 'France',         currency: 'EUR', locale: 'fr-FR', ppp: 0.92, digital: 65,     season: 119,    founding: 295 },
  { code: 'NL', country: 'Netherlands',    currency: 'EUR', locale: 'nl-NL', ppp: 0.94, digital: 65,     season: 119,    founding: 295 },
  { code: 'ES', country: 'Spain',          currency: 'EUR', locale: 'es-ES', ppp: 0.83, digital: 59,     season: 109,    founding: 269 },
  { code: 'IT', country: 'Italy',          currency: 'EUR', locale: 'it-IT', ppp: 0.85, digital: 59,     season: 109,    founding: 269 },
  { code: 'BE', country: 'Belgium',        currency: 'EUR', locale: 'nl-BE', ppp: 0.93, digital: 65,     season: 119,    founding: 295 },
  { code: 'AT', country: 'Austria',        currency: 'EUR', locale: 'de-AT', ppp: 0.93, digital: 65,     season: 119,    founding: 295 },
  { code: 'PT', country: 'Portugal',       currency: 'EUR', locale: 'pt-PT', ppp: 0.79, digital: 55,     season: 99,     founding: 249 },
  { code: 'FI', country: 'Finland',        currency: 'EUR', locale: 'fi-FI', ppp: 0.98, digital: 69,     season: 125,    founding: 309 },
  { code: 'GR', country: 'Greece',         currency: 'EUR', locale: 'el-GR', ppp: 0.75, digital: 49,     season: 95,     founding: 235 },
  { code: 'CH', country: 'Switzerland',    currency: 'CHF', locale: 'de-CH', ppp: 1.30, digital: 79,     season: 145,    founding: 359 },
  { code: 'SE', country: 'Sweden',         currency: 'SEK', locale: 'sv-SE', ppp: 0.95, digital: 699,    season: 1290,   founding: 3190 },
  { code: 'NO', country: 'Norway',         currency: 'NOK', locale: 'nb-NO', ppp: 1.10, digital: 749,    season: 1390,   founding: 3450 },
  { code: 'DK', country: 'Denmark',        currency: 'DKK', locale: 'da-DK', ppp: 1.05, digital: 479,    season: 890,    founding: 2190 },
  { code: 'CA', country: 'Canada',         currency: 'CAD', locale: 'en-CA', ppp: 0.95, digital: 89,     season: 169,    founding: 419 },
  { code: 'AU', country: 'Australia',      currency: 'AUD', locale: 'en-AU', ppp: 1.00, digital: 105,    season: 195,    founding: 489 },
  { code: 'NZ', country: 'New Zealand',    currency: 'NZD', locale: 'en-NZ', ppp: 0.98, digital: 115,    season: 209,    founding: 529 },
  { code: 'IL', country: 'Israel',         currency: 'ILS', locale: 'he-IL', ppp: 1.05, digital: 249,    season: 449,    founding: 1119 },

  // --- Gulf ----------------------------------------------------------------
  { code: 'AE', country: 'United Arab Emirates', currency: 'AED', locale: 'en-AE', ppp: 0.90, digital: 229, season: 429, founding: 1069 },
  { code: 'SA', country: 'Saudi Arabia',   currency: 'SAR', locale: 'ar-SA', ppp: 0.78, digital: 249,    season: 449,    founding: 1119 },
  { code: 'QA', country: 'Qatar',          currency: 'QAR', locale: 'en-QA', ppp: 0.95, digital: 249,    season: 449,    founding: 1119 },
  { code: 'KW', country: 'Kuwait',         currency: 'KWD', locale: 'ar-KW', ppp: 0.92, digital: 21,     season: 39,     founding: 99 },
  { code: 'BH', country: 'Bahrain',        currency: 'BHD', locale: 'en-BH', ppp: 0.88, digital: 25,     season: 45,     founding: 115 },
  { code: 'OM', country: 'Oman',           currency: 'OMR', locale: 'en-OM', ppp: 0.82, digital: 25,     season: 45,     founding: 115 },

  // --- East & South-East Asia ---------------------------------------------
  { code: 'JP', country: 'Japan',          currency: 'JPY', locale: 'ja-JP', ppp: 0.85, digital: 8900,   season: 16800,  founding: 41500 },
  { code: 'KR', country: 'South Korea',    currency: 'KRW', locale: 'ko-KR', ppp: 0.85, digital: 79000,  season: 149000, founding: 369000 },
  { code: 'HK', country: 'Hong Kong SAR',  currency: 'HKD', locale: 'en-HK', ppp: 1.05, digital: 539,    season: 999,    founding: 2490 },
  { code: 'TW', country: 'Taiwan',         currency: 'TWD', locale: 'zh-TW', ppp: 0.72, digital: 1290,   season: 2390,   founding: 5990 },
  { code: 'MY', country: 'Malaysia',       currency: 'MYR', locale: 'ms-MY', ppp: 0.42, digital: 139,    season: 249,    founding: 619 },
  { code: 'TH', country: 'Thailand',       currency: 'THB', locale: 'th-TH', ppp: 0.38, digital: 899,    season: 1690,   founding: 4190 },
  { code: 'ID', country: 'Indonesia',      currency: 'IDR', locale: 'id-ID', ppp: 0.30, digital: 329000, season: 599000, founding: 1499000 },
  { code: 'PH', country: 'Philippines',    currency: 'PHP', locale: 'en-PH', ppp: 0.32, digital: 1290,   season: 2299,   founding: 5690 },
  { code: 'VN', country: 'Vietnam',        currency: 'VND', locale: 'vi-VN', ppp: 0.28, digital: 499000, season: 899000, founding: 2249000 },

  // --- South Asia ----------------------------------------------------------
  { code: 'LK', country: 'Sri Lanka',      currency: 'LKR', locale: 'en-LK', ppp: 0.28, digital: 5900,   season: 10900,  founding: 26900 },
  { code: 'BD', country: 'Bangladesh',     currency: 'BDT', locale: 'bn-BD', ppp: 0.26, digital: 2150,   season: 3900,   founding: 9700 },
  { code: 'NP', country: 'Nepal',          currency: 'NPR', locale: 'ne-NP', ppp: 0.27, digital: 2990,   season: 5400,   founding: 13500 },
  { code: 'PK', country: 'Pakistan',       currency: 'PKR', locale: 'en-PK', ppp: 0.26, digital: 5400,   season: 9900,   founding: 24500 },

  // --- Africa --------------------------------------------------------------
  { code: 'ZA', country: 'South Africa',   currency: 'ZAR', locale: 'en-ZA', ppp: 0.42, digital: 549,    season: 999,    founding: 2490 },
  { code: 'NG', country: 'Nigeria',        currency: 'NGN', locale: 'en-NG', ppp: 0.28, digital: 29000,  season: 54000,  founding: 134000 },
  { code: 'KE', country: 'Kenya',          currency: 'KES', locale: 'en-KE', ppp: 0.30, digital: 2690,   season: 4900,   founding: 12200 },
  { code: 'EG', country: 'Egypt',          currency: 'EGP', locale: 'ar-EG', ppp: 0.24, digital: 1490,   season: 2690,   founding: 6690 },

  // --- Latin America -------------------------------------------------------
  { code: 'BR', country: 'Brazil',         currency: 'BRL', locale: 'pt-BR', ppp: 0.45, digital: 165,    season: 299,    founding: 749 },
  { code: 'MX', country: 'Mexico',         currency: 'MXN', locale: 'es-MX', ppp: 0.45, digital: 599,    season: 1099,   founding: 2749 },
  { code: 'CL', country: 'Chile',          currency: 'CLP', locale: 'es-CL', ppp: 0.55, digital: 49900,  season: 89900,  founding: 224000 },
  { code: 'CO', country: 'Colombia',       currency: 'COP', locale: 'es-CO', ppp: 0.35, digital: 199000, season: 359000, founding: 899000 },

  // --- Europe (non-euro) ---------------------------------------------------
  { code: 'PL', country: 'Poland',         currency: 'PLN', locale: 'pl-PL', ppp: 0.55, digital: 249,    season: 449,    founding: 1119 },
  { code: 'TR', country: 'Türkiye',        currency: 'TRY', locale: 'tr-TR', ppp: 0.40, digital: 1290,   season: 2390,   founding: 5990 },

  // --- Rest of world -------------------------------------------------------
  { code: 'ZZ', country: 'Rest of world',  currency: 'USD', locale: 'en-US', ppp: 1.00, digital: 69,     season: 129,    founding: 319 },
];

export const DEFAULT_MARKET = MARKETS.find((m) => m.code === 'ZZ')!;

const BY_CODE: Record<string, Market> = Object.fromEntries(
  MARKETS.map((m) => [m.code, m])
);

/** Resolve an ISO country code (e.g. from `x-vercel-ip-country`) to a market. */
export function marketFor(code: string | null | undefined): Market {
  if (!code) return DEFAULT_MARKET;
  return BY_CODE[code.toUpperCase()] ?? DEFAULT_MARKET;
}

/** Markets sorted for the currency dropdown, with the fallback pinned last. */
export const MARKETS_SORTED: Market[] = [
  ...MARKETS.filter((m) => m.code !== 'ZZ').sort((a, b) =>
    a.country.localeCompare(b.country)
  ),
  DEFAULT_MARKET,
];

/* -------------------------------------------------------------------------
   Formatting
   ------------------------------------------------------------------------- */
export function formatMoney(amount: number, market: Market): string {
  try {
    return new Intl.NumberFormat(market.locale, {
      style: 'currency',
      currency: market.currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${market.currency} ${amount.toLocaleString('en-US')}`;
  }
}

/** Per-episode unit price, used for the "works out at …" reassurance line. */
export function perEpisode(amount: number, episodes: number, market: Market): string {
  return formatMoney(Math.round(amount / episodes), market);
}

/* -------------------------------------------------------------------------
   Plans
   ------------------------------------------------------------------------- */
export interface Plan {
  id: PlanId;
  name: string;
  kicker: string;
  blurb: string;
  episodes: number;
  featured?: boolean;
  cta: string;
  features: { text: string; on: boolean }[];
}

export const PLANS: Plan[] = [
  {
    id: 'digital',
    name: 'Digital Season',
    kicker: 'Season 1 · 6 episodes',
    blurb: 'The full season delivered as beautiful digital editions, plus your personalised parent brief after every episode.',
    episodes: 6,
    cta: 'Start digital',
    features: [
      { text: '6 digital episodes, one every two weeks', on: true },
      { text: 'Values Compass profile for your child', on: true },
      { text: 'Parent brief after every episode', on: true },
      { text: '3 conversation questions per episode', on: true },
      { text: 'A guide article matched to your values', on: true },
      { text: 'Printed comics posted to your door', on: false },
      { text: 'Collectible Sprig plushie', on: false },
    ],
  },
  {
    id: 'season',
    name: 'Season Pass',
    kicker: 'Season 1 · print + digital',
    blurb: 'The one most families choose. Real comics your child can hold, digital access for travel, and the full parent programme.',
    episodes: 6,
    featured: true,
    cta: 'Choose Season Pass',
    features: [
      { text: '6 printed episodes, posted to your door', on: true },
      { text: 'Digital access to every episode', on: true },
      { text: 'Values Compass profile for your child', on: true },
      { text: 'Parent brief after every episode', on: true },
      { text: '3 conversation questions per episode', on: true },
      { text: 'A guide article matched to your values', on: true },
      { text: 'Collector box + character art cards', on: true },
      { text: 'Collectible Sprig plushie', on: false },
    ],
  },
  {
    id: 'founding',
    name: 'Founding Family',
    kicker: 'All 3 seasons · 18 episodes',
    blurb: 'Lock in the whole arc at the founding rate, and get the merchandise drops before anyone else.',
    episodes: 18,
    cta: 'Become a founding family',
    features: [
      { text: 'All 18 printed episodes across 3 seasons', on: true },
      { text: 'Digital access to everything', on: true },
      { text: 'Values Compass — re-profile each season', on: true },
      { text: 'Parent brief after every episode', on: true },
      { text: '3 conversation questions per episode', on: true },
      { text: 'Full guide library, unlocked', on: true },
      { text: 'Collector box + character art cards', on: true },
      { text: 'Collectible Sprig plushie, first drop', on: true },
      { text: 'Founding family name in Season 3', on: true },
    ],
  },
];
