import { ArrowLeft, ArrowRight, BellRing, Check, Lock, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { getPricingForTimezone } from "@/lib/visanam";

/**
 * Season 1 waitlist.
 *
 * Payments are not live yet, so this page collects an email instead of taking
 * a card. It replaced a checkout form that could never complete — visitors
 * reached it, pressed "continue to secure checkout", and got an error.
 *
 * It also no longer asks for the child's name. Under India's DPDP Act anyone
 * under 18 is a child and their personal data needs verifiable parental
 * consent; COPPA and GDPR-K impose similar duties elsewhere. The product needs
 * to know roughly how old the reader is so the parent guide can be pitched
 * correctly. It has never needed to know who they are.
 *
 * When the payment provider is live, this becomes the real checkout again and
 * the list built here is the first audience to tell.
 */

/** The public form. Change this one line if the form is ever replaced. */
const WAITLIST_URL = "https://tally.so/r/LZ4Gvp";

const includes = [
  "Six illustrated digital episodes",
  "Values-led Parent Insight Plan",
  "Conversation cards and episode recaps",
];

export default function Checkout() {
  // Indicative only — an approximate price from the device's time zone, so a
  // visitor knows roughly what to expect before joining the list.
  const tier = useMemo(
    () => getPricingForTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone),
    []
  );

  return (
    <>
      <Seo
        title="Join the Season 1 list"
        description="Season 1 opens soon. Join the list and you will be the first to know, with a founding price for early families."
        noIndex
      />

      <section className="checkout-shell">
        <div className="checkout-wrap">
          <Link href="/pricing" className="small-back">
            <ArrowLeft size={15} /> Back to pricing
          </Link>

          <div className="checkout-grid">
            <section>
              <p className="section-kicker">
                <Sparkles size={14} /> Season 1 opens soon
              </p>
              <h1>
                Be first
                <br />
                <em>through the door.</em>
              </h1>
              <p className="checkout-lede">
                We are finishing the final episodes and opening a limited first
                season to a small group of families. Leave your email and you
                will hear from us before anyone else.
              </p>

              <div className="checkout-includes">
                <p>YOUR SEASON WILL INCLUDE</p>
                {includes.map((item) => (
                  <span key={item}>
                    <Check size={16} />
                    {item}
                  </span>
                ))}
              </div>

              <p className="checkout-secure" style={{ marginTop: 22 }}>
                <Lock size={13} /> We never create an account for your child, and
                we never ask for their name.
              </p>
            </section>

            <section className="checkout-card">
              <div className="checkout-price">
                <div>
                  <span>VISANAM SEASON 1</span>
                  <p>Expected price in your region</p>
                </div>
                <strong>{tier.display}</strong>
              </div>

              <div style={{ paddingTop: 26, display: "grid", gap: 14 }}>
                <p
                  className="section-kicker"
                  style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
                >
                  <BellRing size={14} /> Two questions, ten seconds
                </p>

                <p style={{ margin: 0, color: "#5b6f68", fontSize: 14, lineHeight: 1.65 }}>
                  We will ask for your email and your child’s age range. Nothing
                  else — no card, no account, no name.
                </p>

                <a
                  href={WAITLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-dark"
                  style={{ justifyContent: "center" }}
                >
                  Join the Season 1 list <ArrowRight size={16} />
                </a>

                <p className="checkout-secure" style={{ margin: 0 }}>
                  <Lock size={13} /> One email when Season 1 opens. Nothing else,
                  and you can leave the list at any time.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
