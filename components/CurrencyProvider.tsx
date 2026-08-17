'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_MARKET,
  MARKETS_SORTED,
  formatMoney,
  marketFor,
  type Market,
} from '@/lib/pricing';

const KEY = 'cc.market';

interface Ctx {
  market: Market;
  setMarket: (code: string) => void;
  detected: boolean;
  money: (n: number) => string;
  markets: Market[];
}

const CurrencyCtx = createContext<Ctx>({
  market: DEFAULT_MARKET,
  setMarket: () => {},
  detected: false,
  money: (n) => formatMoney(n, DEFAULT_MARKET),
  markets: MARKETS_SORTED,
});

export const useCurrency = () => useContext(CurrencyCtx);

/**
 * `serverCountry` comes from the edge (`x-vercel-ip-country` on Vercel).
 * The first client render deliberately matches it, so there is no hydration
 * mismatch; a saved preference or an IP lookup is applied afterwards.
 */
export function CurrencyProvider({
  serverCountry,
  children,
}: {
  serverCountry: string | null;
  children: ReactNode;
}) {
  const [code, setCode] = useState<string>(() => marketFor(serverCountry).code);
  const [detected, setDetected] = useState<boolean>(Boolean(serverCountry));

  useEffect(() => {
    let cancelled = false;

    // 1. An explicit choice always wins.
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved && MARKETS_SORTED.some((m) => m.code === saved)) {
        setCode(saved);
        setDetected(true);
        return;
      }
    } catch {
      /* private mode — ignore */
    }

    // 2. The edge header already told us. Nothing more to do.
    if (serverCountry) return;

    // 3. Local dev / non-Vercel host: ask a free IP endpoint, best effort.
    (async () => {
      try {
        const res = await fetch('https://ipwho.is/?fields=country_code', {
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data: { country_code?: string } = await res.json();
        if (!cancelled && data.country_code) {
          setCode(marketFor(data.country_code).code);
          setDetected(true);
        }
      } catch {
        /* offline or blocked — the default market stands */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [serverCountry]);

  const setMarket = useCallback((next: string) => {
    setCode(marketFor(next).code);
    setDetected(true);
    try {
      window.localStorage.setItem(KEY, marketFor(next).code);
    } catch {
      /* ignore */
    }
  }, []);

  const market = useMemo(() => marketFor(code), [code]);

  const value = useMemo<Ctx>(
    () => ({
      market,
      setMarket,
      detected,
      money: (n: number) => formatMoney(n, market),
      markets: MARKETS_SORTED,
    }),
    [market, setMarket, detected]
  );

  return <CurrencyCtx.Provider value={value}>{children}</CurrencyCtx.Provider>;
}

/** The little country/currency pill used above pricing tables. */
export function CurrencySwitcher({ compact = false }: { compact?: boolean }) {
  const { market, setMarket, markets } = useCurrency();

  return (
    <label className="cur-switch">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" style={{ color: 'var(--muted)' }}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
      </svg>
      {!compact && <span className="muted">Prices for</span>}
      <select
        value={market.code}
        onChange={(e) => setMarket(e.target.value)}
        aria-label="Choose your country for local pricing"
      >
        {markets.map((m) => (
          <option key={m.code} value={m.code}>
            {m.country} · {m.currency}
          </option>
        ))}
      </select>
    </label>
  );
}
