# Connecting the research tools

How a person connects each research MCP in Claude Code, Claude.ai, Cursor and Codex, and which ones need a paid account. Open this when a tool is missing in Step 0, or when the person asks how to set up research. Share only the steps for the tool and client the person needs. Never sign up, pay, or enter credentials for the person.

## Which tools cost money
| Tool | Access | MCP endpoint | What the person needs |
|---|---|---|---|
| Lazyweb | Freemium (experiments and reports depend on plan) | `https://www.lazyweb.com/mcp` | Free Lazyweb account; plan for experiments |
| Refero | **Paid** | `https://refero.design/mcp` | Refero subscription |
| Mobbin | **Paid** | `https://mobbin.com/mcp` | Mobbin subscription |
| ScreensDesign | **Paid** | `https://screensdesign.com/mcp` | ScreensDesign plan |
| Nicelydone | **Paid** | `https://nicelydone.club/mcp` | Nicelydone plan |
| Figma MCP | **Paid** (Figma seat) | `https://mcp.figma.com/mcp` | Seat on the Safqah Figma team (safqah.co account) |
| Streamline | Freemium | Streamline connector in Claude.ai | Streamline account |
| LottieFiles | Free | `https://mcp.lottiefiles.com/mcp` | LottieFiles account if prompted |
| shadcn/ui MCP, Ant Design MCP | Free | see https://ui.shadcn.com/docs/mcp, https://ant.design/docs/react/mcp | Engineers only; never the Safqah look |
| Page Flows, Baymard | **Paid**, no agent access | none | The person's own login in the browser |

Links checked 2026-10-15 (team link list, category `research-tools`). If an endpoint stops working, look up the tool's entry in `data/links.json`.

## Claude Code
Add a remote MCP over HTTP, then sign in through `/mcp` (OAuth opens in the browser):
```bash
claude mcp add --transport http refero https://refero.design/mcp
claude mcp add --transport http mobbin https://mobbin.com/mcp
claude mcp add --transport http lazyweb https://www.lazyweb.com/mcp
claude mcp add --transport http screensdesign https://screensdesign.com/mcp
claude mcp add --transport http nicelydone https://nicelydone.club/mcp
claude mcp add --transport http lottiefiles https://mcp.lottiefiles.com/mcp
claude mcp add --transport http figma https://mcp.figma.com/mcp
```
- Add `--scope user` to make a server available in every project.
- Lazyweb also ships an installer that adds its skills and MCP: `curl -fsSL https://www.lazyweb.com/install.sh | sh`. Restart the client after installing or updating.
- Connectors added in Claude.ai (Figma, Streamline, others) also appear in Claude Code as `mcp__claude_ai_<Name>__*` when signed in with the same account.
- Check with `claude mcp list`; inside a session, `/mcp` shows status and lets the person authenticate.
- Refero's companion skill `refero-design` is optional; install only after the person approves: `npx skills add https://github.com/referodesign/refero_skill --skill refero-design`.

## Claude.ai (web and desktop)
1. Open Settings, then Connectors.
2. For Figma and Streamline: pick them from the connector directory and authorise.
3. For the others: "Add custom connector", paste the MCP URL (`https://refero.design/mcp`, `https://mobbin.com/mcp`, `https://www.lazyweb.com/mcp`, `https://screensdesign.com/mcp`, `https://nicelydone.club/mcp`, `https://mcp.lottiefiles.com/mcp`), then sign in.
4. Enable the connector in the chat's tools menu. Mobbin renders an interactive gallery on hosts that support MCP Apps.
On Team or Enterprise plans an owner may need to add custom connectors first.

## Cursor
Settings, MCP (or edit `~/.cursor/mcp.json` for all projects, `.cursor/mcp.json` for one):
```json
{
  "mcpServers": {
    "refero": { "url": "https://refero.design/mcp" },
    "mobbin": { "url": "https://mobbin.com/mcp" },
    "lazyweb": { "url": "https://www.lazyweb.com/mcp" },
    "screensdesign": { "url": "https://screensdesign.com/mcp" },
    "nicelydone": { "url": "https://nicelydone.club/mcp" },
    "lottiefiles": { "url": "https://mcp.lottiefiles.com/mcp" },
    "figma": { "url": "https://mcp.figma.com/mcp" }
  }
}
```
Then authorise each server when Cursor prompts. The Lazyweb installer also configures Cursor. Streamline: follow Streamline's own MCP instructions on https://www.streamlinehq.com.

## Codex (CLI and IDE extension)
Codex reads `~/.codex/config.toml`. Add remote servers by URL, then sign in:
```toml
[mcp_servers.refero]
url = "https://refero.design/mcp"

[mcp_servers.mobbin]
url = "https://mobbin.com/mcp"

[mcp_servers.lazyweb]
url = "https://www.lazyweb.com/mcp"

[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
```
- Recent Codex versions also accept `codex mcp add <name> --url <url>` and `codex mcp login <name>` for OAuth; run `codex mcp list` to check.
- Add `screensdesign`, `nicelydone` and `lottiefiles` the same way with their URLs above.
- If the installed Codex version cannot reach remote HTTP servers, update Codex first.

## After connecting
- Restart or reload the client so the new tools load.
- In Claude Code, confirm with `ToolSearch` (`+refero`, `+mobbin`, `+lazyweb`) that tool names appear.
- ScreensDesign, Nicelydone and LottieFiles tool names were not verified when this skill was written; read the loaded list before calling.

## Message to the person when a tool is missing
Use one line, then continue with the fallback:
- «Mobbin غير متصل، استخدمت Refero بدلاً منه. للربط: Settings ثم Connectors ثم أضف https://mobbin.com/mcp (يتطلب اشتراك).»
- "Refero isn't connected, so I used Mobbin. To connect in Claude Code: `claude mcp add --transport http refero https://refero.design/mcp` (paid)."

## Sources
- Team link list, category `research-tools` (checked 2026-10-15)
- Tool setup notes in the research guides, 2026-10-15
- https://developers.figma.com/docs/figma-mcp-server/
