// @ts-nocheck
import {getTeamName as up,getAgentId as aD,getAgentName as dg,getTeammateColor as bA,Op} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {readTeamFileAsync as oye,sL} from "../../vendor/m3897.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Dd,wB} from "../config/3893_wB.ts";
import {createPermissionRequestMessage as nuo,writeToMailbox as Bf,createPermissionResponseMessage as ruo,createSandboxPermissionRequestMessage as ouo,createSandboxPermissionResponseMessage as suo,Pw} from "../permissions/3902_writeToMailbox.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {b} from "../../runtime.ts";
/** Generate a unique permission-request id: `perm-<timestamp>-<random>`. */
function generatePermRequestId(): string {
  return `perm-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
/**
 * Build a permission request object from the given options, filling in
 * worker/team identity from ambient context when not supplied. Throws if the
 * team name, worker id, or worker name cannot be resolved.
 */
function buildPermissionRequest(opts) {
  let teamName = opts.teamName || up(),
    workerId = opts.workerId || aD(),
    workerName = opts.workerName || dg(),
    workerColor = opts.workerColor || bA();
  if (!teamName) throw Error("Team name is required for permission requests");
  if (!workerId) throw Error("Worker ID is required for permission requests");
  if (!workerName) throw Error("Worker name is required for permission requests");
  return {
    id: generatePermRequestId(),
    workerId: workerId,
    workerName: workerName,
    workerColor: workerColor,
    teamName: teamName,
    toolName: opts.toolName,
    toolUseId: opts.toolUseId,
    description: opts.description,
    input: opts.input,
    permissionSuggestions: opts.permissionSuggestions || [],
    createdAt: Date.now()
  };
}
/** True when the current agent is the team lead, or running solo (no agent id). */
function isTeamLeadOrSolo(teamNameOverride): boolean {
  if (!(teamNameOverride || up())) return !1;
  let agentId = aD();
  return !agentId || agentId === "team-lead";
}
/** True when running as a non-lead teammate inside a team. */
function startInProcessTeammate(): boolean {
  let teamName = up(),
    agentId = aD();
  return !!teamName && !!agentId && !isTeamLeadOrSolo();
}
/** Resolve the display name of the team leader, or the default when unknown. */
async function findTeamLeaderName(teamNameOverride) {
  let teamName = teamNameOverride || up();
  if (!teamName) return null;
  let teamFile = await oye(teamName);
  if (!teamFile) return A(`[PermissionSync] Team file not found for team: ${teamName}`), null;
  return teamFile.members.find(member => member.agentId === teamFile.leadAgentId)?.name || Dd;
}
/** Deliver a permission request to the team leader's mailbox. */
async function sendPermissionRequestToLeader(request): Promise<boolean> {
  let leaderName = await findTeamLeaderName(request.teamName);
  if (!leaderName) return A("[PermissionSync] Cannot send permission request: leader name not found"), !1;
  try {
    let message = nuo({
      request_id: request.id,
      agent_id: request.workerName,
      tool_name: request.toolName,
      tool_use_id: request.toolUseId,
      description: request.description,
      input: request.input,
      permission_suggestions: request.permissionSuggestions
    });
    return await Bf(leaderName, {
      from: request.workerName,
      text: Pe(message),
      timestamp: new Date().toISOString(),
      color: request.workerColor
    }, request.teamName), A(`[PermissionSync] Sent permission request ${request.id} to leader ${leaderName} via mailbox`), !0;
  } catch (err) {
    return A(`[PermissionSync] Failed to send permission request via mailbox: ${err}`), Ie(err), !1;
  }
}
/** Deliver a permission decision back to the requesting worker's mailbox. */
async function sendPermissionResponseToWorker(workerName, response, requestId, teamNameOverride): Promise<boolean> {
  let teamName = teamNameOverride || up();
  if (!teamName) return A("[PermissionSync] Cannot send permission response: team name not found"), !1;
  try {
    let message = ruo({
      request_id: requestId,
      subtype: response.decision === "approved" ? "success" : "error",
      error: response.feedback,
      updated_input: response.updatedInput,
      permission_updates: response.permissionUpdates
    });
    return await Bf(workerName, {
      from: Dd,
      text: Pe(message),
      timestamp: new Date().toISOString()
    }, teamName), A(`[PermissionSync] Sent permission response for ${requestId} to worker ${workerName} via mailbox`), !0;
  } catch (err) {
    return A(`[PermissionSync] Failed to send permission response via mailbox: ${err}`), Ie(err), !1;
  }
}
/** Generate a unique sandbox-request id: `sandbox-<timestamp>-<random>`. */
function generateSandboxRequestId(): string {
  return `sandbox-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
/** Send a sandbox (host-access) permission request to the team leader. */
async function sendSandboxPermissionRequest(host, requestId, teamNameOverride): Promise<boolean> {
  let teamName = teamNameOverride || up();
  if (!teamName) return A("[PermissionSync] Cannot send sandbox permission request: team name not found"), xe("swarm_sandbox_permission_request", "no_team_name"), !1;
  let leaderName = await findTeamLeaderName(teamName);
  if (!leaderName) return A("[PermissionSync] Cannot send sandbox permission request: leader name not found"), xe("swarm_sandbox_permission_request", "no_leader"), !1;
  let workerId = aD(),
    workerName = dg(),
    workerColor = bA();
  if (!workerId || !workerName) return A("[PermissionSync] Cannot send sandbox permission request: worker ID or name not found"), xe("swarm_sandbox_permission_request", "no_worker_identity"), !1;
  try {
    let message = ouo({
      requestId: requestId,
      workerId: workerId,
      workerName: workerName,
      workerColor: workerColor,
      host: host
    });
    return await Bf(leaderName, {
      from: workerName,
      text: Pe(message),
      timestamp: new Date().toISOString(),
      color: workerColor
    }, teamName), A(`[PermissionSync] Sent sandbox permission request ${requestId} for host ${host} to leader ${leaderName} via mailbox`), He("swarm_sandbox_permission_request"), !0;
  } catch (err) {
    return A(`[PermissionSync] Failed to send sandbox permission request via mailbox: ${err}`), Ie(err), xe("swarm_sandbox_permission_request", "mailbox_write_failed"), !1;
  }
}
/** Send the leader's sandbox (host-access) decision back to the worker. */
async function sendSandboxPermissionResponse(workerName, requestId, host, allow, teamNameOverride): Promise<boolean> {
  let teamName = teamNameOverride || up();
  if (!teamName) return A("[PermissionSync] Cannot send sandbox permission response: team name not found"), !1;
  try {
    let message = suo({
      requestId: requestId,
      host: host,
      allow: allow
    });
    return await Bf(workerName, {
      from: Dd,
      text: Pe(message),
      timestamp: new Date().toISOString()
    }, teamName), A(`[PermissionSync] Sent sandbox permission response for ${requestId} (host: ${host}, allow: ${allow}) to worker ${workerName} via mailbox`), !0;
  } catch (err) {
    return A(`[PermissionSync] Failed to send sandbox permission response via mailbox: ${err}`), Ie(err), !1;
  }
}
/** Lazy module initializer: runs dependent module init thunks. */
var moduleInit = b(() => {
  mn();
  qe();
  vn();
  tn();
  Op();
  Pw();
  wB();
  sL();
});

export {generatePermRequestId as uBp,buildPermissionRequest as Qqn,isTeamLeadOrSolo as dBp,startInProcessTeammate as Mpt,findTeamLeaderName as R7a,sendPermissionRequestToLeader as Zqn,sendPermissionResponseToWorker as e6n,generateSandboxRequestId as v7a,sendSandboxPermissionRequest as w7a,sendSandboxPermissionResponse as t6n,moduleInit as Npt};
