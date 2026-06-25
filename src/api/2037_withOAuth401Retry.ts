// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getClientPlatform as ik,Fg} from "../../vendor/m5.ts";
import {wmn,eFe} from "../../vendor/m1459.ts";
import {getAnthropicApiKey as Gv,shouldUseWIFAuth as dE,isUsing3PServices as F7,isClaudeAISubscriber as Eo,getClaudeAIOAuthTokens as qs,handleOAuth401Error as cF,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {PXe,j8s} from "./1489_withCredentialsLock.ts";
import {OAUTH_BETA_HEADER as eI,Sc} from "./0465_getOauthConfig.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {getAPIProvider as Rr,Ps} from "./1287_usesFirstPartyModelIds.ts";
import {ho} from "../../vendor/m572.ts";
import {ap} from "../../vendor/m573.ts";
// @ts-nocheck
var Y8s = {};
ft(Y8s, {
  withOAuth401Retry: () => withOAuth401Retry,
  getWebFetchUserAgent: () => getWebFetchUserAgent,
  getUserAgent: () => getUserAgent,
  getMCPUserAgent: () => getMCPUserAgent,
  getClientPlatform: () => ik,
  getAuthHeadersAsync: () => getAuthHeadersAsync,
  getAuthHeaders: () => getAuthHeaders
});

/** Build the `claude-cli/<version>` User-Agent string for first-party API calls. */
function getUserAgent() {
  let agentSdkSuffix = process.env.CLAUDE_AGENT_SDK_VERSION ? `, agent-sdk/${process.env.CLAUDE_AGENT_SDK_VERSION}` : "",
    clientAppSuffix = process.env.CLAUDE_AGENT_SDK_CLIENT_APP ? `, client-app/${process.env.CLAUDE_AGENT_SDK_CLIENT_APP}` : "",
    workload = wmn(),
    workloadSuffix = workload ? `, workload/${workload}` : "";
  return `claude-cli/${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION} (external, ${process.env.CLAUDE_CODE_ENTRYPOINT ?? "cli"}${agentSdkSuffix}${clientAppSuffix}${workloadSuffix})`;
}

/** Build the `claude-code/<version>` User-Agent string used for MCP connections. */
function getMCPUserAgent() {
  let parts: string[] = [];
  if (process.env.CLAUDE_CODE_ENTRYPOINT) parts.push(process.env.CLAUDE_CODE_ENTRYPOINT);
  if (process.env.CLAUDE_AGENT_SDK_VERSION) parts.push(`agent-sdk/${process.env.CLAUDE_AGENT_SDK_VERSION}`);
  if (process.env.CLAUDE_AGENT_SDK_CLIENT_APP) parts.push(`client-app/${process.env.CLAUDE_AGENT_SDK_CLIENT_APP}`);
  let detailSuffix = parts.length > 0 ? ` (${parts.join(", ")})` : "";
  return `claude-code/${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION}${detailSuffix}`;
}

/** User-Agent string used by the WebFetch tool. */
function getWebFetchUserAgent() {
  return `Claude-User (${Fg()}; +https://support.anthropic.com/)`;
}

/** Resolve auth headers, preferring Workload Identity Federation credentials when applicable. */
async function getAuthHeadersAsync() {
  if (!Gv() && dE()) try {
    let {
        getWIFCredentials: getWIFCredentials,
        getWIFTokenCache: getWIFTokenCache
      } = await Promise.resolve().then(() => (PXe(), j8s)),
      [wifCredentials, wifExtra] = await Promise.all([getWIFTokenCache(), getWIFCredentials()]);
    if (wifCredentials !== null) return {
      headers: {
        ...wifExtra?.extraHeaders,
        Authorization: `Bearer ${await wifCredentials.getToken()}`,
        "anthropic-beta": eI
      }
    };
  } catch (err) {
    return A(`WIF auth header resolution failed: ${err instanceof Error ? err.message : String(err)}`, {
      level: "error"
    }), {
      headers: {},
      error: err instanceof Error ? err.message : String(err),
      reasonCode: "wif_error"
    };
  }
  return getAuthHeaders();
}

/** Resolve synchronous auth headers for the configured auth mode (OAuth, API key, gateway, 3P). */
function getAuthHeaders() {
  if (F7()) return {
    headers: {},
    error: "Anthropic auth not used on third-party providers",
    reasonCode: "third_party"
  };
  if (Eo()) {
    let oauthTokens = qs();
    if (!oauthTokens?.accessToken) return {
      headers: {},
      error: "No OAuth token available",
      reasonCode: "no_oauth_token"
    };
    return {
      headers: {
        Authorization: `Bearer ${oauthTokens.accessToken}`,
        "anthropic-beta": eI
      }
    };
  }
  if (Rr() === "gateway") return {
    headers: {},
    error: "Not available when using a Cloud gateway",
    reasonCode: "gateway"
  };
  let apiKey = Gv();
  if (!apiKey) return {
    headers: {},
    error: "No API key available",
    reasonCode: "no_api_key"
  };
  return {
    headers: {
      "x-api-key": apiKey
    }
  };
}

/** Run `fn`; on a 401 (or revoked-token 403 when `opts.also403Revoked`), refresh the OAuth token and retry once. */
async function withOAuth401Retry(fn, opts) {
  try {
    return await fn();
  } catch (err) {
    if (!ho.isAxiosError(err)) throw err;
    let status = err.response?.status;
    if (!(status === 401 || opts?.also403Revoked && status === 403 && typeof err.response?.data === "string" && err.response.data.includes("OAuth token has been revoked"))) throw err;
    let accessToken = qs()?.accessToken;
    if (!accessToken) throw err;
    return await cF(accessToken), await fn();
  }
}

var kk = b(() => {
  ap();
  Sc();
  lo();
  qe();
  Ps();
  eFe();
});

export {Y8s,getUserAgent,getMCPUserAgent,getWebFetchUserAgent,getAuthHeadersAsync,getAuthHeaders,withOAuth401Retry,kk};
