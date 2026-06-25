// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Epo,po} from "../tools/5224_userPromptCount.ts";
import {resetCostState as PKe,lt} from "../session/0132_sent.ts";
import {getAPIProvider as Rr,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {J3e,X3e} from "../api/3376_headers.ts";
import {Z9n,e3n} from "../../vendor/m4007.ts";
import {du,iw} from "../../vendor/m2302.ts";
import {Cqe,Eqe} from "../../vendor/m3874.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {mo,Ct} from "../../vendor/m197.ts";
import {n3n,gpo} from "../../vendor/m4010.ts";
import {Kq,L6e} from "../config/4012_ANTHROPIC_UNIX_SOCKET.ts";
import {getTenguSandboxGbConfig as _$e,Uh} from "../../vendor/m2682.ts";
import {refreshPolicyLimits as q3t,_B} from "../telemetry/5226_waitForPolicyLimitsToLoad.ts";
import {FRe,KQ} from "../../vendor/m2039.ts";
import {refreshGrowthBookAfterAuthChange as Kse,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {getOauthAccountInfo as hc,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {KPt,fd} from "../../vendor/m2469.ts";
import {Dq,ate} from "../../vendor/m3839.ts";
import {readStoredTrustedDeviceToken as CIe,clearTrustedDeviceToken as Mto,enrollTrustedDevice as UBt,Fj} from "../telemetry/3343_untrustedDeviceHint.ts";
import {a3a,F3t,Spo,B3t,bpo} from "../../vendor/m4012.ts";
import {Mr,xl} from "../../vendor/m4427.ts";
import {REMOTE_CONTROL_DISCONNECTED_MSG as Ite} from "../core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {FE,V1} from "../../vendor/m4006.ts";
import {getSettingsSchema as ZS,SE} from "../../vendor/m2559.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {L2e,Phe,rS} from "../../vendor/m2582.ts";
import {ConsoleOAuthFlow as Aqe,n9t} from "./3876_ConsoleOAuthFlow.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Post-login hook orchestration for the TUI /login flow (Claude Code v2.1.190).
 *
 * - runPostLoginHooks: runs side effects after an OAuth login completes
 *   (refresh API key, refresh policy/growthbook state, reconcile account
 *   change, manage the REPL bridge / Remote Control session, and enroll the
 *   trusted device). Returns whether the bridge was disconnected.
 * - call: builds the <Login> React element wired to runPostLoginHooks.
 * - Login: the React component rendering the login screen.
 */
var moduleExports = {};
ft(moduleExports, {
  runPostLoginHooks: () => runPostLoginHooks,
  call: () => call,
  Login: () => Login
});
/**
 * @param appBridge   REPL app bridge (state + message ops)
 * @param connected   whether the bridge connection is live
 * @param options     optional { previousAccount, awaitEnrollment }
 * @returns { bridgeDisconnected: boolean }
 */
async function runPostLoginHooks(appBridge, connected, options) {
  if (appBridge.onChangeAPIKey(), appBridge.applyMessageOp({
    type: "update",
    updater: Epo
  }), !connected) return {
    bridgeDisconnected: !1
  };
  if (PKe(), Rr() === "gateway") {
    if (!(await J3e()) || Z9n()) return du.get(process.stdout)?.unmount(), Promise.resolve().then(() => (Cqe(), Eqe)).then(relaunchMod => relaunchMod.execRelaunch()).catch(relaunchMod => Ie(mo(relaunchMod))), {
      bridgeDisconnected: !1
    };
    n3n("gateway"), Kq(), _$e.cache?.clear?.();
  } else J3e();
  q3t(), FRe(), Kse();
  let previousAccount = options?.previousAccount,
    currentAccount = hc(),
    sameAccountAndOrg = previousAccount?.accountUuid !== void 0 && previousAccount.accountUuid === currentAccount?.accountUuid && previousAccount.organizationUuid === currentAccount?.organizationUuid,
    {
      replBridgeEnabled: replBridgeEnabled,
      replBridgeOutboundOnly: replBridgeOutboundOnly,
      replBridgeError: replBridgeError
    } = appBridge.getAppState(),
    accountChanged = previousAccount?.accountUuid !== void 0 && !sameAccountAndOrg,
    shouldDisconnectBridge = accountChanged && (replBridgeEnabled || replBridgeError !== void 0),
    bridgeDisconnected = accountChanged && replBridgeEnabled && !replBridgeOutboundOnly;
  if (shouldDisconnectBridge) A("[bridge:repl] Account changed via /login — disconnecting Remote Control session"), appBridge.setAppState(prevState => ({
    ...prevState,
    replBridgeEnabled: !1,
    replBridgeExplicit: !1,
    replBridgeOutboundOnly: !1,
    replBridgeError: void 0,
    notifications: KPt(prevState.notifications, Dq)
  }));
  if (sameAccountAndOrg && (await CIe())) A("[trusted-device] Same account+org re-login with existing token, skipping re-enrollment");else {
    Mto();
    let enrollPromise = UBt();
    if (options?.awaitEnrollment) await enrollPromise;
  }
  a3a();
  let appState = appBridge.getAppState();
  return F3t(Mr(appBridge), appBridge.setToolPermissionContext), Spo(), B3t(Mr(appBridge), appBridge.setAppState, appState.fastMode), appBridge.setAppState(prevState => ({
    ...prevState,
    authVersion: prevState.authVersion + 1
  })), {
    bridgeDisconnected: bridgeDisconnected
  };
}
/**
 * Build the <Login> element wired to runPostLoginHooks.
 * @param onResult   callback invoked with a human-readable status string
 * @param appBridge  REPL app bridge passed through to runPostLoginHooks
 */
async function call(onResult, appBridge) {
  let startingMessage = process.env.CLAUDE_CODE_OAUTH_TOKEN ? "Warning: CLAUDE_CODE_OAUTH_TOKEN is set in your environment and will override this login token at runtime. After logging in, unset that variable for your new credentials to take effect." : void 0,
    currentAccount = hc(),
    previousAccount = currentAccount && {
      accountUuid: currentAccount.accountUuid,
      organizationUuid: currentAccount.organizationUuid
    };
  return M6e.jsx(Login, {
    startingMessage: startingMessage,
    onDone: async loginSucceeded => {
      let {
        bridgeDisconnected: bridgeDisconnected
      } = await runPostLoginHooks(appBridge, loginSucceeded, {
        previousAccount: previousAccount
      });
      onResult(loginSucceeded ? bridgeDisconnected ? `Login successful. ${Ite}` : "Login successful" : "Login interrupted");
    }
  });
}
/** Login screen React component (uses React Forget memo cache). */
function Login(props) {
  let cache = u3a.c(21),
    keypress = FE(),
    isAuthd = ZS(),
    [authSuccess, setAuthSuccess] = d3a.useState(!1),
    onAuthSuccess;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) onAuthSuccess = () => setAuthSuccess(!0), cache[0] = onAuthSuccess;else onAuthSuccess = cache[0];
  let handleAuthSuccess = onAuthSuccess,
    onCancel;
  if (cache[1] !== authSuccess || cache[2] !== keypress || cache[3] !== props) onCancel = () => props.onDone(authSuccess, keypress), cache[1] = authSuccess, cache[2] = keypress, cache[3] = props, cache[4] = onCancel;else onCancel = cache[4];
  let handleCancel = onCancel,
    confirmOpts;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) confirmOpts = {
    context: "Settings"
  }, cache[5] = confirmOpts;else confirmOpts = cache[5];
  Or("confirm:no", handleCancel, confirmOpts);
  let exitKey = Df(),
    inputGuide;
  if (cache[6] !== authSuccess || cache[7] !== exitKey.keyName || cache[8] !== exitKey.pending) inputGuide = exitKey.pending ? M6e.jsxs(v, {
    children: ["Press ", exitKey.keyName, " again to exit"]
  }) : M6e.jsx(dr, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: authSuccess ? "continue" : "cancel"
  }), cache[6] = authSuccess, cache[7] = exitKey.keyName, cache[8] = exitKey.pending, cache[9] = inputGuide;else inputGuide = cache[9];
  let onDone;
  if (cache[10] !== keypress || cache[11] !== props) onDone = () => props.onDone(!0, keypress), cache[10] = keypress, cache[11] = props, cache[12] = onDone;else onDone = cache[12];
  let urlOutdent = isAuthd ? L2e : Phe,
    oauthFlow;
  if (cache[13] !== props.startingMessage || cache[14] !== onDone || cache[15] !== urlOutdent) oauthFlow = M6e.jsx(Aqe, {
    onDone: onDone,
    onAuthSuccess: handleAuthSuccess,
    startingMessage: props.startingMessage,
    urlOutdent: urlOutdent
  }), cache[13] = props.startingMessage, cache[14] = onDone, cache[15] = urlOutdent, cache[16] = oauthFlow;else oauthFlow = cache[16];
  let dialog;
  if (cache[17] !== handleCancel || cache[18] !== inputGuide || cache[19] !== oauthFlow) dialog = M6e.jsx(Jn, {
    title: "Login",
    onCancel: handleCancel,
    color: "permission",
    isCancelActive: !1,
    inputGuide: inputGuide,
    children: oauthFlow
  }), cache[17] = handleCancel, cache[18] = inputGuide, cache[19] = oauthFlow, cache[20] = dialog;else dialog = cache[20];
  return dialog;
}
var u3a, d3a, M6e;
var $3t = b(() => {
  lt();
  ate();
  Fj();
  uc();
  n9t();
  di();
  rS();
  SE();
  fd();
  TI();
  V1();
  iw();
  je();
  ss();
  jn();
  _B();
  X3e();
  e3n();
  gpo();
  lo();
  xl();
  qe();
  Ct();
  vn();
  L6e();
  po();
  Ps();
  bpo();
  Uh();
  KQ();
  u3a = x(tt(), 1), d3a = x(et(), 1), M6e = x(oe(), 1);
});

export {moduleExports as p3a,runPostLoginHooks,call as B0p,Login,u3a,d3a,M6e,$3t};
