// @ts-nocheck
import {execFileNoThrow as Bn,Ii as oa} from "../../vendor/m690.ts";
import {gitExe as bo,ia as Ba} from "../../vendor/m698.ts";
import {zn as Gn} from "../api/0465_getOauthConfig.ts";
import {markTelemetryString as R_,KO as yL} from "../agent/3295_code.ts";
import {In as Dn,Ct as St} from "../../vendor/m197.ts";
import {xF as ZB,resolveToolAlias as Pw} from "../config/2229_observed_uid.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {setOriginalCwd as ID,setProjectRoot as _de,lt as ct,getProjectRoot as yc,getOriginalCwd as gr} from "../session/0132_sent.ts";
import {cve as lve,zM as v1} from "../../vendor/m2240.ts";
import {saveWorktreeState as S6,_a as za} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {eDe as WIe,Mqt as J9t} from "../../vendor/m4275.ts";
import {clearMemoryFileCaches as GH,ZR as Ww} from "../config/2729_stripHtmlComments.ts";
import {bT as ST,Dw as Ax} from "../core/5176_encoding.ts";
import {reanchorGitFileWatcher as e7,VP as hO} from "../../vendor/m696.ts";
import {yS as AS,WB as mU} from "../../vendor/m4274.ts";
import {b} from "../../runtime.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {kt as Ct,logEvent as j} from "../../vendor/m132.ts";
import {ri as Ri,Ks as ai} from "./2235_userFacingName.ts";
import {Po as Ko,D1e as TMe} from "../../vendor/m638.ts";
import {qI as uI,keepWorktree as $qe,killTmuxSession as Mut,cleanupWorktree as Nut} from "../session/5205_worktreeBranchName.ts";
import {AJa as B5a,bJa as L5a,EJa as M5a,CJa as N5a} from "../../vendor/m4278.ts";
import {ve as Re} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {zkn as Svn} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {getCurrentWorktreeSession as dA} from "../config/3348_flushAnalyticsSinks.ts";
import {Ve as Qe} from "../../vendor/m5.ts";
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
export {getWorktreeChangeStats as RJa,restoreOriginalDirectory as vJa,c5q as F_o,DPO as wJa,NmK as kJa,VmK as d$p,oRO as p$p,eFK as HJa,HgK as IJa};
