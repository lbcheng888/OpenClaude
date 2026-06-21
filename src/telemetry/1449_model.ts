// @ts-nocheck
import {uc as h1,tE as nX} from "../api/1448_month.ts";
import {getCanonicalName as lq,getDefaultMainLoopModelSetting as r0,Mo as Qq,firstPartyNameToCanonical as gA} from "../permissions/1453_swapShrinksContextWindow.ts";
import {getGlobalConfig as N_,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {setHasUnknownModelCost as tl_,lt as A_} from "../session/0131_sent.ts";
import {b as L} from "../../runtime.ts";
import {z2 as mm,nvr as PM8,rvr as WM8,tvr as XM8,evr as MM8,ovr as ZM8,svr as GM8,ivr as RM8,avr as LM8,lvr as hM8,cvr as kM8,uvr as yM8,dvr as NM8,pvr as VM8,MEe as qMH,fOs as hL9} from "../../vendor/m1280.ts";
// @ts-nocheck
function getSpeedTierCostOverride(modelId, usage) {
  if (h1() && modelId) {
    if (usage === "claude-opus-4-8") return costOpus4_8Fast;
    return costOpus4Default_2;
  }
  return defaultFallbackCost;
}
function computeCacheWriteCost(pricing, usage) {
  let totalCacheWrite = usage.cache_creation_input_tokens ?? 0,
    ephemeral1hTokens = pricing.promptCacheWrite1hTokens,
    ephemeral1hUsed = Math.min(usage.cache_creation?.ephemeral_1h_input_tokens ?? 0, totalCacheWrite);
  if (ephemeral1hTokens === undefined || ephemeral1hUsed <= 0) return totalCacheWrite / 1e6 * pricing.promptCacheWriteTokens;
  return ephemeral1hUsed / 1e6 * ephemeral1hTokens + (totalCacheWrite - ephemeral1hUsed) / 1e6 * pricing.promptCacheWriteTokens;
}
function computeTotalCost(pricing, usage) {
  return usage.input_tokens / 1e6 * pricing.inputTokens + usage.output_tokens / 1e6 * pricing.outputTokens + (usage.cache_read_input_tokens ?? 0) / 1e6 * pricing.promptCacheReadTokens + computeCacheWriteCost(pricing, usage) + (usage.server_tool_use?.web_search_requests ?? 0) * pricing.webSearchRequests;
}
function getPricingForModel(modelId, usage) {
  let canonical = lq(modelId);
  if (usage.speed === "fast") {
    if (canonical === "claude-opus-4-8") return costOpus4_8Fast;
    if (canonical === "claude-opus-4-6" || canonical === "claude-opus-4-7") return costOpus4Default_2;
  }
  let tableCost = modelCostTable[canonical];
  if (tableCost) return tableCost;
  let additionalCosts = N_().additionalModelCostsCache,
    overrideCost = additionalCosts?.[modelId] ?? additionalCosts?.[canonical];
  if (overrideCost) return overrideCost;
  return logUnknownModelCost(modelId, canonical), modelCostTable[lq(r0())] ?? defaultFallbackCost2;
}
function logUnknownModelCost(modelId, canonicalName) {
  c("tengu_unknown_model_cost", {
    model: modelId,
    shortName: canonicalName
  }), tl_();
}
function computeApiCallCost(modelId, usage) {
  let pricing = getPricingForModel(modelId, usage);
  return computeTotalCost(pricing, usage);
}
function computeTokenCountCost(modelId, tokenCounts, opts) {
  let usage = {
    input_tokens: tokenCounts.inputTokens,
    output_tokens: tokenCounts.outputTokens,
    cache_read_input_tokens: tokenCounts.cacheReadInputTokens,
    cache_creation_input_tokens: tokenCounts.cacheCreationInputTokens,
    ...(opts?.speed !== undefined && {
      speed: opts.speed
    }),
    ...(opts?.serverToolUse !== undefined && {
      server_tool_use: opts.serverToolUse
    })
  };
  return computeApiCallCost(modelId, usage);
}
function formatDollarAmount(amount) {
  if (Number.isInteger(amount)) return `$${amount}`;
  return `$${amount.toFixed(2)}`;
}
function formatPricingLabel(pricing) {
  return `${formatDollarAmount(pricing.inputTokens)}/${formatDollarAmount(pricing.outputTokens)} per Mtok`;
}
function getModelPricingLabel(modelId) {
  let canonical = lq(modelId),
    pricing = modelCostTable[canonical];
  if (!pricing) return;
  return formatPricingLabel(pricing);
}
var costSonnet37, costOpus4Default, defaultFallbackCost, costOpus4Default_2, costOpus4_8Fast, costHaiku35, costHaiku3, defaultFallbackCost2, modelCostTable;
var rF = L(() => {
  v_();
  A_();
  O8();
  nX();
  mm();
  Qq();
  costSonnet37 = {
    inputTokens: 3,
    outputTokens: 15,
    promptCacheWriteTokens: 3.75,
    promptCacheWrite1hTokens: 6,
    promptCacheReadTokens: 0.3,
    webSearchRequests: 0.01
  }, costOpus4Default = {
    inputTokens: 15,
    outputTokens: 75,
    promptCacheWriteTokens: 18.75,
    promptCacheWrite1hTokens: 30,
    promptCacheReadTokens: 1.5,
    webSearchRequests: 0.01
  }, defaultFallbackCost = {
    inputTokens: 5,
    outputTokens: 25,
    promptCacheWriteTokens: 6.25,
    promptCacheWrite1hTokens: 10,
    promptCacheReadTokens: 0.5,
    webSearchRequests: 0.01
  }, costOpus4Default_2 = {
    inputTokens: 30,
    outputTokens: 150,
    promptCacheWriteTokens: 37.5,
    promptCacheWrite1hTokens: 60,
    promptCacheReadTokens: 3,
    webSearchRequests: 0.01
  }, costOpus4_8Fast = {
    inputTokens: 10,
    outputTokens: 50,
    promptCacheWriteTokens: 12.5,
    promptCacheWrite1hTokens: 20,
    promptCacheReadTokens: 1,
    webSearchRequests: 0.01
  }, costHaiku35 = {
    inputTokens: 0.8,
    outputTokens: 4,
    promptCacheWriteTokens: 1,
    promptCacheWrite1hTokens: 1.6,
    promptCacheReadTokens: 0.08,
    webSearchRequests: 0.01
  }, costHaiku3 = {
    inputTokens: 1,
    outputTokens: 5,
    promptCacheWriteTokens: 1.25,
    promptCacheWrite1hTokens: 2,
    promptCacheReadTokens: 0.1,
    webSearchRequests: 0.01
  }, defaultFallbackCost2 = defaultFallbackCost;
  modelCostTable = {
    [gA(PM8.firstParty)]: costHaiku35,
    [gA(WM8.firstParty)]: costHaiku3,
    [gA(XM8.firstParty)]: costSonnet37,
    [gA(MM8.firstParty)]: costSonnet37,
    [gA(ZM8.firstParty)]: costSonnet37,
    [gA(GM8.firstParty)]: costSonnet37,
    [gA(RM8.firstParty)]: costSonnet37,
    [gA(LM8.firstParty)]: costOpus4Default,
    [gA(hM8.firstParty)]: costOpus4Default,
    [gA(kM8.firstParty)]: defaultFallbackCost,
    [gA(yM8.firstParty)]: defaultFallbackCost,
    [gA(NM8.firstParty)]: defaultFallbackCost,
    [gA(VM8.firstParty)]: defaultFallbackCost,
    [gA(qMH.firstParty)]: costOpus4_8Fast,
    [gA(hL9.firstParty)]: costOpus4_8Fast
  };
});

export {getSpeedTierCostOverride as _Ye,computeCacheWriteCost as GPu,computeTotalCost as VPu,getPricingForModel as KPu,logUnknownModelCost as zPu,computeApiCallCost as Koe,computeTokenCountCost as tNe,formatDollarAmount as C$s,formatPricingLabel as $B,getModelPricingLabel as Hun,costSonnet37 as Sme,costOpus4Default as E$s,defaultFallbackCost as Voe,costOpus4Default_2 as v$s,costOpus4_8Fast as kun,costHaiku35 as IRr,costHaiku3 as DRr,defaultFallbackCost2 as WPu,modelCostTable as rwt,rF as P8};
