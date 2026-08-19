import { ArrowLeft, ArrowRight, BellRing, Check, Lock, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { getPricingForTimezone } from "@/lib/visanam";

// Season 1 waitlist. A plain HTML form on our own page - no embedded widget,
// no third-party page, no JavaScript needed to submit. Submissions are
// relayed to the inbox below by FormSubmit.
//
// FIRST SUBMISSION ONLY: FormSubmit emails this address a one-time activation
// link. Click it, and every later submission arrives automatically.
const FORM_ENDPOINT = "https://formsubmit.co/visanammags@gmail.com";

const includes = [
  "Six illustrated digital episodes",
  "Values-led Parent Insight Plan",
  "Conversation cards and episode recaps",
];

export default function Checkout() {
  const tier = useMemo(
    () => getPricingForTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone),
    []
  );

  return (
    <>
      <Seo
        title="Join the Season 1 list"
        description="Season 1 opens soon. Join the list and you will be the first to know."
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

              <p
                className="section-kicker"
                style={{ margin: "22px 0 0", display: "flex", alignItems: "center", gap: 8 }}
              >
                <BellRing size={14} /> Two questions, ten seconds
              </p>

              <form action={FORM_ENDPOINT} method="POST">
                <input type="hidden" name="_subject" value="New Visanam waitlist signup" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://visanam.net/pricing" />
                <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

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
                  <select id="waitlist-age" name="childAgeBand" defaultValue="6–7 years" required>
                    <option value="6–7 years">6–7 years</option>
                    <option value="8–9 years">8–9 years</option>
                    <option value="10–12 years">10–12 years</option>
                  </select>
                </label>

                <button type="submit" className="button button-dark checkout-submit">
                  Join the Season 1 list <ArrowRight size={16} />
                </button>

                <p className="checkout-secure">
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
