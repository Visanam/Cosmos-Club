/* =========================================================================
   THE VALUES ENGINE
   The parent chooses (or discovers) which values matter most right now.
   Every child in the world reads the identical comic; only the parent-side
   layer changes. This file defines the values and the Values Compass quiz.
   ========================================================================= */

export interface Value {
  id: string;
  name: string;
  /** One line a parent instantly recognises. */
  signal: string;
  /** What the parent layer does about it. */
  approach: string;
  /** Which story beat the personalisation hangs off (non-spoiler). */
  hook: string;
}

export const VALUES: Value[] = [
  {
    id: 'courage',
    name: 'Courage',
    signal: 'Hangs back at the edge of new groups, new rooms, new things.',
    approach:
      'We re-frame courage as "scared and doing it anyway" — small, repeatable, non-heroic. Never as fearlessness.',
    hook: 'The moment a character steps forward before they feel ready.',
  },
  {
    id: 'empathy',
    name: 'Empathy',
    signal: 'Notices their own feelings quickly, other people\'s slowly.',
    approach:
      'We practise reading faces and guessing reasons — including for the character who behaves badly.',
    hook: 'The moment a character realises someone else was hurting too.',
  },
  {
    id: 'discipline',
    name: 'Discipline',
    signal: 'Starts things brilliantly. Finishing is the hard part.',
    approach:
      'We build the idea of a promise-to-yourself, and make finishing visible and satisfying rather than dutiful.',
    hook: 'The moment a character keeps going after the fun part ends.',
  },
  {
    id: 'anger',
    name: 'Emotional regulation',
    signal: 'Goes from zero to loud, then feels terrible about it afterwards.',
    approach:
      'We name the body signals that arrive before the outburst, so the feeling becomes something to notice, not obey.',
    hook: 'The moment a character feels the heat rise and does something with it.',
  },
  {
    id: 'honesty',
    name: 'Honesty',
    signal: 'Fudges the details when the truth costs something.',
    approach:
      'We make the cost of telling the truth visible — and then make the payoff visible too, in the plot, never in a lecture.',
    hook: 'The moment a character owns something they could have hidden.',
  },
  {
    id: 'patience',
    name: 'Patience',
    signal: 'Wants it now. Waiting feels like a punishment.',
    approach:
      'We show waiting as an active thing you do, with something to do inside it.',
    hook: 'The moment a character chooses the slower, better way.',
  },
  {
    id: 'resilience',
    name: 'Resilience',
    signal: 'A first failure ends the whole attempt.',
    approach:
      'We normalise the second try, and treat the first failure as information rather than verdict.',
    hook: 'The moment a plan fails and a character tries a different one.',
  },
  {
    id: 'responsibility',
    name: 'Responsibility',
    signal: 'The mess, the bag, the shoes — always somebody else\'s job.',
    approach:
      'We connect small ownership to visible consequence, so responsibility feels like power rather than chore.',
    hook: 'The moment a character repairs something they broke.',
  },
  {
    id: 'focus',
    name: 'Focus',
    signal: 'Three things open, none of them finished.',
    approach:
      'We practise choosing one thing on purpose, and protecting it for a short, winnable stretch.',
    hook: 'The moment a character shuts out the noise to notice one detail.',
  },
  {
    id: 'gratitude',
    name: 'Gratitude',
    signal: 'The new thing is wonderful for about four days.',
    approach:
      'We shift attention from what is missing to what is already here, without ever shaming the wanting.',
    hook: 'The moment a character sees what they already had.',
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    signal: 'Asks fewer questions than they used to.',
    approach:
      'We reward the question more than the answer, and make not-knowing feel safe and interesting.',
    hook: 'The moment a character asks the question nobody else will.',
  },
  {
    id: 'confidence',
    name: 'Self-belief',
    signal: '"I\'m bad at this" arrives before the second attempt.',
    approach:
      'We separate "this is hard" from "I am not capable", and give them language for the difference.',
    hook: 'The moment a character does the thing they said they could not do.',
  },
];

export const VALUE_BY_ID: Record<string, Value> = Object.fromEntries(
  VALUES.map((v) => [v.id, v])
);

/* -------------------------------------------------------------------------
   Quiz
   ------------------------------------------------------------------------- */
export interface QuizOption {
  text: string;
  /** value id → weight */
  w: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  helper?: string;
  options: QuizOption[];
}

export const QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Your child walks into a room of children they don’t know. What actually happens?',
    helper: 'Think of the last birthday party, not the ideal one.',
    options: [
      { text: 'They hover near you until someone comes to them.', w: { courage: 3, confidence: 2 } },
      { text: 'They join in, but only if a familiar face is already there.', w: { courage: 2, confidence: 1 } },
      { text: 'They walk in loud and fast, and read the room later.', w: { empathy: 2, focus: 1 } },
      { text: 'They find one child and stay with that one child.', w: { confidence: 1, empathy: 1 } },
    ],
  },
  {
    id: 'q2',
    prompt: 'It’s homework time. Describe the first fifteen minutes.',
    options: [
      { text: 'Sharpening, snacking, bathroom, anything but starting.', w: { discipline: 3, focus: 2 } },
      { text: 'Starts fast, fades by the second page.', w: { discipline: 3, resilience: 1 } },
      { text: 'Fine while I sit there. Not fine when I leave.', w: { responsibility: 3, discipline: 1 } },
      { text: 'Honestly, this one is going well right now.', w: { curiosity: 1 } },
    ],
  },
  {
    id: 'q3',
    prompt: 'Something doesn’t go their way. What does the next sixty seconds look like?',
    options: [
      { text: 'Volume. Immediately.', w: { anger: 4, patience: 1 } },
      { text: 'They go quiet and vanish into another room.', w: { resilience: 2, confidence: 2 } },
      { text: '"It’s not fair" — and then a long negotiation.', w: { patience: 2, gratitude: 2 } },
      { text: 'They shrug it off faster than I would.', w: { empathy: 1 } },
    ],
  },
  {
    id: 'q4',
    prompt: 'A friend or sibling is upset nearby. Your child…',
    options: [
      { text: 'Doesn’t notice until someone points it out.', w: { empathy: 4 } },
      { text: 'Notices, but doesn’t know what to do with it.', w: { empathy: 3 } },
      { text: 'Tries to fix it instantly, usually with a toy.', w: { empathy: 2, patience: 1 } },
      { text: 'Sits with them. This is their superpower.', w: { courage: 1 } },
    ],
  },
  {
    id: 'q5',
    prompt: 'They’ve broken something, or forgotten something important. Then what?',
    options: [
      { text: 'It becomes somebody else’s fault very quickly.', w: { responsibility: 4, honesty: 2 } },
      { text: 'They hide it and hope.', w: { honesty: 4, courage: 1 } },
      { text: 'They tell me, but only after I ask directly.', w: { honesty: 2, responsibility: 1 } },
      { text: 'They come and tell me. Every time.', w: { curiosity: 1 } },
    ],
  },
  {
    id: 'q6',
    prompt: 'Screen time is ending in five minutes. How does that land?',
    options: [
      { text: 'Five minutes means twenty, and a fight.', w: { discipline: 3, anger: 2 } },
      { text: 'Fine, then a long low mood afterwards.', w: { anger: 2, patience: 2 } },
      { text: 'They stop, but they ask again in ten minutes. And ten after that.', w: { patience: 3, gratitude: 1 } },
      { text: 'They stop when I say stop.', w: { discipline: 1 } },
    ],
  },
  {
    id: 'q7',
    prompt: 'Something is genuinely hard on the first attempt. What do they say?',
    options: [
      { text: '"I can’t do it." Before really trying.', w: { confidence: 4, resilience: 2 } },
      { text: '"This is stupid." And they walk away.', w: { resilience: 3, anger: 2 } },
      { text: '"You do it." They want it done, not learned.', w: { resilience: 2, responsibility: 2 } },
      { text: 'They keep at it longer than most adults would.', w: { focus: 1 } },
    ],
  },
  {
    id: 'q8',
    prompt: 'And if you could hand them one thing this year — what would it be?',
    helper: 'Trust your first instinct here. It weighs the most.',
    options: [
      { text: 'The nerve to go first.', w: { courage: 5, confidence: 2 } },
      { text: 'A longer fuse.', w: { anger: 5, patience: 2 } },
      { text: 'The ability to finish what they start.', w: { discipline: 5, focus: 2 } },
      { text: 'A softer heart towards other people.', w: { empathy: 5, gratitude: 2 } },
    ],
  },
];

export interface CompassResult {
  ranked: { value: Value; score: number; pct: number }[];
  top: Value[];
}

export function scoreCompass(answers: Record<string, number>): CompassResult {
  const totals: Record<string, number> = {};
  for (const v of VALUES) totals[v.id] = 0;

  for (const q of QUIZ) {
    const idx = answers[q.id];
    if (idx === undefined) continue;
    const opt = q.options[idx];
    if (!opt) continue;
    for (const [id, weight] of Object.entries(opt.w)) {
      totals[id] = (totals[id] ?? 0) + weight;
    }
  }

  const max = Math.max(1, ...Object.values(totals));
  const ranked = VALUES.map((value) => ({
    value,
    score: totals[value.id],
    pct: Math.round((totals[value.id] / max) * 100),
  }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return { ranked, top: ranked.slice(0, 3).map((r) => r.value) };
}

/** Three conversation openers, generated from the child's top value. */
export function talkQuestionsFor(valueId: string, childName: string): string[] {
  const n = childName.trim() || 'your child';
  const bank: Record<string, string[]> = {
    courage: [
      `Was there a moment today where you nearly said something and didn't?`,
      `Who in the story was the most scared, do you think? What did they do about it?`,
      `What's one small brave thing you could do tomorrow that nobody would even notice?`,
    ],
    empathy: [
      `Which character had the worst day in this episode? How do you know?`,
      `Has anyone ever guessed how you were feeling without you saying it?`,
      `If you could ask one character one question, who and what?`,
    ],
    discipline: [
      `What's something you started this week that you haven't finished?`,
      `In the story, who kept going after it stopped being fun?`,
      `What would make finishing it feel good instead of boring?`,
    ],
    anger: [
      `Where in your body do you feel it first when you get really cross?`,
      `Did anyone in the story get angry? Was it fair that they did?`,
      `What's something that helps you when you're already boiling?`,
    ],
    honesty: [
      `Was there a moment in the story where telling the truth was expensive?`,
      `Is there anything you'd like to tell me that you've been holding on to?`,
      `What makes it easier to own up — what could I do differently?`,
    ],
    patience: [
      `What are you waiting for right now that feels too slow?`,
      `Which character in the story rushed something? What did it cost them?`,
      `What could you do while you're waiting, instead of just waiting?`,
    ],
    resilience: [
      `What's something you tried this week that didn't work?`,
      `Did a plan fail in the story? What did they do next?`,
      `What would trying it a second time look like?`,
    ],
    responsibility: [
      `What's one thing in this house that's genuinely yours to look after?`,
      `Did anyone in the story break something and then fix it?`,
      `What's the hardest part about saying "that was me"?`,
    ],
    focus: [
      `What was the smallest detail you noticed in this episode?`,
      `What makes it hard to pay attention — noise, or something in your head?`,
      `What could we change in your room to make one thing easier to finish?`,
    ],
    gratitude: [
      `What's something you already have that you'd hate to lose?`,
      `Who did something for you today that you didn't say thank you for?`,
      `What do you think the characters were most glad about?`,
    ],
    curiosity: [
      `What's one thing in this episode you didn't understand?`,
      `What question would you ask the person who wrote this story?`,
      `What's something you'd like to find out about this week?`,
    ],
    confidence: [
      `What's something you're better at now than you were last year?`,
      `Who in the story didn't think they could do it — and then did?`,
      `What do you want to be able to do that you can't do yet?`,
    ],
  };
  const qs = bank[valueId] ?? bank.courage;
  return qs.map((q) => q.replace('your child', n));
}
