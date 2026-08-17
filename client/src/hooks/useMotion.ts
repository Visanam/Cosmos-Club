import { useEffect } from "react";

/**
 * Motion behaviours that apply site-wide without editing every page.
 *
 * Design rules followed here:
 *  - Nothing is ever left invisible. Elements already inside the viewport are
 *    revealed immediately, and a hard timeout reveals anything still hidden.
 *  - All work is idempotent, so re-running on each route change is safe.
 *  - Everything no-ops under prefers-reduced-motion.
 */

const prefersReduced = () => {
  // jsdom (used by the test runner) implements neither matchMedia nor
  // IntersectionObserver, so every guard here has to be defensive.
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/** Elements that get a scroll reveal. Deliberately structural, not decorative. */
const REVEAL_SELECTORS = [
  "main section > h1",
  "main section > h2",
  "main section > p",
  "main section > .container > h1",
  "main section > .container > h2",
  "main section > .container > p",
  "main article",
  ".section-kicker",
  ".character-card",
  ".shelf-card",
  ".ritual-step",
  ".atmosphere-chapter",
  ".moderation-note",
  "[class*='-card']",
  "[class*='-panel']",
  "[class*='-tile']",
].join(", ");

/** Variant chosen by element type, so the page doesn't move in one direction only. */
function variantFor(el: Element): string {
  const tag = el.tagName.toLowerCase();
  if (tag === "h1" || tag === "h2") return "blur";
  if (el.classList.contains("section-kicker")) return "fade";
  if (
    el.classList.contains("character-card") ||
    el.classList.contains("shelf-card") ||
    el.className.toString().includes("-card")
  ) {
    return "scale";
  }
  return "up";
}

export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReduced() || !("IntersectionObserver" in window)) return;

    let cleanup: (() => void) | undefined;

    // Let the new route paint before measuring.
    const raf = requestAnimationFrame(() => {
      const viewportH = window.innerHeight;

      // IMPORTANT: only animate what the visitor has not seen yet.
      //
      // Tagging an element that is already on screen would transition it from
      // opacity 1 down to 0 and back — a visible wash-out on every page load.
      // Anything above the fold is therefore left completely alone; only
      // off-screen elements get hidden, where hiding them costs nothing.
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS)
      ).filter(
        (el) =>
          !el.dataset.reveal &&
          el.getBoundingClientRect().top > viewportH * 0.92
      );

      if (!nodes.length) return;

      const groups = new Map<Element, number>();

      for (const el of nodes) {
        // `reveal-armed` suppresses transitions so the initial hide is instant
        // rather than animated. Removed again a frame later, below.
        el.classList.add("reveal-armed");
        el.dataset.reveal = variantFor(el);

        // Stagger siblings that share a parent.
        const parent = el.parentElement ?? document.body;
        const index = groups.get(parent) ?? 0;
        groups.set(parent, index + 1);
        el.style.setProperty("--m-delay", `${Math.min(index, 6) * 70}ms`);
      }

      // One forced reflow for the whole batch, then re-enable transitions.
      void document.body.offsetHeight;
      nodes.forEach((el) => el.classList.remove("reveal-armed"));

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );

      nodes.forEach((el) => io.observe(el));

      // Safety net: never leave content hidden, whatever happens.
      const failsafe = window.setTimeout(() => {
        nodes.forEach((el) => el.classList.add("is-visible"));
        io.disconnect();
      }, 4000);

      cleanup = () => {
        window.clearTimeout(failsafe);
        io.disconnect();
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, [routeKey]);
}

/** Adds `.is-scrolled` to the header once the page moves off the top. */
export function useHeaderScroll() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 14);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/**
 * Slow ambient drift on the first hero image of a page.
 *
 * Note: this deliberately does NOT also apply scroll parallax to the same
 * element. Both would be writing `transform`, and a CSS animation always beats
 * a plain declaration, so the parallax would silently do nothing. One effect,
 * one element, no fight.
 */
export function useHeroMotion(routeKey: string) {
  useEffect(() => {
    if (typeof window === "undefined" || prefersReduced()) return;

    const hero = document.querySelector<HTMLElement>(
      "[class*='hero'] img, .oru-video-hero img, .page-hero img"
    );
    if (!hero) return;

    hero.classList.add("kenburns");
    return () => hero.classList.remove("kenburns");
  }, [routeKey]);
}

/** Fades images in as they decode rather than letting them pop. */
export function useImageFade(routeKey: string) {
  useEffect(() => {
    if (typeof window === "undefined" || prefersReduced()) return;

    const raf = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLImageElement>("main img").forEach((img) => {
        if (img.dataset.fade) return;
        img.dataset.fade = "true";
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add("is-loaded");
        } else {
          const reveal = () => img.classList.add("is-loaded");
          img.addEventListener("load", reveal, { once: true });
          img.addEventListener("error", reveal, { once: true });
        }
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [routeKey]);
}

/** Scrolls to the top on route change, respecting reduced motion. */
export function useScrollToTop(routeKey: string) {
  useEffect(() => {
    if (typeof window.scrollTo !== "function") return;
    try {
      window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [routeKey]);
}
