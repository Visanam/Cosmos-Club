import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import EpisodePreview from '@/components/EpisodePreview';
import { ArrowRight, Lock, Shield } from '@/components/Icon';
import { EPISODE_ARC, PROMISES } from '@/lib/episodes';

export const metadata: Metadata = {
  title: 'Peek inside',
  description:
    'A deliberate glimpse of Planet X — the world, the art direction and four frames from Episode 1. The story itself stays where it belongs.',
  alternates: { canonical: '/peek-inside' },
};

const WORLD = [
  {
    img: '/images/scenery/village-day.webp',
    title: 'The village',
    body: 'Hand-built, plant-covered, thousands of years old and entirely content. Warli-patterned walls, terracotta roofs, a teal spire at the centre of everything.',
  },
  {
    img: '/images/scenery/forest-day.webp',
    title: 'The long way home',
    body: 'Where children go when they want twenty minutes without an adult. Also where things start to go wrong.',
  },
  {
    img: '/images/scenery/forest-night.webp',
    title: 'The same forest, later',
    body: 'The palette does the emotional work. Nothing has to be said out loud for a six-year-old to know the mood has changed.',
  },
  {
    img: '/images/scenery/ship.webp',
    title: 'Something in the sky',
    body: 'One of the five thinks it is a meteorite. It is drawn for awe rather than dread — beautiful first, worrying second.',
  },
];

export default function PeekInsidePage() {
  return (
    <>
      <section className="section bg-night grain" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }}>
        <div className="aurora" />
        <div className="stars" style={{ opacity: 0.55 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">
              <Lock size={13} /> A glimpse, on purpose
            </span>
            <h1 className="display" style={{ maxWidth: '18ch' }}>
              We’ll show you the world. Not the story.
            </h1>
            <p className="lede" style={{ marginTop: 22, maxWidth: '56ch' }}>
              Enough to know whether the art is good enough for your child’s bookshelf. Not enough
              to ruin the first time they turn a page and gasp.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">Planet X</span>
            <h2 className="h1">Ghibli warmth, Indian bones</h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: '56ch', marginInline: 'auto' }}>
              Every background is painted, not generated-and-forgotten. Landmark geometry, light
              direction and time of day stay consistent from panel to panel, so the place feels real
              enough to miss.
            </p>
          </Reveal>

          <div className="grid g2" style={{ marginTop: 48 }}>
            {WORLD.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 110} variant="scale">
                <div className="art-frame ratio-wide">
                  <Image
                    src={w.img}
                    alt={w.title}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 900px) 92vw, 46vw"
                  />
                  <span className="veil-soft" />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 'auto 0 0',
                      padding: '26px 24px 22px',
                      color: '#fff',
                      zIndex: 2,
                    }}
                  >
                    <h3 className="h3" style={{ color: '#fff', marginBottom: 6 }}>
                      {w.title}
                    </h3>
                    <p className="small" style={{ color: 'rgba(255,255,255,.8)', maxWidth: '40ch' }}>
                      {w.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-night grain">
        <div className="aurora" style={{ opacity: 0.7 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">Episode 1 · four frames</span>
            <h2 className="h1">The gold markers are for you</h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: '54ch', marginInline: 'auto' }}>
              They mark the beats your parent brief will point you at. Your child sees no markers,
              no notes and no lesson — just a story.
            </p>
          </Reveal>

          <Reveal delay={130} style={{ marginTop: 44 }}>
            <EpisodePreview />
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">Season 1 · The Orb Eater</span>
            <h2 className="h1">Titles only</h2>
          </Reveal>
          <div className="grid g3" style={{ marginTop: 44 }}>
            {EPISODE_ARC.map((e, i) => (
              <Reveal key={e.ep} delay={(i % 3) * 90}>
                <div className="card card-hover" style={{ height: '100%' }}>
                  <span className="chip chip-gold">{e.ep}</span>
                  <h3 className="h3" style={{ margin: '14px 0 8px' }}>
                    {e.title}
                  </h3>
                  <p className="small muted">{e.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight bg-cream-2">
        <div className="wrap grid g3">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="card" style={{ height: '100%' }}>
                <span style={{ color: 'var(--teal)' }}>
                  <Shield size={21} />
                </span>
                <h3 className="h4" style={{ margin: '13px 0 8px' }}>
                  {p.title}
                </h3>
                <p className="small muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-tight bg-cream">
        <div className="wrap center">
          <Reveal>
            <h2 className="h2" style={{ maxWidth: '20ch', marginInline: 'auto' }}>
              The rest arrives at your door.
            </h2>
            <Link href="/pricing" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>
              Start Season 1 <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
