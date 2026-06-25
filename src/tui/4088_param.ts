// @ts-nocheck
import {A6a,R6a} from "../../vendor/m4086.ts";
import {j9n,z9n,mce,dxe,ydt} from "./4005_children.ts";
import {AY,Lw} from "../../vendor/m4308.ts";
import {c6a,u6a} from "../../vendor/m4083.ts";
import {K6e,Wdt,po} from "../tools/5224_userPromptCount.ts";
import {p6a,m6a} from "../tools/4085_input.ts";
import {Cmo,Amo} from "../../vendor/m4073.ts";
import {b6a,E6a} from "./4086_classifierApprovals.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {Pa} from "../../vendor/m720.ts";
import {je} from "../../vendor/m2462.ts";
import {tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Renders a single tool-result message ("param") in the TUI transcript.
 *
 * Picks one of several child renderers depending on the content of the
 * tool result:
 *   - a cancelled/interrupted marker (AY prefix) -> c6a
 *   - a rejected / no-op tool use (K6e / Wdt prefix, or Lw) -> p6a (input view)
 *   - an error result -> Cmo
 *   - a normal result -> b6a
 *
 * Uses the React Compiler memoization cache (w6a.c(47)) to avoid re-rendering
 * the chosen child unless its inputs change.
 */
function k6a(props) {
  let cache = w6a.c(47),
    {
      param: param,
      message: message,
      lookups: lookups,
      progressMessagesForMessage: progressMessagesForMessage,
      style: style,
      tools: tools,
      verbose: verbose,
      width: width,
      isTranscriptMode: isTranscriptMode
    } = props,
    toolUseInfo = A6a(param.tool_use_id, tools, lookups),
    queuedToolUseID = j9n(),
    activeToolUseID = z9n(),
    mouseContext = z3n.useContext(mce),
    assistantUuid;
  if (cache[0] !== lookups.assistantUuidByToolUseID || cache[1] !== param.tool_use_id) assistantUuid = lookups.assistantUuidByToolUseID.get(param.tool_use_id), cache[0] = lookups.assistantUuidByToolUseID, cache[1] = param.tool_use_id, cache[2] = assistantUuid;else assistantUuid = cache[2];
  let resolvedAssistantUuid = assistantUuid,
    isSidechain = dxe(resolvedAssistantUuid),
    [isExpanded, setIsExpanded] = z3n.useState(!1);
  if (!toolUseInfo) return null;
  let body: any;
  if (typeof param.content === "string" && param.content.startsWith(AY)) {
    let cancelledEl;
    if (cache[3] === Symbol.for("react.memo_cache_sentinel")) cancelledEl = V6e.jsx(c6a, {}), cache[3] = cancelledEl;else cancelledEl = cache[3];
    body = cancelledEl;
  } else if (typeof param.content === "string" && (param.content.startsWith(K6e) || param.content.startsWith(Wdt) && toolUseInfo.tool?.renderToolUseRejectedMessage !== void 0) || param.content === Lw) {
    let toolInput = toolUseInfo.toolUse.input,
      rejectedEl;
    if (cache[4] !== isTranscriptMode || cache[5] !== lookups || cache[6] !== progressMessagesForMessage || cache[7] !== style || cache[8] !== toolInput || cache[9] !== toolUseInfo.tool || cache[10] !== tools || cache[11] !== verbose) rejectedEl = V6e.jsx(p6a, {
      input: toolInput,
      progressMessagesForMessage: progressMessagesForMessage,
      tool: toolUseInfo.tool,
      tools: tools,
      lookups: lookups,
      style: style,
      verbose: verbose,
      isTranscriptMode: isTranscriptMode
    }), cache[4] = isTranscriptMode, cache[5] = lookups, cache[6] = progressMessagesForMessage, cache[7] = style, cache[8] = toolInput, cache[9] = toolUseInfo.tool, cache[10] = tools, cache[11] = verbose, cache[12] = rejectedEl;else rejectedEl = cache[12];
    body = rejectedEl;
  } else if (param.is_error) {
    let errorEl;
    if (cache[13] !== isTranscriptMode || cache[14] !== param || cache[15] !== progressMessagesForMessage || cache[16] !== toolUseInfo.tool || cache[17] !== tools || cache[18] !== verbose) errorEl = V6e.jsx(Cmo, {
      progressMessagesForMessage: progressMessagesForMessage,
      tool: toolUseInfo.tool,
      tools: tools,
      param: param,
      verbose: verbose,
      isTranscriptMode: isTranscriptMode
    }), cache[13] = isTranscriptMode, cache[14] = param, cache[15] = progressMessagesForMessage, cache[16] = toolUseInfo.tool, cache[17] = tools, cache[18] = verbose, cache[19] = errorEl;else errorEl = cache[19];
    body = errorEl;
  } else {
    let resultEl;
    if (cache[20] !== isTranscriptMode || cache[21] !== lookups || cache[22] !== message || cache[23] !== progressMessagesForMessage || cache[24] !== style || cache[25] !== toolUseInfo.tool || cache[26] !== toolUseInfo.toolUse.id || cache[27] !== tools || cache[28] !== verbose || cache[29] !== width) resultEl = V6e.jsx(b6a, {
      message: message,
      lookups: lookups,
      toolUseID: toolUseInfo.toolUse.id,
      progressMessagesForMessage: progressMessagesForMessage,
      style: style,
      tool: toolUseInfo.tool,
      tools: tools,
      verbose: verbose,
      width: width,
      isTranscriptMode: isTranscriptMode
    }), cache[20] = isTranscriptMode, cache[21] = lookups, cache[22] = message, cache[23] = progressMessagesForMessage, cache[24] = style, cache[25] = toolUseInfo.tool, cache[26] = toolUseInfo.toolUse.id, cache[27] = tools, cache[28] = verbose, cache[29] = width, cache[30] = resultEl;else resultEl = cache[30];
    body = resultEl;
  }
  let isActive = activeToolUseID === param.tool_use_id,
    onMouseEnter;
  if (cache[31] !== param.tool_use_id || cache[32] !== queuedToolUseID) onMouseEnter = void 0, cache[31] = param.tool_use_id, cache[32] = queuedToolUseID, cache[33] = onMouseEnter;else onMouseEnter = cache[33];
  let onMouseLeave;
  if (cache[34] !== queuedToolUseID) onMouseLeave = void 0, cache[34] = queuedToolUseID, cache[35] = onMouseLeave;else onMouseLeave = cache[35];
  let hint;
  if (cache[36] !== isExpanded || cache[37] !== resolvedAssistantUuid || cache[38] !== isActive || cache[39] !== mouseContext || cache[40] !== isSidechain) hint = null, cache[36] = isExpanded, cache[37] = resolvedAssistantUuid, cache[38] = isActive, cache[39] = mouseContext, cache[40] = isSidechain, cache[41] = hint;else hint = cache[41];
  let element;
  if (cache[42] !== body || cache[43] !== onMouseEnter || cache[44] !== onMouseLeave || cache[45] !== hint) element = V6e.jsxs($, {
    flexDirection: "column",
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    children: [body, hint]
  }), cache[42] = body, cache[43] = onMouseEnter, cache[44] = onMouseLeave, cache[45] = hint, cache[46] = element;else element = cache[46];
  return element;
}
var w6a, z3n, V6e;
var H6a = b(() => {
  Pa();
  je();
  tp();
  po();
  ydt();
  u6a();
  Amo();
  m6a();
  E6a();
  R6a();
  w6a = x(tt(), 1), z3n = x(et(), 1), V6e = x(oe(), 1);
});

export {k6a,w6a,z3n,V6e,H6a};
