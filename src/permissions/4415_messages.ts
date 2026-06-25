// @ts-nocheck
import {Vce,wc,Mn,uil,HY,cil,po} from "../tools/5224_userPromptCount.ts";
import {saveCacheSafeParams as IWn,createCacheSafeParams as BW,ID} from "../artifact/4427_withDisallowedCommandTools.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {pWn} from "../config/4399_zSo.ts";
import {CDe,MSo} from "../../vendor/m4389.ts";
import {executeStopHooks as Oye} from "../../vendor/m5197.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {KR,NZ} from "../telemetry/2478_action.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {xr} from "../../vendor/m1461.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {oO} from "../agent/2193_kind.ts";
import {yS,WB} from "../../vendor/m4274.ts";
import {VA,RE} from "../session/2796_uuid.ts";
import {getMainThreadAgentType as JL,getSessionId as It,getTotalOutputTokens as Yy,lt} from "../session/0132_sent.ts";
import {eb,Pf} from "../agent/2591_level.ts";
import {f5t,xWn,vw} from "../../vendor/m5178.ts";
import {withTimeout as Oc} from "../telemetry/1488_withTimeout.ts";
import {Ed,dn} from "../config/0137_namespace.ts";
import {Za,nt} from "../../vendor/m127.ts";
import {kfa,v3e} from "./3315_enabled.ts";
import {Cbn,Jm} from "../config/2207_Jm.ts";
import {Osl,XSo} from "../telemetry/4408_minHours.ts";
import {Gl,ri} from "../tools/2235_userFacingName.ts";
import {Rp,MO} from "../tools/2710_allErrors.ts";
import {Jmt,p8e} from "../telemetry/4398_condition.ts";
import {vxe,e4n,vY} from "../../vendor/m4097.ts";
import {createAttachmentMessage as ti,GA} from "../agent/4451_tryGetPDFReference.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {getStopHookMessage as fbo,getTaskCompletedHookMessage as Uqt,getTeammateIdleHookMessage as hbo,Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {isTeammate as um,getAgentName as dg,getTeamName as up,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {gB,F$,oH} from "../agent/3332_id.ts";
import {executeTaskCompletedHooks as L5e,executeTeammateIdleHooks as h5t} from "../../vendor/m5198.ts";
import {b,oo} from "../../runtime.ts";
import {vu} from "../mcp/2200_mcpServerName.ts";
import {r5t,TWn} from "../tools/4404_isAllowedAutoMemWritePath.ts";
import {kWn,wWn} from "./4414_worktreeOwnershipFields.ts";
import {cOn,Leo} from "./3311_sinksFor.ts";
import {n9,UY} from "../config/4246_shouldToolsListOptInToBrief.ts";
import {parsePermissionRule as d$,fke} from "../../vendor/m2704.ts";
// @ts-nocheck
function iil(messages) {
  return messages.findLastIndex(message => message.type === "user" && !message.isMeta && !Vce(message));
}
async function* mbo(priorMessages, newMessages, systemMessages, systemPrompt, userContext, systemContext, toolUseContext, querySource, stickyBetas, classifierState, classifierState_2, endTurnReason) {
  let isToolTurn = endTurnReason === "tool",
    messages = [...priorMessages, ...newMessages, ...systemMessages];
  if (querySource.startsWith("repl_main_thread") || querySource === "sdk") IWn(BW({
    messages: messages,
    systemPrompt: systemPrompt,
    userContext: userContext,
    systemContext: systemContext,
    toolUseContext: toolUseContext,
    querySource: querySource,
    stickyBetas: classifierState
  }));
  if (isToolTurn) yield* pbo(classifierState_2, [...priorMessages, ...newMessages], newMessages, toolUseContext, querySource);else if (!Ws() && toolUseContext.sessionState) {
    let postTurnSummary = toolUseContext.getAppState().postTurnSummary,
      hasInterruptiveMessage = newMessages.some(message => pWn(message));
    if (postTurnSummary && !hasInterruptiveMessage) toolUseContext.sessionState.notifyMetadataChanged({
      post_turn_summary: postTurnSummary
    });else yield* pbo(classifierState_2, [...priorMessages, ...newMessages], newMessages, toolUseContext, querySource);
  }
  if (!toolUseContext.agentId) try {
    yield* CDe(toolUseContext);
  } catch {}
  let startTime = Date.now();
  try {
    let hookStream = Oye(Mr(toolUseContext).mode, toolUseContext.abortController.signal, undefined, stickyBetas, toolUseContext.agentId, toolUseContext, messages, toolUseContext.agentType),
      hookErrors = [];
    for await (let hookEvent of hookStream) {
      if (hookEvent.message) {
        if (yield hookEvent.message, hookEvent.message.type === "attachment") {
          let attachment = hookEvent.message.attachment;
          if ("hookEvent" in attachment && (attachment.hookEvent === "Stop" || attachment.hookEvent === "SubagentStop")) {
            if (attachment.type === "hook_non_blocking_error") hookErrors.push(attachment.stderr || `Exit code ${attachment.exitCode}`);else if (attachment.type === "hook_error_during_execution") hookErrors.push(attachment.content);
          }
        }
      }
      if (hookEvent.blockingError || hookEvent.preventContinuation) A(`[end-turn] Stop hook block discarded (turn ended by ${endTurnReason === "tool" ? "tool result" : endTurnReason === "mcp_meta" ? "MCP end-turn" : "loop tick"}, no model re-invoke): ${hookEvent.blockingError?.blockingError ?? hookEvent.stopReason ?? "preventContinuation"}`);
    }
    if (hookErrors.length > 0) yield {
      type: "notification",
      notification: {
        key: "stop-hook-error",
        text: `Stop hook error occurred \xB7 ${KR("app:toggleTranscript", "Global", "ctrl+o")} to see`,
        priority: "immediate"
      }
    };
  } catch (error) {
    W("tengu_stop_hook_error", {
      duration: Date.now() - startTime,
      queryChainId: xr(toolUseContext.queryTracking?.chainId),
      queryDepth: toolUseContext.queryTracking?.depth
    }), yield wc(`Stop hook failed: ${Ce(error)}`, "warning");
  }
}
async function* pbo(classifierState, allMessages, newMessages, toolUseContext, querySource) {
  let surfaces = m5t ? m5t.detectSurfaces() : null,
    sinks = surfaces ? m5t.sinksFor(surfaces) : null,
    classifierEngine = sinks ? m5t.engineFor(sinks) : null;
  if (!classifierState || !classifierEngine || oO(querySource) !== "main" || toolUseContext.agentId) return;
  if (classifierState.lastEmittedDetail = "", sinks.has("summary")) yield {
    type: "post_turn_summary",
    value: null
  };
  classifierState.onClassified = (classified, isPartial) => {
    if (isPartial || !sinks.has("summary")) return;
    if (classified.source === "no-text-turn" && classified.detail === "") return;
    let summary = m5t.classifiedToPostTurnSummary(classified);
    toolUseContext.setAppState(state => state.postTurnSummary?.status_category === summary.status_category && state.postTurnSummary.status_detail === summary.status_detail ? state : {
      ...state,
      postTurnSummary: summary
    }), toolUseContext.sessionState?.notifyMetadataChanged({
      post_turn_summary: summary
    }), yS()?.reportMetadata({
      post_turn_summary: summary
    }), VA({
      type: "system",
      subtype: "post_turn_summary",
      summarizes_uuid: newMessages.at(-1)?.uuid ?? "",
      ...summary
    });
  };
  let activeAgentType = JL(),
    activeAgent = activeAgentType ? toolUseContext.options.agentDefinitions.activeAgents.find(agent => agent.agentType === activeAgentType) : undefined,
    assistantMessages = allMessages.filter(message => message.type === "assistant"),
    latestAsk = dbo.findLatestRealUserAsk(allMessages);
  if (latestAsk) dbo.captureLatestAsk(classifierState, latestAsk);
  let classifierWrite = dbo.classifyAndPush(classifierState, eb(), activeAgent?.agentType ?? "bg", "", assistantMessages, f5t(toolUseContext.taskRegistry.all()), classifierEngine, surfaces).catch(error => {
    A(`[classifier] error: ${Ce(error)}`, {
      level: "error"
    });
  });
  if (Ws() || querySource === "sdk") await Oc(classifierWrite, 60000, "classifier write timed out").catch(() => {});
}
async function* ail(priorMessages, newMessages, systemPrompt, userContext, systemContext, toolUseContext, querySource, transcriptPath, stickyBetas, classifierState) {
  let startTime = Date.now(),
    queryPayload = {
      messages: [...priorMessages, ...newMessages],
      systemPrompt: systemPrompt,
      userContext: userContext,
      systemContext: systemContext,
      toolUseContext: toolUseContext,
      querySource: querySource,
      stickyBetas: stickyBetas
    };
  if (querySource.startsWith("repl_main_thread") || querySource === "sdk") IWn(BW(queryPayload));
  if (yield* pbo(classifierState, queryPayload.messages, newMessages, toolUseContext, querySource), !Ed()) {
    if (!Za(process.env.CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION)) kfa(queryPayload, classifierState?.lastResult);
    if (!toolUseContext.agentId && Cbn()) eVp.executeExtractMemories(queryPayload, toolUseContext.appendSystemMessage);
    if (!toolUseContext.agentId) Osl(queryPayload, toolUseContext.appendSystemMessage);
  }
  if (!toolUseContext.agentId) try {
    yield* CDe(toolUseContext);
  } catch {}
  let briefEnforceMessage = null;
  if ((querySource.startsWith("repl_main_thread") || querySource === "sdk") && oil.isBriefEnabled() && !nt(process.env.DISABLE_BRIEF_MODE_STOP_HOOK) && !toolUseContext.agentId && toolUseContext.options.tools.some(tool => Gl(tool, y8e.BRIEF_TOOL_NAME))) try {
    let lastUserIndex = iil(priorMessages),
      messagesSinceLastUser = priorMessages.slice(lastUserIndex + 1),
      usedBriefTool = messagesSinceLastUser.some(message => message.type === "assistant" && message.message.content.some(block => block.type === "tool_use" && (block.name === y8e.BRIEF_TOOL_NAME || block.name === y8e.LEGACY_BRIEF_TOOL_NAME))) || newMessages.some(message => message.message.content.some(block => block.type === "tool_use" && (block.name === y8e.BRIEF_TOOL_NAME || block.name === y8e.LEGACY_BRIEF_TOOL_NAME))),
      alreadyEnforced = !usedBriefTool && messagesSinceLastUser.some(message => message.type === "user" && message.isMeta && typeof message.message.content === "string" && message.message.content.includes(y8e.BRIEF_ENFORCE_SENTINEL));
    if (!usedBriefTool && !alreadyEnforced) briefEnforceMessage = Mn({
      content: `${y8e.BRIEF_ENFORCE_SENTINEL} ${oil.getBriefEnforceText()}`,
      isMeta: true
    }), yield briefEnforceMessage;
  } catch (error) {
    A(`Brief mode enforcement failed: ${Ce(error)}`, {
      level: "error"
    });
  }
  let extraInjectedMessage = null,
    structuredOutputMessage = null;
  if (toolUseContext.options.requiresStructuredOutput && oO(querySource) !== "auxiliary") try {
    let lastUserIndex = iil(priorMessages),
      messagesSinceLastUser = priorMessages.slice(lastUserIndex + 1),
      usedStructuredOutputTool = uil([...messagesSinceLastUser, ...newMessages], Rp),
      alreadyEnforced = !usedStructuredOutputTool && messagesSinceLastUser.some(message => message.type === "user" && message.isMeta && typeof message.message.content === "string" && message.message.content.includes(sil));
    if (!usedStructuredOutputTool && !alreadyEnforced) structuredOutputMessage = Mn({
      content: `${sil} You MUST call the ${Rp} tool to complete this request. Call this tool now.`,
      isMeta: true
    }), yield structuredOutputMessage;
  } catch (error) {
    A(`StructuredOutput enforcement failed: ${Ce(error)}`, {
      level: "error"
    });
  }
  let hookHandlerFailed = false,
    deferredGoalHook;
  try {
    let injectedMessages = [];
    if (briefEnforceMessage) injectedMessages.push(briefEnforceMessage);
    if (extraInjectedMessage) injectedMessages.push(extraInjectedMessage);
    if (structuredOutputMessage) injectedMessages.push(structuredOutputMessage);
    let appState = toolUseContext.getAppState(),
      mode = Mr(toolUseContext).mode,
      activeGoal = appState.activeGoal;
    if (activeGoal) {
      let tasks = toolUseContext.taskRegistry.all();
      if (f5t(tasks) || xWn(tasks)) {
        if (deferredGoalHook = Jmt(appState, It()).find(hook => hook.prompt === activeGoal.condition), deferredGoalHook) toolUseContext.sessionHooksRegistry.remove(It(), "Stop", deferredGoalHook), A("[goal] evaluation deferred \u2014 background work still running");
      }
    }
    let resolveGoalHook = firedHook => {
        if (!firedHook) return;
        return (vxe(appState, It(), "Stop").get("Stop") ?? []).flatMap(entry => entry.hooks).some(registeredHook => e4n(registeredHook, firedHook)) ? firedHook : undefined;
      },
      hookStream = Oye(mode, toolUseContext.abortController.signal, undefined, transcriptPath, toolUseContext.agentId, toolUseContext, queryPayload.messages, toolUseContext.agentType),
      lastToolUseID = "",
      progressCount = 0,
      preventContinuation = false,
      preventContinuationReason = "",
      hadHookOutput = false,
      hookErrors = [],
      additionalContexts = [],
      commandInfos = [];
    for await (let hookEvent of hookStream) {
      if (hookEvent.message) {
        if (yield hookEvent.message, hookEvent.message.type === "progress" && hookEvent.message.toolUseID) {
          lastToolUseID = hookEvent.message.toolUseID, progressCount++;
          let data = hookEvent.message.data;
          if (data.command) commandInfos.push({
            command: data.command,
            promptText: data.promptText
          });
        }
        if (hookEvent.message.type === "attachment") {
          let attachment = hookEvent.message.attachment;
          if ("hookEvent" in attachment && (attachment.hookEvent === "Stop" || attachment.hookEvent === "SubagentStop")) {
            if (attachment.type === "hook_non_blocking_error") hookErrors.push(attachment.stderr || `Exit code ${attachment.exitCode}`), hadHookOutput = true;else if (attachment.type === "hook_error_during_execution") hookErrors.push(attachment.content), hadHookOutput = true;else if (attachment.type === "hook_success") {
              if (attachment.stdout && attachment.stdout.trim() || attachment.stderr && attachment.stderr.trim()) hadHookOutput = true;
              let firedGoalHook = resolveGoalHook(hookEvent.hook);
              if (attachment.hookEvent === "Stop" && firedGoalHook) {
                toolUseContext.sessionHooksRegistry.remove(It(), "Stop", firedGoalHook);
                let currentGoal = toolUseContext.getAppState().activeGoal;
                if (currentGoal?.condition === firedGoalHook.prompt) {
                  let iterations = currentGoal.iterations + 1,
                    durationMs = Date.now() - currentGoal.setAt,
                    tokens = Yy() - currentGoal.tokensAtStart;
                  if (yield {
                    type: "active_goal",
                    value: undefined
                  }, hookEvent.impossible) yield ti({
                    type: "goal_status",
                    met: false,
                    failed: true,
                    condition: firedGoalHook.prompt,
                    reason: hookEvent.stopReason,
                    iterations: iterations,
                    durationMs: durationMs,
                    tokens: tokens
                  }), W("tengu_goal_failed", {
                    promptLength: firedGoalHook.prompt.length,
                    reasonLength: hookEvent.stopReason?.length ?? 0,
                    iterations: iterations,
                    durationMs: durationMs,
                    tokens: tokens
                  }), xe("goal_met", "impossible");else yield ti({
                    type: "goal_status",
                    met: true,
                    condition: firedGoalHook.prompt,
                    reason: hookEvent.stopReason,
                    iterations: iterations,
                    durationMs: durationMs,
                    tokens: tokens
                  }), W("tengu_goal_achieved", {
                    promptLength: firedGoalHook.prompt.length,
                    iterations: iterations,
                    durationMs: durationMs,
                    tokens: tokens
                  }), He("goal_met"), toolUseContext.sessionState?.notifyMetadataChanged({
                    goal: {
                      condition: firedGoalHook.prompt,
                      set_at: currentGoal.setAt,
                      iterations: iterations,
                      last_reason: null,
                      met: true
                    }
                  });
                }
              }
            }
            if ("durationMs" in attachment && "command" in attachment) {
              let pendingCommand = commandInfos.find(info => info.command === attachment.command && info.durationMs === undefined);
              if (pendingCommand) pendingCommand.durationMs = attachment.durationMs;
            }
          }
        }
      }
      if (hookEvent.blockingError) {
        let blockingMessage = Mn({
          content: fbo(hookEvent.blockingError),
          isMeta: true
        });
        injectedMessages.push(blockingMessage), yield blockingMessage, hadHookOutput = true;
        let firedGoalHook = resolveGoalHook(hookEvent.hook),
          currentGoal = toolUseContext.getAppState().activeGoal;
        if (firedGoalHook && currentGoal?.condition === firedGoalHook.prompt) yield {
          type: "active_goal",
          value: {
            ...currentGoal,
            iterations: currentGoal.iterations + 1,
            lastReason: hookEvent.stopReason
          }
        }, yield ti({
          type: "goal_status",
          met: false,
          condition: firedGoalHook.prompt,
          reason: hookEvent.stopReason
        });else hookErrors.push(hookEvent.blockingError.blockingError);
      }
      if (hookEvent.additionalContexts && hookEvent.additionalContexts.length > 0) {
        let stopEventName = toolUseContext.agentId ? "SubagentStop" : "Stop",
          additionalContextMessage = ti({
            type: "hook_additional_context",
            content: hookEvent.additionalContexts,
            hookName: stopEventName,
            toolUseID: lastToolUseID,
            hookEvent: stopEventName
          });
        injectedMessages.push(additionalContextMessage), yield additionalContextMessage, hadHookOutput = true, additionalContexts.push(...hookEvent.additionalContexts);
      }
      if (hookEvent.preventContinuation) preventContinuation = true, preventContinuationReason = hookEvent.stopReason || "Stop hook prevented continuation", yield ti({
        type: "hook_stopped_continuation",
        message: preventContinuationReason,
        hookName: "Stop",
        toolUseID: lastToolUseID,
        hookEvent: "Stop"
      });
      if (toolUseContext.abortController.signal.aborted) return W("tengu_pre_stop_hooks_cancelled", {
        queryChainId: xr(toolUseContext.queryTracking?.chainId),
        queryDepth: toolUseContext.queryTracking?.depth
      }), yield HY({
        toolUse: false
      }), {
        blockingErrors: [],
        preventContinuation: true
      };
    }
    if (progressCount > 0) {
      if (yield cil(progressCount, commandInfos, hookErrors, preventContinuation, preventContinuationReason, hadHookOutput, "suggestion", lastToolUseID, undefined, undefined, additionalContexts), hookErrors.length > 0) {
        let toggleTranscriptKey = KR("app:toggleTranscript", "Global", "ctrl+o");
        if (!transcriptPath) yield {
          type: "notification",
          notification: {
            key: "stop-hook-error",
            text: `Stop hook error occurred \xB7 ${toggleTranscriptKey} to see`,
            priority: "immediate"
          }
        };
      }
    }
    if (preventContinuation) return {
      blockingErrors: [],
      preventContinuation: true
    };
    if (injectedMessages.length > 0) return {
      blockingErrors: injectedMessages,
      preventContinuation: false
    };
    if (um()) {
      let teammateId = dg() ?? "",
        teammateName = up() ?? "",
        teammateBlockingMessages = [],
        teammatePreventContinuation = false,
        teammatePreventReason,
        teammateToolUseID = "",
        worktreeId = gB(),
        inProgressTasks = (await F$(worktreeId)).filter(task => task.status === "in_progress" && task.owner === teammateId);
      for (let task of inProgressTasks) {
        let taskCompletedStream = L5e(task.id, task.subject, task.description, teammateId, teammateName, mode, toolUseContext.abortController.signal, undefined, toolUseContext);
        for await (let hookEvent of taskCompletedStream) {
          if (hookEvent.message) {
            if (hookEvent.message.type === "progress" && hookEvent.message.toolUseID) teammateToolUseID = hookEvent.message.toolUseID;
            yield hookEvent.message;
          }
          if (hookEvent.blockingError) {
            let blockingMessage = Mn({
              content: Uqt(hookEvent.blockingError),
              isMeta: true
            });
            teammateBlockingMessages.push(blockingMessage), yield blockingMessage;
          }
          if (hookEvent.preventContinuation) teammatePreventContinuation = true, teammatePreventReason = hookEvent.stopReason || "TaskCompleted hook prevented continuation", yield ti({
            type: "hook_stopped_continuation",
            message: teammatePreventReason,
            hookName: "TaskCompleted",
            toolUseID: teammateToolUseID,
            hookEvent: "TaskCompleted"
          });
          if (toolUseContext.abortController.signal.aborted) return {
            blockingErrors: [],
            preventContinuation: true
          };
        }
      }
      let teammateIdleStream = h5t(teammateId, teammateName, mode, toolUseContext.abortController.signal, undefined, toolUseContext);
      for await (let hookEvent of teammateIdleStream) {
        if (hookEvent.message) {
          if (hookEvent.message.type === "progress" && hookEvent.message.toolUseID) teammateToolUseID = hookEvent.message.toolUseID;
          yield hookEvent.message;
        }
        if (hookEvent.blockingError) {
          let blockingMessage = Mn({
            content: hbo(hookEvent.blockingError),
            isMeta: true
          });
          teammateBlockingMessages.push(blockingMessage), yield blockingMessage;
        }
        if (hookEvent.preventContinuation) teammatePreventContinuation = true, teammatePreventReason = hookEvent.stopReason || "TeammateIdle hook prevented continuation", yield ti({
          type: "hook_stopped_continuation",
          message: teammatePreventReason,
          hookName: "TeammateIdle",
          toolUseID: teammateToolUseID,
          hookEvent: "TeammateIdle"
        });
        if (toolUseContext.abortController.signal.aborted) return {
          blockingErrors: [],
          preventContinuation: true
        };
      }
      if (teammatePreventContinuation) return {
        blockingErrors: [],
        preventContinuation: true
      };
      if (teammateBlockingMessages.length > 0) return {
        blockingErrors: teammateBlockingMessages,
        preventContinuation: false
      };
    }
    return {
      blockingErrors: [],
      preventContinuation: false
    };
  } catch (error) {
    hookHandlerFailed = true;
    let durationMs = Date.now() - startTime;
    W("tengu_stop_hook_error", {
      duration: durationMs,
      queryChainId: xr(toolUseContext.queryTracking?.chainId),
      queryDepth: toolUseContext.queryTracking?.depth
    }), yield wc(`Stop hook failed: ${Ce(error)}`, "warning");
    let injectedMessages = [];
    if (briefEnforceMessage) injectedMessages.push(briefEnforceMessage);
    if (extraInjectedMessage) injectedMessages.push(extraInjectedMessage);
    if (structuredOutputMessage) injectedMessages.push(structuredOutputMessage);
    return {
      blockingErrors: injectedMessages,
      preventContinuation: false
    };
  } finally {
    if (deferredGoalHook) toolUseContext.sessionHooksRegistry.add(It(), "Stop", "", deferredGoalHook);
    if (hookHandlerFailed) xe("hook_stop_handler", "hook_stop_handler_failed");else He("hook_stop_handler");
  }
}
var eVp,
  dbo,
  m5t,
  oil,
  y8e,
  sil = "[structured-output-enforce]";
var lil = b(() => {
  lt();
  p8e();
  NZ();
  Jm();
  mn();
  kt();
  vu();
  vw();
  ri();
  MO();
  GA();
  MSo();
  qe();
  Ct();
  vY();
  Wd();
  po();
  RE();
  oH();
  Op();
  lt();
  WB();
  Pf();
  XSo();
  v3e();
  vd();
  xl();
  dn();
  ID();
  eVp = (r5t(), oo(TWn)), dbo = (kWn(), oo(wWn)), m5t = (cOn(), oo(Leo)), oil = (n9(), oo(UY)), y8e = (d$(), oo(fke));
});

export {iil,mbo,pbo,ail,eVp,dbo,m5t,oil,y8e,sil,lil};
