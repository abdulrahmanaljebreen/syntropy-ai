#!/usr/bin/env node
// Usage: node lint/cli.mjs <files or globs...> [--json]
// Prints file:line:col severity rule message (fix: ...). Exits 1 on any error.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { lintSource } from './index.mjs';

const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.dart_tool', '.next', 'coverage']);
const LINTABLE = /\.(css|scss|sass|less|pcss|html?|vue|svelte|astro|[cm]?[jt]sx?|dart|mdx?|markdown|txt)$/i;

function globToRegex(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        re += glob[i + 2] === '/' ? '(?:.*/)?' : '.*';
        i += glob[i + 2] === '/' ? 2 : 1;
      } else re += '[^/]*';
    } else if (c === '?') re += '[^/]';
    else if (c === '{') {
      const end = glob.indexOf('}', i);
      re += '(?:' + glob.slice(i + 1, end).split(',').map((s) => s.replace(/[.+^$()|[\]\\]/g, '\\$&')).join('|') + ')';
      i = end;
    } else re += c.replace(/[.+^$()|[\]\\]/g, '\\$&');
  }
  return new RegExp('^' + re + '$');
}

function walk(dir, out) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (!IGNORE_DIRS.has(e.name)) walk(p, out);
    } else if (e.isFile()) out.push(p);
  }
}

export function expand(patterns, cwd = process.cwd()) {
  const files = new Set();
  for (const pat of patterns) {
    const abs = resolve(cwd, pat);
    if (!/[*?{]/.test(pat)) {
      if (!existsSync(abs)) {
        process.stderr.write(`syntropy-lint: no such file ${pat}\n`);
        continue;
      }
      if (statSync(abs).isDirectory()) {
        const all = [];
        walk(abs, all);
        all.filter((f) => LINTABLE.test(f)).forEach((f) => files.add(f));
      } else files.add(abs);
      continue;
    }
    const norm = pat.split(sep).join('/');
    const fixed = norm.split('/').findIndex((s) => /[*?{]/.test(s));
    const baseRel = norm.split('/').slice(0, fixed).join('/') || '.';
    const base = resolve(cwd, baseRel);
    const re = globToRegex(norm.split('/').slice(fixed).join('/'));
    const all = [];
    walk(base, all);
    for (const f of all) if (re.test(relative(base, f).split(sep).join('/'))) files.add(f);
  }
  return [...files].sort();
}

function main(argv) {
  const json = argv.includes('--json');
  const patterns = argv.filter((a) => a !== '--json');
  if (!patterns.length || argv.includes('--help') || argv.includes('-h')) {
    process.stdout.write('usage: node lint/cli.mjs <files or globs...> [--json]\n');
    return patterns.length ? 0 : 2;
  }
  const results = [];
  let errors = 0;
  let warnings = 0;
  for (const file of expand(patterns)) {
    const shown = relative(process.cwd(), file) || file;
    const findings = lintSource(readFileSync(file, 'utf8'), { filename: file });
    for (const f of findings) (f.severity === 'error' ? errors++ : warnings++);
    results.push({ file: shown, findings });
  }
  if (json) process.stdout.write(JSON.stringify({ errors, warnings, results }, null, 2) + '\n');
  else {
    for (const r of results) {
      for (const f of r.findings) {
        process.stdout.write(`${r.file}:${f.line}:${f.column} ${f.severity} ${f.rule} ${f.message}${f.fix ? ` (fix: ${f.fix})` : ''}\n`);
      }
    }
    process.stdout.write(`${errors} error(s), ${warnings} warning(s) in ${results.length} file(s)\n`);
  }
  return errors ? 1 : 0;
}

process.exitCode = main(process.argv.slice(2));
