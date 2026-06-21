// @ts-nocheck
import {rbi as XTi,IUr as NFr,nbi as JTi,KTn as uTn,zTn as dTn} from "../../vendor/m2342.ts";
import {B1 as x1,Gve as kve} from "../config/2342_useDecayCurve.ts";
import {bc as Sc,Ug as jg} from "../../vendor/m2264.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {useSelection as Zve,m0t as VIt} from "../../vendor/m2447.ts";
import {X8n as d8n,Q8n as p8n} from "../../vendor/m4565.ts";
import {Ui as ji,Ld as np} from "../../vendor/m2459.ts";
import {HEn as Kbn,ZR as JR} from "../../vendor/m2551.ts";
import {V8n as i8n,K8n as a8n,z8n as l8n,TTo as fyo} from "../../vendor/m4563.ts";
import {pIt as VHt,lg as og} from "../../vendor/m2269.ts";
import {getGlobalConfig as vt,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {pDe as z0e,Y8n as c8n,v6t as Qqt} from "../../vendor/m4564.ts";
import {Wo,yet as eet,Ts as _s} from "../../vendor/m2542.ts";
import {iDn as S0n,sDn as T0n,mNt as K1t,fNt as z1t} from "../../vendor/m3330.ts";
import {p$r as y2r,d$r as _2r,fUe as WFe} from "../../vendor/m2408.ts";
import {ewe as Fve,YIt as xIt} from "../../vendor/m2377.ts";
import {useClock as Ps} from "../../vendor/m2432.ts";
import {useStdin as Q8} from "../../vendor/m2258.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function z5p(e) {
  if (e.wheelUp || e.wheelDown) return false;
  if (e.pageUp || e.pageDown) return false;
  if ((e.home || e.end) && e.ctrl) return false;
  if ((e.leftArrow || e.rightArrow || e.upArrow || e.downArrow || e.home || e.end) && (e.shift || e.meta || e.super)) return false;
  return true;
}
function Y5p(e, t) {
  if (t.upArrow || t.downArrow || t.home || t.end) return true;
  if (e.length !== 1) return false;
  if (t.ctrl) return "udbfnp".includes(e);
  return "jkgGb {}".includes(e);
}
function Aal(e, t, n) {
  if (XTi()) {
    let a = n - e.time;
    if (!e.jbBypass || a > NFr) e.jbBypass = true, e.frac = 0, e.mult = 1;else if (t !== e.dir) e.frac = 0;
    e.dir = t, e.time = n;
    let l = JTi();
    if (e.accelEnabled) e.mult = Math.min(Z5p, e.mult + X5p + l * Q5p);
    e.frac += J5p * e.mult;
    let c = Math.floor(e.frac);
    return e.frac -= c, c;
  }
  if (e.jbBypass) e.jbBypass = false, e.pendingFlip = false, e.wheelMode = false, e.burstCount = 0, e.frac = 0, e.dir = 0;
  if (!e.useDecayCurve) {
    if (e.wheelFlood) {
      let l = n - e.time;
      return e.time = n, e.dir = t, e.mult = l > DECAY_CURVE_HIGH_CAP ? e.base * BYPASS_MULT_STEP : e.base, Math.max(1, Math.floor(e.mult));
    }
    if (e.wheelMode && n - e.time > DRAG_AUTOSCROLL_MAX_TICKS) e.wheelMode = false, e.burstCount = 0, e.mult = e.base;
    if (e.pendingFlip) {
      if (e.pendingFlip = false, t !== e.dir || n - e.time > BYPASS_JITTER_STEP) return e.dir = t, e.time = n, e.mult = e.base, Math.max(1, Math.floor(e.mult));
      e.wheelMode = true;
    }
    let a = n - e.time;
    if (t !== e.dir && e.dir !== 0) return e.pendingFlip = true, e.time = n, 0;
    if (e.dir = t, e.time = n, e.wheelMode) if (a < AUTO_COPY_HINT_MAX_SHOWS) {
      if (++e.burstCount >= 5) e.wheelMode = false, e.burstCount = 0, e.mult = e.base;else return 1;
    } else e.burstCount = 0;
    if (e.wheelMode && e.accelEnabled) {
      let l = Math.pow(0.5, a / AUTO_COPY_HINT_KEY),
        c = Math.max(DRAG_AUTOSCROLL_LINES * Math.min(e.base, 1), e.base * 2),
        u = 1 + (e.mult - 1) * l + BYPASS_MULT_CAP * l;
      return e.mult = Math.min(c, u, e.mult + DRAG_AUTOSCROLL_INTERVAL_MS), Math.max(1, Math.floor(e.mult));
    }
    if (a > DECAY_CURVE_HIGH_CAP || !e.accelEnabled) e.mult = e.base;else {
      let l = Math.max(BYPASS_FRAC_STEP * Math.min(e.base, 1), e.base * 2);
      e.mult = Math.min(l, e.mult + DECAY_CURVE_RESET_MS);
    }
    return Math.max(1, Math.floor(e.mult));
  }
  let r = n - e.time,
    o = t === e.dir;
  if (e.time = n, e.dir = t, o && r < AUTO_COPY_HINT_MAX_SHOWS) return 1;
  if (!e.accelEnabled) return Math.max(1, Math.floor(e.base));
  if (!o || r > K5p) e.mult = Math.max(2, e.base), e.frac = 0;else {
    let a = Math.pow(0.5, r / AUTO_COPY_HINT_KEY),
      l = r >= W5p ? G5p : V5p;
    e.mult = Math.min(l, 1 + (e.mult - 1) * a + AUTO_COPY_HINT_RESET_THRESHOLD * a);
  }
  let s = e.mult + e.frac,
    i = Math.floor(s);
  return e.frac = s - i, i;
}
function eWp(e = false, t = 1, n = false, r = true) {
  return {
    time: 0,
    mult: t,
    dir: 0,
    useDecayCurve: e,
    frac: 0,
    base: t,
    pendingFlip: false,
    wheelMode: false,
    burstCount: 0,
    jbBypass: false,
    wheelFlood: n,
    accelEnabled: r
  };
}
function hal() {
  let e = x1(),
    t = Sc("wheelScrollAccelerationEnabled", true).value;
  return v(`wheel accel: ${e.useDecayCurve ? "decay" : "window (native)"} \xB7 base=${e.base} \xB7 platform=${e.platform} \xB7 TERM_PROGRAM=${e.termProgram}${e.wheelFlood ? " \xB7 wheelFlood" : ""}${e.jediTerm ? " \xB7 jediTerm" : ""}${uTn() ? " \xB7 jbBugConfirmed" : ""}${t ? "" : " \xB7 accelDisabled"}`), eWp(e.useDecayCurve, e.base, e.wheelFlood, t);
}
function Ayo({
  scrollRef: e,
  isActive: t,
  onScroll: n,
  isModal: r = false
}) {
  let o = Zve(),
    s = d8n(),
    {
      addNotification: i
    } = ji(),
    a = Kbn(),
    l = t && !a,
    c = DECAY_CURVE_LOW_CAP.useRef(null),
    u = DECAY_CURVE_LOW_CAP.useRef(null),
    d = DECAY_CURVE_LOW_CAP.useRef(-1),
    p = DECAY_CURVE_LOW_CAP.useRef(null);
  lWp(i);
  function m(_, y = false) {
    let T = i8n(_);
    if (y && VHt() === "native" && vt().copyOnSelect === undefined) {
      if (d.current === -1) if (z0e(yal) >= nWp) c8n(yal), d.current = 0;else d.current = Tal;
      if (d.current < Tal) {
        d.current++, i({
          ...T,
          text: `${T.text} \xB7 disable auto-copy in /config`,
          timeoutMs: 4000
        });
        return;
      }
    }
    i(T);
  }
  function f() {
    let _ = o.copySelection();
    if (_) m(_);
  }
  let A = n != null;
  Wo({
    "scroll:pageUp": () => {
      let _ = e.current;
      if (!_) return;
      if (A) S0n();
      let y = -Math.max(1, Math.floor(_.getViewportHeight() / 2)),
        T = Zce(_, y, A);
      n?.(T, _);
    },
    "scroll:pageDown": () => {
      let _ = e.current;
      if (!_) return;
      if (A) S0n();
      let y = Math.max(1, Math.floor(_.getViewportHeight() / 2)),
        T = Zce(_, y, A);
      n?.(T, _);
    },
    "scroll:lineUp": () => {
      let _ = e.current;
      if (!_ || _.getScrollHeight() <= _.getViewportHeight()) return false;
      if (x1() !== u.current) u.current = x1(), c.current = null;
      if (A) T0n();
      c.current ??= hal(), c.current.base = x1().base;
      let y = performance.now(),
        T = Aal(c.current, -1, y);
      y2r(_), _2r(-1, T, c.current, y), iWp(_, T, A), n?.(false, _);
    },
    "scroll:lineDown": () => {
      let _ = e.current;
      if (!_ || _.getScrollHeight() <= _.getViewportHeight()) return false;
      if (x1() !== u.current) u.current = x1(), c.current = null;
      if (A) T0n();
      c.current ??= hal(), c.current.base = x1().base;
      let y = performance.now(),
        T = Aal(c.current, 1, y);
      y2r(_), _2r(1, T, c.current, y);
      let S = sWp(_, T);
      n?.(S, _);
    },
    "scroll:top": () => {
      let _ = e.current;
      if (!_) return;
      if (A) K1t();
      _.scrollTo(0), n?.(false, _);
    },
    "scroll:bottom": () => {
      let _ = e.current;
      if (!_) return;
      _.scrollToBottom(), n?.(true, _);
    },
    "selection:copy": f
  }, {
    context: "Scroll",
    isActive: l
  });
  function h(_) {
    let y = e.current;
    if (!y) return;
    if (A) {
      if (_ === "lineUp" || _ === "lineDown") T0n();else if (_ === "top") K1t();else if (_ !== "bottom") S0n();
    }
    let T = aWp(y, _, A);
    if (T === null) return;
    n?.(T, y);
  }
  Wo({
    "scroll:halfPageUp": () => h("halfPageUp"),
    "scroll:halfPageDown": () => h("halfPageDown"),
    "scroll:fullPageUp": () => h("fullPageUp"),
    "scroll:fullPageDown": () => h("fullPageDown")
  }, {
    context: "Scroll",
    isActive: l
  }), Wo({
    "scroll:lineUp": () => h("lineUp"),
    "scroll:lineDown": () => h("lineDown"),
    "scroll:halfPageUp": () => h("halfPageUp"),
    "scroll:halfPageDown": () => h("halfPageDown"),
    "scroll:fullPageUp": () => h("fullPageUp"),
    "scroll:fullPageDown": () => h("fullPageDown"),
    "scroll:top": () => h("top"),
    "scroll:bottom": () => h("bottom")
  }, {
    context: "Transcript",
    isActive: l && r
  });
  function g(_) {
    if (!o.hasSelection()) return false;
    let y = o.getState();
    if (y && Fve(y)) return;
    if (_ === "up" || _ === "down") {
      let T = e.current;
      if (T && y?.anchor && y.focus) {
        let S = T.getViewportTop(),
          C = S + T.getViewportHeight() - 1,
          R = y.anchor.row >= S && y.anchor.row <= C,
          k = R && _ === "up" && y.focus.row <= S,
          x = R && _ === "down" && y.focus.row >= C;
        if (k || x) {
          let I = Math.max(0, T.getScrollHeight() - T.getViewportHeight()),
            H = k ? T.getScrollTop() > 0 : T.getScrollTop() < I;
          if (T.getPendingDelta() === 0 && H) p.current = null, y.focus = {
            col: y.focus.col,
            row: k ? S : C
          }, y.virtualFocusRow = k ? S - 1 : C + 1, y.virtualFocusCol = undefined, T.scrollBy(k ? -1 : 1), n?.(false, T);
          return;
        }
      }
    }
    o.moveFocus(_);
  }
  return Wo({
    "selection:extendLeft": () => g("left"),
    "selection:extendRight": () => g("right"),
    "selection:extendUp": () => g("up"),
    "selection:extendDown": () => g("down"),
    "selection:extendLineStart": () => g("lineStart"),
    "selection:extendLineEnd": () => g("lineEnd")
  }, {
    context: "Scroll",
    isActive: l
  }), eet((_, y) => {
    if (!o.hasSelection()) return;
    if (y.escape) return o.clearSelection(), true;
    if (y.ctrl && !y.shift && !y.meta && _ === "c") {
      let T = p.current;
      if (T !== null) o.clearSelection(), m(T);else f();
      return true;
    }
    if (r && Y5p(_, y)) return;
    if (!r && (y.backspace || y.delete) && !y.ctrl && !y.meta && !y.shift && !y.super) {
      let T = o.getState();
      if (T && s.tryDelete(T)) return o.clearSelection(), true;
    }
    if (z5p(y)) o.clearSelection();
  }, {
    isActive: l
  }), rWp(e, o, l, n), a8n(o, l, _ => m(_, true), p), l8n(o), null;
}
function rWp(e, t, n, r) {
  let o = Ps(),
    s = DECAY_CURVE_LOW_CAP.useRef(null),
    i = DECAY_CURVE_LOW_CAP.useRef(0),
    a = DECAY_CURVE_LOW_CAP.useRef(0),
    l = DECAY_CURVE_LOW_CAP.useRef(0),
    c = DECAY_CURVE_LOW_CAP.useRef(r);
  c.current = r, DECAY_CURVE_LOW_CAP.useEffect(() => {
    if (!n) return;
    function u() {
      i.current = 0, s.current?.(), s.current = null;
    }
    function d() {
      let A = t.getState(),
        h = e.current,
        g = i.current;
      if (!A?.isDragging || !A.focus || !h || g === 0 || ++l.current > tWp) {
        u();
        return;
      }
      if (h.getPendingDelta() !== 0) return;
      if (g < 0) {
        if (h.getScrollTop() <= 0) {
          u();
          return;
        }
        h.scrollBy(-gal);
      } else {
        let _ = Math.max(0, h.getScrollHeight() - h.getViewportHeight());
        if (h.getScrollTop() >= _) {
          u();
          return;
        }
        h.scrollBy(gal);
      }
      c.current?.(false, h);
    }
    function p(A) {
      if (a.current = A, i.current === A) return;
      if (u(), i.current = A, l.current = 0, d(), i.current === A) {
        let h = () => {
          if (d(), i.current !== 0) s.current = o.setTimeout(h, _al);
        };
        s.current = o.setTimeout(h, _al);
      }
    }
    function m() {
      let A = e.current;
      if (!A) {
        u();
        return;
      }
      let h = A.getViewportTop(),
        g = h + A.getViewportHeight() - 1,
        _ = t.getState();
      if (!_?.isDragging || _.scrolledOffAbove.length === 0 && _.scrolledOffBelow.length === 0) a.current = 0;
      let y = oWp(_, h, g, a.current);
      if (y === 0) {
        if (a.current !== 0 && _?.focus) {
          let T = _.focus.row < h ? -1 : _.focus.row > g ? 1 : 0;
          if (T !== 0 && T !== a.current) _.scrolledOffAbove = [], _.scrolledOffBelow = [], _.scrolledOffAboveSW = [], _.scrolledOffBelowSW = [], a.current = 0;
        }
        u();
      } else p(y);
    }
    let f = t.subscribe(m);
    return () => {
      f(), u(), a.current = 0;
    };
  }, [o, n, e, t]);
}
function oWp(e, t, n, r = 0) {
  if (!e?.isDragging || !e.anchor || !e.focus) return 0;
  let o = e.focus.row,
    s = o < t ? -1 : o > n ? 1 : 0;
  if (r !== 0) return s === r ? s : 0;
  if (e.anchor.row < t || e.anchor.row > n) return 0;
  return s;
}
function bal(e) {
  if (Sc("autoScrollEnabled", true).value) e.scrollToBottom();else e.scrollTo(Math.max(0, e.getScrollHeight() - e.getViewportHeight()));
  return true;
}
function Zce(e, t, n = true) {
  let r = Math.max(0, e.getScrollHeight() - e.getViewportHeight()),
    o = e.getScrollTop() + e.getPendingDelta() + t;
  if (o >= r) return bal(e);
  if (o <= 0 && n) K1t();
  return e.scrollTo(Math.max(0, o)), false;
}
function sWp(e, t) {
  let n = Math.max(0, e.getScrollHeight() - e.getViewportHeight());
  if (e.getScrollTop() + e.getPendingDelta() + t >= n) return bal(e);
  return e.scrollBy(t), false;
}
function iWp(e, t, n = true) {
  if (e.getScrollTop() + e.getPendingDelta() - t <= 0) {
    if (n) K1t();
    e.scrollTo(0);
    return;
  }
  e.scrollBy(-t);
}
function aWp(e, t, n = true) {
  switch (t) {
    case null:
      return null;
    case "lineUp":
    case "lineDown":
      return Zce(e, t === "lineDown" ? 1 : -1, n);
    case "halfPageUp":
    case "halfPageDown":
      {
        let r = Math.max(1, Math.floor(e.getViewportHeight() / 2));
        return Zce(e, t === "halfPageDown" ? r : -r, n);
      }
    case "fullPageUp":
    case "fullPageDown":
      {
        let r = Math.max(1, e.getViewportHeight());
        return Zce(e, t === "fullPageDown" ? r : -r, n);
      }
    case "top":
      return e.scrollTo(0), false;
    case "bottom":
      return e.scrollToBottom(), true;
  }
}
function lWp(e) {
  let t = DECAY_CURVE_HIGH_GAP_MS.c(5),
    {
      internal_eventEmitter: n
    } = Q8(),
    r = Ps(),
    o = DECAY_CURVE_LOW_CAP.useRef(false),
    s,
    i;
  if (t[0] !== e || t[1] !== r || t[2] !== n) s = () => {
    let a = function (u) {
        if (!o.current) o.current = true, j("tengu_scroll_arrows_detected", {
          count: u.count,
          up: u.direction === "up"
        });
        r.setTimeout(() => e({
          key: "scroll-as-arrows",
          kind: "contextual",
          priority: "immediate",
          text: "Scroll wheel is sending arrow keys \xB7 use PgUp/PgDn to scroll",
          color: "warning",
          timeoutMs: 12000
        }), 200);
      },
      l = function () {
        j("tengu_jediterm_scroll_bug_detected", {}), e({
          key: "jediterm-scroll-bug",
          kind: "contextual",
          priority: "immediate",
          text: "Scroll support in JetBrains IDE 2025.2 terminals is experimental \xB7 upgrade to 2025.3+ for the best experience",
          color: "suggestion",
          timeoutMs: 15000
        });
      };
    return n.on("arrow-burst", a), n.on("jediterm-scroll-bug", l), () => {
      n.off("arrow-burst", a), n.off("jediterm-scroll-bug", l);
    };
  }, i = [n, e, r], t[0] = e, t[1] = r, t[2] = n, t[3] = s, t[4] = i;else s = t[3], i = t[4];
  DECAY_CURVE_LOW_CAP.useEffect(s, i);
}
var DECAY_CURVE_HIGH_GAP_MS,
  DECAY_CURVE_LOW_CAP,
  DECAY_CURVE_HIGH_CAP = 40,
  DECAY_CURVE_RESET_MS = 0.3,
  BYPASS_FRAC_STEP = 6,
  BYPASS_MULT_STEP = 3,
  BYPASS_JITTER_STEP = 200,
  BYPASS_MULT_CAP = 15,
  DRAG_AUTOSCROLL_LINES = 15,
  DRAG_AUTOSCROLL_INTERVAL_MS = 3,
  DRAG_AUTOSCROLL_MAX_TICKS = 1500,
  AUTO_COPY_HINT_KEY = 150,
  AUTO_COPY_HINT_RESET_THRESHOLD = 7,
  AUTO_COPY_HINT_MAX_SHOWS = 5,
  W5p = 80,
  G5p = 3,
  V5p = 36,
  K5p = 500,
  J5p = 0.35,
  X5p = 0.008,
  Q5p = 0.4,
  Z5p = 4,
  gal = 2,
  _al = 50,
  tWp = 200,
  yal = "auto-copy-config-hint",
  nWp = 10,
  Tal = 5;
var initScrollKeybindingsModule = b(() => {
  np();
  JR();
  fyo();
  VIt();
  dTn();
  WFe();
  kve();
  xIt();
  og();
  Je();
  _s();
  Ct();
  Qqt();
  nr();
  je();
  z1t();
  jg();
  p8n();
  DECAY_CURVE_HIGH_GAP_MS = L(nt(), 1), DECAY_CURVE_LOW_CAP = L(Te(), 1);
});

export {z5p as OVp,Y5p as LVp,Aal as qll,eWp as UVp,hal as jll,Ayo as STo,rWp as jVp,oWp as WVp,bal as Yll,Zce as mue,sWp as GVp,iWp as VVp,aWp as KVp,lWp as zVp,DECAY_CURVE_HIGH_GAP_MS as zll,DECAY_CURVE_LOW_CAP as J6,DECAY_CURVE_HIGH_CAP as Fll,DECAY_CURVE_RESET_MS as SVp,BYPASS_FRAC_STEP as bVp,BYPASS_MULT_STEP as EVp,BYPASS_JITTER_STEP as CVp,BYPASS_MULT_CAP as vVp,DRAG_AUTOSCROLL_LINES as wVp,DRAG_AUTOSCROLL_INTERVAL_MS as RVp,DRAG_AUTOSCROLL_MAX_TICKS as xVp,AUTO_COPY_HINT_KEY as Ull,AUTO_COPY_HINT_RESET_THRESHOLD as kVp,AUTO_COPY_HINT_MAX_SHOWS as $ll,W5p as HVp,G5p as IVp,V5p as DVp,K5p as PVp,J5p as MVp,X5p as NVp,Q5p as BVp,Z5p as FVp,gal as Wll,_al as Gll,tWp as $Vp,yal as Vll,nWp as qVp,Tal as Kll,initScrollKeybindingsModule as bTo};
