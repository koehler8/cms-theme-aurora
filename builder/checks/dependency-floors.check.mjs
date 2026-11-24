// Dependency floors for cms-theme-aurora.
//
// Gate: every copy of a listed package that package-lock.json resolves
// (nested copies included) must be at or above its floor. A package that is
// no longer in the lockfile passes. Minimum versions only: never an exact
// version, never a snapshot of package.json or the lockfile, never a count.
//
// Each dependency refresh edits ONLY this table: raise a floor it moves up,
// add a line for a package it newly moves or an advisory it fixes. Never
// lower or remove a line.
//
// package                 floor     reason                                   week
const FLOORS = {
  '@koehler8/cms': ['1.5.4', 'devDependency baseline', '2026-11-23'],
};

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));

// semver precedence: -1, 0, 1. Prerelease sorts below its release.
function parse(v) {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+.*)?$/.exec(v);
  if (!m) throw new Error(`unparseable version: ${v}`);
  return { n: [+m[1], +m[2], +m[3]], pre: m[4] ? m[4].split('.') : null };
}
function compare(a, b) {
  const x = parse(a);
  const y = parse(b);
  for (let i = 0; i < 3; i++) if (x.n[i] !== y.n[i]) return x.n[i] < y.n[i] ? -1 : 1;
  if (!x.pre && !y.pre) return 0;
  if (!x.pre) return 1;
  if (!y.pre) return -1;
  for (let i = 0; i < Math.max(x.pre.length, y.pre.length); i++) {
    const p = x.pre[i];
    const q = y.pre[i];
    if (p === undefined) return -1;
    if (q === undefined) return 1;
    const pn = /^\d+$/.test(p);
    const qn = /^\d+$/.test(q);
    if (pn && qn) {
      if (+p !== +q) return +p < +q ? -1 : 1;
    } else if (pn !== qn) {
      return pn ? -1 : 1;
    } else if (p !== q) {
      return p < q ? -1 : 1;
    }
  }
  return 0;
}

const failures = [];
for (const [path, entry] of Object.entries(lock.packages ?? {})) {
  if (!path.includes('node_modules/') || !entry.version) continue;
  const name = entry.name ?? path.slice(path.lastIndexOf('node_modules/') + 'node_modules/'.length);
  const floor = FLOORS[name];
  if (!floor) continue;
  if (compare(entry.version, floor[0]) < 0) {
    failures.push(`${path} resolves ${entry.version}, below floor ${floor[0]} (${floor[1]}, ${floor[2]})`);
  }
}

if (failures.length) {
  console.error('dependency-floors: FAIL');
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log('dependency-floors: ok');
