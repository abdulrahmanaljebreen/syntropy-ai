# Universal screen recipe

The skeleton every Safqah screen is built on, top to bottom, with the surfaces, spacing and rules that do not change from pattern to pattern. Open this before any pattern file; each pattern only fills the content slot and adds its own states.

RTL is the canonical layout: "start" means the right edge in Arabic. Every component name is exact (check `references/data/components-index.json`); every token is a semantic token (values: see syntropy-foundations).

## Slots

| Slot | Component and props | Tokens |
|---|---|---|
| 1. Status bar | OS status bar (no Syntropy component) | Sits on the screen background |
| 2. Top bar | `AppBar` with the `Type` that fits: `main screens` (tabs with wallet), `Inner screens` (back + title), `Small Title` (collapsed sticky), `Deal page` / `Deal page-collapsing` (deal detail), `Close Icon-Black` (modal flows), `Onboarding`. `Direction=RTL` for Arabic. Portfolio home may use `Header` (06a) instead | `bg/base`; `hasDivider` only when content scrolls under it |
| 3. Optional page message | At most one `Banner` (page level) or one `Alert` (inline) | Gap `space/lg` below |
| 4. Content | Regions stacked vertically, each led by a `Section` (`Size=Lg` for page sections, `Md` for sub-sections, `Sm` for list group titles) | Content area `bg/base` on the `bg/surface` canvas; cards inside it `bg/elevated`; side padding `space/lg`; gap between regions `space/2xl`; gap inside a region `space/md` |
| 5. Primary action | One `Button` `Variant=primary` `Size=lg`, full width, in a sticky footer for task screens | Footer padding `space/lg` sides and top, plus the device safe-area inset at the bottom; surface `bg/base` with a `Scroll shadow` `Position=bottom` when content scrolls under it |
| 6. Bottom navigation | `TabBar` (4 tabs) or `TabBar (3-tab)` on top-level screens only; never together with a sticky CTA | The bar already reserves the home-indicator inset |

### Which `AppBar` `Type`
| Screen | `Type` |
|---|---|
| Top-level tab (Deals, Portfolio, Settings) | `main screens` |
| Pushed sub-screen with back (wallet, payouts list, KYC hub, forms) | `Inner screens` |
| Long screen once the large title scrolls away, or a status screen | `Small Title` |
| Deal detail (hero expanded / collapsed on scroll) | `Deal page` / `Deal page-collapsing` |
| Modal task flow (amount entry, withdraw, goal setup, success) | `Close Icon-Black` |
| Welcome and sign-up entry | `Onboarding` |

## Surfaces (elevation ladder)

| Token | Use it for | Do not use it for |
|---|---|---|
| `bg/surface` | Least elevated: the canvas behind everything (screen background, gutters around content, web page background) | Cards or content blocks (they sink into the canvas) |
| `bg/base` | Mid elevation: the base content area where most page content sits (White in Light), including `AppBar`, content sections, sticky footers | Floating or overlaid elements |
| `bg/elevated` | Most elevated, off-white: the default surface whenever elevation is needed: cards (`ActionList` `Style=Grouped`, fact panels, `GoalTracker`, `KYCChecklist`), `BottomSheet`, `Dialog`, `Modal`, `Popover`, `Menu`, `Banner` `Style=Elevated`, with `border/subtle` and `radius/lg` | The page canvas or the whole content area |
| `bg/overlay` | The scrim behind `BottomSheet`, `Dialog`, `Modal` | Anything else |

Elevation ladder, back to front: `bg/surface` → `bg/base` → `bg/elevated`. Each layer sits on the one before it; never put a lower layer on top of a higher one. Shadows come from the elevation effect styles (see syntropy-foundations), never hand-made.

## Rules
1. One `Button` `Variant=primary` per screen. The escape action is `Variant=secondary` or `Variant=text`, same `Size`.
   Why: two primaries make the user read both labels; many pick neither.
2. Side padding is `space/lg`; sections are `space/2xl` apart; never hand-pick pixel values.
   Why: one rhythm across every screen; values live in the token file.
3. The sticky CTA sits above the safe-area inset and never covers the last content row: add bottom padding equal to the footer height to the scroll content.
   Why: the last fee or disclosure line must stay readable.
4. Every screen ships five states: loading (`SkeletonLine`, `SkeletonBlock`, `SkeletonAvatar` matching the real layout), empty (`EmptyState`), error, success, disabled. Show skeletons only after 200ms.
   Why: a missing state becomes a blank screen in production.
5. `Direction` on every directional component matches the locale (`RTL` / `rtl` exactly as the set spells it). Digits, phone numbers, IBANs and chart time axes never mirror.
   Why: syntropy-rtl-arabic rules R1-R2.
6. Copy: label, control, at most one short hint. Arabic first, Western digits, currency after the amount (`1,250.50 ر.س` / `1,250.50 SAR`), percentage labels start with «نسبة». Never the em dash character.
   Why: syntropy-content (voice and numbers).
7. Warnings use `Tone=warning`; red `Tone=error` only for critical or defaulted states.
   Why: red must keep its meaning.
8. Hit areas are 48x48 in the app, 24x24 minimum on web.
   Why: syntropy-accessibility (touch targets).
9. Money decisions show the risk and the fee before the commit button, not after.
   Why: CMA disclosure duty and no hidden costs; confirm wording with Compliance (syntropy-compliance-ux).
10. No fake urgency. Timers count real deadlines only; no scarcity counts unless the number is live and true.
    Why: T6 and the deceptive-design list.
11. Web is the same design widened, not a separate desktop design: content inside the 1200px container on a 12-column grid; mobile components keep their order.
    Why: one product, one mental model; the deal page uses `Base card` `Platform=Web` for this.
12. Back-office is web at the desktop breakpoint: `Size=md` controls are the default and `Input` / `Select` `Size=sm` (below 48dp) are allowed only there, with 24x24 minimum targets.
    Why: operators work with pointers and density; investors work with thumbs.

## The five states, generic treatment
| State | Default treatment (patterns refine it) |
|---|---|
| Loading | Skeletons shaped like the real content, after 200ms; in-button `State=loading` for actions; never both a skeleton and a spinner |
| Empty | `EmptyState` with the `Tone` chosen by cause (`default` first use or waiting, `search` no results, `error` failed load) and one action (see `empty-states.md`) |
| Error | Field: `State=error` + helper with the fix. Section: `Alert` inside it. Page: `EmptyState` `Tone=error` + «إعادة المحاولة». Values entered are always kept (see `errors-and-recovery.md`) |
| Success | Money action: a success screen naming amount and deal. Reversible quick action: `Toast` `Tone=success`. Instant toggles: no toast |
| Disabled | Disabled control plus one visible line saying why and how to unblock |

## Known system risks to respect
- Brand green is used as built: the primary `Button` (white on `bg/brand/primary`), green amounts, selected tiles and links appear exactly as the components build them, as in the investment calculator. Do not flag, recolour or enlarge them.
- `text/subtle` is large-text only. Never put decision information (fees, dates, risk) in it.
- `border/brand/primary` and `border/strong` are under 3:1 in Light: selection and field edges need a second signal (radio dot, label, filled shape).
- `Base card` (HeaderCard) and several 08 Safqah-specific components are not published; use them by name, and in another Figma file, copy it from the Syntropy file (see `gaps.md`).

## Screen spec template (how to hand a screen over)
Write every screen as this table so a designer or engineer can build it without guessing:

```
Screen: <name> · Pattern: <pattern file> · Platform: app compact | regular | web | back-office · Direction: RTL
Caption: «هذه الشاشة عندما ...» / "This is the screen when the user ..."

| # | Slot | Component + exact props | Tokens | Arabic copy | English copy |
|---|---|---|---|---|---|
| 1 | Top bar | AppBar Type="Inner screens" Direction=RTL | bg/base | «المحفظة» | "Wallet" |
| ...

States: Loading · Empty · Error · Success · Disabled (one line each)
Compliance: <what must appear before the commit action; "Confirm with Compliance">
Accessibility: <reading order, labels, live regions>
Gaps: <anything missing from Syntropy, what was used instead>
```

Captions describe the state; never number screens or flows.

## Sources
- Pattern README: `knowledge/patterns/README.md`.
- Manifest: `knowledge/components/index.json` (Syntropy 2.0.0, `a7Z956YZy9n6f9uz5DK16Y`).
- Tokens: `knowledge/tokens/resolved.json`; layout: `knowledge/foundations/figma/layout.md`.
- Rules: `docs/CONVENTIONS.md`, `knowledge/ux/principles.md`, `knowledge/ux/rtl.md`, `knowledge/content/voice-tone.md`, `knowledge/content/numbers-currency.md`, `knowledge/ux/accessibility/`.
