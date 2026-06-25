// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {BVr,Wz,dMt,Gz} from "../telemetry/2704_Gz.ts";
import {iE,GS} from "../api/2028_used.ts";
import {Yv,xM} from "../../vendor/m1450.ts";
import {uZe,MR} from "../config/2033_allowed.ts";
import {Za} from "../../vendor/m127.ts";
import {Gl,ri} from "./2235_userFacingName.ts";
import {qh} from "../../vendor/m2704.ts";
import {isDeferredTool as f$,formatDeferredToolLine as lKr,zz} from "../config/2719_isDeferredTool.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {HDe,QWn} from "../../vendor/m4434.ts";
import {zn,os} from "../api/0465_getOauthConfig.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {getMcpConnectNonBlocking as Dbe,lt} from "../session/0132_sent.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {tse,OXe} from "../../vendor/m1489.ts";
import {nMt,wVr} from "../../vendor/m2694.ts";
import {Xg} from "../agent/2193_kind.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {YWn,kDe,zWn} from "../permissions/4434_level.ts";
import {dn} from "../config/0137_namespace.ts";
var toolSearchNamespace = {};
ft(toolSearchNamespace, {
  summarizeByServerPrefix: () => summarizeByServerPrefix,
  isToolSearchToolAvailable: () => isToolSearchToolAvailable,
  isToolSearchEnabled: () => isToolSearchEnabled,
  isToolReferenceBlock: () => isToolReferenceBlock,
  isMcpLadderNonblockingEnabled: () => isMcpLadderNonblockingEnabled,
  getDeferredToolsDelta: () => getDeferredToolsDelta,
  getAutoToolSearchCharThreshold: () => getAutoToolSearchCharThreshold,
  extractDiscoveredToolNames: () => extractDiscoveredToolNames,
  DEFERRED_DELTA_LIST_CAP: () => DEFERRED_DELTA_LIST_CAP
});
/** Parse ENABLE_TOOL_SEARCH env as a context-percent; falls back to the default (10%). */
function parseToolSearchContextPercent() {
  let envVal = process.env.ENABLE_TOOL_SEARCH;
  if (!envVal) return defaultToolSearchPercent;
  if (envVal === "auto") return defaultToolSearchPercent;
  let parsed = BVr(envVal);
  if (parsed !== null) return parsed;
  return defaultToolSearchPercent;
}
/** Token threshold = floor(contextLength * percent/100). */
function computeToolSearchTokenThreshold(model) {
  let contextLen = iE(model, Yv(uZe(model))),
    fraction = parseToolSearchContextPercent() / 100;
  return Math.floor(contextLen * fraction);
}
/** Char-based threshold = tokenThreshold * charToTokenRatio. */
function getAutoToolSearchCharThreshold(model) {
  return Math.floor(computeToolSearchTokenThreshold(model) * charToTokenRatio);
}
function isMcpLadderNonblockingEnabled() {
  if (Za(process.env.MCP_CONNECTION_NONBLOCKING)) return !1;
  return !0;
}
function isToolSearchToolAvailable(tools) {
  return tools.some(tool => Gl(tool, qh));
}
/** Sum name + prompt + schema char lengths across deferred tools. */
async function estimateDeferredToolChars(tools, getPermCtx, agents, model) {
  let deferredTools = tools.filter(tool => f$(tool));
  if (deferredTools.length === 0) return 0;
  return (await Promise.all(deferredTools.map(async tool => {
    let prompt = await tool.prompt({
        getToolPermissionContext: getPermCtx,
        tools: tools,
        agents: agents,
        model: model
      }),
      schemaJson = tool.inputJSONSchema ? Pe(tool.inputJSONSchema) : tool.inputSchema ? Pe(HDe(tool.inputSchema)) : "";
    return tool.name.length + prompt.length + schemaJson.length;
  }))).reduce((sum, n) => sum + n, 0);
}
async function isToolSearchEnabled(model, tools, agents, abortSignal, callSiteHint) {
  let mcpToolCount = zn(tools, tool => tool.isMcp);
  function logDecision(enabled, mode, reason, extra) {
    W("tengu_tool_search_mode_decision", {
      enabled: enabled,
      mode: Le(mode),
      reason: reason,
      checkedModel: model,
      mcpToolCount: mcpToolCount,
      mcpNonBlocking: Dbe(),
      userType: "external",
      ...extra
    });
  }
  if (!Wz(model)) return A(`Tool search disabled for model '${model}': model does not support tool_reference blocks. This feature is available on Claude Sonnet 4+, Opus 4+, Haiku 4.5+, and newer models.`), logDecision(!1, "standard", "model_unsupported"), !1;
  if (!tse(model, "tool_search_server") || !tse(model, "tool_search")) return A(`Tool search disabled: Foundry deployment for '${model}' does not support tool search.`), logDecision(!1, "standard", "foundry_deployment_unsupported"), !1;
  if (!isToolSearchToolAvailable(tools)) return A("Tool search disabled: ToolSearchTool is not available (may have been disallowed via disallowedTools)."), logDecision(!1, "standard", "mcp_search_unavailable"), !1;
  let featureMode = dMt();
  switch (featureMode) {
    case "tst":
      return logDecision(!0, featureMode, "tst_enabled"), !0;
    case "tst-auto":
      {
        let {
          enabled: enabled,
          debugDescription: debugDescription,
          metrics: metrics
        } = await computeSideQuestionState(tools, agents, abortSignal, model);
        if (enabled) return A(`Auto tool search enabled: ${debugDescription}` + (callSiteHint ? ` [source: ${callSiteHint}]` : "")), logDecision(!0, featureMode, "auto_above_threshold", metrics), !0;
        return A(`Auto tool search disabled: ${debugDescription}` + (callSiteHint ? ` [source: ${callSiteHint}]` : "")), logDecision(!1, featureMode, "auto_below_threshold", metrics), !1;
      }
    case "standard":
      return logDecision(!1, featureMode, "standard_mode"), !1;
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
  if (discovered.size > 0) A(`Dynamic tool loading: found ${discovered.size} discovered tools in message history` + (carriedCount > 0 ? ` (${carriedCount} carried from compact boundary)` : ""));
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
    let readded = new Set(msg.attachment.readdedNames ?? []);
    for (let name of msg.attachment.addedNames) {
      if (nMt.has(name)) continue;
      if (announcedNames.add(name), !readded.has(name)) newlyAnnouncedNames.add(name);
    }
    for (let name of msg.attachment.removedNames) announcedNames.delete(name);
    if (msg.attachment.pendingMcpServers !== void 0) pendingServers = msg.attachment.pendingMcpServers;
  }
  let deferredTools = allTools.filter(f$),
    deferredNames = new Set(deferredTools.map(tool => tool.name)),
    allNames = new Set(allTools.map(tool => tool.name)),
    addedTools = deferredTools.filter(tool => !announcedNames.has(tool.name)),
    unlistedTools = deferredTools.filter(tool => !newlyAnnouncedNames.has(tool.name)),
    readdedNames = addedTools.filter(tool => newlyAnnouncedNames.has(tool.name)).map(tool => tool.name),
    removedNames = [];
  for (let name of announcedNames) {
    if (deferredNames.has(name)) continue;
    if (!allNames.has(name)) removedNames.push(name);
  }
  let sortedPending = pendingMcpServers !== void 0 ? [...pendingMcpServers].sort() : [],
    pendingChanged = pendingMcpServers !== void 0 && (sortedPending.length !== pendingServers.length || sortedPending.some((s, i) => s !== pendingServers[i]));
  if (addedTools.length === 0 && removedNames.length === 0 && unlistedTools.length === 0 && !pendingChanged) return null;
  let combinedNames = os([...addedTools, ...unlistedTools].map(tool => tool.name));
  return W("tengu_deferred_tools_pool_change", {
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
    callSite: Le(opts?.callSite ?? "unknown"),
    querySource: Xg(opts?.querySource) ?? "unknown",
    attachmentTypesSeen: [...attachmentTypesSeen].sort().join(",")
  }), {
    addedNames: combinedNames.sort(),
    addedLines: unlistedTools.map(lKr).sort(),
    removedNames: removedNames.sort(),
    readdedNames: readdedNames.sort(),
    ...(pendingMcpServers !== void 0 && {
      pendingMcpServers: sortedPending
    })
  };
}
/** Group tool names by their mcp server prefix (mcp__server__*), counting collapses. */
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
    charThreshold = getAutoToolSearchCharThreshold(model);
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
var Dr = b(() => {
  Wi();
  lt();
  xM();
  wVr();
  kt();
  OXe();
  ri();
  zz();
  YWn();
  MR();
  GS();
  qe();
  dn();
  tn();
  Gz();
  QWn();
  estimateDeferredToolTokens = Hn(async (tools, agents, agents_2, model) => {
    let deferredTools = tools.filter(tool => f$(tool));
    if (deferredTools.length === 0) return 0;
    try {
      let tokenTotal = await kDe(deferredTools, agents, {
        activeAgents: agents_2,
        allAgents: agents_2
      }, model);
      if (tokenTotal === 0) return null;
      return Math.max(0, tokenTotal - zWn);
    } catch {
      return null;
    }
  }, tools => tools.filter(tool => f$(tool)).map(tool => tool.name).join(","));
});

export {toolSearchNamespace as qbo,parseToolSearchContextPercent as Gbo,computeToolSearchTokenThreshold as fal,getAutoToolSearchCharThreshold,isMcpLadderNonblockingEnabled,isToolSearchToolAvailable,estimateDeferredToolChars as aKp,isToolSearchEnabled,isToolReferenceBlock,isBtwCommandBlock as lKp,isToolResultWithContent as cKp,extractDiscoveredToolNames,getDeferredToolsDelta,summarizeByServerPrefix,computeSideQuestionState as uKp,defaultToolSearchPercent as Wbo,charToTokenRatio as sKp,estimateDeferredToolTokens as iKp,DEFERRED_DELTA_LIST_CAP,Dr as sj};
