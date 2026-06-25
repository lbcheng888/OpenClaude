// @ts-nocheck
import {xas,Pa} from "../../vendor/m720.ts";
import {Mml,Nml,Fml,Uml} from "../../vendor/m4550.ts";
import {PZ,f2e} from "./2431_f2e.ts";
import {Ne} from "../../vendor/m583.ts";
import {xie,bnt} from "../../vendor/m2543.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * QueryInput: the Ink text-input widget used for the main prompt bar.
 *
 * Renders a bordered (or borderless) box containing a prefix icon and the
 * query text.  Handles cursor positioning, click-to-move-cursor, highlight
 * ranges, dim ranges, and an optional custom cursor character.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A [startOffset, endOffset) pair marking a highlight span in the query. */
type HighlightRange = [number, number];

/** A [startOffset, endOffset) pair marking a dim span in the query. */
type DimRange = [number, number];

/** Click event shape forwarded from Ink's onClick. */
interface ClickEvent {
  localRow: number;
  localCol: number;
}

// ---------------------------------------------------------------------------
// QueryInput component
// ---------------------------------------------------------------------------

/**
 * QueryInput renders the styled search / prompt bar.
 *
 * @param query             Current text content of the input.
 * @param placeholder       Placeholder shown when the input is empty.
 * @param isFocused         Whether this input currently has focus.
 * @param isTerminalFocused Whether the terminal window itself is focused.
 * @param prefix            Icon/string prepended before the query (default: xas loupe symbol).
 * @param width             Optional explicit width passed to the Ink Box.
 * @param cursorOffset      Caret position in the query string (chars from start).
 * @param borderless        When true, omits the round border and padding.
 * @param highlights        Array of [start, end) ranges to colour as "suggestion".
 * @param dimRange          Optional [start, end) range to render dimmed.
 * @param cursorChar        Custom character to draw at the cursor position.
 * @param prefixDim         Whether to dim the prefix icon.
 * @param prefixColor       Optional colour override for the prefix icon.
 * @param onCursorOffsetChange Callback invoked with the new cursor offset on click.
 * @param onFocus           Callback invoked when an unfocused click occurs.
 * @param wrapColumns       Column count used for soft-wrap calculations.
 */
function aP({
  query: queryText,
  placeholder: placeholderText = "Search…",
  isFocused: isFocused,
  isTerminalFocused: isTerminalFocused,
  prefix: prefixStr = xas,
  width: width,
  cursorOffset: cursorOffset,
  borderless: borderless = !1,
  highlights: highlights = [],
  dimRange: dimRange,
  cursorChar: cursorChar,
  prefixDim: prefixDim = !1,
  prefixColor: prefixColor,
  onCursorOffsetChange: onCursorOffsetChange,
  onFocus: onFocus,
  wrapColumns: wrapColumns
}: {
  query: string;
  placeholder?: string;
  isFocused: boolean;
  isTerminalFocused: boolean;
  prefix?: string;
  width?: number;
  cursorOffset?: number;
  borderless?: boolean;
  highlights?: HighlightRange[];
  dimRange?: DimRange;
  cursorChar?: string;
  prefixDim?: boolean;
  prefixColor?: string;
  onCursorOffsetChange?: (offset: number) => void;
  onFocus?: () => void;
  wrapColumns?: number;
}) {
  // Effective cursor position defaults to end of query
  let effectiveCursorOffset = cursorOffset ?? queryText.length,
    // Padding units depend on borderless mode
    paddingX = borderless ? 0 : 2,
    paddingTop = borderless ? 0 : 1,
    // Full display string: "prefix queryText"
    fullDisplayText = `${prefixStr} ${queryText}`,
    // Prefix occupies (prefix.length + 1 space) chars before the query
    queryStartOffset = prefixStr.length + 1,
    // Wrapped-text map for the full display string
    wrappedText = BAo.useMemo(() => Mml(fullDisplayText, wrapColumns ?? 0), [fullDisplayText, wrapColumns]),
    // Whether native cursor (accessibility) mode is active
    isNativeCursor = BAo.useMemo(PZ, []),
    // Full repaint mode: alt-screen repaint is on and session is not background
    isAltScreenRepaint = Ne.CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT && Ne.CLAUDE_CODE_SESSION_KIND !== "bg",
    // Cursor position within the wrapped text
    cursorLineCol = Nml(wrappedText, queryStartOffset + effectiveCursorOffset),
    // Ref callback for cursor node
    cursorNodeRef = xie({
      line: paddingTop + cursorLineCol.line,
      column: paddingX + cursorLineCol.column,
      active: isFocused,
      visible: cursorChar === void 0 && !isAltScreenRepaint
    }),
    // Whether the hardware/terminal cursor should be shown
    showHardwareCursor = isTerminalFocused && !(isNativeCursor && !isAltScreenRepaint && cursorChar === void 0);
  return u9.jsx($, {
    ref: cursorNodeRef,
    flexShrink: 0,
    borderStyle: borderless ? void 0 : "round",
    borderColor: isFocused ? "suggestion" : void 0,
    borderDimColor: !isFocused,
    paddingX: borderless ? 0 : 1,
    width: width,
    onClick: onCursorOffsetChange || onFocus ? (clickEvent: ClickEvent) => {
      if (!isFocused) {
        onFocus?.();
        return;
      }
      if (!queryText || !onCursorOffsetChange) return;
      let relRow = clickEvent.localRow - paddingTop;
      if (relRow < 0) return;
      let relCol = Math.max(0, clickEvent.localCol - paddingX),
        charOffset = Fml(wrappedText, relRow, relCol);
      onCursorOffsetChange(Math.max(0, Math.min(queryText.length, charOffset - queryStartOffset)));
    } : void 0,
    children: u9.jsxs(v, {
      dimColor: !isFocused,
      children: [u9.jsx(v, {
        dimColor: prefixDim,
        color: prefixColor,
        children: prefixStr
      }), " ", isFocused ? queryText ? sXp(queryText, highlights, dimRange, showHardwareCursor ? effectiveCursorOffset : -1, cursorChar) : showHardwareCursor ? u9.jsxs(u9.Fragment, {
        children: [cursorChar ?? u9.jsx(v, {
          inverse: !0,
          children: placeholderText.charAt(0)
        }), u9.jsx(v, {
          dimColor: !0,
          children: cursorChar ? placeholderText : placeholderText.slice(1)
        })]
      }) : u9.jsx(v, {
        dimColor: !0,
        children: placeholderText
      }) : queryText ? u9.jsx(v, {
        children: queryText
      }) : u9.jsx(v, {
        children: placeholderText
      })]
    })
  });
}

// ---------------------------------------------------------------------------
// renderHighlightedQuery
// ---------------------------------------------------------------------------

/**
 * renderHighlightedQuery (sXp) — renders query text as an array of Ink Text
 * elements, each segment styled according to whether it falls inside a
 * highlight range, dim range, or at the cursor position.
 *
 * @param queryText    The raw query string.
 * @param highlights   Array of [start, end) highlight ranges.
 * @param dimRange     Optional [start, end) dim range.
 * @param cursorPos    Character index of the cursor, or -1 to hide it.
 * @param cursorChar   Optional replacement character drawn at the cursor.
 */
function sXp(
  queryText: string,
  highlights: HighlightRange[],
  dimRange: DimRange | undefined,
  cursorPos: number,
  cursorChar: string | undefined
): React.ReactElement[] {
  let isHighlighted = (pos: number) => highlights.some(([start, end]) => pos >= start && pos < end),
    isDimmed = (pos: number) => !!dimRange && pos >= dimRange[0] && pos < dimRange[1],
    // Build the sorted set of boundary positions
    boundaries = new Set([0, queryText.length]);
  for (let [start, end] of highlights) boundaries.add(start), boundaries.add(end);
  if (dimRange) boundaries.add(dimRange[0]), boundaries.add(dimRange[1]);
  if (cursorPos >= 0) boundaries.add(cursorPos), boundaries.add(cursorPos + 1);
  let sortedBoundaries = [...boundaries].sort((a, b) => a - b),
    segments: React.ReactElement[] = [];
  for (let i = 0; i < sortedBoundaries.length - 1; i++) {
    let segStart = sortedBoundaries[i],
      segEnd = sortedBoundaries[i + 1],
      // Use a space for the position past the end (newline cursor position)
      segText = segStart < queryText.length ? queryText.slice(segStart, segEnd) : " ";
    if (!segText) continue;
    let isCursorSeg = segStart === cursorPos,
      isNewlineSeg = isCursorSeg && segText === `
`;
    segments.push(isCursorSeg && cursorChar ? u9.jsxs(v, {
      children: [cursorChar, isNewlineSeg ? `
` : null]
    }, segStart) : u9.jsx(v, {
      color: isHighlighted(segStart) ? "suggestion" : void 0,
      dimColor: isDimmed(segStart),
      inverse: isCursorSeg,
      children: isNewlineSeg ? ` 
` : segText
    }, segStart));
  }
  return segments;
}

// ---------------------------------------------------------------------------
// Module lazy-init token
// ---------------------------------------------------------------------------

var BAo: typeof import("react"), u9;

/** Lazy initializer: loads Ink, cursor hook, env, accessibility, and wrap utilities. */
var aue = b(() => {
  Pa();
  bnt();
  je();
  Ir();
  f2e();
  Uml();
  BAo = x(et(), 1), u9 = x(oe(), 1);
});

export {aP,sXp,BAo,u9,aue};
