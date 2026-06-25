// @ts-nocheck
import {nt as q_,Za as P4} from "../../vendor/m127.ts";
import {getInitialSettings as n8,br as N8} from "./0745_updateSettingsForSource.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
/**
 * Returns whether git workflow instructions (commit/PR guidance) should be
 * included in the system prompt.
 *
 * Priority order:
 *   1. CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS env var set to a falsy value  → false
 *   2. CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS env var set to a truthy value → true
 *   3. settings.includeGitInstructions (if explicitly set)
 *   4. Default: true
 */
function lL_(): boolean {
  let envVal: string | undefined = process.env.CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS;
  if (q_(envVal)) return !1;
  if (P4(envVal)) return !0;
  return n8().includeGitInstructions ?? !0;
}

/** Lazy module initializer: depends on the namespace/config (A6) and settings (N8) modules. */
var mm8 = L(() => {
  A6();
  N8();
});
export {lL_ as UMt,mm8 as PKr};
