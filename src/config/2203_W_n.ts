// @ts-nocheck
import {st as q_} from "../../vendor/m5.ts";
import {hH as tZ,Kx as k0} from "../../vendor/m128.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
/**
 * Agent view gate: checks whether the agent view feature is disabled
 * via environment variable or settings, and returns the reason string if so.
 */

/** Returns true if the agent view is disabled (either by env var or settings). */
function WaH(): boolean {
  return XN8() !== null;
}

/**
 * Returns a human-readable string describing why the agent view is disabled,
 * or null if it is enabled.
 */
function XN8(): string | null {
  if (q_(process.env.CLAUDE_CODE_DISABLE_AGENT_VIEW))
    return "is disabled by CLAUDE_CODE_DISABLE_AGENT_VIEW";
  if (tZ()?.settings.disableAgentView === !0)
    return "is disabled by the 'disableAgentView' setting";
  return null;
}

var $$6 = L(() => {
  A6();
  k0();
});

export {WaH as uQe,XN8 as GNr,$$6 as W_n};
