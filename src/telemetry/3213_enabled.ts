// @ts-nocheck
import {getDynamicConfig_CACHED_MAY_BE_STALE as Uh,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getSubscriptionType as YK,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "../config/0047_namespace.ts";
// Computer-use (malort_pedway) feature-flag config reader.
//
// "tengu_malort_pedway" is the GrowthBook feature flag that gates and
// configures the macOS computer-use MCP subsystem.  This module owns the
// default config object, merges it with the live flag payload, and exposes
// helpers consumed by the session bootstrap and the MCP executor.

// --- Cross-module references (resolved at bundle runtime, kept as-is) ---
// YK()  : getSubscriptionType() — returns the user's plan string or null.
// Uh()  : GrowthBook feature-flag getter.
// o6    : lazy-init thunk for the GrowthBook / API module.
// Mq    : lazy-init thunk for the config / OAuth module.
// A6    : lazy-init thunk for the config-namespace module.
// L     : wraps a lazy module-initialization thunk.

/** Full shape of the computer-use (malort_pedway) feature-flag config. */
interface ComputerUseConfig {
  /** Whether the computer-use MCP is active for this session. */
  enabled: boolean;
  /** Validate pixel coordinates before dispatching input events. */
  pixelValidation: boolean;
  /** Allow multi-line pastes via the clipboard rather than key-by-key typing. */
  clipboardPasteMultiline: boolean;
  /** Animate the mouse cursor during moves. */
  mouseAnimation: boolean;
  /** Hide the Claude window before performing an action. */
  hideBeforeAction: boolean;
  /** Automatically target the correct display for each action. */
  autoTargetDisplay: boolean;
  /** Guard the clipboard by restoring its previous contents after a paste. */
  clipboardGuard: boolean;
  /** Coordinate system in use: "pixels" (default) or a logical unit. */
  coordinateMode: string;
}

/** Options subset returned by {@link getComputerUseOptions} — excludes `enabled` and `coordinateMode`. */
type ComputerUseOptions = Omit<ComputerUseConfig, "enabled" | "coordinateMode">;

/**
 * Merges the hard-coded default config with the live GrowthBook flag payload
 * for "tengu_malort_pedway" and returns the resolved {@link ComputerUseConfig}.
 */
function getMalortPedwayConfig(): ComputerUseConfig {
  return {
    ...defaultComputerUseConfig,
    ...Uh("tengu_malort_pedway", defaultComputerUseConfig)
  };
}

/**
 * Returns true when the current user's subscription is "max" or "pro".
 * Used as a prerequisite gate before checking the feature flag.
 */
function isMaxOrProSubscriber(): boolean {
  let subscriptionType = YK();
  return subscriptionType === "max" || subscriptionType === "pro";
}

/**
 * Returns true when the computer-use MCP feature should be active:
 * the subscriber must be on a max or pro plan **and** the GrowthBook flag
 * must have `enabled: true`.
 */
function isComputerUseEnabled(): boolean {
  return isMaxOrProSubscriber() && getMalortPedwayConfig().enabled;
}

/**
 * Returns the computer-use option flags, stripping out `enabled` and
 * `coordinateMode` (which are handled separately by callers).
 */
function getComputerUseOptions(): ComputerUseOptions {
  let {
    enabled: _enabled,
    coordinateMode: _coordinateMode,
    ...options
  } = getMalortPedwayConfig();
  return options;
}

/**
 * Returns the coordinate mode string from the feature-flag config, caching
 * the value in {@link cachedCoordinateMode} so the flag is only read once per
 * process lifetime.
 */
function getCachedCoordinateMode(): string {
  return cachedCoordinateMode ??= getMalortPedwayConfig().coordinateMode, cachedCoordinateMode;
}

/** Module-level defaults for the computer-use config (flag off, safe defaults). */
var defaultComputerUseConfig: ComputerUseConfig,
  /** Lazily populated cache for the coordinate mode value. */
  cachedCoordinateMode: string | undefined;

/** Lazy module initializer: runs dependency init thunks and freezes the default config. */
var Y6_ = L(() => {
  o6();
  Mq();
  A6();
  defaultComputerUseConfig = {
    enabled: !1,
    pixelValidation: !1,
    clipboardPasteMultiline: !0,
    mouseAnimation: !0,
    hideBeforeAction: !0,
    autoTargetDisplay: !0,
    clipboardGuard: !0,
    coordinateMode: "pixels"
  };
});

export {getMalortPedwayConfig as szr,isMaxOrProSubscriber as eqd,isComputerUseEnabled as ZHn,getComputerUseOptions as eIn,getCachedCoordinateMode as cot,defaultComputerUseConfig as jna,cachedCoordinateMode as Wna,Y6_ as uot};
