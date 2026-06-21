// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L,M as x} from "../../runtime.ts";
import {TA as N$,Ie as SH,Oe as IH,ln as P6} from "../telemetry/0594_feature_name.ts";
import {flushAnalyticsSinks as SxH,aDn as CR6} from "../config/3332_flushAnalyticsSinks.ts";
import {performLogout as Y7_,clearAuthRelatedCaches as MS_,pNn as uy6} from "../session/3747_performLogout.ts";
import {BEe as OMH,G1e as lyH} from "../../vendor/m1286.ts";
import {storeOAuthAccountInfo as siH,fetchAndStoreUserRoles as hM8,Y2 as dI,createAndStoreApiKey as kM8,refreshOAuthToken as Tt,DH as bG} from "../config/1288_storeOAuthAccountInfo.ts";
import {KUe as tCH,uS as Oj} from "../config/2594_event_name.ts";
import {saveOAuthTokensIfNeeded as h9H,clearOAuthTokenCache as Yx,validateForceLoginOrg as aTH,getAuthTokenSource as TZ,getAnthropicApiKeyWithSource as EA,getOauthAccountInfo as L1,getSubscriptionType as fK,isUsing3PServices as zi,Ao as jq} from "../config/2031_withOAuthRefreshLock.ts";
import {getOauthTokenFromFd as xY_,setOauthTokenFromFd as qs,lt as Y_} from "../session/0131_sent.ts";
import {logEvent as c,Ct as E_} from "../../vendor/m131.ts";
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {fwa as hDK,Awa as kDK} from "../../vendor/m3748.ts";
import {Aat as A7_,mNn as my6} from "../api/3748_organizationType.ts";
import {getInitialSettings as c8,getSettingsForSource as I6,getPolicySettingsOrigin as YOH,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {isAdminPolicyOrigin as AnH} from "../config/0735_settings.ts";
import {LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS as PVH,Dc as G1} from "../api/0459_getOauthConfig.ts";
import {saveGlobalConfig as W6,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {K_ as Fw,Se as GH,bt as G_} from "../../vendor/m195.ts";
import {De as CH,Rn as C6} from "../session/0615_length.ts";
import {exe as DWH,txe as V$H} from "../../vendor/m2739.ts";
import {MW as jc,M3e as muH} from "../telemetry/3752_codeChallenge.ts";
import {MF as cC,s$e as $IH} from "../../vendor/m2801.ts";
import {YC as t2,sn as w6} from "../config/0047_namespace.ts";
import {LNn as Ov6,MNn as Tv6,NNn as zv6,bro as R_q} from "../config/3765_label.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {getAPIProvider as S8,li as M7} from "../api/1282_usesFirstPartyModelIds.ts";
import {Le as xH,Xt as t_} from "../config/0228_encoding.ts";
import {dy as _f,_He as BZH} from "../../vendor/m3752.ts";
import {ze as rH} from "../../vendor/m2452.ts";
import {Te as ZH} from "../../vendor/m2253.ts";
// @ts-nocheck
var moduleExports = {};
j_(moduleExports, {
  installOAuthTokens: () => authLogin,
  authStatus: () => authLogout,
  authLogout: () => PKO,
  authLogin: () => authStatus
});
async function installOAuthTokens(tokenData) {
  process.stderr.write(tokenData + `
`);
  try {
    await N$("cli_auth_login", "cli_auth_login_org_not_allowed"), await SxH();
  } catch {}
  process.exit(1);
}
async function authLogin(H) {
  await Y7_({
    clearOnboarding: false,
    preserveInProcessTokens: true,
    preserveNonAnthropicAuth: true
  });
  let initialSettings = H.profile ?? (await OMH(H.accessToken));
  if (initialSettings) siH({
    accountUuid: initialSettings.account.uuid,
    emailAddress: initialSettings.account.email,
    organizationUuid: initialSettings.organization.uuid,
    displayName: initialSettings.account.display_name || undefined,
    hasExtraUsageEnabled: initialSettings.organization.has_extra_usage_enabled ?? undefined,
    billingType: initialSettings.organization.billing_type ?? undefined,
    subscriptionCreatedAt: initialSettings.organization.subscription_created_at ?? undefined,
    accountCreatedAt: initialSettings.account.created_at,
    ccOnboardingFlags: initialSettings.organization.cc_onboarding_flags ?? {},
    claudeCodeTrialEndsAt: initialSettings.organization.claude_code_trial_ends_at ?? null,
    claudeCodeTrialDurationDays: initialSettings.organization.claude_code_trial_duration_days ?? null,
    seatTier: initialSettings.organization.seat_tier ?? null
  });else if (H.tokenAccount) siH({
    accountUuid: H.tokenAccount.uuid,
    emailAddress: H.tokenAccount.emailAddress,
    organizationUuid: H.tokenAccount.organizationUuid
  });
  tCH({
    action: "login",
    success: true,
    authMethod: "oauth"
  });
  let forceMethod = await h9H(H);
  if (Yx(), process.env.CLAUDE_CODE_OAUTH_TOKEN) if (forceMethod.success) delete process.env.CLAUDE_CODE_OAUTH_TOKEN;else process.env.CLAUDE_CODE_OAUTH_TOKEN = H.accessToken;
  if (xY_()) qs(forceMethod.success ? null : H.accessToken);
  if (forceMethod.warning) c("tengu_oauth_storage_warning", {
    warning: forceMethod.warning
  });
  if (await hM8(H.accessToken).catch(K => N(String(K), {
    level: "error"
  })), dI(H.scopes)) await hDK().catch(K => N(String(K), {
    level: "error"
  }));else if (!(await kM8(H.accessToken))) throw Error("Unable to create API key. The server accepted the request but did not return a key.");
  await MS_(), A7_();
}
async function authStatus({
  email: H,
  sso: _,
  console: q,
  claudeai: K
}) {
  if (q && K) process.stderr.write(`Error: --console and --claudeai cannot be used together.
`), process.exit(1);
  let O = c8(),
    T = I6("policySettings");
  if (AnH(YOH()) && T?.forceLoginMethod === "gateway") process.stderr.write(`forceLoginMethod is 'gateway' in managed settings; run interactive /login to authenticate.
`), process.exit(1);
  let z = O.forceLoginMethod === "gateway" ? undefined : O.forceLoginMethod,
    $ = z ? z === "claudeai" : !q,
    Y = O.forceLoginMethod !== undefined && $ !== (O.forceLoginMethod === "claudeai"),
    A = typeof O.forceLoginOrgUUID === "string" && !Y ? O.forceLoginOrgUUID : undefined,
    w = process.env.CLAUDE_CODE_OAUTH_REFRESH_TOKEN;
  if (w) {
    let D = process.env.CLAUDE_CODE_OAUTH_SCOPES;
    if (!D) process.stderr.write(`CLAUDE_CODE_OAUTH_SCOPES is required when using CLAUDE_CODE_OAUTH_REFRESH_TOKEN.
Set it to the space-separated scopes the refresh token was issued with
(e.g. "user:inference" or "user:profile user:inference user:sessions:claude_code user:mcp_servers").
`), process.exit(1);
    let M = D.split(/\s+/).filter(Boolean);
    try {
      c("tengu_login_from_refresh_token", {});
      let X = await Tt(w, {
        scopes: M,
        expiresIn: PVH,
        clientId: process.env.CLAUDE_CODE_OAUTH_CLIENT_ID || undefined
      });
      await authLogin(X);
      let P = await aTH();
      if (!P.valid) await installOAuthTokens(P.message);
      W6(Z => {
        if (Z.hasCompletedOnboarding) return Z;
        return {
          ...Z,
          hasCompletedOnboarding: true
        };
      }), c("tengu_oauth_success", {
        loginWithClaudeAi: dI(X.scopes)
      }), SH("cli_auth_login"), process.stdout.write(`Login successful.
`), process.exit(0);
    } catch (X) {
      if (IH("cli_auth_login", "cli_auth_login_refresh_token_failed"), Fw(X)) N(`Login from refresh token failed: ${GH(X)}`, {
        level: "error"
      });else CH(X);
      let P = DWH(X);
      process.stderr.write(`Login failed: ${GH(X)}
${P ? P + `
` : ""}`), process.exit(1);
    }
  }
  let f = _ ? "sso" : undefined,
    j = new jc(),
    J = moduleInit.createInterface({
      input: process.stdin
    });
  J.on("line", D => {
    let [M, X] = D.trim().split("#");
    if (!M || !X) {
      process.stderr.write(`Invalid code. Please make sure the full code was copied.
`);
      return;
    }
    c("tengu_oauth_manual_entry", {}), j.handleManualAuthCodeInput({
      authorizationCode: M,
      state: X
    });
  });
  try {
    c("tengu_oauth_flow_start", {
      loginWithClaudeAi: $
    });
    let D = await j.startOAuthFlow(async X => {
      process.stdout.write(`Opening browser to sign in\u2026
`), process.stdout.write(`If the browser didn't open, visit: ${cC(X)}
`), process.stdout.write("Paste code here if prompted > ");
    }, {
      loginWithClaudeAi: $,
      loginHint: H,
      loginMethod: f,
      orgUUID: A
    });
    await authLogin(D);
    let M = await aTH();
    if (!M.valid) await installOAuthTokens(M.message);
    c("tengu_oauth_success", {
      loginWithClaudeAi: $
    }), SH("cli_auth_login"), process.stdout.write(`Login successful.
`), process.exit(0);
  } catch (D) {
    if (IH("cli_auth_login", "cli_auth_login_oauth_flow_failed"), Fw(D)) N(`OAuth login failed: ${GH(D)}`, {
      level: "error"
    });else CH(D);
    let M = DWH(D);
    process.stderr.write(`Login failed: ${GH(D)}
${M ? M + `
` : ""}`), process.exit(1);
  } finally {
    J.close(), j.cleanup();
  }
}
async function authLogout(inkApp, _) {
  let {
      source: q,
      hasToken: K
    } = TZ(),
    {
      source: O
    } = EA(),
    T = !!process.env.ANTHROPIC_API_KEY && !t2(),
    z = L1(),
    $ = fK(),
    Y = zi(),
    A = K || O !== "none" || T || Y,
    w = "none";
  if (Y) w = "third_party";else if (q === "claude.ai") w = "claude.ai";else if (q === "apiKeyHelper") w = "api_key_helper";else if (q !== "none") w = "oauth_token";else if (O === "ANTHROPIC_API_KEY" || T) w = "api_key";else if (O === "/login managed key") w = "claude.ai";
  let f;
  if (_.text) {
    let j = Ov6([[...Tv6(), ...zv6()]]).flat(),
      J = [];
    for (let D of j) {
      let M = typeof D.value === "string" ? D.value : Array.isArray(D.value) ? D.value.join(", ") : null;
      if (M === null || M === "none") continue;
      J.push(D.label ? `${D.label}: ${M}` : M);
    }
    if (J.length === 0 && T) J.push("API key: ANTHROPIC_API_KEY");
    if (!A) J.push("Not logged in. Run claude auth login to authenticate.");
    f = readlineModule.default.createElement(V, null, J.join(`
`));
  } else {
    let j = S8(),
      J = O !== "none" ? O : T ? "ANTHROPIC_API_KEY" : null,
      D = {
        loggedIn: A,
        authMethod: w,
        apiProvider: j
      };
    if (J) D.apiKeySource = J;
    if (w === "claude.ai") D.email = z?.emailAddress ?? null, D.orgId = z?.organizationUuid ?? null, D.orgName = z?.organizationName ?? null, D.subscriptionType = $ ?? null;
    f = readlineModule.default.createElement(V, null, xH(D, null, 2));
  }
  SH("cli_auth_status"), inkApp.render(readlineModule.default.createElement(_f, null, f)), await inkApp.waitUntilExit(), process.exit(A ? 0 : 1);
}
async function PKO(H) {
  try {
    await Y7_({
      clearOnboarding: false
    });
  } catch (_) {
    IH("cli_auth_logout", "cli_auth_logout_failed"), CH(_), process.stderr.write(`Logout failed: ${GH(_)}
`), process.exit(1);
  }
  SH("cli_auth_logout"), H.render(readlineModule.default.createElement(_f, null, readlineModule.default.createElement(V, null, "Successfully logged out from your Anthropic account."))), await H.waitUntilExit();
}
var readlineModule, moduleInit;
var N7_ = L(() => {
  Y_();
  uy6();
  G1();
  rH();
  P6();
  CR6();
  E_();
  my6();
  V$H();
  kDK();
  bG();
  lyH();
  muH();
  jq();
  O8();
  gH();
  w6();
  G_();
  $IH();
  C6();
  M7();
  N8();
  t_();
  BZH();
  R_q();
  Oj();
  readlineModule = x(ZH(), 1), moduleInit = require("readline");
});

export {moduleExports as BNn,installOAuthTokens as TRa,authLogin as installOAuthTokens,authStatus as authLogin,authLogout as authStatus,PKO as authLogout,readlineModule as Hat,moduleInit as SRa,N7_ as Iat};
