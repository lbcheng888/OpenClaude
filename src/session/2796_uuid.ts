// @ts-nocheck
import {getIsNonInteractiveSession as kr,isReplBridgeActive as AH,getSessionId as kt,lt as ct} from "./0132_sent.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function pRd() {
  let e = J2i(),
    t = eventQueues.get(e);
  if (!t) t = [], eventQueues.set(e, t);
  return t;
}
function mRd() {
  return eventQueues.get(J2i()) ?? null;
}
function D2e(e) {
  X2i = e;
}
function Ov(e) {
  if (!kr() && !AH()) return;
  let t = pRd();
  if (t.length >= dRd) t.shift();
  t.push(e), X2i?.();
}
function _z() {
  let e = mRd();
  if (!e || e.length === 0) return [];
  return e.splice(0).map(n => ({
    ...n,
    uuid: cryptoModule.randomUUID(),
    session_id: kt()
  }));
}
function Mh(e, t, n) {
  Ov({
    type: "system",
    subtype: "task_notification",
    task_id: e,
    tool_use_id: n?.toolUseId,
    status: t,
    output_file: n?.outputFile ?? "",
    summary: n?.summary ?? "",
    usage: n?.usage,
    skip_transcript: n?.skipTranscript
  });
}
var cryptoModule,
  dRd = 1000,
  Y2i = "cli",
  J2i = () => Y2i,
  eventQueues,
  X2i = null;
var sM = b(() => {
  ct();
  cryptoModule = require("crypto"), eventQueues = new Map();
});
export {pRd as bFd,mRd as EFd,D2e as l9e,Ov as VA,_z as cj,Mh as hf,cryptoModule as J8i,dRd as SFd,Y2i as X8i,J2i as Q8i,eventQueues as Nzr,X2i as Z8i,sM as RE};
