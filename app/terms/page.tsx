import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The terms on which we sell a season of Cosmos Club.',
  alternates: { canonical: '/terms' },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: 'Placeholder notice',
    p: [
      'This is a plain-English draft written so the site is complete at launch. Have a lawyer in your jurisdiction review and replace it before you take real payments.',
    ],
  },
  {
    h: 'What you are buying',
    p: [
      'A season is six episodes plus the accompanying parent briefs and guides. A season is a one-off purchase, not a rolling subscription — nothing renews without you agreeing to it.',
      'Founding Family covers three seasons, eighteen episodes, purchased in advance.',
    ],
  },
  {
    h: 'Delivery',
    p: [
      'Printed episodes are posted roughly every two weeks. Delivery estimates are estimates; postal services outside our control occasionally are not. Digital access is available immediately and does not expire.',
    ],
  },
  {
    h: 'Refunds',
    p: [
      'If your child does not want the second episode, tell us within thirty days of the first delivery and we refund the season in full. You keep the episode you have. We do not ask for it back and we do not ask why.',
    ],
  },
  {
    h: 'Intellectual property',
    p: [
      `All characters, artwork, scripts, model sheets and story materials are original works owned by ${site.publisher}. Your purchase is a licence to read and enjoy them at home. Schools require a separate classroom licence — see the schools page.`,
      'Reproduction, resale, redistribution or use in training data sets is not permitted.',
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="section bg-cream" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }}>
      <div className="wrap-narrow">
        <Reveal>
          <span className="eyebrow">Legal</span>
          <h1 className="h1">Terms</h1>
        </Reveal>

        {SECTIONS.map((s, i) => (
          <Reveal key={s.h} delay={i * 70} style={{ marginTop: 40 }}>
            <h2 className="h3">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para} className="muted">
                {para}
              </p>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
