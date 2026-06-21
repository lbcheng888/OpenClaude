// @ts-nocheck
import {isFullscreenWithTTY,M,b} from "../../runtime.ts";
import {st,fromEnum,fromEnumOpt,Qe} from "../../vendor/m5.ts";
import {aoe,xH} from "./0580_xH.ts";
import {isWIFActive,getWIFPrecedenceSource,getWIFAuthType,Zze} from "../../vendor/m1288.ts";
import {dp,YC,Bl,sn} from "./0047_namespace.ts";
import {x8,kvt,Acn} from "./1291_recursive.ts";
import {Y2,isOAuthTokenExpired,refreshOAuthToken,isInvalidGrantError,DH} from "./1288_storeOAuthAccountInfo.ts";
import {dc,U8} from "../../vendor/m1480.ts";
import {getIsNonInteractiveSession,setGatewayAuth,preferThirdPartyAuthentication,getSdkOAuthTokenRefreshCallback,setOauthTokenFromFd,setOauthScopesFromFd,lt,getOauthScopesFromFd} from "../session/0131_sent.ts";
import {ILr,DLr} from "../../vendor/m2028.ts";
import {logForDebugging,logAntError,qe} from "./0234_setHasFormattedOutput.ts";
import {Se,ds,K_,bt} from "../../vendor/m195.ts";
import {De,Rn} from "../session/0615_length.ts";
import {isFirstPartyProvider,getAPIProvider,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {getSettings_DEPRECATED,getSettingsForSource,getPolicySettingsLoadErrors,yr} from "./0740_updateSettingsForSource.ts";
import {getGlobalConfig,checkHasTrustDialogAccepted,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {MB,$Os,eYe} from "../../vendor/m1292.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {wR,qb,vB} from "../../vendor/m682.ts";
import {i$s,s$s,mRr,a$s} from "../../vendor/m1443.ts";
import {KD,vun} from "../../vendor/m1444.ts";
import {qt,Xt} from "./0228_encoding.ts";
import {UAn} from "../../vendor/m2013.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {Im,yQ} from "../../vendor/m1282.ts";
import {m1,OO,F7,B7,k8} from "../../vendor/m1291.ts";
import {clearLegacyApiKeyPrefetch,DYe,getLegacyApiKeyPrefetchResult} from "../../vendor/m1478.ts";
import {pfe,jR} from "./2028_allowed.ts";
import {mfe,ykt} from "../../vendor/m2029.ts";
import {je} from "../../vendor/m577.ts";
import {Ie,Oe,isTmuxControlMode,TA,ln} from "../telemetry/0594_feature_name.ts";
import {Mg} from "../../vendor/m1474.ts";
import {ci,pT} from "../../vendor/m1289.ts";
import {CLAUDE_AI_PROFILE_SCOPE,Dc} from "../api/0459_getOauthConfig.ts";
import {_vr,gvr,hvr,_me} from "../../vendor/m1285.ts";
import {ocn,G1e} from "../../vendor/m1286.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {zze} from "../session/1284_getAccessToken.ts";
import {Lr} from "../../vendor/m578.ts";
import {oa,execFileNoThrow} from "../../vendor/m684.ts";
import {u8,qMe,Hbt} from "../../vendor/m637.ts";
import {execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING} from "../../vendor/m683.ts";
var c$ = {};
isFullscreenWithTTY(c$, {
  withOAuthRefreshLock: () => withOAuthRefreshLock,
  waitForRotatedEnvToken: () => waitForRotatedEnvToken,
  validateForceLoginOrg: () => validateForceLoginOrg,
  toAccountInfo: () => toAccountInfo,
  shouldUseWIFAuth: () => shouldUseWIFAuth,
  saveOAuthTokensIfNeeded: () => saveOAuthTokensIfNeeded,
  saveApiKey: () => saveApiKey,
  restoreGatewayAuth: () => restoreGatewayAuth,
  resetEnvDerivedAuthCaches: () => resetEnvDerivedAuthCaches,
  resetAwsAuthRefreshCooldown: () => resetAwsAuthRefreshCooldown,
  resetAuthFailureTracking: () => resetAuthFailureTracking,
  removeApiKey: () => removeApiKey,
  refreshGcpCredentialsIfNeeded: () => refreshGcpCredentialsIfNeeded,
  refreshGcpAuth: () => refreshGcpAuth,
  refreshAwsAuth: () => refreshAwsAuth,
  refreshAndGetAwsCredentials: () => refreshAndGetAwsCredentials,
  readFreshOAuthAccessToken: () => readFreshOAuthAccessToken,
  prefetchGcpCredentialsIfSafe: () => prefetchGcpCredentialsIfSafe,
  prefetchAwsCredentialsAndBedRockInfoIfSafe: () => prefetchAwsCredentialsAndBedRockInfoIfSafe,
  prefetchApiKeyFromApiKeyHelperIfSafe: () => prefetchApiKeyFromApiKeyHelperIfSafe,
  oauthRefreshLockOptions: () => oauthRefreshLockOptions,
  noteAuthRecoveryOutcome: () => noteAuthRecoveryOutcome,
  isWIFDispatchAuth: () => isWIFDispatchAuth,
  isUsing3PServices: () => isUsing3PServices,
  isTeamSubscriberAsync: () => isTeamSubscriberAsync,
  isTeamSubscriber: () => isTeamSubscriber,
  isTeamPremiumSubscriberAsync: () => isTeamPremiumSubscriberAsync,
  isTeamPremiumSubscriber: () => isTeamPremiumSubscriber,
  isProSubscriberAsync: () => isProSubscriberAsync,
  isProSubscriber: () => isProSubscriber,
  isOverageProvisioningAllowedAsync: () => isOverageProvisioningAllowedAsync,
  isOverageProvisioningAllowed: () => isOverageProvisioningAllowed,
  isOtelHeadersHelperFromProjectOrLocalSettings: () => isOtelHeadersHelperFromProjectOrLocalSettings,
  isOAuthRefreshKnownDead: () => isOAuthRefreshKnownDead,
  isMaxSubscriberAsync: () => isMaxSubscriberAsync,
  isMaxSubscriber: () => isMaxSubscriber,
  isGcpAuthRefreshFromProjectSettings: () => isGcpAuthRefreshFromProjectSettings,
  isFirstPartyManagedOAuthContext: () => isFirstPartyManagedOAuthContext,
  isEnterpriseSubscriberAsync: () => isEnterpriseSubscriberAsync,
  isEnterpriseSubscriber: () => isEnterpriseSubscriber,
  isEnterprisePAYGSubscriberAsync: () => isEnterprisePAYGSubscriberAsync,
  isEnterprisePAYGSubscriber: () => isEnterprisePAYGSubscriber,
  isCustomApiKeyApproved: () => isCustomApiKeyApproved,
  isConsumerSubscriberAsync: () => isConsumerSubscriberAsync,
  isConsumerSubscriber: () => isConsumerSubscriber,
  isClaudeAISubscriberAsync: () => isClaudeAISubscriberAsync,
  isClaudeAISubscriber: () => isClaudeAISubscriber,
  isAwsCredentialExportFromProjectSettings: () => isAwsCredentialExportFromProjectSettings,
  isAwsAuthRefreshFromProjectSettings: () => isAwsAuthRefreshFromProjectSettings,
  isAnthropicAuthEnabledAsync: () => isAnthropicAuthEnabledAsync,
  isAnthropicAuthEnabled: () => isAnthropicAuthEnabled,
  is1PApiCustomerAsync: () => is1PApiCustomerAsync,
  is1PApiCustomer: () => is1PApiCustomer,
  hasStoredOAuthToken: () => hasStoredOAuthToken,
  hasStoredOAuthRefreshToken: () => hasStoredOAuthRefreshToken,
  hasProfileScopeAsync: () => hasProfileScopeAsync,
  hasProfileScope: () => hasProfileScope,
  hasOpusAccessAsync: () => hasOpusAccessAsync,
  hasOpusAccess: () => hasOpusAccess,
  hasOAuthScope: () => hasOAuthScope,
  hasAnthropicDirectApiKey: () => hasAnthropicDirectApiKey,
  hasAnthropicApiKeyAuthAsync: () => hasAnthropicApiKeyAuthAsync,
  hasAnthropicApiKeyAuth: () => hasAnthropicApiKeyAuth,
  hasAnthropicApiKey: () => hasAnthropicApiKey,
  handleOAuth401Error: () => handleOAuth401Error,
  getSubscriptionTypeAsync: () => getSubscriptionTypeAsync,
  getSubscriptionType: () => getSubscriptionType,
  getSubscriptionNameAsync: () => getSubscriptionNameAsync,
  getSubscriptionName: () => getSubscriptionName,
  getStoredOAuthTokenExpiresAt: () => getStoredOAuthTokenExpiresAt,
  getStoredOAuthSubscriptionType: () => getStoredOAuthSubscriptionType,
  getSeatTierAsync: () => getSeatTierAsync,
  getSeatTier: () => getSeatTier,
  getRateLimitTierAsync: () => getRateLimitTierAsync,
  getRateLimitTier: () => getRateLimitTier,
  getOtelHeadersHelperLastFailure: () => getOtelHeadersHelperLastFailure,
  getOtelHeadersFromHelper: () => getOtelHeadersFromHelper,
  getOauthAccountInfoAsync: () => getOauthAccountInfoAsync,
  getOauthAccountInfo: () => getOauthAccountInfo,
  getConfiguredApiKeyHelper: () => getConfiguredApiKeyHelper,
  getClaudeAIOAuthTokensAsync: () => getClaudeAIOAuthTokensAsync,
  getClaudeAIOAuthTokens: () => getClaudeAIOAuthTokens,
  getAuthTokenSourceAsync: () => getAuthTokenSourceAsync,
  getAuthTokenSource: () => getAuthTokenSource,
  getApiKeyHelperElapsedMs: () => getApiKeyHelperElapsedMs,
  getApiKeyFromConfigOrMacOSKeychainAsync: () => getApiKeyFromConfigOrMacOSKeychainAsync,
  getApiKeyFromConfigOrMacOSKeychain: () => getApiKeyFromConfigOrMacOSKeychain,
  getApiKeyFromApiKeyHelperCached: () => getApiKeyFromApiKeyHelperCached,
  getApiKeyFromApiKeyHelper: () => getApiKeyFromApiKeyHelper,
  getAnthropicApiKeyWithSourceAsync: () => getAnthropicApiKeyWithSourceAsync,
  getAnthropicApiKeyWithSource: () => getAnthropicApiKeyWithSource,
  getAnthropicApiKeyAsync: () => getAnthropicApiKeyAsync,
  getAnthropicApiKey: () => getAnthropicApiKey,
  getAdditionalModelOptionsCache: () => getAdditionalModelOptionsCache,
  getAccountInformationAsync: () => getAccountInformationAsync,
  getAccountInformation: () => getAccountInformation,
  describeHowToDisableAuthTokenSource: () => describeHowToDisableAuthTokenSource,
  clearWIFAuthDebugOnceCacheForTesting: () => clearWIFAuthDebugOnceCacheForTesting,
  clearOtelHeadersCache: () => clearOtelHeadersCache,
  clearOAuthTokenCache: () => clearOAuthTokenCache,
  clearGcpCredentialsCache: () => clearGcpCredentialsCache,
  clearAwsCredentialsCache: () => clearAwsCredentialsCache,
  clearApiKeyHelperCache: () => clearApiKeyHelperCache,
  checkGcpCredentialsValid: () => checkGcpCredentialsValid,
  checkAndRefreshOAuthTokenIfNeededWithOutcome: () => checkAndRefreshOAuthTokenIfNeededWithOutcome,
  checkAndRefreshOAuthTokenIfNeeded: () => checkAndRefreshOAuthTokenIfNeeded,
  calculateApiKeyHelperTTL: () => calculateApiKeyHelperTTL,
  acquireOAuthRefreshLock: () => acquireOAuthRefreshLock,
  __resetKnownDeadRefreshTokensForTest: () => __resetKnownDeadRefreshTokensForTest,
  SDK_OAUTH_REFRESH_ENTRYPOINTS: () => SDK_OAUTH_REFRESH_ENTRYPOINTS
});
function AXe() {
  return st(process.env.CLAUDE_CODE_REMOTE) || aoe();
}
function isFirstPartyManagedOAuthContext() {
  return AXe() && !process.env.CLAUDE_CODE_HOST_AUTH_ENV_VAR && process.env.CLAUDE_CODE_ENTRYPOINT !== "claude-desktop-3p";
}
function clearWIFAuthDebugOnceCacheForTesting() {
  Kti.cache.clear?.(), zti.cache.clear?.();
}
function shouldUseWIFAuth() {
  if (!isWIFActive()) return !1;
  if (dp() || process.env.ANTHROPIC_UNIX_SOCKET || AXe() || process.env.ANTHROPIC_AUTH_TOKEN || process.env.CLAUDE_CODE_OAUTH_TOKEN || x8() || getConfiguredApiKeyHelper() || st(process.env.CLAUDE_CODE_USE_BEDROCK) || st(process.env.CLAUDE_CODE_USE_VERTEX) || st(process.env.CLAUDE_CODE_USE_FOUNDRY) || st(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) || st(process.env.CLAUDE_CODE_USE_MANTLE)) return !1;
  if (getWIFPrecedenceSource() === "profile-implicit") {
    let e = getClaudeAIOAuthTokens();
    if (Y2(e?.scopes) && e?.accessToken && getWIFAuthType() === "user_oauth") return Kti(), !1;
  }
  return zti(), !0;
}
function isWIFDispatchAuth() {
  return getAnthropicApiKey() === null && shouldUseWIFAuth();
}
async function restoreGatewayAuth() {
  try {
    let e = await dc().readAsync(),
      t = e?.enterpriseGateway;
    if (!t) return;
    let n = new URL(t.url).hostname,
      r = e?.gatewayTrust?.[n];
    if (!r) {
      if (!getIsNonInteractiveSession()) process.stderr.write(`Cloud gateway ${n} is not trusted on this machine — run /login to reconnect.
`);
      return;
    }
    if (t.expiresAt <= Date.now() && !t.idpRefreshToken) {
      if (!getIsNonInteractiveSession()) process.stderr.write(`Cloud gateway session expired — run /login to reconnect.
`);
      return;
    }
    try {
      let o = await ILr(t.url, 3000);
      if (o.fingerprint !== r) {
        if (!getIsNonInteractiveSession()) process.stderr.write(`Cloud gateway ${n} TLS certificate changed since you connected — run /login to verify and reconnect.
`);
        logForDebugging(`[gateway] TLS fingerprint mismatch on restore for ${n}: pinned ${r}, live ${o.fingerprint}`, {
          level: "warn"
        });
        return;
      }
    } catch (o) {
      logForDebugging(`[gateway] TLS fingerprint probe failed on restore for ${n} (${Se(o)}); proceeding without re-verify`);
    }
    setGatewayAuth(t);
  } catch (e) {
    De(e);
  }
}
function isAnthropicAuthEnabled() {
  if (dp()) return !1;
  if (process.env.ANTHROPIC_UNIX_SOCKET) return !!process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (shouldUseWIFAuth()) return !1;
  let e = !isFirstPartyProvider(),
    n = (getSettings_DEPRECATED() || {}).apiKeyHelper,
    r = YC() ? void 0 : process.env.ANTHROPIC_AUTH_TOKEN,
    o;
  try {
    o = getAnthropicApiKeyWithSource({
      skipRetrievingKeyFromApiKeyHelper: !0
    }).source;
  } catch {
    return !1;
  }
  let s = o === "ANTHROPIC_API_KEY" || o === "apiKeyHelper",
    i = process.env.CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR,
    a = (r || s) && !isFirstPartyManagedOAuthContext() || (n || i) && !AXe();
  return !(e || a);
}
function describeHowToDisableAuthTokenSource(e) {
  switch (e) {
    case "claude.ai":
      return "claude /logout to sign out of claude.ai.";
    case "profile":
      return "Run `ant auth logout`, or remove the active profile under ~/.config/anthropic/configs/.";
    case "apiKeyHelper":
      return "Unset the apiKeyHelper setting.";
    case "CCR_OAUTH_TOKEN_FILE":
      return "This token is injected by the CCR host; check the host session.";
    case "none":
      return "";
    default:
      return `Unset the ${e} environment variable.`;
  }
}
function getAuthTokenSource() {
  if (dp()) {
    if (getConfiguredApiKeyHelper()) return {
      source: "apiKeyHelper",
      hasToken: !0
    };
    return {
      source: "none",
      hasToken: !1
    };
  }
  if (process.env.ANTHROPIC_AUTH_TOKEN && !isFirstPartyManagedOAuthContext() && !YC()) return {
    source: "ANTHROPIC_AUTH_TOKEN",
    hasToken: !0
  };
  if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return {
    source: "CLAUDE_CODE_OAUTH_TOKEN",
    hasToken: !0
  };
  if (x8()) {
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR) return {
      source: "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR",
      hasToken: !0
    };
    return {
      source: "CCR_OAUTH_TOKEN_FILE",
      hasToken: !0
    };
  }
  if (getConfiguredApiKeyHelper() && !AXe()) return {
    source: "apiKeyHelper",
    hasToken: !0
  };
  if (shouldUseWIFAuth()) return {
    source: "profile",
    hasToken: !0
  };
  let n = getClaudeAIOAuthTokens();
  if (Y2(n?.scopes) && n?.accessToken) return {
    source: "claude.ai",
    hasToken: !0
  };
  return {
    source: "none",
    hasToken: !1
  };
}
function getAnthropicApiKey() {
  let {
    key: e
  } = getAnthropicApiKeyWithSource();
  return e;
}
function getAdditionalModelOptionsCache() {
  let e = getGlobalConfig().additionalModelOptionsCache;
  return (Array.isArray(e) ? e : []).filter(t => t != null && typeof t === "object" && (typeof t.value === "string" || t.value === null) && typeof t.label === "string" && typeof t.description === "string");
}
function hasAnthropicDirectApiKey() {
  if (process.env.ANTHROPIC_AUTH_TOKEN) return !1;
  let {
    key: e,
    source: t
  } = getAnthropicApiKeyWithSource();
  if (!e || t === "/login managed key") return !1;
  return e.startsWith("sk-ant-") && e.slice(7, 10) === "api";
}
function hasAnthropicApiKeyAuth() {
  let {
    key: e,
    source: t
  } = getAnthropicApiKeyWithSource({
    skipRetrievingKeyFromApiKeyHelper: !0
  });
  return e !== null && t !== "none";
}
function hasAnthropicApiKey() {
  return getAnthropicApiKey() != null;
}
function getAnthropicApiKeyWithSource(e = {}) {
  if (dp()) {
    if (process.env.ANTHROPIC_API_KEY) return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
    if (getConfiguredApiKeyHelper()) return {
      key: e.skipRetrievingKeyFromApiKeyHelper ? null : getApiKeyFromApiKeyHelperCached(),
      source: "apiKeyHelper"
    };
    return {
      key: null,
      source: "none"
    };
  }
  let t = YC() ? void 0 : process.env.ANTHROPIC_API_KEY;
  if (preferThirdPartyAuthentication() && t) return {
    key: t,
    source: "ANTHROPIC_API_KEY"
  };
  if (st(!1)) {
    let s = kvt();
    if (s) return {
      key: s,
      source: "ANTHROPIC_API_KEY"
    };
    if (!t && !process.env.CLAUDE_CODE_OAUTH_TOKEN && !process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR && !process.env.ANTHROPIC_AUTH_TOKEN && !shouldUseWIFAuth() && isFirstPartyProvider()) throw Error("ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN, or WIF env vars (ANTHROPIC_FEDERATION_RULE_ID + ANTHROPIC_ORGANIZATION_ID) required");
    if (t) return {
      key: t,
      source: "ANTHROPIC_API_KEY"
    };
    return {
      key: null,
      source: "none"
    };
  }
  if (t && getGlobalConfig().customApiKeyResponses?.approved?.includes(MB(t))) return {
    key: t,
    source: "ANTHROPIC_API_KEY"
  };
  let n = kvt();
  if (n) return {
    key: n,
    source: "ANTHROPIC_API_KEY"
  };
  if (getConfiguredApiKeyHelper()) {
    if (e.skipRetrievingKeyFromApiKeyHelper) return {
      key: null,
      source: "apiKeyHelper"
    };
    return {
      key: getApiKeyFromApiKeyHelperCached(),
      source: "apiKeyHelper"
    };
  }
  let o = getApiKeyFromConfigOrMacOSKeychain();
  if (o) return o;
  return {
    key: null,
    source: "none"
  };
}
function getConfiguredApiKeyHelper() {
  if (dp()) return getSettingsForSource("flagSettings")?.apiKeyHelper;
  return (getSettings_DEPRECATED() || {}).apiKeyHelper;
}
function Yti() {
  let e = getConfiguredApiKeyHelper();
  if (!e) return !1;
  let t = getSettingsForSource("projectSettings"),
    n = getSettingsForSource("localSettings");
  return t?.apiKeyHelper === e || n?.apiKeyHelper === e;
}
function qLr() {
  return (getSettings_DEPRECATED() || {}).awsAuthRefresh;
}
function isAwsAuthRefreshFromProjectSettings() {
  let e = qLr();
  if (!e) return !1;
  let t = getSettingsForSource("projectSettings"),
    n = getSettingsForSource("localSettings");
  return t?.awsAuthRefresh === e || n?.awsAuthRefresh === e;
}
function WLr() {
  return (getSettings_DEPRECATED() || {}).awsCredentialExport;
}
function isAwsCredentialExportFromProjectSettings() {
  let e = WLr();
  if (!e) return !1;
  let t = getSettingsForSource("projectSettings"),
    n = getSettingsForSource("localSettings");
  return t?.awsCredentialExport === e || n?.awsCredentialExport === e;
}
function calculateApiKeyHelperTTL() {
  let e = process.env.CLAUDE_CODE_API_KEY_HELPER_TTL_MS;
  if (e) {
    let t = parseInt(e, 10);
    if (!Number.isNaN(t) && t >= 0) return t;
    logForDebugging(`Found CLAUDE_CODE_API_KEY_HELPER_TTL_MS env var, but it was not a valid number. Got ${e}`, {
      level: "error"
    });
  }
  return JWu;
}
function getApiKeyHelperElapsedMs() {
  let e = ffe?.startedAt;
  return e ? Date.now() - e : 0;
}
async function getApiKeyFromApiKeyHelper(e) {
  if (!getConfiguredApiKeyHelper()) return null;
  let t = calculateApiKeyHelperTTL();
  if (t5) {
    if (Date.now() - t5.timestamp < t) return t5.value;
    if (!ffe) ffe = {
      promise: qti(e, !1, fXe),
      startedAt: null
    };
    return t5.value;
  }
  if (ffe) return ffe.promise;
  return ffe = {
    promise: qti(e, !0, fXe),
    startedAt: Date.now()
  }, ffe.promise;
}
async function qti(e, t, n) {
  try {
    let r = await ZWu(e);
    if (n !== fXe) return r;
    if (r !== null) t5 = {
      value: r,
      timestamp: Date.now()
    };
    return r;
  } catch (r) {
    if (n !== fXe) return " ";
    let o = r instanceof Error ? r.message : String(r);
    if (console.error(_t.red(`apiKeyHelper failed: ${o}`)), logForDebugging(`Error getting API key from apiKeyHelper: ${o}`, {
      level: "error"
    }), !t && t5 && t5.value !== " ") return t5 = {
      ...t5,
      timestamp: Date.now()
    }, t5.value;
    return t5 = {
      value: " ",
      timestamp: Date.now()
    }, " ";
  } finally {
    if (n === fXe) ffe = null;
  }
}
async function ZWu(e) {
  let t = getConfiguredApiKeyHelper();
  if (!t) return null;
  if (Yti()) {
    if (!checkHasTrustDialogAccepted() && !e) {
      let s = Error(`Security: apiKeyHelper executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.FEEDBACK_CHANNEL}.`);
      return logAntError("apiKeyHelper invoked before trust check", s), logEvent("tengu_apiKeyHelper_missing_trust11", {}), null;
    }
  }
  let n = await wR(t, {
    timeout: 600000,
    reject: !1
  });
  if (n.failed) {
    let o = n.timedOut ? "timed out" : `exited ${n.exitCode}`,
      s = n.stderr?.trim();
    throw Error(s ? `${o}: ${s}` : o);
  }
  let r = n.stdout?.trim();
  if (!r) throw Error("did not return a value");
  return r;
}
function getApiKeyFromApiKeyHelperCached() {
  return t5?.value ?? null;
}
function clearApiKeyHelperCache() {
  fXe++, t5 = null, ffe = null;
}
function prefetchApiKeyFromApiKeyHelperIfSafe(e) {
  if (Yti() && !checkHasTrustDialogAccepted()) return;
  getApiKeyFromApiKeyHelper(e);
}
async function rGu() {
  let e = qLr(),
    t = OLr;
  if (!e) return !1;
  if (isAwsAuthRefreshFromProjectSettings()) {
    if (!checkHasTrustDialogAccepted() && !getIsNonInteractiveSession()) {
      let r = Error(`Security: awsAuthRefresh executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.FEEDBACK_CHANNEL}.`);
      return logAntError("awsAuthRefresh invoked before trust check", r), logEvent("tengu_awsAuthRefresh_missing_trust", {}), !1;
    }
  }
  if (jBe) return jBe;
  try {
    return logForDebugging("Fetching AWS caller identity for AWS auth refresh command"), await i$s(), logForDebugging("Fetched AWS caller identity, skipping AWS auth refresh command"), !1;
  } catch {
    if (jBe) return jBe;
    if (shn !== null && Date.now() - shn < nGu) return !1;
    return jBe = (async () => {
      try {
        return await refreshAwsAuth(e);
      } finally {
        if (t === OLr) shn = Date.now();
        jBe = null;
      }
    })(), jBe;
  }
}
function refreshAwsAuth(e, t) {
  logForDebugging("Running AWS auth refresh command");
  let n = KD.getInstance();
  return n.startAuthentication(), new Promise(r => {
    let o = BLr.exec(e, {
      timeout: oGu,
      signal: t,
      windowsHide: !0
    });
    o.stdout.on("data", s => {
      let i = s.toString().trim();
      if (i) n.addOutput(i), logForDebugging(i, {
        level: "debug"
      });
    }), o.stderr.on("data", s => {
      let i = s.toString().trim();
      if (i) n.setError(i), logForDebugging(i, {
        level: "error"
      });
    }), o.on("close", (s, i) => {
      if (s === 0) logForDebugging("AWS auth refresh completed successfully"), n.endAuthentication(!0), r(!0);else {
        let a = t?.aborted === !0,
          c = a ? null : !a && i === "SIGTERM" ? _t.red("AWS auth refresh timed out after 3 minutes. Run your auth command manually in a separate terminal.") : _t.red("Error running awsAuthRefresh (in settings or ~/.claude.json):");
        if (c) console.error(c);
        n.endAuthentication(!1), r(!1);
      }
    });
  });
}
async function sGu() {
  let e = WLr();
  if (!e) return null;
  if (isAwsCredentialExportFromProjectSettings()) {
    if (!checkHasTrustDialogAccepted() && !getIsNonInteractiveSession()) {
      let n = Error(`Security: awsCredentialExport executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.FEEDBACK_CHANNEL}.`);
      return logAntError("awsCredentialExport invoked before trust check", n), logEvent("tengu_awsCredentialExport_missing_trust", {}), null;
    }
  }
  try {
    logForDebugging("Running AWS credential export command");
    let t = await wR(e, {
      reject: !1
    });
    if (t.exitCode !== 0 || !t.stdout) throw Error("awsCredentialExport did not return a valid value");
    let n = qt(t.stdout.trim()),
      r = s$s(n);
    if (!r) throw Error("awsCredentialExport did not return valid AWS STS output structure");
    logForDebugging("AWS credentials retrieved from awsCredentialExport");
    let o = r.Expiration,
      s = typeof o === "string" ? Date.parse(o) : NaN;
    return {
      accessKeyId: r.AccessKeyId,
      secretAccessKey: r.SecretAccessKey,
      sessionToken: r.SessionToken,
      expiration: Number.isFinite(s) ? s : void 0
    };
  } catch (t) {
    let n = _t.red("Error getting AWS credentials from awsCredentialExport (in settings or ~/.claude.json):");
    if (t instanceof Error) console.error(n, t.message);else console.error(n, t);
    return null;
  }
}
function clearAwsCredentialsCache() {
  refreshAndGetAwsCredentials.cache.clear();
}
function resetAwsAuthRefreshCooldown() {
  shn = null, OLr++;
}
function zLr() {
  return (getSettings_DEPRECATED() || {}).gcpAuthRefresh;
}
function isGcpAuthRefreshFromProjectSettings() {
  let e = zLr();
  if (!e) return !1;
  let t = getSettingsForSource("projectSettings"),
    n = getSettingsForSource("localSettings");
  return t?.gcpAuthRefresh === e || n?.gcpAuthRefresh === e;
}
async function checkGcpCredentialsValid() {
  try {
    let {
        GoogleAuth: e
      } = await Promise.resolve().then(() => M(UAn(), 1)),
      t = new e({
        scopes: ["https://www.googleapis.com/auth/cloud-platform"]
      }),
      n = (async () => {
        await (await t.getClient()).getAccessToken();
      })(),
      r = sleep(iGu).then(() => {
        throw new uni("GCP credentials check timed out");
      });
    return await Promise.race([n, r]), !0;
  } catch {
    return !1;
  }
}
async function lGu() {
  let e = zLr();
  if (!e) return !1;
  if (isGcpAuthRefreshFromProjectSettings()) {
    if (!checkHasTrustDialogAccepted() && !getIsNonInteractiveSession()) {
      let n = Error(`Security: gcpAuthRefresh executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.FEEDBACK_CHANNEL}.`);
      return logAntError("gcpAuthRefresh invoked before trust check", n), logEvent("tengu_gcpAuthRefresh_missing_trust", {}), !1;
    }
  }
  try {
    if (logForDebugging("Checking GCP credentials validity for auth refresh"), await checkGcpCredentialsValid()) return logForDebugging("GCP credentials are valid, skipping auth refresh command"), !1;
  } catch {}
  return refreshGcpAuth(e);
}
function refreshGcpAuth(e) {
  logForDebugging("Running GCP auth refresh command");
  let t = KD.getInstance();
  return t.startAuthentication(), new Promise(n => {
    let r = BLr.exec(e, {
      timeout: cGu,
      windowsHide: !0
    });
    r.stdout.on("data", o => {
      let s = o.toString().trim();
      if (s) t.addOutput(s), logForDebugging(s, {
        level: "debug"
      });
    }), r.stderr.on("data", o => {
      let s = o.toString().trim();
      if (s) t.setError(s), logForDebugging(s, {
        level: "error"
      });
    }), r.on("close", (o, s) => {
      if (o === 0) logForDebugging("GCP auth refresh completed successfully"), t.endAuthentication(!0), n(!0);else {
        let a = s === "SIGTERM" ? _t.red("GCP auth refresh timed out after 3 minutes. Run your auth command manually in a separate terminal.") : _t.red("Error running gcpAuthRefresh (in settings or ~/.claude.json):");
        console.error(a), t.endAuthentication(!1), n(!1);
      }
    });
  });
}
function clearGcpCredentialsCache() {
  refreshGcpCredentialsIfNeeded.cache.clear();
}
function prefetchGcpCredentialsIfSafe() {
  if (!zLr()) return;
  if (isGcpAuthRefreshFromProjectSettings()) {
    if (!checkHasTrustDialogAccepted() && !getIsNonInteractiveSession()) return;
  }
  refreshGcpCredentialsIfNeeded();
}
function prefetchAwsCredentialsAndBedRockInfoIfSafe() {
  let e = qLr(),
    t = WLr();
  if (!e && !t) return;
  if (isAwsAuthRefreshFromProjectSettings() || isAwsCredentialExportFromProjectSettings()) {
    if (!checkHasTrustDialogAccepted() && !getIsNonInteractiveSession()) return;
  }
  refreshAndGetAwsCredentials(), Im();
}
function uGu(e) {
  return /^[a-zA-Z0-9-_]+$/.test(e);
}
async function saveApiKey(e) {
  if (!uGu(e)) throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");
  await eni();
  let t = !0;
  if (t) {
    let r = m1(),
      o = OO(),
      s = Buffer.from(e, "utf-8").toString("hex"),
      i = `add-generic-password -U -a "${o}" -s "${r}" -X "${s}"
`,
      a = await qb("security", ["-i"], {
        input: i,
        reject: !1,
        timeout: 5000
      });
    if (a.exitCode !== 0) {
      let l = (a.stderr || a.stdout || "").trim().replace(/\s*\n\s*/g, "; ");
      throw logEvent("tengu_api_key_keychain_error", {
        error: l
      }), Error(`Failed to save API key to macOS Keychain${l ? ` (${l})` : ""}. Run \`claude doctor\` to diagnose keychain access.`);
    }
    logEvent("tengu_api_key_saved_to_keychain", {});
  } else logEvent("tengu_api_key_saved_to_config", {});
  let n = MB(e);
  saveGlobalConfig(r => {
    let o = r.customApiKeyResponses?.approved ?? [];
    return {
      ...r,
      primaryApiKey: t ? r.primaryApiKey : e,
      customApiKeyResponses: {
        ...r.customApiKeyResponses,
        approved: o.includes(n) ? o : [...o, n],
        rejected: r.customApiKeyResponses?.rejected ?? []
      }
    };
  }), getApiKeyFromConfigOrMacOSKeychain.cache.clear?.(), clearLegacyApiKeyPrefetch(), getApiKeyFromConfigOrMacOSKeychainAsync.cache?.clear?.();
}
function isCustomApiKeyApproved(e) {
  let t = getGlobalConfig(),
    n = MB(e);
  return t.customApiKeyResponses?.approved?.includes(n) ?? !1;
}
async function removeApiKey() {
  await eni(), saveGlobalConfig(e => ({
    ...e,
    primaryApiKey: void 0
  })), getApiKeyFromConfigOrMacOSKeychain.cache.clear?.(), clearLegacyApiKeyPrefetch(), getApiKeyFromConfigOrMacOSKeychainAsync.cache?.clear?.();
}
async function eni() {
  try {
    await $Os();
  } catch (e) {
    logForDebugging(`Failed to remove API key from macOS keychain: ${Se(e)}`, {
      level: "error"
    });
  }
}
async function saveOAuthTokensIfNeeded(e) {
  if (!Y2(e.scopes)) return logEvent("tengu_oauth_tokens_not_claude_ai", {}), {
    success: !0
  };
  if (!e.refreshToken || !e.expiresAt) return logEvent("tengu_oauth_tokens_inference_only", {}), {
    success: !0
  };
  let {
      accessToken: t,
      refreshToken: n,
      expiresAt: r,
      scopes: o,
      clientId: s
    } = e,
    i = dc(),
    a = i.name;
  try {
    let l = await i.mutate(c => {
      let u = c.claudeAiOauth;
      return {
        ...c,
        claudeAiOauth: {
          accessToken: t,
          refreshToken: n,
          expiresAt: r,
          scopes: o,
          subscriptionType: e.subscriptionType ?? u?.subscriptionType ?? null,
          rateLimitTier: e.rateLimitTier ?? u?.rateLimitTier ?? null,
          clientId: s
        }
      };
    });
    if (l.success) logEvent("tengu_oauth_tokens_saved", {
      storageBackend: a
    });else logEvent("tengu_oauth_tokens_save_failed", {
      storageBackend: a
    });
    return getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.(), pfe(), mfe(), l;
  } catch (l) {
    return logForDebugging(`Failed to save OAuth tokens: ${Se(l)}`, {
      level: "error"
    }), logEvent("tengu_oauth_tokens_save_exception", {
      storageBackend: a,
      error: Se(l)
    }), {
      success: !1,
      warning: "Failed to save OAuth tokens"
    };
  }
}
function __resetKnownDeadRefreshTokensForTest() {
  ihn.clear();
}
function isOAuthRefreshKnownDead() {
  let e = getClaudeAIOAuthTokens()?.refreshToken;
  return e === "" || !!e && ihn.has(e);
}
function Wti() {
  let e = process.env.CLAUDE_CODE_OAUTH_SCOPES?.split(/\s+/).filter(Boolean);
  return e?.length ? e : ["user:inference"];
}
function clearOAuthTokenCache() {
  getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.(), F7(), pfe(), mfe();
}
function resetEnvDerivedAuthCaches() {
  getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.(), getApiKeyFromConfigOrMacOSKeychain.cache?.clear?.(), getApiKeyFromConfigOrMacOSKeychainAsync.cache?.clear?.(), clearApiKeyHelperCache(), clearAwsCredentialsCache(), resetAwsAuthRefreshCooldown(), clearGcpCredentialsCache(), pfe(), mfe();
}
async function mGu() {
  try {
    let {
      mtimeMs: e
    } = await wkt.stat(FLr.join(B7(), ".credentials.json"));
    if (e !== Gti) Gti = e, clearOAuthTokenCache();
  } catch {
    getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.();
    let t = (await getClaudeAIOAuthTokensAsync())?.accessToken ?? null;
    if (t !== Vti) Vti = t, pfe(), mfe();
  }
}
function handleOAuth401Error(e) {
  let t = PLr.get(e);
  if (t) return t;
  let n = AGu(e).finally(() => {
    PLr.delete(e);
  });
  return PLr.set(e, n), n;
}
async function waitForRotatedEnvToken(e) {
  let t = e.pollMs ?? 2000,
    n = e.readToken ?? (() => je.CLAUDE_CODE_OAUTH_TOKEN ?? x8() ?? void 0),
    r = e.sleeper ?? (i => sleep(i)),
    o = Date.now() + e.timeoutMs;
  while (Date.now() < o) {
    let i = n();
    if (i && i !== e.failedAccessToken) return !0;
    await r(Math.min(t, Math.max(1, o - Date.now())));
  }
  let s = n();
  return Boolean(s && s !== e.failedAccessToken);
}
function fGu() {
  let e = je.CLAUDE_CODE_OAUTH_401_WAIT_MS;
  if (e !== void 0) return e;
  return je.CLAUDE_CODE_REMOTE_SESSION_ID ? 60000 : 0;
}
function noteAuthRecoveryOutcome(e) {
  let t = e.nowMs ?? Date.now();
  if (e.recovered) return Skt = null, "continue";
  if (!(e.isRemoteChild ?? Boolean(je.CLAUDE_CODE_REMOTE_SESSION_ID))) return "continue";
  let r = e.thresholdMs ?? je.CLAUDE_CODE_AUTH_FAIL_EXIT_MS ?? 600000;
  if (r <= 0) return "continue";
  if (Skt === null) return Skt = t, "continue";
  if (t - Skt >= r) return "exit";
  return "continue";
}
function resetAuthFailureTracking() {
  Skt = null;
}
async function AGu(e) {
  clearOAuthTokenCache();
  let t = await getClaudeAIOAuthTokensAsync();
  if (!t?.refreshToken) {
    let n = getSdkOAuthTokenRefreshCallback();
    if (n) try {
      let o = await n();
      if (o && o !== e) return process.env.CLAUDE_CODE_OAUTH_TOKEN = o, clearOAuthTokenCache(), logEvent("tengu_oauth_401_sdk_callback_refreshed", {}), Ie("oauth_401_recovery"), noteAuthRecoveryOutcome({
        recovered: !0
      }), !0;
      logForDebugging(o === null ? "SDK getOAuthToken callback returned null (no token available)" : "SDK getOAuthToken callback returned the same expired token; treating as no refresh", {
        level: o === null ? "debug" : "error"
      });
    } catch (o) {
      Oe("oauth_401_recovery", "oauth_401_sdk_callback_failed"), logForDebugging(`SDK getOAuthToken callback failed: ${o instanceof Error ? o.message : String(o)}`, {
        level: "error"
      });
    }
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN || x8()) try {
      let o = (await dc().readAsync())?.claudeAiOauth;
      if (o?.accessToken && o.accessToken !== e) {
        if (process.env.CLAUDE_CODE_OAUTH_TOKEN) process.env.CLAUDE_CODE_OAUTH_TOKEN = o.accessToken;
        if (x8()) setOauthTokenFromFd(o.accessToken), setOauthScopesFromFd(o.scopes);
        return clearOAuthTokenCache(), logEvent("tengu_oauth_401_recovered_from_disk", {}), Ie("oauth_401_recovery"), noteAuthRecoveryOutcome({
          recovered: !0
        }), !0;
      }
    } catch (o) {
      Oe("oauth_401_recovery", "oauth_401_disk_read_failed"), De(o);
    }
    let r = Boolean(process.env.CLAUDE_CODE_OAUTH_TOKEN) || Boolean(x8());
    if (r) {
      let o = fGu();
      if (o > 0) {
        if (logForDebugging(`OAuth 401 recovery: waiting up to ${o}ms for a rotated env token`), await waitForRotatedEnvToken({
          failedAccessToken: e,
          timeoutMs: o
        })) {
          if (x8()) {
            let s = je.CLAUDE_CODE_OAUTH_TOKEN;
            if (s) setOauthTokenFromFd(s);
          }
          return clearOAuthTokenCache(), logEvent("tengu_oauth_401_recovered_from_rotation", {}), Ie("oauth_401_recovery"), noteAuthRecoveryOutcome({
            recovered: !0
          }), !0;
        }
      }
    }
    if (Oe("oauth_401_recovery", r ? "oauth_401_no_refresh_token_bg_worker" : "oauth_401_no_refresh_token_interactive"), noteAuthRecoveryOutcome({
      recovered: !1
    }) === "exit") logEvent("tengu_oauth_401_zombie_exit", {}), logForDebugging("OAuth 401 unrecovered past CLAUDE_CODE_AUTH_FAIL_EXIT_MS — exiting so the runner recycles this session with fresh credentials", {
      level: "error"
    }), setTimeout(() => process.exit(1), 2000);
    return !1;
  }
  if (t.accessToken !== e) return logEvent("tengu_oauth_401_recovered_from_keychain", {}), Ie("oauth_401_recovery"), noteAuthRecoveryOutcome({
    recovered: !0
  }), !0;
  return checkAndRefreshOAuthTokenIfNeeded(0, !0, e);
}
async function readFreshOAuthAccessToken() {
  return clearOAuthTokenCache(), (await getClaudeAIOAuthTokensAsync())?.accessToken;
}
function oauthRefreshLockOptions(e) {
  return {
    lockfilePath: FLr.join(e, ".oauth_refresh.lock"),
    realpath: !1,
    stale: 1e4,
    onCompromised: t => logForDebugging(`OAuth refresh lock compromised: ${t.message}`, {
      level: "error"
    })
  };
}
async function acquireOAuthRefreshLock(e) {
  let t = await Mg(e, oauthRefreshLockOptions(e)),
    r = `${await wkt.realpath(e).catch(() => e)}.lock`,
    o = null;
  try {
    o = await Mg(r, {
      ...oauthRefreshLockOptions(e),
      lockfilePath: r
    });
  } catch (s) {
    if (s.code === "ELOCKED") throw logEvent("tengu_oauth_refresh_legacy_lock_contended", {}), await t().catch(i => ds(i) ? logForDebugging(`OAuth refresh new-lock release failed: ${i}`) : De(i)), s;
    if (ds(s)) logForDebugging(`OAuth refresh legacy-lock acquire failed: ${s}`);else De(s);
  }
  return async () => {
    if (o) await o().catch(s => ds(s) ? logForDebugging(`OAuth refresh legacy-lock release failed: ${s}`) : De(s));
    await t();
  };
}
async function withOAuthRefreshLock(e) {
  let t = B7();
  await ci().mkdir(t);
  let n,
    r = 0;
  while (!n) {
    r++;
    try {
      n = await acquireOAuthRefreshLock(t);
    } catch (o) {
      if (o.code === "ELOCKED") {
        if (r < hGu) {
          await sleep(1000 + Math.random() * 1000);
          continue;
        }
        throw Error(`Lock acquisition failed after ${r} attempts: another process is refreshing`);
      }
      throw o;
    }
  }
  try {
    clearOAuthTokenCache();
    let o = await getClaudeAIOAuthTokensAsync();
    return await e({
      lockedTokens: o,
      lockAttempts: r
    });
  } finally {
    try {
      await n();
    } catch (o) {
      if (ds(o)) logForDebugging(`OAuth refresh lock release failed: ${o}`);else De(o);
    }
  }
}
function checkAndRefreshOAuthTokenIfNeeded(e = 0, t = !1, n) {
  return checkAndRefreshOAuthTokenIfNeededWithOutcome(e, t, n).then(r => r === "refreshed");
}
function checkAndRefreshOAuthTokenIfNeededWithOutcome(e = 0, t = !1, n) {
  if (e === 0 && !t) {
    if (Tkt) return Tkt;
    return Tkt = MLr(e, t).finally(() => {
      Tkt = null;
    }), Tkt;
  }
  return MLr(e, t, n);
}
async function MLr(e, t, n) {
  await mGu();
  let o = await getClaudeAIOAuthTokensAsync();
  if (!t) {
    if (o && !isOAuthTokenExpired(o.expiresAt)) return "not_needed";
    if (!o?.refreshToken) return "no_refresh_token";
  }
  if (!o?.refreshToken) return "no_refresh_token";
  if (ihn.has(o.refreshToken)) return "known_dead_refresh_token";
  if (!Y2(o.scopes) && !o.subscriptionType) return "not_refreshable";
  let s = n ?? o.accessToken;
  clearOAuthTokenCache();
  let i = await getClaudeAIOAuthTokensAsync();
  if (!i?.refreshToken) return "no_refresh_token";
  if (i.accessToken !== s) return logEvent("tengu_oauth_token_refresh_race_resolved", {}), "refreshed";
  if (!t && !isOAuthTokenExpired(i.expiresAt)) return "not_needed";
  let a = B7();
  await ci().mkdir(a);
  let l;
  try {
    logEvent("tengu_oauth_token_refresh_lock_acquiring", {}), l = await acquireOAuthRefreshLock(a), logEvent("tengu_oauth_token_refresh_lock_acquired", {});
  } catch (u) {
    if (u.code === "ELOCKED") {
      if (e < 5) return logEvent("tengu_oauth_token_refresh_lock_retry", {
        retryCount: e + 1
      }), await sleep(1000 + Math.random() * 1000), MLr(e + 1, t, s);
      return logEvent("tengu_oauth_token_refresh_lock_retry_limit_reached", {
        maxRetries: 5
      }), isTmuxControlMode("oauth_token_refresh", "oauth_refresh_lock_timeout"), "lock_timeout";
    }
    return De(u), logEvent("tengu_oauth_token_refresh_lock_error", {
      error: Se(u)
    }), Oe("oauth_token_refresh", "oauth_refresh_lock_error"), "lock_error";
  }
  let c = null;
  try {
    clearOAuthTokenCache();
    let u = await getClaudeAIOAuthTokensAsync();
    if (!u?.refreshToken) return "no_refresh_token";
    if (c = u.refreshToken, u.accessToken !== s) return logEvent("tengu_oauth_token_refresh_race_resolved", {}), "refreshed";
    if (!t && !isOAuthTokenExpired(u.expiresAt)) return "not_needed";
    logEvent("tengu_oauth_token_refresh_starting", {});
    let d = await refreshOAuthToken(u.refreshToken, {
      scopes: (Y2(u.scopes) || u.subscriptionType) && !u.clientId ? void 0 : u.scopes,
      clientId: u.clientId
    });
    return await saveOAuthTokensIfNeeded(d), clearOAuthTokenCache(), "refreshed";
  } catch (u) {
    if (isInvalidGrantError(u) || K_(u)) logForDebugging(`OAuth refresh failed (expected): ${Se(u)}`, {
      level: "error"
    });else De(u);
    clearOAuthTokenCache();
    let d = await getClaudeAIOAuthTokensAsync();
    if (d && d.accessToken !== s) return logEvent("tengu_oauth_token_refresh_race_recovered", {}), "refreshed";
    if (isInvalidGrantError(u) && c) {
      ihn.add(c), logEvent("tengu_oauth_refresh_token_marked_dead_invalid_grant", {});
      try {
        let p = !1,
          m = await dc().mutate(f => {
            let A = f.claudeAiOauth;
            if (!A || A.refreshToken !== c) return f;
            return p = !0, {
              ...f,
              claudeAiOauth: {
                ...A,
                refreshToken: ""
              }
            };
          });
        if (p && m.success) logEvent("tengu_oauth_refresh_token_cleared_on_disk", {});else if (p) logForDebugging("OAuth dead-token disk clear: backend write failed", {
          level: "error"
        });
      } catch (p) {
        logForDebugging(`OAuth dead-token disk clear failed: ${Se(p)}`, {
          level: "error"
        });
      }
    }
    return isInvalidGrantError(u) ? "known_dead_refresh_token" : "refresh_failed";
  } finally {
    logEvent("tengu_oauth_token_refresh_lock_releasing", {});
    try {
      await l(), logEvent("tengu_oauth_token_refresh_lock_released", {});
    } catch (u) {
      logForDebugging(`OAuth refresh lock release failed: ${u}`, {
        level: "error"
      }), logEvent("tengu_oauth_token_refresh_lock_release_error", {});
    }
  }
}
function isClaudeAISubscriber() {
  if (!isAnthropicAuthEnabled()) return !1;
  return Y2(getClaudeAIOAuthTokens()?.scopes);
}
function hasProfileScope() {
  let e = getClaudeAIOAuthTokens()?.scopes;
  return Array.isArray(e) && e.includes(CLAUDE_AI_PROFILE_SCOPE);
}
function hasStoredOAuthToken() {
  return getClaudeAIOAuthTokens()?.accessToken != null;
}
function hasOAuthScope(e) {
  let t = getClaudeAIOAuthTokens()?.scopes;
  return Array.isArray(t) && t.includes(e);
}
function getStoredOAuthTokenExpiresAt() {
  return getClaudeAIOAuthTokens()?.expiresAt ?? null;
}
function getStoredOAuthSubscriptionType() {
  return getClaudeAIOAuthTokens()?.subscriptionType ?? null;
}
function hasStoredOAuthRefreshToken() {
  return getClaudeAIOAuthTokens()?.refreshToken != null;
}
function is1PApiCustomer() {
  if (!isFirstPartyProvider()) return !1;
  if (isClaudeAISubscriber()) return !1;
  return !0;
}
function getOauthAccountInfo() {
  return isAnthropicAuthEnabled() ? getGlobalConfig().oauthAccount : void 0;
}
function isOverageProvisioningAllowed() {
  let t = getOauthAccountInfo()?.billingType;
  if (!isClaudeAISubscriber() || !t) return !1;
  if (t !== "stripe_subscription" && t !== "stripe_subscription_contracted" && t !== "apple_subscription" && t !== "google_play_subscription") return !1;
  return !0;
}
function hasOpusAccess() {
  let e = getSubscriptionType();
  return e === "max" || e === "enterprise" || e === "team" || e === "pro" || e === null;
}
function getSubscriptionType() {
  if (_vr()) return gvr();
  if (!isAnthropicAuthEnabled()) return null;
  let e = getClaudeAIOAuthTokens();
  if (!e) return null;
  return e.subscriptionType ?? null;
}
function isMaxSubscriber() {
  return getSubscriptionType() === "max";
}
function isTeamSubscriber() {
  return getSubscriptionType() === "team";
}
function isTeamPremiumSubscriber() {
  return getSubscriptionType() === "team" && getRateLimitTier() === "default_claude_max_5x";
}
function isEnterpriseSubscriber() {
  return getSubscriptionType() === "enterprise";
}
function isEnterprisePAYGSubscriber() {
  return getSubscriptionType() === "enterprise" && getSeatTier() === "enterprise_usage_based";
}
function isProSubscriber() {
  return getSubscriptionType() === "pro";
}
function getRateLimitTier() {
  let e = hvr();
  if (e !== null) return e;
  if (!isAnthropicAuthEnabled()) return null;
  let t = getClaudeAIOAuthTokens();
  if (!t) return null;
  return t.rateLimitTier ?? null;
}
function getSeatTier() {
  return getOauthAccountInfo()?.seatTier ?? null;
}
function getSubscriptionName() {
  switch (getSubscriptionType()) {
    case "enterprise":
      return "Claude Enterprise";
    case "team":
      return "Claude Team";
    case "max":
      return "Claude Max";
    case "pro":
      return "Claude Pro";
    default:
      return "Claude API";
  }
}
function isUsing3PServices() {
  return !isFirstPartyProvider();
}
function nMr() {
  if (Bl()) return getSettingsForSource("policySettings")?.otelHeadersHelper;
  return (getSettings_DEPRECATED() || {}).otelHeadersHelper;
}
function isOtelHeadersHelperFromProjectOrLocalSettings() {
  let e = nMr();
  if (!e) return !1;
  let t = getSettingsForSource("projectSettings"),
    n = getSettingsForSource("localSettings");
  return t?.otelHeadersHelper === e || n?.otelHeadersHelper === e;
}
function getOtelHeadersHelperLastFailure() {
  if (!nMr()) return null;
  return Ekt;
}
function clearOtelHeadersCache() {
  bkt = null, NLr = 0, mXe = null, Ekt = null;
}
async function getOtelHeadersFromHelper() {
  let e = nMr();
  if (!e) return {};
  let t = parseInt(process.env.CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS || yGu.toString());
  if (bkt && Date.now() - NLr < t) return bkt;
  if (mXe) return mXe;
  if (isOtelHeadersHelperFromProjectOrLocalSettings()) {
    if (!checkHasTrustDialogAccepted()) return {};
  }
  return mXe = (async () => {
    try {
      let n = e.trim(),
        r = !1;
      try {
        r = (await wkt.stat(n)).isFile();
      } catch {}
      let o = null;
      if (r) try {
        let a = await qb(n, [], {
          timeout: 30000,
          reject: !1
        });
        if (!(a.failed && !a.timedOut && typeof a.exitCode !== "number" && !a.signal)) o = a;
      } catch {}
      if (!o) o = await wR(e, {
        timeout: 30000,
        reject: !1
      });
      if (o.failed) {
        let a;
        if (o.timedOut) a = "timed out";else if (typeof o.exitCode === "number") a = `exited ${o.exitCode}`;else if (o.signal) a = `was killed by ${o.signal}`;else a = "could not be started";
        let l = o.stderr?.trim();
        throw Error(l ? `${a}: ${l}` : a);
      }
      let s = o.stdout?.toString().trim();
      if (!s) throw Error("otelHeadersHelper did not return a valid value");
      let i = qt(s);
      if (typeof i !== "object" || i === null || Array.isArray(i)) throw Error("otelHeadersHelper must return a JSON object with string key-value pairs");
      for (let [a, l] of Object.entries(i)) if (typeof l !== "string") throw Error(`otelHeadersHelper returned non-string value for key "${a}": ${typeof l}`);
      return bkt = i, NLr = Date.now(), Ekt = null, bkt;
    } catch (n) {
      let r = Se(n);
      if (Ekt === null && getIsNonInteractiveSession()) process.stderr.write(_t.red(`otelHeadersHelper failed (OpenTelemetry export headers unavailable): ${r}`) + `
`);
      throw Ekt = r, logForDebugging(`Error getting OpenTelemetry headers from otelHeadersHelper (in settings): ${r}`, {
        level: "error"
      }), n;
    } finally {
      mXe = null;
    }
  })(), mXe;
}
function oni(e) {
  return e === "max" || e === "pro";
}
function isConsumerSubscriber() {
  let e = getSubscriptionType();
  return isClaudeAISubscriber() && e !== null && oni(e);
}
function getAccountInformation() {
  if (getAPIProvider() !== "firstParty") return;
  let {
      source: t
    } = getAuthTokenSource(),
    n = {};
  if (t === "CLAUDE_CODE_OAUTH_TOKEN" || t === "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR") n.tokenSource = t;else if (isClaudeAISubscriber()) n.subscription = getSubscriptionName();else if (t !== "profile") n.tokenSource = t;
  let {
    key: r,
    source: o
  } = getAnthropicApiKeyWithSource();
  if (r) n.apiKeySource = o;
  if (t === "claude.ai" || o === "/login managed key") {
    let i = getOauthAccountInfo()?.organizationName;
    if (i) n.organization = i;
  }
  let s = getOauthAccountInfo()?.emailAddress;
  if ((t === "claude.ai" || o === "/login managed key") && s) n.email = s;
  return n;
}
function toAccountInfo() {
  let e = getAccountInformation();
  return {
    email: e?.email,
    organization: e?.organization,
    subscriptionType: e?.subscription,
    tokenSource: e?.tokenSource,
    apiKeySource: e?.apiKeySource,
    apiProvider: getAPIProvider()
  };
}
async function getAnthropicApiKeyWithSourceAsync(e = {}) {
  if (dp()) {
    if (process.env.ANTHROPIC_API_KEY) return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
    if (getConfiguredApiKeyHelper()) return {
      key: e.skipRetrievingKeyFromApiKeyHelper ? null : getApiKeyFromApiKeyHelperCached(),
      source: "apiKeyHelper"
    };
    return {
      key: null,
      source: "none"
    };
  }
  let t = YC() ? void 0 : process.env.ANTHROPIC_API_KEY;
  if (preferThirdPartyAuthentication() && t) return {
    key: t,
    source: "ANTHROPIC_API_KEY"
  };
  if (st(!1)) {
    let s = kvt();
    if (s) return {
      key: s,
      source: "ANTHROPIC_API_KEY"
    };
    if (!t && !process.env.CLAUDE_CODE_OAUTH_TOKEN && !process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR && !process.env.ANTHROPIC_AUTH_TOKEN && !shouldUseWIFAuth() && isFirstPartyProvider()) throw Error("ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN, or WIF env vars (ANTHROPIC_FEDERATION_RULE_ID + ANTHROPIC_ORGANIZATION_ID) required");
    if (t) return {
      key: t,
      source: "ANTHROPIC_API_KEY"
    };
    return {
      key: null,
      source: "none"
    };
  }
  if (t && getGlobalConfig().customApiKeyResponses?.approved?.includes(MB(t))) return {
    key: t,
    source: "ANTHROPIC_API_KEY"
  };
  let n = kvt();
  if (n) return {
    key: n,
    source: "ANTHROPIC_API_KEY"
  };
  if (getConfiguredApiKeyHelper()) {
    if (e.skipRetrievingKeyFromApiKeyHelper) return {
      key: null,
      source: "apiKeyHelper"
    };
    return {
      key: getApiKeyFromApiKeyHelperCached(),
      source: "apiKeyHelper"
    };
  }
  let o = await getApiKeyFromConfigOrMacOSKeychainAsync();
  if (o) return o;
  return {
    key: null,
    source: "none"
  };
}
async function getAnthropicApiKeyAsync() {
  let {
    key: e
  } = await getAnthropicApiKeyWithSourceAsync();
  return e;
}
async function hasAnthropicApiKeyAuthAsync() {
  let {
    key: e,
    source: t
  } = await getAnthropicApiKeyWithSourceAsync({
    skipRetrievingKeyFromApiKeyHelper: !0
  });
  return e !== null && t !== "none";
}
async function isAnthropicAuthEnabledAsync() {
  if (dp()) return !1;
  if (process.env.ANTHROPIC_UNIX_SOCKET) return !!process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (shouldUseWIFAuth()) return !1;
  let e = !isFirstPartyProvider(),
    n = (getSettings_DEPRECATED() || {}).apiKeyHelper,
    r = YC() ? void 0 : process.env.ANTHROPIC_AUTH_TOKEN,
    o;
  try {
    o = (await getAnthropicApiKeyWithSourceAsync({
      skipRetrievingKeyFromApiKeyHelper: !0
    })).source;
  } catch {
    return !1;
  }
  let s = o === "ANTHROPIC_API_KEY" || o === "apiKeyHelper",
    i = process.env.CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR,
    a = (r || s) && !isFirstPartyManagedOAuthContext() || (n || i) && !AXe();
  return !(e || a);
}
async function getAuthTokenSourceAsync() {
  if (dp()) {
    if (getConfiguredApiKeyHelper()) return {
      source: "apiKeyHelper",
      hasToken: !0
    };
    return {
      source: "none",
      hasToken: !1
    };
  }
  if (process.env.ANTHROPIC_AUTH_TOKEN && !isFirstPartyManagedOAuthContext() && !YC()) return {
    source: "ANTHROPIC_AUTH_TOKEN",
    hasToken: !0
  };
  if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return {
    source: "CLAUDE_CODE_OAUTH_TOKEN",
    hasToken: !0
  };
  if (x8()) {
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR) return {
      source: "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR",
      hasToken: !0
    };
    return {
      source: "CCR_OAUTH_TOKEN_FILE",
      hasToken: !0
    };
  }
  if (getConfiguredApiKeyHelper() && !AXe()) return {
    source: "apiKeyHelper",
    hasToken: !0
  };
  if (shouldUseWIFAuth()) return {
    source: "profile",
    hasToken: !0
  };
  let n = await getClaudeAIOAuthTokensAsync();
  if (Y2(n?.scopes) && n?.accessToken) return {
    source: "claude.ai",
    hasToken: !0
  };
  return {
    source: "none",
    hasToken: !1
  };
}
async function isClaudeAISubscriberAsync() {
  if (!(await isAnthropicAuthEnabledAsync())) return !1;
  return Y2((await getClaudeAIOAuthTokensAsync())?.scopes);
}
async function hasProfileScopeAsync() {
  let e = (await getClaudeAIOAuthTokensAsync())?.scopes;
  return Array.isArray(e) && e.includes(CLAUDE_AI_PROFILE_SCOPE);
}
async function is1PApiCustomerAsync() {
  if (!isFirstPartyProvider()) return !1;
  if (await isClaudeAISubscriberAsync()) return !1;
  return !0;
}
async function getOauthAccountInfoAsync() {
  return (await isAnthropicAuthEnabledAsync()) ? getGlobalConfig().oauthAccount : void 0;
}
async function isOverageProvisioningAllowedAsync() {
  let t = (await getOauthAccountInfoAsync())?.billingType;
  if (!(await isClaudeAISubscriberAsync()) || !t) return !1;
  if (t !== "stripe_subscription" && t !== "stripe_subscription_contracted" && t !== "apple_subscription" && t !== "google_play_subscription") return !1;
  return !0;
}
async function getSubscriptionTypeAsync() {
  if (_vr()) return gvr();
  if (!(await isAnthropicAuthEnabledAsync())) return null;
  let e = await getClaudeAIOAuthTokensAsync();
  if (!e) return null;
  return e.subscriptionType ?? null;
}
async function hasOpusAccessAsync() {
  let e = await getSubscriptionTypeAsync();
  return e === "max" || e === "enterprise" || e === "team" || e === "pro" || e === null;
}
async function getRateLimitTierAsync() {
  let e = hvr();
  if (e !== null) return e;
  if (!(await isAnthropicAuthEnabledAsync())) return null;
  let t = await getClaudeAIOAuthTokensAsync();
  if (!t) return null;
  return t.rateLimitTier ?? null;
}
async function getSeatTierAsync() {
  return (await getOauthAccountInfoAsync())?.seatTier ?? null;
}
async function isMaxSubscriberAsync() {
  return (await getSubscriptionTypeAsync()) === "max";
}
async function isTeamSubscriberAsync() {
  return (await getSubscriptionTypeAsync()) === "team";
}
async function isTeamPremiumSubscriberAsync() {
  return (await getSubscriptionTypeAsync()) === "team" && (await getRateLimitTierAsync()) === "default_claude_max_5x";
}
async function isEnterpriseSubscriberAsync() {
  return (await getSubscriptionTypeAsync()) === "enterprise";
}
async function isEnterprisePAYGSubscriberAsync() {
  return (await getSubscriptionTypeAsync()) === "enterprise" && (await getSeatTierAsync()) === "enterprise_usage_based";
}
async function isProSubscriberAsync() {
  return (await getSubscriptionTypeAsync()) === "pro";
}
async function getSubscriptionNameAsync() {
  switch (await getSubscriptionTypeAsync()) {
    case "enterprise":
      return "Claude Enterprise";
    case "team":
      return "Claude Team";
    case "max":
      return "Claude Max";
    case "pro":
      return "Claude Pro";
    default:
      return "Claude API";
  }
}
async function isConsumerSubscriberAsync() {
  let e = await getSubscriptionTypeAsync();
  return (await isClaudeAISubscriberAsync()) && e !== null && oni(e);
}
async function getAccountInformationAsync() {
  if (getAPIProvider() !== "firstParty") return;
  let {
      source: t
    } = await getAuthTokenSourceAsync(),
    n = {};
  if (t === "CLAUDE_CODE_OAUTH_TOKEN" || t === "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR") n.tokenSource = t;else if (await isClaudeAISubscriberAsync()) n.subscription = await getSubscriptionNameAsync();else if (t !== "profile") n.tokenSource = t;
  let {
    key: r,
    source: o
  } = await getAnthropicApiKeyWithSourceAsync();
  if (r) n.apiKeySource = o;
  if (t === "claude.ai" || o === "/login managed key") {
    let i = (await getOauthAccountInfoAsync())?.organizationName;
    if (i) n.organization = i;
  }
  let s = (await getOauthAccountInfoAsync())?.emailAddress;
  if ((t === "claude.ai" || o === "/login managed key") && s) n.email = s;
  return n;
}
function MGu() {
  let e = !1;
  try {
    e = hasAnthropicApiKeyAuth();
  } catch {}
  if (e || !!je.ANTHROPIC_AUTH_TOKEN || !!je.CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR || !!getConfiguredApiKeyHelper()) return !0;
  return getAPIProvider() === "firstParty" && !shouldUseWIFAuth() && !isAnthropicAuthEnabled();
}
async function validateForceLoginOrg() {
  let e = getSettingsForSource("policySettings"),
    t = e?.forceLoginOrgUUID,
    n = t !== void 0 || e?.forceLoginMethod !== void 0;
  if (je.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST) {
    if (n) isTmuxControlMode("auth_force_login_org", "managed_by_host_under_pin");
    return {
      valid: !0
    };
  }
  if (process.env.ANTHROPIC_UNIX_SOCKET) {
    let u = {
      api_provider: fromEnum(getAPIProvider()),
      auth_token_source: fromEnum(getAuthTokenSource().source)
    };
    if (!isAnthropicAuthEnabled() && n) isTmuxControlMode("auth_force_login_org", "unix_socket_3p_under_pin", u);else if (isAnthropicAuthEnabled() && t !== void 0) isTmuxControlMode("auth_force_login_org", "unix_socket_ssh_under_pin", u);else if (e === null && getPolicySettingsLoadErrors().length > 0) isTmuxControlMode("auth_force_login_org", "unix_socket_unreadable_policy", u);else Ie("auth_force_login_org");
    return {
      valid: !0
    };
  }
  if (!isAnthropicAuthEnabled()) {
    if (n && MGu()) return {
      valid: !1,
      message: `This machine's managed settings require a first-party login, but an
Anthropic-issued credential (ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN,
or apiKeyHelper) is configured. A non-OAuth Anthropic credential
cannot satisfy the org pin.

Remove the credential and run: claude auth login

If this is a third-party desktop session: forceLoginOrgUUID targets first-party OAuth and should be removed from managed-settings.json.`
    };
    return {
      valid: !0
    };
  }
  if (t === void 0) {
    if (e === null) {
      let d = getPolicySettingsLoadErrors()[0];
      if (d) {
        let p = d.message.includes("could not be read"),
          m = d.message.match(NGu),
          f = cni.find(g => g === m?.[1]),
          A = p ? fromEnumOpt(f) ?? Qe("other") : Qe("malformed");
        return await TA("auth_force_login_org", "policy_unreadable_fail_close", {
          errno: A
        }), {
          valid: !1,
          message: `Unable to read managed policy settings.
This machine may require organization login enforcement, but the policy file failed to load.
Contact your administrator.

Detail: ${d.file ? `${d.file}: ${d.message}` : d.message}`
        };
      }
    }
    return {
      valid: !0
    };
  }
  let r = typeof t === "string" ? [t] : t;
  if (r.length === 0) return {
    valid: !1,
    message: `forceLoginOrgUUID in managed settings is set to an empty array.
No organizations are permitted. This is almost certainly a misconfiguration.
Contact your administrator.`
  };
  let o = r.length === 1 ? `organization ${r[0]}` : `one of these organizations: ${r.join(", ")}`;
  await checkAndRefreshOAuthTokenIfNeeded();
  let s = getClaudeAIOAuthTokens();
  if (!s) return {
    valid: !0
  };
  let {
      source: i
    } = getAuthTokenSource(),
    a = i === "CLAUDE_CODE_OAUTH_TOKEN" || i === "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR",
    l = await ocn(s.accessToken);
  if (!l) return {
    valid: !1,
    message: `Unable to verify organization for the current authentication token.
This machine requires ${o} but the token could not be validated.
This may be a network error, or the token may have been revoked.
Try again, or run: claude auth login`
  };
  let c = l.organization_uuid;
  if (r.includes(c)) return {
    valid: !0
  };
  if (a) return {
    valid: !1,
    message: `The ${i === "CLAUDE_CODE_OAUTH_TOKEN" ? "CLAUDE_CODE_OAUTH_TOKEN" : "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR"} environment variable provides a token for a
different organization than required by this machine's managed settings.

Required: ${o}
Token organization: ${c}

Remove the environment variable or obtain a token for a permitted organization.`
  };
  return {
    valid: !1,
    message: `Your authentication token belongs to organization ${c},
but this machine requires ${o}.

Please log in with a permitted organization: claude auth login`
  };
}
var BLr,
  wkt,
  FLr,
  JWu = 300000,
  Kti,
  zti,
  SDK_OAUTH_REFRESH_ENTRYPOINTS,
  t5 = null,
  ffe = null,
  fXe = 0,
  eGu = 3600000,
  jti = 300000,
  tGu = 60000,
  nGu = 30000,
  shn = null,
  jBe = null,
  OLr = 0,
  oGu = 180000,
  refreshAndGetAwsCredentials,
  iGu = 5000,
  aGu = 3600000,
  cGu = 180000,
  refreshGcpCredentialsIfNeeded,
  getApiKeyFromConfigOrMacOSKeychain,
  ihn,
  getClaudeAIOAuthTokens,
  Gti = 0,
  Vti = null,
  PLr,
  Skt = null,
  getClaudeAIOAuthTokensAsync,
  Tkt = null,
  hGu = 5,
  bkt = null,
  NLr = 0,
  mXe = null,
  Ekt = null,
  yGu = 1740000,
  getApiKeyFromConfigOrMacOSKeychainAsync,
  cni,
  NGu,
  uni;
var Ao = b(() => {
  cu();
  ta();
  Dc();
  ln();
  Ct();
  yQ();
  li();
  lt();
  zze();
  _me();
  DH();
  G1e();
  Zze();
  pT();
  Acn();
  eYe();
  mRr();
  vun();
  jR();
  Qn();
  qe();
  xH();
  Lr();
  sn();
  bt();
  oa();
  DLr();
  Rn();
  u8();
  vB();
  U8();
  DYe();
  k8();
  yr();
  Xt();
  ykt();
  BLr = require("child_process"), wkt = require("fs/promises"), FLr = require("path");
  Kti = wn(() => {
    logForDebugging(`An Anthropic profile (~/.config/anthropic) is configured, but a claude.ai login exists — using the claude.ai login. Set ANTHROPIC_PROFILE=<name> to use the profile instead.${""}`, {
      level: "warn"
    }), queueMicrotask(() => logEvent("tengu_wif_implicit_profile_skipped_stored_login", {}));
  }), zti = wn(() => {
    let e = getWIFPrecedenceSource() ?? "profile",
      t = e === "profile-implicit" && getWIFAuthType() === "user_oauth";
    logForDebugging(`Using Anthropic profile auth (${e}); ${t ? "a claude.ai login (/login) would take precedence over it" : "this takes precedence over any stored claude.ai login"}`, {
      level: "info"
    });
  });
  SDK_OAUTH_REFRESH_ENTRYPOINTS = new Set(["claude-desktop", "local-agent", "claude-vscode"]);
  refreshAndGetAwsCredentials = qMe(async () => {
    let e = performance.now();
    logForDebugging("[API:auth] AWS credential resolve start");
    let t = await rGu(),
      n = await sGu();
    if (t || n) await a$s();
    return logForDebugging(`[API:auth] AWS credential resolve done in ${Math.round(performance.now() - e)}ms`), n;
  }, e => {
    let t = e?.expiration,
      n = t === void 0 ? void 0 : t - Date.now();
    if (n === void 0 || n <= jti + tGu) return eGu;
    return n - jti;
  });
  refreshGcpCredentialsIfNeeded = qMe(async () => await lGu(), aGu);
  getApiKeyFromConfigOrMacOSKeychain = wn(() => {
    if (dp()) return null;
    {
      let t = getLegacyApiKeyPrefetchResult();
      if (t) {
        if (t.stdout) return {
          key: t.stdout,
          source: "/login managed key"
        };
      } else {
        let n = m1();
        try {
          let r = execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING(`security find-generic-password -a "${OO()}" -w -s "${n}"`);
          if (r) return {
            key: r,
            source: "/login managed key"
          };
        } catch (r) {
          logForDebugging(`Failed to read API key from macOS keychain: ${r}`, {
            level: "error"
          });
        }
      }
    }
    let e = getGlobalConfig();
    if (!e.primaryApiKey) return null;
    return {
      key: e.primaryApiKey,
      source: "/login managed key"
    };
  });
  ihn = new Set();
  getClaudeAIOAuthTokens = wn(() => {
    if (dp()) return null;
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return {
      accessToken: process.env.CLAUDE_CODE_OAUTH_TOKEN,
      refreshToken: null,
      expiresAt: null,
      scopes: Wti(),
      subscriptionType: process.env.CLAUDE_CODE_SUBSCRIPTION_TYPE || null,
      rateLimitTier: process.env.CLAUDE_CODE_RATE_LIMIT_TIER || null
    };
    let e = x8();
    if (e) return {
      accessToken: e,
      refreshToken: null,
      expiresAt: null,
      scopes: getOauthScopesFromFd() ?? Wti(),
      subscriptionType: process.env.CLAUDE_CODE_SUBSCRIPTION_TYPE || null,
      rateLimitTier: process.env.CLAUDE_CODE_RATE_LIMIT_TIER || null
    };
    try {
      let r = dc().read()?.claudeAiOauth;
      if (!r?.accessToken) return null;
      return r;
    } catch (t) {
      return De(t), null;
    }
  });
  PLr = new Map();
  getClaudeAIOAuthTokensAsync = Hbt(async () => {
    if (dp()) return null;
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN || x8()) return getClaudeAIOAuthTokens();
    try {
      let n = (await dc().readAsync())?.claudeAiOauth;
      if (!n?.accessToken) return null;
      return n;
    } catch (e) {
      return De(e), null;
    }
  });
  getApiKeyFromConfigOrMacOSKeychainAsync = Hbt(async () => {
    if (dp()) return null;
    {
      let t = getLegacyApiKeyPrefetchResult();
      if (t) {
        if (t.stdout) return {
          key: t.stdout,
          source: "/login managed key"
        };
      } else {
        let n = m1();
        try {
          let o = (await execFileNoThrow("security", ["find-generic-password", "-a", OO(), "-w", "-s", n])).stdout.trim();
          if (o) return {
            key: o,
            source: "/login managed key"
          };
        } catch (r) {
          logForDebugging(`Failed to read API key from macOS keychain: ${r}`, {
            level: "error"
          });
        }
      }
    }
    let e = getGlobalConfig();
    if (!e.primaryApiKey) return null;
    return {
      key: e.primaryApiKey,
      source: "/login managed key"
    };
  });
  cni = ["EACCES", "EPERM", "EBUSY", "EIO", "EISDIR", "ELOOP"], NGu = new RegExp(`\\b(${cni.join("|")})\\b`);
  uni = class uni extends Error {};
});
export {c$,AXe,isFirstPartyManagedOAuthContext,clearWIFAuthDebugOnceCacheForTesting,shouldUseWIFAuth,isWIFDispatchAuth,restoreGatewayAuth,isAnthropicAuthEnabled,describeHowToDisableAuthTokenSource,getAuthTokenSource,getAnthropicApiKey,getAdditionalModelOptionsCache,hasAnthropicDirectApiKey,hasAnthropicApiKeyAuth,hasAnthropicApiKey,getAnthropicApiKeyWithSource,getConfiguredApiKeyHelper,Yti,qLr,isAwsAuthRefreshFromProjectSettings,WLr,isAwsCredentialExportFromProjectSettings,calculateApiKeyHelperTTL,getApiKeyHelperElapsedMs,getApiKeyFromApiKeyHelper,qti,ZWu,getApiKeyFromApiKeyHelperCached,clearApiKeyHelperCache,prefetchApiKeyFromApiKeyHelperIfSafe,rGu,refreshAwsAuth,sGu,clearAwsCredentialsCache,resetAwsAuthRefreshCooldown,zLr,isGcpAuthRefreshFromProjectSettings,checkGcpCredentialsValid,lGu,refreshGcpAuth,clearGcpCredentialsCache,prefetchGcpCredentialsIfSafe,prefetchAwsCredentialsAndBedRockInfoIfSafe,uGu,saveApiKey,isCustomApiKeyApproved,removeApiKey,eni,saveOAuthTokensIfNeeded,__resetKnownDeadRefreshTokensForTest,isOAuthRefreshKnownDead,Wti,clearOAuthTokenCache,resetEnvDerivedAuthCaches,mGu,handleOAuth401Error,waitForRotatedEnvToken,fGu,noteAuthRecoveryOutcome,resetAuthFailureTracking,AGu,readFreshOAuthAccessToken,oauthRefreshLockOptions,acquireOAuthRefreshLock,withOAuthRefreshLock,checkAndRefreshOAuthTokenIfNeeded,checkAndRefreshOAuthTokenIfNeededWithOutcome,MLr,isClaudeAISubscriber,hasProfileScope,hasStoredOAuthToken,hasOAuthScope,getStoredOAuthTokenExpiresAt,getStoredOAuthSubscriptionType,hasStoredOAuthRefreshToken,is1PApiCustomer,getOauthAccountInfo,isOverageProvisioningAllowed,hasOpusAccess,getSubscriptionType,isMaxSubscriber,isTeamSubscriber,isTeamPremiumSubscriber,isEnterpriseSubscriber,isEnterprisePAYGSubscriber,isProSubscriber,getRateLimitTier,getSeatTier,getSubscriptionName,isUsing3PServices,nMr,isOtelHeadersHelperFromProjectOrLocalSettings,getOtelHeadersHelperLastFailure,clearOtelHeadersCache,getOtelHeadersFromHelper,oni,isConsumerSubscriber,getAccountInformation,toAccountInfo,getAnthropicApiKeyWithSourceAsync,getAnthropicApiKeyAsync,hasAnthropicApiKeyAuthAsync,isAnthropicAuthEnabledAsync,getAuthTokenSourceAsync,isClaudeAISubscriberAsync,hasProfileScopeAsync,is1PApiCustomerAsync,getOauthAccountInfoAsync,isOverageProvisioningAllowedAsync,getSubscriptionTypeAsync,hasOpusAccessAsync,getRateLimitTierAsync,getSeatTierAsync,isMaxSubscriberAsync,isTeamSubscriberAsync,isTeamPremiumSubscriberAsync,isEnterpriseSubscriberAsync,isEnterprisePAYGSubscriberAsync,isProSubscriberAsync,getSubscriptionNameAsync,isConsumerSubscriberAsync,getAccountInformationAsync,MGu,validateForceLoginOrg,BLr,wkt,FLr,JWu,Kti,zti,SDK_OAUTH_REFRESH_ENTRYPOINTS,t5,ffe,fXe,eGu,jti,tGu,nGu,shn,jBe,OLr,oGu,refreshAndGetAwsCredentials,iGu,aGu,cGu,refreshGcpCredentialsIfNeeded,getApiKeyFromConfigOrMacOSKeychain,ihn,getClaudeAIOAuthTokens,Gti,Vti,PLr,Skt,getClaudeAIOAuthTokensAsync,Tkt,hGu,bkt,NLr,mXe,Ekt,yGu,getApiKeyFromConfigOrMacOSKeychainAsync,cni,NGu,uni,Ao};
