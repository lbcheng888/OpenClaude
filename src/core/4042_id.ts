// @ts-nocheck
import {getTeamName as VT,getAgentId as ah,getAgentName as aY,getTeammateColor as IW,Am as Xz} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {readTeamFileAsync as vGH,BL as Ek} from "../../vendor/m3879.ts";
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {np as CO,aU as VE} from "../config/3875_aU.ts";
import {createPermissionRequestMessage as V6q,writeToMailbox as j$,createPermissionResponseMessage as y6q,createSandboxPermissionRequestMessage as v6q,createSandboxPermissionResponseMessage as E6q,Tx as f0} from "../permissions/3886_writeToMailbox.ts";
import {Le as xH,Xt as t_} from "../config/0228_encoding.ts";
import {De as CH,Rn as C6} from "../session/0615_length.ts";
import {Oe as IH,Ie as SH,ln as P6} from "../telemetry/0594_feature_name.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function setPermissionHandler(handler) {
  currentPermissionHandler = handler;
}
function getPermissionHandler() {
  return currentPermissionHandler;
}
function clearPermissionHandler() {
  currentPermissionHandler = null;
}
var currentPermissionHandler = null;
function generatePermRequestId() {
  return `perm-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
function buildPermissionRequest(opts) {
  let teamName = opts.teamName || VT(),
    workerId = opts.workerId || ah(),
    workerName = opts.workerName || aY(),
    workerColor = opts.workerColor || IW();
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
function isTeamLeadOrSolo(teamNameOverride) {
  if (!(teamNameOverride || VT())) return false;
  let agentId = ah();
  return !agentId || agentId === "team-lead";
}
function startInProcessTeammate() {
  let teamName = VT(),
    agentId = ah();
  return !!teamName && !!agentId && !isTeamLeadOrSolo();
}
async function findTeamLeaderName(teamNameOverride) {
  let teamName = teamNameOverride || VT();
  if (!teamName) return null;
  let teamFile = await vGH(teamName);
  if (!teamFile) return N(`[PermissionSync] Team file not found for team: ${teamName}`), null;
  return teamFile.members.find(member => member.agentId === teamFile.leadAgentId)?.name || CO;
}
async function sendPermissionRequestToLeader(request) {
  let leaderName = await findTeamLeaderName(request.teamName);
  if (!leaderName) return N("[PermissionSync] Cannot send permission request: leader name not found"), false;
  try {
    let message = V6q({
      request_id: request.id,
      agent_id: request.workerName,
      tool_name: request.toolName,
      tool_use_id: request.toolUseId,
      description: request.description,
      input: request.input,
      permission_suggestions: request.permissionSuggestions
    });
    return await j$(leaderName, {
      from: request.workerName,
      text: xH(message),
      timestamp: new Date().toISOString(),
      color: request.workerColor
    }, request.teamName), N(`[PermissionSync] Sent permission request ${request.id} to leader ${leaderName} via mailbox`), true;
  } catch (err) {
    return N(`[PermissionSync] Failed to send permission request via mailbox: ${err}`), CH(err), false;
  }
}
async function sendPermissionResponseToWorker(workerName, response, requestId, teamNameOverride) {
  let teamName = teamNameOverride || VT();
  if (!teamName) return N("[PermissionSync] Cannot send permission response: team name not found"), false;
  try {
    let message = y6q({
      request_id: requestId,
      subtype: response.decision === "approved" ? "success" : "error",
      error: response.feedback,
      updated_input: response.updatedInput,
      permission_updates: response.permissionUpdates
    });
    return await j$(workerName, {
      from: CO,
      text: xH(message),
      timestamp: new Date().toISOString()
    }, teamName), N(`[PermissionSync] Sent permission response for ${requestId} to worker ${workerName} via mailbox`), true;
  } catch (err) {
    return N(`[PermissionSync] Failed to send permission response via mailbox: ${err}`), CH(err), false;
  }
}
function generateSandboxRequestId() {
  return `sandbox-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
async function sendSandboxPermissionRequest(host, requestId, teamNameOverride) {
  let teamName = teamNameOverride || VT();
  if (!teamName) return N("[PermissionSync] Cannot send sandbox permission request: team name not found"), IH("swarm_sandbox_permission_request", "no_team_name"), false;
  let leaderName = await findTeamLeaderName(teamName);
  if (!leaderName) return N("[PermissionSync] Cannot send sandbox permission request: leader name not found"), IH("swarm_sandbox_permission_request", "no_leader"), false;
  let workerId = ah(),
    workerName = aY(),
    workerColor = IW();
  if (!workerId || !workerName) return N("[PermissionSync] Cannot send sandbox permission request: worker ID or name not found"), IH("swarm_sandbox_permission_request", "no_worker_identity"), false;
  try {
    let message = v6q({
      requestId: requestId,
      workerId: workerId,
      workerName: workerName,
      workerColor: workerColor,
      host: host
    });
    return await j$(leaderName, {
      from: workerName,
      text: xH(message),
      timestamp: new Date().toISOString(),
      color: workerColor
    }, teamName), N(`[PermissionSync] Sent sandbox permission request ${requestId} for host ${host} to leader ${leaderName} via mailbox`), SH("swarm_sandbox_permission_request"), true;
  } catch (err) {
    return N(`[PermissionSync] Failed to send sandbox permission request via mailbox: ${err}`), CH(err), IH("swarm_sandbox_permission_request", "mailbox_write_failed"), false;
  }
}
async function sendSandboxPermissionResponse(workerName, requestId, host, allow, teamNameOverride) {
  let teamName = teamNameOverride || VT();
  if (!teamName) return N("[PermissionSync] Cannot send sandbox permission response: team name not found"), false;
  try {
    let message = E6q({
      requestId: requestId,
      host: host,
      allow: allow
    });
    return await j$(workerName, {
      from: CO,
      text: xH(message),
      timestamp: new Date().toISOString()
    }, teamName), N(`[PermissionSync] Sent sandbox permission response for ${requestId} (host: ${host}, allow: ${allow}) to worker ${workerName} via mailbox`), true;
  } catch (err) {
    return N(`[PermissionSync] Failed to send sandbox permission response via mailbox: ${err}`), CH(err), false;
  }
}
var moduleInit = L(() => {
  P6();
  gH();
  C6();
  t_();
  Xz();
  f0();
  VE();
  Ek();
});

export {setPermissionHandler as XFa,getPermissionHandler as QFa,clearPermissionHandler as ZFa,currentPermissionHandler as ulo,generatePermRequestId as Lvp,buildPermissionRequest as H2n,isTeamLeadOrSolo as Mvp,startInProcessTeammate as $ct,findTeamLeaderName as eUa,sendPermissionRequestToLeader as I2n,sendPermissionResponseToWorker as D2n,generateSandboxRequestId as tUa,sendSandboxPermissionRequest as nUa,sendSandboxPermissionResponse as P2n,moduleInit as qct};
