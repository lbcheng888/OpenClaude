// @ts-nocheck
import {execFileNoThrowWithCwd as c8,Ii as l7} from "../../vendor/m690.ts";
import {gitExe as Rq,ia as gK} from "../../vendor/m698.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {A_ as zw,zf as $w} from "../../vendor/m133.ts";
import {b as L} from "../../runtime.ts";
/**
 * Detects git worktrees for the given working directory, emits a
 * `tengu_worktree_detection` telemetry event, and returns the sorted list of
 * worktree paths with the current directory's worktree first (if found).
 *
 * @param cwd - The working directory used as the starting point for detection.
 * @returns An ordered array of absolute worktree root paths.
 */
async function UYH(cwd: string): Promise<string[]> {
  let startTime = Date.now(),
    {
      stdout: rawOutput,
      code: exitCode
    } = await c8(Rq(), ["worktree", "list", "--porcelain"], {
      cwd: cwd,
      preserveOutputOnError: !1
    }),
    durationMs = Date.now() - startTime;
  if (exitCode !== 0) return c("tengu_worktree_detection", {
    duration_ms: durationMs,
    worktree_count: 0,
    success: !1
  }), [];
  let worktreePaths = rawOutput.split(`
`).filter((line: string) => line.startsWith("worktree ")).map((line: string) => zw(line.slice(9)));
  c("tengu_worktree_detection", {
    duration_ms: durationMs,
    worktree_count: worktreePaths.length,
    success: !0
  });
  let currentWorktree = worktreePaths.find((p: string) => cwd === p || cwd.startsWith(p + pathModule.sep)),
    otherWorktrees = worktreePaths.filter((p: string) => p !== currentWorktree).sort((a: string, b: string) => a.localeCompare(b));
  return currentWorktree ? [currentWorktree, ...otherWorktrees] : otherWorktrees;
}
var pathModule: typeof import("path");
var jb_ = L(() => {
  y_();
  $w();
  l7();
  gK();
  pathModule = require("path");
});
export {UYH as J_e,pathModule as VNa,jb_ as i9t};
