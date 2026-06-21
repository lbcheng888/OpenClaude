// @ts-nocheck
import {getCanonicalName,isLegacyOpusFirstParty,isLegacyModelRemapEnabled,getDefaultOpusModel,getMarketingNameForModel,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {$l,X2} from "../../vendor/m1450.ts";
import {getAPIProvider,usesFirstPartyModelIds,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {T_,jS} from "../api/2023_used.ts";
import {b} from "../../runtime.ts";
/**
 * Look up deprecation info for a model string.
 * Returns { isDeprecated, modelName, retirementDate, remappedTo } or { isDeprecated: false }.
 */
function VVn(modelId: any) {
  let canonicalName = getCanonicalName($l(modelId)),
    provider = getAPIProvider(),
    trimmedLower = modelId.trim().toLowerCase(),
    // If the trimmed/lowercased string is itself a valid model id, canonicalize it; otherwise use as-is
    resolvedId = T_(trimmedLower) ? $l(trimmedLower).trim() : trimmedLower,
    // Check if this model is a legacy Opus that should be remapped
    isLegacyRemap = usesFirstPartyModelIds() && isLegacyOpusFirstParty(resolvedId) && isLegacyModelRemapEnabled(),
    // Look up deprecation record by canonical name
    deprecationRecord: any = Object.hasOwn(tHl, canonicalName) ? tHl[canonicalName] : void 0;
  if (deprecationRecord) {
    let retirementDate = deprecationRecord.retirementDates[provider];
    if (retirementDate || isLegacyRemap) return {
      isDeprecated: !0,
      modelName: deprecationRecord.modelName,
      retirementDate: retirementDate,
      remappedTo: isLegacyRemap ? deprecationRecord.remappedTo ?? null : null
    };
  }
  return {
    isDeprecated: !1
  };
}

/** Returns true if the model is currently deprecated/retired (or legacy-remapped). */
function nHl(modelId: any) {
  if (usesFirstPartyModelIds() && isLegacyOpusFirstParty(getCanonicalName($l(modelId))) && isLegacyModelRemapEnabled()) return !0;
  let deprecationInfo = VVn(modelId);
  if (!deprecationInfo.isDeprecated) return !1;
  if (deprecationInfo.remappedTo) return !0;
  if (deprecationInfo.retirementDate) {
    let retirementDateObj = new Date(deprecationInfo.retirementDate);
    return !Number.isNaN(retirementDateObj.getTime()) && retirementDateObj < new Date();
  }
  return !1;
}

/** Returns a short deprecation notice { message, action } for inline display, or null if not deprecated. */
function rHl(modelId: any) {
  if (!modelId) return null;
  let deprecationInfo = VVn(modelId);
  if (!deprecationInfo.isDeprecated) return null;
  if (deprecationInfo.remappedTo) return {
    message: `${deprecationInfo.modelName} now runs as ${deprecationInfo.remappedTo}`,
    action: "/model to change"
  };
  if (deprecationInfo.retirementDate) {
    let retirementDateObj = new Date(deprecationInfo.retirementDate),
      isAlreadyRetired = !Number.isNaN(retirementDateObj.getTime()) && retirementDateObj < new Date();
    return {
      message: `${deprecationInfo.modelName} ${isAlreadyRetired ? "retired" : "retires"} ${deprecationInfo.retirementDate}`,
      action: "/model to switch"
    };
  }
  return null;
}

/** Returns a warning banner string for legacy-remapped models (⚠ prefix), or delegates to eRo for other deprecations. */
function KVn(modelId: any) {
  if (!modelId) return null;
  let deprecationInfo = VVn(modelId);
  if (!deprecationInfo.isDeprecated || !deprecationInfo.remappedTo) return eRo(modelId);
  let defaultOpusModel = getDefaultOpusModel(),
    marketingName = getMarketingNameForModel(defaultOpusModel) ?? defaultOpusModel;
  return `⚠ ${deprecationInfo.modelName.replace(/^Claude /, "")} remaps to ${marketingName}. CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP=1 opts out`;
}

/** Returns a full-detail deprecation warning string, or null if not deprecated. */
function eRo(modelId: any) {
  if (!modelId) return null;
  let deprecationInfo = VVn(modelId);
  if (!deprecationInfo.isDeprecated) return null;
  if (deprecationInfo.remappedTo) {
    let defaultOpusModel = getDefaultOpusModel(),
      marketingName = getMarketingNameForModel(defaultOpusModel) ?? defaultOpusModel;
    return `⚠ ${modelId.trim()} is automatically remapped to ${marketingName} (${deprecationInfo.remappedTo}). Set CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP=1 to keep the requested model.`;
  }
  if (deprecationInfo.retirementDate) {
    let retirementDateObj = new Date(deprecationInfo.retirementDate),
      retiredVerb = !Number.isNaN(retirementDateObj.getTime()) && retirementDateObj < new Date() ? "was retired on" : "will be retired on";
    return `⚠ ${deprecationInfo.modelName} ${retiredVerb} ${deprecationInfo.retirementDate}. Consider switching to a newer model.`;
  }
  return null;
}

/** Model deprecation/retirement registry, keyed by canonical model id. */
var tHl: any;
var R8t = b(() => {
  jS();
  X2();
  Mo();
  li();
  tHl = {
    "claude-opus-4-1": {
      modelName: "Claude Opus 4.1",
      retirementDates: {
        firstParty: null,
        bedrock: null,
        vertex: null,
        foundry: null,
        anthropicAws: null,
        mantle: null,
        gateway: null
      },
      remappedTo: "the latest Opus"
    },
    "claude-opus-4-0": {
      modelName: "Claude Opus 4",
      retirementDates: {
        firstParty: "June 15, 2026",
        bedrock: "May 31, 2026",
        vertex: "September 14, 2026",
        foundry: null,
        anthropicAws: null,
        mantle: null,
        gateway: null
      },
      remappedTo: "the latest Opus"
    },
    "claude-sonnet-4-0": {
      modelName: "Claude Sonnet 4",
      retirementDates: {
        firstParty: "June 15, 2026",
        bedrock: "October 14, 2026",
        vertex: "September 14, 2026",
        foundry: null,
        anthropicAws: null,
        mantle: null,
        gateway: null
      }
    },
    "claude-3-opus": {
      modelName: "Claude 3 Opus",
      retirementDates: {
        firstParty: "January 5, 2026",
        bedrock: "January 15, 2026",
        vertex: "January 5, 2026",
        foundry: "January 5, 2026",
        anthropicAws: null,
        mantle: null,
        gateway: null
      }
    },
    "claude-3-7-sonnet": {
      modelName: "Claude 3.7 Sonnet",
      retirementDates: {
        firstParty: "February 19, 2026",
        bedrock: "April 28, 2026",
        vertex: "May 11, 2026",
        foundry: "February 19, 2026",
        anthropicAws: null,
        mantle: null,
        gateway: null
      }
    },
    "claude-3-5-haiku": {
      modelName: "Claude 3.5 Haiku",
      retirementDates: {
        firstParty: "February 19, 2026",
        bedrock: null,
        vertex: null,
        foundry: null,
        anthropicAws: null,
        mantle: null,
        gateway: null
      }
    }
  };
});
export {VVn,nHl,rHl,KVn,eRo,tHl,R8t};
