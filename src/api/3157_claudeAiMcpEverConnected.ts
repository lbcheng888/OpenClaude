// @ts-nocheck
import {ho} from "../../vendor/m572.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {zRt,oCe} from "../../vendor/m729.ts";
import {saveGlobalConfig as hn,getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getOauthConfig as Hs,Sc} from "./0465_getOauthConfig.ts";
import {getOauthAccountInfo as hc,lo,isClaudeAISubscriber as Eo,getClaudeAIOAuthTokens as qs,checkAndRefreshOAuthTokenIfNeeded as Dh} from "../config/2036_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
import {ap} from "../../vendor/m573.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {xM,K0r} from "../../vendor/m1450.ts";
import {kt,logEvent as W} from "../../vendor/m132.ts";
import {ky,buildMcpToolName as Vl} from "../agent/2238_explicitlyRequested.ts";
import {qe,logForDebugging as A} from "../config/0236_setHasFormattedOutput.ts";
import {dn} from "../config/0137_namespace.ts";
import {kk,withOAuth401Retry as N0} from "./2037_withOAuth401Retry.ts";
import {Ps,isFirstPartyProvider as Nl} from "./1287_usesFirstPartyModelIds.ts";
import {$d} from "../config/0620_$d.ts";
import {br,hasDisableClaudeAiConnectors as rNe} from "../config/0745_updateSettingsForSource.ts";
import {mn,He,xe} from "../telemetry/0600_feature_name.ts";
import {ZJr,rsa} from "../telemetry/3156_anthropic_mcp_client_capabilities.ts";
import {Za} from "../../vendor/m127.ts";
import {Ve} from "../../vendor/m5.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {ac} from "../mcp/0733_serverName.ts";
// @ts-nocheck
/** True when the axios error is a transient/retryable failure (5xx response or a known network error code). */
function SVd(error: any): boolean {
  if (!ho.isAxiosError(error)) return !1;
  let status = error.response?.status;
  if (status !== void 0) return status >= 500 && status < 600;
  return error.code !== void 0 && TVd.has(error.code);
}
/** Atomically take and clear the pending eligibility warning. */
function eXr() {
  let pending = N9e;
  return N9e = void 0, pending;
}
/** Print the pending eligibility warning (if any) to stderr, colored by level. */
function Axn(): void {
  let warning = eXr();
  if (!warning) return;
  let line = warning.level === "error" ? bt.red(warning.message) : bt.yellow(`⚠ ${warning.message}`);
  process.stderr.write(`${line}
`);
}
/** Build a map of tool name -> validated effective max permission from the server tools list. */
function bVd(tools: any) {
  let permissions: any = {};
  for (let tool of tools ?? []) {
    let parsed = zRt().safeParse(tool.effective_max_permission);
    if (parsed.success) permissions[tool.name] = parsed.data;
  }
  return Object.keys(permissions).length > 0 ? permissions : void 0;
}
/** Normalize a URL by stripping trailing slashes; returns the raw input if it can't be parsed. */
function EVd(rawUrl: any): string {
  try {
    return new URL(rawUrl).href.replace(/\/+$/, "");
  } catch {
    return rawUrl;
  }
}
/** Clear the cached fetch results and any pending warning. */
function csa(): void {
  xHe.cache.clear?.(), N9e = void 0;
}
/** Record that the given claude.ai MCP server name has ever been connected, in the global config. */
function tXr(serverName: any): void {
  hn((config: any) => {
    let everConnected = config.claudeAiMcpEverConnected ?? [];
    if (everConnected.includes(serverName)) return config;
    return {
      ...config,
      claudeAiMcpEverConnected: [...everConnected, serverName]
    };
  });
}
/** Whether the given server name has ever been connected. */
function LNt(serverName: any): boolean {
  return (Ot().claudeAiMcpEverConnected ?? []).includes(serverName);
}
/** Set of all server names that have ever been connected. */
function Rxn() {
  return new Set(Ot().claudeAiMcpEverConnected ?? []);
}
/** URL of the claude.ai connectors customization page. */
function Mge(): string {
  return `${Hs().CLAUDE_AI_ORIGIN}/customize/connectors`;
}
/** Build the start-auth URL for a given MCP server, or null if there's no org / server id. */
function DHe(server: any): string | null {
  let organizationUuid = hc()?.organizationUuid;
  if (!organizationUuid || !server.id) return null;
  let origin = Hs().CLAUDE_AI_ORIGIN,
    serverId = server.id.startsWith("mcprs") ? "mcpsrv" + server.id.slice(5) : server.id,
    productSurface = encodeURIComponent(process.env.CLAUDE_CODE_ENTRYPOINT || "cli");
  return `${origin}/api/organizations/${organizationUuid}/mcp/start-auth/${serverId}?product_surface=${productSurface}`;
}
var asa = 5000,
  lsa = 3,
  gVd = 500,
  _Vd = 3,
  yVd = 12000,
  TVd,
  N9e,
  xHe;
var wW = b(() => {
  ap();
  Gc();
  Wi();
  xM();
  Sc();
  kt();
  lo();
  tr();
  ky();
  qe();
  dn();
  kk();
  Ps();
  $d();
  br();
  mn();
  ZJr();
  oCe();
  TVd = new Set(["ECONNABORTED", "ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "EAI_AGAIN"]);
  xHe = Hn(async () => {
    let attempt = 0;
    N9e = void 0;
    try {
      let disabledViaEnv = Za(process.env.ENABLE_CLAUDEAI_MCP_SERVERS),
        disabledViaSetting = rNe();
      if (disabledViaEnv || disabledViaSetting) return A(`[claudeai-mcp] Disabled via ${disabledViaEnv ? "env var" : "disableClaudeAiConnectors setting"}`), W("tengu_claudeai_mcp_eligibility", {
        state: disabledViaEnv ? Ve("disabled_env_var") : Ve("disabled_setting")
      }), {};
      if (Vl("mcpClaudeAi")) return A("[claudeai-mcp] Disabled in safe mode"), W("tengu_claudeai_mcp_eligibility", {
        state: Ve("safe_mode")
      }), {};
      if (!Nl()) return A("[claudeai-mcp] Disabled on third-party provider"), W("tengu_claudeai_mcp_eligibility", {
        state: Ve("third_party_provider")
      }), {};
      if (!Eo()) {
        if (A("[claudeai-mcp] Disabled: API-key auth precedence active"), W("tengu_claudeai_mcp_eligibility", {
          state: Ve("api_key_precedence")
        }), qs()?.scopes?.includes("user:mcp_servers")) N9e = {
          level: "warn",
          message: "claude.ai connectors are disabled because ANTHROPIC_API_KEY or another auth source is set and takes precedence over your claude.ai login \xB7 Unset it to load your organization's connectors"
        };
        return {};
      }
      await Dh();
      let tokens = qs();
      if (!tokens?.accessToken) return A("[claudeai-mcp] No access token"), W("tengu_claudeai_mcp_eligibility", {
        state: Ve("no_oauth_token")
      }), {};
      if (!tokens.scopes?.includes("user:mcp_servers")) {
        let scopeMessage = process.env.CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE ? "[claudeai-mcp] inference token lacks user:mcp_servers scope — claude.ai org connectors disabled (locally-configured MCP servers in managed-mcp.json / .claude.json / .mcp.json are NOT affected by this check)" : `[claudeai-mcp] Missing user:mcp_servers scope (scopes=${tokens.scopes?.join(",") || "none"})`;
        return A(scopeMessage), W("tengu_claudeai_mcp_eligibility", {
          state: Ve("missing_scope")
        }), {};
      }
      let fetchUrl = `${Hs().BASE_API_URL}/v1/mcp_servers?limit=1000`;
      A(`[claudeai-mcp] Fetching from ${fetchUrl}`);
      let doFetch = () => N0(() => ho.get(fetchUrl, {
          headers: {
            Authorization: `Bearer ${qs()?.accessToken ?? tokens.accessToken}`,
            "Content-Type": "application/json",
            "anthropic-beta": K0r.header,
            "anthropic-version": "2023-06-01",
            ...rsa()
          },
          timeout: asa
        })),
        startTime = Date.now(),
        response;
      while (!0) {
        attempt++;
        try {
          response = await doFetch();
          break;
        } catch (fetchError) {
          if (attempt >= lsa || !SVd(fetchError)) throw fetchError;
          let backoffMs = gVd * _Vd ** (attempt - 1);
          if (Date.now() - startTime + backoffMs + asa >= yVd) throw A(`[claudeai-mcp] Retry budget exhausted after ${attempt} attempt(s)`), fetchError;
          let errorDetail = ho.isAxiosError(fetchError) ? fetchError.response?.status ?? fetchError.code ?? "unknown" : "unknown";
          A(`[claudeai-mcp] Transient fetch error (${errorDetail}), retrying in ${backoffMs}ms (attempt ${attempt}/${lsa})`), await Kn(backoffMs);
        }
      }
      let byUrl = new Map();
      for (let server of response.data.data) {
        let normalizedUrl = EVd(server.url),
          existing = byUrl.get(normalizedUrl);
        if (existing) {
          A(`[claudeai-mcp] Dropping duplicate upstream ${normalizedUrl}: keeping ${existing.id}, dropping ${server.id}`);
          continue;
        }
        byUrl.set(normalizedUrl, server);
      }
      let servers: any = {},
        usedKeys = new Set();
      for (let server of byUrl.values()) {
        let baseName = `claude.ai ${server.display_name}`,
          uniqueName = baseName,
          slug = ac(uniqueName),
          dedupeCount = 1;
        while (usedKeys.has(slug)) dedupeCount++, uniqueName = `${baseName} (${dedupeCount})`, slug = ac(uniqueName);
        if (dedupeCount > 1) A(`[claudeai-mcp] Display-name collision on distinct upstreams: "${uniqueName}" (${server.id}, ${server.url})`);
        usedKeys.add(slug), servers[uniqueName] = {
          type: "claudeai-proxy",
          url: server.url,
          id: server.id,
          displayName: server.display_name,
          iconUrl: server.icon_url,
          scope: "claudeai",
          toolPermissions: bVd(server.tools),
          stateless: server.stateless,
          cachedInitResponse: server.cached_init_response
        };
      }
      return A(`[claudeai-mcp] Fetched ${Object.keys(servers).length} servers`), W("tengu_claudeai_mcp_eligibility", {
        state: Ve("eligible")
      }), He("mcp_claudeai_fetch_configs"), servers;
    } catch (error) {
      let status = ho.isAxiosError(error) ? String(error.response?.status ?? error.code ?? "unknown") : "unknown";
      return A(`[claudeai-mcp] Fetch failed (${status}) after ${attempt} attempt(s)`), W("tengu_claudeai_mcp_eligibility", {
        state: Ve("fetch_failed"),
        status: status,
        attempts: attempt
      }), xe("mcp_claudeai_fetch_configs", "fetch_failed"), xHe.cache.clear?.(), {};
    }
  });
});

export {SVd,eXr,Axn,bVd,EVd,csa,tXr,LNt,Rxn,Mge,DHe,asa,lsa,gVd,_Vd,yVd,TVd,N9e,xHe,wW};
