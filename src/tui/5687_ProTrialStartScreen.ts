// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {startProTrial as lHo,getProTrialDurationDays as aHo,Zht} from "../../vendor/m4811.ts";
import {__export as j_,Ce,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {xOe,KKt} from "../../vendor/m5266.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {gd,xw} from "./3853_mode.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
var Emc = {};
ft(Emc, {
  ProTrialStartScreen: () => ProTrialStartScreen
});
/**
 * Screen shown to prompt the user to start their Claude Code Pro trial.
 * Renders a confirmation prompt and tracks the trial-start lifecycle
 * ("idle" -> "starting" -> "error"). On "confirm:yes" it kicks off the
 * trial, logs telemetry, and invokes `onDone` on success.
 *
 * @param props - { onDone } callback fired when the trial has started or
 *   the user dismisses the error state.
 */
function ProTrialStartScreen(props) {
  let cache = Smc.c(9),
    {
      onDone: onDone
    } = props,
    /** Lifecycle of the trial-start action. */
    [status, setStatus] = bmc.useState("idle"),
    keyHandlers;
  if (cache[0] !== onDone || cache[1] !== status) keyHandlers = {
    "confirm:yes": () => {
      if (status === "starting") return;
      if (status === "error") {
        onDone();
        return;
      }
      setStatus("starting"), W("tengu_pro_trial_start_pressed", {}), lHo().then(() => {
        W("tengu_pro_trial_start_ok", {}), onDone();
      }).catch(err => {
        if (j_(err)) A(`Failed to start pro trial: ${Ce(err)}`, {
          level: "error"
        });else Ie(err);
        W("tengu_pro_trial_start_error", {}), setStatus("error");
      });
    }
  }, cache[0] = onDone, cache[1] = status, cache[2] = keyHandlers;else keyHandlers = cache[2];
  let keyOptions;
  if (cache[3] === Symbol.for("react.memo_cache_sentinel")) keyOptions = {
    context: "Confirmation"
  }, cache[3] = keyOptions;else keyOptions = cache[3];
  Oo(keyHandlers, keyOptions);
  let trialDaysValue;
  if (cache[4] === Symbol.for("react.memo_cache_sentinel")) trialDaysValue = aHo(), cache[4] = trialDaysValue;else trialDaysValue = cache[4];
  /** Number of trial days included with the Pro plan, or null if unknown. */
  let trialDays = trialDaysValue,
    header;
  if (cache[5] === Symbol.for("react.memo_cache_sentinel")) header = YJ.jsx(xOe, {}), cache[5] = header;else header = cache[5];
  let description;
  if (cache[6] === Symbol.for("react.memo_cache_sentinel")) description = YJ.jsx(v, {
    children: trialDays !== null ? `Your Pro plan includes ${trialDays} days of Claude Code.` : "Your Pro plan includes a Claude Code trial."
  }), cache[6] = description;else description = cache[6];
  let rendered;
  if (cache[7] !== status) rendered = YJ.jsxs($, {
    flexDirection: "column",
    paddingX: 1,
    gap: 1,
    children: [header, description, status === "starting" ? YJ.jsxs($, {
      children: [YJ.jsx(gd, {}), YJ.jsx(v, {
        children: " Starting your trial…"
      })]
    }) : status === "error" ? YJ.jsxs(v, {
      color: "error",
      children: ["Couldn't start your trial. Press ", YJ.jsx(v, {
        bold: !0,
        children: "Enter"
      }), " to continue."]
    }) : YJ.jsxs(v, {
      color: "permission",
      children: ["Press ", YJ.jsx(v, {
        bold: !0,
        children: "Enter"
      }), " to start your trial"]
    })]
  }), cache[7] = status, cache[8] = rendered;else rendered = cache[8];
  return rendered;
}
var Smc, bmc, YJ;
var Cmc = b(() => {
  je();
  ss();
  kt();
  Zht();
  qe();
  Ct();
  vn();
  KKt();
  xw();
  Smc = x(tt(), 1), bmc = x(et(), 1), YJ = x(oe(), 1);
});

export {Emc,ProTrialStartScreen,Smc,bmc,YJ,Cmc};
