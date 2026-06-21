// @ts-nocheck
import {w8,Cw,LB} from "../../vendor/m1284.ts";
import {getSubscriptionType,getOauthAccountInfo,isOverageProvisioningAllowed,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {formatResetTime,ps} from "../../vendor/m238.ts";
import {mv,getFableDeclineFallbackModel,renderModelName,parseUserSpecifiedModel,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {X$,D0,eW} from "../telemetry/2730_raw.ts";
import {kz,M2e} from "../telemetry/2737_M2e.ts";
import {je} from "../../vendor/m577.ts";
import {Lw,jO,Om} from "../config/2215_level.ts";
import {b} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
import {zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
/** Returns true if the message string starts with any known rate-limit prefix. */
function TUi(message: any): any {
  return hRd.some((prefix: any) => message.startsWith(prefix));
}

/** Builds a severity+message object for the current rate-limit/overage state, or null if no alert is needed. */
function SUi(rateLimitInfo: any, modelId: any): any {
  if (rateLimitInfo.isUsingOverage) {
    if (rateLimitInfo.overageStatus === "allowed_warning") return {
      message: `You're close to your ${w8() ? "usage limit" : "usage credit limit"}`,
      severity: "warning"
    };
    return null;
  }
  if (rateLimitInfo.status === "rejected") return {
    message: gRd(rateLimitInfo, modelId),
    severity: "error"
  };
  if (rateLimitInfo.status === "allowed_warning") {
    if (rateLimitInfo.utilization !== void 0 && rateLimitInfo.utilization < 0.7) return null;
    let subType = getSubscriptionType(),
      isTeamOrEnterprise = subType === "team" || subType === "enterprise",
      hasExtraUsage = getOauthAccountInfo()?.hasExtraUsageEnabled === !0;
    if (isTeamOrEnterprise && hasExtraUsage && !Cw()) return null;
    let warningMsg = yRd(rateLimitInfo);
    if (warningMsg) return {
      message: warningMsg,
      severity: "warning"
    };
  }
  return null;
}

/** Returns the error message string if the rate-limit state is an error, otherwise null. */
function $8r(rateLimitInfo: any, modelId: any): any {
  let result = SUi(rateLimitInfo, modelId);
  if (result && result.severity === "error") return result.message;
  return null;
}

/** Returns the warning message string if the rate-limit state is a warning, otherwise null. */
function q8r(rateLimitInfo: any, modelId: any): any {
  let result = SUi(rateLimitInfo, modelId);
  if (result && result.severity === "warning") return result.message;
  return null;
}

/** Builds the detailed "You've hit your …" error string for a rejected rate-limit state. */
function gRd(rateLimitInfo: any, modelId: any): any {
  let isApi = w8(),
    isAdmin = Cw(),
    adminSuffix = isAdmin ? "" : " \xB7 contact your admin to increase it",
    resetsAtTime = rateLimitInfo.resetsAt,
    resetLabel = resetsAtTime ? formatResetTime(resetsAtTime, !0) : void 0,
    overageResetLabel = rateLimitInfo.overageResetsAt ? formatResetTime(rateLimitInfo.overageResetsAt, !0) : void 0,
    resetSuffix = resetLabel ? ` \xB7 resets ${resetLabel}` : "",
    specificMsg = _Rd(rateLimitInfo, resetSuffix, modelId);
  if (!isApi && rateLimitInfo.overageDisabledReason && specificMsg && !U8r.has(rateLimitInfo.overageDisabledReason) && !(mv(modelId) && X$() && !D0())) return specificMsg;
  if (!isApi && rateLimitInfo.overageDisabledReason && U8r.has(rateLimitInfo.overageDisabledReason)) {
    let subType = getSubscriptionType();
    if (subType === "team" || subType === "enterprise") return pee("org's monthly spend limit", isAdmin ? " \xB7 run /usage-credits to raise it, or visit claude.ai/admin-settings/usage" : " \xB7 run /usage-credits to ask your admin for a higher limit", modelId);
    return pee(isAdmin ? "monthly spend limit" : "org's monthly spend limit", isAdmin ? " \xB7 raise it at claude.ai/settings/usage" : " \xB7 ask your admin to raise it at claude.ai/settings/usage", modelId);
  }
  if (rateLimitInfo.overageStatus === "rejected") {
    let resetSuffixOverage = "";
    if (resetsAtTime && rateLimitInfo.overageResetsAt) {
      if (resetsAtTime < rateLimitInfo.overageResetsAt) resetSuffixOverage = ` \xB7 resets ${resetLabel}`;else resetSuffixOverage = ` \xB7 resets ${overageResetLabel}`;
    } else if (resetLabel) resetSuffixOverage = ` \xB7 resets ${resetLabel}`;else if (overageResetLabel) resetSuffixOverage = ` \xB7 resets ${overageResetLabel}`;
    if (rateLimitInfo.overageDisabledReason === "out_of_credits") {
      if (isApi) return isAdmin ? "Your org is out of usage \xB7 add funds to continue" : "Your org is out of usage \xB7 contact your admin";
      return `You're out of usage credits${resetSuffixOverage}`;
    }
    if (rateLimitInfo.overageDisabledReason && U8r.has(rateLimitInfo.overageDisabledReason)) {
      let orgResetSuffix = overageResetLabel ? ` \xB7 resets ${overageResetLabel}` : "";
      return pee("org's monthly usage limit", orgResetSuffix, modelId);
    }
    if (rateLimitInfo.overageDisabledReason === "seat_tier_level_disabled" || rateLimitInfo.overageDisabledReason === "seat_tier_zero_credit_limit") return `Your seat type doesn't include ${isApi ? "usage" : "usage credits"}`;
    if (rateLimitInfo.overageDisabledReason === "org_service_level_disabled") return "This service is disabled for your org";
    if (rateLimitInfo.overageDisabledReason === "member_level_disabled" || rateLimitInfo.overageDisabledReason === "member_zero_credit_limit") return "Your usage allocation has been disabled by your admin \xB7 run /usage-credits to ask your admin for a higher limit";
    if (rateLimitInfo.overageDisabledReason === "group_zero_credit_limit") return "Your group's usage limit is set to $0 \xB7 run /usage-credits to ask your admin for a higher limit";
    if (isApi) return pee("usage limit", adminSuffix, modelId);
    return pee("limit", resetSuffixOverage, modelId);
  }
  if (specificMsg) return specificMsg;
  if (isApi) return pee("usage limit", adminSuffix, modelId);
  return pee("usage limit", resetSuffix, modelId);
}

/** Returns a "You've hit your <X> limit" string for known time-window rate-limit types, or null. */
function _Rd(rateLimitInfo: any, resetSuffix: any, modelId: any): any {
  if (rateLimitInfo.rateLimitType === "seven_day_sonnet") {
    let subType = getSubscriptionType();
    return pee(subType === "pro" || subType === "enterprise" ? "weekly limit" : "Sonnet limit", resetSuffix, modelId);
  }
  if (rateLimitInfo.rateLimitType === "seven_day_opus") return pee("Opus limit", resetSuffix, modelId);
  if (rateLimitInfo.rateLimitType === "seven_day") return pee("weekly limit", resetSuffix, modelId);
  if (rateLimitInfo.rateLimitType === "five_hour") return pee("session limit", resetSuffix, modelId);
  return null;
}

/** Builds an "Approaching …" or "You've used N% of your …" warning string. */
function yRd(rateLimitInfo: any): any {
  let limitLabel = null;
  switch (rateLimitInfo.rateLimitType) {
    case "seven_day":
      limitLabel = "weekly limit";
      break;
    case "five_hour":
      limitLabel = "session limit";
      break;
    case "seven_day_opus":
      limitLabel = "Opus limit";
      break;
    case "seven_day_sonnet":
      limitLabel = "Sonnet limit";
      break;
    case "overage":
      limitLabel = w8() ? "usage" : "usage credits";
      break;
    case void 0:
      return null;
  }
  let utilizationPct = rateLimitInfo.utilization ? Math.floor(rateLimitInfo.utilization * 100) : void 0,
    isOverageApi = rateLimitInfo.rateLimitType === "overage" && w8(),
    resetLabel = rateLimitInfo.resetsAt && !isOverageApi ? formatResetTime(rateLimitInfo.resetsAt, !0) : void 0,
    actionHint = TRd(rateLimitInfo.rateLimitType);
  if (utilizationPct && resetLabel) {
    let baseMsg = `You've used ${utilizationPct}% of your ${limitLabel} \xB7 resets ${resetLabel}`;
    return actionHint ? `${baseMsg} \xB7 ${actionHint}` : baseMsg;
  }
  if (utilizationPct) {
    let baseMsg = `You've used ${utilizationPct}% of your ${limitLabel}`;
    return actionHint ? `${baseMsg} \xB7 ${actionHint}` : baseMsg;
  }
  if (rateLimitInfo.rateLimitType === "overage") limitLabel = w8() ? "usage limit" : "usage credit limit";
  if (resetLabel) {
    let baseMsg = `Approaching ${limitLabel} \xB7 resets ${resetLabel}`;
    return actionHint ? `${baseMsg} \xB7 ${actionHint}` : baseMsg;
  }
  let approachingMsg = `Approaching ${limitLabel}`;
  return actionHint ? `${approachingMsg} \xB7 ${actionHint}` : approachingMsg;
}

/** Returns a contextual action hint string (e.g. /upgrade or /usage-credits) or null. */
function TRd(rateLimitType: any): any {
  let subType = getSubscriptionType(),
    hasExtraUsage = getOauthAccountInfo()?.hasExtraUsageEnabled === !0,
    isAdmin = Cw();
  if (subType === "team" || subType === "enterprise") {
    if (!hasExtraUsage && isOverageProvisioningAllowed()) return isAdmin ? "Run /usage-credits to turn on extra usage for your org" : "Run /usage-credits to ask your admin for more";
    if (hasExtraUsage && rateLimitType === "overage") return isAdmin ? "Run /usage-credits to raise the cap" : "Run /usage-credits to ask your admin for more";
    return null;
  }
  if (rateLimitType === "five_hour" && (subType === "pro" || subType === "max") && !kz()) return "/upgrade to keep using Claude Code";
  return null;
}

/** Returns a "switch models or buy more" suggestion string when Fable is rate-limited, else null. */
function Uwn(modelId: any): any {
  if (!bUi(modelId)) return null;
  let subType = getSubscriptionType();
  if (!isOverageProvisioningAllowed() || je.DISABLE_EXTRA_USAGE_COMMAND) return "Switch models to keep working.";
  if (subType === "team" && !Cw()) return "Run /usage-credits to request more from your admin, or switch models to keep working.";
  return "Buy more to keep using Fable, or switch models to keep working.";
}

/** Returns a fallback model suggestion object {fallback, label} when Fable is rate-limited, else null. */
function j8r(modelId: any): any {
  if (!bUi(modelId)) return null;
  let fallbackModel = getFableDeclineFallbackModel();
  if (fallbackModel === null) return null;
  return {
    fallback: fallbackModel,
    label: renderModelName(fallbackModel)
  };
}

/** Returns true when the model is a Fable model in an API/non-default context. */
function bUi(modelId: any): any {
  return modelId !== null && mv(parseUserSpecifiedModel(modelId)) && X$() && !D0();
}

/** Returns a {lever, text} effort/model suggestion for Pro users hitting weekly limits, else null. */
function EUi(rateLimitInfo: any, modelId: any, effortLevel: any): any {
  if (getSubscriptionType() !== "pro") return null;
  if (rateLimitInfo.rateLimitType !== "seven_day") return null;
  if (modelId.includes("fable")) return {
    lever: "model",
    text: "try /model opus \xB7 more runway"
  };
  if (modelId.includes("opus")) return {
    lever: "model",
    text: "try /model sonnet \xB7 ~2\xD7 runway"
  };
  if (!Lw(modelId)) return null;
  let effortRank = jO(modelId, effortLevel);
  if (effortRank === "high" || effortRank === "xhigh" || effortRank === "max") return {
    lever: "effort",
    text: "try /effort medium"
  };
  return null;
}

/** Builds the "You're now using …" transition message when overage kicks in. */
function W8r(rateLimitInfo: any): any {
  let resetLabel = rateLimitInfo.resetsAt ? formatResetTime(rateLimitInfo.resetsAt, !0) : "",
    limitName = "";
  if (rateLimitInfo.rateLimitType === "five_hour") limitName = "session limit";else if (rateLimitInfo.rateLimitType === "seven_day") limitName = "weekly limit";else if (rateLimitInfo.rateLimitType === "seven_day_opus") limitName = "Opus limit";else if (rateLimitInfo.rateLimitType === "seven_day_sonnet") {
    let subType = getSubscriptionType();
    limitName = subType === "pro" || subType === "enterprise" ? "weekly limit" : "Sonnet limit";
  }
  let isApi = w8(),
    usageLabel = isApi ? "your usage allocation" : "usage credits";
  if (!limitName) return `Now using ${usageLabel}`;
  let resetSuffix = resetLabel && !isApi ? ` \xB7 Your ${limitName} resets ${resetLabel}` : "";
  return `You're now using ${usageLabel}${resetSuffix}`;
}

/** Formats a canonical "You've hit your <limitName><suffix>" string. */
function pee(limitName: any, suffix: any, modelId: any): any {
  return `You've hit your ${limitName}${suffix}`;
}
var U8r, hRd;
var _Ot = b(() => {
  Ao();
  LB();
  Om();
  Lr();
  ps();
  eW();
  Mo();
  M2e();
  zn();
  U8r = new Set(["org_level_disabled_until", "org_spend_cap_reached"]), hRd = ["You've hit your", "You've used", "You're now using usage credits", "You're close to", "You're out of usage credits", "Your org is out of usage \xB7 add funds to continue", "Your org is out of usage \xB7 contact your admin", "You're now using your usage allocation", "Now using your usage allocation", "Now using usage credits", "Your seat type doesn't include usage credits", "Your seat type doesn't include usage", "This service is disabled for your org", "Your usage allocation has been disabled by your admin", "Your group's usage limit is set to $0", "You're now using extra usage", "You're out of extra usage", "Now using extra usage", "Your seat type doesn't include extra usage"];
});
export {TUi,SUi,$8r,q8r,gRd,_Rd,yRd,TRd,Uwn,j8r,bUi,EUi,W8r,pee,U8r,hRd,_Ot};
