# Syntropy MCP server

Serves Syntropy, the Safqah design system, to any MCP-capable agent: Claude Code, Claude Desktop and Claude.ai, Cursor, Codex, VS Code Copilot, ChatGPT connectors. Agents look up components, tokens, icons, patterns, guidelines and links live from this repo instead of guessing. Modelled on GitHub Primer's design-system MCP.

## Tools

| Tool | What it does |
|---|---|
| `start_intake` | The /syntropy interview: one question at a time, then a brief and next steps. Start here. |
| `search_components` | Fuzzy search components by name, page, family, description, prop names. |
| `get_component` | Props table, variants, Figma link, example images and guide (or one guide section). |
| `find_tokens` | Tokens by intent ("muted text", "card surface", "error border"). Semantic first. |
| `search_icons` | Icons by meaning, English or Arabic ("wallet", "محفظة", "رجوع"). |
| `get_pattern` | A UX pattern from `knowledge/patterns/`, or the list. |
| `get_guideline` | Best section from `knowledge/ux`, `knowledge/content`, `knowledge/foundations`. |
| `find_links` | The links hub, grouped by category. |
| `research_plan` | Research tools with example queries, benchmark apps by region, Safqah research notes. |
| `lint_ui` | Runs `lint/index.mjs` on code or CSS and lists findings with fixes. |

Resources: `syntropy://agents` (AGENTS.md), `syntropy://tokens` (resolved tokens), `syntropy://components` (index summary). Prompt: `syntropy` (starts the intake).

Knowledge that has not landed yet returns a clear "not available yet" message. Files are re-read when they change, and the server pulls the latest knowledge from GitHub on its own (see Updates are automatic).

## Install

Runs on your own machine. No server to host, no account needed. Needs Node 20 or later and git.

### Claude Code

Install the plugin; it includes this server and the 14 skills:

```
/plugin marketplace add abdulrahmanaljebreen/syntropy-ai
/plugin install syntropy@syntropy-ai
```

Then turn on updates once: `/plugin`, Marketplaces, `syntropy-ai`, Enable auto-update.

### Claude Desktop, Cursor, Codex, Gemini CLI, VS Code

One command:

```
curl -fsSL https://raw.githubusercontent.com/abdulrahmanaljebreen/syntropy-ai/main/mcp/install.mjs | node --input-type=module -
```

It downloads Syntropy (only `knowledge/`, `lint/` and `mcp/`, about 80 MB) to `~/.syntropy/syntropy-ai` and adds the `syntropy` server to every one of these apps it finds, backing up each config to `<file>.bak`. Quit Claude Desktop before running it (the app rewrites its config on exit), then open the apps again. Add `--dry-run` to see the changes first, or `--only=cursor,codex` to limit them (pass flags after the `-`).

By hand, the entry is the same everywhere (`servers` with `"type": "stdio"` in VS Code, `[mcp_servers.syntropy]` in Codex):

```json
{
  "mcpServers": {
    "syntropy": {
      "command": "node",
      "args": ["~/.syntropy/syntropy-ai/mcp/dist/server.mjs"]
    }
  }
}
```

Write the full path instead of `~`.

### Updates are automatic

The server keeps its copy current from GitHub: at start and every 6 hours while it runs, it pulls the latest `main`. New knowledge (components, tokens, guides, icons, patterns) is served right away without a restart; a new version of the server itself starts with the next restart of the app. It uses your own git sign-in and never prompts; offline or without access, it keeps serving the copy it has. The first start answers immediately from the files next to the server and switches to the downloaded copy when it is ready.

### Claude.ai (web)

Claude.ai connects only to hosted servers, so on the web use the skills (`dist/skills/*.zip`) and Claude Desktop for the MCP. Hosting is described in `DEPLOY.md` for later.

### HTTP (Streamable HTTP, stateless)

```
PORT=8787 node /path/to/syntropy-ai/mcp/http.mjs
```

Endpoint `http://127.0.0.1:8787/mcp` (POST only), health check at `/health`. Set `HOST=0.0.0.0` to listen on all interfaces. Clients that take a URL:

```
claude mcp add --transport http syntropy http://127.0.0.1:8787/mcp
```

```json
{ "mcpServers": { "syntropy": { "url": "http://127.0.0.1:8787/mcp" } } }
```

ChatGPT connectors also need a public HTTPS URL: deploy as in `DEPLOY.md`.

### Environment

| Variable | Default | Use |
|---|---|---|
| `SYNTROPY_ROOT` | not set | Serve this checkout as it is, with no updating (for people editing the repo) |
| `SYNTROPY_HOME` | `~/.syntropy/syntropy-ai` | Where the self-updating copy lives |
| `SYNTROPY_UPDATE_HOURS` | `6` | How often to pull from GitHub while running |
| `SYNTROPY_AUTO_UPDATE` | on | `0` turns updating off |
| `SYNTROPY_FALLBACK_ROOT` | the repo containing `mcp/` | What to serve until the copy is downloaded (the plugin sets it) |
| `PORT` | `8787` | HTTP port |
| `HOST` | `127.0.0.1` | HTTP bind address |

## Files

| File | Role |
|---|---|
| `core.mjs` | Transport-agnostic: `createServer({ root, store })`, the `tools` map, `createNodeStore`, `createBundleStore` |
| `server.mjs` | stdio entry (`npx syntropy-mcp`); starts the auto-updater |
| `update.mjs` | Downloads and updates the managed copy in `~/.syntropy` |
| `install.mjs` | One-time installer: managed copy plus client configs |
| `http.mjs` | Streamable HTTP entry for hosting |
| `intake.json` | The six intake questions, choices, keywords and next steps |
| `test/` | `node --test mcp/test/` from the repo root |

## Sources

- GitHub Primer MCP: https://github.com/primer/mcp
- MCP TypeScript SDK: https://github.com/modelcontextprotocol/typescript-sdk
