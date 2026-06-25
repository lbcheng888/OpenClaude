// @ts-nocheck
import {r8e,NTo,Snl,Vdt,C0e} from "../hooks/4360_isCollapsible.ts";
import {dwl,zzn,uwl,NTe,po} from "../tools/5224_userPromptCount.ts";
import {cwl,oGt} from "../tui/4847_current.ts";
import {RY,Ydt} from "./4089_message.ts";
import {ND,s_e} from "../../vendor/m3298.ts";
import {nwl,rwl} from "../../vendor/m4816.ts";
import {Zvl,ewl} from "../../vendor/m4815.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Determines whether there is any "real" content after the message at index `startIndex`
 * in the message list `messages`. Skips over collapsible tool uses, thinking blocks,
 * tool results, system/attachment entries, and already-resolved tool uses.
 *
 * @param messages          Full ordered list of conversation entries.
 * @param startIndex        Index of the current message; scan begins at startIndex + 1.
 * @param toolContext       Context passed to the collapsibility check (r8e).
 * @param resolvedToolUseIDs Set of tool_use IDs that have already been resolved.
 * @returns `true` if a subsequent non-skippable entry exists, otherwise `false`.
 */
function iwl(messages, startIndex, toolContext, resolvedToolUseIDs) {
  for (let scanIndex = startIndex + 1; scanIndex < messages.length; scanIndex++) {
    let entry = messages[scanIndex];
    if (entry?.type === "assistant") {
      let firstBlock = entry.message.content[0];
      if (firstBlock?.type === "thinking" || firstBlock?.type === "redacted_thinking") continue;
      if (firstBlock?.type === "tool_use") {
        if (r8e(firstBlock.name, firstBlock.input, toolContext).isCollapsible) continue;
        if (resolvedToolUseIDs.has(firstBlock.id)) continue;
      }
      return !0;
    }
    if (entry?.type === "system" || entry?.type === "attachment") continue;
    if (entry?.type === "user") {
      if (entry.message.content[0]?.type === "tool_result") continue;
    }
    if (entry?.type === "grouped_tool_use") {
      let groupedInput = entry.messages[0]?.message.content[0]?.input;
      if (r8e(entry.toolName, groupedInput, toolContext).isCollapsible) continue;
    }
    return !0;
  }
  return !1;
}

/**
 * Memoized message-row renderer for the conversation transcript/UI.
 * Uses the React Compiler memoization cache (`cache`) to avoid re-rendering and
 * recomputing derived values when inputs are unchanged.
 */
function rum(props) {
  let cache = owl.c(73),
    {
      message: message,
      isUserContinuation: isUserContinuation,
      hasContentAfter: hasContentAfter,
      tools: tools,
      commands: commands,
      verbose: verbose,
      showMessageTimestamps: showMessageTimestamps,
      inProgressToolUseIDs: inProgressToolUseIDs,
      streamingToolUseIDs: streamingToolUseIDs,
      screen: screen,
      canAnimate: canAnimate,
      onOpenRateLimitOptions: onOpenRateLimitOptions,
      latestBashOutputUUID: latestBashOutputUUID,
      columns: columns,
      isLoading: isLoading,
      lookups: lookups
    } = props,
    isTranscriptMode = screen === "transcript",
    isGroupedToolUse = message.type === "grouped_tool_use",
    isCollapsedReadSearch = message.type === "collapsed_read_search",
    activeCollapsedGroup;
  if (cache[0] !== hasContentAfter || cache[1] !== inProgressToolUseIDs || cache[2] !== isCollapsedReadSearch || cache[3] !== isLoading || cache[4] !== message) activeCollapsedGroup = isCollapsedReadSearch && (NTo(message, inProgressToolUseIDs) || isLoading && !hasContentAfter), cache[0] = hasContentAfter, cache[1] = inProgressToolUseIDs, cache[2] = isCollapsedReadSearch, cache[3] = isLoading, cache[4] = message, cache[5] = activeCollapsedGroup;else activeCollapsedGroup = cache[5];
  let isActiveCollapsedGroup = activeCollapsedGroup,
    displayMessage;
  if (cache[6] !== isCollapsedReadSearch || cache[7] !== isGroupedToolUse || cache[8] !== message) displayMessage = isGroupedToolUse ? message.displayMessage : isCollapsedReadSearch ? Snl(message) : message, cache[6] = isCollapsedReadSearch, cache[7] = isGroupedToolUse, cache[8] = message, cache[9] = displayMessage;else displayMessage = cache[9];
  let resolvedMessage = displayMessage,
    progressMessages;
  if (cache[10] !== isCollapsedReadSearch || cache[11] !== isGroupedToolUse || cache[12] !== lookups || cache[13] !== message) progressMessages = isGroupedToolUse || isCollapsedReadSearch ? [] : dwl(message, lookups), cache[10] = isCollapsedReadSearch, cache[11] = isGroupedToolUse, cache[12] = lookups, cache[13] = message, cache[14] = progressMessages;else progressMessages = cache[14];
  let progressMessagesForMessage = progressMessages,
    isStaticValue;
  if (cache[15] !== inProgressToolUseIDs || cache[16] !== isCollapsedReadSearch || cache[17] !== isGroupedToolUse || cache[18] !== lookups || cache[19] !== message || cache[20] !== screen || cache[21] !== streamingToolUseIDs) {
    let toolUseIDsForStatic = isGroupedToolUse || isCollapsedReadSearch ? zzn : uwl(message, lookups);
    isStaticValue = cwl(message, streamingToolUseIDs, inProgressToolUseIDs, toolUseIDsForStatic, screen, lookups), cache[15] = inProgressToolUseIDs, cache[16] = isCollapsedReadSearch, cache[17] = isGroupedToolUse, cache[18] = lookups, cache[19] = message, cache[20] = screen, cache[21] = streamingToolUseIDs, cache[22] = isStaticValue;
  } else isStaticValue = cache[22];
  let isStatic = isStaticValue,
    shouldAnimate = !1;
  if (canAnimate) if (isGroupedToolUse) {
    let groupedAnimate;
    if (cache[23] !== inProgressToolUseIDs || cache[24] !== message.messages) {
      let isInProgressBlock;
      if (cache[26] !== inProgressToolUseIDs) isInProgressBlock = subMessage => {
        let subBlock = subMessage.message.content[0];
        return subBlock?.type === "tool_use" && inProgressToolUseIDs.has(subBlock.id);
      }, cache[26] = inProgressToolUseIDs, cache[27] = isInProgressBlock;else isInProgressBlock = cache[27];
      groupedAnimate = message.messages.some(isInProgressBlock), cache[23] = inProgressToolUseIDs, cache[24] = message.messages, cache[25] = groupedAnimate;
    } else groupedAnimate = cache[25];
    shouldAnimate = groupedAnimate;
  } else if (isCollapsedReadSearch) {
    let collapsedAnimate;
    if (cache[28] !== inProgressToolUseIDs || cache[29] !== message) collapsedAnimate = NTo(message, inProgressToolUseIDs), cache[28] = inProgressToolUseIDs, cache[29] = message, cache[30] = collapsedAnimate;else collapsedAnimate = cache[30];
    shouldAnimate = collapsedAnimate;
  } else {
    let plainAnimate;
    if (cache[31] !== inProgressToolUseIDs || cache[32] !== message) {
      let toolUseID = NTe(message);
      plainAnimate = !toolUseID || inProgressToolUseIDs.has(toolUseID), cache[31] = inProgressToolUseIDs, cache[32] = message, cache[33] = plainAnimate;
    } else plainAnimate = cache[33];
    shouldAnimate = plainAnimate;
  }
  let shouldShowTimestampRow;
  if (cache[34] !== resolvedMessage.message || cache[35] !== resolvedMessage.timestamp || cache[36] !== resolvedMessage.type || cache[37] !== isTranscriptMode || cache[38] !== showMessageTimestamps) shouldShowTimestampRow = resolvedMessage.type === "assistant" && (showMessageTimestamps || isTranscriptMode && resolvedMessage.message.content.some(oum)) && (resolvedMessage.timestamp || resolvedMessage.message.model), cache[34] = resolvedMessage.message, cache[35] = resolvedMessage.timestamp, cache[36] = resolvedMessage.type, cache[37] = isTranscriptMode, cache[38] = showMessageTimestamps, cache[39] = shouldShowTimestampRow;else shouldShowTimestampRow = cache[39];
  let hasTimestampRow = shouldShowTimestampRow,
    addMargin = !hasTimestampRow,
    containerWidth = hasTimestampRow ? void 0 : columns,
    messageRow;
  if (cache[40] !== commands || cache[41] !== inProgressToolUseIDs || cache[42] !== isActiveCollapsedGroup || cache[43] !== isStatic || cache[44] !== isTranscriptMode || cache[45] !== isUserContinuation || cache[46] !== latestBashOutputUUID || cache[47] !== lookups || cache[48] !== message || cache[49] !== onOpenRateLimitOptions || cache[50] !== progressMessagesForMessage || cache[51] !== shouldAnimate || cache[52] !== addMargin || cache[53] !== containerWidth || cache[54] !== tools || cache[55] !== verbose) messageRow = MTe.jsx(RY, {
    message: message,
    lookups: lookups,
    addMargin: addMargin,
    containerWidth: containerWidth,
    tools: tools,
    commands: commands,
    verbose: verbose,
    inProgressToolUseIDs: inProgressToolUseIDs,
    progressMessagesForMessage: progressMessagesForMessage,
    shouldAnimate: shouldAnimate,
    shouldShowDot: !0,
    isTranscriptMode: isTranscriptMode,
    isStatic: isStatic,
    onOpenRateLimitOptions: onOpenRateLimitOptions,
    isActiveCollapsedGroup: isActiveCollapsedGroup,
    isUserContinuation: isUserContinuation,
    latestBashOutputUUID: latestBashOutputUUID
  }), cache[40] = commands, cache[41] = inProgressToolUseIDs, cache[42] = isActiveCollapsedGroup, cache[43] = isStatic, cache[44] = isTranscriptMode, cache[45] = isUserContinuation, cache[46] = latestBashOutputUUID, cache[47] = lookups, cache[48] = message, cache[49] = onOpenRateLimitOptions, cache[50] = progressMessagesForMessage, cache[51] = shouldAnimate, cache[52] = addMargin, cache[53] = containerWidth, cache[54] = tools, cache[55] = verbose, cache[56] = messageRow;else messageRow = cache[56];
  let messageRowElement = messageRow;
  if (!hasTimestampRow) {
    let wrappedRow;
    if (cache[57] !== messageRowElement) wrappedRow = MTe.jsx(ND, {
      children: messageRowElement
    }), cache[57] = messageRowElement, cache[58] = wrappedRow;else wrappedRow = cache[58];
    return wrappedRow;
  }
  let timestampElement;
  if (cache[59] !== resolvedMessage || cache[60] !== isTranscriptMode || cache[61] !== showMessageTimestamps) timestampElement = MTe.jsx(nwl, {
    message: resolvedMessage,
    isTranscriptMode: isTranscriptMode,
    showMessageTimestamps: showMessageTimestamps
  }), cache[59] = resolvedMessage, cache[60] = isTranscriptMode, cache[61] = showMessageTimestamps, cache[62] = timestampElement;else timestampElement = cache[62];
  let modelElement;
  if (cache[63] !== resolvedMessage || cache[64] !== isTranscriptMode) modelElement = MTe.jsx(Zvl, {
    message: resolvedMessage,
    isTranscriptMode: isTranscriptMode
  }), cache[63] = resolvedMessage, cache[64] = isTranscriptMode, cache[65] = modelElement;else modelElement = cache[65];
  let headerRow;
  if (cache[66] !== modelElement || cache[67] !== timestampElement) headerRow = MTe.jsxs($, {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 1,
    marginTop: 1,
    children: [timestampElement, modelElement]
  }), cache[66] = modelElement, cache[67] = timestampElement, cache[68] = headerRow;else headerRow = cache[68];
  let columnElement;
  if (cache[69] !== columns || cache[70] !== messageRowElement || cache[71] !== headerRow) columnElement = MTe.jsx(ND, {
    children: MTe.jsxs($, {
      width: columns,
      flexDirection: "column",
      children: [headerRow, messageRowElement]
    })
  }), cache[69] = columns, cache[70] = messageRowElement, cache[71] = headerRow, cache[72] = columnElement;else columnElement = cache[72];
  return columnElement;
}

/** Predicate: content block is a plain text block. */
function oum(block) {
  return block.type === "text";
}

/**
 * Whether any tool use within `message` is currently streaming
 * (present in `streamingToolUseIDs`).
 */
function sum(message, streamingToolUseIDs) {
  if (message.type === "grouped_tool_use") return message.messages.some(subMessage => {
    let subBlock = subMessage.message.content[0];
    return subBlock?.type === "tool_use" && streamingToolUseIDs.has(subBlock.id);
  });
  if (message.type === "collapsed_read_search") return Vdt(message).some(toolUseID => streamingToolUseIDs.has(toolUseID));
  let toolUseID = NTe(message);
  return !!toolUseID && streamingToolUseIDs.has(toolUseID);
}

/**
 * Whether every tool use within `message` has been resolved
 * (present in `resolvedToolUseIDs`).
 */
function ium(message, resolvedToolUseIDs) {
  if (message.type === "grouped_tool_use") return message.messages.every(subMessage => {
    let subBlock = subMessage.message.content[0];
    return subBlock?.type === "tool_use" && resolvedToolUseIDs.has(subBlock.id);
  });
  if (message.type === "collapsed_read_search") return Vdt(message).every(toolUseID => resolvedToolUseIDs.has(toolUseID));
  if (message.type === "assistant") {
    let firstBlock = message.message.content[0];
    if (firstBlock?.type === "server_tool_use") return resolvedToolUseIDs.has(firstBlock.id);
  }
  let toolUseID = NTe(message);
  return !toolUseID || resolvedToolUseIDs.has(toolUseID);
}

/**
 * Memo equality comparator for the `rum` message-row component.
 * Returns `true` to skip re-render when the relevant props are unchanged.
 */
function aum(prevProps, nextProps) {
  if (prevProps.message !== nextProps.message) return !1;
  if (prevProps.screen !== nextProps.screen) return !1;
  if (prevProps.verbose !== nextProps.verbose) return !1;
  if (prevProps.showMessageTimestamps !== nextProps.showMessageTimestamps) return !1;
  if (prevProps.message.type === "collapsed_read_search" && nextProps.screen !== "transcript") return !1;
  if (prevProps.columns !== nextProps.columns) return !1;
  let prevIsLatestBashOutput = prevProps.latestBashOutputUUID === prevProps.message.uuid,
    nextIsLatestBashOutput = nextProps.latestBashOutputUUID === nextProps.message.uuid;
  if (prevIsLatestBashOutput !== nextIsLatestBashOutput) return !1;
  let isStreaming = sum(prevProps.message, prevProps.streamingToolUseIDs),
    isResolved = ium(prevProps.message, prevProps.lookups.resolvedToolUseIDs);
  if (isStreaming || !isResolved) return !1;
  return !0;
}
var owl, swl, MTe, awl;
var lwl = b(() => {
  je();
  C0e();
  po();
  Ydt();
  ewl();
  oGt();
  rwl();
  s_e();
  owl = x(tt(), 1), swl = x(et(), 1), MTe = x(oe(), 1);
  awl = swl.memo(rum, aum);
});

export {iwl,rum,oum,sum,ium,aum,owl,swl,MTe,awl,lwl};
