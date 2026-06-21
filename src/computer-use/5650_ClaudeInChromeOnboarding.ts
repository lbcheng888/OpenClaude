// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {isChromeExtensionInstalled as iue,rye as aue} from "../permissions/4648_shouldSuppressChromeOffer.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Newline as x4} from "../../vendor/m2436.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Kn as Vn,Li as Di} from "../../vendor/m2572.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var moduleExports = {};
pt(moduleExports, {
  ClaudeInChromeOnboarding: () => ClaudeInChromeOnboarding
});
function ClaudeInChromeOnboarding(props) {
  let memoCache = react_compiler_runtime.c(21),
    {
      onDone: onDone
    } = props,
    [extensionDetected, setExtensionDetected] = react.useState(false),
    onMountEffect,
    onMountDeps;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) onMountEffect = () => {
    j("tengu_claude_in_chrome_onboarding_shown", {}), iue().then(setExtensionDetected).catch(Ie), un(markChromeOnboardingComplete);
  }, onMountDeps = [], memoCache[0] = onMountEffect, memoCache[1] = onMountDeps;else onMountEffect = memoCache[0], onMountDeps = memoCache[1];
  react.useEffect(onMountEffect, onMountDeps);
  let handleKeyDown;
  if (memoCache[2] !== onDone) handleKeyDown = key => {
    if (key.key === "return" && !key.ctrl && !key.meta) key.preventDefault(), onDone();
  }, memoCache[2] = onDone, memoCache[3] = handleKeyDown;else handleKeyDown = memoCache[3];
  let getStartedHint;
  if (memoCache[4] !== extensionDetected) getStartedHint = !extensionDetected && react.default.createElement(react.default.Fragment, null, react.default.createElement(x4, null), react.default.createElement(x4, null), "Requires the Chrome extension. Get started at", " ", react.default.createElement(Fs, {
    url: ONBOARDING_URL
  })), memoCache[4] = extensionDetected, memoCache[5] = getStartedHint;else getStartedHint = memoCache[5];
  let overviewText;
  if (memoCache[6] !== getStartedHint) overviewText = react.default.createElement(w, null, "Claude in Chrome works with the Chrome extension to let you control your browser directly from Claude Code. You can navigate websites, fill forms, capture screenshots, record GIFs, and debug with console logs and network requests.", getStartedHint), memoCache[6] = getStartedHint, memoCache[7] = overviewText;else overviewText = memoCache[7];
  let permissionsLink;
  if (memoCache[8] !== extensionDetected) permissionsLink = extensionDetected && react.default.createElement(react.default.Fragment, null, " ", "(", react.default.createElement(Fs, {
    url: PERMISSIONS_URL
  }), ")"), memoCache[8] = extensionDetected, memoCache[9] = permissionsLink;else permissionsLink = memoCache[9];
  let permissionsText;
  if (memoCache[10] !== permissionsLink) permissionsText = react.default.createElement(w, {
    dimColor: true
  }, "Site-level permissions are inherited from the Chrome extension. Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on", permissionsLink, "."), memoCache[10] = permissionsLink, memoCache[11] = permissionsText;else permissionsText = memoCache[11];
  let chromeCommandLabel;
  if (memoCache[12] === Symbol.for("react.memo_cache_sentinel")) chromeCommandLabel = react.default.createElement(w, {
    bold: true,
    color: "chromeYellow"
  }, "/chrome"), memoCache[12] = chromeCommandLabel;else chromeCommandLabel = memoCache[12];
  let moreInfoText;
  if (memoCache[13] === Symbol.for("react.memo_cache_sentinel")) moreInfoText = react.default.createElement(w, {
    dimColor: true
  }, "For more info, use", " ", chromeCommandLabel, " ", "or visit ", react.default.createElement(Fs, {
    url: "https://code.claude.com/docs/en/chrome"
  })), memoCache[13] = moreInfoText;else moreInfoText = memoCache[13];
  let bodyContainer;
  if (memoCache[14] !== handleKeyDown || memoCache[15] !== overviewText || memoCache[16] !== permissionsText) bodyContainer = react.default.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown
  }, overviewText, permissionsText, moreInfoText), memoCache[14] = handleKeyDown, memoCache[15] = overviewText, memoCache[16] = permissionsText, memoCache[17] = bodyContainer;else bodyContainer = memoCache[17];
  let panel;
  if (memoCache[18] !== onDone || memoCache[19] !== bodyContainer) panel = react.default.createElement(Vn, {
    title: "Claude in Chrome (beta)",
    onCancel: onDone,
    color: "chromeYellow"
  }, bodyContainer), memoCache[18] = onDone, memoCache[19] = bodyContainer, memoCache[20] = panel;else panel = memoCache[20];
  return panel;
}
function markChromeOnboardingComplete(settings) {
  return {
    ...settings,
    hasCompletedClaudeInChromeOnboarding: true
  };
}
var react_compiler_runtime,
  react,
  ONBOARDING_URL = "https://claude.ai/chrome",
  PERMISSIONS_URL = "https://clau.de/chrome/permissions";
var initModule = b(() => {
  Ct();
  Je();
  aue();
  nr();
  wn();
  Di();
  react_compiler_runtime = L(nt(), 1), react = L(Te(), 1);
});

export {moduleExports as Uoc,ClaudeInChromeOnboarding,markChromeOnboardingComplete as e3m,react_compiler_runtime as Foc,react as SD,ONBOARDING_URL as X9m,PERMISSIONS_URL as Q9m,initModule as $oc};
