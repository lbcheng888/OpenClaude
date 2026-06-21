// @ts-nocheck
import {getSessionIngressToken as Gtr,setSessionIngressToken as NOe,lt as ct} from "../session/0131_sent.ts";
import {fcn as wln,xvt as nvt,xvr as UCr,kvr as $Cr,Acn as Rln} from "./1291_recursive.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {x7e as u7e,mc} from "./0645_maxBytes.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function readSessionIngressToken() {
  let cachedToken = Gtr();
  if (cachedToken !== undefined) return cachedToken;
  let fdEnv = process.env.CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR;
  if (!fdEnv) {
    let tokenFilePath = process.env.CLAUDE_SESSION_INGRESS_TOKEN_FILE ?? wln,
      token = nvt(tokenFilePath, "session ingress token");
    return NOe(token), token;
  }
  let fd = parseInt(fdEnv, 10);
  if (Number.isNaN(fd)) return v(`CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR must be a valid file descriptor number, got: ${fdEnv}`, {
    level: "error"
  }), NOe(null), null;
  try {
    let fdPath = `/dev/fd/${fd}`,
      tokenContent = u7e(fdPath, {
        maxBytes: UCr
      }).trim();
    if (!tokenContent) return v("File descriptor contained empty token", {
      level: "error"
    }), NOe(null), null;
    return v(`Successfully read token from file descriptor ${fd}`), NOe(tokenContent), $Cr(wln, tokenContent, "session ingress token"), tokenContent;
  } catch (err) {
    v(`Failed to read token from file descriptor ${fd}: ${Se(err)}`, {
      level: "error"
    });
    let fallbackPath = process.env.CLAUDE_SESSION_INGRESS_TOKEN_FILE ?? wln,
      fallbackToken = nvt(fallbackPath, "session ingress token");
    return NOe(fallbackToken), fallbackToken;
  }
}
function getEffectiveSessionToken() {
  let envToken = process.env.CLAUDE_CODE_SESSION_ACCESS_TOKEN;
  if (envToken) return envToken;
  return readSessionIngressToken();
}
function buildSessionAuthHeaders() {
  let token = getEffectiveSessionToken();
  if (!token) return {};
  if (token.startsWith("sk-ant-sid")) {
    let headers = {
        Cookie: `sessionKey=${token}`
      },
      orgUuid = process.env.CLAUDE_CODE_ORGANIZATION_UUID;
    if (orgUuid) headers["X-Organization-Uuid"] = orgUuid;
    return headers;
  }
  return {
    Authorization: `Bearer ${token}`
  };
}
function injectSessionAccessToken(newToken) {
  process.env.CLAUDE_CODE_SESSION_ACCESS_TOKEN = newToken;
}
var Av = b(() => {
  ct();
  Rln();
  je();
  St();
  mc();
});

export {readSessionIngressToken as yJu,getEffectiveSessionToken as sS,buildSessionAuthHeaders as cve,injectSessionAccessToken as tfi,Av as UO};
