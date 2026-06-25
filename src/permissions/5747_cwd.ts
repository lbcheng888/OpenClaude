// @ts-nocheck
import {qke} from "../../vendor/m2765.ts";
import {kl,qMt,lh} from "../../vendor/m2739.ts";
import {Xxe,omt} from "../mcp/4256_current.ts";
import {$E} from "../core/4189_input_tokens.ts";
import {markTelemetryString as O_,KO} from "../agent/3295_code.ts";
import {isSessionPersistenceDisabled as $9,getTotalAPIDuration as kv,getSessionId as It,getTotalCostUSD as nA,getModelUsage as Vx,lt} from "../session/0132_sent.ts";
import {CZn,AZn,ZKt,RZn,e7t} from "../../vendor/m5290.ts";
import {isExemptDefaultResolvingPick as XT,parseUserSpecifiedModel as Qo,getMainLoopModel as gs,getRuntimeMainLoopModel as w0,Ro} from "./1458_swapShrinksContextWindow.ts";
import {Oa,eO} from "../../vendor/m1456.ts";
import {vse,$M} from "../telemetry/2032_word.ts";
import {fv,V6t} from "../session/4391_turn_number.ts";
import {X$o,Q$o} from "./5746_tools.ts";
import {Mc,dFa,W$} from "../config/3882_entrypoint.ts";
import {isScratchpadEnabled as xJ,getScratchpadDir as hSe,Xm} from "./5177_untypeDenyReasonForAskPropagation.ts";
import {Abn,Jm} from "../config/2207_Jm.ts";
import {IDt,xDt} from "../config/2252_content.ts";
import {vc} from "../api/3886_level.ts";
import {Gl,rl,ri} from "../tools/2235_userFacingName.ts";
import {Rp,MO} from "../tools/2710_allErrors.ts";
import {ch,ef} from "../../vendor/m2794.ts";
import {Ttr,xBo} from "../../vendor/m5459.ts";
import {initProfileReportModule as Hm,Ph} from "../agent/1459_agentType.ts";
import {X3,cZ} from "../../vendor/m2273.ts";
import {lc,mg} from "../../vendor/m2209.ts";
import {XD,HB} from "../agent/4331_register.ts";
import {j6e,vY} from "../../vendor/m4097.ts";
import {fVe,Cdc,k2o} from "../telemetry/5654_t.ts";
import {makeSetWebBrowserSlice as fIe} from "../../vendor/m3317.ts";
import {makeSetArtifactReadVersion as Lxe,c5e} from "../artifact/4166_publishArtifact.ts";
import {DWe,cgt} from "../../vendor/m4850.ts";
import {PWe,ugt} from "../../vendor/m4852.ts";
import {kqe,TT,nut,Pq} from "../session/3880_trackSequence.ts";
import {_On,UW} from "../config/3317_fileStates.ts";
import {QPe} from "../session/4942_cacheBreakerPhrase.ts";
import {cel,lel,npt,Wyo,Z6e} from "./4329_type.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {lF,WS} from "../api/1453_month.ts";
import {recordTranscript as HG,transcriptCursorEnd as oKt,isLoggableMessage as One,isChainParticipant as Fue,removeTranscriptMessage as aKt,flushSessionStorage as _v,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {profileCheckpoint as ta,z9} from "../session/0243_profileReport.ts";
import {o7t,IZn} from "../agent/5298_input.ts";
import {vQn,cMo,RQn,tot,eot,po} from "../tools/5224_userPromptCount.ts";
import {gtr} from "../telemetry/5453_verifiedSlackHumanTurn.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Bo,Ve} from "../../vendor/m5.ts";
import {Ed,dn} from "../config/0137_namespace.ts";
import {Ne} from "../../vendor/m583.ts";
import {getSlashCommandToolSkills as lae,Mm} from "../tools/5174_toSlashCommands.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {loadAllPluginsCacheOnly as np,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {Agc,I$o} from "../config/5732_recursive.ts";
import {oNi,fT,EO,Q8} from "../../vendor/m2594.ts";
import {tb,oh} from "../../vendor/m2600.ts";
import {wn,pf} from "../config/0693_timestamp.ts";
import {Tk,jX,Ud} from "../../vendor/m615.ts";
import {cc} from "../../vendor/m2459.ts";
import {Mjn,RGt,VPe} from "../core/4898_type.ts";
import {x1e,vn} from "../session/0621_length.ts";
import {jq,xye} from "./4423_content.ts";
import {Qte,bLo,qWn,rb} from "./5211_level.ts";
import {K6t,lWn} from "../core/4392_fallbacks.ts";
import {sNo,iNo} from "../../vendor/m5289.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {d6e,p6e} from "../telemetry/4388_hasAttempted.ts";
import {U7r,kD} from "../api/2754_actualTokens.ts";
import {tj,nj} from "../agent/2746_partialTextChars.ts";
import {z3,pDt} from "../../vendor/m2214.ts";
import {uge,Gk} from "../../vendor/m2727.ts";
import {GZn,c7l} from "../tui/5331_selectableUserMessagesFilter.ts";
import {oo,b} from "../../runtime.ts";
import {S5t} from "./4425_headers.ts";
import {V$} from "../telemetry/3911_contextWindow.ts";
import {Ir} from "../../vendor/m584.ts";
import {NO,k4} from "./2717_matchSessionMode.ts";
/**
 * Non-interactive (SDK) query session driver.
 *
 * Holds the mutable conversation state for one SDK session and exposes an async
 * generator (`submitMessage`) that drives the main agent loop, yielding SDK
 * stream/result events. Names here are restored for readability; structure is
 * byte-exact to the reverse-engineered original.
 */
class iyc {
  config;
  mutableMessages;
  abortController;
  permissionDenials;
  totalUsage;
  hasHandledOrphanedPermission = !1;
  hasHandledDeferredToolResume = !1;
  thinkingTokenEstimate = 0;
  readFileState;
  loadedNestedMemoryPaths = {};
  sessionEnvVars;
  isolationLatch;
  pendingNestedMemoryTriggers;
  memorySelector = qke();
  constructor(config) {
    this.config = config, this.mutableMessages = config.initialMessages ?? [], this.abortController = config.abortController ?? kl(), this.permissionDenials = [], this.readFileState = config.readFileCache, this.sessionEnvVars = config.sessionEnvVars ?? new Map(), this.isolationLatch = config.isolationLatch ?? Xxe(), this.pendingNestedMemoryTriggers = config.pendingNestedMemoryTriggers, this.totalUsage = $E;
  }
  async *submitMessage(promptInput, requestMeta) {
    let {
      cwd: sessionCwd,
      commands: commands,
      tools: tools,
      refreshTools: refreshTools,
      refreshMcpClients: refreshMcpClients,
      mcpClients: mcpClients,
      verbose = !1,
      thinkingConfig: thinkingConfig,
      maxTurns: maxTurns,
      maxBudgetUsd: maxBudgetUsd,
      taskBudget: taskBudget,
      canUseTool: canUseTool,
      customSystemPrompt: customSystemPrompt,
      appendSystemPrompt: appendSystemPrompt,
      planModeInstructions: planModeInstructions,
      appendSubagentSystemPrompt: appendSubagentSystemPrompt,
      toolAliases: toolAliases,
      excludeDynamicSections: excludeDynamicSections,
      userSpecifiedModel: userSpecifiedModel,
      fallbackModel: fallbackModel,
      jsonSchema: jsonSchema,
      getAppState: getAppState,
      setAppState: setAppState,
      replayUserMessages = !1,
      includePartialMessages = !1,
      forwardSubagentText = !1,
      agents = [],
      allowedAgentTypes: allowedAgentTypes,
      setSDKStatus: setSDKStatus,
      orphanedPermission: orphanedPermission,
      deferredToolUse: deferredToolUse
    } = this.config;
    O_(sessionCwd);
    let persistEnabled = !$9(),
      startedAtMs = performance.now(),
      firstAssistantAtMs = 0,
      firstStreamAtMs = 0,
      requestSentAtMs = 0,
      recordDenial = (toolDef, toolUseId, toolInput) => {
        if (this.permissionDenials.some(denial => denial.tool_use_id === toolUseId)) return;
        this.permissionDenials.push({
          tool_name: CZn(toolDef.name),
          tool_use_id: toolUseId,
          tool_input: toolInput
        });
      },
      canUseToolWrapped = async (toolDef, toolInput, permCtx, assistantMsg, toolUseId, extra) => {
        let decision = await canUseTool(toolDef, toolInput, permCtx, assistantMsg, toolUseId, extra);
        if (decision.behavior !== "allow") recordDenial(toolDef, toolUseId, toolInput);
        return decision;
      },
      appState = getAppState(),
      sessionModel = userSpecifiedModel && (XT(userSpecifiedModel) || Oa(userSpecifiedModel)) ? Qo(userSpecifiedModel) : gs(),
      resolvedMainLoopModel = w0({
        permissionMode: appState.toolPermissionContext.mode,
        mainLoopModel: sessionModel
      }),
      resolvedThinkingConfig = thinkingConfig ? thinkingConfig : vse() !== !1 ? {
        type: "adaptive"
      } : {
        type: "disabled"
      };
    fv("before_getSystemPrompt");
    let promptBuildStartMs = performance.now(),
      {
        defaultSystemPrompt: defaultSystemPrompt,
        userContext: userContext,
        systemContext: systemContext
      } = await X$o({
        tools: tools,
        mainLoopModel: resolvedMainLoopModel,
        additionalWorkingDirectories: Array.from(appState.toolPermissionContext.additionalWorkingDirectories.keys()),
        customSystemPrompt: customSystemPrompt,
        excludeDynamicSections: excludeDynamicSections,
        cacheBreakerPhrase: appState.cacheBreakerPhrase
      });
    Mc("qe_system_prompt_ms", performance.now() - promptBuildStartMs, promptBuildStartMs), fv("after_getSystemPrompt");
    let mergedUserContext = {
        ...userContext,
        ...UYm(mcpClients, xJ() ? hSe() ?? void 0 : void 0)
      },
      pmExtraPrompt = customSystemPrompt !== void 0 && Abn() ? await IDt(resolvedMainLoopModel) : null,
      systemPrompt = vc([...(typeof customSystemPrompt === "string" ? [customSystemPrompt] : Array.isArray(customSystemPrompt) ? customSystemPrompt : defaultSystemPrompt), ...(pmExtraPrompt ? [pmExtraPrompt] : []), ...(appendSystemPrompt ? [appendSystemPrompt] : [])]),
      hasStructuredOutputTool = tools.some(toolDef => Gl(toolDef, Rp)),
      toolUseContext = {
        messages: this.mutableMessages,
        messageQueue: ch,
        turnStartIndex: 0,
        setMessages: updater => {
          let nextMessages = updater(this.mutableMessages);
          if (nextMessages !== this.mutableMessages) this.mutableMessages.length = 0, this.mutableMessages.push(...nextMessages);
        },
        applyMessageOp: op => {
          let nextMessages = Ttr(this.mutableMessages, op);
          if (nextMessages !== this.mutableMessages) this.mutableMessages.length = 0, this.mutableMessages.push(...nextMessages);
        },
        onChangeAPIKey: () => {},
        onPermissionDenial: recordDenial,
        requestDialog: this.config.requestDialog,
        sessionState: this.config.sessionState,
        agentContext: Hm(),
        options: {
          commands: commands,
          debug: !1,
          tools: tools,
          refreshTools: refreshTools,
          refreshMcpClients: refreshMcpClients,
          verbose: verbose,
          mainLoopModel: sessionModel,
          fallbackModel: fallbackModel,
          thinkingConfig: resolvedThinkingConfig,
          mcpClients: mcpClients,
          mcpResources: {},
          ideInstallationStatus: null,
          isNonInteractiveSession: !0,
          customSystemPrompt: customSystemPrompt,
          appendSystemPrompt: appendSystemPrompt,
          planModeInstructions: planModeInstructions,
          appendSubagentSystemPrompt: appendSubagentSystemPrompt,
          toolAliases: toolAliases,
          agentDefinitions: {
            activeAgents: agents,
            allAgents: [],
            allowedAgentTypes: allowedAgentTypes
          },
          theme: X3(lc("theme", "dark").value),
          maxBudgetUsd: maxBudgetUsd,
          messageClientPlatform: requestMeta?.clientPlatform,
          forwardSubagentText: forwardSubagentText,
          requiresStructuredOutput: jsonSchema !== void 0 && hasStructuredOutputTool,
          autoCompactWindow: appState.autoCompactWindow,
          fastMode: appState.fastMode,
          cacheBreakerPhrase: appState.cacheBreakerPhrase,
          activeGoal: appState.activeGoal,
          ultraplanSessionUrl: appState.ultraplanSessionUrl
        },
        getAppState: getAppState,
        setAppState: setAppState,
        getMcp: () => getAppState().mcp,
        getWebBrowser: () => getAppState().webBrowser,
        setToolPermissionContext: permArg => setAppState(prevState => {
          let nextPermCtx = typeof permArg === "function" ? permArg(prevState.toolPermissionContext) : permArg;
          return prevState.toolPermissionContext === nextPermCtx ? prevState : {
            ...prevState,
            toolPermissionContext: nextPermCtx
          };
        }),
        taskRegistry: XD(getAppState, setAppState),
        sessionHooksRegistry: j6e(setAppState),
        getReplContexts: () => getAppState().replContexts,
        setReplContext: fVe(setAppState),
        setWebBrowserSlice: fIe(setAppState),
        setArtifactReadVersion: Lxe(setAppState),
        agentLifecycle: DWe(getAppState, setAppState),
        teammateColors: PWe(getAppState, setAppState),
        rootToolSurface: {
          tools: tools,
          mainLoopModel: sessionModel
        },
        abortController: this.abortController,
        readFileState: this.readFileState,
        nestedMemoryAttachmentTriggers: [],
        pendingNestedMemoryTriggers: this.pendingNestedMemoryTriggers,
        loadedNestedMemoryPaths: this.loadedNestedMemoryPaths,
        sessionEnvVars: this.sessionEnvVars,
        dynamicSkillDirTriggers: [],
        memorySelector: this.memorySelector,
        isolationLatch: this.isolationLatch,
        getFileHistoryState: () => getAppState().fileHistory,
        applyFileHistoryOp: op => {
          setAppState(prevState => {
            let nextFileHistory = kqe(prevState.fileHistory, op);
            if (nextFileHistory === prevState.fileHistory) return prevState;
            return {
              ...prevState,
              fileHistory: nextFileHistory
            };
          });
        },
        applyAttributionOp: op => {
          setAppState(prevState => {
            let nextAttribution = _On(prevState.attribution, op);
            if (nextAttribution === prevState.attribution) return prevState;
            return {
              ...prevState,
              attribution: nextAttribution
            };
          });
        },
        onCompactEvent: event => {
          if (event.type === "sdk_status") setSDKStatus?.(event.status, event.metadata);
        },
        onQueryEvent: event => {
          if (event.type === "apply_flag_settings") QPe(event.settings, setAppState);
        }
      };
    if (orphanedPermission && !this.hasHandledOrphanedPermission) {
      this.hasHandledOrphanedPermission = !0;
      for await (let event of cel(orphanedPermission, tools, this.mutableMessages, toolUseContext)) yield event;
    }
    if (deferredToolUse && !this.hasHandledDeferredToolResume) {
      if (this.hasHandledDeferredToolResume = !0, !rl(tools, deferredToolUse.toolName, toolAliases)) {
        A(`Deferred tool resume: tool '${deferredToolUse.toolName}' is no longer available (MCP server disconnected or tool removed)`, {
          level: "warn"
        }), yield {
          type: "result",
          subtype: "success",
          is_error: !0,
          duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
          duration_api_ms: kv(),
          num_turns: this.mutableMessages.length,
          result: "",
          stop_reason: "tool_deferred_unavailable",
          session_id: It(),
          total_cost_usd: nA(),
          usage: this.totalUsage,
          modelUsage: Vx(),
          permission_denials: this.permissionDenials,
          deferred_tool_use: {
            id: deferredToolUse.toolUseID,
            name: deferredToolUse.toolName,
            input: deferredToolUse.toolInput
          },
          fast_mode_state: lF(sessionModel, appState.fastMode),
          origin: requestMeta?.origin,
          uuid: wS.randomUUID()
        };
        return;
      }
      let resumedDeferredTool;
      for await (let event of lel(deferredToolUse, canUseToolWrapped, this.mutableMessages, toolUseContext)) {
        let attachment = "attachment" in event ? event.attachment : void 0;
        if (attachment?.type === "hook_deferred_tool") resumedDeferredTool = attachment;
        yield event;
      }
      if (resumedDeferredTool) {
        if (persistEnabled) await HG(this.mutableMessages);
        yield {
          type: "result",
          subtype: "success",
          is_error: !1,
          duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
          duration_api_ms: kv(),
          num_turns: this.mutableMessages.length,
          result: "",
          stop_reason: "tool_deferred",
          session_id: It(),
          total_cost_usd: nA(),
          usage: this.totalUsage,
          modelUsage: Vx(),
          permission_denials: this.permissionDenials,
          deferred_tool_use: {
            id: resumedDeferredTool.toolUseID,
            name: resumedDeferredTool.toolName,
            input: resumedDeferredTool.toolInput
          },
          fast_mode_state: lF(sessionModel, appState.fastMode),
          origin: requestMeta?.origin,
          uuid: wS.randomUUID()
        };
        return;
      }
    }
    let processInputCheckpoint = ta("before_processUserInput", {
        once: !0
      }),
      {
        messages: processedMessages,
        shouldQuery: shouldQueryFromInput,
        allowedTools: allowedTools,
        model: requestedModel,
        effort: requestedEffort,
        resultText: resultText
      } = await o7t({
        input: promptInput,
        mode: "prompt",
        setToolJSX: () => {},
        context: {
          ...toolUseContext,
          messages: this.mutableMessages
        },
        messages: this.mutableMessages,
        uuid: requestMeta?.uuid,
        isMeta: requestMeta?.isMeta,
        shouldQuery: requestMeta?.shouldQuery,
        querySource: "sdk",
        origin: requestMeta?.origin
      });
    if (processInputCheckpoint) ta("after_processUserInput");
    let shouldQuery = shouldQueryFromInput && requestMeta?.shouldQuery !== !1;
    if (requestMeta?.origin) vQn(processedMessages, requestMeta.origin);
    if (requestMeta?.verifiedSlackHumanTurn) gtr(processedMessages, requestMeta.uuid);
    this.mutableMessages.push(...processedMessages);
    let transcriptMessages = [...this.mutableMessages],
      transcriptCursor = 0,
      lastChainUuid,
      turnStartCursor = transcriptMessages.length,
      flushTranscript = (force = !1) => {
        let fromCursor = transcriptCursor,
          toCursor = oKt(transcriptMessages, Math.max(fromCursor, turnStartCursor), !force);
        if (fromCursor >= toCursor) return Promise.resolve(null);
        let slice = fromCursor === 0 && toCursor === transcriptMessages.length ? transcriptMessages : transcriptMessages.slice(fromCursor, toCursor);
        transcriptCursor = toCursor;
        let prevChainUuid = lastChainUuid;
        for (let idx = slice.length - 1; idx >= 0; idx--) {
          let msg = slice[idx];
          if (One(msg) && Fue(msg)) {
            lastChainUuid = msg.uuid;
            break;
          }
        }
        return HG(slice, void 0, prevChainUuid, transcriptMessages);
      },
      removeMessageByUuid = uuid => {
        let transcriptIndex = transcriptMessages.findLastIndex(msg => msg.uuid === uuid);
        if (transcriptIndex !== -1) {
          let removedMsg = transcriptMessages[transcriptIndex];
          if (transcriptMessages.splice(transcriptIndex, 1), transcriptCursor > transcriptIndex) {
            if (transcriptCursor--, persistEnabled) W("tengu_tombstone_persisted_removal", {
              message_type: Le(removedMsg.type)
            }), aKt(uuid);
          }
          if (turnStartCursor > transcriptIndex) turnStartCursor--;
        }
        let mutableIndex = this.mutableMessages.findLastIndex(msg => msg.uuid === uuid);
        if (mutableIndex !== -1) this.mutableMessages.splice(mutableIndex, 1);
      };
    if (persistEnabled && processedMessages.length > 0) {
      let flushPromise = flushTranscript();
      if (Ed()) ;else if (await flushPromise, Ne.CLAUDE_CODE_EAGER_FLUSH || Ne.CLAUDE_CODE_IS_COWORK) await _v();
    }
    let replayableMessages = processedMessages.filter(msg => msg.type === "user" && !msg.isMeta && !msg.toolUseResult && syc().replayableUserMessagesFilter(msg) || msg.type === "system" && msg.subtype === "compact_boundary"),
      messagesToReplay = replayUserMessages ? replayableMessages : [];
    setAppState(prevState => ({
      ...prevState,
      toolPermissionContext: {
        ...prevState.toolPermissionContext,
        alwaysAllowRules: {
          ...prevState.toolPermissionContext.alwaysAllowRules,
          command: allowedTools
        }
      }
    }));
    let requestedModelAllowed = requestedModel != null && (XT(requestedModel) || Oa(requestedModel));
    if (requestedModel && !requestedModelAllowed) A(`Skill/command model "${requestedModel}" is not in the availableModels allowlist; keeping the session model`, {
      level: "warn"
    });
    let effectiveModel = requestedModelAllowed ? requestedModel : sessionModel,
      activeSkill = toolUseContext.options.activeSkill,
      permissionLayers = requestedEffort !== void 0 ? [...(toolUseContext.permissionLayers ?? []), {
        kind: "effort",
        effort: requestedEffort
      }] : toolUseContext.permissionLayers,
      appStateForLoop = getAppState();
    toolUseContext = {
      messages: transcriptMessages,
      messageQueue: ch,
      turnStartIndex: 0,
      permissionLayers: permissionLayers,
      setMessages: () => {},
      applyMessageOp: () => {},
      onChangeAPIKey: () => {},
      onPermissionDenial: recordDenial,
      requestDialog: this.config.requestDialog,
      sessionState: this.config.sessionState,
      agentContext: Hm(),
      options: {
        commands: commands,
        debug: !1,
        tools: tools,
        refreshTools: refreshTools,
        refreshMcpClients: refreshMcpClients,
        verbose: verbose,
        mainLoopModel: effectiveModel,
        fallbackModel: fallbackModel,
        thinkingConfig: resolvedThinkingConfig,
        mcpClients: mcpClients,
        mcpResources: {},
        ideInstallationStatus: null,
        isNonInteractiveSession: !0,
        customSystemPrompt: customSystemPrompt,
        appendSystemPrompt: appendSystemPrompt,
        planModeInstructions: planModeInstructions,
        appendSubagentSystemPrompt: appendSubagentSystemPrompt,
        toolAliases: toolAliases,
        theme: X3(lc("theme", "dark").value),
        agentDefinitions: {
          activeAgents: agents,
          allAgents: [],
          allowedAgentTypes: allowedAgentTypes
        },
        maxBudgetUsd: maxBudgetUsd,
        messageClientPlatform: requestMeta?.clientPlatform,
        forwardSubagentText: forwardSubagentText,
        activeSkill: activeSkill,
        requiresStructuredOutput: jsonSchema !== void 0 && hasStructuredOutputTool,
        autoCompactWindow: appStateForLoop.autoCompactWindow,
        fastMode: appStateForLoop.fastMode,
        cacheBreakerPhrase: appStateForLoop.cacheBreakerPhrase,
        activeGoal: appStateForLoop.activeGoal,
        ultraplanSessionUrl: appStateForLoop.ultraplanSessionUrl
      },
      getAppState: getAppState,
      setAppState: setAppState,
      getMcp: () => getAppState().mcp,
      getWebBrowser: () => getAppState().webBrowser,
      setToolPermissionContext: permArg => setAppState(prevState => {
        let nextPermCtx = typeof permArg === "function" ? permArg(prevState.toolPermissionContext) : permArg;
        return prevState.toolPermissionContext === nextPermCtx ? prevState : {
          ...prevState,
          toolPermissionContext: nextPermCtx
        };
      }),
      taskRegistry: XD(getAppState, setAppState),
      sessionHooksRegistry: j6e(setAppState),
      getReplContexts: () => getAppState().replContexts,
      setReplContext: fVe(setAppState),
      setWebBrowserSlice: fIe(setAppState),
      setArtifactReadVersion: Lxe(setAppState),
      agentLifecycle: DWe(getAppState, setAppState),
      teammateColors: PWe(getAppState, setAppState),
      rootToolSurface: {
        tools: tools,
        mainLoopModel: effectiveModel
      },
      abortController: this.abortController,
      readFileState: this.readFileState,
      nestedMemoryAttachmentTriggers: [],
      pendingNestedMemoryTriggers: this.pendingNestedMemoryTriggers,
      loadedNestedMemoryPaths: this.loadedNestedMemoryPaths,
      sessionEnvVars: this.sessionEnvVars,
      dynamicSkillDirTriggers: [],
      memorySelector: this.memorySelector,
      isolationLatch: this.isolationLatch,
      getFileHistoryState: toolUseContext.getFileHistoryState,
      applyFileHistoryOp: toolUseContext.applyFileHistoryOp,
      applyAttributionOp: toolUseContext.applyAttributionOp,
      onCompactEvent: event => {
        if (event.type === "sdk_status") setSDKStatus?.(event.status, event.metadata);
      },
      onQueryEvent: event => {
        if (event.type === "apply_flag_settings") QPe(event.settings, setAppState);
      }
    }, fv("before_skills_plugins");
    let skillsLoadStartMs = performance.now(),
      [loadedSkills, {
        enabled: enabledPlugins,
        errors: pluginErrors,
        warnings: pluginWarnings
      }] = await Promise.all([lae(Lt()), np()]);
    Mc("qe_plugin_skills_load_ms", performance.now() - skillsLoadStartMs, skillsLoadStartMs), fv("after_skills_plugins");
    let systemMessageStartMs = performance.now(),
      systemMessageBase = AZn(),
      systemMessage = ZKt({
        ...systemMessageBase,
        tools: tools,
        mcpClients: mcpClients,
        model: effectiveModel,
        permissionMode: appState.toolPermissionContext.mode,
        commands: commands,
        agents: agents,
        skills: loadedSkills,
        plugins: enabledPlugins,
        pluginErrors: [...pluginErrors, ...Agc()].filter(oNi).map(err => ({
          plugin: err.source,
          type: err.type,
          message: fT(err)
        })),
        pluginWarnings: pluginWarnings.filter(warn => warn.source.endsWith("@inline") || warn.source.startsWith("inline[") || warn.source.endsWith(`@${tb}`)).map(warn => ({
          plugin: warn.source,
          type: warn.type,
          message: EO(warn)
        })),
        fastModeState: lF(effectiveModel, appState.fastMode)
      });
    if (RZn(systemMessage, systemMessageStartMs), yield systemMessage, fv("system_message_yielded"), wn("info", "cli_ask_should_query_resolved", {
      should_query: shouldQuery,
      from_user_input: shouldQueryFromInput,
      from_options: requestMeta?.shouldQuery
    }), !shouldQuery) {
      for (let msg of processedMessages) {
        if (msg.type === "user" && typeof msg.message.content === "string" && (msg.message.content.includes(`<${Tk}>`) || msg.message.content.includes(`<${jX}>`) || msg.isCompactSummary)) yield {
          type: "user",
          message: {
            ...msg.message,
            content: cc(msg.message.content)
          },
          session_id: It(),
          parent_tool_use_id: null,
          uuid: msg.uuid,
          timestamp: msg.timestamp,
          isReplay: !msg.isCompactSummary,
          isSynthetic: msg.isMeta || msg.isVisibleInTranscriptOnly
        };
        if (msg.type === "system" && msg.subtype === "local_command" && typeof msg.content === "string" && (msg.content.includes(`<${Tk}>`) || msg.content.includes(`<${jX}>`))) yield Mjn(msg.content, msg.uuid);
        if (msg.type === "system" && msg.subtype === "compact_boundary") yield {
          type: "system",
          subtype: "compact_boundary",
          session_id: It(),
          uuid: msg.uuid,
          compact_metadata: RGt(msg.compactMetadata)
        };
        if (msg.type === "system" && msg.subtype === "informational") yield {
          type: "system",
          subtype: "informational",
          content: cc(msg.content),
          level: msg.level,
          ...(msg.toolUseID && {
            tool_use_id: msg.toolUseID
          }),
          ...(msg.preventContinuation && {
            prevent_continuation: msg.preventContinuation
          }),
          uuid: msg.uuid,
          session_id: It()
        };
      }
      if (persistEnabled) {
        if (await flushTranscript(), Ne.CLAUDE_CODE_EAGER_FLUSH || Ne.CLAUDE_CODE_IS_COWORK) await _v();
      }
      for (let msg of requestMeta?.shouldQuery === !1 ? messagesToReplay : []) if (msg.type === "user") {
        let fileAttachments = requestMeta?.uuid && msg.uuid === requestMeta.uuid ? requestMeta?.fileAttachments : void 0;
        yield {
          type: "user",
          message: msg.message,
          session_id: It(),
          parent_tool_use_id: null,
          uuid: msg.uuid,
          timestamp: msg.timestamp,
          isReplay: !0,
          ...(fileAttachments && fileAttachments.length > 0 && {
            file_attachments: fileAttachments
          }),
          ...(msg.origin && {
            origin: msg.origin
          })
        };
      }
      yield {
        type: "result",
        subtype: "success",
        is_error: !1,
        duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
        duration_api_ms: kv(),
        num_turns: 0,
        result: resultText ?? "",
        stop_reason: null,
        session_id: It(),
        total_cost_usd: nA(),
        usage: this.totalUsage,
        modelUsage: Vx(),
        permission_denials: this.permissionDenials,
        fast_mode_state: lF(effectiveModel, appState.fastMode),
        origin: requestMeta?.origin,
        uuid: wS.randomUUID()
      };
      return;
    }
    if (TT() && persistEnabled) processedMessages.filter(syc().replayableUserMessagesFilter).forEach(msg => {
      nut(toolUseContext.getFileHistoryState, toolUseContext.applyFileHistoryOp, msg.uuid);
    });
    let accumulatedUsage = $E,
      turnCount = 1,
      hasReplayed = !1,
      structuredOutputs = [],
      tombstonedStructuredCalls = 0,
      retractedToolUseIds = new Set(),
      pendingDeferredTool,
      lastStopReason = null,
      activeStreamMessageId = null,
      activeContentBlockIndex = null,
      contentBlockClosed = !1,
      pendingRetraction = null,
      closePendingRetraction = () => {
        if (pendingRetraction === null) return [];
        let {
          retracted: retractedMsg
        } = pendingRetraction;
        if (pendingRetraction = null, W("tengu_partial_stream_retraction_closed", {
          stop_reason: Bo(retractedMsg.stop_reason),
          had_open_block: !1
        }), !includePartialMessages) return [];
        return [{
          type: "stream_event",
          event: {
            type: "message_delta",
            context_management: null,
            delta: {
              container: null,
              stop_details: null,
              stop_reason: retractedMsg.stop_reason,
              stop_sequence: retractedMsg.stop_sequence
            },
            usage: {
              cache_creation_input_tokens: retractedMsg.usage.cache_creation_input_tokens ?? null,
              cache_read_input_tokens: retractedMsg.usage.cache_read_input_tokens ?? null,
              input_tokens: retractedMsg.usage.input_tokens ?? null,
              iterations: retractedMsg.usage.iterations ?? null,
              output_tokens: retractedMsg.usage.output_tokens,
              server_tool_use: retractedMsg.usage.server_tool_use ?? null
            }
          },
          session_id: It(),
          parent_tool_use_id: null,
          uuid: wS.randomUUID()
        }, {
          type: "stream_event",
          event: {
            type: "message_stop"
          },
          session_id: It(),
          parent_tool_use_id: null,
          uuid: wS.randomUUID()
        }];
      },
      pendingPreservedMessages = null,
      lastErrorMarker = x1e().at(-1),
      initialStructuredOutputToolUses = jsonSchema ? cMo(this.mutableMessages, Rp) : 0,
      queryTerminalRef = {},
      maxTurnsReached,
      transformedAssistantMessages = new Map(),
      streamUuidSeed = wS.randomUUID();
    try {
      for await (let event of $Ym(jq({
        messages: transcriptMessages,
        systemPrompt: systemPrompt,
        userContext: mergedUserContext,
        systemContext: systemContext,
        canUseTool: canUseToolWrapped,
        toolUseContext: toolUseContext,
        fallbackModel: fallbackModel,
        querySource: "sdk",
        maxTurns: maxTurns,
        taskBudget: taskBudget,
        stopHookActive: requestMeta?.stopHookActive
      }), queryTerminalRef)) {
        if (event.type === "assistant" || event.type === "user" || event.type === "system" && event.subtype === "compact_boundary") {
          if (event.type === "assistant" && !firstAssistantAtMs) firstAssistantAtMs = performance.now();
          if (persistEnabled && event.type === "system" && event.subtype === "compact_boundary") {
            let tailUuid = event.compactMetadata?.preservedMessages?.uuids.at(-1) ?? event.compactMetadata?.preservedSegment?.tailUuid;
            if (tailUuid) {
              let tailIndex = this.mutableMessages.findLastIndex(msg => msg.uuid === tailUuid);
              if (tailIndex !== -1) await HG(this.mutableMessages.slice(0, tailIndex + 1)), transcriptCursor = 0, lastChainUuid = void 0;
            }
          }
          if (transcriptMessages.push(event), persistEnabled) if (event.type === "assistant") flushTranscript();else await flushTranscript();
          if (!hasReplayed && messagesToReplay.length > 0) {
            hasReplayed = !0;
            for (let msg of messagesToReplay) if (msg.type === "user") {
              let fileAttachments = requestMeta?.uuid && msg.uuid === requestMeta.uuid ? requestMeta?.fileAttachments : void 0;
              yield {
                type: "user",
                message: msg.message,
                session_id: It(),
                parent_tool_use_id: null,
                uuid: msg.uuid,
                timestamp: msg.timestamp,
                isReplay: !0,
                ...(fileAttachments && fileAttachments.length > 0 && {
                  file_attachments: fileAttachments
                }),
                ...(msg.origin && {
                  origin: msg.origin
                })
              };
            }
          }
        }
        if (event.type === "user") turnCount++;
        switch (event.type) {
          case "sdk_status":
            yield {
              type: "system",
              subtype: "status",
              status: event.status,
              ...(event.metadata?.compactResult !== void 0 && {
                compact_result: event.metadata.compactResult
              }),
              ...(event.metadata?.compactError !== void 0 && {
                compact_error: event.metadata.compactError
              }),
              session_id: It(),
              uuid: wS.randomUUID()
            };
            continue;
          case "compact_progress":
          case "stream_mode":
          case "response_length":
            continue;
          case "tombstone":
            {
              if (includePartialMessages && activeStreamMessageId !== null && event.message.type === "assistant" && event.message.message.id === activeStreamMessageId) if (event.displayOnly === !0) W("tengu_partial_stream_retraction_display_only", {
                had_open_block: activeContentBlockIndex !== null
              });else {
                let retractedMsg = event.message.message;
                if (activeContentBlockIndex === null) pendingRetraction = {
                  messageId: activeStreamMessageId,
                  retracted: retractedMsg
                }, activeStreamMessageId = null;else yield {
                  type: "stream_event",
                  event: {
                    type: "content_block_stop",
                    index: activeContentBlockIndex
                  },
                  session_id: It(),
                  parent_tool_use_id: null,
                  uuid: wS.randomUUID()
                }, yield {
                  type: "stream_event",
                  event: {
                    type: "message_delta",
                    context_management: null,
                    delta: {
                      container: null,
                      stop_details: null,
                      stop_reason: retractedMsg.stop_reason,
                      stop_sequence: retractedMsg.stop_sequence
                    },
                    usage: {
                      cache_creation_input_tokens: retractedMsg.usage.cache_creation_input_tokens ?? null,
                      cache_read_input_tokens: retractedMsg.usage.cache_read_input_tokens ?? null,
                      input_tokens: retractedMsg.usage.input_tokens ?? null,
                      iterations: retractedMsg.usage.iterations ?? null,
                      output_tokens: retractedMsg.usage.output_tokens,
                      server_tool_use: retractedMsg.usage.server_tool_use ?? null
                    }
                  },
                  session_id: It(),
                  parent_tool_use_id: null,
                  uuid: wS.randomUUID()
                }, yield {
                  type: "stream_event",
                  event: {
                    type: "message_stop"
                  },
                  session_id: It(),
                  parent_tool_use_id: null,
                  uuid: wS.randomUUID()
                }, W("tengu_partial_stream_retraction_closed", {
                  stop_reason: Bo(retractedMsg.stop_reason),
                  had_open_block: !0
                }), activeStreamMessageId = null, activeContentBlockIndex = null;
              }
              if (event.message.type === "assistant") {
                let content = event.message.message.content,
                  retractedStructuredIds = Array.isArray(content) ? content.flatMap(block => block.type === "tool_use" && block.name === Rp ? [block.id] : []) : [];
                if (retractedStructuredIds.length > 0) {
                  tombstonedStructuredCalls++;
                  for (let id of retractedStructuredIds) retractedToolUseIds.add(id);
                  let isRetracted = output => output.toolUseID === void 0 || retractedStructuredIds.includes(output.toolUseID),
                    retractedOutputs = structuredOutputs.filter(isRetracted);
                  structuredOutputs = structuredOutputs.filter(output => !isRetracted(output));
                  for (let output of retractedOutputs) removeMessageByUuid(output.attachmentUuid);
                  W("tengu_structured_output_retracted", {
                    retracted_results: retractedOutputs.length,
                    surviving_results: structuredOutputs.length,
                    tombstoned_calls: tombstonedStructuredCalls
                  });
                }
              }
              removeMessageByUuid(event.message.uuid);
              break;
            }
          case "assistant":
            {
              if (event.message.stop_reason != null) lastStopReason = event.message.stop_reason;
              this.mutableMessages.push(event);
              let transformedMsg = await Cdc(event, streamUuidSeed, getAppState, this.abortController.signal);
              if (transformedMsg !== event) transformedAssistantMessages.set(event, transformedMsg);
              yield* npt(transformedMsg, refreshTools?.() ?? tools);
              break;
            }
          case "progress":
            if (this.mutableMessages.push(event), persistEnabled) transcriptMessages.push(event), flushTranscript();
            yield* npt(event, refreshTools?.() ?? tools);
            break;
          case "user":
            if (this.mutableMessages.push(event), pendingPreservedMessages?.anchorUuid === event.uuid) this.mutableMessages.push(...pendingPreservedMessages.preserved), pendingPreservedMessages = null;
            yield* npt(event, refreshTools?.() ?? tools);
            break;
          case "stream_event":
            if (pendingRetraction !== null) if (event.event.type === "ping") ;else if (event.event.type === "message_start") yield* closePendingRetraction();else activeStreamMessageId = pendingRetraction.messageId, pendingRetraction = null;
            if (includePartialMessages && event.event.type === "message_start" && activeStreamMessageId !== null) {
              let hadOpenBlock = activeContentBlockIndex !== null;
              if (activeContentBlockIndex !== null) yield {
                type: "stream_event",
                event: {
                  type: "content_block_stop",
                  index: activeContentBlockIndex
                },
                session_id: It(),
                parent_tool_use_id: null,
                uuid: wS.randomUUID()
              };
              yield {
                type: "stream_event",
                event: {
                  type: "message_delta",
                  context_management: null,
                  delta: {
                    container: null,
                    stop_details: null,
                    stop_reason: null,
                    stop_sequence: null
                  },
                  usage: {
                    cache_creation_input_tokens: accumulatedUsage.cache_creation_input_tokens,
                    cache_read_input_tokens: accumulatedUsage.cache_read_input_tokens,
                    input_tokens: accumulatedUsage.input_tokens,
                    iterations: accumulatedUsage.iterations ?? null,
                    output_tokens: accumulatedUsage.output_tokens,
                    server_tool_use: accumulatedUsage.server_tool_use ?? null
                  }
                },
                session_id: It(),
                parent_tool_use_id: null,
                uuid: wS.randomUUID()
              }, yield {
                type: "stream_event",
                event: {
                  type: "message_stop"
                },
                session_id: It(),
                parent_tool_use_id: null,
                uuid: wS.randomUUID()
              }, W("tengu_partial_stream_retraction_closed", {
                stop_reason: void 0,
                had_open_block: hadOpenBlock,
                source: Ve("stale_message_start")
              }), activeStreamMessageId = null, activeContentBlockIndex = null;
            }
            if (event.event.type === "message_start") activeStreamMessageId = event.event.message.id, activeContentBlockIndex = null, contentBlockClosed = !1;else if (event.event.type === "content_block_start") activeContentBlockIndex = event.event.index;else if (event.event.type === "content_block_stop") activeContentBlockIndex = null, contentBlockClosed = !0;else if (event.event.type === "message_stop") activeStreamMessageId = null, activeContentBlockIndex = null;
            if (event.event.type === "message_start") {
              if (!firstStreamAtMs) firstStreamAtMs = performance.now();
              if (!requestSentAtMs && event.requestSentAtMs) requestSentAtMs = event.requestSentAtMs;
              accumulatedUsage = $E, accumulatedUsage = Qte(accumulatedUsage, event.event.message.usage);
            }
            if (event.event.type === "message_delta") {
              if (accumulatedUsage = K6t(event.event.usage)?.servedFallbackModel ? bLo(accumulatedUsage, event.event.usage) : Qte(accumulatedUsage, event.event.usage), event.event.delta.stop_reason != null) lastStopReason = event.event.delta.stop_reason;
              if (persistEnabled) flushTranscript();
            }
            if (event.event.type === "message_stop") this.totalUsage = qWn(this.totalUsage, accumulatedUsage);
            if (event.event.type === "content_block_start") this.thinkingTokenEstimate = 0;else if (event.event.type === "content_block_delta") {
              let {
                delta: delta
              } = event.event;
              if (delta.type === "thinking_delta") {
                let tokenDelta;
                if ("estimated_tokens" in delta && typeof delta.estimated_tokens === "number") tokenDelta = delta.estimated_tokens;else if (typeof delta.thinking === "string" && delta.thinking.length > 0) tokenDelta = RQn(delta.thinking);
                if (tokenDelta !== void 0) this.thinkingTokenEstimate += tokenDelta, yield {
                  type: "system",
                  subtype: "thinking_tokens",
                  estimated_tokens: this.thinkingTokenEstimate,
                  estimated_tokens_delta: tokenDelta,
                  uuid: wS.randomUUID(),
                  session_id: It()
                };
              } else if (delta.type === "signature_delta" && this.thinkingTokenEstimate > 0) {
                let signatureTokens = Math.ceil(tot(delta.signature.length) / 4);
                if (signatureTokens > this.thinkingTokenEstimate) {
                  let tokenDelta = signatureTokens - this.thinkingTokenEstimate;
                  this.thinkingTokenEstimate = signatureTokens, yield {
                    type: "system",
                    subtype: "thinking_tokens",
                    estimated_tokens: this.thinkingTokenEstimate,
                    estimated_tokens_delta: tokenDelta,
                    uuid: wS.randomUUID(),
                    session_id: It()
                  };
                }
              }
            }
            if (includePartialMessages) yield {
              type: "stream_event",
              event: event.event,
              session_id: It(),
              parent_tool_use_id: null,
              uuid: wS.randomUUID(),
              ...(event.ttftMs !== void 0 && {
                ttft_ms: event.ttftMs
              })
            };
            break;
          case "attachment":
            if (this.mutableMessages.push(event), persistEnabled) transcriptMessages.push(event), flushTranscript();
            if (event.attachment.type === "relevant_memories") {
              let memoriesEvent = sNo(event.attachment.memories);
              if (memoriesEvent) yield memoriesEvent;
            } else if (event.attachment.type === "structured_output") {
              if (event.attachment.toolUseID !== void 0 ? retractedToolUseIds.has(event.attachment.toolUseID) : retractedToolUseIds.size > 0) removeMessageByUuid(event.uuid), W("tengu_structured_output_late_retraction_drop", {});else structuredOutputs = [...structuredOutputs, {
                toolUseID: event.attachment.toolUseID,
                attachmentUuid: event.uuid,
                data: event.attachment.data
              }];
            } else if (event.attachment.type === "hook_deferred_tool") pendingDeferredTool = {
              id: event.attachment.toolUseID,
              name: event.attachment.toolName,
              input: event.attachment.toolInput
            };else if (event.attachment.type === "max_turns_reached") {
              maxTurnsReached = {
                turnCount: event.attachment.turnCount,
                maxTurns: event.attachment.maxTurns
              };
              continue;
            } else if (replayUserMessages && event.attachment.type === "queued_command") {
              let queuedCommand = event.attachment;
              yield {
                type: "user",
                message: {
                  role: "user",
                  content: queuedCommand.prompt
                },
                session_id: It(),
                parent_tool_use_id: null,
                uuid: queuedCommand.source_uuid || event.uuid,
                timestamp: event.timestamp,
                isReplay: !0,
                ...(queuedCommand.fileAttachments?.length && {
                  file_attachments: queuedCommand.fileAttachments
                }),
                ...(queuedCommand.origin && {
                  origin: queuedCommand.origin
                })
              };
            }
            break;
          case "stream_request_start":
            if (includePartialMessages) yield {
              type: "system",
              subtype: "status",
              status: "requesting",
              uuid: wS.randomUUID(),
              session_id: It()
            };
            break;
          case "notification":
            {
              let notification = event.notification;
              yield {
                type: "system",
                subtype: "notification",
                key: notification.key,
                text: notification.text,
                priority: notification.priority,
                ...(notification.color !== void 0 && {
                  color: notification.color
                }),
                ...(notification.timeoutMs !== void 0 && {
                  timeout_ms: notification.timeoutMs
                }),
                uuid: wS.randomUUID(),
                session_id: It()
              };
              break;
            }
          case "set_expanded_view":
            break;
          case "post_turn_summary":
            this.config.setAppState(prevState => prevState.postTurnSummary === event.value ? prevState : {
              ...prevState,
              postTurnSummary: event.value
            });
            break;
          case "active_goal":
            this.config.setAppState(prevState => prevState.activeGoal === event.value ? prevState : {
              ...prevState,
              activeGoal: event.value
            });
            break;
          case "set_in_progress_tool_use_ids":
            break;
          case "hint_clears":
            break;
          case "refusal_continuation":
            break;
          case "interruptible_tool_in_progress":
            break;
          case "api_metrics":
            break;
          case "os_notification":
            break;
          case "open_message_selector":
            break;
          case "command_lifecycle":
            this.config.onCommandLifecycle?.(event.uuid, event.state);
            break;
          case "system":
            {
              if (this.mutableMessages.push(event), persistEnabled && event.subtype === "model_refusal_fallback") transcriptMessages.push(event), W("tengu_refusal_fallback_entry_recorded", {
                request_id: xr(event.requestId)
              });
              if (event.subtype === "compact_boundary" && event.compactMetadata) {
                let preservedMessages = event.compactMetadata.preservedMessages,
                  preserved = (preservedMessages?.allUuids ?? preservedMessages?.uuids ?? []).map(uuid => this.mutableMessages.find(msg => msg.uuid === uuid)).filter(msg => msg !== void 0).map(d6e);
                pendingPreservedMessages = preservedMessages && preserved.length > 0 ? {
                  preserved: preserved,
                  anchorUuid: preservedMessages.anchorUuid
                } : null;
                let mutableTrimCount = this.mutableMessages.length - 1;
                if (mutableTrimCount > 0) this.mutableMessages.splice(0, mutableTrimCount);
                if (pendingPreservedMessages?.anchorUuid === event.uuid) this.mutableMessages.push(...pendingPreservedMessages.preserved), pendingPreservedMessages = null;
                let transcriptTrimCount = transcriptMessages.length - 1;
                if (transcriptTrimCount > 0) transcriptMessages.splice(0, transcriptTrimCount), transcriptCursor = transcriptMessages.length, turnStartCursor = transcriptMessages.length;
                yield {
                  type: "system",
                  subtype: "compact_boundary",
                  session_id: It(),
                  uuid: event.uuid,
                  compact_metadata: RGt(event.compactMetadata)
                };
              }
              if (event.subtype === "api_error") yield {
                type: "system",
                subtype: "api_retry",
                attempt: event.retryAttempt,
                max_retries: event.maxRetries,
                retry_delay_ms: event.retryInMs,
                error_status: event.error.status ?? null,
                error: U7r(event.error),
                session_id: It(),
                uuid: event.uuid
              };
              if (includePartialMessages && activeStreamMessageId !== null && !contentBlockClosed && event.subtype === "model_refusal_fallback" && event.direction === "retry") {
                let hadOpenBlock = activeContentBlockIndex !== null;
                if (activeContentBlockIndex !== null) yield {
                  type: "stream_event",
                  event: {
                    type: "content_block_stop",
                    index: activeContentBlockIndex
                  },
                  session_id: It(),
                  parent_tool_use_id: null,
                  uuid: wS.randomUUID()
                };
                yield {
                  type: "stream_event",
                  event: {
                    type: "message_delta",
                    context_management: null,
                    delta: {
                      container: null,
                      stop_details: null,
                      stop_reason: "refusal",
                      stop_sequence: null
                    },
                    usage: {
                      cache_creation_input_tokens: accumulatedUsage.cache_creation_input_tokens,
                      cache_read_input_tokens: accumulatedUsage.cache_read_input_tokens,
                      input_tokens: accumulatedUsage.input_tokens,
                      iterations: accumulatedUsage.iterations ?? null,
                      output_tokens: accumulatedUsage.output_tokens,
                      server_tool_use: accumulatedUsage.server_tool_use ?? null
                    }
                  },
                  session_id: It(),
                  parent_tool_use_id: null,
                  uuid: wS.randomUUID()
                }, yield {
                  type: "stream_event",
                  event: {
                    type: "message_stop"
                  },
                  session_id: It(),
                  parent_tool_use_id: null,
                  uuid: wS.randomUUID()
                }, W("tengu_partial_stream_retraction_closed", {
                  stop_reason: Le("refusal"),
                  had_open_block: hadOpenBlock,
                  source: Ve("refusal_banner")
                }), activeStreamMessageId = null, activeContentBlockIndex = null;
              }
              if (tj() && event.subtype === "model_refusal_fallback") yield {
                type: "system",
                subtype: "model_refusal_fallback",
                trigger: event.trigger,
                direction: event.direction,
                original_model: event.originalModel,
                fallback_model: event.fallbackModel,
                request_id: event.requestId,
                api_refusal_category: event.apiRefusalCategory ?? null,
                api_refusal_explanation: event.apiRefusalExplanation ?? null,
                ...(event.retractedMessageUuids !== void 0 && {
                  retracted_message_uuids: event.retractedMessageUuids
                }),
                content: event.content,
                session_id: It(),
                uuid: event.uuid
              };
              if (event.subtype === "model_fallback") yield {
                type: "system",
                subtype: "model_fallback",
                trigger: event.trigger,
                original_model: event.originalModel,
                fallback_model: event.fallbackModel,
                content: event.content,
                session_id: It(),
                uuid: event.uuid
              };
              if (event.subtype === "model_consent_fallback") yield {
                type: "system",
                subtype: "model_consent_fallback",
                choice: event.choice,
                original_model: event.originalModel,
                fallback_model: event.fallbackModel,
                persisted_as_default: event.persistedAsDefault,
                content: event.content,
                session_id: It(),
                uuid: event.uuid
              };
              break;
            }
          case "tool_use_summary":
            yield {
              type: "tool_use_summary",
              summary: event.summary,
              preceding_tool_use_ids: event.precedingToolUseIds,
              session_id: It(),
              uuid: event.uuid
            };
            break;
        }
        if (maxBudgetUsd !== void 0 && nA() >= maxBudgetUsd) {
          if (yield* closePendingRetraction(), persistEnabled) {
            if (await flushTranscript(!0), Ne.CLAUDE_CODE_EAGER_FLUSH || Ne.CLAUDE_CODE_IS_COWORK) await _v();
          }
          yield {
            type: "result",
            subtype: "error_max_budget_usd",
            duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
            duration_api_ms: kv(),
            is_error: !0,
            num_turns: turnCount,
            stop_reason: lastStopReason,
            session_id: It(),
            total_cost_usd: nA(),
            usage: this.totalUsage,
            modelUsage: Vx(),
            permission_denials: this.permissionDenials,
            fast_mode_state: lF(effectiveModel, appState.fastMode),
            origin: requestMeta?.origin,
            uuid: wS.randomUUID(),
            errors: [`Reached maximum budget ($${maxBudgetUsd})`]
          };
          return;
        }
        if (event.type === "user" && jsonSchema) {
          let structuredRetryCount = cMo(this.mutableMessages, Rp) + tombstonedStructuredCalls - initialStructuredOutputToolUses,
            maxStructuredRetries = parseInt(process.env.MAX_STRUCTURED_OUTPUT_RETRIES || "5", 10);
          if (structuredRetryCount >= maxStructuredRetries && structuredOutputs.length === 0) {
            if (persistEnabled) {
              if (await flushTranscript(!0), Ne.CLAUDE_CODE_EAGER_FLUSH || Ne.CLAUDE_CODE_IS_COWORK) await _v();
            }
            yield* closePendingRetraction(), yield {
              type: "result",
              subtype: "error_max_structured_output_retries",
              duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
              duration_api_ms: kv(),
              is_error: !0,
              num_turns: turnCount,
              stop_reason: lastStopReason,
              session_id: It(),
              total_cost_usd: nA(),
              usage: this.totalUsage,
              modelUsage: Vx(),
              permission_denials: this.permissionDenials,
              fast_mode_state: lF(effectiveModel, appState.fastMode),
              origin: requestMeta?.origin,
              uuid: wS.randomUUID(),
              errors: [tombstonedStructuredCalls > 0 ? `Failed to provide surviving structured output after ${maxStructuredRetries} attempts (${tombstonedStructuredCalls} retracted by a model fallback)` : `Failed to provide valid structured output after ${maxStructuredRetries} attempts`]
            };
            return;
          }
        }
      }
    } finally {
      if (pendingPreservedMessages !== null) W("tengu_compact_preserved_unanchored", {
        preservedCount: pendingPreservedMessages.preserved.length
      }), this.mutableMessages.push(...pendingPreservedMessages.preserved), pendingPreservedMessages = null;
    }
    yield* closePendingRetraction();
    let lastConversationMessage = transcriptMessages.findLast(msg => msg.type === "assistant" || msg.type === "user"),
      lastResultType = lastConversationMessage?.type ?? "undefined",
      lastContentType = lastConversationMessage?.type === "assistant" ? z3(lastConversationMessage.message.content)?.type ?? "none" : "n/a";
    if (persistEnabled) {
      if (await flushTranscript(!0), Ne.CLAUDE_CODE_EAGER_FLUSH || Ne.CLAUDE_CODE_IS_COWORK) await _v();
    }
    if (pendingDeferredTool) {
      yield {
        type: "result",
        subtype: "success",
        is_error: !1,
        duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
        duration_api_ms: kv(),
        num_turns: turnCount,
        result: "",
        stop_reason: "tool_deferred",
        session_id: It(),
        total_cost_usd: nA(),
        usage: this.totalUsage,
        modelUsage: Vx(),
        permission_denials: this.permissionDenials,
        deferred_tool_use: pendingDeferredTool,
        terminal_reason: queryTerminalRef.value?.reason,
        fast_mode_state: lF(effectiveModel, appState.fastMode),
        origin: requestMeta?.origin,
        uuid: wS.randomUUID()
      };
      return;
    }
    if (maxTurnsReached) {
      yield {
        type: "result",
        subtype: "error_max_turns",
        duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
        duration_api_ms: kv(),
        is_error: !0,
        num_turns: maxTurnsReached.turnCount,
        stop_reason: lastStopReason,
        session_id: It(),
        total_cost_usd: nA(),
        usage: this.totalUsage,
        modelUsage: Vx(),
        permission_denials: this.permissionDenials,
        terminal_reason: queryTerminalRef.value?.reason,
        fast_mode_state: lF(effectiveModel, appState.fastMode),
        origin: requestMeta?.origin,
        uuid: wS.randomUUID(),
        errors: [`Reached maximum number of turns (${maxTurnsReached.maxTurns})`]
      };
      return;
    }
    if (!Wyo(lastConversationMessage, lastStopReason)) {
      yield {
        type: "result",
        subtype: "error_during_execution",
        duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
        duration_api_ms: kv(),
        is_error: !0,
        num_turns: turnCount,
        stop_reason: lastStopReason,
        session_id: It(),
        total_cost_usd: nA(),
        usage: this.totalUsage,
        modelUsage: Vx(),
        permission_denials: this.permissionDenials,
        terminal_reason: queryTerminalRef.value?.reason,
        fast_mode_state: lF(effectiveModel, appState.fastMode),
        origin: requestMeta?.origin,
        uuid: wS.randomUUID(),
        errors: (() => {
          let errorList = x1e(),
            sliceFrom = lastErrorMarker ? errorList.lastIndexOf(lastErrorMarker) + 1 : 0;
          return [`[ede_diagnostic] result_type=${lastResultType} last_content_type=${lastContentType} stop_reason=${lastStopReason}`, ...errorList.slice(sliceFrom).map(entry => entry.error)];
        })()
      };
      return;
    }
    if (jsonSchema && structuredOutputs.length === 0 && tombstonedStructuredCalls > 0 && !(lastConversationMessage.type === "assistant" && lastConversationMessage.isApiErrorMessage)) {
      W("tengu_structured_output_retraction_exhausted", {
        tombstoned_calls: tombstonedStructuredCalls,
        num_turns: turnCount
      }), yield {
        type: "result",
        subtype: "error_max_structured_output_retries",
        duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
        duration_api_ms: kv(),
        is_error: !0,
        num_turns: turnCount,
        stop_reason: lastStopReason,
        session_id: It(),
        total_cost_usd: nA(),
        usage: this.totalUsage,
        modelUsage: Vx(),
        permission_denials: this.permissionDenials,
        terminal_reason: queryTerminalRef.value?.reason,
        fast_mode_state: lF(effectiveModel, appState.fastMode),
        origin: requestMeta?.origin,
        uuid: wS.randomUUID(),
        errors: ["Structured output was retracted by a model fallback and no retry produced a valid result"]
      };
      return;
    }
    let resultTextOut = "",
      isApiError = !1,
      apiErrorStatus = null;
    if (lastConversationMessage.type === "assistant") {
      let transformedMsg = transformedAssistantMessages.get(lastConversationMessage) ?? lastConversationMessage,
        lastBlock = z3(lastConversationMessage.message.content),
        transformedLastBlock = z3(transformedMsg.message.content);
      if (lastBlock?.type === "text" && !eot.has(lastBlock.text) && transformedLastBlock?.type === "text") resultTextOut = transformedLastBlock.text;
      isApiError = Boolean(lastConversationMessage.isApiErrorMessage), apiErrorStatus = lastConversationMessage.apiErrorStatus ?? null;
    }
    if (resultTextOut === "") {
      let lastStructuredData = structuredOutputs.at(-1)?.data;
      if (lastStructuredData !== void 0) resultTextOut = JSON.stringify(lastStructuredData);
    }
    if (!isApiError && firstAssistantAtMs) W("tengu_sdk_ttft", {
      ttft_ms: Math.max(0, Math.round(firstAssistantAtMs - startedAtMs)),
      model: String(effectiveModel)
    });
    yield {
      type: "result",
      subtype: "success",
      is_error: isApiError,
      api_error_status: apiErrorStatus,
      duration_ms: Math.max(0, Math.round(performance.now() - startedAtMs)),
      duration_api_ms: kv(),
      ttft_ms: !isApiError && firstAssistantAtMs ? Math.max(0, Math.round(firstAssistantAtMs - startedAtMs)) : void 0,
      ttft_stream_ms: !isApiError && firstStreamAtMs ? Math.max(0, Math.round(firstStreamAtMs - startedAtMs)) : void 0,
      time_to_request_ms: !isApiError && requestSentAtMs ? Math.max(0, Math.round(requestSentAtMs - startedAtMs)) : void 0,
      ...(() => {
        let spawnTiming = !isApiError ? dFa() : void 0;
        return spawnTiming ? {
          time_to_request_from_spawn_ms: spawnTiming.ms,
          warm_spare_claimed: spawnTiming.warmSpareClaimed,
          time_origin_ms: spawnTiming.timeOriginMs
        } : {};
      })(),
      num_turns: turnCount,
      result: resultTextOut,
      stop_reason: lastStopReason,
      session_id: It(),
      total_cost_usd: nA(),
      usage: this.totalUsage,
      modelUsage: Vx(),
      permission_denials: this.permissionDenials,
      structured_output: structuredOutputs.at(-1)?.data,
      terminal_reason: queryTerminalRef.value?.reason,
      fast_mode_state: lF(effectiveModel, appState.fastMode),
      origin: requestMeta?.origin,
      uuid: wS.randomUUID()
    };
  }
  interrupt() {
    this.abortController.abort(qMt("remote-cancel"));
  }
  getMessages() {
    return this.mutableMessages;
  }
  getReadFileState() {
    return this.readFileState;
  }
  getSessionId() {
    return It();
  }
  setModel(model) {
    this.config.userSpecifiedModel = model;
  }
  getMemoryAttribution() {
    return {
      messages: {
        entries: this.mutableMessages.length
      },
      file_state_cache: {
        entries: this.readFileState.size,
        bytes: this.readFileState.calculatedSize
      }
    };
  }
  dispose() {
    this.mutableMessages.length = 0, this.permissionDenials.length = 0, this.readFileState.clear(), this.loadedNestedMemoryPaths = {}, this.sessionEnvVars.clear();
  }
}
async function* ayc({
  commands: commands,
  prompt: prompt,
  promptUuid: promptUuid,
  isMeta: isMeta,
  shouldQuery: shouldQuery,
  stopHookActive: stopHookActive,
  fileAttachments: fileAttachments,
  origin: origin,
  clientPlatform: clientPlatform,
  verifiedSlackHumanTurn: verifiedSlackHumanTurn,
  cwd: cwd,
  tools: tools,
  refreshTools: refreshTools,
  refreshMcpClients: refreshMcpClients,
  mcpClients: mcpClients,
  verbose = !1,
  thinkingConfig: thinkingConfig,
  maxTurns: maxTurns,
  maxBudgetUsd: maxBudgetUsd,
  taskBudget: taskBudget,
  canUseTool: canUseTool,
  mutableMessages = [],
  getReadFileCache: getReadFileCache,
  setReadFileCache: setReadFileCache,
  sessionEnvVars: sessionEnvVars,
  isolationLatch: isolationLatch,
  pendingNestedMemoryTriggers: pendingNestedMemoryTriggers,
  customSystemPrompt: customSystemPrompt,
  appendSystemPrompt: appendSystemPrompt,
  planModeInstructions: planModeInstructions,
  appendSubagentSystemPrompt: appendSubagentSystemPrompt,
  toolAliases: toolAliases,
  excludeDynamicSections: excludeDynamicSections,
  userSpecifiedModel: userSpecifiedModel,
  fallbackModel: fallbackModel,
  jsonSchema: jsonSchema,
  getAppState: getAppState,
  setAppState: setAppState,
  abortController: abortController,
  replayUserMessages = !1,
  includePartialMessages = !1,
  forwardSubagentText = !1,
  requestDialog: requestDialog,
  onCommandLifecycle: onCommandLifecycle,
  sessionState: sessionState,
  agents = [],
  allowedAgentTypes: allowedAgentTypes,
  setSDKStatus: setSDKStatus,
  orphanedPermission: orphanedPermission,
  deferredToolUse: deferredToolUse
}) {
  let session = new iyc({
    cwd: cwd,
    tools: tools,
    refreshTools: refreshTools,
    refreshMcpClients: refreshMcpClients,
    commands: commands,
    mcpClients: mcpClients,
    agents: agents,
    allowedAgentTypes: allowedAgentTypes,
    canUseTool: canUseTool,
    getAppState: getAppState,
    setAppState: setAppState,
    initialMessages: mutableMessages,
    readFileCache: uge(getReadFileCache()),
    sessionEnvVars: sessionEnvVars,
    isolationLatch: isolationLatch,
    pendingNestedMemoryTriggers: pendingNestedMemoryTriggers,
    customSystemPrompt: customSystemPrompt,
    appendSystemPrompt: appendSystemPrompt,
    planModeInstructions: planModeInstructions,
    appendSubagentSystemPrompt: appendSubagentSystemPrompt,
    toolAliases: toolAliases,
    excludeDynamicSections: excludeDynamicSections,
    userSpecifiedModel: userSpecifiedModel,
    fallbackModel: fallbackModel,
    thinkingConfig: thinkingConfig,
    maxTurns: maxTurns,
    maxBudgetUsd: maxBudgetUsd,
    taskBudget: taskBudget,
    jsonSchema: jsonSchema,
    verbose: verbose,
    requestDialog: requestDialog,
    onCommandLifecycle: onCommandLifecycle,
    sessionState: sessionState,
    replayUserMessages: replayUserMessages,
    includePartialMessages: includePartialMessages,
    forwardSubagentText: forwardSubagentText,
    setSDKStatus: setSDKStatus,
    abortController: abortController,
    orphanedPermission: orphanedPermission,
    deferredToolUse: deferredToolUse,
    ...{}
  });
  try {
    yield* session.submitMessage(prompt, {
      uuid: promptUuid,
      isMeta: isMeta,
      shouldQuery: shouldQuery,
      stopHookActive: stopHookActive,
      fileAttachments: fileAttachments,
      origin: origin,
      clientPlatform: clientPlatform,
      verifiedSlackHumanTurn: verifiedSlackHumanTurn
    });
  } finally {
    setReadFileCache(session.getReadFileState());
  }
}
async function* $Ym(source, terminalRef) {
  terminalRef.value = yield* source;
}
var wS,
  syc = () => (GZn(), oo(c7l)),
  UYm;
var lyc = b(() => {
  pDt();
  lt();
  rb();
  S5t();
  xBo();
  Mm();
  Ud();
  V$();
  c5e();
  xDt();
  Jm();
  xye();
  kt();
  rb();
  kD();
  lWn();
  I$o();
  omt();
  ri();
  MO();
  Q8();
  lh();
  Ph();
  cgt();
  UW();
  Po();
  qe();
  pf();
  Ir();
  dn();
  WS();
  Pq();
  Gk();
  V6t();
  k2o();
  vY();
  vn();
  ef();
  po();
  Ro();
  eO();
  oh();
  Eg();
  IZn();
  Q$o();
  nj();
  KO();
  _a();
  mg();
  z9();
  W$();
  ugt();
  cZ();
  HB();
  $M();
  QT();
  p6e();
  VPe();
  iNo();
  e7t();
  Xm();
  Z6e();
  wS = require("crypto"), UYm = (NO(), oo(k4)).getCoordinatorUserContext;
});
export {iyc,ayc,$Ym,wS,syc,UYm,lyc};
