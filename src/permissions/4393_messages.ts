// @ts-nocheck
import {saveCacheSafeParams as Sqn,createCacheSafeParams as iW,gP as hP} from "../artifact/4405_withDisallowedCommandTools.ts";
import {N6e as h6e,GAo as Nfo} from "../../vendor/m4367.ts";
import {executeStopHooks as Xge} from "../../vendor/m5164.ts";
import {Fr as Lr,Ql as Xl} from "../../vendor/m4405.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {qw as Bw,UZ as HZ} from "../telemetry/2468_action.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Br} from "../../vendor/m1456.ts";
import {nu as Zc,Ln,qte as Dte,bZa as JXa,lo} from "../tools/5190_userPromptCount.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {H1 as Z2} from "../agent/2188_kind.ts";
import {ES as AS,EU as mU} from "../../vendor/m4256.ts";
import {Fv as Ov,bC as gC} from "../session/2784_uuid.ts";
import {getMainThreadAgentType as vM,getSessionId as kt,getTotalOutputTokens as wS,lt as ct} from "../session/0131_sent.ts";
import {AC as dC,mg as cg} from "../agent/2580_level.ts";
import {q4t as y4t,d6n as bqn,Ax as dx} from "../../vendor/m5146.ts";
import {_i as wi,hp as gp} from "../session/1460_promise.ts";
import {withTimeout as lu} from "../telemetry/1483_withTimeout.ts";
import {dp as kp,sn as an} from "../config/0047_namespace.ts";
import {_l as hl,st as rt} from "../../vendor/m5.ts";
import {Saa as iia,h9e as G$e} from "./3299_enabled.ts";
import {q_n as t_n,tA as iA} from "../config/2201_tA.ts";
import {XQa as wXa,iho as eAo} from "../telemetry/4386_minHours.ts";
import {Lc as Vc,Ri} from "../tools/2227_userFacingName.ts";
import {Jdt as wdt,F6e as _6e} from "../telemetry/4376_condition.ts";
import {gIe as ZHe,f2n as xUn,x9 as f9} from "../../vendor/m4033.ts";
import {createAttachmentMessage as fi,Bv as Pv} from "../agent/4429_tryGetPDFReference.ts";
import {Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {getStopHookMessage as gAo,getTaskCompletedHookMessage as e3t,getTeammateIdleHookMessage as _Ao,yp as Tp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {isTeammate as Tf,getAgentName as tg,getTeamName as Nm,Am as Sf} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {KF as UF,p9 as X$,Nk as Ok} from "../agent/3316_id.ts";
import {executeTaskCompletedHooks as qqe,executeTeammateIdleHooks as T4t} from "../../vendor/m5165.ts";
import {b,ro as Pr} from "../../runtime.ts";
import {$u as od} from "../mcp/2194_mcpServerName.ts";
import {I4t as l4t,Zqn as pqn} from "../tools/4382_isAllowedAutoMemWritePath.ts";
import {l6n as fAo,a6n as mAo} from "./4392_worktreeOwnershipFields.ts";
import {_0n as PIn,QYr as tYr} from "./3295_sinksFor.ts";
import {L9 as T9,nJ as qY} from "../config/4228_shouldToolsListOptInToBrief.ts";
import {j$ as vF,HRe as IAe} from "../../vendor/m2692.ts";
// @ts-nocheck
async function* ylK(priorMessages, newMessages, systemPrompt, userContext, systemContext, toolUseContext, querySource, transcriptPath, stickyBetas, c) {
  let u = [...priorMessages, ...newMessages, ...systemPrompt];
  if (transcriptPath.startsWith("repl_main_thread") || transcriptPath === "sdk") Sqn(iW({
    messages: u,
    systemPrompt: userContext,
    userContext: systemContext,
    systemContext: toolUseContext,
    toolUseContext: querySource,
    querySource: transcriptPath,
    stickyBetas: c
  }));
  if (!querySource.agentId) try {
    yield* h6e(querySource);
  } catch {}
  let d = Date.now();
  try {
    let p = Xge(Lr(querySource).mode, querySource.abortController.signal, undefined, stickyBetas, querySource.agentId, querySource, u, querySource.agentType),
      m = [];
    for await (let f of p) {
      if (f.message) {
        if (yield f.message, f.message.type === "attachment") {
          let A = f.message.attachment;
          if ("hookEvent" in A && (A.hookEvent === "Stop" || A.hookEvent === "SubagentStop")) {
            if (A.type === "hook_non_blocking_error") m.push(A.stderr || `Exit code ${A.exitCode}`);else if (A.type === "hook_error_during_execution") m.push(A.content);
          }
        }
      }
      if (f.blockingError || f.preventContinuation) v(`[loop-tick] Stop hook block discarded (turn is yielding to a cron): ${f.blockingError?.blockingError ?? f.stopReason ?? "preventContinuation"}`);
    }
    if (m.length > 0) yield {
      type: "notification",
      notification: {
        key: "stop-hook-error",
        text: `Stop hook error occurred \xB7 ${Bw("app:toggleTranscript", "Global", "ctrl+o")} to see`,
        priority: "immediate"
      }
    };
  } catch (p) {
    j("tengu_stop_hook_error", {
      duration: Date.now() - d,
      queryChainId: Br(querySource.queryTracking?.chainId),
      queryDepth: querySource.queryTracking?.depth
    }), yield Zc(`Stop hook failed: ${Se(p)}`, "warning");
  }
}
async function* vlK(priorMessages, newMessages, systemPrompt, userContext, systemContext, toolUseContext, querySource, transcriptPath, stickyBetas, classifierState) {
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
  if (querySource.startsWith("repl_main_thread") || querySource === "sdk") Sqn(iW(queryPayload));
  let surfaces = qu_ ? qu_.detectSurfaces() : null,
    sinks = surfaces ? qu_.sinksFor(surfaces) : null,
    classifierEngine = sinks ? qu_.engineFor(sinks) : null;
  if (classifierState && classifierEngine && Z2(querySource) === "main" && !toolUseContext.agentId) {
    if (classifierState.lastEmittedDetail = "", sinks.has("summary")) yield {
      type: "post_turn_summary",
      value: null
    };
    classifierState.onClassified = (classified, isPartial) => {
      if (isPartial || !sinks.has("summary")) return;
      let summary = qu_.classifiedToPostTurnSummary(classified);
      toolUseContext.setAppState(state => state.postTurnSummary?.status_category === summary.status_category && state.postTurnSummary.status_detail === summary.status_detail ? state : {
        ...state,
        postTurnSummary: summary
      }), toolUseContext.sessionState?.notifyMetadataChanged({
        post_turn_summary: summary
      }), AS()?.reportMetadata({
        post_turn_summary: summary
      }), Ov({
        type: "system",
        subtype: "post_turn_summary",
        summarizes_uuid: newMessages.at(-1)?.uuid ?? "",
        ...summary
      });
    };
    let activeAgentType = vM(),
      activeAgent = activeAgentType ? toolUseContext.options.agentDefinitions.activeAgents.find(agent => agent.agentType === activeAgentType) : undefined,
      assistantMessages = queryPayload.messages.filter(message => message.type === "assistant"),
      latestAsk = O3q.findLatestRealUserAsk(queryPayload.messages);
    if (latestAsk) O3q.captureLatestAsk(classifierState, latestAsk);
    let classifierWrite = O3q.classifyAndPush(classifierState, dC(), activeAgent?.agentType ?? "bg", "", assistantMessages, y4t(toolUseContext.taskRegistry.all()), classifierEngine, surfaces).catch(error => {
      v(`[classifier] error: ${Se(error)}`, {
        level: "error"
      });
    });
    if (wi() || querySource === "sdk") await lu(classifierWrite, 60000, "classifier write timed out").catch(() => {});
  }
  if (!kp()) {
    if (!hl(process.env.CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION)) iia(queryPayload, classifierState?.lastResult);
    if (!toolUseContext.agentId && t_n()) INO.executeExtractMemories(queryPayload, toolUseContext.appendSystemMessage);
    if (!toolUseContext.agentId) wXa(queryPayload, toolUseContext.appendSystemMessage);
  }
  if (!toolUseContext.agentId) try {
    yield* h6e(toolUseContext);
  } catch {}
  let briefEnforceMessage = null;
  if ((querySource.startsWith("repl_main_thread") || querySource === "sdk") && VlK.isBriefEnabled() && !rt(process.env.DISABLE_BRIEF_MODE_STOP_HOOK) && !toolUseContext.agentId && toolUseContext.options.tools.some(tool => Vc(tool, HBH.BRIEF_TOOL_NAME))) try {
    let lastUserIndex = priorMessages.findLastIndex(message => message.type === "user" && !message.isMeta && !message.toolUseResult),
      messagesSinceLastUser = priorMessages.slice(lastUserIndex + 1),
      usedBriefTool = messagesSinceLastUser.some(message => message.type === "assistant" && message.message.content.some(block => block.type === "tool_use" && (block.name === HBH.BRIEF_TOOL_NAME || block.name === HBH.LEGACY_BRIEF_TOOL_NAME))) || newMessages.some(message => message.message.content.some(block => block.type === "tool_use" && (block.name === HBH.BRIEF_TOOL_NAME || block.name === HBH.LEGACY_BRIEF_TOOL_NAME))),
      alreadyEnforced = !usedBriefTool && messagesSinceLastUser.some(message => message.type === "user" && message.isMeta && typeof message.message.content === "string" && message.message.content.includes(HBH.BRIEF_ENFORCE_SENTINEL));
    if (!usedBriefTool && !alreadyEnforced) briefEnforceMessage = Ln({
      content: `${HBH.BRIEF_ENFORCE_SENTINEL} ${VlK.getBriefEnforceText()}`,
      isMeta: true
    }), yield briefEnforceMessage;
  } catch (error) {
    v(`Brief mode enforcement failed: ${Se(error)}`, {
      level: "error"
    });
  }
  let extraInjectedMessage = null,
    hookHandlerFailed = false,
    deferredGoalHook;
  try {
    let injectedMessages = [];
    if (briefEnforceMessage) injectedMessages.push(briefEnforceMessage);
    if (extraInjectedMessage) injectedMessages.push(extraInjectedMessage);
    let appState = toolUseContext.getAppState(),
      mode = Lr(toolUseContext).mode,
      activeGoal = appState.activeGoal;
    if (activeGoal) {
      let tasks = toolUseContext.taskRegistry.all();
      if (y4t(tasks) || bqn(tasks)) {
        if (deferredGoalHook = wdt(appState, kt()).find(hook => hook.prompt === activeGoal.condition), deferredGoalHook) toolUseContext.sessionHooksRegistry.remove(kt(), "Stop", deferredGoalHook), v("[goal] evaluation deferred \u2014 background work still running");
      }
    }
    let resolveGoalHook = firedHook => {
        if (!firedHook) return;
        return (ZHe(appState, kt(), "Stop").get("Stop") ?? []).flatMap(entry => entry.hooks).some(registeredHook => xUn(registeredHook, firedHook)) ? firedHook : undefined;
      },
      hookStream = Xge(mode, toolUseContext.abortController.signal, undefined, transcriptPath, toolUseContext.agentId, toolUseContext, queryPayload.messages, toolUseContext.agentType),
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
                toolUseContext.sessionHooksRegistry.remove(kt(), "Stop", firedGoalHook);
                let currentGoal = toolUseContext.getAppState().activeGoal;
                if (currentGoal?.condition === firedGoalHook.prompt) {
                  let iterations = currentGoal.iterations + 1,
                    durationMs = Date.now() - currentGoal.setAt,
                    tokens = wS() - currentGoal.tokensAtStart;
                  if (yield {
                    type: "active_goal",
                    value: undefined
                  }, hookEvent.impossible) yield fi({
                    type: "goal_status",
                    met: false,
                    failed: true,
                    condition: firedGoalHook.prompt,
                    reason: hookEvent.stopReason,
                    iterations: iterations,
                    durationMs: durationMs,
                    tokens: tokens
                  }), j("tengu_goal_failed", {
                    promptLength: firedGoalHook.prompt.length,
                    reasonLength: hookEvent.stopReason?.length ?? 0,
                    iterations: iterations,
                    durationMs: durationMs,
                    tokens: tokens
                  }), Pe("goal_met", "impossible");else yield fi({
                    type: "goal_status",
                    met: true,
                    condition: firedGoalHook.prompt,
                    reason: hookEvent.stopReason,
                    iterations: iterations,
                    durationMs: durationMs,
                    tokens: tokens
                  }), j("tengu_goal_achieved", {
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
        let blockingMessage = Ln({
          content: gAo(hookEvent.blockingError),
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
        }, yield fi({
          type: "goal_status",
          met: false,
          condition: firedGoalHook.prompt,
          reason: hookEvent.stopReason
        });else hookErrors.push(hookEvent.blockingError.blockingError);
      }
      if (hookEvent.additionalContexts && hookEvent.additionalContexts.length > 0) {
        let stopEventName = toolUseContext.agentId ? "SubagentStop" : "Stop",
          additionalContextMessage = fi({
            type: "hook_additional_context",
            content: hookEvent.additionalContexts,
            hookName: stopEventName,
            toolUseID: lastToolUseID,
            hookEvent: stopEventName
          });
        injectedMessages.push(additionalContextMessage), yield additionalContextMessage, hadHookOutput = true, additionalContexts.push(...hookEvent.additionalContexts);
      }
      if (hookEvent.preventContinuation) preventContinuation = true, preventContinuationReason = hookEvent.stopReason || "Stop hook prevented continuation", yield fi({
        type: "hook_stopped_continuation",
        message: preventContinuationReason,
        hookName: "Stop",
        toolUseID: lastToolUseID,
        hookEvent: "Stop"
      });
      if (toolUseContext.abortController.signal.aborted) return j("tengu_pre_stop_hooks_cancelled", {
        queryChainId: Br(toolUseContext.queryTracking?.chainId),
        queryDepth: toolUseContext.queryTracking?.depth
      }), yield Dte({
        toolUse: false
      }), {
        blockingErrors: [],
        preventContinuation: true
      };
    }
    if (progressCount > 0) {
      if (yield JXa(progressCount, commandInfos, hookErrors, preventContinuation, preventContinuationReason, hadHookOutput, "suggestion", lastToolUseID, undefined, undefined, additionalContexts), hookErrors.length > 0) {
        let toggleTranscriptKey = Bw("app:toggleTranscript", "Global", "ctrl+o");
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
    if (Tf()) {
      let teammateId = tg() ?? "",
        teammateName = Nm() ?? "",
        teammateBlockingMessages = [],
        teammatePreventContinuation = false,
        teammatePreventReason,
        teammateToolUseID = "",
        worktreeId = UF(),
        inProgressTasks = (await X$(worktreeId)).filter(task => task.status === "in_progress" && task.owner === teammateId);
      for (let task of inProgressTasks) {
        let taskCompletedStream = qqe(task.id, task.subject, task.description, teammateId, teammateName, mode, toolUseContext.abortController.signal, undefined, toolUseContext);
        for await (let hookEvent of taskCompletedStream) {
          if (hookEvent.message) {
            if (hookEvent.message.type === "progress" && hookEvent.message.toolUseID) teammateToolUseID = hookEvent.message.toolUseID;
            yield hookEvent.message;
          }
          if (hookEvent.blockingError) {
            let blockingMessage = Ln({
              content: e3t(hookEvent.blockingError),
              isMeta: true
            });
            teammateBlockingMessages.push(blockingMessage), yield blockingMessage;
          }
          if (hookEvent.preventContinuation) teammatePreventContinuation = true, teammatePreventReason = hookEvent.stopReason || "TaskCompleted hook prevented continuation", yield fi({
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
      let teammateIdleStream = T4t(teammateId, teammateName, mode, toolUseContext.abortController.signal, undefined, toolUseContext);
      for await (let hookEvent of teammateIdleStream) {
        if (hookEvent.message) {
          if (hookEvent.message.type === "progress" && hookEvent.message.toolUseID) teammateToolUseID = hookEvent.message.toolUseID;
          yield hookEvent.message;
        }
        if (hookEvent.blockingError) {
          let blockingMessage = Ln({
            content: _Ao(hookEvent.blockingError),
            isMeta: true
          });
          teammateBlockingMessages.push(blockingMessage), yield blockingMessage;
        }
        if (hookEvent.preventContinuation) teammatePreventContinuation = true, teammatePreventReason = hookEvent.stopReason || "TeammateIdle hook prevented continuation", yield fi({
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
    j("tengu_stop_hook_error", {
      duration: durationMs,
      queryChainId: Br(toolUseContext.queryTracking?.chainId),
      queryDepth: toolUseContext.queryTracking?.depth
    }), yield Zc(`Stop hook failed: ${Se(error)}`, "warning");
    let injectedMessages = [];
    if (briefEnforceMessage) injectedMessages.push(briefEnforceMessage);
    if (extraInjectedMessage) injectedMessages.push(extraInjectedMessage);
    return {
      blockingErrors: injectedMessages,
      preventContinuation: false
    };
  } finally {
    if (deferredGoalHook) toolUseContext.sessionHooksRegistry.add(kt(), "Stop", "", deferredGoalHook);
    if (hookHandlerFailed) Pe("hook_stop_handler", "hook_stop_handler_failed");else He("hook_stop_handler");
  }
}
var INO, O3q, qu_, VlK, HBH;
var ElK = b(() => {
  ct();
  _6e();
  HZ();
  iA();
  cn();
  Ct();
  od();
  dx();
  Ri();
  Pv();
  Nfo();
  je();
  St();
  f9();
  Tp();
  lo();
  gC();
  Ok();
  Sf();
  ct();
  mU();
  cg();
  eAo();
  G$e();
  gp();
  Xl();
  an();
  hP();
  INO = (l4t(), Pr(pqn)), O3q = (fAo(), Pr(mAo)), qu_ = (PIn(), Pr(tYr)), VlK = (T9(), Pr(qY)), HBH = (vF(), Pr(IAe));
});

export {ylK as Tho,vlK as TZa,INO as _9p,O3q as yho,qu_ as $4t,VlK as yZa,HBH as G6e,ElK as SZa};
