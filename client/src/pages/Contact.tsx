import { ArrowRight, GraduationCap, Heart, Mail, Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { FORM_ENDPOINT, WEB3FORMS_ACCESS_KEY, formsAreConfigured } from "@/lib/forms";

/**
 * VISANAM-CONTACT-PAGE-V1
 *
 * A single warm place for people to reach a human. Three clear routes (parents,
 * schools, press) each point at the right mailbox, and the form posts to the
 * same Web3Forms endpoint the other forms use, so there is no server involved
 * and the visitor's email address never sits in the page source.
 */

const routes = [
  {
    icon: Heart,
    title: "Parents and families",
    copy: "Questions about Season 1, the parent guide, or anything about your child's reading.",
    email: "hello@visanam.net",
  },
  {
    icon: GraduationCap,
    title: "Schools and educators",
    copy: "Bringing Visanam into a classroom, an assembly, or a whole-school SEL programme.",
    email: "hello@visanam.net",
  },
  {
    icon: Sparkles,
    title: "Press and partnerships",
    copy: "Media, collaborations, bespoke commissions, and everything in between.",
    email: "hello@visanam.net",
  },
];

export default function Contact() {
  const sent =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("sent") === "1";

  return (
    <>
      <Seo
        title="Contact Visanam"
        description="Reach the people behind Visanam — for parents, schools, press and partnerships. We read every message ourselves."
      />

      <section className="contact-page container">
        <p className="section-kicker">
          <Mail size={14} /> We read every message ourselves
        </p>
        <h1>
          Say hello.
          <br />
          <em>We would love to hear from you.</em>
        </h1>
        <p className="page-lede">
          Whether you are a parent with a question, a school exploring a
          partnership, or a writer working on a story, there is a real person at
          the other end. We usually reply within two working days.
        </p>

        <div className="contact-routes">
          {routes.map((route) => (
            <article key={route.title}>
              <route.icon size={22} />
              <h2>{route.title}</h2>
              <p>{route.copy}</p>
              <a href={`mailto:${route.email}`}>{route.email}</a>
            </article>
          ))}
        </div>

        <div className="contact-form-wrap">
          <div>
            <p className="section-kicker">Or send a note here</p>
            <h2>A quick message</h2>
            <p>
              Tell us who you are and what you are after. It reaches the same
              inbox, and we will come back to you personally.
            </p>
          </div>

          <form className="lead-form" action={FORM_ENDPOINT} method="POST">
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="New message from the Visanam contact page" />
            <input type="hidden" name="from_name" value="Visanam website" />
            <input type="hidden" name="redirect" value="https://visanam.net/contact?sent=1" />
            <input
              type="checkbox"
              name="botcheck"
              style={{ display: "none" }}
              tabIndex={-1}
              aria-hidden="true"
            />

            {sent && (
              <p className="form-sent" role="status">
                Thank you — your message is with us and we will reply personally.
              </p>
            )}

            <label htmlFor="contact-name">
              Your name
              <input id="contact-name" name="Name" type="text" required autoComplete="name" />
            </label>

            <div className="form-split">
              <label htmlFor="contact-email">
                Email
                <input id="contact-email" name="email" type="email" required autoComplete="email" />
              </label>
              <label htmlFor="contact-topic">
                What is this about?
                <select id="contact-topic" name="Topic" defaultValue="I’m a parent">
                  <option value="I’m a parent">I’m a parent</option>
                  <option value="I’m from a school">I’m from a school</option>
                  <option value="Press or partnership">Press or partnership</option>
                  <option value="Something else">Something else</option>
                </select>
              </label>
            </div>

            <label htmlFor="contact-message">
              Your message
              <textarea
                id="contact-message"
                name="Message"
                placeholder="How can we help?"
                required
              />
            </label>

            <button type="submit" className="button button-dark" disabled={!formsAreConfigured}>
              {formsAreConfigured ? (
                <>
                  Send message <ArrowRight size={16} />
                </>
              ) : (
                "Form not configured yet"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
