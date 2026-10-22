# Glossary

Canonical terms for Safqah products, Saudi regulation and Islamic finance (Arabic and English), plus the design system and UX process vocabulary. Read this before writing copy that names a financial concept, a regulator, an issuance status, or a design system part. Use the canonical term; avoid the listed misuses.

## Rules

1. Use the canonical term exactly, in the language of the screen. Arabic UI uses the Arabic equivalent; do not mix the English term into Arabic copy unless it is a proper noun (Nafath, Lynk).
   Why: one name per concept keeps the product, legal docs and support aligned.
2. Never use conventional-lending words for Safqah products: no "loan", "interest", "APR", "bond", "borrower", "lender".
   Why: they imply riba, which Safqah products avoid by structure.
3. Spell out a regulator on first use in long-form copy, then abbreviate (Capital Market Authority, then CMA).
   Why: Business Glossary usage note.
4. Investor-facing status labels use the investor label, not the internal one (for example `Reimbursed` renders as Repaid).
   Why: internal statuses are not visible to investors.

## Product and Islamic finance terms

| English | Arabic | Meaning | Usage / avoid |
|---|---|---|---|
| Safqah | صفقة | The platform; the word means "a deal" | Brand name, not a generic noun for a deal in English copy |
| Deal (investor app) | صفقة | An investable issuance as shown to investors | Internally an "Issuance"; avoid "loan" |
| Issuance | الإصدار | A distinct financing release under a program, with its own status, amount and dates | Not the program as a whole |
| Program | برنامج | Financing structure linked to a project, one SPE, one or more issuances | Not "fund" |
| Project | مشروع | The real estate development being financed | Not "deal" internally |
| Investor | مستثمر | Provides capital by purchasing sukuk linked to financing projects | Never "lender"; "sukuk holder" only in legal docs |
| Qualified Investor | مستثمر مؤهل | CMA classification allowing investment above retail limits (SAR 20,000 per deal and SAR 100,000 annually) | Not "accredited" or "sophisticated" investor |
| Developer | مطور عقاري | SME real estate developer applying for financing | Capitalise in English; never "borrower" |
| Murabaha | مرابحة | Sharia-compliant cost-plus-profit financing: Safqah buys an asset and sells it at a disclosed margin with deferred payment | "Murabaha Facility" in formal docs; never "cost-plus loan" |
| Ijara | إجارة | Sharia-compliant lease structure (named as a disclosure example) | |
| Sukuk | صكوك | Sharia-compliant certificates representing proportional entitlement to the murabaha receivable | Never "bonds" or "Islamic bond" |
| Sharia Board | هيئة الرقابة الشرعية | Independent scholars who approve structures and contracts | Not "religious board"; not the board of directors |
| Riba | ربا | Usury/interest; prohibited | Never describe products with interest terms |
| Profit Rate | نسبة الربح | Disclosed return on a murabaha facility, fixed for the term | Never "interest rate", "APR" |
| Payment (periodic) | الدفعة / الدفعات الدورية | Periodic principal + fixed profit paid to sukuk holders | Never "interest payment" or "dividend" |
| Profit Payment | الربح الموزع | Profit-only amount paid to investors | Keep separate from principal |
| Principal Payment | أصل الدين المسدد | Principal-only amount repaid | |
| Distributions | التوزيعات | The schedule of payouts on a deal page | Gregorian dates (R5) |
| Expected return | العائد المتوقع | Projected return; as a percentage label: «نسبة العائد المتوقع» | Never rounded up (T2) |
| Net return (%) | نسبة صافي العائد | Net return as a percentage | «صافي العائد» when the value is SAR |
| IRR | معدل العائد الداخلي | Internal rate of return | Uses «معدل», not «نسبة» |
| Risk rating | تصنيف المخاطر | Deal risk grade shown to investors | Never in fine print |
| Three Guarantees (Mandatory Security Package) | ثلاث ضمانات | First-degree land pledge + company promissory note + personal promissory notes of all UBOs | Always list all three |
| First-Degree Land Pledge | الرهن العقاري من الدرجة الأولى (رهن الأرض) | First-ranking mortgage over the project land deed held for sukuk holders | "Land Pledge" in English copy |
| Promissory Note | سند لأمر | Enforceable written promise to pay; company and personal | Always say which |
| Commodities Wakala | وكالة السلع | Agency where Safqah executes commodity trades for the murabaha | Not "tawarruq" |
| Wallet | المحفظة | Investor cash balance in the app | Not the Portfolio |
| Portfolio | المحفظة الاستثمارية | Active investments view | Not the Wallet |
| Cashout | سحب الأموال | Investor withdraws funds from the wallet (2% fee on amounts deposited by electronic payment; AML screened) | One word in English |
| Investment Goal | الهدف الاستثماري | App feature: target return and horizon, tracked across deals | Capitalised feature name |
| Auto-Investor | المستثمر الآلي | Planned feature: preferences-based allocation; phase 1 is notifications with presets | Not "robo-advisor" |
| Early Repayment | سداد مبكر | Developer repays before the term; ROI by actual days | |
| Secondary Market | السوق الثانوية | Planned feature for selling positions before maturity; not live | Do not imply it exists |
| Segmented Access | وصول مخصص | Deal visible only to a chosen investor segment | Not "VIP" |
| Off-Plan | على الخارطة | Sale of units before construction completes, regulated by Wafi | |
| Percentage of Completion | نسبة الإنجاز | Consultant-evidenced project completion | Percentage label with «نسبة» |
| Zakah | الزكاة | Obligatory Islamic alms; Hijri due dates | |
| Investor App | تطبيق المستثمر | Investor mobile app | |
| Developer Portal | بوابة المطور | Developer web app | Not "the website" |
| Back-Office | العمليات المساندة | Internal operations system | Hyphenated |

## Issuance statuses (canonical labels)

| Status | Arabic | Visible to investors | Meaning |
|---|---|---|---|
| Scheduled | مجدولة | Yes | Offering scheduled; pre-bookings open in the five-day CMA window |
| Raising | جارٍ جمع الأموال | Yes | Live, accepting commitments |
| Funded | مموّلة | Yes | Minimum threshold met; commitments closed |
| FundingFailed | فشل التمويل | Yes | Threshold not met or offering period exceeded |
| Active | نشطة | Yes | Funds disbursed; financing period running |
| Matured | بلغ الأجل | Yes | Reached maturity; 15-day payment grace period |
| RepaymentDue | مستحق السداد | Yes | Grace period ended unpaid (day +15) |
| Late | متأخرة | Yes | 30 days late; formal follow-up (warning tone) |
| Defaulted | متعثرة | Yes | 91 days overdue; legal recovery (error tone) |
| PartiallyRepaid | مسددة جزئيًا | Yes | Part of principal recovered, paid pro rata |
| Repaid | مسددة بالكامل | Yes | Fully settled, closed |
| WrittenOff | مشطوبة | Yes | Recovery failed; closed as a loss |
| Cancelled | ملغاة | Yes | Stopped before Active, with a recorded reason |
| OnHold | معلّقة | Yes | Temporarily paused |
| Reimbursed | معوّضة | No (shows as Repaid) | Safqah covered the default |
| ListingPreparation, ReadyForListing, PendingApproval, Rejected, PendingLaunch, BookBuilding, ReservationsAllocated, PendingDrawdown, Dispute, RepaymentMonitoring | إعداد الإدراج، جاهزة للإدراج، بانتظار الموافقة، مرفوضة، بانتظار الإطلاق، بناء سجل الأوامر، تخصيص الحجوزات، بانتظار السحب، محل نزاع، مراقبة السداد | No (internal) | Pre-launch and operational states |

"Yes" means the source does not mark the status internal; Late uses `Tone=warning`, Defaulted and WrittenOff use `Tone=error`.

## Saudi regulatory and identity terms

| English | Arabic | Meaning | Avoid |
|---|---|---|---|
| CMA (Capital Market Authority) | هيئة السوق المالية | Saudi capital-markets regulator; Safqah's primary regulator | Confusing with SAMA |
| SAMA (Saudi Central Bank) | البنك المركزي السعودي | Banking, insurance and payments regulator; not Safqah's direct regulator | |
| Mada | مدى | Saudi national debit-card payment network (`MadaLogo`) | |
| KYC (Know Your Customer) | اعرف عميلك | Full regulatory verification of identity, suitability and risk | Using it for CR Verification only |
| eKYC | التحقق الإلكتروني من الهوية | Digital KYC via Absher/Yakeen at signup | |
| KYB (Know Your Business) | اعرف عميلك (شركات) | Corporate verification incl. UBOs | |
| AML/CFT | مكافحة غسل الأموال وتمويل الإرهاب | Anti-money laundering and counter-terrorism financing controls | Writing "AML" alone in formal docs |
| PEP | شخص معرض سياسيًا | Politically exposed person; triggers EDD | |
| UBO | المستفيد الفعلي | Ultimate beneficial owner | |
| Nafath | نفاذ | National digital identity authentication and signing (SDAIA) | Confusing with Nafith |
| Nafith | نافذ | National electronic promissory note system (under SAMA) | Confusing with Nafath |
| Absher | أبشر | Government services portal used for eKYC (`AbshirLogo`) | Calling it Nafath |
| SIMAH | سمة | Saudi credit bureau | |
| Wafi | وافي | Off-plan sales certification programme (REGA) | |
| REGA | الهيئة العامة للعقار | Real Estate General Authority | |
| PDPL | نظام حماية البيانات الشخصية | Saudi Personal Data Protection Law | "Saudi GDPR" |
| SDAIA | الهيئة السعودية للبيانات والذكاء الاصطناعي | Saudi Data and AI Authority; runs Nafath, PDPL guidance | |
| DGA | هيئة الحكومة الرقمية | Digital Government Authority; government digital design standards reference | |
| Hijri | التقويم الهجري | Islamic lunar calendar; used for religious/cultural dates | |
| Gregorian | التقويم الميلادي | Used for financial dates | |
| Founding Day | يوم التأسيس | Saudi national day on 22 Feb, commemorating the First Saudi State; planned seasonal theme, not built | |
- Note: the DS v2 Notion glossary wrote "SDGA / DGA: Saudi Data and AI Authority / Digital Government Authority". The Saudi Data and AI Authority is abbreviated SDAIA (per the Business Glossary); DGA is the Digital Government Authority.

## Design system vocabulary

### Naming
| Thing | Built convention | Example |
|---|---|---|
| Semantic tokens | lowercase slash path: `category/role[/variant]` | `bg/brand/primary`, `text/muted`, `space/lg`, `radius/default` |
| Primitive tokens | Title-case slash path | `Color/Primary/LightGreen/500`, `Spacing/16` |
| Text styles | `role / size / weight` | `body / 14 / regular`, `heading / 20 / bold` |
| Components | PascalCase | `CardDeal`, `BottomSheet`, `ReservationTimer` |
| Variant properties | Title case name, values verbatim | `Size=md`, `Tone=warning`, `Direction=RTL` |
| Boolean properties | Start with Has / Is / Show / Can | `HasIcon`, `showDescription`, `Has icon leading` |
| Icons | `Icon / <name>` | `Icon / riyal`, `Icon / x` |
- Note: Notion said variables use kebab-case (`bg-brand-primary`) and listed camelCase, snake_case and SCREAMING_SNAKE_CASE as "will not use". Built tokens use slash paths; some built boolean props are camelCase (`showDescription`). Copy names verbatim from the knowledge files. Mixpanel events are the one place snake_case is required (`deal_viewed`).

### Tokens
| Term | Meaning |
|---|---|
| Token | A named design value. The name is the contract; the value can change without renaming. |
| Primitive token | A raw value with no meaning (`Color/Primary/LightGreen/500`, `Spacing/16`). Never themed, never used directly in product UI. |
| Semantic token | A value with intent (`bg/brand/primary`, `text/error`). Aliases a primitive. Only semantic tokens are themed. |
| Alias | One variable pointing to another; change the primitive and every alias updates. |
| Mode | A switchable set of values for the same tokens inside a collection. Built semantic modes: `Light`, `Dark`. Typography primitives have `Arabic` / `English` modes. |
| Theme | A mode in the semantic collection. Seasonal themes (Founding Day, Ramadan, Eid, National Day) are planned, not built. |
| Themable token | A semantic token allowed to change between themes (brand surface only, about 15-25). |
| Scope | Where a variable may be applied in Figma (fills, text, stroke, gap). |

### Components
| Term | Meaning |
|---|---|
| Component set | Group of variants of one component (all `Button` sizes x variants x states). |
| Variant | One configuration within a set (`Variant=primary, Size=md, State=default`). |
| Property | A configurable input: Boolean, Text, Instance Swap or Variant. |
| Slot | A placeholder area for consumer content. |
| Atom / molecule / organism | Build order: small parts first, composed upward; never inline a big composition. |
| Detached instance | An instance broken from its master; no longer updates. Avoid. |
| Status tag | `Stable` / `Beta` / `Deprecated`: whether a component is safe to use. Built page status values are `stable` and `wip`. |

### Versioning (semver)
`MAJOR.MINOR.PATCH`, for example `2.1.3`:
- PATCH: bug fix, no behaviour change (fixed icon alignment in `CardDeal`).
- MINOR: something new, nothing broken (a new component or theme mode).
- MAJOR: breaking change; downstream files must update (renamed or removed tokens or components).
- `v2.0.0` first v2 release; `v2.0.1` a fix; `v2.1.0` an addition; `v3.0.0` the next breaking rebuild. Built library: `Syntropy - Safqah Design System 2.0.0`.

### Method and standards
| Term | Meaning |
|---|---|
| OKR / KR / KPI | Objective + measurable key results / one key result / ongoing metric |
| DoD | Definition of Done: the release-gate checklist |
| RACI | Responsible, Accountable, Consulted, Informed |
| ADR / RFC | Architecture Decision Record / Request For Comments |
| WCAG AA | Contrast 4.5:1 normal text, 3:1 large text. Repo target is WCAG 2.2 AA (`AGENTS.md`); Notion said 2.1 AA |
| WCAG AAA | 7:1 normal text; aspirational |
| a11y, ARIA | Accessibility; attributes screen readers use |
| RTL / LTR | Right-to-left (Arabic) / left-to-right (English) |

### UX process
| Term | Meaning |
|---|---|
| Discovery | Phase that decides whether the problem is understood well enough to design |
| Heuristic review | Expert walkthrough against usability principles; fast, designer-only, not a substitute for user research |
| Problem statement | One sentence: user, goal, obstacle, why it matters to Safqah |
| Success metrics | Quantitative signals (primary, guardrail, leading) used to judge a design after launch |
| Usability test | Watching real users attempt tasks on a prototype or live product |
| Widgetbook parity | Flutter components visually matching their Figma counterparts |
| Lexicon audit | Monthly review of the Mixpanel event/property dictionary |
| Cadence | How often a ritual happens |

## Examples
| Do | Don't |
|---|---|
| «الربح المتوقع» / "Expected profit" | «الفائدة المتوقعة» / "Expected interest" |
| «صكوك مرابحة» / "Murabaha sukuk" | «سندات» / "bonds" |
| "Verify with Nafath" | "Verify with Nafith" |
| `StatusPill` «متأخرة» `Tone=warning` | «متأخرة» in error red |
| "Repaid" shown for a reimbursed issuance | "Reimbursed" shown to investors |

## Sources
- Notion: Design System v2.0 Initiative glossary, `34f1a53e-1a6b-8149-bcfb-e82855242f0a`.
- Notion: Safqah Business Glossary, `collection://94edbecc-48d1-4ba1-8ae4-bfa500eee94f` (Arabic equivalents, definitions, usage notes, issuance statuses).
- Notion: UX Process & Lifecycle glossary, `3481a53e-1a6b-8111-9a92-c79e0ac0c3e2`.
- Built system: `knowledge/tokens/resolved.json`, `knowledge/tokens/text-styles.json`, `knowledge/components/index.json`.
