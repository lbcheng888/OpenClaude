// @ts-nocheck
import {nt as q_} from "../../vendor/m127.ts";
import {R4 as Iv,tge as $7H} from "../../vendor/m2687.ts";
import {Si as m7,ud as U3} from "../../vendor/m134.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {xF as Mp,resolveToolAlias as CW} from "./2229_observed_uid.ts";
import {Wt as Q_,ps as M9} from "../../vendor/m230.ts";
import {k9e as D__,pNt as V26} from "../../vendor/m3072.ts";
import {Pae as NWH,kHe as h__,P9e as xk_} from "../../vendor/m3147.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
/**
 * Plugin zip-cache path helpers and session-scoped plugin cache management.
 *
 * Cross-module linkage names (q_, Iv, m7, Mp, Q_, N, D__, V26, NWH, h__, gL, Db, NOq, DrK)
 * are kept as-is to preserve inter-module linkage.
 */

/** Returns true when the plugin zip-cache feature is enabled via env var. */
function isPluginZipCacheEnabled(): boolean {
  return q_(process.env.CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE);
}

/** Returns the base directory for the plugin zip cache, or undefined if not configured. */
function getPluginZipCacheDirBase(): string | undefined {
  if (!isPluginZipCacheEnabled()) return;
  let cacheDir = process.env.CLAUDE_CODE_PLUGIN_CACHE_DIR;
  return cacheDir ? Iv(cacheDir) : void 0;
}

/** Returns the path to the known_marketplaces.json file inside the plugin zip cache. */
function getKnownMarketplacesJsonPath(): string {
  let cacheDir = getPluginZipCacheDirBase();
  if (!cacheDir) throw Error("Plugin zip cache is not enabled");
  return Db.join(cacheDir, "known_marketplaces.json");
}

/** Returns the path to the marketplaces directory inside the plugin zip cache. */
function getMarketplacesCachePath(): string {
  let cacheDir = getPluginZipCacheDirBase();
  if (!cacheDir) throw Error("Plugin zip cache is not enabled");
  return Db.join(cacheDir, "marketplaces");
}

/** Returns the path to the plugins directory inside the plugin zip cache. */
function getPluginsCachePath(): string {
  let cacheDir = getPluginZipCacheDirBase();
  if (!cacheDir) throw Error("Plugin zip cache is not enabled");
  return Db.join(cacheDir, "plugins");
}

/** Creates a fresh session plugin cache state object. */
function createSessionPluginCacheState(): SessionPluginCacheState {
  return {
    path: null,
    promise: null,
    cleanupHandle: null
  };
}

/** Returns (or creates) the session plugin cache state for the current context key. */
function getOrCreateSessionPluginCacheState(): SessionPluginCacheState {
  let contextKey = getCurrentContextKey(),
    existing = sessionPluginCacheByKey.get(contextKey);
  if (existing) return existing;
  let state = createSessionPluginCacheState();
  return sessionPluginCacheByKey.set(contextKey, state), state.cleanupHandle = m7(async () => {
    if (state.path) try {
      await gL.rm(state.path, {
        recursive: !0,
        force: !0
      }), N(`Cleaned up session plugin cache at ${state.path}`);
    } catch (err) {
      N(`Failed to clean up session plugin cache: ${err}`);
    }
  }), state;
}

/** Returns the path to the session-scoped plugin cache directory, creating it on first call. */
async function getOrCreateSessionPluginCacheDir(): Promise<string> {
  let state = getOrCreateSessionPluginCacheState();
  if (state.path) return state.path;
  if (!state.promise) state.promise = (async () => {
    let randomSuffix = NOq.randomBytes(8).toString("hex"),
      dirPath = Db.join(Mp(), `claude-plugin-session-${randomSuffix}`);
    return await Q_().mkdir(dirPath), state.path = dirPath, N(`Created session plugin cache at ${dirPath}`), dirPath;
  })();
  return state.promise;
}

/**
 * Atomically writes `content` to `destPath` by writing to a temp file first,
 * then renaming it into place.
 */
async function atomicWriteFile(destPath: string, content: string | Buffer): Promise<void> {
  let dir = Db.dirname(destPath);
  await Q_().mkdir(dir);
  let tmpName = `.${Db.basename(destPath)}.tmp.${NOq.randomBytes(4).toString("hex")}`,
    tmpPath = Db.join(dir, tmpName);
  try {
    if (typeof content === "string") await gL.writeFile(tmpPath, content, {
      encoding: "utf-8"
    });else await gL.writeFile(tmpPath, content);
    await gL.rename(tmpPath, destPath);
  } catch (err) {
    try {
      await gL.rm(tmpPath, {
        force: !0
      });
    } catch {}
    throw err;
  }
}

/** Creates an in-memory ZIP (Uint8Array) from all files under `dirPath`. */
async function createZipFromDir(dirPath: string): Promise<Uint8Array> {
  let fileMap: Record<string, [Uint8Array, {
    os: number;
    attrs: number;
  }]> = {};
  await collectFilesForZip(dirPath, "", fileMap, new Set());
  let {
      zipSync: zipSyncFn
    } = await Promise.resolve().then(() => (D__(), V26)),
    zipBytes = zipSyncFn(fileMap, {
      level: 6
    });
  return N(`Created ZIP from ${dirPath}: ${Object.keys(fileMap).length} files, ${zipBytes.length} bytes`), zipBytes;
}

/**
 * Recursively walks `rootDir/relPath` and populates `fileMap` with file entries
 * suitable for passing to fflate's zipSync.
 * Skips `.git` directories and detects symlink cycles via `visitedInodes`.
 */
async function collectFilesForZip(rootDir: string, relPath: string, fileMap: Record<string, [Uint8Array, {
  os: number;
  attrs: number;
}]>, visitedInodes: Set<string>): Promise<void> {
  let absPath = relPath ? Db.join(rootDir, relPath) : rootDir,
    entries: string[];
  try {
    entries = await gL.readdir(absPath);
  } catch {
    return;
  }
  try {
    let statResult = await gL.stat(absPath, {
      bigint: !0
    });
    if (statResult.dev !== 0n || statResult.ino !== 0n) {
      let inodeKey = `${statResult.dev}:${statResult.ino}`;
      if (visitedInodes.has(inodeKey)) {
        N(`Skipping symlink cycle at ${absPath}`);
        return;
      }
      visitedInodes.add(inodeKey);
    }
  } catch {
    return;
  }
  for (let entry of entries) {
    if (entry === ".git") continue;
    let entryAbs = Db.join(absPath, entry),
      entryRel = relPath ? `${relPath}/${entry}` : entry,
      lstatResult;
    try {
      lstatResult = await gL.lstat(entryAbs);
    } catch {
      continue;
    }
    if (lstatResult.isSymbolicLink()) continue;
    if (lstatResult.isDirectory()) await collectFilesForZip(rootDir, entryRel, fileMap, visitedInodes);else if (lstatResult.isFile()) try {
      let fileContent = await gL.readFile(entryAbs);
      fileMap[entryRel] = [new Uint8Array(fileContent), {
        os: 3,
        attrs: (lstatResult.mode & 65535) << 16
      }];
    } catch (readErr) {
      N(`Failed to read file for zip: ${entryRel}: ${readErr}`);
    }
  }
}

/** Extracts a ZIP archive at `zipPath` into `destDir`, preserving file permissions. */
async function extractZipToDir(zipPath: string, destDir: string): Promise<void> {
  let zipBytes = await Q_().readFileBytes(zipPath),
    entries = await NWH(zipBytes),
    fileModes = h__(zipBytes);
  await Q_().mkdir(destDir);
  for (let [entryPath, entryData] of Object.entries(entries)) {
    if (entryPath.endsWith("/")) {
      await Q_().mkdir(Db.join(destDir, entryPath));
      continue;
    }
    let absEntryPath = Db.join(destDir, entryPath);
    await Q_().mkdir(Db.dirname(absEntryPath)), await gL.writeFile(absEntryPath, entryData);
    let mode = fileModes[entryPath];
    if (mode && mode & 73) await gL.chmod(absEntryPath, mode & 511).catch(() => {});
  }
  N(`Extracted ZIP to ${destDir}: ${Object.keys(entries).length} entries`);
}

/**
 * Packs `srcDir` into a ZIP file at `destZip`, then removes the source directory.
 * Used to convert an unpacked plugin directory into a zip-cached form.
 */
async function packDirToZip(srcDir: string, destZip: string): Promise<void> {
  let zipBytes = await createZipFromDir(srcDir);
  await atomicWriteFile(destZip, zipBytes), await gL.rm(srcDir, {
    recursive: !0,
    force: !0
  });
}

/**
 * Returns the relative cache file path for a marketplace, normalizing
 * the marketplace ID to safe filename characters.
 */
function getMarketplaceCacheFilePath(marketplaceId: string): string {
  let safeId = marketplaceId.replace(/[^a-zA-Z0-9\-_]/g, "-");
  return Db.join("marketplaces", `${safeId}.json`);
}

/**
 * Returns true for plugins whose source is not a marketplace
 * (i.e. github, git, url, or settings).
 */
function isNonMarketplacePluginSource(plugin: {
  source: string;
}): boolean {
  return ["github", "git", "url", "settings"].includes(plugin.source);
}

/** Shape of per-context session plugin cache state. */
interface SessionPluginCacheState {
  path: string | null;
  promise: Promise<string> | null;
  cleanupHandle: unknown | null;
}
var NOq: typeof import("crypto"), gL: typeof import("fs/promises"), Db: typeof import("path");

/** Current context identifier (defaults to "cli"). */
var currentContextId = "cli",
  getCurrentContextKey = () => currentContextId,
  /** Map from context key to its session plugin cache state. */
  sessionPluginCacheByKey: Map<string, SessionPluginCacheState>;
var WRH = L(() => {
  U3();
  FH();
  xk_();
  A6();
  M9();
  $7H();
  CW();
  NOq = require("crypto"), gL = require("fs/promises"), Db = require("path");
  sessionPluginCacheByKey = new Map();
});
export {isPluginZipCacheEnabled as OG,getPluginZipCacheDirBase as N5t,getKnownMarketplacesJsonPath as OEo,getMarketplacesCachePath as Bll,getPluginsCachePath as Ull,createSessionPluginCacheState as $7p,getOrCreateSessionPluginCacheState as G7p,getOrCreateSessionPluginCacheDir as F5t,atomicWriteFile as xGn,createZipFromDir as V7p,collectFilesForZip as $ll,extractZipToDir as xDe,packDirToZip as DGn,getMarketplaceCacheFilePath as qll,isNonMarketplacePluginSource as Wll,NOq as PEo,gL as hx,Db as zB,currentContextId as q7p,getCurrentContextKey as W7p,sessionPluginCacheByKey as Fll,WRH as DDe};
