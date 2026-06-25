// @ts-nocheck
import {getGlobalConfig as C_,saveGlobalConfig as P6,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getAPIProvider as l8,Ps as V7} from "../api/1287_usesFirstPartyModelIds.ts";
import {isProSubscriber as AOH,lo as Mq} from "../config/2036_withOAuthRefreshLock.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {getSettings_DEPRECATED as nq,br as N8} from "../config/0745_updateSettingsForSource.ts";
import {He as vH,mn as M6} from "./0600_feature_name.ts";
import {b as L} from "../../runtime.ts";
/**
 * Migration: Pro default model → Opus default model
 *
 * Fires once per installation to reset first-party Pro users' default model
 * from the "pro" default back to "opus". Emits a `tengu_reset_pro_to_opus_default`
 * telemetry event with flags indicating whether the migration was skipped and
 * whether the user had a custom model override set.
 */

// ---------------------------------------------------------------------------
// Cross-module externs (definitions live in other modules; types inferred).
// ---------------------------------------------------------------------------

/** Returns the global app state object. extern (config). */
declare function C_(): {
  opusProMigrationComplete?: boolean;
  [key: string]: unknown;
};

/** Returns the active provider channel. extern (config). */
declare function l8(): "firstParty" | string;

/**
 * Returns whether the first-party subscription qualifies for the Opus-default
 * migration (e.g. Pro/Max tier check). extern (config).
 */
declare function AOH(): boolean;

/**
 * Updates global app state via an updater function. extern (config).
 * @param updater - Pure function mapping old state to new state.
 */
declare function P6(updater: (state: Record<string, unknown>) => Record<string, unknown>): void;

/** Emits a named telemetry event with a payload. extern (telemetry). */
declare function c(event: string, properties: Record<string, unknown>): void;

/**
 * Returns the current project config, or undefined if not in a project.
 * The `model` field holds the project-level model override. extern (config).
 */
declare function nq(): {
  model?: string;
  [key: string]: unknown;
} | undefined;

/** Records a feature-usage telemetry hit. extern (telemetry). */
declare function vH(feature: string): void;

// ---------------------------------------------------------------------------
// Lazy module initializers for dependencies (extern, bundler-generated).
// ---------------------------------------------------------------------------
declare function y_(): void;
declare function M6(): void;
declare function Mq(): void;
declare function T8(): void;
declare function V7(): void;
declare function N8(): void;

/** Lazy module initializer wrapper. extern (bundler). */
declare function L(init: () => void): () => void;

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

/**
 * Perform the one-time "reset Pro default to Opus" migration.
 *
 * Logic:
 * - If already migrated (`opusProMigrationComplete`), return immediately.
 * - If not first-party or the Opus-eligible tier check fails (`!AOH()`),
 *   skip the migration (mark complete, emit skipped=true event).
 * - If the project config has no custom model (`model === undefined`),
 *   mark complete with a timestamp and emit `had_custom_model: false`.
 * - Otherwise (project has a custom model), mark complete without a timestamp
 *   and emit `had_custom_model: true`.
 * - After any non-skipped path, record a `migration_reset_pro_to_opus_default`
 *   feature-usage hit.
 */
function Ds4(): void {
  if (C_().opusProMigrationComplete) return;
  if (l8() !== "firstParty" || !AOH()) {
    P6(K => ({
      ...K,
      opusProMigrationComplete: !0
    })), c("tengu_reset_pro_to_opus_default", {
      skipped: !0
    });
    return;
  }
  if (nq()?.model === void 0) {
    let timestamp = Date.now();
    P6(O => ({
      ...O,
      opusProMigrationComplete: !0,
      opusProMigrationTimestamp: timestamp
    })), c("tengu_reset_pro_to_opus_default", {
      skipped: !1,
      had_custom_model: !1
    });
  } else P6(K => ({
    ...K,
    opusProMigrationComplete: !0
  })), c("tengu_reset_pro_to_opus_default", {
    skipped: !1,
    had_custom_model: !0
  });
  vH("migration_reset_pro_to_opus_default");
}

/** Lazy module initializer — ensures all dependency modules are loaded first. */
var Ms4 = L(() => {
  y_();
  M6();
  Mq();
  T8();
  V7();
  N8();
});
export {Ds4 as Zfc,Ms4 as ehc};
