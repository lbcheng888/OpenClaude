// @ts-nocheck
import {nt as T_} from "../../vendor/m127.ts";
import {getIsInteractive,getIsRemoteMode,lt as A_} from "../session/0132_sent.ts";
import {b as L} from "../../runtime.ts";
import {dn as apiMetricsId} from "./0137_namespace.ts";
// @ts-nocheck
// 协调器模式检测：判断当前进程是否运行在 coordinator 模式，并初始化依赖。

// 跨模块依赖(混淆名保持,编译期擦除)
declare const T_: (val: string | undefined) => boolean;
declare const getIsInteractive: () => boolean;
declare const getIsRemoteMode: () => boolean;
declare const A_: () => void;
declare const L: (fn: () => void) => any;
declare const apiMetricsId: () => void;

/** 检查当前进程是否运行在 coordinator 模式下 */
function isCoordinatorMode(): boolean {
  if (!T_(process.env.CLAUDE_CODE_COORDINATOR_MODE)) return !1;
  if (getIsInteractive() && !getIsRemoteMode() && !T_(process.env.CLAUDE_CODE_REMOTE)) return !1;
  return !0;
}

/** 协调器模式初始化懒加载入口 */
var Or = L(() => {
  A_();
  apiMetricsId();
});
export {isCoordinatorMode as yw,Or as jz};
