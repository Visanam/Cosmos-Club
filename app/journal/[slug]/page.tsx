import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { ArrowRight, Compass } from '@/components/Icon';
import { POSTS, postBySlug } from '@/lib/posts';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: 'Not found' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.cover }],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: site.publisher },
    publisher: { '@type': 'Organization', name: site.publisher },
    mainEntityOfPage: `${site.url}/journal/${post.slug}`,
    image: `${site.url}${post.cover}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="section-tight bg-night grain"
        style={{ paddingTop: 'calc(var(--nav-h) + 60px)' }}
      >
        <div className="aurora" />
        <div className="wrap-narrow" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <Link href="/journal" className="tiny" style={{ color: 'var(--teal-bright)' }}>
              ← The journal
            </Link>
            <span className="chip chip-light" style={{ margin: '18px 0 0' }}>
              {post.value}
            </span>
            <h1 className="h1" style={{ margin: '18px 0 14px' }}>
              {post.title}
            </h1>
            <p className="tiny muted">
              {post.readMins} min read ·{' '}
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap-narrow">
          <Reveal variant="scale">
            <div className="art-frame ratio-wide" style={{ marginBottom: 40 }}>
              <Image src={post.cover} alt="" width={1536} height={1024} sizes="(max-width: 800px) 92vw, 760px" />
            </div>
          </Reveal>

          <Reveal>
            <article style={{ fontSize: '1.075rem', lineHeight: 1.72 }}>
              {post.body.map((para, i) => (
                <p
                  key={i}
                  style={
                    i === 0
                      ? { fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--ink-soft)' }
                      : undefined
                  }
                >
                  {para}
                </p>
              ))}
            </article>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="card"
              style={{ marginTop: 44, background: 'var(--cream-2)', borderStyle: 'dashed' }}
            >
              <h2 className="h3" style={{ marginBottom: 8 }}>
                This is one guide of many.
              </h2>
              <p className="small muted" style={{ marginBottom: 18 }}>
                Subscribers get one of these after every episode, matched to the values they chose —
                alongside the three questions to ask their child that week.
              </p>
              <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
                <Link href="/values-compass" className="btn btn-primary">
                  <Compass size={17} /> Find your child’s three values
                </Link>
                <Link href="/how-it-works" className="btn btn-ghost">
                  How the club works
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160} style={{ marginTop: 52 }}>
            <h2 className="h3" style={{ marginBottom: 20 }}>
              More from the journal
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/journal/${o.slug}`}
                  className="card card-hover"
                  style={{ padding: 20, display: 'block' }}
                >
                  <span className="tiny teal-text" style={{ fontWeight: 700 }}>
                    {o.value}
                  </span>
                  <h3 className="h4" style={{ margin: '6px 0 4px' }}>
                    {o.title}
                  </h3>
                  <span className="link-arrow tiny">
                    {o.readMins} min read <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
