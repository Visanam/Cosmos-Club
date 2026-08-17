import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const Check = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M20 6 9 17l-5-5" /></svg>
);

export const Cross = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
);

export const ArrowRight = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const ArrowLeft = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);

export const Sparkle = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
  </svg>
);

export const Book = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5z" />
  </svg>
);

export const Chat = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-4-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" />
  </svg>
);

export const Heart = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l1.7 1.7L12 22.3l7.1-7.1 1.7-1.7a5 5 0 0 0 0-7z" />
  </svg>
);

export const Shield = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Lock = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const Globe = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
  </svg>
);

export const Mail = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Star = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.6l6.5-.9z" />
  </svg>
);

export const Compass = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z" />
  </svg>
);

export const School = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3 2 8l10 5 10-5z" />
    <path d="M5 11v5.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V11" />
  </svg>
);

export const Gift = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="8.5" width="18" height="12.5" rx="2" />
    <path d="M3 13h18M12 8.5V21" />
    <path d="M12 8.5S10.5 3 8 3a2.5 2.5 0 0 0 0 5.5zM12 8.5S13.5 3 16 3a2.5 2.5 0 0 1 0 5.5z" />
  </svg>
);

export const Truck = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M3 16V6a1 1 0 0 1 1-1h10v11" />
    <path d="M14 8h4l3 3.5V16h-2" />
    <circle cx="7.5" cy="17.5" r="2" />
    <circle cx="17.5" cy="17.5" r="2" />
  </svg>
);
