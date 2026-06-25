// @ts-nocheck
import {zn as c6} from "../api/0465_getOauthConfig.ts";
import {dM as py,hA as uX,Pa as J4} from "../../vendor/m720.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
// Subsystem: agent — background-task summary labels.
//
// This module builds the short human-readable status strings shown for the
// pool of background/agent tasks tracked in the task registry. The labels are
// grouped by task `type` (local shells, teammates, local/remote agents,
// workflows, MCP tasks, ...) and pluralized for display in the TUI.

// --- External symbols (recovered cross-module references, names preserved) ---
//
//   c6(list, predicate)  -> count of elements matching predicate   (api/0456)
//   Y_(flagName, default) -> feature-flag / gate getter            (telemetry)
//   uX                    -> ultraplan progress glyph (in-progress / empty)
//   py                    -> ultraplan progress glyph (ready / filled)
//   L(initFn)             -> esbuild lazy module-init wrapper
//   J4(), o6()            -> sibling module initializers
declare function c6<T>(list: readonly T[], predicate: (item: T) => boolean): number;
declare function Y_(flagName: string, defaultValue: boolean): boolean;
declare const uX: string;
declare const py: string;
declare function L(init: () => void): () => void;
declare function J4(): void;
declare function o6(): void;

/**
 * Lifecycle phase of a remote ultraplan task.
 * - `plan_ready`  : the generated plan is ready for the user to view.
 * - `needs_input` : the remote agent is blocked waiting on the user.
 */
type UltraplanPhase = "plan_ready" | "needs_input" | (string & {});

/**
 * Identity payload carried by an in-process teammate task.
 */
interface InProcessTeammateIdentity {
  teamName: string;
}

/**
 * A single entry in the background-task registry. The discriminating `type`
 * field selects which extra fields are present.
 */
type BackgroundTask = {
  type: "local_bash";
  /** `"monitor"` distinguishes long-lived monitors from one-off shells. */
  kind?: string;
} | {
  type: "in_process_teammate";
  identity: InProcessTeammateIdentity;
} | {
  type: "local_agent";
} | {
  type: "remote_agent";
  /** Whether this remote agent is running an ultraplan. */
  isUltraplan?: boolean;
  /** Current ultraplan phase (only meaningful when `isUltraplan`). */
  ultraplanPhase?: UltraplanPhase;
  /** Remote dispatch flavor, e.g. `"remote-workflow"`. */
  remoteTaskType?: string;
} | {
  type: "local_workflow";
} | {
  type: "monitor_mcp";
} | {
  type: "mcp_task";
} | {
  type: "dream";
};

/**
 * Build a short, pluralized summary label for a list of background tasks.
 *
 * When every task shares the same `type`, a type-specific phrasing is used
 * (e.g. "2 shells, 1 monitor", "1 team", "3 cloud sessions", "dreaming").
 * Otherwise it falls back to a generic "N background task(s)" label.
 *
 * @param tasks Background-task registry entries (assumed non-empty for the
 *              type-specific branches; an empty list yields the generic label).
 * @returns The summary string, or `null` if `tasks` is empty.
 */
function B4_(tasks: BackgroundTask[]): string | null {
  let first = tasks[0];
  if (!first) return null;
  let count = tasks.length;
  if (tasks.every(task => task.type === first.type)) switch (first.type) {
    case "local_bash":
      {
        let monitorCount = c6(tasks, task => task.type === "local_bash" && task.kind === "monitor"),
          shellCount = count - monitorCount,
          parts: string[] = [];
        if (shellCount > 0) parts.push(shellCount === 1 ? "1 shell" : `${shellCount} shells`);
        if (monitorCount > 0) parts.push(monitorCount === 1 ? "1 monitor" : `${monitorCount} monitors`);
        return parts.join(", ");
      }
    case "in_process_teammate":
      {
        let teamCount = new Set(tasks.map(task => task.type === "in_process_teammate" ? task.identity.teamName : "")).size;
        return teamCount === 1 ? "1 team" : `${teamCount} teams`;
      }
    case "local_agent":
      return count === 1 ? "1 local agent" : `${count} local agents`;
    case "remote_agent":
      {
        if (count === 1 && first.isUltraplan) switch (first.ultraplanPhase) {
          case "plan_ready":
            return `${py} ultraplan ready`;
          case "needs_input":
            return `${uX} ultraplan needs your input`;
          default:
            return `${uX} ultraplan`;
        }
        if (tasks.every(task => task.type === "remote_agent" && task.remoteTaskType === "remote-workflow")) return count === 1 ? `${uX} 1 remote dynamic workflow` : `${uX} ${count} remote dynamic workflows`;
        return count === 1 ? `${uX} 1 cloud session` : `${uX} ${count} cloud sessions`;
      }
    case "local_workflow":
      return count === 1 ? "1 background dynamic workflow" : `${count} background dynamic workflows`;
    case "monitor_mcp":
      return count === 1 ? "1 monitor" : `${count} monitors`;
    case "mcp_task":
      {
        let unit = Y_("tengu_copper_thistle", !1) ? "job" : "task";
        return count === 1 ? `1 MCP ${unit}` : `${count} MCP ${unit}s`;
      }
    case "dream":
      return "dreaming";
  }
  return `${count} background ${count === 1 ? "task" : "tasks"}`;
}

/**
 * Predicate: true when `tasks` is a single remote-agent task that is an
 * ultraplan with a known lifecycle phase.
 */
function xbK(tasks: BackgroundTask[]): boolean {
  if (tasks.length !== 1) return !1;
  let only = tasks[0];
  return only.type === "remote_agent" && only.isUltraplan === !0 && only.ultraplanPhase !== void 0;
}

/**
 * Lazy module initializer (esbuild `__esm`). Initializes the sibling modules
 * this module depends on before its bindings are used.
 */
var Mb6 = L(() => {
  J4();
  o6();
});
export {B4_ as zdt,xbK as e6a,Mb6 as W3n};
