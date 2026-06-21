// @ts-nocheck
import {lj as MU,mPe as iLH,Uue as x1H,h8e as NUH} from "../config/5123_proto.ts";
import {je as oH} from "../../vendor/m577.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {k6t as gm_,yne as So} from "../../vendor/m4577.ts";
import {I6t as cm_,gDe as sRH} from "../../vendor/m4579.ts";
import {X6 as Du,fDe as oRH,ADe as FAH} from "../../vendor/m4578.ts";
import {bgSupervisorNoun as Jf,bv as wP} from "../config/2204_shouldShowLaunchComposer.ts";
import {saveGlobalConfig as P6,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/*
 * telemetry/5103_onStarting.ts - Telemetry and event-state restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
async function RU_(): Promise<any> {
  let H = await MU({
    onStarting: GU_
  });
  if (H.ok || !H.askInstall) return H;
  if (!process.stdin.isTTY || !process.stderr.isTTY || oH.isCI) return H;
  process.stderr.write(`No background daemon is running.
Installing it as a service keeps the background daemon running across reboot so 'claude agents' stays available.
`);
  let _ = await _4T("Install as a service now? [y/N/never, or 'once' just for now] ");
  switch (c("tengu_bg_daemon_cold_start_ask_answer", {
    answer_yes: _ === "yes",
    answer_once: _ === "once",
    answer_never: _ === "never"
  }), _) {
    case "yes":
      {
        await gm_();
        let q = await cm_({
          jsonPath: Du(),
          logPath: oRH()
        });
        if (!q.ok) return process.stderr.write(`Service install failed (${q.error}). Falling back to a transient ${Jf()} for now.
`), MU({
          forceTransient: !0,
          onStarting: GU_
        });
        return process.stderr.write(`Installed: ${q.servicePath}
Run 'claude daemon uninstall' to undo.
`), GU_(), (await iLH(x1H)) ? {
          ok: !0
        } : {
          ok: !1,
          reason: `service installed but the daemon did not become reachable within ${x1H / 1000}s \u2014 check 'claude daemon status'`
        };
      }
    case "once":
      return MU({
        forceTransient: !0,
        onStarting: GU_
      });
    case "never":
      return P6((q: any): any => q.daemonInstallPromptDismissed ? q : {
        ...q,
        daemonInstallPromptDismissed: !0
      }), MU({
        forceTransient: !0,
        onStarting: GU_
      });
    case "no":
      return H;
  }
}
// FIXME: unverified name
async function _4T(H: any): Promise<any> {
  let _ = pZ4.createInterface({
    input: process.stdin,
    output: process.stderr
  });
  try {
    let K = (await new Promise((O: any): any => {
      _.once("close", (): any => O("n")), _.question(H, O);
    })).trim().toLowerCase();
    if (K === "y" || K === "yes") return "yes";
    if (K === "once" || K === "o") return "once";
    if (K === "never") return "never";
    return "no";
  } finally {
    _.close();
  }
}
var pZ4,
  GU_ = (): any => process.stderr.write(`Starting ${Jf()}\u2026
`);
var JXq = L((): any => {
  wP();
  y_();
  T8();
  _q();
  So();
  FAH();
  sRH();
  NUH();
  pZ4 = require("readline");
});
export {RU_ as d5t,_4T as ZAm,pZ4 as gOl,GU_ as u5t,JXq as Jxo};
