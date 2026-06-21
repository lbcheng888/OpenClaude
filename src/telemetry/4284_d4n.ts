// @ts-nocheck
import {isPolicyAllowed as Y7,rd as i5} from "../../vendor/m2205.ts";
import {ra as KK,Ap as ZO} from "../config/0614_Ap.ts";
import {isFirstPartyProvider as i1,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
/**
 * isDesignSyncEnabled — eligibility check for the DesignSync feature.
 *
 * Returns true when all of the following hold:
 *   1. The org policy allows "allow_design_sync".
 *   2. Nonessential network traffic is NOT disabled (i.e. not in essential-traffic-only mode).
 *   3. Either the first-party provider is in use, OR the GrowthBook feature flag
 *      "tengu_slate_quill" is enabled.
 *
 * Used by DesignSyncTool.isEnabled and the design-sync skill registration.
 */
function isDesignSyncEnabled(): boolean {
  // Org policy gate: design-sync may be disabled by HIPAA compliance taints.
  if (!Y7("allow_design_sync")) return !1;
  // Essential-traffic-only mode disables non-essential features.
  if (KK()) return !1;
  // First-party Anthropic provider always qualifies.
  if (i1()) return !0;
  // Third-party provider: fall back to the "tengu_slate_quill" feature flag.
  return Y_("tengu_slate_quill", !1);
}

/**
 * Module init thunk for the DesignSync eligibility module.
 * Ensures its transitive dependencies are initialised before first use.
 *
 * Dependencies (lazy init thunks, cross-module — kept AS-IS):
 *   o6  — GrowthBook / periodic-refresh module
 *   i5  — (FIXME: unverified name) unknown lazy module
 *   V7  — first-party provider / model-ids module
 *   ZO  — nonessential-traffic / telemetry-mode module
 */
var oKq = L(() => {
  o6();
  i5();
  V7();
  ZO();
});

export {isDesignSyncEnabled as pdt,oKq as d4n};
