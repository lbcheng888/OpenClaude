// @ts-nocheck
import {Id as v3,mc as G1} from "../config/0645_maxBytes.ts";
import {initRN as fE,uIe as nZH} from "../../vendor/m3974.ts";
import {y2a as GZK,T2a as RZK} from "../../vendor/m4067.ts";
import {Dl as y4,lo as zq} from "../tools/5190_userPromptCount.ts";
import {Gn as d6,sc as l4} from "../../vendor/m2455.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {wC as _X,jq as OB} from "../tui/3282_result.tsx";
import {Box as B} from "../../vendor/m2422.ts";
import {mU as lC,kIe as QZH} from "../../vendor/m4051.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Render helpers for the NotebookEdit tool (editing Jupyter `.ipynb` cells).
 *
 * This module supplies the UI/terminal renderers that the NotebookEdit tool
 * definition (see `tools/3907_notebook_path.ts`) wires into its
 * `getToolUseSummary`, `renderToolUseMessage`, `renderToolUseRejectedMessage`,
 * `renderToolUseErrorMessage` and `renderToolResultMessage` hooks.
 *
 * Behaviour is preserved 1:1 from the original obfuscated bundle; only symbol
 * names, types and comments have been added.
 */

// --- External (cross-module) references, kept under their recovered names ---
// v3:  formats an absolute path into a display path (relative / `~`-prefixed).
// fE:  Ink component that renders a clickable/highlighted file-path link.
// GZK: the compiled/memoized notebook-edit message component (defined in a
//      sibling module) used when rendering a rejected tool use.
// _X:  generic tool-result renderer fallback.
// d6:  Ink container (single-child wrapper / line box).
// V:   Ink Text component.
// B:   Ink Box component.
// lC:  syntax-highlighted code block renderer.
// y4:  detects whether a string contains a `<marker>...</marker>` block
//      (here used to spot a "tool_use_error" wrapper).
// WH:  the React module loaded via the bundle's `u(..., 1)` interop helper.
declare const v3: (path: string) => string;
declare const fE: React.ComponentType<any>;
declare const GZK: React.ComponentType<any>;
declare const _X: React.ComponentType<any>;
declare const d6: React.ComponentType<any>;
declare const V: React.ComponentType<any>;
declare const B: React.ComponentType<any>;
declare const lC: React.ComponentType<any>;
declare const y4: (haystack: string, marker: string) => unknown;
declare function WH(): typeof import("react");
declare function u<T>(mod: T, interop: number): T;
declare function L(init: () => void): () => void;

// Module-init dependency thunks (other lazily-initialised bundle modules).
declare function zq(): void;
declare function OB(): void;
declare function nZH(): void;
declare function QZH(): void;
declare function l4(): void;
declare function RZK(): void;
declare function nH(): void;
declare function G1(): void;

/** Shape of the NotebookEdit tool's input parameters. */
interface NotebookEditInput {
  /** Absolute path to the `.ipynb` notebook file. */
  notebook_path: string;
  /** ID of the cell being edited (or the anchor cell for an insert). */
  cell_id?: string;
  /** New source text for the cell. */
  new_source?: string;
  /** Cell type being written. */
  cell_type?: "code" | "markdown";
  /** Edit operation; defaults to "replace" when omitted. */
  edit_mode?: "replace" | "insert" | "delete";
}

/** Per-render options threaded through the tool renderers. */
interface RenderVerboseOptions {
  /** When true, render full (untruncated) detail. */
  verbose: boolean;
}

/**
 * Returns a display-friendly path for the notebook being edited, or `null`
 * when no `notebook_path` is present. Used as the tool's `getToolUseSummary`.
 */
function getNotebookToolUseSummary(input: NotebookEditInput | null | undefined): string | null {
  if (!input?.notebook_path) return null;
  return v3(input.notebook_path);
}

/**
 * Renders the one-line "tool use" message for a NotebookEdit invocation.
 *
 * In verbose mode it shows the raw notebook path plus a trailing summary of
 * the cell id, a 30-char preview of the new source, the cell type and the edit
 * mode (defaulting to "replace"); otherwise it shows the formatted path and the
 * cell id only. Returns `null` when required fields are missing.
 */
function NotebookEditToolUseMessage({
  notebook_path: notebookPath,
  cell_id: cellId,
  new_source: newSource,
  cell_type: cellType,
  edit_mode: editMode
}: NotebookEditInput, {
  verbose
}: RenderVerboseOptions): unknown {
  if (!notebookPath || !newSource || !cellType) return null;
  let displayPath = verbose ? notebookPath : v3(notebookPath);
  if (verbose) return React.createElement(React.Fragment, null, React.createElement(fE, {
    filePath: notebookPath
  }, displayPath), `@${cellId}, content: ${newSource.slice(0, 30)}…, cell_type: ${cellType}, edit_mode: ${editMode ?? "replace"}`);
  return React.createElement(React.Fragment, null, React.createElement(fE, {
    filePath: notebookPath
  }, displayPath), `@${cellId}`);
}

/**
 * Renders the message shown when a NotebookEdit tool use is rejected by the
 * user, delegating to the compiled notebook-edit message component (`GZK`).
 */
function renderNotebookEditRejectedMessage(input: NotebookEditInput, {
  verbose
}: RenderVerboseOptions): unknown {
  return React.createElement(GZK, {
    notebook_path: input.notebook_path,
    cell_id: input.cell_id,
    new_source: input.new_source,
    cell_type: input.cell_type,
    edit_mode: input.edit_mode,
    verbose
  });
}

/**
 * Renders the error message for a failed NotebookEdit tool use. When not in
 * verbose mode and the result is a string carrying a `tool_use_error` marker,
 * shows a concise "Error editing notebook" line; otherwise falls back to the
 * generic tool-result renderer.
 */
function renderNotebookEditErrorMessage(result: unknown, {
  verbose
}: RenderVerboseOptions): unknown {
  if (!verbose && typeof result === "string" && y4(result, "tool_use_error")) return React.createElement(d6, null, React.createElement(V, {
    color: "error"
  }, "Error editing notebook"));
  return React.createElement(_X, {
    result,
    verbose
  });
}

/** Result payload passed to the NotebookEdit result renderer. */
interface NotebookEditResult {
  /** ID of the edited cell. */
  cell_id?: string;
  /** Source written into the cell. */
  new_source?: string;
  /** Error message, present only when the edit failed. */
  error?: string;
}

/**
 * Renders the final result message for a successful (or failed) NotebookEdit.
 * On error it shows the error text; otherwise it shows "Updated cell <id>:"
 * followed by the new source rendered as a Python code block.
 */
function renderNotebookEditResultMessage({
  cell_id: cellId,
  new_source: newSource,
  error
}: NotebookEditResult): unknown {
  if (error) return React.createElement(d6, null, React.createElement(V, {
    color: "error"
  }, error));
  return React.createElement(d6, null, React.createElement(B, {
    flexDirection: "column"
  }, React.createElement(V, null, "Updated cell ", React.createElement(V, {
    bold: !0
  }, cellId), ":"), React.createElement(B, {
    marginLeft: 2
  }, React.createElement(lC, {
    code: newSource,
    filePath: "notebook.py"
  }))));
}

/** React namespace, populated by the module initializer below. */
var React: typeof import("react");

/**
 * Lazy module initializer: runs sibling-module init thunks, then binds the
 * React namespace via the bundle's interop helper.
 */
var initNotebookEditRenderers = L(() => {
  zq();
  OB();
  nZH();
  QZH();
  l4();
  RZK();
  nH();
  G1();
  React = u(WH(), 1);
});
export {getNotebookToolUseSummary as Wlo,NotebookEditToolUseMessage as S2a,renderNotebookEditRejectedMessage as b2a,renderNotebookEditErrorMessage as E2a,renderNotebookEditResultMessage as C2a,React as NA,initNotebookEditRenderers as v2a};
