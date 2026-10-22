<!-- syntropy-lint-disable percent-label-nisba -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Terminology: approved and banned

The words Safqah uses for its products, money, Sharia structure, regulators and statuses, in Arabic and English, and the words it never uses. Open this before naming any financial or regulatory concept. The full glossary is in `references/data/content/glossary.md`.

## Rules
1. Use the canonical term exactly, in the screen's language. Proper nouns keep their official form (نفاذ / Nafath, أبشر / Absher, مدى / mada).
   Why: one name per concept keeps product, legal and support aligned.
2. Never describe a Safqah product with conventional-lending words.
   Why: the products are riba-free by structure; lending words misstate them.
3. Investor surfaces use investor status labels, never internal ones.
   Why: internal statuses are not visible to investors.
4. Spell out a regulator on first use in long-form copy, then abbreviate.
   Why: Business Glossary usage note.

## Banned terms and their replacements
| Never (AR) | Never (EN) | Use (AR) | Use (EN) | Why |
|---|---|---|---|---|
| قرض، إقراض | loan, lending | تمويل بالمرابحة، صفقة | Murabaha financing, deal | Not a loan product |
| فائدة، سعر الفائدة | interest, interest rate | الربح، نسبة الربح | profit, profit rate | Interest is riba |
| معدل النسبة السنوي | APR | نسبة الربح السنوية المتوقعة | expected annual profit rate | Lending metric |
| سندات، سندات إسلامية | bonds, Islamic bonds | صكوك، صكوك مرابحة | sukuk, Murabaha sukuk | Sukuk are entitlement, not debt bonds |
| المقترض | borrower | المطور العقاري | developer | Lending framing |
| المُقرض، الدائن | lender, creditor | المستثمر | investor | Lending framing |
| دفعة فائدة | interest payment | الدفعة الدورية، الربح الموزع | periodic payment, profit payment | Riba framing |
| أرباح الأسهم | dividend | التوزيعات | distributions | Equity framing |
| عائد مضمون، ربح ثابت، بدون مخاطر | guaranteed return, fixed return, risk-free | العائد المتوقع | expected return | CMA: returns are not guaranteed |
| حلال 100%، استثمار حلال وآمن | 100% halal, safe halal investment | متوافق مع الشريعة الإسلامية (with the decision link) | Sharia-compliant | Decision-based claim, not a slogan |
| مناسبة لك، الأفضل لك | recommended for you, best for you | لأنها تشبه استثمارك في ... | because it is similar to your investment in ... | Suitability claim |
| مستثمر معتمد، محترف | accredited / sophisticated investor | مستثمر مؤهل | qualified investor | CMA term |
| كبار الشخصيات | VIP | وصول مخصص | segmented access | Not a status tier |
| مستشار آلي | robo-advisor | المستثمر الآلي | Auto-Investor | Feature name |
| صندوق (for a program) | fund | برنامج | program | Different legal structure |
| تورق (for the wakala) | tawarruq | وكالة السلع | Commodities Wakala | Different contract |
| ضمانات (alone) | guarantees (alone) | ثلاث ضمانات: رهن الأرض، سند لأمر للشركة، سندات لأمر شخصية | Three Guarantees: land pledge, company promissory note, personal promissory notes | Always list all three |
| ريال (in a UI amount), SR | SR, SAR before the number | ر.س after the amount, or the riyal symbol | SAR after the amount | Currency rule |
| نافذ (for identity) | Nafith (for identity) | نفاذ | Nafath | Nafith is the promissory-note system |

Riba «ربا» may appear only in education that explains what Safqah avoids; never as a description of a product feature.

## Product and money terms
| English | Arabic | Use for | Note |
|---|---|---|---|
| Safqah | صفقة | The platform | Brand name |
| Deal | صفقة | An investable issuance shown to investors | Internally "Issuance" |
| Issuance | الإصدار | A financing release with its own status and dates | Back-office |
| Program | برنامج | Financing structure for a project | Not "fund" |
| Project | مشروع | The real-estate development | |
| Investor | مستثمر | The user who buys sukuk | Never "lender" |
| Qualified Investor | مستثمر مؤهل | CMA classification above retail limits | Never "accredited" |
| Developer | المطور العقاري | SME developer receiving financing | Never "borrower" |
| Murabaha | مرابحة | Cost-plus-profit sale with deferred payment | Never "cost-plus loan" |
| Sukuk | صكوك | Certificates of entitlement to the receivable | Never "bonds" |
| Sharia Board | هيئة الرقابة الشرعية | Formal name in long-form copy | The `ShariaDisclosure` banner as built says «اللجنة الشرعية»; keep component copy as built |
| Profit rate | نسبة الربح | Disclosed return on the murabaha | Percentage label with «نسبة» |
| Expected return | العائد المتوقع | Projected return | «نسبة العائد المتوقع» for % |
| Net return | صافي العائد | After fees | «نسبة صافي العائد» for % |
| IRR | معدل العائد الداخلي | Internal rate of return | «معدل», not «نسبة» |
| Distributions | التوزيعات | The payout schedule | Gregorian dates |
| Profit payment | الربح الموزع | Profit-only amount | Separate from principal |
| Risk rating | تصنيف المخاطر | Deal risk grade | Never in fine print |
| Wallet | المحفظة | Cash balance | Not the portfolio |
| Portfolio | المحفظة الاستثمارية | Active investments | Not the wallet |
| Cash-out | سحب الأموال | Withdraw from wallet | |
| Deposit | إيداع | Add money to wallet | |
| Subscription (to an offering) | الاكتتاب | Committing to a deal | «إلغاء الاكتتاب» within the cancellation window |
| Reservation | الحجز | Real hold during a pre-booking window | Only when a real hold exists |
| Investment Goal | الهدف الاستثماري | Goal feature | |
| Early repayment | سداد مبكر | Developer repays early | |
| Secondary market | السوق الثانوية | Not live | Never imply it exists |
| Percentage of completion | نسبة الإنجاز | Construction progress | |
| Zakah | الزكاة | Hijri due dates | |

## Investor-facing status labels
| Status | Arabic | Tone |
|---|---|---|
| Scheduled | مجدولة | neutral |
| Raising | جارٍ جمع الأموال | brand or neutral |
| Funded | مموّلة | success |
| FundingFailed | فشل التمويل | neutral or warning, with the refund statement |
| Active | نشطة | neutral |
| Matured | بلغ الأجل | neutral |
| RepaymentDue | مستحق السداد | warning |
| Late | متأخرة | warning |
| Defaulted | متعثرة | error |
| PartiallyRepaid | مسددة جزئيًا | warning |
| Repaid | مسددة بالكامل | success |
| WrittenOff | مشطوبة | error |
| Cancelled | ملغاة | neutral |
| OnHold | معلّقة | warning |
| Reimbursed (internal) | shown as «مسددة بالكامل» | never shown as Reimbursed |
Internal pre-launch and operational statuses (ListingPreparation, PendingDrawdown, Dispute and others) never appear on investor surfaces.

## Regulatory and identity terms
| English | Arabic | Note |
|---|---|---|
| Capital Market Authority (CMA) | هيئة السوق المالية | Safqah's primary regulator |
| Saudi Central Bank (SAMA) | البنك المركزي السعودي | Payments and banking regulator |
| Know Your Customer (KYC) | اعرف عميلك | In UI prefer «توثيق الحساب» |
| Nafath | نفاذ | National digital identity |
| Absher | أبشر | Government services portal |
| mada | مدى | Debit network |
| IBAN | الآيبان | Spell as «الآيبان» in Arabic UI |
| IBAN certificate | شهادة الآيبان | |
| Personal Data Protection Law (PDPL) | نظام حماية البيانات الشخصية | Never "Saudi GDPR" |
| Ultimate beneficial owner (UBO) | المستفيد الفعلي | The KYC question as designed reads «هل أنت المستفيد الحقيقي من الحساب؟» |
| Hijri / Gregorian | التقويم الهجري / التقويم الميلادي | |

## Sources
- `references/data/content/glossary.md` (Safqah Business Glossary, DS v2 glossary).
- `references/data/content/voice-tone.md` vocabulary table.
- `references/data/components/sharia-cma-disclosure.md`, `status-issuance-badge.md`, `reinvest.md`.
- Compliance guidance: Sharia disclosure, CMA (no guarantee language, no suitability claims).
