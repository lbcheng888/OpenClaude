// @ts-nocheck
import {xu,gf,tA} from "../config/2201_tA.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {dn,bt} from "../../vendor/m195.ts";
import {getTeamMemoryServerStatus,lt} from "../session/0131_sent.ts";
import {b} from "../../runtime.ts";
/**
 * Validates a path key against traversal and injection attacks.
 * Throws PathTraversalError if the key contains null bytes, URL-encoded
 * traversal sequences, Unicode-normalized traversal, backslashes, or
 * is an absolute path.
 */
function MBr(pathKey: string): string {
  if (pathKey.includes("\x00")) throw new Bw(`Null byte in path key: "${pathKey}"`);
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathKey);
  } catch {
    decoded = pathKey;
  }
  if (decoded !== pathKey && (decoded.includes("..") || decoded.includes("/"))) throw new Bw(`URL-encoded traversal in path key: "${pathKey}"`);
  let normalized: string = pathKey.normalize("NFKC");
  if (normalized !== pathKey && (normalized.includes("..") || normalized.includes("/") || normalized.includes("\\") || normalized.includes("\x00"))) throw new Bw(`Unicode-normalized traversal in path key: "${pathKey}"`);
  if (pathKey.includes("\\")) throw new Bw(`Backslash in path key: "${pathKey}"`);
  if (pathKey.startsWith("/")) throw new Bw(`Absolute path key: "${pathKey}"`);
  return pathKey;
}

/** Returns true if team memory debug mode is enabled via env var or feature flag. */
function _debugModuleInit(): boolean {
  if (!xu()) return !1;
  if (process.env.CLAUDE_MEMORY_STORES?.trim()) return !0;
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_herring_clock", !1);
}

/** Returns the team memory directory path (NFC-normalized, with trailing separator). */
function dE(): string {
  return (rP.join(gf(), "team") + rP.sep).normalize("NFC");
}

/** Returns the realpath of the team memory file, optionally joined with extra path segments. */
async function NBr(...extraSegments: string[]): Promise<string> {
  let teamFilePath: string = Ehi(gf()),
    resolvedDir: string = await LFe.realpath(rP.dirname(teamFilePath));
  return rP.join(resolvedDir, rP.basename(teamFilePath), ...extraSegments);
}

/**
 * Checks whether a given candidate path resolves to the same real location as
 * the team memory file (joined with extra segments).
 * Returns "ok", "escape", or "absent".
 */
async function MFe(candidatePath: string, ...extraSegments: string[]): Promise<"ok" | "escape" | "absent"> {
  try {
    let resolvedTarget: string = await NBr(...extraSegments);
    return (await LFe.realpath(Ehi(candidatePath))) === resolvedTarget ? "ok" : "escape";
  } catch (err: any) {
    let errCode: string = dn(err);
    if (errCode === "ENOENT" || errCode === "ENOTDIR") return "absent";
    return "escape";
  }
}

/** Returns true if debug mode is on AND team memory server has content. */
function BBr(): boolean {
  if (!_debugModuleInit()) return !1;
  return getTeamMemoryServerStatus() === "has-content";
}

/**
 * Resolves the realpath of a file by walking up the directory tree,
 * collecting missing segments and re-joining after the first existing ancestor.
 * Throws PathTraversalError on dangling symlinks or symlink loops.
 */
async function FBr(inputPath: string): Promise<string> {
  let segments: string[] = [],
    currentPath: string = inputPath;
  for (let parentPath: string = rP.dirname(currentPath); currentPath !== parentPath; parentPath = rP.dirname(currentPath)) try {
    let realCurrent: string = await LFe.realpath(currentPath);
    return segments.length === 0 ? realCurrent : rP.join(realCurrent, ...segments.reverse());
  } catch (err: any) {
    let errCode: string = dn(err);
    if (errCode === "ENOENT") try {
      if ((await LFe.lstat(currentPath)).isSymbolicLink()) throw new Bw(`Dangling symlink detected (target does not exist): "${currentPath}"`);
    } catch (innerErr: any) {
      if (innerErr instanceof Bw) throw innerErr;
    } else if (errCode === "ELOOP") throw new Bw(`Symlink loop detected in path: "${currentPath}"`);else if (errCode !== "ENOTDIR" && errCode !== "ENAMETOOLONG") throw new Bw(`Cannot verify path containment (${errCode}): "${currentPath}"`);
    segments.push(currentPath.slice(parentPath.length + rP.sep.length)), currentPath = parentPath;
  }
  return inputPath;
}

/**
 * Checks if a realpath is contained within (or equal to) the team memory directory.
 * Returns true if contained, false otherwise.
 */
async function QQu(resolvedPath: string): Promise<boolean> {
  let teamDirReal: string;
  try {
    teamDirReal = await LFe.realpath(dE().replace(/[/\\]+$/, ""));
  } catch (err: any) {
    let errCode: string = dn(err);
    if (errCode === "ENOENT" || errCode === "ENOTDIR") return !0;
    return !1;
  }
  if (resolvedPath === teamDirReal) return !0;
  return resolvedPath.startsWith(teamDirReal + rP.sep);
}

/** Synchronous containment check using lowercased NFC-normalized paths. */
function qfe(checkPath: string): boolean {
  let normalizedCheck: string = rP.resolve(checkPath).normalize("NFC").toLowerCase(),
    normalizedTeam: string = dE().normalize("NFC").toLowerCase();
  return normalizedCheck + rP.sep === normalizedTeam || normalizedCheck.startsWith(normalizedTeam);
}

/**
 * Resolves a key to a safe absolute path within the team memory directory,
 * validating against traversal both statically and via symlink resolution.
 */
async function byn(key: string): Promise<string> {
  MBr(key);
  let teamDir: string = dE(),
    joinedPath: string = rP.join(teamDir, key),
    absolutePath: string = rP.resolve(joinedPath);
  if (!absolutePath.startsWith(teamDir)) throw new Bw(`Key escapes team memory directory: "${key}"`);
  let realAbsolute: string = await FBr(absolutePath);
  if (!(await QQu(realAbsolute))) throw new Bw(`Key escapes team memory directory via symlink: "${key}"`);
  return absolutePath;
}

/** Returns true if debug mode is on AND the path is synchronously within the team directory. */
function xK(checkPath: string): boolean {
  return _debugModuleInit() && qfe(checkPath);
}
var LFe: any,
  rP: any,
  Bw: any,
  Ehi = (e: string) => e.replace(/[/\\]+$/, "");

/** Module initializer: sets up fs/promises, path, and PathTraversalError class. */
var GO = b(() => {
  lt();
  zn();
  bt();
  tA();
  LFe = require("fs/promises"), rP = require("path");
  Bw = class Bw extends Error {
    constructor(e: string) {
      super(e);
      this.name = "PathTraversalError";
    }
  };
});
export {MBr,_debugModuleInit,dE,NBr,MFe,BBr,FBr,QQu,qfe,byn,xK,LFe,rP,Bw,Ehi,GO};
