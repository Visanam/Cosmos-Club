'use client';

import { useState } from 'react';
import { VALUES, talkQuestionsFor } from '@/lib/values';
import { Book, Chat, Check, Sparkle } from './Icon';

const TABS = [
  { id: 'summary', label: 'Episode summary' },
  { id: 'talk', label: 'Your 3 questions' },
  { id: 'guide', label: 'Your guide' },
  { id: 'track', label: 'Progress' },
] as const;

type TabId = (typeof TABS)[number]['id'];

/** Two example parents, to make the personalisation legible at a glance. */
const PARENTS = [
  { id: 'discipline', label: 'Parent A chose Discipline' },
  { id: 'anger', label: 'Parent B chose Emotional regulation' },
  { id: 'empathy', label: 'Parent C chose Empathy' },
];

const GUIDES: Record<string, { title: string; lines: string[] }> = {
  discipline: {
    title: 'Why "just finish it" doesn’t work, and what does',
    lines: [
      'Starting is a different skill from finishing, and children are usually good at exactly one of them.',
      'Make the end visible before they begin — a page count, a timer, a line on paper.',
      'Praise the last ten minutes, not the first. That is the part that is actually hard.',
    ],
  },
  anger: {
    title: 'Anger is a timing problem, not a behaviour problem',
    lines: [
      'By the time the shouting starts, the useful window has already closed.',
      'Find the body signal together — while everyone is calm and nothing is wrong.',
      'Give the surge ninety seconds and somewhere to go that isn’t a person.',
    ],
  },
  empathy: {
    title: 'Teaching a child to read a room',
    lines: [
      'Empathy is a noticing skill before it is a kindness skill.',
      'Narrate other people out loud: "he went quiet — what do you think happened?"',
      'Include the character who behaved badly. That is where the real practice is.',
    ],
  },
};

export default function ParentPortalDemo() {
  const [tab, setTab] = useState<TabId>('summary');
  const [parent, setParent] = useState('discipline');

  const value = VALUES.find((v) => v.id === parent)!;
  const guide = GUIDES[parent];

  return (
    <div>
      <div
        className="pill-row"
        style={{ justifyContent: 'center', marginBottom: 22 }}
        role="tablist"
        aria-label="Choose an example parent"
      >
        {PARENTS.map((p) => (
          <button
            type="button"
            key={p.id}
            onClick={() => setParent(p.id)}
            className="badge-soft"
            style={{
              cursor: 'pointer',
              borderColor: parent === p.id ? 'var(--teal)' : 'var(--line)',
              background: parent === p.id ? 'rgba(0,139,139,.08)' : 'var(--cream-2)',
              color: parent === p.id ? 'var(--teal)' : 'var(--ink-soft)',
            }}
            aria-pressed={parent === p.id}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="portal">
        <div className="portal-chrome">
          <i />
          <i />
          <i />
          <span className="portal-url">visanam.com/portal · Season 1 · Episode 1 delivered</span>
        </div>

        <div className="portal-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              type="button"
              key={t.id}
              className={`portal-tab${tab === t.id ? ' on' : ''}`}
              onClick={() => setTab(t.id)}
              role="tab"
              aria-selected={tab === t.id}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="portal-pane" key={tab + parent}>
          {tab === 'summary' && (
            <>
              <span className="chip">Episode 1 · The signal</span>
              <h3 className="h3" style={{ margin: '16px 0 12px' }}>
                What your child just read
              </h3>
              <p className="small muted" style={{ maxWidth: '62ch' }}>
                Twenty-four pages. A place that has been happy for a very long time, five children
                who take the long way home, and one small careless moment that nobody notices
                except the reader. No adult solves anything. Nothing is destroyed.
              </p>
              <div className="grid g3" style={{ marginTop: 24 }}>
                {[
                  { k: 'Value carried', v: value.name },
                  { k: 'Reading time', v: '11 minutes' },
                  { k: 'Talk moments', v: '3 marked' },
                ].map((s) => (
                  <div key={s.k} style={{ borderLeft: '2px solid var(--line-strong)', paddingLeft: 14 }}>
                    <div className="tiny muted" style={{ letterSpacing: '.08em', textTransform: 'uppercase' }}>
                      {s.k}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600 }}>
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="note note-teal" style={{ marginTop: 24 }}>
                <strong>The moment to watch for:</strong> {value.hook} Your child will not be told
                it matters. That is the whole design.
              </div>
            </>
          )}

          {tab === 'talk' && (
            <>
              <span className="chip chip-gold">
                <Chat size={13} /> Tuned to {value.name.toLowerCase()}
              </span>
              <h3 className="h3" style={{ margin: '16px 0 8px' }}>
                Ask these three. In the car is fine.
              </h3>
              <p className="small muted" style={{ marginBottom: 20, maxWidth: '58ch' }}>
                Not a quiz. Each one is designed to be answerable by a seven-year-old and hard to
                answer with one word.
              </p>
              {talkQuestionsFor(parent, '').map((t, i) => (
                <div className="talk-q" key={t}>
                  <b>{i + 1}</b>
                  <span className="small">{t}</span>
                </div>
              ))}
              <p className="tiny muted" style={{ marginTop: 18 }}>
                Parent A, B and C all received the identical comic. Only this page is different.
              </p>
            </>
          )}

          {tab === 'guide' && (
            <>
              <span className="chip">
                <Book size={13} /> Reading for you, not for them
              </span>
              <h3 className="h3" style={{ margin: '16px 0 12px' }}>
                {guide.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
                {guide.lines.map((l) => (
                  <li key={l} style={{ display: 'flex', gap: 11 }}>
                    <Check size={17} style={{ color: 'var(--teal)', flex: 'none', marginTop: 3 }} />
                    <span className="small">{l}</span>
                  </li>
                ))}
              </ul>
              <p className="tiny muted" style={{ marginTop: 20 }}>
                Six to eight minutes to read. Written for a parent who has had a long day.
              </p>
            </>
          )}

          {tab === 'track' && (
            <>
              <span className="chip">
                <Sparkle size={13} /> Season 1 progress
              </span>
              <h3 className="h3" style={{ margin: '16px 0 18px' }}>
                Six episodes, one value each
              </h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '13px 16px',
                      borderRadius: 'var(--r)',
                      border: '1px solid var(--line)',
                      background: n === 1 ? 'rgba(0,139,139,.06)' : 'var(--cream)',
                      opacity: n > 2 ? 0.55 : 1,
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 999,
                        display: 'grid',
                        placeItems: 'center',
                        flex: 'none',
                        background: n === 1 ? 'var(--teal)' : 'var(--cream-3)',
                        color: n === 1 ? '#fff' : 'var(--ink-soft)',
                        fontSize: '.8rem',
                        fontWeight: 700,
                      }}
                    >
                      {n === 1 ? <Check size={15} /> : n}
                    </span>
                    <span className="small" style={{ fontWeight: 600 }}>
                      Episode {n}
                    </span>
                    <span className="tiny muted" style={{ marginLeft: 'auto' }}>
                      {n === 1 ? 'Read · brief sent' : n === 2 ? 'Posting in 12 days' : 'Scheduled'}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
