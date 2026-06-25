// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {isAgentSwarmsEnabled as Wa,lb} from "../config/3314_isAgentSwarmsEnabled.ts";
import {rc,hS,U5e} from "../agent/4362_toolUseCount.ts";
import {mS} from "../../vendor/m3842.ts";
import {getAgentName as dg,isTeammate as um,getTeamName as up,getTeammateColor as bA,getAgentId as aD,isTeamLead as tO,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {Dd,wB} from "../config/3893_wB.ts";
import {readTeamFileAsync as oye,sL} from "../../vendor/m3897.ts";
import {ls,fg} from "../../vendor/m2232.ts";
import {writeToMailbox as Bf,createShutdownRequestMessage as xut,createShutdownApprovedMessage as iuo,createShutdownRejectedMessage as auo,Pw,isStructuredProtocolMessage as IB} from "../permissions/3902_writeToMailbox.ts";
import {EXe} from "../../vendor/m1459.ts";
import {TeamDeleteToolName as Pe,tn,qt} from "../config/0230_encoding.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {iye,F0e} from "../../vendor/m3899.ts";
import {gracefulShutdown as gi,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {zP,FS} from "../../vendor/m722.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {Qr} from "../../vendor/m323.ts";
import {lt,mainAgentId as rs} from "../session/0132_sent.ts";
import {WB} from "../../vendor/m4274.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {b5n,Jqt} from "../agent/4307_type.ts";
import {xS,Fqo} from "../../vendor/m122.ts";
import {_9t,WFa,aG} from "../../vendor/m3889.ts";
import {Ir} from "../../vendor/m584.ts";
import {Ct,Ce} from "../../vendor/m197.ts";
import {Xo} from "../../vendor/m240.ts";
import {ef,iy} from "../../vendor/m2794.ts";
import {lIe,xI} from "../../vendor/m3295.ts";
import {_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {br} from "../config/0745_updateSettingsForSource.ts";
import {DQa,IQa,xQa} from "../../vendor/m4307.ts";
import {Qqt,Jye,r9} from "../permissions/4311_agentId.ts";
import {FQa,$Qa,MQa,NQa,BQa,UQa} from "../agent/4312_verbose.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {o_} from "./2710_allErrors.ts";
import {mFa,X_e} from "../../vendor/m3883.ts";
import {Vrt} from "../config/2712_isKairosCronEnabled.ts";
import {Ne} from "../../vendor/m583.ts";
import {T7} from "../session/1465_promise.ts";
var VQa = {};
ft(VQa, {
  inFlightTeammateResumes: () => inFlightTeammateResumes,
  SendMessageTool: () => SendMessageTool
});
/** Resolve the active SendMessage input schema: structured-team-protocol form when agent teams are enabled, otherwise the plain-text-only form. */
function q9p() {
  return Wa() ? WQa() : $9p();
}
/** Look up the UI color assigned to a teammate by name within the current team context. */
function W9p(appState: any, targetName: any): any {
  let teammates = appState.teamContext?.teammates;
  if (!teammates) return;
  for (let teammate of Object.values(teammates)) if ("name" in teammate && (teammate as any).name === targetName) return (teammate as any).color;
  return;
}
/** Resolve the display name of the agent identified by agentId, preferring the live agent context, then the name registry, then the task record. */
function GQa(toolCtx: any, agentId: any): any {
  let agentCtx = toolCtx.agentContext;
  if (agentCtx?.agentType === "teammate" && agentCtx.agentName) return agentCtx.agentName;
  let appState = toolCtx.getAppState();
  for (let [agentName, registeredId] of appState.agentNameRegistry) if (registeredId === agentId) return agentName;
  let task = appState.tasks[agentId];
  if (rc(task)) return task.agentType;
  if (mS(task)) return task.identity.agentName;
  return agentId;
}
/** Resolve the name to use as the message sender for the current tool invocation. */
function H5n(toolCtx: any): any {
  if (toolCtx.agentId) return GQa(toolCtx, toolCtx.agentId);
  return dg() || (um() ? "teammate" : Dd);
}
/** Send a plain-text message to a teammate's inbox, verifying the recipient is addressable on the current team first. */
async function G9p(recipientName: any, msgText: any, msgSummary: any, toolCtx: any): Promise<any> {
  let appState = toolCtx.getAppState(),
    teamName = up(appState.teamContext);
  if (!teamName) return {
    data: {
      success: !1,
      message: `No agent named '${recipientName}' is currently addressable. Spawn a new one or use the agent ID.`
    }
  };
  if (recipientName !== Dd) {
    if (!Object.values(appState.teamContext?.teammates ?? {}).some((teammate: any) => teammate.name === recipientName)) {
      let teamFile = await oye(teamName);
      if (teamFile !== null && !teamFile.members.some((member: any) => member.name === recipientName)) return {
        data: {
          success: !1,
          message: `No teammate named '${recipientName}' is currently on team '${teamName}'. Spawn one with ${ls}({name: '${recipientName}'}) — or message the lead to do so.`
        }
      };
    }
  }
  let senderName = H5n(toolCtx),
    senderColor = bA();
  await Bf(recipientName, {
    from: senderName,
    text: msgText,
    summary: msgSummary,
    timestamp: new Date().toISOString(),
    color: senderColor
  }, teamName);
  let targetColor = W9p(appState, recipientName);
  return {
    data: {
      success: !0,
      message: `Message sent to ${recipientName}'s inbox`,
      routing: {
        sender: senderName,
        senderColor: senderColor,
        target: `@${recipientName}`,
        targetColor: targetColor,
        summary: msgSummary,
        content: msgText
      }
    }
  };
}
/** Send a shutdown request to a teammate, returning the generated request ID. */
async function V9p(targetName: any, shutdownReason: any, toolCtx: any): Promise<any> {
  let appState = toolCtx.getAppState(),
    teamName = up(appState.teamContext),
    senderName = H5n(toolCtx),
    requestId = EXe("shutdown", targetName),
    shutdownMsg = xut({
      requestId: requestId,
      from: senderName,
      reason: shutdownReason
    });
  return await Bf(targetName, {
    from: senderName,
    text: Pe(shutdownMsg),
    timestamp: new Date().toISOString(),
    color: bA()
  }, teamName), {
    data: {
      success: !0,
      message: `Shutdown request sent to ${targetName}. Request ID: ${requestId}`,
      request_id: requestId,
      target: targetName
    }
  };
}
/** Approve a pending shutdown request: notify the lead, then abort the in-process controller or gracefully exit depending on backend type. */
async function K9p(requestId: any, toolCtx: any): Promise<any> {
  let teamName = up(),
    agentId = aD(),
    agentName = dg() || "teammate";
  A(`[SendMessageTool] handleShutdownApproval: teamName=${teamName}, agentId=${agentId}, agentName=${agentName}`);
  let tmuxPaneId: any, backendType: any;
  if (teamName) {
    let teamFile = await oye(teamName);
    if (teamFile && agentId) {
      let member = teamFile.members.find((m: any) => m.agentId === agentId);
      if (member) tmuxPaneId = member.tmuxPaneId, backendType = member.backendType;
    }
  }
  let approvedMsg = iuo({
    requestId: requestId,
    from: agentName,
    paneId: tmuxPaneId,
    backendType: backendType
  });
  if (await Bf(Dd, {
    from: agentName,
    text: Pe(approvedMsg),
    timestamp: new Date().toISOString(),
    color: bA()
  }, teamName), backendType === "in-process") {
    if (A(`[SendMessageTool] In-process teammate ${agentName} approving shutdown - signaling abort`), agentId) {
      let appState = toolCtx.getAppState(),
        task = iye(agentId, appState.tasks);
      if (task?.abortController) task.abortController.abort(), A(`[SendMessageTool] Aborted controller for in-process teammate ${agentName}`);else A(`[SendMessageTool] Warning: Could not find task/abortController for ${agentName}`);
    }
  } else {
    if (agentId) {
      let appState = toolCtx.getAppState(),
        task = iye(agentId, appState.tasks);
      if (task?.abortController) return A(`[SendMessageTool] Fallback: Found in-process task for ${agentName} via AppState, aborting`), task.abortController.abort(), {
        data: {
          success: !0,
          message: `Shutdown approved (fallback path). Agent ${agentName} is now exiting.`,
          request_id: requestId
        }
      };
    }
    setImmediate(async () => {
      await gi(0, "other");
    });
  }
  return {
    data: {
      success: !0,
      message: `Shutdown approved. Sent confirmation to team-lead. Agent ${agentName} is now exiting.`,
      request_id: requestId
    }
  };
}
/** Reject a pending shutdown request, notifying the lead with the rejection reason. */
async function z9p(requestId: any, rejectionReason: any): Promise<any> {
  let teamName = up(),
    agentName = dg() || "teammate",
    rejectedMsg = auo({
      requestId: requestId,
      from: agentName,
      reason: rejectionReason
    });
  return await Bf(Dd, {
    from: agentName,
    text: Pe(rejectedMsg),
    timestamp: new Date().toISOString(),
    color: bA()
  }, teamName), {
    data: {
      success: !0,
      message: `Shutdown rejected. Reason: "${rejectionReason}". Continuing to work.`,
      request_id: requestId
    }
  };
}
/** Approve a teammate's plan (team-lead only), delivering the approval with the effective post-plan permission mode. */
async function j9p(recipientName: any, requestId: any, planFeedback: any, toolCtx: any): Promise<any> {
  let appState = toolCtx.getAppState(),
    teamName = appState.teamContext?.teamName;
  if (!tO(appState.teamContext)) throw Error("Only the team lead can approve plans. Teammates cannot approve their own or other plans.");
  let currentMode = zP(Mr(toolCtx).mode),
    effectiveMode = currentMode === "plan" ? "default" : currentMode,
    approvalMsg = {
      type: "plan_approval_response",
      requestId: requestId,
      approved: !0,
      ...(planFeedback !== void 0 && {
        feedback: planFeedback
      }),
      timestamp: new Date().toISOString(),
      permissionMode: effectiveMode
    };
  return await Bf(recipientName, {
    from: Dd,
    text: Pe(approvalMsg),
    timestamp: new Date().toISOString()
  }, teamName), {
    data: {
      success: !0,
      message: `Plan approved for ${recipientName}. They will receive the approval and can proceed with implementation.`,
      request_id: requestId
    }
  };
}
/** Reject a teammate's plan (team-lead only), delivering the rejection feedback. */
async function Y9p(recipientName: any, requestId: any, planFeedback: any, toolCtx: any): Promise<any> {
  let appState = toolCtx.getAppState(),
    teamName = appState.teamContext?.teamName;
  if (!tO(appState.teamContext)) throw Error("Only the team lead can reject plans. Teammates cannot reject their own or other plans.");
  let rejectionMsg = {
    type: "plan_approval_response",
    requestId: requestId,
    approved: !1,
    feedback: planFeedback,
    timestamp: new Date().toISOString()
  };
  return await Bf(recipientName, {
    from: Dd,
    text: Pe(rejectionMsg),
    timestamp: new Date().toISOString()
  }, teamName), {
    data: {
      success: !0,
      message: `Plan rejected for ${recipientName} with feedback: "${planFeedback}"`,
      request_id: requestId
    }
  };
}
var qQa: any, inFlightTeammateResumes: any, U9p: any, WQa: any, $9p: any, SendMessageTool: any;
var KQa = b(() => {
  Qr();
  lt();
  WB();
  ri();
  F0e();
  hS();
  b5n();
  xS();
  _9t();
  lb();
  xl();
  qe();
  Ir();
  Ct();
  Xo();
  Np();
  ef();
  FS();
  lIe();
  _a();
  br();
  tn();
  wB();
  DQa();
  sL();
  Op();
  Pw();
  fg();
  Qqt();
  FQa();
  $Qa();
  qQa = /^[^\n\r]{1,200}$/, inFlightTeammateResumes = new Map(), U9p = ve(() => C.discriminatedUnion("type", [C.object({
    type: C.literal("shutdown_request"),
    reason: C.string().optional()
  }), C.object({
    type: C.literal("shutdown_response"),
    request_id: C.string().regex(qQa, "must be the request id being responded to"),
    approve: xI(),
    reason: C.string().optional()
  }), C.object({
    type: C.literal("plan_approval_response"),
    request_id: C.string().regex(qQa, "must be the request id being responded to"),
    approve: xI(),
    feedback: C.string().optional()
  })])), WQa = ve(() => C.object({
    to: C.string().describe("Recipient: teammate name"),
    summary: C.string().max(200).optional().describe("A 5-10 word summary shown as a preview in the UI (required when message is a string)"),
    message: C.union([C.string().describe("Plain text message content"), U9p()])
  })), $9p = ve(() => WQa().extend({
    message: C.string().describe("Plain text message content")
  }));
  SendMessageTool = Ks({
    name: o_,
    searchHint: "send messages to agent teammates",
    maxResultSizeChars: 1e5,
    userFacingName() {
      return "SendMessage";
    },
    get inputSchema() {
      return q9p();
    },
    shouldDefer: !0,
    isReadOnly(input: any) {
      return typeof input.message === "string";
    },
    backfillObservableInput(input: any) {
      if ("type" in input) return;
      if (typeof input.to !== "string") return;
      if (typeof input.message === "string") input.type = "message", input.recipient = input.to, input.content = input.message;else if (typeof input.message === "object" && input.message !== null) {
        let msgObj = input.message;
        if (input.type = msgObj.type, input.recipient = input.to, msgObj.request_id !== void 0) input.request_id = msgObj.request_id;
        if (msgObj.approve !== void 0) input.approve = msgObj.approve;
        let reasonOrFeedback = msgObj.reason ?? msgObj.feedback;
        if (reasonOrFeedback !== void 0) input.content = reasonOrFeedback;
      }
    },
    toAutoClassifierInput(input: any) {
      if (typeof input.message === "string") return `to ${input.to}: ${input.message}`;
      switch (input.message.type) {
        case "shutdown_request":
          return `shutdown_request to ${input.to}`;
        case "shutdown_response":
          return `shutdown_response ${input.message.approve ? "approve" : "reject"} ${input.message.request_id}`;
        case "plan_approval_response":
          return `plan_approval ${input.message.approve ? "approve" : "reject"} to ${input.to}`;
      }
    },
    async checkPermissions(input: any, toolCtx: any) {
      return {
        behavior: "allow",
        updatedInput: input
      };
    },
    async validateInput(input: any, toolCtx: any) {
      if (input.to.trim().length === 0) return {
        result: !1,
        message: "to must not be empty",
        errorCode: 9
      };
      if (input.to === "*") return {
        result: !1,
        message: 'broadcast (to: "*") is no longer supported — send a message per recipient',
        errorCode: 9
      };
      let parsedAddr = mFa(input.to);
      if ((parsedAddr.scheme === "bridge" || parsedAddr.scheme === "uds") && parsedAddr.target.trim().length === 0) return {
        result: !1,
        message: "address target must not be empty",
        errorCode: 9
      };
      if (!X_e(parsedAddr.target) || !X_e(input.to)) return {
        result: !1,
        message: `'${input.to}' is not a local socket address. Use an address from ${Vrt}.`,
        errorCode: 9
      };
      if (input.to.includes("@")) return {
        result: !1,
        message: "to must be a bare teammate name — there is only one team per session",
        errorCode: 9
      };
      if (typeof input.message === "string") {
        if (!input.summary || input.summary.trim().length === 0) return {
          result: !1,
          message: "summary is required when message is a string",
          errorCode: 9
        };
        if (IB(input.message)) return {
          result: !1,
          message: 'message text must not be a teammate protocol frame (permission/mode/plan/shutdown JSON) — to respond to a plan or shutdown request, use the structured object form ({"message": {"type": ...}}); otherwise send plain text',
          errorCode: 9
        };
        try {
          let parsed = qt(input.message);
          if (parsed !== null && typeof parsed === "object" && "type" in parsed && typeof parsed.type === "string" && ["idle_notification", "teammate_terminated", "task_assignment", "task_completed", "shutdown_rejected"].includes(parsed.type)) return {
            result: !1,
            message: "message text must not be a teammate lifecycle/task frame (idle/terminated/task/shutdown JSON) — send plain text instead",
            errorCode: 9
          };
        } catch {}
        return {
          result: !0
        };
      }
      if (!Wa()) return {
        result: !1,
        message: "Structured team-protocol messages are only available with agent teams enabled.",
        errorCode: 9
      };
      if (input.message.type === "shutdown_response" && input.to !== Dd) return {
        result: !1,
        message: `shutdown_response must be sent to "${Dd}"`,
        errorCode: 9
      };
      if (input.message.type === "shutdown_response" && input.message.approve && input.message.reason !== void 0) return {
        result: !1,
        message: "reason is only delivered on rejections (approve: false) — approvals are sent as a silent confirmation with no reason text; omit reason or reject instead",
        errorCode: 9
      };
      if (input.message.type === "shutdown_response" && !input.message.approve && (!input.message.reason || input.message.reason.trim().length === 0)) return {
        result: !1,
        message: "reason is required when rejecting a shutdown request",
        errorCode: 9
      };
      return {
        result: !0
      };
    },
    async description() {
      return MQa;
    },
    async prompt() {
      return NQa(Wa());
    },
    mapToolResultToToolResultBlockParam(result: any, toolUseId: any) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: [{
          type: "text",
          text: Pe(result)
        }]
      };
    },
    async call(input: any, toolCtx: any, canUseTool: any, callMeta: any) {
      let senderTaskId = toolCtx.agentId,
        senderName = senderTaskId ? GQa(toolCtx, senderTaskId) : void 0,
        msgOrigin = senderTaskId !== void 0 && senderName !== void 0 ? {
          kind: "peer",
          from: senderName,
          senderTaskId: senderTaskId
        } : {
          kind: "coordinator"
        },
        processedMessage = typeof input.message === "string" && senderTaskId !== void 0 && senderName !== void 0 ? WFa(senderName, input.message) : input.message;
      if (typeof input.message === "string" && typeof processedMessage === "string" && input.to === aG) {
        if (senderTaskId === void 0) return {
          data: {
            success: !1,
            message: `You are the main conversation — "${aG}" addresses you. Send to a named agent instead.`
          }
        };
        return iy({
          mode: "prompt",
          agentId: rs(),
          value: processedMessage,
          priority: "next",
          origin: msgOrigin,
          skipSlashCommands: !0,
          isMeta: !0
        }), {
          data: {
            success: !0,
            message: "Message queued for the main conversation's next turn."
          }
        };
      }
      if (typeof input.message === "string" && typeof processedMessage === "string") {
        let appState = toolCtx.getAppState(),
          resolvedTaskId = (Object.values(appState.teamContext?.teammates ?? {}).some((tm: any) => tm.name === input.to) ? void 0 : appState.agentNameRegistry.get(input.to)) ?? Fqo(input.to);
        if (resolvedTaskId) {
          let task = appState.tasks[resolvedTaskId];
          if (rc(task) && !Jqt(task)) {
            if (task.status === "running") return U5e(resolvedTaskId, processedMessage, toolCtx.taskRegistry, {
              origin: msgOrigin,
              isMeta: !0
            }), {
              data: {
                success: !0,
                message: `Message queued for delivery to ${input.to} at its next tool round.`
              }
            };
            let awaitCompletion = Boolean(Ne.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS);
            try {
              let resumeResult = await Jye({
                agentId: resolvedTaskId,
                prompt: processedMessage,
                promptOrigin: msgOrigin,
                toolUseContext: toolCtx,
                canUseTool: canUseTool,
                invokingRequestId: callMeta?.requestId,
                awaitCompletion: awaitCompletion
              });
              return {
                data: {
                  success: !0,
                  message: awaitCompletion ? `Agent "${input.to}" was stopped (${task.status}); resumed it with your message and ran to completion. Result:

${resumeResult.finalText || "(no text output)"}` : `Agent "${input.to}" was stopped (${task.status}); resumed it in the background with your message. You'll be notified when it finishes. Output: ${resumeResult.outputFile}`
                }
              };
            } catch (err: any) {
              return {
                data: {
                  success: !1,
                  message: err instanceof r9 ? `Agent "${input.to}" is stopped (${task.status}) and could not be resumed: ${Ce(err)}` : `Agent "${input.to}" was resumed but ${err instanceof Error && err.name === "AbortError" ? "was interrupted" : "failed while running"}: ${Ce(err)}`
                }
              };
            }
          } else {
            let inFlightPromise = inFlightTeammateResumes.get(resolvedTaskId);
            if (inFlightPromise) {
              let resolvedId = await inFlightPromise,
                resolvedTask = resolvedId ? toolCtx.getAppState().tasks[resolvedId] : void 0;
              if (resolvedTask && mS(resolvedTask)) return await Bf(resolvedTask.identity.agentName, {
                from: H5n(toolCtx),
                text: input.message,
                summary: input.summary,
                timestamp: new Date().toISOString(),
                color: bA()
              }, resolvedTask.identity.teamName), {
                data: {
                  success: !0,
                  message: `Teammate "${input.to}" is already running; queued your message for its next turn.`
                }
              };
            }
            let deferred = T7();
            inFlightTeammateResumes.set(resolvedTaskId, deferred.promise);
            let agentMeta = null;
            try {
              if (agentMeta = await IQa(resolvedTaskId), agentMeta) {
                let canonicalName = agentMeta.name ?? input.to,
                  canonicalTeam = agentMeta.teamName ?? up(toolCtx.getAppState().teamContext);
                for (let runningTask of Object.values(toolCtx.getAppState().tasks)) if (mS(runningTask) && runningTask.status === "running" && (runningTask.identity.resumableAgentId === resolvedTaskId || runningTask.identity.agentName === canonicalName && runningTask.identity.teamName === canonicalTeam)) return deferred.resolve(runningTask.id), await Bf(runningTask.identity.agentName, {
                  from: H5n(toolCtx),
                  text: input.message,
                  summary: input.summary,
                  timestamp: new Date().toISOString(),
                  color: bA()
                }, runningTask.identity.teamName), {
                  data: {
                    success: !0,
                    message: `Teammate "${input.to}" is already running; queued your message for its next turn.`
                  }
                };
                let resumeResult = await xQa({
                  resumableAgentId: resolvedTaskId,
                  prompt: input.message,
                  senderName: senderName,
                  meta: agentMeta,
                  fallbackName: input.to,
                  toolUseContext: toolCtx
                });
                return deferred.resolve(resumeResult.taskId), {
                  data: {
                    success: !0,
                    message: resumeResult.resumedMessageCount > 0 ? `Teammate "${input.to}" was not running; resumed it as an in-process teammate with ${resumeResult.resumedMessageCount} prior messages and your message as its next prompt.` : `Teammate "${input.to}" was not running; resumed it as an in-process teammate (no prior transcript) with your message as its next prompt.`
                  }
                };
              }
              deferred.resolve(null);
              let awaitCompletion = Boolean(Ne.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS),
                bgResult = await Jye({
                  agentId: resolvedTaskId,
                  prompt: processedMessage,
                  promptOrigin: msgOrigin,
                  toolUseContext: toolCtx,
                  canUseTool: canUseTool,
                  invokingRequestId: callMeta?.requestId,
                  awaitCompletion: awaitCompletion
                });
              return {
                data: {
                  success: !0,
                  message: awaitCompletion ? `Agent "${input.to}" had no active task; resumed from transcript with your message and ran to completion. Result:

${bgResult.finalText || "(no text output)"}` : `Agent "${input.to}" had no active task; resumed from transcript in the background with your message. You'll be notified when it finishes. Output: ${bgResult.outputFile}`
                }
              };
            } catch (err: any) {
              return deferred.resolve(null), {
                data: {
                  success: !1,
                  message: agentMeta ? `Failed to resume teammate "${input.to}": ${Ce(err)}` : err instanceof r9 ? `Agent "${input.to}" could not be resumed: ${Ce(err)}` : `Agent "${input.to}" was resumed but ${err instanceof Error && err.name === "AbortError" ? "was interrupted" : "failed while running"}: ${Ce(err)}`
                }
              };
            } finally {
              inFlightTeammateResumes.delete(resolvedTaskId);
            }
          }
        }
      }
      if (typeof input.message === "string") return G9p(input.to, input.message, input.summary, toolCtx);
      if (toolCtx.agentId) {
        let agentTask = toolCtx.getAppState().tasks[toolCtx.agentId];
        if (rc(agentTask) || toolCtx.agentContext?.agentType !== "teammate") return {
          data: {
            success: !1,
            message: "Structured team-protocol messages (shutdown/plan responses and requests) are acts of the session itself and cannot be sent by a background subagent. Send a plain text message instead."
          }
        };
      }
      switch (input.message.type) {
        case "shutdown_request":
          return V9p(input.to, input.message.reason, toolCtx);
        case "shutdown_response":
          if (input.message.approve) return K9p(input.message.request_id, toolCtx);
          return z9p(input.message.request_id, input.message.reason);
        case "plan_approval_response":
          if (input.message.approve) return j9p(input.to, input.message.request_id, input.message.feedback, toolCtx);
          return Y9p(input.to, input.message.request_id, input.message.feedback ?? "Plan needs revision", toolCtx);
      }
    },
    renderToolUseMessage: BQa,
    renderToolResultMessage: UQa
  });
});

export {VQa,q9p,W9p,GQa,H5n,G9p,V9p,K9p,z9p,j9p,Y9p,qQa,inFlightTeammateResumes,U9p,WQa,$9p,SendMessageTool,KQa};
