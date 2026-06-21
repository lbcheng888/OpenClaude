// @ts-nocheck
import {getRuntimeMainLoopModel as nR,parseUserSpecifiedModel as D9,getCanonicalName as _9,isOpus1mMergeEnabled as bM,isFableAvailable as _qH,getDefaultFableModel as $OH,getDefaultSonnetModel as MG,getDefaultOpusModel as yJ,getDefaultHaikuModel as mDH,Mo as iq} from "./1453_swapShrinksContextWindow.ts";
import {$l as T1,X2 as bm,bme as DyH} from "../../vendor/m1450.ts";
import {isModelAllowed as N4,MO as _v} from "../../vendor/m1451.ts";
import {Xln as u96,Gze as anH,gme as HOH} from "../config/1280_BedrockClient.ts";
import {y_ as jw,usesFirstPartyModelIds as OO,getAPIProvider as l8,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {N8 as bF,T_ as Uj,jS as xM} from "../api/2023_used.ts";
import {Xx as v0,dr as P8} from "../../vendor/m231.ts";
import {b as L} from "../../runtime.ts";
// Subagent model resolution.
//
// This module decides which concrete model id a subagent should run with,
// given (in priority order): the CLAUDE_CODE_SUBAGENT_MODEL env var, an
// explicit per-invocation override, the agent's configured model, and finally
// the "inherit from parent" default. It also handles the special "inherit"
// sentinel, Bedrock region-prefix rewriting, the 1M-context `[1m]` suffix, and
// falling back to the inherited model (with a warning) when a requested model
// is not in the available-models allowlist.
//
// Cross-module helpers referenced here (imported, names preserved exactly):
//   nR   - resolve the main-loop / inherited model for a permission mode
//   D9   - resolve a model alias/name string to a concrete model id
//   N4   - true when a model id/name is a recognized/available model
//   T1   - normalize a string (used for case-insensitive comparison)
//   v0   - human-readable display name for a model id
//   _9   - canonical model name (strips suffixes such as `[1m]`)
//   jw   - provider/auth classifier ("bedrock" | "firstParty" | ...)
//   u96  - extract the Bedrock region prefix of a model id (or undefined)
//   anH  - rewrite the Bedrock region prefix of a model id
//   bF   - true when a model is eligible for 1M context
//   bM   - true when 1M context is generally enabled in this environment
//   Uj   - true when a model id already carries the `[1m]` suffix
//   N    - logger
//   L    - esbuild lazy module-init wrapper (__esmMin)
//   _qH, OO, l8, $OH, MG, yJ, mDH - availability / provider predicates and
//          model-id getters used to build the model picker options

/** Sentinel meaning "use the same model as the parent conversation". */
function defaultSubagentModelMode(): "inherit" {
  return "inherit";
}

/**
 * Resolve the concrete model a subagent should use.
 *
 * Priority: CLAUDE_CODE_SUBAGENT_MODEL env var, then the explicit
 * `explicitModelOverride`, then the agent's configured model, then the
 * "inherit" default. The "inherit" sentinel resolves to the parent/main-loop
 * model. When a requested model is not in the available-models allowlist, the
 * parent model is used instead and a warning is emitted (via `onFallback`).
 *
 * @param agentModelConfig    The agent's configured model (alias or id), or undefined.
 * @param mainLoopModel       The parent conversation's model id.
 * @param explicitModelOverride A per-invocation model override (alias or id), or undefined.
 * @param permissionMode      The permission mode in effect (defaults to "default").
 * @param onFallback          Called as (requestedModel, resolvedModel) when a
 *                            requested model is replaced by the inherited one.
 */
function resolveSubagentModel(
  agentModelConfig: string | undefined,
  mainLoopModel: string,
  explicitModelOverride: string | undefined,
  permissionMode: string | undefined,
  onFallback?: (requestedModel: string, resolvedModel: string) => void,
): string {
  let resolveInheritedModel = (): string =>
      nR({
        permissionMode: permissionMode ?? "default",
        mainLoopModel: mainLoopModel,
        exceeds200kTokens: !1,
      }),
    warnAndInherit = (requestedModel: string, resolvedAlias: string = requestedModel): string => {
      warnSubagentModelNotAllowed(requestedModel);
      let inheritedModel = resolveInheritedModel();
      if (T1(D9(resolvedAlias)).toLowerCase() !== T1(D9(inheritedModel)).toLowerCase())
        onFallback?.(requestedModel, inheritedModel);
      return inheritedModel;
    },
    envSubagentModel = process.env.CLAUDE_CODE_SUBAGENT_MODEL;
  if (envSubagentModel) {
    if (envSubagentModel === "inherit") return resolveInheritedModel();
    let resolvedEnvModel = D9(envSubagentModel);
    if (!N4(resolvedEnvModel)) return warnAndInherit(envSubagentModel);
    return resolvedEnvModel;
  }
  let bedrockRegionPrefix = u96(mainLoopModel),
    applyBedrockRegion = (modelId: string, sourceAlias: string): string => {
      if (bedrockRegionPrefix && jw(modelId) === "bedrock") {
        if (u96(sourceAlias)) return modelId;
        return anH(modelId, bedrockRegionPrefix);
      }
      return modelId;
    };
  if (explicitModelOverride) {
    if (explicitModelOverride === "inherit") return resolveInheritedModel();
    if (aliasMatchesModel(explicitModelOverride, mainLoopModel)) return mainLoopModel;
    let resolvedOverride = applyBedrockRegion(appendOneMillionContextSuffix(D9(explicitModelOverride)), explicitModelOverride);
    if (!N4(resolvedOverride)) return warnAndInherit(explicitModelOverride, resolvedOverride);
    return resolvedOverride;
  }
  let effectiveModel = agentModelConfig ?? defaultSubagentModelMode();
  if (effectiveModel === "inherit") return resolveInheritedModel();
  if (aliasMatchesModel(effectiveModel, mainLoopModel)) return mainLoopModel;
  let resolvedConfigured = applyBedrockRegion(appendOneMillionContextSuffix(D9(effectiveModel)), effectiveModel);
  if (!N4(resolvedConfigured)) return warnAndInherit(effectiveModel, resolvedConfigured);
  return resolvedConfigured;
}

/** Emit a warning that a requested subagent model is not allowlisted. */
function warnSubagentModelNotAllowed(model: string): void {
  N(`Subagent model "${model}" is not in the availableModels allowlist; inheriting the parent model instead`, {
    level: "warn",
  });
}

/**
 * Append the `[1m]` (1M-context) suffix to an Opus model id when 1M context is
 * enabled in this environment, the model is 1M-eligible, and it does not
 * already carry the suffix.
 */
function appendOneMillionContextSuffix(model: string): string {
  let isOneMillionEligibleOpus = _9(model).includes("opus") && bF(model);
  if (bM() && !Uj(model) && isOneMillionEligibleOpus) return model + "[1m]";
  return model;
}

/**
 * Return true when a short model alias ("fable" | "opus" | "sonnet" | "haiku")
 * matches the family of the given concrete model id.
 */
function aliasMatchesModel(alias: string, model: string): boolean {
  let canonicalModel = _9(model);
  switch (alias.toLowerCase()) {
    case "fable":
      return canonicalModel.includes("fable");
    case "opus":
      return canonicalModel.includes("opus");
    case "sonnet":
      return canonicalModel.includes("sonnet");
    case "haiku":
      return canonicalModel.includes("haiku");
    default:
      return !1;
  }
}

/** Human-readable label for a subagent model selection, including the inherit cases. */
function formatSubagentModelLabel(model: string | undefined): string {
  if (!model) return "Inherit from parent (default)";
  if (model === "inherit") return "Inherit from parent";
  return v0(model);
}

/** Build the list of selectable subagent-model options for the model picker. */
function buildSubagentModelOptions(): Array<{ value: string; label: string; description: string }> {
  let options: Array<{ value: string; label: string; description: string }> = [];
  if ((_qH() || !OO() || l8() === "anthropicAws") && N4($OH()))
    options.push({
      value: "fable",
      label: "Fable",
      description: "Most capable for your hardest and longest-running tasks",
    });
  if (N4(MG()))
    options.push({
      value: "sonnet",
      label: "Sonnet",
      description: "Efficient for routine tasks",
    });
  if (N4(yJ()))
    options.push({
      value: "opus",
      label: "Opus",
      description: "Best for everyday, complex tasks",
    });
  if (N4(mDH()))
    options.push({
      value: "haiku",
      label: "Haiku",
      description: "Fastest for quick answers",
    });
  return (
    options.push({
      value: "inherit",
      label: "Inherit from parent",
      description: "Use the same model as the main conversation",
    }),
    options
  );
}

/** All valid subagent-model `value`s, including the "inherit" sentinel. */
var subagentModelValues: string[];

/** Lazy module initializer: wires up dependency modules and computes `subagentModelValues`. */
var initSubagentModelModule = L(() => {
  xM();
  FH();
  P8();
  bm();
  HOH();
  iq();
  _v();
  V7();
  subagentModelValues = [...DyH, "inherit"];
});

export {defaultSubagentModelMode as Qoo,resolveSubagentModel as gte,warnSubagentModelNotAllowed as Fhp,appendOneMillionContextSuffix as yDa,aliasMatchesModel as TDa,formatSubagentModelLabel as cFn,buildSubagentModelOptions as SDa,subagentModelValues as lFg,initSubagentModelModule as sce};
