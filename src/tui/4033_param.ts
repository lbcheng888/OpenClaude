// @ts-nocheck
import {gce,Idt} from "../../vendor/m4028.ts";
import {Mf,$A} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {SY,xdt} from "../../vendor/m4031.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Ql,Pa} from "../../vendor/m720.ts";
import {Hte,_dt} from "../../vendor/m3999.ts";
import {q3a,$3a,U3a,h3n,Upo} from "../../vendor/m4029.ts";
import {truncateToWidth as xs,XH} from "../../vendor/m239.ts";
import {mi,lr} from "../../vendor/m233.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * REPL tool-call parameter renderer (TUI).
 *
 * Renders the REPL tool block: a status line (REPL + state + elapsed/progress),
 * the code being written/run (with folding), and the output or error panels.
 * Ported from v2.1.185 readable module (3966_param.ts); structure taken from v190.
 */

/** Gate wrapper: only render for the REPL param, memoized on the props object. */
function Kpo(props) {
  let cache = Pdt.c(2);
  if (!gce() || props.param.name !== Mf) return null;
  let element;
  if (cache[0] !== props) element = NC.jsx(Pxp, {
    ...props
  }), cache[0] = props, cache[1] = element;else element = cache[1];
  return element;
}

/** Main REPL block: status row, code panel, and output/error panels. */
function Pxp({
  param: param,
  isQueued: isQueued,
  isResolved: isResolved,
  isError: isError,
  shouldAnimate: shouldAnimate,
  shouldShowDot: shouldShowDot,
  addMargin: addMargin,
  progressMessagesForMessage: progressMessages,
  resultMsg: resultMsg
}) {
  let state = isResolved ? isError ? "failed" : "done" : isQueued ? "writing" : "running",
    replToolCalls = progressMessages.filter(message => message.data.type === "repl_tool_call");
  Wxp(state, isResolved);
  let startTime = Ddt.useRef(Date.now()).current,
    elapsed = SY(startTime, state === "running", 200),
    code = typeof param.input.code === "string" ? param.input.code : "",
    toolUseResult = resultMsg?.type === "user" ? resultMsg.toolUseResult : void 0;
  return NC.jsxs($, {
    flexDirection: "column",
    marginTop: addMargin ? 1 : 0,
    marginBottom: 1,
    width: "100%",
    children: [NC.jsxs($, {
      flexDirection: "row",
      children: [shouldShowDot && (isQueued ? NC.jsx($, {
        minWidth: 2,
        children: NC.jsx(v, {
          dimColor: !0,
          children: Ql
        })
      }) : NC.jsx(Hte, {
        shouldAnimate: shouldAnimate,
        isUnresolved: !isResolved,
        isError: isError
      })), NC.jsx(v, {
        bold: !0,
        children: "REPL"
      }), NC.jsx(Oxp, {
        state: state,
        elapsed: elapsed,
        progress: replToolCalls,
        error: toolUseResult?.error
      })]
    }), NC.jsx(Mxp, {
      code: code,
      state: state,
      fold: state === "done" || state === "failed"
    }), state === "done" && toolUseResult && NC.jsx(Fxp, {
      output: toolUseResult
    }), state === "failed" && toolUseResult?.error && NC.jsx(Uxp, {
      error: toolUseResult.error
    })]
  });
}

/** Status text for the REPL header (per writing/running/done/failed state). */
function Oxp(props) {
  let cache = Pdt.c(23),
    {
      state: state,
      elapsed: elapsed,
      progress: progress,
      error: error
    } = props,
    formattedProgress;
  if (cache[0] !== progress) formattedProgress = q3a(progress), cache[0] = progress, cache[1] = formattedProgress;else formattedProgress = cache[1];
  let progressSuffix = formattedProgress;
  switch (state) {
    case "writing":
      {
        let writingNode;
        if (cache[2] === Symbol.for("react.memo_cache_sentinel")) writingNode = NC.jsx(v, {
          dimColor: !0,
          children: "(Writing\u2026)"
        }), cache[2] = writingNode;else writingNode = cache[2];
        return writingNode;
      }
    case "running":
      {
        let lastStart, toolArgs;
        if (cache[3] !== progress) lastStart = progress.findLast(Lxp), toolArgs = lastStart ? $3a(lastStart.data.toolInput) : "", cache[3] = progress, cache[4] = lastStart, cache[5] = toolArgs;else lastStart = cache[4], toolArgs = cache[5];
        let args = toolArgs,
          label = lastStart ? `Running ${lastStart.data.toolName}(${args})\u2026` : "Running\u2026",
          runningNode;
        if (cache[6] !== elapsed || cache[7] !== label) runningNode = NC.jsxs(v, {
          dimColor: !0,
          children: ["(", label, " ", elapsed, ")"]
        }), cache[6] = elapsed, cache[7] = label, cache[8] = runningNode;else runningNode = cache[8];
        return runningNode;
      }
    case "done":
      {
        let toolName;
        if (cache[9] !== progress) toolName = U3a(progress), cache[9] = progress, cache[10] = toolName;else toolName = cache[10];
        let ranName = toolName,
          ranLabel = ranName ? `Ran ${ranName}` : "Done",
          doneParts;
        if (cache[11] !== progressSuffix || cache[12] !== ranLabel) doneParts = [ranLabel, progressSuffix].filter(Boolean), cache[11] = progressSuffix, cache[12] = ranLabel, cache[13] = doneParts;else doneParts = cache[13];
        let doneText = doneParts.join(" \xB7 "),
          doneNode;
        if (cache[14] !== doneText) doneNode = NC.jsxs(v, {
          dimColor: !0,
          children: ["(", doneText, ")"]
        }), cache[14] = doneText, cache[15] = doneNode;else doneNode = cache[15];
        return doneNode;
      }
    case "failed":
      {
        let failureText;
        if (cache[16] !== error) failureText = error ? xs(mi(error, ":"), 40) : "Failed", cache[16] = error, cache[17] = failureText;else failureText = cache[17];
        let failedLabel = failureText || "Failed",
          failedParts;
        if (cache[18] !== progressSuffix || cache[19] !== failedLabel) failedParts = [failedLabel, progressSuffix].filter(Boolean), cache[18] = progressSuffix, cache[19] = failedLabel, cache[20] = failedParts;else failedParts = cache[20];
        let failedText = failedParts.join(" \xB7 "),
          failedNode;
        if (cache[21] !== failedText) failedNode = NC.jsxs(v, {
          color: "error",
          children: ["(", failedText, ")"]
        }), cache[21] = failedText, cache[22] = failedNode;else failedNode = cache[22];
        return failedNode;
      }
  }
}

/** Predicate: progress message marking a tool-call start. */
function Lxp(message) {
  return message.data.phase === "start";
}

/** Code panel: renders source lines with a left gutter, folding, and a cursor. */
function Mxp(props) {
  let cache = Pdt.c(12),
    {
      code: code,
      state: state,
      fold: fold
    } = props,
    boxComponent,
    flexDirection,
    marginTop,
    lineNodes;
  if (cache[0] !== code || cache[1] !== fold || cache[2] !== state) {
    let codeLines = code.split(`
`),
      displayLines = fold ? h3n(codeLines, 3, 2) : codeLines.map(Nxp),
      dim = state !== "running";
    boxComponent = $, flexDirection = "column", marginTop = 1, lineNodes = displayLines.map((line, index) => NC.jsxs($, {
      flexDirection: "row",
      children: [NC.jsx(v, {
        dimColor: !0,
        children: Vpo
      }), NC.jsx(v, {
        dimColor: dim || line.folded,
        children: line.line
      }), state === "writing" && index === displayLines.length - 1 && NC.jsx(v, {
        children: Dxp
      })]
    }, index)), cache[0] = code, cache[1] = fold, cache[2] = state, cache[3] = boxComponent, cache[4] = flexDirection, cache[5] = marginTop, cache[6] = lineNodes;
  } else boxComponent = cache[3], flexDirection = cache[4], marginTop = cache[5], lineNodes = cache[6];
  let codeNode;
  if (cache[7] !== boxComponent || cache[8] !== flexDirection || cache[9] !== marginTop || cache[10] !== lineNodes) codeNode = NC.jsx(boxComponent, {
    flexDirection: flexDirection,
    marginTop: marginTop,
    children: lineNodes
  }), cache[7] = boxComponent, cache[8] = flexDirection, cache[9] = marginTop, cache[10] = lineNodes, cache[11] = codeNode;else codeNode = cache[11];
  return codeNode;
}

/** Wrap a raw line string into a line descriptor. */
function Nxp(line) {
  return {
    line: line
  };
}

/** Output panel: pretty-prints the tool result and renders folded lines. */
function Fxp(props) {
  let cache = Pdt.c(10),
    {
      output: output
    } = props,
    boxComponent,
    flexDirection,
    marginTop,
    lineNodes;
  if (cache[0] !== output.result) {
    let inspected = qxp(output.result),
      foldedLines = h3n(inspected.split(`
`), 6, 2);
    boxComponent = $, flexDirection = "column", marginTop = 1, lineNodes = foldedLines.map(Bxp), cache[0] = output.result, cache[1] = boxComponent, cache[2] = flexDirection, cache[3] = marginTop, cache[4] = lineNodes;
  } else boxComponent = cache[1], flexDirection = cache[2], marginTop = cache[3], lineNodes = cache[4];
  let outputNode;
  if (cache[5] !== boxComponent || cache[6] !== flexDirection || cache[7] !== marginTop || cache[8] !== lineNodes) outputNode = NC.jsx(boxComponent, {
    flexDirection: flexDirection,
    marginTop: marginTop,
    children: lineNodes
  }), cache[5] = boxComponent, cache[6] = flexDirection, cache[7] = marginTop, cache[8] = lineNodes, cache[9] = outputNode;else outputNode = cache[9];
  return outputNode;
}

/** Render one output line with the left gutter. */
function Bxp(line, index) {
  return NC.jsxs(v, {
    children: [Vpo, line.line]
  }, index);
}

/** Error panel: renders the error text as folded lines in error color. */
function Uxp(props) {
  let cache = Pdt.c(10),
    {
      error: error
    } = props,
    boxComponent,
    flexDirection,
    marginTop,
    lineNodes;
  if (cache[0] !== error) {
    let foldedLines = h3n(error.split(`
`), 8, 2);
    boxComponent = $, flexDirection = "column", marginTop = 1, lineNodes = foldedLines.map($xp), cache[0] = error, cache[1] = boxComponent, cache[2] = flexDirection, cache[3] = marginTop, cache[4] = lineNodes;
  } else boxComponent = cache[1], flexDirection = cache[2], marginTop = cache[3], lineNodes = cache[4];
  let errorNode;
  if (cache[5] !== boxComponent || cache[6] !== flexDirection || cache[7] !== marginTop || cache[8] !== lineNodes) errorNode = NC.jsx(boxComponent, {
    flexDirection: flexDirection,
    marginTop: marginTop,
    children: lineNodes
  }), cache[5] = boxComponent, cache[6] = flexDirection, cache[7] = marginTop, cache[8] = lineNodes, cache[9] = errorNode;else errorNode = cache[9];
  return errorNode;
}

/** Render one error line with the left gutter in error color. */
function $xp(line, index) {
  return NC.jsxs(v, {
    color: "error",
    children: [Vpo, line.line]
  }, index);
}

/** Safely inspect a value for display; falls back to a placeholder on failure. */
function qxp(value) {
  try {
    return G3a.inspect(value, {
      colors: !1,
      depth: 3,
      customInspect: !1
    });
  } catch {
    return "[non-serializable value]";
  }
}

/** Fire a one-shot verbose-render telemetry event per state (skips initial state). */
function Wxp(state, isResolved) {
  let initialResolved = Ddt.useRef(isResolved).current,
    seenStates = Ddt.useRef(new Set());
  Ddt.useEffect(() => {
    if (initialResolved || seenStates.current.has(state)) return;
    seenStates.current.add(state), W("tengu_repl_verbose_render", {
      state: Le(state)
    });
  }, [initialResolved, state]);
}
var Pdt,
  Ddt,
  G3a,
  NC,
  Vpo = "    ",
  Dxp = "\u258C";
var V3a = b(() => {
  _dt();
  Pa();
  xdt();
  je();
  kt();
  lr();
  XH();
  $A();
  Upo();
  Idt();
  Pdt = x(tt(), 1), Ddt = x(et(), 1), G3a = require("util"), NC = x(oe(), 1);
});

export {Kpo,Pxp,Oxp,Lxp,Mxp,Nxp,Fxp,Bxp,Uxp,$xp,qxp,Wxp,Pdt,Ddt,G3a,NC,Vpo,Dxp,V3a};
