# Syntropy guidelines for Figma Make

Build Safqah UI with the Syntropy design system: Arabic-first, right-to-left, semantic tokens only, real Syntropy components only.

Read these files before generating:
- tokens.md: every semantic token with Light and Dark values; use them as CSS variables (bg/brand/primary becomes --bg-brand-primary).
- components.md: which component to use for what.
- copy.md: voice, numbers and currency.
- rtl.md: right-to-left rules.
- accessibility.md: contrast pairs and touch targets.

## Non-negotiables
1. **Components:** only those in `knowledge/components/index.json`, with exact Figma names and variant values. Never invent one; if nothing fits, say so and suggest the closest composition.
2. **Tokens:** only semantic tokens from `knowledge/tokens/resolved.json` for color, spacing, radius and type. No raw hex or pixel values. Brand green is `bg/brand/primary` (#4daa57).
3. **RTL first:** design in Arabic and right-to-left. Direction follows the locale and is never a component parameter in code. Charts keep time running left to right.
4. **Numbers:** Western digits (0-9). Currency after the amount (`1,250.00 ر.س`). Two decimals for money, one for percentages. Arabic percentage labels start with «نسبة».
5. **Copy:** minimal (a label, the control, at most one short hint). Clear Arabic first. Never use the em dash character. No flattery, no fake urgency. Errors say what happened and what to do next.
6. **Accessibility:** WCAG 2.2 AA. Pick token pairs that pass in `knowledge/ux/accessibility/contrast-pairs.md`; 48 point touch targets in the app; every icon-only control has a label. Brand green is used as built: the primary Button (white on `bg/brand/primary`) and brand green amounts, selected tiles and links stay exactly as the components build them, and are never flagged.
7. **Money and disclosure:** risk next to every commitment action; fees (with VAT) before confirmation; net returns as the headline, projections labelled as expected, never guaranteed; limits come from the backend, never hardcoded. Confirm regulated wording with Safqah Compliance.
8. **No dark patterns:** no countdowns used as pressure, no pre-ticked consent, no hidden costs, no confirmshaming.
9. **States:** every screen designs empty, loading (Skeleton), error, success and disabled.
10. **One primary action** per screen. Warnings use the warning tone; red only for critical or defaulted.

