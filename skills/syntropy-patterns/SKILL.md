---
name: syntropy-patterns
description: Assembles Safqah screens and flows from Syntropy components using proven screen patterns, so an agent can spec a correct, complete screen fast. Use whenever someone asks to design, build, spec, wireframe or review a Safqah or Syntropy screen or flow: deal page, deals tab, invest and reserve, amount entry, review sheet, payment and wallet top-up, bank transfer and IBAN, KYC and Absher, onboarding, sign-in, OTP, Face ID, account recovery, wallet, withdraw and cash-out, IBAN name mismatch, portfolio, payouts and distribution schedule, goals, empty states, errors and offline, forms, notification settings and permission primers, settings and profile, back-office tables with filters, charts and dashboards. Gives the universal screen recipe (AppBar, Section, sticky Button, TabBar, surfaces bg/surface, bg/base, bg/elevated), the five required states, flow maps (sign-up to first investment, invest to payout to reinvest or cash-out, KYC) and gap workarounds. Triggers: screen, flow, layout, شاشة, تدفق.
---

# Syntropy patterns: how Safqah screens are built

## Purpose
Turn a screen request into a complete, buildable Safqah screen spec in minutes: the right pattern, the exact Syntropy components and props, every state, Arabic-first copy, and the compliance points at money and data moments. Every pattern here is a proven composition; start from it, adapt it, and never improvise a layout or a component that Syntropy does not have.

## Hard rules
1. **Start from a pattern when one fits.** Match the request to one of the 17 patterns (table below) and open its reference before drawing anything. Combine patterns for flows; never start from a blank canvas when a pattern exists.
   Why: patterns encode decisions already made with research, Compliance and engineering; re-deciding them produces drift.
2. **Every screen follows the universal recipe.** Status bar, `AppBar` (right `Type`), at most one `Banner` or `Alert`, content regions led by `Section`, one sticky primary `Button` on task screens, `TabBar` only on top-level screens and never with a sticky CTA. Surfaces: `bg/surface` canvas, `bg/base` content area, `bg/elevated` cards, sheets and modals; `bg/overlay` scrim only. Side padding `space/lg`, regions `space/2xl` apart, gap inside a region `space/md`.
   Why: one rhythm and one elevation ladder across the product; values live in tokens, never pixels.
3. **One primary action per screen.** Exactly one `Button` `Variant=primary`; the escape is `Variant=secondary` or `Variant=text`, same `Size`. Sheets: one primary in the `SheetFooter`.
   Why: two primaries split attention and many users pick neither.
4. **Design all five states for every screen and every region:** loading (skeletons shaped like the content, after 200ms), empty (`EmptyState` with the `Tone` chosen by cause), error (values kept, one recovery action), success, disabled (with the reason visible). "It's a prototype" does not remove states; it may shorten them to one line each.
   Why: a missing state ships as a blank or broken screen.
5. **RTL first.** Arabic layout is canonical; set `Direction` on every directional component exactly as the set spells it (`RTL`, `rtl`, `Language=RTL`). Digits, phone numbers, IBANs and chart time axes never mirror. Progress fills from the right; step 1 is on the right.
   Why: most Safqah users read Arabic; mirrored numbers are misread money.
6. **Minimal copy.** A label, the control, at most one short hint. Arabic first, Western digits, currency after the amount (`5,000.00 ر.س`), «نسبة» on percentage labels, verbs on buttons that name the commitment. Never the em dash character.
   Why: the restraint of shipped Safqah screens; numbers must win the page.
7. **Compliance notes at every money and data point.** Before any commit button: risk line, fees (with VAT, taken from profit) and net return, projections labelled «متوقع». Consent and acknowledgements are separate unticked `Checkbox` rows, never bundled into one. Limits come from the backend (`{remaining_limit}`), never hardcoded. Mark every regulated string "Confirm with Compliance".
   Why: CMA disclosure, SAMA consumer protection and PDPL apply at exactly these points.
8. **Warning is not error.** Late payment, IBAN name mismatch, action needed: `Tone=warning`. Red `Tone=error` only for failures and defaulted deals.
   Why: red must keep its meaning.
9. **Never invent components, variants or props.** Use only names in `references/data/components-index.json`. When something is missing, use the workaround in `references/gaps.md` and tell the person about the gap in a visible "Gaps" line.
   Why: invented names cannot be built or linted; silent workarounds become forks.
10. **No dark patterns.** No countdowns except real deadlines (with the absolute time beside them), no scarcity counts unless live and true, no "are you sure" retention modals on withdraw, no confirmshaming declines, no «مناسبة لك» / "recommended for you".
    Why: T6 anti-pressure rules and CMA suitability rules.
11. **Empty is not error.** No open deals is a neutral waiting state (`EmptyState` `Tone=default`, «أنشئ تنبيهاً»), filters returning nothing is `Tone=search` with «مسح الفلاتر», a failed load is `Tone=error` with «إعادة المحاولة». Never reuse one message for another cause.
    Why: deal supply is intentionally thin; an error-looking empty tab reads as the app failing.
12. **Say whether money moved.** Every payment, withdrawal or investment failure states where the money is now; unknown outcomes say «نتحقق من حالة الدفع» and hide retry until resolved. Pending is never shown as success.
    Why: a wrong "try again" causes double payments.

## Workflow
1. **Clarify only what blocks you**: who (retail or qualified investor, operator), where (app compact, app regular, web, back-office), the job of the screen. If the request is clear, proceed without an interview.
2. **Match the screen job to a pattern** with the table "Screen job to pattern" below. For a flow, list the patterns in order using the flow maps.
3. **Open `references/universal-recipe.md`** and lay down the slots: `AppBar` `Type`, page message, content regions, footer or `TabBar`.
4. **Open the pattern reference** (for example `references/deal-page.md`). Copy its layout recipe slot by slot with exact component names, props and tokens. Keep its copy examples (Arabic first).
5. **Adapt** to the request: remove regions that have no data (never show them empty), add only components that exist. Confirm names and props in `references/data/components-descriptions.json` and `references/data/components-index.json`; look at `references/data/examples/<page>/reference.png` when you need to see a component.
6. **Check the five states** with the pattern's "Required states" table; write each one. For empty regions open `references/empty-states.md`; for failures open `references/errors-and-recovery.md`; for any input open `references/forms.md`.
7. **Check compliance** at every money and data point with the pattern's "Compliance notes", then apply the syntropy-compliance-ux skill rules (fees and returns, risk statements, consent, anti-pressure). Mark regulated wording "Confirm with Compliance".
8. **Check accessibility** with the pattern's "Accessibility notes" and the syntropy-accessibility skill (contrast pairs, 48x48 targets, labels, focus, live regions). Check RTL with syntropy-rtl-arabic and copy with syntropy-content.
9. **Record gaps** from `references/gaps.md` in a "Gaps" line.
10. **Hand over** using the screen spec template in `references/universal-recipe.md`. For Figma builds use syntropy-figma; for Flutter or web code use syntropy-code-adapters; for a review of an existing screen use syntropy-ux-review.

## Screen job to pattern

| The person asks for... | Pattern reference | Not this |
|---|---|---|
| One deal's details, deal detail, صفحة الصفقة, invest button on a deal | `deal-page.md` | `deal-list.md` |
| Deals tab, list of deals, open / upcoming / closed, filters on deals, home deals region | `deal-list.md` | `backoffice-tables.md` |
| Amount entry, keypad, reserve a deal, review / confirm investment, investment success | `invest-and-reserve.md` | `payment.md` |
| Top up wallet, pay by Mada / Apple Pay / bank transfer, IBAN to pay into, payment failed | `payment.md` | `wallet-and-cash-out.md` |
| Verify identity, Absher / Nafath, KYC hub, suitability, document upload, rejection fix | `kyc.md` | `forms.md` alone |
| Welcome, sign-up, sign-in, phone + OTP, passcode, Face ID offer, lost phone number | `onboarding-and-sign-in.md` | `kyc.md` |
| Wallet balance, activity, bank accounts, withdraw, cash-out, IBAN name mismatch | `wallet-and-cash-out.md` | `payment.md` |
| Portfolio tab, holdings by status, returns header, allocation | `portfolio.md` | `payouts.md` |
| Payouts list, payout details, distribution schedule, expected payout date, late / defaulted payout | `payouts.md` | `DealTimeline` alone |
| Investment goal setup, goal tracker, «رحلتي» | `goals.md` | `charts-and-dashboards.md` |
| Anything with zero items: no deals, no payouts, no results, first use | `empty-states.md` | `errors-and-recovery.md` |
| Error messages, offline, retry, failed action, which feedback component | `errors-and-recovery.md` | `empty-states.md` |
| Any form: profile edit, bank details, KYC fields, filter sheet, back-office form | `forms.md` | `Switch` lists |
| Notification settings, push permission primer, reminder sheet, OS permission denied | `notifications-and-permissions.md` | `settings-and-profile.md` |
| Settings tab, profile, security, language, sign out, close account | `settings-and-profile.md` | `forms.md` alone |
| Back-office list, queue, investors / deals / transactions table, filters, bulk actions | `backoffice-tables.md` | a mobile list |
| Chart, KPI strip, returns over time, allocation donut, dashboard | `charts-and-dashboards.md` | `Stat` for one number |

## Pattern index

| Pattern | Job of the screen | Main components | Key states |
|---|---|---|---|
| `deal-page.md` | Let an investor understand one deal and decide to invest | `Base card` (HeaderCard), `dealTags`, `IssuanceStatusBadge (Investor)`, `Stat`, `ProgressBar`, `KeyValue`, `Distribution-schedule`, `DealTimeline`, `Guarantees`, `CardInfo`, `ShariaDisclosure`, `ComplianceBadge`, `Alert` (risk), `Button` | Available, Reserved (`Collapsed-Reservation`), Invested («عرض استثماري»), Closed (CTA hidden), fully funded (CTA disabled «اكتمل التمويل»), qualified-only for retail (disabled + helper), not found |
| `deal-list.md` | Browse deals; never look broken when supply is thin | `AppBar` `main screens`, `SegmentedControl_3`, `Tag Group`, `Section`, `Carousel`, `CardDeal` (`Layout=Hero` / `Row`), `ActionPrompt`, `EmptyState`, `TabBar` | No open deals (waiting, `Tone=default`), filters empty (`Tone=search`), alert set but no match (`Alert` warning), error, sold out in place (`State=Closed`) |
| `invest-and-reserve.md` | Choose an amount, reserve honestly, confirm, see success | `Input Amount`, `Keypad / Amount input`, `Sheet Content / Amount keypad`, `WalletChip`, `Countdown`, `Small Timer`, `Collapsed-Reservation`, `BottomSheet`, `SheetHeader`, `Sheet Content / Summary`, `List / DescriptionRow`, `Checkbox`, `SheetFooter` | Empty, Not multiple, Above cap, Above remaining, Wallet shortfall («أودع 2,000 ر.س وأكمل»), submitting, submit failed (amount kept), reservation expiry, deal filled during entry |
| `payment.md` | Fund the wallet and show the payment result | `Input Amount`, `SelectionList`, `SelectRow`, `MadaLogo`, `Checkout`, `Payment-details`, `Promo-code`, `KeyValue` (IBAN with copy), `SpinnerRing`, `Toast` | Method limited / unavailable, processing, declined (nothing charged), unknown outcome (poll), transfer pending (not success), credited |
| `kyc.md` | Verify identity and suitability (CMA KYC) with clear progress | `KYCChecklist`, `KYCTaskRow`, `KYCStep`, `Stepper`, `ProgressBar`, `AbshirLogo`, `Upload Button`, `File Item with Progress`, `Alert` | New (0 of 5), in progress, Absher failure, locked, rejected item (warning, jump to it), under review, verified |
| `onboarding-and-sign-in.md` | Get a person into their account fast and safely | `AppBar` `Onboarding`, `Input Phone`, `OTP Input`, `BottomSheet` (Face ID offer), `Illustrations`, `Toast`, `EmptyState` | Phone invalid, OTP wrong (digits kept), OTP expired, resend cooldown, locked, recovery outcomes as toasts, risk review (neutral) |
| `wallet-and-cash-out.md` | See balance, manage bank accounts, withdraw, fix name mismatch | `Stat`, `MoneyAmount`, `BalanceToggle`, `ButtonGroup`, `ActionList`, `ListItem`, `StatusPill`, `Input Amount`, `Tag Group`, `BottomSheet`, `Upload Button`, `File Item with Progress` | Masked balance, zero balance, no bank account (`ActionPrompt`), amount above available, submitted («قيد التحويل», never completed), name mismatch (warning), certificate rejected |
| `portfolio.md` | Show what the investor owns, earned and what is next | `PortfolioHeader`, `SegmentedTabs`, `Issuance List`, `Issuance Row`, `CardDeal` `State=Invested`, `Chart / Donut · Mobile`, `Payouts cell`, `TabBar` | Never invested, completed tab empty, holdings failed (header stays), masked, late (warning) and defaulted (error) rows |
| `payouts.md` | Show every distribution, its state and expected date | `SegmentedControl_3`, `Stat`, `Section`, `Payouts cell`, `Distribution-schedule`, `Calculator / Installment row`, `TimelineRow` | Upcoming, `Done - Payout`, `Done - Captial`, `Early paid`, `Disabled Early paid`, `Late`, `Defaulted`, `Partially repaid`, `Partial principal`, empty, error |
| `goals.md` | Set a goal and track progress without promising returns | `GoalActivate`, `GoalTracker`, `Goal / PhaseRow`, `Goal / Amount`, `SelectionList`, `Input Amount`, `ActionTile`, `List / DescriptionRow`, `ProgressBar` | No goal (`Phase=Begining` is the empty state), setup started, `Early` / `Active` / `Complete` / `Overachieved`, save failed, amount above retail limit |
| `empty-states.md` | Explain why a region is empty and give one next step | `EmptyState`, `Illustrations`, `Sheet Content / Empty`, `Chart / States`, `Search Dropdown` | First use, no results, error, waiting (Safqah supply), action blocked by KYC (route to blocker) |
| `errors-and-recovery.md` | Say what went wrong and how to continue | `Input` `State=error`, `Form Field Helper`, `Alert`, `Banner`, `Toast`, `Dialog`, `StepIndicator`, `EmptyState` | Field error, multi-field summary, section failure, page failure, offline, payment outcome known / unknown / charged-but-failed |
| `forms.md` | Collect structured data with the right control and timing | `Form Field`, `Input`, `TextArea`, `Select`, `Combobox Field`, `Date Input`, `Radio Group`, `Checkbox Group`, `Checkbox`, `ProvinceSelector`, `Upload Button` | Loading edit form, submitting, field errors (on blur), summary `Alert`, saved toast, government-sourced fields disabled |
| `notifications-and-permissions.md` | Choose notifications; ask OS permission at the right moment | `ListItem` `Has toggle`, `Switch`, `ActionList`, `Section`, `Banner`, `BottomSheet`, `ButtonGroup` | Global off (all disabled-off), OS denied (banner, push disabled-off), mandatory (disabled-on), toggle save failed (revert + toast) |
| `settings-and-profile.md` | See and edit account, security, preferences | `ListItem`, `Avatar`, `StatusPill`, `ActionList`, `Section`, `Banner`, `CardInfo`, `Dialog`, `Button` `Variant=text` | Action needed banner, verified / needs action, save failed, close account blocked, destructive confirm |
| `backoffice-tables.md` | Find, compare and act on many records on web | `NavigationRail`, `Breadcrumb`, `Table / Toolbar`, `Table / HeaderCell`, `Table / Cell`, `Table / ActionCell`, `Filter menu`, `Tag Removable`, `Pagination`, `Drawer`, `Dialog` | Loading (keep toolbar), no data, filters empty, error, selection mode, bulk partial failure, permission-hidden actions |
| `charts-and-dashboards.md` | Show numbers over time or share of a whole, honestly | `Chart / ChartContainer`, chart families (`Chart / Line · Mobile` and others), `Chart / Axis`, `Chart / Legend`, `Chart / ChartTooltip`, `Chart / States`, `SegmentedControl_4`, `Stat` | `State=loading`, `empty`, `error`, `Hover`, `Group hover`, masked (shape only) |

## Choosing the feedback component (quick table)

| Need | Use | Not |
|---|---|---|
| One field invalid | `Input` (or `Input Amount`, `Select`) `State=error` + helper with the fix | `Toast`, `Dialog` |
| Part of a screen failed | `Alert` `Tone=warning` inside that region with «إعادة المحاولة» | A full error page |
| Whole region failed to load | `EmptyState` `Tone=error` + «إعادة المحاولة» | Blank screen, «حدث خطأ» alone |
| Persistent account-level issue | One `Banner` at the top with the fix button | Several stacked banners |
| Background failure the user can ignore | `Toast` `Tone=error` `Size=Small` (no actions) | `Alert` |
| Irreversible or financial confirmation | `BottomSheet` summary with a verb button naming the amount; `Dialog` `Tone=destructive` only for destructive acts | `Dialog` with «موافق» / «نعم» |
| Nothing to show yet | `EmptyState` by cause (see rule 11) | An apology, a sad emoji |

## Flow maps

### Sign-up to first investment
| # | Step | Pattern | Key components | Must not miss |
|---|---|---|---|---|
| 1 | Welcome (first launch) | `onboarding-and-sign-in.md` | `AppBar` `Type=Onboarding`, one value line, «English» `Link` | No return promises; concrete facts only («يبدأ الاستثمار من 1,000 ر.س») |
| 2 | Phone | `onboarding-and-sign-in.md` | `Input Phone` `Size=lg` +966, «متابعة», «فقدت رقم جوالي» | Terms and privacy links on sign-up; consent is an action |
| 3 | OTP | `onboarding-and-sign-in.md` | `OTP Input` `Length=4`, real resend cooldown | Digits kept on error; auto-submit |
| 4 | Passcode, then Face ID offer | `onboarding-and-sign-in.md` | `Sheet Content / Amount keypad`-style keypad (see gaps), `BottomSheet` «ادخل أسرع ببصمة الوجه» / «ليس الآن» | Only with biometrics enrolled; decline is a peer |
| 5 | KYC hub | `kyc.md` | `KYCChecklist`, `ProgressBar` «اكتمل 0 من 5» | First task `Current`, others `Upcoming` |
| 6 | Absher, details, suitability, bank, documents | `kyc.md` + `forms.md` | `KYCStep`, `Stepper`, `Radio Group`, `Upload Button` | One topic per screen; name-match rule before the IBAN field; no pre-selected answers |
| 7 | Under review, then verified | `kyc.md` + `empty-states.md` | `EmptyState` «طلبك قيد المراجعة»; success «تم توثيق حسابك» + «ابدأ الاستثمار» | Expected time stated |
| 8 | Notification primer | `notifications-and-permissions.md` | Full-screen primer, «فعّل التنبيهات» / «ليس الآن» | OS dialog only after yes |
| 9 | Deals tab | `deal-list.md` | `CardDeal`, four regions | No open deals is a waiting state |
| 10 | Deal page | `deal-page.md` | `Base card`, `Stat`, `KeyValue`, compliance, sticky «استثمر الآن» | Risk line and fees before the CTA |
| 11 | Amount | `invest-and-reserve.md` | `Input Amount` / `Keypad / Amount input` | Rule hint before the error; limits from the backend |
| 12 | Wallet shortfall top-up (if needed) | `payment.md` | `SelectionList` of methods, `Checkout`, «ادفع 5,000.00 ر.س» | Returns to the review sheet with a `Toast` |
| 13 | Review sheet | `invest-and-reserve.md` | `Sheet Content / Summary`, separate unticked acknowledgement `Checkbox` rows, «تأكيد الاستثمار» / «تعديل المبلغ» | Primary disabled until every acknowledgement is ticked |
| 14 | Success | `invest-and-reserve.md` | `Illustrations` `Chosen checkmark`, «تم استثمار 5,000.00 ر.س في الحجاز ريفيرا», «عرض استثماري» | No confetti, no emoji |

### Invest to payout to reinvest or cash-out
| # | Step | Pattern | Key components | Must not miss |
|---|---|---|---|---|
| 1 | Invested, holding appears | `portfolio.md` | `Issuance Row` Reserved / Confirmed, `CardDeal` `State=Invested` | Secondary line per status («يبدأ ~20 مايو 2026») |
| 2 | Active, schedule visible | `payouts.md` + `deal-page.md` | `Distribution-schedule`, `Payouts cell` `Upcoming` | Count equals rows; sums reconcile |
| 3 | Periodic payouts received | `payouts.md` | `Payouts cell` `Done - Payout`; push names amount and deal | «متوقع» on upcoming amounts |
| 4 | Maturity | `payouts.md` | Final row date = maturity + 15 days «متوقع ~7 يناير 2027» | One approximate date, never a range |
| 5 | Late or defaulted (if it happens) | `payouts.md` + `portfolio.md` | `Late` (warning) «السداد متأخر. نتابع مع المطور.»; `Defaulted` (error) | Late counts from the window end; no reassurance that recovery will succeed |
| 6 | Capital returned, the payout moment | `wallet-and-cash-out.md` | `Payouts cell` `Done - Captial`, `Reinvest / MaturityRecap` with reinvest and keep as equal choices | The decision is made here; never «مناسبة لك» |
| 7a | Reinvest | `deal-list.md` → `deal-page.md` → `invest-and-reserve.md` | Behavioural wording («لأنها تشبه استثمارك في ...») | Same disclosures as a first investment |
| 7b | Cash out | `wallet-and-cash-out.md` | `Input Amount` + presets «كامل الرصيد» / «النصف», review sheet «يصلك» exact net, «تأكيد السحب» | No retention modal; status «قيد التحويل», never completed early |
| 8 | Name mismatch (if the bank account fails) | `wallet-and-cash-out.md` | `StatusPill` `Tone=warning` «مطلوب إجراء», `Alert` «اسم صاحب الحساب لا يطابق اسمك في الهوية», upload «أرفق شهادة الآيبان» or «استخدام حساب آخر باسمك» | Warning tone; resumable; withdraw disabled with one helper line linking to the fix |

### KYC
| # | Step | Pattern | Key components | Must not miss |
|---|---|---|---|---|
| 1 | Hub | `kyc.md` | `AppBar` «توثيق الحساب», `ProgressBar`, `KYCChecklist` of `KYCTaskRow` | The first incomplete task is the CTA «متابعة» |
| 2 | Identity (Absher / Nafath) | `kyc.md` | `AbshirLogo` on the task, hand-off, `SpinnerRing` «جارٍ التحقق من بياناتك» | Prefilled government data read-only with a hint |
| 3 | Personal and employment (CMA fields) | `kyc.md` + `forms.md` | `KYCStep`, `Input`, `Combobox Field`, `Radio Group`; conditional UBO identity under the question | Never drop or merge CMA fields |
| 4 | Financial profile and suitability | `kyc.md` + `forms.md` | `Radio Group` / `SelectionList` `Mode=Single` | No pre-selected answers; never nudge toward a higher tier |
| 5 | Bank account | `kyc.md` + `wallet-and-cash-out.md` | `Alert` `Tone=info` «يجب أن يكون الحساب باسمك كما في الهوية» before the IBAN field | Rule shown before submit |
| 6 | Documents (only when needed) | `kyc.md` | `Upload Button` (formats hint), `File Item with Progress` progress / uploaded / error | Inline retry, file kept, no toast |
| 7 | Review and submit | `kyc.md` | Summary with edit links per section, unticked declaration `Checkbox` | PDPL: one line on why data is collected |
| 8 | Under review | `kyc.md` + `empty-states.md` | `EmptyState` `Tone=default` `Size=Compact` + expected time | Push when done |
| 9 | Result | `kyc.md` | Verified: «تم توثيق حسابك» + primer. Rejected: hub with `Alert` `Tone=warning` and the item as `State=Current` + `StatusPill` «مطلوب إجراء» | Rejection jumps to the failing task; other tasks keep their state (no `KYCTaskRow` rejected state, see gaps) |

## Self-check before answering
- [ ] I named the pattern(s) used and followed their layout recipe slot by slot.
- [ ] The `AppBar` `Type` fits the screen; `TabBar` only on top-level screens and never with a sticky CTA.
- [ ] Surfaces: `bg/surface` canvas, `bg/base` content, `bg/elevated` cards and sheets, `bg/overlay` scrim; spacing `space/lg`, `space/2xl`, `space/md`; no raw hex or pixels.
- [ ] Exactly one `Button` `Variant=primary` per screen and per sheet.
- [ ] All five states written: loading, empty (by cause), error (values kept, one action), success, disabled (with the reason).
- [ ] Every component, variant and prop exists in `references/data/components-index.json`, spelled as the set spells it.
- [ ] `Direction` set for RTL; digits, IBANs, phone numbers and time axes not mirrored.
- [ ] Copy is Arabic first, minimal, Western digits, currency after the amount, «نسبة» on percentages, verb buttons that name the commitment, no em dash character.
- [ ] Money screens: risk line, fees with VAT and net return before the commit button; projections «متوقع»; separate unticked acknowledgement checkboxes; limits as backend placeholders; "Confirm with Compliance" marked.
- [ ] Warning tone for late, mismatch and action-needed; red only for failures and defaulted.
- [ ] No fake urgency, no retention friction, no confirmshaming, no «مناسبة لك».
- [ ] Gaps listed in a visible "Gaps" line with the workaround used.
- [ ] I pointed to syntropy-compliance-ux, syntropy-accessibility, syntropy-content or syntropy-rtl-arabic where their checks apply.

## References

| File | Open it when |
|---|---|
| `references/universal-recipe.md` | Every time: the slots, `AppBar` types, surfaces, spacing, the five states and the screen spec template |
| `references/gaps.md` | Something you need is not in the manifest, or a name looks misspelled |
| `references/deal-page.md` | Deal detail screen on app or web |
| `references/deal-list.md` | Deals tab, deal lists, filters, no open deals |
| `references/invest-and-reserve.md` | Amount entry, keypad states, reservation hold, review sheet, investment success |
| `references/payment.md` | Wallet top-up, method choice, bank-transfer instructions, payment outcomes |
| `references/kyc.md` | KYC hub, steps, Absher, documents, under review, rejection recovery |
| `references/onboarding-and-sign-in.md` | Welcome, phone, OTP, passcode, Face ID offer and re-prompt, account recovery |
| `references/wallet-and-cash-out.md` | Wallet, activity, bank accounts, withdraw, IBAN certificate name mismatch |
| `references/portfolio.md` | Portfolio tab, holdings by status, status secondary lines |
| `references/payouts.md` | Payouts list, `Payouts cell` states, payout window rule, distribution schedule |
| `references/goals.md` | Goal setup, plan preview, goal tracker |
| `references/empty-states.md` | Any zero-item region; the Safqah context table of titles, illustrations and actions |
| `references/errors-and-recovery.md` | Choosing the feedback component, validation timing, offline, payment failure |
| `references/forms.md` | Choosing the control, field layout, validation, Arabic labels |
| `references/notifications-and-permissions.md` | Notification settings, permission primer, reminder sheet, OS denied |
| `references/settings-and-profile.md` | Settings home, profile detail, close account |
| `references/backoffice-tables.md` | Back-office tables, toolbar, filters, selection mode, pagination, detail drawer |
| `references/charts-and-dashboards.md` | Picking a chart family, palette and encoding rules, dashboards |

| `references/data/components-index.json` | Confirm a component name, its variants and prop values |
| `references/data/components-descriptions.json` | Confirm what a component is for (useWhen / avoid) before choosing it |
| `references/data/examples/<page>/reference.png` | See what a component looks like (for example `header-card`, `kyc-step`, `empty-state`, `table`) |

Related skills: syntropy-components (picking one component), syntropy-foundations (token values), syntropy-content (copy), syntropy-rtl-arabic (direction rules), syntropy-accessibility, syntropy-compliance-ux, syntropy-figma (building in Figma), syntropy-code-adapters (Flutter and web code), syntropy-ux-review (reviewing a screen), syntropy-inspiration (benchmarks).
