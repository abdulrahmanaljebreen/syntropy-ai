// Minimal Figma REST client: token lookup, retries, on-disk cache.
// The token is never printed or logged.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';

export const DS_FILE = 'a7Z956YZy9n6f9uz5DK16Y';
export const ICONS_FILE = 'DDI9ObV7rOP82XQ3OJzogv';
const API = 'https://api.figma.com/v1/';
const CACHE_DIR = join(process.cwd(), '.cache', 'figma');

export async function getToken() {
  if (process.env.FIGMA_TOKEN) return process.env.FIGMA_TOKEN.trim();
  const file = join(homedir(), '.config', 'syntropy', 'figma-token');
  if (existsSync(file)) return (await readFile(file, 'utf8')).trim();
  throw new Error('No Figma token: set FIGMA_TOKEN or create ~/.config/syntropy/figma-token');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * GET a Figma REST path (relative to /v1/) and parse JSON.
 * Retries 5xx and 429 up to 4 attempts. With cacheKey, reuses .cache/figma/<cacheKey>.json
 * unless refresh is true.
 */
export async function getJSON(path, { cacheKey, refresh = false } = {}) {
  const cacheFile = cacheKey ? join(CACHE_DIR, `${cacheKey.replace(/[^\w.-]/g, '_')}.json`) : null;
  if (cacheFile && !refresh && existsSync(cacheFile)) {
    return JSON.parse(await readFile(cacheFile, 'utf8'));
  }
  const token = await getToken();
  let lastErr;
  let wait = 0;
  for (let attempt = 0; attempt < 7; attempt++) {
    if (attempt) await sleep(wait || 2000 * 2 ** (attempt - 1));
    const res = await fetch(API + path, { headers: { 'X-Figma-Token': token } });
    const retryAfter = Number(res.headers.get('retry-after'));
    wait = res.status === 429 ? (retryAfter ? Math.min(retryAfter, 300) : 60) * 1000 : 0;
    if (res.ok) {
      const json = await res.json();
      if (cacheFile) {
        await mkdir(dirname(cacheFile), { recursive: true });
        await writeFile(cacheFile, JSON.stringify(json));
      }
      return json;
    }
    lastErr = new Error(`Figma ${res.status} on ${path.split('?')[0]}`);
    if (res.status !== 429 && res.status < 500) break;
  }
  throw lastErr;
}

/** Download a binary URL (e.g. an image export) to a file. */
export async function download(url, file) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url);
    if (res.ok) {
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, Buffer.from(await res.arrayBuffer()));
      return;
    }
    await sleep(1500);
  }
  throw new Error(`Download failed: ${file}`);
}
