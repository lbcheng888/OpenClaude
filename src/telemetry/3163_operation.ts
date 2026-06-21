// @ts-nocheck
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Qe as O_} from "../../vendor/m5.ts";
import {getPrCounter as XkH,lt as w_} from "../session/0131_sent.ts";
import {b as L} from "../../runtime.ts";
// Telemetry module: MCP tool-name-based PR create detection.
// Checks if an MCP tool name matches a "create pull/merge request" pattern and
// emits a `tengu_git_operation` telemetry event when it does.

/**
 * Inspect an MCP tool name and, if it matches a "create PR/MR" pattern,
 * emit a `tengu_git_operation` telemetry event and increment the PR-created counter.
 *
 * Cross-module references kept as-is to preserve linkage: c, O_, XkH, w_, y_, L
 *
 * @param toolName - The MCP tool name to inspect (e.g. "create_pull_request").
 */
function trackPrCreateFromToolName(toolName: string): void {
  if (!prCreateToolNameRegex.test(toolName)) return;
  c("tengu_git_operation", {
    operation: O_("pr_create")
  }), XkH()?.add(1);
}

var prCreateToolNameRegex: RegExp;

/** Lazy initializer for this module — registers `prCreateToolNameRegex`. */
var Jn7 = L(() => {
  w_();
  y_();
  prCreateToolNameRegex = /^create[_-]?(pull[_-]?request|merge[_-]?request)$|^(pull[_-]?request|merge[_-]?request)[_-]?create$/i;
});

export {trackPrCreateFromToolName as fZi,prCreateToolNameRegex as K$d,Jn7 as AZi};
