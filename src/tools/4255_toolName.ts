// @ts-nocheck
import {Mr,xl} from "../../vendor/m4427.ts";
import {executePostToolHooks as xqt,executePostToolUseFailureHooks as Dqt,executePreToolHooks as Iqt} from "../hooks/5200_level.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {xr} from "../../vendor/m1461.ts";
import {createAttachmentMessage as ti,GA} from "../agent/4451_tryGetPDFReference.ts";
import {Zk} from "../mcp/3159_scope.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {Vye,rmt,p_o,Hqt} from "../../vendor/m4253.ts";
import {allTools as R_,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {checkRuleBasedPermissions as Fxe,ly} from "./5218_toolAlwaysAllowedRule.ts";
import {getPreToolHookBlockingMessage as h_o,Wd} from "./5204_shouldSkipHookDueToTrust.ts";
import {za,Qr} from "../../vendor/m323.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/**
 * Tool-use hook orchestration: runs PostToolUse, PostToolUseFailure and PreToolUse
 * hooks around a tool invocation, yielding messages / permission decisions, and
 * merges hook-driven permission behavior with the rule-based permission pipeline.
 */

/**
 * Runs the PostToolUse hooks for a completed tool invocation, yielding hook
 * messages, blocking errors, updated tool output and additional context.
 *
 * @param toolUseContext   Active tool-use context (options, abort controller, query tracking).
 * @param tool             Tool descriptor (name, isMcp, ...).
 * @param toolUseID        Id of this tool_use block.
 * @param messageID        Id of the assistant message that issued the tool_use.
 * @param toolInput        Resolved tool input.
 * @param toolResponse     Tool execution result passed to the hooks.
 * @param requestId        Optional MCP request id (telemetry only).
 * @param mcpServerType    Optional MCP server type (telemetry only).
 * @param mcpServerBaseUrl Optional MCP server base url (unused here, telemetry context).
 * @param durationMs       Tool execution duration in ms, forwarded to the hooks.
 */
async function* K6n(toolUseContext, tool, toolUseID, messageID, toolInput, toolResponse, requestId, mcpServerType, mcpServerBaseUrl, durationMs) {
  if (toolUseContext.options.bareFork) return;
  let startTime = Date.now();
  try {
    let permissionMode = Mr(toolUseContext).mode;
    for await (let hookResult of xqt(tool.name, toolUseID, toolInput, toolResponse, toolUseContext, permissionMode, toolUseContext.abortController.signal, void 0, durationMs)) try {
      if (hookResult.message?.type === "attachment" && hookResult.message.attachment.type === "hook_cancelled") {
        W("tengu_post_tool_hooks_cancelled", {
          toolName: Pi(tool.name),
          queryChainId: xr(toolUseContext.queryTracking?.chainId),
          queryDepth: toolUseContext.queryTracking?.depth
        }), yield {
          message: ti({
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
        message: ti({
          type: "hook_blocking_error",
          hookName: `PostToolUse:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUse",
          blockingError: hookResult.blockingError
        })
      };
      if (hookResult.updatedToolOutput !== void 0) yield {
        updatedToolOutput: hookResult.updatedToolOutput
      };
      if (hookResult.updatedMCPToolOutput !== void 0 && Zk(tool)) yield {
        updatedToolOutput: hookResult.updatedMCPToolOutput
      };
      if (hookResult.preventContinuation) {
        yield {
          message: ti({
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
        message: ti({
          type: "hook_additional_context",
          content: hookResult.additionalContexts,
          hookName: `PostToolUse:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUse"
        })
      };
    } catch (hookError) {
      let elapsedMs = Date.now() - startTime;
      W("tengu_post_tool_hook_error", {
        messageID: xr(messageID),
        toolName: Pi(tool.name),
        isMcp: tool.isMcp ?? !1,
        duration: elapsedMs,
        queryChainId: xr(toolUseContext.queryTracking?.chainId),
        queryDepth: toolUseContext.queryTracking?.depth,
        ...(mcpServerType && {
          mcpServerType: Le(mcpServerType)
        }),
        ...(requestId && {
          requestId: xr(requestId)
        })
      }), yield {
        message: ti({
          type: "hook_error_during_execution",
          content: Vye(hookError),
          hookName: `PostToolUse:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUse"
        })
      };
    }
  } catch (outerError) {
    if (R_(outerError)) {
      if (toolUseContext.abortController.signal.aborted) throw outerError;
      A("PostToolUse hook timed out (per-hook abort)"), W("tengu_sdk_hook_callback_timeout", {
        hookEvent: Ve("PostToolUse"),
        toolName: Pi(tool.name)
      });
      return;
    }
    Ie(outerError);
  }
}
/**
 * Runs the PostToolUseFailure hooks for a tool invocation that failed (or was
 * interrupted), yielding hook messages, blocking errors and additional context.
 *
 * @param toolUseContext   Active tool-use context.
 * @param tool             Tool descriptor.
 * @param toolUseID        Id of this tool_use block.
 * @param messageID        Id of the assistant message that issued the tool_use.
 * @param toolResponse     Tool execution result passed to the hooks.
 * @param error            The error produced by the tool.
 * @param isInterrupt      Whether the failure was caused by an interrupt/abort.
 * @param requestId        Optional MCP request id (telemetry only).
 * @param mcpServerType    Optional MCP server type (telemetry only).
 * @param mcpServerBaseUrl Optional MCP server base url (telemetry context).
 * @param durationMs       Tool execution duration in ms, forwarded to the hooks.
 */
async function* z6n(toolUseContext, tool, toolUseID, messageID, toolResponse, error, isInterrupt, requestId, mcpServerType, mcpServerBaseUrl, durationMs) {
  if (toolUseContext.options.bareFork) return;
  let startTime = Date.now();
  try {
    let permissionMode = Mr(toolUseContext).mode;
    for await (let hookResult of Dqt(tool.name, toolUseID, toolResponse, error, toolUseContext, isInterrupt, permissionMode, toolUseContext.abortController.signal, void 0, durationMs)) try {
      if (hookResult.message?.type === "attachment" && hookResult.message.attachment.type === "hook_cancelled") {
        W("tengu_post_tool_failure_hooks_cancelled", {
          toolName: Pi(tool.name),
          queryChainId: xr(toolUseContext.queryTracking?.chainId),
          queryDepth: toolUseContext.queryTracking?.depth
        }), yield {
          message: ti({
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
        message: ti({
          type: "hook_blocking_error",
          hookName: `PostToolUseFailure:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUseFailure",
          blockingError: hookResult.blockingError
        })
      };
      if (hookResult.additionalContexts && hookResult.additionalContexts.length > 0) yield {
        message: ti({
          type: "hook_additional_context",
          content: hookResult.additionalContexts,
          hookName: `PostToolUseFailure:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUseFailure"
        })
      };
    } catch (hookError) {
      let elapsedMs = Date.now() - startTime;
      W("tengu_post_tool_failure_hook_error", {
        messageID: xr(messageID),
        toolName: Pi(tool.name),
        isMcp: tool.isMcp ?? !1,
        duration: elapsedMs,
        queryChainId: xr(toolUseContext.queryTracking?.chainId),
        queryDepth: toolUseContext.queryTracking?.depth,
        ...(mcpServerType && {
          mcpServerType: Le(mcpServerType)
        }),
        ...(requestId && {
          requestId: xr(requestId)
        })
      }), yield {
        message: ti({
          type: "hook_error_during_execution",
          content: Vye(hookError),
          hookName: `PostToolUseFailure:${tool.name}`,
          toolUseID: toolUseID,
          hookEvent: "PostToolUseFailure"
        })
      };
    }
  } catch (outerError) {
    if (R_(outerError)) {
      if (toolUseContext.abortController.signal.aborted) A("PostToolUseFailure hook cancelled (parent abort)");else A("PostToolUseFailure hook timed out (per-hook abort)"), W("tengu_sdk_hook_callback_timeout", {
        hookEvent: Ve("PostToolUseFailure"),
        toolName: Pi(tool.name)
      });
      return;
    }
    Ie(outerError);
  }
}
/**
 * Reconciles a PreToolUse hook permission decision with the rule-based permission
 * pipeline, deciding whether to honor the hook's allow/ask/deny or fall through to
 * the normal permission resolver. Returns the final decision plus the effective input.
 *
 * @param hookDecision      Permission decision produced by the PreToolUse hooks.
 * @param tool              Tool descriptor.
 * @param toolInput         Original tool input.
 * @param toolUseContext    Active tool-use context.
 * @param resolvePermission Fallback permission resolver invoked when the hook does not decide.
 * @param assistantMessage  Assistant message that issued the tool_use.
 * @param toolUseID         Id of this tool_use block.
 */
async function j6n(hookDecision, tool, toolInput, toolUseContext, resolvePermission, assistantMessage, toolUseID) {
  let requiresUserInteraction = tool.requiresUserInteraction?.(),
    requireCanUseTool = toolUseContext.requireCanUseTool;
  if (hookDecision?.behavior === "deny") return A(`Hook denied tool use for ${tool.name}`), {
    decision: hookDecision,
    input: toolInput
  };
  if (hookDecision?.behavior !== "allow" && hookDecision?.behavior !== "ask") return {
    decision: await resolvePermission(tool, toolInput, toolUseContext, assistantMessage, toolUseID),
    input: toolInput
  };
  let behavior = hookDecision.behavior,
    effectiveInput = hookDecision.updatedInput ?? toolInput,
    interactionSatisfiedByUpdatedInput = requiresUserInteraction && hookDecision.updatedInput !== void 0;
  if (behavior === "allow" && (requiresUserInteraction && !interactionSatisfiedByUpdatedInput || requireCanUseTool)) return A(`Hook approved tool use for ${tool.name}, but canUseTool is required`), {
    decision: await resolvePermission(tool, effectiveInput, toolUseContext, assistantMessage, toolUseID),
    input: effectiveInput
  };
  let ruleDecision = await Fxe(tool, effectiveInput, toolUseContext);
  if (ruleDecision?.behavior === "deny") return A(`Hook returned '${behavior}' for ${tool.name}, but deny rule overrides: ${ruleDecision.message}`), {
    decision: ruleDecision,
    input: effectiveInput
  };
  if (ruleDecision?.behavior === "ask") return A(`Hook returned '${behavior}' for ${tool.name}, but ask rule/safety check requires full permission pipeline`), {
    decision: await resolvePermission(tool, effectiveInput, toolUseContext, assistantMessage, toolUseID),
    input: effectiveInput
  };
  if (behavior === "allow") return A(interactionSatisfiedByUpdatedInput ? `Hook satisfied user interaction for ${tool.name} via updatedInput` : `Hook approved tool use for ${tool.name}, bypassing permission prompt`), {
    decision: hookDecision,
    input: effectiveInput
  };
  return {
    decision: await resolvePermission(tool, effectiveInput, toolUseContext, assistantMessage, toolUseID, hookDecision),
    input: effectiveInput
  };
}
/**
 * Runs the PreToolUse hooks before a tool invocation, yielding hook messages,
 * permission results (allow/ask/deny), updated input, deferral and stop signals.
 * Validates any updatedInput against the tool input schema and tracks whether the
 * tool was denied or a permission decision was deferred to a later hook.
 *
 * @param toolUseContext   Active tool-use context.
 * @param tool             Tool descriptor.
 * @param toolInput        Original tool input.
 * @param toolUseID        Id of this tool_use block.
 * @param messageID        Id of the assistant message that issued the tool_use.
 * @param requestId        Optional MCP request id (telemetry only).
 * @param mcpServerType    Optional MCP server type (telemetry only).
 * @param mcpServerBaseUrl Optional MCP server base url (telemetry context).
 */
async function* Y6n(toolUseContext, tool, toolInput, toolUseID, messageID, requestId, mcpServerType, mcpServerBaseUrl) {
  if (toolUseContext.options.bareFork) return;
  let startTime = Date.now(),
    deferredHookName,
    denied = !1;
  try {
    for await (let hookResult of Iqt(tool.name, toolUseID, toolInput, toolUseContext, Mr(toolUseContext).mode, toolUseContext.abortController.signal)) try {
      if (hookResult.message && !(hookResult.message.type === "attachment" && hookResult.message.attachment.type === "hook_blocking_error")) yield {
        type: "message",
        message: {
          message: hookResult.message
        }
      };
      if (hookResult.blockingError) {
        denied = !0;
        let denyMessage = h_o(`PreToolUse:${tool.name}`, hookResult.blockingError);
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
      if (hookResult.updatedInput !== void 0) {
        let parseResult = tool.inputSchema.safeParse(hookResult.updatedInput),
          significantIssues = parseResult.success ? [] : parseResult.error.issues.filter(issue => issue.code !== "unrecognized_keys");
        if (!parseResult.success && significantIssues.length > 0) {
          let zodError = new za.ZodError(significantIssues),
            validationMessage = `PreToolUse hook for ${tool.name} returned updatedInput that failed schema validation: ${rmt(tool.name, zodError)}`;
          A(validationMessage, {
            level: "warn"
          }), denied = !0, yield {
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
          shouldPreventContinuation: !0
        }, hookResult.stopReason) yield {
          type: "stopReason",
          stopReason: hookResult.stopReason
        };
      }
      if (hookResult.permissionBehavior !== void 0) {
        if (A(`Hook result has permissionBehavior=${hookResult.permissionBehavior}`), hookResult.permissionBehavior === "defer") {
          deferredHookName = hookResult.hookSource || `PreToolUse:${tool.name}`;
          continue;
        }
        if (hookResult.permissionBehavior === "deny") denied = !0;
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
            message: hookResult.hookPermissionDecisionReason || `Hook PreToolUse:${tool.name} ${p_o(hookResult.permissionBehavior)} this tool`,
            decisionReason: decisionReason
          }
        };else yield {
          type: "hookPermissionResult",
          hookPermissionResult: {
            behavior: hookResult.permissionBehavior,
            message: hookResult.hookPermissionDecisionReason || `Hook PreToolUse:${tool.name} ${p_o(hookResult.permissionBehavior)} this tool`,
            decisionReason: decisionReason
          }
        };
      }
      if (hookResult.updatedInput && hookResult.permissionBehavior === void 0) yield {
        type: "hookUpdatedInput",
        updatedInput: hookResult.updatedInput
      };
      if (hookResult.additionalContexts && hookResult.additionalContexts.length > 0) yield {
        type: "additionalContext",
        message: {
          message: ti({
            type: "hook_additional_context",
            content: hookResult.additionalContexts,
            hookName: `PreToolUse:${tool.name}`,
            toolUseID: toolUseID,
            hookEvent: "PreToolUse"
          })
        }
      };
      if (toolUseContext.abortController.signal.aborted) {
        W("tengu_pre_tool_hooks_cancelled", {
          toolName: Pi(tool.name),
          queryChainId: xr(toolUseContext.queryTracking?.chainId),
          queryDepth: toolUseContext.queryTracking?.depth
        }), yield {
          type: "message",
          message: {
            message: ti({
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
      Ie(hookError);
      let elapsedMs = Date.now() - startTime;
      W("tengu_pre_tool_hook_error", {
        messageID: xr(messageID),
        toolName: Pi(tool.name),
        isMcp: tool.isMcp ?? !1,
        duration: elapsedMs,
        queryChainId: xr(toolUseContext.queryTracking?.chainId),
        queryDepth: toolUseContext.queryTracking?.depth,
        ...(mcpServerType && {
          mcpServerType: Le(mcpServerType)
        }),
        ...(requestId && {
          requestId: xr(requestId)
        })
      }), yield {
        type: "message",
        message: {
          message: ti({
            type: "hook_error_during_execution",
            content: Vye(hookError),
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
    if (R_(outerError)) {
      if (toolUseContext.abortController.signal.aborted) A("PreToolUse hook cancelled (parent abort)");else A("PreToolUse hook timed out (per-hook abort)"), W("tengu_sdk_hook_callback_timeout", {
        hookEvent: Ve("PreToolUse"),
        toolName: Pi(tool.name)
      });
    } else Ie(outerError);
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
var f_o = b(() => {
  kt();
  vu();
  Qr();
  GA();
  xl();
  qe();
  Ct();
  Wd();
  vn();
  ly();
  Hqt();
});
export {K6n,z6n,j6n,Y6n,f_o};
