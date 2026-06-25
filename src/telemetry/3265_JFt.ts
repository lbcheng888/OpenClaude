// @ts-nocheck
import {Kc as xu,xm as gf,Jm as tA} from "../config/2207_Jm.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,jn as zn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {f9r as NBr,m9r as MBr,$R as Bw,g9r as FBr,_E as dE,cO as GO} from "./2249_cO.ts";
import {cn as dn,Ct as bt} from "../../vendor/m197.ts";
import {b} from "../../runtime.ts";
/** Returns true if the "tengu_marble_lark" feature flag is enabled and telemetry is allowed. */
function a9e() {
  if (!xu()) return !1;
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_marble_lark", !1);
}

/** Returns the current personal-memory directory path via gf(). */
function DIn() {
  return gf();
}

/** Normalizes a key segment: NFC, strip trailing dots/spaces, lowercase. */
function PIn(keySegment) {
  return keySegment.normalize("NFC").replace(/[. ]+$/, "").toLowerCase();
}

/** Returns true if the given key path targets an excluded personal-memory subtree. */
function jhe(keyPath) {
  let segments = keyPath.split("/");
  if (segments.length === 0) return !0;
  if (segments.some(seg => seg.startsWith("."))) return !0;
  return mYr.includes(PIn(segments[0]));
}

/** Checks whether a resolved path is within the personal memory root directory. */
async function U6d(resolvedPath) {
  let realMemRoot;
  try {
    realMemRoot = await NBr();
  } catch (err) {
    let errCode = dn(err);
    if (errCode === "ENOENT" || errCode === "ENOTDIR") return !0;
    return !1;
  }
  if (resolvedPath === realMemRoot) return !0;
  return resolvedPath.startsWith(realMemRoot + tY.sep);
}

/** Validates a memory key and resolves it to an absolute filesystem path, throwing if it escapes allowed bounds. */
async function OIn(key) {
  if (MBr(key), jhe(key)) throw new Bw(`Key targets an excluded personal-memory subtree: "${key}"`);
  let memDir = DIn(),
    joined = tY.join(memDir, key),
    resolved = tY.resolve(joined);
  if (!resolved.startsWith(memDir)) throw new Bw(`Key escapes personal memory directory: "${key}"`);
  let realResolved = await FBr(resolved);
  if (!(await U6d(realResolved))) throw new Bw(`Key escapes personal memory directory via symlink: "${key}"`);
  for (let excluded of await $6d()) if (realResolved === excluded || realResolved.startsWith(excluded + tY.sep)) throw new Bw(`Key resolves into an excluded subtree (${mYr.join("/, ")}/): "${key}"`);
  return resolved;
}

/** Returns the real (symlink-resolved) absolute paths for all excluded subtrees. */
async function $6d() {
  let excludedPaths = mYr.map(name => name === "team" ? dE().replace(/[/\\]+$/, "") : tY.join(gf(), name)),
    realpaths = [];
  for (let excludedPath of excludedPaths) try {
    realpaths.push(await bsa.realpath(excludedPath));
  } catch {}
  return realpaths;
}

/** Returns true if the given path is inside the personal memory directory and not in an excluded subtree. */
function Esa(filePath) {
  let normalized = tY.resolve(filePath).normalize("NFC").toLowerCase(),
    memDirNorm = DIn().normalize("NFC").toLowerCase();
  if (normalized + tY.sep !== memDirNorm && !normalized.startsWith(memDirNorm)) return !1;
  if (normalized + tY.sep === memDirNorm) return !1;
  let relativePart = normalized.slice(memDirNorm.length).replaceAll(tY.sep, "/");
  return !jhe(relativePart);
}
var bsa, tY, mYr;
var y1t = b(() => {
  zn();
  bt();
  tA();
  GO();
  bsa = require("fs/promises"), tY = require("path"), mYr = ["team", "logs", "sessions", "proposals"];
});
export {a9e as g3e,DIn as EPn,PIn as CPn,jhe as t_e,U6d as wJd,OIn as APn,$6d as kJd,Esa as Hpa,bsa as kpa,tY as Dj,mYr as JZr,y1t as JFt};
