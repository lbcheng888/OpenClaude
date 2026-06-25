// @ts-nocheck
import {Ne as Ge} from "../../vendor/m583.ts";
import {fD as eP,y8 as F8} from "../telemetry/2039_CLAUDE_AX_SCREEN_READER.ts";
import {Vve,BPt as $It} from "./2430_BPt.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {dn as an} from "./0137_namespace.ts";
// @ts-nocheck
// 无障碍/原生光标检测:判断是否启用屏幕阅读器或原生终端光标模式

declare const Ge: any;
declare const eP: () => boolean;
declare const F8: any;
declare const Vve: () => boolean;
declare const $It: any;
declare const rt: (val: any) => boolean;
declare const getFeatureValue_CACHED_MAY_BE_STALE: (flag: string, defaultVal: any) => any;
declare const Yn: any;
declare const b: (fn: () => void) => any;
declare const Or: any;
declare const an: any;

/** 判断是否应使用无障碍模式(屏幕阅读器或非 marlin+原生光标) */
function isAccessibilityModeEnabled(): boolean {
  if (cachedAccessibilityMode !== void 0) return cachedAccessibilityMode;
  if (Ge.CLAUDE_CODE_ACCESSIBILITY) return cachedAccessibilityMode = !0;
  if (eP()) return cachedAccessibilityMode = !0;
  return cachedAccessibilityMode = !Vve() && isNativeCursorEnabled();
}

/** 判断是否启用原生终端光标 */
function isNativeCursorEnabled(): boolean {
  if (Ge.CLAUDE_CODE_ACCESSIBILITY) return !0;
  if (eP()) return !0;
  if (rt(process.env.CLAUDE_CODE_NATIVE_CURSOR)) return !0;
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_native_cursor", !1);
}
var cachedAccessibilityMode: boolean | undefined;
var KFe = b(() => {
  $It();
  Yn();
  Or();
  an();
  F8();
});
export {isAccessibilityModeEnabled as PZ,isNativeCursorEnabled as Qqr,cachedAccessibilityMode as UPt,KFe as f2e};
