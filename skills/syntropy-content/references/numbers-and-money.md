<!-- syntropy-lint-disable eastern-arabic-numerals, percent-label-nisba -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Numbers and money in copy

How to write digits, SAR amounts, decimals, percentages, signs, ranges, durations and dates in Safqah copy. Open this whenever a string contains a number. For how numbers behave inside RTL layout (isolation, phone and IBAN rendering, Hijri display), see the syntropy-rtl-arabic skill.

## Rules
1. **Western digits (0-9) in both languages.** Never ٠١٢٣٤٥٦٧٨٩ or ۰۱۲۳۴۵۶۷۸۹ on anything the user transacts with; Eastern digits only in an editorial or ceremonial context that explicitly asks for them.
   Why: Saudi banking convention; one digit system avoids misreads.
2. **Comma for thousands, full stop for decimals**, in Arabic too: `1,250.50`. Never «٬» or «٫».
   Why: consistency with Saudi banking displays.
3. **Currency after the amount**: `1,250.50 ر.س` / `1,250.50 SAR`. In amount components the riyal symbol follows the number the same way. Never `SAR 1,250.50`, never «SR», never «ريال» in UI amounts (long-form sentences may say «ريال سعودي»).
   Why: one placement rule; built defaults that show the code first (`SAR 1,200`) are overridden.
4. **Two decimals for transactional money**: balances, investment amounts, payments, deposits, cash-outs, fees, payouts, receipts.
   Why: transactions are exact to the halala.
5. **Whole numbers allowed for projections, goals and rules**: `100,000 ر.س` goal, «الحد الأدنى للاستثمار 1,000 ر.س», «بمضاعفات 1,000 ر.س».
   Why: false precision on a projection implies a guarantee.
6. **One decimal for percentages**, `%` right after the number with no space: `8.5%`, `16.0%`. Round from the unrounded value to one decimal (`13.75%` displays as `13.8%`, `7.55%` as `7.6%`); never drop to whole numbers (`8%` for `7.6%` is wrong). Show more decimals only where a legal document requires the exact figure.
   Why: T2, precise on numbers.
7. **«نسبة» starts every Arabic percentage label.** Exceptions: SAR amounts, IRR («معدل العائد الداخلي»), coverage status labels.
   Why: signals a ratio before the number.
8. **Signs before digits**: `+4.2%`, `-2.5%`. Pair colour with the sign and, for screen readers, with words («ارتفاع»، «انخفاض»).
   Why: colour alone is not accessible; signs never move in RTL.
9. **Projected values say «متوقع» / "expected"**, and show net (after fees) as the headline with gross available.
   Why: CMA; net is what the investor receives.
10. **Never hardcode a limit, fee or rate** in copy. Use the backend value or a `{placeholder}`.
    Why: limits depend on investor classification and change.

## Amount formats
| Context | Arabic | English | Notes |
|---|---|---|---|
| Wallet balance | `12,480.75 ر.س` | `12,480.75 SAR` | Two decimals |
| Investment confirmed | «تم استثمار 5,000.00 ر.س» | "5,000.00 SAR invested" | Two decimals |
| Payment CTA | «ادفع 5,000.00 ر.س» | "Pay 5,000.00 SAR" | Two decimals |
| Fee line | «رسوم الإدارة: 1% من الربح المتوقع · 213.33 ر.س · تُخصم عند التوزيع» | "Management fee: 1% of expected profit · 213.33 SAR · deducted at distribution" | Rate and amount both shown |
| Goal target | `100,000 ر.س` | `100,000 SAR` | Whole number |
| Minimum rule | «الحد الأدنى للاستثمار 1,000 ر.س» | "Minimum investment 1,000 SAR" | Whole number rule |
| Remaining limit | «المتبقي من حدك الاستثماري {remaining_limit} ر.س» | "Remaining limit {remaining_limit} SAR" | From backend |
| Payment cap (non-qualified) | «حتى 500,000 ر.س للدفعة» | "up to 500,000 SAR per payment" | Product cap; value still comes from backend |
| Compact large figure (marketing, stats) | «1.2 مليار ر.س» | "1.2B SAR" | Never in a transaction; define and date platform stats |
| Compact in a chart axis | «30 مليون» | "30M" | Axis labels only |

Large-number words in Arabic: ألف (thousand), مليون (million), مليار (billion). Do not use «ك» or «م» abbreviations in Arabic UI.

## Percentage formats
| Do | Don't |
|---|---|
| «نسبة العائد المتوقع 8.5%» | «العائد المتوقع 8.5%», «نسبة العائد المتوقع %8.5», «٨٫٥٪» |
| «نسبة صافي العائد المتوقع 12.3%» | «صافي العائد 12.3%» |
| «صافي العائد 18,333.00 ر.س» | «نسبة صافي العائد 18,333.00 ر.س» |
| «معدل العائد الداخلي 15.2%» | «نسبة العائد الداخلي 15.2%» |
| «نسبة العائد المتوقع 16.0% سنوياً» | «عائد مضمون 16%» |
| `+4.2%` with an up arrow and «ارتفاع 4.2 بالمئة» for screen readers | Green `4.2%` with no sign |

Annualised versus total: say which. «سنوياً» / "per year" for annual rates; «للمدة كاملة» / "for the full term" for totals. Never show an annual rate where a total is meant.

## Ranges
Arabic copy reads ranges best in words, which also avoids bidi reordering of hyphenated ranges:
| Do | Don't |
|---|---|
| «من 1,000 إلى 5,000 ر.س» / "1,000 to 5,000 SAR" | «1,000 - 5,000 ر.س» (may render reversed in RTL) |
| «المبلغ بين 1,000 و100,000 ر.س» | «المبلغ بين 1,000 و 100,000 ريال» |
| «1-2 يوم عمل» (short, built pattern) | «يوم إلى يومين عمل تقريباً ربما» |

## Durations and counts
- In running sentences use grammatical Arabic counted forms: «شهر واحد»، «شهران»، «3 أشهر»، «12 شهراً». In compact metric values the built shorthand «12 شهر» is accepted.
- Build counted strings with ICU plural rules (Arabic has zero, one, two, few, many, other), never by concatenation. See `arabic-writing.md`.
- Days: «خلال 3 أيام» / "in 3 days"; «يوما عمل» / "2 business days".

## Dates and times
- Financial events (payouts, maturity, statements, distribution schedules, cancellation deadlines) use Gregorian; religious dates (Ramadan, Eid, Zakah due) use Hijri.
- Format: day, month name, year: `15 مارس 2026` / `15 Mar 2026`; Hijri `1 رمضان 1447`. Never `15/03/2026` in copy.
- Times: 24-hour or with «ص»/«م», consistent per product; deadlines always as an absolute time next to any countdown: «ينتهي الحجز في 15 أكتوبر 2026، 18:00».
- Expected dates say so: «متوقع 7 يناير 2027» / "Expected 7 January 2027".
- Full display and bidi rules: syntropy-rtl-arabic (`numbers-dates.md`).

## Phone numbers, IBANs, references
- Phone: `0541234567` or `+966 54 123 4567`, never reversed. Hint format «5X XXX XXXX».
- IBAN: groups of four, `SA03 8000 0000 6080 1016 7519`; always fully visible on a transfer screen with a copy action.
- Reference numbers: shown in full with copy: «الرقم المرجعي C-20261015-0042».
- Masked card: «•••• 1234», spoken «ينتهي بـ 1234».

## Sources
- `references/data/content/numbers-currency.md` (Notion Stage 1-3 Principles numerals section; «نسبة» owner decision).
- `references/data/components/amount-input.md`, `stat.md`, `investment-calculator.md`, `qualified-calculator.md`.
- Syntropy patterns: invest and reserve, payment. Compliance guidance: CMA (limits, expected returns), SAMA (fee lines).
