// @ts-nocheck
import {getMemoryFiles,isSyntheticMemoryPath,zw} from "../config/2717_stripHtmlComments.ts";
import {tr,Bl,KE,sn} from "../config/0047_namespace.ts";
import {getOriginalCwd,lt} from "../session/0131_sent.ts";
import {Id,mc} from "../config/0645_maxBytes.ts";
import {uf,dr} from "../../vendor/m231.ts";
import {pul,mul} from "../../vendor/m4600.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {xu,gf,$_n,tA} from "../config/2201_tA.ts";
import {_debugModuleInit,dE,GO} from "../telemetry/2241_GO.ts";
import {IQe,uZ} from "../config/2245_displayName.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {v4t,Kqn,nho} from "../telemetry/4377_nho.ts";
import {onGrowthBookRefresh,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b3n,C3n} from "../../vendor/m4218.ts";
import {formatRelativeTimeAgo,ps} from "../../vendor/m238.ts";
import {updateSettingsForSource,getInitialSettings,yr} from "../config/0740_updateSettingsForSource.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {xA,jH} from "../../vendor/m2566.ts";
import {Or,Ts} from "../../vendor/m2542.ts";
import {Text} from "../../vendor/m2423.ts";
import {pC,Fie} from "../../vendor/m2555.ts";
import {Box} from "../../vendor/m2422.ts";
import {$kt,b_} from "../../vendor/m2039.ts";
import {pr} from "../../vendor/m2562.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {yb} from "../../vendor/m4521.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
/**
 * hul \u2014 Memory file selector component.
 * Renders a list of CLAUDE.md memory files (user, project, nested),
 * plus auto-memory / auto-dream toggles and an open-folder shortcut.
 */
function hul(e: any) {
  let t = ful.c(68),
    {
      onSelect: n,
      onCancel: r
    } = e,
    o = wG.use(getMemoryFiles()),
    s = tSo.join(tr(), "CLAUDE.md"),
    i = tSo.join(getOriginalCwd(), "CLAUDE.md"),
    a = o.some((Re: any) => Re.path === s),
    l = o.some((Re: any) => Re.path === i),
    c = [...o.filter(AKp).map(fKp), ...(a ? [] : [{
      path: s,
      type: "User",
      content: "",
      exists: !1
    }]), ...(l ? [] : [{
      path: i,
      type: "Project",
      content: "",
      exists: !1
    }])],
    u = new Map(),
    d = c.map((Re: any) => {
      let Me = Id(Re.path),
        Ke = Re.exists ? "" : " (new)",
        He = Re.parent ? (u.get(Re.parent) ?? 0) + 1 : 0;
      u.set(Re.path, He);
      let Ge = He > 0 ? uf("  ", He - 1) : "",
        Ye: any;
      if (Re.type === "User" && !Re.isNested && Re.path === s) Ye = "User memory";else if (Re.type === "Project" && !Re.isNested && Re.path === i) Ye = "Project memory";else if (He > 0) Ye = `${Ge}L ${Me}${Ke}`;else Ye = `${Me}`;
      let ot: any,
        vt = pul(getOriginalCwd());
      if (Re.type === "User" && !Re.isNested) ot = "Saved in ~/.claude/CLAUDE.md";else if (Re.type === "Project" && !Re.isNested && Re.path === i) ot = `${vt ? "Checked in at" : "Saved in"} ./CLAUDE.md`;else if (Re.parent) ot = "@-imported";else if (Re.isNested) ot = "dynamically loaded";else ot = "";
      return {
        label: Ye,
        value: Re.path,
        description: ot
      };
    }),
    p = [],
    m = mt(mKp);
  if (xu() || Bl()) {
    let Re: any;
    if (t[0] === Symbol.for("react.memo_cache_sentinel")) Re = {
      label: "Open auto-memory folder",
      value: `${U6t}${gf()}`,
      description: ""
    }, t[0] = Re;else Re = t[0];
    if (p.push(Re), _debugModuleInit()) {
      let Me: any;
      if (t[1] === Symbol.for("react.memo_cache_sentinel")) Me = {
        label: "Open team memory folder",
        value: `${U6t}${dE()}`,
        description: ""
      }, t[1] = Me;else Me = t[1];
      p.push(Me);
    }
    for (let Me of m.activeAgents) if (Me.memory) {
      let Ke = IQe(Me.agentType, Me.memory);
      p.push({
        label: `Open ${_t.bold(Me.agentType)} agent memory`,
        value: `${U6t}${Ke}`,
        description: `${Me.memory} scope`
      });
    }
  }
  d.push(...p);
  let f: any;
  if (t[2] !== d) f = C5n && d.some(pKp) ? C5n : d[0]?.value || "", t[2] = d, t[3] = f;else f = t[3];
  let A = f,
    [h, g] = wG.useState(xu),
    [_, y] = wG.useState(v4t),
    [T, S] = wG.useState($_n),
    v: any,
    R: any;
  if (t[4] !== T) v = () => onGrowthBookRefresh(() => {
    let Re = $_n();
    if (Re !== T) S(Re), g(xu());
  }), R = [T], t[4] = T, t[5] = v, t[6] = R;else v = t[5], R = t[6];
  wG.useEffect(v, R);
  let [k, x] = wG.useState(Kqn),
    H: any,
    I: any;
  if (t[7] !== k) H = () => {
    if (k) return;
    return onGrowthBookRefresh(() => {
      if (Kqn()) x(!0), y(v4t());
    });
  }, I = [k], t[7] = k, t[8] = H, t[9] = I;else H = t[8], I = t[9];
  wG.useEffect(H, I);
  let P = T && !h,
    L = h && k,
    D = mt(uKp),
    [N, O] = wG.useState(null),
    $: any;
  if (t[10] !== L) $ = () => {
    if (!L) return;
    b3n().then(O);
  }, t[10] = L, t[11] = $;else $ = t[11];
  let U: any;
  if (t[12] !== D || t[13] !== L) U = [L, D], t[12] = D, t[13] = L, t[14] = U;else U = t[14];
  wG.useEffect($, U);
  let W: any;
  if (t[15] !== D || t[16] !== N) W = D ? "running" : N === null ? "" : N === 0 ? "never" : `last ran ${formatRelativeTimeAgo(new Date(N))}`, t[15] = D, t[16] = N, t[17] = W;else W = t[17];
  let G = W,
    [V, Q] = wG.useState(null),
    K = V !== null,
    Y = L ? 1 : 0,
    J: any;
  if (t[18] !== h || t[19] !== T) J = function () {
    if (Bl()) return;
    if (T) return;
    let Me = !h;
    updateSettingsForSource("userSettings", {
      autoMemoryEnabled: Me
    }), g(Me), logEvent("tengu_auto_memory_toggled", {
      enabled: Me
    });
  }, t[18] = h, t[19] = T, t[20] = J;else J = t[20];
  let ee = J,
    te: any;
  if (t[21] !== _ || t[22] !== L) te = function () {
    if (!L) return;
    let Me = !_,
      Ke = Me && getInitialSettings().autoDreamEnabled === void 0;
    updateSettingsForSource("userSettings", {
      autoDreamEnabled: Me
    }), y(Me), logEvent("tengu_auto_dream_toggled", {
      enabled: Me,
      is_first_enable: Ke
    });
  }, t[21] = _, t[22] = L, t[23] = te;else te = t[23];
  let ne = te;
  xA();
  let re: any;
  if (t[24] === Symbol.for("react.memo_cache_sentinel")) re = {
    context: "Confirmation"
  }, t[24] = re;else re = t[24];
  Or("confirm:no", r, re);
  let oe: any;
  if (t[25] !== V || t[26] !== ne || t[27] !== ee) oe = () => {
    if (V === 0) ee();else if (V === 1) ne();
  }, t[25] = V, t[26] = ne, t[27] = ee, t[28] = oe;else oe = t[28];
  let ce: any;
  if (t[29] !== K) ce = {
    context: "Confirmation",
    isActive: K
  }, t[29] = K, t[30] = ce;else ce = t[30];
  Or("confirm:yes", oe, ce);
  let ue: any;
  if (t[31] !== Y) ue = () => {
    Q((Re: any) => Re !== null && Re < Y ? Re + 1 : null);
  }, t[31] = Y, t[32] = ue;else ue = t[32];
  let ae: any;
  if (t[33] !== K) ae = {
    context: "Select",
    isActive: K
  }, t[33] = K, t[34] = ae;else ae = t[34];
  Or("select:next", ue, ae);
  let he: any;
  if (t[35] === Symbol.for("react.memo_cache_sentinel")) he = () => {
    Q(cKp);
  }, t[35] = he;else he = t[35];
  let se: any;
  if (t[36] !== K) se = {
    context: "Select",
    isActive: K
  }, t[36] = K, t[37] = se;else se = t[37];
  Or("select:previous", he, se);
  let le = V === 0,
    pe: any;
  if (t[38] !== h || t[39] !== P) pe = P ? TI.createElement(Text, {
    dimColor: !0
  }, "unavailable for current model") : Bl() ? TI.createElement(Text, {
    dimColor: !0
  }, "off in safe mode \u2014 ", KE(), " to re-enable") : h ? "on" : "off", t[38] = h, t[39] = P, t[40] = pe;else pe = t[40];
  let de: any;
  if (t[41] !== pe) de = TI.createElement(Text, null, "Auto-memory:", " ", pe), t[41] = pe, t[42] = de;else de = t[42];
  let _e: any;
  if (t[43] !== le || t[44] !== de) _e = TI.createElement(pC, {
    isFocused: le
  }, de), t[43] = le, t[44] = de, t[45] = _e;else _e = t[45];
  let fe: any;
  if (t[46] !== _ || t[47] !== G || t[48] !== V || t[49] !== L) fe = L && TI.createElement(pC, {
    isFocused: V === 1,
    styled: !1
  }, TI.createElement(Text, {
    color: V === 1 ? "suggestion" : void 0
  }, "Auto-dream: ", _ ? "on" : "off", G && TI.createElement(Text, {
    dimColor: !0
  }, " \xB7 ", G))), t[46] = _, t[47] = G, t[48] = V, t[49] = L, t[50] = fe;else fe = t[50];
  let ie: any;
  if (t[51] !== _e || t[52] !== fe) ie = TI.createElement(Box, {
    flexDirection: "column",
    marginBottom: 1
  }, _e, fe), t[51] = _e, t[52] = fe, t[53] = ie;else ie = t[53];
  let Ae: any;
  if (t[54] !== n) Ae = (Re: any) => {
    if (Re.startsWith(U6t)) {
      let Me = Re.slice(U6t.length);
      Aul.mkdir(Me, {
        recursive: !0
      }).catch(lKp).then(() => $kt(Me)).catch(aKp);
      return;
    }
    C5n = Re, n(Re);
  }, t[54] = n, t[55] = Ae;else Ae = t[55];
  let ge: any;
  if (t[56] !== Y) ge = () => Q(Y), t[56] = Y, t[57] = ge;else ge = t[57];
  let Ce: any;
  if (t[58] !== A || t[59] !== d || t[60] !== r || t[61] !== Ae || t[62] !== ge || t[63] !== K) Ce = TI.createElement(pr, {
    defaultFocusValue: A,
    options: d,
    isDisabled: K,
    onChange: Ae,
    onCancel: r,
    onUpFromFirstItem: ge
  }), t[58] = A, t[59] = d, t[60] = r, t[61] = Ae, t[62] = ge, t[63] = K, t[64] = Ce;else Ce = t[64];
  let xe: any;
  if (t[65] !== ie || t[66] !== Ce) xe = TI.createElement(Box, {
    flexDirection: "column",
    width: "100%"
  }, ie, Ce), t[65] = ie, t[66] = Ce, t[67] = xe;else xe = t[67];
  return xe;
}

/** No-op: swallows errors from opening folder after mkdir */
function aKp() {}

/** No-op: swallows errors from mkdir itself */
function lKp() {}

/** Decrements the confirmation-row index, clamped to 0, or returns null when already null */
function cKp(e: any) {
  return e !== null && e > 0 ? e - 1 : e;
}

/** Selector: returns true while any task of type "dream" is running */
function uKp(e: any) {
  return Object.values(e.tasks).some(dKp);
}

/** Predicate: task is an active dream task */
function dKp(e: any) {
  return e.type === "dream" && e.status === "running";
}

/** Predicate: memory file option matches the currently-selected path */
function pKp(e: any) {
  return e.value === C5n;
}

/** Selector: extracts agentDefinitions from store state */
function mKp(e: any) {
  return e.agentDefinitions;
}

/** Maps a raw memory file entry to one flagged as existing */
function fKp(e: any) {
  return {
    ...e,
    exists: !0
  };
}

/** Filters out AutoMem entries and synthetic memory paths */
function AKp(e: any) {
  return e.type !== "AutoMem" && !isSyntheticMemoryPath(e.path);
}
var ful: any,
  Aul: any,
  tSo: any,
  TI: any,
  wG: any,
  C5n: any,
  U6t = "__open_folder__";

/** Module initializer \u2014 lazy-initializes all vendor/config imports */
var gul = b(() => {
  cu();
  lt();
  jH();
  ze();
  Ts();
  tA();
  GO();
  zn();
  Ct();
  nho();
  C3n();
  configProtoStore();
  uZ();
  b_();
  zw();
  sn();
  mc();
  ps();
  mul();
  yr();
  dr();
  yb();
  Fie();
  ful = M(rt(), 1), Aul = require("fs/promises"), tSo = require("path"), TI = M(Te(), 1), wG = M(Te(), 1);
});
export {hul,aKp,lKp,cKp,uKp,dKp,pKp,mKp,fKp,AKp,ful,Aul,tSo,TI,wG,C5n,U6t,gul};
