# Presenting references

How to show research to the person so they can judge it fast, and how to save or share it. Open this at the end of every research task and for the output of `/syntropy research <topic>`.

## Rules
1. Show the image, not only a description: Mobbin inline preview, `refero_get_screen_image`, Lazyweb `image_url`.
   Why: the person decides from what they see; descriptions are machine-written.
2. Every reference has five parts: image, product and platform, canonical link, why it matters (one line), Syntropy mapping.
   Why: these are the facts needed to accept or reject it.
3. Group references by pattern, 2 to 4 patterns, with a one-line verdict each.
   Why: the decision is between patterns, not between screenshots.
4. End with one recommendation and the gaps (elements with no Syntropy component).
   Why: research exists to make a decision.
5. Link to the canonical source page (`mobbin_url`, Refero URL, Lazyweb `url`, public URL). Never use a raw image CDN URL as the citation; some expire (Mobbin `image_url` after 30 days).
   Why: links must keep working.
6. Never print private links: Lazyweb `open_url`, signed handoffs, tokens.
   Why: single-use and tied to the person's account.
7. Keep text minimal and in the person's language; Safqah teams write Arabic and English mixed, follow their lead.
   Why: the minimal-copy rule applies to research too.
8. If a tool failed or was not connected, say so in one line and name the fallback.
   Why: the person must know what the evidence does not cover.
9. Show any Mobbin `ai_usage_notice` text word for word as its own block.
   Why: Mobbin requires it.
10. Never place reference images on design system pages in Figma.
    Why: the system file holds only Syntropy.

## Format for one reference
```markdown
### Acorns · iOS · invest review sheet
![Acorns invest review](<preview image>)
[Open on Refero](<Refero screen URL from the result>) · Refero, 2026-10-15
Why it matters: the review sits in a sheet over the amount, so the user never loses the number they typed.
Syntropy: `BottomSheet` + `Sheet Content / Summary` + `KeyValue` + `Button` `Variant=primary` `Size=lg`
```

## Format for `/syntropy research <topic>` (the whole summary)
```markdown
## السؤال · Question
How do investing apps confirm a purchase before money moves?
Surface: app, compact, Arabic RTL · Decision: review screen or review BottomSheet
Tools: Refero + Mobbin (Lazyweb not connected)

## Pattern A: review sheet over amount entry (Acorns, Revolut, Stake)
Verdict: best fit, keeps context, maps fully to Syntropy.
<references, format above>

## Pattern B: full review screen with Change links (Wise, Tamara)
Verdict: good for long summaries; use if we add fees and payment method.
<references>

## Recommendation
Pattern A, with Wise-style «تعديل» links inside the sheet.

## Mapping
<mapping table from translate-to-syntropy.md>

## Gaps
None. (or: "Camera frame overlay: no Syntropy component, proposed to the DS team.")

## Sources
Refero screens e93df1d8..., 2ffb15d4... · Mobbin flows c5c946f8..., 5eea58ab... · Stake public site · checked 2026-10-15
Saved: <Lazyweb Agentic Search url, if used>
```

## Where to present
| Situation | Format |
|---|---|
| Quick answer in chat | 3 to 6 references inline with the format above |
| Design review with the team | A published page (HTML artifact or Notion page) with images, patterns and recommendation; offer it in one line, publish when the person or team will read it |
| Figma work | Downloaded high-res images on a clearly named references frame in the person's working file, labeled with product and link; never on design system pages |
| Linear ticket | A `## Design` section with images embedded and links |
| Long-lived evidence | Lazyweb Agentic Search page or a Notion research page |

## Saving and sharing per tool
| Tool | How |
|---|---|
| Lazyweb | Carry one `agentic_search_id` across screens, flows and experiments. Call `lazyweb_agentic_search_finalize` with the `result_ref`s you cite. Give the person the clean private `url`; open the single-use `open_url` once in their browser, never print it. Public sharing is the person's action from the page's Share button |
| Mobbin | Cite `mobbin_url`. To embed in Figma, Notion or slides, download from `image_url` (expires in 30 days). Save to a Mobbin collection only when asked (`output_destination: "reference_library"`) |
| Refero | Cite the Refero URL for screens, flows and apps; images via `refero_get_screen_image` `image_size: "full"` |
| Figma (Syntropy) | Cite the component name and node id from `data/components-index.json` |
| ScreensDesign, Nicelydone, LottieFiles | Cite the canonical page URL the tool returns |
| Streamline | Cite the icon name and hash as a proposal |
| Browser sources | Cite URL and date read; quote the finding; never screenshot paywalled content |

## Examples
Do:
- "Pattern A (3 apps): review sheet over amount. Maps fully to `BottomSheet` + `KeyValue`. Recommended." with images and links.
- "Lazyweb was rate-limited today; I used Mobbin and Refero instead."
- "Saved all 8 references: <Lazyweb url>."

Don't:
- A wall of 20 screenshots with no grouping or verdict.
- "Revolut does it like this" with no link and no image.
- Pasting a Lazyweb `open_url` into chat.
- "I made it like Revolut, dark with their big number and keypad."

## Sources
- Mobbin MCP result rules (`mobbin_url`, `image_url` expiry, `ai_usage_notice`), 2026-10-15
- Lazyweb MCP server instructions (Agentic Search finalize, private `open_url`), 2026-10-15
- Refero MCP tool descriptions, 2026-10-15
