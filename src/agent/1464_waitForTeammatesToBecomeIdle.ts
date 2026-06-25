// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {runWithTeammateContext as Dmn,isInProcessTeammate as fF,getTeammateContext as cI,createTeammateContext as Pmn,b2} from "../../vendor/m1462.ts";
import {Ne} from "../../vendor/m583.ts";
import {getIsInteractive as ck,lt} from "../session/0132_sent.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck
var QRr = {};
ft(QRr, {
  waitForTeammatesToBecomeIdle: () => waitForTeammatesToBecomeIdle,
  setDynamicTeamContext: () => setDynamicTeamContext,
  runWithTeammateContext: () => Dmn,
  isTeammate: () => isTeammate,
  isTeamLead: () => isTeamLead,
  isPlanModeRequired: () => isPlanModeRequired,
  isNestedInteractiveClaudeSession: () => isNestedInteractiveClaudeSession,
  isModelDrivenSession: () => isModelDrivenSession,
  isInProcessTeammate: () => fF,
  hasWorkingInProcessTeammates: () => hasWorkingInProcessTeammates,
  hasNonLeadTeammate: () => hasNonLeadTeammate,
  hasActiveInProcessTeammates: () => hasActiveInProcessTeammates,
  getTeammateContext: () => cI,
  getTeammateColor: () => getTeammateColor,
  getTeamName: () => getTeamName,
  getParentSessionId: () => u4,
  getDynamicTeamContext: () => getDynamicTeamContext,
  getAgentName: () => getAgentName,
  getAgentId: () => getAgentId,
  createTeammateContext: () => Pmn,
  clearDynamicTeamContext: () => clearDynamicTeamContext,
  _tmuxGlobalEnvOutputHasMarker: () => _tmuxGlobalEnvOutputHasMarker,
  _setAmbientMarkerProbeForTesting: () => _setAmbientMarkerProbeForTesting
});
function u4() {
  let e = cI();
  if (e) return e.parentSessionId;
  return F8?.parentSessionId;
}
function setDynamicTeamContext(e) {
  F8 = e;
}
function clearDynamicTeamContext() {
  F8 = null;
}
function getDynamicTeamContext() {
  return F8;
}
function getAgentId() {
  let e = cI();
  if (e) return e.agentId;
  return F8?.agentId;
}
function getAgentName() {
  let e = cI();
  if (e) return e.agentName;
  return F8?.agentName;
}
function getTeamName(e) {
  let t = cI();
  if (t) return t.teamName;
  if (F8?.teamName) return F8.teamName;
  return e?.teamName;
}
function isTeammate() {
  if (cI()) return true;
  return !!(F8?.agentId && F8?.teamName);
}
function isModelDrivenSession(e) {
  return e !== undefined || isTeammate() || Ne.CLAUDE_CODE_CHILD_SESSION;
}
function isNestedInteractiveClaudeSession() {
  if (Ne.CLAUDE_CODE_FORCE_SESSION_PERSISTENCE) return false;
  if (!(Ne.CLAUDE_CODE_CHILD_SESSION && ck() && !isTeammate())) return false;
  return !gOu();
}
function _setAmbientMarkerProbeForTesting(e) {
  YRr = e, Qun = null;
}
function gOu() {
  if (Qun === null) Qun = _Ou();
  return Qun;
}
function _Ou() {
  if (YRr) try {
    return YRr();
  } catch {
    return false;
  }
  if (!Ne.TMUX) return false;
  let e;
  try {
    e = V$s.spawnSync("tmux", ["show-environment", "-g", "CLAUDE_CODE_CHILD_SESSION"], {
      encoding: "utf8",
      timeout: 250,
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return false;
  }
  if (e.status !== 0) return false;
  return _tmuxGlobalEnvOutputHasMarker(e.stdout);
}
function _tmuxGlobalEnvOutputHasMarker(e) {
  return e.split(`
`).some(t => t.startsWith("CLAUDE_CODE_CHILD_SESSION="));
}
function getTeammateColor() {
  let e = cI();
  if (e) return e.color;
  return F8?.color;
}
function isPlanModeRequired() {
  let e = cI();
  if (e) return e.planModeRequired;
  if (F8 !== null) return F8.planModeRequired;
  return Ne.CLAUDE_CODE_PLAN_MODE_REQUIRED;
}
function hasNonLeadTeammate(e) {
  if (!e) return false;
  let {
    leadAgentId: t,
    teammates: n
  } = e;
  return Object.keys(n).some(r => r !== t);
}
function isTeamLead(e) {
  if (!e?.leadAgentId) return false;
  let t = getAgentId(),
    n = e.leadAgentId;
  if (t === n) return true;
  if (!t) return true;
  return false;
}
function hasActiveInProcessTeammates(e) {
  for (let t of Object.values(e.tasks)) if (t.type === "in_process_teammate" && t.status === "running") return true;
  return false;
}
function hasWorkingInProcessTeammates(e) {
  for (let t of Object.values(e.tasks)) if (t.type === "in_process_teammate" && t.status === "running" && !t.isIdle) return true;
  return false;
}
function waitForTeammatesToBecomeIdle(e, t) {
  let n = [];
  for (let [r, o] of Object.entries(t.tasks)) if (o.type === "in_process_teammate" && o.status === "running" && !o.isIdle) n.push(r);
  if (n.length === 0) return Promise.resolve();
  return new Promise(r => {
    let o = n.length,
      s = () => {
        if (o--, o === 0) r();
      };
    e(i => {
      let a = {
        ...i.tasks
      };
      for (let l of n) {
        let c = a[l];
        if (c && c.type === "in_process_teammate") if (c.isIdle) s();else a[l] = {
          ...c,
          onIdleCallbacks: [...(c.onIdleCallbacks ?? []), s]
        };
      }
      return {
        ...i,
        tasks: a
      };
    });
  });
}
var V$s,
  F8 = null,
  Qun = null,
  YRr = null;
var Am = b(() => {
  b2();
  lt();
  Ir();
  b2();
  V$s = require("child_process");
});

export {QRr as kxr,u4 as H3,setDynamicTeamContext,clearDynamicTeamContext,getDynamicTeamContext,getAgentId,getAgentName,getTeamName,isTeammate,isModelDrivenSession,isNestedInteractiveClaudeSession,_setAmbientMarkerProbeForTesting,gOu as M9u,_Ou as N9u,_tmuxGlobalEnvOutputHasMarker,getTeammateColor,isPlanModeRequired,hasNonLeadTeammate,isTeamLead,hasActiveInProcessTeammates,hasWorkingInProcessTeammates,waitForTeammatesToBecomeIdle,V$s as $5s,F8 as Z5,Qun as Omn,YRr as Rxr,Am as Op};
