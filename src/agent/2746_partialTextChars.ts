// @ts-nocheck
import {Ne} from "../../vendor/m583.ts";
import {lc,mg} from "../../vendor/m2209.ts";
import {isFirstPartyApiBackend as c7,usesFirstPartyModelIds as Vu,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {Sfe,Rai,Pyn,GQ,mI} from "../config/2029_mI.ts";
import {getCanonicalName as So,isNonCustomOpusModel as Yoe,isPinnedFableModel as J5,getDefaultOpusModel as ny,strip1mTag as Bkt,swapShrinksContextWindow as LAe,isModelAllowedUnderActiveEnforcement as dF,isExemptDefaultResolvingPick as XT,renderModelName as Tp,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {rot,U$e} from "../config/2745_value.ts";
import {Oa} from "../../vendor/m1456.ts";
import {Y1e,pd} from "../../vendor/m706.ts";
import {isSdkDialogHostActive as GLe,getSdkSupportedDialogKinds as VLe,lt} from "../session/0132_sent.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck
function tj() {
  return !Ne.CLAUDE_CODE_DISABLE_REFUSAL_FALLBACK;
}
function Gqi() {
  return tj() && lc("switchModelsOnFlag", true).value && c7();
}
function gge(model) {
  if (Sfe(model)) return "eap";
  return "other";
}
function zMd() {
  let envModel = Ne.ANTHROPIC_DEFAULT_OPUS_MODEL;
  if (envModel) {
    let canonical = So(envModel);
    return canonical.replace(/\[1m\]$/, "").startsWith("claude-") && !Yoe(canonical) ? undefined : envModel;
  }
  return rot().map(t => t.value).filter(t => typeof t === "string" && t.length > 0).map(t => t.replace(/\[1m\]$/, "")).find(t => So(t).replace(/\[1m\]$/, "") === "claude-opus-4-8");
}
function Vqi(model) {
  return jMd(zqi(model));
}
function Kqi(model) {
  return zqi(model) !== undefined;
}
function zqi(model) {
  let canonical = So(model);
  if (Rai(canonical)) return;
  if (!Pyn(canonical) && !GQ(canonical) && !Sfe(model) && !J5(model)) return;
  if (!Vu()) return zMd();
  let defaultOpus = ny();
  if (!Yoe(So(defaultOpus))) return;
  if (/\[1m\]/i.test(model)) return defaultOpus;
  let stripped = Bkt(defaultOpus);
  if (stripped !== defaultOpus && LAe(model, stripped)) return;
  return stripped;
}
function jMd(candidate) {
  if (candidate === undefined) return;
  return dF(candidate) ?? (Oa(candidate) || XT(candidate)) ? candidate : undefined;
}
function jqi(text) {
  let formUrl = text?.match(/https:\/\/claude\.com\/form\/\S+/)?.[0].replace(/[.,;:!?)]+$/, "");
  return formUrl != null && formUrl.length <= JMd ? formUrl : YMd;
}
function AHn() {
  return tj();
}
function sot(useCase) {
  return useCase === "cyber" || useCase === "bio";
}
function Jqi(useCase) {
  return useCase === "frontier_llm" || useCase === "reasoning_extraction";
}
function iot(useCase) {
  return sot(useCase) || Jqi(useCase) ? useCase : "other";
}
function f7r(model) {
  return `${Tp(model)}'s safeguards flagged this message. The safeguards are intentionally broad right now and may flag safe and routine coding, cybersecurity, or biology work. These measures let us bring you Mythos-level capabilities sooner, and we're working to refine them.`;
}
function h7r(model, useCase) {
  return Jqi(useCase) ? `${Tp(model)}'s safeguards flagged this message. This sometimes happens with safe, normal conversations.` : QMd;
}
function RHn(fromModel, toModel, useCase) {
  let renderedTarget = Tp(toModel);
  return `${sot(useCase) ? f7r(fromModel) : h7r(fromModel, useCase)} Switched to ${renderedTarget}. ${oot}`;
}
function Qqi(fromModel, toModel, useCase) {
  let renderedTarget = Tp(toModel);
  return `${sot(useCase) ? f7r(fromModel) : h7r(fromModel, useCase)} Switched to ${renderedTarget}. ${oot}`;
}
function ZMd(text) {
  let trimmed = text;
  if (trimmed.length > 0 && !/[.!?\u2026\u3002\uFF01\uFF1F'")\]]$/.test(trimmed)) {
    let minBoundary = Math.max(0, trimmed.length - 48),
      lastBreak = Math.max(trimmed.lastIndexOf(" "), trimmed.lastIndexOf(`
`), trimmed.lastIndexOf("\t"));
    if (lastBreak > 0 && lastBreak >= minBoundary) trimmed = trimmed.slice(0, lastBreak).trimEnd();
  }
  return trimmed.trimEnd();
}
function Zqi(messages) {
  let content = messages.flatMap(s => !s.isApiErrorMessage && Array.isArray(s.message.content) ? s.message.content : []),
    trimmedText = ZMd(content.flatMap(s => s.type === "text" ? [s.text] : []).join(`

`).trim()),
    toolInputs = content.flatMap(s => s.type === "tool_use" ? [s.input] : []),
    hadEmptyInput = toolInputs.some(s => typeof s === "object" && s !== null && Object.keys(s).length === 0 || Y1e(s));
  return {
    partialTextChars: trimmedText.length,
    toolUseCount: toolInputs.length,
    hadEmptyInputToolUse: hadEmptyInput
  };
}
function e6i({
  salvage: salvage,
  streamedText: streamedText,
  serverRetainedUuids: serverRetainedUuids
}) {
  if (salvage === null) return streamedText.trim().length > 0 ? {
    kind: "mint",
    text: streamedText
  } : {
    kind: "none"
  };
  if (serverRetainedUuids === null) return {
    kind: "mint",
    text: salvage + streamedText
  };
  return streamedText.trim().length > 0 ? {
    kind: "mint-replacing",
    text: salvage + streamedText,
    replacesUuids: serverRetainedUuids
  } : {
    kind: "none"
  };
}
function t6i() {
  return GLe() && !(VLe() ?? []).includes("refusal_fallback_prompt");
}
function n6i(hostContext) {
  if (!hostContext.isMainThread) return "subagent";
  if (hostContext.requestDialog === undefined) return "no_dialog_host";
  if (lc("switchModelsOnFlag", true).value) return "setting";
  if (hostContext.consumerLacksDialogCapability) return "no_consumer_capability";
  return;
}
function r6i(hostContext) {
  return hostContext.isMainThread && (hostContext.requestDialog === undefined || hostContext.consumerLacksDialogCapability) && lc("switchModelsOnFlag", true).value === false;
}
function o6i() {
  if (Vu()) return;
  return "To enable automatic fallback on this provider, set `ANTHROPIC_DEFAULT_FABLE_MODEL` to your Fable 5 model ID and `ANTHROPIC_DEFAULT_OPUS_MODEL` to your Opus 4.8 model ID.";
}
function s6i(model, useCase) {
  return `${sot(useCase) ? f7r(model) : h7r(model, useCase)} ${oot}`;
}
function i6i(fromModel, toModel) {
  return {
    retry_fallback: `Switch to ${Tp(toModel)}`,
    edit_prompt: `Edit prompt and retry with ${Tp(fromModel)}`
  };
}
var $$e = "https://support.claude.com/en/articles/15363606",
  oot,
  YMd = "https://claude.com/form/cyber-use-case",
  JMd = 400,
  Yqi = "Switch models when a message is flagged",
  XMd = "These measures let us bring you Mythos-level capabilities sooner, and we're working to refine them.",
  Xqi,
  QMd = "This model's safeguards flagged this message. This sometimes happens with safe, normal conversations.";
var nj = b(() => {
  lt();
  Ir();
  pd();
  mI();
  Ro();
  U$e();
  Ps();
  mg();
  oot = `Send feedback with /feedback or learn more: ${$$e}`;
  Xqi = `They may flag safe, normal content as well. ${XMd}`;
});

export {tj,Gqi,gge,zMd,Vqi,Kqi,zqi,jMd,jqi,AHn,sot,Jqi,iot,f7r,h7r,RHn,Qqi,ZMd,Zqi,e6i,t6i,n6i,r6i,o6i,s6i,i6i,$$e,oot,YMd,JMd,Yqi,XMd,Xqi,QMd,nj};
