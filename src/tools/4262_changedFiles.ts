// @ts-nocheck
import {execFileNoThrow as Bn,oa} from "../../vendor/m684.ts";
import {gitExe as bo,Ba} from "../../vendor/m693.ts";
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {x_ as R_,initXL as yL} from "../agent/3279_code.ts";
import {Pn as Dn,bt as St} from "../../vendor/m195.ts";
import {lF as ZB,Mw as Pw} from "../config/2221_recursive.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {setOriginalCwd as ID,setProjectRoot as _de,lt as ct,getProjectRoot as yc,getOriginalCwd as gr} from "../session/0131_sent.ts";
import {Cve as lve,L1 as v1} from "../../vendor/m2232.ts";
import {saveWorktreeState as S6,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {a0e as WIe,y3t as J9t} from "../../vendor/m4257.ts";
import {clearMemoryFileCaches as GH,zw as Ww} from "../config/2717_stripHtmlComments.ts";
import {xT as ST,yx as Ax} from "../core/5144_encoding.ts";
import {reanchorGitFileWatcher as e7,vO as hO} from "../../vendor/m691.ts";
import {ES as AS,EU as mU} from "../../vendor/m4256.ts";
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {Ct,logEvent as j} from "../../vendor/m131.ts";
import {Ri,pi as ai} from "./2227_userFacingName.ts";
import {Go as Ko,FMe as TMe} from "../../vendor/m632.ts";
import {hI as uI,keepWorktree as $qe,killTmuxSession as Mut,cleanupWorktree as Nut} from "../session/5172_worktreeBranchName.ts";
import {oGa as B5a,tGa as L5a,nGa as M5a,rGa as N5a} from "../../vendor/m4260.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {own as Svn} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {getCurrentWorktreeSession as dA} from "../config/3332_flushAnalyticsSinks.ts";
import {Qe} from "../../vendor/m5.ts";
// @ts-nocheck
async function getWorktreeChangeStats(worktreePath, originalHeadCommit) {
  let statusResult = await Bn(bo(), ["-C", worktreePath, "status", "--porcelain"]);
  if (statusResult.code !== 0) return null;
  let changedFileCount = Gn(statusResult.stdout.split(`
`), line => line.trim() !== "");
  if (!originalHeadCommit) return null;
  let revListResult = await Bn(bo(), ["-C", worktreePath, "rev-list", "--count", `${originalHeadCommit}..HEAD`]);
  if (revListResult.code !== 0) return null;
  let commitCount = parseInt(revListResult.stdout.trim(), 10) || 0;
  return {
    changedFiles: changedFileCount,
    commits: commitCount
  };
}
async function restoreOriginalDirectory(originalCwd, isActiveSession, q) {
  let K = originalCwd,
    O = false;
  try {
    R_(originalCwd);
  } catch (z) {
    let $ = false;
    try {
      await DPO.realpath(originalCwd);
    } catch (Y) {
      $ = Dn(Y);
    }
    if (!$) throw z;
    O = true, K = "";
    for (let Y of [q, NmK.homedir(), ZB()]) try {
      R_(Y), K = Y;
      break;
    } catch {}
    if (!K) throw z;
    v(`ExitWorktree: original directory "${originalCwd}" no longer exists; session cwd recovered to "${K}"`);
  }
  let T = O && K === q;
  if (!O || T) {
    if (ID(K), isActiveSession) _de(K), lve();
  }
  return S6(null), WIe(), GH(), ST.cache.clear?.(), e7(), AS()?.refreshGitBranch?.(), {
    restoredCwd: K,
    originalCwdMissing: O,
    fellBackToWorktree: T
  };
}
function c5q(H, _) {
  if (!_.originalCwdMissing) return `Session is now back in ${H}.`;
  let q = `The original directory ${H} no longer exists, so the session is now in ${_.restoredCwd}.`;
  return _.fellBackToWorktree ? q : `${q} Consider restarting Claude from an existing directory.`;
}
var DPO, NmK, VmK, oRO, eFK;
var HgK = b(() => {
  Xr();
  ct();
  mU();
  J9t();
  Ct();
  Ri();
  Ww();
  Ko();
  je();
  St();
  oa();
  hO();
  Ba();
  v1();
  Ax();
  yL();
  za();
  Pw();
  uI();
  B5a();
  DPO = require("fs/promises"), NmK = require("os"), VmK = Re(() => E.strictObject({
    action: E.enum(["keep", "remove"]).describe('"keep" leaves the worktree and branch on disk; "remove" deletes both.'),
    discard_changes: E.boolean().optional().describe('Required true when action is "remove" and the worktree has uncommitted files or unmerged commits. The tool will refuse and list them otherwise.')
  })), oRO = Re(() => E.object({
    action: E.enum(["keep", "remove"]),
    originalCwd: E.string(),
    worktreePath: E.string(),
    worktreeBranch: E.string().optional(),
    tmuxSessionName: E.string().optional(),
    discardedFiles: E.number().optional(),
    discardedCommits: E.number().optional(),
    message: E.string()
  }));
  eFK = ai({
    name: Svn,
    searchHint: "exit a worktree session and return to the original directory",
    maxResultSizeChars: 1e5,
    async description() {
      return "Exits a worktree session created by EnterWorktree and restores the original working directory";
    },
    async prompt() {
      return L5a();
    },
    get inputSchema() {
      return VmK();
    },
    get outputSchema() {
      return oRO();
    },
    userFacingName(e) {
      return e?.action === "remove" ? "Cleaning up worktree" : "Exiting worktree";
    },
    shouldDefer: true,
    isDestructive(e) {
      return e.action === "remove";
    },
    toAutoClassifierInput(e) {
      return e.action;
    },
    async validateInput(e) {
      if (TMe()) return {
        result: false,
        message: 'ExitWorktree cannot be called from a subagent with a cwd override (isolation: "worktree" or explicit cwd) \u2014 it would mutate the parent session\'s process-wide working directory. This agent is already isolated; use Bash with `cd` for directory changes within it.',
        errorCode: 5
      };
      let t = dA();
      if (!t) return {
        result: false,
        message: "No-op: there is no active EnterWorktree session to exit. This tool only operates on worktrees created by EnterWorktree in the current session \u2014 it will not touch worktrees created manually or in a previous session. No filesystem changes were made.",
        errorCode: 1
      };
      if (e.action === "remove" && t.enteredExisting) return {
        result: false,
        message: `This session entered an existing worktree (${t.worktreePath}); it was not created by EnterWorktree, so this tool will not remove it. Use action: "keep" to return to ${t.originalCwd}, then remove the worktree manually with \`git worktree remove\` if desired.`,
        errorCode: 4
      };
      if (e.action === "remove" && !e.discard_changes) {
        let n = await getWorktreeChangeStats(t.worktreePath, t.originalHeadCommit);
        if (n === null) return {
          result: false,
          message: `Could not verify worktree state at ${t.worktreePath}. Refusing to remove without explicit confirmation. Re-invoke with discard_changes: true to proceed \u2014 or use action: "keep" to preserve the worktree.`,
          errorCode: 3
        };
        let {
          changedFiles: r,
          commits: o
        } = n;
        if (r > 0 || o > 0) {
          let s = [];
          if (r > 0) s.push(`${r} uncommitted ${r === 1 ? "file" : "files"}`);
          if (o > 0) s.push(`${o} ${o === 1 ? "commit" : "commits"} on ${t.worktreeBranch ?? "the worktree branch"}`);
          return {
            result: false,
            message: `Worktree has ${s.join(" and ")}. Removing will discard this work permanently. Confirm with the user, then re-invoke with discard_changes: true \u2014 or use action: "keep" to preserve the worktree.`,
            errorCode: 2
          };
        }
      }
      return {
        result: true
      };
    },
    renderToolUseMessage: M5a,
    renderToolResultMessage: N5a,
    async call(e) {
      let t = dA();
      if (!t) throw Error("Not in a worktree session");
      let {
          originalCwd: n,
          worktreePath: r,
          worktreeBranch: o,
          tmuxSessionName: s,
          originalHeadCommit: i
        } = t,
        a = yc() === gr(),
        {
          changedFiles: l,
          commits: c
        } = (await getWorktreeChangeStats(r, i)) ?? {
          changedFiles: 0,
          commits: 0
        };
      if (e.action === "keep") {
        await $qe();
        let f = await restoreOriginalDirectory(n, a, r);
        j("tengu_worktree_kept", {
          mid_session: true,
          commits: c,
          changed_files: l
        });
        let A = s ? ` Tmux session ${s} is still running; reattach with: tmux attach -t ${s}` : "";
        return {
          data: {
            action: "keep",
            originalCwd: n,
            worktreePath: r,
            worktreeBranch: o,
            tmuxSessionName: s,
            message: `Exited worktree. Your work is preserved at ${r}${o ? ` on branch ${o}` : ""}. ${c5q(n, f)}${A}`
          }
        };
      }
      if (s) await Mut(s);
      let u = await Nut(),
        d = await restoreOriginalDirectory(n, a, r);
      if (!u) return {
        data: {
          action: "remove",
          originalCwd: n,
          worktreePath: r,
          worktreeBranch: o,
          discardedFiles: 0,
          discardedCommits: 0,
          message: `Exited worktree but could not remove it \u2014 kept at ${r}. ${c5q(n, d)}`
        }
      };
      j("tengu_worktree_removed", {
        source: Qe("exit_tool"),
        mid_session: true,
        commits: c,
        changed_files: l
      });
      let p = [];
      if (c > 0) p.push(`${c} ${c === 1 ? "commit" : "commits"}`);
      if (l > 0) p.push(`${l} uncommitted ${l === 1 ? "file" : "files"}`);
      let m = p.length > 0 ? ` Discarded ${p.join(" and ")}.` : "";
      return {
        data: {
          action: "remove",
          originalCwd: n,
          worktreePath: r,
          worktreeBranch: o,
          discardedFiles: l,
          discardedCommits: c,
          message: `Exited and removed worktree at ${r}.${m} ${c5q(n, d)}`
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      message: e
    }, t) {
      return {
        type: "tool_result",
        content: e,
        tool_use_id: t
      };
    }
  });
});

export {getWorktreeChangeStats as sGa,restoreOriginalDirectory as iGa,c5q as qpo,DPO as aGa,NmK as lGa,VmK as GOp,oRO as VOp,eFK as cGa,HgK as uGa};
