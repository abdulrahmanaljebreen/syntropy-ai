# Writing conventions for this repo

Everything in `knowledge/` and `skills/` is read by AI agents first and people second. Write for both.

## Hard rules
- Never use the em dash character (U+2014). Use a comma, a colon, a full stop or parentheses.
- Brand green is `#4daa57` (`Color/Primary/LightGreen/500`, used through `bg/brand/primary`). Other greens seen in old documents (`#02AD4C`, `#0E849E`) are wrong.
- Name tokens exactly as in Figma: `bg/brand/primary`, `text/muted`, `space/lg`, `radius/default`. Values live in `knowledge/tokens/resolved.json`; never restate a hex value unless you are explaining it.
- Name components exactly as in `knowledge/components/index.json` (`Button`, `CardDeal`, `BottomSheet`). Variant names and values verbatim (`Variant=primary`, `Size=md`).
- Arabic examples are written in Arabic script, with Western digits (0-9). Currency always after the amount: `1,250.00 ر.س` and `1,250.00 SAR` (see `knowledge/content/numbers-currency.md`).
- Only design system pages exist for agents: the pages listed in `knowledge/components/index.json`. Never reference, link or describe work-in-progress areas of the Figma file.
- Cite sources at the end of a file under `## Sources` (Notion page id, Figma node id, or URL).

## Shape of a knowledge file
```
# Title

One or two sentences: what this covers and when an agent needs it.

## Rules
Numbered, testable rules. Each: the rule, then "Why:" in one line.

## Examples
Do / Don't pairs, Arabic first when copy is involved.

## Sources
```

Keep files focused: one topic per file, under about 400 lines. Prefer tables and lists over prose. No filler, no marketing tone.

## Who writes where
Parallel contributors write only in the paths they were given and never run `git commit`. The coordinator commits.
