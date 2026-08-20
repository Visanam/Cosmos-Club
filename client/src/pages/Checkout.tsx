import { ArrowLeft, ArrowRight, BellRing, Check, Lock, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { FORM_ENDPOINT, WEB3FORMS_ACCESS_KEY, formsAreConfigured } from "@/lib/forms";
import { getPricingForTimezone } from "@/lib/visanam";

/**
 * VISANAM-WAITLIST-FORM-V4
 *
 * Season 1 waitlist. Payments are not live yet, so this page collects an email
 * instead of taking a card.
 *
 * The form is plain HTML and posts to Web3Forms, which emails the signup
 * straight to us. Earlier versions used an embedded third-party form and then a
 * link to one; both were blocked or awkward in real browsers. Plain fields work
 * everywhere and cannot be broken by a script.
 *
 * It does not ask for the child's name. Under India's DPDP Act anyone under 18
 * is a child and their personal data needs verifiable parental consent; COPPA
 * and GDPR-K impose similar duties elsewhere. We only need an age range.
 */

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

  const sent =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("sent") === "1";

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

              <form action={FORM_ENDPOINT} method="POST">
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="New Visanam waitlist signup" />
                <input type="hidden" name="from_name" value="Visanam website" />
                <input type="hidden" name="redirect" value="https://visanam.net/checkout?sent=1" />
                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  aria-hidden="true"
                />

                <p
                  className="section-kicker"
                  style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
                >
                  <BellRing size={14} /> Two questions, ten seconds
                </p>

                {sent && (
                  <p className="form-sent" role="status">
                    You’re on the list. We’ll email you the moment Season 1 opens.
                  </p>
                )}

                <label htmlFor="waitlist-email">
                  Your email
                  <input
                    id="waitlist-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label htmlFor="waitlist-age">
                  Your child’s age
                  <select id="waitlist-age" name="Child age band" defaultValue="6–7 years" required>
                    <option value="6–7 years">6–7 years</option>
                    <option value="8–9 years">8–9 years</option>
                    <option value="10–12 years">10–12 years</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="button button-dark checkout-submit"
                  disabled={!formsAreConfigured}
                >
                  {formsAreConfigured ? (
                    <>
                      Join the Season 1 list <ArrowRight size={16} />
                    </>
                  ) : (
                    "Form not configured yet"
                  )}
                </button>

                <p className="checkout-secure" style={{ margin: 0 }}>
                  <Lock size={13} /> One email when Season 1 opens. Nothing else,
                  and you can leave the list at any time.
                </p>
              </form>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
