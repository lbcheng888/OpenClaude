// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {trackClaudeInChromeTabId as h8r,bO} from "../mcp/2592_trackClaudeInChromeTabId.ts";
import {truncateToWidth as xs} from "../../vendor/m239.ts";
import {lw,a4} from "../../vendor/m2436.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {d0n,Jjr} from "../../vendor/m3024.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {getClaudeInChromePermissionOverrides as bQr,EQr} from "../../vendor/m3212.ts";
import {je} from "../../vendor/m2462.ts";
import {Xo} from "../../vendor/m240.ts";
import {oe} from "../../vendor/m2275.ts";
var jla = {};
ft(jla, {
  renderChromeToolResultMessage: () => renderChromeToolResultMessage,
  getClaudeInChromeMCPToolOverrides: () => getClaudeInChromeMCPToolOverrides
});
/**
 * Builds a short human-readable summary string for a Claude-in-Chrome MCP tool
 * invocation, derived from the tool's input arguments and which tool was called.
 *
 * @param toolInput - The raw tool-input object for the invocation.
 * @param toolName - The bare Chrome tool name (e.g. "navigate", "computer").
 * @param verbose - Whether rendering is in verbose mode (affects javascript_tool).
 * @returns A comma-joined summary, the raw script text, an empty string, or null.
 */
function formatChromeToolUseMessage(toolInput: any, toolName: string, verbose: boolean): string | null {
  let tabId = toolInput.tabId;
  if (typeof tabId === "number") h8r(tabId);
  let parts: string[] = [];
  switch (toolName) {
    case "navigate":
      if (typeof toolInput.url === "string") try {
        let parsedUrl = new URL(toolInput.url);
        parts.push(parsedUrl.hostname);
      } catch {
        parts.push(xs(toolInput.url, 30));
      }
      break;
    case "find":
      if (typeof toolInput.query === "string") parts.push(`pattern: ${xs(toolInput.query, 30)}`);
      break;
    case "computer":
      if (typeof toolInput.action === "string") {
        let action = toolInput.action;
        if (action === "left_click" || action === "right_click" || action === "double_click" || action === "middle_click") {
          if (typeof toolInput.ref === "string") parts.push(`${action} on ${toolInput.ref}`);else if (Array.isArray(toolInput.coordinate)) parts.push(`${action} at (${toolInput.coordinate.join(", ")})`);else parts.push(action);
        } else if (action === "type" && typeof toolInput.text === "string") parts.push(`type "${xs(toolInput.text, 15)}"`);else if (action === "key" && typeof toolInput.text === "string") parts.push(`key ${toolInput.text}`);else if (action === "scroll" && typeof toolInput.scroll_direction === "string") parts.push(`scroll ${toolInput.scroll_direction}`);else if (action === "wait" && typeof toolInput.duration === "number") parts.push(`wait ${toolInput.duration}s`);else if (action === "left_click_drag") parts.push("drag");else parts.push(action);
      }
      break;
    case "gif_creator":
      if (typeof toolInput.action === "string") parts.push(`${toolInput.action}`);
      break;
    case "resize_window":
      if (typeof toolInput.width === "number" && typeof toolInput.height === "number") parts.push(`${toolInput.width}x${toolInput.height}`);
      break;
    case "read_console_messages":
      if (typeof toolInput.pattern === "string") parts.push(`pattern: ${xs(toolInput.pattern, 20)}`);
      if (toolInput.onlyErrors === !0) parts.push("errors only");
      break;
    case "read_network_requests":
      if (typeof toolInput.urlPattern === "string") parts.push(`pattern: ${xs(toolInput.urlPattern, 20)}`);
      break;
    case "shortcuts_execute":
      if (typeof toolInput.shortcutId === "string") parts.push(`shortcut_id: ${toolInput.shortcutId}`);
      break;
    case "javascript_tool":
      if (verbose && typeof toolInput.text === "string") return toolInput.text;
      return "";
    case "tabs_create_mcp":
    case "tabs_context_mcp":
    case "form_input":
    case "shortcuts_list":
    case "read_page":
    case "upload_image":
    case "get_page_text":
    case "update_plan":
      return "";
  }
  return parts.join(", ") || null;
}
/**
 * Renders a "[View Tab]" link tag for a Chrome tool invocation when a valid
 * tab id is present and the feature flag is enabled.
 *
 * @param toolInput - The raw tool-input object; expected to carry a tabId.
 * @returns A JSX element linking to the tab, or null when not applicable.
 */
function renderChromeTabTag(toolInput: any): any {
  if (!lw()) return null;
  if (typeof toolInput !== "object" || toolInput === null || !("tabId" in toolInput)) return null;
  let tabId = typeof toolInput.tabId === "number" ? toolInput.tabId : typeof toolInput.tabId === "string" ? parseInt(toolInput.tabId, 10) : NaN;
  if (isNaN(tabId)) return null;
  let tabUrl = `${Dzd}${tabId}`;
  return r3e.jsxs(v, {
    children: [" ", r3e.jsx(Ss, {
      url: tabUrl,
      children: r3e.jsx(v, {
        color: "subtle",
        children: "[View Tab]"
      })
    })]
  });
}
/**
 * Renders the result message shown after a Claude-in-Chrome tool finishes.
 * In verbose mode, delegates to the full content renderer; otherwise it shows
 * a short per-tool confirmation line.
 *
 * @param toolResult - The raw tool result data.
 * @param toolName - The bare Chrome tool name.
 * @param verbose - Whether to render the full/verbose result.
 * @returns A JSX element, or null when there is nothing to show.
 */
function renderChromeToolResultMessage(toolResult: any, toolName: string, verbose: boolean): any {
  if (verbose) return d0n(toolResult, [], {
    verbose: verbose
  });
  let resultLabel: string | null = null;
  switch (toolName) {
    case "navigate":
      resultLabel = "Navigation completed";
      break;
    case "tabs_create_mcp":
      resultLabel = "Tab created";
      break;
    case "tabs_context_mcp":
      resultLabel = "Tabs read";
      break;
    case "form_input":
      resultLabel = "Input completed";
      break;
    case "computer":
      resultLabel = "Action completed";
      break;
    case "resize_window":
      resultLabel = "Window resized";
      break;
    case "find":
      resultLabel = "Search completed";
      break;
    case "gif_creator":
      resultLabel = "GIF action completed";
      break;
    case "read_console_messages":
      resultLabel = "Console messages retrieved";
      break;
    case "read_network_requests":
      resultLabel = "Network requests retrieved";
      break;
    case "shortcuts_list":
      resultLabel = "Shortcuts retrieved";
      break;
    case "shortcuts_execute":
      resultLabel = "Shortcut executed";
      break;
    case "javascript_tool":
      resultLabel = "Script executed";
      break;
    case "read_page":
      resultLabel = "Page read";
      break;
    case "upload_image":
      resultLabel = "Image uploaded";
      break;
    case "get_page_text":
      resultLabel = "Page text retrieved";
      break;
    case "update_plan":
      resultLabel = "Plan updated";
      break;
  }
  if (resultLabel) return r3e.jsx(Yn, {
    height: 1,
    children: r3e.jsx(v, {
      dimColor: !0,
      children: resultLabel
    })
  });
  return null;
}
/**
 * Produces the tool-override descriptor for a given Claude-in-Chrome MCP tool,
 * supplying its user-facing name and the various render hooks.
 *
 * @param toolName - The bare Chrome tool name being wrapped.
 * @returns An override object merged with the tool's base overrides.
 */
function getClaudeInChromeMCPToolOverrides(toolName: string) {
  return {
    userFacingName(this: void, _arg: unknown): string {
      return `Claude in Chrome[${toolName.replace(/_mcp$/, "")}]`;
    },
    renderToolUseMessage(this: void, toolInput: any, {
      verbose: verbose
    }: { verbose: boolean }) {
      return formatChromeToolUseMessage(toolInput, toolName, verbose);
    },
    renderToolUseTag(this: void, toolInput: any) {
      return renderChromeTabTag(toolInput);
    },
    renderToolResultMessage(this: void, toolResult: any, _arg: unknown, {
      verbose: verbose
    }: { verbose: boolean }) {
      if (!isNonNullObject(toolResult)) return null;
      return renderChromeToolResultMessage(toolResult, toolName, verbose);
    },
    ...bQr(toolName)
  };
}
/**
 * Narrowing guard: true when the value is a non-null object.
 */
function isNonNullObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
var r3e: any,
  Dzd = "https://clau.de/chrome/tab/";
var Yla = b(() => {
  Pl();
  a4();
  je();
  Jjr();
  Xo();
  bO();
  EQr();
  r3e = x(oe(), 1);
});

export {jla,formatChromeToolUseMessage as Pzd,renderChromeTabTag as Ozd,renderChromeToolResultMessage,getClaudeInChromeMCPToolOverrides,isNonNullObject as Mzd,r3e,Dzd,Yla};
