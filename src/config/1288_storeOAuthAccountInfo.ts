// @ts-nocheck
import {isFullscreenWithTTY as J_,b as L} from "../../runtime.ts";
import {CLAUDE_AI_INFERENCE_SCOPE as JI,getOauthConfig as C9,ALL_OAUTH_SCOPES as A58,CLAUDE_AI_OAUTH_SCOPES as ZJH,Dc as R1} from "../api/0459_getOauthConfig.ts";
import {fo as Dq} from "../../vendor/m566.ts";
import {Oe as bH,Ie as EH,isTmuxControlMode as B_,ln as f6} from "../telemetry/0594_feature_name.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {getGlobalConfig as N_,saveGlobalConfig as M6,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getClaudeAIOAuthTokens as Y7,saveApiKey as UM8,hasProfileScope as ZW,checkAndRefreshOAuthTokenIfNeeded as MY,isClaudeAISubscriber as kq,Ao as Xq} from "./2031_withOAuthRefreshLock.ts";
import {Se as ZH,bt as R_} from "../../vendor/m195.ts";
import {logForDebugging as y,qe as UH} from "./0234_setHasFormattedOutput.ts";
import {Qe as K_} from "../../vendor/m5.ts";
import {BEe as OMH,G1e as HvH} from "../../vendor/m1286.ts";
import {Gp as iO} from "../../vendor/m567.ts";
// @ts-nocheck
var oauthAccountNamespace = {};
J_(oauthAccountNamespace, {
  storeOAuthAccountInfo: () => storeOAuthAccountInfo,
  shouldUseClaudeAIAuth: () => shouldUseClaudeAIAuth,
  revokeOAuthToken: () => revokeOAuthToken,
  refreshOAuthToken: () => refreshOAuthToken,
  populateOAuthAccountInfoIfNeeded: () => populateOAuthAccountInfoIfNeeded,
  parseScopes: () => parseScopes,
  isOAuthTokenExpired: () => isOAuthTokenExpired,
  isInvalidGrantError: () => isInvalidGrantError,
  getOrganizationUUID: () => getOrganizationUUID,
  fetchProfileInfo: () => fetchProfileInfo,
  fetchAndStoreUserRoles: () => fetchAndStoreUserRoles,
  extractOAuthErrorFields: () => extractOAuthErrorFields,
  exchangeCodeForTokens: () => exchangeCodeForTokens,
  createAndStoreApiKey: () => createAndStoreApiKey,
  buildAuthUrl: () => buildAuthUrl
});
function shouldUseClaudeAIAuth(scopes) {
  return Array.isArray(scopes) && scopes.includes(JI);
}
function parseScopes(scopeStr) {
  if (typeof scopeStr !== "string") return [];
  return scopeStr.split(" ").filter(Boolean);
}
function buildAuthUrl({
  codeChallenge: codeChallenge,
  state: state,
  port: port,
  isManual: isManual,
  loginWithClaudeAi: loginWithClaudeAi,
  inferenceOnly: inferenceOnly,
  orgUUID: orgUUID,
  loginHint: loginHint,
  loginMethod: loginMethod,
  oauthClient: oauthClient
}) {
  let authorizeBaseUrl = loginWithClaudeAi ? C9().CLAUDE_AI_AUTHORIZE_URL : C9().CONSOLE_AUTHORIZE_URL,
    authUrl = new URL(authorizeBaseUrl);
  authUrl.searchParams.append("code", "true"), authUrl.searchParams.append("client_id", oauthClient?.clientId ?? C9().CLIENT_ID), authUrl.searchParams.append("response_type", "code"), authUrl.searchParams.append("redirect_uri", isManual ? C9().MANUAL_REDIRECT_URL : `http://localhost:${port}/callback`);
  let j = oauthClient ? oauthClient.scopes : inferenceOnly ? [JI] : A58;
  if (authUrl.searchParams.append("scope", j.join(" ")), authUrl.searchParams.append("code_challenge", codeChallenge), authUrl.searchParams.append("code_challenge_method", "S256"), authUrl.searchParams.append("state", state), orgUUID) authUrl.searchParams.append("orgUUID", orgUUID);
  if (loginHint) authUrl.searchParams.append("login_hint", loginHint);
  if (loginMethod) authUrl.searchParams.append("login_method", loginMethod);
  return authUrl.toString();
}
async function exchangeCodeForTokens(authCode, state, codeVerifier, port, isManual = false, expiresIn, clientId) {
  let requestBody = {
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: isManual ? C9().MANUAL_REDIRECT_URL : `http://localhost:${port}/callback`,
    client_id: clientId ?? C9().CLIENT_ID,
    code_verifier: codeVerifier,
    state: state
  };
  if (expiresIn !== undefined) requestBody.expires_in = expiresIn;
  let response = await Dq.post(C9().TOKEN_URL, requestBody, {
    headers: {
      "Content-Type": "application/json"
    },
    timeout: 30000
  });
  if (response.status !== 200) throw bH("oauth_token_exchange", response.status === 401 ? "oauth_exchange_invalid_code" : "oauth_exchange_http_error"), Error(response.status === 401 ? "Authentication failed: Invalid authorization code" : `Token exchange failed (${response.status}): ${response.statusText}`);
  return c("tengu_oauth_token_exchange_success", {}), EH("oauth_token_exchange"), response.data;
}
async function refreshOAuthToken(refreshToken, {
  scopes: scopes,
  expiresIn: expiresIn,
  clientId: clientId,
  skipProfileFetch: skipProfileFetch
} = {}) {
  let requestBody = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId ?? C9().CLIENT_ID,
    scope: (Array.isArray(scopes) && scopes.length ? scopes : ZJH).join(" ")
  };
  if (expiresIn !== undefined) requestBody.expires_in = expiresIn;
  try {
    let response = await Dq.post(C9().TOKEN_URL, requestBody, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 30000
    });
    if (response.status !== 200) throw Error(`Token refresh failed: ${response.statusText}`);
    let tokenData = response.data,
      {
        access_token: newAccessToken,
        refresh_token: newRefreshToken = refreshToken,
        expires_in: expiresInSecs
      } = tokenData,
      newExpiresAt = Date.now() + expiresInSecs * 1000,
      newScopes = parseScopes(tokenData.scope);
    c("tengu_oauth_token_refresh_success", {}), EH("oauth_token_refresh");
    let globalCfg = N_(),
      existingTokens = skipProfileFetch ? null : Y7(),
      alreadyHasProfileData = globalCfg.oauthAccount?.billingType !== undefined && globalCfg.oauthAccount?.accountCreatedAt !== undefined && globalCfg.oauthAccount?.subscriptionCreatedAt !== undefined && globalCfg.oauthAccount?.ccOnboardingFlags !== undefined && existingTokens?.subscriptionType != null && existingTokens?.rateLimitTier != null,
      freshProfile = skipProfileFetch || alreadyHasProfileData ? null : await fetchProfileInfo(newAccessToken);
    if (freshProfile && globalCfg.oauthAccount) {
      let profileUpdate = {};
      if (freshProfile.displayName !== undefined) profileUpdate.displayName = freshProfile.displayName;
      if (typeof freshProfile.hasExtraUsageEnabled === "boolean") profileUpdate.hasExtraUsageEnabled = freshProfile.hasExtraUsageEnabled;
      if (freshProfile.billingType !== null) profileUpdate.billingType = freshProfile.billingType;
      if (freshProfile.accountCreatedAt !== undefined) profileUpdate.accountCreatedAt = freshProfile.accountCreatedAt;
      if (freshProfile.subscriptionCreatedAt !== undefined) profileUpdate.subscriptionCreatedAt = freshProfile.subscriptionCreatedAt;
      if (freshProfile.rawProfile) profileUpdate.ccOnboardingFlags = freshProfile.ccOnboardingFlags, profileUpdate.claudeCodeTrialEndsAt = freshProfile.claudeCodeTrialEndsAt, profileUpdate.claudeCodeTrialDurationDays = freshProfile.claudeCodeTrialDurationDays, profileUpdate.seatTier = freshProfile.seatTier;
      if (Object.keys(profileUpdate).length > 0) M6(prev => ({
        ...prev,
        oauthAccount: prev.oauthAccount ? {
          ...prev.oauthAccount,
          ...profileUpdate
        } : prev.oauthAccount
      }));
    }
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresAt: newExpiresAt,
      scopes: newScopes,
      clientId: clientId,
      subscriptionType: freshProfile?.subscriptionType ?? existingTokens?.subscriptionType ?? null,
      rateLimitTier: freshProfile?.rateLimitTier ?? existingTokens?.rateLimitTier ?? null,
      profile: freshProfile?.rawProfile,
      tokenAccount: tokenData.account ? {
        uuid: tokenData.account.uuid,
        emailAddress: tokenData.account.email_address,
        organizationUuid: tokenData.organization?.uuid
      } : undefined
    };
  } catch (err) {
    if (c("tengu_oauth_token_refresh_failure", {
      error: ZH(err),
      ...extractOAuthErrorFields(err)
    }), isInvalidGrantError(err)) bH("oauth_token_refresh", "oauth_refresh_invalid_grant");else B_("oauth_token_refresh", "oauth_refresh_request_failed");
    throw err;
  }
}
async function revokeOAuthToken(refreshToken, clientId) {
  try {
    await Dq.post(`${C9().TOKEN_URL}/revoke`, {
      token: refreshToken,
      token_type_hint: "refresh_token",
      client_id: clientId ?? C9().CLIENT_ID
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 5000
    }), EH("oauth_token_revoke");
  } catch (err) {
    let httpStatus = Dq.isAxiosError(err) ? err.response?.status : undefined;
    y(`OAuth token revoke failed (status=${httpStatus ?? "network"}); continuing with local logout.`), B_("oauth_token_revoke", `http_${httpStatus ?? "network"}`);
  }
}
async function fetchAndStoreUserRoles(accessToken) {
  let response = await Dq.get(C9().ROLES_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (response.status !== 200) throw bH("oauth_fetch_roles", "oauth_roles_http_error"), Error(`Failed to fetch user roles: ${response.statusText}`);
  let rolesData = response.data;
  if (!N_().oauthAccount) throw bH("oauth_fetch_roles", "oauth_roles_no_account"), Error("OAuth account information not found in config");
  M6(O => ({
    ...O,
    oauthAccount: O.oauthAccount ? {
      ...O.oauthAccount,
      organizationRole: rolesData.organization_role,
      workspaceRole: rolesData.workspace_role,
      organizationName: rolesData.organization_name
    } : O.oauthAccount
  })), c("tengu_oauth_roles_stored", {
    org_role: rolesData.organization_role
  }), EH("oauth_fetch_roles");
}
async function createAndStoreApiKey(accessToken) {
  try {
    let response = await Dq.post(C9().API_KEY_URL, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }),
      rawKey = response.data?.raw_key;
    if (rawKey) return await UM8(rawKey), c("tengu_oauth_api_key", {
      status: K_("success"),
      statusCode: response.status
    }), EH("oauth_create_api_key"), rawKey;
    return bH("oauth_create_api_key", "oauth_api_key_empty_response"), null;
  } catch (err) {
    throw c("tengu_oauth_api_key", {
      status: K_("failure"),
      error: err instanceof Error ? err.message : String(err)
    }), bH("oauth_create_api_key", "oauth_api_key_request_failed"), err;
  }
}
function isOAuthTokenExpired(expiresAt) {
  if (expiresAt === null) return false;
  let earlyExpiryBuffer = 300000;
  return Date.now() + earlyExpiryBuffer >= expiresAt;
}
async function fetchProfileInfo(accessToken) {
  let profileData = await OMH(accessToken),
    orgType = profileData?.organization?.organization_type,
    subscriptionType = null;
  switch (orgType) {
    case "claude_max":
      subscriptionType = "max";
      break;
    case "claude_pro":
      subscriptionType = "pro";
      break;
    case "claude_enterprise":
      subscriptionType = "enterprise";
      break;
    case "claude_team":
      subscriptionType = "team";
      break;
    default:
      subscriptionType = null;
      break;
  }
  let result = {
    subscriptionType: subscriptionType,
    rateLimitTier: profileData?.organization?.rate_limit_tier ?? null,
    seatTier: profileData?.organization?.seat_tier ?? null,
    hasExtraUsageEnabled: profileData?.organization?.has_extra_usage_enabled ?? null,
    billingType: profileData?.organization?.billing_type ?? null,
    ccOnboardingFlags: profileData?.organization?.cc_onboarding_flags ?? {},
    claudeCodeTrialEndsAt: profileData?.organization?.claude_code_trial_ends_at ?? null,
    claudeCodeTrialDurationDays: profileData?.organization?.claude_code_trial_duration_days ?? null
  };
  if (profileData?.account?.display_name) result.displayName = profileData.account.display_name;
  if (profileData?.account?.created_at) result.accountCreatedAt = profileData.account.created_at;
  if (profileData?.organization?.subscription_created_at) result.subscriptionCreatedAt = profileData.organization.subscription_created_at;
  return c("tengu_oauth_profile_fetch_success", {}), {
    ...result,
    rawProfile: profileData
  };
}
async function getOrganizationUUID() {
  let envOrgUuid = process.env.CLAUDE_CODE_ORGANIZATION_UUID;
  if (envOrgUuid) return envOrgUuid;
  let cachedOrgUuid = N_().oauthAccount?.organizationUuid;
  if (cachedOrgUuid) return cachedOrgUuid;
  let accessToken = Y7()?.accessToken;
  if (accessToken === undefined || !ZW()) return null;
  let fetchedUuid = (await OMH(accessToken))?.organization?.uuid;
  if (!fetchedUuid) return null;
  return fetchedUuid;
}
async function populateOAuthAccountInfoIfNeeded() {
  let envAccountUuid = process.env.CLAUDE_CODE_ACCOUNT_UUID,
    envEmailAddress = process.env.CLAUDE_CODE_USER_EMAIL,
    envOrgUuid = process.env.CLAUDE_CODE_ORGANIZATION_UUID,
    hasAllEnvVars = Boolean(envAccountUuid && envEmailAddress && envOrgUuid);
  if (envAccountUuid && envEmailAddress && envOrgUuid) {
    if (!N_().oauthAccount) storeOAuthAccountInfo({
      accountUuid: envAccountUuid,
      emailAddress: envEmailAddress,
      organizationUuid: envOrgUuid
    });
  }
  await MY();
  let currentCfg = N_();
  if (currentCfg.oauthAccount && currentCfg.oauthAccount.billingType !== undefined && currentCfg.oauthAccount.accountCreatedAt !== undefined && currentCfg.oauthAccount.subscriptionCreatedAt !== undefined && currentCfg.oauthAccount.ccOnboardingFlags !== undefined || !kq() || !ZW()) return false;
  let tokens = Y7();
  if (tokens?.accessToken) {
    let profileData = await OMH(tokens.accessToken);
    if (profileData) {
      if (hasAllEnvVars) y("OAuth profile fetch succeeded, overriding env var account info", {
        level: "info"
      });
      return storeOAuthAccountInfo({
        accountUuid: profileData.account.uuid,
        emailAddress: profileData.account.email,
        organizationUuid: profileData.organization.uuid,
        displayName: profileData.account.display_name || undefined,
        hasExtraUsageEnabled: profileData.organization.has_extra_usage_enabled ?? false,
        billingType: profileData.organization.billing_type ?? undefined,
        accountCreatedAt: profileData.account.created_at,
        subscriptionCreatedAt: profileData.organization.subscription_created_at ?? undefined,
        ccOnboardingFlags: profileData.organization.cc_onboarding_flags ?? {},
        claudeCodeTrialEndsAt: profileData.organization.claude_code_trial_ends_at ?? null,
        claudeCodeTrialDurationDays: profileData.organization.claude_code_trial_duration_days ?? null,
        seatTier: profileData.organization.seat_tier ?? null
      }), true;
    }
  }
  return false;
}
function storeOAuthAccountInfo({
  accountUuid: accountUuid,
  emailAddress: emailAddress,
  organizationUuid: organizationUuid,
  displayName: displayName,
  hasExtraUsageEnabled: hasExtraUsageEnabled,
  billingType: billingType,
  accountCreatedAt: accountCreatedAt,
  subscriptionCreatedAt: subscriptionCreatedAt,
  ccOnboardingFlags: ccOnboardingFlags,
  claudeCodeTrialEndsAt: claudeCodeTrialEndsAt,
  claudeCodeTrialDurationDays: claudeCodeTrialDurationDays,
  seatTier: seatTier
}) {
  let accountPayload = {
    accountUuid: accountUuid,
    emailAddress: emailAddress,
    organizationUuid: organizationUuid,
    hasExtraUsageEnabled: hasExtraUsageEnabled,
    billingType: billingType,
    accountCreatedAt: accountCreatedAt,
    subscriptionCreatedAt: subscriptionCreatedAt,
    ccOnboardingFlags: ccOnboardingFlags,
    claudeCodeTrialEndsAt: claudeCodeTrialEndsAt,
    claudeCodeTrialDurationDays: claudeCodeTrialDurationDays,
    seatTier: seatTier
  };
  if (displayName) accountPayload.displayName = displayName;
  M6(prev => {
    if (prev.oauthAccount?.accountUuid === accountPayload.accountUuid && prev.oauthAccount?.emailAddress === accountPayload.emailAddress && prev.oauthAccount?.organizationUuid === accountPayload.organizationUuid && prev.oauthAccount?.displayName === accountPayload.displayName && prev.oauthAccount?.hasExtraUsageEnabled === accountPayload.hasExtraUsageEnabled && prev.oauthAccount?.billingType === accountPayload.billingType && prev.oauthAccount?.accountCreatedAt === accountPayload.accountCreatedAt && prev.oauthAccount?.subscriptionCreatedAt === accountPayload.subscriptionCreatedAt && prev.oauthAccount?.claudeCodeTrialEndsAt === accountPayload.claudeCodeTrialEndsAt && prev.oauthAccount?.claudeCodeTrialDurationDays === accountPayload.claudeCodeTrialDurationDays && prev.oauthAccount?.seatTier === accountPayload.seatTier && JSON.stringify(prev.oauthAccount?.ccOnboardingFlags) === JSON.stringify(accountPayload.ccOnboardingFlags)) return prev;
    return {
      ...prev,
      oauthAccount: {
        ...prev.oauthAccount,
        ...accountPayload
      }
    };
  });
}
function isInvalidGrantError(err) {
  if (!Dq.isAxiosError(err) || !err.response) return false;
  let httpStatus = err.response.status;
  if (httpStatus !== 400 && httpStatus !== 401) return false;
  let responseBody = err.response.data;
  if (!responseBody || typeof responseBody !== "object") return false;
  let errorField = responseBody.error;
  return (typeof errorField === "string" ? errorField : errorField && typeof errorField === "object" ? errorField.type : undefined) === "invalid_grant";
}
function extractOAuthErrorFields(err) {
  if (!Dq.isAxiosError(err) || !err.response) return {};
  let httpStatus = err.response.status,
    responseBody = err.response.data,
    errorTypeStr = "unparseable";
  if (responseBody && typeof responseBody === "object") {
    let errorField = responseBody.error,
      rawErrorType = typeof errorField === "string" ? errorField : errorField && typeof errorField === "object" ? errorField.type : undefined;
    if (typeof rawErrorType === "string" && oauthErrorTypePattern.test(rawErrorType)) errorTypeStr = rawErrorType;
  }
  return {
    oauth_error_status: String(httpStatus),
    oauth_error_type: errorTypeStr
  };
}
var oauthErrorTypePattern;
var oauthAccountModuleInit = L(() => {
  iO();
  f6();
  v_();
  R1();
  Xq();
  O8();
  UH();
  R_();
  HvH();
  oauthErrorTypePattern = /^[a-z][a-z_]{0,39}$/;
});

export {oauthAccountNamespace as Qze,shouldUseClaudeAIAuth as Y2,parseScopes,buildAuthUrl,exchangeCodeForTokens,refreshOAuthToken,revokeOAuthToken,fetchAndStoreUserRoles,createAndStoreApiKey,isOAuthTokenExpired,fetchProfileInfo,getOrganizationUUID,populateOAuthAccountInfoIfNeeded,storeOAuthAccountInfo,isInvalidGrantError,extractOAuthErrorFields,oauthErrorTypePattern as vIu,oauthAccountModuleInit as DH};
