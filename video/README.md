# Syntropy for AI: launch film

A 3 minute launch and how-to film (186 s, 1920 x 1080, 30 fps). No music, no voice: Arabic captions on screen, interface sound effects, and English plus Arabic subtitle files.

The film is one canvas page, `film.html`, drawn frame by frame. `window.__seek(t)` draws time `t` deterministically, so any frame can be rendered on its own and every render is identical.

## Files

| File | What it does |
|---|---|
| `film.html` | The film: nine scenes, captions (`window.__captions`) and the sound-event timeline (`window.__events`) |
| `core.js` | Drawing primitives and the Syntropy token palette (from `knowledge/tokens/resolved.json`) |
| `render.mjs` | Headless Chrome renderer: contact sheet, single frames, audio and subtitles, full render |
| `sfx.mjs` | Synthesises the sound effects (keys, clicks, pops, ticks, whooshes, chime) into one WAV |
| `preview/` | Contact sheet of the film |
| `out/` | Final `syntropy-launch.mp4`, `.ar.srt`, `.en.srt` (gitignored, uploaded separately) |

The component images in scene 6 are read live from `../knowledge/examples/components/` (AppBar, CardDeal, Stat, Payouts cell, Button). The lint output in scene 7 is the real output of `node lint/cli.mjs` on a sample file with a raw color, `margin-left`, raw spacing and an em dash.

## Requirements

- Node 20+, Google Chrome at `/Applications/Google Chrome.app` (or set `CHROME`)
- ffmpeg at `/opt/homebrew/bin/ffmpeg` (or set `FFMPEG`)
- IBM Plex Sans Arabic installed as a system font

```
cd video
npm install
```

## Render

```
node render.mjs film.html --grid 36            # contact sheet -> preview/contact-sheet-36.png
node render.mjs film.html --only 64 --check    # one frame -> preview/frame-64.00.png, checks determinism
node render.mjs film.html --audio              # sound effects + subtitles only
node render.mjs film.html                      # full render -> out/syntropy-launch.mp4
```

Frames are written to `FRAMES_DIR` (defaults to a scratch folder outside the repo), never into the repo. A full render takes about 15 to 20 minutes.

## Editing

- Scene timings, captions and sound events live together in each `scene(...)` block of `film.html`, so moving an animation moves its sound and its subtitle with it.
- Captions use `L('...')` to isolate Latin text inside Arabic lines so punctuation stays in place.
- Sound levels are set per type in `LEVEL` in `sfx.mjs`; the mix is normalised to a -6 dBFS peak.
- Never type the em dash character anywhere in this folder: the film shows it only as a marked `U+2014` box.
