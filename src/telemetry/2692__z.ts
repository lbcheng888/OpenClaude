// @ts-nocheck
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {$Be as LEH,jR as LW} from "../config/2028_allowed.ts";
import {st as q_,_l as P4} from "../../vendor/m5.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getGlobalConfig as C_,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getAPIProvider as l8,isFirstPartyAnthropicBaseUrl as T3,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "../config/0047_namespace.ts";
/**
 * Tool-search mode resolution and model-support gating.
 *
 * Reads the ENABLE_TOOL_SEARCH env var to derive one of three runtime modes
 * ("standard" | "tst" | "tst-auto"), checks whether the active model is on
 * the unsupported-models allowlist, and exposes `isToolSearchOptimisticallyEnabled`
 * which gates every tool-search code path.
 */

/**
 * Parses the `auto:N` suffix of ENABLE_TOOL_SEARCH.
 * Returns a percentage (0-100) when the value is `auto:N`, otherwise null.
 */
function parseAutoToolSearchValue(envValue: string): number | null {
  if (!envValue.startsWith("auto:")) return null;
  let numericPart = envValue.slice(5),
    parsed = parseInt(numericPart, 10);
  if (isNaN(parsed))
    return (
      N(
        `Invalid ENABLE_TOOL_SEARCH value "${envValue}": expected auto:N where N is a number.`
      ),
      null
    );
  return Math.max(0, Math.min(100, parsed));
}

/**
 * Returns true when the ENABLE_TOOL_SEARCH value represents an "auto" variant
 * (`"auto"` or `"auto:N"`).
 */
function isAutoToolSearchMode(envValue: string | undefined): boolean {
  if (!envValue) return !1;
  return envValue === "auto" || envValue.startsWith("auto:");
}

/**
 * Resolves the effective tool-search mode from the current environment and
 * feature-flag state.
 * @returns `"standard"` | `"tst"` | `"tst-auto"`
 */
function resolveToolSearchMode(): "standard" | "tst" | "tst-auto" {
  if (LEH()) return "standard";
  let envValue = process.env.ENABLE_TOOL_SEARCH,
    autoPercent = envValue ? parseAutoToolSearchValue(envValue) : null;
  if (autoPercent === 0) return "tst";
  if (autoPercent === 100) return "standard";
  if (isAutoToolSearchMode(envValue)) return "tst-auto";
  if (q_(envValue)) return "tst";
  if (P4(process.env.ENABLE_TOOL_SEARCH)) return "standard";
  return "tst";
}

/**
 * Returns the list of model-name substrings for which tool-search is
 * unsupported. Falls back to the hard-coded default if the remote flag is
 * absent or malformed.
 */
function getToolSearchUnsupportedModels(): string[] {
  try {
    let flagValue = Y_("tengu_tool_search_unsupported_models", null);
    if (Array.isArray(flagValue)) return flagValue;
  } catch {}
  return DEFAULT_TOOL_SEARCH_UNSUPPORTED_MODELS;
}

/**
 * Returns the merged list of tool names that must not be deferred to the
 * background.  Sources: remote feature-flag + clientDataCache field.
 */
function getNonDeferrableBuiltins(): string[] {
  let builtins = new Set<string>();
  try {
    let flagValue = Y_("tengu_non_deferrable_builtins", null);
    if (Array.isArray(flagValue)) {
      for (let item of flagValue) if (typeof item === "string") builtins.add(item);
    }
  } catch {}
  try {
    let cacheValue = C_().clientDataCache?.non_deferrable_builtins;
    if (Array.isArray(cacheValue)) {
      for (let item of cacheValue) if (typeof item === "string") builtins.add(item);
    }
  } catch {}
  if (builtins.size === 0) return DEFAULT_NON_DEFERRABLE_BUILTINS;
  return [...builtins];
}

/**
 * Returns true when `modelId` is NOT on the unsupported-models list (i.e. the
 * model supports tool-search).
 */
function isModelToolSearchSupported(modelId: string): boolean {
  let lowerModelId = modelId.toLowerCase(),
    unsupportedList = getToolSearchUnsupportedModels();
  for (let entry of unsupportedList)
    if (lowerModelId.includes(entry.toLowerCase())) return !1;
  return !0;
}

/**
 * Returns true when tool-search should be enabled for this session.
 *
 * Logs a one-shot diagnostic via `N()` on first call regardless of outcome.
 * Checks mode, API provider, and vertex constraints before returning.
 */
function isToolSearchOptimisticallyEnabled(): boolean {
  let mode = resolveToolSearchMode();
  if (mode === "standard") {
    if (!toolSearchLoggedOnce)
      toolSearchLoggedOnce = !0,
        N(
          `[ToolSearch:optimistic] mode=${mode}, ENABLE_TOOL_SEARCH=${process.env.ENABLE_TOOL_SEARCH}, result=false`
        );
    return !1;
  }
  if (
    !process.env.ENABLE_TOOL_SEARCH &&
    l8() === "firstParty" &&
    !T3()
  ) {
    if (!toolSearchLoggedOnce)
      toolSearchLoggedOnce = !0,
        N(
          `[ToolSearch:optimistic] disabled: ANTHROPIC_BASE_URL=${process.env.ANTHROPIC_BASE_URL} is not a first-party Anthropic host. Set ENABLE_TOOL_SEARCH=true (or auto / auto:N) if your proxy forwards tool_reference blocks.`
        );
    return !1;
  }
  if (!process.env.ENABLE_TOOL_SEARCH && l8() === "vertex") {
    if (!toolSearchLoggedOnce)
      toolSearchLoggedOnce = !0,
        N(
          "[ToolSearch:optimistic] disabled: Vertex AI does not accept the tool-search beta header. Set ENABLE_TOOL_SEARCH=true to override."
        );
    return !1;
  }
  if (!toolSearchLoggedOnce)
    toolSearchLoggedOnce = !0,
      N(
        `[ToolSearch:optimistic] mode=${mode}, ENABLE_TOOL_SEARCH=${process.env.ENABLE_TOOL_SEARCH}, result=true`
      );
  return !0;
}

var DEFAULT_TOOL_SEARCH_UNSUPPORTED_MODELS: string[],
  DEFAULT_NON_DEFERRABLE_BUILTINS: string[],
  /** Guard flag: ensures the one-shot log is emitted only once per session. */
  toolSearchLoggedOnce = !1;

var xi = L(() => {
  o6();
  LW();
  T8();
  FH();
  A6();
  V7();
  DEFAULT_TOOL_SEARCH_UNSUPPORTED_MODELS = ["claude-3-5-haiku", "claude-3-haiku"];
  DEFAULT_NON_DEFERRABLE_BUILTINS = [];
});

export {parseAutoToolSearchValue as ljr,isAutoToolSearchMode as ACd,resolveToolSearchMode as PPt,getToolSearchUnsupportedModels as gCd,getNonDeferrableBuiltins as yNi,isModelToolSearchSupported as gz,isToolSearchOptimisticallyEnabled as hL,DEFAULT_TOOL_SEARCH_UNSUPPORTED_MODELS as hCd,DEFAULT_NON_DEFERRABLE_BUILTINS as _Cd,toolSearchLoggedOnce as kRe,xi as _z};
