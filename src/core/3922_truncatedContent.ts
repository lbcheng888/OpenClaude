// @ts-nocheck
import {GBa as k0K,q$n as Mv6} from "../telemetry/3921_mediaType.ts";
import {vz as nt} from "../../vendor/m2520.ts";
import {Yc as $5,ws as K7,Zm as O$} from "../config/2709_Zm.ts";
import {Mo as aq} from "../mcp/2200_mcpServerName.ts";
import {hs as Z9,Tu as W5} from "../../vendor/m649.ts";
import {Wt as Q_,ps as M9} from "../../vendor/m230.ts";
import {qt as d_,tn as H6} from "../config/0230_encoding.ts";
import {b as L} from "../../runtime.ts";
// ---------------------------------------------------------------------------
// Jupyter notebook reading & rendering helpers (NotebookRead tool support).
//
// This module loads a `.ipynb` file, normalizes each cell into a compact
// internal representation, truncates oversized text/image outputs, and renders
// the cells into Anthropic tool-result content blocks (text + base64 image).
//
// 1:1 restoration: only symbol names, types and comments were added. All logic,
// control flow, operators (incl. !0/!1), string literals and cross-module
// references are preserved exactly.
// ---------------------------------------------------------------------------

// --- Cross-module references (defined elsewhere; names recovered upstream) ---
// k0K(text): truncates a string to the configured limit and reports whether it
//   is an image; returns { totalLines, truncatedContent, isImage }.
declare function k0K(text: string): {
  totalLines: number;
  truncatedContent: string;
  isImage: unknown;
};
// nt(buffer): probes raw bytes as an image; returns image dimensions, or null
//   when the buffer is not a valid/decodable image.
declare function nt(buffer: Buffer): unknown | null;
// Z9(path): resolves a file path to its canonical/absolute form.
declare function Z9(path: string): string;
// Q_(): filesystem accessor exposing readFileBytes(path) -> Promise<Buffer>.
declare function Q_(): {
  readFileBytes(path: string): Promise<Buffer>;
};
// d_(text): safe JSON.parse wrapper.
declare function d_(text: string): any;
// $5(): true when the Bash tool is available (non-Windows, or Windows w/ bash).
declare function $5(): boolean;
// aq: tool name constant "Bash". K7: tool name constant "PowerShell".
declare const aq: string;
declare const K7: string;
// Module-init thunks (esbuild lazy `__esm` wrappers) pulled in for side effects.
declare function L<T>(init: () => T): () => T;
declare function Mv6(): void;
declare function M9(): void;
declare function W5(): void;
declare function O$(): void;
declare function H6(): void;

// --- Internal data shapes (inferred from usage) ---

/** A processed notebook output (after text truncation / image extraction). */
interface ProcessedNotebookOutput {
  output_type: "stream" | "execute_result" | "display_data" | "error";
  text: string;
  /** Present only for execute_result / display_data outputs that carry an image. */
  image?: {
    image_data: string;
    media_type: string;
  };
}

/** Normalized representation of a single notebook cell. */
interface ProcessedNotebookCell {
  cellType: string;
  source: string;
  execution_count: number | undefined;
  cell_id: string;
  /** Set for code cells only. */
  language?: string;
  /** Set for code cells that produced (size-limited) outputs. */
  outputs?: ProcessedNotebookOutput[];
}

/** An Anthropic text content block. */
interface TextContentBlock {
  type: "text";
  text: string;
}

/** An Anthropic base64 image content block. */
interface ImageContentBlock {
  type: "image";
  source: {
    data: string;
    media_type: string;
    type: "base64";
  };
}
type NotebookContentBlock = TextContentBlock | ImageContentBlock;

/**
 * Whether the combined size of a cell's outputs (text + image data) exceeds the
 * inclusion limit. Returns !0 (true) when the running total passes the limit.
 */
function outputsExceedSizeLimit(outputs: ProcessedNotebookOutput[]): boolean {
  let total = 0;
  for (let output of outputs) {
    if (!output) continue;
    if (total += (output.text?.length ?? 0) + (output.image?.image_data.length ?? 0), total > MAX_OUTPUT_CONTENT_LENGTH) return !0;
  }
  return !1;
}

/**
 * Joins (if an array) and truncates output text to the configured content
 * limit, returning the possibly-truncated string. Empty input yields "".
 */
function truncateOutputText(text: string | string[] | undefined): string {
  if (!text) return "";
  let joined = Array.isArray(text) ? text.join("") : text,
    {
      truncatedContent
    } = k0K(joined);
  return truncatedContent;
}

/**
 * Extracts the first valid PNG/JPEG image from a notebook output `data` map.
 * Strips whitespace from the base64 payload and validates it as decodable image
 * bytes; returns undefined when no usable image is present.
 */
function extractImageOutput(data: Record<string, unknown>): {
  image_data: string;
  media_type: string;
} | undefined {
  for (let mediaType of ["image/png", "image/jpeg"]) {
    let raw = data[mediaType];
    if (typeof raw !== "string") continue;
    let imageData = raw.replace(/\s/g, "");
    if (nt(Buffer.from(imageData, "base64")) === null) return;
    return {
      image_data: imageData,
      media_type: mediaType
    };
  }
  return;
}

/** Raw notebook output as parsed from the `.ipynb` JSON. */
interface RawNotebookOutput {
  output_type: "stream" | "execute_result" | "display_data" | "error";
  text?: string | string[];
  data?: Record<string, any>;
  ename?: string;
  evalue?: string;
  traceback?: string[];
}

/**
 * Converts a raw notebook output into the processed form: truncates text and,
 * for result/display outputs, extracts an inline image. Error outputs are
 * flattened into a single text payload of `ename: evalue` + traceback.
 */
function convertNotebookOutput(output: RawNotebookOutput): ProcessedNotebookOutput | undefined {
  switch (output.output_type) {
    case "stream":
      return {
        output_type: output.output_type,
        text: truncateOutputText(output.text)
      };
    case "execute_result":
    case "display_data":
      return {
        output_type: output.output_type,
        text: truncateOutputText(output.data?.["text/plain"]),
        image: output.data && extractImageOutput(output.data)
      };
    case "error":
      return {
        output_type: output.output_type,
        text: truncateOutputText(`${output.ename}: ${output.evalue}
${output.traceback!.join(`
`)}`)
      };
  }
}

/** Raw notebook cell as parsed from the `.ipynb` JSON. */
interface RawNotebookCell {
  id?: string;
  cell_type: string;
  source: string | string[];
  execution_count?: number;
  outputs?: RawNotebookOutput[];
}

/**
 * Normalizes a raw notebook cell into {@link ProcessedNotebookCell}. Assigns a
 * synthetic `cell-<index>` id when the cell has none. For code cells, records
 * the notebook language and converts outputs; when outputs are oversized (and
 * this is not a single-cell read), replaces them with a hint pointing at a
 * shell command (cat/jq on Bash, Get-Content/ConvertFrom-Json on PowerShell).
 */
function convertNotebookCell(cell: RawNotebookCell, index: number, language: string, singleCell: boolean): ProcessedNotebookCell {
  let cellId = cell.id ?? `cell-${index}`,
    result: ProcessedNotebookCell = {
      cellType: cell.cell_type,
      source: Array.isArray(cell.source) ? cell.source.join("") : cell.source,
      execution_count: cell.cell_type === "code" ? cell.execution_count || void 0 : void 0,
      cell_id: cellId
    };
  if (cell.cell_type === "code") result.language = language;
  if (cell.cell_type === "code" && cell.outputs?.length) {
    let outputs = cell.outputs.map(convertNotebookOutput) as ProcessedNotebookOutput[];
    if (!singleCell && outputsExceedSizeLimit(outputs)) {
      let hint = $5() ? `${aq} with: cat <notebook_path> | jq '.cells[${index}].outputs'` : `${K7} with: Get-Content <notebook_path> | ConvertFrom-Json | Select-Object -ExpandProperty cells | Select-Object -Index ${index} | Select-Object -ExpandProperty outputs`;
      result.outputs = [{
        output_type: "stream",
        text: `Outputs are too large to include. Use ${hint}`
      }];
    } else result.outputs = outputs;
  }
  return result;
}

/**
 * Renders a cell's source into a single tagged text content block, prefixing
 * non-code cell types and non-python code languages with metadata tags.
 */
function renderCellContent(cell: ProcessedNotebookCell): TextContentBlock {
  let prefixTags: string[] = [];
  if (cell.cellType !== "code") prefixTags.push(`<cell_type>${cell.cellType}</cell_type>`);
  if (cell.language !== "python" && cell.cellType === "code") prefixTags.push(`<language>${cell.language}</language>`);
  return {
    text: `<cell id="${cell.cell_id}">${prefixTags.join("")}${cell.source}</cell id="${cell.cell_id}">`,
    type: "text"
  };
}

/**
 * Renders a single processed output into content blocks: a leading text block
 * (when text is present) and an image block (when an image is present).
 */
function renderOutputContent(output: ProcessedNotebookOutput): NotebookContentBlock[] {
  let blocks: NotebookContentBlock[] = [];
  if (output.text) blocks.push({
    text: `
${output.text}`,
    type: "text"
  });
  if (output.image) blocks.push({
    type: "image",
    source: {
      data: output.image.image_data,
      media_type: output.image.media_type,
      type: "base64"
    }
  });
  return blocks;
}

/**
 * Renders a full cell (source block followed by its flattened output blocks)
 * into an ordered array of content blocks.
 */
function renderCell(cell: ProcessedNotebookCell): NotebookContentBlock[] {
  let sourceBlock = renderCellContent(cell),
    outputBlocks = cell.outputs?.flatMap(renderOutputContent);
  return [sourceBlock, ...(outputBlocks ?? [])];
}

/**
 * Reads and parses a Jupyter notebook file, returning normalized cells. When a
 * `cellId` is supplied, returns just that cell (read as a single cell, so its
 * outputs are never truncated by size); otherwise returns all cells. Throws
 * {@link NotebookReadError} for invalid JSON or a malformed notebook structure.
 */
async function readNotebookCells(notebookPath: string, cellId?: string): Promise<ProcessedNotebookCell[]> {
  let resolvedPath = Z9(notebookPath),
    rawText = (await Q_().readFileBytes(resolvedPath)).toString("utf-8"),
    notebook: {
      cells: RawNotebookCell[];
      metadata?: {
        language_info?: {
          name?: string;
        };
      };
    };
  try {
    notebook = d_(rawText);
  } catch (error) {
    throw new NotebookReadError(`Notebook file is not valid JSON (it may be truncated, corrupted, or still being written): ${error instanceof Error ? error.message : String(error)}`);
  }
  if (!Array.isArray(notebook?.cells) || notebook.cells.some(cell => cell === null || typeof cell !== "object")) throw new NotebookReadError('Notebook file is not a valid Jupyter notebook (top-level "cells" must be an array of cell objects).');
  let language = notebook.metadata?.language_info?.name ?? "python";
  if (cellId) {
    let cell = notebook.cells.find(candidate => candidate.id === cellId);
    if (!cell) throw Error(`Cell with ID "${cellId}" not found in notebook`);
    return [convertNotebookCell(cell, notebook.cells.indexOf(cell), language, !0)];
  }
  return notebook.cells.map((cell, index) => convertNotebookCell(cell, index, language, !1));
}

/**
 * Builds an Anthropic `tool_result` from processed notebook cells, merging
 * adjacent text content blocks (joined with a newline) into one block.
 */
function buildNotebookToolResult(cells: ProcessedNotebookCell[], toolUseId: string): {
  tool_use_id: string;
  type: "tool_result";
  content: NotebookContentBlock[];
} {
  let blocks = cells.flatMap(renderCell);
  return {
    tool_use_id: toolUseId,
    type: "tool_result",
    content: blocks.reduce((acc: NotebookContentBlock[], block) => {
      if (acc.length === 0) return [block];
      let last = acc.at(-1);
      if (last && last.type === "text" && block.type === "text") return last.text += `
` + block.text, acc;
      return acc.push(block), acc;
    }, [])
  };
}

/**
 * Parses a synthetic `cell-<index>` id into its numeric index, or undefined
 * when the id does not match that pattern (or the number is invalid).
 */
function parseCellIndexFromId(cellId: string): number | undefined {
  let match = cellId.match(/^cell-(\d+)$/);
  if (match && match[1]) {
    let index = parseInt(match[1], 10);
    return isNaN(index) ? void 0 : index;
  }
  return;
}

/** Maximum combined size (chars) of cell outputs before they are elided. */
var MAX_OUTPUT_CONTENT_LENGTH = 1e4,
  NotebookReadError: {
    new (message: string): Error;
  };

/**
 * Module init thunk: wires up side-effect imports and defines the
 * NotebookReadError class used for invalid-notebook failures.
 */
var Xv6 = L(() => {
  Mv6();
  M9();
  W5();
  O$();
  H6();
  NotebookReadError = class NotebookReadError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "NotebookReadError";
    }
  };
});
export {outputsExceedSizeLimit as gkp,truncateOutputText as Fuo,extractImageOutput as _kp,convertNotebookOutput as ykp,convertNotebookCell as VBa,renderCellContent as Tkp,renderOutputContent as Skp,renderCell as bkp,readNotebookCells as KBa,buildNotebookToolResult as zBa,parseCellIndexFromId as Q9t,MAX_OUTPUT_CONTENT_LENGTH as hkp,NotebookReadError as Buo,Xv6 as W$n};
