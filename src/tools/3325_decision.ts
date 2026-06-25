// @ts-nocheck
import {I3e as kxH,x3e as yxH} from "../../vendor/m3323.ts";
import {xr as a8} from "../../vendor/m1461.ts";
import {Pi as wK,Mo as _9,jxt as KP_,vu as D3} from "../mcp/2200_mcpServerName.ts";
import {SandboxManager as nq,Uh as aY} from "../../vendor/m2682.ts";
import {ws as i9} from "../config/2709_Zm.ts";
import {ABt as pV_,COn as $R6} from "../../vendor/m3321.ts";
import {RBt as BV_,AOn as YR6} from "../../vendor/m3322.ts";
import {Le as QH} from "../../vendor/m5.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {He as EH,mn as f6} from "../telemetry/0600_feature_name.ts";
import {getCodeEditToolDecisionCounter as VY_,lt as A_} from "../session/0132_sent.ts";
import {bu as o1,oS as _j} from "../config/2605_event_name.ts";
import {TeamDeleteToolName as IH,tn as a_} from "../config/0230_encoding.ts";
import {mi as R7,lr as G8} from "../../vendor/m233.ts";
import {SANDBOX_AUTO_ALLOW_REASON as OnH,READ_ONLY_AUTO_ALLOW_REASON as eJ_,CLASSIFIER_TRANSCRIPT_TOO_LONG_REASON as _D_,HOOK_REWRITTEN_INPUT_ASK_REASON as pH6,BASH_PROMPT_RULE_DENY_PREFIX as TnH,CLASSIFIER_UNAVAILABLE_REASON as HD_,jN as km} from "../../vendor/m721.ts";
import {b as L} from "../../runtime.ts";
import {IA as SW} from "../telemetry/2225_names.ts";
// @ts-nocheck
function isCodeEditTool(toolName) {
  return codeEditToolNames.includes(toolName);
}
async function buildDecisionMetadata(tool, input, decision, source) {
  let language;
  if (tool.getPath && input) {
    let parsed = tool.inputSchema.safeParse(input);
    if (parsed.success) {
      let filePath = tool.getPath(parsed.data);
      if (filePath) language = await kxH(filePath);
    }
  }
  return {
    decision: decision,
    source: source,
    tool_name: tool.name,
    ...(language && {
      language: language
    })
  };
}
function mapPermissionSourceToCategory(source) {
  if (source.type === "classifier") return "classifier";
  switch (source.type) {
    case "hook":
      return "hook";
    case "user":
      return source.permanent ? "user_permanent" : "user_temporary";
    case "user_abort":
      return "user_abort";
    case "user_reject":
      return "user_reject";
    default:
      return "unknown";
  }
}
function buildToolTelemetryBase(messageId, toolName, waitMs) {
  return {
    messageID: a8(messageId),
    toolName: wK(toolName),
    sandboxEnabled: nq.isSandboxingEnabled(),
    ...(waitMs !== undefined && {
      waiting_for_user_permission_ms: waitMs
    })
  };
}
function analyzeCommandDestructiveness(tool, input, permissionMode) {
  let isBashTool = tool.name === _9;
  if (!isBashTool && tool.name !== i9) return;
  if (input === null || typeof input !== "object" || !("command" in input) || typeof input.command !== "string") return;
  let category = isBashTool ? pV_(input.command) : BV_(input.command);
  return {
    destructive_category: QH(category ?? "none"),
    permission_mode: QH(permissionMode)
  };
}
function logToolApprovalEvent(tool, messageId, approvalSource, waitMs, extraData) {
  if (approvalSource === "config") {
    c("tengu_tool_use_granted_in_config", {
      ...buildToolTelemetryBase(messageId, tool.name, undefined),
      ...extraData
    }), EH("permission_auto_approve_config");
    return;
  }
  if (approvalSource.type === "classifier") {
    c("tengu_tool_use_granted_by_classifier", {
      ...buildToolTelemetryBase(messageId, tool.name, waitMs),
      ...extraData
    });
    return;
  }
  switch (approvalSource.type) {
    case "user":
      c(approvalSource.permanent ? "tengu_tool_use_granted_in_prompt_permanent" : "tengu_tool_use_granted_in_prompt_temporary", {
        ...buildToolTelemetryBase(messageId, tool.name, waitMs),
        ...extraData
      }), EH("permission_user_grant");
      break;
    case "hook":
      c("tengu_tool_use_granted_by_permission_hook", {
        ...buildToolTelemetryBase(messageId, tool.name, waitMs),
        ...extraData,
        permanent: approvalSource.permanent
      }), EH("permission_auto_approve_hook");
      break;
    default:
      break;
  }
}
function logToolDenialEvent(tool, messageId, denialSource, waitMs, extraData) {
  if (denialSource === "config") {
    c("tengu_tool_use_denied_in_config", {
      ...buildToolTelemetryBase(messageId, tool.name, undefined),
      ...extraData
    }), EH("permission_auto_deny_config");
    return;
  }
  c("tengu_tool_use_rejected_in_prompt", {
    ...buildToolTelemetryBase(messageId, tool.name, waitMs),
    ...extraData,
    ...(denialSource.type === "hook" ? {
      isHook: true
    } : {
      hasFeedback: denialSource.type === "user_reject" ? denialSource.hasFeedback : false
    })
  }), EH(denialSource.type === "hook" ? "permission_auto_deny_hook" : "permission_user_deny");
}
function recordToolDecision(ctx, permissionResult, permissionStartTime) {
  let {
      tool: tool,
      input: input,
      toolUseContext: toolUseContext,
      messageId: messageId,
      toolUseID: toolUseID,
      permissionMode: permissionMode
    } = ctx,
    {
      decision: decision,
      source: source
    } = permissionResult,
    waitMs = permissionStartTime !== undefined ? Date.now() - permissionStartTime : undefined,
    destructivenessData = analyzeCommandDestructiveness(tool, input, permissionMode);
  if (permissionResult.decision === "accept") logToolApprovalEvent(tool, messageId, permissionResult.source, waitMs, destructivenessData);else logToolDenialEvent(tool, messageId, permissionResult.source, waitMs, destructivenessData);
  let sourceCategory = source === "config" ? "config" : mapPermissionSourceToCategory(source);
  if (isCodeEditTool(tool.name)) buildDecisionMetadata(tool, input, decision, sourceCategory).then(meta => VY_()?.add(1, meta));
  if (!toolUseContext.toolDecisions) toolUseContext.toolDecisions = {};
  toolUseContext.toolDecisions[toolUseID] = {
    source: sourceCategory,
    decision: decision,
    timestamp: Date.now()
  };
  let paramData = KP_(tool.name, input, tool.userFacingName?.(undefined));
  o1("tool_decision", {
    decision: decision,
    source: sourceCategory,
    tool_name: wK(tool.name),
    tool_use_id: toolUseID,
    ...(Object.keys(paramData).length > 0 && {
      tool_parameters: IH(paramData)
    })
  });
}
function mapDecisionReasonToString(behavior, resolvedSource, decisionReason) {
  if (resolvedSource !== undefined && resolvedSource !== "config") {
    if (resolvedSource === "hook") return "hook:PermissionRequest";
    if (resolvedSource === "classifier" && decisionReason?.type === "classifier") return mapClassifierReasonToString(decisionReason);
    return resolvedSource;
  }
  if (decisionReason === undefined) return "unknown";
  switch (decisionReason.type) {
    case "rule":
      return `rule:${decisionReason.rule.source}`;
    case "mode":
      return `mode:${decisionReason.mode}`;
    case "hook":
      return `hook:${R7(decisionReason.hookName, ":")}`;
    case "classifier":
      return mapClassifierReasonToString(decisionReason);
    case "subcommandResults":
      {
        let uniqueReasons = new Set();
        for (let subReason of decisionReason.reasons.values()) if (subReason.behavior === behavior && subReason.decisionReason !== undefined) uniqueReasons.add(mapDecisionReasonToString(behavior, undefined, subReason.decisionReason));
        let [first] = uniqueReasons;
        if (uniqueReasons.size === 1 && first !== undefined) return first;
        if (uniqueReasons.size > 1) return `subcommands:${[...new Set([...uniqueReasons].map(r => R7(r, ":")))].sort().join("+")}`;
        return "subcommandResults";
      }
    case "other":
      if (decisionReason.reason === OnH) return "sandboxAutoAllow";
      if (decisionReason.reason === eJ_) return "readOnlyCommand";
      if (decisionReason.reason === _D_) return "classifierTranscriptTooLong";
      if (decisionReason.bashMissKind !== undefined) return `bashMiss:${decisionReason.bashMissKind}`;
      return "other";
    case "asyncAgent":
      if (decisionReason.reason === pH6) return "hookRewrittenInputAsk";
      return decisionReason.type;
    case "safetyCheck":
      if (decisionReason.reason.startsWith(TnH)) return "bashPromptRule";
      return decisionReason.type;
    case "permissionPromptTool":
    case "sandboxOverride":
    case "workingDir":
      return decisionReason.type;
    default:
      return "unknown";
  }
}
function mapClassifierReasonToString(reason) {
  return reason.reason === HD_ ? `classifier:${reason.classifier}:unavailable` : `classifier:${reason.classifier}`;
}
function noopDecisionLogger({
  toolName: toolName,
  isMcp: isMcp,
  messageId: messageId,
  toolUseID: toolUseID,
  permissionMode: permissionMode,
  behavior: behavior,
  decisionReason: decisionReason,
  resolvedSource: resolvedSource
}) {
  return;
}
var codeEditToolNames;
var moduleInit = L(() => {
  v_();
  D3();
  A_();
  f6();
  $R6();
  YR6();
  km();
  yxH();
  SW();
  aY();
  a_();
  G8();
  _j();
  codeEditToolNames = ["Edit", "Write", "NotebookEdit"];
});
export {isCodeEditTool as ito,buildDecisionMetadata as ato,mapPermissionSourceToCategory as kZd,buildToolTelemetryBase as Zit,analyzeCommandDestructiveness as HZd,logToolApprovalEvent as IZd,logToolDenialEvent as xZd,recordToolDecision as Tha,mapDecisionReasonToString as Sha,mapClassifierReasonToString as yha,noopDecisionLogger as bha,codeEditToolNames as wZd,moduleInit as lto};
