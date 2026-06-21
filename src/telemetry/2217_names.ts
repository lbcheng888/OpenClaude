// @ts-nocheck
import {Dp as fz,EAi as ol9} from "../../vendor/m2215.ts";
import {xp as LO,dyt as Gi_,r9o as Wbq,vX as ta,Se as ZH,bt as R_} from "../../vendor/m195.ts";
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {logEventAsync as jJ,Ct as v_} from "../../vendor/m131.ts";
import {Qe as K_} from "../../vendor/m5.ts";
import {shutdown1PEventLogging as tOH,I1 as jv} from "../session/2197_shutdown1PEventLogging.ts";
import {shutdownDatadog as eOH,iZ as wt} from "../permissions/5195_trackDatadogEvent.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function sanitizeErrorMessage(raw) {
  return raw.slice(0, 500).replace(/https?:\/\/\S+/gi, "<url>").replace(/\b[\w.+-]+@[\w.-]+\.\w{2,}\b/g, "<email>").replace(/\b(?:sk-ant|sk|pk|ghp|gho|ghs|ghu|github_pat|xox[bpoars])[-_][\w-]{8,}\b/gi, "<key>").replace(/[A-Za-z]:\\[^\s"']*/g, "<path>").replace(/\\\\[^\s"']+/g, "<path>").replace(/(?:[^\s"'\\]+\\){2,}[^\s"']+/g, "<path>").replace(/(?:\/[^\s"':]+){2,}/g, "<path>").replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, "<id>").replace(/\b[0-9a-fA-F]{16,}\b/g, "<id>").replace(/\b[A-Za-z0-9+/]{32,}={0,2}/g, "<b64>").replace(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g, "<ip>").replace(/\b\d{4,}\b/g, "<num>");
}
function extractStackFrames(stack, maxFrames = 5) {
  let frameNames = [],
    topFrame;
  for (let line of stack.slice(0, 4000).split(`
`)) {
    let trimmed = line.trim();
    if (!trimmed.startsWith("at ")) continue;
    let rest = trimmed.slice(3),
      parenIdx = rest.indexOf(" (");
    if (topFrame === undefined) {
      let locationStr = (parenIdx !== -1 ? rest.slice(parenIdx + 2, -1) : rest).match(/([^/\\]+:\d+:\d+)\)?$/);
      if (locationStr) topFrame = locationStr[1];
    }
    let funcName = parenIdx !== -1 ? rest.slice(0, parenIdx) : rest;
    if (funcName = funcName.replace(/^async\s+/, "").replace(/^new\s+/, ""), funcName.includes("/") || funcName.includes("\\") || /:\d/.test(funcName)) continue;
    if (funcName) frameNames.push(funcName);
    if (frameNames.length >= maxFrames) break;
  }
  return {
    names: frameNames,
    topFrame: topFrame
  };
}
function safeStringify(value) {
  try {
    return String(value);
  } catch {
    return "[unstringifiable]";
  }
}
function buildErrorTelemetryPayload(err) {
  try {
    let messageStr = safeStringify(err instanceof Error ? err.message : err),
      payload = {
        error_message_hash: fz(sanitizeErrorMessage(messageStr))
      },
      code = LO(err);
    if (code !== undefined) payload.error_code = code;
    if (err instanceof Error) {
      let constructorName = Gi_(err.constructor?.name);
      if (constructorName !== undefined) payload.error_constructor = constructorName;
      if (typeof err.stack === "string") {
        let {
          names: frameNames,
          topFrame: topFrame
        } = extractStackFrames(err.stack);
        if (frameNames.length > 0) payload.error_stack_hash = fz(frameNames.join("|"));
        if (topFrame !== undefined) {
          let sanitizedFrame = Wbq(topFrame);
          if (sanitizedFrame !== undefined) payload.error_top_frame = sanitizedFrame;
        }
      }
    }
    return payload;
  } catch {
    return {};
  }
}
function reportReactRenderError(err, errorInfo) {
  let errName = ta(err) ?? "unknown";
  try {
    y(`[reportRenderError] React boundary caught ${errName}: ${ZH(err)}`, {
      level: "error"
    });
  } catch {}
  let componentStack = errorInfo?.componentStack;
  (async () => {
    try {
      await jJ("tengu_uncaught_exception", {
        error_name: errName,
        ...buildErrorTelemetryPayload(err),
        source: K_("react_render"),
        ...(componentStack && {
          error_component_stack_hash: fz(componentStack)
        })
      }), await Promise.all([tOH(), eOH()]);
    } catch {}
  })();
}
var SW = L(() => {
  wt();
  jv();
  v_();
  UH();
  R_();
  ol9();
});

export {sanitizeErrorMessage as BXu,extractStackFrames as FXu,safeStringify as UXu,buildErrorTelemetryPayload as D1,reportReactRenderError as CAi,SW as Cv};
