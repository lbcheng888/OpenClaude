// @ts-nocheck
import {f6e as Kqe,iy,vC as TC} from "../../vendor/m5145.ts";
import {hP as AP,ry} from "./2772_withFileTypes.ts";
import {Rm as Dm,zE as jE} from "../../vendor/m125.ts";
import {Jl as Yl,ch as uh} from "../../vendor/m2727.ts";
import {uI as oI,Ax as dx} from "../../vendor/m5146.ts";
import {mainAgentId as ws,lt as ct} from "../session/0131_sent.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {Ie as He,Oe as Pe,ln as cn} from "../telemetry/0594_feature_name.ts";
import {Bh as Mh,bC as gC} from "../session/2784_uuid.ts";
import {recordSidechainTranscript as uce,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {V7 as D7,B8 as T8,S_ as y_} from "./1454_agentType.ts";
import {caughtError as h6,u_e as Yge} from "../permissions/4401_content.ts";
import {cce as kge,S2t as ZUt} from "../../vendor/m3889.ts";
import {$f as Wf,HF as EF} from "../core/2683_HF.ts";
import {PA as MA,Lv as Hv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function PPp() {
  let e = qGa.randomBytes(8),
    t = "s";
  for (let n = 0; n < 8; n++) t += FGa[e[n] % FGa.length];
  return t;
}
function OPp(e, t, n, r) {
  let o = PPp();
  Kqe(o, AP(Dm(o)));
  let s = r ?? Yl(),
    i = n ?? DPp,
    a = {
      ...oI(o, "local_agent", e),
      type: "local_agent",
      status: "running",
      agentId: o,
      ownerAgentId: ws(),
      prompt: e,
      selectedAgent: i,
      agentType: "main-session",
      abortController: s,
      retrieved: false,
      lastReportedToolCount: 0,
      lastReportedTokenCount: 0,
      isBackgrounded: true,
      pendingMessages: [],
      retain: false,
      diskLoaded: false
    };
  return v(`[LocalMainSessionTask] Registering task ${o} with description: ${e}`), t.register(a), v(`[LocalMainSessionTask] After registration, task ${o} exists in state: ${t.get(o) !== undefined}`), {
    taskId: o,
    abortSignal: s.signal
  };
}
function UGa(e, t, n) {
  let r = t ? "completed" : "failed",
    o,
    s;
  if (n.update(e, i => {
    if (i.status !== "running") return i;
    return o = i.toolUseId, s = i.description, {
      ...i,
      status: r,
      endTime: Date.now(),
      notified: true
    };
  }), n.updateTranscript(e, i => ({
    ...i,
    messages: i.messages.length ? [i.messages.at(-1)] : []
  })), iy(e), s === undefined) return;
  if (t) He("task_main_session");else Pe("task_main_session", "task_main_session_failed");
  Mh(e, r, {
    toolUseId: o,
    summary: s
  });
}
function l3t(e) {
  if (typeof e !== "object" || e === null || !("type" in e) || !("agentType" in e)) return false;
  return e.type === "local_agent" && e.agentType === "main-session";
}
function jGa({
  messages: e,
  queryParams: t,
  description: n,
  taskRegistry: r,
  agentDefinition: o,
  setAppState: s
}) {
  let {
    taskId: i,
    abortSignal: a
  } = OPp(n, r, o);
  uce(e, i).catch(u => v(`bg-session initial transcript write failed: ${u}`));
  let l = t.toolUseContext.agentContext,
    c = {
      agentId: i,
      parentAgentId: D7(l) ? undefined : l.agentId,
      agentType: "subagent",
      subagentName: "main-session",
      isBuiltIn: true,
      isMainSession: true
    };
  return T8(c, async () => {
    let u = [...e],
      d = null;
    try {
      let p = [],
        m = 0,
        f = 0,
        A = e.at(-1)?.uuid ?? null;
      for await (let h of h6({
        messages: u,
        ...t,
        toolUseContext: {
          ...t.toolUseContext,
          agentId: Dm(i),
          agentContext: c
        }
      })) {
        if (a.aborted) {
          let g = false;
          if (r.update(i, _ => (g = _.notified === true, g ? _ : {
            ..._,
            notified: true
          })), !g) Mh(i, "stopped", {
            summary: n
          });
          return;
        }
        if (h.type === "progress" && h.data.type === "repl_tool_call" && h.data.phase === "start") {
          if (p.push({
            toolName: h.data.toolName,
            input: h.data.toolInput
          }), p.length > $Ga) p.shift();
          let g = p.at(-1);
          r.update(i, _ => {
            if (_.progress?.recentActivities?.at(-1) === g) return _;
            return {
              ..._,
              progress: {
                tokenCount: f,
                toolUseCount: m,
                recentActivities: [...p]
              }
            };
          });
          continue;
        }
        if (h.type === "active_goal") {
          s?.(g => g.activeGoal === h.value ? g : {
            ...g,
            activeGoal: h.value
          });
          continue;
        }
        if (h.type !== "user" && h.type !== "assistant" && h.type !== "system") continue;
        if (u.push(h), d = kge(u, h, d), uce([h], i, A).catch(g => v(`bg-session transcript write failed: ${g}`)), A = h.uuid, h.type === "assistant") {
          for (let g of h.message.content) if (g.type === "text") f += Wf(g.text);else if (g.type === "tool_use") {
            if (m++, g.name === MA) continue;
            let _ = {
              toolName: g.name,
              input: g.input
            };
            if (p.push(_), p.length > $Ga) p.shift();
          }
        }
        r.update(i, g => {
          let _ = g.progress;
          if (_?.tokenCount === f && _.toolUseCount === m) return g;
          return {
            ...g,
            progress: {
              tokenCount: f,
              toolUseCount: m,
              recentActivities: _?.toolUseCount === m ? _.recentActivities : [...p]
            }
          };
        }), r.updateTranscript(i, g => g.messages === u ? g : {
          ...g,
          messages: u
        });
      }
      UGa(i, true, r);
    } catch (p) {
      Ie(p), UGa(i, false, r);
    } finally {
      if (d) u.push(...d.preserved);
    }
  }), i;
}
var qGa,
  DPp,
  FGa = "0123456789abcdefghijklmnopqrstuvwxyz",
  $Ga = 5;
var x3n = b(() => {
  ct();
  Yge();
  cn();
  ZUt();
  EF();
  dx();
  Hv();
  jE();
  uh();
  y_();
  je();
  wn();
  gC();
  ry();
  za();
  TC();
  qGa = require("crypto"), DPp = {
    agentType: "main-session",
    whenToUse: "Main session query",
    source: "userSettings",
    getSystemPrompt: () => ""
  };
});

export {PPp as pMp,OPp as mMp,UGa as s7a,l3t as I3t,jGa as l7a,qGa as a7a,DPp as dMp,FGa as o7a,$Ga as i7a,x3n as f4n};
