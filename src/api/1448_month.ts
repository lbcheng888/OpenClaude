// @ts-nocheck
import {getAPIProvider as Hr,li as si} from "./1282_usesFirstPartyModelIds.ts";
import {st as rt,fromEnum as Ue,ca} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "./2198_stopPeriodicGrowthBookRefresh.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {isModelAllowed as Cl} from "../../vendor/m1451.ts";
import {getMainLoopModel as Ns,isOpus1mMergeEnabled as tC,getDefaultMainLoopModelSetting as lk,parseUserSpecifiedModel as gs,getCanonicalName as qo,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {jb as Ub,Dd as Sd} from "../../vendor/m687.ts";
import {getSettingsForSource as Cn,getInitialSettings as Kr,updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {getIsNonInteractiveSession as kr,preferThirdPartyAuthentication as CWe,lt as ct} from "../session/0131_sent.ts";
import {getClaudeAIOAuthTokens as di,getAnthropicApiKey as DR,hasProfileScope as PR,handleOAuth401Error as IB,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {saveGlobalConfig as un,getGlobalConfig as vt,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getOauthConfig as Is,OAUTH_BETA_HEADER as SH,Dc as Hc} from "./0459_getOauthConfig.ts";
import {fo as ho} from "../../vendor/m566.ts";
import {ra as ta,Ap as hp} from "../config/0614_Ap.ts";
import {b} from "../../runtime.ts";
import {Gp as cm} from "../../vendor/m567.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {kg as Ig} from "../../vendor/m129.ts";
// @ts-nocheck
function isFastModeEligible() {
  if (Hr() !== "firstParty") return false;
  return !rt(process.env.CLAUDE_CODE_DISABLE_FAST_MODE);
}
function shouldSkipFastModeOrgCheck() {
  return rt(process.env.CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK);
}
function isFastModeReady() {
  if (!isFastModeEligible()) return false;
  return getFastModeUnavailableReason() === null;
}
function describeOrgDisabledReason(reason, authType) {
  switch (reason) {
    case "free":
      return authType === "oauth" ? "Fast mode requires a paid subscription" : "Fast mode unavailable during evaluation. Please purchase credits.";
    case "preference":
      return "Fast mode has been disabled by your organization";
    case "extra_usage_disabled":
      return "Fast mode requires usage credits \xB7 /usage-credits to turn them on";
    case "network_error":
      return "Fast mode unavailable due to network connectivity issues";
    case "unknown":
      return "Fast mode is currently unavailable";
  }
}
function getFastModeUnavailableReason() {
  if (!isFastModeEligible()) return Hr() !== "firstParty" ? "Fast mode is only available when using the Anthropic API directly" : "Fast mode is not available";
  let killSwitch = ut("tengu_penguins_off", null);
  if (killSwitch !== null) return v(`Fast mode unavailable: ${killSwitch}`), killSwitch;
  if (!Cl(getFastModeModelId())) {
    let mainModel = Ns();
    if (!(!Ub() && q$(mainModel) && Cl(mainModel))) {
      let notAllowedReason = `${getFastModeModelDisplayName()} is not in your organization's allowed models`;
      return v(`Fast mode unavailable: ${notAllowedReason}`), notAllowedReason;
    }
  }
  let fastModeFlagEnabled = Cn("flagSettings")?.fastMode === true;
  if (kr() && CWe()) {
    if (!fastModeFlagEnabled) return v("Fast mode unavailable: Fast mode is not available in the Agent SDK"), "Fast mode is not available in the Agent SDK";
  }
  if (fastModeOrgStatus.status === "pending" && !shouldSkipFastModeOrgCheck() && !fastModeFlagEnabled) return v("Fast mode unavailable: Checking fast mode availability (org status pending)"), "Checking fast mode availability";
  if (fastModeOrgStatus.status === "disabled" && !shouldSkipFastModeOrgCheck()) {
    if (fastModeOrgStatus.reason === "network_error" || fastModeOrgStatus.reason === "unknown") {
      if (rt(process.env.CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS) || fastModeFlagEnabled) return null;
    }
    let authType = di() !== null ? "oauth" : "api-key",
      disabledMessage = describeOrgDisabledReason(fastModeOrgStatus.reason, authType);
    return v(`Fast mode unavailable: ${disabledMessage}`), disabledMessage;
  }
  return null;
}
function getFastModeModelDisplayName() {
  return "Opus 4.8";
}
function getFastModeModelId() {
  return "opus" + (tC() ? "[1m]" : "");
}
function shouldUseFastModeForModel(model) {
  if (!isFastModeEligible()) return false;
  if (!isFastModeReady()) return false;
  if (!q$(model)) return false;
  let session = Kr();
  if (session.fastModePerSessionOptIn) return false;
  return session.fastMode === true;
}
function q$(model) {
  if (!isFastModeEligible()) return false;
  let resolvedModel = model ?? lk(),
    normalized = gs(resolvedModel).toLowerCase();
  return normalized.includes("opus-4-6") || normalized.includes("opus-4-7") || normalized.includes("opus-4-8");
}
function getOpus46SunsetDate() {
  if (qo(Ns()) !== "claude-opus-4-6") return null;
  let sunsetDateRaw = ut("tengu_sunset_penguin_opus46", "2026-06-29"),
    sunsetTimestamp = Date.parse(sunsetDateRaw);
  if (Number.isNaN(sunsetTimestamp) || Date.now() >= sunsetTimestamp) return null;
  return new Date(sunsetTimestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });
}
function getFastModeCooldownState() {
  if (fastModeCooldownState.status === "cooldown" && Date.now() >= fastModeCooldownState.resetAt) {
    if (isFastModeEligible() && !fastModeReenabledAfterCooldown) v("Fast mode cooldown expired, re-enabling fast mode"), fastModeReenabledAfterCooldown = true, fastModeCooldownExpiredEmitter.emit();
    fastModeCooldownState = {
      status: "active"
    };
  }
  return fastModeCooldownState;
}
function triggerFastModeCooldown(resetAt, reason) {
  if (!isFastModeEligible()) return;
  fastModeCooldownState = {
    status: "cooldown",
    resetAt: resetAt,
    reason: reason
  }, fastModeReenabledAfterCooldown = false;
  let cooldownDurationMs = resetAt - Date.now();
  v(`Fast mode cooldown triggered (${reason}), duration ${Math.round(cooldownDurationMs / 1000)}s`), j("tengu_fast_mode_fallback_triggered", {
    cooldown_duration_ms: cooldownDurationMs,
    cooldown_reason: Ue(reason)
  }), fastModeCooldownTriggeredEmitter.emit(resetAt, reason);
}
function clearFastModeCooldown() {
  fastModeCooldownState = {
    status: "active"
  };
}
function disableFastModeByPreference() {
  if (fastModeOrgStatus.status === "disabled") return;
  fastModeOrgStatus = {
    status: "disabled",
    reason: "preference"
  }, ao("userSettings", {
    fastMode: undefined
  }), un(state => ({
    ...state,
    penguinModeOrgEnabled: false
  })), fastModeOrgEnabledEmitter.emit(false);
}
function describeOverageDisabledReason(reason) {
  switch (reason) {
    case "out_of_credits":
      return "Fast mode disabled \xB7 usage credits exhausted";
    case "org_level_disabled":
    case "org_service_level_disabled":
      return "Fast mode disabled \xB7 usage credits turned off by your organization";
    case "org_level_disabled_until":
    case "org_spend_cap_reached":
      return "Fast mode disabled \xB7 usage credit limit reached";
    case "member_level_disabled":
      return "Fast mode disabled \xB7 usage credits turned off for your account";
    case "seat_tier_level_disabled":
    case "seat_tier_zero_credit_limit":
    case "member_zero_credit_limit":
      return "Fast mode disabled \xB7 usage credits not available for your plan";
    case "overage_not_provisioned":
    case "no_limits_configured":
      return "Fast mode requires usage credits \xB7 /usage-credits to turn them on";
    default:
      return "Fast mode disabled \xB7 usage credits not available";
  }
}
function isOverageLimitReason(reason) {
  return reason === "org_level_disabled_until" || reason === "org_spend_cap_reached" || reason === "out_of_credits";
}
function handleFastModeOverageRejection(reason) {
  let message = describeOverageDisabledReason(reason);
  if (v(`Fast mode overage rejection: ${reason ?? "unknown"} \u2014 ${message}`), j("tengu_fast_mode_overage_rejected", {
    overage_disabled_reason: reason ?? "unknown"
  }), !isOverageLimitReason(reason)) ao("userSettings", {
    fastMode: undefined
  }), un(state => ({
    ...state,
    penguinModeOrgEnabled: false
  }));
  fastModeOverageRejectedEmitter.emit(message);
}
function isFastModeInCooldown() {
  return getFastModeCooldownState().status === "cooldown";
}
function getFastModeStatus(model, enabled) {
  let isOn = isFastModeEligible() && isFastModeReady() && !!enabled && q$(model);
  if (isOn && isFastModeInCooldown()) return "cooldown";
  if (isOn) return "on";
  return "off";
}
async function fetchOrgFastModeStatus(auth) {
  let url = `${Is().BASE_API_URL}/api/claude_code_penguin_mode`,
    headers = "accessToken" in auth ? {
      Authorization: `Bearer ${auth.accessToken}`,
      "anthropic-beta": SH
    } : {
      "x-api-key": auth.apiKey
    };
  return (await ho.get(url, {
    headers: headers
  })).data;
}
function initOrgFastModeStatusFromCache() {
  if (!isFastModeEligible()) return;
  if (fastModeOrgStatus.status !== "pending") return;
  if (shouldSkipFastModeOrgCheck()) {
    fastModeOrgStatus = {
      status: "enabled"
    };
    return;
  }
  let placeholder = false,
    cachedOrgEnabled = vt().penguinModeOrgEnabled === true;
  fastModeOrgStatus = placeholder || cachedOrgEnabled ? {
    status: "enabled"
  } : {
    status: "disabled",
    reason: "unknown"
  };
}
async function prefetchOrgFastModeStatus() {
  if (initOrgFastModeStatusFromCache(), ta()) return;
  if (!isFastModeEligible()) return;
  if (shouldSkipFastModeOrgCheck()) {
    fastModeOrgStatus = {
      status: "enabled"
    };
    return;
  }
  if (inFlightOrgStatusPrefetch) return v("Fast mode prefetch in progress, returning in-flight promise"), inFlightOrgStatusPrefetch;
  let apiKey = DR();
  if (!(di()?.accessToken && PR()) && !apiKey) {
    fastModeOrgStatus = vt().penguinModeOrgEnabled === true ? {
      status: "enabled"
    } : {
      status: "disabled",
      reason: "preference"
    };
    return;
  }
  let now = Date.now();
  if (now - lastOrgStatusFetchAt < ORG_STATUS_FETCH_THROTTLE_MS) {
    v("Skipping fast mode prefetch, fetched recently");
    return;
  }
  lastOrgStatusFetchAt = now;
  let requestStatus = async () => {
    let oauth = di(),
      auth = oauth?.accessToken && PR() ? {
        accessToken: oauth.accessToken
      } : apiKey ? {
        apiKey: apiKey
      } : null;
    if (!auth) throw Error("No auth available");
    return fetchOrgFastModeStatus(auth);
  };
  async function runPrefetch() {
    try {
      let response;
      try {
        response = await requestStatus();
      } catch (error) {
        if (ho.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403 && typeof error.response?.data === "string" && error.response.data.includes("OAuth token has been revoked"))) {
          let accessToken = di()?.accessToken;
          if (accessToken) await IB(accessToken), response = await requestStatus();else throw error;
        } else throw error;
      }
      let wasEnabled = fastModeOrgStatus.status !== "pending" ? fastModeOrgStatus.status === "enabled" : vt().penguinModeOrgEnabled;
      if (fastModeOrgStatus = response.enabled ? {
        status: "enabled"
      } : {
        status: "disabled",
        reason: response.disabled_reason ?? "preference"
      }, wasEnabled !== response.enabled) {
        if (!response.enabled) ao("userSettings", {
          fastMode: undefined
        });
        un(state => ({
          ...state,
          penguinModeOrgEnabled: response.enabled
        })), fastModeOrgEnabledEmitter.emit(response.enabled);
      }
      v(`Org fast mode: ${response.enabled ? "enabled" : `disabled (${response.disabled_reason ?? "preference"})`}`);
    } catch (error) {
      fastModeOrgStatus = vt().penguinModeOrgEnabled === true ? {
        status: "enabled"
      } : {
        status: "disabled",
        reason: "network_error"
      }, v(`Failed to fetch org fast mode status, defaulting to ${fastModeOrgStatus.status === "enabled" ? "enabled (cached)" : "disabled (network_error)"}: ${error}`, {
        level: "error"
      }), j("tengu_org_penguin_mode_fetch_failed", {});
    } finally {
      inFlightOrgStatusPrefetch = null;
    }
  }
  return inFlightOrgStatusPrefetch = runPrefetch(), inFlightOrgStatusPrefetch;
}
var fastModeCooldownState,
  fastModeReenabledAfterCooldown = false,
  fastModeCooldownTriggeredEmitter,
  fastModeCooldownExpiredEmitter,
  fastModeCooldownTriggeredSubscribe,
  fastModeCooldownExpiredSubscribe,
  fastModeOverageRejectedEmitter,
  fastModeOverageRejectedSubscribe,
  fastModeOrgStatus,
  fastModeOrgEnabledEmitter,
  fastModeOrgEnabledSubscribe,
  ORG_STATUS_FETCH_THROTTLE_MS = 30000,
  lastOrgStatusFetchAt = 0,
  inFlightOrgStatusPrefetch = null;
var qP = b(() => {
  cm();
  Hc();
  Yn();
  ct();
  Sd();
  Ct();
  mo();
  nr();
  je();
  an();
  Fo();
  si();
  hp();
  Er();
  Ig();
  fastModeCooldownState = {
    status: "active"
  }, fastModeCooldownTriggeredEmitter = ca(), fastModeCooldownExpiredEmitter = ca(), fastModeCooldownTriggeredSubscribe = fastModeCooldownTriggeredEmitter.subscribe, fastModeCooldownExpiredSubscribe = fastModeCooldownExpiredEmitter.subscribe;
  fastModeOverageRejectedEmitter = ca(), fastModeOverageRejectedSubscribe = fastModeOverageRejectedEmitter.subscribe;
  fastModeOrgStatus = {
    status: "pending"
  }, fastModeOrgEnabledEmitter = ca(), fastModeOrgEnabledSubscribe = fastModeOrgEnabledEmitter.subscribe;
});

export {isFastModeEligible as uc,shouldSkipFastModeOrgCheck as xun,isFastModeReady as dk,describeOrgDisabledReason as UPu,getFastModeUnavailableReason as Woe,getFastModeModelDisplayName as l4,getFastModeModelId as eNe,shouldUseFastModeForModel as wRr,q$ as vA,getOpus46SunsetDate as p$s,getFastModeCooldownState as RRr,triggerFastModeCooldown as g$s,clearFastModeCooldown as zEe,disableFastModeByPreference as _$s,describeOverageDisabledReason as $Pu,isOverageLimitReason as xRr,handleFastModeOverageRejection as S$s,isFastModeInCooldown as Goe,getFastModeStatus as FB,fetchOrgFastModeStatus as qPu,initOrgFastModeStatusFromCache as HRr,prefetchOrgFastModeStatus as gYe,fastModeCooldownState as hYe,fastModeReenabledAfterCooldown as vRr,fastModeCooldownTriggeredEmitter as m$s,fastModeCooldownExpiredEmitter as f$s,fastModeCooldownTriggeredSubscribe as A$s,fastModeCooldownExpiredSubscribe as h$s,fastModeOverageRejectedEmitter as y$s,fastModeOverageRejectedSubscribe as T$s,fastModeOrgStatus as _1,fastModeOrgEnabledEmitter as kRr,fastModeOrgEnabledSubscribe as b$s,ORG_STATUS_FETCH_THROTTLE_MS as jPu,lastOrgStatusFetchAt as d$s,inFlightOrgStatusPrefetch as nwt,qP as tE};
