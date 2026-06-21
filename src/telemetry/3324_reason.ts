// @ts-nocheck
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function C8d(e) {
  return e.replace(sensitiveKeyRegex, (t, n, r) => {
    if (r.length < E8d) return `"${n}":"[REDACTED]"`;
    let o = `${r.slice(0, 8)}...${r.slice(-4)}`;
    return `"${n}":"${o}"`;
  });
}
function GYr(e) {
  let t = e.replaceAll(`
`, "\\n");
  if (t.length <= u0n) return t;
  return t.slice(0, u0n) + `... (${t.length} chars)`;
}
function Jot(e) {
  let t = typeof e === "string" ? e : Oe(e),
    n = C8d(t);
  if (n.length <= u0n) return n;
  return n.slice(0, u0n) + `... (${n.length} chars)`;
}
function zaa(e) {
  let t = Se(e);
  if (e && typeof e === "object" && "response" in e) {
    let n = e.response;
    if (n?.data && typeof n.data === "object") {
      let r = n.data,
        o = typeof r.message === "string" ? r.message : typeof r.error === "object" && r.error && "message" in r.error && typeof r.error.message === "string" ? r.error.message : undefined;
      if (o) return `${t}: ${o}`;
    }
  }
  return t;
}
function redactSensitiveJsonValues(jsonStr, t = Date.now()) {
  if (!jsonStr) return;
  let n = Number(jsonStr);
  if (Number.isFinite(n) && n >= 0) return n * 1000;
  let r = Date.parse(jsonStr);
  if (Number.isFinite(r)) {
    let o = r - t;
    return o > 0 ? o : undefined;
  }
  return;
}
function truncateDebugString(rawStr) {
  if (!rawStr || typeof rawStr !== "object") return;
  if ("message" in rawStr && typeof rawStr.message === "string") return rawStr.message;
  if ("error" in rawStr && rawStr.error !== null && typeof rawStr.error === "object" && "message" in rawStr.error && typeof rawStr.error.message === "string") return rawStr.error.message;
  return;
}
function sanitizeForTelemetry(value, t, n) {
  if (t) v(t);
  j("tengu_bridge_repl_skipped", {
    reason: value,
    ...(n !== undefined && {
      v2: n
    })
  });
}
var u0n = 2000,
  sensitiveKeyNames,
  sensitiveKeyRegex,
  E8d = 16;
var pYH = b(() => {
  Ct();
  je();
  St();
  Xt();
  sensitiveKeyNames = ["session_ingress_token", "environment_secret", "access_token", "secret", "token"], sensitiveKeyRegex = new RegExp(`"(${sensitiveKeyNames.join("|")})"\\s*:\\s*"([^"]*)"`, "g");
});

export {C8d as KWd,GYr as WJr,Jot as hst,zaa as aca,redactSensitiveJsonValues as J0n,truncateDebugString as iY,sanitizeForTelemetry as aY,u0n as Y0n,sensitiveKeyNames as WWd,sensitiveKeyRegex as GWd,E8d as VWd,pYH as ole};
