// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Azn,Nko} from "../tui/4792_onExit.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {xOe,KKt} from "../../vendor/m5266.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {POWERUP_DISCOVERY_COPY as egt,Jzn} from "../agent/4821_resolvePowerupDiscoveryArm.ts";
import {zG,Lko} from "../agent/4791_children.ts";
import {F4,iHe} from "../../vendor/m2820.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
// Powerup 发现引导步骤 React 组件，含进度条与确认/跳过交互
var vmc = {};
ft(vmc, {
  PowerupDiscoveryStep: () => PowerupDiscoveryStep
});

/** Powerup 发现引导步骤组件：展示标题、进度条、说明文字，及启动/跳过按钮 */
function PowerupDiscoveryStep(props: {
  onDone: () => void;
}) {
  let memoCache = Amc.c(9),
    {
      onDone: onDone
    } = props,
    [launched, setLaunched] = Rmc.useState(!1);
  if (launched) {
    let exitNode;
    if (memoCache[0] !== onDone) exitNode = kV.jsx(Azn, {
      onExit: onDone
    }), memoCache[0] = onDone, memoCache[1] = exitNode;else exitNode = memoCache[1];
    return exitNode;
  }
  let handleAction;
  if (memoCache[2] !== onDone) handleAction = function (action: string) {
    if (W("tengu_powerup_discovery_shown", {
      arm: Le("step"),
      action: Le(action)
    }), action === "launch") setLaunched(!0);else onDone();
  }, memoCache[2] = onDone, memoCache[3] = handleAction;else handleAction = memoCache[3];
  let stableHandleAction = handleAction,
    spinnerNode;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) spinnerNode = kV.jsx(xOe, {}), memoCache[4] = spinnerNode;else spinnerNode = memoCache[4];
  let progressRow;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) progressRow = kV.jsxs($, {
    children: [kV.jsx(v, {
      bold: !0,
      children: egt.heading
    }), kV.jsxs(v, {
      dimColor: !0,
      children: [" 0/", zG.length, " "]
    }), kV.jsx(F4, {
      ratio: 0,
      width: 16,
      fillColor: "claude",
      emptyColor: "inactive"
    })]
  }), memoCache[5] = progressRow;else progressRow = memoCache[5];
  let bodyText;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) bodyText = kV.jsx($, {
    width: 70,
    children: kV.jsx(v, {
      children: egt.body
    })
  }), memoCache[6] = bodyText;else bodyText = memoCache[6];
  let fullLayout;
  if (memoCache[7] !== stableHandleAction) fullLayout = kV.jsxs($, {
    flexDirection: "column",
    children: [spinnerNode, kV.jsxs($, {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1,
      marginTop: 1,
      children: [progressRow, bodyText, kV.jsx(Bl, {
        confirmLabel: "Take the tour",
        cancelLabel: "Skip for now",
        onConfirm: () => stableHandleAction("launch"),
        onCancel: () => stableHandleAction("skip")
      })]
    })]
  }), memoCache[7] = stableHandleAction, memoCache[8] = fullLayout;else fullLayout = memoCache[8];
  return fullLayout;
}
var Amc, Rmc, kV;
var wmc = b(() => {
  Jzn();
  je();
  kt();
  d_();
  iHe();
  KKt();
  Lko();
  Nko();
  Amc = x(tt(), 1), Rmc = x(et(), 1), kV = x(oe(), 1);
});

export {vmc,PowerupDiscoveryStep,Amc,Rmc,kV,wmc};
