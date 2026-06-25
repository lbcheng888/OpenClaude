// @ts-nocheck
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {Hte,_dt} from "../../vendor/m3999.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {renderModelName as Tp,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {bw,EW} from "../../vendor/m2811.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Renders an advisor-related tool-use / tool-result block.
 *
 * Two shapes are handled:
 *  - `server_tool_use` blocks (the in-flight "Advising" indicator with status
 *    spinner, model name, and a digest of the tool input), and
 *  - advisor tool-result blocks (`advisor_tool_result_error`,
 *    `advisor_result`, `advisor_redacted_result`).
 *
 * Uses React Compiler's memo-cache convention: `memoCache` holds memoized
 * intermediate values keyed by slot index, guarded by reference-equality
 * checks against the previously cached inputs.
 */
interface AdvisorBlockProps {
  /** The content/tool-use block to render. */
  block: any;
  /** Whether to add top margin to the rendered row. */
  addMargin: boolean;
  /** Set of tool-use IDs that have resolved. */
  resolvedToolUseIDs: Set<string>;
  /** Set of tool-use IDs that errored. */
  erroredToolUseIDs: Set<string>;
  /** Whether status indicators should animate. */
  shouldAnimate: boolean;
  /** Whether to render in verbose mode. */
  verbose: boolean;
  /** The advisor model identifier, if any. */
  advisorModel: any;
}

function $9a(props: AdvisorBlockProps) {
  let memoCache = U9a.c(30),
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
    let inputDigest;
    if (memoCache[0] !== block.input) inputDigest = block.input && Object.keys(block.input).length > 0 ? Pe(block.input) : null, memoCache[0] = block.input, memoCache[1] = inputDigest;else inputDigest = memoCache[1];
    let inputDigestText = inputDigest,
      marginTop = addMargin ? 1 : 0,
      isResolved;
    if (memoCache[2] !== block.id || memoCache[3] !== resolvedToolUseIDs) isResolved = resolvedToolUseIDs.has(block.id), memoCache[2] = block.id, memoCache[3] = resolvedToolUseIDs, memoCache[4] = isResolved;else isResolved = memoCache[4];
    let isUnresolved = !isResolved,
      isError;
    if (memoCache[5] !== block.id || memoCache[6] !== erroredToolUseIDs) isError = erroredToolUseIDs.has(block.id), memoCache[5] = block.id, memoCache[6] = erroredToolUseIDs, memoCache[7] = isError;else isError = memoCache[7];
    let statusIndicator;
    if (memoCache[8] !== shouldAnimate || memoCache[9] !== isUnresolved || memoCache[10] !== isError) statusIndicator = Vq.jsx(Hte, {
      shouldAnimate: shouldAnimate,
      isUnresolved: isUnresolved,
      isError: isError
    }), memoCache[8] = shouldAnimate, memoCache[9] = isUnresolved, memoCache[10] = isError, memoCache[11] = statusIndicator;else statusIndicator = memoCache[11];
    let advisingLabel;
    if (memoCache[12] === Symbol.for("react.memo_cache_sentinel")) advisingLabel = Vq.jsx(v, {
      bold: !0,
      children: "Advising"
    }), memoCache[12] = advisingLabel;else advisingLabel = memoCache[12];
    let modelLabel;
    if (memoCache[13] !== advisorModel) modelLabel = advisorModel ? Vq.jsxs(v, {
      dimColor: !0,
      children: [" using ", Tp(advisorModel)]
    }) : null, memoCache[13] = advisorModel, memoCache[14] = modelLabel;else modelLabel = memoCache[14];
    let inputLabel;
    if (memoCache[15] !== inputDigestText) inputLabel = inputDigestText ? Vq.jsxs(v, {
      dimColor: !0,
      children: [" \xB7 ", inputDigestText]
    }) : null, memoCache[15] = inputDigestText, memoCache[16] = inputLabel;else inputLabel = memoCache[16];
    let advisingRow;
    if (memoCache[17] !== marginTop || memoCache[18] !== statusIndicator || memoCache[19] !== modelLabel || memoCache[20] !== inputLabel) advisingRow = Vq.jsxs($, {
      marginTop: marginTop,
      paddingRight: 2,
      flexDirection: "row",
      children: [statusIndicator, advisingLabel, modelLabel, inputLabel]
    }), memoCache[17] = marginTop, memoCache[18] = statusIndicator, memoCache[19] = modelLabel, memoCache[20] = inputLabel, memoCache[21] = advisingRow;else advisingRow = memoCache[21];
    return advisingRow;
  }
  let resultContent;
  e: switch (block.content.type) {
    case "advisor_tool_result_error":
      {
        let errorMessage;
        if (memoCache[22] !== block.content.error_code) errorMessage = Vq.jsxs(v, {
          color: "error",
          children: ["Advisor unavailable (", block.content.error_code, ")"]
        }), memoCache[22] = block.content.error_code, memoCache[23] = errorMessage;else errorMessage = memoCache[23];
        resultContent = errorMessage;
        break e;
      }
    case "advisor_result":
      {
        let resultMessage;
        if (memoCache[24] !== block.content.text || memoCache[25] !== verbose) resultMessage = verbose ? Vq.jsx(v, {
          dimColor: !0,
          children: block.content.text
        }) : Vq.jsxs(v, {
          dimColor: !0,
          children: [Xe.tick, " Advisor has reviewed the conversation and will apply the feedback ", Vq.jsx(bw, {})]
        }), memoCache[24] = block.content.text, memoCache[25] = verbose, memoCache[26] = resultMessage;else resultMessage = memoCache[26];
        resultContent = resultMessage;
        break e;
      }
    case "advisor_redacted_result":
      {
        let redactedMessage;
        if (memoCache[27] === Symbol.for("react.memo_cache_sentinel")) redactedMessage = Vq.jsxs(v, {
          dimColor: !0,
          children: [Xe.tick, " Advisor has reviewed the conversation and will apply the feedback"]
        }), memoCache[27] = redactedMessage;else redactedMessage = memoCache[27];
        resultContent = redactedMessage;
      }
  }
  let resultRow;
  if (memoCache[28] !== resultContent) resultRow = Vq.jsx($, {
    paddingRight: 2,
    children: Vq.jsx(Yn, {
      children: resultContent
    })
  }), memoCache[28] = resultContent, memoCache[29] = resultRow;else resultRow = memoCache[29];
  return resultRow;
}
var U9a, Vq;
var q9a = b(() => {
  Zs();
  je();
  Ro();
  tn();
  EW();
  Pl();
  _dt();
  U9a = x(tt(), 1), Vq = x(oe(), 1);
});

export {$9a,U9a,Vq,q9a};
