'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCurrency, CurrencySwitcher } from '@/components/CurrencyProvider';
import { PLANS, type PlanId } from '@/lib/pricing';
import { VALUES } from '@/lib/values';
import { Check, Lock, Shield } from '@/components/Icon';

const VALID: PlanId[] = ['digital', 'season', 'founding'];

export default function CheckoutClient() {
  const params = useSearchParams();
  const { market, money, setMarket } = useCurrency();

  const requested = (params.get('plan') ?? 'season') as PlanId;
  const planId: PlanId = VALID.includes(requested) ? requested : 'season';
  const plan = PLANS.find((p) => p.id === planId)!;
  const price = market[planId];

  const [picked, setPicked] = useState<string[]>(['courage']);
  const [placed, setPlaced] = useState(false);

  const countryParam = params.get('country');
  useEffect(() => {
    if (countryParam) setMarket(countryParam);
    // Only when the URL changes — the switcher owns it after that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryParam]);

  function toggle(id: string) {
    setPicked((cur) =>
      cur.includes(id) ? cur.filter((v) => v !== id) : cur.length >= 3 ? cur : [...cur, id]
    );
  }

  return (
    <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + 56px)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.35fr) minmax(0,1fr)', gap: 34, alignItems: 'start' }} className="checkout-grid">
          {/* ------------------------------------------------------- form */}
          <div>
            <span className="eyebrow">Checkout</span>
            <h1 className="h1" style={{ maxWidth: '16ch' }}>
              Two minutes and you’re done.
            </h1>

            {placed ? (
              <div className="card" style={{ marginTop: 30, borderColor: 'rgba(0,139,139,.35)' }}>
                <span className="step-num" style={{ marginBottom: 16 }}>
                  <Check size={20} />
                </span>
                <h2 className="h3">Order captured (demo mode)</h2>
                <p className="muted" style={{ marginTop: 8 }}>
                  This build does not charge cards yet. When you connect a payment provider, this
                  is the point where the customer would be handed to the hosted checkout.
                </p>
                <div className="note" style={{ marginTop: 18 }}>
                  <strong>What we would send to the provider:</strong>
                  <br />
                  plan <code>{planId}</code> · amount <code>{price}</code> · currency{' '}
                  <code>{market.currency}</code> · country <code>{market.code}</code> · values{' '}
                  <code>{picked.join(', ') || 'none'}</code>
                </div>
                <Link href="/" className="btn btn-ghost" style={{ marginTop: 20 }}>
                  Back to the club
                </Link>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  /* ------------------------------------------------------------------
                   * PAYMENT INTEGRATION GOES HERE.
                   *
                   * Razorpay (best for India / INR — UPI, cards, netbanking):
                   *   1. Create an order server-side (app/api/razorpay/route.ts) with
                   *      amount = price * 100 and currency = market.currency.
                   *   2. Open Razorpay Checkout with the returned order_id.
                   *
                   * Stripe (best for USD / EUR / GBP / SGD and subscriptions):
                   *   1. Create a Checkout Session server-side with the same amount.
                   *   2. redirect to session.url.
                   *
                   * Keep the amount authoritative on the SERVER — never trust the
                   * price posted from the browser.
                   * ---------------------------------------------------------------- */
                  setPlaced(true);
                }}
                style={{ marginTop: 30, display: 'grid', gap: 22 }}
              >
                <div className="card">
                  <h2 className="h4" style={{ marginBottom: 16 }}>
                    1. Who is this for?
                  </h2>
                  <div className="grid g2">
                    <div className="field">
                      <label htmlFor="ch-parent">Your name</label>
                      <input id="ch-parent" required autoComplete="name" />
                    </div>
                    <div className="field">
                      <label htmlFor="ch-email">Email</label>
                      <input id="ch-email" type="email" required autoComplete="email" />
                    </div>
                    <div className="field">
                      <label htmlFor="ch-child">Child’s first name</label>
                      <input id="ch-child" required />
                    </div>
                    <div className="field">
                      <label htmlFor="ch-age">Child’s age</label>
                      <select id="ch-age" defaultValue="7">
                        {['5', '6', '7', '8', '9', '10', '11+'].map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="h4" style={{ marginBottom: 6 }}>
                    2. Choose up to three values
                  </h2>
                  <p className="small muted" style={{ marginBottom: 16 }}>
                    These decide your parent briefs — not the comic. You can change them between
                    seasons.{' '}
                    <Link href="/values-compass" className="link-arrow" style={{ display: 'inline' }}>
                      Not sure? Take the compass.
                    </Link>
                  </p>
                  <div className="pill-row">
                    {VALUES.map((v) => {
                      const on = picked.includes(v.id);
                      return (
                        <button
                          type="button"
                          key={v.id}
                          onClick={() => toggle(v.id)}
                          className="badge-soft"
                          style={{
                            cursor: 'pointer',
                            borderColor: on ? 'var(--teal)' : 'var(--line)',
                            background: on ? 'rgba(0,139,139,.09)' : 'var(--cream-2)',
                            color: on ? 'var(--teal)' : 'var(--ink-soft)',
                          }}
                          aria-pressed={on}
                        >
                          {on && <Check size={13} />}
                          {v.name}
                        </button>
                      );
                    })}
                  </div>
                  <p className="tiny muted" style={{ marginTop: 12 }}>
                    {picked.length}/3 chosen
                  </p>
                </div>

                {planId !== 'digital' && (
                  <div className="card">
                    <h2 className="h4" style={{ marginBottom: 16 }}>
                      3. Where should the comics go?
                    </h2>
                    <div style={{ display: 'grid', gap: 14 }}>
                      <div className="field">
                        <label htmlFor="ch-addr">Address</label>
                        <input id="ch-addr" required autoComplete="street-address" />
                      </div>
                      <div className="grid g3">
                        <div className="field">
                          <label htmlFor="ch-city">City</label>
                          <input id="ch-city" required autoComplete="address-level2" />
                        </div>
                        <div className="field">
                          <label htmlFor="ch-zip">Postcode</label>
                          <input id="ch-zip" required autoComplete="postal-code" />
                        </div>
                        <div className="field">
                          <label htmlFor="ch-country">Country</label>
                          <input id="ch-country" defaultValue={market.country} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="card" style={{ borderStyle: 'dashed' }}>
                  <h2 className="h4" style={{ marginBottom: 8 }}>
                    {planId === 'digital' ? '3' : '4'}. Payment
                  </h2>
                  <div className="note">
                    <strong>Demo mode.</strong> No payment provider is connected yet. Wire up
                    Razorpay for India and Stripe for international in{' '}
                    <code>app/checkout/CheckoutClient.tsx</code> — the exact spot is commented in
                    the submit handler.
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: 18 }}>
                    <Lock size={17} /> Pay {money(price)}
                  </button>
                  <p className="tiny muted center" style={{ marginTop: 12 }}>
                    <Shield size={12} /> Thirty-day promise. If your child does not want Episode 2,
                    we refund the season.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ---------------------------------------------------- summary */}
          <aside
            className="card"
            style={{ position: 'sticky', top: 'calc(var(--nav-h) + 20px)', background: 'var(--cream-2)' }}
          >
            <h2 className="h4" style={{ marginBottom: 16 }}>
              Order summary
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
              <div>
                <div style={{ fontWeight: 650 }}>{plan.name}</div>
                <div className="tiny muted">{plan.kicker}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700 }}>
                {money(price)}
              </div>
            </div>

            <hr className="divider" style={{ margin: '18px 0' }} />

            <div style={{ display: 'grid', gap: 9 }}>
              {plan.features
                .filter((f) => f.on)
                .slice(0, 6)
                .map((f) => (
                  <div key={f.text} style={{ display: 'flex', gap: 10 }}>
                    <Check size={16} style={{ color: 'var(--teal)', flex: 'none', marginTop: 3 }} />
                    <span className="small">{f.text}</span>
                  </div>
                ))}
            </div>

            <hr className="divider" style={{ margin: '18px 0' }} />

            <div style={{ display: 'grid', gap: 10 }}>
              <CurrencySwitcher compact />
              <p className="tiny muted">
                Shown in {market.currency} for {market.country}. Taxes and any shipping are
                calculated at the payment step.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
              {PLANS.filter((p) => p.id !== planId).map((p) => (
                <Link
                  key={p.id}
                  href={`/checkout?plan=${p.id}&country=${market.code}`}
                  className="tiny link-arrow"
                >
                  Switch to {p.name} — {money(market[p.id])}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: minmax(0,1fr) !important; }
          .checkout-grid aside { position: static !important; }
        }
      `}</style>
    </section>
  );
}
