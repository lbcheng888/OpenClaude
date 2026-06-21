// @ts-nocheck
import {_l} from "../../vendor/m5.ts";
import {getAPIProvider,isFirstPartyAnthropicBaseUrl,li} from "../api/1282_usesFirstPartyModelIds.ts";
import {Gun,oNe} from "../../vendor/m1454.ts";
import {$Rr,S_} from "./1454_agentType.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {CLAUDE_AI_INFERENCE_SCOPE,Dc} from "../api/0459_getOauthConfig.ts";
import {b} from "../../runtime.ts";
import {sn} from "../config/0047_namespace.ts";
function Kun(versionSuffix: any, sessionCtx: any) {
  if (_l(process.env.CLAUDE_CODE_ATTRIBUTION_HEADER)) return "";
  let versionStr = `${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION}.${versionSuffix}`,
    entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT ?? "unknown",
    apiProvider = getAPIProvider(),
    cchSegment = apiProvider === "firstParty" && isFirstPartyAnthropicBaseUrl() || apiProvider === "vertex" ? " cch=00000;" : "",
    workloadId = Gun(),
    workloadSegment = workloadId ? ` cc_workload=${workloadId};` : "",
    subagentSegment = $Rr(sessionCtx) && !sessionCtx.isMainSession ? " cc_is_subagent=true;" : "",
    headerValue = `x-anthropic-billing-header: cc_version=${versionStr}; cc_entrypoint=${entrypoint};${cchSegment}${workloadSegment}${subagentSegment}`;
  return logForDebugging(`attribution header ${headerValue}`), headerValue;
}
function W$s(authConfig: any) {
  return authConfig.anthropicAuthEnabled && Boolean(authConfig.oauthScopes?.includes(CLAUDE_AI_INFERENCE_SCOPE));
}
var zun = b(() => {
  Dc();
  S_();
  qe();
  sn();
  li();
  oNe();
});
export {Kun,W$s,zun};
