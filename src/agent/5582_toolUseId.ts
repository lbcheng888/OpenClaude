// @ts-nocheck
import {Ie,vn} from "../session/0621_length.ts";
import {CRON_CREATE_TOOL_NAME as _w,CRON_DELETE_TOOL_NAME as p$,isKairosCronEnabled as ZF,cW} from "../config/2712_isKairosCronEnabled.ts";
import {qP,bc,yp,Qd,Fu,Dv,Ud} from "../../vendor/m615.ts";
import {Ml,Yk} from "../../vendor/m2796.ts";
import {rd,ef} from "../../vendor/m2794.ts";
import {mainAgentId as rs,getSessionCronTasks as _R,addSessionCronTask as Kde,setScheduledTasksEnabled as yX,lt} from "../session/0132_sent.ts";
import {Pt,mn} from "../telemetry/0600_feature_name.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {hf,RE} from "../session/2796_uuid.ts";
import {getCronJitterConfig as cke,iMt} from "../telemetry/2698_getCronJitterConfig.ts";
import {Ukn,iW} from "../../vendor/m2696.ts";
import {b} from "../../runtime.ts";
/**
 * Resume-time reconciliation of background work from a prior Claude Code session.
 *
 * On startup this scans the persisted transcript to discover background agents,
 * background shells, local workflows, and session cron tasks that were in flight
 * when the previous process exited. Tasks with no completion record are reported
 * as orphaned ("failed"/"stopped"), and eligible session cron tasks are
 * resurrected so they continue firing.
 */

/** A single message entry from the persisted transcript. */
interface TranscriptEntry {
  type: string;
  message: { content: unknown };
  timestamp: string;
  toolUseResult?: unknown;
  attachment?: { type: string; prompt?: unknown };
}

/** A recorded tool_use invocation we may want to act on at resume time. */
interface ToolCallRecord {
  toolUseId: string;
  input: Record<string, unknown>;
  createdAt: number;
}

/** A background agent launched asynchronously in the prior session. */
interface AsyncAgentRecord {
  agentId: string;
  description: string;
  outputFile?: string;
}

/** A background shell command launched in the prior session. */
interface BgShellRecord {
  taskId: string;
  toolUseId: string;
}

/** A local workflow launched asynchronously in the prior session. */
interface WorkflowRecord {
  taskId: string;
  toolUseId: string;
  workflowName?: string;
  runId?: string;
}

/** Aggregated state extracted from the transcript by {@link pWm}. */
interface ResumeScanResult {
  calls: ToolCallRecord[];
  results: Map<string, Record<string, unknown>>;
  deletedCronIds: Set<string>;
  asyncAgents: Map<string, AsyncAgentRecord>;
  bgShells: Map<string, BgShellRecord>;
  workflows: Map<string, WorkflowRecord>;
  notifiedTaskIds: Set<string>;
  stoppedTaskIds: Set<string>;
}

/**
 * Entry point: scan the transcript and reconcile every category of background
 * work (cron tasks, orphaned agents, orphaned shells, orphaned workflows).
 * Failures are swallowed so a corrupt transcript cannot block startup.
 *
 * @param transcript The persisted transcript entries from the prior session.
 * @param sessionContext Per-task completion lookup used to skip finished work.
 */
function Dyt(transcript: TranscriptEntry[], sessionContext: { get(taskId: string): unknown }) {
  try {
    let scan = pWm(transcript);
    _Wm(scan), fWm(scan, sessionContext), hWm(scan, sessionContext), gWm(scan, sessionContext);
  } catch (err) {
    Ie(err);
  }
}

/**
 * Walk the transcript once and bucket everything we need: pending tool calls,
 * their results, deleted cron ids, async agents, background shells, workflows,
 * and the sets of already-notified / explicitly-stopped task ids.
 */
function pWm(transcript: TranscriptEntry[]): ResumeScanResult {
  let calls: ToolCallRecord[] = [],
    results = new Map<string, Record<string, unknown>>(),
    deletedCronIds = new Set<string>(),
    asyncAgents = new Map<string, AsyncAgentRecord>(),
    bgShells = new Map<string, BgShellRecord>(),
    workflows = new Map<string, WorkflowRecord>(),
    notifiedTaskIds = new Set<string>(),
    stoppedTaskIds = new Set<string>();
  for (let entry of transcript) if (entry.type === "assistant") {
    let content = entry.message.content;
    if (!Array.isArray(content)) continue;
    let createdAt = Date.parse(entry.timestamp);
    for (let block of content) {
      if (block.type !== "tool_use") continue;
      let input = YUo(block.input) ? block.input : {};
      if (block.name === _w) calls.push({
        toolUseId: block.id,
        input,
        createdAt
      });else if (block.name === p$) {
        if (typeof input.id === "string") deletedCronIds.add(input.id);
      }
    }
  } else if (entry.type === "user") {
    Uac(mWm(entry.message.content), notifiedTaskIds);
    let content = entry.message.content;
    if (!Array.isArray(content)) continue;
    let toolResult = entry.toolUseResult;
    if (!YUo(toolResult)) continue;
    for (let block of content) if (block.type === "tool_result" && !block.is_error) {
      results.set(block.tool_use_id, toolResult);
      let bgTaskId = typeof toolResult.backgroundTaskId === "string" && typeof toolResult.stdout === "string" ? toolResult.backgroundTaskId : typeof toolResult.taskId === "string" && typeof toolResult.timeoutMs === "number" ? toolResult.taskId : void 0;
      if (bgTaskId !== void 0) bgShells.set(bgTaskId, {
        taskId: bgTaskId,
        toolUseId: block.tool_use_id
      });
      if (typeof toolResult.task_id === "string" && typeof toolResult.task_type === "string") stoppedTaskIds.add(toolResult.task_id);
      if (toolResult.status === "async_launched" && toolResult.taskType === "local_workflow" && typeof toolResult.taskId === "string" && typeof toolResult.error !== "string") workflows.set(toolResult.taskId, {
        taskId: toolResult.taskId,
        toolUseId: block.tool_use_id,
        workflowName: typeof toolResult.workflowName === "string" ? toolResult.workflowName : void 0,
        runId: typeof toolResult.runId === "string" ? toolResult.runId : void 0
      });
    }
    if (toolResult.status === "async_launched" && typeof toolResult.agentId === "string" && typeof toolResult.description === "string") asyncAgents.set(toolResult.agentId, {
      agentId: toolResult.agentId,
      description: toolResult.description,
      outputFile: typeof toolResult.outputFile === "string" ? toolResult.outputFile : void 0
    });
  } else if (entry.type === "attachment" && entry.attachment.type === "queued_command" && typeof entry.attachment.prompt === "string") Uac(entry.attachment.prompt, notifiedTaskIds);
  return {
    calls,
    results,
    deletedCronIds,
    asyncAgents,
    bgShells,
    workflows,
    notifiedTaskIds,
    stoppedTaskIds
  };
}

/**
 * Extract task ids from a prior task-notification message and add them to the
 * notified set, so we don't re-report tasks the user was already told about.
 */
function Uac(text: string, notifiedTaskIds: Set<string>) {
  if (!text.includes(uWm) || !text.includes(dWm)) return;
  for (let match of text.matchAll(cWm)) if (match[1]) notifiedTaskIds.add(match[1]);
}

/** Flatten message content (string or content blocks) into plain text. */
function mWm(content: unknown): string {
  if (typeof content === "string") return content;
  return (content as Array<unknown>).map(part => YUo(part) && typeof part.text === "string" ? part.text : "").join(`
`);
}

/**
 * Report background agents that were running when the prior process exited and
 * never completed, emitting a "failed" task-notification for each orphan.
 */
function fWm({
  asyncAgents,
  notifiedTaskIds
}: ResumeScanResult, sessionContext: { get(taskId: string): unknown }) {
  let orphanCount = 0;
  for (let agent of asyncAgents.values()) {
    if (notifiedTaskIds.has(agent.agentId) || sessionContext.get(agent.agentId)) continue;
    orphanCount++;
    let outputFileTag = agent.outputFile ? `
<${qP}>${Ml(agent.outputFile)}</${qP}>` : "";
    rd({
      value: `<${bc}>
<${yp}>${Ml(agent.agentId)}</${yp}>${outputFileTag}
<${Qd}>failed</${Qd}>
<${Fu}>Background agent "${Ml(agent.description)}" was running when the previous Claude Code process exited and did not complete. Its in-process state was lost. Check its worktree/output for partial work before assuming the task landed.</${Fu}>
</${bc}>`,
      agentId: rs(),
      mode: "task-notification",
      priority: "next"
    });
  }
  if (orphanCount > 0) Pt("task_local_agent", "orphaned_on_resume"), A(`resume: ${orphanCount} background agent(s) orphaned by previous process exit`);
}

/**
 * Report background shell commands with no completion record, emitting a
 * "stopped" task-notification and recording the stop for each orphan.
 */
function hWm({
  bgShells,
  notifiedTaskIds,
  stoppedTaskIds
}: ResumeScanResult, sessionContext: { get(taskId: string): unknown }) {
  let orphanCount = 0;
  for (let shell of bgShells.values()) {
    if (notifiedTaskIds.has(shell.taskId) || stoppedTaskIds.has(shell.taskId) || sessionContext.get(shell.taskId)) continue;
    orphanCount++;
    let summary = "No completion record was found for this background shell command from the previous session. It may have been stopped (via the UI, Monitor timeout, or agent teardown \u2014 these leave no transcript marker), or it may have been running when the previous Claude Code process exited. Check the output file for partial results before assuming it completed.";
    rd({
      value: `<${bc}>
<${yp}>${Ml(shell.taskId)}</${yp}>
<${Dv}>${Ml(shell.toolUseId)}</${Dv}>
<${Qd}>stopped</${Qd}>
<${Fu}>${summary}</${Fu}>
</${bc}>`,
      agentId: rs(),
      mode: "task-notification",
      priority: "next"
    }), hf(shell.taskId, "stopped", {
      toolUseId: shell.toolUseId,
      summary
    });
  }
  if (orphanCount > 0) Pt("task_local_shell", "orphaned_on_resume"), A(`resume: ${orphanCount} background shell command(s) orphaned by previous process exit`);
}

/**
 * Report local workflows with no completion record, emitting a "stopped"
 * task-notification (including resume guidance when a runId is known) and
 * recording the stop for each orphan.
 */
function gWm({
  workflows,
  notifiedTaskIds,
  stoppedTaskIds
}: ResumeScanResult, sessionContext: { get(taskId: string): unknown }) {
  let orphanCount = 0;
  for (let workflow of workflows.values()) {
    if (notifiedTaskIds.has(workflow.taskId) || stoppedTaskIds.has(workflow.taskId) || sessionContext.get(workflow.taskId)) continue;
    orphanCount++;
    let workflowNameSuffix = workflow.workflowName ? ` "${workflow.workflowName}"` : "",
      resumeHint = workflow.runId ? ` To pick up where it left off, relaunch with Workflow({scriptPath, resumeFromRunId: "${workflow.runId}"}) \u2014 completed agent() calls return cached.` : "",
      summary = `No completion record was found for background workflow${workflowNameSuffix} from the previous session. It may have been stopped (via the UI or TaskStop \u2014 these leave no transcript marker), or it may have been running when the previous Claude Code process exited.${resumeHint}`;
    rd({
      value: `<${bc}>
<${yp}>${Ml(workflow.taskId)}</${yp}>
<${Dv}>${Ml(workflow.toolUseId)}</${Dv}>
<${Qd}>stopped</${Qd}>
<${Fu}>${Ml(summary)}</${Fu}>
</${bc}>`,
      agentId: rs(),
      mode: "task-notification",
      priority: "next"
    }), hf(workflow.taskId, "stopped", {
      toolUseId: workflow.toolUseId,
      summary
    });
  }
  if (orphanCount > 0) Pt("task_local_workflow", "orphaned_on_resume"), A(`resume: ${orphanCount} background workflow(s) orphaned by previous process exit`);
}

/**
 * Resurrect eligible session cron tasks from the prior session: skip durable,
 * deleted, or already-scheduled ones, drop recurring tasks past their max age
 * and one-shot tasks whose next fire time has already passed, then re-register
 * the rest.
 */
function _Wm({
  calls,
  results,
  deletedCronIds
}: ResumeScanResult) {
  if (!ZF()) return;
  let now = Date.now(),
    cronConfig = cke(),
    scheduledCronIds = new Set(_R().map(task => task.id)),
    resurrectedCount = 0;
  for (let call of calls) {
    let result = results.get(call.toolUseId);
    if (!result || typeof result.id !== "string") continue;
    if (result.durable === !0) continue;
    if (deletedCronIds.has(result.id) || scheduledCronIds.has(result.id)) continue;
    let cron = call.input.cron,
      prompt = call.input.prompt;
    if (typeof cron !== "string" || typeof prompt !== "string") continue;
    let recurring = result.recurring !== !1;
    if (recurring) {
      if (cronConfig.recurringMaxAgeMs !== 0 && now - call.createdAt >= cronConfig.recurringMaxAgeMs) continue;
    } else {
      let nextFireAt = Ukn(cron, call.createdAt, result.id, cronConfig);
      if (nextFireAt === null || nextFireAt < now) continue;
    }
    Kde({
      id: result.id,
      cron,
      prompt,
      createdAt: call.createdAt,
      recurring
    }), resurrectedCount++;
  }
  if (resurrectedCount > 0) yX(!0), A(`resume: resurrected ${resurrectedCount} session cron task(s)`);
}

/** Type guard: true for non-null objects. */
function YUo(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}
var cWm, uWm, dWm;
var JUo = b(() => {
  lt();
  Ud();
  mn();
  cW();
  iMt();
  iW();
  qe();
  vn();
  ef();
  RE();
  Yk();
  cWm = new RegExp(`<${yp}>([^<]+)</${yp}>`, "g"), uWm = `<${bc}>`, dWm = `<${Qd}>`;
});

export {Dyt,pWm,Uac,mWm,fWm,hWm,gWm,_Wm,YUo,cWm,uWm,dWm,JUo};
