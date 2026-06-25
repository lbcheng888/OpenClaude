// @ts-nocheck
import {OG as Gc,Bll as MrK,Ull as XrK,Wll as ZrK,DDe as WRH} from "../config/4456_path.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {BGn as Cm6,MDe as LRH,l9 as Au,dS as tj} from "../config/4460_source.ts";
import {clearPluginCache as UW,path as BA} from "../agent/4467_resolvePluginRoot.ts";
import {Wt as Q_,ps as M9} from "../../vendor/m230.ts";
import {Oje as ddH,pf as L$} from "../config/0693_timestamp.ts";
import {Gnr as vr6,A2o as QRq} from "../../vendor/m5636.ts";
import {Ayc as De4,Ryc as Me4} from "../../vendor/m5754.ts";
import {fZn as ql6,N1o as YWq} from "./5269_scope.ts";
import {Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
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
export {getInstalledMarketplaces as o9o,initInstalledMarketplacesTelemetry as vyc};
