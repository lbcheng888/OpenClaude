// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Uee,RIe,ono,rno,oLn,bat} from "../telemetry/3353_level.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {hr} from "../../vendor/m2573.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {je} from "../../vendor/m2462.ts";
import {TS} from "../../vendor/m4541.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var MDl = {};
ft(MDl, {
  PrivacySettingsDialog: () => PrivacySettingsDialog,
  GroveDialog: () => GroveDialog
});
/**
 * Body content shown while still inside the consumer-terms grace period.
 * Explains the upcoming changes and that the user may accept the new terms early.
 */
function GracePeriodContent() {
  let memoCache = OGt.c(9),
    introText: any;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) introText = il.jsxs(v, {
    children: ["An update to our Consumer Terms and Privacy Policy will take effect on", " ", il.jsx(v, {
      bold: !0,
      children: "October 8, 2025"
    }), ". You can accept the updated terms today."]
  }), memoCache[0] = introText;else introText = memoCache[0];
  let whatsChangingHeading: any;
  if (memoCache[1] === Symbol.for("react.memo_cache_sentinel")) whatsChangingHeading = il.jsx(v, {
    children: "What's changing?"
  }), memoCache[1] = whatsChangingHeading;else whatsChangingHeading = memoCache[1];
  let bullet: any, boldImproveAI: any;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) bullet = il.jsx(v, {
    children: "\xB7 "
  }), boldImproveAI = il.jsx(v, {
    bold: !0,
    children: "Help improve our AI models "
  }), memoCache[2] = bullet, memoCache[3] = boldImproveAI;else bullet = memoCache[2], boldImproveAI = memoCache[3];
  let improveAIBlock: any;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) improveAIBlock = il.jsx($, {
    paddingLeft: 1,
    children: il.jsxs(v, {
      children: [bullet, boldImproveAI, il.jsxs(v, {
        children: ["— Allow the use of your chats and coding sessions to train and improve Anthropic AI models. Change anytime in your Privacy Settings (", il.jsx(Ss, {
          url: "https://claude.ai/settings/data-privacy-controls"
        }), ")."]
      })]
    })
  }), memoCache[4] = improveAIBlock;else improveAIBlock = memoCache[4];
  let changingSection: any;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) changingSection = il.jsxs($, {
    flexDirection: "column",
    children: [whatsChangingHeading, improveAIBlock, il.jsx($, {
      paddingLeft: 1,
      children: il.jsxs(v, {
        children: [il.jsx(v, {
          children: "\xB7 "
        }), il.jsx(v, {
          bold: !0,
          children: "Updates to data retention "
        }), il.jsx(v, {
          children: "— To help us improve our AI models and safety protections, we're extending data retention to 5 years."
        })]
      })
    })]
  }), memoCache[5] = changingSection;else changingSection = memoCache[5];
  let learnMoreLink: any;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) learnMoreLink = il.jsx(Ss, {
    url: "https://www.anthropic.com/news/updates-to-our-consumer-terms"
  }), memoCache[6] = learnMoreLink;else learnMoreLink = memoCache[6];
  let termsLink: any;
  if (memoCache[7] === Symbol.for("react.memo_cache_sentinel")) termsLink = il.jsx(Ss, {
    url: "https://anthropic.com/legal/terms"
  }), memoCache[7] = termsLink;else termsLink = memoCache[7];
  let content: any;
  if (memoCache[8] === Symbol.for("react.memo_cache_sentinel")) content = il.jsxs(il.Fragment, {
    children: [introText, changingSection, il.jsxs(v, {
      children: ["Learn more (", learnMoreLink, ") or read the updated Consumer Terms (", termsLink, ") and Privacy Policy (", il.jsx(Ss, {
        url: "https://anthropic.com/legal/privacy"
      }), ")"]
    })]
  }), memoCache[8] = content;else content = memoCache[8];
  return content;
}
/**
 * Body content shown after the grace period has ended.
 * Describes the data-retention impact of the "improve Claude" setting.
 */
function PostGracePeriodContent() {
  let memoCache = OGt.c(7),
    headingText: any;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) headingText = il.jsx(v, {
    children: "We've updated our Consumer Terms and Privacy Policy."
  }), memoCache[0] = headingText;else headingText = memoCache[0];
  let whatsChangingHeading: any;
  if (memoCache[1] === Symbol.for("react.memo_cache_sentinel")) whatsChangingHeading = il.jsx(v, {
    children: "What's changing?"
  }), memoCache[1] = whatsChangingHeading;else whatsChangingHeading = memoCache[1];
  let improveAISection: any;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) improveAISection = il.jsxs($, {
    flexDirection: "column",
    children: [il.jsx(v, {
      bold: !0,
      children: "Help improve our AI models"
    }), il.jsx(v, {
      children: "Allow the use of your chats and coding sessions to train and improve Anthropic AI models. You can change this anytime in Privacy Settings"
    }), il.jsx(Ss, {
      url: "https://claude.ai/settings/data-privacy-controls"
    })]
  }), memoCache[2] = improveAISection;else improveAISection = memoCache[2];
  let changingSection: any;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) changingSection = il.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [whatsChangingHeading, improveAISection, il.jsxs($, {
      flexDirection: "column",
      children: [il.jsx(v, {
        bold: !0,
        children: "How this affects data retention"
      }), il.jsx(v, {
        children: "Turning ON the improve Claude setting extends data retention from 30 days to 5 years. Turning it OFF keeps the default 30-day data retention. Delete data anytime."
      })]
    })]
  }), memoCache[3] = changingSection;else changingSection = memoCache[3];
  let learnMoreLink: any;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) learnMoreLink = il.jsx(Ss, {
    url: "https://www.anthropic.com/news/updates-to-our-consumer-terms"
  }), memoCache[4] = learnMoreLink;else learnMoreLink = memoCache[4];
  let termsLink: any;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) termsLink = il.jsx(Ss, {
    url: "https://anthropic.com/legal/terms"
  }), memoCache[5] = termsLink;else termsLink = memoCache[5];
  let content: any;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) content = il.jsxs(il.Fragment, {
    children: [headingText, changingSection, il.jsxs(v, {
      children: ["Learn more (", learnMoreLink, ") or read the updated Consumer Terms (", termsLink, ") and Privacy Policy (", il.jsx(Ss, {
        url: "https://anthropic.com/legal/privacy"
      }), ")"]
    })]
  }), memoCache[6] = content;else content = memoCache[6];
  return content;
}
/**
 * Full-screen Grove consumer-terms acceptance dialog.
 * Loads settings + notice config, decides whether to show, and lets the user
 * accept (opt in/out), defer, or escape, emitting telemetry for each choice.
 */
function GroveDialog(props) {
  let memoCache = OGt.c(35),
    {
      showIfAlreadyViewed: showIfAlreadyViewed,
      location: location,
      onDone: onDone
    } = props,
    [shouldShow, setShouldShow] = qWe.useState(null),
    [noticeConfig, setNoticeConfig] = qWe.useState(null),
    effectFn: any,
    effectDeps: any;
  if (memoCache[0] !== location || memoCache[1] !== onDone || memoCache[2] !== showIfAlreadyViewed) effectFn = () => {
    (async function () {
      let [settingsResult, noticeConfigResult] = await Promise.all([Uee(), RIe()]),
        noticeData = noticeConfigResult.success ? noticeConfigResult.data : null;
      setNoticeConfig(noticeData);
      let show = ono(settingsResult, noticeConfigResult, showIfAlreadyViewed);
      if (setShouldShow(show), !show) {
        onDone("skip_rendering");
        return;
      }
      rno(), W("tengu_grove_policy_viewed", {
        location: Le(location),
        dismissable: noticeData?.notice_is_grace_period
      });
    })();
  }, effectDeps = [showIfAlreadyViewed, location, onDone], memoCache[0] = location, memoCache[1] = onDone, memoCache[2] = showIfAlreadyViewed, memoCache[3] = effectFn, memoCache[4] = effectDeps;else effectFn = memoCache[3], effectDeps = memoCache[4];
  if (qWe.useEffect(effectFn, effectDeps), shouldShow === null) return null;
  if (!shouldShow) return null;
  let handleChoice: any;
  if (memoCache[5] !== noticeConfig?.notice_is_grace_period || memoCache[6] !== onDone) handleChoice = async function (choice) {
    e: switch (choice) {
      case "accept_opt_in":
        {
          await oLn(!0), W("tengu_grove_policy_submitted", {
            state: !0,
            dismissable: noticeConfig?.notice_is_grace_period
          });
          break e;
        }
      case "accept_opt_out":
        {
          await oLn(!1), W("tengu_grove_policy_submitted", {
            state: !1,
            dismissable: noticeConfig?.notice_is_grace_period
          });
          break e;
        }
      case "defer":
        {
          W("tengu_grove_policy_dismissed", {
            state: !0
          });
          break e;
        }
      case "escape":
        W("tengu_grove_policy_escaped", {});
    }
    onDone(choice);
  }, memoCache[5] = noticeConfig?.notice_is_grace_period, memoCache[6] = onDone, memoCache[7] = handleChoice;else handleChoice = memoCache[7];
  let onChoiceSelected = handleChoice,
    acceptOptions: any;
  if (memoCache[8] !== noticeConfig?.domain_excluded) acceptOptions = noticeConfig?.domain_excluded ? [{
    label: "Accept terms \xB7 Help improve our AI models: OFF (for emails with your domain)",
    value: "accept_opt_out"
  }] : [{
    label: "Accept terms \xB7 Help improve our AI models: ON",
    value: "accept_opt_in"
  }, {
    label: "Accept terms \xB7 Help improve our AI models: OFF",
    value: "accept_opt_out"
  }], memoCache[8] = noticeConfig?.domain_excluded, memoCache[9] = acceptOptions;else acceptOptions = memoCache[9];
  let primaryOptions = acceptOptions,
    handleCancel: any;
  if (memoCache[10] !== noticeConfig?.notice_is_grace_period || memoCache[11] !== onChoiceSelected) handleCancel = function () {
    if (noticeConfig?.notice_is_grace_period) {
      onChoiceSelected("defer");
      return;
    }
    onChoiceSelected("escape");
  }, memoCache[10] = noticeConfig?.notice_is_grace_period, memoCache[11] = onChoiceSelected, memoCache[12] = handleCancel;else handleCancel = memoCache[12];
  let onCancel = handleCancel,
    inputGuide: any;
  if (memoCache[13] === Symbol.for("react.memo_cache_sentinel")) inputGuide = il.jsxs(bn, {
    children: [il.jsx(at, {
      chord: "enter",
      action: "confirm"
    }), il.jsx(at, {
      chord: "escape",
      action: "cancel"
    })]
  }), memoCache[13] = inputGuide;else inputGuide = memoCache[13];
  let bodySection: any;
  if (memoCache[14] !== noticeConfig?.notice_is_grace_period) bodySection = il.jsx($, {
    flexDirection: "column",
    gap: 1,
    flexGrow: 1,
    children: noticeConfig?.notice_is_grace_period ? il.jsx(GracePeriodContent, {}) : il.jsx(PostGracePeriodContent, {})
  }), memoCache[14] = noticeConfig?.notice_is_grace_period, memoCache[15] = bodySection;else bodySection = memoCache[15];
  let asciiArtBlock: any;
  if (memoCache[16] === Symbol.for("react.memo_cache_sentinel")) asciiArtBlock = il.jsx($, {
    flexShrink: 0,
    children: il.jsx(v, {
      color: "professionalBlue",
      children: newTermsAsciiArt
    })
  }), memoCache[16] = asciiArtBlock;else asciiArtBlock = memoCache[16];
  let bodyRow: any;
  if (memoCache[17] !== bodySection) bodyRow = il.jsxs($, {
    flexDirection: "row",
    children: [bodySection, asciiArtBlock]
  }), memoCache[17] = bodySection, memoCache[18] = bodyRow;else bodyRow = memoCache[18];
  let selectionHeading: any;
  if (memoCache[19] === Symbol.for("react.memo_cache_sentinel")) selectionHeading = il.jsxs($, {
    flexDirection: "column",
    children: [il.jsx(v, {
      bold: !0,
      children: "Please select how you'd like to continue"
    }), il.jsx(v, {
      children: "Your choice takes effect immediately upon confirmation."
    })]
  }), memoCache[19] = selectionHeading;else selectionHeading = memoCache[19];
  let deferOptions: any;
  if (memoCache[20] !== noticeConfig?.notice_is_grace_period) deferOptions = noticeConfig?.notice_is_grace_period ? [{
    label: "Not now",
    value: "defer"
  }] : [], memoCache[20] = noticeConfig?.notice_is_grace_period, memoCache[21] = deferOptions;else deferOptions = memoCache[21];
  let allOptions: any;
  if (memoCache[22] !== primaryOptions || memoCache[23] !== deferOptions) allOptions = [...primaryOptions, ...deferOptions], memoCache[22] = primaryOptions, memoCache[23] = deferOptions, memoCache[24] = allOptions;else allOptions = memoCache[24];
  let onChangeWrapper: any;
  if (memoCache[25] !== onChoiceSelected) onChangeWrapper = value => onChoiceSelected(value), memoCache[25] = onChoiceSelected, memoCache[26] = onChangeWrapper;else onChangeWrapper = memoCache[26];
  let selectionSection: any;
  if (memoCache[27] !== onCancel || memoCache[28] !== allOptions || memoCache[29] !== onChangeWrapper) selectionSection = il.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [selectionHeading, il.jsx(hr, {
      options: allOptions,
      onChange: onChangeWrapper,
      onCancel: onCancel
    })]
  }), memoCache[27] = onCancel, memoCache[28] = allOptions, memoCache[29] = onChangeWrapper, memoCache[30] = selectionSection;else selectionSection = memoCache[30];
  let dialogElement: any;
  if (memoCache[31] !== onCancel || memoCache[32] !== selectionSection || memoCache[33] !== bodyRow) dialogElement = il.jsxs(Jn, {
    title: "Updates to Consumer Terms and Policies",
    color: "professionalBlue",
    onCancel: onCancel,
    inputGuide: inputGuide,
    children: [bodyRow, selectionSection]
  }), memoCache[31] = onCancel, memoCache[32] = selectionSection, memoCache[33] = bodyRow, memoCache[34] = dialogElement;else dialogElement = memoCache[34];
  return dialogElement;
}
/**
 * Compact "Data privacy" settings dialog with a single toggle for the
 * "improve our AI models" (grove) setting. Toggling persists immediately.
 */
function PrivacySettingsDialog(props) {
  let memoCache = OGt.c(20),
    {
      settings: settings,
      domainExcluded: domainExcluded,
      onDone: onDone
    } = props,
    [groveEnabled, setGroveEnabled] = qWe.useState(settings.grove_enabled),
    emptyDepsRef: any;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) emptyDepsRef = [], memoCache[0] = emptyDepsRef;else emptyDepsRef = memoCache[0];
  qWe.useEffect(onPrivacySettingsViewed, emptyDepsRef);
  let handleKeyDown: any;
  if (memoCache[1] !== domainExcluded || memoCache[2] !== groveEnabled) handleKeyDown = function (event) {
    if (event.ctrl || event.meta) return;
    if (!domainExcluded && (event.key === "tab" || event.key === "return" || event.key === " ")) {
      event.preventDefault();
      let newValue = !groveEnabled;
      setGroveEnabled(newValue), oLn(newValue);
    }
  }, memoCache[1] = domainExcluded, memoCache[2] = groveEnabled, memoCache[3] = handleKeyDown;else handleKeyDown = memoCache[3];
  let onKeyDown = handleKeyDown,
    falseValueText: any;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) falseValueText = il.jsx(v, {
    color: "error",
    children: "false"
  }), memoCache[4] = falseValueText;else falseValueText = memoCache[4];
  let toggleValueDisplay = falseValueText;
  if (domainExcluded) {
    let domainExcludedText: any;
    if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) domainExcludedText = il.jsx(v, {
      color: "error",
      children: "false (for emails with your domain)"
    }), memoCache[5] = domainExcludedText;else domainExcludedText = memoCache[5];
    toggleValueDisplay = domainExcludedText;
  } else if (groveEnabled) {
    let trueValueText: any;
    if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) trueValueText = il.jsx(v, {
      color: "success",
      children: "true"
    }), memoCache[6] = trueValueText;else trueValueText = memoCache[6];
    toggleValueDisplay = trueValueText;
  }
  let inputGuide: any;
  if (memoCache[7] !== domainExcluded) inputGuide = domainExcluded ? il.jsx(at, {
    chord: "escape",
    action: "cancel"
  }) : il.jsxs(bn, {
    children: [il.jsx(at, {
      chord: ["enter", "tab", "space"],
      action: "toggle"
    }), il.jsx(at, {
      chord: "escape",
      action: "cancel"
    })]
  }), memoCache[7] = domainExcluded, memoCache[8] = inputGuide;else inputGuide = memoCache[8];
  let privacyLinkLine: any;
  if (memoCache[9] === Symbol.for("react.memo_cache_sentinel")) privacyLinkLine = il.jsxs(v, {
    children: ["Review and manage your privacy settings at", " ", il.jsx(Ss, {
      url: "https://claude.ai/settings/data-privacy-controls"
    })]
  }), memoCache[9] = privacyLinkLine;else privacyLinkLine = memoCache[9];
  let labelCell: any;
  if (memoCache[10] === Symbol.for("react.memo_cache_sentinel")) labelCell = il.jsx($, {
    width: 44,
    children: il.jsx(v, {
      bold: !0,
      children: "Help improve our AI models"
    })
  }), memoCache[10] = labelCell;else labelCell = memoCache[10];
  let toggleRow: any;
  if (memoCache[11] !== toggleValueDisplay) toggleRow = il.jsxs($, {
    children: [labelCell, il.jsx($, {
      children: toggleValueDisplay
    })]
  }), memoCache[11] = toggleValueDisplay, memoCache[12] = toggleRow;else toggleRow = memoCache[12];
  let settingsBody: any;
  if (memoCache[13] !== onKeyDown || memoCache[14] !== toggleRow) settingsBody = il.jsxs($, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: onKeyDown,
    children: [privacyLinkLine, toggleRow]
  }), memoCache[13] = onKeyDown, memoCache[14] = toggleRow, memoCache[15] = settingsBody;else settingsBody = memoCache[15];
  let dialogElement: any;
  if (memoCache[16] !== onDone || memoCache[17] !== inputGuide || memoCache[18] !== settingsBody) dialogElement = il.jsx(Jn, {
    title: "Data privacy",
    color: "professionalBlue",
    onCancel: onDone,
    inputGuide: inputGuide,
    children: settingsBody
  }), memoCache[16] = onDone, memoCache[17] = inputGuide, memoCache[18] = settingsBody, memoCache[19] = dialogElement;else dialogElement = memoCache[19];
  return dialogElement;
}
/** Emits the telemetry event for viewing the privacy settings screen. */
function onPrivacySettingsViewed() {
  W("tengu_grove_privacy_settings_viewed", {});
}
var OGt,
  qWe,
  il,
  newTermsAsciiArt = ` _____________
 |          \\  \\
 | NEW TERMS \\__\\
 |              |
 |  ----------  |
 |  ----------  |
 |  ----------  |
 |  ----------  |
 |  ----------  |
 |              |
 |______________|`;
var u0o = b(() => {
  kt();
  je();
  bat();
  TS();
  Is();
  di();
  Wo();
  OGt = x(tt(), 1), qWe = x(et(), 1), il = x(oe(), 1);
});

export {MDl,GracePeriodContent as Vhm,PostGracePeriodContent as Khm,GroveDialog,PrivacySettingsDialog,onPrivacySettingsViewed as zhm,OGt,qWe,il,newTermsAsciiArt as Ghm,u0o};
