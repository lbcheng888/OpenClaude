// @ts-nocheck
import {Fr as U8,Ql as I4} from "../../vendor/m4405.ts";
import {executePostToolHooks as ax_,executePostToolUseFailureHooks as sx_,executePreToolHooks as ox_} from "../hooks/5167_level.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Qi as wK,$u as D3} from "../mcp/2194_mcpServerName.ts";
import {Br as a8} from "../../vendor/m1456.ts";
import {createAttachmentMessage as f7,Bv as D2} from "../agent/4429_tryGetPDFReference.ts";
import {Pk as PZ} from "../mcp/3149_scope.ts";
import {fromEnum as QH,Qe as K_} from "../../vendor/m5.ts";
import {v_e as UwH,tdt as t1_,p3t as rx_} from "../../vendor/m4235.ts";
import {h_ as YA,bt as R_} from "../../vendor/m195.ts";
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {De as SH,Rn as y6} from "../session/0615_length.ts";
import {checkRuleBasedPermissions as ZGH,ay as oA} from "./5184_toolAlwaysAllowedRule.ts";
import {getPreToolHookBlockingMessage as R5q,yp as jO} from "./5171_shouldSkipHookDueToTrust.ts";
import {cl as $4,Xr as qq} from "../../vendor/m321.ts";
import {Mso as Kqq} from "../permissions/3895_request_id.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
async function* $I6(toolUseContext, tool, toolUseID, messageID, toolInput, toolResponse, requestId, mcpServerType, mcpServerBaseUrl, durationMs) {
  let startTime = Date.now();
  try {
    let permissionMode = U8(toolUseContext).mode;
    for await (let hookResult of ax_(tool.name, toolUseID, toolInput, toolResponse, toolUseContext, permissionMode, toolUseContext.abortController.signal, undefined, durationMs)) try {
      if (hookResult.message?.type === "attachment" && hookResult.message.attachment.type === "hook_cancelled") {
        c("tengu_post_tool_hooks_cancelled", {
          toolName: wK(tool.name),
          queryChainId: a8(toolUseContext.queryTracking?.chainId),
          queryDepth: toolUseContext.queryTracking?.depth
        }), yield {
          message: f7({
            type: "hook_cancelled",
            hookName: `PostToolUse:${tool.name}`,
            toolUseID: toolUseID,
            hookEvent: "PostToolUse"
          })
        };
        continue;
      }
      if (hookResult.message && !(hookResult.message.type === "attachment" && hookResult.message.attachment.type === "hook_blocking_error")) yield {
        message: hookResult.message
      };
      if (hookResult.blockingError) yield {
        message: f7({
          type: "hook_blocking_error",
          hookName: `PostToolUse:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUse",
          blockingError: hookResult.blockingError
        })
      };
      if (hookResult.updatedToolOutput !== undefined) yield {
        updatedToolOutput: hookResult.updatedToolOutput
      };
      if (hookResult.updatedMCPToolOutput !== undefined && PZ(tool)) yield {
        updatedToolOutput: hookResult.updatedMCPToolOutput
      };
      if (hookResult.preventContinuation) {
        yield {
          message: f7({
            type: "hook_stopped_continuation",
            message: hookResult.stopReason || "Execution stopped by PostToolUse hook",
            hookName: `PostToolUse:${tool.name}`,
            toolUseID: toolUseID,
            hookEvent: "PostToolUse"
          })
        };
        return;
      }
      if (hookResult.additionalContexts && hookResult.additionalContexts.length > 0) yield {
        message: f7({
          type: "hook_additional_context",
          content: hookResult.additionalContexts,
          hookName: `PostToolUse:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUse"
        })
      };
    } catch (hookError) {
      let elapsedMs = Date.now() - startTime;
      c("tengu_post_tool_hook_error", {
        messageID: a8(messageID),
        toolName: wK(tool.name),
        isMcp: tool.isMcp ?? false,
        duration: elapsedMs,
        queryChainId: a8(toolUseContext.queryTracking?.chainId),
        queryDepth: toolUseContext.queryTracking?.depth,
        ...(mcpServerType && {
          mcpServerType: QH(mcpServerType)
        }),
        ...(requestId && {
          requestId: a8(requestId)
        })
      }), yield {
        message: f7({
          type: "hook_error_during_execution",
          content: UwH(hookError),
          hookName: `PostToolUse:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUse"
        })
      };
    }
  } catch (outerError) {
    if (YA(outerError)) {
      if (toolUseContext.abortController.signal.aborted) throw outerError;
      y("PostToolUse hook timed out (per-hook abort)"), c("tengu_sdk_hook_callback_timeout", {
        hookEvent: K_("PostToolUse"),
        toolName: wK(tool.name)
      });
      return;
    }
    SH(outerError);
  }
}
async function* YI6(toolUseContext, tool, toolUseID, messageID, toolResponse, error, isInterrupt, requestId, mcpServerType, mcpServerBaseUrl, durationMs) {
  let startTime = Date.now();
  try {
    let permissionMode = U8(toolUseContext).mode;
    for await (let hookResult of sx_(tool.name, toolUseID, toolResponse, error, toolUseContext, isInterrupt, permissionMode, toolUseContext.abortController.signal, undefined, durationMs)) try {
      if (hookResult.message?.type === "attachment" && hookResult.message.attachment.type === "hook_cancelled") {
        c("tengu_post_tool_failure_hooks_cancelled", {
          toolName: wK(tool.name),
          queryChainId: a8(toolUseContext.queryTracking?.chainId),
          queryDepth: toolUseContext.queryTracking?.depth
        }), yield {
          message: f7({
            type: "hook_cancelled",
            hookName: `PostToolUseFailure:${tool.name}`,
            toolUseID: toolUseID,
            hookEvent: "PostToolUseFailure"
          })
        };
        continue;
      }
      if (hookResult.message && !(hookResult.message.type === "attachment" && hookResult.message.attachment.type === "hook_blocking_error")) yield {
        message: hookResult.message
      };
      if (hookResult.blockingError) yield {
        message: f7({
          type: "hook_blocking_error",
          hookName: `PostToolUseFailure:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUseFailure",
          blockingError: hookResult.blockingError
        })
      };
      if (hookResult.additionalContexts && hookResult.additionalContexts.length > 0) yield {
        message: f7({
          type: "hook_additional_context",
          content: hookResult.additionalContexts,
          hookName: `PostToolUseFailure:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUseFailure"
        })
      };
    } catch (hookError) {
      let elapsedMs = Date.now() - startTime;
      c("tengu_post_tool_failure_hook_error", {
        messageID: a8(messageID),
        toolName: wK(tool.name),
        isMcp: tool.isMcp ?? false,
        duration: elapsedMs,
        queryChainId: a8(toolUseContext.queryTracking?.chainId),
        queryDepth: toolUseContext.queryTracking?.depth,
        ...(mcpServerType && {
          mcpServerType: QH(mcpServerType)
        }),
        ...(requestId && {
          requestId: a8(requestId)
        })
      }), yield {
        message: f7({
          type: "hook_error_during_execution",
          content: UwH(hookError),
          hookName: `PostToolUseFailure:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUseFailure"
        })
      };
    }
  } catch (outerError) {
    if (YA(outerError)) {
      if (toolUseContext.abortController.signal.aborted) y("PostToolUseFailure hook cancelled (parent abort)");else y("PostToolUseFailure hook timed out (per-hook abort)"), c("tengu_sdk_hook_callback_timeout", {
        hookEvent: K_("PostToolUseFailure"),
        toolName: wK(tool.name)
      });
      return;
    }
    SH(outerError);
  }
}
async function AI6(hookDecision, tool, toolInput, toolUseContext, resolvePermission, assistantMessage, toolUseID) {
  let requiresUserInteraction = tool.requiresUserInteraction?.(),
    requireCanUseTool = toolUseContext.requireCanUseTool;
  if (hookDecision?.behavior === "deny") return y(`Hook denied tool use for ${tool.name}`), {
    decision: hookDecision,
    input: toolInput
  };
  if (hookDecision?.behavior !== "allow" && hookDecision?.behavior !== "ask") return {
    decision: await resolvePermission(tool, toolInput, toolUseContext, assistantMessage, toolUseID),
    input: toolInput
  };
  let behavior = hookDecision.behavior,
    effectiveInput = hookDecision.updatedInput ?? toolInput,
    interactionSatisfiedByUpdatedInput = requiresUserInteraction && hookDecision.updatedInput !== undefined;
  if (behavior === "allow" && (requiresUserInteraction && !interactionSatisfiedByUpdatedInput || requireCanUseTool)) return y(`Hook approved tool use for ${tool.name}, but canUseTool is required`), {
    decision: await resolvePermission(tool, effectiveInput, toolUseContext, assistantMessage, toolUseID),
    input: effectiveInput
  };
  let ruleDecision = await ZGH(tool, effectiveInput, toolUseContext);
  if (ruleDecision?.behavior === "deny") return y(`Hook returned '${behavior}' for ${tool.name}, but deny rule overrides: ${ruleDecision.message}`), {
    decision: ruleDecision,
    input: effectiveInput
  };
  if (ruleDecision?.behavior === "ask") return y(`Hook returned '${behavior}' for ${tool.name}, but ask rule/safety check requires full permission pipeline`), {
    decision: await resolvePermission(tool, effectiveInput, toolUseContext, assistantMessage, toolUseID),
    input: effectiveInput
  };
  if (behavior === "allow") return y(interactionSatisfiedByUpdatedInput ? `Hook satisfied user interaction for ${tool.name} via updatedInput` : `Hook approved tool use for ${tool.name}, bypassing permission prompt`), {
    decision: hookDecision,
    input: effectiveInput
  };
  return {
    decision: await resolvePermission(tool, effectiveInput, toolUseContext, assistantMessage, toolUseID, hookDecision),
    input: effectiveInput
  };
}
async function* wI6(toolUseContext, tool, toolInput, toolUseID, messageID, requestId, mcpServerType, mcpServerBaseUrl) {
  let startTime = Date.now(),
    deferredHookName,
    denied = false;
  try {
    for await (let hookResult of ox_(tool.name, toolUseID, toolInput, toolUseContext, U8(toolUseContext).mode, toolUseContext.abortController.signal)) try {
      if (hookResult.message && !(hookResult.message.type === "attachment" && hookResult.message.attachment.type === "hook_blocking_error")) yield {
        type: "message",
        message: {
          message: hookResult.message
        }
      };
      if (hookResult.blockingError) {
        denied = true;
        let denyMessage = R5q(`PreToolUse:${tool.name}`, hookResult.blockingError);
        yield {
          type: "hookPermissionResult",
          hookPermissionResult: {
            behavior: "deny",
            message: denyMessage,
            decisionReason: {
              type: "hook",
              hookName: `PreToolUse:${tool.name}`,
              reason: denyMessage
            }
          }
        };
      }
      if (hookResult.updatedInput !== undefined) {
        let parseResult = tool.inputSchema.safeParse(hookResult.updatedInput),
          significantIssues = parseResult.success ? [] : parseResult.error.issues.filter(issue => issue.code !== "unrecognized_keys");
        if (!parseResult.success && significantIssues.length > 0) {
          let zodError = new $4.ZodError(significantIssues),
            validationMessage = `PreToolUse hook for ${tool.name} returned updatedInput that failed schema validation: ${t1_(tool.name, zodError)}`;
          y(validationMessage, {
            level: "warn"
          }), denied = true, yield {
            type: "hookPermissionResult",
            hookPermissionResult: {
              behavior: "deny",
              message: validationMessage,
              decisionReason: {
                type: "hook",
                hookName: `PreToolUse:${tool.name}`,
                hookSource: hookResult.hookSource,
                reason: validationMessage
              }
            }
          };
          continue;
        }
      }
      if (hookResult.preventContinuation) {
        if (yield {
          type: "preventContinuation",
          shouldPreventContinuation: true
        }, hookResult.stopReason) yield {
          type: "stopReason",
          stopReason: hookResult.stopReason
        };
      }
      if (hookResult.permissionBehavior !== undefined) {
        if (y(`Hook result has permissionBehavior=${hookResult.permissionBehavior}`), hookResult.permissionBehavior === "defer") {
          deferredHookName = hookResult.hookSource || `PreToolUse:${tool.name}`;
          continue;
        }
        if (hookResult.permissionBehavior === "deny") denied = true;
        let decisionReason = {
          type: "hook",
          hookName: `PreToolUse:${tool.name}`,
          hookSource: hookResult.hookSource,
          reason: hookResult.hookPermissionDecisionReason
        };
        if (hookResult.permissionBehavior === "allow") yield {
          type: "hookPermissionResult",
          hookPermissionResult: {
            behavior: "allow",
            updatedInput: hookResult.updatedInput,
            decisionReason: decisionReason
          }
        };else if (hookResult.permissionBehavior === "ask") yield {
          type: "hookPermissionResult",
          hookPermissionResult: {
            behavior: "ask",
            updatedInput: hookResult.updatedInput,
            message: hookResult.hookPermissionDecisionReason || `Hook PreToolUse:${tool.name} ${Kqq(hookResult.permissionBehavior)} this tool`,
            decisionReason: decisionReason
          }
        };else yield {
          type: "hookPermissionResult",
          hookPermissionResult: {
            behavior: hookResult.permissionBehavior,
            message: hookResult.hookPermissionDecisionReason || `Hook PreToolUse:${tool.name} ${Kqq(hookResult.permissionBehavior)} this tool`,
            decisionReason: decisionReason
          }
        };
      }
      if (hookResult.updatedInput && hookResult.permissionBehavior === undefined) yield {
        type: "hookUpdatedInput",
        updatedInput: hookResult.updatedInput
      };
      if (hookResult.additionalContexts && hookResult.additionalContexts.length > 0) yield {
        type: "additionalContext",
        message: {
          message: f7({
            type: "hook_additional_context",
            content: hookResult.additionalContexts,
            hookName: `PreToolUse:${tool.name}`,
            toolUseID: toolUseID,
            hookEvent: "PreToolUse"
          })
        }
      };
      if (toolUseContext.abortController.signal.aborted) {
        c("tengu_pre_tool_hooks_cancelled", {
          toolName: wK(tool.name),
          queryChainId: a8(toolUseContext.queryTracking?.chainId),
          queryDepth: toolUseContext.queryTracking?.depth
        }), yield {
          type: "message",
          message: {
            message: f7({
              type: "hook_cancelled",
              hookName: `PreToolUse:${tool.name}`,
              toolUseID: toolUseID,
              hookEvent: "PreToolUse"
            })
          }
        }, yield {
          type: "stop"
        };
        return;
      }
    } catch (hookError) {
      SH(hookError);
      let elapsedMs = Date.now() - startTime;
      c("tengu_pre_tool_hook_error", {
        messageID: a8(messageID),
        toolName: wK(tool.name),
        isMcp: tool.isMcp ?? false,
        duration: elapsedMs,
        queryChainId: a8(toolUseContext.queryTracking?.chainId),
        queryDepth: toolUseContext.queryTracking?.depth,
        ...(mcpServerType && {
          mcpServerType: QH(mcpServerType)
        }),
        ...(requestId && {
          requestId: a8(requestId)
        })
      }), yield {
        type: "message",
        message: {
          message: f7({
            type: "hook_error_during_execution",
            content: UwH(hookError),
            hookName: `PreToolUse:${tool.name}`,
            toolUseID: toolUseID,
            hookEvent: "PreToolUse"
          })
        }
      }, yield {
        type: "stop"
      };
    }
  } catch (outerError) {
    if (YA(outerError)) {
      if (toolUseContext.abortController.signal.aborted) y("PreToolUse hook cancelled (parent abort)");else y("PreToolUse hook timed out (per-hook abort)"), c("tengu_sdk_hook_callback_timeout", {
        hookEvent: K_("PreToolUse"),
        toolName: wK(tool.name)
      });
    } else SH(outerError);
    yield {
      type: "stop"
    };
    return;
  }
  if (deferredHookName && !denied) yield {
    type: "defer",
    hookName: deferredHookName
  };
}
var RKq = L(() => {
  v_();
  D3();
  qq();
  D2();
  I4();
  UH();
  R_();
  jO();
  y6();
  oA();
  rx_();
});

export {$I6 as B3n,YI6 as F3n,AI6 as U3n,wI6 as $3n,RKq as _po};
