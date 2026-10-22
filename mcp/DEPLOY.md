# Deploying the Syntropy MCP server to Cloudflare Workers

Later, optional. Today everyone runs the server on their own machine and it updates itself from GitHub (see README). Hosting is only needed for Claude.ai web and ChatGPT connectors. Steps to host the server at a public HTTPS URL. Nothing here is deployed yet.

## How the seam works

- `core.mjs` holds every tool, resource and prompt. It never touches the network and reads knowledge only through a store.
- `createNodeStore(root)` reads files from disk (stdio and `http.mjs`).
- `createBundleStore(files, { lint })` reads from an in-memory map `{ "knowledge/...": "<text>" }`. A Worker has no file system, so it uses this.
- `http.mjs` is the Node transport. A Worker swaps it for a `fetch` handler using the SDK's `WebStandardStreamableHTTPServerTransport`, which speaks `Request` and `Response`.

## Steps

1. **Install wrangler** in `mcp/` (pin an exact version at least two weeks old) and log in: `npx wrangler login`.

2. **Build the knowledge bundle.** Add a script `mcp/scripts/bundle-knowledge.mjs` that walks the files the tools read and writes `mcp/dist/knowledge.json`:
   - `AGENTS.md`, `mcp/intake.json`
   - `knowledge/components/index.json`, `knowledge/components/descriptions.json`, `knowledge/components/*.md`
   - `knowledge/examples/components/index.json` (paths only, not the images)
   - `knowledge/tokens/resolved.json`
   - `knowledge/icons/icons.json`, `knowledge/icons/illustrations.json`
   - `knowledge/links/links.json`
   - `knowledge/patterns/**/*.md`, `knowledge/ux/**/*.md`, `knowledge/content/**/*.md`, `knowledge/foundations/**/*.md`, `knowledge/research/**/*.md`

   Keep the bundle under the Worker size limit (about 3 MB compressed on the free plan, 10 MB paid). If it grows past that, move it to KV or R2 and load it on first request.

3. **Add the Worker entry** `mcp/worker.mjs`:

   ```js
   import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
   import { createServer, createBundleStore } from './core.mjs';
   import files from './dist/knowledge.json';
   import * as lint from '../lint/index.mjs';

   const store = createBundleStore(files, { lint });

   export default {
     async fetch(request, env) {
       const url = new URL(request.url);
       if (url.pathname === '/health') return new Response('ok');
       if (url.pathname !== '/mcp') return new Response('Not found', { status: 404 });
       // OAuth placeholder: verify the bearer token here before serving (see below).
       const server = createServer({ store });
       const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
       await server.connect(transport);
       return transport.handleRequest(request);
     },
   };
   ```

   `core.mjs` imports `node:fs`, `node:path` and `node:url`; enable `nodejs_compat` so they resolve (the bundle store never calls them). The linter must not read files at runtime; if it does, pass it its data through the bundle too.

4. **Add `mcp/wrangler.toml`**:

   ```toml
   name = "syntropy-mcp"
   main = "worker.mjs"
   compatibility_date = "2026-10-01"
   compatibility_flags = ["nodejs_compat"]

   [[rules]]
   type = "Data"
   globs = ["**/*.json"]
   ```

5. **Run locally**: `npx wrangler dev`, then `npx @modelcontextprotocol/inspector` against `http://localhost:8787/mcp`.

6. **Deploy**: `npx wrangler deploy`. The URL is `https://syntropy-mcp.<account>.workers.dev/mcp`. Map a custom domain in the Cloudflare dashboard if wanted.

7. **Refresh knowledge**: rebuild the bundle and redeploy after each merge to `main`. Add a CI job after `figma-sync.yml` that runs the bundle script and `wrangler deploy` with a `CLOUDFLARE_API_TOKEN` secret.

## Auth (placeholder)

The knowledge is internal. Before going public:

- Use Cloudflare's `workers-oauth-provider` to put OAuth 2.1 in front of `/mcp`, with Google Workspace (safqah.co accounts only) as the upstream identity provider. Claude.ai and ChatGPT connectors complete the OAuth flow themselves.
- Until that exists, protect the Worker with Cloudflare Access (service tokens for agents) or keep using stdio.
- Never put the Figma token in the Worker: the server only reads the committed knowledge.

## Sources

- Cloudflare remote MCP servers: https://developers.cloudflare.com/agents/guides/remote-mcp-server/
- Workers OAuth provider: https://github.com/cloudflare/workers-oauth-provider
- MCP Streamable HTTP transport: https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
