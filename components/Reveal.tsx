'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** milliseconds of stagger */
  delay?: number;
  variant?: 'up' | 'scale';
  className?: string;
  id?: string;
  style?: CSSProperties;
}

/**
 * Adds the `.in` class the first time an element scrolls into view.
 * Pure IntersectionObserver — no animation library, no layout thrash.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = 'up',
  className = '',
  id,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const merged: CSSProperties = { ...style };
  if (delay) (merged as Record<string, string | number>)['--d'] = `${delay}ms`;

  return (
    <div
      id={id}
      ref={ref}
      className={`${variant === 'scale' ? 'reveal-scale' : 'reveal'} ${className}`.trim()}
      style={merged}
    >
      {children}
    </div>
  );
}
