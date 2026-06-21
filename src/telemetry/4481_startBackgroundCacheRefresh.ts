// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {ca} from "../../vendor/m5.ts";
import {findGitRoot as Ou,gitExe as bo,Ba} from "../../vendor/m693.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {jt,ws as bs} from "../../vendor/m228.ts";
import {fs as ps} from "../api/0459_getOauthConfig.ts";
import {W_o as Ugo,Mqt as mqt,Nqt as fqt,Lol as lrl} from "../../vendor/m4478.ts";
import {execFileNoThrowWithCwd as Vr,oa} from "../../vendor/m684.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {Wol as grl,N6 as C6,D6 as T6} from "../agent/5186_bigint.ts";
import {tae as Wie,oee as YZ} from "../config/2670_cause.ts";
import {getInitialSettings as Kr,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {getGlobalConfig as vt,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {ec as Dl,dd as md,jb as Ub,Dd as Sd} from "../../vendor/m687.ts";
import {Jjn as ajn,Bqt as Aqt} from "../../vendor/m4479.ts";
import {createBaseHookInput as xd,executeFileSuggestionCommand as Kgo,yp as Tp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {Ds as Rs,Iu as Pu} from "../../vendor/m643.ts";
import {kg as Ig} from "../../vendor/m129.ts";
import {HFe as iFe} from "../../vendor/m2228.ts";
// @ts-nocheck
var etK = {};
pt(etK, {
  startBackgroundCacheRefresh: () => startBackgroundCacheRefresh,
  resetFileIndexCache: () => resetFileIndexCache,
  pathListSignature: () => pathListSignature,
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
    indexBuildComplete: ca()
  };
}
function resetFileIndexCache(cache) {
  cache.fileIndex = null, cache.fileListRefreshPromise = null, cache.cacheGeneration++, cache.untrackedFetchPromise = null, cache.cachedTrackedFiles = [], cache.cachedConfigFiles = [], cache.cachedTrackedDirs = [], cache.ignorePatternsCache = null, cache.ignorePatternsCacheKey = null, cache.lastRefreshMs = 0, cache.lastScanDurationMs = null, cache.lastGitIndexMtime = null, cache.loadedTrackedSignature = null, cache.loadedMergedSignature = null;
}
function pathListSignature(paths) {
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
function getGitIndexMtime() {
  let gitRoot = Ou(Pt());
  if (!gitRoot) return null;
  try {
    return rtK.statSync(NE.join(gitRoot, ".git", "index")).mtimeMs;
  } catch {
    return null;
  }
}
function rebasePathsToRoot(paths, fromRoot, toRoot) {
  if (toRoot === fromRoot) return paths;
  return paths.map(relPath => {
    let absPath = NE.join(fromRoot, relPath);
    return NE.relative(toRoot, absPath);
  });
}
async function mergeUntrackedIntoIndex(cache, untrackedPaths) {
  if (untrackedPaths.length === 0) return;
  if (!cache.fileIndex) return;
  let dirNames = await getDirectoryNamesAsync(untrackedPaths),
    mergedPaths = [...cache.cachedTrackedFiles, ...cache.cachedConfigFiles, ...cache.cachedTrackedDirs, ...untrackedPaths, ...dirNames],
    sig = pathListSignature(mergedPaths);
  if (sig === cache.loadedMergedSignature) {
    v("[FileIndex] skipped index rebuild \u2014 merged paths unchanged");
    return;
  }
  if (await cache.fileIndex.loadFromFileListAsync(mergedPaths).done) cache.loadedMergedSignature = sig, v(`[FileIndex] rebuilt index with ${cache.cachedTrackedFiles.length} tracked + ${untrackedPaths.length} untracked files`);
}
async function loadIgnorePatterns(cache, gitRoot, cwd) {
  let cacheKey = `${gitRoot}:${cwd}`;
  if (cache.ignorePatternsCacheKey === cacheKey) return cache.ignorePatternsCache;
  let fs = jt(),
    ignoreFileNames = [".ignore", ".rgignore"],
    searchDirs = ps([gitRoot, cwd]),
    ignorer = otK.default(),
    hasPatterns = false,
    candidatePaths = searchDirs.flatMap(dir => ignoreFileNames.map(name => NE.join(dir, name))),
    fileContents = await Promise.all(candidatePaths.map(filePath => fs.readFile(filePath, {
      encoding: "utf8"
    }).catch(() => null)));
  for (let [idx, content] of fileContents.entries()) {
    if (content === null) continue;
    ignorer.add(content), hasPatterns = true, v(`[FileIndex] loaded ignore patterns from ${candidatePaths[idx]}`);
  }
  let result = hasPatterns ? ignorer : null;
  return cache.ignorePatternsCache = result, cache.ignorePatternsCacheKey = cacheKey, result;
}
async function filterIgnoredAsync(ignorer, paths) {
  let kept = [],
    lastYieldAt = performance.now();
  for (let i = 0; i < paths.length; i++) {
    if (!ignorer.ignores(paths[i])) kept.push(paths[i]);
    if ((i & 255) === 255 && performance.now() - lastYieldAt > Ugo) await mqt(), lastYieldAt = performance.now();
  }
  return kept;
}
async function getFilesUsingGit(cache, abortSignal, respectGitignore) {
  let startMs = Date.now();
  v("[FileIndex] getFilesUsingGit called");
  let gitRoot = Ou(Pt());
  if (!gitRoot) return v("[FileIndex] not a git repo, returning null"), null;
  try {
    let projectCwd = Pt(),
      beforeLsMs = Date.now(),
      lsResult = await Vr(bo(), ["-c", "core.quotepath=false", "ls-files", "--recurse-submodules"], {
        timeout: 5000,
        abortSignal: abortSignal,
        cwd: gitRoot
      });
    if (v(`[FileIndex] git ls-files (tracked) took ${Date.now() - beforeLsMs}ms`), lsResult.code !== 0) return v(`[FileIndex] git ls-files failed (code=${lsResult.code}, stderr=${lsResult.stderr}), falling back to ripgrep`), null;
    let trackedRelative = lsResult.stdout.trim().split(`
`).filter(Boolean),
      trackedRebased = rebasePathsToRoot(trackedRelative, gitRoot, projectCwd),
      ignorer = await loadIgnorePatterns(cache, gitRoot, projectCwd);
    if (ignorer) {
      let before = trackedRebased.length;
      trackedRebased = await filterIgnoredAsync(ignorer, trackedRebased), v(`[FileIndex] applied ignore patterns: ${before} -> ${trackedRebased.length} files`);
    }
    cache.cachedTrackedFiles = trackedRebased;
    let durationMs = Date.now() - startMs;
    if (v(`[FileIndex] git ls-files: ${trackedRebased.length} tracked files in ${durationMs}ms`), j("tengu_file_suggestions_git_ls_files", {
      file_count: trackedRebased.length,
      tracked_count: trackedRebased.length,
      untracked_count: 0,
      duration_ms: durationMs
    }), !cache.untrackedFetchPromise) {
      let untrackedArgs = respectGitignore ? ["-c", "core.quotepath=false", "ls-files", "--others", "--exclude-standard"] : ["-c", "core.quotepath=false", "ls-files", "--others"],
        generationAtStart = cache.cacheGeneration;
      cache.untrackedFetchPromise = Vr(bo(), untrackedArgs, {
        timeout: 1e4,
        cwd: gitRoot
      }).then(async untrackedResult => {
        if (generationAtStart !== cache.cacheGeneration) return;
        if (untrackedResult.code === 0) {
          let untrackedRelative = untrackedResult.stdout.trim().split(`
`).filter(Boolean),
            untrackedRebased = rebasePathsToRoot(untrackedRelative, gitRoot, projectCwd),
            untrackedIgnorer = await loadIgnorePatterns(cache, gitRoot, projectCwd);
          if (untrackedIgnorer && untrackedRebased.length > 0) {
            let before = untrackedRebased.length;
            untrackedRebased = await filterIgnoredAsync(untrackedIgnorer, untrackedRebased), v(`[FileIndex] applied ignore patterns to untracked: ${before} -> ${untrackedRebased.length} files`);
          }
          return v(`[FileIndex] background untracked fetch: ${untrackedRebased.length} files`), mergeUntrackedIntoIndex(cache, untrackedRebased);
        }
      }).catch(err => {
        v(`[FileIndex] background untracked fetch failed: ${err}`);
      }).finally(() => {
        cache.untrackedFetchPromise = null;
      });
    }
    return trackedRebased;
  } catch (err) {
    return v(`[FileIndex] git ls-files error: ${Se(err)}`), null;
  }
}
function getDirectoryNames(paths) {
  let dirSet = new Set();
  return collectAncestorDirs(paths, 0, paths.length, dirSet), [...dirSet].map(dir => dir + NE.sep);
}
async function getDirectoryNamesAsync(paths) {
  let dirSet = new Set(),
    lastYieldAt = performance.now();
  for (let i = 0; i < paths.length; i++) if (collectAncestorDirs(paths, i, i + 1, dirSet), (i & 255) === 255 && performance.now() - lastYieldAt > Ugo) await mqt(), lastYieldAt = performance.now();
  return [...dirSet].map(dir => dir + NE.sep);
}
function collectAncestorDirs(paths, start, end, dirSet) {
  for (let i = start; i < end; i++) {
    let dir = NE.dirname(paths[i]);
    while (dir !== "." && !dirSet.has(dir)) {
      let parent = NE.dirname(dir);
      if (parent === dir) break;
      dirSet.add(dir), dir = parent;
    }
  }
}
async function getConfigFilePaths(cwd) {
  return (await Promise.all(grl.map(subdir => C6(subdir, cwd)))).flatMap(entries => entries.map(entry => entry.filePath));
}
async function getProjectFiles(cache, abortSignal, respectGitignore) {
  v(`[FileIndex] getProjectFiles called, respectGitignore=${respectGitignore}`);
  let gitResult = await getFilesUsingGit(cache, abortSignal, respectGitignore);
  if (gitResult !== null) return v(`[FileIndex] using git ls-files result (${gitResult.length} files)`), gitResult;
  v("[FileIndex] git ls-files returned null, falling back to ripgrep");
  let startMs = Date.now(),
    cwd = Pt(),
    ripgrepArgs = null,
    ripgrepResults;
  {
    let u = ["--files", "--follow", "--hidden", "--glob", "!.git/", "--glob", "!.svn/", "--glob", "!.hg/", "--glob", "!.bzr/", "--glob", "!.jj/", "--glob", "!.sl/"];
    if (!respectGitignore) u.push("--no-ignore-vcs");
    ripgrepResults = await Wie(u, cwd, abortSignal);
  }
  let relativePaths = ripgrepResults.map(absPath => NE.relative(cwd, absPath)),
    durationMs = Date.now() - startMs;
  return v(`[FileIndex] ripgrep: ${relativePaths.length} files in ${durationMs}ms`), j("tengu_file_suggestions_ripgrep", {
    file_count: relativePaths.length,
    duration_ms: durationMs
  }), relativePaths;
}
async function getPathsForSuggestions(cache) {
  let abortSignal = AbortSignal.timeout(1e4),
    index = cache.fileIndex ??= new fqt();
  try {
    let projectConfig = Kr(),
      globalConfig = vt(),
      respectGitignore = projectConfig.respectGitignore ?? globalConfig.respectGitignore ?? true,
      cwd = Pt(),
      [projectFiles, configFiles] = await Promise.all([getProjectFiles(cache, abortSignal, respectGitignore), getConfigFilePaths(cwd)]);
    cache.cachedConfigFiles = configFiles;
    let allFiles = [...projectFiles, ...configFiles],
      dirPaths = await getDirectoryNamesAsync(allFiles);
    cache.cachedTrackedDirs = dirPaths;
    let mergedPaths = [...dirPaths, ...allFiles],
      sig = pathListSignature(mergedPaths);
    if (sig !== cache.loadedTrackedSignature) {
      if (await index.loadFromFileListAsync(mergedPaths).done) cache.loadedTrackedSignature = sig, cache.loadedMergedSignature = null;
    } else v("[FileIndex] skipped index rebuild \u2014 tracked paths unchanged");
  } catch (err) {
    v(`[FileIndex] getPathsForSuggestions failed: ${Se(err)}`, {
      level: "error"
    });
  }
  return index;
}
function longestCommonPrefixOfTwo(a, b) {
  let len = Math.min(a.length, b.length),
    i = 0;
  while (i < len && a[i] === b[i]) i++;
  return a.substring(0, i);
}
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
function makeFileSuggestion(filePath, score) {
  return {
    id: `file-${filePath}`,
    displayText: filePath,
    metadata: score !== undefined ? {
      score: score
    } : undefined
  };
}
function searchFileIndex(index, query) {
  return index.search(query, Szq).map(result => makeFileSuggestion(result.path, result.score));
}
function startBackgroundCacheRefresh(cache) {
  if (cache.fileListRefreshPromise) return;
  let currentGitMtime = getGitIndexMtime();
  if (cache.fileIndex) {
    if (currentGitMtime === null && cache.lastRefreshMs > 0 && cache.lastScanDurationMs !== null && cache.lastScanDurationMs > IbO) return;
    if (!(currentGitMtime !== null && currentGitMtime !== cache.lastGitIndexMtime) && Date.now() - cache.lastRefreshMs < bbO) return;
  }
  let generationAtStart = cache.cacheGeneration,
    refreshStartMs = Date.now();
  cache.fileIndex ??= new fqt(), cache.fileListRefreshPromise = getPathsForSuggestions(cache).then(index => {
    if (generationAtStart !== cache.cacheGeneration) return index;
    cache.fileListRefreshPromise = null, cache.indexBuildComplete.emit(), cache.lastGitIndexMtime = currentGitMtime;
    let nowMs = Date.now();
    return cache.lastRefreshMs = nowMs, cache.lastScanDurationMs = nowMs - refreshStartMs, v(`[FileIndex] cache refresh completed in ${cache.lastScanDurationMs}ms`), index;
  }).catch(err => {
    if (v(`[FileIndex] Cache refresh failed: ${Se(err)}`), Ie(err), generationAtStart === cache.cacheGeneration) cache.fileListRefreshPromise = null;
    return cache.fileIndex ??= new fqt();
  });
}
async function getCwdEntries() {
  let fs = jt(),
    cwd = Pt();
  try {
    return (await fs.readdir(cwd)).map(entry => {
      let absPath = NE.join(cwd, entry.name),
        relPath = NE.relative(cwd, absPath);
      return entry.isDirectory() ? relPath + NE.sep : relPath;
    });
  } catch (err) {
    return v(`[FileSuggestions] readdir failed for cwd: ${Se(err)}`, {
      level: "error"
    }), [];
  }
}
async function generateFileSuggestions(cache, query, forceRefresh = false) {
  if (Dl()) {
    if (!query && !forceRefresh) return [];
    return getRemoteFileSuggestions(query);
  }
  if (!query && !forceRefresh) return [];
  if (ajn(Kr().fileSuggestion)?.type === "command") {
    let cmdContext = {
      ...xd(),
      query: query
    };
    return (await Kgo(cmdContext)).slice(0, Szq).map(makeFileSuggestion);
  }
  if (query === "" || query === "." || query === "./") {
    let cwdEntries = await getCwdEntries();
    return startBackgroundCacheRefresh(cache), cwdEntries.slice(0, Szq).map(makeFileSuggestion);
  }
  let queryStartMs = Date.now();
  try {
    let isPartialIndex = cache.fileListRefreshPromise !== null;
    startBackgroundCacheRefresh(cache);
    let normalizedQuery = query,
      dotSlashPrefix = "." + NE.sep;
    if (query.startsWith(dotSlashPrefix)) normalizedQuery = query.substring(2);
    if (normalizedQuery.startsWith("~")) normalizedQuery = Rs(normalizedQuery);
    let results = cache.fileIndex ? searchFileIndex(cache.fileIndex, normalizedQuery) : [],
      durationMs = Date.now() - queryStartMs;
    return v(`[FileIndex] generateFileSuggestions: ${results.length} results in ${durationMs}ms (${isPartialIndex ? "partial" : "full"} index)`), j("tengu_file_suggestions_query", {
      duration_ms: durationMs,
      cache_hit: !isPartialIndex,
      result_count: results.length,
      query_length: query.length
    }), results;
  } catch (err) {
    return Ie(err), [];
  }
}
async function getRemoteFileSuggestions(query) {
  let remoteClient = md();
  if (!remoteClient || !Ub()) return [];
  try {
    return (await remoteClient.sendControlRequest({
      subtype: "file_suggestions",
      query: query
    })).suggestions.map(item => makeFileSuggestion(item.path, item.score));
  } catch (err) {
    return v(`[FileIndex] remote file_suggestions RPC failed: ${Se(err)}`), [];
  }
}
function applyFileSuggestion(suggestion, text, partialToken, tokenStart, setText, setCursor) {
  let displayText = typeof suggestion === "string" ? suggestion : suggestion.displayText,
    newText = text.substring(0, tokenStart) + displayText + text.substring(tokenStart + partialToken.length);
  setText(newText);
  let newCursorPos = tokenStart + displayText.length;
  return setCursor(newCursorPos), newText;
}
var rtK,
  otK,
  NE,
  globalFileIndexCache,
  Szq = 15,
  bbO = 5000,
  IbO = 1000;
var B5_ = b(() => {
  T6();
  lrl();
  Sd();
  Ct();
  nr();
  Ko();
  je();
  St();
  oa();
  bs();
  Ba();
  Aqt();
  Tp();
  wn();
  Pu();
  YZ();
  Er();
  Ig();
  rtK = require("fs"), otK = L(iFe(), 1), NE = L(require("path"));
  globalFileIndexCache = createFileIndexCache();
});

export {etK as jol,createFileIndexCache,resetFileIndexCache,pathListSignature,getGitIndexMtime as Sjp,rebasePathsToRoot as Mol,mergeUntrackedIntoIndex as bjp,loadIgnorePatterns as Nol,filterIgnoredAsync,getFilesUsingGit as Ejp,getDirectoryNames,getDirectoryNamesAsync,collectAncestorDirs as $ol,getConfigFilePaths as vjp,getProjectFiles as wjp,getPathsForSuggestions,longestCommonPrefixOfTwo as Rjp,findLongestCommonPrefix,makeFileSuggestion as Xjn,searchFileIndex as xjp,startBackgroundCacheRefresh,getCwdEntries as Ijp,generateFileSuggestions,getRemoteFileSuggestions as Djp,applyFileSuggestion,rtK as Bol,otK as Fol,NE as UN,globalFileIndexCache,Szq as V_o,bbO as kjp,IbO as Hjp,B5_ as Ppt};
