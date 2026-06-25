// @ts-nocheck
import {rj,q$e} from "../telemetry/2749_q$e.ts";
import {Ne} from "../../vendor/m583.ts";
import {getSubscriptionType as vi,getRateLimitTier as U3,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {hce,kdt} from "../telemetry/4025_kdt.ts";
import {iI,qoe} from "../../vendor/m1290.ts";
import {bae,_ge} from "../telemetry/2750_title.ts";
import {formatResetTime as AX,Xo} from "../../vendor/m240.ts";
import {initY_ as y_,bye} from "../../vendor/m4018.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {KHn,got} from "../../vendor/m2763.ts";
import {zk,ZMt,nB} from "../api/2752_status.ts";
import {color as wo} from "../../vendor/m2431.ts";
import {XGt,hxo} from "../core/5066_call.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Extra-usage spend-limit dialog and balance helpers for the overage nudge.
 *
 * Claude Code 2.1.190 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Return whether the Max upgrade command should be offered. */
function canShowUpgradeCommand(): any {
  return !rj() && !Ne.DISABLE_UPGRADE_COMMAND && vi() !== "enterprise";
}
/** Cross-module helper: reports org-level overage disablement while credits remain. */
function isOrgLevelOverageDisabled(balance: any): any {
  return balance.overageDisabledReason === "org_level_disabled_until" && balance.balanceMinorUnits > 0;
}
/** Move the monthly spend limit by one step while respecting current usage and caps. */
function stepMonthlySpendLimit(current: any, direction: any, currentUsage: any = null): any {
  let base = current ?? DEFAULT_SPEND_LIMIT,
    stepped = direction === 1 ? Math.floor(base / SPEND_LIMIT_STEP + 1) * SPEND_LIMIT_STEP : Math.ceil(base / SPEND_LIMIT_STEP - 1) * SPEND_LIMIT_STEP,
    floor = currentUsage === null ? SPEND_LIMIT_STEP : direction === 1 ? Math.ceil((currentUsage + SPEND_LIMIT_HEADROOM) / SPEND_LIMIT_STEP) * SPEND_LIMIT_STEP : currentUsage;
  return Math.min(MAX_SPEND_LIMIT, Math.max(floor, stepped));
}
/** Cross-module component: prompts the user to raise, remove, wait, or upgrade after hitting the spend limit. */
function SpendLimitNudgeDialog({
  balance,
  onDone,
  context
}: any): any {
  let [upgradeResult, setUpgradeResult] = bJ.useState(null),
    [theme] = ji(),
    rateLimitStatus = hce(),
    subscriptionType = vi(),
    canUpgrade = !(subscriptionType === "max" && U3() === "default_claude_max_20x") && canShowUpgradeCommand(),
    currency = balance.currency,
    [savedLimit, setSavedLimit] = bJ.useState(void 0),
    [draftLimit, setDraftLimit] = bJ.useState(void 0),
    [isSaving, setIsSaving] = bJ.useState(!1),
    [selectedIndex, setSelectedIndex] = bJ.useState(0),
    [errorMessage, setErrorMessage] = bJ.useState(null);
  bJ.useEffect(() => {
    let cachedLimit = iI();
    if (cachedLimit) {
      setSavedLimit(cachedLimit.spendLimitCents), setDraftLimit(cachedLimit.spendLimitCents);
      return;
    }
    let cancelled = !1;
    return bae().then(usage => {
      if (cancelled) return;
      let monthlyLimit = usage?.extra_usage?.monthly_limit ?? null,
        usedCredits = usage?.extra_usage?.used_credits ?? 0,
        effectiveLimit = monthlyLimit === null ? null : Math.max(monthlyLimit, usedCredits);
      setSavedLimit(effectiveLimit), setDraftLimit(effectiveLimit);
    }).catch(() => {
      if (cancelled) return;
      setSavedLimit(null), setDraftLimit(null);
    }), () => {
      cancelled = !0;
    };
  }, []);
  let resetLabel = bJ.useMemo(() => {
      if (rateLimitStatus.resetsAt) return AX(rateLimitStatus.resetsAt, !0);
      return;
    }, [rateLimitStatus.resetsAt]),
    isLoaded = draftLimit !== void 0,
    limitLabel = !isLoaded ? "\u2026" : draftLimit === null ? "Unlimited" : y_(draftLimit, currency, "fit"),
    menuItems = bJ.useMemo(() => {
      let items = [{
        id: "adjust",
        label: `Adjust monthly spend limit: ${limitLabel}`,
        hint: savedLimit === null ? "\u2190 or \u2192 to set a limit" : "\u2190 or \u2192 to adjust \xB7 Del to remove limit"
      }, {
        id: "wait",
        label: "Wait for limit to reset",
        hint: resetLabel ? `Resets ${resetLabel}` : ""
      }];
      if (canUpgrade) {
        let upgradeTier = subscriptionType === "max" ? "Max 20x" : "Max";
        items.push({
          id: "upgrade",
          label: `Upgrade to ${upgradeTier} for higher session limits every month`,
          hint: ""
        });
      }
      return items;
    }, [limitLabel, resetLabel, canUpgrade, subscriptionType, savedLimit]);
  function handleCancel() {
    W("tengu_spend_limit_nudge_cancel", {}), onDone(void 0, {
      display: "skip"
    });
  }
  async function handleConfirm() {
    if (!isLoaded || isSaving) return;
    if (draftLimit === savedLimit) {
      setErrorMessage(savedLimit === null ? "Press \u2190 or \u2192 to set a limit." : "Press \u2192 to raise the limit, or Del to remove it.");
      return;
    }
    setIsSaving(!0);
    let newLimit = draftLimit ?? null,
      result = await KHn(newLimit, currency);
    if (!result.ok) {
      setIsSaving(!1), setErrorMessage("Could not update your spend limit. Press Enter to retry.");
      return;
    }
    let disabledUntil = result.disabledUntil != null ? new Date(result.disabledUntil) : null,
      reblocked = disabledUntil != null && (Number.isNaN(disabledUntil.getTime()) || disabledUntil > new Date());
    if (W("tengu_spend_limit_nudge_save", {
      removed: newLimit === null,
      reblocked
    }), reblocked) {
      setIsSaving(!1);
      let adjustedLimit = result.usedCredits !== null ? Math.max(savedLimit ?? 0, result.usedCredits) : savedLimit;
      setSavedLimit(adjustedLimit ?? null), setDraftLimit(prev => adjustedLimit !== null && adjustedLimit !== void 0 && prev !== null ? Math.max(prev ?? 0, adjustedLimit) : prev), setErrorMessage(result.usedCredits !== null ? `You've already used ${y_(result.usedCredits, currency, "fit")} this month \u2014 set your limit above that.` : "Your current spend is still over the new limit. Raise it higher or remove it.");
      return;
    }
    setErrorMessage(null);
    let nextStatus = {
      ...zk,
      isUsingOverage: !0
    };
    if (delete nextStatus.overageDisabledReason, nextStatus.status === "rejected") nextStatus.status = "allowed";
    if (ZMt(nextStatus), newLimit === null) onDone(wo("success", theme)("Removed monthly spend limit"));else onDone(wo("success", theme)(`Increased monthly spend limit to ${y_(newLimit, currency, "fit")}`));
  }
  function handleSelect(itemId) {
    if (itemId === "adjust") handleConfirm();else if (itemId === "wait") W("tengu_spend_limit_nudge_wait", {}), onDone(void 0, {
      display: "skip"
    });else if (itemId === "upgrade") W("tengu_spend_limit_nudge_upgrade", {}), Promise.resolve().then(() => (XGt(), hxo)).then(({
      call: invokeUpgrade
    }) => invokeUpgrade(onDone, context)).then(node => {
      if (node) setUpgradeResult(node);
    });
  }
  function handleKeyDown(event) {
    if (isSaving) return;
    if (event.key === "up") {
      event.preventDefault(), setErrorMessage(null), setSelectedIndex(index => Math.max(0, index - 1));
      return;
    }
    if (event.key === "down") {
      event.preventDefault(), setErrorMessage(null), setSelectedIndex(index => Math.min(menuItems.length - 1, index + 1));
      return;
    }
    if (event.key === "return") {
      event.preventDefault();
      let selected = menuItems[selectedIndex];
      if (selected) handleSelect(selected.id);
      return;
    }
    if (menuItems[selectedIndex]?.id !== "adjust" || !isLoaded) return;
    if (event.key === "left") event.preventDefault(), setErrorMessage(null), setDraftLimit(prev => stepMonthlySpendLimit(prev ?? null, -1, savedLimit ?? null));else if (event.key === "right") event.preventDefault(), setErrorMessage(null), setDraftLimit(prev => stepMonthlySpendLimit(prev ?? null, 1, savedLimit ?? null));else if (event.key === "delete" || event.key === "backspace") event.preventDefault(), setErrorMessage(null), setDraftLimit(null);
  }
  if (upgradeResult) return upgradeResult;
  return Lne.jsx(Jn, {
    title: "What do you want to do?",
    titleEnd: `Usage credit balance: ${y_(balance.amount, currency)}`,
    onCancel: handleCancel,
    isCancelActive: !isSaving,
    color: "suggestion",
    children: Lne.jsxs($, {
      flexDirection: "column",
      gap: 1,
      tabIndex: 0,
      autoFocus: !0,
      onKeyDown: handleKeyDown,
      children: [Lne.jsx($, {
        flexDirection: "column",
        children: menuItems.map((item, index) => {
          let isSelected = index === selectedIndex;
          return Lne.jsxs($, {
            justifyContent: "space-between",
            gap: 2,
            children: [Lne.jsxs(v, {
              color: isSelected ? "suggestion" : void 0,
              children: [isSelected ? Xe.pointer : " ", " ", item.label]
            }), item.hint ? Lne.jsx(v, {
              dimColor: !0,
              wrap: "truncate-end",
              children: item.hint
            }) : null]
          }, item.id);
        })
      }), isSaving ? Lne.jsx(Hc, {
        message: "Updating spend limit\u2026"
      }) : errorMessage ? Lne.jsx($, {
        children: Lne.jsx(v, {
          color: "error",
          children: errorMessage
        })
      }) : null]
    })
  });
}
var bJ,
  Lne,
  SPEND_LIMIT_STEP = 500,
  SPEND_LIMIT_HEADROOM = 1000,
  MAX_SPEND_LIMIT = 10000000000,
  DEFAULT_SPEND_LIMIT = 4000;
var nNl = b(() => {
  Zs();
  di();
  OE();
  je();
  kt();
  got();
  _ge();
  nB();
  kdt();
  qoe();
  lo();
  bye();
  Ir();
  Xo();
  q$e();
  bJ = x(et(), 1), Lne = x(oe(), 1);
});

export {canShowUpgradeCommand as OTm,isOrgLevelOverageDisabled as eNl,stepMonthlySpendLimit as Z1l,SpendLimitNudgeDialog as tNl,bJ,Lne,SPEND_LIMIT_STEP as JWe,SPEND_LIMIT_HEADROOM as LTm,MAX_SPEND_LIMIT as MTm,DEFAULT_SPEND_LIMIT as NTm,nNl};
