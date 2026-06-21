// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {Pt as u_,Go as Fq} from "../../vendor/m632.ts";
import {rIt as a0_,fsModule as Mt,_$ as oI,$hi as f57} from "../../vendor/m2246.ts";
import {q9t as yb_,QIe as ZGH,j9t as vb_} from "../../vendor/m4183.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {lt as w_,getTotalOutputTokens as JJ,getTurnOutputTokens as X$_,getCurrentTurnTokenBudget as P$_,getIsNonInteractiveSession as u8} from "../session/0131_sent.ts";
import {ln as M6,Oe as IH,Ie as vH} from "../telemetry/0594_feature_name.ts";
import {Ct as y_,logEvent as c} from "../../vendor/m131.ts";
import {Ax as nW,d9 as ev} from "../../vendor/m5146.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {zIe as wGH,registerWorkflowTask as u8q,updateWorkflowProgressBatch as m8q,failWorkflowTask as sE6,completeWorkflowTask as p8q,enqueueWorkflowNotification as tE6} from "../agent/4169_updateWorkflowProgressBatch.ts";
import {ch as OY,zRe as CPH} from "../../vendor/m2727.ts";
import {Ql as c4,Fr as I8} from "../../vendor/m4405.ts";
import {Rn as S6,De as EH} from "../session/0615_length.ts";
import {ay as aw,getRuleByContentsForToolName as h4H} from "./5184_toolAlwaysAllowedRule.ts";
import {XFn as xZ6,Ylt as S8_} from "../agent/3914_type.ts";
import {Out as QK_,F9n as wS6} from "../../vendor/m4172.ts";
import {G6a as AyK,W6a as YyK} from "../../vendor/m4185.ts";
import {udo as Zqq,cdo as Wqq} from "../../vendor/m4177.ts";
import {Mce as W4H,AI as iG,m6a as JNK} from "../../vendor/m4173.ts";
import {V6a as wyK,gdo as Vqq} from "../agent/4187_V6a.ts";
import {K6a as GyK} from "../../vendor/m4187.ts";
import {U9t as kb_,Mut as K4_,T6a as BVK} from "../agent/4177_runId.ts";
import {dja as ByK,aja as xyK,lja as uyK,cja as myK,uja as pyK} from "../../vendor/m4191.ts";
import {R4 as Dn,Ow as TP} from "../agent/2214_available.ts";
import {rBr as AP8,Q_n as r16} from "../config/2213_rBr.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
import {pP as Hk} from "../session/2690_resolveLoopFileFire.ts";
import {WORKFLOW_TOOL_NAME as bG} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {Qe as O_,fromEnum as tH} from "../../vendor/m5.ts";
// 4059_WorkflowTool.ts — "tools" subsystem
//
// Defines the `WorkflowTool` (user-facing name "Workflow", alias "RunWorkflow"):
// a tool that launches a self-contained, deterministic JavaScript workflow
// script which orchestrates subagents via agent()/parallel()/pipeline()/phase().
// The script can be supplied inline, by the name of a predefined workflow, or
// by a path to a persisted script file; an optional `resumeFromRunId` resumes a
// prior in-session run, replaying cached agent() results.
//
// 1:1 restoration: only internal symbols were renamed, types added, and doc
// comments inserted. Cross-module/global references (k, c9, iG, bG, Hk, oI,
// Vqq, Wqq, render fns, telemetry/task-registry helpers, etc.) and all logic,
// control flow, operators (!0/!1), and string literals are preserved exactly.

var Uqq = {};
j_(Uqq, {
  WorkflowTool: () => WorkflowTool,
  WorkflowInputError: () => WorkflowInputError
});

/**
 * Result of resolving a workflow source from the tool input.
 * `script` is always present on success; `resolvedScriptPath`/`source` accompany
 * scriptPath/named resolutions. On failure `error` carries the message.
 */
interface ResolvedWorkflowSource {
  script?: string;
  resolvedScriptPath?: string;
  source?: string;
  error?: string;
}

/**
 * Shape of the (partially typed) Workflow tool input. Only fields read by this
 * module are typed; the schema (`getWorkflowInputSchema`) is authoritative.
 */
interface WorkflowToolInput {
  script?: string;
  name?: string;
  description?: string;
  title?: string;
  args?: unknown;
  scriptPath?: string;
  resumeFromRunId?: string;
}

/**
 * Resolve the effective workflow script (and its origin) from the tool input.
 * Precedence: `scriptPath` > `name` > `script`. Returns `{ error }` when nothing
 * resolves or a named workflow is not found.
 */
async function resolveWorkflowSource(input: WorkflowToolInput): Promise<ResolvedWorkflowSource> {
  if (input.scriptPath) {
    if (input.script) return {
      script: input.script,
      resolvedScriptPath: QyK.resolve(u_(), input.scriptPath)
    };
    let resolved = await a0_(input.scriptPath);
    if ("error" in resolved) return resolved;
    return {
      script: resolved.script,
      resolvedScriptPath: resolved.path
    };
  }
  if (input.name) {
    let predefined = await yb_(input.name, u_());
    if (!predefined) {
      let availableNames = (await ZGH(u_())).map(workflow => workflow.name).join(", ");
      return {
        error: `Workflow "${input.name}" not found. Available: ${availableNames || "(none)"}`
      };
    }
    return {
      script: input.script ?? predefined.script,
      source: predefined.source
    };
  }
  if (input.script) return {
    script: input.script
  };
  return {
    error: "Must provide script, name, or scriptPath"
  };
}

/**
 * Telemetry-safe workflow name: report the real name only for built-in
 * workflows, otherwise bucket as "custom" to avoid leaking user content.
 */
function telemetryWorkflowName(workflowName: string | undefined, source: string | undefined): string {
  if (source === "built-in" && workflowName) return workflowName;
  return "custom";
}

/**
 * Telemetry-safe workflow description: include a truncated description only for
 * built-in workflows, otherwise emit an empty string.
 */
function telemetryWorkflowDescription(description: string | undefined, source: string | undefined): string {
  if (source === "built-in") return (description ?? "").slice(0, MAX_TELEMETRY_DESCRIPTION_LENGTH);
  return "";
}

var gyK: typeof import("crypto"),
  QyK: typeof import("path"),
  getWorkflowInputSchema: () => unknown,
  getWorkflowOutputSchema: () => unknown,
  WorkflowInputError: typeof WorkflowInputErrorClass,
  MAX_TELEMETRY_DESCRIPTION_LENGTH = 200,
  RETRACTED_DISPATCH_RESULT: { result: false; message: string; errorCode: number },
  WorkflowTool: unknown;

// FIXME: unverified name — `WorkflowInputErrorClass` mirrors the minified inner
// class identifier; the exported symbol remains `WorkflowInputError`.
declare const WorkflowInputErrorClass: {
  new (message?: string): Error;
};

var Fqq = L(() => {
  a8();
  w_();
  M6();
  y_();
  nW();
  M7();
  wGH();
  OY();
  c4();
  Fq();
  S6();
  aw();
  xZ6();
  QK_();
  AyK();
  Zqq();
  W4H();
  wyK();
  GyK();
  vb_();
  kb_();
  ByK();
  Dn();
  Mt();
  AP8();
  gyK = require("crypto"), QyK = require("path"), getWorkflowInputSchema = kH(() => k.strictObject({
    script: k.string().max(oI).optional().describe("Self-contained workflow script. Must begin with `export const meta = { name, description, phases }` (pure literal, no computed values) followed by the script body using agent()/parallel()/pipeline()/phase()."),
    name: k.string().optional().describe("Name of a predefined workflow (built-in or from .claude/workflows/). Resolves to a self-contained script."),
    description: k.string().optional().describe("Ignored — set the workflow description in the script's `meta` block."),
    title: k.string().optional().describe("Ignored — set the workflow title in the script's `meta` block."),
    args: k.unknown().optional().describe("Optional input value exposed to the script as the global `args`, verbatim. Pass arrays/objects as actual JSON values, NOT as a " + "JSON-encoded string — a stringified list breaks `args.filter`/" + "`args.map` in the script. Use for parameterized named workflows (e.g. a research question)."),
    scriptPath: k.string().optional().describe("Path to a workflow script file on disk. Every Workflow invocation persists its script under the session directory and returns the path in the tool result. To iterate, edit that file with Write/Edit and re-invoke Workflow with the same `scriptPath` instead of re-sending the full script. Takes precedence over `script` and `name`."),
    resumeFromRunId: k.string().regex(/^wf_[a-z0-9-]{6,}$/).optional().describe(`Run ID of a prior Workflow invocation to resume from. Completed agent() calls with unchanged (prompt, opts) return their cached results instantly; only edited or new calls re-run. Same-session only. Stop the prior run first (${Hk}) before resuming.`),
    ...!1
  }).refine((input: WorkflowToolInput) => input.script || input.name || input.scriptPath, {
    message: "Must provide script, name, or scriptPath"
  })), getWorkflowOutputSchema = kH(() => k.object({
    status: k.enum(["async_launched", "remote_launched"]),
    taskId: k.string(),
    taskType: k.enum(["local_workflow", "remote_agent"]).optional().describe("TaskType of the registered background task — 'local_workflow' for in-process runs, 'remote_agent' when remote:true dispatches to CCR. Set on all new writes; absent only on transcripts written before this field existed."),
    workflowName: k.string().optional().describe("meta.name from the workflow script — same value as task_started.workflow_name. Set on all new writes; absent only on transcripts written before this field existed."),
    runId: k.string().optional().describe("Local workflow run identifier for resumeFromRunId. Absent for remote_launched (the CCR session URL is the resume handle there) and on transcripts written before this field existed."),
    summary: k.string().optional(),
    transcriptDir: k.string().optional().describe("Directory where subagent transcripts are written during execution"),
    scriptPath: k.string().optional().describe("Path to the persisted workflow script for this invocation. Editable via Write/Edit; pass back as `scriptPath` to re-run without resending the script."),
    sessionUrl: k.string().optional().describe("CCR session URL when status is remote_launched"),
    warning: k.string().optional().describe("Non-blocking heads-up (e.g. local git state diverges from the pushed branch the cloud session will clone)"),
    error: k.string().optional().describe("Set if syntax check failed")
  }));
  /**
   * Error thrown when the resolved workflow input is invalid (unresolvable
   * source or a script that fails the syntax/meta check).
   */
  WorkflowInputError = class WorkflowInputError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "WorkflowInputError";
    }
  };
  RETRACTED_DISPATCH_RESULT = {
    result: !1,
    message: "Tool dispatch was retracted by a server fallback; the input may be truncated.",
    errorCode: 7
  };
  WorkflowTool = c9({
    name: bG,
    aliases: ["RunWorkflow"],
    searchHint: "orchestrate subagents with deterministic JavaScript workflow",
    maxResultSizeChars: 1e5,
    isEnabled: () => TP(),
    async prompt() {
      return Vqq;
    },
    async description() {
      return Vqq;
    },
    get inputSchema() {
      return getWorkflowInputSchema();
    },
    get outputSchema() {
      return getWorkflowOutputSchema();
    },
    toAutoClassifierInput(input: WorkflowToolInput): string {
      return input.script ?? input.name ?? "";
    },
    async validateInput(input: WorkflowToolInput, context: { abortController: AbortController; taskRegistry: { all(): Record<string, any> } }) {
      if (CPH(context.abortController.signal)) return RETRACTED_DISPATCH_RESULT;
      if (r16()) return {
        result: !1,
        message: "Dynamic workflows are disabled by managed settings (`disableWorkflows`).",
        errorCode: 5
      };
      if (!TP()) return {
        result: !1,
        message: 'Dynamic workflows are not enabled for this session (org policy, launch gate, or the "Dynamic workflows" setting in /config).',
        errorCode: 6
      };
      let resolved = await resolveWorkflowSource(input);
      if (CPH(context.abortController.signal)) return RETRACTED_DISPATCH_RESULT;
      if ("error" in resolved) return {
        result: !1,
        message: resolved.error,
        errorCode: 1
      };
      let parsed = iG(resolved.script);
      if ("error" in parsed) return {
        result: !1,
        message: `Invalid workflow script: ${parsed.error}`,
        errorCode: 2
      };
      if (input.script && JNK(parsed.scriptBody)) return {
        result: !1,
        message: "Workflow scripts must be deterministic: Date.now()/Math.random()/new Date() are unavailable (breaks resume). Stamp results after the workflow returns, or pass timestamps via args.",
        errorCode: 4
      };
      if (input.resumeFromRunId) {
        for (let [taskId, task] of Object.entries(context.taskRegistry.all())) if (task.type === "local_workflow" && task.status === "running" && task.workflowRunId === input.resumeFromRunId) return {
          result: !1,
          message: `Workflow ${input.resumeFromRunId} is still running (task ${taskId}). Stop it first with ${Hk}({taskId: "${taskId}"}) before resuming.`,
          errorCode: 3
        };
      }
      return {
        result: !0
      };
    },
    async checkPermissions(input: WorkflowToolInput, context: unknown) {
      let permissionContext = I8(context),
        ruleKey = input.scriptPath ? void 0 : input.name,
        getRule = (behavior: "deny" | "ask" | "allow") => ruleKey ? h4H(permissionContext, bG, behavior).get(ruleKey) : void 0,
        denyRule = getRule("deny");
      if (denyRule) return {
        behavior: "deny",
        message: `Workflow ${ruleKey} blocked by permission rules`,
        decisionReason: {
          type: "rule",
          rule: denyRule
        }
      };
      let updatedInput: WorkflowToolInput = input;
      if (input.scriptPath) {
        let resolvedFromPath = await a0_(input.scriptPath);
        if (!("error" in resolvedFromPath)) updatedInput = {
          ...input,
          script: resolvedFromPath.script
        };
      } else if (input.name) {
        let resolvedNamed = await yb_(input.name, u_());
        updatedInput = {
          ...input,
          script: resolvedNamed?.script
        };
      }
      let askRule = getRule("ask");
      if (askRule) return {
        behavior: "ask",
        message: "Review dynamic workflow before running",
        updatedInput: updatedInput,
        decisionReason: {
          type: "rule",
          rule: askRule
        }
      };
      let allowRule = getRule("allow");
      if (allowRule) return {
        behavior: "allow",
        updatedInput: updatedInput,
        decisionReason: {
          type: "rule",
          rule: allowRule
        }
      };
      return {
        behavior: "ask",
        message: "Review dynamic workflow before running",
        updatedInput: updatedInput,
        ...(ruleKey && {
          suggestions: [{
            type: "addRules",
            rules: [{
              toolName: bG,
              ruleContent: ruleKey
            }],
            behavior: "allow",
            destination: "localSettings"
          }]
        })
      };
    },
    userFacingName(): string {
      return "Workflow";
    },
    getToolUseSummary(input: WorkflowToolInput | undefined): string | null {
      if (input?.name) return `dynamic workflow: ${input.name}`;
      if (!input?.script) return null;
      let parsed = iG(input.script);
      if (!("error" in parsed)) return parsed.meta.description;
      let firstNonEmptyLine = input.script.split(`
`).find((line: string) => line.trim()) ?? "";
      return firstNonEmptyLine.length > 50 ? firstNonEmptyLine.slice(0, 49) + "…" : firstNonEmptyLine;
    },
    async call(input: WorkflowToolInput, context: any, abortSignal: AbortSignal, permissionContext: unknown, invocationContext: unknown) {
      let resolved = await resolveWorkflowSource(input);
      if ("error" in resolved) throw new WorkflowInputError(resolved.error!);
      let {
          script: script,
          source: source,
          resolvedScriptPath: resolvedScriptPath
        } = resolved,
        parsed = iG(script);
      if ("error" in parsed) throw new WorkflowInputError(`Invalid workflow script: ${parsed.error}`);
      let runId = input.resumeFromRunId ?? `wf_${gyK.randomUUID().slice(0, 12)}`,
        taskId = ev("local_workflow"),
        summary = parsed.meta.description,
        workflowName = parsed.meta.name,
        title = parsed.meta.title,
        compileResult = wS6(parsed.scriptBody);
      if (!compileResult.ok) return IH("task_local_workflow", "compile_failed"), {
        data: {
          status: "async_launched",
          taskId: taskId,
          taskType: "local_workflow",
          workflowName: workflowName,
          runId: runId,
          summary: summary,
          error: compileResult.error
        }
      };
      let transcriptDir = K4_(runId),
        scriptPath = resolvedScriptPath ?? f57(workflowName, runId, script),
        sourceKind = input.scriptPath ? "scriptPath" : source ?? "inline",
        telemetryName = telemetryWorkflowName(workflowName, source),
        telemetryDescription = telemetryWorkflowDescription(parsed.meta.description, source);
      if (c("tengu_workflow_launched", {
        invocation_mode: O_(input.scriptPath ? "scriptPath" : input.name ? "named" : "inline"),
        workflow_source: tH(sourceKind),
        workflow_name: telemetryName,
        workflow_description: telemetryDescription,
        phase_count: parsed.meta.phases?.length ?? 0,
        launched_from_subagent: context.agentId != null,
        has_args: input.args != null,
        is_resume: input.resumeFromRunId != null,
        script_size_chars: script.length
      }), input.resumeFromRunId != null) {
        vH("task_local_workflow_resume");
        for (let [priorTaskId, priorTask] of Object.entries(context.taskRegistry.all())) if (priorTask.type === "local_workflow" && priorTask.workflowRunId === input.resumeFromRunId && priorTask.status !== "running") context.taskRegistry.remove(priorTaskId);
      }
      let registration = u8q({
          taskId: taskId,
          script: script,
          scriptPath: scriptPath,
          summary: summary,
          workflowName: workflowName,
          title: title,
          phases: parsed.meta.phases,
          defaultModel: context.options.mainLoopModel,
          workflowRunId: runId,
          args: input.args,
          taskRegistry: context.taskRegistry,
          toolUseId: context.toolUseId
        }),
        runContext = {
          ...context,
          abortController: registration.abortController ?? context.abortController
        },
        startTurn = JJ() - X$_(),
        tokenBudget = {
          total: P$_(),
          getTurnSpent: () => JJ() - startTurn
        };
      return (async () => {
        let progressBuffer: any[] = [],
          FLUSH_DELAY_MS = 16,
          flushTimer: ReturnType<typeof setTimeout> | undefined,
          flushProgress = () => {
            if (flushTimer = void 0, progressBuffer.length === 0) return;
            let batch = progressBuffer;
            if (progressBuffer = [], m8q(taskId, batch, context.taskRegistry), !u8()) return;
            let visibleEvents = batch.filter((event: any) => event.type !== "workflow_log");
            if (visibleEvents.length === 0) return;
            let task = runContext.getAppState()?.tasks?.[taskId];
            if (task?.type !== "local_workflow" || task.status !== "running") return;
            let lastAgent = visibleEvents.findLast((event: any) => event.type === "workflow_agent");
            S8_({
              taskId: taskId,
              toolUseId: context.toolUseId,
              description: lastAgent ? lastAgent.phaseTitle ? `${lastAgent.phaseTitle}: ${lastAgent.label}` : lastAgent.label : registration.description,
              startTime: registration.startTime,
              totalTokens: task.totalTokens,
              toolUses: task.totalToolCalls,
              lastToolName: lastAgent?.label,
              summary: summary,
              workflowProgress: visibleEvents
            });
          },
          handleProgress = (progressEvent: any) => {
            if (progressEvent.type !== "progress") return;
            if (progressBuffer.push(progressEvent.data), !flushTimer) flushTimer = setTimeout(flushProgress, FLUSH_DELAY_MS);
          },
          runResult = await YyK(compileResult.vmScript, runContext, abortSignal, {
            workflowRunId: runId,
            onProgress: handleProgress,
            onAgentController: (agentId: string, controller: unknown) => {
              if (controller) registration.agentControllers?.set(agentId, controller);else registration.agentControllers?.delete(agentId);
            },
            args: input.args,
            seedPhaseTitles: parsed.meta.phases?.map((phase: any) => phase.title),
            tokenBudget: tokenBudget,
            journal: new Wqq(runId)
          });
        if (flushTimer) clearTimeout(flushTimer);
        flushProgress();
        let finalTask = runContext.getAppState()?.tasks?.[taskId],
          finalProgress = (finalTask?.workflowProgress ?? []).filter((event: any) => event.type !== "workflow_log"),
          totalTokens = finalTask?.totalTokens ?? 0,
          totalToolCalls = finalTask?.totalToolCalls ?? 0,
          finalStatus = registration.abortController?.signal.aborted ? "killed" : runResult.error ? "failed" : "completed";
        if (c("tengu_workflow_completed", {
          workflow_run_id: runId,
          workflow_source: tH(sourceKind),
          workflow_name: telemetryName,
          workflow_description: telemetryDescription,
          status: tH(finalStatus),
          agent_count: runResult.agentCount,
          total_tokens: totalTokens,
          total_tool_calls: totalToolCalls,
          duration_ms: runResult.durationMs
        }), sourceKind === "built-in") {
          let phaseStats = new Map();
          for (let progressEvent of finalTask?.workflowProgress ?? []) {
            if (progressEvent.type !== "workflow_agent") continue;
            if (progressEvent.phaseIndex === void 0 || !progressEvent.phaseTitle) continue;
            let stats = phaseStats.get(progressEvent.phaseIndex);
            if (!stats) stats = {
              title: progressEvent.phaseTitle,
              tokens: 0,
              toolCalls: 0,
              durationMs: 0,
              agentCount: 0,
              errorCount: 0,
              skipCount: 0
            }, phaseStats.set(progressEvent.phaseIndex, stats);
            if (stats.tokens += progressEvent.tokens ?? 0, stats.toolCalls += progressEvent.toolCalls ?? 0, stats.durationMs += progressEvent.durationMs ?? 0, stats.agentCount += 1, progressEvent.state === "error") if (progressEvent.error === "skipped by user") stats.skipCount += 1;else stats.errorCount += 1;
          }
          for (let [phaseIndex, stats] of phaseStats) c("tengu_workflow_phase_completed", {
            workflow_run_id: runId,
            workflow_source: tH(sourceKind),
            workflow_name: telemetryName,
            phase_index: phaseIndex,
            phase_title: stats.title,
            phase_tokens: stats.tokens,
            phase_tool_calls: stats.toolCalls,
            phase_agent_duration_ms: stats.durationMs,
            phase_agent_count: stats.agentCount,
            phase_error_count: stats.errorCount,
            phase_skip_count: stats.skipCount
          });
        }
        if (BVK(runId, {
          taskId: taskId,
          script: script,
          scriptPath: scriptPath,
          args: input.args,
          result: runResult.result,
          agentCount: runResult.agentCount,
          logs: runResult.logs,
          durationMs: runResult.durationMs,
          error: runResult.error,
          summary: summary,
          workflowName: workflowName,
          title: title,
          status: finalStatus,
          startTime: registration.startTime,
          phases: registration.phases,
          defaultModel: registration.defaultModel,
          workflowProgress: finalProgress,
          totalTokens: totalTokens,
          totalToolCalls: totalToolCalls
        }), registration.abortController?.signal.aborted) return;
        if (runResult.error) sE6(taskId, runResult.error, runResult.agentCount, runResult.logs, context.taskRegistry);else p8q(taskId, runResult.result, runResult.agentCount, runResult.logs, context.taskRegistry);
        tE6({
          taskId: taskId,
          summary: summary,
          status: runResult.error ? "failed" : "completed",
          error: runResult.error,
          result: runResult.result,
          failures: runResult.failures,
          agentCount: runResult.agentCount,
          totalTokens: totalTokens,
          totalToolCalls: totalToolCalls,
          durationMs: runResult.durationMs,
          taskRegistry: context.taskRegistry,
          toolUseId: context.toolUseId,
          transcriptDir: transcriptDir
        });
      })().catch((caught: unknown) => {
        EH(caught);
        let errorMessage = caught instanceof Error ? caught.message : String(caught),
          failedTask = runContext.getAppState()?.tasks?.[taskId],
          failedAgentCount = failedTask?.agentCount ?? 0;
        sE6(taskId, errorMessage, failedAgentCount, failedTask?.logs ?? [], context.taskRegistry), tE6({
          taskId: taskId,
          summary: summary,
          status: "failed",
          error: errorMessage,
          agentCount: failedAgentCount,
          totalTokens: failedTask?.totalTokens ?? 0,
          totalToolCalls: failedTask?.totalToolCalls ?? 0,
          durationMs: Date.now() - registration.startTime,
          taskRegistry: context.taskRegistry,
          toolUseId: context.toolUseId,
          transcriptDir: transcriptDir
        });
      }), {
        data: {
          status: "async_launched",
          taskId: taskId,
          taskType: "local_workflow",
          workflowName: workflowName,
          runId: runId,
          summary: summary,
          transcriptDir: transcriptDir,
          scriptPath: scriptPath
        }
      };
    },
    renderToolUseMessage: xyK,
    renderToolUseProgressMessage: uyK,
    renderToolResultMessage: myK,
    renderToolUseRejectedMessage: pyK,
    mapToolResultToToolResultBlockParam(result: any, toolUseId: string) {
      if (result.error) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `Workflow script has a syntax error and was not launched:
${result.error}`,
        is_error: !0
      };
      if (result.status === "remote_launched") return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `Workflow launched in a remote CCR session. Task ID: ${result.taskId}
Session: ${result.sessionUrl}
` + (result.summary ? `Summary: ${result.summary}
` : "") + (result.warning ? `Warning: ${result.warning}
` : "") + `
The workflow runs against a fresh clone of the pushed branch; phase progress is visible at the session URL, not in /workflows. You will be notified when it completes.`,
        is_error: !1
      };
      let summaryLine = result.summary ? `
Summary: ${result.summary}` : "",
        transcriptLine = result.transcriptDir ? `
Transcript dir: ${result.transcriptDir}` : "",
        scriptFileLine = result.scriptPath ? `
Script file: ${result.scriptPath}
(Edit this file with Write/Edit and re-invoke Workflow with {scriptPath: "${result.scriptPath}"} to iterate without resending the script.)` : "",
        resumeLine = result.scriptPath && result.runId ? `
Run ID: ${result.runId}
To resume after editing the script: Workflow({scriptPath: "${result.scriptPath}", resumeFromRunId: "${result.runId}"}) — completed agents return cached results.` : "",
        content = `Workflow launched in background. Task ID: ${result.taskId}${summaryLine}${transcriptLine}${scriptFileLine}${resumeLine}

You will be notified when it completes. Use /workflows to watch live progress.`;
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: content,
        is_error: !1
      };
    }
  });
});

export {Uqq as Cdo,resolveWorkflowSource as pja,telemetryWorkflowName as $0p,telemetryWorkflowDescription as j0p,gyK as fja,QyK as Aja,getWorkflowInputSchema as F0p,getWorkflowOutputSchema as U0p,WorkflowInputError,MAX_TELEMETRY_DESCRIPTION_LENGTH as q0p,RETRACTED_DISPATCH_RESULT as mja,WorkflowTool,Fqq as vdo};
