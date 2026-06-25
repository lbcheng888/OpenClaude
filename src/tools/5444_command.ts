// @ts-nocheck
import {p1,Zm} from "../config/2709_Zm.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {Tgt,PGt} from "../../vendor/m4927.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {bo,uo} from "../../vendor/m2468.ts";
import {bxe,h6a,Exe} from "../tui/4086_classifierApprovals.ts";
import {Tqn,Y4t} from "./4177_resolve.ts";
import {hasPermissionsToUseToolWithSink as Ypt,ly} from "./5218_toolAlwaysAllowedRule.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {E$n,puo} from "../../vendor/m3902.ts";
import {BXl,UXl} from "../../vendor/m5442.ts";
import {d6n,p6n} from "../permissions/4216_ctx.ts";
import {$c,Ct} from "../../vendor/m197.ts";
import {qp} from "../../vendor/m137.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {Bo} from "../../vendor/m5.ts";
import {b,x} from "../../runtime.ts";
import {jx} from "../../vendor/m196.ts";
import {je} from "../../vendor/m2462.ts";
import {jO} from "./4385_stripAllEnvVars.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Computes the deduplication key for a tool invocation used by the
 * auto-mode denial cache. For tools listed in `p1` (which carry extra
 * structured input we don't want to key on), only the `command` field is
 * used; all other tools key on their full input object.
 */
function $Xl(toolName: string, toolInput: any): any {
  return p1.includes(toolName) ? Pe({
    command: toolInput.command
  }) : Pe(toolInput);
}

/**
 * Hook that builds the per-tool permission evaluator. Given a tool `e`, it
 * returns an async function that decides whether a tool call is allowed,
 * denied, or needs to ask the user — wiring in auto-mode denial recording,
 * notifications, and the permission dialog flow. Result is memoized via the
 * React-compiler-style cache so the evaluator identity is stable across
 * renders unless its dependencies change.
 */
function y2m(e: any): any {
  let cache = qXl.c(10),
    notificationState = As(),
    {
      recordDenial: recordDenial,
      getDenials: getDenials,
      removeDenial: removeDenial
    } = Tgt(),
    {
      addNotification: addNotification
    } = Ci(),
    sessionKey = bo(),
    abortController;
  if (cache[0] !== sessionKey) abortController = bxe(sessionKey), cache[0] = sessionKey, cache[1] = abortController;else abortController = cache[1];
  let abortSignal = abortController,
    evaluatePermission;
  if (cache[2] !== addNotification || cache[3] !== notificationState || cache[4] !== getDenials || cache[5] !== recordDenial || cache[6] !== removeDenial || cache[7] !== abortSignal || cache[8] !== e) evaluatePermission = async (tool: any, toolInput: any, context: any, assistantMessage: any, toolUseContext: any, precomputedDecision: any) => {
    let priorDenial: any;
    {
      let denials = getDenials();
      if (denials.length > 0) {
        let inputKey = $Xl(tool.name, toolInput);
        priorDenial = denials.find((denial: any) => denial.toolName === tool.name && denial.inputKey === inputKey);
      }
    }
    let decisionPromise = new Promise(resolve => {
      let permissionCtx = Tqn(tool, toolInput, context, assistantMessage, toolUseContext, e, abortSignal);
      if (permissionCtx.resolveIfAborted(resolve)) return;
      return (precomputedDecision !== void 0 ? Promise.resolve(precomputedDecision) : Ypt(tool, toolInput, context, assistantMessage, toolUseContext, addNotification, abortSignal)).then(async (decision: any) => {
        if (decision.behavior === "allow") {
          if (permissionCtx.resolveIfAborted(resolve)) return;
          if (decision.decisionReason?.type === "classifier" && decision.decisionReason.classifier === "auto-mode") h6a(abortSignal, toolUseContext, decision.decisionReason.reason);
          permissionCtx.logDecision({
            decision: "accept",
            source: "config"
          }, {
            input: decision.updatedInput ?? toolInput
          }), resolve(permissionCtx.buildAllow(decision.updatedInput ?? toolInput, {
            decisionReason: decision.decisionReason
          }));
          return;
        }
        let appState = context.getAppState(),
          permissionContext = Mr(context),
          description = await tool.description(toolInput, {
            isNonInteractiveSession: context.options.isNonInteractiveSession,
            toolPermissionContext: permissionContext,
            tools: context.options.tools
          });
        if (permissionCtx.resolveIfAborted(resolve)) return;
        switch (decision.behavior) {
          case "deny":
            {
              if (permissionCtx.logDecision({
                decision: "reject",
                source: "config"
              }), decision.decisionReason?.type === "classifier" && decision.decisionReason.classifier === "auto-mode") {
                recordDenial({
                  toolName: tool.name,
                  display: description,
                  inputKey: $Xl(tool.name, toolInput),
                  reason: decision.decisionReason.reason ?? "",
                  timestamp: Date.now()
                });
                let emptyReason = "";
                addNotification({
                  key: "auto-mode-denied",
                  kind: "warning",
                  priority: "immediate",
                  jsx: eVe.jsxs(eVe.Fragment, {
                    children: [eVe.jsxs(v, {
                      color: "error",
                      children: [tool.userFacingName(toolInput).toLowerCase(), " denied by auto mode"]
                    }), null, eVe.jsx(v, {
                      dimColor: !0,
                      children: " \xB7 /permissions"
                    })]
                  })
                });
              }
              resolve(decision);
              return;
            }
          case "ask":
            {
              if (permissionContext.awaitAutomatedChecksBeforeDialog) {
                let automatedCheckResult = await E$n({
                  ctx: permissionCtx,
                  ...{},
                  updatedInput: decision.updatedInput,
                  suggestions: decision.suggestions,
                  permissionMode: permissionContext.mode
                });
                if (automatedCheckResult) {
                  resolve(automatedCheckResult);
                  return;
                }
              }
              if (permissionCtx.resolveIfAborted(resolve)) return;
              let preDialogResult = await BXl({
                ctx: permissionCtx,
                description: description,
                ...{},
                updatedInput: decision.updatedInput,
                suggestions: decision.suggestions
              });
              if (preDialogResult) {
                resolve(preDialogResult);
                return;
              }
              d6n({
                ctx: permissionCtx,
                description: description,
                result: decision,
                awaitAutomatedChecksBeforeDialog: permissionContext.awaitAutomatedChecksBeforeDialog,
                bridgeCallbacks: appState.replBridgePermissionCallbacks,
                channelCallbacks: appState.channelPermissionCallbacks
              }, resolve);
              return;
            }
        }
      }).catch((error: any) => {
        if (error instanceof $c || error instanceof qp) A(`Permission check threw ${error.constructor.name} for tool=${tool.name}: ${error.message}`), permissionCtx.logCancelled(), resolve(permissionCtx.cancelAndAbort(void 0, !0));else Ie(error), resolve(permissionCtx.cancelAndAbort(void 0, !0));
      }).finally(() => {
        Exe(abortSignal, toolUseContext);
      });
    });
    if (priorDenial) {
      let denial = priorDenial;
      decisionPromise.then((result: any) => {
        if (result.behavior === "allow") W("tengu_auto_mode_subsequent_approval", {
          toolName: Pi(tool.name),
          msSinceDeny: Date.now() - denial.timestamp,
          allowReasonType: Bo(result.decisionReason?.type)
        }), removeDenial(denial);
      });
    }
    return decisionPromise;
  }, cache[2] = addNotification, cache[3] = notificationState, cache[4] = getDenials, cache[5] = recordDenial, cache[6] = removeDenial, cache[7] = abortSignal, cache[8] = e, cache[9] = evaluatePermission;else evaluatePermission = cache[9];
  return evaluatePermission;
}
var qXl: any, eVe: any, WXl: any;
var GXl = b(() => {
  jx();
  kt();
  vu();
  PGt();
  fd();
  je();
  uo();
  jO();
  xl();
  qe();
  Ct();
  vn();
  ly();
  Zm();
  tn();
  puo();
  p6n();
  UXl();
  Y4t();
  qXl = x(tt(), 1), eVe = x(oe(), 1);
  WXl = y2m;
});

export {$Xl,y2m,qXl,eVe,WXl,GXl};
