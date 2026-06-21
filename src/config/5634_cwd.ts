// @ts-nocheck
import {JL as BV,Y0 as uL} from "../artifact/4303_Y0.ts";
import {ix as BW,Sz as Bi} from "./2704_Sz.ts";
import {h8t as VB_,Twl as Gj4} from "../agent/4937_mergeAndFilterTools.ts";
import {getCommands as zM,Sf as nT} from "../tools/5142_toSlashCommands.ts";
import {getAgentDefinitionsWithOverrides as Vk,parseAgentsFromJson as su_,getActiveAgentsFromList as Mb,scrubPathsConfig as tA} from "../permissions/4454_toAgentInfos.ts";
import {hc as L1,Iy as tf} from "../agent/2230_explicitlyRequested.ts";
import {Fa as $K,Pd as FO} from "../../vendor/m701.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {logForDebugging as N,qe as FH} from "./0234_setHasFormattedOutput.ts";
import {setMainThreadAgentType as gd,lt as w_} from "../session/0131_sent.ts";
import {je as oH} from "../../vendor/m577.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/**
 * Tool, command, and agent-definition loading for a session cwd.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Cross-module loader: assemble tools, commands, agent definitions, and deferred command promises. */
async function Ur4({
  cwd: H,
  toolPermissionContext: _,
  applyCoordinatorFilter: q,
  agentsJson: K,
  agentSetting: O,
  commandsPromise: T,
  agentDefsPromise: z,
  deferCommands: $,
  onToolsLoaded: Y
}: any) : any {
  let A = BV(_);
  if (q && !0 && BW()) {
    let {
      applyCoordinatorToolFilter: P
    } = await Promise.resolve().then(() => (VB_(), Gj4));
    A = P(A);
  }
  Y?.(), T?.catch(() => {}), z?.catch(() => {});
  let w = T ?? zM(H);
  if ($) w.catch(() => {});
  let [f, j] = await Promise.all([$ ? Promise.resolve([]) : w, z ?? Vk(H)]),
    J = [];
  if (K && !L1("agents", {
    explicitlyRequested: !0
  })) try {
    let P = $K(K);
    if (P) J = su_(P, "flagSettings");
  } catch (P) {
    EH(P);
  } else if (K) N("--agents: ignored in safe mode (user-supplied custom agents are disabled)", {
    level: "warn"
  });
  let D = [...j.allAgents, ...J],
    M = {
      ...j,
      allAgents: D,
      activeAgents: Mb(D)
    },
    X = OLq(M.activeAgents, O);
  return gd(X?.agentType), {
    tools: A,
    commands: f,
    agentDefinitions: M,
    mainThreadAgentDefinition: X,
    cliAgents: J,
    deferredCommandsPromise: $ ? w : void 0
  };
}
/** Cross-module predicate: sync plugin install only for the configured startup path. */
function Fr4(H: any) : any {
  return H && oH.CLAUDE_CODE_SYNC_PLUGIN_INSTALL;
}
/** Cross-module helper: find the requested main-thread agent definition. */
function OLq(H: any, _: any) : any {
  if (!_) return;
  let q = H.find(K => K.agentType === _) ?? H.find(K => K.agentType.endsWith(`:${_}`));
  if (!q) N(`Warning: agent "${_}" not found. Available agents: ${H.map(K => K.agentType).join(", ")}. Using default behavior.`);
  return q;
}
var gr4 = L(() => {
  w_();
  nT();
  Bi();
  tA();
  uL();
  tf();
  FH();
  _q();
  FO();
  S6();
});
export {Ur4 as Irc,Fr4 as Drc,OLq as _1o,gr4 as Prc};
