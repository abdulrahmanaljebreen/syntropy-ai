# Properties and variants: Figma names vs code names

How to read a component's properties in `references/data/components-index.json`, how Figma names map to code names, and the traps: casing, typos, unnamed properties, Direction and Language, booleans that are variants, instance swaps and duplicate names. Open it before writing variant values in a spec, a Figma script or code.

## Anatomy of an index entry
```json
{
  "name": "Button", "id": "417:2", "key": "69f9...", "kind": "set", "page": "button", "pageCode": "02a",
  "published": true, "status": "stable", "hidden": false, "variantCount": 216,
  "frames": { "reference": "616:2383", "doc": "465:2", "container": "616:2383" },
  "props": [
    { "name": "Label", "canonical": "label", "type": "TEXT", "default": "Button" },
    { "name": "Has icon leading", "canonical": "hasIconLeading", "type": "BOOLEAN", "default": false },
    { "name": "Icon leading", "canonical": "iconLeading", "type": "INSTANCE_SWAP", "default": "398:2", "defaultComponent": "Button Icon Placeholder" },
    { "name": "Variant", "canonical": "variant", "type": "VARIANT", "default": "primary",
      "options": ["primary","secondary","tertiary","destructive","error","text"],
      "canonicalOptions": ["primary","secondary","tertiary","destructive","error","text"] },
    { "name": "Direction", "canonical": "direction", "type": "VARIANT", "default": "ltr",
      "options": ["ltr","rtl"], "canonicalOptions": ["LTR","RTL"] }
  ]
}
```
| Field | Meaning | Use it for |
|---|---|---|
| `name` | Exact component or set name | Specs, Figma search, the name you write in answers |
| `id` | Figma node id in the Syntropy file | Citing, `get_screenshot`, local instancing inside the Syntropy file |
| `key` | Library key | Importing from the published library (syntropy-figma) |
| `kind` | `set` (has variants) or `component` (standalone) | A standalone has no variant properties |
| `published` | In the published library | Flag `false` (see `unpublished.md`) |
| `status` | `stable` or `wip` | Only `stable` for new work |
| `hidden` | Internal part | Never place (`_ROI`, `_Gross-profit`, `_Net-profit`) |
| `frames.reference` / `doc` / `container` | Ids of the labelled matrix, doc page, container | Screenshots when no PNG exists (`images.md`) |
| `props[].name` | Property name as Figma shows it | Figma specs and scripts |
| `props[].canonical` | Code name (camelCase) | Flutter and web code |
| `props[].options` | Variant values as Figma spells them | Figma, verbatim |
| `props[].canonicalOptions` | Normalised values for code | Code; only Direction differs today (`ltr` → `LTR`) |
| `props[].default` | Default value | Leave unset when the default is what you want |
| `props[].issue` | Known problem (for example "unnamed property in Figma") | Mention it when relevant |

## Rules
1. **In Figma, use `name` and `options` verbatim; in code, use `canonical` and `canonicalOptions`.** Never translate one into the other by hand.
   Why: Figma matches strings exactly; code names are normalised once, in the index.
2. **Copy casing per set.** The same idea is spelled differently across sets:
   | Idea | Spellings in the library |
   |---|---|
   | Size | `lg / md / sm` (Button, Input), `Lg / Md / Sm` (Section, Content), `Sm / Md / Lg` (Carousel), `small / default / large` (FAB / Standard), `Small / Default` (ActionTile), `Small / MD / Large / XLarge` (SkeletonLine), `XS / S / M / L / XL` (spinners), `xs ... xl` (Avatar), `Small / Large` (MilestoneProgress), `16 ... 64` (logos) |
   | State | `default` (Button), `Default` (ListItem, Combobox Field, NumericStepper), `unchecked / checked` (Checkbox), `off / on` (Switch), `unselected / selected` (Radio, Segment), `Unselected / Selected` (SelectRow), `Selected / Default` (RegionChip) |
   | Tone | `neutral / info / success / warning / error / brand` (Tag, StatusPill), `Brand / Info / Success / Warning / Error / Neutral` (CardInfo), `Neutral / Brand / Warning / Success` (ActionPrompt), `positive / negative` (TrendBadge) |
   | Booleans as variants | `HasIcon=true / false` (StatusPill, Tooltip, KeyValue), `HasDelta`, `HasHelperText` (Stat), `HasTrend=false / true` (SegmentedTabItem), `Required`, `Tooltip` (Form Field Label) |
   Why: a lowercased `Size=Lg` on Section silently picks the default variant.
3. **Copy typos verbatim** and never "fix" them in Figma. In code use the canonical exactly as listed, and flag the typo to the person if it matters.
   | Component | Figma property or value | Canonical |
   |---|---|---|
   | `Base card` | `Has Lable` | `hasLable` |
   | `Countdown` | `Has Lable` | `hasLable` |
   | `Investment-amount` | `User=Qualifide`, `Promo=Not-adedd` / `Adedd` / `No-PROMO` | same values |
   | `Calculator-list-item` | `Wight=Bold / Light` | `wight` |
   | `GoalActivate`, `Goal card`, `GoalPlan` | `Begining` | same |
   | `Payouts cell` | `Property 1=Done - Captial` | `unnamed1` |
   | `Reservation-Calculater` | component name | |
   | `Promo-code` | `Has Headling` | |
   | `dealTags` | `Type=RIO/White`, `RIO/Black` (ROI tags), `Type7`, `Type8`, `pros`, `ClosedWhite` | same |
   | `Collapsed-Reservation` | `Has Multi-deals ` and `Description ` (trailing space) | `hasMultiDeals`, `description` |
   | `Numbers` | last value `Numbers61` | same |
   | `GoalCard`, `Goal-Card` | `State=Property 210 / 211 / 212` | same |
   Why: correcting a value creates a variant that does not exist.
4. **Unnamed properties stay `Property 1` in Figma** (`canonical` `unnamed1`): `Payouts cell`, `Small Timer`, `Collapsed-Reservation`, `Distribution-schedule`, `Header Info`, `illustrations`, `Illustrations`, `Goal card`, `GoalPlan`.
   Why: the property really is called "Property 1" in Figma; anything else fails.
5. **Direction and Language are Figma variants only.** Set the value the set uses; in code never pass a direction.
   Why: the app's locale sets reading direction for everything (Flutter `Directionality`, web `dir="rtl"`).
6. **Text, boolean and instance-swap properties carry an id suffix in the Figma Plugin API** (`Label#417:0`). Look the full key up on the instance (`componentProperties`) before `setProperties`; variant properties have no suffix.
   Why: setting `Label` without the suffix throws.
7. **Instance swaps take a component, not text.** The default is a component id (`defaultComponent` names it, for example `Button Icon Placeholder`). Swap icons only with Syntropy Icons (`Icon / kebab-case-name`); swap content slots only with the documented parts (`BottomSheet` Content → `Sheet Content / Summary`).
   Why: a placeholder left in place ships "Your content here"; a pasted SVG is unbound.
8. **Nested properties live on the nested instance.** `CardDeal` title, ROI and highlights are set on `CardDeal / Headline`, `CardDeal / Metric`, `CardDeal / Highlights`; `ButtonGroup` buttons via `Button 1`, `Button 2`, `Button 3` swaps plus `Show Button N`; the selected segment of `SegmentedControl_N` via its nested `Segment` `State=selected`.
   Why: the organism exposes only booleans and swaps; text lives in atoms.
9. **Cite the id for duplicate names** (`Table / ActionCell` 3320:262 and 3351:197; chart atoms vs organisms with the same name).
   Why: the name alone is ambiguous.

## Direction and Language values by set
| Property and values | Sets (examples) | RTL value to set |
|---|---|---|
| `Direction=ltr / rtl` (66 sets) | Button, ButtonGroup, FAB / Extended, SocialButton, all of 03 Form & Input, Tag, Tag Removable, Tag Group, Badge Count, Popover, Menu family | `Direction=rtl` |
| `Direction=LTR / RTL` (130 sets) | IssuanceStatusBadge (Investor/Developer), StatusPill, Stat, KeyValue, Tooltip, ProgressBar, Alert, Toast, Banner, EmptyState, Dialog, overlays, navigation (06), most of 07, charts, PortfolioHeader parts, KYC, DealTimeline | `Direction=RTL` |
| `Direction=RTL / LTR` (49 sets) | CardDeal, Base card, NewsCard family, Calculator v2, Countdown, Reservation-Calculater, ComplianceBadge, ShariaDisclosure, ProvinceSelector, RatingScale, Keypad family, Reinvest family, Guarantees | `Direction=RTL` |
| `Direction=rtl / ltr` | Header Info, Payouts cell | `Direction=rtl` |
| `Language=Arabic / English` | Header, Goal-Card, Goal card, GoalCard, GoalPlan | `Language=Arabic` |
| `Language=LTR / RTL` | Issuance Row | `Language=RTL` |
| `Direction` that is not reading direction | `Chart / Gridlines` (`horizontal / vertical`), `PaginationArrow` (`left / right`) | Not a locale switch: pick by geometry |
| No direction property (99 components) | IconButton, Link, FAB / Standard, indicators, Avatar, Divider, Skeleton and spinners, PageIndicator, dealTags, logos, chart marks, Segment, StepIndicator | Direction-neutral or mirrored by the parent; for arrows use the mirrored glyph (`Icon / arrow-right` for back in RTL) |
Charts keep time running left to right even in RTL; only labels and legends mirror.

## Code names
- Property names: `canonical` (camelCase): `Has icon leading` → `hasIconLeading`, `Show ROI` → `showRoi`, `Value-display` → `valueDisplay`, `Open-direction` → `openDirection`.
- Values: `canonicalOptions` (equal to `options` except Direction). Map to enums in the code repo's style (`ButtonVariant.primary`).
- Class names in the page guides' code snippets (`SafqahButton`, `SafqahCardDeal`, `SyntropyBanner`) are illustrative; use the names in the Safqah code repo or syntropy-code-adapters.
- Some guide snippets (Alert, Banner, Toast, TabBar, Tooltip, EmptyState, ProgressBar) pass `direction: TextDirection.rtl`. Drop that argument: hard rule 3 wins.
- `Direction` is listed in `keyProps` as documentation only; runtime follows the locale.

## Booleans: show vs has
| Pattern | Examples | Meaning |
|---|---|---|
| `Show X` / `showX` | `Show Label`, `Show Helper`, `showClose`, `showFooter`, `Show media` | Toggles an optional part |
| `Has X` | `Has chevron`, `Has toggle`, `Has header`, `Has description` | Toggles an optional part (07 family style) |
| `HasX=true / false` as a VARIANT | `HasIcon`, `HasDelta`, `HasTitle`, `HasConnectorAbove` | A variant, set it like any variant value (`true` / `false` as strings) |
| Behaviour booleans | `Qualified` (CardDeal), `hideBalance` (AppBar), `Submenu open` (NavigationRail) | Product state, not just visibility: `Qualified=true` only for qualified investors |

## Writing a component in an answer
```
Figma:  StatusPill  Tone=success  Variant=subtle  Size=md  HasIcon=true  Direction=RTL   label «موثّق»
Code:   StatusPill(tone: success, variant: subtle, size: md, hasIcon: true, label: 'موثّق')   // no direction
```
Always include: exact name, every non-default variant value, the booleans you turn on or off, the text, the library status when it is `false`.

## Sources
- `references/data/components-index.json` (schema `syntropy-component-index/1`), page guides in `references/data/components/`
