// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {getMainLoopModel as Ns,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {getLastMainThreadCacheTtlMs as agt,$I as NI,lt as ct} from "../session/0131_sent.ts";
import {fs as ps} from "../api/0459_getOauthConfig.ts";
import {parseToolListFromCLI as EN,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {Ln,_P as gP,wc as Uc,lo} from "../tools/5190_userPromptCount.ts";
import {rN as K1,ch as uh} from "../../vendor/m2727.ts";
import {QAe as MAe,xk as Ck} from "../../vendor/m2715.ts";
import {nxe as BRe} from "../../vendor/m2753.ts";
import {ZQi as MXi,eI as M0} from "../telemetry/3157_error.ts";
import {T6n as Iqn,Mho as DAo} from "../../vendor/m4403.ts";
import {mO as gF,MM as _F} from "../../vendor/m126.ts";
import {PE as xE} from "../core/4176_input_tokens.ts";
import {recordSidechainTranscript as uce,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {caughtError as h6,u_e as Yge} from "../permissions/4401_content.ts";
import {D4e as l4e,gOa as rPa,qFn as sFn} from "../core/3904_qFn.ts";
import {ine as Jte,E6n as Oqn,rb as eb} from "../permissions/5178_level.ts";
import {cce as kge,S2t as ZUt} from "../../vendor/m3889.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {Br,WS as BS} from "../../vendor/m1456.ts";
import {z4t as v4t} from "../permissions/4403_headers.ts";
// @ts-nocheck
var forkAgentModuleExports = {};
pt(forkAgentModuleExports, {
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
  ASYNC_SHARED_APP_STATE_KEYS: () => ASYNC_SHARED_APP_STATE_KEYS_2
});
function saveCacheSafeParams(params) {
  cachedSafeParams = params, cacheParamsSavedAt = params ? Date.now() : null, ASYNC_SHARED_APP_STATE_KEYS = params ? Ns() : null;
}
function getLastCacheSafeParams() {
  if (!cachedSafeParams) return null;
  let e = Ns();
  if (ASYNC_SHARED_APP_STATE_KEYS === e) return cachedSafeParams;
  return {
    ...cachedSafeParams,
    toolUseContext: {
      ...cachedSafeParams.toolUseContext,
      options: {
        ...cachedSafeParams.toolUseContext.options,
        mainLoopModel: e
      }
    }
  };
}
function isMainThreadCacheWarm(nowMs = Date.now()) {
  if (cachedSafeParams === null || cacheParamsSavedAt === null) return false;
  if (ASYNC_SHARED_APP_STATE_KEYS !== Ns()) return false;
  let t = agt();
  if (t === null) return false;
  return nowMs - cacheParamsSavedAt < t * 0.9;
}
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
function withAllowedCommandTools(permCtx, toolNames) {
  if (toolNames.length === 0) return permCtx;
  return {
    ...permCtx,
    alwaysAllowRules: {
      ...permCtx.alwaysAllowRules,
      command: ps([...(permCtx.alwaysAllowRules.command || []), ...toolNames])
    }
  };
}
function withDisallowedCommandTools(permCtx, toolNames) {
  if (toolNames.length === 0) return permCtx;
  return {
    ...permCtx,
    alwaysDenyRules: {
      ...permCtx.alwaysDenyRules,
      command: ps([...(permCtx.alwaysDenyRules.command || []), ...toolNames])
    }
  };
}
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
async function prepareForkedCommandContext(command, commandName, toolUseContext) {
  let promptParts = (await command.getPromptForCommand(commandName, toolUseContext)).map(J => J.type === "text" ? J.text : "").join(`
`),
    skillContent = EN(command.allowedTools ?? []),
    allowedTools = EN(command.disallowedTools ?? []),
    disallowedTools = createGetAppStateWithForkedToolScoping(toolUseContext.getAppState, skillContent, allowedTools),
    modifiedGetAppState = [...(skillContent.length === 0 ? [] : [{
      kind: "allowed_tools",
      allowedTools: skillContent
    }]), ...(allowedTools.length === 0 ? [] : [{
      kind: "disallowed_tools",
      disallowedTools: allowedTools
    }])],
    contextLayers = command.agent ?? "general-purpose",
    agentType = toolUseContext.options.agentDefinitions.activeAgents,
    activeAgents = agentType.find(J => J.agentType === contextLayers) ?? agentType.find(J => J.agentType === "general-purpose") ?? agentType[0];
  if (!activeAgents) throw Error("No agent available for forked execution");
  let j = [Ln({
    content: promptParts,
    isMeta: true
  })];
  return {
    skillContent: promptParts,
    modifiedGetAppState: disallowedTools,
    contextLayers: modifiedGetAppState,
    baseAgent: activeAgents,
    promptMessages: j
  };
}
function extractResultText(messages, defaultText = "Execution completed") {
  let lastAssistant = gP(messages);
  if (!lastAssistant) return defaultText;
  return Uc(lastAssistant.message.content, `
`) || defaultText;
}
function createSubagentContext(parentCtx, overrides) {
  let abortController = overrides?.abortController ?? (overrides?.shareAbortController ? parentCtx.abortController : K1(parentCtx.abortController)),
    getAppState = overrides?.getAppState ? overrides.getAppState : overrides?.shareAbortController ? parentCtx.getAppState : () => {
      let state = parentCtx.getAppState();
      if (state.toolPermissionContext.shouldAvoidPermissionPrompts) return state;
      return {
        ...state,
        toolPermissionContext: {
          ...state.toolPermissionContext,
          shouldAvoidPermissionPrompts: true
        }
      };
    },
    avoidPromptsLayer = overrides?.shareAbortController || overrides?.getAppState ? [] : [{
      kind: "avoid_prompts"
    }],
    permissionLayers = [...(parentCtx.permissionLayers ?? []), ...avoidPromptsLayer, ...(overrides?.permissionLayers ?? [])],
    options = overrides?.options ?? parentCtx.options;
  if (overrides?.options && overrides.options.tools !== parentCtx.options.tools) {
    let refreshToolsSame = overrides.options.refreshTools !== undefined && overrides.options.refreshTools === parentCtx.options.refreshTools,
      refreshMcpSame = overrides.options.refreshMcpClients !== undefined && overrides.options.refreshMcpClients === parentCtx.options.refreshMcpClients;
    if (refreshToolsSame || refreshMcpSame) options = {
      ...overrides.options,
      refreshTools: refreshToolsSame ? undefined : overrides.options.refreshTools,
      refreshMcpClients: refreshMcpSame ? undefined : overrides.options.refreshMcpClients
    };
  }
  return {
    messageQueue: parentCtx.messageQueue,
    readFileState: MAe(overrides?.readFileState ?? parentCtx.readFileState),
    nestedMemoryAttachmentTriggers: [],
    loadedNestedMemoryPaths: {},
    sessionEnvVars: parentCtx.sessionEnvVars,
    dynamicSkillDirTriggers: [],
    memorySelector: BRe(),
    toolDecisions: undefined,
    contentReplacementState: overrides?.contentReplacementState ?? (parentCtx.contentReplacementState ? MXi(parentCtx.contentReplacementState) : undefined),
    abortController: abortController,
    getAppState: getAppState,
    permissionLayers: permissionLayers,
    setAppState: overrides?.shareSetAppState ? parentCtx.setAppState : updater => parentCtx.setAppState(prevState => {
      let nextState = updater(prevState);
      if (nextState === prevState) return prevState;
      let changed = false,
        merged = {
          ...prevState
        };
      for (let key of ASYNC_SHARED_APP_STATE_KEYS_2) if (nextState[key] !== prevState[key]) Object.assign(merged, {
        [key]: nextState[key]
      }), changed = true;
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
    localDenialTracking: overrides?.shareSetAppState ? parentCtx.localDenialTracking : Iqn(),
    getFileHistoryState: () => {
      return;
    },
    applyFileHistoryOp: () => {},
    applyAttributionOp: parentCtx.applyAttributionOp,
    requestDialog: parentCtx.requestDialog,
    setToolJSX: undefined,
    onCompactEvent: undefined,
    onRetryStatus: undefined,
    options: options,
    messages: overrides?.messages ?? parentCtx.messages,
    turnStartIndex: 0,
    agentId: overrides?.agentId ?? gF(),
    agentType: overrides?.agentType,
    agentContext: overrides?.agentContext ?? parentCtx.agentContext,
    agentWorktree: parentCtx.agentWorktree,
    spawnedByWorkflowRunId: overrides?.spawnedByWorkflowRunId ?? parentCtx.spawnedByWorkflowRunId,
    precomputeSourceKey: overrides?.precomputeSourceKey,
    teammateContext: overrides?.teammateContext ?? parentCtx.teammateContext,
    queryTracking: {
      chainId: cryptoModule.randomUUID(),
      depth: (parentCtx.queryTracking?.depth ?? -1) + 1
    },
    fileReadingLimits: parentCtx.fileReadingLimits,
    userModified: parentCtx.userModified,
    criticalSystemReminder_EXPERIMENTAL: overrides?.criticalSystemReminder_EXPERIMENTAL,
    requireCanUseTool: overrides?.requireCanUseTool
  };
}
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
      ...xE
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
      options: overrides?.options ?? (fallbackModel !== undefined ? {
        ...toolUseCtx.options
      } : undefined),
      isolationLatch: overrides?.isolationLatch ?? {
        current: toolUseCtx.isolationLatch?.current ?? null,
        exemptServers: toolUseCtx.isolationLatch?.exemptServers
      },
      precomputeSourceKey: overrides?.precomputeSourceKey ?? toolUseCtx.agentId ?? "main"
    }),
    allMessages = [...forkContextMessages, ...promptMessages],
    forkUuid = forkPointUuidOf(forkContextMessages),
    transcriptId = skipTranscript ? undefined : gF(forkLabel),
    lastTranscriptUuid = null;
  if (transcriptId) await uce(promptMessages, transcriptId).catch(err => v(`Forked agent [${forkLabel}] failed to record initial transcript: ${err}`)), lastTranscriptUuid = promptMessages.at(-1)?.uuid ?? null;
  let maxTurnsResolved = maxTurns ?? FORKED_AGENT_DEFAULT_MAX_TURNS,
    assistantTurnCount = 0;
  try {
    for await (let msg of h6({
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
      stickyBetas: cacheSafeParams.stickyBetas ? NI(cacheSafeParams.stickyBetas) : undefined
    })) {
      if (l4e(msg)) {
        if (msg.type === "stream_event" && msg.event?.type === "message_delta" && msg.event.usage) {
          let deltaUsage = Jte({
            ...xE
          }, msg.event.usage);
          tokenUsage = Oqn(tokenUsage, deltaUsage);
        }
        continue;
      }
      if (rPa(msg)) continue;
      if (msg.type === "assistant") assistantTurnCount++;
      if (v(`Forked agent [${forkLabel}] received message: type=${msg.type}`), collectedMessages.push(msg), streamState = kge(collectedMessages, msg, streamState, allMessages), onMessage?.(msg), transcriptId && (msg.type === "assistant" || msg.type === "user" || msg.type === "progress")) {
        if (await uce([msg], transcriptId, lastTranscriptUuid).catch(b => v(`Forked agent [${forkLabel}] failed to record transcript: ${b}`)), msg.type !== "progress") lastTranscriptUuid = msg.uuid;
      }
    }
  } finally {
    if (streamState) collectedMessages.push(...streamState.preserved);
    subagentCtx.readFileState.clear(), allMessages.length = 0;
  }
  v(`Forked agent [${forkLabel}] finished: ${collectedMessages.length} messages, types=[${collectedMessages.map(m => m.type).join(", ")}], totalUsage: input=${tokenUsage.input_tokens} output=${tokenUsage.output_tokens} cacheRead=${tokenUsage.cache_read_input_tokens} cacheCreate=${tokenUsage.cache_creation_input_tokens}`);
  let durationMs = Date.now() - startMs;
  if (maxTurns === undefined && assistantTurnCount >= FORKED_AGENT_DEFAULT_MAX_TURNS) j("tengu_forked_agent_default_turns_exceeded", {
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
  j("tengu_fork_agent_query", {
    forkLabel: forkLabel,
    querySource: querySource,
    durationMs: durationMs,
    messageCount: messageCount,
    inputTokens: totalUsage.input_tokens,
    outputTokens: totalUsage.output_tokens,
    cacheReadInputTokens: totalUsage.cache_read_input_tokens,
    cacheCreationInputTokens: totalUsage.cache_creation_input_tokens,
    serviceTier: Ue(totalUsage.service_tier),
    cacheCreationEphemeral1hTokens: totalUsage.cache_creation.ephemeral_1h_input_tokens,
    cacheCreationEphemeral5mTokens: totalUsage.cache_creation.ephemeral_5m_input_tokens,
    cacheHitRate: cacheHitRate,
    ...(queryTracking && {
      queryChainId: Br(queryTracking.chainId),
      queryDepth: queryTracking.depth
    })
  });
}
var cryptoModule,
  FORKED_AGENT_DEFAULT_MAX_TURNS = 50,
  cachedSafeParams = null,
  cacheParamsSavedAt = null,
  ASYNC_SHARED_APP_STATE_KEYS = null,
  ASYNC_SHARED_APP_STATE_KEYS_2;
var hP = b(() => {
  ct();
  Yge();
  Ct();
  BS();
  eb();
  v4t();
  ZUt();
  sFn();
  uh();
  je();
  Ck();
  lo();
  Fo();
  DAo();
  ly();
  za();
  M0();
  _F();
  cryptoModule = require("crypto");
  ASYNC_SHARED_APP_STATE_KEYS_2 = ["frameUrls"];
});

export {forkAgentModuleExports as cel,saveCacheSafeParams,getLastCacheSafeParams,isMainThreadCacheWarm,createCacheSafeParams,withAllowedCommandTools,withDisallowedCommandTools,createGetAppStateWithForkedToolScoping,prepareForkedCommandContext,extractResultText,createSubagentContext,forkPointUuidOf,runForkedAgent,logForkAgentTelemetry as z9p,cryptoModule as iel,FORKED_AGENT_DEFAULT_MAX_TURNS,cachedSafeParams as z6e,cacheParamsSavedAt as Bho,ASYNC_SHARED_APP_STATE_KEYS as Fho,ASYNC_SHARED_APP_STATE_KEYS_2 as ASYNC_SHARED_APP_STATE_KEYS,hP as gP};
