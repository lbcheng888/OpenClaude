// @ts-nocheck
import {mGn as wWn,jmt as ymt,Gmt as Smt,Wmt as Tmt,Jje as Hje} from "../../vendor/m4795.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {cY as Yz,rge as Uhe} from "../../vendor/m3334.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function resetUpsellCountIfBalanceIncreased() {
  let currentRemaining = wWn();
  if (currentRemaining == null || currentRemaining <= 0) return;
  let lastSeenRemaining = vt().passesLastSeenRemaining ?? 0;
  if (currentRemaining > lastSeenRemaining) un(config => ({
    ...config,
    passesUpsellSeenCount: 0,
    hasVisitedPasses: false,
    passesLastSeenRemaining: currentRemaining
  }));
}
function shouldShowPassesUpsell() {
  let {
    eligible: isEligible,
    hasCache: hasCachedEligibility
  } = ymt();
  if (!isEligible || !hasCachedEligibility) return false;
  resetUpsellCountIfBalanceIncreased();
  let config = vt();
  if ((config.passesUpsellSeenCount ?? 0) >= 3) return false;
  if (config.hasVisitedPasses) return false;
  return true;
}
function useShowPassesUpsell() {
  let H = 0;
  un(_ => (H = (_.passesUpsellSeenCount ?? 0) + 1, {
    ..._,
    passesUpsellSeenCount: H
  })), j("tengu_guest_passes_upsell_shown", {
    seen_count: H
  });
}
function getInitialShowPassesUpsell() {
  let H = iDq.c(1),
    _;
  if (H[0] === Symbol.for("react.memo_cache_sentinel")) {
    let q = Smt();
    _ = Od.createElement(w, {
      dimColor: true
    }, Od.createElement(w, {
      color: "claude"
    }, "[\u273B]"), " ", Od.createElement(w, {
      color: "claude"
    }, "[\u273B]"), " ", Od.createElement(w, {
      color: "claude"
    }, "[\u273B]"), " \xB7", " ", q ? `Share Claude Code and earn ${Tmt(q)} in usage credits \xB7 /passes` : "3 guest passes at /passes"), H[0] = _;
  } else _ = H[0];
  return _;
}
function recordPassesUpsellShown() {
  let newCount = iDq.c(1);
  Yz("guest-passes", useShowPassesUpsell);
  let _;
  if (newCount[0] === Symbol.for("react.memo_cache_sentinel")) _ = Od.createElement(B, null, Od.createElement(getInitialShowPassesUpsell, null)), newCount[0] = _;else _ = newCount[0];
  return _;
}
var iDq, Od;
var pA4 = b(() => {
  Je();
  Ct();
  Hje();
  nr();
  Uhe();
  iDq = L(nt(), 1), Od = L(Te(), 1);
});

export {resetUpsellCountIfBalanceIncreased as ltm,shouldShowPassesUpsell as Byl,useShowPassesUpsell as ctm,getInitialShowPassesUpsell as utm,recordPassesUpsellShown as Fyl,iDq as nCo,Od as DG,pA4 as Uyl};
