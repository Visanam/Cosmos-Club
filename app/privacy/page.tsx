import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What we collect, why, and what we will never do with it.',
  alternates: { canonical: '/privacy' },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: 'The short version',
    p: [
      'We collect the minimum needed to send you a comic and a useful brief. We do not sell data, we do not build advertising profiles from children, and we do not run behavioural ads against anything you tell us about your child.',
      'This page is a plain-English summary written for launch. Have a lawyer in your jurisdiction review and replace it before you take real payments — particularly for GDPR (EU/UK), India’s DPDP Act 2023, and COPPA if you market to the United States.',
    ],
  },
  {
    h: 'What we collect',
    p: [
      'From visitors: standard server logs and, if you consent, privacy-respecting analytics. The Values Compass runs entirely in your browser — answers are never sent to us unless you press send on the email form.',
      'From subscribers: your name, email, delivery address, your child’s first name and age, and the values you selected. The child’s first name and age exist only to make the parent briefs readable; they are never used for advertising.',
    ],
  },
  {
    h: 'Children’s data',
    p: [
      'Our account holder is always the parent or guardian, never the child. We do not create accounts for children, we do not collect a child’s contact details, and there is no messaging feature a child could use.',
    ],
  },
  {
    h: 'Payments',
    p: [
      'Card details are handled entirely by our payment provider and never touch our servers. We store only the provider’s transaction reference and what you bought.',
    ],
  },
  {
    h: 'Your rights',
    p: [
      `Write to ${site.email} and we will export or delete everything we hold about you, usually the same week. You do not need to give a reason.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="section bg-cream" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }}>
      <div className="wrap-narrow">
        <Reveal>
          <span className="eyebrow">Legal</span>
          <h1 className="h1">Privacy</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Last updated when this site was built. Replace with your reviewed policy before launch.
          </p>
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
