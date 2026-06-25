// @ts-nocheck
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {bw,EW} from "../../vendor/m2811.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {eJa,tJa} from "../../vendor/m4271.ts";
import {dd,Xl} from "../config/0651_maxBytes.ts";
import {fl,po} from "../tools/5224_userPromptCount.ts";
import {wC,initModelResolutionModule as iq} from "./3298_result.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
// ---------------------------------------------------------------------------
// core/4273_operation.ts
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

/** Any renderable React node produced by the compiled `createElement` calls. */
type ReactChild = any;
/** A component type usable as the first arg of `createElement`. */
type Component = any;

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
function X2p(props: LspResultSummaryProps) {
  let cache = nJa.c(24),
    {
      operation,
      resultCount,
      fileCount,
      content,
      verbose,
    } = props,
    labels: OperationLabels;
  if (cache[0] !== operation) labels = J2p[operation] || {
    singular: "result",
    plural: "results"
  }, cache[0] = operation, cache[1] = labels;else labels = cache[1];
  let resolvedLabels = labels,
    countNoun = resultCount === 1 ? resolvedLabels.singular : resolvedLabels.plural,
    countLine;
  if (cache[2] !== countNoun || cache[3] !== resolvedLabels.special || cache[4] !== operation || cache[5] !== resultCount) countLine = operation === "hover" && resultCount > 0 && resolvedLabels.special ? yH.jsxs(v, {
    children: ["Hover info ", resolvedLabels.special]
  }) : yH.jsxs(v, {
    children: ["Found ", yH.jsxs(v, {
      bold: !0,
      children: [resultCount, " "]
    }), countNoun]
  }), cache[2] = countNoun, cache[3] = resolvedLabels.special, cache[4] = operation, cache[5] = resultCount, cache[6] = countLine;else countLine = cache[6];
  let resolvedCountLine = countLine,
    fileLine;
  if (cache[7] !== fileCount) fileLine = fileCount > 1 ? yH.jsxs(v, {
    children: [" ", "across ", yH.jsxs(v, {
      bold: !0,
      children: [fileCount, " "]
    }), "files"]
  }) : null, cache[7] = fileCount, cache[8] = fileLine;else fileLine = cache[8];
  let resolvedFileLine = fileLine;
  if (verbose) {
    let cornerPrefix;
    if (cache[9] === Symbol.for("react.memo_cache_sentinel")) cornerPrefix = yH.jsx(v, {
      dimColor: !0,
      children: "\xA0\xA0⎿ \xA0"
    }), cache[9] = cornerPrefix;else cornerPrefix = cache[9];
    let summaryRow;
    if (cache[10] !== resolvedCountLine || cache[11] !== resolvedFileLine) summaryRow = yH.jsx($, {
      flexDirection: "row",
      children: yH.jsxs(v, {
        children: [cornerPrefix, resolvedCountLine, resolvedFileLine]
      })
    }), cache[10] = resolvedCountLine, cache[11] = resolvedFileLine, cache[12] = summaryRow;else summaryRow = cache[12];
    let contentRow;
    if (cache[13] !== content) contentRow = yH.jsx($, {
      marginLeft: 5,
      children: yH.jsx(v, {
        children: content
      })
    }), cache[13] = content, cache[14] = contentRow;else contentRow = cache[14];
    let verboseColumn;
    if (cache[15] !== summaryRow || cache[16] !== contentRow) verboseColumn = yH.jsxs($, {
      flexDirection: "column",
      children: [summaryRow, contentRow]
    }), cache[15] = summaryRow, cache[16] = contentRow, cache[17] = verboseColumn;else verboseColumn = cache[17];
    return verboseColumn;
  }
  let spinner;
  if (cache[18] !== resultCount) spinner = resultCount > 0 && yH.jsx(bw, {}), cache[18] = resultCount, cache[19] = spinner;else spinner = cache[19];
  let compactRow;
  if (cache[20] !== resolvedCountLine || cache[21] !== resolvedFileLine || cache[22] !== spinner) compactRow = yH.jsx(Yn, {
    height: 1,
    children: yH.jsxs(v, {
      children: [resolvedCountLine, resolvedFileLine, " ", spinner]
    })
  }), cache[20] = resolvedCountLine, cache[21] = resolvedFileLine, cache[22] = spinner, cache[23] = compactRow;else compactRow = cache[23];
  return compactRow;
}

/**
 * Returns the short display name for the LSP tool.
 */
function rJa() {
  return "LSP";
}

/**
 * Builds a one-line, comma-separated description of an LSP tool invocation
 * (e.g. `operation: "goToDefinition", symbol: "foo", in: "src/a.ts"`).
 * Position-based operations resolve the symbol at the given location when
 * possible; otherwise they fall back to file + position. Returns null when no
 * operation is present. `verbose` keeps absolute paths instead of shortening.
 */
function oJa(input: {
  operation?: string;
  filePath?: string;
  line?: number;
  character?: number;
}, {
  verbose
}: { verbose: boolean }): string | null {
  if (!input.operation) return null;
  let parts: string[] = [];
  if ((input.operation === "goToDefinition" || input.operation === "findReferences" || input.operation === "hover" || input.operation === "goToImplementation") && input.filePath && input.line !== void 0 && input.character !== void 0) {
    let symbol = eJa(input.filePath, input.line - 1, input.character - 1),
      displayPath = verbose ? input.filePath : dd(input.filePath);
    if (symbol) parts.push(`operation: "${input.operation}"`), parts.push(`symbol: "${symbol}"`), parts.push(`in: "${displayPath}"`);else parts.push(`operation: "${input.operation}"`), parts.push(`file: "${displayPath}"`), parts.push(`position: ${input.line}:${input.character}`);
    return parts.join(", ");
  }
  if (parts.push(`operation: "${input.operation}"`), input.filePath) {
    let displayPath = verbose ? input.filePath : dd(input.filePath);
    parts.push(`file: "${displayPath}"`);
  }
  return parts.join(", ");
}

/**
 * Renders an LSP tool error/result. In non-verbose mode, a string result that
 * carries a `tool_use_error` block is collapsed to a one-line "LSP operation
 * failed" message; otherwise the full result is delegated to `wC` (ResultView).
 */
function sJa(result: unknown, {
  verbose
}: { verbose: boolean }) {
  if (!verbose && typeof result === "string" && fl(result, "tool_use_error")) return yH.jsx(Yn, {
    children: yH.jsx(v, {
      color: "error",
      children: "LSP operation failed"
    })
  });
  return yH.jsx(wC, {
    result: result,
    verbose: verbose
  });
}

/**
 * Renders a successful LSP tool result. When both counts are present it uses
 * the compact summary component `X2p`; otherwise it falls back to a plain text
 * row containing the raw result.
 */
function iJa(data: {
  operation: string;
  result: unknown;
  resultCount?: number;
  fileCount?: number;
}, _unused: unknown, {
  verbose
}: { verbose: boolean }) {
  if (data.resultCount !== void 0 && data.fileCount !== void 0) return yH.jsx(X2p, {
    operation: data.operation,
    resultCount: data.resultCount,
    fileCount: data.fileCount,
    content: data.result,
    verbose: verbose
  });
  return yH.jsx(Yn, {
    children: yH.jsx(v, {
      children: data.result
    })
  });
}

var nJa, yH, J2p;

/**
 * Lazy module initializer. Wires up dependency modules, then binds the React
 * Compiler runtime (`nJa`), React/JSX runtime (`yH`), and the per-operation
 * singular/plural label table (`J2p`).
 */
var aJa = b(() => {
  EW();
  iq();
  Pl();
  je();
  Xl();
  po();
  tJa();
  nJa = x(tt(), 1), yH = x(oe(), 1), J2p = {
    goToDefinition: {
      singular: "definition",
      plural: "definitions"
    },
    findReferences: {
      singular: "reference",
      plural: "references"
    },
    documentSymbol: {
      singular: "symbol",
      plural: "symbols"
    },
    workspaceSymbol: {
      singular: "symbol",
      plural: "symbols"
    },
    hover: {
      singular: "hover info",
      plural: "hover info",
      special: "available"
    },
    goToImplementation: {
      singular: "implementation",
      plural: "implementations"
    },
    prepareCallHierarchy: {
      singular: "call item",
      plural: "call items"
    },
    incomingCalls: {
      singular: "caller",
      plural: "callers"
    },
    outgoingCalls: {
      singular: "callee",
      plural: "callees"
    }
  };
});

export {X2p,rJa,oJa,sJa,iJa,nJa,yH as loadingMetadata,J2p,aJa};
