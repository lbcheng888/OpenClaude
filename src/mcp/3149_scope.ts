// @ts-nocheck
import {collectFlagValueIndexes as O1,ihr as B38,logFeatureBad as vh,scalar as Eh} from "./0728_serverName.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {on as w6,Rn as S6} from "../session/0615_length.ts";
import {RH as $G} from "../config/0571_externalHttp.ts";
import {Pt as u_,Go as Fq} from "../../vendor/m632.ts";
import {getEnterpriseMcpFilePath as Uk_,getMcpConfigByName as rp,px as YZ} from "../telemetry/3148_unwrapCcrProxyUrl.ts";
import {KAr as N38,bbe as YJH} from "../../vendor/m724.ts";
import {getSettings_DEPRECATED as nq,hasSkipDangerousModePermissionPrompt as RI,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {getSessionBypassPermissionsMode as U$_,getIsNonInteractiveSession as u8,lt as w_} from "../session/0131_sent.ts";
import {xh as fw,mf as bz} from "../../vendor/m702.ts";
import {Dp as pz} from "../../vendor/m2215.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
import {Cv as hW} from "../telemetry/2217_names.ts";
// MCP scope / server-name / transport utilities.
//
// This module centralises the logic for working with Model Context Protocol
// (MCP) servers: detecting MCP-namespaced tools (`mcp__<server>__<tool>`),
// resolving a server's configuration scope (user/project/local/dynamic/…),
// classifying transport types (stdio/sse/http/ws), filtering tool/command
// collections by server, computing a stable hash of a server config for stale
// detection, and redacting/anonymising server URLs for telemetry.
//
// 1:1 restoration of the obfuscated 2.1.177 bundle: only names, types and doc
// comments have been added. All control flow, operators and string literals
// are preserved exactly.

// ---------------------------------------------------------------------------
// Cross-module helpers (names preserved exactly from the recovered bundle)
// ---------------------------------------------------------------------------

/** Sanitise a raw server name into the canonical identifier used in `mcp__<name>__` prefixes. */
declare function O1(serverName: string): string;
/** Parse an `mcp__<server>__<tool>` name into its `{ serverName, toolName }` parts (or null). */
declare function vh(toolName: string): { serverName: string; toolName: string | undefined } | null;
/** Look up the configured MCP server config by (sanitised) server name. */
declare function rp(serverName: string): McpServerConfig | undefined;
/** JSON.stringify wrapper (with telemetry span) used to produce the canonical config string. */
declare function bH(value: unknown, replacer?: (key: string, value: unknown) => unknown, space?: number): string;
/** Structured debug logger keyed by MCP server name. */
declare function w6(serverName: string, message: string): void;
/** Anonymise / hash a string into a short stable token (sha256-based) for telemetry. */
declare function pz(value: string): string;
/** Display label for the user-scope MCP config location. */
declare function $G(): string;
/** Current project (working) directory. */
declare function u_(): string;
/** Display label for the enterprise-scope MCP config location. */
declare function Uk_(): string;
/** Read the merged settings object (contains MCP allow/deny lists, etc.). */
declare function nq(): McpSettings | undefined;
/** Compare two server names for equality (plugin-aware, otherwise via sanitisation). */
declare function B38(a: string, b: string): boolean;
/** Whether project-settings overrides are enabled for the current run. */
declare function U$_(): boolean;
/** Whether the current context trusts the project (e.g. trusted folder). */
declare function RI(): boolean;
/** Whether a given settings source is writable/enabled. */
declare function fw(source: string): boolean;
/** Whether the project is running in an auto-approve context. */
declare function u8(): boolean;
/** Zod-style enum descriptor for the valid MCP scope values (`.options`). */
declare function N38(): { options: McpScope[] };
/** Lazy module-init wrapper used by the bundle. */
declare function L(init: () => void): () => void;

// Sibling-module init thunks invoked by this module's initialiser (preserved exactly).
declare function w_(): void;
declare function Fq(): void;
declare function _q(): void;
declare function hW(): void;
declare function S6(): void;
declare function bz(): void;
declare function N8(): void;
declare function H6(): void;
declare function YZ(): void;
declare function Eh(): void;
declare function YJH(): void;

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

/** A failed-connection record used by `JP6` / isRetriableConnectionFailure. */
interface McpFailedConnection {
  type: string;
  config: McpServerConfig;
  errorCode?: string;
}

// ---------------------------------------------------------------------------
// Tool identification
// ---------------------------------------------------------------------------

/** True if the given item is an MCP-provided tool (by `mcp__` name prefix or `isMcp` flag). */
function AZ(item: McpNamedItem): boolean {
  return item.name?.startsWith("mcp__") || item.isMcp === !0;
}

/** Resolve the server name for an MCP item, preferring `mcpInfo.serverName` then the name prefix. */
function M$H(item: McpNamedItem): string | undefined {
  return item.mcpInfo?.serverName ?? (item.name?.startsWith("mcp__") ? item.name.split("__")[1] : void 0);
}

/**
 * True if a failed MCP connection should be treated as retriable: the transport
 * is one of the network-based kinds and the error code is in the retriable set
 * (or, for SSE with no code, treated as retriable).
 */
function JP6(connection: McpFailedConnection): boolean {
  if (connection.type !== "failed") return !1;
  let transportType = connection.config.type ?? "";
  if (!ik3.has(transportType)) return !1;
  if (connection.errorCode !== void 0) return ag8.has(connection.errorCode);
  return transportType === "sse";
}

// ---------------------------------------------------------------------------
// Collection filtering by server
// ---------------------------------------------------------------------------

/** Return only the items whose name carries the `mcp__<server>__` prefix for the given server. */
function u7H<T extends McpNamedItem>(items: T[], serverName: string): T[] {
  let prefix = `mcp__${O1(serverName)}__`;
  return items.filter(item => item.name?.startsWith(prefix));
}

/** True if the item belongs to the given server (via `mcp__<server>__` or `<server>:` prefix). */
function $r(item: McpNamedItem, serverName: string): boolean {
  let sanitized = O1(serverName),
    name = item.name;
  if (!name) return !1;
  return name.startsWith(`mcp__${sanitized}__`) || name.startsWith(`${sanitized}:`);
}

/** Items belonging to the server, excluding MCP-loaded prompts. */
function DP6<T extends McpNamedItem>(items: T[], serverName: string): T[] {
  return items.filter(item => $r(item, serverName) && !(item.type === "prompt" && item.loadedFrom === "mcp"));
}

/** Items NOT carrying the `mcp__<server>__` prefix for the given server (i.e. remove that server's tools). */
function MP6<T extends McpNamedItem>(items: T[], serverName: string): T[] {
  let prefix = `mcp__${O1(serverName)}__`;
  return items.filter(item => !item.name?.startsWith(prefix));
}

/** Items NOT belonging to the given server (removes commands for that server). */
function U__<T extends McpNamedItem>(items: T[], serverName: string): T[] {
  return items.filter(item => !$r(item, serverName));
}

/** Return a shallow copy of the record with the given key removed (used to drop a server's resources). */
function F__<T extends Record<string, unknown>>(record: T, key: string): T {
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
function SWH(config: McpServerConfig): string {
  let {
      scope: _scope,
      pluginSource: _pluginSource,
      configError: _configError,
      ...rest
    } = config,
    normalized: McpServerConfig = rest;
  if (normalized.type === "stdio" || normalized.type === void 0 && "command" in normalized) normalized.type = "stdio", normalized.args = normalized.args ?? [];
  let serialized = bH(normalized, (_key, value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      let obj = value as Record<string, unknown>,
        sorted: Record<string, unknown> = {};
      for (let key of Object.keys(obj).sort()) sorted[key] = obj[key];
      return sorted;
    }
    return value;
  });
  return yl7.createHash("sha256").update(serialized).digest("hex").slice(0, 16);
}

/**
 * Given a current server-state snapshot and the latest desired plugin config
 * map, find dynamic plugin clients that became stale (removed, or whose config
 * hash changed) and return a new state with those clients' tools, commands,
 * resources and resource templates pruned. `stale` lists the dropped clients.
 */
function El7(
  state: McpServersState,
  desiredConfigByName: Record<string, McpServerConfig>
): McpServersState & { stale: McpClient[] } {
  let staleClients = state.clients.filter(client => {
    let desired = desiredConfigByName[client.name];
    if (!desired) {
      if (client.config.scope === "dynamic") return w6(client.name, "excludeStalePluginClients: marking stale (removed)"), !0;
      return !1;
    }
    if (SWH(client.config) !== SWH(desired)) return w6(client.name, "excludeStalePluginClients: marking stale (config hash changed)"), !0;
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
  for (let client of staleClients) tools = MP6(tools, client.name), commands = U__(commands, client.name), resources = F__(resources, client.name), delete resourceTemplates[client.name];
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
function xx(scope: McpScope | string): string {
  switch (scope) {
    case "user":
      return $G();
    case "project":
      return vl7.join(u_(), ".mcp.json");
    case "local":
      return `${$G()} [project: ${u_()}]`;
    case "dynamic":
      return "Dynamically configured";
    case "enterprise":
      return Uk_();
    case "claudeai":
      return "claude.ai";
    case "agent":
      return "agent frontmatter";
    default:
      return scope;
  }
}

/** Human-readable description of what each MCP scope means. */
function Qk_(scope: McpScope | string): string {
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
function g__(scope: string | undefined): McpScope {
  if (!scope) return "local";
  if (!N38().options.includes(scope as McpScope)) throw Error(`Invalid scope: ${scope}. Must be one of: ${N38().options.join(", ")}`);
  return scope as McpScope;
}

/** Normalise a transport-type string: default "stdio", map "streamable-http"→"http"; throws on unknown. */
function Sl7(transport: string | undefined): "stdio" | "sse" | "http" {
  if (!transport) return "stdio";
  if (transport === "streamable-http") return "http";
  if (transport !== "stdio" && transport !== "sse" && transport !== "http") throw Error(`Invalid transport type: ${transport}. Must be one of: stdio, sse, http (or streamable-http)`);
  return transport;
}

/** Parse `"Header-Name: value"` strings into a header map; throws on malformed/empty names. */
function sg8(headerLines: string[]): Record<string, string> {
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
function B__(serverName: string): McpApprovalState {
  let settings = nq();
  if (settings?.disabledMcpjsonServers?.some(name => B38(name, serverName))) return "rejected";
  if (settings?.enabledMcpjsonServers?.some(name => B38(name, serverName)) || settings?.enableAllProjectMcpServers) return "approved";
  return "pending";
}

/** Approval state including implicit approval from trusted/project-settings contexts. */
function cbH(serverName: string): McpApprovalState {
  let state = B__(serverName);
  if (state !== "pending") return state;
  if (U$_() && RI() && fw("projectSettings")) return "approved";
  if (u8() && fw("projectSettings")) return "approved";
  return "pending";
}

// ---------------------------------------------------------------------------
// Scope resolution for a tool name
// ---------------------------------------------------------------------------

/** Resolve the configured scope for an MCP tool name (null if not MCP / unknown). */
function rk3(toolName: string): McpScope | null {
  if (!AZ({
    name: toolName
  })) return null;
  let parsed = vh(toolName);
  if (!parsed) return null;
  let serverConfig = rp(parsed.serverName);
  if (!serverConfig && parsed.serverName.startsWith("claude_ai_")) return "claudeai";
  return serverConfig?.scope ?? null;
}

/** Resolve the scope for an MCP item, preferring `mcpInfo.scope` then resolving from its name. */
function tg8(item: McpNamedItem): McpScope | null {
  if (!AZ(item)) return null;
  return item.mcpInfo?.scope ?? rk3(item.name!);
}

// ---------------------------------------------------------------------------
// Transport-type predicates
// ---------------------------------------------------------------------------

/** True for a stdio server config (explicit "stdio" or unspecified type). */
function ok3(config: McpServerConfig): boolean {
  return config.type === "stdio" || config.type === void 0;
}

/** True for an SSE server config. */
function ak3(config: McpServerConfig): boolean {
  return config.type === "sse";
}

/** True for an HTTP server config. */
function sk3(config: McpServerConfig): boolean {
  return config.type === "http";
}

/** True for a WebSocket server config. */
function tk3(config: McpServerConfig): boolean {
  return config.type === "ws";
}

/** True if the transport type is one Claude Code can connect to directly. */
function eg8(config: McpServerConfig): boolean {
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
function Cl7(agents: AgentWithMcpServers[]): AgentMcpServerSummary[] {
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
  }] of byName) if (ok3(config)) result.push({
    name: serverName,
    sourceAgents,
    transport: "stdio",
    command: config.command,
    needsAuth: !1
  });else if (ak3(config)) result.push({
    name: serverName,
    sourceAgents,
    transport: "sse",
    url: config.url,
    needsAuth: !0
  });else if (sk3(config)) result.push({
    name: serverName,
    sourceAgents,
    transport: "http",
    url: config.url,
    needsAuth: !0
  });else if (tk3(config)) result.push({
    name: serverName,
    sourceAgents,
    transport: "ws",
    url: config.url,
    needsAuth: !1
  });
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// URL redaction for telemetry
// ---------------------------------------------------------------------------

/** Strip credentials/query/hash from a server config URL, returning a clean origin+path (or undefined). */
function ck_(config: McpServerConfig): string | undefined {
  if (!("url" in config) || typeof config.url !== "string") return;
  try {
    let url = new URL(config.url);
    return url.search = "", url.username = "", url.password = "", url.hash = "", url.toString().replace(/\/$/, "");
  } catch {
    return;
  }
}

/** Anonymise a value via the telemetry hash, passing through undefined. */
function $Q(value: string | undefined): string | undefined {
  return value ? pz(value) : void 0;
}

/** Anonymised, redacted form of a server config's URL for telemetry. */
function YQ(config: McpServerConfig): string | undefined {
  return $Q(ck_(config));
}

// ---------------------------------------------------------------------------
// Module-level state & lazy initialiser (preserved exactly)
// ---------------------------------------------------------------------------

var yl7: typeof import("crypto"),
  vl7: typeof import("path"),
  /** Transport types whose connection failures may be retriable. */
  ik3: Set<string>,
  /** Error codes considered retriable for MCP connection failures. */
  ag8: Set<string>;

var AV = L(() => {
  w_();
  Fq();
  _q();
  hW();
  S6();
  bz();
  N8();
  H6();
  YZ();
  Eh();
  YJH();
  yl7 = require("crypto"), vl7 = require("path"), ik3 = new Set(["http", "sse", "claudeai-proxy"]), ag8 = new Set(["500", "502", "503", "504", "ECONNREFUSED", "ETIMEDOUT", "ECONNRESET", "ENOTFOUND", "EAI_AGAIN", "ConnectionRefused", "ConnectionClosed", "FailedToOpenSocket", "23"]);
});

export {AZ as Pk,M$H as Gxe,JP6 as $kn,u7H as Mae,$r as Vz,DP6 as qkn,MP6 as jkn,U__ as Brt,F__ as Frt,SWH as Vxe,El7 as RQi,xx as l9,Qk_ as dMt,g__ as Urt,Sl7 as xQi,sg8 as H7r,B__ as Nrt,cbH as L$e,rk3 as J2d,tg8 as I7r,ok3 as X2d,ak3 as Q2d,sk3 as Z2d,tk3 as e$d,eg8 as D7r,Cl7 as kQi,ck_ as Rhe,$Q as Dq,YQ as pW,yl7 as vQi,vl7 as wQi,ik3 as Y2d,ag8 as k7r,AV as CL};
