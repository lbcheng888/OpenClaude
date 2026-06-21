// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {ljr as LB8,gz as $r,PPt as yh_,_z as Yr} from "../telemetry/2692__z.ts";
import {nE as QM,jS as cM} from "../api/2023_used.ts";
import {BR as SW,g1 as Jv} from "../../vendor/m1445.ts";
import {dXe as foH,jR as mW} from "../config/2028_allowed.ts";
import {_l as J4,fromEnum as cH} from "../../vendor/m5.ts";
import {Lc as m1,Ri as N7} from "./2227_userFacingName.ts";
import {TOOL_SEARCH_TOOL_NAME as u$} from "../../vendor/m2692.ts";
import {isDeferredTool as Ux,formatDeferredToolLine as nB8,Y5 as RQ} from "../config/2707_isDeferredTool.ts";
import {Le as xH,Xt as t_} from "../config/0228_encoding.ts";
import {P0e as rRH,P6n as YB6} from "../../vendor/m4412.ts";
import {Wn as i6,fs as O9} from "../api/0459_getOauthConfig.ts";
import {logEvent as c,Ct as E_} from "../../vendor/m131.ts";
import {getMcpConnectNonBlocking as PjH,lt as Y_} from "../session/0131_sent.ts";
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {nse as tqH,MYe as koH} from "../../vendor/m1484.ts";
import {Fg as kY} from "../agent/2188_kind.ts";
import {ta as o7,wn as V6} from "../../vendor/m45.ts";
import {H6n as TB6,D0e as iRH,x6n as KB6} from "../permissions/4412_level.ts";
import {sn as w6} from "../config/0047_namespace.ts";
// @ts-nocheck
var toolSearchNamespace = {};
j_(toolSearchNamespace, {
  summarizeByServerPrefix: () => summarizeByServerPrefix,
  isToolSearchToolAvailable: () => isToolSearchToolAvailable,
  isToolSearchEnabled: () => isToolSearchEnabled,
  isToolReferenceBlock: () => isToolReferenceBlock,
  isMcpLadderNonblockingEnabled: () => isMcpLadderNonblockingEnabled,
  getDeferredToolsDelta: () => getDeferredToolsDelta,
  getAutoToolSearchCharThreshold: () => BaK,
  extractDiscoveredToolNames: () => extractDiscoveredToolNames,
  DEFERRED_DELTA_LIST_CAP: () => DEFERRED_DELTA_LIST_CAP
});
function parseToolSearchContextPercent() {
  let envVal = process.env.ENABLE_TOOL_SEARCH;
  if (!envVal) return defaultToolSearchPercent;
  if (envVal === "auto") return defaultToolSearchPercent;
  let parsed = LB8(envVal);
  if (parsed !== null) return parsed;
  return defaultToolSearchPercent;
}
function computeToolSearchTokenThreshold(model) {
  let contextLen = QM(model, SW(foH(model))),
    fraction = parseToolSearchContextPercent() / 100;
  return Math.floor(contextLen * fraction);
}
function BaK(model) {
  return Math.floor(computeToolSearchTokenThreshold(model) * charToTokenRatio);
}
function isMcpLadderNonblockingEnabled() {
  if (J4(process.env.MCP_CONNECTION_NONBLOCKING)) return false;
  return true;
}
function isToolSearchToolAvailable(tools) {
  return tools.some(t => m1(t, u$));
}
async function estimateDeferredToolChars(tools, getPermCtx, agents, model) {
  let deferredTools = tools.filter(t => Ux(t));
  if (deferredTools.length === 0) return 0;
  return (await Promise.all(deferredTools.map(async tool => {
    let prompt = await tool.prompt({
        getToolPermissionContext: getPermCtx,
        tools: tools,
        agents: agents,
        model: model
      }),
      schemaJson = tool.inputJSONSchema ? xH(tool.inputJSONSchema) : tool.inputSchema ? xH(rRH(tool.inputSchema)) : "";
    return tool.name.length + prompt.length + schemaJson.length;
  }))).reduce((sum, n) => sum + n, 0);
}
async function isToolSearchEnabled(model, tools, agents, abortSignal, callSiteHint) {
  let mcpToolCount = i6(tools, t => t.isMcp);
  function logDecision(enabled, mode, reason, extra) {
    c("tengu_tool_search_mode_decision", {
      enabled: enabled,
      mode: cH(mode),
      reason: reason,
      checkedModel: model,
      mcpToolCount: mcpToolCount,
      mcpNonBlocking: PjH(),
      userType: "external",
      ...extra
    });
  }
  if (!$r(model)) return N(`Tool search disabled for model '${model}': model does not support tool_reference blocks. This feature is available on Claude Sonnet 4+, Opus 4+, Haiku 4.5+, and newer models.`), logDecision(false, "standard", "model_unsupported"), false;
  if (!tqH(model, "tool_search_server") || !tqH(model, "tool_search")) return N(`Tool search disabled: Foundry deployment for '${model}' does not support tool search.`), logDecision(false, "standard", "foundry_deployment_unsupported"), false;
  if (!isToolSearchToolAvailable(tools)) return N("Tool search disabled: ToolSearchTool is not available (may have been disallowed via disallowedTools)."), logDecision(false, "standard", "mcp_search_unavailable"), false;
  let featureMode = yh_();
  switch (featureMode) {
    case "tst":
      return logDecision(true, featureMode, "tst_enabled"), true;
    case "tst-auto":
      {
        let {
          enabled: enabled,
          debugDescription: debugDescription,
          metrics: metrics
        } = await computeSideQuestionState(tools, agents, abortSignal, model);
        if (enabled) return N(`Auto tool search enabled: ${debugDescription}` + (callSiteHint ? ` [source: ${callSiteHint}]` : "")), logDecision(true, featureMode, "auto_above_threshold", metrics), true;
        return N(`Auto tool search disabled: ${debugDescription}` + (callSiteHint ? ` [source: ${callSiteHint}]` : "")), logDecision(false, featureMode, "auto_below_threshold", metrics), false;
      }
    case "standard":
      return logDecision(false, featureMode, "standard_mode"), false;
  }
}
function isToolReferenceBlock(block) {
  return typeof block === "object" && block !== null && "type" in block && block.type === "tool_reference";
}
function isBtwCommandBlock(block) {
  return isToolReferenceBlock(block) && "tool_name" in block && typeof block.tool_name === "string";
}
function isToolResultWithContent(block) {
  return typeof block === "object" && block !== null && "type" in block && block.type === "tool_result" && "content" in block && Array.isArray(block.content);
}
function extractDiscoveredToolNames(messages) {
  let discovered = new Set(),
    carriedCount = 0;
  for (let msg of messages) {
    if (msg.type === "system" && msg.subtype === "compact_boundary") {
      let preCompact = msg.compactMetadata?.preCompactDiscoveredTools;
      if (preCompact) {
        for (let name of preCompact) discovered.add(name);
        carriedCount += preCompact.length;
      }
      continue;
    }
    if (msg.type !== "user") continue;
    let content = msg.message?.content;
    if (!Array.isArray(content)) continue;
    for (let block of content) if (isToolResultWithContent(block)) {
      for (let z of block.content) if (isBtwCommandBlock(z)) discovered.add(z.tool_name);
    }
  }
  if (discovered.size > 0) N(`Dynamic tool loading: found ${discovered.size} discovered tools in message history` + (carriedCount > 0 ? ` (${carriedCount} carried from compact boundary)` : ""));
  return discovered;
}
function getDeferredToolsDelta(allTools, messages, opts, pendingMcpServers) {
  let announcedNames = new Set(),
    newlyAnnouncedNames = new Set(),
    pendingServers = [],
    attachmentCount = 0,
    dtdCount = 0,
    attachmentTypesSeen = new Set();
  for (let msg of messages) {
    if (msg.type !== "attachment") continue;
    if (attachmentCount++, attachmentTypesSeen.add(msg.attachment.type), msg.attachment.type !== "deferred_tools_delta") continue;
    dtdCount++;
    let R = new Set(msg.attachment.readdedNames ?? []);
    for (let h of msg.attachment.addedNames) if (announcedNames.add(h), !R.has(h)) newlyAnnouncedNames.add(h);
    for (let h of msg.attachment.removedNames) announcedNames.delete(h);
    if (msg.attachment.pendingMcpServers !== undefined) pendingServers = msg.attachment.pendingMcpServers;
  }
  let deferredTools = allTools.filter(Ux),
    deferredNames = new Set(deferredTools.map(t => t.name)),
    allNames = new Set(allTools.map(t => t.name)),
    addedTools = deferredTools.filter(t => !announcedNames.has(t.name)),
    unlistedTools = deferredTools.filter(t => !newlyAnnouncedNames.has(t.name)),
    readdedNames = addedTools.filter(t => newlyAnnouncedNames.has(t.name)).map(t => t.name),
    removedNames = [];
  for (let name of announcedNames) {
    if (deferredNames.has(name)) continue;
    if (!allNames.has(name)) removedNames.push(name);
  }
  let sortedPending = pendingMcpServers !== undefined ? [...pendingMcpServers].sort() : [],
    pendingChanged = pendingMcpServers !== undefined && (sortedPending.length !== pendingServers.length || sortedPending.some((s, i) => s !== pendingServers[i]));
  if (addedTools.length === 0 && removedNames.length === 0 && unlistedTools.length === 0 && !pendingChanged) return null;
  let combinedNames = O9([...addedTools, ...unlistedTools].map(t => t.name));
  return c("tengu_deferred_tools_pool_change", {
    addedCount: addedTools.length,
    readdedCount: readdedNames.length,
    unlistedCount: unlistedTools.length,
    removedCount: removedNames.length,
    pendingChanged: pendingChanged,
    pendingCount: sortedPending.length,
    lastPendingCount: pendingServers.length,
    priorAnnouncedCount: announcedNames.size,
    messagesLength: messages.length,
    attachmentCount: attachmentCount,
    dtdCount: dtdCount,
    callSite: cH(opts?.callSite ?? "unknown"),
    querySource: kY(opts?.querySource) ?? "unknown",
    attachmentTypesSeen: [...attachmentTypesSeen].sort().join(",")
  }), {
    addedNames: combinedNames.sort(),
    addedLines: unlistedTools.map(nB8).sort(),
    removedNames: removedNames.sort(),
    readdedNames: readdedNames.sort(),
    ...(pendingMcpServers !== undefined && {
      pendingMcpServers: sortedPending
    })
  };
}
function summarizeByServerPrefix(toolNames) {
  let grouped = new Map();
  for (let name of toolNames) {
    let key = name.startsWith("mcp__") ? `${name.split("__", 2).join("__")}__*` : name;
    grouped.set(key, (grouped.get(key) ?? 0) + 1);
  }
  return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([k, count]) => count > 1 ? `${k} (${count})` : k).join(", ");
}
async function computeSideQuestionState(tools, agents, abortSignal, model) {
  let tokenCount = await estimateDeferredToolTokens(tools, agents, abortSignal, model);
  if (tokenCount !== null) {
    let threshold = computeToolSearchTokenThreshold(model);
    return {
      enabled: tokenCount >= threshold,
      debugDescription: `${tokenCount} tokens (threshold: ${threshold}, ${parseToolSearchContextPercent()}% of context)`,
      metrics: {
        deferredToolTokens: tokenCount,
        threshold: threshold
      }
    };
  }
  let charCount = await estimateDeferredToolChars(tools, agents, abortSignal, model),
    charThreshold = BaK(model);
  return {
    enabled: charCount >= charThreshold,
    debugDescription: `${charCount} chars (threshold: ${charThreshold}, ${parseToolSearchContextPercent()}% of context) (char fallback)`,
    metrics: {
      deferredToolDescriptionChars: charCount,
      charThreshold: charThreshold
    }
  };
}
var defaultToolSearchPercent = 10,
  charToTokenRatio = 2.5,
  estimateDeferredToolTokens,
  DEFERRED_DELTA_LIST_CAP = 30;
var Dr = L(() => {
  o7();
  Y_();
  Jv();
  E_();
  koH();
  N7();
  RQ();
  TB6();
  mW();
  cM();
  gH();
  w6();
  t_();
  Yr();
  YB6();
  estimateDeferredToolTokens = V6(async (tools, agents, agents_2, model) => {
    let deferredTools = tools.filter(t => Ux(t));
    if (deferredTools.length === 0) return 0;
    try {
      let tokenTotal = await iRH(deferredTools, agents, {
        activeAgents: agents_2,
        allAgents: agents_2
      }, model);
      if (tokenTotal === 0) return null;
      return Math.max(0, tokenTotal - KB6);
    } catch {
      return null;
    }
  }, tools => tools.filter(t => Ux(t)).map(t => t.name).join(","));
});

export {toolSearchNamespace as Yho,parseToolSearchContextPercent as Xho,computeToolSearchTokenThreshold as wel,BaK as getAutoToolSearchCharThreshold,isMcpLadderNonblockingEnabled,isToolSearchToolAvailable,estimateDeferredToolChars as C3p,isToolSearchEnabled,isToolReferenceBlock,isBtwCommandBlock as v3p,isToolResultWithContent as w3p,extractDiscoveredToolNames,getDeferredToolsDelta,summarizeByServerPrefix,computeSideQuestionState as R3p,defaultToolSearchPercent as Jho,charToTokenRatio as b3p,estimateDeferredToolTokens as E3p,DEFERRED_DELTA_LIST_CAP,Dr as Hz};
