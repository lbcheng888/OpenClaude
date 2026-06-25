// @ts-nocheck
import {ft,x,b} from "../../runtime.ts";
import {nt} from "../../vendor/m127.ts";
import {xK,rI} from "./0586_rI.ts";
import {isWIFActive as Kdn,getWIFPrecedenceSource as q5,getWIFAuthType as $Ne,JJe} from "../../vendor/m1293.ts";
import {Ed,rA,dl,dn} from "./0137_namespace.ts";
import {W5,tkt,Zdn} from "./1296_recursive.ts";
import {shouldUseClaudeAIAuth as _2,isOAuthTokenExpired as yQ,refreshOAuthToken as _Q,isInvalidGrantError as EAe,aI} from "./1293_storeOAuthAccountInfo.ts";
import {ql,e8} from "../../vendor/m1485.ts";
import {getIsNonInteractiveSession as kr,setGatewayAuth as ZLe,preferThirdPartyAuthentication as MKe,getSdkOAuthTokenRefreshCallback as uSt,setOauthTokenFromFd as _X,setOauthScopesFromFd as RSt,lt,getOauthScopesFromFd as sar} from "../session/0132_sent.ts";
import {aBr,lBr} from "../../vendor/m2033.ts";
import {logForDebugging as A,logAntError as V9,qe} from "./0236_setHasFormattedOutput.ts";
import {Ce,Jo,__export as j_,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {isFirstPartyProvider as Nl,getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {getSettings_DEPRECATED as $o,getSettingsForSource as An,getPolicySettingsLoadErrors as uvt,br} from "./0745_updateSettingsForSource.ts";
import {getGlobalConfig as Ot,checkHasTrustDialogAccepted as kd,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {sF,MBs,XJe} from "../../vendor/m1297.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Nv,Kb,zN} from "../../vendor/m688.ts";
import {t5s,e5s,q0r,n5s} from "../../vendor/m1448.ts";
import {sD,cmn} from "../../vendor/m1449.ts";
import {qt,tn} from "./0230_encoding.ts";
import {Eyn} from "../../vendor/m2018.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {Kp,gQ} from "../../vendor/m1287.ts";
import {wM,ZP,d7,u7,G5} from "../../vendor/m1296.ts";
import {clearLegacyApiKeyPrefetch as rfn,IXe,getLegacyApiKeyPrefetchResult as nfn} from "../../vendor/m1483.ts";
import {isUltraReviewAvailable as VQ,MR} from "./2033_allowed.ts";
import {Efe,K0t} from "../../vendor/m2034.ts";
import {Ne} from "../../vendor/m583.ts";
import {He,xe,Pt,Qu,mn} from "../telemetry/0600_feature_name.ts";
import {zg} from "../../vendor/m1479.ts";
import {Js,rT} from "../../vendor/m1294.ts";
import {CLAUDE_AI_PROFILE_SCOPE as DEe,Sc} from "../api/0465_getOauthConfig.ts";
import {zHr,KHr,VHr,qoe} from "../../vendor/m1290.ts";
import {Le,Bo,Ve} from "../../vendor/m5.ts";
import {qdn,BNe} from "../../vendor/m1291.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {VJe} from "../session/1289_getAccessToken.ts";
import {Ir} from "../../vendor/m584.ts";
import {Ii,execFileNoThrow as Fn} from "../../vendor/m690.ts";
import {v5,L1e,nRt} from "../../vendor/m643.ts";
import {execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING as poe} from "../../vendor/m689.ts";
var D2 = {};
ft(D2, {
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
  getModelAccessCache: () => getModelAccessCache,
  getConfiguredAwsAuthRefresh: () => getConfiguredAwsAuthRefresh,
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
/** True when running in a first-party managed remote context (Claude Code remote / hosted). */
function fZe() {
  return nt(process.env.CLAUDE_CODE_REMOTE) || xK();
}
function isFirstPartyManagedOAuthContext() {
  return fZe() && !process.env.CLAUDE_CODE_HOST_AUTH_ENV_VAR && process.env.CLAUDE_CODE_ENTRYPOINT !== "claude-desktop-3p";
}
function clearWIFAuthDebugOnceCacheForTesting() {
  Wai.cache.clear?.(), Gai.cache.clear?.();
}
function shouldUseWIFAuth() {
  if (!Kdn()) return !1;
  if (Ed() || process.env.ANTHROPIC_UNIX_SOCKET || fZe() || process.env.ANTHROPIC_AUTH_TOKEN || process.env.CLAUDE_CODE_OAUTH_TOKEN || W5() || getConfiguredApiKeyHelper() || nt(process.env.CLAUDE_CODE_USE_BEDROCK) || nt(process.env.CLAUDE_CODE_USE_VERTEX) || nt(process.env.CLAUDE_CODE_USE_FOUNDRY) || nt(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) || nt(process.env.CLAUDE_CODE_USE_MANTLE)) return !1;
  if (q5() === "profile-implicit") {
    let storedTokens = getClaudeAIOAuthTokens();
    if (_2(storedTokens?.scopes) && storedTokens?.accessToken && $Ne() === "user_oauth") return Wai(), !1;
  }
  return Gai(), !0;
}
function isWIFDispatchAuth() {
  return getAnthropicApiKey() === null && shouldUseWIFAuth();
}
async function restoreGatewayAuth() {
  try {
    let config = await ql().readAsync(),
      gateway = config?.enterpriseGateway;
    if (!gateway) return;
    let hostname = new URL(gateway.url).hostname,
      pinnedFingerprint = config?.gatewayTrust?.[hostname];
    if (!pinnedFingerprint) {
      if (!kr()) process.stderr.write(`Cloud gateway ${hostname} is not trusted on this machine — run /login to reconnect.
`);
      return;
    }
    if (gateway.expiresAt <= Date.now() && !gateway.idpRefreshToken) {
      if (!kr()) process.stderr.write(`Cloud gateway session expired — run /login to reconnect.
`);
      return;
    }
    try {
      let probe = await aBr(gateway.url, 3000);
      if (probe.fingerprint !== pinnedFingerprint) {
        if (!kr()) process.stderr.write(`Cloud gateway ${hostname} TLS certificate changed since you connected — run /login to verify and reconnect.
`);
        A(`[gateway] TLS fingerprint mismatch on restore for ${hostname}: pinned ${pinnedFingerprint}, live ${probe.fingerprint}`, {
          level: "warn"
        });
        return;
      }
    } catch (probeErr) {
      A(`[gateway] TLS fingerprint probe failed on restore for ${hostname} (${Ce(probeErr)}); proceeding without re-verify`);
    }
    ZLe(gateway);
  } catch (err) {
    Ie(err);
  }
}
function isAnthropicAuthEnabled() {
  if (Ed()) return !1;
  if (process.env.ANTHROPIC_UNIX_SOCKET) return !!process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (shouldUseWIFAuth()) return !1;
  let isThirdParty = !Nl(),
    apiKeyHelper = ($o() || {}).apiKeyHelper,
    authToken = rA() ? void 0 : process.env.ANTHROPIC_AUTH_TOKEN,
    keySource;
  try {
    keySource = getAnthropicApiKeyWithSource({
      skipRetrievingKeyFromApiKeyHelper: !0
    }).source;
  } catch {
    return !1;
  }
  let hasDirectKeySource = keySource === "ANTHROPIC_API_KEY" || keySource === "apiKeyHelper",
    keyFileDescriptor = process.env.CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR,
    hasNonOAuthCredential = (authToken || hasDirectKeySource) && !isFirstPartyManagedOAuthContext() || (apiKeyHelper || keyFileDescriptor) && !fZe();
  return !(isThirdParty || hasNonOAuthCredential);
}
function describeHowToDisableAuthTokenSource(source) {
  switch (source) {
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
      return `Unset the ${source} environment variable.`;
  }
}
function getAuthTokenSource() {
  if (Ed()) {
    if (getConfiguredApiKeyHelper()) return {
      source: "apiKeyHelper",
      hasToken: !0
    };
    return {
      source: "none",
      hasToken: !1
    };
  }
  if (process.env.ANTHROPIC_AUTH_TOKEN && !isFirstPartyManagedOAuthContext() && !rA()) return {
    source: "ANTHROPIC_AUTH_TOKEN",
    hasToken: !0
  };
  if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return {
    source: "CLAUDE_CODE_OAUTH_TOKEN",
    hasToken: !0
  };
  if (W5()) {
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR) return {
      source: "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR",
      hasToken: !0
    };
    return {
      source: "CCR_OAUTH_TOKEN_FILE",
      hasToken: !0
    };
  }
  if (getConfiguredApiKeyHelper() && !fZe()) return {
    source: "apiKeyHelper",
    hasToken: !0
  };
  if (shouldUseWIFAuth()) return {
    source: "profile",
    hasToken: !0
  };
  let storedTokens = getClaudeAIOAuthTokens();
  if (_2(storedTokens?.scopes) && storedTokens?.accessToken) return {
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
    key
  } = getAnthropicApiKeyWithSource();
  return key;
}
function getAdditionalModelOptionsCache() {
  let cache = Ot().additionalModelOptionsCache;
  return (Array.isArray(cache) ? cache : []).filter(entry => entry != null && typeof entry === "object" && (typeof entry.value === "string" || entry.value === null) && typeof entry.label === "string" && typeof entry.description === "string");
}
function getModelAccessCache() {
  let cache = Ot().modelAccessCache;
  return (Array.isArray(cache) ? cache : []).filter(entry => entry != null && typeof entry === "object" && typeof entry.apiName === "string" && typeof entry.entitled === "boolean");
}
function hasAnthropicDirectApiKey() {
  if (process.env.ANTHROPIC_AUTH_TOKEN) return !1;
  let {
    key,
    source
  } = getAnthropicApiKeyWithSource();
  if (!key || source === "/login managed key") return !1;
  return key.startsWith("sk-ant-") && key.slice(7, 10) === "api";
}
function hasAnthropicApiKeyAuth() {
  let {
    key,
    source
  } = getAnthropicApiKeyWithSource({
    skipRetrievingKeyFromApiKeyHelper: !0
  });
  return key !== null && source !== "none";
}
function hasAnthropicApiKey() {
  return getAnthropicApiKey() != null;
}
function getAnthropicApiKeyWithSource(options = {}) {
  if (Ed()) {
    if (process.env.ANTHROPIC_API_KEY) return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
    if (getConfiguredApiKeyHelper()) return {
      key: options.skipRetrievingKeyFromApiKeyHelper ? null : getApiKeyFromApiKeyHelperCached(),
      source: "apiKeyHelper"
    };
    return {
      key: null,
      source: "none"
    };
  }
  let envApiKey = rA() ? void 0 : process.env.ANTHROPIC_API_KEY;
  if (MKe() && envApiKey) return {
    key: envApiKey,
    source: "ANTHROPIC_API_KEY"
  };
  if (nt(!1)) {
    let legacyKey = tkt();
    if (legacyKey) return {
      key: legacyKey,
      source: "ANTHROPIC_API_KEY"
    };
    if (!envApiKey && !process.env.CLAUDE_CODE_OAUTH_TOKEN && !process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR && !process.env.ANTHROPIC_AUTH_TOKEN && !shouldUseWIFAuth() && Nl()) throw Error("ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN, or WIF env vars (ANTHROPIC_FEDERATION_RULE_ID + ANTHROPIC_ORGANIZATION_ID) required");
    if (envApiKey) return {
      key: envApiKey,
      source: "ANTHROPIC_API_KEY"
    };
    return {
      key: null,
      source: "none"
    };
  }
  if (envApiKey && Ot().customApiKeyResponses?.approved?.includes(sF(envApiKey))) return {
    key: envApiKey,
    source: "ANTHROPIC_API_KEY"
  };
  let legacyKey = tkt();
  if (legacyKey) return {
    key: legacyKey,
    source: "ANTHROPIC_API_KEY"
  };
  if (getConfiguredApiKeyHelper()) {
    if (options.skipRetrievingKeyFromApiKeyHelper) return {
      key: null,
      source: "apiKeyHelper"
    };
    return {
      key: getApiKeyFromApiKeyHelperCached(),
      source: "apiKeyHelper"
    };
  }
  let keychainResult = getApiKeyFromConfigOrMacOSKeychain();
  if (keychainResult) return keychainResult;
  return {
    key: null,
    source: "none"
  };
}
function getConfiguredApiKeyHelper() {
  if (Ed()) return An("flagSettings")?.apiKeyHelper;
  return ($o() || {}).apiKeyHelper;
}
/** True when the configured apiKeyHelper originates from project- or local-scoped settings (untrusted source). */
function Vai() {
  let helper = getConfiguredApiKeyHelper();
  if (!helper) return !1;
  let projectSettings = An("projectSettings"),
    localSettings = An("localSettings");
  return projectSettings?.apiKeyHelper === helper || localSettings?.apiKeyHelper === helper;
}
function getConfiguredAwsAuthRefresh() {
  return ($o() || {}).awsAuthRefresh;
}
function isAwsAuthRefreshFromProjectSettings() {
  let refresh = getConfiguredAwsAuthRefresh();
  if (!refresh) return !1;
  let projectSettings = An("projectSettings"),
    localSettings = An("localSettings");
  return projectSettings?.awsAuthRefresh === refresh || localSettings?.awsAuthRefresh === refresh;
}
/** Returns the configured awsCredentialExport command from settings, if any. */
function yBr() {
  return ($o() || {}).awsCredentialExport;
}
function isAwsCredentialExportFromProjectSettings() {
  let exportCmd = yBr();
  if (!exportCmd) return !1;
  let projectSettings = An("projectSettings"),
    localSettings = An("localSettings");
  return projectSettings?.awsCredentialExport === exportCmd || localSettings?.awsCredentialExport === exportCmd;
}
function calculateApiKeyHelperTTL() {
  let ttlEnv = process.env.CLAUDE_CODE_API_KEY_HELPER_TTL_MS;
  if (ttlEnv) {
    let parsed = parseInt(ttlEnv, 10);
    if (!Number.isNaN(parsed) && parsed >= 0) return parsed;
    A(`Found CLAUDE_CODE_API_KEY_HELPER_TTL_MS env var, but it was not a valid number. Got ${ttlEnv}`, {
      level: "error"
    });
  }
  return fed;
}
function getApiKeyHelperElapsedMs() {
  let startedAt = Cfe?.startedAt;
  return startedAt ? Date.now() - startedAt : 0;
}
async function getApiKeyFromApiKeyHelper(skipTrustCheck) {
  if (!getConfiguredApiKeyHelper()) return null;
  let ttl = calculateApiKeyHelperTTL();
  if (g8) {
    if (Date.now() - g8.timestamp < ttl) return g8.value;
    if (!Cfe) Cfe = {
      promise: Fai(skipTrustCheck, !1, mZe),
      startedAt: null
    };
    return g8.value;
  }
  if (Cfe) return Cfe.promise;
  return Cfe = {
    promise: Fai(skipTrustCheck, !0, mZe),
    startedAt: Date.now()
  }, Cfe.promise;
}
async function Fai(skipTrustCheck, isFirstFetch, cacheGeneration) {
  try {
    let value = await _ed(skipTrustCheck);
    if (cacheGeneration !== mZe) return value;
    if (value !== null) g8 = {
      value,
      timestamp: Date.now()
    };
    return value;
  } catch (err) {
    if (cacheGeneration !== mZe) return " ";
    let message = err instanceof Error ? err.message : String(err);
    if (console.error(bt.red(`apiKeyHelper failed: ${message}`)), A(`Error getting API key from apiKeyHelper: ${message}`, {
      level: "error"
    }), !isFirstFetch && g8 && g8.value !== " ") return g8 = {
      ...g8,
      timestamp: Date.now()
    }, g8.value;
    return g8 = {
      value: " ",
      timestamp: Date.now()
    }, " ";
  } finally {
    if (cacheGeneration === mZe) Cfe = null;
  }
}
async function _ed(skipTrustCheck) {
  let helper = getConfiguredApiKeyHelper();
  if (!helper) return null;
  if (Vai()) {
    if (!kd() && !skipTrustCheck) {
      let err = Error(`Security: apiKeyHelper executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.FEEDBACK_CHANNEL}.`);
      return V9("apiKeyHelper invoked before trust check", err), W("tengu_apiKeyHelper_missing_trust11", {}), null;
    }
  }
  let result = await Nv(helper, {
    timeout: 600000,
    reject: !1
  });
  if (result.failed) {
    let reason = result.timedOut ? "timed out" : `exited ${result.exitCode}`,
      stderr = result.stderr?.trim();
    throw Error(stderr ? `${reason}: ${stderr}` : reason);
  }
  let stdout = result.stdout?.trim();
  if (!stdout) throw Error("did not return a value");
  return stdout;
}
function getApiKeyFromApiKeyHelperCached() {
  return g8?.value ?? null;
}
function clearApiKeyHelperCache() {
  mZe++, g8 = null, Cfe = null;
}
function prefetchApiKeyFromApiKeyHelperIfSafe(skipTrustCheck) {
  if (Vai() && !kd()) return;
  getApiKeyFromApiKeyHelper(skipTrustCheck);
}
/** Refresh AWS credentials via the configured awsAuthRefresh command, unless caller identity already works. */
async function bed() {
  let refreshCmd = getConfiguredAwsAuthRefresh(),
    cooldownGeneration = uBr;
  if (!refreshCmd) return !1;
  if (isAwsAuthRefreshFromProjectSettings()) {
    if (!kd() && !kr()) {
      let err = Error(`Security: awsAuthRefresh executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.FEEDBACK_CHANNEL}.`);
      return V9("awsAuthRefresh invoked before trust check", err), W("tengu_awsAuthRefresh_missing_trust", {}), !1;
    }
  }
  if (BBe) return BBe;
  try {
    return A("Fetching AWS caller identity for AWS auth refresh command"), await t5s(), A("Fetched AWS caller identity, skipping AWS auth refresh command"), !1;
  } catch {
    if (BBe) return BBe;
    if (Byn !== null && Date.now() - Byn < Sed) return !1;
    return BBe = (async () => {
      try {
        return await refreshAwsAuth(refreshCmd);
      } finally {
        if (cooldownGeneration === uBr) Byn = Date.now();
        BBe = null;
      }
    })(), BBe;
  }
}
function refreshAwsAuth(command, abortSignal) {
  A("Running AWS auth refresh command");
  let authStatus = sD.getInstance();
  return authStatus.startAuthentication(), new Promise(resolve => {
    let child = fBr.exec(command, {
      timeout: Eed,
      signal: abortSignal,
      windowsHide: !0
    });
    child.stdout.on("data", chunk => {
      let line = chunk.toString().trim();
      if (line) authStatus.addOutput(line), A(line, {
        level: "debug"
      });
    }), child.stderr.on("data", chunk => {
      let line = chunk.toString().trim();
      if (line) authStatus.setError(line), A(line, {
        level: "error"
      });
    }), child.on("close", (exitCode, signal) => {
      if (exitCode === 0) A("AWS auth refresh completed successfully"), authStatus.endAuthentication(!0), resolve(!0);else {
        let aborted = abortSignal?.aborted === !0,
          errorMessage = aborted ? null : !aborted && signal === "SIGTERM" ? bt.red("AWS auth refresh timed out after 3 minutes. Run your auth command manually in a separate terminal.") : bt.red("Error running awsAuthRefresh (in settings or ~/.claude.json):");
        if (errorMessage) console.error(errorMessage);
        authStatus.endAuthentication(!1), resolve(!1);
      }
    });
  });
}
/** Runs the configured awsCredentialExport command and parses STS credentials from its JSON output. */
async function Ced() {
  let exportCmd = yBr();
  if (!exportCmd) return null;
  if (isAwsCredentialExportFromProjectSettings()) {
    if (!kd() && !kr()) {
      let err = Error(`Security: awsCredentialExport executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.FEEDBACK_CHANNEL}.`);
      return V9("awsCredentialExport invoked before trust check", err), W("tengu_awsCredentialExport_missing_trust", {}), null;
    }
  }
  try {
    A("Running AWS credential export command");
    let result = await Nv(exportCmd, {
      reject: !1
    });
    if (result.exitCode !== 0 || !result.stdout) throw Error("awsCredentialExport did not return a valid value");
    let parsed = qt(result.stdout.trim()),
      credentials = e5s(parsed);
    if (!credentials) throw Error("awsCredentialExport did not return valid AWS STS output structure");
    A("AWS credentials retrieved from awsCredentialExport");
    let expirationRaw = credentials.Expiration,
      expirationMs = typeof expirationRaw === "string" ? Date.parse(expirationRaw) : NaN;
    return {
      accessKeyId: credentials.AccessKeyId,
      secretAccessKey: credentials.SecretAccessKey,
      sessionToken: credentials.SessionToken,
      expiration: Number.isFinite(expirationMs) ? expirationMs : void 0
    };
  } catch (err) {
    let errorPrefix = bt.red("Error getting AWS credentials from awsCredentialExport (in settings or ~/.claude.json):");
    if (err instanceof Error) console.error(errorPrefix, err.message);else console.error(errorPrefix, err);
    return null;
  }
}
function clearAwsCredentialsCache() {
  refreshAndGetAwsCredentials.cache.clear();
}
function resetAwsAuthRefreshCooldown() {
  Byn = null, uBr++;
}
/** Returns the configured gcpAuthRefresh command from settings, if any. */
function EBr() {
  return ($o() || {}).gcpAuthRefresh;
}
function isGcpAuthRefreshFromProjectSettings() {
  let refresh = EBr();
  if (!refresh) return !1;
  let projectSettings = An("projectSettings"),
    localSettings = An("localSettings");
  return projectSettings?.gcpAuthRefresh === refresh || localSettings?.gcpAuthRefresh === refresh;
}
async function checkGcpCredentialsValid() {
  try {
    let {
        GoogleAuth
      } = await Promise.resolve().then(() => x(Eyn(), 1)),
      auth = new GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/cloud-platform"]
      }),
      tokenPromise = (async () => {
        await (await auth.getClient()).getAccessToken();
      })(),
      timeoutPromise = Kn(Aed).then(() => {
        throw new sli("GCP credentials check timed out");
      });
    return await Promise.race([tokenPromise, timeoutPromise]), !0;
  } catch {
    return !1;
  }
}
/** Refresh GCP credentials via the configured gcpAuthRefresh command, unless current credentials are already valid. */
async function ved() {
  let refreshCmd = EBr();
  if (!refreshCmd) return !1;
  if (isGcpAuthRefreshFromProjectSettings()) {
    if (!kd() && !kr()) {
      let err = Error(`Security: gcpAuthRefresh executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.FEEDBACK_CHANNEL}.`);
      return V9("gcpAuthRefresh invoked before trust check", err), W("tengu_gcpAuthRefresh_missing_trust", {}), !1;
    }
  }
  try {
    if (A("Checking GCP credentials validity for auth refresh"), await checkGcpCredentialsValid()) return A("GCP credentials are valid, skipping auth refresh command"), !1;
  } catch {}
  return refreshGcpAuth(refreshCmd);
}
function refreshGcpAuth(command) {
  A("Running GCP auth refresh command");
  let authStatus = sD.getInstance();
  return authStatus.startAuthentication(), new Promise(resolve => {
    let child = fBr.exec(command, {
      timeout: wed,
      windowsHide: !0
    });
    child.stdout.on("data", chunk => {
      let line = chunk.toString().trim();
      if (line) authStatus.addOutput(line), A(line, {
        level: "debug"
      });
    }), child.stderr.on("data", chunk => {
      let line = chunk.toString().trim();
      if (line) authStatus.setError(line), A(line, {
        level: "error"
      });
    }), child.on("close", (exitCode, signal) => {
      if (exitCode === 0) A("GCP auth refresh completed successfully"), authStatus.endAuthentication(!0), resolve(!0);else {
        let errorMessage = signal === "SIGTERM" ? bt.red("GCP auth refresh timed out after 3 minutes. Run your auth command manually in a separate terminal.") : bt.red("Error running gcpAuthRefresh (in settings or ~/.claude.json):");
        console.error(errorMessage), authStatus.endAuthentication(!1), resolve(!1);
      }
    });
  });
}
function clearGcpCredentialsCache() {
  refreshGcpCredentialsIfNeeded.cache.clear();
}
function prefetchGcpCredentialsIfSafe() {
  if (!EBr()) return;
  if (isGcpAuthRefreshFromProjectSettings()) {
    if (!kd() && !kr()) return;
  }
  refreshGcpCredentialsIfNeeded();
}
function prefetchAwsCredentialsAndBedRockInfoIfSafe() {
  let awsAuthRefresh = getConfiguredAwsAuthRefresh(),
    awsCredentialExport = yBr();
  if (!awsAuthRefresh && !awsCredentialExport) return;
  if (isAwsAuthRefreshFromProjectSettings() || isAwsCredentialExportFromProjectSettings()) {
    if (!kd() && !kr()) return;
  }
  refreshAndGetAwsCredentials(), Kp();
}
/** Validates that an API key contains only alphanumeric characters, dashes, and underscores. */
function ked(apiKey) {
  return /^[a-zA-Z0-9-_]+$/.test(apiKey);
}
async function saveApiKey(apiKey) {
  if (!ked(apiKey)) throw Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");
  await Yai();
  let useKeychain = !0;
  if (useKeychain) {
    let serviceName = wM(),
      account = ZP(),
      hexKey = Buffer.from(apiKey, "utf-8").toString("hex"),
      keychainInput = `add-generic-password -U -a "${account}" -s "${serviceName}" -X "${hexKey}"
`,
      result = await Kb("security", ["-i"], {
        input: keychainInput,
        reject: !1,
        timeout: 5000
      });
    if (result.exitCode !== 0) {
      let errorDetail = (result.stderr || result.stdout || "").trim().replace(/\s*\n\s*/g, "; ");
      throw W("tengu_api_key_keychain_error", {
        error: errorDetail
      }), Error(`Failed to save API key to macOS Keychain${errorDetail ? ` (${errorDetail})` : ""}. Run \`claude doctor\` to diagnose keychain access.`);
    }
    W("tengu_api_key_saved_to_keychain", {});
  } else W("tengu_api_key_saved_to_config", {});
  let keyHash = sF(apiKey);
  hn(config => {
    let approved = config.customApiKeyResponses?.approved ?? [];
    return {
      ...config,
      primaryApiKey: useKeychain ? config.primaryApiKey : apiKey,
      customApiKeyResponses: {
        ...config.customApiKeyResponses,
        approved: approved.includes(keyHash) ? approved : [...approved, keyHash],
        rejected: config.customApiKeyResponses?.rejected ?? []
      }
    };
  }), getApiKeyFromConfigOrMacOSKeychain.cache.clear?.(), rfn(), getApiKeyFromConfigOrMacOSKeychainAsync.cache?.clear?.();
}
function isCustomApiKeyApproved(apiKey) {
  let config = Ot(),
    keyHash = sF(apiKey);
  return config.customApiKeyResponses?.approved?.includes(keyHash) ?? !1;
}
async function removeApiKey() {
  await Yai(), hn(config => ({
    ...config,
    primaryApiKey: void 0
  })), getApiKeyFromConfigOrMacOSKeychain.cache.clear?.(), rfn(), getApiKeyFromConfigOrMacOSKeychainAsync.cache?.clear?.();
}
/** Best-effort removal of the stored API key from the macOS keychain. */
async function Yai() {
  try {
    await MBs();
  } catch (err) {
    A(`Failed to remove API key from macOS keychain: ${Ce(err)}`, {
      level: "error"
    });
  }
}
async function saveOAuthTokensIfNeeded(tokens) {
  if (!_2(tokens.scopes)) return W("tengu_oauth_tokens_not_claude_ai", {}), {
    success: !0
  };
  if (!tokens.refreshToken || !tokens.expiresAt) return W("tengu_oauth_tokens_inference_only", {}), {
    success: !0
  };
  let {
      accessToken,
      refreshToken,
      expiresAt,
      scopes,
      clientId
    } = tokens,
    store = ql(),
    storageBackend = store.name;
  try {
    let result = await store.mutate(config => {
      let existing = config.claudeAiOauth;
      return {
        ...config,
        claudeAiOauth: {
          accessToken,
          refreshToken,
          expiresAt,
          scopes,
          subscriptionType: tokens.subscriptionType ?? existing?.subscriptionType ?? null,
          rateLimitTier: tokens.rateLimitTier ?? existing?.rateLimitTier ?? null,
          clientId
        }
      };
    });
    if (result.success) W("tengu_oauth_tokens_saved", {
      storageBackend
    });else W("tengu_oauth_tokens_save_failed", {
      storageBackend
    });
    return getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.(), VQ(), Efe(), result;
  } catch (err) {
    return A(`Failed to save OAuth tokens: ${Ce(err)}`, {
      level: "error"
    }), W("tengu_oauth_tokens_save_exception", {
      storageBackend,
      error: Ce(err)
    }), {
      success: !1,
      warning: "Failed to save OAuth tokens"
    };
  }
}
function __resetKnownDeadRefreshTokensForTest() {
  Uyn.clear();
}
function isOAuthRefreshKnownDead() {
  let refreshToken = getClaudeAIOAuthTokens()?.refreshToken;
  return refreshToken === "" || !!refreshToken && Uyn.has(refreshToken);
}
/** Returns the OAuth scopes from CLAUDE_CODE_OAUTH_SCOPES env, defaulting to ["user:inference"]. */
function Uai() {
  let scopes = process.env.CLAUDE_CODE_OAUTH_SCOPES?.split(/\s+/).filter(Boolean);
  return scopes?.length ? scopes : ["user:inference"];
}
function clearOAuthTokenCache() {
  getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.(), d7(), VQ(), Efe();
}
function resetEnvDerivedAuthCaches() {
  getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.(), getApiKeyFromConfigOrMacOSKeychain.cache?.clear?.(), getApiKeyFromConfigOrMacOSKeychainAsync.cache?.clear?.(), clearApiKeyHelperCache(), clearAwsCredentialsCache(), resetAwsAuthRefreshCooldown(), clearGcpCredentialsCache(), VQ(), Efe();
}
/** Invalidates the OAuth token cache if the credentials file's mtime changed; falls back to access-token diffing. */
async function xed() {
  try {
    let {
      mtimeMs
    } = await Z0t.stat(hBr.join(u7(), ".credentials.json"));
    if (mtimeMs !== $ai) $ai = mtimeMs, clearOAuthTokenCache();
  } catch {
    getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.();
    let accessToken = (await getClaudeAIOAuthTokensAsync())?.accessToken ?? null;
    if (accessToken !== qai) qai = accessToken, VQ(), Efe();
  }
}
function handleOAuth401Error(failedAccessToken) {
  let inflight = cBr.get(failedAccessToken);
  if (inflight) return inflight;
  let recovery = Ped(failedAccessToken).finally(() => {
    cBr.delete(failedAccessToken);
  });
  return cBr.set(failedAccessToken, recovery), recovery;
}
async function waitForRotatedEnvToken(options) {
  let pollMs = options.pollMs ?? 2000,
    readToken = options.readToken ?? (() => Ne.CLAUDE_CODE_OAUTH_TOKEN ?? W5() ?? void 0),
    sleeper = options.sleeper ?? (ms => Kn(ms)),
    deadline = Date.now() + options.timeoutMs;
  while (Date.now() < deadline) {
    let token = readToken();
    if (token && token !== options.failedAccessToken) return !0;
    await sleeper(Math.min(pollMs, Math.max(1, deadline - Date.now())));
  }
  let finalToken = readToken();
  return Boolean(finalToken && finalToken !== options.failedAccessToken);
}
/** Computes how long to wait for a rotated env token before giving up on OAuth 401 recovery. */
function Ded() {
  let waitMs = Ne.CLAUDE_CODE_OAUTH_401_WAIT_MS;
  if (waitMs !== void 0) return waitMs;
  return Ne.CLAUDE_CODE_REMOTE_SESSION_ID ? 60000 : 0;
}
function noteAuthRecoveryOutcome(outcome) {
  let nowMs = outcome.nowMs ?? Date.now();
  if (outcome.recovered) return j0t = null, "continue";
  if (!(outcome.isRemoteChild ?? Boolean(Ne.CLAUDE_CODE_REMOTE_SESSION_ID))) return "continue";
  let thresholdMs = outcome.thresholdMs ?? Ne.CLAUDE_CODE_AUTH_FAIL_EXIT_MS ?? 600000;
  if (thresholdMs <= 0) return "continue";
  if (j0t === null) return j0t = nowMs, "continue";
  if (nowMs - j0t >= thresholdMs) return "exit";
  return "continue";
}
function resetAuthFailureTracking() {
  j0t = null;
}
/** Attempts to recover from an OAuth 401 by refreshing tokens via SDK callback, disk, env rotation, or keychain. */
async function Ped(failedAccessToken) {
  clearOAuthTokenCache();
  let tokens = await getClaudeAIOAuthTokensAsync();
  if (!tokens?.refreshToken) {
    let sdkCallback = uSt();
    if (sdkCallback) try {
      let refreshed = await sdkCallback();
      if (refreshed && refreshed !== failedAccessToken) return process.env.CLAUDE_CODE_OAUTH_TOKEN = refreshed, clearOAuthTokenCache(), W("tengu_oauth_401_sdk_callback_refreshed", {}), He("oauth_401_recovery"), noteAuthRecoveryOutcome({
        recovered: !0
      }), !0;
      A(refreshed === null ? "SDK getOAuthToken callback returned null (no token available)" : "SDK getOAuthToken callback returned the same expired token; treating as no refresh", {
        level: refreshed === null ? "debug" : "error"
      });
    } catch (callbackErr) {
      xe("oauth_401_recovery", "oauth_401_sdk_callback_failed"), A(`SDK getOAuthToken callback failed: ${callbackErr instanceof Error ? callbackErr.message : String(callbackErr)}`, {
        level: "error"
      });
    }
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN || W5()) try {
      let diskOauth = (await ql().readAsync())?.claudeAiOauth;
      if (diskOauth?.accessToken && diskOauth.accessToken !== failedAccessToken) {
        if (process.env.CLAUDE_CODE_OAUTH_TOKEN) process.env.CLAUDE_CODE_OAUTH_TOKEN = diskOauth.accessToken;
        if (W5()) _X(diskOauth.accessToken), RSt(diskOauth.scopes);
        return clearOAuthTokenCache(), W("tengu_oauth_401_recovered_from_disk", {}), He("oauth_401_recovery"), noteAuthRecoveryOutcome({
          recovered: !0
        }), !0;
      }
    } catch (diskErr) {
      xe("oauth_401_recovery", "oauth_401_disk_read_failed"), Ie(diskErr);
    }
    let isEnvManaged = Boolean(process.env.CLAUDE_CODE_OAUTH_TOKEN) || Boolean(W5());
    if (isEnvManaged) {
      let waitMs = Ded();
      if (waitMs > 0) {
        if (A(`OAuth 401 recovery: waiting up to ${waitMs}ms for a rotated env token`), await waitForRotatedEnvToken({
          failedAccessToken,
          timeoutMs: waitMs
        })) {
          if (W5()) {
            let rotatedToken = Ne.CLAUDE_CODE_OAUTH_TOKEN;
            if (rotatedToken) _X(rotatedToken);
          }
          return clearOAuthTokenCache(), W("tengu_oauth_401_recovered_from_rotation", {}), He("oauth_401_recovery"), noteAuthRecoveryOutcome({
            recovered: !0
          }), !0;
        }
      }
    }
    if (xe("oauth_401_recovery", isEnvManaged ? "oauth_401_no_refresh_token_bg_worker" : "oauth_401_no_refresh_token_interactive"), noteAuthRecoveryOutcome({
      recovered: !1
    }) === "exit") W("tengu_oauth_401_zombie_exit", {}), A("OAuth 401 unrecovered past CLAUDE_CODE_AUTH_FAIL_EXIT_MS — exiting so the runner recycles this session with fresh credentials", {
      level: "error"
    }), setTimeout(() => process.exit(1), 2000);
    return !1;
  }
  if (tokens.accessToken !== failedAccessToken) return W("tengu_oauth_401_recovered_from_keychain", {}), He("oauth_401_recovery"), noteAuthRecoveryOutcome({
    recovered: !0
  }), !0;
  return checkAndRefreshOAuthTokenIfNeeded(0, !0, failedAccessToken);
}
async function readFreshOAuthAccessToken() {
  return clearOAuthTokenCache(), (await getClaudeAIOAuthTokensAsync())?.accessToken;
}
function oauthRefreshLockOptions(dir) {
  return {
    lockfilePath: hBr.join(dir, ".oauth_refresh.lock"),
    realpath: !1,
    stale: 1e4,
    onCompromised: err => A(`OAuth refresh lock compromised: ${err.message}`, {
      level: "error"
    })
  };
}
async function acquireOAuthRefreshLock(dir) {
  let releaseNew = await zg(dir, oauthRefreshLockOptions(dir)),
    legacyLockPath = `${await Z0t.realpath(dir).catch(() => dir)}.lock`,
    releaseLegacy = null;
  try {
    releaseLegacy = await zg(legacyLockPath, {
      ...oauthRefreshLockOptions(dir),
      lockfilePath: legacyLockPath
    });
  } catch (err) {
    if (err.code === "ELOCKED") throw W("tengu_oauth_refresh_legacy_lock_contended", {}), await releaseNew().catch(releaseErr => Jo(releaseErr) ? A(`OAuth refresh new-lock release failed: ${releaseErr}`) : Ie(releaseErr)), err;
    if (Jo(err)) A(`OAuth refresh legacy-lock acquire failed: ${err}`);else Ie(err);
  }
  return async () => {
    if (releaseLegacy) await releaseLegacy().catch(releaseErr => Jo(releaseErr) ? A(`OAuth refresh legacy-lock release failed: ${releaseErr}`) : Ie(releaseErr));
    await releaseNew();
  };
}
async function withOAuthRefreshLock(callback) {
  let dir = u7();
  await Js().mkdir(dir);
  let release,
    attempts = 0;
  while (!release) {
    attempts++;
    try {
      release = await acquireOAuthRefreshLock(dir);
    } catch (err) {
      if (err.code === "ELOCKED") {
        if (attempts < Oed) {
          await Kn(1000 + Math.random() * 1000);
          continue;
        }
        throw Error(`Lock acquisition failed after ${attempts} attempts: another process is refreshing`);
      }
      throw err;
    }
  }
  try {
    clearOAuthTokenCache();
    let lockedTokens = await getClaudeAIOAuthTokensAsync();
    return await callback({
      lockedTokens,
      lockAttempts: attempts
    });
  } finally {
    try {
      await release();
    } catch (err) {
      if (Jo(err)) A(`OAuth refresh lock release failed: ${err}`);else Ie(err);
    }
  }
}
function checkAndRefreshOAuthTokenIfNeeded(retryCount = 0, force = !1, failedAccessToken) {
  return checkAndRefreshOAuthTokenIfNeededWithOutcome(retryCount, force, failedAccessToken).then(outcome => outcome === "refreshed");
}
function checkAndRefreshOAuthTokenIfNeededWithOutcome(retryCount = 0, force = !1, failedAccessToken) {
  if (retryCount === 0 && !force) {
    if (z0t) return z0t;
    return z0t = pBr(retryCount, force).finally(() => {
      z0t = null;
    }), z0t;
  }
  return pBr(retryCount, force, failedAccessToken);
}
/** Core OAuth token refresh routine: handles double-checked caching, cross-process locking, and dead-token marking. */
async function pBr(retryCount, force, failedAccessToken) {
  await xed();
  let tokens = await getClaudeAIOAuthTokensAsync();
  if (!force) {
    if (tokens && !yQ(tokens.expiresAt)) return "not_needed";
    if (!tokens?.refreshToken) return "no_refresh_token";
  }
  if (!tokens?.refreshToken) return "no_refresh_token";
  if (Uyn.has(tokens.refreshToken)) return "known_dead_refresh_token";
  if (!_2(tokens.scopes) && !tokens.subscriptionType) return "not_refreshable";
  let targetAccessToken = failedAccessToken ?? tokens.accessToken;
  clearOAuthTokenCache();
  let recheckTokens = await getClaudeAIOAuthTokensAsync();
  if (!recheckTokens?.refreshToken) return "no_refresh_token";
  if (recheckTokens.accessToken !== targetAccessToken) return W("tengu_oauth_token_refresh_race_resolved", {}), "refreshed";
  if (!force && !yQ(recheckTokens.expiresAt)) return "not_needed";
  let dir = u7();
  await Js().mkdir(dir);
  let release;
  try {
    W("tengu_oauth_token_refresh_lock_acquiring", {}), release = await acquireOAuthRefreshLock(dir), W("tengu_oauth_token_refresh_lock_acquired", {});
  } catch (lockErr) {
    if (lockErr.code === "ELOCKED") {
      if (retryCount < 5) return W("tengu_oauth_token_refresh_lock_retry", {
        retryCount: retryCount + 1
      }), await Kn(1000 + Math.random() * 1000), pBr(retryCount + 1, force, targetAccessToken);
      return W("tengu_oauth_token_refresh_lock_retry_limit_reached", {
        maxRetries: 5
      }), Pt("oauth_token_refresh", "oauth_refresh_lock_timeout"), "lock_timeout";
    }
    return Ie(lockErr), W("tengu_oauth_token_refresh_lock_error", {
      error: Ce(lockErr)
    }), xe("oauth_token_refresh", "oauth_refresh_lock_error"), "lock_error";
  }
  let lockedRefreshToken = null;
  try {
    clearOAuthTokenCache();
    let lockedTokens = await getClaudeAIOAuthTokensAsync();
    if (!lockedTokens?.refreshToken) return "no_refresh_token";
    if (lockedRefreshToken = lockedTokens.refreshToken, lockedTokens.accessToken !== targetAccessToken) return W("tengu_oauth_token_refresh_race_resolved", {}), "refreshed";
    if (!force && !yQ(lockedTokens.expiresAt)) return "not_needed";
    W("tengu_oauth_token_refresh_starting", {});
    let newTokens = await _Q(lockedTokens.refreshToken, {
      scopes: (_2(lockedTokens.scopes) || lockedTokens.subscriptionType) && !lockedTokens.clientId ? void 0 : lockedTokens.scopes,
      clientId: lockedTokens.clientId
    });
    return await saveOAuthTokensIfNeeded(newTokens), clearOAuthTokenCache(), "refreshed";
  } catch (refreshErr) {
    if (EAe(refreshErr) || j_(refreshErr)) A(`OAuth refresh failed (expected): ${Ce(refreshErr)}`, {
      level: "error"
    });else Ie(refreshErr);
    clearOAuthTokenCache();
    let postErrorTokens = await getClaudeAIOAuthTokensAsync();
    if (postErrorTokens && postErrorTokens.accessToken !== targetAccessToken) return W("tengu_oauth_token_refresh_race_recovered", {}), "refreshed";
    if (EAe(refreshErr) && lockedRefreshToken) {
      Uyn.add(lockedRefreshToken), W("tengu_oauth_refresh_token_marked_dead_invalid_grant", {});
      try {
        let cleared = !1,
          mutateResult = await ql().mutate(config => {
            let oauth = config.claudeAiOauth;
            if (!oauth || oauth.refreshToken !== lockedRefreshToken) return config;
            return cleared = !0, {
              ...config,
              claudeAiOauth: {
                ...oauth,
                refreshToken: ""
              }
            };
          });
        if (cleared && mutateResult.success) W("tengu_oauth_refresh_token_cleared_on_disk", {});else if (cleared) A("OAuth dead-token disk clear: backend write failed", {
          level: "error"
        });
      } catch (clearErr) {
        A(`OAuth dead-token disk clear failed: ${Ce(clearErr)}`, {
          level: "error"
        });
      }
    }
    return EAe(refreshErr) ? "known_dead_refresh_token" : "refresh_failed";
  } finally {
    W("tengu_oauth_token_refresh_lock_releasing", {});
    try {
      await release(), W("tengu_oauth_token_refresh_lock_released", {});
    } catch (releaseErr) {
      A(`OAuth refresh lock release failed: ${releaseErr}`, {
        level: "error"
      }), W("tengu_oauth_token_refresh_lock_release_error", {});
    }
  }
}
function isClaudeAISubscriber() {
  if (!isAnthropicAuthEnabled()) return !1;
  return _2(getClaudeAIOAuthTokens()?.scopes);
}
function hasProfileScope() {
  let scopes = getClaudeAIOAuthTokens()?.scopes;
  return Array.isArray(scopes) && scopes.includes(DEe);
}
function hasStoredOAuthToken() {
  return getClaudeAIOAuthTokens()?.accessToken != null;
}
function hasOAuthScope(scope) {
  let scopes = getClaudeAIOAuthTokens()?.scopes;
  return Array.isArray(scopes) && scopes.includes(scope);
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
  if (!Nl()) return !1;
  if (isClaudeAISubscriber()) return !1;
  return !0;
}
function getOauthAccountInfo() {
  return isAnthropicAuthEnabled() ? Ot().oauthAccount : void 0;
}
function isOverageProvisioningAllowed() {
  let billingType = getOauthAccountInfo()?.billingType;
  if (!isClaudeAISubscriber() || !billingType) return !1;
  if (billingType !== "stripe_subscription" && billingType !== "stripe_subscription_contracted" && billingType !== "apple_subscription" && billingType !== "google_play_subscription") return !1;
  return !0;
}
function hasOpusAccess() {
  let subscriptionType = getSubscriptionType();
  return subscriptionType === "max" || subscriptionType === "enterprise" || subscriptionType === "team" || subscriptionType === "pro" || subscriptionType === null;
}
function getSubscriptionType() {
  if (zHr()) return KHr();
  if (!isAnthropicAuthEnabled()) return null;
  let tokens = getClaudeAIOAuthTokens();
  if (!tokens) return null;
  return tokens.subscriptionType ?? null;
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
  let overrideTier = VHr();
  if (overrideTier !== null) return overrideTier;
  if (!isAnthropicAuthEnabled()) return null;
  let tokens = getClaudeAIOAuthTokens();
  if (!tokens) return null;
  return tokens.rateLimitTier ?? null;
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
  return !Nl();
}
/** Returns the configured otelHeadersHelper command (policy settings take precedence when managed). */
function IBr() {
  if (dl()) return An("policySettings")?.otelHeadersHelper;
  return ($o() || {}).otelHeadersHelper;
}
function isOtelHeadersHelperFromProjectOrLocalSettings() {
  let helper = IBr();
  if (!helper) return !1;
  let projectSettings = An("projectSettings"),
    localSettings = An("localSettings");
  return projectSettings?.otelHeadersHelper === helper || localSettings?.otelHeadersHelper === helper;
}
function getOtelHeadersHelperLastFailure() {
  if (!IBr()) return null;
  return J0t;
}
function clearOtelHeadersCache() {
  Y0t = null, mBr = 0, pZe = null, J0t = null;
}
async function getOtelHeadersFromHelper() {
  let helper = IBr();
  if (!helper) return {};
  let debounceMs = parseInt(process.env.CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS || Fed.toString());
  if (Y0t && Date.now() - mBr < debounceMs) return Y0t;
  if (pZe) return pZe;
  if (isOtelHeadersHelperFromProjectOrLocalSettings()) {
    if (!kd()) return {};
  }
  return pZe = (async () => {
    try {
      let trimmedHelper = helper.trim(),
        isFile = !1;
      try {
        isFile = (await Z0t.stat(trimmedHelper)).isFile();
      } catch {}
      let result = null;
      if (isFile) try {
        let fileResult = await Kb(trimmedHelper, [], {
          timeout: 30000,
          reject: !1
        });
        if (!(fileResult.failed && !fileResult.timedOut && typeof fileResult.exitCode !== "number" && !fileResult.signal)) result = fileResult;
      } catch {}
      if (!result) result = await Nv(helper, {
        timeout: 30000,
        reject: !1
      });
      if (result.failed) {
        let reason;
        if (result.timedOut) reason = "timed out";else if (typeof result.exitCode === "number") reason = `exited ${result.exitCode}`;else if (result.signal) reason = `was killed by ${result.signal}`;else reason = "could not be started";
        let stderr = result.stderr?.trim();
        throw Error(stderr ? `${reason}: ${stderr}` : reason);
      }
      let stdout = result.stdout?.toString().trim();
      if (!stdout) throw Error("otelHeadersHelper did not return a valid value");
      let parsed = qt(stdout);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw Error("otelHeadersHelper must return a JSON object with string key-value pairs");
      for (let [key, value] of Object.entries(parsed)) if (typeof value !== "string") throw Error(`otelHeadersHelper returned non-string value for key "${key}": ${typeof value}`);
      return Y0t = parsed, mBr = Date.now(), J0t = null, Y0t;
    } catch (err) {
      let message = Ce(err);
      if (J0t === null && kr()) process.stderr.write(bt.red(`otelHeadersHelper failed (OpenTelemetry export headers unavailable): ${message}`) + `
`);
      throw J0t = message, A(`Error getting OpenTelemetry headers from otelHeadersHelper (in settings): ${message}`, {
        level: "error"
      }), err;
    } finally {
      pZe = null;
    }
  })(), pZe;
}
/** True for consumer subscription tiers (max or pro). */
function Zai(subscriptionType) {
  return subscriptionType === "max" || subscriptionType === "pro";
}
function isConsumerSubscriber() {
  let subscriptionType = getSubscriptionType();
  return isClaudeAISubscriber() && subscriptionType !== null && Zai(subscriptionType);
}
function getAccountInformation() {
  if (Rr() !== "firstParty") return;
  let {
      source: tokenSource
    } = getAuthTokenSource(),
    info = {};
  if (tokenSource === "CLAUDE_CODE_OAUTH_TOKEN" || tokenSource === "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR") info.tokenSource = tokenSource;else if (isClaudeAISubscriber()) info.subscription = getSubscriptionName();else if (tokenSource !== "profile") info.tokenSource = tokenSource;
  let {
    key,
    source: apiKeySource
  } = getAnthropicApiKeyWithSource();
  if (key) info.apiKeySource = apiKeySource;
  if (tokenSource === "claude.ai" || apiKeySource === "/login managed key") {
    let organizationName = getOauthAccountInfo()?.organizationName;
    if (organizationName) info.organization = organizationName;
  }
  let emailAddress = getOauthAccountInfo()?.emailAddress;
  if ((tokenSource === "claude.ai" || apiKeySource === "/login managed key") && emailAddress) info.email = emailAddress;
  return info;
}
function toAccountInfo() {
  let info = getAccountInformation();
  return {
    email: info?.email,
    organization: info?.organization,
    subscriptionType: info?.subscription,
    tokenSource: info?.tokenSource,
    apiKeySource: info?.apiKeySource,
    apiProvider: Rr()
  };
}
async function getAnthropicApiKeyWithSourceAsync(options = {}) {
  if (Ed()) {
    if (process.env.ANTHROPIC_API_KEY) return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
    if (getConfiguredApiKeyHelper()) return {
      key: options.skipRetrievingKeyFromApiKeyHelper ? null : getApiKeyFromApiKeyHelperCached(),
      source: "apiKeyHelper"
    };
    return {
      key: null,
      source: "none"
    };
  }
  let envApiKey = rA() ? void 0 : process.env.ANTHROPIC_API_KEY;
  if (MKe() && envApiKey) return {
    key: envApiKey,
    source: "ANTHROPIC_API_KEY"
  };
  if (nt(!1)) {
    let legacyKey = tkt();
    if (legacyKey) return {
      key: legacyKey,
      source: "ANTHROPIC_API_KEY"
    };
    if (!envApiKey && !process.env.CLAUDE_CODE_OAUTH_TOKEN && !process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR && !process.env.ANTHROPIC_AUTH_TOKEN && !shouldUseWIFAuth() && Nl()) throw Error("ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN, or WIF env vars (ANTHROPIC_FEDERATION_RULE_ID + ANTHROPIC_ORGANIZATION_ID) required");
    if (envApiKey) return {
      key: envApiKey,
      source: "ANTHROPIC_API_KEY"
    };
    return {
      key: null,
      source: "none"
    };
  }
  if (envApiKey && Ot().customApiKeyResponses?.approved?.includes(sF(envApiKey))) return {
    key: envApiKey,
    source: "ANTHROPIC_API_KEY"
  };
  let legacyKey = tkt();
  if (legacyKey) return {
    key: legacyKey,
    source: "ANTHROPIC_API_KEY"
  };
  if (getConfiguredApiKeyHelper()) {
    if (options.skipRetrievingKeyFromApiKeyHelper) return {
      key: null,
      source: "apiKeyHelper"
    };
    return {
      key: getApiKeyFromApiKeyHelperCached(),
      source: "apiKeyHelper"
    };
  }
  let keychainResult = await getApiKeyFromConfigOrMacOSKeychainAsync();
  if (keychainResult) return keychainResult;
  return {
    key: null,
    source: "none"
  };
}
async function getAnthropicApiKeyAsync() {
  let {
    key
  } = await getAnthropicApiKeyWithSourceAsync();
  return key;
}
async function hasAnthropicApiKeyAuthAsync() {
  let {
    key,
    source
  } = await getAnthropicApiKeyWithSourceAsync({
    skipRetrievingKeyFromApiKeyHelper: !0
  });
  return key !== null && source !== "none";
}
async function isAnthropicAuthEnabledAsync() {
  if (Ed()) return !1;
  if (process.env.ANTHROPIC_UNIX_SOCKET) return !!process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (shouldUseWIFAuth()) return !1;
  let isThirdParty = !Nl(),
    apiKeyHelper = ($o() || {}).apiKeyHelper,
    authToken = rA() ? void 0 : process.env.ANTHROPIC_AUTH_TOKEN,
    keySource;
  try {
    keySource = (await getAnthropicApiKeyWithSourceAsync({
      skipRetrievingKeyFromApiKeyHelper: !0
    })).source;
  } catch {
    return !1;
  }
  let hasDirectKeySource = keySource === "ANTHROPIC_API_KEY" || keySource === "apiKeyHelper",
    keyFileDescriptor = process.env.CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR,
    hasNonOAuthCredential = (authToken || hasDirectKeySource) && !isFirstPartyManagedOAuthContext() || (apiKeyHelper || keyFileDescriptor) && !fZe();
  return !(isThirdParty || hasNonOAuthCredential);
}
async function getAuthTokenSourceAsync() {
  if (Ed()) {
    if (getConfiguredApiKeyHelper()) return {
      source: "apiKeyHelper",
      hasToken: !0
    };
    return {
      source: "none",
      hasToken: !1
    };
  }
  if (process.env.ANTHROPIC_AUTH_TOKEN && !isFirstPartyManagedOAuthContext() && !rA()) return {
    source: "ANTHROPIC_AUTH_TOKEN",
    hasToken: !0
  };
  if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return {
    source: "CLAUDE_CODE_OAUTH_TOKEN",
    hasToken: !0
  };
  if (W5()) {
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR) return {
      source: "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR",
      hasToken: !0
    };
    return {
      source: "CCR_OAUTH_TOKEN_FILE",
      hasToken: !0
    };
  }
  if (getConfiguredApiKeyHelper() && !fZe()) return {
    source: "apiKeyHelper",
    hasToken: !0
  };
  if (shouldUseWIFAuth()) return {
    source: "profile",
    hasToken: !0
  };
  let tokens = await getClaudeAIOAuthTokensAsync();
  if (_2(tokens?.scopes) && tokens?.accessToken) return {
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
  return _2((await getClaudeAIOAuthTokensAsync())?.scopes);
}
async function hasProfileScopeAsync() {
  let scopes = (await getClaudeAIOAuthTokensAsync())?.scopes;
  return Array.isArray(scopes) && scopes.includes(DEe);
}
async function is1PApiCustomerAsync() {
  if (!Nl()) return !1;
  if (await isClaudeAISubscriberAsync()) return !1;
  return !0;
}
async function getOauthAccountInfoAsync() {
  return (await isAnthropicAuthEnabledAsync()) ? Ot().oauthAccount : void 0;
}
async function isOverageProvisioningAllowedAsync() {
  let billingType = (await getOauthAccountInfoAsync())?.billingType;
  if (!(await isClaudeAISubscriberAsync()) || !billingType) return !1;
  if (billingType !== "stripe_subscription" && billingType !== "stripe_subscription_contracted" && billingType !== "apple_subscription" && billingType !== "google_play_subscription") return !1;
  return !0;
}
async function getSubscriptionTypeAsync() {
  if (zHr()) return KHr();
  if (!(await isAnthropicAuthEnabledAsync())) return null;
  let tokens = await getClaudeAIOAuthTokensAsync();
  if (!tokens) return null;
  return tokens.subscriptionType ?? null;
}
async function hasOpusAccessAsync() {
  let subscriptionType = await getSubscriptionTypeAsync();
  return subscriptionType === "max" || subscriptionType === "enterprise" || subscriptionType === "team" || subscriptionType === "pro" || subscriptionType === null;
}
async function getRateLimitTierAsync() {
  let overrideTier = VHr();
  if (overrideTier !== null) return overrideTier;
  if (!(await isAnthropicAuthEnabledAsync())) return null;
  let tokens = await getClaudeAIOAuthTokensAsync();
  if (!tokens) return null;
  return tokens.rateLimitTier ?? null;
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
  let subscriptionType = await getSubscriptionTypeAsync();
  return (await isClaudeAISubscriberAsync()) && subscriptionType !== null && Zai(subscriptionType);
}
async function getAccountInformationAsync() {
  if (Rr() !== "firstParty") return;
  let {
      source: tokenSource
    } = await getAuthTokenSourceAsync(),
    info = {};
  if (tokenSource === "CLAUDE_CODE_OAUTH_TOKEN" || tokenSource === "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR") info.tokenSource = tokenSource;else if (await isClaudeAISubscriberAsync()) info.subscription = await getSubscriptionNameAsync();else if (tokenSource !== "profile") info.tokenSource = tokenSource;
  let {
    key,
    source: apiKeySource
  } = await getAnthropicApiKeyWithSourceAsync();
  if (key) info.apiKeySource = apiKeySource;
  if (tokenSource === "claude.ai" || apiKeySource === "/login managed key") {
    let organizationName = (await getOauthAccountInfoAsync())?.organizationName;
    if (organizationName) info.organization = organizationName;
  }
  let emailAddress = (await getOauthAccountInfoAsync())?.emailAddress;
  if ((tokenSource === "claude.ai" || apiKeySource === "/login managed key") && emailAddress) info.email = emailAddress;
  return info;
}
/** True when a non-OAuth Anthropic credential (API key, auth token, key fd, or apiKeyHelper) is present. */
function ttd() {
  let hasApiKeyAuth = !1;
  try {
    hasApiKeyAuth = hasAnthropicApiKeyAuth();
  } catch {}
  if (hasApiKeyAuth || !!Ne.ANTHROPIC_AUTH_TOKEN || !!Ne.CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR || !!getConfiguredApiKeyHelper()) return !0;
  return Rr() === "firstParty" && !shouldUseWIFAuth() && !isAnthropicAuthEnabled();
}
async function validateForceLoginOrg() {
  let policySettings = An("policySettings"),
    forceLoginOrgUUID = policySettings?.forceLoginOrgUUID,
    hasOrgPin = forceLoginOrgUUID !== void 0 || policySettings?.forceLoginMethod !== void 0;
  if (Ne.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST) {
    if (hasOrgPin) Pt("auth_force_login_org", "managed_by_host_under_pin");
    return {
      valid: !0
    };
  }
  if (process.env.ANTHROPIC_UNIX_SOCKET) {
    let metadata = {
      api_provider: Le(Rr()),
      auth_token_source: Le(getAuthTokenSource().source)
    };
    if (!isAnthropicAuthEnabled() && hasOrgPin) Pt("auth_force_login_org", "unix_socket_3p_under_pin", metadata);else if (isAnthropicAuthEnabled() && forceLoginOrgUUID !== void 0) Pt("auth_force_login_org", "unix_socket_ssh_under_pin", metadata);else if (policySettings === null && uvt().length > 0) Pt("auth_force_login_org", "unix_socket_unreadable_policy", metadata);else He("auth_force_login_org");
    return {
      valid: !0
    };
  }
  if (!isAnthropicAuthEnabled()) {
    if (hasOrgPin && ttd()) return {
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
  if (forceLoginOrgUUID === void 0) {
    if (policySettings === null) {
      let loadError = uvt()[0];
      if (loadError) {
        let unreadable = loadError.message.includes("could not be read"),
          errnoMatch = loadError.message.match(ntd),
          errnoCode = oli.find(code => code === errnoMatch?.[1]),
          errno = unreadable ? Bo(errnoCode) ?? Ve("other") : Ve("malformed");
        return await Qu("auth_force_login_org", "policy_unreadable_fail_close", {
          errno
        }), {
          valid: !1,
          message: `Unable to read managed policy settings.
This machine may require organization login enforcement, but the policy file failed to load.
Contact your administrator.

Detail: ${loadError.file ? `${loadError.file}: ${loadError.message}` : loadError.message}`
        };
      }
    }
    return {
      valid: !0
    };
  }
  let allowedOrgs = typeof forceLoginOrgUUID === "string" ? [forceLoginOrgUUID] : forceLoginOrgUUID;
  if (allowedOrgs.length === 0) return {
    valid: !1,
    message: `forceLoginOrgUUID in managed settings is set to an empty array.
No organizations are permitted. This is almost certainly a misconfiguration.
Contact your administrator.`
  };
  let orgsDescription = allowedOrgs.length === 1 ? `organization ${allowedOrgs[0]}` : `one of these organizations: ${allowedOrgs.join(", ")}`;
  await checkAndRefreshOAuthTokenIfNeeded();
  let tokens = getClaudeAIOAuthTokens();
  if (!tokens) return {
    valid: !0
  };
  let {
      source: tokenSource
    } = getAuthTokenSource(),
    isEnvOauthToken = tokenSource === "CLAUDE_CODE_OAUTH_TOKEN" || tokenSource === "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR",
    orgInfo = await qdn(tokens.accessToken);
  if (!orgInfo) return {
    valid: !1,
    message: `Unable to verify organization for the current authentication token.
This machine requires ${orgsDescription} but the token could not be validated.
This may be a network error, or the token may have been revoked.
Try again, or run: claude auth login`
  };
  let tokenOrgUuid = orgInfo.organization_uuid;
  if (allowedOrgs.includes(tokenOrgUuid)) return {
    valid: !0
  };
  if (isEnvOauthToken) return {
    valid: !1,
    message: `The ${tokenSource === "CLAUDE_CODE_OAUTH_TOKEN" ? "CLAUDE_CODE_OAUTH_TOKEN" : "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR"} environment variable provides a token for a
different organization than required by this machine's managed settings.

Required: ${orgsDescription}
Token organization: ${tokenOrgUuid}

Remove the environment variable or obtain a token for a permitted organization.`
  };
  return {
    valid: !1,
    message: `Your authentication token belongs to organization ${tokenOrgUuid},
but this machine requires ${orgsDescription}.

Please log in with a permitted organization: claude auth login`
  };
}
var fBr,
  Z0t,
  hBr,
  fed = 300000,
  Wai,
  Gai,
  SDK_OAUTH_REFRESH_ENTRYPOINTS,
  g8 = null,
  Cfe = null,
  mZe = 0,
  yed = 3600000,
  Bai = 300000,
  Ted = 60000,
  Sed = 30000,
  Byn = null,
  BBe = null,
  uBr = 0,
  Eed = 180000,
  refreshAndGetAwsCredentials,
  Aed = 5000,
  Red = 3600000,
  wed = 180000,
  refreshGcpCredentialsIfNeeded,
  getApiKeyFromConfigOrMacOSKeychain,
  Uyn,
  getClaudeAIOAuthTokens,
  $ai = 0,
  qai = null,
  cBr,
  j0t = null,
  getClaudeAIOAuthTokensAsync,
  z0t = null,
  Oed = 5,
  Y0t = null,
  mBr = 0,
  pZe = null,
  J0t = null,
  Fed = 1740000,
  getApiKeyFromConfigOrMacOSKeychainAsync,
  oli,
  ntd,
  sli;
var lo = b(() => {
  Gc();
  Wi();
  Sc();
  mn();
  kt();
  gQ();
  Ps();
  lt();
  VJe();
  qoe();
  aI();
  BNe();
  JJe();
  rT();
  Zdn();
  XJe();
  q0r();
  cmn();
  MR();
  tr();
  qe();
  rI();
  Ir();
  dn();
  Ct();
  Ii();
  lBr();
  vn();
  v5();
  zN();
  e8();
  IXe();
  G5();
  br();
  tn();
  K0t();
  fBr = require("child_process"), Z0t = require("fs/promises"), hBr = require("path");
  Wai = Hn(() => {
    A(`An Anthropic profile (~/.config/anthropic) is configured, but a claude.ai login exists — using the claude.ai login. Set ANTHROPIC_PROFILE=<name> to use the profile instead.${""}`, {
      level: "warn"
    }), queueMicrotask(() => W("tengu_wif_implicit_profile_skipped_stored_login", {}));
  }), Gai = Hn(() => {
    let precedenceSource = q5() ?? "profile",
      loginTakesPrecedence = precedenceSource === "profile-implicit" && $Ne() === "user_oauth";
    A(`Using Anthropic profile auth (${precedenceSource}); ${loginTakesPrecedence ? "a claude.ai login (/login) would take precedence over it" : "this takes precedence over any stored claude.ai login"}`, {
      level: "info"
    });
  });
  SDK_OAUTH_REFRESH_ENTRYPOINTS = new Set(["claude-desktop", "local-agent", "claude-vscode"]);
  refreshAndGetAwsCredentials = L1e(async () => {
    let startMs = performance.now();
    A("[API:auth] AWS credential resolve start");
    let refreshed = await bed(),
      credentials = await Ced();
    if (refreshed || credentials) await n5s();
    return A(`[API:auth] AWS credential resolve done in ${Math.round(performance.now() - startMs)}ms`), credentials;
  }, credentials => {
    let expiration = credentials?.expiration,
      remainingMs = expiration === void 0 ? void 0 : expiration - Date.now();
    if (remainingMs === void 0 || remainingMs <= Bai + Ted) return yed;
    return remainingMs - Bai;
  });
  refreshGcpCredentialsIfNeeded = L1e(async () => await ved(), Red);
  getApiKeyFromConfigOrMacOSKeychain = Hn(() => {
    if (Ed()) return null;
    {
      let prefetched = nfn();
      if (prefetched) {
        if (prefetched.stdout) return {
          key: prefetched.stdout,
          source: "/login managed key"
        };
      } else {
        let serviceName = wM();
        try {
          let key = poe(`security find-generic-password -a "${ZP()}" -w -s "${serviceName}"`);
          if (key) return {
            key,
            source: "/login managed key"
          };
        } catch (err) {
          A(`Failed to read API key from macOS keychain: ${err}`, {
            level: "error"
          });
        }
      }
    }
    let config = Ot();
    if (!config.primaryApiKey) return null;
    return {
      key: config.primaryApiKey,
      source: "/login managed key"
    };
  });
  Uyn = new Set();
  getClaudeAIOAuthTokens = Hn(() => {
    if (Ed()) return null;
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return {
      accessToken: process.env.CLAUDE_CODE_OAUTH_TOKEN,
      refreshToken: null,
      expiresAt: null,
      scopes: Uai(),
      subscriptionType: process.env.CLAUDE_CODE_SUBSCRIPTION_TYPE || null,
      rateLimitTier: process.env.CLAUDE_CODE_RATE_LIMIT_TIER || null
    };
    let fdToken = W5();
    if (fdToken) return {
      accessToken: fdToken,
      refreshToken: null,
      expiresAt: null,
      scopes: sar() ?? Uai(),
      subscriptionType: process.env.CLAUDE_CODE_SUBSCRIPTION_TYPE || null,
      rateLimitTier: process.env.CLAUDE_CODE_RATE_LIMIT_TIER || null
    };
    try {
      let oauth = ql().read()?.claudeAiOauth;
      if (!oauth?.accessToken) return null;
      return oauth;
    } catch (err) {
      return Ie(err), null;
    }
  });
  cBr = new Map();
  getClaudeAIOAuthTokensAsync = nRt(async () => {
    if (Ed()) return null;
    if (process.env.CLAUDE_CODE_OAUTH_TOKEN || W5()) return getClaudeAIOAuthTokens();
    try {
      let oauth = (await ql().readAsync())?.claudeAiOauth;
      if (!oauth?.accessToken) return null;
      return oauth;
    } catch (err) {
      return Ie(err), null;
    }
  });
  getApiKeyFromConfigOrMacOSKeychainAsync = nRt(async () => {
    if (Ed()) return null;
    {
      let prefetched = nfn();
      if (prefetched) {
        if (prefetched.stdout) return {
          key: prefetched.stdout,
          source: "/login managed key"
        };
      } else {
        let serviceName = wM();
        try {
          let key = (await Fn("security", ["find-generic-password", "-a", ZP(), "-w", "-s", serviceName])).stdout.trim();
          if (key) return {
            key,
            source: "/login managed key"
          };
        } catch (err) {
          A(`Failed to read API key from macOS keychain: ${err}`, {
            level: "error"
          });
        }
      }
    }
    let config = Ot();
    if (!config.primaryApiKey) return null;
    return {
      key: config.primaryApiKey,
      source: "/login managed key"
    };
  });
  oli = ["EACCES", "EPERM", "EBUSY", "EIO", "EISDIR", "ELOOP"], ntd = new RegExp(`\\b(${oli.join("|")})\\b`);
  sli = class sli extends Error {};
});

export {D2 as initD2,fZe,isFirstPartyManagedOAuthContext,clearWIFAuthDebugOnceCacheForTesting,shouldUseWIFAuth,isWIFDispatchAuth,restoreGatewayAuth,isAnthropicAuthEnabled,describeHowToDisableAuthTokenSource,getAuthTokenSource,getAnthropicApiKey,getAdditionalModelOptionsCache,getModelAccessCache,hasAnthropicDirectApiKey,hasAnthropicApiKeyAuth,hasAnthropicApiKey,getAnthropicApiKeyWithSource,getConfiguredApiKeyHelper,Vai,getConfiguredAwsAuthRefresh,isAwsAuthRefreshFromProjectSettings,yBr,isAwsCredentialExportFromProjectSettings,calculateApiKeyHelperTTL,getApiKeyHelperElapsedMs,getApiKeyFromApiKeyHelper,Fai,_ed,getApiKeyFromApiKeyHelperCached,clearApiKeyHelperCache,prefetchApiKeyFromApiKeyHelperIfSafe,bed,refreshAwsAuth,Ced,clearAwsCredentialsCache,resetAwsAuthRefreshCooldown,EBr,isGcpAuthRefreshFromProjectSettings,checkGcpCredentialsValid,ved,refreshGcpAuth,clearGcpCredentialsCache,prefetchGcpCredentialsIfSafe,prefetchAwsCredentialsAndBedRockInfoIfSafe,ked,saveApiKey,isCustomApiKeyApproved,removeApiKey,Yai,saveOAuthTokensIfNeeded,__resetKnownDeadRefreshTokensForTest,isOAuthRefreshKnownDead,Uai,clearOAuthTokenCache,resetEnvDerivedAuthCaches,xed,handleOAuth401Error,waitForRotatedEnvToken,Ded,noteAuthRecoveryOutcome,resetAuthFailureTracking,Ped,readFreshOAuthAccessToken,oauthRefreshLockOptions,acquireOAuthRefreshLock,withOAuthRefreshLock,checkAndRefreshOAuthTokenIfNeeded,checkAndRefreshOAuthTokenIfNeededWithOutcome,pBr,isClaudeAISubscriber,hasProfileScope as Vv,hasStoredOAuthToken,hasOAuthScope,getStoredOAuthTokenExpiresAt,getStoredOAuthSubscriptionType,hasStoredOAuthRefreshToken,is1PApiCustomer,getOauthAccountInfo,isOverageProvisioningAllowed,hasOpusAccess,getSubscriptionType,isMaxSubscriber,isTeamSubscriber,isTeamPremiumSubscriber,isEnterpriseSubscriber,isEnterprisePAYGSubscriber,isProSubscriber,getRateLimitTier,getSeatTier,getSubscriptionName,isUsing3PServices,IBr,isOtelHeadersHelperFromProjectOrLocalSettings,getOtelHeadersHelperLastFailure,clearOtelHeadersCache,getOtelHeadersFromHelper,Zai,isConsumerSubscriber,getAccountInformation,toAccountInfo,getAnthropicApiKeyWithSourceAsync,getAnthropicApiKeyAsync,hasAnthropicApiKeyAuthAsync,isAnthropicAuthEnabledAsync,getAuthTokenSourceAsync,isClaudeAISubscriberAsync,hasProfileScopeAsync,is1PApiCustomerAsync,getOauthAccountInfoAsync,isOverageProvisioningAllowedAsync,getSubscriptionTypeAsync,hasOpusAccessAsync,getRateLimitTierAsync,getSeatTierAsync,isMaxSubscriberAsync,isTeamSubscriberAsync,isTeamPremiumSubscriberAsync,isEnterpriseSubscriberAsync,isEnterprisePAYGSubscriberAsync,isProSubscriberAsync,getSubscriptionNameAsync,isConsumerSubscriberAsync,getAccountInformationAsync,ttd,validateForceLoginOrg,fBr,Z0t,hBr,fed,Wai,Gai,SDK_OAUTH_REFRESH_ENTRYPOINTS,g8,Cfe,mZe,yed,Bai,Ted,Sed,Byn,BBe,uBr,Eed,refreshAndGetAwsCredentials,Aed,Red,wed,refreshGcpCredentialsIfNeeded,getApiKeyFromConfigOrMacOSKeychain,Uyn,getClaudeAIOAuthTokens,$ai,qai,cBr,j0t,getClaudeAIOAuthTokensAsync,z0t,Oed,Y0t,mBr,pZe,J0t,Fed,getApiKeyFromConfigOrMacOSKeychainAsync,oli,ntd,sli,lo};
