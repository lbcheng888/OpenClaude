// @ts-nocheck
import {ktr,vtr,wtr,Htr} from "../../vendor/m5481.ts";
import {getOriginalCwd as gr,lt} from "../session/0132_sent.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Pi,vu} from "../mcp/2200_mcpServerName.ts";
import {zXt,lr} from "../../vendor/m233.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {gU,MSe} from "../../vendor/m5444.ts";
import {ZOe,pzt} from "../tui/5491_options.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Tool-use permission prompt behavior + rendering.
 *
 * - `L9m` maps a user's answer ("yes" / "yes-dont-ask-again" / "no" / ...)
 *   to a permission-result object (allow / deny, optional rule updates, feedback).
 * - `VBo` decides whether the "always allow" option should be offered.
 * - `YZl` is the React component that renders the tool-use permission prompt,
 *   memoized via the React Compiler cache (`jZl.c(...)`).
 */

/**
 * Translate a user's selected answer into a permission-result object.
 *
 * @param answerValue   The selected option value (e.g. "yes", "no", "yes-dont-ask-again").
 * @param promptPayload The permission prompt payload (carries `input`, `toolName`).
 * @param feedbackText  Optional free-text feedback to attach to the result.
 */
function L9m(answerValue: any, promptPayload: any, feedbackText?: any) {
  switch (answerValue) {
    case "yes":
    case "yes-enable-auto-mode":
      return {
        behavior: "allow",
        updatedInput: promptPayload.input,
        ...(feedbackText && {
          feedback: feedbackText
        })
      };
    case "yes-dont-ask-again":
      return {
        behavior: "allow",
        updatedInput: promptPayload.input,
        permissionUpdates: [{
          type: "addRules",
          rules: [{
            toolName: promptPayload.toolName
          }],
          behavior: "allow",
          destination: "localSettings"
        }]
      };
    case "no":
      return {
        behavior: "deny",
        ...(feedbackText && {
          feedback: feedbackText
        })
      };
  }
}

/**
 * Whether the "always allow / don't ask again" option should be shown for this prompt.
 * Suppressed when a safety-check classifier flagged the request as not classifier-approvable,
 * or when the org has capped asking.
 */
function VBo(payload: any) {
  let decisionReason = payload.permissionResult.decisionReason,
    isUnapprovableSafetyCheck = decisionReason?.type === "safetyCheck" && !decisionReason.classifierApprovable;
  return payload.showAlwaysAllow && !isUnapprovableSafetyCheck && !payload.isAskCappedByOrg;
}

/**
 * React component rendering the tool-use permission prompt.
 * Uses the React Compiler memoization cache so each derived value is only
 * recomputed when its tracked dependencies change.
 *
 * @param props `{ payload, answer }` — the prompt payload and the answer callback.
 */
function YZl(props: any) {
  let cache = jZl.c(55),
    {
      payload: prompt,
      answer: onAnswer
    } = props,
    showAlwaysAllow;
  if (cache[0] !== prompt) showAlwaysAllow = VBo(prompt), cache[0] = prompt, cache[1] = showAlwaysAllow;else showAlwaysAllow = cache[1];
  let canShowAlwaysAllow = showAlwaysAllow,
    {
      offered: autoModeOffered,
      enableAutoMode: enableAutoMode
    } = ktr(prompt.requestSource),
    handleSelect;
  if (cache[2] !== onAnswer || cache[3] !== enableAutoMode || cache[4] !== prompt) handleSelect = (selectedValue, feedbackText) => {
    if (selectedValue === "yes-enable-auto-mode") enableAutoMode();
    onAnswer(L9m(selectedValue, prompt, feedbackText));
  }, cache[2] = onAnswer, cache[3] = enableAutoMode, cache[4] = prompt, cache[5] = handleSelect;else handleSelect = cache[5];
  let onSelect = handleSelect,
    handleCancel;
  if (cache[6] !== onAnswer) handleCancel = () => {
    onAnswer({
      behavior: "cancelled"
    });
  }, cache[6] = onAnswer, cache[7] = handleCancel;else handleCancel = cache[7];
  let onCancel = handleCancel,
    cmdLabel;
  if (cache[8] === Symbol.for("react.memo_cache_sentinel")) cmdLabel = gr(), cache[8] = cmdLabel;else cmdLabel = cache[8];
  let commandLabel = cmdLabel,
    yesOpt;
  if (cache[9] === Symbol.for("react.memo_cache_sentinel")) yesOpt = {
    label: "Yes",
    value: "yes",
    feedbackConfig: {
      type: "accept"
    }
  }, cache[9] = yesOpt;else yesOpt = cache[9];
  let options;
  if (cache[10] !== autoModeOffered || cache[11] !== prompt.userFacingName || cache[12] !== canShowAlwaysAllow) {
    if (options = [yesOpt], canShowAlwaysAllow) {
      let nameNode;
      if (cache[14] !== prompt.userFacingName) nameNode = _U.jsx(v, {
        bold: !0,
        children: prompt.userFacingName
      }), cache[14] = prompt.userFacingName, cache[15] = nameNode;else nameNode = cache[15];
      let commandNode;
      if (cache[16] === Symbol.for("react.memo_cache_sentinel")) commandNode = _U.jsx(v, {
        bold: !0,
        children: commandLabel
      }), cache[16] = commandNode;else commandNode = cache[16];
      let dontAskOpt;
      if (cache[17] !== nameNode) dontAskOpt = {
        label: _U.jsxs(v, {
          children: ["Yes, and don't ask again for", " ", nameNode, " commands in", " ", commandNode]
        }),
        value: "yes-dont-ask-again"
      }, cache[17] = nameNode, cache[18] = dontAskOpt;else dontAskOpt = cache[18];
      options.push(dontAskOpt);
    }
    if (autoModeOffered) {
      let autoModeOpt;
      if (cache[19] === Symbol.for("react.memo_cache_sentinel")) autoModeOpt = {
        label: vtr,
        description: wtr,
        value: "yes-enable-auto-mode"
      }, cache[19] = autoModeOpt;else autoModeOpt = cache[19];
      options.push(autoModeOpt);
    }
    let noOpt;
    if (cache[20] === Symbol.for("react.memo_cache_sentinel")) noOpt = {
      label: "No",
      value: "no",
      feedbackConfig: {
        type: "reject"
      }
    }, cache[20] = noOpt;else noOpt = cache[20];
    options.push(noOpt), cache[10] = autoModeOffered, cache[11] = prompt.userFacingName, cache[12] = canShowAlwaysAllow, cache[13] = options;
  } else options = cache[13];
  let selectOptions = options,
    resolvedToolName;
  if (cache[21] !== prompt.toolName) resolvedToolName = Pi(prompt.toolName), cache[21] = prompt.toolName, cache[22] = resolvedToolName;else resolvedToolName = cache[22];
  let analyticsCtx;
  if (cache[23] !== prompt.isMcp || cache[24] !== resolvedToolName) analyticsCtx = {
    toolName: resolvedToolName,
    isMcp: prompt.isMcp
  }, cache[23] = prompt.isMcp, cache[24] = resolvedToolName, cache[25] = analyticsCtx;else analyticsCtx = cache[25];
  let toolAnalyticsContext = analyticsCtx,
    requestSource = prompt.requestSource,
    toolUseMessageNode;
  if (cache[26] !== prompt.renderedToolUseMessage) toolUseMessageNode = prompt.renderedToolUseMessage !== "" && _U.jsxs(_U.Fragment, {
    children: ["(", prompt.renderedToolUseMessage, ")"]
  }), cache[26] = prompt.renderedToolUseMessage, cache[27] = toolUseMessageNode;else toolUseMessageNode = cache[27];
  let mcpSuffixNode;
  if (cache[28] !== prompt.hasMcpSuffix) mcpSuffixNode = prompt.hasMcpSuffix ? _U.jsx(v, {
    dimColor: !0,
    children: " (MCP)"
  }) : "", cache[28] = prompt.hasMcpSuffix, cache[29] = mcpSuffixNode;else mcpSuffixNode = cache[29];
  let titleNode;
  if (cache[30] !== prompt.userFacingName || cache[31] !== mcpSuffixNode || cache[32] !== toolUseMessageNode) titleNode = _U.jsxs(v, {
    children: [prompt.userFacingName, toolUseMessageNode, mcpSuffixNode]
  }), cache[30] = prompt.userFacingName, cache[31] = mcpSuffixNode, cache[32] = toolUseMessageNode, cache[33] = titleNode;else titleNode = cache[33];
  let truncatedDescription;
  if (cache[34] !== prompt.description) truncatedDescription = zXt(prompt.description, 3), cache[34] = prompt.description, cache[35] = truncatedDescription;else truncatedDescription = cache[35];
  let descriptionNode;
  if (cache[36] !== truncatedDescription) descriptionNode = _U.jsx(v, {
    dimColor: !0,
    children: truncatedDescription
  }), cache[36] = truncatedDescription, cache[37] = descriptionNode;else descriptionNode = cache[37];
  let headerNode;
  if (cache[38] !== titleNode || cache[39] !== descriptionNode) headerNode = _U.jsxs($, {
    flexDirection: "column",
    paddingX: 2,
    paddingY: 1,
    children: [titleNode, descriptionNode]
  }), cache[38] = titleNode, cache[39] = descriptionNode, cache[40] = headerNode;else headerNode = cache[40];
  let permissionDetailNode;
  if (cache[41] !== prompt.permissionResult) permissionDetailNode = _U.jsx(gU, {
    permissionResult: prompt.permissionResult,
    toolType: "tool"
  }), cache[41] = prompt.permissionResult, cache[42] = permissionDetailNode;else permissionDetailNode = cache[42];
  let optionsListNode;
  if (cache[43] !== onCancel || cache[44] !== onSelect || cache[45] !== selectOptions || cache[46] !== toolAnalyticsContext) optionsListNode = _U.jsx(ZOe, {
    options: selectOptions,
    onSelect: onSelect,
    onCancel: onCancel,
    toolAnalyticsContext: toolAnalyticsContext
  }), cache[43] = onCancel, cache[44] = onSelect, cache[45] = selectOptions, cache[46] = toolAnalyticsContext, cache[47] = optionsListNode;else optionsListNode = cache[47];
  let bodyNode;
  if (cache[48] !== permissionDetailNode || cache[49] !== optionsListNode) bodyNode = _U.jsxs($, {
    flexDirection: "column",
    children: [permissionDetailNode, optionsListNode]
  }), cache[48] = permissionDetailNode, cache[49] = optionsListNode, cache[50] = bodyNode;else bodyNode = cache[50];
  let promptNode;
  if (cache[51] !== prompt.requestSource || cache[52] !== headerNode || cache[53] !== bodyNode) promptNode = _U.jsxs(hm, {
    title: "Tool use",
    requestSource: requestSource,
    children: [headerNode, bodyNode]
  }), cache[51] = prompt.requestSource, cache[52] = headerNode, cache[53] = bodyNode, cache[54] = promptNode;else promptNode = cache[54];
  return promptNode;
}
var jZl: any, _U: any;
var KBo = b(() => {
  lt();
  DI();
  pzt();
  MSe();
  Htr();
  je();
  vu();
  lr();
  jZl = x(tt(), 1), _U = x(oe(), 1);
});

export {L9m,VBo,YZl,jZl,_U,KBo};
