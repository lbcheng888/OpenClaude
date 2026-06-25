// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Ni} from "../../vendor/m127.ts";
import {findGitRoot as cu,gitExe as go,ia} from "../../vendor/m698.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {gVn,Pft,l8t,Cdl} from "../../vendor/m4500.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {xdl,n6,Xq} from "../agent/5220_bigint.ts";
import {Qie,tee} from "../config/2681_cause.ts";
import {getInitialSettings as Fr,br} from "../config/0745_updateSettingsForSource.ts";
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {pl,Nu,Ub,Wu} from "../../vendor/m438.ts";
import {_Vn,c8t} from "../../vendor/m4501.ts";
import {createBaseHookInput as od,executeFileSuggestionCommand as VCo,Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {hs,Tu} from "../../vendor/m649.ts";
import {ig} from "../../vendor/m130.ts";
import {wUe} from "../../vendor/m2236.ts";
var Idl = {};
ft(Idl, {
  startBackgroundCacheRefresh: () => startBackgroundCacheRefresh,
  resetFileIndexCache: () => resetFileIndexCache,
  pathListSignature: () => pathListSignature,
  normalizeGitPathsAsync: () => normalizeGitPathsAsync,
  globalFileIndexCache: () => globalFileIndexCache,
  getPathsForSuggestions: () => getPathsForSuggestions,
  getDirectoryNamesAsync: () => getDirectoryNamesAsync,
  getDirectoryNames: () => getDirectoryNames,
  generateFileSuggestions: () => generateFileSuggestions,
  findLongestCommonPrefix: () => findLongestCommonPrefix,
  filterIgnoredAsync: () => filterIgnoredAsync,
  createFileIndexCache: () => createFileIndexCache,
  applyFileSuggestion: () => applyFileSuggestion
});
/** Build a fresh, empty file-index cache record. */
function createFileIndexCache() {
  return {
    fileIndex: null,
    fileListRefreshPromise: null,
    cacheGeneration: 0,
    untrackedFetchPromise: null,
    cachedTrackedFiles: [],
    cachedConfigFiles: [],
    cachedTrackedDirs: [],
    ignorePatternsCache: null,
    ignorePatternsCacheKey: null,
    lastRefreshMs: 0,
    lastScanDurationMs: null,
    lastGitIndexMtime: null,
    loadedTrackedSignature: null,
    loadedMergedSignature: null,
    normalizedTrackedInputs: null,
    indexBuildComplete: Ni()
  };
}
/** Wipe all cached state and bump the generation counter so in-flight refreshes are discarded. */
function resetFileIndexCache(cache) {
  cache.fileIndex = null, cache.fileListRefreshPromise = null, cache.cacheGeneration++, cache.untrackedFetchPromise = null, cache.cachedTrackedFiles = [], cache.cachedConfigFiles = [], cache.cachedTrackedDirs = [], cache.ignorePatternsCache = null, cache.ignorePatternsCacheKey = null, cache.lastRefreshMs = 0, cache.lastScanDurationMs = null, cache.lastGitIndexMtime = null, cache.loadedTrackedSignature = null, cache.loadedMergedSignature = null, cache.normalizedTrackedInputs = null;
}
/** Cheap FNV-style signature over a sampled subset of a path list, used to detect changes. */
function pathListSignature(paths: string[]) {
  let len = paths.length,
    stride = Math.max(1, Math.floor(len / 500)),
    hash = -2128831035;
  for (let i = 0; i < len; i += stride) {
    let path = paths[i];
    for (let j = 0; j < path.length; j++) hash = (hash ^ path.charCodeAt(j)) * 16777619 | 0;
    hash = hash * 16777619 | 0;
  }
  if (len > 0) {
    let lastPath = paths[len - 1];
    for (let k = 0; k < lastPath.length; k++) hash = (hash ^ lastPath.charCodeAt(k)) * 16777619 | 0;
  }
  return `${len}:${(hash >>> 0).toString(16)}`;
}
/** Read mtimeMs of `.git/index` for the current repo, or null if not a repo / unreadable. */
function getGitIndexMtime() {
  let gitRoot = cu(Lt());
  if (!gitRoot) return null;
  try {
    return Rdl.statSync(aN.join(gitRoot, ".git", "index")).mtimeMs;
  } catch {
    return null;
  }
}
/** Re-express paths relative to `toRoot` instead of `fromRoot`, yielding cooperatively for large lists. */
async function normalizeGitPathsAsync(paths: string[], fromRoot: string, toRoot: string) {
  if (toRoot === fromRoot) return paths;
  let rebased = Array(paths.length),
    lastYieldAt = performance.now();
  for (let i = 0; i < paths.length; i++) {
    let absPath = aN.join(fromRoot, paths[i]);
    if (rebased[i] = aN.relative(toRoot, absPath), (i & 255) === 255 && performance.now() - lastYieldAt > gVn) await Pft(), lastYieldAt = performance.now();
  }
  return rebased;
}
/** Merge freshly fetched untracked paths into the loaded file index, skipping if the merged signature is unchanged. */
async function mergeUntrackedIntoIndex(cache, untrackedPaths: string[]) {
  if (untrackedPaths.length === 0) return;
  if (!cache.fileIndex) return;
  let dirNames = await getDirectoryNamesAsync(untrackedPaths),
    mergedPaths = [...cache.cachedTrackedFiles, ...cache.cachedConfigFiles, ...cache.cachedTrackedDirs, ...untrackedPaths, ...dirNames],
    sig = pathListSignature(mergedPaths);
  if (sig === cache.loadedMergedSignature) {
    A("[FileIndex] skipped index rebuild — merged paths unchanged");
    return;
  }
  if (await cache.fileIndex.loadFromFileListAsync(mergedPaths).done) cache.loadedMergedSignature = sig, A(`[FileIndex] rebuilt index with ${cache.cachedTrackedFiles.length} tracked + ${untrackedPaths.length} untracked files`);
}
/** Load and cache an ignorer built from `.ignore`/`.rgignore` files in the repo/cwd dirs. */
async function loadIgnorePatterns(cache, gitRoot: string, cwd: string) {
  let cacheKey = `${gitRoot}:${cwd}`;
  if (cache.ignorePatternsCacheKey === cacheKey) return cache.ignorePatternsCache;
  let fs = Wt(),
    ignoreFileNames = [".ignore", ".rgignore"],
    searchDirs = os([gitRoot, cwd]),
    ignorer = vdl.default(),
    hasPatterns = !1,
    candidatePaths = searchDirs.flatMap(dir => ignoreFileNames.map(name => aN.join(dir, name))),
    fileContents = await Promise.all(candidatePaths.map(filePath => fs.readFile(filePath, {
      encoding: "utf8"
    }).catch(() => null)));
  for (let [idx, content] of fileContents.entries()) {
    if (content === null) continue;
    ignorer.add(content), hasPatterns = !0, A(`[FileIndex] loaded ignore patterns from ${candidatePaths[idx]}`);
  }
  let result = hasPatterns ? ignorer : null;
  return cache.ignorePatternsCache = result, cache.ignorePatternsCacheKey = cacheKey, result;
}
/** Filter out ignored paths, yielding cooperatively every 256 entries. */
async function filterIgnoredAsync(ignorer, paths: string[]) {
  let kept = [],
    lastYieldAt = performance.now();
  for (let i = 0; i < paths.length; i++) {
    if (!ignorer.ignores(paths[i])) kept.push(paths[i]);
    if ((i & 255) === 255 && performance.now() - lastYieldAt > gVn) await Pft(), lastYieldAt = performance.now();
  }
  return kept;
}
/** Enumerate tracked files via `git ls-files`, normalize + ignore-filter them, and kick off background untracked fetch. Returns null to fall back to ripgrep. */
async function getFilesUsingGit(cache, abortSignal, respectGitignore: boolean) {
  let startMs = Date.now(),
    generationAtStart = cache.cacheGeneration;
  A("[FileIndex] getFilesUsingGit called");
  let gitRoot = cu(Lt());
  if (!gitRoot) return A("[FileIndex] not a git repo, returning null"), null;
  try {
    let projectCwd = Lt(),
      beforeLsMs = Date.now(),
      lsResult = await Wr(go(), ["-c", "core.quotepath=false", "ls-files", "--recurse-submodules"], {
        timeout: 5000,
        abortSignal: abortSignal,
        cwd: gitRoot
      });
    if (A(`[FileIndex] git ls-files (tracked) took ${Date.now() - beforeLsMs}ms`), lsResult.code !== 0) return A(`[FileIndex] git ls-files failed (code=${lsResult.code}, stderr=${lsResult.stderr}), falling back to ripgrep`), null;
    let cachedInputs = cache.normalizedTrackedInputs,
      trackedRebased,
      pendingInputs = null;
    if (cachedInputs !== null && cachedInputs.repoRoot === gitRoot && cachedInputs.cwd === projectCwd && cachedInputs.rawStdout === lsResult.stdout && cache.cachedTrackedFiles.length > 0) trackedRebased = cache.cachedTrackedFiles, A("[FileIndex] skipped path normalization — raw git paths unchanged");else {
      let trackedRelative = lsResult.stdout.trim().split(`
`).filter(Boolean);
      trackedRebased = await normalizeGitPathsAsync(trackedRelative, gitRoot, projectCwd);
      let ignorer = await loadIgnorePatterns(cache, gitRoot, projectCwd);
      if (ignorer) {
        let before = trackedRebased.length;
        trackedRebased = await filterIgnoredAsync(ignorer, trackedRebased), A(`[FileIndex] applied ignore patterns: ${before} -> ${trackedRebased.length} files`);
      }
      pendingInputs = {
        repoRoot: gitRoot,
        cwd: projectCwd,
        rawStdout: lsResult.stdout
      };
    }
    if (generationAtStart !== cache.cacheGeneration) return A("[FileIndex] discarding refresh results — cache was reset mid-refresh"), trackedRebased;
    if (pendingInputs !== null) cache.normalizedTrackedInputs = pendingInputs;
    cache.cachedTrackedFiles = trackedRebased;
    let durationMs = Date.now() - startMs;
    if (A(`[FileIndex] git ls-files: ${trackedRebased.length} tracked files in ${durationMs}ms`), W("tengu_file_suggestions_git_ls_files", {
      file_count: trackedRebased.length,
      tracked_count: trackedRebased.length,
      untracked_count: 0,
      duration_ms: durationMs
    }), !cache.untrackedFetchPromise) {
      let untrackedArgs = respectGitignore ? ["-c", "core.quotepath=false", "ls-files", "--others", "--exclude-standard"] : ["-c", "core.quotepath=false", "ls-files", "--others"],
        untrackedGeneration = cache.cacheGeneration;
      cache.untrackedFetchPromise = Wr(go(), untrackedArgs, {
        timeout: 1e4,
        cwd: gitRoot
      }).then(async untrackedResult => {
        if (untrackedGeneration !== cache.cacheGeneration) return;
        if (untrackedResult.code === 0) {
          let untrackedRelative = untrackedResult.stdout.trim().split(`
`).filter(Boolean),
            untrackedRebased = await normalizeGitPathsAsync(untrackedRelative, gitRoot, projectCwd),
            untrackedIgnorer = await loadIgnorePatterns(cache, gitRoot, projectCwd);
          if (untrackedIgnorer && untrackedRebased.length > 0) {
            let before = untrackedRebased.length;
            untrackedRebased = await filterIgnoredAsync(untrackedIgnorer, untrackedRebased), A(`[FileIndex] applied ignore patterns to untracked: ${before} -> ${untrackedRebased.length} files`);
          }
          return A(`[FileIndex] background untracked fetch: ${untrackedRebased.length} files`), mergeUntrackedIntoIndex(cache, untrackedRebased);
        }
      }).catch(err => {
        A(`[FileIndex] background untracked fetch failed: ${err}`);
      }).finally(() => {
        cache.untrackedFetchPromise = null;
      });
    }
    return trackedRebased;
  } catch (err) {
    return A(`[FileIndex] git ls-files error: ${Ce(err)}`), null;
  }
}
/** Synchronous variant: collect ancestor directory names (with trailing sep) for the given paths. */
function getDirectoryNames(paths: string[]) {
  let dirSet = new Set();
  return collectAncestorDirs(paths, 0, paths.length, dirSet), [...dirSet].map(dir => dir + aN.sep);
}
/** Async variant: collect ancestor directory names, yielding cooperatively every 256 paths. */
async function getDirectoryNamesAsync(paths: string[]) {
  let dirSet = new Set(),
    lastYieldAt = performance.now();
  for (let i = 0; i < paths.length; i++) if (collectAncestorDirs(paths, i, i + 1, dirSet), (i & 255) === 255 && performance.now() - lastYieldAt > gVn) await Pft(), lastYieldAt = performance.now();
  return [...dirSet].map(dir => dir + aN.sep);
}
/** Walk each path's ancestor chain up to the repo root, adding unique dirs to `dirSet`. */
function collectAncestorDirs(paths: string[], start: number, end: number, dirSet: Set<string>) {
  for (let i = start; i < end; i++) {
    let dir = aN.dirname(paths[i]);
    while (dir !== "." && !dirSet.has(dir)) {
      let parent = aN.dirname(dir);
      if (parent === dir) break;
      dirSet.add(dir), dir = parent;
    }
  }
}
/** Gather config file paths across all configured config subdirs for the given cwd. */
async function getConfigFilePaths(cwd: string) {
  return (await Promise.all(xdl.map(subdir => n6(subdir, cwd)))).flatMap(entries => entries.map(entry => entry.filePath));
}
/** Resolve the project's file list, preferring git ls-files and falling back to ripgrep. */
async function getProjectFiles(cache, abortSignal, respectGitignore: boolean) {
  A(`[FileIndex] getProjectFiles called, respectGitignore=${respectGitignore}`);
  let gitResult = await getFilesUsingGit(cache, abortSignal, respectGitignore);
  if (gitResult !== null) return A(`[FileIndex] using git ls-files result (${gitResult.length} files)`), gitResult;
  A("[FileIndex] git ls-files returned null, falling back to ripgrep");
  let startMs = Date.now(),
    cwd = Lt(),
    ripgrepArgs = null,
    ripgrepResults;
  {
    let u = ["--files", "--follow", "--hidden", "--glob", "!.git/", "--glob", "!.svn/", "--glob", "!.hg/", "--glob", "!.bzr/", "--glob", "!.jj/", "--glob", "!.sl/"];
    if (!respectGitignore) u.push("--no-ignore-vcs");
    ripgrepResults = await Qie(u, cwd, abortSignal);
  }
  let relativePaths = ripgrepResults.map(absPath => aN.relative(cwd, absPath)),
    durationMs = Date.now() - startMs;
  return A(`[FileIndex] ripgrep: ${relativePaths.length} files in ${durationMs}ms`), W("tengu_file_suggestions_ripgrep", {
    file_count: relativePaths.length,
    duration_ms: durationMs
  }), relativePaths;
}
/** Build/refresh the search index from all project + config files; skips rebuild when tracked signature is unchanged. */
async function getPathsForSuggestions(cache) {
  let abortSignal = AbortSignal.timeout(1e4),
    index = cache.fileIndex ??= new l8t();
  try {
    let projectConfig = Fr(),
      globalConfig = Ot(),
      respectGitignore = projectConfig.respectGitignore ?? globalConfig.respectGitignore ?? !0,
      cwd = Lt(),
      [projectFiles, configFiles] = await Promise.all([getProjectFiles(cache, abortSignal, respectGitignore), getConfigFilePaths(cwd)]);
    cache.cachedConfigFiles = configFiles;
    let allFiles = [...projectFiles, ...configFiles],
      dirPaths = await getDirectoryNamesAsync(allFiles);
    cache.cachedTrackedDirs = dirPaths;
    let mergedPaths = [...dirPaths, ...allFiles],
      sig = pathListSignature(mergedPaths);
    if (sig !== cache.loadedTrackedSignature) {
      if (await index.loadFromFileListAsync(mergedPaths).done) cache.loadedTrackedSignature = sig, cache.loadedMergedSignature = null;
    } else A("[FileIndex] skipped index rebuild — tracked paths unchanged");
  } catch (err) {
    A(`[FileIndex] getPathsForSuggestions failed: ${Ce(err)}`, {
      level: "error"
    });
  }
  return index;
}
/** Longest common prefix of two strings. */
function longestCommonPrefixOfTwo(a: string, b: string) {
  let len = Math.min(a.length, b.length),
    i = 0;
  while (i < len && a[i] === b[i]) i++;
  return a.substring(0, i);
}
/** Longest common prefix of all suggestion displayTexts (empty string if none). */
function findLongestCommonPrefix(suggestions) {
  if (suggestions.length === 0) return "";
  let texts = suggestions.map(s => s.displayText),
    prefix = texts[0];
  for (let i = 1; i < texts.length; i++) {
    let text = texts[i];
    if (prefix = longestCommonPrefixOfTwo(prefix, text), prefix === "") return "";
  }
  return prefix;
}
/** Wrap a file path (and optional score) into a suggestion record. */
function makeFileSuggestion(filePath: string, score?: number) {
  return {
    id: `file-${filePath}`,
    displayText: filePath,
    metadata: score !== void 0 ? {
      score: score
    } : void 0
  };
}
/** Search the index for a query and map hits to suggestion records. */
function searchFileIndex(index, query: string) {
  return index.search(query, UCo).map(result => makeFileSuggestion(result.path, result.score));
}
/** Kick off a background cache refresh, debounced by git index mtime and elapsed time. */
function startBackgroundCacheRefresh(cache) {
  if (cache.fileListRefreshPromise) return;
  let currentGitMtime = getGitIndexMtime();
  if (cache.fileIndex) {
    if (currentGitMtime === null && cache.lastRefreshMs > 0 && cache.lastScanDurationMs !== null && cache.lastScanDurationMs > mYp) return;
    if (!(currentGitMtime !== null && currentGitMtime !== cache.lastGitIndexMtime) && Date.now() - cache.lastRefreshMs < pYp) return;
  }
  let generationAtStart = cache.cacheGeneration,
    refreshStartMs = Date.now();
  cache.fileIndex ??= new l8t(), cache.fileListRefreshPromise = getPathsForSuggestions(cache).then(index => {
    if (generationAtStart !== cache.cacheGeneration) return index;
    cache.fileListRefreshPromise = null, cache.indexBuildComplete.emit(), cache.lastGitIndexMtime = currentGitMtime;
    let nowMs = Date.now();
    return cache.lastRefreshMs = nowMs, cache.lastScanDurationMs = nowMs - refreshStartMs, A(`[FileIndex] cache refresh completed in ${cache.lastScanDurationMs}ms`), index;
  }).catch(err => {
    if (A(`[FileIndex] Cache refresh failed: ${Ce(err)}`), Ie(err), generationAtStart === cache.cacheGeneration) cache.fileListRefreshPromise = null;
    return cache.fileIndex ??= new l8t();
  });
}
/** List the immediate entries of the cwd, appending a sep to directories. */
async function getCwdEntries() {
  let fs = Wt(),
    cwd = Lt();
  try {
    return (await fs.readdir(cwd)).map(entry => {
      let absPath = aN.join(cwd, entry.name),
        relPath = aN.relative(cwd, absPath);
      return entry.isDirectory() ? relPath + aN.sep : relPath;
    });
  } catch (err) {
    return A(`[FileSuggestions] readdir failed for cwd: ${Ce(err)}`, {
      level: "error"
    }), [];
  }
}
/** Produce file suggestions for a query, handling remote mode, command mode, cwd listing, and indexed search. */
async function generateFileSuggestions(cache, query: string, forceRefresh = !1) {
  if (pl()) {
    if (!query && !forceRefresh) return [];
    return getRemoteFileSuggestions(query);
  }
  if (!query && !forceRefresh) return [];
  if (_Vn(Fr().fileSuggestion)?.type === "command") {
    let cmdContext = {
      ...od(),
      query: query
    };
    return (await VCo(cmdContext)).slice(0, UCo).map(makeFileSuggestion);
  }
  if (query === "" || query === "." || query === "./") {
    let cwdEntries = await getCwdEntries();
    return startBackgroundCacheRefresh(cache), cwdEntries.slice(0, UCo).map(makeFileSuggestion);
  }
  let queryStartMs = Date.now();
  try {
    let isPartialIndex = cache.fileListRefreshPromise !== null;
    startBackgroundCacheRefresh(cache);
    let normalizedQuery = query,
      dotSlashPrefix = "." + aN.sep;
    if (query.startsWith(dotSlashPrefix)) normalizedQuery = query.substring(2);
    if (normalizedQuery.startsWith("~")) normalizedQuery = hs(normalizedQuery);
    let results = cache.fileIndex ? searchFileIndex(cache.fileIndex, normalizedQuery) : [],
      durationMs = Date.now() - queryStartMs;
    return A(`[FileIndex] generateFileSuggestions: ${results.length} results in ${durationMs}ms (${isPartialIndex ? "partial" : "full"} index)`), W("tengu_file_suggestions_query", {
      duration_ms: durationMs,
      cache_hit: !isPartialIndex,
      result_count: results.length,
      query_length: query.length
    }), results;
  } catch (err) {
    return Ie(err), [];
  }
}
/** Request file suggestions from the remote control channel. */
async function getRemoteFileSuggestions(query: string) {
  let remoteClient = Nu();
  if (!remoteClient || !Ub()) return [];
  try {
    return (await remoteClient.sendControlRequest({
      subtype: "file_suggestions",
      query: query
    })).suggestions.map(item => makeFileSuggestion(item.path, item.score));
  } catch (err) {
    return A(`[FileIndex] remote file_suggestions RPC failed: ${Ce(err)}`), [];
  }
}
/** Apply a chosen suggestion to the text buffer: splice it in over the partial token and move the cursor. */
function applyFileSuggestion(suggestion, text: string, partialToken: string, tokenStart: number, setText, setCursor) {
  let displayText = typeof suggestion === "string" ? suggestion : suggestion.displayText,
    newText = text.substring(0, tokenStart) + displayText + text.substring(tokenStart + partialToken.length);
  setText(newText);
  let newCursorPos = tokenStart + displayText.length;
  return setCursor(newCursorPos), newText;
}
var Rdl,
  vdl,
  aN,
  globalFileIndexCache,
  UCo = 15,
  pYp = 5000,
  mYp = 1000;
var Oft = b(() => {
  Xq();
  Cdl();
  Wu();
  kt();
  tr();
  Po();
  qe();
  Ct();
  Ii();
  ps();
  ia();
  c8t();
  Wd();
  vn();
  Tu();
  tee();
  br();
  ig();
  Rdl = require("fs"), vdl = x(wUe(), 1), aN = x(require("path"));
  globalFileIndexCache = createFileIndexCache();
});

export {Idl,createFileIndexCache,resetFileIndexCache,pathListSignature,getGitIndexMtime as oYp,normalizeGitPathsAsync,mergeUntrackedIntoIndex as sYp,loadIgnorePatterns as Adl,filterIgnoredAsync,getFilesUsingGit as iYp,getDirectoryNames,getDirectoryNamesAsync,collectAncestorDirs as kdl,getConfigFilePaths as lYp,getProjectFiles as cYp,getPathsForSuggestions,longestCommonPrefixOfTwo as uYp,findLongestCommonPrefix,makeFileSuggestion as yVn,searchFileIndex as dYp,startBackgroundCacheRefresh,getCwdEntries as fYp,generateFileSuggestions,getRemoteFileSuggestions as hYp,applyFileSuggestion,Rdl,vdl,aN,globalFileIndexCache,UCo,pYp,mYp,Oft};
