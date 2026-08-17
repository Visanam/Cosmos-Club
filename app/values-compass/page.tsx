import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import ValuesCompass from '@/components/ValuesCompass';
import { Compass, Heart, Lock, Sparkle } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'The Values Compass — a free 2-minute read on your child',
  description:
    'Eight honest questions about the child you actually have. Get the three values worth working on this season, plus the exact questions to ask after Episode 1. Free, no account needed.',
  alternates: { canonical: '/values-compass' },
  openGraph: {
    title: 'The Values Compass · Cosmos Club',
    description:
      'Eight questions. Two minutes. The three values worth working on with your child this season.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'The Values Compass',
  about: 'Identifying which character values to focus on with a child aged 6–9',
  educationalLevel: 'Primary',
  isAccessibleForFree: true,
};

export default function ValuesCompassPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="section-tight bg-night grain"
        style={{ paddingTop: 'calc(var(--nav-h) + 60px)' }}
      >
        <div className="aurora" />
        <div className="stars" style={{ opacity: 0.5 }} />
        <div className="wrap center" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow eyebrow-c">
              <Compass size={14} /> Free · no account · nothing stored
            </span>
            <h1 className="display" style={{ maxWidth: '19ch', marginInline: 'auto' }}>
              Which three values does your child need this year?
            </h1>
            <p className="lede" style={{ marginTop: 20, maxWidth: '52ch', marginInline: 'auto' }}>
              Answer honestly about the child you have on a Tuesday evening, not the one in the
              parenting books. It works better that way.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream" style={{ paddingTop: 'clamp(40px,5vw,64px)' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Reveal variant="scale">
            <ValuesCompass />
          </Reveal>

          <Reveal delay={140} className="grid g3" style={{ marginTop: 40 }}>
            {[
              {
                icon: <Lock size={19} />,
                t: 'Nothing is stored',
                b: 'The quiz runs entirely in your browser. We only ever see an email address if you type one in and press send.',
              },
              {
                icon: <Heart size={19} />,
                t: 'No scores, no labels',
                b: 'This is not a diagnostic and your child is not being assessed. It is a way of deciding where to put your attention.',
              },
              {
                icon: <Sparkle size={19} />,
                t: 'You can change it later',
                b: 'Most families re-take it between seasons. Children change, and the thing that was urgent in March usually is not by September.',
              },
            ].map((c) => (
              <div className="card" key={c.t}>
                <span style={{ color: 'var(--teal)' }}>{c.icon}</span>
                <h3 className="h4" style={{ margin: '12px 0 6px' }}>
                  {c.t}
                </h3>
                <p className="small muted">{c.b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
