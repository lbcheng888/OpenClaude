// @ts-nocheck
import {ft,oo,b,x} from "../../runtime.ts";
import {hs,uoe,VN,Tu} from "../../vendor/m649.ts";
import {getOriginalCwd as gr,getSessionId as It,getMemoryToggledOff as Kx,getProjectRoot as ic,lt} from "../session/0132_sent.ts";
import {j7,_Ue,Sbn} from "../../vendor/m2204.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {Qx,r2} from "../config/0646_existsSync.ts";
import {fA,wm} from "../../vendor/m707.ts";
import {getSettingsFilePathForSource as Xf,getSettingsRootPathForSource as nNe,br} from "../config/0745_updateSettingsForSource.ts";
import {rQ,fCe} from "../../vendor/m741.ts";
import {uM,ZEe} from "../../vendor/m710.ts";
import {bgt,bT,Dw} from "../core/5176_encoding.ts";
import {fEn,oz} from "../../vendor/m2254.ts";
import {Cg,D_} from "../agent/2784_withFileTypes.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {fae,Jkn} from "../artifact/2715_isPublishToolEnabled.ts";
import {NS} from "../../vendor/m648.ts";
import {Wt,d0,ps} from "../../vendor/m230.ts";
import {or,dn} from "../config/0137_namespace.ts";
import {lu,Cf,zf} from "../../vendor/m133.ts";
import {CI,sae} from "../../vendor/m2686.ts";
import {fa,cEn,uEn,ry} from "../../vendor/m2253.ts";
import {vs,dm} from "../../vendor/m2256.ts";
import {getRuleByContentsForToolName as Ute,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {wzr,TW,o9e} from "../../vendor/m2790.ts";
import {su,ow} from "../../vendor/m2257.ts";
import {Y7,zse,Abn,oDt,Jm} from "../config/2207_Jm.ts";
import {Jf,gA} from "../mcp/0733_serverName.ts";
import {r9e,Sw} from "../../vendor/m2789.ts";
import {PUe,rz} from "../config/2253_displayName.ts";
import {Bae,HI} from "../telemetry/3173_error.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {resolveToolAlias as UR,hE,bet} from "../config/2229_observed_uid.ts";
import {wUe} from "../../vendor/m2236.ts";
// @ts-nocheck
var A3i = {};
ft(A3i, {
  untypeDenyReasonForAskPropagation: () => untypeDenyReasonForAskPropagation,
  toPosixPath: () => toPosixPath,
  relativePath: () => relativePath,
  patternWithRoot: () => patternWithRoot,
  pathInWorkingPath: () => pathInWorkingPath,
  pathInAllowedWorkingPath: () => pathInAllowedWorkingPath,
  normalizeTrustedSymlink: () => normalizeTrustedSymlink,
  normalizePatternsToPath: () => normalizePatternsToPath,
  normalizeCaseForComparison: () => normalizeCaseForComparison,
  matchingRuleForInput: () => matchingRuleForInput,
  matchingAllowRuleForAllPaths: () => matchingAllowRuleForAllPaths,
  matchesPathRule: () => matchesPathRule,
  isUntrustedUncPath: () => isUntrustedUncPath,
  isScratchpadEnabled: () => isScratchpadEnabled,
  isClaudeSettingsPath: () => isClaudeSettingsPath,
  getScratchpadDir: () => getScratchpadDir,
  getResolvedWorkingDirPaths: () => getResolvedWorkingDirPaths,
  getProjectTempDir: () => getProjectTempDir,
  getFileReadIgnorePatterns: () => getFileReadIgnorePatterns,
  getClaudeTempDirName: () => getClaudeTempDirName,
  getClaudeTempDir: () => getClaudeTempDir,
  getClaudeSkillScope: () => getClaudeSkillScope,
  getChildProcessTmpDir: () => getChildProcessTmpDir,
  getBundledSkillsRoot: () => getBundledSkillsRoot,
  generateSuggestions: () => generateSuggestions,
  ensureScratchpadDir: () => ensureScratchpadDir,
  checkWritePermissionForTool: () => checkWritePermissionForTool,
  checkReadableInternalPath: () => checkReadableInternalPath,
  checkReadPermissionForTool: () => checkReadPermissionForTool,
  checkReadNetworkPathSafety: () => checkReadNetworkPathSafety,
  checkPathSafetyForAutoEdit: () => checkPathSafetyForAutoEdit,
  checkEditableInternalPath: () => checkEditableInternalPath,
  allWorkingDirectories: () => allWorkingDirectories,
  DANGEROUS_FILES_LC: () => DANGEROUS_FILES_LC,
  DANGEROUS_FILES: () => DANGEROUS_FILES,
  DANGEROUS_DIRECTORY_PATHS: () => DANGEROUS_DIRECTORY_PATHS,
  DANGEROUS_DIRECTORIES: () => DANGEROUS_DIRECTORIES
});
function normalizeCaseForComparison(rawPath) {
  return rawPath.toLowerCase().replace(/\u0131/g, "i").replace(/\u017f/g, "s");
}
function getClaudeSkillScope(inputPath) {
  let resolvedPath = hs(inputPath),
    foldedPath = normalizeCaseForComparison(resolvedPath),
    skillRoots = [{
      dir: hs(jl.join(gr(), ".claude", "skills")),
      prefix: "/.claude/skills/"
    }, {
      dir: hs(jl.join(fKt.homedir(), ".claude", "skills")),
      prefix: "~/.claude/skills/"
    }];
  for (let {
    dir: skillRootDir,
    prefix: skillRootPrefix
  } of skillRoots) {
    let foldedRoot = normalizeCaseForComparison(skillRootDir);
    for (let separator of [jl.sep, "/"]) if (foldedPath.startsWith(foldedRoot + separator.toLowerCase())) {
      let remainder = resolvedPath.slice(skillRootDir.length + separator.length),
        slashIndex = remainder.indexOf("/"),
        backslashIndex = jl.sep === "\\" ? remainder.indexOf("\\") : -1,
        firstSepIndex = slashIndex === -1 ? backslashIndex : backslashIndex === -1 ? slashIndex : Math.min(slashIndex, backslashIndex);
      if (firstSepIndex <= 0) return null;
      let skillName = remainder.slice(0, firstSepIndex);
      if (!skillName || skillName === "." || skillName.includes("..")) return null;
      if (/[*?[\]]/.test(skillName) || skillName.includes("\\")) return null;
      let restSegments = remainder.slice(firstSepIndex + 1).split(/[/\\]/);
      if (j7(skillName) === ".claude" || restSegments.some(segment => j7(segment) === ".claude")) return null;
      return {
        skillName: skillName,
        pattern: skillRootPrefix + skillName + "/**"
      };
    }
  }
  return null;
}
function relativePath(fromPath, toPath) {
  if (Yt() === "windows") {
    let fromPosix = Qx(fromPath),
      toPosix = Qx(toPath);
    return jl.posix.relative(fromPosix, toPosix);
  }
  return jl.posix.relative(fromPath, toPath);
}
function toPosixPath(inputPath) {
  if (Yt() === "windows") return Qx(inputPath);
  return inputPath;
}
function qwm() {
  let settingsPaths = fA.map(source => Xf(source)).filter(p => p !== undefined);
  if (Yt() === "wsl" && rQ()) settingsPaths.push(jl.join(uM, "managed-settings.json"));
  return settingsPaths;
}
function isClaudeSettingsPath(inputPath) {
  let resolvedPath = hs(inputPath),
    foldedPath = normalizeCaseForComparison(resolvedPath);
  if (foldedPath.endsWith(`${jl.sep}.claude${jl.sep}settings.json`) || foldedPath.endsWith(`${jl.sep}.claude${jl.sep}settings.local.json`)) return true;
  return qwm().some(settingsPath => normalizeCaseForComparison(settingsPath) === foldedPath);
}
function Wwm(inputPath) {
  if (isClaudeSettingsPath(inputPath)) return true;
  let commandsDir = jl.join(gr(), ".claude", "commands"),
    agentsDir = jl.join(gr(), ".claude", "agents"),
    skillsDir = jl.join(gr(), ".claude", "skills");
  return pathInWorkingPath(inputPath, commandsDir) || pathInWorkingPath(inputPath, agentsDir) || pathInWorkingPath(inputPath, skillsDir);
}
function S3l(inputPath) {
  let planId = bgt();
  if (!planId) return false;
  let normalized = jl.normalize(inputPath);
  if (jl.dirname(normalized) !== jl.normalize(bT())) return false;
  let baseName = jl.basename(normalized);
  return baseName === `${planId}.md` || baseName.startsWith(`${planId}-agent-`) && baseName.endsWith(".md");
}
function Gwm(inputPath) {
  let normalized = jl.normalize(inputPath);
  return normalized.startsWith(fEn()) && normalized.endsWith(".js");
}
function Vwm(inputPath) {
  let projectDir = Cg(Lt()),
    normalized = jl.normalize(inputPath);
  return normalized === projectDir || normalized.startsWith(projectDir + jl.sep);
}
function isScratchpadEnabled() {
  if (it("tengu_scratch", false)) return true;
  {
    let {
      isArtifactToolEligible: isArtifactToolEligible
    } = (fae(), oo(Jkn));
    return isArtifactToolEligible();
  }
  return false;
}
function getClaudeTempDirName() {
  if (Yt() === "windows") return "claude";
  return `claude-${process.getuid?.() ?? 0}`;
}
function getProjectTempDir() {
  return jl.join(getClaudeTempDir(), NS(gr())) + jl.sep;
}
function getScratchpadDir() {
  return zwm(It());
}
async function ensureScratchpadDir() {
  if (!isScratchpadEnabled()) return null;
  let scratchpadDir = getScratchpadDir();
  if (scratchpadDir === null) return null;
  return await Wt().mkdir(scratchpadDir, {
    mode: 448
  }), scratchpadDir;
}
function b3l(inputPath) {
  if (!isScratchpadEnabled()) return false;
  let scratchpadDir = getScratchpadDir();
  if (scratchpadDir === null) return false;
  let normalized = jl.normalize(inputPath),
    foldedPath = normalizeCaseForComparison(normalized),
    foldedScratchpad = normalizeCaseForComparison(scratchpadDir),
    foldedScratchpadPrefix = foldedScratchpad + jl.sep;
  return foldedPath === foldedScratchpad || foldedPath.startsWith(foldedScratchpadPrefix) && !_Ue(foldedPath, foldedScratchpadPrefix, DANGEROUS_FILES_LC);
}
function E3l(inputPath) {
  if (process.env.CLAUDE_CODE_SESSION_KIND !== "bg") return false;
  let jobDir = process.env.CLAUDE_JOB_DIR;
  if (!jobDir) return false;
  let jobsRoot = jl.join(or(), "jobs") + jl.sep,
    normalizedJobDir = jl.normalize(jobDir);
  if (!normalizedJobDir.startsWith(jobsRoot)) return false;
  let jobTmpPrefix = normalizedJobDir + jl.sep + "tmp" + jl.sep;
  if (!normalizeCaseForComparison(inputPath).startsWith(normalizeCaseForComparison(jobTmpPrefix))) return false;
  return !_Ue(inputPath, jobTmpPrefix, DANGEROUS_FILES_LC);
}
function mKt(inputPath, trustedDirSets) {
  if (!trustedDirSets || trustedDirSets.size === 0) return false;
  for (let dirSet of trustedDirSets.values()) for (let trustedDir of dirSet) {
    if (lu(inputPath) !== lu(trustedDir)) continue;
    if (pathInWorkingPath(inputPath, trustedDir)) return true;
  }
  return false;
}
function isUntrustedUncPath(inputPath, trustedDirSets) {
  return lu(inputPath) && !Cf(inputPath) && !mKt(inputPath, trustedDirSets);
}
function C3l(pathSegments) {
  let bestDepth = 0;
  for (let workingDir of getResolvedWorkingDirPaths(gr())) {
    let workingSegments = hs(workingDir).split(jl.sep);
    if (workingSegments.length > 1 && workingSegments.at(-1) === "") workingSegments.pop();
    let matchedCount = 0;
    while (matchedCount < workingSegments.length && matchedCount < pathSegments.length && (pathSegments[matchedCount] === workingSegments[matchedCount] || matchedCount === 0 && /^[a-z]:$/i.test(pathSegments[matchedCount]) && pathSegments[matchedCount].toLowerCase() === workingSegments[matchedCount].toLowerCase())) matchedCount++;
    if (matchedCount === workingSegments.length) {
      let depth = matchedCount;
      for (let i = 0; i < matchedCount; i++) if (j7(workingSegments[i]) === ".claude" && j7(workingSegments[i + 1] ?? "") !== "worktrees") {
        depth = i;
        break;
      }
      if (depth > bestDepth) bestDepth = depth;
    }
  }
  return bestDepth;
}
function f3l(inputPath) {
  let pathSegments = hs(inputPath).split(jl.sep),
    workingDepth = C3l(pathSegments),
    claudeCount = 0;
  for (let i = workingDepth; i < pathSegments.length; i++) if (j7(pathSegments[i]) === ".claude") claudeCount++;
  return claudeCount;
}
function jwm(inputPath, pattern) {
  let baseDir = pattern.startsWith("~/.claude/") ? fKt.homedir() : pattern.startsWith("/.claude/") ? gr() : null;
  if (baseDir === null) return false;
  let claudeRootSegments = hs(jl.join(baseDir, ".claude")).split(jl.sep);
  if (claudeRootSegments.length > 1 && claudeRootSegments.at(-1) === "") claudeRootSegments.pop();
  let pathSegments = hs(inputPath).split(jl.sep);
  for (let i = 0; i < claudeRootSegments.length; i++) if (pathSegments[i] !== claudeRootSegments[i] && !(i === 0 && /^[a-z]:$/i.test(pathSegments[i] ?? "") && pathSegments[i].toLowerCase() === claudeRootSegments[i].toLowerCase())) return false;
  for (let i = claudeRootSegments.length; i < pathSegments.length; i++) if (j7(pathSegments[i]) === ".claude") return true;
  return false;
}
function Ywm(inputPath, allowSkillSubdirs, trustedDirSets) {
  let pathSegments = hs(inputPath).split(jl.sep),
    baseName = pathSegments.at(-1);
  if (lu(inputPath) && !Cf(inputPath) && !mKt(inputPath, trustedDirSets)) return true;
  let sawAllowedClaudeChild = false,
    workingDepth = C3l(pathSegments);
  for (let i = 0; i < pathSegments.length; i++) {
    let segment = pathSegments[i],
      foldedSegment = j7(segment);
    for (let dangerousDir of DANGEROUS_DIRECTORIES) {
      if (foldedSegment !== normalizeCaseForComparison(dangerousDir)) continue;
      if (dangerousDir === ".claude") {
        let belowWorkingDir = i >= workingDepth;
        if (sawAllowedClaudeChild) return true;
        let childSegment = pathSegments[i + 1],
          foldedChild = childSegment ? j7(childSegment) : undefined;
        if (allowSkillSubdirs && foldedChild) {
          if (foldedChild === "skills" || foldedChild === "agents" || foldedChild === "commands") {
            if (belowWorkingDir) sawAllowedClaudeChild = true;
            break;
          }
          if (foldedChild === "scheduled_tasks.json" && i + 1 === pathSegments.length - 1) break;
        }
        if (foldedChild === "worktrees") {
          if (belowWorkingDir) sawAllowedClaudeChild = true;
          break;
        }
      }
      return true;
    }
  }
  for (let dangerousDirPath of DANGEROUS_DIRECTORY_PATHS) {
    let dangerousPathSegments = dangerousDirPath.split("/");
    for (let i = 0; i + dangerousPathSegments.length <= pathSegments.length; i++) if (dangerousPathSegments.every((seg, j) => j7(pathSegments[i + j]) === normalizeCaseForComparison(seg))) return true;
  }
  if (baseName) {
    let foldedBaseName = j7(baseName);
    if (DANGEROUS_FILES.some(dangerousFile => normalizeCaseForComparison(dangerousFile) === foldedBaseName)) return true;
  }
  return false;
}
function FXn(inputPath, trustedDirSets) {
  if (Yt() === "windows" || Yt() === "wsl") {
    if (inputPath.indexOf(":", 2) !== -1) return true;
  }
  if (/~\d/.test(inputPath)) return true;
  if (inputPath.startsWith("\\\\?\\") || inputPath.startsWith("\\\\.\\") || inputPath.startsWith("//?/") || inputPath.startsWith("//./")) return true;
  let segments = inputPath.split(/[/\\]/);
  for (let segment of segments) {
    if (segment === "" || segment === "." || segment === "..") continue;
    if (/[.\s]+$/.test(segment)) return true;
  }
  if (/\.(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i.test(inputPath)) return true;
  if (/(^|\/|\\)\.{3,}(\/|\\|$)/.test(inputPath)) return true;
  if (CI(inputPath, true) && !Cf(inputPath) && !mKt(inputPath, trustedDirSets)) return true;
  return false;
}
function checkPathSafetyForAutoEdit(toolPath, candidatePaths, requireGranted, isRemoteMode, trustedDirSets) {
  let needsExplicitGrant = requireGranted || isRemoteMode,
    resolvedPaths = candidatePaths ?? d0(toolPath);
  for (let candidate of resolvedPaths) if (FXn(candidate, trustedDirSets)) return {
    safe: false,
    message: `Claude requested permissions to write to ${toolPath}, which contains a suspicious Windows path pattern that requires manual approval.`,
    classifierApprovable: false
  };
  for (let candidate of resolvedPaths) if (needsExplicitGrant) {
    if (isClaudeSettingsPath(candidate)) return {
      safe: false,
      message: `Claude requested permissions to write to ${toolPath}, but you haven't granted it yet.`,
      classifierApprovable: true
    };
  } else if (Wwm(candidate)) return {
    safe: false,
    message: `Claude requested permissions to write to ${toolPath}, but you haven't granted it yet.`,
    classifierApprovable: true
  };
  for (let candidate of resolvedPaths) if (Ywm(candidate, needsExplicitGrant, trustedDirSets)) return {
    safe: false,
    message: `Claude requested permissions to edit ${toolPath} which is a sensitive file.`,
    classifierApprovable: true
  };
  return {
    safe: true
  };
}
function allWorkingDirectories(context) {
  return new Set([gr(), ...context.additionalWorkingDirectories.keys()]);
}
function pathInAllowedWorkingPath(toolPath, context, candidatePaths) {
  let resolvedPaths = candidatePaths ?? d0(toolPath),
    allowedDirs = Array.from(allWorkingDirectories(context)).flatMap(dir => getResolvedWorkingDirPaths(dir));
  return resolvedPaths.every(path => allowedDirs.some(allowedDir => pathInWorkingPath(path, allowedDir, {
    caseFold: false
  })));
}
function pathInWorkingPath(childPath, parentPath, {
  caseFold: caseFold
} = {
  caseFold: true
}) {
  let resolvedChild = hs(childPath),
    resolvedParent = hs(parentPath),
    normalizedChild = resolvedChild.replace(/^\/private\/var\//, "/var/").replace(/^\/private\/tmp(\/|$)/, "/tmp$1"),
    normalizedParent = resolvedParent.replace(/^\/private\/var\//, "/var/").replace(/^\/private\/tmp(\/|$)/, "/tmp$1"),
    relative = caseFold ? relativePath(normalizeCaseForComparison(normalizedParent), normalizeCaseForComparison(normalizedChild)) : relativePath(normalizedParent, normalizedChild);
  if (relative === "") return true;
  if (uoe(relative)) return false;
  return !jl.posix.isAbsolute(relative);
}
function Jwm(source) {
  switch (source) {
    case "cliArg":
    case "command":
    case "session":
    case "toolsNarrowing":
    case "mcpServerPolicy":
      return hs(gr());
    case "userSettings":
    case "policySettings":
    case "projectSettings":
    case "localSettings":
    case "flagSettings":
      return nNe(source);
  }
}
function wOo(relativePart) {
  return jl.posix.join(Xue, relativePart);
}
function Xwm({
  patternRoot: patternRoot,
  pattern: pattern,
  rootPath: rootPath
}) {
  let joinedPattern = jl.posix.join(patternRoot, pattern),
    foldedPatternRoot = normalizeCaseForComparison(patternRoot),
    foldedRootPath = normalizeCaseForComparison(rootPath);
  if (foldedPatternRoot === foldedRootPath) return wOo(pattern);else if (normalizeCaseForComparison(joinedPattern).startsWith(`${foldedRootPath}${Xue}`)) {
    let relativePart = joinedPattern.slice(rootPath.length);
    return wOo(relativePart);
  } else {
    let rootRelative = jl.posix.relative(foldedRootPath, foldedPatternRoot);
    if (!rootRelative || rootRelative.startsWith(`..${Xue}`) || rootRelative === "..") return null;else {
      let rerooted = jl.posix.join(rootRelative, pattern);
      return wOo(rerooted);
    }
  }
}
function h3l(dirPath) {
  if (Yt() !== "windows") return dirPath;
  let normalized = jl.posix.normalize(toPosixPath(dirPath));
  return normalized.length > 1 && normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}
function normalizePatternsToPath(patternsByRoot, targetPath) {
  let result = new Set(patternsByRoot.get(null) ?? []),
    normalizedTarget = h3l(targetPath);
  for (let [root, patterns] of patternsByRoot.entries()) {
    if (root === null) continue;
    let normalizedRoot = h3l(root);
    for (let pattern of patterns) {
      let rerooted = Xwm({
        patternRoot: normalizedRoot,
        pattern: pattern,
        rootPath: normalizedTarget
      });
      if (rerooted) result.add(rerooted);
    }
  }
  return Array.from(result);
}
function getFileReadIgnorePatterns(toolPath) {
  let rulesByRoot = A3l(toolPath, "read", "deny"),
    result = new Map();
  for (let [root, ruleMap] of rulesByRoot.entries()) result.set(root, Array.from(ruleMap.keys()));
  return result;
}
function patternWithRoot(pattern, source) {
  if (Yt() === "windows" && (pattern.startsWith("~\\") || pattern.startsWith("\\") && pattern[1] !== "!" && pattern[1] !== "#")) pattern = pattern.replaceAll("\\", "/");
  if (pattern.startsWith(`${Xue}${Xue}`)) {
    let stripped = pattern.slice(1);
    if (Yt() === "windows" && stripped.match(/^\/[a-z]\//i)) {
      let driveLetter = stripped[1]?.toUpperCase() ?? "C",
        afterDrive = stripped.slice(2),
        driveRoot = `${driveLetter}:\\`;
      return {
        relativePattern: afterDrive.startsWith("/") ? afterDrive : "/" + afterDrive,
        root: driveRoot
      };
    }
    return {
      relativePattern: stripped,
      root: Xue
    };
  } else if (Yt() === "windows" && pattern.match(/^[A-Za-z]:[/\\]/)) {
    let driveLetter = pattern[0].toUpperCase(),
      afterDrive = pattern.slice(2).replaceAll("\\", "/");
    return {
      relativePattern: afterDrive.startsWith("/") ? afterDrive : "/" + afterDrive,
      root: `${driveLetter}:\\`
    };
  } else if (pattern.startsWith(`~${Xue}`)) return {
    relativePattern: pattern.slice(1),
    root: fKt.homedir().normalize("NFC")
  };else if (pattern.startsWith(Xue)) return {
    relativePattern: pattern,
    root: Jwm(source)
  };
  let relativePattern = pattern;
  if (pattern.startsWith(`.${Xue}`)) relativePattern = pattern.slice(2);
  return {
    relativePattern: relativePattern,
    root: null
  };
}
function A3l(toolPath, ruleKind, behavior) {
  let toolName = (() => {
      switch (ruleKind) {
        case "edit":
          return fa;
        case "read":
          return vs;
      }
    })(),
    rules = Ute(toolPath, toolName, behavior),
    byRoot = new Map();
  for (let [rulePattern, rule] of rules.entries()) {
    let {
        relativePattern: relativePattern,
        root: root
      } = patternWithRoot(rulePattern, rule.source),
      cleanedPattern = relativePattern.replace(/\/{2,}/g, "/"),
      rootRules = byRoot.get(root);
    if (rootRules === undefined) rootRules = new Map(), byRoot.set(root, rootRules);
    rootRules.set(cleanedPattern, rule);
  }
  return byRoot;
}
function matchingRuleForInput(inputPath, toolPath, ruleKind, behavior) {
  let resolvedPath = hs(inputPath);
  if (Yt() === "windows" && resolvedPath.includes("\\")) resolvedPath = Qx(resolvedPath);
  let rulesByRoot = A3l(toolPath, ruleKind, behavior),
    caseFoldRoots = Yt() === "windows" && behavior !== "allow",
    pathForMatch = resolvedPath ?? Lt(),
    foldedPath = caseFoldRoots ? normalizeCaseForComparison(pathForMatch) : pathForMatch;
  for (let [root, ruleMap] of rulesByRoot.entries()) {
    let cleanedPatterns = Array.from(ruleMap.keys()).map(rulePattern => {
        let pattern = rulePattern;
        if (pattern.endsWith("/**")) {
          let base = pattern.slice(0, -3);
          pattern = /[^/]/.test(base) ? base : "/**";
        }
        return pattern;
      }),
      ignoreMatcher = kOo.default().add(cleanedPatterns),
      rootForMatch = root ?? Lt(),
      relative = relativePath(caseFoldRoots ? normalizeCaseForComparison(rootForMatch) : rootForMatch, foldedPath);
    if (!relative || relative === ".." || relative.startsWith(`..${Xue}`)) continue;
    let testResult = ignoreMatcher.test(relative);
    if (testResult.ignored && testResult.rule) {
      let matchedPattern = testResult.rule.pattern,
        recursivePattern = matchedPattern + "/**";
      if (ruleMap.has(recursivePattern)) return ruleMap.get(recursivePattern) ?? null;
      return ruleMap.get(matchedPattern) ?? null;
    }
  }
  return null;
}
function matchesPathRule(pattern, targetPath) {
  let resolvedTarget = hs(targetPath);
  if (Yt() === "windows" && resolvedTarget.includes("\\")) resolvedTarget = Qx(resolvedTarget);
  let {
      relativePattern: relativePattern,
      root: root
    } = patternWithRoot(pattern, "session"),
    cleanedPattern = relativePattern.replace(/\/{2,}/g, "/");
  if (cleanedPattern.endsWith("/**")) {
    let base = cleanedPattern.slice(0, -3);
    cleanedPattern = /[^/]/.test(base) ? base : "/**";
  }
  let isWindows = Yt() === "windows",
    rootForMatch = root ?? Lt(),
    relative = relativePath(isWindows ? normalizeCaseForComparison(rootForMatch) : rootForMatch, isWindows ? normalizeCaseForComparison(resolvedTarget) : resolvedTarget);
  if (relative && relative !== ".." && !relative.startsWith("../") && kOo.default().add(cleanedPattern).test(relative).ignored) return true;
  let trimmedPattern = pattern.trim(),
    looksLikeCommand = !wzr(trimmedPattern) && !trimmedPattern.endsWith(":*");
  if (trimmedPattern.startsWith("*") || looksLikeCommand) return TW(pattern, targetPath);
  return false;
}
function normalizeTrustedSymlink(inputPath) {
  for (let [canonical, target] of Qwm()) if (inputPath === canonical || inputPath.startsWith(canonical + jl.sep)) return target + inputPath.slice(canonical.length);
  return inputPath;
}
function Zwm(pattern) {
  return !!pattern && (pattern.startsWith(cEn.slice(0, -2)) || pattern.startsWith(uEn.slice(0, -2))) && !pattern.includes("..") && pattern.endsWith("/**");
}
function matchingAllowRuleForAllPaths(paths, toolPath, ruleKind) {
  let commonRule = null;
  for (let path of paths) {
    let rule = matchingRuleForInput(path, toolPath, ruleKind, "allow");
    if (!rule) {
      let normalized = normalizeTrustedSymlink(path);
      if (normalized !== path) rule = matchingRuleForInput(normalized, toolPath, ruleKind, "allow");
    }
    if (!rule) return null;
    commonRule ??= rule;
  }
  return commonRule;
}
function checkReadNetworkPathSafety(tool, toolInput, context, candidatePaths) {
  if (typeof tool.getPath !== "function") return null;
  let toolPath = tool.getPath(toolInput),
    resolvedPaths = candidatePaths ?? d0(toolPath),
    trustedDirSets = context.trustedNetworkDirectories;
  for (let candidate of resolvedPaths) if (lu(candidate) && !Cf(candidate) && !mKt(candidate, trustedDirSets)) return {
    behavior: "ask",
    message: `Claude requested permissions to read from ${toolPath}, which appears to be a UNC path that could access network resources.`,
    decisionReason: {
      type: "other",
      reason: "UNC path detected (defense-in-depth check)"
    }
  };
  if (tool.name === su) {
    let globPattern = toolInput.pattern;
    if (typeof globPattern === "string" && lu(globPattern) && !Cf(globPattern) && !mKt(globPattern, trustedDirSets)) return {
      behavior: "ask",
      message: `Claude requested permissions to glob ${globPattern}, which appears to be a UNC pattern that could access network resources.`,
      decisionReason: {
        type: "other",
        reason: "UNC glob pattern detected (defense-in-depth check)"
      }
    };
  }
  for (let candidate of resolvedPaths) if (FXn(candidate, trustedDirSets)) return {
    behavior: "ask",
    message: `Claude requested permissions to read from ${toolPath}, which contains a suspicious Windows path pattern that requires manual approval.`,
    decisionReason: {
      type: "other",
      reason: "Path contains suspicious Windows-specific patterns (alternate data streams, short names, long path prefixes, or three or more consecutive dots) that require manual verification"
    }
  };
  return null;
}
function checkReadPermissionForTool(tool, toolInput, context) {
  if (typeof tool.getPath !== "function") return {
    behavior: "ask",
    message: `Claude requested permissions to use ${tool.name}, but you haven't granted it yet.`
  };
  let toolPath = tool.getPath(toolInput),
    resolvedPaths = d0(toolPath),
    networkSafety = checkReadNetworkPathSafety(tool, toolInput, context, resolvedPaths);
  if (networkSafety) return networkSafety;
  for (let candidate of resolvedPaths) {
    let denyRule = matchingRuleForInput(candidate, context, "read", "deny");
    if (denyRule) return {
      behavior: "deny",
      message: `Permission to read ${toolPath} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: denyRule
      }
    };
  }
  for (let candidate of resolvedPaths) {
    let askRule = matchingRuleForInput(candidate, context, "read", "ask");
    if (askRule) return {
      behavior: "ask",
      message: `Claude requested permissions to read from ${toolPath}, but you haven't granted it yet.`,
      decisionReason: {
        type: "rule",
        rule: askRule
      }
    };
  }
  let writeContext = context.mode === "plan" ? {
      ...context,
      mode: "default"
    } : context,
    writeDecision = checkWritePermissionForTool(tool, toolInput, writeContext, resolvedPaths);
  if (writeDecision.behavior === "allow") return writeDecision;
  if (pathInAllowedWorkingPath(toolPath, context, resolvedPaths)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "mode",
      mode: "default"
    }
  };
  let resolvedPath = hs(toolPath),
    internalDecision = checkReadableInternalPath(resolvedPath, toolInput, resolvedPaths);
  if (internalDecision.behavior !== "passthrough") return internalDecision;
  let allowRule = matchingAllowRuleForAllPaths(resolvedPaths, context, "read");
  if (allowRule) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "rule",
      rule: allowRule
    }
  };
  return {
    behavior: "ask",
    message: `Claude requested permissions to read from ${toolPath}, but you haven't granted it yet.`,
    suggestions: generateSuggestions(toolPath, "read", context, resolvedPaths),
    decisionReason: {
      type: "workingDir",
      reason: "Path is outside allowed working directories"
    }
  };
}
function checkWritePermissionForTool(tool, toolInput, context, candidatePaths) {
  if (typeof tool.getPath !== "function") return {
    behavior: "ask",
    message: `Claude requested permissions to use ${tool.name}, but you haven't granted it yet.`
  };
  let toolPath = tool.getPath(toolInput),
    resolvedPaths = candidatePaths ?? d0(toolPath);
  for (let candidate of resolvedPaths) {
    let denyRule = matchingRuleForInput(candidate, context, "edit", "deny");
    if (denyRule) return {
      behavior: "deny",
      message: `Permission to edit ${toolPath} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: denyRule
      }
    };
  }
  let resolvedPath = hs(toolPath);
  if (Y7(resolvedPath) && Kx()) return {
    behavior: "deny",
    message: "Cannot write to memory while it is paused. Run /pause-memory to resume automemory.",
    decisionReason: {
      type: "safetyCheck",
      reason: HOo,
      classifierApprovable: false
    }
  };
  let sessionAllowRules = (context.alwaysAllowRules.session ?? []).filter(rule => {
      let ruleContent = Jf(rule).ruleContent;
      return Zwm(ruleContent) && !resolvedPaths.some(path => jwm(path, ruleContent ?? ""));
    }),
    sessionAllowRule = sessionAllowRules.length > 0 ? matchingAllowRuleForAllPaths(resolvedPaths, {
      ...context,
      alwaysAllowRules: {
        session: sessionAllowRules
      }
    }, "edit") : null;
  if (sessionAllowRule && context.mode !== "plan" && !resolvedPaths.some(path => FXn(path, context.trustedNetworkDirectories)) && !resolvedPaths.some(path => f3l(path) > 1)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "rule",
      rule: sessionAllowRule
    }
  };
  for (let candidate of resolvedPaths) {
    let askRule = matchingRuleForInput(candidate, context, "edit", "ask");
    if (askRule) return {
      behavior: "ask",
      message: `Claude requested permissions to write to ${toolPath}, but you haven't granted it yet.`,
      decisionReason: {
        type: "rule",
        rule: askRule
      }
    };
  }
  let internalDecision = checkEditableInternalPath(resolvedPath, toolInput, resolvedPaths);
  if (internalDecision.behavior !== "passthrough") return internalDecision;
  let safety = checkPathSafetyForAutoEdit(toolPath, resolvedPaths, undefined, context.isRemoteMode, context.trustedNetworkDirectories);
  if (!safety.safe) {
    let skillScope = resolvedPaths.some(path => f3l(path) > 1 || FXn(path, context.trustedNetworkDirectories)) ? null : getClaudeSkillScope(toolPath),
      suggestions = skillScope ? [{
        type: "addRules",
        rules: [{
          toolName: fa,
          ruleContent: skillScope.pattern
        }],
        behavior: "allow",
        destination: "session"
      }] : generateSuggestions(toolPath, "write", context, resolvedPaths);
    return {
      behavior: "ask",
      message: safety.message,
      suggestions: suggestions,
      decisionReason: {
        type: "safetyCheck",
        reason: safety.message,
        classifierApprovable: safety.classifierApprovable
      }
    };
  }
  if (context.mode === "plan") return {
    behavior: "ask",
    message: `Cannot write to ${toolPath} while in plan mode.`,
    decisionReason: {
      type: "mode",
      mode: "plan"
    }
  };
  let inWorkingDir = pathInAllowedWorkingPath(toolPath, context, resolvedPaths);
  if (context.mode === "acceptEdits" && inWorkingDir) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "mode",
      mode: context.mode
    }
  };
  let allowRule = matchingAllowRuleForAllPaths(resolvedPaths, context, "edit");
  if (allowRule) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "rule",
      rule: allowRule
    }
  };
  return {
    behavior: "ask",
    message: `Claude requested permissions to write to ${toolPath}, but you haven't granted it yet.`,
    suggestions: generateSuggestions(toolPath, "write", context, resolvedPaths),
    decisionReason: !inWorkingDir ? {
      type: "workingDir",
      reason: "Path is outside allowed working directories"
    } : undefined
  };
}
function generateSuggestions(toolPath, action, context, candidatePaths) {
  let outsideWorkingDir = !pathInAllowedWorkingPath(toolPath, context, candidatePaths);
  if (action === "read" && outsideWorkingDir) {
    let parentDir = VN(toolPath);
    return d0(parentDir).map(dir => r9e(dir, "session")).filter(suggestion => suggestion !== undefined);
  }
  let prePlanBypass = context.mode === "plan" && (context.prePlanMode === "auto" || context.prePlanMode === "bypassPermissions" || context.prePlanMode === "acceptEdits" || context.prePlanMode === "dontAsk"),
    canSetAcceptEdits = (context.mode === "default" || context.mode === "plan") && !prePlanBypass;
  if (action === "write" || action === "create") {
    let suggestions = canSetAcceptEdits ? [{
      type: "setMode",
      mode: "acceptEdits",
      destination: "session"
    }] : [];
    if (outsideWorkingDir) {
      let parentDir = VN(toolPath),
        dirs = d0(parentDir);
      suggestions.push({
        type: "addDirectories",
        directories: dirs,
        destination: "session"
      });
    }
    return suggestions;
  }
  return canSetAcceptEdits ? [{
    type: "setMode",
    mode: "acceptEdits",
    destination: "session"
  }] : [];
}
function ekm(inputPath) {
  for (let baseDir of [Lt(), gr(), ic(), or(), zse(), fKt.homedir()]) for (let resolved of getResolvedWorkingDirPaths(baseDir)) {
    if (resolved === baseDir) continue;
    if (inputPath === resolved || inputPath.startsWith(resolved + jl.sep)) return baseDir + inputPath.slice(resolved.length);
  }
  return normalizeTrustedSymlink(inputPath);
}
function R3l(paths, check, toolInput) {
  let commonDecision;
  for (let path of paths) {
    let decision = check(path, toolInput);
    if (decision.behavior === "passthrough") {
      let rewritten = ekm(path);
      if (rewritten !== path) decision = check(rewritten, toolInput);
    }
    if (decision.behavior === "deny") return decision;
    if (decision.behavior !== "allow") return {
      behavior: "passthrough",
      message: ""
    };
    commonDecision ??= decision;
  }
  return commonDecision ?? {
    behavior: "passthrough",
    message: ""
  };
}
function untypeDenyReasonForAskPropagation(decisionReason) {
  if (decisionReason?.type !== "safetyCheck") return decisionReason;
  return {
    type: "other",
    reason: decisionReason.reason
  };
}
function checkEditableInternalPath(filePath, toolInput, candidatePaths) {
  if (candidatePaths && candidatePaths.length > 0) return R3l(candidatePaths, checkEditableInternalPath, toolInput);
  let normalized = jl.normalize(filePath);
  if (S3l(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Plan files for current session are allowed for writing"
    }
  };
  if (Gwm(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Workflow script files for current session are allowed for writing"
    }
  };
  if (b3l(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Scratchpad files for current session are allowed for writing"
    }
  };
  if (E3l(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Job tmp/ subtree for current bg session is allowed for writing"
    }
  };
  if (normalized.endsWith(".md") && PUe(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Agent memory files are allowed for writing"
    }
  };
  if (Y7(normalized) && Kx()) return {
    behavior: "deny",
    message: "Cannot write to memory while it is paused. Run /pause-memory to resume automemory.",
    decisionReason: {
      type: "safetyCheck",
      reason: HOo,
      classifierApprovable: false
    }
  };
  if (!Abn() && normalized.endsWith(".md") && oDt(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "auto memory files are allowed for writing"
    }
  };
  if (normalized === jl.join(gr(), ".claude", "launch.json")) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Preview launch config is allowed for writing"
    }
  };
  return {
    behavior: "passthrough",
    message: ""
  };
}
function checkReadableInternalPath(filePath, toolInput, candidatePaths) {
  if (candidatePaths && candidatePaths.length > 0) return R3l(candidatePaths, checkReadableInternalPath, toolInput);
  let normalized = jl.normalize(filePath);
  if (Y7(normalized) && Kx()) return {
    behavior: "deny",
    message: "Cannot read memory while it is paused. Run /pause-memory to resume automemory.",
    decisionReason: {
      type: "safetyCheck",
      reason: HOo,
      classifierApprovable: false
    }
  };
  if (Vwm(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Project directory files are allowed for reading"
    }
  };
  if (S3l(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Plan files for current session are allowed for reading"
    }
  };
  let toolResultDir = Bae(),
    toolResultPrefix = toolResultDir.endsWith(jl.sep) ? toolResultDir : toolResultDir + jl.sep;
  if (normalized === toolResultDir || normalized.startsWith(toolResultPrefix)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Tool result files are allowed for reading"
    }
  };
  if (b3l(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Scratchpad files for current session are allowed for reading"
    }
  };
  if (E3l(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Job tmp/ subtree for current bg session is allowed for reading"
    }
  };
  let projectTempDir = getProjectTempDir();
  if (normalized.startsWith(projectTempDir)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Project temp directory files are allowed for reading"
    }
  };
  if (PUe(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Agent memory files are allowed for reading"
    }
  };
  if (oDt(normalized)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "auto memory files are allowed for reading"
    }
  };
  let tasksPrefix = jl.join(or(), "tasks") + jl.sep;
  if (normalized === tasksPrefix.slice(0, -1) || normalized.startsWith(tasksPrefix)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Task files are allowed for reading"
    }
  };
  let teamsPrefix = jl.join(or(), "teams") + jl.sep;
  if (normalized === teamsPrefix.slice(0, -1) || normalized.startsWith(teamsPrefix)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Team files are allowed for reading"
    }
  };
  let bundledSkillsPrefix = getBundledSkillsRoot() + jl.sep;
  if (normalized.startsWith(bundledSkillsPrefix)) return {
    behavior: "allow",
    updatedInput: toolInput,
    decisionReason: {
      type: "other",
      reason: "Bundled skill reference files are allowed for reading"
    }
  };
  return {
    behavior: "passthrough",
    message: ""
  };
}
var g3l,
  kOo,
  fKt,
  jl,
  HOo = "memory access blocked by /pause-memory",
  DANGEROUS_FILES,
  DANGEROUS_FILES_LC,
  DANGEROUS_DIRECTORIES,
  DANGEROUS_DIRECTORY_PATHS,
  Xue,
  getClaudeTempDir,
  getChildProcessTmpDir,
  getBundledSkillsRoot,
  zwm,
  getResolvedWorkingDirPaths,
  Qwm;
var Xm = b(() => {
  Wi();
  Jm();
  rz();
  ry();
  oz();
  lt();
  jn();
  dm();
  ow();
  zf();
  Po();
  dn();
  ps();
  Tu();
  Dw();
  Es();
  D_();
  wm();
  ZEe();
  fCe();
  br();
  sae();
  UR();
  HI();
  r2();
  Sbn();
  Sw();
  gA();
  ly();
  o9e();
  g3l = require("crypto"), kOo = x(wUe(), 1), fKt = require("os"), jl = require("path"), DANGEROUS_FILES = [".gitconfig", ".gitmodules", ".bashrc", ".bash_profile", ".zshrc", ".zprofile", ".profile", ".zshenv", ".zlogin", ".zlogout", ".bash_login", ".bash_aliases", ".bash_logout", ".envrc", ".ripgreprc", ".mcp.json", ".claude.json", ".npmrc", ".yarnrc", ".yarnrc.yml", ".pnp.cjs", ".pnp.loader.mjs", ".pnpmfile.cjs", "bunfig.toml", ".bunfig.toml", ".bazelrc", ".bazelversion", ".bazeliskrc", ".pre-commit-config.yaml", "lefthook.yml", ".lefthook.yml", "lefthook.yaml", ".lefthook.yaml", "gradle-wrapper.properties", "maven-wrapper.properties", ".devcontainer.json", "pyrightconfig.json"], DANGEROUS_FILES_LC = new Set(DANGEROUS_FILES.map(e => e.toLowerCase())), DANGEROUS_DIRECTORIES = [".git", ".vscode", ".idea", ".claude", ".husky", ".cargo", ".devcontainer", ".yarn", ".mvn"], DANGEROUS_DIRECTORY_PATHS = [".config/git"];
  Xue = jl.posix.sep;
  getClaudeTempDir = Hn(function () {
    let t = hE(),
      n = Wt(),
      r = t;
    try {
      r = n.realpathSync(t);
    } catch {}
    return r + jl.sep;
  }), getChildProcessTmpDir = Hn(function () {
    let t = bet(),
      n = Wt(),
      r = t;
    try {
      r = n.realpathSync(t);
    } catch {}
    return r + jl.sep;
  }), getBundledSkillsRoot = Hn(function () {
    let t = g3l.randomBytes(16).toString("hex");
    return jl.join(getClaudeTempDir(), "bundled-skills", {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION, t);
  });
  zwm = Hn(function (t) {
    try {
      return jl.join(getProjectTempDir(), t, "scratchpad");
    } catch {
      return null;
    }
  });
  getResolvedWorkingDirPaths = Hn(d0);
  Qwm = Hn(function () {
    let t = [["/private/tmp", "/tmp"], ["/private/var", "/var"], ["/private/etc", "/etc"], ["/usr/bin", "/bin"], ["/usr/lib", "/lib"], ["/usr/sbin", "/sbin"]],
      n = new Map(),
      r = Wt();
    for (let [o, s] of t) try {
      if (r.realpathSync(s) === o) n.set(o, s);
    } catch {}
    return n;
  });
});

export {A3i,normalizeCaseForComparison as Lf,getClaudeSkillScope,relativePath,toPosixPath,qwm,isClaudeSettingsPath,Wwm,S3l,Gwm,Vwm,isScratchpadEnabled,getClaudeTempDirName,getProjectTempDir,getScratchpadDir,ensureScratchpadDir,b3l,E3l,mKt,isUntrustedUncPath,C3l,f3l,jwm,Ywm,FXn,checkPathSafetyForAutoEdit,allWorkingDirectories,pathInAllowedWorkingPath,pathInWorkingPath,Jwm,wOo,Xwm,h3l,normalizePatternsToPath,getFileReadIgnorePatterns,patternWithRoot,A3l,matchingRuleForInput,matchesPathRule,normalizeTrustedSymlink,Zwm,matchingAllowRuleForAllPaths,checkReadNetworkPathSafety,checkReadPermissionForTool,checkWritePermissionForTool,generateSuggestions,ekm,R3l,untypeDenyReasonForAskPropagation,checkEditableInternalPath,checkReadableInternalPath,g3l,kOo,fKt,jl,HOo,DANGEROUS_FILES,DANGEROUS_FILES_LC,DANGEROUS_DIRECTORIES,DANGEROUS_DIRECTORY_PATHS,Xue,getClaudeTempDir,getChildProcessTmpDir,getBundledSkillsRoot,zwm,getResolvedWorkingDirPaths,Qwm,Xm};
