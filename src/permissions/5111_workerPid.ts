// @ts-nocheck
import {or as Y8,dn as A6} from "../config/0137_namespace.ts";
import {ownProcStart as Is,isSameProcessAsync as WW,lE as UD} from "../../vendor/m1461.ts";
import {vf as yA,Pv as rR} from "../../vendor/m639.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {ba as $K,pd as FO} from "../../vendor/m706.ts";
import {Tl as tK,mn as M6} from "../telemetry/0600_feature_name.ts";
import {Ggt as jwH,Oxo as rDq,Mxo as hQ6} from "../../vendor/m5090.ts";
import {sVt as nB_,eJn as NQ6} from "../../vendor/m5091.ts";
import {Jge as aqH,mit as haH} from "../telemetry/3235_createLinkedTransportPair.ts";
import {kBl as AW4,wBl as YW4} from "./5110_tool.ts";
import {sMt as DL_,sW as Fg,iW as kp} from "../../vendor/m2696.ts";
import {CXe as biH,eFe as BDH} from "../../vendor/m1459.ts";
import {b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {formatPermissionRule as bi,c1 as uv} from "../../vendor/m2695.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
/**
 * Scheduled-task config persistence and daemon worker runner.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Return the daemon scheduled-worker status file path. */
function getScheduledStatusPath(): any {
  return fW4.join(Y8(), "daemon.scheduled.status.json");
}
/** Persist live scheduled-task worker status. */
async function writeScheduledWorkerStatus(H: any): any {
  let _ = {
    workerPid: process.pid,
    workerProcStart: Is(),
    writtenAt: Date.now(),
    tasks: H
  };
  try {
    await yA(getScheduledStatusPath(), bH(_));
  } catch {}
}
/** Read status only if the recorded worker process is still alive. */
async function readLiveScheduledWorkerStatus(): any {
  let H;
  try {
    H = await wW4.readFile(getScheduledStatusPath(), "utf8");
  } catch {
    return null;
  }
  let _ = $K(H, !1);
  if (!_ || typeof _ !== "object") return null;
  let q = _;
  if (typeof q.workerPid !== "number" || typeof q.tasks !== "object" || q.tasks === null) return null;
  try {
    process.kill(q.workerPid, 0);
  } catch {
    return null;
  }
  if (!(await WW(q.workerPid, q.workerProcStart))) return null;
  return _;
}
/** Normalize legacy and current scheduled-task config shapes. */
function normalizeScheduledConfig(H: any): any {
  let _ = H.scheduled,
    q = {};
  if (Array.isArray(_) && _.length > 0 && typeof _[0] === "object") q = _[0] ?? {};else if (_ && typeof _ === "object" && !Array.isArray(_)) q = _;
  let K = Array.isArray(q.tasks) ? q.tasks : [];
  return {
    ...q,
    tasks: K
  };
}
/** Write normalized scheduled config back into settings. */
function writeScheduledConfig(H: any, _: any): any {
  let q = H.scheduled;
  if (Array.isArray(q)) {
    let K = q.slice();
    K[0] = _, H.scheduled = K;
  } else H.scheduled = _;
}
/** Add or replace a scheduled task in user/project config. */
async function addScheduledTask(H: any, _: any): any {
  return tK("daemon_scheduled_add", async () => {
    ZMq().parse(H), await jwH(q => {
      let K = normalizeScheduledConfig(q),
        O = K.tasks.filter(T => !(T && typeof T === "object" && T.id === H.id));
      O.push(H), writeScheduledConfig(q, {
        ...K,
        tasks: O
      });
    }, _);
  });
}
/** Remove a scheduled task by id. */
async function removeScheduledTask(H: any, _: any): any {
  return tK("daemon_scheduled_remove", async () => {
    let q = !1;
    return await jwH(K => {
      if (!("scheduled" in K)) return !1;
      let O = normalizeScheduledConfig(K),
        T = O.tasks.filter(z => !(z && typeof z === "object" && z.id === H));
      if (T.length === O.tasks.length) return !1;
      if (T.length === 0) {
        let z = K.scheduled;
        if (Array.isArray(z) && z.length > 1) K.scheduled = z.slice(1);else delete K.scheduled;
      } else writeScheduledConfig(K, {
        ...O,
        tasks: T
      });
      q = !0;
    }, _), q;
  });
}
/** List valid scheduled tasks from the selected config file. */
async function listScheduledTasks(H: any): any {
  let _ = await rDq(H);
  if (!("scheduled" in _)) return [];
  let q = normalizeScheduledConfig(_),
    K = [];
  for (let O of q.tasks) {
    let T = ZMq().safeParse(O);
    if (T.success) K.push(T.data);
  }
  return K;
}
var wW4,
  fW4,
  $9T = 1000,
  jW4 = 10080,
  SO_,
  ZMq,
  GMq,
  MW4 = async (H, _, q, K) => {
    let {
        tasks: O,
        maxConcurrent: T
      } = GMq().parse(H),
      {
        initializeErrorLogSink: z
      } = await Promise.resolve().then(() => (nB_(), NQ6)),
      {
        initializeAnalyticsSink: $
      } = await Promise.resolve().then(() => (aqH(), haH));
    if (z(), $(), !K.getAccessToken()) q("scheduled worker: not authed \u2014 run `claude auth login`"), process.exit(1);
    let {
      query: Y
    } = await Promise.resolve().then(() => (AW4(), YW4));
    if (q(`scheduled worker started tasks=${O.length} maxConcurrent=${T}`), O.length === 0) {
      let R = setInterval(() => {}, 60000);
      await new Promise(h => {
        if (_.aborted) {
          h();
          return;
        }
        _.addEventListener("abort", () => h(), {
          once: !0
        });
      }), clearInterval(R);
      return;
    }
    let A = [],
      w = new Set(),
      f = null;
    function j(R: any): any {
      let h = A.reduce((y, E) => E.task.id === R.id ? y + 1 : y, 0);
      if (h >= R.maxQueued) {
        q(`task=${R.id} dropped (queue full: ${h}/${R.maxQueued})`);
        return;
      }
      A.push({
        task: R
      }), f?.(), f = null;
    }
    let J = new Map(),
      D = new Set(),
      M = Date.now();
    function X(): any {
      let R = {};
      for (let h of O) {
        let y = J.get(h.id);
        R[h.id] = {
          running: D.has(h.id),
          ...(y !== void 0 && {
            lastFiredAt: y
          })
        };
      }
      writeScheduledWorkerStatus(R);
    }
    X();
    function P(R: any): any {
      let h = J.get(R.id) ?? M;
      return DL_(R.cron, h, R.id, Fg);
    }
    let Z = setInterval((R, h, y, E) => {
      let v = Date.now();
      for (let C of R) {
        if (!C.enabled) continue;
        let S = h(C);
        if (S === null) continue;
        if (S <= v) y.set(C.id, v), E(C);
      }
    }, $9T, O, P, J, j);
    _.addEventListener("abort", () => {
      clearInterval(Z);
      for (let R of w) R.abort();
      f?.(), f = null;
    });
    let W = new Set();
    async function G(R: any): any {
      let {
          task: h
        } = R,
        y = new AbortController();
      w.add(y), D.add(h.id), X();
      let E = setTimeout(v => v.abort(), Math.min(h.runTimeoutMinutes, jW4) * 60000, y);
      q(`task=${h.id} start cron='${h.cron}' dir='${h.directory}'`);
      try {
        let v = Y({
          prompt: h.prompt,
          options: {
            cwd: h.directory,
            permissionMode: h.permissionMode,
            ...(h.permissionMode === "bypassPermissions" && {
              allowDangerouslySkipPermissions: !0
            }),
            ...(h.model && {
              model: h.model
            }),
            systemPrompt: {
              type: "preset",
              preset: "claude_code"
            },
            settingSources: ["user", "project", "local"],
            pathToClaudeCodeExecutable: process.execPath,
            abortController: y,
            stderr: C => q(`[${h.id}] ${C.trimEnd()}`),
            workload: biH
          }
        });
        for await (let C of v) if (C.type === "result") q(`task=${h.id} result subtype=${C.subtype} duration=${C.duration_ms}ms cost=$${C.total_cost_usd.toFixed(4)}`);
      } catch (v) {
        q(`task=${h.id} threw: ${v}`);
      } finally {
        clearTimeout(E), w.delete(y), D.delete(h.id), X();
      }
    }
    while (!_.aborted) {
      while (W.size < T && A.length > 0 && !_.aborted) {
        let R = A.shift(),
          h = G(R).finally(() => {
            W.delete(h), f?.(), f = null;
          });
        W.add(h);
      }
      if (_.aborted) break;
      if (A.length === 0 || W.size >= T) await new Promise(R => {
        f = R;
      });
    }
    await Promise.allSettled(Array.from(W));
  };
var tB_ = L(() => {
  a8();
  M6();
  rR();
  bi();
  kp();
  A6();
  UD();
  FO();
  H6();
  BDH();
  hQ6();
  wW4 = require("fs/promises"), fW4 = require("path"), SO_ = ["dontAsk", "auto", "default", "acceptEdits", "plan", "bypassPermissions"], ZMq = kH(() => k.object({
    id: k.string().min(1),
    cron: k.string().refine(H => uv(H) !== null, {
      message: "invalid 5-field cron expression"
    }),
    prompt: k.string().min(1),
    directory: k.string().min(1),
    enabled: k.boolean().default(!0),
    permissionMode: k.enum(SO_).default("dontAsk"),
    model: k.string().optional(),
    runTimeoutMinutes: k.number().positive().max(jW4).default(30),
    maxQueued: k.number().int().positive().default(1)
  }).strict()), GMq = kH(() => k.object({
    tasks: k.array(ZMq()).default([]).refine(H => new Set(H.map(_ => _.id)).size === H.length, {
      message: "task ids must be unique"
    }),
    maxConcurrent: k.number().int().positive().default(1)
  }).strict());
});
export {getScheduledStatusPath as DBl,writeScheduledWorkerStatus as dEm,readLiveScheduledWorkerStatus as PBl,normalizeScheduledConfig as cDo,writeScheduledConfig as LBl,addScheduledTask as cVt,removeScheduledTask as uVt,listScheduledTasks as Ygt,wW4 as HBl,fW4 as IBl,$9T as uEm,jW4 as xBl,SO_ as jgt,ZMq as aDo,GMq as lDo,MW4 as OBl,tB_ as dVt};
