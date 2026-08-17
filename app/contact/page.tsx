import type { Metadata } from 'next';
import { Suspense } from 'react';
import Reveal from '@/components/Reveal';
import ContactForm from './ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Questions about the club, a school pilot, or a bespoke commission — write to us and a person will answer.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section
        className="section-tight bg-night grain"
        style={{ paddingTop: 'calc(var(--nav-h) + 64px)' }}
      >
        <div className="aurora" />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1 className="display" style={{ maxWidth: '15ch' }}>
              A person reads these.
            </h1>
            <p className="lede" style={{ marginTop: 20, maxWidth: '48ch' }}>
              We are small. That is currently a disadvantage in most ways and an advantage in this
              one.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <Reveal>
            <Suspense fallback={<div className="card muted">Loading form…</div>}>
              <ContactForm />
            </Suspense>
          </Reveal>

          <Reveal delay={120}>
            <div className="card" style={{ background: 'var(--cream-2)' }}>
              <h2 className="h4" style={{ marginBottom: 14 }}>
                Direct
              </h2>
              <p className="small">
                <a href={`mailto:${site.email}`} className="teal-text">
                  {site.email}
                </a>
                <br />
                {site.city}
              </p>

              <hr className="divider" style={{ margin: '22px 0' }} />

              <h2 className="h4" style={{ marginBottom: 10 }}>
                For schools
              </h2>
              <p className="small muted">
                Tell us the grade and roughly how many students, and we will send a pilot pack with
                the facilitation sheets, the content policy and group pricing.
              </p>

              <hr className="divider" style={{ margin: '22px 0' }} />

              <h2 className="h4" style={{ marginBottom: 10 }}>
                For commissions
              </h2>
              <p className="small muted">
                Give us the date first. Bespoke books take six to eight weeks, and we take a limited
                number each quarter.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
