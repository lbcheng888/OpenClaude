// @ts-nocheck
import {Eat} from "../../vendor/m3354.ts";
import {Jfe,JS,ez} from "../../vendor/m2239.ts";
import {getStrictMcpConfig as Pbe,getIsRemoteMode as la,getSessionId as It,getProjectRoot as ic,l0,getStickyBetas as zH,Ere,lt} from "../session/0132_sent.ts";
import {buildMcpToolName as Vl,ky} from "../agent/2238_explicitlyRequested.ts";
import {dl,dn} from "../config/0137_namespace.ts";
import {doesEnterpriseMcpConfigExist as E1,getMcpConfigByName as I$,filterMcpServersByPolicy as K4,KA} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Fnt,Dvn} from "../../vendor/m2592.ts";
import {VO,MD,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {pte,tce} from "./3892_permissionMode.ts";
import {yye,Tye} from "../telemetry/3989_agentType.ts";
import {OP,YL} from "../../vendor/m123.ts";
import {c8i,u8i,D_} from "../agent/2784_withFileTypes.ts";
import {Vge,fDn,X9e,Zst} from "../config/3197_agentId.ts";
import {forkPointUuidOf as p4n,createSubagentContext as d4n,ID} from "../artifact/4427_withDisallowedCommandTools.ts";
import {uge,_$,eB,Gk} from "../../vendor/m2727.ts";
import {Py,AE,y$} from "../config/2734_duration_ms.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Won,FS} from "../../vendor/m722.ts";
import {Ate,p9a,d9a,Vdo,_Y} from "./3988_toolName.ts";
import {k3,Ph} from "../agent/1459_agentType.ts";
import {vc} from "../api/3886_level.ts";
import {nt} from "../../vendor/m127.ts";
import {executeSubagentStartHooks as g4t} from "../../vendor/m5195.ts";
import {createAttachmentMessage as ti,getDeferredToolsDeltaAttachment as Dye,getSkillListingAttachments as m4n,clearSentSkillNamesForAgent as Gmo,GA} from "../agent/4451_tryGetPDFReference.ts";
import {A$a,R$a} from "../agent/3976_R$a.ts";
import {getSkillToolCommands as bC,getCommand as Q6e,hasCommand as tpt,Mm} from "../tools/5174_toSlashCommands.ts";
import {ept,d4t} from "../telemetry/4103_runUserPromptExpansionHook.ts";
import {Mn,Kmo,ST,h4n,po} from "../tools/5224_userPromptCount.ts";
import {aS,uee} from "../../vendor/m2762.ts";
import {h9n,h$a,Cdo} from "../../vendor/m3969.ts";
import {recordForkContextRef as Vmo,recordSidechainTranscript as Ece,writeAgentMetadata as rpt,readAgentMetadata as Pye,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {FORK_SUBAGENT_TYPE as Jz,Tke} from "./2718_isInForkChild.ts";
import {isBuiltInAgent as Gh,kg} from "./4476_toAgentInfos.ts";
import {Yaa,Jaa,Z4} from "../agent/3198_code.ts";
import {jq,xye} from "./4423_content.ts";
import {m6e,y9n} from "../core/3975_y9n.ts";
import {cce,E3t} from "../../vendor/m3971.ts";
import {npt,Z6e} from "./4329_type.ts";
import {$c,Ct} from "../../vendor/m197.ts";
import {C5a,hS} from "../agent/4362_toolUseCount.ts";
import {S$a,b$a,C3t} from "../../vendor/m3972.ts";
import {executeStopHooks as Oye} from "../../vendor/m5197.ts";
import {ij,K5i,Gke} from "../mcp/2775_pendingChanges.ts";
import {h4t,A5a,f4n,CG} from "../agent/5206_len.ts";
import {mi,lr} from "../../vendor/m233.ts";
import {b} from "../../runtime.ts";
import {b3t} from "../../vendor/m3970.ts";
import {E8} from "../config/2192_terminal.ts";
import {Xl} from "../config/0651_maxBytes.ts";
import {Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {vUe} from "../telemetry/2232_vUe.ts";
// @ts-nocheck

/**
 * Connect the MCP servers declared in an agent definition's frontmatter, layer
 * them on top of the inherited clients, and return the merged client/tool set
 * plus a cleanup callback.
 *
 * @param agentDef        Agent definition (contains `mcpServers`, `source`, `agentType`).
 * @param inheritedClients MCP clients inherited from the parent context.
 * @param onBlocked       Callback invoked with (serverNames, reason) when servers are skipped.
 */
async function COp(agentDef, inheritedClients, onBlocked) {
  if (!agentDef.mcpServers?.length) return {
    clients: inheritedClients,
    agentClients: [],
    tools: [],
    cleanup: async () => {}
  };
  await Eat();
  let isPluginSource = Jfe(agentDef.source),
    blockReason = null;
  if (JS("mcp") && !isPluginSource) blockReason = "strictPluginOnlyCustomization";else if (Pbe() && agentDef.source !== "flagSettings") blockReason = "--strict-mcp-config";else if (Vl("mcpAgentFrontmatter")) blockReason = dl() ? "--safe-mode" : "--bare";else if (la()) blockReason = "remote mode";else if (E1()) blockReason = "enterprise MCP config";
  if (blockReason) return A(`[Agent: ${agentDef.agentType}] Skipping frontmatter MCP servers: blocked by ${blockReason} (agent source: ${agentDef.source})`, {
    level: "warn"
  }), onBlocked?.(agentDef.mcpServers.flatMap(spec => typeof spec === "string" ? spec : Object.keys(spec)), blockReason), {
    clients: inheritedClients,
    agentClients: [],
    tools: [],
    cleanup: async () => {}
  };
  let policyBlocked = [],
    strictSkipped = [],
    /** Connection results for every frontmatter MCP server (null = skipped/failed). */
    results = await Promise.all(agentDef.mcpServers.map(async spec => {
      let config = null,
        serverName,
        isNewlyCreated = !1;
      if (typeof spec === "string") {
        if (serverName = spec, Pbe()) return A(`[Agent: ${agentDef.agentType}] MCP server '${spec}' skipped: string specs resolve from disk config, which --strict-mcp-config ignores`, {
          level: "warn"
        }), strictSkipped.push(spec), null;
        if (config = I$(spec), !config) return A(`[Agent: ${agentDef.agentType}] MCP server not found: ${spec}`, {
          level: "warn"
        }), null;
      } else {
        let entries = Object.entries(spec);
        if (entries.length !== 1) return A(`[Agent: ${agentDef.agentType}] Invalid MCP server spec: expected exactly one key`, {
          level: "warn"
        }), null;
        let [name, inlineConfig] = entries[0];
        if (Fnt(name)) return A(`[Agent: ${agentDef.agentType}] Skipping reserved MCP server name '${name}' in frontmatter`, {
          level: "warn"
        }), null;
        if (inlineConfig.type === "sse-ide" || inlineConfig.type === "ws-ide") return A(`[Agent: ${agentDef.agentType}] Skipping internal-only MCP transport '${inlineConfig.type}' for '${name}' in frontmatter`, {
          level: "warn"
        }), null;
        serverName = name, config = {
          ...inlineConfig,
          scope: "dynamic"
        }, isNewlyCreated = !0;
      }
      let {
        blocked: policyHits
      } = K4({
        [serverName]: config
      });
      if (policyHits.length > 0) return A(`[Agent: ${agentDef.agentType}] MCP server '${serverName}' blocked by managed settings MCP policy`, {
        level: "warn"
      }), policyBlocked.push(serverName), null;
      let client = await VO(serverName, config),
        serverTools = [];
      if (client.type === "connected") serverTools = await MD(client), A(`[Agent: ${agentDef.agentType}] Connected to MCP server '${serverName}' with ${serverTools.length} tools`);else A(`[Agent: ${agentDef.agentType}] Failed to connect to MCP server '${serverName}': ${client.type}`, {
        level: "warn"
      });
      return {
        client: client,
        tools: serverTools,
        isNewlyCreated: isNewlyCreated
      };
    }));
  if (strictSkipped.length > 0) onBlocked?.(strictSkipped, "--strict-mcp-config");
  if (policyBlocked.length > 0) onBlocked?.(policyBlocked, "managed settings MCP policy");
  let allClients = [],
    newlyCreatedClients = [],
    allTools = [];
  for (let result of results) {
    if (!result) continue;
    if (allClients.push(result.client), result.isNewlyCreated) newlyCreatedClients.push(result.client);
    allTools.push(...result.tools);
  }
  let cleanup = async () => {
    for (let client of newlyCreatedClients) if (client.type === "connected") try {
      await client.cleanup();
    } catch (err) {
      A(`[Agent: ${agentDef.agentType}] Error cleaning up MCP server '${client.name}': ${err}`, {
        level: "warn"
      });
    }
  };
  return {
    clients: [...inheritedClients, ...allClients],
    agentClients: allClients,
    tools: allTools,
    cleanup: cleanup
  };
}

/** True when the message should be persisted to the sidechain transcript. */
function AOp(message) {
  return message.type === "assistant" || message.type === "user" || message.type === "progress" || message.type === "system" && "subtype" in message && message.subtype === "compact_boundary";
}

function ROp(err) {
  A(`Failed to record fork-context-ref: ${err}`);
}

function b5a(err) {
  A(`Failed to record sidechain transcript: ${err}`);
}

function vOp(err) {
  A(`Failed to write agent metadata: ${err}`);
}

/**
 * Run a subagent end-to-end: resolve model/tools/system-prompt, wire MCP
 * servers and hooks, stream the agent's main loop, and tear everything down in
 * the finally block. Yields the subagent's output messages.
 */
async function* Q$({
  agentDefinition: agentDef,
  promptMessages: promptMessages,
  toolUseContext: toolUseContext,
  canUseTool: canUseTool,
  isAsync: isAsync,
  canShowPermissionPrompts: canShowPermissionPrompts,
  forkContextMessages: forkContextMessages,
  querySource: querySource,
  spawnedBySkill: spawnedBySkill,
  override: override,
  model: model,
  maxTurns: maxTurns,
  preserveToolUseResults: preserveToolUseResults,
  availableTools: availableTools,
  allowedTools: allowedTools,
  onCacheSafeParams: onCacheSafeParams,
  contentReplacementState: contentReplacementState,
  stickyBetas: stickyBetas,
  useExactTools: useExactTools,
  worktreePath: worktreePath,
  worktreeBranch: worktreeBranch,
  cwd: cwd,
  spawnMode: spawnModeArg,
  description: description,
  name: name,
  toolUseId: toolUseId,
  transcriptSubdir: transcriptSubdir,
  spawnedByWorkflowRunId: spawnedByWorkflowRunId,
  onQueryProgress: onQueryProgress,
  onMcpServersBlocked: onMcpServersBlocked,
  onModelRestricted: onModelRestricted,
  isTeammate: isTeammate = !1,
  teammateContext: teammateContext,
  recordedUuids: recordedUuids,
  extraMetadata: extraMetadata,
  requiresStructuredOutput: requiresStructuredOutput
}) {
  let appState = Mr(toolUseContext),
    appStateMode = appState.mode,
    parentMainLoopModel = isTeammate ? toolUseContext.rootToolSurface.mainLoopModel : toolUseContext.options.mainLoopModel,
    resolvedModel = pte(yye(agentDef, parentMainLoopModel), parentMainLoopModel, model, appStateMode, onModelRestricted),
    agentId = override?.agentId ? override.agentId : OP();
  if (transcriptSubdir) c8i(agentId, transcriptSubdir);
  if (Vge()) {
    let parentSessionId = toolUseContext.agentId ?? It();
    fDn(agentId, agentDef.agentType, parentSessionId);
  }
  let otelSpan,
    forkContext = forkContextMessages ? kdo(forkContextMessages) : [],
    messages = [...forkContext, ...promptMessages],
    forkPointUuid = forkContextMessages !== void 0 ? p4n(forkContext) : void 0,
    readFileState = forkContextMessages !== void 0 ? uge(toolUseContext.readFileState) : _$(eB),
    [userContext, systemContext] = await Promise.all([override?.userContext ?? Py(), override?.systemContext ?? AE(toolUseContext.options.cacheBreakerPhrase)]),
    omitClaudeMd = agentDef.omitClaudeMd && !override?.userContext && it("tengu_slim_subagent_claudemd", !0),
    {
      claudeMd: claudeMd,
      ...userContextWithoutClaudeMd
    } = userContext,
    resolvedUserContext = omitClaudeMd ? userContextWithoutClaudeMd : userContext,
    {
      gitStatus: gitStatus,
      ...systemContextWithoutGit
    } = systemContext,
    resolvedSystemContext = agentDef.agentType === "Explore" || agentDef.agentType === "Plan" ? systemContextWithoutGit : systemContext,
    spawnMode = Won(spawnModeArg, appStateMode),
    overridePermissionMode = spawnMode ?? agentDef.permissionMode,
    cachedPermissionContextInput,
    cachedPermissionContextOutput;
  /** Apply the subagent's permission-mode/tool-rule overrides to a tool permission context (memoized on the last input). */
  function withSubagentPermissions(permissionContext) {
    if (permissionContext === cachedPermissionContextInput && cachedPermissionContextOutput) return cachedPermissionContextOutput;
    cachedPermissionContextInput = permissionContext;
    let next = permissionContext;
    if (overridePermissionMode && (spawnMode || permissionContext.mode !== "bypassPermissions" && permissionContext.mode !== "acceptEdits" && permissionContext.mode !== "auto")) next = {
      ...next,
      mode: overridePermissionMode
    };
    let hasRequestDialog = toolUseContext.requestDialog !== void 0,
      avoidPermissionPrompts = canShowPermissionPrompts !== void 0 ? !canShowPermissionPrompts : overridePermissionMode === "bubble" || hasRequestDialog ? !1 : isAsync;
    if (avoidPermissionPrompts) next = {
      ...next,
      shouldAvoidPermissionPrompts: !0
    };
    if (isAsync && !avoidPermissionPrompts) next = {
      ...next,
      awaitAutomatedChecksBeforeDialog: !0
    };
    if (allowedTools !== void 0) next = {
      ...next,
      alwaysAllowRules: {
        cliArg: permissionContext.alwaysAllowRules.cliArg,
        session: [...allowedTools]
      }
    };
    if (worktreePath && !next.additionalWorkingDirectories.has(worktreePath)) next = {
      ...next,
      additionalWorkingDirectories: new Map([...next.additionalWorkingDirectories, [worktreePath, {
        path: worktreePath,
        source: "session"
      }]])
    };
    return cachedPermissionContextOutput = next, next;
  }
  let getAppState = () => {
      let state = toolUseContext.getAppState(),
        permissionContext = withSubagentPermissions(state.toolPermissionContext);
      if (permissionContext === state.toolPermissionContext) return state;
      return {
        ...state,
        toolPermissionContext: permissionContext
      };
    },
    permissionLayers = agentDef.effort !== void 0 ? [{
      kind: "effort",
      effort: agentDef.effort
    }] : [],
    resolvedTools = useExactTools ? availableTools : Ate(agentDef, availableTools, isAsync, !1, isTeammate, k3(override?.agentContext ?? toolUseContext.agentContext)).resolvedTools,
    filteredTools = !useExactTools && p9a(isTeammate) ? resolvedTools.filter(tool => !d9a.has(tool.name)) : resolvedTools,
    workingDirs = Array.from(appState.additionalWorkingDirectories.keys()),
    systemPrompt = override?.systemPrompt ? override.systemPrompt : vc(await wOp(agentDef, toolUseContext, resolvedModel, workingDirs)),
    systemPromptWithScratchpad = HOp(systemPrompt, useExactTools ?? !1),
    finalSystemPrompt = !useExactTools && nt(process.env.CLAUDE_CODE_ENABLE_APPEND_SUBAGENT_PROMPT) && toolUseContext.options.appendSubagentSystemPrompt ? vc([...systemPromptWithScratchpad, toolUseContext.options.appendSubagentSystemPrompt]) : systemPromptWithScratchpad,
    abortController = override?.abortController ? override.abortController : isAsync ? new AbortController() : toolUseContext.abortController,
    subagentStartContexts = [];
  for await (let hookResult of g4t(agentId, agentDef.agentType, abortController.signal, void 0, toolUseContext.getAppState)) if (hookResult.additionalContexts && hookResult.additionalContexts.length > 0) subagentStartContexts.push(...hookResult.additionalContexts);
  if (subagentStartContexts.length > 0) {
    let contextMessage = ti({
      type: "hook_additional_context",
      content: subagentStartContexts,
      hookName: "SubagentStart",
      toolUseID: Wmo.randomUUID(),
      hookEvent: "SubagentStart"
    });
    messages.push(contextMessage);
  }
  let hooksDisabled = !JS("hooks") || Jfe(agentDef.source);
  if (agentDef.hooks && hooksDisabled) A$a(toolUseContext.sessionHooksRegistry, agentId, agentDef.hooks, `agent '${agentDef.agentType}'`, !0);
  let skillNames = agentDef.skills ?? [];
  if (skillNames.length > 0) {
    let availableCommands = await bC(ic()),
      loadedSkills = [];
    for (let skillName of skillNames) {
      let resolvedName = IOp(skillName, availableCommands, agentDef);
      if (!resolvedName) {
        A(`[Agent: ${agentDef.agentType}] Warning: Skill '${skillName}' specified in frontmatter was not found`, {
          level: "warn"
        });
        continue;
      }
      let command = Q6e(resolvedName, availableCommands);
      if (command.type !== "prompt") {
        A(`[Agent: ${agentDef.agentType}] Warning: Skill '${skillName}' is not a prompt-based skill`, {
          level: "warn"
        });
        continue;
      }
      loadedSkills.push({
        skillName: skillName,
        skill: command
      });
    }
    let {
        formatSkillLoadingMetadata: formatSkillLoadingMetadata
      } = await Promise.resolve().then(() => (ept(), d4t)),
      preloadedSkills = await Promise.all(loadedSkills.map(async ({
        skillName: skillName,
        skill: command
      }) => ({
        skillName: skillName,
        skill: command,
        content: await command.getPromptForCommand("", {
          ...toolUseContext,
          options: {
            ...toolUseContext.options,
            isSkillPreload: !0
          }
        })
      })));
    for (let {
      skillName: skillName,
      skill: command,
      content: content
    } of preloadedSkills) {
      A(`[Agent: ${agentDef.agentType}] Preloaded skill '${skillName}'`);
      let metadata = formatSkillLoadingMetadata(skillName, command.progressMessage);
      messages.push(Mn({
        content: [{
          type: "text",
          text: metadata
        }, ...content],
        isMeta: !0
      }));
    }
  }
  let {
      clients: mcpClients,
      agentClients: agentMcpClients,
      tools: mcpTools,
      cleanup: mcpCleanup
    } = await COp(agentDef, toolUseContext.options.mcpClients, onMcpServersBlocked),
    {
      isToolDisallowed: isToolDisallowed
    } = Vdo(agentDef.disallowedTools),
    allowedMcpTools = mcpTools.filter(tool => !isToolDisallowed(tool)),
    finalTools = allowedMcpTools.length > 0 ? aS([...filteredTools, ...allowedMcpTools], "name") : filteredTools;
  if (!useExactTools) for (let attachment of Dye(finalTools, resolvedModel, messages, {
    callSite: "attachments_subagent",
    querySource: querySource
  })) messages.push(ti(attachment));
  let subagentOptions = {
      isNonInteractiveSession: useExactTools ? toolUseContext.options.isNonInteractiveSession : isAsync ? !0 : toolUseContext.options.isNonInteractiveSession ?? !1,
      appendSystemPrompt: toolUseContext.options.appendSystemPrompt,
      appendSubagentSystemPrompt: toolUseContext.options.appendSubagentSystemPrompt,
      spawnedBySkill: spawnedBySkill,
      tools: finalTools,
      commands: [],
      debug: toolUseContext.options.debug,
      verbose: toolUseContext.options.verbose,
      mainLoopModel: resolvedModel,
      fallbackModel: toolUseContext.options.fallbackModel,
      thinkingConfig: useExactTools || !1 || h9n(resolvedModel) ? toolUseContext.options.thinkingConfig : {
        type: "disabled"
      },
      mcpClients: mcpClients,
      refreshMcpClients: toolUseContext.options.refreshMcpClients ? () => {
        let refreshed = toolUseContext.options.refreshMcpClients();
        return agentMcpClients.length > 0 ? [...refreshed, ...agentMcpClients] : refreshed;
      } : void 0,
      mcpResources: toolUseContext.options.mcpResources,
      agentDefinitions: toolUseContext.options.agentDefinitions,
      messageClientPlatform: toolUseContext.options.messageClientPlatform,
      toolAliases: toolUseContext.options.toolAliases,
      autoCompactWindow: toolUseContext.options.autoCompactWindow,
      fastMode: toolUseContext.options.fastMode,
      cacheBreakerPhrase: toolUseContext.options.cacheBreakerPhrase,
      activeGoal: toolUseContext.options.activeGoal,
      ultraplanSessionUrl: toolUseContext.options.ultraplanSessionUrl,
      ...(useExactTools && {
        querySource: querySource
      }),
      requiresStructuredOutput: requiresStructuredOutput
    },
    subagentContext = d4n(toolUseContext, {
      options: subagentOptions,
      agentId: agentId,
      agentType: agentDef.agentType,
      agentContext: override?.agentContext,
      spawnedByWorkflowRunId: spawnedByWorkflowRunId,
      teammateContext: teammateContext,
      messages: messages,
      readFileState: readFileState,
      abortController: abortController,
      getAppState: getAppState,
      permissionLayers: permissionLayers,
      shareSetAppState: !isAsync,
      criticalSystemReminder_EXPERIMENTAL: agentDef.criticalSystemReminder_EXPERIMENTAL,
      contentReplacementState: contentReplacementState
    });
  if (override?.replHydration) subagentContext.replHydration = override.replHydration;
  if (override?.onRetryStatus) subagentContext.onRetryStatus = override.onRetryStatus;
  if (worktreePath) subagentContext.agentWorktree = worktreePath;
  {
    let hasSkillListing = messages.some(message => message.type === "attachment" && message.attachment.type === "skill_listing"),
      skillListingAttachments = await m4n(subagentContext).catch(err => (A(`[Agent: ${agentDef.agentType}] Failed to compute skill listing attachment: ${err}`, {
        level: "error"
      }), []));
    if (!hasSkillListing) for (let attachment of skillListingAttachments) messages.push(ti(attachment));
  }
  if (preserveToolUseResults) subagentContext.preserveToolUseResults = !0;
  let liveMessages = null,
    contentReplacementSnapshot = null,
    resolvedStickyBetas = stickyBetas ?? (useExactTools ? l0(toolUseContext.stickyBetas ?? zH()) : Ere());
  if (onCacheSafeParams) {
    let snapshot = [...messages];
    liveMessages = snapshot, onCacheSafeParams({
      systemPrompt: finalSystemPrompt,
      userContext: resolvedUserContext,
      systemContext: resolvedSystemContext,
      toolUseContext: subagentContext,
      forkContextMessages: messages,
      stickyBetas: resolvedStickyBetas
    }, () => snapshot);
  }
  let sidechainMessages = messages,
    parentLastUuid = null;
  if (recordedUuids !== void 0) {
    let lastRecordedIndex = messages.findLastIndex(message => recordedUuids.has(message.uuid));
    sidechainMessages = messages.slice(lastRecordedIndex + 1), parentLastUuid = lastRecordedIndex >= 0 ? messages[lastRecordedIndex].uuid : null;
  } else if (forkContextMessages !== void 0 && forkContextMessages === toolUseContext.messages && toolUseContext.agentId === void 0) {
    let lastForkUuid = forkContext.at(-1)?.uuid;
    if (lastForkUuid !== void 0) sidechainMessages = messages.slice(forkContext.length), Vmo({
      agentId: agentId,
      parentSessionId: It(),
      parentLastUuid: lastForkUuid,
      contextLength: forkContext.length
    }).catch(ROp);
  }
  Ece(sidechainMessages, agentId, parentLastUuid).catch(b5a), rpt(agentId, {
    agentType: agentDef.agentType,
    ...(agentDef.agentType === Jz && {
      isFork: Gh(agentDef)
    }),
    ...(worktreePath && {
      worktreePath: worktreePath
    }),
    ...(worktreePath && worktreeBranch && {
      worktreeBranch: worktreeBranch
    }),
    ...(cwd && {
      cwd: cwd
    }),
    ...(spawnMode && {
      spawnMode: spawnMode
    }),
    ...(description && {
      description: description
    }),
    ...(name && {
      name: name
    }),
    ...(toolUseId && {
      toolUseId: toolUseId
    }),
    ...(override?.agentContext !== void 0 && {
      spawnDepth: k3(override.agentContext)
    }),
    ...extraMetadata
  }).catch(vOp);
  let lastUuid = sidechainMessages.at(-1)?.uuid ?? parentLastUuid;
  if (recordedUuids) for (let message of sidechainMessages) recordedUuids.add(message.uuid);
  let sawSubagentStop = !1,
    apiMetricsId,
    pendingEvents = [],
    streamCallbacks = {
      onSetStreamMode: mode => pendingEvents.push({
        type: "spinner_mode",
        mode: mode
      }),
      onApiMetrics: event => {
        if (event.type !== "start" && event.type !== "end") return;
        if (event.type === "start") apiMetricsId = Wmo.randomUUID(), pendingEvents.push({
          type: "api_metrics",
          event: {
            type: "start",
            ttftMs: event.ttftMs,
            id: apiMetricsId
          }
        });else if (apiMetricsId != null) pendingEvents.push({
          type: "api_metrics",
          event: {
            type: "end",
            outputTokens: event.outputTokens,
            id: apiMetricsId
          }
        }), apiMetricsId = void 0;
      }
    },
    progressContext = {
      isSubagent: !0
    },
    caughtError;
  try {
    otelSpan = Yaa({
      agentId: agentId,
      agentType: agentDef.agentType,
      parentAgentId: toolUseContext.agentId
    });
    for await (let message of jq({
      messages: messages,
      systemPrompt: finalSystemPrompt,
      userContext: resolvedUserContext,
      systemContext: resolvedSystemContext,
      canUseTool: canUseTool,
      toolUseContext: subagentContext,
      querySource: querySource,
      spawnedBySkill: spawnedBySkill,
      maxTurns: maxTurns ?? agentDef.maxTurns,
      forkPointUuid: forkPointUuid,
      stickyBetas: resolvedStickyBetas
    })) {
      if (onQueryProgress?.(), m6e(message)) {
        Kmo(message, streamCallbacks, progressContext), yield* pendingEvents, pendingEvents.length = 0;
        continue;
      }
      if (message.type === "attachment" && "hookEvent" in message.attachment && message.attachment.hookEvent === "SubagentStop" || message.type === "progress" && message.data?.type === "hook_progress" && message.data.hookEvent === "SubagentStop") sawSubagentStop = !0;
      if (message.type === "system" && message.subtype === "api_error") {
        yield message;
        continue;
      }
      if (message.type === "set_in_progress_tool_use_ids") {
        if (message.op.action === "remove") yield message;
        continue;
      }
      if (message.type === "attachment") {
        if (liveMessages) liveMessages.push(message), contentReplacementSnapshot = cce(liveMessages, message, contentReplacementSnapshot);
        if (message.attachment.type === "max_turns_reached") {
          A(`[Agent: ${agentDef.agentType}] Reached max turns limit (${message.attachment.maxTurns})`);
          break;
        }
        yield message;
        continue;
      }
      if (AOp(message)) {
        if (message.type !== "progress") {
          if (liveMessages) liveMessages.push(message), contentReplacementSnapshot = cce(liveMessages, message, contentReplacementSnapshot);
        }
        if (await Ece([message], agentId, lastUuid).catch(b5a), message.type !== "progress") lastUuid = message.uuid, recordedUuids?.add(message.uuid);
        if (isAsync && toolUseId && (message.type === "assistant" || message.type === "user")) {
          let queue = h$a();
          if (queue) for (let progressMessage of ST([message])) {
            let progressEvent = h4n({
              toolUseID: `agent_${agentId}`,
              parentToolUseID: toolUseId,
              data: {
                message: progressMessage,
                type: "agent_progress",
                prompt: "",
                agentId: agentId,
                agentType: agentDef.agentType,
                resolvedModel: resolvedModel,
                ...(description && {
                  description: description
                })
              }
            });
            for (let serialized of npt(progressEvent, finalTools)) queue.write(serialized).catch(err => A(`bg-subagent progress write failed: ${err}`, {
              level: "warn"
            }));
          }
        }
        yield message;
      }
    }
    if (sawSubagentStop = !0, abortController.signal.aborted) throw new $c();
    if (Gh(agentDef) && agentDef.callback) agentDef.callback();
  } catch (err) {
    throw caughtError = err, err;
  } finally {
    if (liveMessages && contentReplacementSnapshot) liveMessages.push(...contentReplacementSnapshot.preserved), contentReplacementSnapshot = null;
    let keepaliveActive = isAsync && sawSubagentStop && !abortController.signal.aborted && (C5a(agentId, toolUseContext.taskRegistry) || S$a(agentId, toolUseContext.taskRegistry)),
      cleanupStages = [{
        name: "SubagentStop",
        run: async () => {
          if (sawSubagentStop) return;
          try {
            for await (let _ of Oye(void 0, void 0, 5000, !1, agentId, subagentContext, void 0, agentDef.agentType));
          } catch (err) {
            A(`[runAgent] SubagentStop on interrupted query failed: ${err}`);
          }
        }
      }, {
        name: "mcp",
        run: () => mcpCleanup()
      }, {
        name: "sessionHooks",
        run: () => {
          if (agentDef.hooks) toolUseContext.sessionHooksRegistry.clear(agentId);
        }
      }, {
        name: "promptCacheTracking",
        run: () => {
          if (ij()) K5i(agentId);
        }
      }, {
        name: "readFileState",
        run: () => subagentContext.readFileState.clear()
      }, {
        name: "sentSkillNames",
        run: () => Gmo(agentId)
      }, {
        name: "initialMessages",
        run: () => {
          messages.length = 0;
        }
      }, {
        name: "liveMessages",
        run: () => {
          if (liveMessages) liveMessages.length = 0;
        }
      }, {
        name: "replHydrationSnapshot",
        run: () => {
          subagentContext.replHydration = void 0;
        }
      }, {
        name: "perfetto",
        run: () => X9e(agentId)
      }, {
        name: "otelSubagentSpan",
        run: () => {
          let aborted = abortController.signal.aborted;
          Jaa(otelSpan, {
            success: caughtError === void 0 && !aborted,
            ...(caughtError !== void 0 && !aborted && {
              error: caughtError instanceof Error ? caughtError.message : String(caughtError)
            })
          });
        }
      }, {
        name: "transcriptSubdir",
        run: () => u8i(agentId)
      }, {
        name: "todos",
        run: () => toolUseContext.agentLifecycle.clearTodos(agentId)
      }, {
        name: "replContext",
        run: () => {
          let replContext = toolUseContext.getReplContexts()[agentId];
          if (replContext) replContext.clearAllTimers(), toolUseContext.setReplContext(agentId, void 0);
        }
      }, {
        name: "mcpMonitors",
        keepaliveGated: !0,
        run: () => {}
      }, {
        name: "shellTasks",
        keepaliveGated: !0,
        run: () => b$a(agentId, toolUseContext.taskRegistry)
      }];
    for (let stage of cleanupStages) {
      if (keepaliveActive && stage.keepaliveGated) continue;
      try {
        await stage.run();
      } catch (err) {
        A(`[runAgent cleanup] stage '${stage.name}' failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }
}

/**
 * Drop assistant messages whose tool_use blocks have no matching tool_result
 * in the fork context (so the forked transcript stays consistent).
 */
function kdo(messages) {
  let resultIds = new Set();
  for (let message of messages) if (message?.type === "user") {
    let content = message.message.content;
    if (Array.isArray(content)) {
      for (let block of content) if (block.type === "tool_result" && block.tool_use_id) resultIds.add(block.tool_use_id);
    }
  }
  return messages.filter(message => {
    if (message?.type === "assistant") {
      let content = message.message.content;
      if (Array.isArray(content)) return !content.some(block => block.type === "tool_use" && block.id && !resultIds.has(block.id));
    }
    return !0;
  });
}

/** Build the subagent system prompt, falling back to the default prompt on error. */
async function wOp(agentDef, toolUseContext, resolvedModel, workingDirs) {
  try {
    let prompt = agentDef.getSystemPrompt({
      toolUseContext: toolUseContext
    });
    return await h4t([prompt], resolvedModel, workingDirs);
  } catch (err) {
    return h4t([A5a], resolvedModel, workingDirs);
  }
}

/** Append the scratchpad-directory section to the system prompt unless using exact tools or already present. */
function HOp(systemPrompt, useExactTools) {
  if (useExactTools) return systemPrompt;
  let scratchpadSection = f4n();
  if (scratchpadSection === null || systemPrompt.some(part => part.includes(kOp))) return systemPrompt;
  return vc([...systemPrompt, scratchpadSection]);
}

/** Resolve a frontmatter skill name to a registered command name (trying agent-type namespace prefixes). */
function IOp(skillName, availableCommands, agentDef) {
  if (tpt(skillName, availableCommands)) return skillName;
  let namespace = mi(agentDef.agentType, ":");
  if (namespace) {
    let namespaced = `${namespace}:${skillName}`;
    if (tpt(namespaced, availableCommands)) return namespaced;
  }
  let suffix = `:${skillName}`,
    matched = availableCommands.find(command => command.name.endsWith(suffix));
  if (matched) return matched.name;
  return null;
}

async function E5a({
  agentId: agentId,
  removedWorktreePath: removedWorktreePath,
  spawnMetadata: spawnMetadata
}) {
  let metadata = await Pye(agentId).catch(() => null),
    cwd = metadata?.cwd && metadata.cwd !== removedWorktreePath ? metadata.cwd : void 0;
  await rpt(agentId, {
    ...spawnMetadata,
    ...(cwd && {
      cwd: cwd
    })
  });
}
var Wmo,
  kOp = "# Scratchpad Directory";
var fye = b(() => {
  uee();
  qe();
  Cdo();
  po();
  Z6e();
  lt();
  Mm();
  CG();
  y$();
  xye();
  jn();
  b3t();
  Gke();
  E3t();
  Ew();
  KA();
  Dvn();
  hS();
  C3t();
  y9n();
  Ph();
  GA();
  xl();
  ky();
  E8();
  dn();
  Ct();
  Xl();
  Gk();
  ID();
  R$a();
  Wd();
  po();
  tce();
  vUe();
  FS();
  D_();
  _a();
  ez();
  lr();
  Zst();
  Z4();
  YL();
  _Y();
  Tye();
  Tke();
  kg();
  Wmo = require("crypto");
});

export {COp,AOp,ROp,b5a,vOp,Q$,kdo,wOp,HOp,IOp,E5a,Wmo,kOp,fye};
