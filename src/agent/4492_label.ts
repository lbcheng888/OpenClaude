// @ts-nocheck
import {getSessionCronTasks as dR,lt as Y_} from "../session/0131_sent.ts";
import {truncate as gK,EH as DN} from "../../vendor/m237.ts";
import {AL as JV,X1 as sv,ktt as LH_,Az as Tr} from "../../vendor/m2683.ts";
import {formatDuration as g7,ps as _9} from "../../vendor/m238.ts";
import {enforcementWarnDedup as WX} from "../tui/3835_mode.ts";
import {fs as O9} from "../api/0459_getOauthConfig.ts";
import {oI as YR} from "../../vendor/m3350.ts";
import {xct as _4_,o2n as rS6} from "./4016_o2n.ts";
import {Cn as b6,dr as P8} from "../../vendor/m231.ts";
import {t6n as Cp6,n6n as bp6} from "../../vendor/m4388.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function getActiveCronTaskLabels() {
  let labels = [];
  for (let task of dR()) labels.push({
    label: "scheduled task",
    detail: `${formatCronTaskScheduleText(task)} \xB7 ${gK(task.prompt, MAX_LABEL_CHARS, true)}`
  });
  return labels;
}
function formatCronTaskScheduleText(cronTask) {
  if (cronTask.recurring) return JV(cronTask.cron);
  let parsed = sv(cronTask.cron),
    nextRunTime = parsed && LH_(parsed, new Date(cronTask.createdAt));
  if (!nextRunTime) return JV(cronTask.cron);
  let msUntilRun = Math.max(0, nextRunTime.getTime() - Date.now());
  return `Runs once in ${g7(msUntilRun, {
    mostSignificantOnly: true
  })}`;
}
function getBackgroundTaskLabels(backgroundTasks, {
  includeDream = false
} = {}) {
  let labels = [];
  for (let task of Object.values(backgroundTasks)) {
    if (!WX(task) || task.type === "remote_agent") continue;
    if (!includeDream && task.type === "dream") continue;
    labels.push({
      label: TASK_KIND_DISPLAY_NAMES[task.type],
      detail: gK(task.description, MAX_LABEL_CHARS, true)
    });
  }
  return labels.push(...getActiveCronTaskLabels()), labels;
}
function getActiveLocalTasks(backgroundTasks) {
  return Object.values(backgroundTasks).filter(WX).filter(task => task.type !== "remote_agent");
}
function getTaskKindCounts(backgroundTasks) {
  let localTasks = getActiveLocalTasks(backgroundTasks),
    cronCount = dR().length,
    kinds = O9(localTasks.map(getTaskKindKey));
  if (cronCount > 0) kinds.push("session_cron");
  return {
    count: localTasks.length + cronCount,
    kinds: kinds
  };
}
function getTaskKindKey(task) {
  return YR(task) && task.kind === "monitor" ? "monitor" : task.type;
}
function getTaskRunSummary(backgroundTasks) {
  let localTasks = getActiveLocalTasks(backgroundTasks),
    cronTasks = getActiveCronTaskLabels(),
    totalCount = localTasks.length + cronTasks.length,
    kinds = O9(localTasks.map(getTaskKindKey));
  if (cronTasks.length > 0) kinds.push("session_cron");
  let summaryParts = [_4_(localTasks), cronTasks.length ? `${cronTasks.length} ${b6(cronTasks.length, "loop")}` : ""];
  return {
    count: totalCount,
    kinds: kinds,
    summary: summaryParts.filter(Boolean).join(", ")
  };
}
function getDetachedTasksNotice() {
  let {
    tasks: detachedCount
  } = Cp6();
  if (detachedCount === 0) return;
  return `Detached \u2014 ${detachedCount} ${b6(detachedCount, "task")} still running. Run \`claude agents\` to see your background sessions.`;
}
var MAX_LABEL_CHARS = 50,
  TASK_KIND_DISPLAY_NAMES;
var p3_ = L(() => {
  Y_();
  bp6();
  rS6();
  Tr();
  _9();
  P8();
  DN();
  TASK_KIND_DISPLAY_NAMES = {
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

export {getActiveCronTaskLabels as r8n,formatCronTaskScheduleText as Yjp,getBackgroundTaskLabels as _sl,getActiveLocalTasks as ysl,getTaskKindCounts as Tsl,getTaskKindKey as Ssl,getTaskRunSummary as o8n,getDetachedTasksNotice as bsl,MAX_LABEL_CHARS as gsl,TASK_KIND_DISPLAY_NAMES as ryo,p3_ as Lpt};
