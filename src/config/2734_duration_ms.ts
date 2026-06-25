// @ts-nocheck
import {getSessionId as It,lt,setCachedClaudeMdContent as gar} from "../session/0132_sent.ts";
import {b,oo} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {v$e,ike} from "../../vendor/m2691.ts";
import {I3i,H3i} from "../../vendor/m2719.ts";
import {mn,He,Pt} from "../telemetry/0600_feature_name.ts";
import {lo,getOauthAccountInfo as hc} from "./2036_withOAuthRefreshLock.ts";
import {ZR,getClaudeMds as NMt,filterInjectedMemoryFiles as MMt,getMemoryFiles as qA} from "./2729_stripHtmlComments.ts";
import {ky,Qse} from "../agent/2238_explicitlyRequested.ts";
import {qe,logForDebugging as A} from "./0236_setHasFormattedOutput.ts";
import {pf,wn} from "./0693_timestamp.ts";
import {dn} from "./0137_namespace.ts";
import {Ct,Ce} from "../../vendor/m197.ts";
import {Ii,execFileNoThrow as Fn} from "../../vendor/m690.ts";
import {ia,getIsGit as Ay,getBranch as Ry,getDefaultBranch as Zx,gitExe as go} from "../../vendor/m698.ts";
import {PKr,UMt} from "./2730_PKr.ts";
import {Zm,Yc,ws} from "./2709_Zm.ts";
import {UKr,q4i} from "../../vendor/m2732.ts";
import {Mo} from "../mcp/2200_mcpServerName.ts";
import {nt} from "../../vendor/m127.ts";
// @ts-nocheck
/**
 * System / user context builders for the conversation prompt.
 *
 * - getGitStatusContext (WKr): collects git status, branch, recent commits and
 *   the git user, returning a single formatted string injected at conversation start.
 * - getSystemContext (AE): wraps git status + Perforce hints into the system context object.
 * - getUserContext (Py): collects CLAUDE.md content, user email, attached project
 *   context and the current date.
 */
var getProjectContextBlock /* sMd */,
  STATUS_TRUNCATE_LIMIT /* $Kr */ = 2000,
  getContextCacheKey /* qKr */ = () => It(),
  getGitStatusContext /* WKr */,
  getSystemContext /* AE */,
  getUserContext /* Py */;
var initContextModule /* y$ */ = b(() => {
  Wi();
  lt();
  v$e();
  I3i();
  mn();
  lo();
  ZR();
  ky();
  qe();
  pf();
  dn();
  Ct();
  Ii();
  ia();
  PKr();
  Zm();
  getProjectContextBlock = (UKr(), oo(q4i)).getProjectContextBlock, getGitStatusContext = Hn(async () => {
    let startTime = Date.now();
    wn("info", "git_status_started");
    let isGitCheckStart = Date.now(),
      isGit = await Ay();
    if (wn("info", "git_is_git_check_completed", {
      duration_ms: Date.now() - isGitCheckStart,
      is_git: isGit
    }), !isGit) return wn("info", "git_status_skipped_not_git", {
      duration_ms: Date.now() - startTime
    }), He("context_git_detect"), null;
    try {
      let gitCommandsStart = Date.now(),
        [branch, defaultBranch, statusOutput, recentCommits, gitUser] = await Promise.all([Ry(), Zx(), Fn(go(), ["--no-optional-locks", "status", "--short"], {
          preserveOutputOnError: !1
        }).then(({
          stdout: out
        }) => out.trim()), Fn(go(), ["--no-optional-locks", "log", "--oneline", "-n", "5"], {
          preserveOutputOnError: !1
        }).then(({
          stdout: out
        }) => out.trim()), Fn(go(), ["config", "user.name"], {
          preserveOutputOnError: !1
        }).then(({
          stdout: out
        }) => out.trim())]);
      wn("info", "git_commands_completed", {
        duration_ms: Date.now() - gitCommandsStart,
        status_length: statusOutput.length
      });
      let gitStatusCmd = Yc() ? Mo : ws,
        truncatedStatus = statusOutput.length > STATUS_TRUNCATE_LIMIT ? statusOutput.substring(0, STATUS_TRUNCATE_LIMIT) + `
... (truncated because it exceeds 2k characters. If you need more information, run "git status" using ${gitStatusCmd})` : statusOutput;
      return wn("info", "git_status_completed", {
        duration_ms: Date.now() - startTime,
        truncated: statusOutput.length > STATUS_TRUNCATE_LIMIT
      }), He("context_git_detect"), ["This is the git status at the start of the conversation. Note that this status is a snapshot in time, and will not update during the conversation.", `Current branch: ${branch}`, `Main branch (you will usually use this for PRs): ${defaultBranch}`, ...(gitUser ? [`Git user: ${gitUser}`] : []), `Status:
${truncatedStatus || "(clean)"}`, `Recent commits:
${recentCommits}`].join(`

`);
    } catch (err) {
      return wn("error", "git_status_failed", {
        duration_ms: Date.now() - startTime
      }), Pt("context_git_detect", "git_cmd_failed"), A(`Failed to get git status for system context: ${Ce(err)}`, {
        level: "error"
      }), null;
    }
  }, getContextCacheKey), getSystemContext = Hn(async injection => {
    let startTime = Date.now();
    wn("info", "system_context_started");
    let gitStatus = nt(process.env.CLAUDE_CODE_REMOTE) || !UMt() ? null : await getGitStatusContext();
    return wn("info", "system_context_completed", {
      duration_ms: Date.now() - startTime,
      has_git_status: gitStatus !== null,
      has_injection: injection !== void 0
    }), {
      ...(gitStatus && {
        gitStatus: gitStatus
      }),
      ...(nt(process.env.CLAUDE_CODE_PERFORCE_MODE) && {
        perforceMode: `This is a Perforce workspace. Files not yet opened for edit are read-only; if a file is read-only, run \`p4 edit <file>\` via ${Yc() ? Mo : ws} to check it out before modifying. Files that are already writable have been opened and can be edited directly.`
      }),
      ...{}
    };
  }, injection => `${getContextCacheKey()}\x00${injection ?? ""}`);
  if (!(getSystemContext.cache instanceof Map)) getSystemContext.cache = new Map();
  getUserContext = Hn(async () => {
    let startTime = Date.now();
    wn("info", "user_context_started");
    let claudeMdDisabled = Qse(),
      claudeMd = claudeMdDisabled ? null : NMt(MMt(await qA()));
    if (!claudeMdDisabled) He("context_claude_md_load");
    gar(claudeMd || null);
    let userEmail = process.env.ANTHROPIC_UNIX_SOCKET ? void 0 : hc()?.emailAddress,
      projectContext = await getProjectContextBlock();
    return wn("info", "user_context_completed", {
      duration_ms: Date.now() - startTime,
      claudemd_length: claudeMd?.length ?? 0,
      claudemd_disabled: Boolean(claudeMdDisabled),
      has_user_email: Boolean(userEmail),
      has_project_context: Boolean(projectContext)
    }), {
      ...(claudeMd && {
        claudeMd: claudeMd
      }),
      ...(userEmail && {
        userEmail: `The user's email address is ${userEmail}.`
      }),
      ...(projectContext && {
        attachedProject: projectContext
      }),
      currentDate: H3i(ike())
    };
  }, getContextCacheKey);
});

export {getProjectContextBlock as sMd,STATUS_TRUNCATE_LIMIT as $Kr,getContextCacheKey as qKr,getGitStatusContext as WKr,getSystemContext as AE,getUserContext as Py,initContextModule as y$};
