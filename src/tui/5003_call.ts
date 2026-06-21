// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {normalizeModelStringForAPI as Em,parseUserSpecifiedModel as gs,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {AUn as kFn,oct as Olt,oIe as UHe,X4e as k4e,sIe as $He,Hte as Tte} from "../config/3934_claude_haiku_4_5.ts";
import {UP,z_e as I_e} from "../../vendor/m4507.ts";
import {mt as ft,bo as vo,configProtoStore as fo} from "../../vendor/m2458.ts";
import {kE as CE,jL as OL} from "../../vendor/m3944.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {pr as Ar,Yl as zl} from "../../vendor/m2562.ts";
import {aD as sD,bne as pne} from "../../vendor/m4590.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Kn as Vn,Li as Di} from "../../vendor/m2572.ts";
import {t6t as Oqt,_yo as __o} from "../../vendor/m4506.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var JM4 = {};
pt(JM4, {
  call: () => call
});
function jM4(advisor, _, q) {
  if (j("tengu_advisor_command", {
    advisor: advisor
  }), advisor === "off") return q($ => $.advisorModel === undefined ? $ : {
    ...$,
    advisorModel: undefined
  }), ao("userSettings", {
    advisorModel: undefined
  }), "Advisor disabled";
  let advisorModel = Em(advisor);
  if (!kFn(advisorModel)) {
    let $ = [...Olt(), "off"].join(", ");
    return `${UP(advisorModel)} cannot be used as an advisor. Valid options: ${$}`;
  }
  q($ => $.advisorModel === advisorModel ? $ : {
    ...$,
    advisorModel: advisorModel
  }), ao("userSettings", {
    advisorModel: advisorModel
  });
  let O = UP(advisorModel),
    T = UP(_),
    z = `Advisor set to ${O}`;
  if (!UHe(_)) z += `
Note: the current main model (${T}) does not support the advisor. It will activate when you switch to a supported main model.`;else if (!k4e(_, advisorModel)) z += `
Note: ${O} is less capable than the current main model (${T}), so the advisor will not activate. Choose a more capable advisor, or switch to a smaller main model.`;
  return z;
}
function P_T(H) {
  let __2 = fM4.c(32),
    {
      onDone: onDone
    } = H,
    value = ft(G_T),
    O = CE(),
    T_2 = vo(),
    z,
    $,
    Y;
  if (__2[0] !== value) {
    let h = Olt();
    $ = value ? R_T(value, h) : undefined, z = value && !$ && kFn(value) ? {
      label: UP(value),
      value: value
    } : undefined;
    let y;
    if (__2[4] !== z) y = z ? [z] : [], __2[4] = z, __2[5] = y;else y = __2[5];
    let E;
    if (__2[6] === Symbol.for("react.memo_cache_sentinel")) E = {
      label: "No advisor",
      value: "off"
    }, __2[6] = E;else E = __2[6];
    Y = [...h.map(Z_T), ...y, E], __2[0] = value, __2[1] = z, __2[2] = $, __2[3] = Y;
  } else z = __2[1], $ = __2[2], Y = __2[3];
  let options = Y,
    defaultValue = z ? z.value : $ ?? "off",
    f_2;
  if (__2[7] === Symbol.for("react.memo_cache_sentinel")) f_2 = [], __2[7] = f_2;else f_2 = __2[7];
  WO_.useEffect(W_T, f_2);
  let j;
  if (__2[8] !== onDone) j = () => onDone(undefined, {
    display: "skip"
  }), __2[8] = onDone, __2[9] = j;else j = __2[9];
  let J;
  if (__2[10] === Symbol.for("react.memo_cache_sentinel")) J = y2.createElement(w, null, "When Claude needs stronger judgment \u2014 a complex decision, an ambiguous failure, a problem it's circling without progress \u2014 it escalates to the advisor model for guidance, then resumes. The advisor runs server-side and uses additional tokens."), __2[10] = J;else J = __2[10];
  let D;
  if (__2[11] !== O) D = !UHe(O) && y2.createElement(w, {
    color: "warning"
  }, "The current main model (", UP(O), ") does not support the advisor."), __2[11] = O, __2[12] = D;else D = __2[12];
  let onChange;
  if (__2[13] !== O || __2[14] !== onDone || __2[15] !== T_2) onChange = h => onDone(jM4(h, O, T_2)), __2[13] = O, __2[14] = onDone, __2[15] = T_2, __2[16] = onChange;else onChange = __2[16];
  let onCancel;
  if (__2[17] !== onDone) onCancel = () => onDone(undefined, {
    display: "skip"
  }), __2[17] = onDone, __2[18] = onCancel;else onCancel = __2[18];
  let P;
  if (__2[19] !== defaultValue || __2[20] !== options || __2[21] !== onChange || __2[22] !== onCancel) P = y2.createElement(Ar, {
    options: options,
    defaultValue: defaultValue,
    defaultFocusValue: defaultValue,
    onChange: onChange,
    onCancel: onCancel
  }), __2[19] = defaultValue, __2[20] = options, __2[21] = onChange, __2[22] = onCancel, __2[23] = P;else P = __2[23];
  let Z, W;
  if (__2[24] === Symbol.for("react.memo_cache_sentinel")) W = y2.createElement(w, null, y2.createElement(w, {
    color: "suggestion"
  }, "Recommended setup: "), y2.createElement(w, null, "Sonnet as the main model with Opus as the advisor. For certain workloads this gives near-Opus performance with reduced token usage.")), Z = y2.createElement(sD, {
    url: X_T
  }), __2[24] = Z, __2[25] = W;else Z = __2[24], W = __2[25];
  let G;
  if (__2[26] !== D || __2[27] !== P) G = y2.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, J, D, P, W, Z), __2[26] = D, __2[27] = P, __2[28] = G;else G = __2[28];
  let R;
  if (__2[29] !== G || __2[30] !== j) R = y2.createElement(Vn, {
    title: "Advisor (experimental)",
    onCancel: j
  }, G), __2[29] = G, __2[30] = j, __2[31] = R;else R = __2[31];
  return R;
}
function W_T() {
  j("tengu_advisor_dialog_shown", {});
}
function Z_T(value) {
  return {
    label: UP(value),
    value: value
  };
}
function G_T(H) {
  return H.advisorModel;
}
function R_T(H, _) {
  let q = H.toLowerCase();
  return _.find(K => q.includes(K));
}
function wM4({
  choice: choice,
  onDone: onDone
}) {
  let q = vo(),
    K = CE(),
    O = WO_.useRef(K);
  O.current = K;
  let T = WO_.useRef(false);
  return WO_.useEffect(() => {
    if (T.current) return;
    T.current = true;
    let z = setTimeout(($, Y, A, w) => {
      $(jM4(Y, A.current, w));
    }, 0, onDone, choice, O, q);
    return () => clearTimeout(z);
  }, [choice, q, onDone]), null;
}
var fM4,
  y2,
  WO_,
  X_T = "https://claude.com/blog/the-advisor-strategy",
  call = async (onDone, _, q) => {
    let choice = q.trim().toLowerCase();
    if (!choice) return y2.createElement(P_T, {
      onDone: onDone
    });
    if (choice === "off" || choice === "unset") return y2.createElement(wM4, {
      choice: "off",
      onDone: onDone
    });
    let O = gs(choice),
      T = await Oqt(O);
    if (!T.valid) return onDone(`Invalid advisor model: ${T.error}`), null;
    if (!$He(O)) return onDone(`${choice} cannot be used as an advisor. Valid options: ${[...Olt(), "off"].join(", ")}`), null;
    return y2.createElement(wM4, {
      choice: choice,
      onDone: onDone
    });
  };
var DM4 = b(() => {
  zl();
  Di();
  pne();
  OL();
  Je();
  Ct();
  fo();
  Tte();
  Fo();
  __o();
  Er();
  I_e();
  fM4 = L(nt(), 1), y2 = L(Te(), 1), WO_ = L(Te(), 1);
});

export {JM4 as skl,jM4 as okl,P_T as lcm,W_T as ccm,Z_T as ucm,G_T as dcm,R_T as pcm,wM4 as nkl,fM4 as rkl,y2 as tw,WO_ as Tft,X_T as acm,call as mcm,DM4 as ikl};
