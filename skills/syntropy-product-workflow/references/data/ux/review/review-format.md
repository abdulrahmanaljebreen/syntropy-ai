# Self-review report format

How an agent reports a self-review of a Safqah design or build: severity scale, the fields every finding needs, a scored summary table and a copy-paste markdown template. Use at the end of any design, build or audit task, after checking `heuristics.md`, `fintech-heuristics.md`, `states.md`, `dark-patterns.md` and `../accessibility/`.

## Rules
1. Every finding has: ID, severity (0 to 4), category (heuristic or WCAG SC), screen or component, finding, evidence, fix, owner. Why: anything missing makes the finding impossible to act on or verify.
2. Evidence is concrete: a screenshot path, Figma node id, file and line, test name and output, or a contrast ratio from `contrast-pairs.json`. Never "seems" or "might". Why: reviewers must reproduce it.
3. A fix names Syntropy components, variants and tokens exactly (`Button State=loading`, `text/brand/darkest`). Why: fixes must be implementable without interpretation.
4. Report what passed too, in the summary table. Why: shows coverage; silence is not a pass.
5. Do not inflate or deflate severity to look good. If unsure between two levels, choose the higher one and say why. Why: honest triage.
6. Never use the em dash character; keep each finding to 1 to 3 lines per field. Why: CONVENTIONS; reports are scanned, not read.

## Severity (Nielsen 0 to 4, adapted for money)

| Level | Name | Meaning | Safqah examples | Action |
| --- | --- | --- | --- | --- |
| 0 | Not a problem | disagreement, no usability impact | personal style preference | none |
| 1 | Cosmetic | noticeable, no effect on task success | spacing off by one step, icon weight mismatch | fix when convenient |
| 2 | Minor | slows or confuses some users; workaround exists | unclear hint, inconsistent term, missing skeleton | fix before next release |
| 3 | Major | many users fail or err; or any confusion on money, KYC, payments; or a WCAG A/AA failure on a core flow | fee not shown before confirm, unlabeled icon-only button in checkout, text below 4.5:1 | fix before ship |
| 4 | Catastrophic | blocks the task, causes financial loss, legal or regulatory exposure, or is a dark pattern | double charge possible, irreversible action with no confirm, pre-ticked risk acknowledgement, fake urgency | stop ship, fix now |

Severity drivers: frequency (how many users), impact (how bad), persistence (does it recur). Money and accessibility on the main flow raise severity by at least one level.

## Categories
- `H1` to `H10`: Nielsen (`heuristics.md`)
- `F1` to `F12`: Safqah fintech (`fintech-heuristics.md`)
- `S:<state>`: missing or broken state (`states.md`)
- `DP:<pattern>`: dark pattern (`dark-patterns.md`)
- `WCAG <SC>`: for example `WCAG 1.4.3` (`../accessibility/wcag22-aa.md`)
- `DS`: Syntropy misuse (invented component, raw hex, wrong variant)

## Owners
`design` · `flutter` · `web` · `backend` · `content` · `product` · `ds` (design system team: token or component defects such as `border/strong` under 3:1 in Light) · `compliance`.

## Scoring
- Per category, score = Pass, or the highest severity found.
- Overall score out of 100: start at 100, subtract 0 / 1 / 3 / 8 / 20 per finding of severity 0 / 1 / 2 / 3 / 4, floor at 0.
- Verdict: **Ship** (no 3 or 4, score 85+), **Fix then ship** (no 4, at most two 3s with fixes agreed), **Do not ship** (any 4, or three or more 3s).

## Template

Copy, fill, delete unused rows.

```markdown
# Self-review: <screen or flow name>

Scope: <screens, components, platforms>. Locales: AR (RTL), EN (LTR). Themes: Light, Dark. Text scale: 1.0, 2.0.
Method: heuristics H1-H10, F1-F12, states, dark patterns, WCAG 2.2 AA; tools: <npm test, Flutter guidelines, axe, VoiceOver AR>.

## Verdict
<Ship | Fix then ship | Do not ship> · Score <n>/100 · Findings: <n4> catastrophic, <n3> major, <n2> minor, <n1> cosmetic

## Summary

| Area | Result | Highest severity | Findings |
| --- | --- | --- | --- |
| H1 Visibility of status | Pass / Finding | 0-4 | R-01 |
| H2 Real-world match | | | |
| H3 Control and freedom | | | |
| H4 Consistency | | | |
| H5 Error prevention | | | |
| H6 Recognition | | | |
| H7 Efficiency | | | |
| H8 Minimalism | | | |
| H9 Error recovery | | | |
| H10 Help | | | |
| F1-F12 Fintech | | | |
| States | | | |
| Dark patterns | | | |
| WCAG 2.2 AA | | | |
| Syntropy usage (DS) | | | |

## Findings

### R-01 · Severity 3 · F2 + WCAG 1.4.3 · Checkout summary
- **Finding**: management fee is shown in `text/subtle` below the confirm button.
- **Evidence**: Figma node <id>; `text/subtle on bg/base` = 3.20 (Light) in contrast-pairs.json, verdict large-only; fee at 12px.
- **Fix**: move fee into the `KeyValue` list above the total, `text/default`, body size; total row shows net.
- **Owner**: design

### R-02 · Severity <n> · <category> · <where>
- **Finding**:
- **Evidence**:
- **Fix**:
- **Owner**:

## Passed checks
- <for example: all tap targets 48x48 (androidTapTargetGuideline pass); text scale 2.0 no overflow>

## Not checked (and why)
- <for example: live captions N/A, no video on these screens>
```

## Example finding lines
- `R-03 · 4 · DP:Preselection · Risk acknowledgement` · Evidence: `Checkbox` default checked in Figma <node>. Fix: default unchecked; confirm `Button` explains requirement on tap. Owner: design.
- `R-04 · 3 · WCAG 4.1.2 · BalanceToggle` · Evidence: VoiceOver reads «زر» only. Fix: `Semantics(toggled:, label: 'إخفاء الرصيد')`. Owner: flutter.
- `R-05 · 3 · DS + WCAG 1.4.3 · Solid success StatusPill` · Evidence: `text/on-brand on bg/success` 2.22 Light, 1.94 Dark. Fix: use `Variant=subtle`. Owner: design.

## Sources
- https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/
- https://www.nngroup.com/articles/ten-usability-heuristics/
- knowledge/ux/accessibility/contrast-pairs.json
