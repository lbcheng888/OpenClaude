// @ts-nocheck
import {H6e as c6e,LHe as gHe} from "../hooks/4340_isCollapsible.ts";
import {bf as Gf,aq as H5} from "../tools/2698_allErrors.ts";
import {PA as MA,Lv as Hv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {Cl as vl,Ri} from "../tools/2227_userFacingName.ts";
import {Vqe as vqe,MY as bY} from "./4311_register.ts";
import {nR as Qw,uI as oI,Ax as dx} from "../../vendor/m5146.ts";
import {phe as JAe,_m as wm,pxe as zRe,sA as uA} from "../../vendor/m2782.ts";
import {Rm as Dm,zE as jE} from "../../vendor/m125.ts";
import {getIsNonInteractiveSession as kr,mainAgentId as ws,getSdkAgentProgressSummariesEnabled as UTe,lt as ct} from "../session/0131_sent.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {mh,iy,f6e as Kqe,vC as TC} from "../../vendor/m5145.ts";
import {SO as pO,$mr as Qpr,qmr as Zpr,jmr as emr,fp as Ap,J_,bO as mO,__ as g_,Mf as Ff,initKp as Dp} from "../../vendor/m609.ts";
import {isAmberSentinelEnabled as $p,QH as KH} from "../../vendor/m2784.ts";
import {Ylt as Rlt,XFn as fFn} from "./3914_type.ts";
import {Ie as He,Oe as Pe,ln as cn} from "../telemetry/0594_feature_name.ts";
import {Q4n as d4n,qfo as Omo} from "../../vendor/m4340.ts";
import {hP as AP,ry} from "./2772_withFileTypes.ts";
import {rN as K1,Jl as Yl,ch as uh} from "../../vendor/m2727.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function pvO() {
  return {
    toolUseCount: 0,
    latestInputTokens: 0,
    cumulativeOutputTokens: 0,
    recentActivities: []
  };
}
function sm6(agentId) {
  return agentId.latestInputTokens + agentId.cumulativeOutputTokens;
}
function tm6(H, _, q, K) {
  if (_.type === "progress" && _.data.type === "repl_tool_call" && _.data.phase === "start") {
    let {
        toolName: T,
        toolInput: z
      } = _.data,
      $ = K ? c6e(T, z, K) : undefined;
    if (H.recentActivities.push({
      toolName: T,
      input: z,
      activityDescription: q?.(T, z),
      isSearch: $?.isSearch,
      isRead: $?.isRead
    }), H.recentActivities.length > slK) H.recentActivities.shift();
    return;
  }
  if (_.type !== "assistant") return;
  let O = _.message.usage;
  H.latestInputTokens = O.input_tokens + (O.cache_creation_input_tokens ?? 0) + (O.cache_read_input_tokens ?? 0), H.cumulativeOutputTokens += O.output_tokens;
  for (let T of _.message.content) {
    if (T.type !== "tool_use") continue;
    if (H.toolUseCount++, T.name === Gf) continue;
    if (T.name === MA) continue;
    let z = T.input,
      $ = K ? c6e(T.name, z, K) : undefined;
    H.recentActivities.push({
      toolName: T.name,
      input: z,
      activityDescription: q?.(T.name, z),
      isSearch: $?.isSearch,
      isRead: $?.isRead
    });
  }
  while (H.recentActivities.length > slK) H.recentActivities.shift();
}
function em6(querySource) {
  return {
    toolUseCount: querySource.toolUseCount,
    tokenCount: sm6(querySource),
    lastActivity: querySource.recentActivities.at(-1),
    recentActivities: [...querySource.recentActivities]
  };
}
function BvO(toolUseContext) {
  return (_, q) => vl(toolUseContext, _)?.getActivityDescription?.(q) ?? undefined;
}
function TTq(sessionState) {
  return sessionState.keepaliveReasons ?? new Set();
}
function zTq(compactParams) {
  return compactParams.status === "completed" && TTq(compactParams).size > 0;
}
function am6(agentKey, expectedAbortController) {
  if (agentKey.retain) return;
  if (expectedAbortController.park && TTq(agentKey).size > 0) return;
  return Date.now() + vqe;
}
function oiK(agentId) {
  return typeof agentId === "object" && agentId !== null && "type" in agentId && agentId.type === "local_agent";
}
function UvO(borrowFromAgentId, abortSignal) {
  if (!borrowFromAgentId) return;
  let q = abortSignal.get(borrowFromAgentId);
  return oiK(q) && q.agentType !== "main-session" ? borrowFromAgentId : undefined;
}
function $Tq(agentId) {
  return oiK(agentId) && agentId.agentType !== "main-session";
}
function YTq(compactApplyParams, _, q) {
  if (!compactApplyParams) return;
  q.update(compactApplyParams, K => {
    if (!oiK(K) || TTq(K).has(_)) return K;
    return {
      ...K,
      keepaliveReasons: new Set(TTq(K)).add(_)
    };
  });
}
function FvO(outcome, querySourceKey, waitedMs) {
  if (!outcome) return;
  waitedMs.update(outcome, K => {
    if (!oiK(K) || !TTq(K).has(querySourceKey)) return K;
    let O = new Set(TTq(K));
    O.delete(querySourceKey);
    let T = O.size === 0 && Qw(K.status) && !K.retain;
    return {
      ...K,
      keepaliveReasons: O,
      ...(T && K.evictAfter === undefined && {
        evictAfter: Date.now() + vqe
      })
    };
  });
}
function U5_(outcomeKind, borrowedEntry) {
  if (!outcomeKind) return false;
  let q = borrowedEntry.get(outcomeKind);
  return oiK(q) && TTq(q).size > 0;
}
function ATq(messages, targetUuid) {
  if (!messages) return false;
  let q = targetUuid.get(messages);
  if (!oiK(q)) return false;
  for (let K of TTq(q)) if (K.startsWith("agent:")) return true;
  return false;
}
function Hp6(entry, reason) {
  let q = reason.get(entry);
  if (!oiK(q)) return;
  let K = new Set();
  for (let O of JAe()) if (O.mode === "task-notification" && O.agentId === Dm(entry) && O.taskId) K.add(O.taskId);
  for (let O of TTq(q)) {
    if (!O.startsWith("agent:")) continue;
    let T = O.slice(6);
    if (K.has(T)) continue;
    let z = reason.get(T);
    if (!z || oiK(z) && z.notified) FvO(entry, O, reason);
  }
}
function _p6(agentId, clearReason, querySource, K = {}) {
  let O = {
    text: clearReason,
    origin: K.origin,
    isMeta: K.isMeta ?? false
  };
  querySource.update(agentId, T => ({
    ...T,
    pendingMessages: [...T.pendingMessages, O]
  }));
}
function tlK(H, _, q) {
  q.updateTranscript(H, K => ({
    ...K,
    messages: [...K.messages, _]
  }));
}
function Vm6(H, _) {
  let q = _.get(H);
  if (!oiK(q) || q.pendingMessages.length === 0) return [];
  let K = q.pendingMessages;
  return _.update(H, O => ({
    ...O,
    pendingMessages: []
  })), K;
}
function VmH({
  taskId: H,
  description: __2,
  status: q,
  error: K,
  taskRegistry: O,
  finalMessage: T_2,
  usage: z,
  toolUseId: $,
  worktreePath: Y,
  worktreeBranch: A_2,
  ownerAgentId: w_2
}) {
  let f_2 = false,
    j = false,
    J;
  O.update(H, E => {
    if (j = true, J = E.ownerAgentId, E.notified) return E;
    return f_2 = true, {
      ...E,
      notified: true
    };
  }), J ??= w_2;
  let D = J ? O.get(J) : undefined,
    X = oiK(D) && zTq(D) && !kr() || oiK(D) && D.status === "running";
  if (!(f_2 && X)) FvO(J, `agent:${H}`, O);
  if (!f_2) {
    v(`[enqueueAgentNotification] skipped taskId=${H} status=${q} taskPresent=${j} reason=${j ? "already-notified" : "task-not-in-registry"}`, {
      level: j ? "debug" : "warn"
    });
    return;
  }
  O.abortSpeculation();
  let P = q === "completed" ? `Agent "${__2}" came to rest` : q === "failed" ? `Agent "${__2}" came to rest with an error: ${K || "Unknown error"}` : `Agent "${__2}" came to rest (stopped by user)`,
    Z = mh(H),
    W = $ ? `
<${pO}>${$}</${pO}>` : "",
    G = T_2 ? `
<result>${$p(T_2)}</result>` : "",
    R_2 = z ? `
<usage><subagent_tokens>${z.totalTokens}</subagent_tokens><tool_uses>${z.toolUses}</tool_uses><duration_ms>${z.durationMs}</duration_ms></usage>` : "",
    h_2 = Y ? `
<${Qpr}><${Zpr}>${Y}</${Zpr}>${A_2 ? `<${emr}>${A_2}</${emr}>` : ""}</${Qpr}>` : "",
    y_2 = `<${Ap}>
<${J_}>${H}</${J_}>${W}
<${mO}>${Z}</${mO}>
<${g_}>${q}</${g_}>
<${Ff}>${$p(P)}</${Ff}>
<note>A task-notification fires each time this agent comes to rest with no live background children of its own. The user can send it another message and resume it, so the same task-id may notify more than once.</note>${G}${R_2}${h_2}
</${Ap}>`;
  wm({
    value: y_2,
    mode: "task-notification",
    priority: "next",
    agentId: X && J ? Dm(J) : ws(),
    taskId: H
  });
}
function XOq(H, _) {
  let q = _.get(H);
  if (oiK(q) && zTq(q) && !kr()) return;
  let K = zRe(O => {
    if (O.mode !== "task-notification" || O.agentId !== Dm(H)) return false;
    let T = O.taskId ? _.get(O.taskId) : undefined;
    return oiK(T) && T.ownerAgentId === H;
  });
  for (let O of K) wm({
    ...O,
    agentId: ws()
  });
}
function $GH(H, _) {
  let q = _.get(H);
  if (oiK(q) && zTq(q) && !q.notified) {
    let O = q.result;
    VmH({
      taskId: H,
      description: q.description,
      status: "killed",
      taskRegistry: _,
      finalMessage: O ? O.content.map(T => T.text).join(`
`) : undefined,
      usage: O ? {
        totalTokens: O.totalTokens,
        toolUses: O.totalToolUseCount,
        durationMs: O.totalDurationMs
      } : undefined,
      toolUseId: q.toolUseId,
      ownerAgentId: q.ownerAgentId
    });
  }
  let K = false;
  if (_.update(H, O => {
    if (O.status !== "running" && !zTq(O)) return O;
    return K = true, O.abortController?.abort(), {
      ...O,
      status: "killed",
      notified: O.notified || zTq(O),
      endTime: Date.now(),
      keepaliveReasons: new Set(),
      evictAfter: am6(O, {
        park: false
      }),
      abortController: undefined,
      selectedAgent: undefined
    };
  }), K) XOq(H, _), iy(H);
}
function elK(H, _) {
  for (let [q, K] of Object.entries(H)) if (oiK(K) && zTq(K)) $GH(q, _);
  for (let [q, K] of Object.entries(H)) if (K.type === "local_agent" && K.status === "running") $GH(q, _);
}
function ym6(H, _) {
  _.update(H, q => {
    if (q.notified) return q;
    return {
      ...q,
      notified: true
    };
  });
}
function fGK(H, _, q) {
  let K = false;
  if (q.update(H, O => {
    if (O.status !== "running") return O;
    let T = O.progress;
    if (T && T.toolUseCount === _.toolUseCount && T.tokenCount === _.tokenCount && T.lastActivity === _.lastActivity && (T.summary ?? _.summary) === T.summary && eNO(T.recentActivities, _.recentActivities)) return O;
    let z = T?.summary;
    return K = true, {
      ...O,
      progress: z ? {
        ..._,
        summary: z
      } : _
    };
  }), !K) return;
  q.updateTranscript(H, O => {
    let T = O.progress;
    if (T?.tokenCount === _.tokenCount && T.toolUseCount === _.toolUseCount) return O;
    return {
      ...O,
      progress: {
        tokenCount: _.tokenCount,
        toolUseCount: _.toolUseCount
      }
    };
  });
}
function eNO(H, _) {
  if (H === _) return true;
  if (!H || !_ || H.length !== _.length) return false;
  for (let q = 0; q < H.length; q++) if (H[q] !== _[q]) return false;
  return true;
}
function MZK(H, _, q) {
  let K = null;
  if (q.update(H, O => {
    if (O.status !== "running") return O;
    return K = {
      tokenCount: O.progress?.tokenCount ?? 0,
      toolUseCount: O.progress?.toolUseCount ?? 0,
      startTime: O.startTime,
      toolUseId: O.toolUseId,
      agentType: O.agentType
    }, {
      ...O,
      progress: {
        ...O.progress,
        toolUseCount: O.progress?.toolUseCount ?? 0,
        tokenCount: O.progress?.tokenCount ?? 0,
        summary: _
      }
    };
  }), K && UTe()) {
    let {
      tokenCount: O,
      toolUseCount: T,
      startTime: z,
      toolUseId: $,
      agentType: Y
    } = K;
    Rlt({
      taskId: H,
      toolUseId: $,
      description: _,
      subagentType: Y,
      startTime: z,
      totalTokens: O,
      toolUses: T,
      summary: _
    });
  }
}
function jGK(H, _) {
  let q = H.agentId,
    K = false,
    O = false,
    T = false;
  if (_.update(q, z => {
    if (z.status !== "running") return z;
    K = true;
    let $ = {
      ...z,
      status: "completed",
      result: H,
      endTime: Date.now(),
      evictAfter: am6(z, {
        park: true
      }),
      abortController: undefined,
      selectedAgent: undefined
    };
    return O = zTq($) && !kr(), T = ($.pendingMessages?.length ?? 0) > 0, $;
  }), !O) iy(q);
  if (K && !O) He("task_local_agent"), XOq(q, _);
  if (K && T) d4n.emit(q);
}
function UE6(H, _, q) {
  let K = false;
  if (q.update(H, O => {
    if (O.status !== "running") return O;
    return K = true, {
      ...O,
      status: "failed",
      error: _,
      endTime: Date.now(),
      evictAfter: am6(O, {
        park: false
      }),
      abortController: undefined,
      selectedAgent: undefined
    };
  }), iy(H), K) Pe("task_local_agent", "task_local_agent_failed"), XOq(H, q);
}
function c1_({
  agentId: H,
  ownerAgentId: _,
  parentAgentId: q,
  spawnDepth: K,
  description: O,
  prompt: T,
  selectedAgent: z,
  taskRegistry: $,
  parentAbortController: Y,
  toolUseId: A_2,
  cwd: w_2
}) {
  Kqe(H, AP(Dm(H)));
  let f = Y ? K1(Y) : Yl(),
    j = {
      ...oI(H, "local_agent", O, A_2),
      type: "local_agent",
      status: "running",
      agentId: H,
      ownerAgentId: _,
      parentAgentId: q,
      spawnDepth: K,
      prompt: T,
      cwd: w_2,
      selectedAgent: z,
      agentType: z.agentType ?? "general-purpose",
      abortController: f,
      retrieved: false,
      lastReportedToolCount: 0,
      lastReportedTokenCount: 0,
      isBackgrounded: true,
      isIdle: false,
      pendingMessages: [],
      retain: false,
      diskLoaded: false,
      keepaliveReasons: new Set()
    };
  return $.register(j), j;
}
function FpK({
  agentId: H,
  ownerAgentId: _,
  parentAgentId: q,
  spawnDepth: K,
  description: O,
  prompt: T,
  selectedAgent: T_2,
  taskRegistry: z_2,
  autoBackgroundMs: $_2,
  toolUseId: A_2,
  cwd: A_3
}) {
  Kqe(H, AP(Dm(H)));
  let w_2 = Yl(),
    f_2 = {
      ...oI(H, "local_agent", O, A_2),
      type: "local_agent",
      status: "running",
      agentId: H,
      ownerAgentId: _,
      parentAgentId: q,
      spawnDepth: K,
      prompt: T,
      cwd: A_3,
      selectedAgent: T_2,
      agentType: T_2.agentType ?? "general-purpose",
      abortController: w_2,
      retrieved: false,
      lastReportedToolCount: 0,
      lastReportedTokenCount: 0,
      isBackgrounded: false,
      isIdle: false,
      pendingMessages: [],
      retain: false,
      diskLoaded: false,
      keepaliveReasons: new Set()
    },
    j_2,
    J_2 = new Promise(M => {
      j_2 = M;
    });
  b5_.set(H, j_2), z_2.register(f_2);
  let D_2;
  if ($_2 !== undefined && $_2 > 0) {
    let M = setTimeout((X, P_2) => {
      X.update(P_2, W => {
        if (W.isBackgrounded) return W;
        return {
          ...W,
          isBackgrounded: true
        };
      });
      let Z_2 = b5_.get(P_2);
      if (Z_2) Z_2(), b5_.delete(P_2);
    }, $_2, z_2, H);
    D_2 = () => clearTimeout(M);
  }
  return {
    taskId: H,
    backgroundSignal: J_2,
    cancelAutoBackground: D_2,
    abortController: w_2
  };
}
function Ux_(H, _) {
  let q = _.get(H);
  if (!oiK(q) || q.isBackgrounded || Qw(q.status) && !zTq(q)) return false;
  _.update(H, O => ({
    ...O,
    isBackgrounded: true
  }));
  let K = b5_.get(H);
  if (K) K(), b5_.delete(H);
  return true;
}
function gpK(H, _) {
  b5_.delete(H);
  let q = _.get(H);
  if (!oiK(q) || q.isBackgrounded || ATq(H, _)) return;
  _.remove(H);
}
var slK = 5,
  Tu6,
  b5_;
var zM = b(() => {
  ct();
  Dp();
  cn();
  dx();
  Ri();
  Hv();
  H5();
  jE();
  uh();
  gHe();
  je();
  uA();
  ry();
  TC();
  bY();
  fFn();
  KH();
  Omo();
  Tu6 = {
    name: "LocalAgentTask",
    type: "local_agent",
    async kill(e, t) {
      $GH(e, t);
    }
  };
  b5_ = new Map();
});

export {pvO as eUn,sm6 as Aio,tm6 as tUn,em6 as M2t,BvO as nUn,TTq as L_e,zTq as QL,am6 as jfo,oiK as od,UvO as R8a,$Tq as tG,YTq as e6e,FvO as Fut,U5_ as KFa,ATq as Zlt,Hp6 as rUn,_p6 as A6e,tlK as A4n,Vm6 as Z4n,VmH as q4e,XOq as Wfo,$GH as tIe,elK as nJa,ym6 as eqn,fGK as ELa,eNO as eFp,MZK as bOa,jGK as CLa,UE6 as ZFn,c1_ as Yut,FpK as x8a,Ux_ as i3t,gpK as k8a,slK as tJa,Tu6 as R3n,b5_ as Bdt,zM as RE};
