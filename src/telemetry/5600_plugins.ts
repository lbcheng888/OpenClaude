// @ts-nocheck
import {shouldSkipPluginAutoupdate as jXH,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {checkEnabledPlugins as fAq,Lje as dBH} from "../../vendor/m4664.ts";
import {NP as Nk,F9 as Au,$0e as hRH,V6 as qU,mne as J_H,vf as Zz,U0e as LRH,hS as tj} from "../config/4438_source.ts";
import {gs as $9,GH as SG,sh as t$} from "../../vendor/m2589.ts";
import {Uv as J2,nI as kL} from "../../vendor/m3252.ts";
import {Npe as R3H,ik as u0} from "../agent/0726_level.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {sleep as l6} from "./1483_withTimeout.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {sz as Li,D$ as ug,tx as HZ} from "./2595_skill_name.ts";
import {e1o as gRq,$Qn as vr6,t1o as QRq} from "../../vendor/m5598.ts";
import {kn as I6,SA as L$} from "../config/0689_timestamp.ts";
import {vye as YwH,RVn as dg6} from "./4974_enabled.ts";
import {ax as UW,gg as BA} from "../agent/4445_resolvePluginRoot.ts";
import {isTmuxControlMode as n_,Ie as vH,Oe as IH,ln as M6} from "./0594_feature_name.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {b as L} from "../../runtime.ts";
/* Restored Claude Code 2.1.177 module: Background marketplace plugin installation telemetry..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function setMarketplaceInstallStatus(H: any, _: any, q: any, K: any): any {
  H((O: any): any => ({
    ...O,
    plugins: {
      ...O.plugins,
      installationStatus: {
        ...O.plugins.installationStatus,
        marketplaces: O.plugins.installationStatus.marketplaces.map((T: any): any => T.name === _ ? {
          ...T,
          status: q,
          error: K
        } : T)
      }
    }
  }));
}
async function refreshMissingEnabledPluginCatalogs(H: any = new Set()): Promise<any> {
  let _ = new Set();
  if (jXH()) return _;
  try {
    let q = await fAq();
    if (q.length === 0) return _;
    let K = await Nk(),
      O = Au(),
      T = new Map(),
      z = new Map();
    for (let $ of q) {
      let {
          name: Y,
          marketplace: A
        } = $9($),
        w = A ? K[A] : void 0;
      if (!Y || !A || !w || SG(A) || H.has(A) || w.source.source === "settings" || !J2(w.source) || hRH(w.installLocation) !== void 0 || !R3H(A, w, O[A]?.autoUpdate)) continue;
      let f = z.get(A);
      if (f === void 0) f = await qU(A), z.set(A, f);
      if (f === null) continue;
      if (!f.plugins.some((j: any): any => j.name === Y)) {
        let j = T.get(A);
        if (j) j.push($);else T.set(A, [$]);
      }
    }
    if (T.size === 0) return _;
    N(`refresh-on-miss: ${T.size} marketplace(s) have enabled plugins missing from local catalog; refreshing`), await l6(Math.floor(Math.random() * PhT), void 0, {
      unref: !0
    });
    for (let [$, Y] of T) {
      let A;
      try {
        await J_H($, void 0, {
          skipIfRecent: !0
        });
      } catch (j) {
        A = j, N(`refresh-on-miss: failed to refresh marketplace '${$}': ${GH(j)}`, {
          level: "warn"
        });
      }
      let w = A !== void 0 ? null : await qU($),
        f = !1;
      for (let j of Y) {
        let {
            name: J
          } = $9(j),
          D = w !== null && w.plugins.some((X: any): any => X.name === J);
        f ||= D;
        let M = A !== void 0 ? "refresh_failed" : D ? "resolved" : "still_missing";
        N(`refresh-on-miss: ${j} \u2192 ${M}`), c("tengu_plugin_refresh_on_miss", {
          outcome: tH(M),
          ...(A !== void 0 && {
            error_kind: tH(Li(A))
          }),
          ...ug(j)
        });
      }
      if (f) _.add($);
    }
  } catch (q) {
    N(`refresh-on-miss: unexpected error: ${GH(q)}`, {
      level: "warn"
    });
  }
  return _;
}
/* Reconciles marketplace plugin installations in the background. */
async function performBackgroundPluginInstallations(H: any): Promise<any> {
  N("performBackgroundPluginInstallations called");
  try {
    let _ = Au(),
      q = await Zz().catch((): any => ({})),
      K = gRq(_, q),
      O = [...K.missing, ...K.sourceChanged.map(($: any): any => $.name)];
    if (H(($: any): any => ({
      ...$,
      plugins: {
        ...$.plugins,
        installationStatus: {
          marketplaces: O.map((Y: any): any => ({
            name: Y,
            status: "pending"
          })),
          plugins: []
        }
      }
    })), O.length > 0) N(`Installing ${O.length} marketplace(s) in background`);
    let T = await vr6({
      onProgress: ($: any): any => {
        switch ($.type) {
          case "installing":
            setMarketplaceInstallStatus(H, $.name, "installing");
            break;
          case "installed":
            setMarketplaceInstallStatus(H, $.name, "installed");
            break;
          case "failed":
            setMarketplaceInstallStatus(H, $.name, "failed", $.error);
            break;
        }
      }
    });
    if (T.installed.length > 0 || T.updated.length > 0 || T.failed.length > 0) {
      let $ = {
        installed_count: T.installed.length,
        updated_count: T.updated.length,
        failed_count: T.failed.length,
        up_to_date_count: T.upToDate.length
      };
      c("tengu_marketplace_background_install", $), I6("info", "tengu_marketplace_background_install", $);
    }
    let z = await refreshMissingEnabledPluginCatalogs(new Set([...T.installed, ...T.updated]));
    if (T.installed.length > 0 || z.size > 0) {
      LRH(), N(`Auto-refreshing plugins (installed: ${T.installed.length}, stale-refreshed: ${z.size})`);
      try {
        await YwH(H);
      } catch ($) {
        N(`Auto-refresh failed, falling back to needsRefresh: ${$}`, {
          level: "error"
        }), UW("performBackgroundPluginInstallations: auto-refresh failed"), H((Y: any): any => {
          if (Y.plugins.needsRefresh) return Y;
          return {
            ...Y,
            plugins: {
              ...Y.plugins,
              needsRefresh: !0
            }
          };
        }), n_("plugin_marketplace_bg_install", "auto_refresh_failed");
        return;
      }
    } else if (T.updated.length > 0) LRH(), UW("performBackgroundPluginInstallations: marketplaces reconciled"), H(($: any): any => {
      if ($.plugins.needsRefresh) return $;
      return {
        ...$,
        plugins: {
          ...$.plugins,
          needsRefresh: !0
        }
      };
    });
    if (T.failed.length > 0) n_("plugin_marketplace_bg_install", "reconcile_partial_failure");else vH("plugin_marketplace_bg_install");
  } catch (_) {
    EH(_), IH("plugin_marketplace_bg_install", "reconcile_error");
  }
}
var PhT = 5000;
var on4 = L((): any => {
  T8();
  FH();
  L$();
  L_();
  S6();
  tj();
  t$();
  BA();
  kL();
  dBH();
  QRq();
  dg6();
  u0();
  HZ();
  M6();
  y_();
});

export {setMarketplaceInstallStatus as n1o,refreshMissingEnabledPluginCatalogs as C$m,performBackgroundPluginInstallations as Utc,PhT as E$m,on4 as $tc};
