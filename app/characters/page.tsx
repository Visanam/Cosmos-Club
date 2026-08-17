import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import CharacterExplorer, { SprigMoodMeter } from '@/components/CharacterExplorer';
import { ArrowRight, Gift } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'The cast',
  description:
    'Meet Neo, Dev, Tara, Sia and Sprig — the five who carry every Cosmos Club season — and Vorax, who is not what he looks like.',
  alternates: { canonical: '/characters' },
};

export default function CharactersPage() {
  return (
    <>
      <section className="section bg-night grain" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }}>
        <div className="aurora" />
        <div className="stars" style={{ opacity: 0.5 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">The cast</span>
            <h1 className="display" style={{ maxWidth: '16ch' }}>
              Five children, one small blue creature.
            </h1>
            <p className="lede" style={{ marginTop: 22, maxWidth: '54ch' }}>
              They return in every episode of every season. By Episode 4 your child will have
              picked a favourite, and will tell you about them unprompted. That is the whole point.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <Reveal>
            <CharacterExplorer />
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-cream-2">
        <div className="wrap">
          <Reveal>
            <SprigMoodMeter />
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap split">
          <Reveal>
            <span className="eyebrow">Drawn once, drawn forever</span>
            <h2 className="h1">Model sheets, not vibes.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Every character has a locked turnaround, a fixed palette and a documented emotional
              range. Sprig is exactly 36 inches tall in every panel he has ever appeared in.
            </p>
            <p style={{ marginTop: 14 }}>
              This sounds like a production detail and it is actually the commercial engine. A
              character a child can recognise from the back, at a distance, in a different pose, is
              a character that can become a plushie on their bed.
            </p>
            <Link href="/pricing" className="link-arrow" style={{ marginTop: 10 }}>
              <Gift size={17} /> Merchandise ships with the Founding Family plan{' '}
              <ArrowRight size={16} />
            </Link>
          </Reveal>

          <Reveal delay={130} variant="scale">
            <div className="art-frame">
              <Image
                src="/images/sheets/sprig-model.webp"
                alt="Sprig official model sheet — turnaround, expressions, glow states and colour palette"
                width={1224}
                height={1285}
                sizes="(max-width: 900px) 92vw, 46vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-night grain">
        <div className="aurora" />
        <div className="wrap center" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <h2 className="h2" style={{ maxWidth: '22ch', marginInline: 'auto' }}>
              Want to see them in a panel rather than a portrait?
            </h2>
            <Link href="/peek-inside" className="btn btn-gold btn-lg" style={{ marginTop: 24 }}>
              Peek inside Episode 1 <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
