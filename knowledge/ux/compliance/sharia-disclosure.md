Design guidance only. Confirm wording with Safqah Compliance before release.

# Sharia compliance statements

Where and how Safqah states that a deal is Sharia compliant, which components to use (`ComplianceBadge`, `ShariaDisclosure` on page 08i), and what the wording may and may not claim. Read it whenever a screen mentions Sharia, the Sharia committee, halal, or shows a compliance seal.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| CMA Shariah Governance Instructions, Art. 2(c)(1) | "Shariah Compliant: Compliant with decisions issued by the Capital Market Institution's Shariah committee." A Sharia claim is a claim about the committee's decisions, nothing broader. |
| Art. 1(b) | Art. 3 paragraphs (2) and (7) and Art. 8 paragraph (6) are mandatory; the rest is guidance. |
| Art. 3(5), 3(7) | The board discloses the Sharia committee members' CVs to the public and approves and discloses the committee's annual report. |
| Art. 8(1), (2), (6) | The committee ensures products comply, issues decisions and approves contracts, and prepares an annual compliance report that includes "the Shariah standards that the Shariah Committee relies on". |
| CMI Regs Art. 5(b)(8), Annex 5.1 item 4 | Communication is clear, fair and not misleading; no false or misleading statements. |
| Syntropy 08i doc | "Wire every Learn more to the real Sharia board approval / CMA licence document"; "Don't show a compliance seal without a genuine disclosure behind it". |

## Components

| Component | Variants | Use |
| --- | --- | --- |
| `ShariaDisclosure` | Direction=RTL, LTR | The prominent green banner on deal listings and the deal page: «جميع الصفقات المطروحة معتمدة من اللجنة الشرعية» + seal + «إعرف أكثر» |
| `ComplianceBadge` Type=Shariah | Direction=RTL, LTR | Compact seal + «متوافق مع الشريعة الإسلامية» + «إعرف أكثر», for the calculator, invest summary, cards |
| `ComplianceBadge` Type=CMA | Direction=RTL, LTR | Seal + «مصرحة من هيئة السوق المالية» + «إعرف أكثر», for the licence statement |

Direction follows the locale; do not set it by hand. Compose these components; do not fork them or redraw the seal.

## Rules

### Placement
1. Deal page: `ShariaDisclosure` once, near the deal summary, not inside the CTA area and not repeated per section. Why: one clear statement where the decision is made; repetition reads as marketing.
2. Invest summary and calculator: `ComplianceBadge` Type=Shariah and Type=CMA side by side, below the numbers and above the risk line. Why: confirms both statuses at the commitment point without competing with fees or risk.
3. Marketing and landing: `ComplianceBadge` Type=CMA with the licence line; Type=Shariah only when every product advertised is covered by a committee decision. Why: CMI Annex 5.1 item 5 (regulatory status) and item 4 (no false statements).
4. Never place the seal on a deal that the committee has not approved, on a draft deal, or on a non-investment feature (wallet, referral, goal planner). Why: Art. 2(c)(1) ties the claim to committee decisions.

### "Learn more" destination
5. Every «إعرف أكثر» opens a real destination: for Shariah, the committee's decision or certificate for this deal (or the platform-wide decision if that is what exists), the committee members, and the latest annual report; for CMA, the licence details. Why: Art. 3(5), 3(7), 8(6); 08i doc rule.
6. The disclosure view names the committee, the decision reference and date, and the scope of what was approved (for example "the structure and contracts of this issuance"). Use placeholders `{committee_name}`, `{decision_ref}`, `{decision_date}` until Compliance supplies them. Why: makes the claim verifiable; never invent references.
7. If a deal's approval is pending, withdrawn or limited, show it plainly with `StatusPill` Tone=warning and hide the seal. Why: clear, fair and not misleading.

### Wording
8. Use the approved strings from the 08i components verbatim. New Sharia copy goes to Compliance and the Sharia function before release. Why: 08i maintainer note "Compliance copy and seals are legal claims".
9. Claim only what the decision covers. Approved structure is not a promise of profit, safety or social impact. Why: Art. 2(c)(1).
10. Use Islamic-finance terms from the glossary: «نسبة الربح», «العائد المتوقع», «صكوك», «مرابحة». Never «فائدة» / "interest", "APR" for a Sharia product. Why: `knowledge/content/glossary.md`; wrong terms undermine the claim.
11. Do not use "halal" or «حلال» as a marketing adjective, religious imagery, or scholars' photos as endorsement. Why: the claim is regulatory and decision-based, not a lifestyle label.
12. Purification or zakat guidance is shown only if the committee issued it, quoted with its source. Why: Art. 8(5) advice is internal unless published.

## Examples

| Do | Don't |
| --- | --- |
| «متوافق مع الشريعة الإسلامية» + «إعرف أكثر» → decision `{decision_ref}` dated `{decision_date}` | «استثمار حلال 100% وآمن» |
| "Sharia compliant" + "Learn more" → committee decision | "Halal and risk-free" |
| «هيكل الصفقة وعقودها معتمدة من اللجنة الشرعية» | «معتمد من كبار العلماء» (unverifiable) |
| "The deal structure and contracts are approved by the Sharia committee" | "Blessed returns" |
| «نسبة الربح المتوقعة 16.0% سنوياً» | «نسبة الفائدة 16%» |
| Seal hidden + `StatusPill` Tone=warning «بانتظار اعتماد اللجنة الشرعية» | Seal shown on a pending deal |
| One `ShariaDisclosure` under the deal summary | A seal on every card, button and sheet |

## Sources

- CMA, Instructions for Shariah Governance in Capital Market Institutions, Board Resolution 3-77-2022 dated 22/6/2022, Art. 1, 2, 3, 8: https://cma.gov.sa/en/RulesRegulations/Regulations/Documents/The_Instructions_for_Shariah_Governance_in_Capital_Market_InstitutionsEN.pdf
- CMA, Capital Market Institutions Regulations, Art. 5 and Annex 5.1: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- Syntropy: Figma page 69:961 (08i Sharia & CMA Disclosure), `ComplianceBadge` 3673:2408, `ShariaDisclosure` 3681:2658, doc frame 3676:2406; `knowledge/components/sharia-cma-disclosure.md`; `knowledge/content/glossary.md`.
