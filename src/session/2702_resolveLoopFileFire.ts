// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {U9i as gL7,HVr as vu8,uke as XPH,aW as gg,F9i as UL7,B9i as FL7,oee as xzH} from "./2699_oee.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {react as vY,dke as PPH,Nrt as CeH,sge as uzH} from "../core/2701_sge.ts";
import {getProjectRoot as I1,lt as w_} from "./0132_sent.ts";
import {or as Y8,dn as A6} from "../config/0137_namespace.ts";
import {Jo as $7,cn as L6,Ct as L_} from "../../vendor/m197.ts";
import {qz as Ii,EC as aM} from "../telemetry/2700_qz.ts";
// Subsystem: session — autonomous /loop tick resolution.
//
// This module turns the literal "loop fire" sentinel strings (delivered as the
// `prompt` of a scheduled wakeup / cron tick) into the actual prompt text the
// model should run for that tick. There are two loop modes:
//   - "autonomous loop" — the model reasons about what work to advance on its own
//     (sentinels `<<autonomous-loop>>` / `<<autonomous-loop-dynamic>>`).
//   - "loop.md file"     — the user authored a loop.md task file; each tick works
//     through those tasks (sentinels `<<loop.md>>` / `<<loop.md-dynamic>>`).
// The "-dynamic" variants are scheduled via the ScheduleWakeup tool (self-pacing)
// rather than a recurring cron, so their prompts instruct the model to reschedule
// itself with the same sentinel to keep the loop alive.
//
// On the FIRST fire of a loop, the long autonomous-loop preamble is prepended once;
// subsequent fires omit it (deduped via module state). State is reset between loop
// runs via resetAutonomousLoopDelivered().

// ── Bundler-injected cross-module aliases (defined elsewhere; keep names as-is) ──
//
// j_ — defineExportGetters(target, getters): installs lazy getters as module exports.
declare const j_: (target: object, getters: Record<string, () => unknown>) => void;
// L — lazy module initializer wrapper (run-once init thunk).
declare const L: (init: () => void) => () => void;
// q_ — parse an environment-variable string into a boolean (truthy "1"/"true"/etc).
declare const q_: (value: string | undefined) => boolean;
// Y_ — read a feature-gate / statsig flag by name, with a default value.
declare const Y_: <T>(flag: string, defaultValue: T) => T;
// c — emit a telemetry event with an arbitrary properties payload.
declare const c: (event: string, properties: Record<string, unknown>) => void;
// $7 — true if the given error is a "file not found" (ENOENT) error.
declare const $7: (error: unknown) => boolean;
// L6 — extract the syscall error code (e.g. "EISDIR") from an error object.
declare const L6: (error: unknown) => string | undefined;
// I1 — absolute path of the user's Claude config home directory.
declare const I1: () => string;
// Y8 — absolute path of the current working directory / project root.
declare const Y8: () => string;
// XPH — true when push notifications are enabled and the agent-push gate is on.
declare const XPH: () => boolean;

// Tool name constants and the autonomous-loop preamble variants, defined in the
// sibling session modules and referenced here.
declare const gg: string; // "PushNotification" tool name.
declare const vY: string; // "ScheduleWakeup" tool name.
declare const aM: string; // "Monitor" tool name.
declare const CeH: string; // "<<autonomous-loop>>" sentinel.
declare const PPH: string; // "<<autonomous-loop-dynamic>>" sentinel.
declare const vu8: string; // Default (non-persistent) autonomous-loop preamble text.
declare const gL7: string; // Persistent-variant autonomous-loop preamble text.

// Lazy-init thunks for sibling modules (side-effect-only registration), invoked
// from the module initializer below.
declare const w_: () => void;
declare const o6: () => void;
declare const y_: () => void;
declare const UL7: () => void;
declare const FL7: () => void;
declare const Ii: () => void;
declare const xzH: () => void;
declare const uzH: () => void;
declare const A6: () => void;
declare const L_: () => void;

/** Tool name: lists scheduled background tasks / monitors. */
var JL = "TaskList";
/** Tool name: stops a running background task, plus its tool description. */
var Hk = "TaskStop",
  taskStopToolDescription = `
- Stops a running background task by its ID
- Takes a task_id parameter identifying the task to stop
- Returns a success or failure status
- Use this tool when you need to terminate a long-running task
`;

// ── Public exports of this module ──
var loopExports = {};
j_(loopExports, {
  resolveLoopFileFire: () => resolveLoopFileFire,
  resolveLoopDefaultFire: () => resolveLoopDefaultFire,
  resolveAutonomousLoopFire: () => resolveAutonomousLoopFire,
  resetAutonomousLoopDelivered: () => resetAutonomousLoopDelivered,
  readLoopFile: () => readLoopFile,
  logAutonomousLoopActivation: () => logAutonomousLoopActivation,
  isLoopPersistentPreambleEnabled: () => isLoopPersistentPreambleEnabled,
  isLoopFileSentinel: () => isLoopFileSentinel,
  isLoopDefaultSentinel: () => isLoopDefaultSentinel,
  isLoopDefaultPromptEnabled: () => isLoopDefaultPromptEnabled,
  isAutonomousLoopSentinel: () => isAutonomousLoopSentinel,
  getAutonomousLoopPreamble: () => getAutonomousLoopPreamble,
  LOOP_FILE_SENTINEL: () => LOOP_FILE_SENTINEL,
  LOOP_FILE_DYNAMIC_SENTINEL: () => LOOP_FILE_DYNAMIC_SENTINEL,
  AUTONOMOUS_LOOP_PREAMBLE: () => AUTONOMOUS_LOOP_PREAMBLE
});

/**
 * Whether the "persistent" autonomous-loop preamble variant is active (a stickier
 * preamble that biases toward keeping the loop alive). Enabled either by the
 * CLAUDE_CODE_LOOP_PERSISTENT env var or the `tengu_kairos_loop_persistent` gate.
 */
function isLoopPersistentPreambleEnabled(): boolean {
  if (q_(process.env.CLAUDE_CODE_LOOP_PERSISTENT)) return !0;
  return Y_("tengu_kairos_loop_persistent", !1);
}

/** Returns the autonomous-loop preamble text for the currently active variant. */
function getAutonomousLoopPreamble(): string {
  return isLoopPersistentPreambleEnabled() ? gL7 : vu8;
}

/** Records a telemetry event when an autonomous loop is activated for a tick. */
function logAutonomousLoopActivation(): void {
  c("tengu_kairos_loop_persistent_activated", {
    variant: isLoopPersistentPreambleEnabled()
  });
}

/**
 * Builds the optional PushNotification guidance appended to loop tick prompts.
 * Returns "" when push notifications aren't enabled. `isLoopFileMode` slightly
 * changes the "when to ping" wording for file-driven loops vs. autonomous ones.
 */
function buildPushNotificationGuidance(isLoopFileMode: boolean = !1): string {
  if (!XPH()) return "";
  let blockedCondition = !isLoopFileMode && isLoopPersistentPreambleEnabled() ? "newly blocked on a decision you won't make alone, you're ending the loop" : "newly blocked on a decision you won't make alone, third straight tick with nothing to do, you're ending the loop";
  return `

Use ${gg} when the loop can't move further without the user, or when something landed that they'd want to act on now: ${blockedCondition}, or a major update arrived (CI went red, a review changes the plan). Progress you made yourself isn't a trigger — the transcript covers that. One ping per state, not per tick.`;
}

/** Prompt text for a recurring-cron autonomous loop tick (fixed pacing). */
function buildAutonomousTickPrompt(): string {
  return `# Autonomous loop tick

Run the autonomous check using the loop instructions established earlier in this conversation. If you cannot find them, treat this as a no-op tick. The recurring cron will fire the next tick automatically — do not call ${vY} from this tick.${buildPushNotificationGuidance()}`;
}

/** Prompt text for a self-scheduled autonomous loop tick (dynamic pacing). */
function buildAutonomousDynamicTickPrompt(): string {
  return `# Autonomous loop tick (dynamic pacing)

Run the autonomous check using the loop instructions established earlier in this conversation. If you cannot find them, treat this as a no-op tick.

You scheduled this tick via the ${vY} tool (not a recurring cron). To keep the loop alive, call ${vY} again at the end of this turn with \`prompt\` set to the literal sentinel \`${PPH}\` — otherwise the loop ends after this tick.${dynamicPacingReminder}${buildPushNotificationGuidance()}`;
}

/** Whether the `tengu_kairos_loop_prompt` gate enabling loop prompts is on. */
function isLoopDefaultPromptEnabled(): boolean {
  return Y_("tengu_kairos_loop_prompt", !1);
}

/** True if `prompt` is one of the autonomous-loop sentinel strings. */
function isAutonomousLoopSentinel(prompt: string): boolean {
  return prompt === CeH || prompt === PPH;
}

/**
 * Resolves an autonomous-loop sentinel into the tick prompt, or null if `prompt`
 * isn't such a sentinel (or loop prompts are disabled). On the first fire of a loop
 * run, prepends the autonomous-loop preamble once.
 */
function resolveAutonomousLoopFire(prompt: string): string | null {
  if (!isAutonomousLoopSentinel(prompt)) return null;
  if (!isLoopDefaultPromptEnabled()) return null;
  logAutonomousLoopActivation();
  let tickPrompt = prompt === PPH ? buildAutonomousDynamicTickPrompt() : buildAutonomousTickPrompt();
  if (preambleDelivered || lastLoopContent !== null) return tickPrompt;
  return preambleDelivered = !0, `${getAutonomousLoopPreamble()}

---

${tickPrompt}`;
}

/** Prompt text for a recurring-cron loop.md tick (fixed pacing). */
function buildLoopFileTickPrompt(): string {
  return `# /loop tick — loop.md tasks

Work the tasks from the loop.md contents established earlier in this conversation. If you cannot find them, treat this as a no-op tick. The recurring cron will fire the next tick automatically — do not call ${vY} from this tick.${buildPushNotificationGuidance(!0)}`;
}

/** Prompt text for a self-scheduled loop.md tick (dynamic pacing). */
function buildLoopFileDynamicTickPrompt(): string {
  return `# /loop tick — loop.md tasks (dynamic pacing)

Work the tasks from the loop.md contents established earlier in this conversation. If you cannot find them, treat this as a no-op tick.

You scheduled this tick via the ${vY} tool (not a recurring cron). To keep the loop alive, call ${vY} again at the end of this turn with \`prompt\` set to the literal sentinel \`${LOOP_FILE_DYNAMIC_SENTINEL}\` — otherwise the loop ends after this tick.${dynamicPacingReminder}${buildPushNotificationGuidance(!0)}`;
}

/**
 * Prompt text for a self-scheduled loop tick where loop.md was expected but is
 * currently absent (dynamic pacing) — falls back to the autonomous check while
 * staying ready to pick loop.md back up if it reappears.
 */
function buildLoopFileMissingDynamicTickPrompt(): string {
  return `# /loop tick — loop.md absent (dynamic pacing)

loop.md is not currently present. Run the autonomous check using the loop instructions established earlier in this conversation.

You scheduled this tick via the ${vY} tool (not a recurring cron). To keep the loop alive — and to pick up loop.md if it is recreated — call ${vY} again at the end of this turn with \`prompt\` set to the literal sentinel \`${LOOP_FILE_DYNAMIC_SENTINEL}\` — otherwise the loop ends after this tick.${dynamicPacingReminder}${buildPushNotificationGuidance()}`;
}

/**
 * Truncates loop.md content to LOOP_FILE_MAX_BYTES, cutting on the last newline
 * before the limit when possible, and appends a truncation warning.
 */
function truncateLoopFileContent(content: string): string {
  if (content.length <= LOOP_FILE_MAX_BYTES) return content;
  let lastNewline = content.lastIndexOf(`
`, LOOP_FILE_MAX_BYTES);
  return `${content.slice(0, lastNewline > 0 ? lastNewline : LOOP_FILE_MAX_BYTES)}

> WARNING: loop.md was truncated to ${LOOP_FILE_MAX_BYTES} bytes. Keep the task list concise.`;
}

/**
 * Reads the user's loop.md task file, preferring the global config copy
 * (~/.claude/loop.md) then the project copy (<cwd>/loop.md). Skips missing,
 * directory, and empty files. Returns the resolved path and (truncated) content,
 * or null when no usable loop.md exists.
 */
function readLoopFile(): {
  path: string;
  content: string;
} | null {
  let candidatePaths: string[] = [bu8.join(I1(), ".claude", "loop.md"), bu8.join(Y8(), "loop.md")];
  for (let path of candidatePaths) {
    let rawContent: string;
    try {
      rawContent = fs.readFileSync(path, "utf-8");
    } catch (error) {
      if ($7(error) || L6(error) === "EISDIR") continue;
      throw error;
    }
    let trimmedContent = rawContent.trim();
    if (trimmedContent.length === 0) continue;
    return {
      path: path,
      content: truncateLoopFileContent(trimmedContent)
    };
  }
  return null;
}

/** True if `prompt` is one of the loop.md-driven sentinel strings. */
function isLoopFileSentinel(prompt: string): boolean {
  return prompt === LOOP_FILE_SENTINEL || prompt === LOOP_FILE_DYNAMIC_SENTINEL;
}

/**
 * Resolves a loop.md sentinel into the tick prompt, or null if `prompt` isn't such
 * a sentinel (or loop prompts are disabled). When loop.md exists, prepends its
 * contents once (deduped against the last-delivered content); when absent, falls
 * back to the autonomous check, prepending the autonomous preamble once.
 */
function resolveLoopFileFire(prompt: string): string | null {
  if (!isLoopFileSentinel(prompt)) return null;
  if (!isLoopDefaultPromptEnabled()) return null;
  let isDynamic = prompt === LOOP_FILE_DYNAMIC_SENTINEL,
    loopFile = readLoopFile();
  if (loopFile) {
    let tickPrompt = isDynamic ? buildLoopFileDynamicTickPrompt() : buildLoopFileTickPrompt();
    if (lastLoopContent === loopFile.content) return tickPrompt;
    return lastLoopContent = loopFile.content, `# /loop tick — tasks from ${loopFile.path}

The user configured a loop-tasks file. Work through the tasks defined below; these are the instructions for this tick and every subsequent tick (the reminder on later fires refers back to this message).

---

${loopFile.content}

---

${tickPrompt}`;
  }
  logAutonomousLoopActivation();
  let tickPrompt = isDynamic ? buildLoopFileMissingDynamicTickPrompt() : buildAutonomousTickPrompt();
  if (lastLoopContent === PREAMBLE_DELIVERED_MARKER || preambleDelivered) return tickPrompt;
  return lastLoopContent = PREAMBLE_DELIVERED_MARKER, preambleDelivered = !0, `${getAutonomousLoopPreamble()}

---

${tickPrompt}`;
}

/** True if `prompt` is any loop sentinel (autonomous or loop.md-driven). */
function isLoopDefaultSentinel(prompt: string): boolean {
  return isAutonomousLoopSentinel(prompt) || isLoopFileSentinel(prompt);
}

/**
 * Top-level loop-fire resolver: tries autonomous resolution, then loop.md
 * resolution, and otherwise returns the original prompt unchanged.
 */
function resolveLoopDefaultFire(prompt: string): string {
  return resolveAutonomousLoopFire(prompt) ?? resolveLoopFileFire(prompt) ?? prompt;
}

/** Resets per-loop-run dedup state so the next loop re-delivers its preamble. */
function resetAutonomousLoopDelivered(): void {
  preambleDelivered = !1, lastLoopContent = null;
}

// ── Module-internal state and constants ──
var fs: typeof import("fs"),
  // Node fs module (assigned in the initializer below).
  bu8: typeof import("path"),
  // Node path module (assigned below).
  AUTONOMOUS_LOOP_PREAMBLE: string,
  // Public alias of the default preamble text.
  dynamicPacingReminder: string,
  // Dynamic-pacing reminder block (built in the initializer).
  preambleDelivered: boolean = !1,
  // Whether the preamble has been delivered this loop run.
  lastLoopContent: string | null = null,
  // Last delivered loop content / preamble marker.
  PREAMBLE_DELIVERED_MARKER = "__autonomous_preamble__",
  // Sentinel content stored once the autonomous preamble has been sent.
  LOOP_FILE_SENTINEL = "<<loop.md>>",
  LOOP_FILE_DYNAMIC_SENTINEL = "<<loop.md-dynamic>>",
  LOOP_FILE_MAX_BYTES = 25000;

// Lazy module initializer: registers sibling modules, binds Node deps, and builds
// the dynamic-pacing reminder text (which references the Monitor / TaskList /
// TaskStop tool names).
var initLoopModule = L(() => {
  w_();
  o6();
  y_();
  UL7();
  FL7();
  Ii();
  xzH();
  uzH();
  A6();
  L_();
  fs = require("fs"), bu8 = require("path"), AUTONOMOUS_LOOP_PREAMBLE = vu8;
  dynamicPacingReminder = `

If a ${aM} is armed (check ${JL}), keep \`delaySeconds\` at 1200–1800s — the ${aM} is the wake signal and this is only the fallback heartbeat. If you were woken by a \`<task-notification>\`, handle the event before rescheduling. To stop the loop, also ${Hk} the monitor (use ${JL} to find its task ID if no longer in context).`;
});
export {JL as j0,Hk as vD,taskStopToolDescription as K9i,loopExports as w$e,isLoopPersistentPreambleEnabled,getAutonomousLoopPreamble,logAutonomousLoopActivation,buildPushNotificationGuidance as lMt,buildAutonomousTickPrompt as Y9i,buildAutonomousDynamicTickPrompt as IPd,isLoopDefaultPromptEnabled,isAutonomousLoopSentinel,resolveAutonomousLoopFire,buildLoopFileTickPrompt as xPd,buildLoopFileDynamicTickPrompt as DPd,buildLoopFileMissingDynamicTickPrompt as PPd,truncateLoopFileContent as OPd,readLoopFile,isLoopFileSentinel,resolveLoopFileFire,isLoopDefaultSentinel,resolveLoopDefaultFire,resetAutonomousLoopDelivered,fs as j9i,bu8 as DVr,AUTONOMOUS_LOOP_PREAMBLE,dynamicPacingReminder as LVr,preambleDelivered as aMt,lastLoopContent as Frt,PREAMBLE_DELIVERED_MARKER as z9i,LOOP_FILE_SENTINEL,LOOP_FILE_DYNAMIC_SENTINEL,LOOP_FILE_MAX_BYTES as qkn,initLoopModule as k$e};
