// @ts-nocheck
import {o5s,Yv,Akt,W0r,GNe,J0r,xM,m7,HAe,cXe,Rkt,dmn,vkt,VNe,TQ,Ckt,dXe,f7,X0r,uXe,lI,IM} from "../../vendor/m1450.ts";
import {isClaudeAISubscriber as Eo,lo,hasAnthropicApiKey as Xwt,shouldUseWIFAuth as dE} from "./2036_withOAuthRefreshLock.ts";
import {m8,G0t} from "../../vendor/m2029.ts";
import {getCanonicalName as So,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getProviderForModel as w_,hasFirstPartyCapabilities as AM,getAPIProvider as Rr,isFirstPartyAnthropicBaseUrl as Su,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {nt} from "../../vendor/m127.ts";
import {zNe,IAe} from "../../vendor/m1451.ts";
import {getSdkBetas as BT,lt,getIsNonInteractiveSession as kr} from "../session/0132_sent.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {jn,getFeatureValue_CACHED_MAY_BE_STALE as it} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {GS,k_} from "../api/2028_used.ts";
import {dn} from "./0137_namespace.ts";
import {mI} from "./2029_mI.ts";
import {aZe,isPewterOwlHeader as ZFr} from "./2031_isPewterOwlTool.ts";
import {$M,Oyn} from "../telemetry/2032_word.ts";
/**
 * Beta header allow/deny partitioning and per-model beta header assembly.
 *
 * Determines which Anthropic beta headers are allowed for a given model /
 * API provider, partitions custom betas into allowed/disallowed, and builds
 * the final beta header list (interleaved thinking, context management,
 * tool-pear, mid-conversation system, fine-grained tool streaming, etc.).
 */

/**
 * Partition beta headers into allowed (in the supported set) and disallowed.
 */
function ced(betaHeaders: any) {
  let allowedList: any[] = [],
    disallowedList: any[] = [];
  for (let betaItem of betaHeaders) {
    let headerKey = o5s(betaItem);
    if (headerKey && Hai.has(headerKey)) allowedList.push(betaItem);else disallowedList.push(betaItem);
  }
  return {
    allowed: allowedList,
    disallowed: disallowedList
  };
}

/**
 * Validate custom betas: only available to API key users; warn and drop any
 * header not in the supported allow-set. Returns the allowed subset or void.
 */
function Iai(customBetas: any) {
  if (!customBetas || customBetas.length === 0) return;
  if (Eo()) {
    console.warn("Warning: Custom betas are only available for API key users. Ignoring provided betas.");
    return;
  }
  let {
    allowed: allowedBetas,
    disallowed: disallowedBetas
  } = ced(customBetas);
  for (let rejectedBeta of disallowedBetas) console.warn(`Warning: Beta header '${rejectedBeta}' is not allowed. Only the following betas are supported: ${Yv([...Hai]).join(", ")}`);
  return allowedBetas.length > 0 ? allowedBetas : void 0;
}

/** Whether interleaved thinking is enabled for the given model. */
function V0t(modelId: any) {
  let featureVal = m8(modelId, "interleaved_thinking");
  if (featureVal !== void 0) return featureVal;
  let canonicalName = So(modelId),
    apiProvider = w_(modelId);
  if (apiProvider === "foundry") return !0;
  if (AM(apiProvider)) return !canonicalName.includes("claude-3-");
  if (canonicalName === "claude-haiku-4-5" || canonicalName.includes("claude-3-")) return !1;
  return !0;
}

/** Whether the given model name is one of the known supported model ids. */
function ued(modelName: any) {
  return modelName === "claude-fable-5" || modelName === "claude-mythos-5" || modelName === "claude-opus-4-0" || modelName === "claude-opus-4-1" || modelName === "claude-opus-4-5" || modelName === "claude-opus-4-6" || modelName === "claude-opus-4-7" || modelName === "claude-opus-4-8" || modelName === "claude-sonnet-4-0" || modelName === "claude-sonnet-4-5" || modelName === "claude-sonnet-4-6" || modelName === "claude-haiku-4-5";
}

/** Whether the model supports the context-management beta. */
function ded(modelId: any) {
  let canonicalName = So(modelId),
    apiProvider = w_(modelId);
  if (apiProvider === "foundry") return !0;
  if (AM(apiProvider)) return !canonicalName.includes("claude-3-");
  return canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5" || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-opus-4-7" || canonicalName === "claude-opus-4-8" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-sonnet-4-6" || canonicalName === "claude-haiku-4-5";
}

/** Whether the tool-pear beta is eligible for the given model. */
function FBe(modelId: any) {
  let canonicalName = So(modelId),
    apiProvider = w_(modelId);
  if (!AM(apiProvider)) return !1;
  if (canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-sonnet-4-0") return !1;
  return !0;
}

/** Whether temperature is supported / configurable for the given model. */
function Nyn(modelId: any) {
  let featureVal = m8(modelId, "temperature");
  if (featureVal !== void 0) return featureVal;
  let canonicalName = So(modelId);
  if (canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-sonnet-4-6" || canonicalName === "claude-haiku-4-5") return !0;
  return !1;
}

/** Whether auto-mode is enabled for the given API provider. */
function cZe(apiProvider: any) {
  if (apiProvider === "firstParty" || apiProvider === "anthropicAws") return !0;
  return nt(process.env.CLAUDE_CODE_ENABLE_AUTO_MODE);
}

/** Whether auto-mode is active for a non-first-party provider. */
function Fyn() {
  let apiProvider = Rr();
  return apiProvider !== "firstParty" && apiProvider !== "anthropicAws" && cZe(apiProvider);
}

function nBr() {
  return nO() || Fyn();
}

/** Whether auto-mode betas are eligible for the given model. */
function bfe(modelId: any) {
  {
    let canonicalName = So(modelId),
      apiProvider = Rr();
    if (!cZe(apiProvider)) return !1;
    if (canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-haiku-4-5") return !1;
    if (apiProvider !== "firstParty" && apiProvider !== "anthropicAws" && (canonicalName === "claude-opus-4-6" || canonicalName === "claude-sonnet-4-6" || canonicalName.includes("haiku"))) return !1;
    return !0;
  }
  return !1;
}

/** Pick the prompt-caching beta header constant based on provider. */
function xai() {
  let apiProvider = Rr();
  if (apiProvider === "vertex" || apiProvider === "bedrock" || apiProvider === "mantle" || apiProvider === "gateway") return Akt;
  return W0r;
}

/** Whether the current provider is a first-party-capable provider. */
function rBr() {
  let apiProvider = Rr();
  return apiProvider === "firstParty" || apiProvider === "anthropicAws" || apiProvider === "foundry";
}

/** Whether experimental betas are disabled (env flag or HIPAA mode). */
function NBe() {
  return nt(process.env.CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS) || zNe("hipaa");
}

/** Whether experimental betas are enabled for the current provider. */
function nO() {
  return rBr() && !NBe();
}

function ORe() {
  if (!nO()) return !1;
  if (!Su()) return !1;
  let apiProvider = Rr();
  return apiProvider === "firstParty" || apiProvider === "anthropicAws";
}

/** Build the full beta header list for a model, merging in SDK betas. */
function uZe(modelId: any, queryOptions: any) {
  let betaList = [...h8(modelId)];
  if (queryOptions?.isAgenticQuery) {
    if (!betaList.includes(GNe)) betaList.push(GNe);
  }
  let sdkBetaList = BT();
  if (!sdkBetaList || sdkBetaList.length === 0) return betaList;
  let sdkBetaHeaders = sdkBetaList.map(J0r);
  if (!nO()) sdkBetaHeaders = sdkBetaHeaders.filter((sdkBetaHeader: any) => {
    if (Dai.has(sdkBetaHeader)) return !0;
    return A(`SDK beta '${sdkBetaHeader.header}' dropped on 3P`, {
      level: "debug"
    }), !1;
  });
  return [...betaList, ...sdkBetaHeaders.filter((sdkBetaHeader: any) => !betaList.includes(sdkBetaHeader))];
}

/** Clear all memoized beta-computation caches. */
function VQ() {
  oBr.cache?.clear?.(), h8.cache?.clear?.(), sBr.cache?.clear?.(), Myn.cache?.clear?.();
}

/** Filter a beta list down to those allowed on non-first-party providers. */
function iBr(betaHeaders: any) {
  if (rBr()) return betaHeaders;
  return betaHeaders.filter((betaHeader: any) => Dai.has(betaHeader));
}

var Hai: Set<any>, Myn: any, oBr: any, h8: any, sBr: any, Dai: Set<any>;
var MR = b(() => {
  Wi();
  jn();
  lt();
  xM();
  IAe();
  lo();
  GS();
  qe();
  dn();
  mI();
  Ro();
  G0t();
  Ps();
  aZe();
  $M();
  Hai = new Set([m7]);
  Myn = Hn((modelId: any) => {
    if (zNe("hipaa")) return !1;
    if (nt(process.env.CLAUDE_CODE_FORCE_MID_CONVERSATION_SYSTEM)) return !0;
    let featureVal = m8(modelId, "mid_conversation_system");
    if (featureVal !== void 0) return featureVal;
    let canonicalName = So(modelId);
    if (canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-opus-4-7" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-sonnet-4-6" || canonicalName === "claude-haiku-4-5") return !1;
    if (canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5" || canonicalName === "claude-opus-4-8") return !0;
    return AM(w_(modelId));
  });
  oBr = Hn((modelId: any) => {
    let betaList: any[] = [],
      canonicalName = So(modelId),
      isHaiku = canonicalName.includes("haiku"),
      apiProvider = Rr(),
      betasEnabled = nO();
    if (!isHaiku) betaList.push(GNe);
    if (Eo() || rBr() && !Xwt() && dE()) betaList.push(HAe);
    if (k_(modelId)) betaList.push(m7);
    if (!nt(process.env.DISABLE_INTERLEAVED_THINKING) && V0t(modelId)) betaList.push(cXe);
    if (betasEnabled && V0t(modelId) && !kr() && !Oyn()) betaList.push(Rkt);
    if (dmn && betasEnabled && V0t(modelId) && Rr() === "firstParty") betaList.push(dmn);
    if (betasEnabled && ZFr()) betaList.push(vkt);
    let useContextMgmt = nt(process.env.USE_API_CONTEXT_MANAGEMENT) && !1,
      supportsContextWindow = ded(modelId);
    if (AM(w_(modelId)) && !NBe() && (useContextMgmt || supportsContextWindow)) betaList.push(VNe);
    let toolPearEnabled = it("tengu_tool_pear", !1);
    if (AM(w_(modelId)) && !NBe() && FBe(modelId) && toolPearEnabled) betaList.push(TQ);
    if (apiProvider === "vertex" && ued(canonicalName)) betaList.push(Ckt);
    if (apiProvider === "foundry") betaList.push(Ckt);
    if (betasEnabled) betaList.push(dXe);
    if (Myn(modelId)) betaList.push(f7);
    if (process.env.ANTHROPIC_BETAS) betaList.push(...process.env.ANTHROPIC_BETAS.split(",").map((betaStr: any) => betaStr.trim()).filter(Boolean).map(J0r));
    return betaList;
  }), h8 = Hn((modelId: any) => {
    let allBetas = oBr(modelId);
    if (w_(modelId) === "bedrock") return allBetas.filter((betaHeader: any) => !X0r.has(betaHeader));
    return allBetas;
  }), sBr = Hn((modelId: any) => oBr(modelId).filter((betaHeader: any) => X0r.has(betaHeader)));
  Dai = new Set([GNe, cXe, m7, VNe, TQ, Ckt, uXe, Akt, lI, IM]);
});

export {ced,Iai,V0t,ued,ded,FBe,Nyn,cZe,Fyn,nBr,bfe,xai,rBr,NBe,nO,ORe,uZe,VQ as isUltraReviewAvailable,iBr,Hai,Myn,oBr,h8,sBr,Dai,MR};
