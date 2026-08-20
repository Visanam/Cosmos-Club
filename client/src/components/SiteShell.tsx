import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { useHeaderScroll, useHeroMotion, useImageFade, useScrollReveal, useScrollToTop } from "@/hooks/useMotion";

/**
 * VISANAM-SHELL-V2
 *
 * Header and footer for every page.
 *
 * The desktop menu used to show only three links, so Pricing, Schools, Bespoke
 * comics and Story guides could only be reached on a phone or by typing the
 * address. Anyone on a laptop — which is most people buying something — could
 * not find the price. The desktop menu and the footer now reach every page.
 */

const primaryLinks = [
  { href: "/why-visanam", label: "Why Visanam" },
  { href: "/values", label: "Values" },
  { href: "/oru", label: "Enter Oru" },
  { href: "/characters", label: "Story guides" },
  { href: "/schools", label: "Schools" },
  { href: "/pricing", label: "Pricing" },
];

const mobileLinks = [
  ...primaryLinks,
  { href: "/parents", label: "Parent journey" },
  { href: "/events", label: "Bespoke comics" },
  { href: "/faq", label: "Questions" },
];

const footerProduct = [
  { href: "/why-visanam", label: "Why Visanam" },
  { href: "/values", label: "Values" },
  { href: "/parents", label: "Parent journey" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "Questions" },
];

const footerMore = [
  { href: "/oru", label: "Enter Oru" },
  { href: "/characters", label: "Story guides" },
  { href: "/schools", label: "For schools" },
  { href: "/events", label: "Bespoke comics" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund", label: "Refunds" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  // Site-wide motion. Each hook re-runs on navigation and is a no-op when the
  // visitor has asked for reduced motion.
  useHeaderScroll();
  useScrollToTop(location);
  useScrollReveal(location);
  useHeroMotion(location);
  useImageFade(location);

  return (
    <div className="site-shell original-shell">
      <span key={`p-${location}`} className="route-progress" aria-hidden="true" />

      <header className="site-header">
        <div className="nav-wrap">
          <Link href="/" className="brand" aria-label="Visanam home">
            <span className="brand-orb" aria-hidden="true">
              <i />
              <i />
            </span>
            <span>VISANAM</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className={location === link.href ? "active" : ""}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/parents" className="nav-cta">
            Start with your moment <span aria-hidden="true">↗</span>
          </Link>

          <button
            type="button"
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {mobileLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/parents" onClick={() => setOpen(false)} className="nav-cta">
              Start with your moment <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        )}
      </header>

      <main key={location} className="page-enter">
        {children}
      </main>

      <footer className="site-footer">
        <div>
          <Link href="/" className="brand">
            <span className="brand-orb" aria-hidden="true">
              <i />
              <i />
            </span>
            <span>VISANAM</span>
          </Link>
          <p>Stories for the small moments that shape a family.</p>
          <p>
            Questions or partnerships:{" "}
            <a href="mailto:hello@visanam.net" className="footer-mail">
              hello@visanam.net
            </a>
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {footerProduct.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="footer-links" aria-label="More from Visanam">
          {footerMore.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="copyright">
          © {new Date().getFullYear()} Visanam. Made with care for little humans and their grown-ups.
          <span className="site-version" aria-hidden="true"> · v0.2</span>
        </p>
      </footer>
    </div>
  );
}
