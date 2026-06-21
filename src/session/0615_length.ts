// @ts-nocheck
import {coe as Qre,initKp as Dp} from "../../vendor/m609.ts";
import {m7e as YVe,Wen as ten,f7e as JVe} from "../../vendor/m612.ts";
import {_o,bt as St} from "../../vendor/m195.ts";
import {st as rt} from "../../vendor/m5.ts";
import {ra as ta,Ap as hp} from "../config/0614_Ap.ts";
import {setLastAPIRequest as Qtr,setLastAPIRequestMessages as enr,lt as ct} from "./0131_sent.ts";
import {b} from "../../runtime.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {jen as een} from "../../vendor/m611.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {Xt} from "../config/0228_encoding.ts";
import {dr as fr} from "../../vendor/m231.ts";
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

export {deriveSessionTitle as NMe,fsTimestampFromDate as tXo,pushRecentError as UKc,installErrorLogger as nXo,logError as De,getRecentErrors as BMe,logMCPError as wu,logMCPDebug as on,snapshotLastApiRequest as Ken,MAX_RECENT_ERRORS as FKc,recentErrors as Ven,pendingLogEvents as h7e,errorLogger as QX,isHardFail as pgf,initModule as Rn};
