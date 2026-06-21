// @ts-nocheck
import {getIsNonInteractiveSession as kr,yH as AH,getSessionId as kt,lt as ct} from "./0131_sent.ts";
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

export {pRd as Lkd,mRd as Mkd,D2e as e$e,Ov as Fv,_z as Pz,Mh as Bh,cryptoModule as s9i,dRd as Okd,Y2i as i9i,J2i as a9i,eventQueues as rWr,X2i as l9i,sM as bC};
