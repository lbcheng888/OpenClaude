// @ts-nocheck
import {isFullscreenWithTTY as J_,ro as g8,b as L} from "../../runtime.ts";
import {Xr as qq} from "../../vendor/m321.ts";
import {zg as pw} from "../../vendor/m2752.ts";
import {we as NH} from "../../vendor/m455.ts";
import {E as h} from "../../vendor/m319.ts";
// @ts-nocheck
var Qy7 = {};
J_(Qy7, {
  toInfraSessionId: () => toInfraSessionId,
  toCompatSessionId: () => toCompatSessionId,
  setCseShimGate: () => setCseShimGate,
  remoteRowId: () => remoteRowId
});
function setCseShimGate(gate) {
  cseShimGate = gate;
}
function toCompatSessionId(sessionId) {
  if (!sessionId.startsWith("cse_")) return sessionId;
  if (cseShimGate && !cseShimGate()) return sessionId;
  return "session_" + sessionId.slice(4);
}
function remoteRowId(sessionId) {
  return `remote-${sessionId.slice(-8)}`;
}
function toInfraSessionId(sessionId) {
  if (!sessionId.startsWith("session_")) return sessionId;
  return "cse_" + sessionId.slice(8);
}
var cseShimGate;
function sf3(sessionId, ingressUrl) {
  return sessionId?.includes("_staging_") === true || ingressUrl?.includes("staging") === true;
}
function Ih_(sessionId, ingressUrl) {
  return sessionId?.includes("_local_") === true || ingressUrl?.includes("localhost") === true;
}
function BB8(sessionId, ingressUrl) {
  if (Ih_(sessionId, ingressUrl)) return "http://localhost:4000";
  if (sf3(sessionId, ingressUrl)) return "https://claude-ai.staging.ant.dev";
  return "https://claude.ai";
}
function oj(sessionId, ingressUrl, query) {
  let {
      toCompatSessionId: toCompat
    } = g8(Qy7),
    compatId = toCompat(sessionId),
    baseUrl = `${BB8(compatId, ingressUrl)}/code/${compatId}`;
  return query ? `${baseUrl}?${new URLSearchParams(query)}` : baseUrl;
}
var fbH = "https://claude.com/claude-code";
var U__;
var xP6 = L(() => {
  qq();
  U__ = pw({
    kind: "mcp_url_elicitation",
    payload: NH(() => h.custom(H => typeof H === "object" && H !== null && "serverName" in H && "params" in H)),
    result: NH(() => h.custom(H => typeof H === "object" && H !== null)),
    default: {
      action: "cancel"
    }
  });
});

export {Qy7 as H9i,setCseShimGate,toCompatSessionId,remoteRowId,toInfraSessionId,cseShimGate as CWr,sf3 as Xkd,Ih_ as oLt,BB8 as wWr,oj as bT,fbH as r$e,U__ as Mnt,xP6 as ZRn};
