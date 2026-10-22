# Template: Design review and self-review (Design)

The structure for a design review and the eight lenses an agent runs on its own design before showing it. Feature: self-review plus one review. Flow: self-review plus two reviews (concept, pre-handoff).

## Rules
1. Self-review first, every time: run the eight lenses with syntropy-ux-review on every screen, RTL and LTR, Light and Dark.
   Why: catch your own normalised mistakes before people spend time on them.
2. Bring specific asks to a review.
   Why: reviewers need to know what feedback helps.
3. Walkthrough first, feedback after; on a real device when possible, especially for RTL.
   Why: reviewers see the flow as a user would.
4. Feedback goes through the eight lenses in order.
   Why: structured and complete.
5. End with decisions, open items, owners and next review date.
   Why: a review without actions changes nothing.
6. Critique the design, not the designer; lead with what works; "have you considered X?" over "you should do X".
   Why: keeps critique safe and useful.

## The eight lenses (self-review checklist)
| # | Lens | Check | Typical Safqah finding |
|---|---|---|---|
| 1 | Solves the problem | Re-read the problem statement; does this screen move the primary metric? | Reinvest card placed below the fold of the payout detail |
| 2 | Mental model | Matches what research says users expect | Wallet («المحفظة») and portfolio («المحفظة الاستثمارية») mixed up |
| 3 | Clarity | Anything unclear, ambiguous or easy to miss? One primary action? | Two `Variant=primary` buttons on the confirm sheet |
| 4 | States and edge cases | Default, empty, loading, error, success, permission denied, offline; zero balance, above limit, below minimum, fee present | No offline state for the wallet balance |
| 5 | RTL | Mirroring, directional icons, digits not reversed, mixed strings | Chevrons pointing right in Arabic lists |
| 6 | Accessibility | Contrast pairs, 44x44 pt targets, labels, focus order, 200% text | Muted text on `bg/elevated` below AA |
| 7 | Design system | Only Syntropy instances, semantic tokens, text styles | Custom card instead of `CardInfo`; one-off radius 10 |
| 8 | Feasibility | Data exists in the API; Flutter or Angular can build it | Realised return shown but no backend field |

Add for money and regulated screens: fee before commit, risk line next to the CTA, projected not promised, no fake urgency, cash-out as easy as deposit (see syntropy-compliance-ux).

## Review agenda template
```
# Design review: [project]
- Date / type: Early concept / Mid-fi / Hi-fi / Pre-handoff / duration
- Presenter / attendees

## 1. Context (5 min)
- Problem statement:
- Decisions already made:
- Validated so far:
## 2. Specific asks (2 min)
## 3. Walkthrough (15-25 min)
## 4. Feedback through the eight lenses (15-20 min)
## 5. Decisions and actions (5 min)
| Decision / open item | Owner | Due |
|---|---|---|
- Next review:
```

## Self-review output format (what the agent writes)
```
Self-review: [screen], RTL + LTR, Light + Dark
| Lens | Finding | Severity | Fix / logged |
|---|---|---|---|
| 4 States | No error state for amount above balance | High | Added «المبلغ أكبر من رصيدك المتاح.» |
Result: 0 Critical, 0 High open.
```

## Examples of specific asks
- "Pressure-test the flow concept, not the visuals."
- "The RTL version feels off; help me diagnose."
- "Is this too many steps for a withdrawal?"
- "Final polish: catch anything I've normalised."

## Sources
- Notion: TEMPLATE Design Review Agenda/Handover `3481a53e-1a6b-8162-836b-c8ad0b2af766`; 03 Design `3481a53e-1a6b-8198-b225-d2b8958dabde`.
- Full copy: `references/data/ux/lifecycle/design-review.md`.
