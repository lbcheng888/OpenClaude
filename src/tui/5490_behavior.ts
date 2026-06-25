// @ts-nocheck
import {uEn,cEn,fa,ry} from "../../vendor/m2253.ts";
import {generateSuggestions as v_t,Xm} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {FZl,BZl} from "../../vendor/m5488.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {tFt,uS} from "../config/3192_path.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Semantic restoration for tui/5490_behavior.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 *
 * This module renders a file-edit permission dialog (accept-once / accept-session /
 * reject) and maps the chosen answer into a permission decision. Built with the React
 * Compiler memoization runtime (the positional `cache[N]` slot array).
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

/**
 * Maps a file-edit permission answer into a permission decision.
 * @param answer        the selected option (accept-once / accept-session / reject)
 * @param request       the permission request payload (carries `input`, `filePath`, ...)
 * @param permissionCtx the current tool permission context
 * @param feedback      optional user-entered feedback text
 */
function mapFileEditPermissionAnswer(answer, request, permissionCtx, feedback) {
  switch (answer.type) {
    case "accept-once":
      return {
        behavior: "allow",
        updatedInput: request.input,
        ...(feedback && {
          feedback: feedback
        })
      };
    case "accept-session":
      {
        if (answer.scope === "claude-folder" || answer.scope === "global-claude-folder") {
          let ruleContent = answer.scope === "global-claude-folder" ? uEn : cEn;
          return {
            behavior: "allow",
            updatedInput: request.input,
            permissionUpdates: [{
              type: "addRules",
              rules: [{
                toolName: fa,
                ruleContent: ruleContent
              }],
              behavior: "allow",
              destination: "session"
            }]
          };
        }
        return {
          behavior: "allow",
          updatedInput: request.input,
          permissionUpdates: v_t(request.filePath, request.operationType, permissionCtx)
        };
      }
    case "reject":
      return {
        behavior: "deny",
        ...(feedback && {
          feedback: feedback
        })
      };
  }
}

/** Renders the file-edit permission dialog. */
function FileEditPermissionDialog(props) {
  let cache = UZl.c(98),
    {
      payload: request,
      answer: onAnswer
    } = props,
    permissionCtx = _t(H9m),
    [acceptFeedback, setAcceptFeedback] = XOe.useState(""),
    [rejectFeedback, setRejectFeedback] = XOe.useState(""),
    [focusedOption, setFocusedOption] = XOe.useState("yes"),
    [yesInputMode, setYesInputMode] = XOe.useState(!1),
    [noInputMode, setNoInputMode] = XOe.useState(!1),
    [acceptFeedbackEntered, setAcceptFeedbackEntered] = XOe.useState(!1),
    [rejectFeedbackEntered, setRejectFeedbackEntered] = XOe.useState(!1),
    displayToolName;
  if (cache[0] !== request.toolName) displayToolName = Pi(request.toolName), cache[0] = request.toolName, cache[1] = displayToolName;else displayToolName = cache[1];
  let analyticsBase;
  if (cache[2] !== request.isMcp || cache[3] !== displayToolName) analyticsBase = {
    toolName: displayToolName,
    isMcp: request.isMcp
  }, cache[2] = request.isMcp, cache[3] = displayToolName, cache[4] = analyticsBase;else analyticsBase = cache[4];
  let toolAnalytics = analyticsBase,
    builtOptions;
  if (cache[5] !== noInputMode || cache[6] !== request.filePath || cache[7] !== request.operationType || cache[8] !== permissionCtx || cache[9] !== yesInputMode) builtOptions = FZl({
    filePath: request.filePath,
    toolPermissionContext: permissionCtx,
    operationType: request.operationType,
    onRejectFeedbackChange: setRejectFeedback,
    onAcceptFeedbackChange: setAcceptFeedback,
    yesInputMode: yesInputMode,
    noInputMode: noInputMode
  }), cache[5] = noInputMode, cache[6] = request.filePath, cache[7] = request.operationType, cache[8] = permissionCtx, cache[9] = yesInputMode, cache[10] = builtOptions;else builtOptions = cache[10];
  let options = builtOptions,
    submitAnswerCb;
  if (cache[11] !== toolAnalytics || cache[12] !== onAnswer || cache[13] !== rejectFeedbackEntered || cache[14] !== request || cache[15] !== permissionCtx || cache[16] !== acceptFeedbackEntered) submitAnswerCb = (selectedOption, instructions) => {
    if (selectedOption.type === "reject") W("tengu_reject_submitted", {
      ...toolAnalytics,
      has_instructions: !!instructions,
      instructions_length: instructions?.length ?? 0,
      entered_feedback_mode: rejectFeedbackEntered
    });else if (selectedOption.type === "accept-once") W("tengu_accept_submitted", {
      ...toolAnalytics,
      has_instructions: !!instructions,
      instructions_length: instructions?.length ?? 0,
      entered_feedback_mode: acceptFeedbackEntered
    });
    onAnswer(mapFileEditPermissionAnswer(selectedOption, request, permissionCtx, instructions));
  }, cache[11] = toolAnalytics, cache[12] = onAnswer, cache[13] = rejectFeedbackEntered, cache[14] = request, cache[15] = permissionCtx, cache[16] = acceptFeedbackEntered, cache[17] = submitAnswerCb;else submitAnswerCb = cache[17];
  let submitAnswer = submitAnswerCb,
    cycleModeCb;
  if (cache[18] !== options || cache[19] !== submitAnswer) cycleModeCb = () => {
    let sessionOption = options.find(k9m);
    if (sessionOption) submitAnswer(sessionOption.option);
  }, cache[18] = options, cache[19] = submitAnswer, cache[20] = cycleModeCb;else cycleModeCb = cache[20];
  let cycleMode = cycleModeCb,
    keyBindings;
  if (cache[21] !== cycleMode) keyBindings = {
    "confirm:cycleMode": cycleMode
  }, cache[21] = cycleMode, cache[22] = keyBindings;else keyBindings = cache[22];
  let keyBindingOptions;
  if (cache[23] === Symbol.for("react.memo_cache_sentinel")) keyBindingOptions = {
    context: "Confirmation"
  }, cache[23] = keyBindingOptions;else keyBindingOptions = cache[23];
  Oo(keyBindings, keyBindingOptions);
  let onFocusCb;
  if (cache[24] !== acceptFeedback || cache[25] !== noInputMode || cache[26] !== rejectFeedback || cache[27] !== yesInputMode) onFocusCb = focusValue => {
    if (focusValue !== "yes" && yesInputMode && !acceptFeedback.trim()) setYesInputMode(!1);
    if (focusValue !== "no" && noInputMode && !rejectFeedback.trim()) setNoInputMode(!1);
    setFocusedOption(focusValue);
  }, cache[24] = acceptFeedback, cache[25] = noInputMode, cache[26] = rejectFeedback, cache[27] = yesInputMode, cache[28] = onFocusCb;else onFocusCb = cache[28];
  let onFocus = onFocusCb,
    onInputModeToggleCb;
  if (cache[29] !== toolAnalytics || cache[30] !== noInputMode || cache[31] !== yesInputMode) onInputModeToggleCb = toggleValue => {
    if (toggleValue === "yes") {
      if (yesInputMode) setYesInputMode(!1), W("tengu_accept_feedback_mode_collapsed", toolAnalytics);else setYesInputMode(!0), setAcceptFeedbackEntered(!0), W("tengu_accept_feedback_mode_entered", toolAnalytics);
    } else if (toggleValue === "no") if (noInputMode) setNoInputMode(!1), W("tengu_reject_feedback_mode_collapsed", toolAnalytics);else setNoInputMode(!0), setRejectFeedbackEntered(!0), W("tengu_reject_feedback_mode_entered", toolAnalytics);
  }, cache[29] = toolAnalytics, cache[30] = noInputMode, cache[31] = yesInputMode, cache[32] = onInputModeToggleCb;else onInputModeToggleCb = cache[32];
  let onInputModeToggle = onInputModeToggleCb,
    symlinkWarning;
  if (cache[33] !== request.symlinkTarget) symlinkWarning = request.symlinkTarget ? vS.jsx($, {
    paddingX: 1,
    marginBottom: 1,
    children: vS.jsx(v, {
      color: "warning",
      children: $Zl.relative(Lt(), request.symlinkTarget).startsWith("..") ? `This will modify ${request.symlinkTarget} (outside working directory) via a symlink` : `Symlink target: ${request.symlinkTarget}`
    })
  }) : null, cache[33] = request.symlinkTarget, cache[34] = symlinkWarning;else symlinkWarning = cache[34];
  let symlinkWarningNode = symlinkWarning,
    onChangeCb;
  if (cache[35] !== acceptFeedback || cache[36] !== options || cache[37] !== rejectFeedback || cache[38] !== submitAnswer) onChangeCb = changedValue => {
    let matchedOption = options.find(candidate => candidate.value === changedValue);
    if (!matchedOption) return;
    if (matchedOption.option.type === "reject") {
      let trimmedReject = rejectFeedback.trim();
      submitAnswer(matchedOption.option, trimmedReject || void 0);
      return;
    }
    if (matchedOption.option.type === "accept-once") {
      let trimmedAccept = acceptFeedback.trim();
      submitAnswer(matchedOption.option, trimmedAccept || void 0);
      return;
    }
    submitAnswer(matchedOption.option);
  }, cache[35] = acceptFeedback, cache[36] = options, cache[37] = rejectFeedback, cache[38] = submitAnswer, cache[39] = onChangeCb;else onChangeCb = cache[39];
  let onChange = onChangeCb,
    onCancelCb;
  if (cache[40] !== submitAnswer) onCancelCb = () => {
    submitAnswer({
      type: "reject"
    });
  }, cache[40] = submitAnswer, cache[41] = onCancelCb;else onCancelCb = cache[41];
  let onCancel = onCancelCb;
  if (request.showingDiffInIDE) {
    let ideTitle = `Opened changes in ${request.ideName ?? "IDE"} ⧉`,
      saveHint;
    if (cache[42] === Symbol.for("react.memo_cache_sentinel")) saveHint = tFt() && vS.jsx($, {
      paddingX: 1,
      marginBottom: 1,
      children: vS.jsx(v, {
        dimColor: !0,
        children: "Save file to continue…"
      })
    }), cache[42] = saveHint;else saveHint = cache[42];
    let questionNode;
    if (cache[43] !== request.question) questionNode = typeof request.question === "string" ? vS.jsx(v, {
      children: request.question
    }) : request.question, cache[43] = request.question, cache[44] = questionNode;else questionNode = cache[44];
    let ideOptions = options,
      ideSelect;
    if (cache[45] !== onCancel || cache[46] !== onFocus || cache[47] !== onInputModeToggle || cache[48] !== onChange || cache[49] !== ideOptions) ideSelect = vS.jsx(hr, {
      options: ideOptions,
      inlineDescriptions: !0,
      onChange: onChange,
      onCancel: onCancel,
      onFocus: onFocus,
      onInputModeToggle: onInputModeToggle
    }), cache[45] = onCancel, cache[46] = onFocus, cache[47] = onInputModeToggle, cache[48] = onChange, cache[49] = ideOptions, cache[50] = ideSelect;else ideSelect = cache[50];
    let ideBody;
    if (cache[51] !== questionNode || cache[52] !== ideSelect) ideBody = vS.jsxs($, {
      flexDirection: "column",
      paddingX: 1,
      children: [questionNode, ideSelect]
    }), cache[51] = questionNode, cache[52] = ideSelect, cache[53] = ideBody;else ideBody = cache[53];
    let idePanel;
    if (cache[54] !== request.requestSource || cache[55] !== request.subtitle || cache[56] !== symlinkWarningNode || cache[57] !== ideTitle || cache[58] !== ideBody) idePanel = vS.jsxs(hm, {
      title: ideTitle,
      subtitle: request.subtitle,
      innerPaddingX: 0,
      requestSource: request.requestSource,
      children: [symlinkWarningNode, saveHint, ideBody]
    }), cache[54] = request.requestSource, cache[55] = request.subtitle, cache[56] = symlinkWarningNode, cache[57] = ideTitle, cache[58] = ideBody, cache[59] = idePanel;else idePanel = cache[59];
    let escapeHint;
    if (cache[60] === Symbol.for("react.memo_cache_sentinel")) escapeHint = vS.jsx(at, {
      chord: "escape",
      action: "cancel"
    }), cache[60] = escapeHint;else escapeHint = cache[60];
    let amendHint;
    if (cache[61] !== focusedOption || cache[62] !== noInputMode || cache[63] !== yesInputMode) amendHint = (focusedOption === "yes" && !yesInputMode || focusedOption === "no" && !noInputMode) && vS.jsx(at, {
      chord: "tab",
      action: "amend"
    }), cache[61] = focusedOption, cache[62] = noInputMode, cache[63] = yesInputMode, cache[64] = amendHint;else amendHint = cache[64];
    let ideFooter;
    if (cache[65] !== amendHint) ideFooter = vS.jsx($, {
      paddingX: 1,
      marginTop: 1,
      children: vS.jsx(v, {
        dimColor: !0,
        children: vS.jsxs(bn, {
          children: [escapeHint, amendHint]
        })
      })
    }), cache[65] = amendHint, cache[66] = ideFooter;else ideFooter = cache[66];
    let ideTree;
    if (cache[67] !== idePanel || cache[68] !== ideFooter) ideTree = vS.jsxs(vS.Fragment, {
      children: [idePanel, ideFooter]
    }), cache[67] = idePanel, cache[68] = ideFooter, cache[69] = ideTree;else ideTree = cache[69];
    return ideTree;
  }
  let questionNode;
  if (cache[70] !== request.question) questionNode = typeof request.question === "string" ? vS.jsx(v, {
    children: request.question
  }) : request.question, cache[70] = request.question, cache[71] = questionNode;else questionNode = cache[71];
  let inlineOptions = options,
    inlineSelect;
  if (cache[72] !== onCancel || cache[73] !== onFocus || cache[74] !== onInputModeToggle || cache[75] !== onChange || cache[76] !== inlineOptions) inlineSelect = vS.jsx(hr, {
    options: inlineOptions,
    inlineDescriptions: !0,
    onChange: onChange,
    onCancel: onCancel,
    onFocus: onFocus,
    onInputModeToggle: onInputModeToggle
  }), cache[72] = onCancel, cache[73] = onFocus, cache[74] = onInputModeToggle, cache[75] = onChange, cache[76] = inlineOptions, cache[77] = inlineSelect;else inlineSelect = cache[77];
  let inlineBody;
  if (cache[78] !== questionNode || cache[79] !== inlineSelect) inlineBody = vS.jsxs($, {
    flexDirection: "column",
    paddingX: 1,
    children: [questionNode, inlineSelect]
  }), cache[78] = questionNode, cache[79] = inlineSelect, cache[80] = inlineBody;else inlineBody = cache[80];
  let inlinePanel;
  if (cache[81] !== request.content || cache[82] !== request.requestSource || cache[83] !== request.subtitle || cache[84] !== request.title || cache[85] !== symlinkWarningNode || cache[86] !== inlineBody) inlinePanel = vS.jsxs(hm, {
    title: request.title,
    subtitle: request.subtitle,
    innerPaddingX: 0,
    requestSource: request.requestSource,
    children: [symlinkWarningNode, request.content, inlineBody]
  }), cache[81] = request.content, cache[82] = request.requestSource, cache[83] = request.subtitle, cache[84] = request.title, cache[85] = symlinkWarningNode, cache[86] = inlineBody, cache[87] = inlinePanel;else inlinePanel = cache[87];
  let inlineEscapeHint;
  if (cache[88] === Symbol.for("react.memo_cache_sentinel")) inlineEscapeHint = vS.jsx(at, {
    chord: "escape",
    action: "cancel"
  }), cache[88] = inlineEscapeHint;else inlineEscapeHint = cache[88];
  let inlineAmendHint;
  if (cache[89] !== focusedOption || cache[90] !== noInputMode || cache[91] !== yesInputMode) inlineAmendHint = (focusedOption === "yes" && !yesInputMode || focusedOption === "no" && !noInputMode) && vS.jsx(at, {
    chord: "tab",
    action: "amend"
  }), cache[89] = focusedOption, cache[90] = noInputMode, cache[91] = yesInputMode, cache[92] = inlineAmendHint;else inlineAmendHint = cache[92];
  let inlineFooter;
  if (cache[93] !== inlineAmendHint) inlineFooter = vS.jsx($, {
    paddingX: 1,
    marginTop: 1,
    children: vS.jsx(v, {
      dimColor: !0,
      children: vS.jsxs(bn, {
        children: [inlineEscapeHint, inlineAmendHint]
      })
    })
  }), cache[93] = inlineAmendHint, cache[94] = inlineFooter;else inlineFooter = cache[94];
  let inlineTree;
  if (cache[95] !== inlinePanel || cache[96] !== inlineFooter) inlineTree = vS.jsxs(vS.Fragment, {
    children: [inlinePanel, inlineFooter]
  }), cache[95] = inlinePanel, cache[96] = inlineFooter, cache[97] = inlineTree;else inlineTree = cache[97];
  return inlineTree;
}

/** Predicate: the option offers a session-scoped accept. */
function k9m(entry) {
  return entry.option.type === "accept-session";
}

/** Selector: extracts the tool permission context. */
function H9m(state) {
  return state.toolPermissionContext;
}
var UZl, $Zl, XOe, vS;
var WZl = b(() => {
  Ol();
  Is();
  Wo();
  BZl();
  DI();
  je();
  ss();
  kt();
  vu();
  uo();
  ry();
  Po();
  uS();
  Xm();
  UZl = x(tt(), 1), $Zl = require("path"), XOe = x(et(), 1), vS = x(oe(), 1);
});

export {mapFileEditPermissionAnswer as w9m,FileEditPermissionDialog as qZl,k9m,H9m,UZl,$Zl,XOe,vS,WZl};
