/* =========================================================================
   THE JOURNAL — SEO surface + the "guide" half of the parent layer.
   Each post is matched to a value. Parents receive the matching guide after
   the episode that carries that value.
   Add posts by appending to this array. Body is plain paragraphs.
   ========================================================================= */

export interface Post {
  slug: string;
  title: string;
  value: string;
  valueId: string;
  readMins: number;
  date: string;
  excerpt: string;
  cover: string;
  body: string[];
}

export const POSTS: Post[] = [
  {
    slug: 'how-to-talk-to-your-child-about-courage',
    title: 'How to talk to your child about courage without saying "be brave"',
    value: 'Courage',
    valueId: 'courage',
    readMins: 6,
    date: '2026-08-04',
    excerpt:
      '"Be brave" is an instruction with no handle on it. Here is what to say instead, and why the smallest version works better than the big one.',
    cover: '/images/scenery/village-dusk.webp',
    body: [
      'Almost every parent has said "just be brave" to a child standing at the edge of something. It is well meant, and it almost never works — because it describes a destination without describing a single step. To a seven-year-old it lands as: everyone else can do this and you cannot.',
      'The more useful definition, and the one children can actually act on, is that courage is being scared and doing it anyway. Not the absence of fear. The presence of fear plus one step. That distinction matters enormously, because it means a frightened child is not disqualified from being brave — they are, in fact, the only kind of person who can be.',
      'Start absurdly small. Ordering their own food. Asking a shopkeeper where something is. Saying "I don\'t understand" out loud in a classroom. These are unglamorous and completely unheroic, and that is the point: the nervous system does not distinguish much between small brave things and big ones. It learns the shape of the move.',
      'Name the fear before the action, not after. "Your tummy feels funny, and you\'re going to ask anyway" gives a child a script and permission in the same sentence. Compare that with "there\'s nothing to be scared of", which is both untrue and, from the child\'s point of view, slightly insulting.',
      'Afterwards, praise the going, not the outcome. If they asked and got a no, that was still the brave part. If you only celebrate the wins, you have quietly taught them that courage counts when it works — which is exactly the belief that stops the next attempt.',
      'And watch what you narrate about yourself. Children calibrate their sense of normal risk almost entirely from the adults nearby. Saying "I was nervous about that meeting and I did it anyway" out loud, at dinner, does more than any amount of encouragement aimed at them.',
    ],
  },
  {
    slug: 'the-five-minute-conversation-that-beats-an-hour',
    title: 'The five-minute conversation that beats an hour of quality time',
    value: 'Connection',
    valueId: 'empathy',
    readMins: 5,
    date: '2026-07-27',
    excerpt:
      'Working parents are sold "quality time" as a block to be scheduled. The research points somewhere much smaller and much more repeatable.',
    cover: '/images/scenery/village-night.webp',
    body: [
      'There is a particular guilt that arrives around nine at night, after the laptop closes, when you realise the only sentences you exchanged with your child today were logistical. Shoes. Homework. Eat. Sleep. It is a very common feeling and a very unhelpful one, because it pushes parents towards the wrong fix: a big block of time at the weekend that is supposed to make up the deficit.',
      'Children do not experience closeness as a total number of hours. They experience it as frequency and predictability — the reliable sense that there is a moment, at a known time, when someone is interested in them specifically. Five minutes that happens every day beats three hours that happens when the calendar allows.',
      'The hard part is that a child cannot answer "how was your day". It is too big a question, asked at the wrong altitude, usually while you are also cooking. What works is a small, concrete, slightly odd question with a real answer: what was the most boring part of today? Who did you sit next to? What made someone laugh?',
      'Better still, borrow a third thing to talk through. Conversations that happen side by side — over a book, a walk, a drawing, a comic — are dramatically easier for children than conversations that happen face to face. The third thing takes the pressure off. They are not being interviewed; you are both looking at something.',
      'This is the entire design principle behind what we make. The story does the work of being the third thing, and it deliberately leaves emotional gaps in it, so that there is something specific and non-threatening to talk about — a character who got it wrong, not a child who did.',
      'And keep it short. The instinct, once a child finally opens up, is to keep going. Resist it. Ending while they still have more to say is what makes them come back tomorrow.',
    ],
  },
  {
    slug: 'what-to-do-when-your-child-cannot-lose',
    title: 'What to do when your child cannot lose',
    value: 'Resilience',
    valueId: 'resilience',
    readMins: 7,
    date: '2026-07-15',
    excerpt:
      'The board flips, the game ends, the evening is over. Why the meltdown is usually about self-image rather than the game — and what actually helps.',
    cover: '/images/scenery/forest-day.webp',
    body: [
      'A child who cannot lose is rarely being a bad sport. They are usually a child whose sense of themselves is doing far too much work off a single result. Losing does not feel like losing a game; it feels like receiving information about who they are. That is why the reaction is so disproportionate to the stakes.',
      'The first thing to stop doing is letting them win. It is a kind instinct and it makes the evening easier, and it teaches exactly the wrong lesson: that losing is so unbearable the adults will bend reality to prevent it. Children notice this, usually earlier than we think.',
      'The second thing to stop doing is the post-match analysis. "If you\'d moved that piece" is technically helpful and emotionally useless in the ninety seconds after a loss. Nothing gets learned in that window. Wait.',
      'What does help is separating two sentences that children fuse together: "this is hard" and "I am not capable". They arrive at the same moment and feel like the same fact. Saying the first one out loud, on their behalf, does a surprising amount of work: "that was genuinely hard, and you\'re not there yet."',
      'The phrase "not yet" is doing the heavy lifting there. It converts a verdict into a timeline. It is worth using constantly and slightly obnoxiously until it becomes their own internal phrasing.',
      'Then rehearse the second attempt while the stakes are low. A failure that is immediately followed by another go, with no ceremony, is being reclassified in real time as a normal part of doing things rather than an event. Over months, that reclassification is the whole of resilience.',
      'One caution: if a child is melting down over losing to a parent every single time, look at how competitive the household is being about achievement generally. Children are extremely good at working out what earns approval, and extremely bad at telling us that they have worked it out.',
    ],
  },
  {
    slug: 'anger-is-not-a-behaviour-problem',
    title: 'Anger is not a behaviour problem. It is a timing problem.',
    value: 'Emotional regulation',
    valueId: 'anger',
    readMins: 6,
    date: '2026-06-30',
    excerpt:
      'By the time a child is shouting, the useful moment has already passed. The work happens ninety seconds earlier — and children can be taught to find it.',
    cover: '/images/scenery/ship.webp',
    body: [
      'Most of what we do about children\'s anger happens after the shouting: the consequence, the apology, the conversation about how we speak to each other. All of it lands on a child whose thinking brain has temporarily gone offline, which is why the same conversation keeps needing to be had.',
      'The intervention point is earlier, and it is physical before it is verbal. Something happens in the body first — hot face, tight chest, loud ears, fists — and that something is available to notice. Children can learn to notice it, but only if we spend time on it when they are calm, which is precisely when nobody thinks to bring it up.',
      'So bring it up when nothing is wrong. "Where do you feel it first?" is a genuinely interesting question to a seven-year-old, and the answers are often wonderfully specific: my knees, my teeth, behind my eyes. Once a child has a name for the early signal, they have something to do other than obey it.',
      'Then give the feeling somewhere to go that is not a person. Pushing hard against a wall. Squeezing a cushion until you count five. Going outside. None of these are magic; they simply occupy the ninety seconds during which the surge peaks and starts to fall.',
      'Avoid strategies built on discomfort or shock. They work briefly by replacing one intense sensation with another, and they teach a child that the way to handle a feeling is to hurt slightly. There are gentler routes to the same ninety seconds.',
      'Finally, be careful about how the outburst is described afterwards. "You were so naughty" fuses the child to the behaviour. "That was a big one — what did you notice before it?" keeps them a person who had a feeling, which is the only version of themselves that can get better at this.',
    ],
  },
];

export function postBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
