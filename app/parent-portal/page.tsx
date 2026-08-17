import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ParentPortalDemo from '@/components/ParentPortalDemo';
import { ArrowRight, Compass } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'The parent portal',
  description:
    'A working demo of what arrives after each episode: the summary, your three questions, a guide written for you, and where you are in the season.',
  alternates: { canonical: '/parent-portal' },
};

export default function ParentPortalPage() {
  return (
    <>
      <section
        className="section-tight bg-night grain"
        style={{ paddingTop: 'calc(var(--nav-h) + 64px)' }}
      >
        <div className="aurora" />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">The parent portal</span>
            <h1 className="display" style={{ maxWidth: '18ch' }}>
              This is the half your child never sees.
            </h1>
            <p className="lede" style={{ marginTop: 20, maxWidth: '54ch' }}>
              A real demo, not a screenshot. Switch parents, switch tabs — the comic stays the same
              and everything else moves.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <Reveal>
            <ParentPortalDemo />
          </Reveal>

          <Reveal delay={140} className="grid g3" style={{ marginTop: 48 }}>
            {[
              {
                t: 'Written for a tired adult',
                b: 'Six minutes to read, at most. No jargon, no citations you have to chase, no implication that you should already have known this.',
              },
              {
                t: 'Nothing expires',
                b: 'Briefs stay in the portal. If you miss three weeks, the questions still work — children do not have a shelf life on this.',
              },
              {
                t: 'You can change values any time',
                b: 'Discipline in March, emotional regulation by September. Update the compass and the next brief follows immediately.',
              },
            ].map((c) => (
              <div className="card" key={c.t}>
                <h3 className="h4" style={{ marginBottom: 8 }}>
                  {c.t}
                </h3>
                <p className="small muted">{c.b}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={200} className="center" style={{ marginTop: 44 }}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/values-compass" className="btn btn-primary btn-lg">
                <Compass size={18} /> Set your values first
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
