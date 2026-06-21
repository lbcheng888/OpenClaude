// @ts-nocheck
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {KAe,VAe,Mtt,hNi} from "../config/2691_reason.ts";
import {Ri,pi} from "./2227_userFacingName.ts";
import {jot,VF} from "../../vendor/m3280.ts";
import {GAe,RRe,Ott,Mh,iNi,sNi} from "../core/2689_GAe.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
/** Module-level vars: input schema, output schema, and the tool definition */
var fOp, AOp, sWa;

/**
 * delaySeconds tool — lets the agent self-pace the /loop by sleeping for a chosen interval.
 * Clamped to [60, 3600] seconds by the runtime. On wake, re-fires the stored /loop prompt.
 */
var iWa = b(() => {
  Xr();
  KAe();
  Ri();
  jot();
  GAe();
  // Input schema: delaySeconds, reason, prompt
  fOp = we(() => E.strictObject({
    delaySeconds: VF(E.number()).describe("Seconds from now to wake up. Clamped to [60, 3600] by the runtime."),
    reason: E.string().describe("One short sentence explaining the chosen delay. Goes to telemetry and is shown to the user. Be specific."),
    prompt: E.string().describe(`The /loop input to fire on wake-up. Pass the same /loop input verbatim each turn so the next firing re-enters the skill and continues the loop. For autonomous /loop (no user prompt), pass the literal sentinel \`${RRe}\` instead (the dynamic-pacing variant, not the CronCreate-mode \`${Ott}\`).`)
  })),
  // Output schema: scheduled timestamp, actual delay used, and clamping flag
  AOp = we(() => E.object({
    scheduledFor: E.number().describe("Epoch ms timestamp when the next wakeup will fire"),
    clampedDelaySeconds: E.number().describe("Actual delay used after clamping to runtime bounds"),
    wasClamped: E.boolean().describe("True if the requested delaySeconds was outside [60, 3600]")
  })),
  // Tool registration
  sWa = pi({
    name: Mh,
    searchHint: "self-pace next iteration: pick a delay before resuming work or running the next /loop tick",
    maxResultSizeChars: 1000,
    async description() {
      return iNi;
    },
    async prompt() {
      return sNi;
    },
    get inputSchema() {
      return fOp();
    },
    get outputSchema() {
      return AOp();
    },
    userFacingName() {
      return "";
    },
    shouldDefer: !0,
    // Always allow — no user permission needed for sleep scheduling
    async checkPermissions(input) {
      return {
        behavior: "allow",
        updatedInput: input
      };
    },
    renderToolUseMessage() {
      return null;
    },
    async call({
      delaySeconds: requestedDelay,
      reason: delayReason,
      prompt: loopPrompt
    }) {
      // Gate check: if the dynamic-pacing runtime is off, return zeroed result
      if (!VAe()) return Mtt("gate_off"), {
        data: {
          scheduledFor: 0,
          clampedDelaySeconds: 0,
          wasClamped: !1
        }
      };
      // Schedule the wakeup; returns null if loop has hit max duration
      let scheduleResult = hNi(requestedDelay, loopPrompt, delayReason);
      if (scheduleResult === null) return {
        data: {
          scheduledFor: 0,
          clampedDelaySeconds: 0,
          wasClamped: !1
        }
      };
      return {
        data: {
          scheduledFor: scheduleResult.scheduledFor,
          clampedDelaySeconds: scheduleResult.clampedDelaySeconds,
          wasClamped: scheduleResult.wasClamped
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      scheduledFor: scheduledFor,
      clampedDelaySeconds: clampedDelaySeconds,
      wasClamped: wasClamped
    }, toolUseId) {
      // scheduledFor===0 means wakeup was not scheduled (gate off or loop ended)
      if (scheduledFor === 0) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: "Wakeup not scheduled. Either the /loop dynamic runtime gate is off or the loop reached its maximum duration — the loop has ended; do not re-issue."
      };
      let timeString = new Date(scheduledFor).toTimeString().slice(0, 8),
        secondsFromNow = Math.max(0, Math.round((scheduledFor - Date.now()) / 1000)),
        clampedSuffix = wasClamped ? ` (clamped to ${clampedDelaySeconds}s from your requested value)` : "";
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `Next wakeup scheduled for ${timeString} (in ${secondsFromNow}s)${clampedSuffix}. Nothing more to do this turn — the harness re-invokes you when the wakeup fires or a task-notification arrives.`
      };
    }
  });
});
export {fOp,AOp,sWa,iWa};
