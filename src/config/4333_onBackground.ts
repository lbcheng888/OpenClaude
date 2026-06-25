// @ts-nocheck
import {shellToolNames as mv,isReplMode as IG} from "../../vendor/m4331.ts";
import {V5e,vG} from "../../vendor/m4362.ts";
import {oOn,Ieo} from "../../vendor/m3301.ts";
import {wu,$k} from "../tui/2575_current.ts";
import {Ne} from "../../vendor/m583.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Zqe,Z9t} from "../../vendor/m3923.ts";
import {dd,Xl} from "./0651_maxBytes.ts";
import {Cs,tp} from "./2284_loggedTmuxCcDisable.ts";
import {IIn} from "../../vendor/m2797.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Git,rOn} from "../../vendor/m3300.ts";
import {q6e,x3n} from "../../vendor/m4052.ts";
import {wC,initModelResolutionModule as iq} from "../core/3298_result.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Background-task UI helpers for the Task tool.
 *
 * - BackgroundHint: renders the "run in background" keyboard-shortcut hint,
 *   wiring an onBackground handler through the gesture/shortcut layer.
 * - The remaining helpers render command previews and progress/result views
 *   for in-progress and completed Task tool calls.
 *
 * Structure mirrors the reverse-engineered module exactly (React-Compiler
 * memo-cache slots preserved); only local identifiers, TS types and comments
 * are added here.
 */

/**
 * Renders the "run in background" shortcut hint for the Task tool.
 * @param props - optional props carrying the onBackground callback.
 */
function BackgroundHint(props: { onBackground?: () => void } | undefined): any {
  let cache = Tel.c(10),
    resolvedProps: { onBackground?: () => void };
  if (cache[0] !== props) resolvedProps = props === void 0 ? {} : props, cache[0] = props, cache[1] = resolvedProps;else resolvedProps = cache[1];
  let {
      onBackground: onBackground
    } = resolvedProps,
    tools = mv(),
    backgroundHandler: () => void;
  if (cache[2] !== onBackground || cache[3] !== tools) backgroundHandler = () => {
    V5e(tools), onBackground?.();
  }, cache[2] = onBackground, cache[3] = tools, cache[4] = backgroundHandler;else backgroundHandler = cache[4];
  let handler = backgroundHandler,
    gesture: { handler: () => void; isActive: boolean };
  if (cache[5] !== handler) gesture = {
    handler: handler,
    isActive: !0
  }, cache[5] = handler, cache[6] = gesture;else gesture = cache[6];
  let {
      cohesionFixes: cohesionFixes,
      gateOnShortcut: gateOnShortcut
    } = oOn(gesture),
    shortcut = wu("task:background", "Task", "ctrl+b"),
    chord = cohesionFixes ? gateOnShortcut : Ne.terminal === "tmux" && shortcut === "ctrl+b" ? "ctrl+b ctrl+b (twice)" : shortcut;
  if (Ne.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS || cohesionFixes && chord === "") return null;
  let chordFormat: { keyCase: string };
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) chordFormat = {
    keyCase: "lower"
  }, cache[7] = chordFormat;else chordFormat = cache[7];
  let hintElement: any;
  if (cache[8] !== chord) hintElement = xG.jsx($, {
    paddingLeft: 5,
    children: xG.jsx(v, {
      dimColor: !0,
      children: xG.jsx(at, {
        chord: chord,
        action: "run in background",
        parens: !0,
        format: chordFormat
      })
    })
  }), cache[8] = chord, cache[9] = hintElement;else hintElement = cache[9];
  return hintElement;
}
/**
 * Builds a compact, single-line preview of the Task command, truncating long
 * or multi-line commands unless verbose mode is requested.
 */
function renderCommandPreview(input: { command?: string }, {
  verbose: verbose,
  theme: theme
}: { verbose?: boolean; theme?: any }): any {
  let {
    command: command
  } = input;
  if (!command) return null;
  let filePathRef = Zqe(command);
  if (filePathRef) return verbose ? filePathRef.filePath : dd(filePathRef.filePath);
  if (!verbose) {
    let lines = command.split(`
`);
    if (Cs()) {
      let summary = IIn(command);
      if (summary) return summary.length > m6t ? summary.slice(0, m6t) + "…" : summary;
    }
    let tooManyLines = lines.length > yel,
      tooLong = command.length > m6t;
    if (tooManyLines || tooLong) {
      let truncated = command;
      if (tooManyLines) truncated = lines.slice(0, yel).join(`
`);
      if (truncated.length > m6t) truncated = truncated.slice(0, m6t);
      return xG.jsxs(v, {
        children: [truncated.trim(), "…"]
      });
    }
  }
  return command;
}
/**
 * Renders the in-progress view for a running Task, showing a "Running…"
 * placeholder until progress data arrives, then the live output panel.
 */
function renderRunningView(progressMessages: Array<{ data?: any }>, {
  verbose: verbose,
  tools: tools,
  terminalSize: terminalSize,
  inProgressToolCallCount: inProgressToolCallCount
}: { verbose?: boolean; tools?: any; terminalSize?: any; inProgressToolCallCount?: number }): any {
  let lastMessage = progressMessages.at(-1);
  if (!lastMessage || !lastMessage.data) return xG.jsx(Yn, {
    height: 1,
    children: xG.jsx(v, {
      dimColor: !0,
      children: "Running…"
    })
  });
  let data = lastMessage.data;
  return xG.jsx(Git, {
    fullOutput: data.fullOutput,
    output: data.output,
    elapsedTimeSeconds: data.elapsedTimeSeconds,
    totalLines: data.totalLines,
    totalBytes: data.totalBytes,
    timeoutMs: data.timeoutMs,
    taskId: data.taskId,
    verbose: verbose
  });
}
/** Renders the "Waiting…" placeholder shown before a Task starts producing output. */
function renderWaitingView(): any {
  return xG.jsx(Yn, {
    height: 1,
    children: xG.jsx(v, {
      dimColor: !0,
      children: "Waiting…"
    })
  });
}
/**
 * Renders the rejected/denied view for a Task tool call, forwarding the
 * timeout from the latest progress message.
 */
function renderRejectedView(content: any, progressMessages: Array<{ data?: any }>, {
  verbose: verbose,
  theme: theme,
  tools: tools,
  style: style
}: { verbose?: boolean; theme?: any; tools?: any; style?: any }): any {
  let timeoutMs = progressMessages.at(-1)?.data?.timeoutMs;
  return xG.jsx(q6e, {
    content: content,
    verbose: verbose,
    timeoutMs: timeoutMs
  });
}
/** Renders the final result view for a completed Task tool call. */
function renderResultView(result: any, {
  verbose: verbose,
  progressMessagesForMessage: progressMessagesForMessage,
  tools: tools
}: { verbose?: boolean; progressMessagesForMessage?: any; tools?: any }): any {
  return xG.jsx(wC, {
    result: result,
    verbose: verbose
  });
}
var Tel: any,
  xG: any,
  yel = 2,
  m6t = 160;
var Eqt = b(() => {
  Wo();
  iq();
  Pl();
  rOn();
  Ieo();
  je();
  $k();
  IG();
  vG();
  Ir();
  Xl();
  tp();
  x3n();
  Z9t();
  Tel = x(tt(), 1), xG = x(oe(), 1);
});

export {BackgroundHint as Yxe,renderCommandPreview as Sel,renderRunningView as bel,renderWaitingView as Eel,renderRejectedView as Cel,renderResultView as Ael,Tel,xG,yel,m6t,Eqt};
