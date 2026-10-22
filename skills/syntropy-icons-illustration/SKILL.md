---
name: syntropy-icons-illustration
description: Picks, sizes, colours and mirrors icons, isometric illustrations and logos for Safqah screens using Syntropy (the Safqah design system). Use when someone needs an icon for an action or concept (withdraw, wallet, back, zakah), asks whether an icon exists, places an icon in a Button, IconButton, StatusPill, list row or AppBar, needs an empty-state or status illustration, briefs or reviews brand or AI-generated illustration, or uses the Safqah, mada or Absher logos. Covers the 636-icon Streamline Sharp Line library (292 published), Icon / slug naming, 16/20/24/32 sizes, icon/* tokens, accessible labels, RTL mirroring by slug, the 39 isocon concepts with Left/Right alignment and deal-status mapping, EmptyState illustrations, the illustration palette, two gradients and bans (3D renders, photorealism, rainbow, blue/red), and logo rules. Has an English/Arabic icon search script. Triggers: icon, أيقونة, illustration, empty state, isocon, logo, شعار, mada, مدى, Absher, أبشر, Nafath, Safqah, Syntropy.
---

# Syntropy Icons, Illustration and Logos

## Purpose
Choose the right Syntropy icon, illustration or logo for a Safqah screen and apply it correctly: published library component, correct size and `icon/*` token, accessible label, correct RTL behaviour. Keep all imagery inside the Syntropy style (Streamline Sharp Line icons, isocons, the green-yellow illustration DNA) and refuse off-brand art politely with a Syntropy alternative.

## Hard rules
1. Use icons from the Syntropy Icons library only, named exactly `Icon / slug`. Search with `scripts/search-icon.mjs` or `references/icon-catalog.md` before answering; never invent a slug.
   Why: invented or foreign icons cannot be instanced and break the Sharp Line style.
2. Pick the best icon of all 636, published or not. Library state only matters in another Figma file: there a published icon is inserted from the Assets panel, and an unpublished one (344) is copied from the Icons file (`https://www.figma.com/design/DDI9ObV7rOP82XQ3OJzogv?node-id=<id with - instead of :>`). If nothing matches, say the concept is not in the library and offer a text label or the closest icon.
   Why: the repo reads the Icons file directly, so every icon is known; publishing only controls the Assets panel.
3. Never mix icon families (Material, SF Symbols, Font Awesome, Lucide next to Sharp Line) in one component or screen.
   Why: stroke and corner styles clash.
4. Sizes 16, 20, 24 (default), 32; resize proportionally. The 34 icons on the 12 px grid are compact Core UI glyphs; never shrink a 24 px grid icon below 16.
   Why: strokes stay crisp only on the sanctioned scale.
5. Colour icons with `icon/*` tokens only (`icon/default` by default). Status icons use the matching status token and a matching shape. Meaningful icons need 3:1 contrast in Light and Dark.
   Why: tokens swap for Dark and themes; colour alone is not accessible.
6. Every icon-only control has an accessible label in the user's language («رجوع», «إغلاق»). Decorative icons next to a label are hidden from screen readers. Tap targets 48 x 48 in the app.
   Why: icon-only controls are silent otherwise.
7. Mirror directional icons in RTL (arrows, chevrons, back/forward, send, reply, undo/redo) by swapping to the counterpart (`arrow-left-2` ↔ `arrow-right-2`); never mirror checkmarks, clocks, media controls, charts, currency, logos.
   Why: Arabic is canonical; back points right in Arabic.
8. Illustrations in product UI come from the isocon set (`Illustrations`, `Property 1` + `Alignment`). Pick by meaning, choose `Alignment` so the drawing faces the copy, never recolour, rotate, flip with a transform or restyle.
   Why: one illustration style; variants are drawn correctly.
9. Brand illustrations follow the closed palette and the two gradients only (primary ramp #008150 → #00B224 → #FBE900 diagonal; subtle fade #00B224 → transparent white vertical). Refuse 3D renders, photorealism, rainbow palettes, blue or red tones, heavy outlines, realistic shadows, and figurative people or animals.
   Why: these break the brand DNA and its Sharia-sensitive character.
10. Logos only through `SafqahLogo`, `MadaLogo`, `AbshirLogo` with their own `Color` / `Tone` variants. Never recolour, stretch, mirror or add effects; never use logo colours (#02AD4C, #277D57, #089247) as UI colours; never use Absher or mada marks as generic icons.
    Why: trademarks, and UI colour comes from tokens.
11. Check metaphors for a Saudi, Sharia-compliant audience: no piggy banks, gambling (dice, poker chips) or alcohol imagery.
    Why: haram or gambling connotations destroy trust.
12. Never use the em dash character; never mention work-in-progress areas of the Figma file.
    Why: repo writing rules.

## Workflow
1. Name the concept as a verb or state (withdraw, back, late payout), not an object, and note the context: control, inline, status, empty state, marketing.
2. For an icon, run `node scripts/search-icon.mjs "<concept>"` (English or Arabic). Read the published flag. Browse `references/icon-catalog.md` if the search is thin.
3. Open `references/icon-usage.md` for size, token, label, tap target and the RTL mirror lists; decide mirror or not by slug.
4. For an illustration, open `references/illustrations.md`: pick the isocon concept, the `Alignment`, and for empty states the `EmptyState` `Tone` and `Size`.
5. For brand or marketing art, a brief, or AI-generated images, open `references/illustration-dna.md` and check palette, gradients and bans.
6. For logos, open `references/logos.md` and pick `Form` / `Color` (Safqah) or `Size` / `Tone` (mada, Absher) by background.
7. Answer with exact component names and properties, the token, the accessible label (Arabic first), and the RTL behaviour. Run the self-check.

## Decision tables

### Icon or illustration or text?
| Situation | Use |
|---|---|
| Control (button, row action, AppBar) | 24 px icon (`Icon / slug`) |
| Inline with text, table cell | 16 or 20 px icon |
| Whole empty area, success screen, onboarding | Isocon via `EmptyState` or the `Illustrations` set |
| Marketing hero, campaign | Brand illustration (illustration DNA) |
| Concept with no clear icon | Text label, no icon |
| Third-party identity or payment rail | `AbshirLogo` / `MadaLogo` |

### Common Safqah concepts
| Concept | Icon | Notes |
|---|---|---|
| Withdraw / سحب | `Icon / money-out` | `Icon / bank` when the destination bank matters |
| Deposit / إيداع | `Icon / money-in` or `Icon / deposit-box` | |
| Wallet, balance / محفظة | `Icon / wallet` | `Icon / wallet-2` alternative |
| Invest, deal / صفقة | `Icon / safqah-deal` | Safqah-specific glyph |
| Returns / نسبة العائد | `Icon / percent`, `Icon / trending-up` | Never mirror trending icons |
| Payout / توزيعات | `Icon / share-money-dollar`, `Icon / coins-stack` | |
| Currency / ريال | `Icon / riyal` | Never mirror |
| Bank account, IBAN | `Icon / bank` | |
| Zakah / زكاة | `Icon / calculator` or `Icon / coin-percent` | |
| Back / رجوع | `Icon / arrow-right-2` in Arabic, `Icon / arrow-left-2` in English | Or `BackButton` component |
| Close / إغلاق | `Icon / x` | |
| Notifications / إشعارات | `Icon / bell` | |
| Verify identity / تحقق | `Icon / user-verified`, `Icon / id-card` | `AbshirLogo` only for Absher / Nafath steps |
| Security, Face ID | `Icon / face-id`, `Icon / shield-security`, `Icon / face-scan` | |
| Help, support / الدعم | `Icon / help-circle`, `Icon / headset` | |
| Late / متأخر | `Icon / alert-triangle` (`icon/warning`) | Warning, not error |
| Defaulted / متعثر | `Icon / defaulted` (`icon/error`) | |
| Undo / تراجع | Not in library | Text action, or request the icon |

### Mirror or not (RTL)
| Mirror (swap or flip) | Never mirror |
|---|---|
| `arrow-left-2`/`arrow-right-2`, `chevron-left`/`chevron-right`, `arrow-left`/`arrow-right`, `arrow-diagonal-up-right`/`arrow-diagonal-up-left`, `forward`, `step-forward`, `mail-send`, `reply-typing`, `sidebar-left`/`sidebar-right` | `check`, `check-circle`, `x`, `plus`, `clock`, `stopwatch`, `hourglass`, `play-pause`, `button-pause`, `trending-up`, `trending-down`, `graph-line`, `riyal`, `percent`, `search`, `lock`, `eye`, logos |

### EmptyState tone
| Cause | `Tone` | Default isocon | Better swap |
|---|---|---|---|
| Nothing yet | `default` | `Scheduled` | `Hearts - Favorite` (watchlist), `Bank` (no bank), `Preparing` (no open deals) |
| No results | `search` | `Preparing` | |
| Failed to load | `error` | `Defaulted` | |

## Self-check before answering
- [ ] Every icon is `Icon / slug` and the slug exists in `references/data/icons.json` (or the catalog).
- [ ] For Figma output in another file, unpublished icons come with their copy link; missing concepts stated as missing.
- [ ] Size from 16 / 20 / 24 / 32 and an `icon/*` token named; status icons match the status tone (warning for late, error only for failure or defaulted).
- [ ] Accessible label given for icon-only controls, Arabic first.
- [ ] RTL behaviour stated for directional icons; nothing symbolic mirrored.
- [ ] Illustrations: isocon concept by meaning, `Alignment` facing the copy, no recolour or transform.
- [ ] Brand art: closed palette, one of the two gradients, none of the bans.
- [ ] Logos: component and variant named, no recolour, no mirror, correct variant for the background.
- [ ] No piggy banks, gambling or alcohol imagery.
- [ ] No em dash character; no work-in-progress Figma areas.

## References
| File | Open it when |
|---|---|
| `references/icon-usage.md` | sizing, colour tokens, labels, tap targets, RTL mirror lists, naming, code |
| `references/icon-catalog.md` | browsing every icon by category with published status |
| `references/illustrations.md` | isocon concepts, deal-status mapping, Left vs Right, EmptyState illustrations |
| `references/illustration-dna.md` | brand illustration palette, gradients, form rules, bans, brief template |
| `references/logos.md` | `SafqahLogo`, `MadaLogo`, `AbshirLogo` variants, backgrounds, clear space, misuse |
| `scripts/search-icon.mjs` | searching icons by meaning in English or Arabic: `node scripts/search-icon.mjs "withdraw"` / `"سحب"` |
| `references/data/icons.json` | generated: all 636 icons (slug, words, category, size, published, Figma key) |
| `references/data/illustrations.json` | generated: the 39 isocon concepts with alignments |
| `references/data/foundations/*.md` | generated: Figma foundation pages (icons, illustrations, logos, colors, ...) |

For colour tokens and contrast see syntropy-foundations; for component properties (Button, IconButton, EmptyState) see syntropy-components.
