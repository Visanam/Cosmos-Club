'use client';

import Link from 'next/link';
import { useMemo, useState, type CSSProperties } from 'react';
import { QUIZ, scoreCompass, talkQuestionsFor } from '@/lib/values';
import { ArrowLeft, ArrowRight, Check, Compass, Mail, Sparkle } from './Icon';

type Stage = 'intro' | 'quiz' | 'result';

function barStyle(pct: number, delay: number): CSSProperties {
  const s: Record<string, string> = { width: `${pct}%`, '--d': `${delay}ms` };
  return s as CSSProperties;
}

export default function ValuesCompass() {
  const [stage, setStage] = useState<Stage>('intro');
  const [name, setName] = useState('');
  const [age, setAge] = useState('7');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const q = QUIZ[step];
  const answered = q ? answers[q.id] !== undefined : false;
  const progress =
    stage === 'result' ? 100 : stage === 'intro' ? 4 : ((step + 1) / (QUIZ.length + 1)) * 100;

  const result = useMemo(() => scoreCompass(answers), [answers]);
  const displayName = name.trim() || 'your child';

  function choose(i: number) {
    if (!q) return;
    setAnswers((a) => ({ ...a, [q.id]: i }));
    window.setTimeout(() => {
      if (step < QUIZ.length - 1) setStep((s) => s + 1);
      else setStage('result');
    }, 260);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setStage('intro');
    setSent(false);
  }

  return (
    <div className="quiz-shell">
      <div className="quiz-bar">
        <i style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-body">
        {/* ---------------------------------------------------------- intro */}
        {stage === 'intro' && (
          <div className="quiz-step">
            <span className="eyebrow">
              <Compass size={14} /> The Values Compass
            </span>
            <h2 className="quiz-q">
              Eight questions about your child.
              <br />
              No right answers, and nothing to feel bad about.
            </h2>
            <p className="lede" style={{ marginTop: 14, maxWidth: '54ch' }}>
              It takes about two minutes. At the end you get the three values worth working on this
              season, and the exact questions to ask after each episode.
            </p>

            <div className="grid g2" style={{ marginTop: 30, maxWidth: 520 }}>
              <div className="field">
                <label htmlFor="cc-name">Your child’s first name</label>
                <input
                  id="cc-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Optional"
                  autoComplete="off"
                />
              </div>
              <div className="field">
                <label htmlFor="cc-age">Age</label>
                <select id="cc-age" value={age} onChange={(e) => setAge(e.target.value)}>
                  {['5', '6', '7', '8', '9', '10', '11+'].map((a) => (
                    <option key={a} value={a}>
                      {a} years old
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="quiz-nav">
              <span className="tiny muted">We don’t store anything until you ask us to.</span>
              <button type="button" className="btn btn-primary" onClick={() => setStage('quiz')}>
                Begin <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- quiz */}
        {stage === 'quiz' && q && (
          <div className="quiz-step" key={q.id}>
            <span className="eyebrow">
              Question {step + 1} of {QUIZ.length}
            </span>
            <h2 className="quiz-q">{q.prompt}</h2>
            {q.helper && (
              <p className="small muted" style={{ marginTop: 10 }}>
                {q.helper}
              </p>
            )}

            <div className="opt-list">
              {q.options.map((o, i) => (
                <button
                  type="button"
                  key={o.text}
                  className={`opt${answers[q.id] === i ? ' sel' : ''}`}
                  onClick={() => choose(i)}
                >
                  <span className="opt-dot" />
                  <span className="opt-txt">{o.text}</span>
                </button>
              ))}
            </div>

            <div className="quiz-nav">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => (step === 0 ? setStage('intro') : setStep((s) => s - 1))}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                disabled={!answered}
                onClick={() =>
                  step < QUIZ.length - 1 ? setStep((s) => s + 1) : setStage('result')
                }
              >
                {step < QUIZ.length - 1 ? 'Next' : 'See the compass'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- result */}
        {stage === 'result' && (
          <div className="quiz-step">
            <span className="eyebrow">
              <Sparkle size={14} /> {displayName === 'your child' ? 'The compass' : `${displayName}’s compass`}
            </span>
            <h2 className="quiz-q">Here is where to put the effort this season.</h2>
            <p className="lede" style={{ marginTop: 12, maxWidth: '56ch' }}>
              Every child in the club reads the identical comic. What changes is what arrives in
              your inbox afterwards — and for {displayName}, it would be tuned to these three.
            </p>

            <div className="result-hero card-dark" style={{ borderRadius: 'var(--r-lg)', marginTop: 28 }}>
              <div className="stars" style={{ opacity: 0.5 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                {result.ranked.slice(0, 5).map((r, i) => (
                  <div className="value-bar" key={r.value.id}>
                    <div className="value-bar-head">
                      <span className="value-bar-name">
                        {i < 3 && <span style={{ color: 'var(--gold)', marginRight: 8 }}>{i + 1}</span>}
                        {r.value.name}
                      </span>
                      <span className="tiny" style={{ color: 'rgba(255,255,255,.5)' }}>
                        {r.pct}%
                      </span>
                    </div>
                    <div className="value-bar-track">
                      <i className="value-bar-fill in" style={barStyle(r.pct, i * 110)} /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid g3" style={{ marginTop: 26 }}>
              {result.top.map((v) => (
                <div className="card" key={v.id} style={{ padding: 22 }}>
                  <span className="chip chip-gold">{v.name}</span>
                  <p className="small" style={{ marginTop: 14, fontWeight: 600 }}>
                    {v.signal}
                  </p>
                  <p className="small muted" style={{ marginTop: 8 }}>
                    {v.approach}
                  </p>
                </div>
              ))}
            </div>

            {result.top[0] && (
              <div style={{ marginTop: 34 }}>
                <h3 className="h4" style={{ marginBottom: 14 }}>
                  A sample of what you’d get after Episode 1
                </h3>
                {talkQuestionsFor(result.top[0].id, name).map((t, i) => (
                  <div className="talk-q" key={t}>
                    <b>{i + 1}</b>
                    <span className="small">{t}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ---- capture ---- */}
            <div
              className="card"
              style={{ marginTop: 30, background: 'var(--cream)', borderStyle: 'dashed' }}
            >
              {sent ? (
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span className="step-num" style={{ width: 38, height: 38 }}>
                    <Check size={18} />
                  </span>
                  <div>
                    <h3 className="h4" style={{ marginBottom: 4 }}>
                      On its way.
                    </h3>
                    <p className="small muted">
                      Your full compass, plus the first guide article, will land in your inbox.
                      Nothing else — we don’t send weekly newsletters.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: POST to your email platform (Mailchimp / Klaviyo / Resend / Brevo).
                    setSent(true);
                  }}
                >
                  <h3 className="h4" style={{ marginBottom: 6 }}>
                    Want the full compass as a PDF?
                  </h3>
                  <p className="small muted" style={{ marginBottom: 16 }}>
                    All twelve values scored, plus a guide on raising{' '}
                    {result.top[0]?.name.toLowerCase() ?? 'courage'} in a{' '}
                    {age === '11+' ? '11-year-old' : `${age}-year-old`}.
                  </p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <div className="field" style={{ flex: '1 1 240px' }}>
                      <label htmlFor="cc-email" className="tiny">
                        Email address
                      </label>
                      <input
                        id="cc-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-gold"
                      style={{ alignSelf: 'flex-end' }}
                    >
                      <Mail size={17} /> Send it
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="quiz-nav">
              <button type="button" className="btn btn-ghost btn-sm" onClick={restart}>
                <ArrowLeft size={16} /> Start again
              </button>
              <Link href="/pricing" className="btn btn-primary">
                See what a season costs <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
