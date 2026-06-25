// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {ao,br} from "../config/0745_updateSettingsForSource.ts";
import {saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {tQ,FS} from "../../vendor/m722.ts";
import {hm,DI} from "../../vendor/m3357.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var Gdc = {};
ft(Gdc, {
  AutoDefaultNudgeDialog: () => AutoDefaultNudgeDialog
});
/**
 * Dialog that nudges the user to make "auto" their default permission mode.
 * Renders an explanation plus an accept/decline select. On accept it persists
 * `permissions.defaultMode = "auto"` to user settings; either way it marks the
 * nudge as seen, emits telemetry, and calls `onDone`.
 *
 * @param props - { currentMode, onDone }
 */
function AutoDefaultNudgeDialog(props: { currentMode: any; onDone: (accepted: boolean) => void }) {
  let cache = qdc.c(18),
    {
      currentMode,
      onDone
    } = props,
    onShownEffect,
    shownDeps;
  if (cache[0] !== currentMode) onShownEffect = () => {
    W("tengu_auto_default_nudge_shown", {
      current_mode: Le(currentMode)
    });
  }, shownDeps = [currentMode], cache[0] = currentMode, cache[1] = onShownEffect, cache[2] = shownDeps;else onShownEffect = cache[1], shownDeps = cache[2];
  Wdc.useEffect(onShownEffect, shownDeps), Df();
  let handleChoice;
  if (cache[3] !== currentMode || cache[4] !== onDone) handleChoice = function (choice: string) {
    if (choice === "accept") ao("userSettings", {
      permissions: {
        defaultMode: "auto"
      }
    });
    hn(MVm), W("tengu_auto_default_nudge_resolved", {
      choice: Le(choice),
      current_mode: Le(currentMode)
    }), onDone(choice === "accept");
  }, cache[3] = currentMode, cache[4] = onDone, cache[5] = handleChoice;else handleChoice = cache[5];
  let onChange = handleChoice,
    explanationNode;
  if (cache[6] === Symbol.for("react.memo_cache_sentinel")) explanationNode = aLe.jsx($, {
    marginBottom: 1,
    flexDirection: "column",
    children: aLe.jsx(v, {
      children: "Auto mode lets Claude handle permission prompts automatically. Claude checks each tool call for risky actions and prompt injection before executing, runs the ones it assesses as lower-risk, and blocks the rest."
    })
  }), cache[6] = explanationNode;else explanationNode = cache[6];
  let acceptOption;
  if (cache[7] === Symbol.for("react.memo_cache_sentinel")) acceptOption = {
    label: "Yes, set auto mode as my default permission mode",
    value: "accept"
  }, cache[7] = acceptOption;else acceptOption = cache[7];
  let currentModeLabel;
  if (cache[8] !== currentMode) currentModeLabel = tQ(currentMode).toLowerCase(), cache[8] = currentMode, cache[9] = currentModeLabel;else currentModeLabel = cache[9];
  let declineLabel = `No, keep ${currentModeLabel}`,
    options;
  if (cache[10] !== declineLabel) options = [acceptOption, {
    label: declineLabel,
    value: "decline"
  }], cache[10] = declineLabel, cache[11] = options;else options = cache[11];
  let onCancel;
  if (cache[12] !== onChange) onCancel = () => onChange("decline"), cache[12] = onChange, cache[13] = onCancel;else onCancel = cache[13];
  let dialogNode;
  if (cache[14] !== onChange || cache[15] !== options || cache[16] !== onCancel) dialogNode = aLe.jsx(hm, {
    title: "Make auto mode your default permission mode?",
    children: aLe.jsxs($, {
      flexDirection: "column",
      paddingX: 2,
      paddingY: 1,
      children: [explanationNode, aLe.jsx($, {
        children: aLe.jsx(hr, {
          options: options,
          onChange: onChange,
          onCancel: onCancel
        })
      })]
    })
  }), cache[14] = onChange, cache[15] = options, cache[16] = onCancel, cache[17] = dialogNode;else dialogNode = cache[17];
  return dialogNode;
}
/**
 * Settings updater: marks `hasSeenAutoDefaultNudge` as true (idempotent).
 */
function MVm(settings: any) {
  return settings.hasSeenAutoDefaultNudge ? settings : {
    ...settings,
    hasSeenAutoDefaultNudge: !0
  };
}
var qdc, Wdc, aLe;
var Vdc = b(() => {
  kt();
  TI();
  je();
  tr();
  FS();
  br();
  Ol();
  DI();
  qdc = x(tt(), 1), Wdc = x(et(), 1), aLe = x(oe(), 1);
});

export {Gdc,AutoDefaultNudgeDialog,MVm,qdc,Wdc,aLe,Vdc};
