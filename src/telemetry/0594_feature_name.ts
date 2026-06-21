// @ts-nocheck
import {Ien as Js_,sJo as ucq} from "../../vendor/m592.ts";
import {logEvent as c,logEventAsync as XJ,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
/**
 * Feature-name helpers and feature-event logging utilities.
 *
 * Provides:
 *  - Helpers that build canonical telemetry feature-name strings for tools,
 *    commands, and hooks (`toolFeatureName`, `cmdFeatureName`, `hookFeatureName`).
 *  - Six thin wrappers around the underlying event-emit calls (`c` / `XJ`) that
 *    fire the three standard feature lifecycle events:
 *      tengu_feature_ok   – success path
 *      tengu_feature_bad  – hard/unexpected failure
 *      tengu_feature_sad  – soft/expected failure
 *    in both synchronous and asynchronous variants.
 *  - `withFeatureTelemetry` – wraps an async operation so that success and
 *    failure are automatically logged as ok / bad events.
 *  - `M6` – lazy module-init guard (calls `ucq` and `y_` once on first access).
 *
 * Cross-module references kept as-is (resolved by the bundler at runtime):
 *   c    – synchronous event emitter
 *   XJ   – asynchronous event emitter
 *   tH   – converts a raw feature-name string to its canonical telemetry form
 *   Js_  – sanitizes / normalises a raw identifier for use inside a feature name
 *   ucq  – dependency module init
 *   y_   – dependency module init
 *   L    – lazy-once module initialiser factory
 */

// ---------------------------------------------------------------------------
// Feature-name builders
// ---------------------------------------------------------------------------

/**
 * Returns the canonical telemetry feature name for a tool, e.g. `"tool_bash"`.
 *
 * @param rawName - Raw tool identifier (will be normalised by `Js_`).
 */
function toolFeatureName(rawName: string): string {
  return `tool_${Js_(rawName)}`;
}

/**
 * Returns the canonical telemetry feature name for a command, e.g. `"cmd_dispatch"`.
 *
 * @param rawName - Raw command identifier (will be normalised by `Js_`).
 */
function cmdFeatureName(rawName: string): string {
  return `cmd_${Js_(rawName)}`;
}

/**
 * Returns the canonical telemetry feature name for a hook, e.g. `"hook_pre_tool"`.
 *
 * @param rawName - Raw hook identifier (will be normalised by `Js_`).
 */
function hookFeatureName(rawName: string): string {
  return `hook_${Js_(rawName)}`;
}

// ---------------------------------------------------------------------------
// Synchronous event helpers
// ---------------------------------------------------------------------------

/**
 * Synchronously emits a `tengu_feature_ok` event for the given feature.
 *
 * @param featureName  - Feature identifier (passed through `tH` for canonicalization).
 * @param extraProps   - Optional additional event properties to merge in.
 */
function logFeatureOk(featureName: string, extraProps?: Record<string, unknown>): void {
  c("tengu_feature_ok", {
    feature_name: tH(featureName),
    ...extraProps
  });
}

/**
 * Synchronously emits a `tengu_feature_bad` event (hard / unexpected failure).
 *
 * @param featureName  - Feature identifier.
 * @param errorCode    - Short error code string.
 * @param extraProps   - Optional additional event properties to merge in.
 */
function logFeatureBad(featureName: string, errorCode: string, extraProps?: Record<string, unknown>): void {
  c("tengu_feature_bad", {
    ...extraProps,
    feature_name: tH(featureName),
    error_code: errorCode
  });
}

/**
 * Synchronously emits a `tengu_feature_sad` event (soft / expected failure).
 *
 * @param featureName  - Feature identifier.
 * @param errorCode    - Short error code string.
 * @param extraProps   - Optional additional event properties to merge in.
 */
function logFeatureSad(featureName: string, errorCode: string, extraProps?: Record<string, unknown>): void {
  c("tengu_feature_sad", {
    ...extraProps,
    feature_name: tH(featureName),
    error_code: errorCode
  });
}

// ---------------------------------------------------------------------------
// Asynchronous event helpers
// ---------------------------------------------------------------------------

/**
 * Asynchronously emits a `tengu_feature_ok` event for the given feature.
 *
 * @param featureName - Feature identifier.
 */
async function logFeatureOkAsync(featureName: string): Promise<void> {
  await XJ("tengu_feature_ok", {
    feature_name: tH(featureName)
  });
}

/**
 * Asynchronously emits a `tengu_feature_bad` event (hard / unexpected failure).
 *
 * @param featureName  - Feature identifier.
 * @param errorCode    - Short error code string.
 * @param extraProps   - Optional additional event properties to merge in.
 */
async function logFeatureBadAsync(featureName: string, errorCode: string, extraProps?: Record<string, unknown>): Promise<void> {
  await XJ("tengu_feature_bad", {
    ...extraProps,
    feature_name: tH(featureName),
    error_code: errorCode
  });
}

/**
 * Asynchronously emits a `tengu_feature_sad` event (soft / expected failure).
 *
 * @param featureName  - Feature identifier.
 * @param errorCode    - Short error code string.
 */
async function logFeatureSadAsync(featureName: string, errorCode: string): Promise<void> {
  await XJ("tengu_feature_sad", {
    feature_name: tH(featureName),
    error_code: errorCode
  });
}

// ---------------------------------------------------------------------------
// Wrapped async operation with automatic telemetry
// ---------------------------------------------------------------------------

/**
 * Executes `operation` and automatically emits ok/bad telemetry events.
 *
 * On success, fires `tengu_feature_ok` for `featureName` and returns the
 * operation's result.  On failure, fires `tengu_feature_bad` (using the error
 * code produced by `getErrorCode`, defaulting to `"error"`) and re-throws.
 *
 * @param featureName  - Feature identifier used in both ok and bad events.
 * @param operation    - Async thunk to execute.
 * @param getErrorCode - Optional mapper from caught error to an error-code string.
 */
async function withFeatureTelemetry<T>(
  featureName: string,
  operation: () => Promise<T>,
  getErrorCode?: (err: unknown) => string
): Promise<T> {
  try {
    let result = await operation();
    return logFeatureOk(featureName), result;
  } catch (err) {
    throw logFeatureBad(featureName, getErrorCode?.(err) ?? "error"), err;
  }
}

// ---------------------------------------------------------------------------
// Module initialisation
// ---------------------------------------------------------------------------

/** Lazy module-init guard: calls `ucq` and `y_` once on first access. */
var M6 = L(() => {
  ucq();
  y_();
});

export {toolFeatureName as iJo,cmdFeatureName as aJo,hookFeatureName as CMe,logFeatureOk as Ie,logFeatureBad as Oe,logFeatureSad as isTmuxControlMode,logFeatureOkAsync as memoizeThunk,logFeatureBadAsync as TA,logFeatureSadAsync as a7e,withFeatureTelemetry as Ul,M6 as ln};
