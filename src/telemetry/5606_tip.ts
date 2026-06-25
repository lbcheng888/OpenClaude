// @ts-nocheck
import {dPe as iRH,pgl as g64,HKn as XB6,Q8t as Bm_} from "../../vendor/m4592.ts";
import {getSettings_DEPRECATED as nq,getInitialSettings as n8,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {bnr as $r6,d2o as ERq,p2o as SRq} from "../agent/5605_id.ts";
import {Zct as v7_} from "../../vendor/m3840.ts";
import {He as vH,mn as M6} from "./0600_feature_name.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH} from "../../vendor/m5.ts";
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
export {Xl4 as Klc,Pl4 as zlc,Wl4 as jlc,Yr6 as Enr,SLT as dGm,CRq as m2o};
