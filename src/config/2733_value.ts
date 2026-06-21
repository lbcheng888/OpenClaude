// @ts-nocheck
import {isDefaultModelEnforced,getClaudeAiUserDefaultModelDescription,getDefaultMainLoopModelSetting,getOpusPricingSuffix,renderDefaultModelSetting,getDefaultOpusModel,getDefaultHaikuModel,isOpus1mMergeEnabled,getDefaultSonnetModel,getCanonicalName,getMarketingNameForModel,normalizeModelStringForAPI,getDefaultFableModel,getDefaultMainLoopModel,parseUserSpecifiedModel,getUserSpecifiedModelSetting,isFableModelValue,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {isClaudeAISubscriber,getSubscriptionType,isMaxSubscriber,isTeamPremiumSubscriber,isEnterprisePAYGSubscriber,getAdditionalModelOptionsCache,isTeamSubscriber,Ao} from "./2031_withOAuthRefreshLock.ts";
import {usesFirstPartyModelIds,getAPIProvider,isFirstPartyAnthropicBaseUrl,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {vA,tE} from "../api/1448_month.ts";
import {$B,Voe,Sme,DRr,IRr,P8} from "../telemetry/1449_model.ts";
import {jB,T_,jS} from "../api/2023_used.ts";
import {Im,yQ} from "../../vendor/m1282.ts";
import {D0,X$,xwn,the,RFi,eW} from "../telemetry/2730_raw.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {dee,nhe,Iwn} from "../../vendor/m2730.ts";
import {bd,z2} from "../../vendor/m1280.ts";
import {getInitialSettings,getSettings_DEPRECATED,yr} from "./0740_updateSettingsForSource.ts";
import {je} from "../../vendor/m577.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {OFi,k8r} from "../../vendor/m2731.ts";
import {Dun,Pun} from "../api/1450_value.ts";
import {getInitialMainLoopModel,lt} from "../session/0131_sent.ts";
import {isModelAllowed,MO} from "../../vendor/m1451.ts";
import {Lw,nP,vFe,yve,Om} from "./2215_level.ts";
import {uXe,isFastModeEligible} from "../telemetry/2027_word.ts";
import {XCe,jR} from "./2028_allowed.ts";
import {Cw,LB} from "../../vendor/m1284.ts";
import {b} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
/** Returns an org-enforcement suffix string for model labels. */
function Kwd() {
  return isDefaultModelEnforced() ? " \xB7 Set by your organization" : "";
}

/** Builds the "Default (recommended)" model option for the picker. */
function Dwn(isPricingVisible: any) {
  if (isClaudeAISubscriber()) return {
    value: null,
    label: "Default (recommended)",
    description: getClaudeAiUserDefaultModelDescription(isPricingVisible)
  };
  let isThirdParty = !usesFirstPartyModelIds(),
    defaultSetting = getDefaultMainLoopModelSetting(),
    isOpusDefault = isPricingVisible && vA(defaultSetting),
    pricingSuffix = isThirdParty || isDefaultModelEnforced() ? "" : isOpusDefault ? getOpusPricingSuffix(!0, defaultSetting) : ` \xB7 ${$B(Voe)}`;
  return {
    value: null,
    label: isThirdParty ? "Default" : "Default (recommended)",
    description: `Use the default model (currently ${renderDefaultModelSetting(defaultSetting)})${pricingSuffix}${Kwd()}`
  };
}

/** Returns true when custom model overrides are applicable (non-first-party or AWS or custom base URL). */
function Mwn() {
  return !usesFirstPartyModelIds() || getAPIProvider() === "anthropicAws" || !isFirstPartyAnthropicBaseUrl();
}

/** Returns true when the default Opus model has a 1M context variant. */
function H8r() {
  return jB(getDefaultOpusModel());
}

/** Builds a custom Sonnet option from env overrides if applicable. */
function MFi() {
  let envSonnetModel = process.env.ANTHROPIC_DEFAULT_SONNET_MODEL;
  if (Mwn() && envSonnetModel) {
    let is1m = T_(envSonnetModel);
    return {
      value: "sonnet",
      label: process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_NAME ?? envSonnetModel,
      description: process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION ?? `Custom Sonnet model${is1m ? " (1M context)" : ""}`,
      descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION ?? `Custom Sonnet model${is1m ? " with 1M context" : ""}`} (${envSonnetModel})`
    };
  }
}

/** Standard Sonnet 4.6 picker option. */
function D8r() {
  let isThirdParty = !usesFirstPartyModelIds();
  return {
    value: isThirdParty ? Im().sonnet46 : "sonnet",
    label: "Sonnet",
    description: `Sonnet 4.6 \xB7 ${Lwn}${isThirdParty ? "" : ` \xB7 ${$B(Sme)}`}`,
    descriptionForModel: "Sonnet 4.6 - efficient for routine tasks. Generally recommended for most coding tasks"
  };
}

/** Builds a custom Fable option from env overrides if applicable. */
function NFi() {
  let envFableModel = process.env.ANTHROPIC_DEFAULT_FABLE_MODEL;
  if (Mwn() && envFableModel) return {
    value: "fable",
    label: process.env.ANTHROPIC_DEFAULT_FABLE_MODEL_NAME ?? envFableModel,
    description: process.env.ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION ?? "Custom Fable model",
    descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION ?? "Custom Fable model"} (${envFableModel})`
  };
}

/** Standard Fable 5 picker option with plan limit display. */
function P8r() {
  let isThirdParty = !usesFirstPartyModelIds(),
    descriptionText = `Fable 5 \xB7 ${VFi}`;
  if (!D0()) if (X$()) descriptionText += " \xB7 Draws from usage credits";else {
    let planEndLabel = xwn(the().planLimitsEndDate);
    if (planEndLabel !== void 0) descriptionText += ` \xB7 Included with your plan until ${planEndLabel}`;
  }
  return {
    value: isThirdParty ? Im().fable5 : "fable",
    label: "Fable",
    description: descriptionText,
    descriptionForModel: "Fable 5 - most capable for your hardest and longest-running tasks"
  };
}

/** Builds a custom Opus option from env overrides if applicable. */
function BFi() {
  let envOpusModel = process.env.ANTHROPIC_DEFAULT_OPUS_MODEL;
  if (Mwn() && envOpusModel) {
    let is1m = T_(envOpusModel);
    return {
      value: "opus",
      label: process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME ?? envOpusModel,
      description: process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION ?? `Custom Opus model${is1m ? " (1M context)" : ""}`,
      descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION ?? `Custom Opus model${is1m ? " with 1M context" : ""}`} (${envOpusModel})`
    };
  }
}

/** Legacy Opus 4.1 picker option. */
function zwd() {
  return {
    value: Im().opus41,
    label: "Opus 4.1",
    description: "Opus 4.1 \xB7 Legacy",
    descriptionForModel: "Opus 4.1 - legacy version"
  };
}

/** Legacy Opus 4.6 picker option. */
function Ywd() {
  return {
    value: !usesFirstPartyModelIds() ? Im().opus46 : "claude-opus-4-6",
    label: "Opus 4.6",
    description: "Opus 4.6 \xB7 Legacy",
    descriptionForModel: "Opus 4.6 - previous Opus version"
  };
}

/** Legacy Opus 4.7 picker option. */
function Jwd() {
  return {
    value: !usesFirstPartyModelIds() ? Im().opus47 : "claude-opus-4-7",
    label: "Opus 4.7",
    description: "Opus 4.7 \xB7 Legacy",
    descriptionForModel: "Opus 4.7 - previous Opus version"
  };
}

/** Standard Opus 4.8 picker option. */
function KFi(showPricing: any = !1) {
  let isThirdParty = !usesFirstPartyModelIds(),
    pricingSuffix = getOpusPricingSuffix(showPricing, "claude-opus-4-8");
  return {
    value: isThirdParty ? Im().opus48 : "opus",
    label: "Opus",
    description: `Opus 4.8 \xB7 ${mOt}${isThirdParty ? "" : pricingSuffix}`,
    descriptionForModel: "Opus 4.8 - best for everyday, complex tasks"
  };
}

/** Standard Sonnet 4.6 with 1M context picker option. */
function FFi() {
  let isThirdParty = !usesFirstPartyModelIds();
  return {
    value: isThirdParty ? Im().sonnet46 + "[1m]" : "sonnet[1m]",
    label: "Sonnet (1M context)",
    description: `Sonnet 4.6 for long sessions${isThirdParty ? "" : ` \xB7 ${$B(Sme)}`}`,
    descriptionForModel: "Sonnet 4.6 with 1M context window - for long sessions with large codebases"
  };
}

/** Legacy Opus 4.6 with 1M context picker option. */
function Xwd(showPricing: any = !1, includePricingSuffix: any = !0) {
  return {
    value: !usesFirstPartyModelIds() ? Im().opus46 + "[1m]" : "claude-opus-4-6[1m]",
    label: "Opus 4.6 (1M context)",
    description: `Opus 4.6 for long sessions${includePricingSuffix ? getOpusPricingSuffix(showPricing, "claude-opus-4-6") : ""}`,
    descriptionForModel: "Opus 4.6 with 1M context window - for long sessions with large codebases"
  };
}

/** Legacy Opus 4.7 with 1M context picker option. */
function Qwd() {
  return {
    value: !usesFirstPartyModelIds() ? Im().opus47 + "[1m]" : "claude-opus-4-7[1m]",
    label: "Opus 4.7 (1M context)",
    description: "Opus 4.7 for long sessions",
    descriptionForModel: "Opus 4.7 with 1M context window - for long sessions with large codebases"
  };
}

/** Standard Opus 4.8 with 1M context picker option. */
function UFi(showPricing: any = !1) {
  let isThirdParty = !usesFirstPartyModelIds(),
    pricingSuffix = getOpusPricingSuffix(showPricing, "claude-opus-4-8");
  return {
    value: isThirdParty ? Im().opus48 + "[1m]" : "opus[1m]",
    label: "Opus (1M context)",
    description: `Opus 4.8 for long sessions${isThirdParty ? "" : pricingSuffix}`,
    descriptionForModel: "Opus 4.8 with 1M context window - for long sessions with large codebases"
  };
}

/** Builds a custom Haiku option from env overrides if applicable. */
function $Fi() {
  let envHaikuModel = process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL;
  if (Mwn() && envHaikuModel) return {
    value: "haiku",
    label: process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME ?? envHaikuModel,
    description: process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION ?? "Custom Haiku model",
    descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION ?? "Custom Haiku model"} (${envHaikuModel})`
  };
}

/** Standard Haiku 4.5 picker option. */
function zFi() {
  let isThirdParty = !usesFirstPartyModelIds();
  return {
    value: "haiku",
    label: "Haiku",
    description: `Haiku 4.5 \xB7 ${L8r}${isThirdParty ? "" : ` \xB7 ${$B(DRr)}`}`,
    descriptionForModel: "Haiku 4.5 - fastest for quick answers. Lower cost but less capable than Sonnet 4.6."
  };
}

/** Legacy Haiku 3.5 picker option. */
function Zwd() {
  return {
    value: "haiku",
    label: "Haiku",
    description: `Haiku 3.5 for simple tasks${!usesFirstPartyModelIds() ? "" : ` \xB7 ${$B(IRr)}`}`,
    descriptionForModel: "Haiku 3.5 - faster and lower cost, but less capable than Sonnet. Use for simple tasks."
  };
}

/** Returns the appropriate current Haiku option (4.5 vs 3.5) based on the default haiku model. */
function eRd() {
  return getDefaultHaikuModel() === Im().haiku45 ? zFi() : Zwd();
}

/** Returns a usage-multiplier suffix for Opus on Pro subscriptions with the feature flag enabled. */
function M8r() {
  if (getSubscriptionType() === "pro" && getFeatureValue_CACHED_MAY_BE_STALE("tengu_gypsum_kite", !1)) return " \xB7 ~2\xD7 usage vs Sonnet";
  return "";
}

/** Simplified Opus option used for Claude.ai subscriber pickers (no detailed pricing). */
function N8r(showPricing: any = !1) {
  let isThirdParty = !usesFirstPartyModelIds();
  return {
    value: "opus",
    label: "Opus",
    description: `Opus 4.8 \xB7 ${mOt}${M8r()}${isThirdParty || !showPricing ? "" : ` \xB7 ${$B(Voe)}`}`
  };
}

/** Sonnet 1M context option for Claude.ai subscribers. */
function qFi() {
  let isThirdParty = !usesFirstPartyModelIds(),
    creditsLabel = isClaudeAISubscriber() ? " \xB7 Draws from usage credits" : "";
  return {
    value: "sonnet[1m]",
    label: "Sonnet (1M context)",
    description: `Sonnet 4.6 with 1M context${creditsLabel}${!(creditsLabel !== "" && !isThirdParty) ? "" : ` \xB7 ${$B(Sme)}`}`
  };
}

/** Opus 1M context option for Claude.ai subscribers. */
function jFi() {
  let isThirdParty = !usesFirstPartyModelIds(),
    creditsLabel = isClaudeAISubscriber() ? " \xB7 Draws from usage credits" : "",
    showPricingSuffix = creditsLabel !== "" && !isThirdParty;
  return {
    value: "opus[1m]",
    label: "Opus (1M context)",
    description: `Opus 4.8 with 1M context${M8r()}${creditsLabel}${!showPricingSuffix ? "" : ` \xB7 ${$B(Voe)}`}`
  };
}

/** Full Opus 4.8 with 1M context picker option (with optional pricing). */
function YFi(showPricing: any = !1, showPricingSuffix: any = !1) {
  let isThirdParty = !usesFirstPartyModelIds(),
    pricingSuffix = getOpusPricingSuffix(showPricingSuffix, "claude-opus-4-8");
  return {
    value: isThirdParty ? Im().opus48 + "[1m]" : "opus[1m]",
    label: "Opus (1M context)",
    description: `Opus 4.8 with 1M context \xB7 ${mOt}${M8r()}${isThirdParty || !showPricing ? "" : pricingSuffix}`,
    descriptionForModel: "Opus 4.8 with 1M context - best for everyday, complex tasks"
  };
}

/** Opus 4.8 with 1M context but labeled as "Opus" (label-override variant of YFi). */
function JFi(showPricing: any = !1, showPricingSuffix: any = !1) {
  return {
    ...YFi(showPricing, showPricingSuffix),
    label: "Opus"
  };
}

/** Opus Plan Mode picker option (uses Opus for planning, Sonnet otherwise). */
function tRd() {
  return {
    value: "opusplan",
    label: "Opus Plan Mode",
    description: "Use Opus in plan mode, Sonnet otherwise"
  };
}

/**
 * Injects a synthetic picker option for the current default model when it is not already
 * present in the list (e.g. if the user's org default is Sonnet/Opus but that exact entry
 * isn't in the standard list).
 */
function I8r(optionsList: any, showPricing: any) {
  let familyName = O8r(getDefaultMainLoopModelSetting());
  if (familyName !== "opus" && familyName !== "sonnet") return optionsList;
  let is1mMerge = familyName === "opus" && isOpus1mMergeEnabled();
  if (optionsList.some((item: any) => item.value === familyName || is1mMerge && item.value === `${familyName}[1m]`)) return optionsList;
  let isSubscriber = isClaudeAISubscriber(),
    syntheticOption: any;
  if (familyName === "sonnet") {
    let defaultSonnet = getDefaultSonnetModel();
    if (getCanonicalName(defaultSonnet) === "claude-sonnet-4-6") syntheticOption = isSubscriber ? XFi : D8r();else {
      let marketingName = getMarketingNameForModel(normalizeModelStringForAPI(defaultSonnet)) ?? "Sonnet";
      syntheticOption = {
        value: "sonnet",
        label: "Sonnet",
        description: `${marketingName} \xB7 ${Lwn}`,
        descriptionForModel: `${marketingName} - efficient for routine tasks`
      };
    }
  } else if (is1mMerge) syntheticOption = JFi(!isSubscriber, showPricing);else {
    let defaultOpus = getDefaultOpusModel();
    if (getCanonicalName(defaultOpus) === "claude-opus-4-8") syntheticOption = isSubscriber ? N8r(!1) : KFi(showPricing);else {
      let marketingName = getMarketingNameForModel(normalizeModelStringForAPI(defaultOpus)) ?? "Opus";
      syntheticOption = {
        value: "opus",
        label: "Opus",
        description: `${marketingName} \xB7 ${mOt}${isSubscriber ? "" : getOpusPricingSuffix(showPricing, defaultOpus)}`,
        descriptionForModel: `${marketingName} - best for everyday, complex tasks`
      };
    }
  }
  return optionsList.splice(optionsList.findIndex((item: any) => item.value === null) + 1, 0, syntheticOption), optionsList;
}

/** Builds the full model option list for the model picker based on subscription/provider context. */
function nRd(showPricing: any = !1) {
  if (isClaudeAISubscriber()) {
    if (isMaxSubscriber() || isTeamPremiumSubscriber() || isEnterprisePAYGSubscriber()) {
      let maxOptions = [Dwn(showPricing)];
      if (!isOpus1mMergeEnabled() && dee() && !H8r()) maxOptions.push(jFi());
      if (maxOptions.push(XFi), nhe()) maxOptions.push(qFi());
      return maxOptions.push(WFi), I8r(maxOptions, showPricing);
    }
    let proOptions = [Dwn(showPricing)];
    if (nhe()) proOptions.push(qFi());
    if (isOpus1mMergeEnabled()) proOptions.push(JFi());else if (proOptions.push(N8r(!1)), dee() && !H8r()) proOptions.push(jFi());
    return proOptions.push(WFi), I8r(proOptions, showPricing);
  }
  if (usesFirstPartyModelIds()) {
    let firstPartyOptions = [Dwn(showPricing)],
      customOpus = BFi();
    if (customOpus !== void 0) firstPartyOptions.push(customOpus);else if (!isOpus1mMergeEnabled() && dee() && !H8r()) firstPartyOptions.push(UFi(showPricing));
    let customSonnet = MFi();
    if (customSonnet !== void 0) firstPartyOptions.push(customSonnet);else if (firstPartyOptions.push(D8r()), nhe()) firstPartyOptions.push(FFi());
    firstPartyOptions.push($Fi() ?? zFi());
    let customFable = NFi();
    if (customFable !== void 0) ent(firstPartyOptions, customFable);else if (getAPIProvider() === "anthropicAws" && rhe("fable5")) ent(firstPartyOptions, P8r());
    return I8r(firstPartyOptions, showPricing);
  }
  let thirdPartyOptions = [Dwn(showPricing)],
    customSonnet = MFi();
  if (customSonnet !== void 0) thirdPartyOptions.push(customSonnet);else if (rhe("sonnet46")) {
    if (thirdPartyOptions.push(D8r()), nhe()) thirdPartyOptions.push(FFi());
  }
  let customOpus = BFi();
  if (customOpus !== void 0) thirdPartyOptions.push(customOpus);else {
    if (rhe("opus41")) thirdPartyOptions.push(zwd());
    if (rhe("opus48")) {
      if (thirdPartyOptions.push(KFi()), dee() && !jB(Im().opus48)) thirdPartyOptions.push(UFi());
    }
    if (rhe("opus47")) {
      if (thirdPartyOptions.push(Jwd()), dee() && !jB(Im().opus47)) thirdPartyOptions.push(Qwd());
    }
    if (rhe("opus46")) {
      if (thirdPartyOptions.push(Ywd()), dee()) thirdPartyOptions.push(Xwd(showPricing));
    }
  }
  let customHaiku = $Fi();
  if (customHaiku !== void 0) thirdPartyOptions.push(customHaiku);else if (rhe("haiku45") || rhe("haiku35")) thirdPartyOptions.push(eRd());
  let customFable = NFi();
  if (customFable !== void 0 || rhe("fable5")) ent(thirdPartyOptions, customFable ?? P8r());
  return thirdPartyOptions;
}

/** Returns true when the model family key is available for the current API provider. */
function rhe(modelKey: any) {
  let modelDef = bd[modelKey];
  if (modelDef[getAPIProvider()] !== null) return !0;
  return Boolean(getInitialSettings().modelOverrides?.[modelDef.firstParty]);
}

/**
 * Builds a model picker row for a user-specified model string that isn't in the standard list.
 * Returns null if we can't determine a marketing name for the model.
 */
function rRd(modelValue: any) {
  let marketingName = getMarketingNameForModel(modelValue);
  if (!marketingName) return null;
  let canonicalName = getCanonicalName(modelValue),
    aliasInfo: any = null;
  if (canonicalName.includes("fable")) aliasInfo = {
    alias: "Fable",
    aliasModel: getDefaultFableModel(),
    slogan: VFi
  };else if (canonicalName.includes("sonnet")) aliasInfo = {
    alias: "Sonnet",
    aliasModel: getDefaultSonnetModel(),
    slogan: Lwn
  };else if (canonicalName.includes("opus")) aliasInfo = {
    alias: "Opus",
    aliasModel: getDefaultOpusModel(),
    slogan: mOt
  };else if (canonicalName.includes("haiku")) aliasInfo = {
    alias: "Haiku",
    aliasModel: getDefaultHaikuModel(),
    slogan: L8r
  };
  if (!aliasInfo) return {
    value: modelValue,
    label: marketingName,
    description: `Custom model (${modelValue})`
  };
  let aliasMarketing = getMarketingNameForModel(aliasInfo.aliasModel),
    allCanonicals = Object.values(bd).map((modelEntry: any) => getCanonicalName(modelEntry.firstParty)),
    modelIndex = allCanonicals.indexOf(canonicalName);
  if (aliasMarketing && modelIndex !== -1 && modelIndex < allCanonicals.indexOf(getCanonicalName(aliasInfo.aliasModel))) return {
    value: modelValue,
    label: marketingName,
    description: `Newer version available \xB7 select ${aliasInfo.alias} for ${aliasMarketing}`
  };
  return {
    value: modelValue,
    label: marketingName,
    description: `${aliasInfo.slogan} (${modelValue})`
  };
}

/** Returns the filtered (non-disabled) model options for the picker. */
function tnt(showPricing: any = !1) {
  return fOt(showPricing).filter((option: any) => !option.disabled);
}

/** Returns disabled model options for first-party entrypoints only. */
function QFi(optionsList: any) {
  if (!oRd.has(je.CLAUDE_CODE_ENTRYPOINT ?? "")) return [];
  if (getAPIProvider() !== "firstParty") return [];
  if (!isFirstPartyAnthropicBaseUrl()) return [];
  return optionsList.filter((option: any) => option.disabled === !0);
}

/** Builds the full options list including disabled models and error overrides. */
function fOt(showPricing: any = !1) {
  let seenValues = new Set(),
    deduplicated = sRd(showPricing).filter((option: any) => {
      if (option.value === null) return !0;
      if (seenValues.has(option.value)) return logForDebugging(`model options: dropping duplicate row "${option.label}" (value ${option.value})`, {
        level: "warn"
      }), !1;
      return seenValues.add(option.value), !0;
    }),
    withErrorOverrides = aRd(deduplicated).map((option: any) => {
      if (option.disabled === !0) return option;
      try {
        let errorMsg = OFi(getCanonicalName(option.value === null ? getDefaultMainLoopModel() : parseUserSpecifiedModel(option.value)));
        if (errorMsg !== null) return {
          ...option,
          disabled: !0,
          description: errorMsg
        };
      } catch (err) {
        logForDebugging(`model-error-overrides picker hint failed: ${err}`, {
          level: "error"
        });
      }
      return option;
    }),
    disabledOptions = withErrorOverrides.filter((option: any) => option.disabled === !0);
  if (disabledOptions.length === 0) return withErrorOverrides;
  return [...withErrorOverrides.filter((option: any) => option.disabled !== !0), ...disabledOptions];
}

/** Builds the raw model options list, including custom env options, Dun extras, additional API options, and the current user selection. */
function sRd(showPricing: any) {
  let optionsList = nRd(showPricing),
    customModelEnv = process.env.ANTHROPIC_CUSTOM_MODEL_OPTION;
  if (customModelEnv && !optionsList.some((item: any) => item.value === customModelEnv)) optionsList.push({
    value: customModelEnv,
    label: process.env.ANTHROPIC_CUSTOM_MODEL_OPTION_NAME ?? customModelEnv,
    description: process.env.ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION ?? `Custom model (${customModelEnv})`
  });
  for (let extraOption of Dun()) if (!optionsList.some((existing: any) => Pwn(existing, extraOption))) ent(optionsList, extraOption);
  let apiProvider = getAPIProvider();
  if (apiProvider === "firstParty" || apiProvider === "gateway") {
    let isBaseUrl = apiProvider === "gateway" || isFirstPartyAnthropicBaseUrl();
    for (let additionalOption of getAdditionalModelOptionsCache()) {
      if (additionalOption.disabled && !isBaseUrl) continue;
      if (!optionsList.some((existing: any) => Pwn(existing, additionalOption))) ent(optionsList, iRd(additionalOption));
    }
  }
  let {
    availableModels: deprecatedModels
  } = getSettings_DEPRECATED() ?? {};
  if (deprecatedModels) for (let modelStr of deprecatedModels) {
    let trimmed = modelStr.trim();
    if (!trimmed.startsWith("anthropic.") || optionsList.some((existing: any) => existing.value === trimmed)) continue;
    optionsList.push({
      value: trimmed,
      label: trimmed,
      description: "Custom model"
    });
  }
  let currentSetting = null,
    userSpecified = getUserSpecifiedModelSetting(),
    initialMainLoop = getInitialMainLoopModel();
  if (userSpecified !== void 0 && userSpecified !== null) currentSetting = userSpecified;else if (initialMainLoop !== void 0 && initialMainLoop !== null) currentSetting = initialMainLoop;
  if (currentSetting === null || optionsList.some((item: any) => item.value === currentSetting)) return JRe(optionsList);else if (currentSetting === "opusplan") return JRe([...optionsList, tRd()]);else if (Own(currentSetting)) {
    let fableOption = {
        value: currentSetting,
        label: "",
        description: ""
      },
      existingIdx = optionsList.findIndex((existing: any) => Pwn(existing, fableOption));
    if (existingIdx !== -1) optionsList[existingIdx] = {
      ...optionsList[existingIdx],
      value: currentSetting
    };else ent(optionsList, {
      ...P8r(),
      value: currentSetting
    });
    return JRe(optionsList);
  } else if (currentSetting === "opus") {
    if (!usesFirstPartyModelIds()) {
      let defaultOpus = getDefaultOpusModel();
      return JRe(optionsList.map((item: any) => item.value === defaultOpus ? {
        ...item,
        value: "opus"
      } : item));
    }
    return JRe([...optionsList.map((item: any) => item.value === "opus[1m]" && item.label === "Opus" ? {
      ...item,
      label: "Opus (1M context)"
    } : item), N8r(!1)]);
  } else if (currentSetting === "opus[1m]" && usesFirstPartyModelIds()) return JRe([...optionsList, YFi(!1)]);else {
    let customRow = rRd(currentSetting);
    if (customRow) {
      let existingMatch = optionsList.find((existing: any) => Pwn(existing, customRow));
      if (existingMatch) return JRe(optionsList.map((existing: any) => existing === existingMatch ? {
        ...existing,
        value: currentSetting
      } : existing));
      optionsList.push(customRow);
    } else optionsList.push({
      value: currentSetting,
      label: currentSetting,
      description: "Custom model"
    });
    return JRe(optionsList);
  }
}

/** Filters the options list to only allowed models (respects the availableModels setting). */
function JRe(optionsList: any) {
  if (!(getSettings_DEPRECATED() || {}).availableModels) return optionsList;
  return optionsList.filter((option: any) => option.value === null || option.value !== null && isModelAllowed(option.value));
}

/** Maps picker options to richer model capability descriptors for the API/UI. */
function ZFi(optionsList: any) {
  return optionsList.map((option: any) => {
    let modelValue = option.value === null ? "default" : option.value,
      resolvedModel = modelValue === "default" ? getDefaultMainLoopModel() : parseUserSpecifiedModel(modelValue),
      supportsExtendedThinking = Lw(resolvedModel),
      supportsAdaptiveThinking = uXe(resolvedModel),
      supportsFastMode = vA(option.value),
      supportsAuto = XCe(resolvedModel);
    return {
      value: modelValue,
      displayName: option.label,
      description: option.description,
      ...(supportsExtendedThinking && {
        supportsEffort: !0,
        supportedEffortLevels: nP.filter((level: any) => {
          if (level === "max" && !vFe(resolvedModel)) return !1;
          if (level === "xhigh" && !yve(resolvedModel)) return !1;
          return !0;
        })
      }),
      ...(supportsAdaptiveThinking && {
        supportsAdaptiveThinking: !0
      }),
      ...(supportsFastMode && {
        supportsFastMode: !0
      }),
      ...(supportsAuto && {
        supportsAutoMode: !0
      }),
      ...(option.disabled && {
        disabled: !0
      })
    };
  });
}

/** Returns true if two picker options refer to the same model (by value or both being Fable variants). */
function Pwn(optionA: any, optionB: any) {
  if (optionA.value === optionB.value) return !0;
  return typeof optionA.value === "string" && typeof optionB.value === "string" && GFi(optionA.value) && GFi(optionB.value);
}

/** Returns true when the value string represents a Fable model (alias or full ID). */
function Own(modelValue: any) {
  return modelValue === "fable" || modelValue === "fable[1m]" || isFableModelValue(modelValue);
}

/** Returns true when the string is a Fable 5 model value (alias or versioned ID). */
function GFi(modelValue: any) {
  if (modelValue === "fable" || modelValue === "fable[1m]") return !0;
  return /(?:^|\.)claude-fable-5(?:[-@]\d{8})?(?:-v\d+(?::\d+)?)?(?:\[[12]m\])?$/i.test(modelValue);
}

/** Adjusts the credits/limits description for Fable options when they come from the API model cache. */
function iRd(fableOption: any) {
  if (fableOption.value === null || !isFableModelValue(fableOption.value) || D0() || fableOption.disabled === !0) return fableOption;
  let isPAYG = X$(),
    descParts = (fableOption.description ?? "").split(" \xB7 ").filter((part: any) => isPAYG ? !part.startsWith("Uses your limits") : part !== "Draws from usage credits");
  if (isPAYG && !descParts.includes("Draws from usage credits")) descParts.push("Draws from usage credits");
  return {
    ...fableOption,
    description: descParts.filter(Boolean).join(" \xB7 ")
  };
}

/** Disables Fable options for team subscribers who haven't enabled usage credits. */
function aRd(optionsList: any) {
  if (!X$() || D0() || !isTeamSubscriber() || Cw() || !RFi()) return optionsList;
  return optionsList.map((option: any) => {
    if (option.disabled === !0 || typeof option.value !== "string" || !Own(option.value)) return option;
    return {
      ...option,
      disabled: !0,
      label: "Fable (disabled)",
      description: `${option.description} — contact your admin to turn on usage credits`
    };
  });
}

/** Inserts a Fable option at the correct position in the options list (after the default, grouped with other Fable options). */
function ent(optionsList: any, newOption: any) {
  if (!(typeof newOption.value === "string" && Own(newOption.value))) {
    optionsList.push(newOption);
    return;
  }
  let defaultIdx = optionsList.findIndex((item: any) => item.value === null);
  if (defaultIdx === -1) {
    optionsList.splice(0, 0, newOption);
    return;
  }
  let currentFamily = O8r(getDefaultMainLoopModel()),
    insertIdx = defaultIdx + 1;
  while (insertIdx < optionsList.length) {
    let itemValue = optionsList[insertIdx]?.value;
    if (typeof itemValue !== "string") break;
    if (currentFamily !== null && O8r(itemValue) === currentFamily || Own(itemValue)) insertIdx++;else break;
  }
  optionsList.splice(insertIdx, 0, newOption);
}

/** Returns the model family name ("fable"|"opus"|"sonnet"|"haiku"|null) for a model value string. */
function O8r(modelValue: any) {
  let lower = modelValue.toLowerCase();
  if (lower.includes("fable")) return "fable";
  if (lower.includes("opus")) return "opus";
  if (lower.includes("sonnet")) return "sonnet";
  if (lower.includes("haiku")) return "haiku";
  return null;
}

// Module-level constants for model slogans and static picker options
var Lwn = "Efficient for routine tasks",
  mOt = "Best for everyday, complex tasks",
  L8r = "Fastest for quick answers",
  VFi = "Most capable for your hardest and longest-running tasks",
  XFi: any,
  WFi: any,
  oRd: any;

// Module initializer: wires up lazy-init constants and the entrypoint allowlist
var O2e = b(() => {
  lt();
  Lr();
  zn();
  Ao();
  LB();
  yQ();
  P8();
  tE();
  yr();
  Om();
  isFastModeEligible();
  jR();
  Iwn();
  z2();
  qe();
  eW();
  li();
  MO();
  Mo();
  jS();
  Pun();
  k8r();
  XFi = {
    value: "sonnet",
    label: "Sonnet",
    description: `Sonnet 4.6 \xB7 ${Lwn}`
  }, WFi = {
    value: "haiku",
    label: "Haiku",
    description: `Haiku 4.5 \xB7 ${L8r}`
  };
  oRd = new Set(["claude-vscode"]);
});
export {Kwd,Dwn,Mwn,H8r,MFi,D8r,NFi,P8r,BFi,zwd,Ywd,Jwd,KFi,FFi,Xwd,Qwd,UFi,$Fi,zFi,Zwd,eRd,M8r,N8r,qFi,jFi,YFi,JFi,tRd,I8r,nRd,rhe,rRd,tnt,QFi,fOt,sRd,JRe,ZFi,Pwn,Own,GFi,iRd,aRd,ent,O8r,Lwn,mOt,L8r,VFi,XFi,WFi,oRd,O2e};
