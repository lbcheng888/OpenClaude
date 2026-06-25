// @ts-nocheck
import {dd,Xl} from "../config/0651_maxBytes.ts";
import {q1,X0e} from "../../vendor/m3930.ts";
import {jUa,YUa} from "../../vendor/m3942.ts";
import {fl,po} from "../tools/5224_userPromptCount.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {wC,initModelResolutionModule as iq} from "./3298_result.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {xB,j0e} from "../../vendor/m3918.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Render helpers for the NotebookEdit tool (editing Jupyter `.ipynb` cells).
 *
 * This module supplies the UI/terminal renderers that the NotebookEdit tool
 * definition wires into its `getToolUseSummary`, `renderToolUseMessage`,
 * `renderToolUseRejectedMessage`, `renderToolUseErrorMessage` and
 * `renderToolResultMessage` hooks.
 *
 * Behaviour is preserved 1:1 from the original obfuscated bundle; only symbol
 * names, types and comments have been added.
 */

// --- External (cross-module) references, kept under their recovered names ---
// dd:  formats an absolute path into a display path (relative / `~`-prefixed).
// q1:  Ink component that renders a clickable/highlighted file-path link.
// jUa: the compiled/memoized notebook-edit message component (defined in this
//      module / referenced for rendering a rejected tool use).
// wC:  generic tool-result renderer fallback.
// Yn:  Ink container (single-child wrapper / line box).
// v:   Ink Text component.
// $:   Ink Box component.
// xB:  syntax-highlighted code block renderer.
// fl:  detects whether a string contains a `<marker>...</marker>` block
//      (here used to spot a "tool_use_error" wrapper).
// FI:  the React module loaded via the bundle's `x(..., 1)` interop helper.

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
function rdo(input: NotebookEditInput | null | undefined): string | null {
  if (!input?.notebook_path) return null;
  return dd(input.notebook_path);
}

/**
 * Renders the one-line "tool use" message for a NotebookEdit invocation.
 *
 * In verbose mode it shows the raw notebook path plus a trailing summary of
 * the cell id, a 30-char preview of the new source, the cell type and the edit
 * mode (defaulting to "replace"); otherwise it shows the formatted path and the
 * cell id only. Returns `null` when required fields are missing.
 */
function JUa({
  notebook_path: notebookPath,
  cell_id: cellId,
  new_source: newSource,
  cell_type: cellType,
  edit_mode: editMode
}: NotebookEditInput, {
  verbose
}: RenderVerboseOptions): unknown {
  if (!notebookPath || !newSource || !cellType) return null;
  let displayPath = verbose ? notebookPath : dd(notebookPath);
  if (verbose) return FI.jsxs(FI.Fragment, {
    children: [FI.jsx(q1, {
      filePath: notebookPath,
      children: displayPath
    }), `@${cellId}, content: ${newSource.slice(0, 30)}…, cell_type: ${cellType}, edit_mode: ${editMode ?? "replace"}`]
  });
  return FI.jsxs(FI.Fragment, {
    children: [FI.jsx(q1, {
      filePath: notebookPath,
      children: displayPath
    }), `@${cellId}`]
  });
}

/**
 * Renders the message shown when a NotebookEdit tool use is rejected by the
 * user, delegating to the compiled notebook-edit message component (`jUa`).
 */
function XUa(input: NotebookEditInput, {
  verbose
}: RenderVerboseOptions): unknown {
  return FI.jsx(jUa, {
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
function QUa(result: unknown, {
  verbose
}: RenderVerboseOptions): unknown {
  if (!verbose && typeof result === "string" && fl(result, "tool_use_error")) return FI.jsx(Yn, {
    children: FI.jsx(v, {
      color: "error",
      children: "Error editing notebook"
    })
  });
  return FI.jsx(wC, {
    result: result,
    verbose: verbose
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
function ZUa({
  cell_id: cellId,
  new_source: newSource,
  error
}: NotebookEditResult): unknown {
  if (error) return FI.jsx(Yn, {
    children: FI.jsx(v, {
      color: "error",
      children: error
    })
  });
  return FI.jsx(Yn, {
    children: FI.jsxs($, {
      flexDirection: "column",
      children: [FI.jsxs(v, {
        children: ["Updated cell ", FI.jsx(v, {
          bold: !0,
          children: cellId
        }), ":"]
      }), FI.jsx($, {
        marginLeft: 2,
        children: FI.jsx(xB, {
          code: newSource,
          filePath: "notebook.py"
        })
      })]
    })
  });
}

/** React namespace, populated by the module initializer below. */
var FI: typeof import("react");

/**
 * Lazy module initializer: runs sibling-module init thunks, then binds the
 * React namespace via the bundle's interop helper.
 */
var e2a = b(() => {
  po();
  iq();
  X0e();
  j0e();
  Pl();
  YUa();
  je();
  Xl();
  FI = x(oe(), 1);
});

export {rdo,JUa,XUa,QUa,ZUa,FI,e2a};
