// @ts-nocheck
import {Zle as qle,enforcementWarnDedup as Bv} from "../tui/3835_mode.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {b} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
// @ts-nocheck
// 输入关闭状态判断:检测当前是否应显示"输入已关闭"或"等待后台任务"提示

declare const qle: (task: any) => boolean;
declare const Bv: (task: any) => boolean;
declare const Ge: any;
declare const b: (fn: () => void) => any;
declare const Or: any;

/** 判断是否有已关闭输入且仍在运行的任务(需显示输入关闭状态) */
function shouldShowInputClosed({
  inputClosed,
  runningTasks
}: {
  inputClosed: boolean;
  runningTasks: any[];
}): boolean {
  return inputClosed && runningTasks.some(task => qle(task) && Bv(task));
}

/** 判断是否正在运行中(输入未关闭且状态为 running,且不处于后台任务汇报模式) */
function shouldShowRunningSpinner({
  inputClosed,
  currentState,
  hasRunningBgTasks
}: {
  inputClosed: boolean;
  currentState: string;
  hasRunningBgTasks: boolean;
}): boolean {
  if (hasRunningBgTasks && Ge.CLAUDE_CODE_BG_TASKS_REPORT_RUNNING) return !1;
  return !inputClosed && currentState === "running";
}
var Zsc = b(() => {
  Or();
});
export {shouldShowInputClosed as ylc,shouldShowRunningSpinner as Tlc,Zsc as Slc};
