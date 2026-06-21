// @ts-nocheck
import {gG as Gc,Ztl as MrK,enl as XrK,rnl as ZrK,M0e as WRH} from "../config/4434_path.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {yjn as Cm6,U0e as LRH,F9 as Au,hS as tj} from "../config/4438_source.ts";
import {ax as UW,gg as BA} from "../agent/4445_resolvePluginRoot.ts";
import {jt as Q_,ws as M9} from "../../vendor/m228.ts";
import {N7e as ddH,SA as L$} from "../config/0689_timestamp.ts";
import {$Qn as vr6,t1o as QRq} from "../../vendor/m5598.ts";
import {Alc as De4,hlc as Me4} from "../../vendor/m5707.ts";
import {fYn as ql6,gDo as YWq} from "./5236_scope.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {b as L} from "../../runtime.ts";
/** Restored Claude Code 2.1.177 module. Collects installed marketplace identifiers for telemetry. */
async function getInstalledMarketplaces(H: any): any {
  let _ = Gc();
  N(`installPluginsForHeadless: starting${_ ? " (zip cache mode)" : ""}`);
  let q = await Cm6();
  if (q) LRH(), UW("headlessPluginInstall: seed marketplaces registered");
  if (_) await Q_().mkdir(MrK()), await Q_().mkdir(XrK());
  let K = Object.keys(Au()).length,
    O = {
      marketplaces_installed: 0,
      delisted_count: 0
    },
    T = q;
  try {
    if (K === 0) N("installPluginsForHeadless: no marketplaces declared");else {
      let $ = await ddH("headless_marketplace_reconcile", (): any => vr6({
        skip: _ ? (A: any, w: any): any => !ZrK(w) : void 0,
        onProgress: (A: any): any => {
          if (A.type === "installed") H?.({
            status: "installed",
            name: A.name
          }), N(`installPluginsForHeadless: installed marketplace ${A.name}`);else if (A.type === "failed") H?.({
            status: "failed",
            name: A.name,
            error: A.error
          }), N(`installPluginsForHeadless: failed to install marketplace ${A.name}: ${A.error}`);
        }
      }), (A: any): any => ({
        installed_count: A.installed.length,
        updated_count: A.updated.length,
        failed_count: A.failed.length,
        skipped_count: A.skipped.length
      }));
      if ($.skipped.length > 0) N(`installPluginsForHeadless: skipped ${$.skipped.length} marketplace(s) unsupported by zip cache: ${$.skipped.join(", ")}`);
      let Y = $.installed.length + $.updated.length;
      if (Y > 0) LRH(), UW("headlessPluginInstall: marketplaces reconciled"), T = !0;
      O.marketplaces_installed = Y;
    }
    if (_) await De4();
    let z = await ql6();
    if (O.delisted_count = z.length, z.length > 0) T = !0;
    if (T) UW("headlessPluginInstall: plugins changed");
    return T;
  } catch (z) {
    return N(`installPluginsForHeadless: failed: ${GH(z)}`, {
      level: "error"
    }), !1;
  } finally {
    c("tengu_headless_plugin_install", O);
  }
}
var initInstalledMarketplacesTelemetry = L((): any => {
  y_();
  FH();
  L$();
  L_();
  M9();
  tj();
  YWq();
  BA();
  QRq();
  WRH();
  Me4();
});

export {getInstalledMarketplaces as fNo,initInstalledMarketplacesTelemetry as glc};
