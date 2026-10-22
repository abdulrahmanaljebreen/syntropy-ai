# ScreensDesign

ScreensDesign (screensdesign.com) is a library of iOS app flows, strongest on onboarding and paywalls, with revenue and download context per app. Use it when the question is "how do high-earning apps onboard, educate and ask for commitment", and translate the mechanics to Safqah's first-investment journey.

## What it is

| Item | Detail |
|---|---|
| Content | Recorded iOS flows (onboarding, paywall, signup, permissions, retention) with app revenue and download estimates |
| Strength | Ties a flow to a business outcome, so you can prefer patterns from apps that earn |
| Weakness | iOS only, consumer subscription apps dominate, few finance apps, no Arabic apps |
| Access | Paid; MCP at `https://screensdesign.com/mcp` (from `links.json`) |
| Status in this repo | The MCP was not connected in the session that wrote this guide (2026-10-15). Tool names below are not verified; discover them at runtime |

## Best for at Safqah

- First-run onboarding: value screens, permission primers (notifications, Face ID), progress indicators.
- The "first investment" moment: Safqah has no paywall, but the first-deposit or first-invest step behaves like one (a commitment ask). Study paywall layouts for structure, never for pressure tactics.
- Notification permission primers before the iOS system alert (see the Safqah permission flow: primer, then reminder `BottomSheet`, then system alert).
- Personalization questionnaires that resemble the investor profile (suitability) questions.

## Agent tools

The server's tool list is the contract. On first use:
1. In Claude Code, run `ToolSearch` with query `screensdesign` (or `+screensdesign search`) to load the schemas.
2. Read each tool's description and parameters; record the names in your notes for the session.
3. Expect, at minimum, a flow or screen search taking a natural-language query, and a detail call taking an ID. Do not call a tool name you have not seen in the loaded list.

Example call shape once discovered (replace the tool name with the real one):
```json
{"query": "finance app onboarding with notification permission primer"}
```

## Example queries for Safqah

| Topic | Query |
|---|---|
| Onboarding | `finance app onboarding with value carousel and phone signup` |
| Permission primer | `notification permission primer screen before system alert` |
| Biometrics | `enable Face ID prompt during onboarding` |
| Suitability | `onboarding questionnaire about goals and experience level` |
| First commitment | `paywall with annual monthly toggle and trust badges` (structure only) |
| Trial and reminders | `trial reminder timeline screen` (maps to reservation reminders) |
| Goals | `goal setting onboarding with target amount` |
| Empty home after signup | `first session home with checklist of setup steps` |
| Referral | `invite friends reward screen` |
| Retention | `win-back offer screen for inactive users` (study, then strip any pressure) |

## How to use findings at Safqah

- Keep: clear progress, one question per screen, a reason before every permission, a visible skip.
- Translate a paywall's "plan picker" into a Safqah choice (deal term with `Calculator / Duration picker`, amount presets with `Keypad / Presets`), never into urgency.
- Drop: countdown discounts, pre-selected expensive plans, hidden close buttons. These are banned at Safqah (see `ux-principles` link Deceptive Design and AGENTS.md rule 7).

## Watch-outs

- Revenue numbers are estimates; treat them as a signal, not proof.
- Subscription psychology does not transfer to regulated investing. Any CMA disclosure or risk text must stay visible and never be visually suppressed.
- iOS only: check Android behaviour (back button, system dialogs) separately.

## Cost and access

- Paid plan required for MCP. Budget 2 to 4 calls per question.

## Setup

| Client | How |
|---|---|
| Claude Code | `claude mcp add --transport http screensdesign https://screensdesign.com/mcp` |
| Cursor | Settings, MCP: `{"screensdesign": {"url": "https://screensdesign.com/mcp"}}` |
| Claude.ai | Settings, Connectors, add custom connector `https://screensdesign.com/mcp` |

If the URL changes, check `knowledge/links/links.json` entry `screensdesign`.

## Sources
- `knowledge/links/links.json` entry `screensdesign` (checked 2026-10-15)
- https://screensdesign.com
