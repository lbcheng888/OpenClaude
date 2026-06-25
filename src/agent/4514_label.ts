// @ts-nocheck
import {getSessionCronTasks as _R,lt} from "../session/0132_sent.ts";
import {truncate as Ha,XH} from "../../vendor/m239.ts";
import {PO,c1,Drt,formatPermissionRule as $z} from "../../vendor/m2695.ts";
import {formatDuration as Fi,Xo} from "../../vendor/m240.ts";
import {isCronFeatureEnabled as LC} from "../tui/3853_mode.ts";
import {os,zn} from "../api/0465_getOauthConfig.ts";
import {YA} from "../../vendor/m3366.ts";
import {zdt,W3n} from "./4080_W3n.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {bWn,EWn} from "../../vendor/m4410.ts";
import {b} from "../../runtime.ts";
/**
 * Builds label/detail entries for active scheduled (cron) tasks.
 * @param cronFilter optional predicate to keep only matching cron tasks
 */
function getActiveCronTaskLabels(cronFilter) {
  let labels = [];
  for (let cronTask of _R()) {
    if (cronFilter && !cronFilter(cronTask)) continue;
    labels.push({
      label: "scheduled task",
      detail: `${formatCronTaskScheduleText(cronTask)} \xB7 ${Ha(cronTask.prompt, MAX_LABEL_CHARS, !0)}`
    });
  }
  return labels;
}
/** Renders the human-readable next-run schedule text for a cron task. */
function formatCronTaskScheduleText(cronTask) {
  if (cronTask.recurring) return PO(cronTask.cron);
  let parsed = c1(cronTask.cron),
    nextRunTime = parsed && Drt(parsed, new Date(cronTask.createdAt));
  if (!nextRunTime) return PO(cronTask.cron);
  let msUntilRun = Math.max(0, nextRunTime.getTime() - Date.now());
  return `Runs once in ${Fi(msUntilRun, {
    mostSignificantOnly: !0
  })}`;
}
/** Builds label/detail entries for background (local) tasks plus active cron tasks. */
function getBackgroundTaskLabels(backgroundTasks, {
  includeDream = !1
} = {}) {
  let labels = [];
  for (let task of Object.values(backgroundTasks)) {
    if (!LC(task) || task.type === "remote_agent") continue;
    if (!includeDream && task.type === "dream") continue;
    labels.push({
      label: XCo[task.type],
      detail: Ha(task.description, MAX_LABEL_CHARS, !0)
    });
  }
  return labels.push(...getActiveCronTaskLabels()), labels;
}
/** Returns active local tasks (excluding remote agents and dream tasks). */
function getActiveLocalTasks(backgroundTasks) {
  return Object.values(backgroundTasks).filter(LC).filter(task => task.type !== "remote_agent" && task.type !== "dream");
}
/** Computes counts of active tasks by kind, plus how many local agents are restartable. */
function getTaskKindCounts(backgroundTasks) {
  let localTasks = getActiveLocalTasks(backgroundTasks),
    cronCount = _R().length,
    kinds = os(localTasks.map(getTaskKindKey));
  if (cronCount > 0) kinds.push("session_cron");
  let restartableCount = zn(Object.values(backgroundTasks), task => task.type === "local_agent" && task.status === "running" && !task.isBackgrounded);
  return {
    count: localTasks.length + cronCount,
    restartableCount: restartableCount,
    kinds: kinds
  };
}
/** Maps a task to its display kind key (monitor tasks get their own bucket). */
function getTaskKindKey(task) {
  return YA(task) && task.kind === "monitor" ? "monitor" : task.type;
}
/**
 * Summarizes active tasks: total count, kinds, and a human-readable summary string.
 * @param options optional cronFilter predicate for the cron task labels
 */
function getTaskRunSummary(backgroundTasks, options) {
  let localTasks = getActiveLocalTasks(backgroundTasks),
    cronTasks = getActiveCronTaskLabels(options?.cronFilter),
    totalCount = localTasks.length + cronTasks.length,
    kinds = os(localTasks.map(getTaskKindKey));
  if (cronTasks.length > 0) kinds.push("session_cron");
  let summaryParts = [zdt(localTasks), cronTasks.length ? `${cronTasks.length} ${Sn(cronTasks.length, "loop")}` : ""];
  return {
    count: totalCount,
    kinds: kinds,
    summary: summaryParts.filter(Boolean).join(", ")
  };
}
/** Notice shown when the session detaches but background tasks are still running. */
function getDetachedTasksNotice() {
  let {
    tasks: detachedCount
  } = bWn();
  if (detachedCount === 0) return;
  return `Detached \u2014 ${detachedCount} ${Sn(detachedCount, "task")} still running. Run \`claude agents\` to see your background sessions.`;
}
var MAX_LABEL_CHARS = 50,
  XCo;
var Mft = b(() => {
  lt();
  EWn();
  W3n();
  $z();
  Xo();
  lr();
  XH();
  XCo = {
    local_agent: "subagent",
    local_workflow: "workflow",
    local_bash: "shell",
    monitor_mcp: "monitor",
    mcp_task: "MCP task",
    in_process_teammate: "teammate",
    dream: "dream",
    remote_agent: "cloud session"
  };
});

export {getActiveCronTaskLabels as AVn,formatCronTaskScheduleText as DYp,getBackgroundTaskLabels as ipl,getActiveLocalTasks as apl,getTaskKindCounts as _8t,getTaskKindKey as lpl,getTaskRunSummary as y8t,getDetachedTasksNotice as cpl,MAX_LABEL_CHARS as spl,XCo,Mft};
