// @ts-nocheck
import {b as L} from "../../runtime.ts";
// Module: core/2681_uzH
//
// Defines the static text constants for the `ScheduleWakeup` tool, which backs
// the "/loop dynamic" self-pacing mode. In that mode the model decides for
// itself how long to wait before the next iteration of a task by scheduling a
// wakeup with a chosen `delaySeconds`.
//
// The tool's wiring (input/output schemas, call handler, etc.) lives in
// tools/4221_delaySeconds.ts; this module only supplies:
//   - `vY`  : the tool name string.
//   - `CeH` / `PPH` : the two autonomous-loop sentinel prompts.
//   - `nL7` : the short tool description (returned by the tool's description()).
//   - `lL7` : the long tool prompt/instructions (returned by the tool's
//             prompt()), lazily initialized by `uzH()`.
//
// NOTE: `vY`, `CeH`, `PPH`, `nL7`, `lL7`, and `uzH` are referenced by name from
// other modules (e.g. tools/4221_delaySeconds.ts), so their identifiers are
// preserved exactly. Only types and documentation were added here.

/**
 * Tool name for the dynamic self-pacing wakeup scheduler.
 * Always uses the `-dynamic` autonomous-loop sentinel variant (see `PPH`).
 */
var vY: string = "ScheduleWakeup",
  /**
   * Sentinel `prompt` value for CronCreate-based autonomous loops. The runtime
   * resolves it back to the autonomous-loop instructions when the cron fires.
   * Distinct from `PPH` (the `ScheduleWakeup`/dynamic variant).
   */
  CeH: string = "<<autonomous-loop>>",
  /**
   * Sentinel `prompt` value for `ScheduleWakeup` dynamic-pacing autonomous
   * loops. The runtime resolves it back to the autonomous-loop instructions at
   * fire time. Distinct from `CeH` (the CronCreate-mode variant).
   */
  PPH: string = "<<autonomous-loop-dynamic>>",
  /**
   * Long-form tool prompt / instructions for `ScheduleWakeup`. Populated lazily
   * by `uzH()` on first use; `undefined` until then.
   */
  lL7: string | undefined,
  /**
   * Short tool description for `ScheduleWakeup`, surfaced in tool listings.
   */
  nL7: string = "Schedule when to resume work in /loop dynamic mode (always pass the `prompt` arg). Call before ending the turn to keep the loop alive; omit the call to end it.";

/**
 * Lazy, run-once initializer (wrapped by `L`) that assigns the long-form
 * `ScheduleWakeup` prompt text to `lL7`. Safe to call repeatedly; the body
 * executes only on the first invocation.
 */
var uzH: () => void = L(() => {
  lL7 = `Schedule when to resume work in /loop dynamic mode — the user invoked /loop without an interval, asking you to self-pace iterations of a specific task.

Do NOT schedule a short-interval wakeup to poll for background work you started — when harness-tracked work finishes, you are re-invoked automatically, so polling is wasted. Instead schedule a long fallback (1200s+) so the loop survives if the work hangs or never notifies. The exception is external work the harness cannot track (a CI run, a deploy, a remote queue) — there, pick a delay matched to how fast that state actually changes.

Pass the same /loop prompt back via \`prompt\` each turn so the next firing repeats the task. For an autonomous /loop (no user prompt), pass the literal sentinel \`${"<<autonomous-loop-dynamic>>"}\` as \`prompt\` instead — the runtime resolves it back to the autonomous-loop instructions at fire time. (There is a similar \`${"<<autonomous-loop>>"}\` sentinel for CronCreate-based autonomous loops; do not confuse the two — ${"ScheduleWakeup"} always uses the \`-dynamic\` variant.) Omit the call to end the loop.

## Picking delaySeconds

The Anthropic prompt cache has a 5-minute TTL. Sleeping past 300 seconds means the next wake-up reads your full conversation context uncached — slower and more expensive. So the natural breakpoints:

- **Under 5 minutes (60s–270s)**: cache stays warm. Right for actively polling external state the harness can't notify you about — a CI run, a deploy, a remote queue.
- **5 minutes to 1 hour (300s–3600s)**: pay the cache miss. Right when there's no point checking sooner — waiting on something that takes minutes to change, genuinely idle, or as the long fallback heartbeat when something else is the primary wake signal.

**Don't pick 300s.** It's the worst-of-both: you pay the cache miss without amortizing it. If you're tempted to "wait 5 minutes," either drop to 270s (stay in cache) or commit to 1200s+ (one cache miss buys a much longer wait). Don't think in round-number minutes — think in cache windows.

For idle ticks with no specific signal to watch, default to **1200s–1800s** (20–30 min). The loop checks back, you don't burn cache 12\xD7 per hour for nothing, and the user can always interrupt if they need you sooner.

Think about what you're actually waiting for, not just "how long should I sleep." If you're polling a CI run that takes ~8 minutes, sleeping 60s burns the cache 8 times before it finishes — sleep ~270s twice instead.

The runtime clamps to [60, 3600], so you don't need to clamp yourself.

## The reason field

One short sentence on what you chose and why. Goes to telemetry and is shown back to the user. "watching CI run" beats "waiting." The user reads this to understand what you're doing without having to predict your cadence in advance — make it specific.
`;
});
export {vY as react,CeH as Nrt,PPH as dke,lL7 as G9i,nL7 as V9i,uzH as sge};
