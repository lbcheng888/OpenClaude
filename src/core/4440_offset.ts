// @ts-nocheck
import {$it,wE} from "../../vendor/m5177.ts";
import {dd,KN,Xl} from "../config/0651_maxBytes.ts";
import {q1,X0e} from "../../vendor/m3930.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {formatFileSize as Ra,Xo} from "../../vendor/m240.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {fl,po} from "../tools/5224_userPromptCount.ts";
import {wC,initModelResolutionModule as iq} from "./3298_result.ts";
import {bT,Dw} from "./5176_encoding.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Read tool — input normalization and result rendering.
 *
 * This module handles the `Read` tool's input shape coercion (offset/limit/length
 * variants), agent-output path detection, and the various JSX result renderers
 * (text / image / pdf / notebook / parts / file_unchanged).
 */

/** True when `value` is a plain (non-array) object. */
function EKp(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Coerce a value to a finite integer when possible.
 * Accepts numbers (must be finite) and integer-looking strings.
 * Returns `undefined` when not coercible.
 */
function nEo(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : void 0;
  if (typeof value === "string" && /^[-+]?\d+$/.test(value.trim())) return Number(value);
  return;
}

/**
 * Normalize loose / malformed Read tool inputs into a canonical shape.
 *
 * Repairs single-element `offset`/`limit` arrays, drops negative offsets and
 * non-positive limits, and promotes a legacy `length` field into `limit`.
 * Returns the repaired input together with a comma-joined description of which
 * repairs were applied, or `null` when no repair was needed (or input isn't an object).
 */
function Eal(rawInput: unknown): { input: Record<string, unknown>; shapeClass: string } | null {
  if (!EKp(rawInput)) return null;
  let normalized: Record<string, any> = {
      ...rawInput
    },
    appliedRepairs: string[] = [];
  if (Array.isArray(normalized.offset) && normalized.offset.length === 1) normalized.offset = normalized.offset[0], appliedRepairs.push("offset_array");
  if (Array.isArray(normalized.limit) && normalized.limit.length === 1) normalized.limit = normalized.limit[0], appliedRepairs.push("limit_array");
  let offsetValue = nEo(normalized.offset);
  if (offsetValue !== void 0 && offsetValue < 0) delete normalized.offset, appliedRepairs.push("offset_neg");
  let limitValue = nEo(normalized.limit);
  if (limitValue !== void 0 && limitValue <= 0) delete normalized.limit, appliedRepairs.push("limit_dropped");
  if ("length" in normalized) {
    let lengthValue = nEo(normalized.length);
    if (!("limit" in normalized) && lengthValue !== void 0 && lengthValue > 0) normalized.limit = lengthValue;
    delete normalized.length, appliedRepairs.push("length");
  }
  return appliedRepairs.length ? {
    input: normalized,
    shapeClass: appliedRepairs.join(",")
  } : null;
}

/**
 * Detect whether `filePath` points at an agent output file inside the agent
 * output directory (`<$it()>/<id>.output`). Returns the extracted agent id when
 * it matches the expected naming, otherwise `null`.
 */
function iGn(filePath: string): string | null {
  let outputDirPrefix = `${$it()}/`,
    outputExt = ".output";
  if (filePath.startsWith(outputDirPrefix) && filePath.endsWith(".output")) {
    let agentId = filePath.slice(outputDirPrefix.length, -7);
    if (agentId.length > 0 && agentId.length <= 20 && /^[a-zA-Z0-9_-]+$/.test(agentId)) return agentId;
  }
  return null;
}

/**
 * Render the one-line title shown for a Read tool call (file path plus an
 * optional pages or line-range suffix).
 */
function Cal({
  file_path: filePath,
  offset,
  limit,
  pages
}: {
  file_path: string;
  offset?: number;
  limit?: number;
  pages?: string;
}, {
  verbose
}: {
  verbose: boolean;
}) {
  if (!filePath) return null;
  if (iGn(filePath)) return "";
  let displayPath = verbose ? filePath : dd(filePath);
  if (pages) return gy.jsxs(gy.Fragment, {
    children: [gy.jsx(q1, {
      filePath: filePath,
      children: displayPath
    }), ` \xB7 pages ${pages}`]
  });
  if (verbose && (offset || limit)) {
    let startLine = offset ?? 1,
      rangeLabel = limit ? `lines ${startLine}-${startLine + limit - 1}` : `from line ${startLine}`;
    return gy.jsxs(gy.Fragment, {
      children: [gy.jsx(q1, {
        filePath: filePath,
        children: displayPath
      }), ` \xB7 ${rangeLabel}`]
    });
  }
  return gy.jsx(q1, {
    filePath: filePath,
    children: displayPath
  });
}

/** Render a dim agent-id label when the read target is an agent output file. */
function Aal({
  file_path: filePath
}: {
  file_path?: string;
}) {
  let agentId = filePath ? iGn(filePath) : null;
  if (!agentId) return null;
  return gy.jsxs(v, {
    dimColor: !0,
    children: [" ", agentId]
  });
}

/**
 * Render the compact one-line success summary for a completed Read, dispatching
 * on the file kind (image / notebook / pdf / parts / text / file_unchanged).
 */
function Ral(result: any) {
  switch (result.type) {
    case "image":
      {
        let {
            originalSize: originalSize
          } = result.file,
          sizeLabel = Ra(originalSize);
        return gy.jsx(Yn, {
          height: 1,
          children: gy.jsxs(v, {
            children: ["Read image (", sizeLabel, ")"]
          })
        });
      }
    case "notebook":
      {
        let {
          cells: cells
        } = result.file;
        if (!cells || cells.length < 1) return gy.jsx(v, {
          color: "error",
          children: "No cells found in notebook"
        });
        return gy.jsx(Yn, {
          height: 1,
          children: gy.jsxs(v, {
            children: ["Read ", gy.jsx(v, {
              bold: !0,
              children: cells.length
            }), " cells"]
          })
        });
      }
    case "pdf":
      {
        let {
            originalSize: originalSize
          } = result.file,
          sizeLabel = Ra(originalSize);
        return gy.jsx(Yn, {
          height: 1,
          children: gy.jsxs(v, {
            children: ["Read PDF (", sizeLabel, ")"]
          })
        });
      }
    case "parts":
      return gy.jsx(Yn, {
        height: 1,
        children: gy.jsxs(v, {
          children: ["Read ", gy.jsx(v, {
            bold: !0,
            children: result.file.count
          }), " ", result.file.count === 1 ? "page" : "pages", " (", Ra(result.file.originalSize), ")"]
        })
      });
    case "text":
      {
        let {
          numLines: numLines
        } = result.file;
        return gy.jsx(Yn, {
          height: 1,
          children: gy.jsxs(v, {
            children: ["Read ", gy.jsx(v, {
              bold: !0,
              children: numLines
            }), " ", numLines === 1 ? "line" : "lines"]
          })
        });
      }
    case "file_unchanged":
      return gy.jsx(Yn, {
        height: 1,
        children: gy.jsx(v, {
          dimColor: !0,
          children: "Unchanged since last read"
        })
      });
  }
}

/**
 * Render the full Read result, surfacing concise error rows for the
 * file-not-found / read-error cases when not in verbose mode.
 */
function val(result: unknown, {
  verbose
}: {
  verbose: boolean;
}) {
  if (!verbose && typeof result === "string") {
    if (result.includes(KN)) return gy.jsx(Yn, {
      children: gy.jsx(v, {
        color: "error",
        children: "File not found"
      })
    });
    if (fl(result, "tool_use_error")) return gy.jsx(Yn, {
      children: gy.jsx(v, {
        color: "error",
        children: "Error reading file"
      })
    });
  }
  return gy.jsx(wC, {
    result: result,
    verbose: verbose
  });
}

/** Pick the tool's display verb based on the target file (plan / agent output / generic read). */
function wal(input: { file_path?: string } | null | undefined) {
  if (input?.file_path?.startsWith(bT())) return "Reading Plan";
  if (input?.file_path && iGn(input.file_path)) return "Read agent output";
  return "Read";
}

/** Resolve a human-readable target label for the Read tool (agent id or shortened path). */
function rEo(input: { file_path?: string } | null | undefined) {
  if (!input?.file_path) return null;
  let agentId = iGn(input.file_path);
  if (agentId) return agentId;
  return dd(input.file_path);
}

var gy: any;
var kal = b(() => {
  po();
  iq();
  X0e();
  Pl();
  je();
  Xl();
  Xo();
  Dw();
  wE();
  gy = x(oe(), 1);
});

export {EKp,nEo,Eal,iGn,Cal,Aal,Ral,val,wal,rEo,gy,kal};
