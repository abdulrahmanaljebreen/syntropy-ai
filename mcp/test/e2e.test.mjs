import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const serverPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../server.mjs');

test('stdio server lists 10 tools, resources and the syntropy prompt', async () => {
  const transport = new StdioClientTransport({ command: process.execPath, args: [serverPath], stderr: 'ignore', env: { ...process.env, SYNTROPY_AUTO_UPDATE: '0' } });
  const client = new Client({ name: 'syntropy-test', version: '0.0.0' });
  await client.connect(transport);
  try {
    const { tools } = await client.listTools();
    assert.equal(tools.length, 10);
    assert.ok(tools.find((t) => t.name === 'search_components').inputSchema.properties.query);

    const r = await client.callTool({ name: 'search_components', arguments: { query: 'button' } });
    assert.match(r.content[0].text, /417:2/);

    const { resources } = await client.listResources();
    assert.deepEqual(resources.map((x) => x.uri).sort(), ['syntropy://agents', 'syntropy://components', 'syntropy://tokens']);
    const agents = await client.readResource({ uri: 'syntropy://agents' });
    assert.match(agents.contents[0].text, /Syntropy/);

    const { prompts } = await client.listPrompts();
    assert.ok(prompts.find((p) => p.name === 'syntropy'));
    const pr = await client.getPrompt({ name: 'syntropy', arguments: { request: 'a deal page' } });
    assert.match(pr.messages[0].content.text, /start_intake/);
  } finally {
    await client.close();
  }
});

test('HTTP server answers tools/list statelessly', async () => {
  const { createHttpServer } = await import('../http.mjs');
  const srv = createHttpServer();
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const { port } = srv.address();
  try {
    const { StreamableHTTPClientTransport } = await import('@modelcontextprotocol/sdk/client/streamableHttp.js');
    const client = new Client({ name: 'syntropy-http-test', version: '0.0.0' });
    await client.connect(new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${port}/mcp`)));
    const { tools } = await client.listTools();
    assert.equal(tools.length, 10);
    await client.close();
  } finally {
    srv.close();
  }
});
