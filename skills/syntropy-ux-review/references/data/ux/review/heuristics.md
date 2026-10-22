# Nielsen's 10 heuristics for Safqah

Jakob Nielsen's 10 usability heuristics, explained for a Saudi, Sharia-compliant investment app that is Arabic and RTL first, with two concrete Safqah examples each (one violation and its fix). Use when self-reviewing a design or build, together with `fintech-heuristics.md` and `states.md`; report findings with `review-format.md`.

## Rules
1. Review every screen of the flow against all 10, then the fintech set. Why: heuristics overlap; a single pass misses issues that only show across screens.
2. Every finding names the heuristic number (H1 to H10), the screen, the evidence and a fix using Syntropy components. Why: a finding without a fix is not actionable.
3. Rate severity 0 to 4 (`review-format.md`). Money, KYC and payment problems start at 3. Why: in fintech, confusion costs money and trust.

## H1 Visibility of system status
The app always tells investors what is happening, within a reasonable time. In Safqah this is mostly about money in motion: payments, reservations, payouts, KYC review.

| | Example |
| --- | --- |
| 1 | Violation: after «تأكيد الدفع» the button just disables for 8 seconds. Fix: `Button State=loading`, then a status screen: `StatusPill Tone=info` «قيد المعالجة» with «عادةً خلال 5 دقائق», then «تم الاستثمار بنجاح». |
| 2 | Violation: KYC submitted, home screen looks unchanged for 2 days. Fix: `Banner Tone=info` on home «بياناتك قيد المراجعة · نُبلغك خلال يوم عمل» and `KYCChecklist` showing the step as in review. |

## H2 Match between system and the real world
Use the words Saudi investors use, in natural Arabic, and real-world conventions (Hijri or Gregorian dates as the user expects, SAR after the amount, Sharia terms explained).

| | Example |
| --- | --- |
| 1 | Violation: «تم تنفيذ عملية الاسترداد للأصل» for a payout. Fix: «وصلتك أرباح الريم 46: 1,833.33 ر.س». |
| 2 | Violation: English jargon in Arabic UI: «IRR المتوقع» with no explanation. Fix: «معدل العائد الداخلي المتوقع» with an info `Tooltip` (tap) giving one plain sentence; percentages labelled with «نسبة» where they show a %. |

## H3 User control and freedom
Investors need clear exits: back out of a flow, cancel a reservation within the allowed window, undo non-financial actions.

| | Example |
| --- | --- |
| 1 | Violation: the investment amount `BottomSheet` has no close button and swipe-down is the only exit. Fix: `SheetHeader` with close, scrim tap closes, and `BackButton` returns to the deal page keeping the typed amount. |
| 2 | Violation: removing a saved bank account is instant and final. Fix: `Dialog Tone=destructive` «حذف الحساب البنكي؟» with the masked IBAN, or a `Toast` with «تراجع» for 5 seconds when the business allows. |

## H4 Consistency and standards
Same words, icons, colours and placement for the same thing everywhere; follow iOS and Android conventions and Syntropy components.

| | Example |
| --- | --- |
| 1 | Violation: the wallet is «المحفظة» on home, «الرصيد» in checkout, «حسابي» in settings. Fix: one term from `knowledge/content/`, one icon. |
| 2 | Violation: green `Button Variant=primary` means "invest" on one screen and "skip" on another. Fix: `Variant=primary` only for the main forward action; skip uses `Variant=text`. |

## H5 Error prevention
Design so mistakes cannot happen, especially with money: constrain inputs, show consequences before committing, confirm irreversible actions.

| | Example |
| --- | --- |
| 1 | Violation: amount field accepts 100,000 when the available balance is 4,250 and fails only at the bank. Fix: `Input Amount` hint «المتاح 4,250.00 ر.س», inline error before submit, quick chips limited to valid values. |
| 2 | Violation: withdrawal goes straight to an old bank account. Fix: summary step shows destination bank and masked IBAN («ينتهي بـ 1234»), amount, fee, arrival date before «تأكيد السحب». |

## H6 Recognition rather than recall
Show options and context; do not make users remember numbers or terms from a previous screen.

| | Example |
| --- | --- |
| 1 | Violation: checkout asks to confirm without showing the deal name, return or duration chosen two screens earlier. Fix: `Sheet Content / Summary` with `KeyValue` rows: الفرصة، المدة، نسبة العائد المتوقع، المبلغ. |
| 2 | Violation: «أدخل رمز الإحالة» with no hint of where to find it. Fix: helper text «تجده في رسالة الدعوة» and paste support. |

## H7 Flexibility and efficiency of use
Speed paths for frequent investors without hurting first-timers: saved amounts, reinvest, biometrics, back-office shortcuts.

| | Example |
| --- | --- |
| 1 | Violation: every reinvestment repeats the full calculator flow. Fix: `Reinvest / RecommendationCard` with «إعادة الاستثمار» prefilled with the payout amount, still ending on the summary step. |
| 2 | Violation: back-office operators must click through 3 menus to find an investor. Fix: `Command palette` (Ctrl/Cmd+K) and `Search Input` in the header. |

## H8 Aesthetic and minimalist design
Each screen shows what the decision needs and nothing else: label, control, at most one short hint. Extra alerts and banners hide the important one.

| | Example |
| --- | --- |
| 1 | Violation: deal page stacks 3 `Banner`s, 2 `Alert`s and a promo `Toast`. Fix: one `Banner` for the most important state; the rest move to the relevant `Section`. |
| 2 | Violation: `CardDeal` shows 9 metrics. Fix: 3 decision metrics (نسبة العائد المتوقع، المدة، نسبة التمويل) on the card; the rest on the deal page. |

## H9 Help users recognise, diagnose and recover from errors
Plain-language errors that say what happened and what to do next, without codes or blame, and keep the user's work.

| | Example |
| --- | --- |
| 1 | Violation: «Error 4012: transaction declined». Fix: `Alert Tone=error` «رفض البنك العملية. جرّب بطاقة أخرى أو تواصل مع بنكك» with «إعادة المحاولة» and the amount kept. |
| 2 | Violation: IBAN name mismatch shows «تعذر التحقق» and stops. Fix: explain the mismatch and offer the two paths: add an account in your name, or upload the IBAN certificate (`Upload Button`). |

## H10 Help and documentation
Help is findable in context and in the same place (WCAG 3.2.6): explain Sharia structure, fees, risk and timelines where the question arises.

| | Example |
| --- | --- |
| 1 | Violation: fee explanation exists only in an FAQ web page. Fix: info `Tooltip` next to «رسوم الإدارة» on the summary with one sentence and «اعرف المزيد عن الرسوم». |
| 2 | Violation: help moves between the top bar, a floating button and the bottom of settings. Fix: one help entry («تواصل معنا») in the same position on every screen that offers it. |

## Quick self-check

| H | Ask |
| --- | --- |
| H1 | Does every money action show pending, success and failure with times? |
| H2 | Would a first-time Saudi investor understand every word without a dictionary? |
| H3 | Can I leave every step without losing data or committing money? |
| H4 | Same term, icon and component for the same thing on every screen? |
| H5 | Can I enter an impossible amount, date or account? |
| H6 | Is everything I need to decide visible on this screen? |
| H7 | Is there a shorter path for repeat actions that still ends in a review step? |
| H8 | Can any element be removed without hurting the decision? |
| H9 | Does every error say what happened and what to do, and keep my input? |
| H10 | Is help in context and in a consistent place? |

## Sources
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/
