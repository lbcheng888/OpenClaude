// @ts-nocheck
import {zn as c6} from "../api/0465_getOauthConfig.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH,Ve as O_} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
/** Restored Claude Code 2.1.177 module. Normalizes telemetry event payloads before emission. */
function getTelemetryRedactionConfig(): any {
  return {
    retracted: new Set(),
    inProgressToolUses: new Map(),
    evictedToolUses: new Set()
  };
}
function sanitizeTelemetryText(H: any): any {
  if (typeof H !== "object" || H === null) return null;
  let _ = H,
    q = typeof _.uuid === "string" ? _.uuid : null;
  if (_.type === "system" && _.subtype === "model_refusal_fallback") {
    let K = copyDefinedProperty(_.retracted_message_uuids, q);
    return K ? {
      uuids: K,
      source: "retraction_banner"
    } : null;
  }
  if (_.type === "assistant") {
    let K = copyDefinedProperty(_.supersedes, q);
    return K ? {
      uuids: K,
      source: "supersedes"
    } : null;
  }
  return null;
}
function copyDefinedProperty(H: any, _: any): any {
  if (!Array.isArray(H)) return null;
  let q = H.filter((K: any): any => typeof K === "string" && K !== _);
  return q.length > 0 ? q : null;
}
function sanitizeTelemetryValue(H: any, _: any): any {
  if (_.size === 0) return H;
  let q = H.filter((K: any): any => !_.has(K.uuid));
  return q.length === H.length ? H : q;
}
function sanitizeTelemetryObject(H: any, _: any, q: any): any {
  for (let K of q) H.inProgressToolUses.set(K, _);
}
function sanitizeTelemetryArray(H: any, _: any): any {
  for (let q of _) H.inProgressToolUses.delete(q);
}
function normalizeTelemetryName(H: any): any {
  let {
      index: _,
      signal: q,
      surface: K,
      setMessages: O,
      setInProgressToolUseIDs: T
    } = H,
    z = c6(q.uuids, (Y: any): any => !_.retracted.has(Y));
  for (let Y of q.uuids) _.retracted.add(Y);
  let $ = [..._.inProgressToolUses].filter(([, Y]: any): any => _.retracted.has(Y)).map(([Y]: any): any => Y);
  sanitizeTelemetryArray(_, $);
  for (let Y of $) _.evictedToolUses.add(Y);
  if ($.length > 0 && T) T({
    action: "remove",
    ids: $
  });
  O((Y: any): any => sanitizeTelemetryValue(Y, _.retracted)), c("tengu_refusal_retraction_evicted", {
    surface: tH(K),
    source: tH(q.source),
    uuid_count: q.uuids.length,
    newly_retracted_count: z,
    tool_use_cleared_count: $.length
  });
}
function sanitizeTelemetryPayload(H: any, _: any, q: any, K: any): any {
  if (K !== null && H.retracted.has(K)) return 0;
  let O = c6(_, (T: any): any => H.evictedToolUses.has(T));
  if (O > 0) c("tengu_refusal_retraction_orphan_tool_result", {
    surface: tH(q),
    count: O
  });
  return O;
}
function isRetractedTelemetryEvent(H: any): any {
  let {
      index: _,
      events: q,
      surface: K,
      setMessages: O,
      setInProgressToolUseIDs: T
    } = H,
    z = 0,
    $ = 0,
    Y = 0;
  for (let A of q) {
    if (A.source !== "worker") {
      if (sanitizeTelemetryText(A.payload)) if (A.source === void 0) Y++;else $++;
      continue;
    }
    let w = sanitizeTelemetryText(A.payload);
    if (w) z++, normalizeTelemetryName({
      index: _,
      signal: w,
      surface: K,
      setMessages: O,
      setInProgressToolUseIDs: T
    });
  }
  if ($ > 0) c("tengu_refusal_retraction_unauthenticated_signal", {
    surface: tH(K),
    reason: O_("source_mismatch"),
    count: $
  });
  if (Y > 0) c("tengu_refusal_retraction_unauthenticated_signal", {
    surface: tH(K),
    reason: O_("source_missing"),
    count: Y
  });
  return z;
}
function buildRetractedTelemetryPayload(H: any, _: any, q: any): any {
  if (!H.retracted.has(_)) return !1;
  return c("tengu_refusal_retraction_late_drop", {
    surface: tH(q)
  }), !0;
}
var initRetractedTelemetry = L((): any => {
  y_();
});
export {getTelemetryRedactionConfig as Ker,sanitizeTelemetryText as gyt,copyDefinedProperty as nJl,sanitizeTelemetryValue as pUm,sanitizeTelemetryObject as zer,sanitizeTelemetryArray as V7t,normalizeTelemetryName as K7t,sanitizeTelemetryPayload as jer,isRetractedTelemetryEvent as rJl,buildRetractedTelemetryPayload as Yer,initRetractedTelemetry as Jer};
