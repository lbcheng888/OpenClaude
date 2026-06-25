// @ts-nocheck
import {_t,uo} from "../../vendor/m2468.ts";
import {bsa,Mae,qO} from "../mcp/3159_scope.ts";
import {U9e,wee} from "./3161_error.ts";
import {ZT,sO} from "./2194_level.ts";
import {Kvo,zvo} from "../tui/4682_label.ts";
import {TWt,E7n} from "../../vendor/m4685.ts";
import {cWe,S7n} from "../tui/4685_message.ts";
import {bWt,R7n} from "../tools/4688_server.ts";
import {SWt,A7n} from "../tui/4687_tool.ts";
import {Gvo,Vvo} from "../../vendor/m4680.ts";
import {b,x} from "../../runtime.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * McpServerManagerComponent — top-level MCP server manager UI component.
 *
 * Renders a multi-screen navigator for listing, configuring, and inspecting
 * MCP servers (stdio, SSE, HTTP, claude.ai-proxy) and agent servers.
 * The `onComplete` callback is invoked with a message string when the
 * component is done or when there are no servers to show.
 */
function v7n(props: { onComplete: (message: string) => void }) {
  // React compiler cache (76 slots)
  let cache = VSl.c(76),
    {
      onComplete
    } = props,
    // Zustand state selectors (cross-module — keep minified names for linkage)
    mcpState = _t(nom),
    agentDefsState = _t(tom),
    clients = mcpState.clients,
    initialListState: { type: "list" };
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) initialListState = {
    type: "list"
  }, cache[0] = initialListState;else initialListState = cache[0];
  let [viewState, setViewState] = dWe.useState(initialListState),
    emptyArray: unknown[];
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) emptyArray = [], cache[1] = emptyArray;else emptyArray = cache[1];
  let [servers, setServers] = dWe.useState(emptyArray),
    [showUnusedConnectors, setShowUnusedConnectors] = dWe.useState(!1),
    agentServers: unknown[];
  if (cache[2] !== agentDefsState.allAgents) agentServers = bsa(agentDefsState.allAgents), cache[2] = agentDefsState.allAgents, cache[3] = agentServers;else agentServers = cache[3];
  let agentServersList = agentServers,
    filteredClients: unknown[];
  if (cache[4] !== clients) filteredClients = clients.filter(eom).sort(Zrm), cache[4] = clients, cache[5] = filteredClients;else filteredClients = cache[5];
  let clientList = filteredClients,
    toolCountsMap: Record<string, number>;
  if (cache[6] !== clientList || cache[7] !== mcpState.tools) {
    toolCountsMap = {};
    for (let client of clientList) toolCountsMap[client.name] = Mae(mcpState.tools, client.name).length;
    cache[6] = clientList, cache[7] = mcpState.tools, cache[8] = toolCountsMap;
  } else toolCountsMap = cache[8];
  let toolCountsByServer = toolCountsMap,
    fetchServersEffect: () => (() => void),
    fetchServersDeps: unknown[];
  if (cache[9] !== clientList || cache[10] !== mcpState.tools) fetchServersEffect = () => {
    let cancelled = !1;
    return async function () {
      let serverInfoList = await Promise.all(clientList.map(async client => {
        let scope = client.config.scope,
          isSse = client.config.type === "sse",
          isHttp = client.config.type === "http",
          isClaudeAiProxy = client.config.type === "claudeai-proxy",
          isAuthenticated: boolean | undefined = void 0;
        if (isSse || isHttp) {
          let tokenResult = await new U9e(client.name, client.config).tokens(),
            hasSessionToken = ZT() !== null && client.type === "connected",
            hasTools = client.type === "connected" && Mae(mcpState.tools, client.name).length > 0;
          isAuthenticated = Boolean(tokenResult) || hasSessionToken || hasTools;
        }
        let baseServerInfo = {
          name: client.name,
          client,
          scope
        };
        if (isClaudeAiProxy) return {
          ...baseServerInfo,
          transport: "claudeai-proxy",
          isAuthenticated: !1,
          config: client.config
        };else if (isSse) return {
          ...baseServerInfo,
          transport: "sse",
          isAuthenticated,
          config: client.config
        };else if (isHttp) return {
          ...baseServerInfo,
          transport: "http",
          isAuthenticated,
          config: client.config
        };else return {
          ...baseServerInfo,
          transport: "stdio",
          config: client.config
        };
      }));
      if (cancelled) return;
      setServers(serverInfoList);
    }(), () => {
      cancelled = !0;
    };
  }, fetchServersDeps = [clientList, mcpState.tools], cache[9] = clientList, cache[10] = mcpState.tools, cache[11] = fetchServersEffect, cache[12] = fetchServersDeps;else fetchServersEffect = cache[11], fetchServersDeps = cache[12];
  dWe.useEffect(fetchServersEffect, fetchServersDeps);
  let noServersEffect: () => void;
  if (cache[13] !== agentServersList.length || cache[14] !== clientList.length || cache[15] !== mcpState.suppressedClaudeAiConnectors?.length || cache[16] !== onComplete || cache[17] !== servers.length) noServersEffect = () => {
    if (servers.length === 0 && clientList.length > 0) return;
    if (servers.length === 0 && agentServersList.length === 0 && (mcpState.suppressedClaudeAiConnectors?.length ?? 0) === 0) onComplete("No MCP servers configured. Please run /doctor if this is unexpected. Otherwise, run `claude mcp --help` or visit https://code.claude.com/docs/en/mcp to learn more.");
  }, cache[13] = agentServersList.length, cache[14] = clientList.length, cache[15] = mcpState.suppressedClaudeAiConnectors?.length, cache[16] = onComplete, cache[17] = servers.length, cache[18] = noServersEffect;else noServersEffect = cache[18];
  let suppressedClaudeAiConnectorsLength = mcpState.suppressedClaudeAiConnectors?.length,
    noServersDeps: unknown[];
  if (cache[19] !== agentServersList.length || cache[20] !== clientList.length || cache[21] !== onComplete || cache[22] !== servers.length || cache[23] !== suppressedClaudeAiConnectorsLength) noServersDeps = [servers.length, clientList.length, agentServersList.length, suppressedClaudeAiConnectorsLength, onComplete], cache[19] = agentServersList.length, cache[20] = clientList.length, cache[21] = onComplete, cache[22] = servers.length, cache[23] = suppressedClaudeAiConnectorsLength, cache[24] = noServersDeps;else noServersDeps = cache[24];
  switch (dWe.useEffect(noServersEffect, noServersDeps), viewState.type) {
    case "list":
      {
        let handleSelectServer: (server: unknown) => void, handleSelectAgentServer: (agentServer: unknown) => void;
        if (cache[25] === Symbol.for("react.memo_cache_sentinel")) handleSelectServer = server => setViewState({
          type: "server-menu",
          server
        }), handleSelectAgentServer = agentServer => setViewState({
          type: "agent-server-menu",
          agentServer
        }), cache[25] = handleSelectServer, cache[26] = handleSelectAgentServer;else handleSelectServer = cache[25], handleSelectAgentServer = cache[26];
        let toggleUnused: () => void;
        if (cache[27] === Symbol.for("react.memo_cache_sentinel")) toggleUnused = () => setShowUnusedConnectors(Qrm), cache[27] = toggleUnused;else toggleUnused = cache[27];
        let listElement: unknown;
        if (cache[28] !== agentServersList || cache[29] !== mcpState.suppressedClaudeAiConnectors || cache[30] !== onComplete || cache[31] !== servers || cache[32] !== showUnusedConnectors || cache[33] !== toolCountsByServer || cache[34] !== viewState.defaultTab) listElement = uWe.jsx(Kvo, {
          servers,
          suppressedClaudeAiConnectors: mcpState.suppressedClaudeAiConnectors,
          toolCountsByServer,
          agentServers: agentServersList,
          onSelectServer: handleSelectServer,
          onSelectAgentServer: handleSelectAgentServer,
          onComplete,
          defaultTab: viewState.defaultTab,
          showUnusedConnectors,
          onToggleUnusedConnectors: toggleUnused
        }), cache[28] = agentServersList, cache[29] = mcpState.suppressedClaudeAiConnectors, cache[30] = onComplete, cache[31] = servers, cache[32] = showUnusedConnectors, cache[33] = toolCountsByServer, cache[34] = viewState.defaultTab, cache[35] = listElement;else listElement = cache[35];
        return listElement;
      }
    case "server-menu":
      {
        let serverTools: unknown[];
        if (cache[36] !== mcpState.tools || cache[37] !== viewState.server.name) serverTools = Mae(mcpState.tools, viewState.server.name), cache[36] = mcpState.tools, cache[37] = viewState.server.name, cache[38] = serverTools;else serverTools = cache[38];
        let currentServerTools = serverTools,
          // "claude.ai" for claudeai-proxy transport, "Claude Code" otherwise
          managedByLabel = viewState.server.transport === "claudeai-proxy" ? "claude.ai" : "Claude Code";
        if (viewState.server.transport === "stdio") {
          let handleViewTools: () => void;
          if (cache[39] !== viewState.server) handleViewTools = () => setViewState({
            type: "server-tools",
            server: viewState.server
          }), cache[39] = viewState.server, cache[40] = handleViewTools;else handleViewTools = cache[40];
          let handleCancelToList: () => void;
          if (cache[41] !== managedByLabel) handleCancelToList = () => setViewState({
            type: "list",
            defaultTab: managedByLabel
          }), cache[41] = managedByLabel, cache[42] = handleCancelToList;else handleCancelToList = cache[42];
          let stdioMenuElement: unknown;
          if (cache[43] !== onComplete || cache[44] !== currentServerTools.length || cache[45] !== handleViewTools || cache[46] !== handleCancelToList || cache[47] !== viewState.server) stdioMenuElement = uWe.jsx(TWt, {
            server: viewState.server,
            serverToolsCount: currentServerTools.length,
            onViewTools: handleViewTools,
            onCancel: handleCancelToList,
            onComplete
          }), cache[43] = onComplete, cache[44] = currentServerTools.length, cache[45] = handleViewTools, cache[46] = handleCancelToList, cache[47] = viewState.server, cache[48] = stdioMenuElement;else stdioMenuElement = cache[48];
          return stdioMenuElement;
        } else {
          let handleViewTools: () => void;
          if (cache[49] !== viewState.server) handleViewTools = () => setViewState({
            type: "server-tools",
            server: viewState.server
          }), cache[49] = viewState.server, cache[50] = handleViewTools;else handleViewTools = cache[50];
          let handleCancelToList: () => void;
          if (cache[51] !== managedByLabel) handleCancelToList = () => setViewState({
            type: "list",
            defaultTab: managedByLabel
          }), cache[51] = managedByLabel, cache[52] = handleCancelToList;else handleCancelToList = cache[52];
          let remoteMenuElement: unknown;
          if (cache[53] !== onComplete || cache[54] !== currentServerTools.length || cache[55] !== handleViewTools || cache[56] !== handleCancelToList || cache[57] !== viewState.server) remoteMenuElement = uWe.jsx(cWe, {
            server: viewState.server,
            serverToolsCount: currentServerTools.length,
            onViewTools: handleViewTools,
            onCancel: handleCancelToList,
            onComplete
          }), cache[53] = onComplete, cache[54] = currentServerTools.length, cache[55] = handleViewTools, cache[56] = handleCancelToList, cache[57] = viewState.server, cache[58] = remoteMenuElement;else remoteMenuElement = cache[58];
          return remoteMenuElement;
        }
      }
    case "server-tools":
      {
        let handleSelectTool: (tool: unknown) => void, handleBackToServerMenu: () => void;
        if (cache[59] !== viewState.server) handleSelectTool = tool => setViewState({
          type: "server-tool-detail",
          server: viewState.server,
          tool
        }), handleBackToServerMenu = () => setViewState({
          type: "server-menu",
          server: viewState.server
        }), cache[59] = viewState.server, cache[60] = handleSelectTool, cache[61] = handleBackToServerMenu;else handleSelectTool = cache[60], handleBackToServerMenu = cache[61];
        let serverToolsElement: unknown;
        if (cache[62] !== handleSelectTool || cache[63] !== handleBackToServerMenu || cache[64] !== viewState.server) serverToolsElement = uWe.jsx(bWt, {
          server: viewState.server,
          onSelectTool: handleSelectTool,
          onBack: handleBackToServerMenu
        }), cache[62] = handleSelectTool, cache[63] = handleBackToServerMenu, cache[64] = viewState.server, cache[65] = serverToolsElement;else serverToolsElement = cache[65];
        return serverToolsElement;
      }
    case "server-tool-detail":
      {
        let handleBackToToolList: () => void;
        if (cache[66] !== viewState.server) handleBackToToolList = () => setViewState({
          type: "server-tools",
          server: viewState.server
        }), cache[66] = viewState.server, cache[67] = handleBackToToolList;else handleBackToToolList = cache[67];
        let toolDetailElement: unknown;
        if (cache[68] !== handleBackToToolList || cache[69] !== viewState.server || cache[70] !== viewState.tool) toolDetailElement = uWe.jsx(SWt, {
          tool: viewState.tool,
          server: viewState.server,
          onBack: handleBackToToolList
        }), cache[68] = handleBackToToolList, cache[69] = viewState.server, cache[70] = viewState.tool, cache[71] = toolDetailElement;else toolDetailElement = cache[71];
        return toolDetailElement;
      }
    case "agent-server-menu":
      {
        let handleBackToAgentsList: () => void;
        if (cache[72] === Symbol.for("react.memo_cache_sentinel")) handleBackToAgentsList = () => setViewState({
          type: "list",
          defaultTab: "Agents"
        }), cache[72] = handleBackToAgentsList;else handleBackToAgentsList = cache[72];
        let agentServerMenuElement: unknown;
        if (cache[73] !== onComplete || cache[74] !== viewState.agentServer) agentServerMenuElement = uWe.jsx(Gvo, {
          agentServer: viewState.agentServer,
          onCancel: handleBackToAgentsList,
          onComplete
        }), cache[73] = onComplete, cache[74] = viewState.agentServer, cache[75] = agentServerMenuElement;else agentServerMenuElement = cache[75];
        return agentServerMenuElement;
      }
  }
}
/** Toggle helper passed to `setShowUnusedConnectors`: inverts the boolean flag. */
function Qrm(prev: boolean): boolean {
  return !prev;
}
/** Sort comparator: sorts MCP clients alphabetically by name. */
function Zrm(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}
/** Filter predicate: excludes the built-in "ide" MCP client from the displayed list. */
function eom(client: { name: string }): boolean {
  return client.name !== "ide";
}
/** State selector: extracts `agentDefinitions` from the app state for agent server data. */
function tom(state: { agentDefinitions: unknown }): unknown {
  return state.agentDefinitions;
}
/** State selector: extracts the `mcp` slice from the app state. */
function nom(state: { mcp: unknown }): unknown {
  return state.mcp;
}
// React compiler cache module and React namespaces — cross-module, keep minified names.
var VSl: { c: (slots: number) => any[] }, dWe: typeof import("react"), uWe: { jsx: (type: unknown, props: unknown) => unknown };
var KSl = b(() => {
  wee();
  qO();
  uo();
  sO();
  Vvo();
  zvo();
  S7n();
  E7n();
  A7n();
  R7n();
  VSl = x(tt(), 1), dWe = x(et(), 1), uWe = x(oe(), 1);
});

export {v7n,Qrm,Zrm,eom,tom,nom,VSl,dWe,uWe,KSl};
