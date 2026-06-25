// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {getInitialSettings as Fr,br} from "./0745_updateSettingsForSource.ts";
import {ql,e8} from "../../vendor/m1485.ts";
import {ln,vn} from "../session/0621_length.ts";
import {Ce,mo,Ct} from "../../vendor/m197.ts";
import {getProxyFetchOptions as nT,ey} from "./1026_shouldBypassProxyWithCidr.ts";
import {jyn,mxt} from "../../vendor/m2041.ts";
import {qt,tn} from "./0230_encoding.ts";
import {Pse,JBr} from "../../vendor/m2045.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {Tl,mn} from "../telemetry/0600_feature_name.ts";
import {cTn,hxt,ZBr} from "../../vendor/m2046.ts";
import {VBr,Rli,URe} from "../../vendor/m2043.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {b} from "../../runtime.ts";
import {dn} from "./0137_namespace.ts";
// @ts-nocheck
function Ose() {
  return nt(process.env.CLAUDE_CODE_ENABLE_XAA);
}
function Lse() {
  return Fr().xaaIdp;
}
function hfe(e) {
  try {
    let t = new URL(e);
    return t.pathname = t.pathname.replace(/\/+$/, ""), t.host = t.host.toLowerCase(), t.toString();
  } catch {
    return e.replace(/\/+$/, "");
  }
}
async function JBe(e) {
  let r = (await ql().readAsync())?.mcpXaaIdp?.[hfe(e)];
  if (!r) return;
  if (r.expiresAt - Date.now() <= hVu * 1000) return;
  return r.idToken;
}
async function Bni(e, t, n) {
  await ql().mutate(r => ({
    ...r,
    mcpXaaIdp: {
      ...r.mcpXaaIdp,
      [hfe(e)]: {
        idToken: t,
        expiresAt: n
      }
    }
  }));
}
async function Fni(e, t) {
  let n = $ni(t),
    r = n ? n * 1000 : Date.now() + 3600000;
  return await Bni(e, t, r), r;
}
async function ove(e) {
  let t = hfe(e);
  try {
    await ql().mutate(n => {
      if (!n.mcpXaaIdp?.[t]) return n;
      let r = {
        ...n.mcpXaaIdp
      };
      return delete r[t], {
        ...n,
        mcpXaaIdp: r
      };
    });
  } catch (n) {
    ln("xaa", `clearIdpIdToken(${t}) failed: ${Ce(n)}`);
  }
}
async function Uni(e, t) {
  try {
    return await ql().mutate(n => ({
      ...n,
      mcpXaaIdpConfig: {
        ...n.mcpXaaIdpConfig,
        [hfe(e)]: {
          clientSecret: t
        }
      }
    }));
  } catch (n) {
    return {
      success: false,
      warning: Ce(n)
    };
  }
}
async function xXe(e) {
  return (await ql().readAsync())?.mcpXaaIdpConfig?.[hfe(e)]?.clientSecret;
}
async function Hhn(e) {
  let t = hfe(e);
  try {
    await ql().mutate(n => {
      if (!n.mcpXaaIdpConfig?.[t]) return n;
      let r = {
        ...n.mcpXaaIdpConfig
      };
      return delete r[t], {
        ...n,
        mcpXaaIdpConfig: r
      };
    });
  } catch (n) {
    ln("xaa", `clearIdpClientSecret(${t}) failed: ${Ce(n)}`);
  }
}
async function Ihn(e) {
  let t = e.endsWith("/") ? e : e + "/",
    n = new URL(".well-known/openid-configuration", t),
    r = await fetch(n, {
      ...nT({
        url: String(n)
      }),
      headers: {
        Accept: "application/json"
      },
      signal: AbortSignal.timeout(Nni)
    });
  if (!r.ok) throw Error(`XAA IdP: OIDC discovery failed: HTTP ${r.status} at ${n}`);
  let o;
  try {
    o = await r.json();
  } catch {
    throw Error(`XAA IdP: OIDC discovery returned non-JSON at ${n} (captive portal or proxy?)`);
  }
  let s = jyn.safeParse(o);
  if (!s.success) throw Error(`XAA IdP: invalid OIDC metadata: ${s.error.message}`);
  if (new URL(s.data.token_endpoint).protocol !== "https:") throw Error(`XAA IdP: refusing non-HTTPS token endpoint: ${s.data.token_endpoint}`);
  return s.data;
}
function $ni(e) {
  let t = e.split(".");
  if (t.length !== 3) return;
  try {
    let n = qt(Buffer.from(t[1], "base64url").toString("utf-8"));
    return typeof n.exp === "number" ? n.exp : undefined;
  } catch {
    return;
  }
}
function gVu(e, t, n, r) {
  let o = null,
    s = null,
    i = null,
    a = () => {
      if (o?.removeAllListeners(), o?.on("error", () => {}), o?.close(), o = null, s) clearTimeout(s), s = null;
      if (n && i) n.removeEventListener("abort", i), i = null;
    };
  return new Promise((l, c) => {
    let u = false,
      d = m => {
        if (u) return;
        u = true, a(), l(m);
      },
      p = m => {
        if (u) return;
        u = true, a(), c(m);
      };
    if (n) {
      if (i = () => p(Error("XAA IdP: login cancelled")), n.aborted) {
        i();
        return;
      }
      n.addEventListener("abort", i, {
        once: true
      });
    }
    o = Lni.createServer((m, f) => {
      let A = Mni.parse(m.url || "", true);
      if (A.pathname !== "/callback") {
        f.writeHead(404), f.end();
        return;
      }
      let h_2 = A.query.code,
        g_2 = A.query.state,
        __2 = A.query.error;
      if (__2) {
        let y = A.query.error_description;
        f.writeHead(400, {
          "Content-Type": "text/html"
        }), f.end(Pse({
          ok: false,
          heading: "Sign-in failed",
          message: "Close this tab and try again from Claude Code.",
          detail: `${__2}: ${y ?? ""}`
        })), p(Error(`XAA IdP: ${__2}${y ? ` \u2014 ${y}` : ""}`));
        return;
      }
      if (g_2 !== t) {
        f.writeHead(400, {
          "Content-Type": "text/html"
        }), f.end(Pse({
          ok: false,
          heading: "Sign-in failed",
          message: "State mismatch. Close this tab and try again."
        })), p(Error("XAA IdP: state mismatch (possible CSRF)"));
        return;
      }
      if (!h_2) {
        f.writeHead(400, {
          "Content-Type": "text/html"
        }), f.end(Pse({
          ok: false,
          heading: "Sign-in failed",
          message: "No authorization code received. Close this tab and try again."
        })), p(Error("XAA IdP: callback missing code"));
        return;
      }
      f.writeHead(200, {
        "Content-Type": "text/html"
      }), f.end(Pse({
        ok: true,
        heading: "Sign-in complete",
        message: "You can close this tab and return to Claude Code."
      })), d(h_2);
    }), o.on("error", m => {
      if (m.code === "EADDRINUSE") {
        let f = Yt() === "windows" ? `netstat -ano | findstr :${e}` : `lsof -ti:${e} -sTCP:LISTEN`;
        p(Error(`XAA IdP: callback port ${e} is already in use. Run \`${f}\` to find the holder.`));
      } else p(Error(`XAA IdP: callback server failed: ${m.message}`));
    }), o.listen(e, "127.0.0.1", () => {
      try {
        r();
      } catch (m) {
        p(mo(m));
      }
    }), o.unref(), s = setTimeout(m => m(Error("XAA IdP: login timed out")), AVu, p), s.unref();
  });
}
async function Dhn(e) {
  return Tl("mcp_xaa_idp_login", async () => {
    let {
        idpIssuer: t,
        idpClientId: n
      } = e,
      r = await JBe(t);
    if (r) return ln("xaa", `Using cached id_token for ${t}`), r;
    ln("xaa", `No cached id_token for ${t}; starting OIDC login`);
    let o = await Ihn(t),
      s = e.callbackPort ?? (await cTn()),
      i = hxt(s),
      a = Oni.randomBytes(32).toString("base64url"),
      l = {
        client_id: n,
        ...(e.idpClientSecret && {
          client_secret: e.idpClientSecret
        })
      },
      {
        authorizationUrl: c,
        codeVerifier: u
      } = await VBr(t, {
        metadata: o,
        clientInformation: l,
        redirectUrl: i,
        scope: "openid",
        state: a
      }),
      d = await gVu(s, a, e.abortSignal, () => {
        if (e.onAuthorizationUrl(c.toString()), !e.skipBrowserOpen) ln("xaa", "Opening browser to IdP authorization endpoint"), Zl(c.toString());
      }),
      p = await Rli(t, {
        metadata: o,
        clientInformation: l,
        authorizationCode: d,
        codeVerifier: u,
        redirectUri: i,
        fetchFn: (A, h_2) => fetch(A, {
          ...h_2,
          ...nT({
            url: String(A)
          }),
          signal: AbortSignal.timeout(Nni)
        })
      });
    if (!p.id_token) throw Error("XAA IdP: token response missing id_token (check scope=openid)");
    let m = $ni(p.id_token),
      f = m ? m * 1000 : Date.now() + (p.expires_in ?? 3600) * 1000;
    try {
      await Bni(t, p.id_token, f), ln("xaa", `Cached id_token for ${t} (expires ${new Date(f).toISOString()})`);
    } catch (A) {
      ln("xaa", `id_token cache write failed: ${Ce(A)}`);
    }
    return p.id_token;
  });
}
var Oni,
  Lni,
  Mni,
  AVu = 300000,
  Nni = 30000,
  hVu = 60;
var kXe = b(() => {
  URe();
  mxt();
  Jg();
  dn();
  Ct();
  vn();
  Es();
  ey();
  e8();
  br();
  tn();
  mn();
  JBr();
  ZBr();
  Oni = require("crypto"), Lni = require("http"), Mni = require("url");
});

export {Ose,Lse,hfe as Rfe,JBe as zBe,Bni as Pli,Fni as Oli,ove as $Re,Uni as Lli,xXe as vZe,Hhn as uTn,Ihn as dTn,$ni as Mli,gVu as Mtd,Dhn as pTn,Oni as Hli,Lni as Ili,Mni as xli,AVu as Otd,Nni as Dli,hVu as Ltd,kXe as wZe};
