// @ts-nocheck
import {J_,$X} from "../../vendor/m446.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Bo} from "../../vendor/m5.ts";
import {getSmallFastModel as xR,isFableFamilyOrPinnedModel as sE,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {p8,PBe} from "../config/2026_error.ts";
import {initProfileReportModule as Hm,Ph} from "../agent/1459_agentType.ts";
import {h8,MR} from "../config/2033_allowed.ts";
import {Fke,rb} from "../permissions/5211_level.ts";
import {Yv,xM} from "../../vendor/m1450.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {lot,g7r,XMt} from "../../vendor/m2747.ts";
import {isClaudeAISubscriber as Eo,getSubscriptionType as vi,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {getIsNonInteractiveSession as kr,setFableCreditsRequired as Tir,lt} from "../session/0132_sent.ts";
import {Uo} from "../../vendor/m137.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {oF,RM} from "../../vendor/m1289.ts";
import {tB,Sae,KMt,ej} from "../telemetry/2743_raw.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {b} from "../../runtime.ts";
import {jx} from "../../vendor/m196.ts";
import {QMt} from "../core/2751_message.ts";
// @ts-nocheck
function getRateLimitDisplayName(rateLimitType) {
  return u1d[rateLimitType] || rateLimitType;
}
function computeWindowTimeFraction(windowResetUnixSec, windowSeconds) {
  let nowSec = Date.now() / 1000,
    windowStartSec = windowResetUnixSec - windowSeconds,
    elapsedSec = nowSec - windowStartSec;
  return Math.max(0, Math.min(1, elapsedSec / windowSeconds));
}
function parseUnifiedRateLimitFromError(err) {
  let representativeClaim = err.headers?.get?.("anthropic-ratelimit-unified-representative-claim"),
    overageStatus = err.headers?.get?.("anthropic-ratelimit-unified-overage-status");
  if (!representativeClaim && !overageStatus) return null;
  let partial = {
      status: "rejected",
      unifiedRateLimitFallbackAvailable: false,
      isUsingOverage: false
    },
    resetHeader = err.headers?.get?.("anthropic-ratelimit-unified-reset");
  if (resetHeader) partial.resetsAt = Number(resetHeader);
  if (representativeClaim) partial.rateLimitType = representativeClaim;
  if (overageStatus) partial.overageStatus = overageStatus;
  let overageReset = err.headers?.get?.("anthropic-ratelimit-unified-overage-reset");
  if (overageReset) partial.overageResetsAt = Number(overageReset);
  let overageDisabledReason = err.headers?.get?.("anthropic-ratelimit-unified-overage-disabled-reason");
  if (overageDisabledReason) partial.overageDisabledReason = overageDisabledReason;
  return partial;
}
function getRateLimitUtilization() {
  return currentUtilization;
}
function parseUtilizationFromHeaders(headers) {
  let result = {};
  for (let [key, label] of [["five_hour", "5h"], ["seven_day", "7d"], ["seven_day_overage_included", "7d_oi"], ["overage", "overage"]]) {
    let utilization = headers.get(`anthropic-ratelimit-unified-${label}-utilization`),
      resetAt = headers.get(`anthropic-ratelimit-unified-${label}-reset`);
    if (utilization !== null && resetAt !== null) result[key] = {
      utilization: Number(utilization),
      resets_at: Number(resetAt)
    };
  }
  return result;
}
function emitRateLimitStatusChange(newStatus) {
  let prevStatus = currentRateLimitStatus;
  currentRateLimitStatus = newStatus, Nke.forEach(c => c(newStatus));
  let {
      overagePeriodMonthly: prevMonthly,
      overagePeriodChannel: prevChannel,
      ...prevRest
    } = prevStatus,
    {
      overagePeriodMonthly: nextMonthly,
      overagePeriodChannel: nextChannel,
      ...nextRest
    } = newStatus;
  if (J_(prevRest, nextRest)) return;
  let hoursTillReset = Math.round((newStatus.resetsAt ? newStatus.resetsAt - Date.now() / 1000 : 0) / 3600 * 10) / 10;
  W("tengu_claudeai_limits_status_changed", {
    status: Le(newStatus.status),
    previousStatus: Le(prevStatus.status),
    rateLimitType: Bo(newStatus.rateLimitType),
    isUsingOverage: newStatus.isUsingOverage,
    unifiedRateLimitFallbackAvailable: newStatus.unifiedRateLimitFallbackAvailable,
    hoursTillReset: hoursTillReset
  });
}
async function probeQuotaStatus() {
  let smallModel = xR(),
    client = await p8({
      maxRetries: 0,
      model: smallModel,
      source: "quota_check",
      agentContext: Hm()
    }),
    messages = [{
      role: "user",
      content: "quota"
    }],
    betas = h8(smallModel);
  return client.beta.messages.create({
    model: smallModel,
    max_tokens: 1,
    messages: messages,
    metadata: Fke(),
    ...(betas.length > 0 && {
      betas: Yv(betas)
    })
  }).asResponse();
}
async function checkAndUpdateQuotaStatus() {
  if (Vi()) return;
  if (!lot(Eo())) return;
  if (kr()) return;
  try {
    let response = await probeQuotaStatus();
    HHn(response.headers, xR());
  } catch (err) {
    if (err instanceof Uo) IHn(err);
  }
}
function checkSurpassedThresholdHeaders(headers, unifiedRateLimitFallbackAvailable) {
  for (let [key, rateLimitType] of Object.entries(c1d)) {
    let surpassedThreshold = headers.get(`anthropic-ratelimit-unified-${key}-surpassed-threshold`);
    if (surpassedThreshold !== null) {
      let utilization = headers.get(`anthropic-ratelimit-unified-${key}-utilization`),
        resetAt = headers.get(`anthropic-ratelimit-unified-${key}-reset`),
        utilizationNum = utilization ? Number(utilization) : undefined;
      return {
        status: "allowed_warning",
        resetsAt: resetAt ? Number(resetAt) : undefined,
        rateLimitType: rateLimitType,
        utilization: utilizationNum,
        unifiedRateLimitFallbackAvailable: unifiedRateLimitFallbackAvailable,
        isUsingOverage: false,
        surpassedThreshold: Number(surpassedThreshold)
      };
    }
  }
  return null;
}
function checkWindowThreshold(headers, windowCfg, unifiedRateLimitFallbackAvailable) {
  let {
      rateLimitType: rateLimitType,
      claimAbbrev: claimAbbrev,
      windowSeconds: windowSeconds,
      thresholds: thresholds
    } = windowCfg,
    utilization = headers.get(`anthropic-ratelimit-unified-${claimAbbrev}-utilization`),
    resetAt = headers.get(`anthropic-ratelimit-unified-${claimAbbrev}-reset`);
  if (utilization === null || resetAt === null) return null;
  let utilizationNum = Number(utilization),
    resetAtNum = Number(resetAt),
    timeFraction = computeWindowTimeFraction(resetAtNum, windowSeconds);
  if (!thresholds.some(t => utilizationNum >= t.utilization && timeFraction <= t.timePct)) return null;
  return {
    status: "allowed_warning",
    resetsAt: resetAtNum,
    rateLimitType: rateLimitType,
    utilization: utilizationNum,
    unifiedRateLimitFallbackAvailable: unifiedRateLimitFallbackAvailable,
    isUsingOverage: false
  };
}
function checkAllThresholds(headers, unifiedRateLimitFallbackAvailable) {
  let surpassedWarning = checkSurpassedThresholdHeaders(headers, unifiedRateLimitFallbackAvailable);
  if (surpassedWarning) return surpassedWarning;
  for (let windowCfg of l1d) {
    let warning = checkWindowThreshold(headers, windowCfg, unifiedRateLimitFallbackAvailable);
    if (warning) return warning;
  }
  return null;
}
function parseUnifiedRateLimitStatus(headers) {
  let status = headers.get("anthropic-ratelimit-unified-status") || "allowed",
    resetHeader = headers.get("anthropic-ratelimit-unified-reset"),
    resetsAt = resetHeader ? Number(resetHeader) : undefined,
    fallbackAvailable = headers.get("anthropic-ratelimit-unified-fallback") === "available",
    representativeClaim = headers.get("anthropic-ratelimit-unified-representative-claim"),
    overageStatus = headers.get("anthropic-ratelimit-unified-overage-status"),
    overageResetHeader = headers.get("anthropic-ratelimit-unified-overage-reset"),
    overageResetsAt = overageResetHeader ? Number(overageResetHeader) : undefined,
    overageDisabledReason = headers.get("anthropic-ratelimit-unified-overage-disabled-reason"),
    overageInUse = headers.get("anthropic-ratelimit-unified-overage-in-use") === "true",
    upgradePathsHeader = headers.get("anthropic-ratelimit-unified-upgrade-paths"),
    upgradePaths = upgradePathsHeader ? upgradePathsHeader.split(",").map(s => s.trim()) : undefined,
    monthlyUtilHeader = headers.get("anthropic-ratelimit-unified-overage-period-monthly-utilization"),
    monthlyUtilNum = monthlyUtilHeader ? Number(monthlyUtilHeader) : NaN,
    overagePeriodMonthly = Number.isFinite(monthlyUtilNum) ? {
      utilization: monthlyUtilNum
    } : undefined,
    channelUtilHeader = headers.get("anthropic-ratelimit-unified-overage-period-channel-utilization"),
    channelUtilNum = channelUtilHeader ? Number(channelUtilHeader) : NaN,
    overagePeriodChannel = Number.isFinite(channelUtilNum) ? {
      utilization: channelUtilNum
    } : undefined,
    isUsingOverage = status === "rejected" && (overageStatus === "allowed" || overageStatus === "allowed_warning"),
    effectiveStatus = status;
  if (status === "allowed" || status === "allowed_warning") {
    let warning = checkAllThresholds(headers, fallbackAvailable);
    if (warning) return {
      ...warning,
      ...(upgradePaths && {
        upgradePaths: upgradePaths
      }),
      ...(overageInUse && {
        overageInUse: overageInUse
      }),
      ...(overagePeriodMonthly && {
        overagePeriodMonthly: overagePeriodMonthly
      }),
      ...(overagePeriodChannel && {
        overagePeriodChannel: overagePeriodChannel
      })
    };
    effectiveStatus = "allowed";
  }
  return {
    status: effectiveStatus,
    resetsAt: resetsAt,
    unifiedRateLimitFallbackAvailable: fallbackAvailable,
    ...(representativeClaim && {
      rateLimitType: representativeClaim
    }),
    ...(overageStatus && {
      overageStatus: overageStatus
    }),
    ...(overageResetsAt && {
      overageResetsAt: overageResetsAt
    }),
    ...(overageDisabledReason && {
      overageDisabledReason: overageDisabledReason
    }),
    ...(upgradePaths && {
      upgradePaths: upgradePaths
    }),
    isUsingOverage: isUsingOverage,
    ...(overageInUse && {
      overageInUse: overageInUse
    }),
    ...(overagePeriodMonthly && {
      overagePeriodMonthly: overagePeriodMonthly
    }),
    ...(overagePeriodChannel && {
      overagePeriodChannel: overagePeriodChannel
    })
  };
}
function syncExtraUsageDisabledReasonToConfig(err) {
  let details = err.error?.error?.details;
  if (details?.error_code !== "credits_required") return {};
  return {
    errorCode: "credits_required",
    ...(typeof details.disabled_reason === "string" && {
      overageDisabledReason: details.disabled_reason
    }),
    ...(typeof details.can_user_purchase_credits === "boolean" && {
      canUserPurchaseCredits: details.can_user_purchase_credits
    }),
    ...(typeof details.has_chargeable_saved_payment_method === "boolean" && {
      hasChargeableSavedPaymentMethod: details.has_chargeable_saved_payment_method
    })
  };
}
function processSuccessResponseHeaders(headers) {
  if (Ot().cachedExtraUsageDisabledReason !== headers) hn(cfg => ({
    ...cfg,
    cachedExtraUsageDisabledReason: headers
  }));
}
function S6i(headers) {
  processSuccessResponseHeaders(headers.get("anthropic-ratelimit-unified-overage-disabled-reason") ?? null);
}
function HHn(headers, model, suppressOverageToast = false) {
  let subscriptionStatus = Eo();
  if (!lot(subscriptionStatus)) {
    if (currentUtilization = {}, currentRateLimitStatus.status !== "allowed" || currentRateLimitStatus.resetsAt) emitRateLimitStatusChange({
      status: "allowed",
      unifiedRateLimitFallbackAvailable: false,
      isUsingOverage: false
    });
    return;
  }
  let normalizedHeaders = g7r(headers);
  currentUtilization = parseUtilizationFromHeaders(normalizedHeaders);
  let nextStatus = parseUnifiedRateLimitStatus(normalizedHeaders);
  if (S6i(normalizedHeaders), !J_(currentRateLimitStatus, nextStatus)) emitRateLimitStatusChange(nextStatus);
  if (nextStatus.overageInUse === true) {
    if (!(nextStatus.isUsingOverage === true && nextStatus.rateLimitType !== "seven_day_overage_included") && !suppressOverageToast && !oF() && sE(model) && !tB() && !Sae() && !KMt()) Tir(true);
    kHn.forEach(cb => cb(model, nextStatus.isUsingOverage === true, suppressOverageToast));
  }
}
function IHn(err) {
  if (!lot(Eo()) || err.status !== 429) return;
  try {
    let {
        status: priorStatus,
        isUsingOverage: priorIsUsingOverage
      } = currentRateLimitStatus,
      priorFiveHourUtil = currentUtilization.five_hour?.utilization,
      priorSevenDayUtil = currentUtilization.seven_day?.utilization,
      priorOverageUtil = currentUtilization.overage?.utilization,
      nextStatus = {
        ...currentRateLimitStatus
      };
    if (err.headers) {
      let normalizedHeaders = g7r(err.headers);
      currentUtilization = parseUtilizationFromHeaders(normalizedHeaders), nextStatus = parseUnifiedRateLimitStatus(normalizedHeaders), S6i(normalizedHeaders);
    }
    if (nextStatus.status = "rejected", Object.assign(nextStatus, syncExtraUsageDisabledReasonToConfig(err)), (priorStatus !== "rejected" || priorIsUsingOverage) && !(priorStatus === "allowed" && !priorIsUsingOverage && priorFiveHourUtil === undefined && priorSevenDayUtil === undefined && priorOverageUtil === undefined)) {
      let priorUtil = nextStatus.rateLimitType === "five_hour" ? priorFiveHourUtil : nextStatus.rateLimitType?.startsWith("seven_day") ? priorSevenDayUtil : nextStatus.rateLimitType === "overage" ? priorOverageUtil : Math.max(priorFiveHourUtil ?? 0, priorSevenDayUtil ?? 0, priorOverageUtil ?? 0);
      if (priorUtil === undefined || priorUtil < 0.8) W("tengu_quota_mismatch", {
        priorStatus: Le(priorStatus),
        priorIsUsingOverage: priorIsUsingOverage,
        priorFiveHourUtilization: priorFiveHourUtil,
        priorSevenDayUtilization: priorSevenDayUtil,
        priorOverageUtilization: priorOverageUtil,
        rateLimitType: Bo(nextStatus.rateLimitType) ?? undefined,
        subscriptionType: Bo(vi()) ?? undefined,
        hadPriorUtilizationData: priorFiveHourUtil !== undefined || priorSevenDayUtil !== undefined || priorOverageUtil !== undefined
      });
    }
    if (!J_(currentRateLimitStatus, nextStatus)) emitRateLimitStatusChange(nextStatus);
  } catch (caught) {
    Ie(caught);
  }
}
var l1d, c1d, u1d, currentRateLimitStatus, currentUtilization, Nke, kHn;
var nB = b(() => {
  jx();
  $X();
  lt();
  xM();
  Ph();
  lo();
  MR();
  RM();
  tr();
  vn();
  ej();
  Ro();
  $d();
  kt();
  rb();
  PBe();
  XMt();
  QMt();
  l1d = [{
    rateLimitType: "five_hour",
    claimAbbrev: "5h",
    windowSeconds: 18000,
    thresholds: [{
      utilization: 0.9,
      timePct: 0.72
    }]
  }, {
    rateLimitType: "seven_day",
    claimAbbrev: "7d",
    windowSeconds: 604800,
    thresholds: [{
      utilization: 0.75,
      timePct: 0.6
    }, {
      utilization: 0.5,
      timePct: 0.35
    }, {
      utilization: 0.25,
      timePct: 0.15
    }]
  }], c1d = {
    "5h": "five_hour",
    "7d": "seven_day",
    "7d_oi": "seven_day_overage_included",
    overage: "overage"
  }, u1d = {
    five_hour: "session limit",
    seven_day: "weekly limit",
    seven_day_opus: "Opus limit",
    seven_day_sonnet: "Sonnet limit",
    seven_day_overage_included: "Fable 5 limit",
    overage: "usage credit limit"
  };
  currentRateLimitStatus = {
    status: "allowed",
    unifiedRateLimitFallbackAvailable: false,
    isUsingOverage: false
  }, currentUtilization = {};
  Nke = new Set(), kHn = new Set();
});

export {getRateLimitDisplayName as h6i,computeWindowTimeFraction as d1d,parseUnifiedRateLimitFromError as g6i,getRateLimitUtilization as e1t,parseUtilizationFromHeaders as _6i,emitRateLimitStatusChange as ZMt,probeQuotaStatus as p1d,checkAndUpdateQuotaStatus as y6i,checkSurpassedThresholdHeaders as m1d,checkWindowThreshold as f1d,checkAllThresholds as h1d,parseUnifiedRateLimitStatus as T6i,syncExtraUsageDisabledReasonToConfig as b7r,processSuccessResponseHeaders as uot,S6i,HHn,IHn,l1d,c1d,u1d,currentRateLimitStatus as zk,currentUtilization as W$e,Nke,kHn,nB};
