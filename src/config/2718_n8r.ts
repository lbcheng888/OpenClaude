// @ts-nocheck
import {st as q_,_l as P4} from "../../vendor/m5.ts";
import {getInitialSettings as n8,yr as N8} from "./0740_updateSettingsForSource.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
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

export {lL_ as aOt,mm8 as n8r};
