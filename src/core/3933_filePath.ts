// @ts-nocheck
import {o2e,C4r} from "../../vendor/m2361.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {xB,j0e} from "../../vendor/m3918.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {FO,uj} from "../../vendor/m2812.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {bT,Dw} from "./5176_encoding.ts";
import {_Ua,yUa} from "../../vendor/m3931.ts";
import {dd,Xl} from "../config/0651_maxBytes.ts";
import {q1,X0e} from "../../vendor/m3930.ts";
import {Cd,lr} from "../../vendor/m233.ts";
import {J0e,Juo} from "../../vendor/m3929.ts";
import {J9t,P$n,O$n} from "../../vendor/m3914.ts";
import {pG,oce} from "../telemetry/3912_oldStart.ts";
import {sp,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {fl,po} from "../tools/5224_userPromptCount.ts";
import {wC,initModelResolutionModule as iq} from "./3298_result.ts";
import {J$n,Yuo} from "../../vendor/m3928.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// Write-tool result rendering: counts lines, builds the "Wrote N lines to <path>"
// preview, and renders create/update diffs for the file_path content.

/** Count the number of lines in `text`, ignoring a single trailing newline. */
function TUa(text: string): number {
  let lines = text.split(zut);
  return text.endsWith(zut) ? lines.length - 1 : lines.length;
}

/** Measure rendered height of `text` at column `width`, minus a trailing newline. */
function jkp(text: string, width: number): number {
  let height = o2e(text, width).height;
  return text.endsWith(zut) ? height - 1 : height;
}

/** Full create-preview component: shows the file header and a code excerpt. */
function Ykp(props: { filePath: string; content: string; verbose: boolean }) {
  let $memo = X$n.c(31),
    {
      filePath: filePath,
      content: content,
      verbose: verbose
    } = props,
    {
      columns: columns
    } = _r(),
    width = Math.max(1, columns - 12),
    displayContent = content || "(No content)",
    lineCount;
  if ($memo[0] !== content) lineCount = TUa(content), $memo[0] = content, $memo[1] = lineCount;else lineCount = $memo[1];
  let totalLines = lineCount,
    previewText;
  if ($memo[2] !== displayContent || $memo[3] !== width || $memo[4] !== verbose) previewText = verbose ? displayContent : displayContent.split(zut).slice(0, Kut).join(zut).slice(0, Kut * (width + 1)), $memo[2] = displayContent, $memo[3] = width, $memo[4] = verbose, $memo[5] = previewText;else previewText = $memo[5];
  let preview = previewText,
    hiddenLineCount = verbose ? 0 : jkp(displayContent, width) - Kut,
    lineCountEl;
  if ($memo[6] !== totalLines) lineCountEl = mb.jsx(v, {
    bold: !0,
    children: totalLines
  }), $memo[6] = totalLines, $memo[7] = lineCountEl;else lineCountEl = $memo[7];
  let relativePath;
  if ($memo[8] !== filePath || $memo[9] !== verbose) relativePath = verbose ? filePath : e6e.relative(Lt(), filePath), $memo[8] = filePath, $memo[9] = verbose, $memo[10] = relativePath;else relativePath = $memo[10];
  let pathEl;
  if ($memo[11] !== relativePath) pathEl = mb.jsx(v, {
    bold: !0,
    children: relativePath
  }), $memo[11] = relativePath, $memo[12] = pathEl;else pathEl = $memo[12];
  let headerEl;
  if ($memo[13] !== lineCountEl || $memo[14] !== pathEl) headerEl = mb.jsxs(v, {
    children: ["Wrote ", lineCountEl, " lines to", " ", pathEl]
  }), $memo[13] = lineCountEl, $memo[14] = pathEl, $memo[15] = headerEl;else headerEl = $memo[15];
  let overflowY = verbose ? void 0 : "hidden",
    maxHeight = verbose ? void 0 : Kut,
    codeEl;
  if ($memo[16] !== preview || $memo[17] !== filePath || $memo[18] !== width) codeEl = mb.jsx(xB, {
    code: preview,
    filePath: filePath,
    width: width
  }), $memo[16] = preview, $memo[17] = filePath, $memo[18] = width, $memo[19] = codeEl;else codeEl = $memo[19];
  let codeBoxEl;
  if ($memo[20] !== overflowY || $memo[21] !== maxHeight || $memo[22] !== codeEl) codeBoxEl = mb.jsx($, {
    flexDirection: "column",
    overflowY: overflowY,
    maxHeight: maxHeight,
    children: codeEl
  }), $memo[20] = overflowY, $memo[21] = maxHeight, $memo[22] = codeEl, $memo[23] = codeBoxEl;else codeBoxEl = $memo[23];
  let hiddenLinesEl;
  if ($memo[24] !== hiddenLineCount || $memo[25] !== verbose) hiddenLinesEl = !verbose && mb.jsx(FO, {
    count: hiddenLineCount,
    expandable: !0
  }), $memo[24] = hiddenLineCount, $memo[25] = verbose, $memo[26] = hiddenLinesEl;else hiddenLinesEl = $memo[26];
  let result;
  if ($memo[27] !== codeBoxEl || $memo[28] !== hiddenLinesEl || $memo[29] !== headerEl) result = mb.jsx(Yn, {
    children: mb.jsxs($, {
      flexDirection: "column",
      children: [headerEl, codeBoxEl, hiddenLinesEl]
    })
  }), $memo[27] = codeBoxEl, $memo[28] = hiddenLinesEl, $memo[29] = headerEl, $memo[30] = result;else result = $memo[30];
  return result;
}

/** Short tool-call label: "Updated plan" for the plan file, else "Write". */
function SUa(input?: { file_path?: string }): string {
  if (input?.file_path?.startsWith(bT())) return "Updated plan";
  return "Write";
}

/** Whether a create result should render in condensed form for the given width. */
function bUa({
  type: type,
  content: content
}: { type: string; content: unknown }, {
  columns: columns
}: { columns: number }) {
  if (type !== "create") return !1;
  if (typeof content !== "string") return !1;
  let extraLines = content.endsWith(zut) ? Kut + 1 : Kut;
  return _Ua(content, Math.max(1, columns - 12), extraLines);
}

/** Pretty file name for the tool message, or null when no file_path. */
function Xuo(input?: { file_path?: string }) {
  if (!input?.file_path) return null;
  return dd(input.file_path);
}

/** Render the file-path link/label for a tool message header. */
function EUa(input: { file_path?: string }, {
  verbose: verbose
}: { verbose: boolean }) {
  if (!input.file_path) return null;
  if (input.file_path.startsWith(bT())) return "";
  return mb.jsx(q1, {
    filePath: input.file_path,
    children: verbose ? input.file_path : dd(input.file_path)
  });
}

/** Entry point: render the write preview (resolves create vs update). */
function CUa({
  file_path: file_path,
  content: content
}: { file_path: string; content: string }, {
  style: style,
  verbose: verbose
}: { style: unknown; verbose: boolean }) {
  return mb.jsx(Jkp, {
    filePath: file_path,
    content: content,
    style: style,
    verbose: verbose
  });
}

/** Suspense wrapper that loads the rejection diff and chooses create/update view. */
function Jkp(props: { filePath: string; content: string; style: unknown; verbose: boolean }) {
  let $memo = X$n.c(20),
    {
      filePath: filePath,
      content: content,
      style: style,
      verbose: verbose
    } = props,
    diffFactory;
  if ($memo[0] !== content || $memo[1] !== filePath) diffFactory = () => Qkp(filePath, content), $memo[0] = content, $memo[1] = filePath, $memo[2] = diffFactory;else diffFactory = $memo[2];
  let [diffPromise] = jut.useState(diffFactory),
    firstLineValue;
  if ($memo[3] !== content) firstLineValue = Cd(content), $memo[3] = content, $memo[4] = firstLineValue;else firstLineValue = $memo[4];
  let firstLine = firstLineValue,
    fallbackValue;
  if ($memo[5] !== content || $memo[6] !== filePath || $memo[7] !== firstLine || $memo[8] !== verbose) fallbackValue = mb.jsx(J0e, {
    file_path: filePath,
    operation: "write",
    content: content,
    firstLine: firstLine,
    verbose: verbose
  }), $memo[5] = content, $memo[6] = filePath, $memo[7] = firstLine, $memo[8] = verbose, $memo[9] = fallbackValue;else fallbackValue = $memo[9];
  let createFallback = fallbackValue,
    resolvedEl;
  if ($memo[10] !== createFallback || $memo[11] !== diffPromise || $memo[12] !== filePath || $memo[13] !== firstLine || $memo[14] !== style || $memo[15] !== verbose) resolvedEl = mb.jsx(Xkp, {
    promise: diffPromise,
    filePath: filePath,
    firstLine: firstLine,
    createFallback: createFallback,
    style: style,
    verbose: verbose
  }), $memo[10] = createFallback, $memo[11] = diffPromise, $memo[12] = filePath, $memo[13] = firstLine, $memo[14] = style, $memo[15] = verbose, $memo[16] = resolvedEl;else resolvedEl = $memo[16];
  let suspenseEl;
  if ($memo[17] !== createFallback || $memo[18] !== resolvedEl) suspenseEl = mb.jsx(jut.Suspense, {
    fallback: createFallback,
    children: resolvedEl
  }), $memo[17] = createFallback, $memo[18] = resolvedEl, $memo[19] = suspenseEl;else suspenseEl = $memo[19];
  return suspenseEl;
}

/** Reads the resolved diff and renders create/error/update view accordingly. */
function Xkp(props: {
  promise: Promise<any>;
  filePath: string;
  firstLine: unknown;
  createFallback: unknown;
  style: unknown;
  verbose: boolean;
}) {
  let $memo = X$n.c(8),
    {
      promise: promise,
      filePath: filePath,
      firstLine: firstLine,
      createFallback: createFallback,
      style: style,
      verbose: verbose
    } = props,
    diff = jut.use(promise);
  if (diff.type === "create") return createFallback;
  if (diff.type === "error") {
    let noChangesEl;
    if ($memo[0] === Symbol.for("react.memo_cache_sentinel")) noChangesEl = mb.jsx(Yn, {
      children: mb.jsx(v, {
        children: "(No changes)"
      })
    }), $memo[0] = noChangesEl;else noChangesEl = $memo[0];
    return noChangesEl;
  }
  let updateEl;
  if ($memo[1] !== diff.oldContent || $memo[2] !== diff.patch || $memo[3] !== filePath || $memo[4] !== firstLine || $memo[5] !== style || $memo[6] !== verbose) updateEl = mb.jsx(J0e, {
    file_path: filePath,
    operation: "update",
    patch: diff.patch,
    firstLine: firstLine,
    fileContent: diff.oldContent,
    style: style,
    verbose: verbose
  }), $memo[1] = diff.oldContent, $memo[2] = diff.patch, $memo[3] = filePath, $memo[4] = firstLine, $memo[5] = style, $memo[6] = verbose, $memo[7] = updateEl;else updateEl = $memo[7];
  return updateEl;
}

/** Compute the create-vs-update diff for `filePath` against the new `content`. */
async function Qkp(filePath: string, content: string) {
  try {
    let absolutePath = e6e.isAbsolute(filePath) ? filePath : e6e.resolve(Lt(), filePath),
      handle = await J9t(absolutePath);
    if (handle === null) return {
      type: "create"
    };
    let oldContent;
    try {
      oldContent = await P$n(handle);
    } finally {
      await handle.close();
    }
    if (oldContent === null) return {
      type: "create"
    };
    return {
      type: "update",
      patch: pG({
        filePath: filePath,
        fileContents: oldContent,
        edits: [{
          old_string: oldContent,
          new_string: content,
          replace_all: !1
        }]
      }),
      oldContent: oldContent
    };
  } catch (err) {
    if (sp(err)) A(`Failed to load rejection diff for ${filePath}: ${err.message}`, {
      level: "error"
    });else Ie(err);
    return {
      type: "error"
    };
  }
}

/** Render a tool error or the generic result for the write tool output. */
function AUa(result: unknown, {
  verbose: verbose
}: { verbose: boolean }) {
  if (!verbose && typeof result === "string" && fl(result, "tool_use_error")) return mb.jsx(Yn, {
    children: mb.jsx(v, {
      color: "error",
      children: "Error writing file"
    })
  });
  return mb.jsx(wC, {
    result: result,
    verbose: verbose
  });
}

/** Render a completed write/update result with patch or condensed line summary. */
function RUa({
  filePath: filePath = "",
  content: content,
  structuredPatch: structuredPatch,
  type: type,
  originalFile: originalFile
}: {
  filePath?: string;
  content?: string;
  structuredPatch?: unknown;
  type?: string;
  originalFile?: string;
}, _unused: unknown, {
  style: style,
  verbose: verbose
}: { style: unknown; verbose: boolean }) {
  if (!filePath) return null;
  switch (type) {
    case "create":
      {
        if (filePath.startsWith(bT()) && !verbose) {
          if (style !== "condensed") return mb.jsx(Yn, {
            children: mb.jsx(v, {
              dimColor: !0,
              children: "/plan to preview"
            })
          });
        } else if (style === "condensed" && !verbose) {
          let lineCount = TUa(content);
          return mb.jsxs(v, {
            children: ["Wrote ", mb.jsx(v, {
              bold: !0,
              children: lineCount
            }), " lines to", " ", mb.jsx(v, {
              bold: !0,
              children: e6e.relative(Lt(), filePath)
            })]
          });
        }
        return mb.jsx(Ykp, {
          filePath: filePath,
          content: content,
          verbose: verbose
        });
      }
    case "update":
      {
        let isPlanFile = filePath.startsWith(bT());
        return mb.jsx(J$n, {
          filePath: filePath,
          structuredPatch: structuredPatch,
          firstLine: Cd(content),
          fileContent: originalFile ?? void 0,
          style: style,
          verbose: verbose,
          previewHint: isPlanFile ? "/plan to preview" : void 0
        });
      }
  }
}
var X$n,
  e6e,
  jut,
  mb,
  Kut = 10,
  zut = `
`;
var vUa = b(() => {
  Pl();
  po();
  uj();
  iq();
  Yuo();
  Juo();
  X0e();
  j0e();
  ui();
  yUa();
  C4r();
  je();
  Po();
  qe();
  oce();
  Ct();
  Xl();
  vn();
  Dw();
  O$n();
  lr();
  X$n = x(tt(), 1), e6e = require("path"), jut = x(et(), 1), mb = x(oe(), 1);
});

export {TUa,jkp,Ykp,SUa,bUa,Xuo,EUa,CUa,Jkp,Xkp,Qkp,AUa,RUa,X$n,e6e,jut,mb,Kut,zut,vUa};
