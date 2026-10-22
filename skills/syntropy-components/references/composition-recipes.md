# Composition recipes

Slot-by-slot recipes for the blocks and screens agents build most often, using only Syntropy components with exact variant values. Arabic RTL first: set the set's own RTL value (`Direction=RTL`, `Direction=rtl`, `Language=RTL`) in Figma; in code pass no direction. "(np)" = not in the published library (see `unpublished.md`). Tokens for the surrounding layout come from syntropy-foundations; copy rules from syntropy-content.

## Rules
1. Start from the closest recipe and change only what the need requires.
   Why: recipes encode the decisions already made (one primary, sheet on mobile, states).
2. Every recipe needs its five states: empty, loading, error, success, disabled. Each recipe names them.
   Why: a screen without states is half a design.
3. Copy in recipes is an example; keep the structure (label, control, at most one hint) and Western digits with currency after the amount.
   Why: minimal copy and number format are Safqah rules.

## Index
| # | Recipe | Main components |
|---|---|---|
| 1 | Investment confirmation sheet | BottomSheet, Sheet Content / Summary, ComplianceBadge, Checkbox, SheetFooter |
| 2 | Amount entry, retail form | Input Amount, Button |
| 3 | Amount entry, qualified keypad | Keypad / Amount input |
| 4 | Amount entry inside a sheet | BottomSheet, Sheet Content / Amount |
| 5 | Deals feed | Section, Carousel, CardDeal, SegmentedControl_3 |
| 6 | Deal list loading and empty | SkeletonBlock, SkeletonLine, EmptyState |
| 7 | Deal page | Base card, dealTags, IssuanceStatusBadge (Investor), Stat, ProgressBar, KeyValue, DealTimeline, Guarantees, ShariaDisclosure |
| 8 | Filter chips above a list | Tag Group, Tag Removable, Filter menu |
| 9 | KYC checklist hub | KYCChecklist, KYCTaskRow, ProgressBar |
| 10 | KYC bank step | KYCStep, Stepper, Input, Alert |
| 11 | Settings list | ActionList, ListItem, Switch |
| 12 | Notification settings | ActionList, ListItem Has toggle |
| 13 | Payouts list | Section, Payouts cell, Divider |
| 14 | Portfolio overview | PortfolioHeader, SegmentedTabs, Issuance List |
| 15 | Empty deals (no open deals) | EmptyState, ActionPrompt, CardDeal State=Closed |
| 16 | Error banner on a form | Alert, field error states |
| 17 | Destructive confirmation | Dialog Tone=destructive |
| 18 | Reservation hold | Countdown, Small Timer, Collapsed-Reservation |
| 19 | Sign in with phone and OTP | Input Phone, OTP Input, SocialButton, AbshirLogo |
| 20 | Document upload | Upload Button, File Item with Progress |
| 21 | Transaction receipt | KeyValue, List Style=Description, Toast |
| 22 | Back-office table with toolbar | Table / Toolbar, Table / HeaderCell, Table / Cell, Table / ActionCell, Pagination |
| 23 | Back-office app shell | AppSidebar (shadcn-style), Breadcrumb, Chart / KPI strip |
| 24 | Overflow actions on a card or row | MenuTrigger, Dropdown menu, Action sheet |
| 25 | Help and FAQ | Section, Accordion, CardInfo |
| 26 | NPS feedback sheet | BottomSheet, RatingScale, TextArea |
| 27 | Maturity and reinvest sheet | Reinvest / MaturityRecap, Reinvest / RecommendationList |
| 28 | Portfolio chart card on mobile | Chart / Line · Mobile, SegmentedControl_5, Chart / States |
| 29 | Payment method choice | SelectionList, SelectRow, MadaLogo |
| 30 | Home quick actions and nudge | ActionTile, ActionPrompt, Banner |

## 1. Investment confirmation sheet
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Shell | `BottomSheet` `showHandle=true` `showHeader=true` `showFooter=true` `Direction=RTL` | Mobile. On web use `Modal` `Size=md` with the same parts |
| 2 | Header | `SheetHeader` `showSubtitle=true` `showClose=true`: «مراجعة الاستثمار», subtitle = deal name | |
| 3 | Summary | Content = `Sheet Content / Summary`: `KeyValue` rows «المبلغ» `5,000.00 ر.س`, «رسوم الوكالة (1% من الربح)», «صافي الربح المتوقع» `612.50 ر.س`, «نسبة صافي العائد المتوقع» `12.3%`, «موعد التوزيع المتوقع»; `Divider`; total row «المبلغ المخصوم من المحفظة» `Emphasis=strong` | Fees with VAT shown before confirming; projections say «متوقع» |
| 4 | Compliance | `ComplianceBadge` `Type=Shariah` `Direction=RTL` | Real approval only |
| 5 | Consent | `Checkbox` `Size=lg` `State=unchecked` «اطلعت على نشرة الإصدار وأوافق على الشروط» with a `Link` (np) to the offering file | Never pre-ticked |
| 6 | Footer | `SheetFooter` `Layout=Stacked` `showSecondary=true`: primary `Button` `Variant=primary` `Size=lg` «تأكيد الاستثمار», secondary «تعديل المبلغ» | Primary `State=disabled` until consent; `State=loading` while submitting |
States: loading summary → `SkeletonLine` rows; submit failed → `Alert` `Tone=error` `Style=Filled` inside the sheet, amount kept, primary becomes «إعادة المحاولة»; success → confirmation screen (`Illustrations` `Property 1=Chosen checkmark`, `KeyValue` reference with copy icon, `Button` primary «عرض استثماري»).
Not: a full-page `Modal` on mobile, two primaries, the fee inside a `Tooltip`.

## 2. Amount entry, retail form
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` (np) `Type=Close Icon-Black` `Direction=RTL` «مبلغ الاستثمار» | |
| 2 | Wallet | `WalletChip` `Direction=RTL` | What is available before typing |
| 3 | Amount | `Input Amount` (np) `Size=lg` `Show Label=true` «المبلغ», helper «بمضاعفات 1,000 ر.س» | Fixed steps instead: `Amount Stepper` |
| 4 | Projection | `KeyValue` «صافي الربح المتوقع» with `MoneyAmount` | Label «متوقع» |
| 5 | Footer | `Button` `Variant=primary` `Size=lg` «متابعة» | Opens recipe 1 |
States: empty → CTA `State=disabled`; invalid → `Input Amount` `State=error` with the fix in the helper; deal filled meanwhile → `Alert` `Tone=warning` «اكتمل تمويل الصفقة» and CTA disabled.

## 3. Amount entry, qualified keypad
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` (np) `Type=Close Icon-Black` | |
| 2 | Body | `Keypad / Amount input` (np) `State=Empty` / `Valid` / `Not multiple` / `Snap` / `Above cap` / `Above remaining` / `Wallet shortfall` / `Thousands` `Direction=RTL` | Contains `Keypad / Amount hero`, one context block (`Keypad / Presets`, `Keypad / Summary card` `Type=Projection` or `Ledger`, `Keypad / Quick action`) |
| 3 | CTA | `Button` `Variant=primary` `Size=lg`: «استثمر 5,000 ر.س» when valid, «أودع 2,000 ر.س وأكمل» on shortfall | Label tracks the amount |
Rules: multiples of 1,000 up to 500,000 per payment; explain every rejection while typing.

## 4. Amount entry inside a sheet
`BottomSheet` (`showHandle`, `showHeader`, `showFooter`) → `SheetHeader` «كم تريد أن تستثمر؟» → Content `Sheet Content / Amount` (Input Amount plus Slider) or `Sheet Content / Amount keypad` (np) for the qualified keypad → `SheetFooter` `Layout=Stacked` with one primary «متابعة». Quantity of units instead of money → `NumericStepper` in `Sheet Content / Form`.

## 5. Deals feed
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` (np) `Type=main screens` `Direction=RTL` | |
| 2 | Filter | `SegmentedControl_3` `Style=pill-thumb` `Size=md` `Direction=RTL`: «متاحة» · «قادمة» · «مغلقة» | A value on the same view, not navigation |
| 3 | Featured | `Section` `Size=Lg` «صفقات متاحة الآن» `Has action=true` «عرض الكل»; `Carousel` `Type=Cards` `Size=Md` of `CardDeal` `Layout=Hero` `State=Available` + `PageIndicator` `Style=Dots` | |
| 4 | Rest | vertical stack of `CardDeal` `Layout=Row` | `Qualified=true` only for qualified users |
| 5 | Compliance | `ShariaDisclosure` `Direction=RTL` | |
| 6 | Bottom nav | `TabBar (3-tab)` `Active=1` `Direction=RTL` | |

## 6. Deal list loading and empty
Loading: per card `SkeletonBlock` `Radius=Large` (image), `SkeletonLine` `Size=Large` `Width=3Q` (title), `SkeletonLine` `Size=Small` `Width=Half` (metrics); same count as the real page. Empty after filters: `EmptyState` `Tone=search` with «مسح الفلاتر». Failed: `EmptyState` `Tone=error` with Retry. Nothing open at all: recipe 15.

## 7. Deal page
| # | Slot | Component and values | Notes |
|---|---|---|---|
| 1 | Hero | `Base card` (np) `Platform=Mobile` `State=Expanded` `Direction=RTL`, `Has Subtitle`, `Has Lable`, `Has meta`, `Has developer` | Collapses to `State=Collapsed` on scroll |
| 2 | Badges | `dealTags` inside the hero (`Type=Type7` qualified only; at most one tier `Premium` / `Basic`) | Max two |
| 3 | Status | `IssuanceStatusBadge (Investor)` `Status=` live state `Direction=RTL` | Never a `StatusPill` for lifecycle |
| 4 | Headline numbers | 2 or 3 `Stat` `Size=md` `Layout=vertical` `HasDelta=false` | «نسبة العائد المتوقع» starts with نسبة |
| 5 | Funding | `ProgressBar` `Size=md` `Tone=brand` `showLabel=true` «نسبة التمويل» `72%` `Direction=RTL` | Live value only |
| 6 | Facts | `Section` `Size=Md` «تفاصيل الصفقة» + `KeyValue` rows with `Divider` `Tone=subtle`; one `Emphasis=strong` | |
| 7 | Calculator | Qualified: `Calculator / Duration picker` → `Calculator / Amount card` → `Calculator / Results card` (np). Retail: `Investment Calculator` | Projections «متوقع» |
| 8 | Lifecycle | `Section` «مراحل الصفقة» + `DealTimeline` `Direction=RTL` | One active stage |
| 9 | Guarantees | `Section` «الضمانات» + `Guarantees` `Coverage=` real level | Values from the offering file |
| 10 | Developer | `CardInfo` `Type=Avatar` `Tone=Neutral` | |
| 11 | Updates | `NewsCard / Poster Carousel` (np) or `NewsCard` `Style=Plain` | Only if updates exist |
| 12 | Compliance | `ShariaDisclosure` + `ComplianceBadge` `Type=CMA` | |
| 13 | FAQ | `Accordion` `Style=Plain` of `AccordionItem` `State=Collapsed` | Never fees or risk |
| 14 | Sticky CTA | `Button` `Variant=primary` `Size=lg` «استثمر الآن» with the risk line beside it | The only primary |

## 8. Filter chips above a list
`ScrollContainer` `Axis=horizontal` `fadeEnd=true` → `Tag Group` (published) `Layout=wrap` (or `overflow` in dense rows) holding applied filters as `Tag Removable` (np) `Tone=brand` `Size=md`, plus a `Button` `Variant=tertiary` `Size=md` «الفلاتر» with a leading filter icon (label required, the icon is not universal). The button opens `Filter menu` (web) or a `BottomSheet` with `SelectionList` `Mode=Multi` or `ProvinceSelector` `Selection=Multi` (mobile). Static, non-removable labels are `Tag`, never `Tag Removable`.

## 9. KYC checklist hub
`AppBar` (np) `Type=Inner screens` «توثيق الحساب» → `ProgressBar` `Size=sm` `Tone=brand` `showLabel=true` «اكتمل 3 من 5» → one `Alert` `Tone=warning` `Style=Filled` `showButton=true` only when an item was rejected → `KYCChecklist` `Direction=RTL` with `KYCTaskRow` `State=Completed` / `Current` / `Upcoming` (`AbshirLogo` `Size=24` `Tone=Brand` on the identity task) → `Button` `Variant=primary` `Size=lg` «متابعة».

## 10. KYC bank step
`KYCStep` `Direction=RTL` already composes `Stepper`, `Section`, `Input`, `Alert` and `Button`. Set: Stepper current = Bank; `Section` `Size=Lg` «الحساب البنكي» with one-line description; `Alert` `Tone=info` `Style=Outlined` «يجب أن يكون الحساب باسمك كما في الهوية» before the IBAN field; `Input` IBAN; bank picker `Combobox Field`; footer primary «متابعة», back `Variant=secondary`. IBAN certificate upload: recipe 20.

## 11. Settings list
`AppBar` (np) `Type=Inner screens` «الإعدادات» → per group `ActionList` `Style=Grouped` `Has header=true` (`Has footer=true` for one hint) of `ListItem` rows: navigation `Has leading=true` `Has chevron=true`; value rows `Has value=true` (language «العربية»); toggles `Has toggle=true` (Face ID). Last row's divider off (`Has divider=false`). Sign out: a `ListItem` in its own last group, confirmed by `Dialog` `Tone=destructive`. Not: `List` (read-only), `SelectionList` (choice).

## 12. Notification settings
One master `ListItem` `Has toggle=true` «الإشعارات» at the top, then `ActionList` `Style=Grouped` per topic (الصفقات الجديدة، التوزيعات، تحديثات الحساب) with `ListItem` `Has toggle=true` rows per channel. Switches apply instantly; no Save button. When system permission is off: one `Banner` `Tone=warning` with «فتح الإعدادات». Topics chosen together and saved on submit (onboarding) → `Checkbox Group` instead.

## 13. Payouts list
`AppBar` (np) `Type=Inner screens` «التوزيعات» → `SegmentedControl_2` «القادمة» · «المستلمة» (optional) → per year `Section` `Size=Sm` «2026» with the year total → stacked `Payouts cell` `Direction=rtl` (`Property 1=Upcoming`, `Done - Payout`, `Done - Captial`, `Late`, `Defaulted`, `Partially repaid`...) separated by `Divider`; never one card per row. `Late` and `Defaulted` shown honestly with day counts. Empty → `EmptyState` `Tone=default` «لا توجد توزيعات بعد». Loading → `SkeletonLine` rows.

## 14. Portfolio overview
`PortfolioHeader` `Direction=RTL` `Balance=Shown` / `Masked` (`Show wallet`, `Show returns`, `Show payouts table`) → at most one `Alert` `Tone=warning` `Style=Outlined` → `SegmentedTabs` `Active=1` «استثماراتي النشطة» · «المكتملة» → `Section` `Size=Md` «حسب الحالة» + `Issuance List` of `Issuance Row` `Language=RTL` (`State=Open` lists `CardDeal` `Layout=Row` `State=Invested`) → `Section` «الدفعة القادمة» + one `Payouts cell` `Property 1=Upcoming` → `TabBar (3-tab)`. Returns label says it includes expected profit.

## 15. Empty deals (no open deals right now)
Not an error and not blank: `EmptyState` `Tone=default` `Size=Default` with title «لا توجد صفقات متاحة حالياً» and one line that new deals are on the way; `showButton=true` «فعّل التنبيه» (notify me). Below: `ActionPrompt` `Tone=Brand` for deal alerts (only if the EmptyState button is not used; one CTA), then `Section` «من صفقاتنا الناجحة» + `Carousel` of `CardDeal` `State=Closed` with `dealTags` `Type=Closed` (real outcomes only). Never fake upcoming dates.

## 16. Error banner on a form
Submit failed for the form as a whole → one `Alert` `Tone=error` `Style=Filled` at the top of the form (`title` what happened, `description` what to do, `showButton` only for Retry). Field problems → each field `State=error` with its helper (`Input Helper Text` `Tone=error` or `Form Field Helper` `Tone=error`); focus the first invalid field. Account-wide failure (payout transfer failed) → `Banner` `Tone=error` on the page instead. Never `Toast` for an error the user must fix.

## 17. Destructive confirmation
`Dialog` `Size=sm` `Tone=destructive` `showIcon=true` `showCancel=true` `showDescription=true` `Direction=RTL`: title «إلغاء الحجز؟», description what is lost, confirm label names the action «إلغاء الحجز» (red confirm), cancel «تراجع». Triggered by `Button` `Variant=destructive` or a `MenuItem` `State=destructive`. Not for reversible actions. After success: `Toast` `Tone=success`.

## 18. Reservation hold
`BottomSheet` with `SheetHeader` «تم حجز 50,000 ر.س» and `Sheet Content / Summary` → `Countdown` `Has Lable=true` `Direction=RTL` for windows in days, plus the absolute time «ينتهي الحجز في 15 أكتوبر 2026، 18:00» → persistent `Collapsed-Reservation` `Direction=RTL` (`Has Multi-deals ` for several holds) on the deal page and portfolio → inline `Small Timer` `Property 1=Black` (`Yellow` near the end). Only a real server expiry; say what happens at 00:00; never reset.

## 19. Sign in with phone and OTP
Screen 1: `AppBar` (np) `Type=Onboarding` → title text style + one muted line → `Input Phone` (np) `Size=lg` `State=focus` `Direction=rtl` (+966) → `Button` `Variant=text` «فقدت رقم جوالي» → `Button` `Variant=primary` `Size=lg` «متابعة». Nafath option: `SocialButton` (np) «تسجيل الدخول عبر نفاذ» with `AbshirLogo`. Screen 2: `OTP Input` (np) `Length=4` `State=empty` → `partial` → `complete` / `error`; resend as `Link` (np) or `Button` `Variant=text`; verifying → `Button` `State=loading`. Light sign-in fields elsewhere: `Input Underline` (np).

## 20. Document upload (IBAN certificate, ID)
`Form Field Label` (np) «شهادة الآيبان» → `Upload Button` `State=default` (`Show hint=true` «PDF أو صورة، حتى 5 ميجابايت») → after picking, `File Item with Progress` `State=progress` → `complete` / `uploaded` (View file, remove) or `error` (Retry). Many files: one `File Item with Progress` per file, plus `ProgressSegment` row for «2 من 3».

## 21. Transaction receipt
`AppBar` (np) `Type=Close Icon-Black` → `Illustrations` `Property 1=Chosen checkmark` → title «تم التحويل» → `KeyValue` `Layout=horizontal` rows: «المبلغ» (`Emphasis=strong`), «التاريخ», «الرقم المرجعي» with `HasIcon=true` copy icon; copying confirms with `Toast` `Tone=success` `Size=Small` «تم النسخ». Breakdown with a total → `List` `Style=Description` with `List / DescriptionRow` `Emphasis=Total`. One primary «تم».

## 22. Back-office table with toolbar
| # | Slot | Component and values |
|---|---|---|
| 1 | Toolbar | `Table / Toolbar` `Mode=Default` (search, filter, sort, applied `Tag Removable`); `Mode=Selection` after rows are selected (count plus bulk actions) |
| 2 | Header row | `Table / HeaderCell` per column (`Sort=None` / `Asc` / `Desc`, first column `Has select-all=true`), `Density=Default` or `Compact` |
| 3 | Body | `Table / Cell` one `Type` per column: `Text`, `Numeric` (end-aligned amounts), `Avatar`, `Tag`, `Status` (`IssuanceStatusBadge (Internal)` or `StatusPill`), `Trend`, `Progress`, `Select` |
| 4 | Row actions | `Table / ActionCell` (cite 3320:262 or 3351:197) with overflow `Menu` |
| 5 | Footer | `Pagination` `Type=table` (rows per page plus «1-10 من 200») |
| 6 | Filters panel | `Drawer` `Side=` trailing edge, Content `Sheet Content / Form`, `SheetFooter` `Layout=Row` (Apply, Reset) |
| 7 | States | loading `SkeletonLine` rows; empty `EmptyState` `Size=Compact` `Tone=search`; error `Alert` `Tone=error` above the table |
Mobile instead of a table: rows as cards with `KeyValue`, filters in `Filter menu` or `Bottom-sheet menu`.

## 23. Back-office app shell
`AppSidebar (shadcn-style)` `Variant=Standard` `Mode=Expanded` (`Collapsed` on dense screens) `Direction=LTR` or `RTL` with `NavRail / TeamSwitcher`, search, `NavRailItem` groups, `NavRail / NavUser` → page header with `Breadcrumb` `Type=full` (3 or more levels) and title → `Chart / KPI strip` (or a grid of `Stat`) → content (recipe 22). Command search → `Command palette`. Plain rail without workspace or search → `NavigationRail` (np).

## 24. Overflow actions on a card or row
Trigger: `MenuTrigger` `Glyph=kebab` (vertical) or `meatball` with an accessible label. Web: `Dropdown menu` `Placement=bottom-end` `Direction=rtl` holding `Menu` of `MenuItem` (destructive item last, below a `Divider`, `State=destructive`). Mobile: `Action sheet` (a few actions plus Cancel) or `Bottom-sheet menu` (grouped). Long-press may add `Long-press preview`, never as the only path. Table rows: `Table / ActionCell`.

## 25. Help and FAQ
`AppBar` (np) `Type=Inner screens` «المساعدة» → `Search Input` (np) to filter questions → per topic `Section` `Size=Md` + `Accordion` `Style=Boxed` of `AccordionItem` `State=Collapsed` (max about 5 per group) → `CardInfo` `Type=Avatar` `Tone=Brand` «تحتاج مساعدة؟ تحدث مع مستشارك» → contact actions as `ListItem` `Has chevron`. No results → `EmptyState` `Tone=search`.

## 26. NPS feedback sheet
`BottomSheet` `showHandle=true` → `SheetHeader` «ما مدى احتمال أن توصي بصفقة لصديق؟» → `RatingScale` `Direction=RTL` (anchors «غير محتمل إطلاقاً» / «محتمل جداً») → optional `TextArea` (np) «ما السبب؟» with `Show Counter` only if limited → `SheetFooter` primary «إرسال», secondary «لاحقاً». After sending: `Toast` `Tone=success` «شكراً لملاحظاتك».

## 27. Maturity and reinvest sheet
`BottomSheet` → Content `Reinvest / MaturityRecap` (np) `Direction=RTL` (orbit, «اكتمل استثمارك في مدماك», returned amount with `MoneyAmount`, capital / profit / realised return `KeyValue`, equal Reinvest and Keep buttons, `Show withdraw` when relevant) → Reinvest opens `Reinvest / RecommendationList` (published, up to 3 `Reinvest / RecommendationRow` with `Reinvest / ComparedTo` and the not-advice disclaimer) or `Reinvest / RecommendationCarousel` (`State=Card 1` / `Card 2`). Never «مناسبة لك» or "recommended for you"; prefill with capital only; keep Reinvest and Keep at equal weight exactly as the organism ships them (never restyle one louder).

## 28. Portfolio chart card on mobile
`Section` `Size=Md` «أداء محفظتك» → `SegmentedControl_5` `Style=pill-thumb` `Size=sm` «شهر · 3 أشهر · 6 أشهر · سنة · الكل» → `Chart / Line · Mobile` `Direction=RTL` `State=Default` (time still runs left to right, Western digits, currency with the Riyal icon) → states `Chart / States` `State=loading` / `empty` / `error`. Desktop: `Chart / Line` (4153:3047) inside the same section. One KPI only → `Stat`.

## 29. Payment method choice
`AppBar` (np) `Type=Inner screens` «إيداع في المحفظة» → `Input Amount` (np) `Size=lg` → `SelectionList` `Mode=Single` `Has header=true` «طريقة الدفع» of `SelectRow` `Type=Radio` (mada with leading `MadaLogo` `Size=24` `Tone=Brand`, Apple Pay, bank transfer; `Has value=true` hint «فوري» / «1-2 يوم عمل») → `Form Field Helper` `Tone=info` for a limit → `Button` `Variant=primary` `Size=lg` «متابعة» disabled until a method is chosen. Inside the legacy invest flow the equivalent is `Checkout` (`Method=ApplePay` / `Bank-transfer` / `Credit-card`).

## 30. Home quick actions and nudge
`AppBar` (np) `Type=main screens` (or `Header Info` when the investor has returns) → at most one `Banner` (KYC or IBAN verification reminder with «توثيق») → `ActionTile` grid `Style=Vertical` `Size=Default` (إيداع، سحب، كشف الحساب) → one `ActionPrompt` `Tone=Warning` for a must-do task, or `MilestoneProgress` `Size=Large` for profile completion → `Section` + `Carousel` of `CardDeal` → `TabBar (3-tab)` `Active=1`. Never a Banner and an ActionPrompt for the same task.

## Sources
- `references/data/components-descriptions.json`, page guides in `references/data/components/`
- Safqah screen patterns (deal list, deal page, invest and reserve, KYC, portfolio, wallet, payment, onboarding) in the Syntropy knowledge base
