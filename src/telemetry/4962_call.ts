// @ts-nocheck
import {ft as j_,b as L,x as u} from "../../runtime.ts";
import {c1 as uv,PO as HV,formatPermissionRule as bi} from "../../vendor/m2695.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {dae as J7H,uae as j7H,Mrt as SeH,iW as kp} from "../../vendor/m2696.ts";
import {Jmt as r1_,Qmt as a1_,Xmt as o1_,p8e as opH} from "./4398_condition.ts";
import {getSessionId as v_,lt as w_} from "../session/0132_sent.ts";
import {yPl as Oj4,TPl as Tj4} from "../../vendor/m4960.ts";
import {oe as WH} from "../../vendor/m2275.ts";
/** Emit a Tengu telemetry event. */
declare function c(event: string, payload: Record<string, unknown>): void;

/** List all active scheduled cron jobs. */
declare function J7H(): Promise<Array<{
  id: string;
  cron: string;
  prompt: string;
}>>;

/** Delete cron jobs by their IDs. */
declare function j7H(ids: string[]): Promise<void>;

/** Create a new cron job; returns the new job ID. */
declare function SeH(cron: string, prompt: string, recurring: boolean, durable: boolean): Promise<string>;

/** Convert a 5-field cron expression to a human-readable schedule string. */
declare function HV(cron: string): string;

/** Validate a 5-field cron expression; returns true if valid. */
declare function uv(cron: string): boolean;

/**
 * Get the current session-scoped stop-hooks of the given event type.
 * Returns an array of prompt-type hooks matching `r1_`.
 */
declare function r1_(appState: unknown, sessionKey: unknown): Array<{
  type: "prompt";
  prompt: string;
}>;

/** Clear the active stop-hook/goal. Returns the removed condition or null. */
declare function a1_(session: SessionHandle): string | null;

/** Set a stop-hook/goal condition. Returns an error message or null on success. */
declare function o1_(condition: string, session: SessionHandle): string | null;

/** Get the current session key. */
declare function v_(): unknown;

/** App state / session handle passed to the `call` function. */
interface SessionHandle {
  getAppState(): unknown;
  sessionHooksRegistry: unknown;
  setAppState(updater: (state: unknown) => unknown): void;
  applyMessageOp(op: unknown): void;
}

/**
 * The Loops Manager Dialog component (`Oj4`).
 *
 * Displays the list of active loops (crons + stop-hooks) and provides
 * UI for deleting existing loops or creating new ones.
 */
declare const Oj4: React.FC<LoopsManagerDialogProps>;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A scheduled cron-based loop entry. */
interface CronLoopEntry {
  kind: "cron";
  id: string;
  cron: string;
  /** Human-readable schedule (from `HV`). */
  human: string;
  prompt: string;
}

/** A session-scoped stop-hook entry. */
interface StopHookEntry {
  kind: "stophook";
  id: string;
  condition: string;
}
type LoopEntry = CronLoopEntry | StopHookEntry;

/** A create-cron request from the dialog UI. */
interface CreateCronRequest {
  kind: "cron";
  interval: string;
  prompt: string;
}

/** A create-stophook request from the dialog UI. */
interface CreateStopHookRequest {
  kind: "stophook";
  condition: string;
}
type CreateLoopRequest = CreateCronRequest | CreateStopHookRequest;

/** Props for the {@link Oj4} LoopsManagerDialog component. */
interface LoopsManagerDialogProps {
  loops: LoopEntry[];
  onDelete: (loop: LoopEntry) => void;
  onCreate: (request: CreateLoopRequest) => void;
  onCancel: () => void;
}

// ---------------------------------------------------------------------------
// Module wiring
// ---------------------------------------------------------------------------

var zj4 = {};
j_(zj4, {
  call: () => call
});

// ---------------------------------------------------------------------------
// Interval string → cron expression converter
// ---------------------------------------------------------------------------

/**
 * Convert a human-friendly interval string (e.g. `"30s"`, `"10m"`, `"2h"`,
 * `"7d"`) to a 5-field cron expression.
 *
 * Returns `null` when the input is malformed, the numeric value is out of
 * range, or the resulting cron expression fails validation (`uv`).
 *
 * @param intervalStr - String matching `/^(\d+)([smhd])$/i`.
 */
function ttO(intervalStr: string): string | null {
  let match = intervalStr.match(stO);
  if (!match) return null;
  let amount = parseInt(match[1], 10);
  if (amount < 1) return null;
  let cronExpr: string;
  switch (match[2].toLowerCase()) {
    case "s":
      cronExpr = `*/${Math.max(1, Math.ceil(amount / 60))} * * * *`;
      break;
    case "m":
      cronExpr = amount <= 59 ? `*/${amount} * * * *` : `0 */${Math.round(amount / 60)} * * *`;
      break;
    case "h":
      if (amount > 23) return null;
      cronExpr = `0 */${amount} * * *`;
      break;
    case "d":
      if (amount > 31) return null;
      cronExpr = `0 0 */${amount} * *`;
      break;
    default:
      return null;
  }
  return uv(cronExpr) ? cronExpr : null;
}

// ---------------------------------------------------------------------------
// Exported `call` entry-point
// ---------------------------------------------------------------------------

/** React namespace — assigned in the lazy initializer below. */
var DJq: typeof import("react");

/** Compiled regex for parsing human-friendly interval strings like "10m". */
var stO: RegExp;

/**
 * `/loops` command handler.
 *
 * Fetches current cron jobs and stop-hooks, then renders the
 * {@link Oj4} LoopsManagerDialog.
 *
 * @param onDone - Callback invoked with a status message.
 * @param session - The active session handle (provides app-state and hooks registry).
 */
var call = async (onDone: (message: string, opts: {
  display: string;
}) => void, session: SessionHandle): Promise<React.ReactElement> => {
  c("tengu_loops_command", {});
  let cronJobs = await J7H(),
    stopHooks = r1_(session.getAppState(), v_()),
    loops: LoopEntry[] = [...cronJobs.map(($): CronLoopEntry => ({
      kind: "cron",
      id: $.id,
      cron: $.cron,
      human: HV($.cron),
      prompt: $.prompt
    })), ...stopHooks.map(($, Y): StopHookEntry => ({
      kind: "stophook",
      id: `stophook-${Y}`,
      condition: $.prompt
    }))];

  /** Delete handler — removes a cron job or clears the active stop-hook. */
  async function handleDelete($: LoopEntry): Promise<void> {
    if ($.kind === "cron") {
      try {
        await j7H([$.id]), onDone(`Loop ${$.id} deleted`, {
          display: "system"
        });
      } catch (A) {
        onDone(`Failed to delete loop ${$.id}: ${A}`, {
          display: "system"
        });
      }
      return;
    }
    let removedCondition = a1_(session);
    onDone(removedCondition === null ? "Stop hook not found" : "Stop hook cleared", {
      display: "system"
    });
  }

  /** Create handler — schedules a new cron job or sets a stop-hook condition. */
  async function handleCreate($: CreateLoopRequest): Promise<void> {
    if ($.kind === "cron") {
      let cronExpr = ttO($.interval);
      if (!cronExpr) {
        onDone(`Invalid interval: ${$.interval}`, {
          display: "system"
        });
        return;
      }
      let newId = await SeH(cronExpr, $.prompt, !0, !1);
      onDone(`Loop ${newId} created (${HV(cronExpr)})`, {
        display: "system"
      });
      return;
    }
    let errorMessage = o1_($.condition, session);
    onDone(errorMessage ?? "Stop hook set", {
      display: "system"
    });
  }
  return DJq.createElement(Oj4, {
    loops: loops,
    onDelete: $ => void handleDelete($),
    onCreate: $ => void handleCreate($),
    onCancel: () => onDone("", {
      display: "skip"
    })
  });
};

// ---------------------------------------------------------------------------
// Lazy initializer — mirrors original `L(() => { ... })` structure exactly
// ---------------------------------------------------------------------------

var $j4 = L(() => {
  w_();
  Tj4();
  y_();
  bi();
  kp();
  opH();
  DJq = u(WH(), 1), stO = /^(\d+)([smhd])$/i;
});
export {zj4 as SPl,ttO as ugm,DJq as bPl,stO as cgm,call as dgm,$j4 as EPl};
