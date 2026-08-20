/**
 * VISANAM-PRERENDER-V1
 *
 * Runs once, straight after `vite build`, and costs nothing at runtime.
 *
 * THE PROBLEM IT SOLVES
 * The website is a single-page app. Every address — /pricing, /schools, /faq —
 * is served the exact same file, which contains an empty <div id="root"> and
 * the home page's title and description. The real page is drawn by JavaScript a
 * moment later, in the visitor's browser.
 *
 * Google runs that JavaScript, so Google eventually sees the real page. Almost
 * nothing else does. WhatsApp, Facebook, LinkedIn and Slack link previews read
 * the raw file and never run JavaScript, so sharing a link to /pricing showed
 * the home page's title. AI crawlers (ChatGPT, Claude, Perplexity) also read
 * raw HTML only. And the canonical tag on every page pointed at the home page.
 *
 * WHAT IT DOES
 * For each real page it writes dist/public/<page>/index.html — a copy of the
 * built index.html with that page's own title, description, canonical link and
 * social tags, plus a short block of real text inside #root.
 *
 * Vercel serves a matching file from disk before it applies any rewrite rule,
 * so /pricing gets pricing/index.html and everything else still falls back to
 * the app. When React starts, createRoot() clears whatever is inside #root and
 * draws the real page, so the visitor sees no difference.
 *
 * The injected text is a short, accurate summary of what the page actually
 * says. Never put anything here that is not on the real page.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ORIGIN = "https://visanam.net";
const OUT = "dist/public";
const SOURCE = path.join(OUT, "index.html");

/**
 * Every public page. `title` and `description` must match what the page's own
 * <Seo> component sets, so the raw file and the drawn page agree.
 */
const routes = [
  {
    path: "/",
    title: "Stories that help children grow through real life",
    description:
      "Visanam creates beautifully paced story rituals that help children and parents find words for the moments that matter.",
    heading: "Stories that help children grow through real life",
    body: [
      "Visanam makes beautifully illustrated comic episodes for children aged 6 to 12, and a private parent guide that turns each episode into one gentle conversation at home.",
      "You begin with a real moment. The story makes room for it. One question carries it home.",
    ],
  },
  {
    path: "/why-visanam",
    title: "Why Visanam matters for children and parents",
    description:
      "Discover how Visanam uses stories to help families create a shared language for feelings, choices, connection, and small everyday moments.",
    heading: "Not one more thing to teach. A better way to be together.",
    body: [
      "Children rarely want a lesson. They will follow a character anywhere. Visanam puts the difficult feeling inside a story so a child can recognise it without having to explain it first.",
    ],
  },
  {
    path: "/values",
    title: "Values children can practise through story",
    description:
      "Explore the real-life skills Visanam stories help children notice, rehearse, and carry into everyday moments.",
    heading: "Small inner skills. Real life made gentler.",
    body: [
      "Courage, empathy, honesty, patience, resilience and the other everyday skills Visanam episodes are built around. You choose the one your family needs, and the parent guidance follows it.",
    ],
  },
  {
    path: "/oru",
    title: "Enter Oru",
    description: "Step quietly into Oru, the story world where shared conversations begin.",
    heading: "Enter Oru",
    body: [
      "Oru is the world every Visanam episode takes place in — a place discovered slowly, across a season, rather than explained in one go.",
    ],
  },
  {
    path: "/characters",
    title: "Meet the characters",
    description: "Meet Neo, Dev, Tara, Sia, Sprig, and Vorax from the magical world of Visanam.",
    heading: "Story-friends who make real skills feel possible.",
    body: [
      "The recurring cast of Oru. Children come back for the characters; the characters are what make a value feel like something a person does rather than something a grown-up says.",
    ],
  },
  {
    path: "/parents",
    title: "Parent Insight Journey",
    description:
      "Choose a value and receive a gentle, story-led conversation plan to begin with your child tonight.",
    heading: "A little clarity for the big feelings at home.",
    body: [
      "Pick your child's age range, the value you care about, and the everyday moment you keep running into. Visanam returns a short plan: a story doorway, three questions and one small thing to try.",
      "We never ask for your child's name, photograph, date of birth or school.",
    ],
  },
  {
    path: "/pricing",
    title: "Season 1 pricing",
    description:
      "Explore location-aware Visanam Season 1 pricing for six values-based illustrated comic episodes and parent guides.",
    heading: "One story world. A more connected home.",
    body: [
      "Season 1 is a one-time purchase, not a subscription: six illustrated digital episodes, a values-led Parent Insight Plan, episode recap and conversation cards, and printable reflection prompts.",
      "Prices are shown for your region. Season 1 is not yet on sale — you can join the list to hear first.",
    ],
  },
  {
    path: "/schools",
    title: "Schools and NEP SEL partnerships",
    description:
      "Bring Visanam's story-led Social and Emotional Learning experience to your school community.",
    heading: "SEL that children don't have to be told to love.",
    body: [
      "A story-led Social and Emotional Learning experience connecting classroom reflection, home conversation and the values your community cares about, designed around India's National Education Policy.",
      "Tell us about your school and we will share partnership and pilot options.",
    ],
  },
  {
    path: "/events",
    title: "Bespoke event comics",
    description:
      "Turn a wedding, reception, celebration, or corporate milestone into a beautifully illustrated Visanam keepsake comic.",
    heading: "Your greatest day, told like a story.",
    body: [
      "Weddings, receptions and corporate milestones, drawn as a bespoke illustrated keepsake by the Visanam studio. Tell us the shape of the occasion and we will come back with an approach to scope, style and format.",
    ],
  },
  {
    path: "/contact",
    title: "Contact Visanam",
    description:
      "Reach the people behind Visanam — for parents, schools, press and partnerships. We read every message ourselves.",
    heading: "Say hello. We would love to hear from you.",
    body: [
      "For parents and families, schools and educators, and press and partnerships — write to hello@visanam.net, or use the form on the page. There is a real person at the other end and we usually reply within two working days.",
    ],
  },
  {
    path: "/faq",
    title: "Frequently asked questions",
    description:
      "Answers to common questions about Visanam values comics, parent guides, storytelling, and school partnerships.",
    heading: "A little more about Visanam.",
    body: ["Everything you might want to know before entering the world of Oru."],
  },
  {
    path: "/terms",
    title: "Terms of service",
    description: "The terms that apply when you use the Visanam website and buy a Visanam season.",
    heading: "Terms of service",
    body: ["The terms that apply when you use the Visanam website and buy a Visanam season."],
  },
  {
    path: "/privacy",
    title: "Privacy notice",
    description:
      "What Visanam collects, what it never collects, and why. We do not ask for your child's name, photograph, date of birth or school.",
    heading: "Privacy notice",
    body: [
      "We never create an account for your child, and we never ask for your child's name, photograph, date of birth or school. To shape the parent guidance we ask only for an age range.",
    ],
  },
  {
    path: "/refund",
    title: "Refunds",
    description: "How refunds and replacements work for a Visanam season.",
    heading: "Refunds",
    body: ["How refunds and replacements work for a Visanam season."],
  },
];

/** Replace a whole tag matched by `pattern`, or append `replacement` to <head>. */
function upsert(html, pattern, replacement) {
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace("</head>", `    ${replacement}\n  </head>`);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPage(template, route) {
  const fullTitle = `${route.title} | Visanam`;
  const canonical = `${ORIGIN}${route.path === "/" ? "/" : route.path}`;
  const title = escapeHtml(fullTitle);
  const description = escapeHtml(route.description);

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = upsert(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${description}" />`
  );
  html = upsert(html, /<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`);
  html = upsert(
    html,
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${title}" />`
  );
  html = upsert(
    html,
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${description}" />`
  );
  html = upsert(html, /<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);
  html = upsert(
    html,
    /<meta\s+name="twitter:title"[^>]*>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  html = upsert(
    html,
    /<meta\s+name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${description}" />`
  );

  // Real text inside #root. React's createRoot() clears this on start-up, so it
  // is only ever seen by crawlers, link-preview bots and anyone whose
  // JavaScript failed to load.
  const paragraphs = route.body.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  const shell = `<div id="prerender-shell"><h1>${escapeHtml(route.heading)}</h1>${paragraphs}<nav aria-label="Site"><a href="/">Home</a> <a href="/why-visanam">Why Visanam</a> <a href="/values">Values</a> <a href="/oru">Enter Oru</a> <a href="/characters">Characters</a> <a href="/parents">Parent journey</a> <a href="/pricing">Pricing</a> <a href="/schools">Schools</a> <a href="/events">Bespoke comics</a> <a href="/faq">Questions</a></nav></div>`;

  const rootPattern = /<div id="root">\s*<\/div>/;
  if (!rootPattern.test(html)) {
    throw new Error('could not find <div id="root"></div> in the built index.html');
  }
  html = html.replace(rootPattern, `<div id="root">${shell}</div>`);

  return html;
}

async function main() {
  if (!existsSync(SOURCE)) {
    throw new Error(`${SOURCE} not found — run "vite build" before this script`);
  }
  const template = await readFile(SOURCE, "utf8");

  let written = 0;
  for (const route of routes) {
    const html = buildPage(template, route);
    const dir = route.path === "/" ? OUT : path.join(OUT, route.path.replace(/^\//, ""));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), html, "utf8");
    written += 1;
  }

  console.log(`prerender: wrote ${written} pages into ${OUT}`);
  if (written !== routes.length) {
    throw new Error("prerender wrote fewer pages than expected");
  }
}

main().catch((error) => {
  console.error("\nPRERENDER FAILED — the deploy has been stopped on purpose.");
  console.error(error.message);
  process.exit(1);
});
