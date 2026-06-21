// @ts-nocheck
import {Ui,Ld} from "../../vendor/m2459.ts";
import {_ce,fct} from "../telemetry/3958_fct.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {q8r,EUi,Uwn,W8r,_Ot} from "../core/2738_message.ts";
import {getSubscriptionType,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {Cw,w8,LB} from "../../vendor/m1284.ts";
import {mv,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {D0,P2e,eW} from "../telemetry/2730_raw.ts";
import {$wn,PF} from "../api/2739_status.ts";
import {Text} from "../../vendor/m2423.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
/**
 * React hook that registers notifications for rate-limit warnings,
 * credit-usage changes, and overage-limit banners in the TUI.
 */
function ztc(effortArg: any): void {
  let cache = Ktc.c(29);
  // Pull addNotification dispatcher and current config
  let {
    addNotification: addNotification
  } = Ui();
  let configRef = _ce();
  let effortValue = mt(R$m);
  let rateLimitWarning: any;
  // Memoize rate-limit warning text (depends on configRef + effortArg)
  if (cache[0] !== configRef || cache[1] !== effortArg) rateLimitWarning = q8r(configRef, effortArg), cache[0] = configRef, cache[1] = effortArg, cache[2] = rateLimitWarning;else rateLimitWarning = cache[2];
  let warningText = rateLimitWarning;
  let leverHint: any;
  // Memoize lever-hint object (depends on configRef + effortArg + effortValue)
  if (cache[3] !== configRef || cache[4] !== effortValue || cache[5] !== effortArg) leverHint = EUi(configRef, effortArg, effortValue), cache[3] = configRef, cache[4] = effortValue, cache[5] = effortArg, cache[6] = leverHint;else leverHint = cache[6];
  let leverHintValue = leverHint;
  let overageUpgrade: any;
  // Memoize overage-upgrade element (only when rateLimitType === "overage")
  if (cache[7] !== configRef.rateLimitType || cache[8] !== effortArg) overageUpgrade = configRef.rateLimitType === "overage" ? Uwn(effortArg) : null, cache[7] = configRef.rateLimitType, cache[8] = effortArg, cache[9] = overageUpgrade;else overageUpgrade = cache[9];
  let overageUpgradeValue = overageUpgrade;
  let limitText: any;
  // Memoize the human-readable limit-reached text
  if (cache[10] !== configRef) limitText = W8r(configRef), cache[10] = configRef, cache[11] = limitText;else limitText = cache[11];
  let limitTextValue = limitText;
  let rateLimitRef = pTe.useRef(null);
  let subscriptionType: any;
  // One-time memoize: subscription type (never changes after mount)
  if (cache[12] === Symbol.for("react.memo_cache_sentinel")) subscriptionType = getSubscriptionType(), cache[12] = subscriptionType;else subscriptionType = cache[12];
  let subscriptionTypeValue = subscriptionType;
  let isAutoUpdates: any;
  // One-time memoize: auto-updates check
  if (cache[13] === Symbol.for("react.memo_cache_sentinel")) isAutoUpdates = Cw(), cache[13] = isAutoUpdates;else isAutoUpdates = cache[13];
  let isAutoUpdatesValue = isAutoUpdates;
  let isTeamOrEnterprise = subscriptionTypeValue === "team" || subscriptionTypeValue === "enterprise";
  let [overageNotified, setOverageNotified] = pTe.useState(!1);
  let hasShownCreditsRef = pTe.useRef(!1);
  let creditUsageEffect: any;
  let creditUsageDeps: any;
  // Effect: subscribe to credit-usage status changes and show appropriate notification
  if (cache[14] !== addNotification) creditUsageEffect = () => {
    let handler = (isActive: any, isPaused: any, isStopped: any) => {
      if (!mv(isActive)) return;
      if (isPaused || isStopped) return;
      if (w8()) return;
      if (D0()) return;
      if (P2e()) {
        // Show one-time "drawing from credits" info notification
        if (!hasShownCreditsRef.current) hasShownCreditsRef.current = !0, addNotification({
          kind: "contextual",
          key: "fable-credits-info",
          text: "Fable 5 is drawing from usage credits",
          priority: "medium"
        });
        return;
      }
      // Show warning that plan limits are exhausted and credits are being consumed
      addNotification({
        kind: "warning",
        key: "fable-usage-credits",
        text: "Fable 5 is now using usage credits instead of your plan limits",
        color: "error",
        priority: "immediate"
      });
    };
    return $wn.add(handler), () => {
      $wn.delete(handler);
    };
  }, creditUsageDeps = [addNotification], cache[14] = addNotification, cache[15] = creditUsageEffect, cache[16] = creditUsageDeps;else creditUsageEffect = cache[15], creditUsageDeps = cache[16];
  pTe.useEffect(creditUsageEffect, creditUsageDeps);
  let overageEffect: any;
  let overageDeps: any;
  // Effect: fire "limit-reached" notification when isUsingOverage flips on/off
  if (cache[17] !== addNotification || cache[18] !== configRef.isUsingOverage || cache[19] !== overageNotified || cache[20] !== limitTextValue) overageEffect = () => {
    if (configRef.isUsingOverage && !overageNotified && (!isTeamOrEnterprise || isAutoUpdatesValue)) addNotification({
      key: "limit-reached",
      text: limitTextValue,
      priority: "immediate"
    }), setOverageNotified(!0);else if (!configRef.isUsingOverage && overageNotified) setOverageNotified(!1);
  }, overageDeps = [configRef.isUsingOverage, limitTextValue, overageNotified, addNotification, isAutoUpdatesValue, isTeamOrEnterprise], cache[17] = addNotification, cache[18] = configRef.isUsingOverage, cache[19] = overageNotified, cache[20] = limitTextValue, cache[21] = overageEffect, cache[22] = overageDeps;else overageEffect = cache[21], overageDeps = cache[22];
  pTe.useEffect(overageEffect, overageDeps);
  let rateLimitEffect: any;
  let rateLimitDeps: any;
  // Effect: show rate-limit warning with optional lever hint and overage upgrade link
  if (cache[23] !== addNotification || cache[24] !== overageUpgradeValue || cache[25] !== leverHintValue || cache[26] !== warningText) rateLimitEffect = () => {
    if (warningText && warningText !== rateLimitRef.current) {
      if (rateLimitRef.current = warningText, addNotification({
        key: "rate-limit-warning",
        jsx: dTe.createElement(Text, null, dTe.createElement(Text, {
          color: "warning"
        }, warningText), leverHintValue && dTe.createElement(Text, {
          dimColor: !0
        }, " \xB7 ", leverHintValue.text), overageUpgradeValue && dTe.createElement(Text, {
          dimColor: !0
        }, " \xB7 ", overageUpgradeValue)),
        priority: "high"
      }), leverHintValue) logEvent("tengu_rate_limit_lever_hint", {
        lever: fromEnum(leverHintValue.lever)
      });
    }
  }, rateLimitDeps = [warningText, leverHintValue, overageUpgradeValue, addNotification], cache[23] = addNotification, cache[24] = overageUpgradeValue, cache[25] = leverHintValue, cache[26] = warningText, cache[27] = rateLimitEffect, cache[28] = rateLimitDeps;else rateLimitEffect = cache[27], rateLimitDeps = cache[28];
  pTe.useEffect(rateLimitEffect, rateLimitDeps);
}

/** Selector: extract effortValue from config store slice */
function R$m(e: any): any {
  return e.effortValue;
}
var Ktc: any, dTe: any, pTe: any;
var Ytc = b(() => {
  Ld();
  ze();
  Ct();
  PF();
  fct();
  _Ot();
  configProtoStore();
  Ao();
  LB();
  eW();
  Mo();
  Ktc = M(rt(), 1), dTe = M(Te(), 1), pTe = M(Te(), 1);
});
export {ztc,R$m,Ktc,dTe,pTe,Ytc};
