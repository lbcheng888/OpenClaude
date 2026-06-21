// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L,M as x} from "../../runtime.ts";
import {Fio as p8q,lo as zq} from "../tools/5190_userPromptCount.ts";
import {resetCostState as FQH,lt as Y_} from "../session/0131_sent.ts";
import {kst as hq_,N9e as AZH} from "../api/3360_headers.ts";
import {refreshPolicyLimits as cy_,zF as eC} from "../telemetry/5192_waitForPolicyLimitsToLoad.ts";
import {tve as vMH,JQ as Pt} from "../../vendor/m2034.ts";
import {refreshGrowthBookAfterAuthChange as N9H,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getOauthAccountInfo as L1,Ao as jq} from "../config/2031_withOAuthRefreshLock.ts";
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {g0t as JR_,Ld as a3} from "../../vendor/m2459.ts";
import {g6 as oB,mte as iHH} from "../../vendor/m3821.ts";
import {readStoredTrustedDeviceToken as qZH,clearTrustedDeviceToken as zo8,enrollTrustedDevice as sy_,lY as or} from "../telemetry/3327_untrustedDeviceHint.ts";
import {MMa as RRK,Q2t as Ob_,Nio as u8q,Z2t as Tb_,Bio as m8q} from "../../vendor/m3945.ts";
import {Fr as I8,Ql as v4} from "../../vendor/m4405.ts";
import {REMOTE_CONTROL_DISCONNECTED_MSG as z_H} from "../core/3944_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {kE as $M,jL as cV} from "../../vendor/m3944.ts";
import {eb as cJ,pE as aM} from "../../vendor/m2548.ts";
import {Or as E8,Ts as j9} from "../../vendor/m2542.ts";
import {xA as C$,jH as iG} from "../../vendor/m2566.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {lr as Y8,readRoster as f1} from "../../vendor/m2547.ts";
import {LUe as pCH,TAe as QzH,lS as oj} from "../../vendor/m2571.ts";
import {ConsoleOAuthFlow as FmH,HUt as Yb_} from "./3858_ConsoleOAuthFlow.ts";
import {Kn as a6,Li as R7} from "../../vendor/m2572.ts";
import {ze as rH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as ZH} from "../../vendor/m2253.ts";
// @ts-nocheck
var moduleExports = {};
j_(moduleExports, {
  runPostLoginHooks: () => loginCall,
  call: () => Login,
  Login: () => MGH
});
async function loginCall(resolvePromise, appCtx, q) {
  if (resolvePromise.onChangeAPIKey(), resolvePromise.applyMessageOp({
    type: "update",
    updater: p8q
  }), !appCtx) return {
    bridgeDisconnected: false
  };
  FQH(), hq_(), cy_(), vMH(), N9H();
  let K = q?.previousAccount,
    O = L1(),
    T = K?.accountUuid !== undefined && K.accountUuid === O?.accountUuid && K.organizationUuid === O?.organizationUuid,
    {
      replBridgeEnabled: z,
      replBridgeOutboundOnly: $,
      replBridgeError: Y
    } = resolvePromise.getAppState(),
    A = K?.accountUuid !== undefined && !T,
    w = A && (z || Y !== undefined),
    f = A && z && !$;
  if (w) N("[bridge:repl] Account changed via /login \u2014 disconnecting Remote Control session"), resolvePromise.setAppState(J => ({
    ...J,
    replBridgeEnabled: false,
    replBridgeExplicit: false,
    replBridgeOutboundOnly: false,
    replBridgeError: undefined,
    notifications: JR_(J.notifications, oB)
  }));
  if (T && (await qZH())) N("[trusted-device] Same account+org re-login with existing token, skipping re-enrollment");else {
    zo8();
    let J = sy_();
    if (q?.awaitEnrollment) await J;
  }
  RRK();
  let j = resolvePromise.getAppState();
  return Ob_(I8(resolvePromise), resolvePromise.setToolPermissionContext), u8q(), Tb_(I8(resolvePromise), resolvePromise.setAppState, j.fastMode), resolvePromise.setAppState(J => ({
    ...J,
    authVersion: J.authVersion + 1
  })), {
    bridgeDisconnected: f
  };
}
async function Login(props, _) {
  let q = process.env.CLAUDE_CODE_OAUTH_TOKEN ? "Warning: CLAUDE_CODE_OAUTH_TOKEN is set in your environment and will override this login token at runtime. After logging in, unset that variable for your new credentials to take effect." : undefined,
    K = L1(),
    O = K && {
      accountUuid: K.accountUuid,
      organizationUuid: K.organizationUuid
    };
  return reactHooksInstance.createElement(MGH, {
    startingMessage: q,
    onDone: async T => {
      let {
        bridgeDisconnected: z
      } = await loginCall(_, T, {
        previousAccount: O
      });
      props(T ? z ? `Login successful. ${z_H}` : "Login successful" : "Login interrupted");
    }
  });
}
function MGH(H) {
  let _ = reactInstance.c(21),
    q = $M(),
    K = cJ(),
    [O, T] = moduleInit.useState(false),
    z;
  if (_[0] === Symbol.for("react.memo_cache_sentinel")) z = () => T(true), _[0] = z;else z = _[0];
  let $ = z,
    Y;
  if (_[1] !== O || _[2] !== q || _[3] !== H) Y = () => H.onDone(O, q), _[1] = O, _[2] = q, _[3] = H, _[4] = Y;else Y = _[4];
  let A = Y,
    w;
  if (_[5] === Symbol.for("react.memo_cache_sentinel")) w = {
    context: "Settings"
  }, _[5] = w;else w = _[5];
  E8("confirm:no", A, w);
  let f = C$(),
    j;
  if (_[6] !== O || _[7] !== f.keyName || _[8] !== f.pending) j = f.pending ? reactHooksInstance.createElement(V, null, "Press ", f.keyName, " again to exit") : reactHooksInstance.createElement(Y8, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: O ? "continue" : "cancel"
  }), _[6] = O, _[7] = f.keyName, _[8] = f.pending, _[9] = j;else j = _[9];
  let J;
  if (_[10] !== q || _[11] !== H) J = () => H.onDone(true, q), _[10] = q, _[11] = H, _[12] = J;else J = _[12];
  let D = K ? pCH : QzH,
    M;
  if (_[13] !== H.startingMessage || _[14] !== J || _[15] !== D) M = reactHooksInstance.createElement(FmH, {
    onDone: J,
    onAuthSuccess: $,
    startingMessage: H.startingMessage,
    urlOutdent: D
  }), _[13] = H.startingMessage, _[14] = J, _[15] = D, _[16] = M;else M = _[16];
  let X;
  if (_[17] !== A || _[18] !== j || _[19] !== M) X = reactHooksInstance.createElement(a6, {
    title: "Login",
    onCancel: A,
    color: "permission",
    isCancelActive: false,
    inputGuide: j
  }, M), _[17] = A, _[18] = j, _[19] = M, _[20] = X;else X = _[20];
  return X;
}
var reactInstance, reactHooksInstance, moduleInit;
var $b_ = L(() => {
  Y_();
  iHH();
  or();
  f1();
  Yb_();
  R7();
  oj();
  aM();
  a3();
  iG();
  cV();
  rH();
  j9();
  t6();
  eC();
  AZH();
  jq();
  v4();
  gH();
  zq();
  m8q();
  Pt();
  reactInstance = x(__(), 1), reactHooksInstance = x(ZH(), 1), moduleInit = x(ZH(), 1);
});

export {moduleExports as $Ma,loginCall as runPostLoginHooks,Login as USp,MGH as Login,reactInstance as FMa,reactHooksInstance as Pte,moduleInit as UMa,$b_ as t$t};
