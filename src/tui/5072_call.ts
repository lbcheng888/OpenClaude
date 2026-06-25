// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {hce,u3n,kdt} from "../telemetry/4025_kdt.ts";
import {getSubscriptionType as vi,getRateLimitTier as U3,getOauthAccountInfo as hc,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {oE,RM} from "../../vendor/m1289.ts";
import {xte,wdt} from "../../vendor/m4023.ts";
import {hot,got} from "../../vendor/m2763.ts";
import {eNl,tNl,nNl} from "./5071_balance.ts";
import {iOe,gxo} from "../../vendor/m5066.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {JGt,XGt} from "../core/5066_call.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {K3t,z3t} from "../../vendor/m4020.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var rNl = {};
ft(rNl, {
  call: () => call
});
/**
 * Rate-limit options menu. Shown when the user hits a usage/rate limit;
 * offers upgrade / extra-usage / team / cancel actions based on the
 * current plan, billing type and feature flags.
 */
function FTm({
  onDone,
  context
}: {
  onDone: (message?: string, opts?: { display?: string }) => void;
  context: unknown;
}) {
  let [pendingNode, setPendingNode] = XWe.useState<unknown>(null),
    upgradeInfo = hce(),
    subscriptionType = vi(),
    maxPlanType = U3(),
    hasExtraUsageEnabled = hc()?.hasExtraUsageEnabled === !0,
    isUsageBased = hc()?.billingType === "usage_based",
    isMax20x = subscriptionType === "max" && maxPlanType === "default_claude_max_20x",
    isTeamOrEnterprise = subscriptionType === "team" || subscriptionType === "enterprise",
    anvilFlag = it("tengu_jade_anvil_4", !1),
    coralBeaconFlag = it("tengu_coral_beacon", !1),
    upgradePaths = upgradeInfo.upgradePaths,
    showLowBalance = it(u3n, !1) && !isTeamOrEnterprise && upgradeInfo.overageDisabledReason === "org_level_disabled_until" && oE() && xte.isEnabled(),
    [balance, setBalance] = XWe.useState<unknown>(null);
  XWe.useEffect(() => {
    if (!showLowBalance) return;
    let cancelled = !1;
    return hot().then(balanceInfo => {
      if (cancelled || !balanceInfo) return;
      if (eNl({
        overageDisabledReason: upgradeInfo.overageDisabledReason,
        balanceMinorUnits: balanceInfo.amount
      })) setBalance(balanceInfo);
    }).catch(() => {}), () => {
      cancelled = !0;
    };
  }, [showLowBalance]);
  let options = XWe.useMemo(() => {
    let menuOptions: { label: string; value: string }[] = [],
      hasUpgradePaths = upgradePaths !== void 0;
    if (xte.isEnabled()) {
      let isOverage = oE(),
        isAdminGated = isTeamOrEnterprise && !isOverage;
      if (hasUpgradePaths ? upgradePaths.includes("overage") : !0) {
        let usageLabel = isUsageBased ? "usage" : "usage credits",
          extraUsageLabel;
        if (isAdminGated) extraUsageLabel = "Ask your admin for more usage";else extraUsageLabel = hasExtraUsageEnabled ? `Add funds to continue with ${usageLabel}` : `Switch to ${usageLabel}`;
        menuOptions.push({
          label: extraUsageLabel,
          value: "extra-usage"
        });
      }
    }
    if (hasUpgradePaths ? upgradePaths.includes("upgrade_plan") && iOe.isEnabled() : !isMax20x && !isTeamOrEnterprise && iOe.isEnabled()) menuOptions.push({
      label: "Upgrade your plan",
      value: "upgrade"
    });
    if (coralBeaconFlag && !isTeamOrEnterprise && iOe.isEnabled()) menuOptions.push({
      label: isMax20x ? "Switch to Team plan" : "Upgrade to Team plan",
      value: "team"
    });
    let cancelOption = {
      label: isUsageBased ? "Stop" : "Stop and wait for limit to reset",
      value: "cancel"
    };
    if (anvilFlag) return [...menuOptions, cancelOption];
    return [cancelOption, ...menuOptions];
  }, [anvilFlag, coralBeaconFlag, upgradePaths, isMax20x, isTeamOrEnterprise, hasExtraUsageEnabled, isUsageBased]);
  function handleCancel() {
    W("tengu_rate_limit_options_menu_cancel", {}), onDone(void 0, {
      display: "skip"
    });
  }
  function handleSelect(selection: string) {
    if (selection === "upgrade") W("tengu_rate_limit_options_menu_select_upgrade", {}), JGt(onDone, context).then(result => {
      if (result) setPendingNode(result);
    });else if (selection === "team") W("tengu_rate_limit_options_menu_select_team", {}), Zl(_xo).then(result => {
      onDone(result ? `Opening ${_xo} in your browser. Run /login after upgrading to use your new plan.` : `Could not open a browser. Visit ${_xo} to upgrade, then run /login.`);
    });else if (selection === "extra-usage") W("tengu_rate_limit_options_menu_select_extra_usage", {}), K3t(onDone, context).then(result => {
      if (result) setPendingNode(result);
    });else if (selection === "cancel") handleCancel();
  }
  if (pendingNode) return pendingNode;
  if (balance) return QGt.jsx(tNl, {
    balance: balance,
    onDone: onDone,
    context: context
  });
  return QGt.jsx(Jn, {
    title: "What do you want to do?",
    onCancel: handleCancel,
    color: "suggestion",
    children: QGt.jsx(hr, {
      options: options,
      onChange: handleSelect,
      visibleOptionCount: options.length
    })
  });
}
async function call(onDone, context) {
  return QGt.jsx(FTm, {
    onDone: onDone,
    context: context
  });
}
var XWe,
  QGt,
  _xo = "https://claude.ai/create/team";
var oNl = b(() => {
  Ol();
  di();
  jn();
  kt();
  got();
  kdt();
  lo();
  RM();
  Jg();
  z3t();
  wdt();
  gxo();
  XGt();
  nNl();
  XWe = x(et(), 1), QGt = x(oe(), 1);
});

export {rNl,FTm,call as BTm,XWe,QGt,_xo,oNl};
