// @ts-nocheck
import {Vlo as s7q,HP as Pk,a$n as rb6,l$n as ob6,L2a as NSK,O2a as ySK,M2a as VSK,q2a as ISK,U2a as CSK,$2a as bSK,N2a as vSK,F2a as SSK,B2a as ESK} from "../tools/4072_theme.ts";
import {y9n as zx6,jqa as uuK,T9n as $x6} from "../tools/4164_resolve.ts";
import {G$t as SI_,V$t as CI_,c$n as ab6,V2a as pSK,K2a as BSK,z2a as USK,zlo as e7q} from "../tui/4073_resolvedPath.ts";
import {wqa as WuK,Rqa as ZuK,xqa as GuK} from "../tools/4158_filePath.ts";
import {bIe as cGH,L2n as Lb6} from "../../vendor/m4043.ts";
import {NIe as ORH,u$n as sb6} from "../../vendor/m4073.ts";
import {Rl as y4,TU as wb} from "../tui/4359_isSearch.ts";
import {kqe as BpH,F$t as yI_} from "../../vendor/m4056.ts";
import {Fr as U8,Ql as I4} from "../../vendor/m4405.ts";
import {Rqe as mpH,O2n as Rb6} from "../../vendor/m4042.ts";
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {Se as ZH,h_ as YA,bt as R_} from "../../vendor/m195.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Br as a8} from "../../vendor/m1456.ts";
import {Qi as wK,$u as D3} from "../mcp/2194_mcpServerName.ts";
import {fromEnumOpt as f9,fromEnum as QH} from "../../vendor/m5.ts";
import {SandboxManager as nq,Ag as aY} from "../../vendor/m2671.ts";
import {Guo as r4q,Tqa as juK} from "../telemetry/4156_event.ts";
import {je as dH} from "../../vendor/m577.ts";
import {XY as Vo,Rut as R1_} from "../../vendor/m4162.ts";
import {e6a as nuK,t6a as iuK} from "../../vendor/m4167.ts";
import {Xse as D7H,yQe as leH} from "../../vendor/m2218.ts";
import {hasPermissionsToUseTool as IZ,ay as oA} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {De as SH,Rn as y6} from "../session/0615_length.ts";
import {b as L,ro as g8} from "../../runtime.ts";
import {d$n as tb6,Iqe as FpH} from "../../vendor/m4074.ts";
import {Ylo as HKq,K$t as bI_} from "../../vendor/m4075.ts";
import {Jlo as _Kq,z$t as II_} from "../../vendor/m4076.ts";
import {Xlo as qKq,sut as H1_} from "../../vendor/m4077.ts";
import {Qlo as KKq,Y$t as xI_} from "../../vendor/m4078.ts";
import {Zlo as OKq,J$t as uI_} from "../../vendor/m4079.ts";
import {eco as TKq,X$t as mI_} from "../../vendor/m4080.ts";
import {tco as zKq,Q$t as pI_} from "../../vendor/m4081.ts";
import {j$t as EI_,out as e4_} from "../tui/4071_answers.ts";
import {HL as XN} from "../tools/4363_stripAllEnvVars.ts";
import {nco as $Kq,p$n as eb6} from "../tools/4085_message.ts";
import {Z$t as BI_,I9 as Yu} from "../tools/4089_tool.ts";
import {qut as B1_,PowerShellTool as p1q} from "../tui/4327_detectBlockedSleepPattern.ts";
import {ico as AKq,aut as q1_} from "../tools/4093_sanitizedName.ts";
import {w9t as Ax_,yU as Yb} from "../tools/4155_url.ts";
import {oL as cy,isInProductPermissionsEnabled as eCH,CFC_TOOL_PREFIX as J7H} from "../mcp/2581_trackClaudeInChromeTabId.ts";
import {Lr as l8} from "../../vendor/m578.ts";
import {vdo as V1q,Cdo as N1q} from "../tools/4193_WorkflowTool.ts";
import {Rdo as E1q,wdo as v1q} from "../../vendor/m4193.ts";
import {kdo as C1q,xdo as S1q} from "../agent/4195_workflowNeedsUsageConsentPrompt.ts";
import {Ddo as x1q,Ido as I1q} from "../tools/4199_applyCcrTimeoutCap.ts";
// @ts-nocheck
function identityDialogProvider(provider) {
  return provider;
}
function findDialogProvider(tool) {
  return jfO.find(provider => provider.matches(tool));
}
function requestPermissionInteractive(request, resolve) {
  let {
      ctx: ctx,
      description: description,
      result: result,
      awaitAutomatedChecksBeforeDialog: awaitAutomatedChecksBeforeDialog
    } = request,
    requestSource = s7q(ctx.toolUseContext),
    onResolve = OC6 !== null && TvK !== null && ctx.tool === OC6 ? result => {
      if (result.behavior === "allow") TvK.recordWorkflowUsageConsent();
      resolve(result);
    } : resolve,
    {
      resolve: gateResolve,
      isResolved: isResolved,
      claim: claim
    } = zx6(onResolve),
    handles = {
      resolve: gateResolve,
      isResolved: isResolved,
      claim: claim
    },
    provider = findDialogProvider(ctx.tool);
  if (provider !== undefined) {
    runPermissionDialog(request, handles, {
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
  if (SI_(ctx.tool)) {
    let effectiveInput = result.updatedInput ?? ctx.input,
      filePath = CI_(ctx.tool, effectiveInput);
    if (filePath !== null) {
      let ideDiffEligibility = WuK(ctx.tool, effectiveInput, ctx.toolUseContext),
        startTimeMs = Date.now(),
        racers;
      runPermissionDialog(request, handles, {
        dialog: cGH,
        buildDescriptor: ({
          input: input,
          permissionResult: permissionResult
        }) => {
          let resolvedFilePath = CI_(ctx.tool, input) ?? filePath,
            descriptor = ab6({
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
          if (ideDiffEligibility !== null && racers?.isReprompted() !== true) return {
            ...descriptor,
            showingDiffInIDE: true,
            ideName: ideDiffEligibility.ideName
          };
          return descriptor;
        },
        unaryEvent: pSK(ctx.tool, effectiveInput, filePath),
        onRacersReady: readyRacers => {
          if (racers = readyRacers, ideDiffEligibility === null) return;
          let {
            closeTab: closeTab
          } = ZuK({
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
    runPermissionDialog(request, handles, {
      dialog: ORH,
      buildDescriptor: ({
        input: input,
        permissionResult: permissionResult
      }) => Pk({
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
  if (ctx.tool === y4) {
    let effectiveInput = result.updatedInput ?? ctx.input,
      command = typeof effectiveInput.command === "string" ? effectiveInput.command : "",
      sedInfo = BpH(command);
    if (sedInfo !== null) {
      runPermissionDialog(request, handles, {
        dialog: cGH,
        buildDescriptor: ({
          input: input,
          permissionResult: permissionResult
        }) => {
          let inputCommand = typeof input.command === "string" ? input.command : "",
            resolvedSedInfo = BpH(inputCommand) ?? sedInfo;
          return BSK({
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
        unaryEvent: USK(sedInfo.filePath)
      });
      return;
    }
    let toolPermissionContext = U8(ctx.toolUseContext);
    runPermissionDialog(request, handles, {
      dialog: mpH,
      buildDescriptor: ({
        input: input,
        permissionResult: permissionResult
      }) => rb6({
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
  runPermissionDialog(request, handles, {
    dialog: ORH,
    buildDescriptor: ({
      input: input,
      permissionResult: permissionResult
    }) => Pk({
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
function runPermissionDialog(request, handles, spec) {
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
  if (requestDialog === undefined) return;
  let openDialog = requestDialog,
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
      y(`Dialog teardown failed: ${ZH(err)}`, {
        level: "error"
      });
    }
  }
  let shownPromptLogged = false,
    completionEvent = spec.unaryEvent ?? {
      completion_type: "tool_use_single",
      language_name: "none"
    },
    abortSignal = ctx.toolUseContext.abortController.signal;
  function logPermissionRequestShown() {
    if (shownPromptLogged) return;
    shownPromptLogged = true;
    let permissionMode = ctx.permissionMode;
    ctx.toolUseContext.applyAttributionOp({
      kind: "incrementPermissionPrompt"
    }), c("tengu_tool_use_show_permission_request", {
      messageID: a8(ctx.messageId),
      toolName: wK(ctx.tool.name),
      isMcp: ctx.tool.isMcp ?? false,
      decisionReasonType: f9(currentResult.decisionReason?.type),
      sandboxEnabled: nq.isSandboxingEnabled(),
      permissionMode: QH(permissionMode),
      requestSource: f9(s7q(ctx.toolUseContext)?.type)
    }), r4q({
      completion_type: completionEvent.completion_type,
      event: "response",
      metadata: {
        language_name: completionEvent.language_name,
        message_id: ctx.assistantMessage.message.id,
        platform: dH.platform
      }
    });
  }
  function logCompletionLifecycle(event) {
    r4q({
      completion_type: completionEvent.completion_type,
      event: event,
      metadata: {
        language_name: completionEvent.language_name,
        message_id: ctx.assistantMessage.message.id,
        platform: dH.platform
      }
    });
  }
  function dismissAndTeardown() {
    currentDialogAbort?.abort(), Vo.emit(null), unsubscribeConfigWatcher(), runTeardowns();
  }
  let {
      notifyBridgeAndTeardown: notifyBridge
    } = nuK({
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
    unsubscribeConfigWatcher = D7H.subscribe(() => {
      if (isResolved()) return;
      IZ(ctx.tool, ctx.input, ctx.toolUseContext, ctx.assistantMessage, ctx.toolUseID).then(checkResult => {
        if (checkResult.behavior !== "allow") return;
        if (!claim()) return;
        unsubscribeConfigWatcher(), notifyBridge(), currentDialogAbort?.abort(), Vo.emit(null), runTeardowns(), ctx.logDecision({
          decision: "accept",
          source: "config"
        }), resolve(ctx.buildAllow(checkResult.updatedInput ?? ctx.input, {
          decisionReason: checkResult.decisionReason
        }));
      }).catch(err => {
        if (!YA(err)) SH(err);
      });
    });
  function openPrompt() {
    let generation = ++promptGeneration,
      dialogAbort = new AbortController();
    currentDialogAbort = dialogAbort;
    let onAbort = () => dialogAbort.abort();
    abortSignal.addEventListener("abort", onAbort, {
      once: true
    });
    let descriptor = spec.buildDescriptor({
      input: displayInput,
      permissionResult: currentResult
    });
    logPermissionRequestShown(), Vo.emit(uuK({
      tool: ctx.tool,
      input: displayInput
    })), openDialog(spec.dialog, descriptor, {
      signal: dialogAbort.signal
    }).then(answer => {
      if (abortSignal.removeEventListener("abort", onAbort), generation !== promptGeneration) return;
      if (!claim()) return;
      handleDialogAnswer(answer);
    });
  }
  function handleDialogAnswer(answer) {
    switch (Vo.emit(null), unsubscribeConfigWatcher(), runTeardowns(), answer.behavior) {
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
          }), resolve(ctx.cancelAndAbort(answer.feedback, undefined, answer.contentBlocks));
          return;
        }
      case "cancelled":
        {
          notifyBridge({
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
          }), resolve(ctx.cancelAndAbort(undefined, true));
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
var qvK = null,
  KvK = null,
  OC6,
  OvK,
  TvK,
  ffO,
  jfO;
var oqq = L(() => {
  v_();
  D3();
  UH();
  R_();
  y6();
  tb6();
  Rb6();
  HKq();
  _Kq();
  qKq();
  Lb6();
  e7q();
  KKq();
  sb6();
  ob6();
  OKq();
  TKq();
  zKq();
  EI_();
  wb();
  XN();
  yI_();
  $Kq();
  BI_();
  B1_();
  AKq();
  Ax_();
  cy();
  I4();
  l8();
  R_();
  oA();
  aY();
  juK();
  GuK();
  $x6();
  R1_();
  iuK();
  leH();
  OC6 = (V1q(), g8(N1q)).WorkflowTool, OvK = (E1q(), g8(v1q)).workflowPermissionDialog, TvK = (C1q(), g8(S1q)), ffO = (x1q(), g8(I1q)).MonitorTool;
  jfO = [identityDialogProvider({
    matches: tool => tool === Yb,
    dialog: pI_,
    build: NSK
  }), identityDialogProvider({
    matches: tool => eCH() && tool.name.startsWith(J7H),
    dialog: bI_,
    build: ySK
  }), identityDialogProvider({
    matches: tool => tool === e4_,
    dialog: FpH,
    build: VSK
  }), identityDialogProvider({
    matches: tool => tool === eb6,
    dialog: II_,
    build: Pk
  }), identityDialogProvider({
    matches: tool => tool === Yu,
    dialog: H1_,
    build: ISK
  }), identityDialogProvider({
    matches: tool => tool === q1_,
    dialog: mI_,
    build: CSK
  }), ...[], identityDialogProvider({
    matches: tool => tool === p1q,
    dialog: uI_,
    build: bSK
  }), identityDialogProvider({
    matches: tool => tool === ffO,
    dialog: xI_,
    build: vSK
  }), ...(qvK !== null && KvK !== null ? [identityDialogProvider({
    matches: tool => tool === qvK,
    dialog: KvK,
    build: SSK
  })] : []), ...(OC6 !== null && OvK !== null ? [identityDialogProvider({
    matches: tool => tool === OC6,
    dialog: OvK,
    build: ESK
  })] : [])];
});

export {identityDialogProvider as Nce,findDialogProvider as Pdo,requestPermissionInteractive as Pja,runPermissionDialog as Uut,qvK as kja,KvK as Hja,OC6 as a3n,OvK as Ija,TvK as Dja,ffO as iDp,jfO as aDp,oqq as Odo};
