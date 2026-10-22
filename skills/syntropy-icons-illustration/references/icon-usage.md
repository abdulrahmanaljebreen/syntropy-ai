# Icon usage

How to size, colour, label and mirror Syntropy icons. Open this whenever you place an icon in a Safqah screen, a component slot (`Button` `Icon leading`, `IconButton` `Icon`, `StatusPill` `icon`, `CardInfo` `Icon`) or code.

## Rules
1. Use icons from the Syntropy Icons library only: Streamline Sharp Line, named `Icon / kebab-case-slug` (`Icon / wallet`, `Icon / money-out`). All 636 are usable; in another Figma file, copy unpublished ones (344) from the Icons file.
   Why: one family keeps stroke, corners and weight consistent.
2. If nothing fits, say plainly that the concept is not in the library, offer the closest icon or a text label, and suggest requesting the Streamline Sharp Line icon from the DS maintainer. Never mix Material, SF Symbols, Font Awesome or Lucide into the same component or screen.
   Why: mixed families clash; the Lucide fallback is allowed only where Streamline has no match and never side by side with Sharp Line.
3. Sizes: 16, 20, 24 (default), and 32 for large highlights. Resize proportionally from the corner. Never scale a 24 px grid icon below 16 or stretch one axis.
   Why: Sharp Line strokes (1.5 at 24) stay crisp only with uniform scaling.
4. Colour through `icon/*` tokens only: `icon/default` (default binding), `icon/muted`, `icon/subtle` (decorative only), `icon/disabled`, `icon/inverse`, `icon/on-brand`, `icon/brand/primary`, `icon/brand/darkest`, and the status icons `icon/success`, `icon/warning`, `icon/error`, `icon/info`, `icon/progress`, `icon/caution`. Never a raw hex.
   Why: tokens swap for Dark mode and themes.
5. Meaningful icons need 3:1 contrast with their background in both modes. Icons that carry meaning never rely on colour alone; the shape must carry it too (check-circle is success in any colour).
   Why: WCAG 1.4.11 and 1.4.1.
6. Icon-only controls (`IconButton`, a tappable icon in an `AppBar`) must have an accessible label in the user's language (`semanticLabel` in Flutter, `aria-label` on web), e.g. «رجوع», «إغلاق», «مشاركة». Decorative icons next to a text label get an empty label so they are not read twice.
   Why: screen-reader users hear nothing otherwise.
7. Tap target at least 48 x 48 in the app (44 minimum anywhere) even for a 24 px glyph.
   Why: motor accessibility.
8. One concept per icon, one icon per concept on a screen. No compound icons (wallet + plus), no icons with letters or digits inside, no icons as filler.
   Why: clarity at 24 px and in both languages.
9. Mirror directional icons in RTL (see the lists below) and never mirror symbolic ones. Mirror by swapping to the opposite icon when a pair exists, otherwise flip horizontally with an explicit per-icon flag (`mirrorInRTL: true` on `SafqahIcon`); never flip the whole row.
   Why: v1 shipped back arrows pointing the wrong way in Arabic; flipping a container also flips text and digits.
10. Culturally check metaphors for a Saudi, Sharia-compliant audience: no piggy banks, no dice or poker chips for investing, no alcohol, no gambling imagery.
    Why: haram or gambling connotations destroy trust.

## Sizes and pairing with text
| Icon size | Pair with | Where |
|---|---|---|
| 16 | `body / 13 / regular`, `caption / 12 / *` | Table cells, dense lists, inline meta |
| 20 | `body / 14 / *` | Compact list items, small buttons, list metadata |
| 24 (default) | `body / 16 / *`, `heading / 18 / *` | Standard buttons, nav items, list leading icons, AppBar |
| 32 | `heading / 22 / *` | Feature highlights, large CTAs, hints inside cards |

- Gap between icon and label: `space/xs` (4) for inline, `space/sm` (8) in buttons and rows.
- Centre the icon on the text's line height. In Arabic the icon sits to the right of the label (leading = right); auto layout and `Directionality` handle the swap.
- The 34 icons drawn on the 12 px grid (`chevron-down`, `chevron-left`, `chevron-right`, `chevron-up`, `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`, `plus`, `minus`, `x`, `check`, `search`, `filter`, `settings`, `menu`, `more-horizontal`, `copy-paste`, `trash`, `download`, `upload`, `sync`, `reload`, ...) are small Core UI glyphs for compact controls (Select carets, Breadcrumb separators, Tag remove, inline chevrons). For a full-size 24 px arrow use `arrow-left-2` / `arrow-right-2`.

## Colour by context
| Context | Token |
|---|---|
| Default icon on any neutral surface | `icon/default` |
| Icon beside muted text (meta row) | `icon/muted` |
| Decorative icon repeated by a label | `icon/subtle` (not on `bg/elevated` in Light: fails 3:1) |
| Disabled control | `icon/disabled` |
| On `Button` `Variant=primary` | `icon/on-brand` (the component sets it) |
| On `bg/inverse` (tooltip, dark block) | `icon/inverse` |
| Brand accent (selected option check) | `icon/brand/primary` |
| Status (Alert, StatusPill, toast) | `icon/success`, `icon/warning`, `icon/error`, `icon/info`, `icon/progress` |

Status icon choice: success `check-circle`, warning `alert-triangle`, error `alert-circle` (or `dangerous` for blocking failures), info `info`, defaulted deal `defaulted`, help `help-circle`.

## Mirroring in RTL

### Mirror (directional)
| Slugs | How |
|---|---|
| `arrow-left` @12 ↔ `arrow-right` @12, `arrow-left-2` ↔ `arrow-right-2`, `chevron-left` @12 ↔ `chevron-right` @12 | Swap to the counterpart. Back in Arabic points right; "next" or a row chevron points left |
| `arrow-diagonal-up-right` @12 ↔ `arrow-diagonal-up-left` @12 | Swap (external link, "open") |
| `forward`, `step-forward` | Flip |
| Unpublished: `move-right` ↔ `move-left`, `chevrons-right` ↔ `chevrons-left`, `arrow-square-right`, `page-first`, `arrow-up-right` ↔ `arrow-up-left`, `arrow-down-right` ↔ `arrow-down-left`, `enter`, `reply` | Swap or flip (publish first) |
| Send and reply: `mail-send`, `reply-typing`; unpublished `comment-send`, `mail-reply` | Flip so the motion points in reading direction |
| Panels: `sidebar-left` ↔ `sidebar-right` | Swap so the icon matches where the panel really opens |
| Undo / redo | Not in the library. Say so; use a text button («تراجع») or request the Streamline icons, then mirror them |

### Never mirror
| Slugs | Why |
|---|---|
| `check` @12, `check-circle`, `check-thick`, `x` @12, `plus` @12, `minus` @12 | Symbolic marks |
| `clock`, `alarm-clock`, `stopwatch`, `timer-auto`, `timer-pause`, `hourglass`, `clock-important` | Clock hands always run clockwise |
| `play-pause`, `button-pause`, `play-disable`, `auto-stop`; unpublished `play`, `pause`, `skip-next` | Media controls are universal |
| `trending-up`, `trending-down`, `chart-analytics`, `chart-area`, `graph-line`, `analytics-graph-net` | Time runs left to right in charts in both languages |
| `riyal`, `safqah-deal`, `percent`, `qr-code`, `barcode-scanner` | Symbols and codes |
| `search` @12, `eye`, `eye-off`, `lock`, `key`, `bell`, `heart`, `star`, `user`, `settings` @12, `calendar`, `home` | Direction-neutral objects |
| `chevron-up`, `chevron-down`, `arrow-up`, `arrow-down`, `expand-vertical` | Vertical, not affected by RTL |
| `sync`, `reload` | Circular refresh, keep as drawn |
| Logos (`SafqahLogo`, `MadaLogo`, `AbshirLogo`) | Trademarks never mirror |

## Naming and code
- Figma: `Icon / slug`, kebab-case, lowercase. Custom Safqah-only icons (if approved) are `Icon / safqah-<concept>`, 24 grid, 1.5 stroke, sharp miter corners, butt caps, bound to `icon/default`.
- Flutter: `SafqahIcon(name: 'wallet', size: 24)` (defaults to `icon/default`); assets are named like the component (`wallet.svg`).
- Web: inline SVG from the same Streamline source, `fill="none"`, `stroke="currentColor"`, colour from the `icon/*` token, `aria-hidden="true"` when decorative.

## Examples
| Do | Don't |
|---|---|
| «سحب» button with `Icon / money-out` leading, `icon/on-brand` | A wallet with a minus badge drawn on top |
| `IconButton` with `Icon / x`, label «إغلاق» | Icon-only close with no accessible name |
| Back in Arabic: `Icon / arrow-right-2` | `arrow-left-2` in both languages |
| `Icon / clock` unchanged in Arabic | Mirrored clock |
| Late payout: `Icon / alert-triangle` in `icon/warning` + label «متأخرة» | Red icon alone |
| Not in library: "There is no undo icon in Syntropy; use a text action" | Pasting a Material undo icon |

## Sources
- Figma foundation page Icons 69:882 (`data/foundations/icons.md`).
- `data/icons.json` (slugs, sizes, published flag).
- RTL rule R1 (Notion Stage 1-3 Principles 3501a53e-1a6b-802c-92b6-c0b2381d4215; Widgetbook parity checklist 3481a53e-1a6b-811a-9239-c995381a31d2).
