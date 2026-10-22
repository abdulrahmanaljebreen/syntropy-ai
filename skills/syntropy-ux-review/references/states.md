# The 19-state checklist

Every Safqah screen is designed and built in all the states it can be in, not only the happy path. This is the list of 19 states, when each applies, the Syntropy component that handles it and what must be true. Open during step 2 of a full review. Long form: `data/ux/review/states.md`.

## Rules
1. For each screen, mark every state: designed or built (yes/no), or N/A with a one-line reason. Why: missing states are the most common production bug class.
2. Use the named Syntropy component. There is no component called "Loader": loading uses `Skeleton*`, `Spinner*`, `ProgressBar_Indeterminate` or `Button State=loading`. Why: one look and behaviour.
3. Layout stays stable between states: skeletons match the final layout; errors replace content in place. Why: jumps disorient and break screen-reader position.
4. Each state is accessible: loading announced once, errors announced, empty states have a heading and one action. Why: WCAG 4.1.3, 1.3.1.
5. Copy is minimal: title, at most one line of description, one action. Why: Safqah minimal copy rule.
6. A missing state on a money, KYC or payment screen is severity 3; elsewhere severity 2 (3 if users get stuck). Why: stuck users on money screens lose money or trust.

## The 19 states

| # | State | When | Syntropy component | Must have |
| --- | --- | --- | --- | --- |
| 1 | Empty | nothing exists yet (no investments, no open deals) | `EmptyState Tone=default` (`Size=Default` or `Compact`) with `Empty Illustration / default / *` | title saying what is empty and why; one helpful action («استكشف الفرص»); not mistakable for an error |
| 2 | Empty search or filter | query returns nothing | `EmptyState Tone=search` | query echoed; «مسح الفلاتر» |
| 3 | Loading, first load | structure known | `SkeletonLine`, `SkeletonBlock`, `SkeletonCircle`, `SkeletonAvatar` | matches final layout; announced once; static under reduced motion |
| 4 | Loading, action | a button started work | `Button State=loading`, `IconButton State=loading` | width kept; double submit blocked; «جارٍ المعالجة» in semantics |
| 5 | Loading, long or unknown | upload, payment processing, export | `SpinnerRing`, `ProgressBar`, `ProgressBar_Indeterminate` | text saying what is happening; estimate if over 5 seconds |
| 6 | Refreshing | pull to refresh | `Pull-to-refresh` | refresh also possible without the gesture |
| 7 | Partial | some data loaded, some failed | `Alert Tone=warning` or `Tone=error` (`Style=Plain` or `Outlined`) inside the failed `Section`; `Skeleton*` for pending parts | rest of screen usable; retry scoped to the failed part |
| 8 | Error, screen level | main content failed | `EmptyState Tone=error` with `Empty Illustration / error / *` | plain cause; «إعادة المحاولة»; support link with reference |
| 9 | Error, inline or field | validation | `Input State=error` + `Input Helper Text` / `Form Field Helper`; `Alert Tone=error` summary for long forms | what is wrong + how to fix |
| 10 | Error, blocking decision | payment failed, session expired, action not allowed | `Dialog` (`Tone=destructive` only for destructive choices) or `BottomSheet` | what happened, whether money moved, one primary action |
| 11 | Offline | no connection | `Banner Tone=warning` «لا يوجد اتصال بالإنترنت»; cached content with its time | money actions disabled with a reason, not hidden; auto-recover with a `Toast` |
| 12 | Success, inline | saved, copied | `Toast Tone=success` | announced; never the only record of a money event |
| 13 | Success, money event | investment confirmed, withdrawal requested | full success screen or `BottomSheet`: heading, amount, reference, next step | values identical to the summary (F7); «عرض التفاصيل»; no confetti |
| 14 | Disabled | action not available yet | `Button State=disabled`, `Input State=disabled` | reason next to it («أكمل التحقق من الهوية لتتمكن من الاستثمار»); prefer enabled + explain on tap |
| 15 | First use | feature never used | `EmptyState` with a teaching line, `CardInfo`, or `Carousel` intro (no auto-advance) | one first action; skippable; not repeated after dismissal |
| 16 | Permission denied (OS) | notifications, camera for KYC | `BottomSheet` primer before the OS prompt; after denial `Banner Tone=info` or `CardInfo` «فتح الإعدادات» | benefit explained; unrelated features never blocked |
| 17 | Not eligible or restricted | KYC incomplete, classification limits, AML restriction | `Alert Tone=info` or `Tone=warning`, link to `KYCStep` | what is restricted, why in one line, how to resolve |
| 18 | Closed or expired | deal funded or closed, reservation expired | `StatusPill Tone=neutral` «مغلقة»; `EmptyState` with alternatives | no dead buttons; alternatives offered |
| 19 | Maintenance or degraded | partial outage | `Banner Tone=warning` | which feature, until when |

Warnings use the warning tone; red (`Tone=error`) only for real failures or critical states.

## Copy into the review

```markdown
| # | State | Applies | Designed/built | Component | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Empty | | | EmptyState Tone=default | |
| 2 | Empty search | | | EmptyState Tone=search | |
| 3 | Loading first | | | SkeletonLine / SkeletonBlock | |
| 4 | Loading action | | | Button State=loading | |
| 5 | Loading long | | | SpinnerRing / ProgressBar | |
| 6 | Refreshing | | | Pull-to-refresh | |
| 7 | Partial | | | Alert in Section | |
| 8 | Error screen | | | EmptyState Tone=error | |
| 9 | Error inline | | | Input State=error | |
| 10 | Error blocking | | | Dialog / BottomSheet | |
| 11 | Offline | | | Banner Tone=warning | |
| 12 | Success inline | | | Toast Tone=success | |
| 13 | Success money | | | success screen | |
| 14 | Disabled | | | Button State=disabled + reason | |
| 15 | First use | | | EmptyState / CardInfo | |
| 16 | Permission denied | | | BottomSheet primer / Banner | |
| 17 | Not eligible | | | Alert + KYCStep | |
| 18 | Closed / expired | | | StatusPill Tone=neutral | |
| 19 | Maintenance | | | Banner Tone=warning | |
```

## Data edge cases to try in every state
- Long Arabic deal names (2 lines plus), long developer names, English names inside Arabic.
- Very large amounts (`12,345,678.90 ر.س`), zero (`0.00 ر.س`), losses.
- One item, many, hundreds (`Pagination` or an infinite-scroll footer state).
- Text at 200%, Dark mode, RTL and LTR.
- Slow network (3G) and a timeout after 15 seconds.

## Examples
- Do: payouts fail, portfolio loads: inline `Alert Tone=error` «تعذّر تحميل التوزيعات» with «إعادة المحاولة» inside the Distributions `Section`. Don't: full-screen error hiding balances that did load.
- Do: no open deals: `EmptyState` «لا توجد فرص متاحة حاليًا» with «نبّهني عند طرح فرصة جديدة». Don't: an empty list that looks broken.

## Sources
- https://www.nngroup.com/articles/empty-state-interface-design/
- https://www.w3.org/WAI/WCAG22/quickref/#status-messages
- `data/ux/review/states.md`, `data/components-index.json`
