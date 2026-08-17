import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ParentPortalDemo from '@/components/ParentPortalDemo';
import { ArrowRight, Book, Chat, Compass, Shield, Truck } from '@/components/Icon';
import { EPISODE_ARC, PROMISES } from '@/lib/episodes';
import { VALUES } from '@/lib/values';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'You choose the values. Your child reads the comic. You receive the brief, three questions and a guide. Here is exactly what happens, episode by episode.',
  alternates: { canonical: '/how-it-works' },
};

const TIMELINE = [
  {
    day: 'Day 0',
    title: 'You set the compass',
    body: 'Pick your values directly, or spend two minutes on the Values Compass and let it tell you. You can change them between seasons — most families do.',
    icon: <Compass size={19} />,
  },
  {
    day: 'Day 1',
    title: 'The episode arrives',
    body: 'Printed and posted, or delivered digitally. Twenty-four pages, B5, no branding on the outside that says “educational”.',
    icon: <Truck size={19} />,
  },
  {
    day: 'Day 1–3',
    title: 'Your child reads it. Alone.',
    body: 'This part is theirs. No parent guide inside, no questions at the back, no reward chart. It is a comic and it is allowed to just be a comic.',
    icon: <Book size={19} />,
  },
  {
    day: 'Day 3',
    title: 'Your brief lands',
    body: 'A summary of what they read, the three moments that matter for your values, the three questions to ask, and one guide article written for you.',
    icon: <Chat size={19} />,
  },
  {
    day: 'Day 3–14',
    title: 'You have fifteen minutes',
    body: 'In the car, at bedtime, over dinner. Then the next episode is already on its way. Six episodes make a season; a season takes about three months.',
    icon: <Shield size={19} />,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="section bg-night grain" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }}>
        <div className="aurora" />
        <div className="stars" style={{ opacity: 0.5 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">How it works</span>
            <h1 className="display" style={{ maxWidth: '17ch' }}>
              The comic is for them. The programme is for you.
            </h1>
            <p className="lede" style={{ marginTop: 22, maxWidth: '56ch' }}>
              Your child never finds out there was a plan. That is not a marketing line — it is the
              single design rule everything else follows from.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-cream">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">One episode, start to finish</span>
            <h2 className="h1">What actually happens</h2>
          </Reveal>

          <div style={{ marginTop: 52, display: 'grid', gap: 0 }}>
            {TIMELINE.map((t, i) => (
              <Reveal key={t.day} delay={i * 90}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 26,
                    paddingBottom: 34,
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <span className="step-num" style={{ background: 'var(--paper)', color: 'var(--teal)', border: '1.5px solid var(--line-strong)', boxShadow: 'none' }}>
                      {t.icon}
                    </span>
                    {i < TIMELINE.length - 1 && (
                      <span
                        aria-hidden="true"
                        style={{
                          width: 1.5,
                          flex: 1,
                          minHeight: 40,
                          background: 'linear-gradient(180deg, var(--line-strong), transparent)',
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <span className="chip chip-gold">{t.day}</span>
                    <h3 className="h3" style={{ margin: '14px 0 8px' }}>
                      {t.title}
                    </h3>
                    <p className="muted" style={{ maxWidth: '56ch' }}>
                      {t.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portal */}
      <section className="section bg-cream-2">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">The parent side</span>
            <h2 className="h1">Same story. Three different parents.</h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: '58ch', marginInline: 'auto' }}>
              Switch between them below. The comic they received is byte-for-byte identical.
            </p>
          </Reveal>
          <Reveal delay={130} style={{ marginTop: 44 }}>
            <ParentPortalDemo />
          </Reveal>
        </div>
      </section>

      {/* Values grid */}
      <section className="section bg-cream">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">Twelve to choose from</span>
            <h2 className="h1">The values we build around</h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: '54ch', marginInline: 'auto' }}>
              One value per episode, never stacked. Pick up to three per season — we sequence them
              so the hardest one lands when your child already trusts the characters.
            </p>
          </Reveal>

          <div className="grid g3" style={{ marginTop: 46 }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 90}>
                <div className="card card-hover" style={{ height: '100%' }}>
                  <h3 className="h4" style={{ marginBottom: 8 }}>
                    {v.name}
                  </h3>
                  <p className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
                    {v.signal}
                  </p>
                  <p className="small muted">{v.approach}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Season arc */}
      <section className="section bg-night grain">
        <div className="aurora" />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">Season 1 · The Orb Eater</span>
            <h2 className="h1">Six episodes, one arc</h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: '54ch', marginInline: 'auto' }}>
              Titles only. We are not going to spoil the story on a sales page.
            </p>
          </Reveal>

          <div className="grid g3" style={{ marginTop: 46 }}>
            {EPISODE_ARC.map((e, i) => (
              <Reveal key={e.ep} delay={(i % 3) * 90}>
                <div className="card glass" style={{ height: '100%' }}>
                  <span className="tiny" style={{ color: 'var(--gold-soft)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {e.ep}
                  </span>
                  <h3 className="h3" style={{ color: '#fff', margin: '10px 0 8px' }}>
                    {e.title}
                  </h3>
                  <p className="small" style={{ color: 'rgba(255,255,255,.7)' }}>
                    {e.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="center" style={{ marginTop: 46 }}>
            <div className="grid g3" style={{ marginTop: 20 }}>
              {PROMISES.map((p) => (
                <div key={p.title} style={{ textAlign: 'left' }}>
                  <h4 className="h4" style={{ color: 'var(--teal-bright)' }}>{p.title}</h4>
                  <p className="small" style={{ color: 'rgba(255,255,255,.68)' }}>{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-cream-2">
        <div className="wrap center">
          <Reveal>
            <h2 className="h2">Start with the compass. It’s free and it takes two minutes.</h2>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
              <Link href="/values-compass" className="btn btn-primary btn-lg">
                <Compass size={18} /> Take the Values Compass
              </Link>
              <Link href="/pricing" className="btn btn-ghost btn-lg">
                See pricing <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
