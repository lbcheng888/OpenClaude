// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {isFirstPartyProvider,li} from "./1282_usesFirstPartyModelIds.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,checkGate_CACHED_OR_BLOCKING,isGrowthBookEnabled,hasFreshGrowthBookFeatures,refreshGrowthBookAfterAuthChange,getAllGrowthBookFeatures,getDynamicConfig_CACHED_MAY_BE_STALE,zn} from "./2198_stopPeriodicGrowthBookRefresh.ts";
import {hH,Kx} from "../../vendor/m128.ts";
import {twt,KEe} from "../../vendor/m1446.ts";
import {Gen,Ap} from "../config/0614_Ap.ts";
import {je} from "../../vendor/m577.ts";
import {isDebugMode,qe} from "../config/0234_setHasFormattedOutput.ts";
import {getClaudeAIOAuthTokens,getConfiguredApiKeyHelper,getAnthropicApiKeyWithSource,getAuthTokenSource,describeHowToDisableAuthTokenSource,isClaudeAISubscriber,hasProfileScope,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {st} from "../../vendor/m5.ts";
import {dp,sn} from "../config/0047_namespace.ts";
import {getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {CLAUDE_AI_INFERENCE_SCOPE,Dc} from "./0459_getOauthConfig.ts";
import {wK,isPolicyAllowed,getPolicyDefault,rd} from "../../vendor/m2205.ts";
import {zF,dNt} from "../telemetry/5192_waitForPolicyLimitsToLoad.ts";
import {withTimeout} from "../telemetry/1483_withTimeout.ts";
import {getIsRemoteMode,lt} from "../session/0131_sent.ts";
import {tZ} from "../../vendor/m2206.ts";
import {Lr} from "../../vendor/m578.ts";
var Nzn = {};
isFullscreenWithTTY(Nzn, {
  isRunningInRemoteEnvironment: () => isRunningInRemoteEnvironment,
  isRemoteControlInternalEventsEnabled: () => isRemoteControlInternalEventsEnabled,
  isRemoteControlHardDisabled: () => isRemoteControlHardDisabled,
  isPreviewHmrEnabled: () => isPreviewHmrEnabled,
  isPersistentRemoteSessionEnabled: () => isPersistentRemoteSessionEnabled,
  isCseShimEnabled: () => isCseShimEnabled,
  isCcrV2SendEventsEnabled: () => isCcrV2SendEventsEnabled,
  isCcrMirrorEnabled: () => isCcrMirrorEnabled,
  isBridgeEnabledBlocking: () => isBridgeEnabledBlocking,
  isBridgeEnabled: () => isBridgeEnabled,
  hasBridgeEntitlement: () => hasBridgeEntitlement,
  getCcrAutoConnectDefault: () => getCcrAutoConnectDefault,
  getBridgeGrowthBookDebugLines: () => getBridgeGrowthBookDebugLines,
  getBridgeEntitlementBlocker: () => getBridgeEntitlementBlocker,
  getBridgeDoctorInfo: () => getBridgeDoctorInfo,
  getBridgeDisabledReason: () => getBridgeDisabledReason,
  getBridgeAuthDebugInfo: () => getBridgeAuthDebugInfo,
  describeAuthPrecedenceBlocker: () => describeAuthPrecedenceBlocker,
  checkBridgeMinVersion: () => checkBridgeMinVersion,
  applyRemoteControlToAppState: () => applyRemoteControlToAppState,
  applyAutoUploadSessionsToAppState: () => applyAutoUploadSessionsToAppState,
  _resetDiagnosticPolicyKickForTesting: () => _resetDiagnosticPolicyKickForTesting
});
function hasBridgeEntitlement() {
  return isFirstPartyProvider() && mAt() && getFeatureValue_CACHED_MAY_BE_STALE("tengu_ccr_bridge", !1);
}
function getBridgeEntitlementBlocker() {
  if (hasBridgeEntitlement()) return null;
  if (!Lzn()) return "not_signed_in";
  if (!mAt()) return "api_key_auth";
  if (!Mzn()) return "no_profile_scope";
  return "not_in_rollout";
}
// Always returns false — bridge forced-off override hook (currently disabled)
function Ozn() {
  return !1;
}
function isRemoteControlHardDisabled() {
  return hH()?.settings.disableRemoteControl === !0;
}
function isBridgeEnabled() {
  if (Ozn()) return !0;
  if (isRemoteControlHardDisabled()) return !1;
  return !isRunningInRemoteEnvironment() && hasBridgeEntitlement();
}
async function isBridgeEnabledBlocking() {
  if (Ozn()) return !0;
  if (isRemoteControlHardDisabled()) return !1;
  return isFirstPartyProvider() && !isRunningInRemoteEnvironment() && mAt() && (await checkGate_CACHED_OR_BLOCKING("tengu_ccr_bridge"));
}
async function getBridgeDisabledReason() {
  if (Ozn()) return null;
  if (!isFirstPartyProvider()) return "Remote Control is only available when using Claude via api.anthropic.com.";
  if (isRunningInRemoteEnvironment()) return "Remote Control is not available inside a cloud session.";
  if (isRemoteControlHardDisabled()) return "Remote Control is disabled by your organization's policy (managed setting `disableRemoteControl`).";
  if (!Lzn()) return "Remote Control requires a claude.ai subscription. Run `claude auth login` to sign in with your claude.ai account.";
  if (!mAt()) return describeAuthPrecedenceBlocker({
    prefix: "Remote Control requires claude.ai subscription auth.",
    suffix: "to use Remote Control."
  });
  if (!Mzn()) return "Remote Control requires a full-scope login token. Long-lived tokens (from `claude setup-token` or CLAUDE_CODE_OAUTH_TOKEN) are limited to inference-only for security reasons. Run `claude auth login` to use Remote Control.";
  if (!c0o()?.organizationUuid) return "Unable to determine your organization for Remote Control eligibility. Run `claude auth login` to refresh your account information.";
  await IFl();
  let policyStatus = DFl();
  if (policyStatus === "unavailable") return "Couldn't verify your organization's Remote Control policy. Retry, or run `claude doctor` for details.";
  if (policyStatus === "denied") {
    let compliancePolicies = twt();
    if (compliancePolicies.length > 0) return `Remote Control isn't available for your organization due to its compliance policy (${compliancePolicies.join(", ")}).`;
    return "Remote Control is disabled by your organization's policy. Contact your organization admin for access.";
  }
  if (!isGrowthBookEnabled()) {
    let disablingEnvVar = Gen();
    if (disablingEnvVar) return `Remote Control requires feature-flag evaluation, which is disabled because ${disablingEnvVar} is set. Unset it (or run in a shell without it) to use Remote Control.`;
    if (je.DISABLE_GROWTHBOOK) return "Remote Control requires feature-flag evaluation, which is disabled because DISABLE_GROWTHBOOK is set. Unset it (or run in a shell without it) to use Remote Control.";
    return "Remote Control requires feature-flag evaluation, which is unavailable in this environment.";
  }
  if (!(await checkGate_CACHED_OR_BLOCKING("tengu_ccr_bridge"))) {
    if (!hasFreshGrowthBookFeatures()) {
      if (refreshGrowthBookAfterAuthChange(), await checkGate_CACHED_OR_BLOCKING("tengu_ccr_bridge")) return null;
      if (!hasFreshGrowthBookFeatures()) return "Couldn't verify Remote Control eligibility — the feature-flag service was unreachable (offline or blocked). Retry, or run with `--debug` / `claude doctor` for details.";
    }
    return "Remote Control is not yet enabled for your account. If you recently changed plans, run `claude auth logout` then `claude auth login` to refresh your entitlements, or `claude doctor` for details.";
  }
  return null;
}
function getBridgeAuthDebugInfo() {
  if (!isDebugMode()) return "";
  let formatBoolAsSetUnset = (value: any) => value ? "set" : "unset";
  try {
    let oauthTokens = getClaudeAIOAuthTokens(),
      thirdPartyEnvVars = ["CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_USE_FOUNDRY", "CLAUDE_CODE_USE_ANTHROPIC_AWS", "CLAUDE_CODE_USE_MANTLE"].filter(envKey => st(process.env[envKey]));
    return ["", "[debug] Remote Control auth state:", `  isBareMode=${dp()}`, `  hasOAuthAccessToken=${!!oauthTokens?.accessToken}`, `  oauthScopes=${oauthTokens?.scopes?.join(",") ?? "none"}`, `  hasClaudeAIInferenceScope=${Lzn()}`, `  isClaudeAISubscriber=${mAt()}`, `  hasProfileScope=${Mzn()}`, `  oauthAccount.organizationUuid=${c0o()?.organizationUuid ? "set" : "unset"}`, `  ANTHROPIC_API_KEY=${formatBoolAsSetUnset(process.env.ANTHROPIC_API_KEY)}`, `  ANTHROPIC_AUTH_TOKEN=${formatBoolAsSetUnset(process.env.ANTHROPIC_AUTH_TOKEN)}`, `  apiKeyHelper=${getConfiguredApiKeyHelper() ? "set" : "unset"}`, `  CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR=${formatBoolAsSetUnset(process.env.CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR)}`, `  CLAUDE_CODE_OAUTH_TOKEN=${formatBoolAsSetUnset(process.env.CLAUDE_CODE_OAUTH_TOKEN)}`, `  ANTHROPIC_UNIX_SOCKET=${formatBoolAsSetUnset(process.env.ANTHROPIC_UNIX_SOCKET)}`, `  3P env=${thirdPartyEnvVars.length ? thirdPartyEnvVars.join(",") : "none"}`, ...getBridgeGrowthBookDebugLines()].join(`
`);
  } catch (err) {
    return `
[debug] failed to collect auth state: ${err}`;
  }
}
function getBridgeGrowthBookDebugLines() {
  let formatBoolAsSetUnset = (val: any) => val ? "set" : "unset",
    allFeatures = getAllGrowthBookFeatures(),
    lastFetchedAt = sEm();
  return [`  isGrowthBookEnabled=${isGrowthBookEnabled()}`, `  telemetryDisabledBy=${Gen() ?? "none"}`, `  DISABLE_GROWTHBOOK=${formatBoolAsSetUnset(process.env.DISABLE_GROWTHBOOK)}`, `  hasFreshGrowthBookFeatures=${hasFreshGrowthBookFeatures()}`, `  growthBookFeaturesLoaded=${Object.keys(allFeatures).length}`, `  growthBookLastFetched=${lastFetchedAt ? `${iEm(Date.now() - lastFetchedAt)} ago` : "never"}`, `  tengu_ccr_bridge=${String(allFeatures.tengu_ccr_bridge ?? "unset")}`];
}
async function getBridgeDoctorInfo() {
  if (isRunningInRemoteEnvironment() && !Ozn()) return {
    disabledReason: null,
    inRemoteSession: !0,
    checks: []
  };
  refreshGrowthBookAfterAuthChange(), await IFl();
  let disabledReason = await getBridgeDisabledReason(),
    growthBookDisablingVar = Gen() ?? (je.DISABLE_GROWTHBOOK ? "DISABLE_GROWTHBOOK" : null),
    isFirstParty = isFirstPartyProvider(),
    remoteControlNotHardDisabled = !isRemoteControlHardDisabled(),
    hasInferenceScope = Lzn(),
    isSubscriber = mAt(),
    hasProfile = Mzn(),
    hasOrgUuid = !!c0o()?.organizationUuid,
    orgPolicyStatus = DFl(),
    growthBookEnabled = isGrowthBookEnabled(),
    bridgeGateEnabled = await checkGate_CACHED_OR_BLOCKING("tengu_ccr_bridge"),
    hasFreshFeatures = hasFreshGrowthBookFeatures(),
    checks = [{
      label: isFirstParty ? "Connected to the Anthropic API (api.anthropic.com)" : "Not connected to the Anthropic API (api.anthropic.com)",
      ok: isFirstParty
    }, {
      label: remoteControlNotHardDisabled ? "Not disabled by org policy (disableRemoteControl)" : "Disabled by org policy (disableRemoteControl)",
      ok: remoteControlNotHardDisabled
    }, {
      label: hasInferenceScope ? "Signed in to claude.ai" : "Not signed in to claude.ai",
      ok: hasInferenceScope
    }, {
      label: isSubscriber ? "claude.ai subscription active" : "claude.ai subscription auth not active",
      ok: isSubscriber
    }, {
      label: hasProfile ? "Sign-in includes the user:profile scope" : "Sign-in is missing the user:profile scope",
      ok: hasProfile
    }, {
      label: hasOrgUuid ? "Organization resolved" : "Organization not resolved",
      ok: hasOrgUuid
    }, {
      label: orgPolicyStatus === "allowed" ? "Org policy allows Remote Control (allow_remote_control)" : orgPolicyStatus === "unavailable" ? "Org policy could not be verified (allow_remote_control)" : "Org policy does not allow Remote Control (allow_remote_control)",
      ok: orgPolicyStatus === "allowed",
      detail: twt().join(", ") || void 0
    }, {
      label: growthBookEnabled ? "Feature-flag evaluation enabled" : "Feature-flag evaluation disabled",
      ok: growthBookEnabled,
      detail: growthBookDisablingVar ? `disabled by ${growthBookDisablingVar}` : void 0
    }, {
      label: bridgeGateEnabled ? "Remote Control rollout enabled for this account" : hasFreshFeatures ? "Remote Control rollout not enabled for this account" : "Remote Control rollout could not be verified for this account",
      ok: bridgeGateEnabled,
      detail: hasFreshFeatures ? void 0 : "no server response this session"
    }];
  return {
    disabledReason: disabledReason,
    inRemoteSession: !1,
    checks: checks
  };
}
// Returns the timestamp (ms) when GrowthBook features were last cached, or undefined
function sEm() {
  try {
    return getGlobalConfig().cachedGrowthBookFeaturesAt;
  } catch {
    return;
  }
}
// Formats a millisecond duration into a human-readable string (e.g. "42s", "5m", "3h", "2d")
function iEm(elapsedMs: number) {
  let totalSeconds = Math.round(elapsedMs / 1000);
  if (totalSeconds < 120) return `${totalSeconds}s`;
  let totalMinutes = Math.round(totalSeconds / 60);
  if (totalMinutes < 120) return `${totalMinutes}m`;
  let totalHours = Math.round(totalMinutes / 60);
  if (totalHours < 48) return `${totalHours}h`;
  return `${Math.round(totalHours / 24)}d`;
}
function describeAuthPrecedenceBlocker({
  prefix: prefix,
  suffix: suffix
}) {
  try {
    let {
      source: apiKeySource
    } = getAnthropicApiKeyWithSource({
      skipRetrievingKeyFromApiKeyHelper: !0
    });
    if (apiKeySource === "ANTHROPIC_API_KEY") return `${prefix} ANTHROPIC_API_KEY is set, so this session is using API-key auth — unset it (or run in a shell without it) ${suffix}`;
    if (apiKeySource === "apiKeyHelper") return `${prefix} apiKeyHelper is configured, so this session is using API-key auth — unset it ${suffix}`;
    if (process.env.ANTHROPIC_AUTH_TOKEN) return `${prefix} ANTHROPIC_AUTH_TOKEN is set, so this session is using API-key auth — unset it (or run in a shell without it) ${suffix}`;
    let {
        source: tokenSource
      } = getAuthTokenSource(),
      disableInstructions = describeHowToDisableAuthTokenSource(tokenSource);
    if (tokenSource !== "none" && disableInstructions) return `${prefix} This session is using ${tokenSource} auth — ${disableInstructions}`;
    if (process.env.ANTHROPIC_UNIX_SOCKET) return `${prefix} ANTHROPIC_UNIX_SOCKET is set (claude ssh remote), and the local proxy is API-key-authed.`;
  } catch {}
  return `${prefix} Unset ANTHROPIC_API_KEY / apiKeyHelper / ANTHROPIC_AUTH_TOKEN ${suffix}`;
}
// Checks whether the current OAuth token includes the Claude AI inference scope
function Lzn() {
  try {
    return Boolean(getClaudeAIOAuthTokens()?.scopes?.includes(CLAUDE_AI_INFERENCE_SCOPE));
  } catch {
    return !1;
  }
}
// Returns true if the user is a Claude AI subscriber (wraps isClaudeAISubscriber with try/catch)
function mAt() {
  try {
    return isClaudeAISubscriber();
  } catch {
    return !1;
  }
}
// Returns true if the OAuth token includes the user:profile scope
function Mzn() {
  try {
    return hasProfileScope();
  } catch {
    return !1;
  }
}
// Returns the current OAuth account from global config, or undefined on error
function c0o() {
  try {
    return getGlobalConfig().oauthAccount;
  } catch {
    return;
  }
}
function _resetDiagnosticPolicyKickForTesting() {
  pAt = void 0;
}
// Ensures org policy limits are loaded; kicks off a load with timeout if not already in flight
async function IFl() {
  try {
    if (wK() !== null) return;
  } catch {}
  let policyModule = await Promise.resolve().then(() => (zF(), dNt));
  if (policyModule.initializePolicyLimitsLoadingPromise(), pAt === void 0) {
    let loadPromise = policyModule.loadPolicyLimits();
    loadPromise.catch(() => {}).finally(() => {
      try {
        if (wK() === null) pAt = void 0;
      } catch {
        pAt = void 0;
      }
    }), pAt = withTimeout(loadPromise, policyModule.POLICY_LIMITS_COLD_AWAIT_MS, "bridge_diagnostic_policy_limits").catch(() => {});
  }
  await pAt;
}
// Returns "allowed", "denied", or "unavailable" based on the org's allow_remote_control policy
function DFl() {
  try {
    return isPolicyAllowed("allow_remote_control") ? "allowed" : "denied";
  } catch {
    return "unavailable";
  }
}
// Returns the autoUploadSessions setting from managed settings or global config
function lEm() {
  try {
    return hH()?.settings.autoUploadSessions ?? getGlobalConfig().autoUploadSessions;
  } catch {
    return;
  }
}
function isRunningInRemoteEnvironment() {
  return st(process.env.CLAUDE_CODE_REMOTE) || getIsRemoteMode();
}
function isCseShimEnabled() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_bridge_repl_v2_cse_shim_enabled", !0);
}
function isCcrV2SendEventsEnabled() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_ccr_v2_send_events_cli", !1);
}
function checkBridgeMinVersion() {
  let minVersionConfig = getDynamicConfig_CACHED_MAY_BE_STALE("tengu_bridge_min_version", {
    minVersion: "0.0.0"
  });
  if (minVersionConfig.minVersion && tZ({
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION, minVersionConfig.minVersion)) return `Your version of Claude Code (${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION}) is too old for Remote Control.
Version ${minVersionConfig.minVersion} or higher is required. Run \`claude update\` to update.`;
  return null;
}
function getCcrAutoConnectDefault() {
  if (isRunningInRemoteEnvironment()) return !1;
  if (isPersistentRemoteSessionEnabled()) return !0;
  let policyDefault = getPolicyDefault("remote_control_at_startup");
  if (policyDefault !== void 0) return policyDefault;
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_cobalt_harbor", !1);
}
// Always returns false — persistent remote session feature is not yet active
function isPersistentRemoteSessionEnabled() {
  return !1;
}
function isRemoteControlInternalEventsEnabled() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_amber_relay", !1);
}
// Always returns false — CCR mirror mode is disabled
function isCcrMirrorEnabled() {
  return !1;
}
function isPreviewHmrEnabled() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_bridge_vivid", !1);
}
// Updates app state to reflect whether the bridge (Remote Control) is enabled/disabled
function applyRemoteControlToAppState(appState: any, bridgeEnabled: any) {
  if (appState.replBridgeOutboundOnly && !bridgeEnabled) return appState;
  if (appState.replBridgeEnabled === bridgeEnabled && !appState.replBridgeOutboundOnly) return appState;
  return {
    ...appState,
    replBridgeEnabled: bridgeEnabled,
    replBridgeOutboundOnly: !1
  };
}
// Updates app state for auto-upload sessions mode (outbound-only bridge)
function applyAutoUploadSessionsToAppState(appState: any, autoUpload: any) {
  if (appState.replBridgeEnabled && !appState.replBridgeOutboundOnly) return appState;
  if (appState.replBridgeEnabled === autoUpload && appState.replBridgeOutboundOnly === autoUpload) return appState;
  return {
    ...appState,
    replBridgeEnabled: autoUpload,
    replBridgeOutboundOnly: autoUpload
  };
}
// Pending promise for policy-limits loading (used to deduplicate concurrent loads)
var pAt: any;
var Vk = b(() => {
  lt();
  Dc();
  zn();
  KEe();
  rd();
  Ao();
  Qn();
  qe();
  Lr();
  sn();
  li();
  Ap();
  Kx();
});
export {Nzn,hasBridgeEntitlement,getBridgeEntitlementBlocker,Ozn,isRemoteControlHardDisabled,isBridgeEnabled,isBridgeEnabledBlocking,getBridgeDisabledReason,getBridgeAuthDebugInfo,getBridgeGrowthBookDebugLines,getBridgeDoctorInfo,sEm,iEm,describeAuthPrecedenceBlocker,Lzn,mAt,Mzn,c0o,_resetDiagnosticPolicyKickForTesting,IFl,DFl,lEm,isRunningInRemoteEnvironment,isCseShimEnabled,isCcrV2SendEventsEnabled,checkBridgeMinVersion,getCcrAutoConnectDefault,isPersistentRemoteSessionEnabled,isRemoteControlInternalEventsEnabled,isCcrMirrorEnabled,isPreviewHmrEnabled,applyRemoteControlToAppState,applyAutoUploadSessionsToAppState,pAt,Vk};
