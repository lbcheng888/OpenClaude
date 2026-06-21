// @ts-nocheck
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {Ie as vH,Oe as IH,ln as M6} from "./0594_feature_name.ts";
import {Pn as b6,bt as L_} from "../../vendor/m195.ts";
import {UBn as EC6,Pge as aYH} from "../../vendor/m3855.ts";
import {rDn as MG6,nDn as Iy_} from "../../vendor/m3327.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
/*
 * telemetry/5687_pid.ts - Telemetry and event-state restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
function L_1(H: any): any {
  return Math.round(H * (0.5 + Math.random()));
}
// FIXME: unverified name
function yvT(H: any): any {
  return L_1(Math.min(1000 * 2 ** H, NvT));
}
// FIXME: unverified name
class Go6 {
  id: any;
  kind: any;
  config: any;
  invocation: any;
  logger: any;
  authManager: any;
  onStateChange: any;
  child: any = null;
  spawnedAt: any = 0;
  stopping: any = !1;
  consecutiveCrashes: any = 0;
  backoffTimer: any = null;
  exitPromise: any = null;
  constructor(H: any, _: any, q: any, K: any, O: any, T: any, z: any) {
    this.id = H;
    this.kind = _;
    this.config = q;
    this.invocation = K;
    this.logger = O;
    this.authManager = T;
    this.onStateChange = z;
  }
  get status(): any {
    let H = this.child?.pid;
    return H !== void 0 ? {
      pid: H,
      startedAt: this.spawnedAt
    } : null;
  }
  start(H: any = 0): any {
    if (this.stopping = !1, H > 0) this.scheduleRespawn(H);else this.spawn();
  }
  updateConfig(H: any): any {
    this.config = H;
  }
  async stop(): Promise<any> {
    if (this.stopping = !0, this.backoffTimer) clearTimeout(this.backoffTimer), this.backoffTimer = null;
    let H = this.child;
    if (!H) return;
    let _ = this.exitPromise,
      q = !1;
    if (typeof H.send === "function") try {
      q = H.send({
        type: "shutdown"
      });
    } catch {}
    if (t_() !== "windows" || !q) H.kill("SIGTERM");
    let K = setTimeout((O: any): any => O.kill("SIGKILL"), kvT, H);
    if (K.unref(), _) await _;
    clearTimeout(K);
  }
  spawn(): any {
    let H = Date.now();
    this.spawnedAt = H;
    let _ = R_1.spawn(this.invocation.cmd, [...this.invocation.prefixArgs, "--daemon-worker", this.kind], {
      stdio: this.authManager ? ["pipe", "pipe", "pipe", "ipc"] : ["pipe", "pipe", "pipe"],
      windowsHide: !0
    });
    if (this.child = _, this.onStateChange?.(), _.stdin.on("error", (T: any): any => {
      this.logger.write(this.id, `stdin write error: ${T.message}`);
    }), _.stdin.write(bH({
      config: this.config,
      initialAccessToken: this.authManager?.getAccessToken()
    }) + `
`), _.stdin.end(), this.authManager) this.authManager.attachWorker(_);
    let q = bhq.createInterface({
      input: _.stdout
    });
    q.on("line", (T: any): any => this.logger.write(this.id, T));
    let K = bhq.createInterface({
      input: _.stderr
    });
    K.on("line", (T: any): any => this.logger.write(this.id, T)), _.on("spawn", (): any => vH("daemon_worker_spawn"));
    let O = !1;
    this.exitPromise = new Promise((T: any): any => {
      let z = ($: any, Y: any): any => {
        if (O) return;
        if (O = !0, q.close(), K.close(), this.child = null, this.onStateChange?.(), this.authManager) this.authManager.detachWorker(_);
        this.exitPromise = null, this.onExit($, Y, H), T();
      };
      _.on("exit", z), _.on("error", ($: any): any => {
        if (this.logger.write(this.id, `spawn error: ${$.message}`), IH("daemon_worker_spawn", b6($) ? "daemon_worker_spawn_enoent" : "daemon_worker_spawn_error"), !b6($)) {
          z(null, null);
          return;
        }
        EC6().then((Y: any): any => {
          if (Y && Y !== this.invocation.cmd) this.logger.write(this.id, `execPath gone (version GC?) \u2014 re-resolved to ${Y}`), this.invocation = {
            cmd: Y,
            prefixArgs: []
          }, this.consecutiveCrashes = 0;
          z(null, null);
        });
      });
    });
  }
  onExit(H: any, _: any, q: any): any {
    if (this.stopping) return;
    let K = Date.now() - q;
    if (H === MG6) {
      let T = L_1(VvT);
      this.logger.write(this.id, `exited tempfail code=${H} uptime=${K}ms \u2014 retry in ${T}ms`), this.scheduleRespawn(T);
      return;
    }
    if (H === Iy_) {
      this.logger.write(this.id, `exited permanently code=${H} uptime=${K}ms \u2014 will not respawn`), c("tengu_daemon_worker_permanent_exit", {
        exit_code: H ?? void 0,
        uptime_ms: K,
        worker_kind: tH(this.kind)
      });
      return;
    }
    if (H !== 0 || K < hvT) {
      this.consecutiveCrashes++;
      let T = yvT(this.consecutiveCrashes);
      this.logger.write(this.id, `exited code=${H} sig=${_} uptime=${K}ms consecutive=${this.consecutiveCrashes} backoff=${T}ms`), c("tengu_daemon_worker_crash", {
        consecutive: this.consecutiveCrashes,
        exit_code: H ?? void 0,
        uptime_ms: K,
        worker_kind: tH(this.kind)
      }), this.scheduleRespawn(T);
    } else this.consecutiveCrashes = 0, this.logger.write(this.id, `exited code=${H} sig=${_} uptime=${K}ms (clean) \u2014 respawning`), this.spawn();
  }
  scheduleRespawn(H: any): any {
    if (this.backoffTimer) clearTimeout(this.backoffTimer);
    this.backoffTimer = setTimeout((): any => {
      if (this.backoffTimer = null, !this.stopping) this.spawn();
    }, H), this.backoffTimer.unref();
  }
}
var R_1,
  bhq,
  hvT = 60000,
  kvT = 5000,
  NvT = 300000,
  VvT = 30000,
  Ihq = 2000;
var h_1 = L((): any => {
  M6();
  y_();
  L_();
  y9();
  aYH();
  H6();
  R_1 = require("child_process"), bhq = require("readline");
});
export {L_1 as Duc,yvT as B6m,Go6 as IZn,R_1 as Iuc,bhq as zNo,hvT as O6m,kvT as L6m,NvT as M6m,VvT as N6m,Ihq as YNo,h_1 as Puc};
