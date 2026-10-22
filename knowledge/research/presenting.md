# Presenting references

How to show research to the person so they can judge it fast, and how to save or share it. Use this at the end of every research task.

## Rules

1. Show the image, not only a description. Use the tool's own image (Mobbin inline preview, `refero_get_screen_image`, Lazyweb `image_url`).
   Why: the person decides from what they see; descriptions are machine-written.
2. Every reference has five parts: image, app and platform, link, why it matters (one line), Syntropy mapping.
   Why: these are the facts needed to accept or reject it.
3. Group references by pattern, 2 to 4 patterns, with a one-line verdict per pattern.
   Why: the decision is between patterns, not between screenshots.
4. End with a recommendation and the gaps (elements with no Syntropy component).
   Why: research exists to make a decision.
5. Link to the canonical source page (`mobbin_url`, `ReferoURL`, Lazyweb `url`). Never paste raw image CDN URLs as the citation; some expire (Mobbin `image_url` after 30 days).
   Why: links must keep working.
6. Never print private links: Lazyweb `open_url`, signed handoffs, tokens.
   Why: they are single-use and tied to the person's account.
7. Keep text minimal and in the person's language. Safqah teams write Arabic and English mixed; follow their lead.
   Why: the minimal-copy rule applies to research too.
8. If a tool failed or a source was unavailable, say so in one line and name the fallback used.
   Why: the person must know what the evidence does not cover.

## Format for one reference

```markdown
### Acorns · iOS · invest review sheet
![Acorns invest review](<preview image>)
[Open on Refero](https://refero.design/screens/e93df1d8-5791-47c5-91ec-b3d65ca6747c) · found with Refero, 2026-10-15
Why it matters: review details sit in a sheet over the amount, so the user never loses the number they typed.
Syntropy: `BottomSheet` + `Sheet Content / Summary` + `KeyValue` + `Button` `Variant=primary` `Size=lg`
```

## Format for the whole research summary

```markdown
## Question
How do investing apps confirm a purchase before money moves?

## Pattern A: review sheet over amount entry (Acorns, Revolut)
Verdict: best fit, keeps context, maps fully to Syntropy.
<references, format above>

## Pattern B: full review screen with Change links (Wise)
Verdict: good for long summaries; use if we add fees and payment method.
<references>

## Recommendation
Pattern A, with Wise-style «تعديل» links inside the sheet.

## Gaps
None. (or: "Camera frame overlay: no Syntropy component, proposed to DS team.")

## Sources
Refero screens e93df1d8..., 2ffb15d4..., e442af68... · Mobbin flows c5c946f8..., 5eea58ab... · checked 2026-10-15
```

## Where to present

| Situation | Format |
|---|---|
| Quick answer in chat | 3 to 6 references inline with the format above |
| Design review with the team | A published page (HTML artifact or Notion page) with images, patterns and recommendation |
| Figma work | Place downloaded high-res images on a clearly named references frame outside the system pages, labeled with app and link; never on design system pages |
| Linear ticket | A `## Design` section with images embedded and links, following the team's handover style |
| Long-lived evidence | Lazyweb Agentic Search page (below) or a Notion research page |

## Saving and sharing per tool

| Tool | How to save or share |
|---|---|
| Lazyweb | Carry one `agentic_search_id` across `lazyweb_search_screens`, `lazyweb_search_flows`, `lazyweb_search_experiments`. Pick the `result_ref`s you cite and call `lazyweb_agentic_search_finalize`. It returns a clean private `url` (give this to the person) and a single-use `open_url` (open once in their browser, never print). Public sharing is done by the person with the page's Share button |
| Mobbin | Cite `mobbin_url`. To embed in Figma, Notion or slides, download from `image_url` (expires in 30 days). Save to a Mobbin collection only when the person asks (`output_destination: "reference_library"`). Show any `ai_usage_notice` text word for word |
| Refero | Cite `ReferoURL` for screens, flows and apps. For images, `refero_get_screen_image` with `image_size: "full"` |
| Figma (Syntropy) | Cite the component name and node ID from `knowledge/components/index.json`; show `knowledge/examples/components/<page>/*.png` |
| Browser sources | Cite the URL and the date read; quote the finding, do not screenshot paywalled content |

## Examples

Do:
- "Pattern A (3 apps): review sheet over amount. Maps fully to `BottomSheet` + `KeyValue`. Recommended." with images and links.
- "Lazyweb was rate-limited today; I used Mobbin and Refero instead."

Don't:
- A wall of 20 screenshots with no grouping or verdict.
- "Revolut does it like this" with no link and no image.
- Pasting a Lazyweb `open_url` into chat.

## Sources
- Mobbin MCP result rules (`mobbin_url`, `image_url` expiry, `ai_usage_notice`), 2026-10-15
- Lazyweb MCP server instructions (Agentic Search finalize, private `open_url`), 2026-10-15
- Refero MCP tool descriptions, 2026-10-15
