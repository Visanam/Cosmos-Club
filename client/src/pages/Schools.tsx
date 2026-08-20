import { ArrowRight, BookOpenCheck, Building2, Check, HeartHandshake } from "lucide-react";
import { Seo } from "@/components/Seo";
import { FORM_ENDPOINT, WEB3FORMS_ACCESS_KEY, formsAreConfigured } from "@/lib/forms";
import { assets } from "@/lib/visanam";

/**
 * VISANAM-SCHOOLS-FORM-V3
 *
 * The school enquiry form is plain HTML and posts to Web3Forms, which emails
 * the enquiry to us. It used to post to our own server, which is currently
 * returning an error, so every enquiry sent through this page was being lost.
 *
 * Plain HTML also means the fields work before any JavaScript has loaded, and
 * they cannot be broken by a script error.
 */

export default function Schools() {
  const sent =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("sent") === "1";

  return (
    <>
      <Seo
        title="Schools and NEP SEL partnerships"
        description="Bring Visanam’s story-led Social and Emotional Learning experience to your school community."
      />

      <section
        className="b2b-hero"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(17,48,51,.9),rgba(17,48,51,.28)),url("${assets.forestDay}")`,
        }}
      >
        <div className="container">
          <p className="section-kicker light">For schools and learning communities</p>
          <h1>
            SEL that children don’t
            <br />
            <em>have to be told to love.</em>
          </h1>
          <p>
            A story-led Social and Emotional Learning experience that connects
            classroom reflection, home conversation, and the values your
            community cares about.
          </p>
        </div>
      </section>

      <section className="b2b-content container">
        <div className="b2b-intro">
          <div>
            <p className="section-kicker">A shared language for growing up</p>
            <h2>
              Bring the conversation
              <br />
              <em>into the living world.</em>
            </h2>
          </div>
          <p>
            Visanam gives schools a welcoming way to support the social and
            emotional goals at the heart of India’s National Education Policy.
            Familiar characters and a continuing comic world make difficult
            themes easier to name, explore, and practise.
          </p>
        </div>

        <div className="benefit-grid">
          <article>
            <BookOpenCheck size={24} />
            <h3>Story-led sessions</h3>
            <p>Guided reflections rooted in episodes children genuinely want to discuss.</p>
          </article>
          <article>
            <HeartHandshake size={24} />
            <h3>Family connection</h3>
            <p>Parent conversation cards that continue the learning at home.</p>
          </article>
          <article>
            <Building2 size={24} />
            <h3>Flexible implementation</h3>
            <p>Designed for assemblies, advisory, life-skills periods, and class cohorts.</p>
          </article>
        </div>

        <div className="b2b-form-grid">
          <div>
            <p className="section-kicker">Start a conversation</p>
            <h2>Could Visanam belong in your school?</h2>
            <p>
              Tell us a little about your community. We’ll share an appropriate
              partnership approach and pilot options.
            </p>
            <ul>
              <li>
                <Check size={16} /> Grade-appropriate discussion packs
              </li>
              <li>
                <Check size={16} /> Parent communication support
              </li>
              <li>
                <Check size={16} /> A launch path designed around your timetable
              </li>
            </ul>
          </div>

          <form className="lead-form" action={FORM_ENDPOINT} method="POST">
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="New Visanam school enquiry" />
            <input type="hidden" name="from_name" value="Visanam website" />
            <input type="hidden" name="redirect" value="https://visanam.net/schools?sent=1" />
            <input
              type="checkbox"
              name="botcheck"
              style={{ display: "none" }}
              tabIndex={-1}
              aria-hidden="true"
            />

            {sent && (
              <p className="form-sent" role="status">
                Thank you — your enquiry is with us and we’ll be in touch soon.
              </p>
            )}

            <label htmlFor="school-name">
              School name
              <input id="school-name" name="School name" type="text" required autoComplete="organization" />
            </label>

            <div className="form-split">
              <label htmlFor="school-contact">
                Contact name
                <input id="school-contact" name="Contact name" type="text" required autoComplete="name" />
              </label>
              <label htmlFor="school-email">
                Email
                <input id="school-email" name="email" type="email" required autoComplete="email" />
              </label>
            </div>

            <div className="form-split">
              <label htmlFor="school-phone">
                Phone
                <input id="school-phone" name="Phone" type="tel" required autoComplete="tel" />
              </label>
              <label htmlFor="school-grades">
                Grade range
                <input
                  id="school-grades"
                  name="Grade range"
                  type="text"
                  placeholder="For example: Grades 3–6"
                  required
                />
              </label>
            </div>

            <label htmlFor="school-message">
              Message
              <textarea
                id="school-message"
                name="Message"
                placeholder="What would you like to explore?"
                required
              />
            </label>

            <button type="submit" className="button button-dark" disabled={!formsAreConfigured}>
              {formsAreConfigured ? (
                <>
                  Start the conversation <ArrowRight size={16} />
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
