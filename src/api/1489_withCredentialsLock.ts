// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {withCredentialsLock as zO6,Zxr as AZ8} from "../telemetry/1488_withTimeout.ts";
import {resolveCredentialsFromConfig as GNH,defaultCredentials as Qn_,oXt as cn_} from "../../vendor/m149.ts";
import {loadCredentials as aSq,loadConfig as wA_,getCredentialsPath as ZNH,tbt as fA_} from "../core/0146_fromFile.ts";
import {isWIFActive as IK6,getWIFStatusLine as xK6,getWIFPrecedenceSource as sF,getWIFAuthType as iyH,Vdn as bK6,JJe as eiH} from "../../vendor/m1293.ts";
import {WorkloadIdentityError as hT,OAUTH_API_BETA_HEADER as A3H,FEDERATION_BETA_HEADER as xn_,Gbe as SjH,zKe as _cH,TX as Ts} from "../../vendor/m140.ts";
import {TokenCache as WNH,ZJt as Bn_} from "../../vendor/m141.ts";
import {Tl as sK,He as SH,xe as IH,mn as P6} from "../telemetry/0600_feature_name.ts";
import {kk as AZ,Y8s as Ul9} from "./2037_withOAuth401Retry.ts";
import {ey as wf,RNe as wiH} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {logForDebugging as N,qe as gH} from "../config/0236_setHasFormattedOutput.ts";
import {Ce as GH,Jo as A9,Ct as G_} from "../../vendor/m197.ts";
import {kt as E_,qSt as tY_} from "../../vendor/m132.ts";
import {Ie as CH,vn as C6} from "../session/0621_length.ts";
// @ts-nocheck
var wifCredentialsExports = {};
j_(wifCredentialsExports, {
  withCredentialsLock: () => zO6,
  resolveCredentialsFromConfig: () => GNH,
  resetWIFSingletonsForTesting: () => resetWIFSingletonsForTesting,
  loadCredentials: () => aSq,
  loadConfig: () => wA_,
  isWIFActive: () => IK6,
  invalidateWIFToken: () => invalidateWIFToken,
  getWIFTokenCache: () => getWIFTokenCache,
  getWIFStatusLine: () => xK6,
  getWIFPrecedenceSource: () => sF,
  getWIFCredentials: () => getWIFCredentials,
  getWIFAuthType: () => iyH,
  getResolvedWIFBaseUrlSnapshot: () => getResolvedWIFBaseUrlSnapshot,
  getCredentialsPath: () => ZNH,
  defaultCredentials: () => Qn_,
  WorkloadIdentityError: () => hT,
  TokenCache: () => WNH,
  OAUTH_API_BETA_HEADER: () => A3H,
  FEDERATION_BETA_HEADER: () => xn_
});
function getResolvedWIFBaseUrlSnapshot() {
  return resolvedWIFBaseUrl;
}
function getWIFCredentials() {
  if (wifCredentialsPromise === undefined) wifCredentialsPromise = sK("wif_credentials_resolve", async () => {
    let cfg = await resolveWIFConfig();
    if (cfg === null) return resolvedWIFBaseUrl = null, null;
    let credPath = sF() === "env-quad" ? null : await ZNH(cfg),
      effectiveBaseUrl = process.env.ANTHROPIC_BASE_URL || cfg.base_url,
      mergedCfg = {
        ...cfg,
        base_url: effectiveBaseUrl,
        ...(cfg.authentication.credentials_path || credPath === null ? {} : {
          authentication: {
            ...cfg.authentication,
            credentials_path: credPath
          }
        })
      },
      [{
        getUserAgent: getUserAgentFn
      }, {
        getProxyFetchOptions: getProxyFetchOptions
      }] = await Promise.all([Promise.resolve().then(() => (AZ(), Ul9)), Promise.resolve().then(() => (wf(), wiH))]),
      resolvedCreds = GNH(mergedCfg, {
        baseURL: effectiveBaseUrl || "https://api.anthropic.com",
        fetch: (url, init) => fetch(url, {
          ...init,
          ...getProxyFetchOptions({
            forAnthropicAPI: true,
            url: String(url)
          }),
          signal: AbortSignal.timeout(1e4)
        }),
        userAgent: getUserAgentFn(),
        onSafetyWarning: msg => N(msg, {
          level: "warn"
        }),
        onCacheWriteError: err => N(String(err), {
          level: "warn"
        })
      });
    if (cfg.authentication.type === "user_oauth" && credPath) resolvedCreds.provider = zO6(wrapWithRotatedTokenAdoption(wrapWithInvalidGrantCleanup(resolvedCreds.provider, credPath), credPath), credPath);
    return resolvedWIFBaseUrl = resolvedCreds.baseURL ?? null, resolvedCreds;
  }).catch(err => {
    throw N(`WIF credential resolution failed: ${GH(err)}`, {
      level: "error"
    }), err instanceof hT ? err : new hT(GH(err));
  });
  return wifCredentialsPromise;
}
async function invalidateWIFToken(accessToken) {
  let cache = await getWIFTokenCache().catch(() => null);
  if (cache === null) return;
  if (accessToken) {
    if (invalidatedTokenSet.add(accessToken), invalidatedTokenSet.size > MAX_INVALIDATED_TOKENS) for (let tok of invalidatedTokenSet) {
      invalidatedTokenSet.delete(tok);
      break;
    }
  }
  cache.invalidate();
}
function getWIFTokenCache() {
  return wifTokenCachePromise ??= getWIFCredentials().then(creds => {
    if (creds === null) return null;
    return new WNH(async opts => {
      try {
        let token = await creds.provider(opts);
        return SH("wif_token_exchange"), token;
      } catch (err) {
        let wifErr = err instanceof hT ? err : new hT(err instanceof Error ? err.message : String(err), null);
        throw IH("wif_token_exchange", classifyWIFError(wifErr)), wifErr;
      }
    }, msg => N(String(msg), {
      level: "warn"
    }));
  }), wifTokenCachePromise;
}
function wrapWithRotatedTokenAdoption(provider, credPath) {
  return async opts => {
    if (!opts?.forceRefresh) return provider(opts);
    if (invalidatedTokenSet.size > 0) try {
      let fsModule = await import("fs"),
        credJson = JSON.parse(await fsModule.promises.readFile(credPath, "utf-8")),
        diskToken = credJson.access_token,
        diskExpiry = credJson.expires_at;
      if (typeof diskToken === "string" && diskToken && !invalidatedTokenSet.has(diskToken) && (typeof diskExpiry !== "number" || Date.now() / 1000 < diskExpiry - SjH)) {
        let {
          logEvent: logEvent
        } = await Promise.resolve().then(() => (E_(), tY_));
        return logEvent("tengu_wif_user_oauth_refresh_race_resolved", {}), N("wif: adopting sibling-rotated access token from credentials file; skipping refresh grant"), {
          token: diskToken,
          expiresAt: typeof diskExpiry === "number" ? diskExpiry : null
        };
      }
    } catch (err) {
      N(`wif: rotated-token adoption check failed: ${GH(err)}`);
    }
    return provider(opts);
  };
}
function wrapWithInvalidGrantCleanup(provider, credPath) {
  let readCredentials = async () => {
    try {
      let fsModule = await import("fs");
      return JSON.parse(await fsModule.promises.readFile(credPath, "utf-8"));
    } catch {
      return null;
    }
  };
  return async opts => {
    let savedRefreshToken = (await readCredentials())?.refresh_token;
    try {
      return await provider(opts);
    } catch (err) {
      if (err instanceof hT && (err.statusCode === 400 || err.statusCode === 401) && typeof err.body === "string" && err.body.includes('"invalid_grant"') && typeof savedRefreshToken === "string" && savedRefreshToken) try {
        let diskCred = await readCredentials();
        if (diskCred && diskCred.refresh_token === savedRefreshToken) {
          let {
            logEvent: logEvent
          } = await Promise.resolve().then(() => (E_(), tY_));
          await _cH(credPath, {
            ...diskCred,
            refresh_token: undefined
          }), logEvent("tengu_wif_user_oauth_refresh_token_cleared", {});
        }
      } catch (cleanupErr) {
        if (A9(cleanupErr)) N(`wif: refresh-token cleanup write failed: ${cleanupErr}`);else CH(cleanupErr);
      }
      throw err;
    }
  };
}
function classifyWIFError(err) {
  if (typeof err.body === "string" && err.body.includes('"invalid_grant"')) return "invalid_grant";
  if (typeof err.statusCode === "number") {
    if (err.statusCode >= 500) return "http_5xx";
    if (err.statusCode >= 400) return "http_4xx";
  }
  let msg = err.message.toLowerCase();
  if (msg.includes("parse") || msg.includes("json")) return "parse_failed";
  return "network_error";
}
function resetWIFSingletonsForTesting() {
  wifCredentialsPromise = undefined, wifTokenCachePromise = undefined, resolvedWIFBaseUrl = undefined, invalidatedTokenSet.clear(), bK6();
}
async function resolveWIFConfig() {
  if (sF() === "env-quad") {
    let federationRuleId = getEnvTrimmed("ANTHROPIC_FEDERATION_RULE_ID"),
      organizationId = getEnvTrimmed("ANTHROPIC_ORGANIZATION_ID");
    if (federationRuleId && organizationId) {
      let identityTokenFile = getEnvTrimmed("ANTHROPIC_IDENTITY_TOKEN_FILE");
      return {
        organization_id: organizationId,
        workspace_id: getEnvTrimmed("ANTHROPIC_WORKSPACE_ID"),
        base_url: getEnvTrimmed("ANTHROPIC_BASE_URL"),
        authentication: {
          type: "oidc_federation",
          federation_rule_id: federationRuleId,
          service_account_id: getEnvTrimmed("ANTHROPIC_SERVICE_ACCOUNT_ID"),
          identity_token: identityTokenFile ? {
            source: "file",
            path: identityTokenFile
          } : undefined,
          scope: getEnvTrimmed("ANTHROPIC_SCOPE")
        }
      };
    }
  }
  return wA_();
}
var wifCredentialsPromise,
  wifTokenCachePromise,
  resolvedWIFBaseUrl,
  invalidatedTokenSet,
  MAX_INVALIDATED_TOKENS = 20,
  getEnvTrimmed = key => process.env[key]?.trim() || undefined;
var wifCredentialsInitLazy = L(() => {
  fA_();
  cn_();
  Bn_();
  Ts();
  gH();
  G_();
  C6();
  P6();
  eiH();
  AZ8();
  fA_();
  cn_();
  Bn_();
  Ts();
  eiH();
  AZ8();
  invalidatedTokenSet = new Set();
});
export {wifCredentialsExports as j8s,getResolvedWIFBaseUrlSnapshot,getWIFCredentials,invalidateWIFToken,getWIFTokenCache,wrapWithRotatedTokenAdoption as H3u,wrapWithInvalidGrantCleanup as I3u,classifyWIFError as x3u,resetWIFSingletonsForTesting,resolveWIFConfig as P3u,wifCredentialsPromise as sfn,wifTokenCachePromise as eDr,resolvedWIFBaseUrl as ifn,invalidatedTokenSet as fFe,MAX_INVALIDATED_TOKENS as k3u,getEnvTrimmed as mFe,wifCredentialsInitLazy as PXe};
