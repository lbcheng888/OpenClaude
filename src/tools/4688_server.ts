// @ts-nocheck
import {_t,uo} from "../../vendor/m2468.ts";
import {Mae,qO} from "../mcp/3159_scope.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {rsn,osn,T0} from "../mcp/0733_serverName.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {wl,sy} from "../../vendor/m2585.ts";
import {hr} from "../../vendor/m2573.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {b,x} from "../../runtime.ts";
import {TS} from "../../vendor/m4541.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * MCP server tool-picker screen.
 *
 * Renders a selectable list of the tools exposed by a single MCP
 * (Model Context Protocol) server. Tools blocked by organization policy are
 * sorted to the bottom and rendered disabled; the remaining tools are shown as
 * selectable options annotated with capability tags (read-only, destructive,
 * open-world, ask-only). Selecting a tool invokes `onSelectTool`; cancelling
 * invokes `onBack`.
 *
 * This is a React function component compiled with the React Compiler: the
 * leading `GSl.c(24)` allocates a memo cache (`t`) and every block guards a
 * computation against changes in its dependencies. Structure is preserved
 * verbatim; only locals are renamed and typed.
 */

/** Capability/permission metadata derived from an MCP tool definition. */
interface McpToolPermissionInfo {
  /** Effective maximum permission for this tool, e.g. "blocked" or "ask". */
  effectiveMaxPermission?: string;
}

/** Minimal shape of an MCP tool as consumed by this picker. */
interface McpTool {
  /** Internal tool name. */
  name: string;
  /** Returns the user-facing display name, if defined. */
  userFacingName?: (ctx: Record<string, unknown>) => string;
  /** Whether the tool only reads state. */
  isReadOnly?: (ctx: Record<string, unknown>) => boolean | undefined;
  /** Whether the tool can mutate/delete state. */
  isDestructive?: (ctx: Record<string, unknown>) => boolean | undefined;
  /** Whether the tool reaches outside the local workspace. */
  isOpenWorld?: (ctx: Record<string, unknown>) => boolean | undefined;
  /** Permission metadata sourced from MCP config/policy. */
  mcpInfo?: McpToolPermissionInfo;
}

/** Minimal shape of the MCP server passed to this component. */
interface McpServer {
  /** Configured server name. */
  name: string;
  /** Client connection info; only `"connected"` servers expose tools. */
  client: { type: string;[key: string]: unknown };
  [key: string]: unknown;
}

/** Option entry produced for the select list. */
interface ToolSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  description?: string;
  descriptionColor?: string;
}

/** Props for the MCP server tool-picker component. */
interface McpServerToolsProps {
  server: McpServer;
  onSelectTool: (tool: McpTool) => void;
  onBack: () => void;
}

function bWt(props: McpServerToolsProps) {
  let cache = GSl.c(24),
    {
      server,
      onSelectTool,
      onBack
    } = props,
    allTools = _t(Xrm),
    visibleTools: McpTool[];
  e: {
    if (server.client.type !== "connected") {
      let empty: McpTool[];
      if (cache[0] === Symbol.for("react.memo_cache_sentinel")) empty = [], cache[0] = empty;else empty = cache[0];
      visibleTools = empty;
      break e;
    }
    let sorted: McpTool[];
    if (cache[1] !== allTools || cache[2] !== server.name) sorted = Mae(allTools, server.name).sort(Jrm), cache[1] = allTools, cache[2] = server.name, cache[3] = sorted;else sorted = cache[3];
    visibleTools = sorted;
  }
  let tools = visibleTools,
    blockedCount = zn(tools, Yrm),
    options: ToolSelectOption[];
  if (cache[4] !== server.name || cache[5] !== tools) {
    let buildOption: (tool: McpTool, index: number) => ToolSelectOption;
    if (cache[7] !== server.name) buildOption = (tool, index) => {
      let internalName = rsn(tool.name, server.name),
        rawLabel = tool.userFacingName ? tool.userFacingName({}) : internalName,
        label = osn(rawLabel),
        isReadOnly = tool.isReadOnly?.({}) ?? !1,
        isDestructive = tool.isDestructive?.({}) ?? !1,
        isOpenWorld = tool.isOpenWorld?.({}) ?? !1,
        maxPermission = tool.mcpInfo?.effectiveMaxPermission;
      if (maxPermission === "blocked") return {
        label: label,
        value: index.toString(),
        disabled: !0,
        description: "disabled by your organization",
        descriptionColor: "warning"
      };
      let tags: string[] = [];
      if (isReadOnly) tags.push("read-only");
      if (isDestructive) tags.push("destructive");
      if (isOpenWorld) tags.push("open-world");
      if (maxPermission === "ask") tags.push("ask-only");
      return {
        label: label,
        value: index.toString(),
        description: tags.length > 0 ? tags.join(", ") : void 0
      };
    }, cache[7] = server.name, cache[8] = buildOption;else buildOption = cache[8];
    options = tools.map(buildOption), cache[4] = server.name, cache[5] = tools, cache[6] = options;
  } else options = cache[6];
  let toolOptions = options,
    enabledCount = tools.length - blockedCount,
    subtitleText: string;
  if (cache[9] !== blockedCount || cache[10] !== enabledCount || cache[11] !== tools.length) subtitleText = blockedCount > 0 ? `${enabledCount} ${Sn(enabledCount, "tool")} \xB7 ${blockedCount} disabled by your organization` : `${tools.length} ${Sn(tools.length, "tool")}`, cache[9] = blockedCount, cache[10] = enabledCount, cache[11] = tools.length, cache[12] = subtitleText;else subtitleText = cache[12];
  let subtitle = subtitleText,
    title = `Tools for ${server.name}`,
    inputGuide: unknown;
  if (cache[13] === Symbol.for("react.memo_cache_sentinel")) inputGuide = HTe.jsxs(bn, {
    children: [HTe.jsx(at, {
      chord: ["up", "down"],
      action: "navigate"
    }), HTe.jsx(at, {
      chord: "enter",
      action: "select"
    }), HTe.jsx(dr, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "back"
    })]
  }), cache[13] = inputGuide;else inputGuide = cache[13];
  let body: unknown;
  if (cache[14] !== onBack || cache[15] !== onSelectTool || cache[16] !== tools || cache[17] !== toolOptions) body = tools.length === 0 ? HTe.jsx(wl, {
    children: "No tools available"
  }) : HTe.jsx(hr, {
    options: toolOptions,
    onChange: (value: string) => {
      let selected = tools[parseInt(value)];
      if (selected) onSelectTool(selected);
    },
    onCancel: onBack
  }), cache[14] = onBack, cache[15] = onSelectTool, cache[16] = tools, cache[17] = toolOptions, cache[18] = body;else body = cache[18];
  let screen: unknown;
  if (cache[19] !== onBack || cache[20] !== subtitle || cache[21] !== title || cache[22] !== body) screen = HTe.jsx(Jn, {
    title: title,
    subtitle: subtitle,
    onCancel: onBack,
    inputGuide: inputGuide,
    children: body
  }), cache[19] = onBack, cache[20] = subtitle, cache[21] = title, cache[22] = body, cache[23] = screen;else screen = cache[23];
  return screen;
}
/** Predicate: tool is blocked by organization policy. */
function Yrm(tool: McpTool) {
  return tool.mcpInfo?.effectiveMaxPermission === "blocked";
}
/** Comparator: sort blocked tools after non-blocked ones (stable). */
function Jrm(a: McpTool, b: McpTool) {
  let aBlocked = a.mcpInfo?.effectiveMaxPermission === "blocked" ? 1 : 0,
    bBlocked = b.mcpInfo?.effectiveMaxPermission === "blocked" ? 1 : 0;
  return aBlocked - bBlocked;
}
/** Selector: read the MCP tools list from context state. */
function Xrm(state: { mcp: { tools: McpTool[] } }) {
  return state.mcp.tools;
}
var GSl: any, HTe: any;
var R7n = b(() => {
  T0();
  qO();
  uo();
  lr();
  uc();
  TS();
  Is();
  di();
  sy();
  Wo();
  GSl = x(tt(), 1), HTe = x(oe(), 1);
});

export {bWt,Yrm,Jrm,Xrm,GSl,HTe,R7n};
