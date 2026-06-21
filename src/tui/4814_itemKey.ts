// @ts-nocheck
import {XWn,UEo} from "../core/4775_UEo.ts";
import {VTl,lo} from "../tools/5190_userPromptCount.ts";
import {Box} from "../../vendor/m2422.ts";
import {b$r,cwe} from "../../vendor/m2423.ts";
import {dTl,pTl} from "../../vendor/m4803.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {De,Rn} from "../session/0615_length.ts";
import {Fl,bt} from "../../vendor/m195.ts";
import {EGn,SCo} from "../../vendor/m4812.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
// Cache for extracting search text from messages via XWn
function Mnm(e: any): any {
  let t = FTl.get(e);
  if (t !== void 0) return t;
  let n = XWn(e);
  return FTl.set(e, n), n;
}
// Returns sticky-prompt text for a message, or null. Uses a WeakMap cache.
function bCo(e: any): any {
  if (e === void 0) return null;
  let t = UTl.get(e);
  if (t !== void 0) return t;
  let n = Bnm(e);
  return UTl.set(e, n), n;
}
// Extracts the sticky prompt text from a message item, or null
function Bnm(e: any): any {
  let t = null;
  if (e.type === "user") {
    if (e.isMeta || e.isVisibleInTranscriptOnly) return null;
    let r = e.message.content[0];
    if (r?.type !== "text") return null;
    t = r.text;
  } else if (e.type === "attachment" && e.attachment.type === "queued_command" && e.attachment.commandMode !== "task-notification" && !e.attachment.isMeta) {
    let r = e.attachment.prompt;
    t = typeof r === "string" ? r : r.flatMap((o: any) => o.type === "text" ? [o.text] : []).join(`
`);
  }
  if (t === null) return null;
  let n = VTl(t);
  if (n.startsWith("<") || n === "") return null;
  return n;
}
// Renders a single virtual list item with hover, click, and expand support
function Fnm({
  itemKey: e,
  msg: t,
  idx: n,
  measureRef: r,
  expanded: o,
  hovered: s,
  clickable: i,
  onClickK: a,
  onEnterK: l,
  onLeaveK: c,
  renderItemRef: u
}: any): any {
  return dM.createElement(Box, {
    ref: r(e),
    flexDirection: "column",
    backgroundColor: o ? "userMessageBackgroundHover" : void 0,
    paddingBottom: o ? 1 : void 0,
    onClick: i ? (d: any) => {
      if (d.hyperlinkUrl) return d.allowDefault();
      a(t, d.cellIsBlank);
    } : void 0,
    onMouseEnter: i ? () => l(e) : void 0,
    onMouseLeave: i ? () => c(e) : void 0,
    hoverIgnoresBlankCells: !o
  }, dM.createElement(b$r.Provider, {
    value: s && !o
  }, u.current(t, n)));
}
// Virtual message list component: windowed rendering, search, jump, sticky prompt
function qTl({
  messages: e,
  scrollRef: t,
  columns: n,
  itemKey: r,
  renderItem: o,
  onItemClick: s,
  isItemClickable: i,
  isItemExpanded: a,
  extractSearchText: l = Mnm,
  trackStickyPrompt: c,
  jumpRef: u,
  onSearchMatchesChange: d,
  scanElement: p,
  setPositions: m
}: any): any {
  let f = Yf.useRef({
      keys: [],
      uuids: [],
      seen: new Map(),
      itemKey: r,
      loggedDups: new Set()
    }),
    A = Yf.useMemo(() => qnm(e, r, f.current, WTl), [e, r]),
    {
      range: h,
      topSpacer: g,
      bottomSpacer: _,
      measureRef: y,
      spacerRef: T,
      offsets: S,
      getItemTop: v,
      getItemElement: R,
      scrollToIndex: k
    } = dTl(t, A, n),
    [x, H] = h,
    I = Yf.useRef({
      offsets: S,
      start: x,
      getItemElement: R,
      getItemTop: v,
      messages: e,
      scrollToIndex: k
    });
  I.current = {
    offsets: S,
    start: x,
    getItemElement: R,
    getItemTop: v,
    messages: e,
    scrollToIndex: k
  };
  let P = Yf.useRef(null);
  function L(fe: any, ie: any): any {
    let {
      messages: Ae
    } = I.current;
    for (let ge = fe + ie; ge >= 0 && ge < Ae.length; ge += ie) if (bCo(Ae[ge]) !== null) return ge;
    return -1;
  }
  let D = Yf.useRef(null),
    N = Yf.useRef({
      msgIdx: -1,
      positions: []
    }),
    O = Yf.useRef(-1),
    $ = Yf.useRef(0),
    U = Yf.useRef(0),
    W = Yf.useRef(() => {}),
    G = Yf.useRef(() => {}),
    V = Yf.useRef({
      matches: [],
      ptr: 0,
      screenOrd: 0,
      prefixSum: []
    }),
    Q = Yf.useRef(-1),
    K = Yf.useRef(!1);
  function Y(fe: any): any {
    let ie = I.current.getItemTop(fe);
    return Math.max(0, ie - CGn);
  }
  function J(fe: any): any {
    let ie = t.current,
      {
        msgIdx: Ae,
        positions: ge
      } = N.current;
    if (!ie || ge.length === 0 || Ae < 0) {
      m?.(null);
      return;
    }
    let Ce = Math.max(0, Math.min(fe, ge.length - 1)),
      xe = ge[Ce],
      Re = I.current.getItemTop(Ae),
      Me = ie.getViewportTop(),
      Ke = Re - ie.getScrollTop(),
      He = ie.getViewportHeight(),
      Ge = Me + Ke + xe.row;
    if (Ge < Me || Ge >= Me + He) ie.scrollTo(Math.max(0, Re + xe.row - CGn)), Ke = Re - ie.getScrollTop(), Ge = Me + Ke + xe.row;
    m?.({
      positions: ge,
      rowOffset: Me + Ke,
      currentIdx: Ce
    });
    let Ye = V.current,
      ot = Ye.prefixSum.at(-1) ?? 0,
      vt = (Ye.prefixSum[Ye.ptr] ?? 0) + Ce + 1;
    d?.(ot, vt), logForDebugging(`highlight(i=${Ae}, ord=${Ce}/${ge.length}): pos={row:${xe.row},col:${xe.col}} lo=${Ke} screenRow=${Ge} badge=${vt}/${ot}`);
  }
  G.current = J;
  let [ee, te] = Yf.useState(0),
    ne = Yf.useCallback(() => te((fe: any) => fe + 1), []);
  Yf.useEffect(() => {
    let fe = D.current;
    if (!fe) return;
    let {
        idx: ie,
        wantLast: Ae,
        tries: ge
      } = fe,
      Ce = t.current;
    if (!Ce) return;
    let {
        getItemElement: xe,
        getItemTop: Re,
        scrollToIndex: Me
      } = I.current,
      Ke = xe(ie),
      He = Ke?.yogaNode?.getComputedHeight() ?? 0;
    if (!Ke || He === 0) {
      if (ge > 1) {
        D.current = null, logForDebugging(`seek(i=${ie}): no mount after scrollToIndex, skip`), W.current(Ae ? -1 : 1);
        return;
      }
      D.current = {
        idx: ie,
        wantLast: Ae,
        tries: ge + 1
      }, Me(ie), ne();
      return;
    }
    D.current = null, Ce.scrollTo(Math.max(0, Re(ie) - CGn));
    let Ge = p?.(Ke) ?? [];
    if (N.current = {
      msgIdx: ie,
      positions: Ge
    }, logForDebugging(`seek(i=${ie} t=${ge}): ${Ge.length} positions`), Ge.length === 0) {
      if (++$.current > 20) {
        $.current = 0;
        return;
      }
      W.current(Ae ? -1 : 1);
      return;
    }
    $.current = 0;
    let Ye = Ae ? Ge.length - 1 : 0;
    V.current.screenOrd = Ye, O.current = -1, G.current(Ye);
    let ot = U.current;
    if (ot) U.current = 0, W.current(ot);
  }, [ee]);
  function re(fe: any, ie: any): any {
    let Ae = t.current;
    if (!Ae) return;
    let ge = I.current,
      {
        getItemElement: Ce,
        scrollToIndex: xe
      } = ge;
    if (fe < 0 || fe >= ge.messages.length) return;
    m?.(null), N.current = {
      msgIdx: -1,
      positions: []
    }, D.current = {
      idx: fe,
      wantLast: ie,
      tries: 0
    };
    let Re = Ce(fe),
      Me = Re?.yogaNode?.getComputedHeight() ?? 0;
    if (Re && Me > 0) Ae.scrollTo(Y(fe));else xe(fe);
    ne();
  }
  function oe(fe: any): any {
    let ie = V.current,
      {
        matches: Ae,
        prefixSum: ge
      } = ie,
      Ce = ge.at(-1) ?? 0;
    if (Ae.length === 0) return;
    if (D.current) {
      U.current = fe;
      return;
    }
    if (O.current < 0) O.current = ie.ptr;
    let {
        positions: xe
      } = N.current,
      Re = ie.screenOrd + fe;
    if (Re >= 0 && Re < xe.length) {
      ie.screenOrd = Re, J(Re), O.current = -1;
      return;
    }
    let Me = (ie.ptr + fe + Ae.length) % Ae.length;
    if (Me === O.current) {
      m?.(null), O.current = -1, logForDebugging(`step: wraparound at ptr=${Me}, all ${Ae.length} msgs phantoms`);
      return;
    }
    ie.ptr = Me, ie.screenOrd = 0, re(Ae[Me], fe < 0);
    let Ke = fe < 0 ? ge[Me + 1] ?? Ce : ge[Me] + 1;
    d?.(Ce, Ke);
  }
  W.current = oe;
  function ce(): any {
    let fe = t.current,
      {
        offsets: ie,
        start: Ae,
        getItemTop: ge,
        messages: Ce
      } = I.current,
      xe = Ce.length;
    if (!fe || xe === 0) return -1;
    let Re = fe.getScrollTop() + CGn,
      Me = ge(Ae);
    if (Me >= 0 && Me <= Re) {
      let ot = Ae;
      for (let vt = Ae; vt < xe; vt++) {
        let $e = ge(vt);
        if ($e < 0 || $e > Re) break;
        ot = vt;
      }
      return ot;
    }
    let Ke = Me >= 0 ? Me - ie[Ae] : 0,
      He = Re - Ke,
      Ge = 0,
      Ye = xe - 1;
    while (Ge < Ye) {
      let ot = Ge + Ye + 1 >> 1;
      if (ie[ot] <= He) Ge = ot;else Ye = ot - 1;
    }
    return Ge;
  }
  function ue(fe: any): any {
    let ie = t.current,
      {
        messages: Ae,
        getItemTop: ge,
        scrollToIndex: Ce
      } = I.current;
    if (!ie || fe < 0 || fe >= Ae.length) return;
    if (ge(fe) >= 0) ie.scrollTo(Y(fe));else Ce(fe);
  }
  Yf.useImperativeHandle(u, () => ({
    jumpToIndex: (fe: any) => {
      let ie = t.current;
      if (ie) ie.scrollTo(Y(fe));
    },
    nextMessage: () => {
      let fe = P.current ?? ce();
      if (fe < 0) return;
      let ie = L(fe, 1);
      if (ie < 0) return;
      ue(ie), P.current = ie;
    },
    prevMessage: () => {
      let fe = P.current,
        ie = fe ?? ce();
      if (ie < 0) return;
      if (fe === null && bCo(I.current.messages[ie]) === null) {
        let ge = L(ie, -1);
        if (ge >= 0) ue(ge), P.current = ge;
        return;
      }
      let Ae = L(ie, -1);
      if (Ae < 0) return;
      ue(Ae), P.current = Ae;
    },
    setSearchQuery: (fe: any) => {
      D.current = null, N.current = {
        msgIdx: -1,
        positions: []
      }, O.current = -1, m?.(null);
      let ie = fe.toLowerCase(),
        Ae = [],
        ge = [0];
      if (ie) {
        let ot = I.current.messages;
        for (let vt = 0; vt < ot.length; vt++) {
          let $e = ot[vt];
          if ($e === void 0) continue;
          let Je = l($e),
            Rt = Je.indexOf(ie),
            Et = 0;
          while (Rt >= 0) Et++, Rt = Je.indexOf(ie, Rt + ie.length);
          if (Et > 0) Ae.push(vt), ge.push(ge.at(-1) + Et);
        }
      }
      let Ce = ge.at(-1),
        xe = 0,
        Re = t.current,
        {
          offsets: Me,
          start: Ke,
          getItemTop: He
        } = I.current,
        Ge = He(Ke),
        Ye = Ge >= 0 ? Ge - Me[Ke] : 0;
      if (Ae.length > 0 && Re) {
        let ot = Q.current >= 0 ? Q.current : Re.getScrollTop(),
          vt = 1 / 0;
        for (let $e = 0; $e < Ae.length; $e++) {
          let Je = Math.abs(Ye + Me[Ae[$e]] - ot);
          if (Je <= vt) vt = Je, xe = $e;
        }
        logForDebugging(`setSearchQuery('${fe}'): ${Ae.length} msgs \xB7 ptr=${xe} msgIdx=${Ae[xe]} curTop=${ot} origin=${Ye}`);
      }
      if (V.current = {
        matches: Ae,
        ptr: xe,
        screenOrd: 0,
        prefixSum: ge
      }, Ae.length > 0) re(Ae[xe], !0);else if (Q.current >= 0 && Re) Re.scrollTo(Q.current);
      d?.(Ce, Ae.length > 0 ? ge[xe + 1] ?? Ce : 0);
    },
    nextMatch: () => oe(1),
    prevMatch: () => oe(-1),
    setAnchor: () => {
      let fe = t.current;
      if (fe) Q.current = fe.getScrollTop();
    },
    disarmSearch: () => {
      m?.(null), D.current = null, N.current = {
        msgIdx: -1,
        positions: []
      }, O.current = -1, P.current = null;
    },
    warmSearchIndex: async () => {
      if (K.current) return 0;
      let fe = I.current.messages,
        ie = 500,
        Ae = 0,
        ge = performance.now();
      for (let xe = 0; xe < fe.length; xe += ie) {
        await sleep(0);
        let Re = performance.now(),
          Me = Math.min(xe + ie, fe.length);
        for (let Ke = xe; Ke < Me; Ke++) {
          let He = fe[Ke];
          if (He !== void 0) l(He);
        }
        Ae += performance.now() - Re;
      }
      let Ce = Math.round(performance.now() - ge);
      return logForDebugging(`warmSearchIndex: ${fe.length} msgs \xB7 work=${Math.round(Ae)}ms wall=${Ce}ms chunks=${Math.ceil(fe.length / ie)}`), K.current = !0, Math.round(Ae);
    }
  }), [t]);
  let [ae, he] = Yf.useState(null),
    se = Yf.useRef({
      onItemClick: s,
      setHoveredKey: he
    });
  se.current = {
    onItemClick: s,
    setHoveredKey: he
  };
  let le = Yf.useCallback((fe: any, ie: any) => {
      let Ae = se.current;
      if (!ie && Ae.onItemClick) Ae.onItemClick(fe);
    }, []),
    pe = Yf.useCallback((fe: any) => {
      se.current.setHoveredKey(fe);
    }, []),
    de = Yf.useCallback((fe: any) => {
      se.current.setHoveredKey((ie: any) => ie === fe ? null : ie);
    }, []),
    _e = Yf.useRef(o);
  return _e.current = o, dM.createElement(dM.Fragment, null, dM.createElement(Box, {
    ref: T,
    height: g,
    flexShrink: 0
  }), e.slice(x, H).map((fe: any, ie: any) => {
    let Ae = x + ie;
    if (fe === void 0) return jTl(Ae, e, `mounted=[${x},${H})`), null;
    let ge = A[Ae],
      Ce = !!s && (i?.(fe) ?? !0),
      xe = Ce && ae === ge,
      Re = a?.(fe);
    return dM.createElement(Fnm, {
      key: ge,
      itemKey: ge,
      msg: fe,
      idx: Ae,
      measureRef: y,
      expanded: Re,
      hovered: xe,
      clickable: Ce,
      onClickK: le,
      onEnterK: pe,
      onLeaveK: de,
      renderItemRef: _e
    });
  }), _ > 0 && dM.createElement(Box, {
    height: _,
    flexShrink: 0
  }), c && dM.createElement($nm, {
    messages: e,
    start: x,
    end: H,
    offsets: S,
    getItemTop: v,
    getItemElement: R,
    scrollRef: t
  }));
}
// Logs a warning once when an undefined element is found in the messages array
function jTl(e: any, t: any, n: any): any {
  if ($Tl) return;
  $Tl = !0;
  let r = (o: any) => o === void 0 ? "undefined" : WTl(o);
  De(new Fl(`VirtualMessageList: undefined at messages[${e}] (len=${t.length} ${n} neighbors=[${r(t[e - 1])},${r(t[e + 1])}])`, "VirtualMessageList: undefined element in messages[]"));
}
// Tracks the sticky prompt shown above the viewport as the user scrolls
function $nm({
  messages: e,
  start: t,
  end: n,
  offsets: r,
  getItemTop: o,
  getItemElement: s,
  scrollRef: i
}: any): any {
  let {
      setStickyPrompt: a
    } = Yf.useContext(EGn),
    l = Yf.useCallback((T: any) => i.current?.subscribe(T) ?? Unm, [i]);
  Yf.useSyncExternalStore(l, () => {
    let T = i.current;
    if (!T) return NaN;
    let S = T.getScrollTop() + T.getPendingDelta();
    return T.isSticky() ? -1 - S : S;
  });
  let c = i.current?.isSticky() ?? !0,
    u = Math.max(0, (i.current?.getScrollTop() ?? 0) + (i.current?.getPendingDelta() ?? 0)),
    d = t,
    p = -1;
  for (let T = n - 1; T >= t; T--) {
    let S = o(T);
    if (S >= 0) {
      if (S < u) break;
      p = S;
    }
    d = T;
  }
  let m = -1,
    f = null;
  if (d > 0 && !c) for (let T = d - 1; T >= 0; T--) {
    let S = e[T];
    if (S === void 0) jTl(T, e, `range=[${t},${n}] firstVisible=${d}`);
    let v = bCo(S);
    if (v === null) continue;
    let R = o(T);
    if (R >= 0 && R + 1 >= u) continue;
    m = T, f = v;
    break;
  }
  let A = p >= 0 ? p - r[d] : 0,
    h = m >= 0 ? Math.max(0, A + r[m]) : -1,
    g = Yf.useRef({
      idx: -1,
      tries: 0
    }),
    _ = Yf.useRef("none"),
    y = Yf.useRef(-1);
  return Yf.useEffect(() => {
    if (g.current.idx >= 0) return;
    if (_.current === "armed") {
      _.current = "force";
      return;
    }
    let T = _.current === "force";
    if (_.current = "none", !T && y.current === m) return;
    if (y.current = m, f === null) {
      a(null);
      return;
    }
    let S = f.trimStart(),
      v = S.search(/\n\s*\n/),
      R = (v >= 0 ? S.slice(0, v) : S).slice(0, Nnm).replace(/\s+/g, " ").trim();
    if (R === "") {
      a(null);
      return;
    }
    let k = m,
      x = h;
    a({
      text: R,
      scrollTo: () => {
        a("clicked"), _.current = "armed";
        let H = s(k);
        if (H) i.current?.scrollToElement(H, 1);else i.current?.scrollTo(x), g.current = {
          idx: k,
          tries: 0
        };
      }
    });
  }), Yf.useEffect(() => {
    if (g.current.idx < 0) return;
    let T = s(g.current.idx);
    if (T) i.current?.scrollToElement(T, 1), g.current = {
      idx: -1,
      tries: 0
    };else if (++g.current.tries > 5) g.current = {
      idx: -1,
      tries: 0
    };
  }), null;
}
// Returns a short type-string for a message, used in dup-key error reporting
function WTl(e: any): any {
  switch (e.type) {
    case "user":
    case "assistant":
      return `${e.type}/${e.message.content[0]?.type ?? "?"}`;
    case "system":
      return `system/${e.subtype}`;
    case "attachment":
      return `attachment/${e.attachment.type}`;
    case "grouped_tool_use":
    case "collapsed_read_search":
      return e.type;
    default:
      return e.type;
  }
}
// Builds a stable array of item keys, deduplicating repeated keys with a #N suffix
function qnm(e: any, t: any, n: any, r: any = (o: any) => o.type ?? "?"): any {
  let o = 0;
  if (n.itemKey === t && e.length >= n.keys.length) {
    let i = n.keys.length;
    while (o < i && e[o].uuid === n.uuids[o]) o++;
  }
  if (o < n.keys.length) n.keys = [], n.uuids = [], n.seen = new Map(), o = 0;
  n.itemKey = t;
  let s = null;
  for (; o < e.length; o++) {
    let i = e[o],
      a = t(i),
      l = n.seen.get(a);
    if (l === void 0) n.seen.set(a, 1), n.keys.push(a);else if (n.seen.set(a, l + 1), n.keys.push(`${a}#${l}`), !n.loggedDups.has(a)) n.loggedDups.add(a), (s ??= new Map()).set(a, r(i));
    n.uuids.push(i.uuid);
  }
  if (s) {
    let i = [...s].slice(0, 3).map(([a, l]) => `[${l}] ${a} \xD7${n.seen.get(a)}`);
    De(Error(`VirtualMessageList: duplicate sibling itemKeys (deduped via #N suffix; upstream uuid-dup): ${i.join(", ")}`));
  }
  return n.keys;
}
var dM: any,
  Yf: any,
  CGn = 3,
  FTl: any,
  Nnm = 500,
  UTl: any,
  Unm = () => {},
  $Tl = !1;
var GTl = b(() => {
  pTl();
  ze();
  cwe();
  SCo();
  qe();
  bt();
  Rn();
  lo();
  UEo();
  dM = M(Te(), 1), Yf = M(Te(), 1), FTl = new WeakMap();
  UTl = new WeakMap();
});
export {Mnm,bCo,Bnm,Fnm,qTl,jTl,$nm,WTl,qnm,dM,Yf,CGn,FTl,Nnm,UTl,Unm,$Tl,GTl};
