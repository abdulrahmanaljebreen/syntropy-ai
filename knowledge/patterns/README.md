# Screen patterns

How Safqah screens are assembled from Syntropy components. Read the universal recipe below first, then open the pattern file for the screen you are building. Every component name here is copied from `knowledge/components/index.json`; every token from `knowledge/tokens/resolved.json`.

## Pattern index

| # | Pattern | Job of the screen | Main components |
|---|---|---|---|
| 1 | [deal-page.md](deal-page.md) | Let an investor understand one deal and decide to invest | `Base card` (HeaderCard), `dealTags`, `Stat`, `KeyValue`, `DealTimeline`, `Guarantees`, `ComplianceBadge`, `ShariaDisclosure`, `Button` |
| 2 | [deal-list.md](deal-list.md) | Browse open, upcoming and closed deals; never look broken when supply is thin | `CardDeal`, `Carousel`, `Section`, `SegmentedControl_3`, `Tag`, `EmptyState` |
| 3 | [invest-and-reserve.md](invest-and-reserve.md) | Choose an amount, reserve honestly, confirm, see success | `Input Amount`, `Investment Calculator`, `QualifiedCalculator`, `Keypad / Amount input`, `Countdown`, `BottomSheet`, `Sheet Content / Summary` |
| 4 | [payment.md](payment.md) | Fund the investment or wallet and show the result of the payment | `Checkout`, `Payment-details`, `SelectionList`, `SelectRow`, `MadaLogo`, `KeyValue`, `Toast` |
| 5 | [kyc.md](kyc.md) | Verify identity and suitability (CMA KYC) with clear progress | `KYCChecklist`, `KYCTaskRow`, `KYCStep`, `Stepper`, `AbshirLogo`, `Upload Button`, `File Item with Progress` |
| 6 | [onboarding-and-sign-in.md](onboarding-and-sign-in.md) | Get a person into their account fast and safely | `Input Phone`, `OTP Input`, `AppBar`, `BottomSheet`, `Illustrations`, `Toast` |
| 7 | [wallet-and-cash-out.md](wallet-and-cash-out.md) | See balance, manage bank accounts, withdraw, fix name mismatch | `WalletChip`, `MoneyAmount`, `Input Amount`, `ActionList`, `ListItem`, `Reinvest / MaturityRecap`, `File Item with Progress` |
| 8 | [portfolio.md](portfolio.md) | Show what the investor owns, what it earned and what is next | `PortfolioHeader`, `SegmentedTabs`, `Issuance List`, `Issuance Row`, `CardDeal`, `Chart / Donut · Mobile` |
| 9 | [payouts.md](payouts.md) | Show every distribution, its state and its expected date | `Payouts cell`, `Distribution-schedule`, `DealTimeline`, `Section`, `Alert` |
| 10 | [goals.md](goals.md) | Set an investment goal and track progress without promising returns | `GoalActivate`, `GoalTracker`, `Goal / PhaseRow`, `Goal / Amount`, `ProgressBar` |
| 11 | [empty-states.md](empty-states.md) | Explain why a region is empty and give one next step | `EmptyState`, `Illustrations`, `Sheet Content / Empty`, `Chart / States` |
| 12 | [errors-and-recovery.md](errors-and-recovery.md) | Tell the user what went wrong and how to continue | `Input`, `Form Field Helper`, `Alert`, `Banner`, `Toast`, `Dialog`, `Button` |
| 13 | [forms.md](forms.md) | Collect structured data with the right control and validation timing | `Form Field`, `Input`, `Select`, `Combobox Field`, `Date Input`, `Checkbox Group`, `Radio Group` |
| 14 | [notifications-and-permissions.md](notifications-and-permissions.md) | Let users choose what we notify and ask for OS permission at the right moment | `ActionList`, `ListItem`, `Switch`, `Section`, `BottomSheet`, `Banner` |
| 15 | [settings-and-profile.md](settings-and-profile.md) | Let users see and edit their account, security and preferences | `AppBar`, `ActionList`, `ListItem`, `Section`, `Avatar`, `Dialog` |
| 16 | [backoffice-tables.md](backoffice-tables.md) | Let operators find, compare and act on many records on web | `Table / Cell`, `Table / HeaderCell`, `Table / ActionCell`, `Table / Toolbar`, `Pagination`, `Filter menu` |
| 17 | [charts-and-dashboards.md](charts-and-dashboards.md) | Show numbers over time or share of a whole, honestly | `Chart / ChartContainer`, `Chart / Line · Mobile`, `Chart / Legend`, `Chart / ChartTooltip`, `Chart / States`, `Stat` |

## Universal screen recipe (every Safqah screen)

Read top to bottom. RTL is the canonical layout: "start" means the right edge in Arabic.

| Slot | Component and props | Tokens |
|---|---|---|
| 1. Status bar | OS status bar (no Syntropy component) | sits on the screen background |
| 2. Top bar | `AppBar` with the `Type` that fits: `main screens` (tabs with wallet), `Inner screens` (back + title), `Small Title` (collapsed sticky), `Deal page` / `Deal page-collapsing` (deal detail), `Close Icon-Black` (modal flows), `Onboarding`. `Direction=RTL` for Arabic. Portfolio home may use `Header` (06a) instead | `bg/base`; `hasDivider` only when content scrolls under it |
| 3. Optional page message | At most one `Banner` (page level) or one `Alert` (inline) | gap `space/lg` below |
| 4. Content | Regions stacked vertically, each led by a `Section` (`Size=Lg` for page sections, `Md` for sub-sections) | content area `bg/base` on the `bg/surface` canvas; cards inside it `bg/elevated`; side padding `space/lg`; gap between regions `space/2xl`; gap inside a region `space/md` |
| 5. Primary action | One `Button` `Variant=primary` `Size=lg`, full width, in a sticky footer for task screens | footer padding `space/lg` sides and top, plus the device safe-area inset at the bottom; surface `bg/base` with a `Scroll shadow` `Position=bottom` when content scrolls under it |
| 6. Bottom navigation | `TabBar` (4 tabs) or `TabBar (3-tab)` on top-level screens only; never together with a sticky CTA | the bar already reserves the home-indicator inset |

### Surfaces
| Token | Use it for | Do not use it for |
|---|---|---|
| `bg/surface` | Least elevated: the canvas behind everything, the back layer of the elevation ladder (screen background, gutters around content, web page background) | Cards or content blocks (they would sink into the canvas) |
| `bg/base` | Mid elevation: the base content area where most page content sits (White in Light), including `AppBar`, content sections, sticky footers | Floating or overlaid elements |
| `bg/elevated` | Most elevated, off-white: the default surface whenever elevation is needed: cards (`ActionList` `Style=Grouped`, fact panels, `GoalTracker`, `KYCChecklist`), `BottomSheet`, `Dialog`, `Modal`, `Popover`, `Menu`, `Banner` `Style=Elevated`, with `border/subtle` and `radius/lg` | The page canvas or the whole content area |

Elevation ladder, back to front: `bg/surface` → `bg/base` → `bg/elevated`. Each layer sits on the one before it; never put a lower layer on top of a higher one. Values and descriptions: `knowledge/tokens/resolved.json`.
| `bg/overlay` | The scrim behind `BottomSheet`, `Dialog`, `Modal` | Anything else |

### Rules
1. One `Button` `Variant=primary` per screen. The escape action is `Variant=secondary` or `Variant=text`, same `Size`.
   Why: two primaries make the user read both labels; many pick neither.
2. Side padding is `space/lg`; sections are `space/2xl` apart; never hand-pick pixel values.
   Why: one rhythm across every screen; values live in `resolved.json`.
3. The sticky CTA sits above the safe-area inset and never covers the last content row: add bottom padding equal to the footer height to the scroll content.
   Why: the last fee or disclosure line must stay readable.
4. Every screen ships five states: loading (`SkeletonLine`, `SkeletonBlock`, `SkeletonAvatar` matching the real layout), empty (`EmptyState`), error, success, disabled. Show skeletons only after 200ms.
   Why: a missing state becomes a blank screen in production.
5. `Direction` on every directional component matches the locale (`RTL` / `rtl` exactly as the set spells it). Digits, phone numbers, IBANs and chart time axes never mirror.
   Why: `knowledge/ux/rtl.md` R1-R2.
6. Copy: label, control, at most one short hint. Arabic first, Western digits, currency after the amount (`1,250.50 ر.س` / `1,250.50 SAR`), percentage labels start with «نسبة». Never the em dash character.
   Why: `knowledge/content/voice-tone.md`, `numbers-currency.md`.
7. Warnings use `Tone=warning`; red `Tone=error` only for critical or defaulted states.
   Why: red must keep its meaning.
8. Hit areas are 48x48 in the app, 24x24 minimum on web.
   Why: `knowledge/ux/accessibility/touch-targets.md`.
9. Money decisions show the risk and the fee before the commit button, not after.
   Why: CMA disclosure duty and no hidden costs; confirm wording with Compliance.
10. No fake urgency. Timers count real deadlines only; no scarcity counts unless the number is live and true.
    Why: T6 and the deceptive-design list.

### Known system risks to respect
- Brand green is used as built: the primary `Button` (white on `bg/brand/primary`), green amounts, selected tiles and links appear exactly as the components build them, as in the investment calculator. Do not flag, recolour or enlarge them.
- `text/subtle` is large-text only. Never put decision information (fees, dates, risk) in it.
- `Base card` (HeaderCard) and several 08 components are not published; use them by name, and in another Figma file, copy it from the Syntropy file.

## Gaps found while writing these patterns
Components the patterns needed that the manifest does not contain. Compose from what exists and flag; never invent.

| Needed | Used instead | Pattern |
|---|---|---|
| Numeric keypad as a standalone component | `Sheet Content / Amount keypad`, `Keypad / *` molecules (08s) | invest-and-reserve, onboarding |
| Status bar / OS chrome, OS permission dialogs, biometric prompt | OS-native; not a Syntropy component | onboarding, notifications |
| Payment-method row with brand logo (Mada, Apple Pay) | `SelectRow` + `MadaLogo`; no Apple Pay mark in the manifest | payment |
| `RadialProgress` (referenced by the CardGoal guide as 08g) | `GoalTracker` composes it internally; no standalone set | goals |
| Range slider (min to max) | `Slider Field` single value, or two `Select` | deal-list, backoffice |
| Hijri calendar picker | `Date Calendar Picker` is Gregorian only | forms |
| Dedicated empty-state illustrations (empty box, no results, offline) | `Illustrations` concepts (`Think`, `Puzzle`, `Data info alert`) | empty-states |
| Notification-bell illustration | `Illustrations` `Info` or `Start` | notifications |
| Two sets share the name `Table / ActionCell` (3320:262 and 3351:197) | use 3320:262 and flag the duplicate | backoffice-tables |

## Sources
- Manifest: `knowledge/components/index.json` (Syntropy 2.0.0, `a7Z956YZy9n6f9uz5DK16Y`).
- Tokens: `knowledge/tokens/resolved.json`; layout: `knowledge/foundations/figma/layout.md`.
- Rules: `docs/CONVENTIONS.md`, `knowledge/ux/principles.md`, `knowledge/ux/rtl.md`, `knowledge/content/voice-tone.md`, `knowledge/content/numbers-currency.md`, `knowledge/content/copy-lengths.md`, `knowledge/ux/accessibility/`.
- Benchmarks: `knowledge/links/links.json`.
