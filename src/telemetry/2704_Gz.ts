// @ts-nocheck
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {NBe,MR} from "../config/2033_allowed.ts";
import {nt,Za} from "../../vendor/m127.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getCachedClientData as pI,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getAPIProvider as Rr,isFirstPartyAnthropicBaseUrl as Su,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {b} from "../../runtime.ts";
import {dn} from "../config/0137_namespace.ts";
/**
 * Tool-search ("tst") mode detection and gating.
 *
 * Decides whether the tool-search beta should be enabled, in which mode
 * ("standard" | "tst" | "tst-auto"), and which built-in tools must never be
 * deferred. Driven by the ENABLE_TOOL_SEARCH env var plus runtime gates
 * (first-party host check, Vertex AI restriction, statsig flags).
 */

/**
 * Parses an `auto:N` ENABLE_TOOL_SEARCH value into a clamped percentage [0,100].
 * Returns null when the value is not an `auto:` form or N is not numeric.
 */
function BVr(toolSearchValue: string): number | null {
  if (!toolSearchValue.startsWith("auto:")) return null;
  let autoSuffix = toolSearchValue.slice(5),
    autoPercent = parseInt(autoSuffix, 10);
  if (isNaN(autoPercent)) return A(`Invalid ENABLE_TOOL_SEARCH value "${toolSearchValue}": expected auto:N where N is a number.`), null;
  return Math.max(0, Math.min(100, autoPercent));
}

/** True when the ENABLE_TOOL_SEARCH value requests the automatic rollout mode. */
function KPd(toolSearchValue: string | undefined): boolean {
  if (!toolSearchValue) return !1;
  return toolSearchValue === "auto" || toolSearchValue.startsWith("auto:");
}

/**
 * Resolves the effective tool-search mode from env + runtime state.
 * @returns "standard" | "tst" | "tst-auto"
 */
function dMt(): string {
  if (NBe()) return "standard";
  let toolSearchValue = process.env.ENABLE_TOOL_SEARCH,
    autoPercent = toolSearchValue ? BVr(toolSearchValue) : null;
  if (autoPercent === 0) return "tst";
  if (autoPercent === 100) return "standard";
  if (KPd(toolSearchValue)) return "tst-auto";
  if (nt(toolSearchValue)) return "tst";
  if (Za(process.env.ENABLE_TOOL_SEARCH)) return "standard";
  return "tst";
}

/** Returns the list of model substrings that do not support tool search. */
function jPd(): string[] {
  try {
    let configuredUnsupported = it("tengu_tool_search_unsupported_models", null);
    if (Array.isArray(configuredUnsupported)) return configuredUnsupported;
  } catch {}
  return zPd;
}

/** Returns the set of built-in tool names that must never be deferred. */
function o3i(): string[] {
  let nonDeferrable = new Set<string>();
  try {
    let flaggedNonDeferrable = it("tengu_non_deferrable_builtins", null);
    if (Array.isArray(flaggedNonDeferrable)) {
      for (let name of flaggedNonDeferrable) if (typeof name === "string") nonDeferrable.add(name);
    }
  } catch {}
  try {
    let policyNonDeferrable = pI()?.non_deferrable_builtins;
    if (Array.isArray(policyNonDeferrable)) {
      for (let name of policyNonDeferrable) if (typeof name === "string") nonDeferrable.add(name);
    }
  } catch {}
  if (nonDeferrable.size === 0) return YPd;
  return [...nonDeferrable];
}

/** True when the given model name supports tool search (not in the unsupported list). */
function Wz(modelName: string): boolean {
  let modelLower = modelName.toLowerCase(),
    unsupportedModels = jPd();
  for (let unsupported of unsupportedModels) if (modelLower.includes(unsupported.toLowerCase())) return !1;
  return !0;
}

/**
 * Optimistic gate: whether tool search should be enabled for this session.
 * Logs the decision once (guarded by `mke`) and returns the boolean result.
 */
function OO(): boolean {
  let mode = dMt();
  if (mode === "standard") {
    if (!mke) mke = !0, A(`[ToolSearch:optimistic] mode=${mode}, ENABLE_TOOL_SEARCH=${process.env.ENABLE_TOOL_SEARCH}, result=false`);
    return !1;
  }
  if (!process.env.ENABLE_TOOL_SEARCH && Rr() === "firstParty" && !Su()) {
    if (!mke) mke = !0, A(`[ToolSearch:optimistic] disabled: ANTHROPIC_BASE_URL=${process.env.ANTHROPIC_BASE_URL} is not a first-party Anthropic host. Set ENABLE_TOOL_SEARCH=true (or auto / auto:N) if your proxy forwards tool_reference blocks.`);
    return !1;
  }
  if (!process.env.ENABLE_TOOL_SEARCH && Rr() === "vertex") {
    if (!mke) mke = !0, A("[ToolSearch:optimistic] disabled: Vertex AI does not accept the tool-search beta header. Set ENABLE_TOOL_SEARCH=true to override.");
    return !1;
  }
  if (!mke) mke = !0, A(`[ToolSearch:optimistic] mode=${mode}, ENABLE_TOOL_SEARCH=${process.env.ENABLE_TOOL_SEARCH}, result=true`);
  return !0;
}

var zPd: string[],
  YPd: string[],
  mke = !1;
var Gz = b(() => {
  jn();
  MR();
  tr();
  qe();
  dn();
  Ps();
  zPd = ["claude-3-5-haiku", "claude-3-haiku"];
  YPd = [];
});

export {BVr,KPd,dMt,jPd,o3i,Wz,OO,zPd,YPd,mke,Gz};
