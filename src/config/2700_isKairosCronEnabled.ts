// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {st as q_} from "../../vendor/m5.ts";
import {bK as iS,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {sq as Np,TC as aM,hz as Ii} from "../telemetry/2688_hz.ts";
import {G5 as kp,W5 as Fg} from "../../vendor/m2684.ts";
import {sn as A6} from "./0047_namespace.ts";
// 2693_isKairosCronEnabled — "config" subsystem
//
// Feature-flag helpers and prompt-builder functions for the Kairos cron scheduler.
// Exports the canonical tool/description constants consumed by the CronCreate,
// CronDelete and CronList tool definitions.
//
// 1:1 restoration: only symbol names, types, and comments were changed.
// Cross-module references (j_, q_, iS, Fg, Np, aM, L, o6, kp, A6, Ii) are preserved verbatim.

/** Tool-name constant for the legacy "ListAgents" command alias used elsewhere in the bundle. */
var UeH = "ListAgents";

/** Module-export bag (populated by the bundler's `j_` define-exports helper). */
var cronEnabledExports = {};
j_(cronEnabledExports, {
  isKairosCronEnabled: () => isKairosCronEnabled,
  isDurableCronEnabled: () => isDurableCronEnabled,
  buildCronListPrompt: () => buildCronListPrompt,
  buildCronDeletePrompt: () => buildCronDeletePrompt,
  buildCronCreatePrompt: () => buildCronCreatePrompt,
  buildCronCreateDescription: () => buildCronCreateDescription,
  DEFAULT_MAX_AGE_DAYS: () => DEFAULT_MAX_AGE_DAYS,
  CRON_LIST_TOOL_NAME: () => CRON_LIST_TOOL_NAME,
  CRON_LIST_DESCRIPTION: () => CRON_LIST_DESCRIPTION,
  CRON_DELETE_TOOL_NAME: () => CRON_DELETE_TOOL_NAME,
  CRON_DELETE_DESCRIPTION: () => CRON_DELETE_DESCRIPTION,
  CRON_CREATE_TOOL_NAME: () => CRON_CREATE_TOOL_NAME
});

/** Cross-module imports kept as-is to preserve linkage. */
declare function q_(value: string | undefined): boolean;
declare function iS(flag: string, fallback: boolean, ttl: number): boolean;
declare function Np(): boolean;
declare const aM: string;
declare const Fg: { recurringMaxAgeMs: number };
declare function L(fn: () => void): () => void;
declare function j_(target: object, exports: Record<string, () => unknown>): void;
declare function o6(): void;
declare function kp(): void;
declare function A6(): void;
declare function Ii(): void;

/**
 * Returns true when the Kairos cron scheduler feature is enabled.
 *
 * Gated by both the `CLAUDE_CODE_DISABLE_CRON` environment variable (if truthy,
 * the feature is disabled) and the `tengu_kairos_cron` GrowthBook feature flag.
 */
function isKairosCronEnabled(): boolean {
  return !q_(process.env.CLAUDE_CODE_DISABLE_CRON) && iS("tengu_kairos_cron", !0, CRON_FLAG_CACHE_TTL_MS);
}

/**
 * Returns true when durable cron (persists to `.claude/scheduled_tasks.json`)
 * is enabled via the `tengu_kairos_cron_durable` feature flag.
 */
function isDurableCronEnabled(): boolean {
  return iS("tengu_kairos_cron_durable", !0, CRON_FLAG_CACHE_TTL_MS);
}

/**
 * Builds the one-line description string for the CronCreate tool.
 *
 * @param durable - When true, includes wording about `.claude/scheduled_tasks.json` persistence.
 */
function buildCronCreateDescription(durable: boolean): string {
  return durable ? "Schedule a prompt to run at a future time — either recurring on a cron schedule, or once at a specific time. Pass durable: true to persist to .claude/scheduled_tasks.json; otherwise session-only." : "Schedule a prompt to run at a future time within this Claude session — either recurring on a cron schedule, or once at a specific time.";
}

/**
 * Builds the full system-prompt for the CronCreate tool.
 *
 * Includes cron syntax guidance, one-shot vs recurring guidance, jitter advice,
 * durability semantics (when `durable` is true), and Monitor-tool cross-reference
 * (when `tengu_amber_sentinel` is enabled via {@link Np}).
 *
 * @param durable - When true, includes durability / persistence section.
 */
function buildCronCreatePrompt(durable: boolean): string {
  let durabilitySection = durable ? `## Durability

By default (durable: false) the job lives only in this Claude session — nothing is written to disk, and the job is gone when Claude exits. Pass durable: true to write to .claude/scheduled_tasks.json so the job survives restarts. Only use durable: true when the user explicitly asks for the task to persist ("keep doing this every day", "set this up permanently"). Most "remind me in 5 minutes" / "check back in an hour" requests should stay session-only.` : `## Session-only

Jobs live only in this Claude session — nothing is written to disk, and the job is gone when Claude exits.`,
    durableCatchupNote = durable ? "Durable jobs persist to .claude/scheduled_tasks.json and survive session restarts — on next launch they resume automatically. One-shot durable tasks that were missed while the REPL was closed are surfaced for catch-up. Session-only jobs die with the process. " : "";
  return `Schedule a prompt to be enqueued at a future time. Use for both recurring schedules and one-shot reminders.

Uses standard 5-field cron in the user's local timezone: minute hour day-of-month month day-of-week. "0 9 * * *" means 9am local — no timezone conversion needed.

## One-shot tasks (recurring: false)

For "remind me at X" or "at <time>, do Y" requests — fire once then auto-delete.
Pin minute/hour/day-of-month/month to specific values:
  "remind me at 2:30pm today to check the deploy" → cron: "30 14 <today_dom> <today_month> *", recurring: false
  "tomorrow morning, run the smoke test" → cron: "57 8 <tomorrow_dom> <tomorrow_month> *", recurring: false

## Recurring jobs (recurring: true, the default)

For "every N minutes" / "every hour" / "weekdays at 9am" requests:
  "*/5 * * * *" (every 5 min), "0 * * * *" (hourly), "0 9 * * 1-5" (weekdays at 9am local)

## Avoid the :00 and :30 minute marks when the task allows it

Every user who asks for "9am" gets \`0 9\`, and every user who asks for "hourly" gets \`0 *\` — which means requests from across the planet land on the API at the same instant. When the user's request is approximate, pick a minute that is NOT 0 or 30:
  "every morning around 9" → "57 8 * * *" or "3 9 * * *" (not "0 9 * * *")
  "hourly" → "7 * * * *" (not "0 * * * *")
  "in an hour or so, remind me to..." → pick whatever minute you land on, don't round

Only use minute 0 or 30 when the user names that exact time and clearly means it ("at 9:00 sharp", "at half past", coordinating with a meeting). When in doubt, nudge a few minutes early or late — the user will not notice, and the fleet will.

${durabilitySection}
${Np() ? `
## Not for live watching

${CRON_CREATE_TOOL_NAME} re-runs a prompt at fixed wall-clock intervals. To watch a log file, process, or command output and be notified the moment something changes, use the ${aM} tool instead — ${aM} streams events as they happen; cron polls on a schedule.
` : ""}
## Runtime behavior

Jobs only fire while the REPL is idle (not mid-query). ${durableCatchupNote}The scheduler adds a small deterministic jitter on top of whatever you pick: recurring tasks fire up to 10% of their period late (max 15 min); one-shot tasks landing on :00 or :30 fire up to 90 s early. Picking an off-minute is still the bigger lever.

Recurring tasks auto-expire after ${DEFAULT_MAX_AGE_DAYS} days — they fire one final time, then are deleted. This bounds session lifetime. Tell the user about the ${DEFAULT_MAX_AGE_DAYS}-day limit when scheduling recurring jobs.

Returns a job ID you can pass to ${CRON_DELETE_TOOL_NAME}.`;
}

/**
 * Builds the system-prompt description for the CronDelete tool.
 *
 * @param durable - When true, mentions `.claude/scheduled_tasks.json` for durable jobs.
 */
function buildCronDeletePrompt(durable: boolean): string {
  return durable ? `Cancel a cron job previously scheduled with ${CRON_CREATE_TOOL_NAME}. Removes it from .claude/scheduled_tasks.json (durable jobs) or the in-memory session store (session-only jobs).` : `Cancel a cron job previously scheduled with ${CRON_CREATE_TOOL_NAME}. Removes it from the in-memory session store.`;
}

/**
 * Builds the system-prompt description for the CronList tool.
 *
 * @param durable - When true, mentions both durable and session-only jobs.
 */
function buildCronListPrompt(durable: boolean): string {
  return durable ? `List all cron jobs scheduled via ${CRON_CREATE_TOOL_NAME}, both durable (.claude/scheduled_tasks.json) and session-only.` : `List all cron jobs scheduled via ${CRON_CREATE_TOOL_NAME} in this session.`;
}

/** Feature-flag cache TTL in ms (5 minutes). */
var CRON_FLAG_CACHE_TTL_MS = 300000,
  /** Number of days after which recurring cron tasks are auto-expired (derived from {@link Fg}.recurringMaxAgeMs). */
  DEFAULT_MAX_AGE_DAYS: number,
  /** Tool name constant for the CronCreate tool. */
  CRON_CREATE_TOOL_NAME = "CronCreate",
  /** Tool name constant for the CronDelete tool. */
  CRON_DELETE_TOOL_NAME = "CronDelete",
  /** Tool name constant for the CronList tool. */
  CRON_LIST_TOOL_NAME = "CronList",
  /** One-line description string for the CronDelete tool. */
  CRON_DELETE_DESCRIPTION = "Cancel a scheduled cron job by ID",
  /** One-line description string for the CronList tool. */
  CRON_LIST_DESCRIPTION = "List scheduled cron jobs";

/** Lazy module initializer — runs once on first access. */
var cg = L(() => {
  o6();
  kp();
  A6();
  Ii();
  DEFAULT_MAX_AGE_DAYS = Fg.recurringMaxAgeMs / 86400000;
});

export {UeH as qtt,cronEnabledExports as INi,isKairosCronEnabled as IF,isDurableCronEnabled,buildCronCreateDescription,buildCronCreatePrompt,buildCronDeletePrompt,buildCronListPrompt,CRON_FLAG_CACHE_TTL_MS as HNi,DEFAULT_MAX_AGE_DAYS,CRON_CREATE_TOOL_NAME,CRON_DELETE_TOOL_NAME,CRON_LIST_TOOL_NAME,CRON_DELETE_DESCRIPTION,CRON_LIST_DESCRIPTION,cg as z5};
