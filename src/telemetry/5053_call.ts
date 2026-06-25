// @ts-nocheck
import {ft as J_,b as L} from "../../runtime.ts";
import {loe as RlH,i3 as p8H,Ud as pO} from "../../vendor/m615.ts";
import {xVn as PF6,k8t as sp_,ZY as MAH,IVn as XF6,gTe as yLH} from "../../vendor/m4528.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {ep as fz} from "../../vendor/m2223.ts";
import {Pt as B_,mn as f6} from "./0600_feature_name.ts";
import {IA as SW} from "./2225_names.ts";
import {T2 as gm,kme as fvH} from "../../vendor/m1455.ts";
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
export {SILENCE_THRESHOLD as p1l,k4T as aTm,modelCommandLazyInit as d1l,Q04 as m1l};
