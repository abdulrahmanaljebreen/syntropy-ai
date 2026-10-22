import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateLinks } from '../scripts/lib/links.mjs';

const ok = { id: 'mobbin', name: 'Mobbin', url: 'https://mobbin.com', category: 'mobile-patterns', bestFor: 'Real app screens', access: 'paid', agent: 'mcp', mcp: 'https://mobbin.com/mcp' };

test('a valid link passes', () => {
  assert.deepEqual(validateLinks({ links: [ok] }), []);
});

test('catches missing fields, http, bad category, duplicates, em dash, mcp without endpoint', () => {
  const p = validateLinks({ links: [
    ok,
    { ...ok, id: 'mobbin', url: 'https://mobbin.com/' },
    { id: 'x', name: 'X', url: 'http://x.com', category: 'nope', bestFor: 'a — b', access: 'free', agent: 'mcp' },
    { id: 'y', name: 'Y' },
  ] });
  const text = p.join('\n');
  assert.match(text, /duplicate id/);
  assert.match(text, /duplicate url/);
  assert.match(text, /must be https/);
  assert.match(text, /unknown category/);
  assert.match(text, /em dash/);
  assert.match(text, /mcp endpoint/);
  assert.match(text, /missing url/);
});

test('the real links hub is valid', () => {
  const doc = JSON.parse(readFileSync(new URL('../knowledge/links/links.json', import.meta.url)));
  assert.deepEqual(validateLinks(doc), []);
  assert.ok(doc.links.length >= 150);
});
