// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Jf,sI,Kpe,T0,gA} from "../mcp/0733_serverName.ts";
import {ls,w8,fg} from "../../vendor/m2232.ts";
import {Zk} from "../mcp/3159_scope.ts";
import {Gl,ri} from "../tools/2235_userFacingName.ts";
import {yD} from "../config/2259_R9r.ts";
import {gke,rKr,SMt,TMt,T3i,D$e} from "../../vendor/m2713.ts";
import {isAgentSwarmsEnabled as Wa,lb} from "../config/3314_isAgentSwarmsEnabled.ts";
import {KD,i6e} from "../tools/3962_tool.ts";
import {gw,Mf,Grt,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {ov,NW} from "../config/3289_NW.ts";
import {Mo,If,vu} from "../mcp/2200_mcpServerName.ts";
import {su,ow} from "../../vendor/m2257.ts";
import {getActiveWorktree as z$,r6e} from "../tools/3940_pattern.ts";
import {readRoster as Cc,XR,LO} from "../../vendor/m2707.ts";
import {iL,dye} from "../tools/3938_items.ts";
import {vs,dm} from "../../vendor/m2256.ts";
import {S9n,b9n,rdt,Hdo} from "../../vendor/m3977.ts";
import {xD,g9a,Kl,M9n,x3t,po} from "../tools/5224_userPromptCount.ts";
import {lee,g1} from "../core/2741_input_tokens.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {CD,oh} from "../../vendor/m2600.ts";
import {bu,oS} from "../config/2605_event_name.ts";
import {Uhe,slowOpTracer as pw} from "../telemetry/2606_skill_name.ts";
import {e$,Fhe} from "../agent/2600_attributionMcpServer.ts";
import {Ve,Le,Bo} from "../../vendor/m5.ts";
import {xr} from "../../vendor/m1461.ts";
import {I3t,_ye,ddt,rc,x9n,b6e,D9n,O9n,P9n,f9a,L9n,udt,h9a,Ydo,hS} from "../agent/4362_toolUseCount.ts";
import {ldt,H9n} from "../agent/3987_type.ts";
import {l9a,H3t,gye} from "./3986_editRemovalVisibility.ts";
import {c5,dn} from "../config/0137_namespace.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ne,AR} from "../../vendor/m583.ts";
import {Qae,Zae} from "../../vendor/m3309.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {v$a,w$a} from "./3977_forkContextMessages.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {Ce,$c,Ct} from "../../vendor/m197.ts";
import {clearInvokedSkillsForAgent as LSt,lt} from "../session/0132_sent.ts";
import {_$a,b3t} from "../../vendor/m3970.ts";
import {b,oo} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {E9n,A3t,R3t} from "../../vendor/m3978.ts";
import {Tot} from "../../vendor/m2765.ts";
import {iee,_Mt} from "../artifact/2713_uuidSlugFromUrl.ts";
import {QR,wD,Kz} from "../tools/2710_allErrors.ts";
import {j0} from "../session/2702_resolveLoopFileFire.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
// Returns false if bootstrapped; otherwise checks shale_finch feature flag
function p9a(isBootstrapped: any): any {
  if (isBootstrapped) return !1;
  return it("tengu_shale_finch", !1);
}
// Parses wildcard tool spec into allowedAgentTypes config, or null if not wildcard
function Wdo(toolSpecs: any): any {
  if (toolSpecs === void 0) return {};
  if (!toolSpecs.includes("*")) return null;
  let allowedAgentTypes: any;
  for (let spec of toolSpecs) {
    if (spec === "*") continue;
    let {
      toolName,
      ruleContent
    } = Jf(spec);
    if (toolName !== ls || !ruleContent) return null;
    allowedAgentTypes ??= [], allowedAgentTypes.push(...ruleContent.split(",").map((part: any) => part.trim()).filter(Boolean));
  }
  return allowedAgentTypes ? {
    allowedAgentTypes
  } : {};
}
// Filters tools list by permission context, async mode, teammate, and agentDepth
function Gdo({
  tools,
  isBuiltIn,
  isAsync = !1,
  isTeammate = !1,
  permissionMode,
  agentDepth = 0
}: any): any {
  let filtered = tools.filter((tool: any) => {
    if (Zk(tool)) return !0;
    if (Gl(tool, yD) && permissionMode === "plan") return !0;
    if (gke.has(tool.name)) return !1;
    if (!isBuiltIn && rKr.has(tool.name)) return !1;
    if (Gl(tool, ls)) return agentDepth < SMt;
    if (isAsync && !TMt.has(tool.name)) {
      if (Wa() && isTeammate && T3i.has(tool.name)) return !0;
      return !1;
    }
    return !0;
  });
  if (permissionMode === "plan" && !filtered.some((tool: any) => Gl(tool, yD))) filtered.push(KD);
  return filtered;
}
// Builds disallowed tool sets and lookup helpers from the deny list
function Vdo(denyList: any): any {
  let disallowedToolSet = new Set(),
    bareDisallowedToolSet = new Set(),
    disallowedServers = new Set(),
    allServersDisallowed = !1;
  for (let entry of denyList ?? []) {
    let {
      toolName,
      ruleContent
    } = Jf(entry);
    if (disallowedToolSet.add(toolName), !ruleContent) bareDisallowedToolSet.add(toolName);
    let parsed = sI(toolName);
    if (parsed !== null && (parsed.toolName === void 0 || parsed.toolName === "*")) if (parsed.serverName === "*") allServersDisallowed = !0;else disallowedServers.add(parsed.serverName);
  }
  let isServerLevelDisallowed = (name: any) => {
    if (!allServersDisallowed && disallowedServers.size === 0) return !1;
    let serverName = sI(name)?.serverName;
    return serverName !== void 0 && (allServersDisallowed || disallowedServers.has(serverName));
  };
  return {
    disallowedToolSet,
    bareDisallowedToolSet,
    isServerLevelDisallowed,
    isToolDisallowed: (tool: any) => {
      let userFacingName = Kpe(tool);
      return disallowedToolSet.has(tool.name) || disallowedToolSet.has(userFacingName) || isServerLevelDisallowed(userFacingName);
    }
  };
}
// Resolves tool spec into valid/invalid/unavailable/resolvedTools buckets
function Ate(agentConfig: any, allTools: any, isAsync = !1, isTeammateFlag = !1, isTeammate = !1, agentDepth = 0): any {
  let {
      tools: specifiedTools,
      disallowedTools,
      source,
      permissionMode
    } = agentConfig,
    filteredTools = isTeammateFlag ? allTools : Gdo({
      tools: allTools,
      isBuiltIn: source === "built-in",
      isAsync,
      isTeammate,
      permissionMode,
      agentDepth
    }),
    {
      disallowedToolSet,
      bareDisallowedToolSet,
      isToolDisallowed,
      isServerLevelDisallowed
    } = Vdo(disallowedTools),
    allowedTools = filteredTools.filter((tool: any) => {
      if (isToolDisallowed(tool)) return !1;
      return !0;
    });
  if (specifiedTools === void 0) return {
    hasWildcard: !0,
    validTools: [],
    invalidTools: [],
    unavailableTools: [],
    resolvedTools: allowedTools
  };
  let wildcardConfig = Wdo(specifiedTools);
  if (wildcardConfig) return {
    hasWildcard: !0,
    validTools: [],
    invalidTools: [],
    unavailableTools: [],
    resolvedTools: allowedTools,
    ...(wildcardConfig.allowedAgentTypes && {
      allowedAgentTypes: wildcardConfig.allowedAgentTypes
    })
  };
  let toolByName = new Map();
  for (let tool of allowedTools) toolByName.set(tool.name, tool);
  let allToolNames = new Set(allTools.map((tool: any) => tool.name)),
    bashTool = gw() && !disallowedToolSet.has(Mf) ? toolByName.get(Mf) : void 0,
    validTools = [],
    invalidTools = [],
    unavailableTools = [],
    resolvedTools = [],
    resolvedSet = new Set(),
    allowedAgentTypes: any;
  for (let spec of specifiedTools) {
    let {
      toolName,
      ruleContent
    } = Jf(spec);
    if (toolName === ls) {
      if (ruleContent) {
        let parts = ruleContent.split(",").map((part: any) => part.trim()).filter(Boolean);
        allowedAgentTypes = allowedAgentTypes ? [...allowedAgentTypes, ...parts] : parts;
      }
      if (!isTeammateFlag && !toolByName.has(ls)) {
        validTools.push(spec);
        continue;
      }
    }
    let parsed = sI(toolName);
    if (parsed !== null && parsed.serverName !== "*" && (parsed.toolName === void 0 || parsed.toolName === "*")) {
      validTools.push(spec);
      for (let tool of allowedTools) if (sI(Kpe(tool))?.serverName === parsed.serverName && !resolvedSet.has(tool)) resolvedTools.push(tool), resolvedSet.add(tool);
      continue;
    }
    let matchedTool = toolByName.get(toolName);
    if (matchedTool) {
      if (validTools.push(spec), !resolvedSet.has(matchedTool)) resolvedTools.push(matchedTool), resolvedSet.add(matchedTool);
    } else if (bashTool && Grt.has(toolName)) {
      if (validTools.push(spec), !resolvedSet.has(bashTool)) resolvedTools.push(bashTool), resolvedSet.add(bashTool);
    } else if (bareDisallowedToolSet.has(toolName) || isServerLevelDisallowed(toolName)) ;else if (allToolNames.has(toolName)) unavailableTools.push(spec);else invalidTools.push(spec);
  }
  if (ov() && !resolvedTools.some((tool: any) => Gl(tool, Mo))) {
    let aliasMap = {
        [su]: z$,
        [Cc]: iL
      },
      remainingInvalid = [];
    for (let spec of invalidTools) {
      let {
          toolName
        } = Jf(spec),
        aliasTool = aliasMap[toolName];
      if (!aliasTool || disallowedToolSet.has(toolName)) {
        remainingInvalid.push(spec);
        continue;
      }
      if (validTools.push(spec), !resolvedSet.has(aliasTool)) resolvedTools.push(aliasTool), resolvedSet.add(aliasTool);
    }
    invalidTools.splice(0, invalidTools.length, ...remainingInvalid);
  }
  return {
    hasWildcard: !1,
    validTools,
    invalidTools,
    unavailableTools,
    resolvedTools,
    allowedAgentTypes
  };
}
// Counts total tool_use blocks across all assistant messages
function u0p(messages: any): any {
  let count = 0;
  for (let message of messages) if (message.type === "assistant") {
    for (let block of message.message.content) if (block.type === "tool_use") count++;
  }
  return count;
}
// Aggregates per-tool-category stats from message transcript
function d0p(messages: any): any {
  let stats = {
    readCount: 0,
    searchCount: 0,
    bashCount: 0,
    editFileCount: 0,
    linesAdded: 0,
    linesRemoved: 0,
    otherToolCount: 0
  };
  for (let message of messages) if (message.type === "assistant") for (let block of message.message.content) {
    if (block.type !== "tool_use") continue;
    switch (block.name) {
      case vs:
        stats.readCount++;
        break;
      case Cc:
      case su:
        stats.searchCount++;
        break;
      case Mo:
        stats.bashCount++;
        break;
      case ls:
      case w8:
        break;
      default:
        if (S9n.has(block.name)) {
          let {
            added,
            removed
          } = b9n(block.name, block.input);
          stats.editFileCount++, stats.linesAdded += added, stats.linesRemoved += removed;
        } else if (block.name === c0p) stats.frameCount = (stats.frameCount ?? 0) + 1;else stats.otherToolCount++;
    }
  } else if (message.type === "user") {
    let toolStats = message.toolUseResult?.toolStats;
    if (toolStats) {
      if (stats.readCount += toolStats.readCount, stats.searchCount += toolStats.searchCount, stats.bashCount += toolStats.bashCount, stats.editFileCount += toolStats.editFileCount, stats.linesAdded += toolStats.linesAdded, stats.linesRemoved += toolStats.linesRemoved, stats.otherToolCount += toolStats.otherToolCount, toolStats.frameCount) stats.frameCount = (stats.frameCount ?? 0) + toolStats.frameCount;
    }
  }
  return stats.readCount + stats.searchCount + stats.bashCount + stats.editFileCount + stats.otherToolCount + (stats.frameCount ?? 0) > 0 ? stats : void 0;
}
// Logs agent completion telemetry and returns result summary object
function Kdo(messages: any, agentId: any, metadata: any, {
  suppressTelemetry = !1
}: any = {}): any {
  let {
      prompt,
      resolvedAgentModel,
      isBuiltInAgent,
      startTime,
      agentType,
      isAsync,
      agentDepth,
      source,
      pluginId
    } = metadata,
    lastAssistant = xD(messages);
  if (lastAssistant === void 0) throw Error("No assistant messages found");
  let textBlocks = lastAssistant.message.content.filter((block: any) => block.type === "text");
  if (textBlocks.length === 0) for (let i = messages.length - 1; i >= 0; i--) {
    let message = messages[i];
    if (message.type !== "assistant") continue;
    let blocks = message.message.content.filter((block: any) => block.type === "text");
    if (blocks.length > 0) {
      textBlocks = blocks;
      break;
    }
  }
  let totalTokens = lee(lastAssistant.message.usage),
    totalToolUseCount = u0p(messages),
    durationMs = Date.now() - startTime,
    assistantMessageIds = new Set();
  for (let message of messages) if (message.type === "assistant") assistantMessageIds.add(message.message.id);
  if (!suppressTelemetry) {
    W("tengu_agent_tool_completed", {
      agent_type: agentType,
      model: resolvedAgentModel,
      prompt_char_count: prompt.length,
      response_char_count: textBlocks.reduce((acc: any, block: any) => acc + block.text.length, 0),
      assistant_message_count: assistantMessageIds.size,
      total_tool_uses: totalToolUseCount,
      duration_ms: durationMs,
      total_tokens: totalTokens,
      is_built_in_agent: isBuiltInAgent,
      is_async: isAsync,
      agent_depth: agentDepth
    });
    let isLocalMarketplace = If(),
      isManagedMarketplace = pluginId && CD(pluginId.marketplace);
    bu("subagent_completed", {
      agent_type: isBuiltInAgent || isManagedMarketplace || isLocalMarketplace ? agentType : "custom",
      ...(source && {
        "agent.source": source
      }),
      is_built_in: isBuiltInAgent,
      is_async: isAsync,
      total_tokens: totalTokens,
      total_tool_uses: totalToolUseCount,
      duration_ms: durationMs,
      model: resolvedAgentModel,
      ...(pluginId && {
        plugin_id_hash: Uhe(pluginId.name, pluginId.marketplace),
        "plugin.name": isManagedMarketplace || isLocalMarketplace ? pluginId.name : e$
      })
    });
    let requestId = lastAssistant.requestId;
    if (requestId) W("tengu_cache_eviction_hint", {
      scope: Ve("subagent_end"),
      last_request_id: xr(requestId)
    });
  }
  return {
    agentId,
    agentType,
    content: textBlocks,
    resolvedModel: resolvedAgentModel,
    totalDurationMs: Date.now() - startTime,
    totalTokens,
    totalToolUseCount,
    usage: lastAssistant.message.usage,
    toolStats: d0p(messages)
  };
}
// Returns the name of the last tool_use block in an assistant message
function p0p(message: any): any {
  if (message.type !== "assistant") return;
  let lastToolUse = message.message.content.findLast((block: any) => block.type === "tool_use");
  return lastToolUse?.type === "tool_use" ? lastToolUse.name : void 0;
}
// Updates task registry with latest activity description and token/tool counts
function m0p(transcriptHandle: any, taskId: any, toolUseId: any, fallbackDescription: any, startTime: any, lastToolName: any, subagentType: any): any {
  let snapshot = I3t(transcriptHandle);
  ldt({
    taskId,
    toolUseId,
    description: snapshot.lastActivity?.activityDescription ?? fallbackDescription,
    subagentType,
    startTime,
    totalTokens: snapshot.tokenCount,
    toolUses: snapshot.toolUseCount,
    lastToolName
  });
}
// Runs the auto-mode handoff classifier after subagent completes; returns warning string or null
async function jdo({
  agentMessages,
  tools,
  toolPermissionContext,
  abortSignal,
  subagentType,
  totalToolUseCount
}: any): Promise<any> {
  {
    if (toolPermissionContext.mode !== "auto") return null;
    if (!l9a(agentMessages, tools)) return null;
    let classifierResult = await H3t(agentMessages, {
        role: "user",
        content: [{
          type: "text",
          text: "Subagent has finished and is handing back control to the main agent. Review the subagent's work based on the block rules and let the main agent know if any file is dangerous (the main agent will see the reason)."
        }]
      }, tools, toolPermissionContext, abortSignal, {
        isSubagentLoop: !0
      }),
      decision = classifierResult.unavailable ? "unavailable" : classifierResult.shouldBlock ? "blocked" : "allowed";
    if (W("tengu_auto_mode_decision", {
      decision: Le(decision),
      toolName: Le(w8),
      inProtectedNamespace: c5(),
      classifierModel: classifierResult.model,
      agentType: subagentType,
      toolUseCount: totalToolUseCount,
      isHandoff: !0,
      agentMsgId: xD(agentMessages)?.message.id,
      classifierStage: Bo(classifierResult.stage),
      classifierFailureMode: Bo(classifierResult.failureMode),
      classifierStage1RequestId: xr(classifierResult.stage1RequestId),
      classifierStage1MsgId: xr(classifierResult.stage1MsgId),
      classifierStage2RequestId: xr(classifierResult.stage2RequestId),
      classifierStage2MsgId: xr(classifierResult.stage2MsgId)
    }), classifierResult.shouldBlock) {
      if (classifierResult.unavailable) return A("Handoff classifier unavailable, allowing sub-agent output with warning", {
        level: "warn"
      }), g9a(classifierResult.model, classifierResult.httpStatus, classifierResult.errorKind);
      return A(`Handoff classifier flagged sub-agent output: ${classifierResult.reason}`, {
        level: "warn"
      }), `SECURITY WARNING: This subagent performed actions that may violate security policy. Reason: ${classifierResult.reason}. Review the subagent's actions carefully before acting on its output.`;
    }
  }
  return null;
}
// Finds the last assistant text response in message array
function I9n(messages: any): any {
  for (let i = messages.length - 1; i >= 0; i--) {
    let message = messages[i];
    if (message.type !== "assistant") continue;
    let text = Kl(message.message.content, `
`);
    if (text) return text;
  }
  return;
}
// Main async agent loop: streams responses, tracks tool use, handles stall watchdog, finalizes
async function E6e({
  taskId,
  abortController,
  makeStream,
  metadata,
  description,
  toolUseContext,
  taskRegistry,
  agentIdForCleanup,
  enableSummarization,
  getWorktreeResult,
  onMessage,
  shouldNotifyOwner
}: any): Promise<any> {
  let notifyOwner = shouldNotifyOwner ?? (() => !0),
    stopSummarization: any,
    finalizeBackground = () => {
      if (abortController.signal.reason !== "background" || !notifyOwner()) return !1;
      return stopSummarization?.(), _ye(taskId, taskRegistry), ddt(taskId, taskRegistry), !0;
    },
    collectedMessages: any[] = [],
    taskEntry = taskRegistry.get(taskId),
    ownerAgentId = rc(taskEntry) ? taskEntry.ownerAgentId : void 0,
    stallTimeoutMs = Ne.CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS || 600000,
    stallTimer: any = null,
    lastMessageType = "none",
    finalized = !1,
    turnStartTime = Date.now();
  rdt(taskRegistry, taskId, {
    turnStartTime
  });
  let spinner = Qae(taskId);
  spinner.setMode("responding");
  let turns = 0,
    lastAssistantMessageId: any,
    lastToolUseId: any,
    lastToolResultSeen: any,
    inFlightToolUseIds = new Set(),
    awaitedToolUseIds = new Set(),
    updateIdle = () => {
      let isIdle = awaitedToolUseIds.size > 0 && awaitedToolUseIds.size === inFlightToolUseIds.size;
      taskRegistry.update(taskId, (entry: any) => entry.isIdle === isIdle ? entry : {
        ...entry,
        isIdle
      });
    },
    lastAssistantMessage: any,
    lastChunkTime = Date.now(),
    logCompletion = (exitPath: any, extra?: any) => {
      let now = Date.now(),
        finalStopReason = lastAssistantMessage?.type === "assistant" ? lastAssistantMessage.message.stop_reason ?? "null" : "none",
        fields = [`agentId=${taskId}`, `agentType=${metadata.agentType ?? "unknown"}`, `exitPath=${exitPath}`, `durationMs=${now - turnStartTime}`, `turns=${turns}`, `finalStopReason=${finalStopReason}`, `lastChunkAgeMs=${now - lastChunkTime}`, `lastToolUseId=${lastToolUseId ?? "none"}`, `lastToolResultSeen=${lastToolResultSeen ?? "none"}`];
      if (extra?.errorKind) fields.push(`errorKind=${extra.errorKind}`);
      A(`[Stall] agent_completion ${fields.join(" ")}`, {
        level: exitPath === "watchdog_stall" || exitPath === "error" ? "warn" : "info"
      });
    },
    clearStallTimer = () => {
      if (stallTimer !== null) clearTimeout(stallTimer), stallTimer = null;
    },
    armStallTimer = () => {
      clearStallTimer(), stallTimer = setTimeout(() => {
        if (stallTimer = null, finalized) return;
        if (finalizeBackground()) return;
        if (inFlightToolUseIds.size > 0) {
          A(`[AsyncAgent ${taskId}] stall watchdog deferred — ${inFlightToolUseIds.size} tool(s) in flight (toolUseIds=${[...inFlightToolUseIds].join(",")})`), armStallTimer();
          return;
        }
        finalized = !0, A(`[AsyncAgent ${taskId}] stall watchdog fired after ${stallTimeoutMs}ms with no progress (last message: ${lastMessageType}); aborting`, {
          level: "error"
        }), W("tengu_async_agent_stall_timeout", {
          agent_type: metadata.agentType,
          stall_ms: stallTimeoutMs,
          last_message_type: lastMessageType,
          message_count: collectedMessages.length
        }), abortController.abort(), stopSummarization?.(), logCompletion("watchdog_stall");
        let stallError = `Agent stalled: no progress for ${stallTimeoutMs / 1000}s (stream watchdog did not recover)`;
        if (xe("subagent_complete", "subagent_stall_timeout"), x9n(taskId, stallError, taskRegistry), getWorktreeResult(), notifyOwner()) b6e({
          taskId,
          description,
          status: "failed",
          error: stallError,
          taskRegistry,
          toolUseId: toolUseContext.toolUseId,
          finalMessage: I9n(collectedMessages),
          ownerAgentId
        });
      }, stallTimeoutMs), stallTimer.unref?.();
    },
    lastProgressTime = 0,
    progressThrottleMs = Math.min(stallTimeoutMs * 0.1, 1000),
    onProgress = () => {
      let now = Date.now();
      if (lastChunkTime = now, now - lastProgressTime < progressThrottleMs) return;
      lastProgressTime = now, lastMessageType = "query_progress", armStallTimer();
    };
  try {
    let transcriptHandle = D9n(),
      toolNameSet = O9n(toolUseContext.options.tools),
      onSummarize = enableSummarization ? (messages: any, opts: any) => {
        let {
          stop
        } = v$a(taskId, cd(taskId), messages, opts, taskRegistry);
        stopSummarization = stop;
      } : void 0;
    armStallTimer();
    for await (let chunk of makeStream(onSummarize, onProgress)) {
      if (onMessage?.(chunk), chunk.type === "spinner_mode") {
        spinner.setMode(chunk.mode);
        continue;
      }
      if (chunk.type === "api_metrics") continue;
      if (chunk.type === "set_in_progress_tool_use_ids") {
        let clearedCount = 0;
        if (chunk.op.action === "remove") for (let id of chunk.op.ids) {
          if (inFlightToolUseIds.delete(id)) clearedCount++;
          awaitedToolUseIds.delete(id);
        }
        if (clearedCount > 0 && chunk.reason === "fallback_sweep") W("tengu_async_agent_stranded_tools_cleared", {
          is_built_in_agent: metadata.isBuiltInAgent,
          cleared_count: clearedCount,
          in_flight_remaining: inFlightToolUseIds.size
        });
        if (clearedCount > 0) taskRegistry.updateTranscript(taskId, (transcript: any) => ({
          ...transcript,
          inProgressToolUseIDs: new Set(inFlightToolUseIds)
        }));
        updateIdle();
        continue;
      }
      lastMessageType = chunk.type === "system" && "subtype" in chunk ? `system:${chunk.subtype}` : chunk.type;
      let hasNewToolUse = !1;
      if (chunk.type === "assistant") {
        if (chunk.message.id !== lastAssistantMessageId) turns += 1, lastAssistantMessageId = chunk.message.id;
        lastAssistantMessage = chunk;
        for (let block of chunk.message.content) if (block.type === "tool_use") {
          if (lastToolUseId = block.id, inFlightToolUseIds.add(block.id), f0p.has(block.name)) awaitedToolUseIds.add(block.id);
          hasNewToolUse = !0;
        }
      } else if (chunk.type === "user") {
        let content = chunk.message.content;
        if (Array.isArray(content)) {
          for (let block of content) if (typeof block === "object" && block?.type === "tool_result") lastToolResultSeen = block.tool_use_id, hasNewToolUse = inFlightToolUseIds.delete(block.tool_use_id) || hasNewToolUse, awaitedToolUseIds.delete(block.tool_use_id);
        }
      }
      if (armStallTimer(), chunk.type === "system" && chunk.subtype === "api_error") continue;
      collectedMessages.push(chunk), taskRegistry.updateTranscript(taskId, (transcript: any) => ({
        ...transcript,
        messages: M9n(transcript.messages, chunk),
        ...(hasNewToolUse && {
          inProgressToolUseIDs: new Set(inFlightToolUseIds)
        })
      })), updateIdle(), P9n(transcriptHandle, chunk, toolNameSet, toolUseContext.options.tools), f9a(taskId, I3t(transcriptHandle), taskRegistry);
      let lastToolName = p0p(chunk);
      if (lastToolName) m0p(transcriptHandle, taskId, toolUseContext.toolUseId, description, metadata.startTime, lastToolName, metadata.agentType);
    }
    if (clearStallTimer(), finalized) {
      if (!notifyOwner()) throw Error("Agent stalled (stream watchdog)");
      return;
    }
    finalized = !0, stopSummarization?.(), L9n(taskId, taskRegistry);
    let suppressTelemetry = udt(taskId, taskRegistry);
    if (!suppressTelemetry) logCompletion("completed");
    let transcript = taskRegistry.getTranscript(taskId),
      finalMessages = transcript && transcript.messages.length > collectedMessages.length ? transcript.messages : collectedMessages,
      summary = Kdo(finalMessages, taskId, metadata, {
        suppressTelemetry
      });
    if (h9a(summary, taskRegistry), suppressTelemetry) {
      let keepaliveAgentCount = 0,
        entry = taskRegistry.get(taskId);
      if (rc(entry) && entry.keepaliveReasons) {
        for (let reason of entry.keepaliveReasons) if (reason.startsWith("agent:")) keepaliveAgentCount++;
      }
      taskRegistry.updateTranscript(taskId, (transcript: any) => ({
        ...transcript,
        messages: [...transcript.messages.filter((message: any) => !(message.type === "system" && message.subtype === "turn_duration")), x3t(Date.now() - turnStartTime, void 0, void 0, keepaliveAgentCount || void 0)]
      })), A(`[AsyncAgent ${taskId}] parked on keepalive — deferring owner notification until resume`);
      return;
    }
    if (He("subagent_complete"), !notifyOwner()) {
      await getWorktreeResult();
      return;
    }
    let finalMessage = Kl(summary.content, `
`);
    {
      let handoffWarning = await jdo({
        agentMessages: collectedMessages,
        tools: toolUseContext.options.tools,
        toolPermissionContext: Mr(toolUseContext),
        abortSignal: abortController.signal,
        subagentType: metadata.agentType,
        totalToolUseCount: summary.totalToolUseCount
      });
      if (handoffWarning) finalMessage = `${handoffWarning}

${finalMessage}`;
    }
    let worktreeResult = await getWorktreeResult();
    b6e({
      taskId,
      description,
      status: "completed",
      taskRegistry,
      finalMessage,
      usage: {
        totalTokens: Ydo(transcriptHandle),
        toolUses: summary.totalToolUseCount,
        durationMs: summary.totalDurationMs
      },
      toolUseId: toolUseContext.toolUseId,
      ownerAgentId,
      ...worktreeResult
    });
  } catch (error) {
    if (clearStallTimer(), finalized) {
      let message = Ce(error);
      if (A(`[AsyncAgent ${taskId}] completion sequence threw after finalize: ${message}`, {
        level: "error"
      }), x9n(taskId, message, taskRegistry), notifyOwner()) {
        let entry = taskRegistry.get(taskId),
          status = entry?.status;
        b6e({
          taskId,
          description,
          status: status === "completed" ? "completed" : status === "killed" ? "killed" : "failed",
          killedBy: rc(entry) ? entry.killedBy : void 0,
          error: status === "completed" ? void 0 : message,
          taskRegistry,
          toolUseId: toolUseContext.toolUseId,
          ownerAgentId,
          finalMessage: I9n(collectedMessages)
        });
      } else throw error;
      return;
    }
    if (finalized = !0, stopSummarization?.(), error instanceof $c) {
      if (finalizeBackground()) return;
      logCompletion("cancelled"), _ye(taskId, taskRegistry);
      let entry = taskRegistry.get(taskId),
        killedBy = rc(entry) ? entry.killedBy : void 0,
        worktreeResult = await getWorktreeResult();
      if (!notifyOwner()) throw error;
      W("tengu_agent_tool_terminated", {
        agent_type: metadata.agentType,
        model: metadata.resolvedAgentModel,
        duration_ms: Date.now() - metadata.startTime,
        is_async: !0,
        is_built_in_agent: metadata.isBuiltInAgent,
        agent_depth: metadata.agentDepth,
        reason: killedBy === "parent" ? Ve("parent_kill_async") : killedBy === "system" ? Ve("system_kill_async") : Ve("user_kill_async")
      }), b6e({
        taskId,
        description,
        status: "killed",
        killedBy,
        taskRegistry,
        toolUseId: toolUseContext.toolUseId,
        finalMessage: I9n(collectedMessages),
        ownerAgentId,
        ...worktreeResult
      });
      return;
    }
    let message = Ce(error);
    logCompletion("error", {
      errorKind: error instanceof Error ? `${error.name}:${message.slice(0, 80)}` : "unknown"
    }), x9n(taskId, message, taskRegistry);
    let worktreeResult = await getWorktreeResult();
    if (!notifyOwner()) throw error;
    xe("subagent_complete", "subagent_async_errored"), b6e({
      taskId,
      description,
      status: "failed",
      error: message,
      taskRegistry,
      toolUseId: toolUseContext.toolUseId,
      finalMessage: I9n(collectedMessages),
      ownerAgentId,
      ...worktreeResult
    });
  } finally {
    clearStallTimer(), LSt(agentIdForCleanup), _$a(agentIdForCleanup);
  }
}
var c0p: any, d9a: any, m9a: any, zdo: any, f0p: any;
// Module initializer: sets up artifact tool name, immutable tool sets, schema, and stall timeout
var _Y = b(() => {
  Qr();
  lt();
  D$e();
  Zae();
  w$a();
  mn();
  jn();
  kt();
  vu();
  b3t();
  T0();
  ri();
  hS();
  xS();
  lb();
  xl();
  qe();
  Hdo();
  NW();
  AR();
  dn();
  Ct();
  Fhe();
  po();
  E9n();
  gA();
  gye();
  oh();
  H9n();
  oS();
  pw();
  g1();
  i6e();
  dm();
  r6e();
  ow();
  dye();
  XR();
  $A();
  Tot();
  fg();
  c0p = (iee(), oo(_Mt)).ARTIFACT_TOOL_NAME, d9a = new Set([LO, QR, wD, Kz, j0]);
  m9a = ve(() => C.object({
    agentId: C.string(),
    agentType: C.string().optional(),
    content: C.array(C.object({
      type: C.literal("text"),
      text: C.string()
    })),
    resolvedModel: C.string().optional(),
    totalToolUseCount: C.number(),
    totalDurationMs: C.number(),
    totalTokens: C.number(),
    usage: C.object({
      input_tokens: C.number(),
      output_tokens: C.number(),
      cache_creation_input_tokens: C.number().nullable(),
      cache_read_input_tokens: C.number().nullable(),
      server_tool_use: C.object({
        web_search_requests: C.number(),
        web_fetch_requests: C.number()
      }).nullable(),
      service_tier: C.enum(["standard", "priority", "batch"]).nullable(),
      cache_creation: C.object({
        ephemeral_1h_input_tokens: C.number(),
        ephemeral_5m_input_tokens: C.number()
      }).nullable()
    }),
    toolStats: C.object({
      readCount: C.number(),
      searchCount: C.number(),
      bashCount: C.number(),
      editFileCount: C.number(),
      linesAdded: C.number(),
      linesRemoved: C.number(),
      otherToolCount: C.number()
    }).optional()
  }));
  zdo = A3t + R3t + 60000;
  f0p = new Set([ls]);
});

export {p9a,Wdo,Gdo,Vdo,Ate,u0p,d0p,Kdo,p0p,m0p,jdo,I9n,E6e,c0p,d9a,m9a,zdo,f0p,_Y};
