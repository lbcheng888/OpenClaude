// @ts-nocheck
import {BO as NN,jR as LW} from "../config/2028_allowed.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/**
 * Feature-flag helpers for API cache breakpoint experiments.
 *
 * `e1_` gates the "basalt_spur" behaviour (skip cache write in memory
 * extraction / determine cache breakpoint positions).
 * `BdK` gates the companion "basalt_scarp" sub-behaviour that adjusts
 * which breakpoint index is inserted when spur is active.
 *
 * Both require `NN()` (first-party / experimental-betas build) to be true
 * before the underlying feature flag is consulted.
 *
 * Telemetry event context: `tengu_basalt_spur`, `tengu_basalt_scarp`.
 */

/**
 * Returns `true` when the `tengu_basalt_spur` feature flag is enabled on a
 * first-party / experimental build.  Controls `skipCacheWrite` in memory
 * extraction and cache-breakpoint position logic.
 */
function e1_(): boolean {
  return NN() && Y_("tengu_basalt_spur", !1);
}

/**
 * Returns `true` when the `tengu_basalt_scarp` feature flag is enabled on a
 * first-party / experimental build.  Adjusts the secondary cache-breakpoint
 * index inserted by the `tengu_basalt_spur` path.
 */
function BdK(): boolean {
  return NN() && Y_("tengu_basalt_scarp", !1);
}

/** Lazy module initialiser — depends on config (LW) and the o6 registry. */
var wu6 = L(() => {
  LW();
  o6();
});

export {e1_ as tpt,BdK as HQa,wu6 as Xqn};
