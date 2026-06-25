// @ts-nocheck
import {bT,Dw} from "./5176_encoding.ts";
import {dd,KN,Xl} from "../config/0651_maxBytes.ts";
import {q1,X0e} from "../../vendor/m3930.ts";
import {J$n,Yuo} from "../../vendor/m3928.ts";
import {Cd,lr} from "../../vendor/m233.ts";
import {J0e,Juo} from "../../vendor/m3929.ts";
import {fl,po} from "../tools/5224_userPromptCount.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {wC,initModelResolutionModule as iq} from "./3298_result.ts";
import {xBa,O$n} from "../../vendor/m3914.ts";
import {Nut,H$n,oce} from "../telemetry/3912_oldStart.ts";
import {Y9t,G0e,Fut,V0e} from "../../vendor/m3913.ts";
import {Jo,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Edit-tool rendering helpers (Claude Code 2.1.190).
 *
 * This module provides the `userFacingName`, `getToolUseSummary`,
 * `renderToolUseMessage`, `renderToolResultMessage`,
 * `renderToolUseRejectedMessage`, and `renderToolUseErrorMessage` callbacks
 * that are wired into the Edit tool descriptor. They turn an Edit-tool
 * input/result into the terminal UI elements shown to the user.
 *
 * NOTE: This is a 1:1 reverse-engineering. Only identifiers, types and
 * comments were added — control flow, operators (incl. `!0`/`!1`), string
 * literals and all cross-module references are preserved exactly. Cross-module
 * symbols (e.g. `bT`, `dd`, `nN`, `J0e`, `Y9t`) keep their original
 * (obfuscated) aliases because they are renamed in their own source modules.
 *
 * Cross-module symbol cheat-sheet (recovered meanings):
 *   bT()                         -> getPlansDirectory(): absolute plans dir path.
 *   dd(absolutePath)             -> formatDisplayPath: relative / "~"-prefixed path.
 *   Cd(text)                     -> firstLine: first display line of a string, or null.
 *   fl(text, tagName)            -> extractTagContent: inner text of <tag>…</tag>, or null.
 *   KN                           -> string fragment present in "file not found" tool errors.
 *   xBa(filePath, oldString, n)  -> readFileForDiff: load a file snippet around a match.
 *   Nut                          -> number of context lines used when loading the diff snippet.
 *   G0e(content, oldString)      -> findMatchingText: exact substring of `content` to replace.
 *   Fut(oldString, matched, new) -> alignNewString: adjust `newString` to matched text.
 *   Y9t({...})                   -> computeStructuredPatch: build a structured diff patch.
 *   H$n(hunks, offset)           -> offsetPatchHunks: shift hunk start lines by `offset`.
 *   Jo(err)                      -> isReportableError: true for an Error worth logging.
 *   A(message, opts)             -> log: structured logger.
 *   Ie(err)                      -> reportError: send an error to error reporting/telemetry.
 *   nN.jsx(type, props)          -> React-like runtime jsx().
 *   J0e                          -> FileOperationSummary: write/update operation summary.
 *   J$n                          -> StructuredDiff: renders a structured patch / diff preview.
 *   q1                           -> FilePathText: renders a file path label.
 *   wC                           -> ToolResultMessage: generic tool-result renderer.
 *   Yn                           -> Box: layout container component.
 *   v                            -> Text: styled text component.
 *   wTo.c(n)                     -> React-compiler memo-cache: returns an `n`-slot array.
 *   Lmt                          -> React hooks runtime (`useState`, `use`, `Suspense`).
 */

/** A single hunk of a structured diff patch. */
interface StructuredPatchHunk {
  oldStart: number;
  newStart: number;
  lines: string[];
}

/** Snapshot returned by `xBa` when loading a file for diffing. */
interface FileDiffSnapshot {
  content: string;
  truncated: boolean;
  /** 1-based line where the loaded snippet begins. */
  lineOffset: number;
}

/** Edit-tool input as seen by the renderers (single edit or multi-edit). */
interface EditToolInput {
  file_path?: string;
  old_string?: string;
  new_string?: string;
  replace_all?: boolean;
  /** Present for the multi-edit variant. */
  edits?: unknown[] | null;
}

/** Edit-tool result payload passed to the result renderer. */
interface EditToolResult {
  filePath?: string;
  structuredPatch?: StructuredPatchHunk[];
  originalFile?: string | null;
}

/** Render options shared by the renderers. */
interface RenderOptions {
  verbose: boolean;
  style?: unknown;
}

/** Resolved diff data produced by `d6p`/consumed by `u6p`. */
interface RejectionDiff {
  patch: StructuredPatchHunk[];
  firstLine: string | null;
  fileContent: string | undefined;
}

/**
 * `userFacingName` for the Edit tool: the short verb shown in the UI.
 * Returns "Updated plan" for files inside the plans directory, "Create" for a
 * brand-new file (empty `old_string`), and "Update" otherwise.
 */
function m8n(input: EditToolInput | null | undefined): string {
  if (!input) return "Update";
  if (input.file_path?.startsWith(bT())) return "Updated plan";
  if (input.edits != null) return "Update";
  if (input.old_string === "") return "Create";
  return "Update";
}

/**
 * `getToolUseSummary` for the Edit tool: a short display path for the edited
 * file, or null when no `file_path` is present.
 */
function kTo(input: EditToolInput | null | undefined): string | null {
  if (!input?.file_path) return null;
  return dd(input.file_path);
}

/**
 * `renderToolUseMessage` for the Edit tool: shows the file path being edited.
 * Files inside the plans directory render as empty (the plan UI handles them).
 */
function Xtl(
  { file_path: filePath }: { file_path?: string },
  { verbose }: { verbose: boolean },
): unknown {
  if (!filePath) return null;
  if (filePath.startsWith(bT())) return "";
  return nN.jsx(q1, {
    filePath,
    children: verbose ? filePath : dd(filePath),
  });
}

/**
 * `renderToolResultMessage` for the Edit tool: renders the structured diff of
 * the applied edit. For plan-directory files, surfaces a "/plan to preview" hint.
 */
function Qtl(
  {
    filePath = "",
    structuredPatch,
    originalFile,
  }: EditToolResult,
  _toolUseId: unknown,
  { style, verbose }: RenderOptions,
): unknown {
  if (!filePath) return null;
  let isPlanFile = filePath.startsWith(bT());
  return nN.jsx(J$n, {
    filePath,
    structuredPatch,
    firstLine: originalFile ? Cd(originalFile) : null,
    fileContent: originalFile || void 0,
    style,
    verbose,
    previewHint: isPlanFile ? "/plan to preview" : void 0,
  });
}

/**
 * `renderToolUseRejectedMessage` for the Edit tool: renders what *would* have
 * changed when the user rejects the edit. Branches by operation kind:
 * multi-edit (`edits`), create (empty `old_string`), or single replace.
 */
function Ztl(input: EditToolInput, options: RenderOptions): unknown {
  let { style, verbose } = options,
    filePath = input.file_path,
    oldString = input.old_string ?? "",
    newString = input.new_string ?? "",
    replaceAll = input.replace_all ?? !1;
  if ("edits" in input && input.edits != null) return nN.jsx(J0e, {
    file_path: filePath,
    operation: "update",
    firstLine: null,
    verbose,
  });
  if (oldString === "") return nN.jsx(J0e, {
    file_path: filePath,
    operation: "write",
    content: newString,
    firstLine: Cd(newString),
    verbose,
  });
  return nN.jsx(c6p, {
    filePath,
    oldString,
    newString,
    replaceAll,
    style,
    verbose,
  });
}

/**
 * `renderToolUseErrorMessage` for the Edit tool: maps known tool error strings
 * to friendly one-liners in non-verbose mode, otherwise defers to the generic
 * tool-result renderer.
 */
function enl(result: unknown, options: { verbose: boolean }): unknown {
  let { verbose } = options;
  if (!verbose && typeof result === "string" && fl(result, "tool_use_error")) {
    let errorText = fl(result, "tool_use_error");
    if (errorText?.includes("File has not been read yet")) return nN.jsx(Yn, {
      children: nN.jsx(v, {
        dimColor: !0,
        children: "File must be read first"
      })
    });
    if (errorText?.includes(KN)) return nN.jsx(Yn, {
      children: nN.jsx(v, {
        color: "error",
        children: "File not found"
      })
    });
    return nN.jsx(Yn, {
      children: nN.jsx(v, {
        color: "error",
        children: "Error editing file"
      })
    });
  }
  return nN.jsx(wC, {
    result,
    verbose,
  });
}

/**
 * Renders the rejected single-replace edit as a structured diff. Kicks off the
 * (async) diff computation and renders it under a Suspense boundary, falling
 * back to a bare update summary while it loads. Memoized via the React
 * compiler cache.
 */
function c6p(props: {
  filePath: string | undefined;
  oldString: string;
  newString: string;
  replaceAll: boolean;
  style: unknown;
  verbose: boolean;
}): unknown {
  let cache = wTo.c(16),
    {
      filePath,
      oldString,
      newString,
      replaceAll,
      style,
      verbose,
    } = props,
    makeDiffPromise: () => Promise<RejectionDiff>;
  if (cache[0] !== filePath || cache[1] !== newString || cache[2] !== oldString || cache[3] !== replaceAll) makeDiffPromise = () => d6p(filePath as string, oldString, newString, replaceAll), cache[0] = filePath, cache[1] = newString, cache[2] = oldString, cache[3] = replaceAll, cache[4] = makeDiffPromise; else makeDiffPromise = cache[4] as () => Promise<RejectionDiff>;
  let [diffPromise] = Lmt.useState(makeDiffPromise),
    fallback;
  if (cache[5] !== filePath || cache[6] !== verbose) fallback = nN.jsx(J0e, {
    file_path: filePath,
    operation: "update",
    firstLine: null,
    verbose,
  }), cache[5] = filePath, cache[6] = verbose, cache[7] = fallback; else fallback = cache[7];
  let diffElement;
  if (cache[8] !== diffPromise || cache[9] !== filePath || cache[10] !== style || cache[11] !== verbose) diffElement = nN.jsx(u6p, {
    promise: diffPromise,
    filePath,
    style,
    verbose,
  }), cache[8] = diffPromise, cache[9] = filePath, cache[10] = style, cache[11] = verbose, cache[12] = diffElement; else diffElement = cache[12];
  let suspenseBoundary;
  if (cache[13] !== fallback || cache[14] !== diffElement) suspenseBoundary = nN.jsx(Lmt.Suspense, {
    fallback,
    children: diffElement,
  }), cache[13] = fallback, cache[14] = diffElement, cache[15] = suspenseBoundary; else suspenseBoundary = cache[15];
  return suspenseBoundary;
}

/**
 * Inner component that suspends on the rejection-diff promise and renders the
 * resolved patch as a file update summary. Memoized via the React compiler cache.
 */
function u6p(props: {
  promise: Promise<RejectionDiff>;
  filePath: string | undefined;
  style: unknown;
  verbose: boolean;
}): unknown {
  let cache = wTo.c(7),
    {
      promise,
      filePath,
      style,
      verbose,
    } = props,
    {
      patch,
      firstLine,
      fileContent,
    } = Lmt.use(promise) as RejectionDiff,
    element;
  if (cache[0] !== fileContent || cache[1] !== filePath || cache[2] !== firstLine || cache[3] !== patch || cache[4] !== style || cache[5] !== verbose) element = nN.jsx(J0e, {
    file_path: filePath,
    operation: "update",
    patch,
    firstLine,
    fileContent,
    style,
    verbose,
  }), cache[0] = fileContent, cache[1] = filePath, cache[2] = firstLine, cache[3] = patch, cache[4] = style, cache[5] = verbose, cache[6] = element; else element = cache[6];
  return element;
}

/**
 * Computes the structured patch for a *rejected* single-replace edit so it can
 * be previewed. Loads the current file snapshot, finds the actual matching text,
 * aligns the new string to it, builds the patch and offsets its hunks to match
 * the loaded snippet. Falls back to a best-effort patch (or an empty one on error).
 */
async function d6p(
  filePath: string,
  oldString: string,
  newString: string,
  replaceAll: boolean,
): Promise<RejectionDiff> {
  try {
    let snapshot = await xBa(filePath, oldString, Nut);
    if (snapshot === null || snapshot.truncated || snapshot.content === "") {
      let {
        patch,
      } = Y9t({
        filePath,
        fileContents: oldString,
        oldString: oldString,
        newString: newString,
      });
      return {
        patch,
        firstLine: null,
        fileContent: void 0,
      };
    }
    let matchedText = G0e(snapshot.content, oldString) || oldString,
      alignedNewString = Fut(oldString, matchedText, newString),
      {
        patch,
      } = Y9t({
        filePath,
        fileContents: snapshot.content,
        oldString: matchedText,
        newString: alignedNewString,
        replaceAll,
      });
    return {
      patch: H$n(patch, snapshot.lineOffset - 1),
      firstLine: snapshot.lineOffset === 1 ? Cd(snapshot.content) : null,
      fileContent: snapshot.content,
    };
  } catch (err) {
    if (Jo(err)) A(`Failed to load rejection diff for ${filePath}: ${err.message}`, {
      level: "error"
    }); else Ie(err);
    return {
      patch: [],
      firstLine: null,
      fileContent: void 0,
    };
  }
}

// ---------------------------------------------------------------------------
// Lazy module initialization (binds the runtime/component aliases).
// ---------------------------------------------------------------------------

var wTo: { c(slotCount: number): unknown[] },
  Lmt: {
    useState<S>(initial: S | (() => S)): [S, (next: S) => void];
    use<T>(promise: Promise<T>): T;
    Suspense: unknown;
  },
  nN: { jsx(type: unknown, props: unknown): unknown };
var HTo = b(() => {
  Juo();
  Pl();
  po();
  iq();
  Yuo();
  X0e();
  je();
  qe();
  oce();
  Ct();
  Xl();
  vn();
  Dw();
  O$n();
  lr();
  V0e();
  wTo = x(tt(), 1), Lmt = x(et(), 1), nN = x(oe(), 1);
});

export {m8n,kTo,Xtl,Qtl,Ztl,enl,c6p,u6p,d6p,wTo,Lmt,nN,HTo};
