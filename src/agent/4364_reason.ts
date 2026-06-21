// @ts-nocheck
import {Yw as Gw,vz as cz,mq as Z4} from "../session/2725_iFi.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {bc as Sc,Ug as jg} from "../../vendor/m2264.ts";
import {hFi as uBi,S8r as kjr,Ewn as Uvn} from "../config/2727_repl.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue,Qe,fromEnumOpt as us} from "../../vendor/m5.ts";
import {SC as hC,oN as z1} from "../core/2729_input_tokens.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {Fg as qg} from "./2188_kind.ts";
import {executePreCompactHooks as zY} from "../../vendor/m5155.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {DRn as Kwn,j5r as Q8r} from "./2775_content.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {isTmuxControlMode as Bt,Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {b} from "../../runtime.ts";
import {yp as Tp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {nN as V1} from "../../vendor/m4410.ts";
// @ts-nocheck
function createOrUpdateWorkflowFile(repoFullName, branchName) {
  let n = repoFullName.reason === "error" ? repoFullName.isTimeout ? "timeout" : "api_error" : repoFullName.reason;
  return {
    reason: repoFullName.reason,
    cause: n,
    attempts: repoFullName.attempts,
    status: repoFullName.status,
    detail: repoFullName.detail,
    durationMs: branchName
  };
}
function k74(repoFullName) {
  return repoFullName ?? "main";
}
function B4n() {
  if (!Gw()) return false;
  if (!cz()) return false;
  if (Z4()) return false;
  if (!ut("tengu_sepia_moth", false)) return false;
  return Sc("precomputeCompactionEnabled", true).value;
}
function F4n(e) {
  if (e === "compact") return true;
  return false;
}
function cFp(e, t) {
  return {
    ...e,
    abortController: t,
    onCompactEvent: undefined
  };
}
function wfo(e) {
  if (e.compactionResult !== undefined) return false;
  if (e.isPreFirstCompactFork) return false;
  if (e.consecutiveFailures !== undefined) return false;
  if (e.hasAttemptedReactiveCompact) return false;
  if (e.lastTransitionReason === "precomputed_compact_swap") return false;
  if (!B4n()) return false;
  return uBi(e.contextTokens, e.model, e.autoCompactWindow, e.querySource);
}
function Rfo(e) {
  let {
      querySource: t,
      messages: n,
      cacheSafeParams: r,
      armTrigger: o = "estimate",
      estimateGapTokens: s
    } = e,
    {
      toolUseContext: i
    } = r,
    a = k74(i.agentId);
  if (!B4n()) return false;
  if (F4n(t)) return false;
  if ((K3t.get(a) ?? 0) >= HJa) return false;
  let l = x6.get(a);
  if (l !== undefined && l.status !== "failed") return false;
  let c = n.at(-1)?.uuid;
  if (c === undefined) return false;
  let u = t === "sdk" ? e.promptScan : undefined;
  if (u !== undefined) {
    let {
        userPromptCount: S,
        historyRewritten: C
      } = u,
      R = S <= 1 && !C ? "sdk_single_prompt_gate" : undefined;
    if (R !== undefined) {
      let k = `${a}:${R}`;
      if (!vfo.has(k)) vfo.add(k), j("tengu_precomputed_compact_arm_gated", {
        reason: Ue(R),
        querySource: Qe("sdk"),
        userPromptCount: S,
        preCompactTokens: hC(n)
      }), v(`precomputed compact: arm gated (${a}, ${R}, userPrompts ${S})`);
      return false;
    }
  }
  let d = new AbortController(),
    p = performance.now(),
    m = hC(n),
    f = cFp(i, d),
    A = {
      ...r,
      toolUseContext: f
    },
    h = qg(t),
    g = (Cfo.get(a) ?? 0) + 1;
  Cfo.set(a, g);
  let _ = kjr(i.options.mainLoopModel, i.options.autoCompactWindow, t);
  j("tengu_precomputed_compact_started", {
    armFraction: _.fraction,
    armFractionSource: Ue(_.source),
    ...(_.matchedWindowKey !== undefined && {
      armWindowKey: _.matchedWindowKey
    }),
    preCompactTokens: m,
    messageCount: n.length,
    querySource: h,
    precomputeAttemptNumber: g,
    ...(u !== undefined && {
      userPromptCount: u.userPromptCount,
      historyRewritten: u.historyRewritten
    }),
    armTrigger: Ue(o),
    ...(s !== undefined && {
      estimateGapTokens: s
    }),
    windowSource: us(Uvn(i.options.mainLoopModel, i.options.autoCompactWindow))
  }), v(`precomputed compact: started (${a}, ${n.length} msgs, ~${m} tok, attempt ${g}, trigger ${o})`);
  let y = (async () => {
      let S = await zY({
        trigger: "auto",
        customInstructions: null
      }, d.signal).catch(k => (Ie(k), {}));
      if (S.blockedBy) {
        v(`Precomputed compact blocked by PreCompact hook: ${S.blockedBy}`), M4n(a, d, null);
        return;
      }
      if (d.signal.aborted) {
        M4n(a, d, null);
        return;
      }
      let C = await Kwn(n, A, {
          customInstructions: S.newCustomInstructions
        }).catch(k => ({
          ok: false,
          reason: "error",
          attempts: 0,
          totalGroups: 0,
          detail: Se(k),
          status: undefined,
          isTimeout: false
        })),
        R = Math.round(performance.now() - p);
      if (v(`precomputed compact: ${C.ok ? "ready" : `failed (${C.reason})`} (${a}, ${R}ms)`), !C.ok) {
        let k = C.reason === "aborted" && typeof d.signal.reason === "string" ? d.signal.reason : undefined,
          x = createOrUpdateWorkflowFile(C, R);
        if (j("tengu_precomputed_compact_failed", {
          reason: Ue(C.reason),
          cause: Ue(x.cause),
          status: x.status,
          durationMs: R,
          querySource: h,
          preCompactTokens: m,
          precomputeAttemptNumber: g,
          ...(k !== undefined && {
            clearReason: k
          })
        }), C.reason === "aborted") Bt("compact_precomputed", "compact_precomputed_aborted");else Pe("compact_precomputed", `compact_precomputed_${C.reason}`);
        if (C.reason !== "aborted" && x.cause !== "too_few_groups" && !d.signal.aborted) {
          let I = (K3t.get(a) ?? 0) + 1;
          if (K3t.set(a, I), I === HJa) j("tengu_precomputed_compact_rearm_capped", {
            cause: Ue(x.cause),
            status: x.status,
            querySource: h,
            preCompactTokens: m,
            precomputeAttemptNumber: g
          }), v(`precomputed compact: re-arm capped (${a}, ${I} consecutive ${x.cause} failures)`);
        }
        M4n(a, d, I => ({
          ...I,
          status: "failed",
          failure: x
        }));
        return;
      }
      if (j("tengu_precomputed_compact_ready", {
        durationMs: R,
        attempts: C.result.attempt,
        groupsPreserved: C.result.groupsPreserved,
        totalGroups: C.result.totalGroups,
        querySource: h,
        preCompactTokens: m,
        precomputeAttemptNumber: g
      }), He("compact_precomputed"), !d.signal.aborted) K3t.delete(a);
      M4n(a, d, k => ({
        ...k,
        status: "ready",
        result: C.result,
        readyDurationMs: R,
        preCompactHookDisplay: S.userDisplayMessage
      }));
    })(),
    T = {
      status: "pending",
      precomputedAtUuid: c,
      preCompactTokens: m,
      startedAt: p,
      abortController: d,
      preCompactHookDisplay: undefined,
      settled: y
    };
  return x6.set(a, T), true;
}
function M4n(e, t, n) {
  let r = x6.get(e);
  if (r?.status !== "pending" || r.abortController !== t) return;
  if (n === null) {
    x6.delete(e);
    return;
  }
  x6.set(e, n(r));
}
function IJa(e) {
  return x6.get(k74(e));
}
async function uFp(e, t) {
  let n = x6.get(e);
  if (n === undefined || t.aborted) return null;
  let r = n.status;
  if (n.status === "pending") {
    if (v(`precomputed compact: awaiting borrowed in-flight (${e})`), await Promise.race([n.settled.then(() => false), new Promise(i => {
      t.addEventListener("abort", () => i(true), {
        once: true
      });
    })])) return v(`precomputed compact: turn aborted while borrowing (${e}) \u2014 leaving entry`), {
      kind: "turn_aborted",
      statusAtPTL: r
    };
  }
  let o = x6.get(e);
  return v(`precomputed compact: borrowed (${e}, ${o?.status ?? "gone"})`), o?.status === "ready" ? {
    kind: "ready",
    ready: o,
    statusAtPTL: r
  } : null;
}
async function xfo(e, t) {
  let n = k74(e),
    r = x6.get(n);
  if (r === undefined || t.aborted) return null;
  let o = r.status;
  if (r.status === "pending") {
    if (v(`precomputed compact: awaiting in-flight (${n})`), await Promise.race([r.settled.then(() => false), new Promise(a => {
      t.addEventListener("abort", () => a(true), {
        once: true
      });
    })])) return v(`precomputed compact: turn aborted while awaiting (${n}) \u2014 leaving entry`), {
      kind: "turn_aborted",
      statusAtPTL: o
    };
  }
  let s = x6.get(n);
  switch (x6.delete(n), v(`precomputed compact: consumed (${n}, ${s?.status ?? "gone"})`), s?.status) {
    case "ready":
      return {
        kind: "ready",
        ready: s,
        statusAtPTL: o
      };
    case "failed":
      return {
        kind: "failed",
        failure: s.failure,
        statusAtPTL: o
      };
    case "pending":
    case undefined:
      return null;
  }
}
async function kfo(e) {
  let {
      toolUseContext: t,
      messages: n,
      detectedAt: r,
      borrowFrom: o,
      querySource: s
    } = e,
    i = qg(s),
    a = (A, h) => {
      let g = Math.round(performance.now() - r);
      return dFp(A, i, g, e.trigger), {
        outcome: A,
        swap: A.kind === "applied" ? A.swap : undefined,
        emittedEarlyCompactStart: h
      };
    };
  if (!(!F4n(s) && B4n() && (e.trigger === "threshold" || e.isWithheld413 === true && !e.hasAttemptedReactiveCompact)) || e.trigger === "threshold" && IJa(t.agentId) === undefined) return {
    outcome: {
      kind: "none"
    },
    swap: undefined,
    emittedEarlyCompactStart: false
  };
  let c = t.abortController.signal,
    u = (o !== undefined ? x6.get(o) : IJa(t.agentId))?.status === "pending";
  if (u) t.onCompactEvent?.({
    type: "compact_progress",
    event: {
      type: "compact_start"
    }
  }), t.onCompactEvent?.({
    type: "sdk_status",
    status: "compacting"
  });
  let d = null,
    p = false;
  if (o !== undefined) d = await uFp(o, c), p = d !== null;
  if (d ??= await xfo(t.agentId, c), d === null) return a({
    kind: "none"
  }, u);
  if (d.kind === "turn_aborted") return a({
    kind: "aborted"
  }, u);
  if (d.kind === "failed") return a({
    kind: "failed",
    failure: d.failure,
    statusAtPTL: d.statusAtPTL
  }, u);
  let m = Hfo(n, d.ready.precomputedAtUuid);
  if (m === null) {
    if (p) j("tengu_precompute_borrow_boundary_miss", {
      querySource: i
    });else U4n(d.ready, "boundary_uuid_missing", s);
    return a({
      kind: "none"
    }, u);
  }
  let f = d.statusAtPTL === "pending" ? "pending" : "ready";
  return a({
    kind: "applied",
    swap: {
      compactResult: d.ready.result,
      preCompactHookDisplay: d.ready.preCompactHookDisplay,
      messagesSince: m,
      statusAtPTL: f,
      leadMs: r - d.ready.startedAt,
      totalMs: d.ready.readyDurationMs,
      borrowed: p
    }
  }, u);
}
function dFp(e, t, n, r) {
  let o = e.kind === "applied" ? e.swap.statusAtPTL : e.kind === "failed" ? e.statusAtPTL : undefined;
  j("tengu_precomputed_compact_consumed", {
    kind: Ue(e.kind),
    querySource: t,
    waitedMs: n,
    statusAtPTL: us(o),
    trigger: Ue(r),
    ...(e.kind === "applied" && {
      borrowed: e.swap.borrowed,
      precomputeTotalMs: Math.round(e.swap.totalMs)
    }),
    ...(e.kind === "failed" && {
      failureReason: Ue(e.failure.reason),
      failureCause: Ue(e.failure.cause),
      failureStatus: e.failure.status,
      failureAttempts: e.failure.attempts,
      failureDurationMs: e.failure.durationMs
    })
  });
}
function Sdt(e, t, n) {
  if (!B4n()) return;
  j("tengu_precomputed_compact_consumed", {
    kind: Ue(e),
    trigger: Qe("manual"),
    querySource: qg(undefined),
    waitedMs: Math.round(n),
    statusAtPTL: us(e === "applied" || e === "failed" ? t?.statusAtPTL : undefined),
    ...(e === "applied" && t?.kind === "ready" && {
      borrowed: false,
      precomputeTotalMs: t.ready.readyDurationMs
    }),
    ...(e === "failed" && t?.kind === "failed" && {
      failureReason: Ue(t.failure.reason),
      failureCause: Ue(t.failure.cause),
      failureStatus: t.failure.status,
      failureAttempts: t.failure.attempts,
      failureDurationMs: t.failure.durationMs
    })
  });
}
function Hfo(e, t) {
  let n = e.findIndex(r => r.uuid === t);
  if (n === -1) return null;
  return e.slice(n + 1).filter(r => r.type !== "progress");
}
function U4n(e, t, n) {
  j("tengu_precomputed_compact_discarded", {
    reason: Ue(t),
    ageMs: Math.round(performance.now() - e.startedAt),
    readyDurationMs: e.readyDurationMs,
    preCompactTokens: e.preCompactTokens,
    querySource: qg(n)
  }), v(`precomputed compact: discarded (${t}, age ${Math.round(performance.now() - e.startedAt)}ms)`);
}
function $4n(e, t, n) {
  let r = k74(e),
    o = x6.get(r);
  if (o?.status === "ready") U4n(o, t, n);
  if (o?.abortController.abort(t), x6.delete(r), t === "subagent_exit") Cfo.delete(r), K3t.delete(r), vfo.delete(`${r}:sdk_single_prompt_gate`);
}
var x6,
  Cfo,
  K3t,
  HJa = 3,
  vfo;
var q4n = b(() => {
  je();
  St();
  Tp();
  wn();
  jg();
  z1();
  cn();
  Yn();
  Ct();
  V1();
  Q8r();
  x6 = new Map(), Cfo = new Map(), K3t = new Map(), vfo = new Set();
});

export {createOrUpdateWorkflowFile as q2p,k74 as Cqn,B4n as vqn,F4n as wqn,cFp as j2p,wfo as OAo,Rfo as LAo,M4n as Eqn,IJa as nQa,uFp as W2p,xfo as MAo,kfo as NAo,dFp as G2p,Sdt as Gdt,Hfo as BAo,U4n as Rqn,$4n as xqn,x6 as createUserMessage,Cfo as DAo,K3t as h4t,HJa as tQa,vfo as PAo,q4n as kqn};
