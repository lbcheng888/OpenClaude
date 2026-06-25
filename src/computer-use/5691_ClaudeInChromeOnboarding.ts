// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {isChromeExtensionInstalled as Tue,kTe} from "../permissions/4676_shouldSuppressChromeOffer.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Newline as l4} from "../../vendor/m2446.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var Lmc = {};
ft(Lmc, {
  ClaudeInChromeOnboarding: () => ClaudeInChromeOnboarding
});
/**
 * Onboarding panel shown the first time the user opens "Claude in Chrome".
 * Explains what the Chrome extension enables, links to setup/permissions,
 * and dismisses via Enter or cancel.
 */
function ClaudeInChromeOnboarding(props: { onDone: () => void }) {
  let memoCache = Omc.c(21),
    {
      onDone: onDone
    } = props,
    [extensionDetected, setExtensionDetected] = frr.useState(!1),
    onMountEffect,
    onMountDeps;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) onMountEffect = () => {
    W("tengu_claude_in_chrome_onboarding_shown", {}), Tue().then(setExtensionDetected).catch(Ie), hn(markChromeOnboardingComplete);
  }, onMountDeps = [], memoCache[0] = onMountEffect, memoCache[1] = onMountDeps;else onMountEffect = memoCache[0], onMountDeps = memoCache[1];
  frr.useEffect(onMountEffect, onMountDeps);
  let handleKeyDown;
  if (memoCache[2] !== onDone) handleKeyDown = (key: { key: string; ctrl: boolean; meta: boolean; preventDefault: () => void }) => {
    if (key.key === "return" && !key.ctrl && !key.meta) key.preventDefault(), onDone();
  }, memoCache[2] = onDone, memoCache[3] = handleKeyDown;else handleKeyDown = memoCache[3];
  let getStartedHint;
  if (memoCache[4] !== extensionDetected) getStartedHint = !extensionDetected && NL.jsxs(NL.Fragment, {
    children: [NL.jsx(l4, {}), NL.jsx(l4, {}), "Requires the Chrome extension. Get started at", " ", NL.jsx(Ss, {
      url: ONBOARDING_URL
    })]
  }), memoCache[4] = extensionDetected, memoCache[5] = getStartedHint;else getStartedHint = memoCache[5];
  let overviewText;
  if (memoCache[6] !== getStartedHint) overviewText = NL.jsxs(v, {
    children: ["Claude in Chrome works with the Chrome extension to let you control your browser directly from Claude Code. You can navigate websites, fill forms, capture screenshots, record GIFs, and debug with console logs and network requests.", getStartedHint]
  }), memoCache[6] = getStartedHint, memoCache[7] = overviewText;else overviewText = memoCache[7];
  let permissionsLink;
  if (memoCache[8] !== extensionDetected) permissionsLink = extensionDetected && NL.jsxs(NL.Fragment, {
    children: [" ", "(", NL.jsx(Ss, {
      url: PERMISSIONS_URL
    }), ")"]
  }), memoCache[8] = extensionDetected, memoCache[9] = permissionsLink;else permissionsLink = memoCache[9];
  let permissionsText;
  if (memoCache[10] !== permissionsLink) permissionsText = NL.jsxs(v, {
    dimColor: !0,
    children: ["Site-level permissions are inherited from the Chrome extension. Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on", permissionsLink, "."]
  }), memoCache[10] = permissionsLink, memoCache[11] = permissionsText;else permissionsText = memoCache[11];
  let chromeCommandLabel;
  if (memoCache[12] === Symbol.for("react.memo_cache_sentinel")) chromeCommandLabel = NL.jsx(v, {
    bold: !0,
    color: "chromeYellow",
    children: "/chrome"
  }), memoCache[12] = chromeCommandLabel;else chromeCommandLabel = memoCache[12];
  let moreInfoText;
  if (memoCache[13] === Symbol.for("react.memo_cache_sentinel")) moreInfoText = NL.jsxs(v, {
    dimColor: !0,
    children: ["For more info, use", " ", chromeCommandLabel, " ", "or visit ", NL.jsx(Ss, {
      url: "https://code.claude.com/docs/en/chrome"
    })]
  }), memoCache[13] = moreInfoText;else moreInfoText = memoCache[13];
  let bodyContainer;
  if (memoCache[14] !== handleKeyDown || memoCache[15] !== overviewText || memoCache[16] !== permissionsText) bodyContainer = NL.jsxs($, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKeyDown,
    children: [overviewText, permissionsText, moreInfoText]
  }), memoCache[14] = handleKeyDown, memoCache[15] = overviewText, memoCache[16] = permissionsText, memoCache[17] = bodyContainer;else bodyContainer = memoCache[17];
  let panel;
  if (memoCache[18] !== onDone || memoCache[19] !== bodyContainer) panel = NL.jsx(Jn, {
    title: "Claude in Chrome (beta)",
    onCancel: onDone,
    color: "chromeYellow",
    children: bodyContainer
  }), memoCache[18] = onDone, memoCache[19] = bodyContainer, memoCache[20] = panel;else panel = memoCache[20];
  return panel;
}
/** Marks the Claude-in-Chrome onboarding as completed in the persisted settings. */
function markChromeOnboardingComplete(settings) {
  return {
    ...settings,
    hasCompletedClaudeInChromeOnboarding: !0
  };
}
var Omc,
  frr,
  NL,
  ONBOARDING_URL = "https://claude.ai/chrome",
  PERMISSIONS_URL = "https://clau.de/chrome/permissions";
var Mmc = b(() => {
  kt();
  je();
  kTe();
  tr();
  vn();
  di();
  Omc = x(tt(), 1), frr = x(et(), 1), NL = x(oe(), 1);
});

export {Lmc,ClaudeInChromeOnboarding,markChromeOnboardingComplete as UKm,Omc,frr,NL,ONBOARDING_URL as NKm,PERMISSIONS_URL as FKm,Mmc};
