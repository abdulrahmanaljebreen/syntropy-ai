# Screen states checklist

Every Safqah screen is designed and built in all the states it can be in, not only the happy path. This file lists the states, when each applies, the Syntropy component that handles it, and what to check. Use when designing a screen, building it, or reviewing a hand-off.

## Rules
1. Each screen lists its applicable states and shows each one (design) or has a test or story for each one (build). A state marked N/A needs a one-line reason. Why: missing states are the most common production bug class in data-driven screens.
2. Use the Syntropy component named below for each state; component names are exact (`knowledge/components/index.json`). There is no component called "Loader": loading uses `Skeleton*`, `Spinner*` or `ProgressBar_Indeterminate`. Why: one look and behaviour across the app.
3. Keep layout stable between states: skeletons match the final layout; errors replace content in place. Why: layout jumps disorient and break screen-reader position.
4. Each state is accessible: loading announced once, errors announced, empty states have a heading and an action. Why: WCAG 4.1.3, 1.3.1.
5. Copy is minimal: title, at most one line of description, one action. Why: Safqah minimal copy rule.

## The states

| State | When | Syntropy component | Must have |
| --- | --- | --- | --- |
| Empty | no data yet or none exists (no investments, no deals open, no notifications) | `EmptyState` (`Tone=default`, `Size=Default` full screen or `Compact` in a section) with `Empty Illustration / default / *` | title that says what is empty and why; one action that helps («استكشف الفرص»); not mistaken for an error |
| Empty search / filter | search or filters return nothing | `EmptyState Tone=search` | the query echoed; «مسح الفلاتر» action |
| Loading, first load | content structure known | `SkeletonLine`, `SkeletonBlock`, `SkeletonCircle`, `SkeletonAvatar` | matches final layout; `aria-busy` / announced once «جارٍ التحميل»; static under reduced motion |
| Loading, action in progress | a button triggered work | `Button State=loading` (or `IconButton State=loading`) | button keeps width; double submit blocked; label in semantics «جارٍ المعالجة» |
| Loading, unknown structure or long task | upload, payment processing, report export | `SpinnerRing` (default spinner), `ProgressBar` (known progress), `ProgressBar_Indeterminate` | text next to the spinner saying what is happening; time estimate if over 5 seconds |
| Refreshing | user pulls to refresh | `Pull-to-refresh` | refresh also available without gesture (WCAG 2.5.4 equivalent action) |
| Partial | some data loaded, some failed or still loading (portfolio loads, payouts fail) | inline `Alert Tone=warning` or `Tone=error` (`Style=Plain` or `Outlined`) in the failed `Section`; `Skeleton*` for the pending part | rest of the screen usable; retry scoped to the failed part |
| Error, screen level | the main content failed | `EmptyState Tone=error` with `Empty Illustration / error / *`, «إعادة المحاولة» | plain cause; retry; support link with reference |
| Error, inline / field | validation | `Input State=error` + `Input Helper Text` / `Form Field Helper`; `Alert Tone=error` summary for long forms | formula: what is wrong + how to fix (`../accessibility/forms.md`) |
| Error, blocking decision | payment failed, session expired, action not allowed | `Dialog` (`Tone=destructive` only for destructive choices) or `BottomSheet` | what happened, whether money moved, one primary action |
| Offline | no connection | `Banner Tone=warning` at the top («لا يوجد اتصال بالإنترنت») plus cached content marked with its time | money actions disabled with a reason, not hidden; auto-recover when back online with a `Toast` |
| Success, inline | saved settings, copied IBAN | `Toast Tone=success` | announced (live region); not the only record for money events |
| Success, money event | investment confirmed, withdrawal requested | full success screen or `BottomSheet` with heading, amount, reference, next step | receipt values identical to summary (F7); «عرض التفاصيل» |
| Disabled | action not available yet | `Button State=disabled`, `Input State=disabled` | reason shown next to it («أكمل التحقق من الهوية لتتمكن من الاستثمار»); prefer enabled + explain on tap |
| First use | feature never used, onboarding to a section | `EmptyState` with a teaching description, `CardInfo`, or `Carousel` intro (no auto-advance) | one clear first action; skippable; not repeated after dismissal |
| Permission denied (OS) | notifications, camera for KYC, contacts | `BottomSheet` primer before the OS prompt; after denial, `Banner Tone=info` or `CardInfo` with «فتح الإعدادات» | explain the benefit; never block unrelated features |
| Not eligible / restricted | KYC incomplete, investor type limits, AML restriction | `Alert Tone=info` or `Tone=warning`, `KYCStep` link | what is restricted, why in one line, how to resolve |
| Closed / expired content | deal fully funded or closed, reservation expired | `StatusPill Tone=neutral` «مغلقة»; `EmptyState` with alternatives | no dead buttons; alternatives offered |
| Maintenance / degraded service | backend partial outage | `Banner Tone=warning` | which feature, until when |

Warnings use the warning tone; red (`Tone=error`) only for real failures or critical states.

## Per-screen checklist

Copy this into a review and fill it:

```markdown
| State | Applies? | Designed/built | Component | Notes |
| --- | --- | --- | --- | --- |
| Empty | yes/no | yes/no | EmptyState Tone=default | |
| Empty search | | | EmptyState Tone=search | |
| Loading first | | | SkeletonLine/Block | |
| Loading action | | | Button State=loading | |
| Partial | | | Alert (in section) | |
| Error screen | | | EmptyState Tone=error | |
| Error inline | | | Input State=error | |
| Offline | | | Banner Tone=warning | |
| Success | | | Toast / success screen | |
| Disabled | | | Button State=disabled + reason | |
| First use | | | EmptyState / CardInfo | |
| Permission denied | | | BottomSheet primer / Banner | |
```

## Data edge cases to test in every state
- Long Arabic deal names (2 lines plus), long developer names, English names inside Arabic.
- Very large amounts (`12,345,678.90 ر.س`), zero (`0.00 ر.س`), negative or loss values.
- One item vs many items vs hundreds (pagination with `Pagination`, or infinite scroll with a footer state).
- Text at 200% (`../accessibility/dynamic-type.md`), Dark mode, RTL and LTR.
- Slow network (3G) and timeout after 15 seconds.

## Examples
- Do: portfolio with payouts failing shows the portfolio and an inline `Alert Tone=error` «تعذّر تحميل التوزيعات» with «إعادة المحاولة» inside the Distributions `Section`. Don't: a full-screen error that hides the balances that did load.
- Do: no open deals shows `EmptyState` «لا توجد فرص متاحة حاليًا» with «نبّهني عند طرح فرصة جديدة». Don't: an empty list that looks like the app failed.

## Sources
- knowledge/components/index.json (`EmptyState`, `SkeletonLine`, `SkeletonBlock`, `SkeletonCircle`, `SkeletonAvatar`, `SpinnerRing`, `ProgressBar_Indeterminate`, `Pull-to-refresh`, `Alert`, `Banner`, `Toast`, `Dialog`, `BottomSheet`, `CardInfo`)
- https://www.nngroup.com/articles/empty-state-interface-design/
- https://www.w3.org/WAI/WCAG22/quickref/#status-messages
