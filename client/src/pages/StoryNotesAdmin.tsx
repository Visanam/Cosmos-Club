import { Check, Loader2, LogOut, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Seo } from "@/components/Seo";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const noteDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });
const TOKEN_KEY = "visanam-admin-token";

const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
};

/**
 * Moderation workspace.
 *
 * Two ways in, so this works both on an OAuth deployment and on a plain
 * Vercel/self-hosted one:
 *   1. Signed in as an admin user, or
 *   2. A storykeeper token stored on this device (matched against ADMIN_TOKEN
 *      on the server).
 */
export default function StoryNotesAdmin() {
  const { user, loading } = useAuth();
  const [token, setToken] = useState(readToken);
  const [draft, setDraft] = useState("");
  const utils = trpc.useUtils();

  const unlocked = user?.role === "admin" || Boolean(token);

  const queue = trpc.comments.listPending.useQuery(undefined, {
    enabled: unlocked,
    retry: false,
  });

  const review = trpc.comments.review.useMutation({
    onSuccess: (_, variables) => {
      toast.success(variables.status === "approved" ? "Lantern note approved." : "Lantern note declined.");
      void utils.comments.listPending.invalidate();
      void utils.comments.listPublic.invalidate({ page: "season-1" });
    },
    onError: () => toast.error("The note could not be reviewed. Please try again."),
  });

  const saveToken = (event: React.FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    if (!next) return;
    try {
      localStorage.setItem(TOKEN_KEY, next);
    } catch {
      toast.error("This browser will not let us store the token.");
      return;
    }
    setToken(next);
    setDraft("");
    void utils.comments.listPending.invalidate();
  };

  const signOut = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    setToken("");
    void utils.invalidate();
  };

  const rejected = queue.isError;

  return (
    <>
      <Seo title="Story notes review" description="Private Visanam moderation workspace." noIndex />
      <main className="moderation-page">
        <div className="container">
          {loading ? (
            <div className="moderation-empty">
              <Loader2 className="spin" /> Loading your workspace…
            </div>
          ) : !unlocked || rejected ? (
            <section className="moderation-empty reveal-up is-visible">
              <ShieldCheck size={30} />
              <h1>Storykeeper sign-in</h1>
              <p>
                Enter the storykeeper token to review community lantern notes. It is stored on this
                device only, and never leaves it except as a request header.
              </p>
              {rejected && token && (
                <p className="moderation-error">That token was not accepted. Try again.</p>
              )}
              <form className="moderation-token-form" onSubmit={saveToken}>
                <label htmlFor="admin-token">Storykeeper token</label>
                <input
                  id="admin-token"
                  type="password"
                  autoComplete="off"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Paste your ADMIN_TOKEN"
                />
                <button type="submit" className="button button-dark press">
                  Unlock the review table
                </button>
              </form>
            </section>
          ) : (
            <>
              <header className="moderation-heading reveal-up is-visible">
                <p className="section-kicker">
                  <ShieldCheck size={15} /> Private workspace
                </p>
                <h1>
                  Lantern note
                  <br />
                  <em>review table.</em>
                </h1>
                <p>
                  Approve thoughtful, spoiler-free notes to share them on the Season 1 page, or
                  decline anything that does not belong in the community space.
                </p>
                {token && (
                  <button type="button" className="moderation-signout press" onClick={signOut}>
                    <LogOut size={14} /> Forget this device
                  </button>
                )}
              </header>

              <section className="moderation-queue">
                {queue.isLoading ? (
                  <div className="moderation-empty">
                    <Loader2 className="spin" /> Gathering the queue…
                  </div>
                ) : queue.data?.length ? (
                  queue.data.map((note, index) => (
                    <article
                      className="moderation-note reveal-up is-visible"
                      style={{ animationDelay: `${index * 60}ms` }}
                      key={note.id}
                    >
                      <div>
                        <p className="moderation-meta">
                          {note.displayName} · {noteDate.format(new Date(note.createdAt))}
                        </p>
                        <p className="moderation-message">“{note.message}”</p>
                      </div>
                      <div className="moderation-actions">
                        <button
                          type="button"
                          onClick={() => review.mutate({ id: note.id, status: "approved" })}
                          disabled={review.isPending}
                          className="moderation-approve press"
                        >
                          <Check size={16} /> Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => review.mutate({ id: note.id, status: "rejected" })}
                          disabled={review.isPending}
                          className="moderation-reject press"
                        >
                          <X size={16} /> Decline
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="moderation-empty">
                    <ShieldCheck size={28} />
                    <h2>The lantern table is clear.</h2>
                    <p>New reader notes will appear here for review.</p>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
