// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {CLAUDE_AI_INFERENCE_SCOPE as JU,getOauthConfig as Hs,ALL_OAUTH_SCOPES as Egr,CLAUDE_AI_OAUTH_SCOPES as PEe,Sc} from "../api/0465_getOauthConfig.ts";
import {ho} from "../../vendor/m572.ts";
import {xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getClaudeAIOAuthTokens as qs,saveApiKey as ZHr,Vv,checkAndRefreshOAuthTokenIfNeeded as Dh,isClaudeAISubscriber as Eo,lo} from "./2036_withOAuthRefreshLock.ts";
import {Ce,J5o,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Ve,HN,Bo} from "../../vendor/m5.ts";
import {bAe,BNe} from "../../vendor/m1291.ts";
import {ap} from "../../vendor/m573.ts";
var oauthAccountNamespace = {};
ft(oauthAccountNamespace, {
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
/** True when the granted scopes include the Claude.ai inference scope. */
function shouldUseClaudeAIAuth(scopes) {
  return Array.isArray(scopes) && scopes.includes(JU);
}
/** Split a space-delimited OAuth scope string into a list of scopes. */
function parseScopes(scopeStr) {
  if (typeof scopeStr !== "string") return [];
  return scopeStr.split(" ").filter(Boolean);
}
/** Build the OAuth authorize URL with PKCE challenge and requested scopes. */
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
  let authorizeBaseUrl = loginWithClaudeAi ? Hs().CLAUDE_AI_AUTHORIZE_URL : Hs().CONSOLE_AUTHORIZE_URL,
    authUrl = new URL(authorizeBaseUrl);
  authUrl.searchParams.append("code", "true"), authUrl.searchParams.append("client_id", oauthClient?.clientId ?? Hs().CLIENT_ID), authUrl.searchParams.append("response_type", "code"), authUrl.searchParams.append("redirect_uri", isManual ? Hs().MANUAL_REDIRECT_URL : `http://localhost:${port}/callback`);
  let scopeList = oauthClient ? oauthClient.scopes : inferenceOnly ? [JU] : Egr;
  if (authUrl.searchParams.append("scope", scopeList.join(" ")), authUrl.searchParams.append("code_challenge", codeChallenge), authUrl.searchParams.append("code_challenge_method", "S256"), authUrl.searchParams.append("state", state), orgUUID) authUrl.searchParams.append("orgUUID", orgUUID);
  if (loginHint) authUrl.searchParams.append("login_hint", loginHint);
  if (loginMethod) authUrl.searchParams.append("login_method", loginMethod);
  return authUrl.toString();
}
/** Exchange an authorization code for OAuth tokens via the token endpoint. */
async function exchangeCodeForTokens(authCode, state, codeVerifier, port, isManual = !1, expiresIn, clientId) {
  let requestBody = {
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: isManual ? Hs().MANUAL_REDIRECT_URL : `http://localhost:${port}/callback`,
    client_id: clientId ?? Hs().CLIENT_ID,
    code_verifier: codeVerifier,
    state: state
  };
  if (expiresIn !== void 0) requestBody.expires_in = expiresIn;
  let response = await ho.post(Hs().TOKEN_URL, requestBody, {
    headers: {
      "Content-Type": "application/json"
    },
    timeout: 30000
  });
  if (response.status !== 200) throw xe("oauth_token_exchange", response.status === 401 ? "oauth_exchange_invalid_code" : "oauth_exchange_http_error"), Error(response.status === 401 ? "Authentication failed: Invalid authorization code" : `Token exchange failed (${response.status}): ${response.statusText}`);
  return W("tengu_oauth_token_exchange_success", {}), He("oauth_token_exchange"), response.data;
}
/** Refresh the OAuth access token and (optionally) sync the cached profile. */
async function refreshOAuthToken(refreshToken, {
  scopes: scopes,
  expiresIn: expiresIn,
  clientId: clientId,
  skipProfileFetch: skipProfileFetch
} = {}) {
  let requestBody = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId ?? Hs().CLIENT_ID,
    scope: (Array.isArray(scopes) && scopes.length ? scopes : PEe).join(" ")
  };
  if (expiresIn !== void 0) requestBody.expires_in = expiresIn;
  try {
    let response = await ho.post(Hs().TOKEN_URL, requestBody, {
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
    W("tengu_oauth_token_refresh_success", {}), He("oauth_token_refresh");
    let globalCfg = Ot(),
      existingTokens = skipProfileFetch ? null : qs(),
      alreadyHasProfileData = globalCfg.oauthAccount?.billingType !== void 0 && globalCfg.oauthAccount?.accountCreatedAt !== void 0 && globalCfg.oauthAccount?.subscriptionCreatedAt !== void 0 && globalCfg.oauthAccount?.ccOnboardingFlags !== void 0 && existingTokens?.subscriptionType != null && existingTokens?.rateLimitTier != null,
      freshProfile = skipProfileFetch || alreadyHasProfileData ? null : await fetchProfileInfo(newAccessToken);
    if (freshProfile && globalCfg.oauthAccount) {
      let profileUpdate = {};
      if (freshProfile.displayName !== void 0) profileUpdate.displayName = freshProfile.displayName;
      if (typeof freshProfile.hasExtraUsageEnabled === "boolean") profileUpdate.hasExtraUsageEnabled = freshProfile.hasExtraUsageEnabled;
      if (freshProfile.billingType !== null) profileUpdate.billingType = freshProfile.billingType;
      if (freshProfile.accountCreatedAt !== void 0) profileUpdate.accountCreatedAt = freshProfile.accountCreatedAt;
      if (freshProfile.subscriptionCreatedAt !== void 0) profileUpdate.subscriptionCreatedAt = freshProfile.subscriptionCreatedAt;
      if (freshProfile.rawProfile) profileUpdate.ccOnboardingFlags = freshProfile.ccOnboardingFlags, profileUpdate.claudeCodeTrialEndsAt = freshProfile.claudeCodeTrialEndsAt, profileUpdate.claudeCodeTrialDurationDays = freshProfile.claudeCodeTrialDurationDays, profileUpdate.seatTier = freshProfile.seatTier, profileUpdate.profileFetchedAt = Date.now();
      if (Object.keys(profileUpdate).length > 0) hn(prev => ({
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
      } : void 0
    };
  } catch (err) {
    if (W("tengu_oauth_token_refresh_failure", {
      error: Ce(err),
      ...extractOAuthErrorFields(err)
    }), isInvalidGrantError(err)) xe("oauth_token_refresh", "oauth_refresh_invalid_grant");else Pt("oauth_token_refresh", "oauth_refresh_request_failed");
    throw err;
  }
}
/** Revoke the given refresh token; failures are logged but non-fatal. */
async function revokeOAuthToken(refreshToken, clientId) {
  try {
    await ho.post(`${Hs().TOKEN_URL}/revoke`, {
      token: refreshToken,
      token_type_hint: "refresh_token",
      client_id: clientId ?? Hs().CLIENT_ID
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 5000
    }), He("oauth_token_revoke");
  } catch (err) {
    let httpStatus = ho.isAxiosError(err) ? err.response?.status : void 0;
    A(`OAuth token revoke failed (status=${httpStatus ?? "network"}); continuing with local logout.`), Pt("oauth_token_revoke", `http_${httpStatus ?? "network"}`);
  }
}
/** Fetch the user's organization/workspace roles and persist them to config. */
async function fetchAndStoreUserRoles(accessToken) {
  let response = await ho.get(Hs().ROLES_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (response.status !== 200) throw xe("oauth_fetch_roles", "oauth_roles_http_error"), Error(`Failed to fetch user roles: ${response.statusText}`);
  let rolesData = response.data;
  if (!Ot().oauthAccount) throw xe("oauth_fetch_roles", "oauth_roles_no_account"), Error("OAuth account information not found in config");
  hn(prev => ({
    ...prev,
    oauthAccount: prev.oauthAccount ? {
      ...prev.oauthAccount,
      organizationRole: rolesData.organization_role,
      workspaceRole: rolesData.workspace_role,
      organizationName: rolesData.organization_name
    } : prev.oauthAccount
  })), W("tengu_oauth_roles_stored", {
    org_role: rolesData.organization_role
  }), He("oauth_fetch_roles");
}
/** Mint a long-lived API key from the OAuth access token and store it. */
async function createAndStoreApiKey(accessToken) {
  try {
    let response = await ho.post(Hs().API_KEY_URL, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }),
      rawKey = response.data?.raw_key;
    if (rawKey) return await ZHr(rawKey), W("tengu_oauth_api_key", {
      status: Ve("success"),
      statusCode: response.status
    }), He("oauth_create_api_key"), rawKey;
    return xe("oauth_create_api_key", "oauth_api_key_empty_response"), null;
  } catch (err) {
    throw W("tengu_oauth_api_key", {
      status: Ve("failure"),
      error: err instanceof Error ? err.message : String(err)
    }), xe("oauth_create_api_key", "oauth_api_key_request_failed"), err;
  }
}
/** True if the access token is expired or within the early-expiry buffer. */
function isOAuthTokenExpired(expiresAt) {
  if (expiresAt === null) return !1;
  let earlyExpiryBuffer = 300000;
  return Date.now() + earlyExpiryBuffer >= expiresAt;
}
/** Fetch the account profile and normalize it into subscription/profile fields. */
async function fetchProfileInfo(accessToken) {
  let profileData = await bAe(accessToken),
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
  return W("tengu_oauth_profile_fetch_success", {}), {
    ...result,
    rawProfile: profileData
  };
}
/** Resolve the organization UUID from env, cached config, or a profile fetch. */
async function getOrganizationUUID() {
  let envOrgUuid = process.env.CLAUDE_CODE_ORGANIZATION_UUID;
  if (envOrgUuid) return envOrgUuid;
  let cachedOrgUuid = Ot().oauthAccount?.organizationUuid;
  if (cachedOrgUuid) return cachedOrgUuid;
  let accessToken = qs()?.accessToken;
  if (accessToken === void 0 || !Vv()) return null;
  let fetchedUuid = (await bAe(accessToken))?.organization?.uuid;
  if (!fetchedUuid) return null;
  return fetchedUuid;
}
/** Populate cached OAuth account info from env vars or a profile fetch if stale. */
async function populateOAuthAccountInfoIfNeeded() {
  let envAccountUuid = process.env.CLAUDE_CODE_ACCOUNT_UUID,
    envEmailAddress = process.env.CLAUDE_CODE_USER_EMAIL,
    envOrgUuid = process.env.CLAUDE_CODE_ORGANIZATION_UUID,
    hasAllEnvVars = Boolean(envAccountUuid && envEmailAddress && envOrgUuid);
  if (envAccountUuid && envEmailAddress && envOrgUuid) {
    if (!Ot().oauthAccount) storeOAuthAccountInfo({
      accountUuid: envAccountUuid,
      emailAddress: envEmailAddress,
      organizationUuid: envOrgUuid
    });
  }
  await Dh();
  let currentCfg = Ot(),
    profileFetchedAt = currentCfg.oauthAccount?.profileFetchedAt,
    profileIsFresh = profileFetchedAt !== void 0 && Date.now() - profileFetchedAt < $Bu;
  if (currentCfg.oauthAccount && currentCfg.oauthAccount.billingType !== void 0 && currentCfg.oauthAccount.accountCreatedAt !== void 0 && currentCfg.oauthAccount.subscriptionCreatedAt !== void 0 && currentCfg.oauthAccount.ccOnboardingFlags !== void 0 && profileIsFresh || !Eo() || !Vv()) return !1;
  let tokens = qs();
  if (tokens?.accessToken) {
    let profileData = await bAe(tokens.accessToken);
    if (profileData) {
      if (hasAllEnvVars) A("OAuth profile fetch succeeded, overriding env var account info", {
        level: "info"
      });
      return storeOAuthAccountInfo({
        accountUuid: profileData.account.uuid,
        emailAddress: profileData.account.email,
        organizationUuid: profileData.organization.uuid,
        displayName: profileData.account.display_name || void 0,
        hasExtraUsageEnabled: profileData.organization.has_extra_usage_enabled ?? !1,
        billingType: profileData.organization.billing_type ?? void 0,
        accountCreatedAt: profileData.account.created_at,
        subscriptionCreatedAt: profileData.organization.subscription_created_at ?? void 0,
        ccOnboardingFlags: profileData.organization.cc_onboarding_flags ?? {},
        claudeCodeTrialEndsAt: profileData.organization.claude_code_trial_ends_at ?? null,
        claudeCodeTrialDurationDays: profileData.organization.claude_code_trial_duration_days ?? null,
        seatTier: profileData.organization.seat_tier ?? null,
        profileFetchedAt: Date.now()
      }), !0;
    }
  }
  return !1;
}
/** Persist the OAuth account info to config, skipping writes when unchanged. */
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
  seatTier: seatTier,
  profileFetchedAt: profileFetchedAt
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
  if (profileFetchedAt !== void 0) accountPayload.profileFetchedAt = profileFetchedAt;
  hn(prev => {
    if (profileFetchedAt === void 0 && prev.oauthAccount?.accountUuid === accountPayload.accountUuid && prev.oauthAccount?.emailAddress === accountPayload.emailAddress && prev.oauthAccount?.organizationUuid === accountPayload.organizationUuid && prev.oauthAccount?.displayName === accountPayload.displayName && prev.oauthAccount?.hasExtraUsageEnabled === accountPayload.hasExtraUsageEnabled && prev.oauthAccount?.billingType === accountPayload.billingType && prev.oauthAccount?.accountCreatedAt === accountPayload.accountCreatedAt && prev.oauthAccount?.subscriptionCreatedAt === accountPayload.subscriptionCreatedAt && prev.oauthAccount?.claudeCodeTrialEndsAt === accountPayload.claudeCodeTrialEndsAt && prev.oauthAccount?.claudeCodeTrialDurationDays === accountPayload.claudeCodeTrialDurationDays && prev.oauthAccount?.seatTier === accountPayload.seatTier && JSON.stringify(prev.oauthAccount?.ccOnboardingFlags) === JSON.stringify(accountPayload.ccOnboardingFlags)) return prev;
    return {
      ...prev,
      oauthAccount: {
        ...prev.oauthAccount,
        ...accountPayload
      }
    };
  });
}
/** Extract the OAuth error code and description from a response body. */
function ABs(responseBody) {
  if (!responseBody || typeof responseBody !== "object") return {
    code: void 0,
    description: void 0
  };
  let body = responseBody,
    errorField = body.error;
  return {
    code: typeof errorField === "string" ? errorField : errorField && typeof errorField === "object" ? errorField.type : void 0,
    description: body.error_description
  };
}
/** True when the axios error represents an OAuth invalid_grant response. */
function isInvalidGrantError(err) {
  if (!ho.isAxiosError(err) || !err.response) return !1;
  let httpStatus = err.response.status;
  if (httpStatus !== 400 && httpStatus !== 401) return !1;
  return ABs(err.response.data).code === "invalid_grant";
}
/** Build telemetry fields (status/type/description) from an OAuth error. */
function extractOAuthErrorFields(err) {
  if (!ho.isAxiosError(err) || !err.response) return {};
  let {
    code: code,
    description: description
  } = ABs(err.response.data);
  return {
    oauth_error_status: HN(err.response.status),
    oauth_error_type: J5o(code),
    oauth_error_description: Bo(qBu.find(knownDescription => knownDescription === description))
  };
}
/** One day in milliseconds — the cached-profile freshness window. */
var $Bu = 86400000,
  qBu;
var oauthAccountModuleInit = b(() => {
  ap();
  mn();
  kt();
  Sc();
  lo();
  tr();
  qe();
  Ct();
  BNe();
  qBu = ["Refresh token expired", "Refresh token not found or invalid", "No organization associated with this token", "No account associated with this token"];
});

export {oauthAccountNamespace as YJe,shouldUseClaudeAIAuth,parseScopes,buildAuthUrl,exchangeCodeForTokens,refreshOAuthToken,revokeOAuthToken,fetchAndStoreUserRoles,createAndStoreApiKey,isOAuthTokenExpired,fetchProfileInfo,getOrganizationUUID,populateOAuthAccountInfoIfNeeded,storeOAuthAccountInfo,ABs,isInvalidGrantError,extractOAuthErrorFields,$Bu,qBu,oauthAccountModuleInit as aI};
