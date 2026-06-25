// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {r3 as wl} from "../../vendor/m465.ts";
import {Za as P4,nt as q_} from "../../vendor/m127.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {dn as A6} from "./0137_namespace.ts";
import {dm as lT,vs as V9} from "../../vendor/m2256.ts";
import {ow as qZ,su as B5} from "../../vendor/m2257.ts";
import {XR as RP,readRoster as g1} from "../../vendor/m2707.ts";
import {Mo as aq} from "../mcp/2200_mcpServerName.ts";
import {ws as K7} from "./2709_Zm.ts";
import {Y0 as DL} from "../tools/2710_allErrors.ts";
var uD6 = "ExitWorktree";
var jh7 = {};
j_(jh7, {
  WORKFLOW_TOOL_NAME: () => WORKFLOW_TOOL_NAME,
  CODE_REVIEW_WORKFLOW_NAME: () => CODE_REVIEW_WORKFLOW_NAME
});

/** The display name used for the Workflow tool. */
var WORKFLOW_TOOL_NAME = "Workflow",
  /** The internal name for the code-review workflow skill. */
  CODE_REVIEW_WORKFLOW_NAME = "code-review";

/** Returns the value of the CLAUDE_REPL_VARIANT environment variable, if set. */
function getReplVariant(): string | undefined {
  return process.env.CLAUDE_REPL_VARIANT;
}

/**
 * Returns true if the given replContexts map contains an entry for the
 * specified agentId (defaults to the "main" agent when agentId is nullish).
 *
 * @param replContexts - Map of agentId → REPL context objects.
 * @param agentId - The agent ID to look up; falls back to the default "main" key.
 */
function hasReplContext(replContexts: Record<string, unknown> | null | undefined, agentId: string | null | undefined): boolean {
  return (replContexts ?? {})[agentId ?? DEFAULT_AGENT_ID] !== void 0;
}

/**
 * Returns true when the current session is running in REPL mode.
 *
 * Checks (in order):
 *  1. The runtime must be Bun (`wl()`).
 *  2. The CLAUDE_CODE_REPL env var must not be explicitly disabled.
 *  3. If CLAUDE_CODE_REPL is explicitly enabled, return true immediately.
 *  4. For "cli" or "remote" entrypoints, consult the "tengu_slate_harbor" feature flag.
 */
function isReplMode(): boolean {
  if (!wl()) return !1;
  if (P4(process.env.CLAUDE_CODE_REPL)) return !1;
  if (q_(process.env.CLAUDE_CODE_REPL)) return !0;
  let entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT;
  if (entrypoint === "cli" || entrypoint === "remote") return Y_("tengu_slate_harbor", !1);
  return !1;
}

/** Constant for the REPL context name. */
var REPL_CONTEXT_NAME = "REPL",
  /** Default agent ID used when no explicit agentId is provided. */
  DEFAULT_AGENT_ID = "main",
  /** Lazily-initialised set of tool names that are REPL-only. */
  replOnlyToolNames: Set<string>;

/** Lazy initialiser: populates replOnlyToolNames from cross-module tool name constants. */
var KZ = L(() => {
  o6();
  A6();
  lT();
  qZ();
  RP();
  replOnlyToolNames = new Set([V9, B5, g1, aq, K7, DL]);
});
export {uD6 as zkn,jh7 as m3i,WORKFLOW_TOOL_NAME,CODE_REVIEW_WORKFLOW_NAME,getReplVariant as f3i,hasReplContext as fMt,isReplMode as gw,REPL_CONTEXT_NAME as Mf,DEFAULT_AGENT_ID as I$e,replOnlyToolNames as Grt,KZ as $A};
