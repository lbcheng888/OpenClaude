// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function QlK() {
  return ut("tengu_malformed_tool_use_clean_retry", false);
}
function clK(messages) {
  let lastText = messages.flatMap(envelope => envelope.message.content).findLast(block => block.type === "text")?.text ?? "";
  return leakedInvokeTagRegex.test(lastText);
}
function dlK(toolUseCount, stopReason, isApiError) {
  if (toolUseCount > 0) return "succeeded";
  if (stopReason === "tool_use" && !isApiError) return "gave_up";
  if (stopReason === "end_turn") return "end_turn";
  return "other";
}
var leakedInvokeTagRegex;
var llK = b(() => {
  Yn();
  leakedInvokeTagRegex = new RegExp("<antml:invoke\\b");
});

export {QlK as PZa,clK as OZa,dlK as LZa,leakedInvokeTagRegex as S9p,llK as MZa};
