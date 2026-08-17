import type { Metadata } from 'next';
import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your Cosmos Club season.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/checkout' },
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + 80px)' }}>
          <div className="wrap center muted">Loading your order…</div>
        </section>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
