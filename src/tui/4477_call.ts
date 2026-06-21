// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {useTimeout as Nd} from "../../vendor/m2450.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {ac as sc,e_ as n_} from "../../vendor/m3338.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {Tm as Rm,Fk as Lk} from "../../vendor/m3341.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {getMemoryFiles as Iv,getMemoryFilesForNestedDirectory as MPt,getClaudeMds as LPt,zw as Ww} from "../config/2717_stripHtmlComments.ts";
import {av as rv,mc} from "../config/0645_maxBytes.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {getOriginalCwd as gr,setOriginalCwd as ID,lt as ct} from "../session/0131_sent.ts";
import {x_ as R_,initXL as yL} from "../agent/3279_code.ts";
import {relocateSessionTranscript as Fgo,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {reanchorGitFileWatcher as e7,vO as hO} from "../../vendor/m691.ts";
import {getIsGit as vy,Ba} from "../../vendor/m693.ts";
import {ES as AS,EU as mU} from "../../vendor/m4256.ts";
import {SandboxManager as zo,Ag as dg} from "../../vendor/m2671.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {zjn as sjn,CronDeleteToolName as bx,lo} from "../tools/5190_userPromptCount.ts";
import {Qm as of,Sw as hw} from "../mcp/0728_serverName.ts";
import {permissionRuleSourceDisplayString as O0e,ay} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {_t as gt,cu as au} from "../../vendor/m582.ts";
import {Ds as Rs,Iu as Pu} from "../../vendor/m643.ts";
import {dn as ln,bt as St} from "../../vendor/m195.ts";
import {Rol as erl,xol as trl} from "../../vendor/m4475.ts";
import {Fr as Lr,Ql as Xl} from "../../vendor/m4405.ts";
import {isPathTrusted as lpt,setPathTrusted as pqt,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var rrl = {};
pt(rrl, {
  call: () => L4p,
  CdTrustPrompt: () => relocateSessionToDirectory
});
function loadClaudeMdForDirectory(directory) {
  let t = Bgo.c(7),
    {
      message: n,
      args: r,
      onDone: o
    } = directory;
  Nd(o, 0);
  let ancestors;
  if (t[0] !== r) ancestors = Sx.default.createElement(w, {
    dimColor: true
  }, Ze.pointer, " /cd ", r), t[0] = r, t[1] = ancestors;else ancestors = t[1];
  let i;
  if (t[2] !== n) i = Sx.default.createElement(qn, null, Sx.default.createElement(w, null, n)), t[2] = n, t[3] = i;else i = t[3];
  let a;
  if (t[4] !== ancestors || t[5] !== i) a = Sx.default.createElement(B, {
    flexDirection: "column"
  }, ancestors, i), t[4] = ancestors, t[5] = i, t[6] = a;else a = t[6];
  return a;
}
function relocateSessionToDirectory(directory) {
  let previousDir = Bgo.c(12),
    {
      directory: n,
      onConfirm: r,
      onCancel: o
    } = directory,
    s;
  if (previousDir[0] !== n) s = Sx.default.createElement(w, {
    bold: true
  }, n), previousDir[0] = n, previousDir[1] = s;else s = previousDir[1];
  let i, claudeMd;
  if (previousDir[2] === Symbol.for("react.memo_cache_sentinel")) i = Sx.default.createElement(w, null, "This session hasn", "'", "t worked here before. Is this a directory you created or one you trust?"), claudeMd = Sx.default.createElement(w, null, "Claude Code", "'", "ll be able to read, edit, and execute files here."), previousDir[2] = i, previousDir[3] = claudeMd;else i = previousDir[2], claudeMd = previousDir[3];
  let staleEnvReminder;
  if (previousDir[4] === Symbol.for("react.memo_cache_sentinel")) staleEnvReminder = Sx.default.createElement(w, {
    dimColor: true
  }, Sx.default.createElement(Fs, {
    url: "https://code.claude.com/docs/en/security"
  }, "Security guide")), previousDir[4] = staleEnvReminder;else staleEnvReminder = previousDir[4];
  let c;
  if (previousDir[5] !== o || previousDir[6] !== r) c = Sx.default.createElement(sc, {
    confirmLabel: "Yes, move here",
    cancelLabel: "No, stay put",
    onConfirm: r,
    onCancel: o
  }), previousDir[5] = o, previousDir[6] = r, previousDir[7] = c;else c = previousDir[7];
  let u;
  if (previousDir[8] === Symbol.for("react.memo_cache_sentinel")) u = Sx.default.createElement(w, {
    dimColor: true
  }, Sx.default.createElement(hn, null, Sx.default.createElement(lt, {
    chord: "enter",
    action: "confirm"
  }), Sx.default.createElement(lt, {
    chord: "escape",
    action: "cancel"
  }))), previousDir[8] = u;else u = previousDir[8];
  let d;
  if (previousDir[9] !== s || previousDir[10] !== c) d = Sx.default.createElement(Rm, {
    color: "warning",
    titleColor: "warning",
    title: "Moving to a new directory:"
  }, Sx.default.createElement(B, {
    flexDirection: "column",
    gap: 1,
    paddingTop: 1
  }, s, i, claudeMd, staleEnvReminder, c, u)), previousDir[9] = s, previousDir[10] = c, previousDir[11] = d;else d = previousDir[11];
  return d;
}
async function buildCdBlockedMessage(directory) {
  if (Ge.CLAUDE_CODE_DISABLE_CLAUDE_MDS) return "";
  let t = new Set();
  for (let s of await Iv()) t.add(rv(s.path));
  let n = [],
    r = directory;
  while (r !== dqt.parse(r).root) n.push(r), r = dqt.dirname(r);
  let o = [];
  for (let s of n.reverse()) o.push(...(await MPt(s, directory, t)));
  return LPt(o);
}
async function call(addMessage) {
  let t = Pt(),
    n = gr();
  process.chdir(addMessage), R_(addMessage), ID(Pt());
  try {
    await Fgo();
  } catch (i) {
    let a = false;
    try {
      process.chdir(t), a = true;
    } catch {
      v(`/cd transcript move failed and rollback chdir failed; completing the move with the transcript left in its previous home: ${i}`, {
        level: "error"
      });
    }
    if (a) throw R_(t), ID(n), i;
  }
  e7(), vy.cache.clear?.(), AS()?.refreshGitBranch?.(), zo.refreshConfig(), j("tengu_cd_command", {});
  let r = await buildCdBlockedMessage(addMessage),
    o = sjn(addMessage),
    s = bx(`The session's working directory has changed to ${o} (via /cd). The environment block at the start of this conversation still names the ` + "previous directory \u2014 that information is stale. All tool calls and " + `relative paths now resolve from ${o}.`);
  return r ? `${s}

${r}` : s;
}
function O4p(e, t) {
  if (t.result === "blockedByRule") {
    let n = of(t.rule.ruleValue),
      r = O0e(t.rule.source);
    if (t.rule.ruleValue.ruleContent === undefined) return `Can't move to ${gt.bold(e)} \u2014 /cd is turned off by the ${gt.bold(n)} rule in ${r}. Update the rule in /permissions to move between directories again.`;
    return `Can't move to ${gt.bold(e)} \u2014 it's excluded by the ${gt.bold(n)} rule in ${r}. Pick a directory outside that rule, or update it in /permissions.`;
  }
  return `Can't move to ${gt.bold(e)} \u2014 /cd is limited to directories matching ${t.allowedPatterns.map(n => gt.bold(n)).join(", ")}. Pick a matching directory, or add a Cd rule in /permissions.`;
}
async function L4p(e, t, n) {
  let r = (n ?? "").trim();
  if (!r) return Sx.default.createElement(loadClaudeMdForDirectory, {
    message: "Usage: /cd <path>",
    args: "",
    onDone: () => e("Usage: /cd <path>")
  });
  let o = Rs(r);
  try {
    if (!(await ojn.stat(o)).isDirectory()) {
      let c = `${gt.bold(o)} is not a directory. Did you mean ${gt.bold(dqt.dirname(o))}?`;
      return Sx.default.createElement(loadClaudeMdForDirectory, {
        message: c,
        args: r,
        onDone: () => e(c)
      });
    }
  } catch (l) {
    let c = ln(l);
    if (c === "ENOENT" || c === "ENOTDIR" || c === "EACCES" || c === "EPERM") {
      let u = `Couldn't find a directory at ${gt.bold(o)}.`;
      return Sx.default.createElement(loadClaudeMdForDirectory, {
        message: u,
        args: r,
        onDone: () => e(u)
      });
    }
    throw l;
  }
  let s = o;
  try {
    s = await ojn.realpath(o);
  } catch {
    s = o;
  }
  if (s === Pt()) {
    let l = `Already in ${gt.bold(s)}.`;
    return Sx.default.createElement(loadClaudeMdForDirectory, {
      message: l,
      args: r,
      onDone: () => e(l)
    });
  }
  let i = erl({
    requestedPath: o,
    canonicalPath: s
  }, Lr(t));
  if (i.result !== "allowed") {
    let l = O4p(s, i);
    return Sx.default.createElement(loadClaudeMdForDirectory, {
      message: l,
      args: r,
      onDone: () => e(l)
    });
  }
  let a = async () => {
    try {
      let l = await call(s);
      e(`Moved to ${gt.bold(s)}`, {
        display: "system",
        metaMessages: [l]
      });
    } catch (l) {
      v(`/cd relocate failed: ${l}`, {
        level: "error"
      }), e(`Couldn't move to ${gt.bold(s)} \u2014 the directory may no longer exist, or the session couldn't be moved. Staying in ${gt.bold(Pt())}.`);
    }
  };
  if (lpt(s)) return await a(), null;
  return Sx.default.createElement(relocateSessionToDirectory, {
    directory: s,
    onConfirm: () => {
      pqt(s), a();
    },
    onCancel: () => {
      e(`Staying in ${gt.bold(Pt())}`);
    }
  });
}
var Bgo, ojn, dqt, Sx;
var orl = b(() => {
  au();
  pi();
  ct();
  mU();
  qs();
  n_();
  ts();
  rc();
  Lk();
  Je();
  Ct();
  Ww();
  nr();
  Xl();
  Ko();
  je();
  Or();
  St();
  mc();
  hO();
  Ba();
  lo();
  Pu();
  trl();
  hw();
  ay();
  yL();
  dg();
  za();
  Bgo = L(nt(), 1), ojn = require("fs/promises"), dqt = require("path"), Sx = L(Te(), 1);
});

export {rrl as Hol,loadClaudeMdForDirectory as Pqt,relocateSessionToDirectory as CdTrustPrompt,buildCdBlockedMessage as djp,call as pjp,O4p as mjp,L4p as fjp,Bgo as q_o,ojn as Kjn,dqt as Oqt,Sx as wx,orl as Iol};
