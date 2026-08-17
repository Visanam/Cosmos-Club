'use client';

import Link from 'next/link';
import { PLANS, perEpisode } from '@/lib/pricing';
import { CurrencySwitcher, useCurrency } from './CurrencyProvider';
import { Check, Cross, Globe } from './Icon';

export default function PricingTable({ compact = false }: { compact?: boolean }) {
  const { market, money, detected } = useCurrency();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          marginBottom: 30,
        }}
      >
        <CurrencySwitcher />
        <span className="tiny muted" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Globe size={13} />
          {detected
            ? `Showing ${market.country} pricing — adjusted for local purchasing power.`
            : 'Choose your country to see local pricing.'}
        </span>
      </div>

      <div className="plans">
        {PLANS.map((plan) => {
          const price = market[plan.id];
          const shownFeatures = compact ? plan.features.slice(0, 5) : plan.features;

          return (
            <div key={plan.id} className={`plan${plan.featured ? ' plan-featured' : ''}`}>
              {plan.featured && <span className="plan-flag">Most families choose this</span>}

              <span className="chip" style={{ alignSelf: 'flex-start' }}>
                {plan.kicker}
              </span>

              <h3 className="h3" style={{ margin: '16px 0 0' }}>
                {plan.name}
              </h3>

              <div className="plan-price">
                <span className="plan-amt">{money(price)}</span>
                <span className="plan-per">
                  {plan.id === 'founding' ? 'for all 18 episodes' : 'for the season'}
                </span>
              </div>

              <p className="tiny muted" style={{ margin: '0 0 12px' }}>
                Works out at {perEpisode(price, plan.episodes, market)} an episode
                {plan.id === 'founding' ? ' — the lowest we offer.' : '.'}
              </p>

              <p className="small muted" style={{ margin: 0 }}>
                {plan.blurb}
              </p>

              <ul className="feat">
                {shownFeatures.map((f) => (
                  <li key={f.text} className={f.on ? undefined : 'off'}>
                    {f.on ? (
                      <Check size={17} style={{ color: 'var(--teal)' }} />
                    ) : (
                      <Cross size={17} style={{ color: 'var(--muted)' }} />
                    )}
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/checkout?plan=${plan.id}&country=${market.code}`}
                className={`btn btn-block ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}
              >
                {plan.cta}
              </Link>
            </div>
          );
        })}
      </div>

      <p className="tiny muted center" style={{ marginTop: 26, maxWidth: '60ch', marginInline: 'auto' }}>
        Prices are set per country using purchasing-power parity, so a family in Chennai and a family
        in Chicago pay what the same thing is worth where they live. Taxes and shipping, where they
        apply, are shown at checkout.
      </p>
    </>
  );
}
