import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { valueOptions } from "@/lib/visanam";

export default function Values() {
  return <>
    <Seo title="Values children can practise through story" description="Explore the real-life skills Visanam stories help children notice, rehearse, and carry into everyday moments." />
    <section className="values-page-hero abstract-values-hero"><div className="values-hero-geometry" aria-hidden="true"><i /><i /><span /></div><div className="container"><p className="section-kicker light"><Sparkles size={14} /> The Visanam values</p><h1>Small inner skills.<br /><em>Real life made gentler.</em></h1><p>Each value starts with a moment your child already recognises. A story makes room to notice it, imagine a choice, and practise one small way forward.</p><Link href="/parents" className="story-button story-button-light">Find your family’s starting point <ArrowRight size={17} /></Link></div></section>
    <section className="values-page-intro container"><Reveal><div className="values-page-intro-copy"><p className="section-kicker">What children take with them</p><h2>Values are not rules to memorise.<br /><em>They are skills to return to.</em></h2><p>A child may not use the word “resilience” after one story. They may, however, try again after a mistake, pause before reacting, or notice a friend who needs help. Those small repetitions are where a value becomes useful.</p></div></Reveal><div className="values-practice-grid">{valueOptions.map((value, index) => <Reveal key={value.value} delay={index * .04}><article id={value.value.toLowerCase().replaceAll(" ", "-")} className="values-practice-card"><span style={{ background: value.glow }} aria-hidden="true" /><p className="values-practice-name">{value.value}</p><h3>{value.outcome}</h3><div className="values-practice-details"><p><b>Children practise</b>{value.childPractice}</p><p><b>A familiar moment</b>{value.moments[0]}</p></div><p className="values-practice-why">{value.whyItMatters}</p></article></Reveal>)}</div></section>
    <section className="values-page-ritual"><div className="container"><Reveal><div><p className="section-kicker light">A gentle family ritual</p><h2>Notice the moment.<br /><em>Name the skill.</em><br />Try one small thing.</h2></div><p>That is enough for a child to begin building a shared language for big feelings, relationships, choices, and repair. There is no scorecard—only a meaningful next conversation.</p><Link href="/parents" className="story-button story-button-light">Create a gentle parent plan <ArrowRight size={17} /></Link></Reveal></div></section>
  </>;
}
