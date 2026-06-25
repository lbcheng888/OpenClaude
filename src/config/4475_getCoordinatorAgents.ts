// @ts-nocheck
import {nt as q_} from "../../vendor/m127.ts";
import {getIsNonInteractiveSession as u8,lt as w_} from "../session/0132_sent.ts";
import {yw as BW,jz as Bi} from "./2716_jz.ts";
import {rul as VsK,nul as NsK} from "../permissions/4473_getWorkerSystemPrompt.ts";
import {oo as b8,b as L} from "../../runtime.ts";
import {wye as zAH,n4t as GI_} from "../core/4090_agentType.ts";
import {dl as C4,dn as A6} from "./0137_namespace.ts";
import {Qcl as RsK,Zcl as LsK} from "../../vendor/m4471.ts";
import {det as WaH,vbn as $$6} from "./2211_vbn.ts";
import {oCo as oTq,oul as ysK} from "../permissions/4474_CLAUDE_AGENT.ts";
import {uce as $KH,Tye as n$H} from "../telemetry/3989_agentType.ts";
import {tVn as im6,nCo as rOq} from "../../vendor/m4470.ts";
import {Xcl as GsK,tCo as iTq} from "../permissions/4470_ISSUES_EXPLAINER.ts";
/**
 * Returns the list of built-in coordinator agents to use for the current session.
 *
 * In coordinator mode the list is delegated to the worker-system-prompt module.
 * Otherwise a default set of built-in agents is assembled, filtered by runtime
 * flags (safe-mode, agent-view, SDK entrypoint, workflow-planning feature gate).
 */

// --- local helpers ---

/**
 * Always returns true in v2.1.177 — workflow-planning agents (Explore + Plan)
 * are unconditionally enabled.
 *
 * Named `aTq` in the minified bundle.
 */
function isWorkflowAgentsEnabled(): boolean {
  return !0;
}

// --- main export ---

/**
 * Builds and returns the active coordinator-agent definitions for this session.
 *
 * Named `C5_` in the minified bundle; its real name is resolved from the
 * module that calls it as `getCoordinatorAgents`.
 */
function getCoordinatorAgents(): unknown[] {
  // If the SDK consumer explicitly opted out of built-in agents and we are
  // running under an SDK entrypoint, return an empty list.
  if (q_(process.env.CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS) && u8()) return [];

  // In coordinator mode the list comes from the worker-system-prompt module.
  if (BW()) {
    let {
      getCoordinatorAgents: coordinatorAgentsFromModule
    } = (VsK(), b8(NsK));
    return coordinatorAgentsFromModule();
  }

  // Build the default agent list, starting with the general-purpose agent.
  let agents = [zAH];

  // RsK is omitted in safe-mode (hooks / external tools are restricted).
  if (!C4()) agents.push(RsK);

  // CLAUDE_AGENT (background-job narrator) is omitted when agent-view is disabled.
  if (!WaH()) {
    let {
      CLAUDE_AGENT: claudeAgent
    } = (oTq(), b8(ysK));
    agents.push(claudeAgent);
  }

  // Explore (read-only search) and Plan agents require workflow-planning to be on.
  if (isWorkflowAgentsEnabled()) agents.push($KH, im6);

  // The claude-code-guide agent is suppressed for SDK entrypoints.
  if (process.env.CLAUDE_CODE_ENTRYPOINT !== "sdk-ts" && process.env.CLAUDE_CODE_ENTRYPOINT !== "sdk-py" && process.env.CLAUDE_CODE_ENTRYPOINT !== "sdk-cli") agents.push(GsK);
  return agents;
}

/** Lazy module initializer — named `fp6` in the minified bundle. */
var fp6 = L(() => {
  w_();
  $$6();
  Bi();
  A6();
  iTq();
  n$H();
  GI_();
  rOq();
  LsK();
});
export {isWorkflowAgentsEnabled as sCo,getCoordinatorAgents as vft,fp6 as nVn};
