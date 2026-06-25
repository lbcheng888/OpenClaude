// @ts-nocheck
import {bo,uo} from "../../vendor/m2468.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Confirmation / permission-request options prompt.
 *
 * Renders a list of selectable options (accept / reject / etc.) for a tool
 * permission request. When an option carries a `feedbackConfig`, selecting it
 * can expand into an inline text input where the user tells Claude what to do
 * next (accept) or what to do differently (reject). Emits tengu_* analytics for
 * feedback-mode enter/collapse and submission.
 *
 * React-Compiler memoized: `memoCache` (t) is the per-render memoization slot
 * array produced by GZl.c(57).
 */
function ZOe(props) {
  let memoCache = GZl.c(57),
    {
      options,
      onSelect,
      onCancel,
      question,
      toolAnalyticsContext
    } = props,
    questionText = question === void 0 ? "Do you want to proceed?" : question,
    updateConfig = bo(),
    [acceptInstructions, setAcceptInstructions] = QOe.useState(""),
    [rejectInstructions, setRejectInstructions] = QOe.useState(""),
    [acceptFeedbackOpen, setAcceptFeedbackOpen] = QOe.useState(!1),
    [rejectFeedbackOpen, setRejectFeedbackOpen] = QOe.useState(!1),
    [focusedValue, setFocusedValue] = QOe.useState(null),
    [acceptModeEntered, setAcceptModeEntered] = QOe.useState(!1),
    [rejectModeEntered, setRejectModeEntered] = QOe.useState(!1),
    focusedOption;
  if (memoCache[0] !== focusedValue || memoCache[1] !== options) {
    let matchFocused;
    if (memoCache[3] !== focusedValue) matchFocused = opt => opt.value === focusedValue, memoCache[3] = focusedValue, memoCache[4] = matchFocused;else matchFocused = memoCache[4];
    focusedOption = options.find(matchFocused), memoCache[0] = focusedValue, memoCache[1] = options, memoCache[2] = focusedOption;
  } else focusedOption = memoCache[2];
  let focusedFeedbackType = focusedOption?.feedbackConfig?.type,
    /** True when the currently focused option supports feedback but its inline input is not yet open (so Tab can amend). */
    canAmend = focusedFeedbackType === "accept" && !acceptFeedbackOpen || focusedFeedbackType === "reject" && !rejectFeedbackOpen,
    mappedOptions;
  if (memoCache[5] !== acceptFeedbackOpen || memoCache[6] !== options || memoCache[7] !== rejectFeedbackOpen) {
    let mapOption;
    if (memoCache[9] !== acceptFeedbackOpen || memoCache[10] !== rejectFeedbackOpen) mapOption = opt => {
      let {
        value: optValue,
        label: optLabel,
        feedbackConfig
      } = opt;
      if (!feedbackConfig) return {
        label: optLabel,
        value: optValue,
        description: opt.description
      };
      let {
          type: feedbackType,
          placeholder
        } = feedbackConfig,
        isFeedbackOpen = feedbackType === "accept" ? acceptFeedbackOpen : rejectFeedbackOpen,
        onChange = feedbackType === "accept" ? setAcceptInstructions : setRejectInstructions,
        defaultPlaceholder = I9m[feedbackType];
      if (isFeedbackOpen) return {
        type: "input",
        label: optLabel,
        value: optValue,
        placeholder: placeholder ?? defaultPlaceholder,
        onChange,
        allowEmptySubmitToCancel: !0
      };
      return {
        label: optLabel,
        value: optValue,
        description: opt.description
      };
    }, memoCache[9] = acceptFeedbackOpen, memoCache[10] = rejectFeedbackOpen, memoCache[11] = mapOption;else mapOption = memoCache[11];
    mappedOptions = options.map(mapOption), memoCache[5] = acceptFeedbackOpen, memoCache[6] = options, memoCache[7] = rejectFeedbackOpen, memoCache[8] = mappedOptions;
  } else mappedOptions = memoCache[8];
  let renderOptions = mappedOptions,
    handleInputModeToggle;
  if (memoCache[12] !== acceptFeedbackOpen || memoCache[13] !== options || memoCache[14] !== rejectFeedbackOpen || memoCache[15] !== toolAnalyticsContext?.isMcp || memoCache[16] !== toolAnalyticsContext?.toolName) handleInputModeToggle = value => {
    let opt = options.find(candidate => candidate.value === value);
    if (!opt?.feedbackConfig) return;
    let {
        type: feedbackType
      } = opt.feedbackConfig,
      analytics = {
        toolName: toolAnalyticsContext?.toolName,
        isMcp: toolAnalyticsContext?.isMcp ?? !1
      };
    if (feedbackType === "accept") {
      if (acceptFeedbackOpen) setAcceptFeedbackOpen(!1), W("tengu_accept_feedback_mode_collapsed", analytics);else setAcceptFeedbackOpen(!0), setAcceptModeEntered(!0), W("tengu_accept_feedback_mode_entered", analytics);
    } else if (feedbackType === "reject") if (rejectFeedbackOpen) setRejectFeedbackOpen(!1), W("tengu_reject_feedback_mode_collapsed", analytics);else setRejectFeedbackOpen(!0), setRejectModeEntered(!0), W("tengu_reject_feedback_mode_entered", analytics);
  }, memoCache[12] = acceptFeedbackOpen, memoCache[13] = options, memoCache[14] = rejectFeedbackOpen, memoCache[15] = toolAnalyticsContext?.isMcp, memoCache[16] = toolAnalyticsContext?.toolName, memoCache[17] = handleInputModeToggle;else handleInputModeToggle = memoCache[17];
  let onInputModeToggle = handleInputModeToggle,
    handleSubmit;
  if (memoCache[18] !== acceptInstructions || memoCache[19] !== acceptModeEntered || memoCache[20] !== onSelect || memoCache[21] !== options || memoCache[22] !== rejectInstructions || memoCache[23] !== rejectModeEntered || memoCache[24] !== toolAnalyticsContext?.isMcp || memoCache[25] !== toolAnalyticsContext?.toolName) handleSubmit = value => {
    let opt = options.find(candidate => candidate.value === value);
    if (!opt) return;
    let instructions;
    if (opt.feedbackConfig) {
      let trimmed = (opt.feedbackConfig.type === "accept" ? acceptInstructions : rejectInstructions).trim();
      if (trimmed) instructions = trimmed;
      let analytics = {
        toolName: toolAnalyticsContext?.toolName,
        isMcp: toolAnalyticsContext?.isMcp ?? !1,
        has_instructions: !!trimmed,
        instructions_length: trimmed?.length ?? 0,
        entered_feedback_mode: opt.feedbackConfig.type === "accept" ? acceptModeEntered : rejectModeEntered
      };
      if (opt.feedbackConfig.type === "accept") W("tengu_accept_submitted", analytics);else if (opt.feedbackConfig.type === "reject") W("tengu_reject_submitted", analytics);
    }
    onSelect(value, instructions);
  }, memoCache[18] = acceptInstructions, memoCache[19] = acceptModeEntered, memoCache[20] = onSelect, memoCache[21] = options, memoCache[22] = rejectInstructions, memoCache[23] = rejectModeEntered, memoCache[24] = toolAnalyticsContext?.isMcp, memoCache[25] = toolAnalyticsContext?.toolName, memoCache[26] = handleSubmit;else handleSubmit = memoCache[26];
  let onChangeValue = handleSubmit,
    keybindingMap;
  if (memoCache[27] !== onChangeValue || memoCache[28] !== options) {
    keybindingMap = {};
    for (let opt of options) if (opt.keybinding) keybindingMap[opt.keybinding] = () => onChangeValue(opt.value);
    memoCache[27] = onChangeValue, memoCache[28] = options, memoCache[29] = keybindingMap;
  } else keybindingMap = memoCache[29];
  let keybindings = keybindingMap,
    keybindingOptions;
  if (memoCache[30] === Symbol.for("react.memo_cache_sentinel")) keybindingOptions = {
    context: "Confirmation"
  }, memoCache[30] = keybindingOptions;else keybindingOptions = memoCache[30];
  Oo(keybindings, keybindingOptions);
  let handleCancelMemo;
  if (memoCache[31] !== onCancel || memoCache[32] !== updateConfig) handleCancelMemo = () => {
    W("tengu_permission_request_escape", {}), updateConfig(x9m), onCancel?.();
  }, memoCache[31] = onCancel, memoCache[32] = updateConfig, memoCache[33] = handleCancelMemo;else handleCancelMemo = memoCache[33];
  let handleCancel = handleCancelMemo,
    questionNode;
  if (memoCache[34] !== questionText) questionNode = typeof questionText === "string" ? fde.jsx(v, {
    children: questionText
  }) : questionText, memoCache[34] = questionText, memoCache[35] = questionNode;else questionNode = memoCache[35];
  let handleFocus;
  if (memoCache[36] !== acceptInstructions || memoCache[37] !== acceptFeedbackOpen || memoCache[38] !== options || memoCache[39] !== rejectInstructions || memoCache[40] !== rejectFeedbackOpen) handleFocus = value => {
    let opt = options.find(candidate => candidate.value === value);
    if (opt?.feedbackConfig?.type !== "accept" && acceptFeedbackOpen && !acceptInstructions.trim()) setAcceptFeedbackOpen(!1);
    if (opt?.feedbackConfig?.type !== "reject" && rejectFeedbackOpen && !rejectInstructions.trim()) setRejectFeedbackOpen(!1);
    setFocusedValue(value);
  }, memoCache[36] = acceptInstructions, memoCache[37] = acceptFeedbackOpen, memoCache[38] = options, memoCache[39] = rejectInstructions, memoCache[40] = rejectFeedbackOpen, memoCache[41] = handleFocus;else handleFocus = memoCache[41];
  let selectNode;
  if (memoCache[42] !== handleCancel || memoCache[43] !== onInputModeToggle || memoCache[44] !== onChangeValue || memoCache[45] !== renderOptions || memoCache[46] !== handleFocus) selectNode = fde.jsx(hr, {
    options: renderOptions,
    inlineDescriptions: !0,
    onChange: onChangeValue,
    onCancel: handleCancel,
    onFocus: handleFocus,
    onInputModeToggle: onInputModeToggle
  }), memoCache[42] = handleCancel, memoCache[43] = onInputModeToggle, memoCache[44] = onChangeValue, memoCache[45] = renderOptions, memoCache[46] = handleFocus, memoCache[47] = selectNode;else selectNode = memoCache[47];
  let cancelHint;
  if (memoCache[48] === Symbol.for("react.memo_cache_sentinel")) cancelHint = fde.jsx(at, {
    chord: "escape",
    action: "cancel"
  }), memoCache[48] = cancelHint;else cancelHint = memoCache[48];
  let amendHint;
  if (memoCache[49] !== canAmend) amendHint = canAmend && fde.jsx(at, {
    chord: "tab",
    action: "amend"
  }), memoCache[49] = canAmend, memoCache[50] = amendHint;else amendHint = memoCache[50];
  let hintRow;
  if (memoCache[51] !== amendHint) hintRow = fde.jsx($, {
    marginTop: 1,
    children: fde.jsx(v, {
      dimColor: !0,
      children: fde.jsxs(bn, {
        children: [cancelHint, amendHint]
      })
    })
  }), memoCache[51] = amendHint, memoCache[52] = hintRow;else hintRow = memoCache[52];
  let root;
  if (memoCache[53] !== selectNode || memoCache[54] !== hintRow || memoCache[55] !== questionNode) root = fde.jsxs($, {
    flexDirection: "column",
    children: [questionNode, selectNode, hintRow]
  }), memoCache[53] = selectNode, memoCache[54] = hintRow, memoCache[55] = questionNode, memoCache[56] = root;else root = memoCache[56];
  return root;
}
/** Reducer used on escape: bumps the permission-request escape attribution counter. */
function x9m(state) {
  return {
    ...state,
    attribution: {
      ...state.attribution,
      escapeCount: state.attribution.escapeCount + 1
    }
  };
}
var GZl, QOe, fde, I9m;
var pzt = b(() => {
  je();
  ss();
  kt();
  uo();
  Ol();
  Is();
  Wo();
  GZl = x(tt(), 1), QOe = x(et(), 1), fde = x(oe(), 1), I9m = {
    accept: "tell Claude what to do next",
    reject: "tell Claude what to do differently"
  };
});

export {ZOe,x9m,GZl,QOe,fde,I9m,pzt};
