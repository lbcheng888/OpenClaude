// @ts-nocheck
import {wG,NTe,lHl,ST,Gte,cHl,fS,yGt,P_,iHl,uHl,aHl,po} from "../tools/5224_userPromptCount.ts";
import {y1,SW} from "../telemetry/2793_consumer.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {CFa} from "../api/3886_level.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {wu,$k} from "./2575_current.ts";
import {Ne} from "../../vendor/m583.ts";
import {_t,gc,uo} from "../../vendor/m2468.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {jzn,mHo} from "../../vendor/m4818.ts";
import {_vl,pvl,fvl,yvl} from "../agent/4805_hookCount.ts";
import {cvl,avl,uvl} from "../../vendor/m4803.ts";
import {bnl,Cnl,C0e} from "../hooks/4360_isCollapsible.ts";
import {jqe,yte} from "../config/3910_claude_haiku_4_5.ts";
import {Yma} from "../core/3298_result.ts";
import {rl,ri} from "../tools/2235_userFacingName.ts";
import {U8,bz,i4} from "../../vendor/m2426.ts";
import {Tvl,Svl,rHo} from "../../vendor/m4805.ts";
import {lc,mg} from "../../vendor/m2209.ts";
import {iwl,awl,lwl} from "../session/4818_message.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {yg,_4} from "../../vendor/m2581.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {Nzn,oHo} from "../core/4807_oHo.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {tHe,L1t} from "../../vendor/m2810.ts";
import {Ykl,Qkl} from "./4846_itemKey.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Ql,Pa} from "../../vendor/m720.ts";
import {N2a,G1} from "../../vendor/m3957.ts";
import {b,x,oo} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {Xvl,Jvl} from "./4815_columns.ts";
import {s_e,ND} from "../../vendor/m3298.ts";
import {mkl,pkl} from "../../vendor/m4834.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {parsePermissionRule as d$,fke} from "../../vendor/m2704.ts";
import {Kkn} from "../../vendor/m2705.ts";
import {n9,UY} from "../config/4246_shouldToolsListOptInToBrief.ts";
import {aZe,wai} from "../config/2031_isPewterOwlTool.ts";
// @ts-nocheck
function filterBriefMessages(messages, keepToolNames, briefToolNames) {
  let keepSet = new Set(keepToolNames),
    briefSet = new Set(briefToolNames),
    briefPromptIndices = new Set(),
    promptIndexByMessage = [],
    promptIndex = 0;
  for (let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
    let message = messages[messageIndex],
      firstBlock = message.message?.content[0];
    if (message.type === "user" && firstBlock?.type !== "tool_result" && (!message.isMeta || wG(message.origin))) promptIndex++;else if (message.type === "attachment" && message.attachment?.type === "queued_command" && message.attachment.commandMode === "prompt" && (wG(message.attachment.origin) || !message.attachment.isMeta && y1(message.attachment.origin))) promptIndex++;else if (message.type === "assistant" && firstBlock?.type === "tool_use" && firstBlock.name && briefSet.has(firstBlock.name)) briefPromptIndices.add(promptIndex);
    promptIndexByMessage[messageIndex] = promptIndex;
  }
  let keptToolUseIds = new Set();
  return messages.filter((message, messageIndex) => {
    if (message.type === "system") return true;
    let firstBlock = message.message?.content[0];
    if (message.type === "assistant") {
      if (message.isApiErrorMessage) return true;
      if (firstBlock?.type === "tool_use" && firstBlock.name && keepSet.has(firstBlock.name)) {
        if ("id" in firstBlock) keptToolUseIds.add(firstBlock.id);
        return true;
      }
      if (firstBlock?.type === "text" && !briefPromptIndices.has(promptIndexByMessage[messageIndex])) return true;
      return false;
    }
    if (message.type === "user") {
      if (firstBlock?.type === "tool_result") return firstBlock.tool_use_id !== undefined && keptToolUseIds.has(firstBlock.tool_use_id);
      return !message.isMeta || wG(message.origin);
    }
    if (message.type === "attachment") {
      let attachment = message.attachment;
      return attachment?.type === "queued_command" && attachment.commandMode === "prompt" && (wG(attachment.origin) || !attachment.isMeta && y1(attachment.origin));
    }
    return false;
  });
}
function filterRedundantToolText(messages, toolNames) {
  let toolNameSet = new Set(toolNames),
    suppressedPromptIndices = new Set(),
    promptIndexByToolUseId = new Map(),
    promptIndexByTextMessage = [],
    promptIndex = 0;
  for (let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
    let message = messages[messageIndex],
      firstBlock = message.message?.content[0];
    if (message.type === "user" && firstBlock?.type !== "tool_result" && !message.isMeta) {
      promptIndex++;
      continue;
    }
    if (message.type === "assistant") {
      if (firstBlock?.type === "text") promptIndexByTextMessage[messageIndex] = promptIndex;else if (firstBlock?.type === "tool_use" && firstBlock.name && toolNameSet.has(firstBlock.name) && firstBlock.id) promptIndexByToolUseId.set(firstBlock.id, promptIndex);
    } else if (message.type === "user" && firstBlock?.type === "tool_result" && firstBlock.tool_use_id && promptIndexByToolUseId.has(firstBlock.tool_use_id) && !firstBlock.is_error) suppressedPromptIndices.add(promptIndexByToolUseId.get(firstBlock.tool_use_id));
  }
  if (suppressedPromptIndices.size === 0) return messages;
  return messages.filter((message, messageIndex) => {
    let textPromptIndex = promptIndexByTextMessage[messageIndex];
    return textPromptIndex === undefined || !suppressedPromptIndices.has(textPromptIndex);
  });
}
function clampRenderCap(rows) {
  return Cs() ? Math.min(nHl, rows) : nHl;
}
function rHl(messages, anchorRef, windowSize, slack = apm) {
  let anchor = anchorRef.current,
    foundIndex = anchor ? messages[anchor.idx]?.uuid === anchor.uuid ? anchor.idx : messages.findIndex(message => message.uuid === anchor.uuid) : -1,
    startIndex = foundIndex >= 0 ? foundIndex : anchor && anchor.idx < messages.length ? anchor.idx : 0;
  if (messages.length - startIndex > windowSize + slack) startIndex = messages.length - windowSize;
  let anchorMessage = messages[startIndex];
  if (anchorMessage && (anchor?.uuid !== anchorMessage.uuid || anchor.idx !== startIndex)) anchorRef.current = {
    uuid: anchorMessage.uuid,
    idx: startIndex
  };else if (!anchorMessage && anchor) anchorRef.current = null;
  return startIndex;
}
function oHl(message) {
  return (message.type === "assistant" || message.type === "user" ? NTe(message) : null) ?? message.uuid;
}
function setsEqual(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (let item of setA) if (!setB.has(item)) return false;
  return true;
}
function dedupeStreamingToolUses(previous, streamingToolUses, resolvedIds, inProgressIds) {
  let seenIds = new Set(),
    result = [];
  for (let entry of streamingToolUses) {
    let blockId = entry.contentBlock.id;
    if (resolvedIds.has(blockId) || inProgressIds.has(blockId) || seenIds.has(blockId)) continue;
    seenIds.add(blockId), result.push(entry);
  }
  if (result.length === 0) return sHl;
  if (result.length === previous.length && result.every((entry, index) => entry === previous[index])) return previous;
  return result;
}
function pickDeferredMessages(deferred, current, deferMessages) {
  return deferMessages && deferred[0] === current[0] ? deferred : current;
}
function xWe(props) {
  let cache = qHo.c(6),
    {
      deferMessages: deferMessages,
      placeholderBaseline: placeholderBaseline,
      placeholderElement: placeholderElement,
      ...rest
    } = props,
    deferredMessages = Gm.useDeferredValue(rest.messages),
    messages = pickDeferredMessages(deferredMessages, rest.messages, deferMessages),
    inner;
  if (cache[0] !== messages || cache[1] !== rest) inner = VE.jsx(mpm, {
    ...rest,
    messages: messages
  }), cache[0] = messages, cache[1] = rest, cache[2] = inner;else inner = cache[2];
  let placeholder = placeholderElement && placeholderBaseline !== undefined && messages.length <= placeholderBaseline && placeholderElement,
    result;
  if (cache[3] !== inner || cache[4] !== placeholder) result = VE.jsxs(VE.Fragment, {
    children: [inner, placeholder]
  }), cache[3] = inner, cache[4] = placeholder, cache[5] = result;else result = cache[5];
  return result;
}
function cwl(item, collapsedIds, hiddenIds, postToolUse, screen, state) {
  if (screen === "transcript") return true;
  switch (item.type) {
    case "attachment":
    case "user":
    case "assistant":
      {
        if (item.type === "assistant") {
          let firstBlock = item.message.content[0];
          if (firstBlock?.type === "server_tool_use") return state.resolvedToolUseIDs.has(firstBlock.id);
        }
        let key = NTe(item);
        if (!key) return true;
        if (collapsedIds.has(key)) return false;
        if (hiddenIds.has(key)) return false;
        if (lHl(key, "PostToolUse", state)) return false;
        return CFa(postToolUse, state.resolvedToolUseIDs);
      }
    case "system":
      return true;
    case "grouped_tool_use":
      return item.messages.every(groupMessage => {
        let firstBlock = groupMessage.message.content[0];
        return firstBlock?.type === "tool_use" && state.resolvedToolUseIDs.has(firstBlock.id);
      });
    case "collapsed_read_search":
      return false;
  }
}
var qHo,
  _Gt,
  Gm,
  VE,
  npm,
  eHl,
  rpm,
  tHl,
  opm,
  $Ho = 30,
  apm = 50,
  nHl = 200,
  cpm = ({
    messages: messages,
    tools: tools,
    commands: commands,
    verbose: verbose,
    toolJSX: toolJSX,
    inProgressToolUseIDs: inProgressToolUseIDs,
    isMessageSelectorVisible: isMessageSelectorVisible,
    conversationId: conversationId,
    screen: screen,
    streamingToolUses: streamingToolUses,
    showAllInTranscript = false,
    agentDefinitions: agentDefinitions,
    onOpenRateLimitOptions: onOpenRateLimitOptions,
    hideLogo = false,
    latchAnnouncementSlot = true,
    isLoading: isLoading,
    streamingText: streamingText,
    hideStreamingTail = false,
    isBriefOnly = false,
    unseenDivider: unseenDivider,
    scrollRef: scrollRef,
    trackStickyPrompt: trackStickyPrompt,
    jumpRef: jumpRef,
    onSearchMatchesChange: onSearchMatchesChange,
    scanElement: scanElement,
    setPositions: setPositions,
    disableRenderCap = false,
    renderRange: renderRange
  }) => {
    let briefOnly = isBriefOnly && tHl(),
      {
        columns: columns,
        rows: rows
      } = _r(),
      toggleShowAllKey = wu("transcript:toggleShowAll", "Transcript", "Ctrl+E"),
      disableVirtualScroll = Gm.useMemo(() => Ne.CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL, []),
      briefTranscript = _t(state => state.briefTranscript),
      showTimestamps = _t(state => state.showMessageTimestamps) && it("tengu_silk_hinge", false),
      store = gc(),
      unusedFlag = false,
      memoNull = Gm.useMemo(() => null, [messages, false]),
      useVirtualScroll = scrollRef != null && !disableVirtualScroll,
      renderCap = clampRenderCap(rows),
      forwardAnchorRef = Gm.useRef(null),
      cappedAnchorRef = Gm.useRef(null),
      conversationIdRef = Gm.useRef(conversationId),
      verboseRef = Gm.useRef(verbose);
    if (conversationIdRef.current !== conversationId) conversationIdRef.current = conversationId, forwardAnchorRef.current = null, cappedAnchorRef.current = null;
    if (verboseRef.current !== verbose) verboseRef.current = verbose, cappedAnchorRef.current = null;
    let windowStart = !useVirtualScroll && !disableRenderCap ? rHl(messages, forwardAnchorRef, renderCap * 2) : 0,
      groupCacheRef = Gm.useRef(null);
    groupCacheRef.current ??= new WeakMap();
    let groupCache = groupCacheRef.current,
      groupedMessages = Gm.useMemo(() => {
        let hasWindow = windowStart > 0,
          windowedMessages = hasWindow ? messages.slice(windowStart) : messages;
        return ST(windowedMessages, hasWindow, groupCache).filter(Gte);
      }, [messages, windowStart, groupCache]),
      latestBashOutputUUID = Gm.useMemo(() => {
        for (let index = groupedMessages.length - 1; index >= 0; index--) {
          let groupedMessage = groupedMessages[index];
          if (groupedMessage?.type === "user") {
            let content = groupedMessage.message.content;
            for (let block of content) if (block.type === "text") {
              let text = block.text;
              if (text.startsWith("<bash-stdout") || text.startsWith("<bash-stderr")) return groupedMessage.uuid;
            }
          }
        }
        return null;
      }, [groupedMessages]),
      resolvedState = Gm.useMemo(() => cHl(groupedMessages), [groupedMessages]),
      streamingToolUsesRef = Gm.useRef(sHl),
      dedupedStreamingToolUses = Gm.useMemo(() => {
        let deduped = dedupeStreamingToolUses(streamingToolUsesRef.current, streamingToolUses, inProgressToolUseIDs, resolvedState);
        return streamingToolUsesRef.current = deduped, deduped;
      }, [streamingToolUses, inProgressToolUseIDs, resolvedState]),
      streamingMessages = Gm.useMemo(() => dedupedStreamingToolUses.flatMap(entry => {
        let streamingMessage = fS({
          content: [entry.contentBlock]
        });
        return streamingMessage.uuid = yGt(entry.contentBlock.id, 0), ST([streamingMessage]);
      }), [dedupedStreamingToolUses]),
      isTranscript = screen === "transcript",
      truncateTail = isTranscript && !showAllInTranscript && !useVirtualScroll,
      {
        collapsedBase: collapsedBase,
        lookups: lookups,
        hasTruncatedMessages: hasTruncatedMessages,
        hiddenMessageCount: hiddenMessageCount
      } = Gm.useMemo(() => {
        let baseMessages = verbose || Cs() ? groupedMessages : P_(groupedMessages, undefined),
          collapsed = iHl(baseMessages.filter(message => message.type !== "progress").filter(message => !jzn(message)).filter(message => uHl(message, isTranscript)), streamingMessages),
          keepNames = [eHl, rpm],
          briefNames = [eHl],
          briefFiltered = !isTranscript && (tHl() || !opm()) ? briefOnly ? filterBriefMessages(collapsed, keepNames, briefNames) : filterRedundantToolText(collapsed, briefNames) : collapsed,
          tailLimited = truncateTail ? briefFiltered.slice(-$Ho) : briefFiltered,
          truncated = truncateTail && briefFiltered.length > $Ho,
          {
            messages: normalizedMessages
          } = _vl(tailLimited, tools, verbose),
          collapsedResult = cvl(pvl(fvl(bnl(normalizedMessages, tools))), verbose),
          lookupResult = aHl(groupedMessages, tailLimited),
          hiddenCount = collapsed.length - $Ho;
        return {
          collapsedBase: collapsedResult,
          lookups: lookupResult,
          hasTruncatedMessages: truncated,
          hiddenMessageCount: hiddenCount
        };
      }, [verbose, groupedMessages, isTranscript, streamingMessages, truncateTail, tools, briefOnly]),
      decoratedBase = Gm.useMemo(() => {
        if (!(Cs() && briefTranscript && !isTranscript)) return collapsedBase;
        return Cnl(collapsedBase, tools, taskId => {
          let task = store.getState().tasks[taskId];
          return task?.type === "local_agent" ? task.result?.toolStats : undefined;
        }, isLoading);
      }, [collapsedBase, tools, briefTranscript, isTranscript, store, isLoading]),
      visibleMessages = Gm.useMemo(() => {
        let cappedStart = !useVirtualScroll && !disableRenderCap ? rHl(decoratedBase, cappedAnchorRef, renderCap) : 0;
        return renderRange ? decoratedBase.slice(renderRange[0], renderRange[1]) : cappedStart > 0 ? decoratedBase.slice(cappedStart) : decoratedBase;
      }, [decoratedBase, renderRange, useVirtualScroll, disableRenderCap, renderCap]),
      streamingIds = Gm.useMemo(() => new Set(streamingToolUses.map(entry => entry.contentBlock.id)), [streamingToolUses]),
      memoNull2 = Gm.useMemo(() => null, [visibleMessages, memoNull]),
      unseenDividerIndex = Gm.useMemo(() => {
        if (!unseenDivider) return -1;
        let prefix = unseenDivider.firstUnseenUuid.slice(0, 24);
        return visibleMessages.findIndex(message => message.uuid.slice(0, 24) === prefix);
      }, [unseenDivider, visibleMessages]),
      [expandedKeys, setExpandedKeys] = Gm.useState(() => new Set()),
      toggleExpanded = Gm.useCallback(message => {
        let key = oHl(message);
        setExpandedKeys(prev => {
          let next = new Set(prev);
          if (next.has(key)) next.delete(key);else next.add(key);
          return next;
        });
      }, []),
      isExpanded = Gm.useCallback(message => expandedKeys.size > 0 && expandedKeys.has(oHl(message)), [expandedKeys]),
      lookupsRef = Gm.useRef(lookups);
    lookupsRef.current = lookups;
    let columnsRef = Gm.useRef(columns);
    columnsRef.current = columns;
    let isItemClickable = Gm.useCallback(message => {
        if (message.type === "collapsed_read_search") return true;
        if (message.type === "attachment") {
          if (verbose || isTranscript) return false;
          return message.attachment?.type === "goal_status" && !!message.attachment.reason;
        }
        if (message.type === "assistant") {
          let firstBlock = message.message.content[0];
          return firstBlock != null && jqe(firstBlock) && firstBlock.type === "advisor_tool_result" && firstBlock.content.type === "advisor_result";
        }
        if (message.type !== "user") return false;
        let firstBlock = message.message.content[0];
        if (firstBlock?.type !== "tool_result") return false;
        if (firstBlock.is_error) return Yma(firstBlock.content);
        if (!message.toolUseResult) return false;
        let toolName = lookupsRef.current.toolUseByToolUseID.get(firstBlock.tool_use_id)?.name;
        return (toolName ? rl(tools, toolName) : undefined)?.isResultTruncated?.(message.toolUseResult, {
          columns: columnsRef.current
        }) ?? false;
      }, [tools, verbose, isTranscript]),
      canAnimate = (!toolJSX || !!toolJSX.shouldContinueAnimation) && !isMessageSelectorVisible,
      hasToolsInProgress = inProgressToolUseIDs.size > 0,
      progressContext = Gm.useContext(U8);
    Gm.useEffect(() => {
      if (!progressContext) return;
      return Tvl(progressContext), () => Svl(progressContext);
    }, [progressContext]);
    let {
        progress: setProgress
      } = bz(),
      lastProgressRef = Gm.useRef(null),
      progressBarEnabled = lc("terminalProgressBarEnabled", true).value;
    Gm.useEffect(() => {
      let progress = avl({
        enabled: progressBarEnabled,
        isLoading: isLoading,
        hasToolsInProgress: hasToolsInProgress
      });
      if (lastProgressRef.current === progress) return;
      lastProgressRef.current = progress, setProgress(progress);
    }, [setProgress, progressBarEnabled, isLoading, hasToolsInProgress]), Gm.useEffect(() => () => setProgress(null), [setProgress]);
    let itemKey = Gm.useCallback(message => `${message.uuid}-${conversationId}`, [conversationId]),
      renderItem = (message, index) => {
        let prevType = index > 0 ? visibleMessages[index - 1]?.type : undefined,
          isUserContinuation = message.type === "user" && prevType === "user",
          hasContentAfter = message.type === "collapsed_read_search" && (!!streamingText || iwl(visibleMessages, index, tools, streamingIds)),
          key = itemKey(message),
          element = VE.jsx(awl, {
            message: message,
            isUserContinuation: isUserContinuation,
            hasContentAfter: hasContentAfter,
            tools: tools,
            commands: commands,
            verbose: verbose || isExpanded(message),
            showMessageTimestamps: showTimestamps,
            inProgressToolUseIDs: inProgressToolUseIDs,
            streamingToolUseIDs: streamingIds,
            screen: screen,
            canAnimate: canAnimate,
            onOpenRateLimitOptions: onOpenRateLimitOptions,
            latestBashOutputUUID: latestBashOutputUUID,
            columns: columns,
            isLoading: isLoading,
            lookups: lookups
          }, key);
        if (unseenDivider && index === unseenDividerIndex) return [VE.jsx($, {
          marginTop: 1,
          children: VE.jsx(yg, {
            title: `${unseenDivider.count} new ${Sn(unseenDivider.count, "message")}`,
            width: columns,
            color: "inactive"
          })
        }, "unseen-divider"), element];
        return element;
      },
      searchTextCacheRef = Gm.useRef(null);
    searchTextCacheRef.current ??= new WeakMap();
    let searchTextCache = searchTextCacheRef.current,
      extractSearchText = Gm.useCallback(message => {
        let cached = searchTextCache.get(message);
        if (cached !== undefined) return cached;
        let text = Nzn(message);
        if (message.type === "user" && message.toolUseResult && Array.isArray(message.message.content)) {
          let toolResult = message.message.content.find(block => block.type === "tool_result");
          if (toolResult && "tool_use_id" in toolResult) {
            let toolInfo = lookupsRef.current.toolUseByToolUseID.get(toolResult.tool_use_id),
              extracted = (toolInfo && rl(tools, toolInfo.name))?.extractSearchText?.(message.toolUseResult);
            if (extracted !== undefined) text = extracted;
          }
        }
        let lowered = text.toLowerCase();
        return searchTextCache.set(message, lowered), lowered;
      }, [tools, searchTextCache]);
    return VE.jsxs(VE.Fragment, {
      children: [!hideLogo && !(renderRange && renderRange[0] > 0) && VE.jsx(npm, {
        agentDefinitions: agentDefinitions,
        latchAnnouncementSlot: latchAnnouncementSlot
      }), hasTruncatedMessages && VE.jsx(yg, {
        title: `${toggleShowAllKey} to show ${bt.bold(hiddenMessageCount)} previous messages`,
        width: columns
      }), isTranscript && showAllInTranscript && hiddenMessageCount > 0 && !disableRenderCap && VE.jsx(yg, {
        title: `${toggleShowAllKey} to hide ${bt.bold(hiddenMessageCount)} previous messages`,
        width: columns
      }), useVirtualScroll ? VE.jsx(tHe.Provider, {
        value: true,
        children: VE.jsx(Ykl, {
          messages: visibleMessages,
          scrollRef: scrollRef,
          columns: columns,
          itemKey: itemKey,
          renderItem: renderItem,
          onItemClick: toggleExpanded,
          isItemClickable: isItemClickable,
          isItemExpanded: isExpanded,
          trackStickyPrompt: trackStickyPrompt,
          jumpRef: jumpRef,
          onSearchMatchesChange: onSearchMatchesChange,
          scanElement: scanElement,
          setPositions: setPositions,
          extractSearchText: extractSearchText
        })
      }) : visibleMessages.flatMap(renderItem), streamingText && !briefOnly && VE.jsx($, {
        alignItems: "flex-start",
        flexDirection: "row",
        marginTop: 1,
        width: "100%",
        children: VE.jsxs($, {
          flexDirection: "row",
          children: [VE.jsx($, {
            minWidth: 2,
            children: VE.jsx(v, {
              "aria-label": "claude:",
              color: "text",
              children: Ql
            })
          }), VE.jsx($, {
            flexDirection: "column",
            children: VE.jsx(N2a, {
              hideTrailingLine: hideStreamingTail,
              children: streamingText
            })
          })]
        })
      })]
    });
  },
  sHl,
  mpm;
var oGt = b(() => {
  Gc();
  Pa();
  ui();
  i4();
  je();
  $k();
  jn();
  uo();
  ri();
  yte();
  uvl();
  C0e();
  Ir();
  tp();
  yvl();
  SW();
  po();
  mg();
  lr();
  rHo();
  oHo();
  _4();
  Xvl();
  G1();
  lwl();
  mHo();
  s_e();
  mkl();
  L1t();
  Qkl();
  qHo = x(tt(), 1), _Gt = x(et(), 1), Gm = x(et(), 1), VE = x(oe(), 1), npm = _Gt.memo(function (props) {
    let cache = qHo.c(5),
      {
        agentDefinitions: agentDefinitions,
        latchAnnouncementSlot: latchAnnouncementSlot
      } = props,
      logo,
      spacer;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) logo = VE.jsx(Jvl, {}), spacer = null, cache[0] = logo, cache[1] = spacer;else logo = cache[0], spacer = cache[1];
    let element;
    if (cache[2] !== agentDefinitions || cache[3] !== latchAnnouncementSlot) element = VE.jsx(ND, {
      children: VE.jsxs($, {
        flexDirection: "column",
        gap: 1,
        children: [logo, spacer, VE.jsx(_Gt.Suspense, {
          fallback: null,
          children: VE.jsx(pkl, {
            agentDefinitions: agentDefinitions,
            latchAnnouncementSlot: latchAnnouncementSlot
          })
        })]
      })
    }), cache[2] = agentDefinitions, cache[3] = latchAnnouncementSlot, cache[4] = element;else element = cache[4];
    return element;
  }), eHl = (d$(), oo(fke)).BRIEF_TOOL_NAME, rpm = oo(Kkn).SEND_USER_FILE_TOOL_NAME, tHl = (n9(), oo(UY)).isBriefEnabled, opm = (aZe(), oo(wai)).isPewterOwlTool;
  sHl = [];
  mpm = _Gt.memo(cpm, (prevProps, nextProps) => {
    let keys = Object.keys(prevProps);
    for (let key of keys) {
      if (key === "onOpenRateLimitOptions" || key === "scrollRef" || key === "trackStickyPrompt" || key === "jumpRef" || key === "onSearchMatchesChange" || key === "scanElement" || key === "setPositions") continue;
      if (prevProps[key] !== nextProps[key]) {
        if (key === "streamingToolUses") {
          let prevStreaming = prevProps.streamingToolUses,
            nextStreaming = nextProps.streamingToolUses;
          if (prevStreaming.length === nextStreaming.length && prevStreaming.every((entry, index) => entry.contentBlock === nextStreaming[index]?.contentBlock)) continue;
        }
        if (key === "inProgressToolUseIDs") {
          if (setsEqual(prevProps.inProgressToolUseIDs, nextProps.inProgressToolUseIDs)) continue;
        }
        if (key === "unseenDivider") {
          let prevDivider = prevProps.unseenDivider,
            nextDivider = nextProps.unseenDivider;
          if (prevDivider?.firstUnseenUuid === nextDivider?.firstUnseenUuid && prevDivider?.count === nextDivider?.count) continue;
        }
        if (key === "tools") {
          let prevTools = prevProps.tools,
            nextTools = nextProps.tools;
          if (prevTools.length === nextTools.length && prevTools.every((tool, index) => tool.name === nextTools[index]?.name)) continue;
        }
        return false;
      }
    }
    return true;
  });
});

export {filterBriefMessages as spm,filterRedundantToolText as ipm,clampRenderCap as lpm,rHl,oHl,setsEqual as upm,dedupeStreamingToolUses as dpm,pickDeferredMessages as ppm,xWe,cwl,qHo,_Gt,Gm,VE,npm,eHl,rpm,tHl,opm,$Ho,apm,nHl,cpm,sHl,mpm,oGt};
