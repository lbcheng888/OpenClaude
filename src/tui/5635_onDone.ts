// @ts-nocheck
import {Ws,vd} from "../session/1465_promise.ts";
import {Ne} from "../../vendor/m583.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {fD,y8} from "../telemetry/2039_CLAUDE_AX_SCREEN_READER.ts";
import {getInitialSettings as Fr,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {Wzn,Gzn} from "../config/4813_children.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {relaunchInto as DGt,JIo} from "./4926_relaunchInto.ts";
import {getReplConfigArgv as KLe,lt} from "../session/0132_sent.ts";
import {LF,nS} from "../config/2351_nS.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Semantic restoration for tui/5635_onDone.ts (Claude Code v2.1.190).
 * Fullscreen-renderer upsell dialog. Runtime behavior is preserved 1:1;
 * cross-module bundled symbols, properties, and literals remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

/** Decides whether the fullscreen-renderer upsell dialog should be shown. */
function shouldShowFullscreenUpsell(): boolean {
  if (Ws()) return !1;
  if (Ne.CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL) return !0;
  if (Cs()) return !1;
  if (fD()) return !1;
  if (Fr().tui !== void 0) return !1;
  if (!Wzn()) return !1;
  if ((Ot().fullscreenUpsellSeenCount ?? 0) >= E2o) return !1;
  return !0;
}

/** Renders the fullscreen-renderer upsell dialog and wires accept/dismiss handlers. */
function FullscreenUpsellDialog(props: { onDone: UnknownFn }): any {
  let cache = Suc.c(13),
    {
      onDone
    } = props,
    hasResponded = qnr.useRef(!1),
    onMountEffect: any;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) onMountEffect = [], cache[0] = onMountEffect;else onMountEffect = cache[0];
  qnr.useEffect(YGm, onMountEffect);
  let markSeenFn: any;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) markSeenFn = function () {
    hn(jGm);
  }, cache[1] = markSeenFn;else markSeenFn = cache[1];
  let markSeen = markSeenFn,
    onConfirmFn: any;
  if (cache[2] !== onDone) onConfirmFn = function () {
    if (hasResponded.current) return;
    hasResponded.current = !0;
    let {
      error: saveError
    } = ao("userSettings", {
      tui: "fullscreen"
    });
    if (saveError) {
      Ie(saveError), onDone();
      return;
    }
    markSeen(), W("tengu_fullscreen_upsell_dialog_accepted", {}), DGt("fullscreen", KLe()).catch(catchError => {
      Ie(catchError), onDone();
    });
  }, cache[2] = onDone, cache[3] = onConfirmFn;else onConfirmFn = cache[3];
  let onConfirm = onConfirmFn,
    onCancelFn: any;
  if (cache[4] !== onDone) onCancelFn = function () {
    if (hasResponded.current) return;
    hasResponded.current = !0, markSeen(), W("tengu_fullscreen_upsell_dialog_dismissed", {}), onDone();
  }, cache[4] = onDone, cache[5] = onCancelFn;else onCancelFn = cache[5];
  let onCancel = onCancelFn,
    showFlickerNote = !LF(),
    featureList: any;
  if (cache[6] === Symbol.for("react.memo_cache_sentinel")) featureList = VSe.jsxs($, {
    flexDirection: "column",
    children: [VSe.jsxs(v, {
      dimColor: !0,
      children: ["\xB7 Flicker-free output", showFlickerNote ? " \u2014 fixes the flashing you see during long responses" : ""]
    }), VSe.jsx(v, {
      dimColor: !0,
      children: "\xB7 Mouse support \u2014 click to move your cursor or expand results"
    }), VSe.jsx(v, {
      dimColor: !0,
      children: "\xB7 Selected text auto-copies to your clipboard"
    })]
  }), cache[6] = featureList;else featureList = cache[6];
  let confirmBody: any;
  if (cache[7] !== onConfirm || cache[8] !== onCancel) confirmBody = VSe.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [featureList, VSe.jsx(Bl, {
      confirmLabel: "Yes, try it",
      cancelLabel: "Not now",
      onConfirm: onConfirm,
      onCancel: onCancel
    })]
  }), cache[7] = onConfirm, cache[8] = onCancel, cache[9] = confirmBody;else confirmBody = cache[9];
  let dialog: any;
  if (cache[10] !== onCancel || cache[11] !== confirmBody) dialog = VSe.jsx(Jn, {
    title: "Try the new fullscreen renderer?",
    onCancel: onCancel,
    children: confirmBody
  }), cache[10] = onCancel, cache[11] = confirmBody, cache[12] = dialog;else dialog = cache[12];
  return dialog;
}

/** Config updater: marks the upsell as seen by bumping the seen-count to the cap. */
function jGm(config) {
  return (config.fullscreenUpsellSeenCount ?? 0) >= E2o ? config : {
    ...config,
    fullscreenUpsellSeenCount: E2o
  };
}

/** Telemetry hook fired when the dialog is first shown. */
function YGm() {
  W("tengu_fullscreen_upsell_dialog_shown", {});
}
var Suc,
  qnr,
  VSe,
  E2o = 3;
var Cuc = b(() => {
  lt();
  JIo();
  nS();
  je();
  kt();
  vd();
  tr();
  Ir();
  tp();
  vn();
  y8();
  br();
  d_();
  di();
  Gzn();
  Suc = x(tt(), 1), qnr = x(et(), 1), VSe = x(oe(), 1);
});

export {shouldShowFullscreenUpsell as buc,FullscreenUpsellDialog as Euc,jGm,YGm,Suc,qnr,VSe,E2o,Cuc};
