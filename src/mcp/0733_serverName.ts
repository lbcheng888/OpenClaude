// @ts-nocheck
import {b} from "../../runtime.ts";
// @ts-nocheck

/** Sanitize a server/tool name into a slug safe for MCP tool ids (only [a-zA-Z0-9_-]). */
function sanitizeServerName(name: string): string {
  let slug = name.replace(/[^a-zA-Z0-9_-]/g, "_");
  if (name.startsWith("claude.ai ")) slug = slug.replace(/_+/g, "_").replace(/^_|_$/g, "");
  return slug;
}

/** Parse an `mcp__<server>__<tool>` id back into its server and tool parts; null if not an MCP id. */
function parseMcpToolId(toolId: string): { serverName: string; toolName: string | undefined } | null {
  let parts = toolId.split("__"),
    [prefix, serverName, ...rest] = parts;
  if (prefix !== "mcp" || !serverName) return null;
  let toolName = rest.length > 0 ? rest.join("__") : void 0;
  return {
    serverName: serverName,
    toolName: toolName
  };
}

/** Build the `mcp__<server>__` prefix for a given server name. */
function buildMcpServerPrefix(serverName: string): string {
  return `mcp__${sanitizeServerName(serverName)}__`;
}

/** Build the full `mcp__<server>__<tool>` id. */
function buildMcpToolId(serverName: string, toolName: string): string {
  return `${buildMcpServerPrefix(serverName)}${sanitizeServerName(toolName)}`;
}

/** Resolve the display id for a tool def: MCP id when it has mcpInfo, else its plain name. */
function getToolDisplayId(toolDef: { mcpInfo?: { serverName: string; toolName: string }; name: string }): string {
  return toolDef.mcpInfo ? buildMcpToolId(toolDef.mcpInfo.serverName, toolDef.mcpInfo.toolName) : toolDef.name;
}

/** Strip the `mcp__<server>__` prefix off a tool id. */
function stripMcpServerPrefix(toolId: string, serverName: string): string {
  let prefix = `mcp__${sanitizeServerName(serverName)}__`;
  return toolId.replace(prefix, "");
}

/** Extract a tool's display name: drop trailing " (MCP)" and any "<prefix> - " lead. */
function extractToolDisplayName(displayName: string): string {
  let name = displayName.replace(/\s*\(MCP\)\s*$/, "");
  name = name.trim();
  let dashIdx = name.indexOf(" - ");
  if (dashIdx !== -1) return name.substring(dashIdx + 3).trim();
  return name;
}

/** Format a `plugin:<id>:<name>` tool name into "<name> (from plugin <id>)" when plugins are enabled. */
function formatPluginToolName(toolName: string, hasPlugins: boolean): string {
  if (!hasPlugins || !toolName.startsWith("plugin:")) return toolName;
  let parts = toolName.split(":");
  if (parts.length < 3) return toolName;
  let pluginId = parts[1];
  return `${parts.slice(2).join(":")} (from plugin ${pluginId})`;
}

/** Compare two tool names: exact for plugin names, sanitized-equal otherwise. */
function toolNamesAreEquivalent(nameA: string, nameB: string): boolean {
  if (nameA.startsWith("plugin:") || nameB.startsWith("plugin:")) return nameA === nameB;
  return sanitizeServerName(nameA) === sanitizeServerName(nameB);
}

var noopCallback = () => {};

/** Map a tool name through the alias table to its canonical name. */
function resolveToolNameAlias(toolName: string): string {
  return Object.hasOwn(toolNameAliasMap, toolName) ? toolNameAliasMap[toolName] : toolName;
}

/** Collect all alias names that point at a given canonical name. */
function getAliasesForCanonicalName(canonicalName: string): string[] {
  let aliases = [];
  for (let [alias, target] of Object.entries(toolNameAliasMap)) if (target === canonicalName) aliases.push(alias);
  return aliases;
}

/** Return [toolName, alias] when an alias exists and differs, else just [toolName]. */
function getToolNameWithAlias(toolName: string, aliasMap?: Record<string, string>): string[] {
  let aliasValue = aliasMap && Object.hasOwn(aliasMap, toolName) ? aliasMap[toolName] : void 0;
  return aliasValue !== void 0 && aliasValue !== toolName ? [toolName, aliasValue] : [toolName];
}

/** Reverse-lookup: keys in aliasMap whose value equals targetValue. */
function getReverseAliases(targetValue: string, aliasMap?: Record<string, string>): string[] {
  if (!aliasMap) return [];
  let result = [];
  for (let [key, val] of Object.entries(aliasMap)) if (val === targetValue) result.push(key);
  return result;
}

/** Whether a rule string contains a wildcard. */
function ruleHasWildcard(rule: string): boolean {
  return rule.includes("*");
}

/** Test target against a glob-style pattern where `*` becomes `.*`. */
function matchWildcardPattern(pattern: string, target: string): boolean {
  return new RegExp(`^${pattern.split("*").map(seg => seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`, "s").test(target);
}

/** Alias of matchWildcardPattern. */
function wildcardMatch(pattern: string, target: string): boolean {
  return matchWildcardPattern(pattern, target);
}

/** Escape backslashes and parens in rule content. */
function escapeRuleContent(content: string): string {
  return content.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

/** Reverse of escapeRuleContent. */
function unescapeRuleContent(content: string): string {
  return content.replaceAll("\\(", "(").replaceAll("\\)", ")").replaceAll("\\\\", "\\");
}

/** Parse a rule string `tool(content)` into { toolName, ruleContent? }, resolving aliases. */
function parseRuleString(ruleStr: string): { toolName: string; ruleContent?: string } {
  let openIdx = findUnescapedChar(ruleStr, "(");
  if (openIdx === -1) return {
    toolName: resolveToolNameAlias(ruleStr)
  };
  let closeIdx = findUnescapedCharFromEnd(ruleStr, ")");
  if (closeIdx === -1 || closeIdx <= openIdx) return {
    toolName: resolveToolNameAlias(ruleStr)
  };
  if (closeIdx !== ruleStr.length - 1) return {
    toolName: resolveToolNameAlias(ruleStr)
  };
  let baseName = ruleStr.substring(0, openIdx),
    innerContent = ruleStr.substring(openIdx + 1, closeIdx);
  if (!baseName) return {
    toolName: resolveToolNameAlias(ruleStr)
  };
  if (innerContent === "" || innerContent === "*") return {
    toolName: resolveToolNameAlias(baseName)
  };
  let ruleContent = unescapeRuleContent(innerContent);
  return {
    toolName: resolveToolNameAlias(baseName),
    ruleContent: ruleContent
  };
}

/** Serialize a rule struct back to `tool(escapedContent)` or just `tool`. */
function serializeRuleStruct(rule: { toolName: string; ruleContent?: string }): string {
  if (!rule.ruleContent) return rule.toolName;
  let escapedContent = escapeRuleContent(rule.ruleContent);
  return `${rule.toolName}(${escapedContent})`;
}

/** Index of the first unescaped occurrence of char (even number of preceding backslashes). */
function findUnescapedChar(str: string, char: string): number {
  for (let i = 0; i < str.length; i++) if (str[i] === char) {
    let backslashCount = 0,
      j = i - 1;
    while (j >= 0 && str[j] === "\\") backslashCount++, j--;
    if (backslashCount % 2 === 0) return i;
  }
  return -1;
}

/** Index of the last unescaped occurrence of char, scanning from the end. */
function findUnescapedCharFromEnd(str: string, char: string): number {
  for (let i = str.length - 1; i >= 0; i--) if (str[i] === char) {
    let backslashCount = 0,
      j = i - 1;
    while (j >= 0 && str[j] === "\\") backslashCount++, j--;
    if (backslashCount % 2 === 0) return i;
  }
  return -1;
}

var toolNameAliasMap,
  workspaceBashToolId = "workspace",
  WORKSPACE_SERVER_NAME,
  workspaceWebFetchToolId;

var qP = b(() => {
  toolNameAliasMap = {
    Task: "Agent",
    KillShell: "TaskStop",
    KillBash: "TaskStop",
    AgentOutputTool: "TaskOutput",
    BashOutputTool: "TaskOutput",
    AgentOutput: "TaskOutput",
    BashOutput: "TaskOutput",
    ListPeers: "ListAgents",
    Brief: "SendUserMessage",
    ListMcpResources: "ListMcpResourcesTool",
    ReadMcpResource: "ReadMcpResourceTool",
    ReadMcpResourceDir: "ReadMcpResourceDirTool"
  };
  WORKSPACE_SERVER_NAME = `mcp__${workspaceBashToolId}__bash`, workspaceWebFetchToolId = `mcp__${workspaceBashToolId}__web_fetch`;
});

export {sanitizeServerName as ac,parseMcpToolId as sI,buildMcpServerPrefix as m3,buildMcpToolId as f3,getToolDisplayId as Kpe,stripMcpServerPrefix as rsn,extractToolDisplayName as osn,formatPluginToolName as iCe,toolNamesAreEquivalent as LSr,noopCallback as T0,resolveToolNameAlias as S0,getAliasesForCanonicalName as ssn,getToolNameWithAlias as evt,getReverseAliases as isn,ruleHasWildcard as aCe,matchWildcardPattern as NSr,wildcardMatch as FSr,escapeRuleContent as blu,unescapeRuleContent as Elu,parseRuleString as Jf,serializeRuleStruct as Gp,findUnescapedChar as Clu,findUnescapedCharFromEnd as Alu,toolNameAliasMap as MSr,workspaceBashToolId as oYe,WORKSPACE_SERVER_NAME as ZRt,workspaceWebFetchToolId as yls,qP as gA};
