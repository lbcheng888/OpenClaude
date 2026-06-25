// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Oa,XNe,Hme,_mn,eO} from "../../vendor/m1456.ts";
import {getAPIProvider as Rr,isFirstPartyAnthropicBaseUrl as Su,isFirstPartyApiBackend as c7,usesFirstPartyModelIds as Vu,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {hasAnthropicDirectApiKey as gxr,getAdditionalModelOptionsCache as xme,isClaudeAISubscriber as Eo,isMaxSubscriber as ese,isTeamPremiumSubscriber as MAe,isEnterprisePAYGSubscriber as Ome,isProSubscriber as Lme,getSubscriptionType as vi,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {getSdkBetas as BT,getMainLoopModelOverride as by,getInitialMainLoopModel as l5,getInferenceProfileBackingModelCached as BSt,lt} from "../session/0132_sent.ts";
import {iE,k_,pF,vmn,Pme,X5,GS} from "../api/2028_used.ts";
import {getSettings_DEPRECATED as $o,getFatalAdminPolicyLoadErrors as dvt,getSettingsForSource as An,hasSurvivingAdminPolicySource as pvt,getPolicySettingsOrigin as Qpe,getEffectiveSettingSource as Xpe,br} from "../config/0745_updateSettingsForSource.ts";
import {Ne,AR} from "../../vendor/m583.ts";
import {nl,iD,T2} from "../../vendor/m1455.ts";
import {Kp,SAe,GJe,gQ} from "../../vendor/m1287.ts";
import {cBs,FNe,h2} from "../../vendor/m1285.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Hf,WS} from "../api/1453_month.ts";
import {uF,hXe,h7} from "../telemetry/1454_model.ts";
import {eCe,Pa} from "../../vendor/m720.ts";
import {getRelativeSettingsFilePathForSource as g3} from "../config/0740_settings.ts";
import {hmn,gmn} from "../api/1455_value.ts";
import {nt} from "../../vendor/m127.ts";
import {dn} from "../config/0137_namespace.ts";
import {Lln,hwt} from "../../vendor/m1026.ts";
// @ts-nocheck
/**
 * Model resolution, naming, and availability/enforcement policy.
 *
 * This module is the central authority for: turning user-facing model aliases
 * (opus/sonnet/haiku/fable/best/opusplan) into concrete model ids, applying
 * the org-managed `enforceAvailableModels` allowlist + `modelOverrides`, the
 * `[1m]` (1M-context) tag handling, and producing human-readable / marketing
 * model names.
 */
var hxr = {};
ft(hxr, {
  swapShrinksContextWindow: () => swapShrinksContextWindow,
  strip1mTag: () => strip1mTag,
  resolvesToDefaultModel: () => resolvesToDefaultModel,
  resolveSkillModelOverride: () => resolveSkillModelOverride,
  resolveModelAliasEnvFree: () => resolveModelAliasEnvFree,
  resetEnforcementWarnDedupForTests: () => resetEnforcementWarnDedupForTests,
  renderModelSetting: () => renderModelSetting,
  renderModelName: () => renderModelName,
  renderDefaultModelSetting: () => renderDefaultModelSetting,
  parseUserSpecifiedModel: () => parseUserSpecifiedModel,
  normalizeModelStringForAPI: () => normalizeModelStringForAPI,
  modelDisplayString: () => modelDisplayString,
  isWindowSilentDefaultPick: () => isWindowSilentDefaultPick,
  isPinnedFableModel: () => isPinnedFableModel,
  isOpus1mMergeEnabled: () => isOpus1mMergeEnabled,
  isNonCustomOpusModel: () => isNonCustomOpusModel,
  isNonCustomMythosModel: () => isNonCustomMythosModel,
  isNonCustomFableModel: () => isNonCustomFableModel,
  isMythosModelValue: () => isMythosModelValue,
  isMythosFamilyOrPinnedModel: () => isMythosFamilyOrPinnedModel,
  isMythosAvailable: () => isMythosAvailable,
  isModelAllowedUnderActiveEnforcement: () => isModelAllowedUnderActiveEnforcement,
  isModelAllowed: () => Oa,
  isModeDependentModelSetting: () => isModeDependentModelSetting,
  isLegacyOpusFirstParty: () => isLegacyOpusFirstParty,
  isLegacyModelRemapEnabled: () => isLegacyModelRemapEnabled,
  isFableModelValue: () => isFableModelValue,
  isFableFamilyOrPinnedModel: () => isFableFamilyOrPinnedModel,
  isFableAvailable: () => isFableAvailable,
  isExemptDefaultResolvingPick: () => isExemptDefaultResolvingPick,
  isDefaultModelEnforced: () => isDefaultModelEnforced,
  getUserSpecifiedModelSetting: () => getUserSpecifiedModelSetting,
  getSmallFastModel: () => getSmallFastModel,
  getRuntimeMainLoopModel: () => getRuntimeMainLoopModel,
  getPublicModelName: () => getPublicModelName,
  getPublicModelDisplayName: () => getPublicModelDisplayName,
  getOpusPricingSuffix: () => getOpusPricingSuffix,
  getModelUnavailabilityReason: () => getModelUnavailabilityReason,
  getModelSourceAnnotation: () => getModelSourceAnnotation,
  getMarketingNameForModel: () => getMarketingNameForModel,
  getMainLoopModel: () => getMainLoopModel,
  getFableDeclineFallbackModel: () => getFableDeclineFallbackModel,
  getEnforcedDefaultModel: () => getEnforcedDefaultModel,
  getDefaultSonnetModel: () => getDefaultSonnetModel,
  getDefaultOpusModel: () => getDefaultOpusModel,
  getDefaultMainLoopModelSetting: () => getDefaultMainLoopModelSetting,
  getDefaultMainLoopModel: () => getDefaultMainLoopModel,
  getDefaultHaikuModel: () => getDefaultHaikuModel,
  getDefaultFableModel: () => getDefaultFableModel,
  getClaudeAiUserDefaultModelDescription: () => getClaudeAiUserDefaultModelDescription,
  getClassifierOpusReroute: () => getClassifierOpusReroute,
  getCanonicalName: () => getCanonicalName,
  getBestModel: () => getBestModel,
  getAntRegistryContextWindow: () => getAntRegistryContextWindow,
  firstPartyNameToCanonical: () => firstPartyNameToCanonical,
  entitlementStepDownDefault: () => entitlementStepDownDefault,
  bytesPerTokenForModel: () => bytesPerTokenForModel,
  antRegistryGrants1M: () => antRegistryGrants1M,
  DEFAULT_MANTLE_OPUS_KEY: () => DEFAULT_MANTLE_OPUS_KEY,
  DEFAULT_3P_SONNET_KEY: () => DEFAULT_3P_SONNET_KEY,
  DEFAULT_3P_OPUS_KEY: () => DEFAULT_3P_OPUS_KEY,
  DEFAULT_3P_HAIKU_KEY: () => DEFAULT_3P_HAIKU_KEY,
  DEFAULT_3P_FABLE_KEY: () => DEFAULT_3P_FABLE_KEY
});
/** Resolve the small/fast (Haiku-tier) model used for background/cheap calls. */
function getSmallFastModel() {
  if (process.env.ANTHROPIC_SMALL_FAST_MODEL) return process.env.ANTHROPIC_SMALL_FAST_MODEL;
  let apiProvider = Rr(),
    preferHaikuTier = apiProvider === "firstParty" && (Su() || gxr()) || apiProvider === "anthropicAws";
  if (!process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL && !preferHaikuTier) return getMainLoopModel();
  return getDefaultHaikuModel();
}
function isNonCustomFableModel(model) {
  return model === "claude-fable-5";
}
function isNonCustomMythosModel(model) {
  return model === "claude-mythos-5";
}
/** True if swapping from `fromModel` to `toModel` shrinks the context window. */
function swapShrinksContextWindow(fromModel, toModel) {
  let betas = BT();
  return iE(toModel, betas) < iE(fromModel, betas);
}
function isNonCustomOpusModel(model) {
  return model === "claude-opus-4-0" || model === "claude-opus-4-1" || model === "claude-opus-4-5" || model === "claude-opus-4-6" || model === "claude-opus-4-7" || model === "claude-opus-4-8";
}
/** The user's explicitly-chosen model setting (override > initial > env > settings), gated by the allowlist. */
function getUserSpecifiedModelSetting() {
  let setting,
    overrideModel = by();
  if (overrideModel !== void 0) setting = overrideModel;else {
    let initialModel = l5();
    setting = initialModel !== void 0 ? initialModel : process.env.ANTHROPIC_MODEL ?? $o()?.model ?? void 0;
  }
  if (setting && !Oa(setting)) return;
  return setting;
}
function getMainLoopModel() {
  let setting = getUserSpecifiedModelSetting();
  if (setting !== void 0 && setting !== null) return parseUserSpecifiedModel(setting);
  return getDefaultMainLoopModel();
}
function getBestModel() {
  if (isFableAvailable()) {
    let fableModel = getDefaultFableModel();
    if (bestModelReentryGuard) return fableModel;
    bestModelReentryGuard = !0;
    try {
      if (Oa(fableModel)) return fableModel;
    } finally {
      bestModelReentryGuard = !1;
    }
  }
  return getDefaultOpusModel();
}
function isFableModelValue(model) {
  return model.includes("claude-fable-5");
}
function isMythosModelValue(model) {
  return model.includes("claude-mythos-5");
}
function isFableAvailable() {
  if (Rr() === "firstParty" && Su() && xme().some(option => option.disabled === !0 && typeof option.value === "string" && isFableModelValue(option.value))) return !1;
  if (process.env.ANTHROPIC_DEFAULT_FABLE_MODEL) return !0;
  let apiProvider = Rr();
  if (apiProvider !== "firstParty" && apiProvider !== "gateway") return !1;
  if (apiProvider === "firstParty" && !Su()) return !1;
  return xme().some(option => option.disabled !== !0 && typeof option.value === "string" && isFableModelValue(option.value));
}
function isMythosAvailable() {
  if (Rr() !== "firstParty" || !Su()) return !1;
  return (xme() ?? []).some(option => option.disabled !== !0 && typeof option.value === "string" && isMythosModelValue(option.value));
}
function isPinnedFableModel(model) {
  let pinnedFable = Ne.ANTHROPIC_DEFAULT_FABLE_MODEL;
  if (!pinnedFable) return !1;
  return nl(model) === nl(pinnedFable);
}
function isFableFamilyOrPinnedModel(model) {
  return nl(getCanonicalName(model)) === "claude-fable-5" || isPinnedFableModel(model);
}
function isMythosFamilyOrPinnedModel(model) {
  return nl(getCanonicalName(model)) === "claude-mythos-5";
}
/** Reroute a classifier model to Opus (optionally tagging [1m]) when appropriate. */
function getClassifierOpusReroute(model) {
  let opusModel = Ne.ANTHROPIC_DEFAULT_OPUS_MODEL;
  if (opusModel === void 0) {
    let registry = Kp();
    if (opusModel = registry.opus48, Rr() === "firstParty") opusModel = cBs.map(key => registry[key]).find(candidate => Oa(candidate)) ?? registry.opus48;
  }
  if ((k_(model) || pF(model)) && !k_(opusModel) && !vmn(getCanonicalName(opusModel))) return opusModel + "[1m]";
  return opusModel;
}
/** Why a model is unavailable (disabled by org, or absent), or null if available. */
function getModelUnavailabilityReason(model, options) {
  if (Rr() !== "firstParty" || !Su()) return null;
  let resolvedModel = iD(model.toLowerCase().trim()) ? parseUserSpecifiedModel(model) : model,
    canonicalize = options?.ignoreModelOverrides ? value => firstPartyNameToCanonical(nl(value.toLowerCase()).trim()) : T9u,
    rawCanonical = canonicalize(model),
    resolvedCanonical = canonicalize(resolvedModel),
    disabledOption = xme().find(option => option.disabled === !0 && typeof option.value === "string" && (canonicalize(option.value) === rawCanonical || canonicalize(option.value) === resolvedCanonical));
  if (disabledOption) return {
    reason: "disabled",
    description: disabledOption.description
  };
  let canonical = options?.ignoreModelOverrides ? firstPartyNameToCanonical(resolvedModel) : getCanonicalName(resolvedModel);
  if (!isFableAvailable() && canonical === "claude-fable-5") return {
    reason: "absent",
    displayName: getPublicModelDisplayName(resolvedModel) ?? "That model"
  };
  if (!isMythosAvailable() && isNonCustomMythosModel(canonical)) return {
    reason: "absent",
    displayName: getPublicModelDisplayName(resolvedModel) ?? "That model"
  };
  return null;
}
function T9u(model) {
  return getCanonicalName(nl(model.toLowerCase()).trim());
}
function S9u(model) {
  return model.toLowerCase().includes("fable");
}
function getAntRegistryContextWindow(model) {
  return;
}
function antRegistryGrants1M(model) {
  return !1;
}
function getDefaultFableModel() {
  let fableModel = process.env.ANTHROPIC_DEFAULT_FABLE_MODEL || dxr();
  return c7() ? strip1mTag(fableModel) : fableModel;
}
function dxr(registry = Kp()) {
  let fableModel = registry.fable5;
  return c7() ? strip1mTag(fableModel) : fableModel;
}
function getDefaultOpusModel() {
  if (process.env.ANTHROPIC_DEFAULT_OPUS_MODEL) return process.env.ANTHROPIC_DEFAULT_OPUS_MODEL;
  return OAe();
}
function OAe(registry = Kp()) {
  if (Rr() === "mantle") return registry[DEFAULT_MANTLE_OPUS_KEY];
  if (!Vu()) return registry[DEFAULT_3P_OPUS_KEY];
  if (Rr() !== "firstParty") return registry.opus47;
  return registry.opus48;
}
function getDefaultSonnetModel() {
  if (process.env.ANTHROPIC_DEFAULT_SONNET_MODEL) return process.env.ANTHROPIC_DEFAULT_SONNET_MODEL;
  return Tmn();
}
function Tmn(registry = Kp()) {
  if (!Vu()) return registry[DEFAULT_3P_SONNET_KEY];
  return registry.sonnet46;
}
function getDefaultHaikuModel() {
  if (process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL) return process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL;
  return pxr();
}
function pxr(registry = Kp()) {
  return registry[DEFAULT_3P_HAIKU_KEY];
}
function isModeDependentModelSetting(setting) {
  return setting === "opusplan" || setting === "haiku";
}
/** Resolve the model to use for the current main loop, applying plan-mode upgrades for opusplan/haiku. */
function getRuntimeMainLoopModel(params) {
  let {
      permissionMode,
      mainLoopModel,
      exceeds200kTokens = !1
    } = params,
    userSetting = getUserSpecifiedModelSetting();
  if ((userSetting === "opusplan" || userSetting === "opusplan[1m]") && permissionMode === "plan" && !exceeds200kTokens) {
    let upgradeModel = userSetting === "opusplan[1m]" || isOpus1mMergeEnabled() ? j5(getDefaultOpusModel()) : getDefaultOpusModel();
    if (!((isModelAllowedUnderActiveEnforcement(upgradeModel) ?? Oa(upgradeModel)) && !XNe(upgradeModel, Hme()))) {
      if (!PM.has("Plan mode: the opusplan upgrade model is not permitted by the org model restrictions (availableModels allowlist or model_access entitlement); planning uses the resting model instead")) PM.add("Plan mode: the opusplan upgrade model is not permitted by the org model restrictions (availableModels allowlist or model_access entitlement); planning uses the resting model instead"), A("Plan mode: the opusplan upgrade model is not permitted by the org model restrictions (availableModels allowlist or model_access entitlement); planning uses the resting model instead", {
        level: "warn"
      });
      return parseUserSpecifiedModel(userSetting);
    }
    return upgradeModel;
  }
  if (getUserSpecifiedModelSetting() === "haiku" && permissionMode === "plan") {
    let sonnetModel = getDefaultSonnetModel();
    if (!((isModelAllowedUnderActiveEnforcement(sonnetModel) ?? Oa(sonnetModel)) && !XNe(sonnetModel, Hme()))) {
      if (!PM.has("Plan mode: the haiku plan upgrade model is not permitted by the org model restrictions (availableModels allowlist or model_access entitlement); planning uses the resting model instead")) PM.add("Plan mode: the haiku plan upgrade model is not permitted by the org model restrictions (availableModels allowlist or model_access entitlement); planning uses the resting model instead"), A("Plan mode: the haiku plan upgrade model is not permitted by the org model restrictions (availableModels allowlist or model_access entitlement); planning uses the resting model instead", {
        level: "warn"
      });
      return parseUserSpecifiedModel("haiku");
    }
    return sonnetModel;
  }
  return mainLoopModel;
}
/** Append the `[1m]` (1M-context) tag to a model id, de-duplicating any existing tag. */
function j5(model) {
  return model.replace(/(\[1m\])+$/i, "") + "[1m]";
}
function getDefaultMainLoopModelSetting() {
  let {
      setting,
      envFamily,
      concreteBaseline
    } = mxr(),
    enforced = getEnforcedDefaultModel(setting, envFamily, concreteBaseline) ?? setting;
  return entitlementStepDownDefault(enforced) ?? enforced;
}
/** Step the default model down a tier (opus->sonnet->haiku) when entitlements forbid the current pick. */
function entitlementStepDownDefault(setting) {
  let entitlements = Hme();
  if (entitlements.size === 0 || !XNe(setting, entitlements)) return null;
  let tiers = [{
      family: "opus",
      model: getDefaultOpusModel()
    }, {
      family: "sonnet",
      model: getDefaultSonnetModel()
    }, {
      family: "haiku",
      model: getDefaultHaikuModel()
    }],
    canonical = getCanonicalName(parseUserSpecifiedModel(setting)),
    matchedTierIndex = tiers.findIndex(tier => canonical.includes(tier.family)),
    startIndex = matchedTierIndex !== -1 ? matchedTierIndex : isFableFamilyOrPinnedModel(parseUserSpecifiedModel(setting)) ? 0 : 1;
  for (let {
    model: tierModel
  } of tiers.slice(startIndex)) if (Oa(tierModel)) return tierModel;
  return null;
}
/** The baseline default setting + its env-family before enforcement/step-down is applied. */
function mxr() {
  if (Eo()) {
    if (ese() || MAe() || Ome()) return {
      setting: isOpus1mMergeEnabled() ? j5(getDefaultOpusModel()) : getDefaultOpusModel(),
      envFamily: "opus"
    };
  } else if (Vu()) return {
    setting: isOpus1mMergeEnabled() ? j5(getDefaultOpusModel()) : getDefaultOpusModel(),
    envFamily: "opus"
  };
  if (Rr() === "mantle") return {
    setting: Kp()[DEFAULT_MANTLE_OPUS_KEY],
    envFamily: null,
    concreteBaseline: String(SAe()[DEFAULT_MANTLE_OPUS_KEY])
  };
  return {
    setting: getDefaultSonnetModel(),
    envFamily: "sonnet"
  };
}
/**
 * Apply the org-managed `enforceAvailableModels` allowlist + `modelOverrides` to
 * resolve a permitted default model, returning null when the given setting is
 * already allowed. Emits dedup'd warnings when no allowlist entry survives.
 */
function getEnforcedDefaultModel(setting, envFamily, concreteBaseline) {
  let settings = $o() || {},
    availableModels = settings.availableModels,
    enforce = settings.enforceAvailableModels,
    overridesMap = {},
    policy = O5s();
  if (policy.state === "refused") return null;
  let cascadeTrustedInactive = policy.state === "inactive" && policy.cascadeTrusted;
  if (policy.state === "active") availableModels = policy.allowlist, enforce = !0, overridesMap = policy.overridesMap;else if (!policy.cascadeTrusted) return null;
  if (!enforce) return null;
  if (cascadeTrustedInactive && Object.keys(overridesMap).length === 0 && settings.modelOverrides) overridesMap = settings.modelOverrides;
  if (!availableModels || availableModels.length === 0) return null;
  let allowlistCtx = {
      overridesMap,
      envFreeAliasResolution: !0,
      allowlist: availableModels
    },
    lookupOverride = aliasOrModel => {
      let canonical = firstPartyNameToCanonical(nl(aliasOrModel));
      for (let [overrideKey, overrideValue] of Object.entries(overridesMap)) if (firstPartyNameToCanonical(nl(overrideKey)) === canonical) return overrideValue;
      return;
    },
    applyOverride = (model, applyOpts) => {
      let normalized = nl(model);
      if (applyOpts?.isConcreteEntry) return model;
      let override = lookupOverride(normalized);
      if (!override?.trim()) return model;
      override = override.trim();
      {
        let overrideAlias = nl(override).trim().toLowerCase(),
          override1m = k_(override),
          aliasResolved = iD(overrideAlias) ? ymn(overrideAlias) : null;
        if (aliasResolved !== null) override = override1m ? j5(aliasResolved) : aliasResolved;else {
          let prefixed = overrideAlias.startsWith("claude-") ? overrideAlias : `claude-${overrideAlias}`;
          if (isLegacyOpusFirstParty(prefixed) && Vu()) {
            let opusModel = OAe(SAe());
            override = override1m ? j5(opusModel) : opusModel;
          }
        }
      }
      if (getModelUnavailabilityReason(nl(override), {
        ignoreModelOverrides: !0
      }) !== null) {
        let warning = `enforceAvailableModels: the managed modelOverrides target "${override}" is server-unavailable; using the unmapped candidate`;
        if (!PM.has(warning)) PM.add(warning), A(warning, {
          level: "warn"
        });
        return model;
      }
      if (normalized !== model) return DAe(override) ? j5(override) : nl(override);
      if (k_(override) && !DAe(override)) return nl(override);
      return override;
    },
    pinnedTierDefault = null,
    settingString = String(setting),
    settingNormalized = nl(settingString.trim().toLowerCase()),
    settingIs1m = k_(setting),
    settingPrefixed = settingNormalized.startsWith("claude-") ? settingNormalized : `claude-${settingNormalized}`,
    settingResolved = isLegacyOpusFirstParty(settingPrefixed) ? OAe(SAe()) : ymn(settingNormalized);
  if (settingResolved !== null) {
    let resolvedTagged = settingNormalized !== settingString.trim().toLowerCase() && DAe(settingResolved) ? j5(settingResolved) : nl(settingResolved),
      parsedSetting = parseUserSpecifiedModel(settingString);
    if (nl(parsedSetting) !== nl(settingResolved)) pinnedTierDefault = resolvedTagged;
    if (Oa(resolvedTagged, allowlistCtx)) if (nl(parsedSetting) !== nl(settingResolved)) {
      if (getModelUnavailabilityReason(resolvedTagged, {
        ignoreModelOverrides: !0
      }) === null) return applyOverride(resolvedTagged);
    } else return null;
  } else {
    let registry = SAe(),
      steeringVarTable = E9u(registry);
    if (envFamily !== void 0) {
      if (envFamily !== null) {
        let row = steeringVarTable.find(([family]) => family === envFamily);
        if (row === void 0) throw Error(`steeringVarTable has no row for tier family "${envFamily}"`);
        let getter = row[3],
          builtinModel = getter();
        if (typeof builtinModel === "string" && nl(builtinModel).toLowerCase() !== settingNormalized) {
          let resolved = getter();
          pinnedTierDefault = settingIs1m && DAe(resolved) ? j5(resolved) : resolved;
        }
      }
      if (envFamily === null && concreteBaseline !== void 0 && nl(concreteBaseline).toLowerCase() !== settingNormalized) pinnedTierDefault = concreteBaseline;
    } else {
      let matchedPriority = (() => {
          for (let [,, priority, getEnvValue] of steeringVarTable) {
            let envValue = getEnvValue();
            if (typeof envValue === "string" && nl(envValue).toLowerCase() === settingNormalized) return priority;
          }
          return null;
        })(),
        rows = steeringVarTable;
      for (let [, envVar, priority, getBuiltin] of rows) {
        if (envVar === void 0 || nl(envVar.trim().toLowerCase()) !== settingNormalized) continue;
        if (matchedPriority !== null && matchedPriority <= priority) continue;
        {
          let builtin = getBuiltin();
          pinnedTierDefault = settingIs1m && DAe(builtin) ? j5(builtin) : builtin;
        }
        break;
      }
    }
    if (Oa(setting, allowlistCtx)) return null;
  }
  let skippedUnavailable = [];
  for (let entry of availableModels) {
    let trimmed = entry.trim();
    if (!trimmed) continue;
    let lowered = trimmed.toLowerCase(),
      normalized = nl(lowered),
      aliasResolved = ymn(normalized);
    if (aliasResolved !== null) {
      let resolvedTagged = lowered !== normalized && DAe(aliasResolved) ? j5(aliasResolved) : aliasResolved;
      if (D5s(resolvedTagged) && Oa(resolvedTagged, allowlistCtx)) {
        if (getModelUnavailabilityReason(resolvedTagged, {
          ignoreModelOverrides: !0
        }) === null) return applyOverride(resolvedTagged);
        skippedUnavailable.push(trimmed);
      }
      continue;
    }
    let strippedNormalized = nl(lowered),
      strippedPrefixed = strippedNormalized.startsWith("claude-") ? strippedNormalized : `claude-${strippedNormalized}`;
    if (isLegacyOpusFirstParty(strippedPrefixed) && Vu()) {
      let opusModel = OAe(SAe()),
        opusTagged = lowered !== strippedNormalized && DAe(opusModel) ? j5(opusModel) : opusModel;
      if (getModelUnavailabilityReason(opusTagged, {
        ignoreModelOverrides: !0
      }) === null) return applyOverride(opusTagged);
      skippedUnavailable.push(trimmed);
      continue;
    }
    let bareModelId = Rr() !== "foundry" && !lowered.startsWith("claude-") && R9u.test(lowered),
      claudePrefixed = bareModelId || Rr() !== "foundry" && lowered.startsWith("claude-"),
      parsed = parseUserSpecifiedModel(bareModelId ? `claude-${lowered}` : claudePrefixed ? lowered : trimmed),
      parsedNormalized = nl(parsed).toLowerCase();
    if (claudePrefixed && !/[-@]\d{8}$/.test(parsedNormalized) && firstPartyNameToCanonical(parsedNormalized) !== parsedNormalized) continue;
    if (!D5s(parsed)) continue;
    let isConcreteEntry = !claudePrefixed || /[-@]\d{8}$/.test(parsedNormalized);
    if (Oa(parsed, allowlistCtx)) {
      if (getModelUnavailabilityReason(parsed, {
        ignoreModelOverrides: !0
      }) === null) {
        let parsedStripped = nl(parsed);
        if (parsedStripped !== parsed) return applyOverride(DAe(parsed) ? parsed : parsedStripped, {
          isConcreteEntry
        });
        return applyOverride(parsed, {
          isConcreteEntry
        });
      }
      skippedUnavailable.push(trimmed);
    }
  }
  let pinnedOverride = pinnedTierDefault !== null ? lookupOverride(pinnedTierDefault) : void 0,
    pinnedIsAdminMapped = pinnedOverride !== void 0 && nl(pinnedOverride).trim().toLowerCase() === nl(setting).trim().toLowerCase(),
    pinnedReason = pinnedTierDefault !== null ? pinnedIsAdminMapped ? "tier default is the admin-mapped value — pinning its canonical builtin (the policy mapping re-applies at the exit)" : "user steering detected — pinning the env-free tier builtin (policy-mapped if applicable)" : "keeping the tier default",
    warning = skippedUnavailable.length > 0 ? `enforceAvailableModels: no availableModels entry survived; ${skippedUnavailable.length} entr${skippedUnavailable.length === 1 ? "y was" : "ies were"} allowed but skipped as server-unavailable (${skippedUnavailable.join(", ")}); ${pinnedReason}` : `enforceAvailableModels: no availableModels entry expands to an allowed model; ${pinnedReason}`;
  if (!PM.has(warning)) PM.add(warning), A(warning, {
    level: "warn"
  });
  return pinnedTierDefault !== null ? applyOverride(pinnedTierDefault) : null;
}
/** True if a model id should receive the `[1m]` tag when promoted (non-firstParty, or opus with 1M merge enabled). */
function DAe(model) {
  let normalized = nl(model).trim().toLowerCase();
  if (!normalized.startsWith("claude-")) return !0;
  return !vmn(firstPartyNameToCanonical(normalized)) && (normalized.includes("opus") ? isOpus1mMergeEnabled() : !0);
}
/** The env-steering var table: [family, envVarValue, priority, () => builtinModel]. */
function E9u(registry) {
  return [["haiku", Ne.ANTHROPIC_DEFAULT_HAIKU_MODEL, 0, () => pxr(registry)], ["sonnet", Ne.ANTHROPIC_DEFAULT_SONNET_MODEL, 1, () => Tmn(registry)], ["opus", Ne.ANTHROPIC_DEFAULT_OPUS_MODEL, 2, () => OAe(registry)]];
}
/** Read the policy-tier enforcement state (active/inactive/refused) with cascade-trust handling. */
function O5s() {
  try {
    let fatalErrors = dvt(),
      policySettings = An("policySettings"),
      warnPartial = surviving => {
        if (!policySettings || fatalErrors.length === 0) return;
        let message = surviving ? "enforceAvailableModels: an admin policy source failed to load; enforcing the surviving admin tier (the failed source may carry a different policy — fix it to restore full coverage)" : "enforceAvailableModels: an admin policy source failed to load and the surviving admin tier carries no model policy — model enforcement is OFF; the failed source may have carried it";
        if (!PM.has(message)) PM.add(message), A(message, {
          level: "warn"
        });
      };
    if (fatalErrors.length > 0 && !pvt()) {
      if (!PM.has("enforceAvailableModels: a policy source exists but failed to load; refusing cascade-trust mode (model enforcement from user/project settings is disabled until the policy source is fixed)")) PM.add("enforceAvailableModels: a policy source exists but failed to load; refusing cascade-trust mode (model enforcement from user/project settings is disabled until the policy source is fixed)"), A("enforceAvailableModels: a policy source exists but failed to load; refusing cascade-trust mode (model enforcement from user/project settings is disabled until the policy source is fixed)", {
        level: "warn"
      });
      return {
        state: "refused"
      };
    }
    if (!policySettings) return {
      state: "inactive",
      cascadeTrusted: !0
    };
    let {
      availableModels,
      enforceAvailableModels,
      modelOverrides
    } = policySettings;
    if (fatalErrors.length === 0 && availableModels === void 0 && enforceAvailableModels === void 0 && modelOverrides === void 0 && Qpe() === "hkcu") return {
      state: "inactive",
      cascadeTrusted: !0
    };
    if (enforceAvailableModels && availableModels === void 0) {
      if (!PM.has("enforceAvailableModels: the policy view sets the enforce flag but not availableModels; enforcement is disabled (the flag requires a policy-owned allowlist)")) PM.add("enforceAvailableModels: the policy view sets the enforce flag but not availableModels; enforcement is disabled (the flag requires a policy-owned allowlist)"), A("enforceAvailableModels: the policy view sets the enforce flag but not availableModels; enforcement is disabled (the flag requires a policy-owned allowlist)", {
        level: "warn"
      });
      return warnPartial(!1), {
        state: "inactive",
        cascadeTrusted: !1
      };
    }
    if (enforceAvailableModels !== !0 || availableModels === void 0 || availableModels.length === 0) return warnPartial(!1), {
      state: "inactive",
      cascadeTrusted: !1
    };
    return warnPartial(!0), {
      state: "active",
      allowlist: availableModels,
      overridesMap: modelOverrides ?? {}
    };
  } catch (err) {
    let message = `enforceAvailableModels: policy-tier settings read failed; refusing cascade-trust mode: ${err instanceof Error ? err.message : String(err)}`;
    if (!PM.has(message)) PM.add(message), A(message, {
      level: "warn"
    });
    return {
      state: "refused"
    };
  }
}
/** True/false if the model is (dis)allowed under active policy enforcement; null when enforcement is inactive. */
function isModelAllowedUnderActiveEnforcement(model) {
  let policy = O5s();
  if (policy.state === "refused") return !1;
  if (policy.state === "inactive") return null;
  let allowlistCtx = {
    allowlist: policy.allowlist,
    overridesMap: policy.overridesMap,
    envFreeAliasResolution: !0
  };
  if (!Oa(model, allowlistCtx)) return !1;
  let lowered = model.trim().toLowerCase(),
    aliasOrModel = /\[1m\]/i.test(lowered) ? nl(lowered).trim() : lowered;
  return !(iD(aliasOrModel) || Vu() && isLegacyOpusFirstParty(aliasOrModel)) || _mn(aliasOrModel, allowlistCtx);
}
function resetEnforcementWarnDedupForTests() {
  PM.clear();
}
function resolvesToDefaultModel(model) {
  return nl(parseUserSpecifiedModel(model)).toLowerCase() === nl(getDefaultMainLoopModel()).toLowerCase();
}
function isExemptDefaultResolvingPick(model) {
  let normalized = nl(model.trim().toLowerCase());
  if (isModeDependentModelSetting(normalized)) return !1;
  if (normalized === "best") return !1;
  return resolvesToDefaultModel(model);
}
function isWindowSilentDefaultPick(model) {
  if (!isExemptDefaultResolvingPick(model)) return !1;
  let lowered = model.trim().toLowerCase();
  return parseUserSpecifiedModel(model).toLowerCase() === getDefaultMainLoopModel().toLowerCase() || iD(lowered) && lowered === nl(lowered);
}
/** Resolve a model alias to its concrete id without consulting env overrides; null if not an alias. */
function resolveModelAliasEnvFree(model) {
  let normalized = nl(model),
    aliasResolved = ymn(normalized);
  if (aliasResolved !== null) return aliasResolved.toLowerCase();
  let prefixed = normalized.startsWith("claude-") ? normalized : `claude-${normalized}`;
  if (Vu() && isLegacyOpusFirstParty(prefixed)) return OAe(SAe()).toLowerCase();
  return null;
}
function D5s(model) {
  let lowered = model.toLowerCase();
  if (A9u.test(lowered)) return !0;
  if (lowered.startsWith("arn:aws:bedrock:")) return !0;
  if (Rr() === "foundry") return !0;
  return !1;
}
/** Resolve a tier alias (opus/sonnet/haiku/fable/opusplan/best) to its concrete builtin model. */
function ymn(alias) {
  let registry = SAe();
  switch (alias) {
    case "opus":
      return OAe(registry);
    case "sonnet":
      return Tmn(registry);
    case "haiku":
      return pxr(registry);
    case "fable":
      return dxr(registry);
    case "opusplan":
      return Tmn(registry);
    case "best":
      return isFableAvailable() ? dxr(registry) : OAe(registry);
    default:
      return null;
  }
}
function isDefaultModelEnforced() {
  let baseline = mxr();
  if (getEnforcedDefaultModel(baseline.setting, baseline.envFamily, baseline.concreteBaseline) !== null) return !0;
  return entitlementStepDownDefault(baseline.setting) !== null;
}
function getDefaultMainLoopModel() {
  return parseUserSpecifiedModel(getDefaultMainLoopModelSetting());
}
/** When the default resolves to Fable but Fable should decline, fall back to the first allowed opus/sonnet/haiku. */
function getFableDeclineFallbackModel() {
  let defaultModel = getDefaultMainLoopModel();
  if (!isFableFamilyOrPinnedModel(defaultModel)) return defaultModel;
  for (let candidate of [getDefaultOpusModel(), getDefaultSonnetModel(), getDefaultHaikuModel()]) {
    if (isFableFamilyOrPinnedModel(candidate)) continue;
    if (isModelAllowedUnderActiveEnforcement(candidate) ?? Oa(candidate)) return candidate;
  }
  return null;
}
/** Map any first-party model id (with/without date suffix) to its canonical family name. */
function firstPartyNameToCanonical(model) {
  if (model = model.toLowerCase(), model.includes("claude-fable-5")) return "claude-fable-5";
  if (model.includes("claude-mythos-5")) return "claude-mythos-5";
  if (model.includes("claude-opus-4-8")) return "claude-opus-4-8";
  if (model.includes("claude-opus-4-7")) return "claude-opus-4-7";
  if (model.includes("claude-opus-4-6")) return "claude-opus-4-6";
  if (model.includes("claude-opus-4-5")) return "claude-opus-4-5";
  if (model.includes("claude-opus-4-1")) return "claude-opus-4-1";
  if (/claude-opus-4(?!-\d(?!\d))/.test(model)) return "claude-opus-4-0";
  if (model.includes("claude-sonnet-4-6")) return "claude-sonnet-4-6";
  if (model.includes("claude-sonnet-4-5")) return "claude-sonnet-4-5";
  if (/claude-sonnet-4(?!-\d(?!\d))/.test(model)) return "claude-sonnet-4-0";
  if (model.includes("claude-haiku-4-5")) return "claude-haiku-4-5";
  if (model.includes("claude-3-7-sonnet")) return "claude-3-7-sonnet";
  if (model.includes("claude-3-5-sonnet")) return "claude-3-5-sonnet";
  if (model.includes("claude-3-5-haiku")) return "claude-3-5-haiku";
  if (model.includes("claude-3-opus")) return "claude-3-opus";
  if (model.includes("claude-3-sonnet")) return "claude-3-sonnet";
  if (model.includes("claude-3-haiku")) return "claude-3-haiku";
  return model.replace(/-\d{8}$/, "");
}
/** Canonical family name for any model id, resolving inference-profile indirection. */
function getCanonicalName(model) {
  let stripped = GJe(model);
  if (stripped !== model) return firstPartyNameToCanonical(stripped);
  if (model.includes("application-inference-profile")) {
    let backing = BSt(normalizeModelStringForAPI(model));
    if (backing) return firstPartyNameToCanonical(backing);
  }
  return firstPartyNameToCanonical(stripped);
}
/** Bytes-per-token estimate for a model (4 for older families, 3 otherwise). */
function bytesPerTokenForModel(model) {
  if (!model) return 4;
  let parsed = parseUserSpecifiedModel(model),
    canonical = nl(getCanonicalName(parsed)).replace(/[._]/g, "-");
  return v9u.has(canonical) ? 4 : 3;
}
/** Human-readable description of the default model for the claude.ai user UI. */
function getClaudeAiUserDefaultModelDescription(includePricing = !1) {
  let baseline = mxr(),
    enforced = getEnforcedDefaultModel(baseline.setting, baseline.envFamily, baseline.concreteBaseline),
    effective = enforced ?? baseline.setting,
    steppedDown = entitlementStepDownDefault(effective) ?? enforced;
  if (steppedDown !== null) return `${getMarketingNameForModel(normalizeModelStringForAPI(steppedDown)) ?? renderModelName(steppedDown)} \xB7 Set by your organization`;
  if (ese() || MAe() || Ome()) {
    let opusModel = getDefaultOpusModel(),
      opusName = getMarketingNameForModel(normalizeModelStringForAPI(opusModel)) ?? "Opus",
      showPricing = includePricing && Hf(opusModel);
    if (isOpus1mMergeEnabled()) return `${opusName} with 1M context \xB7 Best for everyday, complex tasks${showPricing ? getOpusPricingSuffix(!0, opusModel) : ""}`;
    return `${opusName} \xB7 Best for everyday, complex tasks${showPricing ? getOpusPricingSuffix(!0, opusModel) : ""}`;
  }
  return `${getMarketingNameForModel(normalizeModelStringForAPI(getDefaultSonnetModel())) ?? "Sonnet"} \xB7 Efficient for routine tasks`;
}
function renderDefaultModelSetting(setting) {
  if (setting === "opusplan") return "Opus in plan mode, else Sonnet";
  return renderModelName(parseUserSpecifiedModel(setting));
}
function getOpusPricingSuffix(includeLabel, model) {
  if (Rr() !== "firstParty") return "";
  let priceText = uF(hXe(includeLabel, getCanonicalName(model)));
  return ` \xB7${includeLabel ? ` (${eCe})` : ""} ${priceText}`;
}
/** True if Opus + 1M-context merge is enabled for the current account/provider. */
function isOpus1mMergeEnabled() {
  if (Pme() || Lme() || Rr() !== "firstParty") return !1;
  if (Eo() && vi() === null) return !1;
  return !0;
}
function renderModelSetting(setting) {
  if (setting === "opusplan") return "Opus Plan";
  if (iD(setting)) return renderModelName(parseUserSpecifiedModel(setting));
  return renderModelName(setting);
}
function getModelSourceAnnotation() {
  if (by() !== void 0) return "";
  if (process.env.ANTHROPIC_MODEL) return "";
  switch (Xpe("model")) {
    case "projectSettings":
      return ` (from ${g3("projectSettings")})`;
    case "policySettings":
      return " (from managed settings)";
    default:
      return "";
  }
}
/** Public display name for a model id (e.g. "Opus 4.8 (1M context)"), or null if unknown. */
function getPublicModelDisplayName(model) {
  let contextSuffix = model.endsWith("[1m]") ? " (1M context)" : "";
  switch (getCanonicalName(model)) {
    case "claude-fable-5":
      return "Fable 5";
    case "claude-mythos-5":
      return "Mythos 5";
    case "claude-opus-4-8":
      return "Opus 4.8" + contextSuffix;
    case "claude-opus-4-7":
      return "Opus 4.7" + contextSuffix;
    case "claude-opus-4-6":
      return "Opus 4.6" + contextSuffix;
    case "claude-opus-4-5":
      return "Opus 4.5" + contextSuffix;
    case "claude-opus-4-1":
      return "Opus 4.1" + contextSuffix;
    case "claude-opus-4-0":
      return "Opus 4" + contextSuffix;
    case "claude-sonnet-4-6":
      return "Sonnet 4.6" + contextSuffix;
    case "claude-sonnet-4-5":
      return "Sonnet 4.5" + contextSuffix;
    case "claude-sonnet-4-0":
      return "Sonnet 4" + contextSuffix;
    case "claude-3-7-sonnet":
      return "Sonnet 3.7";
    case "claude-3-5-sonnet":
      return "Sonnet 3.5";
    case "claude-haiku-4-5":
      return "Haiku 4.5" + contextSuffix;
    case "claude-3-5-haiku":
      return "Haiku 3.5";
    default:
      return null;
  }
}
function renderModelName(model) {
  let normalized = normalizeModelStringForAPI(model);
  if (FNe(normalized) === null) {
    let labeledOption = [...hmn(), ...xme()].find(option => typeof option.value === "string" && normalizeModelStringForAPI(option.value) === normalized);
    if (labeledOption?.label) return labeledOption.label;
  }
  let displayName = getPublicModelDisplayName(model);
  if (displayName) return displayName;
  return model;
}
function getPublicModelName(model) {
  let displayName = getPublicModelDisplayName(model);
  if (displayName) return `Claude ${displayName}`;
  return `Claude (${model})`;
}
/**
 * Resolve a user-typed model string/alias into the concrete model id to use,
 * preserving/applying the `[1m]` tag per provider rules.
 */
function parseUserSpecifiedModel(input) {
  let trimmed = input.trim(),
    lowered = trimmed.toLowerCase(),
    has1m = k_(lowered),
    normalized = has1m ? nl(lowered).trim() : lowered;
  if (iD(normalized)) switch (normalized) {
    case "fable":
      {
        let fableModel = getDefaultFableModel();
        return fableModel + (has1m && !c7() && !k_(fableModel) ? "[1m]" : "");
      }
    case "opusplan":
      return getDefaultSonnetModel() + (has1m ? "[1m]" : "");
    case "sonnet":
      return getDefaultSonnetModel() + (has1m ? "[1m]" : "");
    case "haiku":
      return getDefaultHaikuModel() + (has1m ? "[1m]" : "");
    case "opus":
      return has1m ? j5(getDefaultOpusModel()) : getDefaultOpusModel();
    case "best":
      return getBestModel();
    default:
  }
  if (Vu() && isLegacyOpusFirstParty(normalized) && isLegacyModelRemapEnabled()) return has1m ? j5(getDefaultOpusModel()) : getDefaultOpusModel();
  if (has1m && c7() && S9u(normalized) && pF(normalized)) return trimmed.replace(/(\[1m\])+$/i, "").trim();
  if (has1m) return trimmed.replace(/(\[1m\])+$/i, "").trim() + "[1m]";
  return trimmed;
}
/** Resolve a skill/command-supplied model override against the session model & allowlist. */
function resolveSkillModelOverride(skillModel, sessionModel) {
  let parsed = parseUserSpecifiedModel(skillModel);
  if (!isExemptDefaultResolvingPick(parsed) && !Oa(parsed)) return A(`Skill/command model "${skillModel}" is not in the availableModels allowlist; keeping the session model`, {
    level: "warn"
  }), sessionModel;
  let sessionHas1m = k_(sessionModel) || pF(sessionModel) || antRegistryGrants1M(sessionModel);
  if (k_(skillModel) || !sessionHas1m) return skillModel;
  let parsedOverride = parseUserSpecifiedModel(skillModel);
  if (pF(parsedOverride)) return parsedOverride;
  if (antRegistryGrants1M(parsedOverride)) return parsedOverride;
  if (X5(parsedOverride)) return skillModel + "[1m]";
  return skillModel;
}
function isLegacyOpusFirstParty(model) {
  return w9u.includes(model);
}
function isLegacyModelRemapEnabled() {
  return !nt(process.env.CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP);
}
function modelDisplayString(model) {
  if (model === null) {
    if (Eo()) return `Default (${getClaudeAiUserDefaultModelDescription()})`;
    return `Default (${getDefaultMainLoopModel()})`;
  }
  let parsed = parseUserSpecifiedModel(model);
  return model === parsed ? parsed : `${model} (${parsed})`;
}
/** Marketing name for a model id (e.g. "Opus 4.8 (1M context)"), or undefined. */
function getMarketingNameForModel(model) {
  if (Rr() === "foundry") return;
  let has1m = model.toLowerCase().includes("[1m]"),
    canonical = getCanonicalName(model);
  if (canonical === "claude-fable-5") return "Fable 5";
  if (canonical === "claude-mythos-5") return "Mythos 5";
  if (canonical === "claude-opus-4-8") return has1m ? "Opus 4.8 (1M context)" : "Opus 4.8";
  if (canonical === "claude-opus-4-7") return has1m ? "Opus 4.7 (1M context)" : "Opus 4.7";
  if (canonical === "claude-opus-4-6") return has1m ? "Opus 4.6 (1M context)" : "Opus 4.6";
  if (canonical === "claude-opus-4-5") return "Opus 4.5";
  if (canonical === "claude-opus-4-1") return "Opus 4.1";
  if (canonical === "claude-opus-4-0") return "Opus 4";
  if (canonical === "claude-sonnet-4-6") return has1m ? "Sonnet 4.6 (1M context)" : "Sonnet 4.6";
  if (canonical === "claude-sonnet-4-5") return has1m ? "Sonnet 4.5 (1M context)" : "Sonnet 4.5";
  if (canonical === "claude-sonnet-4-0") return has1m ? "Sonnet 4 (1M context)" : "Sonnet 4";
  if (canonical === "claude-3-7-sonnet") return "Claude 3.7 Sonnet";
  if (canonical === "claude-3-5-sonnet") return "Claude 3.5 Sonnet";
  if (canonical === "claude-haiku-4-5") return "Haiku 4.5";
  if (canonical === "claude-3-5-haiku") return "Claude 3.5 Haiku";
  return;
}
/** Strip the `[1m]`/`[2m]` context tags for API calls. */
function normalizeModelStringForAPI(model) {
  return model.replace(/\[(1|2)m\]/gi, "");
}
function strip1mTag(model) {
  return model.replace(/\[1m\]/gi, "");
}
var bestModelReentryGuard = !1,
  DEFAULT_3P_OPUS_KEY = "opus46",
  DEFAULT_3P_SONNET_KEY = "sonnet45",
  DEFAULT_3P_HAIKU_KEY = "haiku45",
  DEFAULT_MANTLE_OPUS_KEY = "opus47",
  DEFAULT_3P_FABLE_KEY = "fable5",
  PM,
  A9u,
  R9u,
  v9u,
  w9u;
var Ro = b(() => {
  lt();
  lo();
  GS();
  AR();
  dn();
  gQ();
  h7();
  br();
  Ps();
  WS();
  Pa();
  h2();
  gmn();
  eO();
  eO();
  T2();
  qe();
  Lln();
  PM = new Set();
  A9u = new RegExp(`^((${hwt.join("|")})\\.)?(anthropic\\.|claude-)`);
  R9u = /^[a-z]+-\d/;
  v9u = new Set(["claude-3-opus", "claude-3-sonnet", "claude-3-haiku", "claude-3-5-sonnet", "claude-3-5-haiku", "claude-3-7-sonnet", "claude-opus-4-0", "claude-opus-4-1", "claude-opus-4-5", "claude-opus-4-6", "claude-sonnet-4-0", "claude-sonnet-4-5", "claude-sonnet-4-6", "claude-haiku-4-5"]);
  w9u = ["claude-opus-4-20250514", "claude-opus-4-1-20250805", "claude-opus-4-0", "claude-opus-4-1"];
});

export {hxr,getSmallFastModel,isNonCustomFableModel,isNonCustomMythosModel,swapShrinksContextWindow,isNonCustomOpusModel,getUserSpecifiedModelSetting,getMainLoopModel,getBestModel,isFableModelValue,isMythosModelValue,isFableAvailable,isMythosAvailable,isPinnedFableModel,isFableFamilyOrPinnedModel,isMythosFamilyOrPinnedModel,getClassifierOpusReroute,getModelUnavailabilityReason,T9u,S9u,getAntRegistryContextWindow,antRegistryGrants1M,getDefaultFableModel,dxr,getDefaultOpusModel,OAe,getDefaultSonnetModel,Tmn,getDefaultHaikuModel,pxr,isModeDependentModelSetting,getRuntimeMainLoopModel,j5,getDefaultMainLoopModelSetting,entitlementStepDownDefault,mxr,getEnforcedDefaultModel,DAe,E9u,O5s,isModelAllowedUnderActiveEnforcement,resetEnforcementWarnDedupForTests,resolvesToDefaultModel,isExemptDefaultResolvingPick,isWindowSilentDefaultPick,resolveModelAliasEnvFree,D5s,ymn,isDefaultModelEnforced,getDefaultMainLoopModel as Kg,getFableDeclineFallbackModel,firstPartyNameToCanonical,getCanonicalName,bytesPerTokenForModel,getClaudeAiUserDefaultModelDescription,renderDefaultModelSetting,getOpusPricingSuffix,isOpus1mMergeEnabled,renderModelSetting,getModelSourceAnnotation,getPublicModelDisplayName,renderModelName,getPublicModelName,parseUserSpecifiedModel,resolveSkillModelOverride,isLegacyOpusFirstParty,isLegacyModelRemapEnabled,modelDisplayString,getMarketingNameForModel,normalizeModelStringForAPI,strip1mTag,bestModelReentryGuard as uxr,DEFAULT_3P_OPUS_KEY,DEFAULT_3P_SONNET_KEY,DEFAULT_3P_HAIKU_KEY,DEFAULT_MANTLE_OPUS_KEY,DEFAULT_3P_FABLE_KEY,PM,A9u,R9u,v9u,w9u,Ro};
