import Link from 'next/link';
import { site } from '@/lib/site';

const cols = [
  {
    title: 'The club',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/values-compass', label: 'Values Compass' },
      { href: '/characters', label: 'The cast' },
      { href: '/peek-inside', label: 'Peek inside' },
      { href: '/parent-portal', label: 'Parent portal' },
    ],
  },
  {
    title: 'Join',
    links: [
      { href: '/pricing', label: 'Pricing' },
      { href: '/checkout', label: 'Checkout' },
      { href: '/faq', label: 'Questions' },
      { href: '/contact', label: 'Contact us' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { href: '/schools', label: 'Schools & NEP' },
      { href: '/celebrations', label: 'Bespoke comics' },
    ],
  },
  {
    title: 'Read',
    links: [
      { href: '/journal', label: 'The journal' },
      { href: '/journal/how-to-talk-to-your-child-about-courage', label: 'On courage' },
      { href: '/journal/anger-is-not-a-behaviour-problem', label: 'On anger' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="ftr grain">
      <div className="aurora" style={{ opacity: 0.35 }} />
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <div className="brand" style={{ marginBottom: 16 }}>
              <span className="brand-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.5 15.6 10H8.4z" fill="#2fd3d3" />
                  <path d="M8.4 10h7.2l1.3 5.4H7.1z" fill="#9de1ff" opacity=".85" />
                  <circle cx="12" cy="12.6" r="2" fill="#fff6b8" />
                </svg>
              </span>
              <span className="brand-txt">
                <span className="brand-sup" style={{ color: 'rgba(255,255,255,.5)' }}>
                  {site.publisher} presents
                </span>
                <span className="brand-name" style={{ color: '#fff' }}>
                  {site.product}
                </span>
              </span>
            </div>
            <p className="small" style={{ maxWidth: '32ch', color: 'rgba(255,255,255,.6)' }}>
              {site.tagline}
            </p>
            <p className="small" style={{ marginTop: 14, color: 'rgba(255,255,255,.5)' }}>
              {site.city}
              <br />
              <a href={`mailto:${site.email}`} style={{ display: 'inline' }}>
                {site.email}
              </a>
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              {c.links.map((l) => (
                <Link key={l.href + l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="ftr-bottom">
          <span>
            © {new Date().getFullYear()} {site.publisher}. All characters, artwork and story are
            original and protected.
          </span>
          <span style={{ display: 'flex', gap: 18 }}>
            <Link href="/privacy" style={{ display: 'inline' }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ display: 'inline' }}>
              Terms
            </Link>
            <Link href="/contact" style={{ display: 'inline' }}>
              Contact
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
