// @ts-nocheck
import {je as Ge} from "../../vendor/m577.ts";
import {bc as Sc,Ug as jg} from "../../vendor/m2264.ts";
import {isFirstPartyApiBackend as C7,usesFirstPartyModelIds as Cd,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
import {dfe as Kme,kti as yei,XAn as cAn,zQ as BQ,NH as IH} from "../config/2024_NH.ts";
import {getCanonicalName as qo,isNonCustomOpusModel as Uoe,isPinnedFableModel as _8,getDefaultOpusModel as NS,strip1mTag as Uvt,swapShrinksContextWindow as MEe,isModelAllowedUnderActiveEnforcement as PB,isExemptDefaultResolvingPick as QT,renderModelName as Op,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {tnt as Btt,O2e as p2e} from "../config/2733_value.ts";
import {isModelAllowed as Cl} from "../../vendor/m1451.ts";
import {n1e as aoe,Pd as Pp} from "../../vendor/m701.ts";
import {isSdkDialogHostActive as kOe,getSdkSupportedDialogKinds as HOe,lt as ct} from "../session/0131_sent.ts";
import {b} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
// @ts-nocheck
function Bn() {
  return !Ge.CLAUDE_CODE_DISABLE_REFUSAL_FALLBACK;
}
function sn9() {
  return Bn() && Sc("switchModelsOnFlag", true).value && C7();
}
function zTH(H) {
  if (Kme(H)) return "eap";
  return "other";
}
function GE5() {
  let H = Ge.ANTHROPIC_DEFAULT_OPUS_MODEL;
  if (H) {
    let _ = qo(H);
    return _.replace(/\[1m\]$/, "").startsWith("claude-") && !Uoe(_) ? undefined : H;
  }
  return Btt().map(_ => _.value).filter(_ => typeof _ === "string" && _.length > 0).map(_ => _.replace(/\[1m\]$/, "")).find(_ => qo(_).replace(/\[1m\]$/, "") === "claude-opus-4-8");
}
function tn9(H) {
  return RE5(Hi9(H));
}
function en9(H) {
  return Hi9(H) !== undefined;
}
function Hi9(H) {
  let _ = qo(H);
  if (yei(_)) return;
  if (!cAn(_) && !BQ(_) && !Kme(H) && !_8(H)) return;
  if (!Cd()) return GE5();
  let q = NS();
  if (!Uoe(qo(q))) return;
  if (/\[1m\]/i.test(H)) return q;
  let K = Uvt(q);
  if (K !== q && MEe(H, K)) return;
  return K;
}
function RE5(H) {
  if (H === undefined) return;
  return PB(H) ?? (Cl(H) || QT(H)) ? H : undefined;
}
function cO6(e) {
  let t = e?.match(/https:\/\/claude\.com\/form\/\S+/)?.[0].replace(/[.,;:!?)]+$/, "");
  return t != null && t.length <= moH ? t : qCd;
}
function nMH() {
  return Bn();
}
function Pn(H) {
  return H === "cyber" || H === "bio";
}
function AQ9(H) {
  return H === "frontier_llm" || H === "reasoning_extraction";
}
function COH(e) {
  return Pn(e) || AQ9(e) ? e : "other";
}
function aL5(H, t) {
  return AQ9(t) ? `${Op(H)} has safety measures that flagged something in this session. This sometimes happens with safe, normal conversations.` : Y2_;
}
function wQ9(e, t, n) {
  let r = Op(t);
  return `${Pn(n) ? `${Op(e)}'s safety measures flagged this message for cybersecurity or biology topics. ${vrH}` : aL5(e, n)} Switched to ${r}. ${Ftt}`;
}
function fQ9(model, t, n) {
  let r = Op(t);
  return `${Pn(n) ? `${Op(model)} has safety measures that flag messages on most cybersecurity or biology topics. ${vrH}` : aL5(model, n)} Switched to ${r}. ${Ftt}`;
}
function jQ9(model) {
  let _ = model;
  if (_.length > 0 && !/[.!?\u2026\u3002\uFF01\uFF1F'")\]]$/.test(_)) {
    let n = Math.max(0, _.length - 48),
      r = Math.max(_.lastIndexOf(" "), _.lastIndexOf(`
`), _.lastIndexOf("\t"));
    if (r > 0 && r >= n) _ = _.slice(0, r).trimEnd();
  }
  return _.trimEnd();
}
function sL5(candidate) {
  let _ = candidate.flatMap(s => !s.isApiErrorMessage && Array.isArray(s.message.content) ? s.message.content : []),
    __2 = jQ9(_.flatMap(s => s.type === "text" ? [s.text] : []).join(`

`).trim()),
    q = _.flatMap(s => s.type === "tool_use" ? [s.input] : []),
    o = q.some(s => typeof s === "object" && s !== null && Object.keys(s).length === 0 || aoe(s));
  return {
    partialTextChars: __2.length,
    toolUseCount: q.length,
    hadEmptyInputToolUse: o
  };
}
function Y56({
  salvage: e,
  streamedText: t,
  serverRetainedUuids: n
}) {
  if (e === null) return t.trim().length > 0 ? {
    kind: "mint",
    text: t
  } : {
    kind: "none"
  };
  if (n === null) return {
    kind: "mint",
    text: e + t
  };
  return t.trim().length > 0 ? {
    kind: "mint-replacing",
    text: e + t,
    replacesUuids: n
  } : {
    kind: "none"
  };
}
function $MH() {
  return kOe() && !(HOe() ?? []).includes("refusal_fallback_prompt");
}
function A56(fromModel) {
  if (!fromModel.isMainThread) return "subagent";
  if (fromModel.requestDialog === undefined) return "no_dialog_host";
  if (Sc("switchModelsOnFlag", true).value) return "setting";
  if (fromModel.consumerLacksDialogCapability) return "no_consumer_capability";
  return;
}
function DQ9(fromModel) {
  return fromModel.isMainThread && (fromModel.requestDialog === undefined || fromModel.consumerLacksDialogCapability) && Sc("switchModelsOnFlag", true).value === false;
}
function w56() {
  if (Cd()) return;
  return "To enable automatic fallback on this provider, set `ANTHROPIC_DEFAULT_FABLE_MODEL` to your Fable 5 model ID and `ANTHROPIC_DEFAULT_OPUS_MODEL` to your Opus 4.8 model ID.";
}
function MQ9(model, t) {
  return `${Pn(t) ? `${Op(model)} has safety measures that flag messages on most cybersecurity or biology topics. ${vrH}` : aL5(model, t)} ${Ftt}`;
}
function PQ9(H, t) {
  return {
    retry_fallback: `Switch to ${Op(t)}`,
    edit_prompt: `Edit prompt and retry with ${Op(H)}`
  };
}
var m2e = "https://support.claude.com/en/articles/15363606",
  Ftt,
  qCd = "https://claude.com/form/cyber-use-case",
  moH = 400,
  PP_ = "Switch models when a message is flagged",
  _i9 = "These measures let us bring you Mythos-level capability in other areas sooner, and we're working to refine them.",
  vrH,
  Y2_ = "This model has safety measures that flagged something in this session. This sometimes happens with safe, normal conversations.";
var gZ8 = b(() => {
  ct();
  Or();
  Pp();
  IH();
  Fo();
  p2e();
  si();
  jg();
  Ftt = `Send feedback with /feedback or learn more: ${m2e}`;
  vrH = `They may flag safe, normal content as well. ${_i9}`;
});

export {Bn as Rz,sn9 as eUi,zTH as ohe,GE5 as lRd,tn9 as tUi,en9 as nUi,Hi9 as rUi,RE5 as cRd,cO6 as oUi,nMH as Nwn,Pn as rnt,AQ9 as iUi,COH as ont,aL5 as B8r,wQ9 as Bwn,fQ9 as aUi,jQ9 as fRd,sL5 as lUi,Y56 as cUi,$MH as uUi,A56 as dUi,DQ9 as pUi,w56 as mUi,MQ9 as fUi,PQ9 as AUi,m2e as L2e,Ftt as nnt,qCd as uRd,moH as dRd,PP_ as sUi,_i9 as pRd,vrH as AOt,Y2_ as mRd,gZ8 as xz};
