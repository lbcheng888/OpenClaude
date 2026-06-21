// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {Az as bi,AL as HV} from "../../vendor/m2683.ts";
import {G5 as kp,fae as J7H} from "../../vendor/m2684.ts";
import {ps as H9} from "../../vendor/m238.ts";
import {Q2 as RN,getTeammateContext as XG} from "../../vendor/m1457.ts";
import {z5 as cg,CRON_LIST_TOOL_NAME as LL_,IF as LC,CRON_LIST_DESCRIPTION as Hm8,buildCronListPrompt as _m8,isDurableCronEnabled as UzH} from "../config/2700_isKairosCronEnabled.ts";
import {o4n as NI6,NGa as emK,BGa as HpK} from "../../vendor/m4269.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
import {truncate as UK} from "../../vendor/m237.ts";
// ---------------------------------------------------------------------------
// CronListTool — tool definition for the "CronList" user-facing tool.
//
// Lists the active cron jobs scheduled in the current session (via CronCreate).
// When the caller is a teammate/sub-agent, only that agent's own jobs are
// returned; otherwise all session jobs are listed.
//
// This file is a 1:1 restoration of the obfuscated bundle module. Only internal
// (module-local) symbol names and TypeScript types have been added — all logic,
// control flow, operators (incl. !0/!1), string literals and cross-module
// references are preserved exactly.
//
// External (cross-module) symbols referenced here and defined elsewhere in the
// bundle (left under their bundle names on purpose):
//   j_   — esbuild-style export-binding helper (defines lazy getters on a ns).
//   L    — esbuild-style lazy module-init wrapper.
//   c9   — tool factory: builds a tool definition object from a spec.
//   kH   — memoized/lazy schema builder (returns the schema on first call).
//   k    — zod-like schema library (strictObject/object/array/string/boolean…).
//   LL_  — the user-facing tool name constant ("CronList").
//   LC   — feature gate: whether cron scheduling is enabled.
//   Hm8  — static description string for this tool.
//   _m8  — prompt builder; takes the current config/context and returns text.
//   UzH  — returns the current config/context object.
//   J7H  — async loader returning all scheduled cron jobs in the session.
//   XG   — returns the current teammate/agent context (has `agentId`) or falsy.
//   HV   — converts a 5-field cron expression to a human-readable schedule.
//   UK   — string truncation helper (text, maxLen, addEllipsis).
//   emK  — renderToolUseMessage renderer for this tool.
//   HpK  — renderToolResultMessage renderer for this tool.
//   a8/M7/bi/kp/H9/RN/cg/NI6 — module-init side-effect imports (preserved).
// ---------------------------------------------------------------------------

/** Export-binding namespace for this module (esbuild output). */
var cronListToolExports = {};
j_(cronListToolExports, {
  CronListTool: () => CronListTool
});

/** Lazy input-schema accessor, the lazy output-schema accessor, and the tool. */
var lazyInputSchema: () => unknown,
  lazyOutputSchema: () => unknown,
  CronListTool: unknown;

/** A single cron job record as returned by `J7H()`. */
interface CronJobRecord {
  id: string;
  cron: string;
  prompt: string;
  recurring?: boolean;
  durable?: boolean;
  agentId?: string;
}

/** Shape of the `data` payload produced by `call()` (mirrors the output schema). */
interface CronListResult {
  jobs: Array<{
    id: string;
    cron: string;
    humanSchedule: string;
    prompt: string;
    recurring?: boolean;
    durable?: boolean;
  }>;
}

var initCronListToolModule = L(() => {
  a8();
  M7();
  bi();
  kp();
  H9();
  RN();
  cg();
  NI6();
  // Input schema: no parameters accepted.
  lazyInputSchema = kH(() => k.strictObject({})), lazyOutputSchema = kH(() => k.object({
    jobs: k.array(k.object({
      id: k.string(),
      cron: k.string(),
      humanSchedule: k.string(),
      prompt: k.string(),
      recurring: k.boolean().optional(),
      durable: k.boolean().optional()
    }))
  })), CronListTool = c9({
    name: LL_,
    searchHint: "list active cron jobs",
    maxResultSizeChars: 1e5,
    shouldDefer: !0,
    get inputSchema() {
      return lazyInputSchema();
    },
    get outputSchema() {
      return lazyOutputSchema();
    },
    isEnabled() {
      return LC();
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    async description() {
      return Hm8;
    },
    async prompt() {
      return _m8(UzH());
    },
    async call() {
      let allJobs: CronJobRecord[] = await J7H(),
        agentContext = XG();
      return {
        data: {
          jobs: (agentContext ? allJobs.filter(job => job.agentId === agentContext.agentId) : allJobs).map(job => ({
            id: job.id,
            cron: job.cron,
            humanSchedule: HV(job.cron),
            prompt: job.prompt,
            ...(job.recurring ? {
              recurring: !0
            } : {}),
            ...(job.durable === !1 ? {
              durable: !1
            } : {})
          }))
        }
      };
    },
    mapToolResultToToolResultBlockParam(result: CronListResult, toolUseId: string) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result.jobs.length > 0 ? result.jobs.map(job => `${job.id} — ${job.humanSchedule}${job.recurring ? " (recurring)" : " (one-shot)"}${job.durable === !1 ? " [session-only]" : ""}: ${UK(job.prompt, 80, !0)}`).join(`
`) : "No scheduled jobs."
      };
    },
    renderToolUseMessage: emK,
    renderToolResultMessage: HpK
  });
});

export {cronListToolExports as WGa,lazyInputSchema as mLp,lazyOutputSchema as fLp,CronListTool,initCronListToolModule as GGa};
