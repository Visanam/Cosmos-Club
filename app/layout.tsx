import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { CurrencyProvider } from '@/components/CurrencyProvider';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — comics that give you the conversation`,
    template: `%s · ${site.product}`,
  },
  description: site.description,
  keywords: [
    'comics for kids',
    'values based learning',
    'social emotional learning',
    'SEL India',
    'parenting subscription',
    'children comic subscription',
    'NEP 2020 social emotional learning',
    'parent child conversation',
    'comics for 6 to 9 year olds',
  ],
  authors: [{ name: site.publisher }],
  creator: site.publisher,
  publisher: site.publisher,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.product,
    title: `${site.fullName}`,
    description: site.description,
    url: site.url,
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: site.product }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.fullName,
    description: site.description,
    images: ['/images/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: '#0b1725',
  width: 'device-width',
  initialScale: 1,
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.publisher,
  url: site.url,
  email: site.email,
  description: site.description,
  brand: { '@type': 'Brand', name: site.product, slogan: site.tagline },
  areaServed: 'Worldwide',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // On Vercel this header is populated at the edge — zero-latency geo pricing.
  // Locally it is absent and the client falls back to an IP lookup.
  const h = await headers();
  const country = h.get('x-vercel-ip-country');

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CurrencyProvider serverCountry={country}>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CurrencyProvider>
      </body>
    </html>
  );
}
