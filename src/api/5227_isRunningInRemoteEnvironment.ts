// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {isFirstPartyProvider as Nl,Ps} from "./1287_usesFirstPartyModelIds.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,checkGate_CACHED_OR_BLOCKING as wF,isGrowthBookEnabled as V3,hasFreshGrowthBookFeatures as JRe,refreshGrowthBookAfterAuthChange as Kse,getAllGrowthBookFeatures as hbn,getDynamicConfig_CACHED_MAY_BE_STALE as Dk,jn} from "./2204_stopPeriodicGrowthBookRefresh.ts";
import {GH,lk} from "../../vendor/m125.ts";
import {wkt,IAe} from "../../vendor/m1451.ts";
import {vrn,$d} from "../config/0620_$d.ts";
import {Ne} from "../../vendor/m583.ts";
import {isDebugMode as QL,qe} from "../config/0236_setHasFormattedOutput.ts";
import {getClaudeAIOAuthTokens as qs,getConfiguredApiKeyHelper as mD,getAnthropicApiKeyWithSource as Yg,getAuthTokenSource as Ak,describeHowToDisableAuthTokenSource as UBe,isClaudeAISubscriber as Eo,Vv,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {nt} from "../../vendor/m127.ts";
import {Ed,dn} from "../config/0137_namespace.ts";
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {CLAUDE_AI_INFERENCE_SCOPE as JU,Sc} from "./0465_getOauthConfig.ts";
import {getResponseFromCache as X7,isPolicyAllowed as Xs,getPolicyDefault as v$r,Bu} from "../../vendor/m2213.ts";
import {_B,$Bt} from "../telemetry/5226_waitForPolicyLimitsToLoad.ts";
import {withTimeout as Oc} from "../telemetry/1488_withTimeout.ts";
import {getIsRemoteMode as la,lt} from "../session/0132_sent.ts";
import {QQ} from "../../vendor/m2214.ts";
import {Ir} from "../../vendor/m584.ts";
var MQn = {};
ft(MQn, {
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
  return Nl() && O_t() && it("tengu_ccr_bridge", !1);
}
function getBridgeEntitlementBlocker() {
  if (hasBridgeEntitlement()) return null;
  if (!OQn()) return "not_signed_in";
  if (!O_t()) return "api_key_auth";
  if (!LQn()) return "no_profile_scope";
  return "not_in_rollout";
}
// Always returns false — bridge forced-off override hook (currently disabled)
function PQn() {
  return !1;
}
function isRemoteControlHardDisabled() {
  return GH()?.settings.disableRemoteControl === !0;
}
function isBridgeEnabled() {
  if (PQn()) return !0;
  if (isRemoteControlHardDisabled()) return !1;
  return !isRunningInRemoteEnvironment() && hasBridgeEntitlement();
}
async function isBridgeEnabledBlocking() {
  if (PQn()) return !0;
  if (isRemoteControlHardDisabled()) return !1;
  return Nl() && !isRunningInRemoteEnvironment() && O_t() && (await wF("tengu_ccr_bridge"));
}
async function getBridgeDisabledReason() {
  if (PQn()) return null;
  if (!Nl()) return "Remote Control is only available when using Claude via api.anthropic.com.";
  if (isRunningInRemoteEnvironment()) return "Remote Control is not available inside a cloud session.";
  if (isRemoteControlHardDisabled()) return "Remote Control is disabled by your organization's policy (managed setting `disableRemoteControl`).";
  if (!OQn()) return "Remote Control requires a claude.ai subscription. Run `claude auth login` to sign in with your claude.ai account.";
  if (!O_t()) return describeAuthPrecedenceBlocker({
    prefix: "Remote Control requires claude.ai subscription auth.",
    suffix: "to use Remote Control."
  });
  if (!LQn()) return "Remote Control requires a full-scope login token. Long-lived tokens (from `claude setup-token` or CLAUDE_CODE_OAUTH_TOKEN) are limited to inference-only for security reasons. Run `claude auth login` to use Remote Control.";
  if (!wMo()?.organizationUuid) return "Unable to determine your organization for Remote Control eligibility. Run `claude auth login` to refresh your account information.";
  await S5l();
  let policyStatus = b5l();
  if (policyStatus === "unavailable") return "Couldn't verify your organization's Remote Control policy. Retry, or run `claude doctor` for details.";
  if (policyStatus === "denied") {
    let compliancePolicies = wkt();
    if (compliancePolicies.length > 0) return `Remote Control isn't available for your organization due to its compliance policy (${compliancePolicies.join(", ")}).`;
    return "Remote Control is disabled by your organization's policy. Contact your organization admin for access.";
  }
  if (!V3()) {
    let disablingEnvVar = vrn();
    if (disablingEnvVar) return `Remote Control requires feature-flag evaluation, which is disabled because ${disablingEnvVar} is set. Unset it (or run in a shell without it) to use Remote Control.`;
    if (Ne.DISABLE_GROWTHBOOK) return "Remote Control requires feature-flag evaluation, which is disabled because DISABLE_GROWTHBOOK is set. Unset it (or run in a shell without it) to use Remote Control.";
    return "Remote Control requires feature-flag evaluation, which is unavailable in this environment.";
  }
  if (!(await wF("tengu_ccr_bridge"))) {
    if (!JRe()) {
      if (Kse(), await wF("tengu_ccr_bridge")) return null;
      if (!JRe()) return "Couldn't verify Remote Control eligibility — the feature-flag service was unreachable (offline or blocked). Retry, or run with `--debug` / `claude doctor` for details.";
    }
    return "Remote Control is not yet enabled for your account. If you recently changed plans, run `claude auth logout` then `claude auth login` to refresh your entitlements, or `claude doctor` for details.";
  }
  return null;
}
function getBridgeAuthDebugInfo() {
  if (!QL()) return "";
  let formatBoolAsSetUnset = (value: any) => value ? "set" : "unset";
  try {
    let oauthTokens = qs(),
      thirdPartyEnvVars = ["CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_USE_FOUNDRY", "CLAUDE_CODE_USE_ANTHROPIC_AWS", "CLAUDE_CODE_USE_MANTLE"].filter(envKey => nt(process.env[envKey]));
    return ["", "[debug] Remote Control auth state:", `  isBareMode=${Ed()}`, `  hasOAuthAccessToken=${!!oauthTokens?.accessToken}`, `  oauthScopes=${oauthTokens?.scopes?.join(",") ?? "none"}`, `  hasClaudeAIInferenceScope=${OQn()}`, `  isClaudeAISubscriber=${O_t()}`, `  hasProfileScope=${LQn()}`, `  oauthAccount.organizationUuid=${wMo()?.organizationUuid ? "set" : "unset"}`, `  ANTHROPIC_API_KEY=${formatBoolAsSetUnset(process.env.ANTHROPIC_API_KEY)}`, `  ANTHROPIC_AUTH_TOKEN=${formatBoolAsSetUnset(process.env.ANTHROPIC_AUTH_TOKEN)}`, `  apiKeyHelper=${mD() ? "set" : "unset"}`, `  CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR=${formatBoolAsSetUnset(process.env.CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR)}`, `  CLAUDE_CODE_OAUTH_TOKEN=${formatBoolAsSetUnset(process.env.CLAUDE_CODE_OAUTH_TOKEN)}`, `  ANTHROPIC_UNIX_SOCKET=${formatBoolAsSetUnset(process.env.ANTHROPIC_UNIX_SOCKET)}`, `  3P env=${thirdPartyEnvVars.length ? thirdPartyEnvVars.join(",") : "none"}`, ...getBridgeGrowthBookDebugLines()].join(`
`);
  } catch (err) {
    return `
[debug] failed to collect auth state: ${err}`;
  }
}
function getBridgeGrowthBookDebugLines() {
  let formatBoolAsSetUnset = (val: any) => val ? "set" : "unset",
    allFeatures = hbn(),
    lastFetchedAt = Rxm();
  return [`  isGrowthBookEnabled=${V3()}`, `  telemetryDisabledBy=${vrn() ?? "none"}`, `  DISABLE_GROWTHBOOK=${formatBoolAsSetUnset(process.env.DISABLE_GROWTHBOOK)}`, `  hasFreshGrowthBookFeatures=${JRe()}`, `  growthBookFeaturesLoaded=${Object.keys(allFeatures).length}`, `  growthBookLastFetched=${lastFetchedAt ? `${vxm(Date.now() - lastFetchedAt)} ago` : "never"}`, `  tengu_ccr_bridge=${String(allFeatures.tengu_ccr_bridge ?? "unset")}`];
}
async function getBridgeDoctorInfo() {
  if (isRunningInRemoteEnvironment() && !PQn()) return {
    disabledReason: null,
    inRemoteSession: !0,
    checks: []
  };
  Kse(), await S5l();
  let disabledReason = await getBridgeDisabledReason(),
    growthBookDisablingVar = vrn() ?? (Ne.DISABLE_GROWTHBOOK ? "DISABLE_GROWTHBOOK" : null),
    isFirstParty = Nl(),
    remoteControlNotHardDisabled = !isRemoteControlHardDisabled(),
    hasInferenceScope = OQn(),
    isSubscriber = O_t(),
    hasProfile = LQn(),
    hasOrgUuid = !!wMo()?.organizationUuid,
    orgPolicyStatus = b5l(),
    growthBookEnabled = V3(),
    bridgeGateEnabled = await wF("tengu_ccr_bridge"),
    hasFreshFeatures = JRe(),
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
      detail: wkt().join(", ") || void 0
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
function Rxm() {
  try {
    return Ot().cachedGrowthBookFeaturesAt;
  } catch {
    return;
  }
}
// Formats a millisecond duration into a human-readable string (e.g. "42s", "5m", "3h", "2d")
function vxm(elapsedMs: number) {
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
    } = Yg({
      skipRetrievingKeyFromApiKeyHelper: !0
    });
    if (apiKeySource === "ANTHROPIC_API_KEY") return `${prefix} ANTHROPIC_API_KEY is set, so this session is using API-key auth — unset it (or run in a shell without it) ${suffix}`;
    if (apiKeySource === "apiKeyHelper") return `${prefix} apiKeyHelper is configured, so this session is using API-key auth — unset it ${suffix}`;
    if (process.env.ANTHROPIC_AUTH_TOKEN) return `${prefix} ANTHROPIC_AUTH_TOKEN is set, so this session is using API-key auth — unset it (or run in a shell without it) ${suffix}`;
    let {
        source: tokenSource
      } = Ak(),
      disableInstructions = UBe(tokenSource);
    if (tokenSource !== "none" && disableInstructions) return `${prefix} This session is using ${tokenSource} auth — ${disableInstructions}`;
    if (process.env.ANTHROPIC_UNIX_SOCKET) return `${prefix} ANTHROPIC_UNIX_SOCKET is set (claude ssh remote), and the local proxy is API-key-authed.`;
  } catch {}
  return `${prefix} Unset ANTHROPIC_API_KEY / apiKeyHelper / ANTHROPIC_AUTH_TOKEN ${suffix}`;
}
// Checks whether the current OAuth token includes the Claude AI inference scope
function OQn() {
  try {
    return Boolean(qs()?.scopes?.includes(JU));
  } catch {
    return !1;
  }
}
// Returns true if the user is a Claude AI subscriber (wraps the subscriber check with try/catch)
function O_t() {
  try {
    return Eo();
  } catch {
    return !1;
  }
}
// Returns true if the OAuth token includes the user:profile scope
function LQn() {
  try {
    return Vv();
  } catch {
    return !1;
  }
}
// Returns the current OAuth account from global config, or undefined on error
function wMo() {
  try {
    return Ot().oauthAccount;
  } catch {
    return;
  }
}
function _resetDiagnosticPolicyKickForTesting() {
  P_t = void 0;
}
// Ensures org policy limits are loaded; kicks off a load with timeout if not already in flight
async function S5l() {
  try {
    if (X7() !== null) return;
  } catch {}
  let policyModule = await Promise.resolve().then(() => (_B(), $Bt));
  if (policyModule.initializePolicyLimitsLoadingPromise(), P_t === void 0) {
    let loadPromise = policyModule.loadPolicyLimits();
    loadPromise.catch(() => {}).finally(() => {
      try {
        if (X7() === null) P_t = void 0;
      } catch {
        P_t = void 0;
      }
    }), P_t = Oc(loadPromise, policyModule.POLICY_LIMITS_COLD_AWAIT_MS, "bridge_diagnostic_policy_limits").catch(() => {});
  }
  await P_t;
}
// Returns "allowed", "denied", or "unavailable" based on the org's allow_remote_control policy
function b5l() {
  try {
    return Xs("allow_remote_control") ? "allowed" : "denied";
  } catch {
    return "unavailable";
  }
}
// Returns the autoUploadSessions setting from managed settings or global config
function kxm() {
  try {
    return GH()?.settings.autoUploadSessions ?? Ot().autoUploadSessions;
  } catch {
    return;
  }
}
function isRunningInRemoteEnvironment() {
  return nt(process.env.CLAUDE_CODE_REMOTE) || la();
}
function isCseShimEnabled() {
  return it("tengu_bridge_repl_v2_cse_shim_enabled", !0);
}
function isCcrV2SendEventsEnabled() {
  return it("tengu_ccr_v2_send_events_cli", !1);
}
function checkBridgeMinVersion() {
  let minVersionConfig = Dk("tengu_bridge_min_version", {
    minVersion: "0.0.0"
  });
  if (minVersionConfig.minVersion && QQ({
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION, minVersionConfig.minVersion)) return `Your version of Claude Code (${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION}) is too old for Remote Control.
Version ${minVersionConfig.minVersion} or higher is required. Run \`claude update\` to update.`;
  return null;
}
function getCcrAutoConnectDefault() {
  if (isRunningInRemoteEnvironment()) return !1;
  if (isPersistentRemoteSessionEnabled()) return !0;
  let policyDefault = v$r("remote_control_at_startup");
  if (policyDefault !== void 0) return policyDefault;
  return it("tengu_cobalt_harbor", !1);
}
// Always returns false — persistent remote session feature is not yet active
function isPersistentRemoteSessionEnabled() {
  return !1;
}
function isRemoteControlInternalEventsEnabled() {
  return it("tengu_amber_relay", !1);
}
// Always returns false — CCR mirror mode is disabled
function isCcrMirrorEnabled() {
  return !1;
}
function isPreviewHmrEnabled() {
  return it("tengu_bridge_vivid", !1);
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
var P_t: any;
var pH = b(() => {
  lt();
  Sc();
  jn();
  IAe();
  Bu();
  lo();
  tr();
  qe();
  Ir();
  dn();
  Ps();
  $d();
  lk();
});

export {MQn,hasBridgeEntitlement,getBridgeEntitlementBlocker,PQn,isRemoteControlHardDisabled,isBridgeEnabled,isBridgeEnabledBlocking,getBridgeDisabledReason,getBridgeAuthDebugInfo,getBridgeGrowthBookDebugLines,getBridgeDoctorInfo,Rxm,vxm,describeAuthPrecedenceBlocker,OQn,O_t,LQn,wMo,_resetDiagnosticPolicyKickForTesting,S5l,b5l,kxm,isRunningInRemoteEnvironment,isCseShimEnabled,isCcrV2SendEventsEnabled,checkBridgeMinVersion,getCcrAutoConnectDefault,isPersistentRemoteSessionEnabled,isRemoteControlInternalEventsEnabled,isCcrMirrorEnabled,isPreviewHmrEnabled,applyRemoteControlToAppState,applyAutoUploadSessionsToAppState,P_t,pH};
