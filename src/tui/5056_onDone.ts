// @ts-nocheck
import {saveGlobalConfig as P6,getGlobalConfig as C_,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Tm as wT,Fk as PZ} from "../../vendor/m3341.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {pr as X8,Yl as g4} from "../../vendor/m2562.ts";
import {isBridgeEnabled as _E,Vk as yL} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {hasStoredOAuthToken as LG,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Semantic restoration for tui/5035_onDone.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
/** Shows the remote-control opt-in dialog and reports the selected action. */
function RemoteControlDialog({
  onDone: H
}) : any {
  let _ = React.useRef(H);
  _.current = H;
  let q = React.useCallback(() => {
    _.current("dismiss");
  }, []);
  React.useEffect(() => {
    P6(T => {
      if (T.remoteDialogSeen) return T;
      return {
        ...T,
        remoteDialogSeen: !0
      };
    });
  }, []);
  let K = React.useCallback(T => {
    _.current(T);
  }, []);
  return React.default.createElement(wT, {
    title: "Remote Control"
  }, React.default.createElement(B, {
    flexDirection: "column",
    paddingX: 2,
    paddingY: 1
  }, React.default.createElement(B, {
    marginBottom: 1,
    flexDirection: "column"
  }, React.default.createElement(V, null, "Take this session with you and pick up right where you left off on any device. Open the Code tab in the Claude mobile app, or visit claude.ai/code in a browser."), React.default.createElement(V, null, " "), React.default.createElement(V, null, "The session keeps running on this machine. Use your other devices as a remote control. Disconnect anytime with /remote-control.")), React.default.createElement(B, null, React.default.createElement(X8, {
    options: [{
      label: "Enable Remote Control",
      description: "Opens a secure connection to claude.ai.",
      value: "enable"
    }, {
      label: "Never mind",
      description: "You can always enable it later with /remote-control.",
      value: "dismiss"
    }],
    onChange: K,
    onCancel: q
  }))));
}
/** Determines whether the remote-control callout should be shown. */
function shouldShowRemoteControlDialog() : any {
  if (C_().remoteDialogSeen) return !1;
  if (!_E()) return !1;
  if (!LG()) return !1;
  return !0;
}
var React;
var dDq = L(() => {
  yL();
  nH();
  Mq();
  T8();
  g4();
  PZ();
  React = u(WH(), 1);
});
export {RemoteControlDialog as hIl,shouldShowRemoteControlDialog as gIl,React as FU,dDq as bRo};
