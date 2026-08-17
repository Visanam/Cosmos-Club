import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/Accordion';
import { ArrowRight } from '@/components/Icon';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Questions',
  description:
    'Everything parents ask before joining Cosmos Club — about the comic, the personalisation, safety, shipping, pricing and refunds.',
  alternates: { canonical: '/faq' },
};

const GROUPS = [
  {
    heading: 'The comic',
    items: [
      {
        q: 'What age is this for?',
        a: 'Six to nine. Word count is capped at 600 an episode and twelve words a speech bubble, which is deliberately below what a confident eight-year-old can manage — a comic should never feel like reading practice. Five-year-olds enjoy it read aloud. Ten-year-olds usually still read it and pretend they do not.',
      },
      {
        q: 'How long is an episode?',
        a: 'Twenty-four pages, B5 size, about eleven minutes of reading. Six episodes make a season, delivered roughly every two weeks, so a season runs about three months.',
      },
      {
        q: 'Will it frighten them?',
        a: 'There is a villain and he is genuinely unsettling — that is where the courage comes from, and a story with nothing at stake teaches nothing. But every frightening panel is checked against one rule: would a six-year-old sleep fine after this? No sharp teeth, no gore, no weapons, nobody dies, and nothing is destroyed.',
      },
      {
        q: 'Is there a lesson at the back?',
        a: 'No. No worksheet, no quiz, no discussion prompts, no reward chart. Your child gets a story and nothing else. The entire teaching layer is on your side of the transaction, and they never find out it exists.',
      },
      {
        q: 'Does a child solve the story, or an adult?',
        a: 'A child. Always. Never an adult, never luck, never the shortcut. It is one of three rules we do not break — because the point is that the person your child is reading about is the person who fixes things.',
      },
    ],
  },
  {
    heading: 'The personalisation',
    items: [
      {
        q: 'If every child gets the same comic, what is personalised?',
        a: 'Everything you receive. The story is fixed on purpose — it means every child in the club can talk to every other child about the same episode, and it means we can make one genuinely beautiful comic instead of a thousand mediocre ones. What changes is the parent layer: which emotional beats we point you at, the three questions we give you, and the guide article we send.',
      },
      {
        q: 'How many values can I choose?',
        a: 'Up to three per season. We sequence them across the six episodes so the hardest one lands after your child already trusts the characters. One value per episode, never stacked.',
      },
      {
        q: 'Can I change them?',
        a: 'Any time. Update your compass and the very next brief follows. Most families change at least one value between seasons, which is exactly what should happen — children move.',
      },
      {
        q: 'What if I have two children?',
        a: 'Add a second child to your account and you receive a separate brief for each, with different values, off the same comic. You only pay for one extra printed copy, not a second subscription.',
      },
    ],
  },
  {
    heading: 'Practical',
    items: [
      {
        q: 'Do you ship outside India?',
        a: 'Yes — printed episodes go worldwide, and international shipping is charged once for the season rather than per episode, because we can post several together. Digital access is instant everywhere.',
      },
      {
        q: 'Why is the price different in different countries?',
        a: 'We set prices using purchasing-power parity rather than a flat exchange rate, so the club costs roughly the same share of a family’s week wherever that week is earned. The product is identical in every market.',
      },
      {
        q: 'What if my child hates it?',
        a: 'Then it was the wrong thing and you should not be paying for it. Tell us within thirty days of the first episode and we refund the season in full. You keep the episode.',
      },
      {
        q: 'Do you store data about my child?',
        a: 'The Values Compass runs entirely in your browser and stores nothing unless you ask us to email you the result. For subscribers we hold a first name, an age and your chosen values — that is what the personalisation runs on. We do not sell it, and we do not build advertising profiles from it.',
      },
      {
        q: 'I have a question that is not here.',
        a: `Write to ${site.email} and a human will answer. We are small enough that it will be one of us.`,
      },
    ],
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GROUPS.flatMap((g) =>
    g.items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section
        className="section-tight bg-night grain"
        style={{ paddingTop: 'calc(var(--nav-h) + 64px)' }}
      >
        <div className="aurora" />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">Questions</span>
            <h1 className="display" style={{ maxWidth: '16ch' }}>
              Ask us the awkward ones.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap-narrow">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.heading} delay={gi * 80} style={{ marginBottom: 48 }}>
              <h2 className="h3" style={{ marginBottom: 14 }}>
                {g.heading}
              </h2>
              <Accordion items={g.items} startOpen={gi === 0 ? 0 : -1} />
            </Reveal>
          ))}

          <Reveal className="center">
            <div className="card" style={{ background: 'var(--cream-2)' }}>
              <h2 className="h3" style={{ marginBottom: 8 }}>
                Still deciding?
              </h2>
              <p className="small muted" style={{ marginBottom: 18 }}>
                The Values Compass is free, takes two minutes and is genuinely useful even if you
                never buy anything.
              </p>
              <Link href="/values-compass" className="btn btn-primary">
                Take the Values Compass <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
