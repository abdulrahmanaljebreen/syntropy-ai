import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const CLI = fileURLToPath(new URL('../lint/cli.mjs', import.meta.url));

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'syntropy-lint-'));
  mkdirSync(join(dir, 'src', 'ui'), { recursive: true });
  writeFileSync(join(dir, 'src', 'ui', 'bad.css'), '.a {\n  margin-left: 13px;\n}\n');
  writeFileSync(join(dir, 'src', 'ui', 'warn.css'), '.a { padding: var(--space-lg); gap: 16px; }\n');
  writeFileSync(join(dir, 'src', 'ok.tsx'), '<div className="ms-2" />\n');
  return dir;
}

const run = (args, cwd) => spawnSync(process.execPath, [CLI, ...args], { cwd, encoding: 'utf8' });

test('cli prints file:line:col severity rule message (fix) and exits 1 on errors', () => {
  const dir = fixture();
  try {
    const r = run(['src/**/*.css'], dir);
    assert.equal(r.status, 1);
    assert.match(r.stdout, /src\/ui\/bad\.css:2:3 error physical-direction physical direction "margin-left": use margin-inline-start \(fix: margin-inline-start\)/);
    assert.match(r.stdout, /src\/ui\/bad\.css:2:16 error no-raw-spacing off-scale spacing 13px/);
    assert.match(r.stdout, /warn\.css:1:\d+ warning no-raw-spacing raw spacing 16px/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('cli exits 0 with only warnings or clean files, and --json emits structured output', () => {
  const dir = fixture();
  try {
    assert.equal(run(['src/ok.tsx', 'src/ui/warn.css'], dir).status, 0);
    const r = run(['src', '--json'], dir);
    assert.equal(r.status, 1);
    const out = JSON.parse(r.stdout);
    assert.equal(out.results.length, 3);
    assert.ok(out.errors >= 2);
    assert.ok(out.results.find((x) => x.file.endsWith('ok.tsx')).findings.length === 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
