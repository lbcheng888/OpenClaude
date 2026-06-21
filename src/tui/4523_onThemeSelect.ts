// @ts-nocheck
import {useTheme as ga,useThemeSetting as yve,usePreviewTheme as wyn,useCustomThemes as Tve} from "../../vendor/m2274.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {yLt as zOt,BGi as RWi,Txn as MRn} from "../config/3007_Txn.ts";
import {mt as ft,bo as vo,configProtoStore as fo} from "../../vendor/m2458.ts";
import {SEn as Bbn,k$ as _$} from "../../vendor/m2541.ts";
import {ju as xu,wk as bk} from "./2564_current.ts";
import {updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {Or as Ir,Ts as _s} from "../../vendor/m2542.ts";
import {xA as DA,jH as BH} from "../../vendor/m2566.ts";
import {k4 as h4,jFe as yFe,zfe as kfe} from "../../vendor/m2263.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {gracefulShutdown as Pi,ym as Km} from "../config/3332_flushAnalyticsSinks.ts";
import {pr as Ar} from "../../vendor/m2562.ts";
import {b9 as a9,lqe as U4e} from "../../vendor/m3975.ts";
import {wae as fae,Wnt as wnt} from "../../vendor/m3008.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {yb as hb} from "../../vendor/m4521.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function selectSyntaxHighlightingDisabled(snapshot) {
  let t = Lol.c(88),
    {
      onThemeSelect: n,
      showIntroText: r,
      helpText: o,
      showHelpTextBelow: s,
      hideEscToCancel: i,
      skipExitHandling: a,
      onCancel: l,
      onCustomTheme: c
    } = snapshot,
    u = r === undefined ? false : r,
    d = o === undefined ? "" : o,
    p = s === undefined ? false : s,
    m = i === undefined ? false : i,
    f = a === undefined ? false : a,
    [A] = ga(),
    h = yve(),
    {
      columns: g
    } = hr(),
    _;
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) _ = zOt(), t[0] = _;else _ = t[0];
  let y = _,
    T;
  if (t[1] !== A) T = y === null ? RWi(A) : null, t[1] = A, t[2] = T;else T = t[2];
  let S = T,
    {
      setPreviewTheme: C,
      savePreview: R,
      cancelPreview: k
    } = wyn(),
    x = ft(onThemeSelect) ?? false,
    I = vo();
  Bbn("ThemePicker");
  let H = xu("theme:toggleSyntaxHighlighting", "ThemePicker", "ctrl+t"),
    P;
  if (t[3] !== I || t[4] !== x) P = () => {
    if (y === null) {
      let Ye = !x;
      ao("userSettings", {
        syntaxHighlightingDisabled: Ye
      }), I(st => ({
        ...st,
        settings: {
          ...st.settings,
          syntaxHighlightingDisabled: Ye
        }
      }));
    }
  }, t[3] = I, t[4] = x, t[5] = P;else P = t[5];
  let O;
  if (t[6] === Symbol.for("react.memo_cache_sentinel")) O = {
    context: "ThemePicker"
  }, t[6] = O;else O = t[6];
  Ir("theme:toggleSyntaxHighlighting", P, O);
  let D = DA(f ? f6p : undefined),
    {
      customThemes: M
    } = Tve(),
    [U, $] = Mol.useState(h),
    F;
  if (t[7] !== U) F = h4(U), t[7] = U, t[8] = F;else F = t[8];
  let W = F,
    G;
  if (t[9] !== M || t[10] !== W) G = W ? M.find(Ye => Ye.slug === W) : undefined, t[9] = M, t[10] = W, t[11] = G;else G = t[11];
  let K = G,
    Q = xu("theme:editCustom", "ThemePicker", "ctrl+e"),
    V;
  if (t[12] !== K || t[13] !== c || t[14] !== R) V = () => {
    if (K && c) R(), c(K);
  }, t[12] = K, t[13] = c, t[14] = R, t[15] = V;else V = t[15];
  let Y;
  if (t[16] === Symbol.for("react.memo_cache_sentinel")) Y = {
    context: "ThemePicker"
  }, t[16] = Y;else Y = t[16];
  Ir("theme:editCustom", V, Y);
  let J, ee, te, ne, re, oe, ie;
  if (t[17] === Symbol.for("react.memo_cache_sentinel")) J = {
    label: "Auto (match terminal)",
    value: "auto"
  }, ee = {
    label: "Dark mode",
    value: "dark"
  }, te = {
    label: "Light mode",
    value: "light"
  }, ne = {
    label: "Dark mode (colorblind-friendly)",
    value: "dark-daltonized"
  }, re = {
    label: "Light mode (colorblind-friendly)",
    value: "light-daltonized"
  }, oe = {
    label: "Dark mode (ANSI colors only)",
    value: "dark-ansi"
  }, ie = {
    label: "Light mode (ANSI colors only)",
    value: "light-ansi"
  }, t[17] = J, t[18] = ee, t[19] = te, t[20] = ne, t[21] = re, t[22] = oe, t[23] = ie;else J = t[17], ee = t[18], te = t[19], ne = t[20], re = t[21], oe = t[22], ie = t[23];
  let le;
  if (t[24] !== M || t[25] !== c) {
    let Ye;
    if (t[27] !== c) Ye = c ? [{
      label: "New custom theme\u2026",
      value: g_o
    }] : [], t[27] = c, t[28] = Ye;else Ye = t[28];
    le = [J, ee, te, ne, re, oe, ie, ...M.map(noopExitHandler), ...Ye], t[24] = M, t[25] = c, t[26] = le;
  } else le = t[26];
  let ce = le,
    me;
  if (t[29] !== u) me = u ? Zu.createElement(w, null, "Let's get started.") : Zu.createElement(w, {
    bold: true,
    color: "permission"
  }, "Theme"), t[29] = u, t[30] = me;else me = t[30];
  let se;
  if (t[31] === Symbol.for("react.memo_cache_sentinel")) se = Zu.createElement(w, {
    bold: true
  }, "Choose the text style that looks best with your terminal"), t[31] = se;else se = t[31];
  let ue;
  if (t[32] !== d || t[33] !== p) ue = d && !p && Zu.createElement(w, {
    dimColor: true
  }, d), t[32] = d, t[33] = p, t[34] = ue;else ue = t[34];
  let pe;
  if (t[35] !== ue) pe = Zu.createElement(B, {
    flexDirection: "column"
  }, se, ue), t[35] = ue, t[36] = pe;else pe = t[36];
  let de;
  if (t[37] !== k || t[38] !== C) de = Ye => {
    if ($(Ye), Ye === g_o) k();else C(Ye);
  }, t[37] = k, t[38] = C, t[39] = de;else de = t[39];
  let _e;
  if (t[40] !== k || t[41] !== c || t[42] !== n || t[43] !== R) _e = Ye => {
    if (Ye === g_o) {
      k(), c?.(undefined);
      return;
    }
    R(), n(Ye);
  }, t[40] = k, t[41] = c, t[42] = n, t[43] = R, t[44] = _e;else _e = t[44];
  let ae;
  if (t[45] !== k || t[46] !== l || t[47] !== f) ae = f ? () => {
    k(), l?.();
  } : async () => {
    k(), await Pi(0);
  }, t[45] = k, t[46] = l, t[47] = f, t[48] = ae;else ae = t[48];
  let Ae = Math.min(ce.length, 12),
    he;
  if (t[49] !== de || t[50] !== _e || t[51] !== ae || t[52] !== Ae || t[53] !== ce || t[54] !== h) he = Zu.createElement(Ar, {
    options: ce,
    onFocus: de,
    onChange: _e,
    onCancel: ae,
    visibleOptionCount: Ae,
    defaultValue: h,
    defaultFocusValue: h
  }), t[49] = de, t[50] = _e, t[51] = ae, t[52] = Ae, t[53] = ce, t[54] = h, t[55] = he;else he = t[55];
  let ge;
  if (t[56] !== me || t[57] !== pe || t[58] !== he) ge = Zu.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, me, pe, he), t[56] = me, t[57] = pe, t[58] = he, t[59] = ge;else ge = t[59];
  let Ce;
  if (t[60] === Symbol.for("react.memo_cache_sentinel")) Ce = {
    oldStart: 1,
    newStart: 1,
    oldLines: 3,
    newLines: 3,
    lines: [" function greet() {", '-  console.log("Hello, World!");', '+  console.log("Hello, Claude!");', " }"]
  }, t[60] = Ce;else Ce = t[60];
  let xe;
  if (t[61] !== g) xe = Zu.createElement(a9, {
    paddingX: 0
  }, Zu.createElement(fae, {
    patch: Ce,
    dim: false,
    filePath: "demo.js",
    firstLine: null,
    width: g
  })), t[61] = g, t[62] = xe;else xe = t[62];
  let we = y === "env" ? `Syntax highlighting disabled (via CLAUDE_CODE_SYNTAX_HIGHLIGHT=${process.env.CLAUDE_CODE_SYNTAX_HIGHLIGHT})` : x ? `Syntax highlighting disabled (${H} to enable)` : S ? `Syntax theme: ${S.theme}${S.source ? ` (from ${S.source})` : ""} (${H} to disable)` : `Syntax highlighting enabled (${H} to disable)`,
    Be;
  if (t[63] !== we) Be = Zu.createElement(w, {
    dimColor: true
  }, " ", we), t[63] = we, t[64] = Be;else Be = t[64];
  let Ke;
  if (t[65] !== xe || t[66] !== Be) Ke = Zu.createElement(B, {
    flexDirection: "column",
    width: "100%"
  }, xe, Be), t[65] = xe, t[66] = Be, t[67] = Ke;else Ke = t[67];
  let ke;
  if (t[68] !== ge || t[69] !== Ke) ke = Zu.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, ge, Ke), t[68] = ge, t[69] = Ke, t[70] = ke;else ke = t[70];
  let We = ke;
  if (!u) {
    let Ye;
    if (t[71] !== We) Ye = Zu.createElement(B, {
      flexDirection: "column"
    }, We), t[71] = We, t[72] = Ye;else Ye = t[72];
    let st;
    if (t[73] !== d || t[74] !== p) st = p && d && Zu.createElement(B, {
      marginLeft: 3
    }, Zu.createElement(w, {
      dimColor: true
    }, d)), t[73] = d, t[74] = p, t[75] = st;else st = t[75];
    let Ht;
    if (t[76] !== Q || t[77] !== D || t[78] !== K || t[79] !== m || t[80] !== c) Ht = !m && Zu.createElement(B, null, Zu.createElement(w, {
      dimColor: true,
      italic: true
    }, D.pending ? Zu.createElement(Zu.Fragment, null, "Press ", D.keyName, " again to exit") : Zu.createElement(hn, null, Zu.createElement(lt, {
      chord: "enter",
      action: "select"
    }), K && c && Zu.createElement(lt, {
      chord: Q,
      action: "edit"
    }), Zu.createElement(lt, {
      chord: "escape",
      action: "cancel"
    })))), t[76] = Q, t[77] = D, t[78] = K, t[79] = m, t[80] = c, t[81] = Ht;else Ht = t[81];
    let qe;
    if (t[82] !== st || t[83] !== Ht) qe = Zu.createElement(B, {
      marginTop: 1
    }, st, Ht), t[82] = st, t[83] = Ht, t[84] = qe;else qe = t[84];
    let ze;
    if (t[85] !== Ye || t[86] !== qe) ze = Zu.createElement(Zu.Fragment, null, Ye, qe), t[85] = Ye, t[86] = qe, t[87] = ze;else ze = t[87];
    return ze;
  }
  return We;
}
function noopExitHandler(e) {
  return {
    label: e.source === "user" ? `${e.name} (custom)` : `${e.name} (from ${e.source.plugin})`,
    value: yFe(e.slug)
  };
}
function f6p() {}
function onThemeSelect(props) {
  return props.settings.syntaxHighlightingDisabled;
}
var Lol,
  Zu,
  Mol,
  g_o = "__new_custom_theme__";
var Cjn = b(() => {
  BH();
  Ii();
  Je();
  _$();
  _s();
  bk();
  fo();
  kfe();
  Km();
  Er();
  hb();
  qs();
  U4e();
  ts();
  MRn();
  wnt();
  Lol = L(nt(), 1), Zu = L(Te(), 1), Mol = L(Te(), 1);
});

export {selectSyntaxHighlightingDisabled as jpt,noopExitHandler as i5p,f6p as a5p,onThemeSelect as l5p,Lol as Cil,Zu as Xu,Mol as vil,g_o as Nyo,Cjn as T8n};
