// @ts-nocheck
import {b} from "../../runtime.ts";
import {qe as je} from "./0234_setHasFormattedOutput.ts";
// @ts-nocheck
// 环境常量与云环境类型检测:定义 ExitPlanMode 常量并识别 BYOC/anthropic_cloud 部署环境

declare const b: (fn: () => void) => any;
declare const je: any;
var EXIT_PLAN_MODE_KEY: string = "ExitPlanMode";
var EXIT_PLAN_MODE_LABEL: string = "ExitPlanMode";

/** 读取当前部署环境类型,仅返回 byoc 或 anthropic_cloud,否则返回 null */
function getCloudEnvironmentKind(): "byoc" | "anthropic_cloud" | null {
  let envKind = process.env.CLAUDE_CODE_ENVIRONMENT_KIND;
  if (envKind === "byoc" || envKind === "anthropic_cloud") return envKind;
  return null;
}
var eBr = b(() => {
  je();
});
export {EXIT_PLAN_MODE_KEY as Tk,EXIT_PLAN_MODE_LABEL as VO,getCloudEnvironmentKind as Lyn,eBr as zBr};
