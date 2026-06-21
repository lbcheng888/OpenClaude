// @ts-nocheck
/* @jsx React.createElement */
/* @jsxFrag React.Fragment */
import {Dl as y4,lo as zq} from "../tools/5190_userPromptCount.ts";
import {Uu as b5,dr as P8} from "../../vendor/m231.ts";
import {Gn as d6,sc as l4} from "../../vendor/m2455.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {exn as $X6,a$e as MbH} from "../../vendor/m2803.ts";
import {initModule as PL,Oz as _Q} from "../../vendor/m2799.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/** @jsx S$H.createElement */
/**
 * tui/3270_result — Tool error-result message renderer (Ink/React terminal UI).
 *
 * Renders the failure output of a tool execution as a colored, line-clamped
 * Ink component, plus small helpers for detecting "long" content and stripping
 * sandbox-violation markup.
 *
 * 1:1 restoration of the obfuscated bundle module `3270_esm_OB.js`. Only names,
 * types, comments and JSX form changed; control flow, operators (incl. `!0`/`!1`),
 * string literals and cross-module symbol references are preserved exactly.
 *
 * NOTE: This module is an ESM bundle factory with NO recovered export names.
 * The top-level symbols (`Ee7`, `QC3`, `Hl8`, `N06`, `_X`, `OB`, `Se7`, `S$H`)
 * keep their original bundle identifiers because other modules reference them by
 * those exact names; renaming them would break cross-module references.
 */

// ---------------------------------------------------------------------------
// Cross-module runtime / component references (defined in other bundle chunks).
// Declared here only so this single-module restoration type-checks in isolation;
// at runtime they resolve to the real bundle symbols.
// ---------------------------------------------------------------------------

/** A content block in an assistant/tool message (only `text` blocks are inspected here). */
interface ContentBlock {
  type: string;
  text: string;
  [key: string]: unknown;
}

/**
 * Strips balanced `<claude-code-hint …>…</claude-code-hint>` blocks from text and
 * collapses runs of 3+ newlines. Returns input unchanged when no hint marker is present.
 */
declare function $X6(text: string): string;

/** Counts the number of occurrences of `needle` within `haystack`. */
declare function b5(haystack: string, needle: string): number;

/**
 * Extracts the inner content of the first balanced `<tag …>…</tag>` whose open/close
 * tags are balanced, or `null` if none is found / inputs are blank.
 */
declare function y4(text: string, tag: string): string | null;

/** Ink `Text` component (props: `color`, `bold`, `dimColor`, …). */
declare const V: React.ComponentType<{
  color?: string;
  bold?: boolean;
  dimColor?: boolean;
  children?: React.ReactNode;
}>;

/** Ink `Box` component (props: `flexDirection`, `marginTop`, `paddingRight`, …). */
declare const B: React.ComponentType<{
  flexDirection?: "row" | "column";
  children?: React.ReactNode;
}>;

/** Ink container/`Box` wrapper component. */
declare const d6: React.ComponentType<{
  height?: number;
  children?: React.ReactNode;
}>;

/** Indicator showing how many additional (collapsed) lines are hidden; expandable. */
declare const PL: React.ComponentType<{
  count: number;
  expandable?: boolean;
  unit?: string;
}>;

/** Lazy ESM module-init wrapper from the bundle runtime. */
declare function L(init: () => void): unknown;
/** ESM interop helper from the bundle runtime (`u(mod, 1)` = default-interop). */
declare function u<T>(mod: T, interop: number): T;

// Names of sibling lazy-module initializers invoked by this module's factory.
declare function MbH(): void;
declare function zq(): void;
declare function nH(): void;
declare function P8(): void;
declare function _Q(): void;
declare function l4(): void;
/** Resolves the react-compiler-runtime module. */
declare function __(): unknown;
/** Resolves the React module. */
declare function WH(): unknown;

// ---------------------------------------------------------------------------
// Module implementation
// ---------------------------------------------------------------------------

/**
 * Returns `true` when the given tool content spans "more than 10 lines".
 *
 * For a string, defers to {@link QC3} (checks for >9 newlines). For a content-block
 * array, returns `true` once more than 10 blocks are seen, or once the cumulative
 * newline count across `text` blocks exceeds 10. Non-string / non-array input → `false`.
 */
function Ee7(content: string | ContentBlock[]): boolean {
  if (typeof content === "string") return QC3(content, 9);
  if (!Array.isArray(content)) return !1;
  let lineCount = 0;
  for (let block of content) {
    if (lineCount += 1, lineCount > 10) return !0;
    if (block.type !== "text") continue;
    let text = block.text,
      searchIndex = 0;
    while (lineCount <= 10) {
      if (searchIndex = text.indexOf(`
`, searchIndex), searchIndex === -1) break;
      searchIndex++, lineCount++;
    }
    if (lineCount > 10) return !0;
  }
  return !1;
}

/**
 * Returns `true` when `text` contains strictly more than `maxNewlines` newline
 * characters (i.e. has at least `maxNewlines + 1` line breaks).
 */
function QC3(text: string, maxNewlines: number): boolean {
  let searchIndex = 0;
  for (let i = 0; i <= maxNewlines; i++) {
    if (searchIndex = text.indexOf(`
`, searchIndex), searchIndex === -1) return !1;
    searchIndex++;
  }
  return !0;
}

/** Maximum number of error lines shown before the remainder is collapsed. */
var Hl8 = 10;

/** Removes `<sandbox_violations>…</sandbox_violations>` blocks from a string. */
function N06(text: string): string {
  return text.replace(/<sandbox_violations>[\s\S]*?<\/sandbox_violations>/g, "");
}

/**
 * Renders a tool error result as a clamped, error-colored Ink message.
 *
 * - Non-string results render as a generic "Tool execution failed".
 * - String results are unwrapped (`<tool_use_error>` extraction), de-noised
 *   (`<sandbox_violations>`/`<error>` markup stripped), then mapped to a concise
 *   message; in non-verbose mode an `InputValidationError` becomes
 *   "Invalid tool parameters".
 * - When not verbose, output is clamped to {@link Hl8} lines and a {@link PL}
 *   "N more lines" indicator is shown for the hidden remainder.
 *
 * Memoized via the React Compiler cache (`Se7.c(24)`); cache slot indices are
 * preserved exactly from the original bundle.
 */
function _X(props: {
  result: unknown;
  verbose: boolean;
}): React.ReactElement {
  let cache = Se7.c(24),
    {
      result,
      verbose
    } = props,
    TextComponent: typeof V,
    RowBox: typeof B,
    ContainerBox: typeof d6,
    hiddenLineCount: number,
    color: string,
    text: string,
    flexDirection: "column";
  if (cache[0] !== result || cache[1] !== verbose) {
    let message: string;
    if (typeof result !== "string") message = "Tool execution failed";else {
      let unwrapped = y4(result, "tool_use_error") ?? result,
        cleaned = N06(unwrapped).replace(/<\/?error>/g, "").trim();
      if (!verbose && cleaned.includes("InputValidationError: ")) message = "Invalid tool parameters";else if (cleaned.startsWith("Error: ") || cleaned.startsWith("Cancelled: ")) message = cleaned;else message = `Error: ${cleaned}`;
    }
    hiddenLineCount = b5(message, `
`) + 1 - Hl8, ContainerBox = d6, RowBox = B, flexDirection = "column", TextComponent = V, color = "error", text = $X6(verbose ? message : message.split(`
`).slice(0, Hl8).join(`
`)), cache[0] = result, cache[1] = verbose, cache[2] = TextComponent, cache[3] = RowBox, cache[4] = ContainerBox, cache[5] = hiddenLineCount, cache[6] = color, cache[7] = text, cache[8] = flexDirection;
  } else TextComponent = cache[2] as typeof V, RowBox = cache[3] as typeof B, ContainerBox = cache[4] as typeof d6, hiddenLineCount = cache[5] as number, color = cache[6] as string, text = cache[7] as string, flexDirection = cache[8] as "column";
  let textElement: React.ReactElement;
  if (cache[9] !== TextComponent || cache[10] !== color || cache[11] !== text) textElement = <TextComponent color={color}>{text}</TextComponent>, cache[9] = TextComponent, cache[10] = color, cache[11] = text, cache[12] = textElement;else textElement = cache[12] as React.ReactElement;
  let hiddenLinesIndicator: React.ReactElement | false;
  if (cache[13] !== hiddenLineCount || cache[14] !== verbose) hiddenLinesIndicator = !verbose && <PL count={hiddenLineCount} expandable={!0} />, cache[13] = hiddenLineCount, cache[14] = verbose, cache[15] = hiddenLinesIndicator;else hiddenLinesIndicator = cache[15] as React.ReactElement | false;
  let row: React.ReactElement;
  if (cache[16] !== RowBox || cache[17] !== flexDirection || cache[18] !== textElement || cache[19] !== hiddenLinesIndicator) row = <RowBox flexDirection={flexDirection}>
        {textElement}
        {hiddenLinesIndicator}
      </RowBox>, cache[16] = RowBox, cache[17] = flexDirection, cache[18] = textElement, cache[19] = hiddenLinesIndicator, cache[20] = row;else row = cache[20] as React.ReactElement;
  let container: React.ReactElement;
  if (cache[21] !== ContainerBox || cache[22] !== row) container = <ContainerBox>{row}</ContainerBox>, cache[21] = ContainerBox, cache[22] = row, cache[23] = container;else container = cache[23] as React.ReactElement;
  return container;
}
var Se7: {
    c(size: number): unknown[];
  }, S$H: typeof import("react");

/** Lazy ESM module initializer: wires up sibling modules then resolves React deps. */
var OB = L(() => {
  MbH();
  zq();
  nH();
  P8();
  _Q();
  l4();
  Se7 = u(__(), 1) as {
    c(size: number): unknown[];
  }, S$H = u(WH(), 1) as typeof import("react");
});
export {Ee7 as jia,QC3 as u8d,Hl8 as VYr,N06 as c0n,_X as wC,Se7 as Wia,S$H as Ghe,OB as jq};
