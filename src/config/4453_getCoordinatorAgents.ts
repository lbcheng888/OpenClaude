// @ts-nocheck
import {st as q_} from "../../vendor/m5.ts";
import {getIsNonInteractiveSession as u8,lt as w_} from "../session/0131_sent.ts";
import {ix as BW,Sz as Bi} from "./2704_Sz.ts";
import {grl as VsK,hrl as NsK} from "../permissions/4451_getWorkerSystemPrompt.ts";
import {ro as b8,b as L} from "../../runtime.ts";
import {i_e as zAH,h$t as GI_} from "../core/4026_agentType.ts";
import {Bl as C4,sn as A6} from "./0047_namespace.ts";
import {prl as RsK,mrl as LsK} from "../../vendor/m4449.ts";
import {uQe as WaH,W_n as $$6} from "./2203_W_n.ts";
import {u_o as oTq,_rl as ysK} from "../permissions/4452_CLAUDE_AGENT.ts";
import {pce as $KH,Qge as n$H} from "../telemetry/3922_agentType.ts";
import {Ljn as im6,l_o as rOq} from "../../vendor/m4448.ts";
import {drl as GsK,a_o as iTq} from "../permissions/4448_ISSUES_EXPLAINER.ts";
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

export {isWorkflowAgentsEnabled as d_o,getCoordinatorAgents as wpt,fp6 as Mjn};
