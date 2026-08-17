/* =========================================================================
   PEEK INSIDE — deliberately a *glimpse*, not the story.
   Captions here are atmosphere only. No plot, no beats, no resolution.
   The full storyline stays out of this repository on purpose.
   ========================================================================= */

export interface PanelGlimpse {
  n: string;
  img: string;
  imgSm: string;
  caption: string;
  talk?: boolean;
  locked?: boolean;
}

export const PANELS: PanelGlimpse[] = [
  {
    n: '01',
    img: '/images/scenery/village-day.webp',
    imgSm: '/images/scenery/village-day-sm.webp',
    caption: 'We open wide, in daylight, on a place that has been happy for a very long time.',
  },
  {
    n: '04',
    img: '/images/scenery/forest-day.webp',
    imgSm: '/images/scenery/forest-day-sm.webp',
    caption: 'The five take the long way home. Somebody is about to be careless.',
    talk: true,
  },
  {
    n: '09',
    img: '/images/scenery/village-dusk.webp',
    imgSm: '/images/scenery/village-dusk-sm.webp',
    caption: 'Something crosses the sky. One of them thinks it is a meteorite.',
    talk: true,
  },
  {
    n: '14',
    img: '/images/scenery/forest-night.webp',
    imgSm: '/images/scenery/forest-night-sm.webp',
    caption: 'Locked until your first delivery.',
    locked: true,
  },
];

export const EPISODE_ARC = [
  {
    ep: 'Episode 1',
    title: 'The signal',
    note: 'A happy place, a small act of carelessness, and a consequence nobody sees yet.',
  },
  {
    ep: 'Episode 2',
    title: 'The visitor',
    note: 'Something arrives. The grown-ups are reassuring. The children are not reassured.',
  },
  {
    ep: 'Episode 3',
    title: 'The wrong answer',
    note: 'A shortcut appears, and it sparkles. Taking it would be so much easier.',
  },
  {
    ep: 'Episode 4',
    title: 'The tell',
    note: 'One of the five notices the detail that changes everything.',
  },
  {
    ep: 'Episode 5',
    title: 'The confrontation',
    note: 'They are right, and being right turns out to be harder than being wrong.',
  },
  {
    ep: 'Episode 6',
    title: 'The formula',
    note: 'The children solve it. No adult rescues them, and nothing is destroyed.',
  },
];

/** The three rules that never change, in any episode, in any season. */
export const PROMISES = [
  {
    title: 'A child solves it',
    body: 'Never an adult, never luck, never the shortcut. The person your child is reading about is the person who fixes things.',
  },
  {
    title: 'One value, never a stack',
    body: 'Each episode carries a single value all the way through. Six episodes, six clean threads — not a lecture with a plot attached.',
  },
  {
    title: 'It passes the sleep test',
    body: 'Every frightening beat is checked against one question: would a six-year-old sleep fine after this? If not, we redraw it.',
  },
];
