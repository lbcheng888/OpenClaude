// @ts-nocheck
import {saveGlobalConfig as hn,getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {isBridgeEnabled as AH,pH} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {hasStoredOAuthToken as pE,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Remote Control onboarding dialog.
 *
 * Renders a one-time dialog inviting the user to enable Remote Control, which
 * lets them resume the current session from the Claude mobile app or
 * claude.ai/code. The session keeps running on this machine while other
 * devices act as a remote control.
 *
 * Note: this module shares a slot name (`onDone`) with the v185 trial-expired
 * dialog but is a structurally different component; no names were portable.
 */

/**
 * @param props.onDone Callback invoked with the chosen value
 *   ("enable" | "dismiss").
 */
function qNl({
  onDone: onDone
}) {
  // Keep the latest onDone in a ref so callbacks stay stable across renders.
  let onDoneRef = QWe.useRef(onDone);
  onDoneRef.current = onDone;
  // Cancel handler: treat cancel as an explicit dismissal.
  let handleCancel = QWe.useCallback(() => {
    onDoneRef.current("dismiss");
  }, []);
  // Persist that the remote dialog has been seen so it won't show again.
  QWe.useEffect(() => {
    hn(state => {
      if (state.remoteDialogSeen) return state;
      return {
        ...state,
        remoteDialogSeen: !0
      };
    });
  }, []);
  // Selection handler: forward the chosen option value to onDone.
  let handleChange = QWe.useCallback(selectedValue => {
    onDoneRef.current(selectedValue);
  }, []);
  return Uue.jsx(hm, {
    title: "Remote Control",
    children: Uue.jsxs($, {
      flexDirection: "column",
      paddingX: 2,
      paddingY: 1,
      children: [Uue.jsxs($, {
        marginBottom: 1,
        flexDirection: "column",
        children: [Uue.jsx(v, {
          children: "Take this session with you and pick up right where you left off on any device. Open the Code tab in the Claude mobile app, or visit claude.ai/code in a browser."
        }), Uue.jsx(v, {
          children: " "
        }), Uue.jsx(v, {
          children: "The session keeps running on this machine. Use your other devices as a remote control. Disconnect anytime with /remote-control."
        })]
      }), Uue.jsx($, {
        children: Uue.jsx(hr, {
          options: [{
            label: "Enable Remote Control",
            description: "Opens a secure connection to claude.ai.",
            value: "enable"
          }, {
            label: "Never mind",
            description: "You can always enable it later with /remote-control.",
            value: "dismiss"
          }],
          onChange: handleChange,
          onCancel: handleCancel
        })
      })]
    })
  });
}

/**
 * Decides whether the Remote Control onboarding dialog should be shown.
 * @returns true only if the dialog hasn't been seen yet and remote control is
 *   both available (AH) and enabled/eligible (pE).
 */
function WNl() {
  if (Ot().remoteDialogSeen) return !1;
  if (!AH()) return !1;
  if (!pE()) return !1;
  return !0;
}
var QWe, Uue;
var Ixo = b(() => {
  pH();
  je();
  lo();
  tr();
  Ol();
  DI();
  QWe = x(et(), 1), Uue = x(oe(), 1);
});

export {qNl,WNl,QWe,Uue,Ixo};
