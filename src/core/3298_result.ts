// @ts-nocheck
import {fl,po} from "../tools/5224_userPromptCount.ts";
import {nu,lr} from "../../vendor/m233.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {WIn,sHe} from "../../vendor/m2816.ts";
import {FO,uj} from "../../vendor/m2812.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Tool-result rendering helpers for the Claude Code TUI.
 *
 * Provides:
 *  - line-count probes used to decide whether a tool result is "long",
 *  - sandbox-violation tag stripping,
 *  - a React-Compiler-memoized error component (`wC`) that renders a tool
 *    execution failure with an error message and an expandable line counter.
 */

/** Max number of newlines to scan before treating content as "long". */
type ContentBlock = { type: string; text: string };

/**
 * Returns true when the given tool result content spans more than `Heo` (10)
 * lines. Accepts either a raw string or an array of content blocks; non-text
 * blocks each count as a single line toward the limit.
 */
function Yma(contentOrBlocks: string | ContentBlock[]): boolean {
  if (typeof contentOrBlocks === "string") return XXd(contentOrBlocks, 9);
  if (!Array.isArray(contentOrBlocks)) return !1;
  let lineCount = 0;
  for (let block of contentOrBlocks) {
    if ((lineCount += 1), lineCount > 10) return !0;
    if (block.type !== "text") continue;
    let blockText = block.text,
      searchPos = 0;
    while (lineCount <= 10) {
      if (((searchPos = blockText.indexOf(`
`, searchPos)), searchPos === -1)) break;
      searchPos++, lineCount++;
    }
    if (lineCount > 10) return !0;
  }
  return !1;
}

/**
 * Returns true if `text` contains at least `lineThreshold + 1` newline
 * separators, i.e. it has more than `lineThreshold` line breaks.
 */
function XXd(text: string, lineThreshold: number): boolean {
  let searchPos = 0;
  for (let lineIndex = 0; lineIndex <= lineThreshold; lineIndex++) {
    if (((searchPos = text.indexOf(`
`, searchPos)), searchPos === -1)) return !1;
    searchPos++;
  }
  return !0;
}

/** Line threshold for collapsing long error output. */
var Heo = 10;

/** Strips any `<sandbox_violations>...</sandbox_violations>` blocks from text. */
function ZPn(text: string): string {
  return text.replace(/<sandbox_violations>[\s\S]*?<\/sandbox_violations>/g, "");
}

/**
 * React-Compiler-memoized component that renders a tool execution error.
 *
 * Derives a human-readable error message from `props.result`, counts the hidden
 * (overflow) lines beyond `Heo`, and renders the message together with an
 * expandable "more lines" indicator unless `props.verbose` is set.
 */
function wC(props: { result: unknown; verbose: boolean }): unknown {
  let cache = Jma.c(24),
    {
      result: result,
      verbose: verbose
    } = props,
    boxComponent,
    flexComponent,
    rowComponent,
    hiddenLineCount,
    errorColor,
    columnDir,
    errorText;
  if (cache[0] !== result || cache[1] !== verbose) {
    let message;
    if (typeof result !== "string") message = "Tool execution failed";else {
      let rawError = fl(result, "tool_use_error") ?? result,
        cleaned = ZPn(rawError).replace(/<\/?error>/g, "").trim();
      if (!verbose && cleaned.includes("InputValidationError: ")) message = "Invalid tool parameters";else if (cleaned.startsWith("Error: ") || cleaned.startsWith("Cancelled: ")) message = cleaned;else message = `Error: ${cleaned}`;
    }
    hiddenLineCount = nu(message, `
`) + 1 - Heo, rowComponent = Yn, flexComponent = $, errorText = "column", boxComponent = v, errorColor = "error", columnDir = WIn(verbose ? message : message.split(`
`).slice(0, Heo).join(`
`)), cache[0] = result, cache[1] = verbose, cache[2] = boxComponent, cache[3] = flexComponent, cache[4] = rowComponent, cache[5] = hiddenLineCount, cache[6] = errorColor, cache[7] = columnDir, cache[8] = errorText;
  } else boxComponent = cache[2], flexComponent = cache[3], rowComponent = cache[4], hiddenLineCount = cache[5], errorColor = cache[6], columnDir = cache[7], errorText = cache[8];
  let errorElement;
  if (cache[9] !== boxComponent || cache[10] !== errorColor || cache[11] !== columnDir) errorElement = Wit.jsx(boxComponent, {
    color: errorColor,
    children: columnDir
  }), cache[9] = boxComponent, cache[10] = errorColor, cache[11] = columnDir, cache[12] = errorElement;else errorElement = cache[12];
  let overflowElement;
  if (cache[13] !== hiddenLineCount || cache[14] !== verbose) overflowElement = !verbose && Wit.jsx(FO, {
    count: hiddenLineCount,
    expandable: !0
  }), cache[13] = hiddenLineCount, cache[14] = verbose, cache[15] = overflowElement;else overflowElement = cache[15];
  let stackedElement;
  if (cache[16] !== flexComponent || cache[17] !== errorText || cache[18] !== errorElement || cache[19] !== overflowElement) stackedElement = Wit.jsxs(flexComponent, {
    flexDirection: errorText,
    children: [errorElement, overflowElement]
  }), cache[16] = flexComponent, cache[17] = errorText, cache[18] = errorElement, cache[19] = overflowElement, cache[20] = stackedElement;else stackedElement = cache[20];
  let rootElement;
  if (cache[21] !== rowComponent || cache[22] !== stackedElement) rootElement = Wit.jsx(rowComponent, {
    children: stackedElement
  }), cache[21] = rowComponent, cache[22] = stackedElement, cache[23] = rootElement;else rootElement = cache[23];
  return rootElement;
}
var Jma, Wit;
var iq = b(() => {
  sHe();
  po();
  je();
  lr();
  uj();
  Pl();
  Jma = x(tt(), 1), Wit = x(oe(), 1);
});

export {Yma,XXd,Heo,ZPn,wC,Jma,Wit,iq as initModelResolutionModule};
