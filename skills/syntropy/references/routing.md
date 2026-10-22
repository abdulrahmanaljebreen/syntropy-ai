# Routing: which skill handles what

Map any Safqah request to the syntropy skill that owns it, including mixed requests that need several skills in order. Open this when a request does not obviously belong to one skill, or when planning which skills a design will touch.

## Rules
1. Route by the **job**, not by the words: "make the button pop" is foundations and accessibility, not components. Why: the owner skill holds the rules that apply.
2. One skill **leads**, others **check**. The lead produces the output; checkers review it. Why: avoids five half-answers.
3. Money, personal data and regulated disclosure always add syntropy-compliance-ux as a checker. Why: these are where mistakes cost most.
4. Anything that ships adds syntropy-ux-review and syntropy-accessibility as final checkers. Why: rule 15, self-review before handoff.
5. Refer to skills by name only, never by file path. Why: skills install separately.

## Request type to skill

| Request type | Typical words | Lead skill | Checkers |
|---|---|---|---|
| Pick a component, props, variants, booleans, "is X in the library", "difference between X and Y" | which component, props, variant, CardDeal, BottomSheet, مكوّن | syntropy-components | syntropy-foundations |
| Tokens, color, type, spacing, radius, shadow, dark mode, text styles | token, color, hex, spacing, font, dark mode, لون | syntropy-foundations | syntropy-accessibility |
| Screen structure for a known job | deal page, invest, reserve, KYC, wallet, cash-out, portfolio, payouts, goals, empty state, error, form, back-office table, onboarding, notifications, settings | syntropy-patterns | syntropy-components |
| Copy: labels, errors, empty states, push, SMS, translation, glossary, numbers and currency | copy, wording, translate, نص, صياغة, error message, CTA | syntropy-content | syntropy-rtl-arabic, syntropy-compliance-ux |
| Mirroring, bidi, mixed Arabic and English strings, Hijri and Gregorian, Arabic type | RTL, mirror, Arabic, bidi, هجري | syntropy-rtl-arabic | syntropy-content |
| Contrast, targets, screen reader labels, focus, dynamic type, motion | accessibility, a11y, contrast, VoiceOver, TalkBack, WCAG | syntropy-accessibility | syntropy-foundations |
| Critique, heuristics, states audit, dark patterns, review a link, image or code | review, audit, critique, feedback, راجع | syntropy-ux-review | syntropy-accessibility, syntropy-compliance-ux |
| Fees, returns, risk lines, CMA, SAMA, Sharia statement, PDPL consent, anti-pressure, limits | fee, VAT, risk, disclosure, consent, Sharia, CMA, إفصاح | syntropy-compliance-ux | syntropy-content |
| Icons, illustrations, empty-state art | icon, illustration, أيقونة, رسم | syntropy-icons-illustration | syntropy-rtl-arabic (mirroring) |
| References, benchmarks, competitors, "how do other apps do X", moodboard | research, inspiration, Mobbin, Refero, Lazyweb, ابحث | syntropy-inspiration | syntropy-patterns |
| Feature or flow from idea to handoff, brief, problem statement, metrics, Mixpanel events, tickets, acceptance criteria, usability test | new feature, plan, brief, metric, event, ticket, handoff | syntropy-product-workflow | all of the above as needed |
| Build or edit in Figma, bind variables, audit a frame | Figma, frame, use_figma, variant, bind | syntropy-figma | syntropy-components, syntropy-foundations |
| Flutter, Angular, CSS, Tailwind, tokens in code, PR | Flutter, widget, Angular, CSS, Tailwind, PR, code | syntropy-code-adapters | syntropy-foundations, lint |

## Mixed requests: order of skills

| Request | Order |
|---|---|
| "Design a payout details screen" (Quick) | intake (syntropy) → syntropy-inspiration → syntropy-patterns (payouts) → syntropy-components → syntropy-content → syntropy-compliance-ux → syntropy-figma or syntropy-code-adapters → syntropy-ux-review + syntropy-accessibility |
| "Plan a new zakah flow" (Flow) | intake (syntropy) → syntropy-product-workflow (leads all phases, calls the others) |
| "Build this Figma frame in Flutter" | syntropy-figma (read) → syntropy-code-adapters → syntropy-components (names) → lint |
| "Translate this screen to Arabic" | syntropy-content → syntropy-rtl-arabic (mirroring) → syntropy-accessibility (labels) |
| "Make this button more visible" | syntropy-foundations (tokens) + syntropy-accessibility (contrast); never a new color |
| "Write the risk line under Invest" | syntropy-compliance-ux (lead) → syntropy-content (length, tone); mark for Compliance confirmation |
| "Which icon for cash-out, and should it flip in RTL?" | syntropy-icons-illustration → syntropy-rtl-arabic |

## Examples
- Do: "Copy belongs to syntropy-content; the fee line is checked by syntropy-compliance-ux."
- Don't: answer a contrast question from memory when syntropy-accessibility holds the measured pairs.
- Do: hand a three-screen invest flow to syntropy-product-workflow after the brief.
- Don't: start drawing an invest flow straight after question 1.

## Sources
- AGENTS.md (where the knowledge lives)
- skills/*/SKILL.md descriptions (each skill's triggers)
