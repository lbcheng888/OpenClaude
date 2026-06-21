// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {es as H9} from "../../vendor/m135.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Br as a8,WS as LJ} from "../../vendor/m1456.ts";
import {b as L} from "../../runtime.ts";
import {LD as yh} from "../../vendor/m194.ts";
// @ts-nocheck
function isContextHintEnabled() {
  return j_("tengu_hazel_osprey", false);
}
function getContextHintFloorTokens() {
  return j_("tengu_hazel_osprey_floor", DEFAULT_CONTEXT_HINT_FLOOR_TOKENS);
}
function isContextHintRejectedHttpError(H) {
  return H instanceof H9 && (H.status === 422 || H.status === 424);
}
function isInvalidRequestWithoutStatus(H) {
  if (!(H instanceof H9)) return false;
  if (H.status !== undefined) return false;
  return H.error?.error?.type === "invalid_request_error";
}
function isConflictHttpError(H) {
  return H instanceof H9 && H.status === 409;
}
function isUnexpectedAnthropicBetaError(H) {
  if (!(H instanceof H9)) return false;
  if (H.status !== 400) return false;
  let _ = H.message ?? "";
  return _.includes("Unexpected value") && _.includes("anthropic-beta");
}
function getRequestIdFromError(H) {
  if (H instanceof H9) return H.requestID ?? undefined;
  return;
}
function logContextHintReject(H) {
  c("tengu_context_hint_reject", {
    requestId: a8(H.requestId),
    preCompactTokenEstimate: H.preCompactTokenEstimate,
    postCompactTokenEstimate: H.postCompactTokenEstimate,
    tokensSaved: H.tokensSaved,
    mcApplied: H.mcApplied,
    mcTokensSaved: H.mcTokensSaved
  });
}
function logContextHintBusyFallback(H, _) {
  c("tengu_context_hint_busy_fallback", {
    requestId: a8(H),
    status: _
  });
}
var DEFAULT_CONTEXT_HINT_FLOOR_TOKENS = 75000;
var Qh4 = L(() => {
  yh();
  t6();
  v_();
  LJ();
});

export {isContextHintEnabled as _Nl,getContextHintFloorTokens as yNl,isContextHintRejectedHttpError as TNl,isInvalidRequestWithoutStatus as SNl,isConflictHttpError as bNl,isUnexpectedAnthropicBetaError as ENl,getRequestIdFromError as CNl,logContextHintReject as vNl,logContextHintBusyFallback as gzn,DEFAULT_CONTEXT_HINT_FLOOR_TOKENS as mTm,Qh4 as wNl};
