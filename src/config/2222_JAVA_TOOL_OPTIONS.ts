// @ts-nocheck
import {b as L} from "../../runtime.ts";
/**
 * Builds proxy-related environment variable overrides for various tools
 * (yarn, npm, global-agent, Docker, Cloud SDK, Java, etc.) based on the
 * HTTP_PROXY / HTTPS_PROXY values found in the supplied environment object.
 *
 * The module is initialised lazily via the `OP7` thunk (cross-module init
 * pattern); `X73` is the regex used to reject unsafe proxy credential chars.
 */

/** Parsed representation of a proxy URL. */
interface ParsedProxy {
  host: string;
  port: string;
  user: string;
  pass: string;
}

/**
 * Derives a map of proxy-related env-var overrides from `env`.
 * Only sets a key when the caller's env does not already define it.
 */
function KP7(env: Record<string, string | undefined>): Record<string, string | undefined> {
  let httpProxy = env.HTTP_PROXY || env.http_proxy || env.CLAUDE_CODE_HTTP_PROXY,
    httpsProxy = env.HTTPS_PROXY || env.https_proxy || env.CLAUDE_CODE_HTTPS_PROXY,
    noProxy = env.NO_PROXY || env.no_proxy;
  if (!httpProxy && !httpsProxy) return {};
  let parsedHttp = qP7(httpProxy),
    parsedHttps = qP7(httpsProxy);
  if (!parsedHttps.host) parsedHttps = parsedHttp;
  let overrides: Record<string, string | undefined> = {},
    setIfAbsent = (key: string, value: string | undefined) => {
      if (value && env[key] === void 0) overrides[key] = value;
    };
  if (
    setIfAbsent("YARN_HTTP_PROXY", httpProxy),
    setIfAbsent("YARN_HTTPS_PROXY", httpsProxy),
    setIfAbsent("npm_config_proxy", httpProxy),
    setIfAbsent("npm_config_https_proxy", httpsProxy),
    setIfAbsent("npm_config_noproxy", noProxy),
    setIfAbsent("GLOBAL_AGENT_HTTP_PROXY", httpProxy),
    setIfAbsent("GLOBAL_AGENT_HTTPS_PROXY", httpsProxy),
    setIfAbsent("GLOBAL_AGENT_NO_PROXY", noProxy),
    setIfAbsent("ELECTRON_GET_USE_PROXY", "1"),
    setIfAbsent("DOCKER_HTTP_PROXY", httpProxy),
    setIfAbsent("DOCKER_HTTPS_PROXY", httpsProxy),
    parsedHttps.host
  )
    setIfAbsent("CLOUDSDK_PROXY_TYPE", "http"),
    setIfAbsent("CLOUDSDK_PROXY_ADDRESS", parsedHttps.host),
    setIfAbsent("CLOUDSDK_PROXY_PORT", parsedHttps.port),
    setIfAbsent("CLOUDSDK_PROXY_USERNAME", parsedHttps.user),
    setIfAbsent("CLOUDSDK_PROXY_PASSWORD", parsedHttps.pass);
  if (setIfAbsent("FSSPEC_GCS", '{"session_kwargs": {"trust_env": true}}'), parsedHttps.host) {
    let existingJavaOpts = env.JAVA_TOOL_OPTIONS;
    if (!existingJavaOpts?.includes("-Dhttps.proxyHost=")) {
      let javaProxyFlags = P73(parsedHttp, parsedHttps, noProxy);
      overrides.JAVA_TOOL_OPTIONS = existingJavaOpts ? `${existingJavaOpts} ${javaProxyFlags}` : javaProxyFlags;
    }
  }
  return overrides;
}

/**
 * Parses a proxy URL string into its component parts.
 * Returns an empty-string struct on failure or missing input.
 */
function qP7(proxyUrl: string | undefined): ParsedProxy {
  if (!proxyUrl) return {
    host: "",
    port: "",
    user: "",
    pass: ""
  };
  try {
    let parsed = new URL(proxyUrl);
    if (!parsed.hostname) return {
      host: "",
      port: "",
      user: "",
      pass: ""
    };
    return {
      host: parsed.hostname.startsWith("[") && parsed.hostname.endsWith("]") ? parsed.hostname.slice(1, -1) : parsed.hostname,
      port: parsed.port || (parsed.protocol === "https:" ? "443" : "80"),
      user: decodeURIComponent(parsed.username),
      pass: decodeURIComponent(parsed.password)
    };
  } catch {
    return {
      host: "",
      port: "",
      user: "",
      pass: ""
    };
  }
}

/**
 * Builds the `-D…` JVM proxy flag string for JAVA_TOOL_OPTIONS.
 * Skips any value that contains whitespace or quote characters.
 */
function P73(httpProxy: ParsedProxy, httpsProxy: ParsedProxy, noProxy: string | undefined): string {
  let flags: string[] = [],
    addFlag = (key: string, value: string | undefined) => {
      if (value && !X73.test(value)) flags.push(`-D${key}=${value}`);
    };
  if (
    addFlag("http.proxyHost", httpProxy.host),
    addFlag("http.proxyPort", httpProxy.port),
    addFlag("https.proxyHost", httpsProxy.host),
    addFlag("https.proxyPort", httpsProxy.port),
    addFlag("http.proxyUser", httpProxy.user),
    addFlag("http.proxyPassword", httpProxy.pass),
    addFlag("https.proxyUser", httpsProxy.user),
    addFlag("https.proxyPassword", httpsProxy.pass),
    noProxy
  ) addFlag("http.nonProxyHosts", W73(noProxy));
  return flags.push("-Djdk.http.auth.tunneling.disabledSchemes="), flags.push("-Djdk.http.auth.proxying.disabledSchemes="), flags.join(" ");
}

/**
 * Converts a comma-separated NO_PROXY list into the Java pipe-separated
 * nonProxyHosts format, prepending `*` to domain-suffix entries.
 */
function W73(noProxy: string): string {
  return noProxy.split(",").map(entry => entry.trim()).filter(Boolean).map(entry => entry.startsWith(".") ? `*${entry}` : entry).join("|");
}

/** Regex matching characters that are unsafe in JVM `-D` flag values. */
var X73: RegExp;

/** Lazy initialiser — populates `X73` before first use. */
var OP7 = L(() => {
  X73 = /[ \t\n\v\f\r'"]/;
});

export {KP7 as BAi,qP7 as NAi,P73 as GXu,W73 as VXu,X73 as WXu,OP7 as FAi};
