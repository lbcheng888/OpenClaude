// @ts-nocheck
import {r8e,C0e} from "../hooks/4360_isCollapsible.ts";
import {Rp,MO} from "../tools/2710_allErrors.ts";
import {Mf,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {rl,ri} from "../tools/2235_userFacingName.ts";
import {p_,gf,Yye,wE} from "../../vendor/m5177.ts";
import {Ice,fel,HB} from "./4331_register.ts";
import {lv,av,vw} from "../../vendor/m5178.ts";
import {mee,rd,Qke,ef} from "../../vendor/m2794.ts";
import {cd,xS} from "../../vendor/m122.ts";
import {getIsNonInteractiveSession as kr,mainAgentId as rs,getSdkAgentProgressSummariesEnabled as Nbe,lt} from "../session/0132_sent.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Dv,gyr,_yr,yyr,bc,yp,qP,Qd,Fu,Ud} from "../../vendor/m615.ts";
import {Ml,Yk} from "../../vendor/m2796.ts";
import {ldt,H9n} from "./3987_type.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {h8n,FTo} from "../../vendor/m4360.ts";
import {jk,D_} from "./2784_withFileTypes.ts";
import {h1,kl,lh} from "../../vendor/m2739.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/** Create a fresh tool-usage / token accounting accumulator for an agent. */
function D9n() {
  return {
    toolUseCount: 0,
    latestInputTokens: 0,
    cumulativeOutputTokens: 0,
    recentActivities: []
  };
}
/** Total token count = latest input tokens + cumulative output tokens. */
function Ydo(acc) {
  return acc.latestInputTokens + acc.cumulativeOutputTokens;
}
/**
 * Fold a single stream event into the accumulator: REPL tool-call progress
 * events append a recent-activity entry; assistant messages update token
 * counts and append one activity per tool_use block.
 */
function P9n(acc, event, describeActivity, activityCtx) {
  if (event.type === "progress" && event.data.type === "repl_tool_call" && event.data.phase === "start") {
    let {
        toolName: toolName,
        toolInput: toolInput
      } = event.data,
      classified = activityCtx ? r8e(toolName, toolInput, activityCtx) : void 0;
    if (acc.recentActivities.push({
      toolName: toolName,
      input: toolInput,
      activityDescription: describeActivity?.(toolName, toolInput),
      isSearch: classified?.isSearch,
      isRead: classified?.isRead
    }), acc.recentActivities.length > Anl) acc.recentActivities.shift();
    return;
  }
  if (event.type !== "assistant") return;
  let usage = event.message.usage;
  acc.latestInputTokens = usage.input_tokens + (usage.cache_creation_input_tokens ?? 0) + (usage.cache_read_input_tokens ?? 0), acc.cumulativeOutputTokens += usage.output_tokens;
  for (let block of event.message.content) {
    if (block.type !== "tool_use") continue;
    if (acc.toolUseCount++, block.name === Rp) continue;
    if (block.name === Mf) continue;
    let toolInput = block.input,
      classified = activityCtx ? r8e(block.name, toolInput, activityCtx) : void 0;
    acc.recentActivities.push({
      toolName: block.name,
      input: toolInput,
      activityDescription: describeActivity?.(block.name, toolInput),
      isSearch: classified?.isSearch,
      isRead: classified?.isRead
    });
  }
  while (acc.recentActivities.length > Anl) acc.recentActivities.shift();
}
/** Snapshot the accumulator into an immutable progress summary object. */
function I3t(acc) {
  return {
    toolUseCount: acc.toolUseCount,
    tokenCount: Ydo(acc),
    lastActivity: acc.recentActivities.at(-1),
    recentActivities: [...acc.recentActivities]
  };
}
/** Build an activity-describer bound to the given tool-use context. */
function O9n(toolUseContext) {
  return (toolName, toolInput) => rl(toolUseContext, toolName)?.getActivityDescription?.(toolInput) ?? void 0;
}
/** Read the keepalive-reason set of an agent entry, defaulting to empty. */
function zte(entry) {
  return entry.keepaliveReasons ?? new Set();
}
/** True when a completed agent is still held alive by at least one keepalive reason. */
function L6p(agentId, taskRegistry) {
  UTo.delete(agentId), C5e(agentId, BTo, taskRegistry);
  let entry = taskRegistry.get(agentId);
  if (rc(entry) && entry.status === "completed" && zte(entry).size === 0) p_(agentId), _8n(agentId, taskRegistry);
}
/** Completed agent that still has at least one keepalive reason. */
function fx(entry) {
  return entry.status === "completed" && zte(entry).size > 0;
}
/** Compute the eviction deadline for an entry, or undefined if it should be retained. */
function $To(entry, opts) {
  if (entry.retain) return;
  if (opts.park && (entry.keepaliveReasons?.size ?? 0) > 0) return;
  return Date.now() + Ice;
}
/** Type guard: value is a local-agent registry entry. */
function rc(value) {
  return typeof value === "object" && value !== null && "type" in value && value.type === "local_agent";
}
/** Return agentId only if it resolves to a non-main local agent, else undefined. */
function zza(agentId, taskRegistry) {
  if (!agentId) return;
  let entry = taskRegistry.get(agentId);
  return rc(entry) && entry.agentType !== "main-session" ? agentId : void 0;
}
/** Entry is a non-main local agent. */
function bG(entry) {
  return rc(entry) && entry.agentType !== "main-session";
}
/** Add a keepalive reason to an agent entry (idempotent). */
function E5e(agentId, reason, taskRegistry) {
  if (!agentId) return;
  taskRegistry.update(agentId, entry => {
    if (!rc(entry) || zte(entry).has(reason)) return entry;
    return {
      ...entry,
      keepaliveReasons: new Set(zte(entry)).add(reason)
    };
  });
}
/** Remove a keepalive reason; if none remain and the agent is terminal, schedule eviction. */
function C5e(agentId, reason, taskRegistry) {
  if (!agentId) return;
  taskRegistry.update(agentId, entry => {
    if (!rc(entry) || !zte(entry).has(reason)) return entry;
    let remaining = new Set(zte(entry));
    remaining.delete(reason);
    let shouldEvict = remaining.size === 0 && lv(entry.status) && !entry.retain;
    return {
      ...entry,
      keepaliveReasons: remaining,
      ...(shouldEvict && entry.evictAfter === void 0 && {
        evictAfter: Date.now() + Ice
      })
    };
  });
}
/** True if the agent currently has any keepalive reasons. */
function C5a(agentId, taskRegistry) {
  if (!agentId) return !1;
  let entry = taskRegistry.get(agentId);
  return rc(entry) && zte(entry).size > 0;
}
/** True if the agent is kept alive specifically by an "agent:" (child) reason. */
function udt(agentId, taskRegistry) {
  if (!agentId) return !1;
  let entry = taskRegistry.get(agentId);
  if (!rc(entry)) return !1;
  for (let reason of zte(entry)) if (reason.startsWith("agent:")) return !0;
  return !1;
}
/** Drop stale child ("agent:") keepalive reasons whose child task is gone or already notified. */
function L9n(agentId, taskRegistry) {
  let entry = taskRegistry.get(agentId);
  if (!rc(entry)) return;
  let pendingTaskIds = new Set();
  for (let item of mee()) if (item.mode === "task-notification" && item.agentId === cd(agentId) && item.taskId) pendingTaskIds.add(item.taskId);
  for (let reason of zte(entry)) {
    if (!reason.startsWith("agent:")) continue;
    let childTaskId = reason.slice(6);
    if (pendingTaskIds.has(childTaskId)) continue;
    let childEntry = taskRegistry.get(childTaskId);
    if (!childEntry || rc(childEntry) && childEntry.notified) C5e(agentId, reason, taskRegistry);
  }
}
/** Append a pending message to an agent's queue. */
function U5e(agentId, text, taskRegistry, opts = {}) {
  let message = {
    text: text,
    origin: opts.origin,
    isMeta: opts.isMeta ?? !1
  };
  taskRegistry.update(agentId, entry => ({
    ...entry,
    pendingMessages: [...entry.pendingMessages, message]
  }));
}
/** Append a transcript message for the given agent. */
function w5n(agentId, message, taskRegistry) {
  taskRegistry.updateTranscript(agentId, transcript => ({
    ...transcript,
    messages: [...transcript.messages, message]
  }));
}
/** Drain and return an agent's pending messages, clearing the queue. */
function g8n(agentId, taskRegistry) {
  let entry = taskRegistry.get(agentId);
  if (!rc(entry) || entry.pendingMessages.length === 0) return [];
  let pending = entry.pendingMessages;
  return taskRegistry.update(agentId, e => ({
    ...e,
    pendingMessages: []
  })), pending;
}
/** Build and enqueue a task-notification message describing an agent's terminal outcome. */
function b6e({
  taskId: taskId,
  description: description,
  status: status,
  killedBy: killedBy,
  error: errorMessage,
  taskRegistry: taskRegistry,
  finalMessage: finalMessage,
  usage: usage,
  toolUseId: toolUseId,
  worktreePath: worktreePath,
  worktreeBranch: worktreeBranch,
  ownerAgentId: ownerAgentId
}) {
  let didNotify = !1,
    taskPresent = !1,
    resolvedOwner;
  taskRegistry.update(taskId, entry => {
    if (taskPresent = !0, resolvedOwner = entry.ownerAgentId, entry.notified) return entry;
    return didNotify = !0, {
      ...entry,
      notified: !0
    };
  }), resolvedOwner ??= ownerAgentId;
  let ownerEntry = resolvedOwner ? taskRegistry.get(resolvedOwner) : void 0,
    ownerActive = rc(ownerEntry) && fx(ownerEntry) && !kr() || rc(ownerEntry) && ownerEntry.status === "running";
  if (!(didNotify && ownerActive)) C5e(resolvedOwner, `agent:${taskId}`, taskRegistry);
  if (!didNotify) {
    A(`[enqueueAgentNotification] skipped taskId=${taskId} status=${status} taskPresent=${taskPresent} reason=${taskPresent ? "already-notified" : "task-not-in-registry"}`, {
      level: taskPresent ? "debug" : "warn"
    });
    return;
  }
  taskRegistry.abortSpeculation();
  let summaryText = status === "completed" ? `Agent "${description}" finished` : status === "failed" ? `Agent "${description}" failed: ${errorMessage || "Unknown error"}` : killedBy === "parent" ? `Agent "${description}" was stopped by Claude` : killedBy === "user" ? `Agent "${description}" was stopped by user` : `Agent "${description}" was stopped`,
    displayName = gf(taskId),
    toolUseTag = toolUseId ? `
<${Dv}>${toolUseId}</${Dv}>` : "",
    resultTag = finalMessage ? `
<result>${Ml(finalMessage)}</result>` : "",
    usageTag = usage ? `
<usage><subagent_tokens>${usage.totalTokens}</subagent_tokens><tool_uses>${usage.toolUses}</tool_uses><duration_ms>${usage.durationMs}</duration_ms></usage>` : "",
    worktreeTag = worktreePath ? `
<${gyr}><${_yr}>${worktreePath}</${_yr}>${worktreeBranch ? `<${yyr}>${worktreeBranch}</${yyr}>` : ""}</${gyr}>` : "",
    notificationXml = `<${bc}>
<${yp}>${taskId}</${yp}>${toolUseTag}
<${qP}>${displayName}</${qP}>
<${Qd}>${status}</${Qd}>
<${Fu}>${Ml(summaryText)}</${Fu}>
<note>A task-notification fires each time this agent stops with no live background children of its own. The user can send it another message and resume it, so the same task-id may notify more than once.</note>${resultTag}${usageTag}${worktreeTag}
</${bc}>`;
  rd({
    value: notificationXml,
    mode: "task-notification",
    priority: "next",
    agentId: ownerActive && resolvedOwner ? cd(resolvedOwner) : rs(),
    taskId: taskId
  });
}
/** Re-target any orphaned task-notifications of an agent back to the main session. */
function _8n(agentId, taskRegistry) {
  let entry = taskRegistry.get(agentId);
  if (rc(entry) && fx(entry) && !kr()) return;
  let orphaned = Qke(item => {
    if (item.mode !== "task-notification" || item.agentId !== cd(agentId)) return !1;
    let owned = item.taskId ? taskRegistry.get(item.taskId) : void 0;
    return rc(owned) && owned.ownerAgentId === agentId;
  });
  for (let item of orphaned) rd({
    ...item,
    agentId: rs()
  });
}
/** Kill an agent: notify if it was a completed-but-unnotified task, then mark it killed. */
function _ye(agentId, taskRegistry, killedBy = "user") {
  let entry = taskRegistry.get(agentId);
  if (rc(entry) && fx(entry) && !entry.notified) {
    let result = entry.result;
    b6e({
      taskId: agentId,
      description: entry.description,
      status: "killed",
      killedBy: killedBy,
      taskRegistry: taskRegistry,
      finalMessage: result ? result.content.map(block => block.text).join(`
`) : void 0,
      usage: result ? {
        totalTokens: result.totalTokens,
        toolUses: result.totalToolUseCount,
        durationMs: result.totalDurationMs
      } : void 0,
      toolUseId: entry.toolUseId,
      ownerAgentId: entry.ownerAgentId
    });
  }
  let didKill = !1;
  if (taskRegistry.update(agentId, entry => {
    if (entry.status !== "running" && !fx(entry)) return entry;
    return didKill = !0, entry.abortController?.abort(), {
      ...entry,
      status: "killed",
      killedBy: killedBy,
      notified: entry.notified || fx(entry),
      endTime: Date.now(),
      keepaliveReasons: new Set(),
      evictAfter: $To(entry, {
        park: !1
      }),
      abortController: void 0,
      selectedAgent: void 0
    };
  }), didKill) _8n(agentId, taskRegistry), p_(agentId);
}
/** Kill all keepalive-held completed agents then all running local agents in a registry snapshot. */
function Rnl(snapshot, taskRegistry, killedBy = "user") {
  for (let [id, entry] of Object.entries(snapshot)) if (rc(entry) && fx(entry)) _ye(id, taskRegistry, killedBy);
  for (let [id, entry] of Object.entries(snapshot)) if (entry.type === "local_agent" && entry.status === "running") _ye(id, taskRegistry, killedBy);
}
/** Mark an agent as already-notified. */
function ddt(agentId, taskRegistry) {
  taskRegistry.update(agentId, entry => {
    if (entry.notified) return entry;
    return {
      ...entry,
      notified: !0
    };
  });
}
/** Apply a progress update to a running agent and mirror token counts into its transcript. */
function f9a(agentId, progress, taskRegistry) {
  let changed = !1;
  if (taskRegistry.update(agentId, entry => {
    if (entry.status !== "running") return entry;
    let prev = entry.progress;
    if (prev && prev.toolUseCount === progress.toolUseCount && prev.tokenCount === progress.tokenCount && prev.lastActivity === progress.lastActivity && (prev.summary ?? progress.summary) === prev.summary && M6p(prev.recentActivities, progress.recentActivities)) return entry;
    let keptSummary = prev?.summary;
    return changed = !0, {
      ...entry,
      progress: keptSummary ? {
        ...progress,
        summary: keptSummary
      } : progress
    };
  }), !changed) return;
  taskRegistry.updateTranscript(agentId, transcript => {
    let prev = transcript.progress;
    if (prev?.tokenCount === progress.tokenCount && prev.toolUseCount === progress.toolUseCount) return transcript;
    return {
      ...transcript,
      progress: {
        tokenCount: progress.tokenCount,
        toolUseCount: progress.toolUseCount
      }
    };
  });
}
/** Shallow element-wise equality of two recent-activity arrays. */
function M6p(a, b) {
  if (a === b) return !0;
  if (!a || !b || a.length !== b.length) return !1;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return !1;
  return !0;
}
/** Set an agent's progress summary and, if enabled, emit an SDK progress-summary event. */
function k$a(agentId, summary, taskRegistry) {
  let captured = null;
  if (taskRegistry.update(agentId, entry => {
    if (entry.status !== "running") return entry;
    return captured = {
      tokenCount: entry.progress?.tokenCount ?? 0,
      toolUseCount: entry.progress?.toolUseCount ?? 0,
      startTime: entry.startTime,
      toolUseId: entry.toolUseId,
      agentType: entry.agentType
    }, {
      ...entry,
      progress: {
        ...entry.progress,
        toolUseCount: entry.progress?.toolUseCount ?? 0,
        tokenCount: entry.progress?.tokenCount ?? 0,
        summary: summary
      }
    };
  }), captured && Nbe()) {
    let {
      tokenCount: tokenCount,
      toolUseCount: toolUseCount,
      startTime: startTime,
      toolUseId: toolUseId,
      agentType: agentType
    } = captured;
    ldt({
      taskId: agentId,
      toolUseId: toolUseId,
      description: summary,
      subagentType: agentType,
      startTime: startTime,
      totalTokens: tokenCount,
      toolUses: toolUseCount,
      summary: summary
    });
  }
}
/** Mark a running agent completed with its result and decide post-completion lifecycle. */
function h9a(result, taskRegistry) {
  let agentId = result.agentId,
    wasRunning = !1,
    keepAlive = !1,
    hasPending = !1,
    idleWindow = !1,
    hadOtherReason = !1;
  if (taskRegistry.update(agentId, entry => {
    if (entry.status !== "running") return entry;
    wasRunning = !0;
    for (let reason of zte(entry)) if (reason !== BTo) {
      hadOtherReason = !0;
      break;
    }
    let reasons = idleWindow ? new Set(zte(entry)).add(BTo) : entry.keepaliveReasons,
      completed = {
        ...entry,
        status: "completed",
        result: result,
        endTime: Date.now(),
        keepaliveReasons: reasons,
        evictAfter: $To({
          retain: entry.retain,
          keepaliveReasons: reasons
        }, {
          park: !0
        }),
        abortController: void 0,
        selectedAgent: void 0
      };
    return keepAlive = fx(completed) && !kr(), hasPending = (completed.pendingMessages?.length ?? 0) > 0, completed;
  }), wasRunning && !keepAlive) p_(agentId), He("task_local_agent"), _8n(agentId, taskRegistry);else if (wasRunning && idleWindow && !hadOtherReason) He("task_local_agent");
  if (wasRunning && hasPending) h8n.emit(agentId);
  if (wasRunning && idleWindow) {
    let prevTimer = UTo.get(agentId);
    if (prevTimer) clearTimeout(prevTimer);
    let timer = setTimeout(L6p, fel, agentId, taskRegistry);
    timer.unref?.(), UTo.set(agentId, timer);
  }
}
/** Mark a running agent as failed with an error and schedule eviction. */
function x9n(agentId, error, taskRegistry) {
  let wasRunning = !1;
  if (taskRegistry.update(agentId, entry => {
    if (entry.status !== "running") return entry;
    return wasRunning = !0, {
      ...entry,
      status: "failed",
      error: error,
      endTime: Date.now(),
      evictAfter: $To(entry, {
        park: !1
      }),
      abortController: void 0,
      selectedAgent: void 0
    };
  }), p_(agentId), wasRunning) xe("task_local_agent", "task_local_agent_failed"), _8n(agentId, taskRegistry);
}
/** Register a new backgrounded local-agent task entry. */
function Xpt({
  agentId: agentId,
  ownerAgentId: ownerAgentId,
  parentAgentId: parentAgentId,
  spawnDepth: spawnDepth,
  description: description,
  prompt: prompt,
  selectedAgent: selectedAgent,
  taskRegistry: taskRegistry,
  parentAbortController: parentAbortController,
  toolUseId: toolUseId,
  cwd: cwd
}) {
  Yye(agentId, jk(cd(agentId)));
  let abortController = parentAbortController ? h1(parentAbortController) : kl(),
    entry = {
      ...av(agentId, "local_agent", description, toolUseId),
      type: "local_agent",
      status: "running",
      agentId: agentId,
      ownerAgentId: ownerAgentId,
      parentAgentId: parentAgentId,
      spawnDepth: spawnDepth,
      prompt: prompt,
      cwd: cwd,
      selectedAgent: selectedAgent,
      agentType: selectedAgent.agentType ?? "general-purpose",
      abortController: abortController,
      retrieved: !1,
      lastReportedToolCount: 0,
      lastReportedTokenCount: 0,
      isBackgrounded: !0,
      isIdle: !1,
      pendingMessages: [],
      retain: !1,
      diskLoaded: !1,
      keepaliveReasons: new Set()
    };
  return taskRegistry.register(entry), entry;
}
/** Register a resumed (already-completed) local-agent task entry. */
function vnl(resumed, taskRegistry) {
  let base = av(resumed.agentId, "local_agent", resumed.description ?? "(resumed agent)", resumed.toolUseId),
    entry = {
      ...base,
      startTime: resumed.startTime ?? base.startTime,
      type: "local_agent",
      status: "completed",
      agentId: resumed.agentId,
      ownerAgentId: resumed.parentAgentId ?? rs(),
      parentAgentId: resumed.parentAgentId,
      spawnDepth: resumed.spawnDepth,
      prompt: "",
      agentType: resumed.agentType ?? "general-purpose",
      retrieved: !1,
      lastReportedToolCount: 0,
      lastReportedTokenCount: 0,
      isBackgrounded: !0,
      isIdle: !1,
      pendingMessages: [],
      retain: !1,
      diskLoaded: !1,
      keepaliveReasons: new Set()
    };
  taskRegistry.register(entry);
}
/** Register a foreground local-agent task with optional auto-background timer. */
function jza({
  agentId: agentId,
  ownerAgentId: ownerAgentId,
  parentAgentId: parentAgentId,
  spawnDepth: spawnDepth,
  description: description,
  prompt: prompt,
  selectedAgent: selectedAgent,
  taskRegistry: taskRegistry,
  autoBackgroundMs: autoBackgroundMs,
  toolUseId: toolUseId,
  cwd: cwd
}) {
  Yye(agentId, jk(cd(agentId)));
  let abortController = kl(),
    entry = {
      ...av(agentId, "local_agent", description, toolUseId),
      type: "local_agent",
      status: "running",
      agentId: agentId,
      ownerAgentId: ownerAgentId,
      parentAgentId: parentAgentId,
      spawnDepth: spawnDepth,
      prompt: prompt,
      cwd: cwd,
      selectedAgent: selectedAgent,
      agentType: selectedAgent.agentType ?? "general-purpose",
      abortController: abortController,
      retrieved: !1,
      lastReportedToolCount: 0,
      lastReportedTokenCount: 0,
      isBackgrounded: !1,
      isIdle: !1,
      pendingMessages: [],
      retain: !1,
      diskLoaded: !1,
      keepaliveReasons: new Set()
    },
    resolveBackground,
    backgroundSignal = new Promise(resolve => {
      resolveBackground = resolve;
    });
  Nmt.set(agentId, resolveBackground), taskRegistry.register(entry);
  let cancelAutoBackground;
  if (autoBackgroundMs !== void 0 && autoBackgroundMs > 0) {
    let timer = setTimeout((registry, id) => {
      registry.update(id, e => {
        if (e.isBackgrounded) return e;
        return {
          ...e,
          isBackgrounded: !0
        };
      });
      let resolve = Nmt.get(id);
      if (resolve) resolve(), Nmt.delete(id);
    }, autoBackgroundMs, taskRegistry, agentId);
    cancelAutoBackground = () => clearTimeout(timer);
  }
  return {
    taskId: agentId,
    backgroundSignal: backgroundSignal,
    cancelAutoBackground: cancelAutoBackground,
    abortController: abortController
  };
}
/** Move a foreground agent into the background; resolve its background signal. */
function Cqt(agentId, taskRegistry) {
  let entry = taskRegistry.get(agentId);
  if (!rc(entry) || entry.isBackgrounded || lv(entry.status) && !fx(entry)) return !1;
  taskRegistry.update(agentId, e => ({
    ...e,
    isBackgrounded: !0
  }));
  let resolve = Nmt.get(agentId);
  if (resolve) resolve(), Nmt.delete(agentId);
  return !0;
}
/** Remove an agent from the registry unless it is backgrounded or holds child keepalives. */
function Yza(agentId, taskRegistry) {
  Nmt.delete(agentId);
  let entry = taskRegistry.get(agentId);
  if (!rc(entry) || entry.isBackgrounded || udt(agentId, taskRegistry)) return;
  taskRegistry.remove(agentId);
}
var Anl = 5,
  BTo = "flag:idle-window",
  UTo,
  P6n,
  Nmt;
var hS = b(() => {
  lt();
  Ud();
  mn();
  vw();
  ri();
  $A();
  MO();
  xS();
  lh();
  C0e();
  qe();
  ef();
  D_();
  wE();
  HB();
  H9n();
  Yk();
  FTo();
  UTo = new Map();
  P6n = {
    name: "LocalAgentTask",
    type: "local_agent",
    async kill(e, t, n, r) {
      _ye(e, t, r);
    }
  };
  Nmt = new Map();
});

export {D9n,Ydo,P9n,I3t,O9n,zte,L6p,fx,$To,rc,zza,bG,E5e,C5e,C5a,udt,L9n,U5e,w5n,g8n,b6e,_8n,_ye,Rnl,ddt,f9a,M6p,k$a,h9a,x9n,Xpt,vnl,jza,Cqt,Yza,Anl,BTo,UTo,P6n,Nmt,hS};
