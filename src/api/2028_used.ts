// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {getCanonicalName as So,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getProviderForModel as w_,isFirstPartyAnthropicBaseUrl as Su,hasFirstPartyCapabilities as AM,Ps} from "./1287_usesFirstPartyModelIds.ts";
import {Ne} from "../../vendor/m583.ts";
import {isLongContext1mCreditsBlocked as DKe,lt} from "../session/0132_sent.ts";
import {m7,xM} from "../../vendor/m1450.ts";
import {getCachedClientData as pI,getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {yai,JFr} from "../../vendor/m2026.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
/** Returns truthy if the CLAUDE_CODE_DISABLE_1M_CONTEXT env var is set. */
function Pme() {
  return nt(process.env.CLAUDE_CODE_DISABLE_1M_CONTEXT);
}

/** Returns true if 1M context is enabled and the model name contains "[1m]" (case-insensitive). */
function k_(modelName: any) {
  if (Pme()) return !1;
  return /\[1m\]/i.test(modelName);
}

/** Returns true if the model is a long-context-eligible Fable/Mythos/Opus variant on a first-party or supported backend. */
function pF(modelName: any) {
  if (Pme()) return !1;
  let canonicalName = So(modelName);
  if (canonicalName !== "claude-fable-5" && canonicalName !== "claude-mythos-5" && canonicalName !== "claude-mythos-preview" && canonicalName !== "claude-opus-4-7" && canonicalName !== "claude-opus-4-8") return !1;
  let providerKind = w_(modelName);
  return providerKind === "firstParty" && Su() || providerKind === "anthropicAws" || providerKind === "mantle";
}

/** Returns true if the model is a claude-3 or early claude-opus-4 variant (legacy, not 1M-eligible). */
function vmn(canonicalName: any) {
  return canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-haiku-4-5";
}

/** Returns true if the model supports extended (200k+) context window. */
function X5(modelName: any) {
  if (Pme()) return !1;
  let canonicalName = So(modelName);
  if (vmn(canonicalName)) return !1;
  if (canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5" || canonicalName === "claude-opus-4-8" || canonicalName === "claude-opus-4-7" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-sonnet-4-6" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-sonnet-4-0") return !0;
  return AM(w_(modelName));
}

/** Resolves the effective max context token count for a given model and headers. */
function iE(modelName: any, headers: any) {
  let overrideTokens = Sai();
  if (overrideTokens !== void 0) return overrideTokens;
  if (XFr(modelName, headers)) return WQ;
  return bai(modelName, headers);
}

/** Returns the CLAUDE_CODE_MAX_CONTEXT_TOKENS override if compact is disabled and the env var is set. */
function Sai() {
  if (Ne.DISABLE_COMPACT && process.env.CLAUDE_CODE_MAX_CONTEXT_TOKENS) {
    let tokenCount = parseInt(process.env.CLAUDE_CODE_MAX_CONTEXT_TOKENS, 10);
    if (!isNaN(tokenCount) && tokenCount > 0) return tokenCount;
  }
  return;
}

/** Returns true if long-context credits are blocked and the model's natural limit exceeds WQ. */
function XFr(modelName: any, headers: any) {
  return DKe() && Sai() === void 0 && bai(modelName, headers) > WQ;
}

/** Resolves the natural max context token count before credit/override caps are applied. */
function bai(modelName: any, headers: any) {
  if (k_(modelName)) return 1e6;
  if (headers?.includes(m7.header) && X5(modelName)) return 1e6;
  if (pF(modelName)) return 1e6;
  let kelpTokens = xyn(modelName);
  if (kelpTokens !== null) return kelpTokens;
  return $0t;
}

/** Returns the clientDataCache from the global config. */
function Eai() {
  return pI();
}

/** Returns the autoCompactWindowsCache from the global config, or null. */
function Cai() {
  return Ot().autoCompactWindowsCache ?? null;
}

/** Returns the kelp_forest_sonnet token override for claude-sonnet-4-6, or null. */
function xyn(modelName: any) {
  if (Pme()) return null;
  if (k_(modelName)) return null;
  if (So(modelName) !== "claude-sonnet-4-6") return null;
  let kelpValue = pI()?.kelp_forest_sonnet;
  if (typeof kelpValue !== "string") return null;
  let parsedTokens = parseInt(kelpValue, 10);
  if (!Number.isFinite(parsedTokens) || parsedTokens <= 0) return null;
  return parsedTokens;
}

/** Computes used/remaining percentage from token usage and max context. */
function Dyn(usage: any, maxContext: any) {
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
function ted(canonicalName: any) {
  let heatherVale = pI()?.heather_vale;
  if (typeof heatherVale !== "object" || heatherVale === null || Array.isArray(heatherVale)) return null;
  let modelLimit = heatherVale[canonicalName];
  if (typeof modelLimit !== "number" || !Number.isInteger(modelLimit) || modelLimit <= 0) return null;
  return modelLimit;
}

/** Returns default and upper-limit output token counts for the given model. */
function DRe(modelName: any) {
  let defaultTokens: any,
    upperLimit: any,
    canonicalName = So(modelName);
  if (canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5") defaultTokens = 64000, upperLimit = 128000;else if (canonicalName === "claude-opus-4-8") defaultTokens = 64000, upperLimit = 128000;else if (canonicalName === "claude-opus-4-7") defaultTokens = 64000, upperLimit = 128000;else if (canonicalName === "claude-sonnet-4-6") defaultTokens = 32000, upperLimit = 128000;else if (canonicalName === "claude-opus-4-6") defaultTokens = 64000, upperLimit = 128000;else if (canonicalName === "claude-opus-4-5" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-haiku-4-5") defaultTokens = 32000, upperLimit = 64000;else if (canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-0") defaultTokens = 32000, upperLimit = 32000;else if (canonicalName === "claude-3-opus") defaultTokens = 4096, upperLimit = 4096;else if (canonicalName === "claude-3-sonnet") defaultTokens = 8192, upperLimit = 8192;else if (canonicalName === "claude-3-haiku") defaultTokens = 4096, upperLimit = 4096;else if (canonicalName === "claude-3-5-sonnet" || canonicalName === "claude-3-5-haiku") defaultTokens = 8192, upperLimit = 8192;else if (canonicalName === "claude-3-7-sonnet") defaultTokens = 32000, upperLimit = 64000;else defaultTokens = ZZu, upperLimit = eed;
  let heatherValeLimit = ted(canonicalName);
  if (heatherValeLimit !== null) defaultTokens = Math.min(heatherValeLimit, upperLimit);
  let modelDef = yai(modelName);
  if (modelDef?.max_tokens && modelDef.max_tokens >= 4096) upperLimit = modelDef.max_tokens, defaultTokens = Math.min(defaultTokens, upperLimit);
  return {
    default: defaultTokens,
    upperLimit: upperLimit
  };
}

/** Returns the model's upper output token limit minus one. */
function Aai(modelName: any) {
  return DRe(modelName).upperLimit - 1;
}
var $0t = 200000,
  WQ = 200000,
  q0t = 20000,
  ZZu = 32000,
  eed = 128000;
var GS = b(() => {
  lt();
  xM();
  tr();
  Ir();
  dn();
  Ro();
  JFr();
  Ps();
});

export {Pme,k_,pF,vmn,X5,iE,Sai,XFr,bai,Eai,Cai,xyn,Dyn,ted,DRe,Aai,$0t,WQ,q0t,ZZu,eed,GS};
