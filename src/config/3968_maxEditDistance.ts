// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {b} from "../../runtime.ts";
import {dn} from "./0137_namespace.ts";
/**
 * Fuzzy command/name matching and a global registry for skills/commands.
 *
 * Provides:
 *  - closest-name lookup via Damerau-Levenshtein edit distance (with an
 *    optional `maxEditDistance` threshold),
 *  - a Map-backed registry keyed by entry name,
 *  - per-name readiness promises (sync barriers).
 */

/**
 * Find the registry entry name closest to `query` within `maxEditDistance`.
 *
 * Candidates are each entry's `name` plus its optional `aliases`. Returns the
 * best-matching candidate string, or `undefined` if nothing is within range.
 */
function ixe(query, entries, {
  maxEditDistance: threshold = 1
} = {}) {
  let candidates = entries.flatMap(entry => [entry.name, ...(entry.aliases ?? [])]),
    best,
    bestDistance = threshold + 1;
  for (let candidate of candidates) {
    if (Math.abs(candidate.length - query.length) > threshold) continue;
    let distance = T3t(query, candidate);
    if (distance < bestDistance) bestDistance = distance, best = candidate;
  }
  return best;
}

/**
 * Damerau-Levenshtein distance between strings `a` and `b` (substitutions,
 * insertions, deletions, and adjacent transpositions each cost 1).
 */
function T3t(a, b) {
  if (a === b) return 0;
  let aLen = a.length,
    bLen = b.length,
    dist: number[][] = Array.from({
      length: aLen + 1
    }, (_aRow, i) => Array.from({
      length: bLen + 1
    }, (_bCol, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= aLen; i++) for (let j = 1; j <= bLen; j++) {
    let substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
    if (dist[i][j] = Math.min(dist[i - 1][j] + 1, dist[i][j - 1] + 1, dist[i - 1][j - 1] + substitutionCost), i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) dist[i][j] = Math.min(dist[i][j], dist[i - 2][j - 2] + 1);
  }
  return dist[aLen][bLen];
}

/** Whether skill syncing is enabled via the CLAUDE_CODE_SYNC_SKILLS env var. */
function axe() {
  return nt(process.env.CLAUDE_CODE_SYNC_SKILLS);
}

/**
 * Register a pending readiness barrier for `key`, returning its resolve fn.
 */
function a$a(key) {
  let resolveFn,
    pending = new Promise(resolve => {
      resolveFn = resolve;
    });
  return p9n.set(key, {
    promise: pending,
    resolve: resolveFn
  }), resolveFn;
}

/**
 * Await the readiness barrier for `key`; resolves to `{ ok: true }` if none
 * is registered.
 */
function m9n(key) {
  let entry = p9n.get(key);
  return entry ? entry.promise : Promise.resolve({
    ok: !0
  });
}

/** Add or replace an entry in the registry, keyed by its `name`. */
function l$a(entry) {
  l6e.set(entry.name, entry);
}

/** Remove the registry entry stored under `name`. */
function c$a(name) {
  l6e.delete(name);
}

/** Whether `entry` is the exact instance currently registered under its name. */
function u$a(entry) {
  return l6e.get(entry.name) === entry;
}

/**
 * Prune registry and barrier maps to only the names present in `keep`.
 * Returns the count of registry entries removed.
 */
function d$a(keep) {
  let removed = 0;
  for (let name of l6e.keys()) if (!keep.has(name)) l6e.delete(name), removed++;
  for (let name of p9n.keys()) if (!keep.has(name)) p9n.delete(name);
  return removed;
}

/** Snapshot of all currently registered entries. */
function p$a() {
  return l6e.size === 0 ? [] : Array.from(l6e.values());
}

var p9n, l6e;
var S3t = b(() => {
  dn();
  p9n = new Map(), l6e = new Map();
});

export {ixe,T3t,axe,a$a,m9n,l$a,c$a,u$a,d$a,p$a,p9n,l6e,S3t};
