// @ts-nocheck
import {je,tk} from "../../vendor/m577.ts";
import {Zle} from "../tui/3835_mode.ts";
import {oI} from "../../vendor/m3350.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {zge,x2t} from "../../vendor/m3901.ts";
import {Bh,bC} from "../session/2784_uuid.ts";
import {Ie,ln} from "../telemetry/0594_feature_name.ts";
import {b} from "../../runtime.ts";
/** Returns the ceiling ms for background-task wait, defaulting to G4m (600 000 ms). */
function blc() {
  return je.CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS ?? G4m;
}

/**
 * Computes the next sweep state for the print wind-down timer.
 * Returns a descriptor with deadline, swept, and shouldSweep flags.
 */
function Elc({
  runningBackgroundTasks: e,
  inputClosed: t,
  hasMainThreadQueued: n,
  hasActiveTeammates: r,
  hasPendingNotification: o,
  ceilingExceeded: s,
  deadline: i,
  swept: a,
  now: l
}) {
  // Only proceed when input is closed, no main-thread work queued, no teammates, and tasks remain
  if (!(t && !n && !r && e.length > 0 && (s || !o && !e.some(Zle)))) return {
    deadline: null,
    swept: !1,
    shouldSweep: !1
  };
  // First time entering wind-down: set the deadline
  if (i === null) return {
    deadline: s ? l : l + hNo,
    swept: s,
    shouldSweep: s
  };
  // Still before the deadline: keep waiting
  if (l < i) return {
    deadline: i,
    swept: a,
    shouldSweep: !1
  };
  // Deadline reached: mark as swept
  return {
    deadline: i,
    swept: !0,
    shouldSweep: !a
  };
}

/**
 * Kills or marks-stopped all running background tasks after the grace period.
 * Emits a telemetry event when any tasks were present.
 */
function Clc(e: any, t: any) {
  for (let backgroundTask of e)
  // Shell tasks are killed via signal; other tasks are just marked stopped
  if (oI(backgroundTask)) logForDebugging(`print wind-down: killing background shell ${backgroundTask.id} ("${backgroundTask.description}") after ${hNo}ms grace`), zge(backgroundTask.id, t);else logForDebugging(`print wind-down: no longer waiting on background ${backgroundTask.type} task ${backgroundTask.id} after ${hNo}ms grace`), Bh(backgroundTask.id, "stopped", {
    toolUseId: backgroundTask.toolUseId,
    summary: backgroundTask.description
  });
  // Report telemetry when there were tasks to wind down
  if (e.length > 0) Ie("print_wind_down");
}

/** Grace period in ms before sweeping background tasks. */
var hNo = 5000;
/** Default ceiling ms (10 minutes) for background-task wait. */
var G4m = 600000;

/** Module initializer — sets up dependencies. */
var vlc = b(() => {
  ln();
  x2t();
  qe();
  tk();
  bC();
});
export {blc,Elc,Clc,hNo,G4m,vlc};
