# Logos: Safqah, mada, Absher

How to use the three logo components in Syntropy: `SafqahLogo` (08r), `MadaLogo` (08q) and `AbshirLogo` (08p). Open this whenever a logo appears on a screen, an email, a deck or a co-branded surface.

## Rules
1. Use the logo components only, never a redrawn, traced, screenshotted or downloaded logo.
   Why: logos are trademarked assets; components are exact vectors from the official files.
2. Never recolour a logo outside its own variants: `SafqahLogo` uses only its seven `Color` values; `MadaLogo` and `AbshirLogo` use only `Tone=Brand`, `Mono` or `Inverse`.
   Why: brand colours of third-party marks belong to their owners; Safqah's seven colours are the only allowed fills.
3. Never stretch, rotate, skew, crop, add effects (shadow, glow, outline), animate, or mirror a logo. Logos do not mirror in RTL.
   Why: any distortion is trademark misuse; logos are direction-neutral.
4. Keep clear space around `SafqahLogo` equal to the height of the diamond glyph, and never go below 24 px tall on screen (8 mm in print).
   Why: below that the wordmark breaks down.
5. Use third-party marks only for their real meaning: `AbshirLogo` only for Absher / Nafath identity steps, `MadaLogo` only where mada is the payment rail. Never as a generic "verified", "secure" or "card" icon.
   Why: implying an endorsement or a rail that is not there is misleading.
6. Logo colours are not UI colours. Pigment Green (#02AD4C), Royal Green (#277D57), Absher green (#089247) and mada blue/green never become button, text or background colours.
   Why: UI uses `bg/brand/primary` and other tokens.

## SafqahLogo (08r)
| Property | Values | Default |
|---|---|---|
| `Form` | `Main` (stacked, two lines صفقة / المالية), `Variant` (inline, one line صفقة المالية) | `Main` |
| `Color` | `Black`, `White`, `Dark`, `Offwhite`, `PigmentGreen`, `RoyalGreen`, `Yellow` | `Black` |

- `Form=Main` where there is vertical room (splash, headers, marketing). `Form=Variant` for tight or wide spaces (AppBar, footer, email signature).
- Colour by background:

| Background | `Color` |
|---|---|
| Light neutral (`bg/surface`, `bg/base`, white, off-white) | `PigmentGreen` (component guide's lead) or `RoyalGreen` |
| Dark surface, Dark mode, photography | `White` or `Offwhite` |
| Brand green surface (`bg/brand/primary`) | `Offwhite` or `White` |
| Brand yellow surface (`bg/brand/yellow`) | `Dark` |
| Monochrome on light, print on uncoated stock | `Dark` or `Black` (`RoyalGreen` also prints well) |
| Busy photo | Place on a solid panel first, then pick by panel colour |

The older Logos foundation page names Royal Green as the 80 percent default and lists five variants; the `SafqahLogo` component guide (seven colours) leads with `PigmentGreen`. Both are official logo colours. In product UI follow the component guide; for print and campaigns confirm with brand.

- Co-branding: equal optical size, separated by a line, a plus or generous space; both clear-space rules apply; marketing approves co-branded material. Never alter the partner's logo.
- Small sizes (favicons, app icons under 48 px): use the app icon, not the wordmark.

## MadaLogo (08q)
| Property | Values | Default |
|---|---|---|
| `Size` | `16`, `24`, `32`, `48`, `64` (height px) | `16` |
| `Tone` | `Brand` (full colour), `Mono` (`text/default`), `Inverse` (`text/inverse`) | `Brand` |

- Fixed lockup: two bars (blue over green) + مدى / mada wordmark. Never rearrange.
- Prefer `Size=24` or larger so the wordmark stays legible.
- `Brand` on light neutral surfaces; `Inverse` on dark surfaces and photos; `Mono` for single-colour or print.
- Use only to show mada as an accepted payment method (card entry, checkout, payment method list).

## AbshirLogo (08p)
| Property | Values | Default |
|---|---|---|
| `Size` | `16`, `24`, `32`, `48`, `64` | `16` |
| `Tone` | `Brand` (Absher green #089247, fixed), `Mono` (`text/default`), `Inverse` (`text/inverse`) | `Brand` |

- Mark only (no wordmark), 2:3 portrait. Keep the ratio.
- Use only where the flow really touches Absher / Nafath (identity verification, government authentication).
- `Brand` on light surfaces, `Inverse` on dark, `Mono` when single colour is needed.

## Examples
| Do | Don't |
|---|---|
| AppBar with `SafqahLogo` `Form=Variant` `Color=PigmentGreen` on `bg/base` | Logo recoloured to `bg/brand/primary` #4daa57 |
| Dark mode splash: `SafqahLogo` `Form=Main` `Color=Offwhite` | Royal Green logo on near-black |
| Nafath step: «التحقق عبر نفاذ» with `AbshirLogo` `Size=24` `Tone=Brand` | Absher mark as a generic "verified" badge on a profile |
| Payment methods row with `MadaLogo` `Size=24` | mada bars recoloured to match the theme |
| Arabic screen with the logo exactly as in English | Mirrored logo in RTL |

## Sources
- Figma component pages: SafqahLogo 08r (69:970, set 3831:301), MadaLogo 08q (69:969, set 3822:332), AbshirLogo 08p (69:968, set 3809:377).
- Figma foundation page Logos 69:881 (`data/foundations/logos.md`).
- Brand Guidelines (Notion 49c64ca145b84c509ffbe8c473ad66a7).
