# Video assets

Two pages reference a background video. Both are **optional** — each `<video>`
has a `poster` pointing at the matching still artwork, so if the file is missing
the page shows a painted frame rather than a black box.

Drop the files here with exactly these names to switch the motion on:

| File | Used by | Subject |
|---|---|---|
| `visanam-story-passage.mp4` | `/` (home) | A gentle sunrise-to-night passage through Oru |
| `oru-lantern-walk.mp4` | `/oru` | A blue-hour walk through the lantern-lit village |

These were served from Manus storage in the previous build and were not included
in the exported archive, so they need to be re-added from your originals.

**Encoding guidance** — these are decorative loops behind text, so favour small
files over sharpness:

```bash
ffmpeg -i source.mov -vf "scale=1600:-2" -an \
  -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p \
  -movflags +faststart visanam-story-passage.mp4
```

Keep each under about 3 MB. Strip the audio track (`-an`) — both play muted, and
the audio is dead weight.
