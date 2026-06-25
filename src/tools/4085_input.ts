// @ts-nocheck
import {_r,ui} from "../../vendor/m2463.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {pce,O3t} from "../../vendor/m3995.ts";
import {lve,ri} from "./2235_userFacingName.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Renders the "tool use rejected" message for a given tool invocation.
 *
 * This is a React component compiled by the React Compiler: `cache` is a memo
 * slot array keyed by the component's inputs, and the `react.memo_cache_sentinel`
 * / `react.early_return_sentinel` symbols are the compiler's internal markers for
 * "slot not yet populated" and "component short-circuited", respectively.
 *
 * The tool's `inputSchema` is used to validate the raw `input`; if validation
 * fails (or the tool has no custom renderer / produced nothing) a default empty
 * message element is rendered instead.
 */
function p6a(props: {
  input: unknown;
  progressMessagesForMessage: unknown;
  style: unknown;
  tool: any;
  tools: unknown;
  verbose: unknown;
  isTranscriptMode: unknown;
}) {
  let cache = d6a.c(13),
    {
      input,
      progressMessagesForMessage,
      style,
      tool,
      tools,
      verbose,
      isTranscriptMode
    } = props,
    {
      columns
    } = _r(),
    [theme] = ji();
  // Tool missing or has no custom rejected-message renderer: render the default.
  if (!tool || !tool.renderToolUseRejectedMessage) {
    let defaultMessage;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) defaultMessage = K3n.jsx(pce, {}), cache[0] = defaultMessage;else defaultMessage = cache[0];
    return defaultMessage;
  }
  let inputSchema = tool.inputSchema,
    renderedMessage,
    earlyReturnValue;
  if (cache[1] !== columns || cache[2] !== input || cache[3] !== isTranscriptMode || cache[4] !== progressMessagesForMessage || cache[5] !== style || cache[6] !== theme || cache[7] !== tool || cache[8] !== tools || cache[9] !== verbose) {
    earlyReturnValue = Symbol.for("react.early_return_sentinel");
    e: {
      let parseResult = inputSchema.safeParse(input);
      if (!parseResult.success) {
        let invalidInputMessage;
        if (cache[12] === Symbol.for("react.memo_cache_sentinel")) invalidInputMessage = K3n.jsx(pce, {}), cache[12] = invalidInputMessage;else invalidInputMessage = cache[12];
        earlyReturnValue = invalidInputMessage;
        break e;
      }
      renderedMessage = tool.renderToolUseRejectedMessage(parseResult.data, {
        columns,
        messages: [],
        tools,
        verbose,
        progressMessagesForMessage: lve(progressMessagesForMessage),
        style,
        theme,
        isTranscriptMode
      }) ?? K3n.jsx(pce, {});
    }
    cache[1] = columns, cache[2] = input, cache[3] = isTranscriptMode, cache[4] = progressMessagesForMessage, cache[5] = style, cache[6] = theme, cache[7] = tool, cache[8] = tools, cache[9] = verbose, cache[10] = renderedMessage, cache[11] = earlyReturnValue;
  } else renderedMessage = cache[10], earlyReturnValue = cache[11];
  if (earlyReturnValue !== Symbol.for("react.early_return_sentinel")) return earlyReturnValue;
  return renderedMessage;
}
var d6a, K3n;
var m6a = b(() => {
  ui();
  je();
  ri();
  O3t();
  d6a = x(tt(), 1), K3n = x(oe(), 1);
});

export {p6a,d6a,K3n,m6a};
