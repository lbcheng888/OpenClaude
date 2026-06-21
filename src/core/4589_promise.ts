// @ts-nocheck
import {Es as M9,kte as O_H} from "../../vendor/m3926.ts";
import {p5n as oF6,jTo as Tfq} from "../../vendor/m4586.ts";
import {getBridgeDoctorInfo as Qr8,Vk as $R} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {Box as p} from "../../vendor/m2422.ts";
import {Bs as N9,rA as gz} from "../../vendor/m2550.ts";
import {b as L,M as x} from "../../runtime.ts";
import {ze as rH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as ZH} from "../../vendor/m2253.ts";
// @ts-nocheck
function renderFailedCheckItem(check) {
  let _ = aF6.c(8),
    {
      promise: q
    } = check,
    K = kX.use(q);
  if (K.inRemoteSession) {
    let $;
    if (_[0] === Symbol.for("react.memo_cache_sentinel")) $ = kX.default.createElement(M9.Node, {
      dimColor: true
    }, "Inside a cloud session \u2014 Remote Control is unavailable here. Use it from the local session instead."), _[0] = $;else $ = _[0];
    return $;
  }
  let O = K.checks,
    T,
    z;
  if (_[1] !== K.checks || _[2] !== K.disabledReason) {
    z = Symbol.for("react.early_return_sentinel");
    H: {
      let $ = O.filter(RemoteControlDiagnosticsTree);
      if (K.disabledReason !== null) {
        let A;
        if (_[5] !== K.disabledReason) A = kX.default.createElement(M9.Node, {
          label: kX.default.createElement(oF6, {
            color: "warning"
          }, K.disabledReason)
        }), _[5] = K.disabledReason, _[6] = A;else A = _[6];
        z = kX.default.createElement(M9.Group, null, A, $.map(isCheckFailed));
        break H;
      }
      let Y;
      if (_[7] === Symbol.for("react.memo_cache_sentinel")) Y = kX.default.createElement(M9.Node, {
        dimColor: true
      }, "Control this session from claude.ai/code or the Claude mobile app"), _[7] = Y;else Y = _[7];
      T = kX.default.createElement(M9.Group, null, Y, $.map(renderPassedCheckItem));
    }
    _[1] = K.checks, _[2] = K.disabledReason, _[3] = T, _[4] = z;
  } else T = _[3], z = _[4];
  if (z !== Symbol.for("react.early_return_sentinel")) return z;
  return T;
}
function renderPassedCheckItem(check) {
  return kX.default.createElement(M9.Node, {
    key: check.label,
    color: "warning"
  }, check.label, check.detail ? ` (${check.detail})` : "");
}
function isCheckFailed(check) {
  return kX.default.createElement(M9.Node, {
    key: check.label,
    dimColor: true
  }, check.label, check.detail ? ` (${check.detail})` : "");
}
function RemoteControlDiagnosticsTree(props) {
  return !props.ok;
}
function RemoteControlPanel() {
  let cacheSlots = aF6.c(4),
    bridgeInfoPromise;
  if (cacheSlots[0] === Symbol.for("react.memo_cache_sentinel")) bridgeInfoPromise = Qr8(), cacheSlots[0] = bridgeInfoPromise;else bridgeInfoPromise = cacheSlots[0];
  let promise = bridgeInfoPromise,
    titleEl;
  if (cacheSlots[1] === Symbol.for("react.memo_cache_sentinel")) titleEl = kX.default.createElement(V, {
    bold: true
  }, "Remote Control"), cacheSlots[1] = titleEl;else titleEl = cacheSlots[1];
  let headerRow;
  if (cacheSlots[2] === Symbol.for("react.memo_cache_sentinel")) headerRow = kX.default.createElement(p, null, titleEl, kX.default.createElement(kX.Suspense, {
    fallback: null
  }, kX.default.createElement(RemoteControlStatusIcon, {
    promise: promise
  }))), cacheSlots[2] = headerRow;else headerRow = cacheSlots[2];
  let layout;
  if (cacheSlots[3] === Symbol.for("react.memo_cache_sentinel")) layout = kX.default.createElement(p, {
    flexDirection: "column",
    marginTop: 1
  }, headerRow, kX.default.createElement(M9, {
    variant: "tree"
  }, kX.default.createElement(kX.Suspense, {
    fallback: kX.default.createElement(M9.Node, {
      dimColor: true
    }, "Checking Remote Control eligibility\u2026")
  }, kX.default.createElement(renderFailedCheckItem, {
    promise: promise
  })))), cacheSlots[3] = layout;else layout = cacheSlots[3];
  return layout;
}
function RemoteControlStatusIcon(props) {
  let cacheSlots = aF6.c(2),
    {
      promise: resultPromise
    } = props,
    bridgeInfo = kX.use(resultPromise),
    statusType = bridgeInfo.inRemoteSession ? "info" : bridgeInfo.disabledReason === null && bridgeInfo.checks.every(isCheckPassed) ? "success" : "warning",
    iconEl;
  if (cacheSlots[0] !== statusType) iconEl = kX.default.createElement(V, null, " ", kX.default.createElement(N9, {
    status: statusType
  })), cacheSlots[0] = statusType, cacheSlots[1] = iconEl;else iconEl = cacheSlots[1];
  return iconEl;
}
function isCheckPassed(check) {
  return check.ok;
}
var aF6, kX;
var moduleInit = L(() => {
  $R();
  rH();
  gz();
  O_H();
  Tfq();
  aF6 = x(__(), 1), kX = x(ZH(), 1);
});

export {renderFailedCheckItem as I7p,renderPassedCheckItem as D7p,isCheckFailed as P7p,RemoteControlDiagnosticsTree as O7p,RemoteControlPanel as Ucl,RemoteControlStatusIcon as L7p,isCheckPassed as M7p,aF6 as m5n,kX as isCronFeatureEnabled,moduleInit as $cl};
