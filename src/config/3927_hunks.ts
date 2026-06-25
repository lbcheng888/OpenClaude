// @ts-nocheck
import {getIsGit as Ay,gitExe as go,getGitDir as SRt,getBranch as Ry,getDefaultBranch as Zx,findGitRoot as cu,ia} from "../../vendor/m698.ts";
import {execFileNoThrow as Fn,execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {getCachedRepository as BTr,_0} from "../../vendor/m697.ts";
import {nCi,tCi,SEn} from "./2260_level.ts";
import {Xrn,Xl} from "./0651_maxBytes.ts";
import {b} from "../../runtime.ts";
// Get working-tree diff context, falling back to branch diff if no working-tree changes
async function aUa(abortSignal: any): Promise<any> {
  if (!(await Ay())) return null;
  if (await cUa()) return null;
  let headDiff: any = await sUa("HEAD", abortSignal);
  if (headDiff === null) return null;
  if (headDiff.stats.filesCount > Vuo) return {
    ...headDiff,
    hunks: new Map(),
    source: {
      kind: "working-tree"
    }
  };
  let remainingSlots: any = Guo - headDiff.perFileStats.size;
  if (remainingSlots > 0) {
    let untrackedStats: any = await Bkp(remainingSlots, abortSignal);
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
  let branchInfo: any = await Fkp(abortSignal);
  if (branchInfo === null) return {
    ...headDiff,
    hunks: new Map(),
    source: {
      kind: "working-tree"
    }
  };
  let baseDiff: any = await sUa(branchInfo.mergeBase, abortSignal);
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
async function sUa(ref: any, abortSignal: any): Promise<any> {
  let {
    stdout: shortstatOut,
    code: shortstatCode
  } = await Fn(go(), ["--no-optional-locks", "diff", ref, "--shortstat"], {
    timeout: Vut,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (shortstatCode === 0) {
    let parsedShortstat: any = z$n(shortstatOut);
    if (parsedShortstat && parsedShortstat.filesCount > Vuo) return {
      stats: parsedShortstat,
      perFileStats: new Map()
    };
  }
  let {
    stdout: numstatOut,
    code: numstatCode
  } = await Fn(go(), ["--no-optional-locks", "diff", ref, "--numstat"], {
    timeout: Vut,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (numstatCode !== 0) return null;
  return Mkp(numstatOut);
}
// Get diff hunks against a ref (default HEAD)
async function lUa(abortSignal: any, ref: any = "HEAD"): Promise<any> {
  if (!(await Ay())) return null;
  if (await cUa()) return null;
  let {
    stdout: shortstatOut,
    code: shortstatCode
  } = await Fn(go(), ["--no-optional-locks", "diff", ref, "--shortstat"], {
    timeout: Vut,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (shortstatCode === 0) {
    let parsedShortstat: any = z$n(shortstatOut);
    if (parsedShortstat && parsedShortstat.filesCount > Vuo) return {
      hunks: new Map(),
      skippedLarge: new Set()
    };
  }
  let {
    stdout: diffOut,
    code: diffCode
  } = await Fn(go(), ["--no-optional-locks", "diff", ref], {
    timeout: Vut,
    preserveOutputOnError: !1,
    abortSignal: abortSignal
  });
  if (diffCode !== 0) return null;
  return Nkp(diffOut);
}
// Parse git diff --numstat output into per-file stats
function Mkp(numstatText: any): any {
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
    if (totalAdded += linesAdded, totalRemoved += linesRemoved, perFileStats.size < Guo) perFileStats.set(filePath, {
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
function Nkp(diffText: any): any {
  let hunksMap: any = new Map(),
    skippedLarge: any = new Set();
  if (!diffText.trim()) return {
    hunks: hunksMap,
    skippedLarge: skippedLarge
  };
  let fileDiffs: any = diffText.split(/^diff --git /m).filter(Boolean);
  for (let fileDiff of fileDiffs) {
    if (hunksMap.size + skippedLarge.size >= Guo) break;
    let firstNewline: any = fileDiff.indexOf(`
`),
      headerMatch: any = (firstNewline === -1 ? fileDiff : fileDiff.slice(0, firstNewline)).match(/^a\/(.+?) b\/(.+)$/);
    if (!headerMatch) continue;
    let filePath: any = headerMatch[2] ?? headerMatch[1] ?? "";
    if (fileDiff.length > iUa) {
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
        if (lineCount >= Lkp) continue;
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
async function cUa(): Promise<any> {
  let gitDir: any = await SRt(Lt());
  if (!gitDir) return !1;
  return (await Promise.all(["MERGE_HEAD", "REBASE_HEAD", "CHERRY_PICK_HEAD", "REVERT_HEAD"].map((headFile: any) => K$n.access(Y0e.join(gitDir, headFile)).then(() => !0).catch(() => !1)))).some(Boolean);
}
// Get merge-base between current branch and the default/origin branch
async function Fkp(abortSignal: any): Promise<any> {
  let [currentBranch, defaultBranch] = await Promise.all([Ry(), Zx()]);
  if (!currentBranch || currentBranch === "HEAD" || currentBranch === defaultBranch) return null;
  if (defaultBranch.startsWith("-")) return null;
  let execOpts: any = {
      timeout: Vut,
      preserveOutputOnError: !1,
      abortSignal: abortSignal
    },
    mergeBase: any = "";
  for (let branchRef of [defaultBranch, `origin/${defaultBranch}`]) {
    let {
      stdout: mergeBaseOut,
      code: mergeBaseCode
    } = await Fn(go(), ["--no-optional-locks", "merge-base", "HEAD", branchRef], execOpts);
    if (mergeBaseCode === 0 && mergeBaseOut.trim()) {
      mergeBase = mergeBaseOut.trim();
      break;
    }
  }
  if (!mergeBase) return null;
  let headRevParse: any = await Fn(go(), ["--no-optional-locks", "rev-parse", "HEAD"], execOpts);
  if (headRevParse.code !== 0 || headRevParse.stdout.trim() === mergeBase) return null;
  return {
    mergeBase: mergeBase,
    baseBranch: defaultBranch
  };
}
// List untracked files and return per-file stats for up to limit of them
async function Bkp(limit: any, abortSignal: any): Promise<any> {
  let {
    stdout: lsOut,
    code: lsCode
  } = await Fn(go(), ["--no-optional-locks", "ls-files", "--others", "--exclude-standard", "--full-name"], {
    timeout: Vut,
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
function z$n(shortstatText: any): any {
  let match: any = shortstatText.match(/(\d+)\s+files?\s+changed(?:,\s+(\d+)\s+insertions?\(\+\))?(?:,\s+(\d+)\s+deletions?\(-\))?/);
  if (!match) return null;
  return {
    filesCount: parseInt(match[1] ?? "0", 10),
    linesAdded: parseInt(match[2] ?? "0", 10),
    linesRemoved: parseInt(match[3] ?? "0", 10)
  };
}
// Get the diff for a single file, either as a modified diff or an added-file patch
async function j$n(filePath: any): Promise<any> {
  let gitRoot: any = cu(Y0e.dirname(filePath));
  if (!gitRoot) return null;
  let relPath: any = Y0e.relative(gitRoot, filePath).split(Y0e.sep).join("/"),
    repository: any = BTr(),
    {
      code: lsCode
    } = await Wr(go(), ["--no-optional-locks", "ls-files", "--error-unmatch", "--", relPath], {
      cwd: gitRoot,
      timeout: Wuo
    });
  if (lsCode === 0) {
    let baseRef: any = await $kp(gitRoot),
      {
        stdout: diffOut,
        code: diffCode
      } = await Wr(go(), ["--no-optional-locks", "diff", baseRef, "--", relPath], {
        cwd: gitRoot,
        timeout: Wuo
      });
    if (diffCode !== 0) return null;
    if (!diffOut) return null;
    return {
      ...Ukp(relPath, diffOut, "modified"),
      repository: repository
    };
  }
  let addedResult: any = await qkp(relPath, filePath);
  if (!addedResult) return null;
  return {
    ...addedResult,
    repository: repository
  };
}
// Build a diff summary object from raw patch text for a given file
function Ukp(filename: any, patchText: any, status: any): any {
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
async function $kp(cwd: any): Promise<any> {
  let repoId: any = nCi(cwd),
    baseRef: any = (repoId !== void 0 ? tCi().get(repoId) : void 0) || process.env.CLAUDE_CODE_BASE_REF || (await Zx()),
    resolvedRef: any = baseRef && !baseRef.startsWith("-") ? baseRef : "HEAD",
    {
      stdout: mergeBaseOut,
      code: mergeBaseCode
    } = await Wr(go(), ["--no-optional-locks", "merge-base", "HEAD", resolvedRef], {
      cwd: cwd,
      timeout: Wuo
    });
  if (mergeBaseCode === 0 && mergeBaseOut.trim()) return mergeBaseOut.trim();
  return "HEAD";
}
// Build a synthetic "added" patch for a newly created (untracked) file
async function qkp(relPath: any, absPath: any): Promise<any> {
  try {
    if (!Xrn(absPath, iUa)) return null;
    let fileLines: any = (await K$n.readFile(absPath, "utf-8")).split(`
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
var K$n,
  Y0e,
  Vut = 5000,
  Guo = 50,
  iUa = 1e6,
  Lkp = 400,
  Vuo = 500,
  Wuo = 3000;
var t3t = b(() => {
  SEn();
  Po();
  _0();
  Ii();
  Xl();
  ia();
  K$n = require("fs/promises"), Y0e = require("path");
});

export {aUa,sUa,lUa,Mkp,Nkp,cUa,Fkp,Bkp,z$n,j$n,Ukp,$kp,qkp,K$n,Y0e,Vut,Guo,iUa,Lkp,Vuo,Wuo,t3t};
