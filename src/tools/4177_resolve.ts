// @ts-nocheck
import {Mr as U8,xl as I4} from "../../vendor/m4427.ts";
import {Tha as X9K,lto as Er8} from "./3325_decision.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {xr as a8} from "../../vendor/m1461.ts";
import {Pi as wK,vu as D3} from "../mcp/2200_mcpServerName.ts";
import {yW as Qp,S$ as ov,vzr as wg8,Sw as iW} from "../../vendor/m2789.ts";
import {setPermissionModeWithGuards as H1H,cy as Tj} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {Sqn as Wx_,Wdt as R4_,MY as R_H,K6e as kpH,Bxe as epH,po as Aq} from "./5224_userPromptCount.ts";
import {uqn as tI6} from "../../vendor/m4171.ts";
import {logForDebugging as y,qe as UH} from "../config/0236_setHasFormattedOutput.ts";
import {executePermissionRequestHooks as TwH} from "../hooks/5200_level.ts";
import {guardHookUpdatedInput as iK_,checkRuleBasedPermissions as ZGH,ly as oA} from "./5218_toolAlwaysAllowedRule.ts";
import {hqn as Kx6,gqn as Ox6} from "../telemetry/4174_toolName.ts";
import {Zp as ET,d1 as hv} from "../../vendor/m2705.ts";
import {_qn as Tx6,j4t as Px_,Rpt as R1_} from "../../vendor/m4175.ts";
import {Lk as HZ} from "../config/2259_R9r.ts";
import {b as L} from "../../runtime.ts";
import {jO as XN} from "./4385_stripAllEnvVars.ts";
import {Wd as jO} from "./5204_shouldSkipHookDueToTrust.ts";
// @ts-nocheck
function createOneShotResolver(resolve) {
  let resolved = false,
    claimed = false;
  return {
    resolve(value) {
      if (claimed) return;
      claimed = true, resolved = true, resolve(value);
    },
    isResolved() {
      return resolved;
    },
    claim() {
      if (resolved) return false;
      return resolved = true, true;
    }
  };
}
function buildPermissionContext(tool, input, toolUseContext, assistantMessage, toolUseId, persistPermissionsFn, setClassifierApprovals) {
  let messageId = assistantMessage.message.id,
    permissionMode = U8(toolUseContext).mode;
  function logDecision(decision, extra) {
    X9K({
      tool: tool,
      input: extra?.input ?? input,
      toolUseContext: toolUseContext,
      messageId: messageId,
      toolUseID: toolUseId,
      permissionMode: permissionMode
    }, decision, extra?.permissionPromptStartTimeMs);
  }
  let ctx = {
    tool: tool,
    input: input,
    toolUseContext: toolUseContext,
    assistantMessage: assistantMessage,
    messageId: messageId,
    toolUseID: toolUseId,
    setClassifierApprovals: setClassifierApprovals,
    permissionMode: permissionMode,
    logDecision: logDecision,
    logCancelled() {
      c("tengu_tool_use_cancelled", {
        messageID: a8(messageId),
        toolName: wK(tool.name)
      });
    },
    persistPermissions(permissions) {
      if (permissions.length === 0) return false;
      return Qp(permissions), persistPermissionsFn(ov(U8(toolUseContext), permissions)), permissions.some(perm => wg8(perm.destination));
    },
    setModeFromBridge(mode) {
      return H1H(mode, U8(toolUseContext), toolUseContext.setToolPermissionContext);
    },
    resolveIfAborted(resolveCallback) {
      if (!toolUseContext.abortController.signal.aborted) return false;
      return this.logCancelled(), resolveCallback(this.cancelAndAbort(undefined, true)), true;
    },
    cancelAndAbort(feedback, isAbort, contentBlocks) {
      let isSubagent = !!toolUseContext.agentId,
        msg = feedback ? `${isSubagent ? Wx_ : R4_}${feedback}` : isSubagent ? R_H : kpH,
        wrappedMsg = isSubagent ? msg : epH(msg);
      if (isAbort || tI6({
        feedback: feedback,
        contentBlocks: contentBlocks,
        isSubagent: isSubagent
      })) y(`Aborting: tool=${tool.name} isAbort=${isAbort} hasFeedback=${!!feedback} isSubagent=${isSubagent}`), toolUseContext.abortController.abort();
      return {
        behavior: "ask",
        message: wrappedMsg,
        contentBlocks: contentBlocks
      };
    },
    ...{},
    async runHooks(hooks, checksum, updatedInput, startTimeMs) {
      for await (let hookResult of TwH(tool.name, toolUseId, input, toolUseContext, hooks, checksum, toolUseContext.abortController.signal)) if (hookResult.permissionRequestResult) {
        let X = hookResult.permissionRequestResult;
        if (X.behavior === "allow") {
          let P = X.updatedInput ?? updatedInput ?? input;
          if (X.updatedInput) {
            let Z = iK_(await ZGH(tool, P, toolUseContext), tool.name);
            if (Z?.behavior === "deny") return this.logDecision({
              decision: "reject",
              source: "config"
            }, {
              input: P,
              permissionPromptStartTimeMs: startTimeMs
            }), {
              ...Z,
              decideLocation: "ask-path"
            };
            if (Z?.behavior === "ask") return {
              reprompted: Z,
              finalInput: P
            };
          }
          return this.handleHookAllow(P, X.updatedPermissions ?? [], startTimeMs);
        } else if (X.behavior === "deny") {
          if (this.logDecision({
            decision: "reject",
            source: {
              type: "hook"
            }
          }, {
            permissionPromptStartTimeMs: startTimeMs
          }), X.interrupt) y(`Hook interrupt: tool=${tool.name} hookMessage=${X.message}`), toolUseContext.abortController.abort();
          return this.buildDeny(X.message || "Permission denied by hook", {
            type: "hook",
            hookName: "PermissionRequest",
            reason: X.message
          });
        }
      }
      return null;
    },
    buildAllow(finalInput, opts) {
      return {
        behavior: "allow",
        updatedInput: finalInput,
        userModified: opts?.userModified ?? false,
        ...(opts?.decisionReason && {
          decisionReason: opts.decisionReason
        }),
        ...(opts?.acceptFeedback && {
          acceptFeedback: opts.acceptFeedback
        }),
        ...(opts?.contentBlocks && opts.contentBlocks.length > 0 && {
          contentBlocks: opts.contentBlocks
        })
      };
    },
    buildDeny(message, decisionReason) {
      return {
        behavior: "deny",
        message: message,
        decisionReason: decisionReason,
        decideLocation: "ask-path"
      };
    },
    handleUserAllow(finalInput, permissions, feedback, startTimeMs, contentBlocks, decisionReason) {
      let permanent = this.persistPermissions(permissions);
      Kx6(permissions), this.logDecision({
        decision: "accept",
        source: {
          type: "user",
          permanent: permanent
        }
      }, {
        input: finalInput,
        permissionPromptStartTimeMs: startTimeMs
      });
      let Z = tool.inputsEquivalent ? !tool.inputsEquivalent(input, finalInput) : false,
        inputModified = feedback?.trim();
      return this.buildAllow(finalInput, {
        userModified: Z,
        decisionReason: decisionReason,
        acceptFeedback: inputModified || undefined,
        contentBlocks: contentBlocks
      });
    },
    handleHookAllow(finalInput, permissions, startTimeMs) {
      let permanent = this.persistPermissions(permissions);
      return this.logDecision({
        decision: "accept",
        source: {
          type: "hook",
          permanent: permanent
        }
      }, {
        input: finalInput,
        permissionPromptStartTimeMs: startTimeMs
      }), this.buildAllow(finalInput, {
        decisionReason: {
          type: "hook",
          hookName: "PermissionRequest"
        }
      });
    }
  };
  return Object.freeze(ctx);
}
function buildApproveText(toolUseInfo) {
  let rawInput = toolUseInfo.input;
  if (toolUseInfo.tool.name === ET) return Tx6(rawInput);
  if (toolUseInfo.tool.name === HZ) return {
    text: "approve plan"
  };
  let userFacingName = toolUseInfo.tool.userFacingName(toolUseInfo.input).trim(),
    key = typeof rawInput?.command === "string" ? rawInput.command : typeof rawInput?.file_path === "string" ? rawInput.file_path : typeof rawInput?.url === "string" ? rawInput.url : "",
    displayName = userFacingName || toolUseInfo.tool.name;
  return {
    text: key && !displayName.includes(key) ? Px_(`approve ${displayName}: ${key}`) : `approve ${displayName}`
  };
}
var WI6 = L(() => {
  v_();
  D3();
  hv();
  XN();
  I4();
  UH();
  jO();
  Aq();
  iW();
  Tj();
  oA();
  Ox6();
  Er8();
  R1_();
});
export {createOneShotResolver as yqn,buildPermissionContext as Tqn,buildApproveText as XVa,WI6 as Y4t};
