// @ts-nocheck
import {getSessionId as kt,lt as ct,setCachedClaudeMdContent as tnr} from "../session/0131_sent.ts";
import {b,ro as Pr} from "../../runtime.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {T2e as XUe,bRe as aRe} from "../../vendor/m2680.ts";
import {GNi as F1i,WNi as B1i} from "../../vendor/m2707.ts";
import {ln as cn,Ie as He,isTmuxControlMode as Bt} from "../telemetry/0594_feature_name.ts";
import {Ao as mo,getOauthAccountInfo as Ic} from "./2031_withOAuthRefreshLock.ts";
import {zw as Ww,getClaudeMds as LPt,filterInjectedMemoryFiles as OPt,getMemoryFiles as Iv} from "./2717_stripHtmlComments.ts";
import {Iy as ky,Zse as jse} from "../agent/2230_explicitlyRequested.ts";
import {qe as je,logForDebugging as v} from "./0234_setHasFormattedOutput.ts";
import {SA as wA,kn as xn} from "./0689_timestamp.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "./0047_namespace.ts";
import {bt as St,Se} from "../../vendor/m195.ts";
import {oa,execFileNoThrow as Bn} from "../../vendor/m684.ts";
import {Ba,getIsGit as vy,getBranch as VT,getDefaultBranch as FM,gitExe as bo} from "../../vendor/m693.ts";
import {n8r as ujr,aOt as BPt} from "./2718_n8r.ts";
import {oA as cA,Su as du,Js as Gs} from "./2697_oA.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {c8r as gjr,rFi as XNi} from "../../vendor/m2720.ts";
import {ns as Xo} from "../mcp/2194_mcpServerName.ts";
import {st as rt} from "../../vendor/m5.ts";
// @ts-nocheck
var STATUS_TRUNCATE_LIMIT,
  getUserContextCacheKey = 2000,
  dm8 = () => kt(),
  im8,
  rD,
  ij;
var Cp = b(() => {
  na();
  ct();
  XUe();
  F1i();
  cn();
  mo();
  Ww();
  ky();
  je();
  wA();
  Or();
  an();
  St();
  oa();
  Ba();
  ujr();
  cA();
  STATUS_TRUNCATE_LIMIT = Ge.CLAUDE_PROJECT_TOOL ? (gjr(), Pr(XNi)).getProjectContextBlock : null, im8 = bn(async () => {
    let e = Date.now();
    xn("info", "git_status_started");
    let t = Date.now(),
      n = await vy();
    if (xn("info", "git_is_git_check_completed", {
      duration_ms: Date.now() - t,
      is_git: n
    }), !n) return xn("info", "git_status_skipped_not_git", {
      duration_ms: Date.now() - e
    }), He("context_git_detect"), null;
    try {
      let r = Date.now(),
        [o, s, i, a, l] = await Promise.all([VT(), FM(), Bn(bo(), ["--no-optional-locks", "status", "--short"], {
          preserveOutputOnError: false
        }).then(({
          stdout: d
        }) => d.trim()), Bn(bo(), ["--no-optional-locks", "log", "--oneline", "-n", "5"], {
          preserveOutputOnError: false
        }).then(({
          stdout: d
        }) => d.trim()), Bn(bo(), ["config", "user.name"], {
          preserveOutputOnError: false
        }).then(({
          stdout: d
        }) => d.trim())]);
      xn("info", "git_commands_completed", {
        duration_ms: Date.now() - r,
        status_length: i.length
      });
      let c = du() ? Xo : Gs,
        u = i.length > getUserContextCacheKey ? i.substring(0, getUserContextCacheKey) + `
... (truncated because it exceeds 2k characters. If you need more information, run "git status" using ${c})` : i;
      return xn("info", "git_status_completed", {
        duration_ms: Date.now() - e,
        truncated: i.length > getUserContextCacheKey
      }), He("context_git_detect"), ["This is the git status at the start of the conversation. Note that this status is a snapshot in time, and will not update during the conversation.", `Current branch: ${o}`, `Main branch (you will usually use this for PRs): ${s}`, ...(l ? [`Git user: ${l}`] : []), `Status:
${u || "(clean)"}`, `Recent commits:
${a}`].join(`

`);
    } catch (r) {
      return xn("error", "git_status_failed", {
        duration_ms: Date.now() - e
      }), Bt("context_git_detect", "git_cmd_failed"), v(`Failed to get git status for system context: ${Se(r)}`, {
        level: "error"
      }), null;
    }
  }, dm8), rD = bn(async e => {
    let t = Date.now();
    xn("info", "system_context_started");
    let n = rt(process.env.CLAUDE_CODE_REMOTE) || !BPt() ? null : await im8();
    return xn("info", "system_context_completed", {
      duration_ms: Date.now() - t,
      has_git_status: n !== null,
      has_injection: e !== undefined
    }), {
      ...(n && {
        gitStatus: n
      }),
      ...(rt(process.env.CLAUDE_CODE_PERFORCE_MODE) && {
        perforceMode: `This is a Perforce workspace. Files not yet opened for edit are read-only; if a file is read-only, run \`p4 edit <file>\` via ${du() ? Xo : Gs} to check it out before modifying. Files that are already writable have been opened and can be edited directly.`
      }),
      ...{}
    };
  }, e => `${dm8()}\x00${e ?? ""}`);
  if (!(rD.cache instanceof Map)) rD.cache = new Map();
  ij = bn(async () => {
    let e = Date.now();
    xn("info", "user_context_started");
    let t = jse(),
      n = t ? null : LPt(OPt(await Iv()));
    if (!t) He("context_claude_md_load");
    tnr(n || null);
    let r = process.env.ANTHROPIC_UNIX_SOCKET ? undefined : Ic()?.emailAddress,
      o = STATUS_TRUNCATE_LIMIT ? await STATUS_TRUNCATE_LIMIT() : null;
    return xn("info", "user_context_completed", {
      duration_ms: Date.now() - e,
      claudemd_length: n?.length ?? 0,
      claudemd_disabled: Boolean(t),
      has_user_email: Boolean(r),
      ...(STATUS_TRUNCATE_LIMIT && {
        has_project_context: Boolean(o)
      })
    }), {
      ...(n && {
        claudeMd: n
      }),
      ...(r && {
        userEmail: `The user's email address is ${r}.`
      }),
      ...(o && {
        attachedProject: o
      }),
      currentDate: B1i(aRe())
    };
  }, dm8);
});

export {STATUS_TRUNCATE_LIMIT as u8r,getUserContextCacheKey as d8r,dm8 as p8r,im8 as m8r,rD as hE,ij as pS,Cp as dq};
