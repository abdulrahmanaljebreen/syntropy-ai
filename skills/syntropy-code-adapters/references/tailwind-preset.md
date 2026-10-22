# Tailwind preset

How to use Syntropy in a Tailwind CSS 3.4 project with the generated `assets/tailwind.preset.cjs`: installation, the class names it creates, logical utilities for RTL, the `rtl:` variant, and how to migrate a config that hard-codes colors.

## Rules
1. Install the preset and `assets/syntropy.css` together; the preset only points at CSS variables that the CSS file defines.
   Why: without the CSS file every color resolves to nothing.
2. Do not extend the preset with raw colors, spacing or radii in `tailwind.config.js`. If a value is missing, it is a token question for design.
   Why: R4; the preset replaces Tailwind's default palette and scales on purpose.
3. Use semantic classes only: `bg-brand-primary`, `text-muted`, `border-subtle`, `p-lg`, `gap-md`, `rounded-lg`, `text-body-14-regular`, `shadow-sm`.
   Why: R3; the class is the token name with the family prefix as the utility.
4. Use logical utilities: `ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `text-start`, `text-end`, `border-s`, `border-e`, `rounded-s-*`, `rounded-e-*`. Never `pl-*`, `pr-*`, `ml-*`, `mr-*`, `left-*`, `right-*`, `text-left`, `text-right`.
   Why: logical utilities flip with `dir`; physical ones are flagged by syntropy-lint.
5. Use `rtl:` and `ltr:` variants only for glyphs that must mirror (`rtl:-scale-x-100` on a chevron). Never to swap margins.
   Why: logical utilities already handle layout.
6. No arbitrary values (`p-[13px]`, `bg-[#4daa57]`, `text-[15px]`).
   Why: arbitrary values are raw values with extra steps.

## Install
```js
// tailwind.config.js
module.exports = {
  presets: [require('./syntropy/tailwind.preset.cjs')],   // copied from assets/
  content: ['./src/**/*.{html,ts,tsx}'],
};
```
```css
/* styles.css */
@import './syntropy/syntropy.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Class map
| Token family | Tailwind utility | Examples |
|---|---|---|
| `bg/*` | `bg-` | `bg-surface`, `bg-base`, `bg-elevated`, `bg-brand-primary`, `bg-brand-primary-hover`, `bg-warning-subtle`, `bg-disabled` |
| `text/*` | `text-` | `text-default`, `text-muted`, `text-subtle`, `text-brand-primary`, `text-on-brand`, `text-error` |
| `icon/*` | `text-icon-`, `fill-icon-`, `stroke-icon-` | `text-icon-muted` (for `currentColor` icons), `fill-icon-brand-primary` |
| `border/*` | `border-`, `divide-`, `ring-`, `outline-` | `border` (= `border/default`), `border-subtle`, `border-brand-primary`, `ring` (= `border/focus`) |
| `space/*` | every spacing utility | `p-lg`, `px-lg`, `ps-md`, `gap-sm`, `space-y-md`, `ms-xs`, `mt-2xl` |
| `radius/*` | `rounded-` | `rounded` (= `radius/default`, 20), `rounded-lg`, `rounded-full`, `rounded-s-lg` |
| text styles | `text-` | `text-body-14-regular`, `text-heading-20-bold`, `text-display-32-bold`, `text-caption-12-medium` |
| `font/weight/*` | `font-` | `font-regular`, `font-medium`, `font-semibold`, `font-bold` |
| elevation | `shadow-` | `shadow-xs` to `shadow-xl`, `shadow-none` |
| breakpoints | prefixes | `tablet:` (600), `desktop:` (1024), `wide:` (1440) |

`text-` serves both colors and text styles; the names never collide (`text-muted` vs `text-body-14-regular`).

## Example
```html
<article class="bg-elevated text-default border border-subtle rounded-lg px-lg py-md grid gap-sm shadow-sm">
  <h3 class="text-heading-18-semibold">الريم 46</h3>
  <p class="text-body-14-regular text-muted">نسبة العائد المتوقع 14.5%</p>
  <a class="inline-flex items-center gap-xs text-brand-primary ms-auto">
    التفاصيل
    <svg class="size-xl fill-icon-brand-primary ltr:-scale-x-100">...</svg>
  </a>
</article>
```
The chevron glyph points left (forward in Arabic); `ltr:-scale-x-100` mirrors it for English.

## Migrating a config that hard-codes colors
Replace the raw `theme.extend.colors` block with the preset, then rename classes. Example: the developer portal's current config.

| Old class (raw value) | Problem | New class |
|---|---|---|
| `bg-primary` (`#02AD4C`) | wrong green | `bg-brand-primary` |
| `bg-primary-light` (`rgba(2,173,76,0.12)`) | raw alpha | `bg-brand-lightest` or `bg-brand-primary-subtle` (check the Figma node) |
| `text-primary` | wrong green | `text-brand-primary` |
| `text-content` (`#302F2D`) | raw | `text-default` |
| `text-content-secondary`, `text-content-muted` | raw | `text-muted` |
| `text-content-placeholder` | raw | `text-subtle` |
| `bg-cream` | raw | `bg-surface` |
| `bg-success`, `bg-success-light` | raw, same as old primary | `bg-success`, `bg-success-subtle` |
| `bg-warning` (`#FCEE21`, brand yellow) | warning is not brand yellow | `bg-warning` / `bg-warning-subtle`; brand yellow is `bg-brand-yellow` |
| `bg-danger` (`#FF825C`) | raw | `bg-error` / `bg-error-subtle` |
| `bg-info` (`#277D57`, a green) | wrong hue | `bg-info` / `bg-info-subtle` |
| `shadow-green`, custom `boxShadow` | raw | `shadow-xs` to `shadow-xl` |
| `rounded-pill` | duplicate | `rounded-full` |

After migrating, grep for leftovers: `grep -rnE "#[0-9a-fA-F]{3,8}|\b(pl|pr|ml|mr)-|text-(left|right)" src` and run syntropy-lint.

## Sources
- `assets/tailwind.preset.cjs` (generated from `knowledge/tokens/resolved.json`)
- `~/developer-portal-fe/tailwind.config.js` (current raw config, 15 Oct 2026)
- Tailwind CSS 3.4 docs: presets, logical properties, `rtl:` / `ltr:` variants
