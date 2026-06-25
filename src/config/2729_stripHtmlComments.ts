// @ts-nocheck
import {ft as pt,b,x as L} from "../../runtime.ts";
import {ubr as KAr,tNe as qMe,ecs as Xts} from "./0744_level.ts";
import {getMainLoopModel as Ns,bytesPerTokenForModel as bw,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {iE as Zb,$0t as qxt,GS as eE} from "../api/2028_used.ts";
import {getSdkBetas as NT,getOriginalCwd as gr,lt as ct,getAdditionalDirectoriesForClaudeMd as UI} from "../session/0132_sent.ts";
import {pathInWorkingPath as w0,Xm as aA} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {xf as Hh,hDt as fHt,HA as Hw} from "../../vendor/m2219.ts";
import {g$ as M$,Krt as Rtt} from "../../vendor/m2720.ts";
import {logForDebugging as v,qe as je} from "./0236_setHasFormattedOutput.ts";
import {HDt as PHt,xDt as LHt} from "./2252_content.ts";
import {Ufe as XBe,Jm as iA,Kc as Ru} from "./2207_Jm.ts";
import {cn as ln,Ct as St} from "../../vendor/m197.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {or as sr,dn as an} from "./0137_namespace.ts";
import {Wt as jt,Nd as Xp,ps as bs} from "../../vendor/m230.ts";
import {lu as yd,Cf as JA,zf as Jh} from "../../vendor/m133.ts";
import {hs as Rs,Tu as Pu} from "../../vendor/m649.ts";
import {getInitialSettings as Kr,br as Er,getSettingsForSource as Cn} from "./0745_updateSettingsForSource.ts";
import {mA as rv,Xl as mc} from "./0651_maxBytes.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getManagedClaudeRulesDir as Lvn,getUserClaudeRulesDir as Mvn,getCurrentProjectConfig as Py,tr as nr,getMemoryPath as i2e} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {xh as eg,wm as gf} from "../../vendor/m707.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {Ske as yRe,Gk as Ck} from "../../vendor/m2727.ts";
import {Wi as na,Hn as bn} from "../../vendor/m100.ts";
import {Wu as Sd,pl as Dl} from "../../vendor/m438.ts";
import {pf as wA,wn as xn} from "./0693_timestamp.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {ia as Ba,findGitRoot as Ou,findCanonicalGitRoot as Uf} from "../../vendor/m698.ts";
import {Wd as Tp,hasInstructionsLoadedHook as NPt} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {wUe as iFe} from "../../vendor/m2236.ts";
import {vKr as rjr} from "../../vendor/m2726.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {executeInstructionsLoadedHooks as a2e} from "../../vendor/m5192.ts";
// @ts-nocheck
var kk7 = {};
pt(kk7, {
  stripHtmlComments: () => stripHtmlComments,
  shouldShowClaudeMdExternalIncludesWarning: () => shouldShowClaudeMdExternalIncludesWarning,
  resetGetMemoryFilesCache: () => resetGetMemoryFilesCache,
  processMemoryFile: () => processMemoryFile,
  processMdRules: () => processMdRules,
  processConditionedMdRules: () => processConditionedMdRules,
  isSyntheticMemoryPath: () => isSyntheticMemoryPath,
  isMemoryFilePath: () => isMemoryFilePath,
  hasExternalClaudeMdIncludes: () => hasExternalClaudeMdIncludes,
  getMemoryFilesForNestedDirectory: () => getMemoryFilesForNestedDirectory,
  getMemoryFiles: () => getMemoryFiles,
  getMaxMemoryCharacterCount: () => getMaxMemoryCharacterCount,
  getManagedAndUserConditionalRules: () => getManagedAndUserConditionalRules,
  getLargeMemoryFiles: () => getLargeMemoryFiles,
  getExternalClaudeMdIncludes: () => getExternalClaudeMdIncludes,
  getConditionalRulesForCwdLevelDirectory: () => getConditionalRulesForCwdLevelDirectory,
  getClaudeMds: () => getClaudeMds,
  getAllMemoryFilePaths: () => getAllMemoryFilePaths,
  filterInjectedMemoryFiles: () => filterInjectedMemoryFiles,
  clearMemoryFileCaches: () => clearMemoryFileCaches,
  MIN_MEMORY_CHARACTER_COUNT: () => MIN_MEMORY_CHARACTER_COUNT,
  MAX_CLAUDE_MD_TOKEN_CONTEXT_RATIO: () => MAX_CLAUDE_MD_TOKEN_CONTEXT_RATIO,
  MANAGED_SETTINGS_CLAUDEMD_PATH: () => MANAGED_SETTINGS_CLAUDEMD_PATH
});
function isSyntheticMemoryPath(path) {
  return path === KAr || path === MANAGED_SETTINGS_CLAUDEMD_PATH;
}
function getMaxMemoryCharacterCount(model = Ns()) {
  let contextWindow = Zb(model, NT()),
    effectiveWindow = Number.isFinite(contextWindow) && contextWindow > 0 ? contextWindow : qxt;
  return Math.max(MIN_MEMORY_CHARACTER_COUNT, Math.round(effectiveWindow * MAX_CLAUDE_MD_TOKEN_CONTEXT_RATIO * bw(model)));
}
function isPathWithinProject(path) {
  return w0(path, gr());
}
function parseFrontmatterPaths(content) {
  let {
    frontmatter: fm,
    content: body
  } = Hh(content);
  if (!fm.paths) return {
    content: body
  };
  let cleanedPaths = fHt(fm.paths).map(p => p.endsWith("/**") ? p.slice(0, -3) : p).filter(p => p.length > 0);
  if (cleanedPaths.length === 0 || cleanedPaths.every(p => p === "**")) return {
    content: body
  };
  return {
    content: body,
    paths: cleanedPaths
  };
}
function stripHtmlComments(content) {
  if (!content.includes("<!--")) return {
    content: content,
    stripped: false
  };
  return processLexedTokensStripHtmlComments(new M$({
    gfm: false
  }).lex(content));
}
function processLexedTokensStripHtmlComments(tokens) {
  let result = "",
    stripped = false,
    commentPattern = /<!--[\s\S]*?-->/g;
  for (let token of tokens) {
    if (token.type === "html") {
      let trimmed = token.raw.trimStart();
      if (trimmed.startsWith("<!--") && trimmed.includes("-->")) {
        let withoutComments = token.raw.replace(commentPattern, "");
        if (stripped = true, withoutComments.trim().length > 0) result += withoutComments;
        continue;
      }
    }
    result += token.raw;
  }
  return {
    content: result,
    stripped: stripped
  };
}
function processFileContent(rawContent, filePath, fileType, conditionalRuleBase) {
  let o = EY.extname(filePath).toLowerCase();
  if (o && !ALLOWED_TEXT_EXTENSIONS.has(o)) return v(`Skipping non-text file in @include: ${filePath}`), {
    info: null,
    includePaths: []
  };
  let {
      content: s,
      paths: i
    } = parseFrontmatterPaths(rawContent),
    a = s.includes("<!--"),
    l = a || conditionalRuleBase !== undefined ? new M$({
      gfm: false
    }).lex(s) : undefined,
    c = a && l ? processLexedTokensStripHtmlComments(l).content : s,
    u = l && conditionalRuleBase !== undefined ? extractIncludePathsFromTokens(l, conditionalRuleBase) : [],
    d = c;
  if (fileType === "AutoMem") d = PHt(c).content;
  let p = d !== rawContent;
  return {
    info: {
      path: filePath,
      type: fileType,
      content: d,
      globs: i,
      contentDiffersFromDisk: p,
      rawContent: p ? rawContent : undefined
    },
    includePaths: u
  };
}
function createAutoMemEntry(rawContent) {
  let {
    content: compressed
  } = PHt(rawContent);
  return {
    path: XBe(),
    type: "AutoMem",
    content: compressed,
    contentDiffersFromDisk: true,
    rawContent: rawContent
  };
}
function handleFileReadError(error, filePaths) {
  let code = ln(error);
  if (code === "ENOENT" || code === "EISDIR") return;
  if (code === "EACCES") j("tengu_claude_md_permission_error", {
    is_access_error: 1,
    has_home_dir: filePaths.includes(sr()) ? 1 : 0
  });
}
async function readAndProcessMemoryFile(filePath, fileType, resolvedPath) {
  try {
    let content = await jt().readFile(filePath, {
      encoding: "utf-8"
    });
    return processFileContent(content, filePath, fileType, resolvedPath);
  } catch (err) {
    return handleFileReadError(err, filePath), {
      info: null,
      includePaths: []
    };
  }
}
function extractIncludePathsFromTokens(tokens, baseDir) {
  let foundPaths = new Set();
  function extractFromText(text) {
    let atRefPattern = /(?:^|\s)@((?:[^\s\\]|\\ )+)/g,
      match;
    while ((match = atRefPattern.exec(text)) !== null) {
      let ref = match[1];
      if (!ref) continue;
      let hashIdx = ref.indexOf("#");
      if (hashIdx !== -1) ref = ref.substring(0, hashIdx);
      if (!ref) continue;
      if (ref = ref.replaceAll("\\ ", " "), ref) {
        if (!(yd(ref) && !JA(ref)) && (ref.startsWith("./") || ref.startsWith("~/") || ref.startsWith("/") && ref !== "/" || !ref.startsWith("@") && !ref.match(/^[#%^&*()]+/) && ref.match(/^[a-zA-Z0-9._-]/))) {
          let resolved = Rs(ref, EY.dirname(baseDir));
          foundPaths.add(resolved);
        }
      }
    }
  }
  function walkTokens(tokenList) {
    for (let token of tokenList) {
      if (token.type === "code" || token.type === "codespan") continue;
      if (token.type === "html") {
        let raw = token.raw || "",
          trimmed = raw.trimStart();
        if (trimmed.startsWith("<!--") && trimmed.includes("-->")) {
          let commentPattern = /<!--[\s\S]*?-->/g,
            withoutComments = raw.replace(commentPattern, "");
          if (withoutComments.trim().length > 0) extractFromText(withoutComments);
        }
        continue;
      }
      if (token.type === "text") extractFromText(token.text || "");
      if (token.tokens) walkTokens(token.tokens);
      if (token.items) walkTokens(token.items);
    }
  }
  return walkTokens(tokens), [...foundPaths];
}
function isExcludedByClaudeMdExcludes(filePath, fileType) {
  if (fileType !== "User" && fileType !== "Project" && fileType !== "Local") return false;
  let excludes = Kr().claudeMdExcludes;
  if (!excludes || excludes.length === 0) return false;
  let matchOptions = {
      dot: true
    },
    normalizedPath = filePath.replaceAll("\\", "/"),
    resolvedExcludes = normalizeExcludePatterns(excludes).filter(p => p.length > 0);
  if (resolvedExcludes.length === 0) return false;
  return Xk7.default.isMatch(normalizedPath, resolvedExcludes, matchOptions);
}
function normalizeExcludePatterns(patterns) {
  let fs = jt(),
    normalized = patterns.map(p => p.replaceAll("\\", "/"));
  for (let pattern of normalized) {
    if (!pattern.startsWith("/")) continue;
    let wildcardIdx = pattern.search(/[*?{[]/),
      prefix = wildcardIdx === -1 ? pattern : pattern.slice(0, wildcardIdx),
      dir = EY.dirname(prefix);
    try {
      let realDir = fs.realpathSync(dir).replaceAll("\\", "/");
      if (realDir !== dir) {
        let realPattern = realDir + pattern.slice(dir.length);
        normalized.push(realPattern);
      }
    } catch {}
  }
  return normalized;
}
async function processMemoryFile(filePath, fileType, processedPaths, includeExternal, depth = 0, parentPath) {
  let normalizedPath = rv(filePath);
  if (processedPaths.has(normalizedPath) || depth >= MAX_INCLUDE_DEPTH) return [];
  if (isExcludedByClaudeMdExcludes(filePath, fileType)) return [];
  if (yd(filePath) && !JA(filePath)) return [];
  let {
    resolvedPath: resolvedFilePath,
    isSymlink: symlinkDetected
  } = Xp(jt(), filePath);
  if (symlinkDetected) {
    let resolvedNorm = rv(resolvedFilePath);
    if (processedPaths.has(resolvedNorm)) return [];
    processedPaths.add(resolvedNorm);
  }
  processedPaths.add(normalizedPath);
  let {
    info: fileInfo,
    includePaths: includedPaths
  } = await readAndProcessMemoryFile(filePath, fileType, resolvedFilePath);
  if (!fileInfo || !fileInfo.content.trim()) return [];
  if (parentPath) fileInfo.parent = parentPath;
  let results = [];
  results.push(fileInfo);
  for (let includedPath of includedPaths) {
    if (!isPathWithinProject(includedPath) && !includeExternal) continue;
    let nested = await processMemoryFile(includedPath, fileType, processedPaths, includeExternal, depth + 1, filePath);
    results.push(...nested);
  }
  return results;
}
async function processMdRules({
  rulesDir: rulesDir,
  type: fileType,
  processedPaths: processedPaths,
  includeExternal: includeExternal,
  conditionalRule: conditionalRule,
  visitedDirs = new Set()
}) {
  if (visitedDirs.has(rulesDir)) return [];
  try {
    let fs = jt(),
      {
        resolvedPath: resolvedDir,
        isSymlink: dirIsSymlink
      } = Xp(fs, rulesDir);
    if (visitedDirs.add(rulesDir), dirIsSymlink) visitedDirs.add(resolvedDir);
    let entries = [],
      dirEntries;
    try {
      dirEntries = await fs.readdir(resolvedDir);
    } catch (err) {
      let code = ln(err);
      if (code === "ENOENT" || code === "EACCES" || code === "ENOTDIR") return [];
      throw err;
    }
    for (let entry of dirEntries) {
      let entryPath = EY.join(rulesDir, entry.name),
        {
          resolvedPath: resolvedEntryPath,
          isSymlink: entryIsSymlink
        } = Xp(fs, entryPath),
        symlinkStat = entryIsSymlink ? await fs.stat(resolvedEntryPath) : null,
        isDir = symlinkStat ? symlinkStat.isDirectory() : entry.isDirectory(),
        isFile = symlinkStat ? symlinkStat.isFile() : entry.isFile();
      if (isDir) entries.push(...(await processMdRules({
        rulesDir: resolvedEntryPath,
        type: fileType,
        processedPaths: processedPaths,
        includeExternal: includeExternal,
        conditionalRule: conditionalRule,
        visitedDirs: visitedDirs
      })));else if (isFile && entry.name.endsWith(".md")) {
        let fileEntries = await processMemoryFile(resolvedEntryPath, fileType, processedPaths, includeExternal);
        entries.push(...fileEntries.filter(e => conditionalRule ? e.globs : !e.globs));
      }
    }
    return entries;
  } catch (err) {
    if (err instanceof Error && err.message.includes("EACCES")) j("tengu_claude_rules_md_permission_error", {
      is_access_error: 1,
      has_home_dir: rulesDir.includes(sr()) ? 1 : 0
    });
    return [];
  }
}
function isStandardMemoryType(fileType) {
  return fileType === "User" || fileType === "Project" || fileType === "Local" || fileType === "Managed";
}
function consumeSessionStartMarker() {
  if (!isSessionStartPending) return;
  isSessionStartPending = false;
  let prev = sessionStartMarker;
  return sessionStartMarker = "session_start", prev;
}
function clearMemoryFileCaches() {
  getMemoryFiles.cache?.clear?.();
}
function resetGetMemoryFilesCache(reason = "session_start") {
  sessionStartMarker = reason, isSessionStartPending = true, clearMemoryFileCaches();
}
function getLargeMemoryFiles(files) {
  let limit = getMaxMemoryCharacterCount();
  return files.filter(f => !isSyntheticMemoryPath(f.path) && isStandardMemoryType(f.type) && f.content.length > limit);
}
function filterInjectedMemoryFiles(files) {
  if (!ut("tengu_moth_copse", false)) return files;
  return files.filter(f => f.type !== "AutoMem");
}
async function getManagedAndUserConditionalRules(cwd, processedPaths) {
  let results = [],
    managedRulesDir = Lvn();
  if (results.push(...(await processConditionedMdRules(cwd, managedRulesDir, "Managed", processedPaths, false))), eg("userSettings")) {
    let userRulesDir = Mvn();
    results.push(...(await processConditionedMdRules(cwd, userRulesDir, "User", processedPaths, true)));
  }
  return results;
}
async function getMemoryFilesForNestedDirectory(dirPath, cwd, processedPaths) {
  if (Ge.CLAUDE_CODE_DISABLE_CLAUDE_MDS) return [];
  let results = [];
  if (eg("projectSettings")) {
    let claudeMdPath = EY.join(dirPath, "CLAUDE.md");
    results.push(...(await processMemoryFile(claudeMdPath, "Project", processedPaths, false)));
    let dotClaudeMdPath = EY.join(dirPath, ".claude", "CLAUDE.md");
    results.push(...(await processMemoryFile(dotClaudeMdPath, "Project", processedPaths, false)));
  }
  if (eg("localSettings")) {
    let localMdPath = EY.join(dirPath, "CLAUDE.local.md");
    results.push(...(await processMemoryFile(localMdPath, "Local", processedPaths, false)));
  }
  let rulesDir = EY.join(dirPath, ".claude", "rules"),
    rulesProcessedPaths = new Set(processedPaths);
  results.push(...(await processMdRules({
    rulesDir: rulesDir,
    type: "Project",
    processedPaths: rulesProcessedPaths,
    includeExternal: false,
    conditionalRule: false
  }))), results.push(...(await processConditionedMdRules(cwd, rulesDir, "Project", processedPaths, false)));
  for (let p of rulesProcessedPaths) processedPaths.add(p);
  return results;
}
async function getConditionalRulesForCwdLevelDirectory(dirPath, cwd, processedPaths) {
  let rulesDir = EY.join(dirPath, ".claude", "rules");
  return processConditionedMdRules(cwd, rulesDir, "Project", processedPaths, false);
}
async function processConditionedMdRules(cwd, rulesDir, fileType, processedPaths, includeExternal) {
  return (await processMdRules({
    rulesDir: rulesDir,
    type: fileType,
    processedPaths: processedPaths,
    includeExternal: includeExternal,
    conditionalRule: true
  })).filter(rule => {
    if (!rule.globs || rule.globs.length === 0) return false;
    let baseDir = fileType === "Project" ? EY.dirname(EY.dirname(rulesDir)) : gr(),
      relativeCwd = EY.isAbsolute(cwd) ? EY.relative(baseDir, cwd) : cwd;
    if (!relativeCwd || relativeCwd.startsWith("..") || EY.isAbsolute(relativeCwd)) return false;
    return Mk7.default().add(rule.globs).ignores(relativeCwd);
  });
}
function getExternalClaudeMdIncludes(files) {
  let external = [];
  for (let file of files) if (file.type !== "User" && file.parent && !isPathWithinProject(file.path)) external.push({
    path: file.path,
    parent: file.parent
  });
  return external;
}
function hasExternalClaudeMdIncludes(files) {
  return getExternalClaudeMdIncludes(files).length > 0;
}
async function shouldShowClaudeMdExternalIncludesWarning() {
  let prefs = Py();
  if (prefs.hasClaudeMdExternalIncludesApproved || prefs.hasClaudeMdExternalIncludesWarningShown) return false;
  return hasExternalClaudeMdIncludes(await getMemoryFiles(true));
}
function isMemoryFilePath(filePath) {
  let basename = EY.basename(filePath);
  if (basename === "CLAUDE.md" || basename === "CLAUDE.local.md") return true;
  if (basename.endsWith(".md") && filePath.includes(`${EY.sep}.claude${EY.sep}rules${EY.sep}`)) return true;
  return false;
}
function getAllMemoryFilePaths(files, watchedPaths) {
  let pathSet = new Set();
  for (let file of files) {
    if (isSyntheticMemoryPath(file.path)) continue;
    if (file.content.trim().length > 0) pathSet.add(file.path);
  }
  for (let p of yRe(watchedPaths)) if (isMemoryFilePath(p)) pathSet.add(p);
  return Array.from(pathSet);
}
var Mk7,
  EY,
  Xk7,
  hasLoggedInitialLoad = false,
  MANAGED_SETTINGS_CLAUDEMD_PATH = "<managed-settings>",
  MEMORY_PREAMBLE = "Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.",
  MAX_CLAUDE_MD_TOKEN_CONTEXT_RATIO = 0.05,
  MIN_MEMORY_CHARACTER_COUNT = 40000,
  ALLOWED_TEXT_EXTENSIONS,
  MAX_INCLUDE_DEPTH = 5,
  getMemoryFiles,
  sessionStartMarker = "session_start",
  isSessionStartPending = true,
  getClaudeMds = (files, typeFilter) => {
    let parts = [],
      paperHalyardFlag = ut("tengu_paper_halyard", false);
    for (let file of files) {
      if (typeFilter && !typeFilter(file.type)) continue;
      if (paperHalyardFlag && (file.type === "Project" || file.type === "Local")) continue;
      if (file.content) {
        let typeLabel = file.type === "Project" ? " (project instructions, checked into the codebase)" : file.type === "Local" ? " (user's private project instructions, not checked in)" : file.type === "AutoMem" ? " (user's auto-memory, persists across conversations)" : file.type === "Managed" ? " (organization-managed policy instructions)" : " (user's private global instructions for all projects)",
          trimmed = file.content.trim();
        parts.push(`Contents of ${file.path}${typeLabel}:

${trimmed}`);
      }
    }
    if (parts.length === 0) return "";
    return `${MEMORY_PREAMBLE}

${parts.join(`

`)}`;
  };
var hP = b(() => {
  na();
  Rtt();
  Ct();
  ct();
  LHt();
  iA();
  Sd();
  Yn();
  Jh();
  nr();
  eE();
  je();
  wA();
  Or();
  an();
  St();
  mc();
  Ck();
  Hw();
  bs();
  Ba();
  Tp();
  Fo();
  Pu();
  aA();
  gf();
  qMe();
  Er();
  Mk7 = L(iFe(), 1), EY = require("path"), Xk7 = L(rjr(), 1);
  ALLOWED_TEXT_EXTENSIONS = new Set([".md", ".txt", ".text", ".json", ".yaml", ".yml", ".toml", ".xml", ".csv", ".html", ".htm", ".css", ".scss", ".sass", ".less", ".js", ".ts", ".tsx", ".jsx", ".mjs", ".cjs", ".mts", ".cts", ".py", ".pyi", ".pyw", ".rb", ".erb", ".rake", ".go", ".rs", ".java", ".kt", ".kts", ".scala", ".c", ".cpp", ".cc", ".cxx", ".h", ".hpp", ".hxx", ".cs", ".swift", ".sh", ".bash", ".zsh", ".fish", ".ps1", ".bat", ".cmd", ".env", ".ini", ".cfg", ".conf", ".config", ".properties", ".sql", ".graphql", ".gql", ".proto", ".vue", ".svelte", ".astro", ".ejs", ".hbs", ".pug", ".jade", ".php", ".pl", ".pm", ".lua", ".r", ".R", ".dart", ".ex", ".exs", ".erl", ".hrl", ".clj", ".cljs", ".cljc", ".edn", ".hs", ".lhs", ".elm", ".ml", ".mli", ".f", ".f90", ".f95", ".for", ".cmake", ".make", ".makefile", ".gradle", ".sbt", ".rst", ".adoc", ".asciidoc", ".org", ".tex", ".latex", ".lock", ".log", ".diff", ".patch"]);
  getMemoryFiles = bn(async (includeExternal = false) => {
    if (Dl()) return [];
    let startTime = Date.now();
    xn("info", "memory_files_started");
    let results = [],
      processedPaths = new Set(),
      prefs = Py(),
      allowExternal = includeExternal || prefs.hasClaudeMdExternalIncludesApproved || false,
      managedClaudeMdPath = i2e("Managed");
    results.push(...(await processMemoryFile(managedClaudeMdPath, "Managed", processedPaths, allowExternal)));
    let inlineContent = Xts();
    if (inlineContent) results.push({
      path: KAr,
      type: "Managed",
      content: inlineContent,
      globs: [],
      contentDiffersFromDisk: true,
      rawContent: inlineContent
    });
    let policyClaudeMd = Cn("policySettings")?.claudeMd;
    if (policyClaudeMd) results.push({
      path: MANAGED_SETTINGS_CLAUDEMD_PATH,
      type: "Managed",
      content: policyClaudeMd,
      globs: [],
      contentDiffersFromDisk: true,
      rawContent: policyClaudeMd
    });
    let managedRulesDir = Lvn();
    if (results.push(...(await processMdRules({
      rulesDir: managedRulesDir,
      type: "Managed",
      processedPaths: processedPaths,
      includeExternal: allowExternal,
      conditionalRule: false
    }))), eg("userSettings")) {
      let userClaudeMdPath = i2e("User");
      results.push(...(await processMemoryFile(userClaudeMdPath, "User", processedPaths, true)));
      let userRulesDir = Mvn();
      results.push(...(await processMdRules({
        rulesDir: userRulesDir,
        type: "User",
        processedPaths: processedPaths,
        includeExternal: true,
        conditionalRule: false
      })));
    }
    let ancestorDirs = [],
      cwdPath = gr(),
      currentDir = cwdPath;
    while (currentDir !== EY.parse(currentDir).root) ancestorDirs.push(currentDir), currentDir = EY.dirname(currentDir);
    let gitRoot = Ou(cwdPath),
      worktreeGitDir = Uf(cwdPath),
      isWorktree = gitRoot !== null && worktreeGitDir !== null && rv(gitRoot) !== rv(worktreeGitDir) && w0(gitRoot, worktreeGitDir);
    for (let dir of ancestorDirs.reverse()) {
      let isWorktreeOnlyDir = isWorktree && w0(dir, worktreeGitDir) && !w0(dir, gitRoot);
      if (eg("projectSettings") && !isWorktreeOnlyDir) {
        let projectMdPath = EY.join(dir, "CLAUDE.md");
        results.push(...(await processMemoryFile(projectMdPath, "Project", processedPaths, allowExternal)));
        let dotClaudeProjectMdPath = EY.join(dir, ".claude", "CLAUDE.md");
        results.push(...(await processMemoryFile(dotClaudeProjectMdPath, "Project", processedPaths, allowExternal)));
        let projectRulesDir = EY.join(dir, ".claude", "rules");
        results.push(...(await processMdRules({
          rulesDir: projectRulesDir,
          type: "Project",
          processedPaths: processedPaths,
          includeExternal: allowExternal,
          conditionalRule: false
        })));
      }
      if (eg("localSettings")) {
        let localMdPath = EY.join(dir, "CLAUDE.local.md");
        results.push(...(await processMemoryFile(localMdPath, "Local", processedPaths, allowExternal)));
      }
    }
    if (rt(process.env.CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD)) {
      let additionalDirs = UI();
      for (let extraDir of additionalDirs) {
        let extraProjectMdPath = EY.join(extraDir, "CLAUDE.md");
        results.push(...(await processMemoryFile(extraProjectMdPath, "Project", processedPaths, allowExternal)));
        let extraDotClaudeProjectMdPath = EY.join(extraDir, ".claude", "CLAUDE.md");
        results.push(...(await processMemoryFile(extraDotClaudeProjectMdPath, "Project", processedPaths, allowExternal)));
        let extraRulesDir = EY.join(extraDir, ".claude", "rules");
        if (results.push(...(await processMdRules({
          rulesDir: extraRulesDir,
          type: "Project",
          processedPaths: processedPaths,
          includeExternal: allowExternal,
          conditionalRule: false
        }))), eg("localSettings")) {
          let extraLocalMdPath = EY.join(extraDir, "CLAUDE.local.md");
          results.push(...(await processMemoryFile(extraLocalMdPath, "Local", processedPaths, allowExternal)));
        }
      }
    }
    if (Ru()) {
      let autoMemIndexContent = process.env.CLAUDE_COWORK_MEMORY_INDEX_CONTENT;
      if (autoMemIndexContent !== "") {
        let autoMemEntry = autoMemIndexContent !== undefined ? createAutoMemEntry(autoMemIndexContent) : (await readAndProcessMemoryFile(XBe(), "AutoMem")).info;
        if (autoMemEntry) {
          let normalizedAutoMemPath = rv(autoMemEntry.path);
          if (!processedPaths.has(normalizedAutoMemPath)) processedPaths.add(normalizedAutoMemPath), results.push(autoMemEntry);
        }
      }
    }
    let totalContentLength = results.reduce((acc, f) => acc + f.content.length, 0);
    xn("info", "memory_files_completed", {
      duration_ms: Date.now() - startTime,
      file_count: results.length,
      total_content_length: totalContentLength
    });
    let typeCounts = {};
    for (let file of results) typeCounts[file.type] = (typeCounts[file.type] ?? 0) + 1;
    if (!hasLoggedInitialLoad) hasLoggedInitialLoad = true, j("tengu_claudemd__initial_load", {
      file_count: results.length,
      total_content_length: totalContentLength,
      user_count: typeCounts.User ?? 0,
      project_count: typeCounts.Project ?? 0,
      local_count: typeCounts.Local ?? 0,
      managed_count: typeCounts.Managed ?? 0,
      automem_count: typeCounts.AutoMem ?? 0,
      duration_ms: Date.now() - startTime
    });
    if (!includeExternal) {
      let sessionMarker = consumeSessionStartMarker();
      if (sessionMarker !== undefined && NPt()) for (let file of results) {
        if (!isStandardMemoryType(file.type)) continue;
        if (isSyntheticMemoryPath(file.path)) continue;
        let auditReason = file.parent ? "include" : sessionMarker;
        a2e(file.path, file.type, auditReason, {
          globs: file.globs,
          parentFilePath: file.parent
        });
      }
    }
    return results;
  });
});
export {kk7 as v4i,isSyntheticMemoryPath,getMaxMemoryCharacterCount,isPathWithinProject as b4i,parseFrontmatterPaths as $Ld,stripHtmlComments,processLexedTokensStripHtmlComments as E4i,processFileContent as WLd,createAutoMemEntry as GLd,handleFileReadError as VLd,readAndProcessMemoryFile as C4i,extractIncludePathsFromTokens as KLd,isExcludedByClaudeMdExcludes as jLd,normalizeExcludePatterns as YLd,processMemoryFile,processMdRules,isStandardMemoryType as A4i,consumeSessionStartMarker as JLd,clearMemoryFileCaches,resetGetMemoryFilesCache,getLargeMemoryFiles,filterInjectedMemoryFiles,getManagedAndUserConditionalRules,getMemoryFilesForNestedDirectory,getConditionalRulesForCwdLevelDirectory,processConditionedMdRules,getExternalClaudeMdIncludes,hasExternalClaudeMdIncludes,shouldShowClaudeMdExternalIncludesWarning,isMemoryFilePath,getAllMemoryFilePaths,Mk7 as _4i,EY as Wh,Xk7 as y4i,hasLoggedInitialLoad as g4i,MANAGED_SETTINGS_CLAUDEMD_PATH,MEMORY_PREAMBLE as BLd,MAX_CLAUDE_MD_TOKEN_CONTEXT_RATIO,MIN_MEMORY_CHARACTER_COUNT,ALLOWED_TEXT_EXTENSIONS as ULd,MAX_INCLUDE_DEPTH as zLd,getMemoryFiles,sessionStartMarker as wKr,isSessionStartPending as kKr,getClaudeMds,hP as ZR};
