// @ts-nocheck
import {isFullscreenWithTTY as pt,M as L,b} from "../../runtime.ts";
import {Khr as shr,j2 as D2,hKe as X7e,Yhr as ahr,zhr as ihr,S7 as l7} from "./0746_bytes.ts";
import {S8 as r8,AKe as J7e} from "./0745_level.ts";
import {st as rt,_l as hl} from "../../vendor/m5.ts";
import {getIsNonInteractiveSession as kr,lt as ct} from "../session/0131_sent.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {wR as vR,vB as hB} from "../../vendor/m682.ts";
import {fo as ho} from "../../vendor/m566.ts";
import {e4 as F3} from "../../vendor/m750.ts";
import {H1e as c1e,tbs as VTs} from "../../vendor/m1019.ts";
import {Gp as cm} from "../../vendor/m567.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {sn as an} from "./0047_namespace.ts";
import {qEt as hEt} from "../../vendor/m743.ts";
// @ts-nocheck
var proxyModuleNamespace = {};
pt(proxyModuleNamespace, {
  shouldBypassProxyWithCidr: () => shouldBypassProxyWithCidr,
  shouldBypassProxy: () => shouldBypassProxy,
  prefetchProxyAuthFromHelperIfSafe: () => prefetchProxyAuthFromHelperIfSafe,
  getWebSocketProxyUrl: () => getWebSocketProxyUrl,
  getProxyUrl: () => getProxyUrl,
  getProxyFetchOptions: () => getProxyFetchOptions,
  getProxyAuthFromHelperCached: () => getProxyAuthFromHelperCached,
  getProxyAuthFromHelper: () => getProxyAuthFromHelper,
  getProxyAgent: () => getProxyAgent,
  getNoProxy: () => getNoProxy,
  getConfiguredProxyAuthHelper: () => getConfiguredProxyAuthHelper,
  getAddressFamily: () => getAddressFamily,
  getAWSClientProxyConfig: () => getAWSClientProxyConfig,
  disableKeepAlive: () => disableKeepAlive,
  configureGlobalAgents: () => configureGlobalAgents,
  clearProxyCache: () => clearProxyCache,
  clearProxyAuthHelperCache: () => clearProxyAuthHelperCache,
  _setProxyAuthHelperConfig: () => _setProxyAuthHelperConfig,
  _resetProxyAuthHelperForTesting: () => _resetProxyAuthHelperForTesting,
  _resetKeepAliveForTesting: () => _resetKeepAliveForTesting
});
function disableKeepAlive() {
  keepAliveDisabled = true;
}
function _resetKeepAliveForTesting() {
  keepAliveDisabled = false;
}
function getAddressFamily(addressInfo) {
  switch (addressInfo.family) {
    case 0:
    case 4:
    case 6:
      return addressInfo.family;
    case "IPv6":
      return 6;
    case "IPv4":
    case undefined:
      return 4;
    default:
      throw Error(`Unsupported address family: ${addressInfo.family}`);
  }
}
function getProxyUrl(env = process.env) {
  return env.https_proxy || env.HTTPS_PROXY || env.http_proxy || env.HTTP_PROXY;
}
function getNoProxy(env = process.env) {
  return env.no_proxy || env.NO_PROXY;
}
function shouldBypassProxy(url, noProxyList = getNoProxy()) {
  if (!noProxyList) return false;
  if (noProxyList === "*") return true;
  try {
    let parsedUrl = new URL(url),
      hostname = parsedUrl.hostname.toLowerCase(),
      port = parsedUrl.port || (parsedUrl.protocol === "https:" ? "443" : "80"),
      hostWithPort = `${hostname}:${port}`;
    return noProxyList.split(/[,\s]+/).filter(Boolean).some(pattern => {
      if (pattern = pattern.toLowerCase().trim(), pattern.includes(":")) return hostWithPort === pattern;
      if (pattern.startsWith(".")) {
        let suffix = pattern;
        return hostname === pattern.substring(1) || hostname.endsWith(suffix);
      }
      return hostname === pattern;
    });
  } catch {
    return false;
  }
}
function shouldBypassProxyWithCidr(url, noProxyList) {
  if (shouldBypassProxy(url, noProxyList)) return true;
  if (!noProxyList) return false;
  let hostname;
  try {
    hostname = new URL(url).hostname.replace(/^\[|\]$/g, "");
  } catch {
    return false;
  }
  if (fA8.isIP(hostname) === 0) return false;
  return noProxyList.split(/[,\s]+/).filter(Boolean).some(entry => {
    if (entry.includes("/")) return shr(hostname, entry);
    let ipVersion = fA8.isIP(entry);
    if (ipVersion === 0) return false;
    return shr(hostname, `${entry}/${ipVersion === 4 ? 32 : 128}`);
  });
}
function createHttpsProxyAgent(proxyUrl) {
  let tlsCert = D2(),
    customCa = r8(),
    agentOptions = {
      ...(tlsCert && {
        cert: tlsCert.cert,
        key: tlsCert.key,
        passphrase: tlsCert.passphrase
      }),
      ...(customCa && {
        ca: customCa
      })
    };
  if (rt(process.env.CLAUDE_CODE_PROXY_RESOLVES_HOSTS)) agentOptions.lookup = (host, lookupOptions, callback) => {
    callback(null, host, getAddressFamily(lookupOptions));
  };
  return new C$9.HttpsProxyAgent(proxyUrl, agentOptions);
}
function getWebSocketProxyUrl(url) {
  let proxyUrl = getProxyUrl();
  if (!proxyUrl) return;
  if (shouldBypassProxy(url)) return;
  return proxyUrl;
}
function _setProxyAuthHelperConfig(config) {
  proxyAuthHelperConfig = config;
}
function getConfiguredProxyAuthHelper() {
  if (!rt(process.env.CLAUDE_CODE_ENABLE_PROXY_AUTH_HELPER)) return;
  return proxyAuthHelperConfig.helper;
}
function isHelperFromProjectOrLocal() {
  return getConfiguredProxyAuthHelper() !== undefined && proxyAuthHelperConfig.fromProjectOrLocal;
}
function getProxyAuthHelperTtlMs() {
  let envValue = process.env.CLAUDE_CODE_PROXY_AUTH_HELPER_TTL_MS;
  if (envValue) {
    let parsed = parseInt(envValue, 10);
    if (!Number.isNaN(parsed) && parsed >= 0) return parsed;
  }
  return DEFAULT_PROXY_AUTH_HELPER_TTL_MS;
}
async function getProxyAuthFromHelper() {
  let helper = getConfiguredProxyAuthHelper();
  if (!helper) return null;
  if (isHelperFromProjectOrLocal() && !kr() && !proxyAuthHelperConfig.trustAccepted()) return v("proxyAuthHelper configured in project/local settings but workspace trust not yet accepted \u2014 skipping", {
    level: "warn"
  }), null;
  let forceRefresh = proxyAuthForceRefresh;
  if (!forceRefresh && proxyAuthCache && Date.now() - proxyAuthCache.timestamp < getProxyAuthHelperTtlMs()) return proxyAuthCache.value;
  proxyAuthForceRefresh = undefined;
  let proxyUrl = getProxyUrl(),
    proxyHostname;
  try {
    proxyHostname = proxyUrl ? new URL(proxyUrl).hostname : undefined;
  } catch {
    proxyHostname = undefined;
  }
  let result = await vR(helper, {
    timeout: 30000,
    reject: false,
    env: {
      ...process.env,
      ...(proxyUrl && {
        CLAUDE_CODE_PROXY_URL: proxyUrl
      }),
      ...(proxyHostname && {
        CLAUDE_CODE_PROXY_HOST: proxyHostname
      }),
      ...(forceRefresh && {
        CLAUDE_CODE_PROXY_AUTHENTICATE: forceRefresh
      })
    }
  });
  if (result.failed || !result.stdout?.trim()) {
    let failureReason = result.timedOut ? "timed out" : result.failed ? `exited ${result.exitCode}` : "did not return a value",
      stderrText = result.stderr?.trim();
    return console.error(`proxyAuthHelper failed: ${stderrText ? `${failureReason}: ${stderrText}` : failureReason}`), proxyAuthCache?.value ?? null;
  }
  let authValue = result.stdout.trim();
  return proxyAuthCache = {
    value: authValue,
    timestamp: Date.now()
  }, authValue;
}
function getProxyAuthFromHelperCached() {
  return proxyAuthCache?.value ?? null;
}
function clearProxyAuthHelperCache(forceRefreshSignal) {
  proxyAuthCache = null, proxyAuthForceRefresh = forceRefreshSignal;
}
function prefetchProxyAuthFromHelperIfSafe() {
  if (!getConfiguredProxyAuthHelper()) return;
  if (isHelperFromProjectOrLocal() && !proxyAuthHelperConfig.trustAccepted()) return;
  getProxyAuthFromHelper();
}
function _resetProxyAuthHelperForTesting() {
  proxyAuthCache = null, proxyAuthForceRefresh = undefined, proxyAuthHelperConfig = {
    helper: undefined,
    fromProjectOrLocal: false,
    trustAccepted: () => false
  };
}
function getProxyFetchOptions(fetchInput) {
  let apiForceIdleTimeout = process.env.API_FORCE_IDLE_TIMEOUT,
    needsTimeoutOverride = fetchInput.forAnthropicAPI && !rt(apiForceIdleTimeout) && (fetchInput.hasBodyIdleWatchdog || hl(apiForceIdleTimeout)),
    baseOptions = {
      ...(keepAliveDisabled && {
        keepalive: false
      }),
      ...(needsTimeoutOverride && {
        timeout: false
      })
    };
  if (fetchInput.forAnthropicAPI) {
    let unixSocket = process.env.ANTHROPIC_UNIX_SOCKET;
    if (unixSocket) return {
      ...baseOptions,
      unix: unixSocket
    };
  }
  let proxyUrl = getProxyUrl();
  if (proxyUrl) {
    if (fetchInput.url && shouldBypassProxy(fetchInput.url)) return {
      ...baseOptions,
      ...X7e()
    };
    let cachedAuth = getProxyAuthFromHelperCached();
    return {
      ...baseOptions,
      proxy: cachedAuth ? {
        url: proxyUrl,
        headers: {
          "Proxy-Authorization": cachedAuth
        }
      } : proxyUrl,
      ...X7e()
    };
  }
  if (fetchInput.fallbackProxy) {
    if (fetchInput.url && (shouldBypassProxyWithCidr(fetchInput.url, fetchInput.fallbackProxy.noProxy) || shouldBypassProxyWithCidr(fetchInput.url, getNoProxy()))) return {
      ...baseOptions,
      ...X7e()
    };
    let tlsOptions = X7e();
    return {
      ...baseOptions,
      proxy: fetchInput.fallbackProxy.url,
      ...(fetchInput.fallbackProxy.ca ? {
        tls: {
          ...tlsOptions.tls,
          ca: fetchInput.fallbackProxy.ca
        }
      } : tlsOptions)
    };
  }
  return {
    ...baseOptions,
    ...X7e()
  };
}
function configureGlobalAgents() {
  let proxyUrl = getProxyUrl(),
    customHttpsAgent = ahr();
  if (axiosInterceptorId !== undefined) ho.interceptors.request.eject(axiosInterceptorId), axiosInterceptorId = undefined;
  if (ho.defaults.proxy = undefined, ho.defaults.httpAgent = undefined, ho.defaults.httpsAgent = undefined, proxyUrl) {
    ho.defaults.proxy = false;
    let proxyAgent = createHttpsProxyAgent(proxyUrl);
    axiosInterceptorId = ho.interceptors.request.use(config => {
      if (config.url && shouldBypassProxy(config.url)) {
        if (customHttpsAgent) config.httpsAgent = customHttpsAgent, config.httpAgent = undefined;else delete config.httpsAgent, delete config.httpAgent;
      } else config.httpsAgent = proxyAgent, config.httpAgent = proxyAgent;
      return config;
    }), require("undici").setGlobalDispatcher(getProxyAgent(proxyUrl));
  } else if (customHttpsAgent) ho.defaults.httpsAgent = customHttpsAgent;
}
async function getAWSClientProxyConfig(awsInput) {
  let proxyUrl = getProxyUrl();
  if (!proxyUrl || awsInput.url && shouldBypassProxy(awsInput.url)) return {};
  let [{
      NodeHttpHandler: NodeHttpHandlerClass
    }, {
      defaultProvider: credentialsDefaultProvider
    }] = await Promise.all([Promise.resolve().then(() => L(F3(), 1)), Promise.resolve().then(() => (c1e(), VTs))]),
    proxyAgent = createHttpsProxyAgent(proxyUrl),
    requestHandler = new NodeHttpHandlerClass({
      httpAgent: proxyAgent,
      httpsAgent: proxyAgent
    });
  return {
    requestHandler: requestHandler,
    credentials: credentialsDefaultProvider({
      clientConfig: {
        requestHandler: requestHandler
      }
    })
  };
}
function clearProxyCache() {
  getProxyAgent.cache.clear?.(), v("Cleared proxy agent cache");
}
var C$9,
  fA8,
  keepAliveDisabled = false,
  getProxyAgent,
  DEFAULT_PROXY_AUTH_HELPER_TTL_MS = 300000,
  proxyAuthHelperConfig,
  proxyAuthCache = null,
  proxyAuthForceRefresh,
  axiosInterceptorId;
var Af = b(() => {
  cm();
  na();
  ct();
  J7e();
  ihr();
  je();
  an();
  l7();
  hB();
  C$9 = L(hEt(), 1), fA8 = require("net");
  getProxyAgent = bn(proxyUrl => {
    let undici = require("undici"),
      tlsCert = D2(),
      customCa = r8(),
      agentOptions = {
        httpProxy: proxyUrl,
        httpsProxy: proxyUrl,
        noProxy: process.env.NO_PROXY || process.env.no_proxy
      };
    if (tlsCert || customCa) {
      let tlsConfig = {
        ...(tlsCert && {
          cert: tlsCert.cert,
          key: tlsCert.key,
          passphrase: tlsCert.passphrase
        }),
        ...(customCa && {
          ca: customCa
        })
      };
      agentOptions.connect = tlsConfig, agentOptions.requestTls = tlsConfig;
    }
    return new undici.EnvHttpProxyAgent(agentOptions);
  });
  proxyAuthHelperConfig = {
    helper: undefined,
    fromProjectOrLocal: false,
    trustAccepted: () => false
  };
});

export {proxyModuleNamespace as D1e,disableKeepAlive,_resetKeepAliveForTesting,getAddressFamily,getProxyUrl,getNoProxy,shouldBypassProxy as O7,shouldBypassProxyWithCidr,createHttpsProxyAgent as obs,getWebSocketProxyUrl,_setProxyAuthHelperConfig,getConfiguredProxyAuthHelper,isHelperFromProjectOrLocal as sbs,getProxyAuthHelperTtlMs as Rhu,getProxyAuthFromHelper,getProxyAuthFromHelperCached,clearProxyAuthHelperCache,prefetchProxyAuthFromHelperIfSafe,_resetProxyAuthHelperForTesting,getProxyFetchOptions,configureGlobalAgents,getAWSClientProxyConfig,clearProxyCache,C$9 as nbs,fA8 as OSr,keepAliveDisabled as MSr,getProxyAgent,DEFAULT_PROXY_AUTH_HELPER_TTL_MS as whu,proxyAuthHelperConfig as cze,proxyAuthCache as bEe,proxyAuthForceRefresh as Jsn,axiosInterceptorId as Ysn,Af as Z_};
