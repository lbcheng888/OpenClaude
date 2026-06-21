// @ts-nocheck
import {isFullscreenWithTTY as J_,b as L} from "../../runtime.ts";
import {J$ as DU,y8r as tzq} from "../config/2727_repl.ts";
import {formatTokens as X4,ps as w9} from "../../vendor/m238.ts";
import {Yw as gZ} from "./2725_iFi.ts";
import {updateSettingsForSource as Jq,getInitialSettings as t8,yr as v8} from "../config/0740_updateSettingsForSource.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Qe as K_} from "../../vendor/m5.ts";
import {nN as Au} from "../../vendor/m4410.ts";
// @ts-nocheck
var autoCompactCommandExports = {};
J_(autoCompactCommandExports, {
  call: () => call,
  applyAutoCompactWindow: () => applyAutoCompactWindow
});
function describeAutoCompactWindow(model, configuredOverride) {
  let {
      window: window,
      configured: configured,
      source: source
    } = DU(model, configuredOverride),
    cappedSuffix = configured > window ? ` \xB7 capped to ${X4(window)} by model` : "",
    lines = [`Auto-compact window: ${source === "auto" ? "auto" : source === "experiment" || source === "clientdata" ? `auto (${X4(configured)} tokens)${cappedSuffix}` : source === "env" ? `${X4(configured)} tokens (from CLAUDE_CODE_AUTO_COMPACT_WINDOW)${cappedSuffix}` : `${X4(configured)} tokens (from settings)${cappedSuffix}`}`];
  if (!gZ()) lines.push("Auto-compact is currently disabled (see /config)");
  if (lines.push("Auto-compact summarizes the conversation when context usage approaches this limit. The actual threshold is the minimum of this setting and your model's maximum context window."), lines.push("The auto setting picks a window tuned for your model and is strongly recommended for the best cost and performance."), source === "env" || source === "settings") lines.push("Overriding auto may result in high token usage, especially when resuming long sessions.");
  return lines.join(`
`);
}
function applyAutoCompactWindow(input, context) {
  let model = context.options.mainLoopModel;
  if (DU(model, undefined).source === "env") return "CLAUDE_CODE_AUTO_COMPACT_WINDOW is set and takes precedence. Unset it to change this setting.";
  let normalized = input.trim().toLowerCase(),
    parsed = normalized === "reset" || normalized === "unset" || normalized === "default" ? "auto" : tzq(normalized);
  if (parsed === undefined) return `Couldn't parse '${input}'. Expected 'auto' or 100k\u20131M tokens (e.g. 500k, 200000, or 200 as shorthand)`;
  let settingValue = parsed === "auto" ? undefined : parsed,
    {
      error: error
    } = Jq("userSettings", {
      autoCompactWindow: settingValue
    });
  if (error) return `Couldn't save setting: ${error.message}`;
  let savedWindow = t8().autoCompactWindow,
    {
      window: effectiveWindow,
      source: source
    } = DU(model, savedWindow),
    overrideActive = source === "env" || savedWindow !== settingValue,
    appliedWindow = overrideActive ? savedWindow : settingValue;
  if (context.onQueryEvent?.({
    type: "apply_flag_settings",
    settings: {
      autoCompactWindow: appliedWindow ?? null
    }
  }), c("tengu_autocompact_command", {
    action: K_(parsed === "auto" ? "auto" : "set"),
    ...(settingValue !== undefined && {
      tokens: settingValue
    })
  }), parsed === "auto") return overrideActive ? `Auto-compact window set to auto in settings, but a higher-priority override is active (${X4(effectiveWindow)} tokens)` : "Auto-compact window set to auto";
  let suffix = "";
  if (overrideActive) suffix = `, but a higher-priority override is active (${X4(effectiveWindow)} tokens)`;else if (effectiveWindow < parsed) suffix = ` (capped to model limit of ${X4(effectiveWindow)})`;
  return `Auto-compact window set to ${X4(parsed)} tokens${suffix}`;
}
var call = async (input, context) => {
  let trimmedInput = input.trim();
  if (!trimmedInput) return {
    type: "text",
    value: describeAutoCompactWindow(context.options.mainLoopModel, context.options.autoCompactWindow)
  };
  return {
    type: "text",
    value: applyAutoCompactWindow(trimmedInput, context)
  };
};
var initAutoCompactCommandModule = L(() => {
  v_();
  Au();
  w9();
  v8();
});

export {autoCompactCommandExports as Gsl,describeAutoCompactWindow as c8p,applyAutoCompactWindow,call as u8p,initAutoCompactCommandModule as pyo};
