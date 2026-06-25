// @ts-nocheck
import {ft as isFullscreenWithTTY,b,oo as ro} from "../../runtime.ts";
import {getSessionId,removeSessionCronTasks,getSessionCronTasks,getScheduledTasksEnabled,setScheduledTasksEnabled,lt} from "../session/0132_sent.ts";
import {isProcessRunning,getProcessStartTime,ownProcStart,lE as rE} from "../../vendor/m1461.ts";
import {Lrt as Dtt,oMt as wPt,M9i as X1i,uae as mae,sW as W5,sMt as RPt,Ukn as Xvn,O9i as Y1i,oge as WAe,Bkn as Jvn,iW as G5} from "../../vendor/m2696.ts";
import {logForDebugging,qe} from "./0236_setHasFormattedOutput.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {oie as sie,YCi as zgi} from "../../vendor/m2269.ts";
import {x2o as l1o,Wzt as fVt,Pdc as Knc} from "../../vendor/m5656.ts";
import {PO as AL,formatPermissionRule as Az} from "../../vendor/m2695.ts";
import {k$e as b2e,w$e as S2e} from "../session/2702_resolveLoopFileFire.ts";
var Xnc = {};
isFullscreenWithTTY(Xnc, {
  isRecurringTaskAged: () => isRecurringTaskAged,
  createCronScheduler: () => createCronScheduler,
  buildMissedTaskNotification: () => buildMissedTaskNotification
});
function isRecurringTaskAged(e, t, n) {
  if (n === 0) return !1;
  return Boolean(e.recurring && !e.permanent && t - e.createdAt >= n);
}
function createCronScheduler(e) {
  let {
      onFire: t,
      isLoading: n,
      assistantMode: r = !1,
      onFireTask: o,
      onMissed: s,
      dir: i,
      lockIdentity: a,
      getJitterConfig: l,
      isKilled: c,
      filter: u,
      getExtraTasks: d
    } = e,
    p = i || a ? {
      dir: i,
      lockIdentity: a
    } : void 0,
    m = i !== void 0 ? a : getSessionId(),
    f = [],
    A = [],
    h = new Map(),
    g = new Set(),
    _ = new Set(),
    y = null,
    T = null,
    S = null,
    v = null,
    R = !1,
    k = !1,
    x = new Map();
  function H(N, O) {
    if (!isProcessRunning(N)) return x.delete(N), !0;
    if (O === void 0) return !1;
    let $ = Date.now(),
      U = x.get(N);
    if (!U || $ - U.at >= 60000) U = {
      at: $,
      token: getProcessStartTime(N)
    }, x.set(N, U);
    return U.token !== void 0 && U.token !== O;
  }
  function I(N) {
    if (N.createdBySessionId === void 0) return k;
    if (N.createdBySessionId === m) return !0;
    return k && (N.createdByPid === void 0 || H(N.createdByPid, N.createdByProcStart));
  }
  async function P(N) {
    let O = await Dtt(i),
      $ = d ? await d().catch(V => (logForDebugging(`[ScheduledTasks] getExtraTasks failed: ${V}`), [])) : [];
    if (R) return;
    if (f = O, A = $, !N) return;
    let U = !1;
    for (let V of O) if (m !== void 0 && V.createdBySessionId === m && V.createdByPid !== process.pid) V.createdByPid = process.pid, V.createdByProcStart = ownProcStart(), U = !0;
    if (U) await wPt(O, i).catch(V => logForDebugging(`[ScheduledTasks] failed to refresh task pids: ${V}`));
    let W = Date.now(),
      G = X1i(O, W).filter(V => !V.recurring && !g.has(V.id) && (!u || u(V)) && I(V));
    if (G.length > 0) {
      for (let V of G) g.add(V.id), h.set(V.id, 1 / 0);
      if (logEvent("tengu_scheduled_task_missed", {
        count: G.length,
        taskIds: G.map(V => V.id).join(",")
      }), s) s(G);else t(buildMissedTaskNotification(G));
      mae(G.map(V => V.id), i).catch(V => logForDebugging(`[ScheduledTasks] failed to remove missed tasks: ${V}`)), logForDebugging(`[ScheduledTasks] surfaced ${G.length} missed one-shot task(s)`);
    }
  }
  function L() {
    if (c?.()) return;
    if (n() && !r) return;
    let N = Date.now(),
      O = new Set(),
      $ = [],
      U = l?.() ?? W5;
    function W(G, V) {
      if (u && !u(G)) return;
      if (O.add(G.id), _.has(G.id)) return;
      let Q = h.get(G.id);
      if (Q === void 0) Q = G.recurring ? RPt(G.cron, G.lastFiredAt ?? G.createdAt, G.id, U) ?? 1 / 0 : Xvn(G.cron, G.createdAt, G.id, U) ?? 1 / 0, h.set(G.id, Q), logForDebugging(`[ScheduledTasks] scheduled ${G.id} for ${Q === 1 / 0 ? "never" : new Date(Q).toISOString()}`);
      if (N < Q) return;
      if (logForDebugging(`[ScheduledTasks] firing ${G.id}${G.recurring ? " (recurring)" : ""}`), logEvent("tengu_scheduled_task_fire", {
        recurring: G.recurring ?? !1,
        taskId: G.id,
        autonomousLoopDefault: o9m.isLoopDefaultSentinel(G.prompt)
      }), o) o(G);else t(G.prompt);
      let K = isRecurringTaskAged(G, N, U.recurringMaxAgeMs);
      if (K) {
        let Y = Math.floor((N - G.createdAt) / 1000 / 60 / 60);
        logForDebugging(`[ScheduledTasks] recurring task ${G.id} aged out (${Y}h since creation), deleting after final fire`), logEvent("tengu_scheduled_task_expired", {
          taskId: G.id,
          ageHours: Y
        });
      }
      if (G.recurring && !K) {
        let Y = RPt(G.cron, N, G.id, U) ?? 1 / 0;
        if (h.set(G.id, Y), !V) $.push(G.id);
      } else if (V) removeSessionCronTasks([G.id]), h.delete(G.id);else _.add(G.id), h.set(G.id, 1 / 0), mae([G.id], i).catch(Y => logForDebugging(`[ScheduledTasks] failed to remove task ${G.id}: ${Y}`)).finally(() => _.delete(G.id));
    }
    for (let G of f) if (I(G)) W(G, !1);
    if ($.length > 0) {
      for (let G of $) _.add(G);
      Y1i($, N, i).catch(G => logForDebugging(`[ScheduledTasks] failed to persist lastFiredAt: ${G}`)).finally(() => {
        for (let G of $) _.delete(G);
      });
    }
    if (i === void 0) for (let G of getSessionCronTasks()) W(G, !0);
    for (let G of A) W(G, !0);
    if (O.size === 0) {
      h.clear();
      return;
    }
    for (let G of h.keys()) if (!O.has(G)) h.delete(G);
  }
  async function D() {
    if (R) return;
    if (y) clearInterval(y), y = null;
    let {
      default: N
    } = await Promise.resolve().then(() => (sie(), zgi));
    if (R) return;
    if (k = await l1o(p).catch(() => !1), R) {
      if (k) k = !1, fVt(p);
      return;
    }
    if (!k) S = setInterval(() => {
      l1o(p).then($ => {
        if (R) {
          if ($) fVt(p);
          return;
        }
        if ($) {
          if (k = !0, S) clearInterval(S), S = null;
        }
      }).catch($ => logForDebugging(String($), {
        level: "error"
      }));
    }, i9m), S.unref?.();
    P(!0).then(L);
    let O = WAe(i);
    v = N.watch(O, {
      persistent: !1,
      ignoreInitial: !0,
      awaitWriteFinish: {
        stabilityThreshold: s9m
      },
      ignorePermissionErrors: !0
    }), v.on("error", $ => logForDebugging(`[ScheduledTasks] watcher error: ${$}`, {
      level: "warn"
    })), v.on("add", () => void P(!1)), v.on("change", () => void P(!1)), v.on("unlink", () => {
      if (!R) f = [], h.clear();
    }), T = setInterval(L, znc), T.unref?.();
  }
  return {
    start() {
      if (R = !1, i !== void 0) {
        logForDebugging(`[ScheduledTasks] scheduler start() \u2014 dir=${i}, hasTasks=${Jvn(i)}`), D();
        return;
      }
      if (logForDebugging(`[ScheduledTasks] scheduler start() \u2014 enabled=${getScheduledTasksEnabled()}, hasTasks=${Jvn()}`), !getScheduledTasksEnabled() && (r || d !== void 0 || Jvn())) setScheduledTasksEnabled(!0);
      if (getScheduledTasksEnabled()) {
        D();
        return;
      }
      y = setInterval(N => {
        if (getScheduledTasksEnabled()) N();
      }, znc, D), y.unref?.();
    },
    stop() {
      if (R = !0, y) clearInterval(y), y = null;
      if (T) clearInterval(T), T = null;
      if (S) clearInterval(S), S = null;
      if (v?.close(), v = null, k) k = !1, fVt(p);
    },
    getNextFireTime() {
      let N = 1 / 0;
      for (let O of h.values()) if (O < N) N = O;
      return N === 1 / 0 ? null : N;
    },
    checkNow() {
      L();
    }
  };
}
function buildMissedTaskNotification(e) {
  let t = e.length > 1,
    n = `The following one-shot scheduled task${t ? "s were" : " was"} missed while Claude was not running. ${t ? "They have" : "It has"} already been removed from .claude/scheduled_tasks.json.

Do NOT execute ${t ? "these prompts" : "this prompt"} yet. First use the AskUserQuestion tool to ask whether to run ${t ? "each one" : "it"} now. Only execute if the user confirms.`,
    r = e.map(o => {
      let s = `[${AL(o.cron)}, created ${new Date(o.createdAt).toLocaleString()}]`,
        i = (o.prompt.match(/`+/g) ?? []).reduce((l, c) => Math.max(l, c.length), 0),
        a = "`".repeat(Math.max(3, i + 1));
      return `${s}
${a}
${o.prompt}
${a}`;
    });
  return `${n}

${r.join(`

`)}`;
}
var o9m,
  znc = 1000,
  s9m = 300,
  i9m = 5000;
var u1o = b(() => {
  lt();
  Ct();
  Az();
  G5();
  Knc();
  qe();
  rE();
  o9m = (b2e(), ro(S2e));
});
export {Xnc as Ndc,isRecurringTaskAged,createCronScheduler,buildMissedTaskNotification,o9m as IVm,znc as Odc,s9m as xVm,i9m as DVm,u1o as P2o};
