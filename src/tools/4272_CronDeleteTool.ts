// @ts-nocheck
import {isFullscreenWithTTY as __export,b as __esmInit} from "../../runtime.ts";
import {Xr as initA8} from "../../vendor/m321.ts";
import {Ri as initToolFactoryModule,pi as defineTool} from "./2227_userFacingName.ts";
import {G5 as initKp,WAe as getScheduledTasksPath,fae as loadScheduledJobs,mae as deleteScheduledJobs} from "../../vendor/m2684.ts";
import {Q2 as initRN,getTeammateContext as getCurrentAgentContext} from "../../vendor/m1457.ts";
import {z5 as initCg,CRON_DELETE_TOOL_NAME as CronDeleteToolName,IF as isCronFeatureEnabled,CRON_DELETE_DESCRIPTION as cronDeleteDescription,buildCronDeletePrompt,isDurableCronEnabled as getScheduledTasksPersistContext} from "../config/2700_isKairosCronEnabled.ts";
import {o4n as initNI6,LGa as renderCronDeleteToolUseMessage,MGa as renderCronDeleteToolResultMessage} from "../../vendor/m4269.ts";
import {we as memoizeThunk} from "../../vendor/m455.ts";
import {E as z} from "../../vendor/m319.ts";
/**
 * CronDelete tool definition.
 *
 * Cancels a previously scheduled cron job (created via CronCreate) by its job
 * ID. Looks the job up in the scheduled-task store, enforces that teammates can
 * only delete jobs they own, then removes it.
 *
 * Part of the cron tool family: CronCreate / CronList / CronDelete.
 */

// esbuild module-export namespace + binder.
var cronDeleteToolExports = {};
__export(cronDeleteToolExports, {
  CronDeleteTool: () => CronDeleteTool
});

// Lazily-built input schema, lazily-built output schema, and the tool itself.
// These are populated when the module initializer below first runs.
var cronDeleteInputSchema: () => unknown,
  cronDeleteOutputSchema: () => unknown,
  CronDeleteTool: unknown;

/**
 * Run-once module initializer. Pulls in the dependency modules' side effects,
 * then defines the input/output schemas and the CronDeleteTool object.
 */
var initCronDeleteToolModule = __esmInit(() => {
  // Dependency module initializers (side-effecting, run-once). Only the tool
  // factory module (M7, defines defineTool/c9) is verified from the restored
  // set; the others are external module inits shared across the cron tools and
  // their exact roles are not confirmed here.
  initA8(); // FIXME: unverified name (a8)
  initToolFactoryModule(); // M7 — verified: defines defineTool (c9)
  initKp(); // FIXME: unverified name (kp)
  initRN(); // FIXME: unverified name (RN)
  initCg(); // FIXME: unverified name (cg)
  initNI6(); // FIXME: unverified name (NI6)

  // Input: a single required job id. `strictObject` rejects unknown keys.
  cronDeleteInputSchema = memoizeThunk(() => z.strictObject({
    id: z.string().describe("Job ID returned by CronCreate.")
  })), cronDeleteOutputSchema = memoizeThunk(() => z.object({
    id: z.string()
  })), CronDeleteTool = defineTool({
    name: CronDeleteToolName,
    searchHint: "cancel a scheduled cron job",
    maxResultSizeChars: 1e5,
    shouldDefer: !0,
    get inputSchema() {
      return cronDeleteInputSchema();
    },
    get outputSchema() {
      return cronDeleteOutputSchema();
    },
    isEnabled() {
      return isCronFeatureEnabled();
    },
    /** Auto-classifier just keys off the job id. */
    toAutoClassifierInput(input: { id: string }) {
      return input.id;
    },
    async description() {
      return cronDeleteDescription;
    },
    async prompt() {
      return buildCronDeletePrompt(getScheduledTasksPersistContext());
    },
    getPath() {
      return getScheduledTasksPath();
    },
    /**
     * Validate the requested deletion: the job must exist, and a teammate
     * agent may only delete jobs it owns.
     */
    async validateInput(input: { id: string }) {
      let matchedJob = (await loadScheduledJobs()).find(job => job.id === input.id);
      if (!matchedJob) return {
        result: !1,
        message: `No scheduled job with id '${input.id}'`,
        errorCode: 1
      };
      let currentAgent = getCurrentAgentContext();
      if (currentAgent && matchedJob.agentId !== currentAgent.agentId) return {
        result: !1,
        message: `Cannot delete cron job '${input.id}': owned by another agent`,
        errorCode: 2
      };
      return {
        result: !0
      };
    },
    /** Delete the job and echo back its id. */
    async call({
      id: jobId
    }: { id: string }) {
      return await deleteScheduledJobs([jobId]), {
        data: {
          id: jobId
        }
      };
    },
    mapToolResultToToolResultBlockParam(result: { id: string }, toolUseId: string) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `Cancelled job ${result.id}.`
      };
    },
    renderToolUseMessage: renderCronDeleteToolUseMessage,
    renderToolResultMessage: renderCronDeleteToolResultMessage
  });
});

export {cronDeleteToolExports as qGa,cronDeleteInputSchema as uLp,cronDeleteOutputSchema as dLp,CronDeleteTool,initCronDeleteToolModule as jGa};
