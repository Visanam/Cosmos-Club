// Artwork is bundled with the app (client/public/art) rather than proxied from
// an external storage service, so the site is portable and fast. Each image has
// an "@sm" variant for small viewports.
export const assets = {
  ship: "/art/ship.webp",
  forestDay: "/art/forest-day.webp",
  meteorVillage: "/art/meteor-village.webp",
  forestNight: "/art/forest-night.webp",
  villageNight: "/art/village-night.webp",
  villageDay: "/art/village-day.webp",
  neo: "/art/neo.webp",
  dev: "/art/dev.webp",
  tara: "/art/tara.webp",
  sia: "/art/sia.webp",
  sprig: "/art/sprig.webp",
  vorax: "/art/vorax.webp",
} as const;

/** Small-viewport variant of any bundled asset, for srcSet. */
export const small = (src: string) => src.replace(/\.webp$/, "@sm.webp");

export type ValueFocus =
  | "Courage"
  | "Empathy"
  | "Discipline"
  | "Anger Management"
  | "Time Management"
  | "Kindness"
  | "Honesty"
  | "Resilience";

export const valueOptions: Array<{ value: ValueFocus; prompt: string; tone: string; glow: string; outcome: string; childPractice: string; whyItMatters: string; moments: string[]; storyTitle: string; storyPreview: string; storyImage: string }> = [
  { value: "Courage", prompt: "Take the next small brave step.", tone: "Amber", glow: "#f6b657", outcome: "Confidence to act with uncertainty", childPractice: "Notice worry, ask for support, and try one safe next step.", whyItMatters: "It gives children language for being unsure without letting uncertainty decide everything for them.", moments: ["Avoids a new activity because it feels scary", "Wants to ask a question but worries about getting it wrong", "Needs a steady plan before trying again after a setback"], storyTitle: "The bell at the old gate", storyPreview: "Neo hears the bell ring beyond the village gate. He does not feel ready—but he asks a friend to walk the first few steps with him.", storyImage: assets.villageNight },
  { value: "Empathy", prompt: "Notice what another heart may need.", tone: "Rose", glow: "#eb8f9d", outcome: "Perspective-taking and connection", childPractice: "Pause, wonder what another person may feel, then listen before responding.", whyItMatters: "It helps children build the habit of noticing another point of view during everyday friendships and family moments.", moments: ["Has a hard time seeing a friend’s point of view", "Needs help after a friendship misunderstanding", "Notices someone left out of a group activity"], storyTitle: "The quiet seat", storyPreview: "At the festival, Sia saves a bright seat for Tara—then notices Tara is quiet. Instead of filling the silence, she asks what happened.", storyImage: assets.meteorVillage },
  { value: "Discipline", prompt: "Build the little rhythms that hold us.", tone: "Indigo", glow: "#8ea4ec", outcome: "Follow-through and self-direction", childPractice: "Choose a tiny first step, return to it, and recognise progress over perfection.", whyItMatters: "Small repeatable routines help children experience themselves as capable of beginning, continuing, and finishing.", moments: ["Needs reminders to begin a routine", "Leaves a task when it stops feeling exciting", "Wants a simple rhythm for homework, practice, or a responsibility"], storyTitle: "The lantern list", storyPreview: "Dev wants to build the biggest lantern in Oru. Tara helps him choose one small task for today—and one for tomorrow.", storyImage: assets.forestDay },
  { value: "Anger Management", prompt: "Make room for the feeling, then choose the action.", tone: "Coral", glow: "#ee765d", outcome: "Emotional regulation and safer choices", childPractice: "Name the body signal, take a pause, and choose a safe next action.", whyItMatters: "It teaches that anger is a valid signal while helping children rehearse what to do before words or actions cause harm.", moments: ["Gets frustrated quickly when a plan changes", "Has a big reaction after losing a game or being told no", "Needs a pause during a sibling or friend conflict"], storyTitle: "When Sprig glowed red", storyPreview: "Sprig’s glow turns bright red when the bridge game changes. The friends help him stop, breathe by the river, and choose words that do not hurt.", storyImage: assets.forestNight },
  { value: "Time Management", prompt: "Turn busy moments into gentle plans.", tone: "Mint", glow: "#78cbb3", outcome: "Planning, sequencing, and balance", childPractice: "Sort one moment into first, next, and later—while leaving room for rest.", whyItMatters: "It gives children a calm way to approach crowded days instead of feeling that everything must happen at once.", moments: ["Feels overwhelmed by homework and schedules", "Finds transitions between activities difficult", "Needs help planning a busy school-day afternoon"], storyTitle: "Three stones for today", storyPreview: "Tara has too many things to do before moonrise. She places three smooth stones in a row: first, next, and later.", storyImage: assets.villageDay },
  { value: "Kindness", prompt: "Let care become something we practise.", tone: "Gold", glow: "#e7c46a", outcome: "Compassion expressed through action", childPractice: "Notice a need and turn care into one practical, respectful action.", whyItMatters: "It moves kindness from a rule into a concrete choice children can recognise in friendships, home, and school.", moments: ["Notices a friend who may need help before they ask", "Wants to make someone feel welcome", "Needs ideas for repairing a small hurt with care"], storyTitle: "A place at the table", storyPreview: "During market day, Dev notices a newcomer holding a heavy basket. He makes space, carries one side, and learns their name.", storyImage: assets.villageDay },
  { value: "Honesty", prompt: "Tell the truth with a safe heart.", tone: "Sky", glow: "#7bc3dc", outcome: "Integrity, trust, and repair", childPractice: "Tell what happened, own a choice, and stay present for the repair.", whyItMatters: "It helps children learn that honesty can protect trust, even when the truth feels uncomfortable to say.", moments: ["Finds it difficult to own a mistake", "Wants help telling the truth after a rule was broken", "Needs words for making an honest repair"], storyTitle: "The missing map pin", storyPreview: "Neo loses the glowing map pin and almost hides it. When he tells the truth, the group helps him search—and make a plan to repair it.", storyImage: assets.forestDay },
  { value: "Resilience", prompt: "Begin again, with a little more knowing.", tone: "Lilac", glow: "#b992d0", outcome: "Recovery and flexible problem-solving", childPractice: "Feel the disappointment, notice what was learned, then choose one way to try again.", whyItMatters: "It helps children see setbacks as moments for support, learning, and another attempt—not as a final verdict on who they are.", moments: ["Feels disappointed after something does not work out", "Needs a way to return after a mistake", "Wants encouragement to try again after a difficult task"], storyTitle: "The bridge we build twice", storyPreview: "The friends’ tiny bridge tips into the stream. They feel disappointed, dry the plans, and build the next version together.", storyImage: assets.forestNight },
];

export const characters = [
  { id: "neo", name: "Neo", image: assets.neo, eyebrow: "The Steady Guide", description: "Warm, observant, and quietly brave. Neo helps friends make room for every feeling before choosing what comes next.", summary: "For the moments when a child needs to pause, notice, and choose a next step.", growthFocus: "Emotional awareness", childPractice: "Name a feeling, pause, and choose a kind next step.", parentMoment: "When a child is unsure what to do with a big feeling.", role: "Keeper of the village stories", shelfGroup: "feelings", keepsakeCue: "Pause. Notice. Choose a kind next step." },
  { id: "dev", name: "Dev", image: assets.dev, eyebrow: "The Big-Hearted Builder", description: "Dev brings generous energy and a love of trying. His mistakes are honest, funny, and always a chance to practise repair.", summary: "For the days when trying again matters more than getting it right at once.", growthFocus: "Resilience and repair", childPractice: "Treat a mistake as a chance to learn, repair, and try once more.", parentMoment: "When getting it right immediately starts to feel like the only option.", role: "Maker of small brave plans", shelfGroup: "courage", keepsakeCue: "Trying again is a brave kind of building." },
  { id: "tara", name: "Tara", image: assets.tara, eyebrow: "The Curious Thinker", description: "Tara asks the questions no one else has thought to ask. She helps the group slow down, notice details, and imagine kinder possibilities.", summary: "For a child who sees possibilities hiding inside every question.", growthFocus: "Curiosity and perspective", childPractice: "Ask a helpful question before making an assumption.", parentMoment: "When there may be more than one explanation for what happened.", role: "Map-reader of curious minds", shelfGroup: "curiosity", keepsakeCue: "A good question can open a kinder path." },
  { id: "sia", name: "Sia", image: assets.sia, eyebrow: "The Joyful Spark", description: "Sia sees wonder everywhere. Her laughter opens doors, but she is also learning that courage can look like pausing to listen.", summary: "For the bright-hearted child learning that a pause can be its own kind of courage.", growthFocus: "Listening courage", childPractice: "Slow down long enough to hear another person and then respond with care.", parentMoment: "When excitement makes it hard to leave room for someone else’s voice.", role: "Finder of hidden wonder", shelfGroup: "courage", keepsakeCue: "A listening pause can be its own kind of courage." },
  { id: "sprig", name: "Sprig", image: assets.sprig, eyebrow: "The Glow Companion", description: "Sprig’s cheeks, ears, and crown glow with every big feeling. He reminds the friends that emotions are signals, never shameful secrets.", summary: "For naming a big feeling without making it something to hide.", growthFocus: "Emotion naming", childPractice: "Recognise that a feeling is information, then ask what might help.", parentMoment: "When a child needs a safe way to say what is happening inside.", role: "Guardian of feeling-glow", shelfGroup: "feelings", keepsakeCue: "Every feeling is a signal, never a secret to hide." },
  { id: "vorax", name: "Vorax", image: assets.vorax, eyebrow: "The Distant Shadow", description: "Vorax is a strange force beyond the hills, drawn to moments when people forget to care for one another. The village learns that connection is its answer.", summary: "For talking gently about the choices that pull us away from one another.", growthFocus: "Connection and consequences", childPractice: "Notice how a choice affects others, then choose a way back toward connection.", parentMoment: "When a difficult choice has created distance between people.", role: "The challenge beyond the Spire", shelfGroup: "curiosity", keepsakeCue: "Connection grows when we remember to care." },
] as const;

// Pricing lives in shared/pricing.ts so the server can charge from the same
// table the browser displays. Re-exported here for backwards compatibility.
export {
  pricingTiers,
  getPricingForTimezone,
  getPricingForCountry,
  getPricingForIsoCode,
} from "@shared/pricing";
export type { PricingCurrency, PricingTier } from "@shared/pricing";

export const scenarios = [
  "Avoids a new activity because it feels scary",
  "Gets frustrated quickly when a plan changes",
  "Needs reminders to begin a routine",
  "Has a hard time seeing a friend’s point of view",
  "Feels overwhelmed by homework and schedules",
  "Finds it difficult to own a mistake",
];

export const planQuestions: Record<ValueFocus, string[]> = {
  Courage: ["What felt like a small brave step today?", "Who could be beside you while you try?", "How did your body tell you it was time to pause?"],
  Empathy: ["What might the other person have been feeling?", "What could we notice before we respond?", "What would help them feel understood?"],
  Discipline: ["What is the smallest first step?", "When could we make room for this rhythm?", "What would make finishing feel satisfying?"],
  "Anger Management": ["Where did you notice anger in your body?", "What could help your glow settle first?", "What would be a safe next action?"],
  "Time Management": ["Which part of today felt most crowded?", "What can we do first, next, and later?", "How can we leave room for rest?"],
  Kindness: ["What kind thing did you notice today?", "Who might need a little extra care?", "How could we make that care practical?"],
  Honesty: ["What feels hard to say out loud?", "How can we tell the truth kindly?", "What helps a truth feel safe to share?"],
  Resilience: ["What did you learn from the hard part?", "What would trying again look like?", "Who can remind you of what you already know?"],
};

export function buildPlan(value: ValueFocus, scenario: string, ageBand: string) {
  const valueData = valueOptions.find((item) => item.value === value) ?? valueOptions[0];
  return {
    title: `A gentle ${value.toLowerCase()} plan`,
    cue: `In Season 1, the friends meet a moment that reflects “${scenario.toLowerCase()}”. Your child will see that this feeling is welcome, then watch a small next step take shape.`,
    ageNote: `Designed for your ${ageBand} reader with conversation prompts that leave room for their own words.`,
    glow: valueData.glow,
    outcome: valueData.outcome,
    childPractice: valueData.childPractice,
    whyItMatters: valueData.whyItMatters,
    questions: planQuestions[value],
    episodes: value === "Discipline" || value === "Time Management" ? ["04", "05"] : value === "Courage" || value === "Resilience" ? ["05", "06"] : ["02", "03"],
  };
}
