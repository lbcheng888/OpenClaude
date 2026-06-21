// @ts-nocheck
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
/** Returns true if the message has kind "human". */
function $$i(message) {
  return message?.kind === "human";
}
/** Returns true if origin is undefined or has kind "human". */
function Aee(origin) {
  return origin === void 0 || origin.kind === "human";
}
/** Returns true if origin is undefined, "human", or "auto-continuation". */
function Q$(origin) {
  return origin === void 0 || origin.kind === "human" || origin.kind === "auto-continuation";
}
/** Returns true if the turn is a non-meta user turn with no tool use result. */
function JOt(turn) {
  return turn.type === "user" && !turn.isMeta && turn.toolUseResult === void 0;
}
/** Returns true if the turn is a visible non-compact user turn from a human origin. */
function vnt(turn) {
  return turn.type === "user" && !turn.isMeta && turn.toolUseResult === void 0 && !turn.isCompactSummary && Aee(turn.origin);
}
/** Logs a telemetry event for presumed human-origin turns, bucketed by count. */
function q$i(consumer, count) {
  if (count === 0) return;
  logEvent("tengu_human_origin_presumed", {
    consumer: fromEnum(consumer),
    count_bucket: fromEnum(count === 1 ? "1" : count <= 5 ? "2-5" : "6+")
  });
}
var _q = b(() => {
  Ct();
});
export {$$i,Aee,Q$,JOt,vnt,q$i,_q};
