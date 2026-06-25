// @ts-nocheck
import {isDefaultModelEnforced as Cmn,getClaudeAiUserDefaultModelDescription as Amn,getDefaultMainLoopModelSetting as wk,getOpusPricingSuffix as joe,renderDefaultModelSetting as Mkt,getDefaultOpusModel as ny,getDefaultHaikuModel as Zoe,isOpus1mMergeEnabled as cC,getDefaultSonnetModel as Jv,getCanonicalName as So,getMarketingNameForModel as ug,normalizeModelStringForAPI as Pp,getDefaultFableModel as QNe,Kg,parseUserSpecifiedModel as Qo,getUserSpecifiedModelSetting as w3,isFableModelValue as Ime,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {isClaudeAISubscriber as Eo,getSubscriptionType as vi,isMaxSubscriber as ese,isTeamPremiumSubscriber as MAe,isEnterprisePAYGSubscriber as Ome,getAdditionalModelOptionsCache as xme,lo} from "./2036_withOAuthRefreshLock.ts";
import {usesFirstPartyModelIds as Vu,getAPIProvider as Rr,isFirstPartyAnthropicBaseUrl as Su,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {Hf,WS} from "../api/1453_month.ts";
import {uF,Koe,wme,ixr,sxr,h7} from "../telemetry/1454_model.ts";
import {pF,k_,GS} from "../api/2028_used.ts";
import {Kp,gQ} from "../../vendor/m1287.ts";
import {tB,Tae,hqi,gqi,fge,Sae,ej} from "../telemetry/2743_raw.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {cee,mge,hHn} from "../../vendor/m2741.ts";
import {ed,h2} from "../../vendor/m1285.ts";
import {getInitialSettings as Fr,getSettings_DEPRECATED as $o,br} from "./0745_updateSettingsForSource.ts";
import {Ne} from "../../vendor/m583.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {Aqi,s7r} from "../../vendor/m2743.ts";
import {hmn,gmn} from "../api/1455_value.ts";
import {getInitialMainLoopModel as l5,lt} from "../session/0132_sent.ts";
import {Hme,Oa,eO} from "../../vendor/m1456.ts";
import {BR,gD,EUe,nve,Cp} from "./2223_level.ts";
import {lZe,$M} from "../telemetry/2032_word.ts";
import {bfe,MR} from "./2033_allowed.ts";
import {oE,RM} from "../../vendor/m1289.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
/** Returns an org-enforcement suffix string for model labels. */
function PMd() {
  return Cmn() ? " \xB7 Set by your organization" : "";
}

/** Builds the "Default (recommended)" model option for the picker. */
function THn(isPricingVisible: any) {
  if (Eo()) return {
    value: null,
    label: "Default (recommended)",
    description: Amn(isPricingVisible)
  };
  let isThirdParty = !Vu(),
    defaultSetting = wk(),
    isOpusDefault = isPricingVisible && Hf(defaultSetting),
    pricingSuffix = isThirdParty || Cmn() ? "" : isOpusDefault ? joe(!0, defaultSetting) : ` \xB7 ${uF(Koe)}`;
  return {
    value: null,
    label: isThirdParty ? "Default" : "Default (recommended)",
    description: `Use the default model (currently ${Mkt(defaultSetting)})${pricingSuffix}${PMd()}`
  };
}

/** Returns true when custom model overrides are applicable (non-first-party or AWS or custom base URL). */
function CHn() {
  return !Vu() || Rr() === "anthropicAws" || !Su();
}

/** Returns true when the default Opus model has a 1M context variant. */
function i7r() {
  return pF(ny());
}

/** Builds a custom Sonnet option from env overrides if applicable. */
function vqi() {
  let envSonnetModel = process.env.ANTHROPIC_DEFAULT_SONNET_MODEL;
  if (CHn() && envSonnetModel) {
    let is1m = k_(envSonnetModel);
    return {
      value: "sonnet",
      label: process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_NAME ?? envSonnetModel,
      description: process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION ?? `Custom Sonnet model${is1m ? " (1M context)" : ""}`,
      descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION ?? `Custom Sonnet model${is1m ? " with 1M context" : ""}`} (${envSonnetModel})`
    };
  }
}

/** Standard Sonnet 4.6 picker option. */
function l7r() {
  let isThirdParty = !Vu();
  return {
    value: isThirdParty ? Kp().sonnet46 : "sonnet",
    label: "Sonnet",
    description: `Sonnet 4.6 \xB7 ${EHn}${isThirdParty ? "" : ` \xB7 ${uF(wme)}`}`,
    descriptionForModel: "Sonnet 4.6 - efficient for routine tasks. Generally recommended for most coding tasks"
  };
}

/** Builds a custom Fable option from env overrides if applicable. */
function wqi() {
  let envFableModel = process.env.ANTHROPIC_DEFAULT_FABLE_MODEL;
  if (CHn() && envFableModel) return {
    value: "fable",
    label: process.env.ANTHROPIC_DEFAULT_FABLE_MODEL_NAME ?? envFableModel,
    description: process.env.ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION ?? "Custom Fable model",
    descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_FABLE_MODEL_DESCRIPTION ?? "Custom Fable model"} (${envFableModel})`
  };
}

/** Standard Fable 5 picker option with plan limit display. */
function c7r() {
  let isThirdParty = !Vu(),
    descriptionText = `Fable 5 \xB7 ${Mqi}`;
  if (!tB() && Tae()) descriptionText += " \xB7 Requires usage credits";
  return {
    value: isThirdParty ? Kp().fable5 : "fable",
    label: "Fable",
    description: descriptionText,
    descriptionForModel: "Fable 5 - most capable for your hardest and longest-running tasks"
  };
}

/** Builds a custom Opus option from env overrides if applicable. */
function kqi() {
  let envOpusModel = process.env.ANTHROPIC_DEFAULT_OPUS_MODEL;
  if (CHn() && envOpusModel) {
    let is1m = k_(envOpusModel);
    return {
      value: "opus",
      label: process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_NAME ?? envOpusModel,
      description: process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION ?? `Custom Opus model${is1m ? " (1M context)" : ""}`,
      descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION ?? `Custom Opus model${is1m ? " with 1M context" : ""}`} (${envOpusModel})`
    };
  }
}

/** Legacy Opus 4.1 picker option. */
function OMd() {
  return {
    value: Kp().opus41,
    label: "Opus 4.1",
    description: "Opus 4.1 \xB7 Legacy",
    descriptionForModel: "Opus 4.1 - legacy version"
  };
}

/** Legacy Opus 4.6 picker option. */
function LMd() {
  return {
    value: !Vu() ? Kp().opus46 : "claude-opus-4-6",
    label: "Opus 4.6",
    description: "Opus 4.6 \xB7 Legacy",
    descriptionForModel: "Opus 4.6 - previous Opus version"
  };
}

/** Legacy Opus 4.7 picker option. */
function MMd() {
  return {
    value: !Vu() ? Kp().opus47 : "claude-opus-4-7",
    label: "Opus 4.7",
    description: "Opus 4.7 \xB7 Legacy",
    descriptionForModel: "Opus 4.7 - previous Opus version"
  };
}

/** Standard Opus 4.8 picker option. */
function Nqi(showPricing: any = !1) {
  let isThirdParty = !Vu(),
    pricingSuffix = joe(showPricing, "claude-opus-4-8");
  return {
    value: isThirdParty ? Kp().opus48 : "opus",
    label: "Opus",
    description: `Opus 4.8 \xB7 ${jMt}${isThirdParty ? "" : pricingSuffix}`,
    descriptionForModel: "Opus 4.8 - best for everyday, complex tasks"
  };
}

/** Standard Sonnet 4.6 with 1M context picker option. */
function Hqi() {
  let isThirdParty = !Vu();
  return {
    value: isThirdParty ? Kp().sonnet46 + "[1m]" : "sonnet[1m]",
    label: "Sonnet (1M context)",
    description: `Sonnet 4.6 for long sessions${isThirdParty ? "" : ` \xB7 ${uF(wme)}`}`,
    descriptionForModel: "Sonnet 4.6 with 1M context window - for long sessions with large codebases"
  };
}

/** Legacy Opus 4.6 with 1M context picker option. */
function NMd(showPricing: any = !1, includePricingSuffix: any = !0) {
  return {
    value: !Vu() ? Kp().opus46 + "[1m]" : "claude-opus-4-6[1m]",
    label: "Opus 4.6 (1M context)",
    description: `Opus 4.6 for long sessions${includePricingSuffix ? joe(showPricing, "claude-opus-4-6") : ""}`,
    descriptionForModel: "Opus 4.6 with 1M context window - for long sessions with large codebases"
  };
}

/** Legacy Opus 4.7 with 1M context picker option. */
function FMd() {
  return {
    value: !Vu() ? Kp().opus47 + "[1m]" : "claude-opus-4-7[1m]",
    label: "Opus 4.7 (1M context)",
    description: "Opus 4.7 for long sessions",
    descriptionForModel: "Opus 4.7 with 1M context window - for long sessions with large codebases"
  };
}

/** Standard Opus 4.8 with 1M context picker option. */
function Iqi(showPricing: any = !1) {
  let isThirdParty = !Vu(),
    pricingSuffix = joe(showPricing, "claude-opus-4-8");
  return {
    value: isThirdParty ? Kp().opus48 + "[1m]" : "opus[1m]",
    label: "Opus (1M context)",
    description: `Opus 4.8 for long sessions${isThirdParty ? "" : pricingSuffix}`,
    descriptionForModel: "Opus 4.8 with 1M context window - for long sessions with large codebases"
  };
}

/** Builds a custom Haiku option from env overrides if applicable. */
function xqi() {
  let envHaikuModel = process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL;
  if (CHn() && envHaikuModel) return {
    value: "haiku",
    label: process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME ?? envHaikuModel,
    description: process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION ?? "Custom Haiku model",
    descriptionForModel: `${process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION ?? "Custom Haiku model"} (${envHaikuModel})`
  };
}

/** Standard Haiku 4.5 picker option. */
function Fqi() {
  let isThirdParty = !Vu();
  return {
    value: "haiku",
    label: "Haiku",
    description: `Haiku 4.5 \xB7 ${d7r}${isThirdParty ? "" : ` \xB7 ${uF(ixr)}`}`,
    descriptionForModel: "Haiku 4.5 - fastest for quick answers. Lower cost but less capable than Sonnet 4.6."
  };
}

/** Legacy Haiku 3.5 picker option. */
function BMd() {
  return {
    value: "haiku",
    label: "Haiku",
    description: `Haiku 3.5 for simple tasks${!Vu() ? "" : ` \xB7 ${uF(sxr)}`}`,
    descriptionForModel: "Haiku 3.5 - faster and lower cost, but less capable than Sonnet. Use for simple tasks."
  };
}

/** Returns the appropriate current Haiku option (4.5 vs 3.5) based on the default haiku model. */
function UMd() {
  return Zoe() === Kp().haiku45 ? Fqi() : BMd();
}

/** Returns a usage-multiplier suffix for Opus on Pro subscriptions with the feature flag enabled. */
function p7r() {
  if (vi() === "pro" && it("tengu_gypsum_kite", !1)) return " \xB7 ~2\xD7 usage vs Sonnet";
  return "";
}

/** Simplified Opus option used for Claude.ai subscriber pickers (no detailed pricing). */
function m7r(showPricing: any = !1) {
  let isThirdParty = !Vu();
  return {
    value: "opus",
    label: "Opus",
    description: `Opus 4.8 \xB7 ${jMt}${p7r()}${isThirdParty || !showPricing ? "" : ` \xB7 ${uF(Koe)}`}`
  };
}

/** Sonnet 1M context option for Claude.ai subscribers. */
function Dqi() {
  let isThirdParty = !Vu(),
    creditsLabel = Eo() ? " \xB7 Draws from usage credits" : "";
  return {
    value: "sonnet[1m]",
    label: "Sonnet (1M context)",
    description: `Sonnet 4.6 with 1M context${creditsLabel}${!(creditsLabel !== "" && !isThirdParty) ? "" : ` \xB7 ${uF(wme)}`}`
  };
}

/** Opus 1M context option for Claude.ai subscribers. */
function Pqi() {
  let isThirdParty = !Vu(),
    creditsLabel = Eo() ? " \xB7 Draws from usage credits" : "",
    showPricingSuffix = creditsLabel !== "" && !isThirdParty;
  return {
    value: "opus[1m]",
    label: "Opus (1M context)",
    description: `Opus 4.8 with 1M context${p7r()}${creditsLabel}${!showPricingSuffix ? "" : ` \xB7 ${uF(Koe)}`}`
  };
}

/** Full Opus 4.8 with 1M context picker option (with optional pricing). */
function Bqi(showPricing: any = !1, showPricingSuffix: any = !1) {
  let isThirdParty = !Vu(),
    pricingSuffix = joe(showPricingSuffix, "claude-opus-4-8");
  return {
    value: isThirdParty ? Kp().opus48 + "[1m]" : "opus[1m]",
    label: "Opus (1M context)",
    description: `Opus 4.8 with 1M context \xB7 ${jMt}${p7r()}${isThirdParty || !showPricing ? "" : pricingSuffix}`,
    descriptionForModel: "Opus 4.8 with 1M context - best for everyday, complex tasks"
  };
}

/** Opus 4.8 with 1M context but labeled as "Opus" (label-override variant of Bqi). */
function Uqi(showPricing: any = !1, showPricingSuffix: any = !1) {
  return {
    ...Bqi(showPricing, showPricingSuffix),
    label: "Opus"
  };
}

/** Opus Plan Mode picker option (uses Opus for planning, Sonnet otherwise). */
function $Md() {
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
function a7r(optionsList: any, showPricing: any) {
  let familyName = u7r(wk());
  if (familyName !== "opus" && familyName !== "sonnet") return optionsList;
  let is1mMerge = familyName === "opus" && cC();
  if (optionsList.some((item: any) => item.value === familyName || is1mMerge && item.value === `${familyName}[1m]`)) return optionsList;
  let isSubscriber = Eo(),
    syntheticOption: any;
  if (familyName === "sonnet") {
    let defaultSonnet = Jv();
    if (So(defaultSonnet) === "claude-sonnet-4-6") syntheticOption = isSubscriber ? $qi : l7r();else {
      let marketingName = ug(Pp(defaultSonnet)) ?? "Sonnet";
      syntheticOption = {
        value: "sonnet",
        label: "Sonnet",
        description: `${marketingName} \xB7 ${EHn}`,
        descriptionForModel: `${marketingName} - efficient for routine tasks`
      };
    }
  } else if (is1mMerge) syntheticOption = Uqi(!isSubscriber, showPricing);else {
    let defaultOpus = ny();
    if (So(defaultOpus) === "claude-opus-4-8") syntheticOption = isSubscriber ? m7r(!1) : Nqi(showPricing);else {
      let marketingName = ug(Pp(defaultOpus)) ?? "Opus";
      syntheticOption = {
        value: "opus",
        label: "Opus",
        description: `${marketingName} \xB7 ${jMt}${isSubscriber ? "" : joe(showPricing, defaultOpus)}`,
        descriptionForModel: `${marketingName} - best for everyday, complex tasks`
      };
    }
  }
  return optionsList.splice(optionsList.findIndex((item: any) => item.value === null) + 1, 0, syntheticOption), optionsList;
}

/** Builds the full model option list for the model picker based on subscription/provider context. */
function qMd(showPricing: any = !1) {
  if (Eo()) {
    if (ese() || MAe() || Ome()) {
      let maxOptions = [THn(showPricing)];
      if (!cC() && cee() && !i7r()) maxOptions.push(Pqi());
      if (maxOptions.push($qi), mge()) maxOptions.push(Dqi());
      return maxOptions.push(Oqi), a7r(maxOptions, showPricing);
    }
    let proOptions = [THn(showPricing)];
    if (mge()) proOptions.push(Dqi());
    if (cC()) proOptions.push(Uqi());else if (proOptions.push(m7r(!1)), cee() && !i7r()) proOptions.push(Pqi());
    return proOptions.push(Oqi), a7r(proOptions, showPricing);
  }
  if (Vu()) {
    let firstPartyOptions = [THn(showPricing)],
      customOpus = kqi();
    if (customOpus !== void 0) firstPartyOptions.push(customOpus);else if (!cC() && cee() && !i7r()) firstPartyOptions.push(Iqi(showPricing));
    let customSonnet = vqi();
    if (customSonnet !== void 0) firstPartyOptions.push(customSonnet);else if (firstPartyOptions.push(l7r()), mge()) firstPartyOptions.push(Hqi());
    firstPartyOptions.push(xqi() ?? Fqi());
    let customFable = wqi();
    if (customFable !== void 0) not(firstPartyOptions, customFable);else if (Rr() === "anthropicAws" && hge("fable5")) not(firstPartyOptions, c7r());
    return a7r(firstPartyOptions, showPricing);
  }
  let thirdPartyOptions = [THn(showPricing)],
    customSonnet = vqi();
  if (customSonnet !== void 0) thirdPartyOptions.push(customSonnet);else if (hge("sonnet46")) {
    if (thirdPartyOptions.push(l7r()), mge()) thirdPartyOptions.push(Hqi());
  }
  let customOpus = kqi();
  if (customOpus !== void 0) thirdPartyOptions.push(customOpus);else {
    if (hge("opus41")) thirdPartyOptions.push(OMd());
    if (hge("opus48")) {
      if (thirdPartyOptions.push(Nqi()), cee() && !pF(Kp().opus48)) thirdPartyOptions.push(Iqi());
    }
    if (hge("opus47")) {
      if (thirdPartyOptions.push(MMd()), cee() && !pF(Kp().opus47)) thirdPartyOptions.push(FMd());
    }
    if (hge("opus46")) {
      if (thirdPartyOptions.push(LMd()), cee()) thirdPartyOptions.push(NMd(showPricing));
    }
  }
  let customHaiku = xqi();
  if (customHaiku !== void 0) thirdPartyOptions.push(customHaiku);else if (hge("haiku45") || hge("haiku35")) thirdPartyOptions.push(UMd());
  let customFable = wqi();
  if (customFable !== void 0 || hge("fable5")) not(thirdPartyOptions, customFable ?? c7r());
  return thirdPartyOptions;
}

/** Returns true when the model family key is available for the current API provider. */
function hge(modelKey: any) {
  let modelDef = ed[modelKey];
  if (modelDef[Rr()] !== null) return !0;
  return Boolean(Fr().modelOverrides?.[modelDef.firstParty]);
}

/**
 * Builds a model picker row for a user-specified model string that isn't in the standard list.
 * Returns null if we can't determine a marketing name for the model.
 */
function WMd(modelValue: any) {
  let marketingName = ug(modelValue);
  if (!marketingName) return null;
  let canonicalName = So(modelValue),
    aliasInfo: any = null;
  if (canonicalName.includes("fable")) aliasInfo = {
    alias: "Fable",
    aliasModel: QNe(),
    slogan: Mqi
  };else if (canonicalName.includes("sonnet")) aliasInfo = {
    alias: "Sonnet",
    aliasModel: Jv(),
    slogan: EHn
  };else if (canonicalName.includes("opus")) aliasInfo = {
    alias: "Opus",
    aliasModel: ny(),
    slogan: jMt
  };else if (canonicalName.includes("haiku")) aliasInfo = {
    alias: "Haiku",
    aliasModel: Zoe(),
    slogan: d7r
  };
  if (!aliasInfo) return {
    value: modelValue,
    label: marketingName,
    description: `Custom model (${modelValue})`
  };
  let aliasMarketing = ug(aliasInfo.aliasModel),
    allCanonicals = Object.values(ed).map((modelEntry: any) => So(modelEntry.firstParty)),
    modelIndex = allCanonicals.indexOf(canonicalName);
  if (aliasMarketing && modelIndex !== -1 && modelIndex < allCanonicals.indexOf(So(aliasInfo.aliasModel))) return {
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
function rot(showPricing: any = !1) {
  return YMt(showPricing).filter((option: any) => !option.disabled);
}

/** Returns disabled model options for first-party entrypoints only. */
function qqi(optionsList: any) {
  if (!GMd.has(Ne.CLAUDE_CODE_ENTRYPOINT ?? "")) return [];
  if (Rr() !== "firstParty") return [];
  if (!Su()) return [];
  return optionsList.filter((option: any) => option.disabled === !0);
}

/** Builds the full options list including disabled models and error overrides. */
function YMt(showPricing: any = !1) {
  let seenValues = new Set(),
    deduplicated = VMd(showPricing).filter((option: any) => {
      if (option.value === null) return !0;
      if (seenValues.has(option.value)) return A(`model options: dropping duplicate row "${option.label}" (value ${option.value})`, {
        level: "warn"
      }), !1;
      return seenValues.add(option.value), !0;
    }),
    withErrorOverrides = KMd(deduplicated).map((option: any) => {
      if (option.disabled === !0) return option;
      try {
        let errorMsg = Aqi(So(option.value === null ? Kg() : Qo(option.value)));
        if (errorMsg !== null) return {
          ...option,
          disabled: !0,
          description: errorMsg
        };
      } catch (err) {
        A(`model-error-overrides picker hint failed: ${err}`, {
          level: "error"
        });
      }
      return option;
    }),
    disabledOptions = withErrorOverrides.filter((option: any) => option.disabled === !0);
  if (disabledOptions.length === 0) return withErrorOverrides;
  return [...withErrorOverrides.filter((option: any) => option.disabled !== !0), ...disabledOptions];
}

/** Builds the raw model options list, including custom env options, extras, additional API options, and the current user selection. */
function VMd(showPricing: any) {
  let optionsList = qMd(showPricing),
    customModelEnv = process.env.ANTHROPIC_CUSTOM_MODEL_OPTION;
  if (customModelEnv && !optionsList.some((item: any) => item.value === customModelEnv)) optionsList.push({
    value: customModelEnv,
    label: process.env.ANTHROPIC_CUSTOM_MODEL_OPTION_NAME ?? customModelEnv,
    description: process.env.ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION ?? `Custom model (${customModelEnv})`
  });
  for (let extraOption of hmn()) if (!optionsList.some((existing: any) => SHn(existing, extraOption))) not(optionsList, extraOption);
  let apiProvider = Rr();
  if (apiProvider === "firstParty" || apiProvider === "gateway") {
    let isBaseUrl = apiProvider === "gateway" || Su();
    for (let additionalOption of xme()) {
      if (additionalOption.disabled && !isBaseUrl) continue;
      if (!optionsList.some((existing: any) => SHn(existing, additionalOption))) not(optionsList, additionalOption);
    }
  }
  let {
    availableModels: deprecatedModels
  } = $o() ?? {};
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
    userSpecified = w3(),
    initialMainLoop = l5();
  if (userSpecified !== void 0 && userSpecified !== null) currentSetting = userSpecified;else if (initialMainLoop !== void 0 && initialMainLoop !== null) currentSetting = initialMainLoop;
  if (currentSetting === null || optionsList.some((item: any) => item.value === currentSetting)) return Lke(optionsList);else if (currentSetting === "opusplan") return Lke([...optionsList, $Md()]);else if (bHn(currentSetting)) {
    let fableOption = {
        value: currentSetting,
        label: "",
        description: ""
      },
      existingIdx = optionsList.findIndex((existing: any) => SHn(existing, fableOption));
    if (existingIdx !== -1) optionsList[existingIdx] = {
      ...optionsList[existingIdx],
      value: currentSetting
    };else not(optionsList, {
      ...c7r(),
      value: currentSetting
    });
    return Lke(optionsList);
  } else if (currentSetting === "opus") {
    if (!Vu()) {
      let defaultOpus = ny();
      return Lke(optionsList.map((item: any) => item.value === defaultOpus ? {
        ...item,
        value: "opus"
      } : item));
    }
    return Lke([...optionsList.map((item: any) => item.value === "opus[1m]" && item.label === "Opus" ? {
      ...item,
      label: "Opus (1M context)"
    } : item), m7r(!1)]);
  } else if (currentSetting === "opus[1m]" && Vu()) return Lke([...optionsList, Bqi(!1)]);else {
    let customRow = WMd(currentSetting);
    if (customRow) {
      let existingMatch = optionsList.find((existing: any) => SHn(existing, customRow));
      if (existingMatch) return Lke(optionsList.map((existing: any) => existing === existingMatch ? {
        ...existing,
        value: currentSetting
      } : existing));
      optionsList.push(customRow);
    } else optionsList.push({
      value: currentSetting,
      label: currentSetting,
      description: "Custom model"
    });
    return Lke(optionsList);
  }
}

/** Filters the options list to only allowed models (respects the availableModels setting). */
function Lke(optionsList: any) {
  if (!($o() || {}).availableModels && Hme().size === 0) return optionsList;
  return optionsList.filter((option: any) => option.value === null || option.value !== null && Oa(option.value));
}

/** Maps picker options to richer model capability descriptors for the API/UI. */
function Wqi(optionsList: any) {
  return optionsList.map((option: any) => {
    let modelValue = option.value === null ? "default" : option.value,
      resolvedModel = modelValue === "default" ? Kg() : Qo(modelValue),
      supportsExtendedThinking = BR(resolvedModel),
      supportsAdaptiveThinking = lZe(resolvedModel),
      supportsFastMode = Hf(option.value),
      supportsAuto = bfe(resolvedModel);
    return {
      value: modelValue,
      displayName: option.label,
      description: option.description,
      ...(supportsExtendedThinking && {
        supportsEffort: !0,
        supportedEffortLevels: gD.filter((level: any) => {
          if (level === "max" && !EUe(resolvedModel)) return !1;
          if (level === "xhigh" && !nve(resolvedModel)) return !1;
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
function SHn(optionA: any, optionB: any) {
  if (optionA.value === optionB.value) return !0;
  return typeof optionA.value === "string" && typeof optionB.value === "string" && Lqi(optionA.value) && Lqi(optionB.value);
}

/** Returns true when the value string represents a Fable model (alias or full ID). */
function bHn(modelValue: any) {
  return modelValue === "fable" || modelValue === "fable[1m]" || Ime(modelValue);
}

/** Returns true when the string is a Fable 5 model value (alias or versioned ID). */
function Lqi(modelValue: any) {
  if (modelValue === "fable" || modelValue === "fable[1m]") return !0;
  return /(?:^|\.)claude-fable-5(?:[-@]\d{8})?(?:-v\d+(?::\d+)?)?(?:\[[12]m\])?$/i.test(modelValue);
}

/** Disables Fable options for team subscribers who haven't enabled usage credits. */
function KMd(optionsList: any) {
  if (!hqi() || tB() || oE() || !gqi() || !(fge() || Sae())) return optionsList;
  return optionsList.map((option: any) => {
    if (option.disabled === !0 || typeof option.value !== "string" || !bHn(option.value)) return option;
    let creditsSuffix = Tae() ? "" : " — requires usage credits";
    return {
      ...option,
      disabled: !0,
      label: "Fable (disabled)",
      description: `${option.description}${creditsSuffix}`
    };
  });
}

/** Inserts a Fable option at the correct position in the options list (after the default, grouped with other Fable options). */
function not(optionsList: any, newOption: any) {
  if (!(typeof newOption.value === "string" && bHn(newOption.value))) {
    optionsList.push(newOption);
    return;
  }
  let defaultIdx = optionsList.findIndex((item: any) => item.value === null);
  if (defaultIdx === -1) {
    optionsList.splice(0, 0, newOption);
    return;
  }
  let currentFamily = u7r(Kg()),
    insertIdx = defaultIdx + 1;
  while (insertIdx < optionsList.length) {
    let itemValue = optionsList[insertIdx]?.value;
    if (typeof itemValue !== "string") break;
    if (currentFamily !== null && u7r(itemValue) === currentFamily || bHn(itemValue)) insertIdx++;else break;
  }
  optionsList.splice(insertIdx, 0, newOption);
}

/** Returns the model family name ("fable"|"opus"|"sonnet"|"haiku"|null) for a model value string. */
function u7r(modelValue: any) {
  let lower = modelValue.toLowerCase();
  if (lower.includes("fable")) return "fable";
  if (lower.includes("opus")) return "opus";
  if (lower.includes("sonnet")) return "sonnet";
  if (lower.includes("haiku")) return "haiku";
  return null;
}

// Module-level constants for model slogans and static picker options
var EHn = "Efficient for routine tasks",
  jMt = "Best for everyday, complex tasks",
  d7r = "Fastest for quick answers",
  Mqi = "Most capable for your hardest and longest-running tasks",
  $qi,
  Oqi,
  GMd;

// Module initializer: wires up lazy-init constants and the entrypoint allowlist
var U$e = b(() => {
  lt();
  Ir();
  jn();
  lo();
  RM();
  gQ();
  h7();
  WS();
  br();
  Cp();
  $M();
  MR();
  hHn();
  h2();
  qe();
  ej();
  Ps();
  eO();
  Ro();
  GS();
  gmn();
  s7r();
  $qi = {
    value: "sonnet",
    label: "Sonnet",
    description: `Sonnet 4.6 \xB7 ${EHn}`
  }, Oqi = {
    value: "haiku",
    label: "Haiku",
    description: `Haiku 4.5 \xB7 ${d7r}`
  };
  GMd = new Set(["claude-vscode"]);
});

export {PMd,THn,CHn,i7r,vqi,l7r,wqi,c7r,kqi,OMd,LMd,MMd,Nqi,Hqi,NMd,FMd,Iqi,xqi,Fqi,BMd,UMd,p7r,m7r,Dqi,Pqi,Bqi,Uqi,$Md,a7r,qMd,hge,WMd,rot,qqi,YMt,VMd,Lke,Wqi,SHn,bHn,Lqi,KMd,not,u7r,EHn,jMt,d7r,Mqi,$qi,Oqi,GMd,U$e};
