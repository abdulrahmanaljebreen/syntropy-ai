# Web: CSS, React and Next.js

How to consume Syntropy on the web with CSS custom properties generated from the DTCG tokens: Light and Dark themes, logical properties for RTL, `dir` and `lang`, text styles, and a React component that mirrors its Figma props.

## Rules
1. Load `assets/syntropy.css` once, globally, before any component CSS. Never copy individual values out of it.
   Why: it is generated; a copied value stops following token changes.
2. Reference tokens as `var(--<token name with / and spaces replaced by ->)`: `bg/brand/primary` is `var(--bg-brand-primary)`, `space/lg` is `var(--space-lg)`, `radius/default` is `var(--radius-default)`.
   Why: R3, and syntropy-lint recognises these names.
3. Theme with the `data-theme` attribute on `<html>`: no attribute follows the OS (`prefers-color-scheme`), `data-theme="dark"` forces Dark, `data-theme="light"` forces Light. Never write `.dark .card { background: #121614 }`.
   Why: every semantic variable already has its Dark value.
4. Set `lang` and `dir` on `<html>` from the active locale (`<html lang="ar" dir="rtl">`), in one place only. Components never set `dir`.
   Why: R1; one owner avoids mixed-direction pages.
5. Use logical properties only: `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `border-inline-start`, `text-align: start`, `border-start-start-radius`. Never `left`, `right`, `margin-left`, `padding-right`, `text-align: left`.
   Why: logical properties flip with `dir`; physical ones break RTL (lint rule `physical-direction`).
6. Typography uses the generated text-style classes (`.text-body-14-regular`) or the same variables in a component class. No raw `font-size: 15px`.
   Why: R4; 15 is not on the scale and the line height would be wrong.
7. Mirror directional icons with `:dir(rtl)` or `[dir="rtl"] &` (`transform: scaleX(-1)`) only for arrows and chevrons; never mirror logos, digits, checkmarks, clocks or chart axes.
   Why: what mirrors and what does not is fixed by the RTL rules.
8. Component props mirror Figma names minus `Direction` and interaction states: `<Button variant="primary" size="md">`.
   Why: R1 and R3.

## Setup
```html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="/syntropy.css">
  </head>
  <body>...</body>
</html>
```
Next.js App Router:
```tsx
// app/layout.tsx
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import './syntropy.css';

const plex = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-plex' });

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: 'ar' | 'en' } }) {
  const locale = params.locale ?? 'ar';
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={plex.variable}>
      <body>{children}</body>
    </html>
  );
}
```
When using `next/font`, point the family at it once: `:root { --font-family: var(--font-plex), system-ui, sans-serif; }` in a file loaded after `syntropy.css`.

## Writing component CSS
```css
.deal-card {
  background: var(--bg-elevated);
  color: var(--text-default);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding-block: var(--space-md);
  padding-inline: var(--space-lg);
  display: grid;
  gap: var(--space-sm);
  box-shadow: var(--shadow-sm);
}
.deal-card__meta { color: var(--text-muted); text-align: start; }
.deal-card__chevron { margin-inline-start: auto; color: var(--icon-muted); }
.deal-card__chevron:dir(rtl) { transform: scaleX(-1); }
```
A 1px border width is a hairline, not a spacing value; it is allowed.

## React component mirroring Figma
```tsx
// Figma Button 417:2: Variant, Size, State, Direction, Label, Has icon leading/trailing
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'error' | 'text';
type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  variant?: ButtonVariant;      // Variant
  size?: ButtonSize;            // Size
  loading?: boolean;            // State=loading
  iconLeading?: React.ReactNode;  // Has icon leading + Icon leading
  iconTrailing?: React.ReactNode;
}
// No `dir` or `direction` prop: the button inherits it from <html dir>.

export function Button({ label, variant = 'primary', size = 'lg', loading, iconLeading, iconTrailing, disabled, ...rest }: ButtonProps) {
  return (
    <button className={`syn-button syn-button--${variant} syn-button--${size}`} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {iconLeading}<span>{label}</span>{iconTrailing}
    </button>
  );
}
```
```css
.syn-button { display: inline-flex; align-items: center; gap: var(--space-sm); border-radius: var(--radius-full); font-family: var(--font-family); }
.syn-button--lg { min-block-size: 48px; padding-inline: var(--space-xl); font-size: var(--font-size-16); line-height: var(--font-line-height-16); font-weight: var(--font-weight-semibold); }
.syn-button--md { min-block-size: 40px; padding-inline: var(--space-lg); font-size: var(--font-size-14); line-height: var(--font-line-height-14); font-weight: var(--font-weight-semibold); }
/* Brand green as built: same pair as Figma, accepted by the lint. */
.syn-button--primary { background: var(--bg-brand-primary); color: var(--text-on-brand); }
.syn-button--primary:hover { background: var(--bg-brand-primary-hover); }
.syn-button--primary:active { background: var(--bg-brand-primary-pressed); }
.syn-button:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
/* Disabled controls are exempt from WCAG 1.4.3. */
/* syntropy-lint-disable-next-line contrast */
.syn-button:disabled { background: var(--bg-disabled); color: var(--text-disabled); }
```
Heights 48 and 40 are the component's documented sizes, not spacing tokens.

## Do and Don't
| Do | Don't |
|---|---|
| `margin-inline-start: var(--space-sm)` | `margin-left: 13px` |
| `color: var(--text-muted)` | `color: #535d58` or `color: gray` |
| `<html dir="rtl">` set by the locale service | `<Button dir="rtl">` |
| `[data-theme="dark"]` from a theme toggle | `@media (prefers-color-scheme: dark) { .card { background: #000 } }` |
| `.text-heading-20-bold` | `font-size: 21px; font-weight: 700` |

## Sources
- `knowledge/tokens/resolved.json` (via `assets/syntropy.css`)
- `knowledge/ux/rtl.md`
- Syntropy Widgetbook plan (R1, R3, R4)
