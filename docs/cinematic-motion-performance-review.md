# Cinematic Home Motion Performance Review

**Scope.** This review covers the sunrise-to-night motion system on the home page: scenery parallax, hero depth layers, constellation entrances, lantern and star accents, interaction feedback, and the scroll-progress cue.

| Review area | Verified result | Implementation evidence |
|---|---|---|
| Scroll-linked scene movement | Scenery and hero copy use transform-backed `y` motion; the sunrise wash uses opacity. | `useTransform` bindings in `Home.tsx` |
| Ambient animation | Mist, orbit, cue, lantern, and star keyframes change only `transform` and/or `opacity`. | `cinematic-home.css` keyframes |
| Entrance choreography | Ritual and constellation entrances use `translateY` and `opacity`. | `cinematic-rise` keyframe |
| Interaction feedback | Card hover moves via transform. Background and shadow changes are intentionally short, limited to occasional pointer interaction rather than scroll. | `.constellation-card` transition rules |
| Reduced motion | The scroll indicator is removed; animation and transition durations are effectively disabled; parallax style values are reset. | `prefers-reduced-motion` rules and `useReducedMotion` branches |
| Responsive review | Full-page desktop and mobile inspections preserved readable hierarchy, touch spacing, and non-overlapping scene layers. | Visual review captured during this release |

The motion system therefore limits continuous scroll choreography to compositor-friendly transforms and opacity wherever practical. Decorative movement is intentionally low-frequency, while interactive feedback is immediate and short. The production build, type check, and automated test suite passed after the review.
