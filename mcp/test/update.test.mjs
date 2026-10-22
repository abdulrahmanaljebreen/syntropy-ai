import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { sync, isManaged, hasKnowledge } from '../update.mjs';
import { createSwitchableStore } from '../core.mjs';

const git = (cwd, ...args) => execFileSync('git', args, { cwd, stdio: 'pipe' }).toString().trim();

function makeRemote() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'syntropy-remote-'));
  const work = path.join(dir, 'work');
  fs.mkdirSync(path.join(work, 'knowledge'), { recursive: true });
  git(work, 'init', '-q', '-b', 'main');
  git(work, 'config', 'user.email', 't@t');
  git(work, 'config', 'user.name', 't');
  fs.writeFileSync(path.join(work, 'AGENTS.md'), '# Syntropy\n');
  fs.writeFileSync(path.join(work, 'knowledge', 'v.txt'), 'one\n');
  git(work, 'add', '-A');
  git(work, 'commit', '-qm', 'one');
  const bare = path.join(dir, 'remote.git');
  git(dir, 'clone', '-q', '--bare', work, bare);
  git(work, 'remote', 'add', 'origin', bare);
  const push = (text) => {
    fs.writeFileSync(path.join(work, 'knowledge', 'v.txt'), text);
    git(work, 'commit', '-qam', text.trim());
    git(work, 'push', '-q', 'origin', 'main');
  };
  return { dir, url: `file://${bare}`, push };
}

test('downloads a managed copy, then follows new commits', async () => {
  const remote = makeRemote();
  const home = path.join(remote.dir, 'home', 'syntropy-ai');

  const first = await sync({ home, repoUrl: remote.url });
  assert.equal(first.ok, true);
  assert.ok(isManaged(home) && hasKnowledge(home));
  assert.equal(fs.readFileSync(path.join(home, 'knowledge', 'v.txt'), 'utf8'), 'one\n');

  const same = await sync({ home, repoUrl: remote.url });
  assert.equal(same.changed, false);

  remote.push('two\n');
  const next = await sync({ home, repoUrl: remote.url });
  assert.equal(next.changed, true);
  assert.equal(fs.readFileSync(path.join(home, 'knowledge', 'v.txt'), 'utf8'), 'two\n');
});

test('never touches a folder it does not manage, and survives an unreachable remote', async () => {
  const remote = makeRemote();
  const mine = path.join(remote.dir, 'my-checkout');
  fs.mkdirSync(mine);
  fs.writeFileSync(path.join(mine, 'notes.txt'), 'keep');
  const r = await sync({ home: mine, repoUrl: remote.url });
  assert.equal(r.ok, false);
  assert.equal(fs.readFileSync(path.join(mine, 'notes.txt'), 'utf8'), 'keep');

  const missing = await sync({ home: path.join(remote.dir, 'nope', 'x'), repoUrl: `file://${remote.dir}/does-not-exist.git` });
  assert.equal(missing.ok, false);
  assert.match(missing.error, /.+/);
});

test('a switchable store serves the new root after setRoot', () => {
  const a = fs.mkdtempSync(path.join(os.tmpdir(), 'syntropy-a-'));
  const b = fs.mkdtempSync(path.join(os.tmpdir(), 'syntropy-b-'));
  fs.writeFileSync(path.join(a, 'AGENTS.md'), 'A');
  fs.writeFileSync(path.join(b, 'AGENTS.md'), 'B');
  const store = createSwitchableStore(a);
  const v1 = store.version('AGENTS.md');
  assert.equal(store.readText('AGENTS.md'), 'A');
  store.setRoot(b);
  assert.equal(store.readText('AGENTS.md'), 'B');
  assert.notEqual(store.version('AGENTS.md'), v1);
});

test('two servers starting together: one updates, the other waits its turn', async () => {
  const remote = makeRemote();
  const home = path.join(remote.dir, 'home', 'syntropy-ai');
  await sync({ home, repoUrl: remote.url });
  remote.push('three\n');
  const [a, b] = await Promise.all([sync({ home, repoUrl: remote.url }), sync({ home, repoUrl: remote.url })]);
  assert.equal([a, b].filter((r) => r.busy).length, 1);
  assert.equal([a, b].filter((r) => r.changed).length, 1);
  assert.ok(!a.error && !b.error);
  assert.equal(fs.readFileSync(path.join(home, 'knowledge', 'v.txt'), 'utf8'), 'three\n');
});
