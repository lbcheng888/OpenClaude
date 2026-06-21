// @ts-nocheck
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {CRON_CREATE_TOOL_NAME as pW,CRON_DELETE_TOOL_NAME as Rx,IF as LC,z5 as cg} from "../config/2700_isKairosCronEnabled.ts";
import {bO as $N,fp as g3,J_ as Uw,__ as ww,Mf as Cz,initKp as UO} from "../../vendor/m609.ts";
import {isAmberSentinelEnabled as LO,QH as ML} from "../../vendor/m2784.ts";
import {_m as AT,sA as S$} from "../../vendor/m2782.ts";
import {mainAgentId as d7,getSessionCronTasks as vR,addSessionCronTask as hkH,setScheduledTasksEnabled as va,lt as w_} from "../session/0131_sent.ts";
import {isTmuxControlMode as n_,ln as M6} from "../telemetry/0594_feature_name.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {getCronJitterConfig as DPH,xPt as ML_} from "../telemetry/2686_getCronJitterConfig.ts";
import {Xvn as vD6,G5 as kp} from "../../vendor/m2684.ts";
import {b as L} from "../../runtime.ts";
// FIXME: unverified name: gg_
/* Restored Claude Code 2.1.177 module: Recovered background task notices..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function gg_(H: any, _: any): any {
  try {
    let q = getAsyncLaunchToolUseId(H);
    RecoveredBackgroundTaskSummary(q), RecoveredBackgroundTaskNotice(q, _);
  } catch (q) {
    EH(q);
  }
}
function getAsyncLaunchToolUseId(H: any): any {
  let _ = [],
    q = new Map(),
    K = new Set(),
    O = new Map(),
    T = new Set();
  for (let z of H) if (z.type === "assistant") {
    let $ = z.message.content;
    if (!Array.isArray($)) continue;
    let Y = Date.parse(z.timestamp);
    for (let A of $) {
      if (A.type !== "tool_use") continue;
      let w = RecoveredBackgroundTaskBanner(A.input) ? A.input : {};
      if (A.name === pW) _.push({
        toolUseId: A.id,
        input: w,
        createdAt: Y
      });else if (A.name === Rx) {
        if (typeof w.id === "string") K.add(w.id);
      }
    }
  } else if (z.type === "user") {
    getRecoveredBackgroundTaskName(isRecoveredBackgroundTaskMessage(z.message.content), T);
    let $ = z.message.content;
    if (!Array.isArray($)) continue;
    let Y = z.toolUseResult;
    if (!RecoveredBackgroundTaskBanner(Y)) continue;
    for (let A of $) if (A.type === "tool_result" && !A.is_error) q.set(A.tool_use_id, Y);
    if (Y.status === "async_launched" && typeof Y.agentId === "string" && typeof Y.description === "string") O.set(Y.agentId, {
      agentId: Y.agentId,
      description: Y.description,
      outputFile: typeof Y.outputFile === "string" ? Y.outputFile : void 0
    });
  } else if (z.type === "attachment" && z.attachment.type === "queued_command" && typeof z.attachment.prompt === "string") getRecoveredBackgroundTaskName(z.attachment.prompt, T);
  return {
    calls: _,
    results: q,
    deletedCronIds: K,
    asyncAgents: O,
    notifiedTaskIds: T
  };
}
function getRecoveredBackgroundTaskName(H: any, _: any): any {
  if (!H.includes(vRT)) return;
  for (let q of H.matchAll(yRT)) if (q[1]) _.add(q[1]);
}
function isRecoveredBackgroundTaskMessage(H: any): any {
  if (typeof H === "string") return H;
  return H.map((_: any): any => RecoveredBackgroundTaskBanner(_) && typeof _.text === "string" ? _.text : "").join(`
`);
}
function RecoveredBackgroundTaskNotice({
  asyncAgents: H,
  notifiedTaskIds: _
}: any, q: any): any {
  let K = 0;
  for (let O of H.values()) {
    if (_.has(O.agentId) || q.get(O.agentId)) continue;
    K++;
    let T = O.outputFile ? `
<${$N}>${LO(O.outputFile)}</${$N}>` : "";
    AT({
      value: `<${g3}>
<${Uw}>${LO(O.agentId)}</${Uw}>${T}
<${ww}>failed</${ww}>
<${Cz}>Background agent "${LO(O.description)}" was running when the previous Claude Code process exited and did not complete. Its in-process state was lost. Check its worktree/output for partial work before assuming the task landed.</${Cz}>
</${g3}>`,
      agentId: d7(),
      mode: "task-notification",
      priority: "next"
    });
  }
  if (K > 0) n_("task_local_agent", "orphaned_on_resume"), N(`resume: ${K} background agent(s) orphaned by previous process exit`);
}
function RecoveredBackgroundTaskSummary({
  calls: H,
  results: _,
  deletedCronIds: q
}: any): any {
  if (!LC()) return;
  let K = Date.now(),
    O = DPH(),
    T = new Set(vR().map(($: any): any => $.id)),
    z = 0;
  for (let $ of H) {
    let Y = _.get($.toolUseId);
    if (!Y || typeof Y.id !== "string") continue;
    if (Y.durable === !0) continue;
    if (q.has(Y.id) || T.has(Y.id)) continue;
    let A = $.input.cron,
      w = $.input.prompt;
    if (typeof A !== "string" || typeof w !== "string") continue;
    let f = Y.recurring !== !1;
    if (f) {
      if (O.recurringMaxAgeMs !== 0 && K - $.createdAt >= O.recurringMaxAgeMs) continue;
    } else {
      let j = vD6(A, $.createdAt, Y.id, O);
      if (j === null || j < K) continue;
    }
    hkH({
      id: Y.id,
      cron: A,
      prompt: w,
      createdAt: $.createdAt,
      recurring: f
    }), z++;
  }
  if (z > 0) va(!0), N(`resume: resurrected ${z} session cron task(s)`);
}
function RecoveredBackgroundTaskBanner(H: any): any {
  return typeof H === "object" && H !== null;
}
var yRT, vRT;
var jRq = L((): any => {
  w_();
  UO();
  M6();
  cg();
  ML_();
  kp();
  FH();
  S6();
  S$();
  ML();
  yRT = new RegExp(`<${Uw}>([^<]+)</${Uw}>`, "g"), vRT = `<${g3}>`;
});

export {gg_ as XGt,getAsyncLaunchToolUseId as MUm,getRecoveredBackgroundTaskName as QQl,isRecoveredBackgroundTaskMessage as NUm,RecoveredBackgroundTaskNotice as BUm,RecoveredBackgroundTaskSummary as FUm,RecoveredBackgroundTaskBanner as vMo,yRT as OUm,vRT as LUm,jRq as wMo};
