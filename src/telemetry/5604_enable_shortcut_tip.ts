// @ts-nocheck
import {getDynamicConfig_CACHED_MAY_BE_STALE as Dk,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
/**
 * Shape of the desktop-upsell tip feature-flag config.
 * Each flag gates whether a particular onboarding/upsell hint is shown.
 */
interface DesktopUpsellTips {
  /** Whether the keyboard-shortcut tip is enabled. */
  enable_shortcut_tip: boolean;
  /** Whether the contextual (in-context) tip is enabled. */
  enable_contextual_tip: boolean;
}

/**
 * Reads the resolved "tengu_desktop_upsell" gate/config, using
 * `desktopUpsellTipsDefaults` as the default value.
 */
function getDesktopUpsellTips(): DesktopUpsellTips {
  return Dk("tengu_desktop_upsell", desktopUpsellTipsDefaults);
}

/** Default values for the desktop-upsell tip flags (both disabled). */
var desktopUpsellTipsDefaults: DesktopUpsellTips;

/** Lazy module initializer: sets up the default desktop-upsell tip config. */
var initDesktopUpsellTips = b(() => {
  jn();
  desktopUpsellTipsDefaults = {
    enable_shortcut_tip: !1,
    enable_contextual_tip: !1
  };
});

export {getDesktopUpsellTips as a2o,desktopUpsellTipsDefaults as oGm,initDesktopUpsellTips as Ulc};
