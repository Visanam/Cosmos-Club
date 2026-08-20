import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";

/**
 * VISANAM-NOTFOUND-V2
 *
 * Shown for any address that does not exist.
 *
 * Two things changed here. It now carries a "noindex" tag, because the site is
 * a single-page app: the server answers every address with "200 OK", so without
 * this tag Google would happily index every typo and broken link as a real
 * page. And it now looks like the rest of the site instead of a grey developer
 * error card, and offers somewhere to go.
 */

const suggestions = [
  { href: "/why-visanam", label: "Why Visanam" },
  { href: "/oru", label: "Enter Oru" },
  { href: "/pricing", label: "Season 1 pricing" },
  { href: "/faq", label: "Questions" },
];

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page does not exist. Find your way back into the world of Oru."
        noIndex
      />

      <section className="legal-page container">
        <p className="section-kicker">A path that isn’t on the map</p>
        <h1>
          We couldn’t find
          <br />
          <em>that page.</em>
        </h1>
        <p className="page-lede">
          The address may have changed, or there may be a small typo in it.
          Nothing is broken — here is the way back.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
          <Link href="/" className="button button-dark">
            Back to the beginning <ArrowRight size={16} />
          </Link>
          {suggestions.map((item) => (
            <Link key={item.href} href={item.href} className="button">
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
