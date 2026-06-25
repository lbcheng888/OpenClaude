// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {vao,Rao} from "../config/3762_parseOtelHeadersEnvVar.ts";
import {Ws,vd} from "./1465_promise.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {ql,e8} from "../../vendor/m1485.ts";
import {revokeOAuthToken as vM,aI} from "../config/1293_storeOAuthAccountInfo.ts";
import {setOauthTokenFromFd as _X,setGatewayAuth as ZLe,lt} from "./0132_sent.ts";
import {removeApiKey as RBr,getClaudeAIOAuthTokens as qs,getClaudeAIOAuthTokensAsync as M0,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {Ie,vn} from "./0621_length.ts";
import {saveGlobalConfig as hn,tr} from "./5228_shouldSkipPluginAutoupdate.ts";
import {XBt,rLn} from "../telemetry/3352_seenNotifications.ts";
import {He,mn} from "../telemetry/0600_feature_name.ts";
import {clearTrustedDeviceTokenCache as VOn,Fj} from "../telemetry/3343_untrustedDeviceHint.ts";
import {isUltraReviewAvailable as VQ,MR} from "../config/2033_allowed.ts";
import {Efe,K0t} from "../../vendor/m2034.ts";
import {FRe,KQ} from "../../vendor/m2039.ts";
import {Py,y$} from "../config/2734_duration_ms.ts";
import {refreshGrowthBookAfterAuthChange as Kse,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {RIe,Uee,bat} from "../telemetry/3353_level.ts";
import {z_a,X3e} from "../api/3376_headers.ts";
import {clearPolicyLimitsCache as kao,_B} from "../telemetry/5226_waitForPolicyLimitsToLoad.ts";
import {z2e,oS} from "../config/2605_event_name.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {gracefulShutdownSync as Rc,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
var wao = {};
ft(wao, {
  performLogout: () => performLogout,
  fleetHostLogout: () => fleetHostLogout,
  clearAuthRelatedCaches: () => clearAuthRelatedCaches,
  call: () => call
});

/**
 * Performs a full OAuth/API-key logout.
 * Optionally clears onboarding state, preserves in-process tokens, or preserves non-Anthropic auth.
 */
async function performLogout({
  clearOnboarding: clearOnboarding = !1,
  preserveInProcessTokens: preserveInProcessTokens = !1,
  preserveNonAnthropicAuth: preserveNonAnthropicAuth = !1
}) {
  let {
    flushTelemetry: flushTelemetry
  } = await Promise.resolve().then(() => (vao(), Rao));
  if (await flushTelemetry(), Ws()) {
    await clearAuthRelatedCaches();
    return;
  }
  // Revoke OAuth tokens for first-party provider unless preserving in-process tokens
  if (!preserveInProcessTokens && Rr() === "firstParty") {
    let configStore = ql();
    configStore.invalidateCache?.();
    let configData = await configStore.readAsync(),
      claudeOauth = configData?.claudeAiOauth;
    if (claudeOauth?.refreshToken) await vM(claudeOauth.refreshToken, claudeOauth.clientId);
    let designOauth = configData?.designOauth;
    if (designOauth?.refreshToken) await vM(designOauth.refreshToken, designOauth.clientId);
  }
  if (!preserveInProcessTokens) delete process.env.CLAUDE_CODE_OAUTH_TOKEN, _X(null);
  await RBr();
  let configStore = ql();
  if (preserveNonAnthropicAuth) {
    // Preserve non-Anthropic auth: only remove Anthropic-specific fields
    if (Rr() === "firstParty") {
      configStore.invalidateCache?.();
      let designOauth = (await configStore.readAsync())?.designOauth;
      if (designOauth?.refreshToken) await vM(designOauth.refreshToken, designOauth.clientId);
    }
    await configStore.mutate(configData => {
      let updatedConfig = {
        ...configData
      };
      return delete updatedConfig.claudeAiOauth, delete updatedConfig.organizationUuid, delete updatedConfig.trustedDeviceToken, delete updatedConfig.enterpriseGateway, delete updatedConfig.designOauth, updatedConfig;
    }).catch(err => {
      Ie(err);
    });
  } else await configStore.delete();
  ZLe(null), await clearAuthRelatedCaches(), hn(globalConfig => {
    let updatedGlobalConfig = {
      ...globalConfig
    };
    if (clearOnboarding) {
      // Reset onboarding-related flags
      if (updatedGlobalConfig.hasCompletedOnboarding = !1, updatedGlobalConfig.subscriptionNoticeCount = 0, updatedGlobalConfig.hasAvailableSubscription = !1, updatedGlobalConfig.customApiKeyResponses?.approved) updatedGlobalConfig.customApiKeyResponses = {
        ...updatedGlobalConfig.customApiKeyResponses,
        approved: []
      };
      let notificationKey = XBt;
      if (updatedGlobalConfig.seenNotifications?.[notificationKey] !== void 0) {
        let {
          [notificationKey]: removedKey,
          ...remainingNotifications
        } = updatedGlobalConfig.seenNotifications;
        updatedGlobalConfig.seenNotifications = remainingNotifications;
      }
    }
    return updatedGlobalConfig.oauthAccount = void 0, updatedGlobalConfig.additionalModelOptionsCache = void 0, updatedGlobalConfig.additionalModelCostsCache = void 0, updatedGlobalConfig.modelAccessCache = void 0, updatedGlobalConfig.clientDataCache = void 0, updatedGlobalConfig.clientDataCacheSlots = void 0, updatedGlobalConfig.autoCompactWindowsCache = void 0, updatedGlobalConfig;
  }), He("oauth_logout");
}

/** Clears all auth-related in-memory caches. */
async function clearAuthRelatedCaches() {
  qs.cache?.clear?.(), M0.cache?.clear?.(), VOn(), VQ(), Efe(), FRe(), Py.cache.clear?.(), Kse(), RIe.cache?.clear?.(), Uee.cache?.clear?.(), await z_a(), await kao();
}

/** Handles the /logout command invocation in the TUI. */
async function call(replyFn: any) {
  let isBackground = Ws();
  if (!isBackground) z2e({
    action: "logout",
    success: !0,
    authMethod: "oauth"
  });
  if (await performLogout({
    clearOnboarding: !0
  }), isBackground) return replyFn("This background session shares credentials with other sessions; /logout here has no effect. Run /logout from your main terminal to sign out.", {
    display: "system"
  }), null;
  let successMessage = kDa.jsx(v, {
    children: "Successfully logged out from your Anthropic account."
  });
  return setTimeout(() => {
    Rc(0, "logout");
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
  setInfo("Signing out…"), z2e({
    action: "logout",
    success: !0,
    authMethod: "oauth"
  });
  try {
    await performLogout({
      clearOnboarding: !0
    }), exit();
  } catch (err) {
    Ie(err), setError(`Couldn't sign out — ${err instanceof Error ? err.message : String(err)}`);
  }
}
var kDa: any;
var sUn = b(() => {
  lt();
  Fj();
  rLn();
  y$();
  je();
  mn();
  jn();
  bat();
  aI();
  _B();
  X3e();
  lo();
  MR();
  vd();
  tr();
  Np();
  vn();
  Ps();
  e8();
  oS();
  K0t();
  KQ();
  kDa = x(oe(), 1);
});

export {wao,performLogout,clearAuthRelatedCaches,call as Pbp,fleetHostLogout,kDa,sUn};
