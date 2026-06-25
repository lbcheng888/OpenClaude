// @ts-nocheck
import {getSubscriptionType as vi,getRateLimitTier as U3,isClaudeAISubscriber as Eo,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {zJe} from "../../vendor/m1290.ts";
import {hce,u3n,kdt} from "../telemetry/4025_kdt.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {rj,q$e} from "../telemetry/2749_q$e.ts";
import {Ne} from "../../vendor/m583.ts";
import {xte,wdt} from "../../vendor/m4023.ts";
import {oE,RM} from "../../vendor/m1289.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {XMt} from "../../vendor/m2747.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck

/**
 * Decide which upsell / call-to-action message to surface when a user has hit a
 * usage or rate limit. Returns the message string, or null when nothing should
 * be shown.
 */
function Axp({
  shouldShowUpsell,
  isMax20x,
  isExtraUsageCommandEnabled,
  shouldAutoOpenRateLimitOptionsMenu,
  isTeamOrEnterprise,
  hasBillingAccess,
  serverHidesUpgrade,
  serverHidesOverage,
  spendLimitNudgePath
}: {
  shouldShowUpsell: boolean;
  isMax20x: boolean;
  isExtraUsageCommandEnabled: boolean;
  shouldAutoOpenRateLimitOptionsMenu: boolean;
  isTeamOrEnterprise: boolean;
  hasBillingAccess: boolean;
  serverHidesUpgrade: boolean;
  serverHidesOverage: boolean;
  spendLimitNudgePath: boolean;
}): string | null {
  if (!shouldShowUpsell) return null;
  if (shouldAutoOpenRateLimitOptionsMenu) return "Opening your options…";
  if (spendLimitNudgePath) return "/usage-credits to adjust your monthly spend limit.";
  let extraUsageAvailable = isExtraUsageCommandEnabled && !serverHidesOverage;
  if (isMax20x) {
    if (extraUsageAvailable) return "/usage-credits to finish what you’re working on.";
    return "/login to switch to an API usage-billed account.";
  }
  if (isTeamOrEnterprise) {
    if (!extraUsageAvailable) return "Your admin can enable extra usage at claude.ai/admin-settings/usage.";
    if (hasBillingAccess) return "/usage-credits to finish what you’re working on.";
    return "/usage-credits to request more usage from your admin.";
  }
  if (serverHidesUpgrade) {
    if (extraUsageAvailable) return "/usage-credits to finish what you’re working on.";
    return null;
  }
  if (!extraUsageAvailable) return "/upgrade to increase your usage limit.";
  return "/upgrade or /usage-credits to finish what you’re working on.";
}

/**
 * React component (React Compiler memoized) that renders a rate-limit / upsell
 * banner. Computes the appropriate upsell message via Axp and optionally
 * auto-opens the rate-limit options menu on first render.
 */
function P3a(props) {
  let cache = D3a.c(32),
    {
      text: messageText,
      onOpenRateLimitOptions: openRateLimitOptions
    } = props,
    subscriptionType;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) subscriptionType = vi(), cache[0] = subscriptionType;else subscriptionType = cache[0];
  let subType = subscriptionType,
    rateLimitTier;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) rateLimitTier = U3(), cache[1] = rateLimitTier;else rateLimitTier = cache[1];
  let tier = rateLimitTier,
    isTeamOrEnterprise = subType === "team" || subType === "enterprise",
    isMax20x = subType === "max" && tier === "default_claude_max_20x",
    isSubscriber;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) isSubscriber = zJe() || Eo(), cache[2] = isSubscriber;else isSubscriber = cache[2];
  let shouldShowUpsell = isSubscriber,
    rateLimitStatus = hce(),
    upgradePaths = rateLimitStatus.upgradePaths,
    serverHidesUpgrade;
  if (cache[3] !== upgradePaths) serverHidesUpgrade = upgradePaths !== void 0 && !upgradePaths.includes("upgrade_plan"), cache[3] = upgradePaths, cache[4] = serverHidesUpgrade;else serverHidesUpgrade = cache[4];
  let upgradeHidden = serverHidesUpgrade,
    serverHidesOverage;
  if (cache[5] !== upgradePaths) serverHidesOverage = upgradePaths !== void 0 && !upgradePaths.includes("overage"), cache[5] = upgradePaths, cache[6] = serverHidesOverage;else serverHidesOverage = cache[6];
  let overageHidden = serverHidesOverage,
    coralBeaconEnabled;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) coralBeaconEnabled = it("tengu_coral_beacon", !1), cache[7] = coralBeaconEnabled;else coralBeaconEnabled = cache[7];
  let coralBeacon = coralBeaconEnabled,
    upgradeDisabledFlag;
  if (cache[8] === Symbol.for("react.memo_cache_sentinel")) upgradeDisabledFlag = rj(), cache[8] = upgradeDisabledFlag;else upgradeDisabledFlag = cache[8];
  let upgradeDisabled = upgradeDisabledFlag,
    showCoralUpgrade = coralBeacon && !isTeamOrEnterprise && !upgradeDisabled && !Ne.DISABLE_UPGRADE_COMMAND,
    overageEnabledFlag;
  if (cache[9] === Symbol.for("react.memo_cache_sentinel")) overageEnabledFlag = xte.isEnabled(), cache[9] = overageEnabledFlag;else overageEnabledFlag = cache[9];
  let overageEnabled = overageEnabledFlag,
    billingAccessFlag;
  if (cache[10] === Symbol.for("react.memo_cache_sentinel")) billingAccessFlag = oE(), cache[10] = billingAccessFlag;else billingAccessFlag = cache[10];
  let hasBillingAccess = billingAccessFlag,
    upgradePathAvailableFlag;
  if (cache[11] !== upgradePaths) upgradePathAvailableFlag = upgradePaths !== void 0 && (upgradePaths.includes("upgrade_plan") && !upgradeDisabled && !Ne.DISABLE_UPGRADE_COMMAND && subType !== "enterprise" || upgradePaths.includes("overage") && overageEnabled), cache[11] = upgradePaths, cache[12] = upgradePathAvailableFlag;else upgradePathAvailableFlag = cache[12];
  let upgradePathAvailable = upgradePathAvailableFlag,
    spendLimitNudgeFlag;
  if (cache[13] !== rateLimitStatus.overageDisabledReason) spendLimitNudgeFlag = it(u3n, !1) && !isTeamOrEnterprise && rateLimitStatus.overageDisabledReason === "org_level_disabled_until" && hasBillingAccess && overageEnabled, cache[13] = rateLimitStatus.overageDisabledReason, cache[14] = spendLimitNudgeFlag;else spendLimitNudgeFlag = cache[14];
  let spendLimitNudgePath = spendLimitNudgeFlag,
    shouldShowUpgradeCta = shouldShowUpsell && (upgradePaths !== void 0 ? upgradePathAvailable || showCoralUpgrade : !isMax20x || showCoralUpgrade),
    [menuState, setMenuState] = p3n.useState("pending"),
    isRateLimited = rateLimitStatus.status === "rejected" && rateLimitStatus.resetsAt !== void 0 && !rateLimitStatus.isUsingOverage,
    isCreditsRequired = rateLimitStatus.rateLimitType === "seven_day_overage_included" || rateLimitStatus.errorCode === "credits_required",
    shouldAutoOpenMenu = shouldShowUpgradeCta && menuState === "pending" && isRateLimited && !isCreditsRequired && openRateLimitOptions,
    autoOpenEffect,
    autoOpenDeps;
  if (cache[15] !== openRateLimitOptions || cache[16] !== shouldAutoOpenMenu) autoOpenEffect = () => {
    if (shouldAutoOpenMenu) setMenuState(openRateLimitOptions() ? "opened" : "blocked");
  }, autoOpenDeps = [shouldAutoOpenMenu, openRateLimitOptions], cache[15] = openRateLimitOptions, cache[16] = shouldAutoOpenMenu, cache[17] = autoOpenEffect, cache[18] = autoOpenDeps;else autoOpenEffect = cache[17], autoOpenDeps = cache[18];
  p3n.useEffect(autoOpenEffect, autoOpenDeps);
  let upsellNode;
  e: {
    if (isCreditsRequired) {
      upsellNode = null;
      break e;
    }
    let autoOpening = !!shouldAutoOpenMenu,
      serverHidesUpgradeCta = upgradeHidden || upgradeDisabled,
      upsellMessageRaw;
    if (cache[19] !== overageHidden || cache[20] !== spendLimitNudgePath || cache[21] !== autoOpening || cache[22] !== serverHidesUpgradeCta) upsellMessageRaw = Axp({
      shouldShowUpsell: shouldShowUpsell,
      isMax20x: isMax20x,
      isExtraUsageCommandEnabled: overageEnabled,
      shouldAutoOpenRateLimitOptionsMenu: autoOpening,
      isTeamOrEnterprise: isTeamOrEnterprise,
      hasBillingAccess: hasBillingAccess,
      serverHidesUpgrade: serverHidesUpgradeCta,
      serverHidesOverage: overageHidden,
      spendLimitNudgePath: spendLimitNudgePath
    }), cache[19] = overageHidden, cache[20] = spendLimitNudgePath, cache[21] = autoOpening, cache[22] = serverHidesUpgradeCta, cache[23] = upsellMessageRaw;else upsellMessageRaw = cache[23];
    let upsellMessage = upsellMessageRaw;
    if (!upsellMessage) {
      upsellNode = null;
      break e;
    }
    let upsellElement;
    if (cache[24] !== upsellMessage) upsellElement = Hdt.jsx(v, {
      dimColor: !0,
      children: upsellMessage
    }), cache[24] = upsellMessage, cache[25] = upsellElement;else upsellElement = cache[25];
    upsellNode = upsellElement;
  }
  let upsell = upsellNode,
    spendLimitHit = spendLimitNudgePath && isRateLimited,
    bannerText = spendLimitHit ? "You've hit your monthly spend limit." : messageText,
    bannerColor = spendLimitHit ? "warning" : "error",
    bannerElement;
  if (cache[26] !== bannerText || cache[27] !== bannerColor) bannerElement = Hdt.jsx(v, {
    color: bannerColor,
    children: bannerText
  }), cache[26] = bannerText, cache[27] = bannerColor, cache[28] = bannerElement;else bannerElement = cache[28];
  let upsellSlot = menuState === "opened" ? null : upsell,
    rootElement;
  if (cache[29] !== bannerElement || cache[30] !== upsellSlot) rootElement = Hdt.jsx(Yn, {
    children: Hdt.jsxs($, {
      flexDirection: "column",
      children: [bannerElement, upsellSlot]
    })
  }), cache[29] = bannerElement, cache[30] = upsellSlot, cache[31] = rootElement;else rootElement = cache[31];
  return rootElement;
}
var D3a, p3n, Hdt;
var O3a = b(() => {
  wdt();
  je();
  jn();
  kdt();
  XMt();
  lo();
  RM();
  Ir();
  q$e();
  Pl();
  D3a = x(tt(), 1), p3n = x(et(), 1), Hdt = x(oe(), 1);
});

export {Axp,P3a,D3a,p3n,Hdt,O3a};
