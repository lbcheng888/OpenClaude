// @ts-nocheck
import {Text as TextEl} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {cx as Spinner,iW as HQ} from "../../vendor/m2798.ts";
import {Gn as Row,sc as l4} from "../../vendor/m2455.ts";
import {OWa as lookupSymbolAtPosition,LWa as tuK} from "../../vendor/m4253.ts";
import {Id as toDisplayPath,mc as G1} from "../config/0645_maxBytes.ts";
import {Dl as hasTaggedBlock,lo as zq} from "../tools/5190_userPromptCount.ts";
import {wC as ResultView,jq as OB} from "../tui/3282_result.tsx";
import {b as defineModule,M as requireInterop} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as getCompilerRuntimeModule} from "../../vendor/m2255.ts";
import {Te as getReactModule} from "../../vendor/m2253.ts";
// ---------------------------------------------------------------------------
// core/4230_operation.ts
//
// Rendering helpers for the LSP (Language Server Protocol) tool. This module
// produces the Ink/React output shown when an LSP operation (goToDefinition,
// findReferences, hover, documentSymbol, etc.) completes, including a compact
// "Found N results across M files" summary line and an optional verbose view.
//
// 1:1 restoration: only names, types, and comments were added. All control
// flow, operators (incl. !0/!1), string literals, JSX/createElement shape, and
// cross-module references are preserved exactly as emitted by the React
// Compiler (the `cache[n]` / memo-cache-sentinel pattern is the compiler's
// `useMemoCache` output and must not be altered).
// ---------------------------------------------------------------------------

// Module-level bindings (`euK`, `_R`, `t2O`) assigned by the lazy initializer
// below. Declared here so the component/render functions can close over them.
//   reactCompilerRuntime: React Compiler runtime exposing `c(size)` (memo cache)
//   React:                React module wrapper exposing `default.createElement`
//   OPERATION_LABELS:     per-operation singular/plural (and "special") labels

/** Any renderable React node produced by the compiled `createElement` calls. */
type ReactChild = any;
/** A component type usable as the first arg of `createElement`. */
type Component = any;

/** Ink `<Text>` component (props: bold, color, dimColor, …). */
declare const TextEl: Component;
/** Ink `<Box>` component (props: flexDirection, marginLeft, …). */
declare const Box: Component;
/** Single-line row container component (props: height). */
declare const Row: Component;
/** Animated/loading spinner shown while results are being produced. */
declare const Spinner: Component;
/** Generic result renderer used for non-summary LSP output. */
declare const ResultView: Component;

/** Bundle lazy-module initializer (wraps a module body, runs it once). */
declare function defineModule(body: () => void): () => void;
/** Bundle interop-require helper. */
declare function requireInterop(mod: unknown, esModule: number): never;
/** Module getter for the React Compiler runtime. */
declare function getCompilerRuntimeModule(): unknown;
/** Module getter for React. */
declare function getReactModule(): unknown;

// Imported (via the module init below) cross-module helpers:
/** Resolves the symbol name at a given file/line/character, or null. */
declare function lookupSymbolAtPosition(
  filePath: string,
  line: number,
  character: number,
): string | null;
/** Formats an absolute path as a workspace-relative or `~`-prefixed path. */
declare function toDisplayPath(filePath: string): string;
/** Returns true if `text` contains a `<tag>…</tag>` block of the given tag. */
declare function hasTaggedBlock(text: string, tag: string): boolean;

/** Singular/plural (and optional "special") labels for an LSP operation. */
interface OperationLabels {
  singular: string;
  plural: string;
  /** Extra word used by `hover` (e.g. "available"). */
  special?: string;
}

/** Props for the LSP result summary component. */
interface LspResultSummaryProps {
  operation: string;
  resultCount: number;
  fileCount: number;
  content: unknown;
  verbose: boolean;
}

/**
 * Compact summary view for a completed LSP operation.
 *
 * Renders one of:
 * - "Hover info <special>" (for `hover` with results and a `special` label),
 * - "Found <N> <result|results>" with an optional "across <M> files" suffix,
 * and, when `verbose`, an indented block that also shows the raw `content`.
 *
 * Memoized via the React Compiler runtime; the `cache[n]` reads/writes below
 * are compiler-generated and intentionally untouched.
 */
function LspResultSummary(props: LspResultSummaryProps) {
  let cache = reactCompilerRuntime.c(24),
    {
      operation,
      resultCount,
      fileCount,
      content,
      verbose,
    } = props,
    labels: OperationLabels;
  if (cache[0] !== operation)
    (labels = (OPERATION_LABELS as Record<string, OperationLabels>)[operation] || {
      singular: "result",
      plural: "results",
    }),
      (cache[0] = operation),
      (cache[1] = labels);
  else labels = cache[1] as OperationLabels;
  let resolvedLabels = labels,
    countNoun = resultCount === 1 ? resolvedLabels.singular : resolvedLabels.plural,
    countLine: unknown;
  if (
    cache[2] !== countNoun ||
    cache[3] !== resolvedLabels.special ||
    cache[4] !== operation ||
    cache[5] !== resultCount
  )
    (countLine =
      operation === "hover" && resultCount > 0 && resolvedLabels.special
        ? React.default.createElement(TextEl, null, "Hover info ", resolvedLabels.special)
        : React.default.createElement(
            TextEl,
            null,
            "Found ",
            React.default.createElement(
              TextEl,
              {
                bold: !0,
              },
              resultCount,
              " ",
            ),
            countNoun,
          )),
      (cache[2] = countNoun),
      (cache[3] = resolvedLabels.special),
      (cache[4] = operation),
      (cache[5] = resultCount),
      (cache[6] = countLine);
  else countLine = cache[6];
  let resolvedCountLine = countLine,
    fileLine: unknown;
  if (cache[7] !== fileCount)
    (fileLine =
      fileCount > 1
        ? React.default.createElement(
            TextEl,
            null,
            " ",
            "across ",
            React.default.createElement(
              TextEl,
              {
                bold: !0,
              },
              fileCount,
              " ",
            ),
            "files",
          )
        : null),
      (cache[7] = fileCount),
      (cache[8] = fileLine);
  else fileLine = cache[8];
  let resolvedFileLine = fileLine;
  if (verbose) {
    let cornerPrefix: unknown;
    if (cache[9] === Symbol.for("react.memo_cache_sentinel"))
      (cornerPrefix = React.default.createElement(
        TextEl,
        {
          dimColor: !0,
        },
        "\xA0\xA0⎿ \xA0",
      )),
        (cache[9] = cornerPrefix);
    else cornerPrefix = cache[9];
    let summaryRow: unknown;
    if (cache[10] !== resolvedCountLine || cache[11] !== resolvedFileLine)
      (summaryRow = React.default.createElement(
        Box,
        {
          flexDirection: "row",
        },
        React.default.createElement(TextEl, null, cornerPrefix, resolvedCountLine, resolvedFileLine),
      )),
        (cache[10] = resolvedCountLine),
        (cache[11] = resolvedFileLine),
        (cache[12] = summaryRow);
    else summaryRow = cache[12];
    let contentRow: unknown;
    if (cache[13] !== content)
      (contentRow = React.default.createElement(
        Box,
        {
          marginLeft: 5,
        },
        React.default.createElement(TextEl, null, content),
      )),
        (cache[13] = content),
        (cache[14] = contentRow);
    else contentRow = cache[14];
    let verboseColumn: unknown;
    if (cache[15] !== summaryRow || cache[16] !== contentRow)
      (verboseColumn = React.default.createElement(
        Box,
        {
          flexDirection: "column",
        },
        summaryRow,
        contentRow,
      )),
        (cache[15] = summaryRow),
        (cache[16] = contentRow),
        (cache[17] = verboseColumn);
    else verboseColumn = cache[17];
    return verboseColumn;
  }
  let spinner: unknown;
  if (cache[18] !== resultCount)
    (spinner = resultCount > 0 && React.default.createElement(Spinner, null)),
      (cache[18] = resultCount),
      (cache[19] = spinner);
  else spinner = cache[19];
  let compactRow: unknown;
  if (cache[20] !== resolvedCountLine || cache[21] !== resolvedFileLine || cache[22] !== spinner)
    (compactRow = React.default.createElement(
      Row,
      {
        height: 1,
      },
      React.default.createElement(TextEl, null, resolvedCountLine, resolvedFileLine, " ", spinner),
    )),
      (cache[20] = resolvedCountLine),
      (cache[21] = resolvedFileLine),
      (cache[22] = spinner),
      (cache[23] = compactRow);
  else compactRow = cache[23];
  return compactRow;
}

/**
 * Returns the short display name for the LSP tool.
 */
function getLspToolName(): string {
  return "LSP";
}

/** Input describing a single LSP tool invocation. */
interface LspToolInput {
  operation?: string;
  filePath?: string;
  line?: number;
  character?: number;
}

/**
 * Builds a one-line, comma-separated description of an LSP tool invocation
 * (e.g. `operation: "goToDefinition", symbol: "foo", in: "src/a.ts"`).
 * Position-based operations resolve the symbol at the given location when
 * possible; otherwise they fall back to file + position. Returns null when no
 * operation is present. `verbose` keeps absolute paths instead of shortening.
 */
function renderLspToolDescription(input: LspToolInput, { verbose }: { verbose: boolean }): string | null {
  if (!input.operation) return null;
  let parts: string[] = [];
  if (
    (input.operation === "goToDefinition" ||
      input.operation === "findReferences" ||
      input.operation === "hover" ||
      input.operation === "goToImplementation") &&
    input.filePath &&
    input.line !== void 0 &&
    input.character !== void 0
  ) {
    let symbol = lookupSymbolAtPosition(input.filePath, input.line - 1, input.character - 1),
      displayPath = verbose ? input.filePath : toDisplayPath(input.filePath);
    if (symbol)
      parts.push(`operation: "${input.operation}"`),
        parts.push(`symbol: "${symbol}"`),
        parts.push(`in: "${displayPath}"`);
    else
      parts.push(`operation: "${input.operation}"`),
        parts.push(`file: "${displayPath}"`),
        parts.push(`position: ${input.line}:${input.character}`);
    return parts.join(", ");
  }
  if ((parts.push(`operation: "${input.operation}"`), input.filePath)) {
    let displayPath = verbose ? input.filePath : toDisplayPath(input.filePath);
    parts.push(`file: "${displayPath}"`);
  }
  return parts.join(", ");
}

/**
 * Renders an LSP tool error/result. In non-verbose mode, a string result that
 * carries a `tool_use_error` block is collapsed to a one-line "LSP operation
 * failed" message; otherwise the full result is delegated to `ResultView`.
 */
function renderLspToolResult(result: unknown, { verbose }: { verbose: boolean }) {
  if (!verbose && typeof result === "string" && hasTaggedBlock(result, "tool_use_error"))
    return React.default.createElement(
      Row,
      null,
      React.default.createElement(
        TextEl,
        {
          color: "error",
        },
        "LSP operation failed",
      ),
    );
  return React.default.createElement(ResultView, {
    result: result,
    verbose: verbose,
  });
}

/** Successful LSP tool result payload. */
interface LspToolResultData {
  operation: string;
  result: unknown;
  resultCount?: number;
  fileCount?: number;
}

/**
 * Renders a successful LSP tool result. When both counts are present it uses
 * the compact `LspResultSummary`; otherwise it falls back to a plain text row
 * containing the raw result.
 */
function renderLspToolSuccess(
  data: LspToolResultData,
  _unused: unknown,
  { verbose }: { verbose: boolean },
) {
  if (data.resultCount !== void 0 && data.fileCount !== void 0)
    return React.default.createElement(LspResultSummary, {
      operation: data.operation,
      resultCount: data.resultCount,
      fileCount: data.fileCount,
      content: data.result,
      verbose: verbose,
    });
  return React.default.createElement(
    Row,
    null,
    React.default.createElement(TextEl, null, data.result),
  );
}

var reactCompilerRuntime: { c(size: number): unknown[] },
  React: { default: { createElement(type: Component, props: any, ...children: ReactChild[]): ReactChild } },
  OPERATION_LABELS: Record<string, OperationLabels>;

/**
 * Lazy module initializer. Wires up dependency modules, then binds the React
 * Compiler runtime, React, and the per-operation singular/plural label table.
 */
var initOperationModule = defineModule(() => {
  HQ();
  OB();
  l4();
  nH();
  G1();
  zq();
  tuK();
  (reactCompilerRuntime = requireInterop(getCompilerRuntimeModule(), 1)),
    (React = requireInterop(getReactModule(), 1)),
    (OPERATION_LABELS = {
      goToDefinition: {
        singular: "definition",
        plural: "definitions",
      },
      findReferences: {
        singular: "reference",
        plural: "references",
      },
      documentSymbol: {
        singular: "symbol",
        plural: "symbols",
      },
      workspaceSymbol: {
        singular: "symbol",
        plural: "symbols",
      },
      hover: {
        singular: "hover info",
        plural: "hover info",
        special: "available",
      },
      goToImplementation: {
        singular: "implementation",
        plural: "implementations",
      },
      prepareCallHierarchy: {
        singular: "call item",
        plural: "call items",
      },
      incomingCalls: {
        singular: "caller",
        plural: "callers",
      },
      outgoingCalls: {
        singular: "callee",
        plural: "callees",
      },
    });
});

export {LspResultSummary as IOp,getLspToolName as NWa,renderLspToolDescription as BWa,renderLspToolResult as FWa,renderLspToolSuccess as UWa,reactCompilerRuntime as MWa,React as gI,OPERATION_LABELS as HOp,initOperationModule as $Wa};
