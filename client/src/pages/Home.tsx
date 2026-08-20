import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "wouter";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { AmbientVideo } from "@/components/AmbientVideo";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { assets, valueOptions } from "@/lib/visanam";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Visanam",
  description: "Personalized values-based comics that give parents gentle ways to start meaningful conversations with their children.",
  url: "https://visanam.net",
  logo: "https://visanam.net/art/og.jpg",
};

const ritualSteps = [
  { number: "01", title: "Begin with a real moment", copy: "A friendship wobble. A hard goodbye. A big reaction after a small disappointment. You begin where family life is already happening." },
  { number: "02", title: "Let the story make room", copy: "In Oru, a feeling becomes a scene. A child can recognise the moment without having to explain it before they are ready." },
  { number: "03", title: "Carry one question home", copy: "The story ends, but the language stays. One gentle question can make room for a different choice next time." },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  return <main className="atmosphere-home" data-testid="art-directed-home">
    <Seo title="Stories that help children grow through real life" description="Visanam creates beautifully paced story rituals that help children and parents find words for the moments that matter." schema={organizationSchema} />
    <div className="journey-progress" aria-hidden="true"><motion.span style={{ scaleX: shouldReduceMotion ? 0 : scrollYProgress }} /></div>

    <section className="oru-video-hero" aria-labelledby="home-title">
      <AmbientVideo
        className="oru-home-video"
        src="/media/visanam-story-passage.mp4"
        poster="/art/village-day.webp"
        label="background film"
      />
      <div className="oru-home-fallback" aria-hidden="true" />
      <div className="oru-home-shade" aria-hidden="true" />
      <div className="container oru-home-copy">
        <p className="story-eyebrow"><Sparkles size={15} /> At first light in Oru</p>
        <h1 id="home-title">Stories that help children <em>grow through real life.</em></h1>
        <p className="hero-lede">A shared story can make a hard moment feel less lonely. Begin in a world where children can recognise a feeling, practise a value, and carry one gentle idea into real life.</p>
        <div className="oru-home-note"><span aria-hidden="true" /><p><b>For children:</b> a story they want to return to. <b>For parents:</b> a softer way to begin the conversation.</p></div>
        <div className="hero-actions">
          <Link href="/parents" className="story-button story-button-light">Begin with your moment <ArrowRight size={17} /></Link>
          <Link href="/oru" className="story-link story-link-light">Enter Oru <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true"><span>Follow the light</span><ArrowDown size={13} /></div>
    </section>

    <section className="atmosphere-chapter chapter-paper" aria-labelledby="morning-heading">
      <div className="container ritual-layout">
        <Reveal><div className="chapter-intro"><p className="chapter-label">Morning · one shared ritual</p><h2 id="morning-heading">Not a lesson to remember.<br /><em>A moment to live through.</em></h2><p>Children do not need another rule to carry. They need a world that gives an everyday feeling a shape, a little distance, and a way to talk about it together.</p></div></Reveal>
        <div className="ritual-steps">{ritualSteps.map((step, index) => <Reveal key={step.number} delay={index * .06}><article className="ritual-step"><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></article></Reveal>)}</div>
      </div>
    </section>

    <section className="atmosphere-chapter chapter-dusk" aria-labelledby="dusk-heading">
      <div className="dusk-geometry" aria-hidden="true"><i className="dusk-halo" /><i className="dusk-window" /><i className="dusk-hill" /><i className="dusk-hill dusk-hill-two" /><i className="dusk-lantern dusk-lantern-one" /><i className="dusk-lantern dusk-lantern-two" /></div>
      <div className="dusk-scene" style={{ backgroundImage: `url("${assets.forestNight}")` }} aria-hidden="true" />
      <div className="container"><Reveal><div className="chapter-dark-copy"><p className="chapter-label light">Dusk · where the story deepens</p><h2 id="dusk-heading">The people of Oru stay <em>just beyond the first page.</em></h2><p>The world opens gradually through choices, friendships, mistakes, and small acts of care—not as a gallery to look at, but as companions a child comes to know.</p><Link href="/oru" className="story-button story-button-light">Enter Oru <ArrowRight size={17} /></Link></div></Reveal></div>
    </section>

    <section className="atmosphere-chapter chapter-blue" aria-labelledby="values-heading"><div className="container">
      <Reveal><div className="blue-hour-intro"><div><p className="chapter-label">Blue hour · a constellation of practice</p><h2 id="values-heading">Every value begins with<br /><em>an ordinary moment.</em></h2></div><div className="blue-hour-aside"><p>Eight gentle practices for the moments family life is already asking you to meet.</p><Link href="/values" className="story-link story-link-dark">See the full value journey <span aria-hidden="true">→</span></Link></div></div></Reveal>
      <div className="value-atlas" aria-label="Eight value practices">{valueOptions.map((value, index) => <Reveal key={value.value} delay={index * .035}><Link href={`/values#${value.value.toLowerCase().replaceAll(" ", "-")}`} className="value-atlas-card"><span className="value-atlas-index">{String(index + 1).padStart(2, "0")}</span><span className="value-atlas-glow" style={{ background: value.glow, boxShadow: `0 0 19px ${value.glow}` }} aria-hidden="true" /><div><p>{value.value}</p><strong>{value.outcome}</strong></div><span className="value-atlas-arrow" aria-hidden="true">↗</span></Link></Reveal>)}</div>
    </div></section>

    <section className="atmosphere-chapter chapter-night" aria-labelledby="night-heading">
      <div className="night-geometry" aria-hidden="true"><i /><i /><i /><i /><i /><span className="night-moon" /></div>
      <div className="container night-layout"><Reveal><div className="night-copy night-copy-card"><p className="chapter-label light">Night · the conversation continues</p><h2 id="night-heading">One story. One question.<br /><em>A little more connection.</em></h2><p>Find the real-life moment closest to your family. Visanam will help you choose a gentle value, a story doorway, and one simple way to carry it into the evening.</p><div className="night-actions"><Link href="/parents" className="story-button story-button-light">Begin the parent journey <ArrowRight size={17} /></Link><Link href="/why-visanam" className="story-link light">See why shared stories matter <span aria-hidden="true">↗</span></Link></div></div></Reveal><Reveal delay={.1}><div className="night-conversation-graphic" aria-hidden="true"><span className="night-graphic-label">A small path home</span><div className="night-portal"><i className="night-portal-glow" /><i className="night-portal-hill night-portal-hill-back" /><i className="night-portal-hill night-portal-hill-front" /><span className="night-lantern night-lantern-one" /><span className="night-lantern night-lantern-two" /><span className="night-lantern night-lantern-three" /></div><div className="night-graphic-caption"><span /><p>A feeling becomes a story.<br />A story becomes a shared next step.</p></div></div></Reveal></div>
    </section>
  </main>;
}
