// @ts-nocheck
import {Ci,fd} from "../../vendor/m2469.ts";
import {hce,kdt} from "../telemetry/4025_kdt.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {T7r,f6i,m6i,S7r,QMt} from "../core/2751_message.ts";
import {getSubscriptionType as vi,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {oE,oF,RM} from "../../vendor/m1289.ts";
import {isFableFamilyOrPinnedModel as sE,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {tB,KMt,ej} from "../telemetry/2743_raw.ts";
import {kHn,nB} from "../api/2752_status.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/*
 * tui/5640_addNotification.ts - React/Ink terminal UI restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 *
 * This hook wires up a set of usage/rate-limit notifications:
 * - a rate-limit warning line (with optional lever hint),
 * - an overage-reached "limit reached" notice,
 * - and a "Fable 5 is using usage credits" event/warning toggle.
 */
function Puc(props: any): void {
  /** React-compiler memo cache for this component's render. */
  let memoCache = Duc.c(30),
    {
      addNotification: addNotification
    } = Ci(),
    rateLimitState = hce(),
    effortValue = _t(eVm),
    rateLimitWarning;
  if (memoCache[0] !== rateLimitState || memoCache[1] !== props) rateLimitWarning = T7r(rateLimitState, props), memoCache[0] = rateLimitState, memoCache[1] = props, memoCache[2] = rateLimitWarning;else rateLimitWarning = memoCache[2];
  let warningText = rateLimitWarning,
    leverHint;
  if (memoCache[3] !== rateLimitState || memoCache[4] !== effortValue || memoCache[5] !== props) leverHint = f6i(rateLimitState, props, effortValue), memoCache[3] = rateLimitState, memoCache[4] = effortValue, memoCache[5] = props, memoCache[6] = leverHint;else leverHint = memoCache[6];
  let warningLeverHint = leverHint,
    overageDetail;
  if (memoCache[7] !== rateLimitState.rateLimitType || memoCache[8] !== props) overageDetail = rateLimitState.rateLimitType === "overage" ? m6i(props) : null, memoCache[7] = rateLimitState.rateLimitType, memoCache[8] = props, memoCache[9] = overageDetail;else overageDetail = memoCache[9];
  let overageText = overageDetail,
    limitReachedDetail;
  if (memoCache[10] !== rateLimitState || memoCache[11] !== props) limitReachedDetail = S7r(rateLimitState, props), memoCache[10] = rateLimitState, memoCache[11] = props, memoCache[12] = limitReachedDetail;else limitReachedDetail = memoCache[12];
  let limitReachedText = limitReachedDetail,
    lastWarningRef = KSe.useRef(null),
    planType;
  if (memoCache[13] === Symbol.for("react.memo_cache_sentinel")) planType = vi(), memoCache[13] = planType;else planType = memoCache[13];
  let plan = planType,
    overageFlag;
  if (memoCache[14] === Symbol.for("react.memo_cache_sentinel")) overageFlag = oE(), memoCache[14] = overageFlag;else overageFlag = memoCache[14];
  let isOverageEnabled = overageFlag,
    isTeamOrEnterprise = plan === "team" || plan === "enterprise",
    [limitReachedShown, setLimitReachedShown] = KSe.useState(!1),
    creditsNotifiedRef = KSe.useRef(!1),
    creditsEffect,
    creditsDeps;
  if (memoCache[15] !== addNotification) creditsEffect = () => {
    let onUsageCredits = (usageState: any, isFlag1: any, isFlag2: any) => {
      if (!sE(usageState)) return;
      if (isFlag1 || isFlag2) return;
      if (oF()) return;
      if (tB()) return;
      if (KMt()) {
        if (!creditsNotifiedRef.current) creditsNotifiedRef.current = !0, addNotification({
          kind: "contextual",
          key: "fable-credits-info",
          text: "Fable 5 is drawing from usage credits",
          priority: "medium"
        });
        return;
      }
      addNotification({
        kind: "warning",
        key: "fable-usage-credits",
        text: "Fable 5 is now using usage credits instead of your plan limits",
        color: "error",
        priority: "immediate"
      });
    };
    return kHn.add(onUsageCredits), () => {
      kHn.delete(onUsageCredits);
    };
  }, creditsDeps = [addNotification], memoCache[15] = addNotification, memoCache[16] = creditsEffect, memoCache[17] = creditsDeps;else creditsEffect = memoCache[16], creditsDeps = memoCache[17];
  KSe.useEffect(creditsEffect, creditsDeps);
  let limitReachedEffect, limitReachedEffectDeps;
  if (memoCache[18] !== addNotification || memoCache[19] !== rateLimitState.isUsingOverage || memoCache[20] !== limitReachedShown || memoCache[21] !== limitReachedText) limitReachedEffect = () => {
    if (rateLimitState.isUsingOverage && !limitReachedShown && (!isTeamOrEnterprise || isOverageEnabled)) addNotification({
      key: "limit-reached",
      text: limitReachedText,
      priority: "immediate"
    }), setLimitReachedShown(!0);else if (!rateLimitState.isUsingOverage && limitReachedShown) setLimitReachedShown(!1);
  }, limitReachedEffectDeps = [rateLimitState.isUsingOverage, limitReachedText, limitReachedShown, addNotification, isOverageEnabled, isTeamOrEnterprise], memoCache[18] = addNotification, memoCache[19] = rateLimitState.isUsingOverage, memoCache[20] = limitReachedShown, memoCache[21] = limitReachedText, memoCache[22] = limitReachedEffect, memoCache[23] = limitReachedEffectDeps;else limitReachedEffect = memoCache[22], limitReachedEffectDeps = memoCache[23];
  KSe.useEffect(limitReachedEffect, limitReachedEffectDeps);
  let warningEffect, warningEffectDeps;
  if (memoCache[24] !== addNotification || memoCache[25] !== overageText || memoCache[26] !== warningLeverHint || memoCache[27] !== warningText) warningEffect = () => {
    if (warningText && warningText !== lastWarningRef.current) {
      if (lastWarningRef.current = warningText, addNotification({
        key: "rate-limit-warning",
        jsx: Fyt.jsxs(v, {
          children: [Fyt.jsx(v, {
            color: "warning",
            children: warningText
          }), warningLeverHint && Fyt.jsxs(v, {
            dimColor: !0,
            children: [" \xB7 ", warningLeverHint.text]
          }), overageText && Fyt.jsxs(v, {
            dimColor: !0,
            children: [" \xB7 ", overageText]
          })]
        }),
        priority: "high"
      }), warningLeverHint) W("tengu_rate_limit_lever_hint", {
        lever: Le(warningLeverHint.lever)
      });
    }
  }, warningEffectDeps = [warningText, warningLeverHint, overageText, addNotification], memoCache[24] = addNotification, memoCache[25] = overageText, memoCache[26] = warningLeverHint, memoCache[27] = warningText, memoCache[28] = warningEffect, memoCache[29] = warningEffectDeps;else warningEffect = memoCache[28], warningEffectDeps = memoCache[29];
  KSe.useEffect(warningEffect, warningEffectDeps);
}
/** Selector: extract the effort value from the store slice. */
function eVm(state: any): any {
  return state.effortValue;
}
var Duc, KSe, Fyt;
var Ouc = b(() => {
  fd();
  je();
  kt();
  nB();
  kdt();
  QMt();
  uo();
  lo();
  RM();
  ej();
  Ro();
  Duc = x(tt(), 1), KSe = x(et(), 1), Fyt = x(oe(), 1);
});

export {Puc,eVm,Duc,KSe,Fyt,Ouc};
