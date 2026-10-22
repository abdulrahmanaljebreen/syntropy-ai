<!-- syntropy-lint-disable: this page shows violating examples on purpose -->
# syntropy-lint

One rule set for Syntropy output. AI agents run it on what they just wrote; CI runs it on pull requests. It reads CSS/SCSS, HTML (and Vue/Svelte templates), JS/JSX/TS/TSX, Dart (Flutter), Tailwind class strings, and plain text or Markdown specs (UI copy). Zero dependencies, Node 20+.

## Rules

| id | severity | applies to | catches | fix it names |
|---|---|---|---|---|
| `no-raw-color` | error | css, html, js, dart | hex, `rgb()`, `hsl()`, Dart `Color(0xFF...)`, `Color.fromARGB`, `Color.fromRGBO` whose value IS a token value | the matching token, semantic first, picked by context (`color` → `text/*`, `background` → `bg/*`, `border` → `border/*`, Flutter `TextStyle` → `text/*`, `Container`/`BoxDecoration` → `bg/*`) |
| `off-palette-color` | error | css, html, js, dart | a color that exists nowhere in the token set (any mode) | nearest semantic token by color distance |
| `no-raw-spacing` | warning, error when off-scale | css, html, js, dart | px in `padding`, `margin`, `gap`, `inset`, `top/bottom/left/right`; JS style objects; Tailwind `p-[13px]`; Dart `EdgeInsets.*`, `SizedBox(height:)` | `space/*` by value (`none 0, 2xs 2, xs 4, sm 8, md 12, lg 16, xl 20, 2xl 24, 3xl 32, 4xl 48, 5xl 64`); off-scale values name the two nearest steps |
| `no-raw-radius` | warning | css, html, js, dart | px `border-radius`, `borderRadius`, Tailwind `rounded-[12px]`, Dart `BorderRadius.circular`, `Radius.circular` | `radius/*` by value (20 → `radius/default`) |
| `physical-direction` | error | css, html, js, dart | `margin-left`, `padding-right`, `left:`, `border-left`, `border-top-left-radius`, `text-align: left`, `float: right`; JS `marginLeft`, `textAlign: 'right'`; Tailwind `ml- mr- pl- pr- left- right- text-left text-right rounded-l- rounded-tr- border-l- float-left`; Dart `EdgeInsets.only(left:)`, `EdgeInsets.fromLTRB`, `Alignment.centerLeft`, `Positioned(left:)`, `TextAlign.left`, `BorderRadius.only(topLeft:)`, `Border(left:)` | logical twin: `margin-inline-start`, `ms-`, `ps-`, `text-start`, `rounded-s-`, `EdgeInsetsDirectional.only(start:)`, `EdgeInsetsDirectional.fromSTEB`, `AlignmentDirectional.centerStart`, `PositionedDirectional`, `TextAlign.start` |
| `no-em-dash` | error | all | U+2014 anywhere | comma, colon or full stop |
| `eastern-arabic-numerals` | error | all | U+0660-0669, U+06F0-06F9 (with Arabic separators) | the same number in Western digits |
| `currency-position` | warning | all | `ر.س 100`, `﷼100`, `ريال 100`, and `SAR 100` inside an Arabic phrase | `100 ر.س` |
| `percent-label-nisba` | warning | all | an Arabic line with a % value but no «نسبة», «معدل» or «تغطية» | start the label with نسبة |
| `unknown-component` | warning | js, dart, text | `<Syntropy.X`, Dart `SafqahX(`, spec lines `component: X` where X is not in the manifest (case and spaces ignored) | closest manifest name |
| `unknown-variant` | warning | js, dart, text, html | `variant="primaryy"` on a known component (JSX `<Syntropy.Button>` or `<Button>`), Dart `variant: SafqahButtonVariant.x`, spec `variant: x` lines under `component: X`, inline `Button Variant=x` | closest valid option plus the full option list |
| `fake-urgency` | warning | all | "only 3 left", "hurry", "limited time", "act now", "ending soon", "last chance", countdowns; «سارع», «لفترة محدودة», «آخر فرصة», «بادر الآن», «لا تفوت», «ينتهي خلال» | state the fact (close date, amount) neutrally |
| `contrast` | error | css, html | a rule (or `style=""`) setting both `color` and `background(-color)` to resolvable values: hex, `rgb()`, `var(--bg-brand-primary)` (token `bg/brand/primary`), or a custom property defined in the same file; WCAG 2.x ratio under 4.5:1 | the ratio, plus the strongest passing `text/*` token on that background |

Notes:
- Token files may hold raw values: any filename containing `tokens`, generated adapters (`syntropy.css`, `syntropy_colors.dart`) and `tailwind.preset.*` / `tailwind.config.*` skip the color, spacing and radius rules.
- Comments are ignored by the code rules (colors, spacing, direction) but not by the copy rules (an em dash in a comment is still an em dash).
- `var(--x, #4daa57)` fallbacks are allowed. Translucent backgrounds are skipped by `contrast`. Brand green pairs as built (white on `bg/brand/primary` and its hover and pressed fills, brand green text, icons and borders on light surfaces) are accepted and never reported: the primary Button is used exactly as built in Figma.
- Fenced code blocks in Markdown (```` ```css ````, `tsx`, `dart`, `html` ...) are linted with that language's rules and reported at the right line.

## Interface

```js
import { lintSource, RULES } from './lint/index.mjs';

const findings = lintSource(source, { filename: 'Deal.tsx' });
// [{ rule, severity: 'error' | 'warning', line, column, message, fix }]  sorted by line
```

- `filename` picks the kind from the extension. `kind` overrides it: `'css' | 'html' | 'js' | 'dart' | 'text'`. Unknown extensions run as `text` (copy rules plus spec component checks).
- `RULES` is `[{ id, severity, description, appliesTo }]`.
- Data is read at runtime from `../knowledge/tokens/resolved.json` and `../knowledge/components/index.json`, so a token or manifest sync changes the lint with no code change.

## CLI

```
node lint/cli.mjs <files, directories or globs...> [--json]
```

Prints `file:line:col severity rule message (fix: ...)` and a summary; exits 1 when any error is found (warnings alone exit 0). Directories are walked for lintable extensions; globs support `*`, `**`, `?` and `{a,b}`; `node_modules`, `.git`, `dist`, `build` are skipped. `--json` prints `{ errors, warnings, results: [{ file, findings }] }`.

## Suppressions

```
/* syntropy-lint-disable-next-line no-raw-color */
color: #4daa57; // syntropy-lint-disable-line
<!-- syntropy-lint-disable eastern-arabic-numerals -->   (whole file)
```

With no rule list, the comment silences every rule for that line or file. Use it for "Don't" examples in docs.

## Examples

CSS:

```
.btn { color: #ffffff; background: #4daa57; padding: 13px; margin-left: 8px; }
1:15  error   no-raw-color        raw color #ffffff: use token text/inverse (or text/on-brand)
1:36  error   no-raw-color        raw color #4daa57: use token bg/brand/primary
1:54  error   no-raw-spacing      off-scale spacing 13px: not on the spacing scale, use space/md (12px) or space/lg (16px)
1:60  error   physical-direction  physical direction "margin-left": use margin-inline-start
1:73  warning no-raw-spacing      raw spacing 8px: use token space/sm
```

Tailwind / JSX:

```
<div className="ml-4 text-left p-[13px]"><Syntropy.Button variant="primaryy" /></div>
physical-direction  class "ml-4": use ms-4
physical-direction  class "text-left": use text-start
no-raw-spacing      off-scale spacing p-[13px]
unknown-variant     variant="primaryy" on Button: use primary (options: primary, secondary, tertiary, destructive, error, text)
```

Dart:

```
Padding(padding: EdgeInsets.only(left: 16), child: Text('x', textAlign: TextAlign.left))
physical-direction  EdgeInsets.only(left:/right:): use EdgeInsetsDirectional.only(start:/end:)
no-raw-spacing      raw spacing 16: use token space/lg
physical-direction  TextAlign.left: use TextAlign.start
```

Arabic copy:

```
العائد السنوي ١٦% [U+2014] سارع، ادفع ر.س 500     ([U+2014] stands for a literal em dash)
eastern-arabic-numerals  "١٦": use Western digits "16"
percent-label-nisba      start the Arabic label with نسبة
no-em-dash               rewrite with a comma, colon or full stop
fake-urgency             "سارع": state the fact neutrally
currency-position        "ر.س 500": write the amount first, "500 ر.س"
```

Clean: `نسبة صافي العائد 13.75% · 1,250.00 ر.س` and `.card { color: var(--text-default); background: var(--bg-surface); padding: var(--space-lg); margin-inline-start: var(--space-sm); }` produce no findings.

## Files

| file | role |
|---|---|
| `index.mjs` | `lintSource`, `RULES`, kind inference, Markdown fences, suppressions |
| `rules.mjs` | the 13 rules |
| `data.mjs` | loads tokens and the component manifest, builds indexes |
| `color.mjs` | color parsing, WCAG contrast, color distance |
| `util.mjs` | comment masking, offsets to line/column, bracket matching, edit distance |
| `cli.mjs` | command line |

Tests: `tests/lint.test.mjs`, `tests/lint-cli.test.mjs` (run with `npm test`).

## Sources

- Tokens: `knowledge/tokens/resolved.json`. Components: `knowledge/components/index.json`.
- Writing rules (em dash, Western digits, currency after amount): `docs/CONVENTIONS.md`.
- WCAG 2.x contrast: https://www.w3.org/TR/WCAG21/#contrast-minimum
