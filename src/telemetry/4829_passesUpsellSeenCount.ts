// @ts-nocheck
import {ejn,tgt,rgt,ngt,kWe} from "../../vendor/m4827.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Bj,__e} from "../../vendor/m3350.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Reset the guest-passes upsell seen count when the user's pass balance has
 * increased since they last saw the upsell. This re-enables the upsell so a
 * user who earned more passes gets prompted again.
 */
function resetUpsellCountIfBalanceIncreased() {
  let currentRemaining = ejn();
  if (currentRemaining == null || currentRemaining <= 0) return;
  let lastSeenRemaining = Ot().passesLastSeenRemaining ?? 0;
  if (currentRemaining > lastSeenRemaining) hn(config => ({
    ...config,
    passesUpsellSeenCount: 0,
    hasVisitedPasses: !1,
    passesLastSeenRemaining: currentRemaining
  }));
}
/**
 * Decide whether to display the guest-passes upsell: only when the user is
 * eligible (with cached eligibility), has not visited the passes page, and has
 * seen the upsell fewer than 3 times.
 */
function shouldShowPassesUpsell() {
  let {
    eligible: isEligible,
    hasCache: hasCachedEligibility
  } = tgt();
  if (!isEligible || !hasCachedEligibility) return !1;
  resetUpsellCountIfBalanceIncreased();
  let config = Ot();
  if ((config.passesUpsellSeenCount ?? 0) >= 3) return !1;
  if (config.hasVisitedPasses) return !1;
  return !0;
}
/**
 * Increment the upsell seen count in global config and emit a telemetry event
 * recording how many times the upsell has been shown.
 */
function useShowPassesUpsell() {
  let seenCount = 0;
  hn(config => (seenCount = (config.passesUpsellSeenCount ?? 0) + 1, {
    ...config,
    passesUpsellSeenCount: seenCount
  })), W("tengu_guest_passes_upsell_shown", {
    seen_count: seenCount
  });
}
/** Build (memoized) the guest-passes upsell banner content shown to the user. */
function getInitialShowPassesUpsell() {
  let cache = SHo.c(1),
    rendered;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) {
    let referralCredit = rgt();
    rendered = BPe.jsxs(v, {
      dimColor: !0,
      children: [BPe.jsx(v, {
        color: "claude",
        children: "[\u273B]"
      }), " ", BPe.jsx(v, {
        color: "claude",
        children: "[\u273B]"
      }), " ", BPe.jsx(v, {
        color: "claude",
        children: "[\u273B]"
      }), " \xB7", " ", referralCredit ? `Share Claude Code and earn ${ngt(referralCredit)} in usage credits \xB7 /passes` : "3 guest passes at /passes"]
    }), cache[0] = rendered;
  } else rendered = cache[0];
  return rendered;
}
/** Render the guest-passes upsell, registering the show callback as a side effect. */
function recordPassesUpsellShown() {
  let cache = SHo.c(1);
  Bj("guest-passes", useShowPassesUpsell);
  let rendered;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) rendered = BPe.jsx($, {
    children: BPe.jsx(getInitialShowPassesUpsell, {})
  }), cache[0] = rendered;else rendered = cache[0];
  return rendered;
}
var SHo, BPe;
var Uwl = b(() => {
  je();
  kt();
  kWe();
  tr();
  __e();
  SHo = x(tt(), 1), BPe = x(oe(), 1);
});

export {resetUpsellCountIfBalanceIncreased as bum,shouldShowPassesUpsell as Fwl,useShowPassesUpsell as Eum,getInitialShowPassesUpsell as Cum,recordPassesUpsellShown as Bwl,SHo,BPe,Uwl};
