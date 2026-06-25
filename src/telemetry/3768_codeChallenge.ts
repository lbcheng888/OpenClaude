// @ts-nocheck
import {LDa as uMK,MDa as mMK,NDa as pMK,FDa as BMK} from "../../vendor/m3766.ts";
import {Dao as D_q,ODa as xMK} from "./3766_custom_handler.ts";
import {buildAuthUrl as uK6,exchangeCodeForTokens as uM8,fetchProfileInfo as mK6,parseScopes as DX_,aI as RG} from "../config/1293_storeOAuthAccountInfo.ts";
import {Zl as k1,Jg as JA} from "../../vendor/m2044.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {He as EH,xe as bH,mn as f6} from "./0600_feature_name.ts";
import {z2e as ObH,oS as _j} from "../config/2605_event_name.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
class OAuthFlowManager {
  codeVerifier;
  authCodeListener = null;
  port = null;
  manualAuthCodeResolver = null;
  constructor() {
    this.codeVerifier = uMK();
  }
  async startOAuthFlow(openBrowserCallback, opts) {
    this.authCodeListener = new D_q(), this.port = await this.authCodeListener.start();
    let q = mMK(this.codeVerifier),
      codeChallenge = pMK(),
      state = {
        codeChallenge: q,
        state: codeChallenge,
        port: this.port,
        loginWithClaudeAi: opts?.loginWithClaudeAi,
        inferenceOnly: opts?.inferenceOnly,
        orgUUID: opts?.orgUUID,
        loginHint: opts?.loginHint,
        loginMethod: opts?.loginMethod,
        oauthClient: opts?.oauthClient
      },
      authUrlOpts = uK6({
        ...state,
        isManual: true
      }),
      manualUrl = uK6({
        ...state,
        isManual: false
      }),
      autoUrl = await this.waitForAuthorizationCode(codeChallenge, async () => {
        if (opts?.skipBrowserOpen) await openBrowserCallback(authUrlOpts, manualUrl);else await openBrowserCallback(authUrlOpts), await k1(manualUrl);
      }),
      authCode = this.authCodeListener?.hasPendingResponse() ?? false;
    c("tengu_oauth_auth_code_received", {
      automatic: authCode
    });
    try {
      let w = await uM8(autoUrl, codeChallenge, this.codeVerifier, this.port, !authCode, opts?.expiresIn, opts?.oauthClient?.clientId),
        A = opts?.skipProfileFetch ? null : await mK6(w.access_token);
      if (authCode) {
        let f = DX_(w.scope),
          j = opts?.successRedirectUrl;
        if (j) this.authCodeListener?.handleSuccessRedirect(f, J => {
          J.writeHead(302, {
            Location: j
          }), J.end();
        });else this.authCodeListener?.handleSuccessRedirect(f);
      }
      return EH("oauth_login"), this.formatTokens(w, A?.subscriptionType ?? null, A?.rateLimitTier ?? null, A?.rawProfile, opts?.oauthClient?.clientId);
    } catch (w) {
      if (bH("oauth_login", "oauth_login_failed"), authCode) this.authCodeListener?.handleErrorRedirect();
      if (!opts?.inferenceOnly && !opts?.oauthClient) ObH({
        action: "login",
        success: false,
        authMethod: "oauth",
        error: w
      });
      throw w;
    } finally {
      this.authCodeListener?.close();
    }
  }
  async waitForAuthorizationCode(state, startCallback) {
    return new Promise((resolve, reject) => {
      this.manualAuthCodeResolver = resolve, this.authCodeListener?.waitForAuthorization(state, startCallback).then(O => {
        this.manualAuthCodeResolver = null, resolve(O);
      }).catch(O => {
        this.manualAuthCodeResolver = null, reject(O);
      });
    });
  }
  handleManualAuthCodeInput(input) {
    if (this.manualAuthCodeResolver) this.manualAuthCodeResolver(input.authorizationCode), this.manualAuthCodeResolver = null, this.authCodeListener?.close();
  }
  formatTokens(tokenResponse, subscriptionType, rateLimitTier, rawProfile, clientId) {
    return {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiresAt: Date.now() + tokenResponse.expires_in * 1000,
      scopes: DX_(tokenResponse.scope),
      subscriptionType: subscriptionType,
      rateLimitTier: rateLimitTier,
      profile: rawProfile,
      clientId: clientId,
      tokenAccount: tokenResponse.account ? {
        uuid: tokenResponse.account.uuid,
        emailAddress: tokenResponse.account.email_address,
        organizationUuid: tokenResponse.organization?.uuid
      } : undefined
    };
  }
  cleanup() {
    this.authCodeListener?.close(), this.manualAuthCodeResolver = null;
  }
}
var cuH = L(() => {
  v_();
  JA();
  _j();
  f6();
  xMK();
  RG();
  BMK();
});
export {OAuthFlowManager as XW,cuH as J4e};
