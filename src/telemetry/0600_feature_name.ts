// @ts-nocheck
import {prn,nns} from "../../vendor/m598.ts";
import {logEvent as W,logEventAsync as Ug,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
/**
 * Feature-name helpers and feature-event logging utilities.
 *
 * Provides:
 *  - Helpers that build canonical telemetry feature-name strings for tools,
 *    commands, and hooks (`rns` / `ons` / `_1e`).
 *  - Six thin wrappers around the underlying event-emit calls (`W` / `Ug`) that
 *    fire the three standard feature lifecycle events:
 *      tengu_feature_ok   – success path
 *      tengu_feature_bad  – hard/unexpected failure
 *      tengu_feature_sad  – soft/expected failure
 *    in both synchronous and asynchronous variants.
 *  - `Tl` – wraps an async operation so that success and failure are
 *    automatically logged as ok / bad events.
 *  - `mn` – lazy module-init guard (calls `nns` and `kt` once on first access).
 *
 * Cross-module references kept as-is (resolved by the bundler at runtime):
 *   W    – synchronous event emitter
 *   Ug   – asynchronous event emitter
 *   Le   – converts a raw feature-name string to its canonical telemetry form
 *   prn  – sanitizes / normalises a raw identifier for use inside a feature name
 *   nns  – dependency module init
 *   kt   – dependency module init
 *   b    – lazy-once module initialiser factory
 */

// ---------------------------------------------------------------------------
// Feature-name builders
// ---------------------------------------------------------------------------

/**
 * Returns the canonical telemetry feature name for a tool, e.g. `"tool_bash"`.
 *
 * @param rawName - Raw tool identifier (will be normalised by `prn`).
 */
function rns(rawName: string): string {
  return `tool_${prn(rawName)}`;
}

/**
 * Returns the canonical telemetry feature name for a command, e.g. `"cmd_dispatch"`.
 *
 * @param rawName - Raw command identifier (will be normalised by `prn`).
 */
function ons(rawName: string): string {
  return `cmd_${prn(rawName)}`;
}

/**
 * Returns the canonical telemetry feature name for a hook, e.g. `"hook_pre_tool"`.
 *
 * @param rawName - Raw hook identifier (will be normalised by `prn`).
 */
function _1e(rawName: string): string {
  return `hook_${prn(rawName)}`;
}

// ---------------------------------------------------------------------------
// Synchronous event helpers
// ---------------------------------------------------------------------------

/**
 * Synchronously emits a `tengu_feature_ok` event for the given feature.
 *
 * @param featureName - Feature identifier (passed through `Le` for canonicalization).
 * @param extraProps  - Optional additional event properties to merge in.
 */
function He(featureName: string, extraProps?: Record<string, unknown>): void {
  W("tengu_feature_ok", {
    feature_name: Le(featureName),
    ...extraProps
  });
}

/**
 * Synchronously emits a `tengu_feature_bad` event (hard / unexpected failure).
 *
 * @param featureName - Feature identifier.
 * @param errorCode   - Short error code string.
 * @param extraProps  - Optional additional event properties to merge in.
 */
function xe(featureName: string, errorCode: string, extraProps?: Record<string, unknown>): void {
  W("tengu_feature_bad", {
    ...extraProps,
    feature_name: Le(featureName),
    error_code: errorCode
  });
}

/**
 * Synchronously emits a `tengu_feature_sad` event (soft / expected failure).
 *
 * @param featureName - Feature identifier.
 * @param errorCode   - Short error code string.
 * @param extraProps  - Optional additional event properties to merge in.
 */
function Pt(featureName: string, errorCode: string, extraProps?: Record<string, unknown>): void {
  W("tengu_feature_sad", {
    ...extraProps,
    feature_name: Le(featureName),
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
 * @param extraProps  - Optional additional event properties to merge in.
 */
async function pA(featureName: string, extraProps?: Record<string, unknown>): Promise<void> {
  await Ug("tengu_feature_ok", {
    feature_name: Le(featureName),
    ...extraProps
  });
}

/**
 * Asynchronously emits a `tengu_feature_bad` event (hard / unexpected failure).
 *
 * @param featureName - Feature identifier.
 * @param errorCode   - Short error code string.
 * @param extraProps  - Optional additional event properties to merge in.
 */
async function Qu(featureName: string, errorCode: string, extraProps?: Record<string, unknown>): Promise<void> {
  await Ug("tengu_feature_bad", {
    ...extraProps,
    feature_name: Le(featureName),
    error_code: errorCode
  });
}

/**
 * Asynchronously emits a `tengu_feature_sad` event (soft / expected failure).
 *
 * @param featureName - Feature identifier.
 * @param errorCode   - Short error code string.
 */
async function soe(featureName: string, errorCode: string): Promise<void> {
  await Ug("tengu_feature_sad", {
    feature_name: Le(featureName),
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
async function Tl<T>(
  featureName: string,
  operation: () => Promise<T>,
  getErrorCode?: (err: unknown) => string
): Promise<T> {
  try {
    let result = await operation();
    return He(featureName), result;
  } catch (err) {
    throw xe(featureName, getErrorCode?.(err) ?? "error"), err;
  }
}

// ---------------------------------------------------------------------------
// Module initialisation
// ---------------------------------------------------------------------------

/** Lazy module-init guard: calls `nns` and `kt` once on first access. */
var mn = b(() => {
  nns();
  kt();
});

export {rns,ons,_1e,He,xe,Pt,pA as REPL_CONTEXT_NAME,Qu,soe,Tl,mn};
