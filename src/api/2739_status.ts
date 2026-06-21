// @ts-nocheck
import {aT as qT,durationUnitMillis as LX} from "../../vendor/m442.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue,fromEnumOpt as us} from "../../vendor/m5.ts";
import {getSmallFastModel as Sw,mv as Tw,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Q8 as O8,NBe as ABe} from "../config/2021_error.ts";
import {Af as yf,S_ as y_} from "../agent/1454_agentType.ts";
import {e5 as M8,jR} from "../config/2028_allowed.ts";
import {QRe as ORe,rb as eb} from "../permissions/5178_level.ts";
import {BR as NR,g1 as i1} from "../../vendor/m1445.ts";
import {ra as ta,Ap as hp} from "../config/0614_Ap.ts";
import {int as jtt,F8r as Yjr,gOt as zPt} from "../../vendor/m2735.ts";
import {isClaudeAISubscriber as Co,getSubscriptionType as da,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {getIsNonInteractiveSession as kr,setFableCreditsRequired as ugt,lt as ct} from "../session/0131_sent.ts";
import {es as ns} from "../../vendor/m135.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {w8 as l8,LB as V3} from "../../vendor/m1284.ts";
import {D0 as Y1,P2e as d2e,eW as B5} from "../telemetry/2730_raw.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {b} from "../../runtime.ts";
import {LD as OD} from "../../vendor/m194.ts";
import {_Ot as YPt} from "../core/2738_message.ts";
// @ts-nocheck
function getRateLimitDisplayName(rateLimitType) {
  return RATE_LIMIT_TYPE_DISPLAY_NAMES[rateLimitType] || rateLimitType;
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
  for (let [key, label] of [["five_hour", "5h"], ["seven_day", "7d"], ["overage", "overage"]]) {
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
  currentRateLimitStatus = newStatus, rateLimitStatusListeners.forEach(K => K(newStatus));
  let {
      overagePeriodMonthly: n,
      ...r
    } = prevStatus,
    {
      overagePeriodMonthly: o,
      ...s
    } = newStatus;
  if (qT(r, s)) return;
  let i = Math.round((newStatus.resetsAt ? newStatus.resetsAt - Date.now() / 1000 : 0) / 3600 * 10) / 10;
  j("tengu_claudeai_limits_status_changed", {
    status: Ue(newStatus.status),
    previousStatus: Ue(prevStatus.status),
    rateLimitType: us(newStatus.rateLimitType),
    isUsingOverage: newStatus.isUsingOverage,
    unifiedRateLimitFallbackAvailable: newStatus.unifiedRateLimitFallbackAvailable,
    hoursTillReset: i
  });
}
async function probeQuotaStatus() {
  let smallModel = Sw(),
    client = await O8({
      maxRetries: 0,
      model: smallModel,
      source: "quota_check",
      agentContext: yf()
    }),
    messages = [{
      role: "user",
      content: "quota"
    }],
    betas = M8(smallModel);
  return client.beta.messages.create({
    model: smallModel,
    max_tokens: 1,
    messages: messages,
    metadata: ORe(),
    ...(betas.length > 0 && {
      betas: NR(betas)
    })
  }).asResponse();
}
async function checkAndUpdateQuotaStatus() {
  if (ta()) return;
  if (!jtt(Co())) return;
  if (kr()) return;
  try {
    let response = await probeQuotaStatus();
    processSuccessResponseHeaders_2(response.headers, Sw());
  } catch (err) {
    if (err instanceof ns) processErrorResponseHeaders(err);
  }
}
function checkSurpassedThresholdHeaders(headers, unifiedRateLimitFallbackAvailable) {
  for (let [key, rateLimitType] of Object.entries(RATE_LIMIT_WINDOW_ABBREVS)) {
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
  for (let windowCfg of WINDOW_THRESHOLD_CONFIGS) {
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
    isUsingOverage = headers.get("anthropic-ratelimit-unified-overage-period-monthly-utilization"),
    effectiveStatus = isUsingOverage ? Number(isUsingOverage) : NaN,
    A = Number.isFinite(effectiveStatus) ? {
      utilization: effectiveStatus
    } : undefined,
    h = status === "rejected" && (overageStatus === "allowed" || overageStatus === "allowed_warning"),
    g = status;
  if (status === "allowed" || status === "allowed_warning") {
    let _ = checkAllThresholds(headers, fallbackAvailable);
    if (_) return {
      ..._,
      ...(upgradePaths && {
        upgradePaths: upgradePaths
      }),
      ...(overageInUse && {
        overageInUse: overageInUse
      }),
      ...(A && {
        overagePeriodMonthly: A
      })
    };
    g = "allowed";
  }
  return {
    status: g,
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
    isUsingOverage: h,
    ...(overageInUse && {
      overageInUse: overageInUse
    }),
    ...(A && {
      overagePeriodMonthly: A
    })
  };
}
function syncExtraUsageDisabledReasonToConfig(headers) {
  let reason = headers.error?.error?.details;
  if (reason?.error_code !== "credits_required") return {};
  return {
    errorCode: "credits_required",
    ...(typeof reason.can_user_purchase_credits === "boolean" && {
      canUserPurchaseCredits: reason.can_user_purchase_credits
    }),
    ...(typeof reason.has_chargeable_saved_payment_method === "boolean" && {
      hasChargeableSavedPaymentMethod: reason.has_chargeable_saved_payment_method
    })
  };
}
function processSuccessResponseHeaders(headers) {
  let t = headers.get("anthropic-ratelimit-unified-overage-disabled-reason") ?? null;
  if (vt().cachedExtraUsageDisabledReason !== t) un(r => ({
    ...r,
    cachedExtraUsageDisabledReason: t
  }));
}
function processSuccessResponseHeaders_2(err, t, n = false) {
  let r = Co();
  if (!jtt(r)) {
    if (currentUtilization = {}, currentRateLimitStatus.status !== "allowed" || currentRateLimitStatus.resetsAt) emitRateLimitStatusChange({
      status: "allowed",
      unifiedRateLimitFallbackAvailable: false,
      isUsingOverage: false
    });
    return;
  }
  let o = Yjr(err);
  currentUtilization = parseUtilizationFromHeaders(o);
  let s = parseUnifiedRateLimitStatus(o);
  if (processSuccessResponseHeaders(o), !qT(currentRateLimitStatus, s)) emitRateLimitStatusChange(s);
  if (s.overageInUse === true) {
    if (s.isUsingOverage !== true && !n && !l8() && Tw(t) && !Y1() && !d2e()) ugt(true);
    rateLimitStatusInitLazy.forEach(i => i(t, s.isUsingOverage === true, n));
  }
}
function processErrorResponseHeaders(e) {
  if (!jtt(Co()) || e.status !== 429) return;
  try {
    let {
        status: t,
        isUsingOverage: n
      } = currentRateLimitStatus,
      r = currentUtilization.five_hour?.utilization,
      o = currentUtilization.seven_day?.utilization,
      s = currentUtilization.overage?.utilization,
      i = {
        ...currentRateLimitStatus
      };
    if (e.headers) {
      let l = Yjr(e.headers);
      currentUtilization = parseUtilizationFromHeaders(l), i = parseUnifiedRateLimitStatus(l), processSuccessResponseHeaders(l);
    }
    if (i.status = "rejected", Object.assign(i, syncExtraUsageDisabledReasonToConfig(e)), (t !== "rejected" || n) && !(t === "allowed" && !n && r === undefined && o === undefined && s === undefined)) {
      let l = i.rateLimitType === "five_hour" ? r : i.rateLimitType?.startsWith("seven_day") ? o : i.rateLimitType === "overage" ? s : Math.max(r ?? 0, o ?? 0, s ?? 0);
      if (l === undefined || l < 0.8) j("tengu_quota_mismatch", {
        priorStatus: Ue(t),
        priorIsUsingOverage: n,
        priorFiveHourUtilization: r,
        priorSevenDayUtilization: o,
        priorOverageUtilization: s,
        rateLimitType: us(i.rateLimitType) ?? undefined,
        subscriptionType: us(da()) ?? undefined,
        hadPriorUtilizationData: r !== undefined || o !== undefined || s !== undefined
      });
    }
    if (!qT(currentRateLimitStatus, i)) emitRateLimitStatusChange(i);
  } catch (t) {
    Ie(t);
  }
}
var WINDOW_THRESHOLD_CONFIGS, RATE_LIMIT_WINDOW_ABBREVS, RATE_LIMIT_TYPE_DISPLAY_NAMES, currentRateLimitStatus, currentUtilization, rateLimitStatusListeners, rateLimitStatusInitLazy;
var F$ = b(() => {
  OD();
  LX();
  ct();
  i1();
  y_();
  mo();
  jR();
  V3();
  nr();
  wn();
  B5();
  Fo();
  hp();
  Ct();
  eb();
  ABe();
  zPt();
  YPt();
  WINDOW_THRESHOLD_CONFIGS = [{
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
  }], RATE_LIMIT_WINDOW_ABBREVS = {
    "5h": "five_hour",
    "7d": "seven_day",
    overage: "overage"
  }, RATE_LIMIT_TYPE_DISPLAY_NAMES = {
    five_hour: "session limit",
    seven_day: "weekly limit",
    seven_day_opus: "Opus limit",
    seven_day_sonnet: "Sonnet limit",
    overage: "usage credit limit"
  };
  currentRateLimitStatus = {
    status: "allowed",
    unifiedRateLimitFallbackAvailable: false,
    isUsingOverage: false
  }, currentUtilization = {};
  rateLimitStatusListeners = new Set(), rateLimitStatusInitLazy = new Set();
});

export {getRateLimitDisplayName as CUi,computeWindowTimeFraction as CRd,parseUnifiedRateLimitFromError as vUi,getRateLimitUtilization as TOt,parseUtilizationFromHeaders as wUi,emitRateLimitStatusChange as yOt,probeQuotaStatus as vRd,checkAndUpdateQuotaStatus as RUi,checkSurpassedThresholdHeaders as wRd,checkWindowThreshold as RRd,checkAllThresholds as xRd,parseUnifiedRateLimitStatus as xUi,syncExtraUsageDisabledReasonToConfig as kRd,processSuccessResponseHeaders as kUi,processSuccessResponseHeaders_2 as qwn,processErrorResponseHeaders as jwn,WINDOW_THRESHOLD_CONFIGS as SRd,RATE_LIMIT_WINDOW_ABBREVS as bRd,RATE_LIMIT_TYPE_DISPLAY_NAMES as ERd,currentRateLimitStatus as Hk,currentUtilization as N2e,rateLimitStatusListeners as XRe,rateLimitStatusInitLazy as $wn,F$ as PF};
