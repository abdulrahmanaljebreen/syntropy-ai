<!-- syntropy-lint-disable fake-urgency, eastern-arabic-numerals, unknown-variant, percent-label-nisba: fail examples are shown on purpose -->
# Quick review: the top 10 checks

A 10-check review for small changes: a copy edit, one component swap, a spacing fix, a single state added, a small code diff. Open when the change touches one screen and no money commitment, KYC, consent or new flow. Anything bigger gets the full review.

## Rules
1. Use quick mode only for small, contained changes. Escalate to the full review when the change: commits or moves money, touches KYC, consent, disclosure or permissions, adds a screen or flow, or when any quick check finds severity 3 or 4. Why: small diffs can still break money flows.
2. Run all 10 checks; do not stop at the first finding. Why: coverage.
3. Output the short format below: one line per check (Pass, Finding with severity, or N/A with reason), then findings with exact fixes, then the verdict. Why: fast to read, still evidence-based.
4. Same severity scale and verdict rules as the full review (`review-format.md`). Why: one standard.

## The 10 checks

| # | Check | How | Fail example | Fix example |
| --- | --- | --- | --- | --- |
| 1 | Real Syntropy components, exact variants | names and variant values match `data/components-index.json` (`syntropy-usage-check.md`) | `<PrimaryButton>`, `Button Variant=main`, a detached card | `Button Variant=primary Size=lg` |
| 2 | Semantic tokens only | no raw hex, px spacing or radius; lint clean for code | `#4daa57`, `padding: 15px` | `bg/brand/primary`, `space/lg` |
| 3 | Contrast in Light and Dark | pairs from the recommended table, or the contrast script (see syntropy-accessibility); known risks listed as system issues | hint in `text/subtle`; white on a solid success or warning chip | `text/muted`; `StatusPill Variant=subtle` (brand green as built is accepted, not a finding) |
| 4 | Copy rules | Arabic first, minimal (label, control, one hint), Western digits, currency after amount, «نسبة» on % labels, no em dash, no flattery or urgency (see syntropy-content) | «سارع! عائد ١٦٪» | «نسبة العائد المتوقع 16.0%» |
| 5 | States touched by the change | loading, error, empty, disabled (with reason), success exist where the change needs them (`states.md`) | new button with no loading or disabled reason | `Button State=loading`; reason line |
| 6 | Targets and labels | 48dp app / 24px web; icon-only controls labelled in Arabic and English | 24px unlabelled share icon | 48x48 hit area, «مشاركة الفرصة» |
| 7 | RTL | logical properties (`margin-inline-start`, `EdgeInsetsDirectional`), mirrored directional icons, order follows reading direction (see syntropy-rtl-arabic) | `margin-left`, `EdgeInsets.only(left:)`, back arrow pointing left in Arabic | `ms-*`, `EdgeInsetsDirectional.only(start:)`, `BackButton` mirrored |
| 8 | Money clarity and consistency | amount, fee, net, date before any commit; same value and format everywhere (F2, F7) | «100,000» here, «100,000.00 ر.س» there | one format: «100,000.00 ر.س» |
| 9 | No dark patterns | no fake urgency, pre-ticked consent, confirmshaming, hidden cost (`dark-patterns.md`) | consent `Checkbox State=checked` by default | `State=unchecked` |
| 10 | One primary action, honest tones | one `Button Variant=primary` per screen; warning tone for warnings, red only for critical or defaulted | two primary buttons; «متأخرة» in red | secondary `Variant=secondary`; `StatusPill Tone=warning` |

## Output format

```markdown
# Quick review: <change>
Scope: <files or node ids>. Mode: quick (escalate if any 3+).

1 Components ...... Pass
2 Tokens .......... Finding (2): R-01
3 Contrast ........ Pass (text/muted on bg/elevated 6.28 / 8.42)
4 Copy ............ Finding (2): R-02
5 States .......... N/A (copy-only change)
6 Targets, labels . Pass
7 RTL ............. Pass
8 Money ........... N/A (no amounts)
9 Dark patterns ... Pass
10 Primary, tones . Pass

R-01 · 2 · DS · Card.tsx:14 · `padding: 15px` (lint no-raw-spacing) · Fix: `var(--space-lg)` · Owner: web
R-02 · 2 · COPY · Card.tsx:22 · «عائد 16%» lacks «نسبة» (lint percent-label-nisba) · Fix: «نسبة العائد المتوقع 16.0%» · Owner: content

Verdict: Ship after R-01 and R-02 (score 94, no 3 or 4).
```

## Escalation triggers (switch to the full review)
- The diff includes a confirm, pay, withdraw, invest, reserve or cancel action.
- A consent, acknowledgement or permission prompt is added or changed.
- A new screen, a new flow, or more than one screen changes.
- Any finding is severity 3 or 4.
- You cannot verify a check (for example no access to the Figma node): say so and ask for the source.

## Sources
- `review-format.md`, `states.md`, `dark-patterns.md`, `syntropy-usage-check.md`
- `data/ux/principles.md`, `data/content/quality-checklist.md`
