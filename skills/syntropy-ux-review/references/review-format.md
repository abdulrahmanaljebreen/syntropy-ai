<!-- syntropy-lint-disable fake-urgency, percent-label-nisba: the worked example quotes the violations it reports -->
# Review report format

How to write a Syntropy review: severity scale, required fields per finding, scoring, verdict, the copy-paste template, and a complete worked example (an invest confirmation screen). Open at step 10 of every full review. Long form: `data/ux/review/review-format.md`.

## Rules
1. Every finding has: ID, severity (0 to 4), category, where (screen, component, node id or file:line), finding, evidence, fix, owner. Why: anything missing makes it impossible to act on or verify.
2. Evidence is concrete: Figma node id, screenshot region, file and line, lint output, test name, a contrast ratio from the pair table or the contrast script. Never "seems" or "might". If evidence is a visual estimate from an image, say so. Why: reviewers must reproduce it.
3. The fix names exact Syntropy components, variants, tokens and copy (`Button State=loading`, `text/default`, «تأكيد استثمار 100,000.00 ر.س»). Why: implementable without interpretation.
4. Report what passed in the summary table, and what was not checked with the reason. Why: silence is not a pass.
5. Never inflate or deflate severity. If unsure between two levels, take the higher and say why. Never change a verdict because someone asks for a pass. Why: honest triage protects users and the team.
6. Brand green as built (primary Button, brand green labels and selected states) is accepted and never listed. Known system issues (token or component defects such as `text/on-brand` on `bg/success`, 2.22 Light / 1.94 Dark) are always listed under "System issues", severity 3, owner `ds`, with evidence. They do not count toward this screen's score or verdict once logged with the DS team, because the screen team cannot fix them; they are never hidden or called passing. Why: honest about the system without blocking every screen that uses a primary Button.
7. No em dash character; each field 1 to 3 lines; Arabic copy in Arabic script with Western digits. Why: reports are scanned, not read.

## Severity

| Level | Name | Meaning | Safqah examples | Action |
| --- | --- | --- | --- | --- |
| 0 | Not a problem | preference, no impact | personal style | none |
| 1 | Cosmetic | noticeable, no task impact | spacing off one step, icon weight | when convenient |
| 2 | Minor | slows or confuses some; workaround exists | unclear hint, inconsistent term, missing skeleton | before next release |
| 3 | Major | many fail or err; any confusion on money, KYC, payments; WCAG A/AA failure on a core flow | fee not shown before confirm, unlabelled icon button in checkout, text under 4.5:1 | before ship |
| 4 | Catastrophic | blocks the task, financial loss, legal or regulatory exposure, or a dark pattern | double charge possible, irreversible action without confirm, pre-ticked acknowledgement, fake urgency | stop ship |

Drivers: frequency, impact, persistence. Money and accessibility on the main flow raise severity at least one level.

## Categories
`H1` to `H10` (Nielsen) · `F1` to `F12` (fintech) · `S:<state>` (missing or broken state) · `DP:<pattern>` (dark pattern) · `WCAG <SC>` · `DS` (Syntropy misuse: invented component, wrong variant, raw hex or px, detached instance) · `COPY` (content rules) · `COMP` (compliance) · `RTL` (direction) · `LINT:<rule>`.

## Owners
`design` · `flutter` · `web` · `backend` · `content` · `product` · `ds` (design system team) · `compliance`.

## Scoring and verdict
- Per area: Pass, or the highest severity found.
- Score out of 100: start at 100, subtract 0 / 1 / 3 / 8 / 20 per finding of severity 0 / 1 / 2 / 3 / 4, floor at 0 (system issues excluded, rule 6).
- **Ship**: no 3 or 4 and score 85 or more.
- **Fix then ship**: no 4, at most two 3s with agreed fixes and owners.
- **Do not ship**: any 4, or three or more 3s.

## Template

```markdown
# Review: <screen or flow>

Scope: <screens, components, platform>. Source: <Figma node ids | image | URL | files>.
Locales: AR (RTL), EN (LTR). Themes: Light, Dark. Text scale: 1.0, 2.0.
Method: Syntropy usage, 19 states, H1-H10, F1-F12, dark patterns, WCAG 2.2 AA, copy, compliance, RTL, lint.
Tools run: <lint, contrast script, Figma MCP, axe, Flutter guidelines, VoiceOver AR>.

## Verdict
<Ship | Fix then ship | Do not ship> · Score <n>/100 · <n4> catastrophic, <n3> major, <n2> minor, <n1> cosmetic

## Summary
| Area | Result | Highest severity | Findings |
| --- | --- | --- | --- |
| Syntropy usage (DS) | | | |
| States (19) | | | |
| H1-H10 Nielsen | | | |
| F1-F12 Fintech | | | |
| Dark patterns | | | |
| Accessibility (WCAG 2.2 AA) | | | |
| Copy | | | |
| Compliance | | | |
| RTL | | | |
| Lint (code only) | | | |

## Findings (highest severity first)
### R-01 · Severity <n> · <category> · <where>
- **Finding**:
- **Evidence**:
- **Fix**:
- **Owner**:

## System issues (tracked, owner ds, not scored)
- <pair or component> · <ratios or evidence> · <status of the DS ticket>

## Passed checks
- <...>

## Not checked (and why)
- <...>
```

## Worked example: invest confirmation screen

Input: a Figma frame of the confirmation `BottomSheet` for الريم 46, Arabic, Light. Visible: `SheetHeader` «تأكيد الاستثمار» with an icon-only close; `KeyValue` rows «المبلغ 100,000», «المدة 16 شهر», «العائد المتوقع 16%»; a red banner «سارع، العرض ينتهي خلال 09:59»; a `Checkbox` «أوافق على ملخص المخاطر» shown checked; `Button Variant=primary` «تأكيد»; below the button, «تُطبّق رسوم إدارة» in small grey text; card fill and padding set by hand.

```markdown
# Review: Invest confirmation (الريم 46)

Scope: confirmation BottomSheet, app compact. Source: Figma node 1234:5678 (example id).
Locales: AR checked; EN not provided. Themes: Light checked; Dark not provided.
Method: Syntropy usage, 19 states, H1-H10, F1-F12, dark patterns, WCAG 2.2 AA, copy, compliance, RTL.
Tools run: Figma MCP get_design_context and get_screenshot, scripts/contrast.mjs (syntropy-accessibility).

## Verdict
Do not ship · Score 13/100 · 2 catastrophic, 5 major, 2 minor, 1 cosmetic

## Summary
| Area | Result | Highest severity | Findings |
| --- | --- | --- | --- |
| Syntropy usage (DS) | Finding | 2 | R-08 |
| States (19) | Finding | 3 | R-06 |
| H1-H10 Nielsen | Finding | 3 | R-06, R-09 |
| F1-F12 Fintech | Finding | 3 | R-03, R-04, R-07 |
| Dark patterns | Finding | 4 | R-01, R-02 |
| Accessibility (WCAG 2.2 AA) | Finding | 3 | R-03, R-05 |
| Copy | Finding | 2 | R-09 |
| Compliance | Finding | 3 | R-04 |
| RTL | Pass with note | 1 | R-10 |
| Lint (code only) | N/A | | design review |

## Findings
### R-01 · Severity 4 · DP:Preselection + COMP · Risk acknowledgement
- **Finding**: «أوافق على ملخص المخاطر» is checked by default.
- **Evidence**: `Checkbox State=checked` in node 1234:5690.
- **Fix**: `Checkbox State=unchecked`; statement «قرأت ملخص المخاطر» with a link to the summary; confirm explains the requirement on tap.
- **Owner**: design

### R-02 · Severity 4 · DP:Fake urgency + F6 · Red banner
- **Finding**: «سارع، العرض ينتهي خلال 09:59» with no real hold behind it, in the error tone.
- **Evidence**: `Banner Tone=error` with a static timer string; no reservation hold in the flow; lint `fake-urgency` matches «سارع».
- **Fix**: remove. If a real reservation hold exists, show `Countdown` with «نحجز لك المبلغ حتى 2:45 م» and what happens at zero, neutral tone.
- **Owner**: product

### R-03 · Severity 3 · F2 + WCAG 1.4.3 · Fee line
- **Finding**: fee is unquantified and below the confirm button in small `text/subtle`.
- **Evidence**: «تُطبّق رسوم إدارة» at 12px; `text/subtle` on `bg/base` = 3.20 Light (large-only).
- **Fix**: add `KeyValue` rows above the button: «الرسوم 3,000.00 ر.س» (value from backend, incl. VAT) and «صافي العائد المتوقع 18,333.33 ر.س» with `Emphasis=strong`, all `text/default`.
- **Owner**: design

### R-04 · Severity 3 · F5 + COMP · Missing disclosures at confirm
- **Finding**: no risk line next to the confirm action and no cancellation window statement.
- **Evidence**: node 1234:5678 has no risk or cancellation text.
- **Fix**: one risk sentence above `SheetFooter` (approved wording from Compliance, see syntropy-compliance-ux) and «يمكنك إلغاء الاستثمار خلال 48 ساعة» with period from the backend.
- **Owner**: compliance

### R-05 · Severity 3 · WCAG 4.1.2 · Close button
- **Finding**: icon-only close in `SheetHeader` has no accessible name.
- **Evidence**: no label in the spec; VoiceOver would read «زر».
- **Fix**: label «إغلاق» / "Close", 48x48 hit area.
- **Owner**: flutter

### R-06 · Severity 3 · S:Loading action + H1 + F3 · Confirm button
- **Finding**: no loading state; double submit not prevented in the design.
- **Evidence**: only `State=default` exists in the prototype.
- **Fix**: `Button State=loading` on tap, «جارٍ المعالجة» announced; success screen with reference; failure `Dialog` saying whether money moved. Raise to 4 if the backend has no idempotency key.
- **Owner**: design

### R-07 · Severity 3 · F7 · Amount format
- **Finding**: «المبلغ 100,000» differs from the entry screen «100,000.00 ر.س»; «العائد المتوقع 16%» lacks «نسبة» and gross or net.
- **Evidence**: node 1234:5682 vs amount screen 1234:5501.
- **Fix**: «100,000.00 ر.س»; «نسبة العائد السنوي المتوقع 16.0%» and «نسبة صافي العائد السنوي 13.75%».
- **Owner**: design

### R-08 · Severity 2 · DS · Hand-set fill and padding
- **Finding**: card fill `#F4F6F2` and padding 15px are not bound to tokens.
- **Evidence**: get_design_context shows raw fill and 15px padding.
- **Fix**: `bg/elevated`; padding `space/lg`.
- **Owner**: design

### R-09 · Severity 2 · COPY + H6 · Confirm label
- **Finding**: «تأكيد» does not state what is confirmed.
- **Evidence**: button label in node 1234:5695.
- **Fix**: «تأكيد استثمار 100,000.00 ر.س».
- **Owner**: content

### R-10 · Severity 1 · RTL · Close icon side
- **Finding**: close sits top-right, colliding with the title start in RTL.
- **Evidence**: screenshot.
- **Fix**: `SheetHeader` with `Direction=RTL` puts close at the end (left); do not position by hand.
- **Owner**: design

## System issues (tracked, owner ds, not scored)
- `text/on-brand` on `bg/success` (solid success StatusPill): 2.22 Light, 1.94 Dark. Use `Variant=subtle`.

## Passed checks
- Components are real Syntropy instances: `BottomSheet`, `SheetHeader`, `KeyValue`, `Checkbox`, `Button`, `SheetFooter`.
- Western digits; currency after the amount on the entry screen.

## Not checked (and why)
- Dark mode and English: frames not provided.
- Built behaviour (focus order, live regions): design only; recheck on build.
```

Score check: 100 - 20 - 20 - (5 x 8) - (2 x 3) - 1 = 13.

## Sources
- https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/
- https://www.nngroup.com/articles/ten-usability-heuristics/
- `data/ux/review/review-format.md`
