Design guidance only. Confirm wording with Safqah Compliance before release.

# Sharia compliance statements

Where and how Safqah states that a deal is Sharia compliant, with which components (`ComplianceBadge`, `ShariaDisclosure`, page 08i Sharia & CMA Disclosure), and what the wording may and may not claim. Open it whenever a screen mentions Sharia, the Sharia committee, halal, or shows a seal.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| CMA Shariah Governance Instructions, Art. 2(c)(1) | "Shariah Compliant: Compliant with decisions issued by the Capital Market Institution's Shariah committee." The claim is about the committee's decisions, nothing broader |
| Art. 1(b) | Art. 3 paragraphs (2) and (7) and Art. 8 paragraph (6) are mandatory; the rest is guidance |
| Art. 3(5), 3(7) | The board discloses committee members' CVs and approves and discloses the committee's annual report |
| Art. 8(1), (2), (6) | The committee ensures products comply, issues decisions, approves contracts, and prepares an annual compliance report including "the Shariah standards that the Shariah Committee relies on" |
| CMI Regs Art. 5(b)(8), Annex 5.1 item 4 | Clear, fair and not misleading; no false or misleading statements |
| Syntropy 08i doc | "Wire every Learn more to the real Sharia board approval / CMA licence document"; "Don't show a compliance seal without a genuine disclosure behind it" |

## Components (page 08i, Sharia & CMA Disclosure)

| Component | Node | Variants | Use | Don't use |
| --- | --- | --- | --- | --- |
| `ShariaDisclosure` | 3681:2658 | Direction=RTL, LTR | Brand-green banner «جميع الصفقات المطروحة معتمدة من اللجنة الشرعية» + seal + «إعرف أكثر», on deal pages, deal listings, onboarding or about screens | Compact contexts (use `ComplianceBadge`); generic info (use `Banner`) |
| `ComplianceBadge` Type=Shariah | 3673:2408 | Direction=RTL, LTR | Compact seal + «متوافق مع الشريعة الإسلامية» + «إعرف أكثر», for calculator, invest summary, pre-checkout | On deal pages prefer `ShariaDisclosure`; never as decoration or on an unapproved product |
| `ComplianceBadge` Type=CMA | 3673:2408 | Direction=RTL, LTR | Seal + «مصرحة من هيئة السوق المالية» + «إعرف أكثر», for the licence statement | Without a real licence destination |

Facts from the component descriptions: the seal image needs alt text naming the authority; the link names its target document; the whole `ShariaDisclosure` banner is one link with a descriptive name. Compliance note on both: legal claim, exact wording from Legal and Sharia, never reword loosely, «إعرف أكثر» must open the real licence or fatwa.

Direction follows the locale; never set it by hand in code. Compose these components; never fork them or redraw the seal.

## Rules

### Placement
1. Deal page: `ShariaDisclosure` once, near the deal summary, not inside the CTA area and not repeated per section. Why: one clear statement at the decision; repetition reads as marketing.
2. Invest summary and calculator: `ComplianceBadge` Type=Shariah and Type=CMA side by side, below the numbers and above the risk line. Why: confirms both statuses at commitment without competing with fees or risk.
3. Marketing and landing: `ComplianceBadge` Type=CMA with the licence line; Type=Shariah only when every product advertised is covered by a committee decision. Why: CMI Annex 5.1 items 4, 5.
4. Never place the seal on a deal the committee has not approved, a draft deal, or a non-investment feature (wallet, referral, goal planner). Why: Art. 2(c)(1).

### "Learn more" destination
5. Every «إعرف أكثر» opens a real destination. Shariah: the committee's decision or certificate for this deal (or the platform-wide decision if that is what exists), the members, and the latest annual report. CMA: the licence details. Why: Art. 3(5), 3(7), 8(6); 08i doc.
6. The disclosure view names the committee, decision reference and date, and the scope approved ("the structure and contracts of this issuance"). Use `{committee_name}`, `{decision_ref}`, `{decision_date}` until Compliance supplies them. Why: verifiable; never invent references.
7. Approval pending, withdrawn or limited: show it plainly with `StatusPill` Tone=warning and hide the seal. Why: clear, fair, not misleading.

### Wording
8. Use the approved 08i strings verbatim. New Sharia copy goes to Compliance and the Sharia function before release. Why: "Compliance copy and seals are legal claims".
9. Claim only what the decision covers. Approved structure is not a promise of profit, safety or social impact. Why: Art. 2(c)(1).
10. Islamic-finance terms from the glossary: «نسبة الربح», «العائد المتوقع», «صكوك», «مرابحة». Never «فائدة» / "interest", "APR", "loan", "borrower", "lender", "bond". Why: glossary rule 2; conventional-lending words imply riba.
11. No «حلال» / "halal" as a marketing adjective, no religious imagery, no scholars' photos as endorsement. Why: the claim is regulatory and decision-based.
12. Purification or zakat guidance only if the committee issued it, quoted with its source. Why: Art. 8(5) advice is internal unless published.

## Disclosure view template (draft, confirm)

| Row | العربية | English |
| --- | --- | --- |
| Title | «الاعتماد الشرعي» | "Sharia approval" |
| Committee | «اللجنة الشرعية: {committee_name}» | "Sharia committee: {committee_name}" |
| Decision | «رقم القرار {decision_ref} بتاريخ {decision_date}» | "Decision {decision_ref} dated {decision_date}" |
| Scope | «هيكل الصفقة وعقودها معتمدة من اللجنة الشرعية» | "The deal structure and contracts are approved by the Sharia committee" |
| Links | «أعضاء اللجنة» · «التقرير السنوي» | "Committee members" · "Annual report" |

## Examples

| Do | Don't |
| --- | --- |
| «متوافق مع الشريعة الإسلامية» + «إعرف أكثر» to decision `{decision_ref}` dated `{decision_date}` | «استثمار حلال 100% وآمن» |
| "Sharia compliant" + "Learn more" to the committee decision | "Halal and risk-free" |
| «هيكل الصفقة وعقودها معتمدة من اللجنة الشرعية» | «معتمد من كبار العلماء» (unverifiable) |
| «نسبة الربح المتوقعة 16.0% سنوياً» | «نسبة الفائدة 16%» |
| Seal hidden + `StatusPill` Tone=warning «بانتظار اعتماد اللجنة الشرعية» | Seal on a pending deal |
| One `ShariaDisclosure` under the deal summary | A seal on every card, button and sheet |

## Sources

- CMA, Instructions for Shariah Governance in Capital Market Institutions, Board Resolution 3-77-2022 dated 22/6/2022, Art. 1, 2, 3, 8: https://cma.gov.sa/en/RulesRegulations/Regulations/Documents/The_Instructions_for_Shariah_Governance_in_Capital_Market_InstitutionsEN.pdf
- CMA, CMI Regs, Art. 5 and Annex 5.1: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- Syntropy Figma page 69:961 (08i Sharia & CMA Disclosure): `ComplianceBadge` 3673:2408, `ShariaDisclosure` 3681:2658, doc frame 3676:2406.
- `references/data/content/glossary.md`; full source file `references/data/ux/compliance/sharia-disclosure.md`.
