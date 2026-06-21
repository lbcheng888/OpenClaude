// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {trackClaudeInChromeTabId as V9r,oL as zO} from "../mcp/2581_trackClaudeInChromeTabId.ts";
import {truncateToWidth as Vs} from "../../vendor/m237.ts";
import {JR as zR,U4 as R4} from "../../vendor/m2426.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {Sxn as NRn,fGr as bWr} from "../../vendor/m3011.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {getClaudeInChromePermissionOverrides as W7r,UKr as G7r} from "../../vendor/m3196.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {ps as ds} from "../../vendor/m238.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var ge = {};
pt(ge, {
  renderChromeToolResultMessage: () => renderChromeToolUseTag,
  getClaudeInChromeMCPToolOverrides: () => renderChromeToolResultMessage
});
function v$d(e, t, n) {
  let r = e.tabId;
  if (typeof r === "number") V9r(r);
  let o = [];
  switch (t) {
    case "navigate":
      if (typeof e.url === "string") try {
        let s = new URL(e.url);
        o.push(s.hostname);
      } catch {
        o.push(Vs(e.url, 30));
      }
      break;
    case "find":
      if (typeof e.query === "string") o.push(`pattern: ${Vs(e.query, 30)}`);
      break;
    case "computer":
      if (typeof e.action === "string") {
        let s = e.action;
        if (s === "left_click" || s === "right_click" || s === "double_click" || s === "middle_click") {
          if (typeof e.ref === "string") o.push(`${s} on ${e.ref}`);else if (Array.isArray(e.coordinate)) o.push(`${s} at (${e.coordinate.join(", ")})`);else o.push(s);
        } else if (s === "type" && typeof e.text === "string") o.push(`type "${Vs(e.text, 15)}"`);else if (s === "key" && typeof e.text === "string") o.push(`key ${e.text}`);else if (s === "scroll" && typeof e.scroll_direction === "string") o.push(`scroll ${e.scroll_direction}`);else if (s === "wait" && typeof e.duration === "number") o.push(`wait ${e.duration}s`);else if (s === "left_click_drag") o.push("drag");else o.push(s);
      }
      break;
    case "gif_creator":
      if (typeof e.action === "string") o.push(`${e.action}`);
      break;
    case "resize_window":
      if (typeof e.width === "number" && typeof e.height === "number") o.push(`${e.width}x${e.height}`);
      break;
    case "read_console_messages":
      if (typeof e.pattern === "string") o.push(`pattern: ${Vs(e.pattern, 20)}`);
      if (e.onlyErrors === true) o.push("errors only");
      break;
    case "read_network_requests":
      if (typeof e.urlPattern === "string") o.push(`pattern: ${Vs(e.urlPattern, 20)}`);
      break;
    case "shortcuts_execute":
      if (typeof e.shortcutId === "string") o.push(`shortcut_id: ${e.shortcutId}`);
      break;
    case "javascript_tool":
      if (n && typeof e.text === "string") return e.text;
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
  return o.join(", ") || null;
}
function renderChromeToolUseMessage(input) {
  if (!zR()) return null;
  if (typeof input !== "object" || input === null || !("tabId" in input)) return null;
  let t = typeof input.tabId === "number" ? input.tabId : typeof input.tabId === "string" ? parseInt(input.tabId, 10) : NaN;
  if (isNaN(t)) return null;
  let n = `${CHROME_TAB_URL_PREFIX}${t}`;
  return ge_2.createElement(w, null, " ", ge_2.createElement(Fs, {
    url: n
  }, ge_2.createElement(w, {
    color: "subtle"
  }, "[View Tab]")));
}
function renderChromeToolUseTag(input, t, n) {
  if (n) return NRn(input, [], {
    verbose: n
  });
  let r = null;
  switch (t) {
    case "navigate":
      r = "Navigation completed";
      break;
    case "tabs_create_mcp":
      r = "Tab created";
      break;
    case "tabs_context_mcp":
      r = "Tabs read";
      break;
    case "form_input":
      r = "Input completed";
      break;
    case "computer":
      r = "Action completed";
      break;
    case "resize_window":
      r = "Window resized";
      break;
    case "find":
      r = "Search completed";
      break;
    case "gif_creator":
      r = "GIF action completed";
      break;
    case "read_console_messages":
      r = "Console messages retrieved";
      break;
    case "read_network_requests":
      r = "Network requests retrieved";
      break;
    case "shortcuts_list":
      r = "Shortcuts retrieved";
      break;
    case "shortcuts_execute":
      r = "Shortcut executed";
      break;
    case "javascript_tool":
      r = "Script executed";
      break;
    case "read_page":
      r = "Page read";
      break;
    case "upload_image":
      r = "Image uploaded";
      break;
    case "get_page_text":
      r = "Page text retrieved";
      break;
    case "update_plan":
      r = "Plan updated";
      break;
  }
  if (r) return ge_2.createElement(qn, {
    height: 1
  }, ge_2.createElement(w, {
    dimColor: true
  }, r));
  return null;
}
function renderChromeToolResultMessage(result) {
  return {
    userFacingName(t) {
      return `Claude in Chrome[${result.replace(/_mcp$/, "")}]`;
    },
    renderToolUseMessage(t, {
      verbose: n
    }) {
      return v$d(t, result, n);
    },
    renderToolUseTag(t) {
      return renderChromeToolUseMessage(t);
    },
    renderToolResultMessage(t, n, {
      verbose: r
    }) {
      if (!getClaudeInChromeMCPToolOverrides(t)) return null;
      return renderChromeToolUseTag(t, result, r);
    },
    ...W7r(result)
  };
}
function getClaudeInChromeMCPToolOverrides(toolName) {
  return typeof toolName === "object" && toolName !== null;
}
var ge_2,
  CHROME_TAB_URL_PREFIX = "https://clau.de/chrome/tab/";
var Cr7 = b(() => {
  rc();
  R4();
  Je();
  bWr();
  ds();
  zO();
  G7r();
  ge_2 = L(Te(), 1);
});

export {ge as jta,v$d as z3d,renderChromeToolUseMessage as Y3d,renderChromeToolUseTag as renderChromeToolResultMessage,renderChromeToolResultMessage as getClaudeInChromeMCPToolOverrides,getClaudeInChromeMCPToolOverrides as X3d,ge_2 as Fee,CHROME_TAB_URL_PREFIX as K3d,Cr7 as Wta};
