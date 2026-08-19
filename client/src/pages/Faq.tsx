import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";

const questions = [
  ["What is Visanam?", "Visanam is a story-led values-comic experience for children, paired with a personal parent wraparound that helps families talk about the themes that matter at home."],
  ["What age is Season 1 designed for?", "Season 1 is created for children aged 6–12. The Parent Insight Journey adapts its prompts for 6–7, 8–9, and 10–12 year-old readers."],
  ["Does each child receive a different comic?", "The core illustrated comic is the same shared world for every child. The personal layer lives in the parent experience: the value focus, conversation questions, recap framing, and reflection prompts."],
  ["Which values can I focus on?", "You can begin with courage, empathy, discipline, anger management, time management, kindness, honesty, or resilience. More than one value can grow through a season."],
  ["Will the full story be publicly available?", "No. Public pages offer a spoiler-safe glimpse only. The full arc, episodes, and parent material are protected for families who purchase Season 1."],
  ["Can schools work with Visanam?", "Yes. We offer a story-led partnership approach for schools seeking engaging Social and Emotional Learning experiences, including support for family connection."],
];
const faqSchema = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:questions.map(([name, text]) => ({ "@type":"Question", name, acceptedAnswer:{ "@type":"Answer", text } })) };

export default function Faq() { return <><Seo title="Frequently asked questions" description="Answers to common questions about Visanam values comics, parent guides, storytelling, and school partnerships." schema={faqSchema} /><section className="faq-page container"><p className="section-kicker">Questions, answered gently</p><h1>A little more<br /><em>about Visanam.</em></h1><p className="page-lede">Everything you might want to know before entering the world of Oru.</p><Accordion type="single" collapsible className="faq-list">{questions.map(([question, answer], index) => <AccordionItem value={`q${index}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></section></>; }
