// @ts-nocheck
import {xO as _O,eC as JE} from "../../vendor/m717.ts";
import {uxe as VRe,x$i as T2i,MRn as Xwn} from "../../vendor/m2776.ts";
import {isSessionPersistenceDisabled as i3,getSessionId as kt,getSdkBetas as NT,setNeedsAutoModeExitAttachment as a2,setHasExitedPlanMode as gV,setNeedsPlanModeExitAttachment as Tre,mainAgentId as ws,lt as ct} from "../session/0131_sent.ts";
import {getCurrentSessionTitle as fh,saveAiGeneratedTitle as Kte,saveAgentName as T6e,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {Bmt as fmt,jWn as nWn} from "../permissions/4767_once.ts";
import {Ln,lo} from "../tools/5190_userPromptCount.ts";
import {qf as Vf,ry} from "../agent/2772_withFileTypes.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {getRuntimeMainLoopModel as a0,getMainLoopModel as Ns,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {nE as Zb,JAn as lAn,jS as eE} from "../api/2023_used.ts";
import {isAutoModeGateEnabled as gx,restoreDangerousPermissions as wye,stripDangerousPermissionsForAutoMode as Q6,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {mt as ft,bo as vo,Mc as hc,configProtoStore as fo} from "../../vendor/m2458.ts";
import {Ui as ji,Ld as np} from "../../vendor/m2459.ts";
import {kE as CE,jL as OL} from "../../vendor/m3944.ts";
import {xue as Aue,Zjt as vjt} from "../telemetry/4836_Zjt.ts";
import {isPolicyAllowed as ii,rd as sd} from "../../vendor/m2205.ts";
import {GPo as LDo,AJn as EYn} from "../../vendor/m5332.ts";
import {useTimeout as Nd} from "../../vendor/m2450.ts";
import {vAt as hAt,wAt as gAt,RAt as _At} from "../../vendor/m5257.ts";
import {Tet as tet,xEn as Gbn,My as Oy,pE as cE} from "../../vendor/m2548.ts";
import {measureElement as PK} from "../../vendor/m2451.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {Q6 as U6,TDe as nDe} from "../../vendor/m4603.ts";
import {Ok as Hk,ab as ob} from "../config/3178_path.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Qe,fromEnum as Ue} from "../../vendor/m5.ts";
import {e8t as wjt,t8e as Lje} from "../permissions/4840_plan.ts";
import {wAe as aAe,uS as rS} from "../config/2594_event_name.ts";
import {isAgentSwarmsEnabled as yl,cb as ib} from "../config/3298_isAgentSwarmsEnabled.ts";
import {Cs as vs,Ph as rg} from "../../vendor/m2224.ts";
import {ZO as qO,V4 as P4} from "../telemetry/2512_error_name.ts";
import {initCg as sg,j1 as O1} from "../telemetry/2531_ignore1mTag.ts";
import {RG as uG,iM as XL,q9 as R9} from "../../vendor/m4604.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {pr as Ar} from "../../vendor/m2562.ts";
import {Tm as Rm,Fk as Lk} from "../../vendor/m3341.ts";
import {b9 as a9,lqe as U4e} from "../../vendor/m3975.ts";
import {l_ as d_,dU as nU} from "../../vendor/m3932.ts";
import {QU as qU,oTe as qye} from "../../vendor/m5411.ts";
import {Y6 as N6,X0e as P0e} from "../../vendor/m4460.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {Id as Md,mc} from "../config/0645_maxBytes.ts";
import {Bs as Os,rA as lA} from "../../vendor/m2550.ts";
import {_m as wm,sA as uA} from "../../vendor/m2782.ts";
import {b,M as L,ro as Pr} from "../../runtime.ts";
import {yb as hb} from "../../vendor/m4521.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {Gte as Lte,xce as Ace} from "../../vendor/m4087.ts";
// @ts-nocheck
function iLq(permissionMode, allowedPrompts) {
  let updates = [{
    type: "setMode",
    mode: _O(permissionMode),
    destination: "session"
  }];
  if (VRe() && allowedPrompts && allowedPrompts.length > 0) updates.push({
    type: "addRules",
    rules: allowedPrompts.map(rule => ({
      toolName: rule.tool,
      ruleContent: T2i(rule.prompt)
    })),
    behavior: "allow",
    destination: "session"
  });
  return updates;
}
function v0T(planText, setAppState, forceOverwrite) {
  if (i3()) return;
  if (!forceOverwrite && fh(kt())) return;
  fmt([Ln({
    content: planText.slice(0, 1000)
  })], new AbortController().signal).then(async generatedTitle => {
    if (!generatedTitle || fh(kt())) return;
    let sessionId = kt(),
      transcriptPath = Vf();
    Kte(sessionId, generatedTitle), await T6e(sessionId, generatedTitle, transcriptPath, "auto"), setAppState(state => {
      if (state.standaloneAgentContext?.name === generatedTitle) return state;
      return {
        ...state,
        standaloneAgentContext: {
          ...state.standaloneAgentContext,
          name: generatedTitle
        }
      };
    });
  }).catch(Ie);
}
function E0T({
  showClearContext: showClearContext,
  showUltraplan: showUltraplan,
  usedPercent: usedPercent,
  isAutoModeAvailable: isAutoModeAvailable,
  isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
  onFeedbackChange: onFeedbackChange
}) {
  let options = [],
    contextSuffix = usedPercent !== null ? ` (${usedPercent}% used)` : "";
  if (showClearContext) if (isBypassPermissionsModeAvailable) options.push({
    label: `Yes, clear context${contextSuffix} and bypass permissions`,
    value: "yes-bypass-permissions"
  });else if (isAutoModeAvailable) options.push({
    label: `Yes, clear context${contextSuffix} and use auto mode`,
    value: "yes-auto-clear-context"
  });else options.push({
    label: `Yes, clear context${contextSuffix} and auto-accept edits`,
    value: "yes-accept-edits"
  });
  if (isBypassPermissionsModeAvailable) options.push({
    label: "Yes, and bypass permissions",
    value: "yes-accept-edits-keep-context"
  });else if (isAutoModeAvailable) options.push({
    label: "Yes, and use auto mode",
    value: "yes-resume-auto-mode"
  });else options.push({
    label: "Yes, auto-accept edits",
    value: "yes-accept-edits-keep-context"
  });
  if (options.push({
    label: "Yes, manually approve edits",
    value: "yes-default-keep-context"
  }), showUltraplan) options.push({
    label: "No, refine with Ultraplan on Claude Code on the web",
    value: "ultraplan"
  });
  return options.push({
    type: "input",
    label: "No, keep planning",
    value: "no",
    placeholder: "Tell Claude what to change",
    description: "shift+tab to approve with this feedback",
    onChange: onFeedbackChange
  }), options;
}
function S0T(usage, permissionMode) {
  if (!usage) return null;
  let model = a0({
      permissionMode: permissionMode,
      mainLoopModel: Ns(),
      exceeds200kTokens: false
    }),
    betas = Zb(model, NT()),
    {
      used: usedPercent
    } = lAn({
      input_tokens: usage.input_tokens,
      cache_creation_input_tokens: usage.cache_creation_input_tokens ?? 0,
      cache_read_input_tokens: usage.cache_read_input_tokens ?? 0
    }, betas);
  return usedPercent;
}
function Zo6(selectedOption, planContext) {
  let {
      currentPlan: currentPlan,
      planEditedLocally: planEditedLocally,
      allowedPrompts: allowedPrompts,
      acceptFeedback: acceptFeedback,
      isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
      trimmedFeedback: trimmedFeedback,
      hasImages: hasImages,
      imageBlocks: imageBlocks,
      showClearContext: showClearContext
    } = planContext,
    updatedPlanInput = planEditedLocally ? {
      plan: currentPlan
    } : {};
  if (selectedOption === "ultraplan") return {
    behavior: "deny",
    feedback: y0T
  };
  if (showClearContext && (selectedOption === "yes-bypass-permissions" || selectedOption === "yes-accept-edits" || selectedOption === "yes-auto-clear-context")) return {
    behavior: "deny"
  };
  if (selectedOption === "yes-resume-auto-mode" && gx()) return {
    behavior: "allow",
    updatedInput: updatedPlanInput,
    permissionUpdates: [],
    feedback: acceptFeedback
  };
  let newPermMode = selectedOption === "yes-accept-edits-keep-context" ? isBypassPermissionsModeAvailable ? "bypassPermissions" : "acceptEdits" : selectedOption === "yes-default-keep-context" ? "default" : selectedOption === "yes-resume-auto-mode" ? "default" : undefined;
  if (newPermMode !== undefined) return {
    behavior: "allow",
    updatedInput: updatedPlanInput,
    permissionUpdates: iLq(newPermMode, allowedPrompts),
    feedback: acceptFeedback
  };
  if (selectedOption === "no") {
    if (!trimmedFeedback && !hasImages) return null;
    return {
      behavior: "deny",
      feedback: trimmedFeedback || (hasImages ? "(See attached image)" : undefined),
      contentBlocks: imageBlocks && imageBlocks.length > 0 ? imageBlocks : undefined
    };
  }
  return null;
}
function DU4(props) {
  let reactCompilerCache = JU4.c(108),
    {
      payload: payload,
      answer: answer
    } = props,
    toolPermContext = ft(F0T),
    setAppState = vo(),
    getAppState = hc(),
    {
      addNotification: addNotification
    } = ji(),
    [feedbackInput, setFeedbackInput] = pd.useState(""),
    emptyObj;
  if (reactCompilerCache[0] === Symbol.for("react.memo_cache_sentinel")) emptyObj = {}, reactCompilerCache[0] = emptyObj;else emptyObj = reactCompilerCache[0];
  let [pastedImages, setPastedImages] = pd.useState(emptyObj),
    pasteIdRef = pd.useRef(0),
    isEveryIntervalMode = ft(normalizeEveryIntervalMatch) ?? false,
    isUltraplanLaunching = ft(B0T),
    ultraplanSessionUrl = ft(p0T),
    isRemoteSessionsAllowed = CE(),
    scrollRef;
  if (reactCompilerCache[1] !== ultraplanSessionUrl || reactCompilerCache[2] !== isUltraplanLaunching) scrollRef = Aue() && ii("allow_remote_sessions") && !isUltraplanLaunching && !ultraplanSessionUrl, reactCompilerCache[1] = ultraplanSessionUrl, reactCompilerCache[2] = isUltraplanLaunching, reactCompilerCache[3] = scrollRef;else scrollRef = reactCompilerCache[3];
  let showUltraplan = scrollRef,
    {
      mode: permMode,
      isAutoModeAvailable: isAutoModeAvailable,
      isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable
    } = toolPermContext,
    {
      plan: planContent,
      planFilePath: planFilePath,
      allowedPrompts: allowedPrompts,
      usage: usageData
    } = payload,
    getPlanInitial;
  if (reactCompilerCache[4] !== planContent) getPlanInitial = () => planContent && planContent.length > 0 ? planContent : "No plan found. Please write your plan to the plan file first.", reactCompilerCache[4] = planContent, reactCompilerCache[5] = getPlanInitial;else getPlanInitial = reactCompilerCache[5];
  let [planText, setPlanText] = pd.useState(getPlanInitial),
    isPlanEmpty = !planContent || planContent.trim() === "",
    exitOptions;
  if (reactCompilerCache[6] !== isAutoModeAvailable || reactCompilerCache[7] !== isBypassPermissionsModeAvailable || reactCompilerCache[8] !== permMode || reactCompilerCache[9] !== isEveryIntervalMode || reactCompilerCache[10] !== showUltraplan || reactCompilerCache[11] !== usageData) {
    let autoAvailableFiltered;
    if (reactCompilerCache[13] !== isAutoModeAvailable) autoAvailableFiltered = isAutoModeAvailable && !LDo(), reactCompilerCache[13] = isAutoModeAvailable, reactCompilerCache[14] = autoAvailableFiltered;else autoAvailableFiltered = reactCompilerCache[14];
    exitOptions = E0T({
      showClearContext: isEveryIntervalMode,
      showUltraplan: showUltraplan,
      usedPercent: isEveryIntervalMode ? S0T(usageData, permMode) : null,
      isAutoModeAvailable: autoAvailableFiltered,
      isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
      onFeedbackChange: setFeedbackInput
    }), reactCompilerCache[6] = isAutoModeAvailable, reactCompilerCache[7] = isBypassPermissionsModeAvailable, reactCompilerCache[8] = permMode, reactCompilerCache[9] = isEveryIntervalMode, reactCompilerCache[10] = showUltraplan, reactCompilerCache[11] = usageData, reactCompilerCache[12] = exitOptions;
  } else exitOptions = reactCompilerCache[12];
  let renderedOptions = exitOptions,
    [editorSavedIndicator, setEditorSavedIndicator] = pd.useState(false),
    [planEditedLocally, setPlanEditedLocally] = pd.useState(false),
    clearEditorIndicator;
  if (reactCompilerCache[15] === Symbol.for("react.memo_cache_sentinel")) clearEditorIndicator = () => setEditorSavedIndicator(false), reactCompilerCache[15] = clearEditorIndicator;else clearEditorIndicator = reactCompilerCache[15];
  let savedIndicatorDeps;
  if (reactCompilerCache[16] !== editorSavedIndicator) savedIndicatorDeps = [editorSavedIndicator], reactCompilerCache[16] = editorSavedIndicator, reactCompilerCache[17] = savedIndicatorDeps;else savedIndicatorDeps = reactCompilerCache[17];
  Nd(clearEditorIndicator, editorSavedIndicator ? 5000 : null, savedIndicatorDeps);
  let onImagePaste;
  if (reactCompilerCache[18] !== setAppState) onImagePaste = function (data, mediaType, filename, dimensions, K_) {
    pasteIdRef.current = pasteIdRef.current + 1;
    let dH = pasteIdRef.current,
      x_ = {
        id: dH,
        type: "image",
        content: data,
        mediaType: mediaType || "image/png",
        filename: filename || "Pasted image",
        dimensions: dimensions
      };
    hAt(x_, setAppState), gAt(x_, setAppState), setPastedImages(h_ => ({
      ...h_,
      [dH]: x_
    }));
  }, reactCompilerCache[18] = setAppState, reactCompilerCache[19] = onImagePaste;else onImagePaste = reactCompilerCache[19];
  let onRemoveImage = onImagePaste,
    r_2;
  if (reactCompilerCache[20] === Symbol.for("react.memo_cache_sentinel")) r_2 = h6 => {
    setPastedImages(WH => {
      let NH = {
        ...WH
      };
      return delete NH[h6], NH;
    });
  }, reactCompilerCache[20] = r_2;else r_2 = reactCompilerCache[20];
  let e_2 = r_2,
    imageBlocks;
  if (reactCompilerCache[21] !== pastedImages) imageBlocks = Object.values(pastedImages).filter(m0T), reactCompilerCache[21] = pastedImages, reactCompilerCache[22] = imageBlocks;else imageBlocks = reactCompilerCache[22];
  let isScrollViewPortal = imageBlocks,
    nJScrollRef = isScrollViewPortal.length > 0,
    editorScrollRef = tet(),
    $H = Gbn(),
    updateEditorScrollHeight = pd.useRef(null),
    [jH, AH] = pd.useState(0),
    wH;
  if (reactCompilerCache[23] !== jH) wH = () => {
    let h6 = updateEditorScrollHeight.current ? PK(updateEditorScrollHeight.current).height : 0;
    if (h6 !== jH) AH(h6);
  }, reactCompilerCache[23] = jH, reactCompilerCache[24] = wH;else wH = reactCompilerCache[24];
  pd.useLayoutEffect(wH);
  let fH, TH;
  if (reactCompilerCache[25] !== $H || reactCompilerCache[26] !== jH) fH = () => {
    if (!$H) return;
    return $H(jH), () => $H(null);
  }, TH = [$H, jH], reactCompilerCache[25] = $H, reactCompilerCache[26] = jH, reactCompilerCache[27] = fH, reactCompilerCache[28] = TH;else fH = reactCompilerCache[27], TH = reactCompilerCache[28];
  pd.useLayoutEffect(fH, TH);
  let MH;
  if (reactCompilerCache[29] === Symbol.for("react.memo_cache_sentinel")) MH = {
    rows: 0,
    columns: 0
  }, reactCompilerCache[29] = MH;else MH = reactCompilerCache[29];
  let {
      rows: PH
    } = Oy(MH),
    scrollableRows = hr(),
    editorNameRef = $H !== null && editorScrollRef !== null,
    RH = editorNameRef ? Math.max(1, PH - jH) : Math.max(1, scrollableRows.rows - jH - 4),
    editorName;
  if (reactCompilerCache[30] === Symbol.for("react.memo_cache_sentinel")) {
    let h6 = U6();
    editorName = h6 ? Hk(h6) : null, reactCompilerCache[30] = editorName;
  } else editorName = reactCompilerCache[30];
  let kH = editorName,
    onCancelHandler;
  if (reactCompilerCache[31] !== allowedPrompts || reactCompilerCache[32] !== answer || reactCompilerCache[33] !== planText || reactCompilerCache[34] !== nJScrollRef || reactCompilerCache[35] !== isScrollViewPortal || reactCompilerCache[36] !== isBypassPermissionsModeAvailable || reactCompilerCache[37] !== isRemoteSessionsAllowed || reactCompilerCache[38] !== planEditedLocally || reactCompilerCache[39] !== feedbackInput || reactCompilerCache[40] !== setAppState || reactCompilerCache[41] !== isEveryIntervalMode || reactCompilerCache[42] !== getAppState) onCancelHandler = async function (WH) {
    let NH = feedbackInput.trim(),
      EH = NH || undefined;
    if (WH === "ultraplan") {
      j("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Qe("ultraplan")
      }), answer(Zo6(WH, {
        currentPlan: planText,
        planEditedLocally: planEditedLocally,
        allowedPrompts: allowedPrompts,
        acceptFeedback: EH,
        isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
        trimmedFeedback: NH,
        hasImages: nJScrollRef,
        imageBlocks: undefined,
        showClearContext: isEveryIntervalMode
      }));
      let h_ = u0T;
      wjt({
        arg: "",
        source: "exit_plan_mode",
        seedPlan: planText,
        getAppState: getAppState.getState,
        setAppState: getAppState.setState,
        signal: new AbortController().signal,
        onStatusMessage: h_
      }).then(h_).catch(Ie);
      return;
    }
    let K_ = WH === "yes-accept-edits-keep-context" || WH === "yes-default-keep-context" || WH === "yes-resume-auto-mode";
    {
      let h_ = (WH === "yes-resume-auto-mode" || WH === "yes-auto-clear-context") && gx(),
        s_ = gz_?.isAutoModeActive() ?? false;
      if (WH !== "no" && !h_ && s_) gz_?.setAutoModeActive(false), a2(true), setAppState(x0T);
    }
    if (WH !== "no") v0T(planText, setAppState, !K_);
    if (isEveryIntervalMode && (WH === "yes-bypass-permissions" || WH === "yes-accept-edits" || WH === "yes-auto-clear-context")) {
      let h_ = "default";
      if (WH === "yes-bypass-permissions") h_ = "bypassPermissions";else if (WH === "yes-accept-edits") h_ = "acceptEdits";else if (WH === "yes-auto-clear-context" && gx()) h_ = "auto", gz_?.setAutoModeActive(true);
      j("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Ue(WH),
        clearContext: true,
        hasFeedback: !!EH
      }), aAe({
        from: "plan",
        to: h_,
        trigger: "exit_plan_mode"
      });
      let s_ = "",
        c6 = `

If you need specific details from before exiting plan mode (like exact code snippets, error messages, or content you generated), read the full transcript at: ${Vf()}`,
        d6 = yl() ? `

If this plan can be broken down into multiple independent tasks, consider spawning named teammates with the ${vs} tool (pass a \`name\`) to parallelize the work.` : "",
        g8 = EH ? `

User feedback on this plan: ${EH}` : "";
      setAppState(T_ => ({
        ...T_,
        initialMessage: {
          message: {
            ...Ln({
              content: `Implement the following plan:

${planText}${s_}${c6}${d6}${g8}`,
              origin: {
                kind: "auto-continuation"
              }
            }),
            planContent: planText
          },
          clearContext: true,
          mode: h_,
          allowedPrompts: allowedPrompts
        }
      })), gV(true), answer({
        behavior: "deny"
      });
      return;
    }
    if (WH === "yes-resume-auto-mode" && gx()) {
      j("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Ue(WH),
        clearContext: false,
        hasFeedback: !!EH
      }), gV(true), Tre(true), gz_?.setAutoModeActive(true), aAe({
        from: "plan",
        to: "auto",
        trigger: "exit_plan_mode"
      }), setAppState(I0T), answer(Zo6(WH, {
        currentPlan: planText,
        planEditedLocally: planEditedLocally,
        allowedPrompts: allowedPrompts,
        acceptFeedback: EH,
        isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
        trimmedFeedback: NH,
        hasImages: nJScrollRef,
        imageBlocks: undefined,
        showClearContext: isEveryIntervalMode
      }));
      return;
    }
    if (K_) {
      aAe({
        from: "plan",
        to: WH === "yes-accept-edits-keep-context" ? isBypassPermissionsModeAvailable ? "bypassPermissions" : "acceptEdits" : "default",
        trigger: "exit_plan_mode"
      }), j("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Ue(WH),
        clearContext: false,
        hasFeedback: !!EH
      }), gV(true), Tre(true), answer(Zo6(WH, {
        currentPlan: planText,
        planEditedLocally: planEditedLocally,
        allowedPrompts: allowedPrompts,
        acceptFeedback: EH,
        isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
        trimmedFeedback: NH,
        hasImages: nJScrollRef,
        imageBlocks: undefined,
        showClearContext: isEveryIntervalMode
      }));
      return;
    }
    if (WH === "no") {
      if (!NH && !nJScrollRef) return;
      j("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Qe("no")
      });
      let h_;
      if (nJScrollRef) h_ = await Promise.all(isScrollViewPortal.map(async s_ => {
        let {
          block: Q_
        } = await qO({
          data: s_.content,
          mediaType: s_.mediaType,
          limits: sg(isRemoteSessionsAllowed)
        });
        return Q_;
      }));
      answer(Zo6(WH, {
        currentPlan: planText,
        planEditedLocally: planEditedLocally,
        allowedPrompts: allowedPrompts,
        acceptFeedback: EH,
        isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
        trimmedFeedback: NH,
        hasImages: nJScrollRef,
        imageBlocks: h_,
        showClearContext: isEveryIntervalMode
      }));
      return;
    }
  }, reactCompilerCache[31] = allowedPrompts, reactCompilerCache[32] = answer, reactCompilerCache[33] = planText, reactCompilerCache[34] = nJScrollRef, reactCompilerCache[35] = isScrollViewPortal, reactCompilerCache[36] = isBypassPermissionsModeAvailable, reactCompilerCache[37] = isRemoteSessionsAllowed, reactCompilerCache[38] = planEditedLocally, reactCompilerCache[39] = feedbackInput, reactCompilerCache[40] = setAppState, reactCompilerCache[41] = isEveryIntervalMode, reactCompilerCache[42] = getAppState, reactCompilerCache[43] = onCancelHandler;else onCancelHandler = reactCompilerCache[43];
  let emptyPlanHandler = onCancelHandler,
    BH;
  if (reactCompilerCache[44] !== answer || reactCompilerCache[45] !== planText.length) BH = () => {
    j("tengu_plan_exit", {
      planLengthChars: planText.length,
      outcome: Qe("no")
    }), answer({
      behavior: "deny"
    });
  }, reactCompilerCache[44] = answer, reactCompilerCache[45] = planText.length, reactCompilerCache[46] = BH;else BH = reactCompilerCache[46];
  let QH = BH,
    onKeyDown;
  if (reactCompilerCache[47] !== answer || reactCompilerCache[48] !== setAppState) onKeyDown = function (WH) {
    if (WH === "yes") {
      if (j("tengu_plan_exit", {
        planLengthChars: 0,
        outcome: Qe("yes-default")
      }), gz_?.isAutoModeActive() ?? false) gz_?.setAutoModeActive(false), a2(true), setAppState(b0T);
      gV(true), Tre(true), answer({
        behavior: "allow",
        updatedInput: {},
        permissionUpdates: [{
          type: "setMode",
          mode: "default",
          destination: "session"
        }]
      });
      return;
    }
    j("tengu_plan_exit", {
      planLengthChars: 0,
      outcome: Qe("no")
    }), answer({
      behavior: "deny"
    });
  }, reactCompilerCache[47] = answer, reactCompilerCache[48] = setAppState, reactCompilerCache[49] = onKeyDown;else onKeyDown = reactCompilerCache[49];
  let scrollableViewRef = onKeyDown,
    scrollHeight;
  if (reactCompilerCache[50] !== addNotification || reactCompilerCache[51] !== planText || reactCompilerCache[52] !== emptyPlanHandler || reactCompilerCache[53] !== planFilePath || reactCompilerCache[54] !== isEveryIntervalMode) scrollHeight = h6 => {
    if (h6.ctrl && h6.key === "g") {
      h6.preventDefault(), j("tengu_plan_external_editor_used", {}), (async () => {
        if (planFilePath) {
          let WH = await uG(planFilePath);
          if (WH.error) addNotification({
            key: "external-editor-error",
            kind: "warning",
            text: WH.error,
            color: "warning",
            priority: "high"
          });
          if (WH.content !== null) {
            if (WH.content !== planText) setPlanEditedLocally(true);
            setPlanText(WH.content), setEditorSavedIndicator(true);
          }
        } else {
          let WH = await XL(planText);
          if (WH.error) addNotification({
            key: "external-editor-error",
            kind: "warning",
            text: WH.error,
            color: "warning",
            priority: "high"
          });
          if (WH.content !== null && WH.content !== planText) setPlanText(WH.content), setEditorSavedIndicator(true);
        }
      })();
      return;
    }
    if (h6.shift && h6.key === "tab") {
      h6.preventDefault(), emptyPlanHandler(isEveryIntervalMode ? "yes-accept-edits" : "yes-accept-edits-keep-context");
      return;
    }
  }, reactCompilerCache[50] = addNotification, reactCompilerCache[51] = planText, reactCompilerCache[52] = emptyPlanHandler, reactCompilerCache[53] = planFilePath, reactCompilerCache[54] = isEveryIntervalMode, reactCompilerCache[55] = scrollHeight;else scrollHeight = reactCompilerCache[55];
  let q_ = scrollHeight;
  if (isPlanEmpty) {
    let h6;
    if (reactCompilerCache[56] === Symbol.for("react.memo_cache_sentinel")) h6 = s4.createElement(w, null, "Claude wants to exit plan mode"), reactCompilerCache[56] = h6;else h6 = reactCompilerCache[56];
    let WH;
    if (reactCompilerCache[57] === Symbol.for("react.memo_cache_sentinel")) WH = {
      label: "Yes",
      value: "yes"
    }, reactCompilerCache[57] = WH;else WH = reactCompilerCache[57];
    let NH;
    if (reactCompilerCache[58] === Symbol.for("react.memo_cache_sentinel")) NH = [WH, {
      label: "No",
      value: "no"
    }], reactCompilerCache[58] = NH;else NH = reactCompilerCache[58];
    let EH;
    if (reactCompilerCache[59] !== scrollableViewRef) EH = () => scrollableViewRef("no"), reactCompilerCache[59] = scrollableViewRef, reactCompilerCache[60] = EH;else EH = reactCompilerCache[60];
    let lH;
    if (reactCompilerCache[61] !== scrollableViewRef || reactCompilerCache[62] !== EH) lH = s4.createElement(B, {
      flexDirection: "column",
      paddingX: 1,
      marginTop: 1
    }, h6, s4.createElement(B, {
      marginTop: 1
    }, s4.createElement(Ar, {
      options: NH,
      onChange: scrollableViewRef,
      onCancel: EH
    }))), reactCompilerCache[61] = scrollableViewRef, reactCompilerCache[62] = EH, reactCompilerCache[63] = lH;else lH = reactCompilerCache[63];
    let K_;
    if (reactCompilerCache[64] !== payload.requestSource || reactCompilerCache[65] !== payload.workerBadge || reactCompilerCache[66] !== lH) K_ = s4.createElement(Rm, {
      color: "planMode",
      title: "Exit plan mode?",
      workerBadge: payload.workerBadge,
      requestSource: payload.requestSource
    }, lH), reactCompilerCache[64] = payload.requestSource, reactCompilerCache[65] = payload.workerBadge, reactCompilerCache[66] = lH, reactCompilerCache[67] = K_;else K_ = reactCompilerCache[67];
    return K_;
  }
  let v_ = editorScrollRef ?? undefined,
    permResultEl = editorNameRef ? RH : undefined,
    tH;
  if (reactCompilerCache[68] === Symbol.for("react.memo_cache_sentinel")) tH = s4.createElement(B, {
    paddingX: 1,
    flexDirection: "column"
  }, s4.createElement(w, null, "Here is Claude's plan:")), reactCompilerCache[68] = tH;else tH = reactCompilerCache[68];
  let b_;
  if (reactCompilerCache[69] !== planText) b_ = s4.createElement(a9, {
    marginBottom: 1
  }, s4.createElement(d_, null, planText)), reactCompilerCache[69] = planText, reactCompilerCache[70] = b_;else b_ = reactCompilerCache[70];
  let V_;
  if (reactCompilerCache[71] !== payload.permissionResult) V_ = s4.createElement(qU, {
    permissionResult: payload.permissionResult,
    toolType: "tool"
  }), reactCompilerCache[71] = payload.permissionResult, reactCompilerCache[72] = V_;else V_ = reactCompilerCache[72];
  let D_;
  if (reactCompilerCache[73] !== allowedPrompts) D_ = VRe() && allowedPrompts && allowedPrompts.length > 0 && s4.createElement(B, {
    flexDirection: "column",
    marginBottom: 1
  }, s4.createElement(w, {
    bold: true
  }, "Requested permissions:"), allowedPrompts.map(C0T)), reactCompilerCache[73] = allowedPrompts, reactCompilerCache[74] = D_;else D_ = reactCompilerCache[74];
  let I_;
  if (reactCompilerCache[75] !== V_ || reactCompilerCache[76] !== D_) I_ = s4.createElement(B, {
    flexDirection: "column",
    paddingX: 1
  }, V_, D_), reactCompilerCache[75] = V_, reactCompilerCache[76] = D_, reactCompilerCache[77] = I_;else I_ = reactCompilerCache[77];
  let m_;
  if (reactCompilerCache[78] !== b_ || reactCompilerCache[79] !== I_) m_ = s4.createElement(B, {
    flexDirection: "column",
    marginTop: 1
  }, tH, b_, I_), reactCompilerCache[78] = b_, reactCompilerCache[79] = I_, reactCompilerCache[80] = m_;else m_ = reactCompilerCache[80];
  let F_;
  if (reactCompilerCache[81] !== payload.requestSource || reactCompilerCache[82] !== payload.workerBadge || reactCompilerCache[83] !== m_) F_ = s4.createElement(Rm, {
    color: "planMode",
    title: "Ready to code?",
    innerPaddingX: 0,
    workerBadge: payload.workerBadge,
    requestSource: payload.requestSource
  }, m_), reactCompilerCache[81] = payload.requestSource, reactCompilerCache[82] = payload.workerBadge, reactCompilerCache[83] = m_, reactCompilerCache[84] = F_;else F_ = reactCompilerCache[84];
  let H6;
  if (reactCompilerCache[85] !== v_ || reactCompilerCache[86] !== permResultEl || reactCompilerCache[87] !== F_) H6 = s4.createElement(N6, {
    ref: v_,
    flexDirection: "column",
    height: permResultEl,
    stickyScroll: false
  }, F_), reactCompilerCache[85] = v_, reactCompilerCache[86] = permResultEl, reactCompilerCache[87] = F_, reactCompilerCache[88] = H6;else H6 = reactCompilerCache[88];
  let J6;
  if (reactCompilerCache[89] === Symbol.for("react.memo_cache_sentinel")) J6 = s4.createElement(w, {
    dimColor: true
  }, "Claude has written up a plan and is ready to execute. Would you like to proceed?"), reactCompilerCache[89] = J6;else J6 = reactCompilerCache[89];
  let Y6;
  if (reactCompilerCache[90] !== emptyPlanHandler) Y6 = h6 => void emptyPlanHandler(h6), reactCompilerCache[90] = emptyPlanHandler, reactCompilerCache[91] = Y6;else Y6 = reactCompilerCache[91];
  let q6;
  if (reactCompilerCache[92] !== QH || reactCompilerCache[93] !== onRemoveImage || reactCompilerCache[94] !== renderedOptions || reactCompilerCache[95] !== pastedImages || reactCompilerCache[96] !== Y6) q6 = s4.createElement(B, {
    marginTop: 1
  }, s4.createElement(Ar, {
    options: renderedOptions,
    onChange: Y6,
    onCancel: QH,
    onImagePaste: onRemoveImage,
    pastedContents: pastedImages,
    onRemoveImage: e_2
  })), reactCompilerCache[92] = QH, reactCompilerCache[93] = onRemoveImage, reactCompilerCache[94] = renderedOptions, reactCompilerCache[95] = pastedImages, reactCompilerCache[96] = Y6, reactCompilerCache[97] = q6;else q6 = reactCompilerCache[97];
  let p6;
  if (reactCompilerCache[98] !== planFilePath || reactCompilerCache[99] !== editorSavedIndicator) p6 = kH && s4.createElement(B, {
    flexDirection: "row",
    gap: 1,
    marginTop: 1
  }, s4.createElement(w, {
    dimColor: true
  }, s4.createElement(lt, {
    chord: "ctrl+g",
    action: "edit in"
  }), " "), s4.createElement(w, {
    bold: true,
    dimColor: true
  }, kH), planFilePath && s4.createElement(w, {
    dimColor: true
  }, " \xB7 ", Md(planFilePath)), editorSavedIndicator && s4.createElement(s4.Fragment, null, s4.createElement(w, {
    dimColor: true
  }, " \xB7 "), s4.createElement(w, {
    color: "success"
  }, s4.createElement(Os, {
    status: "success",
    withSpace: true
  }), "Plan saved!"))), reactCompilerCache[98] = planFilePath, reactCompilerCache[99] = editorSavedIndicator, reactCompilerCache[100] = p6;else p6 = reactCompilerCache[100];
  let Hq;
  if (reactCompilerCache[101] !== q6 || reactCompilerCache[102] !== p6) Hq = s4.createElement(B, {
    ref: updateEditorScrollHeight,
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "planMode",
    borderLeft: false,
    borderRight: false,
    borderBottom: false,
    paddingX: 1,
    flexShrink: 0
  }, J6, q6, p6), reactCompilerCache[101] = q6, reactCompilerCache[102] = p6, reactCompilerCache[103] = Hq;else Hq = reactCompilerCache[103];
  let o_;
  if (reactCompilerCache[104] !== q_ || reactCompilerCache[105] !== H6 || reactCompilerCache[106] !== Hq) o_ = s4.createElement(B, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: q_
  }, H6, Hq), reactCompilerCache[104] = q_, reactCompilerCache[105] = H6, reactCompilerCache[106] = Hq, reactCompilerCache[107] = o_;else o_ = reactCompilerCache[107];
  return o_;
}
function C0T(rule, index) {
  return s4.createElement(w, {
    key: index,
    dimColor: true
  }, "  ", "\xB7 ", rule.tool, "(", Xwn, " ", rule.prompt, ")");
}
function b0T(state) {
  return {
    ...state,
    toolPermissionContext: {
      ...wye(state.toolPermissionContext),
      prePlanMode: undefined
    }
  };
}
function I0T(state) {
  return {
    ...state,
    toolPermissionContext: Q6({
      ...state.toolPermissionContext,
      mode: "auto",
      prePlanMode: undefined
    })
  };
}
function x0T(state) {
  return {
    ...state,
    toolPermissionContext: {
      ...wye(state.toolPermissionContext),
      prePlanMode: undefined
    }
  };
}
function u0T(state) {
  return wm({
    agentId: ws(),
    value: state,
    mode: "task-notification"
  });
}
function m0T(block) {
  return block.type === "image";
}
function p0T(state) {
  return state.ultraplanLaunching;
}
function B0T(state) {
  return state.ultraplanSessionUrl;
}
function normalizeEveryIntervalMatch(state) {
  return state.settings.showClearContextOnPlanAccept;
}
function F0T(state) {
  return state.toolPermissionContext;
}
var JU4,
  s4,
  pd,
  gz_,
  y0T = "I'm sending this plan to Ultraplan to be refined remotely. Let me know it's been handed off and that a web link will appear here in a moment \u2014 I can use that to edit and iterate on the plan in the browser once the plan has been generated. I can continue to work here in the meantime; Claude Code will notify me when the cloud plan is ready for review, and I have the option to teleport the plan back here for implementation post-approval.";
var logFeedbackSurveyEvent = b(() => {
  ct();
  ct();
  nWn();
  Lje();
  hb();
  U4e();
  ts();
  lA();
  nU();
  Lk();
  qye();
  cE();
  np();
  OL();
  Ii();
  P0e();
  Je();
  Ct();
  sd();
  fo();
  rg();
  ib();
  eE();
  nDe();
  mc();
  ob();
  P4();
  _At();
  wn();
  uA();
  lo();
  O1();
  Fo();
  EYn();
  JE();
  ly();
  R9();
  ry();
  za();
  rS();
  vjt();
  JU4 = L(nt(), 1), s4 = L(Te(), 1), pd = L(Te(), 1), gz_ = (Lte(), Pr(Ace));
});

export {iLq as oLo,v0T as mPm,E0T as fPm,S0T as APm,Zo6 as uXn,DU4 as fWl,C0T as hPm,b0T as gPm,I0T as _Pm,x0T as yPm,u0T as TPm,m0T as SPm,p0T as bPm,B0T as EPm,normalizeEveryIntervalMatch as CPm,F0T as vPm,JU4 as mWl,s4 as cc,pd as oV,gz_ as tht,y0T as pPm,logFeedbackSurveyEvent as sLo};
