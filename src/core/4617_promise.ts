// @ts-nocheck
import {cs,kte} from "../../vendor/m3992.ts";
import {KKn,rvo} from "../../vendor/m4614.ts";
import {getBridgeDoctorInfo as lvo,pH} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Remote Control eligibility panel (React/Ink TUI).
 * Renders the list of eligibility checks for the Remote Control feature,
 * driven by a bridge-doctor info promise resolved via React's `use()`.
 */

/** A single eligibility check result attached to the bridge-doctor info. */
interface RemoteControlCheck {
  ok: boolean;
  label: string;
  detail?: string;
}

/** Resolved bridge-doctor info describing Remote Control state. */
interface BridgeDoctorInfo {
  inRemoteSession: boolean;
  disabledReason: string | null;
  checks: RemoteControlCheck[];
}

/**
 * Suspense child that reads the bridge-doctor promise and renders either the
 * "cloud session" notice, a disabled-reason banner with failed checks, or the
 * default passing-check tree.
 */
function renderFailedCheckItem(props) {
  let cacheSlots = zKn.c(8),
    {
      promise: bridgeInfoPromise
    } = props,
    bridgeInfo = mht.use(bridgeInfoPromise);
  if (bridgeInfo.inRemoteSession) {
    let cloudNotice;
    if (cacheSlots[0] === Symbol.for("react.memo_cache_sentinel")) cloudNotice = KI.jsx(cs.Node, {
      dimColor: !0,
      children: "Inside a cloud session — Remote Control is unavailable here. Use it from the local session instead."
    }), cacheSlots[0] = cloudNotice;else cloudNotice = cacheSlots[0];
    return cloudNotice;
  }
  let checks = bridgeInfo.checks,
    passingTree,
    earlyReturn;
  if (cacheSlots[1] !== bridgeInfo.checks || cacheSlots[2] !== bridgeInfo.disabledReason) {
    earlyReturn = Symbol.for("react.early_return_sentinel");
    e: {
      let failedChecks = checks.filter(isCheckFailed);
      if (bridgeInfo.disabledReason !== null) {
        let disabledBanner;
        if (cacheSlots[5] !== bridgeInfo.disabledReason) disabledBanner = KI.jsx(cs.Node, {
          label: KI.jsx(KKn, {
            color: "warning",
            children: bridgeInfo.disabledReason
          })
        }), cacheSlots[5] = bridgeInfo.disabledReason, cacheSlots[6] = disabledBanner;else disabledBanner = cacheSlots[6];
        earlyReturn = KI.jsxs(cs.Group, {
          children: [disabledBanner, failedChecks.map(renderFailedDetailItem)]
        });
        break e;
      }
      let hintNode;
      if (cacheSlots[7] === Symbol.for("react.memo_cache_sentinel")) hintNode = KI.jsx(cs.Node, {
        dimColor: !0,
        children: "Control this session from claude.ai/code or the Claude mobile app"
      }), cacheSlots[7] = hintNode;else hintNode = cacheSlots[7];
      passingTree = KI.jsxs(cs.Group, {
        children: [hintNode, failedChecks.map(renderWarningCheckItem)]
      });
    }
    cacheSlots[1] = bridgeInfo.checks, cacheSlots[2] = bridgeInfo.disabledReason, cacheSlots[3] = passingTree, cacheSlots[4] = earlyReturn;
  } else passingTree = cacheSlots[3], earlyReturn = cacheSlots[4];
  if (earlyReturn !== Symbol.for("react.early_return_sentinel")) return earlyReturn;
  return passingTree;
}

/** Renders a check label (with optional detail) in warning color. */
function renderWarningCheckItem(check: RemoteControlCheck) {
  return KI.jsxs(cs.Node, {
    color: "warning",
    children: [check.label, check.detail ? ` (${check.detail})` : ""]
  }, check.label);
}

/** Renders a check label (with optional detail) dimmed. */
function renderFailedDetailItem(check: RemoteControlCheck) {
  return KI.jsxs(cs.Node, {
    dimColor: !0,
    children: [check.label, check.detail ? ` (${check.detail})` : ""]
  }, check.label);
}

/** Predicate: a check that did not pass. */
function isCheckFailed(check: RemoteControlCheck): boolean {
  return !check.ok;
}

/** Top-level Remote Control panel: header row + suspense-wrapped check tree. */
function RemoteControlPanel() {
  let cacheSlots = zKn.c(4),
    bridgeInfoPromise;
  if (cacheSlots[0] === Symbol.for("react.memo_cache_sentinel")) bridgeInfoPromise = lvo(), cacheSlots[0] = bridgeInfoPromise;else bridgeInfoPromise = cacheSlots[0];
  let promise = bridgeInfoPromise,
    titleEl;
  if (cacheSlots[1] === Symbol.for("react.memo_cache_sentinel")) titleEl = KI.jsx(v, {
    bold: !0,
    children: "Remote Control"
  }), cacheSlots[1] = titleEl;else titleEl = cacheSlots[1];
  let headerRow;
  if (cacheSlots[2] === Symbol.for("react.memo_cache_sentinel")) headerRow = KI.jsxs($, {
    children: [titleEl, KI.jsx(mht.Suspense, {
      fallback: null,
      children: KI.jsx(RemoteControlStatusIcon, {
        promise: promise
      })
    })]
  }), cacheSlots[2] = headerRow;else headerRow = cacheSlots[2];
  let layout;
  if (cacheSlots[3] === Symbol.for("react.memo_cache_sentinel")) layout = KI.jsxs($, {
    flexDirection: "column",
    marginTop: 1,
    children: [headerRow, KI.jsx(cs, {
      variant: "tree",
      children: KI.jsx(mht.Suspense, {
        fallback: KI.jsx(cs.Node, {
          dimColor: !0,
          children: "Checking Remote Control eligibility…"
        }),
        children: KI.jsx(renderFailedCheckItem, {
          promise: promise
        })
      })
    })]
  }), cacheSlots[3] = layout;else layout = cacheSlots[3];
  return layout;
}

/** Inline status icon in the header reflecting overall Remote Control state. */
function RemoteControlStatusIcon(props) {
  let cacheSlots = zKn.c(2),
    {
      promise: resultPromise
    } = props,
    bridgeInfo = mht.use(resultPromise),
    statusType = bridgeInfo.inRemoteSession ? "info" : bridgeInfo.disabledReason === null && bridgeInfo.checks.every(isCheckPassed) ? "success" : "warning",
    iconEl;
  if (cacheSlots[0] !== statusType) iconEl = KI.jsxs(v, {
    children: [" ", KI.jsx(bs, {
      status: statusType
    })]
  }), cacheSlots[0] = statusType, cacheSlots[1] = iconEl;else iconEl = cacheSlots[1];
  return iconEl;
}

/** Predicate: a check that passed. */
function isCheckPassed(check: RemoteControlCheck): boolean {
  return check.ok;
}

var zKn, mht, KI;
var moduleInit = b(() => {
  pH();
  je();
  ff();
  kte();
  rvo();
  zKn = x(tt(), 1), mht = x(et(), 1), KI = x(oe(), 1);
});

export {renderFailedCheckItem as Ltm,renderWarningCheckItem as Mtm,renderFailedDetailItem as Ntm,isCheckFailed as Ftm,RemoteControlPanel as b_l,RemoteControlStatusIcon as Btm,isCheckPassed as Utm,zKn,mht,KI,moduleInit as E_l};
