# syntropy-lint

How to run syntropy-lint on UI code and copy, what each rule catches, and how to fix it. Run it on what you just wrote, before every PR.

## Rules
1. Run it on every file you changed: `node lint/cli.mjs <files, directories or globs>` from a checkout of the syntropy-ai repo (Node 20+, zero dependencies), or the Syntropy MCP tool `lint_ui` with the source pasted in.
   Why: the lint reads the live token set and component manifest, so its fixes are always current.
2. Errors block the PR; warnings need a one-line reason in the PR body if you keep them.
   Why: warnings are judgment calls; errors are rules.
3. Apply the fix the lint names (it names the token, logical property or component), not the nearest thing that silences it.
   Why: the message is a fix instruction; "silence it" reintroduces drift.
4. Suppress only deliberate examples (docs "Don't" rows, known and documented system debt), with the rule named and a reason next to it.
   Why: a blanket disable hides the next real violation.
5. Do not lint generated adapter files; the lint already skips files named `*tokens*`, `syntropy.css`, `syntropy_colors.dart` and `tailwind.preset.*` / `tailwind.config.*` for color, spacing and radius.
   Why: generated files hold raw values by design.

## Running
```bash
node lint/cli.mjs src/app/features/deals                 # a directory
node lint/cli.mjs "lib/**/*.dart"                        # a glob
node lint/cli.mjs src/app/shared/button/button.ts --json # machine output
```
Output: `file:line:col severity rule message (fix: ...)`, then a summary. Exit code 1 when any error is found; warnings alone exit 0. Kinds come from the extension: CSS/SCSS, HTML (and Vue, Svelte templates), JS/TS/JSX/TSX (including Tailwind class strings), Dart, Markdown and text (copy rules plus fenced code blocks linted in their own language).

In CI: `node path/to/syntropy-ai/lint/cli.mjs $(git diff --name-only origin/dev...HEAD)`.

## The rules
| Rule | Severity | Catches | Fix |
|---|---|---|---|
| `no-raw-color` | error | hex, `rgb()`, `hsl()`, Dart `Color(0xFF...)`, `Color.fromARGB` whose value is a token value | the matching token, picked by context (`color` to `text/*`, `background` to `bg/*`, `border` to `border/*`) |
| `off-palette-color` | error | a color that exists nowhere in Syntropy (for example `#02AD4C`) | the nearest semantic token for the role |
| `no-raw-spacing` | warning, error off-scale | px padding, margin, gap, inset; Tailwind `p-[13px]`; Dart `EdgeInsets.*`, `SizedBox(height:)` | `space/*` by value; off-scale values name the two nearest steps |
| `no-raw-radius` | warning | px `border-radius`, Tailwind `rounded-[12px]`, Dart `BorderRadius.circular` | `radius/*` by value (20 is `radius/default`) |
| `physical-direction` | error | `margin-left`, `text-align: left`, Tailwind `ml-`, `pl-`, `text-left`, Dart `EdgeInsets.only(left:)`, `Alignment.centerLeft`, `Positioned(left:)` | the logical twin: `margin-inline-start`, `ms-`, `ps-`, `text-start`, `EdgeInsetsDirectional`, `AlignmentDirectional`, `PositionedDirectional` |
| `no-em-dash` | error | the em dash character anywhere, comments included | comma, colon or full stop |
| `eastern-arabic-numerals` | error | Eastern Arabic digits | the same number in Western digits |
| `currency-position` | warning | currency before the amount in Arabic | `1,250.00 ر.س` |
| `percent-label-nisba` | warning | an Arabic % label without «نسبة» (or «معدل», «تغطية») | start the label with «نسبة» |
| `fake-urgency` | warning | "only 3 left", "hurry", countdown pressure, «سارع», «لفترة محدودة», «آخر فرصة» | state the fact (close date, amount) neutrally | <!-- syntropy-lint-disable-line: intentional example -->
| `unknown-component` | warning | `<Syntropy.X>`, Dart `SafqahX(` where X is not in the manifest | the closest manifest name | <!-- syntropy-lint-disable-line: intentional example -->
| `unknown-variant` | warning | `variant="primaryy"`, `SafqahButtonVariant.x` not in the Figma options | the closest valid option and the full list |
| `contrast` | error | a rule setting both `color` and `background` that resolves below 4.5:1 | the ratio and the strongest passing `text/*` token |

## Reading a finding
```
src/app/features/deals/deal-card.html:14:22 error physical-direction class "ml-4": use ms-4
```
`ms-4` is the logical twin of the class as written; with the Syntropy preset the spacing key is a token, so write `ms-lg` (16) or the step the design uses.

```
lib/deals/deal_tile.dart:31:18 error no-raw-color raw color Color(0xFF4DAA57): use token bg/brand/primary
```
Replace with `context.colors.bgBrandPrimary`.

## Suppressing a deliberate example
Brand green as built (white on `bg/brand/primary`, brand green on light surfaces) is accepted by the `contrast` rule, so the primary Button needs no suppression.

```css
/* A "Don't" sample in docs: white on a solid success fill (2.22:1). */
/* syntropy-lint-disable-next-line contrast */
.doc-dont { background: var(--bg-success); color: var(--text-on-brand); }
```
In Markdown table rows use an inline comment with a colon so the comment's closing `-->` is not read as a rule name: `<!-- syntropy-lint-disable-line: intentional example -->`.

## Sources
- syntropy-ai `lint/README.md`, `lint/rules.mjs` (13 rules)
- Syntropy Widgetbook plan, section 10 (lint messages name the fix)
