// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {je} from "../../vendor/m577.ts";
import {st} from "../../vendor/m5.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Oe,Ie,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {sS,UO} from "../config/2189_level.ts";
import {N$l,q$l} from "../../vendor/m5250.ts";
import {Gi,ReactHooks} from "../../vendor/m133.ts";
import {Pn,dn,bt} from "../../vendor/m195.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn} from "../config/0047_namespace.ts";
var Y$l = {};
isFullscreenWithTTY(Y$l, {
  resetAgentProxyForTests: () => resetAgentProxyForTests,
  installIntoSystemTrust: () => installIntoSystemTrust,
  initAgentProxy: () => initAgentProxy,
  getAgentProxyEnv: () => getAgentProxyEnv,
  findSystemCaBundle: () => findSystemCaBundle,
  SESSION_TOKEN_PATH: () => SESSION_TOKEN_PATH
});
async function initAgentProxy(e: any) {
  let t = process.env.AGENT_PROXY_URL,
    n = process.env.AGENT_PROXY_AUTH_TOKEN;
  if (je.unset("AGENT_PROXY_URL"), je.unset("AGENT_PROXY_AUTH_TOKEN"), !st(process.env.CLAUDE_CODE_REMOTE)) return UC;
  if (!je.CCR_AGENT_PROXY_ENABLED) return UC;
  let r = process.env.CLAUDE_CODE_REMOTE_SESSION_ID;
  if (!r) return logForDebugging("[agent-proxy] CLAUDE_CODE_REMOTE_SESSION_ID unset; proxy disabled", {
    level: "warn"
  }), Oe("agent_proxy_init", "agent_proxy_init_no_session_id"), UC;
  let o = e?.tokenPath ?? SESSION_TOKEN_PATH,
    s = await Fwm(o),
    i = s.existed,
    a = s.token;
  if (!a) a = sS();
  if (!a && !n) return logForDebugging("[agent-proxy] no session token; proxy disabled"), Oe("agent_proxy_init", "agent_proxy_init_no_token"), UC;
  logForDebugging(`[agent-proxy] token via ${i ? o : "sessionIngressAuth"}`), Uwm();
  let l = t ?? e?.ccrBaseUrl ?? process.env.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com",
    c = e?.caBundlePath ?? CAt.join(RDo.homedir(), ".ccr", "ca-bundle.crt"),
    u = e?.systemCaPath ? await QG.readFile(e.systemCaPath, "utf8").catch(() => "") : await findSystemCaBundle();
  if (!(await qwm(l, u, c, e?.systemTrustTargets ?? $wm))) return UC;
  await jwm(e?.awsConfigPath ?? CAt.join(RDo.homedir(), ".aws", "config"));
  try {
    let p = l.replace(/^http/, "ws") + V$l + "/ws",
      m = await N$l({
        wsUrl: p,
        sessionId: r,
        token: n ?? a ?? ""
      });
    if (Gi(async () => m.stop()), xDo = m, UC = {
      enabled: !0,
      port: m.port,
      caBundlePath: c,
      hasSystemCa: u !== "",
      noProxy: t ? Lwm : kDo
    }, logForDebugging(`[agent-proxy] enabled on 127.0.0.1:${m.port}`), Ie("agent_proxy_init"), i) await QG.unlink(o).catch(() => {
      logForDebugging("[agent-proxy] token file unlink failed", {
        level: "warn"
      });
    });
  } catch (p: any) {
    logForDebugging(`[agent-proxy] relay start failed: ${p instanceof Error ? p.message : String(p)}; proxy disabled`, {
      level: "warn"
    }), Oe("agent_proxy_init", "agent_proxy_init_relay_start_failed");
  }
  return UC;
}
function getAgentProxyEnv() {
  if (!UC.enabled || !UC.port || !UC.caBundlePath) {
    if (process.env.HTTPS_PROXY && process.env.SSL_CERT_FILE) {
      let s: any = {};
      for (let i of ["HTTPS_PROXY", "https_proxy", "NO_PROXY", "no_proxy", "SSL_CERT_FILE", "NODE_EXTRA_CA_CERTS", "REQUESTS_CA_BUNDLE", "CURL_CA_BUNDLE", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "GH_TOKEN", "GITHUB_TOKEN", "CLOUDSDK_AUTH_ACCESS_TOKEN", "CLOUDSDK_CORE_CUSTOM_CA_CERTS_FILE", "HTTPLIB2_CA_CERTS", "AWS_CA_BUNDLE", "DENO_CERT", "CARGO_HTTP_CAINFO", "PIP_CERT", "GIT_SSL_CAINFO"]) if (process.env[i]) s[i] = process.env[i];
      return s;
    }
    return {};
  }
  let e = `http://127.0.0.1:${UC.port}`,
    t: any = {
      HTTPS_PROXY: e,
      https_proxy: e,
      NO_PROXY: UC.noProxy,
      no_proxy: UC.noProxy,
      SSL_CERT_FILE: UC.caBundlePath,
      NODE_EXTRA_CA_CERTS: UC.caBundlePath,
      REQUESTS_CA_BUNDLE: UC.caBundlePath,
      CURL_CA_BUNDLE: UC.caBundlePath,
      CLOUDSDK_CORE_CUSTOM_CA_CERTS_FILE: UC.caBundlePath,
      HTTPLIB2_CA_CERTS: UC.caBundlePath
    };
  if (UC.hasSystemCa) t.AWS_CA_BUNDLE = UC.caBundlePath, t.DENO_CERT = UC.caBundlePath, t.CARGO_HTTP_CAINFO = UC.caBundlePath, t.PIP_CERT = UC.caBundlePath, t.GIT_SSL_CAINFO = UC.caBundlePath;
  if (!(process.env.GH_TOKEN || process.env.GITHUB_TOKEN)) t.GH_TOKEN = "proxy-injected", t.GITHUB_TOKEN = "proxy-injected";
  if (!(process.env.AWS_ACCESS_KEY_ID || process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SESSION_TOKEN || process.env.AWS_PROFILE || process.env.AWS_SHARED_CREDENTIALS_FILE || process.env.AWS_CONFIG_FILE || process.env.AWS_WEB_IDENTITY_TOKEN_FILE || process.env.AWS_ROLE_ARN || process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI || process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI)) t.AWS_ACCESS_KEY_ID = "proxy-injected", t.AWS_SECRET_ACCESS_KEY = "proxy-injected";
  if (!(process.env.CLOUDSDK_AUTH_ACCESS_TOKEN || process.env.GOOGLE_APPLICATION_CREDENTIALS)) t.CLOUDSDK_AUTH_ACCESS_TOKEN = "proxy-injected";
  return t;
}
function resetAgentProxyForTests() {
  UC = {
    enabled: !1,
    noProxy: kDo
  }, xDo?.stop(), xDo = void 0;
}
async function Fwm(e: any) {
  try {
    return {
      existed: !0,
      token: (await QG.readFile(e, "utf8")).trim() || null
    };
  } catch (t: any) {
    if (Pn(t)) return {
      existed: !1,
      token: null
    };
    return logForDebugging(`[agent-proxy] token read failed: ${t instanceof Error ? t.message : String(t)}`, {
      level: "warn"
    }), {
      existed: !1,
      token: null
    };
  }
}
function Uwm() {
  return;
}
async function findSystemCaBundle(e: any = Owm) {
  for (let t of e) try {
    return await QG.readFile(t, "utf8");
  } catch {}
  return "";
}
async function installIntoSystemTrust(e: any, t: any) {
  for (let {
    dir: n,
    name: r,
    refresh: o
  } of t) try {
    await QG.writeFile(CAt.join(n, r), e, "utf8");
    let s = await new Promise(i => {
      j$l.execFile(o[0], o.slice(1), {
        timeout: 1e4,
        cwd: "/"
      }, (a: any) => i(a ? Pn(a) ? 127 : 1 : 0));
    });
    if (s === 0) {
      logForDebugging(`[agent-proxy] CA installed to system trust via ${o[0]}`), Ie("agent_proxy_system_trust");
      return;
    }
    logForDebugging(`[agent-proxy] ${o[0]} exited ${s}; falling back to env-var trust`, {
      level: "warn"
    });
  } catch (s: any) {
    if (Pn(s)) continue;
    logForDebugging(`[agent-proxy] system trust install via ${n} failed: ${s instanceof Error ? s.message : String(s)}`, {
      level: "warn"
    });
  }
  if (t.length > 0) isTmuxControlMode("agent_proxy_system_trust", "unavailable");
}
async function qwm(e: any, t: any, n: any, r: any) {
  let o = AbortSignal.timeout(5000),
    s = "";
  for (let i = 0; i < 3; i++) try {
    let a = await fetch(`${e}${V$l}/ca-cert`, {
      signal: o
    });
    if (a.status >= 500) {
      s = `status ${a.status}`;
      continue;
    }
    if (!a.ok) return logForDebugging(`[agent-proxy] ca-cert fetch ${a.status}; proxy disabled`, {
      level: "warn"
    }), Oe("agent_proxy_init", "agent_proxy_init_ca_http_error"), !1;
    let l = await a.text();
    return await QG.mkdir(CAt.join(n, ".."), {
      recursive: !0
    }), await QG.writeFile(n, t + `
` + l, "utf8"), await installIntoSystemTrust(l, r).catch(() => {}), !0;
  } catch (a: any) {
    s = a instanceof Error ? a.message : String(a);
  }
  return logForDebugging(`[agent-proxy] ca-cert fetch exhausted (${s}); proxy disabled`, {
    level: "warn"
  }), Oe("agent_proxy_init", "agent_proxy_init_ca_exhausted"), !1;
}
async function jwm(e: any) {
  try {
    await QG.mkdir(CAt.join(e, ".."), {
      recursive: !0,
      mode: 448
    }), await QG.writeFile(e, `[default]
s3 =
  payload_signing_enabled = false
`, {
      flag: "wx",
      mode: 384
    });
  } catch (t: any) {
    if (dn(t) === "EEXIST") return;
    logForDebugging(`[agent-proxy] aws config write failed: ${t instanceof Error ? t.message : String(t)}`, {
      level: "warn"
    });
  }
}
var j$l: any,
  QG: any,
  RDo: any,
  CAt: any,
  SESSION_TOKEN_PATH = "/run/ccr/session_token",
  Owm: any,
  G$l: any,
  kDo: any,
  Lwm: any,
  UC: any,
  xDo: any,
  V$l = "/v1/code/agent-proxy",
  $wm: any;
var J$l = b(() => {
  ln();
  ReactHooks();
  qe();
  Lr();
  sn();
  bt();
  UO();
  q$l();
  j$l = require("child_process"), QG = require("fs/promises"), RDo = require("os"), CAt = require("path"), Owm = ["/etc/ssl/certs/ca-certificates.crt", "/etc/pki/tls/certs/ca-bundle.crt", "/etc/ssl/cert.pem"], G$l = ["localhost", "127.0.0.1", "::1", "127.0.0.0/8", "0.0.0.0/8", "::", "169.254.0.0/16", "fe80::/10", "anthropic.com", ".anthropic.com", "*.anthropic.com", "registry.npmjs.org", "jsr.io", "npm.jsr.io", "pypi.org", "files.pythonhosted.org", "index.crates.io", "proxy.golang.org"], kDo = [...G$l, "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "100.64.0.0/10", "fc00::/7"].join(","), Lwm = G$l.join(","), UC = {
    enabled: !1,
    noProxy: kDo
  };
  $wm = [{
    dir: "/usr/local/share/ca-certificates",
    name: "ccr-agent-proxy.crt",
    refresh: ["update-ca-certificates"]
  }, {
    dir: "/etc/pki/ca-trust/source/anchors",
    name: "ccr-agent-proxy.crt",
    refresh: ["update-ca-trust", "extract"]
  }];
});
export {Y$l,initAgentProxy,getAgentProxyEnv,resetAgentProxyForTests,Fwm,Uwm,findSystemCaBundle,installIntoSystemTrust,qwm,jwm,j$l,QG,RDo,CAt,SESSION_TOKEN_PATH,Owm,G$l,kDo,Lwm,UC,xDo,V$l,$wm,J$l};
