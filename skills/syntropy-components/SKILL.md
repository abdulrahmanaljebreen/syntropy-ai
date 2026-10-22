---
name: syntropy-components
description: Chooses and uses the right Syntropy component for any Safqah UI with exact names, Figma ids, variant properties and values, and never invents one. Use whenever an agent designs, builds, specs, reviews or explains a Safqah or Syntropy screen, flow, Flutter widget, web or back-office page and must pick components; when a person asks "which component", "what props does X have", "difference between X and Y", "is X in the library"; or when they ask for a component that does not exist. Covers 85 pages, 354 components (Button, Input, Input Amount, Select, Combobox Field, Switch, SegmentedControl_3, Tag, StatusPill, IssuanceStatusBadge (Investor), Stat, KeyValue, ProgressBar, Alert, Banner, Toast, Dialog, BottomSheet, Modal, Drawer, Menu, AppBar, TabBar (3-tab), Stepper, CardDeal, ListItem, ActionList, SelectionList, Table, charts, calculators, Countdown, Payouts cell, KYCStep, DealTimeline, ShariaDisclosure), decision trees by need, confusable pairs, composition recipes, unpublished sets and the gap check.
---

# Syntropy components

## Purpose
Pick the one correct Syntropy component for every need on a Safqah screen and write it down exactly as the library names it: component name, variant properties and values, booleans and slots. When nothing fits, say so, show the closest composition from existing atoms, and route the need to the design team instead of inventing a component.

## Hard rules
1. **Use only components that exist in `references/data/components-index.json`** (85 pages, 320 sets, 34 standalone components). If a name is not there, it does not exist: no `FancyCard`, no `Chip`, no `PrimaryButton`, no `Toggle`.
   Why: an invented name has no Figma source, no Flutter widget and no tokens; it breaks the design to code contract.
2. **Write names and variant values verbatim, typos and casing included**: `Size=lg` on `Button` but `Size=Lg` on `Section`, `Combobox Field` `State=Filled`, `Investment-amount` `User=Qualifide`, `Countdown` `Has Lable`, `Payouts cell` `Property 1=Done - Captial`, `dealTags` `Type=RIO/Black`. Never "fix" a value.
   Why: Figma matches values as exact strings; a corrected spelling silently falls back to the default variant.
3. **Direction is a Figma variant, never a code parameter.** In Figma set the set's own value (`Direction=rtl`, `Direction=RTL`, `Language=Arabic`, `Issuance Row` `Language=RTL`). In Flutter or web code never pass `direction`; layout follows the locale (`Directionality`, `dir="rtl"`).
   Why: RTL is a runtime property of the app; a direction prop duplicates it and drifts.
4. **Library state matters only in other Figma files.** 64 sets and 5 standalone components are not published (including `Input`, `Select`, `Tag`, `Link`, `AppBar`, `Radio Group`, `TextArea`, `Search Input`, `OTP Input`, `Input Amount`). They are fully known here because the repo reads the Syntropy file directly. Use them by exact name everywhere. Only when the output is another Figma file, follow `references/unpublished.md` (published route, or copy from the Syntropy file).
   Why: publishing only controls the Assets panel; code, specs and reviews do not depend on it.
5. **Compose atoms, molecules and organisms as the guides describe**: use the organism when it exists (`Input`, not `Input Label` plus `Input Field` plus `Input Helper Text` by hand); fill slots with the documented parts (`BottomSheet` Content = `Sheet Content / Summary`). Never redraw a part that exists.
   Why: compositions documented in the page guide are what engineering has built; ad hoc stacks are not.
6. **One primary action per screen or sheet**: exactly one `Button` `Variant=primary`. Alternatives are `Variant=secondary`, `tertiary` or `text`; three or more extra actions go into a `Menu`.
   Why: two loud buttons split attention at the moment money moves.
7. **Tokens only.** Components already carry their tokens; any surrounding colour, spacing, radius or type uses semantic tokens (see syntropy-foundations). Never restyle a component with raw values or recolour it.
   Why: a restyled instance stops receiving library and theme updates.
8. **Use only `status: "stable"` pages for new work.** `07b CardGoal` and `08f GoalTracker` are `wip`; mention them only to say they are not stable yet. Hidden sets (`_ROI`, `_Gross-profit`, `_Net-profit`) are internal parts: never place them.
   Why: wip and hidden parts change without notice.
9. **When unsure how something looks, open the image before answering**: `references/data/examples/<page>/reference.png` (see `references/images.md`).
   Why: names like `Base card`, `Header` and `illustrations` do not describe the visual; guessing produces the wrong pick.
10. **If nothing fits, run the gap check** (`references/gap-check.md`): does it already exist, can it be composed from existing atoms, is it reused on 3 or more screens. Tell the person the result and how to propose it; never present a new component as if it existed.
    Why: the library is the shared Figma and Flutter contract; only the design team adds to it.
11. **Respect the compliance notes on Safqah components**: projections labelled «متوقع», net after fees beside gross, real reservation windows only, real funded percentages only, `ComplianceBadge` only for real approvals, no "recommended for you" on Reinvest.
    Why: these are regulated money and disclosure surfaces (CMA); the `compliance` field in the descriptions is binding.
12. **Never use the em dash character** in names, specs, copy or comments.
    Why: Syntropy writing rule.

## Workflow
1. **Name the need in one line**, as a job, not a widget: "the user picks one of 3 investment terms", "show a deal is Late", "confirm the investment before paying".
2. **Walk the decision tree** below for that need. For the reasons and edge cases open `references/decision-trees.md`; if two candidates look alike open `references/confusables.md`.
3. **Open the page guide** `references/data/components/<page-slug>.md` (slug in `references/catalog.md`): read Use when, Don't use when, Accessibility, the property table and the Guide from the doc page.
4. **Check the properties** in `references/data/components-index.json` (or the catalog row): Figma `name`, code `canonical`, `options`, `default`, `published`, `status`. Read `references/props-and-variants.md` for booleans, instance swaps, Direction and typos.
5. **Check the descriptions** in `references/data/components-descriptions.json`: `level`, `contains`, `partOf`, `keyProps`, `a11y`, `compliance`.
6. **Look at the image** `references/data/examples/<page>/reference.png` when the visual matters or you are unsure (`references/images.md`).
7. **Compose**: start from a recipe in `references/composition-recipes.md` when one matches; write the result as slots, top to bottom, RTL first: component, variant values, booleans, Arabic copy.
8. **Library check** (Figma output in another file only): for every component, read `published`; for unpublished ones give the route or copy link from `references/unpublished.md`.
9. **Gap check** for anything still missing (`references/gap-check.md`).
10. **Self-check** (below) before answering.

## Decision trees
Format: need → use (key variant) · not. Exact names; full reasoning in `references/decision-trees.md`. "(np)" = not in the published library.

### Actions
| Need | Use | Not |
|---|---|---|
| The one main action of a screen or sheet («استثمر الآن», «تأكيد الاستثمار») | `Button` `Variant=primary` `Size=lg` | a second primary, a `Link` |
| Alternative next to the primary (Cancel, Edit amount) | `Button` `Variant=secondary` (or `tertiary`, `text` for quieter) | another primary |
| Irreversible action (cancel reservation, delete account) | `Button` `Variant=destructive`, always behind `Dialog` `Tone=destructive` | `Variant=error` |
| Retry after failure, submit blocked by errors | `Button` `Variant=error` | `destructive` |
| Async submit | `Button` `State=loading` (blocks repeat taps) | a separate spinner |
| Universal icon, no label (close, copy, share) | `IconButton` (`Variant=text` for close) | an icon-only `Button` |
| Goes somewhere (terms, offering file, «لاحقاً») | `Link` (np) `Variant=info` / `muted` | `Button` |
| 2 or 3 actions placed together | `ButtonGroup` (`Orientation=vertical` on narrow sheets) | loose buttons |
| Floating persistent action | `FAB / Standard`; with label `FAB / Extended`; several `FAB speed-dial` | a sticky custom button |
| Sign in or verify with Nafath, Apple, Google | `SocialButton` (np) with `AbshirLogo` for Absher/Nafath | `Button` with a logo |
| Back to the previous screen | `BackButton` (`Emphasis=On-media` over photos) | `IconButton` with an arrow |
| Opens an overflow menu | `MenuTrigger` `Glyph=kebab` / `meatball` | `IconButton` |

### Text input
| Need | Use | Not |
|---|---|---|
| Labelled single-line text (name, email, national ID, IBAN) | `Input` (np), bare box `Input Field` | `TextArea` |
| Light sign-in and onboarding fields | `Input Underline` (np) for the whole form | mixing with `Input` |
| Mobile number | `Input Phone` (np) | `Input` |
| SAR amount typed freely | `Input Amount` (np) `Size=lg` | `Input`, `NumericStepper` |
| SAR amount in fixed steps | `Amount Stepper` | `NumericStepper` |
| Qualified amount keypad | `Keypad / Amount input` (np); in a sheet `Sheet Content / Amount keypad` (np) | `Input Amount` |
| Amount entry inside a sheet with a range | `Sheet Content / Amount` | a custom slider stack |
| Multi-line text | `TextArea` (np); back-office inline `TextArea Underline` | `Input` |
| SMS or 2FA code | `OTP Input` (np) `Length=4` / `6` | `Input` |
| Filter the list on screen | `Search Input` (np) | `Combobox Field` |
| Global search with results | `Search Dropdown`; header trigger `Compact Search Trigger`; back-office `Command palette` | `Combobox Menu` |
| Choose one value from a long list by typing (bank, city) | `Combobox Field` + `Combobox Menu`, or `Autocomplete` | `Select` |
| Date / range | `Date Input`, `Date Range Field`; picker `Date Wheel Picker` (mobile) or `Date Calendar Picker` (web) | `Input` |
| File | `Upload Button` → `File Item with Progress` | `Button` |
| Custom control that needs label and helper | `Form Field` (np) with `Form Field Helper` | wrapping `Input` again |

### Choice
| Need | Use | Not |
|---|---|---|
| Exactly one of 2 to 6 visible options | `Radio Group` (np) of `Radio` | `Select` |
| One of about 6 or more from a closed list | `Select` (np) (`Select Underline` in underline forms) | `Radio Group` |
| One from a long list, typing helps | `Combobox Field` | `Select` |
| Several of a few options, saved on submit | `Checkbox Group` | `Switch` rows |
| Several of many options (back-office) | `Multi-select field` | `Checkbox Group` |
| A single consent («أوافق على الشروط») | `Checkbox`, unchecked by default | `Switch` |
| Setting applied instantly | `Switch` | `Checkbox` |
| 2, 3, 4 or 5 short options that change the same view | `SegmentedControl_2` / `_3` / `_4` / `_5` (count = options) | `SegmentedTabs`, `TabBar` |
| Approximate value in a range | `Slider Field` (np) | `Input Amount` for exact money |
| Small integer quantity | `NumericStepper` | `Stepper` |
| Saudi region preference | `ProvinceSelector` (`RegionChip` inside) | `Tag` |
| Rich option rows on a full screen or sheet | `SelectionList` `Mode=Single` / `Multi` of `SelectRow` | `ActionList` |
| Pick one tile from a grid | `ActionTile` `State=Selected` | custom cards |
| NPS 0 to 10 | `RatingScale` | `Radio Group` |

### Feedback
| Need | Use | Not |
|---|---|---|
| Error under one field | the field's `State=error` + helper (`Input Helper Text` / `Form Field Helper` `Tone=error`) | `Alert` |
| Message inside content or a form, persists | `Alert` (`Tone=error` `Style=Filled` for submit failures) | `Toast` |
| Page or account level message with one CTA, max one per screen | `Banner` | `Alert`, two banners |
| Brief "it happened" confirmation | `Toast` (no buttons, no links) | `Alert` |
| Blocking decision | `Dialog` (`Tone=destructive` for irreversible) | `Toast` |
| Text-only hint on hover or long-press | `Tooltip` | `Popover` |
| Anchored panel with a link or action | `Popover` | `Tooltip` |
| Nothing to show after loading | `EmptyState` `Tone=default` / `search` / `error`; inside a chart card `Chart / States` | blank screen |
| Loading a known layout | `SkeletonLine`, `SkeletonBlock`, `SkeletonCircle`, `SkeletonAvatar` | `SpinnerRing` |
| Short unknown wait | `SpinnerRing`; branded full screen `SpinnerSafqahBrand` | a custom spinner |
| Known percentage | `ProgressBar`; unknown duration `ProgressBar_Indeterminate`; discrete steps `ProgressSegment`; reward milestones `MilestoneProgress` | `Slider` |

### Overlays
| Need | Use | Not |
|---|---|---|
| Short focused task on mobile (confirm, amount, explanation) | `BottomSheet` + `SheetHeader` + `Sheet Content / *` + `SheetFooter` | `Modal` on mobile |
| Critical interruption or focused form on web | `Modal` `Size=sm` / `md` / `lg` / `xl` | `BottomSheet` on desktop |
| One-line confirm | `Dialog` | `Modal` |
| Side panel for filters or record detail | `Drawer` `Side=left` / `right` | `Modal` |
| Commands (Edit, Share, Delete) | `Menu` / `Dropdown menu` (web), `Action sheet` or `Bottom-sheet menu` (mobile) | `Popover`, `Select` |

### Navigation
| Need | Use | Not |
|---|---|---|
| Top bar of an app screen | `AppBar` (np) with the matching `Type` (`Inner screens`, `Close Icon-Black`, `Deal page`...) | `Section` |
| Home header with returns and payouts | `Header Info` | rebuilding it |
| Bottom navigation, shipping app | `TabBar (3-tab)`; four-section IA designs only `TabBar` | `SegmentedTabs` |
| Switch sibling views of one screen (Active / Completed) | `SegmentedTabs` | `SegmentedControl_2` |
| Location in deep web or back-office hierarchy | `Breadcrumb` | on mobile |
| Paged result sets | `Pagination` (`Type=table` under tables) | `PageIndicator` |
| Ordered multi-step task | `Stepper`; KYC screens `KYCStep` | `NumericStepper` |
| Desktop app shell | `AppSidebar (shadcn-style)`; simpler rail `NavigationRail` (np) | `Drawer` |
| Carousel position | `PageIndicator` | `Pagination` |
| Scroll area with fades or sticky edges | `ScrollContainer`; mobile refresh `Pull-to-refresh` | custom masks |

### Data display
| Need | Use | Not |
|---|---|---|
| Category (sector, document type) | `Tag` (np); several `Tag Group` | `StatusPill` |
| Filter chip the user can remove | `Tag Removable` (np) in `Tag Group` `Layout=wrap` | `Tag` |
| Attribute or state outside the deal lifecycle (Verified, Pending review) | `StatusPill` | `Tag` |
| Deal lifecycle status (Raising, Funded, Late, Defaulted) | `IssuanceStatusBadge (Investor)`; developer portal `(Developer)`; admin `(Internal)` | `StatusPill`, `Tag` |
| Tier or ribbon on a deal image | `dealTags` | `Tag` |
| Unread dot / count | `Badge Dot` / `Badge Count` (np) | `StatusPill` |
| Percentage change | `TrendBadge`; inside a KPI `Stat` `HasDelta=true` | coloured text |
| One headline KPI | `Stat` | `KeyValue` |
| Lookup fact (profit rate, maturity, reference) | `KeyValue` | `Stat` |
| Any SAR amount on display | `MoneyAmount` | the word ريال |
| Person or entity | `Avatar` (`Shape=Circle` person, `Rounded` entity); presence `AvatarWithStatus`; group `AvatarStack` | logos |
| Separator | `Divider` (or the row's own divider boolean) | borders |
| Dated events | `TimelineRow` + `TimelineNode`; deal lifecycle `DealTimeline` | `Stepper` |
| Funded percentage | `ProgressBar` `Tone=brand` (already inside `CardDeal`); calculator `Calculator / Funded label` | `Stat`, `MilestoneProgress` |
| Chart | `Chart / Line`, `Chart / Bar`, `Chart / Area`, `Chart / Donut`, `Chart / Stacked`... (desktop sets) or the `· Mobile` twins (`Chart / Line · Mobile`); trend next to a number `Chart / Sparkline` | custom plots |
| Many comparable records | `Table / Cell`, `Table / HeaderCell`, `Table / ActionCell`, `Table / Toolbar` | `List` |

### Cards and lists
| Need | Use | Not |
|---|---|---|
| A deal in a feed or list | `CardDeal` `Layout=Hero` / `Row`, `State=Available` / `Reserved` / `Invested` / `Closed` | `Base card` |
| Top of a deal detail page | `Base card` (np, HeaderCard page) `State=Expanded` / `Collapsed` | `CardDeal` |
| Update about a deal or project | `NewsCard` `Style=Plain` / `Boxed` / `Media`; swipeable `NewsCard / Poster Carousel` (np) | `CardDeal` |
| Informational card that taps through | `CardInfo` `Type=Icon` / `Avatar` | `Alert` |
| Quick-action shortcut | `ActionTile` | `Button` grid |
| Nudge with description and a button | `ActionPrompt` `Tone=Warning` / `Brand` / `Success` / `Neutral` | `Banner` |
| One row (navigates, toggles, shows a value) | `ListItem` | `SelectRow` |
| Group of rows with header and footer (settings) | `ActionList` `Style=Grouped` | stacked `ListItem` |
| Read-only list, bullets, breakdown with total | `List` `Style=Bulleted` / `Numbered` / `Description` | `ActionList` |
| Choose among rows | `SelectionList` + `SelectRow` | `ListItem` |
| Title over a region with «عرض الكل» | `Section` `Size=Lg` / `Md` / `Sm` | `AppBar` |
| FAQ or optional detail | `Accordion` of `AccordionItem` | hiding fees in it |
| Browsable featured strip | `Carousel` `Type=Cards` / `Hero` | `List` |

### Safqah-specific
| Need | Use | Not |
|---|---|---|
| Retail amount and term modelling on the deal page | `Investment Calculator` (legacy, published) | Calculator v2 for retail |
| Qualified deal-page calculator (term, amount, results) | `Calculator / Duration picker` → `Calculator / Amount card` → `Calculator / Results card` (all np) | `Investment Calculator` |
| Full-screen qualified ticket entry | `Keypad / Amount input` (np); older `QualifiedCalculator` (np) | `Input Amount` |
| Reservation window | days: `Countdown`; MM:SS chip: `Small Timer`; sticky bar: `Collapsed-Reservation` | a fake timer |
| Portfolio top | `PortfolioHeader` (parts `UserGreeting` (np), `WalletChip`, `ReturnsDisplay`, `MoneyAmount`, `BalanceToggle`) | `Stat` grid |
| Distribution rows after investing | `Payouts cell` | `Calculator / Installment row` |
| Deal lifecycle on the deal page | `DealTimeline` | `Stepper` |
| Sharia and CMA marks | `ShariaDisclosure` on deal pages; compact `ComplianceBadge` `Type=Shariah` / `CMA` | `Banner` |
| Portfolio grouped by status | `Issuance List` of `Issuance Row` | `Payouts cell` |
| KYC hub / KYC step | `KYCChecklist` (rows `KYCTaskRow`) / `KYCStep` | `Stepper` alone |
| Guarantee coverage | `Guarantees` (`GuaranteeBar`, `AxisTick`) | `ProgressBar` |
| NPS | `RatingScale` | `Radio Group` |
| After the final payout, reinvest choice | `Reinvest / MaturityRecap` (np) → `Reinvest / RecommendationList` or `Reinvest / RecommendationCarousel` | `CardDeal` list |
| Goals | `GoalActivate`, `GoalTracker` are `wip`: not for new production work | presenting them as stable |
| Logos | `SafqahLogo`, `AbshirLogo`, `MadaLogo`; sidebar `Brand / Safqah Wordmark (Dark)` | `Avatar`, pasted SVG |

### Anti-patterns to refuse or correct
| Request or habit | Say and do instead |
|---|---|
| "Add a `Chip` / `Toggle` / `PrimaryButton` / `FancyCard`" | Not in Syntropy. Map it: chip → `Tag`, `Tag Removable`, `RegionChip` or `StatusPill`; toggle → `Switch`; primary button → `Button` `Variant=primary`; deal card → `CardDeal`. Unknown need → gap check |
| `Button(variant: 'brand')`, `Variant=green`, `Size=large` | Values are `primary`, `secondary`, `tertiary`, `destructive`, `error`, `text` and `lg`, `md`, `sm`. Primary already is brand green (`bg/brand/primary`) |
| `Button(direction: TextDirection.rtl)` | No direction parameter in code; the locale drives layout. Direction exists only as a Figma variant |
| Red `Tag` saying «متأخرة» on a deal | `IssuanceStatusBadge (Investor)` `Status=Late`: lifecycle copy and colour are locked |
| Full-page `Modal` on mobile | `BottomSheet`; `Modal` is the web and desktop twin |
| Two or three primary buttons | One `Button` `Variant=primary`; others `secondary` or `text`; extras in a `Menu` or `Action sheet` |
| `Toast` with an Undo or Retry button | `Toast` has no actions by design; use `Alert` (in place) or `Banner` (page level) |
| Fees or risk hidden in an `Accordion` or `Tooltip` | Essential money facts stay visible: `KeyValue`, `List` `Style=Description`, `Alert` |
| A timer that resets to create urgency | `Countdown` / `Small Timer` only for a real server expiry, with the absolute time beside it |
| Placing `_ROI`, `_Gross-profit`, `_Net-profit` | Hidden internal parts; use `Investment Calculator`, `Calculator / Results card` or `MoneyAmount` |
| Copying a guide's example image path from the repo | Inside this skill only `references/data/examples/<page>/reference.png` exists; see `images.md` |

### Worked example
Need: "Show the investor that their reserved deal is still raising, on a deal card in the portfolio, Arabic."
1. Tree "Cards and lists": a deal in a list → `CardDeal`. Portfolio list is dense → `Layout=Row`. The user reserved → `State=Reserved`. Arabic → `Direction=RTL` (this set spells it `RTL`).
2. The card's `State` already sets its status pill and tone (the organism nests `StatusPill`); turn it on with `Show status`=true. Other booleans: `Show ROI`=true, `Show media`=true, `Show highlights`=false (dense row), `Qualified`=false for a standard investor. If the person needs a lifecycle status beyond the four card states (Late, Matured, Defaulted), the investor lifecycle badge is `IssuanceStatusBadge (Investor)`, never a red `Tag` (see `confusables.md`).
3. Library check: `CardDeal` is published. Nothing to flag.
4. Look: `CardDeal` has no page reference image; open the guide's example or take a Figma screenshot of `3013:95390` (`images.md`).
5. Answer:
```
CardDeal  Layout=Row  State=Reserved  Direction=RTL
  Show media=true  Show status=true  Show ROI=true  Show highlights=false  Qualified=false
Code (canonical names: layout, state, showStatus, showRoi; class names as in the code repo):
  SafqahCardDeal(layout: CardDealLayout.row, state: DealState.reserved, ...)   // no direction argument
```

## Self-check before answering
- [ ] Every component name appears exactly in `references/data/components-index.json` (check spelling, spaces, slashes, parentheses: `TabBar (3-tab)`, `IssuanceStatusBadge (Investor)`, `Chart / Line · Mobile`).
- [ ] Every variant property and value is copied verbatim from that set, with that set's casing.
- [ ] Duplicate names (`Table / ActionCell`, `Chart / Line`, `Chart / Bar`...) are cited with their id.
- [ ] No `direction` parameter in code; Figma Direction or Language values match the set.
- [ ] For Figma output in another file, unpublished components have their published route or copy link from `unpublished.md`; no `wip` or hidden component is offered for new work.
- [ ] Exactly one `Button` `Variant=primary` per screen or sheet; destructive actions sit behind `Dialog` `Tone=destructive`.
- [ ] Mobile overlays are `BottomSheet`, web overlays `Modal`, one-line confirms `Dialog`.
- [ ] Lifecycle status uses `IssuanceStatusBadge (Investor)`, attributes `StatusPill`, categories `Tag`.
- [ ] Every money amount uses `MoneyAmount` or the amount atoms, Western digits, currency after the amount in copy (`1,250.00 ر.س`).
- [ ] Empty, loading, error, success and disabled states are named with their components (`EmptyState`, Skeleton atoms, `Alert`, `Toast`, `State=disabled`).
- [ ] Compliance notes on Safqah components are respected (projections «متوقع», net beside gross, real timers, real funded percentages).
- [ ] Nothing invented; any gap is reported with the gap check result.
- [ ] No em dash character anywhere.

## References
| File | Open when |
|---|---|
| `references/catalog.md` | Confirm any name, id, level, library status, variant values or one-line purpose; A to Z lookup (generated) |
| `references/decision-trees.md` | Full trees with reasons and edge cases for every need family |
| `references/confusables.md` | Two components look alike; find the deciding question |
| `references/composition-recipes.md` | Building a screen or block: 30 slot-by-slot recipes |
| `references/props-and-variants.md` | Reading Figma props vs code names, booleans, instance swaps, Direction and Language, typos |
| `references/unpublished.md` | A component is not in the published library: what to do for each |
| `references/gap-check.md` | Nothing fits: the 3-question gate and how to propose a component |
| `references/images.md` | How to open reference images and per-component screenshots |
| `references/data/components-index.json` | Source of truth for names, ids, props, `published`, `status` (generated) |
| `references/data/components-descriptions.json` | Level, useWhen, dontUseWhen, contains, partOf, keyProps, a11y, compliance (generated) |
| `references/data/components/<page>.md` | The page guide for one page: usage, property table, doc page text (generated) |
| `references/data/examples/<page>/reference.png` | Labelled matrix of every variant on a page (generated) |
| `scripts/build-catalog.mjs` | Rebuild `catalog.md` after the index or descriptions change (`node scripts/build-catalog.mjs`, `--check` to verify) |

Related skills: syntropy-foundations (tokens), syntropy-figma (instancing in Figma), syntropy-content (copy, numbers, currency), syntropy-code-adapters (Flutter and web code).
