import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowRight } from '@/components/Icon';
import { POSTS } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'The journal',
  description:
    'Practical, unsentimental writing for parents on courage, anger, resilience and connection — the same guides our subscribers receive after each episode.',
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  const [lead, ...rest] = POSTS;

  return (
    <>
      <section
        className="section-tight bg-night grain"
        style={{ paddingTop: 'calc(var(--nav-h) + 64px)' }}
      >
        <div className="aurora" />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">The journal</span>
            <h1 className="display" style={{ maxWidth: '17ch' }}>
              Written for the parent, not about the child.
            </h1>
            <p className="lede" style={{ marginTop: 20, maxWidth: '54ch' }}>
              These are the guides subscribers receive after each episode. We publish a few of them
              openly, because they are useful whether or not you ever buy a comic.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          {lead && (
            <Reveal variant="scale">
              <Link href={`/journal/${lead.slug}`} className="card card-hover" style={{ padding: 0, overflow: 'hidden', display: 'block' }}>
                <div className="split" style={{ gap: 0, alignItems: 'stretch' }}>
                  <div style={{ position: 'relative', minHeight: 300 }}>
                    <Image
                      src={lead.cover}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 92vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: 'clamp(26px,3.4vw,44px)' }}>
                    <span className="chip chip-gold">{lead.value}</span>
                    <h2 className="h2" style={{ margin: '18px 0 12px' }}>
                      {lead.title}
                    </h2>
                    <p className="muted">{lead.excerpt}</p>
                    <span className="link-arrow" style={{ marginTop: 18 }}>
                      Read it <ArrowRight size={17} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid g3" style={{ marginTop: 30 }}>
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 100}>
                <Link href={`/journal/${p.slug}`} className="card card-hover" style={{ padding: 0, overflow: 'hidden', display: 'block', height: '100%' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                    <Image src={p.cover} alt="" fill sizes="(max-width: 900px) 92vw, 30vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 24 }}>
                    <span className="chip">{p.value}</span>
                    <h3 className="h3" style={{ margin: '14px 0 10px' }}>
                      {p.title}
                    </h3>
                    <p className="small muted">{p.excerpt}</p>
                    <p className="tiny muted" style={{ marginTop: 14 }}>
                      {p.readMins} min read
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
