// @ts-nocheck
import {Nzn,oHo} from "../core/4807_oHo.ts";
import {Zkl,po} from "../tools/5224_userPromptCount.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Zqr,zve} from "../../vendor/m2433.ts";
import {hkl,gkl} from "../../vendor/m4835.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Ta,Ct} from "../../vendor/m197.ts";
import {djn,BHo} from "../../vendor/m4844.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// Cache for extracting search text from messages via Nzn
function Ydm(message: any): any {
  let cached = Kkl.get(message);
  if (cached !== void 0) return cached;
  let computed = Nzn(message);
  return Kkl.set(message, computed), computed;
}
// Returns sticky-prompt text for a message, or null. Uses a WeakMap cache.
function UHo(message: any): any {
  if (message === void 0) return null;
  let cached = zkl.get(message);
  if (cached !== void 0) return cached;
  let computed = Xdm(message);
  return zkl.set(message, computed), computed;
}
// Extracts the sticky prompt text from a message item, or null
function Xdm(message: any): any {
  let text = null;
  if (message.type === "user") {
    if (message.isMeta || message.isVisibleInTranscriptOnly) return null;
    let block = message.message.content[0];
    if (block?.type !== "text") return null;
    text = block.text;
  } else if (message.type === "attachment" && message.attachment.type === "queued_command" && message.attachment.commandMode !== "task-notification" && !message.attachment.isMeta) {
    let prompt = message.attachment.prompt;
    text = typeof prompt === "string" ? prompt : prompt.flatMap((part: any) => part.type === "text" ? [part.text] : []).join(`
`);
  }
  if (text === null) return null;
  let trimmed = Zkl(text);
  if (trimmed.startsWith("<") || trimmed === "") return null;
  return trimmed;
}
// Renders a single virtual list item with hover, click, and expand support
function Qdm({
  itemKey,
  msg,
  idx,
  measureRef,
  expanded,
  hovered,
  clickable,
  onClickK,
  onEnterK,
  onLeaveK,
  renderItemRef
}: any): any {
  return Rne.jsx($, {
    ref: measureRef(itemKey),
    flexDirection: "column",
    backgroundColor: expanded ? "userMessageBackgroundHover" : void 0,
    paddingBottom: expanded ? 1 : void 0,
    onClick: clickable ? (event: any) => {
      if (event.hyperlinkUrl) return event.allowDefault();
      onClickK(msg, event.cellIsBlank);
    } : void 0,
    onMouseEnter: clickable ? () => onEnterK(itemKey) : void 0,
    onMouseLeave: clickable ? () => onLeaveK(itemKey) : void 0,
    hoverIgnoresBlankCells: !expanded,
    children: Rne.jsx(Zqr.Provider, {
      value: hovered && !expanded,
      children: renderItemRef.current(msg, idx)
    })
  });
}
// Virtual message list component: windowed rendering, search, jump, sticky prompt
function Ykl({
  messages,
  scrollRef,
  columns,
  itemKey,
  renderItem,
  onItemClick,
  isItemClickable,
  isItemExpanded,
  extractSearchText = Ydm,
  trackStickyPrompt,
  jumpRef,
  onSearchMatchesChange,
  scanElement,
  setPositions
}: any): any {
  let keyStateRef = rf.useRef({
      keys: [],
      uuids: [],
      seen: new Map(),
      itemKey,
      loggedDups: new Set()
    }),
    keys = rf.useMemo(() => tpm(messages, itemKey, keyStateRef.current, Xkl), [messages, itemKey]),
    {
      range,
      topSpacer,
      bottomSpacer,
      measureRef,
      spacerRef,
      offsets,
      getItemTop,
      getItemElement,
      scrollToIndex
    } = hkl(scrollRef, keys, columns),
    [rangeStart, rangeEnd] = range,
    vlistRef = rf.useRef({
      offsets,
      start: rangeStart,
      getItemElement,
      getItemTop,
      messages,
      scrollToIndex
    });
  vlistRef.current = {
    offsets,
    start: rangeStart,
    getItemElement,
    getItemTop,
    messages,
    scrollToIndex
  };
  let lastNavIdxRef = rf.useRef(null);
  // Finds the next/prev message index (by step direction) that has sticky-prompt text
  function findNavTarget(fromIdx: any, step: any): any {
    let {
      messages: msgs
    } = vlistRef.current;
    for (let idx = fromIdx + step; idx >= 0 && idx < msgs.length; idx += step) if (UHo(msgs[idx]) !== null) return idx;
    return -1;
  }
  let pendingSeekRef = rf.useRef(null),
    matchPositionsRef = rf.useRef({
      msgIdx: -1,
      positions: []
    }),
    stepAnchorPtrRef = rf.useRef(-1),
    emptySeekCountRef = rf.useRef(0),
    queuedStepRef = rf.useRef(0),
    stepFnRef = rf.useRef(() => {}),
    highlightFnRef = rf.useRef(() => {}),
    searchStateRef = rf.useRef({
      matches: [],
      ptr: 0,
      screenOrd: 0,
      prefixSum: []
    }),
    anchorScrollTopRef = rf.useRef(-1),
    warmedRef = rf.useRef(!1);
  // Computes the scroll target (clamped to >= 0) to bring an item near the top
  function scrollTargetFor(idx: any): any {
    let top = vlistRef.current.getItemTop(idx);
    return Math.max(0, top - pjn);
  }
  // Highlights the search match at the given ordinal within the current message
  function highlight(ord: any): any {
    let scroller = scrollRef.current,
      {
        msgIdx,
        positions
      } = matchPositionsRef.current;
    if (!scroller || positions.length === 0 || msgIdx < 0) {
      setPositions?.(null);
      return;
    }
    let clampedOrd = Math.max(0, Math.min(ord, positions.length - 1)),
      pos = positions[clampedOrd],
      msgTop = vlistRef.current.getItemTop(msgIdx),
      viewportTop = scroller.getViewportTop(),
      localOffset = msgTop - scroller.getScrollTop(),
      viewportHeight = scroller.getViewportHeight(),
      screenRow = viewportTop + localOffset + pos.row;
    if (screenRow < viewportTop || screenRow >= viewportTop + viewportHeight) scroller.scrollTo(Math.max(0, msgTop + pos.row - pjn)), localOffset = msgTop - scroller.getScrollTop(), screenRow = viewportTop + localOffset + pos.row;
    setPositions?.({
      positions,
      rowOffset: viewportTop + localOffset,
      currentIdx: clampedOrd
    });
    let searchState = searchStateRef.current,
      totalMatches = searchState.prefixSum.at(-1) ?? 0,
      currentBadge = (searchState.prefixSum[searchState.ptr] ?? 0) + clampedOrd + 1;
    onSearchMatchesChange?.(totalMatches, currentBadge), A(`highlight(i=${msgIdx}, ord=${clampedOrd}/${positions.length}): pos={row:${pos.row},col:${pos.col}} lo=${localOffset} screenRow=${screenRow} badge=${currentBadge}/${totalMatches}`);
  }
  highlightFnRef.current = highlight;
  let [seekTick, setSeekTick] = rf.useState(0),
    bumpSeekTick = rf.useCallback(() => setSeekTick((tick: any) => tick + 1), []);
  rf.useEffect(() => {
    let pending = pendingSeekRef.current;
    if (!pending) return;
    let {
        idx,
        wantLast,
        tries
      } = pending,
      scroller = scrollRef.current;
    if (!scroller) return;
    let {
        getItemElement: getElem,
        getItemTop: getTop,
        scrollToIndex: scrollIdx
      } = vlistRef.current,
      elem = getElem(idx),
      elemHeight = elem?.yogaNode?.getComputedHeight() ?? 0;
    if (!elem || elemHeight === 0) {
      if (tries > 1) {
        pendingSeekRef.current = null, A(`seek(i=${idx}): no mount after scrollToIndex, skip`), stepFnRef.current(wantLast ? -1 : 1);
        return;
      }
      pendingSeekRef.current = {
        idx,
        wantLast,
        tries: tries + 1
      }, scrollIdx(idx), bumpSeekTick();
      return;
    }
    pendingSeekRef.current = null, scroller.scrollTo(Math.max(0, getTop(idx) - pjn));
    let positions = scanElement?.(elem) ?? [];
    if (matchPositionsRef.current = {
      msgIdx: idx,
      positions
    }, A(`seek(i=${idx} t=${tries}): ${positions.length} positions`), positions.length === 0) {
      if (++emptySeekCountRef.current > 20) {
        emptySeekCountRef.current = 0;
        return;
      }
      stepFnRef.current(wantLast ? -1 : 1);
      return;
    }
    emptySeekCountRef.current = 0;
    let startOrd = wantLast ? positions.length - 1 : 0;
    searchStateRef.current.screenOrd = startOrd, stepAnchorPtrRef.current = -1, highlightFnRef.current(startOrd);
    let queuedStep = queuedStepRef.current;
    if (queuedStep) queuedStepRef.current = 0, stepFnRef.current(queuedStep);
  }, [seekTick]);
  // Begins scrolling toward a message index; mounts then defers to the seek effect
  function seekToMessage(idx: any, wantLast: any): any {
    let scroller = scrollRef.current;
    if (!scroller) return;
    let vlist = vlistRef.current,
      {
        getItemElement: getElem,
        scrollToIndex: scrollIdx
      } = vlist;
    if (idx < 0 || idx >= vlist.messages.length) return;
    setPositions?.(null), matchPositionsRef.current = {
      msgIdx: -1,
      positions: []
    }, pendingSeekRef.current = {
      idx,
      wantLast,
      tries: 0
    };
    let elem = getElem(idx),
      elemHeight = elem?.yogaNode?.getComputedHeight() ?? 0;
    if (elem && elemHeight > 0) scroller.scrollTo(scrollTargetFor(idx));else scrollIdx(idx);
    bumpSeekTick();
  }
  // Steps the current match by +1/-1, within a message or across matches (wrapping)
  function step(direction: any): any {
    let searchState = searchStateRef.current,
      {
        matches,
        prefixSum
      } = searchState,
      totalMatches = prefixSum.at(-1) ?? 0;
    if (matches.length === 0) return;
    if (pendingSeekRef.current) {
      queuedStepRef.current = direction;
      return;
    }
    if (stepAnchorPtrRef.current < 0) stepAnchorPtrRef.current = searchState.ptr;
    let {
        positions
      } = matchPositionsRef.current,
      nextOrd = searchState.screenOrd + direction;
    if (nextOrd >= 0 && nextOrd < positions.length) {
      searchState.screenOrd = nextOrd, highlight(nextOrd), stepAnchorPtrRef.current = -1;
      return;
    }
    let nextPtr = (searchState.ptr + direction + matches.length) % matches.length;
    if (nextPtr === stepAnchorPtrRef.current) {
      setPositions?.(null), stepAnchorPtrRef.current = -1, A(`step: wraparound at ptr=${nextPtr}, all ${matches.length} msgs phantoms`);
      return;
    }
    searchState.ptr = nextPtr, searchState.screenOrd = 0, seekToMessage(matches[nextPtr], direction < 0);
    let nextBadge = direction < 0 ? prefixSum[nextPtr + 1] ?? totalMatches : prefixSum[nextPtr] + 1;
    onSearchMatchesChange?.(totalMatches, nextBadge);
  }
  stepFnRef.current = step;
  // Finds the index of the last fully-visible message at/below the current scroll top
  function findFirstVisibleIdx(): any {
    let scroller = scrollRef.current,
      {
        offsets: offs,
        start,
        getItemTop: getTop,
        messages: msgs
      } = vlistRef.current,
      count = msgs.length;
    if (!scroller || count === 0) return -1;
    let scrollTop = scroller.getScrollTop() + pjn,
      startTop = getTop(start);
    if (startTop >= 0 && startTop <= scrollTop) {
      let lastIdx = start;
      for (let idx = start; idx < count; idx++) {
        let top = getTop(idx);
        if (top < 0 || top > scrollTop) break;
        lastIdx = idx;
      }
      return lastIdx;
    }
    let originOffset = startTop >= 0 ? startTop - offs[start] : 0,
      target = scrollTop - originOffset,
      lo = 0,
      hi = count - 1;
    while (lo < hi) {
      let mid = lo + hi + 1 >> 1;
      if (offs[mid] <= target) lo = mid;else hi = mid - 1;
    }
    return lo;
  }
  // Scrolls to a message index (via scrollTo if mounted, else scrollToIndex)
  function scrollToMessage(idx: any): any {
    let scroller = scrollRef.current,
      {
        messages: msgs,
        getItemTop: getTop,
        scrollToIndex: scrollIdx
      } = vlistRef.current;
    if (!scroller || idx < 0 || idx >= msgs.length) return;
    if (getTop(idx) >= 0) scroller.scrollTo(scrollTargetFor(idx));else scrollIdx(idx);
  }
  rf.useImperativeHandle(jumpRef, () => ({
    jumpToIndex: (idx: any) => {
      let scroller = scrollRef.current;
      if (scroller) scroller.scrollTo(scrollTargetFor(idx));
    },
    nextMessage: () => {
      let from = lastNavIdxRef.current ?? findFirstVisibleIdx();
      if (from < 0) return;
      let target = findNavTarget(from, 1);
      if (target < 0) return;
      scrollToMessage(target), lastNavIdxRef.current = target;
    },
    prevMessage: () => {
      let last = lastNavIdxRef.current,
        from = last ?? findFirstVisibleIdx();
      if (from < 0) return;
      if (last === null && UHo(vlistRef.current.messages[from]) === null) {
        let target = findNavTarget(from, -1);
        if (target >= 0) scrollToMessage(target), lastNavIdxRef.current = target;
        return;
      }
      let target = findNavTarget(from, -1);
      if (target < 0) return;
      scrollToMessage(target), lastNavIdxRef.current = target;
    },
    setSearchQuery: (query: any) => {
      pendingSeekRef.current = null, matchPositionsRef.current = {
        msgIdx: -1,
        positions: []
      }, stepAnchorPtrRef.current = -1, setPositions?.(null);
      let needle = query.toLowerCase(),
        matches: any = [],
        prefixSum: any = [0];
      if (needle) {
        let msgs = vlistRef.current.messages;
        for (let idx = 0; idx < msgs.length; idx++) {
          let msg = msgs[idx];
          if (msg === void 0) continue;
          let searchText = extractSearchText(msg),
            hitPos = searchText.indexOf(needle),
            hitCount = 0;
          while (hitPos >= 0) hitCount++, hitPos = searchText.indexOf(needle, hitPos + needle.length);
          if (hitCount > 0) matches.push(idx), prefixSum.push(prefixSum.at(-1) + hitCount);
        }
      }
      let totalMatches = prefixSum.at(-1),
        bestPtr = 0,
        scroller = scrollRef.current,
        {
          offsets: offs,
          start,
          getItemTop: getTop
        } = vlistRef.current,
        startTop = getTop(start),
        originOffset = startTop >= 0 ? startTop - offs[start] : 0;
      if (matches.length > 0 && scroller) {
        let curTop = anchorScrollTopRef.current >= 0 ? anchorScrollTopRef.current : scroller.getScrollTop(),
          bestDist = 1 / 0;
        for (let i = 0; i < matches.length; i++) {
          let dist = Math.abs(originOffset + offs[matches[i]] - curTop);
          if (dist <= bestDist) bestDist = dist, bestPtr = i;
        }
        A(`setSearchQuery('${query}'): ${matches.length} msgs \xB7 ptr=${bestPtr} msgIdx=${matches[bestPtr]} curTop=${curTop} origin=${originOffset}`);
      }
      if (searchStateRef.current = {
        matches,
        ptr: bestPtr,
        screenOrd: 0,
        prefixSum
      }, matches.length > 0) seekToMessage(matches[bestPtr], !0);else if (anchorScrollTopRef.current >= 0 && scroller) scroller.scrollTo(anchorScrollTopRef.current);
      onSearchMatchesChange?.(totalMatches, matches.length > 0 ? prefixSum[bestPtr + 1] ?? totalMatches : 0);
    },
    nextMatch: () => step(1),
    prevMatch: () => step(-1),
    setAnchor: () => {
      let scroller = scrollRef.current;
      if (scroller) anchorScrollTopRef.current = scroller.getScrollTop();
    },
    disarmSearch: () => {
      setPositions?.(null), pendingSeekRef.current = null, matchPositionsRef.current = {
        msgIdx: -1,
        positions: []
      }, stepAnchorPtrRef.current = -1, lastNavIdxRef.current = null;
    },
    warmSearchIndex: async () => {
      if (warmedRef.current) return 0;
      let msgs = vlistRef.current.messages,
        chunkSize = 500,
        workMs = 0,
        startTime = performance.now();
      for (let chunkStart = 0; chunkStart < msgs.length; chunkStart += chunkSize) {
        await Kn(0);
        let chunkBegin = performance.now(),
          chunkEnd = Math.min(chunkStart + chunkSize, msgs.length);
        for (let idx = chunkStart; idx < chunkEnd; idx++) {
          let msg = msgs[idx];
          if (msg !== void 0) extractSearchText(msg);
        }
        workMs += performance.now() - chunkBegin;
      }
      let wallMs = Math.round(performance.now() - startTime);
      return A(`warmSearchIndex: ${msgs.length} msgs \xB7 work=${Math.round(workMs)}ms wall=${wallMs}ms chunks=${Math.ceil(msgs.length / chunkSize)}`), warmedRef.current = !0, Math.round(workMs);
    }
  }), [scrollRef]);
  let [hoveredKey, setHoveredKey] = rf.useState(null),
    clickHandlersRef = rf.useRef({
      onItemClick,
      setHoveredKey
    });
  clickHandlersRef.current = {
    onItemClick,
    setHoveredKey
  };
  let onClickK = rf.useCallback((msg: any, cellIsBlank: any) => {
      let handlers = clickHandlersRef.current;
      if (!cellIsBlank && handlers.onItemClick) handlers.onItemClick(msg);
    }, []),
    onEnterK = rf.useCallback((key: any) => {
      clickHandlersRef.current.setHoveredKey(key);
    }, []),
    onLeaveK = rf.useCallback((key: any) => {
      clickHandlersRef.current.setHoveredKey((prev: any) => prev === key ? null : prev);
    }, []),
    renderItemRef = rf.useRef(renderItem);
  return renderItemRef.current = renderItem, Rne.jsxs(Rne.Fragment, {
    children: [Rne.jsx($, {
      ref: spacerRef,
      height: topSpacer,
      flexShrink: 0
    }), messages.slice(rangeStart, rangeEnd).map((msg: any, localIdx: any) => {
      let idx = rangeStart + localIdx;
      if (msg === void 0) return Jkl(idx, messages, `mounted=[${rangeStart},${rangeEnd})`), null;
      let key = keys[idx],
        clickable = !!onItemClick && (isItemClickable?.(msg) ?? !0),
        hovered = clickable && hoveredKey === key,
        expanded = isItemExpanded?.(msg);
      return Rne.jsx(Qdm, {
        itemKey: key,
        msg,
        idx,
        measureRef,
        expanded,
        hovered,
        clickable,
        onClickK,
        onEnterK,
        onLeaveK,
        renderItemRef
      }, key);
    }), bottomSpacer > 0 && Rne.jsx($, {
      height: bottomSpacer,
      flexShrink: 0
    }), trackStickyPrompt && Rne.jsx(epm, {
      messages,
      start: rangeStart,
      end: rangeEnd,
      offsets,
      getItemTop,
      getItemElement,
      scrollRef
    })]
  });
}
// Logs a warning once when an undefined element is found in the messages array
function Jkl(idx: any, messages: any, context: any): any {
  if (jkl) return;
  jkl = !0;
  let describe = (msg: any) => msg === void 0 ? "undefined" : Xkl(msg);
  Ie(new Ta(`VirtualMessageList: undefined at messages[${idx}] (len=${messages.length} ${context} neighbors=[${describe(messages[idx - 1])},${describe(messages[idx + 1])}])`, "VirtualMessageList: undefined element in messages[]"));
}
// Tracks the sticky prompt shown above the viewport as the user scrolls
function epm({
  messages,
  start,
  end,
  offsets,
  getItemTop,
  getItemElement,
  scrollRef
}: any): any {
  let {
      setStickyPrompt
    } = rf.useContext(djn),
    subscribe = rf.useCallback((notify: any) => scrollRef.current?.subscribe(notify) ?? Zdm, [scrollRef]);
  rf.useSyncExternalStore(subscribe, () => {
    let scroller = scrollRef.current;
    if (!scroller) return NaN;
    let scrollTop = scroller.getScrollTop() + scroller.getPendingDelta();
    return scroller.isSticky() ? -1 - scrollTop : scrollTop;
  });
  let isSticky = scrollRef.current?.isSticky() ?? !0,
    scrollTop = Math.max(0, (scrollRef.current?.getScrollTop() ?? 0) + (scrollRef.current?.getPendingDelta() ?? 0)),
    firstVisible = start,
    firstVisibleTop = -1;
  for (let idx = end - 1; idx >= start; idx--) {
    let top = getItemTop(idx);
    if (top >= 0) {
      if (top < scrollTop) break;
      firstVisibleTop = top;
    }
    firstVisible = idx;
  }
  let stickyIdx = -1,
    stickyText = null;
  if (firstVisible > 0 && !isSticky) for (let idx = firstVisible - 1; idx >= 0; idx--) {
    let msg = messages[idx];
    if (msg === void 0) Jkl(idx, messages, `range=[${start},${end}] firstVisible=${firstVisible}`);
    let promptText = UHo(msg);
    if (promptText === null) continue;
    let top = getItemTop(idx);
    if (top >= 0 && top + 1 >= scrollTop) continue;
    stickyIdx = idx, stickyText = promptText;
    break;
  }
  let originOffset = firstVisibleTop >= 0 ? firstVisibleTop - offsets[firstVisible] : 0,
    stickyTop = stickyIdx >= 0 ? Math.max(0, originOffset + offsets[stickyIdx]) : -1,
    seekRef = rf.useRef({
      idx: -1,
      tries: 0
    }),
    clickStateRef = rf.useRef("none"),
    lastStickyIdxRef = rf.useRef(-1);
  return rf.useEffect(() => {
    if (seekRef.current.idx >= 0) return;
    if (clickStateRef.current === "armed") {
      clickStateRef.current = "force";
      return;
    }
    let forced = clickStateRef.current === "force";
    if (clickStateRef.current = "none", !forced && lastStickyIdxRef.current === stickyIdx) return;
    if (lastStickyIdxRef.current = stickyIdx, stickyText === null) {
      setStickyPrompt(null);
      return;
    }
    let trimmed = stickyText.trimStart(),
      paraBreak = trimmed.search(/\n\s*\n/),
      preview = (paraBreak >= 0 ? trimmed.slice(0, paraBreak) : trimmed).slice(0, Jdm).replace(/\s+/g, " ").trim();
    if (preview === "") {
      setStickyPrompt(null);
      return;
    }
    let targetIdx = stickyIdx,
      targetTop = stickyTop;
    setStickyPrompt({
      text: preview,
      scrollTo: () => {
        setStickyPrompt("clicked"), clickStateRef.current = "armed";
        let elem = getItemElement(targetIdx);
        if (elem) scrollRef.current?.scrollToElement(elem, 1);else scrollRef.current?.scrollTo(targetTop), seekRef.current = {
          idx: targetIdx,
          tries: 0
        };
      }
    });
  }), rf.useEffect(() => {
    if (seekRef.current.idx < 0) return;
    let elem = getItemElement(seekRef.current.idx);
    if (elem) scrollRef.current?.scrollToElement(elem, 1), seekRef.current = {
      idx: -1,
      tries: 0
    };else if (++seekRef.current.tries > 5) seekRef.current = {
      idx: -1,
      tries: 0
    };
  }), null;
}
// Returns a short type-string for a message, used in dup-key error reporting
function Xkl(message: any): any {
  switch (message.type) {
    case "user":
    case "assistant":
      return `${message.type}/${message.message.content[0]?.type ?? "?"}`;
    case "system":
      return `system/${message.subtype}`;
    case "attachment":
      return `attachment/${message.attachment.type}`;
    case "grouped_tool_use":
    case "collapsed_read_search":
      return message.type;
    default:
      return message.type;
  }
}
// Builds a stable array of item keys, deduplicating repeated keys with a #N suffix
function tpm(messages: any, itemKey: any, state: any, describe: any = (msg: any) => msg.type ?? "?"): any {
  let cursor = 0;
  if (state.itemKey === itemKey && messages.length >= state.keys.length) {
    let prevLen = state.keys.length;
    while (cursor < prevLen && messages[cursor].uuid === state.uuids[cursor]) cursor++;
  }
  if (cursor < state.keys.length) state.keys = [], state.uuids = [], state.seen = new Map(), cursor = 0;
  state.itemKey = itemKey;
  let dups = null;
  for (; cursor < messages.length; cursor++) {
    let msg = messages[cursor],
      key = itemKey(msg),
      count = state.seen.get(key);
    if (count === void 0) state.seen.set(key, 1), state.keys.push(key);else if (state.seen.set(key, count + 1), state.keys.push(`${key}#${count}`), !state.loggedDups.has(key)) state.loggedDups.add(key), (dups ??= new Map()).set(key, describe(msg));
    state.uuids.push(msg.uuid);
  }
  if (dups) {
    let preview = [...dups].slice(0, 3).map(([key, label]: any) => `[${label}] ${key} \xD7${state.seen.get(key)}`);
    Ie(Error(`VirtualMessageList: duplicate sibling itemKeys (deduped via #N suffix; upstream uuid-dup): ${preview.join(", ")}`));
  }
  return state.keys;
}
var rf: any,
  Rne: any,
  pjn = 3,
  Kkl: any,
  Jdm = 500,
  zkl: any,
  Zdm = () => {},
  jkl = !1;
var Qkl = b(() => {
  gkl();
  je();
  zve();
  BHo();
  qe();
  Ct();
  vn();
  po();
  oHo();
  rf = x(et(), 1), Rne = x(oe(), 1), Kkl = new WeakMap();
  zkl = new WeakMap();
});

export {Ydm,UHo,Xdm,Qdm,Ykl,Jkl,epm,Xkl,tpm,rf,Rne,pjn,Kkl,Jdm,zkl,Zdm,jkl,Qkl};
