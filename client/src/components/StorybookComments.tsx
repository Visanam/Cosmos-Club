import React, { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, MessageCircleHeart, Send, Sprout } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Reveal } from "@/components/Reveal";

const noteDate = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" });

export function StorybookComments() {
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const utils = trpc.useUtils();
  const notes = trpc.comments.listPublic.useQuery({ page: "season-1" });
  const submit = trpc.comments.submit.useMutation({
    onSuccess: () => {
      setDisplayName("");
      setMessage("");
      setSubmitted(true);
      toast.success("Your lantern note is with our storykeepers for review.");
      void utils.comments.listPublic.invalidate({ page: "season-1" });
    },
    onError: () => toast.error("Please add a name and a slightly longer note, then try again."),
  });
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit.mutate({ page: "season-1", displayName, message });
  };

  return <section className="story-notes"><div className="container"><Reveal><div className="notes-heading"><div><p className="section-kicker"><MessageCircleHeart size={15}/> After the page turns</p><h2>Leave a lantern note<br /><em>for the storykeepers.</em></h2></div><p>A calm place for grown-ups and young readers to share a thought, a question, or a value they want to keep talking about. Every note is reviewed before it appears.</p></div></Reveal><div className="notes-grid"><Reveal><form className="lantern-form" onSubmit={onSubmit}><label>First name or nickname only<input value={displayName} onChange={(event) => { setDisplayName(event.target.value); setSubmitted(false); }} maxLength={80} placeholder="For example: Aanya’s mum" required /></label><label>What did this glimpse make you want to talk about?<textarea value={message} onChange={(event) => { setMessage(event.target.value); setSubmitted(false); }} maxLength={600} placeholder="Please keep it kind and spoiler-free…" required /></label><p className="note-safety"><Sprout size={15}/> Please do not share children’s full names, contact details, or story spoilers.</p><button type="submit" className="button button-dark lantern-submit" disabled={submit.isPending}>{submit.isPending ? <><LoaderCircle className="lantern-loader" size={16}/> Sending your lantern…</> : <>Send lantern note <Send size={16}/></>}</button><div className="lantern-feedback" aria-live="polite">{submitted && <p className="lantern-success"><CheckCircle2 size={18}/> Your lantern is glowing with the storykeepers. We’ll review it before it joins the wall.</p>}{submit.isError && <p className="lantern-error">Your note has not been sent yet. Please check both fields and try again.</p>}</div></form></Reveal><Reveal delay={0.08}><aside className="note-wall" aria-live="polite"><div className="note-wall-head"><span>Community notes</span><small>Reviewed voices only</small></div>{notes.isLoading ? <p className="note-empty">Gathering the lantern notes…</p> : notes.data?.length ? <div className="note-list">{notes.data.map((note) => <article className="reader-note" key={note.id}><p>“{note.message}”</p><footer><strong>{note.displayName}</strong><time dateTime={new Date(note.createdAt).toISOString()}>{noteDate.format(new Date(note.createdAt))}</time></footer></article>)}</div> : <div className="note-empty"><Sprout size={22}/><p>No lantern notes are glowing here yet.</p><span>Be the first to begin a gentle, spoiler-free conversation.</span></div>}</aside></Reveal></div></div></section>;
}
