# Decision trees: which Syntropy component

The full trees behind the tables in SKILL.md, one per need family, with the reason for every branch and the edge cases. Walk a tree top to bottom and stop at the first question you answer "yes". "(np)" marks a component that is not in the published library (see `unpublished.md`).

## Rules
1. Start from the job, not from a widget you remember. "Show that the deal is Late" leads to a different answer than "show a red pill".
   Why: most wrong picks come from matching the look (a pill, a card) instead of the meaning.
2. Stop at the first "yes" and then confirm in the page guide (`references/data/components/<page>.md`).
   Why: the trees are ordered from most specific to most generic; a later branch is a fallback.
3. If two branches seem to fit, open `confusables.md` for the deciding question.
   Why: the confusable pairs are listed there with the one question that separates them.
4. If no branch fits, run `gap-check.md`. Never stretch a component beyond its documented use.
   Why: a stretched component misleads users and engineers alike.

## 1. Actions (02 Actions, plus BackButton and MenuTrigger)
1. Does the tap **go somewhere** (another route, a URL, a PDF) without changing anything here?
   - Yes, inline in text or as a quiet path («الشروط والأحكام», «نشرة الإصدار», «لاحقاً») → `Link` (np). `Variant=info` or `default` in body copy, `muted` for low-priority paths, leading document icon for downloads, trailing arrow for external sites.
   - Yes, a whole row that opens a detail screen → `ListItem` `Has chevron` (not `Link`).
   - Why: a `Link` never changes state; screen readers announce it as a link.
2. Is it a **back** to the previous screen or step? → `BackButton`. `Type=Icon only` in dense headers, `Emphasis=On-media` over a deal photo. One back affordance per screen: if `AppBar` already shows one, do not add another.
3. Is it **sign-in or identity with a provider** (Nafath, Apple, Google)? → `SocialButton` (np). Pair the Absher/Nafath entry with `AbshirLogo` as its icon.
   - Why: provider buttons stay neutral so the provider logo carries the brand.
4. Does it **open a menu of commands**? → `MenuTrigger` (`Glyph=kebab` or `meatball` for overflow, `split` for a primary action plus more).
5. Is it a **floating, persistent screen action** over scrolling content?
   - One action, icon is obvious → `FAB / Standard` `Variant=primary`, `Size=default`.
   - One action that needs a word («استثمار جديد») → `FAB / Extended`.
   - A few related create actions → `FAB speed-dial`.
   - Never for Invest or Confirm: those belong in the page or sheet footer as a `Button`.
6. Is it **one universally understood icon** with no label (close, copy IBAN, share, more)? → `IconButton`. `Variant=text` for close X, `tertiary` for copy or share, `destructive` for trash (then confirm). If the meaning is not universal (filter, sort, Sukuk, KYC) use `Button` with a label and a leading icon.
   - Why: unlabeled icons for finance concepts fail first-time investors.
7. Are **2 or 3 related actions** placed together? → `ButtonGroup` around `Button` instances (`Orientation=vertical` on narrow sheets, `Alignment=space-between` for Skip plus Continue). Four or more: keep one primary and move the rest into a `Menu`.
8. Otherwise → `Button`. Pick `Variant` by loudness and risk:
   | Situation | Variant | Notes |
   |---|---|---|
   | The single main action («استثمر الآن», «تأكيد الاستثمار») | `primary` | One per screen or sheet. `Size=lg` on mobile |
   | Alternative or escape (Cancel, Edit amount, Back) | `secondary` | Beside or under the primary |
   | Low emphasis in a busy area | `tertiary` | |
   | Inline-looking action that still changes state | `text` | Not for navigation (that is `Link`) |
   | Irreversible (withdraw early, cancel reservation, delete) | `destructive` | Always behind `Dialog` `Tone=destructive` |
   | Retry after failure, submit blocked by errors | `error` | |
   - `State=loading` while the request runs; it blocks repeat taps (duplicate investments).
   - `Size=sm` (32px) is below the touch target: keep `lg` or `md` in the app.

## 2. Text input (03 Form & Input)
1. Is it a **verification code**? → `OTP Input` (np). `Length=4` for SMS, `Length=6` for authenticator codes (`Size=md` on narrow phones). Not for passwords.
2. Is it a **mobile number**? → `Input Phone` (np), default country code +966; the value atom is `Input Phone Value` (`Show Country=false` when the market is fixed).
3. Is it **money in SAR**?
   - Typed freely (investment, top-up, withdrawal) → `Input Amount` (np) `Size=lg`, helper with the limit («الحد الأدنى للاستثمار 1,000 ر.س»). `State=disabled` to show a locked amount during confirmation.
   - Moves in fixed steps (each step 1,000) → `Amount Stepper` (`Show Actions=false` turns it into a read-only amount box).
   - Qualified investor, full-screen keypad with live rule checks → `Keypad / Amount input` (np); inside a sheet → `Sheet Content / Amount keypad` (np).
   - Inside an overlay with a min/max range → `Sheet Content / Amount` (Input Amount plus Slider).
   - Read-only amount, not a field → `MoneyAmount`.
   - Why: amounts are the hero of the screen; the amount atoms carry the Riyal symbol and the big-integer, small-decimals rhythm.
4. Is it a **small integer count** (units, installments)? → `NumericStepper` (`State=AtMin` / `AtMax` disable a side). Not for SAR.
5. Is it **multi-line**? → `TextArea` (np) with `Show Counter` only when there is a real limit; bare box `TextArea Field`; recessive back-office notes `TextArea Underline`.
6. Is it **search**?
   - Filtering the list already on screen → `Search Input` (np) alone.
   - Global search with suggestions, recent and empty states → `Search Dropdown` (`Search Input` on top, `Search Result Item` rows).
   - Search entry in a crowded header or table toolbar → `Compact Search Trigger`.
   - Back-office command search across actions and records → `Command palette` (never in the investor app).
7. Is it **choosing one value from a long list by typing** (bank when adding an IBAN, city, sector)? → `Combobox Field` with `Combobox Menu` (`State=No results` with «جرّب كلمة أخرى»), or `Autocomplete` when matches should be highlighted and loading shown.
8. Is it a **date**? → `Date Input` (one date), `Date Range Field` (من / إلى). The picker it opens: `Date Wheel Picker` on mobile (`Mode=single-date`, `time`, `datetime`), `Date Calendar Picker` on web (`Mode=single`, `range`). Never a typed date in `Input`. Preset periods (30 days, 3 months) are a `SegmentedControl_3` instead.
9. Is it a **file**? → `Upload Button` before a file is chosen, then `File Item with Progress` (`State=progress`, `complete`, `error`, `uploaded`); compact metadata inside another container `File Item`.
10. Otherwise, **single-line text**:
    - Standard bordered forms (KYC, bank details, settings) → `Input` (np).
    - Light sign-in or onboarding with one or two fields → `Input Underline` (np). Never mix the two styles in one form.
    - A control that is not an input but needs the same label and helper chrome (Switch, Slider, Checkbox in a mixed form) → `Form Field` (np) with `Form Field Label` (np, `Required`, `Tooltip`) and `Form Field Helper` (`Tone=neutral`, `error`, `success`, `info`).
    - Inline edit cell or table filter where the column header is the label → bare `Input Field` (`Icon=leading` or `trailing`).
    - Do not wrap `Input`, `Select`, `Slider Field` or `TextArea` in `Form Field`: they already include label and helper.

## 3. Choice
1. Is it **one yes or no consent** saved on submit («اطلعت على نشرة الإصدار وأوافق على الشروط»)? → `Checkbox`, unchecked by default.
2. Does the setting **apply instantly** with no submit (notifications, Face ID, 2FA)? → `Switch`. In a settings list the switch lives in `ListItem` `Has toggle`.
3. Is it **Saudi regions**? → `ProvinceSelector` (`Selection=Single` default, `Multi` when several apply), chips are `RegionChip`.
4. Is it the **NPS question**? → `RatingScale` (cells `RatingCell`).
5. Is it **exactly one option**?
   - 2 to 5 short options that change the same view (Day / Week / Month, Gross / Net, All / Active / Closed) → `SegmentedControl_2`, `_3`, `_4` or `_5`. The suffix is the number of options; set exactly one nested `Segment` to `State=selected`.
   - 2 to 6 options shown as a labelled question in a form → `Radio Group` (np) of `Radio`.
   - Rich options with description, on a full screen or sheet (payment method, bank account, plan) → `SelectionList` `Mode=Single` of `SelectRow` `Type=Radio`.
   - About 6 or more options from a closed list → `Select` (np) (`Select Underline` (np) when the form uses underline inputs).
   - Long list where typing helps → `Combobox Field`.
   - A tile among tiles → `ActionTile` `State=Selected`.
   - Investment term inside the calculator → `Calculator / Duration picker` (qualified) or the term step of `Investment Calculator` (retail).
6. Is it **several options**?
   - A few options, saved on submit → `Checkbox Group`.
   - Rich rows → `SelectionList` `Mode=Multi` of `SelectRow` `Type=Checkbox`.
   - Many options in a back-office form or filter → `Multi-select field` (`Value-display=chips`, `count` or `text`).
   - Compact filter menu on a list or table → `Filter menu`.
7. Is it an **approximate value along a range** (allocation, risk tolerance)? → `Slider Field` (np), bare `Slider` inside calculators. There is no range slider: use two linked sliders or `Date Range Field` for dates. Exact money is never a slider.
8. Is it a **small integer**? → `NumericStepper`.

## 4. Feedback (05 Feedback, plus loaders and progress)
1. Is it about **one field**? → the field's `State=error` plus its helper (`Input Helper Text` `Tone=error` or `Form Field Helper` `Tone=error`). Success on a field: `Form Field` `State=success`.
2. Does the user need to **decide before continuing**? → `Dialog`. `Tone=destructive` for irreversible actions (confirm label names the action: «إلغاء الحجز»), `showCancel=false` for acknowledgements, `showImage=true` for a celebratory confirmation. Never for marketing.
3. Is it **inside content or a form and should persist** until resolved? → `Alert`. `Tone=error` `Style=Filled` for submit failures at the top of a form, `Tone=warning` with an action chip for an expired ID, `Tone=success` for "documents received".
4. Is it **page or account level** with one call to action (KYC reminder, payout failed, maintenance)? → `Banner`. One per screen; demote the rest to `Alert` or `Toast`. `Style=Elevated` for announcements, `showClose=false` for maintenance.
5. Is it a **brief confirmation** of something that just happened («تم نسخ رقم الآيبان», investment confirmed when returning to a screen that already shows it)? → `Toast`. `Size=Small` for connection lost or restored. No links or buttons.
6. Is it an **explanation of a term, icon or number**?
   - Text only, supplementary → `Tooltip` (`Size=md` with `HasTitle=true` for a calculation explanation).
   - Needs a link or an action → `Popover`.
   - Rich explanation on mobile → `BottomSheet` with `Sheet Content / Text`.
   - Information the investor must see to decide (fees, risk, minimum) → never hidden: show inline.
7. Is the list or view **empty after loading**? → `EmptyState`: `Tone=default` (nothing yet, with a Browse deals button), `Tone=search` (filters returned nothing, Clear filters), `Tone=error` (failed to load, Retry). `Size=Compact` inside cards. Inside a sheet → `Sheet Content / Empty`. Inside a chart card → `Chart / States` `State=empty`.
8. Is it **still loading**?
   - Known layout (cards, rows, tiles) → Skeleton atoms: `SkeletonLine` (text, `Size` and `Width` to match), `SkeletonBlock` (images, charts, buttons, `Radius` to match), `SkeletonCircle` (icons), `SkeletonAvatar` (people `Shape=Circle`, companies `Square`).
   - Button submitting → `Button` `State=loading`.
   - Short wait with no layout → `SpinnerRing` (the default; 95% of waits). Scanning or polling → `SpinnerPulseRings`; chat → `SpinnerDotOrbit`; typing → `SpinnerBouncingDots`; slow processing → `SpinnerHourglass`; branded full-screen moments (boot, post-investment) → `SpinnerSafqahBrand`. One spinner style per surface.
   - Unknown duration but a bar fits (verification polling, background sync) → `ProgressBar_Indeterminate`.
   - Mobile refresh gesture → `Pull-to-refresh`.
9. Is it **measurable progress**?
   - A percentage (funded, profile completion, upload) → `ProgressBar` (`Tone=brand` for funded, `success` / `error` for upload outcome, `showLabel` with `Label` and `Value`).
   - Discrete steps (2 of 5, 5 of 7 documents) → several `ProgressSegment`.
   - Up to four named milestones ending in a reward → `MilestoneProgress`.
   - Steps with labels the user moves through → `Stepper`.

## 5. Overlays
1. Is it a **list of commands**?
   - Web or back-office, anchored to a button → `Dropdown menu` (`MenuTrigger` plus `Menu`, `Placement=bottom-end` etc.); second level → `Cascading submenu`.
   - Mobile, a few actions with Cancel → `Action sheet`; longer grouped menus → `Bottom-sheet menu`.
   - Sorting a list → `Sort menu`; filtering → `Filter menu`.
2. Is it **anchored, small and non-blocking** with text plus a link or action? → `Popover` (`Placement=top`, `right`, `bottom`, `left`).
3. Is it a **one-line confirm or acknowledgement**? → `Dialog`.
4. Is it a **focused task on mobile** (confirm investment, enter amount, explain a term, permission reminder)? → `BottomSheet`. Build it from its parts: `DragHandle` (`showHandle`, off for sheets that must not be dismissed), `SheetHeader` (`showSubtitle`, `showClose`), Content swap (`Sheet Content / Text`, `Sheet Content / Summary`, `Sheet Content / Form`, `Sheet Content / Amount`, `Sheet Content / List`, `Sheet Content / Empty`; never ship `Sheet Content / Blank`), `SheetFooter` `Layout=Stacked`.
5. Is it a **critical interruption or a focused form on web or back-office**? → `Modal` `Size=sm`, `md`, `lg` or `xl` (`xl` with `Sheet Content / Media` for video).
6. Is it a **side panel** (filters while results update, record detail, temporary navigation)? → `Drawer` (`Side=right` or `left`; trailing side in RTL is the left edge, set it by the layout's reading direction), `SheetFooter` `Layout=Row` for Apply and Reset.
7. Long, multi-step or legal content → a full screen, not an overlay.

## 6. Navigation
1. **Screen header** of an app screen → `AppBar` (np). Pick `Type`:
   | Screen | `Type` |
   |---|---|
   | Home with greeting and wallet balance | `main screens` (`main screens-green` on the green home) |
   | Inner screens, settings | `Inner screens` or `Small Title` |
   | Deal page, collapsing on scroll | `Deal page`, `Deal page-detail`, `Deal page-collapsing` |
   | Full-screen overlay with only a close | `Close Icon-Black` (or `Close Icon-white` on dark) |
   | Big icon actions | `Large Icons` |
   | Onboarding | `Onboarding` |
   - Home with returns and a payouts entry → `Header Info` (published) instead.
   - `Header` (np) is a product source part; prefer `AppBar` or `PortfolioHeader` for new screens.
2. **Moving between app sections** on mobile → `TabBar (3-tab)` for the shipping app (`Active=1`, `2`, `3`); `TabBar` (four tabs, `Active=1` to `4`) only in designs for the four-section IA. Hide the tab bar inside checkout and KYC.
3. **Switching sibling views** of one screen under the app bar (Active / Completed) → `SegmentedTabs` (`Active=1` or `2`); a delta on a tab → `SegmentedTabItem` `HasTrend=true`.
4. **Progress through an ordered task** (3 to 5 steps) → `Stepper` (`Orientation=horizontal` on wide layouts, `vertical` for long labels). KYC → `KYCStep` (already includes the Stepper).
5. **Location in a deep hierarchy** on web or back-office (3 or more levels) → `Breadcrumb` (`Type=collapsed` for long trails). Never on mobile, never the only navigation.
6. **Paged results** → `Pagination`: `Type=table` under tables (rows per page plus range), `numbered` for long ordered lists, `compact` on narrow layouts. Exploratory feeds use Load more instead.
7. **Desktop app shell** → `AppSidebar (shadcn-style)` (published; workspace switcher `NavRail / TeamSwitcher`, user `NavRail / NavUser`, items `NavRailItem`); a simpler rail → `NavigationRail` (np). Temporary navigation over content → `Drawer`.
8. **Carousel or snap position** → `PageIndicator` (`Style=Dots` or `Bars`, `Active=1` to `5`).
9. **Scrollable region** with edge fades, sticky header or visible scrollbar → `ScrollContainer` (`Axis`, `fadeStart`, `fadeEnd`, `stickyHeader`, `stickyFooter`, `showScrollbar`).

## 7. Data display
1. **What kind of label?**
   | Meaning | Component | Key values |
   |---|---|---|
   | Deal or issuance lifecycle, investor view | `IssuanceStatusBadge (Investor)` | `Status=Reserved`, `Funded`, `Active`, `Late`, `Defaulted`, `Repayment Due`, `Fully Funded`... |
   | Lifecycle, developer portal | `IssuanceStatusBadge (Developer)` | `Status=BookBuilding`, `PendingDrawdown`, `Reimbursed`... |
   | Lifecycle, admin only | `IssuanceStatusBadge (Internal)` | `Status=OnHold`, `Dispute`, `Rejected`... |
   | Attribute or state outside the lifecycle (Verified, KYC complete, Pending review, Expired) | `StatusPill` | `Tone`, `Variant=subtle` / `solid`, `HasIcon` |
   | Category or metadata (sector عقاري, document type) | `Tag` (np) | `Tone`, `Style=filled` (max one) / `subtle` |
   | Applied filter the user can remove | `Tag Removable` (np) | always subtle |
   | Tier or ribbon on a deal image (مضمونة برهن, فرصة حصرية للمؤهلين, مغلقة بنجاح) | `dealTags` | `Type=Premium`, `RIO/White`, `RIO/Black`, `Closed`, `ClosedWhite`, `Basic`, `pros` |
   | Unread or presence, no number | `Badge Dot` | |
   | How many need attention | `Badge Count` (np) | |
   | Percentage change | `TrendBadge` | `Tone=positive` / `negative` |
   - Why: lifecycle copy and colour are locked by the Issuance Status Copy spec; a generic pill drifts from what support and notifications say.
2. **Numbers**:
   - One headline KPI per tile (total invested, expected return) → `Stat` (`Size=lg` for a hero metric, `HasDelta=true` adds a `StatusPill` delta).
   - Lookup facts in a panel or receipt (profit rate, maturity, reference with copy icon) → `KeyValue` (`Emphasis=strong` for the one key figure).
   - Breakdown with a total line → `List` `Style=Description` (`List / DescriptionRow` `Emphasis=Total`).
   - Any SAR amount on display → `MoneyAmount` (`Tone=brand` only for profit or money received).
   - Portfolio KPIs with trends on web → `Chart / KPI strip`; on mobile `Chart / KPI list · Mobile`.
3. **People and entities** → `Avatar` (`Shape=Circle` people, `Rounded` companies; fallback `Type=Photo`, `Initials`, `Icon`, `Placeholder`); live presence `AvatarWithStatus`; social proof with a count label `AvatarStack`. Brand marks are logos, not avatars.
4. **Separation** → `Divider` (`Tone=subtle` between KeyValue rows, `Variant=dashed` before optional groups). Rows in `ListItem` and `ActionList` use their own divider boolean; never a divider at a card edge.
5. **Events over time** → `TimelineRow` stacked (node `TimelineNode`, `State=completed`, `active`, `upcoming`, `skipped`); the deal lifecycle module → `DealTimeline`; paid and late payouts → `Payouts cell`.
6. **Funded percentage** → `ProgressBar` `Tone=brand` with the real value (`CardDeal` already nests it); inside the qualified calculator `Calculator / Funded label` («78% ممول»). Never round up, never use it as urgency.
7. **Charts** (page 04k; semantic tokens, green-first, Western digits, time left to right even in RTL):
   | Need | Desktop | Phone |
   |---|---|---|
   | Value over time | `Chart / Line` (4153:3047) | `Chart / Line · Mobile` |
   | Magnitude or cumulative | `Chart / Area` (4154:3048) | `Chart / Area · Mobile` |
   | Compare categories or periods | `Chart / Bar` (4154:3047) | `Chart / Bar · Mobile` |
   | Composition per group | `Chart / Stacked` | `Chart / Stacked · Mobile` |
   | Share of a whole, 6 slices or fewer | `Chart / Donut` | `Chart / Donut · Mobile` |
   | Bridge from start to end | `Chart / Waterfall` (4160:3166) | `Chart / Waterfall · Mobile` |
   | Correlation | `Chart / Scatter` (4154:3051) | `Chart / Scatter · Mobile` |
   | Mixed bar plus line | `Chart / Combo` (4160:3165) | `Chart / Combo · Mobile` |
   | Several KPIs with trends | `Chart / KPI strip` | `Chart / KPI list · Mobile` |
   | Tiny trend beside a number | `Chart / Sparkline` | same |
   | Loading, empty, error | `Chart / States` | same |
   - The marks-only atoms with the same names (`Chart / Line` 4109:1337, `Chart / Bar` 4108:1351...) are building blocks for `Chart / ChartContainer`; cite ids.
   - Gains and losses are vivid green vs dark green, never red vs green.
8. **Many comparable records** (back-office, portfolio tables) → `Table / Toolbar` (`Mode=Default` / `Selection`), `Table / HeaderCell` (`Sort`, `Has select-all`), `Table / Cell` (one `Type` per column: `Text`, `Numeric` end-aligned, `Avatar`, `Tag`, `Status`, `Select`, `Trend`, `Progress`; `Density=Default` / `Compact`), `Table / ActionCell` (two sets with this name: 3320:262 and 3351:197; pick one and cite its id), `Pagination` `Type=table`.

## 8. Cards and lists
1. **Is it a deal?**
   - In a feed, home or list → `CardDeal` (`Layout=Hero` spotlight, `Row` dense; `State=Available`, `Reserved`, `Invested`, `Closed`; `Qualified` only for qualified users).
   - Top of the deal's own page → `Base card` (np, HeaderCard page; `Platform=Mobile` / `Web`, `State=Expanded` / `Collapsed`).
   - A recommended deal after maturity → `Reinvest / RecommendationRow` or `Reinvest / RecommendationCard`.
   - Why: the feed card sells a choice; the hero frames a page; mixing them confuses hierarchy.
2. **Is it an update about a deal or project?** → `NewsCard` (`Style=Plain` in feeds, `Boxed` standalone, `Media` with a photo); swipeable photo updates → `NewsCard / Poster Carousel` (np) of `NewsCard / Poster` (np).
3. **Is it guidance that taps through** (help, relationship manager, persistent note)? → `CardInfo` (`Type=Icon` or `Avatar`, `Tone`).
4. **Does it ask for one action with a button** (complete KYC, add bank account)? → `ActionPrompt` (`Tone=Warning` for must-do, `Brand` for nudges, `Success` after completion).
5. **Is it a shortcut** (Deposit, Withdraw, Statements)? → `ActionTile` (`Style=Vertical` in grids, `Horizontal` with info).
6. **Is it a row?**
   - Navigates, toggles or shows a value → `ListItem` (one trailing affordance: `Has chevron`, `Has toggle`, `Has value` or `Has action`).
   - Selectable → `SelectRow` inside `SelectionList`.
   - A KYC task → `KYCTaskRow` inside `KYCChecklist`.
   - A payout → `Payouts cell`. A status group in the portfolio → `Issuance Row`.
7. **Is it a group of rows?**
   - Settings or account menu with header, dividers, footer → `ActionList` (`Style=Grouped` card, `Plain` edge to edge).
   - Read-only content (bullets, numbered steps, breakdown with total) → `List` (`Style=Bulleted`, `Numbered`, `Description`, `Plain`, `Divided`, `Inset`).
   - Choice → `SelectionList`.
   - Floating commands → `Menu`.
8. **Is it a heading over a region** (deals carousel with «عرض الكل»)? → `Section` (`Size=Lg` for primary sections, `Md` / `Sm` below). Not the screen title (`AppBar`), not a group header inside a list (`ActionList` `Has header`).
9. **Is it optional detail** (FAQ, terms by topic)? → `Accordion` (`Style=Boxed` / `Plain`) of `AccordionItem`. Prices, fees, errors and key actions are never collapsed.
10. **Is it a browsable strip?** → `Carousel` (`Type=Cards` for featured content, `Hero` for one big promo or onboarding) with a `Section` above; a free horizontal rail with fades → `ScrollContainer` `Axis=horizontal`.

## 9. Safqah-specific (08 family)
1. **Amount and returns before investing**
   - Retail, deal page, slider up to 20,000 → `Investment Calculator` (`Value=1`, `4`, `20`, `Qualified-user`), with `Investment-amount`, `Distribution-schedule`, `Promo-code`, `Checkout`, `Payment-details`.
   - Qualified, deal page → Calculator v2: `Calculator / Duration picker` (or `Calculator / Duration picker · Underline`) → `Calculator / Amount card` → `Calculator / Results card` (all np).
   - Qualified, full-screen keypad → `Keypad / Amount input` (np); older `QualifiedCalculator` (np) with `QualifiedCalculator Header`.
   - Held reservation summary → `Reservation-Calculater`.
   - Compliance: projections «متوقع», net after the agency fee (1% of profit, never of capital) beside gross, no guaranteed returns.
2. **Reservation time** (only a real server expiry, always with the absolute time) → `Countdown` (days, `Has Lable`), `Small Timer` (MM:SS chip, `Property 1=Black`, `Yellow` near the end, `Green`), `Collapsed-Reservation` (sticky bar, `Has Multi-deals `).
3. **Portfolio top** → `PortfolioHeader` (`Balance=Shown` / `Masked`, `Show wallet`, `Show returns`, `Show payouts table`); parts `UserGreeting` (np), `WalletChip`, `ReturnsDisplay`, `MoneyAmount`, `BalanceToggle`. Returns include expected profit: say so.
4. **Payouts after investing** → `Payouts cell` (`Property 1=Upcoming`, `Done - Payout`, `Done - Captial`, `Early paid`, `Disabled Early paid`, `Late`, `Defaulted`, `Partially repaid`, `Partially repaid closed`, `Partial principal`; `Direction=rtl` / `ltr`). Stack with dividers, never one card per row.
5. **Where the deal is** → `DealTimeline` (exactly one active stage; future stages «متوقع»).
6. **Compliance marks** → `ShariaDisclosure` on deal pages and listings; `ComplianceBadge` (`Type=Shariah` / `CMA`) in compact summaries. Only for real approvals, exact legal wording, «إعرف أكثر» opens the real licence or fatwa.
7. **Portfolio by status** → `Issuance List` of `Issuance Row` (`State=Default` / `Open` / `Focus`, `Language=LTR` / `RTL`), icons `Issuance Status Icon`.
8. **KYC** → hub `KYCChecklist` (rows `KYCTaskRow` `State=Completed` / `Current` / `Upcoming`), each step screen `KYCStep`.
9. **Guarantee coverage** → `Guarantees` (`Coverage=Empty`, `Low`, `Mid`, `High`, `Full`); values from the offering file.
10. **Region preference** → `ProvinceSelector`. **NPS** → `RatingScale`.
11. **After the final payout** → `Reinvest / MaturityRecap` (np) in a `BottomSheet`, then `Reinvest / RecommendationList` (version A) or `Reinvest / RecommendationCarousel` (version B). Behavioural matches, never advice: no «مناسبة لك», keep the not-advice disclaimer, Reinvest and Keep equal.
12. **Goals** → `GoalActivate` and `GoalTracker` exist on a `wip` page: tell the person they are not stable; do not design new production screens on them.
13. **Logos** → `SafqahLogo` (`Form=Main` stacked, `Variant` inline; seven `Color` values only), `AbshirLogo` (Absher/Nafath only), `MadaLogo` (mada card payments only), `Brand / Safqah Wordmark (Dark)` in the sidebar header.

