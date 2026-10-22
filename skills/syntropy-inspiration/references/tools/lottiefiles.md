# LottieFiles playbook (motion references)

LottieFiles (lottiefiles.com) is a library of Lottie animations with a free MCP server. At Safqah it is a reference source for timing and choreography, never a source of shipped assets. Open this when you need to specify how a success, loading, scan, transfer or onboarding moment should move.

## Rules
1. Use Lottie animations to study timing, easing, number of beats and what moves first. Rebuild motion with Syntropy assets and platform motion guidance.
   Why: third-party Lotties carry their own colors, characters and licenses, and cost performance.
2. Check Syntropy first: `SpinnerSafqahBrand` and the other spinners, `Pull-to-refresh`, `ProgressBar_Indeterminate`, `SkeletonLine`, `Countdown`.
   Why: most Safqah motion needs are already components.
3. Write the motion spec in words using Material 3 Motion or Apple HIG Motion as the rule set.
   Why: engineers implement from a spec, not from someone else's file.
4. Celebrate only real completions (a completed investment, a verified identity). Never celebrate a loss, a withdrawal or a cancellation; never animate pressure (pulsing timers).
   Why: a regulated product must stay calm and honest.

## At a glance
| Item | Detail |
|---|---|
| Site | https://lottiefiles.com (has `llms.txt`) |
| MCP | `https://mcp.lottiefiles.com/mcp`, free |
| Tool names | Not verified (not connected when written, 2026-10-15). In Claude Code run `ToolSearch` query `+lottie` and use only names you see |

Call shape once discovered (replace with the real tool name):
```json
{"query": "success checkmark"}
```

## Example searches for Safqah
| Moment | Query | Syntropy equivalent or target |
|---|---|---|
| Investment confirmed | `success checkmark` | success state built from `EmptyState` layout + `Illustrations` |
| Money moving | `money transfer` | processing state with `ProgressBar_Indeterminate` |
| KYC scan | `document scan` | capture step in `KYCStep` |
| Loading | `loading dots` | `SpinnerSafqahBrand`, `SkeletonLine` |
| Pull to refresh | `pull to refresh` | `Pull-to-refresh` |
| Reservation timer tick | `countdown` | `Countdown` (real deadline only) |
| Celebration | `confetti` | only after a completed investment; check it fits a regulated product |

## What to extract from a reference
| Property | Example |
|---|---|
| Duration | 600 ms total |
| Easing | standard decelerate on enter |
| Beats | 2: circle draws, then check strokes in |
| Order | container first, icon second, text fades last |
| Loop | no loop for success; loop for loading |
| Reduced motion | static end frame |

## Fallback when not connected
Material 3 Motion (https://m3.material.io/styles/motion/overview) and Apple HIG Motion (https://developer.apple.com/design/human-interface-guidelines/motion) for rules; browse https://lottiefiles.com in the browser for examples.

## Sources
- Team link list entries `lottiefiles-mcp`, `lottiefiles`, `material-3-motion`, `apple-hig-motion` (checked 2026-10-15)
