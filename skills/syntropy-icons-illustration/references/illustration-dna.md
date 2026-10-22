# Illustration DNA

The visual rules behind every Safqah brand illustration (hero scenes, decorative spot graphics, status graphics): closed palette, the two gradients, form rules and bans. Open this before commissioning, generating, briefing or reviewing any illustration, and to push back on off-brand requests.

## Rules
1. Use the closed 10-colour palette below and nothing else. If a concept cannot be drawn with it, use a chart or an icon instead.
   Why: one palette makes the website, app and collateral feel like one product.
2. Use one of the two gradients only: the primary ramp (#008150 → #00B224 → #FBE900, diagonal) or the subtle fade (#00B224 → transparent white, vertical).
   Why: the gradient logic is what makes the illustrations recognisable.
3. Gradients: diagonal 45° or 135° (occasionally vertical 90°), never horizontal; 2 to 3 stops, never 4+; dark end always a saturated green; light end either yellow or transparent white, never both.
   Why: horizontal and multi-stop gradients look generic or rainbow-like and muddy.
4. Bold, simplified geometric forms with clean edges. No outlines except a subtle yellow-green rim (#FFEB00) where shapes catch light.
   Why: the brand is geometric and calm, not sketchy.
5. Shadows inside illustrations use dark teal #004348 at 30 to 50 percent opacity, never black or grey, and never a Figma drop shadow added on top.
   Why: double or black shadows look accidental and dirty the palette.
6. Banned: 3D renders, photorealism, stock photos as illustration, watercolour or painterly textures, gradient meshes, rainbow or multi-colour palettes, blue or red tones, heavy outlines, realistic shadows, figurative human or animal forms and faces.
   Why: each one breaks the system or the brand's Sharia-sensitive, calm character.
7. These palette hex values are for illustration artwork only. UI around an illustration uses Syntropy tokens (see syntropy-foundations).
   Why: illustration colours are not themable UI tokens.
8. The canonical source is the brand team's Illustrator files. Do not redraw or "fix" an illustration in Figma; request changes from the brand team. AI-generated art is a draft until the brand team accepts it.
   Why: Figma redraws drift from the brand standard.
9. Never stretch, recolour, layer two hero scenes, or use an illustration as a button or card background.
   Why: distortion and competing gradients hurt legibility.

## Palette (closed)
| Hex | Name | Role |
|---|---|---|
| #FFFFFF | White | Gradient fade-to, negative space |
| #FBE900 | Highlight yellow | Top of the green ramp, rim accents |
| #FFEB00 | Yellow variant | Bright accents, rim light |
| #FFED00 | Yellow tertiary | Bottom end of the yellow stop |
| #00B224 | Primary green | Main fill, most used green |
| #00AE26 | Primary green variant | Layered fills |
| #008150 | Mid green / teal | Middle and dark end of the ramp |
| #004348 | Dark teal | Shadows, deep accents |
| #86888A | Mid grey | Inactive / dimmed tiles |
| #DBDCDD | Light grey | Non-active tile fill |

Top four (white, #00B224, #00AE26, #FBE900) carry about 80 percent of usage.

## The two gradients
| Gradient | Stops | Direction | Where |
|---|---|---|---|
| Primary ramp | #008150 → #00B224 → #FBE900 | Diagonal 45° or 135° | Hero illustrations, isometric tiles, large decorative shapes |
| Subtle fade | #00B224 → transparent white | Vertical | Small spot graphics (light bulb, rocket, ascending arrows), soft glow |

Highlights sit top-right or top-left, consistent within one composition.

## Three modes
| Mode | Size | Where | Not |
|---|---|---|---|
| Hero illustration | 400 to 900 px wide | Marketing pages, onboarding heroes, feature reveals | Inline in product UI |
| Decorative spot graphic | 100 to 400 px | Section accents, collateral, ornament | Anywhere it could be read as a functional icon |
| Status illustration | 80 to 200 px | In-app feedback, empty states, qualification | Marketing heroes |

In-app status moments use the isocon set first (see `illustrations.md`); brand-palette status graphics are for cases the isocons do not cover.

## Brief template (for the brand team or an image model)
Fill the brackets; keep the rest verbatim.

> [SUBJECT], flat vector illustration for a Saudi, Sharia-compliant fintech brand. Use only: bright green #00B224 (primary fill), darker green #00AE26 (secondary fill), highlight yellow #FBE900 (rim accent), mid green-teal #008150 (gradient mid-tone), dark teal #004348 (shadows only). Linear gradients diagonal 45° from dark green to highlight yellow, 2 to 3 stops. Bold geometric forms, clean edges, no outlines except a subtle #FFEB00 rim where light hits the top edge. White or transparent background. Shadows only #004348 at 30 to 50 percent. Avoid: 3D renders, photorealism, watercolour, gradient meshes, rainbow palettes, blue or red tones, heavy outlines, realistic shadows, people or animals.

Generate several variations and compare side by side with an existing Safqah illustration before accepting; mark the result as a draft.

## Answering off-brand requests
| Request | Answer |
|---|---|
| "Use a 3D render of a building for the hero" | Decline: 3D renders are banned. Offer a flat isometric building in the primary ramp, sourced from the brand files |
| "Make the illustration blue for the trust section" | Decline: no blue tones in illustrations. Change the section background with tokens, not the art |
| "Add a red gradient for the risk page" | Decline: no red in illustrations. Communicate risk with copy and the warning tone in UI |
| "Rainbow confetti for the success screen" | Decline: closed palette. Use `Chosen checkmark` or a green-yellow spot graphic |
| "Put the illustration behind the button text" | Decline: illustrations are not backgrounds; use `bg/brand/*` tokens |
| "Photo of a smiling investor" | Not an illustration; the system avoids figurative people. Use an abstract or isometric concept |

## Sources
- Figma foundation page Illustrations 69:886 (`data/foundations/illustrations.md`): palette extracted from the brand team's Illustrator sources, gradient rules, modes, AI prompt template, misuse list.
