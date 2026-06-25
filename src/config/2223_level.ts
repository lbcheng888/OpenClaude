// @ts-nocheck
import {m8 as us,G0t as oK6} from "../../vendor/m2029.ts";
import {getCanonicalName as _9,isPinnedFableModel as Cs,Ro as iq} from "../permissions/1458_swapShrinksContextWindow.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {hasFirstPartyCapabilities as ry,getProviderForModel as jw,Ps as V7} from "../api/1287_usesFirstPartyModelIds.ts";
import {hC as TP,L2 as Dn} from "../agent/2222_available.ts";
import {getInitialSettings as n8,ao as Yq,br as N8} from "./0745_updateSettingsForSource.ts";
import {getGlobalConfig as C_,saveGlobalConfig as P6,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getTotalOutputTokens as JJ,lt as w_} from "../session/0132_sent.ts";
import {Ub as VD,Wu as X3} from "../../vendor/m438.ts";
import {bbi as Dg9,TDt as sX_} from "../permissions/2226_cli.ts";
import {isProSubscriber as AOH,lo as Mq} from "./2036_withOAuthRefreshLock.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
type EffortLevelName = "low" | "medium" | "high" | "xhigh" | "max";
type EffortValue = EffortLevelName | number;
// ---------------------------------------------------------------------------
// Effort capability detection
// ---------------------------------------------------------------------------

/**
 * Returns `true` if the given model supports effort control at all.
 * Checks custom capability overrides first, then model-ID allow/deny lists,
 * then the CLAUDE_CODE_ALWAYS_ENABLE_EFFORT env var, then the API provider.
 */
function zP(model: string): boolean {
  let capabilityOverride = us(model, "effort");
  if (capabilityOverride !== void 0) return capabilityOverride;
  let normalizedId = _9(model);
  if (normalizedId.includes("claude-3-") || normalizedId === "claude-opus-4-0" || normalizedId === "claude-opus-4-1" || normalizedId === "claude-sonnet-4-0" || normalizedId === "claude-sonnet-4-5" || normalizedId === "claude-haiku-4-5") return !1;
  if (q_(process.env.CLAUDE_CODE_ALWAYS_ENABLE_EFFORT)) return !0;
  if (normalizedId === "claude-fable-5" || normalizedId === "claude-mythos-5" || normalizedId === "claude-opus-4-8" || normalizedId === "claude-opus-4-7" || normalizedId === "claude-opus-4-6" || normalizedId === "claude-sonnet-4-6") return !0;
  return ry(jw(model));
}

/**
 * Returns `true` if the model supports the "max" effort level.
 */
function oyH(model: string): boolean {
  let capabilityOverride = us(model, "max_effort");
  if (capabilityOverride !== void 0) return capabilityOverride;
  let normalizedId = _9(model);
  if (normalizedId.includes("claude-3-") || normalizedId === "claude-opus-4-0" || normalizedId === "claude-opus-4-1" || normalizedId === "claude-opus-4-5" || normalizedId === "claude-sonnet-4-0" || normalizedId === "claude-sonnet-4-5" || normalizedId === "claude-haiku-4-5") return !1;
  if (normalizedId === "claude-fable-5" || normalizedId === "claude-mythos-5" || normalizedId === "claude-opus-4-8" || normalizedId === "claude-opus-4-7" || normalizedId === "claude-opus-4-6" || normalizedId === "claude-sonnet-4-6") return !0;
  return ry(jw(model));
}

/**
 * Returns `true` if the model supports the "xhigh" effort level.
 */
function KMH(model: string): boolean {
  let capabilityOverride = us(model, "xhigh_effort");
  if (capabilityOverride !== void 0) return capabilityOverride;
  let normalizedId = _9(model);
  if (normalizedId.includes("claude-3-") || normalizedId === "claude-opus-4-0" || normalizedId === "claude-opus-4-1" || normalizedId === "claude-opus-4-5" || normalizedId === "claude-opus-4-6" || normalizedId === "claude-sonnet-4-0" || normalizedId === "claude-sonnet-4-5" || normalizedId === "claude-sonnet-4-6" || normalizedId === "claude-haiku-4-5") return !1;
  if (normalizedId === "claude-fable-5" || normalizedId === "claude-mythos-5" || normalizedId === "claude-opus-4-8" || normalizedId === "claude-opus-4-7") return !0;
  return ry(jw(model));
}

/**
 * Returns `true` when workflows are enabled AND the model supports xhigh effort
 * (or no model is specified, meaning we check the global ultracode gate only).
 */
function Qm(model: string | undefined): boolean {
  return TP() && (model === void 0 || KMH(model));
}

/**
 * Returns `true` when ultracode mode is active, the current session is a
 * remote-control-channel session, and the resolved effort is "xhigh".
 */
function cs(model: string, defaultEffort: EffortValue | undefined, isUltracode: boolean): boolean {
  return isUltracode === !0 && TP() && Qs(model, defaultEffort) === "xhigh";
}

// ---------------------------------------------------------------------------
// Effort value parsing / validation
// ---------------------------------------------------------------------------

/**
 * Returns `true` if `level` is one of the valid named effort levels.
 */
function ayH(level: unknown): level is EffortLevelName {
  return Fh.includes(level as EffortLevelName);
}

/**
 * Converts an effort value to its string representation.
 */
function XqH(value: EffortValue): string {
  return String(value);
}

/**
 * Parses a raw string into a canonical effort level name (normalizes aliases
 * like "med" → "medium"), or returns `undefined` if the string is unknown.
 */
function GrH(raw: string): EffortLevelName | undefined {
  let normalized = raw.trim().toLowerCase(),
    resolved = (Vg9 as Record<string, string>)[normalized] ?? normalized;
  return ayH(resolved) ? resolved : void 0;
}

/**
 * Parses a raw effort string; returns `{ level, warning: undefined }` on
 * success or `{ level: undefined, warning: string }` on failure.
 */
function yg9(raw: string): {
  level: EffortLevelName;
  warning: undefined;
} | {
  level: undefined;
  warning: string;
} {
  let level = GrH(raw);
  if (level !== void 0) return {
    level,
    warning: void 0
  };
  return {
    level: void 0,
    warning: `Unknown --effort value '${raw}' — ignoring it and using the default effort. Valid values: ${Fh.join(", ")}.`
  };
}

/**
 * Parses an effort value from various input forms (string label, alias,
 * integer, numeric string).  Returns `undefined` for empty / null / invalid input.
 */
function gm(raw: unknown): EffortValue | undefined {
  if (raw === void 0 || raw === null || raw === "") return;
  if (typeof raw === "number" && kg9(raw)) return raw;
  let str = String(raw).toLowerCase(),
    resolved = (Vg9 as Record<string, string>)[str] ?? str;
  if (ayH(resolved)) return resolved;
  let parsed = parseInt(str, 10);
  if (!isNaN(parsed) && kg9(parsed)) return parsed;
  return;
}

/**
 * Validates a named effort level for persistence (excludes "max" — only
 * "low"/"medium"/"high"/"xhigh" may be stored in settings).
 * Returns the level unchanged, or `undefined` if invalid.
 */
function HMH(level: unknown): Exclude<EffortLevelName, "max"> | undefined {
  if (level === "low" || level === "medium" || level === "high" || level === "xhigh") return level;
  return;
}

/**
 * Checks whether the ultracode setting is active in the current settings
 * object and, if so, calls `unpinAllEffortLevels` to unlock model-pinned
 * effort.  Returns `true` when ultracode mode is active.
 */
function jP8(_unused: unknown): boolean {
  let isUltracode = n8().ultracode === !0 || !1;
  if (isUltracode) uI();
  return isUltracode;
}

/**
 * Returns `newEffort` only when it differs from `currentEffort` or when
 * `hasExplicitOverride` or `forceReturn` are set; otherwise returns
 * `undefined` to signal "no change".
 */
function vg9(newEffort: EffortValue | undefined, currentEffort: EffortValue | undefined, hasExplicitOverride: unknown, forceReturn: boolean): EffortValue | undefined {
  return hasExplicitOverride !== void 0 || forceReturn || newEffort !== currentEffort ? newEffort : void 0;
}

/**
 * Reads the effort level from the `CLAUDE_CODE_EFFORT_LEVEL` environment
 * variable.  Returns `null` if the variable is set to "unset"/"auto"
 * (meaning "clear the override"), or `undefined` if the variable is absent.
 */
function syH(): EffortValue | null | undefined {
  let envVal = process.env.CLAUDE_CODE_EFFORT_LEVEL;
  return envVal?.toLowerCase() === "unset" || envVal?.toLowerCase() === "auto" ? null : gm(envVal);
}

// ---------------------------------------------------------------------------
// Launch-pinned effort (per-model opt-out mechanism)
// ---------------------------------------------------------------------------

/**
 * Returns `true` if the model's effort level is currently pinned to its
 * launch-time default (i.e. the user has not yet opted out of the pin).
 */
function tyH(model: string): boolean {
  let normalizedId = _9(model);
  if (normalizedId.includes("opus-4-7")) return !C_().unpinOpus47LaunchEffort;
  if (normalizedId.includes("opus-4-8")) return !C_().unpinOpus48LaunchEffort;
  if (normalizedId.includes("fable-5") || Cs(model)) return !C_().unpinFable5LaunchEffort;
  return !1;
}

/**
 * Returns `true` when all per-model effort pins have been removed (user
 * has explicitly unlocked effort on all models that ship with a default pin).
 */
function t16(): boolean {
  let cfg = C_();
  return Boolean(cfg.unpinOpus47LaunchEffort && cfg.unpinOpus48LaunchEffort && cfg.unpinFable5LaunchEffort);
}

/**
 * Sets all per-model effort-pin flags to `true` in the global config,
 * effectively unlocking effort level selection for all pinned models.
 */
function uI(): void {
  P6(cfg => cfg.unpinOpus47LaunchEffort && cfg.unpinOpus48LaunchEffort && cfg.unpinFable5LaunchEffort ? cfg : {
    ...cfg,
    unpinOpus47LaunchEffort: !0,
    unpinOpus48LaunchEffort: !0,
    unpinFable5LaunchEffort: !0
  });
}

// ---------------------------------------------------------------------------
// Core effort resolution
// ---------------------------------------------------------------------------

/**
 * Resolves the final effort level that should be sent to the API for a
 * given model, taking into account:
 *   1. Whether the model supports effort at all.
 *   2. Whether its effort is pinned to the launch default.
 *   3. The CLAUDE_CODE_EFFORT_LEVEL environment variable.
 *   4. The caller-supplied default (`callerDefault`).
 *   5. The model's own default effort.
 *   6. Model capability caps (e.g. "max" → "high" if max is not supported).
 */
function Qs(model: string, callerDefault: EffortValue | undefined): EffortValue | undefined {
  if (!zP(model)) return;
  let isPinned = tyH(model),
    modelDefault = e16(model),
    envEffort = syH();
  if (envEffort === null) return isPinned ? modelDefault : void 0;
  let resolved = envEffort ?? (isPinned ? modelDefault : void 0) ?? callerDefault ?? modelDefault;
  if (resolved === "max" && !oyH(model)) return "high";
  if (resolved === "xhigh" && !KMH(model)) return "high";
  return resolved;
}

/**
 * Returns `true` when the effort level has changed in a way that should
 * surface a banner to the user.
 *
 * Params:
 *   newEffort       – incoming effort value from the user
 *   previousEffort  – effort value from the previous interaction
 *   model           – the model being used
 *   sessionTokens   – current total output-token count for the session
 *   isVisible       – whether the effort UI is currently visible
 */
function K2_(newEffort: EffortValue | undefined, previousEffort: EffortValue | undefined, model: string, sessionTokens: number, isVisible: boolean): boolean {
  if (!isVisible) return !1;
  let currentTokens = JJ();
  if (currentTokens === 0 || currentTokens === sessionTokens) return !1;
  if (!zP(model)) return !1;
  if (tyH(model)) {
    if (newEffort === void 0 || newEffort === e16(model)) return !1;
  } else if (Qs(model, newEffort) === Qs(model, previousEffort)) return !1;
  if (VD() && newEffort !== void 0 && HMH(newEffort) === void 0) return !1;
  return !0;
}

/**
 * Persists the user-chosen effort level to `userSettings.effortLevel`.
 * Also calls `unpinAllEffortLevels` unconditionally so subsequent calls
 * use the user's explicit setting rather than the model's launch default.
 *
 * Returns an error string on failure, or `undefined` on success.
 */
function O2_(level: EffortLevelName | undefined): string | undefined {
  let validated = level !== void 0 ? HMH(level) : void 0;
  if (level === void 0 || validated !== void 0) {
    let result = Yq("userSettings", {
      effortLevel: validated
    });
    if (result.error) return result.error;
  }
  uI();
  return;
}

/**
 * Processes a raw CLI `--effort` argument: if it parses to a valid effort
 * value, unpins all effort levels, then delegates to `resolveEffortFromConfig`.
 */
function JP8(cliEffortArg: string | undefined): EffortValue | undefined {
  if (gm(cliEffortArg) !== void 0) uI();
  return Dg9({
    cli: {
      effort: cliEffortArg
    },
    env: process.env,
    settings: n8()
  });
}

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

/**
 * Returns a display-safe effort level for a given model, defaulting to
 * "high" when no explicit effort is set or the model does not support effort.
 */
function kN(model: string, callerDefault: EffortValue | undefined): EffortLevelName {
  let resolved = Qs(model, callerDefault) ?? "high";
  return vOH(resolved);
}

/**
 * Like `kN`, but returns `undefined` when the model does not support effort.
 */
function oR(model: string, callerDefault: EffortValue | undefined): EffortLevelName | undefined {
  return zP(model) ? kN(model, callerDefault) : void 0;
}

/**
 * Returns a short display suffix like `" with high effort"` for use in
 * status lines; returns `""` when effort is undefined or model lacks support.
 */
function RrH(model: string, callerDefault: EffortValue | undefined): string {
  if (callerDefault === void 0) return "";
  let resolved = Qs(model, callerDefault);
  if (resolved === void 0) return "";
  return ` with ${XqH(vOH(resolved))} effort`;
}

// ---------------------------------------------------------------------------
// Low-level utilities
// ---------------------------------------------------------------------------

/** Returns `true` if `n` is a safe integer. */
function kg9(n: number): boolean {
  return Number.isInteger(n);
}

/**
 * Normalises an effort value to a safe named level string.
 * Falls back to "high" if the value is not a recognised named level.
 */
function vOH(value: EffortValue): EffortLevelName {
  if (typeof value === "string") return ayH(value) ? value : "high";
  return "high";
}

/**
 * Returns a human-readable description for a named effort level.
 */
function bL5(level: EffortLevelName | "max"): string | undefined {
  switch (level) {
    case "low":
      return "Quick, straightforward implementation with minimal overhead";
    case "medium":
      return "Balanced approach with standard implementation and testing";
    case "high":
      return "Comprehensive implementation with extensive testing and documentation";
    case "xhigh":
      return `Deeper reasoning than high, just below maximum (${s16})`;
    case "max":
      return `Maximum capability with deepest reasoning. ${q2_}`;
  }
}

/**
 * Like `bL5` but appends a Pro-tier usage hint for "high" when appropriate.
 * Falls back to the "medium" description for non-string inputs.
 */
function DP8(level: EffortLevelName | "max" | number | undefined): string {
  if (typeof level === "string") {
    let desc = bL5(level as EffortLevelName | "max");
    if (level === "high" && AOH() && Y_("tengu_slate_finch", !1)) return `${desc} \xB7 burns fastest — medium handles most tasks`;
    return desc as string;
  }
  return "Balanced approach with standard implementation and testing";
}

/**
 * Returns the model's "launch-pinned" default effort level — the effort
 * level that was chosen when the model first shipped.
 */
function e16(model: string): EffortLevelName {
  if (_9(model) === "claude-fable-5") return "high";
  if (_9(model) === "claude-opus-4-8") return "high";
  if (_9(model) === "claude-opus-4-7") return "xhigh";
  return "high";
}

// ---------------------------------------------------------------------------
// Module-level constants and initialisation
// ---------------------------------------------------------------------------

/** Ordered list of all supported effort level names. */
var Fh: EffortLevelName[],
  /** Display label for models that support "xhigh" but not "max". */
  s16 = "Fable 5, Opus 4.7+",
  /** Display label for models that support "max" effort. */
  Ng9 = "Fable 5, Opus 4.6+, Sonnet 4.6",
  /** Warning text shown when the user picks "max" effort. */
  q2_ = "May use excessive tokens resulting in long response times or overthinking. Use sparingly for the hardest tasks.",
  /** Alias map: short names → canonical effort level names. */
  Vg9: Record<string, string>;

/** Module initialisation thunk (lazy, run once via the `L` helper). */
var dT = L(() => {
  N8();
  Mq();
  o6();
  oK6();
  iq();
  V7();
  A6();
  T8();
  sX_();
  w_();
  X3();
  Dn();
  Fh = ["low", "medium", "high", "xhigh", "max"];
  Vg9 = {
    med: "medium"
  };
});
export {zP as BR,oyH as EUe,KMH as nve,Qm as j3,cs as nZ,ayH as CUe,XqH as Jse,GrH as _et,yg9 as Tbi,gm as dynamicTeamContext,HMH as rve,jP8 as M$r,vg9 as Sbi,syH as AUe,tyH as RUe,t16 as ove,uI as M2,Qs as tZ,K2_ as _Dt,O2_ as yDt,JP8 as N$r,kN as iO,oR as $0,RrH as yet,kg9 as gbi,vOH as Kfe,bL5 as ild,DP8 as F$r,e16 as Bbn,Fh as gD,s16 as Fbn,Ng9 as _bi,q2_ as gDt,Vg9 as ybi,dT as Cp};
