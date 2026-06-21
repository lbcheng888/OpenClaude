// @ts-nocheck
import {getIsNonInteractiveSession,lt} from "../session/0131_sent.ts";
import {checkHasTrustDialogAccepted,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logAntError,logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {on,wu,Rn} from "../session/0615_length.ts";
import {execFileNoThrowWithCwd,oa} from "../../vendor/m684.ts";
import {qt,Xt} from "./0228_encoding.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {_ee} from "../../vendor/m3017.ts";
import {fs} from "../api/0459_getOauthConfig.ts";
import {b} from "../../runtime.ts";
// Sets a new pending startup message, returns the previous one
function dta(newMessage: any): any {
  let prevMessage = TKr;
  return TKr = newMessage, prevMessage;
}

// Returns the current pending startup message
function pta(): any {
  return TKr;
}

// Records a startup error once (idempotent after first call)
function mta(errorMessage: any): void {
  if (uta) return;
  uta = !0, SKr = errorMessage;
}

// Drains the stored startup error message (returns and clears it)
function bKr(): any {
  let storedError = SKr;
  return SKr = void 0, storedError;
}

// Flushes the stored startup error to stderr if present
function fta(): void {
  let errorText = bKr();
  if (errorText) process.stderr.write(`${errorText}
`);
}
var TKr = null,
  SKr: any,
  uta = !1;

// Returns true if this MCP server config is project- or local-scoped
function a3d(serverConfig: any): boolean {
  return serverConfig.scope === "project" || serverConfig.scope === "local";
}

// Executes the headersHelper subprocess for an MCP server and returns its JSON headers,
// or null on trust failure, execution failure, or parse error
async function l3d(serverName: any, serverConfig: any): Promise<any> {
  if (!serverConfig.headersHelper) return null;
  if ("scope" in serverConfig && a3d(serverConfig) && !getIsNonInteractiveSession()) {
    if (!checkHasTrustDialogAccepted()) {
      let trustError = Error(`Security: headersHelper for MCP server '${serverName}' executed before workspace trust is confirmed. If you see this message, post in ${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.FEEDBACK_CHANNEL}.`);
      return logAntError("MCP headersHelper invoked before trust check", trustError), logEvent("tengu_mcp_headersHelper_missing_trust", {}), Oe("mcp_headers_helper", "missing_trust"), null;
    }
  }
  try {
    on(serverName, "Executing headersHelper to get dynamic headers");
    let execResult = await execFileNoThrowWithCwd(serverConfig.headersHelper, [], {
      shell: !0,
      timeout: 1e4,
      env: {
        ...process.env,
        CLAUDE_CODE_MCP_SERVER_NAME: serverName,
        CLAUDE_CODE_MCP_SERVER_URL: serverConfig.url
      }
    });
    if (execResult.code !== 0 || !execResult.stdout) throw Oe("mcp_headers_helper", "exec_failed"), Error(`headersHelper for MCP server '${serverName}' did not return a valid value`);
    let trimmedOutput = execResult.stdout.trim(),
      parsedHeaders: any;
    try {
      parsedHeaders = qt(trimmedOutput);
    } catch (parseErr) {
      throw Oe("mcp_headers_helper", "parse_failed"), parseErr;
    }
    if (typeof parsedHeaders !== "object" || parsedHeaders === null || Array.isArray(parsedHeaders)) throw Oe("mcp_headers_helper", "non_object"), Error(`headersHelper for MCP server '${serverName}' must return a JSON object with string key-value pairs`);
    for (let [headerKey, headerValue] of Object.entries(parsedHeaders)) if (typeof headerValue !== "string") throw Oe("mcp_headers_helper", "non_string_value"), Error(`headersHelper for MCP server '${serverName}' returned non-string value for key "${headerKey}": ${typeof headerValue}`);
    return on(serverName, `Successfully retrieved ${Object.keys(parsedHeaders).length} headers from headersHelper`), Ie("mcp_headers_helper"), parsedHeaders;
  } catch (execErr) {
    return wu(serverName, `Error getting headers from headersHelper: ${Se(execErr)}`), logForDebugging(`Error getting MCP headers from headersHelper for server '${serverName}': ${Se(execErr)}`, {
      level: "error"
    }), null;
  }
}

// Merges static headers (with env-var expansion) and dynamic headersHelper output for an MCP server
async function kHn(serverName: any, serverConfig: any): Promise<any> {
  let expandedHeaders: any = {},
    missingVarNames: any[] = [];
  for (let [headerName, headerTemplate] of Object.entries(serverConfig.headers ?? {})) {
    let {
      expanded: expandedValue,
      missingVars: missingVarList
    } = _ee(headerTemplate);
    expandedHeaders[headerName] = expandedValue, missingVarNames.push(...missingVarList);
  }
  if (missingVarNames.length > 0) on(serverName, `Header values reference unset environment variables: ${fs(missingVarNames).join(", ")}`);
  let dynamicHeaders = (await l3d(serverName, serverConfig)) || {};
  return {
    ...expandedHeaders,
    ...dynamicHeaders
  };
}
var Ata = b(() => {
  lt();
  Qn();
  qe();
  bt();
  oa();
  Rn();
  Xt();
  ln();
  Ct();
});
export {dta,pta,mta,bKr,fta,TKr,SKr,uta,a3d,l3d,kHn,Ata};
