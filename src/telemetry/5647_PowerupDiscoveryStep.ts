// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {BWn as X5n,_Eo as mbo} from "../tui/4760_onExit.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {OPe as hPe,gWt as q5t} from "../../vendor/m5233.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {POWERUP_DISCOVERY_COPY,uGn as EWn} from "../agent/4789_resolvePowerupDiscoveryArm.ts";
import {HG as runForkedQuery,hEo as dbo} from "../tui/4759_children.ts";
import {Eq as lq,_xe as exe} from "../../vendor/m2807.ts";
import {ac as sc,e_ as logFeatureSad} from "../../vendor/m3338.ts";
import {ze as isModelToolSearchSupported} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
// Powerup 发现引导步骤 React 组件，含进度条与确认/跳过交互

declare const pt: any;
declare const b: any;
declare const L: any;
declare const X5n: any;
declare const mbo: any;
declare const logEvent: any;
declare const Ct: any;
declare const fromEnum: any;
declare const hPe: any;
declare const q5t: any;
declare const Box: any;
declare const Text: any;
declare const POWERUP_DISCOVERY_COPY: any;
declare const EWn: any;
declare const runForkedQuery: any;
declare const dbo: any;
declare const lq: any;
declare const exe: any;
declare const sc: any;
declare const logFeatureSad: any;
declare const isModelToolSearchSupported: any;
declare const nt: any;
declare const Te: any;
var moduleExports = {};
pt(moduleExports, {
  PowerupDiscoveryStep: () => PowerupDiscoveryStep
});

/** Powerup 发现引导步骤组件：展示标题、进度条、说明文字，及启动/跳过按钮 */
function PowerupDiscoveryStep(props: {
  onDone: () => void;
}) {
  let memoCache = reactCompilerCache.c(9),
    {
      onDone: onDone
    } = props;
  let [launched, setLaunched] = reactHooks.useState(!1);
  if (launched) {
    let exitNode;
    if (memoCache[0] !== onDone) exitNode = ReactInstance.createElement(X5n, {
      onExit: onDone
    }), memoCache[0] = onDone, memoCache[1] = exitNode;else exitNode = memoCache[1];
    return exitNode;
  }
  let handleAction;
  if (memoCache[2] !== onDone) handleAction = function (action: string) {
    if (logEvent("tengu_powerup_discovery_shown", {
      arm: fromEnum("step"),
      action: fromEnum(action)
    }), action === "launch") setLaunched(!0);else onDone();
  }, memoCache[2] = onDone, memoCache[3] = handleAction;else handleAction = memoCache[3];
  let stableHandleAction = handleAction;
  let spinnerNode;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) spinnerNode = ReactInstance.createElement(hPe, null), memoCache[4] = spinnerNode;else spinnerNode = memoCache[4];
  let progressRow;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) progressRow = ReactInstance.createElement(Box, null, ReactInstance.createElement(Text, {
    bold: !0
  }, POWERUP_DISCOVERY_COPY.heading), ReactInstance.createElement(Text, {
    dimColor: !0
  }, " 0/", runForkedQuery.length, " "), ReactInstance.createElement(lq, {
    ratio: 0,
    width: 16,
    fillColor: "claude",
    emptyColor: "inactive"
  })), memoCache[5] = progressRow;else progressRow = memoCache[5];
  let bodyText;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) bodyText = ReactInstance.createElement(Box, {
    width: 70
  }, ReactInstance.createElement(Text, null, POWERUP_DISCOVERY_COPY.body)), memoCache[6] = bodyText;else bodyText = memoCache[6];
  let fullLayout;
  if (memoCache[7] !== stableHandleAction) fullLayout = ReactInstance.createElement(Box, {
    flexDirection: "column"
  }, spinnerNode, ReactInstance.createElement(Box, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1,
    marginTop: 1
  }, progressRow, bodyText, ReactInstance.createElement(sc, {
    confirmLabel: "Take the tour",
    cancelLabel: "Skip for now",
    onConfirm: () => stableHandleAction("launch"),
    onCancel: () => stableHandleAction("skip")
  }))), memoCache[7] = stableHandleAction, memoCache[8] = fullLayout;else fullLayout = memoCache[8];
  return fullLayout;
}
var reactCompilerCache: any, ReactInstance: any, reactHooks: any;
var initModule = b(() => {
  EWn();
  isModelToolSearchSupported();
  Ct();
  logFeatureSad();
  exe();
  q5t();
  dbo();
  mbo();
  reactCompilerCache = L(nt(), 1), ReactInstance = L(Te(), 1), reactHooks = L(Te(), 1);
});
export {moduleExports as Ioc,PowerupDiscoveryStep,reactCompilerCache as koc,ReactInstance as Ux,reactHooks as Hoc,initModule as Doc};
