// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {isInProductPermissionsEnabled as G2e,bO} from "../mcp/2592_trackClaudeInChromeTabId.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var Fmc = {};
ft(Fmc, {
  ChromeAutoEnableDialog: () => ChromeAutoEnableDialog
});
/**
 * Dialog shown when the Claude-in-Chrome extension is detected, offering to
 * enable browser tools by default for the current and future sessions.
 *
 * @param props - onDone callback (receives the user's yes/no choice), plus
 *   isDontAskMode / isAutoMode flags describing the current permission mode.
 */
function ChromeAutoEnableDialog(props: {
  onDone: (enabled: boolean) => void;
  isDontAskMode?: boolean;
  isAutoMode?: boolean;
}) {
  let memoCache = Nmc.c(16),
    {
      onDone: onDone,
      isDontAskMode: isDontAskModeProp,
      isAutoMode: isAutoModeProp
    } = props,
    isDontAskMode = isDontAskModeProp === void 0 ? !1 : isDontAskModeProp,
    isAutoMode = isAutoModeProp === void 0 ? !1 : isAutoModeProp,
    effectDeps;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) effectDeps = [], memoCache[0] = effectDeps;else effectDeps = memoCache[0];
  hrr.useEffect(qKm, effectDeps);
  let hasDecidedRef = hrr.useRef(!1),
    handleDecision;
  if (memoCache[1] !== onDone) handleDecision = function (enabled: boolean) {
    if (hasDecidedRef.current) return;
    if (hasDecidedRef.current = !0, hn((config: any) => ({
      ...config,
      claudeInChromeDefaultEnabled: enabled,
      ...(enabled && {
        hasCompletedClaudeInChromeOnboarding: !0
      })
    })), enabled) He("chrome_auto_enable_prompt");else Pt("chrome_auto_enable_prompt", "declined");
    onDone(enabled);
  }, memoCache[1] = onDone, memoCache[2] = handleDecision;else handleDecision = memoCache[2];
  let decide = handleDecision,
    onCancel;
  if (memoCache[3] !== decide) onCancel = () => decide(!1), memoCache[3] = decide, memoCache[4] = onCancel;else onCancel = memoCache[4];
  let inputGuide;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) inputGuide = Qne.jsxs(bn, {
    children: [Qne.jsx(at, {
      chord: "enter",
      action: "confirm"
    }), Qne.jsx(dr, {
      action: "confirm:no",
      context: "Confirmation",
      fallback: "Esc",
      description: "keep browser tools off"
    })]
  }), memoCache[5] = inputGuide;else inputGuide = memoCache[5];
  let descriptionText;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) descriptionText = Qne.jsx(v, {
    children: "Claude will use your Chrome browser by default — navigating sites, filling forms, and capturing screenshots in your existing session."
  }), memoCache[6] = descriptionText;else descriptionText = memoCache[6];
  let permissionNote = G2e() ? isDontAskMode ? "This session is in Don't Ask mode, so browser actions that need approval are skipped rather than prompted." : isAutoMode ? "This session is in Auto mode, so an AI classifier approves routine browser actions — you are only prompted when it is unsure." : "Browser actions still go through Claude's regular permission prompts before they run." : "Site-level permissions come from the Chrome extension.",
    chromeCommandLabel;
  if (memoCache[7] === Symbol.for("react.memo_cache_sentinel")) chromeCommandLabel = Qne.jsx(v, {
    bold: !0,
    color: "permission",
    children: "/chrome"
  }), memoCache[7] = chromeCommandLabel;else chromeCommandLabel = memoCache[7];
  let bodyContent;
  if (memoCache[8] !== permissionNote) bodyContent = Qne.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [descriptionText, Qne.jsxs(v, {
      dimColor: !0,
      children: [permissionNote, " ", "Turn browser tools off for future sessions with", " ", chromeCommandLabel, "."]
    })]
  }), memoCache[8] = permissionNote, memoCache[9] = bodyContent;else bodyContent = memoCache[9];
  let confirmPrompt;
  if (memoCache[10] !== decide) confirmPrompt = Qne.jsx(Bl, {
    confirmLabel: "Yes, use my browser",
    cancelLabel: "No, keep browser tools off",
    onConfirm: () => decide(!0),
    onCancel: () => decide(!1)
  }), memoCache[10] = decide, memoCache[11] = confirmPrompt;else confirmPrompt = memoCache[11];
  let dialog;
  if (memoCache[12] !== bodyContent || memoCache[13] !== confirmPrompt || memoCache[14] !== onCancel) dialog = Qne.jsxs(Jn, {
    title: "Claude in Chrome extension detected",
    color: "permission",
    onCancel: onCancel,
    inputGuide: inputGuide,
    children: [bodyContent, confirmPrompt]
  }), memoCache[12] = bodyContent, memoCache[13] = confirmPrompt, memoCache[14] = onCancel, memoCache[15] = dialog;else dialog = memoCache[15];
  return dialog;
}
/** Telemetry: fires once when the auto-enable prompt is first shown. */
function qKm() {
  W("tengu_chrome_auto_enable_prompt_shown", {});
}
var Nmc, hrr, Qne;
var Bmc = b(() => {
  kt();
  je();
  mn();
  bO();
  tr();
  uc();
  Is();
  d_();
  di();
  Wo();
  Nmc = x(tt(), 1), hrr = x(et(), 1), Qne = x(oe(), 1);
});

export {Fmc,ChromeAutoEnableDialog,qKm,Nmc,hrr,Qne,Bmc};
