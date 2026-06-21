// @ts-nocheck
import {yZ as uZ,Ms as Ds,Pp as tm} from "./2273_loggedTmuxCcDisable.ts";
import {vUr as IFr,XS as zS} from "./2341_XS.ts";
import {tP as eP,r5 as F8} from "../telemetry/2034_CLAUDE_AX_SCREEN_READER.ts";
import {st as rt} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "./0047_namespace.ts";
// @ts-nocheck
// Marlin porch(全屏 DECSTBM)特性检测:判断终端是否支持并启用滚动区域模式

declare const uZ: () => boolean;
declare const Ds: () => boolean;
declare const tm: any;
declare const IFr: () => boolean;
declare const zS: any;
declare const eP: () => boolean;
declare const F8: any;
declare const rt: (val: any) => boolean;
declare const getFeatureValue_CACHED_MAY_BE_STALE: (flag: string, defaultVal: any) => any;
declare const Yn: any;
declare const b: (fn: () => void) => any;
declare const an: any;

/** 判断是否启用 marlin porch(DECSTBM 滚动区域)模式 */
function isMarlinPorchEnabled(): boolean {
  if (cachedMarlinPorch !== void 0) return cachedMarlinPorch;
  if (!process.stdout.isTTY) return cachedMarlinPorch = !1;
  if (uZ()) return cachedMarlinPorch = !1;
  if (!IFr()) return cachedMarlinPorch = !1;
  if (Ds()) return cachedMarlinPorch = !1;
  if (eP()) return cachedMarlinPorch = !1;
  if (rt(process.env.CLAUDE_CODE_DECSTBM)) return cachedMarlinPorch = !0;
  return cachedMarlinPorch = getFeatureValue_CACHED_MAY_BE_STALE("tengu_marlin_porch", !1), cachedMarlinPorch;
}
var cachedMarlinPorch: boolean | undefined;
var $It = b(() => {
  zS();
  Yn();
  an();
  tm();
  F8();
});
export {isMarlinPorchEnabled as awe,cachedMarlinPorch as yie,$It as l0t};
