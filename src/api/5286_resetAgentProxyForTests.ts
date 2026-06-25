// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Ne} from "../../vendor/m583.ts";
import {nt} from "../../vendor/m127.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {ZT,sO} from "../config/2194_level.ts";
import {HGl,OGl} from "../../vendor/m5283.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {CDt} from "../agent/2238_explicitlyRequested.ts";
import {FGl,NGl,UGl} from "../../vendor/m5284.ts";
import {fqt,xgo,Dgo,Pgo} from "../../vendor/m4222.ts";
import {QOt,B8r,Z2e} from "../config/2612_GIT_CONFIG_COUNT.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {In,cn,Ct} from "../../vendor/m197.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
var YGl = {};
ft(YGl, {
  resetAgentProxyForTests: () => resetAgentProxyForTests,
  installIntoSystemTrust: () => installIntoSystemTrust,
  initAgentProxy: () => initAgentProxy,
  getAgentProxyEnv: () => getAgentProxyEnv,
  findSystemCaBundle: () => findSystemCaBundle,
  SESSION_TOKEN_PATH: () => SESSION_TOKEN_PATH
});
/**
 * Boots the per-session agent proxy: validates remote-session env, loads/derives
 * a session token, fetches the relay CA cert, folds in customer CA bundles,
 * installs system trust, writes the AWS config and proxy README, then starts the
 * WebSocket relay. Returns the current proxy status object (CS).
 */
async function initAgentProxy(opts: any) {
  let proxyUrlOverride = process.env.AGENT_PROXY_URL,
    authTokenOverride = process.env.AGENT_PROXY_AUTH_TOKEN;
  if (Ne.unset("AGENT_PROXY_URL"), Ne.unset("AGENT_PROXY_AUTH_TOKEN"), !nt(process.env.CLAUDE_CODE_REMOTE)) return CS;
  if (!Ne.CCR_AGENT_PROXY_ENABLED) return CS;
  let sessionId = process.env.CLAUDE_CODE_REMOTE_SESSION_ID;
  if (!sessionId) return A("[agent-proxy] CLAUDE_CODE_REMOTE_SESSION_ID unset; proxy disabled", {
    level: "warn"
  }), xe("agent_proxy_init", "agent_proxy_init_no_session_id"), CS;
  let tokenPath = opts?.tokenPath ?? SESSION_TOKEN_PATH,
    tokenRead = await uLm(tokenPath),
    tokenFileExisted = tokenRead.existed,
    sessionToken = tokenRead.token;
  if (!sessionToken) sessionToken = ZT();
  if (!sessionToken && !authTokenOverride) return A("[agent-proxy] no session token; proxy disabled"), xe("agent_proxy_init", "agent_proxy_init_no_token"), CS;
  A(`[agent-proxy] token via ${tokenFileExisted ? tokenPath : "sessionIngressAuth"}`), dLm();
  let baseUrl = proxyUrlOverride ?? opts?.ccrBaseUrl ?? process.env.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com",
    caBundlePath = opts?.caBundlePath ?? HSe.join(Q1o.homedir(), ".ccr", "ca-bundle.crt"),
    systemCa = opts?.systemCaPath ? await TN.readFile(opts.systemCaPath, "utf8").catch(() => "") : await findSystemCaBundle(),
    customerCaFolded = await fLm(systemCa, caBundlePath),
    relayCaCert = await gLm(baseUrl, customerCaFolded ? `${systemCa}
${customerCaFolded}` : systemCa, caBundlePath);
  if (!relayCaCert) return CS;
  await _Lm(opts?.awsConfigPath ?? HSe.join(Q1o.homedir(), ".aws", "config"));
  try {
    let wsUrl = baseUrl.replace(/^http/, "ws") + KGl + "/ws",
      readmePath = HSe.join(caBundlePath, "..", "README.md"),
      relay = await HGl({
        wsUrl: wsUrl,
        sessionId: sessionId,
        token: authTokenOverride ?? sessionToken ?? "",
        statusProvider: () => ({
          ...CS,
          readmePath: readmePath,
          gitConfigInjection: eNo(),
          gitSshRewrite: eNo() && VGl()
        })
      });
    Si(async () => relay.stop()), Z1o = relay, CS = {
      enabled: !0,
      port: relay.port,
      caBundlePath: caBundlePath,
      hasSystemCa: systemCa !== "",
      noProxy: proxyUrlOverride ? rLm : tNo,
      standalone: Boolean(proxyUrlOverride)
    }, A(`[agent-proxy] enabled on 127.0.0.1:${relay.port}`), He("agent_proxy_init");
    let statusSnapshot = CS;
    if (CDt(X1o(caBundlePath, void 0)), TN.writeFile(readmePath, lLm(relay.port, caBundlePath), "utf8").then(() => {
      if (CS !== statusSnapshot) return;
      CDt(X1o(caBundlePath, readmePath));
    }).catch(writeErr => {
      if (A(`[agent-proxy] README write failed: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`), CS !== statusSnapshot) return;
      CDt(X1o(caBundlePath, void 0));
    }), aLm().then(conflictCodes => {
      if (conflictCodes.length > 0 && CS === statusSnapshot) CS.gitConfigConflicts = conflictCodes, A(`[agent-proxy] git config may defeat proxy routing: ${conflictCodes.join(", ")}`, {
        level: "warn"
      });
    }).catch(() => {}), installIntoSystemTrust(relayCaCert, opts?.systemTrustTargets ?? hLm).catch(() => {}), opts?.toolTrust !== !1) FGl({
      ccrCa: relayCaCert,
      caBundlePath: caBundlePath,
      stateDir: HSe.join(caBundlePath, ".."),
      ...(opts?.toolTrust ?? {})
    }).then(toolTrustResult => {
      if (CS !== statusSnapshot) return;
      if (toolTrustResult.javaTrustStorePath) CS.javaTrustStorePath = toolTrustResult.javaTrustStorePath;
      if (toolTrustResult.failureCodes.length > 0) CS.toolTrustFailureCodes = toolTrustResult.failureCodes;
    }).catch(toolTrustErr => {
      A(`[agent-proxy] tool trust setup failed: ${toolTrustErr instanceof Error ? toolTrustErr.message : String(toolTrustErr)}`, {
        level: "warn"
      }), Pt("agent_proxy_tool_trust", "setup_threw");
    });
    if (tokenFileExisted) await TN.unlink(tokenPath).catch(() => {
      A("[agent-proxy] token file unlink failed", {
        level: "warn"
      });
    });
  } catch (relayErr: any) {
    A(`[agent-proxy] relay start failed: ${relayErr instanceof Error ? relayErr.message : String(relayErr)}; proxy disabled`, {
      level: "warn"
    }), xe("agent_proxy_init", "agent_proxy_init_relay_start_failed");
  }
  return CS;
}
/**
 * Builds the environment-variable overlay that points child tools at the proxy
 * and its CA bundle. When the proxy is off but an external HTTPS proxy is set,
 * passes through the relevant proxy/CA/credential vars unchanged.
 */
function getAgentProxyEnv() {
  if (!CS.enabled || !CS.port || !CS.caBundlePath) {
    if (process.env.HTTPS_PROXY && process.env.SSL_CERT_FILE) {
      let passthrough: any = {};
      for (let varName of ["HTTPS_PROXY", "https_proxy", "NO_PROXY", "no_proxy", ...fqt, "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "GH_TOKEN", "GITHUB_TOKEN", "CLOUDSDK_AUTH_ACCESS_TOKEN"]) if (process.env[varName]) passthrough[varName] = process.env[varName];
      return passthrough;
    }
    return {};
  }
  let proxyUrl = `http://127.0.0.1:${CS.port}`,
    env: any = {
      HTTPS_PROXY: proxyUrl,
      https_proxy: proxyUrl,
      NO_PROXY: CS.noProxy,
      no_proxy: CS.noProxy
    };
  for (let varName of xgo) env[varName] = CS.caBundlePath;
  if (CS.hasSystemCa) for (let varName of Dgo) env[varName] = CS.caBundlePath;
  if (CS.javaTrustStorePath) env.JAVA_TOOL_OPTIONS = NGl(CS.javaTrustStorePath, Ne.JAVA_TOOL_OPTIONS);
  if (Ne.GIT_TERMINAL_PROMPT === void 0) env.GIT_TERMINAL_PROMPT = QOt.GIT_TERMINAL_PROMPT;
  if (Ne.GIT_ASKPASS === void 0) env.GIT_ASKPASS = QOt.GIT_ASKPASS;
  if (Ne.GCM_INTERACTIVE === void 0) env.GCM_INTERACTIVE = QOt.GCM_INTERACTIVE;
  if (eNo()) {
    let gitConfigPairs: any = [["credential.interactive", "false"]];
    if (VGl()) gitConfigPairs.push(["url.https://github.com/.insteadOf", "git@github.com:"], ["url.https://github.com/.insteadOf", "ssh://git@github.com/"]);
    Object.assign(env, B8r(void 0, gitConfigPairs));
  }
  if (!(process.env.GH_TOKEN || process.env.GITHUB_TOKEN)) env.GH_TOKEN = "proxy-injected", env.GITHUB_TOKEN = "proxy-injected";
  if (!(process.env.AWS_ACCESS_KEY_ID || process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SESSION_TOKEN || process.env.AWS_PROFILE || process.env.AWS_SHARED_CREDENTIALS_FILE || process.env.AWS_CONFIG_FILE || process.env.AWS_WEB_IDENTITY_TOKEN_FILE || process.env.AWS_ROLE_ARN || process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI || process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI)) env.AWS_ACCESS_KEY_ID = "proxy-injected", env.AWS_SECRET_ACCESS_KEY = "proxy-injected";
  if (!(process.env.CLOUDSDK_AUTH_ACCESS_TOKEN || process.env.GOOGLE_APPLICATION_CREDENTIALS)) env.CLOUDSDK_AUTH_ACCESS_TOKEN = "proxy-injected";
  return env;
}
/** True when the session does not already supply its own git config overrides. */
function eNo() {
  return Ne.GIT_CONFIG_COUNT === void 0;
}
/** True when SSH-form GitHub remotes may be rewritten to HTTPS (no own SSH setup, not standalone). */
function VGl() {
  return !CS.standalone && Ne.SSH_AUTH_SOCK === void 0 && Ne.GIT_SSH_COMMAND === void 0;
}
/** Builds the short "outbound HTTPS goes through a proxy" notice injected into tool context. */
function X1o(caBundlePath: any, readmePath: any) {
  let readmeRef = readmePath ? `see ${readmePath} and ` : "";
  return `Outbound HTTPS goes through a pre-configured agent proxy (CA bundle: ${caBundlePath}). If a tool fails TLS verification or gets 403/405/407 from the proxy, ${readmeRef}run curl -sS "$HTTPS_PROXY/__agentproxy/status" for per-tool fixes and proxy state; never disable TLS verification or unset HTTPS_PROXY.`;
}
/** Scans global/system gitconfig for keys that would defeat proxy routing; returns matching conflict codes. */
async function aLm() {
  let conflictCodes = new Set(),
    results = await Promise.all(["--global", "--system"].map(scope => Fn("git", ["config", scope, "--list", "--name-only"], {
      timeout: 5000,
      preserveOutputOnError: !0,
      useCwd: !1
    })));
  for (let result of results) {
    if (result.code !== 0) continue;
    for (let [code, pattern] of iLm) if (pattern.test(result.stdout)) conflictCodes.add(code);
  }
  return [...conflictCodes];
}
/** Renders the proxy README troubleshooting guide written next to the CA bundle. */
function lLm(port: any, caBundlePath: any) {
  let stateDir = HSe.join(caBundlePath, ".."),
    proxyUrl = `http://127.0.0.1:${port}`;
  return `# Claude Code agent proxy

Outbound HTTPS from this session goes through a local proxy at ${proxyUrl}
(set via HTTPS_PROXY) which tunnels to a policy-enforcing egress proxy. TLS is
re-terminated there, so every tool must trust the CA bundle at
${caBundlePath}. The standard CA environment variables, the system trust
store (where possible), a JVM truststore, the Bazel system bazelrc, the
browser NSS store, and gsutil's boto config are already set up.

## Quick diagnosis

1. Run: curl -sS ${proxyUrl}/__agentproxy/status
   It reports proxy state, which trust and git accommodations are active
   (javaTrustStorePath, toolTrustFailureCodes, gitSshRewrite,
   gitConfigConflicts), and the most recent proxy-side failures.
2. Find the failure class below and apply the matching fix; gitConfigConflicts
   codes map to the git section, toolTrustFailureCodes to the JVM section.
3. Never disable TLS verification, never unset HTTPS_PROXY, and do not retry
   organization policy denials (403/407) — report them instead.

## Failure classes and fixes

### "certificate verify failed" / "self-signed certificate in chain" / PKIX errors

The failing tool is not reading the pre-set CA configuration. In order:

- If the tool has a CA flag or env var, point it at ${caBundlePath}
  (examples: --cacert, SSL_CERT_FILE, NODE_EXTRA_CA_CERTS, REQUESTS_CA_BUNDLE,
  AWS_CA_BUNDLE, DENO_CERT, CARGO_HTTP_CAINFO, PIP_CERT, GIT_SSL_CAINFO,
  BUNDLE_SSL_CA_CERT, HEX_CACERTS_PATH, NIX_SSL_CERT_FILE).
- Tool config files override environment variables. If one of these sets its
  own CA or disables verification, point it at the bundle instead:
  pip.conf "cert", npm "cafile" (npm config get cafile), ~/.curlrc "cacert",
  .wgetrc "ca_certificate", conda "ssl_verify", git "http.sslCAInfo",
  gradle.properties / MAVEN_OPTS "-Djavax.net.ssl.trustStore".
- JVM tools (Maven, Gradle, plain Java): when a JDK is present, a truststore
  is built at ${stateDir}/java-truststore.p12 (password "changeit") and
  injected via JAVA_TOOL_OPTIONS — confirm javaTrustStorePath is set in the
  status output before pointing a build at it (toolTrustFailureCodes explains
  why it is missing). If the image or the build sets its own trustStore, that
  one wins — import the proxy CA into it with
  keytool -importcert -noprompt -alias ccr-agent-proxy -file ${stateDir}/agent-proxy-ca.crt -keystore <their store>
  or point the build at the ready-made one. Bazel reads the managed block in
  /etc/bazel.bazelrc rather than JAVA_TOOL_OPTIONS.

### "405 Method Not Allowed" from the proxy

The tool sent a plain-HTTP (non-CONNECT) request: usually axios older than
1.16.1 (upgrade it) or a tool configured with HTTP_PROXY (unset HTTP_PROXY for
that tool — only HTTPS_PROXY is supported).

### 403 / 407 from the proxy

The destination host is not allowed by your organization's egress policy for
this session. Do not retry or route around it — report the blocked host.
Note: curl hides response bodies on failed CONNECTs; the status endpoint
records the reason.

### Tool ignores the proxy entirely (timeouts with no proxy error)

Some clients do not read HTTPS_PROXY: Node's built-in fetch (run that command
with NODE_USE_ENV_PROXY=1 on Node >= 22.21), aiohttp (pass trust_env=True),
Ruby bundler (reads only HTTP_PROXY, which this proxy does not serve),
hand-rolled Go dialers. Prefer the tool's own proxy option where one exists.

### git

SSH-form GitHub remotes (git@github.com:...) are rewritten to HTTPS
automatically unless this session has its own SSH setup or supplies its own
GIT_CONFIG_* (see gitSshRewrite in the status output). A gitconfig that sets
http.proxy / http.<url>.proxy (even empty), its own http.sslCAInfo, or an
https-to-ssh insteadOf makes git bypass the proxy or fail verification — the
status output's gitConfigConflicts codes name which of these were detected;
adjust those keys for this session if git times out.

### docker build / docker run

Processes inside containers cannot reach 127.0.0.1:${port} and do not trust
the CA. Workarounds: run builds with --network host, copy ${caBundlePath}
into the build context and install it in an early layer, and pass proxy/CA
settings explicitly to the build.

### Not supported through the proxy (report, do not work around)

gRPC / HTTP/2-only APIs, WebSocket upgrades, client-mTLS, certificate-pinned
clients (e.g. Snowflake, ngrok), non-443 HTTPS ports, raw-TCP databases.

If a tool still cannot work through the proxy, report it to your
administrator or Anthropic support so the policy or tooling can be fixed.
`;
}
/** Tears down the proxy state for test isolation: resets CS, clears tool context, stops the relay. */
function resetAgentProxyForTests() {
  CS = {
    enabled: !1,
    noProxy: tNo
  }, CDt(void 0), Z1o?.stop(), Z1o = void 0;
}
/** Reads a session token from a file, distinguishing "missing file" from a real read error. */
async function uLm(tokenPath: any) {
  try {
    return {
      existed: !0,
      token: (await TN.readFile(tokenPath, "utf8")).trim() || null
    };
  } catch (readErr: any) {
    if (In(readErr)) return {
      existed: !1,
      token: null
    };
    return A(`[agent-proxy] token read failed: ${readErr instanceof Error ? readErr.message : String(readErr)}`, {
      level: "warn"
    }), {
      existed: !1,
      token: null
    };
  }
}
function dLm() {
  return;
}
/** Returns the first readable system CA bundle from the candidate paths, or "" if none. */
async function findSystemCaBundle(candidatePaths: any = WGl) {
  for (let path of candidatePaths) try {
    return await TN.readFile(path, "utf8");
  } catch {}
  return "";
}
/**
 * Folds customer-supplied CA bundles (referenced via CA env vars) into the relay
 * bundle, skipping duplicates and the system defaults. Returns the appended PEM blocks.
 */
async function fLm(systemCa: any, caBundlePath: any) {
  let seenPaths = new Set(),
    appendedCerts = [],
    accumulated = systemCa;
  for (let varName of fqt) {
    let customerCaPath = process.env[varName]?.trim();
    if (!customerCaPath || customerCaPath === caBundlePath || seenPaths.has(customerCaPath) || WGl.includes(customerCaPath)) continue;
    seenPaths.add(customerCaPath);
    let fileContents;
    try {
      let stats = await TN.stat(customerCaPath);
      if (!stats.isFile() || stats.size > pLm) continue;
      fileContents = await TN.readFile(customerCaPath, "utf8");
    } catch (statErr: any) {
      if (!In(statErr)) A(`[agent-proxy] could not read customer CA bundle from ${varName}: ${statErr instanceof Error ? statErr.message : String(statErr)}`, {
        level: "warn"
      });
      continue;
    }
    let certMatches = fileContents.match(mLm);
    if (!certMatches) continue;
    let foldedCount = 0;
    for (let cert of certMatches) {
      if (accumulated.includes(cert)) continue;
      appendedCerts.push(cert), accumulated += `
${cert}`, foldedCount++;
    }
    if (foldedCount > 0) A(`[agent-proxy] folded ${foldedCount} customer CA cert(s) from ${varName} into the relay bundle`);
  }
  return appendedCerts.join(`
`);
}
/** Writes the CA cert into each OS trust-store directory and runs its refresh command. */
async function installIntoSystemTrust(caCert: any, targets: any) {
  for (let {
    dir: dir,
    name: name,
    refresh: refresh
  } of targets) try {
    await TN.writeFile(HSe.join(dir, name), caCert, "utf8");
    let exitCode = await new Promise(resolve => {
      $Gl.execFile(refresh[0], refresh.slice(1), {
        timeout: 1e4,
        cwd: "/"
      }, (execErr: any) => resolve(execErr ? In(execErr) ? 127 : 1 : 0));
    });
    if (exitCode === 0) {
      A(`[agent-proxy] CA installed to system trust via ${refresh[0]}`), He("agent_proxy_system_trust");
      return;
    }
    A(`[agent-proxy] ${refresh[0]} exited ${exitCode}; falling back to env-var trust`, {
      level: "warn"
    });
  } catch (installErr: any) {
    if (In(installErr)) continue;
    A(`[agent-proxy] system trust install via ${dir} failed: ${installErr instanceof Error ? installErr.message : String(installErr)}`, {
      level: "warn"
    });
  }
  if (targets.length > 0) Pt("agent_proxy_system_trust", "unavailable");
}
/** Fetches the relay's CA cert (with retries on 5xx), writes the combined bundle, and returns the cert. */
async function gLm(baseUrl: any, bundlePrefix: any, caBundlePath: any) {
  let timeoutSignal = AbortSignal.timeout(5000),
    lastError = "";
  for (let attempt = 0; attempt < 3; attempt++) try {
    let response = await fetch(`${baseUrl}${KGl}/ca-cert`, {
      signal: timeoutSignal
    });
    if (response.status >= 500) {
      lastError = `status ${response.status}`;
      continue;
    }
    if (!response.ok) {
      A(`[agent-proxy] ca-cert fetch ${response.status}; proxy disabled`, {
        level: "warn"
      }), xe("agent_proxy_init", "agent_proxy_init_ca_http_error");
      return;
    }
    let caCert = await response.text();
    return await TN.mkdir(HSe.join(caBundlePath, ".."), {
      recursive: !0
    }), await TN.writeFile(caBundlePath, bundlePrefix + `
` + caCert, "utf8"), caCert;
  } catch (fetchErr: any) {
    lastError = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
  }
  A(`[agent-proxy] ca-cert fetch exhausted (${lastError}); proxy disabled`, {
    level: "warn"
  }), xe("agent_proxy_init", "agent_proxy_init_ca_exhausted");
  return;
}
/** Creates a minimal ~/.aws/config disabling S3 payload signing (write-exclusive; ignores EEXIST). */
async function _Lm(awsConfigPath: any) {
  try {
    await TN.mkdir(HSe.join(awsConfigPath, ".."), {
      recursive: !0,
      mode: 448
    }), await TN.writeFile(awsConfigPath, `[default]
s3 =
  payload_signing_enabled = false
`, {
      flag: "wx",
      mode: 384
    });
  } catch (writeErr: any) {
    if (cn(writeErr) === "EEXIST") return;
    A(`[agent-proxy] aws config write failed: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`, {
      level: "warn"
    });
  }
}
var $Gl,
  TN,
  Q1o,
  HSe,
  SESSION_TOKEN_PATH = "/run/ccr/session_token",
  WGl,
  GGl,
  tNo,
  rLm,
  CS,
  Z1o,
  iLm,
  KGl = "/v1/code/agent-proxy",
  pLm = 1048576,
  mLm,
  hLm;
var JGl = b(() => {
  mn();
  ud();
  qe();
  Ir();
  dn();
  Ct();
  Ii();
  Z2e();
  sO();
  Pgo();
  OGl();
  UGl();
  $Gl = require("child_process"), TN = require("fs/promises"), Q1o = require("os"), HSe = require("path"), WGl = ["/etc/ssl/certs/ca-certificates.crt", "/etc/pki/tls/certs/ca-bundle.crt", "/etc/ssl/cert.pem"], GGl = ["localhost", "127.0.0.1", "::1", "127.0.0.0/8", "0.0.0.0/8", "::", "169.254.0.0/16", "anthropic.com", ".anthropic.com", "*.anthropic.com", "registry.npmjs.org", "jsr.io", "npm.jsr.io", "pypi.org", "files.pythonhosted.org", "index.crates.io", "proxy.golang.org", "host.docker.internal"], tNo = [...GGl, "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "100.64.0.0/10", ".svc.cluster.local", "*.svc.cluster.local"].join(","), rLm = GGl.join(","), CS = {
    enabled: !1,
    noProxy: tNo
  };
  iLm = [["git_http_proxy_configured", /^http\.(.+\.)?proxy$/m], ["git_ssl_cainfo_configured", /^http\.(.+\.)?sslcainfo$/m], ["git_https_to_ssh_insteadof_configured", /^url\.(git@|ssh:\/\/).*\.insteadof$/m]];
  mLm = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
  hLm = [{
    dir: "/usr/local/share/ca-certificates",
    name: "ccr-agent-proxy.crt",
    refresh: ["update-ca-certificates"]
  }, {
    dir: "/etc/pki/ca-trust/source/anchors",
    name: "ccr-agent-proxy.crt",
    refresh: ["update-ca-trust", "extract"]
  }];
});

export {YGl,initAgentProxy,getAgentProxyEnv,eNo,VGl,X1o,aLm,lLm,resetAgentProxyForTests,uLm,dLm,findSystemCaBundle,fLm,installIntoSystemTrust,gLm,_Lm,$Gl,TN,Q1o,HSe,SESSION_TOKEN_PATH,WGl,GGl,tNo,rLm,CS as getFastModeStatus,Z1o,iLm,KGl,pLm,mLm,hLm,JGl};
