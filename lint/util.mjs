// Shared helpers: comment masking, offset to line/column, matching brackets,
// edit distance.

const blank = (s) => s.replace(/[^\n]/g, ' ');

// Replaces comment bodies with spaces (newlines kept) so offsets stay valid.
// Strings are tracked so that "//" inside a URL string is not a comment.
export function maskComments(src, kind, filename = '') {
  if (kind === 'text') return src;
  if (kind === 'html') return src.replace(/<!--[\s\S]*?(?:-->|$)/g, blank);
  const lineComments = kind === 'js' || kind === 'dart' || (kind === 'css' && /\.(scss|less|sass)$/i.test(filename));
  const quotes = kind === 'css' ? `'"` : `'"\``;
  let out = '';
  let last = 0;
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (quotes.includes(c)) {
      i++;
      while (i < n && src[i] !== c) {
        if (src[i] === '\\') i++;
        else if (src[i] === '\n' && c !== '`') break;
        i++;
      }
      i++;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      const stop = end === -1 ? n : end + 2;
      out += src.slice(last, i) + blank(src.slice(i, stop));
      last = i = stop;
      continue;
    }
    if (lineComments && c === '/' && src[i + 1] === '/' && src[i - 1] !== ':') {
      let end = src.indexOf('\n', i);
      if (end === -1) end = n;
      out += src.slice(last, i) + blank(src.slice(i, end));
      last = i = end;
      continue;
    }
    i++;
  }
  return out + src.slice(last);
}

export function lineIndex(src) {
  const starts = [0];
  for (let i = 0; i < src.length; i++) if (src.charCodeAt(i) === 10) starts.push(i + 1);
  return (offset) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return { line: lo + 1, column: offset - starts[lo] + 1 };
  };
}

// Given the index of an opening bracket, returns the index of its match
// (or the end of the source). String-aware.
export function findClose(src, open) {
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const stack = [pairs[src[open]]];
  let i = open + 1;
  while (i < src.length && stack.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') {
      i++;
      while (i < src.length && src[i] !== c) {
        if (src[i] === '\\') i++;
        i++;
      }
    } else if (pairs[c]) stack.push(pairs[c]);
    else if (c === stack[stack.length - 1]) stack.pop();
    i++;
  }
  return i - 1;
}

// Text of the top level of a bracketed argument list (nested groups blanked),
// so that "left:" inside a nested call is not read as an argument name.
export function topLevel(args) {
  let depth = 0;
  let out = '';
  for (const c of args) {
    if (c === '(' || c === '[' || c === '{') depth++;
    out += depth > 0 ? ' ' : c;
    if (c === ')' || c === ']' || c === '}') depth--;
  }
  return out;
}

export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

export function closest(target, candidates, key = (x) => x) {
  let best = null;
  let bestD = Infinity;
  for (const c of candidates) {
    const d = levenshtein(target, key(c));
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}
