import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PricingTable from '@/components/PricingTable';
import Accordion from '@/components/Accordion';
import { ArrowRight, Globe, Shield, Truck } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Season passes priced by purchasing-power parity — ₹3,500 in India, $129 in the US, and a fair local equivalent in 50+ countries.',
  alternates: { canonical: '/pricing' },
};

const FAQS = [
  {
    q: 'Why does the price change by country?',
    a: 'Because a flat dollar price is not a flat price. We set each market using purchasing-power parity, which means the club costs roughly the same share of a family’s week whether that week is earned in Chennai, Chicago or Singapore. It is the same product either way — nothing is downgraded for the cheaper markets.',
  },
  {
    q: 'Is this a subscription that will auto-renew forever?',
    a: 'A season is a season: six episodes, one payment, and it ends. We will ask you before the next one starts. Founding Family covers three full seasons up front at the lowest per-episode rate we offer.',
  },
  {
    q: 'What does shipping cost?',
    a: 'Within India, shipping is included in the printed plans. International shipping is calculated at checkout by weight and destination — for most countries it is a single charge for the whole season, not per episode, because we can post several at once.',
  },
  {
    q: 'Can I buy this as a gift?',
    a: 'Yes, and it is one of the better gifts for a child whose grandparents live far away — six deliveries instead of one, spread over three months. Tell us at checkout and we will leave the pricing off the packing note.',
  },
  {
    q: 'What if my child hates it?',
    a: 'Then it was the wrong thing and you should not pay for it. Tell us within thirty days of the first episode and we will refund the season in full. You keep the episode.',
  },
];

export default function PricingPage() {
  return (
    <>
      <section
        className="section-tight bg-night grain"
        style={{ paddingTop: 'calc(var(--nav-h) + 64px)' }}
      >
        <div className="aurora" />
        <div className="stars" style={{ opacity: 0.5 }} />
        <div className="wrap center" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow eyebrow-c">
              <Globe size={14} /> Priced for where you live
            </span>
            <h1 className="display" style={{ maxWidth: '17ch', marginInline: 'auto' }}>
              A season of Cosmos Club
            </h1>
            <p className="lede" style={{ marginTop: 20, maxWidth: '52ch', marginInline: 'auto' }}>
              Six episodes. Six parent briefs. Eighteen conversations you would otherwise have had
              to invent yourself.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream" style={{ paddingTop: 'clamp(44px,5vw,68px)' }}>
        <div className="wrap">
          <Reveal>
            <PricingTable />
          </Reveal>

          <Reveal delay={140} className="grid g3" style={{ marginTop: 56 }}>
            {[
              {
                icon: <Shield size={20} />,
                t: 'Thirty-day promise',
                b: 'If your child does not want the second episode, tell us and we refund the season. They keep the first one.',
              },
              {
                icon: <Truck size={20} />,
                t: 'Posted, not couriered to death',
                b: 'Printed episodes arrive in a flat protective mailer that fits a letterbox. Digital access is instant either way.',
              },
              {
                icon: <Globe size={20} />,
                t: '50+ markets, fair everywhere',
                b: 'Local currency, local price, no surprise conversion fee at the end. Choose a different country any time from the selector above.',
              },
            ].map((c) => (
              <div className="card" key={c.t}>
                <span style={{ color: 'var(--teal)' }}>{c.icon}</span>
                <h3 className="h4" style={{ margin: '13px 0 8px' }}>
                  {c.t}
                </h3>
                <p className="small muted">{c.b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-cream-2">
        <div className="wrap-narrow">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">Before you decide</span>
            <h2 className="h2">Pricing questions</h2>
          </Reveal>
          <Reveal delay={110} style={{ marginTop: 32 }}>
            <Accordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-cream">
        <div className="wrap center">
          <Reveal>
            <h2 className="h2" style={{ maxWidth: '24ch', marginInline: 'auto' }}>
              Not ready to buy? Take the compass. It costs nothing and it is useful on its own.
            </h2>
            <Link href="/values-compass" className="btn btn-ghost btn-lg" style={{ marginTop: 24 }}>
              Take the Values Compass <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
