// @ts-nocheck
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {Ps,getAPIProvider as Rr} from "../api/1287_usesFirstPartyModelIds.ts";
import {Qr} from "../../vendor/m323.ts";
import {lt,l0,getStickyBetas as zH} from "../session/0132_sent.ts";
import {jn,getFeatureValue_CACHED_MAY_BE_STALE as it} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {rb,smt} from "../permissions/5211_level.ts";
import {OXe,tse} from "../../vendor/m1489.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {Ct,Ta} from "../../vendor/m197.ts";
import {po,Mn} from "./5224_userPromptCount.ts";
import {Ro,getMainLoopModel as gs,getSmallFastModel as xR} from "../permissions/1458_swapShrinksContextWindow.ts";
import {tn,TeamDeleteToolName as Pe,qt} from "../config/0230_encoding.ts";
import {xYa,HYa,IYa} from "../api/4266_query.ts";
import {$rt,w4,c3i} from "../../vendor/m2706.ts";
import {LYa,H_o,DYa,PYa,OYa} from "../../vendor/m4266.ts";
import {xl,Mr,Kh} from "../../vendor/m4427.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {vc} from "../api/3886_level.ts";
// @ts-nocheck
function buildWebSearchToolDef(input) {
  return {
    type: "web_search_20250305",
    name: "web_search",
    allowed_domains: input.allowed_domains,
    blocked_domains: input.blocked_domains,
    max_uses: 8
  };
}
function aggregateWebSearchResults(contentBlocks, query, durationSeconds) {
  let results = [],
    textBuffer = "",
    isFirstTextSegment = true,
    serverToolUseCount = 0,
    searchResultCount = 0;
  for (let block of contentBlocks) {
    if (block.type === "server_tool_use") {
      if (serverToolUseCount++, isFirstTextSegment) {
        if (isFirstTextSegment = false, textBuffer.trim().length > 0) results.push(textBuffer.trim());
        textBuffer = "";
      }
      continue;
    }
    if (block.type === "web_search_tool_result") {
      if (searchResultCount++, !Array.isArray(block.content)) {
        let errorMessage = `Web search error: ${block.content.error_code}`;
        A(errorMessage, {
          level: "error"
        }), results.push(errorMessage);
        continue;
      }
      let links = block.content.map(hit => ({
        title: hit.title,
        url: hit.url
      }));
      results.push({
        tool_use_id: block.tool_use_id,
        content: links
      });
    }
    if (block.type === "text") if (isFirstTextSegment) textBuffer += block.text;else isFirstTextSegment = true, textBuffer = block.text;
  }
  if (textBuffer.length) results.push(textBuffer.trim());
  return {
    query: query,
    results: results,
    durationSeconds: durationSeconds,
    searchCount: Math.max(serverToolUseCount, searchResultCount)
  };
}
var W2p, G2p, V2p, i5n;
var I_o = b(() => {
  Ps();
  Qr();
  lt();
  jn();
  rb();
  OXe();
  ri();
  qe();
  Ct();
  po();
  Ro();
  tn();
  xYa();
  $rt();
  LYa();
  xl();
  W2p = ve(() => C.strictObject({
    query: C.string().min(2).describe("The search query to use"),
    allowed_domains: C.array(C.string()).optional().describe("Only include search results from these domains"),
    blocked_domains: C.array(C.string()).optional().describe("Never include search results from these domains")
  })), G2p = ve(() => {
    let linkSchema = C.object({
      title: C.string().describe("The title of the search result"),
      url: C.string().describe("The URL of the search result")
    });
    return C.object({
      tool_use_id: C.string().describe("ID of the tool use"),
      content: C.array(linkSchema).describe("Array of search hits")
    });
  }), V2p = ve(() => C.object({
    query: C.string().describe("The search query that was executed"),
    results: C.array(C.union([G2p(), C.string()])).describe("Search results and/or text commentary from the model"),
    durationSeconds: C.number().describe("Time taken to complete the search operation"),
    searchCount: C.number().optional().describe("Number of web searches performed")
  }));
  i5n = Ks({
    name: w4,
    searchHint: "search the web for current information",
    maxResultSizeChars: 1e5,
    shouldDefer: true,
    async description(input) {
      return `Claude wants to search the web for: ${input.query}`;
    },
    userFacingName() {
      return "Web Search";
    },
    getToolUseSummary: H_o,
    getActivityDescription(input) {
      let summary = H_o(input);
      return summary ? `Searching for ${summary}` : "Searching the web";
    },
    isEnabled() {
      let provider = Rr();
      if (provider === "firstParty" || provider === "anthropicAws") return true;
      if (provider === "gateway") return false;
      if (provider === "vertex") {
        let model = gs();
        return model.includes("claude-fable-5") || model.includes("claude-opus-4") || model.includes("claude-sonnet-4") || model.includes("claude-haiku-4");
      }
      if (provider === "foundry") return true;
      return false;
    },
    get inputSchema() {
      return W2p();
    },
    get outputSchema() {
      return V2p();
    },
    isConcurrencySafe() {
      return true;
    },
    isReadOnly() {
      return true;
    },
    toAutoClassifierInput(input) {
      return input.query;
    },
    async checkPermissions(input) {
      return {
        behavior: "passthrough",
        message: "WebSearchTool requires permission.",
        suggestions: [{
          type: "addRules",
          rules: [{
            toolName: w4
          }],
          behavior: "allow",
          destination: "localSettings"
        }]
      };
    },
    async prompt({
      model: model
    }) {
      return c3i(model);
    },
    renderToolUseMessage: DYa,
    renderToolUseProgressMessage: PYa,
    renderToolResultMessage: OYa,
    extractSearchText() {
      return "";
    },
    async validateInput(input) {
      let {
        query: query,
        allowed_domains: allowedDomains,
        blocked_domains: blockedDomains
      } = input;
      if (!query.length) return {
        result: false,
        message: "Error: Missing query",
        errorCode: 1
      };
      if (allowedDomains?.length && blockedDomains?.length) return {
        result: false,
        message: "Error: Cannot specify both allowed_domains and blocked_domains in the same request",
        errorCode: 2
      };
      return {
        result: true
      };
    },
    async call(input, context, n, r, onProgress) {
      let startTime = performance.now(),
        {
          query: query
        } = input;
      if (HYa()) {
        let proxyResult = await IYa(query, context.abortController.signal, {
            allowed_domains: input.allowed_domains,
            blocked_domains: input.blocked_domains
          }),
          proxyDurationSeconds = (performance.now() - startTime) / 1000;
        if (!proxyResult.ok) throw new Ta(Pe({
          error_type: proxyResult.errorType,
          source: proxyResult.source,
          message: proxyResult.errorMessage
        }), "web-search-ccr-proxy");
        if (onProgress) onProgress({
          type: "progress",
          toolUseID: "ccr-proxy-search-1",
          data: {
            type: "search_results_received",
            resultCount: proxyResult.results.length,
            query: query
          }
        });
        return {
          data: {
            query: query,
            results: [{
              tool_use_id: "ccr-proxy-search-1",
              content: proxyResult.results
            }],
            durationSeconds: proxyDurationSeconds,
            searchCount: 1
          }
        };
      }
      let userMessage = Mn({
          content: "Perform a web search for the query: " + query
        }),
        toolDef = buildWebSearchToolDef(input),
        model = it("tengu_plum_vx3", false) ? xR() : context.options.mainLoopModel;
      if (Rr() === "foundry" && !tse(model, "web_search")) throw Error("Web search is not available on this Foundry deployment.");
      let stream = smt({
          messages: [userMessage],
          systemPrompt: vc(["You are an assistant for performing a web search tool use"]),
          thinkingConfig: {
            type: "disabled"
          },
          tools: [],
          signal: context.abortController.signal,
          options: {
            getToolPermissionContext: async () => Mr(context),
            model: model,
            toolChoice: {
              type: "tool",
              name: "web_search"
            },
            isNonInteractiveSession: context.options.isNonInteractiveSession,
            hasAppendSystemPrompt: !!context.options.appendSystemPrompt,
            extraToolSchemas: [toolDef],
            querySource: "web_search_tool",
            enablePromptCaching: false,
            agents: context.options.agentDefinitions.activeAgents,
            mcpTools: [],
            agentId: context.agentId,
            agentContext: context.agentContext,
            stickyBetas: l0(zH()),
            effortValue: Kh(context)
          }
        }),
        collectedContent = [],
        activeToolUseId = null,
        partialJsonBuffer = "",
        progressSeq = 0,
        queryByToolUseId = new Map();
      for await (let event of stream) {
        if (event.type === "assistant") {
          collectedContent.push(...event.message.content);
          continue;
        }
        if (event.type === "stream_event" && event.event?.type === "content_block_start") {
          let contentBlock = event.event.content_block;
          if (contentBlock && contentBlock.type === "server_tool_use") {
            activeToolUseId = contentBlock.id, partialJsonBuffer = "";
            continue;
          }
        }
        if (activeToolUseId && event.type === "stream_event" && event.event?.type === "content_block_delta") {
          let delta = event.event.delta;
          if (delta?.type === "input_json_delta" && delta.partial_json) {
            partialJsonBuffer += delta.partial_json;
            try {
              let queryMatch = partialJsonBuffer.match(/"query"\s*:\s*"((?:[^"\\]|\\.)*)"/);
              if (queryMatch && queryMatch[1]) {
                let parsedQuery = qt('"' + queryMatch[1] + '"');
                if (!queryByToolUseId.has(activeToolUseId) || queryByToolUseId.get(activeToolUseId) !== parsedQuery) {
                  if (queryByToolUseId.set(activeToolUseId, parsedQuery), progressSeq++, onProgress) onProgress({
                    type: "progress",
                    toolUseID: `search-progress-${progressSeq}`,
                    data: {
                      type: "query_update",
                      query: parsedQuery
                    }
                  });
                }
              }
            } catch {}
          }
        }
        if (event.type === "stream_event" && event.event?.type === "content_block_start") {
          let contentBlock = event.event.content_block;
          if (contentBlock && contentBlock.type === "web_search_tool_result") {
            let resultToolUseId = contentBlock.tool_use_id,
              resultQuery = queryByToolUseId.get(resultToolUseId) || query,
              resultContent = contentBlock.content;
            if (progressSeq++, onProgress) onProgress({
              type: "progress",
              toolUseID: resultToolUseId || `search-progress-${progressSeq}`,
              data: {
                type: "search_results_received",
                resultCount: Array.isArray(resultContent) ? resultContent.length : 0,
                query: resultQuery
              }
            });
          }
        }
      }
      if (Rr() === "foundry" && !tse(model, "web_search")) throw Error("Web search is not available on this Foundry deployment.");
      let durationSeconds = (performance.now() - startTime) / 1000;
      return {
        data: aggregateWebSearchResults(collectedContent, query, durationSeconds)
      };
    },
    mapToolResultToToolResultBlockParam(toolResult, toolUseId) {
      let {
          query: query,
          results: results
        } = toolResult,
        output = `Web search results for query: "${query}"

`;
      return (results ?? []).forEach(entry => {
        if (entry == null) return;
        if (typeof entry === "string") output += entry + `

`;else if (entry.content?.length > 0) output += `Links: ${Pe(entry.content)}

`;else output += `No links found.

`;
      }), output += `
REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.`, {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: output.trim()
      };
    }
  });
});

export {buildWebSearchToolDef as K2p,aggregateWebSearchResults as z2p,W2p,G2p,V2p,i5n,I_o};
