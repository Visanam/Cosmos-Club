import { ArrowRight, Check, Globe2, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useMemo } from "react";
import { Seo } from "@/components/Seo";
import { pricingTiers, getPricingForTimezone } from "@/lib/visanam";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Visanam Season 1",
  description: "Six illustrated values-based comic episodes with a personalized parent wraparound.",
  brand: { "@type": "Brand", name: "Visanam" },
};

export default function Pricing() {
  const tier = useMemo(() => getPricingForTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone), []);
  return <><Seo title="Season 1 pricing" description="Explore location-aware Visanam Season 1 pricing for six values-based illustrated comic episodes and parent guides." schema={productSchema} />
    <section className="pricing-hero"><div className="container"><p className="section-kicker light"><Sparkles size={14}/> A whole season of shared stories</p><h1>One story world.<br /><em>A more connected home.</em></h1><p>Season 1 brings six illustrated episodes to your family, with an ever-growing parent wraparound built around the values you choose.</p></div></section>
    <section className="pricing-main container"><div className="location-note"><Globe2 size={18}/><div><strong>Showing your {tier.country} price</strong><p>We use your device time zone to provide a location-aware price. You can always review the full list below.</p></div></div><div className="pricing-card"><div><p className="section-kicker">Season 1 · The Glow Beyond the Spire</p><h2>Six episodes. <em>One shared language.</em></h2><p className="price-copy">A beautifully made comic experience for your child, plus the gentle adult guidance that helps the story live on after reading.</p><ul><li><Check size={17}/> Six illustrated digital episodes</li><li><Check size={17}/> Your values-led Parent Insight Plan</li><li><Check size={17}/> Episode recap and conversation cards</li><li><Check size={17}/> Printable reflection prompts</li></ul></div><div className="price-box"><span>YOUR SEASON PRICE</span><strong>{tier.display}</strong><small>One-time payment · no subscription required</small><Link href="/checkout" className="button button-dark">Continue to checkout <ArrowRight size={16}/></Link></div></div><div className="price-list-head"><div><p className="section-kicker">A considered, local approach</p><h2>Prices around the world</h2></div><p>All prices are for the complete six-episode Season 1 experience. The country below is determined from time zone only; no location is stored.</p></div><div className="price-table" role="table"><div className="price-row price-row-head" role="row"><span role="columnheader">Region</span><span role="columnheader">Season 1</span></div>{pricingTiers.slice(0, -1).map((item) => <div className={item.country === tier.country ? "price-row current" : "price-row"} role="row" key={item.country}><span role="cell">{item.country}{item.country === tier.country && <em>your region</em>}</span><strong role="cell">{item.display}</strong></div>)}</div></section>
  </>;
}
