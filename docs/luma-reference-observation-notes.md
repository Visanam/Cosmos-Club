# Luma Comics v003 Reference — Observation Notes

## Source reviewed

The supplied archive was inspected as data only, without running its application code. The relevant reference files are `components/Experience.tsx`, `app/v003.css`, and `docs/design-research-v003.md` under `/home/ubuntu/reference-luma-v003/outputs/luma-comics-v003/`.

## Observed experience structure

The reference is organised around a clear parent conversion arc: **emotional promise → recognition of a family problem → cinematic explanation → child/parent value proposition → low-risk personalization preview → product structure → trust → purchase or early-access action**. Its header uses five descriptive destinations and a single starting-point call to action.

| Reference pattern | How it is implemented in the supplied source | Original relevance for Visanam |
| --- | --- | --- |
| Parent-first promise | The hero pairs a child-facing comic proposition with explicit parent-facing conversation support. | Strengthen Visanam’s first screen with a compact dual-audience cue, without changing the current story-world tone. |
| Problem recognition | A four-part grid names time, language, context, and continuity before the product explanation. | Use a shorter three-part reassurance band after the Home film rather than increasing hero copy. |
| Scroll-led evidence | Five full-bleed scenes transition through a sticky, progress-tracked journey from parent need to product outcome. | Visanam already has a day-to-night rhythm; add only an unobtrusive chapter-progress indicator and sharper parent-benefit captions. |
| Two-reader model | Side-by-side cards separate the child adventure from the parent companion. | Explain the existing child wonder / parent ritual distinction once, visibly, instead of distributing it across multiple pages. |
| Interactive preview | A controlled nickname-and-value demo previews a parent companion and clearly states data is not retained. | Consider a non-diagnostic, privacy-safe example of a Visanam family prompt after the Parent Journey—not a score or recommendation engine. |
| Specific trust layer | Privacy restraint, no deficit framing, story craft, and claim transparency appear as four concrete commitments. | Add the planned Why Visanam trust strip with practical, verifiable commitments rather than broad assurances. |
| Conversion proof | Product structure, price, FAQ, and early-access form follow the meaning-making content. | Keep Visanam’s checkout separate, but add a short `what arrives` timeline before payment to reduce uncertainty. |
| Interaction discipline | Scroll motion, progress, FAQ disclosure, modal questionnaire, keyboard close handling, skip link, and reduced-motion support are implemented. | Preserve Visanam’s reduced-motion safeguards; any new interaction should be optional, short, and clearly non-clinical. |

## Distinctions to preserve

The reference relies strongly on traditional product packaging, six-episode structure, a “Story Compass” modal, and direct family-data prompts. Visanam should not reproduce its exact copy, narrative structure, visual motifs, names, or interaction patterns. The transferable lesson is its **clarity of parent benefit and specificity of trust**, which can fit Visanam’s more atmospheric, video-led Oru world.

## Visual-frame observations

The supplied reference frames use cinematic, high-saturation illustration with a framed forest entry at daylight and an elevated village panorama at twilight. Each frame has a distinct composition, strong foreground-to-horizon depth, and a clear central path or sky event. The sequence benefits from dramatic contrast, but it uses the exact same illustrated story world across the entire product narrative.

For Visanam, the more fitting adaptation is **structural rather than aesthetic**: retain the existing softer Oru palette and original atmosphere-led graphics, then use distinct managed scenery only at intentional cinematic transition points. Do not replace Visanam’s current Oru video or CSS-built atmospheric language with a repeated image carousel.
