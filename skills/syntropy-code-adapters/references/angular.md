# Angular: developer portal and back office

How to build Syntropy UI in Safqah's Angular front ends, chiefly the developer portal (`developer-portal-fe`: Angular 20.1, standalone components, signals, Tailwind 3.4, `@ngx-translate/core`). Covers token wiring, the `Language` service that owns direction, component APIs that mirror Figma, and fixing the portal's hard-coded colors.

## Rules
1. Follow the repo's own `CLAUDE.md` first; this file adds the Syntropy layer on top. Where they meet: Tailwind utilities first, logical utilities only, every string in `ar.json` and `en.json`.
   Why: the repo file owns Angular conventions; Syntropy owns values and component APIs.
2. Install `assets/syntropy.css` and `assets/tailwind.preset.cjs`, and remove the raw `theme.extend.colors`, `boxShadow` and gradient blocks from `tailwind.config.js`.
   Why: the current config hard-codes `#02AD4C`, which is not the brand green (`#4daa57`, `bg/brand/primary`), plus colors that exist nowhere in Syntropy.
3. Only the `Language` service (`core/services/language.ts`) sets `lang` and `dir` on `<html>`. Components never take a direction input and never set `dir`.
   Why: R1, and the repo rule that nothing else touches those attributes.
4. Shared UI primitives live in `src/app/shared/` and mirror Figma props: `Button` has `variant` and `size` inputs with the Figma values; no `direction` input, no `sizeClass` input.
   Why: R1, R3 and the size-class rule.
5. Inputs are signal inputs (`input()`), components are standalone with `ChangeDetectionStrategy.OnPush`, templates use `@if` / `@for` with `track`.
   Why: repo Angular rules.
6. No text in templates: labels, `aria-label`s and placeholders come from translation keys.
   Why: repo rule; Arabic is the default language.
7. Never compute money in the front end; format for display in one shared pipe with Western digits and the currency after the amount (`1,250.00 ر.س`, `1,250.00 SAR`).
   Why: the backend owns formulas; Safqah number rules.
8. Display fonts already in the portal (`The Seasons`, `Manchette Fine`) are not Syntropy tokens. Use IBM Plex Sans Arabic (`font-sans`) for product UI and ask design before using any other family.
   Why: one family is the Syntropy rule; marketing exceptions are a design decision.

## Wiring
```js
// tailwind.config.js (after migration)
module.exports = {
  presets: [require('./syntropy/tailwind.preset.cjs')],
  content: ['./src/**/*.{html,ts}'],
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' }), require('@tailwindcss/typography')],
};
```
```scss
/* src/styles.scss */
@import './syntropy/syntropy.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Theme: set `document.documentElement.dataset.theme = 'dark' | 'light'` from one theme service, or leave it unset to follow the OS.

## Direction comes from the Language service
```ts
// core/services/language.ts (existing, keep as is)
use(language: AppLanguage) {
  const root = this.document.documentElement;
  root.lang = language;
  root.dir = language === 'ar' ? 'rtl' : 'ltr';
  return this.translate.use(language);
}
```
Components that must know the direction for a glyph read it from the service signal, never from an input:
```ts
private readonly language = inject(Language);
protected readonly isRtl = computed(() => this.language.current() === 'ar');
```
Prefer CSS: `rtl:-scale-x-100` on the icon needs no TypeScript at all.

## Shared Button mirroring Figma
```ts
// src/app/shared/button/button.ts  (ng generate component shared/button)
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'error' | 'text';
export type ButtonSize = 'lg' | 'md' | 'sm';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-on-brand hover:bg-brand-primary-hover active:bg-brand-primary-pressed',
  secondary: 'bg-base text-brand-darkest border border-brand-primary',
  tertiary: 'bg-brand-lightest text-brand-darkest',
  destructive: 'bg-error text-inverse',
  error: 'bg-error-subtle text-error border border-error-error',
  text: 'bg-transparent text-brand-darkest',
};
const SIZE: Record<ButtonSize, string> = {
  lg: 'min-h-[48px] px-xl text-body-16-semibold',
  md: 'min-h-[40px] px-lg text-body-14-semibold',
  sm: 'min-h-[32px] px-md text-body-13-semibold',
};

@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading() || null"
      [class]="classes()">
      <ng-content select="[iconLeading]" />
      <span>{{ label() }}</span>
      <ng-content select="[iconTrailing]" />
    </button>
  `,
})
export class Button {
  readonly label = input.required<string>();           // Figma Label (already translated by the caller)
  readonly variant = input<ButtonVariant>('primary');   // Figma Variant
  readonly size = input<ButtonSize>('lg');              // Figma Size
  readonly disabled = input(false);                     // Figma State=disabled
  readonly loading = input(false);                      // Figma State=loading
  readonly type = input<'button' | 'submit'>('button');

  protected readonly classes = computed(() =>
    `inline-flex items-center justify-center gap-sm rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-disabled disabled:text-disabled ${VARIANT[this.variant()]} ${SIZE[this.size()]}`,
  );
}
```
```html
<app-button [label]="'deal.invest' | translate" variant="primary" size="md" (click)="invest()" />
```
The `min-h-[48px]` style heights are the component's documented sizes, not spacing tokens; they are the one place an arbitrary value is acceptable, and only inside the shared primitive. The color pairs per variant are illustrative: confirm each against the Figma variant with `get_variable_defs` during the R5 gate.

## Do and Don't
| Do | Don't |
|---|---|
| `class="ps-lg pe-md text-start"` | `class="pl-4 pr-3 text-left"` |
| `class="bg-brand-primary text-on-brand"` | `class="bg-primary"` with `primary: '#02AD4C'` in the config |
| `<app-button variant="secondary">` | `<app-button direction="rtl">` |
| `{{ 'deals.empty.title' \| translate }}` | `<p>لا توجد صفقات</p>` hard-coded |
| `{{ amount \| sarAmount }}` from one shared pipe | `{{ amount * 1.15 }}` computing VAT in the template |

## Checks before done
- `npm run lint`, `npm run build`, `npm test` (name any that could not run).
- syntropy-lint on changed `.html`, `.ts`, `.scss` files.
- The screen seen in Arabic RTL and English LTR, Light and Dark, with loading, empty, error and content states.

## Sources
- `~/developer-portal-fe/CLAUDE.md` (stack, Angular rules, Arabic and RTL, money)
- `~/developer-portal-fe/tailwind.config.js` and `src/app/core/services/language.ts` (15 Oct 2026)
- `knowledge/components/index.json` (`Button` 417:2)
