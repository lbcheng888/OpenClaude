// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {loadAllPluginsCacheOnly as HT,gg as Bw} from "./4445_resolvePluginRoot.ts";
import {_W as BQ,nI as oG} from "../../vendor/m3252.ts";
import {BH as bG,m5 as Eg} from "../../vendor/m2230.ts";
import {cae as p7H,J1 as Qv} from "../config/2678_withFileTypes.ts";
import {getGlobalConfig as N_,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {gs as Y9,GH as BG,sh as i$} from "../../vendor/m2589.ts";
import {t4r as eu8,tx as FW} from "../telemetry/2595_skill_name.ts";
import {pDt as XL_,J3r as ru8,mDt as PL_,rz as gi} from "../../vendor/m2590.ts";
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function WLT() {
  let H = j_("tengu_slate_fern", false);
  if (H === false) return null;
  if (H === true) return {
    days: Tl4,
    sessions: zl4
  };
  return {
    days: typeof H.days === "number" ? H.days : Tl4,
    sessions: typeof H.sessions === "number" ? H.sessions : zl4
  };
}
async function kRq() {
  try {
    if (!HT.cache?.has(undefined)) return [];
    if (BQ() !== null) return [];
    let H = WLT();
    if (!H) return [];
    let {
      enabled: _
    } = await HT();
    if (_.length === 0) return [];
    let K_2 = bG(),
      O_2 = p7H(),
      T_2 = N_().numStartups,
      z_2 = Date.now(),
      z = [];
    for (let $ of _) {
      let {
        marketplace: Y
      } = Y9($.repository);
      if (!Y || BG(Y)) continue;
      if (eu8($, K_2, O_2) !== "user-install") continue;
      if (iiO($)) continue;
      let w = XL_($.repository);
      if (!w) continue;
      if (ru8($.repository)) continue;
      let {
        sessionsSinceLastUse: A,
        daysSinceLastUse: f
      } = PL_(w, T_2, z_2);
      if (f >= H.days && A >= H.sessions) z.push({
        pluginId: $.repository,
        name: $.name,
        daysSinceLastUse: f
      });
    }
    return z.sort(($, Y) => Y.daysSinceLastUse - $.daysSinceLastUse), z;
  } catch (H) {
    return y(`plugin-disuse tip: failed to compute disused plugins: ${H}`, {
      level: "error"
    }), [];
  }
}
function ZLT(H) {
  if (BQ() !== null) return null;
  if (!WLT()) return null;
  let _ = XL_(H);
  if (!_) return null;
  if (ru8(H)) return 0;
  return PL_(_, N_().numStartups, Date.now()).daysSinceLastUse;
}
function iiO(H) {
  return Boolean(H.lspServers && Object.keys(H.lspServers).length > 0 || H.themesPath || H.themesPaths?.length || H.outputStylesPath || H.outputStylesPaths?.length || H.monitors?.length || H.workflowsPath || H.workflowsPaths?.length);
}
var Tl4 = 14,
  zl4 = 10;
var OJq = L(() => {
  t6();
  O8();
  UH();
  Eg();
  Qv();
  i$();
  Bw();
  oG();
  FW();
  gi();
});

export {WLT as Afl,kRq as pjt,ZLT as hfl,iiO as QYp,Tl4 as mfl,zl4 as ffl,OJq as cbo};
