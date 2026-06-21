// @ts-nocheck
import {isFullscreenWithTTY as J_,b as L} from "../../runtime.ts";
import {uoe as RlH,logMCPError as p8H,initKp as pO} from "../../vendor/m609.ts";
import {p8n as PF6,n6t as sp_,fJ as MAH,d8n as XF6,z_e as yLH} from "../../vendor/m4507.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Dp as fz} from "../../vendor/m2215.ts";
import {isTmuxControlMode as B_,ln as f6} from "./0594_feature_name.ts";
import {Cv as SW} from "./2217_names.ts";
import {X2 as gm,bme as fvH} from "../../vendor/m1450.ts";
// @ts-nocheck
var SILENCE_THRESHOLD = {};
J_(SILENCE_THRESHOLD, {
  call: () => k4T
});
async function k4T(H, _) {
  let q = H.trim();
  if (!q || RlH.includes(q)) {
    let T = _.getAppState();
    return {
      type: "text",
      value: `${PF6(T)}
${modelCommandLazyInit}`
    };
  }
  if (p8H.includes(q)) return {
    type: "text",
    value: modelCommandLazyInit
  };
  c("tengu_model_command_inline", {
    args_hash: fz(q),
    args_length: q.length
  });
  let K = await sp_(q);
  if (!K.ok) return {
    type: "text",
    value: K.message
  };
  if (MAH(K.model)) return B_("model_fable_consent", "noninteractive_set_blocked"), {
    type: "text",
    value: "Fable 5 uses usage credits and needs a one-time consent \xB7 pick Fable from /model in an interactive session to set it up"
  };
  return {
    type: "text",
    value: XF6(K.model, _.getAppState, _.setAppState, !_.options.isNonInteractiveSession)
  };
}
var modelCommandLazyInit;
var Q04 = L(() => {
  pO();
  f6();
  v_();
  SW();
  gm();
  yLH();
  modelCommandLazyInit = `Usage: /model <name>. Available: ${fvH.join(", ")}, default, or a full model ID.`;
});

export {SILENCE_THRESHOLD as Gkl,k4T as Ycm,modelCommandLazyInit as Wkl,Q04 as Vkl};
