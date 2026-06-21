// @ts-nocheck
import {pG as zW,pye as z_e,tSl as Pyl,wT as yT,tne as Gte,nSl as Oyl,SS as mS,Jjt as bjt,allTools as w_,ZTl as Iyl,rSl as Lyl,eSl as Dyl,lo} from "../tools/5190_userPromptCount.ts";
import {Q$ as u4e,_q as Zle} from "../telemetry/2781_consumer.ts";
import {Ms as Ds,Pp as tm} from "../config/2273_loggedTmuxCcDisable.ts";
import {Q0a as UIa} from "../api/3868_level.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {ju as xu,wk as bk} from "./2564_current.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {mt as ft,Mc as hc,configProtoStore as fo} from "../../vendor/m2458.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {lGn as SWn,YEo as Wbo} from "../../vendor/m4786.ts";
import {T_l as Qhl,A_l as Khl,g_l as Yhl,S_l as Zhl} from "../agent/4773_hookCount.ts";
import {p_l as Whl,u_l as qhl,m_l as Ghl} from "../../vendor/m4771.ts";
import {QYa as kza,eJa as Iza,LHe as gHe} from "../hooks/4340_isCollapsible.ts";
import {J4e as x4e,Hte as Tte} from "../config/3934_claude_haiku_4_5.ts";
import {jia as xsa} from "./3282_result.tsx";
import {Cl as vl,Ri} from "../tools/2227_userFacingName.ts";
import {w5 as l5,VK as HK,F4 as w4} from "../../vendor/m2416.ts";
import {b_l as egl,E_l as tgl,FEo as Obo} from "../../vendor/m4773.ts";
import {bc as Sc,Ug as jg} from "../../vendor/m2264.ts";
import {ayl as Fgl,lyl as Ugl,cyl as $gl} from "./4786_message.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {dg as ag,J4 as N4} from "../../vendor/m2570.ts";
import {Cn as En,dr as fr} from "../../vendor/m231.ts";
import {XWn as uWn,UEo as Lbo} from "../core/4775_UEo.ts";
import {_t as gt,cu as au} from "../../vendor/m582.ts";
import {Axe as XRe,sLt as OOt} from "../../vendor/m2797.ts";
import {qTl as byl,GTl as Eyl} from "./4814_itemKey.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {fc,sl as rl} from "../../vendor/m715.ts";
import {rMa as UOa,dU as nU} from "../../vendor/m3932.ts";
import {b,M as L,ro as Pr} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {Z_l as Igl,Q_l as Hgl} from "./4783_columns.ts";
import {Vhe as khe,bP as SP} from "../../vendor/m3282.ts";
import {cTl as W_l,lTl as j_l} from "../../vendor/m4802.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
import {j$ as vF,HRe as IAe} from "../../vendor/m2692.ts";
import {rwn as Tvn} from "../../vendor/m2693.ts";
import {L9 as T9,nJ as qY} from "../config/4228_shouldToolsListOptInToBrief.ts";
import {cXe as VJe,Iti as Sei} from "../config/2026_isPewterOwlTool.ts";
// @ts-nocheck
function hasProxyAuthHelper(H, _, q) {
  let r = new Set(_),
    o = new Set(q),
    s = new Set(),
    i = [],
    a = 0;
  for (let c = 0; c < H.length; c++) {
    let u = H[c],
      d = u.message?.content[0];
    if (u.type === "user" && d?.type !== "tool_result" && (!u.isMeta || zW(u.origin))) a++;else if (u.type === "attachment" && u.attachment?.type === "queued_command" && u.attachment.commandMode === "prompt" && (zW(u.attachment.origin) || !u.attachment.isMeta && u4e(u.attachment.origin))) a++;else if (u.type === "assistant" && d?.type === "tool_use" && d.name && o.has(d.name)) s.add(a);
    i[c] = a;
  }
  let l = new Set();
  return H.filter((c, u) => {
    if (c.type === "system") return true;
    let d = c.message?.content[0];
    if (c.type === "assistant") {
      if (c.isApiErrorMessage) return true;
      if (d?.type === "tool_use" && d.name && r.has(d.name)) {
        if ("id" in d) l.add(d.id);
        return true;
      }
      if (d?.type === "text" && !s.has(i[u])) return true;
      return false;
    }
    if (c.type === "user") {
      if (d?.type === "tool_result") return d.tool_use_id !== undefined && l.has(d.tool_use_id);
      return !c.isMeta || zW(c.origin);
    }
    if (c.type === "attachment") {
      let p = c.attachment;
      return p?.type === "queued_command" && p.commandMode === "prompt" && (zW(p.origin) || !p.isMeta && u4e(p.origin));
    }
    return false;
  });
}
function hem(e, t) {
  let n = new Set(t),
    r = new Set(),
    o = new Map(),
    s = [],
    i = 0;
  for (let a = 0; a < e.length; a++) {
    let l = e[a],
      c = l.message?.content[0];
    if (l.type === "user" && c?.type !== "tool_result" && !l.isMeta) {
      i++;
      continue;
    }
    if (l.type === "assistant") {
      if (c?.type === "text") s[a] = i;else if (c?.type === "tool_use" && c.name && n.has(c.name) && c.id) o.set(c.id, i);
    } else if (l.type === "user" && c?.type === "tool_result" && c.tool_use_id && o.has(c.tool_use_id) && !c.is_error) r.add(o.get(c.tool_use_id));
  }
  if (r.size === 0) return e;
  return e.filter((a, l) => {
    let c = s[l];
    return c === undefined || !r.has(c);
  });
}
function _em(e) {
  return Ds() ? Math.min(Ryl, e) : Ryl;
}
function xyl(e, t, n, r = gem) {
  let o = t.current,
    s = o ? e[o.idx]?.uuid === o.uuid ? o.idx : e.findIndex(l => l.uuid === o.uuid) : -1,
    i = s >= 0 ? s : o && o.idx < e.length ? o.idx : 0;
  if (e.length - i > n + r) i = e.length - n;
  let a = e[i];
  if (a && (o?.uuid !== a.uuid || o.idx !== i)) t.current = {
    uuid: a.uuid,
    idx: i
  };else if (!a && o) t.current = null;
  return i;
}
function kyl(e) {
  return (e.type === "assistant" || e.type === "user" ? z_e(e) : null) ?? e.uuid;
}
function Tem(e, t) {
  if (e.size !== t.size) return false;
  for (let n of e) if (!t.has(n)) return false;
  return true;
}
function Sem(e, t, n, r) {
  let o = new Set(),
    s = [];
  for (let i of t) {
    let a = i.contentBlock.id;
    if (n.has(a) || r.has(a) || o.has(a)) continue;
    o.add(a), s.push(i);
  }
  if (s.length === 0) return Hyl;
  if (s.length === e.length && s.every((i, a) => i === e[a])) return e;
  return s;
}
function bem(e, t, n) {
  return n && e[0] === t[0] ? e : t;
}
function Dje(e) {
  let t = yEo.c(6),
    {
      deferMessages: n,
      placeholderBaseline: r,
      placeholderElement: o,
      ...s
    } = e,
    i = Df.useDeferredValue(s.messages),
    a = bem(i, s.messages, n),
    l;
  if (t[0] !== a || t[1] !== s) l = Bu.createElement(Eem, {
    ...s,
    messages: a
  }), t[0] = a, t[1] = s, t[2] = l;else l = t[2];
  let c = o && r !== undefined && a.length <= r && o,
    u;
  if (t[3] !== l || t[4] !== c) u = Bu.createElement(Bu.Fragment, null, l, c), t[3] = l, t[4] = c, t[5] = u;else u = t[5];
  return u;
}
function qgl(e, t, n, r, o, s) {
  if (o === "transcript") return true;
  switch (e.type) {
    case "attachment":
    case "user":
    case "assistant":
      {
        if (e.type === "assistant") {
          let a = e.message.content[0];
          if (a?.type === "server_tool_use") return s.resolvedToolUseIDs.has(a.id);
        }
        let i = z_e(e);
        if (!i) return true;
        if (t.has(i)) return false;
        if (n.has(i)) return false;
        if (Pyl(i, "PostToolUse", s)) return false;
        return UIa(r, s.resolvedToolUseIDs);
      }
    case "system":
      return true;
    case "grouped_tool_use":
      return e.messages.every(a => {
        let l = a.message.content[0];
        return l?.type === "tool_use" && s.resolvedToolUseIDs.has(l.id);
      });
    case "collapsed_read_search":
      return false;
  }
}
var yEo,
  Bu,
  Df,
  pem,
  vyl,
  mem,
  wyl,
  fem,
  _Eo = 30,
  gem = 50,
  Ryl = 200,
  yem = ({
    messages: e,
    tools: t,
    commands: n,
    verbose: r,
    toolJSX: o,
    inProgressToolUseIDs: s,
    isMessageSelectorVisible: i,
    conversationId: a,
    screen: l,
    streamingToolUses: c,
    showAllInTranscript: u = false,
    agentDefinitions: d,
    onOpenRateLimitOptions: p,
    hideLogo: m = false,
    latchAnnouncementSlot: f = true,
    isLoading: A,
    streamingText: h,
    hideStreamingTail: g = false,
    isBriefOnly: _ = false,
    unseenDivider: y,
    scrollRef: T,
    trackStickyPrompt: S,
    jumpRef: C,
    onSearchMatchesChange: R,
    scanElement: k,
    setPositions: x,
    disableRenderCap: I = false,
    renderRange: H
  }) => {
    let P = _ && wyl(),
      {
        columns: O,
        rows: D
      } = hr(),
      M = xu("transcript:toggleShowAll", "Transcript", "Ctrl+E"),
      U = Df.useMemo(() => Ge.CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL, []),
      $ = ft(jn => jn.briefTranscript),
      W = ft(jn => jn.showMessageTimestamps) && ut("tengu_silk_hinge", false),
      G = hc(),
      K = false,
      Q = Df.useMemo(() => null, [e, false]),
      V = T != null && !U,
      Y = _em(D),
      J = Df.useRef(null),
      ee = Df.useRef(null),
      te = Df.useRef(a),
      ne = Df.useRef(r);
    if (te.current !== a) te.current = a, J.current = null, ee.current = null;
    if (ne.current !== r) ne.current = r, ee.current = null;
    let re = !V && !I ? xyl(e, J, Y * 2) : 0,
      oe = Df.useRef(null);
    oe.current ??= new WeakMap();
    let ie = oe.current,
      le = Df.useMemo(() => {
        let jn = re > 0,
          Ur = jn ? e.slice(re) : e;
        return yT(Ur, jn, ie).filter(Gte);
      }, [e, re, ie]),
      ce = Df.useMemo(() => {
        for (let jn = le.length - 1; jn >= 0; jn--) {
          let Ur = le[jn];
          if (Ur?.type === "user") {
            let zr = Ur.message.content;
            for (let ye of zr) if (ye.type === "text") {
              let ve = ye.text;
              if (ve.startsWith("<bash-stdout") || ve.startsWith("<bash-stderr")) return Ur.uuid;
            }
          }
        }
        return null;
      }, [le]),
      me = Df.useMemo(() => Oyl(le), [le]),
      se = Df.useRef(Hyl),
      ue = Df.useMemo(() => {
        let jn = Sem(se.current, c, s, me);
        return se.current = jn, jn;
      }, [c, s, me]),
      pe = Df.useMemo(() => ue.flatMap(jn => {
        let Ur = mS({
          content: [jn.contentBlock]
        });
        return Ur.uuid = bjt(jn.contentBlock.id, 0), yT([Ur]);
      }), [ue]),
      de = l === "transcript",
      _e = de && !u && !V,
      {
        collapsedBase: ae,
        lookups: Ae,
        hasTruncatedMessages: he,
        hiddenMessageCount: ge
      } = Df.useMemo(() => {
        let jn = r || Ds() ? le : w_(le, undefined),
          Ur = Iyl(jn.filter(bt => bt.type !== "progress").filter(bt => !SWn(bt)).filter(bt => Lyl(bt, de)), pe),
          zr = [vyl, mem],
          ye = [vyl],
          ve = !de && (wyl() || !fem()) ? P ? hasProxyAuthHelper(Ur, zr, ye) : hem(Ur, ye) : Ur,
          Me = _e ? ve.slice(-_Eo) : ve,
          tt = _e && ve.length > _Eo,
          {
            messages: Ve
          } = Qhl(Me, t, r),
          Le = Whl(Khl(Yhl(kza(Ve, t))), r),
          yt = Dyl(le, Me),
          dt = Ur.length - _Eo;
        return {
          collapsedBase: Le,
          lookups: yt,
          hasTruncatedMessages: tt,
          hiddenMessageCount: dt
        };
      }, [r, le, de, pe, _e, t, P]),
      Ce = Df.useMemo(() => {
        if (!(Ds() && $ && !de)) return ae;
        return Iza(ae, t, jn => {
          let Ur = G.getState().tasks[jn];
          return Ur?.type === "local_agent" ? Ur.result?.toolStats : undefined;
        }, A);
      }, [ae, t, $, de, G, A]),
      xe = Df.useMemo(() => {
        let Ur = !V && !I ? xyl(Ce, ee, Y) : 0;
        return H ? Ce.slice(H[0], H[1]) : Ur > 0 ? Ce.slice(Ur) : Ce;
      }, [Ce, H, V, I, Y]),
      we = Df.useMemo(() => new Set(c.map(jn => jn.contentBlock.id)), [c]),
      Be = Df.useMemo(() => null, [xe, Q]),
      Ke = Df.useMemo(() => {
        if (!y) return -1;
        let jn = y.firstUnseenUuid.slice(0, 24);
        return xe.findIndex(Ur => Ur.uuid.slice(0, 24) === jn);
      }, [y, xe]),
      [ke, We] = Df.useState(() => new Set()),
      Ye = Df.useCallback(jn => {
        let Ur = kyl(jn);
        We(zr => {
          let ye = new Set(zr);
          if (ye.has(Ur)) ye.delete(Ur);else ye.add(Ur);
          return ye;
        });
      }, []),
      st = Df.useCallback(jn => ke.size > 0 && ke.has(kyl(jn)), [ke]),
      Ht = Df.useRef(Ae);
    Ht.current = Ae;
    let qe = Df.useRef(O);
    qe.current = O;
    let ze = Df.useCallback(jn => {
        if (jn.type === "collapsed_read_search") return true;
        if (jn.type === "attachment") {
          if (r || de) return false;
          return jn.attachment?.type === "goal_status" && !!jn.attachment.reason;
        }
        if (jn.type === "assistant") {
          let ve = jn.message.content[0];
          return ve != null && x4e(ve) && ve.type === "advisor_tool_result" && ve.content.type === "advisor_result";
        }
        if (jn.type !== "user") return false;
        let Ur = jn.message.content[0];
        if (Ur?.type !== "tool_result") return false;
        if (Ur.is_error) return xsa(Ur.content);
        if (!jn.toolUseResult) return false;
        let zr = Ht.current.toolUseByToolUseID.get(Ur.tool_use_id)?.name;
        return (zr ? vl(t, zr) : undefined)?.isResultTruncated?.(jn.toolUseResult, {
          columns: qe.current
        }) ?? false;
      }, [t, r, de]),
      wt = (!o || !!o.shouldContinueAnimation) && !i,
      Et = s.size > 0,
      ht = Df.useContext(l5);
    Df.useEffect(() => {
      if (!ht) return;
      return egl(ht), () => tgl(ht);
    }, [ht]);
    let {
        progress: Dt
      } = HK(),
      Nt = Df.useRef(null),
      Lt = Sc("terminalProgressBarEnabled", true).value;
    Df.useEffect(() => {
      let jn = qhl({
        enabled: Lt,
        isLoading: A,
        hasToolsInProgress: Et
      });
      if (Nt.current === jn) return;
      Nt.current = jn, Dt(jn);
    }, [Dt, Lt, A, Et]), Df.useEffect(() => () => Dt(null), [Dt]);
    let en = Df.useCallback(jn => `${jn.uuid}-${a}`, [a]),
      tn = (jn, Ur) => {
        let zr = Ur > 0 ? xe[Ur - 1]?.type : undefined,
          ye = jn.type === "user" && zr === "user",
          ve = jn.type === "collapsed_read_search" && (!!h || Fgl(xe, Ur, t, we)),
          Me = en(jn),
          Ve = Bu.createElement(Ugl, {
            key: Me,
            message: jn,
            isUserContinuation: ye,
            hasContentAfter: ve,
            tools: t,
            commands: n,
            verbose: r || st(jn),
            showMessageTimestamps: W,
            inProgressToolUseIDs: s,
            streamingToolUseIDs: we,
            screen: l,
            canAnimate: wt,
            onOpenRateLimitOptions: p,
            latestBashOutputUUID: ce,
            columns: O,
            isLoading: A,
            lookups: Ae
          });
        if (y && Ur === Ke) return [Bu.createElement(B, {
          key: "unseen-divider",
          marginTop: 1
        }, Bu.createElement(ag, {
          title: `${y.count} new ${En(y.count, "message")}`,
          width: O,
          color: "inactive"
        })), Ve];
        return Ve;
      },
      or = Df.useRef(null);
    or.current ??= new WeakMap();
    let gn = or.current,
      Qn = Df.useCallback(jn => {
        let Ur = gn.get(jn);
        if (Ur !== undefined) return Ur;
        let zr = uWn(jn);
        if (jn.type === "user" && jn.toolUseResult && Array.isArray(jn.message.content)) {
          let ve = jn.message.content.find(Me => Me.type === "tool_result");
          if (ve && "tool_use_id" in ve) {
            let Me = Ht.current.toolUseByToolUseID.get(ve.tool_use_id),
              Ve = (Me && vl(t, Me.name))?.extractSearchText?.(jn.toolUseResult);
            if (Ve !== undefined) zr = Ve;
          }
        }
        let ye = zr.toLowerCase();
        return gn.set(jn, ye), ye;
      }, [t, gn]);
    return Bu.createElement(Bu.Fragment, null, !m && !(H && H[0] > 0) && Bu.createElement(pem, {
      agentDefinitions: d,
      latchAnnouncementSlot: f
    }), he && Bu.createElement(ag, {
      title: `${M} to show ${gt.bold(ge)} previous messages`,
      width: O
    }), de && u && ge > 0 && !I && Bu.createElement(ag, {
      title: `${M} to hide ${gt.bold(ge)} previous messages`,
      width: O
    }), V ? Bu.createElement(XRe.Provider, {
      value: true
    }, Bu.createElement(byl, {
      messages: xe,
      scrollRef: T,
      columns: O,
      itemKey: en,
      renderItem: tn,
      onItemClick: Ye,
      isItemClickable: ze,
      isItemExpanded: st,
      trackStickyPrompt: S,
      jumpRef: C,
      onSearchMatchesChange: R,
      scanElement: k,
      setPositions: x,
      extractSearchText: Qn
    })) : xe.flatMap(tn), h && !P && Bu.createElement(B, {
      alignItems: "flex-start",
      flexDirection: "row",
      marginTop: 1,
      width: "100%"
    }, Bu.createElement(B, {
      flexDirection: "row"
    }, Bu.createElement(B, {
      minWidth: 2
    }, Bu.createElement(w, {
      "aria-label": "claude:",
      color: "text"
    }, fc)), Bu.createElement(B, {
      flexDirection: "column"
    }, Bu.createElement(UOa, {
      hideTrailingLine: g
    }, h)))));
  },
  Hyl,
  Eem;
var pjt = b(() => {
  au();
  rl();
  Ii();
  w4();
  Je();
  bk();
  Yn();
  fo();
  Ri();
  Tte();
  Ghl();
  gHe();
  Or();
  tm();
  Zhl();
  Zle();
  lo();
  jg();
  fr();
  Obo();
  Lbo();
  N4();
  Igl();
  nU();
  $gl();
  Wbo();
  khe();
  W_l();
  OOt();
  Eyl();
  yEo = L(nt(), 1), Bu = L(Te(), 1), Df = L(Te(), 1), pem = Bu.memo(function (t) {
    let n = yEo.c(5),
      {
        agentDefinitions: r,
        latchAnnouncementSlot: o
      } = t,
      s,
      i;
    if (n[0] === Symbol.for("react.memo_cache_sentinel")) s = Bu.createElement(Hgl, null), i = null, n[0] = s, n[1] = i;else s = n[0], i = n[1];
    let a;
    if (n[2] !== r || n[3] !== o) a = Bu.createElement(SP, null, Bu.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, s, i, Bu.createElement(Bu.Suspense, {
      fallback: null
    }, Bu.createElement(j_l, {
      agentDefinitions: r,
      latchAnnouncementSlot: o
    })))), n[2] = r, n[3] = o, n[4] = a;else a = n[4];
    return a;
  }), vyl = (vF(), Pr(IAe)).BRIEF_TOOL_NAME, mem = Pr(Tvn).SEND_USER_FILE_TOOL_NAME, wyl = (T9(), Pr(qY)).isBriefEnabled, fem = (VJe(), Pr(Sei)).isPewterOwlTool;
  Hyl = [];
  Eem = Bu.memo(yem, (e, t) => {
    let n = Object.keys(e);
    for (let r of n) {
      if (r === "onOpenRateLimitOptions" || r === "scrollRef" || r === "trackStickyPrompt" || r === "jumpRef" || r === "onSearchMatchesChange" || r === "scanElement" || r === "setPositions") continue;
      if (e[r] !== t[r]) {
        if (r === "streamingToolUses") {
          let o = e.streamingToolUses,
            s = t.streamingToolUses;
          if (o.length === s.length && o.every((i, a) => i.contentBlock === s[a]?.contentBlock)) continue;
        }
        if (r === "inProgressToolUseIDs") {
          if (Tem(e.inProgressToolUseIDs, t.inProgressToolUseIDs)) continue;
        }
        if (r === "unseenDivider") {
          let o = e.unseenDivider,
            s = t.unseenDivider;
          if (o?.firstUnseenUuid === s?.firstUnseenUuid && o?.count === s?.count) continue;
        }
        if (r === "tools") {
          let o = e.tools,
            s = t.tools;
          if (o.length === s.length && o.every((i, a) => i.name === s[a]?.name)) continue;
        }
        return false;
      }
    }
    return true;
  });
});

export {hasProxyAuthHelper as Vnm,hem as Knm,_em as Ynm,xyl as JTl,kyl as XTl,Tem as Xnm,Sem as Qnm,bem as Znm,Dje as Qje,qgl as uyl,yEo as CCo,Bu as Nu,Df as xf,pem as jnm,vyl as KTl,mem as Wnm,wyl as zTl,fem as Gnm,_Eo as ECo,gem as znm,Ryl as YTl,yem as Jnm,Hyl as QTl,Eem as erm,pjt as Ujt};
