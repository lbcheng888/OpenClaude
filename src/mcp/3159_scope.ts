// @ts-nocheck
import {ac,LSr,sI,T0} from "./0733_serverName.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {ln,vn} from "../session/0621_length.ts";
import {nI} from "../config/0577_externalHttp.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {getEnterpriseMcpFilePath as MNt,getMcpConfigByName as I$,KA} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {CSr,oCe} from "../../vendor/m729.ts";
import {getSettings_DEPRECATED as $o,hasSkipDangerousModePermissionPrompt as c2,br} from "../config/0745_updateSettingsForSource.ts";
import {getSessionBypassPermissionsMode as HSt,getIsNonInteractiveSession as kr,lt} from "../session/0132_sent.ts";
import {xh,wm} from "../../vendor/m707.ts";
import {ep} from "../../vendor/m2223.ts";
import {ZZe,eet} from "../../vendor/m2198.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {IA} from "../telemetry/2225_names.ts";
// @ts-nocheck
// MCP scope / server-name / transport utilities.
//
// This module centralises the logic for working with Model Context Protocol
// (MCP) servers: detecting MCP-namespaced tools (`mcp__<server>__<tool>`),
// resolving a server's configuration scope (user/project/local/dynamic/…),
// classifying transport types (stdio/sse/http/ws), filtering tool/command
// collections by server, computing a stable hash of a server config for stale
// detection, and redacting/anonymising server URLs for telemetry.
//
// 1:1 restoration of the obfuscated 2.1.190 bundle: only names, types and doc
// comments have been added. All control flow, operators and string literals
// are preserved exactly.

// ---------------------------------------------------------------------------
// Domain types (inferred from usage; opaque where genuinely unknown)
// ---------------------------------------------------------------------------

/** Configuration scope a server / setting can originate from. */
type McpScope =
  | "user"
  | "project"
  | "local"
  | "dynamic"
  | "enterprise"
  | "claudeai"
  | "agent";

/** Transport kinds an MCP server config may declare. */
type McpTransportType =
  | "stdio"
  | "sse"
  | "http"
  | "ws"
  | "sdk"
  | "sse-ide"
  | "ws-ide"
  | "claudeai-proxy"
  | undefined;

/** A minimal view of an MCP server configuration object. */
interface McpServerConfig {
  type?: McpTransportType;
  command?: string;
  args?: string[];
  url?: string;
  scope?: McpScope | "dynamic";
  pluginSource?: unknown;
  configError?: unknown;
  errorCode?: string;
  [key: string]: unknown;
}

/** A connected MCP client paired with its config. */
interface McpClient {
  name: string;
  config: McpServerConfig;
}

/** Tool / command / prompt descriptor as tracked in MCP collections. */
interface McpNamedItem {
  name?: string;
  isMcp?: boolean;
  type?: string;
  loadedFrom?: string;
  mcpInfo?: { serverName?: string; scope?: McpScope; toolName?: string };
}

/** Merged settings relevant to MCP server approval. */
interface McpSettings {
  disabledMcpjsonServers?: string[];
  enabledMcpjsonServers?: string[];
  enableAllProjectMcpServers?: boolean;
}

/** Approval state of a project-scoped MCP server. */
type McpApprovalState = "approved" | "rejected" | "pending";

/** An aggregated MCP-server state snapshot (clients + derived collections). */
interface McpServersState {
  clients: McpClient[];
  tools: McpNamedItem[];
  commands: McpNamedItem[];
  resources: Record<string, unknown>;
  resourceTemplates: Record<string, unknown>;
}

/** A failed-connection record used by `Ixn` / isRetriableConnectionFailure. */
interface McpFailedConnection {
  type: string;
  config: McpServerConfig;
  errorCode?: string;
}

// ---------------------------------------------------------------------------
// Tool identification
// ---------------------------------------------------------------------------

/** True if the given item is an MCP-provided tool (by `mcp__` name prefix or `isMcp` flag). */
function Zk(item: McpNamedItem): boolean {
  return item.name?.startsWith("mcp__") || item.isMcp === !0;
}

/** Resolve the server name for an MCP item, preferring `mcpInfo.serverName` then the name prefix. */
function OHe(item: McpNamedItem): string | undefined {
  return item.mcpInfo?.serverName ?? (item.name?.startsWith("mcp__") ? item.name.split("__")[1] : void 0);
}

/**
 * True if a failed MCP connection should be treated as retriable: the transport
 * is one of the network-based kinds and the error code is in the retriable set
 * (or, for SSE with no code, treated as retriable).
 */
function Ixn(connection: McpFailedConnection): boolean {
  if (connection.type !== "failed") return !1;
  let transportType = connection.config.type ?? "";
  if (!HVd.has(transportType)) return !1;
  if (connection.errorCode !== void 0) return cXr.has(connection.errorCode);
  return transportType === "sse";
}

// ---------------------------------------------------------------------------
// Collection filtering by server
// ---------------------------------------------------------------------------

/** Return only the items whose name carries the `mcp__<server>__` prefix for the given server. */
function Mae<T extends McpNamedItem>(items: T[], serverName: string): T[] {
  let prefix = `mcp__${ac(serverName)}__`;
  return items.filter(item => item.name?.startsWith(prefix));
}

/** True if the item belongs to the given server (via `mcp__<server>__` or `<server>:` prefix). */
function D$(item: McpNamedItem, serverName: string): boolean {
  let sanitized = ac(serverName),
    name = item.name;
  if (!name) return !1;
  return name.startsWith(`mcp__${sanitized}__`) || name.startsWith(`${sanitized}:`);
}

/** Items belonging to the server, excluding MCP-loaded prompts. */
function xxn<T extends McpNamedItem>(items: T[], serverName: string): T[] {
  return items.filter(item => D$(item, serverName) && !(item.type === "prompt" && item.loadedFrom === "mcp"));
}

/** Items NOT carrying the `mcp__<server>__` prefix for the given server (i.e. remove that server's tools). */
function Dxn<T extends McpNamedItem>(items: T[], serverName: string): T[] {
  let prefix = `mcp__${ac(serverName)}__`;
  return items.filter(item => !item.name?.startsWith(prefix));
}

/** Items NOT belonging to the given server (removes commands for that server). */
function Bst<T extends McpNamedItem>(items: T[], serverName: string): T[] {
  return items.filter(item => !D$(item, serverName));
}

/** Return a shallow copy of the record with the given key removed (used to drop a server's resources). */
function Ust<T extends Record<string, unknown>>(record: T, key: string): T {
  let copy = {
    ...record
  };
  return delete copy[key], copy;
}

// ---------------------------------------------------------------------------
// Config hashing & stale detection
// ---------------------------------------------------------------------------

/**
 * Compute a stable 16-char sha256 hash of an MCP server config, ignoring the
 * `scope`, `pluginSource` and `configError` fields and normalising stdio
 * defaults. Object keys are sorted so the hash is order-independent. Used to
 * detect when a plugin-provided server's config has changed.
 */
function LHe(config: McpServerConfig): string {
  let {
      scope: _scope,
      pluginSource: _pluginSource,
      configError: _configError,
      ...rest
    } = config,
    normalized: McpServerConfig = rest;
  if (normalized.type === "stdio" || normalized.type === void 0 && "command" in normalized) normalized.type = "stdio", normalized.args = normalized.args ?? [];
  let serialized = Pe(normalized, (_key, value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      let obj = value as Record<string, unknown>,
        sorted: Record<string, unknown> = {};
      for (let key of Object.keys(obj).sort()) sorted[key] = obj[key];
      return sorted;
    }
    return value;
  });
  return _sa.createHash("sha256").update(serialized).digest("hex").slice(0, 16);
}

/**
 * Given a current server-state snapshot and the latest desired plugin config
 * map, find dynamic plugin clients that became stale (removed, or whose config
 * hash changed) and return a new state with those clients' tools, commands,
 * resources and resource templates pruned. `stale` lists the dropped clients.
 */
function Tsa(
  state: McpServersState,
  desiredConfigByName: Record<string, McpServerConfig>
): McpServersState & { stale: McpClient[] } {
  let staleClients = state.clients.filter(client => {
    let desired = desiredConfigByName[client.name];
    if (!desired) {
      if (client.config.scope === "dynamic") return ln(client.name, "excludeStalePluginClients: marking stale (removed)"), !0;
      return !1;
    }
    if (LHe(client.config) !== LHe(desired)) return ln(client.name, "excludeStalePluginClients: marking stale (config hash changed)"), !0;
    return !1;
  });
  if (staleClients.length === 0) return {
    ...state,
    stale: []
  };
  let {
      tools,
      commands,
      resources
    } = state,
    resourceTemplates = {
      ...state.resourceTemplates
    };
  for (let client of staleClients) tools = Dxn(tools, client.name), commands = Bst(commands, client.name), resources = Ust(resources, client.name), delete resourceTemplates[client.name];
  let staleNames = new Set(staleClients.map(client => client.name));
  return {
    clients: state.clients.filter(client => !staleNames.has(client.name)),
    tools,
    commands,
    resources,
    resourceTemplates,
    stale: staleClients
  };
}

// ---------------------------------------------------------------------------
// Scope labels
// ---------------------------------------------------------------------------

/** Short location/source label for an MCP scope (e.g. a file path or origin description). */
function lB(scope: McpScope | string): string {
  switch (scope) {
    case "user":
      return nI();
    case "project":
      return ysa.join(Lt(), ".mcp.json");
    case "local":
      return `${nI()} [project: ${Lt()}]`;
    case "dynamic":
      return "Dynamically configured";
    case "enterprise":
      return MNt();
    case "claudeai":
      return "claude.ai";
    case "agent":
      return "agent frontmatter";
    default:
      return scope;
  }
}

/** Human-readable description of what each MCP scope means. */
function UNt(scope: McpScope | string): string {
  switch (scope) {
    case "local":
      return "Local config (private to you in this project)";
    case "project":
      return "Project config (shared via .mcp.json)";
    case "user":
      return "User config (available in all your projects)";
    case "dynamic":
      return "Dynamic config (from command line)";
    case "enterprise":
      return "Enterprise config (managed by your organization)";
    case "claudeai":
      return "claude.ai config";
    case "agent":
      return "Agent config (from agent frontmatter)";
    default:
      return scope;
  }
}

// ---------------------------------------------------------------------------
// Scope / transport / header parsing
// ---------------------------------------------------------------------------

/** Validate and normalise a scope string, defaulting to "local"; throws on unknown scope. */
function $st(scope: string | undefined): McpScope {
  if (!scope) return "local";
  if (!CSr().options.includes(scope as McpScope)) throw Error(`Invalid scope: ${scope}. Must be one of: ${CSr().options.join(", ")}`);
  return scope as McpScope;
}

/** Normalise a transport-type string: default "stdio", map "streamable-http"→"http"; throws on unknown. */
function Ssa(transport: string | undefined): "stdio" | "sse" | "http" {
  if (!transport) return "stdio";
  if (transport === "streamable-http") return "http";
  if (transport !== "stdio" && transport !== "sse" && transport !== "http") throw Error(`Invalid transport type: ${transport}. Must be one of: stdio, sse, http (or streamable-http)`);
  return transport;
}

/** Parse `"Header-Name: value"` strings into a header map; throws on malformed/empty names. */
function uXr(headerLines: string[]): Record<string, string> {
  let headers: Record<string, string> = {};
  for (let line of headerLines) {
    let colonIndex = line.indexOf(":");
    if (colonIndex === -1) throw Error(`Invalid header format: "${line}". Expected format: "Header-Name: value"`);
    let name = line.substring(0, colonIndex).trim(),
      value = line.substring(colonIndex + 1).trim();
    if (!name) throw Error(`Invalid header: "${line}". Header name cannot be empty.`);
    headers[name] = value;
  }
  return headers;
}

// ---------------------------------------------------------------------------
// Project-server approval
// ---------------------------------------------------------------------------

/** Approval state of a project (.mcp.json) server from explicit allow/deny lists. */
function BNt(serverName: string): McpApprovalState {
  let settings = $o();
  if (settings?.disabledMcpjsonServers?.some(name => LSr(name, serverName))) return "rejected";
  if (settings?.enabledMcpjsonServers?.some(name => LSr(name, serverName)) || settings?.enableAllProjectMcpServers) return "approved";
  return "pending";
}

/** Approval state including implicit approval from trusted/project-settings contexts. */
function B9e(serverName: string): McpApprovalState {
  let state = BNt(serverName);
  if (state !== "pending") return state;
  if (HSt() && c2() && xh("projectSettings")) return "approved";
  if (kr() && xh("projectSettings")) return "approved";
  return "pending";
}

// ---------------------------------------------------------------------------
// Scope resolution for a tool name
// ---------------------------------------------------------------------------

/** Resolve the configured scope for an MCP tool name (null if not MCP / unknown). */
function IVd(toolName: string): McpScope | null {
  if (!Zk({
    name: toolName
  })) return null;
  let parsed = sI(toolName);
  if (!parsed) return null;
  let serverConfig = I$(parsed.serverName);
  if (!serverConfig && parsed.serverName.startsWith("claude_ai_")) return "claudeai";
  return serverConfig?.scope ?? null;
}

/** Resolve the scope for an MCP item, preferring `mcpInfo.scope` then resolving from its name. */
function dXr(item: McpNamedItem): McpScope | null {
  if (!Zk(item)) return null;
  return item.mcpInfo?.scope ?? IVd(item.name!);
}

// ---------------------------------------------------------------------------
// Transport-type predicates
// ---------------------------------------------------------------------------

/** True for a stdio server config (explicit "stdio" or unspecified type). */
function xVd(config: McpServerConfig): boolean {
  return config.type === "stdio" || config.type === void 0;
}

/** True for an SSE server config. */
function DVd(config: McpServerConfig): boolean {
  return config.type === "sse";
}

/** True for an HTTP server config. */
function PVd(config: McpServerConfig): boolean {
  return config.type === "http";
}

/** True for a WebSocket server config. */
function OVd(config: McpServerConfig): boolean {
  return config.type === "ws";
}

/** True if the transport type is one Claude Code can connect to directly. */
function pXr(config: McpServerConfig): boolean {
  switch (config.type) {
    case void 0:
    case "stdio":
    case "sse":
    case "http":
    case "sdk":
      return !0;
    case "ws":
    case "sse-ide":
    case "ws-ide":
    case "claudeai-proxy":
      return !1;
    default:
      return !1;
  }
}

// ---------------------------------------------------------------------------
// Agent-frontmatter server collection
// ---------------------------------------------------------------------------

/** A single agent definition carrying its inline MCP server declarations. */
interface AgentWithMcpServers {
  agentType: string;
  mcpServers?: Array<string | Record<string, McpServerConfig>>;
}

/** A summarised agent-sourced MCP server entry (one per unique server name). */
interface AgentMcpServerSummary {
  name: string;
  sourceAgents: string[];
  transport: "stdio" | "sse" | "http" | "ws";
  command?: string;
  url?: string;
  needsAuth: boolean;
}

/**
 * Collect and de-duplicate MCP servers declared in agent frontmatter, merging
 * the contributing agent types per server, classifying transport, flagging
 * which need auth, and returning the list sorted by server name.
 */
function bsa(agents: AgentWithMcpServers[]): AgentMcpServerSummary[] {
  let byName = new Map<string, { config: McpServerConfig; sourceAgents: string[] }>();
  for (let agent of agents) {
    if (!agent.mcpServers?.length) continue;
    for (let entry of agent.mcpServers) {
      if (typeof entry === "string") continue;
      let pairs = Object.entries(entry);
      if (pairs.length !== 1) continue;
      let [serverName, serverConfig] = pairs[0],
        existing = byName.get(serverName);
      if (existing) {
        if (!existing.sourceAgents.includes(agent.agentType)) existing.sourceAgents.push(agent.agentType);
      } else byName.set(serverName, {
        config: {
          ...serverConfig,
          name: serverName
        },
        sourceAgents: [agent.agentType]
      });
    }
  }
  let result: AgentMcpServerSummary[] = [];
  for (let [serverName, {
    config,
    sourceAgents
  }] of byName) if (xVd(config)) result.push({
    name: serverName,
    sourceAgents,
    transport: "stdio",
    command: config.command,
    needsAuth: !1
  });else if (DVd(config)) result.push({
    name: serverName,
    sourceAgents,
    transport: "sse",
    url: config.url,
    needsAuth: !0
  });else if (PVd(config)) result.push({
    name: serverName,
    sourceAgents,
    transport: "http",
    url: config.url,
    needsAuth: !0
  });else if (OVd(config)) result.push({
    name: serverName,
    sourceAgents,
    transport: "ws",
    url: config.url,
    needsAuth: !1
  });
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// URL anonymisation helpers for telemetry
// ---------------------------------------------------------------------------

/** Anonymise a value via the telemetry hash, passing through undefined. */
function z4(value: string | undefined): string | undefined {
  return value ? ep(value) : void 0;
}

/** Anonymised, redacted form of a server config's URL for telemetry. */
function j4(config: McpServerConfig): string | undefined {
  return z4(ZZe(config));
}

// ---------------------------------------------------------------------------
// Module-level state & lazy initialiser (preserved exactly)
// ---------------------------------------------------------------------------

var _sa: typeof import("crypto"),
  ysa: typeof import("path"),
  /** Transport types whose connection failures may be retriable. */
  HVd: Set<string>,
  /** Error codes considered retriable for MCP connection failures. */
  cXr: Set<string>;

var qO = b(() => {
  lt();
  Po();
  Ir();
  IA();
  vn();
  wm();
  br();
  tn();
  KA();
  T0();
  oCe();
  eet();
  _sa = require("crypto"), ysa = require("path"), HVd = new Set(["http", "sse", "claudeai-proxy"]), cXr = new Set(["500", "502", "503", "504", "ECONNREFUSED", "ETIMEDOUT", "ECONNRESET", "ENOTFOUND", "EAI_AGAIN", "ConnectionRefused", "ConnectionClosed", "FailedToOpenSocket", "23"]);
});

export {Zk,OHe,Ixn,Mae,D$,xxn,Dxn,Bst,Ust,LHe,Tsa,lB,UNt,$st,Ssa,uXr,BNt,B9e,IVd,dXr,xVd,DVd,PVd,OVd,pXr,bsa,z4,j4 as formatTokenCount,_sa,ysa,HVd,cXr,qO};
