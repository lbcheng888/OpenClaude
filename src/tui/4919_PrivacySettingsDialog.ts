// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {Vee as Lee,Uke as Eke,bXr as EJr,SXr as bJr,dDn as R0n,Est as rst} from "../telemetry/3337_level.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {pr as Ar} from "../../vendor/m2562.ts";
import {Kn as Vn,Li as Di} from "../../vendor/m2572.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {yb as hb} from "../../vendor/m4521.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var hf4 = {};
pt(hf4, {
  PrivacySettingsDialog: () => PrivacySettingsDialog,
  GroveDialog: () => GroveDialog
});
function GracePeriodContent() {
  let memoCache = hB_.c(9),
    introText;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) introText = rK.default.createElement(w, null, "An update to our Consumer Terms and Privacy Policy will take effect on", " ", rK.default.createElement(w, {
    bold: true
  }, "October 8, 2025"), ". You can accept the updated terms today."), memoCache[0] = introText;else introText = memoCache[0];
  let whatsChangingHeading;
  if (memoCache[1] === Symbol.for("react.memo_cache_sentinel")) whatsChangingHeading = rK.default.createElement(w, null, "What's changing?"), memoCache[1] = whatsChangingHeading;else whatsChangingHeading = memoCache[1];
  let bullet, boldImproveAI;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) bullet = rK.default.createElement(w, null, "\xB7 "), boldImproveAI = rK.default.createElement(w, {
    bold: true
  }, "Help improve our AI models "), memoCache[2] = bullet, memoCache[3] = boldImproveAI;else bullet = memoCache[2], boldImproveAI = memoCache[3];
  let improveAIBlock;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) improveAIBlock = rK.default.createElement(B, {
    paddingLeft: 1
  }, rK.default.createElement(w, null, bullet, boldImproveAI, rK.default.createElement(w, null, "\u2014 Allow the use of your chats and coding sessions to train and improve Anthropic AI models. Change anytime in your Privacy Settings (", rK.default.createElement(Fs, {
    url: "https://claude.ai/settings/data-privacy-controls"
  }), ")."))), memoCache[4] = improveAIBlock;else improveAIBlock = memoCache[4];
  let changingSection;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) changingSection = rK.default.createElement(B, {
    flexDirection: "column"
  }, whatsChangingHeading, improveAIBlock, rK.default.createElement(B, {
    paddingLeft: 1
  }, rK.default.createElement(w, null, rK.default.createElement(w, null, "\xB7 "), rK.default.createElement(w, {
    bold: true
  }, "Updates to data retention "), rK.default.createElement(w, null, "\u2014 To help us improve our AI models and safety protections, we're extending data retention to 5 years.")))), memoCache[5] = changingSection;else changingSection = memoCache[5];
  let learnMoreLink;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) learnMoreLink = rK.default.createElement(Fs, {
    url: "https://www.anthropic.com/news/updates-to-our-consumer-terms"
  }), memoCache[6] = learnMoreLink;else learnMoreLink = memoCache[6];
  let termsLink;
  if (memoCache[7] === Symbol.for("react.memo_cache_sentinel")) termsLink = rK.default.createElement(Fs, {
    url: "https://anthropic.com/legal/terms"
  }), memoCache[7] = termsLink;else termsLink = memoCache[7];
  let content;
  if (memoCache[8] === Symbol.for("react.memo_cache_sentinel")) content = rK.default.createElement(rK.default.Fragment, null, introText, changingSection, rK.default.createElement(w, null, "Learn more (", learnMoreLink, ") or read the updated Consumer Terms (", termsLink, ") and Privacy Policy (", rK.default.createElement(Fs, {
    url: "https://anthropic.com/legal/privacy"
  }), ")")), memoCache[8] = content;else content = memoCache[8];
  return content;
}
function PostGracePeriodContent() {
  let memoCache = hB_.c(7),
    headingText;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) headingText = rK.default.createElement(w, null, "We've updated our Consumer Terms and Privacy Policy."), memoCache[0] = headingText;else headingText = memoCache[0];
  let whatsChangingHeading;
  if (memoCache[1] === Symbol.for("react.memo_cache_sentinel")) whatsChangingHeading = rK.default.createElement(w, null, "What's changing?"), memoCache[1] = whatsChangingHeading;else whatsChangingHeading = memoCache[1];
  let improveAISection;
  if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) improveAISection = rK.default.createElement(B, {
    flexDirection: "column"
  }, rK.default.createElement(w, {
    bold: true
  }, "Help improve our AI models"), rK.default.createElement(w, null, "Allow the use of your chats and coding sessions to train and improve Anthropic AI models. You can change this anytime in Privacy Settings"), rK.default.createElement(Fs, {
    url: "https://claude.ai/settings/data-privacy-controls"
  })), memoCache[2] = improveAISection;else improveAISection = memoCache[2];
  let changingSection;
  if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) changingSection = rK.default.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, whatsChangingHeading, improveAISection, rK.default.createElement(B, {
    flexDirection: "column"
  }, rK.default.createElement(w, {
    bold: true
  }, "How this affects data retention"), rK.default.createElement(w, null, "Turning ON the improve Claude setting extends data retention from 30 days to 5 years. Turning it OFF keeps the default 30-day data retention. Delete data anytime."))), memoCache[3] = changingSection;else changingSection = memoCache[3];
  let learnMoreLink;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) learnMoreLink = rK.default.createElement(Fs, {
    url: "https://www.anthropic.com/news/updates-to-our-consumer-terms"
  }), memoCache[4] = learnMoreLink;else learnMoreLink = memoCache[4];
  let termsLink;
  if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) termsLink = rK.default.createElement(Fs, {
    url: "https://anthropic.com/legal/terms"
  }), memoCache[5] = termsLink;else termsLink = memoCache[5];
  let content;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) content = rK.default.createElement(rK.default.Fragment, null, headingText, changingSection, rK.default.createElement(w, null, "Learn more (", learnMoreLink, ") or read the updated Consumer Terms (", termsLink, ") and Privacy Policy (", rK.default.createElement(Fs, {
    url: "https://anthropic.com/legal/privacy"
  }), ")")), memoCache[6] = content;else content = memoCache[6];
  return content;
}
function GroveDialog(props) {
  let memoCache = hB_.c(35),
    {
      showIfAlreadyViewed: showIfAlreadyViewed,
      location: location,
      onDone: onDone
    } = props,
    [shouldShow, setShouldShow] = rK.useState(null),
    [noticeConfig, setNoticeConfig] = rK.useState(null),
    effectFn,
    effectDeps;
  if (memoCache[0] !== location || memoCache[1] !== onDone || memoCache[2] !== showIfAlreadyViewed) effectFn = () => {
    (async function () {
      let [settingsResult, noticeConfigResult] = await Promise.all([Lee(), Eke()]),
        noticeData = noticeConfigResult.success ? noticeConfigResult.data : null;
      setNoticeConfig(noticeData);
      let show = EJr(settingsResult, noticeConfigResult, showIfAlreadyViewed);
      if (setShouldShow(show), !show) {
        onDone("skip_rendering");
        return;
      }
      bJr(), j("tengu_grove_policy_viewed", {
        location: Ue(location),
        dismissable: noticeData?.notice_is_grace_period
      });
    })();
  }, effectDeps = [showIfAlreadyViewed, location, onDone], memoCache[0] = location, memoCache[1] = onDone, memoCache[2] = showIfAlreadyViewed, memoCache[3] = effectFn, memoCache[4] = effectDeps;else effectFn = memoCache[3], effectDeps = memoCache[4];
  if (rK.useEffect(effectFn, effectDeps), shouldShow === null) return null;
  if (!shouldShow) return null;
  let handleChoice;
  if (memoCache[5] !== noticeConfig?.notice_is_grace_period || memoCache[6] !== onDone) handleChoice = async function (choice) {
    e: switch (choice) {
      case "accept_opt_in":
        {
          await R0n(true), j("tengu_grove_policy_submitted", {
            state: true,
            dismissable: noticeConfig?.notice_is_grace_period
          });
          break e;
        }
      case "accept_opt_out":
        {
          await R0n(false), j("tengu_grove_policy_submitted", {
            state: false,
            dismissable: noticeConfig?.notice_is_grace_period
          });
          break e;
        }
      case "defer":
        {
          j("tengu_grove_policy_dismissed", {
            state: true
          });
          break e;
        }
      case "escape":
        j("tengu_grove_policy_escaped", {});
    }
    onDone(choice);
  }, memoCache[5] = noticeConfig?.notice_is_grace_period, memoCache[6] = onDone, memoCache[7] = handleChoice;else handleChoice = memoCache[7];
  let onChoiceSelected = handleChoice,
    acceptOptions;
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
    handleCancel;
  if (memoCache[10] !== noticeConfig?.notice_is_grace_period || memoCache[11] !== onChoiceSelected) handleCancel = function () {
    if (noticeConfig?.notice_is_grace_period) {
      onChoiceSelected("defer");
      return;
    }
    onChoiceSelected("escape");
  }, memoCache[10] = noticeConfig?.notice_is_grace_period, memoCache[11] = onChoiceSelected, memoCache[12] = handleCancel;else handleCancel = memoCache[12];
  let onCancel = handleCancel,
    inputGuide;
  if (memoCache[13] === Symbol.for("react.memo_cache_sentinel")) inputGuide = rK.default.createElement(hn, null, rK.default.createElement(lt, {
    chord: "enter",
    action: "confirm"
  }), rK.default.createElement(lt, {
    chord: "escape",
    action: "cancel"
  })), memoCache[13] = inputGuide;else inputGuide = memoCache[13];
  let bodySection;
  if (memoCache[14] !== noticeConfig?.notice_is_grace_period) bodySection = rK.default.createElement(B, {
    flexDirection: "column",
    gap: 1,
    flexGrow: 1
  }, noticeConfig?.notice_is_grace_period ? rK.default.createElement(GracePeriodContent, null) : rK.default.createElement(PostGracePeriodContent, null)), memoCache[14] = noticeConfig?.notice_is_grace_period, memoCache[15] = bodySection;else bodySection = memoCache[15];
  let asciiArtBlock;
  if (memoCache[16] === Symbol.for("react.memo_cache_sentinel")) asciiArtBlock = rK.default.createElement(B, {
    flexShrink: 0
  }, rK.default.createElement(w, {
    color: "professionalBlue"
  }, newTermsAsciiArt)), memoCache[16] = asciiArtBlock;else asciiArtBlock = memoCache[16];
  let bodyRow;
  if (memoCache[17] !== bodySection) bodyRow = rK.default.createElement(B, {
    flexDirection: "row"
  }, bodySection, asciiArtBlock), memoCache[17] = bodySection, memoCache[18] = bodyRow;else bodyRow = memoCache[18];
  let selectionHeading;
  if (memoCache[19] === Symbol.for("react.memo_cache_sentinel")) selectionHeading = rK.default.createElement(B, {
    flexDirection: "column"
  }, rK.default.createElement(w, {
    bold: true
  }, "Please select how you'd like to continue"), rK.default.createElement(w, null, "Your choice takes effect immediately upon confirmation.")), memoCache[19] = selectionHeading;else selectionHeading = memoCache[19];
  let deferOptions;
  if (memoCache[20] !== noticeConfig?.notice_is_grace_period) deferOptions = noticeConfig?.notice_is_grace_period ? [{
    label: "Not now",
    value: "defer"
  }] : [], memoCache[20] = noticeConfig?.notice_is_grace_period, memoCache[21] = deferOptions;else deferOptions = memoCache[21];
  let allOptions;
  if (memoCache[22] !== primaryOptions || memoCache[23] !== deferOptions) allOptions = [...primaryOptions, ...deferOptions], memoCache[22] = primaryOptions, memoCache[23] = deferOptions, memoCache[24] = allOptions;else allOptions = memoCache[24];
  let onChangeWrapper;
  if (memoCache[25] !== onChoiceSelected) onChangeWrapper = value => onChoiceSelected(value), memoCache[25] = onChoiceSelected, memoCache[26] = onChangeWrapper;else onChangeWrapper = memoCache[26];
  let selectionSection;
  if (memoCache[27] !== onCancel || memoCache[28] !== allOptions || memoCache[29] !== onChangeWrapper) selectionSection = rK.default.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, selectionHeading, rK.default.createElement(Ar, {
    options: allOptions,
    onChange: onChangeWrapper,
    onCancel: onCancel
  })), memoCache[27] = onCancel, memoCache[28] = allOptions, memoCache[29] = onChangeWrapper, memoCache[30] = selectionSection;else selectionSection = memoCache[30];
  let dialogElement;
  if (memoCache[31] !== onCancel || memoCache[32] !== selectionSection || memoCache[33] !== bodyRow) dialogElement = rK.default.createElement(Vn, {
    title: "Updates to Consumer Terms and Policies",
    color: "professionalBlue",
    onCancel: onCancel,
    inputGuide: inputGuide
  }, bodyRow, selectionSection), memoCache[31] = onCancel, memoCache[32] = selectionSection, memoCache[33] = bodyRow, memoCache[34] = dialogElement;else dialogElement = memoCache[34];
  return dialogElement;
}
function PrivacySettingsDialog(props) {
  let memoCache = hB_.c(20),
    {
      settings: settings,
      domainExcluded: domainExcluded,
      onDone: onDone
    } = props,
    [groveEnabled, setGroveEnabled] = rK.useState(settings.grove_enabled),
    emptyDepsRef;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) emptyDepsRef = [], memoCache[0] = emptyDepsRef;else emptyDepsRef = memoCache[0];
  rK.useEffect(onPrivacySettingsViewed, emptyDepsRef);
  let handleKeyDown;
  if (memoCache[1] !== domainExcluded || memoCache[2] !== groveEnabled) handleKeyDown = function (event) {
    if (event.ctrl || event.meta) return;
    if (!domainExcluded && (event.key === "tab" || event.key === "return" || event.key === " ")) {
      event.preventDefault();
      let newValue = !groveEnabled;
      setGroveEnabled(newValue), R0n(newValue);
    }
  }, memoCache[1] = domainExcluded, memoCache[2] = groveEnabled, memoCache[3] = handleKeyDown;else handleKeyDown = memoCache[3];
  let onKeyDown = handleKeyDown,
    falseValueText;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel")) falseValueText = rK.default.createElement(w, {
    color: "error"
  }, "false"), memoCache[4] = falseValueText;else falseValueText = memoCache[4];
  let toggleValueDisplay = falseValueText;
  if (domainExcluded) {
    let domainExcludedText;
    if (memoCache[5] === Symbol.for("react.memo_cache_sentinel")) domainExcludedText = rK.default.createElement(w, {
      color: "error"
    }, "false (for emails with your domain)"), memoCache[5] = domainExcludedText;else domainExcludedText = memoCache[5];
    toggleValueDisplay = domainExcludedText;
  } else if (groveEnabled) {
    let trueValueText;
    if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) trueValueText = rK.default.createElement(w, {
      color: "success"
    }, "true"), memoCache[6] = trueValueText;else trueValueText = memoCache[6];
    toggleValueDisplay = trueValueText;
  }
  let inputGuide;
  if (memoCache[7] !== domainExcluded) inputGuide = domainExcluded ? rK.default.createElement(lt, {
    chord: "escape",
    action: "cancel"
  }) : rK.default.createElement(hn, null, rK.default.createElement(lt, {
    chord: ["enter", "tab", "space"],
    action: "toggle"
  }), rK.default.createElement(lt, {
    chord: "escape",
    action: "cancel"
  })), memoCache[7] = domainExcluded, memoCache[8] = inputGuide;else inputGuide = memoCache[8];
  let privacyLinkLine;
  if (memoCache[9] === Symbol.for("react.memo_cache_sentinel")) privacyLinkLine = rK.default.createElement(w, null, "Review and manage your privacy settings at", " ", rK.default.createElement(Fs, {
    url: "https://claude.ai/settings/data-privacy-controls"
  })), memoCache[9] = privacyLinkLine;else privacyLinkLine = memoCache[9];
  let labelCell;
  if (memoCache[10] === Symbol.for("react.memo_cache_sentinel")) labelCell = rK.default.createElement(B, {
    width: 44
  }, rK.default.createElement(w, {
    bold: true
  }, "Help improve our AI models")), memoCache[10] = labelCell;else labelCell = memoCache[10];
  let toggleRow;
  if (memoCache[11] !== toggleValueDisplay) toggleRow = rK.default.createElement(B, null, labelCell, rK.default.createElement(B, null, toggleValueDisplay)), memoCache[11] = toggleValueDisplay, memoCache[12] = toggleRow;else toggleRow = memoCache[12];
  let settingsBody;
  if (memoCache[13] !== onKeyDown || memoCache[14] !== toggleRow) settingsBody = rK.default.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: onKeyDown
  }, privacyLinkLine, toggleRow), memoCache[13] = onKeyDown, memoCache[14] = toggleRow, memoCache[15] = settingsBody;else settingsBody = memoCache[15];
  let dialogElement;
  if (memoCache[16] !== onDone || memoCache[17] !== inputGuide || memoCache[18] !== settingsBody) dialogElement = rK.default.createElement(Vn, {
    title: "Data privacy",
    color: "professionalBlue",
    onCancel: onDone,
    inputGuide: inputGuide
  }, settingsBody), memoCache[16] = onDone, memoCache[17] = inputGuide, memoCache[18] = settingsBody, memoCache[19] = dialogElement;else dialogElement = memoCache[19];
  return dialogElement;
}
function onPrivacySettingsViewed() {
  j("tengu_grove_privacy_settings_viewed", {});
}
var hB_,
  rK,
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
var AJq = b(() => {
  Ct();
  Je();
  rst();
  hb();
  qs();
  Di();
  ts();
  hB_ = L(nt(), 1), rK = L(Te(), 1);
});

export {hf4 as Evl,GracePeriodContent as Pim,PostGracePeriodContent as Oim,GroveDialog,PrivacySettingsDialog,onPrivacySettingsViewed as Lim,hB_ as m8t,rK as Qa,newTermsAsciiArt as Dim,AJq as zvo};
