// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {h9r,cO} from "../telemetry/2249_cO.ts";
import {getInitialSettings as Fr,br} from "./0745_updateSettingsForSource.ts";
import {b} from "../../runtime.ts";
/**
 * Extracts text emitted by terminal MCP tools from an assistant message.
 *
 * Reads the comma-separated CLAUDE_CODE_TERMINAL_MCP_TOOLS env var to learn
 * which `tool_use` blocks are "terminal MCP" tools, then concatenates their
 * `input.text` strings (one per line).
 */
function pWn(assistantMessage: {
  message: { content: unknown };
}): string {
  let content = assistantMessage.message.content;
  if (!Array.isArray(content)) return "";
  let terminalMcpToolNames = new Set(
    (process.env.CLAUDE_CODE_TERMINAL_MCP_TOOLS ?? "")
      .split(",")
      .map(toolName => toolName.trim())
      .filter(Boolean),
  );
  if (terminalMcpToolNames.size === 0) return "";
  return content
    .map(block => {
      if (block.type !== "tool_use" || !terminalMcpToolNames.has(block.name)) return "";
      let inputText = block.input?.text;
      return typeof inputText === "string" ? inputText : "";
    })
    .filter(Boolean).join(`
`);
}

/** Reads the "tengu_onyx_plover" feature-gate / experiment config. */
function dsl() {
  return it("tengu_onyx_plover", null);
}

/** Whether the auto-dream ("onyx plover") capability is enabled or available. */
function mWn(): boolean {
  let gateConfig = dsl();
  if (gateConfig?.enabled === !0 || gateConfig?.available === !0) return !0;
  return h9r();
}

/** Resolves the effective auto-dream enabled state (user override wins). */
function X6t(): boolean {
  if (!mWn()) return !1;
  let userOverride = Fr().autoDreamEnabled;
  if (userOverride !== void 0) return userOverride;
  if (dsl()?.enabled === !0) return !0;
  return h9r();
}

var zSo = b(() => {
  cO();
  br();
  jn();
});

export {pWn,dsl,mWn,X6t,zSo};
