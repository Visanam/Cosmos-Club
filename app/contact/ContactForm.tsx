'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Check, Mail } from '@/components/Icon';
import { site } from '@/lib/site';

const TYPES = [
  { id: 'general', label: 'A general question' },
  { id: 'school', label: 'School / NEP SEL programme' },
  { id: 'bespoke', label: 'A bespoke comic commission' },
  { id: 'press', label: 'Press or partnership' },
];

export default function ContactForm() {
  const params = useSearchParams();
  const initial = params.get('enquiry') ?? 'general';
  const [type, setType] = useState(TYPES.some((t) => t.id === initial) ? initial : 'general');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card" style={{ borderColor: 'rgba(0,139,139,.35)' }}>
        <span className="step-num" style={{ marginBottom: 16 }}>
          <Check size={20} />
        </span>
        <h2 className="h3">Thank you — that reached us.</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          We answer everything within two working days, and it will be a person rather than an
          autoresponder.
        </p>
        <p className="note" style={{ marginTop: 18 }}>
          <strong>Developer note:</strong> this form is not wired to a backend yet. Point the submit
          handler in <code>app/contact/ContactForm.tsx</code> at a form service (Formspree, Resend,
          a Next.js route handler, or your CRM) before launch.
        </p>
      </div>
    );
  }

  return (
    <form
      className="card"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: POST to your form endpoint / CRM here.
        setSent(true);
      }}
      style={{ display: 'grid', gap: 18 }}
    >
      <div className="field">
        <label htmlFor="c-type">What is this about?</label>
        <select id="c-type" value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid g2">
        <div className="field">
          <label htmlFor="c-name">Your name</label>
          <input id="c-name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" required autoComplete="email" />
        </div>
      </div>

      {type === 'school' && (
        <div className="grid g2">
          <div className="field">
            <label htmlFor="c-school">School name</label>
            <input id="c-school" />
          </div>
          <div className="field">
            <label htmlFor="c-grade">Grade & approximate student count</label>
            <input id="c-grade" placeholder="e.g. Grade 3, ~180 students" />
          </div>
        </div>
      )}

      {type === 'bespoke' && (
        <div className="grid g2">
          <div className="field">
            <label htmlFor="c-occasion">Occasion</label>
            <input id="c-occasion" placeholder="Wedding, anniversary, birthday…" />
          </div>
          <div className="field">
            <label htmlFor="c-date">Date it needs to be ready</label>
            <input id="c-date" type="date" />
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="c-msg">Tell us a bit more</label>
        <textarea id="c-msg" required placeholder="However much or little you like." />
      </div>

      <button type="submit" className="btn btn-primary btn-lg">
        <Mail size={17} /> Send it
      </button>

      <p className="tiny muted">
        Or simply write to{' '}
        <a href={`mailto:${site.email}`} className="teal-text">
          {site.email}
        </a>
        .
      </p>
    </form>
  );
}
