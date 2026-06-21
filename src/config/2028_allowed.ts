// @ts-nocheck
import {c$s,BR,Qvt,fRr,J1e,SRr,g1,$7,VEe,pYe,Zvt,Run,ewt,X1e,bQ,Xvt,fYe,q7,bRr,mYe,PH,h1} from "../../vendor/m1445.ts";
import {isClaudeAISubscriber,Ao,hasAnthropicApiKey,shouldUseWIFAuth} from "./2031_withOAuthRefreshLock.ts";
import {YQ,QAn} from "../../vendor/m2024.ts";
import {getCanonicalName,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {y_,hasFirstPartyCapabilities,getAPIProvider,isFirstPartyAnthropicBaseUrl,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {st} from "../../vendor/m5.ts";
import {Z1e,KEe} from "../../vendor/m1446.ts";
import {getSdkBetas,lt,getIsNonInteractiveSession} from "../session/0131_sent.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {b} from "../../runtime.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {zn,getFeatureValue_CACHED_MAY_BE_STALE} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {jS,T_} from "../api/2023_used.ts";
import {sn} from "./0047_namespace.ts";
import {NH} from "./2024_NH.ts";
import {cXe,isPewterOwlHeader} from "./2026_isPewterOwlTool.ts";
import {isFastModeEligible,ZAn} from "../telemetry/2027_word.ts";
function GWu(betaHeaders: any) {
  let allowedList: any[] = [],
    disallowedList: any[] = [];
  for (let betaItem of betaHeaders) {
    let headerKey = c$s(betaItem);
    if (headerKey && Pti.has(headerKey)) allowedList.push(betaItem);else disallowedList.push(betaItem);
  }
  return {
    allowed: allowedList,
    disallowed: disallowedList
  };
}
function Oti(customBetas: any) {
  if (!customBetas || customBetas.length === 0) return;
  if (isClaudeAISubscriber()) {
    console.warn("Warning: Custom betas are only available for API key users. Ignoring provided betas.");
    return;
  }
  let {
    allowed: allowedBetas,
    disallowed: disallowedBetas
  } = GWu(customBetas);
  for (let rejectedBeta of disallowedBetas) console.warn(`Warning: Beta header '${rejectedBeta}' is not allowed. Only the following betas are supported: ${BR([...Pti]).join(", ")}`);
  return allowedBetas.length > 0 ? allowedBetas : void 0;
}
function gkt(modelId: any) {
  let featureVal = YQ(modelId, "interleaved_thinking");
  if (featureVal !== void 0) return featureVal;
  let canonicalName = getCanonicalName(modelId),
    apiProvider = y_(modelId);
  if (apiProvider === "foundry") return !0;
  if (hasFirstPartyCapabilities(apiProvider)) return !canonicalName.includes("claude-3-");
  if (canonicalName === "claude-haiku-4-5" || canonicalName.includes("claude-3-")) return !1;
  return !0;
}
function VWu(modelName: any) {
  return modelName === "claude-fable-5" || modelName === "claude-mythos-5" || modelName === "claude-opus-4-0" || modelName === "claude-opus-4-1" || modelName === "claude-opus-4-5" || modelName === "claude-opus-4-6" || modelName === "claude-opus-4-7" || modelName === "claude-opus-4-8" || modelName === "claude-sonnet-4-0" || modelName === "claude-sonnet-4-5" || modelName === "claude-sonnet-4-6" || modelName === "claude-haiku-4-5";
}
function KWu(modelId: any) {
  let canonicalName = getCanonicalName(modelId),
    apiProvider = y_(modelId);
  if (apiProvider === "foundry") return !0;
  if (hasFirstPartyCapabilities(apiProvider)) return !canonicalName.includes("claude-3-");
  return canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5" || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-opus-4-7" || canonicalName === "claude-opus-4-8" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-sonnet-4-6" || canonicalName === "claude-haiku-4-5";
}
function qBe(modelId: any) {
  let canonicalName = getCanonicalName(modelId),
    apiProvider = y_(modelId);
  if (!hasFirstPartyCapabilities(apiProvider)) return !1;
  if (canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-sonnet-4-0") return !1;
  return !0;
}
function rhn(modelId: any) {
  let featureVal = YQ(modelId, "temperature");
  if (featureVal !== void 0) return featureVal;
  let canonicalName = getCanonicalName(modelId);
  if (canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-sonnet-4-6" || canonicalName === "claude-haiku-4-5") return !0;
  return !1;
}
function _kt(apiProvider: any) {
  if (apiProvider === "firstParty" || apiProvider === "anthropicAws") return !0;
  return st(process.env.CLAUDE_CODE_ENABLE_AUTO_MODE);
}
function ohn() {
  {
    let apiProvider = getAPIProvider();
    return apiProvider !== "firstParty" && apiProvider !== "anthropicAws" && _kt(apiProvider);
  }
  return !1;
}
function wLr() {
  return BO() || ohn();
}
function XCe(modelId: any) {
  {
    let canonicalName = getCanonicalName(modelId),
      apiProvider = getAPIProvider();
    if (!_kt(apiProvider)) return !1;
    if (canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-haiku-4-5") return !1;
    if (apiProvider !== "firstParty" && apiProvider !== "anthropicAws" && (canonicalName === "claude-opus-4-6" || canonicalName.includes("sonnet") || canonicalName.includes("haiku"))) return !1;
    return !0;
  }
  return !1;
}
function Lti() {
  let apiProvider = getAPIProvider();
  if (apiProvider === "vertex" || apiProvider === "bedrock" || apiProvider === "mantle" || apiProvider === "gateway") return Qvt;
  return fRr;
}
function RLr() {
  let apiProvider = getAPIProvider();
  return apiProvider === "firstParty" || apiProvider === "anthropicAws" || apiProvider === "foundry";
}
function $Be() {
  return st(process.env.CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS) || Z1e("hipaa");
}
function BO() {
  return RLr() && !$Be();
}
function QCe() {
  if (!BO()) return !1;
  if (!isFirstPartyAnthropicBaseUrl()) return !1;
  let apiProvider = getAPIProvider();
  return apiProvider === "firstParty" || apiProvider === "anthropicAws";
}
function dXe(modelId: any, queryOptions: any) {
  let betaList = [...e5(modelId)];
  if (queryOptions?.isAgenticQuery) {
    if (!betaList.includes(J1e)) betaList.push(J1e);
  }
  let sdkBetaList = getSdkBetas();
  if (!sdkBetaList || sdkBetaList.length === 0) return betaList;
  let sdkBetaHeaders = sdkBetaList.map(SRr);
  if (!BO()) sdkBetaHeaders = sdkBetaHeaders.filter((sdkBetaHeader: any) => {
    if (Mti.has(sdkBetaHeader)) return !0;
    return logForDebugging(`SDK beta '${sdkBetaHeader.header}' dropped on 3P`, {
      level: "debug"
    }), !1;
  });
  return [...betaList, ...sdkBetaHeaders.filter((sdkBetaHeader: any) => !betaList.includes(sdkBetaHeader))];
}
function pfe() {
  xLr.cache?.clear?.(), e5.cache?.clear?.(), kLr.cache?.clear?.(), nhn.cache?.clear?.();
}
function HLr(betaHeaders: any) {
  if (RLr()) return betaHeaders;
  return betaHeaders.filter((betaHeader: any) => Mti.has(betaHeader));
}
var Pti, nhn, xLr, e5, kLr, Mti;
var jR = b(() => {
  ta();
  zn();
  lt();
  g1();
  KEe();
  Ao();
  jS();
  qe();
  sn();
  NH();
  Mo();
  QAn();
  li();
  cXe();
  isFastModeEligible();
  Pti = new Set([$7]);
  nhn = wn((modelId: any) => {
    if (Z1e("hipaa")) return !1;
    if (st(process.env.CLAUDE_CODE_FORCE_MID_CONVERSATION_SYSTEM)) return !0;
    let featureVal = YQ(modelId, "mid_conversation_system");
    if (featureVal !== void 0) return featureVal;
    let canonicalName = getCanonicalName(modelId);
    if (canonicalName.includes("claude-3-") || canonicalName === "claude-opus-4-0" || canonicalName === "claude-opus-4-1" || canonicalName === "claude-opus-4-5" || canonicalName === "claude-opus-4-6" || canonicalName === "claude-opus-4-7" || canonicalName === "claude-sonnet-4-0" || canonicalName === "claude-sonnet-4-5" || canonicalName === "claude-sonnet-4-6" || canonicalName === "claude-haiku-4-5") return !1;
    if (canonicalName === "claude-fable-5" || canonicalName === "claude-mythos-5" || canonicalName === "claude-opus-4-8") return !0;
    return hasFirstPartyCapabilities(y_(modelId));
  });
  xLr = wn((modelId: any) => {
    let betaList: any[] = [],
      canonicalName = getCanonicalName(modelId),
      isHaiku = canonicalName.includes("haiku"),
      apiProvider = getAPIProvider(),
      betasEnabled = BO();
    if (!isHaiku) betaList.push(J1e);
    if (isClaudeAISubscriber() || RLr() && !hasAnthropicApiKey() && shouldUseWIFAuth()) betaList.push(VEe);
    if (T_(modelId)) betaList.push($7);
    if (!st(process.env.DISABLE_INTERLEAVED_THINKING) && gkt(modelId)) betaList.push(pYe);
    if (betasEnabled && gkt(modelId) && !getIsNonInteractiveSession() && !ZAn()) betaList.push(Zvt);
    if (Run && betasEnabled && gkt(modelId) && getAPIProvider() === "firstParty") betaList.push(Run);
    if (betasEnabled && isPewterOwlHeader()) betaList.push(ewt);
    let useContextMgmt = st(process.env.USE_API_CONTEXT_MANAGEMENT) && !1,
      supportsContextWindow = KWu(modelId);
    if (hasFirstPartyCapabilities(y_(modelId)) && !$Be() && (useContextMgmt || supportsContextWindow)) betaList.push(X1e);
    let toolPearEnabled = getFeatureValue_CACHED_MAY_BE_STALE("tengu_tool_pear", !1);
    if (hasFirstPartyCapabilities(y_(modelId)) && !$Be() && qBe(modelId) && toolPearEnabled) betaList.push(bQ);
    if (apiProvider === "vertex" && VWu(canonicalName)) betaList.push(Xvt);
    if (apiProvider === "foundry") betaList.push(Xvt);
    if (betasEnabled) betaList.push(fYe);
    if (nhn(modelId)) betaList.push(q7);
    if (process.env.ANTHROPIC_BETAS) betaList.push(...process.env.ANTHROPIC_BETAS.split(",").map((betaStr: any) => betaStr.trim()).filter(Boolean).map(SRr));
    return betaList;
  }), e5 = wn((modelId: any) => {
    let allBetas = xLr(modelId);
    if (y_(modelId) === "bedrock") return allBetas.filter((betaHeader: any) => !bRr.has(betaHeader));
    return allBetas;
  }), kLr = wn((modelId: any) => xLr(modelId).filter((betaHeader: any) => bRr.has(betaHeader)));
  Mti = new Set([J1e, pYe, $7, X1e, bQ, Xvt, mYe, Qvt, PH, h1]);
});
export {GWu,Oti,gkt,VWu,KWu,qBe,rhn,_kt,ohn,wLr,XCe,Lti,RLr,$Be,BO,QCe,dXe,pfe,HLr,Pti,nhn,xLr,e5,kLr,Mti,jR};
