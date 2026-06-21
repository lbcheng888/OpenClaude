// @ts-nocheck
import {getIsGit,gitExe,getGitDir,getBranch,getDefaultBranch,findGitRoot,Ba} from "../../vendor/m693.ts";
import {execFileNoThrow,execFileNoThrowWithCwd,oa} from "../../vendor/m684.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {getCachedRepository,ZI} from "../../vendor/m692.ts";
import {tgi,egi,Nyn} from "./2252_level.ts";
import {htn,mc} from "./0645_maxBytes.ts";
import {b} from "../../runtime.ts";
// Get working-tree diff context, falling back to branch diff if no working-tree changes
async function XUa(abortSignal: any): Promise<any> {
  if (!(await getIsGit())) return null;
  if (await ZUa()) return null;
  let headDiff: any = await YUa("HEAD", abortSignal);
  if (headDiff === null) return null;
  if (headDiff.stats.filesCount > Nlo) return {
    ...headDiff,
    hunks: new Map(),
    source: {
      kind: "working-tree"
    }
  };
  let remainingSlots: any = Mlo - headDiff.perFileStats.size;
  if (remainingSlots > 0) {
    let untrackedStats: any = await Rwp(remainingSlots, abortSignal);
    if (untrackedStats) {
      headDiff.stats.filesCount += untrackedStats.size;
      for (let [filePath, fileStat] of untrackedStats) headDiff.perFileStats.set(filePath, fileStat);
    }
  }
  if (headDiff.stats.filesCount > 0) return {
    ...headDiff,
    hunks: new Map(),
    source: {
      kind: "working-tree"
    }
  };
  let branchInfo: any = await wwp(abortSignal);
  if (branchInfo === null) return {
    ...headDiff,
    hunks: new Map(),
    source: {
      kind: "working-tree"
    }
  };
  let baseDiff: any = await YUa(branchInfo.mergeBase, abortSignal);
  if (baseDiff === null || baseDiff.stats.filesCount === 0) return {
    ...headDiff,
    hunks: new Map(),
    source: {
      kind: "working-tree"
    }
  };
  return {
    ...baseDiff,
    hunks: new Map(),
    source: {
      kind: "branch",
      baseBranch: branchInfo.baseBranch,
      baseRef: branchInfo.mergeBase
    }
  };
}
// Get diff stats (shortstat + numstat) against a given ref
async function YUa(ref: any, abortSignal: any): Promise<any> {
  let {
    stdout: shortstatOut,
    code: shortstatCode
  } = await execFileNoThrow(gitExe(), ["--no-optional-locks", "diff", ref, "--shortstat"], {
    timeout: Jct,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (shortstatCode === 0) {
    let parsedShortstat: any = n$n(shortstatOut);
    if (parsedShortstat && parsedShortstat.filesCount > Nlo) return {
      stats: parsedShortstat,
      perFileStats: new Map()
    };
  }
  let {
    stdout: numstatOut,
    code: numstatCode
  } = await execFileNoThrow(gitExe(), ["--no-optional-locks", "diff", ref, "--numstat"], {
    timeout: Jct,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (numstatCode !== 0) return null;
  return Cwp(numstatOut);
}
// Get diff hunks against a ref (default HEAD)
async function QUa(abortSignal: any, ref: any = "HEAD"): Promise<any> {
  if (!(await getIsGit())) return null;
  if (await ZUa()) return null;
  let {
    stdout: shortstatOut,
    code: shortstatCode
  } = await execFileNoThrow(gitExe(), ["--no-optional-locks", "diff", ref, "--shortstat"], {
    timeout: Jct,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (shortstatCode === 0) {
    let parsedShortstat: any = n$n(shortstatOut);
    if (parsedShortstat && parsedShortstat.filesCount > Nlo) return {
      hunks: new Map(),
      skippedLarge: new Set()
    };
  }
  let {
    stdout: diffOut,
    code: diffCode
  } = await execFileNoThrow(gitExe(), ["--no-optional-locks", "diff", ref], {
    timeout: Jct,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (diffCode !== 0) return null;
  return vwp(diffOut);
}
// Parse git diff --numstat output into per-file stats
function Cwp(numstatText: any): any {
  let lines: any = numstatText.trim().split(`
`).filter(Boolean),
    totalAdded: any = 0,
    totalRemoved: any = 0,
    filesCount: any = 0,
    perFileStats: any = new Map();
  for (let line of lines) {
    let cols: any = line.split("\t");
    if (cols.length < 3) continue;
    filesCount++;
    let addedStr: any = cols[0],
      removedStr: any = cols[1],
      filePath: any = cols.slice(2).join("\t"),
      isBinary: any = addedStr === "-" || removedStr === "-",
      linesAdded: any = isBinary ? 0 : parseInt(addedStr ?? "0", 10) || 0,
      linesRemoved: any = isBinary ? 0 : parseInt(removedStr ?? "0", 10) || 0;
    if (totalAdded += linesAdded, totalRemoved += linesRemoved, perFileStats.size < Mlo) perFileStats.set(filePath, {
      added: linesAdded,
      removed: linesRemoved,
      isBinary: isBinary,
      isUntracked: !1
    });
  }
  return {
    stats: {
      filesCount: filesCount,
      linesAdded: totalAdded,
      linesRemoved: totalRemoved
    },
    perFileStats: perFileStats
  };
}
// Parse raw git diff output into a map of file->hunks, skipping large files
function vwp(diffText: any): any {
  let hunksMap: any = new Map(),
    skippedLarge: any = new Set();
  if (!diffText.trim()) return {
    hunks: hunksMap,
    skippedLarge: skippedLarge
  };
  let fileDiffs: any = diffText.split(/^diff --git /m).filter(Boolean);
  for (let fileDiff of fileDiffs) {
    if (hunksMap.size + skippedLarge.size >= Mlo) break;
    let firstNewline: any = fileDiff.indexOf(`
`),
      headerMatch: any = (firstNewline === -1 ? fileDiff : fileDiff.slice(0, firstNewline)).match(/^a\/(.+?) b\/(.+)$/);
    if (!headerMatch) continue;
    let filePath: any = headerMatch[2] ?? headerMatch[1] ?? "";
    if (fileDiff.length > JUa) {
      skippedLarge.add(filePath);
      continue;
    }
    let diffLines: any = fileDiff.split(`
`),
      fileHunks: any = [],
      currentHunk: any = null,
      lineCount: any = 0;
    for (let lineIdx: any = 1; lineIdx < diffLines.length; lineIdx++) {
      let lineText: any = diffLines[lineIdx] ?? "",
        hunkHeaderMatch: any = lineText.match(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
      if (hunkHeaderMatch) {
        if (currentHunk) fileHunks.push(currentHunk);
        currentHunk = {
          oldStart: parseInt(hunkHeaderMatch[1] ?? "0", 10),
          oldLines: parseInt(hunkHeaderMatch[2] ?? "1", 10),
          newStart: parseInt(hunkHeaderMatch[3] ?? "0", 10),
          newLines: parseInt(hunkHeaderMatch[4] ?? "1", 10),
          lines: []
        };
        continue;
      }
      if (lineText.startsWith("index ") || lineText.startsWith("---") || lineText.startsWith("+++") || lineText.startsWith("new file") || lineText.startsWith("deleted file") || lineText.startsWith("old mode") || lineText.startsWith("new mode") || lineText.startsWith("Binary files")) continue;
      if (currentHunk && (lineText.startsWith("+") || lineText.startsWith("-") || lineText.startsWith(" ") || lineText === "")) {
        if (lineCount >= Ewp) continue;
        currentHunk.lines.push("" + lineText), lineCount++;
      }
    }
    if (currentHunk) fileHunks.push(currentHunk);
    if (fileHunks.length > 0) hunksMap.set(filePath, fileHunks);
  }
  return {
    hunks: hunksMap,
    skippedLarge: skippedLarge
  };
}
// Check if git repo is in a mid-operation state (merge, rebase, cherry-pick, revert)
async function ZUa(): Promise<any> {
  let gitDir: any = await getGitDir(Pt());
  if (!gitDir) return !1;
  return (await Promise.all(["MERGE_HEAD", "REBASE_HEAD", "CHERRY_PICK_HEAD", "REVERT_HEAD"].map((headFile: any) => t$n.access(HIe.join(gitDir, headFile)).then(() => !0).catch(() => !1)))).some(Boolean);
}
// Get merge-base between current branch and the default/origin branch
async function wwp(abortSignal: any): Promise<any> {
  let [currentBranch, defaultBranch] = await Promise.all([getBranch(), getDefaultBranch()]);
  if (!currentBranch || currentBranch === "HEAD" || currentBranch === defaultBranch) return null;
  if (defaultBranch.startsWith("-")) return null;
  let execOpts: any = {
      timeout: Jct,
      preserveOutputOnError: !1,
      abortSignal: abortSignal
    },
    mergeBase: any = "";
  for (let branchRef of [defaultBranch, `origin/${defaultBranch}`]) {
    let {
      stdout: mergeBaseOut,
      code: mergeBaseCode
    } = await execFileNoThrow(gitExe(), ["--no-optional-locks", "merge-base", "HEAD", branchRef], execOpts);
    if (mergeBaseCode === 0 && mergeBaseOut.trim()) {
      mergeBase = mergeBaseOut.trim();
      break;
    }
  }
  if (!mergeBase) return null;
  let headRevParse: any = await execFileNoThrow(gitExe(), ["--no-optional-locks", "rev-parse", "HEAD"], execOpts);
  if (headRevParse.code !== 0 || headRevParse.stdout.trim() === mergeBase) return null;
  return {
    mergeBase: mergeBase,
    baseBranch: defaultBranch
  };
}
// List untracked files and return per-file stats for up to limit of them
async function Rwp(limit: any, abortSignal: any): Promise<any> {
  let {
    stdout: lsOut,
    code: lsCode
  } = await execFileNoThrow(gitExe(), ["--no-optional-locks", "ls-files", "--others", "--exclude-standard"], {
    timeout: Jct,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (lsCode !== 0 || !lsOut.trim()) return null;
  let untrackedFiles: any = lsOut.trim().split(`
`).filter(Boolean);
  if (untrackedFiles.length === 0) return null;
  let statsMap: any = new Map();
  for (let filePath of untrackedFiles.slice(0, limit)) statsMap.set(filePath, {
    added: 0,
    removed: 0,
    isBinary: !1,
    isUntracked: !0
  });
  return statsMap;
}
// Parse git shortstat output into {filesCount, linesAdded, linesRemoved}
function n$n(shortstatText: any): any {
  let match: any = shortstatText.match(/(\d+)\s+files?\s+changed(?:,\s+(\d+)\s+insertions?\(\+\))?(?:,\s+(\d+)\s+deletions?\(-\))?/);
  if (!match) return null;
  return {
    filesCount: parseInt(match[1] ?? "0", 10),
    linesAdded: parseInt(match[2] ?? "0", 10),
    linesRemoved: parseInt(match[3] ?? "0", 10)
  };
}
// Get the diff for a single file, either as a modified diff or an added-file patch
async function r$n(filePath: any): Promise<any> {
  let gitRoot: any = findGitRoot(HIe.dirname(filePath));
  if (!gitRoot) return null;
  let relPath: any = HIe.relative(gitRoot, filePath).split(HIe.sep).join("/"),
    repository: any = getCachedRepository(),
    {
      code: lsCode
    } = await execFileNoThrowWithCwd(gitExe(), ["--no-optional-locks", "ls-files", "--error-unmatch", "--", relPath], {
      cwd: gitRoot,
      timeout: Llo
    });
  if (lsCode === 0) {
    let baseRef: any = await kwp(gitRoot),
      {
        stdout: diffOut,
        code: diffCode
      } = await execFileNoThrowWithCwd(gitExe(), ["--no-optional-locks", "diff", baseRef, "--", relPath], {
        cwd: gitRoot,
        timeout: Llo
      });
    if (diffCode !== 0) return null;
    if (!diffOut) return null;
    return {
      ...xwp(relPath, diffOut, "modified"),
      repository: repository
    };
  }
  let addedResult: any = await Hwp(relPath, filePath);
  if (!addedResult) return null;
  return {
    ...addedResult,
    repository: repository
  };
}
// Build a diff summary object from raw patch text for a given file
function xwp(filename: any, patchText: any, status: any): any {
  let patchLines: any = patchText.split(`
`),
    bodyLines: any = [],
    inBody: any = !1,
    additions: any = 0,
    deletions: any = 0;
  for (let line of patchLines) {
    if (line.startsWith("@@")) inBody = !0;
    if (inBody) {
      if (bodyLines.push(line), line.startsWith("+") && !line.startsWith("+++")) additions++;else if (line.startsWith("-") && !line.startsWith("---")) deletions++;
    }
  }
  return {
    filename: filename,
    status: status,
    additions: additions,
    deletions: deletions,
    changes: additions + deletions,
    patch: bodyLines.join(`
`)
  };
}
// Determine the base ref (merge-base or HEAD) for the given working directory
async function kwp(cwd: any): Promise<any> {
  let repoId: any = tgi(cwd),
    baseRef: any = (repoId !== void 0 ? egi().get(repoId) : void 0) || process.env.CLAUDE_CODE_BASE_REF || (await getDefaultBranch()),
    resolvedRef: any = baseRef && !baseRef.startsWith("-") ? baseRef : "HEAD",
    {
      stdout: mergeBaseOut,
      code: mergeBaseCode
    } = await execFileNoThrowWithCwd(gitExe(), ["--no-optional-locks", "merge-base", "HEAD", resolvedRef], {
      cwd: cwd,
      timeout: Llo
    });
  if (mergeBaseCode === 0 && mergeBaseOut.trim()) return mergeBaseOut.trim();
  return "HEAD";
}
// Build a synthetic "added" patch for a newly created (untracked) file
async function Hwp(relPath: any, absPath: any): Promise<any> {
  try {
    if (!htn(absPath, JUa)) return null;
    let fileLines: any = (await t$n.readFile(absPath, "utf-8")).split(`
`);
    if (fileLines.length > 0 && fileLines.at(-1) === "") fileLines.pop();
    let lineCount: any = fileLines.length,
      addedLines: any = fileLines.map((line: any) => `+${line}`).join(`
`),
      patchBody: any = `@@ -0,0 +1,${lineCount} @@
${addedLines}`;
    return {
      filename: relPath,
      status: "added",
      additions: lineCount,
      deletions: 0,
      changes: lineCount,
      patch: patchBody
    };
  } catch {
    return null;
  }
}
var t$n: any,
  HIe: any,
  Jct = 5000,
  Mlo = 50,
  JUa = 1e6,
  Ewp = 400,
  Nlo = 500,
  Llo = 3000;
var $$t = b(() => {
  Nyn();
  Go();
  ZI();
  oa();
  mc();
  Ba();
  t$n = require("fs/promises"), HIe = require("path");
});
export {XUa,YUa,QUa,Cwp,vwp,ZUa,wwp,Rwp,n$n,r$n,xwp,kwp,Hwp,t$n,HIe,Jct,Mlo,JUa,Ewp,Nlo,Llo,$$t};
