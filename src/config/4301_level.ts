// @ts-nocheck
import {ql as K1,e8 as Hg} from "../../vendor/m1485.ts";
import {logForDebugging as y,qe as UH} from "./0236_setHasFormattedOutput.ts";
import {Ce as ZH,Ct as R_} from "../../vendor/m197.ts";
import {u7 as Xn,G5 as dF} from "../../vendor/m1296.ts";
import {zg as yw} from "../../vendor/m1479.ts";
import {sleep as n6} from "../telemetry/1488_withTimeout.ts";
import {isOAuthTokenExpired as as,refreshOAuthToken as os,revokeOAuthToken as eV,isInvalidGrantError as TMH,aI as RG} from "./1293_storeOAuthAccountInfo.ts";
import {DESIGN_OAUTH_SCOPES as C3H,getOauthConfig as C9,Sc as R1} from "../api/0465_getOauthConfig.ts";
import {Ne as dH} from "../../vendor/m583.ts";
import {getIsRemoteMode as XK,lt as A_} from "../session/0132_sent.ts";
import {XW as Oc,J4e as cuH} from "../telemetry/3768_codeChallenge.ts";
import {b as L} from "../../runtime.ts";
import {Ir as l8} from "../../vendor/m584.ts";
// @ts-nocheck
function zu_() {
  try {
    return K1().read()?.designOauth ?? null;
  } catch (err) {
    return y(`Failed to read design OAuth tokens: ${ZH(err)}`, {
      level: "error"
    }), null;
  }
}
async function nu6(tokenData, options) {
  try {
    let raced = false,
      result = await K1().mutate(current => {
        if (options?.onlyIf && !options.onlyIf(current.designOauth)) return raced = true, current;
        return {
          ...current,
          designOauth: tokenData
        };
      });
    return raced ? {
      ...result,
      raced: true
    } : result;
  } catch (err) {
    return y(`Failed to save design OAuth tokens: ${ZH(err)}`, {
      level: "error"
    }), {
      success: false,
      warning: "Failed to save design OAuth tokens"
    };
  }
}
async function buildExcludedDynamicSectionsContext(predicate) {
  try {
    await K1().mutate(current => {
      if (!current.designOauth) return current;
      if (!predicate(current.designOauth)) return current;
      let updated = {
        ...current
      };
      return delete updated.designOauth, updated;
    });
  } catch (err) {
    y(`Failed to clear design OAuth tokens: ${ZH(err)}`, {
      level: "error"
    });
  }
}
async function xLO(callback) {
  let locksDir = Xn();
  await PQK.mkdir(locksDir, {
    recursive: true
  });
  let lockFilePath = WQK.join(locksDir, DESIGN_OAUTH_LOCK_FILENAME),
    releaseLock,
    retryCount = 0;
  while (!releaseLock) {
    retryCount++;
    try {
      releaseLock = await yw(lockFilePath, {
        lockfilePath: lockFilePath,
        realpath: false,
        stale: 1e4,
        onCompromised: err => y(`Design OAuth refresh lock compromised: ${err.message}`, {
          level: "error"
        })
      });
    } catch (err) {
      if (err.code === "ELOCKED") {
        if (retryCount < DESIGN_OAUTH_LOCK_MAX_RETRIES) {
          await n6(1000 + Math.random() * 1000);
          continue;
        }
        throw Error("Design OAuth lock contention: another process is holding the refresh lock");
      }
      throw err;
    }
  }
  try {
    return await callback();
  } finally {
    try {
      await releaseLock();
    } catch (err) {
      y(`Design OAuth refresh lock release failed: ${ZH(err)}`, {
        level: "error"
      });
    }
  }
}
async function XQK() {
  let store = K1();
  return store.invalidateCache?.(), (await store.readAsync())?.designOauth ?? null;
}
async function o5q() {
  let cached = zu_();
  if (!cached?.accessToken) return {
    ok: false,
    reason: "needs_design_login"
  };
  if (!as(cached.expiresAt)) return {
    ok: true,
    accessToken: cached.accessToken
  };
  try {
    return await xLO(async () => {
      let fresh = await XQK();
      if (!fresh?.accessToken) return {
        ok: false,
        reason: "needs_design_login"
      };
      if (!as(fresh.expiresAt)) return {
        ok: true,
        accessToken: fresh.accessToken
      };
      if (!fresh.refreshToken) {
        let tokenRef = fresh.refreshToken;
        return await buildExcludedDynamicSectionsContext(t => t.refreshToken === tokenRef), {
          ok: false,
          reason: "needs_design_login"
        };
      }
      if (!Array.isArray(fresh.scopes) || fresh.scopes.length === 0) {
        let tokenRef = fresh.refreshToken;
        return await buildExcludedDynamicSectionsContext(t => t.refreshToken === tokenRef), {
          ok: false,
          reason: "needs_design_login"
        };
      }
      try {
        let refreshed = await os(fresh.refreshToken, {
          clientId: fresh.clientId,
          scopes: fresh.scopes,
          skipProfileFetch: true
        });
        if (!refreshed.refreshToken || !refreshed.expiresAt) {
          if (refreshed.refreshToken && refreshed.refreshToken !== fresh.refreshToken) await eV(refreshed.refreshToken, fresh.clientId);
          return {
            ok: false,
            reason: "design_refresh_failed",
            detail: "refresh response missing refresh_token or expiry"
          };
        }
        if (!C3H.every(s => refreshed.scopes.includes(s))) {
          if (refreshed.refreshToken) await eV(refreshed.refreshToken, fresh.clientId);
          let tokenRef = fresh.refreshToken;
          return await buildExcludedDynamicSectionsContext(t => t.refreshToken === tokenRef), {
            ok: false,
            reason: "needs_design_login",
            detail: "refresh response missing design scopes"
          };
        }
        let oldRefreshToken = fresh.refreshToken,
          saveResult = await nu6({
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken,
            expiresAt: refreshed.expiresAt,
            scopes: refreshed.scopes.filter(s => C3H.some(d => d === s)),
            clientId: fresh.clientId
          }, {
            onlyIf: t => t?.refreshToken === oldRefreshToken
          });
        if (saveResult.raced) {
          await eV(refreshed.refreshToken, fresh.clientId);
          let latest = await XQK();
          return latest?.accessToken && !as(latest.expiresAt) ? {
            ok: true,
            accessToken: latest.accessToken
          } : {
            ok: false,
            reason: "needs_design_login"
          };
        }
        if (!saveResult.success) y("Design OAuth refresh succeeded but persist failed; continuing with in-memory token.", {
          level: "error"
        });
        return {
          ok: true,
          accessToken: refreshed.accessToken
        };
      } catch (err) {
        if (TMH(err)) {
          let tokenRef = fresh.refreshToken;
          return await buildExcludedDynamicSectionsContext(t => t.refreshToken === tokenRef), {
            ok: false,
            reason: "needs_design_login",
            detail: "design authorization expired"
          };
        }
        return {
          ok: false,
          reason: "design_refresh_failed",
          detail: ZH(err)
        };
      }
    });
  } catch (err) {
    return {
      ok: false,
      reason: "design_refresh_failed",
      detail: ZH(err)
    };
  }
}
function iu6() {
  return dH.CLAUDE_CODE_DESIGN_OAUTH_CLIENT_ID ?? C9().DESIGN_CLIENT_ID;
}
function $u_() {
  return !iu6().startsWith("00000000-");
}
async function a5q(tokenResponse, clientId) {
  let missingScopes = C3H.filter(s => !tokenResponse.scopes.includes(s));
  if (missingScopes.length > 0) {
    if (tokenResponse.refreshToken) await eV(tokenResponse.refreshToken, clientId);
    return {
      ok: false,
      message: `The authorization server did not grant the design scopes (missing: ${missingScopes.join(", ")}) \u2014 the Claude Design app registration may be incomplete or out of date.`
    };
  }
  if (!tokenResponse.refreshToken || !tokenResponse.expiresAt) {
    if (tokenResponse.refreshToken) await eV(tokenResponse.refreshToken, clientId);
    return {
      ok: false,
      message: "The token response was missing a refresh token or expiry \u2014 cannot store a usable design credential."
    };
  }
  return {
    ok: true,
    slot: {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
      expiresAt: tokenResponse.expiresAt,
      scopes: tokenResponse.scopes.filter(s => C3H.some(d => d === s)),
      clientId: clientId
    }
  };
}
function s5q() {
  return dH.isSSH() || dH.CLAUDE_CODE_REMOTE === true || XK();
}
async function ZQK(signal) {
  if (signal?.aborted) return {
    ok: false,
    message: "Design login was interrupted."
  };
  if (!$u_()) return {
    ok: false,
    message: "The Claude Design OAuth client is not configured in this build. Set CLAUDE_CODE_DESIGN_OAUTH_CLIENT_ID to the registered client id, or update to a build with the registered client."
  };
  if (s5q()) return {
    ok: false,
    message: "This session is remote, so the browser can't reach the local sign-in listener. Run /design-login instead \u2014 it supports pasting the authorization code manually."
  };
  let clientId = iu6(),
    oauthFlow = new Oc(),
    timedOut = false,
    wasAborted = false,
    loginTimer;
  try {
    let flowPromise = oauthFlow.startOAuthFlow(async () => {}, {
      loginWithClaudeAi: true,
      oauthClient: {
        clientId: clientId,
        scopes: C3H
      },
      skipProfileFetch: true,
      successRedirectUrl: C9().CLAUDEAI_SUCCESS_URL
    });
    flowPromise.then(result => {
      if (wasAborted && result.refreshToken) eV(result.refreshToken, clientId);
    }).catch(() => {});
    let tokenResponse = await Promise.race([flowPromise, new Promise((_, reject) => {
        loginTimer = setTimeout(() => {
          timedOut = true, wasAborted = true, reject(Error("design login timed out"));
        }, DESIGN_LOGIN_TIMEOUT_MS), signal?.addEventListener("abort", () => {
          wasAborted = true, reject(Error("design login interrupted"));
        }, {
          once: true
        });
      })]),
      validationResult = await a5q(tokenResponse, clientId);
    if (!validationResult.ok) return {
      ok: false,
      message: validationResult.message
    };
    if (!(await nu6(validationResult.slot)).success) return await eV(validationResult.slot.refreshToken, validationResult.slot.clientId), {
      ok: false,
      message: "Could not save the design credential to secure storage. Retry, or run /design-login."
    };
    return {
      ok: true,
      accessToken: validationResult.slot.accessToken
    };
  } catch (err) {
    if (wasAborted = true, signal?.aborted) return {
      ok: false,
      message: "Design login was interrupted."
    };
    if (timedOut) return {
      ok: false,
      message: "The browser authorization timed out after 5 minutes. Retry, or run /design-login for the manual flow."
    };
    return {
      ok: false,
      message: `The browser authorization failed (${ZH(err)}). Run /design-login to retry with the manual flow.`
    };
  } finally {
    if (loginTimer !== undefined) clearTimeout(loginTimer);
    oauthFlow.cleanup();
  }
}
var PQK,
  WQK,
  DESIGN_OAUTH_LOCK_FILENAME = ".design_oauth_refresh.lock",
  DESIGN_OAUTH_LOCK_MAX_RETRIES = 5,
  DESIGN_LOGIN_TIMEOUT_MS = 300000;
var ru6 = L(() => {
  A_();
  R1();
  RG();
  cuH();
  UH();
  l8();
  R_();
  Hg();
  dF();
  PQK = require("fs/promises"), WQK = require("path");
});
export {zu_ as Wqt,nu6 as h5n,buildExcludedDynamicSectionsContext as f5n,xLO as X$p,XQK as zXa,o5q as g5n,iu6 as _5n,$u_ as Gqt,a5q as G_o,s5q as V_o,ZQK as JXa,PQK as jXa,WQK as YXa,DESIGN_OAUTH_LOCK_FILENAME as Y$p,DESIGN_OAUTH_LOCK_MAX_RETRIES as J$p,DESIGN_LOGIN_TIMEOUT_MS as Q$p,ru6 as y5n};
