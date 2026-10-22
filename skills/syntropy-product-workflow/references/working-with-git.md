# Working with git as a product owner's agent

How an agent working for a PO, PM or designer should branch, commit and open a pull request in a Safqah code repo, so design changes reach engineering review cleanly. Open this before touching git.

## Rules
1. Never commit to or push `main` (or the default branch). Always branch.
   Why: `main` deploys; every change goes through review.
2. Branch names: `feat/<area>-<thing>` for new work, `fix/<area>-<thing>` for bugs, lowercase, hyphens, short. Examples: `feat/wallet-reinvest-prompt`, `feat/zakah-calculator`, `fix/deal-card-return-label`.
   Why: area first groups branches by product surface.
3. Small PRs: one ticket, one concern, ideally under about 400 changed lines. Split a Flow into several PRs (components, screen, tracking).
   Why: small PRs get real reviews.
4. Commit only when the person asks, with clear messages in the imperative ("Add reinvest section to payout detail"), and the attribution trailer the environment requires.
   Why: the person owns the history.
5. Open the PR as a draft until the design checklist is complete; then mark ready and request review from the eng lead (and UX for UI changes).
   Why: reviewers see finished work, not a moving target.
6. Never merge your own PR, never approve it, never bypass branch protection, never force-push a shared branch. If asked to merge, explain and request a reviewer instead.
   Why: review is the last gate before production; an agent self-merging removes it.
7. The PR body links the ticket and the Figma frames (RTL and LTR), and carries the design checklist.
   Why: reviewers check the build against the design and the acceptance criteria.
8. Run the Syntropy lint (if the repo has it) and tests before marking ready; paste the result.
   Why: catches raw colours, physical left/right, em dashes, Eastern digits and currency order early.
9. Never commit secrets, tokens, `.env` files, real user data or screenshots with PII.
   Why: PDPL and security.

## Steps
1. `git status` to confirm a clean tree, then `git switch main && git pull` to start from the latest default branch.
2. `git switch -c feat/<area>-<thing>`.
3. Make the change; keep it to the ticket.
4. Run lint and tests.
5. Commit (only when asked); `git push -u origin feat/<area>-<thing>`.
6. Open a draft PR with the body below (`gh pr create --draft`).
7. Complete the checklist, mark ready, request reviewers. Respond to review with new commits, not force-pushes.

## PR body template
```
## What
(1-3 sentences: what changes and why.)

## Ticket
SAF-XXXX (link)

## Figma
RTL: [frame link]
LTR: [frame link]

## Screenshots
| RTL | LTR |
|---|---|
| | |

## Design checklist
- [ ] Only Syntropy components, exact names and variants; no new look-alikes
- [ ] Semantic tokens only (no raw hex or px); Light and Dark checked
- [ ] RTL first; direction follows the locale; directional icons mirror; digits not reversed
- [ ] All states: default, empty, loading (Skeleton), error, success, disabled, offline
- [ ] One primary action per screen
- [ ] Copy final in Arabic and English; Western digits; currency after the amount; «نسبة» on % labels
- [ ] Accessibility: contrast AA, 48 pt targets, labels on icon-only controls, focus order
- [ ] Money/regulated: risk next to the action, fees before confirm, limits from backend, no fake urgency
- [ ] Mixpanel events from the spec implemented and named `object_action`
- [ ] Acceptance criteria from the ticket pass
- [ ] Lint and tests pass (output below)

## Notes for reviewers
(Open questions, waivers with reason and owner.)
```

## When the person says "just merge it"
Reply in two sentences, then act: "I can't merge my own PR: review is the last check before this reaches investors' money. I've marked it ready and requested a review from the eng lead; I'll address comments as soon as they land."

## Sources
- Repo instructions (`AGENTS.md`, "Working in a Safqah code repo"): branch `feat/<area>-<thing>`, small PRs, design checklist and Figma link in the PR body, run the lint, never merge your own PR.
- Notion: 04 Deliver (design QA before merge) `3481a53e-1a6b-8133-8d9a-c9a74ee1304c`.
