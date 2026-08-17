import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import EpisodePreview from '@/components/EpisodePreview';
import CharacterExplorer from '@/components/CharacterExplorer';
import ParentPortalDemo from '@/components/ParentPortalDemo';
import PricingTable from '@/components/PricingTable';
import Accordion from '@/components/Accordion';
import { ArrowRight, Book, Chat, Compass, Heart, Shield, Sparkle, Truck } from '@/components/Icon';
import { PROMISES } from '@/lib/episodes';
import { VALUES } from '@/lib/values';
import { site } from '@/lib/site';

const STEPS = [
  {
    n: '01',
    icon: <Compass size={20} />,
    title: 'You choose the values',
    body: 'Two minutes with the Values Compass, or just pick from a list. Courage. Discipline. Empathy. Whatever this year is actually about in your house.',
  },
  {
    n: '02',
    icon: <Book size={20} />,
    title: 'Your child gets a comic',
    body: 'A proper one — twenty-four pages, beautifully drawn, no homework attached. They read it because they want to. Six episodes make a season.',
  },
  {
    n: '03',
    icon: <Chat size={20} />,
    title: 'You get the conversation',
    body: 'After each episode: a short brief on what they read, three questions to ask, and one guide written for you. Fifteen minutes. In the car is fine.',
  },
];

const FAQS = [
  {
    q: 'Is this just homework in a nicer wrapper?',
    a: 'No. Your child never sees a worksheet, a quiz or a lesson. They get a story with a plot, jokes and a genuinely frightening middle. The teaching layer lives entirely on your side, in your inbox, and they never know it exists.',
  },
  {
    q: 'Every child gets the same comic. So what is personalised?',
    a: 'Everything you receive. The story is fixed — that is deliberate, because it means every child in the club can talk to every other child about the same episode. What changes is the parent layer: which of the story’s emotional moments we point you at, the three questions we give you, and the guide we send.',
  },
  {
    q: 'How old does my child need to be?',
    a: 'It is written for six to nine. Confident five-year-olds enjoy it read aloud; ten-year-olds usually still enjoy it and pretend they do not. Word count is capped at 600 an episode, twelve words a speech bubble.',
  },
  {
    q: 'Will it frighten them?',
    a: 'There is a villain, and he is meant to be unsettling — that is where the courage comes from. But every scary panel is checked against one rule before it ships: would a six-year-old sleep fine after this? No sharp teeth, no gore, no weapons, and nobody dies.',
  },
  {
    q: 'What if I miss an episode, or life gets busy?',
    a: 'Nothing expires. The briefs sit in your portal until you want them, and the questions work just as well three weeks later. This is designed for parents who are already stretched — it should never become one more thing you are behind on.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ================================================================ HERO */}
      <section className="hero grain">
        <div className="hero-art">
          <Image
            src="/images/scenery/village-night.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
          />
        </div>
        <div className="veil" />
        <div className="stars" style={{ opacity: 0.7 }} />

        <div className="hero-inner">
          <div className="wrap">
            <Reveal className="hero-copy">
              <span className="chip chip-light" style={{ marginBottom: 22 }}>
                <Sparkle size={13} /> Season 1 · The Orb Eater · now enrolling
              </span>

              <h1 className="display">
                You’re not an absent parent.
                <br />
                You’re just <span className="gold-text">out of moments.</span>
              </h1>

              <p className="hero-sub">
                Cosmos Club gives your child a comic they’ll actually beg to read — and gives you
                the exact conversation to have about it. You pick the values. We build the
                fifteen minutes.
              </p>

              <div className="hero-actions">
                <Link href="/values-compass" className="btn btn-primary btn-lg">
                  <Compass size={18} /> Take the Values Compass
                </Link>
                <Link href="/how-it-works" className="btn btn-ghost-light btn-lg">
                  See how it works
                </Link>
              </div>

              <div className="hero-trust">
                <span>
                  <Shield size={15} /> Sleep-test checked, every panel
                </span>
                <span>
                  <Heart size={15} /> Built for ages 6–9
                </span>
                <span>
                  <Truck size={15} /> Printed &amp; digital, worldwide
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <span className="scroll-cue" aria-hidden="true">
          <i />
        </span>
      </section>

      {/* ============================================================ MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <span key={dup}>
              {VALUES.map((v) => (
                <span key={v.id}>{v.name}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ PROBLEM */}
      <section className="section bg-cream">
        <div className="wrap split">
          <Reveal>
            <span className="eyebrow">The nine o’clock feeling</span>
            <h2 className="h1">
              The guilt isn’t that you don’t love them.
              <br />
              It’s that today was all logistics.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Shoes. Homework. Tuition at five. Eat. Sleep. Somewhere in there was a whole child
              having a whole day, and you got the summary version.
            </p>
            <p style={{ marginTop: 16 }}>
              The usual advice is to schedule more quality time. But children don’t experience
              closeness as a total number of hours — they experience it as{' '}
              <em className="serif-accent">something reliable that happens</em>. Five minutes a
              day beats three hours on Sunday, every time.
            </p>
            <p>
              The hard part was never the time. It was knowing what to say when you finally had it.
            </p>
            <Link href="/how-it-works" className="link-arrow" style={{ marginTop: 8 }}>
              This is the part we fixed <ArrowRight size={17} />
            </Link>
          </Reveal>

          <Reveal delay={120} variant="scale">
            <div className="art-frame">
              <Image
                src="/images/scenery/village-dusk.webp"
                alt="Evening falls over the village on Planet X"
                width={1536}
                height={1024}
                sizes="(max-width: 900px) 92vw, 46vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= HOW IT WORKS */}
      <section className="section bg-night grain">
        <div className="aurora" />
        <div className="stars" style={{ opacity: 0.4 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal className="center" >
            <span className="eyebrow eyebrow-c">How it works</span>
            <h2 className="h1">Three moving parts. Only one of them is homework for you.</h2>
          </Reveal>

          <div className="grid g3" style={{ marginTop: 52 }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="card glass" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                    <span className="step-num">{s.n}</span>
                    <span style={{ color: 'var(--teal-bright)' }}>{s.icon}</span>
                  </div>
                  <h3 className="h3" style={{ color: '#fff' }}>
                    {s.title}
                  </h3>
                  <p className="small" style={{ color: 'rgba(255,255,255,.72)' }}>
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== THE TWIST */}
      <section className="section bg-cream-2">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">The bit nobody else does</span>
            <h2 className="h1">One comic. Every child. A different parent brief for each of you.</h2>
            <p className="lede" style={{ marginTop: 18, maxWidth: '62ch', marginInline: 'auto' }}>
              Every episode is full of moments where a character gets it wrong, feels small, or
              learns something the hard way. We tag every one of them. Which moments we point{' '}
              <em className="serif-accent">you</em> at depends entirely on the values you chose.
            </p>
          </Reveal>

          <Reveal delay={140} style={{ marginTop: 46 }}>
            <ParentPortalDemo />
          </Reveal>
        </div>
      </section>

      {/* ========================================================= PEEK INSIDE */}
      <section className="section bg-night grain">
        <div className="aurora" style={{ opacity: 0.7 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 20,
              }}
            >
              <div>
                <span className="eyebrow">A glimpse, on purpose</span>
                <h2 className="h1" style={{ maxWidth: '18ch' }}>
                  We’re not going to show you the whole thing.
                </h2>
              </div>
              <p className="small" style={{ maxWidth: '38ch', color: 'rgba(255,255,255,.66)' }}>
                Four frames from Episode 1. The gold markers are talk moments — the beats your brief
                will point you at. The rest arrives at your door.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} style={{ marginTop: 40 }}>
            <EpisodePreview />
          </Reveal>

          <Reveal delay={200} className="center" style={{ marginTop: 40 }}>
            <Link href="/peek-inside" className="btn btn-ghost-light">
              See more of the world <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* =============================================================== CAST */}
      <section className="section bg-cream">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">The five, and the small blue one</span>
            <h2 className="h1">Characters your child will still be talking about in June.</h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: '58ch', marginInline: 'auto' }}>
              The same faces return every episode, every season. That repetition is what turns a
              story into a friendship — and a friendship into a plushie on the bed.
            </p>
          </Reveal>

          <Reveal delay={140} style={{ marginTop: 46 }}>
            <CharacterExplorer showAntagonist={false} />
          </Reveal>

          <Reveal delay={200} className="center" style={{ marginTop: 34 }}>
            <Link href="/characters" className="btn btn-ghost">
              Meet them properly <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* =========================================================== PROMISES */}
      <section className="section-tight bg-cream-2">
        <div className="wrap grid g3">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <div className="card card-hover" style={{ height: '100%' }}>
                <span style={{ color: 'var(--teal)' }}>
                  <Shield size={22} />
                </span>
                <h3 className="h4" style={{ margin: '14px 0 8px' }}>
                  {p.title}
                </h3>
                <p className="small muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ COMPASS */}
      <section className="section bg-night grain">
        <div className="aurora" />
        <div className="wrap split" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">Free · two minutes · no account</span>
            <h2 className="h1">Not sure which values yours needs?</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Eight questions about the child you actually have, not the one in the parenting books.
              You’ll get the three worth working on this season — and a sample of the questions
              you’d be asking after Episode 1.
            </p>
            <Link href="/values-compass" className="btn btn-gold btn-lg" style={{ marginTop: 26 }}>
              <Compass size={18} /> Take the Values Compass
            </Link>
          </Reveal>

          <Reveal delay={130} variant="scale">
            <div className="art-frame" style={{ borderColor: 'rgba(255,255,255,.14)' }}>
              <Image
                src="/images/sheets/cast-lineup.webp"
                alt="The Cosmos Club cast, to scale"
                width={1536}
                height={1024}
                sizes="(max-width: 900px) 92vw, 46vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ PRICING */}
      <section className="section bg-cream" id="pricing">
        <div className="wrap">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">Join a season</span>
            <h2 className="h1">Priced for where you live.</h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: '56ch', marginInline: 'auto' }}>
              We use purchasing-power parity rather than a flat exchange rate, so the club costs the
              same in real terms whether you’re in Chennai, Chicago or Singapore.
            </p>
          </Reveal>

          <Reveal delay={120} style={{ marginTop: 44 }}>
            <PricingTable />
          </Reveal>
        </div>
      </section>

      {/* ================================================================ FAQ */}
      <section className="section-tight bg-cream-2">
        <div className="wrap-narrow">
          <Reveal className="center">
            <span className="eyebrow eyebrow-c">Fair questions</span>
            <h2 className="h2">The things parents ask before they join</h2>
          </Reveal>
          <Reveal delay={110} style={{ marginTop: 34 }}>
            <Accordion items={FAQS} />
          </Reveal>
          <Reveal delay={160} className="center" style={{ marginTop: 30 }}>
            <Link href="/faq" className="link-arrow">
              Read every question <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================= CLOSER */}
      <section className="section bg-night grain">
        <div className="aurora" />
        <div className="stars" />
        <div className="wrap center" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <p className="quote" style={{ maxWidth: '24ch', marginInline: 'auto', color: '#fff' }}>
              “{site.tagline}”
            </p>
            <p className="small muted" style={{ marginTop: 18 }}>
              — the line at the bottom of every model sheet we draw
            </p>
            <div
              style={{
                display: 'flex',
                gap: 13,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: 34,
              }}
            >
              <Link href="/pricing" className="btn btn-primary btn-lg">
                Start Season 1 <ArrowRight size={18} />
              </Link>
              <Link href="/schools" className="btn btn-ghost-light btn-lg">
                I’m a school
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
