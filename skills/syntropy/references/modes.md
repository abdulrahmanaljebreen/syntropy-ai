<!-- syntropy-lint-disable eastern-arabic-numerals: this file shows them as examples of what not to do -->
# Modes

How to parse a `/syntropy` or `syntropy:` message into one of five modes, what each mode does, which skill it hands to, and a full example session for each. Open this when the first word is ambiguous or when you want the expected shape of a session.

## Rules
1. Parse only the **first word** after `/syntropy` or `syntropy:` (case-insensitive, Arabic accepted). Why: predictable for people, cheap for agents.
2. `research`, `review` and `explain` are reserved words. Anything else is a request and starts the intake. Why: "review" as the first word always means review mode, even in "review my idea for a payout screen"; ask once if that reads like new work.
3. A message with no command that asks for Safqah design work is treated as `/syntropy <request>`. Why: the skill auto-triggers; people should not need the command.
4. A quick factual question (one token, one component prop, one rule) gets a direct answer, with no interview and no command needed. Why: interviews are for work, not facts.
5. Never mix modes in one reply. If a research request turns into design, finish research, then offer "want me to design it? (`/syntropy <request>`)". Why: each mode has its own output shape.

## Parse table
| First word | Arabic equivalents | Mode | Hands to |
|---|---|---|---|
| (none) | | Intake from question 1 | this skill, then syntropy-product-workflow for bigger work |
| any other word | | Intake, auto-answered from the request | same |
| `research` | ابحث, بحث, مراجع, إلهام | Research | syntropy-inspiration |
| `review` | راجع, مراجعة, قيّم | Review | syntropy-ux-review |
| `explain` | اشرح, ما هو, ما هي | Explain | answered here from syntropy-components, syntropy-foundations, syntropy-patterns, syntropy-content |
| no command, a fact question | | Direct | the skill that owns the fact |

## Mode 1. Intake and design (`/syntropy`, `/syntropy <request>`)
Steps: parse, auto-answer, ask the first unanswered question (one per message), restate the brief, confirm, size (Quick here; Feature or Flow to syntropy-product-workflow), research with syntropy-inspiration, two or three options mapped to Syntropy, recommend one, design in the requested medium, self-review, lint, handoff. Detail: `intake.md`.

Example:
> **Person:** /syntropy
> **Agent:** What are you making? 1 A new screen · 2 A new flow · 3 A change to something live · 4 A review · 5 An explanation
> **Person:** 1, cash-out confirmation in the app for investors
> (Auto-answered: 2 retail investor, 3 app compact, 6 money movement and personal data.)
> **Agent:** What job should it do, and how will we know it worked? For example "cash-out completion rate" or "fewer failed IBAN transfers".
> **Person:** fewer failed transfers
> **Agent:** What exists already? Share a Figma link, a screenshot or a ticket, or say none.
> **Person:** none
> **Agent:** (five-line brief) Confirm, or tell me what to change.
> **Person:** yes
> **Agent:** Three references (two Saudi banking apps, one GCC wallet), two options: A `BottomSheet` review with `KeyValue` rows and `SheetFooter`; B full screen with `Stat` amount and `ListItem` bank row. Recommend A (shorter, matches invest confirmation). Then the design: RTL first, fee incl. VAT as `{fee}`, net amount headline, IBAN masked, states (loading, insufficient balance, bank error, success), one `Button` `Variant=primary` «تأكيد السحب», contrast flag on the primary label, lint result.

## Mode 2. Research (`/syntropy research <topic>`)
Hand to syntropy-inspiration research mode: detect research tools, ask at most what is unclear (one question at a time, with defaults), 5 to 10 real references from at most 2 tools, Saudi and GCC first, cited with links; extract patterns, never pixels; map each pattern to Syntropy components and tokens; recommend one. Ends with a recommendation and mapping, not a finished design. If syntropy-inspiration is not installed, use `research_plan` and `find_links` from the Syntropy MCP, else tell the person how to install (`lookup-order.md`).

Example:
> **Person:** syntropy: research KYC upload
> **Agent:** Which platform should the references come from? 1 Mobile (default) · 2 Web · 3 Both
> **Person:** mobile
> **Agent:** (searches Mobbin and Refero for ID and document upload in Saudi and GCC fintech) 8 references with links. Patterns: camera-first capture with a frame guide, auto-capture with manual fallback, per-document status list, retake without restarting. Syntropy mapping: `KYCStep` for the checklist, `Upload Button` and `File Item with Progress` for upload, `Alert` `Tone=warning` for blurry capture. Recommendation: camera-first with the `KYCStep` list. Personal data: purpose line and no PII in events (syntropy-compliance-ux). Want me to design it? (`/syntropy KYC upload screen`)

## Mode 3. Review (`/syntropy review <link | image | code>`)
Hand to syntropy-ux-review. Accepted inputs: a Figma link (read only if it is a design-system page or the person's own file; never other areas of the Syntropy file), a screenshot, code (Flutter, Angular, HTML, CSS), copy. Output follows the review format: verdict, findings ranked by severity, each with the rule, evidence, the Syntropy fix (component, token, copy), and owner. Always cover states, contrast (carry the known primary-button flag), RTL, numbers, copy, dark patterns and compliance; run `lint_ui` or `node lint/cli.mjs` on code. If the input is missing, ask for it in one line; do not run the intake.

Example:
> **Person:** /syntropy review https://www.figma.com/design/<fileKey>?node-id=12-34
> **Agent:** (reads the frame with the Figma MCP) Verdict: needs changes, 2 high, 3 medium.
> 1 High · Fee appears only on the success screen. Rule: fees with VAT before confirmation. Fix: add a `KeyValue` row «الرسوم (شاملة الضريبة) {fee} ر.س» to the review sheet.
> 2 High · Amount shows «٥٠٠٠ ريال». Rule: Western digits, currency after amount, two decimals. Fix: «5,000.00 ر.س».
> 3 Medium · Two primary buttons. Fix: «إلغاء» as `Variant=secondary`.
> 4 Medium · No empty or error state. Fix: `EmptyState` and a retry `Alert`.
> 5 Medium · Hex fill on the header. Fix: `bg/surface`.
> Known issue carried: primary `Button` label contrast 2.92:1 (open DS decision, not a finding against this screen).

## Mode 4. Explain (`/syntropy explain <component | token | pattern | rule>`)
Answer here, briefly, in this order:
1. What it is, one line.
2. When to use it, and what to use instead when not.
3. Variants and props with exact Figma names and values (booleans included, typos copied verbatim).
4. Tokens it uses (semantic names only).
5. Accessibility and RTL notes.
6. Example image path (from the component guide, e.g. `knowledge/examples/components/card-deal/card-deal.png`) or the Figma link to the component page.
Sources: `get_component`, `find_tokens`, `get_pattern`, `get_guideline` (MCP) or syntropy-components, syntropy-foundations, syntropy-patterns, syntropy-content. Under about 15 lines. Offer the next step in one line.

Example:
> **Person:** /syntropy explain CardDeal
> **Agent:**
> **CardDeal**: the investment deal card for a Safqah opportunity (media, qualified badge, status, title, highlights, ROI, term). Page 07a, set 3013:95390, in the library.
> Use for: the deals feed or a featured deal (`Layout=Hero`), dense lists like portfolio or closed deals (`Layout=Row`). Not for: the top of a deal page (use `Base card`), project updates (`NewsCard`), guidance (`CardInfo`), quick actions (`ActionTile`, `ActionPrompt`).
> Variants: `Layout` Hero, Row · `State` Available, Reserved, Invested, Closed · `Direction` RTL, LTR. Booleans: `Qualified`, `Show media`, `Show status`, `Show highlights`, `Show ROI`, `Show arrow`, `Show success`, `Show Upper left arrow`. Swap: `Media image`.
> Parts: `CardDeal / Media`, `CardDeal / Headline`, `CardDeal / Highlights`, `CardDeal / Metric`, `StatusPill`, `Tag`.
> A11y and RTL: whole card is one link named by the deal title; Closed must not rely on dimming alone; show `Qualified` only to qualified users; ROI label in Arabic starts with «نسبة».
> Image: `knowledge/examples/components/card-deal/card-deal.png` · Figma: 07a. CardDeal (node 69-942).

Token example:
> **Person:** /syntropy explain text/muted
> **Agent:** `text/muted`: secondary text (helper text, meta, captions). Passes AA on `bg/base`, `bg/surface` and `bg/elevated` in Light and Dark. Use `text/default` for anything the person must read to decide; never `text/subtle` for real information (placeholder and tertiary meta only, large-text contrast). Fails in Dark on `bg/brand/yellow` and `bg/brand/lightest`.

## Mode 5. Direct answer (quick question, no command)
Recognise: a single fact, a yes or no, a name lookup. Answer in one to three lines from the owning skill, cite the token or component exactly, add one caveat if a known issue applies. No interview, no brief.
- "What token for muted text?" → `text/muted` (helper and secondary text; not `text/subtle`, which is placeholder only).
- "Is Tag in the library?" → `Tag` exists in Syntropy but is not published to the Figma library; use it by name, and in another Figma file copy it from the Syntropy file (`known-issues.md`).
- "Which green is the brand?" → `bg/brand/primary` (`#4daa57`).
- "How do I write 5000 riyals in Arabic UI?" → «5,000.00 ر.س».

## Sources
- AGENTS.md (modes)
- mcp/README.md (tools)
- knowledge/components/card-deal.md
- knowledge/ux/accessibility/contrast-pairs.md