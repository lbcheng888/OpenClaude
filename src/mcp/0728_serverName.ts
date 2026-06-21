// @ts-nocheck
import {b} from "../../runtime.ts";
// @ts-nocheck
function sanitizeServerName(name) {
  let slug = name.replace(/[^a-zA-Z0-9_-]/g, "_");
  if (name.startsWith("claude.ai ")) slug = slug.replace(/_+/g, "_").replace(/^_|_$/g, "");
  return slug;
}
function parseMcpToolId(toolId) {
  let parts = toolId.split("__"),
    [prefix, serverName, ...rest] = parts;
  if (prefix !== "mcp" || !serverName) return null;
  let toolName = rest.length > 0 ? rest.join("__") : undefined;
  return {
    serverName: serverName,
    toolName: toolName
  };
}
function buildMcpServerPrefix(serverName) {
  return `mcp__${sanitizeServerName(serverName)}__`;
}
function buildMcpToolId(serverName, toolName) {
  return `${buildMcpServerPrefix(serverName)}${sanitizeServerName(toolName)}`;
}
function getToolDisplayId(toolDef) {
  return toolDef.mcpInfo ? buildMcpToolId(toolDef.mcpInfo.serverName, toolDef.mcpInfo.toolName) : toolDef.name;
}
function stripMcpServerPrefix(toolId, serverName) {
  let prefix = `mcp__${sanitizeServerName(serverName)}__`;
  return toolId.replace(prefix, "");
}
function extractToolDisplayName(displayName) {
  let name = displayName.replace(/\s*\(MCP\)\s*$/, "");
  name = name.trim();
  let dashIdx = name.indexOf(" - ");
  if (dashIdx !== -1) return name.substring(dashIdx + 3).trim();
  return name;
}
function formatPluginToolName(toolName, hasPlugins) {
  if (!hasPlugins || !toolName.startsWith("plugin:")) return toolName;
  let parts = toolName.split(":");
  if (parts.length < 3) return toolName;
  let pluginId = parts[1];
  return `${parts.slice(2).join(":")} (from plugin ${pluginId})`;
}
function toolNamesAreEquivalent(nameA, nameB) {
  if (nameA.startsWith("plugin:") || nameB.startsWith("plugin:")) return nameA === nameB;
  return sanitizeServerName(nameA) === sanitizeServerName(nameB);
}
var noopCallback = () => {};
function resolveToolNameAlias(toolName) {
  return Object.hasOwn(toolNameAliasMap, toolName) ? toolNameAliasMap[toolName] : toolName;
}
function getAliasesForCanonicalName(canonicalName) {
  let aliases = [];
  for (let [alias, target] of Object.entries(toolNameAliasMap)) if (target === canonicalName) aliases.push(alias);
  return aliases;
}
function getToolNameWithAlias(toolName, aliasMap) {
  let aliasValue = aliasMap && Object.hasOwn(aliasMap, toolName) ? aliasMap[toolName] : undefined;
  return aliasValue !== undefined && aliasValue !== toolName ? [toolName, aliasValue] : [toolName];
}
function getReverseAliases(targetValue, aliasMap) {
  if (!aliasMap) return [];
  let result = [];
  for (let [key, val] of Object.entries(aliasMap)) if (val === targetValue) result.push(key);
  return result;
}
function ruleHasWildcard(rule) {
  return rule.includes("*");
}
function matchWildcardPattern(pattern, target) {
  return new RegExp(`^${pattern.split("*").map(seg => seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`, "s").test(target);
}
function wildcardMatch(pattern, target) {
  return matchWildcardPattern(pattern, target);
}
function escapeRuleContent(content) {
  return content.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}
function unescapeRuleContent(content) {
  return content.replaceAll("\\(", "(").replaceAll("\\)", ")").replaceAll("\\\\", "\\");
}
function parseRuleString(ruleStr) {
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
function serializeRuleStruct(rule) {
  if (!rule.ruleContent) return rule.toolName;
  let escapedContent = escapeRuleContent(rule.ruleContent);
  return `${rule.toolName}(${escapedContent})`;
}
function findUnescapedChar(str, char) {
  for (let i = 0; i < str.length; i++) if (str[i] === char) {
    let backslashCount = 0,
      j = i - 1;
    while (j >= 0 && str[j] === "\\") backslashCount++, j--;
    if (backslashCount % 2 === 0) return i;
  }
  return -1;
}
function findUnescapedCharFromEnd(str, char) {
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
    ReadMcpResource: "ReadMcpResourceTool"
  };
  WORKSPACE_SERVER_NAME = `mcp__${workspaceBashToolId}__bash`, workspaceWebFetchToolId = `mcp__${workspaceBashToolId}__web_fetch`;
});

export {sanitizeServerName as collectFlagValueIndexes,parseMcpToolId as logFeatureBad,buildMcpServerPrefix as z3,buildMcpToolId as Y3,getToolDisplayId as i1e,stripMcpServerPrefix as Tnn,extractToolDisplayName as Snn,formatPluginToolName as Cbe,toolNamesAreEquivalent as ihr,noopCallback as scalar,resolveToolNameAlias as n0,getAliasesForCanonicalName as bnn,getToolNameWithAlias as REt,getReverseAliases as Enn,ruleHasWildcard as vbe,matchWildcardPattern as lhr,wildcardMatch as chr,escapeRuleContent as sQc,unescapeRuleContent as iQc,parseRuleString as bA,serializeRuleStruct as Qm,findUnescapedChar as aQc,findUnescapedCharFromEnd as lQc,toolNameAliasMap as ahr,workspaceBashToolId as iKe,WORKSPACE_SERVER_NAME as wEt,workspaceWebFetchToolId as Cns,qP as Sw};
