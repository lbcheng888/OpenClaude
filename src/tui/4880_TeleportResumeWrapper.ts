// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {MEl as fbl,NEl as Abl} from "../session/4878_source.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {Or as Ir,Ts as _s} from "../../vendor/m2542.ts";
import {Y4 as M4,Cet as oet} from "../config/2565_Cet.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {tp as op,_x as fx} from "./3835_mode.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {FEl as gbl,UEl as _bl} from "../../vendor/m4878.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var nA4 = {};
pt(nA4, {
  TeleportResumeWrapper: () => TeleportResumeWrapper
});
function TeleportResumeWrapper(props) {
  let cache = lA4.c(30),
    {
      onComplete: onComplete,
      onCancel: onCancel,
      onError: onError,
      isEmbedded: isEmbedded,
      source: source
    } = props,
    isEmbeddedResolved = isEmbedded === undefined ? false : isEmbedded,
    {
      resumeSession: resumeSession,
      isResuming: isResuming,
      error: error,
      selectedSession: selectedSession
    } = fbl(source),
    telemetryEffect,
    telemetryEffectDeps;
  if (cache[0] !== source) telemetryEffect = () => {
    j("tengu_teleport_started", {
      source: Ue(source)
    });
  }, telemetryEffectDeps = [source], cache[0] = source, cache[1] = telemetryEffect, cache[2] = telemetryEffectDeps;else telemetryEffect = cache[1], telemetryEffectDeps = cache[2];
  Zu.useEffect(telemetryEffect, telemetryEffectDeps);
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
    j("tengu_teleport_cancelled", {}), onCancel();
  }, cache[8] = onCancel, cache[9] = handleCancel;else handleCancel = cache[9];
  let handleCancelFinal = handleCancel,
    shouldInterrupt = !!error && !onError,
    interruptOptions;
  if (cache[10] !== shouldInterrupt) interruptOptions = {
    context: "Global",
    isActive: shouldInterrupt
  }, cache[10] = shouldInterrupt, cache[11] = interruptOptions;else interruptOptions = cache[11];
  Ir("app:interrupt", handleCancelFinal, interruptOptions);
  let shouldConfirmCancel;
  if (cache[12] !== error || cache[13] !== onError) shouldConfirmCancel = !!error && !onError && M4(), cache[12] = error, cache[13] = onError, cache[14] = shouldConfirmCancel;else shouldConfirmCancel = cache[14];
  let confirmCancelOptions;
  if (cache[15] !== shouldConfirmCancel) confirmCancelOptions = {
    context: "Confirmation",
    isActive: shouldConfirmCancel
  }, cache[15] = shouldConfirmCancel, cache[16] = confirmCancelOptions;else confirmCancelOptions = cache[16];
  if (Ir("confirm:no", handleCancelFinal, confirmCancelOptions), isResuming && selectedSession) {
    let resumingRow;
    if (cache[17] === Symbol.for("react.memo_cache_sentinel")) resumingRow = Zu.default.createElement(B, {
      flexDirection: "row"
    }, Zu.default.createElement(op, null), Zu.default.createElement(w, {
      bold: true
    }, "Resuming session\u2026")), cache[17] = resumingRow;else resumingRow = cache[17];
    let loadingView;
    if (cache[18] !== selectedSession.title) loadingView = Zu.default.createElement(B, {
      flexDirection: "column",
      padding: 1
    }, resumingRow, Zu.default.createElement(w, {
      dimColor: true
    }, 'Loading "', selectedSession.title, '"\u2026')), cache[18] = selectedSession.title, cache[19] = loadingView;else loadingView = cache[19];
    return loadingView;
  }
  if (error && !onError) {
    let errorHeading;
    if (cache[20] === Symbol.for("react.memo_cache_sentinel")) errorHeading = Zu.default.createElement(w, {
      bold: true,
      color: "error"
    }, "Failed to resume session"), cache[20] = errorHeading;else errorHeading = cache[20];
    let errorBody;
    if (cache[21] !== error.message) errorBody = Zu.default.createElement(w, {
      dimColor: true
    }, error.message), cache[21] = error.message, cache[22] = errorBody;else errorBody = cache[22];
    let escapeHint;
    if (cache[23] === Symbol.for("react.memo_cache_sentinel")) escapeHint = Zu.default.createElement(B, {
      marginTop: 1
    }, Zu.default.createElement(w, {
      dimColor: true,
      italic: true
    }, Zu.default.createElement(lt, {
      chord: "escape",
      action: "cancel"
    }))), cache[23] = escapeHint;else escapeHint = cache[23];
    let errorView;
    if (cache[24] !== errorBody) errorView = Zu.default.createElement(B, {
      flexDirection: "column",
      padding: 1
    }, errorHeading, errorBody, escapeHint), cache[24] = errorBody, cache[25] = errorView;else errorView = cache[25];
    return errorView;
  }
  let pickerElement;
  if (cache[26] !== handleCancelFinal || cache[27] !== handleSelectFinal || cache[28] !== isEmbeddedResolved) pickerElement = Zu.default.createElement(gbl, {
    onSelect: handleSelectFinal,
    onCancel: handleCancelFinal,
    isEmbedded: isEmbeddedResolved
  }), cache[26] = handleCancelFinal, cache[27] = handleSelectFinal, cache[28] = isEmbeddedResolved, cache[29] = pickerElement;else pickerElement = cache[29];
  return pickerElement;
}
var lA4, Zu;
var gCo = b(() => {
  Ct();
  Abl();
  Je();
  _s();
  oet();
  ts();
  _bl();
  fx();
  lA4 = L(nt(), 1), Zu = L(Te(), 1);
});

export {nA4 as qEl,TeleportResumeWrapper,lA4 as $El,Zu as V9,gCo as bvo};
