// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getLastMainThreadCacheTtlMs as aSt,l0,lt} from "../session/0132_sent.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {parseToolListFromCLI as j1,cy} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {Mn,xD,Kl,po} from "../tools/5224_userPromptCount.ts";
import {h1,lh} from "../../vendor/m2739.ts";
import {uge,Gk} from "../../vendor/m2727.ts";
import {qke} from "../../vendor/m2765.ts";
import {nia,HI} from "../telemetry/3173_error.ts";
import {BWn,Hbo} from "../../vendor/m4425.ts";
import {OP,YL} from "../../vendor/m123.ts";
import {$E} from "../core/4189_input_tokens.ts";
import {recordSidechainTranscript as Ece,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {jq,xye} from "../permissions/4423_content.ts";
import {m6e,C$a,y9n} from "../core/3975_y9n.ts";
import {Qte,qWn,rb} from "../permissions/5211_level.ts";
import {cce,E3t} from "../../vendor/m3971.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {S5t} from "../permissions/4425_headers.ts";
// @ts-nocheck
/**
 * Forked-agent runtime: spins up a subagent query context that shares (or
 * isolates) the parent tool-use context, runs the query loop, and records the
 * forked transcript. Also holds the "cache-safe params" snapshot used to keep
 * the main thread's prompt cache warm across forks.
 */
var Xil = {};
ft(Xil, {
  withDisallowedCommandTools: () => withDisallowedCommandTools,
  withAllowedCommandTools: () => withAllowedCommandTools,
  saveCacheSafeParams: () => saveCacheSafeParams,
  runForkedAgent: () => runForkedAgent,
  prepareForkedCommandContext: () => prepareForkedCommandContext,
  isMainThreadCacheWarm: () => isMainThreadCacheWarm,
  getLastCacheSafeParams: () => getLastCacheSafeParams,
  forkPointUuidOf: () => forkPointUuidOf,
  extractResultText: () => extractResultText,
  createSubagentContext: () => createSubagentContext,
  createGetAppStateWithForkedToolScoping: () => createGetAppStateWithForkedToolScoping,
  createCacheSafeParams: () => createCacheSafeParams,
  FORKED_AGENT_DEFAULT_MAX_TURNS: () => FORKED_AGENT_DEFAULT_MAX_TURNS,
  ASYNC_SHARED_APP_STATE_KEYS: () => ASYNC_SHARED_APP_STATE_KEYS
});
/** Store (or clear) the latest cache-safe params snapshot and its timestamp/model. */
function saveCacheSafeParams(params) {
  b8e = params, xbo = params ? Date.now() : null, Dbo = params ? gs() : null;
}
/** Return the cached snapshot, patching mainLoopModel if the model changed since save. */
function getLastCacheSafeParams() {
  if (!b8e) return null;
  let currentModel = gs();
  if (Dbo === currentModel) return b8e;
  return {
    ...b8e,
    toolUseContext: {
      ...b8e.toolUseContext,
      options: {
        ...b8e.toolUseContext.options,
        mainLoopModel: currentModel
      }
    }
  };
}
/** True if the snapshot is still fresh enough (within 90% of the cache TTL) and the model is unchanged. */
function isMainThreadCacheWarm(nowMs = Date.now()) {
  if (b8e === null || xbo === null) return !1;
  if (Dbo !== gs()) return !1;
  let cacheTtlMs = aSt();
  if (cacheTtlMs === null) return !1;
  return nowMs - xbo < cacheTtlMs * 0.9;
}
/** Build a cache-safe params object from a fork context. */
function createCacheSafeParams(ctx) {
  return {
    systemPrompt: ctx.systemPrompt,
    userContext: ctx.userContext,
    systemContext: ctx.systemContext,
    toolUseContext: ctx.toolUseContext,
    forkContextMessages: ctx.messages,
    stickyBetas: ctx.stickyBetas
  };
}
/** Append command tool-name allow rules to a tool permission context. */
function withAllowedCommandTools(permCtx, toolNames) {
  if (toolNames.length === 0) return permCtx;
  return {
    ...permCtx,
    alwaysAllowRules: {
      ...permCtx.alwaysAllowRules,
      command: os([...(permCtx.alwaysAllowRules.command || []), ...toolNames])
    }
  };
}
/** Append command tool-name deny rules to a tool permission context. */
function withDisallowedCommandTools(permCtx, toolNames) {
  if (toolNames.length === 0) return permCtx;
  return {
    ...permCtx,
    alwaysDenyRules: {
      ...permCtx.alwaysDenyRules,
      command: os([...(permCtx.alwaysDenyRules.command || []), ...toolNames])
    }
  };
}
/** Wrap getAppState so the returned state's permission context is scoped to the fork's allow/deny lists. */
function createGetAppStateWithForkedToolScoping(getAppState, allowedTools, disallowedTools) {
  if (allowedTools.length === 0 && disallowedTools.length === 0) return getAppState;
  return () => {
    let state = getAppState();
    return {
      ...state,
      toolPermissionContext: withDisallowedCommandTools(withAllowedCommandTools(state.toolPermissionContext, allowedTools), disallowedTools)
    };
  };
}
/** Prepare the prompt, permission layers, and base agent needed to fork a slash-command into an agent run. */
async function prepareForkedCommandContext(command, commandName, toolUseContext) {
  let promptText = (await command.getPromptForCommand(commandName, toolUseContext)).map(part => part.type === "text" ? part.text : "").join(`
`),
    allowedTools = j1(command.allowedTools ?? []),
    disallowedTools = j1(command.disallowedTools ?? []),
    modifiedGetAppState = createGetAppStateWithForkedToolScoping(toolUseContext.getAppState, allowedTools, disallowedTools),
    contextLayers = [...(allowedTools.length === 0 ? [] : [{
      kind: "allowed_tools",
      allowedTools: allowedTools
    }]), ...(disallowedTools.length === 0 ? [] : [{
      kind: "disallowed_tools",
      disallowedTools: disallowedTools
    }])],
    agentName = command.agent ?? "general-purpose",
    activeAgents = toolUseContext.options.agentDefinitions.activeAgents,
    baseAgent = activeAgents.find(agent => agent.agentType === agentName) ?? activeAgents.find(agent => agent.agentType === "general-purpose") ?? activeAgents[0];
  if (!baseAgent) throw Error("No agent available for forked execution");
  let promptMessages = [Mn({
    content: promptText,
    isMeta: !0
  })];
  return {
    skillContent: promptText,
    modifiedGetAppState: modifiedGetAppState,
    contextLayers: contextLayers,
    baseAgent: baseAgent,
    promptMessages: promptMessages
  };
}
/** Extract the last assistant message's text, falling back to a default string. */
function extractResultText(messages, defaultText = "Execution completed") {
  let lastAssistant = xD(messages);
  if (!lastAssistant) return defaultText;
  return Kl(lastAssistant.message.content, `
`) || defaultText;
}
/** Build a subagent tool-use context derived from a parent context, applying optional overrides for sharing/isolation. */
function createSubagentContext(parentCtx, overrides) {
  let abortController = overrides?.abortController ?? (overrides?.shareAbortController ? parentCtx.abortController : h1(parentCtx.abortController)),
    getAppState = overrides?.getAppState ? overrides.getAppState : overrides?.shareAbortController ? parentCtx.getAppState : () => {
      let state = parentCtx.getAppState();
      if (state.toolPermissionContext.shouldAvoidPermissionPrompts) return state;
      return {
        ...state,
        toolPermissionContext: {
          ...state.toolPermissionContext,
          shouldAvoidPermissionPrompts: !0
        }
      };
    },
    avoidPromptsLayer = overrides?.shareAbortController || overrides?.getAppState ? [] : [{
      kind: "avoid_prompts"
    }],
    permissionLayers = [...(parentCtx.permissionLayers ?? []), ...avoidPromptsLayer, ...(overrides?.permissionLayers ?? [])],
    options = overrides?.options ?? parentCtx.options;
  if (overrides?.options && overrides.options.tools !== parentCtx.options.tools) {
    let refreshToolsSame = overrides.options.refreshTools !== void 0 && overrides.options.refreshTools === parentCtx.options.refreshTools,
      refreshMcpSame = overrides.options.refreshMcpClients !== void 0 && overrides.options.refreshMcpClients === parentCtx.options.refreshMcpClients;
    if (refreshToolsSame || refreshMcpSame) options = {
      ...overrides.options,
      refreshTools: refreshToolsSame ? void 0 : overrides.options.refreshTools,
      refreshMcpClients: refreshMcpSame ? void 0 : overrides.options.refreshMcpClients
    };
  }
  return {
    messageQueue: parentCtx.messageQueue,
    readFileState: uge(overrides?.readFileState ?? parentCtx.readFileState),
    nestedMemoryAttachmentTriggers: [],
    loadedNestedMemoryPaths: {},
    sessionEnvVars: parentCtx.sessionEnvVars,
    dynamicSkillDirTriggers: [],
    memorySelector: qke(),
    toolDecisions: void 0,
    contentReplacementState: overrides?.contentReplacementState ?? (parentCtx.contentReplacementState ? nia(parentCtx.contentReplacementState) : void 0),
    abortController: abortController,
    getAppState: getAppState,
    permissionLayers: permissionLayers,
    setAppState: overrides?.shareSetAppState ? parentCtx.setAppState : updater => parentCtx.setAppState(prevState => {
      let nextState = updater(prevState);
      if (nextState === prevState) return prevState;
      let changed = !1,
        merged = {
          ...prevState
        };
      for (let key of ASYNC_SHARED_APP_STATE_KEYS) if (nextState[key] !== prevState[key]) Object.assign(merged, {
        [key]: nextState[key]
      }), changed = !0;
      return changed ? merged : prevState;
    }),
    setToolPermissionContext: overrides?.shareSetAppState ? parentCtx.setToolPermissionContext : () => {},
    getMcp: parentCtx.getMcp,
    getWebBrowser: parentCtx.getWebBrowser,
    isolationLatch: overrides?.isolationLatch ?? parentCtx.isolationLatch,
    taskRegistry: parentCtx.taskRegistry,
    sessionHooksRegistry: parentCtx.sessionHooksRegistry,
    getReplContexts: parentCtx.getReplContexts,
    setReplContext: parentCtx.setReplContext,
    setWebBrowserSlice: parentCtx.setWebBrowserSlice,
    setArtifactReadVersion: parentCtx.setArtifactReadVersion,
    agentLifecycle: parentCtx.agentLifecycle,
    teammateColors: parentCtx.teammateColors,
    rootToolSurface: parentCtx.rootToolSurface,
    localDenialTracking: overrides?.shareSetAppState ? parentCtx.localDenialTracking : BWn(),
    getFileHistoryState: () => {
      return;
    },
    applyFileHistoryOp: () => {},
    applyAttributionOp: parentCtx.applyAttributionOp,
    requestDialog: parentCtx.requestDialog,
    setToolJSX: void 0,
    onCompactEvent: void 0,
    onRetryStatus: void 0,
    options: options,
    messages: overrides?.messages ?? parentCtx.messages,
    turnStartIndex: 0,
    agentId: overrides?.agentId ?? OP(),
    agentType: overrides?.agentType,
    agentContext: overrides?.agentContext ?? parentCtx.agentContext,
    agentWorktree: parentCtx.agentWorktree,
    spawnedByWorkflowRunId: overrides?.spawnedByWorkflowRunId ?? parentCtx.spawnedByWorkflowRunId,
    precomputeSourceKey: overrides?.precomputeSourceKey,
    teammateContext: overrides?.teammateContext ?? parentCtx.teammateContext,
    queryTracking: {
      chainId: jil.randomUUID(),
      depth: (parentCtx.queryTracking?.depth ?? -1) + 1
    },
    fileReadingLimits: parentCtx.fileReadingLimits,
    userModified: parentCtx.userModified,
    criticalSystemReminder_EXPERIMENTAL: overrides?.criticalSystemReminder_EXPERIMENTAL,
    requireCanUseTool: overrides?.requireCanUseTool
  };
}
/** Find the uuid of the fork point: the first message of the trailing assistant turn (messages sharing the same id). */
function forkPointUuidOf(messages) {
  let idx = messages.length - 1,
    lastMsg = messages[idx];
  if (lastMsg?.type === "assistant") {
    let assistantId = lastMsg.message.id;
    while (idx > 0) {
      let prev = messages[idx - 1];
      if (prev?.type !== "assistant" || prev.message.id !== assistantId) break;
      idx--;
    }
  }
  return messages[idx]?.uuid;
}
/** Run a forked agent query loop, collecting messages, accumulating token usage, and recording the transcript. */
async function runForkedAgent({
  promptMessages: promptMessages,
  cacheSafeParams: cacheSafeParams,
  canUseTool: canUseTool,
  querySource: querySource,
  forkLabel: forkLabel,
  overrides: overrides,
  maxOutputTokens: maxOutputTokens,
  maxTurns: maxTurns,
  onMessage: onMessage,
  skipTranscript: skipTranscript,
  skipCacheWrite: skipCacheWrite,
  fallbackModel: fallbackModel
}) {
  let startMs = Date.now(),
    collectedMessages = [],
    streamState = null,
    tokenUsage = {
      ...$E
    },
    {
      systemPrompt: systemPrompt,
      userContext: userContext,
      systemContext: systemContext,
      toolUseContext: toolUseCtx,
      forkContextMessages: forkContextMessages
    } = cacheSafeParams,
    subagentCtx = createSubagentContext(toolUseCtx, {
      ...overrides,
      options: overrides?.options ?? (fallbackModel !== void 0 ? {
        ...toolUseCtx.options
      } : void 0),
      isolationLatch: overrides?.isolationLatch ?? {
        current: toolUseCtx.isolationLatch?.current ?? null,
        exemptServers: toolUseCtx.isolationLatch?.exemptServers
      },
      precomputeSourceKey: overrides?.precomputeSourceKey ?? toolUseCtx.agentId ?? "main"
    }),
    allMessages = [...forkContextMessages, ...promptMessages],
    forkUuid = forkPointUuidOf(forkContextMessages),
    transcriptId = skipTranscript ? void 0 : OP(forkLabel),
    lastTranscriptUuid = null;
  if (transcriptId) await Ece(promptMessages, transcriptId).catch(err => A(`Forked agent [${forkLabel}] failed to record initial transcript: ${err}`)), lastTranscriptUuid = promptMessages.at(-1)?.uuid ?? null;
  let maxTurnsResolved = maxTurns ?? FORKED_AGENT_DEFAULT_MAX_TURNS,
    assistantTurnCount = 0;
  try {
    for await (let msg of jq({
      messages: allMessages,
      systemPrompt: systemPrompt,
      userContext: userContext,
      systemContext: systemContext,
      canUseTool: canUseTool,
      toolUseContext: subagentCtx,
      querySource: querySource,
      fallbackModel: fallbackModel,
      maxOutputTokensOverride: maxOutputTokens,
      maxTurns: maxTurnsResolved,
      skipCacheWrite: skipCacheWrite,
      forkPointUuid: forkUuid,
      stickyBetas: cacheSafeParams.stickyBetas ? l0(cacheSafeParams.stickyBetas) : void 0
    })) {
      if (m6e(msg)) {
        if (msg.type === "stream_event" && msg.event?.type === "message_delta" && msg.event.usage) {
          let deltaUsage = Qte({
            ...$E
          }, msg.event.usage);
          tokenUsage = qWn(tokenUsage, deltaUsage);
        }
        continue;
      }
      if (C$a(msg)) continue;
      if (msg.type === "assistant") assistantTurnCount++;
      if (A(`Forked agent [${forkLabel}] received message: type=${msg.type}`), collectedMessages.push(msg), streamState = cce(collectedMessages, msg, streamState, allMessages), onMessage?.(msg), transcriptId && (msg.type === "assistant" || msg.type === "user" || msg.type === "progress")) {
        if (await Ece([msg], transcriptId, lastTranscriptUuid).catch(err => A(`Forked agent [${forkLabel}] failed to record transcript: ${err}`)), msg.type !== "progress") lastTranscriptUuid = msg.uuid;
      }
    }
  } finally {
    if (streamState) collectedMessages.push(...streamState.preserved);
    subagentCtx.readFileState.clear(), allMessages.length = 0;
  }
  A(`Forked agent [${forkLabel}] finished: ${collectedMessages.length} messages, types=[${collectedMessages.map(msg => msg.type).join(", ")}], totalUsage: input=${tokenUsage.input_tokens} output=${tokenUsage.output_tokens} cacheRead=${tokenUsage.cache_read_input_tokens} cacheCreate=${tokenUsage.cache_creation_input_tokens}`);
  let durationMs = Date.now() - startMs;
  if (maxTurns === void 0 && assistantTurnCount >= FORKED_AGENT_DEFAULT_MAX_TURNS) W("tengu_forked_agent_default_turns_exceeded", {
    forkLabel: forkLabel,
    querySource: querySource,
    turnCount: assistantTurnCount
  });
  return logForkAgentTelemetry({
    forkLabel: forkLabel,
    querySource: querySource,
    durationMs: durationMs,
    messageCount: collectedMessages.length,
    totalUsage: tokenUsage,
    queryTracking: toolUseCtx.queryTracking
  }), {
    messages: collectedMessages,
    totalUsage: tokenUsage
  };
}
/** Emit the tengu_fork_agent_query telemetry event with computed cache hit rate. */
function logForkAgentTelemetry({
  forkLabel: forkLabel,
  querySource: querySource,
  durationMs: durationMs,
  messageCount: messageCount,
  totalUsage: totalUsage,
  queryTracking: queryTracking
}) {
  let totalInputTokens = totalUsage.input_tokens + totalUsage.cache_creation_input_tokens + totalUsage.cache_read_input_tokens,
    cacheHitRate = totalInputTokens > 0 ? totalUsage.cache_read_input_tokens / totalInputTokens : 0;
  W("tengu_fork_agent_query", {
    forkLabel: forkLabel,
    querySource: querySource,
    durationMs: durationMs,
    messageCount: messageCount,
    inputTokens: totalUsage.input_tokens,
    outputTokens: totalUsage.output_tokens,
    cacheReadInputTokens: totalUsage.cache_read_input_tokens,
    cacheCreationInputTokens: totalUsage.cache_creation_input_tokens,
    serviceTier: Le(totalUsage.service_tier),
    cacheCreationEphemeral1hTokens: totalUsage.cache_creation.ephemeral_1h_input_tokens,
    cacheCreationEphemeral5mTokens: totalUsage.cache_creation.ephemeral_5m_input_tokens,
    cacheHitRate: cacheHitRate,
    ...(queryTracking && {
      queryChainId: xr(queryTracking.chainId),
      queryDepth: queryTracking.depth
    })
  });
}
var jil,
  FORKED_AGENT_DEFAULT_MAX_TURNS = 50,
  b8e = null,
  xbo = null,
  Dbo = null,
  ASYNC_SHARED_APP_STATE_KEYS;
var ID = b(() => {
  lt();
  xye();
  kt();
  QT();
  rb();
  S5t();
  E3t();
  y9n();
  lh();
  qe();
  Gk();
  po();
  Ro();
  Hbo();
  cy();
  _a();
  HI();
  YL();
  jil = require("crypto");
  ASYNC_SHARED_APP_STATE_KEYS = ["frameUrls"];
});
export {Xil,saveCacheSafeParams,getLastCacheSafeParams,isMainThreadCacheWarm,createCacheSafeParams,withAllowedCommandTools,withDisallowedCommandTools,createGetAppStateWithForkedToolScoping,prepareForkedCommandContext,extractResultText,createSubagentContext,forkPointUuidOf,runForkedAgent,logForkAgentTelemetry as xVp,jil,FORKED_AGENT_DEFAULT_MAX_TURNS,b8e,xbo,Dbo,ASYNC_SHARED_APP_STATE_KEYS,ID};
