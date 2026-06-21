// @ts-nocheck
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {Ite as Ste,ict as Mlt} from "../../vendor/m3937.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {renderModelName as Op,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {cx as ix,iW as j5} from "../../vendor/m2798.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function AdvisorBlock(props) {
  let memoCache = reactCompilerRuntime.c(30),
    {
      block: block,
      addMargin: addMargin,
      resolvedToolUseIDs: resolvedToolUseIDs,
      erroredToolUseIDs: erroredToolUseIDs,
      shouldAnimate: shouldAnimate,
      verbose: verbose,
      advisorModel: advisorModel
    } = props;
  if (block.type === "server_tool_use") {
    let inputSummary;
    if (memoCache[0] !== block.input) inputSummary = block.input && Object.keys(block.input).length > 0 ? Oe(block.input) : null, memoCache[0] = block.input, memoCache[1] = inputSummary;else inputSummary = memoCache[1];
    let summaryText = inputSummary,
      marginTop = addMargin ? 1 : 0,
      isResolved;
    if (memoCache[2] !== block.id || memoCache[3] !== resolvedToolUseIDs) isResolved = resolvedToolUseIDs.has(block.id), memoCache[2] = block.id, memoCache[3] = resolvedToolUseIDs, memoCache[4] = isResolved;else isResolved = memoCache[4];
    let isUnresolved = !isResolved,
      isError;
    if (memoCache[5] !== block.id || memoCache[6] !== erroredToolUseIDs) isError = erroredToolUseIDs.has(block.id), memoCache[5] = block.id, memoCache[6] = erroredToolUseIDs, memoCache[7] = isError;else isError = memoCache[7];
    let statusIcon;
    if (memoCache[8] !== shouldAnimate || memoCache[9] !== isUnresolved || memoCache[10] !== isError) statusIcon = xW.default.createElement(Ste, {
      shouldAnimate: shouldAnimate,
      isUnresolved: isUnresolved,
      isError: isError
    }), memoCache[8] = shouldAnimate, memoCache[9] = isUnresolved, memoCache[10] = isError, memoCache[11] = statusIcon;else statusIcon = memoCache[11];
    let advisingLabel;
    if (memoCache[12] === Symbol.for("react.memo_cache_sentinel")) advisingLabel = xW.default.createElement(w, {
      bold: true
    }, "Advising"), memoCache[12] = advisingLabel;else advisingLabel = memoCache[12];
    let modelLabel;
    if (memoCache[13] !== advisorModel) modelLabel = advisorModel ? xW.default.createElement(w, {
      dimColor: true
    }, " using ", Op(advisorModel)) : null, memoCache[13] = advisorModel, memoCache[14] = modelLabel;else modelLabel = memoCache[14];
    let inputLabel;
    if (memoCache[15] !== summaryText) inputLabel = summaryText ? xW.default.createElement(w, {
      dimColor: true
    }, " \xB7 ", summaryText) : null, memoCache[15] = summaryText, memoCache[16] = inputLabel;else inputLabel = memoCache[16];
    let statusRow;
    if (memoCache[17] !== marginTop || memoCache[18] !== statusIcon || memoCache[19] !== modelLabel || memoCache[20] !== inputLabel) statusRow = xW.default.createElement(B, {
      marginTop: marginTop,
      paddingRight: 2,
      flexDirection: "row"
    }, statusIcon, advisingLabel, modelLabel, inputLabel), memoCache[17] = marginTop, memoCache[18] = statusIcon, memoCache[19] = modelLabel, memoCache[20] = inputLabel, memoCache[21] = statusRow;else statusRow = memoCache[21];
    return statusRow;
  }
  let resultContent;
  e: switch (block.content.type) {
    case "advisor_tool_result_error":
      {
        let errorElement;
        if (memoCache[22] !== block.content.error_code) errorElement = xW.default.createElement(w, {
          color: "error"
        }, "Advisor unavailable (", block.content.error_code, ")"), memoCache[22] = block.content.error_code, memoCache[23] = errorElement;else errorElement = memoCache[23];
        resultContent = errorElement;
        break e;
      }
    case "advisor_result":
      {
        let resultElement;
        if (memoCache[24] !== block.content.text || memoCache[25] !== verbose) resultElement = verbose ? xW.default.createElement(w, {
          dimColor: true
        }, block.content.text) : xW.default.createElement(w, {
          dimColor: true
        }, Ze.tick, " Advisor has reviewed the conversation and will apply the feedback ", xW.default.createElement(ix, null)), memoCache[24] = block.content.text, memoCache[25] = verbose, memoCache[26] = resultElement;else resultElement = memoCache[26];
        resultContent = resultElement;
        break e;
      }
    case "advisor_redacted_result":
      {
        let redactedElement;
        if (memoCache[27] === Symbol.for("react.memo_cache_sentinel")) redactedElement = xW.default.createElement(w, {
          dimColor: true
        }, Ze.tick, " Advisor has reviewed the conversation and will apply the feedback"), memoCache[27] = redactedElement;else redactedElement = memoCache[27];
        resultContent = redactedElement;
      }
  }
  let resultRow;
  if (memoCache[28] !== resultContent) resultRow = xW.default.createElement(B, {
    paddingRight: 2
  }, xW.default.createElement(qn, null, resultContent)), memoCache[28] = resultContent, memoCache[29] = resultRow;else resultRow = memoCache[29];
  return resultRow;
}
var reactCompilerRuntime, xW;
var oLa = b(() => {
  pi();
  Je();
  Fo();
  Xt();
  j5();
  rc();
  Mlt();
  reactCompilerRuntime = L(nt(), 1), xW = L(Te(), 1);
});

export {AdvisorBlock as TMa,reactCompilerRuntime as yMa,xW as KW,oLa as SMa};
