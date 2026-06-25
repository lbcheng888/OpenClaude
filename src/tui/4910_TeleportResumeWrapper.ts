// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {W0l,G0l} from "../session/4908_source.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {g4,wnt} from "../config/2576_wnt.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {gd,xw} from "./3853_mode.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {K0l,z0l} from "../../vendor/m4908.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var J0l = {};
ft(J0l, {
  TeleportResumeWrapper: () => TeleportResumeWrapper
});
/**
 * Wrapper around the teleport session picker. Drives the resume flow:
 * fires telemetry on mount, resumes the selected session, and renders the
 * loading / error / picker views based on the current resume state.
 */
function TeleportResumeWrapper(props) {
  let cache = j0l.c(30),
    {
      onComplete: onComplete,
      onCancel: onCancel,
      onError: onError,
      isEmbedded: isEmbedded,
      source: source
    } = props,
    isEmbeddedResolved = isEmbedded === void 0 ? !1 : isEmbedded,
    {
      resumeSession: resumeSession,
      isResuming: isResuming,
      error: error,
      selectedSession: selectedSession
    } = W0l(source),
    telemetryEffect,
    telemetryEffectDeps;
  if (cache[0] !== source) telemetryEffect = () => {
    W("tengu_teleport_started", {
      source: Le(source)
    });
  }, telemetryEffectDeps = [source], cache[0] = source, cache[1] = telemetryEffect, cache[2] = telemetryEffectDeps;else telemetryEffect = cache[1], telemetryEffectDeps = cache[2];
  Y0l.useEffect(telemetryEffect, telemetryEffectDeps);
  let handleSelect;
  if (cache[3] !== error || cache[4] !== onComplete || cache[5] !== onError || cache[6] !== resumeSession) handleSelect = async session => {
    let result = await resumeSession(session);
    if (result) onComplete(result);else if (error) {
      if (onError) onError(error.message, error.formattedMessage);
    }
  }, cache[3] = error, cache[4] = onComplete, cache[5] = onError, cache[6] = resumeSession, cache[7] = handleSelect;else handleSelect = cache[7];
  let handleSelectFinal = handleSelect,
    handleCancel;
  if (cache[8] !== onCancel) handleCancel = () => {
    W("tengu_teleport_cancelled", {}), onCancel();
  }, cache[8] = onCancel, cache[9] = handleCancel;else handleCancel = cache[9];
  let handleCancelFinal = handleCancel,
    shouldInterrupt = !!error && !onError,
    interruptOptions;
  if (cache[10] !== shouldInterrupt) interruptOptions = {
    context: "Global",
    isActive: shouldInterrupt
  }, cache[10] = shouldInterrupt, cache[11] = interruptOptions;else interruptOptions = cache[11];
  Or("app:interrupt", handleCancelFinal, interruptOptions);
  let shouldConfirmCancel;
  if (cache[12] !== error || cache[13] !== onError) shouldConfirmCancel = !!error && !onError && g4(), cache[12] = error, cache[13] = onError, cache[14] = shouldConfirmCancel;else shouldConfirmCancel = cache[14];
  let confirmCancelOptions;
  if (cache[15] !== shouldConfirmCancel) confirmCancelOptions = {
    context: "Confirmation",
    isActive: shouldConfirmCancel
  }, cache[15] = shouldConfirmCancel, cache[16] = confirmCancelOptions;else confirmCancelOptions = cache[16];
  if (Or("confirm:no", handleCancelFinal, confirmCancelOptions), isResuming && selectedSession) {
    let resumingRow;
    if (cache[17] === Symbol.for("react.memo_cache_sentinel")) resumingRow = k6.jsxs($, {
      flexDirection: "row",
      children: [k6.jsx(gd, {}), k6.jsx(v, {
        bold: !0,
        children: "Resuming session…"
      })]
    }), cache[17] = resumingRow;else resumingRow = cache[17];
    let loadingView;
    if (cache[18] !== selectedSession.title) loadingView = k6.jsxs($, {
      flexDirection: "column",
      padding: 1,
      children: [resumingRow, k6.jsxs(v, {
        dimColor: !0,
        children: ['Loading "', selectedSession.title, '"…']
      })]
    }), cache[18] = selectedSession.title, cache[19] = loadingView;else loadingView = cache[19];
    return loadingView;
  }
  if (error && !onError) {
    let errorHeading;
    if (cache[20] === Symbol.for("react.memo_cache_sentinel")) errorHeading = k6.jsx(v, {
      bold: !0,
      color: "error",
      children: "Failed to resume session"
    }), cache[20] = errorHeading;else errorHeading = cache[20];
    let errorBody;
    if (cache[21] !== error.message) errorBody = k6.jsx(v, {
      dimColor: !0,
      children: error.message
    }), cache[21] = error.message, cache[22] = errorBody;else errorBody = cache[22];
    let escapeHint;
    if (cache[23] === Symbol.for("react.memo_cache_sentinel")) escapeHint = k6.jsx($, {
      marginTop: 1,
      children: k6.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: k6.jsx(at, {
          chord: "escape",
          action: "cancel"
        })
      })
    }), cache[23] = escapeHint;else escapeHint = cache[23];
    let errorView;
    if (cache[24] !== errorBody) errorView = k6.jsxs($, {
      flexDirection: "column",
      padding: 1,
      children: [errorHeading, errorBody, escapeHint]
    }), cache[24] = errorBody, cache[25] = errorView;else errorView = cache[25];
    return errorView;
  }
  let pickerElement;
  if (cache[26] !== handleCancelFinal || cache[27] !== handleSelectFinal || cache[28] !== isEmbeddedResolved) pickerElement = k6.jsx(K0l, {
    onSelect: handleSelectFinal,
    onCancel: handleCancelFinal,
    isEmbedded: isEmbeddedResolved
  }), cache[26] = handleCancelFinal, cache[27] = handleSelectFinal, cache[28] = isEmbeddedResolved, cache[29] = pickerElement;else pickerElement = cache[29];
  return pickerElement;
}
var j0l, Y0l, k6;
var BIo = b(() => {
  kt();
  G0l();
  je();
  ss();
  wnt();
  Wo();
  z0l();
  xw();
  j0l = x(tt(), 1), Y0l = x(et(), 1), k6 = x(oe(), 1);
});
export {J0l,TeleportResumeWrapper,j0l,Y0l,k6,BIo};
