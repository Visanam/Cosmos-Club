import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowRight, Gift, Heart, Sparkle } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Bespoke comics for weddings & celebrations',
  description:
    'The same studio pipeline, pointed at your family. Custom-illustrated comic books for weddings, receptions, anniversaries and milestone birthdays.',
  alternates: { canonical: '/celebrations' },
};

const OCCASIONS = [
  {
    t: 'Weddings & receptions',
    b: 'How the two of you met, drawn as a twelve-page comic and placed on every table. It gets read. Menus do not.',
    img: '/images/scenery/village-day.webp',
  },
  {
    t: 'Anniversaries',
    b: 'Twenty-five years compressed into a story your grandchildren will actually sit through.',
    img: '/images/scenery/village-dusk.webp',
  },
  {
    t: 'Milestone birthdays',
    b: 'Your child as the hero of their own episode, with their real friends drawn in as the cast.',
    img: '/images/scenery/forest-day.webp',
  },
];

const PROCESS = [
  { n: '01', t: 'The interview', b: 'Ninety minutes on a call. We collect the details nobody else would think to ask for — the argument about the car, the dog’s name, the thing they always say.' },
  { n: '02', t: 'The script', b: 'A tight story with a shape, not a slideshow of events. You approve it before a single panel is drawn.' },
  { n: '03', t: 'The art', b: 'Character sheets first, so everyone is recognisable. Then panels, in the same Ghibli-warm style as Cosmos Club.' },
  { n: '04', t: 'The print', b: 'Hardbound keepsake copies, plus print-ready files if you want table copies at volume.' },
];

export default function CelebrationsPage() {
  return (
    <>
      <section className="section bg-night grain" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }}>
        <div className="aurora" />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">
              <Gift size={14} /> Bespoke studio work
            </span>
            <h1 className="display" style={{ maxWidth: '18ch' }}>
              Your story. Drawn properly.
            </h1>
            <p className="lede" style={{ marginTop: 22, maxWidth: '54ch' }}>
              We built an illustration pipeline to make a children’s series. It turns out the same
              pipeline makes the best wedding favour anyone at the table has ever been handed.
            </p>
            <Link href="/contact?enquiry=bespoke" className="btn btn-gold btn-lg" style={{ marginTop: 26 }}>
              Start a commission <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">What we make</span>
            <h2 className="h1">Three things people keep asking for</h2>
          </Reveal>
          <div className="grid g3" style={{ marginTop: 46 }}>
            {OCCASIONS.map((o, i) => (
              <Reveal key={o.t} delay={i * 110} variant="scale">
                <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                    <Image
                      src={o.img}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 92vw, 30vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 24 }}>
                    <h3 className="h3" style={{ marginBottom: 8 }}>
                      {o.t}
                    </h3>
                    <p className="small muted">{o.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream-2">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">How it runs</span>
            <h2 className="h1">Four steps, six to eight weeks</h2>
          </Reveal>
          <div className="grid g4" style={{ marginTop: 46 }}>
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <div className="card" style={{ height: '100%' }}>
                  <span className="step-num">{p.n}</span>
                  <h3 className="h4" style={{ margin: '16px 0 8px' }}>
                    {p.t}
                  </h3>
                  <p className="small muted">{p.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center" style={{ marginTop: 36 }}>
            <p className="small muted" style={{ maxWidth: '54ch', marginInline: 'auto' }}>
              Commissions are quoted individually — page count, cast size and print run all move the
              number. Most wedding books land between twelve and twenty pages.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-night grain">
        <div className="aurora" />
        <div className="wrap center" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow eyebrow-c">
              <Heart size={14} /> Limited commissions each quarter
            </span>
            <h2 className="h1" style={{ maxWidth: '20ch', marginInline: 'auto' }}>
              Tell us the date and we’ll tell you if we can make it.
            </h2>
            <Link href="/contact?enquiry=bespoke" className="btn btn-primary btn-lg" style={{ marginTop: 26 }}>
              <Sparkle size={18} /> Start a commission
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
