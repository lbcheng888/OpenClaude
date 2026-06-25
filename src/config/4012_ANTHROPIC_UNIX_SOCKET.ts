// @ts-nocheck
import {nt as rt} from "../../vendor/m127.ts";
import {xK as Jre,rI as JI} from "./0586_rI.ts";
import {L1i as eIi,M1i as tIi,Int as set,F2e as AUe} from "../agent/2589_F2e.ts";
import {getGlobalConfig as vt,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {xh as eg,eD as gO,wm as gf} from "../../vendor/m707.ts";
import {getSettingsForSource as Cn,br as Er} from "./0745_updateSettingsForSource.ts";
import {$j as Xz,oUt as iNt} from "./3374_key.ts";
import {setSettingsColorEnv as E_n,VM as E1} from "../agent/2231_subprocessEnv.ts";
import {Scs as gns,mYe as J7e} from "./0750_level.ts";
import {Acs as Sns,zK as l7} from "./0751_bytes.ts";
import {clearProxyCache as tSr,configureGlobalAgents as ACt,ey as Z_} from "./1026_shouldBypassProxyWithCidr.ts";
import {b} from "../../runtime.ts";
import {dn as an} from "./0137_namespace.ts";
// @ts-nocheck
function removeUnixSocketAuthEnv(H) {
  if (!H || !process.env.ANTHROPIC_UNIX_SOCKET) return H || {};
  let {
    ANTHROPIC_UNIX_SOCKET: _,
    ANTHROPIC_BASE_URL: q,
    ANTHROPIC_API_KEY: K,
    ANTHROPIC_AUTH_TOKEN: O,
    CLAUDE_CODE_OAUTH_TOKEN: T,
    CLAUDE_CODE_ARTIFACTS_API_BASE_URL: i,
    ...z
  } = H;
  return z;
}
function refreshManagedEnvState() {
  let H = rt(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST);
  qF_ = {
    managedByHost: H || !!process.env.CLAUDE_CODE_HOST_AUTH_ENV_VAR,
    managedByHostFlag: H,
    desktopHost: Jre()
  };
}
function filterManagedHostEnv(H, _) {
  if (!H) return {};
  if (!(qF_.managedByHost || qF_.desktopHost && eOT.has(_))) return H;
  let K = {};
  for (let [O, T] of Object.entries(H)) {
    if (eIi(O)) continue;
    if (qF_.managedByHostFlag && tIi(O)) continue;
    K[O] = T;
  }
  return K;
}
function filterDesktopInheritedEnv(H) {
  if (!H || !Id6) return H || {};
  let _ = {};
  for (let [q, K] of Object.entries(H)) if (!Id6.has(q)) _[q] = K;
  return _;
}
function stripColorEnv(H) {
  if (!H) return {};
  let {
    NO_COLOR: _,
    FORCE_COLOR: q,
    ...K
  } = H;
  if (_ !== undefined) YT_.NO_COLOR = _;
  if (q !== undefined) YT_.FORCE_COLOR = q;
  return K;
}
function prepareSettingsEnv(H, _) {
  return stripColorEnv(filterDesktopInheritedEnv(filterManagedHostEnv(removeUnixSocketAuthEnv(H), _)));
}
function UUH() {
  if (refreshManagedEnvState(), Id6 === undefined) Id6 = qF_.desktopHost ? new Set(Object.keys(process.env)) : null;
  YT_ = {}, Object.assign(process.env, prepareSettingsEnv(vt().env, "globalConfig"));
  for (let H of KTT) {
    if (H === "policySettings") continue;
    if (!eg(H)) continue;
    Object.assign(process.env, prepareSettingsEnv(Cn(H)?.env, H));
  }
  Xz(), Object.assign(process.env, prepareSettingsEnv(Cn("policySettings")?.env, "policySettings"));
  for (let H of gO()) {
    let _ = prepareSettingsEnv(Cn(H)?.env, H);
    for (let [q, K] of Object.entries(_)) if (set.has(q.toUpperCase())) process.env[q] = K;
  }
  E_n(YT_);
}
function to() {
  refreshManagedEnvState(), YT_ = {}, Object.assign(process.env, prepareSettingsEnv(vt().env, "globalConfig"));
  for (let H of gO()) Object.assign(process.env, prepareSettingsEnv(Cn(H)?.env, H));
  E_n(YT_), gns(), Sns(), tSr(), ACt();
}
var qF_, eOT, Id6, YT_, KTT;
var AT_ = b(() => {
  iNt();
  J7e();
  nr();
  JI();
  an();
  AUe();
  l7();
  Z_();
  gf();
  Er();
  E1();
  qF_ = {
    managedByHost: false,
    managedByHostFlag: false,
    desktopHost: false
  };
  eOT = new Set(["policySettings", "projectSettings", "localSettings"]);
  YT_ = {};
  KTT = ["userSettings", "flagSettings", "policySettings"];
});
export {removeUnixSocketAuthEnv as P0p,refreshManagedEnvState as i3a,filterManagedHostEnv as L0p,filterDesktopInheritedEnv as M0p,stripColorEnv as N0p,prepareSettingsEnv as bdt,UUH as O6e,to as Kq,qF_ as M3t,eOT as O0p,Id6 as r3n,YT_ as Edt,KTT as F0p,AT_ as L6e};
