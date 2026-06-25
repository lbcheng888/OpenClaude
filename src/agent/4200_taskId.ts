// @ts-nocheck
import {He,mn} from "../telemetry/0600_feature_name.ts";
import {registerWorkflowTask as Vho,updateWorkflowProgressBatch as zho,failWorkflowTask as Fqn,completeWorkflowTask as jho,enqueueWorkflowNotification as Bqn,Hce} from "./4186_parse.ts";
import {getTotalOutputTokens as Yy,getTurnOutputTokens as oSt,getCurrentTurnTokenBudget as sSt,getIsNonInteractiveSession as kr,lt} from "../session/0132_sent.ts";
import {ldt,H9n} from "./3987_type.ts";
import {XKa,QKa} from "../../vendor/m4198.ts";
import {Qho,Zho} from "../../vendor/m4190.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {wKa,Fte,g5e} from "./4190_runId.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {LUe,oz} from "../../vendor/m2254.ts";
import {Ta,Ct} from "../../vendor/m197.ts";
import {Bw,Nte} from "../../vendor/m4186.ts";
import {Ppt,m5e} from "../../vendor/m4184.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {b} from "../../runtime.ts";
/**
 * Local workflow task runner.
 *
 * `igo` (runWorkflowTask) launches a parsed workflow VM script for a single
 * local-workflow task: it sets up progress batching, drives the workflow agent
 * loop, emits telemetry on completion (per-workflow and per-phase), persists the
 * adopted-workflow record, and finalizes the task registry entry. It returns the
 * workflow controller synchronously while the async body runs in the background.
 *
 * `ZKa` (resumeAdoptedWorkflow) reads/parses/compiles a workflow script from disk
 * and resumes it (isResume) unless an equivalent run is already in progress.
 *
 * `ago` is the lazy module-init thunk wiring up cross-module dependencies.
 */

/** A single phase completion accumulator keyed by phase index. */
interface WorkflowPhaseStats {
  title: string;
  tokens: number;
  toolCalls: number;
  durationMs: number;
  agentCount: number;
  errorCount: number;
  skipCount: number;
}

function igo(params) {
  let {
      taskId,
      workflowRunId,
      script,
      scriptPath,
      args,
      meta,
      vmScript,
      toolUseContext,
      canUseTool,
      toolUseId,
      transcriptDir,
      telemetry,
      isResume
    } = params,
    summary = meta.description,
    workflowName = meta.name;
  if (isResume) {
    He("task_local_workflow_resume");
    for (let [registryTaskId, registryEntry] of Object.entries(toolUseContext.taskRegistry.all())) if (registryEntry.type === "local_workflow" && registryEntry.workflowRunId === workflowRunId && registryEntry.status !== "running") toolUseContext.taskRegistry.remove(registryTaskId);
  }
  let controller = Vho({
      taskId,
      script,
      scriptPath,
      summary,
      workflowName,
      title: meta.title,
      phases: meta.phases,
      defaultModel: toolUseContext.options.mainLoopModel,
      workflowRunId,
      args,
      taskRegistry: toolUseContext.taskRegistry,
      toolUseId,
      startTime: params.startTime
    }),
    runContext = {
      ...toolUseContext,
      abortController: controller.abortController ?? toolUseContext.abortController
    },
    turnStartTime = Yy() - oSt(),
    tokenBudget = {
      total: sSt(),
      getTurnSpent: () => Yy() - turnStartTime
    };
  return (async () => {
    let pendingProgress = [],
      flushDelayMs = 16,
      flushTimer,
      flushProgress = () => {
        if (flushTimer = void 0, pendingProgress.length === 0) return;
        let batch = pendingProgress;
        if (pendingProgress = [], zho(taskId, batch, toolUseContext.taskRegistry), !kr()) return;
        let nonLogEntries = batch.filter(entry => entry.type !== "workflow_log");
        if (nonLogEntries.length === 0) return;
        let task = runContext.getAppState()?.tasks?.[taskId];
        if (task?.type !== "local_workflow" || task.status !== "running") return;
        let lastAgentEntry = nonLogEntries.findLast(entry => entry.type === "workflow_agent");
        ldt({
          taskId,
          toolUseId,
          description: lastAgentEntry ? lastAgentEntry.phaseTitle ? `${lastAgentEntry.phaseTitle}: ${lastAgentEntry.label}` : lastAgentEntry.label : controller.description,
          startTime: controller.startTime,
          totalTokens: task.totalTokens,
          toolUses: task.totalToolCalls,
          lastToolName: lastAgentEntry?.label,
          summary,
          workflowProgress: nonLogEntries
        });
      },
      runResult = await XKa(vmScript, runContext, canUseTool, {
        workflowRunId,
        onProgress: event => {
          if (event.type !== "progress") return;
          if (pendingProgress.push(event.data), !flushTimer) flushTimer = setTimeout(flushProgress, flushDelayMs);
        },
        onAgentController: (agentId, agentController) => {
          if (agentController) controller.agentControllers?.set(agentId, agentController);else controller.agentControllers?.delete(agentId);
        },
        args,
        seedPhaseTitles: meta.phases?.map(phase => phase.title),
        tokenBudget,
        journal: new Qho(workflowRunId)
      });
    if (controller.abortController?.signal.reason === "background") {
      if (flushTimer) clearTimeout(flushTimer);
      return;
    }
    if (flushTimer) clearTimeout(flushTimer);
    flushProgress();
    let finalTask = runContext.getAppState()?.tasks?.[taskId],
      finalProgress = (finalTask?.workflowProgress ?? []).filter(entry => entry.type !== "workflow_log"),
      totalTokens = finalTask?.totalTokens ?? 0,
      totalToolCalls = finalTask?.totalToolCalls ?? 0,
      status = controller.abortController?.signal.aborted ? "killed" : runResult.error ? "failed" : "completed";
    if (W("tengu_workflow_completed", {
      workflow_run_id: workflowRunId,
      workflow_source: Le(telemetry.source),
      workflow_name: telemetry.name,
      workflow_description: telemetry.description,
      status: Le(status),
      agent_count: runResult.agentCount,
      total_tokens: totalTokens,
      total_tool_calls: totalToolCalls,
      duration_ms: runResult.durationMs
    }), telemetry.source === "built-in") {
      let phaseStatsByIndex = new Map<number, WorkflowPhaseStats>();
      for (let entry of finalTask?.workflowProgress ?? []) {
        if (entry.type !== "workflow_agent") continue;
        if (entry.phaseIndex === void 0 || !entry.phaseTitle) continue;
        let phaseStats = phaseStatsByIndex.get(entry.phaseIndex);
        if (!phaseStats) phaseStats = {
          title: entry.phaseTitle,
          tokens: 0,
          toolCalls: 0,
          durationMs: 0,
          agentCount: 0,
          errorCount: 0,
          skipCount: 0
        }, phaseStatsByIndex.set(entry.phaseIndex, phaseStats);
        if (phaseStats.tokens += entry.tokens ?? 0, phaseStats.toolCalls += entry.toolCalls ?? 0, phaseStats.durationMs += entry.durationMs ?? 0, phaseStats.agentCount += 1, entry.state === "error") if (entry.error === "skipped by user") phaseStats.skipCount += 1;else phaseStats.errorCount += 1;
      }
      for (let [phaseIndex, phaseStats] of phaseStatsByIndex) W("tengu_workflow_phase_completed", {
        workflow_run_id: workflowRunId,
        workflow_source: Le(telemetry.source),
        workflow_name: telemetry.name,
        phase_index: phaseIndex,
        phase_title: phaseStats.title,
        phase_tokens: phaseStats.tokens,
        phase_tool_calls: phaseStats.toolCalls,
        phase_agent_duration_ms: phaseStats.durationMs,
        phase_agent_count: phaseStats.agentCount,
        phase_error_count: phaseStats.errorCount,
        phase_skip_count: phaseStats.skipCount
      });
    }
    if (wKa(workflowRunId, {
      taskId,
      script,
      scriptPath,
      args,
      result: runResult.result,
      agentCount: runResult.agentCount,
      logs: runResult.logs,
      durationMs: runResult.durationMs,
      error: runResult.error,
      summary,
      workflowName,
      title: meta.title,
      status,
      startTime: controller.startTime,
      phases: controller.phases,
      defaultModel: controller.defaultModel,
      workflowProgress: finalProgress,
      totalTokens,
      totalToolCalls
    }), controller.abortController?.signal.aborted) return;
    if (runResult.error) Fqn(taskId, runResult.error, runResult.agentCount, runResult.logs, toolUseContext.taskRegistry);else jho(taskId, runResult.result, runResult.agentCount, runResult.logs, toolUseContext.taskRegistry);
    Bqn({
      taskId,
      summary,
      status: runResult.error ? "failed" : "completed",
      error: runResult.error,
      result: runResult.result,
      failures: runResult.failures,
      agentCount: runResult.agentCount,
      totalTokens,
      totalToolCalls,
      durationMs: runResult.durationMs,
      taskRegistry: toolUseContext.taskRegistry,
      toolUseId,
      transcriptDir
    });
  })().catch(err => {
    Ie(err);
    let errorMessage = err instanceof Error ? err.message : String(err),
      task = runContext.getAppState()?.tasks?.[taskId],
      agentCount = task?.agentCount ?? 0;
    Fqn(taskId, errorMessage, agentCount, task?.logs ?? [], toolUseContext.taskRegistry), Bqn({
      taskId,
      summary,
      status: "failed",
      error: errorMessage,
      agentCount,
      totalTokens: task?.totalTokens ?? 0,
      totalToolCalls: task?.totalToolCalls ?? 0,
      durationMs: Date.now() - controller.startTime,
      taskRegistry: toolUseContext.taskRegistry,
      toolUseId,
      transcriptDir
    });
  }), controller;
}
async function ZKa(params) {
  let {
      taskId,
      workflowRunId,
      scriptPath,
      argsJson,
      startTime
    } = params,
    readResult = await LUe(scriptPath);
  if ("error" in readResult) throw new Ta(readResult.error, "adopted workflow script read failed");
  let script = readResult.script,
    parseResult = Bw(script);
  if ("error" in parseResult) throw new Ta(`Invalid workflow script: ${parseResult.error}`, "adopted workflow script parse failed");
  let compileResult = Ppt(parseResult.scriptBody);
  if (!compileResult.ok) throw new Ta(`Workflow script compile failed: ${compileResult.error}`, "adopted workflow script compile failed");
  let parsedArgs = argsJson !== void 0 ? qt(argsJson) : void 0;
  for (let registryEntry of Object.values(params.toolUseContext.taskRegistry.all())) if (registryEntry.type === "local_workflow" && registryEntry.workflowRunId === workflowRunId && registryEntry.status === "running") {
    params.toolUseContext.taskRegistry.remove(taskId);
    return;
  }
  igo({
    taskId,
    workflowRunId,
    script,
    scriptPath,
    args: parsedArgs,
    meta: parseResult.meta,
    vmScript: compileResult.vmScript,
    toolUseContext: params.toolUseContext,
    canUseTool: params.canUseTool,
    toolUseId: void 0,
    transcriptDir: Fte(workflowRunId),
    telemetry: {
      source: "adopt",
      name: "custom",
      description: ""
    },
    isResume: !0,
    startTime
  });
}
var ago = b(() => {
  lt();
  mn();
  kt();
  Hce();
  Ct();
  vn();
  tn();
  H9n();
  m5e();
  QKa();
  Zho();
  Nte();
  g5e();
  oz();
});

export {igo,ZKa,ago};
