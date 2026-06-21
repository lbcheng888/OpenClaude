// @ts-nocheck
import {Mc as T5,mt as J_,configProtoStore as wq} from "../../vendor/m2458.ts";
import {mcpTools as mP,sJ as Jc} from "../../vendor/m4311.ts";
import {logFeatureBadAsync as Kx,get as ZtH} from "../../vendor/m2523.ts";
import {je as oH} from "../../vendor/m577.ts";
import {Vfo as E1q,y6e as vpH,eJ as $o} from "../../vendor/m4342.ts";
import {getGlobalConfig as C_,saveGlobalConfig as P6,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {st as q_} from "../../vendor/m5.ts";
import {dd as O3,Dd as X3} from "../../vendor/m687.ts";
import {m0n as E06,KYr as _l8} from "../../vendor/m3285.ts";
import {ju as a1,wk as IW} from "../tui/2564_current.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {at as K_,rs as gq} from "../../vendor/m2546.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Lr as _q} from "../../vendor/m578.ts";
import {sn as A6} from "./0047_namespace.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/*
 * config/5504_onBackgroundSession.ts - configuration and daemon-control restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
function Pd4(H: any): any {
  let _ = Md4.c(15),
    {
      onBackgroundSession: onBackgroundSession,
      isLoading: isLoading
    } = H,
    O = T5(),
    T = mP(),
    [z, $] = Xd4.useState(!1),
    Y = Kx($, onBackgroundSession, mRT),
    A;
  if (_[0] !== O || _[1] !== Y || _[2] !== isLoading || _[3] !== T) A = (): any => {
    if (oH.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS) return;
    let y = O.getState();
    if (E1q(y)) {
      if (vpH(T), !C_().hasUsedBackgroundTask) P6(uRT);
    } else if (q_("false") && isLoading) Y();
  }, _[0] = O, _[1] = Y, _[2] = isLoading, _[3] = T, _[4] = A;else A = _[4];
  let handler = A,
    f = J_(E1q),
    j;
  if (_[5] === Symbol.for("react.memo_cache_sentinel")) j = q_("false"), _[5] = j;else j = _[5];
  let J = j,
    D;
  if (_[6] !== f || _[7] !== isLoading) D = O3() === null && (f || J && isLoading), _[6] = f, _[7] = isLoading, _[8] = D;else D = _[8];
  let isActive = D,
    X;
  if (_[9] !== isActive || _[10] !== handler) X = {
    handler: handler,
    isActive: isActive
  }, _[9] = isActive, _[10] = handler, _[11] = X;else X = _[11];
  let {
      cohesionFixes: cohesionFixes,
      gateOnShortcut: gateOnShortcut
    } = E06(X),
    W = a1("task:background", "Task", "ctrl+b"),
    chord = cohesionFixes ? gateOnShortcut : oH.terminal === "tmux" && W === "ctrl+b" ? "ctrl+b ctrl+b" : W;
  if (!isLoading || !z || cohesionFixes && chord === "") return null;
  let format;
  if (_[12] === Symbol.for("react.memo_cache_sentinel")) format = {
    keyCase: "lower"
  }, _[12] = format;else format = _[12];
  let h;
  if (_[13] !== chord) h = VFH.createElement(B, {
    paddingLeft: 2
  }, VFH.createElement(V, {
    dimColor: !0
  }, VFH.createElement(K_, {
    chord: chord,
    action: "background",
    format: format
  }))), _[13] = chord, _[14] = h;else h = _[14];
  return h;
}
function uRT(H: any): any {
  return H.hasUsedBackgroundTask ? H : {
    ...H,
    hasUsedBackgroundTask: !0
  };
}
function mRT(): any {}
var Md4, VFH, Xd4;
var Wd4 = L((): any => {
  ZtH();
  _l8();
  nH();
  IW();
  X3();
  wq();
  Jc();
  $o();
  T8();
  _q();
  A6();
  gq();
  Md4 = u(__(), 1), VFH = u(WH(), 1), Xd4 = u(WH(), 1);
});

export {Pd4 as aZl,uRT as qUm,mRT as jUm,Md4 as sZl,VFH as E5e,Xd4 as iZl,Wd4 as lZl};
