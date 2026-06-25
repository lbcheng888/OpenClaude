// @ts-nocheck
import {lo as Mq,initD2 as nI} from "../config/2036_withOAuthRefreshLock.ts";
import {or as Y8,dn as A6} from "../config/0137_namespace.ts";
import {Js as n7,rT as vW} from "../../vendor/m1294.ts";
import {In as b6,Ct as L_} from "../../vendor/m197.ts";
import {Ii as l7,mis as ciq} from "../../vendor/m690.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {b as L} from "../../runtime.ts";
/**
 * Semantic restoration for git-shell/5063_type.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
/** Restored helper; preserves the original bundled control flow. */
function isAuthManagerMessage(H): any {
  return typeof H === "object" && H !== null && "type" in H && (H.type === "token_update" || H.type === "auth_401_result");
}
/** Restored helper; preserves the original bundled control flow. */
function isAuth401Request(H): any {
  return typeof H === "object" && H !== null && "type" in H && H.type === "auth_401";
}
/** Manages daemon-side OAuth token refresh and worker token fanout. */
function createDaemonAuthManager(H, _, q = () => !0): any {
  let K,
    O = !1,
    T = null,
    z = new Set(),
    $ = null,
    Y = null;
  function A(): any {
    return Y ??= Promise.resolve().then(() => (Mq(), nI));
  }
  function w(v): any {
    let C = {
      type: "token_update",
      accessToken: v
    };
    for (let S of z) try {
      S.send(C);
    } catch {}
  }
  async function f(): any {
    let C = await (await A()).getClaudeAIOAuthTokensAsync();
    if (C?.accessToken && C.accessToken !== K?.accessToken) K = {
      accessToken: C.accessToken,
      scopes: C.scopes,
      subscriptionType: C.subscriptionType ?? null,
      rateLimitTier: C.rateLimitTier ?? null
    }, w(K.accessToken);
    D(C?.expiresAt ?? null);
  }
  let j;
  function J(v): any {
    if (j = v, $ || H.aborted) return;
    if (T) clearTimeout(T), T = null;
    _("auth: no token found, will re-check keychain every 30s"), $ = setInterval(function () {
      A().then(async S => {
        S.clearOAuthTokenCache();
        let I = await S.getClaudeAIOAuthTokensAsync(),
          p;
        if (I?.accessToken && I.accessToken !== j && I.expiresAt && I.expiresAt > Date.now()) p = "auth: token found via keychain re-check";else if (I?.refreshToken && (await S.checkAndRefreshOAuthTokenIfNeeded())) p = "auth: token refreshed via keychain re-check retry";
        if (p) {
          if (await f(), K && $) clearInterval($), $ = null, _(p);
        }
      }).catch(S => _(`auth: keychain re-check error: ${S}`));
    }, KEYCHAIN_RECHECK_INTERVAL_MS), $.unref();
  }
  function D(v): any {
    if (T) clearTimeout(T), T = null;
    if (!v || H.aborted) return;
    let C = Math.min(Math.max(v - Date.now() - PROACTIVE_REFRESH_LEAD_MS, 5000), MAX_REFRESH_DELAY_MS);
    _(`auth: scheduling proactive refresh in ${Math.round(C / 1000)}s`), T = setTimeout(M, C), T.unref();
  }
  async function M(): any {
    if (H.aborted) return;
    try {
      _("auth: proactive refresh starting");
      let v = await A(),
        C = K?.accessToken,
        S = await v.checkAndRefreshOAuthTokenIfNeeded();
      v.clearOAuthTokenCache();
      let I = await v.getClaudeAIOAuthTokensAsync(),
        p = I?.expiresAt ?? null,
        b = p === null || p > Date.now() + TOKEN_VALID_GRACE_MS;
      if (I?.accessToken && (S || I.accessToken !== C || b) && (p === null || p > Date.now() + PROACTIVE_REFRESH_LEAD_MS)) {
        await f(), _(S ? "auth: proactive refresh succeeded" : "auth: token still valid (cross-process refresh or not yet due)");
        return;
      }
      if (I?.accessToken && p !== null && p > Date.now()) {
        _("auth: proactive refresh failed, retrying in ~60s (token still valid)"), D(Date.now() + 60000 + PROACTIVE_REFRESH_LEAD_MS);
        return;
      }
      _("auth: proactive refresh failed, signalling re-auth required");
      let x = I?.accessToken ?? C;
      K = void 0, await Z(), J(x);
    } catch (v) {
      _(`auth: proactive refresh error: ${v}`), D(Date.now() + 60000 + PROACTIVE_REFRESH_LEAD_MS);
    }
  }
  async function X(v): any {
    if (O) return _("auth: 401 ignored (3P provider active, no OAuth)"), !1;
    _("auth: handling 401");
    let C = await A();
    if (await C.handleOAuth401Error(v)) return C.clearOAuthTokenCache(), await f(), _("auth: 401 recovery succeeded"), !0;
    _("auth: 401 recovery failed, signalling re-auth required"), K = void 0, await Z(), C.clearOAuthTokenCache();
    let I = await C.getClaudeAIOAuthTokensAsync();
    if (I?.accessToken !== void 0 && I.accessToken !== v) return await f(), !0;
    return J(v), !1;
  }
  let P = null;
  function Z(): any {
    if (P) return P;
    return P = W().finally(() => {
      P = null;
    }), P;
  }
  async function W(): any {
    let v = await A();
    if (v.getAnthropicApiKey()) {
      _("auth: browser login skipped (API key auth available)");
      return;
    }
    if (v.isUsing3PServices() && !q()) {
      _("auth: browser login skipped (3P provider, no OAuth-consuming worker)");
      return;
    }
    let C = Y8(),
      S = pathModule.join(C, "daemon-auth-cooldown"),
      I = pathModule.join(C, "daemon-auth-status.json");
    try {
      let p = await n7().read(S),
        b = parseInt(p, 10);
      if (!Number.isNaN(b) && Date.now() - b < AUTH_NOTIFICATION_COOLDOWN_MS) {
        _("auth: browser login skipped (cooldown)");
        return;
      }
    } catch (p) {
      if (!b6(p)) _(`auth: cooldown read error: ${p}`);
    }
    try {
      await n7().mkdir(C), await n7().write(S, String(Date.now()));
    } catch (p) {
      _(`auth: cooldown write error: ${p}`);
    }
    try {
      let {
        execFileNoThrow: p
      } = await Promise.resolve().then(() => (l7(), ciq));
      p("osascript", ["-e", 'display notification "Your Claude assistant needs re-authentication" with title "Claude"']);
    } catch {}
    try {
      await n7().write(I, bH({
        status: "auth_required",
        since: Date.now()
      }));
    } catch (p) {
      _(`auth: status write error: ${p}`);
    }
    _("auth: headless daemon cannot complete OAuth \u2014 run `claude auth login` to refresh");
  }
  function G(v): any {
    if (!isAuth401Request(v)) return;
    X(v.failedToken).then(C => {
      for (let S of z) try {
        let I = {
          type: "auth_401_result",
          refreshed: C,
          requestId: v.requestId
        };
        S.send(I);
      } catch {}
    }).catch(C => {
      _(`auth: 401 handler error: ${C}`);
      for (let S of z) try {
        let I = {
          type: "auth_401_result",
          refreshed: !1,
          requestId: v.requestId
        };
        S.send(I);
      } catch {}
    });
  }
  function R(v): any {
    if (z.add(v), v.on("message", G), K) try {
      let C = {
        type: "token_update",
        accessToken: K.accessToken
      };
      v.send(C);
    } catch {}
  }
  function h(v): any {
    v.removeListener("message", G), z.delete(v);
  }
  let y = (async () => {
    if (H.aborted) return;
    try {
      let v = await A(),
        C = await v.getClaudeAIOAuthTokensAsync();
      if (!C?.accessToken && v.isUsing3PServices()) {
        O = !0, _("auth: 3P provider active, skipping OAuth refresh loop");
        return;
      }
      if (C?.accessToken) K = {
        accessToken: C.accessToken,
        scopes: C.scopes,
        subscriptionType: C.subscriptionType ?? null,
        rateLimitTier: C.rateLimitTier ?? null
      }, D(C.expiresAt ?? null);
      await v.checkAndRefreshOAuthTokenIfNeeded(), await f();
    } catch (v) {
      _(`auth: init error: ${v}`);
    }
  })();
  return y.then(() => {
    if (H.aborted || K || O) return;
    J();
  }), H.addEventListener("abort", () => {
    if (T) clearTimeout(T), T = null;
    if ($) clearInterval($), $ = null;
  }, {
    once: !0
  }), {
    ready: y,
    getAccessToken() {
      return K?.accessToken;
    },
    getAuthSnapshot() {
      return K;
    },
    attachWorker: R,
    detachWorker: h,
    dispose: E,
    [Symbol.dispose]: E
  };
  function E(): any {
    if (T) clearTimeout(T), T = null;
    if ($) clearInterval($), $ = null;
    for (let v of z) v.removeListener("message", G);
    z.clear();
  }
}
/** Creates worker-side auth helpers for token reads and 401 reports. */
function createWorkerAuthClient(H): any {
  if (typeof process.send === "function") {
    let T = function (z) {
        let $ = O.get(z);
        if ($) O.delete(z), $.resolve(!1);
      },
      K = H;
    process.on("message", z => {
      if (!isAuthManagerMessage(z)) return;
      if (z.type === "token_update") K = z.accessToken;
    });
    let O = new Map();
    return process.on("message", z => {
      if (typeof z === "object" && z !== null && "type" in z && z.type === "auth_401_result") {
        let $ = z,
          Y = O.get($.requestId);
        if (Y) clearTimeout(Y.timer), O.delete($.requestId), Y.resolve($.refreshed);
      }
    }), process.channel?.unref(), {
      getAccessToken() {
        return K;
      },
      reportAuth401(z) {
        let $ = cryptoModule.randomUUID(),
          Y = {
            type: "auth_401",
            failedToken: z,
            requestId: $
          };
        return new Promise(A => {
          let w = setTimeout(T, 30000, $);
          w.unref(), O.set($, {
            resolve: A,
            timer: w
          });
          try {
            process.send(Y);
          } catch {
            clearTimeout(w), O.delete($), A(!1);
          }
        });
      }
    };
  }
  let _ = null;
  async function q(): any {
    return _ ??= await Promise.resolve().then(() => (Mq(), nI));
  }
  return q(), {
    getAccessToken() {
      return _?.getClaudeAIOAuthTokens()?.accessToken;
    },
    async reportAuth401(K) {
      return (await q()).handleOAuth401Error(K);
    }
  };
}
var cryptoModule,
  pathModule,
  TOKEN_VALID_GRACE_MS = 300000,
  PROACTIVE_REFRESH_LEAD_MS = 240000,
  AUTH_NOTIFICATION_COOLDOWN_MS = 300000,
  KEYCHAIN_RECHECK_INTERVAL_MS = 30000,
  MAX_REFRESH_DELAY_MS = 86400000;
var kMq = L(() => {
  vW();
  A6();
  L_();
  H6();
  cryptoModule = require("crypto"), pathModule = require("path");
});
export {isAuthManagerMessage as pEm,isAuth401Request as mEm,createDaemonAuthManager as NBl,createWorkerAuthClient as FBl,cryptoModule as MBl,pathModule as uDo,TOKEN_VALID_GRACE_MS as fEm,PROACTIVE_REFRESH_LEAD_MS as uJn,AUTH_NOTIFICATION_COOLDOWN_MS as hEm,KEYCHAIN_RECHECK_INTERVAL_MS as gEm,MAX_REFRESH_DELAY_MS as _Em,kMq as dDo};
