// @ts-nocheck
import {withTimeout as lu} from "../telemetry/1483_withTimeout.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {mDn as k0n,Cst as ost,Zca as Ula,wXr as RJr} from "../../vendor/m3342.ts";
import {getIsInteractive as Gx,lt as ct} from "../session/0131_sent.ts";
import {qu as Vu,bk as _k} from "../../vendor/m2291.ts";
import {render as p5,ze as Je} from "../../vendor/m2452.ts";
import {AppStateProvider as _E,Jq as Nq} from "../../vendor/m3354.ts";
import {KeybindingSetup as bC,xW as uW} from "../../vendor/m3346.ts";
import {fDn as H0n,RXr as xJr} from "../../vendor/m3343.ts";
import {getBaseRenderOptions as cN,zee as Nee} from "../telemetry/3356_getBaseRenderOptions.ts";
import {gracefulShutdownSync as qc,ym as Km} from "../config/3332_flushAnalyticsSinks.ts";
import {b,M as L} from "../../runtime.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function uca() {
  return q0n;
}
function UJr(e) {
  if (FJr = e, e && ast.length > 0) {
    let t = ast;
    ast = [];
    for (let n of t) n(e);
  }
}
async function n5d() {
  let e,
    t = new Promise(r => {
      e = r, ast.push(r);
    }),
    n = await lu(t, t5d, "managed-settings security dialog requester wait timed out").catch(() => null);
  if (n === null) ast = ast.filter(r => r !== e);
  return n;
}
async function cca(e, t) {
  let n = await e(t);
  if (j(n === "approved" ? "tengu_managed_settings_security_dialog_accepted" : "tengu_managed_settings_security_dialog_rejected", {}), n === "approved") He("remote_managed_settings_security_check");
  return n;
}
async function dca(e, t) {
  if (!t || !k0n(ost(t))) return "no_check_needed";
  if (!Ula(e, t)) return "no_check_needed";
  if (!Gx()) return "no_check_needed";
  if (j("tengu_managed_settings_security_dialog_shown", {}), FJr) return cca(FJr, t);
  if (Vu.has(process.stdout)) {
    let r = await n5d();
    if (r) return cca(r, t);
  }
  let n = Vu.has(process.stdout);
  if (!n) q0n = true;
  return new Promise(r => {
    (async () => {
      let {
        rerender: o,
        unmount: s
      } = await p5($0n.default.createElement(_E, null, $0n.default.createElement(bC, null, $0n.default.createElement(H0n, {
        settings: t,
        onAccept: () => {
          if (j("tengu_managed_settings_security_dialog_accepted", {}), He("remote_managed_settings_security_check"), n) o(null);else s();
          q0n = false, r("approved");
        },
        onReject: () => {
          if (j("tengu_managed_settings_security_dialog_rejected", {}), n) o(null);else s();
          q0n = false, r("rejected");
        }
      }))), cN(false));
    })();
  });
}
function isSecurityDialogPending(e) {
  if (e === "rejected") return qc(1), false;
  return true;
}
var $0n,
  FJr = null,
  ast,
  t5d = 5000,
  q0n = false;
var init = b(() => {
  ct();
  xJr();
  RJr();
  _k();
  Je();
  uW();
  Nq();
  Km();
  Nee();
  cn();
  Ct();
  $0n = L(Te(), 1), ast = [];
});

export {uca as Eua,UJr as FXr,n5d as vGd,cca as bua,dca as Cua,isSecurityDialogPending as vua,$0n as vDn,FJr as BXr,ast as Rst,t5d as CGd,q0n as wDn,init as UXr};
