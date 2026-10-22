#!/usr/bin/env node
// Syntropy MCP server over Streamable HTTP (stateless), for hosting.
// Run: PORT=8787 node mcp/http.mjs   then point clients at http://localhost:8787/mcp
//
// Seam for other runtimes: everything protocol-related lives in core.mjs (createServer) and the
// knowledge store is pluggable (createNodeStore / createBundleStore). A Cloudflare Worker entry only
// needs to swap this file's Node http server for a fetch handler using
// WebStandardStreamableHTTPServerTransport and a bundle store. See DEPLOY.md.

import http from 'node:http';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createServer, DEFAULT_ROOT } from './core.mjs';

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '127.0.0.1';
const ROOT = process.env.SYNTROPY_ROOT || DEFAULT_ROOT;
const MCP_PATH = '/mcp';

async function readJson(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  if (!chunks.length) return undefined;
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

/** Handle one MCP request statelessly: a fresh server and transport per request. */
export async function handleMcp(req, res, { root = ROOT } = {}) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'content-type': 'application/json', allow: 'POST' });
    res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed. This server is stateless: use POST.' }, id: null }));
    return;
  }
  let body;
  try { body = await readJson(req); } catch {
    res.writeHead(400, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null }));
    return;
  }
  const server = createServer({ root });
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  res.on('close', () => { transport.close(); server.close(); });
  await server.connect(transport);
  await transport.handleRequest(req, res, body);
}

export function createHttpServer({ root = ROOT } = {}) {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    // CORS for browser-based MCP clients and inspectors.
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('access-control-allow-headers', 'content-type, mcp-protocol-version, mcp-session-id, authorization');
    res.setHeader('access-control-expose-headers', 'mcp-session-id');
    if (req.method === 'OPTIONS') { res.writeHead(204, { 'access-control-allow-methods': 'POST, OPTIONS' }); res.end(); return; }
    if (url.pathname === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); res.end('ok'); return; }
    if (url.pathname !== MCP_PATH) { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('Not found. MCP endpoint is /mcp'); return; }
    try { await handleMcp(req, res, { root }); } catch (e) {
      console.error(e);
      if (!res.headersSent) {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: 'Internal server error' }, id: null }));
      }
    }
  });
}

const isMain = import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isMain) {
  createHttpServer().listen(PORT, HOST, () => console.error(`syntropy-mcp HTTP on http://${HOST}:${PORT}${MCP_PATH} (root: ${ROOT})`));
}
