// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {hasPermissionsToUseToolWithSink as Ypt,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {MY,Sqn,Mn,Hl,po} from "../tools/5224_userPromptCount.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {Tqn,Y4t} from "../tools/4177_resolve.ts";
import {E$n,puo} from "../../vendor/m3902.ts";
import {d6n,p6n} from "./4216_ctx.ts";
import {Qqn,Zqn,Npt} from "../core/4210_id.ts";
import {g6n,Gpt,K7a,Vpt} from "../../vendor/m4218.ts";
import {yW,Sw} from "../../vendor/m2789.ts";
import {readMailbox as aye,isPermissionResponse as Gqe,markSingleMessageAsRead as x9t,writeToMailbox as Bf,createIdleNotification as P9t,isShutdownRequest as Dut,isStructuredProtocolMessage as IB,isPlanApprovalResponse as Put,planApprovalResumeText as $9t,isModeSetRequest as Out,markMessagesAsRead as qqe,formatTeammateMessage as Hut,getLastPeerDmSummary as W9t,Pw} from "./3902_writeToMailbox.ts";
import {Dd,wB} from "../config/3893_wB.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {F$,iga,m_e,oH} from "../agent/3332_id.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {zn,os} from "../api/0465_getOauthConfig.ts";
import {R2a,mdo,fdo} from "../../vendor/m3953.ts";
import {setMemberMode as Aut,removeMemberByAgentId as v9t,sL} from "../../vendor/m3897.ts";
import {Qae,Zae} from "../../vendor/m3309.ts";
import {k3,Q5,Ph} from "../agent/1459_agentType.ts";
import {ux,CG} from "../agent/5206_len.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {o_,QR,Kz,wD} from "../tools/2710_allErrors.ts";
import {j0} from "../session/2702_resolveLoopFileFire.ts";
import {T2n,b0e,XMa} from "../../vendor/m3842.ts";
import {JNt,HI} from "../telemetry/3173_error.ts";
import {Ere} from "../session/0132_sent.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {CC,g1} from "../core/2741_input_tokens.ts";
import {bytesPerTokenForModel as aE,Ro} from "./1458_swapShrinksContextWindow.ts";
import {$Mt} from "../config/2739_repl.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {uge,Gk} from "../../vendor/m2727.ts";
import {qke} from "../../vendor/m2765.ts";
import {jpt,Iye,zpt,j$,dee} from "./4431_prompt.ts";
import {vc} from "../api/3886_level.ts";
import {D9n,O9n,P9n,I3t,hS} from "../agent/4362_toolUseCount.ts";
import {runWithTeammateContext as Dmn,b2} from "../../vendor/m1462.ts";
import {Q$,fye} from "./4104_clients.ts";
import {bxe} from "../tui/4086_classifierApprovals.ts";
import {cce,E3t} from "../../vendor/m3971.ts";
import {Ice,HB} from "../agent/4331_register.ts";
import {Zco,F0e} from "../../vendor/m3899.ts";
import {p_,wE} from "../../vendor/m5177.ts";
import {hf,RE} from "../session/2796_uuid.ts";
import {X9e,Zst} from "../config/3197_agentId.ts";
import {Pt,He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {f1} from "../../vendor/m4432.ts";
import {jO} from "../tools/4385_stripAllEnvVars.ts";
// @ts-nocheck
function setActivePermissionContextUpdater(updater) {
  activePermissionContextUpdater = updater;
}
function getActivePermissionContextUpdater() {
  return activePermissionContextUpdater;
}
function clearActivePermissionContextUpdater() {
  activePermissionContextUpdater = null;
}
var activePermissionContextUpdater = null;
var teammatePromptModule = {};
ft(teammatePromptModule, {
  TEAMMATE_SYSTEM_PROMPT_ADDENDUM: () => TEAMMATE_SYSTEM_PROMPT_ADDENDUM
});
var TEAMMATE_SYSTEM_PROMPT_ADDENDUM = `
# Agent Teammate Communication

IMPORTANT: You are running as an agent in a team. To communicate with anyone on your team, use the SendMessage tool with \`to: "<name>"\` to send messages to specific teammates.

Just writing a response in text is not visible to others on your team - you MUST use the SendMessage tool.

The user interacts primarily with the team lead. Your work is coordinated through the task system and teammate messaging.
`;
function makeTeammateCanUseTool(identity, lifecycleAbort, onPaused, hasPermissionsToUseTool) {
  return async (tool, input, ctx, assistantMessage, toolUseId, precomputedResult) => {
    let result = precomputedResult ?? (await Ypt(tool, input, ctx, assistantMessage, toolUseId, undefined, hasPermissionsToUseTool));
    if (result.behavior !== "ask") return result;
    let resolvedInput = result.updatedInput ?? input;
    if (lifecycleAbort.signal.aborted) return {
      behavior: "ask",
      message: MY
    };
    let permissionContext = Mr(ctx),
      computeDescription = () => tool.description(resolvedInput, {
        isNonInteractiveSession: ctx.options.isNonInteractiveSession,
        toolPermissionContext: permissionContext,
        tools: ctx.options.tools
      });
    if (ctx.requestDialog !== undefined) {
      let permissionContextUpdater = getActivePermissionContextUpdater(),
        dialogCtx = Tqn(tool, input, ctx, assistantMessage, toolUseId, updates => {
          permissionContextUpdater?.(updates, {
            preserveMode: true
          });
        }, hasPermissionsToUseTool),
        autoCheckResult = await E$n({
          ctx: dialogCtx,
          ...{},
          updatedInput: result.updatedInput,
          suggestions: result.suggestions,
          permissionMode: permissionContext.mode
        });
      if (autoCheckResult) return autoCheckResult;
      if (lifecycleAbort.signal.aborted) return {
        behavior: "ask",
        message: MY
      };
      let description = await computeDescription();
      if (lifecycleAbort.signal.aborted) return {
        behavior: "ask",
        message: MY
      };
      let dialogStart = Date.now();
      try {
        return await new Promise(resolve => {
          d6n({
            ctx: dialogCtx,
            description: description,
            result: result,
            awaitAutomatedChecksBeforeDialog: true
          }, resolve);
        });
      } finally {
        onPaused(Date.now() - dialogStart);
      }
    }
    let description = await computeDescription();
    if (lifecycleAbort.signal.aborted) return {
      behavior: "ask",
      message: MY
    };
    return new Promise(resolve => {
      let request = Qqn({
        toolName: tool.name,
        toolUseId: toolUseId,
        input: resolvedInput,
        description: description,
        permissionSuggestions: result.suggestions,
        workerId: identity.agentId,
        workerName: identity.agentName,
        workerColor: identity.color,
        teamName: identity.teamName
      });
      g6n({
        requestId: request.id,
        toolUseId: toolUseId,
        onAllow(updatedInput, permissionUpdates, _feedback, contentBlocks) {
          cleanup(), yW(permissionUpdates);
          let finalInput = updatedInput && Object.keys(updatedInput).length > 0 ? updatedInput : resolvedInput;
          resolve({
            behavior: "allow",
            updatedInput: finalInput,
            userModified: false,
            ...(contentBlocks && contentBlocks.length > 0 && {
              contentBlocks: contentBlocks
            })
          });
        },
        onReject(feedback, contentBlocks) {
          cleanup();
          let message = feedback ? `${Sqn}${feedback}` : MY;
          resolve({
            behavior: "ask",
            message: message,
            contentBlocks: contentBlocks
          });
        }
      }), Zqn(request);
      let pollInterval = setInterval(async (abortCtrl, cleanupFn, resolveFn, teammateIdentity, pendingRequest) => {
          if (abortCtrl.signal.aborted) {
            cleanupFn(), resolveFn({
              behavior: "ask",
              message: MY
            });
            return;
          }
          let mailbox = await aye(teammateIdentity.agentName, teammateIdentity.teamName);
          for (let message of mailbox) if (message && !message.read) {
            let permissionResponse = Gqe(message.text);
            if (permissionResponse && permissionResponse.request_id === pendingRequest.id) {
              if (await x9t(teammateIdentity.agentName, teammateIdentity.teamName, message), message.from !== Dd) {
                A(`[InProcessRunner] Ignoring permission response from non-team-lead: ${message.from}`, {
                  level: "warn"
                });
                continue;
              }
              if (permissionResponse.subtype === "success") Gpt({
                requestId: permissionResponse.request_id,
                decision: "approved",
                updatedInput: permissionResponse.response?.updated_input,
                permissionUpdates: permissionResponse.response?.permission_updates
              });else Gpt({
                requestId: permissionResponse.request_id,
                decision: "rejected",
                feedback: permissionResponse.error
              });
              return;
            }
          }
        }, HBp, lifecycleAbort, cleanup, resolve, identity, request),
        onAbort = () => {
          cleanup(), resolve({
            behavior: "ask",
            message: MY
          });
        };
      lifecycleAbort.signal.addEventListener("abort", onAbort, {
        once: true
      });
      function cleanup() {
        clearInterval(pollInterval), K7a(request.id), lifecycleAbort.signal.removeEventListener("abort", onAbort);
      }
    });
  };
}
function updateTeammateTask(taskId, updater, registry) {
  registry.update(taskId, task => task.type === "in_process_teammate" ? updater(task) : task);
}
async function sendToTeamLead(from, text, color, registry) {
  await Bf(Dd, {
    from: from,
    text: text,
    timestamp: new Date().toISOString(),
    color: color
  }, registry);
}
async function notifyTeamLeadIdle(agentName, color, teamName, options) {
  let notification = P9t(agentName, options);
  await sendToTeamLead(agentName, Pe(notification), color, teamName);
}
function findNextClaimableTask(tasks) {
  let openTaskIds = new Set(tasks.filter(task => task.status !== "completed").map(task => task.id));
  return tasks.find(task => {
    if (task.status !== "pending") return false;
    if (task.owner) return false;
    return task.blockedBy.every(blockerId => !openTaskIds.has(blockerId));
  });
}
function buildTaskPrompt(task) {
  let prompt = `Complete all open tasks. Start with task #${task.id}: 

 ${task.subject}`;
  if (task.description) prompt += `

${task.description}`;
  return prompt;
}
async function claimNextTask(sessionId, agentName) {
  try {
    let tasks = await F$(sessionId),
      task = findNextClaimableTask(tasks);
    if (!task) return;
    let claimResult = await iga(sessionId, task.id, agentName);
    if (!claimResult.success) {
      A(`[inProcessRunner] Failed to claim task #${task.id}: ${claimResult.reason}`);
      return;
    }
    return await m_e(sessionId, task.id, {
      status: "in_progress"
    }), A(`[inProcessRunner] Claimed task #${task.id}: ${task.subject}`), buildTaskPrompt(task);
  } catch (error) {
    A(`[inProcessRunner] Error checking task list: ${error}`);
    return;
  }
}
async function pollForNextInstruction(identity, lifecycleAbort, taskId, getAppState, registry, parentSessionId, standalone) {
  A(`[inProcessRunner] ${identity.agentName} starting poll loop (abort=${lifecycleAbort.signal.aborted})`);
  let lastActivity = Date.now(),
    pollCount = 0;
  while (!lifecycleAbort.signal.aborted) {
    if (pollCount > 0) await Kn(500);
    pollCount++;
    let appState = getAppState(),
      task = appState.tasks[taskId];
    if (task && task.type === "in_process_teammate" && task.pendingUserMessages.length > 0) {
      let pendingMessage = task.pendingUserMessages[0];
      return updateTeammateTask(taskId, t => ({
        ...t,
        pendingUserMessages: t.pendingUserMessages.slice(1)
      }), registry), A(`[inProcessRunner] ${identity.agentName} found pending user message (poll #${pollCount})`), {
        type: "new_message",
        message: pendingMessage.text,
        origin: pendingMessage.origin,
        from: "user"
      };
    }
    if (task && task.type === "in_process_teammate" && task.shutdownRequested && standalone) return {
      type: "aborted"
    };
    if (task?.type === "in_process_teammate" && task.awaitingPlanApproval || appState.viewingAgentTaskId === taskId) lastActivity = Date.now();
    if (lifecycleAbort.signal.aborted) return A(`[inProcessRunner] ${identity.agentName} aborted while waiting (poll #${pollCount})`), {
      type: "aborted"
    };
    if (standalone) continue;
    A(`[inProcessRunner] ${identity.agentName} poll #${pollCount}: checking mailbox`);
    try {
      let mailbox = await aye(identity.agentName, identity.teamName),
        shutdownIndex = -1,
        shutdownRequest = null;
      for (let i = 0; i < mailbox.length; i++) {
        let message = mailbox[i];
        if (message && !message.read) {
          let parsed = Dut(message.text);
          if (parsed) {
            shutdownIndex = i, shutdownRequest = parsed;
            break;
          }
        }
      }
      if (shutdownIndex !== -1) {
        let shutdownMessage = mailbox[shutdownIndex],
          skippedUnreadCount = zn(mailbox.slice(0, shutdownIndex), message => !message.read);
        return A(`[inProcessRunner] ${identity.agentName} received shutdown request from ${shutdownRequest?.from} (prioritized over ${skippedUnreadCount} unread messages)`), await x9t(identity.agentName, identity.teamName, shutdownMessage), {
          type: "shutdown_request",
          request: shutdownRequest,
          originalMessage: shutdownMessage.text
        };
      }
      let protocolMessages = [],
        plainMessages = [];
      for (let message of mailbox) {
        if (!message || message.read) continue;
        if (IB(message.text)) protocolMessages.push(message);else plainMessages.push(message);
      }
      let planApprovalResumeText = null;
      if (protocolMessages.length > 0) {
        for (let message of protocolMessages) {
          let planApproval = Put(message.text);
          if (planApproval && message.from === Dd) {
            if (R2a(taskId, planApproval, registry)) A(`[inProcessRunner] ${identity.agentName} applied lead plan_approval_response: approved=${planApproval.approved}`), planApprovalResumeText = $9t(planApproval);else A(`[inProcessRunner] ${identity.agentName} ignoring stale plan_approval_response (not awaiting approval)`);
            continue;
          }
          let modeSetRequest = Out(message.text);
          if (modeSetRequest && message.from === Dd) {
            let newMode = mdo(modeSetRequest.mode);
            A(`[inProcessRunner] ${identity.agentName} applying lead mode_set_request: ${newMode}`), updateTeammateTask(taskId, t => t.permissionMode === newMode ? t : {
              ...t,
              permissionMode: newMode
            }, registry), await Aut(identity.teamName, identity.agentName, newMode);
          } else A(`[inProcessRunner] ${identity.agentName} dropping protocol frame from ${message.from}: ${message.text.substring(0, 80)}`, {
            level: "warn"
          });
        }
        await qqe(identity.agentName, identity.teamName, protocolMessages);
      }
      if (planApprovalResumeText) return {
        type: "new_message",
        message: planApprovalResumeText,
        from: Dd
      };
      let nextMessage = plainMessages.find(message => message.from === Dd) ?? plainMessages[0];
      if (nextMessage) return A(`[inProcessRunner] ${identity.agentName} received new message from ${nextMessage.from}`), await x9t(identity.agentName, identity.teamName, nextMessage), {
        type: "new_message",
        message: nextMessage.text,
        from: nextMessage.from,
        color: nextMessage.color,
        summary: nextMessage.summary
      };
    } catch (error) {
      A(`[inProcessRunner] ${identity.agentName} poll error: ${error}`);
    }
    let taskPrompt = await claimNextTask(parentSessionId, identity.agentName);
    if (taskPrompt) return {
      type: "new_message",
      message: taskPrompt,
      from: "task-list"
    };
  }
  return A(`[inProcessRunner] ${identity.agentName} exiting poll loop (abort=${lifecycleAbort.signal.aborted}, polls=${pollCount})`), {
    type: "aborted"
  };
}
async function runTeammateAgentLoop(config) {
  let {
      identity: identity,
      taskId: taskId,
      prompt: prompt,
      description: description,
      agentDefinition: agentDefinition,
      teammateContext: teammateContext,
      toolUseContext: toolUseContext,
      abortController: abortController,
      model: model,
      systemPrompt: systemPrompt,
      systemPromptMode: systemPromptMode,
      allowedTools: allowedTools,
      allowPermissionPrompts: allowPermissionPrompts,
      invokingRequestId: invokingRequestId,
      standalone = false,
      resumeMessages: resumeMessages,
      resumeReplacementState: resumeReplacementState,
      initialFrom: initialFrom
    } = config,
    {
      setAppState: setAppState,
      taskRegistry: taskRegistry
    } = toolUseContext,
    spinner = Qae(taskId);
  A(`[inProcessRunner] Starting agent loop for ${identity.agentId}`);
  let agentContext = {
      agentId: identity.agentId,
      parentAgentId: toolUseContext.agentId,
      depth: k3(toolUseContext.agentContext),
      parentSessionId: identity.parentSessionId,
      agentName: identity.agentName,
      teamName: identity.teamName,
      agentColor: identity.color,
      planModeRequired: identity.planModeRequired,
      isTeamLead: false,
      agentType: "teammate",
      invokingRequestId: invokingRequestId,
      invocationKind: "spawn",
      invocationEmitted: false
    },
    {
      tools: availableTools,
      mainLoopModel: mainLoopModel
    } = toolUseContext.rootToolSurface,
    resolvedSystemPrompt;
  if (systemPromptMode === "replace" && systemPrompt) resolvedSystemPrompt = systemPrompt;else {
    let promptParts = [...(await ux(availableTools, mainLoopModel)), TEAMMATE_SYSTEM_PROMPT_ADDENDUM];
    if (agentDefinition) {
      let customPrompt = agentDefinition.getSystemPrompt();
      if (customPrompt) promptParts.push(`
# Custom Agent Instructions
${customPrompt}`);
      if (agentDefinition.memory) W("tengu_agent_memory_loaded", {
        ...false,
        scope: Le(agentDefinition.memory),
        source: Ve("in-process-teammate")
      });
    }
    if (systemPromptMode === "append" && systemPrompt) promptParts.push(systemPrompt);
    resolvedSystemPrompt = promptParts.join(`
`);
  }
  let teammateAgentDefinition = {
      agentType: identity.agentName,
      whenToUse: `In-process teammate: ${identity.agentName}`,
      getSystemPrompt: () => resolvedSystemPrompt,
      tools: agentDefinition?.tools ? os([...agentDefinition.tools, o_, QR, Kz, j0, wD]) : ["*"],
      source: "projectSettings",
      permissionMode: "default",
      ...(agentDefinition?.model && {
        model: agentDefinition.model
      })
    },
    history = resumeMessages ? [...resumeMessages] : [],
    recordedUuids = new Set(resumeMessages?.map(message => message.uuid)),
    extraMetadata = {
      taskKind: "in_process_teammate",
      teamName: identity.teamName,
      color: identity.color,
      planModeRequired: identity.planModeRequired,
      ...(agentDefinition && {
        customAgentType: agentDefinition.agentType
      }),
      ...(model && {
        model: model
      })
    },
    initialMessage = Hut({
      from: initialFrom ?? Dd,
      text: prompt,
      summary: description
    }),
    currentPrompt = initialMessage,
    currentOrigin = undefined,
    loopDone = false,
    compactBlockedByHook = false;
  if (!standalone) await claimNextTask(identity.parentSessionId, identity.agentName);
  try {
    taskRegistry.updateTranscript(taskId, transcript => {
      let messages = transcript.messages;
      if (resumeMessages) for (let message of resumeMessages.slice(-T2n)) messages = b0e(messages, message);
      return {
        ...transcript,
        messages: b0e(messages, Mn({
          content: initialMessage
        }))
      };
    });
    let contentReplacementState = toolUseContext.contentReplacementState ? resumeReplacementState ?? JNt() : undefined,
      stickyBetas = Ere();
    while (!abortController.signal.aborted && !loopDone) {
      A(`[inProcessRunner] ${identity.agentId} processing prompt: ${currentPrompt.substring(0, 50)}...`);
      let currentWorkAbort = kl();
      updateTeammateTask(taskId, task => ({
        ...task,
        currentWorkAbortController: currentWorkAbort
      }), taskRegistry);
      let userMessage = Mn({
          content: currentPrompt,
          origin: currentOrigin
        }),
        promptMessages = [userMessage],
        forkContextMessages = history,
        tokenCount = CC(history, aE(mainLoopModel));
      if (tokenCount > $Mt(mainLoopModel, toolUseContext.options.autoCompactWindow)) {
        A(`[inProcessRunner] ${identity.agentId} compacting history (${tokenCount} tokens)`);
        let compactCtx = {
          ...toolUseContext,
          abortController: abortController,
          agentId: cd(identity.agentId),
          readFileState: uge(toolUseContext.readFileState),
          memorySelector: qke(),
          loadedNestedMemoryPaths: {},
          onCompactEvent: undefined
        };
        try {
          let compactResult = await jpt(history, compactCtx, {
            systemPrompt: vc([]),
            userContext: {},
            systemContext: {},
            toolUseContext: compactCtx,
            forkContextMessages: history
          }, true, undefined, true);
          if (forkContextMessages = Iye(compactResult), contentReplacementState) contentReplacementState = JNt();
          history.length = 0, history.push(...forkContextMessages), recordedUuids.clear(), taskRegistry.updateTranscript(taskId, transcript => ({
            ...transcript,
            messages: [...forkContextMessages, userMessage]
          }));
        } catch (error) {
          if (error instanceof Error && error.message.startsWith(zpt)) A(`[inProcessRunner] ${identity.agentId} compaction blocked by PreCompact hook; continuing uncompacted`), compactBlockedByHook = true;else if (abortController.signal.aborted || error instanceof Error && error.message === j$) {
            A(`[inProcessRunner] ${identity.agentId} aborted during compaction`), loopDone = true;
            break;
          } else throw error;
        }
      }
      let forkContext = forkContextMessages.length > 0 ? [...forkContextMessages] : undefined;
      history.push(userMessage);
      let toolUseTracker = D9n(),
        toolFilter = O9n(availableTools),
        turnMessages = [],
        currentTask = toolUseContext.getAppState().tasks[taskId],
        permissionMode = currentTask && currentTask.type === "in_process_teammate" ? currentTask.permissionMode : "default",
        turnAgentDefinition = {
          ...teammateAgentDefinition,
          permissionMode: permissionMode
        },
        workInterrupted = false,
        preservedToolResults = null;
      if (await Dmn(teammateContext, async () => Q5(agentContext, async () => {
        updateTeammateTask(taskId, task => ({
          ...task,
          status: "running",
          isIdle: false,
          evictAfter: undefined
        }), taskRegistry), taskRegistry.updateTranscript(taskId, transcript => ({
          ...transcript,
          turnStartTime: Date.now()
        })), spinner.setMode("responding");
        for await (let event of Q$({
          agentDefinition: turnAgentDefinition,
          promptMessages: promptMessages,
          toolUseContext: toolUseContext,
          canUseTool: makeTeammateCanUseTool(identity, currentWorkAbort, pausedMs => {
            updateTeammateTask(taskId, task => ({
              ...task,
              totalPausedMs: (task.totalPausedMs ?? 0) + pausedMs
            }), taskRegistry);
          }, bxe(setAppState)),
          isAsync: true,
          canShowPermissionPrompts: allowPermissionPrompts ?? true,
          forkContextMessages: forkContext,
          querySource: "agent:custom",
          override: {
            abortController: currentWorkAbort,
            agentContext: agentContext,
            onRetryStatus: spinner.setRetryStatus,
            ...(identity.resumableAgentId && {
              agentId: identity.resumableAgentId
            })
          },
          ...(identity.resumableAgentId && {
            recordedUuids: recordedUuids,
            name: identity.agentName,
            description: description,
            extraMetadata: {
              ...extraMetadata,
              permissionMode: permissionMode
            }
          }),
          model: model,
          preserveToolUseResults: true,
          availableTools: availableTools,
          allowedTools: allowedTools,
          contentReplacementState: contentReplacementState,
          stickyBetas: stickyBetas,
          isTeammate: true,
          teammateContext: teammateContext
        })) {
          if (abortController.signal.aborted) {
            A(`[inProcessRunner] ${identity.agentId} lifecycle aborted`);
            break;
          }
          if (currentWorkAbort.signal.aborted) {
            if (A(`[inProcessRunner] ${identity.agentId} current work aborted (Escape pressed)`), event.type === "assistant" || event.type === "user") turnMessages.push(event), history.push(event), preservedToolResults = cce(history, event, preservedToolResults);
            workInterrupted = true;
            break;
          }
          if (event.type === "spinner_mode") {
            spinner.setMode(event.mode);
            continue;
          }
          if (event.type === "api_metrics") continue;
          if (event.type === "set_in_progress_tool_use_ids") {
            if (event.op.action !== "remove") continue;
            let removedIds = event.op.ids;
            taskRegistry.updateTranscript(taskId, transcript => {
              let inProgressIds = new Set(transcript.inProgressToolUseIDs),
                changed = false;
              for (let id of removedIds) if (inProgressIds.delete(id)) changed = true;
              return changed ? {
                ...transcript,
                inProgressToolUseIDs: inProgressIds
              } : transcript;
            });
            continue;
          }
          turnMessages.push(event), history.push(event), preservedToolResults = cce(history, event, preservedToolResults), P9n(toolUseTracker, event, toolFilter, availableTools);
          let progress = I3t(toolUseTracker);
          updateTeammateTask(taskId, task => ({
            ...task,
            progress: progress
          }), taskRegistry), taskRegistry.updateTranscript(taskId, transcript => {
            let inProgressIds = transcript.inProgressToolUseIDs;
            if (event.type === "assistant") {
              for (let block of event.message.content) if (block.type === "tool_use") inProgressIds = new Set([...inProgressIds, block.id]);
            } else if (event.type === "user") {
              let content = event.message.content;
              if (Array.isArray(content)) {
                for (let block of content) if (typeof block === "object" && "type" in block && block.type === "tool_result") inProgressIds = new Set(inProgressIds), inProgressIds.delete(block.tool_use_id);
              }
            }
            return {
              ...transcript,
              messages: XMa(transcript.messages, event),
              inProgressToolUseIDs: inProgressIds
            };
          });
        }
        return {
          success: true,
          messages: turnMessages
        };
      })).finally(() => {
        if (preservedToolResults) history.push(...preservedToolResults.preserved), preservedToolResults = null;
      }), updateTeammateTask(taskId, task => ({
        ...task,
        currentWorkAbortController: undefined
      }), taskRegistry), abortController.signal.aborted) break;
      if (workInterrupted) {
        A(`[inProcessRunner] ${identity.agentId} work interrupted, returning to idle`);
        let interruptMessage = Hl({
          content: j$
        });
        taskRegistry.updateTranscript(taskId, transcript => ({
          ...transcript,
          messages: b0e(transcript.messages, interruptMessage)
        }));
      }
      let latestTask = toolUseContext.getAppState().tasks[taskId],
        alreadyIdle = latestTask?.type === "in_process_teammate" && latestTask.isIdle;
      if (updateTeammateTask(taskId, task => (task.onIdleCallbacks?.forEach(cb => cb()), {
        ...task,
        isIdle: true,
        evictAfter: Date.now() + Ice,
        onIdleCallbacks: []
      }), taskRegistry), !alreadyIdle && !standalone) await notifyTeamLeadIdle(identity.agentName, identity.color, identity.teamName, {
        idleReason: workInterrupted ? "interrupted" : "available",
        summary: W9t(history)
      });else A(`[inProcessRunner] Skipping duplicate idle notification for ${identity.agentName}`);
      A(`[inProcessRunner] ${identity.agentId} finished prompt, waiting for next`);
      let instruction = await pollForNextInstruction(identity, abortController, taskId, toolUseContext.getAppState, taskRegistry, identity.parentSessionId, standalone);
      switch (instruction.type) {
        case "shutdown_request":
          A(`[inProcessRunner] ${identity.agentId} received shutdown request - passing to model`), currentPrompt = Hut({
            from: instruction.request?.from || "team-lead",
            text: instruction.originalMessage
          }), currentOrigin = undefined, Zco(taskId, Mn({
            content: currentPrompt
          }), taskRegistry);
          break;
        case "new_message":
          if (A(`[inProcessRunner] ${identity.agentId} received new message from ${instruction.from}`), instruction.from === "user") currentPrompt = instruction.message, currentOrigin = instruction.origin;else currentPrompt = Hut({
            from: instruction.from,
            text: instruction.message,
            color: instruction.color,
            summary: instruction.summary
          }), currentOrigin = undefined, Zco(taskId, Mn({
            content: currentPrompt
          }), taskRegistry);
          break;
        case "aborted":
          A(`[inProcessRunner] ${identity.agentId} aborted while waiting`), loopDone = true;
          break;
        case "idle_timeout":
          if (A(`[inProcessRunner] ${identity.agentId} idle timeout \u2014 exiting loop`), !standalone) toolUseContext.agentLifecycle.setTeammate(identity.agentId, undefined), v9t(identity.teamName, identity.agentId);
          loopDone = true;
          break;
      }
    }
    let alreadyTerminal = false,
      completedToolUseId;
    if (updateTeammateTask(taskId, task => {
      if (task.status !== "running") return alreadyTerminal = true, task;
      return completedToolUseId = task.toolUseId, task.onIdleCallbacks?.forEach(cb => cb()), {
        ...task,
        status: "completed",
        notified: true,
        endTime: Date.now(),
        pendingUserMessages: [],
        abortController: undefined,
        currentWorkAbortController: undefined,
        onIdleCallbacks: []
      };
    }, taskRegistry), !alreadyTerminal) taskRegistry.updateTranscript(taskId, transcript => ({
      ...transcript,
      messages: transcript.messages.length ? [transcript.messages.at(-1)] : [],
      inProgressToolUseIDs: new Set()
    }));
    if (p_(taskId), taskRegistry.evictTerminal(taskId), !alreadyTerminal) hf(taskId, "completed", {
      toolUseId: completedToolUseId,
      summary: identity.agentId
    });
    if (X9e(identity.agentId), compactBlockedByHook) Pt("swarm_in_process_run", "compact_blocked_by_hook");else He("swarm_in_process_run");
    return {
      success: true,
      messages: history
    };
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : "Unknown error";
    A(`[inProcessRunner] Agent ${identity.agentId} failed: ${errorMessage}`);
    let alreadyTerminal = false,
      failedToolUseId;
    if (updateTeammateTask(taskId, task => {
      if (task.status !== "running") return alreadyTerminal = true, task;
      return failedToolUseId = task.toolUseId, task.onIdleCallbacks?.forEach(cb => cb()), {
        ...task,
        status: "failed",
        notified: true,
        error: errorMessage,
        isIdle: true,
        endTime: Date.now(),
        onIdleCallbacks: [],
        pendingUserMessages: [],
        abortController: undefined,
        currentWorkAbortController: undefined
      };
    }, taskRegistry), !alreadyTerminal) taskRegistry.updateTranscript(taskId, transcript => ({
      ...transcript,
      messages: transcript.messages.length ? [transcript.messages.at(-1)] : [],
      inProgressToolUseIDs: new Set()
    }));
    if (p_(taskId), taskRegistry.evictTerminal(taskId), !alreadyTerminal) hf(taskId, "failed", {
      toolUseId: failedToolUseId,
      summary: identity.agentId
    });
    if (!standalone) await notifyTeamLeadIdle(identity.agentName, identity.color, identity.teamName, {
      idleReason: "failed",
      completedStatus: "failed",
      failureReason: errorMessage
    });
    return X9e(identity.agentId), xe("swarm_in_process_run", "agent_loop_failed"), {
      success: false,
      error: errorMessage,
      messages: history
    };
  }
}
function startTeammateAgent(config) {
  let agentId = config.identity.agentId;
  runTeammateAgentLoop(config).catch(error => {
    A(`[inProcessRunner] Unhandled error in ${agentId}: ${error}`);
  });
}
var HBp = 500;
var _6n = b(() => {
  Zae();
  CG();
  puo();
  p6n();
  Y4t();
  Vpt();
  mn();
  kt();
  f1();
  dee();
  E3t();
  F0e();
  hS();
  fye();
  jO();
  xS();
  fdo();
  po();
  wE();
  HB();
  g1();
  lh();
  Ph();
  xl();
  qe();
  Gk();
  po();
  Ro();
  Sw();
  ly();
  RE();
  tn();
  oH();
  b2();
  Pw();
  Zst();
  HI();
  wB();
  Npt();
  sL();
});

export {setActivePermissionContextUpdater as Q7a,getActivePermissionContextUpdater as Z7a,clearActivePermissionContextUpdater as eza,activePermissionContextUpdater as wgo,teammatePromptModule as tza,TEAMMATE_SYSTEM_PROMPT_ADDENDUM,makeTeammateCanUseTool as IBp,updateTeammateTask as Dce,sendToTeamLead as xBp,notifyTeamLeadIdle as nza,findNextClaimableTask as DBp,buildTaskPrompt as PBp,claimNextTask as rza,pollForNextInstruction as OBp,runTeammateAgentLoop as LBp,startTeammateAgent as Kpt,HBp,_6n};
