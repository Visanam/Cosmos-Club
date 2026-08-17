import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export default function Oru() {
  return <main className="oru-page" data-testid="oru-page">
    <Seo title="Enter Oru" description="Step quietly into Oru, the story world where shared conversations begin." />
    <section className="oru-page-hero" aria-labelledby="oru-page-title">
      <video className="oru-page-video" src="/media/oru-lantern-walk.mp4" poster="/art/village-night.webp" autoPlay muted loop playsInline preload="metadata" aria-label="A quiet blue-hour walk through the lantern-lit village of Oru" />
      <div className="oru-page-fallback" aria-hidden="true" />
      <div className="oru-page-shade" aria-hidden="true" />
      <div className="container oru-page-copy">
        <p className="story-eyebrow"><Sparkles size={14} /> Enter Oru</p>
        <h1 id="oru-page-title">The lights come on.<br /><em>The day can soften.</em></h1>
        <p>Oru is not a world to rush through. It is a place where a small feeling can become a scene, and a shared scene can make room for a different conversation at home.</p>
        <div className="oru-page-actions">
          <Link href="/parents" className="story-button story-button-light">Begin with your family’s moment <ArrowRight size={17} /></Link>
          <Link href="/values" className="oru-page-link">Explore the values <ArrowRight size={16} /></Link>
        </div>
      </div>
      <p className="oru-page-caption">A quiet passage through Oru · 00:08</p>
    </section>
  </main>;
}
