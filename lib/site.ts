export const site = {
  publisher: 'Visanam',
  product: 'Cosmos Club',
  fullName: 'Visanam presents Cosmos Club',
  // TODO: replace with your live domain before launch (used for canonical URLs + sitemap)
  url: 'https://www.visanam.com',
  tagline: 'Little creature. Big heart. A brighter tomorrow.',
  description:
    'A values-personalised comic subscription for children aged 6–9. Your child reads the story. You get the conversation — a parent brief, the exact questions to ask, and a guide, tuned to the values you chose.',
  email: 'hello@visanam.com',
  phone: '+91 00000 00000',
  city: 'Mumbai, India',
  social: {
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    linkedin: 'https://linkedin.com/',
  },
} as const;

export const nav = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/values-compass', label: 'Values Compass' },
  { href: '/characters', label: 'The cast' },
  { href: '/peek-inside', label: 'Peek inside' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/schools', label: 'Schools' },
  { href: '/journal', label: 'Journal' },
] as const;
