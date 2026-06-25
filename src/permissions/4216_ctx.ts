// @ts-nocheck
import {sdo,WD,Z$n,e9n,u2a,c2a,d2a,_2a,h2a,g2a,p2a,f2a,m2a} from "../tools/3947_theme.ts";
import {yqn,XVa,Y4t} from "../tools/4177_resolve.ts";
import {i3t,a3t,t9n,b2a,E2a,C2a,ado} from "../tools/3948_resolvedPath.ts";
import {LVa,MVa,NVa} from "../tools/4171_filePath.ts";
import {B0e,R$n} from "../../vendor/m3908.ts";
import {rxe,n9n} from "../../vendor/m3949.ts";
import {sl,UB} from "../tools/4381_isSearch.ts";
import {Zqe,Z9t} from "../../vendor/m3923.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {zqe,A$n} from "../../vendor/m3904.ts";
import {NAe,Ph} from "../agent/1459_agentType.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ce,allTools as R_,Ct} from "../../vendor/m197.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {xr} from "../../vendor/m1461.ts";
import {Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {Bo,Le} from "../../vendor/m5.ts";
import {SandboxManager as xo,Uh} from "../../vendor/m2682.ts";
import {Pho,HVa} from "../telemetry/4169_event.ts";
import {Ne} from "../../vendor/m583.ts";
import {LY,Rpt} from "../../vendor/m4175.ts";
import {lKa,cKa} from "../../vendor/m4180.ts";
import {sve,SDt} from "../../vendor/m2226.ts";
import {hasPermissionsToUseTool as lx,ly} from "../tools/5218_toolAlwaysAllowedRule.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {MY,po} from "../tools/5224_userPromptCount.ts";
import {b,oo} from "../../runtime.ts";
import {C$n,Kqe} from "../../vendor/m3903.ts";
import {muo,G9t} from "../../vendor/m3905.ts";
import {fuo,V9t} from "../../vendor/m3906.ts";
import {huo,Lut} from "../../vendor/m3907.ts";
import {ldo,l3t} from "../../vendor/m3948.ts";
import {cdo,c3t} from "../../vendor/m3950.ts";
import {udo,u3t} from "../../vendor/m3951.ts";
import {ddo,d3t} from "../../vendor/m3952.ts";
import {o3t,tdt} from "../tools/3946_answers.ts";
import {jO} from "../tools/4385_stripAllEnvVars.ts";
import {Tdo,u9n} from "../tools/3965_message.ts";
import {i6e,KD} from "../tools/3962_tool.ts";
import {Upt,PowerShellTool as vgo} from "../tools/4347_isAutobackgroundingAllowed.ts";
import {jmo,opt} from "../tools/4106_sanitizedName.ts";
import {$4t,BB} from "../tools/4168_url.ts";
import {bO,isInProductPermissionsEnabled as G2e,CFC_TOOL_PREFIX as Bie} from "../mcp/2592_trackClaudeInChromeTabId.ts";
import {Ir} from "../../vendor/m584.ts";
import {_go,ggo} from "../tools/4208_WorkflowTool.ts";
import {Tgo,ygo} from "../../vendor/m4208.ts";
import {bgo,Sgo} from "../agent/4211_workflowNeedsUsageConsentPrompt.ts";
import {Ago,Cgo} from "../tools/4215_applyCcrTimeoutCap.ts";
// @ts-nocheck
/** Identity helper: registers a dialog provider entry as-is. */
function xce(provider) {
  return provider;
}
/** Find the dialog provider whose matcher accepts the given tool. */
function Rgo(tool) {
  return wBp.find(provider => provider.matches(tool));
}
/**
 * Drive an interactive permission request: pick the right dialog provider /
 * special-case (file edits, bash sed, bash classifier) and run its dialog.
 */
function d6n(request, resolve) {
  let {
      ctx: ctx,
      description: description,
      result: result,
      awaitAutomatedChecksBeforeDialog: awaitAutomatedChecksBeforeDialog
    } = request,
    requestSource = sdo(ctx.toolUseContext),
    onResolve = u6n !== null && G7a !== null && ctx.tool === u6n ? result => {
      if (result.behavior === "allow") G7a.recordWorkflowUsageConsent();
      resolve(result);
    } : resolve,
    {
      resolve: gateResolve,
      isResolved: isResolved,
      claim: claim
    } = yqn(onResolve),
    handles = {
      resolve: gateResolve,
      isResolved: isResolved,
      claim: claim
    },
    provider = Rgo(ctx.tool);
  if (provider !== void 0) {
    Fpt(request, handles, {
      dialog: provider.dialog,
      buildDescriptor: ({
        input: input,
        permissionResult: permissionResult
      }) => provider.build({
        tool: ctx.tool,
        input: input,
        description: description,
        toolUseID: ctx.toolUseID,
        permissionResult: permissionResult,
        assistantMessage: ctx.assistantMessage,
        theme: "dark",
        requestSource: requestSource
      })
    });
    return;
  }
  if (i3t(ctx.tool)) {
    let effectiveInput = result.updatedInput ?? ctx.input,
      filePath = a3t(ctx.tool, effectiveInput);
    if (filePath !== null) {
      let ideDiffEligibility = LVa(ctx.tool, effectiveInput, ctx.toolUseContext),
        startTimeMs = Date.now(),
        racers;
      Fpt(request, handles, {
        dialog: B0e,
        buildDescriptor: ({
          input: input,
          permissionResult: permissionResult
        }) => {
          let resolvedFilePath = a3t(ctx.tool, input) ?? filePath,
            descriptor = t9n({
              tool: ctx.tool,
              input: input,
              description: description,
              toolUseID: ctx.toolUseID,
              permissionResult: permissionResult,
              assistantMessage: ctx.assistantMessage,
              theme: "dark",
              requestSource: requestSource,
              filePath: resolvedFilePath
            });
          if (ideDiffEligibility !== null && racers?.isReprompted() !== !0) return {
            ...descriptor,
            showingDiffInIDE: !0,
            ideName: ideDiffEligibility.ideName
          };
          return descriptor;
        },
        unaryEvent: b2a(ctx.tool, effectiveInput, filePath),
        onRacersReady: readyRacers => {
          if (racers = readyRacers, ideDiffEligibility === null) return;
          let {
            closeTab: closeTab
          } = MVa({
            ctx: ctx,
            tool: ctx.tool,
            input: effectiveInput,
            permissionResult: result,
            permissionPromptStartTimeMs: startTimeMs,
            eligibility: ideDiffEligibility,
            claim: handles.claim,
            notifyBridge: readyRacers.notifyBridge,
            dismissAndTeardown: readyRacers.dismissAndTeardown,
            resolveOnce: handles.resolve
          });
          readyRacers.addTeardown(closeTab);
        }
      });
      return;
    }
    Fpt(request, handles, {
      dialog: rxe,
      buildDescriptor: ({
        input: input,
        permissionResult: permissionResult
      }) => WD({
        tool: ctx.tool,
        input: input,
        description: description,
        toolUseID: ctx.toolUseID,
        permissionResult: permissionResult,
        assistantMessage: ctx.assistantMessage,
        theme: "dark",
        requestSource: requestSource
      })
    });
    return;
  }
  if (ctx.tool === sl) {
    let effectiveInput = result.updatedInput ?? ctx.input,
      command = typeof effectiveInput.command === "string" ? effectiveInput.command : "",
      sedInfo = Zqe(command);
    if (sedInfo !== null) {
      Fpt(request, handles, {
        dialog: B0e,
        buildDescriptor: ({
          input: input,
          permissionResult: permissionResult
        }) => {
          let inputCommand = typeof input.command === "string" ? input.command : "",
            resolvedSedInfo = Zqe(inputCommand) ?? sedInfo;
          return E2a({
            tool: ctx.tool,
            input: input,
            description: description,
            toolUseID: ctx.toolUseID,
            permissionResult: permissionResult,
            assistantMessage: ctx.assistantMessage,
            theme: "dark",
            requestSource: requestSource,
            sedInfo: resolvedSedInfo
          });
        },
        unaryEvent: C2a(sedInfo.filePath)
      });
      return;
    }
    let toolPermissionContext = Mr(ctx.toolUseContext);
    Fpt(request, handles, {
      dialog: zqe,
      buildDescriptor: ({
        input: input,
        permissionResult: permissionResult
      }) => Z$n({
        tool: ctx.tool,
        input: input,
        description: description,
        toolUseID: ctx.toolUseID,
        permissionResult: permissionResult,
        assistantMessage: ctx.assistantMessage,
        theme: "dark",
        requestSource: requestSource,
        classifierState: "none",
        toolPermissionContext: toolPermissionContext
      })
    });
    return;
  }
  Fpt(request, handles, {
    dialog: rxe,
    buildDescriptor: ({
      input: input,
      permissionResult: permissionResult
    }) => WD({
      tool: ctx.tool,
      input: input,
      description: description,
      toolUseID: ctx.toolUseID,
      permissionResult: permissionResult,
      assistantMessage: ctx.assistantMessage,
      theme: "dark",
      requestSource: requestSource
    })
  });
}
/**
 * Run a single permission dialog spec: shows the dialog, watches config for
 * auto-allow, handles reprompts, and resolves allow/deny/cancelled answers.
 */
function Fpt(request, handles, spec) {
  let {
      ctx: ctx,
      description: description,
      result: result,
      awaitAutomatedChecksBeforeDialog: awaitAutomatedChecksBeforeDialog,
      bridgeCallbacks: bridgeCallbacks,
      channelCallbacks: channelCallbacks
    } = request,
    {
      resolve: resolve,
      isResolved: isResolved,
      claim: claim
    } = handles,
    requestDialog = ctx.toolUseContext.requestDialog;
  if (requestDialog === void 0) return;
  let openDialog = requestDialog,
    agentContext = ctx.toolUseContext.agentContext,
    queueBehind = agentContext.agentType === "teammate" || NAe(agentContext) && agentContext.isAsync === !0,
    startTimeMs = Date.now(),
    displayInput = result.updatedInput ?? ctx.input,
    decisionReason = result.decisionReason,
    currentResult = result,
    promptGeneration = 0,
    currentDialogAbort,
    teardowns = [];
  function runTeardowns() {
    if (teardowns.length === 0) return;
    let pending = teardowns.splice(0, teardowns.length);
    for (let teardown of pending) try {
      teardown();
    } catch (err) {
      A(`Dialog teardown failed: ${Ce(err)}`, {
        level: "error"
      });
    }
  }
  let shownPromptLogged = !1,
    completionEvent = spec.unaryEvent ?? {
      completion_type: "tool_use_single",
      language_name: "none"
    },
    abortSignal = ctx.toolUseContext.abortController.signal;
  function logPermissionRequestShown() {
    if (shownPromptLogged) return;
    shownPromptLogged = !0;
    let permissionMode = ctx.permissionMode;
    ctx.toolUseContext.applyAttributionOp({
      kind: "incrementPermissionPrompt"
    }), W("tengu_tool_use_show_permission_request", {
      messageID: xr(ctx.messageId),
      toolName: Pi(ctx.tool.name),
      isMcp: ctx.tool.isMcp ?? !1,
      decisionReasonType: Bo(currentResult.decisionReason?.type),
      sandboxEnabled: xo.isSandboxingEnabled(),
      permissionMode: Le(permissionMode),
      requestSource: Bo(sdo(ctx.toolUseContext)?.type)
    }), Pho({
      completion_type: completionEvent.completion_type,
      event: "response",
      metadata: {
        language_name: completionEvent.language_name,
        message_id: ctx.assistantMessage.message.id,
        platform: Ne.platform
      }
    });
  }
  function logCompletionLifecycle(event) {
    Pho({
      completion_type: completionEvent.completion_type,
      event: event,
      metadata: {
        language_name: completionEvent.language_name,
        message_id: ctx.assistantMessage.message.id,
        platform: Ne.platform
      }
    });
  }
  function dismissAndTeardown() {
    currentDialogAbort?.abort(), LY.emit(null), unsubscribeConfigWatcher(), runTeardowns();
  }
  let {
      notifyBridgeAndTeardown: notifyBridge
    } = lKa({
      ctx: ctx,
      description: description,
      result: result,
      displayInput: displayInput,
      permissionPromptStartTimeMs: startTimeMs,
      awaitAutomatedChecksBeforeDialog: awaitAutomatedChecksBeforeDialog,
      bridgeCallbacks: bridgeCallbacks,
      channelCallbacks: channelCallbacks,
      claim: claim,
      isResolved: isResolved,
      onWin(winningResult) {
        dismissAndTeardown(), resolve(winningResult);
      },
      onReprompt(newInput, newDecisionReason, newResult) {
        displayInput = newInput, decisionReason = newDecisionReason, currentResult = newResult, currentDialogAbort?.abort(), runTeardowns(), openPrompt();
      }
    }),
    unsubscribeConfigWatcher = sve.subscribe(() => {
      if (isResolved()) return;
      lx(ctx.tool, ctx.input, ctx.toolUseContext, ctx.assistantMessage, ctx.toolUseID).then(checkResult => {
        if (checkResult.behavior !== "allow") return;
        if (!claim()) return;
        unsubscribeConfigWatcher(), notifyBridge(), currentDialogAbort?.abort(), LY.emit(null), runTeardowns(), ctx.logDecision({
          decision: "accept",
          source: "config"
        }), resolve(ctx.buildAllow(checkResult.updatedInput ?? ctx.input, {
          decisionReason: checkResult.decisionReason
        }));
      }).catch(err => {
        if (!R_(err)) Ie(err);
      });
    });
  function openPrompt() {
    let generation = ++promptGeneration,
      dialogAbort = new AbortController();
    currentDialogAbort = dialogAbort;
    let onAbort = () => dialogAbort.abort();
    abortSignal.addEventListener("abort", onAbort, {
      once: !0
    });
    let descriptor = spec.buildDescriptor({
      input: displayInput,
      permissionResult: currentResult
    });
    logPermissionRequestShown(), LY.emit(XVa({
      tool: ctx.tool,
      input: displayInput
    })), openDialog(spec.dialog, descriptor, {
      signal: dialogAbort.signal,
      queueBehind: queueBehind
    }).then(answer => {
      if (abortSignal.removeEventListener("abort", onAbort), generation !== promptGeneration) return;
      if (!claim()) return;
      handleDialogAnswer(answer);
    });
  }
  function handleDialogAnswer(answer) {
    switch (LY.emit(null), unsubscribeConfigWatcher(), runTeardowns(), answer.behavior) {
      case "allow":
        {
          notifyBridge({
            behavior: "allow",
            updatedInput: answer.updatedInput,
            updatedPermissions: answer.permissionUpdates ?? []
          }), logCompletionLifecycle("accept"), resolve(ctx.handleUserAllow(answer.updatedInput, answer.permissionUpdates ?? [], answer.feedback, startTimeMs, answer.contentBlocks, decisionReason));
          return;
        }
      case "deny":
        {
          notifyBridge({
            behavior: "deny",
            message: answer.feedback ?? "User denied permission"
          }), logCompletionLifecycle("reject"), ctx.logDecision({
            decision: "reject",
            source: {
              type: "user_reject",
              hasFeedback: !!answer.feedback
            }
          }, {
            permissionPromptStartTimeMs: startTimeMs,
            input: displayInput
          }), resolve(ctx.cancelAndAbort(answer.feedback, void 0, answer.contentBlocks));
          return;
        }
      case "cancelled":
        {
          if (notifyBridge({
            behavior: "deny",
            message: "User aborted"
          }), logCompletionLifecycle("reject"), ctx.logCancelled(), ctx.logDecision({
            decision: "reject",
            source: {
              type: "user_abort"
            }
          }, {
            permissionPromptStartTimeMs: startTimeMs,
            input: displayInput
          }), queueBehind) {
            resolve({
              behavior: "ask",
              message: MY
            });
            return;
          }
          resolve(ctx.cancelAndAbort(void 0, !0));
          return;
        }
    }
  }
  spec.onRacersReady?.({
    dismissAndTeardown: dismissAndTeardown,
    notifyBridge: notifyBridge,
    isReprompted: () => promptGeneration > 1,
    addTeardown: teardown => {
      teardowns.push(teardown);
    }
  }), openPrompt();
}
var $7a = null,
  q7a = null,
  u6n,
  W7a,
  G7a,
  vBp,
  wBp;
var p6n = b(() => {
  kt();
  vu();
  qe();
  Ct();
  vn();
  C$n();
  A$n();
  muo();
  fuo();
  huo();
  R$n();
  ado();
  ldo();
  n9n();
  e9n();
  cdo();
  udo();
  ddo();
  o3t();
  UB();
  jO();
  Z9t();
  Tdo();
  i6e();
  Upt();
  jmo();
  $4t();
  Ph();
  bO();
  xl();
  Ir();
  Ct();
  po();
  ly();
  Uh();
  HVa();
  NVa();
  Y4t();
  Rpt();
  cKa();
  SDt();
  u6n = (_go(), oo(ggo)).WorkflowTool, W7a = (Tgo(), oo(ygo)).workflowPermissionDialog, G7a = (bgo(), oo(Sgo)), vBp = (Ago(), oo(Cgo)).MonitorTool;
  wBp = [xce({
    matches: tool => tool === BB,
    dialog: d3t,
    build: u2a
  }), xce({
    matches: tool => G2e() && tool.name.startsWith(Bie),
    dialog: G9t,
    build: c2a
  }), xce({
    matches: tool => tool === tdt,
    dialog: Kqe,
    build: d2a
  }), xce({
    matches: tool => tool === u9n,
    dialog: V9t,
    build: WD
  }), xce({
    matches: tool => tool === KD,
    dialog: Lut,
    build: _2a
  }), xce({
    matches: tool => tool === opt,
    dialog: u3t,
    build: h2a
  }), ...[], xce({
    matches: tool => tool === vgo,
    dialog: c3t,
    build: g2a
  }), xce({
    matches: tool => tool === vBp,
    dialog: l3t,
    build: p2a
  }), ...($7a !== null && q7a !== null ? [xce({
    matches: tool => tool === $7a,
    dialog: q7a,
    build: f2a
  })] : []), ...(u6n !== null && W7a !== null ? [xce({
    matches: tool => tool === u6n,
    dialog: W7a,
    build: m2a
  })] : [])];
});

export {xce,Rgo,d6n,Fpt,$7a,q7a,u6n,W7a,G7a,vBp,wBp,p6n};
