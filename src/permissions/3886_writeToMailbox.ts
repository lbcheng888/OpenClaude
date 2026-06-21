// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {getTeamName as Nm,getAgentName as tg,getTeammateColor as FR,Am as Sf} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {ust as Wot,Nk as Ok} from "../agent/3316_id.ts";
import {GTe,sn as an} from "../config/0047_namespace.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {ci as oi,pT as iT} from "../../vendor/m1289.ts";
import {qt as Wt,Le as Oe,Xt} from "../config/0228_encoding.ts";
import {dn as ln,bt as St} from "../../vendor/m195.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {Mg as Fg} from "../../vendor/m1474.ts";
import {Wn as Gn} from "../api/0459_getOauthConfig.ts";
import {Tp as Sp,xnt as unt,QH as KH} from "../../vendor/m2784.ts";
import {SB as pB,initKp as Dp} from "../../vendor/m609.ts";
import {n2t as LUt,vlt as rlt} from "../../vendor/m3882.ts";
import {np as qp,aU as eU} from "../config/3875_aU.ts";
import {CYe as iYe} from "../../vendor/m1454.ts";
import {freshFeatureValues as Yg} from "../tools/2698_allErrors.ts";
import {Xr} from "../../vendor/m321.ts";
import {Sso as Eoo,NY as pte} from "./3885_inputTokens.ts";
import {we as Re} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
// @ts-nocheck
var un8 = {};
pt(un8, {
  writeToMailbox: () => writeToMailbox,
  sendShutdownRequestToMailbox: () => sendShutdownRequestToMailbox,
  readUnreadMessages: () => readUnreadMessages,
  readMailbox: () => readMailbox,
  planApprovalResumeText: () => planApprovalResumeText,
  parseFrameForDisplay: () => parseFrameForDisplay,
  messageIdentityKey: () => messageIdentityKey,
  markSingleMessageAsRead: () => markSingleMessageAsRead,
  markMessagesAsReadByPredicate: () => markMessagesAsReadByPredicate,
  markMessagesAsRead: () => markMessagesAsRead,
  isTeamPermissionUpdate: () => isTeamPermissionUpdate,
  isTaskAssignment: () => isTaskAssignment,
  isStructuredProtocolMessage: () => isStructuredProtocolMessage,
  isShutdownRequest: () => isShutdownRequest,
  isShutdownApproved: () => isShutdownApproved,
  isSandboxPermissionResponse: () => isSandboxPermissionResponse,
  isSandboxPermissionRequest: () => isSandboxPermissionRequest,
  isPlanApprovalResponse: () => isPlanApprovalResponse,
  isPlanApprovalRequest: () => isPlanApprovalRequest,
  isPermissionResponse: () => isPermissionResponse,
  isPermissionRequest: () => isPermissionRequest,
  isModeSetRequest: () => isModeSetRequest,
  isIdleNotification: () => isIdleNotification,
  isHeadlessLeadDisplayableMessage: () => isHeadlessLeadDisplayableMessage,
  getLastPeerDmSummary: () => getLastPeerDmSummary,
  getInboxPath: () => getInboxPath,
  formatTeammateMessages: () => formatTeammateMessages,
  formatTeammateMessage: () => formatTeammateMessage,
  createShutdownRequestMessage: () => createShutdownRequestMessage,
  createShutdownRejectedMessage: () => createShutdownRejectedMessage,
  createShutdownApprovedMessage: () => createShutdownApprovedMessage,
  createSandboxPermissionResponseMessage: () => createSandboxPermissionResponseMessage,
  createSandboxPermissionRequestMessage: () => createSandboxPermissionRequestMessage,
  createPermissionResponseMessage: () => createPermissionResponseMessage,
  createPermissionRequestMessage: () => createPermissionRequestMessage,
  createModeSetRequestMessage: () => createModeSetRequestMessage,
  createIdleNotification: () => createIdleNotification,
  clearMailbox: () => clearMailbox,
  TeammateTerminatedMessageSchema: () => TeammateTerminatedMessageSchema,
  TaskCompletedMessageSchema: () => TaskCompletedMessageSchema,
  TaskAssignmentMessageSchema: () => TaskAssignmentMessageSchema,
  ShutdownRequestMessageSchema: () => ShutdownRequestMessageSchema,
  ShutdownRejectedMessageSchema: () => ShutdownRejectedMessageSchema,
  ShutdownApprovedMessageSchema: () => ShutdownApprovedMessageSchema,
  PlanApprovalResponseMessageSchema: () => PlanApprovalResponseMessageSchema,
  PlanApprovalRequestMessageSchema: () => PlanApprovalRequestMessageSchema,
  PROTOCOL_FRAME_PROMPT_ERROR: () => PROTOCOL_FRAME_PROMPT_ERROR,
  ModeSetRequestMessageSchema: () => ModeSetRequestMessageSchema,
  IdleNotificationMessageSchema: () => IdleNotificationMessageSchema
});
function getInboxPath(agentName, teamName) {
  let resolvedTeam = teamName || Nm() || "default",
    teamSlug = Wot(resolvedTeam),
    agentSlug = Wot(agentName),
    inboxesDir = hZ6.join(GTe(), teamSlug, "inboxes"),
    inboxPath = hZ6.join(inboxesDir, `${agentSlug}.json`);
  return v(`[TeammateMailbox] getInboxPath: agent=${agentName}, team=${resolvedTeam}, fullPath=${inboxPath}`), inboxPath;
}
async function ensureInboxDir(teamName) {
  let resolvedTeam = teamName || Nm() || "default",
    teamSlug = Wot(resolvedTeam),
    inboxesDir = hZ6.join(GTe(), teamSlug, "inboxes");
  await oi().mkdir(inboxesDir), v(`[TeammateMailbox] Ensured inbox directory: ${inboxesDir}`);
}
async function readMailbox(agentName, teamName) {
  let inboxPath = getInboxPath(agentName, teamName);
  v(`[TeammateMailbox] readMailbox: path=${inboxPath}`);
  try {
    let raw = await oi().read(inboxPath),
      messages = Wt(raw);
    for (let message of messages) if (message && message.type === undefined) message.type = "message";
    return v(`[TeammateMailbox] readMailbox: read ${messages.length} message(s)`), messages;
  } catch (error) {
    if (ln(error) === "ENOENT") return v("[TeammateMailbox] readMailbox: file does not exist"), [];
    if (error instanceof SyntaxError) return v(`[TeammateMailbox] readMailbox: unparseable inbox, treating as empty: ${error}`), [];
    return v(`Failed to read inbox for ${agentName}: ${error}`), Ie(error), [];
  }
}
async function readUnreadMessages(agentName, teamName) {
  let messages = await readMailbox(agentName, teamName),
    unread = messages.filter(message => !message.read);
  return v(`[TeammateMailbox] readUnreadMessages: ${unread.length} unread of ${messages.length} total`), unread;
}
async function writeToMailbox(recipient, message, teamName) {
  await ensureInboxDir(teamName);
  let inboxPath = getInboxPath(recipient, teamName),
    lockfilePath = `${inboxPath}.lock`;
  v(`[TeammateMailbox] writeToMailbox: recipient=${recipient}, from=${message.from}, path=${inboxPath}`);
  try {
    await oi().writeExclusive(inboxPath, "[]"), v("[TeammateMailbox] writeToMailbox: created new inbox file");
  } catch (createError) {
    if (ln(createError) !== "EEXIST") {
      v(`[TeammateMailbox] writeToMailbox: failed to create inbox file: ${createError}`), Ie(createError);
      return;
    }
  }
  let releaseLock;
  try {
    releaseLock = await Fg(inboxPath, {
      lockfilePath: lockfilePath,
      ...lV_
    });
    let messages = await readMailbox(recipient, teamName),
      entry = {
        ...message,
        type: "message",
        read: false
      };
    messages.push(entry), await oi().atomicWrite(inboxPath, Oe(messages, null, 2)), v(`[TeammateMailbox] Wrote message to ${recipient}'s inbox from ${message.from}`);
  } catch (writeError) {
    v(`Failed to write to inbox for ${recipient}: ${writeError}`), Ie(writeError);
  } finally {
    if (releaseLock) await releaseLock();
  }
}
async function markSingleMessageAsRead(agentName, teamName, target) {
  let inboxPath = getInboxPath(agentName, teamName);
  v(`[TeammateMailbox] markSingleMessageAsRead called: agentName=${agentName}, teamName=${teamName}, target=${target.from}@${target.timestamp}, path=${inboxPath}`);
  let lockfilePath = `${inboxPath}.lock`,
    releaseLock;
  try {
    releaseLock = await Fg(inboxPath, {
      lockfilePath: lockfilePath,
      ...lV_
    });
    let messages = await readMailbox(agentName, teamName),
      targetIndex = messages.findIndex(message => !message.read && message.from === target.from && message.timestamp === target.timestamp && message.text === target.text);
    if (targetIndex !== -1) messages.splice(targetIndex, 1);
    let remainingUnread = messages.filter(message => !message.read);
    await oi().atomicWrite(inboxPath, Oe(remainingUnread, null, 2)), v(`[TeammateMailbox] markSingleMessageAsRead: dropped target (${targetIndex === -1 ? "not found" : "found"}); ${remainingUnread.length} remain at ${inboxPath}`);
  } catch (error) {
    if (ln(error) === "ENOENT") {
      v(`[TeammateMailbox] markSingleMessageAsRead: file does not exist at ${inboxPath}`);
      return;
    }
    v(`[TeammateMailbox] markSingleMessageAsRead FAILED for ${agentName}: ${error}`), Ie(error);
  } finally {
    if (releaseLock) await releaseLock();
  }
}
function messageIdentityKey(message) {
  return `${message.from}|${message.timestamp}|${message.text}`;
}
async function markMessagesAsRead(agentName, teamName, delivered) {
  let inboxPath = getInboxPath(agentName, teamName);
  v(`[TeammateMailbox] markMessagesAsRead called: agentName=${agentName}, teamName=${teamName}, path=${inboxPath}`);
  let lockfilePath = `${inboxPath}.lock`,
    releaseLock;
  try {
    v("[TeammateMailbox] markMessagesAsRead: acquiring lock..."), releaseLock = await Fg(inboxPath, {
      lockfilePath: lockfilePath,
      ...lV_
    }), v("[TeammateMailbox] markMessagesAsRead: lock acquired");
    let messages = await readMailbox(agentName, teamName);
    if (v(`[TeammateMailbox] markMessagesAsRead: read ${messages.length} messages after lock`), messages.length === 0) {
      v("[TeammateMailbox] markMessagesAsRead: no messages to mark");
      return;
    }
    let unreadCount = Gn(messages, message => !message.read);
    v(`[TeammateMailbox] markMessagesAsRead: ${unreadCount} unread of ${messages.length} total`);
    let deliveredKeys = delivered === undefined ? null : new Set(delivered.map(messageIdentityKey)),
      remaining = messages.filter(message => !message.read && deliveredKeys !== null && !deliveredKeys.has(messageIdentityKey(message)));
    await oi().atomicWrite(inboxPath, Oe(remaining, null, 2)), v(`[TeammateMailbox] markMessagesAsRead: pruned ${messages.length - remaining.length} delivered message(s), ${remaining.length} remain at ${inboxPath}`);
  } catch (error) {
    if (ln(error) === "ENOENT") {
      v(`[TeammateMailbox] markMessagesAsRead: file does not exist at ${inboxPath}`);
      return;
    }
    v(`[TeammateMailbox] markMessagesAsRead FAILED for ${agentName}: ${error}`), Ie(error);
  } finally {
    if (releaseLock) await releaseLock(), v("[TeammateMailbox] markMessagesAsRead: lock released");
  }
}
async function clearMailbox(agentName, teamName) {
  let inboxPath = getInboxPath(agentName, teamName),
    lockfilePath = `${inboxPath}.lock`,
    releaseLock;
  try {
    releaseLock = await Fg(inboxPath, {
      lockfilePath: lockfilePath,
      ...lV_
    }), await oi().atomicWrite(inboxPath, "[]"), v(`[TeammateMailbox] Cleared inbox for ${agentName}`);
  } catch (error) {
    if (ln(error) === "ENOENT") return;
    v(`Failed to clear inbox for ${agentName}: ${error}`), Ie(error);
  } finally {
    await releaseLock?.();
  }
}
function formatTeammateMessage(message) {
  let colorAttr = message.color ? ` color="${Sp(message.color)}"` : "",
    summaryAttr = message.summary ? ` summary="${Sp(message.summary)}"` : "",
    body = unt(pB, message.text);
  return `<${pB} teammate_id="${Sp(message.from)}"${colorAttr}${summaryAttr}>
${body}
</${pB}>`;
}
function formatTeammateMessages(messages, options) {
  let rendered = messages.map(formatTeammateMessage).join(`

`);
  return options.recipientIsLead ? LUt(rendered, {
    midTurn: false
  }) : rendered;
}
function createIdleNotification(agentName, details) {
  return {
    type: "idle_notification",
    from: agentName,
    timestamp: new Date().toISOString(),
    idleReason: details?.idleReason,
    summary: details?.summary,
    completedTaskId: details?.completedTaskId,
    completedStatus: details?.completedStatus,
    failureReason: details?.failureReason
  };
}
function isIdleNotification(text) {
  try {
    let parsed = Wt(text);
    if (parsed && parsed.type === "idle_notification") return parsed;
  } catch {}
  return null;
}
function createPermissionRequestMessage(request) {
  return {
    type: "permission_request",
    request_id: request.request_id,
    agent_id: request.agent_id,
    tool_name: request.tool_name,
    tool_use_id: request.tool_use_id,
    description: request.description,
    input: request.input,
    permission_suggestions: request.permission_suggestions || []
  };
}
function createPermissionResponseMessage(response) {
  if (response.subtype === "error") return {
    type: "permission_response",
    request_id: response.request_id,
    subtype: "error",
    error: response.error || "Permission denied"
  };
  return {
    type: "permission_response",
    request_id: response.request_id,
    subtype: "success",
    response: {
      updated_input: response.updated_input,
      permission_updates: response.permission_updates
    }
  };
}
function isPermissionRequest(text) {
  try {
    let parsed = Wt(text);
    if (parsed && parsed.type === "permission_request") return parsed;
  } catch {}
  return null;
}
function isPermissionResponse(text) {
  try {
    let parsed = Wt(text);
    if (parsed && parsed.type === "permission_response") return parsed;
  } catch {}
  return null;
}
function createSandboxPermissionRequestMessage(request) {
  return {
    type: "sandbox_permission_request",
    requestId: request.requestId,
    workerId: request.workerId,
    workerName: request.workerName,
    workerColor: request.workerColor,
    hostPattern: {
      host: request.host
    },
    createdAt: Date.now()
  };
}
function createSandboxPermissionResponseMessage(response) {
  return {
    type: "sandbox_permission_response",
    requestId: response.requestId,
    host: response.host,
    allow: response.allow,
    timestamp: new Date().toISOString()
  };
}
function isSandboxPermissionRequest(text) {
  try {
    let parsed = Wt(text);
    if (parsed && parsed.type === "sandbox_permission_request") return parsed;
  } catch {}
  return null;
}
function isSandboxPermissionResponse(text) {
  try {
    let parsed = Wt(text);
    if (parsed && parsed.type === "sandbox_permission_response") return parsed;
  } catch {}
  return null;
}
function createShutdownRequestMessage(request) {
  return {
    type: "shutdown_request",
    requestId: request.requestId,
    from: request.from,
    reason: request.reason,
    timestamp: new Date().toISOString()
  };
}
function createShutdownApprovedMessage(approval) {
  return {
    type: "shutdown_approved",
    requestId: approval.requestId,
    from: approval.from,
    timestamp: new Date().toISOString(),
    paneId: approval.paneId,
    backendType: approval.backendType
  };
}
function createShutdownRejectedMessage(rejection) {
  return {
    type: "shutdown_rejected",
    requestId: rejection.requestId,
    from: rejection.from,
    reason: rejection.reason,
    timestamp: new Date().toISOString()
  };
}
async function sendShutdownRequestToMailbox(target, teamName, reason) {
  let resolvedTeam = teamName || Nm(),
    sender = tg() || qp,
    requestId = iYe("shutdown", target),
    shutdownFrame = createShutdownRequestMessage({
      requestId: requestId,
      from: sender,
      reason: reason
    });
  return await writeToMailbox(target, {
    from: sender,
    text: Oe(shutdownFrame),
    timestamp: new Date().toISOString(),
    color: FR()
  }, resolvedTeam), {
    requestId: requestId,
    target: target
  };
}
function isShutdownRequest(text) {
  try {
    let result = ShutdownRequestMessageSchema().safeParse(Wt(text));
    if (result.success) return result.data;
  } catch {}
  return null;
}
function isPlanApprovalRequest(text) {
  try {
    let result = PlanApprovalRequestMessageSchema().safeParse(Wt(text));
    if (result.success) return result.data;
  } catch {}
  return null;
}
function isShutdownApproved(text) {
  try {
    let result = ShutdownApprovedMessageSchema().safeParse(Wt(text));
    if (result.success) return result.data;
  } catch {}
  return null;
}
function isPlanApprovalResponse(text) {
  try {
    let result = PlanApprovalResponseMessageSchema().safeParse(Wt(text));
    if (result.success) return result.data;
  } catch {}
  return null;
}
function isTaskAssignment(text) {
  return parseFrameForDisplay(TaskAssignmentMessageSchema(), text);
}
function parseFrameForDisplay(schema, text) {
  try {
    let result = schema.strict().safeParse(Wt(text));
    if (result.success) return result.data;
  } catch {}
  return null;
}
function isTeamPermissionUpdate(text) {
  try {
    let parsed = Wt(text);
    return !!parsed && parsed.type === "team_permission_update";
  } catch {
    return false;
  }
}
function createModeSetRequestMessage(request) {
  return {
    type: "mode_set_request",
    mode: request.mode,
    from: request.from
  };
}
function isModeSetRequest(text) {
  try {
    let result = ModeSetRequestMessageSchema().safeParse(Wt(text));
    if (result.success) return result.data;
  } catch {}
  return null;
}
function isStructuredProtocolMessage(text) {
  try {
    let parsed = Wt(text);
    if (!parsed || typeof parsed !== "object" || !("type" in parsed)) return false;
    let frameType = parsed.type;
    return frameType === "permission_request" || frameType === "permission_response" || frameType === "sandbox_permission_request" || frameType === "sandbox_permission_response" || frameType === "shutdown_request" || frameType === "shutdown_approved" || frameType === "team_permission_update" || frameType === "mode_set_request" || frameType === "plan_approval_request" || frameType === "plan_approval_response";
  } catch {
    return false;
  }
}
function planApprovalResumeText(decision) {
  if (decision.approved) return decision.feedback ? `[Plan Approved] ${decision.feedback}` : "[Plan Approved] You can now proceed with implementation";
  return `[Plan Rejected] ${decision.feedback || "Please revise your plan"}`;
}
function isHeadlessLeadDisplayableMessage(text) {
  return !isStructuredProtocolMessage(text) || isShutdownApproved(text) !== null || isShutdownRequest(text) !== null || isPlanApprovalRequest(text) !== null;
}
async function markMessagesAsReadByPredicate(agentName, predicate, teamName) {
  let inboxPath = getInboxPath(agentName, teamName),
    lockfilePath = `${inboxPath}.lock`,
    releaseLock;
  try {
    releaseLock = await Fg(inboxPath, {
      lockfilePath: lockfilePath,
      ...lV_
    });
    let messages = await readMailbox(agentName, teamName);
    if (messages.length === 0) return;
    let remaining = messages.filter(message => !message.read && !predicate(message));
    await oi().atomicWrite(inboxPath, Oe(remaining, null, 2));
  } catch (error) {
    if (ln(error) === "ENOENT") return;
    Ie(error);
  } finally {
    if (releaseLock) try {
      await releaseLock();
    } catch {}
  }
}
function getLastPeerDmSummary(transcript) {
  for (let index = transcript.length - 1; index >= 0; index--) {
    let entry = transcript[index];
    if (!entry) continue;
    if (entry.type === "user" && typeof entry.message.content === "string") break;
    if (entry.type !== "assistant") continue;
    for (let block of entry.message.content) if (block.type === "tool_use" && block.name === Yg && typeof block.input === "object" && block.input !== null && "to" in block.input && typeof block.input.to === "string" && block.input.to !== "*" && block.input.to.toLowerCase() !== qp.toLowerCase() && "message" in block.input && typeof block.input.message === "string") {
      let recipient = block.input.to,
        summary = ("summary" in block.input && typeof block.input.summary === "string" ? block.input.summary : block.input.message.slice(0, 80)).slice(0, 200);
      return `[to ${recipient}] ${summary}`;
    }
  }
  return;
}
var hZ6,
  lV_,
  IdleNotificationMessageSchema,
  PlanApprovalRequestMessageSchema,
  PlanApprovalResponseMessageSchema,
  ShutdownRequestMessageSchema,
  ShutdownApprovedMessageSchema,
  ShutdownRejectedMessageSchema,
  TaskAssignmentMessageSchema,
  TaskCompletedMessageSchema,
  TeammateTerminatedMessageSchema,
  ModeSetRequestMessageSchema,
  PROTOCOL_FRAME_PROMPT_ERROR = "Teammate prompt must not be a mailbox protocol frame (permission/mode/plan/shutdown JSON) \u2014 pass plain-text instructions";
var iW = b(() => {
  Xr();
  rlt();
  Dp();
  Eoo();
  iT();
  je();
  an();
  St();
  wn();
  Xt();
  eU();
  Ok();
  Sf();
  KH();
  hZ6 = require("path"), lV_ = {
    retries: {
      retries: 10,
      minTimeout: 5,
      maxTimeout: 100
    },
    onCompromised: e => Ie(e)
  };
  IdleNotificationMessageSchema = Re(() => E.object({
    type: E.literal("idle_notification"),
    from: E.string(),
    timestamp: E.string(),
    idleReason: E.enum(["available", "interrupted", "failed"]).optional(),
    summary: E.string().optional(),
    completedTaskId: E.string().optional(),
    completedStatus: E.enum(["resolved", "blocked", "failed"]).optional(),
    failureReason: E.string().optional()
  }));
  PlanApprovalRequestMessageSchema = Re(() => E.object({
    type: E.literal("plan_approval_request"),
    from: E.string(),
    timestamp: E.string(),
    planFilePath: E.string(),
    planContent: E.string(),
    requestId: E.string()
  })), PlanApprovalResponseMessageSchema = Re(() => E.object({
    type: E.literal("plan_approval_response"),
    requestId: E.string(),
    approved: E.boolean(),
    feedback: E.string().optional(),
    timestamp: E.string(),
    permissionMode: pte().optional()
  })), ShutdownRequestMessageSchema = Re(() => E.object({
    type: E.literal("shutdown_request"),
    requestId: E.string(),
    from: E.string(),
    reason: E.string().optional(),
    timestamp: E.string()
  })), ShutdownApprovedMessageSchema = Re(() => E.object({
    type: E.literal("shutdown_approved"),
    requestId: E.string(),
    from: E.string(),
    timestamp: E.string(),
    paneId: E.string().optional(),
    backendType: E.string().optional()
  })), ShutdownRejectedMessageSchema = Re(() => E.object({
    type: E.literal("shutdown_rejected"),
    requestId: E.string(),
    from: E.string(),
    reason: E.string(),
    timestamp: E.string()
  }));
  TaskAssignmentMessageSchema = Re(() => E.object({
    type: E.literal("task_assignment"),
    taskId: E.string(),
    subject: E.string(),
    description: E.string(),
    assignedBy: E.string(),
    timestamp: E.string()
  }));
  TaskCompletedMessageSchema = Re(() => E.object({
    type: E.literal("task_completed"),
    from: E.string().optional(),
    taskId: E.string(),
    taskSubject: E.string().optional(),
    timestamp: E.string().optional()
  })), TeammateTerminatedMessageSchema = Re(() => E.object({
    type: E.literal("teammate_terminated"),
    message: E.string()
  }));
  ModeSetRequestMessageSchema = Re(() => E.object({
    type: E.literal("mode_set_request"),
    mode: pte(),
    from: E.string()
  }));
});

export {un8 as Dso,getInboxPath,ensureInboxDir as iyp,readMailbox,readUnreadMessages,writeToMailbox,markSingleMessageAsRead,messageIdentityKey,markMessagesAsRead,clearMailbox,formatTeammateMessage,formatTeammateMessages,createIdleNotification,isIdleNotification,createPermissionRequestMessage,createPermissionResponseMessage,isPermissionRequest,isPermissionResponse,createSandboxPermissionRequestMessage,createSandboxPermissionResponseMessage,isSandboxPermissionRequest,isSandboxPermissionResponse,createShutdownRequestMessage,createShutdownApprovedMessage,createShutdownRejectedMessage,sendShutdownRequestToMailbox,isShutdownRequest,isPlanApprovalRequest,isShutdownApproved,isPlanApprovalResponse,isTaskAssignment,parseFrameForDisplay,isTeamPermissionUpdate,createModeSetRequestMessage,isModeSetRequest,isStructuredProtocolMessage,planApprovalResumeText,isHeadlessLeadDisplayableMessage,markMessagesAsReadByPredicate,getLastPeerDmSummary,hZ6 as CFn,lV_ as i2t,IdleNotificationMessageSchema,PlanApprovalRequestMessageSchema,PlanApprovalResponseMessageSchema,ShutdownRequestMessageSchema,ShutdownApprovedMessageSchema,ShutdownRejectedMessageSchema,TaskAssignmentMessageSchema,TaskCompletedMessageSchema,TeammateTerminatedMessageSchema,ModeSetRequestMessageSchema,PROTOCOL_FRAME_PROMPT_ERROR,iW as Tx};
