// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Lr as Or} from "../../vendor/m578.ts";
// @ts-nocheck
// 解析 Powerup 发现功能的 A/B 分组（banner/step/off），并导出文案常量

declare const pt: any;
declare const b: any;
declare const Ge: any;
declare const getFeatureValue_CACHED_MAY_BE_STALE: any;
declare const Yn: any;
declare const Or: any;
var moduleExports = {};
pt(moduleExports, {
  resolvePowerupDiscoveryArm: () => resolvePowerupDiscoveryArm,
  POWERUP_DISCOVERY_COPY: () => POWERUP_DISCOVERY_COPY
});

/** 解析当前用户所在的 Powerup 发现 A/B 分组：优先读环境变量，再读 GrowthBook 特性值 */
function resolvePowerupDiscoveryArm(): "banner" | "step" | "off" | string {
  let envOverride = Ge.CLAUDE_CODE_POWERUP_ONBOARDING;
  if (envOverride === "banner" || envOverride === "step") return envOverride;
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_birch_lantern", "off");
}

/** Powerup 发现各展示位置的文案 */
var POWERUP_DISCOVERY_COPY: {
  heading: string;
  body: string;
  banner: string;
};
var initModule = b(() => {
  Yn();
  Or();
  POWERUP_DISCOVERY_COPY = {
    heading: "Learn the moves",
    body: "Quick lessons on the things power users do — plan mode, undo, " + "subagents, memory. About 5 minutes. Come back any time with /powerup.",
    banner: "New here? Type /powerup for a 5-minute tour — modes, undo, " + "@-mentions, and how to teach Claude your rules."
  };
});
export {moduleExports as myl,resolvePowerupDiscoveryArm,POWERUP_DISCOVERY_COPY,initModule as uGn};
