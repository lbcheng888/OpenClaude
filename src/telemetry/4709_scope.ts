// @ts-nocheck
import {$m as Zz,l9 as Au,sne as J_H,dS as tj} from "../config/4460_source.ts";
import {jA as J2,II as kL} from "../../vendor/m3268.ts";
import {Gpe as R3H,bk as u0} from "../agent/0731_level.ts";
import {Dht as Z3_,Pht as G3_} from "../../vendor/m4707.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {ts as $9,oh as t$} from "../../vendor/m2600.ts";
import {Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {eP as kk,BDe as NRH,rH as JZ} from "../config/4461_operation.ts";
import {loadAllPluginsCacheOnly as oO,clearPluginCache as UW,path as BA} from "../agent/4467_resolvePluginRoot.ts";
import {shouldSkipPluginAutoupdate as jXH,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {sleep as l6} from "./1488_withTimeout.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {zn as c6} from "../api/0465_getOauthConfig.ts";
import {ITe as lAH,bPe as KLH} from "../../vendor/m4694.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Ve as O_,Le as tH} from "../../vendor/m5.ts";
import {xz as Li,slowOpTracer as HZ} from "./2606_skill_name.ts";
import {b as L} from "../../runtime.ts";
// =============================================================================
// telemetry/4656_scope.ts
//
// Plugin auto-update pass — background job that refreshes marketplace metadata
// and bumps installed plugins to their latest allowed versions.
//
// Exported names (cross-module linkage preserved AS-IS):
//   q44  — registerAutoupdateCallback
//   K44  — runAutoupdatePass
//   vU6  — moduleInit (lazy initialiser)
//
// Cross-module / imported names (Zz, Au, J2, R3H, Z3_, $9, kk, oO, NRH, jXH,
// Y_, J_H, GH, c6, l6, lAH, UW, c, O_, tH, Li, N, L, o6, y_, G3_, T8, FH,
// L_, HZ, JZ, tj, KLH, t$, BA, kL, u0) are kept AS-IS to preserve linkage.
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A blocked-by-pinner result emitted when a plugin could not be updated due to pinning constraints. */
interface AutoupdateBlockedResult {
  type: "autoupdate-blocked-by-pinner";
  source: string;
  plugin: string;
  heldAt: string | undefined;
  blockedBy: string[];
  disabledPinners: string[];
}

// ---------------------------------------------------------------------------
// q44 — register the autoupdate notification callback
// ---------------------------------------------------------------------------

/**
 * Registers `callback` as the handler to be invoked after each autoupdate pass
 * with `(updatedPluginIds, blockedResults)`.  If a pass already completed
 * before a callback was registered the buffered result is delivered immediately.
 *
 * Returns a cleanup function that unregisters the callback.
 */
function q44(callback: (updated: string[], blocked: AutoupdateBlockedResult[]) => void): () => void {
  if (yU6 = callback, hp_ !== null) callback(hp_.updated, hp_.blocked), hp_ = null;
  return () => {
    yU6 = null;
  };
}

// ---------------------------------------------------------------------------
// RgO — collect marketplaces eligible for auto-refresh
// ---------------------------------------------------------------------------

/**
 * Returns the set of marketplace names (lowercased) for which auto-update is
 * enabled.  Reads the current marketplace config via `Zz()` and the per-scope
 * auto-update override map via `Au()`.
 */
async function RgO(): Promise<Set<string>> {
  let marketplaceConfig = await Zz(),
    autoUpdateOverrides = Au(),
    eligibleMarketplaces = new Set<string>();
  for (let [marketplaceName, marketplaceEntry] of Object.entries(marketplaceConfig)) {
    if (!J2(marketplaceEntry.source)) continue;
    if (R3H(marketplaceName, marketplaceEntry, autoUpdateOverrides[marketplaceName]?.autoUpdate)) eligibleMarketplaces.add(marketplaceName.toLowerCase());
  }
  return eligibleMarketplaces;
}

// ---------------------------------------------------------------------------
// LgO — update a single plugin across its install scopes
// ---------------------------------------------------------------------------

/**
 * Attempts to update `pluginId` across each of its `installations` (scope entries).
 * `disabledSources` is the set of source ids whose pinning constraints should be
 * flagged as disabled pinners.
 *
 * Returns an outcome object with fields: updated (plugin id or null),
 * blocked (pinner result or null), failed (boolean).
 */
async function LgO(pluginId: string, installations: Array<{
  scope: string;
}>, disabledSources: Set<string>): Promise<{
  updated: string | null;
  blocked: AutoupdateBlockedResult | null;
  failed: boolean;
}> {
  let wasUpdated = !1,
    hasFailed = !1,
    blockedResult: AutoupdateBlockedResult | null = null;
  for (let {
    scope: scopeName
  } of installations) try {
    let updateResult = await Z3_(pluginId, scopeName);
    if (updateResult.success && !updateResult.alreadyUpToDate && !updateResult.skipped) wasUpdated = !0, N(`Plugin autoupdate: updated ${pluginId} from ${updateResult.oldVersion} to ${updateResult.newVersion}`);else if (updateResult.skipped) {
      if (N(`Plugin autoupdate: ${pluginId} ${updateResult.message}`), updateResult.blockedBy && updateResult.blockedBy.length > 0) {
        let blockedByNames = updateResult.blockedBy.map((pinnerId: string) => $9(pinnerId).name),
          disabledPinnerNames = updateResult.blockedBy.filter((pinnerId: string) => disabledSources.has(pinnerId)).map((pinnerId: string) => $9(pinnerId).name);
        blockedResult = {
          type: "autoupdate-blocked-by-pinner",
          source: pluginId,
          plugin: $9(pluginId).name,
          heldAt: updateResult.oldVersion,
          blockedBy: blockedByNames,
          disabledPinners: disabledPinnerNames
        };
      }
    } else if (!updateResult.alreadyUpToDate) hasFailed = !0, N(`Plugin autoupdate: failed to update ${pluginId}: ${updateResult.message}`, {
      level: "warn"
    });
  } catch (err) {
    hasFailed = !0, N(`Plugin autoupdate: error updating ${pluginId}: ${GH(err)}`, {
      level: "warn"
    });
  }
  return {
    updated: wasUpdated ? pluginId : null,
    blocked: blockedResult,
    failed: hasFailed
  };
}

// ---------------------------------------------------------------------------
// EAq — run autoupdates for all plugins in the given marketplaces
// ---------------------------------------------------------------------------

/**
 * Iterates over all installed plugins and updates those belonging to a
 * marketplace present in `eligibleMarketplaces`.  Returns an object with
 * updated plugin ids, blocked results, and a count of per-plugin failures.
 */
async function EAq(eligibleMarketplaces: Set<string>): Promise<{
  updated: string[];
  blocked: AutoupdateBlockedResult[];
  updateFailedCount: number;
}> {
  let pluginConfig = kk(),
    pluginIds = Object.keys(pluginConfig.plugins);
  if (pluginIds.length === 0) return {
    updated: [],
    blocked: [],
    updateFailedCount: 0
  };
  let {
      disabled: disabledPlugins
    } = await oO(),
    disabledSources = new Set(disabledPlugins.map((entry: {
      source: string;
    }) => entry.source)),
    settledResults = await Promise.allSettled(pluginIds.map(async (pluginId: string) => {
      let {
        marketplace: marketplaceName
      } = $9(pluginId);
      if (!marketplaceName || !eligibleMarketplaces.has(marketplaceName.toLowerCase())) return null;
      let installations = pluginConfig.plugins[pluginId];
      if (!installations || installations.length === 0) return null;
      let autoUpdateInstalls = installations.filter(NRH);
      if (autoUpdateInstalls.length === 0) return null;
      return LgO(pluginId, autoUpdateInstalls, disabledSources);
    })),
    updatedIds: string[] = [],
    blockedResults: AutoupdateBlockedResult[] = [],
    failureCount = 0;
  for (let result of settledResults) {
    if (result.status !== "fulfilled" || result.value === null) continue;
    if (result.value.updated !== null) updatedIds.push(result.value.updated);
    if (result.value.blocked !== null) blockedResults.push(result.value.blocked);
    if (result.value.failed) failureCount++;
  }
  return {
    updated: updatedIds,
    blocked: blockedResults,
    updateFailedCount: failureCount
  };
}

// ---------------------------------------------------------------------------
// hgO — thin wrapper delegating to EAq
// ---------------------------------------------------------------------------

/** Delegates to EAq; exists as a separate named export for callsite clarity. */
async function hgO(eligibleMarketplaces: Set<string>): Promise<{
  updated: string[];
  blocked: AutoupdateBlockedResult[];
  updateFailedCount: number;
}> {
  return EAq(eligibleMarketplaces);
}

// ---------------------------------------------------------------------------
// K44 — full autoupdate pass (fire-and-forget IIFE)
// ---------------------------------------------------------------------------

/**
 * Triggers a full plugin auto-update pass as a fire-and-forget async IIFE.
 *
 * Steps:
 *   1. Bail out early when the auto-updater feature flag is disabled.
 *   2. Collect the set of marketplaces eligible for refresh.
 *   3. Sleep a random jitter (up to GgO ms) to spread load.
 *   4. Refresh marketplace metadata for each eligible marketplace.
 *   5. Update installed plugins that belong to a refreshed marketplace.
 *   6. Resolve any newly-satisfiable dependency-unsatisfied errors.
 *   7. Deliver results via the registered callback (or buffer them).
 *   8. Emit a `tengu_plugin_autoupdate_pass` telemetry event.
 */
function K44(): Promise<void> {
  return (async () => {
    if (jXH()) {
      N("Plugin autoupdate: skipped (auto-updater disabled)");
      return;
    }
    let startTime = Date.now(),
      telemetryCounters = {
        marketplaces_refreshed: 0,
        marketplace_refresh_failed: 0,
        plugins_updated: 0,
        plugin_update_failed: 0,
        plugins_blocked_by_pin: 0
      };
    try {
      let eligibleMarketplaces = await RgO();
      if (eligibleMarketplaces.size === 0) return;
      let jitterMs = Math.floor(Math.random() * GgO);
      await l6(jitterMs, void 0, {
        unref: !0
      }), startTime = Date.now();
      let allowCredentialHelper = Y_("tengu_plugin_autoupdate_allow_credential_helper", !1),
        refreshResults = await Promise.allSettled(Array.from(eligibleMarketplaces).map(async (marketplaceName: string) => {
          try {
            return await J_H(marketplaceName, void 0, {
              disableCredentialHelper: !allowCredentialHelper
            }), !0;
          } catch (refreshError) {
            return N(`Plugin autoupdate: failed to refresh marketplace ${marketplaceName}: ${GH(refreshError)}`, {
              level: "warn"
            }), !1;
          }
        }));
      telemetryCounters.marketplace_refresh_failed = c6(refreshResults, (r: PromiseSettledResult<boolean>) => r.status !== "fulfilled" || !r.value), telemetryCounters.marketplaces_refreshed = eligibleMarketplaces.size - telemetryCounters.marketplace_refresh_failed;
      let rejectedRefreshes = refreshResults.filter((r: PromiseSettledResult<boolean>) => r.status === "rejected");
      if (rejectedRefreshes.length > 0) N(`Plugin autoupdate: ${rejectedRefreshes.length} marketplace refresh(es) failed`, {
        level: "warn"
      });
      N("Plugin autoupdate: checking installed plugins");
      let {
        updated: updatedIds,
        blocked: blockedResults,
        updateFailedCount: failCount
      } = await hgO(eligibleMarketplaces);
      if (telemetryCounters.plugins_updated = updatedIds.length, telemetryCounters.plugin_update_failed = failCount, telemetryCounters.plugins_blocked_by_pin = blockedResults.length, updatedIds.length > 0) UW("autoupdate dep-resolution");
      let {
          errors: pluginErrors
        } = await oO(),
        depResolution = await lAH(pluginErrors.filter((pluginError: {
          type: string;
          source: string;
        }) => {
          if (pluginError.type !== "dependency-unsatisfied") return !1;
          let marketplace = $9(pluginError.source).marketplace;
          return marketplace !== void 0 && eligibleMarketplaces.has(marketplace.toLowerCase());
        }));
      if (depResolution.installed.length > 0) N(`Plugin autoupdate: resolved ${depResolution.installed.length} missing plugin dependencies: ${depResolution.installed.join(", ")}`), updatedIds.push(...depResolution.installed);
      if (updatedIds.length > 0 || blockedResults.length > 0) if (yU6) yU6(updatedIds, blockedResults);else hp_ = {
        updated: updatedIds,
        blocked: blockedResults
      };
      c("tengu_plugin_autoupdate_pass", {
        outcome: telemetryCounters.marketplace_refresh_failed > 0 || telemetryCounters.plugin_update_failed > 0 ? O_("partial") : O_("ok"),
        ...telemetryCounters,
        duration_ms: Date.now() - startTime
      });
    } catch (passError) {
      N(`Plugin autoupdate: failed: ${GH(passError)}`, {
        level: "error"
      }), c("tengu_plugin_autoupdate_pass", {
        outcome: O_("failed"),
        error_kind: tH(Li(passError)),
        ...telemetryCounters,
        duration_ms: Date.now() - startTime
      });
    }
  })();
}

// ---------------------------------------------------------------------------
// Module-level state
// ---------------------------------------------------------------------------

/** Max random jitter (ms) added before beginning a marketplace refresh cycle. */
var GgO = 600000,
  /** Currently registered autoupdate notification callback, or null. */
  yU6: ((updated: string[], blocked: AutoupdateBlockedResult[]) => void) | null = null,
  /** Buffered autoupdate result when no callback was registered at pass completion. */
  hp_: {
    updated: string[];
    blocked: AutoupdateBlockedResult[];
  } | null = null;

// ---------------------------------------------------------------------------
// vU6 — lazy module initialiser
// ---------------------------------------------------------------------------

/** Lazy initialiser: ensures all dependent modules are loaded before first use. */
var vU6 = L(() => {
  o6();
  y_();
  G3_();
  T8();
  FH();
  L_();
  HZ();
  JZ();
  tj();
  KLH();
  t$();
  BA();
  kL();
  u0();
});
export {q44 as Fbl,RgO as Bom,LgO as Uom,EAq as Two,hgO as $om,K44 as Bbl,GgO as Fom,yU6 as V7n,hp_ as HWt,vU6 as K7n};
