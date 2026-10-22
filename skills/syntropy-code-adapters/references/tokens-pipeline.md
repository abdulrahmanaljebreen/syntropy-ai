# Tokens pipeline: DTCG to Dart, CSS and Tailwind

How Syntropy tokens flow from Figma into code: the DTCG files, the zero-dependency generator shipped with this skill, and a Style Dictionary v4 config for app repos that want the build inside their own pipeline.

## Rules
1. Figma is the source; the DTCG JSON in the syntropy-ai repo (`knowledge/tokens/`) is the committed snapshot; every platform file is generated from it.
   Why: one direction of flow; nobody edits generated output.
2. Generate only Semantic tokens for product code (`bg/*`, `text/*`, `border/*`, `icon/*`, `space/*`, `radius/*`, `font/*`) plus the five shadows. Primitives are inputs, not outputs.
   Why: primitives are never used directly in UI.
3. Light and Dark come from the same token names with two modes; build both from one run.
   Why: two pipelines drift.
4. Name transforms are mechanical (R3): CSS kebab (`--bg-brand-primary`), Dart camel (`bgBrandPrimary`), Tailwind key without the family (`brand-primary` under `backgroundColor`).
   Why: names are the contract.
5. A token change reaches code in one PR: sync, regenerate, commit the generated files, review the diff.
   Why: a visible diff is how reviewers catch accidental changes.

## The files
| File | Content |
|---|---|
| `knowledge/tokens/primitive.json` | Primitive Core: Color, Spacing, Radius, Shadow (DTCG, colors as `{colorSpace, components, hex}`, dimensions as `{value, unit}`) |
| `knowledge/tokens/semantic.light.json` / `semantic.dark.json` | Semantic collection per mode, values are references (`{Color.Neutral.50}`, `{Spacing.16}`) |
| `knowledge/tokens/typography.arabic.json` / `typography.english.json` | Primitive / Typography per language mode |
| `knowledge/tokens/text-styles.json` | The 37 text styles (`caption`, `body`, `heading`, `display`) |
| `knowledge/tokens/shadows.json` | `shadow/xs` to `shadow/xl`, two layers each |
| `knowledge/tokens/resolved.json` | Every token with final values per mode (what this skill's generator reads) |

## Option A: the generator in this skill (zero dependencies)
```bash
node scripts/generate-snippets.mjs           # writes assets/syntropy.css, tailwind.preset.cjs, syntropy_colors.dart, syntropy_tokens.dart
node scripts/generate-snippets.mjs --check   # CI: exit 1 when a generated file is stale
```
It reads `references/data/tokens-resolved.json` and `references/data/text-styles.json` (falling back to the repo's `knowledge/tokens/`). Use it to bootstrap a project or when a full build tool is not wanted.

## Option B: Style Dictionary v4 in an app repo
```js
// tokens/build.mjs  (npm i -D style-dictionary@^4)
import StyleDictionary from 'style-dictionary';

// DTCG 2025 values are objects; flatten them so SD's transforms see plain values.
StyleDictionary.registerPreprocessor({
  name: 'syntropy/flatten-values',
  preprocessor: (dict) => {
    const walk = (node) => {
      for (const v of Object.values(node)) {
        if (!v || typeof v !== 'object') continue;
        if ('$value' in v) {
          const x = v.$value;
          if (x && typeof x === 'object' && 'hex' in x) v.$value = x.hex;
          else if (x && typeof x === 'object' && 'value' in x && 'unit' in x) v.$value = `${x.value}${x.unit}`;
        } else walk(v);
      }
    };
    walk(dict);
    return dict;
  },
});

const isSemantic = (t) => /semantic\.(light|dark)\.json$/.test(t.filePath);
const base = ['tokens/primitive.json', 'tokens/typography.arabic.json'];

for (const mode of ['light', 'dark']) {
  const sd = new StyleDictionary({
    preprocessors: ['syntropy/flatten-values'],
    usesDtcg: true,
    include: base,
    source: [`tokens/semantic.${mode}.json`],
    platforms: {
      css: {
        transformGroup: 'css',              // name/kebab: bg.brand.primary -> --bg-brand-primary
        buildPath: 'src/styles/',
        files: [{
          destination: `syntropy.${mode}.css`,
          format: 'css/variables',
          filter: isSemantic,
          options: { selector: mode === 'light' ? ':root' : '[data-theme="dark"]', outputReferences: false },
        }],
      },
      flutter: {
        transformGroup: 'flutter',          // name/camel: bgBrandPrimary, Color(0xFF...)
        buildPath: 'lib/theme/generated/',
        files: [{ destination: `syntropy_${mode}.dart`, format: 'flutter/class.dart', filter: isSemantic, options: { className: `Syntropy${mode[0].toUpperCase()}${mode.slice(1)}` } }],
      },
    },
  });
  await sd.buildAllPlatforms();
}
```
- `flutter/class.dart` produces static constants per mode. Wrap them in the `SyntropyColors` ThemeExtension (see `flutter.md` and `assets/syntropy_colors.dart`) so widgets read `context.colors`, never the per-mode class.
- For Tailwind, keep the preset pointing at CSS variables (`assets/tailwind.preset.cjs`); it does not need regenerating when only values change, only when token names are added or removed.
- Add the dark selector's `prefers-color-scheme` block by hand once in a wrapper CSS file, or use Option A's output which already contains it.
- Pin the Style Dictionary major version and review the generated diff in every token PR.

## Typical token PR
1. Sync tokens in syntropy-ai (`npm run tokens:build`), or pull the new snapshot.
2. Regenerate (`node scripts/generate-snippets.mjs` or `node tokens/build.mjs`).
3. Commit source JSON and generated files together; the PR body lists added, renamed and removed tokens.
4. A renamed or removed token is a breaking change: search usages and migrate in the same PR.

## Sources
- `knowledge/tokens/*.json` (DTCG snapshot from Figma)
- Syntropy Widgetbook plan, Layer 1 (tokens) and tickets P1 to P6
- Style Dictionary v4 docs: `usesDtcg`, preprocessors, `css/variables`, `flutter/class.dart`
