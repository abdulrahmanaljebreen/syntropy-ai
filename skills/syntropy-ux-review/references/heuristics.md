# Nielsen's 10 heuristics, applied to Safqah

Jakob Nielsen's 10 usability heuristics for a Saudi, Sharia-compliant investment product that is Arabic and RTL first. Each heading has what to look for, a typical Safqah violation and the Syntropy fix. Open during step 3 of a full review; score findings with `review-format.md`. Long form: `data/ux/review/heuristics.md`.

## Rules
1. Check every screen of the flow against H1 to H10, then the fintech set (`fintech-heuristics.md`). Why: heuristics overlap; one pass misses cross-screen issues.
2. Every finding names the heuristic (H1 to H10), the screen, concrete evidence and a fix with exact Syntropy components, variants, tokens or copy. Why: a finding without a fix is not actionable.
3. Money, KYC and payment problems start at severity 3. Why: confusion costs money and trust.
4. Judge the design, not the designer. Write findings as observations, never as blame. Why: reviews must be easy to accept.

## H1 Visibility of system status
Look for: feedback on every tap within 100ms, pending and processing states for money in motion (payments, reservations, payouts, KYC review), time estimates.
- Violation: after «تأكيد الدفع» the button just greys out for 8 seconds.
- Fix: `Button State=loading`, then a status view with `StatusPill Tone=info` «قيد المعالجة» and «عادةً خلال 5 دقائق», then «تم الاستثمار بنجاح».
- Violation: KYC submitted, home looks unchanged for 2 days. Fix: `Banner Tone=info` «بياناتك قيد المراجعة · نُبلغك خلال يوم عمل» and `KYCChecklist` showing the step in review.

## H2 Match between system and the real world
Look for: natural Saudi Arabic, real-world conventions (Gregorian by default, Hijri where expected), SAR after the amount, Sharia terms explained, no English jargon in Arabic UI.
- Violation: «تم تنفيذ عملية الاسترداد للأصل» for a payout. Fix: «وصلتك أرباح الريم 46: 1,833.33 ر.س».
- Violation: «IRR المتوقع». Fix: «معدل العائد الداخلي المتوقع» with an info `Tooltip` (tap) of one plain sentence.

## H3 User control and freedom
Look for: a clear exit from every step, back without losing input, cancellation windows, undo for non-financial actions.
- Violation: the amount `BottomSheet` has no close button; swipe-down is the only exit. Fix: `SheetHeader` with a labelled close, scrim tap closes, `BackButton` keeps the typed amount.
- Violation: removing a bank account is instant. Fix: `Dialog Tone=destructive` «حذف الحساب البنكي؟» naming the masked IBAN, or `Toast` with «تراجع» where the business allows.

## H4 Consistency and standards
Look for: one term, one icon, one component per concept; platform conventions; `Button Variant=primary` only for the main forward action.
- Violation: the wallet is «المحفظة» on home, «الرصيد» in checkout, «حسابي» in settings. Fix: one glossary term (see syntropy-content).
- Violation: primary green means "invest" on one screen and "skip" on another. Fix: skip uses `Button Variant=text`.

## H5 Error prevention
Look for: constrained inputs, limits shown before typing, consequences shown before committing, confirmation of irreversible actions.
- Violation: amount field accepts 100,000 with a 4,250 balance and fails at the bank. Fix: `Input Amount` hint «المتاح 4,250.00 ر.س», inline error before submit, quick chips limited to valid values.
- Violation: withdrawal goes straight to an old account. Fix: summary with bank, «ينتهي بـ 1234», amount, fee, arrival date before «تأكيد السحب».

## H6 Recognition rather than recall
Look for: everything needed to decide is on the current screen.
- Violation: confirm screen omits the deal, return and duration chosen earlier. Fix: `Sheet Content / Summary` with `KeyValue` rows: الفرصة، المدة، نسبة العائد المتوقع، المبلغ.
- Violation: «أدخل رمز الإحالة» with no hint. Fix: helper «تجده في رسالة الدعوة» and paste support.

## H7 Flexibility and efficiency of use
Look for: shortcuts for repeat investors and operators that still end in a review step.
- Violation: every reinvestment repeats the full calculator. Fix: `Reinvest / RecommendationCard` with «إعادة الاستثمار» prefilled, ending on the summary.
- Violation: operators click 3 menus to find an investor. Fix: `Command palette` (Ctrl/Cmd+K) and `Search Input`.

## H8 Aesthetic and minimalist design
Look for: label, control, at most one short hint; at most one `Banner` or `Alert` per screen; three decision metrics on cards.
- Violation: 3 `Banner`s, 2 `Alert`s and a promo `Toast` on the deal page. Fix: one `Banner` for the most important state; the rest move into their `Section`.
- Violation: `CardDeal` shows 9 metrics. Fix: نسبة العائد المتوقع، المدة، نسبة التمويل on the card; the rest on the deal page.

## H9 Help users recognise, diagnose and recover from errors
Look for: plain language, what happened + what to do, no codes or blame, input kept, whether money moved.
- Violation: «Error 4012: transaction declined». Fix: `Alert Tone=error` «رفض البنك العملية. جرّب بطاقة أخرى أو تواصل مع بنكك» with «إعادة المحاولة», amount kept.
- Violation: IBAN mismatch shows «تعذر التحقق» and stops. Fix: explain the mismatch; offer both paths (account in your name, or IBAN certificate via `Upload Button`).

## H10 Help and documentation
Look for: help in context (fees, Sharia structure, risk, timelines) and in the same place on every screen (WCAG 3.2.6).
- Violation: fee explanation only in a web FAQ. Fix: info `Tooltip` beside «رسوم الإدارة» and «اعرف المزيد عن الرسوم».
- Violation: help moves between top bar, floating button and settings. Fix: one «تواصل معنا» entry in the same position.

## Quick self-check

| H | Ask |
| --- | --- |
| H1 | Does every money action show pending, success and failure, with times? |
| H2 | Would a first-time Saudi investor understand every word? |
| H3 | Can I leave every step without losing data or committing money? |
| H4 | Same term, icon and component for the same thing everywhere? |
| H5 | Can I enter an impossible amount, date or account? |
| H6 | Is everything I need to decide visible here? |
| H7 | Is there a shorter path for repeat actions that still ends in review? |
| H8 | Can any element be removed without hurting the decision? |
| H9 | Does every error say what happened, what to do, and keep my input? |
| H10 | Is help in context and in a consistent place? |

## Sources
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/
- `data/ux/review/heuristics.md`
