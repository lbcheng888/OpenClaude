// @ts-nocheck
import {pmt as $5_,T5n as gu6} from "../telemetry/4302_T5n.ts";
import {oTl as h14,rTl as L14} from "../tui/4652_call.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
// Design Login 工具定义：暴露一个 local-jsx 类型的工具，用于授权 design-sync 对 claude.ai 账号的访问权限（/design-sync 命令前置登录步骤）。

// 跨模块依赖(混淆名保持,编译期擦除)
declare const $5_: () => boolean;
declare const gu6: any;
declare const h14: any;
declare const L14: any;
declare const L: (fn: () => void) => any;

/** 返回 design-login 工具描述对象（local-jsx 类型） */
var designLoginToolFactory = (): any => ({
  type: "local-jsx",
  name: "design-login",
  description: "Authorize design-system access for /design-sync with your claude.ai account",
  isEnabled: (): boolean => $5_(),
  load: (): Promise<any> => Promise.resolve().then(() => (h14(), L14))
});
var moduleInit = L((): void => {
  gu6();
});
export {designLoginToolFactory as sTl,moduleInit as iTl};
