// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {od,RE,A6e} from "../agent/4342_toolUseCount.ts";
import {yS} from "../../vendor/m3824.ts";
import {getAgentName,isTeammate,getTeamName,getTeammateColor,getAgentId,isTeamLead,Am} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {np,aU} from "../config/3875_aU.ts";
import {readTeamFileAsync,BL} from "../../vendor/m3879.ts";
import {Cs,Ph} from "../../vendor/m2224.ts";
import {writeToMailbox,createShutdownRequestMessage,createShutdownApprovedMessage,createShutdownRejectedMessage,Tx,isStructuredProtocolMessage} from "../permissions/3886_writeToMailbox.ts";
import {CYe} from "../../vendor/m1454.ts";
import {Le,Xt,qt} from "../config/0228_encoding.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {jge,YHe} from "../../vendor/m3881.ts";
import {gracefulShutdown,ym} from "../config/3332_flushAnalyticsSinks.ts";
import {xO,eC} from "../../vendor/m717.ts";
import {Fr,Ql} from "../../vendor/m4405.ts";
import {Xr} from "../../vendor/m321.ts";
import {lt,mainAgentId} from "../session/0131_sent.ts";
import {EU} from "../../vendor/m4256.ts";
import {Ri,pi} from "./2227_userFacingName.ts";
import {f4n,I3t} from "../agent/4289_type.ts";
import {zE,r2o} from "../../vendor/m125.ts";
import {WUt,_Da,LY} from "../../vendor/m3871.ts";
import {cb,isAgentSwarmsEnabled} from "../config/3298_isAgentSwarmsEnabled.ts";
import {bt,Se} from "../../vendor/m195.ts";
import {ps} from "../../vendor/m238.ts";
import {sA,oy} from "../../vendor/m2782.ts";
import {bke,rI} from "../../vendor/m3279.ts";
import {ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {yr} from "../config/0740_updateSettingsForSource.ts";
import {d7a,c7a,u7a} from "../../vendor/m4289.ts";
import {D3t,p0e} from "../permissions/4291_agentId.ts";
import {f7a,g7a,p7a,m7a,A7a,h7a} from "../tui/4292_verbose.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {freshFeatureValues} from "./2698_allErrors.ts";
import {$0a,Lge} from "../../vendor/m3865.ts";
import {qtt} from "../config/2700_isKairosCronEnabled.ts";
import {z7} from "../session/1460_promise.ts";
var T7a = {};
isFullscreenWithTTY(T7a, {
  inFlightTeammateResumes: () => inFlightTeammateResumes,
  SendMessageTool: () => SendMessageTool
});
function gMp(appState: any, targetName: any): any {
  let teammates = appState.teamContext?.teammates;
  if (!teammates) return;
  for (let teammate of Object.values(teammates)) if ("name" in teammate && teammate.name === targetName) return teammate.color;
  return;
}
function y7a(toolCtx: any, agentId: any): any {
  let agentCtx = toolCtx.agentContext;
  if (agentCtx?.agentType === "teammate" && agentCtx.agentName) return agentCtx.agentName;
  let appState = toolCtx.getAppState();
  for (let [agentName, registeredId] of appState.agentNameRegistry) if (registeredId === agentId) return agentName;
  let task = appState.tasks[agentId];
  if (od(task)) return task.agentType;
  if (yS(task)) return task.identity.agentName;
  return agentId;
}
function g4n(toolCtx: any): any {
  if (toolCtx.agentId) return y7a(toolCtx, toolCtx.agentId);
  return getAgentName() || (isTeammate() ? "teammate" : np);
}
async function _Mp(recipientName: any, msgText: any, msgSummary: any, toolCtx: any): Promise<any> {
  let appState = toolCtx.getAppState(),
    teamName = getTeamName(appState.teamContext);
  if (!teamName) return {
    data: {
      success: !1,
      message: `No agent named '${recipientName}' is currently addressable. Spawn a new one or use the agent ID.`
    }
  };
  if (recipientName !== np) {
    if (!Object.values(appState.teamContext?.teammates ?? {}).some((teammate: any) => teammate.name === recipientName)) {
      let teamFile = await readTeamFileAsync(teamName);
      if (teamFile !== null && !teamFile.members.some((member: any) => member.name === recipientName)) return {
        data: {
          success: !1,
          message: `No teammate named '${recipientName}' is currently on team '${teamName}'. Spawn one with ${Cs}({name: '${recipientName}'}) — or message the lead to do so.`
        }
      };
    }
  }
  let senderName = g4n(toolCtx),
    senderColor = getTeammateColor();
  await writeToMailbox(recipientName, {
    from: senderName,
    text: msgText,
    summary: msgSummary,
    timestamp: new Date().toISOString(),
    color: senderColor
  }, teamName);
  let targetColor = gMp(appState, recipientName);
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
async function yMp(targetName: any, shutdownReason: any, toolCtx: any): Promise<any> {
  let appState = toolCtx.getAppState(),
    teamName = getTeamName(appState.teamContext),
    senderName = g4n(toolCtx),
    requestId = CYe("shutdown", targetName),
    shutdownMsg = createShutdownRequestMessage({
      requestId: requestId,
      from: senderName,
      reason: shutdownReason
    });
  return await writeToMailbox(targetName, {
    from: senderName,
    text: Le(shutdownMsg),
    timestamp: new Date().toISOString(),
    color: getTeammateColor()
  }, teamName), {
    data: {
      success: !0,
      message: `Shutdown request sent to ${targetName}. Request ID: ${requestId}`,
      request_id: requestId,
      target: targetName
    }
  };
}
async function TMp(requestId: any, toolCtx: any): Promise<any> {
  let teamName = getTeamName(),
    agentId = getAgentId(),
    agentName = getAgentName() || "teammate";
  logForDebugging(`[SendMessageTool] handleShutdownApproval: teamName=${teamName}, agentId=${agentId}, agentName=${agentName}`);
  let tmuxPaneId: any, backendType: any;
  if (teamName) {
    let teamFile = await readTeamFileAsync(teamName);
    if (teamFile && agentId) {
      let member = teamFile.members.find((m: any) => m.agentId === agentId);
      if (member) tmuxPaneId = member.tmuxPaneId, backendType = member.backendType;
    }
  }
  let approvedMsg = createShutdownApprovedMessage({
    requestId: requestId,
    from: agentName,
    paneId: tmuxPaneId,
    backendType: backendType
  });
  if (await writeToMailbox(np, {
    from: agentName,
    text: Le(approvedMsg),
    timestamp: new Date().toISOString(),
    color: getTeammateColor()
  }, teamName), backendType === "in-process") {
    if (logForDebugging(`[SendMessageTool] In-process teammate ${agentName} approving shutdown - signaling abort`), agentId) {
      let appState = toolCtx.getAppState(),
        task = jge(agentId, appState.tasks);
      if (task?.abortController) task.abortController.abort(), logForDebugging(`[SendMessageTool] Aborted controller for in-process teammate ${agentName}`);else logForDebugging(`[SendMessageTool] Warning: Could not find task/abortController for ${agentName}`);
    }
  } else {
    if (agentId) {
      let appState = toolCtx.getAppState(),
        task = jge(agentId, appState.tasks);
      if (task?.abortController) return logForDebugging(`[SendMessageTool] Fallback: Found in-process task for ${agentName} via AppState, aborting`), task.abortController.abort(), {
        data: {
          success: !0,
          message: `Shutdown approved (fallback path). Agent ${agentName} is now exiting.`,
          request_id: requestId
        }
      };
    }
    setImmediate(async () => {
      await gracefulShutdown(0, "other");
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
async function SMp(requestId: any, rejectionReason: any): Promise<any> {
  let teamName = getTeamName(),
    agentName = getAgentName() || "teammate",
    rejectedMsg = createShutdownRejectedMessage({
      requestId: requestId,
      from: agentName,
      reason: rejectionReason
    });
  return await writeToMailbox(np, {
    from: agentName,
    text: Le(rejectedMsg),
    timestamp: new Date().toISOString(),
    color: getTeammateColor()
  }, teamName), {
    data: {
      success: !0,
      message: `Shutdown rejected. Reason: "${rejectionReason}". Continuing to work.`,
      request_id: requestId
    }
  };
}
async function bMp(recipientName: any, requestId: any, planFeedback: any, toolCtx: any): Promise<any> {
  let appState = toolCtx.getAppState(),
    teamName = appState.teamContext?.teamName;
  if (!isTeamLead(appState.teamContext)) throw Error("Only the team lead can approve plans. Teammates cannot approve their own or other plans.");
  let currentMode = xO(Fr(toolCtx).mode),
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
  return await writeToMailbox(recipientName, {
    from: np,
    text: Le(approvalMsg),
    timestamp: new Date().toISOString()
  }, teamName), {
    data: {
      success: !0,
      message: `Plan approved for ${recipientName}. They will receive the approval and can proceed with implementation.`,
      request_id: requestId
    }
  };
}
async function EMp(recipientName: any, requestId: any, planFeedback: any, toolCtx: any): Promise<any> {
  let appState = toolCtx.getAppState(),
    teamName = appState.teamContext?.teamName;
  if (!isTeamLead(appState.teamContext)) throw Error("Only the team lead can reject plans. Teammates cannot reject their own or other plans.");
  let rejectionMsg = {
    type: "plan_approval_response",
    requestId: requestId,
    approved: !1,
    feedback: planFeedback,
    timestamp: new Date().toISOString()
  };
  return await writeToMailbox(recipientName, {
    from: np,
    text: Le(rejectionMsg),
    timestamp: new Date().toISOString()
  }, teamName), {
    data: {
      success: !0,
      message: `Plan rejected for ${recipientName} with feedback: "${planFeedback}"`,
      request_id: requestId
    }
  };
}
var _7a: any, inFlightTeammateResumes: any, AMp: any, hMp: any, SendMessageTool: any;
var S7a = b(() => {
  Xr();
  lt();
  EU();
  Ri();
  YHe();
  RE();
  f4n();
  zE();
  WUt();
  cb();
  Ql();
  qe();
  bt();
  ps();
  ym();
  sA();
  eC();
  bke();
  ja();
  yr();
  Xt();
  aU();
  d7a();
  BL();
  Am();
  Tx();
  Ph();
  D3t();
  f7a();
  g7a();
  _7a = /^[^\n\r]{1,200}$/, inFlightTeammateResumes = new Map(), AMp = we(() => E.discriminatedUnion("type", [E.object({
    type: E.literal("shutdown_request"),
    reason: E.string().optional()
  }), E.object({
    type: E.literal("shutdown_response"),
    request_id: E.string().regex(_7a, "must be the request id being responded to"),
    approve: rI(),
    reason: E.string().optional()
  }), E.object({
    type: E.literal("plan_approval_response"),
    request_id: E.string().regex(_7a, "must be the request id being responded to"),
    approve: rI(),
    feedback: E.string().optional()
  })])), hMp = we(() => E.object({
    to: E.string().describe("Recipient: teammate name"),
    summary: E.string().max(200).optional().describe("A 5-10 word summary shown as a preview in the UI (required when message is a string)"),
    message: E.union([E.string().describe("Plain text message content"), AMp()])
  }));
  SendMessageTool = pi({
    name: freshFeatureValues,
    searchHint: "send messages to agent teammates",
    maxResultSizeChars: 1e5,
    userFacingName() {
      return "SendMessage";
    },
    get inputSchema() {
      return hMp();
    },
    shouldDefer: !0,
    isEnabled() {
      return isAgentSwarmsEnabled();
    },
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
      let parsedAddr = $0a(input.to);
      if ((parsedAddr.scheme === "bridge" || parsedAddr.scheme === "uds") && parsedAddr.target.trim().length === 0) return {
        result: !1,
        message: "address target must not be empty",
        errorCode: 9
      };
      if (!Lge(parsedAddr.target) || !Lge(input.to)) return {
        result: !1,
        message: `'${input.to}' is not a local socket address. Use an address from ${qtt}.`,
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
        if (isStructuredProtocolMessage(input.message)) return {
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
      if (input.message.type === "shutdown_response" && input.to !== np) return {
        result: !1,
        message: `shutdown_response must be sent to "${np}"`,
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
      return p7a;
    },
    async prompt() {
      return m7a();
    },
    mapToolResultToToolResultBlockParam(result: any, toolUseId: any) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: [{
          type: "text",
          text: Le(result)
        }]
      };
    },
    async call(input: any, toolCtx: any, canUseTool: any, callMeta: any) {
      let senderTaskId = toolCtx.agentId,
        senderName = senderTaskId ? y7a(toolCtx, senderTaskId) : void 0,
        msgOrigin = senderTaskId !== void 0 && senderName !== void 0 ? {
          kind: "peer",
          from: senderName,
          senderTaskId: senderTaskId
        } : {
          kind: "coordinator"
        },
        processedMessage = typeof input.message === "string" && senderTaskId !== void 0 && senderName !== void 0 ? _Da(senderName, input.message) : input.message;
      if (typeof input.message === "string" && typeof processedMessage === "string" && input.to === LY) {
        if (senderTaskId === void 0) return {
          data: {
            success: !1,
            message: `You are the main conversation — "${LY}" addresses you. Send to a named agent instead.`
          }
        };
        return oy({
          mode: "prompt",
          agentId: mainAgentId(),
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
          resolvedTaskId = (Object.values(appState.teamContext?.teammates ?? {}).some((tm: any) => tm.name === input.to) ? void 0 : appState.agentNameRegistry.get(input.to)) ?? r2o(input.to);
        if (resolvedTaskId) {
          let task = appState.tasks[resolvedTaskId];
          if (od(task) && !I3t(task)) {
            if (task.status === "running") return A6e(resolvedTaskId, processedMessage, toolCtx.taskRegistry, {
              origin: msgOrigin,
              isMeta: !0
            }), {
              data: {
                success: !0,
                message: `Message queued for delivery to ${input.to} at its next tool round.`
              }
            };
            try {
              let resumeResult = await p0e({
                agentId: resolvedTaskId,
                prompt: processedMessage,
                promptOrigin: msgOrigin,
                toolUseContext: toolCtx,
                canUseTool: canUseTool,
                invokingRequestId: callMeta?.requestId
              });
              return {
                data: {
                  success: !0,
                  message: `Agent "${input.to}" was stopped (${task.status}); resumed it in the background with your message. You'll be notified when it finishes. Output: ${resumeResult.outputFile}`
                }
              };
            } catch (err: any) {
              return {
                data: {
                  success: !1,
                  message: `Agent "${input.to}" is stopped (${task.status}) and could not be resumed: ${Se(err)}`
                }
              };
            }
          } else {
            let inFlightPromise = inFlightTeammateResumes.get(resolvedTaskId);
            if (inFlightPromise) {
              let resolvedId = await inFlightPromise,
                resolvedTask = resolvedId ? toolCtx.getAppState().tasks[resolvedId] : void 0;
              if (resolvedTask && yS(resolvedTask)) return await writeToMailbox(resolvedTask.identity.agentName, {
                from: g4n(toolCtx),
                text: input.message,
                summary: input.summary,
                timestamp: new Date().toISOString(),
                color: getTeammateColor()
              }, resolvedTask.identity.teamName), {
                data: {
                  success: !0,
                  message: `Teammate "${input.to}" is already running; queued your message for its next turn.`
                }
              };
            }
            let deferred = z7();
            inFlightTeammateResumes.set(resolvedTaskId, deferred.promise);
            let agentMeta = null;
            try {
              if (agentMeta = await c7a(resolvedTaskId), agentMeta) {
                let canonicalName = agentMeta.name ?? input.to,
                  canonicalTeam = agentMeta.teamName ?? getTeamName(toolCtx.getAppState().teamContext);
                for (let runningTask of Object.values(toolCtx.getAppState().tasks)) if (yS(runningTask) && runningTask.status === "running" && (runningTask.identity.resumableAgentId === resolvedTaskId || runningTask.identity.agentName === canonicalName && runningTask.identity.teamName === canonicalTeam)) return deferred.resolve(runningTask.id), await writeToMailbox(runningTask.identity.agentName, {
                  from: g4n(toolCtx),
                  text: input.message,
                  summary: input.summary,
                  timestamp: new Date().toISOString(),
                  color: getTeammateColor()
                }, runningTask.identity.teamName), {
                  data: {
                    success: !0,
                    message: `Teammate "${input.to}" is already running; queued your message for its next turn.`
                  }
                };
                let resumeResult = await u7a({
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
              let bgResult = await p0e({
                agentId: resolvedTaskId,
                prompt: processedMessage,
                promptOrigin: msgOrigin,
                toolUseContext: toolCtx,
                canUseTool: canUseTool,
                invokingRequestId: callMeta?.requestId
              });
              return {
                data: {
                  success: !0,
                  message: `Agent "${input.to}" had no active task; resumed from transcript in the background with your message. You'll be notified when it finishes. Output: ${bgResult.outputFile}`
                }
              };
            } catch (err: any) {
              return deferred.resolve(null), {
                data: {
                  success: !1,
                  message: agentMeta ? `Failed to resume teammate "${input.to}": ${Se(err)}` : `Agent "${input.to}" has no transcript to resume. It may have been cleaned up. (${Se(err)})`
                }
              };
            } finally {
              inFlightTeammateResumes.delete(resolvedTaskId);
            }
          }
        }
      }
      if (typeof input.message === "string") return _Mp(input.to, input.message, input.summary, toolCtx);
      if (toolCtx.agentId) {
        let agentTask = toolCtx.getAppState().tasks[toolCtx.agentId];
        if (od(agentTask) || toolCtx.agentContext?.agentType !== "teammate") return {
          data: {
            success: !1,
            message: "Structured team-protocol messages (shutdown/plan responses and requests) are acts of the session itself and cannot be sent by a background subagent. Send a plain text message instead."
          }
        };
      }
      switch (input.message.type) {
        case "shutdown_request":
          return yMp(input.to, input.message.reason, toolCtx);
        case "shutdown_response":
          if (input.message.approve) return TMp(input.message.request_id, toolCtx);
          return SMp(input.message.request_id, input.message.reason);
        case "plan_approval_response":
          if (input.message.approve) return bMp(input.to, input.message.request_id, input.message.feedback, toolCtx);
          return EMp(input.to, input.message.request_id, input.message.feedback ?? "Plan needs revision", toolCtx);
      }
    },
    renderToolUseMessage: A7a,
    renderToolResultMessage: h7a
  });
});
export {T7a,gMp,y7a,g4n,_Mp,yMp,TMp,SMp,bMp,EMp,_7a,inFlightTeammateResumes,AMp,hMp,SendMessageTool,S7a};
