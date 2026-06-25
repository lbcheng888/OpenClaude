// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {dn as w6} from "../config/0137_namespace.ts";
// @ts-nocheck
function intersperse(arr, separatorFn) {
  return arr.flatMap((item, idx) => idx ? [separatorFn(idx), item] : [item]);
}
function countMatching(arr, predicate) {
  let count = 0;
  for (let el of arr) count += +!!predicate(el);
  return count;
}
function deduplicate(arr) {
  return [...new Set(arr)];
}
var oauthConfigExports = {};
j_(oauthConfigExports, {
  getOauthConfig: () => getOauthConfig,
  fileSuffixForOauthConfig: () => fileSuffixForOauthConfig,
  OAUTH_BETA_HEADER: () => OAUTH_BETA_HEADER,
  MCP_CLIENT_METADATA_URL: () => MCP_CLIENT_METADATA_URL,
  LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS: () => LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS,
  DESIGN_OAUTH_SCOPES: () => DESIGN_OAUTH_SCOPES,
  CONSOLE_OAUTH_SCOPES: () => CONSOLE_OAUTH_SCOPES,
  CLAUDE_AI_PROFILE_SCOPE: () => CLAUDE_AI_PROFILE_SCOPE,
  CLAUDE_AI_OAUTH_SCOPES: () => CLAUDE_AI_OAUTH_SCOPES,
  CLAUDE_AI_INFERENCE_SCOPE: () => CLAUDE_AI_INFERENCE_SCOPE,
  ALL_OAUTH_SCOPES: () => ALL_OAUTH_SCOPES,
  ALLOWED_OAUTH_BASE_URLS: () => ALLOWED_OAUTH_BASE_URLS
});
function getDeployEnv() {
  return "prod";
}
function fileSuffixForOauthConfig() {
  if (process.env.CLAUDE_CODE_CUSTOM_OAUTH_URL) return "-custom-oauth";
  switch (getDeployEnv()) {
    case "local":
      return "-local-oauth";
    case "staging":
      return "-staging-oauth";
    case "prod":
      return "";
  }
}
function getLocalOAuthConfig() {
  let baseApiUrl = process.env.CLAUDE_LOCAL_OAUTH_API_BASE?.replace(/\/$/, "") ?? "http://localhost:8000",
    appsBase = process.env.CLAUDE_LOCAL_OAUTH_APPS_BASE?.replace(/\/$/, "") ?? "http://localhost:4000",
    consoleBase = process.env.CLAUDE_LOCAL_OAUTH_CONSOLE_BASE?.replace(/\/$/, "") ?? "http://localhost:3000";
  return {
    BASE_API_URL: baseApiUrl,
    CONSOLE_AUTHORIZE_URL: `${consoleBase}/oauth/authorize`,
    CLAUDE_AI_AUTHORIZE_URL: `${appsBase}/oauth/authorize`,
    CLAUDE_AI_ORIGIN: appsBase,
    TOKEN_URL: `${baseApiUrl}/v1/oauth/token`,
    API_KEY_URL: `${baseApiUrl}/api/oauth/claude_cli/create_api_key`,
    ROLES_URL: `${baseApiUrl}/api/oauth/claude_cli/roles`,
    CONSOLE_SUCCESS_URL: `${consoleBase}/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code`,
    CLAUDEAI_SUCCESS_URL: `${consoleBase}/oauth/code/success?app=claude-code`,
    MANUAL_REDIRECT_URL: `${consoleBase}/oauth/code/callback`,
    CLIENT_ID: "22422756-60c9-4084-8eb7-27705fd5cf9a",
    DESIGN_CLIENT_ID: "00000000-0000-4000-8000-000000000000",
    OAUTH_FILE_SUFFIX: "-local-oauth",
    MCP_PROXY_URL: "http://localhost:8205",
    MCP_PROXY_PATH: "/v1/toolbox/shttp/mcp/{server_id}"
  };
}
function getOauthConfig() {
  let baseConfig = (() => {
      switch (getDeployEnv()) {
        case "local":
          return getLocalOAuthConfig();
        case "staging":
          return stagingOAuthConfig ?? prodOAuthConfig;
        case "prod":
          return prodOAuthConfig;
      }
    })(),
    customOAuthUrl = process.env.CLAUDE_CODE_CUSTOM_OAUTH_URL;
  if (customOAuthUrl) {
    let normalizedUrl = customOAuthUrl.replace(/\/$/, "");
    if (!ALLOWED_OAUTH_BASE_URLS.includes(normalizedUrl)) throw Error("CLAUDE_CODE_CUSTOM_OAUTH_URL is not an approved endpoint.");
    baseConfig = {
      ...baseConfig,
      BASE_API_URL: normalizedUrl,
      CONSOLE_AUTHORIZE_URL: `${normalizedUrl}/oauth/authorize`,
      CLAUDE_AI_AUTHORIZE_URL: `${normalizedUrl}/oauth/authorize`,
      CLAUDE_AI_ORIGIN: normalizedUrl,
      TOKEN_URL: `${normalizedUrl}/v1/oauth/token`,
      API_KEY_URL: `${normalizedUrl}/api/oauth/claude_cli/create_api_key`,
      ROLES_URL: `${normalizedUrl}/api/oauth/claude_cli/roles`,
      CONSOLE_SUCCESS_URL: `${normalizedUrl}/oauth/code/success?app=claude-code`,
      CLAUDEAI_SUCCESS_URL: `${normalizedUrl}/oauth/code/success?app=claude-code`,
      MANUAL_REDIRECT_URL: `${normalizedUrl}/oauth/code/callback`,
      OAUTH_FILE_SUFFIX: "-custom-oauth"
    };
  }
  let overrideClientId = process.env.CLAUDE_CODE_OAUTH_CLIENT_ID;
  if (overrideClientId) baseConfig = {
    ...baseConfig,
    CLIENT_ID: overrideClientId
  };
  return baseConfig;
}
var LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS = 31536000,
  CLAUDE_AI_INFERENCE_SCOPE = "user:inference",
  CLAUDE_AI_PROFILE_SCOPE = "user:profile",
  orgCreateApiKeyScope = "org:create_api_key",
  OAUTH_BETA_HEADER = "oauth-2025-04-20",
  CONSOLE_OAUTH_SCOPES,
  CLAUDE_AI_OAUTH_SCOPES,
  ALL_OAUTH_SCOPES,
  DESIGN_OAUTH_SCOPES,
  prodOAuthConfig,
  MCP_CLIENT_METADATA_URL = "https://claude.ai/oauth/claude-code-client-metadata",
  stagingOAuthConfig = undefined,
  ALLOWED_OAUTH_BASE_URLS;
var oauthConfigInitLazy = L(() => {
  w6();
  CONSOLE_OAUTH_SCOPES = [orgCreateApiKeyScope, CLAUDE_AI_PROFILE_SCOPE], CLAUDE_AI_OAUTH_SCOPES = [CLAUDE_AI_PROFILE_SCOPE, CLAUDE_AI_INFERENCE_SCOPE, "user:sessions:claude_code", "user:mcp_servers", "user:file_upload", ...[]], ALL_OAUTH_SCOPES = deduplicate([...CONSOLE_OAUTH_SCOPES, ...CLAUDE_AI_OAUTH_SCOPES]), DESIGN_OAUTH_SCOPES = ["user:design:read", "user:design:write"], prodOAuthConfig = {
    BASE_API_URL: "https://api.anthropic.com",
    CONSOLE_AUTHORIZE_URL: "https://platform.claude.com/oauth/authorize",
    CLAUDE_AI_AUTHORIZE_URL: "https://claude.com/cai/oauth/authorize",
    CLAUDE_AI_ORIGIN: "https://claude.ai",
    TOKEN_URL: "https://platform.claude.com/v1/oauth/token",
    API_KEY_URL: "https://api.anthropic.com/api/oauth/claude_cli/create_api_key",
    ROLES_URL: "https://api.anthropic.com/api/oauth/claude_cli/roles",
    CONSOLE_SUCCESS_URL: "https://platform.claude.com/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code",
    CLAUDEAI_SUCCESS_URL: "https://platform.claude.com/oauth/code/success?app=claude-code",
    MANUAL_REDIRECT_URL: "https://platform.claude.com/oauth/code/callback",
    CLIENT_ID: "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
    DESIGN_CLIENT_ID: "59637612-477b-4836-a601-b0589eda7704",
    OAUTH_FILE_SUFFIX: "",
    MCP_PROXY_URL: "https://mcp-proxy.anthropic.com",
    MCP_PROXY_PATH: "/v1/mcp/{server_id}"
  };
  ALLOWED_OAUTH_BASE_URLS = ["https://beacon.claude-ai.staging.ant.dev", "https://claude.fedstart.com", "https://claude-staging.fedstart.com"];
});
export {intersperse as xEe,countMatching as zn,deduplicate as os,oauthConfigExports as gAt,getDeployEnv as PJo,fileSuffixForOauthConfig,getLocalOAuthConfig as g5c,getOauthConfig,LONG_LIVED_OAUTH_TOKEN_TTL_SECONDS,CLAUDE_AI_INFERENCE_SCOPE,CLAUDE_AI_PROFILE_SCOPE,orgCreateApiKeyScope as f5c,OAUTH_BETA_HEADER,CONSOLE_OAUTH_SCOPES,CLAUDE_AI_OAUTH_SCOPES,ALL_OAUTH_SCOPES,DESIGN_OAUTH_SCOPES,prodOAuthConfig as DJo,MCP_CLIENT_METADATA_URL,stagingOAuthConfig as h5c,ALLOWED_OAUTH_BASE_URLS,oauthConfigInitLazy as Sc};
