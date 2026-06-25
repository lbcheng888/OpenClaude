// @ts-nocheck
import {oF,oE,RM} from "../../vendor/m1289.ts";
import {getSubscriptionType as vi,getOauthAccountInfo as hc,isOverageProvisioningAllowed as MRe,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {formatResetTime as AX,Xo} from "../../vendor/m240.ts";
import {isFableFamilyOrPinnedModel as sE,parseUserSpecifiedModel as Qo,getPublicModelDisplayName as g7,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {fge,tB,ej} from "../telemetry/2743_raw.ts";
import {rj,q$e} from "../telemetry/2749_q$e.ts";
import {Ne} from "../../vendor/m583.ts";
import {BR,iO,Cp} from "../config/2223_level.ts";
import {Mke,_ge} from "../telemetry/2750_title.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
/** Returns true if the message string starts with any known rate-limit prefix. */
function d6i(message: any): any {
  return n1d.some((prefix: any) => message.startsWith(prefix));
}

/** Builds a severity+message object for the current rate-limit/overage state, or null if no alert is needed. */
function p6i(rateLimitInfo: any, modelId: any): any {
  if (rateLimitInfo.isUsingOverage) {
    if (rateLimitInfo.overageStatus === "allowed_warning") return {
      message: `You're close to your ${oF() ? "usage limit" : "usage credit limit"}`,
      severity: "warning"
    };
    return null;
  }
  if (rateLimitInfo.status === "rejected") return {
    message: r1d(rateLimitInfo, modelId),
    severity: "error"
  };
  if (rateLimitInfo.status === "allowed_warning") {
    if (rateLimitInfo.utilization !== void 0 && rateLimitInfo.utilization < 0.7) return null;
    let subType = vi(),
      isTeamOrEnterprise = subType === "team" || subType === "enterprise",
      hasExtraUsage = hc()?.hasExtraUsageEnabled === !0;
    if (isTeamOrEnterprise && hasExtraUsage && !oE()) return null;
    let warningMsg = s1d(rateLimitInfo);
    if (warningMsg) return {
      message: warningMsg,
      severity: "warning"
    };
  }
  return null;
}

/** Returns the error message string if the rate-limit state is an error, otherwise null. */
function y7r(rateLimitInfo: any, modelId: any): any {
  let result = p6i(rateLimitInfo, modelId);
  if (result && result.severity === "error") return result.message;
  return null;
}

/** Returns the warning message string if the rate-limit state is a warning, otherwise null. */
function T7r(rateLimitInfo: any, modelId: any): any {
  let result = p6i(rateLimitInfo, modelId);
  if (result && result.severity === "warning") return result.message;
  return null;
}

/** Builds the detailed "You've hit your …" error string for a rejected rate-limit state. */
function r1d(rateLimitInfo: any, modelId: any): any {
  let isApi = oF(),
    isAdmin = oE(),
    adminSuffix = isAdmin ? "" : " \xB7 contact your admin to increase it",
    resetsAtTime = rateLimitInfo.resetsAt,
    resetLabel = resetsAtTime ? AX(resetsAtTime, !0) : void 0,
    overageResetLabel = rateLimitInfo.overageResetsAt ? AX(rateLimitInfo.overageResetsAt, !0) : void 0,
    resetSuffix = resetLabel ? ` \xB7 resets ${resetLabel}` : "",
    specificMsg = o1d(rateLimitInfo, resetSuffix, modelId);
  if (!isApi && rateLimitInfo.overageDisabledReason && specificMsg && !_7r.has(rateLimitInfo.overageDisabledReason) && (rateLimitInfo.rateLimitType === "seven_day_overage_included" || !(sE(modelId) && fge() && !tB()))) return specificMsg;
  if (!isApi && rateLimitInfo.overageDisabledReason && _7r.has(rateLimitInfo.overageDisabledReason)) {
    let subType = vi();
    if (subType === "team" || subType === "enterprise") return oj("org's monthly spend limit", isAdmin ? " \xB7 run /usage-credits to raise it, or visit claude.ai/admin-settings/usage" : " \xB7 run /usage-credits to ask your admin for a higher limit", modelId);
    return oj(isAdmin ? "monthly spend limit" : "org's monthly spend limit", isAdmin ? " \xB7 raise it at claude.ai/settings/usage" : " \xB7 ask your admin to raise it at claude.ai/settings/usage", modelId);
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
    if (rateLimitInfo.overageDisabledReason && _7r.has(rateLimitInfo.overageDisabledReason)) {
      let orgResetSuffix = overageResetLabel ? ` \xB7 resets ${overageResetLabel}` : "";
      return oj("org's monthly usage limit", orgResetSuffix, modelId);
    }
    if (rateLimitInfo.overageDisabledReason === "seat_tier_level_disabled" || rateLimitInfo.overageDisabledReason === "seat_tier_zero_credit_limit") return `Your seat type doesn't include ${isApi ? "usage" : "usage credits"}`;
    if (rateLimitInfo.overageDisabledReason === "org_service_level_disabled") return "This service is disabled for your org";
    if (rateLimitInfo.overageDisabledReason === "member_level_disabled" || rateLimitInfo.overageDisabledReason === "member_zero_credit_limit") return "Your usage allocation has been disabled by your admin \xB7 run /usage-credits to ask your admin for a higher limit";
    if (rateLimitInfo.overageDisabledReason === "group_zero_credit_limit") return "Your group's usage limit is set to $0 \xB7 run /usage-credits to ask your admin for a higher limit";
    if (isApi) return oj("usage limit", adminSuffix, modelId);
    return oj("limit", resetSuffixOverage, modelId);
  }
  if (specificMsg) return specificMsg;
  if (isApi) return oj("usage limit", adminSuffix, modelId);
  return oj("usage limit", resetSuffix, modelId);
}

/** Returns a "You've hit your <X> limit" string for known time-window rate-limit types, or null. */
function o1d(rateLimitInfo: any, resetSuffix: any, modelId: any): any {
  if (rateLimitInfo.rateLimitType === "seven_day_sonnet") {
    let subType = vi();
    return oj(subType === "pro" || subType === "enterprise" ? "weekly limit" : "Sonnet limit", resetSuffix, modelId);
  }
  if (rateLimitInfo.rateLimitType === "seven_day_opus") return oj("Opus limit", resetSuffix, modelId);
  if (rateLimitInfo.rateLimitType === "seven_day_overage_included") return oj("Fable 5 limit", resetSuffix, modelId);
  if (rateLimitInfo.rateLimitType === "seven_day") return oj("weekly limit", resetSuffix, modelId);
  if (rateLimitInfo.rateLimitType === "five_hour") return oj("session limit", resetSuffix, modelId);
  return null;
}

/** Builds an "Approaching …" or "You've used N% of your …" warning string. */
function s1d(rateLimitInfo: any): any {
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
    case "seven_day_overage_included":
      limitLabel = "Fable 5 limit";
      break;
    case "overage":
      limitLabel = oF() ? "usage" : "usage credits";
      break;
    case void 0:
      return null;
  }
  let utilizationPct = rateLimitInfo.utilization ? Math.floor(rateLimitInfo.utilization * 100) : void 0,
    isOverageApi = rateLimitInfo.rateLimitType === "overage" && oF(),
    resetLabel = rateLimitInfo.resetsAt && !isOverageApi ? AX(rateLimitInfo.resetsAt, !0) : void 0,
    actionHint = i1d(rateLimitInfo.rateLimitType);
  if (utilizationPct && resetLabel) {
    let baseMsg = `You've used ${utilizationPct}% of your ${limitLabel} \xB7 resets ${resetLabel}`;
    return actionHint ? `${baseMsg} \xB7 ${actionHint}` : baseMsg;
  }
  if (utilizationPct) {
    let baseMsg = `You've used ${utilizationPct}% of your ${limitLabel}`;
    return actionHint ? `${baseMsg} \xB7 ${actionHint}` : baseMsg;
  }
  if (rateLimitInfo.rateLimitType === "overage") limitLabel = oF() ? "usage limit" : "usage credit limit";
  if (resetLabel) {
    let baseMsg = `Approaching ${limitLabel} \xB7 resets ${resetLabel}`;
    return actionHint ? `${baseMsg} \xB7 ${actionHint}` : baseMsg;
  }
  let approachingMsg = `Approaching ${limitLabel}`;
  return actionHint ? `${approachingMsg} \xB7 ${actionHint}` : approachingMsg;
}

/** Returns a contextual action hint string (e.g. /upgrade or /usage-credits) or null. */
function i1d(rateLimitType: any): any {
  let subType = vi(),
    hasExtraUsage = hc()?.hasExtraUsageEnabled === !0,
    isAdmin = oE();
  if (subType === "team" || subType === "enterprise") {
    if (!hasExtraUsage && MRe()) return isAdmin ? "Run /usage-credits to turn on extra usage for your org" : "Run /usage-credits to ask your admin for more";
    if (hasExtraUsage && rateLimitType === "overage") return isAdmin ? "Run /usage-credits to raise the cap" : "Run /usage-credits to ask your admin for more";
    return null;
  }
  if (rateLimitType === "five_hour" && (subType === "pro" || subType === "max") && !rj()) return "/upgrade to keep using Claude Code";
  return null;
}

/** Returns a "switch models or buy more" suggestion string when Fable is rate-limited, else null. */
function m6i(modelId: any): any {
  if (!a1d(modelId)) return null;
  if (!MRe() || Ne.DISABLE_EXTRA_USAGE_COMMAND) return "Switch models to keep working.";
  if (!oE()) return "Switch models to keep working.";
  return "Buy more to keep using Fable 5, or switch models to keep working.";
}

/** Returns true when the model is a Fable model in an API/non-default context. */
function a1d(modelId: any): any {
  return modelId !== null && sE(Qo(modelId)) && fge() && !tB();
}

/** Returns a {lever, text} effort/model suggestion for Pro users hitting weekly limits, else null. */
function f6i(rateLimitInfo: any, modelId: any, effortLevel: any): any {
  if (vi() !== "pro") return null;
  if (rateLimitInfo.rateLimitType !== "seven_day") return null;
  if (modelId.includes("fable")) return {
    lever: "model",
    text: "try /model opus \xB7 more runway"
  };
  if (modelId.includes("opus")) return {
    lever: "model",
    text: "try /model sonnet \xB7 ~2\xD7 runway"
  };
  if (!BR(modelId)) return null;
  let effortRank = iO(modelId, effortLevel);
  if (effortRank === "high" || effortRank === "xhigh" || effortRank === "max") return {
    lever: "effort",
    text: "try /effort medium"
  };
  return null;
}

/** Builds the "You're now using …" transition message when overage kicks in. */
function S7r(rateLimitInfo: any, modelId: any): any {
  let resetLabel = rateLimitInfo.resetsAt ? AX(rateLimitInfo.resetsAt, !0) : "",
    limitName = "";
  if (rateLimitInfo.rateLimitType === "five_hour") limitName = "session limit";else if (rateLimitInfo.rateLimitType === "seven_day") limitName = "weekly limit";else if (rateLimitInfo.rateLimitType === "seven_day_opus") limitName = "Opus limit";else if (rateLimitInfo.rateLimitType === "seven_day_sonnet") {
    let subType = vi();
    limitName = subType === "pro" || subType === "enterprise" ? "weekly limit" : "Sonnet limit";
  }
  let isApi = oF();
  if (!limitName && !isApi && modelId) {
    let modelLabel = g7(Qo(modelId));
    if (modelLabel && Mke().includes(modelLabel)) {
      let modelResetSuffix = resetLabel ? ` \xB7 Your ${modelLabel} limit resets ${resetLabel}` : "";
      return `Now using usage credits for ${modelLabel}${modelResetSuffix}`;
    }
  }
  let usageLabel = isApi ? "your usage allocation" : "usage credits";
  if (!limitName) return `Now using ${usageLabel}`;
  let resetSuffix = resetLabel && !isApi ? ` \xB7 Your ${limitName} resets ${resetLabel}` : "";
  return `You're now using ${usageLabel}${resetSuffix}`;
}

/** Formats a canonical "You've hit your <limitName><suffix>" string. */
function oj(limitName: any, suffix: any, modelId: any): any {
  return `You've hit your ${limitName}${suffix}`;
}
var _7r, n1d;
var QMt = b(() => {
  lo();
  RM();
  Cp();
  Ir();
  Xo();
  ej();
  Ro();
  q$e();
  jn();
  _ge();
  _7r = new Set(["org_level_disabled_until", "org_spend_cap_reached"]), n1d = ["You've hit your", "You've reached your", "You've used", "You're now using usage credits", "You're close to", "You're out of usage credits", "Your org is out of usage \xB7 add funds to continue", "Your org is out of usage \xB7 contact your admin", "You're now using your usage allocation", "Now using your usage allocation", "Now using usage credits", "Your seat type doesn't include usage credits", "Your seat type doesn't include usage", "This service is disabled for your org", "Your usage allocation has been disabled by your admin", "Your group's usage limit is set to $0", "Fable 5 requires usage credits", "You're now using extra usage", "You're out of extra usage", "Now using extra usage", "Your seat type doesn't include extra usage"];
});

export {d6i,p6i,y7r,T7r,r1d,o1d,s1d,i1d,m6i,a1d,f6i,S7r,oj,_7r,n1d,QMt};
