// @ts-nocheck
import {getIsNonInteractiveSession as kr,lt} from "../session/0132_sent.ts";
import {checkHasTrustDialogAccepted as kd,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logAntError as V9,logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {ln,Vc,vn} from "../session/0621_length.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {qt,tn} from "./0230_encoding.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {hee} from "../api/3029_expanded.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/** Swaps in a new "current value" into the tQr slot, returning the previous one. */
function hla(nextValue) {
  let previousValue = tQr;
  return tQr = nextValue, previousValue;
}
/** Returns the currently stored tQr value. */
function gla() {
  return tQr;
}
/** One-shot setter: records a pending message the first time it is called, then locks. */
function _la(pendingMessage) {
  if (fla) return;
  fla = !0, nQr = pendingMessage;
}
/** Takes and clears the pending message stored by _la. */
function rQr() {
  let pendingMessage = nQr;
  return nQr = void 0, pendingMessage;
}
/** Flushes any pending message to stderr (with a trailing newline). */
function yla() {
  let pendingMessage = rQr();
  if (pendingMessage) process.stderr.write(`${pendingMessage}
`);
}
var tQr = null,
  nQr,
  fla = !1;
/** True when an MCP server config is scoped to the project or local (i.e. workspace-trusted) scope. */
function V7d(serverConfig) {
  return serverConfig.scope === "project" || serverConfig.scope === "local";
}
/**
 * Runs an MCP server's `headersHelper` command to obtain dynamic HTTP headers.
 * Returns a string->string header map, or null if no helper is configured / it fails / trust is unconfirmed.
 */
async function K7d(serverName, serverConfig) {
  if (!serverConfig.headersHelper) return null;
  if ("scope" in serverConfig && V7d(serverConfig) && !kr()) {
    if (!kd()) {
      let trustError = Error(`Security: headersHelper for MCP server '${serverName}' executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.FEEDBACK_CHANNEL}.`);
      return V9("MCP headersHelper invoked before trust check", trustError), W("tengu_mcp_headersHelper_missing_trust", {}), xe("mcp_headers_helper", "missing_trust"), null;
    }
  }
  try {
    ln(serverName, "Executing headersHelper to get dynamic headers");
    let helperResult = await Wr(serverConfig.headersHelper, [], {
      shell: !0,
      timeout: 1e4,
      env: {
        ...process.env,
        CLAUDE_CODE_MCP_SERVER_NAME: serverName,
        CLAUDE_CODE_MCP_SERVER_URL: serverConfig.url
      }
    });
    if (helperResult.code !== 0 || !helperResult.stdout) throw xe("mcp_headers_helper", "exec_failed"), Error(`headersHelper for MCP server '${serverName}' did not return a valid value`);
    let trimmedStdout = helperResult.stdout.trim(),
      parsedHeaders;
    try {
      parsedHeaders = qt(trimmedStdout);
    } catch (parseError) {
      throw xe("mcp_headers_helper", "parse_failed"), parseError;
    }
    if (typeof parsedHeaders !== "object" || parsedHeaders === null || Array.isArray(parsedHeaders)) throw xe("mcp_headers_helper", "non_object"), Error(`headersHelper for MCP server '${serverName}' must return a JSON object with string key-value pairs`);
    for (let [headerKey, headerValue] of Object.entries(parsedHeaders)) if (typeof headerValue !== "string") throw xe("mcp_headers_helper", "non_string_value"), Error(`headersHelper for MCP server '${serverName}' returned non-string value for key "${headerKey}": ${typeof headerValue}`);
    return ln(serverName, `Successfully retrieved ${Object.keys(parsedHeaders).length} headers from headersHelper`), He("mcp_headers_helper"), parsedHeaders;
  } catch (helperError) {
    return Vc(serverName, `Error getting headers from headersHelper: ${Ce(helperError)}`), A(`Error getting MCP headers from headersHelper for server '${serverName}': ${Ce(helperError)}`, {
      level: "error"
    }), null;
  }
}
/**
 * Builds the final header map for an MCP server: expands ${ENV_VAR} references in static
 * `headers`, warns about unset variables, then merges in any dynamic headersHelper output.
 */
async function SDn(serverName, serverConfig) {
  let expandedHeaders = {},
    missingEnvVars = [];
  for (let [headerKey, headerValue] of Object.entries(serverConfig.headers ?? {})) {
    let {
      expanded: expanded,
      missingVars: missingVars
    } = hee(headerValue);
    expandedHeaders[headerKey] = expanded, missingEnvVars.push(...missingVars);
  }
  if (missingEnvVars.length > 0) ln(serverName, `Header values reference unset environment variables: ${os(missingEnvVars).join(", ")}`);
  let dynamicHeaders = (await K7d(serverName, serverConfig)) || {};
  return {
    ...expandedHeaders,
    ...dynamicHeaders
  };
}
/** Lazy module initializer: runs dependency setup hooks for this config module. */
var Tla = b(() => {
  lt();
  tr();
  qe();
  Ct();
  Ii();
  vn();
  tn();
  mn();
  kt();
});

export {hla,gla,_la,rQr,yla,tQr,nQr,fla,V7d,K7d,SDn,Tla};
