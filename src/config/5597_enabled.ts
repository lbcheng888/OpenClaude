// @ts-nocheck
import {Lyt as qAt,mnr as EXn} from "../../vendor/m5592.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Dfe as ofe,S8 as $8} from "./2187_S8.ts";
import {isPolicyAllowed as ii,Bu as sd} from "../../vendor/m2213.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {NE as kC,po as lo} from "../tools/5224_userPromptCount.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Ve as Qe,Le as Ue} from "../../vendor/m5.ts";
import {bu as Lu,oS as rS} from "./2605_event_name.ts";
import {b,x as L} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {tt as nt} from "../../vendor/m2263.ts";
import {et as Te} from "../../vendor/m2261.ts";
// @ts-nocheck
function readEnabledFlag(H, _) {
  let q = H.findIndex(K => K.uuid === _);
  if (q === -1) return false;
  for (let K = q + 1; K < H.length; K++) {
    let O = H[K];
    if (O && (O.type === "user" || O.type === "assistant")) return true;
  }
  return false;
}
function setEnabledFlag(H_2, __2, q, K) {
  let O_2 = enabledConfigSchema.c(25),
    T_2 = q === undefined ? false : q,
    z;
  if (O_2[0] !== K) z = K === undefined ? {} : K, O_2[0] = K, O_2[1] = z;else z = O_2[1];
  let {
      enabled: $
    } = z,
    Y = $ === undefined ? true : $,
    [A_2, w] = enabledDefaults.useState(null),
    f_2;
  if (O_2[2] === Symbol.for("react.memo_cache_sentinel")) f_2 = new Set(), O_2[2] = f_2;else f_2 = O_2[2];
  let j = enabledDefaults.useRef(f_2),
    J = enabledDefaults.useRef(null),
    D = normalizeEnabledConfig,
    M = mergeEnabledConfig,
    X;
  if (O_2[3] === Symbol.for("react.memo_cache_sentinel")) X = {
    hideThanksAfterMs: enabledConfigCache,
    onOpen: D,
    onSelect: M
  }, O_2[3] = X;else X = O_2[3];
  let {
      state: P_2,
      lastResponse: Z,
      appearanceId: W,
      open: G,
      handleSelect: R_2,
      handleUndo: h_2
    } = qAt(X),
    y_2,
    E;
  if (O_2[4] !== Y) y_2 = () => {
    if (!Y) return;
    w(ut(enabledConfigKey, false));
  }, E = [Y], O_2[4] = Y, O_2[5] = y_2, O_2[6] = E;else y_2 = O_2[5], E = O_2[6];
  enabledDefaults.useEffect(y_2, E);
  let v;
  if (O_2[7] !== H_2) v = new Set(H_2.filter(getEnabledConfig).map(isEnabledValue)), O_2[7] = H_2, O_2[8] = v;else v = O_2[8];
  let C_2 = v,
    S_2,
    I_2;
  if (O_2[9] !== C_2 || O_2[10] !== Y || O_2[11] !== A_2 || O_2[12] !== T_2 || O_2[13] !== __2 || O_2[14] !== H_2 || O_2[15] !== G || O_2[16] !== P_2) I_2 = () => {
    if (!Y) return;
    if (P_2 !== "closed" || __2) return;
    if (T_2) return;
    if (A_2 !== true) return;
    if (ofe()) return;
    if (!ii("allow_product_feedback")) return;
    if (Ge.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY) return;
    if (J.current !== null) {
      if (readEnabledFlag(H_2, J.current)) {
        if (J.current = null, Math.random() < enabledSettingNames) G();
        return;
      }
    }
    let b = Array.from(C_2).filter(x => !j.current.has(x));
    if (b.length > 0) j.current = new Set(C_2), J.current = b.at(-1);
  }, S_2 = [Y, C_2, P_2, __2, T_2, A_2, H_2, G], O_2[9] = C_2, O_2[10] = Y, O_2[11] = A_2, O_2[12] = T_2, O_2[13] = __2, O_2[14] = H_2, O_2[15] = G, O_2[16] = P_2, O_2[17] = S_2, O_2[18] = I_2;else S_2 = O_2[17], I_2 = O_2[18];
  enabledDefaults.useEffect(I_2, S_2);
  let p_2;
  if (O_2[19] !== W || O_2[20] !== R_2 || O_2[21] !== h_2 || O_2[22] !== Z || O_2[23] !== P_2) p_2 = {
    state: P_2,
    lastResponse: Z,
    appearanceId: W,
    handleSelect: R_2,
    handleUndo: h_2
  }, O_2[19] = W, O_2[20] = R_2, O_2[21] = h_2, O_2[22] = Z, O_2[23] = P_2, O_2[24] = p_2;else p_2 = O_2[24];
  return p_2;
}
function isEnabledValue(H) {
  return H.uuid;
}
function getEnabledConfig(H) {
  return kC(H);
}
function mergeEnabledConfig(H, _) {
  j("tengu_post_compact_survey_event", {
    event_type: Qe("responded"),
    appearance_id: H,
    response: Ue(_)
  }), Lu("feedback_survey", {
    event_type: "responded",
    appearance_id: H,
    response: _,
    survey_type: "post_compact"
  });
}
function normalizeEnabledConfig(H) {
  j("tengu_post_compact_survey_event", {
    event_type: Qe("appeared"),
    appearance_id: H
  }), Lu("feedback_survey", {
    event_type: "appeared",
    appearance_id: H,
    survey_type: "post_compact"
  });
}
var enabledConfigSchema,
  enabledDefaults,
  enabledConfigCache = 5000,
  enabledConfigKey = "tengu_post_compact_survey",
  enabledSettingNames = 0.2;
var initEnabledConfig = b(() => {
  $8();
  Yn();
  Ct();
  sd();
  Or();
  lo();
  rS();
  EXn();
  enabledConfigSchema = L(nt(), 1), enabledDefaults = L(Te(), 1);
});
export {readEnabledFlag as FWm,setEnabledFlag as ylc,isEnabledValue as BWm,getEnabledConfig as UWm,mergeEnabledConfig as $Wm,normalizeEnabledConfig as qWm,enabledConfigSchema as _lc,enabledDefaults as sLe,enabledConfigCache as LWm,enabledConfigKey as MWm,enabledSettingNames as NWm,initEnabledConfig as Tlc};
