// @ts-nocheck
import {ft as __export,b as L,x} from "../../runtime.ts";
import {onGrowthBookRefresh,jn as t6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {et as ZH} from "../../vendor/m2261.ts";
// @ts-nocheck
// Remote Control 常量与 GrowthBook 刷新 hook 模块 — 导出 Remote Control
// 相关的固定字符串常量,并提供一个 React hook 用于订阅 GrowthBook feature flag 刷新事件。

// 跨模块依赖(混淆名保持,编译期擦除)
declare const __export: (target: object, src: Record<string, () => unknown>) => void;
declare const L: (fn: () => void) => () => void;
declare const x: <T>(module: T, version: number) => T; // 兼容性导入包装
declare const onGrowthBookRefresh: (callback: () => void) => () => void; // 订阅 GrowthBook 刷新
declare const t6: any;
declare const ZH: () => any; // React 模块

/** 模块命名空间导出 */
var GRK: Record<string, unknown> = {};
__export(GRK, {
  REMOTE_CONTROL_DISCONNECTED_MSG: () => REMOTE_CONTROL_DISCONNECTED_MSG,
  BRIDGE_SESSION_ENDED_DETAIL: () => BRIDGE_SESSION_ENDED_DETAIL,
  BRIDGE_LOGIN_INSTRUCTION: () => BmH,
  BRIDGE_LOGIN_HINT: () => BRIDGE_LOGIN_HINT,
  BRIDGE_LOGIN_ERROR: () => BRIDGE_LOGIN_ERROR
});

/** Remote Control 登录说明文本 */
var BmH = "Remote Control is only available with claude.ai subscriptions. Please use `/login` to sign in with your claude.ai account.";

/** Remote Control 登录错误提示(完整错误格式) */
var BRIDGE_LOGIN_ERROR = "Error: You must be logged in to use Remote Control.\n\nRemote Control is only available with claude.ai subscriptions. Please use `/login` to sign in with your claude.ai account.";

/** Remote Control 断开连接提示 */
var REMOTE_CONTROL_DISCONNECTED_MSG = "Remote Control disconnected.";

/** Remote Control 登录提示命令 */
var BRIDGE_LOGIN_HINT = "/login";

/** Remote Control 会话结束详情 */
var BRIDGE_SESSION_ENDED_DETAIL = "session ended";

/**
 * React hook — 订阅 GrowthBook feature flag 刷新,每次刷新触发组件重渲染
 * @returns 当前刷新计数(递增)
 */
function useGrowthBookRefreshCount(): number {
  let [refreshCount, incrementCount] = KS6.useReducer((count: number) => count + 1, 0);
  return KS6.useEffect(() => onGrowthBookRefresh(incrementCount), []), refreshCount;
}

/** React 模块引用 */
var KS6: any;

/** 模块初始化 */
var qb_ = L(() => {
  t6();
  KS6 = x(ZH(), 1);
});
export {GRK as n3a,BmH as BRIDGE_LOGIN_INSTRUCTION,BRIDGE_LOGIN_ERROR,REMOTE_CONTROL_DISCONNECTED_MSG,BRIDGE_LOGIN_HINT,BRIDGE_SESSION_ENDED_DETAIL,useGrowthBookRefreshCount as P6e,KS6 as Y9n,qb_ as J9n};
