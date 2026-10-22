/* render.mjs · headless Chrome + ffmpeg (adapted from safqah-canvas-film)
 * node render.mjs film.html --grid 36              contact sheet          -> preview/
 * node render.mjs film.html --only 60 [--check]    one full frame         -> preview/
 * node render.mjs film.html --audio                sound + subtitles only -> out/
 * node render.mjs film.html                        full render            -> out/syntropy-launch.mp4 (+ .ar.srt, .en.srt)
 * Frames go to $FRAMES_DIR (default: the session scratchpad), never into the repo.
 */
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { synthesize } from './sfx.mjs';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--') && a.endsWith('.html')) || 'film.html';
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const flag = k => args.includes('--' + k);

const here = dirname(fileURLToPath(import.meta.url));
const previewDir = resolve(here, 'preview');
const outDir = resolve(here, 'out');
const scratch = process.env.FRAMES_DIR || '/private/tmp/claude-501/-Users-aljebreen/726f8db8-4529-42db-b51f-f4b8f5e051fd/scratchpad/frames';
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FFMPEG = process.env.FFMPEG || '/opt/homebrew/bin/ffmpeg';
const FFPROBE = FFMPEG.replace(/ffmpeg$/, 'ffprobe');
const NAME = 'syntropy-launch';
const width = +opt('width', 1920), height = Math.round(width * 9 / 16 / 2) * 2;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true,
  args: ['--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('page error:', e.message));
page.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
await page.goto(pathToFileURL(resolve(here, file)).href + `?w=${width}&h=${height}` + (process.argv.includes("--nocaps") ? "&caps=0" : ""));
await page.waitForFunction('window.__ready === true', { timeout: 20000 });
const meta = await page.evaluate('window.__meta');
const { fps, duration } = meta;

const png = async () => Buffer.from((await page.evaluate(`document.querySelector('canvas').toDataURL('image/png')`)).split(',')[1], 'base64');
const seek = t => page.evaluate(`window.__seek(${t})`);

/* subtitles: one cue per caption, multi-line captions keep their line breaks */
function srt(caps, key) {
  const ts = s => { const ms = Math.round(s * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60, r = ms % 1000;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')},${String(r).padStart(3, '0')}`; };
  const clean = s => s.replace(/[⁦-⁩]/g, '');
  return caps.map((c, i) => `${i + 1}\n${ts(c.t0)} --> ${ts(c.t1)}\n${clean(c[key])}\n`).join('\n');
}
async function audioAndSubs() {
  mkdirSync(outDir, { recursive: true });
  const events = await page.evaluate('window.__events');
  const caps = await page.evaluate('window.__captions');
  const { wav, peakDb } = synthesize(events, duration);
  const wavPath = resolve(scratch, '..', `${NAME}-sfx.wav`);
  mkdirSync(dirname(wavPath), { recursive: true });
  writeFileSync(wavPath, wav);
  writeFileSync(resolve(outDir, `${NAME}.ar.srt`), srt(caps, 'ar'));
  writeFileSync(resolve(outDir, `${NAME}.en.srt`), srt(caps, 'en'));
  console.log(`audio: ${events.length} events, peak ${peakDb.toFixed(1)} dBFS -> ${wavPath}`);
  console.log(`subtitles: ${caps.length} cues -> out/${NAME}.ar.srt, out/${NAME}.en.srt`);
  return wavPath;
}

if (opt('only') !== undefined) {
  const t = +opt('only');
  mkdirSync(previewDir, { recursive: true });
  await seek(t);
  const a = await png();
  const out = resolve(previewDir, `frame-${t.toFixed(2)}.png`);
  writeFileSync(out, a);
  console.log('wrote', out);
  if (flag('check')) { await seek(t + 0.5); await seek(t); console.log('deterministic:', a.equals(await png()) ? 'yes (byte-identical)' : 'NO, frames differ'); }
} else if (opt('grid') !== undefined) {
  const n = +opt('grid'), from = +opt('from', 0), to = +opt('to', duration);
  mkdirSync(previewDir, { recursive: true });
  const cols = +opt('cols', 6), rows = Math.ceil(n / cols);
  const cw = Math.round(2400 / cols), ch = Math.round(cw * height / width);
  const sheet = await page.evaluate(async ({ n, cols, rows, cw, ch, from, to }) => {
    const src = document.querySelector('canvas');
    const sheet = document.createElement('canvas');
    sheet.width = cols * cw; sheet.height = rows * (ch + 26);
    const g = sheet.getContext('2d');
    g.fillStyle = '#ddd'; g.fillRect(0, 0, sheet.width, sheet.height);
    for (let i = 0; i < n; i++) {
      const t = from + (to - from) * (i + 0.5) / n;
      window.__seek(t);
      const x = (i % cols) * cw, y = Math.floor(i / cols) * (ch + 26);
      g.drawImage(src, x, y, cw, ch);
      g.fillStyle = '#222'; g.font = '15px monospace'; g.textAlign = 'left'; g.direction = 'ltr';
      g.fillText(`${i}  t=${t.toFixed(2)}s`, x + 6, y + ch + 18);
    }
    return sheet.toDataURL('image/png');
  }, { n, cols, rows, cw, ch, from, to });
  const out = resolve(previewDir, opt('name', `contact-sheet-${n}.png`));
  writeFileSync(out, Buffer.from(sheet.split(',')[1], 'base64'));
  console.log('wrote', out);
} else if (flag('audio')) {
  await audioAndSubs();
} else {
  mkdirSync(scratch, { recursive: true });
  mkdirSync(outDir, { recursive: true });
  const N = Math.round(fps * duration);
  const start = +opt('start-frame', 0);
  if (!start) for (const f of readdirSync(scratch)) if (f.endsWith('.png')) unlinkSync(resolve(scratch, f));
  const t0 = Date.now();
  for (let i = start; i < N; i++) {
    await seek(i / fps);
    writeFileSync(resolve(scratch, `f${String(i).padStart(5, '0')}.png`), await png());
    if (i % 60 === 0) process.stdout.write(`\r${i}/${N}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  console.log(`\r${N}/${N} frames`);
  const silent = resolve(scratch, '..', `${NAME}-silent.mp4`);
  execFileSync(FFMPEG, ['-y', '-v', 'error', '-framerate', String(fps), '-i', resolve(scratch, 'f%05d.png'),
    '-frames:v', String(N), '-c:v', 'libx264', '-preset', 'slow', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-crf', '20', '-movflags', '+faststart', silent], { stdio: 'inherit' });
  const wavPath = await audioAndSubs();
  const mp4 = resolve(outDir, `${NAME}.mp4`);
  execFileSync(FFMPEG, ['-y', '-v', 'error', '-i', silent, '-i', wavPath, '-map', '0:v', '-map', '1:a',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-t', String(duration), '-movflags', '+faststart', mp4], { stdio: 'inherit' });
  console.log('wrote', mp4);
  console.log(execFileSync(FFPROBE, ['-v', 'error', '-show_entries', 'format=duration,size', '-of', 'default=nw=1', mp4]).toString().trim());
}
await browser.close();
