// @ts-nocheck
import {FTo as AYq,kje as pBH,sM as oV} from "../../vendor/m4581.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Pn as b6,xp as WO,bt as L_} from "../../vendor/m195.ts";
import {Oe as IH,Ie as vH,Ul as tK,ln as M6} from "./0594_feature_name.ts";
import {qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {i8n as up6,rM as iV} from "../../vendor/m4493.ts";
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {M1 as Wv,sie as q9H} from "../../vendor/m2261.ts";
import {withTimeout as G5} from "./1483_withTimeout.ts";
import {b as L} from "../../runtime.ts";
/*
 * telemetry/5684_recursive.ts - telemetry and background-event restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
async function BFH(H: any, _: any): Promise<any> {
  await ub.mkdir(AYq(), {
    recursive: !0,
    mode: 448
  }).catch((): any => {}), await ub.rename(H, _fH.join(AYq(), _fH.basename(H))).catch((): any => ub.unlink(H).catch((): any => {})), N(`[bg-dispatch] rejected ${_fH.basename(H)}: ${_}`, {
    level: "warn"
  }), c("tengu_bg_dispatch_rejected", {
    reason: _.slice(0, 100)
  });
}
async function w_1(H: any, _: any): Promise<any> {
  let q;
  try {
    q = await ub.lstat(H);
  } catch ($) {
    if (b6($)) return;
    return IH("daemon_bg_dispatch_ingest", "read_failed"), BFH(H, WO($) ?? "unknown");
  }
  if (q.isSymbolicLink()) return IH("daemon_bg_dispatch_ingest", "symlink"), BFH(H, "symlink");
  if (!q.isFile()) {
    IH("daemon_bg_dispatch_ingest", "not_a_file"), N(`[bg-dispatch] removed non-regular ${_fH.basename(H)}`, {
      level: "warn"
    }), await ub.rm(H, {
      recursive: !0,
      force: !0
    }).catch((): any => {});
    return;
  }
  if (q.size > PvT) return IH("daemon_bg_dispatch_ingest", "oversized"), BFH(H, `oversized (${q.size} bytes)`);
  let K;
  try {
    K = await ub.readFile(H, "utf8");
  } catch ($) {
    if (b6($)) return;
    return IH("daemon_bg_dispatch_ingest", "read_failed"), BFH(H, WO($) ?? "unknown");
  }
  let O,
    T = !0;
  try {
    O = d_(K);
  } catch {
    O = void 0, T = !1;
  }
  let z;
  try {
    z = up6().safeParse(O);
  } catch {
    return IH("daemon_bg_dispatch_ingest", "transform_throw"), BFH(H, "transform_throw");
  }
  if (!z.success) return IH("daemon_bg_dispatch_ingest", T ? "schema" : "bad_json"), BFH(H, "schema");
  if (Date.now() - z.data.createdAt > XvT) return IH("daemon_bg_dispatch_ingest", "stale"), BFH(H, "stale");
  _(z.data), vH("daemon_bg_dispatch_ingest"), await ub.unlink(H).catch((): any => {});
}
async function WvT(H: any): Promise<any> {
  let _;
  try {
    _ = await ub.readdir(pBH());
  } catch (q) {
    if (b6(q)) return;
    throw q;
  }
  for (let q of _) {
    if (q.startsWith(".") || f_1(q) || q === "rejected") continue;
    await w_1(_fH.join(pBH(), q), H);
  }
}
function f_1(H: any): any {
  return H.endsWith(".tmp") || H.includes(".tmp.");
}
async function j_1(H: any): Promise<any> {
  return tK("daemon_bg_watcher_start", (): any => ZvT(H));
}
async function ZvT(H: any): Promise<any> {
  await ub.mkdir(pBH(), {
    recursive: !0,
    mode: 448
  }).catch((): any => {});
  let _ = t_(),
    usePolling = _ === "macos",
    K = Wv.watch(pBH(), {
      ignoreInitial: !0,
      depth: 0,
      usePolling: usePolling,
      interval: 100,
      ignored: (O: any): any => f_1(_fH.basename(O)) || _fH.basename(O) === "rejected",
      ...(_ === "windows" && {
        awaitWriteFinish: {
          stabilityThreshold: 50,
          pollInterval: 20
        }
      })
    });
  return K.on("add", (O: any): any => {
    w_1(O, H).catch((T: any): any => N(`[bg-dispatch] ${T}`, {
      level: "error"
    }));
  }), K.on("error", (O: any): any => {
    N(`[bg-dispatch] watcher error: ${O}`, {
      level: "error"
    }), c("tengu_bg_dispatch_watcher_failed", {
      errno: WO(O) ?? "unknown"
    });
  }), await G5(A_1.once(K, "ready"), 5000, "chokidar ready").catch((O: any): any => N(`[bg-dispatch] watcher ready wait: ${O}`)), await WvT(H).catch((O: any): any => {
    N(`[bg-dispatch] cold-start drain: ${O}`, {
      level: "error"
    }), c("tengu_bg_dispatch_watcher_failed", {
      errno: WO(O) ?? "unknown"
    });
  }), {
    close: (): any => K.close()
  };
}
var A_1,
  ub,
  _fH,
  XvT = 86400000,
  PvT = 262144;
var J_1 = L((): any => {
  q9H();
  M6();
  y_();
  FH();
  L_();
  y9();
  H6();
  oV();
  iV();
  A_1 = require("events"), ub = require("fs/promises"), _fH = require("path");
});

export {BFH as M5e,w_1 as Tuc,WvT as k6m,f_1 as Suc,j_1 as buc,ZvT as H6m,A_1 as yuc,ub as t2,_fH as TTe,XvT as R6m,PvT as x6m,J_1 as Euc};
