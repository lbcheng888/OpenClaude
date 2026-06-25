// @ts-nocheck
import {wA,BRe,Dse,EZe,CZe,FBr} from "../../vendor/m2042.ts";
import {qt,TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {Yyn,Jyn,pxt,mxt} from "../../vendor/m2041.ts";
import {getProxyFetchOptions as nT,ey} from "./1026_shouldBypassProxyWithCidr.ts";
import {GBr,KBe,B7,zBr,URe} from "../../vendor/m2043.ts";
import {ln,vn} from "../session/0621_length.ts";
import {Ce,cn,Ct} from "../../vendor/m197.ts";
import {kA,vfe} from "../../vendor/m2048.ts";
import {ql,e8} from "../../vendor/m1485.ts";
import {ho} from "../../vendor/m572.ts";
import {He,Pt,xe,mn} from "../telemetry/0600_feature_name.ts";
import {formatTokenCount as j4,qO} from "../mcp/3159_scope.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {Lse,vZe,zBe,pTn,dTn,$Re,Ose,wZe} from "./2048_pathname.ts";
import {CR,toe} from "../../vendor/m450.ts";
import {mXr,Bge,Rsa} from "../../vendor/m3159.ts";
import {cTn,hxt,ZBr} from "../../vendor/m2046.ts";
import {Pse,JBr} from "../../vendor/m2045.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {MCP_CLIENT_METADATA_URL as Cgr,Sc} from "../api/0465_getOauthConfig.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {u7,d7,G5} from "../../vendor/m1296.ts";
import {Js,rT} from "../../vendor/m1294.ts";
import {zg} from "../../vendor/m1479.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {b} from "../../runtime.ts";
import {ap} from "../../vendor/m573.ts";
// @ts-nocheck
function p$d(e, t) {
  if (e.includes("dynamic client registration") || t instanceof wA && t.errorCode === "invalid_client_metadata") return "dcr_failed";
  if (e.includes("trying to load") && e.includes("metadata") || e.includes("Incompatible auth server")) return "discovery_failed";
  return "sdk_auth_failed";
}
function OQi(e) {
  try {
    let t = new URL(e);
    for (let n of m$d) if (t.searchParams.has(n)) t.searchParams.set(n, "[REDACTED]");
    return t.toString();
  } catch {
    return e;
  }
}
async function LQi(e) {
  if (!e.ok) return e;
  let t = await e.text(),
    n;
  try {
    n = qt(t);
  } catch {
    return new Response(t, e);
  }
  if (Yyn.safeParse(n).success) return new Response(t, e);
  let r = Jyn.safeParse(n);
  if (!r.success) return new Response(t, e);
  let o = f$d.has(r.data.error) ? {
    error: "invalid_grant",
    error_description: r.data.error_description ?? `Server returned non-standard error code: ${r.data.error}`
  } : r.data;
  return new Response(Pe(o), {
    status: 400,
    statusText: "Bad Request",
    headers: e.headers
  });
}
function Jkn() {
  return async (e, t) => {
    let n = AbortSignal.timeout(d$d),
      r = t?.method?.toUpperCase() === "POST",
      o = nT({
        url: String(e)
      });
    if (!t?.signal) {
      let l = await fetch(e, {
        ...t,
        ...o,
        signal: n
      });
      return r ? LQi(l) : l;
    }
    let s = new AbortController(),
      i = () => s.abort();
    t.signal.addEventListener("abort", i), n.addEventListener("abort", i);
    let a = () => {
      t.signal?.removeEventListener("abort", i), n.removeEventListener("abort", i);
    };
    if (t.signal.aborted) s.abort();
    try {
      let l = await fetch(e, {
        ...t,
        ...o,
        signal: s.signal
      });
      return a(), r ? LQi(l) : l;
    } catch (l) {
      throw a(), l;
    }
  };
}
async function Xkn(e, t, n, r, o) {
  let s = r ?? Jkn();
  if (n) {
    if (!n.startsWith("https://")) throw Error(`authServerMetadataUrl must use https:// (got: ${n})`);
    let a = await s(n, {
      headers: {
        Accept: "application/json"
      }
    });
    if (a.ok) {
      let l;
      try {
        l = await a.json();
      } catch {
        throw Error(`Configured auth server metadata at ${n} is not valid JSON`);
      }
      return pxt.parse(l);
    }
    throw Error(`HTTP ${a.status} fetching configured auth server metadata from ${n}`);
  }
  try {
    let {
      authorizationServerMetadata: a
    } = await GBr(t, {
      fetchFn: s,
      ...(o && {
        resourceMetadataUrl: o
      })
    });
    if (a) return a;
  } catch (a) {
    ln(e, `RFC 9728 discovery failed, falling back: ${Ce(a)}`);
  }
  let i = new URL(t);
  if (i.pathname === "/") return;
  try {
    return await KBe(i, {
      fetchFn: s
    });
  } catch (a) {
    ln(e, `Path-aware auth server discovery failed: ${Ce(a)}`);
    return;
  }
}
function L7r(e) {
  try {
    let t = new URL(e);
    return `${t.protocol}//${t.hostname}`;
  } catch {
    return e;
  }
}
function $rt(e) {
  return Kkn.get(e);
}
function qrt(e, t) {
  zkn.set(e, t), t.finally(() => {
    if (zkn.get(e) === t) zkn.delete(e);
  }).catch(() => {});
}
function jrt(e) {
  return zkn.get(e);
}
async function M7r(e, t) {
  let n = kA(e, t),
    r = (await ql().readAsync())?.mcpOAuth?.[n];
  if (!r || r.accessToken || r.refreshToken) return;
  try {
    await ql().mutate(o => {
      let s = o.mcpOAuth?.[n];
      if (!s || s.accessToken || s.refreshToken) return o;
      let i = {
        ...o.mcpOAuth
      };
      return delete i[n], {
        ...o,
        mcpOAuth: i
      };
    });
  } catch (o) {
    ln(e, `clear tokenless stub failed: ${Ce(o)}`);
  }
}
async function MQi({
  serverName: e,
  endpoint: t,
  token: n,
  tokenTypeHint: r,
  clientId: o,
  clientSecret: s,
  accessToken: i,
  authMethod: a = "client_secret_basic"
}) {
  let l = new URLSearchParams();
  l.set("token", n), l.set("token_type_hint", r);
  let c = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  if (o && s) {
    if (a === "client_secret_post") l.set("client_id", o), l.set("client_secret", s);else {
      let u = Buffer.from(`${encodeURIComponent(o)}:${encodeURIComponent(s)}`).toString("base64");
      c.Authorization = `Basic ${u}`;
    }
  } else if (o) l.set("client_id", o);else ln(e, `No client_id available for ${r} revocation - server may reject`);
  try {
    await ho.post(t, l, {
      headers: c
    }), ln(e, `Successfully revoked ${r}`);
  } catch (u) {
    if (ho.isAxiosError(u) && u.response?.status === 401 && i) ln(e, `Got 401, retrying ${r} revocation with Bearer auth`), l.delete("client_id"), l.delete("client_secret"), await ho.post(t, l, {
      headers: {
        ...c,
        Authorization: `Bearer ${i}`
      }
    }), ln(e, `Successfully revoked ${r} with Bearer auth`);else throw u;
  }
}
async function mMt(e, t, {
  preserveStepUpState: n = false
} = {}) {
  let r = ql(),
    o = await r.readAsync();
  if (!o?.mcpOAuth) {
    He("mcp_oauth_revoke");
    return;
  }
  let s = kA(e, t),
    i = o.mcpOAuth[s],
    a;
  if (i?.accessToken || i?.refreshToken) try {
    let l = i.discoveryState?.authorizationServerUrl ?? t.url,
      c = await Xkn(e, l, t.oauth?.authServerMetadataUrl);
    if (!c) ln(e, "No OAuth metadata found"), a = "no_metadata";else {
      let u = "revocation_endpoint" in c ? c.revocation_endpoint : null;
      if (!u) ln(e, "Server does not support token revocation"), a = "no_revocation_endpoint";else {
        let d = String(u),
          p = ("revocation_endpoint_auth_methods_supported" in c ? c.revocation_endpoint_auth_methods_supported : undefined) ?? ("token_endpoint_auth_methods_supported" in c ? c.token_endpoint_auth_methods_supported : undefined),
          m = p && !p.includes("client_secret_basic") && p.includes("client_secret_post") ? "client_secret_post" : "client_secret_basic";
        if (ln(e, `Revoking tokens via ${d} (${m})`), i.refreshToken) try {
          await MQi({
            serverName: e,
            endpoint: d,
            token: i.refreshToken,
            tokenTypeHint: "refresh_token",
            clientId: i.clientId,
            clientSecret: i.clientSecret,
            accessToken: i.accessToken,
            authMethod: m
          });
        } catch (f) {
          ln(e, `Failed to revoke refresh token: ${Ce(f)}`), a = "server_revoke_failed";
        }
        if (i.accessToken) try {
          await MQi({
            serverName: e,
            endpoint: d,
            token: i.accessToken,
            tokenTypeHint: "access_token",
            clientId: i.clientId,
            clientSecret: i.clientSecret,
            accessToken: i.accessToken,
            authMethod: m
          });
        } catch (f) {
          ln(e, `Failed to revoke access token: ${Ce(f)}`), a = "server_revoke_failed";
        }
      }
    }
  } catch (l) {
    ln(e, `Failed to revoke tokens: ${Ce(l)}`), a = "server_revoke_failed";
  } else ln(e, "No tokens to revoke");
  try {
    if (n && i && (i.stepUpScope || i.discoveryState || i.clientId)) await r.mutate(l => {
      let c = l.mcpOAuth?.[s];
      if (c?.accessToken !== i.accessToken || c?.clientId !== i.clientId) return l;
      return {
        ...l,
        mcpOAuth: {
          ...l.mcpOAuth,
          [s]: {
            serverName: e,
            serverUrl: t.url,
            accessToken: "",
            refreshToken: undefined,
            expiresAt: undefined,
            ...(i.clientId && {
              clientId: i.clientId,
              ...(i.redirectUri && {
                redirectUri: i.redirectUri
              }),
              ...(i.clientSecret !== undefined && {
                clientSecret: i.clientSecret
              })
            }),
            ...(i.stepUpScope && {
              stepUpScope: i.stepUpScope
            }),
            ...(i.discoveryState && {
              discoveryState: {
                authorizationServerUrl: i.discoveryState.authorizationServerUrl,
                resourceMetadataUrl: i.discoveryState.resourceMetadataUrl,
                oauthMetadataFound: i.discoveryState.oauthMetadataFound
              }
            })
          }
        }
      };
    }), ln(e, "Preserved step-up auth state across revocation");else await Zkn(e, t);
  } catch (l) {
    ln(e, `clear local tokens failed: ${Ce(l)}`), a ??= "local_clear_failed";
  }
  if (a) Pt("mcp_oauth_revoke", a);else He("mcp_oauth_revoke");
}
async function Zkn(e, t, n) {
  let r = kA(e, t),
    o;
  if (await ql().mutate(s => {
    let i = s.mcpOAuth?.[r];
    if (!i) return s;
    let a = {
      ...s.mcpOAuth
    };
    if (n?.preserveClientRegistration && i.clientId) {
      if (!i.accessToken && !i.refreshToken) return s;
      a[r] = {
        ...i,
        accessToken: "",
        refreshToken: undefined,
        expiresAt: 0,
        scope: undefined
      }, o = "tokens";
    } else delete a[r], o = "all";
    return {
      ...s,
      mcpOAuth: a
    };
  }), o) ln(e, o === "tokens" ? "Cleared stored tokens (preserved client registration)" : "Cleared stored tokens");
}
function UQi(e, t, n, r) {
  if (n?.success) return;
  let o = r ? "mutate_rejected" : "storage_write_failed",
    s = r ? Ce(r) : n?.warning ?? "storage write failed";
  ln(e, `Token persist failed: ${s}`);
  let i = j4(t);
  W("tengu_mcp_oauth_token_persist_failed", {
    transportType: Le(t.type),
    ...(i && {
      mcpServerBaseUrl: i
    }),
    reason: Le(o)
  });
}
async function A$d(e, t, n, r, o) {
  if (!t.oauth?.xaa) throw Error("XAA: oauth.xaa must be set");
  let s = Lse();
  if (!s) throw Error("XAA: no IdP connection configured. Run 'claude mcp xaa setup --issuer <url> --client-id <id> --client-secret' to configure.");
  let i = t.oauth?.clientId;
  if (!i) throw Error(`XAA: server '${e}' needs an AS client_id. Re-add with --client-id.`);
  let l = (await tHn(e, t))?.clientSecret;
  if (!l) {
    let p = kA(e, t),
      m = Object.keys((await ql().readAsync())?.mcpOAuthClientConfig ?? {}),
      f = CR(t.headers ?? {}, (A, h_2) => h_2.toLowerCase() === "authorization" ? "[REDACTED]" : A);
    throw ln(e, `XAA: secret lookup miss. wanted=${p} have=[${m.join(", ")}] configHeaders=${Pe(f)}`), Error(`XAA: AS client secret not found for '${e}'. Re-add with --client-secret.`);
  }
  ln(e, "XAA: starting cross-app access flow");
  let c = await vZe(s.issuer),
    u = (await zBe(s.issuer)) !== undefined,
    d = "idp_login";
  try {
    let p;
    try {
      p = await pTn({
        idpIssuer: s.issuer,
        idpClientId: s.clientId,
        idpClientSecret: c,
        callbackPort: s.callbackPort,
        onAuthorizationUrl: n,
        skipBrowserOpen: o,
        abortSignal: r
      });
    } catch (_) {
      if (r?.aborted) throw new Kz();
      throw _;
    }
    d = "discovery";
    let m = await dTn(s.issuer);
    d = "token_exchange";
    let f;
    try {
      f = await mXr(t.url, {
        clientId: i,
        clientSecret: l,
        idpClientId: s.clientId,
        idpClientSecret: c,
        idpIdToken: p,
        idpTokenEndpoint: m.token_endpoint
      }, e, r);
    } catch (_) {
      if (r?.aborted) throw new Kz();
      let y = Ce(_);
      if (_ instanceof Bge) {
        if (_.shouldClearIdToken) await $Re(s.issuer), ln(e, "XAA: cleared cached id_token after token-exchange failure");
      } else if (y.includes("PRM discovery failed") || y.includes("AS metadata discovery failed") || y.includes("no authorization server supports jwt-bearer")) d = "discovery";else if (y.includes("jwt-bearer")) d = "jwt_bearer";
      throw _;
    }
    let A = kA(e, t),
      h_2,
      g_2;
    try {
      h_2 = await ql().mutate(_ => {
        let y = _.mcpOAuth?.[A];
        return {
          ..._,
          mcpOAuth: {
            ..._.mcpOAuth,
            [A]: {
              ...y,
              serverName: e,
              serverUrl: t.url,
              accessToken: f.access_token,
              refreshToken: f.refresh_token ?? y?.refreshToken,
              expiresAt: f.expires_in != null ? Date.now() + f.expires_in * 1000 : undefined,
              scope: f.scope,
              clientId: i,
              clientSecret: l,
              discoveryState: {
                authorizationServerUrl: f.authorizationServerUrl
              }
            }
          }
        };
      });
    } catch (_) {
      g_2 = _;
    }
    if (h_2?.success) ln(e, "XAA: tokens saved");else UQi(e, t, h_2, g_2);
    W("tengu_mcp_oauth_flow_success", {
      authMethod: Ve("xaa"),
      idTokenCacheHit: u
    }), He("mcp_oauth_flow");
  } catch (p) {
    if (p instanceof Kz) throw p;
    throw xe("mcp_oauth_flow", "mcp_oauth_xaa_failed"), W("tengu_mcp_oauth_flow_failure", {
      authMethod: Ve("xaa"),
      xaaFailureStage: Le(d),
      idTokenCacheHit: u
    }), p;
  }
}
async function Nae(e, t, n, r, o) {
  if (t.oauth?.xaa) {
    if (!Ose()) throw Error(`XAA is not enabled (set CLAUDE_CODE_ENABLE_XAA=1). Remove 'oauth.xaa' from server '${e}' to use the standard consent flow.`);
    W("tengu_mcp_oauth_flow_start", {
      isOAuthFlow: true,
      authMethod: Ve("xaa"),
      transportType: Le(t.type),
      ...(j4(t) && {
        mcpServerBaseUrl: j4(t)
      })
    }), await A$d(e, t, n, r, o?.skipBrowserOpen);
    return;
  }
  let s = ql(),
    i = kA(e, t),
    a = (await s.readAsync())?.mcpOAuth?.[i],
    l = a?.stepUpScope,
    c = a?.discoveryState?.resourceMetadataUrl,
    u = a?.clientId && a.redirectUri && L7r(a.redirectUri) === "http://localhost" ? Number(new URL(a.redirectUri).port) || undefined : undefined,
    d;
  if (c) try {
    d = new URL(c);
  } catch {
    ln(e, `Invalid cached resourceMetadataUrl: ${c}`);
  }
  let p = {
      scope: l,
      resourceMetadataUrl: d
    },
    m = Qkn.randomUUID();
  W("tengu_mcp_oauth_flow_start", {
    flowAttemptId: m,
    isOAuthFlow: true,
    transportType: Le(t.type),
    ...(j4(t) && {
      mcpServerBaseUrl: j4(t)
    })
  });
  let f = false;
  try {
    let A = t.oauth?.callbackPort,
      h_2 = !!o?.redirectUri,
      g_2 = h_2 ? 0 : A ?? (await cTn(u)),
      __2 = o?.redirectUri ?? hxt(g_2);
    ln(e, h_2 ? `Using custom redirectUri: ${__2} (no localhost listener)` : `Using redirect port: ${g_2}${A ? " (from config)" : u && g_2 === u ? " (reusing registered port)" : ""}`);
    let y = !a?.clientId || g_2 === u || a.redirectUri === __2;
    try {
      await Zkn(e, t, {
        preserveClientRegistration: y
      });
    } catch (N) {
      ln(e, `clear stored credentials failed: ${Ce(N)}`);
    }
    let T_2 = new AbortController();
    if (!h_2) Vkn.get(g_2)?.abort(), Vkn.set(g_2, T_2);
    let S_2 = new M$e(e, t, __2, true, n, o?.skipBrowserOpen),
      v = Boolean(t.oauth?.scopes || t.oauth?.authServerMetadataUrl);
    if (p.scope && !v) S_2.markStepUpPending(p.scope);
    try {
      let N = await Xkn(e, t.url, t.oauth?.authServerMetadataUrl, undefined, p.resourceMetadataUrl);
      if (N) S_2.setMetadata(N), ln(e, `Fetched OAuth metadata with scope: ${Ykn(N) || "NONE"}`);
    } catch (N) {
      ln(e, `Failed to fetch OAuth metadata: ${Ce(N)}`);
    }
    let R_2 = await S_2.state(),
      k_2 = null,
      x = null,
      H_2 = null,
      I_2 = null,
      P_2 = () => {
        if (k_2) k_2.removeAllListeners(), k_2.on("error", () => {}), k_2.close(), k_2 = null;
        if (x) clearTimeout(x), x = null;
        if (H_2) r?.removeEventListener("abort", H_2), T_2.signal.removeEventListener("abort", H_2), H_2 = null;
        if (Vkn.get(g_2) === T_2) Vkn.delete(g_2);
        if (Kkn.get(e) === I_2) Kkn.delete(e);
        ln(e, "MCP OAuth server cleaned up");
      },
      L = await new Promise((N_2, O) => {
        let $ = false,
          U = V => {
            if ($) return;
            $ = true, N_2(V);
          },
          W_2 = V => {
            if ($) return;
            $ = true, O(V);
          };
        if (H_2 = () => {
          P_2(), W_2(new Kz());
        }, r?.aborted || T_2.signal.aborted) {
          H_2();
          return;
        }
        r?.addEventListener("abort", H_2), T_2.signal.addEventListener("abort", H_2);
        {
          let V = Q => {
            try {
              let K = new URL(Q),
                Y = K.searchParams.get("code"),
                J = K.searchParams.get("state"),
                ee = K.searchParams.get("error");
              if (!Y && !ee) return false;
              if (J !== R_2) return P_2(), W_2(Error("OAuth state mismatch - possible CSRF attack")), true;
              if (ee) {
                let te = K.searchParams.get("error_description") || "";
                return P_2(), W_2(Error(`OAuth error: ${ee} - ${te}`)), true;
              }
              if (!Y) return false;
              return ln(e, "Received auth code via manual callback URL"), P_2(), U(Y), true;
            } catch {
              return false;
            }
          };
          I_2 = V, Kkn.set(e, V), o?.onWaitingForCallback?.(V, g_2, R_2);
        }
        let G = async () => {
          try {
            ln(e, "Starting SDK auth"), ln(e, `Server URL: ${t.url}`);
            let V = await B7(S_2, {
              serverUrl: t.url,
              scope: p.scope,
              resourceMetadataUrl: p.resourceMetadataUrl,
              fetchFn: Jkn()
            });
            if (ln(e, `Initial auth result: ${V}`), V !== "REDIRECT") ln(e, `Unexpected auth result, expected REDIRECT: ${V}`);
          } catch (V) {
            ln(e, `SDK auth error: ${V}`), P_2(), W_2(Error(`SDK auth failed: ${Ce(V)}`, {
              cause: V
            }));
          }
        };
        if (h_2) G();else k_2 = NQi.createServer((V, Q) => {
          let K = FQi.parse(V.url || "", true);
          if (K.pathname === "/callback") {
            let Y = K.query.code,
              J = K.query.state,
              ee = K.query.error,
              te = K.query.error_description,
              ne = K.query.error_uri;
            if (J !== R_2) {
              Q.writeHead(400, {
                "Content-Type": "text/html"
              }), Q.end(Pse({
                ok: false,
                heading: "Authentication failed",
                message: "Invalid state parameter. Close this tab and try again from Claude Code."
              }));
              return;
            }
            if (ee) {
              Q.writeHead(200, {
                "Content-Type": "text/html"
              }), Q.end(Pse({
                ok: false,
                heading: "Authentication failed",
                message: "Close this tab and try again from Claude Code.",
                detail: `${String(ee)}: ${te ?? ""}`
              })), P_2();
              let re = `OAuth error: ${ee}`;
              if (te) re += ` - ${te}`;
              if (ne) re += ` (See: ${ne})`;
              W_2(Error(re));
              return;
            }
            if (Y) Q.writeHead(200, {
              "Content-Type": "text/html"
            }), Q.end(Pse({
              ok: true,
              heading: "Authentication successful",
              message: "You can close this tab and return to Claude Code."
            })), P_2(), U(Y);
          } else Q.writeHead(404, {
            "Content-Type": "text/html"
          }), Q.end(Pse({
            ok: false,
            heading: "Not found",
            message: `This is the Claude Code MCP OAuth callback listener. It only handles /callback. If your OAuth provider redirected here, the registered redirect_uri must be ${__2}.`
          }));
        }), k_2.on("error", V => {
          if (P_2(), V.code === "EADDRINUSE") {
            let Q = Yt() === "windows" ? `netstat -ano | findstr :${g_2}` : `lsof -ti:${g_2} -sTCP:LISTEN`;
            W_2(Error(`OAuth callback port ${g_2} is already in use \u2014 another process may be holding it. ` + `Run \`${Q}\` to find it.`));
          } else W_2(Error(`OAuth callback server failed: ${V.message}`));
        }), k_2.listen(g_2, "127.0.0.1", () => void G()), k_2.unref();
        x = setTimeout((V, Q) => {
          V(), Q(Error("Authentication timeout"));
        }, 300000, P_2, W_2), x.unref();
      });
    f = true, ln(e, "Completing auth flow with authorization code");
    let D_2 = await B7(S_2, {
      serverUrl: t.url,
      authorizationCode: L,
      resourceMetadataUrl: p.resourceMetadataUrl,
      fetchFn: Jkn()
    });
    if (ln(e, `Auth result: ${D_2}`), D_2 === "AUTHORIZED") {
      let N = await S_2.tokens();
      if (ln(e, `Tokens after auth: ${N ? "Present" : "Missing"}`), N) ln(e, `Token access_token length: ${N.access_token?.length}`), ln(e, `Token expires_in: ${N.expires_in}`);
      W("tengu_mcp_oauth_flow_success", {
        flowAttemptId: m,
        transportType: Le(t.type),
        ...(j4(t) && {
          mcpServerBaseUrl: j4(t)
        })
      }), He("mcp_oauth_flow");
    } else throw Error("Unexpected auth result: " + D_2);
  } catch (A) {
    ln(e, `Error during auth completion: ${A}`);
    let h_2 = "unknown",
      g_2,
      __2,
      y = Ce(A),
      T_2 = A instanceof Error ? A.cause : undefined;
    if (A instanceof Kz) h_2 = "cancelled";else if (/AADSTS\d/.test(y)) h_2 = "entra_specific";else if (/redirect[_ ]uri/i.test(y)) h_2 = "redirect_uri_mismatch";else if (f) h_2 = "token_exchange_failed";else if (y.includes("Authentication timeout")) h_2 = "timeout";else if (y.includes("OAuth state mismatch")) h_2 = "state_mismatch";else if (y.includes("OAuth error:")) h_2 = "provider_denied";else if (y.includes("already in use") || y.includes("EADDRINUSE") || y.includes("callback server failed") || y.includes("No available port")) h_2 = "port_unavailable";else if (y.includes("SDK auth failed")) h_2 = p$d(y, T_2);
    let S_2 = (T_2 instanceof Error ? T_2 : A instanceof Error ? A : null)?.message.match(/^HTTP (\d{3})\b/);
    if (S_2) __2 = Number(S_2[1]);
    if (T_2 instanceof wA) g_2 = T_2.errorCode;
    if (A instanceof wA) {
      if (g_2 = A.errorCode, A.errorCode === "invalid_client" || A.errorCode === "unauthorized_client") {
        let v = kA(e, t);
        try {
          await ql().mutate(R => {
            let k = R.mcpOAuth?.[v];
            if (!k) return R;
            return {
              ...R,
              mcpOAuth: {
                ...R.mcpOAuth,
                [v]: {
                  ...k,
                  clientId: undefined,
                  clientSecret: undefined
                }
              }
            };
          });
        } catch (R) {
          ln(e, `clear clientId failed: ${Ce(R)}`);
        }
      }
    }
    if (h_2 === "timeout" || y.includes("OAuth error:")) {
      let v = kA(e, t);
      await ql().mutate(R => {
        let k = R.mcpOAuth?.[v];
        if (!k?.clientId || k.accessToken || k.refreshToken || k.clientId !== a?.clientId) return R;
        return {
          ...R,
          mcpOAuth: {
            ...R.mcpOAuth,
            [v]: {
              ...k,
              clientId: undefined,
              clientSecret: undefined
            }
          }
        };
      }).catch(R => ln(e, `drop clientId failed: ${Ce(R)}`));
    }
    if (h_2 !== "cancelled") xe("mcp_oauth_flow", "mcp_oauth_flow_failed");
    throw W("tengu_mcp_oauth_flow_error", {
      flowAttemptId: m,
      reason: Le(h_2),
      error_code: g_2,
      http_status: __2?.toString(),
      transportType: Le(t.type),
      ...(j4(t) && {
        mcpServerBaseUrl: j4(t)
      })
    }), A;
  }
}
function eHn(e, t) {
  return async (n, r) => {
    let o = await e(n, r);
    if (o.status === 401 || o.status === 403) t.sawAuthChallenge = true;
    if (o.status === 403) {
      let s = o.headers.get("WWW-Authenticate");
      if (s?.includes("insufficient_scope")) {
        let i = s.match(/scope=(?:"([^"]+)"|([^\s,]+))/),
          a = i?.[1] ?? i?.[2];
        if (a) t.markStepUpPending(a);
      }
    }
    return o;
  };
}
class M$e {
  serverName;
  serverConfig;
  redirectUri;
  handleRedirection;
  _codeVerifier;
  _authorizationUrl;
  _state;
  _scopes;
  _metadata;
  _refreshInProgress;
  _pendingStepUpScope;
  _lastServedClientId;
  _lastServedAccessToken;
  _lastServedRefreshToken;
  onAuthorizationUrlCallback;
  skipBrowserOpen;
  constructor(e, t, n = hxt(), r = false, o, s) {
    this.serverName = e, this.serverConfig = t, this.redirectUri = n, this.handleRedirection = r, this.onAuthorizationUrlCallback = o, this.skipBrowserOpen = s ?? false;
  }
  get redirectUrl() {
    return this.redirectUri;
  }
  get authorizationUrl() {
    return this._authorizationUrl;
  }
  get clientMetadata() {
    let e = {
        client_name: `Claude Code (${this.serverName})`,
        redirect_uris: [this.redirectUri],
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: "none"
      },
      t = Ykn(this._metadata);
    if (t) e.scope = t, ln(this.serverName, `Using scope from metadata: ${e.scope}`);
    return e;
  }
  get clientMetadataUrl() {
    let e = process.env.MCP_OAUTH_CLIENT_METADATA_URL;
    if (e) return ln(this.serverName, `Using CIMD URL from env: ${e}`), e;
    return Cgr;
  }
  setMetadata(e) {
    this._metadata = e;
  }
  markStepUpPending(e) {
    this._pendingStepUpScope = e, ln(this.serverName, `Marked step-up pending: ${e}`);
  }
  sawAuthChallenge = false;
  async state() {
    if (!this._state) this._state = Qkn.randomBytes(32).toString("base64url"), ln(this.serverName, "Generated new OAuth state");
    return this._state;
  }
  async clientInformation() {
    let t = await ql().readAsync(),
      n = kA(this.serverName, this.serverConfig),
      r = t?.mcpOAuthClientConfig?.[n]?.clientSecret,
      o = this.serverConfig.oauth?.clientId,
      s = t?.mcpOAuth?.[n];
    if (s?.clientId) {
      let i = s.redirectUri;
      if (this.handleRedirection && (i ? L7r(i) !== L7r(this.redirectUri) : !this.redirectUri.startsWith("http://localhost"))) {
        ln(this.serverName, `Cached client_id was registered for ${i ?? "localhost"}; current redirectUri is ${this.redirectUri} \u2014 forcing re-DCR`);
        return;
      }
      return ln(this.serverName, "Found client info"), this._lastServedClientId = s.clientId, {
        client_id: s.clientId,
        client_secret: s.clientSecret ?? (s.clientId === o ? r : undefined)
      };
    }
    if (o) return ln(this.serverName, "Using pre-configured client ID"), this._lastServedClientId = o, {
      client_id: o,
      client_secret: r
    };
    ln(this.serverName, "No client info found");
    return;
  }
  async saveClientInformation(e) {
    let t = kA(this.serverName, this.serverConfig);
    try {
      if ((await ql().mutate(r => ({
        ...r,
        mcpOAuth: {
          ...r.mcpOAuth,
          [t]: {
            ...r.mcpOAuth?.[t],
            serverName: this.serverName,
            serverUrl: this.serverConfig.url,
            clientId: e.client_id,
            clientSecret: e.client_secret,
            redirectUri: this.redirectUri,
            accessToken: r.mcpOAuth?.[t]?.accessToken || "",
            expiresAt: r.mcpOAuth?.[t]?.expiresAt
          }
        }
      })))?.success) this._lastServedClientId = e.client_id;else ln(this.serverName, "saveClientInformation persist resolved unsuccessful");
    } catch (n) {
      ln(this.serverName, `saveClientInformation persist failed: ${Ce(n)}`);
    }
  }
  async tokens() {
    let t = await ql().readAsync(),
      n = kA(this.serverName, this.serverConfig),
      r = t?.mcpOAuth?.[n];
    if (Ose() && this.serverConfig.oauth?.xaa && !r?.refreshToken && (!r?.accessToken || r.expiresAt != null && (r.expiresAt - Date.now()) / 1000 <= 300)) {
      if (!this._refreshInProgress) ln(this.serverName, r ? "XAA: access_token expiring, attempting silent exchange" : "XAA: no access_token yet, attempting silent exchange"), this._refreshInProgress = this.xaaRefresh().finally(() => {
        this._refreshInProgress = undefined;
      });
      try {
        let a = await this._refreshInProgress;
        if (a) return this._lastServedAccessToken = a.access_token, this._lastServedRefreshToken = a.refresh_token ?? this._lastServedRefreshToken, a;
      } catch (a) {
        ln(this.serverName, `XAA silent exchange failed: ${Ce(a)}`);
      }
    }
    if (!r) {
      ln(this.serverName, "No token data found");
      return;
    }
    if (!r.accessToken) {
      ln(this.serverName, "No access token in storage");
      return;
    }
    this._lastServedAccessToken = r.accessToken, this._lastServedRefreshToken = r.refreshToken;
    let o = r.expiresAt != null ? (r.expiresAt - Date.now()) / 1000 : undefined,
      s = this._pendingStepUpScope !== undefined;
    if (s) ln(this.serverName, `Step-up pending (${this._pendingStepUpScope}), omitting refresh_token`);
    if (o != null && o <= 0 && !r.refreshToken) {
      ln(this.serverName, "Token expired without refresh token");
      return;
    }
    if (o != null && o <= 300 && r.refreshToken && !s) {
      if (!this._refreshInProgress) ln(this.serverName, `Token expires in ${Math.floor(o)}s, attempting proactive refresh`), this._refreshInProgress = this.refreshAuthorization(r.refreshToken).finally(() => {
        this._refreshInProgress = undefined;
      });else ln(this.serverName, "Token refresh already in progress, reusing existing promise");
      try {
        let a = await this._refreshInProgress;
        if (a) return ln(this.serverName, "Token refreshed successfully"), this._lastServedAccessToken = a.access_token, this._lastServedRefreshToken = a.refresh_token ?? this._lastServedRefreshToken, a;
        ln(this.serverName, "Token refresh failed, returning current tokens");
      } catch (a) {
        ln(this.serverName, `Token refresh error: ${Ce(a)}`);
      }
    }
    let i = {
      access_token: r.accessToken,
      refresh_token: s ? undefined : r.refreshToken,
      expires_in: o,
      scope: r.scope,
      token_type: "Bearer"
    };
    return ln(this.serverName, "Returning tokens"), ln(this.serverName, `Token length: ${i.access_token?.length}`), ln(this.serverName, `Has refresh token: ${!!i.refresh_token}`), ln(this.serverName, o != null ? `Expires in: ${Math.floor(o)}s` : "No expiration specified"), i;
  }
  async saveTokens(e) {
    this._pendingStepUpScope = undefined;
    let t = kA(this.serverName, this.serverConfig);
    ln(this.serverName, "Saving tokens"), ln(this.serverName, `Token expires in: ${e.expires_in}`), ln(this.serverName, `Has refresh token: ${!!e.refresh_token}`);
    let n, r;
    try {
      n = await ql().mutate(o => ({
        ...o,
        mcpOAuth: {
          ...o.mcpOAuth,
          [t]: {
            ...o.mcpOAuth?.[t],
            serverName: this.serverName,
            serverUrl: this.serverConfig.url,
            accessToken: e.access_token,
            refreshToken: e.refresh_token ?? o.mcpOAuth?.[t]?.refreshToken,
            expiresAt: e.expires_in != null ? Date.now() + e.expires_in * 1000 : undefined,
            scope: e.scope
          }
        }
      }));
    } catch (o) {
      r = o;
    }
    if (n?.success) this._lastServedAccessToken = e.access_token, this._lastServedRefreshToken = e.refresh_token ?? this._lastServedRefreshToken;
    this.logTokenPersistFailed(n, r);
  }
  logTokenPersistFailed(e, t) {
    UQi(this.serverName, this.serverConfig, e, t);
  }
  async xaaRefresh() {
    let e = Lse();
    if (!e) return;
    let t = await zBe(e.issuer);
    if (!t) {
      ln(this.serverName, "XAA: id_token not cached, needs interactive re-auth");
      return;
    }
    let n = this.serverConfig.oauth?.clientId,
      r = await tHn(this.serverName, this.serverConfig);
    if (!n || !r?.clientSecret) {
      ln(this.serverName, "XAA: missing clientId or clientSecret in config \u2014 skipping silent refresh");
      return;
    }
    let o = await vZe(e.issuer),
      s;
    try {
      s = await dTn(e.issuer);
    } catch (i) {
      ln(this.serverName, `XAA: OIDC discovery failed in silent refresh: ${Ce(i)}`);
      return;
    }
    try {
      let i = await mXr(this.serverConfig.url, {
          clientId: n,
          clientSecret: r.clientSecret,
          idpClientId: e.clientId,
          idpClientSecret: o,
          idpIdToken: t,
          idpTokenEndpoint: s.token_endpoint
        }, this.serverName),
        a = kA(this.serverName, this.serverConfig),
        l,
        c;
      try {
        l = await ql().mutate(u => {
          let d = u.mcpOAuth?.[a];
          return {
            ...u,
            mcpOAuth: {
              ...u.mcpOAuth,
              [a]: {
                ...d,
                serverName: this.serverName,
                serverUrl: this.serverConfig.url,
                accessToken: i.access_token,
                refreshToken: i.refresh_token ?? d?.refreshToken,
                expiresAt: i.expires_in != null ? Date.now() + i.expires_in * 1000 : undefined,
                scope: i.scope,
                clientId: n,
                clientSecret: r.clientSecret,
                discoveryState: {
                  authorizationServerUrl: i.authorizationServerUrl
                }
              }
            }
          };
        });
      } catch (u) {
        c = u;
      }
      return this.logTokenPersistFailed(l, c), {
        access_token: i.access_token,
        token_type: "Bearer",
        expires_in: i.expires_in,
        scope: i.scope,
        refresh_token: i.refresh_token
      };
    } catch (i) {
      if (i instanceof Bge && i.shouldClearIdToken) await $Re(e.issuer), ln(this.serverName, "XAA: cleared id_token after exchange failure");
      throw i;
    }
  }
  async redirectToAuthorization(e) {
    let t = this._pendingStepUpScope ? undefined : this.serverConfig.oauth?.scopes || (this.serverConfig.oauth?.authServerMetadataUrl ? Ykn(this._metadata) : undefined),
      n = e.searchParams.get("scope"),
      r = t ?? n;
    if (r !== n) ln(this.serverName, `Overrode authorization scope from ${n || "NONE"} to configured: ${r}`);
    let o = h$d(r, this._metadata);
    if (o !== null && o !== n) {
      if (e.searchParams.set("scope", o), o !== t) ln(this.serverName, "Appended offline_access to authorization scope");
    }
    let s = y$d(e),
      i = e.searchParams.getAll("prompt"),
      a = s ? i.filter(d => d !== "consent") : i;
    if (a.length !== i.length || a.length > 1) {
      if (e.searchParams.delete("prompt"), a.length > 0) e.searchParams.set("prompt", a.includes("consent") ? "consent" : a.at(-1));
    }
    this._authorizationUrl = e.toString();
    let l = e.searchParams.get("scope");
    if (ln(this.serverName, `Authorization URL: ${OQi(e.toString())}`), ln(this.serverName, `Scopes in URL: ${l || "NOT FOUND"}`), l) this._scopes = l, ln(this.serverName, `Captured scopes from authorization URL: ${l}`);else {
      let d = Ykn(this._metadata);
      if (d) this._scopes = d, ln(this.serverName, `Using scopes from metadata: ${d}`);else ln(this.serverName, "No scopes available from URL or metadata");
    }
    if (this._scopes && !this.handleRedirection && this._pendingStepUpScope) {
      let d = kA(this.serverName, this.serverConfig),
        p = this._scopes,
        m = false;
      try {
        await ql().mutate(f => {
          let A = f.mcpOAuth?.[d];
          if (!A) return f;
          return m = true, {
            ...f,
            mcpOAuth: {
              ...f.mcpOAuth,
              [d]: {
                ...A,
                stepUpScope: p
              }
            }
          };
        });
      } catch (f) {
        ln(this.serverName, `step-up scope persist failed: ${Ce(f)}`);
      }
      if (m) ln(this.serverName, `Persisted step-up scope: ${p}`);
    }
    if (!this.handleRedirection) {
      ln(this.serverName, "Redirection handling is disabled, skipping redirect");
      return;
    }
    let c = e.toString();
    if (!c.startsWith("http://") && !c.startsWith("https://")) throw Error("Invalid authorization URL: must use http:// or https:// scheme");
    ln(this.serverName, "Redirecting to authorization URL");
    let u = OQi(c);
    if (ln(this.serverName, `Authorization URL: ${u}`), this.onAuthorizationUrlCallback) this.onAuthorizationUrlCallback(c);
    if (!this.skipBrowserOpen) {
      if (ln(this.serverName, `Opening authorization URL: ${u}`), !(await Zl(c))) ln(this.serverName, "Browser didn't open automatically. URL is shown in UI.");
    } else ln(this.serverName, `Skipping browser open (skipBrowserOpen=true). URL: ${u}`);
  }
  async saveCodeVerifier(e) {
    ln(this.serverName, "Saving code verifier"), this._codeVerifier = e;
  }
  async codeVerifier() {
    if (!this._codeVerifier) throw ln(this.serverName, "No code verifier saved"), Error("No code verifier saved");
    return ln(this.serverName, "Returning code verifier"), this._codeVerifier;
  }
  async invalidateCredentials(e) {
    if (e === "verifier") {
      this._codeVerifier = undefined, ln(this.serverName, "Invalidated credentials (scope: verifier)");
      return;
    }
    let t = e,
      n = kA(this.serverName, this.serverConfig),
      r = false;
    try {
      let o = this._lastServedClientId,
        s = this._lastServedAccessToken,
        i = this._lastServedRefreshToken;
      await ql().mutate(a => {
        let l = a.mcpOAuth?.[n];
        if (!l) return a;
        let c = {
          ...a.mcpOAuth
        };
        switch (t) {
          case "all":
            {
              let u = s != null && !!l.accessToken && l.accessToken !== s,
                d = o != null && l.clientId != null && l.clientId !== o;
              if (u || d) return ln(this.serverName, `invalidateCredentials('all') preserved: ${u ? "foreign token" : "concurrent re-registration"}`), a;
              if (!l.clientId && !l.refreshToken && l.accessToken === "") return a;
              c[n] = {
                serverName: l.serverName,
                serverUrl: l.serverUrl,
                accessToken: "",
                ...(l.discoveryState && {
                  discoveryState: l.discoveryState
                }),
                ...(l.stepUpScope && {
                  stepUpScope: l.stepUpScope
                })
              };
              break;
            }
          case "client":
            c[n] = {
              ...l,
              clientId: undefined,
              clientSecret: undefined
            };
            break;
          case "tokens":
            {
              if (i != null && l.refreshToken && l.refreshToken !== i || s != null && !!l.accessToken && l.accessToken !== s) return ln(this.serverName, "invalidateCredentials('tokens') preserved: concurrent rotation"), a;
              c[n] = {
                ...l,
                accessToken: "",
                refreshToken: undefined,
                expiresAt: 0
              };
              break;
            }
          case "discovery":
            c[n] = {
              ...l,
              discoveryState: undefined,
              stepUpScope: undefined
            };
            break;
        }
        return r = true, {
          ...a,
          mcpOAuth: c
        };
      });
    } catch (o) {
      ln(this.serverName, `invalidateCredentials persist failed: ${Ce(o)}`);
    }
    if (r) ln(this.serverName, `Invalidated credentials (scope: ${e})`);
  }
  async saveDiscoveryState(e) {
    let t = kA(this.serverName, this.serverConfig);
    ln(this.serverName, `Saving discovery state (authServer: ${e.authorizationServerUrl})`);
    try {
      await ql().mutate(n => ({
        ...n,
        mcpOAuth: {
          ...n.mcpOAuth,
          [t]: {
            ...n.mcpOAuth?.[t],
            serverName: this.serverName,
            serverUrl: this.serverConfig.url,
            accessToken: n.mcpOAuth?.[t]?.accessToken || "",
            expiresAt: n.mcpOAuth?.[t]?.expiresAt,
            discoveryState: {
              authorizationServerUrl: e.authorizationServerUrl,
              resourceMetadataUrl: e.resourceMetadataUrl,
              oauthMetadataFound: !!e.authorizationServerMetadata
            }
          }
        }
      }));
    } catch (n) {
      ln(this.serverName, `saveDiscoveryState persist failed: ${Ce(n)}`);
    }
  }
  async discoveryState() {
    let e = this.serverConfig.oauth?.authServerMetadataUrl;
    if (e) {
      ln(this.serverName, `Fetching metadata from configured URL: ${e}`);
      try {
        let s = await Xkn(this.serverName, this.serverConfig.url, e);
        if (s) return {
          authorizationServerUrl: s.issuer,
          authorizationServerMetadata: s
        };
      } catch (s) {
        ln(this.serverName, `Failed to fetch from configured metadata URL: ${Ce(s)}`);
      }
      return;
    }
    let n = await ql().readAsync(),
      r = kA(this.serverName, this.serverConfig),
      o = n?.mcpOAuth?.[r]?.discoveryState;
    if (o?.authorizationServerUrl) return ln(this.serverName, `Returning cached discovery state (authServer: ${o.authorizationServerUrl})`), {
      authorizationServerUrl: o.authorizationServerUrl,
      resourceMetadataUrl: o.resourceMetadataUrl,
      resourceMetadata: o.resourceMetadata,
      authorizationServerMetadata: o.authorizationServerMetadata
    };
    return;
  }
  async refreshAuthorization(e) {
    let t = kA(this.serverName, this.serverConfig),
      n = u7();
    await Js().mkdir(n);
    let r = t.replace(/[^a-zA-Z0-9]/g, "_"),
      o = BQi.join(n, `mcp-refresh-${r}.lock`),
      s;
    for (let i = 0; i < O7r; i++) try {
      ln(this.serverName, `Acquiring refresh lock (attempt ${i + 1})`), s = await zg(o, {
        realpath: false,
        onCompromised: () => {
          ln(this.serverName, "Refresh lock was compromised");
        }
      }), ln(this.serverName, "Acquired refresh lock");
      break;
    } catch (a) {
      let l = cn(a);
      if (l === "ELOCKED") {
        ln(this.serverName, `Refresh lock held by another process, waiting (attempt ${i + 1}/${O7r})`), await Kn(1000 + Math.random() * 1000);
        continue;
      }
      ln(this.serverName, `Failed to acquire refresh lock: ${l}; skipping refresh`);
      return;
    }
    if (!s) {
      ln(this.serverName, `Could not acquire refresh lock after ${O7r} retries; skipping refresh`);
      return;
    }
    try {
      d7();
      let l = (await ql().readAsync())?.mcpOAuth?.[t];
      if (l) {
        let c = l.expiresAt != null ? (l.expiresAt - Date.now()) / 1000 : undefined;
        if (l.accessToken && (c == null || c > 300)) return ln(this.serverName, c != null ? `Another process already refreshed tokens (expires in ${Math.floor(c)}s)` : "Another process already refreshed tokens (no expiration)"), {
          access_token: l.accessToken,
          refresh_token: l.refreshToken,
          expires_in: c,
          scope: l.scope,
          token_type: "Bearer"
        };
        if (l.refreshToken) e = l.refreshToken, this._lastServedRefreshToken = l.refreshToken;
      }
      return await this._doRefresh(e);
    } finally {
      if (s) try {
        await s(), ln(this.serverName, "Released refresh lock");
      } catch {
        ln(this.serverName, "Failed to release refresh lock");
      }
    }
  }
  async readConcurrentRefreshWinner() {
    d7();
    let t = (await ql().readAsync())?.mcpOAuth?.[kA(this.serverName, this.serverConfig)],
      n = t?.expiresAt != null ? (t.expiresAt - Date.now()) / 1000 : undefined;
    if (t?.accessToken && (n == null || n > 300)) {
      ln(this.serverName, "Another process landed fresh tokens; using those");
      let r = {
        access_token: t.accessToken,
        refresh_token: t.refreshToken,
        expires_in: n,
        scope: t.scope,
        token_type: "Bearer"
      };
      return {
        tokenData: t,
        freshTokens: r
      };
    }
    return {
      tokenData: t,
      freshTokens: undefined
    };
  }
  async _doRefresh(e) {
    let n = j4(this.serverConfig),
      r = (o, s) => {
        W(o === "success" ? "tengu_mcp_oauth_refresh_success" : "tengu_mcp_oauth_refresh_failure", {
          transportType: Le(this.serverConfig.type),
          ...(n && {
            mcpServerBaseUrl: n
          }),
          ...(s && {
            reason: Le(s)
          })
        });
      };
    for (let o = 1; o <= 3; o++) {
      let s;
      try {
        ln(this.serverName, "Starting token refresh");
        let i = Jkn(),
          a = this._metadata;
        if (!a) {
          let c = await this.discoveryState();
          if (c?.authorizationServerMetadata) a = c.authorizationServerMetadata;else if (c?.authorizationServerUrl) ln(this.serverName, `Re-discovering metadata from persisted auth server URL: ${c.authorizationServerUrl}`), a = await KBe(c.authorizationServerUrl, {
            fetchFn: i
          });
        }
        if (!a) a = await Xkn(this.serverName, this.serverConfig.url, this.serverConfig.oauth?.authServerMetadataUrl, i);
        if (!a) {
          ln(this.serverName, "Failed to discover OAuth metadata"), r("failure", "metadata_discovery_failed"), xe("mcp_oauth_refresh", "mcp_oauth_refresh_metadata_failed");
          return;
        }
        if (this._metadata = a, s = await this.clientInformation(), !s) {
          ln(this.serverName, "No client information available"), r("failure", "no_client_info"), xe("mcp_oauth_refresh", "mcp_oauth_refresh_no_client_info");
          return;
        }
        let l = await zBr(new URL(this.serverConfig.url), {
          metadata: a,
          clientInformation: s,
          refreshToken: e,
          resource: new URL(this.serverConfig.url),
          fetchFn: i
        });
        if (l) return ln(this.serverName, "Token refresh successful"), await this.saveTokens(l), r("success"), He("mcp_oauth_refresh"), l;
        ln(this.serverName, "Token refresh returned no tokens"), r("failure", "no_tokens_returned"), xe("mcp_oauth_refresh", "mcp_oauth_refresh_no_tokens");
        return;
      } catch (i) {
        if (i instanceof BRe) {
          ln(this.serverName, `Token refresh failed with invalid_grant: ${i.message}`);
          let {
            freshTokens: d
          } = await this.readConcurrentRefreshWinner();
          if (d) return Pt("mcp_oauth_refresh", "mcp_oauth_refresh_concurrent_winner"), d;
          ln(this.serverName, "No valid tokens in storage, clearing stored tokens"), r("failure", "invalid_grant"), xe("mcp_oauth_refresh", "mcp_oauth_refresh_invalid_grant"), await this.invalidateCredentials("tokens");
          return;
        }
        if (i instanceof wA && (i.errorCode === "invalid_client" || i.errorCode === "unauthorized_client")) {
          ln(this.serverName, "Token refresh failed: DCR client expired or invalid; clearing stored client registration");
          let {
            tokenData: d,
            freshTokens: p
          } = await this.readConcurrentRefreshWinner();
          if (p) return Pt("mcp_oauth_refresh", "mcp_oauth_refresh_concurrent_winner"), p;
          if (d?.clientId && s && d.clientId !== s.client_id) {
            ln(this.serverName, "Another process re-registered client; preserving"), r("failure", "concurrent_reregister"), Pt("mcp_oauth_refresh", "mcp_oauth_refresh_concurrent_reregister");
            return;
          }
          r("failure", i.errorCode === "unauthorized_client" ? "unauthorized_client" : "invalid_client"), xe("mcp_oauth_refresh", i.errorCode === "unauthorized_client" ? "mcp_oauth_refresh_unauthorized_client" : "mcp_oauth_refresh_invalid_client"), await this.invalidateCredentials("all");
          return;
        }
        let a = i instanceof Error && /timeout|timed out|etimedout|econnreset/i.test(i.message),
          l = i instanceof Dse || i instanceof EZe || i instanceof CZe,
          c = a || l;
        if (!c || o >= 3) {
          ln(this.serverName, `Token refresh failed: ${Ce(i)}`), r("failure", c ? "transient_retries_exhausted" : "request_failed"), xe("mcp_oauth_refresh", "mcp_oauth_refresh_request_failed");
          return;
        }
        let u = 1000 * Math.pow(2, o - 1);
        ln(this.serverName, `Token refresh failed, retrying in ${u}ms (attempt ${o}/3)`), await Kn(u);
      }
    }
    return;
  }
}
async function fMt() {
  let e = process.env.MCP_CLIENT_SECRET;
  if (e) return e;
  if (!process.stdin.isTTY) throw Error("No TTY available to prompt for client secret. Set MCP_CLIENT_SECRET env var instead.");
  return new Promise((t, n) => {
    process.stderr.write("Enter OAuth client secret: "), process.stdin.setRawMode?.(true);
    let r = "",
      o = s => {
        let i = s.toString();
        if (i === `
` || i === "\r") process.stdin.setRawMode?.(false), process.stdin.removeListener("data", o), process.stderr.write(`
`), t(r);else if (i === "\x03") process.stdin.setRawMode?.(false), process.stdin.removeListener("data", o), n(Error("Cancelled"));else if (i === "\x7F" || i === "\b") r = r.slice(0, -1);else r += i;
      };
    process.stdin.on("data", o);
  });
}
async function AMt(e, t, n) {
  let r = kA(e, t);
  try {
    return await ql().mutate(o => ({
      ...o,
      mcpOAuthClientConfig: {
        ...o.mcpOAuthClientConfig,
        [r]: {
          clientSecret: n
        }
      }
    }));
  } catch (o) {
    return {
      success: false,
      warning: Ce(o)
    };
  }
}
async function $Qi(e, t) {
  let n = kA(e, t);
  await ql().mutate(r => {
    if (!r.mcpOAuthClientConfig?.[n]) return r;
    let o = {
      ...r.mcpOAuthClientConfig
    };
    return delete o[n], {
      ...r,
      mcpOAuthClientConfig: o
    };
  });
}
async function tHn(e, t) {
  let r = await ql().readAsync(),
    o = kA(e, t);
  return r?.mcpOAuthClientConfig?.[o];
}
function Ykn(e) {
  if (!e) return;
  if ("scope" in e && typeof e.scope === "string") return e.scope;
  if ("default_scope" in e && typeof e.default_scope === "string") return e.default_scope;
  if (e.scopes_supported && Array.isArray(e.scopes_supported)) return e.scopes_supported.join(" ");
  return;
}
function h$d(e, t) {
  if (e !== null && e.split(" ").includes("offline_access")) return e;
  if (!t?.scopes_supported?.includes("offline_access")) return e;
  return e === null ? "offline_access" : `${e} offline_access`;
}
function y$d(e) {
  try {
    let t = (typeof e === "string" ? new URL(e) : e).hostname;
    return g$d.includes(t) || _$d.some(n => t.endsWith(n));
  } catch {
    return false;
  }
}
var Qkn,
  NQi,
  BQi,
  FQi,
  d$d = 30000,
  O7r = 5,
  m$d,
  f$d,
  Kz,
  Vkn,
  Kkn,
  zkn,
  g$d,
  _$d;
var Bae = b(() => {
  URe();
  FBr();
  mxt();
  ap();
  toe();
  Sc();
  rT();
  Jg();
  Ct();
  vn();
  Es();
  ey();
  e8();
  G5();
  tn();
  mn();
  kt();
  vfe();
  JBr();
  ZBr();
  qO();
  Rsa();
  wZe();
  Qkn = require("crypto"), NQi = require("http"), BQi = require("path"), FQi = require("url");
  m$d = ["state", "nonce", "code_challenge", "code_verifier", "code"];
  f$d = new Set(["invalid_refresh_token", "expired_refresh_token", "token_expired"]);
  Kz = class Kz extends Error {
    constructor() {
      super("Authentication was cancelled");
      this.name = "AuthenticationCancelledError";
    }
  };
  Vkn = new Map(), Kkn = new Map();
  zkn = new Map();
  g$d = ["login.microsoftonline.com", "login.microsoftonline.us", "login.partner.microsoftonline.cn", "login.chinacloudapi.cn"], _$d = [".b2clogin.com", ".ciamlogin.com"];
});

export {p$d as KVd,OQi as vsa,LQi as wsa,Jkn as Bxn,Xkn as Uxn,L7r as hXr,$rt as qst,qrt as Wst,jrt as Gst,M7r as gXr,MQi as ksa,mMt as Uge,Zkn as qxn,UQi as Dsa,A$d as YVd,Nae as Ej,eHn as Wxn,M$e as U9e,fMt as qNt,AMt as WNt,$Qi as Psa,tHn as Gxn,Ykn as Fxn,h$d as JVd,y$d as ZVd,Qkn as $xn,NQi as Hsa,BQi as Isa,FQi as xsa,d$d as VVd,O7r as fXr,m$d as zVd,f$d as jVd,Kz as P$,Vkn as Lxn,Kkn as Mxn,zkn as Nxn,g$d as XVd,_$d as QVd,Bae as wee};
