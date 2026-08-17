import { ArrowLeft, Printer } from "lucide-react";
import { Link, useRoute } from "wouter";
import { characters } from "@/lib/visanam";
import { Seo } from "@/components/Seo";

export default function KeepsakePreview() {
  const [, params] = useRoute("/keepsake/:characterId");
  const character = characters.find((item) => item.id === params?.characterId);
  if (!character) return <main className="keepsake-preview"><div className="keepsake-preview-empty"><p className="section-kicker">Field note unavailable</p><h1>That keepsake is not in our story shelf.</h1><Link href="/characters" className="button button-dark">Return to the characters</Link></div></main>;
  return <main className="keepsake-preview" data-testid="keepsake-preview"><Seo title={`${character.name} keepsake card`} description={`A printable Visanam field note for ${character.name}.`} /><div className="keepsake-preview-actions"><Link href="/characters" className="keepsake-back"><ArrowLeft size={16} /> Back to characters</Link><button type="button" className="button button-dark" onClick={() => window.print()}><Printer size={16} /> Print / Save as PDF</button></div><article className="printable-keepsake-frame"><p>Visanam · field note</p><img src={character.image} alt={`${character.name}, ${character.role}`} /><span>{character.eyebrow}</span><h1>{character.name}</h1><blockquote>“{character.keepsakeCue}”</blockquote><p>{character.summary}</p><small>{character.role}</small><footer>A printable keepsake from the Visanam story shelf</footer></article></main>;
}
