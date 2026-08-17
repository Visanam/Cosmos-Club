/* =========================================================================
   THE CAST
   Art and heights come from the official model sheets (Aug 2026).
   NOTE FOR THE FOUNDER: the one-line "role" labels below are written to be
   personality-true but plot-safe for a public marketing site. Confirm or
   swap them — they are the only editorial liberty taken in this file.
   ========================================================================= */

export interface CastMember {
  id: string;
  name: string;
  role: string;
  height: string;
  blurb: string;
  /** The value this character most often carries on the page. */
  value: string;
  img: string;
  imgSm: string;
  accent: string;
}

export const CAST: CastMember[] = [
  {
    id: 'neo',
    name: 'Neo',
    role: 'The one who goes first',
    height: `5'10"`,
    blurb:
      'Steady, watchful, the oldest of the five. Goes first not because he is fearless but because somebody has to.',
    value: 'Courage',
    img: '/images/cast/neo.webp',
    imgSm: '/images/cast/neo-sm.webp',
    accent: '#2d5066',
  },
  {
    id: 'dev',
    name: 'Dev',
    role: 'The one who builds',
    height: `5'3"`,
    blurb:
      'Hands always busy, sleeves always dusty. Believes almost anything can be fixed if you sit with it long enough.',
    value: 'Discipline',
    img: '/images/cast/dev.webp',
    imgSm: '/images/cast/dev-sm.webp',
    accent: '#4a6b3a',
  },
  {
    id: 'tara',
    name: 'Tara',
    role: 'The one who notices',
    height: `5'2"`,
    blurb:
      'Reads the room, the sky and the small print. Asks the question everyone else was too polite to ask.',
    value: 'Curiosity',
    img: '/images/cast/tara.webp',
    imgSm: '/images/cast/tara-sm.webp',
    accent: '#3b6b63',
  },
  {
    id: 'sia',
    name: 'Sia',
    role: 'The one who lightens it',
    height: `5'1"`,
    blurb:
      'Loud, warm and very hard to discourage. Turns out to be the one who spots how other people are actually feeling.',
    value: 'Empathy',
    img: '/images/cast/sia.webp',
    imgSm: '/images/cast/sia-sm.webp',
    accent: '#c4643c',
  },
  {
    id: 'sprig',
    name: 'Sprig',
    role: 'The one who feels it first',
    height: `3'0"`,
    blurb:
      'Never speaks. Doesn’t need to — his cheeks, ears and head-tuft glow with whatever he is feeling, a beat before anyone else has noticed.',
    value: 'Emotional regulation',
    img: '/images/cast/sprig.webp',
    imgSm: '/images/cast/sprig-sm.webp',
    accent: '#5e91b8',
  },
];

/** Sprig's glow is a feelings vocabulary for a six-year-old. */
export const SPRIG_MOODS = [
  { id: 'calm', label: 'Calm', colour: '#f4b15d', glow: 'rgba(244,177,93,0.85)', note: 'Warm gold. Everything is fine.' },
  { id: 'joy', label: 'Joy', colour: '#ffe27a', glow: 'rgba(255,226,122,0.95)', note: 'Brighter, sparkling gold. Something wonderful just happened.' },
  { id: 'scared', label: 'Scared', colour: '#9de1ff', glow: 'rgba(157,225,255,0.9)', note: 'Pale blue, flickering. He has seen something before you have.' },
  { id: 'brave', label: 'Digging deep', colour: '#2fd3d3', glow: 'rgba(47,211,211,0.9)', note: 'Teal. He is pulling on something bigger than himself.' },
];

export const ANTAGONIST = {
  name: 'Vorax',
  role: 'Not what he looks like',
  blurb:
    'Every season needs someone to be frightened of. Ours turns out to be hungry rather than wicked — and the children work that out before any adult does. He is drawn for awe, never for nightmares.',
  img: '/images/cast/vorax.webp',
  imgSm: '/images/cast/vorax-sm.webp',
};
