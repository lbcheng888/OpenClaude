// @ts-nocheck
import {dOt as qPt,ch as uh} from "../../vendor/m2727.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
// 工具调用回退扫描:中止进行中的工具并上报 fallback_sweep 遥测事件

declare const qPt: () => any;
declare const uh: any;
declare const logEvent: (name: string, props: Record<string, any>) => void;
declare const Ct: any;
declare const fromEnum: (val: any) => any;
declare const b: (fn: () => void) => any;

/** 丢弃并中止正在进行的工具调用,返回 remove 操作或 undefined */
function buildFallbackSweepRemoveOp(toolStateStore: any, lane: any): {
  type: string;
  op: {
    action: string;
    ids: string[];
  };
  reason: string;
} | undefined {
  let discardResult = toolStateStore.discardAndAbortInFlight(qPt());
  if (logEvent("tengu_fallback_sweep_tools", {
    lane: fromEnum(lane),
    aborted: discardResult.aborted,
    completed_before_event: discardResult.completedBeforeEvent,
    queued_never_started: discardResult.queuedNeverStarted,
    compensated_removes: discardResult.toolUseIds.length
  }), discardResult.toolUseIds.length === 0) return;
  return {
    type: "set_in_progress_tool_use_ids",
    op: {
      action: "remove",
      ids: discardResult.toolUseIds
    },
    reason: "fallback_sweep"
  };
}
var zJa = b(() => {
  uh();
  Ct();
});
export {buildFallbackSweepRemoveOp as b4t,zJa as yQa};
