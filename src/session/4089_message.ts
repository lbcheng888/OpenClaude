// @ts-nocheck
import {Sqa,Eqa} from "../../vendor/m4066.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {P9a,O9a} from "../../vendor/m3996.ts";
import {UWi,pjr} from "../../vendor/m2815.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {Vqa,Kqa} from "../../vendor/m4075.ts";
import {yg,_4} from "../../vendor/m2581.ts";
import {W6e,F3n} from "../../vendor/m4065.ts";
import {r6a,o6a} from "../../vendor/m4081.ts";
import {zqa,jqa} from "../core/4077_message.ts";
import {ND,s_e} from "../../vendor/m3298.ts";
import {qqa,Wqa} from "../tools/4075_content.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {i6a,a6a} from "../../vendor/m4082.ts";
import {w3n,rmo} from "../../vendor/m4048.ts";
import {k6a,H6a} from "../tui/4088_param.ts";
import {cw,uo} from "../../vendor/m2468.ts";
import {F2} from "../../vendor/m2235.ts";
import {t4a,n4a} from "../tui/4039_param.ts";
import {Fpo,M3a} from "../../vendor/m4026.ts";
import {G9a,V9a} from "../../vendor/m4001.ts";
import {f3n,Bpo} from "../../vendor/m4027.ts";
import {jqe,yte} from "../config/3910_claude_haiku_4_5.ts";
import {$9a,q9a} from "../core/4001_block.ts";
import {Ie,vn} from "./0621_length.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Message renderer for the Claude Code TUI conversation transcript.
 *
 * `FPp` is the top-level renderer dispatching on `message.type`
 * (attachment / assistant / user / system / grouped_tool_use / collapsed_read_search).
 * `BPp` renders an individual user-message content block (text / image / tool_result).
 * `UPp` renders an individual assistant-message content block
 * (tool_use / text / thinking / redacted_thinking / server_tool_use / advisor_tool_result).
 * `$Pp` is the React.memo equality comparator deciding whether a render can be skipped.
 *
 * Bodies are React Compiler ("forget") output: `t = j3n.c(N)` is the per-render
 * memo-cache array, and the `if (t[i] !== dep) ...; else x = t[k]` blocks are
 * compiler-generated memoization guards. `BE.jsx` is the JSX runtime.
 */

/** Props consumed by the top-level message renderer (`FPp`). */
interface MessageRendererProps {
  message: any;
  lookups: any;
  containerWidth?: string | number;
  addMargin: boolean;
  tools: any;
  commands: any;
  verbose: boolean;
  inProgressToolUseIDs: Set<string>;
  progressMessagesForMessage: any;
  shouldAnimate: boolean;
  shouldShowDot: boolean;
  style?: any;
  width?: number;
  isTranscriptMode: boolean;
  onOpenRateLimitOptions?: any;
  isActiveCollapsedGroup?: boolean;
  isUserContinuation?: boolean;
  latestBashOutputUUID?: string;
  disableDisplayOverride?: boolean;
}

/** Top-level renderer: dispatches on `message.type`. */
function FPp(props: MessageRendererProps): any {
  let memoCache = j3n.c(109),
    {
      message: message,
      lookups: lookups,
      containerWidth: containerWidth,
      addMargin: addMargin,
      tools: tools,
      commands: commands,
      verbose: verbose,
      inProgressToolUseIDs: inProgressToolUseIDs,
      progressMessagesForMessage: progressMessagesForMessage,
      shouldAnimate: shouldAnimate,
      shouldShowDot: shouldShowDot,
      style: style,
      width: width,
      isTranscriptMode: isTranscriptMode,
      onOpenRateLimitOptions: onOpenRateLimitOptions,
      isActiveCollapsedGroup: isActiveCollapsedGroup,
      isUserContinuation: isUserContinuation,
      latestBashOutputUUID: latestBashOutputUUID,
      disableDisplayOverride: disableDisplayOverride
    } = props,
    isContinuation = isUserContinuation === void 0 ? !1 : isUserContinuation;
  switch (message.type) {
    case "attachment":
      {
        let resolvedWidth = containerWidth ?? "100%",
          attachmentEl;
        if (memoCache[0] !== addMargin || memoCache[1] !== isTranscriptMode || memoCache[2] !== message.attachment || memoCache[3] !== message.uuid || memoCache[4] !== verbose) attachmentEl = BE.jsx(Sqa, {
          addMargin: addMargin,
          attachment: message.attachment,
          verbose: verbose,
          isTranscriptMode: isTranscriptMode,
          messageUuid: message.uuid
        }), memoCache[0] = addMargin, memoCache[1] = isTranscriptMode, memoCache[2] = message.attachment, memoCache[3] = message.uuid, memoCache[4] = verbose, memoCache[5] = attachmentEl;else attachmentEl = memoCache[5];
        let attachmentBox;
        if (memoCache[6] !== resolvedWidth || memoCache[7] !== attachmentEl) attachmentBox = BE.jsx($, {
          flexDirection: "column",
          width: resolvedWidth,
          children: attachmentEl
        }), memoCache[6] = resolvedWidth, memoCache[7] = attachmentEl, memoCache[8] = attachmentBox;else attachmentBox = memoCache[8];
        return attachmentBox;
      }
    case "assistant":
      {
        let firstTextBlockUuid;
        if (memoCache[9] !== lookups.firstTextBlockUuidByMessageID || memoCache[10] !== message.message.id) firstTextBlockUuid = lookups.firstTextBlockUuidByMessageID.get(message.message.id), memoCache[9] = lookups.firstTextBlockUuidByMessageID, memoCache[10] = message.message.id, memoCache[11] = firstTextBlockUuid;else firstTextBlockUuid = memoCache[11];
        let firstUuid = firstTextBlockUuid,
          resolvedWidth = containerWidth ?? "100%",
          blockEls;
        if (memoCache[12] !== addMargin || memoCache[13] !== commands || memoCache[14] !== disableDisplayOverride || memoCache[15] !== firstUuid || memoCache[16] !== inProgressToolUseIDs || memoCache[17] !== isTranscriptMode || memoCache[18] !== lookups || memoCache[19] !== message.advisorModel || memoCache[20] !== message.message.content || memoCache[21] !== message.message.id || memoCache[22] !== message.uuid || memoCache[23] !== onOpenRateLimitOptions || memoCache[24] !== progressMessagesForMessage || memoCache[25] !== shouldAnimate || memoCache[26] !== shouldShowDot || memoCache[27] !== tools || memoCache[28] !== verbose || memoCache[29] !== width) {
          let renderBlock;
          if (memoCache[31] !== addMargin || memoCache[32] !== commands || memoCache[33] !== disableDisplayOverride || memoCache[34] !== firstUuid || memoCache[35] !== inProgressToolUseIDs || memoCache[36] !== isTranscriptMode || memoCache[37] !== lookups || memoCache[38] !== message.advisorModel || memoCache[39] !== message.message.id || memoCache[40] !== message.uuid || memoCache[41] !== onOpenRateLimitOptions || memoCache[42] !== progressMessagesForMessage || memoCache[43] !== shouldAnimate || memoCache[44] !== shouldShowDot || memoCache[45] !== tools || memoCache[46] !== verbose || memoCache[47] !== width) renderBlock = (block: any, blockIndex: number) => BE.jsx(UPp, {
            param: block,
            addMargin: addMargin,
            tools: tools,
            commands: commands,
            verbose: verbose,
            inProgressToolUseIDs: inProgressToolUseIDs,
            progressMessagesForMessage: progressMessagesForMessage,
            shouldAnimate: shouldAnimate,
            shouldShowDot: shouldShowDot,
            width: width,
            inProgressToolCallCount: inProgressToolUseIDs.size,
            isTranscriptMode: isTranscriptMode,
            lookups: lookups,
            onOpenRateLimitOptions: onOpenRateLimitOptions,
            advisorModel: message.advisorModel,
            messageUuid: message.uuid,
            apiMessageId: disableDisplayOverride ? void 0 : message.message.id,
            isFirstTextBlock: firstUuid === void 0 || firstUuid === message.uuid
          }, blockIndex), memoCache[31] = addMargin, memoCache[32] = commands, memoCache[33] = disableDisplayOverride, memoCache[34] = firstUuid, memoCache[35] = inProgressToolUseIDs, memoCache[36] = isTranscriptMode, memoCache[37] = lookups, memoCache[38] = message.advisorModel, memoCache[39] = message.message.id, memoCache[40] = message.uuid, memoCache[41] = onOpenRateLimitOptions, memoCache[42] = progressMessagesForMessage, memoCache[43] = shouldAnimate, memoCache[44] = shouldShowDot, memoCache[45] = tools, memoCache[46] = verbose, memoCache[47] = width, memoCache[48] = renderBlock;else renderBlock = memoCache[48];
          blockEls = message.message.content.map(renderBlock), memoCache[12] = addMargin, memoCache[13] = commands, memoCache[14] = disableDisplayOverride, memoCache[15] = firstUuid, memoCache[16] = inProgressToolUseIDs, memoCache[17] = isTranscriptMode, memoCache[18] = lookups, memoCache[19] = message.advisorModel, memoCache[20] = message.message.content, memoCache[21] = message.message.id, memoCache[22] = message.uuid, memoCache[23] = onOpenRateLimitOptions, memoCache[24] = progressMessagesForMessage, memoCache[25] = shouldAnimate, memoCache[26] = shouldShowDot, memoCache[27] = tools, memoCache[28] = verbose, memoCache[29] = width, memoCache[30] = blockEls;
        } else blockEls = memoCache[30];
        let assistantBox;
        if (memoCache[49] !== resolvedWidth || memoCache[50] !== blockEls) assistantBox = BE.jsx($, {
          flexDirection: "column",
          width: resolvedWidth,
          children: blockEls
        }), memoCache[49] = resolvedWidth, memoCache[50] = blockEls, memoCache[51] = assistantBox;else assistantBox = memoCache[51];
        return assistantBox;
      }
    case "user":
      {
        if (message.isCompactSummary) {
          let screenKind = isTranscriptMode ? "transcript" : "prompt",
            compactSummaryEl;
          if (memoCache[52] !== message || memoCache[53] !== screenKind) compactSummaryEl = BE.jsx(P9a, {
            message: message,
            screen: screenKind
          }), memoCache[52] = message, memoCache[53] = screenKind, memoCache[54] = compactSummaryEl;else compactSummaryEl = memoCache[54];
          return compactSummaryEl;
        }
        let imageIndices;
        if (memoCache[55] !== message.imagePasteIds || memoCache[56] !== message.message.content) {
          imageIndices = [];
          let contentIndex = 0;
          for (let contentBlock of message.message.content) if (contentBlock.type === "image") {
            let pasteId = message.imagePasteIds?.[contentIndex];
            contentIndex++, imageIndices.push(pasteId ?? contentIndex);
          } else imageIndices.push(contentIndex);
          memoCache[55] = message.imagePasteIds, memoCache[56] = message.message.content, memoCache[57] = imageIndices;
        } else imageIndices = memoCache[57];
        let isLatestBashOutput = latestBashOutputUUID === message.uuid,
          resolvedWidth = containerWidth ?? "100%",
          blockEls;
        if (memoCache[58] !== addMargin || memoCache[59] !== imageIndices || memoCache[60] !== isTranscriptMode || memoCache[61] !== isContinuation || memoCache[62] !== lookups || memoCache[63] !== message || memoCache[64] !== progressMessagesForMessage || memoCache[65] !== style || memoCache[66] !== tools || memoCache[67] !== verbose) blockEls = message.message.content.map((block: any, blockIndex: number) => BE.jsx(BPp, {
          message: message,
          addMargin: addMargin,
          tools: tools,
          progressMessagesForMessage: progressMessagesForMessage,
          param: block,
          style: style,
          verbose: verbose,
          imageIndex: imageIndices[blockIndex],
          isUserContinuation: isContinuation,
          lookups: lookups,
          isTranscriptMode: isTranscriptMode
        }, blockIndex)), memoCache[58] = addMargin, memoCache[59] = imageIndices, memoCache[60] = isTranscriptMode, memoCache[61] = isContinuation, memoCache[62] = lookups, memoCache[63] = message, memoCache[64] = progressMessagesForMessage, memoCache[65] = style, memoCache[66] = tools, memoCache[67] = verbose, memoCache[68] = blockEls;else blockEls = memoCache[68];
        let userBox;
        if (memoCache[69] !== resolvedWidth || memoCache[70] !== blockEls) userBox = BE.jsx($, {
          flexDirection: "column",
          width: resolvedWidth,
          children: blockEls
        }), memoCache[69] = resolvedWidth, memoCache[70] = blockEls, memoCache[71] = userBox;else userBox = memoCache[71];
        let userContent = userBox,
          userResult;
        if (memoCache[72] !== userContent || memoCache[73] !== isLatestBashOutput) userResult = isLatestBashOutput ? BE.jsx(UWi, {
          children: userContent
        }) : userContent, memoCache[72] = userContent, memoCache[73] = isLatestBashOutput, memoCache[74] = userResult;else userResult = memoCache[74];
        return userResult;
      }
    case "system":
      {
        if (message.subtype === "compact_boundary") {
          if (Cs()) return null;
          let compactBoundaryEl;
          if (memoCache[75] === Symbol.for("react.memo_cache_sentinel")) compactBoundaryEl = BE.jsx(Vqa, {}), memoCache[75] = compactBoundaryEl;else compactBoundaryEl = memoCache[75];
          return compactBoundaryEl;
        }
        if (message.subtype === "microcompact_boundary") return null;
        if (message.subtype === "read_divider") {
          let readDividerEl;
          if (memoCache[79] !== message.content) readDividerEl = BE.jsx($, {
            marginTop: 1,
            width: "100%",
            children: BE.jsx(yg, {
              title: message.content,
              color: "inactive"
            })
          }), memoCache[79] = message.content, memoCache[80] = readDividerEl;else readDividerEl = memoCache[80];
          return readDividerEl;
        }
        if (message.subtype === "local_command") {
          let localCommandBlock;
          if (memoCache[81] !== message.content) localCommandBlock = {
            type: "text",
            text: message.content
          }, memoCache[81] = message.content, memoCache[82] = localCommandBlock;else localCommandBlock = memoCache[82];
          let localCommandEl;
          if (memoCache[83] !== addMargin || memoCache[84] !== isTranscriptMode || memoCache[85] !== localCommandBlock || memoCache[86] !== verbose) localCommandEl = BE.jsx(W6e, {
            addMargin: addMargin,
            param: localCommandBlock,
            verbose: verbose,
            isTranscriptMode: isTranscriptMode
          }), memoCache[83] = addMargin, memoCache[84] = isTranscriptMode, memoCache[85] = localCommandBlock, memoCache[86] = verbose, memoCache[87] = localCommandEl;else localCommandEl = memoCache[87];
          return localCommandEl;
        }
        let systemEl;
        if (memoCache[88] !== addMargin || memoCache[89] !== isTranscriptMode || memoCache[90] !== message || memoCache[91] !== verbose) systemEl = BE.jsx(r6a, {
          message: message,
          addMargin: addMargin,
          verbose: verbose,
          isTranscriptMode: isTranscriptMode
        }), memoCache[88] = addMargin, memoCache[89] = isTranscriptMode, memoCache[90] = message, memoCache[91] = verbose, memoCache[92] = systemEl;else systemEl = memoCache[92];
        return systemEl;
      }
    case "grouped_tool_use":
      {
        let groupedToolUseEl;
        if (memoCache[93] !== addMargin || memoCache[94] !== inProgressToolUseIDs || memoCache[95] !== lookups || memoCache[96] !== message || memoCache[97] !== shouldAnimate || memoCache[98] !== tools) groupedToolUseEl = BE.jsx(zqa, {
          message: message,
          tools: tools,
          lookups: lookups,
          inProgressToolUseIDs: inProgressToolUseIDs,
          shouldAnimate: shouldAnimate,
          addMargin: addMargin
        }), memoCache[93] = addMargin, memoCache[94] = inProgressToolUseIDs, memoCache[95] = lookups, memoCache[96] = message, memoCache[97] = shouldAnimate, memoCache[98] = tools, memoCache[99] = groupedToolUseEl;else groupedToolUseEl = memoCache[99];
        return groupedToolUseEl;
      }
    case "collapsed_read_search":
      {
        let showVerbose = verbose || isTranscriptMode,
          collapsedEl;
        if (memoCache[100] !== addMargin || memoCache[101] !== inProgressToolUseIDs || memoCache[102] !== isActiveCollapsedGroup || memoCache[103] !== lookups || memoCache[104] !== message || memoCache[105] !== shouldAnimate || memoCache[106] !== showVerbose || memoCache[107] !== tools) collapsedEl = BE.jsx(ND, {
          children: BE.jsx(qqa, {
            message: message,
            inProgressToolUseIDs: inProgressToolUseIDs,
            shouldAnimate: shouldAnimate,
            verbose: showVerbose,
            tools: tools,
            lookups: lookups,
            isActiveGroup: isActiveCollapsedGroup,
            addMargin: addMargin
          })
        }), memoCache[100] = addMargin, memoCache[101] = inProgressToolUseIDs, memoCache[102] = isActiveCollapsedGroup, memoCache[103] = lookups, memoCache[104] = message, memoCache[105] = shouldAnimate, memoCache[106] = showVerbose, memoCache[107] = tools, memoCache[108] = collapsedEl;else collapsedEl = memoCache[108];
        return collapsedEl;
      }
  }
}

/** Props for an individual user-message content block (`BPp`). */
interface UserContentBlockProps {
  message: any;
  addMargin: boolean;
  tools: any;
  progressMessagesForMessage: any;
  param: any;
  style?: any;
  verbose: boolean;
  imageIndex: any;
  isUserContinuation: boolean;
  lookups: any;
  isTranscriptMode: boolean;
}

/** Renders one user content block: text / image / tool_result. */
function BPp(props: UserContentBlockProps): any {
  let memoCache = j3n.c(25),
    {
      message: message,
      addMargin: addMargin,
      tools: tools,
      progressMessagesForMessage: progressMessagesForMessage,
      param: param,
      style: style,
      verbose: verbose,
      imageIndex: imageIndex,
      isUserContinuation: isUserContinuation,
      lookups: lookups,
      isTranscriptMode: isTranscriptMode
    } = props,
    {
      columns: columns
    } = _r();
  switch (param.type) {
    case "text":
      {
        if (message.origin?.kind === "peer" && message.origin.senderTaskId !== void 0) {
          let peerTextEl;
          if (memoCache[0] !== addMargin || memoCache[1] !== isTranscriptMode || memoCache[2] !== message.origin.from || memoCache[3] !== param) peerTextEl = BE.jsx(i6a, {
            addMargin: addMargin,
            param: param,
            fromName: message.origin.from,
            isTranscriptMode: isTranscriptMode
          }), memoCache[0] = addMargin, memoCache[1] = isTranscriptMode, memoCache[2] = message.origin.from, memoCache[3] = param, memoCache[4] = peerTextEl;else peerTextEl = memoCache[4];
          return peerTextEl;
        }
        let textEl;
        if (memoCache[5] !== addMargin || memoCache[6] !== isTranscriptMode || memoCache[7] !== message.planContent || memoCache[8] !== message.timestamp || memoCache[9] !== param || memoCache[10] !== verbose) textEl = BE.jsx(W6e, {
          addMargin: addMargin,
          param: param,
          verbose: verbose,
          planContent: message.planContent,
          isTranscriptMode: isTranscriptMode,
          timestamp: message.timestamp
        }), memoCache[5] = addMargin, memoCache[6] = isTranscriptMode, memoCache[7] = message.planContent, memoCache[8] = message.timestamp, memoCache[9] = param, memoCache[10] = verbose, memoCache[11] = textEl;else textEl = memoCache[11];
        return textEl;
      }
    case "image":
      {
        let imageMargin = addMargin && !isUserContinuation,
          imageEl;
        if (memoCache[12] !== imageIndex || memoCache[13] !== imageMargin) imageEl = BE.jsx(w3n, {
          imageId: imageIndex,
          addMargin: imageMargin
        }), memoCache[12] = imageIndex, memoCache[13] = imageMargin, memoCache[14] = imageEl;else imageEl = memoCache[14];
        return imageEl;
      }
    case "tool_result":
      {
        let toolResultWidth = columns - 5,
          toolResultEl;
        if (memoCache[15] !== isTranscriptMode || memoCache[16] !== lookups || memoCache[17] !== message || memoCache[18] !== param || memoCache[19] !== progressMessagesForMessage || memoCache[20] !== style || memoCache[21] !== toolResultWidth || memoCache[22] !== tools || memoCache[23] !== verbose) toolResultEl = BE.jsx(k6a, {
          param: param,
          message: message,
          lookups: lookups,
          progressMessagesForMessage: progressMessagesForMessage,
          style: style,
          tools: tools,
          verbose: verbose,
          width: toolResultWidth,
          isTranscriptMode: isTranscriptMode
        }), memoCache[15] = isTranscriptMode, memoCache[16] = lookups, memoCache[17] = message, memoCache[18] = param, memoCache[19] = progressMessagesForMessage, memoCache[20] = style, memoCache[21] = toolResultWidth, memoCache[22] = tools, memoCache[23] = verbose, memoCache[24] = toolResultEl;else toolResultEl = memoCache[24];
        return toolResultEl;
      }
    default:
      return;
  }
}

/** Props for an individual assistant-message content block (`UPp`). */
interface AssistantContentBlockProps {
  param: any;
  addMargin: boolean;
  tools: any;
  commands: any;
  verbose: boolean;
  inProgressToolUseIDs: Set<string>;
  progressMessagesForMessage: any;
  shouldAnimate: boolean;
  shouldShowDot: boolean;
  width?: number;
  inProgressToolCallCount: number;
  isTranscriptMode: boolean;
  lookups: any;
  onOpenRateLimitOptions?: any;
  advisorModel?: any;
  messageUuid: string;
  apiMessageId?: string;
  isFirstTextBlock: boolean;
}

/**
 * Renders one assistant content block:
 * tool_use / text / thinking / redacted_thinking / server_tool_use / advisor_tool_result.
 */
function UPp(props: AssistantContentBlockProps): any {
  let memoCache = j3n.c(62),
    {
      param: param,
      addMargin: addMargin,
      tools: tools,
      commands: commands,
      verbose: verbose,
      inProgressToolUseIDs: inProgressToolUseIDs,
      progressMessagesForMessage: progressMessagesForMessage,
      shouldAnimate: shouldAnimate,
      shouldShowDot: shouldShowDot,
      width: width,
      inProgressToolCallCount: inProgressToolCallCount,
      isTranscriptMode: isTranscriptMode,
      lookups: lookups,
      onOpenRateLimitOptions: onOpenRateLimitOptions,
      advisorModel: advisorModel,
      messageUuid: messageUuid,
      apiMessageId: apiMessageId,
      isFirstTextBlock: isFirstTextBlock
    } = props,
    selectDisplayedText;
  if (memoCache[0] !== apiMessageId || memoCache[1] !== param.type) selectDisplayedText = (state: any) => param.type === "text" && apiMessageId !== void 0 ? state.displayedMessageContent[apiMessageId] : void 0, memoCache[0] = apiMessageId, memoCache[1] = param.type, memoCache[2] = selectDisplayedText;else selectDisplayedText = memoCache[2];
  let displayedText = cw(selectDisplayedText);
  if (F2(param)) return null;
  switch (param.type) {
    case "tool_use":
      {
        let toolUseEl;
        if (memoCache[15] !== addMargin || memoCache[16] !== commands || memoCache[17] !== inProgressToolCallCount || memoCache[18] !== inProgressToolUseIDs || memoCache[19] !== isTranscriptMode || memoCache[20] !== lookups || memoCache[21] !== messageUuid || memoCache[22] !== param || memoCache[23] !== progressMessagesForMessage || memoCache[24] !== shouldAnimate || memoCache[25] !== shouldShowDot || memoCache[26] !== tools || memoCache[27] !== verbose) toolUseEl = BE.jsx(t4a, {
          param: param,
          addMargin: addMargin,
          tools: tools,
          commands: commands,
          verbose: verbose,
          inProgressToolUseIDs: inProgressToolUseIDs,
          progressMessagesForMessage: progressMessagesForMessage,
          shouldAnimate: shouldAnimate,
          shouldShowDot: shouldShowDot,
          inProgressToolCallCount: inProgressToolCallCount,
          lookups: lookups,
          isTranscriptMode: isTranscriptMode,
          messageUuid: messageUuid
        }), memoCache[15] = addMargin, memoCache[16] = commands, memoCache[17] = inProgressToolCallCount, memoCache[18] = inProgressToolUseIDs, memoCache[19] = isTranscriptMode, memoCache[20] = lookups, memoCache[21] = messageUuid, memoCache[22] = param, memoCache[23] = progressMessagesForMessage, memoCache[24] = shouldAnimate, memoCache[25] = shouldShowDot, memoCache[26] = tools, memoCache[27] = verbose, memoCache[28] = toolUseEl;else toolUseEl = memoCache[28];
        return toolUseEl;
      }
    case "text":
      {
        if (displayedText !== void 0 && !verbose) {
          if (!isFirstTextBlock) return null;
          let displayedTextBlock;
          if (memoCache[29] !== displayedText) displayedTextBlock = {
            type: "text",
            text: displayedText
          }, memoCache[29] = displayedText, memoCache[30] = displayedTextBlock;else displayedTextBlock = memoCache[30];
          let displayedTextEl;
          if (memoCache[31] !== addMargin || memoCache[32] !== messageUuid || memoCache[33] !== onOpenRateLimitOptions || memoCache[34] !== shouldShowDot || memoCache[35] !== displayedTextBlock || memoCache[36] !== verbose || memoCache[37] !== width) displayedTextEl = BE.jsx(Fpo, {
            param: displayedTextBlock,
            addMargin: addMargin,
            shouldShowDot: shouldShowDot,
            verbose: verbose,
            width: width,
            onOpenRateLimitOptions: onOpenRateLimitOptions,
            messageUuid: messageUuid
          }), memoCache[31] = addMargin, memoCache[32] = messageUuid, memoCache[33] = onOpenRateLimitOptions, memoCache[34] = shouldShowDot, memoCache[35] = displayedTextBlock, memoCache[36] = verbose, memoCache[37] = width, memoCache[38] = displayedTextEl;else displayedTextEl = memoCache[38];
          return displayedTextEl;
        }
        let textEl;
        if (memoCache[39] !== addMargin || memoCache[40] !== messageUuid || memoCache[41] !== onOpenRateLimitOptions || memoCache[42] !== param || memoCache[43] !== shouldShowDot || memoCache[44] !== verbose || memoCache[45] !== width) textEl = BE.jsx(Fpo, {
          param: param,
          addMargin: addMargin,
          shouldShowDot: shouldShowDot,
          verbose: verbose,
          width: width,
          onOpenRateLimitOptions: onOpenRateLimitOptions,
          messageUuid: messageUuid
        }), memoCache[39] = addMargin, memoCache[40] = messageUuid, memoCache[41] = onOpenRateLimitOptions, memoCache[42] = param, memoCache[43] = shouldShowDot, memoCache[44] = verbose, memoCache[45] = width, memoCache[46] = textEl;else textEl = memoCache[46];
        return textEl;
      }
    case "redacted_thinking":
      {
        if (!isTranscriptMode && !verbose) return null;
        let redactedThinkingEl;
        if (memoCache[47] !== addMargin) redactedThinkingEl = BE.jsx(G9a, {
          addMargin: addMargin
        }), memoCache[47] = addMargin, memoCache[48] = redactedThinkingEl;else redactedThinkingEl = memoCache[48];
        return redactedThinkingEl;
      }
    case "thinking":
      {
        if (!isTranscriptMode && !verbose) return null;
        let thinkingEl;
        if (memoCache[49] !== addMargin || memoCache[50] !== isTranscriptMode || memoCache[51] !== param || memoCache[52] !== verbose) thinkingEl = BE.jsx(f3n, {
          addMargin: addMargin,
          param: param,
          isTranscriptMode: isTranscriptMode,
          verbose: verbose
        }), memoCache[49] = addMargin, memoCache[50] = isTranscriptMode, memoCache[51] = param, memoCache[52] = verbose, memoCache[53] = thinkingEl;else thinkingEl = memoCache[53];
        return thinkingEl;
      }
    case "server_tool_use":
    case "advisor_tool_result":
      {
        if (jqe(param)) {
          let showVerbose = verbose || isTranscriptMode,
            serverToolEl;
          if (memoCache[54] !== addMargin || memoCache[55] !== advisorModel || memoCache[56] !== lookups.erroredToolUseIDs || memoCache[57] !== lookups.resolvedToolUseIDs || memoCache[58] !== param || memoCache[59] !== shouldAnimate || memoCache[60] !== showVerbose) serverToolEl = BE.jsx($9a, {
            block: param,
            addMargin: addMargin,
            resolvedToolUseIDs: lookups.resolvedToolUseIDs,
            erroredToolUseIDs: lookups.erroredToolUseIDs,
            shouldAnimate: shouldAnimate,
            verbose: showVerbose,
            advisorModel: advisorModel
          }), memoCache[54] = addMargin, memoCache[55] = advisorModel, memoCache[56] = lookups.erroredToolUseIDs, memoCache[57] = lookups.resolvedToolUseIDs, memoCache[58] = param, memoCache[59] = shouldAnimate, memoCache[60] = showVerbose, memoCache[61] = serverToolEl;else serverToolEl = memoCache[61];
          return serverToolEl;
        }
        return Ie(Error(`Unable to render server tool block: ${param.type}`)), null;
      }
    default:
      return Ie(Error(`Unable to render message type: ${param.type}`)), null;
  }
}

/**
 * React.memo equality comparator for the message renderer.
 * Returns true when the previous (`prevProps`) and next (`nextProps`) props
 * are equivalent enough to skip re-rendering.
 */
function $Pp(prevProps: any, nextProps: any): boolean {
  if (prevProps.message.uuid !== nextProps.message.uuid) return !1;
  if (prevProps.verbose !== nextProps.verbose) return !1;
  let prevIsLatestBash = prevProps.latestBashOutputUUID === prevProps.message.uuid,
    nextIsLatestBash = nextProps.latestBashOutputUUID === nextProps.message.uuid;
  if (prevIsLatestBash !== nextIsLatestBash) return !1;
  if (prevProps.isTranscriptMode !== nextProps.isTranscriptMode) return !1;
  if (prevProps.containerWidth !== nextProps.containerWidth) return !1;
  if (prevProps.isStatic && nextProps.isStatic) {
    let prevBriefHiddenCount = prevProps.message.type === "system" && prevProps.message.subtype === "turn_duration" ? prevProps.message.briefHiddenCount : void 0,
      nextBriefHiddenCount = nextProps.message.type === "system" && nextProps.message.subtype === "turn_duration" ? nextProps.message.briefHiddenCount : void 0;
    return prevBriefHiddenCount === nextBriefHiddenCount;
  }
  return !1;
}
var j3n, I6a, BE, RY;
var Ydt = b(() => {
  ui();
  je();
  uo();
  yte();
  tp();
  vn();
  O9a();
  _4();
  q9a();
  V9a();
  M3a();
  Bpo();
  n4a();
  Eqa();
  Wqa();
  Kqa();
  jqa();
  o6a();
  a6a();
  rmo();
  F3n();
  H6a();
  s_e();
  pjr();
  j3n = x(tt(), 1), I6a = x(et(), 1), BE = x(oe(), 1);
  RY = I6a.memo(FPp, $Pp);
});

export {FPp,BPp,UPp,$Pp,j3n,I6a,BE,RY,Ydt};
