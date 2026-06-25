// @ts-nocheck
import {gc,bo,_t,uo} from "../../vendor/m2468.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {He,mn} from "../telemetry/0600_feature_name.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {truncateToWidth as xs,XH} from "../../vendor/m239.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {Zs,Xe} from "../../vendor/m2216.ts";
import {Pa,tCe} from "../../vendor/m720.ts";
import {ui,_r} from "../../vendor/m2463.ts";
import {je} from "../../vendor/m2462.ts";
import {gwe,yI} from "./2556_current.ts";
import {Wo,at} from "../../vendor/m2557.ts";
import {fvn,_we} from "../../vendor/m2556.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {useInterval as zc} from "../../vendor/m2456.ts";
import {p4} from "../../vendor/m2471.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
/**
 * Frame (artifact) expansion footer UI.
 *
 * Registers the "app:openArtifact" key handler that opens the most-recent frame
 * URL and expands the frame nav, then renders the collapsible frame breadcrumb
 * row at the bottom of the TUI. Auto-collapses after a timeout.
 *
 * Structure-exact 1:1 restoration of v2.1.190 module 5377. Local bindings are
 * renamed for readability; exported/imported symbols, props, and literals are
 * preserved verbatim (the downstream alpha + binding-bijection gate discards any
 * structural change).
 */

/** Hook: wires the global "app:openArtifact" handler + cleanup effect. */
function useOpenArtifactHandler() {
  let cache = B7t.c(8),
    store = gc(),
    setUiState = bo(),
    collapseTimerRef = yV.useRef(null),
    clock = As(),
    openArtifact;
  if (cache[0] !== clock || cache[1] !== setUiState || cache[2] !== store) openArtifact = () => {
    let frameUrls = store.getState().frameUrls,
      lastUrl = Object.values(frameUrls).at(-1)?.url;
    if (!lastUrl) return !1;
    Zl(lastUrl), He("frame_link_open");
    let lastNavPath = Object.keys(frameUrls).at(-1) ?? null;
    if (setUiState(prev => prev.frameExpanded && prev.frameNavPath === lastNavPath ? prev : {
      ...prev,
      frameExpanded: !0,
      frameNavPath: lastNavPath
    }), collapseTimerRef.current) collapseTimerRef.current();
    collapseTimerRef.current = clock.setTimeout(() => {
      setUiState(collapseFrameOnTimeout);
    }, FRAME_EXPAND_TIMEOUT_MS);
  }, cache[0] = clock, cache[1] = setUiState, cache[2] = store, cache[3] = openArtifact;else openArtifact = cache[3];
  let handlerOptions;
  if (cache[4] === Symbol.for("react.memo_cache_sentinel")) handlerOptions = {
    context: "Global"
  }, cache[4] = handlerOptions;else handlerOptions = cache[4];
  Or("app:openArtifact", openArtifact, handlerOptions);
  let cleanupEffect, cleanupDeps;
  if (cache[5] !== setUiState) cleanupEffect = () => () => {
    collapseTimerRef.current?.(), setUiState(collapseFrameOnUnmount);
  }, cleanupDeps = [setUiState], cache[5] = setUiState, cache[6] = cleanupEffect, cache[7] = cleanupDeps;else cleanupEffect = cache[6], cleanupDeps = cache[7];
  yV.useEffect(cleanupEffect, cleanupDeps);
}

/** Reducer: collapse the frame on unmount unless the footer "frame" tab is active. */
function collapseFrameOnUnmount(state) {
  if (state.footerSelection === "frame" || !state.frameExpanded) return state;
  return {
    ...state,
    frameExpanded: !1
  };
}

/** Reducer: collapse the frame after the expand timeout fires. */
function collapseFrameOnTimeout(state) {
  if (state.footerSelection === "frame" || !state.frameExpanded) return state;
  return {
    ...state,
    frameExpanded: !1
  };
}

/** Top-level component gate: render the frame footer only when frames exist. */
function FrameExpandedFooter() {
  let cache = B7t.c(1);
  if (useOpenArtifactHandler(), !_t(hasAnyFrameSelector)) return null;
  let element;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) element = Hb.jsx(RFm, {}), cache[0] = element;else element = cache[0];
  return element;
}

/** Selector: true when at least one frame URL is tracked. */
function hasAnyFrameSelector(state) {
  return Object.keys(state.frameUrls).length > 0;
}

/**
 * Resolve the highlighted frame index from the entries list and an optional
 * nav-path key; defaults to the last entry.
 */
function resolveHighlightIndex(entries, navPath) {
  if (entries.length === 0) return 0;
  if (navPath != null) {
    let foundIdx = entries.findIndex(([key]) => key === navPath);
    if (foundIdx !== -1) return foundIdx;
  }
  return entries.length - 1;
}

/**
 * Window the breadcrumb entries to fit `maxWidth`, growing the visible range
 * outward from the highlighted index. Returns the visible items plus the count
 * of hidden entries before/after.
 */
function computeVisibleWindow(entries, maxWidth, highlightIndex) {
  let total = entries.length;
  if (total === 0) return {
    visible: [],
    before: 0,
    after: 0
  };
  let items = entries.map(([path, frame], idx) => ({
      idx: idx,
      name: kFo.parse(path).name,
      url: frame.url,
      updatedAt: frame.updatedAt
    })),
    center = Math.min(Math.max(highlightIndex ?? total - 1, 0), total - 1);
  /** Width of the rendered range [lo, hi] including +N overflow markers. */
  function measure(lo, hi) {
    let width = 0;
    for (let i = lo; i <= hi; i++) width += (i > lo ? jGe : 0) + sn(items[i].name);
    if (lo > 0) width += sn(`+${lo}`) + jGe;
    if (hi < total - 1) width += jGe + sn(`+${total - 1 - hi}`);
    return width;
  }
  let lo = center,
    hi = center;
  for (;;) {
    if (hi < total - 1 && measure(lo, hi + 1) <= maxWidth) {
      hi++;
      continue;
    }
    if (lo > 0 && measure(lo - 1, hi) <= maxWidth) {
      lo--;
      continue;
    }
    break;
  }
  let visible = items.slice(lo, hi + 1);
  if (visible.length === 1 && measure(lo, hi) > maxWidth) {
    let overhead = measure(lo, hi) - sn(visible[0].name),
      nameBudget = Math.max(1, maxWidth - overhead);
    visible = [{
      ...visible[0],
      name: xs(visible[0].name, nameBudget)
    }];
  }
  return {
    visible: visible,
    before: lo,
    after: total - 1 - hi
  };
}

/** A single clickable frame breadcrumb segment. */
function FrameBreadcrumbItem(props) {
  let cache = B7t.c(13),
    {
      name: name,
      url: url,
      highlighted: highlighted,
      navSelected: navSelected,
      stale: stale
    } = props,
    [hovered, setHovered] = yV.useState(!1),
    onClick;
  if (cache[0] !== url) onClick = () => void Zl(url), cache[0] = url, cache[1] = onClick;else onClick = cache[1];
  let onMouseEnter, onMouseLeave;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) onMouseEnter = () => setHovered(!0), onMouseLeave = () => setHovered(!1), cache[2] = onMouseEnter, cache[3] = onMouseLeave;else onMouseEnter = cache[2], onMouseLeave = cache[3];
  let color = highlighted || hovered ? "claude" : void 0,
    dimColor = stale && !highlighted && !hovered && !navSelected,
    textEl;
  if (cache[4] !== hovered || cache[5] !== name || cache[6] !== navSelected || cache[7] !== color || cache[8] !== dimColor) textEl = Hb.jsx(v, {
    underline: hovered,
    inverse: navSelected,
    color: color,
    dimColor: dimColor,
    children: name
  }), cache[4] = hovered, cache[5] = name, cache[6] = navSelected, cache[7] = color, cache[8] = dimColor, cache[9] = textEl;else textEl = cache[9];
  let boxEl;
  if (cache[10] !== onClick || cache[11] !== textEl) boxEl = Hb.jsx($, {
    flexShrink: 0,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    children: textEl
  }), cache[10] = onClick, cache[11] = textEl, cache[12] = boxEl;else boxEl = cache[12];
  return boxEl;
}

/** Selector: the map of frame URLs. */
function frameUrlsSelector(state) {
  return state.frameUrls;
}

/** Selector: true when the footer "frame" tab is active. */
function isFrameFooterSelector(state) {
  return state.footerSelection === "frame";
}

/** Selector: the current frame nav path key. */
function frameNavPathSelector(state) {
  return state.frameNavPath;
}

/** Selector: true when the frame is expanded. */
function frameExpandedSelector(state) {
  return state.frameExpanded;
}

/** Predicate: a frame entry is "recent" (updated within the stale window). */
function isRecentFrame(entry) {
  let [, frame] = entry;
  return Date.now() - frame.updatedAt <= FRAME_STALE_MS;
}

/** Updater: bump a tick counter to force re-render. */
function incrementTick(tick) {
  return tick + 1;
}

var B7t,
  kFo,
  bjl,
  yV,
  Hb,
  FRAME_EXPAND_TIMEOUT_MS = 15000,
  HOVER_RESET_MS = 30000,
  FRAME_STALE_MS = 1800000,
  RECENT_REFRESH_MS = 60000,
  SEPARATOR = " \xB7 ",
  jGe,
  ICON_PAD = 2,
  wFo,
  TFm,
  SFm,
  RFm;
var Ajl = b(() => {
  Zs();
  Pa();
  ui();
  mc();
  je();
  gwe();
  ss();
  mn();
  uo();
  Jg();
  XH();
  Wo();
  fvn();
  B7t = x(tt(), 1), kFo = require("path"), bjl = x(et(), 1), yV = x(et(), 1), Hb = x(oe(), 1), jGe = sn(SEPARATOR), wFo = ICON_PAD + sn(`${tCe}  `), TFm = sn(`\u2190/\u2192 to navigate${SEPARATOR}`), SFm = sn("Enter to open");
  RFm = yV.memo(function () {
    let cache = B7t.c(47),
      frameUrls = _t(frameUrlsSelector),
      isFrameFooter = _t(isFrameFooterSelector),
      frameNavPath = _t(frameNavPathSelector),
      frameExpanded = _t(frameExpandedSelector),
      openArtifactKey = yI("app:openArtifact", "Global", "ctrl+]"),
      {
        columns: columns
      } = _r(),
      [recentlyHovered, setRecentlyHovered] = yV.useState(!1),
      hoverTimerRef = yV.useRef(null),
      clock = As(),
      entries;
    if (cache[0] !== frameUrls) entries = Object.entries(frameUrls), cache[0] = frameUrls, cache[1] = entries;else entries = cache[1];
    let entryList = entries,
      highlightIndex = resolveHighlightIndex(entryList, frameNavPath),
      onFramesChanged;
    if (cache[2] !== clock) onFramesChanged = () => {
      setRecentlyHovered(!0), hoverTimerRef.current?.(), hoverTimerRef.current = clock.setTimeout(() => setRecentlyHovered(!1), HOVER_RESET_MS);
    }, cache[2] = clock, cache[3] = onFramesChanged;else onFramesChanged = cache[3];
    let onFramesChangedDeps;
    if (cache[4] !== clock || cache[5] !== frameUrls) onFramesChangedDeps = [frameUrls, clock], cache[4] = clock, cache[5] = frameUrls, cache[6] = onFramesChangedDeps;else onFramesChangedDeps = cache[6];
    yV.useEffect(onFramesChanged, onFramesChangedDeps);
    let cleanupEffect, cleanupDeps;
    if (cache[7] === Symbol.for("react.memo_cache_sentinel")) cleanupEffect = () => () => {
      hoverTimerRef.current?.();
    }, cleanupDeps = [], cache[7] = cleanupEffect, cache[8] = cleanupDeps;else cleanupEffect = cache[7], cleanupDeps = cache[8];
    yV.useEffect(cleanupEffect, cleanupDeps);
    let [, setTick] = yV.useState(0),
      hasRecent = entryList.some(isRecentFrame),
      onTick;
    if (cache[9] !== setTick) onTick = () => setTick(incrementTick), cache[9] = setTick, cache[10] = onTick;else onTick = cache[10];
    zc(onTick, hasRecent ? RECENT_REFRESH_MS : null);
    let activeIndex = isFrameFooter || frameExpanded ? highlightIndex : null,
      expandedUrl = frameExpanded ? entryList[highlightIndex]?.[1]?.url : void 0,
      pointerPrefix = isFrameFooter ? `${Xe.pointer} ` : "  ",
      showOpenHint = !isFrameFooter && recentlyHovered && openArtifactKey !== "",
      hintWidth = 0;
    if (isFrameFooter) hintWidth = SFm + (entryList.length > 1 ? TFm : 0);else if (showOpenHint) {
      let keyLabel;
      if (cache[11] !== openArtifactKey) keyLabel = _we([p4(openArtifactKey)]), cache[11] = openArtifactKey, cache[12] = keyLabel;else keyLabel = cache[12];
      let hintText = `${keyLabel} to open`,
        hintTextWidth;
      if (cache[13] !== hintText) hintTextWidth = sn(hintText), cache[13] = hintText, cache[14] = hintTextWidth;else hintTextWidth = cache[14];
      hintWidth = hintTextWidth;
    }
    let lastIndex = activeIndex ?? entryList.length - 1,
      currentNameWidth = sn(kFo.parse(entryList[lastIndex]?.[0] ?? "").name),
      beforeMarkerWidth = lastIndex > 0 ? sn(`+${lastIndex}`) + jGe : 0,
      afterMarkerWidth = lastIndex < entryList.length - 1 ? jGe + sn(`+${entryList.length - 1 - lastIndex}`) : 0,
      hintFits = hintWidth > 0 && columns - wFo - hintWidth - jGe - beforeMarkerWidth - afterMarkerWidth >= Math.min(currentNameWidth, 16),
      hintNode;
    if (cache[15] !== openArtifactKey || cache[16] !== entryList.length || cache[17] !== showOpenHint || cache[18] !== hintFits || cache[19] !== isFrameFooter) hintNode = hintFits && isFrameFooter ? Hb.jsxs(Hb.Fragment, {
      children: [entryList.length > 1 && Hb.jsx(at, {
        chord: ["left", "right"],
        action: "navigate"
      }), entryList.length > 1 && SEPARATOR, Hb.jsx(at, {
        chord: "enter",
        action: "open"
      })]
    }) : hintFits && showOpenHint ? Hb.jsx(at, {
      chord: openArtifactKey,
      action: "open"
    }) : null, cache[15] = openArtifactKey, cache[16] = entryList.length, cache[17] = showOpenHint, cache[18] = hintFits, cache[19] = isFrameFooter, cache[20] = hintNode;else hintNode = cache[20];
    let hint = hintNode,
      availableWidth = Math.max(8, columns - wFo - (hintFits ? hintWidth + jGe : 0)),
      {
        visible: visible,
        before: before,
        after: after
      } = computeVisibleWindow(entryList, availableWidth, activeIndex),
      OuterBox = $,
      outerDirection = "column",
      outerWidth = "100%",
      RowBox = $,
      rowDirection = "row",
      pointerColor = isFrameFooter ? "claude" : void 0,
      pointerDim = !isFrameFooter,
      pointerTextEl;
    if (cache[21] !== pointerPrefix || cache[22] !== pointerColor || cache[23] !== pointerDim) pointerTextEl = Hb.jsx(v, {
      color: pointerColor,
      dimColor: pointerDim,
      children: pointerPrefix
    }), cache[21] = pointerPrefix, cache[22] = pointerColor, cache[23] = pointerDim, cache[24] = pointerTextEl;else pointerTextEl = cache[24];
    let iconEl;
    if (cache[25] === Symbol.for("react.memo_cache_sentinel")) iconEl = Hb.jsxs(v, {
      color: "claude",
      children: [tCe, "  "]
    }), cache[25] = iconEl;else iconEl = cache[25];
    let leadEl;
    if (cache[26] !== pointerTextEl) leadEl = Hb.jsxs($, {
      flexShrink: 0,
      children: [pointerTextEl, iconEl]
    }), cache[26] = pointerTextEl, cache[27] = leadEl;else leadEl = cache[27];
    let beforeEl;
    if (cache[28] !== before) beforeEl = before > 0 && Hb.jsx($, {
      flexShrink: 0,
      children: Hb.jsxs(v, {
        dimColor: !0,
        children: ["+", before, SEPARATOR]
      })
    }), cache[28] = before, cache[29] = beforeEl;else beforeEl = cache[29];
    let itemsEl = visible.map((item, position) => {
        let {
          idx: idx,
          name: name,
          url: url,
          updatedAt: updatedAt
        } = item;
        return Hb.jsxs(bjl.Fragment, {
          children: [position > 0 && Hb.jsx(v, {
            dimColor: !0,
            children: SEPARATOR
          }), Hb.jsx(FrameBreadcrumbItem, {
            name: name,
            url: url,
            highlighted: idx === activeIndex,
            navSelected: isFrameFooter && idx === highlightIndex,
            stale: Date.now() - updatedAt > FRAME_STALE_MS
          })]
        }, `${idx}-${name}`);
      }),
      afterEl;
    if (cache[30] !== after) afterEl = after > 0 && Hb.jsx($, {
      flexShrink: 0,
      children: Hb.jsxs(v, {
        dimColor: !0,
        children: [SEPARATOR, "+", after]
      })
    }), cache[30] = after, cache[31] = afterEl;else afterEl = cache[31];
    let hintEl;
    if (cache[32] !== hint) hintEl = hint && Hb.jsx($, {
      flexShrink: 0,
      children: Hb.jsxs(v, {
        dimColor: !0,
        children: [SEPARATOR, hint]
      })
    }), cache[32] = hint, cache[33] = hintEl;else hintEl = cache[33];
    let rowEl;
    if (cache[34] !== RowBox || cache[35] !== leadEl || cache[36] !== beforeEl || cache[37] !== itemsEl || cache[38] !== afterEl || cache[39] !== hintEl) rowEl = Hb.jsxs(RowBox, {
      flexDirection: rowDirection,
      children: [leadEl, beforeEl, itemsEl, afterEl, hintEl]
    }), cache[34] = RowBox, cache[35] = leadEl, cache[36] = beforeEl, cache[37] = itemsEl, cache[38] = afterEl, cache[39] = hintEl, cache[40] = rowEl;else rowEl = cache[40];
    let urlEl;
    if (cache[41] !== expandedUrl) urlEl = expandedUrl && Hb.jsx($, {
      paddingLeft: wFo,
      children: Hb.jsx(Ss, {
        url: expandedUrl,
        children: Hb.jsx(v, {
          dimColor: !0,
          children: expandedUrl
        })
      })
    }), cache[41] = expandedUrl, cache[42] = urlEl;else urlEl = cache[42];
    let containerEl;
    if (cache[43] !== OuterBox || cache[44] !== rowEl || cache[45] !== urlEl) containerEl = Hb.jsxs(OuterBox, {
      flexDirection: outerDirection,
      width: outerWidth,
      children: [rowEl, urlEl]
    }), cache[43] = OuterBox, cache[44] = rowEl, cache[45] = urlEl, cache[46] = containerEl;else containerEl = cache[46];
    return containerEl;
  });
});

export {useOpenArtifactHandler as bFm,collapseFrameOnUnmount as EFm,collapseFrameOnTimeout as CFm,FrameExpandedFooter as Cjl,hasAnyFrameSelector as AFm,resolveHighlightIndex as Per,computeVisibleWindow as vFm,FrameBreadcrumbItem as wFm,frameUrlsSelector as kFm,isFrameFooterSelector as HFm,frameNavPathSelector as IFm,frameExpandedSelector as xFm,isRecentFrame as DFm,incrementTick as PFm,B7t,kFo,bjl,yV,Hb,FRAME_EXPAND_TIMEOUT_MS as hFm,HOVER_RESET_MS as gFm,FRAME_STALE_MS as Ejl,RECENT_REFRESH_MS as _Fm,SEPARATOR as zGe,jGe,ICON_PAD as yFm,wFo,TFm,SFm,RFm,Ajl};
