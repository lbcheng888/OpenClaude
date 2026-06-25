// @ts-nocheck
import {Za} from "../../vendor/m127.ts";
import {getAPIProvider as Rr,isFirstPartyAnthropicBaseUrl as Su,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {wmn,eFe} from "../../vendor/m1459.ts";
import {NAe,Ph} from "./1459_agentType.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {CLAUDE_AI_INFERENCE_SCOPE as JU,Sc} from "../api/0465_getOauthConfig.ts";
import {b} from "../../runtime.ts";
import {dn} from "../config/0137_namespace.ts";
/**
 * Builds the `x-anthropic-billing-header` attribution header sent with API
 * requests. Encodes the CLI version (with a call-site suffix), entrypoint,
 * optional cch flag, workload id, and subagent marker.
 */
function Hmn(versionSuffix: any, sessionCtx: any): string {
  if (Za(process.env.CLAUDE_CODE_ATTRIBUTION_HEADER)) return "";
  let versionStr = `${{
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION}.${versionSuffix}`,
    entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT ?? "unknown",
    apiProvider = Rr(),
    cchSegment = apiProvider === "firstParty" && Su() || apiProvider === "vertex" ? " cch=00000;" : "",
    workloadId = wmn(),
    workloadSegment = workloadId ? ` cc_workload=${workloadId};` : "",
    subagentSegment = NAe(sessionCtx) && !sessionCtx.isMainSession ? " cc_is_subagent=true;" : "",
    headerValue = `x-anthropic-billing-header: cc_version=${versionStr}; cc_entrypoint=${entrypoint};${cchSegment}${workloadSegment}${subagentSegment}`;
  return A(`attribution header ${headerValue}`), headerValue;
}
/**
 * True when the given auth config has Anthropic OAuth enabled and includes the
 * Claude.ai inference scope.
 */
function B5s(authConfig: any): boolean {
  return authConfig.anthropicAuthEnabled && Boolean(authConfig.oauthScopes?.includes(JU));
}
var Imn = b(() => {
  Sc();
  Ph();
  qe();
  dn();
  Ps();
  eFe();
});

export {Hmn,B5s,Imn};
