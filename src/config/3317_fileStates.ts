// @ts-nocheck
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {findGitRoot as cu,findCanonicalGitRoot as zm,gitExe as go,ia} from "../../vendor/m698.ts";
import {getOriginalCwd as gr,getSessionId as It,lt} from "../session/0132_sent.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Pfa,zeo} from "../../vendor/m3315.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {b} from "../../runtime.ts";
import {VP,getRemoteUrlForDir as _Rt} from "../../vendor/m696.ts";
import {Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {fje} from "../../vendor/m621.ts";
// @ts-nocheck
/** Returns true if the given git remote URL points to a known-internal (Anthropic) repo host. */
function vQd(url) {
  if (!/^https?:\/\//.test(url) && !/^ssh:\/\//.test(url) && !/^git@/.test(url)) return !1;
  let normalized = url.replace(/^https?:\/\//, "").replace(/^ssh:\/\//, "").replace(/^[^@/]+@/, "").replace(/\/$/, "");
  if (normalized.split("/").includes("..")) return !1;
  return RQd.some(host => {
    if (!normalized.startsWith(host)) return !1;
    let rest = normalized.slice(host.length);
    return rest === "" || rest === ".git" || rest.startsWith("/");
  });
}
/** Resolves the active git root, falling back to the original cwd. */
function mIe() {
  let cwd = Lt();
  return cu(cwd) ?? gr();
}
/** Canonicalizes a git remote URL, falling back to the input if unknown. */
function wQd(url) {
  return zm(url) ?? url;
}
/** Maps a model id substring to a coarse Claude model family label. */
function Nfa(modelId: string): string {
  if (modelId.includes("fable-5")) return "claude-fable-5";
  if (modelId.includes("mythos-5")) return "claude-mythos-5";
  if (modelId.includes("opus-4-8")) return "claude-opus-4-8";
  if (modelId.includes("opus-4-7")) return "claude-opus-4-7";
  if (modelId.includes("opus-4-6")) return "claude-opus-4-6";
  if (modelId.includes("opus-4-5")) return "claude-opus-4-5";
  if (modelId.includes("opus-4-1")) return "claude-opus-4-1";
  if (modelId.includes("opus-4")) return "claude-opus-4";
  if (modelId.includes("sonnet-4-6")) return "claude-sonnet-4-6";
  if (modelId.includes("sonnet-4-5")) return "claude-sonnet-4-5";
  if (modelId.includes("sonnet-4")) return "claude-sonnet-4";
  if (modelId.includes("sonnet-3-7")) return "claude-sonnet-3-7";
  if (modelId.includes("haiku-4-5")) return "claude-haiku-4-5";
  if (modelId.includes("haiku-3-5")) return "claude-haiku-3-5";
  return "claude";
}
/** Returns the current CLI entrypoint surface ("cli" by default). */
function Ffa(): string {
  return process.env.CLAUDE_CODE_ENTRYPOINT ?? "cli";
}
/** Computes the hex sha256 of the given content. */
function kQd(content: string): string {
  return Lfa.createHash("sha256").update(content).digest("hex");
}
/** Converts an absolute path to a project-root-relative POSIX path, resolving symlinks. */
function hOn(filePath: string): string {
  let fs = Wt(),
    gitRoot = mIe();
  if (!Pj.isAbsolute(filePath)) return filePath;
  let realFilePath = filePath,
    realGitRoot = gitRoot;
  try {
    realFilePath = fs.realpathSync(filePath);
  } catch {}
  try {
    realGitRoot = fs.realpathSync(gitRoot);
  } catch {}
  if (realFilePath.startsWith(realGitRoot + Pj.sep) || realFilePath === realGitRoot) return Pj.relative(realGitRoot, realFilePath).replaceAll(Pj.sep, "/");
  if (filePath.startsWith(gitRoot + Pj.sep) || filePath === gitRoot) return Pj.relative(gitRoot, filePath).replaceAll(Pj.sep, "/");
  return filePath;
}
/** Creates an empty file-attribution tracking state. */
function Yit() {
  return {
    fileStates: new Map(),
    surface: Ffa(),
    startingHeadSha: null,
    promptCount: 0,
    promptCountAtLastCommit: 0,
    permissionPromptCount: 0,
    permissionPromptCountAtLastCommit: 0,
    escapeCount: 0,
    escapeCountAtLastCommit: 0,
    verificationMethods: []
  };
}
/** Computes a new per-file attribution entry given old/new content, summing the changed-char delta into Claude's contribution. */
function Bfa(fileStates, filePath, oldContent, newContent, mtime) {
  let relPath = hOn(filePath);
  try {
    let changedChars;
    if (oldContent === "" || newContent === "") changedChars = oldContent === "" ? newContent.length : oldContent.length;else {
      let minLen = Math.min(oldContent.length, newContent.length),
        prefix = 0;
      while (prefix < minLen && oldContent[prefix] === newContent[prefix]) prefix++;
      let suffix = 0;
      while (suffix < minLen - prefix && oldContent[oldContent.length - 1 - suffix] === newContent[newContent.length - 1 - suffix]) suffix++;
      let oldMiddle = oldContent.length - prefix - suffix,
        newMiddle = newContent.length - prefix - suffix;
      changedChars = Math.max(oldMiddle, newMiddle);
    }
    let priorContribution = fileStates.get(relPath)?.claudeContribution ?? 0;
    return {
      contentHash: kQd(newContent),
      claudeContribution: priorContribution + changedChars,
      mtime
    };
  } catch (err) {
    return Ie(err), null;
  }
}
/** Records a single edit into the attribution state, returning an updated state. */
function HQd(state, filePath, oldContent, newContent, userModified, mtime = Date.now()) {
  let relPath = hOn(filePath),
    entry = Bfa(state.fileStates, filePath, oldContent, newContent, mtime);
  if (!entry) return state;
  let fileStates = new Map(state.fileStates);
  return fileStates.set(relPath, entry), A(`Attribution: Tracked ${entry.claudeContribution} chars for ${relPath}`), {
    ...state,
    fileStates
  };
}
/** Records a batch of changes (edits and deletions) into the attribution state. */
function IQd(state, changes) {
  let fileStates = new Map(state.fileStates);
  for (let change of changes) {
    let mtime = change.mtime ?? Date.now();
    if (change.type === "deleted") {
      let relPath = hOn(change.path),
        priorContribution = fileStates.get(relPath)?.claudeContribution ?? 0,
        removedChars = change.oldContent.length;
      fileStates.set(relPath, {
        contentHash: "",
        claudeContribution: priorContribution + removedChars,
        mtime
      }), A(`Attribution: Tracked deletion of ${relPath} (${removedChars} chars removed, total contribution: ${priorContribution + removedChars})`);
    } else {
      let entry = Bfa(fileStates, change.path, change.oldContent, change.newContent, mtime);
      if (entry) {
        let relPath = hOn(change.path);
        fileStates.set(relPath, entry), A(`Attribution: Tracked ${entry.claudeContribution} chars for ${relPath}`);
      }
    }
  }
  return {
    ...state,
    fileStates
  };
}
/** Reducer applying an attribution action to the tracking state. */
function _On(state, action) {
  switch (action.kind) {
    case "trackEdit":
      return HQd({
        ...state,
        surface: action.surface
      }, action.filePath, action.oldContent, action.newContent, action.userModified, action.mtime);
    case "trackBulk":
      return IQd({
        ...state,
        surface: action.surface
      }, action.changes);
    case "commitBoundary":
      return {
        ...state,
        promptCountAtLastCommit: action.promptCountAtLastCommit,
        permissionPromptCountAtLastCommit: action.permissionPromptCountAtLastCommit,
        escapeCountAtLastCommit: action.escapeCountAtLastCommit
      };
    case "incrementPermissionPrompt":
      return {
        ...state,
        permissionPromptCount: state.permissionPromptCount + 1
      };
    case "recordVerification":
      if (state.verificationMethods.includes(action.method)) return state;
      return {
        ...state,
        verificationMethods: [...state.verificationMethods, action.method]
      };
  }
}
/** Aggregates attribution states across sessions and computes a Claude-vs-human contribution report for the given files. */
async function Yeo(states, files, options = {
  staged: !0
}) {
  let gitRoot = mIe(),
    sessionId = It(),
    fileReport = {},
    excludedGenerated = [],
    surfaceSet = new Set(),
    surfaceClaudeChars = {},
    totalClaudeChars = 0,
    totalHumanChars = 0,
    mergedFileStates = new Map();
  for (let state of states) {
    surfaceSet.add(state.surface);
    let stateFileStates = state.fileStates instanceof Map ? state.fileStates : new Map(Object.entries(state.fileStates ?? {}));
    for (let [relPath, entry] of stateFileStates) {
      let existing = mergedFileStates.get(relPath);
      if (existing) mergedFileStates.set(relPath, {
        ...entry,
        claudeContribution: existing.claudeContribution + entry.claudeContribution
      });else mergedFileStates.set(relPath, entry);
    }
  }
  let results = await Promise.all(files.map(async file => {
    if (await Pfa(file, gitRoot)) return {
      type: "generated",
      file
    };
    let absPath = Pj.join(gitRoot, file),
      entry = mergedFileStates.get(file),
      surface = states[0].surface,
      claudeChars = 0,
      humanChars = 0;
    if (await xQd(file)) {
      if (entry) claudeChars = entry.claudeContribution, humanChars = 0;else {
        let diffChars = await Ofa(file, options);
        humanChars = diffChars > 0 ? diffChars : 100;
      }
    } else try {
      let stat = await Mfa.stat(absPath);
      if (entry) claudeChars = entry.claudeContribution, humanChars = 0;else {
        let diffChars = await Ofa(file, options);
        humanChars = diffChars > 0 ? diffChars : stat.size;
      }
    } catch {
      return null;
    }
    claudeChars = Math.max(0, claudeChars), humanChars = Math.max(0, humanChars);
    let totalChars = claudeChars + humanChars,
      percent = totalChars > 0 ? Math.round(claudeChars / totalChars * 100) : 0;
    return {
      type: "file",
      file,
      claudeChars,
      humanChars,
      percent,
      surface
    };
  }));
  for (let result of results) {
    if (!result) continue;
    if (result.type === "generated") {
      excludedGenerated.push(result.file);
      continue;
    }
    fileReport[result.file] = {
      claudeChars: result.claudeChars,
      humanChars: result.humanChars,
      percent: result.percent,
      surface: result.surface
    }, totalClaudeChars += result.claudeChars, totalHumanChars += result.humanChars, surfaceClaudeChars[result.surface] = (surfaceClaudeChars[result.surface] ?? 0) + result.claudeChars;
  }
  let grandTotal = totalClaudeChars + totalHumanChars,
    claudePercent = grandTotal > 0 ? Math.round(totalClaudeChars / grandTotal * 100) : 0,
    surfaceBreakdown = {};
  for (let [surface, claudeChars] of Object.entries(surfaceClaudeChars)) {
    let percent = grandTotal > 0 ? Math.round(claudeChars / grandTotal * 100) : 0;
    surfaceBreakdown[surface] = {
      claudeChars,
      percent
    };
  }
  return {
    version: 1,
    summary: {
      claudePercent,
      claudeChars: totalClaudeChars,
      humanChars: totalHumanChars,
      surfaces: Array.from(surfaceSet)
    },
    files: fileReport,
    surfaceBreakdown,
    excludedGenerated,
    sessions: [sessionId]
  };
}
/** Estimates human-authored chars for a file from its staged/working git diff stat (insertions+deletions weighted). */
async function Ofa(file, options = {
  staged: !0
}) {
  let gitRoot = mIe();
  try {
    let args = ["diff"];
    if (options.staged) args.push("--cached");
    args.push("--stat", "--", file);
    let result = await Wr(go(), args, {
      cwd: gitRoot,
      timeout: 5000
    });
    if (result.code !== 0 || !result.stdout) return 0;
    let lines = result.stdout.split(`
`).filter(Boolean),
      chars = 0;
    for (let line of lines) if (line.includes("file changed") || line.includes("files changed")) {
      let insertMatch = line.match(/(\d+) insertions?/),
        deleteMatch = line.match(/(\d+) deletions?/),
        insertions = insertMatch ? parseInt(insertMatch[1], 10) : 0,
        deletions = deleteMatch ? parseInt(deleteMatch[1], 10) : 0;
      chars += (insertions + deletions) * 40;
    }
    return chars;
  } catch {
    return 0;
  }
}
/** Returns true if the file is staged as a deletion in git. */
async function xQd(file) {
  let gitRoot = mIe();
  try {
    let result = await Wr(go(), ["diff", "--cached", "--name-status", "--", file], {
      cwd: gitRoot,
      timeout: 5000
    });
    if (result.code === 0 && result.stdout) return result.stdout.trim().startsWith("D\t");
  } catch {}
  return !1;
}
var Lfa, Mfa, Pj, RQd, jeo, gOn;
var UW = b(() => {
  lt();
  Po();
  qe();
  Ii();
  ps();
  zeo();
  VP();
  ia();
  vn();
  Ro();
  Lfa = require("crypto"), Mfa = require("fs/promises"), Pj = require("path"), RQd = [];
  jeo = new Map();
  gOn = fje(async url => {
    let canonical = wQd(url),
      cached = jeo.get(canonical);
    if (cached !== void 0) return cached === "internal";
    let remoteUrl = await _Rt(url);
    if (!remoteUrl) return jeo.set(canonical, "none"), !1;
    let isInternal = vQd(remoteUrl);
    return jeo.set(canonical, isInternal ? "internal" : "external"), isInternal;
  });
});
export {vQd,mIe,wQd,Nfa,Ffa,kQd,hOn,Yit,Bfa,HQd,IQd,_On,Yeo,Ofa,xQd,Lfa,Mfa,Pj,RQd,jeo,gOn,UW};
