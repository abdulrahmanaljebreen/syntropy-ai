# UX lifecycle (five phases)

How UX work runs at Safqah: a five-phase loop (Discover, Define, Design, Deliver, Measure) that every new feature goes through, with owners, time-boxes, activities, templates and a definition of done per phase. Read this to know which phase a request is in, what artifact it needs next, and which template in this folder to fill.

```
DISCOVER  intake, research, learning
   |
DEFINE    problem framing, success metrics
   |
DESIGN    wireframes, hi-fi, prototype
   |
DELIVER   handoff, QA, Widgetbook parity
   |
MEASURE   Mixpanel review, findings
   |
   +----> back to DISCOVER
```

## Rules

1. Nothing skips a phase. No problem statement, no design work; no handoff checklist, no build; no post-launch review, no "done".
   Why: design without evidence and launches without review were the pre-Q3 2026 failure.
2. Each phase ends only when its definition of done is fully checked.
   Why: the DoD is the gate, not the calendar.
3. Use the template for each artifact (files in this folder). Templates are shortcuts, not bureaucracy.
   Why: nobody starts from a blank page; outputs stay comparable.
4. Arabic RTL and English LTR are designed together from the first wireframe.
   Why: RTL is not a filter applied at the end.
5. Tracking is specified in Define, confirmed at handoff, verified before launch.
   Why: broken tracking blinds the whole Measure phase.
6. Reviews are blameless.
   Why: honesty about outcomes depends on it.

## Phases

### 1. Discover
Goal: understand the problem well enough to design. "If you skip this phase, you'll ship the wrong thing beautifully."
- **Starts when:** a request arrives through the Research Intake Form; Mixpanel flags a drop-off or anomaly; a post-launch review surfaces a problem; leadership asks a strategic question needing user understanding.
- **Ends when:** there is a validated problem worth solving, walked through in a UX + PM handoff meeting.
- **Owner:** UX. Participants: PM, Support/Success, users (when primary research is needed), eng lead (consulted).
- **Time-box:** 1 hour to 14 days, sized to the question.
- **Activities:**
  1. Intake triage within 3 business days into Accepted / Deflected / Parked / Declined.
  2. Desk research first: Mixpanel funnels and events, Metabase dashboards, support tickets, past research, competitor/reference products.
  3. Primary research only if desk research cannot answer (methods table below). A Research Brief for anything longer than a heuristic review.
  4. Synthesis into a Findings Report, tagged by feature, segment and theme.
- **Templates:** `research-intake.md`, `research-brief.md`, `findings-report.md`.
- **DoD:** decision logged (done / deflected / parked / declined); Findings Report archived if research ran; draft problem statement ready for Define; user segments identified.
- **Failure modes:** skipping desk research for interviews; "validating" a decision already made (theatre); never writing up findings.

| Method | When | Effort |
|---|---|---|
| Heuristic review | Fast feedback on an existing design | 2-4 days |
| Usability test, unmoderated (5 participants) | Flows, comprehension | 1-2 weeks |
| Usability test, moderated (5 participants) | Complex flows, deep exploration | 2-3 weeks |
| User interviews (5-8 participants) | Motivations, mental models | 3-4 weeks |
| Survey | Quantitative validation at scale | 1-2 weeks deploy + 2-4 weeks responses |
| Diary study | Long-term behaviour, habits | 4-6 weeks minimum |
Capacity: about 2 active research projects at a time (solo UX).

### 2. Define
Goal: turn a fuzzy problem into a sharp one everyone agrees on.
- **Starts when:** Discover produces a validated problem.
- **Ends when:** three locked artifacts exist: problem statement (agreed by PM + UX + eng lead), 1-3 success metrics, Design Brief.
- **Owner:** UX + PM jointly. Participants: eng lead (feasibility), Compliance (Sharia/regulatory implications).
- **Time-box:** about 3 hours to 7 days.
- **Activities:**
  1. Problem statement workshop (60-90 min): "[User segment] is trying to [goal], but [obstacle], which matters to Safqah because [business impact]." If the room cannot write it, go back to Discover.
  2. Success metrics: 1-3, each measurable (in Mixpanel/Metabase or instrumented before launch), directional, scoped to the flow (not MAU). Types: primary, guardrail, leading.
  3. Constraint mapping: regulatory/Sharia, technical (Flutter, backend, data model), business, accessibility baseline (WCAG AA, RTL mandatory).
  4. "Success looks like": 2-3 sentences describing the end state for the user.
- **Ritual:** Definition review, 30 min, PM + UX + eng aligned on problem, metrics and scope.
- **Templates:** `problem-statement.md`, `brief.md`.
- **DoD:** statement agreed by UX + PM + eng lead; 1-3 metrics with baseline and target; metrics confirmed measurable; constraints in the Design Brief; "success looks like" written.
- **Failure modes:** a solution disguised as a problem ("add a progress bar"); unmeasurable metrics ("users feel confident"); skipping constraints so Compliance rejects in week 6.

### 3. Design
Goal: a validated solution ready to build, not a polished file.
- **Starts when:** Define has locked the problem statement, metrics and brief.
- **Ends when:** an approved prototype solves the problem, uses only Syntropy components (or flags new ones), passed at least one design review, and is validated with users if non-trivial.
- **Owner:** UX. Participants: PM, eng lead (technical sanity), users (testing).
- **Time-box:** about 1 day to 4 weeks.
- **Activities:**
  1. Low fidelity: 2-3 meaningfully different approaches, annotated wireframes.
  2. First design review (pressure-test, not approval), using `design-review.md`.
  3. Hi-fi with Syntropy components; flag new components, variants or tokens to the DS backlog. RTL/Arabic checkpoint: every screen in both directions from the start.
  4. Clickable prototype of the critical path.
  5. Usability test, 5 participants from the target segment (`usability-test.md`); findings with severity; iterate.
  6. Final design review: polish and edge cases.
- **DoD:** hi-fi in RTL and LTR; all components from Syntropy or flagged; prototype of the critical path; usability test done or waived for trivial changes; two design reviews; accessibility checklist (contrast, touch targets, screen reader labels, focus order); PM and eng lead approval.
- **Failure modes:** jumping to hi-fi; designing LTR and "handling RTL later"; testing with coworkers; ignoring Flutter capabilities.

### 4. Deliver
Goal: a shipped feature that matches the design, uses system components, and has tracking instrumented before launch.
- **Starts when:** Design has an approved prototype and the PM schedules sprint capacity.
- **Ends when:** the feature is in production, tracking fires correctly, and Widgetbook parity passes.
- **Owner:** Engineering, with UX as active partner. Participants: Flutter engineers, UX (design QA, parity), PM (acceptance), QA.
- **Time-box:** typically 1-3 sprints.
- **Activities:**
  1. Handoff meeting (45 min): Figma, Design Brief, components used/needed, RTL behaviours, accessibility, Mixpanel spec. If any item is not ready, handoff waits.
  2. Build in Flutter/Angular; new DS components built in Widgetbook and Flutter together.
  3. Design QA on a real device with the parity checklist; all issues resolved or waived before merge.
  4. Tracking verification in Mixpanel Live View.
  5. Launch; the Measure timer starts.
- **Templates:** `handoff-template.md` (with `../checklists/handoff.md`), `../checklists/widgetbook-parity.md`.
- **DoD:** handoff meeting done; built with Syntropy components; Widgetbook use cases updated; design QA passed; events verified in Live View; accessibility audit on the build; PM acceptance; launch date logged.
- **Failure modes:** handing off without the Mixpanel spec; QA only on a laptop simulator; accepting "we'll fix tokens next sprint"; launching without verifying tracking.

### 5. Measure
Goal: learn whether it worked and feed findings back into Discover.
- **Starts when:** 2-4 weeks after launch.
- **Ends when:** a post-launch review is documented and its findings are in the Discover intake.
- **Owner:** UX + PM jointly. Participants: eng lead if needed, the original Define participants.
- **Time-box:** 2 weeks from trigger to documented review.
- **Activities:**
  1. Pull the numbers at 2 weeks: primary metric vs baseline vs target, guardrails, leading signals, surprises, support ticket volume.
  2. Qualitative sweep if ambiguous: support team, session recordings, 2-3 quick interviews.
  3. Post-launch review meeting (45 min): predicted vs actual, what worked/didn't, what to change, decision (ship, iterate, roll back), new questions.
  4. Monthly Lexicon audit (separate from features): deprecate unused events, add descriptions, flag duplicates, rename off-convention events, check property cardinality.
  5. Feed 1-3 new questions into the intake queue.
- **Rituals:** per-feature review 2-4 weeks after launch (45 min); monthly Lexicon audit, first Monday, 2-4 hours; quarterly UX health report.
- **Templates:** `post-launch.md`, `mixpanel-event-spec.md`, `findings-report.md`.
- **DoD:** numbers pulled at 2 weeks; review meeting held; review documented; decision recorded; new questions added to intake; this month's Lexicon audit done.
- **Failure modes:** no review ("it launched, we're good"); vanity metrics without baseline or target; letting Lexicon rot; treating reviews as blame.

## Cross-cutting rituals
- Design critique, 60 min, Thursdays (status in Notion: TBD).
- Monthly Lexicon audit (TBD).
- Per-feature post-launch review, 2-4 weeks after launch (TBD).

## Templates in this folder
| File | Phase | Purpose |
|---|---|---|
| `research-intake.md` | Discover | Anyone requests research |
| `research-brief.md` | Discover | UX's plan for running accepted research |
| `findings-report.md` | Discover / Measure | Structured research output |
| `problem-statement.md` | Define | What we are actually solving, and how we'll know |
| `brief.md` | Define | Inputs, constraints and scope for design |
| `design-review.md` | Design | Structure for critique sessions (Notion: "we may not use it") |
| `usability-test.md` | Design | Plan for validating a prototype |
| `handoff-template.md` | Deliver | Handoff doc wrapping `../checklists/handoff.md` |
| `../checklists/widgetbook-parity.md` | Deliver | Figma vs Flutter match |
| `post-launch.md` | Measure | Did it work, 2-4 weeks after ship |
| `mixpanel-event-spec.md` | Deliver / Measure | Event naming and structure |

## Ownership
- Process owner: Abdulrahman (UX). Engineering liaison: Ayman. Product liaison: Abrar. Escalation: DM Abdulrahman.
- Version v0.1, Q3 2026 kickoff; expect iteration.

## Examples
| Situation | Phase and next artifact |
|---|---|
| PM: "Can you test the new design before launch?" | Discover: reframe via `research-intake.md` (test what, to decide what?) |
| Mixpanel shows 40% drop at KYC step 3 | Discover: desk research, then `findings-report.md` |
| "We need a progress bar in KYC" | Define: rewrite as a problem statement first |
| Hi-fi done in Arabic only | Design: not done; LTR missing |
| Build merged without Live View check | Deliver gate failed |
| Launched 3 weeks ago, no review booked | Measure: schedule `post-launch.md` now |

## Sources
- Notion: UX Process & Lifecycle, `3481a53e-1a6b-8111-9a92-c79e0ac0c3e2`.
- Notion phases: 01 Discover `3481a53e-1a6b-8158-a32c-da3c83a5c8bb`, 02 Define `3481a53e-1a6b-8105-bfa7-e50b05e9525a`, 03 Design `3481a53e-1a6b-8198-b225-d2b8958dabde`, 04 Deliver `3481a53e-1a6b-8133-8d9a-c9a74ee1304c`, 05 Measure `3481a53e-1a6b-81fb-8298-ea91f1948bbd`.
- Notion: Research Intake Form page, `3481a53e-1a6b-813d-9bfd-eec1cb71bc9b` (turnaround table, capacity).
