// @ts-nocheck
import {isInProcessTeammate as fF,b2} from "../../vendor/m1462.ts";
import {isTeammate as um,getAgentName as dg,isTeamLead as tO,hasNonLeadTeammate as sFe,isPlanModeRequired as Gkt,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {gc,bo,_t,uo} from "../../vendor/m2468.ts";
import {bz,i4} from "../../vendor/m2426.ts";
import {readUnreadMessages as $qe,isPlanApprovalResponse as Put,markMessagesAsRead as qqe,isPermissionRequest as O9t,isPermissionResponse as Gqe,isSandboxPermissionRequest as T$n,isSandboxPermissionResponse as L9t,isShutdownRequest as Dut,isShutdownApproved as cye,isModeSetRequest as Out,isPlanApprovalRequest as B9t,isTeamPermissionUpdate as cuo,isStructuredProtocolMessage as IB,planApprovalResumeText as $9t,writeToMailbox as Bf,formatTeammateMessages as Iut,Pw} from "../permissions/3902_writeToMailbox.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Dd,wB} from "../config/3893_wB.ts";
import {syncTeammateMode as Bqe,removeTeammateFromTeamFile as Fqe,sL} from "../../vendor/m3897.ts";
import {rl,ri} from "../tools/2235_userFacingName.ts";
import {o9,cx} from "../artifact/4323_cx.ts";
import {Zer,ZFo} from "../../vendor/m5413.ts";
import {fS,po} from "../tools/5224_userPromptCount.ts";
import {e6n,t6n,Npt} from "../core/4210_id.ts";
import {jle,W$t} from "../telemetry/3827_configured_channel.ts";
import {z7a,Gpt,J7a,X7a,Vpt} from "../../vendor/m4218.ts";
import {Zje,zP,fM,Qje,FS} from "../../vendor/m722.ts";
import {adt,gye} from "../permissions/3986_editRemovalVisibility.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {ensureBackendsRegistered as b6n,getBackendByType as _qt,sye} from "../../vendor/m4227.ts";
import {isInsideTmux as fte,hte} from "../../vendor/m3895.ts";
import {dat,oH} from "../agent/3332_id.ts";
import {mS} from "../../vendor/m3842.ts";
import {vut,HB} from "../agent/4331_register.ts";
import {useInterval as zc} from "../../vendor/m2456.ts";
import {setPermissionModeWithGuards as vce,cy} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
/**
 * Resolves the lead agent id / display name for the current team context.
 * Returns undefined when not in a team, or the agent's own name when a teammate.
 */
function onr(state: any): any {
  if (fF()) return;
  if (um()) return dg();
  if (tO(state.teamContext)) {
    if (!sFe(state.teamContext)) return;
    let {
      leadAgentId: leadAgentId,
      teammates: teammates
    } = state.teamContext;
    return teammates[leadAgentId]?.name || "team-lead";
  }
  return;
}

/** Builds a minimal tool descriptor for an unknown/MCP tool name. */
function TWm(toolName: any): any {
  let isMcp = toolName.startsWith("mcp__");
  return {
    name: toolName,
    userFacingName: () => isMcp ? `${toolName} (MCP)` : toolName,
    renderToolUseMessage: () => toolName,
    isMcp: isMcp
  };
}

/**
 * Inbox poller hook: drains the teammate mailbox, routes protocol frames
 * (permission requests/responses, sandbox requests, mode set, plan approval,
 * shutdown) and delivers ordinary messages to the session when idle.
 */
function $ac({
  enabled: enabled,
  isLoading: isLoading,
  focusedInputDialog: focusedInputDialog,
  onSubmitMessage: onSubmitMessage,
  requestDialog: requestDialog
}: any): any {
  let submit = onSubmitMessage,
    store = gc(),
    setState = bo(),
    notificationConfig = bz(),
    pendingPermissionIds = rLe.useRef(new Set()),
    poll = rLe.useCallback(async () => {
      if (!enabled) return;
      let state = store.getState(),
        leadName = onr(state);
      if (!leadName) return;
      let messages = await $qe(leadName, state.teamContext?.teamName);
      if (messages.length === 0) return;
      A(`[InboxPoller] Found ${messages.length} unread message(s)`);
      let planResponseSeen = new Set();
      if (um() && Gkt()) for (let message of messages) {
        let planResponse = Put(message.text);
        if (planResponse && message.from === Dd) {
          if (store.getState().toolPermissionContext.mode !== "plan") {
            A("[InboxPoller] Ignoring plan approval response while not in plan mode");
            continue;
          }
          if (planResponseSeen.add(message), A(`[InboxPoller] Received plan approval response from team-lead: approved=${planResponse.approved}`), planResponse.approved) {
            let inheritedMode = planResponse.permissionMode ?? "default",
              applyResult = XUo(inheritedMode, state.toolPermissionContext, setState);
            if (!applyResult.ok) A(`[InboxPoller] Refusing inherited mode ${inheritedMode} from plan approval: ${applyResult.error}; exiting plan mode to default`, {
              level: "warn"
            }), XUo("default", state.toolPermissionContext, setState);
            await Bqe(applyResult.ok ? applyResult.mode : "default", state.teamContext?.teamName), A(`[InboxPoller] Plan approved by team lead, exited plan mode to ${applyResult.ok ? applyResult.mode : "default"}`);
          } else A(`[InboxPoller] Plan rejected by team lead: ${planResponse.feedback || "No feedback provided"}`);
        } else if (planResponse) A(`[InboxPoller] Ignoring plan approval response from non-team-lead: ${message.from}`);
      }
      let markRead = () => {
          qqe(leadName, state.teamContext?.teamName, messages);
        },
        permissionRequests = [],
        permissionResponses = [],
        sandboxRequests = [],
        sandboxResponses = [],
        shutdownRequests = [],
        shutdownApprovals = [],
        modeSetRequests = [],
        planApprovalRequests = [],
        deliverable = [];
      for (let message of messages) {
        let isPermReq = O9t(message.text),
          isPermResp = Gqe(message.text),
          isSandboxReq = T$n(message.text),
          isSandboxResp = L9t(message.text),
          isShutdownReq = Dut(message.text),
          isShutdownApproved = cye(message.text),
          isModeSet = Out(message.text),
          isPlanReq = B9t(message.text);
        if (isPermReq) permissionRequests.push(message);else if (isPermResp) permissionResponses.push(message);else if (isSandboxReq) sandboxRequests.push(message);else if (isSandboxResp) sandboxResponses.push(message);else if (isShutdownReq) shutdownRequests.push(message);else if (isShutdownApproved) shutdownApprovals.push(message);else if (cuo(message.text)) A("[InboxPoller] Dropping team_permission_update message: permission rules are never accepted from the inbox", {
          level: "warn"
        });else if (isModeSet) modeSetRequests.push(message);else if (isPlanReq) planApprovalRequests.push(message);else if (IB(message.text)) {
          let planResponse = Put(message.text);
          if (planResponse && planResponseSeen.has(message)) deliverable.push({
            ...message,
            text: $9t(planResponse)
          });else A(`[InboxPoller] Dropping unrouted protocol frame from ${message.from}: ${message.text.substring(0, 80)}`, {
            level: "warn"
          });
        } else deliverable.push(message);
      }
      if (permissionRequests.length > 0 && tO(state.teamContext)) {
        A(`[InboxPoller] Found ${permissionRequests.length} permission request(s)`);
        let teamName = state.teamContext?.teamName;
        for (let message of permissionRequests) {
          let permReq = O9t(message.text);
          if (!permReq) continue;
          if (pendingPermissionIds.current.has(permReq.request_id)) continue;
          pendingPermissionIds.current.add(permReq.request_id);
          let tool = rl(o9(), permReq.tool_name) ?? TWm(permReq.tool_name),
            {
              dialog: dialog,
              descriptor: descriptor
            } = await Zer({
              tool: tool,
              input: permReq.input,
              description: permReq.description,
              toolUseID: permReq.tool_use_id,
              permissionResult: {
                behavior: "ask",
                message: permReq.description
              },
              assistantMessage: fS({
                content: ""
              }),
              theme: "dark",
              requestSource: {
                type: "subagent",
                agentName: permReq.agent_id
              },
              toolPermissionContext: state.toolPermissionContext
            });
          requestDialog(dialog, descriptor, {
            queueBehind: !0
          }).then(result => {
            switch (pendingPermissionIds.current.delete(permReq.request_id), result.behavior) {
              case "allow":
                e6n(permReq.agent_id, {
                  decision: "approved",
                  resolvedBy: "leader",
                  updatedInput: result.updatedInput,
                  permissionUpdates: result.permissionUpdates
                }, permReq.request_id, teamName);
                return;
              case "deny":
                e6n(permReq.agent_id, {
                  decision: "rejected",
                  resolvedBy: "leader",
                  feedback: result.feedback
                }, permReq.request_id, teamName);
                return;
              case "cancelled":
                e6n(permReq.agent_id, {
                  decision: "rejected",
                  resolvedBy: "leader"
                }, permReq.request_id, teamName);
                return;
            }
          });
        }
        let firstReq = O9t(permissionRequests[0]?.text ?? "");
        if (firstReq && !isLoading && !focusedInputDialog) jle({
          message: `${firstReq.agent_id} needs permission for ${firstReq.tool_name}`,
          notificationType: "worker_permission_prompt"
        }, notificationConfig);
      }
      if (permissionResponses.length > 0 && um()) {
        A(`[InboxPoller] Found ${permissionResponses.length} permission response(s)`);
        for (let message of permissionResponses) {
          let permResp = Gqe(message.text);
          if (!permResp) continue;
          if (message.from !== Dd) {
            A(`[InboxPoller] Ignoring permission response from non-team-lead: ${message.from}`, {
              level: "warn"
            });
            continue;
          }
          if (z7a(permResp.request_id)) if (A(`[InboxPoller] Processing permission response for ${permResp.request_id}: ${permResp.subtype}`), permResp.subtype === "success") Gpt({
            requestId: permResp.request_id,
            decision: "approved",
            updatedInput: permResp.response?.updated_input,
            permissionUpdates: permResp.response?.permission_updates
          });else Gpt({
            requestId: permResp.request_id,
            decision: "rejected",
            feedback: permResp.error
          });
        }
      }
      if (sandboxRequests.length > 0 && tO(state.teamContext)) {
        A(`[InboxPoller] Found ${sandboxRequests.length} sandbox permission request(s)`);
        let {
            mode: mode,
            isBypassPermissionsModeAvailable: isBypassAvailable
          } = state.toolPermissionContext,
          autoDecision = Zje(mode, isBypassAvailable),
          teamName = state.teamContext?.teamName;
        async function resolveHost(host: any): Promise<any> {
          switch (autoDecision) {
            case "allow":
              return !0;
            case "deny":
              return !1;
            case "classify":
              return adt(host, void 0, [], o9(), state.toolPermissionContext, new AbortController().signal, {
                isSubagentLoop: !1
              });
            case "ask":
              return null;
          }
        }
        let queued = [];
        for (let message of sandboxRequests) {
          let sandboxReq = T$n(message.text);
          if (!sandboxReq) continue;
          if (!sandboxReq.hostPattern?.host) {
            A("[InboxPoller] Invalid sandbox permission request: missing hostPattern.host");
            continue;
          }
          let decision = await resolveHost(sandboxReq.hostPattern.host);
          if (decision !== null) {
            A(`[InboxPoller] Auto-resolving sandbox request ${sandboxReq.requestId} (mode=${mode}, allow=${decision})`), t6n(sandboxReq.workerName, sandboxReq.requestId, sandboxReq.hostPattern.host, decision, teamName);
            continue;
          }
          queued.push({
            requestId: sandboxReq.requestId,
            workerId: sandboxReq.workerId,
            workerName: sandboxReq.workerName,
            workerColor: sandboxReq.workerColor,
            host: sandboxReq.hostPattern.host,
            createdAt: sandboxReq.createdAt
          });
        }
        if (queued.length > 0) {
          setState(prev => ({
            ...prev,
            workerSandboxPermissions: {
              ...prev.workerSandboxPermissions,
              queue: [...prev.workerSandboxPermissions.queue, ...queued]
            }
          }));
          let first = queued[0];
          if (first && !isLoading && !focusedInputDialog) jle({
            message: `${first.workerName} needs network access to ${first.host}`,
            notificationType: "worker_permission_prompt"
          }, notificationConfig);
        }
      }
      if (sandboxResponses.length > 0 && um()) {
        A(`[InboxPoller] Found ${sandboxResponses.length} sandbox permission response(s)`);
        for (let message of sandboxResponses) {
          let sandboxResp = L9t(message.text);
          if (!sandboxResp) continue;
          if (message.from !== Dd) {
            A(`[InboxPoller] Ignoring sandbox permission response from non-team-lead: ${message.from}`, {
              level: "warn"
            });
            continue;
          }
          if (J7a(sandboxResp.requestId)) A(`[InboxPoller] Processing sandbox permission response for ${sandboxResp.requestId}: allow=${sandboxResp.allow}`), X7a({
            requestId: sandboxResp.requestId,
            host: sandboxResp.host,
            allow: sandboxResp.allow
          }), setState(prev => ({
            ...prev,
            pendingSandboxRequest: null
          }));
        }
      }
      if (modeSetRequests.length > 0 && um()) {
        A(`[InboxPoller] Found ${modeSetRequests.length} mode set request(s)`);
        for (let message of modeSetRequests) {
          if (message.from !== Dd) {
            A(`[InboxPoller] Ignoring mode set request from non-team-lead: ${message.from}`);
            continue;
          }
          let modeSet = Out(message.text);
          if (!modeSet) {
            A(`[InboxPoller] Failed to parse mode set request: ${message.text.substring(0, 100)}`);
            continue;
          }
          A(`[InboxPoller] Applying mode change from team-lead: ${modeSet.mode}`);
          let applyResult = XUo(modeSet.mode, state.toolPermissionContext, setState),
            teamName = state.teamContext?.teamName;
          if (!applyResult.ok) {
            A(`[InboxPoller] Refusing mode set request for ${modeSet.mode}: ${applyResult.error}`, {
              level: "warn"
            }), await Bqe(zP(store.getState().toolPermissionContext.mode), teamName);
            continue;
          }
          await Bqe(applyResult.mode, teamName);
        }
      }
      if (planApprovalRequests.length > 0 && tO(state.teamContext)) {
        A(`[InboxPoller] Found ${planApprovalRequests.length} plan approval request(s), auto-approving`);
        let teamName = state.teamContext?.teamName,
          currentMode = zP(state.toolPermissionContext.mode),
          inheritMode = currentMode === "plan" ? "default" : currentMode;
        for (let message of planApprovalRequests) {
          let planReq = B9t(message.text);
          if (!planReq) continue;
          let response = {
            type: "plan_approval_response",
            requestId: planReq.requestId,
            approved: !0,
            timestamp: new Date().toISOString(),
            permissionMode: inheritMode
          };
          Bf(message.from, {
            from: Dd,
            text: Pe(response),
            timestamp: new Date().toISOString()
          }, teamName), A(`[InboxPoller] Auto-approved plan from ${message.from} (request ${planReq.requestId})`), deliverable.push(message);
        }
      }
      if (shutdownRequests.length > 0 && um()) {
        A(`[InboxPoller] Found ${shutdownRequests.length} shutdown request(s)`);
        for (let message of shutdownRequests) deliverable.push(message);
      }
      if (shutdownApprovals.length > 0 && tO(state.teamContext)) {
        A(`[InboxPoller] Found ${shutdownApprovals.length} shutdown approval(s)`);
        for (let message of shutdownApprovals) {
          let approval = cye(message.text);
          if (!approval) continue;
          if (approval.paneId && approval.backendType) (async () => {
            try {
              await b6n();
              let insideTmux = await fte(),
                killResult = await _qt(approval.backendType)?.killPane(approval.paneId, !insideTmux);
              A(`[InboxPoller] Killed pane ${approval.paneId} for ${approval.from}: ${killResult}`);
            } catch (err) {
              A(`[InboxPoller] Failed to kill pane for ${approval.from}: ${err}`);
            }
          })();
          let fromName = approval.from;
          if (fromName && state.teamContext?.teammates) {
            let agentId = Object.entries(state.teamContext.teammates).find(([, teammate]: any) => teammate.name === fromName)?.[0];
            if (agentId) {
              let teamName = state.teamContext?.teamName;
              if (teamName) Fqe(teamName, {
                agentId: agentId,
                name: fromName
              });
              let {
                notificationMessage: notificationMessage
              } = teamName ? await dat(teamName, agentId, fromName, "shutdown") : {
                notificationMessage: `${fromName} has shut down.`
              };
              setState(prev => {
                if (!prev.teamContext?.teammates) return prev;
                if (!(agentId in prev.teamContext.teammates)) return prev;
                let {
                    [agentId]: removed,
                    ...remainingTeammates
                  } = prev.teamContext.teammates,
                  tasks = {
                    ...prev.tasks
                  };
                for (let [taskId, task] of Object.entries(tasks)) if (mS(task) && task.identity.agentId === agentId) tasks[taskId] = {
                  ...task,
                  status: "completed",
                  endTime: Date.now(),
                  notified: !0,
                  evictAfter: Date.now() + vut
                };
                return {
                  ...prev,
                  tasks: tasks,
                  teamContext: {
                    ...prev.teamContext,
                    teammates: remainingTeammates
                  },
                  inbox: {
                    messages: [...prev.inbox.messages, {
                      id: QUo.randomUUID(),
                      from: "system",
                      text: Pe({
                        type: "teammate_terminated",
                        message: notificationMessage
                      }),
                      timestamp: new Date().toISOString(),
                      status: "pending"
                    }]
                  }
                };
              }), A(`[InboxPoller] Removed ${fromName} (${agentId}) from teamContext`);
            }
          }
          deliverable.push(message);
        }
      }
      if (deliverable.length === 0) {
        markRead();
        return;
      }
      let formatted = Iut(deliverable, {
          recipientIsLead: tO(state.teamContext)
        }),
        queueForLater = () => {
          setState(prev => ({
            ...prev,
            inbox: {
              messages: [...prev.inbox.messages, ...deliverable.map(message => ({
                id: QUo.randomUUID(),
                from: message.from,
                text: message.text,
                timestamp: message.timestamp,
                status: "pending",
                color: message.color,
                summary: message.summary
              }))]
            }
          }));
        };
      if (!isLoading && !focusedInputDialog) {
        if (A("[InboxPoller] Session idle, submitting immediately"), !submit(formatted)) A("[InboxPoller] Submission rejected, queuing for later delivery"), queueForLater();
      } else A("[InboxPoller] Session busy, queuing for later delivery"), queueForLater();
      markRead();
    }, [enabled, isLoading, focusedInputDialog, submit, setState, notificationConfig, store, requestDialog]);
  rLe.useEffect(() => {
    if (!enabled) return;
    if (isLoading || focusedInputDialog) return;
    let state = store.getState();
    if (!onr(state)) return;
    let pending = state.inbox.messages.filter(message => message.status === "pending"),
      processed = state.inbox.messages.filter(message => message.status === "processed");
    if (processed.length > 0) {
      A(`[InboxPoller] Cleaning up ${processed.length} processed message(s) that were delivered mid-turn`);
      let processedIds = new Set(processed.map(message => message.id));
      setState(prev => ({
        ...prev,
        inbox: {
          messages: prev.inbox.messages.filter(message => !processedIds.has(message.id))
        }
      }));
    }
    if (pending.length === 0) return;
    A(`[InboxPoller] Session idle, delivering ${pending.length} pending message(s)`);
    let formatted = Iut(pending, {
      recipientIsLead: tO(state.teamContext)
    });
    if (submit(formatted)) {
      let pendingIds = new Set(pending.map(message => message.id));
      setState(prev => ({
        ...prev,
        inbox: {
          messages: prev.inbox.messages.filter(message => !pendingIds.has(message.id))
        }
      }));
    } else A("[InboxPoller] Submission rejected, keeping messages queued");
  }, [enabled, isLoading, focusedInputDialog, submit, setState, store]);
  let hasLead = _t(state => !!onr(state));
  zc(() => void poll(), enabled && hasLead ? yWm : null);
  let didInitialPoll = rLe.useRef(!1);
  rLe.useEffect(() => {
    if (!enabled) return;
    if (didInitialPoll.current) return;
    if (onr(store.getState())) didInitialPoll.current = !0, poll();
  }, [enabled, poll, store]);
}

/**
 * Applies a permission mode (resolving plan->default fallback and the
 * bypass-permissions availability flag) via the guarded state setter.
 */
function XUo(requestedMode: any, toolPermissionContext: any, setState: any): any {
  let normalized = fM(requestedMode),
    resolvedMode = Qje(normalized) ? normalized : fM(zP(normalized)),
    isBypass = resolvedMode === "bypassPermissions",
    result = vce(resolvedMode, isBypass ? {
      ...toolPermissionContext,
      isBypassPermissionsModeAvailable: !0
    } : toolPermissionContext, applyUpdate => setState(prev => {
      let ctx = prev.toolPermissionContext,
        nextCtx = ctx.isBypassPermissionsModeAvailable === isBypass ? ctx : {
          ...ctx,
          isBypassPermissionsModeAvailable: isBypass
        },
        updated = applyUpdate(nextCtx);
      return updated === ctx ? prev : {
        ...prev,
        toolPermissionContext: updated
      };
    }));
  return result.ok ? {
    ok: !0,
    mode: resolvedMode
  } : result;
}
var QUo: any,
  rLe: any,
  yWm = 1000;
var qac = b(() => {
  ZFo();
  i4();
  je();
  W$t();
  uo();
  ri();
  cx();
  qe();
  po();
  FS();
  cy();
  gye();
  tn();
  hte();
  sye();
  wB();
  Npt();
  sL();
  HB();
  oH();
  Op();
  b2();
  Pw();
  Vpt();
  QUo = require("crypto"), rLe = x(et(), 1);
});

export {onr,TWm,$ac,XUo,QUo,rLe,yWm,qac};
