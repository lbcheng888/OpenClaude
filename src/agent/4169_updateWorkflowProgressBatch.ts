// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {flt as pK_,iy as sw,mh as bY,vC as HX} from "../../vendor/m5145.ts";
import {Jl as Z4,ch as OY} from "../../vendor/m2727.ts";
import {uI as H0,nR as nG,Ax as nW} from "../../vendor/m5146.ts";
import {Vqe as Tb_,MY as IHH} from "./4311_register.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Ie as vH,Oe as IH,ln as M6} from "../telemetry/0594_feature_name.ts";
import {Bh as CY,bC as sM} from "../session/2784_uuid.ts";
import {SO as zN,fp as g3,J_ as Uw,bO as $N,__ as ww,Mf as Cz,initKp as UO} from "../../vendor/m609.ts";
import {isAmberSentinelEnabled as LO,QH as ML} from "../../vendor/m2784.ts";
import {_m as AT,sA as S$} from "../../vendor/m2782.ts";
import {mainAgentId as d7,lt as w_} from "../session/0131_sent.ts";
// ---------------------------------------------------------------------------
// agent/4007 — Local Workflow Task lifecycle & progress tracking
//
// This module implements the in-process ("local") Workflow background task:
// the task that runs a dynamically-generated multi-agent workflow script. It
// covers the task's registration, incremental progress updates, completion /
// failure / pause / kill transitions, per-agent skip/retry control, and the
// user-facing completion notification that is injected back into the parent
// agent's message queue.
//
// 1:1 restoration: only identifiers, types and comments changed. All control
// flow, operators (including !0/!1), string literals and cross-module/property
// references are preserved exactly.
// ---------------------------------------------------------------------------

// --- Cross-module imports (minified, defined elsewhere; preserved verbatim) ---
// Module-export-registration helper (defineProperties-style export binder).
declare function j_(target: object, getters: Record<string, () => unknown>): void;
// Clears any pending/speculative state associated with a task id (e.g. removes
// queued speculative work before the real task takes over). Takes a taskId.
declare function pK_(taskId: string): void;
// Creates an AbortController, optionally auto-aborting after `timeoutMs`.
declare function Z4(timeoutMs?: number): AbortController;
// Base task-record factory: builds the common fields (id, type, description,
// outputFile, toolUseId, etc.) shared by every background task type.
declare function H0(taskId: string, type: string, description: string, toolUseId?: string): Record<string, unknown>;
// True when a status is terminal (completed/failed/killed) and thus the record
// is eligible for time-based eviction.
declare function nG(status: string): boolean;
// JSON.stringify wrapper.
declare function bH(value: unknown, replacer?: null, space?: number): string;
// Escapes a string for safe embedding inside the notification XML/markup.
declare function LO(text: string): string;
// Returns the on-disk output file path for a given task id.
declare function bY(taskId: string): string;
// Current (owner) agent id.
declare function d7(): string;
// Enqueues a message (here, a task-notification) into an agent's message queue.
declare function AT(message: {
  value: string;
  mode: string;
  agentId: string;
  priority: string;
  taskId?: string;
}): void;
// Telemetry: increment a success counter for `metricName`.
declare function vH(metricName: string): void;
// Telemetry: record a failure (`metricName` plus a `failedMetricName`).
declare function IH(metricName: string, failedMetricName: string): void;
// Removes/cleans up task-associated resources keyed by task id.
declare function sw(taskId: string): void;
// Emits a task stop/status event (e.g. "stopped") with tool-use/summary info.
declare function CY(taskId: string, status: string, info: { toolUseId?: string; summary?: string }): void;
// Diagnostic logger.
declare function N(message: string): void;
// Eviction TTL (ms) added to a terminal task's endTime to compute `evictAfter`.
declare const Tb_: number;

// XML-ish tag-name constants used to build the notification payload. Defined in
// shared modules; preserved exactly.
declare const zN: string; // tool_use_id tag
declare const g3: string; // task-notification wrapper tag
declare const Uw: string; // task id tag
declare const $N: string; // output file tag
declare const ww: string; // status tag
declare const Cz: string; // summary / headline tag

// Module bootstrap thunk (lazy require/init wrapper).
declare function L<T>(init: () => T): T;
// Lazy-init bodies invoked by the module bootstrap.
declare function w_(): void;
declare function UO(): void;
declare function M6(): void;
declare function nW(): void;
declare function OY(): void;
declare function FH(): void;
declare function S$(): void;
declare function sM(): void;
declare function H6(): void;
declare function HX(): void;
declare function IHH(): void;
declare function ML(): void;

// --- Local domain types (inferred from usage) -------------------------------

/** Lifecycle status of a local workflow task. */
type WorkflowTaskStatus = "running" | "completed" | "failed" | "paused" | "killed";

/**
 * One entry in a workflow's progress timeline. Agent and phase entries are keyed
 * (deduplicated) by `${type}:${index}`; log entries append-only.
 */
interface WorkflowProgressEntry {
  type: "workflow_agent" | "workflow_phase" | "workflow_log" | string;
  index?: number;
  state?: string; // e.g. "start" for workflow_agent
  tokens?: number;
  toolCalls?: number;
  [key: string]: unknown;
}

/** The in-memory record describing a running local workflow task. */
interface LocalWorkflowTaskRecord {
  type: "local_workflow";
  status: WorkflowTaskStatus;
  script: string;
  scriptPath: string;
  args: unknown;
  prompt: string;
  summary: string | undefined;
  workflowName: string | undefined;
  title: string | undefined;
  phases: unknown;
  defaultModel: string | undefined;
  workflowRunId: string | undefined;
  workflowProgress: WorkflowProgressEntry[];
  progressVersion: number;
  agentCount: number;
  totalTokens: number;
  totalToolCalls: number;
  logs: string[];
  abortController: AbortController | undefined;
  agentControllers: Map<number, AbortController> | undefined;
  // Provided by the H0(...) base-record factory (spread in at construction).
  outputFile: string;
  toolUseId?: string;
  description?: string;
  notified?: boolean;
  endTime?: number;
  evictAfter?: number;
  result?: unknown;
  error?: unknown;
  [key: string]: unknown;
}

/**
 * Minimal interface of the task registry consumed by this module: an
 * `update(id, mutator)` that applies a pure mutation to the stored record,
 * plus `register` and `abortSpeculation`.
 */
interface WorkflowTaskRegistry {
  register(task: LocalWorkflowTaskRecord): void;
  update(taskId: string, mutator: (task: LocalWorkflowTaskRecord) => LocalWorkflowTaskRecord): void;
  abortSpeculation(): void;
}

// --- Module export table ----------------------------------------------------
var U8q = {};
j_(U8q, {
  updateWorkflowProgressBatch: () => updateWorkflowProgressBatch,
  skipWorkflowAgent: () => skipWorkflowAgent,
  retryWorkflowAgent: () => retryWorkflowAgent,
  registerWorkflowTask: () => registerWorkflowTask,
  pauseWorkflowTask: () => pauseWorkflowTask,
  killWorkflowTask: () => killWorkflowTask,
  failWorkflowTask: () => failWorkflowTask,
  enqueueWorkflowNotification: () => enqueueWorkflowNotification,
  completeWorkflowTask: () => completeWorkflowTask,
  buildResumePrompt: () => buildResumePrompt,
  LocalWorkflowTask: () => LocalWorkflowTask
});

/**
 * Registers a new local workflow task in the task registry and returns the
 * created task record. Initialises an empty progress timeline, zeroed counters,
 * an abort controller and a per-agent controller map.
 */
function registerWorkflowTask({
  taskId,
  script,
  scriptPath,
  args,
  summary,
  workflowName,
  title,
  phases,
  defaultModel,
  workflowRunId,
  taskRegistry,
  toolUseId
}: {
  taskId: string;
  script: string;
  scriptPath: string;
  args: unknown;
  summary?: string;
  workflowName?: string;
  title?: string;
  phases?: unknown;
  defaultModel?: string;
  workflowRunId?: string;
  taskRegistry: WorkflowTaskRegistry;
  toolUseId?: string;
}): LocalWorkflowTaskRecord {
  pK_(taskId);
  let abortController = Z4(0),
    task: LocalWorkflowTaskRecord = {
      ...H0(taskId, "local_workflow", summary ?? "Dynamic workflow", toolUseId),
      type: "local_workflow",
      status: "running",
      script: script,
      scriptPath: scriptPath,
      args: args,
      prompt: script,
      summary: summary,
      workflowName: workflowName,
      title: title,
      phases: phases,
      defaultModel: defaultModel,
      workflowRunId: workflowRunId,
      workflowProgress: [],
      progressVersion: 0,
      agentCount: 0,
      totalTokens: 0,
      totalToolCalls: 0,
      logs: [],
      abortController: abortController,
      agentControllers: new Map()
    } as unknown as LocalWorkflowTaskRecord;
  return taskRegistry.register(task), task;
}

/**
 * Applies a batch of progress entries to a running workflow task.
 *
 * Agent and phase entries are upserted (deduplicated by `${type}:${index}`);
 * any other entry (e.g. logs) is appended. When the timeline grows beyond
 * `MAX_PROGRESS_ENTRIES * 2` it is compacted by dropping the oldest
 * `workflow_log` entries down to `MAX_PROGRESS_ENTRIES`. Recomputes the agent
 * count plus aggregate token / tool-call totals, and bumps `progressVersion`
 * by the number of entries applied. No-op if the batch is empty or the task is
 * not running.
 */
function updateWorkflowProgressBatch(
  taskId: string,
  entries: WorkflowProgressEntry[],
  taskRegistry: WorkflowTaskRegistry
): void {
  if (entries.length === 0) return;
  taskRegistry.update(taskId, task => {
    if (task.status !== "running") return task;
    let progress = [...task.workflowProgress],
      indexByKey = new Map<string, number>();
    for (let i = 0; i < progress.length; i++) {
      let entry = progress[i];
      if (entry.type === "workflow_agent" || entry.type === "workflow_phase") indexByKey.set(`${entry.type}:${entry.index}`, i);
    }
    let agentCount = task.agentCount,
      appendedNonKeyed = !1;
    for (let entry of entries) if (entry.type === "workflow_agent" || entry.type === "workflow_phase") {
      let key = `${entry.type}:${entry.index}`,
        existingIndex = indexByKey.get(key);
      if (existingIndex !== void 0) progress[existingIndex] = entry;else indexByKey.set(key, progress.length), progress.push(entry);
      if (entry.type === "workflow_agent" && entry.state === "start") agentCount = Math.max(agentCount, entry.index!);
    } else progress.push(entry), appendedNonKeyed = !0;
    if (appendedNonKeyed && progress.length > _NK * 2) {
      let logsToDrop = progress.length - _NK,
        compacted: WorkflowProgressEntry[] = [];
      for (let i = 0; i < progress.length; i++) {
        let entry = progress[i];
        if (logsToDrop > 0 && entry.type === "workflow_log") {
          logsToDrop--;
          continue;
        }
        compacted.push(entry);
      }
      progress = compacted;
    }
    let totalTokens = 0,
      totalToolCalls = 0;
    for (let entry of progress) if (entry.type === "workflow_agent") {
      if (entry.tokens) totalTokens += entry.tokens;
      if (entry.toolCalls) totalToolCalls += entry.toolCalls;
    }
    return {
      ...task,
      workflowProgress: progress,
      progressVersion: task.progressVersion + entries.length,
      agentCount: agentCount,
      totalTokens: totalTokens,
      totalToolCalls: totalToolCalls
    };
  });
}

/**
 * Transitions a running workflow task to a terminal `status`, aborting its
 * abort controller, stamping `endTime` (and `evictAfter` when the status is
 * eligible for eviction), clearing the controllers, and merging in `extra`
 * fields. Returns the pre-transition record (the task as it was while running)
 * or null if the task was not running.
 */
function aE6(
  taskId: string,
  taskRegistry: WorkflowTaskRegistry,
  status: WorkflowTaskStatus,
  extra: Partial<LocalWorkflowTaskRecord>
): LocalWorkflowTaskRecord | null {
  let previous: LocalWorkflowTaskRecord | null = null;
  return taskRegistry.update(taskId, task => {
    if (task.status !== "running") return task;
    previous = task, task.abortController?.abort();
    let endTime = Date.now();
    return {
      ...task,
      ...extra,
      status: status,
      endTime: endTime,
      ...(nG(status) && {
        evictAfter: endTime + Tb_
      }),
      abortController: void 0,
      agentControllers: void 0
    };
  }), previous;
}

/**
 * Marks a workflow task as completed, persists the result/summary/logs to the
 * task's output file (best-effort), and records a success metric.
 */
function completeWorkflowTask(
  taskId: string,
  result: unknown,
  agentCount: number,
  logs: string[],
  taskRegistry: WorkflowTaskRegistry
): void {
  let task = aE6(taskId, taskRegistry, "completed", {
    result: result,
    agentCount: agentCount,
    logs: logs
  });
  if (task) qNK.writeFile(task.outputFile, bH({
    summary: task.summary,
    agentCount: agentCount,
    logs: logs,
    result: result
  }, null, 2)).catch(err => N(`Failed to write workflow output for ${taskId}: ${err instanceof Error ? err.message : err}`)), vH("task_local_workflow");
}

/**
 * Marks a workflow task as failed, cleans up its resources, and records a
 * failure metric.
 */
function failWorkflowTask(
  taskId: string,
  error: unknown,
  agentCount: number,
  logs: string[],
  taskRegistry: WorkflowTaskRegistry
): void {
  let task = aE6(taskId, taskRegistry, "failed", {
    error: error,
    agentCount: agentCount,
    logs: logs
  });
  if (sw(taskId), task) IH("task_local_workflow", "task_local_workflow_failed");
}

/**
 * Pauses a running workflow task (marking it notified). Returns true if the
 * task was running and got paused, false otherwise.
 */
function pauseWorkflowTask(taskId: string, taskRegistry: WorkflowTaskRegistry): boolean {
  return aE6(taskId, taskRegistry, "paused", {
    notified: !0
  }) !== null;
}

/**
 * Builds the user-facing instruction string for resuming a paused workflow via
 * the Workflow tool, embedding the script path, run id and (optional) args.
 */
function buildResumePrompt(task: LocalWorkflowTaskRecord): string {
  let argsSuffix = task.args !== void 0 ? `, args: ${bH(task.args)}` : "";
  return `Resume the paused workflow by calling: Workflow({scriptPath: '${task.scriptPath}', resumeFromRunId: '${task.workflowRunId}'${argsSuffix}}) — completed agents return cached results.`;
}

/**
 * Kills a running workflow task: cleans up resources and emits a "stopped"
 * event with the task's tool-use id and description. Returns true if the task
 * was running and got killed, false otherwise.
 */
function killWorkflowTask(taskId: string, taskRegistry: WorkflowTaskRegistry): boolean {
  let task = aE6(taskId, taskRegistry, "killed", {
    notified: !0
  });
  if (task) sw(taskId), CY(taskId, "stopped", {
    toolUseId: task.toolUseId,
    summary: task.description
  });
  return task !== null;
}

/**
 * Aborts the abort controller for a single agent (by index) within a running
 * workflow with the given abort reason ("user-skip" / "user-retry"), and
 * records the corresponding metric. Returns true if an active, un-aborted
 * controller was found and aborted.
 */
function KNK(
  taskId: string,
  agentIndex: number,
  reason: "user-skip" | "user-retry",
  taskRegistry: WorkflowTaskRegistry
): boolean {
  let aborted = !1;
  if (taskRegistry.update(taskId, task => {
    if (task.status !== "running") return task;
    let controller = task.agentControllers?.get(agentIndex);
    if (controller && !controller.signal.aborted) controller.abort(reason), aborted = !0;
    return task;
  }), aborted) vH(reason === "user-skip" ? "task_local_workflow_skip_agent" : "task_local_workflow_retry_agent");
  return aborted;
}

/** Skips a single workflow agent by index (aborts it with reason "user-skip"). */
function skipWorkflowAgent(taskId: string, agentIndex: number, taskRegistry: WorkflowTaskRegistry): boolean {
  return KNK(taskId, agentIndex, "user-skip", taskRegistry);
}

/** Retries a single workflow agent by index (aborts it with reason "user-retry"). */
function retryWorkflowAgent(taskId: string, agentIndex: number, taskRegistry: WorkflowTaskRegistry): boolean {
  return KNK(taskId, agentIndex, "user-retry", taskRegistry);
}

/**
 * Builds and enqueues the terminal workflow notification message back into the
 * parent agent's queue (exactly once per task, guarded by the `notified` flag).
 *
 * The message wraps: the task id and optional tool-use id, output file path,
 * status, a human headline, an optional <recovery> block (resume command +
 * transcript dir) for failed/killed runs, an optional (truncated) <result>
 * block for completed runs, an optional <failures> block, and a <usage> block
 * with agent/token/tool/duration counters.
 */
function enqueueWorkflowNotification({
  taskId,
  summary,
  status,
  result,
  failures,
  error,
  agentCount,
  totalTokens,
  totalToolCalls,
  durationMs,
  taskRegistry,
  toolUseId,
  transcriptDir,
  scriptPath,
  workflowRunId,
  args
}: {
  taskId: string;
  summary?: string;
  status: WorkflowTaskStatus;
  result?: unknown;
  failures?: string[];
  error?: string;
  agentCount: number;
  totalTokens: number;
  totalToolCalls: number;
  durationMs: number;
  taskRegistry: WorkflowTaskRegistry;
  toolUseId?: string;
  transcriptDir?: string;
  scriptPath?: string;
  workflowRunId?: string;
  args?: unknown;
}): void {
  let didNotify = !1;
  if (taskRegistry.update(taskId, task => {
    if (task.notified) return task;
    return didNotify = !0, {
      ...task,
      notified: !0
    };
  }), !didNotify) return;
  taskRegistry.abortSpeculation();
  let workflowName = summary ?? "Dynamic workflow",
    headline = status === "completed" ? `Dynamic workflow "${workflowName}" completed` : status === "failed" ? `Dynamic workflow "${workflowName}" failed: ${error || "Unknown error"}` : `Dynamic workflow "${workflowName}" was stopped`,
    recoveryBlock = "";
  if (status === "failed" || status === "killed") {
    let recoveryLines: string[] = [];
    if (scriptPath && workflowRunId) {
      let argsSuffix = args !== void 0 ? `, args: ${bH(args)}` : "";
      recoveryLines.push(`To resume after editing the script, call: Workflow({scriptPath: '${scriptPath}', resumeFromRunId: '${workflowRunId}'${argsSuffix}})`);
    }
    if (transcriptDir) recoveryLines.push(`Agent transcripts: ${transcriptDir}`);
    if (recoveryLines.length > 0) recoveryBlock = `
<recovery>${recoveryLines.join(`
`)}</recovery>`;
  }
  let outputFile = bY(taskId),
    toolUseIdBlock = toolUseId ? `
<${zN}>${toolUseId}</${zN}>` : "",
    resultBlock = "";
  if (status === "completed" && result !== void 0) {
    let escapedResult = LO(bH(result)),
      maxResultChars = 8000;
    if (escapedResult.length > 8000) resultBlock = `
<result>${escapedResult.slice(0, 8000)}
... (truncated ${escapedResult.length - 8000} chars, full result in ${outputFile})</result>`;else resultBlock = `
<result>${escapedResult}</result>`;
  }
  let failuresBlock = failures?.length ? `
<failures>${LO(failures.join(`
`))}</failures>` : "",
    usageBlock = `
<usage><agent_count>${agentCount}</agent_count><subagent_tokens>${totalTokens}</subagent_tokens><tool_uses>${totalToolCalls}</tool_uses><duration_ms>${durationMs}</duration_ms></usage>`,
    notificationXml = `<${g3}>
<${Uw}>${taskId}</${Uw}>${toolUseIdBlock}
<${$N}>${outputFile}</${$N}>
<${ww}>${status}</${ww}>
<${Cz}>${LO(headline)}</${Cz}>${recoveryBlock}${resultBlock}${failuresBlock}${usageBlock}
</${g3}>`;
  AT({
    value: notificationXml,
    mode: "task-notification",
    agentId: d7(),
    priority: "next",
    taskId: taskId
  });
}

var qNK: typeof import("fs/promises"),
  _NK = 500, // MAX_PROGRESS_ENTRIES — compaction threshold for the progress timeline
  LocalWorkflowTask: {
    name: string;
    type: string;
    kill(taskId: string, taskRegistry: WorkflowTaskRegistry): Promise<void>;
  };

/**
 * Lazy module initializer: runs the dependency init thunks, binds the
 * fs/promises require, and defines the `LocalWorkflowTask` background-task
 * descriptor (whose `kill` delegates to `killWorkflowTask`).
 */
var wGH = L(() => {
  w_();
  UO();
  M6();
  nW();
  OY();
  FH();
  S$();
  sM();
  H6();
  HX();
  IHH();
  ML();
  qNK = require("fs/promises");
  LocalWorkflowTask = {
    name: "LocalWorkflowTask",
    type: "local_workflow",
    async kill(taskId, taskRegistry) {
      killWorkflowTask(taskId, taskRegistry);
    }
  };
});

export {U8q as sdo,registerWorkflowTask,updateWorkflowProgressBatch,aE6 as C9n,completeWorkflowTask,failWorkflowTask,pauseWorkflowTask,buildResumePrompt,killWorkflowTask,KNK as o6a,skipWorkflowAgent,retryWorkflowAgent,enqueueWorkflowNotification,qNK as r6a,_NK as n6a,LocalWorkflowTask,wGH as zIe};
