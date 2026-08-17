'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ANTAGONIST, CAST, SPRIG_MOODS } from '@/lib/cast';

export default function CharacterExplorer({ showAntagonist = true }: { showAntagonist?: boolean }) {
  return (
    <>
      <div className="cast-grid">
        {CAST.map((c) => (
          <figure className="cast-card" key={c.id} tabIndex={0}>
            <Image
              src={c.img}
              alt={`${c.name} — ${c.role}`}
              width={900}
              height={1350}
              sizes="(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 22vw"
            />
            <span className="veil-soft" />
            <figcaption>
              <span className="cast-role">{c.role}</span>
              <span className="cast-name">{c.name}</span>
              <p className="cast-blurb">{c.blurb}</p>
              <span
                className="tiny"
                style={{ color: 'rgba(255,255,255,.55)', display: 'block', marginTop: 8 }}
              >
                {c.height} · carries {c.value.toLowerCase()}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {showAntagonist && (
        <div className="card card-dark grain" style={{ marginTop: 26, overflow: 'hidden' }}>
          <div className="split" style={{ gap: 30 }}>
            <div>
              <span className="chip chip-light">The one they’re afraid of</span>
              <h3 className="h2" style={{ margin: '16px 0 12px' }}>
                {ANTAGONIST.name}
              </h3>
              <p style={{ color: 'rgba(255,255,255,.75)', maxWidth: '46ch' }}>{ANTAGONIST.blurb}</p>
              <p className="tiny" style={{ color: 'rgba(255,255,255,.5)', marginTop: 16 }}>
                No sharp teeth. No predator eyes. Every frightening panel is checked against one
                question before it ships: would a six-year-old sleep fine after this?
              </p>
            </div>
            <div
              style={{
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,.14)',
              }}
            >
              <Image
                src={ANTAGONIST.img}
                alt={`${ANTAGONIST.name} — ${ANTAGONIST.role}`}
                width={900}
                height={1350}
                sizes="(max-width: 900px) 90vw, 42vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Sprig's glow is a feelings vocabulary a six-year-old can point at. */
export function SprigMoodMeter() {
  const [i, setI] = useState(0);
  const mood = SPRIG_MOODS[i];

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="split" style={{ gap: 30, alignItems: 'center' }}>
        <div>
          <span className="eyebrow">Try it — tap a feeling</span>
          <h3 className="h3" style={{ marginBottom: 10 }}>
            Sprig never says a word.
          </h3>
          <p className="small muted" style={{ marginBottom: 20 }}>
            His cheeks, ears and head-tuft glow with what he is feeling, a beat before anyone else
            has noticed. Children learn to read him — and then, quietly, to read each other.
          </p>

          <div className="pill-row">
            {SPRIG_MOODS.map((m, idx) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setI(idx)}
                className="badge-soft"
                style={{
                  cursor: 'pointer',
                  borderColor: idx === i ? m.colour : 'var(--line)',
                  background: idx === i ? `${m.colour}22` : 'var(--cream-2)',
                  color: idx === i ? 'var(--ink)' : 'var(--ink-soft)',
                  transition: 'all .3s var(--ease)',
                }}
                aria-pressed={idx === i}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 999,
                    background: m.colour,
                    boxShadow: `0 0 10px ${m.glow}`,
                    display: 'inline-block',
                  }}
                />
                {m.label}
              </button>
            ))}
          </div>

          <p className="small" style={{ marginTop: 18, minHeight: '3em', fontWeight: 550 }}>
            {mood.note}
          </p>
        </div>

        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            background: '#0b1725',
          }}
        >
          <Image
            src="/images/cast/sprig.webp"
            alt="Sprig, the glowing companion"
            width={900}
            height={1350}
            sizes="(max-width: 900px) 90vw, 40vw"
            style={{ width: '100%', height: 'auto' }}
          />
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(50% 38% at 50% 34%, ${mood.glow}, transparent 68%)`,
              mixBlendMode: 'screen',
              transition: 'background 0.7s var(--ease)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
