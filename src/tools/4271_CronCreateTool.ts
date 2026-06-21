// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {lt as w_,setScheduledTasksEnabled as va} from "../session/0131_sent.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {Az as bi,X1 as uv,AL as HV} from "../../vendor/m2683.ts";
import {G5 as kp,WAe as IzH,Itt as veH,fae as J7H,Ptt as SeH} from "../../vendor/m2684.ts";
import {bke as T0H,rI as UG} from "../../vendor/m3279.ts";
import {Q2 as RN,getTeammateContext as XG} from "../../vendor/m1457.ts";
import {z5 as cg,DEFAULT_MAX_AGE_DAYS as Me,CRON_CREATE_TOOL_NAME as pW,IF as LC,buildCronCreateDescription as au8,isDurableCronEnabled as UzH,buildCronCreatePrompt as su8} from "../config/2700_isKairosCronEnabled.ts";
import {o4n as NI6,PGa as omK,OGa as amK} from "../../vendor/m4269.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
// 4246_CronCreateTool — "tools" subsystem
//
// Defines the `CronCreate` tool: schedules a recurring or one-shot prompt to be
// enqueued at cron-matched fire times. The tool validates the cron expression,
// enforces a maximum number of scheduled jobs, and persists durable jobs to
// `.claude/scheduled_tasks.json` (otherwise the job lives only in-memory for the
// current session).
//
// 1:1 restoration: only symbol names, types, and comments were changed.
// External/cross-module references (k, kH, UG, c9, Me, etc.) are preserved verbatim.

/** Module-export bag (populated by the bundler's `j_` define-exports helper). */
var cronCreateToolExports = {};
j_(cronCreateToolExports, {
  CronCreateTool: () => CronCreateTool
});

/**
 * Maximum number of scheduled cron jobs allowed at once. Creating a new job
 * fails validation when this limit is already reached.
 */
var MAX_SCHEDULED_JOBS = 50,
  /** Lazily-built zod input schema for the CronCreate tool (memoized via `kH`). */
  cronCreateInputSchema,
  /** Lazily-built zod output schema for the CronCreate tool (memoized via `kH`). */
  cronCreateOutputSchema,
  /** The exported CronCreate tool definition. */
  CronCreateTool;

/**
 * Lazy module initializer (`L` wraps the body so it runs once on first access).
 * Pulls in dependent modules, then constructs the input/output schemas and the
 * CronCreateTool definition.
 */
var initCronCreateToolModule = L(() => {
  a8();
  w_();
  M7();
  bi();
  kp();
  T0H();
  RN();
  cg();
  NI6();
  cronCreateInputSchema = kH(() => k.strictObject({
    cron: k.string().describe('Standard 5-field cron expression in local time: "M H DoM Mon DoW" (e.g. "*/5 * * * *" = every 5 minutes, "30 14 28 2 *" = Feb 28 at 2:30pm local once).'),
    prompt: k.string().describe("The prompt to enqueue at each fire time."),
    recurring: UG(k.boolean().optional()).describe(`true (default) = fire on every cron match until deleted or auto-expired after ${Me} days. false = fire once at the next match, then auto-delete. Use false for "remind me at X" one-shot requests with pinned minute/hour/dom/month.`),
    durable: UG(k.boolean().optional()).describe("true = persist to .claude/scheduled_tasks.json and survive restarts. false (default) = in-memory only, dies when this Claude session ends. Use true only when the user asks the task to survive across sessions.")
  })), cronCreateOutputSchema = kH(() => k.object({
    id: k.string(),
    humanSchedule: k.string(),
    recurring: k.boolean(),
    durable: k.boolean().optional()
  })), CronCreateTool = c9({
    name: pW,
    searchHint: "schedule a recurring or one-shot prompt",
    maxResultSizeChars: 1e5,
    shouldDefer: !0,
    get inputSchema() {
      return cronCreateInputSchema();
    },
    get outputSchema() {
      return cronCreateOutputSchema();
    },
    isEnabled() {
      return LC();
    },
    /** Builds the text fed to the auto-classifier from the tool input. */
    toAutoClassifierInput(input: { cron: string; prompt: string }) {
      return `${input.cron}: ${input.prompt}`;
    },
    async description() {
      return au8(UzH());
    },
    async prompt() {
      return su8(UzH());
    },
    getPath() {
      return IzH();
    },
    /**
     * Validates the cron input before scheduling:
     *  1. cron must be a syntactically valid 5-field expression,
     *  2. it must match at least one calendar date within the next year,
     *  3. the total scheduled job count must be under MAX_SCHEDULED_JOBS,
     *  4. durable jobs are rejected for teammate agents (they don't persist).
     */
    async validateInput(input: { cron: string; durable?: boolean }) {
      if (!uv(input.cron)) return {
        result: !1,
        message: `Invalid cron expression '${input.cron}'. Expected 5 fields: M H DoM Mon DoW.`,
        errorCode: 1
      };
      if (veH(input.cron, Date.now()) === null) return {
        result: !1,
        message: `Cron expression '${input.cron}' does not match any calendar date in the next year.`,
        errorCode: 2
      };
      if ((await J7H()).length >= MAX_SCHEDULED_JOBS) return {
        result: !1,
        message: `Too many scheduled jobs (max ${MAX_SCHEDULED_JOBS}). Cancel one first.`,
        errorCode: 3
      };
      if (input.durable && XG()) return {
        result: !1,
        message: "durable crons are not supported for teammates (teammates do not persist across sessions)",
        errorCode: 4
      };
      return {
        result: !0
      };
    },
    /**
     * Schedules the job and returns its id alongside a human-readable schedule.
     * `durable` is only honored outside teammate sessions (gated on `UzH()`).
     */
    async call({
      cron,
      prompt,
      recurring = !0,
      durable = !1
    }: {
      cron: string;
      prompt: string;
      recurring?: boolean;
      durable?: boolean;
    }) {
      let persistDurable = durable && UzH(),
        jobId = await SeH(cron, prompt, recurring, persistDurable, XG()?.agentId);
      return va(!0), {
        data: {
          id: jobId,
          humanSchedule: HV(cron),
          recurring,
          durable: persistDurable
        }
      };
    },
    /** Renders the tool result into a `tool_result` block for the model. */
    mapToolResultToToolResultBlockParam(
      result: { id: string; humanSchedule: string; recurring: boolean; durable?: boolean },
      toolUseId: string
    ) {
      let persistenceNote = result.durable ? "Persisted to .claude/scheduled_tasks.json" : "Session-only (not written to disk, dies when Claude exits)";
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result.recurring ? `Scheduled recurring job ${result.id} (${result.humanSchedule}). ${persistenceNote}. Auto-expires after ${Me} days. Use CronDelete to cancel sooner.` : `Scheduled one-shot task ${result.id} (${result.humanSchedule}). ${persistenceNote}. It will fire once then auto-delete.`
      };
    },
    renderToolUseMessage: omK,
    renderToolResultMessage: amK
  });
});

export {cronCreateToolExports as UGa,MAX_SCHEDULED_JOBS as FGa,cronCreateInputSchema as aLp,cronCreateOutputSchema as lLp,CronCreateTool,initCronCreateToolModule as $Ga};
