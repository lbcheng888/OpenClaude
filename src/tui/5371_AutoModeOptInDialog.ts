// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {ao,br} from "../config/0745_updateSettingsForSource.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {hr} from "../../vendor/m2573.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {je} from "../../vendor/m2462.ts";
import {TS} from "../../vendor/m4541.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
var CFo = {};
ft(CFo, {
  AutoModeOptInDialog: () => AutoModeOptInDialog,
  AUTO_MODE_DESCRIPTION: () => AUTO_MODE_DESCRIPTION
});
function AutoModeOptInDialog(props) {
  let memoCache = tjl.c(25),
    {
      onAccept: onAccept,
      onDecline: onDecline,
      declineExits: declineExits
    } = props,
    shownEffectDeps;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) shownEffectDeps = [], memoCache[0] = shownEffectDeps;else shownEffectDeps = memoCache[0];
  njl.useEffect(reportDialogShown, shownEffectDeps);
  let handleSelectMemo;
  if (memoCache[1] !== onAccept || memoCache[2] !== onDecline) handleSelectMemo = function (choice) {
    if ((choice === "accept" || choice === "accept-default") && Ot().autoModeOptInDismissed) hn(VNm);
    e: switch (choice) {
      case "accept":
        {
          W("tengu_auto_mode_opt_in_dialog_accept", {}), ao("userSettings", {
            skipAutoPermissionPrompt: true
          }), onAccept();
          break e;
        }
      case "accept-default":
        {
          W("tengu_auto_mode_opt_in_dialog_accept_default", {}), ao("userSettings", {
            skipAutoPermissionPrompt: true,
            permissions: {
              defaultMode: "auto"
            }
          }), onAccept();
          break e;
        }
      case "decline":
        {
          W("tengu_auto_mode_opt_in_dialog_decline", {}), onDecline("go-back");
          break e;
        }
      case "decline-dont-ask":
        {
          if (W("tengu_auto_mode_opt_in_dialog_decline_dont_ask", {}), !Ot().autoModeOptInDismissed) hn(GNm);
          onDecline("dont-ask");
        }
    }
  }, memoCache[1] = onAccept, memoCache[2] = onDecline, memoCache[3] = handleSelectMemo;else handleSelectMemo = memoCache[3];
  let handleSelect = handleSelectMemo,
    handleCancelMemo;
  if (memoCache[4] !== onDecline) handleCancelMemo = () => onDecline("go-back"), memoCache[4] = onDecline, memoCache[5] = handleCancelMemo;else handleCancelMemo = memoCache[5];
  let handleCancel = handleCancelMemo,
    descriptionNode;
  if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) descriptionNode = VGe.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [VGe.jsx(v, {
      children: AUTO_MODE_DESCRIPTION
    }), VGe.jsx(Ss, {
      url: "https://code.claude.com/docs/en/security"
    })]
  }), memoCache[6] = descriptionNode;else descriptionNode = memoCache[6];
  let acceptDefaultOptions;
  if (memoCache[7] === Symbol.for("react.memo_cache_sentinel")) acceptDefaultOptions = [{
    label: "Yes, and make it my default mode",
    value: "accept-default"
  }], memoCache[7] = acceptDefaultOptions;else acceptDefaultOptions = memoCache[7];
  let acceptOption;
  if (memoCache[8] === Symbol.for("react.memo_cache_sentinel")) acceptOption = {
    label: "Yes, enable auto mode",
    value: "accept"
  }, memoCache[8] = acceptOption;else acceptOption = memoCache[8];
  let declineLabel = declineExits ? "No, exit" : "No, go back",
    declineOption;
  if (memoCache[9] !== declineLabel) declineOption = {
    label: declineLabel,
    value: "decline"
  }, memoCache[9] = declineLabel, memoCache[10] = declineOption;else declineOption = memoCache[10];
  let dontAskOptions;
  if (memoCache[11] !== declineExits) dontAskOptions = declineExits ? [] : [{
    label: "No, don't ask again",
    value: "decline-dont-ask"
  }], memoCache[11] = declineExits, memoCache[12] = dontAskOptions;else dontAskOptions = memoCache[12];
  let options;
  if (memoCache[13] !== declineOption || memoCache[14] !== dontAskOptions) options = [...acceptDefaultOptions, acceptOption, declineOption, ...dontAskOptions], memoCache[13] = declineOption, memoCache[14] = dontAskOptions, memoCache[15] = options;else options = memoCache[15];
  let handleChange;
  if (memoCache[16] !== handleSelect) handleChange = selected => handleSelect(selected), memoCache[16] = handleSelect, memoCache[17] = handleChange;else handleChange = memoCache[17];
  let selectNode;
  if (memoCache[18] !== handleCancel || memoCache[19] !== options || memoCache[20] !== handleChange) selectNode = VGe.jsx(hr, {
    options: options,
    onChange: handleChange,
    onCancel: handleCancel
  }), memoCache[18] = handleCancel, memoCache[19] = options, memoCache[20] = handleChange, memoCache[21] = selectNode;else selectNode = memoCache[21];
  let dialogNode;
  if (memoCache[22] !== handleCancel || memoCache[23] !== selectNode) dialogNode = VGe.jsxs(Jn, {
    title: "Enable auto mode?",
    color: "warning",
    onCancel: handleCancel,
    children: [descriptionNode, selectNode]
  }), memoCache[22] = handleCancel, memoCache[23] = selectNode, memoCache[24] = dialogNode;else dialogNode = memoCache[24];
  return dialogNode;
}
function GNm(config) {
  return {
    ...config,
    autoModeOptInDismissed: true
  };
}
function VNm(config) {
  return {
    ...config,
    autoModeOptInDismissed: undefined
  };
}
function reportDialogShown() {
  W("tengu_auto_mode_opt_in_dialog_shown", {});
}
var tjl,
  njl,
  VGe,
  AUTO_MODE_DESCRIPTION = "Auto mode lets Claude handle permission prompts automatically \u2014 Claude checks each tool call for risky actions and prompt injection before executing. Actions Claude identifies as safe are executed, while actions Claude identifies as risky are blocked and Claude may try a different approach. Ideal for long-running tasks. Sessions are slightly more expensive. Claude can make mistakes that allow harmful commands to run, it's recommended to only use in isolated environments. Shift+Tab to change mode.";
var Her = b(() => {
  kt();
  je();
  tr();
  br();
  TS();
  di();
  tjl = x(tt(), 1), njl = x(et(), 1), VGe = x(oe(), 1);
});

export {CFo,AutoModeOptInDialog,GNm,VNm,reportDialogShown as KNm,tjl,njl,VGe,AUTO_MODE_DESCRIPTION,Her};
