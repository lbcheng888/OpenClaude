// @ts-nocheck
import {aoe as Qre,Ud as Dp} from "../../vendor/m615.ts";
import {uje as YVe,Rrn as ten,dje as JVe} from "../../vendor/m618.ts";
import {mo as _o,Ct as St} from "../../vendor/m197.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {Vi as ta,$d as hp} from "../config/0620_$d.ts";
import {setLastAPIRequest as Qtr,setLastAPIRequestMessages as enr,lt as ct} from "./0132_sent.ts";
import {b} from "../../runtime.ts";
import {Wi as na,Hn as bn} from "../../vendor/m100.ts";
import {Arn as een} from "../../vendor/m617.ts";
import {dn as an} from "../config/0137_namespace.ts";
import {tn as Xt} from "../config/0230_encoding.ts";
import {lr as fr} from "../../vendor/m233.ts";
// @ts-nocheck
function deriveSessionTitle(sessionInfo, fallbackTitle) {
  let isAutonomousPrompt = sessionInfo.firstPrompt?.startsWith(`<${Qre}>`),
    firstPromptText = sessionInfo.firstPrompt ? YVe(sessionInfo.firstPrompt) : "",
    hasUsablePromptText = firstPromptText && !isAutonomousPrompt,
    title = sessionInfo.agentName || sessionInfo.customTitle || sessionInfo.aiTitle || sessionInfo.summary || (hasUsablePromptText ? firstPromptText : undefined) || fallbackTitle || (isAutonomousPrompt ? "Autonomous session" : undefined) || (sessionInfo.sessionId ? sessionInfo.sessionId.slice(0, 8) : "") || "";
  return ten(title).trim();
}
function fsTimestampFromDate(date) {
  return date.toISOString().replace(/[:.]/g, "-");
}
function pushRecentError(record) {
  if (recentErrors.length >= MAX_RECENT_ERRORS) recentErrors.shift();
  recentErrors.push(record);
}
function installErrorLogger(logger) {
  if (errorLogger !== null) return;
  if (errorLogger = logger, pendingLogEvents.length > 0) {
    let queued = [...pendingLogEvents];
    pendingLogEvents.length = 0;
    for (let event of queued) switch (event.type) {
      case "error":
        errorLogger.logError(event.error);
        break;
      case "mcpError":
        errorLogger.logMCPError(event.serverName, event.error);
        break;
      case "mcpDebug":
        errorLogger.logMCPDebug(event.serverName, event.message);
        break;
    }
  }
}
function logError(value) {
  let error = _o(value);
  try {
    if (rt(process.env.CLAUDE_CODE_USE_BEDROCK) || rt(process.env.CLAUDE_CODE_USE_VERTEX) || rt(process.env.CLAUDE_CODE_USE_FOUNDRY) || rt(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) || rt(process.env.CLAUDE_CODE_USE_MANTLE) || process.env.DISABLE_ERROR_REPORTING || ta()) return;
    let record = {
      error: error.stack || error.message,
      timestamp: new Date().toISOString()
    };
    if (pushRecentError(record), errorLogger === null) {
      pendingLogEvents.push({
        type: "error",
        error: error
      });
      return;
    }
    errorLogger.logError(error);
  } catch {}
}
function getRecentErrors() {
  return [...recentErrors];
}
function logMCPError(serverName, error) {
  try {
    if (errorLogger === null) {
      pendingLogEvents.push({
        type: "mcpError",
        serverName: serverName,
        error: error
      });
      return;
    }
    errorLogger.logMCPError(serverName, error);
  } catch {}
}
function logMCPDebug(serverName, message) {
  try {
    if (errorLogger === null) {
      pendingLogEvents.push({
        type: "mcpDebug",
        serverName: serverName,
        message: message
      });
      return;
    }
    errorLogger.logMCPDebug(serverName, message);
  } catch {}
}
function snapshotLastApiRequest(request, querySource) {
  if (!querySource || !querySource.startsWith("repl_main_thread")) return;
  let {
    messages: messages,
    ...requestWithoutMessages
  } = request;
  Qtr(requestWithoutMessages), enr(null);
}
var MAX_RECENT_ERRORS = 100,
  recentErrors,
  pendingLogEvents,
  errorLogger = null,
  isHardFail;
var initModule = b(() => {
  na();
  ct();
  Dp();
  een();
  JVe();
  an();
  St();
  hp();
  Xt();
  fr();
  recentErrors = [];
  pendingLogEvents = [];
  isHardFail = bn(() => process.argv.includes("--hard-fail"));
});
export {deriveSessionTitle as I1e,fsTimestampFromDate as Qns,pushRecentError as rou,installErrorLogger as Zns,logError as Ie,getRecentErrors as x1e,logMCPError as Vc,logMCPDebug as ln,snapshotLastApiRequest as krn,MAX_RECENT_ERRORS as nou,recentErrors as wrn,pendingLogEvents as mje,errorLogger as YX,isHardFail as PHf,initModule as vn};
