import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowRight, Check, School, Shield, Sparkle } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Schools & NEP 2020',
  description:
    'A ready-made Social and Emotional Learning programme for Indian schools implementing NEP 2020 — with the one thing every other SEL vendor is missing: the parent at home.',
  alternates: { canonical: '/schools' },
};

const PILLARS = [
  {
    t: 'Curriculum-mapped, not curriculum-shaped',
    b: 'Each episode carries one competency drawn from the NEP 2020 SEL framing — self-awareness, self-management, social awareness, relationship skills, responsible decision-making. One per episode. Never stacked.',
  },
  {
    t: 'Zero teacher prep',
    b: 'A single A4 facilitation sheet per episode: the three discussion beats, two activity options, and what to do when a child says something you were not expecting.',
  },
  {
    t: 'The parent is included',
    b: 'This is the part school SEL programmes structurally cannot do. Every family receives the same brief our subscribers get — so the value being taught on Tuesday gets repeated at the dinner table on Tuesday night.',
  },
  {
    t: 'Parents choose too',
    b: 'Within the school-wide value for the term, each family selects their own emphasis. The class stays in sync; the home layer stays personal.',
  },
];

const STEPS = [
  { n: '01', t: 'Pilot one grade, one term', b: 'Six episodes, one class set, one facilitation pack. Six to twelve weeks.' },
  { n: '02', t: 'We measure two things', b: 'Teacher-observed engagement, and parent-reported conversations at home. The second one is the number that matters.' },
  { n: '03', t: 'Scale by grade or by campus', b: 'Print licensing, digital classroom access, or both. Group pricing scales down sharply past 200 students.' },
];

export default function SchoolsPage() {
  return (
    <>
      <section className="section bg-night grain" style={{ paddingTop: 'calc(var(--nav-h) + 72px)' }}>
        <div className="aurora" />
        <div className="stars" style={{ opacity: 0.45 }} />
        <div className="wrap split" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">
              <School size={14} /> For schools
            </span>
            <h1 className="display" style={{ maxWidth: '17ch' }}>
              SEL that doesn’t stop at the school gate.
            </h1>
            <p className="lede" style={{ marginTop: 22, maxWidth: '52ch' }}>
              NEP 2020 asks schools to teach social and emotional learning. The difficulty has never
              been the lesson — it is that the child goes home to a house where nobody knows what
              the lesson was.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
              <Link href="/contact?enquiry=school" className="btn btn-gold btn-lg">
                Request a pilot pack
              </Link>
              <Link href="/how-it-works" className="btn btn-ghost-light btn-lg">
                See the programme
              </Link>
            </div>
          </Reveal>

          <Reveal delay={130} variant="scale">
            <div className="art-frame" style={{ borderColor: 'rgba(255,255,255,.14)' }}>
              <Image
                src="/images/scenery/village-day.webp"
                alt="A classroom-ready world: the village on Planet X"
                width={1536}
                height={1024}
                sizes="(max-width: 900px) 92vw, 46vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">What makes it different</span>
            <h2 className="h1">Four things your current SEL vendor cannot do</h2>
          </Reveal>
          <div className="grid g2" style={{ marginTop: 46 }}>
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={(i % 2) * 110}>
                <div className="card card-hover" style={{ height: '100%' }}>
                  <span style={{ color: 'var(--teal)' }}>
                    <Check size={21} />
                  </span>
                  <h3 className="h3" style={{ margin: '13px 0 10px' }}>
                    {p.t}
                  </h3>
                  <p className="small muted">{p.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream-2">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">How a pilot runs</span>
            <h2 className="h1">One term. One grade. Then decide.</h2>
          </Reveal>
          <div className="grid g3" style={{ marginTop: 46 }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="card" style={{ height: '100%' }}>
                  <span className="step-num">{s.n}</span>
                  <h3 className="h3" style={{ margin: '16px 0 8px' }}>
                    {s.t}
                  </h3>
                  <p className="small muted">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} style={{ marginTop: 40 }}>
            <div className="note note-teal" style={{ maxWidth: '70ch', marginInline: 'auto' }}>
              <Shield size={15} /> <strong>Content safety.</strong> Every panel is checked against
              the same rules we use for home subscribers: no weapons, no gore, no character death,
              no sarcasm, and a sleep test on every frightening beat. Full content policy available
              on request for your review committee.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-night grain">
        <div className="aurora" />
        <div className="wrap center" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow eyebrow-c">
              <Sparkle size={14} /> Pilot slots for the coming term
            </span>
            <h2 className="h1" style={{ maxWidth: '20ch', marginInline: 'auto' }}>
              Tell us your grade and we’ll build the pack.
            </h2>
            <Link href="/contact?enquiry=school" className="btn btn-primary btn-lg" style={{ marginTop: 26 }}>
              Request a pilot pack <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
