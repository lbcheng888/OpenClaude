// @ts-nocheck
import {rl,ri} from "../tools/2235_userFacingName.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck

/** Type guard: true when value is a permission-rule object with allow/deny behavior. */
function ael(rule: any): boolean {
  if (!rule || typeof rule !== "object") return !1;
  return "behavior" in rule && (rule.behavior === "allow" || rule.behavior === "deny");
}

/** Derive a human-readable display name from a tool name, stripping the "__" namespace prefix and title-casing words. */
function Fce(toolName: string): string {
  return (toolName.split("__").pop() || toolName).replace(/_/g, " ").replace(/\b\w/g, (char: string) => char.toUpperCase());
}

var G5n = () => {};

/**
 * Collect display-name overrides for tool_use blocks whose computed display name
 * differs from the raw tool name. Returns an array of { id, display_name, ... }.
 */
function Amt(contentBlocks: any[], context: any): any[] {
  if (!Array.isArray(contentBlocks)) return [];
  let overrides: any[] = [];
  for (let block of contentBlocks) {
    if (block == null || typeof block !== "object" || block.type !== "tool_use") continue;
    let {
      id: toolUseId,
      name: toolName
    } = block;
    if (typeof toolUseId !== "string" || typeof toolName !== "string") continue;
    let mcpInfo = context ? rl(context, toolName)?.mcpInfo : void 0,
      displayName = mcpInfo?.title || Fce(toolName);
    if (displayName === toolName) continue;
    let override: any = {
      id: toolUseId,
      display_name: displayName
    };
    if (mcpInfo) {
      if (override.server_display_name = mcpInfo.displayName || mcpInfo.serverInfoName || mcpInfo.serverName, mcpInfo.iconUrl) override.icon_url = mcpInfo.iconUrl;
    }
    overrides.push(override);
  }
  return overrides;
}

var qyo = b(() => {
  G5n();
  ri();
});

export {ael,Fce,G5n,Amt,qyo};
