// @ts-nocheck
import {nt as q_} from "../../vendor/m127.ts";
import {GH as tZ,lk as k0} from "../../vendor/m125.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
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
  if (q_(process.env.CLAUDE_CODE_DISABLE_AGENT_VIEW)) return "is disabled by CLAUDE_CODE_DISABLE_AGENT_VIEW";
  if (tZ()?.settings.disableAgentView === !0) return "is disabled by the 'disableAgentView' setting";
  return null;
}
var $$6 = L(() => {
  A6();
  k0();
});
export {WaH as det,XN8 as S$r,$$6 as vbn};
