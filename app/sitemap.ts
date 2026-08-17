import type { MetadataRoute } from 'next';
import { POSTS } from '@/lib/posts';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; freq: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/how-it-works', priority: 0.9, freq: 'monthly' },
    { path: '/values-compass', priority: 0.9, freq: 'monthly' },
    { path: '/pricing', priority: 0.9, freq: 'weekly' },
    { path: '/characters', priority: 0.8, freq: 'monthly' },
    { path: '/peek-inside', priority: 0.8, freq: 'monthly' },
    { path: '/parent-portal', priority: 0.7, freq: 'monthly' },
    { path: '/schools', priority: 0.8, freq: 'monthly' },
    { path: '/celebrations', priority: 0.7, freq: 'monthly' },
    { path: '/journal', priority: 0.8, freq: 'weekly' },
    { path: '/faq', priority: 0.7, freq: 'monthly' },
    { path: '/contact', priority: 0.6, freq: 'yearly' },
    { path: '/privacy', priority: 0.3, freq: 'yearly' },
    { path: '/terms', priority: 0.3, freq: 'yearly' },
  ];

  return [
    ...routes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...POSTS.map((p) => ({
      url: `${site.url}/journal/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
