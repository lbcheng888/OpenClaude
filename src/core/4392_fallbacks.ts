// @ts-nocheck
import {isFirstPartyApiBackend as C7,Ps as si} from "../api/1287_usesFirstPartyModelIds.ts";
import {$Le as wOe,xbe as OTe,ULe as vOe} from "../session/0132_sent.ts";
import {HM as o1,IM as s1,xM as i1} from "../../vendor/m1450.ts";
import {YNe as O1e,h7 as A8} from "../telemetry/1454_model.ts";
import {tj as dz,r6i as sFi,Vqi as zBi,Gqi as KBi,gge as qAe,iot as $tt,RHn as ewn,Qqi as eFi,nj as pz} from "../agent/2746_partialTextChars.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function Hu6(reason) {
  return reason === "refusal" || reason === "sticky";
}
function JkO(reason) {
  return reason === "refusal" || reason === "sticky" ? reason : "other";
}
function ZdK(serverLane, currentModel, betas, stickyBetas) {
  let o = serverLane !== undefined && currentModel === serverLane.forModel && C7() && !wOe(stickyBetas, o1);
  if (o) OTe(stickyBetas, o1);
  if (vOe(stickyBetas, o1) && !betas.includes(o1)) betas.push(o1);
  return o ? {
    fallbacks: [{
      model: serverLane.model
    }]
  } : {};
}
function GdK(message) {
  return message.message.content.some(block => block.type !== "text");
}
function RdK(creditArmed, betas, stickyBetas, r) {
  if (creditArmed && !wOe(stickyBetas, s1)) OTe(stickyBetas, s1);
  if (vOe(stickyBetas, s1) && !betas.includes(s1)) betas.push(s1);
  if (r && betas.includes(s1)) {
    let o = r.anthropic_beta;
    if (Array.isArray(o) && o.length > 0 && !o.includes(s1.header)) r.anthropic_beta = [...o, s1.header];
  }
}
function E5q(stopDetails) {
  if (typeof stopDetails !== "object" || stopDetails === null) return;
  let token = stopDetails.fallback_credit_token;
  return typeof token === "string" && token.length > 0 && token.length <= 2048 ? token : undefined;
}
function S5q(transition) {
  return {
    type: "fallback",
    from: {
      model: transition.fromModel
    },
    to: {
      model: transition.model
    }
  };
}
function ex6(modelRef) {
  if (typeof modelRef !== "object" || modelRef === null) return;
  let model = modelRef.model;
  return typeof model === "string" && model.length > 0 ? model : undefined;
}
function C5q(event) {
  if (typeof event !== "object" || event === null) return null;
  let startEvent = event;
  if (startEvent.type !== "refusal") return null;
  let contentBlock = startEvent.category;
  return typeof contentBlock === "string" && contentBlock.length > 0 && contentBlock.length <= 64 ? contentBlock : null;
}
function LdK(block) {
  if (typeof block !== "object" || block === null) return;
  let fallbackBlock = block;
  if (fallbackBlock.type !== "content_block_start" || typeof fallbackBlock.index !== "number") return;
  let toModel = fallbackBlock.content_block;
  if (typeof toModel !== "object" || toModel === null) return;
  let r = toModel;
  if (r.type !== "fallback") return;
  let o = ex6(r.from),
    s = ex6(r.to);
  return o !== undefined && s !== undefined ? {
    index: fallbackBlock.index,
    fromModel: o,
    model: s,
    reason: "refusal",
    category: C5q(r.trigger)
  } : undefined;
}
function _u6(block) {
  if (!hdK(block)) return;
  let t = block,
    n = ex6(t.from),
    r = ex6(t.to);
  return n !== undefined && r !== undefined ? {
    fromModel: n,
    model: r,
    reason: "refusal",
    category: C5q(t.trigger)
  } : undefined;
}
function hdK(event) {
  return typeof event === "object" && event !== null && event.type === "fallback";
}
function b5q(entries) {
  if (typeof entries !== "object" || entries === null) return false;
  let t = entries;
  if (t.type !== "content_block_start" || typeof t.index !== "number") return false;
  let n = t.content_block;
  if (typeof n !== "object" || n === null) return false;
  return n.type === "fallback" && LdK(entries) === undefined;
}
function gx_(usage, t, n) {
  let r = usage.reduce((c, u, d) => u.type === "fallback_message" ? d : c, -1),
    o = n === "refusal" ? r : -1,
    s = usage.reduce((c, u, d) => u.type === "fallback_message" && u.model !== undefined && d !== o ? c + O1e(u.model, u, {
      speed: t.speed
    }) : c, 0),
    i = usage.find(c => c.type === "fallback_message" && c.model !== undefined)?.model,
    a = i !== undefined ? O1e(i, {
      inputTokens: 0,
      outputTokens: 0,
      cacheReadInputTokens: 0,
      cacheCreationInputTokens: 0
    }, {
      speed: t.speed,
      serverToolUse: t.serverToolUse
    }) : 0,
    l = s + a;
  return Number.isFinite(l) ? l : 0;
}
function kdK(input) {
  let fallbackEnabled = {
    servedFallbackModel: undefined,
    entries: []
  };
  if (typeof input !== "object" || input === null) return fallbackEnabled;
  let resolvedModel = input.iterations;
  if (!Array.isArray(resolvedModel)) return fallbackEnabled;
  let serverLane = [],
    o;
  for (let s of resolvedModel) {
    if (typeof s !== "object" || s === null) continue;
    let i = s;
    if (typeof i.type !== "string") continue;
    let a = {
      type: i.type,
      model: typeof i.model === "string" ? i.model : undefined,
      inputTokens: eSw(i.input_tokens),
      outputTokens: eSw(i.output_tokens),
      cacheReadInputTokens: eSw(i.cache_read_input_tokens),
      cacheCreationInputTokens: eSw(i.cache_creation_input_tokens)
    };
    if (serverLane.push(a), i.type === "fallback_message" && a.model !== undefined) o = a.model;
  }
  return {
    servedFallbackModel: o,
    entries: serverLane
  };
}
function NdK(fallback) {
  let t = dz(),
    n = sFi({
      requestDialog: fallback.requestDialog,
      isMainThread: fallback.isMainThread,
      consumerLacksDialogCapability: fallback.consumerLacksDialogCapability
    }),
    r = zBi(fallback.currentModel),
    o = !fallback.alreadyUsed && !fallback.declined && t && !n ? r : undefined,
    s = o !== undefined && KBi() && !wOe(fallback.sticky, o1) ? {
      forModel: fallback.currentModel,
      model: o
    } : undefined;
  return {
    visibleModel: o,
    serverLane: s,
    shouldLogSuppression: !fallback.suppressionAlreadyLogged && t && n && r !== undefined
  };
}
function VdK(fallback, meta) {
  let n = fallback.discardedMessages.some(s => s.message.content.some(i => i.type === "tool_use")),
    r = Hu6(fallback.reason),
    o = r && meta.isMainThread;
  return {
    telemetry: {
      reason: JkO(fallback.reason),
      midStream: fallback.midStream,
      discardedBlockCount: fallback.discardedMessages.length,
      tombstonedHadToolUse: n,
      requestId: fallback.requestId,
      originalModelScope: qAe(fallback.fromModel),
      finalStopReason: fallback.finalStopReason,
      apiRefusalCategory: fallback.apiRefusalCategory != null ? $tt(fallback.apiRefusalCategory) : undefined
    },
    userVisible: r,
    tombstonedToolUse: n,
    swapSession: o,
    showBanner: o
  };
}
function GJa(e, t) {
  return {
    type: "system",
    subtype: "model_refusal_fallback",
    direction: "retry",
    content: e.reason === "refusal" ? ewn(e.fromModel, e.toModel, e.apiRefusalCategory) : eFi(e.fromModel, e.toModel, e.apiRefusalCategory),
    level: "warning",
    trigger: "refusal",
    originalModel: e.fromModel,
    fallbackModel: e.toModel,
    requestId: e.requestId,
    apiRefusalCategory: e.apiRefusalCategory,
    apiRefusalExplanation: null,
    isMeta: false,
    timestamp: t.timestamp,
    uuid: t.uuid
  };
}
var eSw = e => typeof e === "number" && Number.isFinite(e) && e >= 0 ? e : 0,
  qu6;
var nqn = b(() => {
  i1();
  si();
  A8();
  pz();
  qu6 = Object.freeze({
    visibleModel: undefined,
    serverLane: undefined,
    shouldLogSuppression: false
  });
});
export {Hu6 as iWn,JkO as OWp,ZdK as Gol,GdK as Vol,RdK as Kol,E5q as USo,S5q as $So,ex6 as sWn,C5q as zol,LdK as qSo,_u6 as jol,hdK as aWn,b5q as Yol,gx_ as WSo,kdK as K6t,NdK as Jol,VdK as Xol,GJa as Qol,eSw as oWn,qu6 as $sT,nqn as lWn};
