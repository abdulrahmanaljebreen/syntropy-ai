# Git and pull requests

How to branch, commit and open a pull request for Syntropy UI work in any Safqah repo, with the design checklist every UI PR carries.

## Rules
1. Branch from the repo's integration branch (`dev` in the developer portal, never `main`) and name it `feat/<area>-<thing>` (`feat/deals-card-deal`, `feat/theme-syntropy-tokens`). Use `fix/<area>-<thing>` for bugs and `chore/<area>-<thing>` for tooling.
   Why: predictable names make the PR list scannable and map to the area owner.
2. One purpose per PR: a token sync, one component, or one screen. Keep it small enough to review in one sitting.
   Why: mixed PRs hide token changes inside feature diffs.
3. Commit messages carry the ticket key when there is one: `SAF-1234: add CardDeal row layout`. End with the attribution lines the session requires.
   Why: traceability from Linear to code.
4. Run syntropy-lint on the changed files and fix every error before opening the PR; paste the summary line in the PR body.
   Why: review time is for judgment, not for spotting hex values.
5. Link the Figma node of every component or screen you implemented (`https://www.figma.com/design/a7Z956YZy9n6f9uz5DK16Y?node-id=417-2` for `Button`), taken from the component index, never a work-in-progress area.
   Why: the reviewer compares implementation to design in one click.
6. Attach screenshots in Arabic RTL and English LTR, Light and Dark, for every changed screen.
   Why: RTL and Dark regressions are invisible in a code diff.
7. Never merge your own PR, never force push a shared branch, never commit secrets or `.env` files.
   Why: a second pair of eyes is the last gate; history rewrites destroy others' work.
8. `gh pr create` needs an explicit base when the default branch is not the integration branch (`--base dev` in the developer portal).
   Why: GitHub defaults to `main` there.
9. Generated token files change only in token PRs, together with the source JSON. Never hand-edit them in a feature PR.
   Why: a hand edit is overwritten on the next sync.

## PR template
```markdown
## What
One paragraph in plain language: what changed for the user.

## Figma
- Component / screen: <name> · https://www.figma.com/design/a7Z956YZy9n6f9uz5DK16Y?node-id=<id>
- Readiness gate (R5): passed / figma-blocked (<reason>)

## Design checklist
- [ ] Tokens only: no hex, no Colors.*, no magic px, no raw TextStyle (R4)
- [ ] No direction or size-class parameter; RTL from locale (R1)
- [ ] Names match Figma verbatim: tokens, components, variant values (R3)
- [ ] Logical properties only (start/end, ps/pe/ms/me, EdgeInsetsDirectional)
- [ ] Checked in Arabic RTL and English LTR
- [ ] Checked in Light and Dark
- [ ] States: loading, empty, error, content (and disabled where relevant)
- [ ] Long Arabic string, long English string, large number
- [ ] Strings in both locale files; Western digits; currency after the amount; no em dash
- [ ] Touch targets 48 x 48 (app) and visible focus (web); icon-only controls labelled
- [ ] Known contrast debt in the Figma pair noted (if any)

## Lint
`node lint/cli.mjs <changed files>` → 0 error(s), N warning(s) (explain any warning kept)

## Screenshots
| | Light | Dark |
|---|---|---|
| Arabic (RTL) | | |
| English (LTR) | | |

## Not done / follow-ups
Anything unfinished or untested, named plainly.
```

## Review rules
| As author | As reviewer |
|---|---|
| Self-review the diff before requesting review | Open the Figma link and compare |
| Mark the PR draft until lint and build pass | Check the RTL screenshot first |
| Answer every comment, resolve only your own threads | Block on R1 to R6 violations; suggest, do not block, on style |
| Re-request review after changes | Approve only what you ran or saw |

## Sources
- Syntropy Widgetbook plan (section 8 Definition of Done, C-series governance tickets)
- `~/developer-portal-fe/CLAUDE.md` (Git workflow, safety rails)
- syntropy-ai `AGENTS.md` (working in a Safqah code repo)
