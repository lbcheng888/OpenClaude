// @ts-nocheck
import {je as dH} from "../../vendor/m577.ts";
import {b as L} from "../../runtime.ts";
import {Lr as l8} from "../../vendor/m578.ts";
// @ts-nocheck
// 用户对话超时配置：读取环境变量 CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS，默认 5 分钟

// 跨模块依赖（混淆名保持，编译期擦除）
declare const dH: any;
declare const L: (fn: () => void) => () => void;
declare const l8: any;

/** 获取用户对话超时时长（毫秒），可由环境变量覆盖 */
function getUserDialogTimeoutMs(): number {
  return dH.CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS ?? DEFAULT_USER_DIALOG_TIMEOUT_MS
}

/** 默认用户对话超时：5 分钟（300000 ms） */
var DEFAULT_USER_DIALOG_TIMEOUT_MS = 300000

var LLK = L(() => { l8() })

export {getUserDialogTimeoutMs as sOa,DEFAULT_USER_DIALOG_TIMEOUT_MS as kyp,LLK as iOa};
