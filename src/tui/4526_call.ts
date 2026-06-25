// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {_t,uo} from "../../vendor/m2468.ts";
import {FE,V1} from "../../vendor/m4006.ts";
import {T$} from "../config/2739_repl.ts";
import {ev} from "../session/2737_V4i.ts";
import {formatTokens as el,Xo} from "../../vendor/m240.ts";
import {applyAutoCompactWindow as v8t,sAo} from "../session/4525_call.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {je} from "../../vendor/m2462.ts";
import {f1} from "../../vendor/m4432.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Auto-compact window configuration dialog (TUI).
 *
 * Exports a single `call` function that either applies a directly-supplied
 * window value (when invoked with a trimmed argument) or opens the interactive
 * {@link AutoCompactWindowDialog} component. The dialog lets the user pick the
 * token window at which auto-compaction triggers; the effective threshold is
 * the minimum of this setting and the model's maximum context window.
 *
 * This is a 1:1 restoration: only local binding names, types, and comments were
 * changed. All control flow, operators (!0/!1), string literals, React-compiler
 * memo-cache slots, and cross-module references are preserved exactly.
 */

/** Module export-table object, wired below via `ft`. */
var Mpl = {};
ft(Mpl, {
  call: () => call
});

// ---------------------------------------------------------------------------
// AutoCompactWindowDialog component
// ---------------------------------------------------------------------------

/**
 * Interactive dialog for selecting the auto-compact token window.
 *
 * `props.onDone(message)` is invoked with a human-readable result message when
 * the user accepts (or cancels), and `props.context` is forwarded to the
 * persistence helper `v8t` when committing a chosen value.
 *
 * Built by the React compiler: `cache` (`t`) holds memoized slot values keyed
 * by the dependency checks below.
 */
function jYp(props) {
  let cache = Lpl.c(52),
    {
      onDone: onDone,
      context: context
    } = props,
    autoCompactWindowSetting = _t(YYp),
    modelMaxWindow = FE(),
    resolvedConfig;
  if (cache[0] !== autoCompactWindowSetting || cache[1] !== modelMaxWindow) resolvedConfig = T$(modelMaxWindow, autoCompactWindowSetting), cache[0] = autoCompactWindowSetting, cache[1] = modelMaxWindow, cache[2] = resolvedConfig;else resolvedConfig = cache[2];
  let {
      window: modelWindow,
      configured: configuredWindow,
      source: configSource
    } = resolvedConfig,
    autoCompactEnabled;
  if (cache[3] === Symbol.for("react.memo_cache_sentinel")) autoCompactEnabled = ev(), cache[3] = autoCompactEnabled;else autoCompactEnabled = cache[3];
  let isAutoCompactEnabled = autoCompactEnabled,
    isCappedByModel = configuredWindow > modelWindow,
    isFromEnv = configSource === "env",
    sourceLabel = configSource === "env" ? "from CLAUDE_CODE_AUTO_COMPACT_WINDOW" : configSource === "settings" ? "from settings" : "auto",
    initialWindow = configSource === "auto" || configSource === "experiment" || configSource === "clientdata" ? U8e : Math.min(lAo, Math.max(aAo, Math.round(configuredWindow / iAo) * iAo)),
    [selectedWindow, setSelectedWindow] = cAo.useState(initialWindow),
    [hasChanged, setHasChanged] = cAo.useState(!1),
    stepWindow;
  if (cache[4] !== isFromEnv) stepWindow = function (direction) {
    if (isFromEnv) return;
    setHasChanged(!0), setSelectedWindow(current => {
      if (current === U8e) return direction > 0 ? aAo : lAo;
      let next = current + direction * iAo;
      if (next < aAo) return U8e;
      if (next > lAo) return U8e;
      return next;
    });
  }, cache[4] = isFromEnv, cache[5] = stepWindow;else stepWindow = cache[5];
  let stepWindowBy = stepWindow,
    cappedSuffix;
  if (cache[6] !== isCappedByModel || cache[7] !== modelWindow) cappedSuffix = isCappedByModel ? ` \xB7 capped to ${el(modelWindow)} by model` : "", cache[6] = isCappedByModel, cache[7] = modelWindow, cache[8] = cappedSuffix;else cappedSuffix = cache[8];
  let cappedSuffixText = cappedSuffix,
    currentSettingDescription;
  if (cache[9] !== cappedSuffixText || cache[10] !== configuredWindow || cache[11] !== configSource || cache[12] !== sourceLabel) currentSettingDescription = configSource === "auto" ? "auto" : configSource === "experiment" || configSource === "clientdata" ? `auto (${el(configuredWindow)} tokens)${cappedSuffixText}` : `${el(configuredWindow)} tokens (${sourceLabel})${cappedSuffixText}`, cache[9] = cappedSuffixText, cache[10] = configuredWindow, cache[11] = configSource, cache[12] = sourceLabel, cache[13] = currentSettingDescription;else currentSettingDescription = cache[13];
  let currentSettingLabel = currentSettingDescription,
    acceptSelection;
  if (cache[14] !== hasChanged || cache[15] !== context || cache[16] !== currentSettingLabel || cache[17] !== onDone || cache[18] !== selectedWindow) acceptSelection = function () {
    if (!hasChanged) {
      onDone(`Auto-compact window unchanged: ${currentSettingLabel}`);
      return;
    }
    let valueArg = selectedWindow === U8e ? "auto" : String(selectedWindow);
    onDone(v8t(valueArg, context));
  }, cache[14] = hasChanged, cache[15] = context, cache[16] = currentSettingLabel, cache[17] = onDone, cache[18] = selectedWindow, cache[19] = acceptSelection;else acceptSelection = cache[19];
  let onAccept = acceptSelection,
    onSelectPrevious,
    onSelectNext;
  if (cache[20] !== stepWindowBy) onSelectPrevious = () => stepWindowBy(1), onSelectNext = () => stepWindowBy(-1), cache[20] = stepWindowBy, cache[21] = onSelectPrevious, cache[22] = onSelectNext;else onSelectPrevious = cache[21], onSelectNext = cache[22];
  let selectBindings;
  if (cache[23] !== onAccept || cache[24] !== onSelectPrevious || cache[25] !== onSelectNext) selectBindings = {
    "select:previous": onSelectPrevious,
    "select:next": onSelectNext,
    "select:accept": onAccept
  }, cache[23] = onAccept, cache[24] = onSelectPrevious, cache[25] = onSelectNext, cache[26] = selectBindings;else selectBindings = cache[26];
  let selectContext;
  if (cache[27] === Symbol.for("react.memo_cache_sentinel")) selectContext = {
    context: "Select"
  }, cache[27] = selectContext;else selectContext = cache[27];
  Oo(selectBindings, selectContext);
  let tabsBindings;
  if (cache[28] !== stepWindowBy) tabsBindings = {
    "tabs:next": () => stepWindowBy(1),
    "tabs:previous": () => stepWindowBy(-1)
  }, cache[28] = stepWindowBy, cache[29] = tabsBindings;else tabsBindings = cache[29];
  let tabsContext;
  if (cache[30] === Symbol.for("react.memo_cache_sentinel")) tabsContext = {
    context: "Tabs"
  }, cache[30] = tabsContext;else tabsContext = cache[30];
  Oo(tabsBindings, tabsContext);
  let selectedWindowLabelText;
  if (cache[31] !== selectedWindow) selectedWindowLabelText = selectedWindow === U8e ? "auto" : `${el(selectedWindow)} tokens`, cache[31] = selectedWindow, cache[32] = selectedWindowLabelText;else selectedWindowLabelText = cache[32];
  let selectedWindowLabel = selectedWindowLabelText,
    subtitle = `Current setting: ${currentSettingLabel}`,
    onCancel;
  if (cache[33] !== currentSettingLabel || cache[34] !== onDone) onCancel = () => onDone(`Auto-compact window unchanged: ${currentSettingLabel}`), cache[33] = currentSettingLabel, cache[34] = onDone, cache[35] = onCancel;else onCancel = cache[35];
  let inputGuide;
  if (cache[36] === Symbol.for("react.memo_cache_sentinel")) inputGuide = rP.jsx(v, {
    dimColor: !0,
    children: rP.jsxs(bn, {
      children: [rP.jsx(at, {
        chord: ["up", "down"],
        action: "change"
      }), rP.jsx(at, {
        chord: "enter",
        action: "apply"
      }), rP.jsx(at, {
        chord: "escape",
        action: "cancel"
      })]
    })
  }), cache[36] = inputGuide;else inputGuide = cache[36];
  let explanationText;
  if (cache[37] === Symbol.for("react.memo_cache_sentinel")) explanationText = rP.jsx(v, {
    children: "This command configures when auto-compaction happens. The actual threshold is the minimum of this setting and your model's maximum context window."
  }), cache[37] = explanationText;else explanationText = cache[37];
  let autoRecommendationText, disabledWarning;
  if (cache[38] === Symbol.for("react.memo_cache_sentinel")) autoRecommendationText = rP.jsxs(v, {
    children: ["The auto setting picks a window tuned for your model and is", " ", rP.jsx(v, {
      bold: !0,
      children: "strongly recommended"
    }), " for the best cost and performance. You can override it below."]
  }), disabledWarning = !isAutoCompactEnabled && rP.jsx(v, {
    color: "warning",
    children: "Auto-compact is currently disabled (see /config)"
  }), cache[38] = autoRecommendationText, cache[39] = disabledWarning;else autoRecommendationText = cache[38], disabledWarning = cache[39];
  let overrideWarning;
  if (cache[40] !== selectedWindow) overrideWarning = selectedWindow !== U8e && rP.jsx(v, {
    color: "warning",
    children: "Overriding auto may result in high token usage, especially when resuming long sessions."
  }), cache[40] = selectedWindow, cache[41] = overrideWarning;else overrideWarning = cache[41];
  let selectionRow;
  if (cache[42] !== selectedWindowLabel || cache[43] !== isFromEnv) selectionRow = isFromEnv ? rP.jsx(v, {
    color: "warning",
    children: "CLAUDE_CODE_AUTO_COMPACT_WINDOW is set and takes precedence. Unset it to change this setting here."
  }) : rP.jsxs($, {
    children: [rP.jsx(v, {
      children: "Select auto-compact window: "
    }), rP.jsx(v, {
      bold: !0,
      color: "suggestion",
      children: selectedWindowLabel
    })]
  }), cache[42] = selectedWindowLabel, cache[43] = isFromEnv, cache[44] = selectionRow;else selectionRow = cache[44];
  let dialogBody;
  if (cache[45] !== overrideWarning || cache[46] !== selectionRow) dialogBody = rP.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [explanationText, autoRecommendationText, disabledWarning, overrideWarning, selectionRow]
  }), cache[45] = overrideWarning, cache[46] = selectionRow, cache[47] = dialogBody;else dialogBody = cache[47];
  let dialog;
  if (cache[48] !== subtitle || cache[49] !== onCancel || cache[50] !== dialogBody) dialog = rP.jsx(Jn, {
    title: "Auto-compact window",
    subtitle: subtitle,
    onCancel: onCancel,
    inputGuide: inputGuide,
    children: dialogBody
  }), cache[48] = subtitle, cache[49] = onCancel, cache[50] = dialogBody, cache[51] = dialog;else dialog = cache[51];
  return dialog;
}

/** Selector: extracts the configured auto-compact window from app state. */
function YYp(state) {
  return state.autoCompactWindow;
}

// ---------------------------------------------------------------------------
// Module-level vars + numeric window constants
// ---------------------------------------------------------------------------

var Lpl,
  cAo,
  rP,
  /** Window step / rounding granularity (100k tokens). */
  iAo = 1e5,
  /** Minimum selectable window (100k tokens). */
  aAo = 1e5,
  /** Maximum selectable window (1M tokens). */
  lAo = 1e6,
  /** Sentinel value representing the "auto" window (0). */
  U8e = 0,
  /**
   * Slash-command entry point. With a trimmed argument it persists that value
   * directly (returning `null`, no UI); otherwise it emits the dialog-opened
   * telemetry event and returns the {@link jYp} dialog component.
   */
  call = async (applyResult, context, rawArg) => {
    let trimmedArg = rawArg?.trim() || "";
    if (trimmedArg) {
      let persistResult = v8t(trimmedArg, context);
      return applyResult(persistResult), null;
    }
    return W("tengu_autocompact_dialog_opened", {
      source: Ve("dialog")
    }), rP.jsx(jYp, {
      onDone: applyResult,
      context: context
    });
  };

// ---------------------------------------------------------------------------
// Lazy initializer — mirrors original `b(() => { ... })` structure exactly
// ---------------------------------------------------------------------------

var Npl = b(() => {
  Is();
  di();
  Wo();
  V1();
  je();
  ss();
  kt();
  f1();
  uo();
  Xo();
  sAo();
  Lpl = x(tt(), 1), cAo = x(et(), 1), rP = x(oe(), 1);
});

export {Mpl,jYp,YYp,Lpl,cAo,rP,iAo,aAo,lAo,U8e,call as JYp,Npl};
