// @ts-nocheck
import {writeRemoteAgentMetadata as Xro,deleteRemoteAgentMetadata as EUt,listRemoteAgentMetadata as Qro,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {oca as Gaa,sca as Vaa} from "../telemetry/3322_allowBundle.ts";
import {Ie as He,Oe as Pe,Ul as Fl,ln as cn} from "../telemetry/0594_feature_name.ts";
import {SO as pO,fp as Ap,J_,sbe as jSe,bO as mO,__ as g_,Mf as Ff,IMe as pMe,d7e as KVe,initKp as Dp} from "../../vendor/m609.ts";
import {mh,flt as Kat,gDa as s0a,iy,vC as TC} from "../../vendor/m5145.ts";
import {_m as wm,sA as uA} from "../../vendor/m2782.ts";
import {mainAgentId as ws,lt as ct} from "../session/0131_sent.ts";
import {Dl as Ol,wc as Uc,lo} from "./5190_userPromptCount.ts";
import {Pke as hke,j0n as o0n} from "./3319_todos.ts";
import {Kw as jw,mP as pP} from "./2698_allErrors.ts";
import {tNt as L1t,MJr as NYr} from "../../vendor/m3314.ts";
import {d9 as J$,uI as oI,Ax as dx} from "../../vendor/m5146.ts";
import {fetchSession as ife,Dw as Rw} from "../api/2190_updateSessionTitle.ts";
import {pollRemoteSessionEvents as CHe,RP as wP,S6 as l6} from "../tui/3870_validateSessionRepository.ts";
import {Le as Oe,qt as Wt,Xt} from "../config/0228_encoding.ts";
import {bT as AT} from "../core/2797_toInfraSessionId.ts";
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {Ct,logEvent as j} from "../../vendor/m131.ts";
import {bC as gC,Bh as Mh} from "../session/2784_uuid.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
// @ts-nocheck
function n0a(e) {
  let t = e.findIndex(o => o.type === "system" && o.subtype === "task_notification" && o.status !== undefined);
  if (t === -1) return null;
  let n = -1;
  for (let o = t + 1; o < e.length; o++) if (e[o].type === "result") {
    n = o;
    break;
  }
  if (n === -1) return null;
  for (let o = n - 1; o > t; o--) {
    let s = e[o];
    if (s.type === "assistant") {
      let i = s.message.content.filter(a => a.type === "text").map(a => "text" in a ? a.text : "").join(`
`).trim();
      if (i) return i;
    }
  }
  let r = e[t];
  return r.type === "system" && r.subtype === "task_notification" ? r.summary ?? "Remote dynamic workflow completed" : "Remote dynamic workflow completed";
}
function ofp(e) {
  return XwO.includes(e ?? "");
}
async function ifp(e) {
  try {
    await Xro(e.taskId, e);
  } catch (t) {
    v(`persistRemoteAgentMetadata failed: ${String(t)}`);
  }
}
async function lYH(e) {
  try {
    await EUt(e);
  } catch (t) {
    v(`removeRemoteAgentMetadata failed: ${String(t)}`);
  }
}
async function Vle({
  allowBundle: e = false,
  cwd: t
} = {}) {
  let n = await Gaa({
    allowBundle: e,
    cwd: t
  });
  if (n.length > 0) return {
    eligible: false,
    errors: n
  };
  return {
    eligible: true
  };
}
function ste(e) {
  switch (e.type) {
    case "not_logged_in":
      return "Please run /login and sign in with your Claude.ai account (not Console).";
    case "not_in_git_repo":
      return `Cloud agents require a git repository (checked: ${e.cwd}). Initialize git or run from a git repository.`;
    case "no_git_remote":
      return "Cloud agents require a GitHub remote. Add one with `git remote add origin REPO_URL`.";
    case "github_app_not_installed":
      return `The Claude GitHub app must be installed on this repository first.
https://github.com/apps/claude/installations/new`;
    case "policy_blocked":
      return "Cloud sessions are disabled by your organization's policy. Contact your organization admin to enable them.";
  }
}
function XyK(events, t, n, r, o) {
  if (!PwO(events, r)) return;
  if (n === "completed") He("task_remote_agent");else if (n === "failed") Pe("task_remote_agent", "task_remote_agent_failed");
  let s = n === "completed" ? "completed successfully" : n === "failed" ? "failed" : "was stopped",
    i = o ? `
<${pO}>${o}</${pO}>` : "",
    a = mh(events),
    l = `<${Ap}>
<${J_}>${events}</${J_}>${i}
<${jSe}>remote_agent</${jSe}>
<${mO}>${a}</${mO}>
<${g_}>${n}</${g_}>
<${Ff}>Remote task "${t}" ${s}</${Ff}>
</${Ap}>`;
  wm({
    value: l,
    mode: "task-notification",
    agentId: ws(),
    priority: "next"
  });
}
function PwO(taskType, t) {
  let n = false;
  return t.update(taskType, r => {
    if (r.notified) return r;
    return n = true, {
      ...r,
      notified: true
    };
  }), n;
}
function ZwO(metadata) {
  for (let o = metadata.length - 1; o >= 0; o--) {
    let s = metadata[o];
    if (s?.type === "system" && (s.subtype === "hook_progress" || s.subtype === "hook_response")) {
      let i = Ol(s.stdout, pMe);
      if (i?.trim()) return i.trim();
    }
  }
  for (let o = metadata.length - 1; o >= 0; o--) {
    let s = metadata[o];
    if (s?.type !== "assistant") continue;
    let i = Uc(s.message.content, `
`),
      a = Ol(i, pMe);
    if (a?.trim()) return a.trim();
  }
  let t = metadata.filter(o => o.type === "system" && (o.subtype === "hook_progress" || o.subtype === "hook_response")).map(o => o.stdout).join(""),
    n = Ol(t, pMe);
  if (n?.trim()) return n.trim();
  return metadata.filter(o => o.type === "assistant").map(o => Uc(o.message.content, `
`)).join(`
`).trim() || null;
}
function lYH_2(taskId) {
  for (let r = taskId.length - 1; r >= 0; r--) {
    let o = taskId[r];
    if (o?.type === "system" && (o.subtype === "hook_progress" || o.subtype === "hook_response")) {
      let s = Ol(o.stdout, pMe);
      if (s?.trim()) return s.trim();
    }
  }
  for (let r = taskId.length - 1; r >= 0; r--) {
    let o = taskId[r];
    if (o?.type !== "assistant") continue;
    let s = Uc(o.message.content, `
`),
      i = Ol(s, pMe);
    if (i?.trim()) return i.trim();
  }
  let t = taskId.filter(r => r.type === "system" && (r.subtype === "hook_progress" || r.subtype === "hook_response")).map(r => r.stdout).join(""),
    n = Ol(t, pMe);
  if (n?.trim()) return n.trim();
  return null;
}
function RGH(e, t, n, r) {
  if (!PwO(e, n)) return;
  He("task_remote_agent");
  let s = `<${Ap}>
<${J_}>${e}</${J_}>
<${jSe}>remote_agent</${jSe}>
<${g_}>completed</${g_}>
<${Ff}>Cloud review completed</${Ff}>
</${Ap}>
The cloud review produced the following findings:

${t}${r ? `

The user launched this review with --fix: apply these findings to the local working tree now. Skip findings that are wrong or not worth fixing, and run the relevant checks after.` : ""}`;
  wm({
    value: s,
    mode: "task-notification",
    agentId: ws(),
    priority: "next"
  });
}
function nYH(error, t, n) {
  if (!PwO(error, n)) return;
  Pe("task_remote_agent", "task_remote_agent_review_failed");
  let r = `<${Ap}>
<${J_}>${error}</${J_}>
<${jSe}>remote_agent</${jSe}>
<${g_}>failed</${g_}>
<${Ff}>Cloud review failed: ${t}</${Ff}>
</${Ap}>
Cloud review did not produce output (${t}). Tell the user to retry /code-review ultra, or use /review for a local review instead.`;
  wm({
    value: r,
    mode: "task-notification",
    agentId: ws(),
    priority: "next"
  });
}
function Eqq(taskId) {
  let t = GwO(taskId);
  if (t.length > 0) return t;
  return Sqq(taskId);
}
function Sqq(taskId) {
  let t = taskId.findLast(o => o.type === "assistant" && o.message.content.some(s => s.type === "tool_use" && s.name === hke.name));
  if (!t) return [];
  let n = t.message.content.find(o => o.type === "tool_use" && o.name === hke.name)?.input;
  if (!n) return [];
  let r = hke.inputSchema.safeParse(n);
  if (!r.success) return [];
  return r.data.todos;
}
function GwO(events) {
  let t = new Map(),
    n = new Map();
  for (let r of events) if (r.type === "assistant") for (let o of r.message.content) {
    if (o.type !== "tool_use") continue;
    if (o.name === jw) {
      let s = NwO().safeParse(o.input);
      if (!s.success) continue;
      t.set(o.id, {
        content: s.data.subject,
        activeForm: s.data.activeForm ?? s.data.subject,
        status: "pending"
      });
    } else if (o.name === pP) {
      let s = L1t(o.input),
        i = VwO().safeParse(s?.input ?? o.input);
      if (!i.success) continue;
      let {
        taskId: a,
        status: l,
        subject: c,
        activeForm: u
      } = i.data;
      if (l === "deleted") {
        n.delete(a);
        continue;
      }
      let d = n.get(a);
      n.set(a, {
        content: c ?? d?.content ?? a,
        activeForm: u ?? d?.activeForm ?? c ?? a,
        status: l ?? d?.status ?? "pending"
      });
    }
  } else if (r.type === "user") {
    let o = r.message.content;
    if (typeof o === "string") continue;
    for (let s of o) {
      if (s.type !== "tool_result") continue;
      let i = t.get(s.tool_use_id);
      if (!i) continue;
      if (s.is_error) {
        t.delete(s.tool_use_id);
        continue;
      }
      let a = "";
      if (typeof s.content === "string") a = s.content;else if (Array.isArray(s.content)) a = Uc(s.content);
      let l = a.match(kwO)?.[1];
      if (!l) continue;
      if (t.delete(s.tool_use_id), !n.has(l)) n.set(l, i);
    }
  }
  return [...n.values(), ...t.values()];
}
function cS6(events) {
  let {
      remoteTaskType: t,
      session: n,
      command: r,
      context: o,
      toolUseId: s,
      isRemoteReview: i,
      applyFixesOnComplete: a,
      isUltraplan: l,
      isLongRunning: c,
      remoteTaskMetadata: u
    } = events,
    d = J$("remote_agent");
  Kat(d);
  let fromAllHooks = {
    ...oI(d, "remote_agent", n.title, s),
    type: "remote_agent",
    remoteTaskType: t,
    status: "running",
    sessionId: n.id,
    command: r,
    title: n.title,
    todoList: [],
    log: [],
    isRemoteReview: i,
    applyFixesOnComplete: a,
    isUltraplan: l,
    isLongRunning: c,
    pollStartedAt: Date.now(),
    remoteTaskMetadata: u
  };
  o.taskRegistry.register(fromAllHooks), ifp({
    taskId: d,
    remoteTaskType: t,
    sessionId: n.id,
    title: n.title,
    command: r,
    spawnedAt: Date.now(),
    toolUseId: s,
    isUltraplan: l,
    isRemoteReview: i,
    applyFixesOnComplete: a,
    isLongRunning: c,
    remoteTaskMetadata: u
  });
  let m = LwO(d, o);
  return {
    taskId: d,
    sessionId: n.id,
    cleanup: m
  };
}
async function RwO(taskId) {
  try {
    await Fl("task_remote_agent_restore", () => PyK(taskId));
  } catch (t) {
    v(`restoreRemoteAgentTasks failed: ${String(t)}`);
  }
}
async function PyK(taskId) {
  let t = await Qro();
  if (t.length === 0) return;
  for (let n of t) {
    let r;
    try {
      r = (await ife(n.sessionId)).session_status;
    } catch (s) {
      if (s instanceof Error && s.message.startsWith("Session not found:")) v(`restoreRemoteAgentTasks: dropping ${n.taskId} (404: ${String(s)})`), lYH(n.taskId);else v(`restoreRemoteAgentTasks: skipping ${n.taskId} (recoverable: ${String(s)})`);
      continue;
    }
    if (r === "archived") {
      lYH(n.taskId);
      continue;
    }
    let o = {
      ...oI(n.taskId, "remote_agent", n.title, n.toolUseId),
      type: "remote_agent",
      remoteTaskType: ofp(n.remoteTaskType) ? n.remoteTaskType : "remote-agent",
      status: "running",
      sessionId: n.sessionId,
      command: n.command,
      title: n.title,
      todoList: [],
      log: [],
      isRemoteReview: n.isRemoteReview,
      applyFixesOnComplete: n.applyFixesOnComplete,
      isUltraplan: n.isUltraplan,
      isLongRunning: n.isLongRunning,
      startTime: n.spawnedAt,
      pollStartedAt: Date.now(),
      remoteTaskMetadata: n.remoteTaskMetadata
    };
    taskId.taskRegistry.register(o), Kat(n.taskId), LwO(n.taskId, taskId);
  }
}
function LwO(events, t) {
  let n = true,
    r = 1000,
    o = 1800000,
    s = 5,
    i = 0,
    a = null,
    l = [],
    c = null,
    u = async () => {
      if (!n) return;
      try {
        let d = t.taskRegistry.get(events);
        if (!d || d.status !== "running") return;
        let p = await CHe(d.sessionId, a);
        a = p.lastEventId;
        let m = p.newEvents.length > 0;
        if (m) {
          l = [...l, ...p.newEvents];
          let x = p.newEvents.map(I => {
            if (I.type === "assistant") return I.message.content.filter(H => H.type === "text").map(H => "text" in H ? H.text : "").join(`
`);
            return Oe(I);
          }).join(`
`);
          if (x) s0a(events, x + `
`);
        }
        if (p.sessionStatus === "archived") {
          t.taskRegistry.update(events, x => x.status === "running" ? {
            ...x,
            status: "completed",
            endTime: Date.now()
          } : x), XyK(events, d.title, "completed", t.taskRegistry, d.toolUseId), iy(events), lYH(events);
          return;
        }
        let f = d.remoteTaskType === "remote-workflow" ? async () => n0a(l) : WwO.get(d.remoteTaskType);
        if (f) {
          let x = await f(d.remoteTaskMetadata);
          if (x !== null) {
            t.taskRegistry.update(events, I => I.status === "running" ? {
              ...I,
              status: "completed",
              endTime: Date.now()
            } : I), XyK(events, x, "completed", t.taskRegistry, d.toolUseId), iy(events), lYH(events);
            return;
          }
        }
        let A = d.isUltraplan || d.isLongRunning || f ? undefined : l.findLast(x => x.type === "result");
        if (d.isRemoteReview && m && c === null) c = lYH_2(p.newEvents);
        let h;
        if (d.isRemoteReview && m) {
          let x = `<${KVe}>`,
            I = `</${KVe}>`;
          for (let H of p.newEvents) if (H.type === "system" && (H.subtype === "hook_progress" || H.subtype === "hook_response")) {
            let P = H.stdout,
              O = P.lastIndexOf(I),
              D = O === -1 ? -1 : P.lastIndexOf(x, O);
            if (D !== -1 && O > D) try {
              let M = Wt(P.slice(D + x.length, O));
              h = {
                stage: M.stage,
                bugsFound: M.bugs_found ?? 0,
                bugsVerified: M.bugs_verified ?? 0,
                bugsRefuted: M.bugs_refuted ?? 0
              };
            } catch {}
          }
        }
        let g = l.some(x => x.type === "assistant" || d.isRemoteReview && x.type === "system" && (x.subtype === "hook_progress" || x.subtype === "hook_response"));
        if (p.sessionStatus === "idle" && !m && g) i++;else i = 0;
        let _ = i >= s,
          y = l.some(x => x.type === "system" && (x.subtype === "hook_started" || x.subtype === "hook_progress" || x.subtype === "hook_response") && x.hook_event === "SessionStart"),
          T = l.some(x => x.type === "assistant"),
          S = d.isRemoteReview && (c !== null || !y && _ && T),
          C = d.isRemoteReview && Date.now() - d.pollStartedAt > o,
          R = A ? A.subtype === "success" ? "completed" : "failed" : S || C ? "completed" : l.length > 0 ? "running" : "starting",
          k = false;
        if (t.taskRegistry.update(events, x => {
          if (x.status !== "running") return k = true, x;
          if (!m && (R === "running" || R === "starting")) return x;
          return {
            ...x,
            status: R === "starting" ? "running" : R,
            log: l,
            todoList: m ? Eqq(l) : x.todoList,
            reviewProgress: h ?? x.reviewProgress,
            endTime: A || S || C ? Date.now() : undefined
          };
        }), k) return;
        if (A || S || C) {
          let x = A && A.subtype !== "success" ? "failed" : "completed";
          if (d.isRemoteReview) {
            let I = c ?? ZwO(l);
            if (I && x === "completed") {
              RGH(events, I, t.taskRegistry, d.applyFixesOnComplete), iy(events), lYH(events);
              return;
            }
            t.taskRegistry.update(events, P => ({
              ...P,
              status: "failed"
            }));
            let H = A && A.subtype !== "success" ? "cloud session returned an error" : C && !S ? "cloud session exceeded 30 minutes" : "no review output \u2014 orchestrator may have exited early";
            nYH(events, H, t.taskRegistry), iy(events), lYH(events);
            return;
          }
          XyK(events, d.title, x, t.taskRegistry, d.toolUseId), iy(events), lYH(events);
          return;
        }
      } catch (d) {
        v(`Remote session poll failed for task ${events}: ${String(d)}`, {
          level: "error"
        }), i = 0;
        try {
          let p = t.taskRegistry.get(events);
          if (p?.isRemoteReview && p.status === "running" && Date.now() - p.pollStartedAt > o) {
            t.taskRegistry.update(events, m => ({
              ...m,
              status: "failed",
              endTime: Date.now()
            })), nYH(events, "cloud session exceeded 30 minutes", t.taskRegistry), iy(events), lYH(events);
            return;
          }
        } catch {}
      }
      if (n) setTimeout(u, r);
    };
  return u(), () => {
    n = false;
  };
}
function hwO(events) {
  return AT(events, process.env.SESSION_INGRESS_URL, {
    from: "cli"
  });
}
var XwO, WwO, kwO, NwO, VwO, CmH;
var zo = b(() => {
  ct();
  Xr();
  Dp();
  cn();
  Ct();
  dx();
  NYr();
  o0n();
  Vaa();
  je();
  uA();
  lo();
  gC();
  za();
  Xt();
  TC();
  Rw();
  wP();
  XwO = ["remote-agent", "ultraplan", "ultrareview", "autofix-pr", "remote-workflow"];
  WwO = new Map();
  kwO = /^Task #(\S+) created successfully/, NwO = Re(() => E.object({
    subject: E.string(),
    activeForm: E.string().optional()
  })), VwO = Re(() => E.object({
    taskId: E.string(),
    status: E.enum(["pending", "in_progress", "completed", "deleted"]).optional(),
    subject: E.string().optional(),
    activeForm: E.string().optional()
  }));
  CmH = {
    name: "RemoteAgentTask",
    type: "remote_agent",
    async kill(taskId, registry, setAppState) {
      let toolUseId,
        description,
        sessionId,
        isUltraplan = false,
        pollStartedAt = 0,
        wasRunning = false;
      if (registry.update(taskId, task => {
        if (task.status !== "running") return task;
        return toolUseId = task.toolUseId, description = task.description, sessionId = task.sessionId, isUltraplan = task.isUltraplan ?? false, pollStartedAt = task.pollStartedAt, wasRunning = true, {
          ...task,
          status: "killed",
          notified: true,
          endTime: Date.now()
        };
      }), wasRunning) {
        if (Mh(taskId, "stopped", {
          toolUseId: toolUseId,
          summary: description
        }), sessionId) l6(sessionId).catch(error => v(`RemoteAgentTask archive failed: ${String(error)}`));
        if (isUltraplan) j("tengu_ultraplan_stopped", {
          duration_ms: Date.now() - pollStartedAt
        }), setAppState(state => state.ultraplanSessionUrl || state.ultraplanPendingChoice ? {
          ...state,
          ultraplanSessionUrl: undefined,
          ultraplanPendingChoice: undefined
        } : state);
      }
      iy(taskId), lYH(taskId), v(`RemoteAgentTask ${taskId} killed, archiving session ${sessionId ?? "unknown"}`);
    }
  };
});

export {n0a as fDa,ofp as Rhp,ifp as khp,lYH as Uge,Vle as rce,ste as hte,XyK as zoo,PwO as Yoo,ZwO as Hhp,lYH_2 as aFn,RGH as Ihp,nYH as ADa,Eqq as Dhp,Sqq as Php,GwO as Nhp,cS6 as $ge,RwO as qUt,PyK as Bhp,LwO as hDa,hwO as oce,XwO as whp,WwO as xhp,kwO as Ohp,NwO as Lhp,VwO as Mhp,CmH as y4e,zo as OY};
