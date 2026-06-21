// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Pkn as Yxn,g7r as vVr} from "../../vendor/m3144.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {Kre as Mre,zTt as bTt,zLe as HLe,YXt as iXt,YT as HS} from "../tools/0323_ttl.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function QJi() {
  return ut("tengu_mcp_stateless_skip_init", true);
}
function isStatelessSkipInitEnabled() {
  if (!QJi()) return {};
  let e = Yxn(),
    t = Buffer.from(Oe(e)).toString("base64");
  if (Buffer.byteLength(t, "ascii") > dFd) return v("[claudeai-mcp] client capabilities header exceeds size limit \u2014 omitting init-projection headers"), {};
  return {
    "anthropic-mcp-client-capabilities": t,
    "MCP-Protocol-Version": Mre
  };
}
function getMcpClientCapabilitiesHeaders(e) {
  return e.type === "claudeai-proxy" && e.stateless === true && QJi();
}
function isStatelessClaudeAiProxy(serverConfig) {
  if (!getMcpClientCapabilitiesHeaders(serverConfig) || serverConfig.type !== "claudeai-proxy") return;
  if (serverConfig.cachedInitResponse == null) return;
  let t = bTt.safeParse(serverConfig.cachedInitResponse);
  if (!t.success) {
    v(`[claudeai-mcp] cached_init_response for ${serverConfig.id} failed InitializeResult validation \u2014 falling back to real initialize`);
    return;
  }
  return t.data;
}
function getCachedInitResult(serverConfig, t) {
  let n = serverConfig.send.bind(serverConfig);
  serverConfig.send = async (r, o) => {
    if (t !== undefined && HLe(r) && r.method === "initialize") {
      let s = {
        jsonrpc: "2.0",
        id: r.id,
        result: t
      };
      queueMicrotask(() => serverConfig.onmessage?.(s));
      return;
    }
    if (iXt(r) && r.method === "notifications/initialized") return;
    return n(r, o);
  };
}
function patchTransportForStatelessInit(transport) {
  return async (t, n) => {
    if ((n?.method ?? "GET").toUpperCase() === "GET") return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed"
    });
    return transport(t, n);
  };
}
var dFd = 6144;
var Fg8 = b(() => {
  HS();
  je();
  Xt();
  Yn();
  vVr();
});

export {QJi as cQi,isStatelessSkipInitEnabled as uQi,getMcpClientCapabilitiesHeaders as Okn,isStatelessClaudeAiProxy as dQi,getCachedInitResult as pQi,patchTransportForStatelessInit as mQi,dFd as O2d,Fg8 as _7r};
