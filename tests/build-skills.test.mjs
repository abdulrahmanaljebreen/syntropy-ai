import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSkill, DATA_MAP } from '../scripts/build-skills.mjs';

const evals = (n, name = 'syntropy-x') => ({ skill_name: name, evals: Array.from({ length: n }, (_, i) => ({ id: i + 1, prompt: 'p', expected_output: 'e', expectations: [] })) });

test('a well-formed skill has no problems', () => {
  const md = '---\nname: syntropy-x\ndescription: Does X for Safqah. Use when Y.\n---\n# X\n';
  assert.deepEqual(checkSkill('syntropy-x', md, evals(12)), []);
});

test('catches name mismatch, long description, em dash, private page, few evals', () => {
  const md = `---\nname: other\ndescription: ${'a'.repeat(1100)}\n---\nText — here 69:977`;
  const p = checkSkill('syntropy-x', md, evals(3)).join('\n');
  assert.match(p, /must equal folder/);
  assert.match(p, /max 1024/);
  assert.match(p, /em dash/);
  assert.match(p, /private Figma page/);
  assert.match(p, /only 3 evals/);
});

test('every data key maps to a knowledge source', () => {
  for (const [key, entries] of Object.entries(DATA_MAP)) {
    assert.ok(entries.length, key);
    for (const [src] of entries) assert.match(src, /^knowledge\//, key);
  }
});
