// @ts-nocheck
import {isDaemonWorkerRegistryEnabled as dqH,fC as wP} from "../config/2212_shouldShowLaunchComposer.ts";
import {WORKER_KINDS as io,yVt as TU_} from "../../vendor/m5124.ts";
import {CJn as sQ6,IDo as UMq,rGe as nLH,yUl as J04,TVt as mO_} from "../../vendor/m5125.ts";
import {nFl as U24,rFl as F24,XYn as LQ6} from "../../vendor/m5089.ts";
import {Jrr as Go6,q9o as Ihq,USc as h_1} from "./5780_pid.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Ie as EH,vn as S6} from "../session/0621_length.ts";
import {b as L} from "../../runtime.ts";
/**
 * Semantic restoration for telemetry/5688_jsonPath.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

/** Internal restored helper for telemetry/5688_jsonPath.ts; behavior is preserved. */
function isSupervisorKindEnabled(H: any): any {
  return H === "heartbeat" || dqH();
}
/** Internal restored helper for telemetry/5688_jsonPath.ts; behavior is preserved. */
function countConfiguredWorkers(H: any): any {
  let _ = 0;
  for (let q of Object.keys(io)) _ += (H[q] ?? []).length;
  return _;
}
// FIXME: unverified name
/** Internal restored helper for telemetry/5688_jsonPath.ts; behavior is preserved. */
async function N_1(H: any): Promise<any> {
  let {
      jsonPath: _,
      invocation: q,
      logger: K,
      authManager: O,
      watch: T = sQ6
    } = H,
    z = new Map(),
    $ = UMq();
  function Y(): any {
    let X = {};
    for (let [P, Z] of z) {
      let W = Z.status;
      if (W) X[P] = W;
    }
    U24(X);
  }
  let A = await nLH(_);
  if (A.ok) {
    $ = A.config;
    for (let X of A.unknownKeys) K.write("supervisor", `unknown config key '${X}' \u2014 upgrade claude?`);
  } else K.write("supervisor", `config load failed: ${A.error} \u2014 idling`);
  await O.ready;
  let w = 0;
  for (let X of Object.keys(io)) {
    if (!isSupervisorKindEnabled(X)) continue;
    let P = $[X] ?? [];
    for (let Z = 0; Z < P.length; Z++) {
      let W = `${X}:${Z}`,
        G = new Go6(W, X, P[Z], q, K, O, Y);
      z.set(W, G), G.start(w++ * Ihq), K.write("supervisor", `spawned ${W}`);
    }
  }
  Y();
  let f = async (): Promise<any> => {
      let X = await nLH(_);
      if (!X.ok) {
        K.write("supervisor", `config reload failed: ${X.error} \u2014 keeping last-good config`);
        return;
      }
      for (let W of X.unknownKeys) K.write("supervisor", `unknown config key '${W}' \u2014 upgrade claude?`);
      let P = J04($, X.config);
      $ = X.config;
      for (let W of P.stop) {
        let G = z.get(W);
        if (G) await G.stop(), z.delete(W), K.write("supervisor", `stopped ${W}`);
      }
      for (let {
        id: W,
        config: G
      } of P.restart) {
        let R = z.get(W);
        if (R) await R.stop(), R.updateConfig(G), R.start(), K.write("supervisor", `restarted ${W}`);
      }
      let Z = 0;
      for (let {
        id: W,
        kind: G,
        config: R
      } of P.start) {
        if (!isSupervisorKindEnabled(G)) continue;
        let h = new Go6(W, G, R, q, K, O, Y);
        z.set(W, h), h.start(Z++ * Ihq), K.write("supervisor", `spawned ${W}`);
      }
      if (P.stop.length + P.start.length + P.restart.length > 0) K.write("supervisor", `reload: stopped=${P.stop.length} started=${P.start.length} restarted=${P.restart.length}`), c("tengu_daemon_config_reload", {
        stopped: P.stop.length,
        started: P.start.length,
        restarted: P.restart.length
      });
    },
    j = Promise.resolve(),
    J = T(_, (): any => {
      j = j.then(f).catch((X: any): any => EH(X));
    }),
    D = !1;
  function M(): any {
    if (D) return;
    D = !0, J();
  }
  return {
    workerCount: (): any => countConfiguredWorkers($),
    hasOAuthConsumer: (): any => {
      for (let X of z.values()) if (io[X.kind].needsOAuth) return !0;
      return !1;
    },
    disposeWatcher: M,
    drainReloads: (): any => j,
    stop: async (): Promise<any> => {
      M(), await j, await Promise.all(Array.from(z.values()).map((X: any): any => X.stop())), await F24();
    }
  };
}
var V_1 = L((): any => {
  wP();
  y_();
  S6();
  mO_();
  LQ6();
  h_1();
  TU_();
});
export {isSupervisorKindEnabled as $Sc,countConfiguredWorkers as KXm,N_1 as qSc,V_1 as WSc};
