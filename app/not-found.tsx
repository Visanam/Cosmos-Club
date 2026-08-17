import Link from 'next/link';
import { ArrowRight } from '@/components/Icon';

export default function NotFound() {
  return (
    <section
      className="section bg-night grain"
      style={{ paddingTop: 'calc(var(--nav-h) + 90px)', minHeight: '70vh' }}
    >
      <div className="aurora" />
      <div className="stars" />
      <div className="wrap center" style={{ position: 'relative', zIndex: 2 }}>
        <span className="eyebrow eyebrow-c">Page 404</span>
        <h1 className="display" style={{ maxWidth: '16ch', marginInline: 'auto' }}>
          This panel hasn’t been drawn yet.
        </h1>
        <p className="lede" style={{ marginTop: 18, maxWidth: '42ch', marginInline: 'auto' }}>
          Whatever you were looking for isn’t here. Sprig’s glow has gone pale blue about it.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
          <Link href="/" className="btn btn-primary btn-lg">
            Back to the start
          </Link>
          <Link href="/values-compass" className="btn btn-ghost-light btn-lg">
            Take the Values Compass <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
