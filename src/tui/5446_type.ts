// @ts-nocheck
import {zP,FS} from "../../vendor/m722.ts";
import {Jke,T8i,bIn} from "../../vendor/m2788.ts";
import {isSessionPersistenceDisabled as $9,getSessionId as It,getSdkBetas as BT,MU,tK,setNeedsPlanModeExitAttachment as Hre,mainAgentId as rs,lt} from "../session/0132_sent.ts";
import {getCurrentSessionTitle as ph,saveAiGeneratedTitle as Yte,saveAgentName as f8e,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Yht,Hzn} from "../permissions/4799_once.ts";
import {Mn,po} from "../tools/5224_userPromptCount.ts";
import {Nm,D_} from "../agent/2784_withFileTypes.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {getRuntimeMainLoopModel as w0,getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {iE,Dyn,GS} from "../api/2028_used.ts";
import {isAutoModeGateEnabled as cv,restoreDangerousPermissions as SSe,$6,cy} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {_t,bo,gc,uo} from "../../vendor/m2468.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {FE,V1} from "../../vendor/m4006.ts";
import {wue,EGt} from "../telemetry/4868_EGt.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {bFo,ker} from "../../vendor/m5369.ts";
import {useTimeout as md} from "../../vendor/m2460.ts";
import {W_t,G_t,V_t} from "../../vendor/m5292.ts";
import {Ant,hvn,Dy,SE} from "../../vendor/m2559.ts";
import {measureElement as Cz} from "../../vendor/m2461.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {T6,TPe} from "../../vendor/m4631.ts";
import {tH,uS} from "../config/3192_path.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {CGt,OWe} from "../permissions/4872_plan.ts";
import {Bhe,oS} from "../config/2605_event_name.ts";
import {isAgentSwarmsEnabled as Wa,lb} from "../config/3314_isAgentSwarmsEnabled.ts";
import {ls,fg} from "../../vendor/m2232.ts";
import {gO,f4} from "../telemetry/2522_error_name.ts";
import {gg,t1} from "../telemetry/2542_ignore1mTag.ts";
import {GG,AL,d9} from "../../vendor/m4632.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {hr} from "../../vendor/m2573.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {K$,Jqe} from "../../vendor/m3915.ts";
import {gh,G1} from "../../vendor/m3957.ts";
import {gU,MSe} from "../../vendor/m5444.ts";
import {f6,zDe} from "../../vendor/m4482.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dd,Xl} from "../config/0651_maxBytes.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {rd,ef} from "../../vendor/m2794.ts";
import {b,x,oo} from "../../runtime.ts";
import {TS} from "../../vendor/m4541.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {bte,lce} from "../../vendor/m3960.ts";
// @ts-nocheck
function RBo(permissionMode, allowedPrompts) {
  let updates = [{
    type: "setMode",
    mode: zP(permissionMode),
    destination: "session"
  }];
  if (Jke() && allowedPrompts && allowedPrompts.length > 0) updates.push({
    type: "addRules",
    rules: allowedPrompts.map(rule => ({
      toolName: rule.tool,
      ruleContent: T8i(rule.prompt)
    })),
    behavior: "allow",
    destination: "session"
  });
  return updates;
}
function E2m(planText, setAppState, forceOverwrite) {
  if ($9()) return;
  if (!forceOverwrite && ph(It())) return;
  Yht([Mn({
    content: planText.slice(0, 1000)
  })], new AbortController().signal).then(async generatedTitle => {
    if (!generatedTitle || ph(It())) return;
    let sessionId = It(),
      transcriptPath = Nm();
    Yte(sessionId, generatedTitle), await f8e(sessionId, generatedTitle, transcriptPath, "auto"), setAppState(state => {
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
function C2m({
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
function A2m(usage, permissionMode) {
  if (!usage) return null;
  let model = w0({
      permissionMode: permissionMode,
      mainLoopModel: gs(),
      exceeds200kTokens: false
    }),
    betas = iE(model, BT()),
    {
      used: usedPercent
    } = Dyn({
      input_tokens: usage.input_tokens,
      cache_creation_input_tokens: usage.cache_creation_input_tokens ?? 0,
      cache_read_input_tokens: usage.cache_read_input_tokens ?? 0
    }, betas);
  return usedPercent;
}
function dtr(selectedOption, planContext) {
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
    feedback: b2m
  };
  if (showClearContext && (selectedOption === "yes-bypass-permissions" || selectedOption === "yes-accept-edits" || selectedOption === "yes-auto-clear-context")) return {
    behavior: "deny"
  };
  if (selectedOption === "yes-resume-auto-mode" && cv()) return {
    behavior: "allow",
    updatedInput: updatedPlanInput,
    permissionUpdates: [],
    feedback: acceptFeedback
  };
  let newPermMode = selectedOption === "yes-accept-edits-keep-context" ? isBypassPermissionsModeAvailable ? "bypassPermissions" : "acceptEdits" : selectedOption === "yes-default-keep-context" ? "default" : selectedOption === "yes-resume-auto-mode" ? "default" : undefined;
  if (newPermMode !== undefined) return {
    behavior: "allow",
    updatedInput: updatedPlanInput,
    permissionUpdates: RBo(newPermMode, allowedPrompts),
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
function JXl(props) {
  let reactCompilerCache = YXl.c(106),
    {
      payload: payload,
      answer: answer
    } = props,
    toolPermContext = _t(O2m),
    setAppState = bo(),
    getAppState = gc(),
    {
      addNotification: addNotification
    } = Ci(),
    [feedbackInput, setFeedbackInput] = CV.useState(""),
    emptyObj;
  if (reactCompilerCache[0] === Symbol.for("react.memo_cache_sentinel")) emptyObj = {}, reactCompilerCache[0] = emptyObj;else emptyObj = reactCompilerCache[0];
  let [pastedImages, setPastedImages] = CV.useState(emptyObj),
    pasteIdRef = CV.useRef(0),
    isClearContextEnabled = _t(P2m) ?? false,
    isUltraplanLaunching = _t(D2m),
    ultraplanSessionUrl = _t(x2m),
    isRemoteSessionsAllowed = FE(),
    showUltraplanRaw;
  if (reactCompilerCache[1] !== ultraplanSessionUrl || reactCompilerCache[2] !== isUltraplanLaunching) showUltraplanRaw = wue() && Xs("allow_remote_sessions") && !isUltraplanLaunching && !ultraplanSessionUrl, reactCompilerCache[1] = ultraplanSessionUrl, reactCompilerCache[2] = isUltraplanLaunching, reactCompilerCache[3] = showUltraplanRaw;else showUltraplanRaw = reactCompilerCache[3];
  let showUltraplan = showUltraplanRaw,
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
  let [planText, L] = CV.useState(getPlanInitial),
    isPlanEmpty = !planContent || planContent.trim() === "",
    exitOptions;
  if (reactCompilerCache[6] !== isAutoModeAvailable || reactCompilerCache[7] !== isBypassPermissionsModeAvailable || reactCompilerCache[8] !== permMode || reactCompilerCache[9] !== isClearContextEnabled || reactCompilerCache[10] !== showUltraplan || reactCompilerCache[11] !== usageData) {
    let autoAvailableFiltered;
    if (reactCompilerCache[13] !== isAutoModeAvailable) autoAvailableFiltered = isAutoModeAvailable && !bFo(), reactCompilerCache[13] = isAutoModeAvailable, reactCompilerCache[14] = autoAvailableFiltered;else autoAvailableFiltered = reactCompilerCache[14];
    exitOptions = C2m({
      showClearContext: isClearContextEnabled,
      showUltraplan: showUltraplan,
      usedPercent: isClearContextEnabled ? A2m(usageData, permMode) : null,
      isAutoModeAvailable: autoAvailableFiltered,
      isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
      onFeedbackChange: setFeedbackInput
    }), reactCompilerCache[6] = isAutoModeAvailable, reactCompilerCache[7] = isBypassPermissionsModeAvailable, reactCompilerCache[8] = permMode, reactCompilerCache[9] = isClearContextEnabled, reactCompilerCache[10] = showUltraplan, reactCompilerCache[11] = usageData, reactCompilerCache[12] = exitOptions;
  } else exitOptions = reactCompilerCache[12];
  let renderedOptions = exitOptions,
    [editorSavedIndicator, setEditorSavedIndicator] = CV.useState(false),
    [planEditedLocally, setPlanEditedLocally] = CV.useState(false),
    clearEditorIndicator;
  if (reactCompilerCache[15] === Symbol.for("react.memo_cache_sentinel")) clearEditorIndicator = () => setEditorSavedIndicator(false), reactCompilerCache[15] = clearEditorIndicator;else clearEditorIndicator = reactCompilerCache[15];
  let savedIndicatorDeps;
  if (reactCompilerCache[16] !== editorSavedIndicator) savedIndicatorDeps = [editorSavedIndicator], reactCompilerCache[16] = editorSavedIndicator, reactCompilerCache[17] = savedIndicatorDeps;else savedIndicatorDeps = reactCompilerCache[17];
  md(clearEditorIndicator, editorSavedIndicator ? 5000 : null, savedIndicatorDeps);
  let onImagePaste;
  if (reactCompilerCache[18] !== setAppState) onImagePaste = function (data, mediaType, filename, dimensions, pasteExtra) {
    pasteIdRef.current = pasteIdRef.current + 1;
    let pasteId = pasteIdRef.current,
      pastedImage = {
        id: pasteId,
        type: "image",
        content: data,
        mediaType: mediaType || "image/png",
        filename: filename || "Pasted image",
        dimensions: dimensions
      };
    W_t(pastedImage, setAppState), G_t(pastedImage, setAppState), setPastedImages(prev => ({
      ...prev,
      [pasteId]: pastedImage
    }));
  }, reactCompilerCache[18] = setAppState, reactCompilerCache[19] = onImagePaste;else onImagePaste = reactCompilerCache[19];
  let onImagePasteHandler = onImagePaste,
    removeImageImpl;
  if (reactCompilerCache[20] === Symbol.for("react.memo_cache_sentinel")) removeImageImpl = removeId => {
    setPastedImages(prev => {
      let next = {
        ...prev
      };
      return delete next[removeId], next;
    });
  }, reactCompilerCache[20] = removeImageImpl;else removeImageImpl = reactCompilerCache[20];
  let onRemoveImage = removeImageImpl,
    imageBlocksRaw;
  if (reactCompilerCache[21] !== pastedImages) imageBlocksRaw = Object.values(pastedImages).filter(I2m), reactCompilerCache[21] = pastedImages, reactCompilerCache[22] = imageBlocksRaw;else imageBlocksRaw = reactCompilerCache[22];
  let imageBlocks = imageBlocksRaw,
    hasImages = imageBlocks.length > 0,
    editorScrollRef = Ant(),
    setEditorScrollHeight = hvn(),
    editorBoxRef = CV.useRef(null),
    [editorBoxHeight, setEditorBoxHeight] = CV.useState(0),
    measureEditorBox;
  if (reactCompilerCache[23] !== editorBoxHeight) measureEditorBox = () => {
    let measuredHeight = editorBoxRef.current ? Cz(editorBoxRef.current).height : 0;
    if (measuredHeight !== editorBoxHeight) setEditorBoxHeight(measuredHeight);
  }, reactCompilerCache[23] = editorBoxHeight, reactCompilerCache[24] = measureEditorBox;else measureEditorBox = reactCompilerCache[24];
  CV.useLayoutEffect(measureEditorBox);
  let reportEditorHeightEffect, reportEditorHeightDeps;
  if (reactCompilerCache[25] !== setEditorScrollHeight || reactCompilerCache[26] !== editorBoxHeight) reportEditorHeightEffect = () => {
    if (!setEditorScrollHeight) return;
    return setEditorScrollHeight(editorBoxHeight), () => setEditorScrollHeight(null);
  }, reportEditorHeightDeps = [setEditorScrollHeight, editorBoxHeight], reactCompilerCache[25] = setEditorScrollHeight, reactCompilerCache[26] = editorBoxHeight, reactCompilerCache[27] = reportEditorHeightEffect, reactCompilerCache[28] = reportEditorHeightDeps;else reportEditorHeightEffect = reactCompilerCache[27], reportEditorHeightDeps = reactCompilerCache[28];
  CV.useLayoutEffect(reportEditorHeightEffect, reportEditorHeightDeps);
  let zeroSize;
  if (reactCompilerCache[29] === Symbol.for("react.memo_cache_sentinel")) zeroSize = {
    rows: 0,
    columns: 0
  }, reactCompilerCache[29] = zeroSize;else zeroSize = reactCompilerCache[29];
  let {
      rows: portalRows
    } = Dy(zeroSize),
    terminalSize = _r(),
    isScrollPortal = setEditorScrollHeight !== null && editorScrollRef !== null,
    scrollHeight = isScrollPortal ? Math.max(1, portalRows - editorBoxHeight) : Math.max(1, terminalSize.rows - editorBoxHeight - 4),
    editorNameRaw;
  if (reactCompilerCache[30] === Symbol.for("react.memo_cache_sentinel")) {
    let editorPath = T6();
    editorNameRaw = editorPath ? tH(editorPath) : null, reactCompilerCache[30] = editorNameRaw;
  } else editorNameRaw = reactCompilerCache[30];
  let editorName = editorNameRaw,
    onSelect;
  if (reactCompilerCache[31] !== allowedPrompts || reactCompilerCache[32] !== answer || reactCompilerCache[33] !== planText || reactCompilerCache[34] !== hasImages || reactCompilerCache[35] !== imageBlocks || reactCompilerCache[36] !== isBypassPermissionsModeAvailable || reactCompilerCache[37] !== isRemoteSessionsAllowed || reactCompilerCache[38] !== planEditedLocally || reactCompilerCache[39] !== feedbackInput || reactCompilerCache[40] !== setAppState || reactCompilerCache[41] !== isClearContextEnabled || reactCompilerCache[42] !== getAppState) onSelect = async function (option) {
    let trimmedFeedback = feedbackInput.trim(),
      acceptFeedback = trimmedFeedback || undefined;
    if (option === "ultraplan") {
      W("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Ve("ultraplan")
      }), answer(dtr(option, {
        currentPlan: planText,
        planEditedLocally: planEditedLocally,
        allowedPrompts: allowedPrompts,
        acceptFeedback: acceptFeedback,
        isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
        trimmedFeedback: trimmedFeedback,
        hasImages: hasImages,
        imageBlocks: undefined,
        showClearContext: isClearContextEnabled
      }));
      let onStatusMessage = H2m;
      CGt({
        arg: "",
        source: "exit_plan_mode",
        seedPlan: planText,
        getAppState: getAppState.getState,
        setAppState: getAppState.setState,
        signal: new AbortController().signal,
        onStatusMessage: onStatusMessage
      }).then(onStatusMessage).catch(Ie);
      return;
    }
    let keepContext = option === "yes-accept-edits-keep-context" || option === "yes-default-keep-context" || option === "yes-resume-auto-mode";
    {
      let resumingAuto = (option === "yes-resume-auto-mode" || option === "yes-auto-clear-context") && cv(),
        autoModeActive = yyt?.isAutoModeActive() ?? false;
      if (option !== "no" && !resumingAuto && autoModeActive) yyt?.setAutoModeActive(false), MU(true), setAppState(k2m);
    }
    if (option !== "no") E2m(planText, setAppState, !keepContext);
    if (isClearContextEnabled && (option === "yes-bypass-permissions" || option === "yes-accept-edits" || option === "yes-auto-clear-context")) {
      let nextMode = "default";
      if (option === "yes-bypass-permissions") nextMode = "bypassPermissions";else if (option === "yes-accept-edits") nextMode = "acceptEdits";else if (option === "yes-auto-clear-context" && cv()) nextMode = "auto", yyt?.setAutoModeActive(true);
      W("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Le(option),
        clearContext: true,
        hasFeedback: !!acceptFeedback
      }), Bhe({
        from: "plan",
        to: nextMode,
        trigger: "exit_plan_mode"
      });
      let transcriptHint = `

If you need specific details from before exiting plan mode (like exact code snippets, error messages, or content you generated), read the full transcript at: ${Nm()}`,
        teammateHint = Wa() ? `

If this plan can be broken down into multiple independent tasks, consider spawning named teammates with the ${ls} tool (pass a \`name\`) to parallelize the work.` : "",
        feedbackHint = acceptFeedback ? `

User feedback on this plan: ${acceptFeedback}` : "";
      setAppState(state => ({
        ...state,
        initialMessage: {
          message: {
            ...Mn({
              content: `Implement the following plan:

${planText}${transcriptHint}${teammateHint}${feedbackHint}`,
              origin: {
                kind: "auto-continuation"
              }
            }),
            planContent: planText
          },
          clearContext: true,
          mode: nextMode,
          allowedPrompts: allowedPrompts
        }
      })), tK(true), answer({
        behavior: "deny"
      });
      return;
    }
    if (option === "yes-resume-auto-mode" && cv()) {
      W("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Le(option),
        clearContext: false,
        hasFeedback: !!acceptFeedback
      }), tK(true), Hre(true), yyt?.setAutoModeActive(true), Bhe({
        from: "plan",
        to: "auto",
        trigger: "exit_plan_mode"
      }), setAppState(w2m), answer(dtr(option, {
        currentPlan: planText,
        planEditedLocally: planEditedLocally,
        allowedPrompts: allowedPrompts,
        acceptFeedback: acceptFeedback,
        isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
        trimmedFeedback: trimmedFeedback,
        hasImages: hasImages,
        imageBlocks: undefined,
        showClearContext: isClearContextEnabled
      }));
      return;
    }
    if (keepContext) {
      Bhe({
        from: "plan",
        to: option === "yes-accept-edits-keep-context" ? isBypassPermissionsModeAvailable ? "bypassPermissions" : "acceptEdits" : "default",
        trigger: "exit_plan_mode"
      }), W("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Le(option),
        clearContext: false,
        hasFeedback: !!acceptFeedback
      }), tK(true), Hre(true), answer(dtr(option, {
        currentPlan: planText,
        planEditedLocally: planEditedLocally,
        allowedPrompts: allowedPrompts,
        acceptFeedback: acceptFeedback,
        isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
        trimmedFeedback: trimmedFeedback,
        hasImages: hasImages,
        imageBlocks: undefined,
        showClearContext: isClearContextEnabled
      }));
      return;
    }
    if (option === "no") {
      if (!trimmedFeedback && !hasImages) return;
      W("tengu_plan_exit", {
        planLengthChars: planText.length,
        outcome: Ve("no")
      });
      let resolvedImageBlocks;
      if (hasImages) resolvedImageBlocks = await Promise.all(imageBlocks.map(async image => {
        let {
          block: block
        } = await gO({
          data: image.content,
          mediaType: image.mediaType,
          limits: gg(isRemoteSessionsAllowed)
        });
        return block;
      }));
      answer(dtr(option, {
        currentPlan: planText,
        planEditedLocally: planEditedLocally,
        allowedPrompts: allowedPrompts,
        acceptFeedback: acceptFeedback,
        isBypassPermissionsModeAvailable: isBypassPermissionsModeAvailable,
        trimmedFeedback: trimmedFeedback,
        hasImages: hasImages,
        imageBlocks: resolvedImageBlocks,
        showClearContext: isClearContextEnabled
      }));
      return;
    }
  }, reactCompilerCache[31] = allowedPrompts, reactCompilerCache[32] = answer, reactCompilerCache[33] = planText, reactCompilerCache[34] = hasImages, reactCompilerCache[35] = imageBlocks, reactCompilerCache[36] = isBypassPermissionsModeAvailable, reactCompilerCache[37] = isRemoteSessionsAllowed, reactCompilerCache[38] = planEditedLocally, reactCompilerCache[39] = feedbackInput, reactCompilerCache[40] = setAppState, reactCompilerCache[41] = isClearContextEnabled, reactCompilerCache[42] = getAppState, reactCompilerCache[43] = onSelect;else onSelect = reactCompilerCache[43];
  let onSelectHandler = onSelect,
    onCancelImpl;
  if (reactCompilerCache[44] !== answer || reactCompilerCache[45] !== planText.length) onCancelImpl = () => {
    W("tengu_plan_exit", {
      planLengthChars: planText.length,
      outcome: Ve("no")
    }), answer({
      behavior: "deny"
    });
  }, reactCompilerCache[44] = answer, reactCompilerCache[45] = planText.length, reactCompilerCache[46] = onCancelImpl;else onCancelImpl = reactCompilerCache[46];
  let onCancel = onCancelImpl,
    onEmptyPlanSelect;
  if (reactCompilerCache[47] !== answer || reactCompilerCache[48] !== setAppState) onEmptyPlanSelect = function (option) {
    if (option === "yes") {
      if (W("tengu_plan_exit", {
        planLengthChars: 0,
        outcome: Ve("yes-default")
      }), yyt?.isAutoModeActive() ?? false) yyt?.setAutoModeActive(false), MU(true), setAppState(v2m);
      tK(true), Hre(true), answer({
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
    W("tengu_plan_exit", {
      planLengthChars: 0,
      outcome: Ve("no")
    }), answer({
      behavior: "deny"
    });
  }, reactCompilerCache[47] = answer, reactCompilerCache[48] = setAppState, reactCompilerCache[49] = onEmptyPlanSelect;else onEmptyPlanSelect = reactCompilerCache[49];
  let onEmptyPlanSelectHandler = onEmptyPlanSelect,
    onKeyDownImpl;
  if (reactCompilerCache[50] !== addNotification || reactCompilerCache[51] !== planText || reactCompilerCache[52] !== onSelectHandler || reactCompilerCache[53] !== planFilePath || reactCompilerCache[54] !== isClearContextEnabled) onKeyDownImpl = key => {
    if (key.ctrl && key.key === "g") {
      key.preventDefault(), W("tengu_plan_external_editor_used", {}), (async () => {
        if (planFilePath) {
          let editResult = await GG(planFilePath);
          if (editResult.error) addNotification({
            key: "external-editor-error",
            kind: "warning",
            text: editResult.error,
            color: "warning",
            priority: "high"
          });
          if (editResult.content !== null) {
            if (editResult.content !== planText) setPlanEditedLocally(true);
            L(editResult.content), setEditorSavedIndicator(true);
          }
        } else {
          let editResult = await AL(planText);
          if (editResult.error) addNotification({
            key: "external-editor-error",
            kind: "warning",
            text: editResult.error,
            color: "warning",
            priority: "high"
          });
          if (editResult.content !== null && editResult.content !== planText) L(editResult.content), setEditorSavedIndicator(true);
        }
      })();
      return;
    }
    if (key.shift && key.key === "tab") {
      key.preventDefault(), onSelectHandler(isClearContextEnabled ? "yes-accept-edits" : "yes-accept-edits-keep-context");
      return;
    }
  }, reactCompilerCache[50] = addNotification, reactCompilerCache[51] = planText, reactCompilerCache[52] = onSelectHandler, reactCompilerCache[53] = planFilePath, reactCompilerCache[54] = isClearContextEnabled, reactCompilerCache[55] = onKeyDownImpl;else onKeyDownImpl = reactCompilerCache[55];
  let onKeyDown = onKeyDownImpl;
  if (isPlanEmpty) {
    let exitTitle;
    if (reactCompilerCache[56] === Symbol.for("react.memo_cache_sentinel")) exitTitle = Pg.jsx(v, {
      children: "Claude wants to exit plan mode"
    }), reactCompilerCache[56] = exitTitle;else exitTitle = reactCompilerCache[56];
    let yesOption;
    if (reactCompilerCache[57] === Symbol.for("react.memo_cache_sentinel")) yesOption = {
      label: "Yes",
      value: "yes"
    }, reactCompilerCache[57] = yesOption;else yesOption = reactCompilerCache[57];
    let yesNoOptions;
    if (reactCompilerCache[58] === Symbol.for("react.memo_cache_sentinel")) yesNoOptions = [yesOption, {
      label: "No",
      value: "no"
    }], reactCompilerCache[58] = yesNoOptions;else yesNoOptions = reactCompilerCache[58];
    let onEmptyCancel;
    if (reactCompilerCache[59] !== onEmptyPlanSelectHandler) onEmptyCancel = () => onEmptyPlanSelectHandler("no"), reactCompilerCache[59] = onEmptyPlanSelectHandler, reactCompilerCache[60] = onEmptyCancel;else onEmptyCancel = reactCompilerCache[60];
    let emptyPlanBody;
    if (reactCompilerCache[61] !== onEmptyPlanSelectHandler || reactCompilerCache[62] !== onEmptyCancel) emptyPlanBody = Pg.jsxs($, {
      flexDirection: "column",
      paddingX: 1,
      marginTop: 1,
      children: [exitTitle, Pg.jsx($, {
        marginTop: 1,
        children: Pg.jsx(hr, {
          options: yesNoOptions,
          onChange: onEmptyPlanSelectHandler,
          onCancel: onEmptyCancel
        })
      })]
    }), reactCompilerCache[61] = onEmptyPlanSelectHandler, reactCompilerCache[62] = onEmptyCancel, reactCompilerCache[63] = emptyPlanBody;else emptyPlanBody = reactCompilerCache[63];
    let emptyPlanPanel;
    if (reactCompilerCache[64] !== payload.requestSource || reactCompilerCache[65] !== emptyPlanBody) emptyPlanPanel = Pg.jsx(hm, {
      color: "planMode",
      title: "Exit plan mode?",
      requestSource: payload.requestSource,
      children: emptyPlanBody
    }), reactCompilerCache[64] = payload.requestSource, reactCompilerCache[65] = emptyPlanBody, reactCompilerCache[66] = emptyPlanPanel;else emptyPlanPanel = reactCompilerCache[66];
    return emptyPlanPanel;
  }
  let editorRefOrUndef = editorScrollRef ?? undefined,
    scrollHeightOrUndef = isScrollPortal ? scrollHeight : undefined,
    planHeading;
  if (reactCompilerCache[67] === Symbol.for("react.memo_cache_sentinel")) planHeading = Pg.jsx($, {
    paddingX: 1,
    flexDirection: "column",
    children: Pg.jsx(v, {
      children: "Here is Claude's plan:"
    })
  }), reactCompilerCache[67] = planHeading;else planHeading = reactCompilerCache[67];
  let planBody;
  if (reactCompilerCache[68] !== planText) planBody = Pg.jsx(K$, {
    marginBottom: 1,
    children: Pg.jsx(gh, {
      children: planText
    })
  }), reactCompilerCache[68] = planText, reactCompilerCache[69] = planBody;else planBody = reactCompilerCache[69];
  let permissionResultEl;
  if (reactCompilerCache[70] !== payload.permissionResult) permissionResultEl = Pg.jsx(gU, {
    permissionResult: payload.permissionResult,
    toolType: "tool"
  }), reactCompilerCache[70] = payload.permissionResult, reactCompilerCache[71] = permissionResultEl;else permissionResultEl = reactCompilerCache[71];
  let requestedPermissionsEl;
  if (reactCompilerCache[72] !== allowedPrompts) requestedPermissionsEl = Jke() && allowedPrompts && allowedPrompts.length > 0 && Pg.jsxs($, {
    flexDirection: "column",
    marginBottom: 1,
    children: [Pg.jsx(v, {
      bold: true,
      children: "Requested permissions:"
    }), allowedPrompts.map(R2m)]
  }), reactCompilerCache[72] = allowedPrompts, reactCompilerCache[73] = requestedPermissionsEl;else requestedPermissionsEl = reactCompilerCache[73];
  let permissionsBlock;
  if (reactCompilerCache[74] !== permissionResultEl || reactCompilerCache[75] !== requestedPermissionsEl) permissionsBlock = Pg.jsxs($, {
    flexDirection: "column",
    paddingX: 1,
    children: [permissionResultEl, requestedPermissionsEl]
  }), reactCompilerCache[74] = permissionResultEl, reactCompilerCache[75] = requestedPermissionsEl, reactCompilerCache[76] = permissionsBlock;else permissionsBlock = reactCompilerCache[76];
  let planSection;
  if (reactCompilerCache[77] !== planBody || reactCompilerCache[78] !== permissionsBlock) planSection = Pg.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [planHeading, planBody, permissionsBlock]
  }), reactCompilerCache[77] = planBody, reactCompilerCache[78] = permissionsBlock, reactCompilerCache[79] = planSection;else planSection = reactCompilerCache[79];
  let readyPanel;
  if (reactCompilerCache[80] !== payload.requestSource || reactCompilerCache[81] !== planSection) readyPanel = Pg.jsx(hm, {
    color: "planMode",
    title: "Ready to code?",
    innerPaddingX: 0,
    requestSource: payload.requestSource,
    children: planSection
  }), reactCompilerCache[80] = payload.requestSource, reactCompilerCache[81] = planSection, reactCompilerCache[82] = readyPanel;else readyPanel = reactCompilerCache[82];
  let scrollContainer;
  if (reactCompilerCache[83] !== editorRefOrUndef || reactCompilerCache[84] !== scrollHeightOrUndef || reactCompilerCache[85] !== readyPanel) scrollContainer = Pg.jsx(f6, {
    ref: editorRefOrUndef,
    flexDirection: "column",
    height: scrollHeightOrUndef,
    stickyScroll: false,
    children: readyPanel
  }), reactCompilerCache[83] = editorRefOrUndef, reactCompilerCache[84] = scrollHeightOrUndef, reactCompilerCache[85] = readyPanel, reactCompilerCache[86] = scrollContainer;else scrollContainer = reactCompilerCache[86];
  let promptText;
  if (reactCompilerCache[87] === Symbol.for("react.memo_cache_sentinel")) promptText = Pg.jsx(v, {
    dimColor: true,
    children: "Claude has written up a plan and is ready to execute. Would you like to proceed?"
  }), reactCompilerCache[87] = promptText;else promptText = reactCompilerCache[87];
  let onOptionChange;
  if (reactCompilerCache[88] !== onSelectHandler) onOptionChange = option => void onSelectHandler(option), reactCompilerCache[88] = onSelectHandler, reactCompilerCache[89] = onOptionChange;else onOptionChange = reactCompilerCache[89];
  let optionsEl;
  if (reactCompilerCache[90] !== onCancel || reactCompilerCache[91] !== onImagePasteHandler || reactCompilerCache[92] !== renderedOptions || reactCompilerCache[93] !== pastedImages || reactCompilerCache[94] !== onOptionChange) optionsEl = Pg.jsx($, {
    marginTop: 1,
    children: Pg.jsx(hr, {
      options: renderedOptions,
      onChange: onOptionChange,
      onCancel: onCancel,
      onImagePaste: onImagePasteHandler,
      pastedContents: pastedImages,
      onRemoveImage: onRemoveImage
    })
  }), reactCompilerCache[90] = onCancel, reactCompilerCache[91] = onImagePasteHandler, reactCompilerCache[92] = renderedOptions, reactCompilerCache[93] = pastedImages, reactCompilerCache[94] = onOptionChange, reactCompilerCache[95] = optionsEl;else optionsEl = reactCompilerCache[95];
  let editorFooterEl;
  if (reactCompilerCache[96] !== planFilePath || reactCompilerCache[97] !== editorSavedIndicator) editorFooterEl = editorName && Pg.jsxs($, {
    flexDirection: "row",
    gap: 1,
    marginTop: 1,
    children: [Pg.jsxs(v, {
      dimColor: true,
      children: [Pg.jsx(at, {
        chord: "ctrl+g",
        action: "edit in"
      }), " "]
    }), Pg.jsx(v, {
      bold: true,
      dimColor: true,
      children: editorName
    }), planFilePath && Pg.jsxs(v, {
      dimColor: true,
      children: [" \xB7 ", dd(planFilePath)]
    }), editorSavedIndicator && Pg.jsxs(Pg.Fragment, {
      children: [Pg.jsx(v, {
        dimColor: true,
        children: " \xB7 "
      }), Pg.jsxs(v, {
        color: "success",
        children: [Pg.jsx(bs, {
          status: "success",
          withSpace: true
        }), "Plan saved!"]
      })]
    })]
  }), reactCompilerCache[96] = planFilePath, reactCompilerCache[97] = editorSavedIndicator, reactCompilerCache[98] = editorFooterEl;else editorFooterEl = reactCompilerCache[98];
  let editorPanel;
  if (reactCompilerCache[99] !== optionsEl || reactCompilerCache[100] !== editorFooterEl) editorPanel = Pg.jsxs($, {
    ref: editorBoxRef,
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "planMode",
    borderLeft: false,
    borderRight: false,
    borderBottom: false,
    paddingX: 1,
    flexShrink: 0,
    children: [promptText, optionsEl, editorFooterEl]
  }), reactCompilerCache[99] = optionsEl, reactCompilerCache[100] = editorFooterEl, reactCompilerCache[101] = editorPanel;else editorPanel = reactCompilerCache[101];
  let rootEl;
  if (reactCompilerCache[102] !== onKeyDown || reactCompilerCache[103] !== scrollContainer || reactCompilerCache[104] !== editorPanel) rootEl = Pg.jsxs($, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: onKeyDown,
    children: [scrollContainer, editorPanel]
  }), reactCompilerCache[102] = onKeyDown, reactCompilerCache[103] = scrollContainer, reactCompilerCache[104] = editorPanel, reactCompilerCache[105] = rootEl;else rootEl = reactCompilerCache[105];
  return rootEl;
}
function R2m(rule, index) {
  return Pg.jsxs(v, {
    dimColor: true,
    children: ["  ", "\xB7 ", rule.tool, "(", bIn, " ", rule.prompt, ")"]
  }, index);
}
function v2m(state) {
  return {
    ...state,
    toolPermissionContext: {
      ...SSe(state.toolPermissionContext),
      prePlanMode: undefined
    }
  };
}
function w2m(state) {
  return {
    ...state,
    toolPermissionContext: $6({
      ...state.toolPermissionContext,
      mode: "auto",
      prePlanMode: undefined
    })
  };
}
function k2m(state) {
  return {
    ...state,
    toolPermissionContext: {
      ...SSe(state.toolPermissionContext),
      prePlanMode: undefined
    }
  };
}
function H2m(state) {
  return rd({
    agentId: rs(),
    value: state,
    mode: "task-notification"
  });
}
function I2m(block) {
  return block.type === "image";
}
function x2m(state) {
  return state.ultraplanLaunching;
}
function D2m(state) {
  return state.ultraplanSessionUrl;
}
function P2m(state) {
  return state.settings.showClearContextOnPlanAccept;
}
function O2m(state) {
  return state.toolPermissionContext;
}
var YXl,
  CV,
  Pg,
  yyt,
  b2m = "I'm sending this plan to Ultraplan to be refined remotely. Let me know it's been handed off and that a web link will appear here in a moment \u2014 I can use that to edit and iterate on the plan in the browser once the plan has been generated. I can continue to work here in the meantime; Claude Code will notify me when the cloud plan is ready for review, and I have the option to teleport the plan back here for implementation post-approval.";
var vBo = b(() => {
  lt();
  lt();
  Hzn();
  OWe();
  TS();
  Jqe();
  Wo();
  ff();
  G1();
  DI();
  MSe();
  SE();
  fd();
  V1();
  ui();
  zDe();
  je();
  kt();
  Bu();
  uo();
  fg();
  lb();
  GS();
  TPe();
  Xl();
  uS();
  f4();
  V_t();
  vn();
  ef();
  po();
  t1();
  Ro();
  ker();
  FS();
  cy();
  d9();
  D_();
  _a();
  oS();
  EGt();
  YXl = x(tt(), 1), CV = x(et(), 1), Pg = x(oe(), 1), yyt = (bte(), oo(lce));
});

export {RBo,E2m,C2m,A2m,dtr,JXl,R2m,v2m,w2m,k2m,H2m,I2m,x2m,D2m,P2m,O2m,YXl,CV,Pg,yyt,b2m,vBo};
