// @ts-nocheck
import {st as q_} from "../../vendor/m5.ts";
import {hH as tZ,Kx as k0} from "../../vendor/m128.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
/**
 * Module: config/1638_AP8
 * Subsystem: config — settings/config loading and CLAUDE.md handling
 *
 * Provides: isWorkflowsDisabled — checks whether dynamic workflows are
 * disabled either via the CLAUDE_CODE_DISABLE_WORKFLOWS environment variable
 * or via the managed-settings `disableWorkflows` flag.
 */

/** Returns true if dynamic workflows are disabled via env var or managed settings. */
function isWorkflowsDisabled(): boolean {
  return q_(process.env.CLAUDE_CODE_DISABLE_WORKFLOWS) || tZ()?.settings.disableWorkflows === !0;
}

/** Lazy init thunk for this module; ensures namespace and settings modules are ready. */
var AP8 = L(() => {
  A6();
  k0();
});

export {isWorkflowsDisabled as Q_n,AP8 as rBr};
