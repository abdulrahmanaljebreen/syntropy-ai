<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# Numbers, currency, percentages and dates

How to write numerals, SAR amounts, separators, decimals, percentages and dates in Arabic and English UI. Read this whenever a string contains a number. These rules are the "locale rule" that `docs/CONVENTIONS.md` refers to.

## Rules

### Numerals
1. Use Western digits (0-9) in both Arabic and English UI. Eastern Arabic digits (٠-٩) only when an editorial or branding context explicitly requires them, and never for amounts users transact with.
   Why: matches Saudi banking apps; one digit system avoids misreads on money.
2. Digits keep their natural left-to-right order inside Arabic text. Phone numbers, IBANs, dates and percentages never reverse (see `knowledge/ux/rtl.md` R2).
   Why: a reversed number is a wrong number.

### Currency (SAR)
3. The currency always comes **after** the amount, in both languages.
   - Arabic text: `1,250.50 ر.س`
   - English text: `1,250.50 SAR`
   - Where the UI renders the Saudi Riyal symbol (amount atoms that use `Icon / riyal`), the symbol follows the number the same way, never before it.
   Why: one placement rule for both locales; matches the Notion currency rule and `AGENTS.md`.
4. Never abbreviate SAR as "SR". Do not mix «ريال» in running UI amounts; use «ر.س» or the riyal symbol. «ريال» is acceptable in long-form sentences only.
   Why: consistent, scannable amounts.
5. Prefer the riyal symbol (`Icon / riyal`) in amount displays where the component supports it; use «ر.س» / "SAR" in plain text strings, notifications and anywhere an icon cannot render.
   Why: the later Notion revision asks for the riyal logo when referring to SAR.
- Note: the earlier Notion copy said "«ر.س» in Arabic, «SAR» in English, always after the amount"; the later copy (`...4215`) says "use the riyal logo when referring to SAR". Both are kept: symbol in amount components, text suffix elsewhere.
- Note: some built component defaults show the code first (`SAR 1,200`, `Minimum investment: SAR 1,000`), and `docs/CONVENTIONS.md` shows `SAR 1,250.00`. These conflict with rule 3; treat them as defaults to override, and write `1,200 SAR`.

### Separators and decimals
6. Thousands separator is a comma, even in Arabic UI: `1,000`. Decimal separator is a full stop: `1,250.50`. Never the Arabic decimal sign (٫) or thousands sign (٬).
   Why: consistency with Saudi banking displays.
7. Transactional amounts (balances, payments, investment amounts, fees, payouts) show two decimals: `1,250.50 ر.س`, `50,000.00 SAR`.
   Why: transactions are exact to the halala.
8. Projections and goals may use whole numbers: `100,000 ر.س`.
   Why: false precision on a projection implies a guarantee.

### Percentages
9. Percentages show one decimal place: `8.5%`. Never round to `8%` when the real rate has decimal precision. The `%` sign follows the number with no space, in both languages.
   Why: T2, precise on numbers.
   - Note: one built default shows `16.00%` (two decimals). Use one decimal unless a regulatory document requires more.
10. **Arabic labels for a percentage value start with «نسبة».** Examples: «نسبة صافي العائد», «نسبة العائد المتوقع», «نسبة الربح», «نسبة الإنجاز». Exceptions:
    - Not for SAR amounts: «صافي العائد» when the value is `18,333 ر.س`.
    - Not for IRR: use «معدل العائد الداخلي» (the «معدل» form).
    - Not for coverage status labels (for example a guarantee coverage state); those keep their status wording.
    Why: tells the reader the value is a ratio, not money, before they reach the number.
11. Signs stay before the digits: `+100%`, `-2.5%`. Do not use colour alone to show positive/negative; pair it with the sign.
    Why: digits and signs never reorder in RTL; colour is not accessible on its own.

### Dates and calendars
12. Choose the calendar by context (R5): financial events (payouts, maturity, statements, distribution schedules) use Gregorian; religious or cultural dates (Ramadan, Eid, Zakah due dates) use Hijri. The user's preferred default is a setting.
    Why: Saudi users live with both calendars.
13. Write dates as day, month name, year, with Western digits:
    | Calendar | Arabic | English |
    |---|---|---|
    | Gregorian | `15 مارس 2026` | `15 Mar 2026` |
    | Hijri | `1 رمضان 1447` | `1 Ramadan 1447` |
    Why: month names avoid the DD/MM vs MM/DD ambiguity. The two Notion examples are `15 Mar 2026` and `1 رمضان 1447`; the other cells follow the same pattern.
14. Phone numbers are written as entered, unspaced or in natural groups, never reversed: `0541234567`.
    Why: R2.

## Examples

| Do | Don't |
|---|---|
| `1,250.50 ر.س` | `ر.س 1,250.50`, `١٬٢٥٠٫٥٠ ر.س` |
| `1,250.50 SAR` | `SR 1,250.5`, `SAR1250.50` |
| «نسبة صافي العائد 13.8%» | «صافي العائد 13.8%» |
| «صافي العائد 18,333 ر.س» | «نسبة صافي العائد 18,333 ر.س» |
| «معدل العائد الداخلي 15.2%» | «نسبة العائد الداخلي 15.2%» |
| «نسبة العائد المتوقع 8.5%» | «عائد يصل إلى 9%» (rounded up) |
| Goal: `100,000 ر.س` | Goal: `100,000.00 ر.س` |
| Payout on `15 مارس 2026` | Payout on `15/03/2026` |
| Ramadan banner `1 رمضان 1447` | Ramadan banner `1 Mar 2026` only |
| «يبدأ الاستثمار من 1,000 ر.س» | «يبدأ الاستثمار من ١٠٠٠ ريال» |

## Sources
- Notion: Stage 1-3 Principles, "Numerals & currency" table and R2/R5, `3501a53e-1a6b-8190-ba9e-ce891190bef9` (currency suffix rule) and `3501a53e-1a6b-802c-92b6-c0b2381d4215` (riyal logo rule).
- Product copy rule: Arabic percentage labels start with «نسبة» (owner decision; investor numbers study, «نسبة صافي العائد»).
- Built system: `Icon / riyal` in `knowledge/icons/icons.json`; amount defaults in `knowledge/components/index.json`.