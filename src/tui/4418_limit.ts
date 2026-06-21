// @ts-nocheck
import {qot as Eot,vC as TC} from "../../vendor/m5145.ts";
import {Id as Md,CB as AB,mc} from "../config/0645_maxBytes.ts";
import {initRN as TN,uIe as VHe} from "../../vendor/m3974.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {formatFileSize as nl,ps as ds} from "../../vendor/m238.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {Dl as Ol,lo} from "../tools/5190_userPromptCount.ts";
import {wC as SC,jq as Hq} from "./3282_result.tsx";
import {xT as ST,yx as Ax} from "../core/5144_encoding.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseIntParam(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "string" && /^[-+]?\d+$/.test(value.trim())) return Number(value);
  return;
}
function normalizeReadParams(rawParams) {
  if (!isPlainObject(rawParams)) return null;
  let params = {
      ...rawParams
    },
    fixList = [],
    parsedOffset = parseIntParam(params.offset);
  if (parsedOffset !== undefined && parsedOffset < 0) delete params.offset, fixList.push("offset_neg");
  let parsedLimit = parseIntParam(params.limit);
  if (parsedLimit !== undefined && parsedLimit <= 0) delete params.limit, fixList.push("limit_dropped");
  if ("length" in params) {
    let parsedLength = parseIntParam(params.length);
    if (!("limit" in params) && parsedLength !== undefined && parsedLength > 0) params.limit = parsedLength;
    delete params.length, fixList.push("length");
  }
  return fixList.length ? {
    input: params,
    shapeClass: fixList.join(",")
  } : null;
}
function parseAgentOutputPath(filePath) {
  let outputDirPrefix = `${Eot()}/`,
    outputSuffix = ".output";
  if (filePath.startsWith(outputDirPrefix) && filePath.endsWith(".output")) {
    let agentId = filePath.slice(outputDirPrefix.length, -7);
    if (agentId.length > 0 && agentId.length <= 20 && /^[a-zA-Z0-9_-]+$/.test(agentId)) return agentId;
  }
  return null;
}
function renderReadHeader({
  file_path: filePath,
  offset: offset,
  limit: limit,
  pages: pages
}, {
  verbose: verbose
}) {
  if (!filePath) return null;
  if (parseAgentOutputPath(filePath)) return "";
  let displayPath = verbose ? filePath : Md(filePath);
  if (pages) return Yc.createElement(Yc.Fragment, null, Yc.createElement(TN, {
    filePath: filePath
  }, displayPath), ` \xB7 pages ${pages}`);
  if (verbose && (offset || limit)) {
    let startLine = offset ?? 1,
      rangeLabel = limit ? `lines ${startLine}-${startLine + limit - 1}` : `from line ${startLine}`;
    return Yc.createElement(Yc.Fragment, null, Yc.createElement(TN, {
      filePath: filePath
    }, displayPath), ` \xB7 ${rangeLabel}`);
  }
  return Yc.createElement(TN, {
    filePath: filePath
  }, displayPath);
}
function renderAgentOutputBadge({
  file_path: filePath
}) {
  let agentId = filePath ? parseAgentOutputPath(filePath) : null;
  if (!agentId) return null;
  return Yc.createElement(w, {
    dimColor: true
  }, " ", agentId);
}
function renderReadResult(result) {
  switch (result.type) {
    case "image":
      {
        let {
            originalSize: originalSize
          } = result.file,
          sizeLabel = nl(originalSize);
        return Yc.createElement(qn, {
          height: 1
        }, Yc.createElement(w, null, "Read image (", sizeLabel, ")"));
      }
    case "notebook":
      {
        let {
          cells: cells
        } = result.file;
        if (!cells || cells.length < 1) return Yc.createElement(w, {
          color: "error"
        }, "No cells found in notebook");
        return Yc.createElement(qn, {
          height: 1
        }, Yc.createElement(w, null, "Read ", Yc.createElement(w, {
          bold: true
        }, cells.length), " cells"));
      }
    case "pdf":
      {
        let {
            originalSize: originalSize
          } = result.file,
          sizeLabel = nl(originalSize);
        return Yc.createElement(qn, {
          height: 1
        }, Yc.createElement(w, null, "Read PDF (", sizeLabel, ")"));
      }
    case "parts":
      return Yc.createElement(qn, {
        height: 1
      }, Yc.createElement(w, null, "Read ", Yc.createElement(w, {
        bold: true
      }, result.file.count), " ", result.file.count === 1 ? "page" : "pages", " (", nl(result.file.originalSize), ")"));
    case "text":
      {
        let {
          numLines: numLines
        } = result.file;
        return Yc.createElement(qn, {
          height: 1
        }, Yc.createElement(w, null, "Read ", Yc.createElement(w, {
          bold: true
        }, numLines), " ", numLines === 1 ? "line" : "lines"));
      }
    case "file_unchanged":
      return Yc.createElement(qn, {
        height: 1
      }, Yc.createElement(w, {
        dimColor: true
      }, "Unchanged since last read"));
  }
}
function renderReadOutput(result, {
  verbose: verbose
}) {
  if (!verbose && typeof result === "string") {
    if (result.includes(AB)) return Yc.createElement(qn, null, Yc.createElement(w, {
      color: "error"
    }, "File not found"));
    if (Ol(result, "tool_use_error")) return Yc.createElement(qn, null, Yc.createElement(w, {
      color: "error"
    }, "Error reading file"));
  }
  return Yc.createElement(SC, {
    result: result,
    verbose: verbose
  });
}
function getReadToolTitle(params) {
  if (params?.file_path?.startsWith(ST())) return "Reading Plan";
  if (params?.file_path && parseAgentOutputPath(params.file_path)) return "Read agent output";
  return "Read";
}
function getReadDisplayPath(params) {
  if (!params?.file_path) return null;
  let agentId = parseAgentOutputPath(params.file_path);
  if (agentId) return agentId;
  return Md(params.file_path);
}
var Yc;
var fZa = b(() => {
  lo();
  Hq();
  VHe();
  rc();
  Je();
  mc();
  ds();
  Ax();
  TC();
  Yc = L(Te(), 1);
});

export {isPlainObject as F3p,parseIntParam as cgo,normalizeReadParams as Oel,parseAgentOutputPath as $6n,renderReadHeader as Lel,renderAgentOutputBadge as Mel,renderReadResult as Nel,renderReadOutput as Bel,getReadToolTitle as Fel,getReadDisplayPath as ugo,Yc as Qc,fZa as Uel};
