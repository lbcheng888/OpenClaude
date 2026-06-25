// @ts-nocheck
import {Dqn} from "../../vendor/m4182.ts";
import {Gho} from "../../vendor/m4183.ts";
import {ft,b} from "../../runtime.ts";
import {mut,p_,gf,wE} from "../../vendor/m5177.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {av,lv,vw} from "../../vendor/m5178.ts";
import {Ice,HB} from "./4331_register.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {hf,RE} from "../session/2796_uuid.ts";
import {Dv,bc,yp,qP,Qd,Fu,Ud} from "../../vendor/m615.ts";
import {Ml,Yk} from "../../vendor/m2796.ts";
import {rd,ef} from "../../vendor/m2794.ts";
import {mainAgentId as rs,lt} from "../session/0132_sent.ts";
/**
 * Workflow task lifecycle management for "local_workflow" tasks.
 *
 * Provides:
 *  - A static AST check (`yKa`) that detects non-deterministic source code
 *    (use of `Date.now()`, `Math.random()`, or `new Date()` with no args).
 *  - Registration, progress tracking, completion/failure/pause/kill, and
 *    per-agent skip/retry control for in-process workflow tasks, plus the
 *    user-facing notification message builder.
 */

/**
 * Statically scan a snippet of source for non-deterministic constructs.
 * Returns `true` if it references `Date.now`, `Math.random`, or `new Date()`
 * (with no arguments); `false` on any parse error.
 *
 * @param sourceCode - JavaScript/TypeScript module source to analyze.
 */
function yKa(sourceCode: string): boolean {
  let {
      parse: parseSource
    } = Dqn(),
    astWalker = Gho(),
    isNonDeterministic = !1;
  try {
    let ast = parseSource(sourceCode, {
      ecmaVersion: "latest",
      sourceType: "module",
      allowAwaitOutsideFunction: !0,
      allowReturnOutsideFunction: !0
    });
    astWalker.simple(ast, {
      MemberExpression(memberNode) {
        if (memberNode.computed || memberNode.object.type !== "Identifier" || memberNode.property.type !== "Identifier") return;
        let objectName = memberNode.object.name,
          propertyName = memberNode.property.name;
        if (objectName === "Date" && propertyName === "now" || objectName === "Math" && propertyName === "random") isNonDeterministic = !0;
      },
      NewExpression(newNode) {
        if (newNode.callee.type === "Identifier" && newNode.callee.name === "Date" && newNode.arguments.length === 0) isNonDeterministic = !0;
      }
    });
  } catch {
    return !1;
  }
  return isNonDeterministic;
}
var Jho = {};
ft(Jho, {
  updateWorkflowProgressBatch: () => updateWorkflowProgressBatch,
  skipWorkflowAgent: () => skipWorkflowAgent,
  retryWorkflowAgent: () => retryWorkflowAgent,
  registerWorkflowTask: () => registerWorkflowTask,
  registerAdoptedWorkflowTask: () => registerAdoptedWorkflowTask,
  pauseWorkflowTask: () => pauseWorkflowTask,
  killWorkflowTask: () => killWorkflowTask,
  isLocalWorkflowTask: () => isLocalWorkflowTask,
  failWorkflowTask: () => failWorkflowTask,
  enqueueWorkflowNotification: () => enqueueWorkflowNotification,
  completeWorkflowTask: () => completeWorkflowTask,
  buildResumePrompt: () => buildResumePrompt,
  LocalWorkflowTask: () => LocalWorkflowTask
});
/**
 * Create and register a new running local-workflow task in the registry.
 *
 * @returns The constructed task record.
 */
function registerWorkflowTask({
  taskId: taskId,
  script: script,
  scriptPath: scriptPath,
  args: args,
  summary: summary,
  workflowName: workflowName,
  title: title,
  phases: phases,
  defaultModel: defaultModel,
  workflowRunId: workflowRunId,
  taskRegistry: taskRegistry,
  toolUseId: toolUseId,
  startTime: startTime
}) {
  mut(taskId);
  let abortController = kl(0),
    taskRecord = {
      ...av(taskId, "local_workflow", summary ?? "Dynamic workflow", toolUseId),
      ...(startTime !== void 0 && {
        startTime: startTime
      }),
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
    };
  return taskRegistry.register(taskRecord), taskRecord;
}
/** Type guard: is the given task a local-workflow task? */
function isLocalWorkflowTask(task): boolean {
  return task?.type === "local_workflow";
}
/**
 * Register an existing (adopted) workflow task in the paused state, e.g. when
 * recovering a previously-launched workflow run.
 */
function registerAdoptedWorkflowTask(adopted, taskRegistry) {
  let base = av(adopted.taskId, "local_workflow", adopted.description, void 0),
    taskRecord = {
      ...base,
      startTime: adopted.startTime ?? base.startTime,
      type: "local_workflow",
      status: "paused",
      script: "",
      scriptPath: adopted.scriptPath,
      prompt: "",
      workflowRunId: adopted.workflowRunId,
      workflowProgress: [],
      progressVersion: 0,
      agentCount: 0,
      totalTokens: 0,
      totalToolCalls: 0,
      logs: [],
      notified: !0
    };
  taskRegistry.register(taskRecord);
}
/**
 * Apply a batch of progress events to a running workflow task: agent/phase
 * events are upserted by `type:index`, log events are appended (and trimmed
 * once they exceed the cap), then token/tool-call totals are recomputed.
 */
function updateWorkflowProgressBatch(taskId, progressEvents, taskRegistry): void {
  if (progressEvents.length === 0) return;
  taskRegistry.update(taskId, task => {
    if (task.status !== "running") return task;
    let mergedProgress = [...task.workflowProgress],
      indexByKey = new Map();
    for (let i = 0; i < mergedProgress.length; i++) {
      let event = mergedProgress[i];
      if (event.type === "workflow_agent" || event.type === "workflow_phase") indexByKey.set(`${event.type}:${event.index}`, i);
    }
    let agentCount = task.agentCount,
      appendedLog = !1;
    for (let event of progressEvents) if (event.type === "workflow_agent" || event.type === "workflow_phase") {
      let key = `${event.type}:${event.index}`,
        existingIndex = indexByKey.get(key);
      if (existingIndex !== void 0) mergedProgress[existingIndex] = event;else indexByKey.set(key, mergedProgress.length), mergedProgress.push(event);
      if (event.type === "workflow_agent" && event.state === "start") agentCount = Math.max(agentCount, event.index);
    } else mergedProgress.push(event), appendedLog = !0;
    if (appendedLog && mergedProgress.length > TKa * 2) {
      let dropCount = mergedProgress.length - TKa,
        trimmed = [];
      for (let i = 0; i < mergedProgress.length; i++) {
        let event = mergedProgress[i];
        if (dropCount > 0 && event.type === "workflow_log") {
          dropCount--;
          continue;
        }
        trimmed.push(event);
      }
      mergedProgress = trimmed;
    }
    let totalTokens = 0,
      totalToolCalls = 0;
    for (let event of mergedProgress) if (event.type === "workflow_agent") {
      if (event.tokens) totalTokens += event.tokens;
      if (event.toolCalls) totalToolCalls += event.toolCalls;
    }
    return {
      ...task,
      workflowProgress: mergedProgress,
      progressVersion: task.progressVersion + progressEvents.length,
      agentCount: agentCount,
      totalTokens: totalTokens,
      totalToolCalls: totalToolCalls
    };
  });
}
/**
 * Transition a running task to a terminal/paused `status`, abort its
 * controller, set end time (and eviction time when terminal), and merge extra
 * fields. Returns the previous (pre-update) task record, or `null` if it was
 * not running.
 */
function Nqn(taskId, taskRegistry, status, extraFields) {
  let previousTask = null;
  return taskRegistry.update(taskId, task => {
    if (task.status !== "running") return task;
    previousTask = task, task.abortController?.abort();
    let endTime = Date.now();
    return {
      ...task,
      ...extraFields,
      status: status,
      endTime: endTime,
      ...(lv(status) && {
        evictAfter: endTime + Ice
      }),
      abortController: void 0,
      agentControllers: void 0
    };
  }), previousTask;
}
/** Mark a workflow task completed, persist its output file, and emit telemetry. */
function completeWorkflowTask(taskId, result, agentCount, logs, taskRegistry): void {
  let previousTask = Nqn(taskId, taskRegistry, "completed", {
    result: result,
    agentCount: agentCount,
    logs: logs
  });
  if (previousTask) SKa.writeFile(previousTask.outputFile, Pe({
    summary: previousTask.summary,
    agentCount: agentCount,
    logs: logs,
    result: result,
    workflowProgress: previousTask.workflowProgress.filter(event => event.type !== "workflow_log"),
    totalTokens: previousTask.totalTokens,
    totalToolCalls: previousTask.totalToolCalls
  }, null, 2)).catch(err => A(`Failed to write workflow output for ${taskId}: ${err instanceof Error ? err.message : err}`)), He("task_local_workflow");
}
/** Mark a workflow task failed and emit failure telemetry. */
function failWorkflowTask(taskId, error, agentCount, logs, taskRegistry): void {
  let previousTask = Nqn(taskId, taskRegistry, "failed", {
    error: error,
    agentCount: agentCount,
    logs: logs
  });
  if (p_(taskId), previousTask) xe("task_local_workflow", "task_local_workflow_failed");
}
/** Pause a running workflow task. Returns `true` if it was running. */
function pauseWorkflowTask(taskId, taskRegistry): boolean {
  return Nqn(taskId, taskRegistry, "paused", {
    notified: !0
  }) !== null;
}
/** Build the user-facing prompt instructing how to resume a paused workflow. */
function buildResumePrompt(task): string {
  let argsClause = task.args !== void 0 ? `, args: ${Pe(task.args)}` : "";
  return `Resume the paused workflow by calling: Workflow({scriptPath: '${task.scriptPath}', resumeFromRunId: '${task.workflowRunId}'${argsClause}}) \u2014 completed agents return cached results.`;
}
/** Kill a running workflow task and emit a "stopped" lifecycle event. Returns `true` if it was running. */
function killWorkflowTask(taskId, taskRegistry): boolean {
  let previousTask = Nqn(taskId, taskRegistry, "killed", {
    notified: !0
  });
  if (previousTask) p_(taskId), hf(taskId, "stopped", {
    toolUseId: previousTask.toolUseId,
    summary: previousTask.description
  });
  return previousTask !== null;
}
/**
 * Abort a single running agent within a workflow (skip/retry).
 * Returns `true` if an active, un-aborted controller was found and aborted.
 */
function bKa(taskId, agentId, reason, taskRegistry): boolean {
  let aborted = !1;
  if (taskRegistry.update(taskId, task => {
    if (task.status !== "running") return task;
    let agentController = task.agentControllers?.get(agentId);
    if (agentController && !agentController.signal.aborted) agentController.abort(reason), aborted = !0;
    return task;
  }), aborted) He(reason === "user-skip" ? "task_local_workflow_skip_agent" : "task_local_workflow_retry_agent");
  return aborted;
}
/** Skip a specific agent in a running workflow. */
function skipWorkflowAgent(taskId, agentId, taskRegistry): boolean {
  return bKa(taskId, agentId, "user-skip", taskRegistry);
}
/** Retry a specific agent in a running workflow. */
function retryWorkflowAgent(taskId, agentId, taskRegistry): boolean {
  return bKa(taskId, agentId, "user-retry", taskRegistry);
}
/**
 * Build and enqueue the terminal notification message for a workflow task
 * (completed / failed / killed), once. Includes recovery instructions on
 * failure/kill, a truncated result block on completion, failures, and usage
 * stats; then dispatches it to the conversation queue.
 */
function enqueueWorkflowNotification({
  taskId: taskId,
  summary: summary,
  status: status,
  result: result,
  failures: failures,
  error: error,
  agentCount: agentCount,
  totalTokens: totalTokens,
  totalToolCalls: totalToolCalls,
  durationMs: durationMs,
  taskRegistry: taskRegistry,
  toolUseId: toolUseId,
  transcriptDir: transcriptDir,
  scriptPath: scriptPath,
  workflowRunId: workflowRunId,
  args: args
}): void {
  let shouldNotify = !1;
  if (taskRegistry.update(taskId, task => {
    if (task.notified) return task;
    return shouldNotify = !0, {
      ...task,
      notified: !0
    };
  }), !shouldNotify) return;
  taskRegistry.abortSpeculation();
  let workflowLabel = summary ?? "Dynamic workflow",
    headline = status === "completed" ? `Dynamic workflow "${workflowLabel}" completed` : status === "failed" ? `Dynamic workflow "${workflowLabel}" failed: ${error || "Unknown error"}` : `Dynamic workflow "${workflowLabel}" was stopped`,
    recoveryBlock = "";
  if (status === "failed" || status === "killed") {
    let recoveryLines = [];
    if (scriptPath && workflowRunId) {
      let argsClause = args !== void 0 ? `, args: ${Pe(args)}` : "";
      recoveryLines.push(`To resume after editing the script, call: Workflow({scriptPath: '${scriptPath}', resumeFromRunId: '${workflowRunId}'${argsClause}})`);
    }
    if (transcriptDir) recoveryLines.push(`Agent transcripts: ${transcriptDir}`);
    if (recoveryLines.length > 0) recoveryBlock = `
<recovery>${recoveryLines.join(`
`)}</recovery>`;
  }
  let outputFile = gf(taskId),
    toolUseBlock = toolUseId ? `
<${Dv}>${toolUseId}</${Dv}>` : "",
    resultBlock = "";
  if (status === "completed" && result !== void 0) {
    let resultText = Ml(Pe(result)),
      maxResultChars = 8000;
    if (resultText.length > 8000) resultBlock = `
<result>${resultText.slice(0, 8000)}
... (truncated ${resultText.length - 8000} chars, full result in ${outputFile})</result>`;else resultBlock = `
<result>${resultText}</result>`;
  }
  let failuresBlock = failures?.length ? `
<failures>${Ml(failures.join(`
`))}</failures>` : "",
    usageBlock = `
<usage><agent_count>${agentCount}</agent_count><subagent_tokens>${totalTokens}</subagent_tokens><tool_uses>${totalToolCalls}</tool_uses><duration_ms>${durationMs}</duration_ms></usage>`,
    notificationXml = `<${bc}>
<${yp}>${taskId}</${yp}>${toolUseBlock}
<${qP}>${outputFile}</${qP}>
<${Qd}>${status}</${Qd}>
<${Fu}>${Ml(headline)}</${Fu}>${recoveryBlock}${resultBlock}${failuresBlock}${usageBlock}
</${bc}>`;
  rd({
    value: notificationXml,
    mode: "task-notification",
    agentId: rs(),
    priority: "next",
    taskId: taskId
  });
}
var SKa,
  TKa = 500,
  LocalWorkflowTask;
var Hce = b(() => {
  lt();
  Ud();
  mn();
  vw();
  lh();
  qe();
  ef();
  RE();
  tn();
  wE();
  HB();
  Yk();
  SKa = require("fs/promises");
  LocalWorkflowTask = {
    name: "LocalWorkflowTask",
    type: "local_workflow",
    async kill(taskId, taskRegistry) {
      killWorkflowTask(taskId, taskRegistry);
    }
  };
});

export {yKa,Jho,registerWorkflowTask,isLocalWorkflowTask,registerAdoptedWorkflowTask,updateWorkflowProgressBatch,Nqn,completeWorkflowTask,failWorkflowTask,pauseWorkflowTask,buildResumePrompt,killWorkflowTask,bKa,skipWorkflowAgent,retryWorkflowAgent,enqueueWorkflowNotification,SKa,TKa,LocalWorkflowTask,Hce};
