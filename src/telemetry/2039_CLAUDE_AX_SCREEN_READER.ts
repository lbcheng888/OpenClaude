// @ts-nocheck
import {ali as nti,OBr as _Lr} from "../../vendor/m2037.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {getInitialSettings,br as Er} from "../config/0745_updateSettingsForSource.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
// @ts-nocheck
// 无障碍屏幕阅读器开关：从 CLI 参数 / 环境变量 / 配置文件三路合并，支持特性门控覆盖

declare const nti: any;
declare const _Lr: any;
declare const Ge: any;
declare const getInitialSettings: any;
declare const Er: any;
declare const b: any;
declare const Or: any;

/** 替换当前特性门控检查回调，返回旧回调（用于测试注入） */
function setFeatureGateChecker(newChecker: ((flagName: string, defaultVal: boolean) => boolean) | null): ((flagName: string, defaultVal: boolean) => boolean) | null {
  let prev = featureGateChecker;
  return featureGateChecker = newChecker, prev;
}

/** 屏幕阅读器开关单例：惰性解析并缓存 isEnabled 结果 */
class ScreenReaderToggle {
  #cachedEnabled: boolean | undefined;

  /** 综合 CLI 参数、环境变量、settings 文件及特性门控判断是否启用屏幕阅读器模式 */
  isEnabled(): boolean {
    if (this.#cachedEnabled !== void 0) return this.#cachedEnabled;
    let enabled: boolean;
    if (nti("--ax-screen-reader")) enabled = !0;else {
      let envVal = Ge.CLAUDE_AX_SCREEN_READER;
      enabled = envVal !== void 0 ? envVal : getInitialSettings().axScreenReader === !0;
    }
    if (!enabled) return this.#cachedEnabled = !1;
    return this.#cachedEnabled = featureGateChecker?.(TELEMETRY_EVENT_AX_SCREEN_READER, !0) ?? !0;
  }

  /** 清除缓存，下次调用重新解析 */
  reset() {
    this.#cachedEnabled = void 0;
  }
}

/** 返回屏幕阅读器是否已启用 */
function isAxScreenReaderEnabled(): boolean {
  return screenReaderToggle.isEnabled();
}

/** 若屏幕阅读器已启用，返回含 CLAUDE_AX_SCREEN_READER=1 的环境变量对象，否则返回空对象 */
function getAxScreenReaderEnv(): Record<string, string> {
  if (screenReaderToggle.isEnabled()) return {
    CLAUDE_AX_SCREEN_READER: "1"
  };
  return {};
}
var TELEMETRY_EVENT_AX_SCREEN_READER = "tengu_ax_screen_reader",
  featureGateChecker: ((flagName: string, defaultVal: boolean) => boolean) | null = null,
  screenReaderToggle: ScreenReaderToggle;
var initModule = b(() => {
  _Lr();
  Or();
  Er();
  screenReaderToggle = new ScreenReaderToggle();
});
export {setFeatureGateChecker as lli,ScreenReaderToggle as cli,isAxScreenReaderEnabled as fD,getAxScreenReaderEnv as NRe,TELEMETRY_EVENT_AX_SCREEN_READER as otd,featureGateChecker as LBr,screenReaderToggle as uli,initModule as y8};
