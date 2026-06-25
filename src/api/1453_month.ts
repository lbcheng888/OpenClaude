// @ts-nocheck
import {getAPIProvider as Hr,Ps as si} from "./1287_usesFirstPartyModelIds.ts";
import {nt as rt,Ni as ca} from "../../vendor/m127.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "./2204_stopPeriodicGrowthBookRefresh.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Oa as Cl} from "../../vendor/m1456.ts";
import {getMainLoopModel as Ns,isOpus1mMergeEnabled as tC,getDefaultMainLoopModelSetting as lk,parseUserSpecifiedModel as gs,getCanonicalName as qo,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Ub,Wu as Sd} from "../../vendor/m438.ts";
import {getSettingsForSource as Cn,getInitialSettings as Kr,ao,br as Er} from "../config/0745_updateSettingsForSource.ts";
import {getIsNonInteractiveSession as kr,preferThirdPartyAuthentication as CWe,lt as ct} from "../session/0132_sent.ts";
import {getClaudeAIOAuthTokens as di,getAnthropicApiKey as DR,Vv as PR,handleOAuth401Error as IB,lo as mo} from "../config/2036_withOAuthRefreshLock.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {saveGlobalConfig as un,getGlobalConfig as vt,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getOauthConfig as Is,OAUTH_BETA_HEADER as SH,Sc as Hc} from "./0465_getOauthConfig.ts";
import {ho} from "../../vendor/m572.ts";
import {Vi as ta,$d as hp} from "../config/0620_$d.ts";
import {b} from "../../runtime.ts";
import {ap as cm} from "../../vendor/m573.ts";
import {dn as an} from "../config/0137_namespace.ts";
import {ig as Ig} from "../../vendor/m130.ts";
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
export {isFastModeEligible as $l,shouldSkipFastModeOrgCheck as pmn,isFastModeReady as vk,describeOrgDisabledReason as r9u,getFastModeUnavailableReason as Goe,getFastModeModelDisplayName as v3,getFastModeModelId as jNe,shouldUseFastModeForModel as txr,q$ as Hf,getOpus46SunsetDate as a5s,getFastModeCooldownState as nxr,triggerFastModeCooldown as p5s,clearFastModeCooldown as xAe,disableFastModeByPreference as m5s,describeOverageDisabledReason as o9u,isOverageLimitReason as Hkt,handleFastModeOverageRejection as g5s,isFastModeInCooldown as Voe,getFastModeStatus as lF,fetchOrgFastModeStatus as s9u,initOrgFastModeStatusFromCache as oxr,prefetchOrgFastModeStatus as fXe,fastModeCooldownState as mXe,fastModeReenabledAfterCooldown as exr,fastModeCooldownTriggeredEmitter as l5s,fastModeCooldownExpiredEmitter as c5s,fastModeCooldownTriggeredSubscribe as u5s,fastModeCooldownExpiredSubscribe as d5s,fastModeOverageRejectedEmitter as f5s,fastModeOverageRejectedSubscribe as h5s,fastModeOrgStatus as DM,fastModeOrgEnabledEmitter as rxr,fastModeOrgEnabledSubscribe as _5s,ORG_STATUS_FETCH_THROTTLE_MS as i9u,lastOrgStatusFetchAt as i5s,inFlightOrgStatusPrefetch as kkt,qP as WS};
