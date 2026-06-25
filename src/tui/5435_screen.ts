// @ts-nocheck
import {_t as ft,bo as vo,uo as fo} from "../../vendor/m2468.ts";
import {Ci as ji,fd as np} from "../../vendor/m2469.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {He,mn as cn} from "../telemetry/0600_feature_name.ts";
import {n9 as T9,UY as qY} from "../config/4246_shouldToolsListOptInToBrief.ts";
import {oo as Pr,b,x as L} from "../../runtime.ts";
import {onGrowthBookRefresh as iK,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {T9 as B9,NOe as SPe} from "../../vendor/m5310.ts";
import {Ve as Qe} from "../../vendor/m5.ts";
import {Or as Ir,ss as _s} from "../../vendor/m2553.ts";
import {du as Vu,iw as _k} from "../../vendor/m2302.ts";
import {Wu as Sd} from "../../vendor/m438.ts";
import {bXl as o8l} from "../../vendor/m5433.ts";
import {tt as nt} from "../../vendor/m2263.ts";
import {et as Te} from "../../vendor/m2261.ts";
// @ts-nocheck
function UZq(H_2) {
  let __2 = Qx4.c(37),
    {
      screen: q,
      setScreen: K_2,
      showAllInTranscript: O_2,
      setShowAllInTranscript: T_2,
      messageCount: z,
      virtualScrollActive: $_2,
      searchBarOpen: Y
    } = H_2,
    A_2 = Y === undefined ? false : Y,
    w_2 = ft(selectExpandedView),
    f_2 = vo(),
    {
      addNotification: f_2_2
    } = ji(),
    J;
  if (__2[0] !== w_2 || __2[1] !== f_2) J = () => {
    j("tengu_toggle_todos", {
      is_expanded: w_2 === "tasks"
    }), He("todo_toggle_panel"), f_2(cycleExpandedView);
  }, __2[0] = w_2, __2[1] = f_2, __2[2] = J;else J = __2[2];
  let D_2 = J,
    M_2 = ft(selectIsBriefOnly),
    X,
    P_2;
  if (__2[3] !== f_2) X = () => {
    let {
        isBriefEnabled: a_2
      } = (T9(), Pr(qY)),
      e = () => {
        if (a_2()) return;
        f_2(disableBriefOnlyOnGateLoss);
      };
    return e(), iK(e);
  }, P_2 = [f_2], __2[3] = f_2, __2[4] = X, __2[5] = P_2;else X = __2[4], P_2 = __2[5];
  cx4.useEffect(X, P_2);
  let Z;
  if (__2[6] !== M_2 || __2[7] !== z || __2[8] !== q || __2[9] !== f_2 || __2[10] !== K_2 || __2[11] !== T_2 || __2[12] !== O_2) Z = () => {
    let {
      isBriefEnabled: a
    } = (T9(), Pr(qY));
    if (!a() && M_2 && q !== "transcript") {
      f_2(disableBriefOnly);
      return;
    }
    j("tengu_toggle_transcript", {
      is_entering: q !== "transcript",
      show_all: O_2,
      message_count: z,
      open_dialog_count: B9.getState().open.length
    }), K_2(toggleTranscriptScreen), T_2(false);
  }, __2[6] = M_2, __2[7] = z, __2[8] = q, __2[9] = f_2, __2[10] = K_2, __2[11] = T_2, __2[12] = O_2, __2[13] = Z;else Z = __2[13];
  let W_2 = Z,
    G_2;
  if (__2[14] !== z || __2[15] !== T_2 || __2[16] !== O_2) G_2 = () => {
    j("tengu_transcript_toggle_show_all", {
      is_expanding: !O_2,
      message_count: z
    }), T_2(toggleBoolean);
  }, __2[14] = z, __2[15] = T_2, __2[16] = O_2, __2[17] = G_2;else G_2 = __2[17];
  let R_2 = G_2,
    h_2;
  if (__2[18] !== z || __2[19] !== K_2 || __2[20] !== T_2 || __2[21] !== O_2) h_2 = () => {
    j("tengu_transcript_exit", {
      show_all: O_2,
      message_count: z
    }), K_2("prompt"), T_2(false);
  }, __2[18] = z, __2[19] = K_2, __2[20] = T_2, __2[21] = O_2, __2[22] = h_2;else h_2 = __2[22];
  let y_2 = h_2,
    E;
  if (__2[23] !== M_2 || __2[24] !== f_2) E = () => {
    let {
      isBriefEnabled: a_2
    } = (T9(), Pr(qY));
    if (!a_2() && !M_2) return;
    let e = !M_2;
    j("tengu_brief_mode_toggled", {
      enabled: e,
      gated: false,
      source: Qe("keybinding")
    }), f_2(qH => {
      if (qH.isBriefOnly === e) return qH;
      return {
        ...qH,
        isBriefOnly: e
      };
    });
  }, __2[23] = M_2, __2[24] = f_2, __2[25] = E;else E = __2[25];
  let v = E,
    C_2;
  if (__2[26] === Symbol.for("react.memo_cache_sentinel")) C_2 = {
    context: "Global"
  }, __2[26] = C_2;else C_2 = __2[26];
  Ir("app:toggleTodos", D_2, C_2);
  let S_2;
  if (__2[27] === Symbol.for("react.memo_cache_sentinel")) S_2 = {
    context: "Global"
  }, __2[27] = S_2;else S_2 = __2[27];
  Ir("app:toggleTranscript", W_2, S_2);
  let I_2;
  if (__2[28] === Symbol.for("react.memo_cache_sentinel")) I_2 = {
    context: "Global"
  }, __2[28] = I_2;else I_2 = __2[28];
  Ir("app:toggleBrief", v, I_2);
  let p_2;
  if (__2[29] !== f_2_2) p_2 = () => {}, __2[29] = f_2_2, __2[30] = p_2;else p_2 = __2[30];
  let b = p_2,
    p_3;
  if (__2[31] === Symbol.for("react.memo_cache_sentinel")) p_3 = {
    context: "Global"
  }, __2[31] = p_3;else p_3 = __2[31];
  Ir("app:toggleTerminal", b, p_3);
  let U = forceTerminalRedraw,
    U_2;
  if (__2[32] === Symbol.for("react.memo_cache_sentinel")) U_2 = {
    context: "Global"
  }, __2[32] = U_2;else U_2 = __2[32];
  Ir("app:redraw", U, U_2);
  let g_2 = q === "transcript",
    Q_2 = g_2 && !$_2,
    d_2;
  if (__2[33] !== Q_2) d_2 = {
    context: "Transcript",
    isActive: Q_2
  }, __2[33] = Q_2, __2[34] = d_2;else d_2 = __2[34];
  Ir("transcript:toggleShowAll", R_2, d_2);
  let l_2 = g_2 && !A_2,
    n_2;
  if (__2[35] !== l_2) n_2 = {
    context: "Transcript",
    isActive: l_2
  }, __2[35] = l_2, __2[36] = n_2;else n_2 = __2[36];
  return Ir("transcript:exit", y_2, n_2), null;
}
function forceTerminalRedraw() {
  Vu.get(process.stdout)?.forceRedraw();
}
function toggleBoolean(H) {
  return !H;
}
function toggleTranscriptScreen(H) {
  return H === "transcript" ? "prompt" : "transcript";
}
function disableBriefOnly(H) {
  if (!H.isBriefOnly) return H;
  return {
    ...H,
    isBriefOnly: false
  };
}
function disableBriefOnlyOnGateLoss(H) {
  if (!H.isBriefOnly) return H;
  return {
    ...H,
    isBriefOnly: false
  };
}
function selectIsBriefOnly(H) {
  return H.isBriefOnly;
}
function cycleExpandedView(H) {
  return {
    ...H,
    expandedView: H.expandedView === "tasks" ? "none" : "tasks"
  };
}
function selectExpandedView(H) {
  return H.expandedView;
}
var Qx4, cx4;
var Qx4_2 = b(() => {
  np();
  SPe();
  _k();
  _s();
  Sd();
  cn();
  Yn();
  Ct();
  fo();
  o8l();
  Qx4 = L(nt(), 1), cx4 = L(Te(), 1);
});
export {UZq as TBo,forceTerminalRedraw as c2m,toggleBoolean as u2m,toggleTranscriptScreen as d2m,disableBriefOnly as p2m,disableBriefOnlyOnGateLoss as m2m,selectIsBriefOnly as f2m,cycleExpandedView as h2m,selectExpandedView as g2m,Qx4 as EXl,cx4 as CXl,Qx4_2 as AXl};
