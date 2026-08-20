import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * VISANAM-AMBIENT-VIDEO-V1
 *
 * The looping background film on the home page and the Oru page.
 *
 * WHY THIS EXISTS
 * Both videos used the browser's `autoplay` attribute, which starts them the
 * moment the page opens and never stops. Accessibility rules (WCAG success
 * criterion 2.2.2, "Pause, Stop, Hide") say that anything that moves on its
 * own for more than five seconds, alongside other content, must have a way to
 * stop it. Neither did. That is a Level A failure — the strictest level — and
 * it is the sort of thing a school or a government buyer checks for.
 *
 * There was a second, quieter problem. Both pages hid the video with CSS when
 * a visitor had asked their phone or laptop for reduced motion. Hiding it does
 * not stop it: the browser still downloads and decodes the whole film, burning
 * mobile data for exactly the people who asked for less.
 *
 * WHAT IT DOES NOW
 * No `autoplay` attribute. Playback is started by script only when the visitor
 * has not asked for reduced motion, and stops immediately if they change that
 * setting while the page is open. There is a visible, keyboard-reachable
 * pause button. The poster still image is always there, so the page never
 * looks broken.
 */

type Props = {
  className: string;
  src: string;
  poster: string;
  /** Plain-language label for the pause control, e.g. "background film". */
  label: string;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function AmbientVideo({ className, src, poster, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION);
    const video = videoRef.current;

    const apply = (wantsLessMotion: boolean) => {
      setReduced(wantsLessMotion);
      if (!video) return;
      if (wantsLessMotion) {
        video.pause();
        setPlaying(false);
        return;
      }
      video
        .play()
        .then(() => setPlaying(true))
        // Some browsers refuse to start a video on their own. That is fine —
        // the poster stays and the button offers to start it.
        .catch(() => setPlaying(false));
    };

    apply(media.matches);

    const onChange = (event: MediaQueryListEvent) => apply(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={reduced ? "none" : "metadata"}
        aria-hidden="true"
        tabIndex={-1}
      />
      {!reduced && (
        <button type="button" className="ambient-video-toggle" onClick={toggle}>
          {playing ? <Pause size={13} /> : <Play size={13} />}
          <span>{playing ? `Pause ${label}` : `Play ${label}`}</span>
        </button>
      )}
    </>
  );
}
