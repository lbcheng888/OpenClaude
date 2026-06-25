// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {bo,_t,uo} from "../../vendor/m2468.ts";
import {YYn,tVt} from "../../vendor/m5086.ts";
import {WNl,Ixo} from "./5086_onDone.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve} from "../../vendor/m5.ts";
import {Login as mxe,runPostLoginHooks as pxe,$3t} from "./4014_runPostLoginHooks.ts";
import {getOauthAccountInfo as hc,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {_g,zR} from "../../vendor/m2562.ts";
import {REMOTE_CONTROL_DISCONNECTED_MSG as Ite,BRIDGE_LOGIN_INSTRUCTION as x6e} from "../core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bE,Pie} from "../../vendor/m2566.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {KPt,fd} from "../../vendor/m2469.ts";
import {Dq,ate} from "../../vendor/m3839.ts";
import {getBridgeDisabledReason as JYn,pH} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {zYn,jYn} from "../config/5085_ISSUES_EXPLAINER.ts";
import {getBridgeAccessToken as Q1,BY} from "../../vendor/m4242.ts";
import {enrollTrustedDeviceIfNeeded as Lto,isTrustedDeviceUnenrolled as BBt,isProactiveEnrollmentDisabled as EIe,PROACTIVE_ENROLLMENT_DISABLED_MESSAGE as NBt,Fj} from "../telemetry/3343_untrustedDeviceHint.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {Kht} from "../../vendor/m4785.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * /remote-control command UI for Claude Code.
 *
 * Wires up the REPL bridge that exposes the current session to the Claude
 * mobile app / claude.ai/code. Handles preflight checks (auth, enrollment,
 * trusted-device requirements), connecting/disconnecting the bridge, and the
 * QR-code disconnect dialog.
 *
 * NOTE: This module is the v190 successor of the v185 module that previously
 * lived at the same call slot. The v185 readable port was a different command
 * (`/cd`), so identifier names here are derived from the v190 structure itself.
 */
var XNl = {};
ft(XNl, {
  call: () => call
});
/**
 * Remote-control connect flow component.
 * @param props - { onDone, name, context }
 */
function HSm(props) {
  let cache = Pxo.c(18),
    {
      onDone,
      name,
      context
    } = props,
    setStore = bo(),
    bridgeConnected = _t(PSm),
    bridgeEnabled = _t(DSm),
    bridgeOutboundOnly = _t(xSm),
    [showOutboundWarning, setShowOutboundWarning] = $ue.useState(!1),
    [showEnrollLogin, setShowEnrollLogin] = $ue.useState(!1),
    [previousAccount] = $ue.useState(ISm),
    connect;
  if (cache[0] !== name || cache[1] !== onDone || cache[2] !== setStore) connect = function () {
    if (YYn(), WNl()) {
      setStore(state => {
        if (state.showRemoteCallout) return state;
        return {
          ...state,
          showRemoteCallout: !0,
          replBridgeInitialName: name
        };
      }), onDone("", {
        display: "system"
      });
      return;
    }
    W("tengu_bridge_command", {
      action: Ve("connect")
    }), setStore(state => {
      if (state.replBridgeEnabled && !state.replBridgeOutboundOnly) return state;
      return {
        ...state,
        replBridgeEnabled: !0,
        replBridgeExplicit: !0,
        replBridgeOutboundOnly: !1,
        replBridgeInitialName: name
      };
    }), onDone("", {
      display: "system"
    });
  }, cache[0] = name, cache[1] = onDone, cache[2] = setStore, cache[3] = connect;else connect = cache[3];
  let onConnect = connect,
    runPreflight;
  if (cache[4] !== onConnect || cache[5] !== onDone || cache[6] !== bridgeConnected || cache[7] !== bridgeEnabled || cache[8] !== bridgeOutboundOnly) runPreflight = () => {
    if ((bridgeConnected || bridgeEnabled) && !bridgeOutboundOnly) {
      setShowOutboundWarning(!0);
      return;
    }
    let cancelled = !1;
    return (async () => {
      let result = await YNl();
      if (cancelled) return;
      if (result?.kind === "error") {
        W("tengu_bridge_command", {
          action: Ve("preflight_failed")
        }), onDone(result.message, {
          display: "system"
        });
        return;
      }
      if (result?.kind === "unenrolled-trusted-device") {
        W("tengu_bridge_command", {
          action: Ve("preflight_login_for_enrollment")
        }), setShowEnrollLogin(!0);
        return;
      }
      onConnect();
    })(), () => {
      cancelled = !0;
    };
  }, cache[4] = onConnect, cache[5] = onDone, cache[6] = bridgeConnected, cache[7] = bridgeEnabled, cache[8] = bridgeOutboundOnly, cache[9] = runPreflight;else runPreflight = cache[9];
  let effectDeps;
  if (cache[10] === Symbol.for("react.memo_cache_sentinel")) effectDeps = [], cache[10] = effectDeps;else effectDeps = cache[10];
  if ($ue.useEffect(runPreflight, effectDeps), showOutboundWarning) {
    let warningNode;
    if (cache[11] !== onDone) warningNode = xH.jsx(OSm, {
      onDone
    }), cache[11] = onDone, cache[12] = warningNode;else warningNode = cache[12];
    return warningNode;
  }
  if (showEnrollLogin) {
    if (!context) return onDone("Your organization requires Trusted Devices for Remote Control, but this device is not enrolled. Please run `/login` in Claude Code to enroll this device.", {
      display: "system"
    }), null;
    let loginNode;
    if (cache[13] !== context || cache[14] !== onConnect || cache[15] !== onDone || cache[16] !== previousAccount) loginNode = xH.jsx(mxe, {
      startingMessage: "Sign in to enroll this device for Remote Control.",
      onDone: async account => {
        if (await pxe(context, account, {
          awaitEnrollment: !0,
          previousAccount
        }), !account) {
          W("tengu_bridge_command", {
            action: Ve("preflight_login_canceled")
          }), onDone("Sign-in canceled. Run /remote-control after enrolling this device.", {
            display: "system"
          });
          return;
        }
        let recheck = await YNl();
        if (recheck?.kind === "error") {
          onDone(recheck.message, {
            display: "system"
          });
          return;
        }
        if (recheck?.kind === "unenrolled-trusted-device") {
          W("tengu_bridge_command", {
            action: Ve("preflight_enrollment_did_not_complete")
          }), onDone("Signed in, but device enrollment didn't complete. Run /remote-control again, or check the debug log for [trusted-device] messages.", {
            display: "system"
          });
          return;
        }
        onConnect();
      }
    }), cache[13] = context, cache[14] = onConnect, cache[15] = onDone, cache[16] = previousAccount, cache[17] = loginNode;else loginNode = cache[17];
    return loginNode;
  }
  return null;
}
/** Snapshot the current account/org uuids for enrollment comparisons. */
function ISm() {
  let account = hc();
  return account && {
    accountUuid: account.accountUuid,
    organizationUuid: account.organizationUuid
  };
}
/** Selector: bridge is outbound-only. */
function xSm(state) {
  return state.replBridgeOutboundOnly;
}
/** Selector: bridge is enabled. */
function DSm(state) {
  return state.replBridgeEnabled;
}
/** Selector: bridge is connected. */
function PSm(state) {
  return state.replBridgeConnected;
}
/**
 * Bridge disconnect dialog with QR code and disconnect/continue options.
 * @param props - { onDone }
 */
function OSm(props) {
  let cache = Pxo.c(64),
    {
      onDone
    } = props;
  _g("bridge-disconnect-dialog");
  let setStore = bo(),
    sessionUrl = _t(WSm),
    connectUrl = _t(qSm),
    sessionActive = _t($Sm),
    [selectedIndex, setSelectedIndex] = $ue.useState(2),
    [showQr, setShowQr] = $ue.useState(!1),
    [qrText, setQrText] = $ue.useState(""),
    displayUrl = sessionActive ? sessionUrl : connectUrl,
    renderQr,
    qrDeps;
  if (cache[0] !== displayUrl || cache[1] !== showQr) renderQr = () => {
    if (!showQr || !displayUrl) {
      setQrText("");
      return;
    }
    JNl.toString(displayUrl, {
      type: "utf8",
      errorCorrectionLevel: "L",
      small: !0
    }).then(setQrText).catch(() => setQrText(""));
  }, qrDeps = [showQr, displayUrl], cache[0] = displayUrl, cache[1] = showQr, cache[2] = renderQr, cache[3] = qrDeps;else renderQr = cache[2], qrDeps = cache[3];
  $ue.useEffect(renderQr, qrDeps);
  let disconnect;
  if (cache[4] !== onDone || cache[5] !== setStore) disconnect = function () {
    setStore(USm), W("tengu_bridge_command", {
      action: Ve("disconnect")
    }), onDone(Ite, {
      display: "system"
    });
  }, cache[4] = onDone, cache[5] = setStore, cache[6] = disconnect;else disconnect = cache[6];
  let onDisconnect = disconnect,
    toggle;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) toggle = function () {
    setShowQr(BSm);
  }, cache[7] = toggle;else toggle = cache[7];
  let onToggleQr = toggle,
    cont;
  if (cache[8] !== onDone) cont = function () {
    onDone(void 0, {
      display: "skip"
    });
  }, cache[8] = onDone, cache[9] = cont;else cont = cache[9];
  let onContinue = cont,
    selectNext,
    selectPrevious;
  if (cache[10] === Symbol.for("react.memo_cache_sentinel")) selectNext = () => setSelectedIndex(FSm), selectPrevious = () => setSelectedIndex(NSm), cache[10] = selectNext, cache[11] = selectPrevious;else selectNext = cache[10], selectPrevious = cache[11];
  let selectHandlers;
  if (cache[12] !== selectedIndex || cache[13] !== onContinue || cache[14] !== onDisconnect) selectHandlers = {
    "select:next": selectNext,
    "select:previous": selectPrevious,
    "select:accept": () => {
      if (selectedIndex === 0) onDisconnect();else if (selectedIndex === 1) onToggleQr();else onContinue();
    }
  }, cache[12] = selectedIndex, cache[13] = onContinue, cache[14] = onDisconnect, cache[15] = selectHandlers;else selectHandlers = cache[15];
  let selectOptions;
  if (cache[16] === Symbol.for("react.memo_cache_sentinel")) selectOptions = {
    context: "Select"
  }, cache[16] = selectOptions;else selectOptions = cache[16];
  Oo(selectHandlers, selectOptions);
  let DialogContainer, DialogComponent, dialogFlexDir, dialogGap, descriptionNode, qrNode, dialogTitle, dialogOnCancel, dialogHideInputGuide;
  if (cache[17] !== displayUrl || cache[18] !== onContinue || cache[19] !== qrText || cache[20] !== showQr) {
    let qrLines = qrText ? qrText.split(`
`).filter(MSm) : [];
    DialogComponent = Jn, dialogTitle = "Remote Control", dialogOnCancel = onContinue, dialogHideInputGuide = !0, DialogContainer = $, dialogFlexDir = "column", dialogGap = 1;
    let urlSuffix = displayUrl ? ` and at ${displayUrl}` : " and claude.ai/code";
    if (cache[30] !== urlSuffix) descriptionNode = xH.jsxs(v, {
      children: ["This session is available in the Claude mobile app", urlSuffix, "."]
    }), cache[30] = urlSuffix, cache[31] = descriptionNode;else descriptionNode = cache[31];
    qrNode = showQr && qrLines.length > 0 && xH.jsx($, {
      flexDirection: "column",
      children: qrLines.map(LSm)
    }), cache[17] = displayUrl, cache[18] = onContinue, cache[19] = qrText, cache[20] = showQr, cache[21] = DialogContainer, cache[22] = DialogComponent, cache[23] = dialogFlexDir, cache[24] = dialogGap, cache[25] = descriptionNode, cache[26] = qrNode, cache[27] = dialogTitle, cache[28] = dialogOnCancel, cache[29] = dialogHideInputGuide;
  } else DialogContainer = cache[21], DialogComponent = cache[22], dialogFlexDir = cache[23], dialogGap = cache[24], descriptionNode = cache[25], qrNode = cache[26], dialogTitle = cache[27], dialogOnCancel = cache[28], dialogHideInputGuide = cache[29];
  let disconnectFocused = selectedIndex === 0,
    disconnectLabelNode;
  if (cache[32] === Symbol.for("react.memo_cache_sentinel")) disconnectLabelNode = xH.jsx(v, {
    children: "Disconnect this session"
  }), cache[32] = disconnectLabelNode;else disconnectLabelNode = cache[32];
  let disconnectRow;
  if (cache[33] !== disconnectFocused) disconnectRow = xH.jsx(bE, {
    isFocused: disconnectFocused,
    children: disconnectLabelNode
  }), cache[33] = disconnectFocused, cache[34] = disconnectRow;else disconnectRow = cache[34];
  let qrFocused = selectedIndex === 1,
    qrToggleLabel = showQr ? "Hide QR code" : "Show QR code",
    qrHint;
  if (cache[35] !== showQr) qrHint = !showQr && xH.jsx(v, {
    dimColor: !0,
    children: "  Scan with your phone to open this session"
  }), cache[35] = showQr, cache[36] = qrHint;else qrHint = cache[36];
  let qrLabelNode;
  if (cache[37] !== qrToggleLabel || cache[38] !== qrHint) qrLabelNode = xH.jsxs(v, {
    children: [qrToggleLabel, qrHint]
  }), cache[37] = qrToggleLabel, cache[38] = qrHint, cache[39] = qrLabelNode;else qrLabelNode = cache[39];
  let qrRow;
  if (cache[40] !== qrFocused || cache[41] !== qrLabelNode) qrRow = xH.jsx(bE, {
    isFocused: qrFocused,
    children: qrLabelNode
  }), cache[40] = qrFocused, cache[41] = qrLabelNode, cache[42] = qrRow;else qrRow = cache[42];
  let continueFocused = selectedIndex === 2,
    continueLabelNode;
  if (cache[43] === Symbol.for("react.memo_cache_sentinel")) continueLabelNode = xH.jsx(v, {
    children: "Continue"
  }), cache[43] = continueLabelNode;else continueLabelNode = cache[43];
  let continueRow;
  if (cache[44] !== continueFocused) continueRow = xH.jsx(bE, {
    isFocused: continueFocused,
    children: continueLabelNode
  }), cache[44] = continueFocused, cache[45] = continueRow;else continueRow = cache[45];
  let optionsColumn;
  if (cache[46] !== disconnectRow || cache[47] !== qrRow || cache[48] !== continueRow) optionsColumn = xH.jsxs($, {
    flexDirection: "column",
    children: [disconnectRow, qrRow, continueRow]
  }), cache[46] = disconnectRow, cache[47] = qrRow, cache[48] = continueRow, cache[49] = optionsColumn;else optionsColumn = cache[49];
  let keyHintNode;
  if (cache[50] === Symbol.for("react.memo_cache_sentinel")) keyHintNode = xH.jsx(v, {
    dimColor: !0,
    children: xH.jsxs(bn, {
      children: [xH.jsx(at, {
        chord: "enter",
        action: "select"
      }), xH.jsx(at, {
        chord: "escape",
        action: "continue"
      })]
    })
  }), cache[50] = keyHintNode;else keyHintNode = cache[50];
  let dialogBody;
  if (cache[51] !== DialogContainer || cache[52] !== dialogFlexDir || cache[53] !== dialogGap || cache[54] !== descriptionNode || cache[55] !== qrNode || cache[56] !== optionsColumn) dialogBody = xH.jsxs(DialogContainer, {
    flexDirection: dialogFlexDir,
    gap: dialogGap,
    children: [descriptionNode, qrNode, optionsColumn, keyHintNode]
  }), cache[51] = DialogContainer, cache[52] = dialogFlexDir, cache[53] = dialogGap, cache[54] = descriptionNode, cache[55] = qrNode, cache[56] = optionsColumn, cache[57] = dialogBody;else dialogBody = cache[57];
  let dialog;
  if (cache[58] !== DialogComponent || cache[59] !== dialogTitle || cache[60] !== dialogOnCancel || cache[61] !== dialogHideInputGuide || cache[62] !== dialogBody) dialog = xH.jsx(DialogComponent, {
    title: dialogTitle,
    onCancel: dialogOnCancel,
    hideInputGuide: dialogHideInputGuide,
    children: dialogBody
  }), cache[58] = DialogComponent, cache[59] = dialogTitle, cache[60] = dialogOnCancel, cache[61] = dialogHideInputGuide, cache[62] = dialogBody, cache[63] = dialog;else dialog = cache[63];
  return dialog;
}
/** Render one line of the QR code as a Text node, keyed by index. */
function LSm(line, index) {
  return xH.jsx(v, {
    children: line
  }, index);
}
/** Keep only non-empty QR lines. */
function MSm(line) {
  return line.length > 0;
}
/** Move selection one step backward (wrap around 3 options). */
function NSm(index) {
  return (index - 1 + 3) % 3;
}
/** Move selection one step forward (wrap around 3 options). */
function FSm(index) {
  return (index + 1) % 3;
}
/** Toggle the QR-code visibility flag. */
function BSm(showQr) {
  return !showQr;
}
/** Store reducer: disable the bridge and clear its notifications/errors. */
function USm(state) {
  if (!state.replBridgeEnabled && state.replBridgeError === void 0) return state;
  return {
    ...state,
    replBridgeEnabled: !1,
    replBridgeExplicit: !1,
    replBridgeOutboundOnly: !1,
    replBridgeError: void 0,
    notifications: KPt(state.notifications, Dq)
  };
}
/** Selector: bridge session is active. */
function $Sm(state) {
  return state.replBridgeSessionActive;
}
/** Selector: bridge connect URL. */
function qSm(state) {
  return state.replBridgeConnectUrl;
}
/** Selector: bridge session URL. */
function WSm(state) {
  return state.replBridgeSessionUrl;
}
/**
 * Run all bridge preflight checks.
 * @returns an error/unenrolled descriptor, or null when prerequisites pass.
 */
async function YNl() {
  let networkError = await JYn();
  if (networkError) return {
    kind: "error",
    message: networkError
  };
  let authError = await zYn();
  if (authError) return {
    kind: "error",
    message: authError
  };
  if (!Q1()) return {
    kind: "error",
    message: x6e
  };
  if (await Lto(), await BBt()) {
    if (EIe()) return {
      kind: "error",
      message: NBt
    };
    return {
      kind: "unenrolled-trusted-device"
    };
  }
  return A("[bridge] Prerequisites passed, enabling bridge"), null;
}
/**
 * Slash-command entry point for /remote-control.
 * @param onDone - completion callback
 * @param context - command context
 * @param rawArgs - raw argument string (optional bridge name)
 */
async function call(onDone, context, rawArgs) {
  let name = rawArgs.trim() || void 0;
  return xH.jsx(HSm, {
    onDone,
    name,
    context
  });
}
var Pxo, JNl, $ue, xH;
var QNl = b(() => {
  BY();
  pH();
  ate();
  jYn();
  Fj();
  Is();
  di();
  Wo();
  Pie();
  Ixo();
  fd();
  zR();
  je();
  ss();
  kt();
  tVt();
  uo();
  lo();
  qe();
  $3t();
  Pxo = x(tt(), 1), JNl = x(Kht(), 1), $ue = x(et(), 1), xH = x(oe(), 1);
});

export {XNl,HSm,ISm,xSm,DSm,PSm,OSm,LSm,MSm,NSm,FSm,BSm,USm,$Sm,qSm,WSm,YNl,call as GSm,Pxo,JNl,$ue,xH,QNl};
