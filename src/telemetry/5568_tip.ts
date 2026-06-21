// @ts-nocheck
import {pDe as iRH,Pll as g64,Y8n as XB6,v6t as Bm_} from "../../vendor/m4564.ts";
import {getSettings_DEPRECATED as nq,getInitialSettings as n8,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {TQn as $r6,qMo as ERq,jMo as SRq} from "../agent/5567_id.ts";
import {Zat as v7_} from "../../vendor/m3822.ts";
import {Ie as vH,ln as M6} from "./0594_feature_name.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
/*
 * telemetry/5525_tip.ts - Telemetry and event-state restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
function Xl4(H: any): any {
  if (H.length === 0) return;
  if (H.length === 1) return H[0];
  let _ = H.map((q: any): any => ({
    tip: q,
    sessions: iRH(q.id)
  }));
  return _.sort((q: any, K: any): any => {
    if (q.sessions !== K.sessions) return K.sessions - q.sessions;
    return (K.tip.priority ?? 0) - (q.tip.priority ?? 0);
  }), _[0]?.tip;
}
// FIXME: unverified name
async function Pl4(H: any): Promise<any> {
  if (nq().spinnerTipsEnabled === !1) return;
  let _ = await $r6(H);
  if (_.length === 0) return;
  return Xl4(_);
}
// FIXME: unverified name
async function Wl4(H: any): Promise<any> {
  if (nq().spinnerTipsEnabled === !1) return;
  if (v7_(n8().spinnerTipsOverride)) return;
  let _ = await ERq();
  if (_.length === 0) return;
  let q = [];
  for (let K of _) {
    if (!K.pluginId) continue;
    if (g64(K.pluginId) >= SLT) continue;
    if (iRH(K.id) < K.cooldownSessions) continue;
    if (await K.isRelevant(H)) q.push(K);
  }
  return Xl4(q);
}
// FIXME: unverified name
function Yr6(H: any, _: any = "spinner"): any {
  XB6(H.id, H.pluginId), vH(_ === "startup" ? "tips_startup_show" : "tips_spinner_show");
  let q = H.id.startsWith("marketplace-plugin:") && H.id.includes("@") ? "marketplace-plugin:org-marketplace" : H.id;
  c("tengu_tip_shown", {
    tipIdLength: q,
    cooldownSessions: H.cooldownSessions,
    surface: tH(_)
  });
}
var SLT = 2;
var CRq = L((): any => {
  N8();
  M6();
  y_();
  Bm_();
  SRq();
});
export {Xl4 as sec,Pl4 as iec,Wl4 as aec,Yr6 as SQn,SLT as M2m,CRq as WMo};
