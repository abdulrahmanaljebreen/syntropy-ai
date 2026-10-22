# Confusable components

Pairs and groups that agents mix up, each with the one question that decides between them. Open this when two components both look right.

## Rules
1. Ask the deciding question literally and answer it from the person's need, not from the visual.
   Why: confusables usually look alike; they differ in meaning, behaviour or platform.
2. When the answer is still unclear, open both page guides and their reference images.
   Why: the Don't use when lists name the alternative explicitly.

## Labels and chips
| Group | Deciding question | Answer |
|---|---|---|
| `Tag` vs `StatusPill` | Is it a category (what kind of thing) or a state or attribute (what condition it is in)? | Category (عقاري, document type, risk level) → `Tag`. State or attribute (Verified, Pending review, KYC complete, Expired) → `StatusPill` |
| `StatusPill` vs `IssuanceStatusBadge (Investor)` | Is it a stage of the deal or issuance lifecycle? | Yes (Reserved, Funded, Active, Late, Defaulted, Matured) → `IssuanceStatusBadge (Investor)`, locked copy and colours. No → `StatusPill` |
| `IssuanceStatusBadge (Investor)` vs `(Developer)` vs `(Internal)` | Who is looking? | Investor app → `(Investor)`; developer portal → `(Developer)`; admin or Monitoring dashboards → `(Internal)`. Never show `Reimbursed` or `PendingDrawdown` to investors |
| `Tag` vs `Tag Removable` | Can the user remove it? | Yes (applied filter) → `Tag Removable`; no → `Tag` |
| `Tag Removable` vs `RegionChip` | Is the user removing an applied value or picking an option? | Removing → `Tag Removable`. Picking a Saudi region → `RegionChip` inside `ProvinceSelector` |
| `Tag` vs `dealTags` | Is it a tier or ribbon on the deal image (مضمونة برهن, فرصة حصرية للمؤهلين, مغلقة بنجاح)? | Yes → `dealTags` (the TierBadge page); no → `Tag` |
| `Badge Dot` vs `Badge Count` vs `StatusPill` | Does the number matter? Are there words? | No number → `Badge Dot`; a number → `Badge Count`; words → `StatusPill` |
| `TrendBadge` vs `StatusPill` delta in `Stat` | Is the change beside a tab or table cell, or inside a KPI tile? | Tab, table, KeyValue → `TrendBadge`; inside `Stat` → `HasDelta=true` (nests `StatusPill`) |
| `Tag` vs `Segment` / `SegmentedControl_N` | Does tapping change a value on this view? | Yes → `SegmentedControl_2..5`. `Tag` is never interactive |

## Steppers and progress
| Group | Deciding question | Answer |
|---|---|---|
| `Stepper` vs `NumericStepper` vs `Amount Stepper` | Is the user moving through steps, or changing a number? | Steps of a flow → `Stepper`. Small integer (units) → `NumericStepper`. SAR in fixed steps → `Amount Stepper` |
| `ProgressBar` vs `ProgressSegment` vs `MilestoneProgress` | Continuous percentage, discrete count, or named milestones with a reward? | Percentage (78% funded) → `ProgressBar`; 2 of 5 → `ProgressSegment` row; profile journey with up to four milestones and a reward → `MilestoneProgress` |
| `ProgressBar` vs `ProgressBar_Indeterminate` vs `SpinnerRing` | Is progress measurable, and is the wait long or short? | Measurable → `ProgressBar`; not measurable, bar-shaped context → `ProgressBar_Indeterminate`; short wait → `SpinnerRing` |
| `ProgressBar` vs `GuaranteeBar` vs `Slider` | Is it task progress, guarantee coverage, or an input? | Progress → `ProgressBar`; coverage on a millions axis → `GuaranteeBar` inside `Guarantees`; user input → `Slider` |
| `Stepper` vs `KYCStep` vs `KYCChecklist` | Is it KYC? One step screen or the overview? | Non-KYC flow → `Stepper`. KYC step screen → `KYCStep` (includes Stepper). KYC overview hub → `KYCChecklist` |

## Tabs and segmented choices
| Group | Deciding question | Answer |
|---|---|---|
| `SegmentedTabs` vs `SegmentedControl_2` | Does it switch between two content views (navigation-like) or a value that filters the same view? | Views under the AppBar (Active / Completed) → `SegmentedTabs`; value (Monthly / Yearly, Gross / Net) → `SegmentedControl_2` |
| `TabBar` vs `TabBar (3-tab)` | Is it the shipping three-section app or a four-section IA design? | Shipping app → `TabBar (3-tab)`; four-section IA designs only → `TabBar` |
| `SegmentedControl_3` vs `Radio Group` vs `Select` | How many options, how long are the labels, is it a form question? | 2 to 5 short options on the same view → `SegmentedControl_N`; a labelled form question with 2 to 6 → `Radio Group`; 6 or more or long labels → `Select` |
| `SegmentedTabItem` vs `BottomNavTabItem` vs `Segment` vs `NavRailItem` | Which parent? | `SegmentedTabs` → `SegmentedTabItem`; `TabBar` → `BottomNavTabItem`; `SegmentedControl_N` → `Segment`; `NavigationRail` / `AppSidebar (shadcn-style)` → `NavRailItem`. Never standalone |

## Overlays and messages
| Group | Deciding question | Answer |
|---|---|---|
| `BottomSheet` vs `Modal` | Phone or web? | Phone → `BottomSheet`; web and desktop → `Modal`. Same header, footer and content parts |
| `Dialog` vs `Modal` | Is it one short decision or a focused form or media? | One decision (yes / no, acknowledge) → `Dialog`; form, summary, video on web → `Modal` |
| `Dialog` vs `Action sheet` | A decision with a message, or a choice among a few actions on mobile? | Message plus confirm → `Dialog`; list of actions with Cancel → `Action sheet` |
| `Drawer` vs `BottomSheet` vs `NavigationRail` | Side panel kept in context, mobile task, or persistent navigation? | Filters or record detail on web → `Drawer`; mobile task → `BottomSheet`; persistent desktop navigation → `AppSidebar (shadcn-style)` or `NavigationRail` |
| `Tooltip` vs `Popover` | Is there a link, button or close? | No, text only → `Tooltip`; yes → `Popover` |
| `Popover` vs `Menu` | Free content or a list of commands? | Content (title, text, link) → `Popover`; commands → `Menu` |
| `Alert` vs `Banner` | Inside a form or card, or page and account level? | Inside content → `Alert`; top of the page, one CTA, one per screen → `Banner` |
| `Alert` vs `Toast` | Must the user read or act later? | Yes → `Alert`; brief confirmation that auto-dismisses → `Toast` (no buttons) |
| `Banner` vs `ShariaDisclosure` | Generic notice or the Sharia approval statement? | Sharia approval on deal pages → `ShariaDisclosure`; anything else → `Banner` |
| `Alert` vs `CardInfo` vs `ActionPrompt` | Severity message, persistent guidance that taps through, or a nudge with a button? | Severity → `Alert`; guidance or advisor → `CardInfo`; one action button → `ActionPrompt` |
| `EmptyState` vs Skeleton vs `Chart / States` | Done loading with nothing, still loading, or a chart card? | Nothing after load → `EmptyState`; loading → Skeleton atoms; chart card → `Chart / States` |

## Rows, lists and headers
| Group | Deciding question | Answer |
|---|---|---|
| `ListItem` vs `ActionList` | One row or the grouped container? | Row → `ListItem`; container with header, dividers, footer → `ActionList` |
| `ActionList` vs `List` vs `SelectionList` | Do rows navigate or toggle, only display, or let the user choose? | Navigate or toggle → `ActionList`; display (bullets, numbered, breakdown) → `List`; choose → `SelectionList` |
| `ListItem` vs `SelectRow` | Does the row open or toggle, or is it one option of a choice? | Opens or toggles → `ListItem`; option with radio or checkbox → `SelectRow` |
| `MenuItem` vs `Dropdown Item` vs `ListItem` | Floating command, option of a form field, or persistent page row? | Command → `MenuItem`; field option → `Dropdown Item`; page row → `ListItem` |
| `Section` vs `SheetHeader` vs `AppBar` vs `ActionList` header vs `MenuSectionHeader` | What does it title? | A region of a page → `Section`; an overlay → `SheetHeader`; the screen → `AppBar`; a group of list rows → `ActionList` `Has header`; a group of menu items → `MenuSectionHeader` |
| `Accordion` vs `List` vs `Section` | Is the content hidden until opened? | Yes, optional detail → `Accordion`; always visible → `List`; only a heading → `Section` |
| `Content` vs `CardInfo / Content` vs `CardAction / Label` | Which parent? | Rows and slides → `Content`; `CardInfo` → `CardInfo / Content`; `ActionTile` / `ActionPrompt` → `CardAction / Label` |

## Cards and headers
| Group | Deciding question | Answer |
|---|---|---|
| `CardDeal` vs `Base card` | Many deals in a list, or the top of one deal's page? | List or feed → `CardDeal`; deal page hero → `Base card` (HeaderCard page) |
| `CardDeal` vs `NewsCard` | The deal itself, or news about it? | Deal → `CardDeal`; update or milestone → `NewsCard` |
| `NewsCard` vs `NewsCard / Poster` | Vertical feed of text updates, or swipeable photo posters? | Feed → `NewsCard` `Style=Plain`; posters → `NewsCard / Poster Carousel` |
| `Carousel / Slide` vs `CardDeal` vs `NewsCard / Poster` vs `Reinvest / RecommendationCard` | What is on the slide? | Tips, promos, onboarding → `Carousel / Slide`; deals → `CardDeal`; project updates → `NewsCard / Poster`; matched deals after maturity → `Reinvest / RecommendationCard` |
| `ActionTile` vs `ActionPrompt` | Shortcut, or a nudge with description and a button? | Shortcut → `ActionTile`; nudge → `ActionPrompt` |
| `AppBar` vs `Header` vs `Header Info` vs `PortfolioHeader` | Which screen? | Any app screen top bar → `AppBar`; home with returns and payouts entry → `Header Info`; top of Portfolio → `PortfolioHeader`; `Header` is an unpublished product source part, prefer the others |
| `AppSidebar (shadcn-style)` vs `NavigationRail` | Need workspace switcher, search and the published shell? | Yes → `AppSidebar (shadcn-style)` (published); a plain rail → `NavigationRail` (np) |

## Numbers and amounts
| Group | Deciding question | Answer |
|---|---|---|
| `Stat` vs `KeyValue` | Is it the hero number or a lookup fact? | Hero KPI → `Stat`; fact in a panel or receipt → `KeyValue` |
| `KeyValue` vs `List / DescriptionRow` vs `Sheet Content / Summary` | One pair, a breakdown with a total, or a breakdown inside an overlay? | Pair → `KeyValue`; page breakdown with total → `List` `Style=Description`; overlay → `Sheet Content / Summary` |
| `KeyValue` vs `CardDeal / Metric` vs `Calculator / Metric row` vs `Calculator-list-item` vs `Keypad / Summary row` | Which parent? | Generic → `KeyValue`; inside `CardDeal` → `CardDeal / Metric`; Calculator v2 → `Calculator / Metric row`; legacy calculator → `Calculator-list-item`; keypad → `Keypad / Summary row` |
| `Stat` vs `Calculator / Stat tile` vs `Reinvest / MatchStat` | Which parent? | Generic KPI → `Stat`; Calculator v2 strip → `Calculator / Stat tile`; reinvest card → `Reinvest / MatchStat` |
| `MoneyAmount` vs `Input Amount Value` vs `Goal / Amount` | Display, field, or goal card (wip)? | Display → `MoneyAmount`; inside an amount field → `Input Amount Value`; `Goal / Amount` only inside the wip goal cards |
| `Input Amount` vs `Amount Stepper` vs `Keypad / Amount input` vs `Slider Field` | Free, stepped, qualified keypad, or approximate? | Free typing → `Input Amount`; fixed steps → `Amount Stepper`; qualified full-screen keypad → `Keypad / Amount input`; approximate → `Slider Field` (never for the exact investment) |

## Calculators and timers
| Group | Deciding question | Answer |
|---|---|---|
| `Investment Calculator` vs Calculator v2 vs `QualifiedCalculator` vs `Keypad / Amount input` | Retail or qualified, inline or full screen? | Retail inline → `Investment Calculator`; qualified inline → `Calculator / Duration picker` + `Calculator / Amount card` + `Calculator / Results card`; qualified full screen → `Keypad / Amount input` (newer) or `QualifiedCalculator` (older) |
| `Distribution-schedule` vs `Calculator / Distributions accordion` vs `Payouts cell` vs `DealTimeline` | Before or after investing? Which calculator? | Expected, legacy calculator → `Distribution-schedule`; expected, Calculator v2 → `Calculator / Distributions accordion`; actual payouts → `Payouts cell`; the deal's stages → `DealTimeline` |
| `Countdown` vs `Small Timer` vs `Collapsed-Reservation` | Days, minutes, or a sticky bar? | Days and hours → `Countdown`; MM:SS chip → `Small Timer`; persistent bar while browsing → `Collapsed-Reservation` |
| `TimelineRow` vs `DealTimeline` vs `Stepper` | Generic dated events, the deal lifecycle module, or steps the user completes? | Generic → `TimelineRow`; deal page lifecycle → `DealTimeline`; user task → `Stepper` |

## Pickers and search
| Group | Deciding question | Answer |
|---|---|---|
| `Select` vs `Combobox Field` vs `Autocomplete` | Short closed list, long list where typing helps, or typed suggestions with highlighting and loading? | `Select` / `Combobox Field` / `Autocomplete` |
| `Search Input` vs `Combobox Field` | Searching content, or choosing a form value? | Content → `Search Input`; value → `Combobox Field` |
| `Search Dropdown` vs `Combobox Menu` vs `Command palette` | Global content search, a field's option list, or back-office command search? | `Search Dropdown` / `Combobox Menu` / `Command palette` |
| `Select` vs `Dropdown menu` | Choosing a value or firing a command? | Value → `Select`; command → `Dropdown menu` |
| `Multi-select field` vs `Checkbox Group` vs `Filter menu` | Many values in a back-office field, a few in a form, or a compact list filter? | `Multi-select field` / `Checkbox Group` / `Filter menu` |
| `Sort menu` vs `Table / HeaderCell` `Sort` | Sorting the whole list by a chosen field, or by one table column? | List → `Sort menu`; column → `Table / HeaderCell` |
| `Checkbox` vs `Switch` vs `Radio` | Saved on submit, applied instantly, or exclusive? | `Checkbox` / `Switch` / `Radio` (inside `Radio Group`) |
| `Input` vs `Input Field` vs `Form Field` | Full labelled field, bare box, or wrapper for any control? | `Input`; `Input Field` for inline cells and slots; `Form Field` for non-input controls needing label and helper |

## Actions
| Group | Deciding question | Answer |
|---|---|---|
| `Button` vs `Link` | Does it change something here, or go somewhere? | Change → `Button` (even `Variant=text`); go → `Link` |
| `Button` vs `IconButton` | Is the icon universally understood with no label? | Yes → `IconButton`; no → `Button` with a label |
| `IconButton` vs `BackButton` vs `Calculator / Swipe arrow` vs `PaginationArrow` | Back navigation, calculator term step, or page step? | Back → `BackButton`; calculator → `Calculator / Swipe arrow`; pagination → `PaginationArrow`; other icon actions → `IconButton` |
| `FAB / Standard` vs `FAB / Extended` vs `FAB speed-dial` | One clear icon, one action needing a label, or several actions? | `FAB / Standard` / `FAB / Extended` / `FAB speed-dial` |
| `ButtonGroup` vs `SheetFooter` | Page-level actions or an overlay footer? | Page → `ButtonGroup`; overlay → `SheetFooter` |

## Media, icons and logos
| Group | Deciding question | Answer |
|---|---|---|
| `illustrations` (04b, lowercase) vs `Illustrations` (05d) vs `Issuance Status Icon` vs `Empty Illustration / ...` | Badge glyph, large artwork, portfolio row icon, or the EmptyState slot? | Glyph inside a status badge → `illustrations`; empty state and feature artwork → `Illustrations`; `Issuance Row` icon → `Issuance Status Icon`; `Empty Illustration / <tone> / <size>` comes automatically inside `EmptyState` |
| `Avatar` vs `SafqahLogo` vs `Brand / Safqah Wordmark (Dark)` vs `NewsCard / Developer Logo` | Person or company picture, Safqah brand, sidebar header, or issuer logo on a poster? | `Avatar` / `SafqahLogo` / `Brand / Safqah Wordmark (Dark)` / `NewsCard / Developer Logo` |
| `CardDeal / Media` vs `NewsCard / Poster Media` vs `Sheet Content / Media` | Deal card image, poster background, or video in a web modal? | `CardDeal / Media` / `NewsCard / Poster Media` / `Sheet Content / Media` |
| `Carousel` vs `ScrollContainer` | Paged slides with an indicator, or a free scrolling rail? | `Carousel` / `ScrollContainer` `Axis=horizontal` |
| `Pagination` vs `PageIndicator` | Pages of data, or slide position? | `Pagination` / `PageIndicator` |

## Same name twice
| Name | Ids | Which |
|---|---|---|
| `Table / ActionCell` | 3320:262, 3351:197 | Identical props; 3320:262 sits in the reference container. Pick one per product and cite its id |
| `Chart / Line`, `Chart / Bar`, `Chart / Area`, `Chart / Scatter`, `Chart / Combo`, `Chart / Candlestick`, `Chart / Waterfall` | atom (marks only) and organism (full chart, `Direction` x `State`) | Full chart → the organism (4153:3047 Line, 4154:3047 Bar, 4154:3048 Area, 4154:3051 Scatter, 4160:3165 Combo, 4154:3049 Candlestick, 4160:3166 Waterfall). Marks for a custom `Chart / ChartContainer` → the atom |
| `Issuance Row` vs `Issuance Row · Arabic` | 4059:117428, 4089:2079 | New screens → `Issuance Row` `Language=RTL`; the standalone Arabic copy is for legacy screens |
| `Goal-Card`, `Goal card`, `GoalCard` | 08f, wip | Legacy goal sets on a wip page; not for new work |

## Sources
- `references/data/components-descriptions.json` (dontUseWhen lists), page guides in `references/data/components/`
