<!-- syntropy-lint-disable percent-label-nisba -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Copy checklist

Run this on every string set before handing it over (to design, to code, to a ticket). Each item is pass or fail; any fail blocks handoff until fixed. Run it on the Arabic first, then the English.

## 1. Language and structure
- [ ] Arabic exists for every string and was written first; English is a translation of meaning.
- [ ] Clear Modern Standard Arabic; no dialect words; no literal calques from English (`arabic-writing.md`).
- [ ] Gender-neutral phrasing where the pattern allows (verbal nouns, impersonal forms).
- [ ] Arabic punctuation: «،» «؟» «؛», guillemets «» for quoted UI text, no space before punctuation.
- [ ] Counted nouns use ICU plural forms, not concatenation.

## 2. Minimal copy and length
- [ ] Each string within its limit (`microcopy.md`): button 1-3 words, helper 8-15, error 8-20, success 5-15, empty 5-20, toast title 2-5, alert title 2-6.
- [ ] At most one hint per field; no stacked helper + description + tooltip.
- [ ] No explanatory paragraph on a screen; long content moved to a sheet or help article.
- [ ] At most one `Alert` or `Banner` per screen; toasts only where an inline state would not do.

## 3. Writing rules
- [ ] No em dash character anywhere (strings, notes, captions, comments).
- [ ] No exclamation marks in product copy.
- [ ] No emoji on financial events.
- [ ] No «اضغط هنا» / "Click here".

## 4. Numbers
- [ ] Digits 0-9 only; no «٫» «٬» «٪».
- [ ] Currency after every amount; «ر.س» / "SAR" in text, riyal symbol only inside amount components; never «SR», never «ريال» in UI amounts.
- [ ] Two decimals on transactional amounts; whole numbers only on projections, goals and rules.
- [ ] One decimal on percentages; nothing rounded up.
- [ ] Every Arabic percentage label starts with «نسبة» (IRR uses «معدل»; SAR amounts and coverage status excluded).
- [ ] Signs before digits; colour never the only signal.
- [ ] Dates as day + month name + year; Gregorian for money events, Hijri for religious dates.
- [ ] Limits, fees, rates and deadlines are real supplied values or `{placeholders}`.

## 5. Vocabulary and claims
- [ ] No banned term: loan, interest, APR, bonds, borrower, lender, dividend, «قرض»، «فائدة»، «سندات»، «المقترض».
- [ ] Returns labelled «متوقع» / expected; no «مضمون»، «ثابت»، «بدون مخاطر», guaranteed, fixed, risk-free.
- [ ] No «مناسبة لك» / "recommended for you"; no «حلال 100%».
- [ ] Three Guarantees always listed together when guarantees are named.
- [ ] Investor-facing status labels only; no internal statuses.

## 6. Tone and ethics
- [ ] No flattery, no pet names, no celebration.
- [ ] No fake urgency or scarcity; any count or timer is live and true and shown neutrally with an absolute date.
- [ ] Decline options have equal weight and no confirmshaming.
- [ ] Warning states use warning wording and `Tone=warning`; red only for blocking failures and defaulted.
- [ ] Risk line next to every commitment action; fees visible before confirm (see syntropy-compliance-ux).

## 7. Patterns
- [ ] Buttons are verbs naming the result; commitment buttons name the commitment (and amount where the pattern does).
- [ ] Errors: what happened + what to do next; no blame; no apology filler; never «خطأ» alone.
- [ ] Success copy names the amount, deal or item.
- [ ] Empty states: what the state is + what happens next + at most one action; filter-empty differs from supply-empty.
- [ ] Notifications: service vs marketing decided; OTP states purpose.
- [ ] Accessibility labels written for icon-only controls, amounts («ريال سعودي» spoken), masked values.

## 8. Handoff format
- [ ] Delivered as a table: key or slot, Arabic, English, component and variant, notes.
- [ ] Design captions read "This is the screen when the user ..."; no screen numbers.
- [ ] Final copy, not placeholder lorem, in both languages.

## Sources
- `references/data/content/quality-checklist.md` (Notion Content Quality Checklist, group 6 product UI copy).
- `references/data/content/voice-tone.md`, `copy-lengths.md`, `numbers-currency.md`, `glossary.md`.
