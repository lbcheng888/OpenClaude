// @ts-nocheck
import {getIsNonInteractiveSession,lt as ct} from "./0131_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {st as rt} from "../../vendor/m5.ts";
import {bc as Sc,Ug as jg} from "../../vendor/m2264.ts";
import {b} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {sn as an} from "../config/0047_namespace.ts";
// @ts-nocheck
// 会话压缩特性开关:判断是否启用琥珀/自动/远端响应式 compact,以及检查消息是否属于可压缩来源类型

declare const getIsNonInteractiveSession: () => boolean;
declare const ct: any;
declare const getFeatureValue_CACHED_MAY_BE_STALE: (flag: string, defaultVal: any) => any;
declare const Yn: any;
declare const Ge: any;
declare const rt: (val: any) => boolean;
declare const Sc: (key: string, defaultVal: any) => {
  value: any;
};
declare const jg: any;
declare const b: (fn: () => void) => any;
declare const Or: any;
declare const an: any;

/** 是否启用 amber-redwood3 特性(仅交互式会话) */
function isAmberRedwoodEnabled(): boolean {
  if (getIsNonInteractiveSession()) return !1;
  return !!getFeatureValue_CACHED_MAY_BE_STALE("tengu_amber_redwood3", "");
}

/** 是否启用自动 compact */
function isAutoCompactEnabled(): boolean {
  if (Ge.DISABLE_COMPACT) return !1;
  if (rt(process.env.DISABLE_AUTO_COMPACT)) return !1;
  return Sc("autoCompactEnabled", !0).value;
}

/** 是否满足远端响应式 compact 前提条件 */
function isRemoteReactiveCompactAllowed(): boolean {
  if (rt(process.env.CLAUDE_CODE_REMOTE)) {
    if (remoteReactiveCompactFeatureFlag ??= getFeatureValue_CACHED_MAY_BE_STALE("tengu_reactive_compact_remote", !1), !remoteReactiveCompactFeatureFlag) return !1;
  }
  return !0;
}

/** 判断消息来源类型是否属于可压缩摘要集合 */
function isCompactibleOriginKind(originKind: string | undefined): boolean {
  return originKind !== void 0 && compactibleOriginKinds.has(originKind);
}
var remoteReactiveCompactFeatureFlag: boolean | undefined;
var compactibleOriginKinds: Set<string>;
var eBi = b(() => {
  ct();
  Or();
  an();
  jg();
  Yn();
  compactibleOriginKinds = new Set(["prompt_suggestion", "away_summary", "agent_summary"]);
});
export {isAmberRedwoodEnabled as mq,isAutoCompactEnabled as Yw,isRemoteReactiveCompactAllowed as vz,isCompactibleOriginKind as GRe,remoteReactiveCompactFeatureFlag as sFi,compactibleOriginKinds as xwd,eBi as iFi};
