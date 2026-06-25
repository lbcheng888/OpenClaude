// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {K2o,V2o} from "../api/5675_upgradeKey.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {Y2o,j2o} from "../api/5676_vertexUpgradeKey.ts";
import {Dpc,xpc} from "../api/5677_probeMantleModel.ts";
import {getUserSpecifiedModelSetting as w3,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {setMainLoopModelOverride as Bg,lt} from "../session/0132_sent.ts";
/**
 * Third-party (3P) model-availability fallback probes.
 *
 * When running against Bedrock / Vertex / Mantle, the default model tier may not
 * be accessible. These helpers probe availability (with a hard deadline so the
 * CLI never hangs on a slow probe) and, when a default is unavailable, rewrite
 * the relevant `process.env` model overrides and emit a telemetry event plus a
 * human-readable status line.
 */

/** Public exports of this module. */
var Opc = {};
ft(Opc, {
  withProbeDeadline: () => withProbeDeadline,
  apply3PDefaultFallbacks: () => apply3PDefaultFallbacks,
  TIER_LABELS: () => TIER_LABELS
});

/**
 * Race a probe promise against a fixed deadline. If the deadline fires first,
 * log a notice and resolve with an empty result (`[]`) so the caller proceeds
 * as if the probe found nothing to do.
 *
 * @param probeLabel - identifier of the probe (used in the deadline log line)
 * @param probePromise - the in-flight availability probe
 */
async function withProbeDeadline(probeLabel: string, probePromise: Promise<any>): Promise<any> {
  let deadlineTimer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([probePromise, new Promise(resolveRace => {
      deadlineTimer = setTimeout((resolveOuter, label) => {
        A(`[3p-probe] ${label} hit ${Ppc}ms deadline; proceeding without it`), resolveOuter([]);
      }, Ppc, resolveRace, probeLabel);
    })]);
  } finally {
    clearTimeout(deadlineTimer);
  }
}

/** Aggregate result of applying default-model fallbacks for the active provider. */
interface DefaultFallbackResult {
  /** Human-readable status lines describing each fallback that was applied. */
  lines: string[];
  /** True when no accessible model could be found (hard failure). */
  hasHardFailure: boolean;
  /** Optional model override id selected for the Mantle provider. */
  mantleOverride?: string;
}

/**
 * Dispatch to the provider-specific default-fallback routine based on the
 * currently configured backend.
 */
async function apply3PDefaultFallbacks(): Promise<DefaultFallbackResult> {
  switch (Rr()) {
    case "bedrock":
      return {
        lines: await yKm(),
        hasHardFailure: !1
      };
    case "vertex":
      return {
        lines: await TKm(),
        hasHardFailure: !1
      };
    case "mantle":
      return SKm();
    default:
      return {
        lines: [],
        hasHardFailure: !1
      };
  }
}

/** Apply Bedrock default-model fallbacks; returns status lines for each change. */
async function yKm(): Promise<string[]> {
  let {
      checkBedrockDefaultAvailability: checkBedrockDefaultAvailability
    } = await Promise.resolve().then(() => (K2o(), V2o)),
    unavailableEntries = await withProbeDeadline("bedrock-fallback", checkBedrockDefaultAvailability()),
    statusLines = [];
  for (let entry of unavailableEntries) {
    if (process.env[entry.envVar] = entry.fallbackBedrockId, entry.tier === "haiku") process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL = entry.fallbackBedrockId;
    if (entry.crossTier) process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME = entry.fallbackName, process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION = `Opus unavailable \u2014 using ${entry.fallbackName}`;
    W("tengu_bedrock_default_fallback", {
      tier: Le(entry.tier),
      default_key: Le(entry.defaultKey),
      fallback_key: Le(entry.fallbackKey),
      cross_tier: Ve(entry.crossTier ? "true" : "false")
    }), statusLines.push(entry.crossTier ? `${TIER_LABELS[entry.tier]}: ${entry.defaultName} not available \u2014 using ${entry.fallbackName}. Enable ${entry.defaultName} in the Bedrock console to upgrade.` : `${TIER_LABELS[entry.tier]}: ${entry.defaultName} not available \u2014 using ${entry.fallbackName} for this session`);
  }
  return statusLines;
}

/** Apply Vertex default-model fallbacks; returns status lines for each change. */
async function TKm(): Promise<string[]> {
  let {
      checkVertexDefaultAvailability: checkVertexDefaultAvailability
    } = await Promise.resolve().then(() => (Y2o(), j2o)),
    unavailableEntries = await withProbeDeadline("vertex-fallback", checkVertexDefaultAvailability()),
    statusLines = [];
  for (let entry of unavailableEntries) {
    if (process.env[entry.envVar] = entry.fallbackVertexId, entry.tier === "haiku") process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL = entry.fallbackVertexId;
    if (entry.crossTier) process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME = entry.fallbackName, process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION = `Opus unavailable \u2014 using ${entry.fallbackName}`;
    W("tengu_vertex_default_fallback", {
      tier: Le(entry.tier),
      default_key: Le(entry.defaultKey),
      fallback_key: Le(entry.fallbackKey),
      cross_tier: Ve(entry.crossTier ? "true" : "false")
    }), statusLines.push(entry.crossTier ? `${TIER_LABELS[entry.tier]}: ${entry.defaultName} not available \u2014 using ${entry.fallbackName}. Enable ${entry.defaultName} in Model Garden to upgrade.` : `${TIER_LABELS[entry.tier]}: ${entry.defaultName} not available \u2014 using ${entry.fallbackName} for this session`);
  }
  return statusLines;
}

/**
 * Apply Mantle default-model fallbacks. Unlike Bedrock/Vertex this can report a
 * hard failure (no accessible model at all) and may emit a model override id.
 */
async function SKm(): Promise<DefaultFallbackResult> {
  let {
      checkMantleDefaultAvailability: checkMantleDefaultAvailability
    } = await Promise.resolve().then(() => (Dpc(), xpc)),
    probeResults = await withProbeDeadline("mantle-fallback", checkMantleDefaultAvailability()),
    statusLines = [],
    hasHardFailure = !1,
    mantleOverride;
  for (let result of probeResults) if (result.kind === "fallback") {
    if (process.env[result.envVar] = result.fallbackMantleId, w3() == null) Bg(result.fallbackMantleId), mantleOverride = result.fallbackMantleId;
    W("tengu_mantle_default_fallback", {
      default_key: Le(result.defaultKey),
      fallback_key: Le(result.fallbackKey)
    }), statusLines.push(`${TIER_LABELS[result.tier]}: ${result.defaultName} not available \u2014 using ${result.fallbackName} for this session`);
  } else hasHardFailure = !0, W("tengu_mantle_default_fallback", {
    default_key: Ve("exhausted")
  }), statusLines.push(`${TIER_LABELS[result.tier]}: no accessible model (tried ${result.triedNames.join(", ")}). Enable ${result.defaultName} in Amazon Bedrock (Mantle).`);
  return {
    lines: statusLines,
    hasHardFailure: hasHardFailure,
    mantleOverride: mantleOverride
  };
}

/** Display labels for each model tier, populated lazily in the module init below. */
var TIER_LABELS: Record<string, string>,
  /** Probe deadline in milliseconds. */
  Ppc = 20000;
var Q2o = b(() => {
  lt();
  kt();
  qe();
  Ro();
  Ps();
  TIER_LABELS = {
    fable: "Fable",
    sonnet: "Sonnet",
    opus: "Opus",
    haiku: "Haiku"
  };
});

export {Opc,withProbeDeadline,apply3PDefaultFallbacks,yKm,TKm,SKm,TIER_LABELS,Ppc,Q2o};
