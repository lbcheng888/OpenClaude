// @ts-nocheck
import {b} from "../../runtime.ts";
import {Pq,TT,I0e} from "../session/3880_trackSequence.ts";
import {Qr} from "../../vendor/m323.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {e3t,Gut} from "../agent/3925_e3t.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {Ct,In} from "../../vendor/m197.ts";
import {Xl,Fyr,wje,vje,QX,zEe,jEe} from "../config/0651_maxBytes.ts";
import {GN,XX,wrs} from "../../vendor/m640.ts";
import {ps,Wt} from "../../vendor/m230.ts";
import {pd,ba} from "../../vendor/m706.ts";
import {W$n,Q9t} from "../core/3922_truncatedContent.ts";
import {Tu,hs} from "../../vendor/m649.ts";
import {Q$n} from "../../vendor/m3940.ts";
import {Xm,matchesPathRule as uye,checkWritePermissionForTool as exe} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {tn,qt,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {VUa,WUa,GUa} from "../../vendor/m3941.ts";
import {e2a,rdo,JUa,XUa,QUa,ZUa} from "../core/3944_notebook_path.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Y0} from "./2710_allErrors.ts";
// @ts-nocheck
/**
 * NotebookEdit tool (Claude Code v2.1.190).
 *
 * Edits a single cell of a Jupyter notebook (.ipynb). Supports three edit
 * modes: replace (overwrite an existing cell's source), insert (add a new cell
 * after a given cell id or at the start) and delete (remove a cell). The tool
 * validates the path, freshness against the read-file cache, and notebook JSON
 * before mutating, then writes the serialized notebook back to disk preserving
 * encoding and line endings.
 */

/** crypto module — used to mint short random cell ids for inserted cells. */
var t2a: typeof import("crypto"),
  /** path module — used for `extname` extension checks. */
  n2a: typeof import("path"),
  /** Lazily-built zod input schema for the NotebookEdit tool. */
  fHp: () => unknown,
  /** Lazily-built zod output schema for the NotebookEdit tool. */
  hHp: () => unknown,
  /** The NotebookEdit tool definition object. */
  qq: unknown;
var edt = b(() => {
  Pq();
  Qr();
  ri();
  e3t();
  xl();
  Ct();
  Xl();
  GN();
  ps();
  pd();
  W$n();
  Tu();
  Q$n();
  Xm();
  tn();
  VUa();
  e2a();
  t2a = require("crypto"), n2a = require("path"), fHp = ve(() => C.strictObject({
    notebook_path: C.string().describe("The absolute path to the Jupyter notebook file to edit (must be absolute, not relative)"),
    cell_id: C.string().optional().describe("The ID of the cell to edit. When inserting a new cell, the new cell will be inserted after the cell with this ID, or at the beginning if not specified."),
    new_source: C.string().describe("The new source for the cell"),
    cell_type: C.enum(["code", "markdown"]).optional().describe("The type of the cell (code or markdown). If not specified, it defaults to the current cell type. If using edit_mode=insert, this is required."),
    edit_mode: C.enum(["replace", "insert", "delete"]).optional().describe("The type of edit to make (replace, insert, delete). Defaults to replace.")
  })), hHp = ve(() => C.object({
    new_source: C.string().describe("The new source code that was written to the cell"),
    cell_id: C.string().optional().describe("The ID of the cell that was edited"),
    cell_type: C.enum(["code", "markdown"]).describe("The type of the cell"),
    language: C.string().describe("The programming language of the notebook"),
    edit_mode: C.string().describe("The edit mode that was used"),
    error: C.string().optional().describe("Error message if the operation failed"),
    notebook_path: C.string().describe("The path to the notebook file"),
    original_file: C.string().describe("The original notebook content before modification"),
    updated_file: C.string().describe("The updated notebook content after modification")
  })), qq = Ks({
    name: Y0,
    ruleContentField: "notebook_path",
    searchHint: "edit Jupyter notebook cells (.ipynb)",
    maxResultSizeChars: 1e5,
    shouldDefer: !0,
    async description() {
      return WUa;
    },
    async prompt() {
      return GUa;
    },
    backfillObservableInput(input) {
      if (typeof input.notebook_path === "string") input.notebook_path = hs(input.notebook_path);
    },
    userFacingName() {
      return "Edit Notebook";
    },
    getToolUseSummary: rdo,
    getActivityDescription(input) {
      let summary = rdo(input);
      return summary ? `Editing notebook ${summary}` : "Editing notebook";
    },
    get inputSchema() {
      return fHp();
    },
    get outputSchema() {
      return hHp();
    },
    toAutoClassifierInput(input) {
      let editMode = input.edit_mode ?? "replace";
      return `${input.notebook_path} ${editMode}: ${input.new_source}`;
    },
    getPath(input) {
      return input.notebook_path;
    },
    async preparePermissionMatcher({
      notebook_path: notebookPath
    }) {
      return rule => uye(rule, notebookPath);
    },
    async checkPermissions(input, context) {
      return exe(qq, input, Mr(context));
    },
    mapToolResultToToolResultBlockParam({
      cell_id: cellId,
      edit_mode: editMode,
      new_source: newSource,
      error: error
    }, toolUseId) {
      if (error) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: error,
        is_error: !0
      };
      switch (editMode) {
        case "replace":
          return {
            tool_use_id: toolUseId,
            type: "tool_result",
            content: `Updated cell ${cellId} with ${newSource}`
          };
        case "insert":
          return {
            tool_use_id: toolUseId,
            type: "tool_result",
            content: `Inserted cell ${cellId} with ${newSource}`
          };
        case "delete":
          return {
            tool_use_id: toolUseId,
            type: "tool_result",
            content: `Deleted cell ${cellId}`
          };
        default:
          return {
            tool_use_id: toolUseId,
            type: "tool_result",
            content: "Unknown edit mode"
          };
      }
    },
    renderToolUseMessage: JUa,
    renderToolUseRejectedMessage: XUa,
    renderToolUseErrorMessage: QUa,
    renderToolResultMessage: ZUa,
    async validateInput({
      notebook_path: notebookPath,
      cell_type: cellType,
      cell_id: cellId,
      edit_mode: editMode = "replace"
    }, context) {
      let resolvedPath = hs(notebookPath),
        pathError = Gut(resolvedPath, context);
      if (pathError) return {
        result: !1,
        message: pathError,
        errorCode: 12
      };
      if (resolvedPath.startsWith("\\\\") || resolvedPath.startsWith("//")) return {
        result: !0
      };
      if (n2a.extname(resolvedPath) !== ".ipynb") return {
        result: !1,
        message: "File must be a Jupyter notebook (.ipynb file). For editing other file types, use the FileEdit tool.",
        errorCode: 2
      };
      if (editMode !== "replace" && editMode !== "insert" && editMode !== "delete") return {
        result: !1,
        message: "Edit mode must be replace, insert, or delete.",
        errorCode: 4
      };
      if (editMode === "insert" && !cellType) return {
        result: !1,
        message: "Cell type is required when using edit_mode=insert.",
        errorCode: 5
      };
      let readState = context.readFileState.get(resolvedPath);
      if (!readState) return {
        result: !1,
        message: "File has not been read yet. Read it first before writing to it.",
        errorCode: 9
      };
      if (Fyr()) try {
        let {
          mode: fileMode
        } = await Wt().stat(resolvedPath);
        if (wje(fileMode)) return {
          result: !1,
          message: vje,
          errorCode: 11
        };
      } catch (statErr) {
        if (!In(statErr)) throw statErr;
      }
      if (QX(resolvedPath) > readState.timestamp) return {
        result: !1,
        message: "File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.",
        errorCode: 10
      };
      let rawContent;
      try {
        rawContent = XX(resolvedPath).content;
      } catch (readErr) {
        if (In(readErr)) return {
          result: !1,
          message: "Notebook file does not exist.",
          errorCode: 1
        };
        throw readErr;
      }
      let notebook = ba(rawContent);
      if (!notebook) return {
        result: !1,
        message: "Notebook is not valid JSON.",
        errorCode: 6
      };
      if (!cellId) {
        if (editMode !== "insert") return {
          result: !1,
          message: "Cell ID must be specified when not inserting a new cell.",
          errorCode: 7
        };
      } else if (notebook.cells.findIndex(cell => cell.id === cellId) === -1) {
        let cellIndex = Q9t(cellId);
        if (cellIndex !== void 0) {
          if (!notebook.cells[cellIndex]) return {
            result: !1,
            message: `Cell with index ${cellIndex} does not exist in notebook.`,
            errorCode: 7
          };
        } else return {
          result: !1,
          message: `Cell with ID "${cellId}" not found in notebook.`,
          errorCode: 8
        };
      }
      return {
        result: !0
      };
    },
    async call({
      notebook_path: notebookPath,
      new_source: newSource,
      cell_id: cellId,
      cell_type: cellType,
      edit_mode: editMode
    }, {
      readFileState: readFileState,
      getFileHistoryState: getFileHistoryState,
      applyFileHistoryOp: applyFileHistoryOp
    }, _unused, callContext) {
      let resolvedPath = hs(notebookPath);
      if (TT()) await I0e(getFileHistoryState, applyFileHistoryOp, resolvedPath, callContext.uuid);
      try {
        return await zEe(resolvedPath, async () => {
          let {
              content: rawContent,
              encoding: encoding,
              lineEndings: lineEndings
            } = await wrs(resolvedPath),
            notebook;
          try {
            notebook = qt(rawContent);
          } catch {
            return {
              data: {
                new_source: newSource,
                cell_type: cellType ?? "code",
                language: "python",
                edit_mode: "replace",
                error: "Notebook is not valid JSON.",
                cell_id: cellId,
                notebook_path: resolvedPath,
                original_file: "",
                updated_file: ""
              }
            };
          }
          let targetIndex;
          if (!cellId) targetIndex = 0;else {
            if (targetIndex = notebook.cells.findIndex(cell => cell.id === cellId), targetIndex === -1) {
              let parsedIndex = Q9t(cellId);
              if (parsedIndex !== void 0) targetIndex = parsedIndex;
            }
            if (editMode === "insert") targetIndex += 1;
          }
          let effectiveMode = editMode;
          if (effectiveMode === "replace" && targetIndex === notebook.cells.length) {
            if (effectiveMode = "insert", !cellType) cellType = "code";
          }
          let language = notebook.metadata.language_info?.name ?? "python",
            newCellId = void 0;
          if (notebook.nbformat > 4 || notebook.nbformat === 4 && notebook.nbformat_minor >= 5) {
            if (effectiveMode === "insert") newCellId = t2a.randomUUID().slice(0, 8);else if (cellId !== null) newCellId = cellId;
          }
          if (effectiveMode === "delete") notebook.cells.splice(targetIndex, 1);else if (effectiveMode === "insert") {
            let newCell;
            if (cellType === "markdown") newCell = {
              cell_type: "markdown",
              id: newCellId,
              source: newSource,
              metadata: {}
            };else newCell = {
              cell_type: "code",
              id: newCellId,
              source: newSource,
              metadata: {},
              execution_count: null,
              outputs: []
            };
            notebook.cells.splice(targetIndex, 0, newCell);
          } else {
            let targetCell = notebook.cells[targetIndex];
            if (targetCell.source = newSource, targetCell.cell_type === "code") targetCell.execution_count = null, targetCell.outputs = [];
            if (cellType && cellType !== targetCell.cell_type) targetCell.cell_type = cellType;
          }
          let serialized = Pe(notebook, null, 1),
            writeTimestamp = await jEe(resolvedPath, serialized, encoding, lineEndings);
          return readFileState.set(resolvedPath, {
            content: serialized,
            timestamp: writeTimestamp,
            offset: void 0,
            limit: void 0
          }), {
            data: {
              new_source: newSource,
              cell_type: cellType ?? "code",
              language: language,
              edit_mode: effectiveMode ?? "replace",
              cell_id: newCellId || void 0,
              error: "",
              notebook_path: resolvedPath,
              original_file: rawContent,
              updated_file: serialized
            }
          };
        });
      } catch (callErr) {
        if (callErr instanceof Error) return {
          data: {
            new_source: newSource,
            cell_type: cellType ?? "code",
            language: "python",
            edit_mode: "replace",
            error: callErr.message,
            cell_id: cellId,
            notebook_path: resolvedPath,
            original_file: "",
            updated_file: ""
          }
        };
        return {
          data: {
            new_source: newSource,
            cell_type: cellType ?? "code",
            language: "python",
            edit_mode: "replace",
            error: "Unknown error occurred while editing notebook",
            cell_id: cellId,
            notebook_path: resolvedPath,
            original_file: "",
            updated_file: ""
          }
        };
      }
    }
  });
});

export {t2a,n2a,fHp,hHp,qq,edt};
