// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {nxr,Hf,v3,$l,Goe,fXe,WS} from "../api/1453_month.ts";
import {getMainLoopModel as gs,getCanonicalName as So,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {uF,hXe,h7} from "../telemetry/1454_model.ts";
import {nYn,r0o,rYn,o0o} from "../session/4942_cacheBreakerPhrase.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {XPe,bDl,tYn} from "../../vendor/m4940.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {formatDuration as Fi,Xo} from "../../vendor/m240.ts";
import {Sx,fne} from "../../vendor/m4618.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var ADl = {};
ft(ADl, {
  call: () => call,
  FastModePicker: () => FastModePicker
});
/**
 * FastModePicker — confirmation dialog for toggling Claude Code "Fast mode"
 * (high-speed model mode, research preview). Renders ON/OFF state, current
 * fast-mode model, cooldown/limit warnings and keyboard input guide.
 *
 * @param props - { onDone: (msg, opts?) => void, unavailableReason: string | null }
 */
function FastModePicker(props: { onDone: (msg: any, opts?: any) => void; unavailableReason: string | null }) {
  let cache = EDl.c(32),
    {
      onDone: onDone,
      unavailableReason: unavailableReason
    } = props,
    mainLoopModel = _t(Fhm),
    {
      addNotification: addNotification
    } = Ci(),
    initialFastMode = _t(Nhm),
    setAppState = bo(),
    [fastModeEnabled, setFastModeEnabled] = CDl.useState(initialFastMode ?? !1),
    fastStatus0;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) fastStatus0 = nxr(), cache[0] = fastStatus0;else fastStatus0 = cache[0];
  let fastStatus = fastStatus0,
    isCooldown = fastStatus.status === "cooldown",
    isUnavailable = unavailableReason !== null,
    fastModeModelLabel0;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) {
    let currentModel = gs(),
      modelName = Hf(currentModel) ? So(currentModel) : "claude-opus-4-8";
    fastModeModelLabel0 = uF(hXe(!0, modelName)), cache[1] = fastModeModelLabel0;
  } else fastModeModelLabel0 = cache[1];
  let fastModeModelLabel = fastModeModelLabel0,
    handleConfirm0;
  if (cache[2] !== addNotification || cache[3] !== fastModeEnabled || cache[4] !== isUnavailable || cache[5] !== mainLoopModel || cache[6] !== onDone || cache[7] !== setAppState) handleConfirm0 = function () {
    if (isUnavailable) return;
    if (nYn(fastModeEnabled, setAppState), W("tengu_fast_mode_toggled", {
      enabled: fastModeEnabled,
      source: Ve("picker")
    }), fastModeEnabled) {
      let prefix = XPe(fastModeEnabled),
        modelSetSuffix = !Hf(mainLoopModel) ? ` \xB7 model set to ${v3()}` : "",
        notification = r0o();
      if (notification) addNotification(notification);
      onDone(`${prefix} Fast mode ON${modelSetSuffix} \xB7 ${fastModeModelLabel}`);
    } else setAppState(Mhm), onDone("Fast mode OFF");
  }, cache[2] = addNotification, cache[3] = fastModeEnabled, cache[4] = isUnavailable, cache[5] = mainLoopModel, cache[6] = onDone, cache[7] = setAppState, cache[8] = handleConfirm0;else handleConfirm0 = cache[8];
  let handleConfirm = handleConfirm0,
    handleCancel0;
  if (cache[9] !== initialFastMode || cache[10] !== isUnavailable || cache[11] !== onDone || cache[12] !== setAppState) handleCancel0 = function () {
    if (isUnavailable) {
      if (initialFastMode) nYn(!1, setAppState);
      onDone("Fast mode OFF", {
        display: "system"
      });
      return;
    }
    let message = initialFastMode ? `${XPe()} Kept Fast mode ON` : "Kept Fast mode OFF";
    onDone(message, {
      display: "system"
    });
  }, cache[9] = initialFastMode, cache[10] = isUnavailable, cache[11] = onDone, cache[12] = setAppState, cache[13] = handleCancel0;else handleCancel0 = cache[13];
  let handleCancel = handleCancel0,
    handleToggle0;
  if (cache[14] !== isUnavailable) handleToggle0 = function () {
    if (isUnavailable) return;
    setFastModeEnabled(Lhm);
  }, cache[14] = isUnavailable, cache[15] = handleToggle0;else handleToggle0 = cache[15];
  let handleToggle = handleToggle0,
    keyBindings0;
  if (cache[16] !== handleConfirm || cache[17] !== handleToggle) keyBindings0 = {
    "confirm:yes": handleConfirm,
    "confirm:nextField": handleToggle,
    "confirm:next": handleToggle,
    "confirm:previous": handleToggle,
    "confirm:cycleMode": handleToggle,
    "confirm:toggle": handleToggle
  }, cache[16] = handleConfirm, cache[17] = handleToggle, cache[18] = keyBindings0;else keyBindings0 = cache[18];
  let keyBindingOptions;
  if (cache[19] === Symbol.for("react.memo_cache_sentinel")) keyBindingOptions = {
    context: "Confirmation"
  }, cache[19] = keyBindingOptions;else keyBindingOptions = cache[19];
  Oo(keyBindings0, keyBindingOptions);
  let title0;
  if (cache[20] === Symbol.for("react.memo_cache_sentinel")) title0 = yv.jsxs(v, {
    children: [yv.jsx(bDl, {
      cooldown: isCooldown
    }), " Fast mode (research preview)"]
  }), cache[20] = title0;else title0 = cache[20];
  let title = title0,
    subtitleModelName;
  if (cache[21] === Symbol.for("react.memo_cache_sentinel")) subtitleModelName = v3(), cache[21] = subtitleModelName;else subtitleModelName = cache[21];
  let inputGuide;
  if (cache[22] !== isUnavailable) inputGuide = isUnavailable ? yv.jsx(at, {
    chord: "escape",
    action: "cancel"
  }) : yv.jsxs(bn, {
    children: [yv.jsx(at, {
      chord: "tab",
      action: "toggle"
    }), yv.jsx(at, {
      chord: "enter",
      action: "confirm"
    }), yv.jsx(at, {
      chord: "escape",
      action: "cancel"
    })]
  }), cache[22] = isUnavailable, cache[23] = inputGuide;else inputGuide = cache[23];
  let body;
  if (cache[24] !== fastModeEnabled || cache[25] !== unavailableReason) body = unavailableReason ? yv.jsx($, {
    marginLeft: 2,
    children: yv.jsx(Ba, {
      error: unavailableReason
    })
  }) : yv.jsxs(yv.Fragment, {
    children: [yv.jsx($, {
      flexDirection: "column",
      gap: 0,
      marginLeft: 2,
      children: yv.jsxs($, {
        flexDirection: "row",
        gap: 2,
        children: [yv.jsx(v, {
          bold: !0,
          children: "Fast mode"
        }), yv.jsx(v, {
          color: fastModeEnabled ? "fastMode" : void 0,
          bold: fastModeEnabled,
          children: fastModeEnabled ? "ON " : "OFF"
        }), yv.jsx(v, {
          dimColor: !0,
          children: fastModeModelLabel
        })]
      })
    }), isCooldown && fastStatus.status === "cooldown" && yv.jsx($, {
      marginLeft: 2,
      children: yv.jsxs(v, {
        color: "warning",
        children: [fastStatus.reason === "overloaded" ? "Fast mode overloaded and is temporarily unavailable" : "You've hit your fast limit", " \xB7 resets in ", Fi(fastStatus.resetAt - Date.now(), {
          hideTrailingZeros: !0
        })]
      })
    })]
  }), cache[24] = fastModeEnabled, cache[25] = unavailableReason, cache[26] = body;else body = cache[26];
  let docsLink;
  if (cache[27] === Symbol.for("react.memo_cache_sentinel")) docsLink = yv.jsx(Sx, {
    url: "https://code.claude.com/docs/en/fast-mode"
  }), cache[27] = docsLink;else docsLink = cache[27];
  let dialog;
  if (cache[28] !== handleCancel || cache[29] !== inputGuide || cache[30] !== body) dialog = yv.jsxs(Jn, {
    title: title,
    subtitle: `High-speed mode for ${subtitleModelName}. Draws from usage credits at a higher rate. Separate rate limits apply.`,
    onCancel: handleCancel,
    color: "fastMode",
    inputGuide: inputGuide,
    children: [body, docsLink]
  }), cache[28] = handleCancel, cache[29] = inputGuide, cache[30] = body, cache[31] = dialog;else dialog = cache[31];
  return dialog;
}
/** Toggle reducer: flip the boolean fast-mode flag. */
function Lhm(prev: boolean) {
  return !prev;
}
/** App-state reducer: clear fastMode flag. */
function Mhm(state: any) {
  return {
    ...state,
    fastMode: !1
  };
}
/** Selector: read fastMode flag from app state. */
function Nhm(state: any) {
  return state.fastMode;
}
/** Selector: read the main-loop model from app state. */
function Fhm(state: any) {
  return state.mainLoopModel;
}
/**
 * Slash-command entry point for fast mode. Handles "on"/"off" shortcut args
 * directly, otherwise renders the FastModePicker confirmation dialog.
 *
 * @param onDone - callback to emit a result message
 * @param ctx - command context with getAppState/setAppState/onQueryEvent
 * @param arg - optional raw argument string ("on" | "off")
 */
async function call(onDone: (msg: any) => void, ctx: { getAppState: any; setAppState: any; onQueryEvent: any }, arg?: string) {
  if (!$l()) return onDone(Goe() ?? "Fast mode is not available"), null;
  await fXe();
  let normalizedArg = arg?.trim().toLowerCase();
  if (normalizedArg === "on" || normalizedArg === "off") {
    let result = await rYn(normalizedArg === "on", ctx.getAppState, ctx.setAppState, "shortcut", ctx.onQueryEvent);
    return onDone(result), null;
  }
  let unavailableReason = Goe();
  return W("tengu_fast_mode_picker_shown", {
    unavailable_reason: unavailableReason ?? ""
  }), yv.jsx(FastModePicker, {
    onDone: onDone,
    unavailableReason: unavailableReason
  });
}
var EDl, CDl, yv;
var s0o = b(() => {
  Is();
  di();
  fne();
  I_();
  Wo();
  tYn();
  fd();
  je();
  ss();
  kt();
  uo();
  WS();
  Xo();
  Ro();
  h7();
  o0o();
  EDl = x(tt(), 1), CDl = x(et(), 1), yv = x(oe(), 1);
});

export {ADl,FastModePicker,Lhm,Mhm,Nhm,Fhm,call as Bhm,EDl,CDl,yv,s0o};
