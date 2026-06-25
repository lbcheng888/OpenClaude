// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {jPe,xGt} from "../config/4924_cmd.ts";
import {NRe,fD,y8} from "../telemetry/2039_CLAUDE_AX_SCREEN_READER.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {kc,aA} from "../../vendor/m234.ts";
import {logEventTo1PAwaitable as vF,is1PEventLoggingEnabled as G3,GM} from "../session/2203_shutdown1PEventLogging.ts";
import {Le} from "../../vendor/m5.ts";
import {mZ,Cs,Sve,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {UF} from "../../vendor/m2389.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {Qjn,jIo} from "../../vendor/m4924.ts";
import {Mr,Kh,xl} from "../../vendor/m4427.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {getInitialSettings as Fr,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {XM,Ive} from "../config/2352_useDecayCurve.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * /tui command — switch between the classic ("default") and "fullscreen"
 * terminal renderers. Saves the chosen renderer to user settings and relaunches
 * the process so the new renderer takes effect. When reverting from fullscreen
 * back to classic, optionally shows a feedback prompt asking why the user switched.
 */

var Fxl = {};
ft(Fxl, {
  relaunchInto: () => relaunchInto,
  call: () => call
});

/**
 * Relaunch the current Claude Code process targeting a renderer.
 * @param tuiJustSwitched value for CLAUDE_CODE_TUI_JUST_SWITCHED ("default" | "fullscreen")
 * @param extraArgs       extra CLI args to carry over into the relaunched process
 */
function relaunchInto(tuiJustSwitched: string, extraArgs: string[]) {
  return jPe({
    freshIfNoTranscript: !0,
    extraArgs: extraArgs,
    env: {
      CLAUDE_CODE_TUI_JUST_SWITCHED: tuiJustSwitched,
      ...NRe()
    },
    dropEnv: ["CLAUDE_CODE_NO_FLICKER", "CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN", "CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL"]
  });
}

/** True when the feedback reason is the sentinel "couldn't copy text" string. */
function isCouldntCopyText(reason: string): boolean {
  return reason.toLowerCase().replace(/[^a-z]/g, "") === COULDNT_COPY_TEXT_SENTINEL;
}

/**
 * Feedback prompt component shown when reverting fullscreen -> classic.
 * Collects an optional free-text reason, logs telemetry, then relaunches into
 * the default renderer.
 */
function FullscreenFeedbackPrompt(props) {
  let cache = Nxl.c(20),
    {
      fromEntryPath: fromEntryPath,
      bounce: bounce,
      revertKind: revertKind,
      carryFlags: carryFlags,
      onDone: onDone
    } = props,
    [inputValue, setInputValue] = YPe.useState(""),
    [cursorOffset, setCursorOffset] = YPe.useState(0),
    [submittedReason, setSubmittedReason] = YPe.useState(null),
    {
      columns: columns
    } = _r(),
    submittedRef = YPe.useRef(!1),
    handleSubmit;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) handleSubmit = value => {
    if (submittedRef.current) return;
    submittedRef.current = !0, setSubmittedReason(value.trim());
  }, cache[0] = handleSubmit;else handleSubmit = cache[0];
  let onSubmit = handleSubmit,
    effectFn,
    effectDeps;
  if (cache[1] !== bounce || cache[2] !== carryFlags || cache[3] !== fromEntryPath || cache[4] !== onDone || cache[5] !== revertKind || cache[6] !== submittedReason) effectFn = () => {
    if (submittedReason === null) return;
    let cancelled = !1;
    return (async () => {
      if (submittedReason && !isCouldntCopyText(submittedReason)) {
        let reason = kc(submittedReason).slice(0, REASON_MAX_LENGTH);
        await vF("tengu_tui_optout_reason", {
          reason: reason,
          from_entry_path: Le(fromEntryPath),
          bounce: bounce,
          downsell_gate: mZ.downsellGateCached === !0,
          revert_kind: Le(revertKind),
          downsell_seen_count: Ot().fullscreenDownsellSeenCount ?? 0
        }).catch(Ie);
      }
      if (await Kn(UF * 2), cancelled) return;
      relaunchInto("default", carryFlags).catch(err => {
        Ie(err), onDone(`Couldn't switch renderers — ${err instanceof Error ? err.message : String(err)}. The setting was saved; restart Claude Code to apply it.`, {
          display: "system"
        });
      });
    })(), () => {
      cancelled = !0;
    };
  }, effectDeps = [submittedReason, fromEntryPath, bounce, revertKind, carryFlags, onDone], cache[1] = bounce, cache[2] = carryFlags, cache[3] = fromEntryPath, cache[4] = onDone, cache[5] = revertKind, cache[6] = submittedReason, cache[7] = effectFn, cache[8] = effectDeps;else effectFn = cache[7], effectDeps = cache[8];
  YPe.useEffect(effectFn, effectDeps);
  let onConfirmNo, confirmNoOpts;
  if (cache[9] === Symbol.for("react.memo_cache_sentinel")) onConfirmNo = () => onSubmit(""), confirmNoOpts = {
    context: "Settings"
  }, cache[9] = onConfirmNo, cache[10] = confirmNoOpts;else onConfirmNo = cache[9], confirmNoOpts = cache[10];
  if (Or("confirm:no", onConfirmNo, confirmNoOpts), submittedReason !== null) {
    let switchingBackNode;
    if (cache[11] === Symbol.for("react.memo_cache_sentinel")) switchingBackNode = QG.jsx($, {
      paddingX: 1,
      children: QG.jsx(v, {
        dimColor: !0,
        children: "Switching back to the classic renderer…"
      })
    }), cache[11] = switchingBackNode;else switchingBackNode = cache[11];
    return switchingBackNode;
  }
  let onCancel;
  if (cache[12] === Symbol.for("react.memo_cache_sentinel")) onCancel = () => onSubmit(""), cache[12] = onCancel;else onCancel = cache[12];
  let inputGuide, promptText;
  if (cache[13] === Symbol.for("react.memo_cache_sentinel")) inputGuide = QG.jsxs(bn, {
    children: [QG.jsx(at, {
      chord: "enter",
      action: "send"
    }), QG.jsx(dr, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "skip"
    })]
  }), promptText = QG.jsx(v, {
    children: "To help us make fullscreen mode better, what made you switch back?"
  }), cache[13] = inputGuide, cache[14] = promptText;else inputGuide = cache[13], promptText = cache[14];
  let promptMarker;
  if (cache[15] === Symbol.for("react.memo_cache_sentinel")) promptMarker = QG.jsx(v, {
    children: ">"
  }), cache[15] = promptMarker;else promptMarker = cache[15];
  let inputColumns = Math.max(10, columns - 8),
    feedbackNode;
  if (cache[16] !== cursorOffset || cache[17] !== inputValue || cache[18] !== inputColumns) feedbackNode = QG.jsxs(Jn, {
    title: "Fullscreen feedback",
    onCancel: onCancel,
    isCancelActive: !1,
    inputGuide: inputGuide,
    children: [promptText, QG.jsxs($, {
      flexDirection: "row",
      gap: 1,
      children: [promptMarker, QG.jsx(ga, {
        value: inputValue,
        onChange: setInputValue,
        onSubmit: onSubmit,
        focus: !0,
        showCursor: !0,
        columns: inputColumns,
        cursorOffset: cursorOffset,
        onChangeCursorOffset: setCursorOffset
      })]
    })]
  }), cache[16] = cursorOffset, cache[17] = inputValue, cache[18] = inputColumns, cache[19] = feedbackNode;else feedbackNode = cache[19];
  return feedbackNode;
}
var Nxl,
  YPe,
  QG,
  YIo,
  /**
   * /tui slash-command handler.
   * @param addMessage    callback to surface a system message in the conversation
   * @param toolUseContext command/tool context (task registry, flags, etc.)
   * @param rawInput      raw argument string after "/tui"
   */
  call = async (addMessage, toolUseContext, rawInput) => {
    let requested = rawInput.trim().toLowerCase(),
      currentRenderer = Cs() ? "fullscreen" : "default";
    if (requested === "") return addMessage(`Current renderer: ${currentRenderer}. Usage: /tui <${YIo.join("|")}>`, {
      display: "system"
    }), null;
    if (!YIo.includes(requested)) return addMessage(`Unknown renderer "${requested}". Usage: /tui <${YIo.join("|")}>`, {
      display: "system"
    }), null;
    let targetRenderer = requested,
      carryFlags = Qjn(Mr(toolUseContext), Kh(toolUseContext));
    if (Ws()) return addMessage("Background sessions always use the fullscreen renderer so scrolling and mouse work when attached. The tui setting applies to sessions started directly with `claude`.", {
      display: "system"
    }), null;
    if (fD()) return addMessage("Screen-reader mode always uses the classic renderer, so the tui setting has no effect while it is active.", {
      display: "system"
    }), null;
    let wantsFullscreen = targetRenderer === "fullscreen",
      sameAsCurrent = wantsFullscreen === Cs();
    if (sameAsCurrent && Fr().tui !== void 0) return addMessage(`Already using the ${targetRenderer} renderer.`, {
      display: "system"
    }), null;
    if (!sameAsCurrent) {
      let tasks = toolUseContext.taskRegistry.all();
      if (Object.values(tasks).some(task => (task.status === "running" || task.status === "pending") && task.type !== "remote_agent" && task.type !== "mcp_task")) return W("tengu_tui_refused", {
        active_tasks: !0
      }), addMessage("Cannot switch renderers while work is running in the background — wait for it to finish (or stop it via /tasks), then run /tui again.", {
        display: "system"
      }), null;
    }
    let entryPath = Sve(),
      {
        error: saveError
      } = ao("userSettings", {
        tui: targetRenderer
      });
    if (saveError) return addMessage(`Failed to save setting: ${saveError.message}`, {
      display: "system"
    }), null;
    let scrollConfig = XM(),
      bounce = (process.env.CLAUDE_CODE_TUI_JUST_SWITCHED === "fullscreen" || entryPath === "downsell_on" || mZ.downsellGateCached === !0) && targetRenderer === "default";
    if (W("tengu_tui_command", {
      fullscreen: wantsFullscreen,
      from: Le(currentRenderer),
      to: Le(targetRenderer),
      from_entry_path: Le(entryPath),
      session_age_ms: Math.round(process.uptime() * 1000),
      bounce: bounce,
      scroll_decay_curve: scrollConfig.useDecayCurve,
      scroll_base: scrollConfig.base,
      scroll_xtermjs: scrollConfig.xtermJs
    }), sameAsCurrent) return addMessage(`Already using the ${targetRenderer} renderer.`, {
      display: "system"
    }), null;
    if (targetRenderer === "default" && (bounce || entryPath === "gb_on" || entryPath === "settings_on") && G3() && Xs("allow_product_feedback")) return QG.jsx(FullscreenFeedbackPrompt, {
      fromEntryPath: entryPath,
      bounce: bounce,
      revertKind: bounce || entryPath === "gb_on" ? "same_session" : "later_session",
      carryFlags: carryFlags,
      onDone: addMessage
    });
    return relaunchInto(targetRenderer, carryFlags).catch(err => (Ie(err), addMessage(`Couldn't switch renderers — ${err instanceof Error ? err.message : String(err)}. The setting was saved; restart Claude Code to apply it.`, {
      display: "system"
    }), null));
  },
  COULDNT_COPY_TEXT_SENTINEL = "egcouldntcopytext",
  REASON_MAX_LENGTH = 1000;
var JIo = b(() => {
  uc();
  Is();
  di();
  Wo();
  rh();
  ui();
  Ive();
  je();
  ss();
  GM();
  kt();
  Bu();
  vd();
  tr();
  xl();
  tp();
  vn();
  aA();
  xGt();
  y8();
  jIo();
  br();
  Nxl = x(tt(), 1), YPe = x(et(), 1), QG = x(oe(), 1), YIo = ["default", "fullscreen"];
});

export {Fxl,relaunchInto,isCouldntCopyText as lhm,FullscreenFeedbackPrompt as uhm,Nxl,YPe,QG,YIo,call as ihm,COULDNT_COPY_TEXT_SENTINEL as ahm,REASON_MAX_LENGTH as chm,JIo};
