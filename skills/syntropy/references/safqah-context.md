# Safqah context

Who Safqah is, who uses it, where it runs, which regulators shape it, and the terms an agent must get right. Open this before designing for an unfamiliar product area or when a request names a user, surface, product or regulator.

## Rules
1. Name the user and the surface before designing anything. Why: a qualified investor on a tablet and an operations analyst on the back-office need different density, copy and limits.
2. Use the canonical term from `references/data/content/glossary.md`, in the language of the screen. Why: one name per concept keeps product, legal and support aligned.
3. Never describe a Safqah product with conventional-lending words (loan, interest, APR, bond, borrower, lender). Why: products are riba-free by structure; the wrong word is a Sharia and CMA problem.
4. Never state a limit, fee, rate or regulatory threshold as a fixed number in a design. Use backend placeholders. Why: limits differ by investor classification and licence regime, and several are still open with Product and Compliance (see `known-issues.md`).

## The company in five lines
- **Safqah (صفقة)** means "a deal". It is a Saudi, Sharia-compliant investment platform.
- Investors buy **sukuk (صكوك)** that represent a share of a **murabaha (مرابحة)** receivable financing a real-estate **project (مشروع)** run by a **developer (مطور عقاري)**.
- Returns are **profit (الربح)** at a disclosed **profit rate (نسبة الربح)**, paid as periodic **distributions (التوزيعات)**. Never "interest" or "dividend".
- Every issuance carries **three guarantees (ثلاث ضمانات)**: first-degree land pledge, company promissory note, personal promissory notes of all UBOs. Always list all three.
- Approved by a **Sharia Board (هيئة الرقابة الشرعية)**; regulated by the **CMA**.

## Users
| User | Arabic | What they do | Design notes |
|---|---|---|---|
| Retail investor | مستثمر | Browses deals, invests or reserves, tracks portfolio, receives payouts, cashes out | Most users; Arabic RTL; compact phone first; limits from backend |
| Qualified investor | مستثمر مؤهل | Same as retail plus qualified-only deals and higher limits | Qualified badge only for qualified users (`CardDeal` `Qualified`); never "accredited" |
| Developer or issuer | مطور عقاري | Applies for financing, uploads documents, tracks raise and repayments on the developer portal | Web first; never "borrower" |
| Internal teams | فرق داخلية | Operations, compliance, finance, support on the back-office | Dense tables, filters, audit trails; English often acceptable alongside Arabic |

## Surfaces
| Surface | Size class | Notes |
|---|---|---|
| Flutter app, compact | phone | Primary surface. RTL Arabic first, 48 x 48 targets, bottom navigation (`TabBar`), sheets for confirmations (`BottomSheet`) |
| Flutter app, regular | tablet, foldable inner | Same components, wider layouts (`NavigationRail`, two panes) |
| Web | desktop and responsive | Investor web and the Developer Portal (بوابة المطور) |
| Back-office | desktop | العمليات المساندة. `Table / Cell`, `Table / Toolbar`, `Drawer` details, dense but still tokenized |

## Product map
| Product | Arabic | Main screens | Pattern (syntropy-patterns) |
|---|---|---|---|
| Deals | الصفقات | Deal list, deal page (`Base card` hero, `CardDeal`, `DealTimeline`, `Guarantees`) | deal-list, deal-page |
| Invest and reserve | استثمر · احجز | Amount entry, review, confirm, success; reservation window | invest-and-reserve, payment |
| Wallet and cash-out | المحفظة · سحب الأموال | Balance, deposit, cash-out to IBAN | wallet-and-cash-out |
| Portfolio | المحفظة الاستثمارية | Holdings, returns, statuses (`PortfolioHeader`) | portfolio |
| Payouts | التوزيعات | Distribution schedule, payout detail (`Payouts cell`) | payouts |
| Goals | الهدف الاستثماري | Goal setup and tracking (`GoalTracker`, `Goal card`) | goals |
| KYC and onboarding | اعرف عميلك | Nafath sign-in, identity, suitability, bank account (`KYCStep`) | kyc, onboarding-and-sign-in |
| Zakah | الزكاة | Zakah estimate and statement; Hijri due dates with Gregorian | no dedicated pattern yet: compose from forms, payouts and empty states, and run it as a Flow through syntropy-product-workflow |
| Notifications | الإشعارات | Settings, permission primers, inbox | notifications-and-permissions |
| Back-office | العمليات المساندة | Tables, case review, approvals | backoffice-tables |

Wallet (المحفظة) is the cash balance; Portfolio (المحفظة الاستثمارية) is the investments. Never swap them.

## Regulators and laws
| Body | Arabic | Why it matters in design |
|---|---|---|
| CMA, Capital Market Authority | هيئة السوق المالية | Primary regulator: disclosure, risk statements, investor classification and limits, no misleading return claims, anti-pressure |
| SAMA, Saudi Central Bank | البنك المركزي السعودي | Payments and consumer-protection benchmark (fees before confirmation, complaints, clear statements); not Safqah's direct regulator |
| PDPL, Personal Data Protection Law (SDAIA) | نظام حماية البيانات الشخصية | Consent never pre-ticked, purpose stated, minimal data, no PII in analytics events |
| Sharia Board | هيئة الرقابة الشرعية | Approved structure and vocabulary; Sharia statement on deals |
Regulated wording is drafted by agents and confirmed by Safqah Compliance. Route detail to syntropy-compliance-ux.

## Glossary highlights (full list: `references/data/content/glossary.md`)
| English | Arabic | Note |
|---|---|---|
| Deal | صفقة | Internally an issuance (الإصدار) |
| Sukuk | صكوك | Never "bonds" |
| Profit rate | نسبة الربح | Never "interest rate" or "APR" |
| Net return (%) | نسبة صافي العائد | «صافي العائد» when the value is SAR |
| Expected return | العائد المتوقع | Percentage label «نسبة العائد المتوقع»; never rounded up |
| IRR | معدل العائد الداخلي | «معدل», not «نسبة» |
| Distributions | التوزيعات | Gregorian dates |
| Wallet | المحفظة | Cash, not investments |
| Portfolio | المحفظة الاستثمارية | Investments, not cash |
| Cashout | سحب الأموال | |
| Investment Goal | الهدف الاستثماري | Feature name |
| Risk rating | تصنيف المخاطر | Never in fine print |
| Nafath | نفاذ | National identity sign-in; not Nafith (نافذ, promissory notes) |
| Late | متأخرة | `Tone=warning` |
| Defaulted | متعثرة | `Tone=error` |
| Secondary market | السوق الثانوية | Planned, not live: never imply it exists |

## Examples
- Do: «نسبة صافي العائد 13.8%» on a deal card. Don't: «فائدة 13.75%».
- Do: "Your distribution of 1,250.00 SAR is in your wallet." Don't: "Your dividend of SAR 1,250 is in your portfolio."
- Do: «الحد المتبقي: {remaining_limit} ر.س». Don't: «الحد المتبقي: 100,000 ر.س» hardcoded.

## Sources
- AGENTS.md (repo root)
- knowledge/content/glossary.md (Business Glossary, DS v2 Notion glossary 34f1a53e1a6b8149bcfbe82855242f0a)
- knowledge/patterns/README.md
- docs/reviews/2026-10-15-day1.md (findings 19, 20, 21)
