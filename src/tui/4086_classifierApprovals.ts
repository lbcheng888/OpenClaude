// @ts-nocheck
import {useTheme as ji} from "../../vendor/m2285.ts";
import {_t,gc,uo} from "../../vendor/m2468.ts";
import {lve,ri} from "../tools/2235_userFacingName.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {B6e,_3n} from "../../vendor/m4035.ts";
import {y3n,zpo} from "../../vendor/m4036.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Wrap a store `setState` so callers can update only the
 * `classifierApprovals` slice; returns the original state unchanged when the
 * inner setter produced an identical slice (avoids needless re-renders).
 */
function wrapClassifierApprovalsUpdater(setState) {
  return innerSetter => setState(state => {
    let nextApprovals = innerSetter(state.classifierApprovals);
    if (nextApprovals === state.classifierApprovals) return state;
    return {
      ...state,
      classifierApprovals: nextApprovals
    };
  });
}
/** Compute the initial approval state for a tool use (currently no-op). */
function getInitialApprovalState(state, toolUseID) {
  return;
}
/** Record an auto-mode approval (with reason) for the given tool use. */
function setAutoModeApproval(setState, toolUseID, reason) {
  if (!setState) return;
  setState(state => {
    let existing = state.approvals.get(toolUseID);
    if (existing?.classifier === "auto-mode" && existing.reason === reason) return state;
    let approvals = new Map(state.approvals);
    return approvals.set(toolUseID, {
      classifier: "auto-mode",
      reason: reason
    }), {
      ...state,
      approvals: approvals
    };
  });
}
/** Read the auto-mode approval reason for a tool use, if any. */
function getAutoModeReason(state, toolUseID) {
  let approval = state.classifierApprovals.approvals.get(toolUseID);
  if (!approval || approval.classifier !== "auto-mode") return;
  return approval.reason;
}
/** Mark a tool use as currently being checked by the classifier. */
function markToolChecking(setState, toolUseID) {
  if (!setState) return;
  setState(state => {
    if (state.checking.has(toolUseID)) return state;
    let checking = new Set(state.checking);
    return checking.add(toolUseID), {
      ...state,
      checking: checking
    };
  });
}
/** Clear the "checking" flag for a tool use. */
function clearToolChecking(setState, toolUseID) {
  if (!setState) return;
  setState(state => {
    if (!state.checking.has(toolUseID)) return state;
    let checking = new Set(state.checking);
    return checking.delete(toolUseID), {
      ...state,
      checking: checking
    };
  });
}
/** Remove any approval recorded for a tool use. */
function clearToolApproval(setState, toolUseID) {
  if (!setState) return;
  setState(state => {
    if (!state.approvals.has(toolUseID)) return state;
    let approvals = new Map(state.approvals);
    return approvals.delete(toolUseID), {
      ...state,
      approvals: approvals
    };
  });
}
/** Reset all classifier approvals and checking flags. */
function clearAllApprovals(setState) {
  if (!setState) return;
  setState(state => {
    if (state.approvals.size === 0 && state.checking.size === 0) return state;
    return {
      approvals: new Map(),
      checking: new Set()
    };
  });
}
/** Render a tool result message, annotated when it was auto-approved by the classifier. */
function ClassifierApprovalResult(props) {
  let memo = S6a.c(42),
    {
      message: message,
      lookups: lookups,
      toolUseID: toolUseID,
      progressMessagesForMessage: progressMessagesForMessage,
      style: style,
      tool: tool,
      tools: tools,
      verbose: verbose,
      width: width,
      isTranscriptMode: isTranscriptMode
    } = props,
    [theme] = ji(),
    isBriefOnly = _t(LPp),
    store = gc(),
    initialApprovalGetter;
  if (memo[0] !== store || memo[1] !== toolUseID) initialApprovalGetter = () => getInitialApprovalState(store.getState(), toolUseID), memo[0] = store, memo[1] = toolUseID, memo[2] = initialApprovalGetter;else initialApprovalGetter = memo[2];
  let [initialApproval] = t4t.useState(initialApprovalGetter),
    autoModeReasonGetter;
  if (memo[3] !== store || memo[4] !== toolUseID) autoModeReasonGetter = () => getAutoModeReason(store.getState(), toolUseID), memo[3] = store, memo[4] = toolUseID, memo[5] = autoModeReasonGetter;else autoModeReasonGetter = memo[5];
  let [autoModeReason] = t4t.useState(autoModeReasonGetter),
    cleanupApproval;
  if (memo[6] !== store.setState || memo[7] !== toolUseID) cleanupApproval = () => {
    clearToolApproval(wrapClassifierApprovalsUpdater(store.setState), toolUseID);
  }, memo[6] = store.setState, memo[7] = toolUseID, memo[8] = cleanupApproval;else cleanupApproval = memo[8];
  let cleanupDeps;
  if (memo[9] !== store || memo[10] !== toolUseID) cleanupDeps = [store, toolUseID], memo[9] = store, memo[10] = toolUseID, memo[11] = cleanupDeps;else cleanupDeps = memo[11];
  if (t4t.useEffect(cleanupApproval, cleanupDeps), !message.toolUseResult || !tool) return null;
  if (tool.isTransparentWrapper?.()) return null;
  let renderedResult, earlyReturn;
  if (memo[12] !== isBriefOnly || memo[13] !== isTranscriptMode || memo[14] !== lookups || memo[15] !== message.toolUseResult || memo[16] !== progressMessagesForMessage || memo[17] !== style || memo[18] !== theme || memo[19] !== tool || memo[20] !== toolUseID || memo[21] !== tools || memo[22] !== verbose) {
    earlyReturn = Symbol.for("react.early_return_sentinel");
    e: {
      let parsed = tool.outputSchema?.safeParse(message.toolUseResult);
      if (parsed && !parsed.success) {
        earlyReturn = null;
        break e;
      }
      let resultData = parsed?.data ?? message.toolUseResult;
      renderedResult = tool.renderToolResultMessage?.(resultData, lve(progressMessagesForMessage), {
        style: style,
        theme: theme,
        tools: tools,
        verbose: verbose,
        isTranscriptMode: isTranscriptMode,
        isBriefOnly: isBriefOnly,
        input: lookups.toolUseByToolUseID.get(toolUseID)?.input
      }) ?? null;
    }
    memo[12] = isBriefOnly, memo[13] = isTranscriptMode, memo[14] = lookups, memo[15] = message.toolUseResult, memo[16] = progressMessagesForMessage, memo[17] = style, memo[18] = theme, memo[19] = tool, memo[20] = toolUseID, memo[21] = tools, memo[22] = verbose, memo[23] = renderedResult, memo[24] = earlyReturn;
  } else renderedResult = memo[23], earlyReturn = memo[24];
  if (earlyReturn !== Symbol.for("react.early_return_sentinel")) return earlyReturn;
  let resultNode = renderedResult;
  if (resultNode === null) return null;
  let resolvedWidth = tool.userFacingName(void 0) === "" ? void 0 : width,
    initialApprovalNode;
  if (memo[25] !== initialApproval) initialApprovalNode = null, memo[25] = initialApproval, memo[26] = initialApprovalNode;else initialApprovalNode = memo[26];
  let autoModeBanner;
  if (memo[27] !== autoModeReason) autoModeBanner = autoModeReason && Cxe.jsx(Yn, {
    height: 1,
    children: Cxe.jsx(v, {
      dimColor: !0,
      children: "Allowed by auto mode classifier"
    })
  }), memo[27] = autoModeReason, memo[28] = autoModeBanner;else autoModeBanner = memo[28];
  let resultColumn;
  if (memo[29] !== resultNode || memo[30] !== resolvedWidth || memo[31] !== initialApprovalNode || memo[32] !== autoModeBanner) resultColumn = Cxe.jsxs($, {
    flexDirection: "column",
    width: resolvedWidth,
    children: [resultNode, initialApprovalNode, autoModeBanner]
  }), memo[29] = resultNode, memo[30] = resolvedWidth, memo[31] = initialApprovalNode, memo[32] = autoModeBanner, memo[33] = resultColumn;else resultColumn = memo[33];
  let postToolUseNode;
  if (memo[34] !== isTranscriptMode || memo[35] !== lookups || memo[36] !== toolUseID || memo[37] !== verbose) postToolUseNode = Cxe.jsx(B6e, {
    children: Cxe.jsx(y3n, {
      hookEvent: "PostToolUse",
      lookups: lookups,
      toolUseID: toolUseID,
      verbose: verbose,
      isTranscriptMode: isTranscriptMode
    })
  }), memo[34] = isTranscriptMode, memo[35] = lookups, memo[36] = toolUseID, memo[37] = verbose, memo[38] = postToolUseNode;else postToolUseNode = memo[38];
  let container;
  if (memo[39] !== resultColumn || memo[40] !== postToolUseNode) container = Cxe.jsxs($, {
    flexDirection: "column",
    children: [resultColumn, postToolUseNode]
  }), memo[39] = resultColumn, memo[40] = postToolUseNode, memo[41] = container;else container = memo[41];
  return container;
}
/** Selector: whether the renderer is in brief-only mode. */
function LPp(state) {
  return state.isBriefOnly;
}
var S6a, t4t, Cxe;
var E6a = b(() => {
  _3n();
  je();
  uo();
  ri();
  Pl();
  zpo();
  S6a = x(tt(), 1), t4t = x(et(), 1), Cxe = x(oe(), 1);
});
export {wrapClassifierApprovalsUpdater as bxe,getInitialApprovalState as f6a,setAutoModeApproval as h6a,getAutoModeReason as g6a,markToolChecking as _6a,clearToolChecking as Exe,clearToolApproval as y6a,clearAllApprovals as T6a,ClassifierApprovalResult as b6a,LPp,S6a,t4t,Cxe,E6a};
