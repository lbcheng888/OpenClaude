// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {F3 as wl} from "../../vendor/m459.ts";
import {_l as P4,st as q_} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {sn as A6} from "./0047_namespace.ts";
import {ef as lT,Ws as V9} from "../../vendor/m2248.ts";
import {VR as qZ,yu as B5} from "../../vendor/m2249.ts";
import {Vw as RP,$c as g1} from "../../vendor/m2695.ts";
import {ns as aq} from "../mcp/2194_mcpServerName.ts";
import {Js as K7} from "./2697_oA.ts";
import {I0 as DL} from "../tools/2698_allErrors.ts";
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
function hasReplContext(
  replContexts: Record<string, unknown> | null | undefined,
  agentId: string | null | undefined
): boolean {
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

export {uD6 as own,jh7 as xNi,WORKFLOW_TOOL_NAME,CODE_REVIEW_WORKFLOW_NAME,getReplVariant as kNi,hasReplContext as MPt,isReplMode as ox,REPL_CONTEXT_NAME as PA,DEFAULT_AGENT_ID as C2e,replOnlyToolNames as $tt,KZ as Lv};
