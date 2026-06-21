// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {Wno,jno} from "../config/3746_parseOtelHeadersEnvVar.ts";
import {_i,hp} from "./1460_promise.ts";
import {getAPIProvider,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {dc,U8} from "../../vendor/m1480.ts";
import {revokeOAuthToken,DH} from "../config/1288_storeOAuthAccountInfo.ts";
import {setOauthTokenFromFd,setGatewayAuth,lt} from "./0131_sent.ts";
import {removeApiKey,getClaudeAIOAuthTokens,getClaudeAIOAuthTokensAsync,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {De,Rn} from "./0615_length.ts";
import {saveGlobalConfig,Qn} from "./5194_shouldSkipPluginAutoupdate.ts";
import {bNt,uDn} from "../tui/3336_seenNotifications.ts";
import {Ie,ln} from "../telemetry/0594_feature_name.ts";
import {clearTrustedDeviceTokenCache,lY} from "../telemetry/3327_untrustedDeviceHint.ts";
import {pfe,jR} from "../config/2028_allowed.ts";
import {mfe,ykt} from "../../vendor/m2029.ts";
import {tve,JQ} from "../../vendor/m2034.ts";
import {pS,dq} from "../config/2722_duration_ms.ts";
import {refreshGrowthBookAfterAuthChange,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Uke,Vee,Est} from "../telemetry/3337_level.ts";
import {Dua,N9e} from "../api/3360_headers.ts";
import {clearPolicyLimitsCache,zF} from "../telemetry/5192_waitForPolicyLimitsToLoad.ts";
import {KUe,uS} from "../config/2594_event_name.ts";
import {Text} from "../../vendor/m2423.ts";
import {gracefulShutdownSync,ym} from "../config/3332_flushAnalyticsSinks.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
var Vno = {};
isFullscreenWithTTY(Vno, {
  performLogout: () => performLogout,
  fleetHostLogout: () => fleetHostLogout,
  clearAuthRelatedCaches: () => clearAuthRelatedCaches,
  call: () => Vup
});

/**
 * Performs a full OAuth/API-key logout.
 * Optionally clears onboarding state, preserves in-process tokens, or preserves non-Anthropic auth.
 */
async function performLogout({
  clearOnboarding = !1,
  preserveInProcessTokens = !1,
  preserveNonAnthropicAuth = !1
}) {
  let {
    flushTelemetry: flushTelemetry
  } = await Promise.resolve().then(() => (Wno(), jno));
  if (await flushTelemetry(), _i()) {
    await clearAuthRelatedCaches();
    return;
  }
  // Revoke OAuth tokens for first-party provider unless preserving in-process tokens
  if (!preserveInProcessTokens && getAPIProvider() === "firstParty") {
    let configStore = dc();
    configStore.invalidateCache?.();
    let configData = await configStore.readAsync(),
      claudeOauth = configData?.claudeAiOauth;
    if (claudeOauth?.refreshToken) await revokeOAuthToken(claudeOauth.refreshToken, claudeOauth.clientId);
    let designOauth = configData?.designOauth;
    if (designOauth?.refreshToken) await revokeOAuthToken(designOauth.refreshToken, designOauth.clientId);
  }
  if (!preserveInProcessTokens) delete process.env.CLAUDE_CODE_OAUTH_TOKEN, setOauthTokenFromFd(null);
  await removeApiKey();
  let configStore = dc();
  if (preserveNonAnthropicAuth) {
    // Preserve non-Anthropic auth: only remove Anthropic-specific fields
    if (getAPIProvider() === "firstParty") {
      configStore.invalidateCache?.();
      let designOauth = (await configStore.readAsync())?.designOauth;
      if (designOauth?.refreshToken) await revokeOAuthToken(designOauth.refreshToken, designOauth.clientId);
    }
    await configStore.mutate(configData => {
      let updatedConfig = {
        ...configData
      };
      return delete updatedConfig.claudeAiOauth, delete updatedConfig.organizationUuid, delete updatedConfig.trustedDeviceToken, delete updatedConfig.enterpriseGateway, delete updatedConfig.designOauth, updatedConfig;
    }).catch(err => {
      De(err);
    });
  } else await configStore.delete();
  setGatewayAuth(null), await clearAuthRelatedCaches(), saveGlobalConfig(globalConfig => {
    let updatedGlobalConfig = {
      ...globalConfig
    };
    if (clearOnboarding) {
      // Reset onboarding-related flags
      if (updatedGlobalConfig.hasCompletedOnboarding = !1, updatedGlobalConfig.subscriptionNoticeCount = 0, updatedGlobalConfig.hasAvailableSubscription = !1, updatedGlobalConfig.customApiKeyResponses?.approved) updatedGlobalConfig.customApiKeyResponses = {
        ...updatedGlobalConfig.customApiKeyResponses,
        approved: []
      };
      let notificationKey = bNt;
      if (updatedGlobalConfig.seenNotifications?.[notificationKey] !== void 0) {
        let {
          [notificationKey]: removedKey,
          ...remainingNotifications
        } = updatedGlobalConfig.seenNotifications;
        updatedGlobalConfig.seenNotifications = remainingNotifications;
      }
    }
    return updatedGlobalConfig.oauthAccount = void 0, updatedGlobalConfig.additionalModelOptionsCache = void 0, updatedGlobalConfig.additionalModelCostsCache = void 0, updatedGlobalConfig.clientDataCache = void 0, updatedGlobalConfig.autoCompactWindowsCache = void 0, updatedGlobalConfig;
  }), Ie("oauth_logout");
}

/** Clears all auth-related in-memory caches. */
async function clearAuthRelatedCaches() {
  getClaudeAIOAuthTokens.cache?.clear?.(), getClaudeAIOAuthTokensAsync.cache?.clear?.(), clearTrustedDeviceTokenCache(), pfe(), mfe(), tve(), pS.cache.clear?.(), refreshGrowthBookAfterAuthChange(), Uke.cache?.clear?.(), Vee.cache?.clear?.(), await Dua(), await clearPolicyLimitsCache();
}

/** Handles the /logout command invocation in the TUI. */
async function Vup(replyFn: any) {
  let isBackground = _i();
  if (!isBackground) KUe({
    action: "logout",
    success: !0,
    authMethod: "oauth"
  });
  if (await performLogout({
    clearOnboarding: !0
  }), isBackground) return replyFn("This background session shares credentials with other sessions; /logout here has no effect. Run /logout from your main terminal to sign out.", {
    display: "system"
  }), null;
  let successMessage = Gno.createElement(Text, null, "Successfully logged out from your Anthropic account.");
  return setTimeout(() => {
    gracefulShutdownSync(0, "logout");
  }, 200), successMessage;
}

/** Handles fleet-host logout flow with UI feedback callbacks. */
async function fleetHostLogout({
  exit: exit,
  setError: setError,
  setInfo: setInfo
}: {
  exit: any;
  setError: any;
  setInfo: any;
}) {
  setInfo("Signing out…"), KUe({
    action: "logout",
    success: !0,
    authMethod: "oauth"
  });
  try {
    await performLogout({
      clearOnboarding: !0
    }), exit();
  } catch (err) {
    De(err), setError(`Couldn't sign out — ${err instanceof Error ? err.message : String(err)}`);
  }
}
var Gno: any;
var pNn = b(() => {
  lt();
  lY();
  uDn();
  dq();
  ze();
  ln();
  zn();
  Est();
  DH();
  zF();
  N9e();
  Ao();
  jR();
  hp();
  Qn();
  ym();
  Rn();
  li();
  U8();
  uS();
  ykt();
  JQ();
  Gno = M(Te(), 1);
});
export {Vno,performLogout,clearAuthRelatedCaches,Vup,fleetHostLogout,Gno,pNn};
