# Template: Design brief (Define)

The input document for the Design phase: everything a designer (or an agent generating designs) needs before opening Figma: the problem, users, scope, constraints, content and references. Filled at the end of Define, after the problem statement is locked.

## Rules

1. Copy the problem statement and metrics verbatim from `problem-statement.md`; do not reword them.
   Why: one source of truth.
2. Map constraints before design starts: regulatory/Sharia, technical (Flutter, backend), business, accessibility, brand.
   Why: a design Compliance rejects in week 6 wastes three weeks.
3. Accessibility and brand baselines below are non-negotiable defaults; add project specifics under "Additional".
   Why: they apply to every Safqah feature.
4. Both languages are in scope by default: Arabic (RTL) and English (LTR).
   Why: RTL is designed in, not added.

## Template

```
# Design brief: [project]

## Header
- Project name:
- Designer:
- PM:
- Eng Lead:
- Start date:
- Target design complete date:

## 1. Problem
(Copy the problem statement and success metrics.)

## 2. Users
- Primary user segment:
- Secondary / edge users to consider:
- Relevant insights from Discover: (link findings)

## 3. Scope
- In scope: (screens, flows, interactions)
- Out of scope:
- Dependencies: (other features, backend changes, content)

## 4. Constraints
### Regulatory / Sharia
- (required disclosures, wording, CMA rules)
### Technical (Flutter, backend)
-
### Business
-
### Accessibility
- WCAG AA minimum (repo target WCAG 2.2 AA)
- RTL support mandatory
- Minimum touch target 44x44 pt
- Text scales to 200% without breaking layout
- Additional:
### Brand
- Safqah brand system: semantic tokens, IBM Plex Sans Arabic, brand green via bg/brand/primary
- Syntropy (Design System v2) components wherever available
- Additional:

## 5. Content
- Who owns copy for this project?
- Languages required: Arabic (RTL) + English (LTR)
- Existing copy or terminology to align with: (see knowledge/content/glossary.md)

## 6. Reference
- Competitor / reference products:
- Existing Safqah patterns to align with:
- Relevant past research:

## 7. Risks and unknowns
(Flag as you go; topics for critique or eng sync.)
-
-

## 8. Success criteria for this phase
- [ ] Hi-fi screens for all in-scope flows, RTL + LTR
- [ ] Clickable prototype for the critical path
- [ ] Usability test results (or waiver rationale)
- [ ] Accessibility checklist completed
- [ ] Design system gaps documented
- [ ] Two design reviews completed
```

## Examples
| Section | Good | Weak |
|---|---|---|
| Regulatory | "Show the CMA risk statement and the Sharia structure (`ShariaDisclosure`) before the commit button" | "Follow compliance" |
| Scope | "In: deal page distributions section. Out: payout settings screen" | "The deal page" |
| Technical | "Payout dates come from the schedule API; no realised returns field yet" | Empty |

## Sources
- Notion: TEMPLATE Design Brief, `3481a53e-1a6b-81a5-9bb9-f2e296521323`.
- Notion: 02 Define, constraint mapping, `3481a53e-1a6b-8105-bfa7-e50b05e9525a`.
- Note: Notion said "WCAG 2.1 AA minimum"; repo `AGENTS.md` targets WCAG 2.2 AA.
