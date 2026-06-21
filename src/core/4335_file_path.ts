// @ts-nocheck
import {xT as wj,yx as tW} from "./5144_encoding.ts";
import {Id as v3,CB as XS,mc as G1} from "../config/0645_maxBytes.ts";
import {initRN as fE,uIe as nZH} from "../../vendor/m3974.ts";
import {s$n as Ev6,$lo as h_q} from "../../vendor/m4061.ts";
import {zd as n5,dr as P8} from "../../vendor/m231.ts";
import {IIe as lZH,qlo as k_q} from "../../vendor/m4062.ts";
import {Dl as y4,lo as zq} from "../tools/5190_userPromptCount.ts";
import {Gn as d6,sc as l4} from "../../vendor/m2455.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {wC as _X,jq as OB} from "../tui/3282_result.tsx";
import {EUa as f0K,j2n as $v6} from "../../vendor/m4048.ts";
import {jct as l7_,B2n as qv6,vce as A4H} from "../telemetry/4046_oldStart.ts";
import {L$t as tS_,vIe as BZH,Wct as n7_,wIe as UZH} from "../../vendor/m4047.ts";
import {ds as $7,bt as L_} from "../../vendor/m195.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Edit-tool rendering helpers (Claude Code 2.1.177).
 *
 * This module provides the `userFacingName`, `getToolUseSummary`,
 * `renderToolUseMessage`, `renderToolResultMessage`,
 * `renderToolUseRejectedMessage`, and `renderToolUseErrorMessage` callbacks
 * that are wired into the Edit tool descriptor (see `tools/4309_content.ts`,
 * the `TM` tool object). They turn an Edit-tool input/result into the
 * terminal UI elements shown to the user.
 *
 * NOTE: This is a 1:1 reverse-engineering. Only identifiers, types and
 * comments were added — control flow, operators (incl. `!0`/`!1`), string
 * literals and all cross-module references are preserved exactly. Cross-module
 * symbols imported through the `W1q` lazy initializer keep their original
 * (obfuscated) aliases because they are renamed in their own source modules.
 */

// ---------------------------------------------------------------------------
// Cross-module imports (resolved aliases, kept verbatim).
// Each comment records the recovered meaning of the obfuscated symbol.
// ---------------------------------------------------------------------------

// kw  -> React-like runtime (`createElement`, `Suspense`). Bound in W1q below.
// x1_ -> React hooks runtime (`useState`, `use`). Bound in W1q below.
// X1q -> React-compiler memo-cache runtime (provides `.c(n)`). Bound in W1q below.
// (These three are declared with `var` near the bottom, matching the original.)

// wj()  -> getPlansDirectory(): absolute path to the on-disk plans directory.
declare function wj(): string;
// v3(absolutePath) -> formatDisplayPath: relative path, or "~"-prefixed home
//                     path, or the original path (for UI display).
declare function v3(path: string): string;
// n5(text) -> firstLine: the first (display) line of a string, or null.
declare function n5(text: string): string | null;
// qv6(hunks, offset) -> offsetPatchHunks: shift hunk start lines by `offset`.
declare function qv6(hunks: StructuredPatchHunk[], offset: number): StructuredPatchHunk[];
// y4(text, tagName) -> extractTagContent: inner text of an <tag>…</tag>, or null.
declare function y4(text: string, tagName: string): string | null;
// XS -> string fragment present in "file not found" tool errors. (FIXME: unverified name)
declare const XS: string;

// f0K(filePath, oldString, contextLines) -> readFileForDiff: load a file
// snippet around a match; returns content, line offset, and truncation flag.
declare function f0K(
  filePath: string,
  oldString: string,
  contextLines: number,
): Promise<FileDiffSnapshot | null>;
// l7_ -> number of context lines used when loading the diff snippet.
declare const l7_: number;
// BZH(content, oldString) -> findMatchingText: the exact substring of `content`
// that should be replaced (handles escape/normalization), or null.
declare function BZH(content: string, oldString: string): string | null;
// n7_(oldString, matchedText, newString) -> alignNewString: adjust `newString`
// to the actually-matched text so the replacement stays consistent.
declare function n7_(oldString: string, matchedText: string, newString: string): string;
// tS_({...}) -> computeStructuredPatch: build a structured diff patch.
declare function tS_(args: {
  filePath: string;
  fileContents: string;
  oldString: string;
  newString: string;
  replaceAll?: boolean;
}): { patch: StructuredPatchHunk[] };

// $7(err) -> isReportableError: true for an Error whose message should be logged.
declare function $7(err: unknown): err is Error;
// N(message, opts) -> log: structured logger.
declare function N(message: string, opts: { level: "error" | "warn" | "info" }): void;
// EH(err) -> reportError: send an error to error reporting/telemetry.
declare function EH(err: unknown): void;

// UI components (Ink/React) imported via W1q:
// fE   -> FilePathText: renders a file path label.
declare const fE: unknown;
// Ev6  -> StructuredDiff: renders a structured patch / diff preview.
declare const Ev6: unknown;
// lZH  -> FileOperationSummary: renders a write/update operation summary.
declare const lZH: unknown;
// _X   -> ToolResultMessage: generic tool-result renderer.
declare const _X: unknown;
// d6   -> Box: layout container component.
declare const d6: unknown;
// V    -> Text: styled text component.
declare const V: unknown;

// L(initFactory) -> lazy ESM init wrapper; u()/__()/WH() -> interop helpers.
declare function L<T>(init: () => T): T;
declare function u<T>(mod: T, interop: number): T;
declare function __(): unknown;
declare function WH(): unknown;

// ---------------------------------------------------------------------------
// Local type aliases inferred from usage.
// ---------------------------------------------------------------------------

/** A single hunk of a structured diff patch. */
interface StructuredPatchHunk {
  oldStart: number;
  newStart: number;
  lines: string[];
}

/** Snapshot returned by `f0K` when loading a file for diffing. */
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

/** Resolved diff data produced by `sGO`/consumed by `aGO`. */
interface RejectionDiff {
  patch: StructuredPatchHunk[];
  firstLine: string | null;
  fileContent: string | undefined;
}

/**
 * Minimal shape of the React-like runtime used here. The component args are
 * opaque (ambient UI imports), so `createElement` is intentionally permissive.
 */
interface ReactRuntime {
  createElement(type: unknown, props: unknown, ...children: unknown[]): unknown;
  Suspense: unknown;
  useState<S>(initial: S | (() => S)): [S, (next: S) => void];
  use<T>(promise: Promise<T>): T;
}

// ---------------------------------------------------------------------------
// Edit-tool descriptor callbacks.
// ---------------------------------------------------------------------------

/**
 * `userFacingName` for the Edit tool: the short verb shown in the UI.
 * Returns "Updated plan" for files inside the plans directory, "Create" for a
 * brand-new file (empty `old_string`), and "Update" otherwise.
 */
function jx6(input: EditToolInput | null | undefined): string {
  if (!input) return "Update";
  if (input.file_path?.startsWith(wj())) return "Updated plan";
  if (input.edits != null) return "Update";
  if (input.old_string === "") return "Create";
  return "Update";
}

/**
 * `getToolUseSummary` for the Edit tool: a short display path for the edited
 * file, or null when no `file_path` is present.
 */
function P1q(input: EditToolInput | null | undefined): string | null {
  if (!input?.file_path) return null;
  return v3(input.file_path);
}

/**
 * `renderToolUseMessage` for the Edit tool: shows the file path being edited.
 * Files inside the plans directory render as empty (the plan UI handles them).
 */
function cgK(
  { file_path: filePath }: { file_path?: string },
  { verbose }: { verbose: boolean },
): unknown {
  if (!filePath) return null;
  if (filePath.startsWith(wj())) return "";
  return kw.createElement(
    fE,
    { filePath },
    verbose ? filePath : v3(filePath),
  );
}

/**
 * `renderToolResultMessage` for the Edit tool: renders the structured diff of
 * the applied edit. For plan-directory files, surfaces a "/plan to preview" hint.
 */
function dgK(
  {
    filePath = "",
    structuredPatch,
    originalFile,
  }: EditToolResult,
  _toolUseId: unknown,
  { style, verbose }: RenderOptions,
): unknown {
  if (!filePath) return null;
  let isPlanFile = filePath.startsWith(wj());
  return kw.createElement(Ev6, {
    filePath,
    structuredPatch,
    firstLine: originalFile ? n5(originalFile) : null,
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
function lgK(input: EditToolInput, options: RenderOptions): unknown {
  let { style, verbose } = options,
    filePath = input.file_path,
    oldString = input.old_string ?? "",
    newString = input.new_string ?? "",
    replaceAll = input.replace_all ?? !1;
  if ("edits" in input && input.edits != null)
    return kw.createElement(lZH, {
      file_path: filePath,
      operation: "update",
      firstLine: null,
      verbose,
    });
  if (oldString === "")
    return kw.createElement(lZH, {
      file_path: filePath,
      operation: "write",
      content: newString,
      firstLine: n5(newString),
      verbose,
    });
  return kw.createElement(oGO, {
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
function ngK(result: unknown, options: { verbose: boolean }): unknown {
  let { verbose } = options;
  if (!verbose && typeof result === "string" && y4(result, "tool_use_error")) {
    let errorText = y4(result, "tool_use_error");
    if (errorText?.includes("File has not been read yet"))
      return kw.createElement(
        d6,
        null,
        kw.createElement(V, { dimColor: !0 }, "File must be read first"),
      );
    if (errorText?.includes(XS))
      return kw.createElement(
        d6,
        null,
        kw.createElement(V, { color: "error" }, "File not found"),
      );
    return kw.createElement(
      d6,
      null,
      kw.createElement(V, { color: "error" }, "Error editing file"),
    );
  }
  return kw.createElement(_X, {
    result,
    verbose,
  });
}

// ---------------------------------------------------------------------------
// Rejection-diff rendering (suspense-based, computes the diff lazily).
// ---------------------------------------------------------------------------

/**
 * Renders the rejected single-replace edit as a structured diff. Kicks off the
 * (async) diff computation and renders it under a Suspense boundary, falling
 * back to a bare update summary while it loads. Memoized via the React
 * compiler cache.
 */
function oGO(props: {
  filePath: string | undefined;
  oldString: string;
  newString: string;
  replaceAll: boolean;
  style: unknown;
  verbose: boolean;
}): unknown {
  let cache = X1q.c(16),
    {
      filePath,
      oldString,
      newString,
      replaceAll,
      style,
      verbose,
    } = props,
    makeDiffPromise: () => Promise<RejectionDiff>;
  if (
    cache[0] !== filePath ||
    cache[1] !== newString ||
    cache[2] !== oldString ||
    cache[3] !== replaceAll
  )
    (makeDiffPromise = () => sGO(filePath as string, oldString, newString, replaceAll)),
      (cache[0] = filePath),
      (cache[1] = newString),
      (cache[2] = oldString),
      (cache[3] = replaceAll),
      (cache[4] = makeDiffPromise);
  else makeDiffPromise = cache[4] as () => Promise<RejectionDiff>;
  let [diffPromise] = x1_.useState(makeDiffPromise),
    fallback;
  if (cache[5] !== filePath || cache[6] !== verbose)
    (fallback = kw.createElement(lZH, {
      file_path: filePath,
      operation: "update",
      firstLine: null,
      verbose,
    })),
      (cache[5] = filePath),
      (cache[6] = verbose),
      (cache[7] = fallback);
  else fallback = cache[7];
  let diffElement;
  if (
    cache[8] !== diffPromise ||
    cache[9] !== filePath ||
    cache[10] !== style ||
    cache[11] !== verbose
  )
    (diffElement = kw.createElement(aGO, {
      promise: diffPromise,
      filePath,
      style,
      verbose,
    })),
      (cache[8] = diffPromise),
      (cache[9] = filePath),
      (cache[10] = style),
      (cache[11] = verbose),
      (cache[12] = diffElement);
  else diffElement = cache[12];
  let suspenseBoundary;
  if (cache[13] !== fallback || cache[14] !== diffElement)
    (suspenseBoundary = kw.createElement(
      x1_.Suspense,
      { fallback },
      diffElement,
    )),
      (cache[13] = fallback),
      (cache[14] = diffElement),
      (cache[15] = suspenseBoundary);
  else suspenseBoundary = cache[15];
  return suspenseBoundary;
}

/**
 * Inner component that suspends on the rejection-diff promise and renders the
 * resolved patch as a file update summary. Memoized via the React compiler cache.
 */
function aGO(props: {
  promise: Promise<RejectionDiff>;
  filePath: string | undefined;
  style: unknown;
  verbose: boolean;
}): unknown {
  let cache = X1q.c(7),
    { promise, filePath, style, verbose } = props,
    { patch, firstLine, fileContent } = x1_.use(promise) as RejectionDiff,
    element;
  if (
    cache[0] !== fileContent ||
    cache[1] !== filePath ||
    cache[2] !== firstLine ||
    cache[3] !== patch ||
    cache[4] !== style ||
    cache[5] !== verbose
  )
    (element = kw.createElement(lZH, {
      file_path: filePath,
      operation: "update",
      patch,
      firstLine,
      fileContent,
      style,
      verbose,
    })),
      (cache[0] = fileContent),
      (cache[1] = filePath),
      (cache[2] = firstLine),
      (cache[3] = patch),
      (cache[4] = style),
      (cache[5] = verbose),
      (cache[6] = element);
  else element = cache[6];
  return element;
}

/**
 * Computes the structured patch for a *rejected* single-replace edit so it can
 * be previewed. Loads the current file snapshot, finds the actual matching text,
 * aligns the new string to it, builds the patch and offsets its hunks to match
 * the loaded snippet. Falls back to a best-effort patch (or an empty one on error).
 */
async function sGO(
  filePath: string,
  oldString: string,
  newString: string,
  replaceAll: boolean,
): Promise<RejectionDiff> {
  try {
    let snapshot = await f0K(filePath, oldString, l7_);
    if (snapshot === null || snapshot.truncated || snapshot.content === "") {
      let { patch } = tS_({
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
    let matchedText = BZH(snapshot.content, oldString) || oldString,
      alignedNewString = n7_(oldString, matchedText, newString),
      { patch } = tS_({
        filePath,
        fileContents: snapshot.content,
        oldString: matchedText,
        newString: alignedNewString,
        replaceAll,
      });
    return {
      patch: qv6(patch, snapshot.lineOffset - 1),
      firstLine: snapshot.lineOffset === 1 ? n5(snapshot.content) : null,
      fileContent: snapshot.content,
    };
  } catch (err) {
    if ($7(err))
      N(`Failed to load rejection diff for ${filePath}: ${err.message}`, {
        level: "error",
      });
    else EH(err);
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

var X1q: { c(slotCount: number): unknown[] },
  kw: ReactRuntime,
  x1_: ReactRuntime;
var W1q = L(() => {
  k_q();
  l4();
  zq();
  OB();
  h_q();
  nZH();
  nH();
  FH();
  A4H();
  L_();
  G1();
  S6();
  tW();
  $v6();
  P8();
  UZH();
  (X1q = u(__(), 1) as { c(slotCount: number): unknown[] }),
    (kw = u(WH(), 1) as ReactRuntime),
    (x1_ = u(WH(), 1) as ReactRuntime);
});

// Module-init dependency thunks (resolved lazily by L()); kept as-is.
declare function k_q(): void;
declare function l4(): void;
declare function zq(): void;
declare function OB(): void;
declare function h_q(): void;
declare function nZH(): void;
declare function nH(): void;
declare function FH(): void;
declare function A4H(): void;
declare function L_(): void;
declare function G1(): void;
declare function S6(): void;
declare function tW(): void;
declare function $v6(): void;
declare function P8(): void;
declare function UZH(): void;

export {jx6 as J4n,P1q as Dfo,cgK as xYa,dgK as kYa,lgK as HYa,ngK as IYa,oGO as xBp,aGO as kBp,sGO as HBp,X1q as Ifo,kw as P_,x1_ as Mdt,W1q as Pfo};
