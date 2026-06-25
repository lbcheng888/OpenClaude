// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
// CCR 增量重水化特性开关:读取 GrowthBook flag 判断是否启用 delta rehydrate

declare const getFeatureValue_CACHED_MAY_BE_STALE: (flag: string, defaultVal: any) => any;
declare const Yn: any;
declare const b: (fn: () => void) => any;

/** 是否启用 CCR delta rehydrate 特性 */
function isCcrDeltaRehydrateEnabled(): boolean {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_ccr_delta_rehydrate", !1);
}
var YMo = b(() => {
  Yn();
});
export {isCcrDeltaRehydrateEnabled as Prr,YMo as Y$o};
