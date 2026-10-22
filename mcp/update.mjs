// Keeps a local copy of the Syntropy repo current, so a locally run MCP server always
// serves the latest knowledge without anyone reinstalling.
//
// The managed copy lives in ~/.syntropy/syntropy-ai (override with SYNTROPY_HOME). It is a
// shallow git clone marked as managed (.git/syntropy-managed), so it is safe to reset to the
// remote. The repo is public, so no sign-in is needed; git never prompts, and any failure
// leaves the current copy in place.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';

export const REPO_URL = 'https://github.com/abdulrahmanaljebreen/syntropy-ai.git';
export const DEFAULT_HOME = path.join(os.homedir(), '.syntropy', 'syntropy-ai');
const MARKER = 'syntropy-managed';
const SPARSE = ['knowledge', 'lint', 'mcp'];

function git(args, { cwd, timeoutMs = 120000 } = {}) {
  return new Promise((resolve, reject) => {
    execFile('git', args, {
      cwd,
      timeout: timeoutMs,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
    }, (err, stdout, stderr) => {
      if (err) reject(new Error((stderr || err.message).trim().split('\n').pop()));
      else resolve(stdout.trim());
    });
  });
}

export function isManaged(home) {
  return fs.existsSync(path.join(home, '.git', MARKER));
}

export function hasKnowledge(dir) {
  return fs.existsSync(path.join(dir, 'AGENTS.md')) && fs.existsSync(path.join(dir, 'knowledge'));
}

/** Clones the repo into `home` (shallow) and marks it as managed. */
export async function cloneManaged({ home = DEFAULT_HOME, repoUrl = REPO_URL, branch = 'main' } = {}) {
  fs.mkdirSync(path.dirname(home), { recursive: true });
  const tmp = `${home}.tmp-${process.pid}`;
  fs.rmSync(tmp, { recursive: true, force: true });
  try {
    // Only what the server reads: root files (AGENTS.md), knowledge/, lint/ and mcp/.
    await git(['clone', '--depth', '1', '--filter=blob:none', '--sparse', '--branch', branch, repoUrl, tmp], { timeoutMs: 600000 });
    await git(['sparse-checkout', 'set', ...SPARSE], { cwd: tmp, timeoutMs: 600000 });
    fs.writeFileSync(path.join(tmp, '.git', MARKER), `${repoUrl}\n`);
    fs.renameSync(tmp, home);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return git(['rev-parse', 'HEAD'], { cwd: home });
}

/**
 * Brings a managed copy up to date with the remote branch.
 * Returns { before, after, changed }. Refuses to touch a folder it does not manage.
 */
export async function updateManaged({ home = DEFAULT_HOME, branch = 'main' } = {}) {
  if (!isManaged(home)) throw new Error(`${home} is not a managed Syntropy copy`);
  const before = await git(['rev-parse', 'HEAD'], { cwd: home });
  await git(['fetch', '--depth', '1', '--filter=blob:none', 'origin', branch], { cwd: home, timeoutMs: 600000 });
  const remote = await git(['rev-parse', 'FETCH_HEAD'], { cwd: home });
  if (remote !== before) await git(['reset', '--hard', 'FETCH_HEAD'], { cwd: home, timeoutMs: 600000 });
  return { before, after: remote, changed: remote !== before };
}

// Apps often start several copies of the server at once; only one updates at a time.
const LOCK_STALE_MS = 15 * 60 * 1000;
function takeLock(home) {
  const lock = path.join(path.dirname(home), `.${path.basename(home)}.sync.lock`);
  fs.mkdirSync(path.dirname(lock), { recursive: true });
  try {
    fs.writeFileSync(lock, String(process.pid), { flag: 'wx' });
  } catch {
    try {
      if (Date.now() - fs.statSync(lock).mtimeMs < LOCK_STALE_MS) return null;
      fs.rmSync(lock, { force: true });
      fs.writeFileSync(lock, String(process.pid), { flag: 'wx' });
    } catch { return null; }
  }
  return () => fs.rmSync(lock, { force: true });
}

/** Clones when missing, otherwise updates. Never throws; reports through `log`. */
export async function sync({ home = DEFAULT_HOME, repoUrl = REPO_URL, branch = 'main', log = () => {} } = {}) {
  const release = takeLock(home);
  if (!release) {
    log('another Syntropy server is updating; using the copy on this machine');
    return { ok: hasKnowledge(home) && isManaged(home), changed: false, busy: true };
  }
  try {
    return await syncUnlocked({ home, repoUrl, branch, log });
  } finally {
    release();
  }
}

async function syncUnlocked({ home, repoUrl, branch, log }) {
  try {
    if (!fs.existsSync(home)) {
      const head = await cloneManaged({ home, repoUrl, branch });
      log(`downloaded Syntropy ${head.slice(0, 7)} to ${home}`);
      return { ok: true, changed: true, head };
    }
    if (!isManaged(home)) {
      log(`${home} exists but is not managed by Syntropy; leaving it as it is`);
      return { ok: false, changed: false };
    }
    const r = await updateManaged({ home, branch });
    log(r.changed ? `updated Syntropy ${r.before.slice(0, 7)} to ${r.after.slice(0, 7)}` : `Syntropy is current (${r.after.slice(0, 7)})`);
    return { ok: true, changed: r.changed, head: r.after };
  } catch (e) {
    log(`could not reach GitHub (${e.message}); serving the copy already on this machine`);
    return { ok: false, changed: false, error: e.message };
  }
}

/** Runs `sync` now and then every `hours` hours. Returns a stop function. */
export function startAutoUpdate({ hours = 6, onSynced = () => {}, ...opts } = {}) {
  let stopped = false;
  const run = async () => {
    if (stopped) return;
    const r = await sync(opts);
    if (!stopped) onSynced(r);
  };
  run();
  const timer = setInterval(run, hours * 3600 * 1000);
  timer.unref();
  return () => { stopped = true; clearInterval(timer); };
}
