// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {BBr as B$6,GO as yN} from "./2241_GO.ts";
import {getInitialSettings as n8,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {b as L} from "../../runtime.ts";
// Cross-module references — kept minified to preserve linkage.
declare function Y_(flag: string, defaultValue: null): Record<string, unknown> | null | undefined;
declare function B$6(): boolean;
declare function n8(): { autoDreamEnabled?: boolean };
declare function yN(): void;
declare function N8(): void;
declare function o6(): void;
declare function L(init: () => void): () => void;

/** Feature-flag config object shape for the `tengu_onyx_plover` gate. */
interface OnyxPloverConfig {
  enabled?: boolean;
  available?: boolean;
  [key: string]: unknown;
}

/**
 * Returns the raw `tengu_onyx_plover` feature-flag config object,
 * or null/undefined when the gate is absent.
 */
function getOnyxPloverConfig(): OnyxPloverConfig | null | undefined {
  return Y_("tengu_onyx_plover", null) as OnyxPloverConfig | null | undefined;
}

/**
 * Returns true when the auto-dream feature is available or enabled via
 * the `tengu_onyx_plover` gate, or when the B$6 fallback check passes.
 */
function isAutoDreamAvailable(): boolean {
  let config = getOnyxPloverConfig();
  if (config?.enabled === !0 || config?.available === !0) return !0;
  return B$6();
}

/**
 * Returns true when auto-dream is enabled for the current session.
 * Checks availability first, then the per-session `autoDreamEnabled`
 * override from settings, then the feature gate `enabled` flag, and
 * finally the B$6 fallback.
 */
function lx_(): boolean {
  if (!isAutoDreamAvailable()) return !1;
  let autoDreamEnabled = n8().autoDreamEnabled;
  if (autoDreamEnabled !== void 0) return autoDreamEnabled;
  if (getOnyxPloverConfig()?.enabled === !0) return !0;
  return B$6();
}

var m5q = L(() => {
  yN();
  N8();
  o6();
});

export {getOnyxPloverConfig as xQa,isAutoDreamAvailable as Kqn,lx_ as v4t,m5q as nho};
