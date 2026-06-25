// @ts-nocheck
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {bw,EW} from "../../vendor/m2811.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {dd,KN,Xl} from "../config/0651_maxBytes.ts";
import {fl,po} from "../tools/5224_userPromptCount.ts";
import {wC,initModelResolutionModule as iq} from "./3298_result.ts";
import {truncate as Ha} from "../../vendor/m239.ts";
import {DD} from "../telemetry/2792_eventName.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Xo} from "../../vendor/m240.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Renders the "Found N <label>" summary line for search/grep tool results,
 * optionally with a secondary "across M files" clause, verbose content block,
 * and a trailing decoration. Uses React-compiler memoization cache (`DUa.c`).
 */
function Quo(props) {
  let cache = DUa.c(26),
    {
      count: count,
      countLabel: countLabel,
      secondaryCount: secondaryCount,
      secondaryLabel: secondaryLabel,
      content: content,
      verbose: verbose
    } = props,
    boldCount;
  if (cache[0] !== count) boldCount = Ow.jsxs(v, {
    bold: !0,
    children: [count, " "]
  }), cache[0] = count, cache[1] = boldCount;else boldCount = cache[1];
  let label;
  if (cache[2] !== count || cache[3] !== countLabel) label = count === 0 || count > 1 ? countLabel : countLabel.slice(0, -1), cache[2] = count, cache[3] = countLabel, cache[4] = label;else label = cache[4];
  let primaryText;
  if (cache[5] !== boldCount || cache[6] !== label) primaryText = Ow.jsxs(v, {
    children: ["Found ", boldCount, label]
  }), cache[5] = boldCount, cache[6] = label, cache[7] = primaryText;else primaryText = cache[7];
  let primary = primaryText,
    secondaryText;
  if (cache[8] !== secondaryCount || cache[9] !== secondaryLabel) secondaryText = secondaryCount !== void 0 && secondaryLabel ? Ow.jsxs(v, {
    children: [" ", "across ", Ow.jsxs(v, {
      bold: !0,
      children: [secondaryCount, " "]
    }), secondaryCount === 0 || secondaryCount > 1 ? secondaryLabel : secondaryLabel.slice(0, -1)]
  }) : null, cache[8] = secondaryCount, cache[9] = secondaryLabel, cache[10] = secondaryText;else secondaryText = cache[10];
  let secondary = secondaryText;
  if (verbose) {
    let bullet;
    if (cache[11] === Symbol.for("react.memo_cache_sentinel")) bullet = Ow.jsx(v, {
      dimColor: !0,
      children: "\xA0\xA0\u23BF \xA0"
    }), cache[11] = bullet;else bullet = cache[11];
    let headerRow;
    if (cache[12] !== primary || cache[13] !== secondary) headerRow = Ow.jsx($, {
      flexDirection: "row",
      children: Ow.jsxs(v, {
        children: [bullet, primary, secondary]
      })
    }), cache[12] = primary, cache[13] = secondary, cache[14] = headerRow;else headerRow = cache[14];
    let contentRow;
    if (cache[15] !== content) contentRow = Ow.jsx($, {
      marginLeft: 5,
      children: Ow.jsx(v, {
        children: content
      })
    }), cache[15] = content, cache[16] = contentRow;else contentRow = cache[16];
    let verboseColumn;
    if (cache[17] !== headerRow || cache[18] !== contentRow) verboseColumn = Ow.jsxs($, {
      flexDirection: "column",
      children: [headerRow, contentRow]
    }), cache[17] = headerRow, cache[18] = contentRow, cache[19] = verboseColumn;else verboseColumn = cache[19];
    return verboseColumn;
  }
  let trailingDecoration;
  if (cache[20] !== count) trailingDecoration = count > 0 && Ow.jsx(bw, {}), cache[20] = count, cache[21] = trailingDecoration;else trailingDecoration = cache[21];
  let compactRow;
  if (cache[22] !== primary || cache[23] !== secondary || cache[24] !== trailingDecoration) compactRow = Ow.jsx(Yn, {
    height: 1,
    children: Ow.jsxs(v, {
      children: [primary, secondary, " ", trailingDecoration]
    })
  }), cache[22] = primary, cache[23] = secondary, cache[24] = trailingDecoration, cache[25] = compactRow;else compactRow = cache[25];
  return compactRow;
}
/** Builds the one-line `pattern: "...", path: "..."` label for a grep invocation. */
function PUa({
  pattern: pattern,
  path: path
}, {
  verbose: verbose
}) {
  if (!pattern) return null;
  let parts = [`pattern: "${pattern}"`];
  if (path) parts.push(`path: "${verbose ? path : dd(path)}"`);
  return parts.join(", ");
}
/** Renders the error/result view for a grep tool result, mapping known error codes. */
function OUa(result, {
  verbose: verbose
}) {
  if (!verbose && typeof result === "string" && fl(result, "tool_use_error")) {
    if (fl(result, "tool_use_error")?.includes(KN)) return Ow.jsx(Yn, {
      children: Ow.jsx(v, {
        color: "error",
        children: "File not found"
      })
    });
    return Ow.jsx(Yn, {
      children: Ow.jsx(v, {
        color: "error",
        children: "Error searching files"
      })
    });
  }
  return Ow.jsx(wC, {
    result: result,
    verbose: verbose
  });
}
/** Dispatches grep result rendering by output mode (content / count / files). */
function LUa({
  mode: mode = "files_with_matches",
  filenames: filenames,
  numFiles: numFiles,
  content: content,
  numLines: numLines,
  numMatches: numMatches
}, _unused, {
  verbose: verbose
}) {
  if (mode === "content") return Ow.jsx(Quo, {
    count: numLines ?? 0,
    countLabel: "lines",
    content: content,
    verbose: verbose
  });
  if (mode === "count") return Ow.jsx(Quo, {
    count: numMatches ?? 0,
    countLabel: "matches",
    secondaryCount: numFiles,
    secondaryLabel: "files",
    content: content,
    verbose: verbose
  });
  let fileList = filenames.map(name => name).join(`
`);
  return Ow.jsx(Quo, {
    count: numFiles,
    countLabel: "files",
    content: fileList,
    verbose: verbose
  });
}
/** Derives the truncated display pattern from a grep tool input. */
function Zuo(input) {
  if (!input?.pattern) return null;
  return Ha(input.pattern, DD);
}
var DUa, Ow;
var MUa = b(() => {
  EW();
  iq();
  Pl();
  je();
  Xl();
  Xo();
  po();
  DUa = x(tt(), 1), Ow = x(oe(), 1);
});

export {Quo,PUa,OUa,LUa,Zuo,DUa,Ow,MUa};
