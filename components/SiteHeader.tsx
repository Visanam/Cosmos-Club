'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';

/** Routes whose first section is cream rather than a dark hero. */
const LIGHT_TOP = ['/checkout', '/privacy', '/terms'];

export default function SiteHeader() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const darkHero = !LIGHT_TOP.some((p) => path.startsWith(p));
  const solid = stuck || open || !darkHero;
  const light = darkHero && !solid;

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`hdr${solid ? ' stuck' : ''}${light ? ' hdr-light' : ''}`}>
        <div className="hdr-inner">
          <Link href="/" className="brand" aria-label={`${site.fullName} — home`}>
            <span className="brand-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.5 15.6 10H8.4z" fill="#2fd3d3" />
                <path d="M8.4 10h7.2l1.3 5.4H7.1z" fill="#9de1ff" opacity=".85" />
                <ellipse cx="12" cy="18.4" rx="6.2" ry="2.1" fill="#e2a22a" opacity=".55" />
                <circle cx="12" cy="12.6" r="2" fill="#fff6b8" />
              </svg>
            </span>
            <span className="brand-txt">
              <span className="brand-sup">{site.publisher} presents</span>
              <span className="brand-name">{site.product}</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={path === n.href ? 'active' : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hdr-cta">
            <Link href="/values-compass" className="btn btn-ghost btn-sm">
              Free Values Compass
            </Link>
            <Link href="/pricing" className="btn btn-primary btn-sm">
              Start a season
            </Link>
          </div>

          <button
            type="button"
            className={`burger${open ? ' open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-nav" role="dialog" aria-label="Menu">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/faq">Questions</Link>
          <div style={{ display: 'grid', gap: 10, marginTop: 24 }}>
            <Link href="/values-compass" className="btn btn-ghost btn-block">
              Free Values Compass
            </Link>
            <Link href="/pricing" className="btn btn-primary btn-block">
              Start a season
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
