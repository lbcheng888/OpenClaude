// @ts-nocheck
import {ft as isFullscreenWithTTY,b} from "../../runtime.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {sI as logFeatureBad,T0 as scalar,ac as collectFlagValueIndexes} from "../mcp/0733_serverName.ts";
import {mk as VI,lr as dr,nu as Uu} from "../../vendor/m233.ts";
import {Wi as ta,Hn as wn} from "../../vendor/m100.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {kt as Ct,logEvent} from "../../vendor/m132.ts";
import {ri as Ri,rl as Cl,Ks as pi} from "./2235_userFacingName.ts";
import {sj as Hz,DEFERRED_DELTA_LIST_CAP} from "./4436_summarizeByServerPrefix.ts";
import {Gz as _z,OO as hL} from "../telemetry/2704_Gz.ts";
import {Tot as fnt} from "../../vendor/m2765.ts";
import {zz as Y5,Qkn as cwn,isDeferredTool} from "../config/2719_isDeferredTool.ts";
import {ve as we} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {qh as TOOL_SEARCH_TOOL_NAME} from "../../vendor/m2704.ts";
import {zn as Wn} from "../api/0465_getOauthConfig.ts";
import {sleep} from "../telemetry/1488_withTimeout.ts";
import {Le as fromEnum} from "../../vendor/m5.ts";
/** Module exports namespace for ToolSearch tool (outputSchema, inputSchema, ToolSearchTool) */
var C2i = {};
isFullscreenWithTTY(C2i, {
  outputSchema: () => outputSchema,
  inputSchema: () => inputSchema,
  clearToolSearchDescriptionCache: () => clearToolSearchDescriptionCache,
  ToolSearchTool: () => ToolSearchTool
});

/** Produce a sorted comma-joined string of tool names, used as a cache key */
function mxd(tools: any[]): string {
  return tools.map(tool => tool.name).sort().join(",");
}

/** Invalidate the description cache when the set of deferred tools changes */
function y2i(deferredTools: any[]): void {
  let cacheKey = mxd(deferredTools);
  if (A5r !== cacheKey) logForDebugging("ToolSearchTool: cache invalidated - deferred tools changed"), cRn.cache.clear?.(), A5r = cacheKey;
}

/** Clear the tool search description cache and reset the cache key sentinel */
function clearToolSearchDescriptionCache(): void {
  cRn.cache.clear?.(), A5r = null;
}

/** Build the standard result envelope for tool search matches */
function Ant(matches: any, query: any, total_deferred_tools: any, pendingServers: any[]): any {
  return {
    data: {
      matches: matches,
      query: query,
      total_deferred_tools: total_deferred_tools,
      ...(pendingServers.length > 0 && {
        pending_mcp_servers: pendingServers
      })
    }
  };
}

/**
 * Decompose a tool name into searchable parts.
 * MCP tools split on server/tool name segments; built-in tools split on camelCase/underscores.
 */
function T2i(tool: any): any {
  let toolName = tool.name,
    mcpInfo = tool.mcpInfo ?? logFeatureBad(toolName);
  if (mcpInfo) {
    let nameParts = [mcpInfo.serverName, mcpInfo.toolName].filter(part => Boolean(part)).map(part => part.toLowerCase()),
      splitParts = nameParts.flatMap(part => part.split(/[\s_.]+/)).filter(Boolean);
    return {
      parts: splitParts,
      coarseParts: nameParts,
      full: splitParts.join(" "),
      isMcp: !0
    };
  }
  let builtinParts = toolName.replace(/([a-z])([A-Z])/g, "$1 $2").replaceAll("_", " ").toLowerCase().split(/\s+/).filter(Boolean);
  return {
    parts: builtinParts,
    coarseParts: [toolName.toLowerCase()],
    full: builtinParts.join(" "),
    isMcp: !1
  };
}

/** Build a map of query term -> word-boundary RegExp for efficient repeated matching */
function Axd(queryTerms: string[]): Map<string, RegExp> {
  let regexMap = new Map();
  for (let term of queryTerms) if (!regexMap.has(term)) regexMap.set(term, new RegExp(`\\b${VI(term)}\\b`));
  return regexMap;
}

/**
 * Core async search: exact match first, then prefix for mcp__ queries,
 * then scored keyword ranking across all deferred tools.
 */
async function S2i(query: string, deferredTools: any[], allTools: any[], maxResults: number): Promise<string[]> {
  let normalizedQuery = query.toLowerCase().trim(),
    exactMatch = deferredTools.find(tool => tool.name.toLowerCase() === normalizedQuery) ?? allTools.find(tool => tool.name.toLowerCase() === normalizedQuery);
  if (exactMatch) return [exactMatch.name];
  if (normalizedQuery.startsWith("mcp__") && normalizedQuery.length > 5) {
    let prefixMatches = deferredTools.filter(tool => tool.name.toLowerCase().startsWith(normalizedQuery)).slice(0, maxResults).map(tool => tool.name);
    if (prefixMatches.length > 0) return prefixMatches;
  }
  let queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0),
    requiredTerms = [],
    optionalTerms = [];
  for (let word of queryWords) if (word.startsWith("+") && word.length > 1) requiredTerms.push(word.slice(1));else optionalTerms.push(word);
  let searchTerms = requiredTerms.length > 0 ? [...requiredTerms, ...optionalTerms] : queryWords,
    regexMap = Axd(searchTerms),
    candidateTools = deferredTools;
  if (requiredTerms.length > 0) candidateTools = (await Promise.all(deferredTools.map(async tool => {
    let toolParts = T2i(tool),
      toolDescription = (await cRn(tool.name, allTools)).toLowerCase(),
      searchHint = tool.searchHint?.toLowerCase() ?? "";
    return requiredTerms.every(term => {
      let termRegex = regexMap.get(term);
      return toolParts.parts.includes(term) || toolParts.parts.some(part => part.includes(term)) || toolParts.coarseParts.includes(term) || toolParts.coarseParts.some(part => part.includes(term)) || termRegex.test(toolDescription) || searchHint && termRegex.test(searchHint);
    }) ? tool : null;
  }))).filter(tool => tool !== null);
  return (await Promise.all(candidateTools.map(async tool => {
    let toolParts = T2i(tool),
      toolDescription = (await cRn(tool.name, allTools)).toLowerCase(),
      searchHint = tool.searchHint?.toLowerCase() ?? "",
      score = 0;
    for (let term of searchTerms) {
      let termRegex = regexMap.get(term);
      if (toolParts.parts.includes(term)) score += toolParts.isMcp ? 12 : 10;else if (toolParts.parts.some(part => part.includes(term))) score += toolParts.isMcp ? 6 : 5;
      if (toolParts.coarseParts.includes(term)) score += toolParts.isMcp ? 12 : 10;else if (toolParts.coarseParts.some(part => part.includes(term))) score += toolParts.isMcp ? 4 : 3;
      if (toolParts.full.includes(term) && score === 0) score += 3;
      if (searchHint && termRegex.test(searchHint)) score += 4;
      if (termRegex.test(toolDescription)) score += 2;
    }
    return {
      name: tool.name,
      score: score
    };
  }))).filter(tool => tool.score > 0).sort((toolA, toolB) => toolB.score - toolA.score).slice(0, maxResults).map(tool => tool.name);
}

/** Module-level mutable state: schemas, cache key, memoized fn, and tool descriptor */
var inputSchema,
  outputSchema,
  pxd = 5000,
  A5r = null,
  cRn,
  ToolSearchTool;

/** Lazy initializer: wire up schemas, the memoized description fetcher, and ToolSearchTool */
var uRn = b(() => {
  ta();
  Xr();
  Ct();
  scalar();
  Ri();
  qe();
  dr();
  Hz();
  _z();
  fnt();
  Y5();
  inputSchema = we(() => E.object({
    query: E.string().describe('Query to find deferred tools. Use "select:<tool_name>" for direct selection, or keywords to search.'),
    max_results: E.number().optional().default(5).describe("Maximum number of results to return (default: 5)")
  })), outputSchema = we(() => E.object({
    matches: E.array(E.string()),
    query: E.string(),
    total_deferred_tools: E.number(),
    pending_mcp_servers: E.array(E.string()).optional()
  }));
  cRn = wn(async (toolName, allTools) => {
    let toolDef = Cl(allTools, toolName);
    if (!toolDef) return "";
    return toolDef.prompt({
      getToolPermissionContext: async () => ({
        mode: "default",
        additionalWorkingDirectories: new Map(),
        alwaysAllowRules: {},
        alwaysDenyRules: {},
        alwaysAskRules: {},
        isBypassPermissionsModeAvailable: !1,
        mcpPermissionModeOverrides: {}
      }),
      tools: allTools,
      agents: []
    });
  }, keyArg => keyArg);
  ToolSearchTool = pi({
    isEnabled() {
      return hL();
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    name: TOOL_SEARCH_TOOL_NAME,
    maxResultSizeChars: 1e5,
    async description() {
      return cwn();
    },
    async prompt() {
      return cwn();
    },
    get inputSchema() {
      return inputSchema();
    },
    get outputSchema() {
      return outputSchema();
    },
    async call(callArgs, {
      options: {
        tools: toolsList,
        refreshTools: refreshToolsFn,
        mcpClients: mcpClientsList,
        refreshMcpClients: refreshMcpClientsFn
      },
      abortController: abortCtrl
    }) {
      let {
          query: queryStr,
          max_results: maxResults = 5
        } = callArgs,
        currentTools = refreshToolsFn?.() ?? toolsList,
        deferredToolsList = currentTools.filter(isDeferredTool);
      y2i(deferredToolsList);
      let getMcpClients = () => refreshMcpClientsFn?.() ?? mcpClientsList;
      function getPendingServerNames() {
        return getMcpClients().filter(client => client.type === "pending").map(client => client.name);
      }
      function extractMcpServerTargets(queryVal, pendingNames) {
        let queryStr = Array.isArray(queryVal) ? queryVal.join(" ") : queryVal,
          serverSet = new Set();
        for (let match of queryStr.matchAll(/mcp__([a-zA-Z0-9._-]+)/g)) {
          let serverPart = match[1],
            underscoreIdx = serverPart.indexOf("__");
          serverSet.add(underscoreIdx >= 0 ? serverPart.slice(0, underscoreIdx) : serverPart);
        }
        let lowerQuery = queryStr.toLowerCase();
        for (let name of pendingNames) if (new RegExp(`\\b${VI(name)}\\b`, "i").test(lowerQuery)) serverSet.add(name);
        return [...serverSet];
      }
      function getRefreshedState() {
        let freshAll = refreshToolsFn?.() ?? currentTools,
          existingNames = new Set(currentTools.map(tool => tool.name)),
          newCount = Wn(freshAll, tool => !existingNames.has(tool.name)),
          freshDeferred = freshAll.filter(isDeferredTool);
        return y2i(freshDeferred), {
          freshTools: freshAll,
          freshDeferred: freshDeferred,
          newCount: newCount
        };
      }
      async function waitForPendingServers(targetServerNames) {
        let startTime = Date.now(),
          deadline = startTime + pxd;
        while (Date.now() < deadline && !abortCtrl.signal.aborted) {
          let stillPending = getMcpClients().filter(client => client.type === "pending");
          if (stillPending.length === 0) break;
          if (targetServerNames.length > 0 && !stillPending.some(client => targetServerNames.includes(client.name) || targetServerNames.includes(collectFlagValueIndexes(client.name)))) break;
          await sleep(50, abortCtrl.signal);
        }
        return Date.now() - startTime;
      }
      async function tryRefreshAndSearch(searchFn, queryType, queryForTargets) {
        let refreshedState = getRefreshedState(),
          pendingNames = getPendingServerNames(),
          pendingCount = pendingNames.length;
        if (!refreshToolsFn || refreshedState.newCount === 0 && pendingCount === 0) return null;
        let initialMatches = refreshedState.newCount > 0 ? await searchFn(refreshedState.freshDeferred, refreshedState.freshTools) : [],
          waitedMs = 0,
          didSearch = !0,
          targetedServers = extractMcpServerTargets(queryForTargets, getMcpClients().map(client => client.name)),
          pendingNormalizedNames = pendingNames.map(collectFlagValueIndexes),
          shouldWait = targetedServers.length === 0 || targetedServers.some(name => pendingNames.includes(name) || pendingNormalizedNames.includes(name));
        if (initialMatches.length === 0 && pendingCount > 0 && shouldWait) didSearch = !1, waitedMs = await waitForPendingServers(targetedServers), refreshedState = getRefreshedState(), initialMatches = await searchFn(refreshedState.freshDeferred, refreshedState.freshTools);
        return logEvent("tengu_tool_search_mcp_wait", {
          queryType: fromEnum(queryType),
          refreshOnly: didSearch,
          waitedMs: waitedMs,
          pendingBefore: pendingCount,
          pendingAfter: getPendingServerNames().length,
          matchesAfterWait: initialMatches.length,
          targetServerCount: targetedServers.length,
          skippedPollNoTargetPending: pendingCount > 0 && !shouldWait && initialMatches.length === 0
        }), {
          matches: initialMatches,
          freshDeferred: refreshedState.freshDeferred,
          freshTools: refreshedState.freshTools
        };
      }
      function logFalseUnavailable(queryType, missingNames, pendingServers) {
        if (pendingServers.length === 0 || missingNames.length === 0) return;
        let requestedServerNames = new Set(missingNames.map(name => name.split("__")[1]).filter(Boolean)),
          matchedPendingCount = Wn(pendingServers, name => requestedServerNames.has(collectFlagValueIndexes(name)));
        logEvent("tengu_sdk_mcp_false_unavailable", {
          queryType: fromEnum(queryType),
          pendingServers: pendingServers.length,
          targetedPendingServers: matchedPendingCount
        });
      }
      function logOutcomeEvent(matchNames, queryType, refreshState) {
        let mcpClients = getMcpClients(),
          freshDeferred = refreshState?.freshDeferred ?? deferredToolsList,
          freshAll = refreshState?.freshTools ?? currentTools;
        logEvent("tengu_tool_search_outcome", {
          queryLength: queryStr.length,
          querySelectCount: queryType === "select" ? Uu(queryStr, ",") + 1 : void 0,
          queryType: fromEnum(queryType),
          matchCount: matchNames.length,
          totalDeferredTools: freshDeferred.length,
          maxResults: maxResults,
          hasMatches: matchNames.length > 0,
          mcpServersConfigured: mcpClients.length,
          mcpServersConnected: Wn(mcpClients, client => client.type === "connected"),
          mcpServersPending: Wn(mcpClients, client => client.type === "pending"),
          mcpToolsInPool: Wn(freshAll, tool => !!tool.mcpInfo),
          ...{}
        });
      }
      let selectMatch = queryStr.match(/^select:(.+)$/i);
      if (selectMatch) {
        let selectedNames = selectMatch[1].split(",").map(name => name.trim()).filter(Boolean),
          foundNames = [],
          missingNames = [];
        for (let name of selectedNames) {
          let foundTool = Cl(deferredToolsList, name) ?? Cl(currentTools, name);
          if (foundTool) {
            if (!foundNames.includes(foundTool.name)) foundNames.push(foundTool.name);
          } else missingNames.push(name);
        }
        let refreshResult;
        if (missingNames.length > 0) {
          let refreshOutcome = await tryRefreshAndSearch(async (freshDeferred, freshAll) => {
            let newFound = [];
            for (let missingName of missingNames) {
              let foundTool = Cl(freshDeferred, missingName) ?? Cl(freshAll, missingName);
              if (foundTool && !newFound.includes(foundTool.name)) newFound.push(foundTool.name);
            }
            return newFound;
          }, "select", missingNames);
          if (refreshOutcome) {
            if (refreshResult = refreshOutcome, refreshOutcome.matches.length > 0) {
              let combined = [...foundNames, ...refreshOutcome.matches],
                stillMissing = missingNames.filter(name => !refreshOutcome.matches.includes(name));
              if (stillMissing.length > 0) logForDebugging(`ToolSearchTool: partial select after MCP refresh — found: ${combined.join(", ")}, missing: ${stillMissing.join(", ")}`);else logForDebugging(`ToolSearchTool: selected ${combined.join(", ")} after MCP refresh`);
              return logOutcomeEvent(combined, "select", refreshOutcome), Ant(combined, queryStr, refreshOutcome.freshDeferred.length, []);
            }
          }
        }
        if (foundNames.length === 0) {
          logForDebugging(`ToolSearchTool: select failed — none found: ${missingNames.join(", ")}`), logOutcomeEvent([], "select", refreshResult);
          let pendingServers = getPendingServerNames();
          return logFalseUnavailable("select", missingNames.filter(name => name.startsWith("mcp__")), pendingServers), Ant([], queryStr, refreshResult?.freshDeferred.length ?? deferredToolsList.length, pendingServers);
        }
        if (missingNames.length > 0) logForDebugging(`ToolSearchTool: partial select — found: ${foundNames.join(", ")}, missing: ${missingNames.join(", ")}`);else logForDebugging(`ToolSearchTool: selected ${foundNames.join(", ")}`);
        return logOutcomeEvent(foundNames, "select", refreshResult), Ant(foundNames, queryStr, refreshResult?.freshDeferred.length ?? deferredToolsList.length, []);
      }
      let keywordMatches = await S2i(queryStr, deferredToolsList, currentTools, maxResults);
      logForDebugging(`ToolSearchTool: keyword search for "${queryStr}", found ${keywordMatches.length} matches`);
      let mcpRefreshResult;
      if (keywordMatches.length === 0) {
        let refreshOutcome = await tryRefreshAndSearch((freshDeferred, freshAll) => S2i(queryStr, freshDeferred, freshAll, maxResults), "keyword", queryStr);
        if (refreshOutcome) {
          if (mcpRefreshResult = refreshOutcome, refreshOutcome.matches.length > 0) return keywordMatches = refreshOutcome.matches, logForDebugging(`ToolSearchTool: keyword search for "${queryStr}" found ${keywordMatches.length} matches after MCP refresh`), logOutcomeEvent(keywordMatches, "keyword", refreshOutcome), Ant(keywordMatches, queryStr, refreshOutcome.freshDeferred.length, []);
        }
      }
      logOutcomeEvent(keywordMatches, "keyword", mcpRefreshResult);
      let totalDeferred = mcpRefreshResult?.freshDeferred.length ?? deferredToolsList.length;
      if (keywordMatches.length === 0) {
        let pendingServers = getPendingServerNames();
        return logFalseUnavailable("keyword", queryStr.match(/mcp__[A-Za-z0-9_-]+/g) ?? [], pendingServers), Ant(keywordMatches, queryStr, totalDeferred, pendingServers);
      }
      return Ant(keywordMatches, queryStr, totalDeferred, []);
    },
    renderToolUseMessage() {
      return null;
    },
    userFacingName: () => "",
    mapToolResultToToolResultBlockParam(result, toolUseId) {
      if (result.matches.length === 0) {
        let noMatchMsg = "No matching deferred tools found";
        if (result.pending_mcp_servers && result.pending_mcp_servers.length > 0) {
          let pendingServers = result.pending_mcp_servers,
            truncatedList = pendingServers.length > DEFERRED_DELTA_LIST_CAP ? `${pendingServers.slice(0, DEFERRED_DELTA_LIST_CAP).join(", ")}, …and ${pendingServers.length - DEFERRED_DELTA_LIST_CAP} more` : pendingServers.join(", ");
          noMatchMsg += `. Some MCP servers are still connecting: ${truncatedList}. Their tools will become available shortly — try searching again. If you're looking for a capability rather than a specific tool name, try keywords that might match the server's purpose (e.g., 'slack message', 'calendar event'). Once you find a matching tool, call it directly — do not stop after searching.`;
        }
        return {
          type: "tool_result",
          tool_use_id: toolUseId,
          content: noMatchMsg
        };
      }
      return {
        type: "tool_result",
        tool_use_id: toolUseId,
        content: result.matches.map(matchName => ({
          type: "tool_reference",
          tool_name: matchName
        }))
      };
    }
  });
});
export {C2i as h5i,mxd as Z1d,y2i as u5i,clearToolSearchDescriptionCache,Ant as Sot,T2i as d5i,Axd as tNd,S2i as p5i,inputSchema,outputSchema,pxd as Q1d,A5r as j7r,cRn as jHn,ToolSearchTool,uRn as YHn};
