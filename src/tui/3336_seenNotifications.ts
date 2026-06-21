// @ts-nocheck
import {isClaudeAISubscriber as Co,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {kOs as TPs,G1e as C1e} from "../../vendor/m1286.ts";
import {kz as mz,yUi as pFi,M2e as f2e} from "../telemetry/2737_M2e.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {cY as Yz,rge as Uhe} from "../../vendor/m3334.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
async function vla() {
  if (Co()) return null;
  let e = await TPs();
  if (!e) return null;
  if (e.account.has_claude_max && !mz()) return "Max";
  if (e.account.has_claude_pro && !pFi()) return "Pro";
  return null;
}
function wla() {
  return (vt().seenNotifications?.[tNt] ?? 0) < SJr;
}
function j8d() {
  un(e => {
    let t = e.seenNotifications ?? {};
    return {
      ...e,
      seenNotifications: {
        ...t,
        [tNt]: (t[tNt] ?? 0) + 1
      }
    };
  }), j("tengu_switch_to_subscription_notice_shown", {});
}
function Rla(e) {
  let t = MAX_IMPRESSIONS.c(3),
    {
      subscriptionType: n
    } = e;
  Yz("subscription-switch", j8d);
  let r;
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) r = c9e.createElement(w, {
    color: "text",
    dimColor: true
  }, " ", "\xB7 /login to activate"), t[0] = r;else r = t[0];
  let o;
  if (t[1] !== n) o = c9e.createElement(B, null, c9e.createElement(w, {
    color: "suggestion"
  }, "Use your existing Claude ", n, " plan with Claude Code", r)), t[1] = n, t[2] = o;else o = t[2];
  return o;
}
var MAX_IMPRESSIONS,
  c9e,
  tNt = "subscription-switch",
  SJr = 3;
var w0n = b(() => {
  Je();
  Ct();
  C1e();
  mo();
  nr();
  f2e();
  Uhe();
  MAX_IMPRESSIONS = L(nt(), 1), c9e = L(Te(), 1);
});

export {vla as Bca,wla as Fca,j8d as pGd,Rla as Uca,MAX_IMPRESSIONS as Nca,c9e as O9e,tNt as bNt,SJr as TXr,w0n as uDn};
