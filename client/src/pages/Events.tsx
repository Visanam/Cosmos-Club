import { ArrowRight, Check, PartyPopper } from "lucide-react";
import { Seo } from "@/components/Seo";
import { assets } from "@/lib/visanam";

/**
 * VISANAM-EVENTS-FORM-V2
 *
 * The bespoke-comic enquiry form posts as a plain HTML form to FormSubmit,
 * which emails the enquiry straight to us. It used to post to our own server,
 * which is currently returning an error, so every enquiry sent through this
 * page was being silently lost.
 */

const FORM_ENDPOINT = "https://formsubmit.co/visanammags@gmail.com";

export default function Events() {
  const sent =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("sent") === "1";

  return (
    <>
      <Seo
        title="Bespoke event comics"
        description="Turn a wedding, reception, celebration, or corporate milestone into a beautifully illustrated Visanam keepsake comic."
      />

      <section className="events-hero">
        <div
          className="events-art"
          style={{ backgroundImage: `url("${assets.meteorVillage}")` }}
        />
        <div className="container">
          <p className="section-kicker light">
            <PartyPopper size={14} /> Bespoke illustrated keepsakes
          </p>
          <h1>
            Your greatest day,
            <br />
            <em>told like a story.</em>
          </h1>
          <p>
            We turn real people, real places, and big milestones into a comic
            world worth holding on to.
          </p>
        </div>
      </section>

      <section className="event-body container">
        <div className="event-intro">
          <div>
            <p className="section-kicker">More than an invitation</p>
            <h2>
              Give people a story
              <br />
              <em>they can step into.</em>
            </h2>
          </div>
          <p>
            From wedding romances and receptions to joyful corporate milestones,
            Visanam’s production studio builds a tailor-made illustrated
            narrative with a distinctive visual language and a keepsake finish.
          </p>
        </div>

        <div className="event-offers">
          <article>
            <span>01</span>
            <h3>Weddings</h3>
            <p>Your story, your in-jokes, your people — imagined as a comic to invite, delight, and keep.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Receptions</h3>
            <p>Make the welcome feel like the first page of an unforgettable night.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Corporate events</h3>
            <p>Turn a company milestone or client experience into a world worth talking about.</p>
          </article>
        </div>

        <div className="b2b-form-grid event-form-grid">
          <div>
            <p className="section-kicker">Tell us the beginning</p>
            <h2>What kind of story are you celebrating?</h2>
            <p>
              Share the shape of your occasion. We’ll respond with a thoughtful
              first approach to scope, style, and format.
            </p>
            <ul>
              <li>
                <Check size={16} /> Bespoke art direction
              </li>
              <li>
                <Check size={16} /> Digital and print-ready formats
              </li>
              <li>
                <Check size={16} /> Character-led visual storytelling
              </li>
            </ul>
          </div>

          <form className="lead-form" action={FORM_ENDPOINT} method="POST">
            <input type="hidden" name="_subject" value="New Visanam bespoke comic enquiry" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://visanam.net/events?sent=1" />
            <input
              type="text"
              name="_honey"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {sent && (
              <p
                style={{
                  margin: 0,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "#edf3e7",
                  color: "#2f5a4c",
                  fontSize: 13,
                }}
              >
                Thank you — your story idea is safely with us. We’ll reply soon.
              </p>
            )}

            <label htmlFor="event-name">
              Your name
              <input id="event-name" name="contactName" type="text" required autoComplete="name" />
            </label>

            <div className="form-split">
              <label htmlFor="event-email">
                Email
                <input id="event-email" name="email" type="email" required autoComplete="email" />
              </label>
              <label htmlFor="event-phone">
                Phone
                <input id="event-phone" name="phone" type="tel" required autoComplete="tel" />
              </label>
            </div>

            <label htmlFor="event-type">
              Event type
              <select id="event-type" name="eventType" defaultValue="Wedding">
                <option value="Wedding">Wedding</option>
                <option value="Reception">Reception</option>
                <option value="Corporate event">Corporate event</option>
                <option value="Other celebration">Other celebration</option>
              </select>
            </label>

            <label htmlFor="event-message">
              Tell us about the occasion
              <textarea
                id="event-message"
                name="message"
                placeholder="Date, location, guests, the feeling you want to create…"
                required
              />
            </label>

            <button type="submit" className="button button-dark">
              Share your story idea <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
