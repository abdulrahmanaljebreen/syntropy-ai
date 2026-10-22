# Goals

Setting an investment goal (an amount to put to work by a date) and tracking progress with milestones. Read this before building goal setup, the goal tracker card, or the goal hub.

## Job of the screen
Help a retail investor commit to a concrete plan (how much, by when, optionally what for) and see honest progress toward it, measured in money actually invested, never in projected returns.

## When to use
- Goal entry from the Deals or Portfolio header and from the goal hub («رحلتي»).
- Scope today: retail investors only. Qualified investors are served by relationship managers and see no goal entry. Confirm scope with Product before extending.
- Status: the CardGoal (07b) and GoalTracker (08f) pages are `wip` in the manifest. Use the 07b organisms (`GoalActivate`, `GoalTracker`); do not use the legacy 08f sets (`Goal-Card`, `GoalCard`, `Goal card`, `GoalPlan`, `GoalChart`) in new work.

## Flow steps
1. **No goal**: `GoalActivate` `Phase=Begining` invites setup.
2. **Setup** (at most three questions, one per screen): duration («شهري» · «سنوي» · «سنتين» · «5 سنوات»), amount for that duration, optional purpose (house, car, marriage, education, other).
3. **Plan preview**: the amount split into a monthly plan in whole thousands (for example 100,000 a year = 9,000 × 4 months + 8,000 × 8 months), with a monthly reminder offer.
4. **Setup unfinished**: `GoalActivate` `Phase=Started` shows progress through setup.
5. **Active goal**: `GoalTracker` `State=Early` → `Active` → `Complete` → `Overachieved`, phase rows per milestone, nearest milestone first.
6. **Month end**: reminder of the month's plan (real, not guilt-driven).
7. **Goal reached**: plain confirmation and «ابدأ هدفاً جديداً».

## Layout recipe: goal card on a hub or portfolio (RTL)

| # | Slot | Component + key props | Tokens and notes |
|---|---|---|---|
| 1 | Region title | `Section` `Size=Md` «هدفي الاستثماري» `Has action` «التفاصيل» | Gap `space/2xl` above |
| 2 | Before a goal | `GoalActivate` `Phase=Begining` `Direction=RTL` (headline, illustration, `Button`) | One CTA |
| 3 | Setup started | `GoalActivate` `Phase=Started` | Shows setup progress |
| 4 | Informational | `GoalActivate` `Phase=Static` | No CTA |
| 5 | Active | `GoalTracker` `State=Active` `Direction=RTL`: `Goal / Headline`, `Goal / Amount` (`Size=lg` `Tone=Brand`) invested so far, `Goal / Summary`, `Goal / PhaseRow` per milestone (`Percent="0%"` / `50%` / `100%` / `+100%`) | Card `bg/elevated`, `radius/lg`, padding `space/lg` |

## Layout recipe: setup step (RTL)

| # | Slot | Component + key props | Notes |
|---|---|---|---|
| 1 | Top bar | `AppBar` `Type="Close Icon-Black"`, title «هدفك الاستثماري» | |
| 2 | Progress | `ProgressBar` `Size=sm` `Tone=brand` (step 1 of 3) or `Stepper` `Orientation=horizontal` | Fills from the right |
| 3 | Question | heading/22/bold, one line | |
| 4 | Control | Duration: `SelectionList` `Mode=Single` of `SelectRow` `Type=Radio`, or `SegmentedControl_4` `Size=lg`. Amount: `Input Amount` `Size=lg` with helper «بمضاعفات 1,000 ر.س». Purpose: `ActionTile` `Style=Vertical` grid (`State=Selected` on choice) with `Illustrations` icons; «أخرى» opens an icon picker | Optional step has «تخطي» as `Button` `Variant=text` |
| 5 | Plan preview | `List` `Style=Description` with `List / DescriptionRow` rows («9,000 ر.س شهرياً · 4 أشهر», «8,000 ر.س شهرياً · 8 أشهر») and `Emphasis=Total` «100,000 ر.س» | Whole numbers (projection, not a transaction) |
| 6 | Reminder | `ListItem` `Has toggle=true` «ذكّرني شهرياً» (`Switch`) | Default off unless the user opted in to notifications |
| 7 | Footer | `Button` primary «حفظ الهدف» | |

## Required states

| State | Treatment |
|---|---|
| Loading | `SkeletonBlock` `Radius=Large` the size of the `GoalTracker` card |
| Empty | No goal: `GoalActivate` `Phase=Begining` (this is the empty state; do not add an `EmptyState`) |
| Error | Save failed: `Alert` `Tone=error` on the setup screen, answers kept. Card load failed: hide the region and show a `Toast` `Tone=warning` `Size=Small` only if the user opened it |
| Success | Goal saved: return to the hub with `GoalTracker` `State=Early` and a `Toast` `Tone=success` «تم حفظ هدفك». Goal reached: `GoalTracker` `State=Complete`, plain copy, no confetti |
| Disabled | Amount above the retail limit: `Input Amount` `State=error` with the limit; plan rows recalculated to the cap |

Never render `GoalTracker` with zero milestones; fall back to `GoalActivate`.

## Copy
| Slot | Arabic | English |
|---|---|---|
| Entry | «حدد هدفك الاستثماري» | "Set your investment goal" |
| Duration | «شهري» · «سنوي» · «سنتين» · «5 سنوات» | "Monthly" · "Yearly" · "2 years" · "5 years" |
| Progress | «استثمرت 40,000 من 100,000 ر.س» | "Invested 40,000 of 100,000 SAR" |
| Next deal line | «الصفقة القادمة متوقعة في نوفمبر» | "Next deal expected in November" |
| Reached | «حققت هدفك: 100,000 ر.س مستثمرة» | "Goal reached: 100,000 SAR invested" |

## Compliance notes
- A goal is money put to work by a date. Do not project returns into the goal or imply a guaranteed outcome. Confirm with Compliance.
- Achievements and streaks celebrate actions the user controls (investing on plan), never returns, and carry the required regulatory line on achievement surfaces (CMA). Confirm the exact line with Compliance.
- "Next deal" statements are always «متوقع» and come from a real ops estimate; omit them if no estimate exists.
- Salary-deduction or auto-reserve features are optional and removable if Compliance objects; never default them on.
- Retail investment limits cap plan amounts; state the cap in the helper.

## Accessibility notes
- `Goal / PhaseRow` keeps the percentage and status text on every row; green vs grey is never the only signal.
- Read the tracker as «استثمرت 40 بالمئة من هدفك، 40,000 من 100,000 ريال».
- Purpose tiles: one radio group, each tile labelled; illustrations decorative.

## Benchmarks
| App (links.json) | What to learn |
|---|---|
| Acorns | Goal setup in three short questions with a clear monthly plan |
| Qapital | Goals framed around user actions, not market returns |
| Wahed | Sharia-compliant goal language without return promises |
| Drahim (Saudi) | Arabic personal-finance goals and reminders |

## Anti-patterns
- A tracker that shows projected wealth instead of invested money.
- Odd monthly amounts (1,500, 8,334) instead of whole thousands.
- Guilt copy («لا تخسر سلسلتك!») or celebration emojis on financial events.
- Showing the goal entry to qualified investors.
- Using legacy 08f goal sets in new screens.

## Sources
- `knowledge/components/card-goal.md` (GoalActivate 3091:392, GoalTracker 3104:1750, Goal / PhaseRow 3103:1296), `goal-tracker.md` (08f legacy, wip), `list.md`, `card-action.md` (ActionTile 3138:1144), `amount-input.md`.
- Goal centre research: Notion `3881a53e-1a6b-8013-8e5e-f025d4a66007` (14 Oct 2026; retail only; three questions; whole-thousand monthly plan; outcomes-only achievements; the June 2026 goal research is obsolete).
- Voice: `knowledge/content/voice-tone.md` (T3, T6).
