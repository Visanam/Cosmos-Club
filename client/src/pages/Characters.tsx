import { ArrowDownToLine, ArrowRight, Heart, Printer, Sparkles, X } from "lucide-react";
import { Link } from "wouter";
import React, { useEffect, useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { characters } from "@/lib/visanam";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { readFavoriteIds, toggleFavoriteId, writeFavoriteIds } from "@/lib/favorites";
import { toast } from "sonner";

type Character = (typeof characters)[number];
type ShelfFilter = "all" | "feelings" | "courage" | "curiosity";
type ShelfSort = "saved" | "name" | "role";

const shelfFilters: Array<{ value: ShelfFilter; label: string }> = [
  { value: "all", label: "All saved friends" },
  { value: "feelings", label: "Big feelings" },
  { value: "courage", label: "Brave steps" },
  { value: "curiosity", label: "Curious minds" },
];

function keepsakeDocument(character: Character) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${character.name} — Visanam keepsake</title><style>body{margin:0;background:#fff8eb;color:#143f42;font-family:Arial,sans-serif}.card{width:720px;min-height:1000px;margin:28px auto;padding:32px;box-sizing:border-box;background:linear-gradient(145deg,#f7e6b6,#e7f1df);border:14px solid #143f42}.crest{letter-spacing:.18em;font-size:12px;font-weight:bold}.art{width:100%;height:480px;object-fit:cover;object-position:top;margin:24px 0 28px}.eyebrow{color:#8b6540;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:.1em}.name{font-family:Georgia,serif;font-size:76px;line-height:1;margin:12px 0}.cue{font-family:Georgia,serif;font-size:31px;line-height:1.25;margin:24px 0}.role{font-size:16px;color:#486863;margin-top:28px}.foot{margin-top:70px;border-top:1px solid #8fa39a;padding-top:18px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}</style></head><body><main class="card"><div class="crest">VISANAM · FIELD NOTE</div><img class="art" src="${character.image}" alt="${character.name}"><div class="eyebrow">${character.eyebrow}</div><h1 class="name">${character.name}</h1><p class="cue">“${character.keepsakeCue}”</p><p>${character.summary}</p><p class="role">${character.role}</p><div class="foot">A printable keepsake from the Visanam story shelf</div></main></body></html>`;
}

export default function Characters() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [selected, setSelected] = useState<Character | null>(null);
  const [activeSummary, setActiveSummary] = useState<string | null>(null);
  const [shelfFilter, setShelfFilter] = useState<ShelfFilter>("all");
  const [shelfSort, setShelfSort] = useState<ShelfSort>("saved");
  useEffect(() => { setFavorites(readFavoriteIds()); setIsReady(true); }, []);
  const savedCharacters = useMemo(() => favorites.map((id) => characters.find((character) => character.id === id)).filter((character): character is Character => Boolean(character)), [favorites]);
  const displayedSavedCharacters = useMemo(() => {
    const filtered = shelfFilter === "all" ? savedCharacters : savedCharacters.filter((character) => character.shelfGroup === shelfFilter);
    return [...filtered].sort((a, b) => shelfSort === "name" ? a.name.localeCompare(b.name) : shelfSort === "role" ? a.role.localeCompare(b.role) : savedCharacters.indexOf(a) - savedCharacters.indexOf(b));
  }, [savedCharacters, shelfFilter, shelfSort]);
  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = toggleFavoriteId(current, id);
      writeFavoriteIds(next);
      return next;
    });
  };
  const downloadKeepsake = (character: Character) => {
    const url = URL.createObjectURL(new Blob([keepsakeDocument(character)], { type: "text/html" }));
    const download = document.createElement("a");
    download.href = url;
    download.download = `visanam-${character.id}-keepsake.html`;
    download.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 200);
    toast.success(`${character.name}'s printable keepsake is ready to save.`);
  };
  const openKeepsakePreview = (character: Character) => window.open(`/keepsake/${character.id}`, "_blank", "noopener,noreferrer");
  return <><Seo title="Meet the characters" description="Meet Neo, Dev, Tara, Sia, Sprig, and Vorax from the magical world of Visanam." />
    <section className="page-hero characters-hero"><div className="container"><Reveal><p className="section-kicker">The keepers of Oru</p><h1>Story-friends who make<br /><em>real skills feel possible.</em></h1><p className="page-lede">Each character gives children a memorable way to recognise a feeling, rehearse a choice, or find their way back to connection.</p></Reveal></div></section>
    {isReady && savedCharacters.length > 0 && <section className="character-shelf container" aria-label="Your saved character profiles"><div className="shelf-heading"><p className="section-kicker">Your story shelf</p><h2>Kept close for later</h2><p>Organise the friends saved on this device, then print a field-note keepsake to carry their reminder with you.</p></div><div className="shelf-controls"><label>Show<select aria-label="Filter your saved character shelf" value={shelfFilter} onChange={(event) => setShelfFilter(event.target.value as ShelfFilter)}>{shelfFilters.map((filter) => <option value={filter.value} key={filter.value}>{filter.label}</option>)}</select></label><label>Arrange by<select aria-label="Sort your saved character shelf" value={shelfSort} onChange={(event) => setShelfSort(event.target.value as ShelfSort)}><option value="saved">Saved order</option><option value="name">Name A–Z</option><option value="role">Role</option></select></label></div><div className="keepsake-grid">{displayedSavedCharacters.length ? displayedSavedCharacters.map((character) => <article className="shelf-card" data-testid={`shelf-card-${character.id}`} key={character.id}><img src={character.image} alt="" /><div><p>{character.eyebrow}</p><h3>{character.name}</h3><span>{character.role}</span></div><div className="shelf-card-actions"><button type="button" onClick={() => setSelected(character)}>Open profile</button><button type="button" onClick={() => downloadKeepsake(character)}><ArrowDownToLine size={15}/> Download</button><button type="button" onClick={() => openKeepsakePreview(character)}><Printer size={15}/> Print / PDF</button></div></article>) : <p className="shelf-empty">No saved friends match this view. Try another filter.</p>}</div></section>}
    <section className="character-gallery container">{characters.map((character, index) => <Reveal key={character.name} delay={index % 2 ? 0.08 : 0}><article data-testid={`character-card-${character.id}`} data-summary-visible={activeSummary === character.id} className={`character-card ${index === 5 ? "character-card-dark" : ""}`}><button type="button" className="character-open" onClick={() => setSelected(character)} onMouseEnter={() => setActiveSummary(character.id)} onMouseLeave={() => setActiveSummary(null)} onFocus={() => setActiveSummary(character.id)} onBlur={() => setActiveSummary(null)} aria-expanded={activeSummary === character.id} aria-label={`Open ${character.name}'s profile`}><div className="character-image"><img src={character.image} alt={`${character.name}, ${character.role}`} /><div className="character-hover-summary"><p>When you meet {character.name}</p><strong>{character.summary}</strong><span>Open field note <ArrowRight size={15}/></span></div></div><div className="character-content"><p className="character-eyebrow"><Sparkles size={13}/>{character.eyebrow}</p><h2>{character.name}</h2><p className="character-growth-label">Growth focus · {character.growthFocus}</p><p className="character-growth-copy"><b>Children practise:</b> {character.childPractice}</p><p className="character-growth-moment"><b>Helpful when:</b> {character.parentMoment}</p><span>{character.role}</span></div></button><button type="button" className={favorites.includes(character.id) ? "character-favorite is-saved" : "character-favorite"} onClick={() => toggleFavorite(character.id)} aria-pressed={favorites.includes(character.id)} aria-label={`${favorites.includes(character.id) ? "Remove" : "Save"} ${character.name} from your story shelf`}><Heart size={17} fill={favorites.includes(character.id) ? "currentColor" : "none"}/><span>{favorites.includes(character.id) ? "Saved" : "Save"}</span></button></article></Reveal>)}</section>
    <section className="character-cta"><div className="container"><Reveal><p>Every character gives your child a safe way to see a familiar moment, name a skill, and imagine a next step.</p><Link href="/parents" className="button button-light">Find their real-life starting point <ArrowRight size={17}/></Link></Reveal></div></section>
  <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}><DialogContent className="character-dialog" showCloseButton={false}>{selected && <div className="character-dialog-grid"><div className="character-dialog-art"><img src={selected.image} alt={`${selected.name}, ${selected.role}`} /></div><div className="character-dialog-copy"><button type="button" className="dialog-close" onClick={() => setSelected(null)} aria-label="Close character profile"><X size={18}/></button><p className="section-kicker">Field note · {selected.eyebrow}</p><DialogTitle>{selected.name}</DialogTitle><DialogDescription>{selected.description}</DialogDescription><div className="character-dialog-growth"><p>Growth focus · {selected.growthFocus}</p><strong>Children practise: {selected.childPractice}</strong><span>Helpful when: {selected.parentMoment}</span></div><p className="character-dialog-summary">{selected.summary}</p><p className="character-dialog-role">{selected.role}</p><div className="dialog-actions"><button type="button" className={favorites.includes(selected.id) ? "button button-dark" : "button button-outline"} onClick={() => toggleFavorite(selected.id)}><Heart size={16} fill={favorites.includes(selected.id) ? "currentColor" : "none"}/>{favorites.includes(selected.id) ? "Saved to your shelf" : "Save to your shelf"}</button><button type="button" className="button button-soft" onClick={() => downloadKeepsake(selected)}><ArrowDownToLine size={16}/> Download keepsake</button></div></div></div>}</DialogContent></Dialog>
  </>;
}
