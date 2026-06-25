// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Qu,He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {flushAnalyticsSinks as B3e,QOn} from "./3348_flushAnalyticsSinks.ts";
import {performLogout as dct,clearAuthRelatedCaches as l$t,sUn} from "../session/3763_performLogout.ts";
import {bAe,BNe} from "../../vendor/m1291.ts";
import {storeOAuthAccountInfo as jJe,fetchAndStoreUserRoles as JHr,shouldUseClaudeAIAuth as _2,createAndStoreApiKey as XHr,refreshOAuthToken as _Q,aI} from "./1293_storeOAuthAccountInfo.ts";
import {z2e,oS} from "./2605_event_name.ts";
import {saveOAuthTokensIfNeeded as kse,clearOAuthTokenCache as bF,validateForceLoginOrg as Ise,getAuthTokenSource as Ak,getAnthropicApiKeyWithSource as Yg,getOauthAccountInfo as hc,getSubscriptionType as vi,isUsing3PServices as F7,lo} from "./2036_withOAuthRefreshLock.ts";
import {getOauthTokenFromFd as ASt,setOauthTokenFromFd as _X,lt} from "../session/0132_sent.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {xDa,DDa} from "../../vendor/m3764.ts";
import {fetchBootstrapData as s0e,pct} from "../api/3764_fetchBootstrapData.ts";
import {getInitialSettings as Fr,getSettingsForSource as An,getPolicySettingsOrigin as Qpe,br} from "./0745_updateSettingsForSource.ts";
import {isAdminPolicyOrigin as lYe} from "./0740_settings.ts";
import {LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS as s1e,Sc} from "../api/0465_getOauthConfig.ts";
import {saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {__export as j_,Ce,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Uke,$ke} from "../../vendor/m2752.ts";
import {XW,J4e} from "../telemetry/3768_codeChallenge.ts";
import {LD,oHe} from "../../vendor/m2814.ts";
import {rA,dn} from "./0137_namespace.ts";
import {vUn,wUn,kUn,slo} from "./3781_label.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {py,i0e} from "../../vendor/m3768.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * OAuth authentication command surface for the Claude Code CLI.
 *
 * Exports four entry points wired up via `ft` (the module-export helper):
 *  - `installOAuthTokens` — persist freshly-obtained OAuth tokens + profile, then
 *    reconcile env vars / API-key fallbacks and clean up onboarding state.
 *  - `authStatus` — render the current auth state (text or JSON).
 *  - `authLogout` — clear stored credentials.
 *  - `authLogin` — drive the interactive / refresh-token OAuth login flow.
 */
var HUn = {};
ft(HUn, {
  installOAuthTokens: () => installOAuthTokens,
  authStatus: () => authStatus,
  authLogout: () => authLogout,
  authLogin: () => authLogin
});

/**
 * Print a validation failure message to stderr, fire the
 * "org not allowed" auth telemetry, run the post-auth cleanup, then exit(1).
 * Failures from the telemetry/cleanup path are swallowed on purpose.
 *
 * @param message - Human-readable reason the session is invalid.
 */
async function BPa(message: string): Promise<never> {
  process.stderr.write(message + `
`);
  try {
    await Qu("cli_auth_login", "cli_auth_login_org_not_allowed"), await B3e();
  } catch {}
  process.exit(1);
}

/**
 * Persist a completed OAuth login: store the tokens, write the resolved account /
 * organization profile to config, emit login telemetry, then reconcile the
 * environment (CLAUDE_CODE_OAUTH_TOKEN, API-key fallback) and finalize onboarding.
 *
 * @param oauthResult - The token bundle from the OAuth flow / refresh exchange
 *   (access token, scopes, and optionally a pre-fetched profile or token account).
 */
async function installOAuthTokens(oauthResult: {
  accessToken: string;
  scopes: string[];
  profile?: any;
  tokenAccount?: {
    uuid: string;
    emailAddress: string;
    organizationUuid: string;
  };
}): Promise<void> {
  await dct({
    clearOnboarding: !1,
    preserveInProcessTokens: !0,
    preserveNonAnthropicAuth: !0
  });
  let profile = oauthResult.profile ?? (await bAe(oauthResult.accessToken));
  if (profile) jJe({
    accountUuid: profile.account.uuid,
    emailAddress: profile.account.email,
    organizationUuid: profile.organization.uuid,
    displayName: profile.account.display_name || void 0,
    hasExtraUsageEnabled: profile.organization.has_extra_usage_enabled ?? void 0,
    billingType: profile.organization.billing_type ?? void 0,
    subscriptionCreatedAt: profile.organization.subscription_created_at ?? void 0,
    accountCreatedAt: profile.account.created_at,
    ccOnboardingFlags: profile.organization.cc_onboarding_flags ?? {},
    claudeCodeTrialEndsAt: profile.organization.claude_code_trial_ends_at ?? null,
    claudeCodeTrialDurationDays: profile.organization.claude_code_trial_duration_days ?? null,
    seatTier: profile.organization.seat_tier ?? null,
    profileFetchedAt: Date.now()
  });else if (oauthResult.tokenAccount) jJe({
    accountUuid: oauthResult.tokenAccount.uuid,
    emailAddress: oauthResult.tokenAccount.emailAddress,
    organizationUuid: oauthResult.tokenAccount.organizationUuid
  });
  z2e({
    action: "login",
    success: !0,
    authMethod: "oauth"
  });
  let keyResult = await kse(oauthResult);
  // Reconcile the env override token: drop it on success, restore the raw access
  // token on failure so subsequent requests still authenticate.
  if (bF(), process.env.CLAUDE_CODE_OAUTH_TOKEN) if (keyResult.success) delete process.env.CLAUDE_CODE_OAUTH_TOKEN;else process.env.CLAUDE_CODE_OAUTH_TOKEN = oauthResult.accessToken;
  if (ASt()) _X(keyResult.success ? null : oauthResult.accessToken);
  if (keyResult.warning) W("tengu_oauth_storage_warning", {
    warning: keyResult.warning
  });
  if (await JHr(oauthResult.accessToken).catch((err: unknown) => A(String(err), {
    level: "error"
  })), _2(oauthResult.scopes)) await xDa().catch((err: unknown) => A(String(err), {
    level: "error"
  }));else if (!(await XHr(oauthResult.accessToken))) throw Error("Unable to create API key. The server accepted the request but did not return a key.");
  await l$t(), s0e();
}

/**
 * `claude auth login` handler. Supports a non-interactive path driven by
 * CLAUDE_CODE_OAUTH_REFRESH_TOKEN, otherwise launches the browser OAuth flow and
 * accepts a pasted `code#state` pair from stdin.
 *
 * @param options.email     - Optional login hint email.
 * @param options.sso       - When true, forces the SSO login method.
 * @param options.console   - Force the Console (API) login method.
 * @param options.claudeai  - Force the Claude.ai login method.
 */
async function authLogin({
  email: emailHint,
  sso: useSso,
  console: useConsole,
  claudeai: useClaudeAi
}: {
  email?: string;
  sso?: boolean;
  console?: boolean;
  claudeai?: boolean;
}): Promise<void> {
  if (useConsole && useClaudeAi) process.stderr.write(`Error: --console and --claudeai cannot be used together.
`), process.exit(1);
  let oauthConfig = Fr(),
    policySettings = An("policySettings");
  if (lYe(Qpe()) && policySettings?.forceLoginMethod === "gateway") process.stderr.write(`forceLoginMethod is 'gateway' in managed settings; run interactive /login to authenticate.
`), process.exit(1);
  let forcedLoginMethod = oauthConfig.forceLoginMethod === "gateway" ? void 0 : oauthConfig.forceLoginMethod,
    loginWithClaudeAi = forcedLoginMethod ? forcedLoginMethod === "claudeai" : !useConsole,
    loginMethodMismatch = oauthConfig.forceLoginMethod !== void 0 && loginWithClaudeAi !== (oauthConfig.forceLoginMethod === "claudeai"),
    forcedOrgUUID = typeof oauthConfig.forceLoginOrgUUID === "string" && !loginMethodMismatch ? oauthConfig.forceLoginOrgUUID : void 0,
    refreshTokenEnv = process.env.CLAUDE_CODE_OAUTH_REFRESH_TOKEN;
  if (refreshTokenEnv) {
    let scopesEnv = process.env.CLAUDE_CODE_OAUTH_SCOPES;
    if (!scopesEnv) process.stderr.write(`CLAUDE_CODE_OAUTH_SCOPES is required when using CLAUDE_CODE_OAUTH_REFRESH_TOKEN.
Set it to the space-separated scopes the refresh token was issued with
(e.g. "user:inference" or "user:profile user:inference user:sessions:claude_code user:mcp_servers").
`), process.exit(1);
    let refreshScopes = scopesEnv.split(/\s+/).filter(Boolean);
    try {
      W("tengu_login_from_refresh_token", {});
      let refreshedTokens = await _Q(refreshTokenEnv, {
        scopes: refreshScopes,
        expiresIn: s1e,
        clientId: process.env.CLAUDE_CODE_OAUTH_CLIENT_ID || void 0
      });
      await installOAuthTokens(refreshedTokens);
      let validation = await Ise();
      if (!validation.valid) await BPa(validation.message);
      hn((state: any) => {
        if (state.hasCompletedOnboarding) return state;
        return {
          ...state,
          hasCompletedOnboarding: !0
        };
      }), W("tengu_oauth_success", {
        loginWithClaudeAi: _2(refreshedTokens.scopes)
      }), He("cli_auth_login"), process.stdout.write(`Login successful.
`), process.exit(0);
    } catch (refreshError) {
      if (xe("cli_auth_login", "cli_auth_login_refresh_token_failed"), j_(refreshError)) A(`Login from refresh token failed: ${Ce(refreshError)}`, {
        level: "error"
      });else Ie(refreshError);
      let hint = Uke(refreshError);
      process.stderr.write(`Login failed: ${Ce(refreshError)}
${hint ? hint + `
` : ""}`), process.exit(1);
    }
  }
  let loginMethod = useSso ? "sso" : void 0,
    oauthFlow = new XW(),
    readlineInterface = UPa.createInterface({
      input: process.stdin
    });
  readlineInterface.on("line", (line: string) => {
    let [authorizationCode, state] = line.trim().split("#");
    if (!authorizationCode || !state) {
      process.stderr.write(`Invalid code. Please make sure the full code was copied.
`);
      return;
    }
    W("tengu_oauth_manual_entry", {}), oauthFlow.handleManualAuthCodeInput({
      authorizationCode: authorizationCode,
      state: state
    });
  });
  try {
    W("tengu_oauth_flow_start", {
      loginWithClaudeAi: loginWithClaudeAi
    });
    let flowTokens = await oauthFlow.startOAuthFlow(async (authUrlInput: any) => {
      process.stdout.write(`Opening browser to sign in…
`), process.stdout.write(`If the browser didn't open, visit: ${LD(authUrlInput)}
`), process.stdout.write("Paste code here if prompted > ");
    }, {
      loginWithClaudeAi: loginWithClaudeAi,
      loginHint: emailHint,
      loginMethod: loginMethod,
      orgUUID: forcedOrgUUID
    });
    await installOAuthTokens(flowTokens);
    let validation = await Ise();
    if (!validation.valid) await BPa(validation.message);
    W("tengu_oauth_success", {
      loginWithClaudeAi: loginWithClaudeAi
    }), He("cli_auth_login"), process.stdout.write(`Login successful.
`), process.exit(0);
  } catch (flowError) {
    if (xe("cli_auth_login", "cli_auth_login_oauth_flow_failed"), j_(flowError)) A(`OAuth login failed: ${Ce(flowError)}`, {
      level: "error"
    });else Ie(flowError);
    let hint = Uke(flowError);
    process.stderr.write(`Login failed: ${Ce(flowError)}
${hint ? hint + `
` : ""}`), process.exit(1);
  } finally {
    readlineInterface.close(), oauthFlow.cleanup();
  }
}

/**
 * `claude auth status` handler. Resolves the effective auth method from token
 * storage, API-key sources, and third-party gateway config, then renders either
 * a human-readable list (`--text`) or a JSON payload. Exits 0 when logged in.
 *
 * @param renderer - Ink-style renderer with `render`/`waitUntilExit`.
 * @param options.text - Render the plain-text variant instead of JSON.
 */
async function authStatus(renderer: { render: (node: any) => void; waitUntilExit: () => Promise<void> }, options: { text?: boolean }): Promise<void> {
  let {
      source: tokenSource,
      hasToken: hasStoredToken
    } = Ak(),
    {
      source: apiKeySource
    } = Yg(),
    hasAnthropicApiKeyEnv = !!process.env.ANTHROPIC_API_KEY && !rA(),
    oauthAccount = hc(),
    subscriptionType = vi(),
    isThirdPartyGateway = F7(),
    loggedIn = hasStoredToken || apiKeySource !== "none" || hasAnthropicApiKeyEnv || isThirdPartyGateway,
    authMethod = "none";
  if (isThirdPartyGateway) authMethod = "third_party";else if (tokenSource === "claude.ai") authMethod = "claude.ai";else if (tokenSource === "apiKeyHelper") authMethod = "api_key_helper";else if (tokenSource !== "none") authMethod = "oauth_token";else if (apiKeySource === "ANTHROPIC_API_KEY" || hasAnthropicApiKeyEnv) authMethod = "api_key";else if (apiKeySource === "/login managed key") authMethod = "claude.ai";
  let renderedNode: any;
  if (options.text) {
    let statusEntries = vUn([[...wUn(), ...kUn()]]).flat(),
      lines: string[] = [];
    for (let entry of statusEntries) {
      let value = typeof entry.value === "string" ? entry.value : Array.isArray(entry.value) ? entry.value.join(", ") : null;
      if (value === null || value === "none") continue;
      lines.push(entry.label ? `${entry.label}: ${value}` : value);
    }
    if (lines.length === 0 && hasAnthropicApiKeyEnv) lines.push("API key: ANTHROPIC_API_KEY");
    if (!loggedIn) lines.push("Not logged in. Run claude auth login to authenticate.");
    renderedNode = Hct.jsx(v, {
      children: lines.join(`
`)
    });
  } else {
    let apiProvider = Rr(),
      apiKeySourceLabel = apiKeySource !== "none" ? apiKeySource : hasAnthropicApiKeyEnv ? "ANTHROPIC_API_KEY" : null,
      statusJson: any = {
        loggedIn: loggedIn,
        authMethod: authMethod,
        apiProvider: apiProvider
      };
    if (apiKeySourceLabel) statusJson.apiKeySource = apiKeySourceLabel;
    if (authMethod === "claude.ai") statusJson.email = oauthAccount?.emailAddress ?? null, statusJson.orgId = oauthAccount?.organizationUuid ?? null, statusJson.orgName = oauthAccount?.organizationName ?? null, statusJson.subscriptionType = subscriptionType ?? null;
    renderedNode = Hct.jsx(v, {
      children: Pe(statusJson, null, 2)
    });
  }
  He("cli_auth_status"), renderer.render(Hct.jsx(py, {
    children: renderedNode
  })), await renderer.waitUntilExit(), process.exit(loggedIn ? 0 : 1);
}

/**
 * `claude auth logout` handler. Clears stored credentials (keeping onboarding
 * state) and renders a confirmation. Exits 1 if the credential wipe fails.
 *
 * @param renderer - Ink-style renderer with `render`/`waitUntilExit`.
 */
async function authLogout(renderer: { render: (node: any) => void; waitUntilExit: () => Promise<void> }): Promise<void> {
  try {
    await dct({
      clearOnboarding: !1
    });
  } catch (logoutError) {
    xe("cli_auth_logout", "cli_auth_logout_failed"), Ie(logoutError), process.stderr.write(`Logout failed: ${Ce(logoutError)}
`), process.exit(1);
  }
  He("cli_auth_logout"), renderer.render(Hct.jsx(py, {
    children: Hct.jsx(v, {
      children: "Successfully logged out from your Anthropic account."
    })
  })), await renderer.waitUntilExit();
}
var UPa, Hct;
var Ict = b(() => {
  lt();
  sUn();
  Sc();
  je();
  mn();
  QOn();
  kt();
  pct();
  $ke();
  DDa();
  aI();
  BNe();
  J4e();
  lo();
  tr();
  qe();
  dn();
  Ct();
  oHe();
  vn();
  Ps();
  br();
  tn();
  i0e();
  slo();
  oS();
  UPa = require("readline"), Hct = x(oe(), 1);
});

export {HUn,BPa,installOAuthTokens,authLogin,authStatus,authLogout,UPa,Hct,Ict};
