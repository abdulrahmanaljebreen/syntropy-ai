# Syntropy usage check

How to verify that a design or build uses real Syntropy components with exact variants and semantic tokens only, against `data/components-index.json` and `data/tokens-resolved.json`, plus the Syntropy lint. Open at step 1 of every review (full or quick).

## Rules
1. Every component in the work exists in `data/components-index.json` under `components[].name`, spelled exactly (case and spaces matter: `Sheet Content / Summary`, `Table / ActionCell`, `SpinnerRing`). Why: invented components cannot be built or maintained.
2. Every variant value is one of that component's `props[].options` (type `VARIANT`), with the exact case of the index (`Button Variant=primary`, `Size=lg`, `State=loading`; `StatusPill Tone=warning Variant=subtle`). Booleans use the listed prop names (`showClose`, `HasIcon`, `Has icon leading`). Why: wrong values do not map to Figma or code.
3. In Figma, components are library instances, not detached frames or local copies. A detached instance or a look-alike frame is a `DS` finding. Why: detached copies stop receiving fixes.
4. Colours, spacing, radius and type are bound to semantic tokens: `bg/*`, `text/*`, `border/*`, `icon/*`, `space/*`, `radius/*`, the built text styles. Primitives (`Color/Primary/LightGreen/500`) and raw values (`#4daa57`, `15px`) are findings. Why: P1 and P7; raw values break theming and Dark mode.
5. A component marked `hidden: true`, or on a page with `status: wip`, is not used in product work without saying so. Why: not yet stable.
6. If nothing in the index fits, the finding says so and suggests the closest composition of existing components; never invent a name. Why: Syntropy non-negotiable.
7. Code is linted before the review is final: `node lint/cli.mjs <files>` in the Syntropy repo, or the Syntropy MCP tool `lint_ui`. Every lint error is a finding. Why: the lint encodes the token, direction, copy and contrast rules.

## Looking things up (Node one-liners, run from the skill folder)

```bash
# Does a component exist? Closest names if not.
node -e 'const c=require("./references/data/components-index.json").components;const q=process.argv[1].toLowerCase();const hit=c.find(x=>x.name.toLowerCase()===q);console.log(hit?`${hit.name} (${hit.id}) page=${hit.page} status=${hit.status} hidden=${hit.hidden}`:"NOT FOUND. Similar: "+c.filter(x=>x.name.toLowerCase().includes(q.split(" ")[0])).map(x=>x.name).slice(0,8).join(", "))' "StatusPill"

# Variant options of a component
node -e 'const c=require("./references/data/components-index.json").components.find(x=>x.name===process.argv[1]);for(const p of c.props)console.log(p.type.padEnd(14),p.name,(p.options||[]).join(" / ")||`default=${p.default}`)' "Button"

# Is a token semantic, and what are its Light and Dark values?
node -e 'const t=require("./references/data/tokens-resolved.json").tokens[process.argv[1]];console.log(t?`${t.collection} ${JSON.stringify(t.value)} ${t.description||""}`:"NOT A TOKEN")' "text/muted"

# Which semantic token has this hex in Light? (to translate a raw value into a token)
node -e 'const T=require("./references/data/tokens-resolved.json").tokens;const h=process.argv[1].toLowerCase();for(const[k,v]of Object.entries(T))if(v.collection==="Semantic"&&Object.values(v.value).some(x=>String(x).toLowerCase()===h))console.log(k,JSON.stringify(v.value))' "#f4f6f2"
```

## Component index fields you need

| Field | Meaning |
| --- | --- |
| `name` | exact component or set name |
| `kind` | `set` (has variants) or `component` |
| `page`, `pageCode`, `family` | where it lives (for example `02a Button`, family `02 Actions`) |
| `status` | page status: `stable` or `wip` |
| `hidden` | internal part, do not use directly |
| `props[]` | `name`, `type` (`VARIANT`, `BOOLEAN`, `TEXT`, `INSTANCE_SWAP`), `options`, `default` |
| `frames.reference` | node id of the reference frame (to open with the Figma MCP) |

## Token families (semantic, use these)

| Family | Examples |
| --- | --- |
| Surface | `bg/surface` (canvas), `bg/base` (content), `bg/elevated` (cards, sheets), `bg/inverse`, `bg/overlay` |
| Brand | `bg/brand/primary`, `bg/brand/primary-subtle`, `text/brand/darkest`, `border/brand/primary` |
| Status | `bg/success-subtle` + `text/success`, `bg/warning-subtle` + `text/warning`, `bg/error-subtle` + `text/error`, `info`, `caution`, `progress` |
| Text | `text/default`, `text/muted`, `text/subtle` (placeholder only), `text/inverse`, `text/on-brand`, `text/disabled` |
| Border | `border/default`, `border/subtle`, `border/strong`, `border/focus` |
| Icon | `icon/default`, `icon/muted`, `icon/subtle` |
| Space | `space/none` 0, `space/2xs` 2, `space/xs` 4, `space/sm` 8, `space/md` 12, `space/lg` 16, `space/xl` 20, `space/2xl` 24, `space/3xl` 32, `space/4xl` 48, `space/5xl` 64 |
| Radius | `radius/default` (20) and the `radius/*` scale |
| Type | built text styles `role / size / weight` (for example `body / 14 / regular`, `heading / 20 / semibold`) |

## Checking by source

| Source | How to check components | How to check tokens |
| --- | --- | --- |
| Figma link | Figma MCP `get_metadata` or `get_design_context` on the given node: instance names and variant properties; compare with the index | `get_variable_defs` for bound variables; raw fills and paddings appear as literal values in `get_design_context` |
| Image | visual match only: name what each element looks like and the likely component; mark as "visual estimate" | sample colours, map to the nearest semantic token, mark as estimate; ask for the Figma link to confirm |
| URL | read the DOM and CSS (browser tools): class names, CSS variables (`var(--bg-elevated)`) | computed styles: raw colours and px values vs token variables |
| Code | component imports and usage (`<Syntropy.Button variant=...>`, Dart `SafqahButton(...)`) | lint: `no-raw-color`, `off-palette-color`, `no-raw-spacing`, `no-raw-radius`, `unknown-component`, `unknown-variant` |

## Lint rules (13)
`no-raw-color` · `off-palette-color` · `no-raw-spacing` · `no-raw-radius` · `physical-direction` · `no-em-dash` · `eastern-arabic-numerals` · `currency-position` · `percent-label-nisba` · `unknown-component` · `unknown-variant` · `fake-urgency` · `contrast`.
Errors exit 1; report each as `LINT:<rule>` with the line and the fix the lint names. Suppression comments in product code (`syntropy-lint-disable`) are themselves a finding unless the line is a documented "Don't" example.

## Examples
- Do: «`StatusPill Tone=warning Variant=subtle HasIcon=true` exists (04e, stable)». Don't: «use a `Badge` with orange background» when the index has no such variant.
- Do: «card fill `#F4F6F2` equals `bg/elevated` Light; bind the variable». Don't: «colour looks fine».
- Do: «`Loader` is not a Syntropy component; use `SkeletonBlock` for first load or `Button State=loading` for actions».

## Sources
- `data/components-index.json`, `data/tokens-resolved.json`
- `data/ux/principles.md` (P1, P2, P7, V1 to V3)
- Syntropy lint README (13 rules) in the Syntropy repo
