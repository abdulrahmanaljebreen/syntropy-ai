#!/usr/bin/env node
// Syntropy MCP server over stdio.
// Run: node mcp/server.mjs   or   npx syntropy-mcp
//
// Knowledge source, in order:
// 1. SYNTROPY_ROOT=/path/to/checkout serves that checkout as it is (for people editing the repo).
// 2. Otherwise the managed copy in ~/.syntropy/syntropy-ai (SYNTROPY_HOME), which this server
//    downloads on first run and keeps current from GitHub: at start and every 6 hours
//    (SYNTROPY_UPDATE_HOURS). Until it exists, the files next to this server are served
//    (SYNTROPY_FALLBACK_ROOT). SYNTROPY_AUTO_UPDATE=0 turns updating off.

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer, createSwitchableStore, DEFAULT_ROOT } from './core.mjs';
import { startAutoUpdate, hasKnowledge, isManaged, DEFAULT_HOME } from './update.mjs';

// stdout carries the protocol; log to stderr only.
const log = (msg) => console.error(`syntropy-mcp: ${msg}`);
const env = process.env;

let store;
if (env.SYNTROPY_ROOT) {
  store = createSwitchableStore(env.SYNTROPY_ROOT);
} else {
  const home = env.SYNTROPY_HOME || DEFAULT_HOME;
  const fallback = env.SYNTROPY_FALLBACK_ROOT || DEFAULT_ROOT;
  store = createSwitchableStore(isManaged(home) && hasKnowledge(home) ? home : fallback);
  if (env.SYNTROPY_AUTO_UPDATE !== '0') {
    startAutoUpdate({
      home,
      hours: Number(env.SYNTROPY_UPDATE_HOURS) || 6,
      log,
      onSynced: (r) => { if (r.ok && hasKnowledge(home)) store.setRoot(home); },
    });
  }
}

const server = createServer({ store });
await server.connect(new StdioServerTransport());
log(`ready on stdio (knowledge: ${store.root})`);
