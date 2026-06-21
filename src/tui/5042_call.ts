// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {_ce,xUn,fct} from "../telemetry/3958_fct.ts";
import {getSubscriptionType,getRateLimitTier,getOauthAccountInfo,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {j8r} from "../core/2738_message.ts";
import {bo,configProtoStore} from "../../vendor/m2458.ts";
import {Cw,LB} from "../../vendor/m1284.ts";
import {Lte,mct} from "../../vendor/m3956.ts";
import {aRn,unt} from "../../vendor/m2750.ts";
import {HHl,IHl,DHl} from "./5041_balance.ts";
import {iPe,aRo} from "../../vendor/m5036.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {x8t,k8t} from "../core/5036_call.ts";
import {Oc,b_} from "../../vendor/m2039.ts";
import {s$t,i$t} from "../../vendor/m3953.ts";
import {clearRefusalFallbackModelLatch,lt} from "../session/0131_sent.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {PF} from "../api/2739_status.ts";
import {Te} from "../../vendor/m2253.ts";
var PHl = {};
isFullscreenWithTTY(PHl, {
  call: () => Rum
});
/** Rate limit options dialog component — shown when the user hits a rate limit. */
function wum({
  onDone: e,
  context: t
}) {
  // State for an error/redirect component returned from upgrade/extra-usage flows
  let [n, r] = HJ.useState(null),
    // context helpers
    o = _ce(),
    subscriptionType = getSubscriptionType(),
    rateLimitTier = getRateLimitTier(),
    hasExtraUsage = getOauthAccountInfo()?.hasExtraUsageEnabled === !0,
    isUsageBased = getOauthAccountInfo()?.billingType === "usage_based",
    isMax20x = subscriptionType === "max" && rateLimitTier === "default_claude_max_20x",
    isTeamOrEnterprise = subscriptionType === "team" || subscriptionType === "enterprise",
    // Feature flags
    jadeAnvilFlag = getFeatureValue_CACHED_MAY_BE_STALE("tengu_jade_anvil_4", !1),
    coralBeaconFlag = getFeatureValue_CACHED_MAY_BE_STALE("tengu_coral_beacon", !1),
    upgradePaths = o.upgradePaths,
    // Model switcher info
    fallbackModelInfo = j8r(t.options.mainLoopModel),
    configUpdate = bo(),
    // Whether the overage/balance panel should be shown
    showOverageBalance = getFeatureValue_CACHED_MAY_BE_STALE(xUn, !1) && !isTeamOrEnterprise && o.overageDisabledReason === "org_level_disabled_until" && Cw() && Lte.isEnabled(),
    [balanceData, setBalanceData] = HJ.useState(null);

  // Fetch balance when overage panel is enabled
  HJ.useEffect(() => {
    if (!showOverageBalance) return;
    let cancelled = !1;
    return aRn().then(fetchedBalance => {
      if (cancelled || !fetchedBalance) return;
      if (HHl({
        overageDisabledReason: o.overageDisabledReason,
        balanceMinorUnits: fetchedBalance.amount
      })) setBalanceData(fetchedBalance);
    }).catch(() => {}), () => {
      cancelled = !0;
    };
  }, [showOverageBalance]);

  // Build the list of options to display in the menu
  let menuOptions = HJ.useMemo(() => {
    let options = [],
      hasUpgradePaths = upgradePaths !== void 0;
    if (Lte.isEnabled()) {
      let hasPaymentMethod = Cw(),
        isAdminRestricted = isTeamOrEnterprise && !hasPaymentMethod;
      if (hasUpgradePaths ? upgradePaths.includes("overage") : !0) {
        let usageLabel = isUsageBased ? "usage" : "usage credits",
          overageLabel;
        if (isAdminRestricted) overageLabel = "Ask your admin for more usage";else overageLabel = hasExtraUsage ? `Add funds to continue with ${usageLabel}` : `Switch to ${usageLabel}`;
        options.push({
          label: overageLabel,
          value: "extra-usage"
        });
      }
    }
    if (hasUpgradePaths ? upgradePaths.includes("upgrade_plan") && iPe.isEnabled() : !isMax20x && !isTeamOrEnterprise && iPe.isEnabled()) options.push({
      label: "Upgrade your plan",
      value: "upgrade"
    });
    if (coralBeaconFlag && !isTeamOrEnterprise && iPe.isEnabled()) options.push({
      label: isMax20x ? "Switch to Team plan" : "Upgrade to Team plan",
      value: "team"
    });
    if (fallbackModelInfo !== null) options.push({
      label: `Switch to ${fallbackModelInfo.label}`,
      value: "switch-model"
    });
    let cancelOption = {
      label: isUsageBased ? "Stop" : "Stop and wait for limit to reset",
      value: "cancel"
    };
    if (jadeAnvilFlag) return [...options, cancelOption];
    return [cancelOption, ...options];
  }, [jadeAnvilFlag, coralBeaconFlag, upgradePaths, isMax20x, isTeamOrEnterprise, hasExtraUsage, isUsageBased, fallbackModelInfo]);

  // Handle cancel / dismiss
  function handleCancel() {
    logEvent("tengu_rate_limit_options_menu_cancel", {}), e(void 0, {
      display: "skip"
    });
  }

  // Handle option selection
  function handleSelect(selectedValue: any) {
    if (selectedValue === "upgrade") logEvent("tengu_rate_limit_options_menu_select_upgrade", {}), x8t(e, t).then(resultComponent => {
      if (resultComponent) r(resultComponent);
    });else if (selectedValue === "team") logEvent("tengu_rate_limit_options_menu_select_team", {}), Oc(cRo).then(opened => {
      e(opened ? `Opening ${cRo} in your browser. Run /login after upgrading to use your new plan.` : `Could not open a browser. Visit ${cRo} to upgrade, then run /login.`);
    });else if (selectedValue === "extra-usage") logEvent("tengu_rate_limit_options_menu_select_extra_usage", {}), s$t(e, t).then(resultComponent => {
      if (resultComponent) r(resultComponent);
    });else if (selectedValue === "switch-model" && fallbackModelInfo !== null) logEvent("tengu_rate_limit_options_menu_select_switch_model", {}), clearRefusalFallbackModelLatch(), configUpdate(cfg => cfg.mainLoopModel === fallbackModelInfo.fallback && cfg.mainLoopModelForSession === null ? cfg : {
      ...cfg,
      mainLoopModel: fallbackModelInfo.fallback,
      mainLoopModelForSession: null
    }), e(`Set model to ${fallbackModelInfo.label} for this session`);else if (selectedValue === "cancel") handleCancel();
  }

  // If a sub-flow returned a component (e.g. upgrade UI), render it directly
  if (n) return n;
  // If we have balance data to show, render the overage balance panel
  if (balanceData) return HJ.default.createElement(IHl, {
    balance: balanceData,
    onDone: e,
    context: t
  });
  // Default: show the rate-limit options menu
  return HJ.default.createElement(Kn, {
    title: "What do you want to do?",
    onCancel: handleCancel,
    color: "suggestion"
  }, HJ.default.createElement(pr, {
    options: menuOptions,
    onChange: handleSelect,
    visibleOptionCount: menuOptions.length
  }));
}
/** Async entry point for the rate-limit call handler — wraps wum in an element. */
async function Rum(e, t) {
  return HJ.default.createElement(wum, {
    onDone: e,
    context: t
  });
}
var HJ,
  cRo = "https://claude.ai/create/team";
var OHl = b(() => {
  lt();
  Yl();
  Li();
  zn();
  Ct();
  unt();
  PF();
  fct();
  configProtoStore();
  Ao();
  LB();
  b_();
  i$t();
  mct();
  aRo();
  k8t();
  DHl();
  HJ = M(Te(), 1);
});
export {PHl,wum,Rum,HJ,cRo,OHl};
