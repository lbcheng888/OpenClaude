// @ts-nocheck
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {cx as ix,iW as j5} from "../../vendor/m2798.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {Id as Md,CB as AB,mc} from "../config/0645_maxBytes.ts";
import {Dl as Ol,lo} from "../tools/5190_userPromptCount.ts";
import {wC as SC,jq as Hq} from "../tui/3282_result.tsx";
import {truncate as Ga} from "../../vendor/m237.ts";
import {yP as _P} from "../telemetry/2780_eventName.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {ps as ds} from "../../vendor/m238.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function cn8(props) {
  let cache = n8K.c(26),
    {
      count: count,
      countLabel: countLabel,
      secondaryCount: secondaryCount,
      secondaryLabel: secondaryLabel,
      content: content,
      verbose: verbose
    } = props,
    boldCount;
  if (cache[0] !== count) boldCount = XZ.default.createElement(w, {
    bold: true
  }, count, " "), cache[0] = count, cache[1] = boldCount;else boldCount = cache[1];
  let label;
  if (cache[2] !== count || cache[3] !== countLabel) label = count === 0 || count > 1 ? countLabel : countLabel.slice(0, -1), cache[2] = count, cache[3] = countLabel, cache[4] = label;else label = cache[4];
  let primaryText;
  if (cache[5] !== boldCount || cache[6] !== label) primaryText = XZ.default.createElement(w, null, "Found ", boldCount, label), cache[5] = boldCount, cache[6] = label, cache[7] = primaryText;else primaryText = cache[7];
  let primary = primaryText,
    secondaryText;
  if (cache[8] !== secondaryCount || cache[9] !== secondaryLabel) secondaryText = secondaryCount !== undefined && secondaryLabel ? XZ.default.createElement(w, null, " ", "across ", XZ.default.createElement(w, {
    bold: true
  }, secondaryCount, " "), secondaryCount === 0 || secondaryCount > 1 ? secondaryLabel : secondaryLabel.slice(0, -1)) : null, cache[8] = secondaryCount, cache[9] = secondaryLabel, cache[10] = secondaryText;else secondaryText = cache[10];
  let secondary = secondaryText;
  if (verbose) {
    let bullet;
    if (cache[11] === Symbol.for("react.memo_cache_sentinel")) bullet = XZ.default.createElement(w, {
      dimColor: true
    }, "\xA0\xA0\u23BF \xA0"), cache[11] = bullet;else bullet = cache[11];
    let headerRow;
    if (cache[12] !== primary || cache[13] !== secondary) headerRow = XZ.default.createElement(B, {
      flexDirection: "row"
    }, XZ.default.createElement(w, null, bullet, primary, secondary)), cache[12] = primary, cache[13] = secondary, cache[14] = headerRow;else headerRow = cache[14];
    let contentRow;
    if (cache[15] !== content) contentRow = XZ.default.createElement(B, {
      marginLeft: 5
    }, XZ.default.createElement(w, null, content)), cache[15] = content, cache[16] = contentRow;else contentRow = cache[16];
    let verboseColumn;
    if (cache[17] !== headerRow || cache[18] !== contentRow) verboseColumn = XZ.default.createElement(B, {
      flexDirection: "column"
    }, headerRow, contentRow), cache[17] = headerRow, cache[18] = contentRow, cache[19] = verboseColumn;else verboseColumn = cache[19];
    return verboseColumn;
  }
  let trailingDecoration;
  if (cache[20] !== count) trailingDecoration = count > 0 && XZ.default.createElement(ix, null), cache[20] = count, cache[21] = trailingDecoration;else trailingDecoration = cache[21];
  let compactRow;
  if (cache[22] !== primary || cache[23] !== secondary || cache[24] !== trailingDecoration) compactRow = XZ.default.createElement(qn, {
    height: 1
  }, XZ.default.createElement(w, null, primary, secondary, " ", trailingDecoration)), cache[22] = primary, cache[23] = secondary, cache[24] = trailingDecoration, cache[25] = compactRow;else compactRow = cache[25];
  return compactRow;
}
function i8K({
  pattern: pattern,
  path: path
}, {
  verbose: verbose
}) {
  if (!pattern) return null;
  let parts = [`pattern: "${pattern}"`];
  if (path) parts.push(`path: "${verbose ? path : Md(path)}"`);
  return parts.join(", ");
}
function r8K(result, {
  verbose: verbose
}) {
  if (!verbose && typeof result === "string" && Ol(result, "tool_use_error")) {
    if (Ol(result, "tool_use_error")?.includes(AB)) return XZ.default.createElement(qn, null, XZ.default.createElement(w, {
      color: "error"
    }, "File not found"));
    return XZ.default.createElement(qn, null, XZ.default.createElement(w, {
      color: "error"
    }, "Error searching files"));
  }
  return XZ.default.createElement(SC, {
    result: result,
    verbose: verbose
  });
}
function o8K({
  mode = "files_with_matches",
  filenames: filenames,
  numFiles: numFiles,
  content: content,
  numLines: numLines,
  numMatches: numMatches
}, _unused, {
  verbose: verbose
}) {
  if (mode === "content") return XZ.default.createElement(cn8, {
    count: numLines ?? 0,
    countLabel: "lines",
    content: content,
    verbose: verbose
  });
  if (mode === "count") return XZ.default.createElement(cn8, {
    count: numMatches ?? 0,
    countLabel: "matches",
    secondaryCount: numFiles,
    secondaryLabel: "files",
    content: content,
    verbose: verbose
  });
  let fileList = filenames.map(name => name).join(`
`);
  return XZ.default.createElement(cn8, {
    count: numFiles,
    countLabel: "files",
    content: fileList,
    verbose: verbose
  });
}
function dn8(input) {
  if (!input?.pattern) return null;
  return Ga(input.pattern, _P);
}
var n8K, XZ;
var a8K = b(() => {
  j5();
  Hq();
  rc();
  Je();
  mc();
  ds();
  lo();
  n8K = L(nt(), 1), XZ = L(Te(), 1);
});

export {cn8 as oio,i8K as dLa,r8K as pLa,o8K as mLa,dn8 as sio,n8K as uLa,XZ as zk,a8K as fLa};
