# Research recipes

Step-by-step research plans for common Safqah design tasks. Each recipe names the tools (2 max, plus Syntropy), the exact queries, what to extract, and where it lands in Syntropy. Tool details are in the per-tool guides in this folder.

Every recipe starts the same way: write the question in one sentence, then check `knowledge/components/index.json` and the Syntropy file (`figma-mcp.md`) for an existing component.

## 1. Designing a new flow
- Question: "What steps do investing apps use for X, and where do users drop?"
- Tools: Refero flows, Mobbin flows.
- Queries: `refero_search_flows` `{"query": "<task> with <key step>", "platform": "ios"}`, then `refero_get_flow` on the 2 best IDs; `mcp__mobbin__search_flows` `{"query": "<task>", "platform": "ios", "limit": 3}`.
- Extract: step count, entry point, decision points, the review step, success state, failure and retry path, what is deferred until later.
- Lands in: a step map using `Stepper` or `StepIndicator`, `Header`, `Button`, `BottomSheet`, success via `EmptyState` layout.

## 2. Improving conversion of a step
- Question: "Which change raises completion of step X?"
- Tools: Lazyweb experiments, Lazyweb screens (same `agentic_search_id`).
- Queries: `lazyweb_search_experiments` `{"query": "<step> <goal>"}`, then `lazyweb_search_screens` `{"query": "<step>", "platform": "mobile"}`.
- Extract: control vs variant, the single change, measured direction, whether the mechanic is ethical at Safqah.
- Lands in: one or two falsifiable hypotheses for the product team, each with a Syntropy-only mockup. Never a Growth Report unless asked.

## 3. Visual style direction (marketing web)
- Question: "What visual direction should safqah.co use for page X?"
- Tools: Refero styles, Best Designs On X (browser).
- Queries: `refero_search_styles` with 3 angles: `premium fintech investing website with restrained typography`, `real estate investment platform editorial`, `trust-led wealth brand light theme`; `refero_get_style` on 3 picks.
- Extract: one primary direction, its signature traits, 1 or 2 borrowed details, token roles (accent discipline, surface hierarchy).
- Lands in: Syntropy tokens only (`bg/brand/primary` as the one accent, `bg/surface`, `border/subtle`, `display` and `heading` text styles). Never source colors or fonts.

## 4. Copy for an error
- Question: "What should this error say and offer?"
- Tools: Baymard (browser), Mobbin screens.
- Queries: Baymard articles on inline validation and error messages; `mcp__mobbin__search_screens` `{"query": "<field> error state with inline validation message", "platform": "ios", "limit": 6}`.
- Extract: placement (inline vs banner), what caused it, how to fix, whether input is preserved.
- Lands in: `Input Helper Text` or `Form Field Helper` in error state, `Alert` or `Banner` only for page-level errors. Copy: what happened plus what to do, in Arabic first, no blame, no em dash.

## 5. Back-office table
- Question: "How should ops scan, filter and act on records of type X?"
- Tools: Nicelydone (or Refero web), SaaSFrame (browser).
- Queries: `admin data table with filters, status badges and bulk actions`; `record detail side panel with activity log`.
- Extract: default columns, sort, filters, bulk actions, row action placement, detail view (drawer vs page), empty and loading states.
- Lands in: `Table / Toolbar`, `Table / HeaderCell`, `Table / Cell`, `Table / ActionCell`, `Pagination`, `Filter menu`, `Drawer`, `StatusPill`, `SkeletonLine`.

## 6. Arabic RTL check of a pattern
- Question: "Does this pattern survive mirroring and Arabic text?"
- Tools: Mobbin screens with Saudi app names, `arabic-rtl` links (browser).
- Queries: `mcp__mobbin__search_screens` `{"query": "Al Rajhi <screen>"}` or `Tamara <screen>`; Material 3 bidirectionality page.
- Extract: what mirrors (layout, directional icons, progress), what does not (numbers, IBAN, charts time axis, media controls), text expansion, line height.
- Lands in: Syntropy components in their RTL variant as the locale dictates; Western digits; currency after the amount; time axes left to right.

## 7. Regulated disclosure
- Question: "How do we show a required disclosure without hiding it or overwhelming the screen?"
- Tools: `regulation` links (SAMA, CMA), Refero screens.
- Queries: CMA offers of securities and crowdfunding rules; `refero_search_screens` `{"query": "investment risk disclosure before purchase", "platform": "ios"}`.
- Extract: exact required statements (from the regulation or Notion source, never from a gallery), placement before commitment, acknowledgement pattern.
- Lands in: `ShariaDisclosure`, `ComplianceBadge`, `CardInfo`, `Checkbox` for acknowledgement, `Accordion` for the full text. Disclosure stays visible; never smaller than `caption / 12`.

## 8. Empty state
- Question: "What should a user see when there is nothing here yet, and what should they do next?"
- Tools: Mobbin screens, Refero screens.
- Queries: `empty portfolio screen prompting first investment`; `empty state no investments yet with call to action`.
- Extract: whether the empty state explains why (no data vs no supply vs error), one next action, what preview of value is shown.
- Lands in: `EmptyState` with `Empty Illustration / default / Default` (or `search`, `error`), one `Button`. If the cause is "no open deals", say so plainly; do not look like a failure.

## 9. Onboarding
- Question: "What is the shortest honest path from install to first value?"
- Tools: Refero flows, ScreensDesign.
- Queries: `onboarding fintech with KYC and phone verification`; `finance app onboarding with notification permission primer`.
- Extract: what is asked before vs after first value, permission timing, progress display, skip options.
- Lands in: `Carousel` (value screens, optional), `Input Phone`, `OTP Input`, `KYCChecklist`, permission primer then `BottomSheet` reminder then system alert.

## 10. Dashboard and charts
- Question: "What does an investor need to see first on the portfolio screen?"
- Tools: Mobbin screens, Refero screens.
- Queries: `investment portfolio dashboard with total balance, returns and holdings list`; `portfolio performance chart with time range tabs`.
- Extract: hero number, change display, range selector, breakdown, holdings list, hide-balance control.
- Lands in: `PortfolioHeader` (`MoneyAmount`, `BalanceToggle`, `ReturnsDisplay`), `SegmentedControl_5`, `Chart / Area · Mobile` or `Chart / Donut · Mobile`, `ActionList`. Apply the `tufte` and `dataviz` skills; semantic chart colors only.

## 11. Deal page
- Question: "What must an investor understand before investing in a deal?"
- Tools: Mobbin screens, browser benchmarks (Stake, Fundrise, CrowdStreet from `benchmarks.md`).
- Queries: `investment product detail with expected return, minimum amount and invest button`; Stake and CrowdStreet public deal pages.
- Extract: order of information (return, term, risk, funding progress, documents), sticky CTA, timeline, guarantees.
- Lands in: `HeaderCard`, `CardDeal / Metric`, `KeyValue`, `ProgressBar`, `DealTimeline`, `Guarantees`, `Distribution-schedule`, `ComplianceBadge`, sticky `Button`.

## 12. Invest and reserve flow
- Question: "How do we confirm an investment so the user knows exactly what happens to their money?"
- Tools: Refero screens and flows.
- Queries: `investment order confirmation with amount summary and confirm button`; `buy investment with amount entry, review and confirmation`.
- Extract: amount entry method, review content, fees, cancel window, success with next date.
- Lands in: `Investment-amount`, `Keypad / Amount hero`, `BottomSheet` with `Sheet Content / Summary`, `KeyValue`, `Checkout`, `Countdown` (reservation, real deadline only), `Button`.

## 13. Wallet and cash-out
- Question: "How do users withdraw with confidence about destination, fees and timing?"
- Tools: Mobbin flows, Refero flows.
- Queries: `withdraw money from investment account to bank`; `withdraw money to bank account with review and estimated arrival`.
- Extract: destination shown with the amount, "withdraw all" shortcut, fee line, arrival estimate, status after submit.
- Lands in: `Input Amount`, `WalletChip`, `ListItem` (bank row), `Link`, `KeyValue`, `StatusPill`, `Toast`. Show the reinvest option at payout time, never as a blocker on the withdraw screen.

## 14. Notifications and permission
- Question: "When and how do we ask for push permission, and how do users control it?"
- Tools: Lazyweb experiments, Mobbin screens.
- Queries: `push permission primer`; `notification settings with channel toggles grouped by category`.
- Extract: timing (after value), primer content, decline path, settings grouping.
- Lands in: primer screen, reminder `BottomSheet`, `ActionList` of `ListItem` with `Switch`, global `Switch` at top.

## 15. KYC document upload
- Question: "How do we get a clear document on the first try?"
- Tools: Mobbin screens, Refero flows.
- Queries: `KYC identity document upload screen with photo capture instructions`; `fintech KYC onboarding with identity verification`.
- Extract: tips before capture, an exit for users without the document, encryption reassurance, review and retake, confirm extracted data, failure and retry.
- Lands in: `KYCStep`, `KYCTaskRow`, `Upload Button`, `File Item with Progress`, `BottomSheet` with `Sheet Content / List` for tips, `Banner` for failure.

## 16. Goals
- Question: "How do we help a user set and track an investment goal honestly?"
- Tools: Mobbin screens, browser benchmarks (Betterment, Qapital, Acorns).
- Queries: `savings goal detail with progress ring and target date`; `goal setting onboarding with target amount`.
- Extract: goal creation steps, progress display, projection wording, what happens off track.
- Lands in: `GoalActivate`, `GoalTracker`, `Goal / PhaseRow`, `GoalChart`, `ProgressBar`. Projections are labeled as estimates, never promises.

## 17. Payouts and distributions
- Question: "How do users see what they were paid, when, and what comes next?"
- Tools: Mobbin screens, Refero screens.
- Queries: `transaction history list grouped by month with incoming payments`; `dividend payout history list with dates and amounts`.
- Extract: grouping, status per payout, upcoming vs paid, totals.
- Lands in: `Payouts cell`, `Distribution-schedule`, `Section`, `StatusPill`, `Reinvest / MaturityRecap`.

## Sources
- Tool guides in this folder; real queries run 2026-10-15 (see `refero.md`, `mobbin.md`)
- `knowledge/components/index.json`
