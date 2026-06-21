// @ts-nocheck
import {fo} from "../../vendor/m566.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {TEt,bbe} from "../../vendor/m724.ts";
import {saveGlobalConfig,getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getOauthAccountInfo,Ao,isClaudeAISubscriber,checkAndRefreshOAuthTokenIfNeeded,getClaudeAIOAuthTokens} from "../config/2031_withOAuthRefreshLock.ts";
import {getOauthConfig,Dc} from "./0459_getOauthConfig.ts";
import {b} from "../../runtime.ts";
import {Gp} from "../../vendor/m567.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {g1,gRr} from "../../vendor/m1445.ts";
import {Ct,logEvent} from "../../vendor/m131.ts";
import {Iy,hc} from "../agent/2230_explicitlyRequested.ts";
import {qe,logForDebugging} from "../config/0234_setHasFormattedOutput.ts";
import {sn} from "../config/0047_namespace.ts";
import {fk,withOAuth401Retry} from "./2032_withOAuth401Retry.ts";
import {li,isFirstPartyProvider} from "./1282_usesFirstPartyModelIds.ts";
import {Ap} from "../config/0614_Ap.ts";
import {yr,hasDisableClaudeAiConnectors} from "../config/0740_updateSettingsForSource.ts";
import {ln,Ie,Oe} from "../telemetry/0594_feature_name.ts";
import {_7r,uQi} from "../telemetry/3146_anthropic_mcp_client_capabilities.ts";
import {_l,Qe} from "../../vendor/m5.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {collectFlagValueIndexes} from "../mcp/0728_serverName.ts";
function F2d(e: any) {
  if (!fo.isAxiosError(e)) return !1;
  let t = e.response?.status;
  if (t !== void 0) return t >= 500 && t < 600;
  return e.code !== void 0 && B2d.has(e.code);
}
function y7r() {
  let e = xrt;
  return xrt = void 0, e;
}
function Lkn() {
  let e = y7r();
  if (!e) return;
  let t = e.level === "error" ? _t.red(e.message) : _t.yellow(`\u26A0 ${e.message}`);
  process.stderr.write(`${t}
`);
}
function U2d(e: any) {
  let t: any = {};
  for (let n of e ?? []) {
    let r = TEt().safeParse(n.effective_max_permission);
    if (r.success) t[n.name] = r.data;
  }
  return Object.keys(t).length > 0 ? t : void 0;
}
function $2d(e: any) {
  try {
    return new URL(e).href.replace(/\/+$/, "");
  } catch {
    return e;
  }
}
function hQi() {
  jxe.cache.clear?.(), xrt = void 0;
}
function T7r(e: any) {
  saveGlobalConfig((t: any) => {
    let n = t.claudeAiMcpEverConnected ?? [];
    if (n.includes(e)) return t;
    return {
      ...t,
      claudeAiMcpEverConnected: [...n, e]
    };
  });
}
function aMt(e: any) {
  return (getGlobalConfig().claudeAiMcpEverConnected ?? []).includes(e);
}
function Mkn() {
  return new Set(getGlobalConfig().claudeAiMcpEverConnected ?? []);
}
function krt(e: any) {
  let t = getOauthAccountInfo()?.organizationUuid;
  if (!t || !e.id) return null;
  let n = getOauthConfig().CLAUDE_AI_ORIGIN,
    r = e.id.startsWith("mcprs") ? "mcpsrv" + e.id.slice(5) : e.id,
    o = encodeURIComponent(process.env.CLAUDE_CODE_ENTRYPOINT || "cli");
  return `${n}/api/organizations/${t}/mcp/start-auth/${r}?product_surface=${o}`;
}
var fQi = 5000,
  AQi = 3,
  L2d = 500,
  M2d = 3,
  N2d = 12000,
  B2d: any,
  xrt: any,
  jxe: any;
var Iee = b(() => {
  Gp();
  cu();
  ta();
  g1();
  Dc();
  Ct();
  Ao();
  Qn();
  Iy();
  qe();
  sn();
  fk();
  li();
  Ap();
  yr();
  ln();
  _7r();
  bbe();
  B2d = new Set(["ECONNABORTED", "ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "EAI_AGAIN"]);
  jxe = wn(async () => {
    let e = 0;
    xrt = void 0;
    try {
      let t = _l(process.env.ENABLE_CLAUDEAI_MCP_SERVERS),
        n = hasDisableClaudeAiConnectors();
      if (t || n) return logForDebugging(`[claudeai-mcp] Disabled via ${t ? "env var" : "disableClaudeAiConnectors setting"}`), logEvent("tengu_claudeai_mcp_eligibility", {
        state: t ? Qe("disabled_env_var") : Qe("disabled_setting")
      }), {};
      if (hc("mcpClaudeAi")) return logForDebugging("[claudeai-mcp] Disabled in safe mode"), logEvent("tengu_claudeai_mcp_eligibility", {
        state: Qe("safe_mode")
      }), {};
      if (!isFirstPartyProvider()) return logForDebugging("[claudeai-mcp] Disabled on third-party provider"), logEvent("tengu_claudeai_mcp_eligibility", {
        state: Qe("third_party_provider")
      }), {};
      if (!isClaudeAISubscriber()) return logForDebugging("[claudeai-mcp] Disabled: API-key auth precedence active"), logEvent("tengu_claudeai_mcp_eligibility", {
        state: Qe("api_key_precedence")
      }), {};
      await checkAndRefreshOAuthTokenIfNeeded();
      let r = getClaudeAIOAuthTokens();
      if (!r?.accessToken) return logForDebugging("[claudeai-mcp] No access token"), logEvent("tengu_claudeai_mcp_eligibility", {
        state: Qe("no_oauth_token")
      }), {};
      if (!r.scopes?.includes("user:mcp_servers")) {
        let p = process.env.CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE ? "[claudeai-mcp] inference token lacks user:mcp_servers scope \u2014 claude.ai org connectors disabled (locally-configured MCP servers in managed-mcp.json / .claude.json / .mcp.json are NOT affected by this check)" : `[claudeai-mcp] Missing user:mcp_servers scope (scopes=${r.scopes?.join(",") || "none"})`;
        return logForDebugging(p), logEvent("tengu_claudeai_mcp_eligibility", {
          state: Qe("missing_scope")
        }), {};
      }
      let s = `${getOauthConfig().BASE_API_URL}/v1/mcp_servers?limit=1000`;
      logForDebugging(`[claudeai-mcp] Fetching from ${s}`);
      let i = () => withOAuth401Retry(() => fo.get(s, {
          headers: {
            Authorization: `Bearer ${getClaudeAIOAuthTokens()?.accessToken ?? r.accessToken}`,
            "Content-Type": "application/json",
            "anthropic-beta": gRr.header,
            "anthropic-version": "2023-06-01",
            ...uQi()
          },
          timeout: fQi
        })),
        a = Date.now(),
        l: any;
      while (!0) {
        e++;
        try {
          l = await i();
          break;
        } catch (p: any) {
          if (e >= AQi || !F2d(p)) throw p;
          let m = L2d * M2d ** (e - 1);
          if (Date.now() - a + m + fQi >= N2d) throw logForDebugging(`[claudeai-mcp] Retry budget exhausted after ${e} attempt(s)`), p;
          let f = fo.isAxiosError(p) ? p.response?.status ?? p.code ?? "unknown" : "unknown";
          logForDebugging(`[claudeai-mcp] Transient fetch error (${f}), retrying in ${m}ms (attempt ${e}/${AQi})`), await sleep(m);
        }
      }
      let c = new Map();
      for (let p of l.data.data) {
        let m = $2d(p.url),
          f = c.get(m);
        if (f) {
          logForDebugging(`[claudeai-mcp] Dropping duplicate upstream ${m}: keeping ${f.id}, dropping ${p.id}`);
          continue;
        }
        c.set(m, p);
      }
      let u: any = {},
        d = new Set();
      for (let p of c.values()) {
        let m = `claude.ai ${p.display_name}`,
          f = m,
          A = collectFlagValueIndexes(f),
          h = 1;
        while (d.has(A)) h++, f = `${m} (${h})`, A = collectFlagValueIndexes(f);
        if (h > 1) logForDebugging(`[claudeai-mcp] Display-name collision on distinct upstreams: "${f}" (${p.id}, ${p.url})`);
        d.add(A), u[f] = {
          type: "claudeai-proxy",
          url: p.url,
          id: p.id,
          displayName: p.display_name,
          iconUrl: p.icon_url,
          scope: "claudeai",
          toolPermissions: U2d(p.tools),
          stateless: p.stateless,
          cachedInitResponse: p.cached_init_response
        };
      }
      return logForDebugging(`[claudeai-mcp] Fetched ${Object.keys(u).length} servers`), logEvent("tengu_claudeai_mcp_eligibility", {
        state: Qe("eligible")
      }), Ie("mcp_claudeai_fetch_configs"), u;
    } catch (t: any) {
      let n = fo.isAxiosError(t) ? String(t.response?.status ?? t.code ?? "unknown") : "unknown";
      return logForDebugging(`[claudeai-mcp] Fetch failed (${n}) after ${e} attempt(s)`), logEvent("tengu_claudeai_mcp_eligibility", {
        state: Qe("fetch_failed"),
        status: n,
        attempts: e
      }), Oe("mcp_claudeai_fetch_configs", "fetch_failed"), jxe.cache.clear?.(), {};
    }
  });
});
export {F2d,y7r,Lkn,U2d,$2d,hQi,T7r,aMt,Mkn,krt,fQi,AQi,L2d,M2d,N2d,B2d,xrt,jxe,Iee};
