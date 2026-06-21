// @ts-nocheck
import {st} from "../../vendor/m5.ts";
import {getCanonicalName,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {y_,isFirstPartyAnthropicBaseUrl,hasFirstPartyCapabilities,li} from "./1282_usesFirstPartyModelIds.ts";
import {je} from "../../vendor/m577.ts";
import {isLongContext1mCreditsBlocked,lt} from "../session/0131_sent.ts";
import {$7,g1} from "../../vendor/m1445.ts";
import {getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {bti,TLr} from "../../vendor/m2021.ts";
import {b} from "../../runtime.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn} from "../config/0047_namespace.ts";
/** Returns truthy if the CLAUDE_CODE_DISABLE_1M_CONTEXT env var is set. */
function vme() {
  return st(process.env.CLAUDE_CODE_DISABLE_1M_CONTEXT);
}

/** Returns true if 1M context is enabled and the model name contains "[1m]" (case-insensitive). */
function T_(modelName: any) {
  if (vme()) return !1;
  return /\[1m\]/i.test(modelName);
}

/** Returns true if the model is a long-context-eligible Fable/Mythos/Opus variant on a first-party or supported backend. */
function jB(modelName: any) {
  if (vme()) return !1;
  let canonicalName = getCanonicalName(modelName);
  if (canonicalName !== "claude-fable-5" && canonicalName !== "claude-mythos-5" && canonicalName !== "claude-mythos-preview" && canonicalName !== "claude-opus-4-7" && canonicalName !== "claude-opus-4-8") return !1;
  let providerKind = y_(modelName);
  return providerKind === "firstParty" && isFirstPartyAnthropicBaseUrl() || providerKind === "anthropicAws" || providerKind === "mantle";
}

/** Returns true if the model is a claude-3 or early claude-opus-4 variant (legacy, not 1M-eligible). */
function Wun(canonicalName: any) {
  return canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-haiku-4-5";
}

/** Returns true if the model supports extended (200k+) context window. */
function N8(modelName: any) {
  if (vme()) return !1;
  let canonicalName = getCanonicalName(modelName);
  if (Wun(canonicalName)) return !1;
  if (canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5" || canonicalName === "claude-opus-4-8" || canonicalName === "claude-opus-4-7" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-sonnet-4-6" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-sonnet-4-0") return !0;
  return hasFirstPartyCapabilities(y_(modelName));
}

/** Resolves the effective max context token count for a given model and headers. */
function nE(modelName: any, headers: any) {
  let overrideTokens = Cti();
  if (overrideTokens !== void 0) return overrideTokens;
  if (SLr(modelName, headers)) return KQ;
  return vti(modelName, headers);
}

/** Returns the CLAUDE_CODE_MAX_CONTEXT_TOKENS override if compact is disabled and the env var is set. */
function Cti() {
  if (je.DISABLE_COMPACT && process.env.CLAUDE_CODE_MAX_CONTEXT_TOKENS) {
    let tokenCount = parseInt(process.env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, 10);
    if (!isNaN(tokenCount) && tokenCount > 0) return tokenCount;
  }
  return;
}

/** Returns true if long-context credits are blocked and the model's natural limit exceeds KQ. */
function SLr(modelName: any, headers: any) {
  return isLongContext1mCreditsBlocked() && Cti() === void 0 && vti(modelName, headers) > KQ;
}

/** Resolves the natural max context token count before credit/override caps are applied. */
function vti(modelName: any, headers: any) {
  if (T_(modelName)) return 1e6;
  if (headers?.includes($7.header) && N8(modelName)) return 1e6;
  if (jB(modelName)) return 1e6;
  let kelpTokens = YAn(modelName);
  if (kelpTokens !== null) return kelpTokens;
  return fkt;
}

/** Returns the clientDataCache from the global config, or null. */
function wti() {
  return getGlobalConfig().clientDataCache ?? null;
}

/** Returns the autoCompactWindowsCache from the global config, or null. */
function Rti() {
  return getGlobalConfig().autoCompactWindowsCache ?? null;
}

/** Returns the kelp_forest_sonnet token override for claude-sonnet-4-6, or null. */
function YAn(modelName: any) {
  if (vme()) return null;
  if (T_(modelName)) return null;
  if (getCanonicalName(modelName) !== "claude-sonnet-4-6") return null;
  let kelpValue = getGlobalConfig().clientDataCache?.kelp_forest_sonnet;
  if (typeof kelpValue !== "string") return null;
  let parsedTokens = parseInt(kelpValue, 10);
  if (!Number.isFinite(parsedTokens) || parsedTokens <= 0) return null;
  return parsedTokens;
}

/** Computes used/remaining percentage from token usage and max context. */
function JAn(usage: any, maxContext: any) {
  if (!usage) return {
    used: null,
    remaining: null
  };
  let totalInputTokens = usage.input_tokens + usage.cache_creation_input_tokens + usage.cache_read_input_tokens,
    rawPercent = Math.round(totalInputTokens / maxContext * 100),
    clampedPercent = Math.min(100, Math.max(0, rawPercent));
  return {
    used: clampedPercent,
    remaining: 100 - clampedPercent
  };
}

/** Returns the heather_vale per-model token override from clientDataCache, or null. */
function BWu(canonicalName: any) {
  let heatherVale = getGlobalConfig().clientDataCache?.heather_vale;
  if (typeof heatherVale !== "object" || heatherVale === null || Array.isArray(heatherVale)) return null;
  let modelLimit = heatherVale[canonicalName];
  if (typeof modelLimit !== "number" || !Number.isInteger(modelLimit) || modelLimit <= 0) return null;
  return modelLimit;
}

/** Returns default and upper-limit output token counts for the given model. */
function YCe(modelName: any) {
  let defaultTokens: any,
    upperLimit: any,
    canonicalName = getCanonicalName(modelName);
  if (canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5") defaultTokens = 64000, upperLimit = 128000;else if (canonicalName === "claude-opus-4-8") defaultTokens = 64000, upperLimit = 128000;else if (canonicalName === "claude-opus-4-7") defaultTokens = 64000, upperLimit = 128000;else if (canonicalName === "claude-sonnet-4-6") defaultTokens = 32000, upperLimit = 128000;else if (canonicalName === "claude-opus-4-6") defaultTokens = 64000, upperLimit = 128000;else if (canonicalName === "claude-opus-4-5" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-haiku-4-5") defaultTokens = 32000, upperLimit = 64000;else if (canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-0") defaultTokens = 32000, upperLimit = 32000;else if (canonicalName === "claude-3-opus") defaultTokens = 4096, upperLimit = 4096;else if (canonicalName === "claude-3-sonnet") defaultTokens = 8192, upperLimit = 8192;else if (canonicalName === "claude-3-haiku") defaultTokens = 4096, upperLimit = 4096;else if (canonicalName === "claude-3-5-sonnet" || canonicalName === "claude-3-5-haiku") defaultTokens = 8192, upperLimit = 8192;else if (canonicalName === "claude-3-7-sonnet") defaultTokens = 32000, upperLimit = 64000;else defaultTokens = MWu, upperLimit = NWu;
  let heatherValeLimit = BWu(canonicalName);
  if (heatherValeLimit !== null) defaultTokens = Math.min(heatherValeLimit, upperLimit);
  let modelDef = bti(modelName);
  if (modelDef?.max_tokens && modelDef.max_tokens >= 4096) upperLimit = modelDef.max_tokens, defaultTokens = Math.min(defaultTokens, upperLimit);
  return {
    default: defaultTokens,
    upperLimit: upperLimit
  };
}

/** Returns the model's upper output token limit minus one. */
function xti(modelName: any) {
  return YCe(modelName).upperLimit - 1;
}
var fkt = 200000,
  KQ = 200000,
  Akt = 20000,
  MWu = 32000,
  NWu = 128000;
var jS = b(() => {
  lt();
  g1();
  Qn();
  Lr();
  sn();
  Mo();
  TLr();
  li();
});
export {vme,T_,jB,Wun,N8,nE,Cti,SLr,vti,wti,Rti,YAn,JAn,BWu,YCe,xti,fkt,KQ,Akt,MWu,NWu,jS};
