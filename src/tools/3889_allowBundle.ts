// @ts-nocheck
import {writeRemoteAgentMetadata as Xro,deleteRemoteAgentMetadata as EUt,listRemoteAgentMetadata as Qro,_a as za} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {fga as Gaa,hga as Vaa} from "../telemetry/3338_allowBundle.ts";
import {He,xe as Pe,Tl as Fl,mn as cn} from "../telemetry/0600_feature_name.ts";
import {Dv as pO,bc as Ap,yp as J_,UEe as jSe,qP as mO,Qd as g_,Fu as Ff,A1e as pMe,lje as KVe,Ud as Dp} from "../../vendor/m615.ts";
import {gf as mh,mut as Kat,qFa as s0a,p_ as iy,wE as TC} from "../../vendor/m5177.ts";
import {rd as wm,ef as uA} from "../../vendor/m2794.ts";
import {mainAgentId as ws,lt as ct} from "../session/0132_sent.ts";
import {fl as Ol,Kl as Uc,po as lo} from "./5224_userPromptCount.ts";
import {qt as Wt,TeamDeleteToolName as Oe,tn as Xt} from "../config/0230_encoding.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {SIe as hke,OOn as o0n} from "./3335_todos.ts";
import {QR as jw,wD as pP} from "./2710_allErrors.ts";
import {xBt as L1t,yto as NYr} from "../../vendor/m3330.ts";
import {M$ as J$,av as oI,vw as dx} from "../../vendor/m5178.ts";
import {fetchSession as ife,NR as Rw} from "../api/2195_updateSessionTitle.ts";
import {pollRemoteSessionEvents as CHe,qD as wP,archiveRemoteSession as l6} from "../permissions/3888_validateSessionRepository.ts";
import {gT as AT} from "../core/2809_toInfraSessionId.ts";
import {b} from "../../runtime.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {kt as Ct,logEvent as j} from "../../vendor/m132.ts";
import {RE as gC,hf as Mh} from "../session/2796_uuid.ts";
import {ve as Re} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
// @ts-nocheck
/**
 * Remote agent / cloud session task lifecycle (Claude Code v2.1.190).
 * Polls remote sessions, projects their events into the local task registry,
 * renders task-notification summaries, and persists/restores remote task metadata.
 */

/**
 * Extract the completion summary for a remote dynamic workflow from its event log.
 * Walks back from the first `result` event after the `task_notification` system event
 * to find the last assistant text block, falling back to the notification's own summary.
 */
function n0a(events) {
  let notificationIndex = events.findIndex(event => event.type === "system" && event.subtype === "task_notification" && event.status !== void 0);
  if (notificationIndex === -1) return null;
  let resultIndex = -1;
  for (let i = notificationIndex + 1; i < events.length; i++) if (events[i].type === "result") {
    resultIndex = i;
    break;
  }
  if (resultIndex === -1) return null;
  for (let i = resultIndex - 1; i > notificationIndex; i--) {
    let event = events[i];
    if (event.type === "assistant") {
      let text = event.message.content.filter(block => block.type === "text").map(block => "text" in block ? block.text : "").join(`
`).trim();
      if (text) return text;
    }
  }
  let notification = events[notificationIndex];
  return notification.type === "system" && notification.subtype === "task_notification" ? notification.summary ?? "Remote dynamic workflow completed" : "Remote dynamic workflow completed";
}

/** True if the given remote task type is one of the known/handled types. */
function ofp(remoteTaskType) {
  return XwO.includes(remoteTaskType ?? "");
}

/** Persist remote agent metadata so the task can be restored across restarts. */
async function ifp(metadata) {
  try {
    await Xro(metadata.taskId, metadata);
  } catch (error) {
    v(`persistRemoteAgentMetadata failed: ${String(error)}`);
  }
}

/** Remove persisted remote agent metadata once the task is no longer active. */
async function lYH(taskId) {
  try {
    await EUt(taskId);
  } catch (error) {
    v(`removeRemoteAgentMetadata failed: ${String(error)}`);
  }
}

/** Check whether the current environment is eligible to launch cloud agents. */
async function Vle({
  allowBundle: allowBundle = !1,
  cwd: cwd
} = {}) {
  let errors = await Gaa({
    allowBundle: allowBundle,
    cwd: cwd
  });
  if (errors.length > 0) return {
    eligible: !1,
    errors: errors
  };
  return {
    eligible: !0
  };
}

/** Human-readable explanation for each cloud-agent ineligibility reason. */
function ste(error) {
  switch (error.type) {
    case "not_logged_in":
      return "Please run /login and sign in with your Claude.ai account (not Console).";
    case "not_in_git_repo":
      return `Cloud agents require a git repository (checked: ${error.cwd}). Initialize git or run from a git repository.`;
    case "no_git_remote":
      return "Cloud agents require a GitHub remote. Add one with `git remote add origin REPO_URL`.";
    case "github_app_not_installed":
      return `The Claude GitHub app must be installed on this repository first.
https://github.com/apps/claude/installations/new`;
    case "policy_blocked":
      return "Cloud sessions are disabled by your organization's policy. Contact your organization admin to enable them.";
  }
}

/**
 * Emit a task-notification for a finished remote agent task and fire telemetry.
 * `summary` is an optional summary block embedded in the notification body.
 */
function XyK(taskId, title, status, registry, summary) {
  if (!PwO(taskId, registry)) return;
  if (status === "completed") He("task_remote_agent");else if (status === "failed") Pe("task_remote_agent", "task_remote_agent_failed");
  let statusText = status === "completed" ? "completed successfully" : status === "failed" ? "failed" : "was stopped",
    summaryBlock = summary ? `
<${pO}>${summary}</${pO}>` : "",
    remoteUrl = mh(taskId),
    notification = `<${Ap}>
<${J_}>${taskId}</${J_}>${summaryBlock}
<${jSe}>remote_agent</${jSe}>
<${mO}>${remoteUrl}</${mO}>
<${g_}>${status}</${g_}>
<${Ff}>Remote task "${title}" ${statusText}</${Ff}>
</${Ap}>`;
  wm({
    value: notification,
    mode: "task-notification",
    agentId: ws(),
    priority: "next"
  });
}

/**
 * Mark the task as notified in the registry, returning true only the first time.
 * Guards against emitting duplicate task notifications.
 */
function PwO(taskId, registry) {
  let firstNotification = !1;
  return registry.update(taskId, task => {
    if (task.notified) return task;
    return firstNotification = !0, {
      ...task,
      notified: !0
    };
  }), firstNotification;
}

/**
 * Find the latest review output from the event log: prefer the last hook
 * progress/response stdout, then the last assistant message, then all hooks
 * concatenated, finally all assistant messages joined.
 */
function ZwO(events) {
  for (let i = events.length - 1; i >= 0; i--) {
    let event = events[i];
    if (event?.type === "system" && (event.subtype === "hook_progress" || event.subtype === "hook_response")) {
      let extracted = Ol(event.stdout, pMe);
      if (extracted?.trim()) return extracted.trim();
    }
  }
  for (let i = events.length - 1; i >= 0; i--) {
    let event = events[i];
    if (event?.type !== "assistant") continue;
    let text = Uc(event.message.content, `
`),
      extracted = Ol(text, pMe);
    if (extracted?.trim()) return extracted.trim();
  }
  let allHookStdout = events.filter(event => event.type === "system" && (event.subtype === "hook_progress" || event.subtype === "hook_response")).map(event => event.stdout).join(""),
    extracted = Ol(allHookStdout, pMe);
  if (extracted?.trim()) return extracted.trim();
  return events.filter(event => event.type === "assistant").map(event => Uc(event.message.content, `
`)).join(`
`).trim() || null;
}

/**
 * Same review-output extraction as ZwO but only over the latest event batch,
 * returning null (rather than the full assistant join) when nothing is found.
 */
function lYH_2(events) {
  for (let i = events.length - 1; i >= 0; i--) {
    let event = events[i];
    if (event?.type === "system" && (event.subtype === "hook_progress" || event.subtype === "hook_response")) {
      let extracted = Ol(event.stdout, pMe);
      if (extracted?.trim()) return extracted.trim();
    }
  }
  for (let i = events.length - 1; i >= 0; i--) {
    let event = events[i];
    if (event?.type !== "assistant") continue;
    let text = Uc(event.message.content, `
`),
      extracted = Ol(text, pMe);
    if (extracted?.trim()) return extracted.trim();
  }
  let allHookStdout = events.filter(event => event.type === "system" && (event.subtype === "hook_progress" || event.subtype === "hook_response")).map(event => event.stdout).join(""),
    extracted = Ol(allHookStdout, pMe);
  if (extracted?.trim()) return extracted.trim();
  return null;
}

/** Parse the review output JSON and return its top-level `error` string, if any. */
function bwp(reviewOutput) {
  try {
    let parsed = Wt(reviewOutput);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      let error = parsed.error;
      if (typeof error === "string") return error;
    }
  } catch {}
  return null;
}

/** Parse the review output JSON and return the number of findings (array length). */
function $co(reviewOutput) {
  try {
    let parsed = Wt(reviewOutput);
    return Array.isArray(parsed) ? parsed.length : void 0;
  } catch {
    return;
  }
}

/**
 * Emit a successful cloud-review task-notification with the findings,
 * reporting the findings count in telemetry and optionally instructing
 * the agent to apply the fixes to the local working tree.
 */
function Ewp(taskId, reviewOutput, registry, applyFixesOnComplete) {
  if (!PwO(taskId, registry)) return;
  let findingsCount = $co(reviewOutput);
  He("task_remote_agent", {
    remote_task_type: Ve("ultrareview"),
    ...(findingsCount !== void 0 && {
      findings_count: findingsCount
    })
  });
  let notification = `<${Ap}>
<${J_}>${taskId}</${J_}>
<${jSe}>remote_agent</${jSe}>
<${g_}>completed</${g_}>
<${Ff}>Cloud review completed</${Ff}>
</${Ap}>
The cloud review produced the following findings:

${reviewOutput}${applyFixesOnComplete ? `

The user launched this review with --fix: apply these findings to the local working tree now. Skip findings that are wrong or not worth fixing, and run the relevant checks after.` : ""}`;
  wm({
    value: notification,
    mode: "task-notification",
    agentId: ws(),
    priority: "next"
  });
}

/**
 * Emit a failed cloud-review task-notification. `reason` selects the canned
 * failure message from Swp, optionally appended with sanitized error detail.
 */
function UFa(taskId, reason, registry, errorDetail) {
  if (!PwO(taskId, registry)) return;
  Pe("task_remote_agent", "task_remote_agent_review_failed", {
    remote_task_type: Ve("ultrareview"),
    reason: Le(reason)
  });
  let detailSuffix = errorDetail ? `: ${errorDetail.replace(/[<>]/g, "").slice(0, 200)}` : "",
    failureMessage = Swp[reason] + detailSuffix,
    notification = `<${Ap}>
<${J_}>${taskId}</${J_}>
<${jSe}>remote_agent</${jSe}>
<${g_}>failed</${g_}>
<${Ff}>Cloud review failed: ${failureMessage}</${Ff}>
</${Ap}>
Cloud review did not produce output (${failureMessage}). Tell the user to retry /code-review ultra, or use /review for a local review instead.`;
  wm({
    value: notification,
    mode: "task-notification",
    agentId: ws(),
    priority: "next"
  });
}

/** Resolve the current todo list, preferring reconstructed todos over the raw tool input. */
function Eqq(events) {
  let reconstructed = GwO(events);
  if (reconstructed.length > 0) return reconstructed;
  return Sqq(events);
}

/** Read the todo list straight from the most recent TodoWrite tool_use input. */
function Sqq(events) {
  let lastTodoWrite = events.findLast(event => event.type === "assistant" && event.message.content.some(block => block.type === "tool_use" && block.name === hke.name));
  if (!lastTodoWrite) return [];
  let input = lastTodoWrite.message.content.find(block => block.type === "tool_use" && block.name === hke.name)?.input;
  if (!input) return [];
  let parsed = hke.inputSchema.safeParse(input);
  if (!parsed.success) return [];
  return parsed.data.todos;
}

/**
 * Reconstruct the todo list from add/update/delete tool calls and their results,
 * mapping tool_use_ids to created task ids via the "Task #… created" result text.
 */
function GwO(events) {
  let pendingByToolUseId = new Map(),
    tasksById = new Map();
  for (let event of events) if (event.type === "assistant") for (let block of event.message.content) {
    if (block.type !== "tool_use") continue;
    if (block.name === jw) {
      let parsed = NwO().safeParse(block.input);
      if (!parsed.success) continue;
      pendingByToolUseId.set(block.id, {
        content: parsed.data.subject,
        activeForm: parsed.data.activeForm ?? parsed.data.subject,
        status: "pending"
      });
    } else if (block.name === pP) {
      let normalized = L1t(block.input),
        parsed = VwO().safeParse(normalized?.input ?? block.input);
      if (!parsed.success) continue;
      let {
        taskId: taskId,
        status: status,
        subject: subject,
        activeForm: activeForm
      } = parsed.data;
      if (status === "deleted") {
        tasksById.delete(taskId);
        continue;
      }
      let existing = tasksById.get(taskId);
      tasksById.set(taskId, {
        content: subject ?? existing?.content ?? taskId,
        activeForm: activeForm ?? existing?.activeForm ?? subject ?? taskId,
        status: status ?? existing?.status ?? "pending"
      });
    }
  } else if (event.type === "user") {
    let content = event.message.content;
    if (typeof content === "string") continue;
    for (let block of content) {
      if (block.type !== "tool_result") continue;
      let pending = pendingByToolUseId.get(block.tool_use_id);
      if (!pending) continue;
      if (block.is_error) {
        pendingByToolUseId.delete(block.tool_use_id);
        continue;
      }
      let resultText = "";
      if (typeof block.content === "string") resultText = block.content;else if (Array.isArray(block.content)) resultText = Uc(block.content);
      let createdTaskId = resultText.match(kwO)?.[1];
      if (!createdTaskId) continue;
      if (pendingByToolUseId.delete(block.tool_use_id), !tasksById.has(createdTaskId)) tasksById.set(createdTaskId, pending);
    }
  }
  return [...tasksById.values(), ...pendingByToolUseId.values()];
}

/**
 * Register a new remote agent task, persist its metadata, and start polling.
 * Returns the new task id, session id, and a cleanup function to stop polling.
 */
function cS6(args) {
  let {
      remoteTaskType: remoteTaskType,
      session: session,
      command: command,
      context: context,
      toolUseId: toolUseId,
      isRemoteReview: isRemoteReview,
      applyFixesOnComplete: applyFixesOnComplete,
      isUltraplan: isUltraplan,
      isLongRunning: isLongRunning,
      remoteTaskMetadata: remoteTaskMetadata
    } = args,
    taskId = J$("remote_agent");
  Kat(taskId);
  let task = {
    ...oI(taskId, "remote_agent", session.title, toolUseId),
    type: "remote_agent",
    remoteTaskType: remoteTaskType,
    status: "running",
    sessionId: session.id,
    command: command,
    title: session.title,
    todoList: [],
    log: [],
    isRemoteReview: isRemoteReview,
    applyFixesOnComplete: applyFixesOnComplete,
    isUltraplan: isUltraplan,
    isLongRunning: isLongRunning,
    pollStartedAt: Date.now(),
    remoteTaskMetadata: remoteTaskMetadata
  };
  context.taskRegistry.register(task), ifp({
    taskId: taskId,
    remoteTaskType: remoteTaskType,
    sessionId: session.id,
    title: session.title,
    command: command,
    spawnedAt: Date.now(),
    toolUseId: toolUseId,
    isUltraplan: isUltraplan,
    isRemoteReview: isRemoteReview,
    applyFixesOnComplete: applyFixesOnComplete,
    isLongRunning: isLongRunning,
    remoteTaskMetadata: remoteTaskMetadata
  });
  let cleanup = LwO(taskId, context);
  return {
    taskId: taskId,
    sessionId: session.id,
    cleanup: cleanup
  };
}

/** Restore persisted remote agent tasks at startup, wrapped in a traced span. */
async function RwO(context) {
  try {
    await Fl("task_remote_agent_restore", () => PyK(context));
  } catch (error) {
    v(`restoreRemoteAgentTasks failed: ${String(error)}`);
  }
}

/**
 * Re-register persisted remote agent tasks whose sessions are still live,
 * dropping ones that 404 or are archived, then resume polling each.
 */
async function PyK(context) {
  let savedTasks = await Qro();
  if (savedTasks.length === 0) return;
  for (let saved of savedTasks) {
    let sessionStatus;
    try {
      sessionStatus = (await ife(saved.sessionId)).session_status;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Session not found:")) v(`restoreRemoteAgentTasks: dropping ${saved.taskId} (404: ${String(error)})`), lYH(saved.taskId);else v(`restoreRemoteAgentTasks: skipping ${saved.taskId} (recoverable: ${String(error)})`);
      continue;
    }
    if (sessionStatus === "archived") {
      lYH(saved.taskId);
      continue;
    }
    let task = {
      ...oI(saved.taskId, "remote_agent", saved.title, saved.toolUseId),
      type: "remote_agent",
      remoteTaskType: ofp(saved.remoteTaskType) ? saved.remoteTaskType : "remote-agent",
      status: "running",
      sessionId: saved.sessionId,
      command: saved.command,
      title: saved.title,
      todoList: [],
      log: [],
      isRemoteReview: saved.isRemoteReview,
      applyFixesOnComplete: saved.applyFixesOnComplete,
      isUltraplan: saved.isUltraplan,
      isLongRunning: saved.isLongRunning,
      startTime: saved.spawnedAt,
      pollStartedAt: Date.now(),
      remoteTaskMetadata: saved.remoteTaskMetadata
    };
    context.taskRegistry.register(task), Kat(saved.taskId), LwO(saved.taskId, context);
  }
}

/**
 * Poll a remote session, streaming new events into the registry log and
 * driving the task to completed/failed. Handles workflow summaries, review
 * findings, idle/timeout detection, and review-progress parsing.
 * Returns a cleanup function that stops the polling loop.
 */
function LwO(taskId, context) {
  let active = !0,
    pollIntervalMs = 1000,
    reviewTimeoutMs = 1800000,
    idleThreshold = 5,
    idlePollCount = 0,
    lastEventId = null,
    eventLog = [],
    cachedReviewOutput = null,
    poll = async () => {
      if (!active) return;
      try {
        let task = context.taskRegistry.get(taskId);
        if (!task || task.status !== "running") return;
        let page = await CHe(task.sessionId, lastEventId);
        lastEventId = page.lastEventId;
        let hasNewEvents = page.newEvents.length > 0;
        if (hasNewEvents) {
          eventLog = [...eventLog, ...page.newEvents];
          let appendText = page.newEvents.map(event => {
            if (event.type === "assistant") return event.message.content.filter(block => block.type === "text").map(block => "text" in block ? block.text : "").join(`
`);
            return Oe(event);
          }).join(`
`);
          if (appendText) s0a(taskId, appendText + `
`);
        }
        if (page.sessionStatus === "archived") {
          context.taskRegistry.update(taskId, t => t.status === "running" ? {
            ...t,
            status: "completed",
            endTime: Date.now()
          } : t), XyK(taskId, task.title, "completed", context.taskRegistry, task.toolUseId), iy(taskId), lYH(taskId);
          return;
        }
        let summaryExtractor = task.remoteTaskType === "remote-workflow" ? async () => n0a(eventLog) : WwO.get(task.remoteTaskType);
        if (summaryExtractor) {
          let summary = await summaryExtractor(task.remoteTaskMetadata);
          if (summary !== null) {
            context.taskRegistry.update(taskId, t => t.status === "running" ? {
              ...t,
              status: "completed",
              endTime: Date.now()
            } : t), XyK(taskId, summary, "completed", context.taskRegistry, task.toolUseId), iy(taskId), lYH(taskId);
            return;
          }
        }
        let resultEvent = task.isUltraplan || task.isLongRunning || summaryExtractor ? void 0 : eventLog.findLast(event => event.type === "result");
        if (task.isRemoteReview && hasNewEvents && cachedReviewOutput === null) cachedReviewOutput = lYH_2(page.newEvents);
        let reviewProgress;
        if (task.isRemoteReview && hasNewEvents) {
          let openTag = `<${KVe}>`,
            closeTag = `</${KVe}>`;
          for (let event of page.newEvents) if (event.type === "system" && (event.subtype === "hook_progress" || event.subtype === "hook_response")) {
            let stdout = event.stdout,
              closeIndex = stdout.lastIndexOf(closeTag),
              openIndex = closeIndex === -1 ? -1 : stdout.lastIndexOf(openTag, closeIndex);
            if (openIndex !== -1 && closeIndex > openIndex) try {
              let parsed = Wt(stdout.slice(openIndex + openTag.length, closeIndex));
              reviewProgress = {
                stage: parsed.stage,
                bugsFound: parsed.bugs_found ?? 0,
                bugsVerified: parsed.bugs_verified ?? 0,
                bugsRefuted: parsed.bugs_refuted ?? 0
              };
            } catch {}
          }
        }
        let hasProgressEvents = eventLog.some(event => event.type === "assistant" || task.isRemoteReview && event.type === "system" && (event.subtype === "hook_progress" || event.subtype === "hook_response"));
        if (page.sessionStatus === "idle" && !hasNewEvents && hasProgressEvents) idlePollCount++;else idlePollCount = 0;
        let idleExceeded = idlePollCount >= idleThreshold,
          sessionStartPending = eventLog.some(event => event.type === "system" && (event.subtype === "hook_started" || event.subtype === "hook_progress" || event.subtype === "hook_response") && event.hook_event === "SessionStart"),
          hasAssistant = eventLog.some(event => event.type === "assistant"),
          reviewComplete = task.isRemoteReview && (cachedReviewOutput !== null || !sessionStartPending && idleExceeded && hasAssistant),
          reviewTimedOut = task.isRemoteReview && Date.now() - task.pollStartedAt > reviewTimeoutMs,
          nextStatus = resultEvent ? resultEvent.subtype === "success" ? "completed" : "failed" : reviewComplete || reviewTimedOut ? "completed" : eventLog.length > 0 ? "running" : "starting",
          alreadyTerminal = !1;
        if (context.taskRegistry.update(taskId, t => {
          if (t.status !== "running") return alreadyTerminal = !0, t;
          if (!hasNewEvents && (nextStatus === "running" || nextStatus === "starting")) return t;
          return {
            ...t,
            status: nextStatus === "starting" ? "running" : nextStatus,
            log: eventLog,
            todoList: hasNewEvents ? Eqq(eventLog) : t.todoList,
            reviewProgress: reviewProgress ?? t.reviewProgress,
            endTime: resultEvent || reviewComplete || reviewTimedOut ? Date.now() : void 0
          };
        }), alreadyTerminal) return;
        if (resultEvent || reviewComplete || reviewTimedOut) {
          let finalStatus = resultEvent && resultEvent.subtype !== "success" ? "failed" : "completed";
          if (task.isRemoteReview) {
            let reviewOutput = cachedReviewOutput ?? ZwO(eventLog),
              reviewError = reviewOutput ? bwp(reviewOutput) : null;
            if (reviewOutput && finalStatus === "completed" && reviewError === null) {
              Ewp(taskId, reviewOutput, context.taskRegistry, task.applyFixesOnComplete), iy(taskId), lYH(taskId);
              return;
            }
            context.taskRegistry.update(taskId, t => ({
              ...t,
              status: "failed"
            }));
            let failureReason = reviewError !== null ? "orchestrator_error" : resultEvent && resultEvent.subtype !== "success" ? "session_error" : reviewTimedOut && !reviewComplete ? "poll_timeout" : "no_review_output";
            UFa(taskId, failureReason, context.taskRegistry, reviewError ?? void 0), iy(taskId), lYH(taskId);
            return;
          }
          XyK(taskId, task.title, finalStatus, context.taskRegistry, task.toolUseId), iy(taskId), lYH(taskId);
          return;
        }
      } catch (error) {
        v(`Remote session poll failed for task ${taskId}: ${String(error)}`, {
          level: "error"
        }), idlePollCount = 0;
        try {
          let task = context.taskRegistry.get(taskId);
          if (task?.isRemoteReview && task.status === "running" && Date.now() - task.pollStartedAt > reviewTimeoutMs) {
            context.taskRegistry.update(taskId, t => ({
              ...t,
              status: "failed",
              endTime: Date.now()
            })), UFa(taskId, "poll_timeout_after_api_error", context.taskRegistry), iy(taskId), lYH(taskId);
            return;
          }
        } catch {}
      }
      if (active) setTimeout(poll, pollIntervalMs);
    };
  return poll(), () => {
    active = !1;
  };
}

/** Build the cloud session ingress URL for the given session. */
function hwO(sessionId) {
  return AT(sessionId, process.env.SESSION_INGRESS_URL, {
    from: "cli"
  });
}

var XwO, WwO, Swp, kwO, NwO, VwO, CmH;
var zo = b(() => {
  ct();
  Xr();
  Dp();
  cn();
  Ct();
  dx();
  NYr();
  o0n();
  Vaa();
  je();
  uA();
  lo();
  gC();
  za();
  Xt();
  TC();
  Rw();
  wP();
  XwO = ["remote-agent", "ultraplan", "ultrareview", "autofix-pr", "remote-workflow"];
  WwO = new Map();
  Swp = {
    session_error: "cloud session returned an error",
    poll_timeout: "cloud session exceeded 30 minutes",
    poll_timeout_after_api_error: "cloud session exceeded 30 minutes (API polls were failing)",
    no_review_output: "no review output — orchestrator may have exited early",
    orchestrator_error: "orchestrator reported an error",
    cancelled: "cancelled"
  };
  kwO = /^Task #(\S+) created successfully/, NwO = Re(() => E.object({
    subject: E.string(),
    activeForm: E.string().optional()
  })), VwO = Re(() => E.object({
    taskId: E.string(),
    status: E.enum(["pending", "in_progress", "completed", "deleted"]).optional(),
    subject: E.string().optional(),
    activeForm: E.string().optional()
  }));
  CmH = {
    name: "RemoteAgentTask",
    type: "remote_agent",
    async kill(taskId, registry, setAppState) {
      let toolUseId,
        description,
        sessionId,
        isUltraplan = !1,
        isRemoteReview = !1,
        pollStartedAt = 0,
        wasRunning = !1;
      if (registry.update(taskId, task => {
        if (task.status !== "running") return task;
        return toolUseId = task.toolUseId, description = task.description, sessionId = task.sessionId, isUltraplan = task.isUltraplan ?? !1, isRemoteReview = task.isRemoteReview ?? !1, pollStartedAt = task.pollStartedAt, wasRunning = !0, {
          ...task,
          status: "killed",
          notified: !0,
          endTime: Date.now()
        };
      }), wasRunning) {
        if (Mh(taskId, "stopped", {
          toolUseId: toolUseId,
          summary: description
        }), sessionId) l6(sessionId).catch(error => v(`RemoteAgentTask archive failed: ${String(error)}`));
        if (isRemoteReview) Pe("task_remote_agent", "task_remote_agent_review_failed", {
          remote_task_type: Ve("ultrareview"),
          reason: Le("cancelled")
        });
        if (isUltraplan) j("tengu_ultraplan_stopped", {
          duration_ms: Date.now() - pollStartedAt
        }), setAppState(state => state.ultraplanSessionUrl || state.ultraplanPendingChoice ? {
          ...state,
          ultraplanSessionUrl: void 0,
          ultraplanPendingChoice: void 0
        } : state);
      }
      iy(taskId), lYH(taskId), v(`RemoteAgentTask ${taskId} killed, archiving session ${sessionId ?? "unknown"}`);
    }
  };
});

export {n0a as BFa,ofp as gwp,ifp as ywp,lYH as nye,Vle as Zle,ste as dte,XyK as Bco,PwO as Uco,ZwO as Twp,lYH_2 as a$n,bwp,$co,Ewp,UFa,Eqq as Cwp,Sqq as Awp,GwO as kwp,cS6 as rye,RwO as h9t,PyK as Hwp,LwO as $Fa,hwO as ece,XwO as hwp,WwO as _wp,Swp,kwO as Rwp,NwO as vwp,VwO as wwp,CmH as Mqe,zo as mY};
