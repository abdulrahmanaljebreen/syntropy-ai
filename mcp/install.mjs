#!/usr/bin/env node
// One-time installer for the Syntropy MCP server on this machine.
//
//   curl -fsSL https://raw.githubusercontent.com/abdulrahmanaljebreen/syntropy-ai/main/mcp/install.mjs | node --input-type=module -
//
// 1. Downloads the Syntropy repo (only knowledge/, lint/ and mcp/) to ~/.syntropy/syntropy-ai.
// 2. Adds the "syntropy" MCP server to every client it finds: Claude Desktop, Cursor, Codex,
//    Gemini CLI and VS Code. Each changed file is backed up to <file>.bak first.
// After that the server keeps itself current from GitHub; nobody reinstalls.
// Claude Code users install the plugin instead (it includes this server and the skills).
//
// Self-contained on purpose: it runs before the repo is on the machine.
// Flags: --dry-run (show what would change), --only=cursor,codex (limit clients).

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const REPO_URL = 'https://github.com/abdulrahmanaljebreen/syntropy-ai.git';
const HOME = process.env.SYNTROPY_HOME || path.join(os.homedir(), '.syntropy', 'syntropy-ai');
const SERVER = path.join(HOME, 'mcp', 'dist', 'server.mjs');
const args = process.argv.slice(2);
const dry = args.includes('--dry-run');
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const say = (m) => console.log(m);

function git(argv, cwd) {
  execFileSync('git', argv, { cwd, stdio: ['ignore', 'ignore', 'pipe'], env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
}

// 1. The managed copy.
if (fs.existsSync(path.join(HOME, '.git', 'syntropy-managed'))) {
  say(`Syntropy is already on this machine: ${HOME}`);
} else if (fs.existsSync(HOME)) {
  say(`${HOME} exists and is not a Syntropy copy. Move it away and run this again.`);
  process.exit(1);
} else if (dry) {
  say(`Would download Syntropy to ${HOME}`);
} else {
  say('Downloading Syntropy (about 80 MB, once)...');
  fs.mkdirSync(path.dirname(HOME), { recursive: true });
  try {
    git(['clone', '--depth', '1', '--filter=blob:none', '--sparse', '--branch', 'main', REPO_URL, HOME]);
    git(['sparse-checkout', 'set', 'knowledge', 'lint', 'mcp'], HOME);
    fs.writeFileSync(path.join(HOME, '.git', 'syntropy-managed'), `${REPO_URL}\n`);
  } catch (e) {
    fs.rmSync(HOME, { recursive: true, force: true });
    say('Could not download the repo. Check your internet connection and that git is installed (git --version).');
    say(String(e.stderr || e.message).trim());
    process.exit(1);
  }
  say(`Downloaded to ${HOME}`);
}

// 2. Client configs. `node` is the absolute path of the Node running this installer, so
// apps started from the Dock (which do not see your shell PATH) can launch it.
const entry = { command: process.execPath, args: [SERVER] };
const mac = process.platform === 'darwin';
const win = process.platform === 'win32';
const appData = win ? process.env.APPDATA : mac ? path.join(os.homedir(), 'Library', 'Application Support') : path.join(os.homedir(), '.config');

const clients = [
  { id: 'claude-desktop', name: 'Claude Desktop', dir: path.join(appData, 'Claude'), file: 'claude_desktop_config.json', key: 'mcpServers' },
  { id: 'cursor', name: 'Cursor', dir: path.join(os.homedir(), '.cursor'), file: 'mcp.json', key: 'mcpServers' },
  { id: 'gemini', name: 'Gemini CLI', dir: path.join(os.homedir(), '.gemini'), file: 'settings.json', key: 'mcpServers' },
  { id: 'vscode', name: 'VS Code', dir: path.join(appData, 'Code', 'User'), file: 'mcp.json', key: 'servers', extra: { type: 'stdio' } },
  { id: 'codex', name: 'Codex', dir: path.join(os.homedir(), '.codex'), file: 'config.toml', toml: true },
];

function backup(file) {
  if (fs.existsSync(file)) fs.copyFileSync(file, `${file}.bak`);
}

// Claude Desktop keeps its config in memory and writes it back, which drops a server added
// while it runs. Refuse to edit it then.
function claudeDesktopRunning() {
  try {
    if (mac) return execFileSync('pgrep', ['-f', 'Claude.app/Contents/MacOS/Claude$']).toString().trim() !== '';
    if (win) return /Claude\.exe/i.test(execFileSync('tasklist', ['/FI', 'IMAGENAME eq Claude.exe']).toString());
  } catch { /* not running */ }
  return false;
}

let added = 0;
for (const c of clients) {
  if (only.length && !only.includes(c.id)) continue;
  if (!fs.existsSync(c.dir)) continue;
  const file = path.join(c.dir, c.file);
  if (c.id === 'claude-desktop' && !dry && claudeDesktopRunning()) {
    say('Claude Desktop: skipped, the app is open and would undo the change. Quit it (Cmd+Q), then run this again.');
    continue;
  }
  try {
    if (c.toml) {
      const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
      if (/^\[mcp_servers\.syntropy\]/m.test(text)) { say(`${c.name}: already set up`); continue; }
      const block = `\n[mcp_servers.syntropy]\ncommand = ${JSON.stringify(entry.command)}\nargs = [${JSON.stringify(SERVER)}]\n`;
      if (!dry) { backup(file); fs.writeFileSync(file, text.replace(/\s*$/, '\n') + block); }
    } else {
      const raw = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').trim() : '';
      const json = raw ? JSON.parse(raw) : {};
      json[c.key] = json[c.key] || {};
      if (json[c.key].syntropy) { say(`${c.name}: already set up`); continue; }
      json[c.key].syntropy = { ...(c.extra || {}), ...entry };
      if (!dry) { backup(file); fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n'); }
    }
    added++;
    say(`${c.name}: ${dry ? 'would add' : 'added'} the syntropy server (${file})`);
  } catch (e) {
    say(`${c.name}: skipped, could not edit ${file} (${e.message}). Add it by hand: ${JSON.stringify(entry)}`);
  }
}

if (!added) say('No new client set up. Supported: Claude Desktop, Cursor, Codex, Gemini CLI, VS Code.');
say('');
say('Restart those apps. The server updates itself from GitHub at start and every 6 hours.');
say('Claude Code: use the plugin instead (/plugin marketplace add abdulrahmanaljebreen/syntropy-ai).');
