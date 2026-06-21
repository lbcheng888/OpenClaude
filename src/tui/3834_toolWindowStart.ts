// @ts-nocheck
import {fEn,AAe,eL,tL,nL,with1mTag,GZ} from "../../vendor/m2525.ts";
import {useAnimationFrame} from "../config/2442_isVisible.ts";
import {useResolvedTheme} from "../../vendor/m2274.ts";
import {ooo,soo} from "../../vendor/m3831.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {tn,Hc} from "../../vendor/m235.ts";
import {formatDuration,formatNumber,formatResetTime,ps} from "../../vendor/m238.ts";
import {et,Ai} from "../../vendor/m2208.ts";
import {Text} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {MHe,SUt} from "../../vendor/m3829.ts";
import {TUt,HBn} from "../../vendor/m3828.ts";
import {Eq,_xe} from "../../vendor/m2807.ts";
import {m8,sl} from "../../vendor/m715.ts";
import {CUi,PF} from "../api/2739_status.ts";
import {truncateToWidth,EH} from "../../vendor/m237.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function jHa(elapsedMs: any) {
  let seconds = Math.max(0, elapsedMs) / 1000,
    progress = 1 - Math.exp(-seconds / 90);
  return Math.min(95, Math.round(progress * 100));
}
function WHa() {
  return {
    toolWindowStart: null,
    toolWindowEnd: null,
    thinkingBurstStart: null,
    wasThinking: !1
  };
}
function GHa(prevState: any, tick: any) {
  let {
    toolWindowStart: windowStart,
    toolWindowEnd: windowEnd,
    thinkingBurstStart: burstStart
  } = prevState;
  if (tick.hasActiveTools) {
    if (windowStart === null || windowEnd !== null) windowStart = tick.now;
    windowEnd = null;
  } else if (windowStart !== null && windowEnd === null) windowEnd = tick.now;
  if (!tick.hasActiveTools && tick.thinkingStatus !== null) windowStart = null, windowEnd = null;
  if (tick.isThinking) {
    if (!prevState.wasThinking) burstStart = tick.now;
  } else burstStart = null;
  return {
    toolWindowStart: windowStart,
    toolWindowEnd: windowEnd,
    thinkingBurstStart: burstStart,
    wasThinking: tick.isThinking
  };
}
function VHa(timingState: any, tick: any) {
  if (tick.showToolCallTimer && tick.hasActiveTools && timingState.toolWindowStart !== null) {
    let toolMs = tick.now - timingState.toolWindowStart;
    if (toolMs >= 2000) return {
      kind: "tool-running",
      toolMs
    };
  }
  if (tick.showToolCallTimer && !tick.hasActiveTools && tick.thinkingStatus === null && timingState.toolWindowStart !== null && timingState.toolWindowEnd !== null) {
    let toolMs = timingState.toolWindowEnd - timingState.toolWindowStart;
    if (toolMs >= 2000) return {
      kind: "tool-done",
      toolMs
    };
  }
  if (tick.thinkingStatus === "thinking" && !tick.hasActiveTools) return {
    kind: "thinking",
    thinkingMs: timingState.thinkingBurstStart !== null ? tick.now - timingState.thinkingBurstStart : 0
  };
  if (typeof tick.thinkingStatus === "number") return {
    kind: "thought-for",
    thoughtMs: tick.thinkingStatus
  };
  return {
    kind: "none"
  };
}
function KHa(timingState: any, tick: any) {
  if (tick.hasActiveTools) return 0;
  if (!tick.isThinking || timingState.thinkingBurstStart === null) return 0;
  let burstMs = tick.now - timingState.thinkingBurstStart;
  return Math.min(Math.max((burstMs - 1e4) / 1e4, 0), 1);
}
function Mfp(frameTime: any) {
  let normalized = fEn(frameTime, xfp);
  return Math.round(normalized * (AAe().length - 1));
}
function Nfp(thinkingMs: any) {
  if (thinkingMs >= Lfp) return "almost done thinking";
  if (thinkingMs >= Ofp) return "thinking some more";
  if (thinkingMs >= Pfp) return "thinking more";
  if (thinkingMs >= Dfp) return "still thinking";
  return "thinking";
}
function Bfp(elapsedMs: any) {
  return eL((Math.sin(elapsedMs / 1000 * Math.PI) + 1) / 2);
}
function Ffp(elapsedMs: any, thinkingIntensity: any, overrideColor: any) {
  let seconds = (elapsedMs - JHa) / 1000,
    wave = elapsedMs < JHa ? 0 : (Math.sin(seconds * Math.PI * 2 / Ifp) + 1) / 2,
    baseColor = tL(kfp, Hfp, eL(wave));
  return nL(overrideColor && thinkingIntensity > 0 ? tL(baseColor, overrideColor, eL(thinkingIntensity)) : baseColor);
}
function XHa({
  mode: e,
  reducedMotion: t,
  hasActiveTools: n,
  responseLengthRef: r,
  message: o,
  messageColor: s,
  shimmerColor: i,
  overrideColor: a,
  loadingStartTimeRef: l,
  totalPausedMsRef: c,
  pauseStartTimeRef: u,
  spinnerSuffix: d,
  verbose: p,
  columns: m,
  thinkingStatus: f,
  effortSuffix: A,
  isCompacting: h = !1,
  compactingStartTime: g = null,
  showToolCallTimer: _ = !1,
  retryStatus: y = null
}) {
  let [T, S] = useAnimationFrame(t ? null : e === "requesting" ? 50 : 100),
    v = useResolvedTheme(),
    R = Date.now(),
    x = u.current !== null ? u.current - l.current - c.current : R - l.current - c.current,
    H = fte.useRef(WHa()),
    I = {
      now: R,
      isThinking: e === "thinking",
      hasActiveTools: n,
      thinkingStatus: f,
      showToolCallTimer: _
    };
  H.current = GHa(H.current, I);
  let P = VHa(H.current, I),
    L = KHa(H.current, I),
    D = r.current,
    N = n || e === "thinking" || h,
    {
      isStalled: O,
      stalledIntensity: $,
      timeSinceLastToken: U
    } = ooo(S, D, N, t),
    W = fte.useRef(new Set()),
    G = fte.useRef(0);
  if (U === 0) {
    if (W.current.size > 0) logEvent("tengu_spinner_stall_cleared", {
      max_stall_ms: Math.round(G.current),
      mode: fromEnum(e),
      override_color: a != null,
      response_length: D,
      thresholds_fired: W.current.size
    }), W.current = new Set(), G.current = 0;
  } else {
    if (U > G.current) G.current = U;
    for (let Dn of Rfp) if (U >= Dn && !W.current.has(Dn)) W.current.add(Dn), logEvent("tengu_spinner_stalled_ui", {
      threshold_ms: Dn,
      mode: fromEnum(e),
      override_color: a != null,
      time_since_last_token_ms: Math.round(U),
      response_length: D,
      render_loop_dark: U - Dn > 5000
    });
  }
  let V = t ? 0 : Mfp(S),
    Q = e === "requesting" ? 50 : 200,
    K = fte.useMemo(() => tn(o), [o]),
    Y = K + 20,
    J = Math.floor(S / Q),
    ee = t ? -100 : O ? -100 : e === "requesting" ? J % Y - 10 : K + 10 - J % Y,
    te = t ? 0 : e === "tool-use" ? Bfp(S) : 0,
    ne = fte.useRef(D),
    re = fte.useRef(S);
  if (t) ne.current = D, re.current = S;else {
    let Dn = Math.floor((S - re.current) / 50);
    if (Dn > 0) {
      re.current += Dn * 50;
      for (let or = 0; or < Dn; or++) {
        let vr = D - ne.current;
        if (vr <= 0) break;
        let Yt;
        if (vr < 70) Yt = 3;else if (vr < 200) Yt = Math.max(8, Math.ceil(vr * 0.15));else Yt = 50;
        ne.current = Math.min(ne.current + Yt, D);
      }
    }
  }
  let oe = ne.current,
    ce = Math.round(oe / 4),
    ue = fte.useRef(0),
    ae = fte.useRef(S);
  if (e !== "thinking" || n) ue.current = 0, ae.current = S;else if (!t && (L > 0 || ue.current > 0)) {
    let Dn = S - ae.current;
    if (Dn >= 50) {
      let or = Math.floor(Dn / 50),
        vr = ue.current;
      for (let Yt = 0; Yt < or; Yt++) {
        let ye = L - vr;
        if (Math.abs(ye) < 0.01) {
          vr = L;
          break;
        }
        vr += ye * 0.1;
      }
      ue.current = vr, ae.current = S;
    }
  } else ue.current = L, ae.current = S;
  let he = t ? L : ue.current,
    se = formatDuration(x),
    le = tn(se),
    pe = ce,
    de = formatNumber(pe),
    _e = `${et.arrowDown} ${de} tokens`,
    fe = tn(_e),
    ie = P.kind === "thinking" ? Nfp(P.thinkingMs) : "thinking",
    Ae;
  switch (P.kind) {
    case "tool-running":
      Ae = `running tool for ${formatDuration(P.toolMs)}`;
      break;
    case "tool-done":
      Ae = `ran tool for ${formatDuration(P.toolMs)}`;
      break;
    case "thinking":
      Ae = `${ie}${A}`;
      break;
    case "thought-for":
      Ae = `thought for ${Math.max(1, Math.round(P.thoughtMs / 1000))}s`;
      break;
    case "none":
      Ae = null;
      break;
  }
  let ge = Ae ? tn(Ae) : 0,
    Ce = fte.useRef(0),
    xe = h && g !== null ? Math.max(Ce.current, jHa(R - g)) : null;
  Ce.current = xe ?? 0;
  let Re = xe !== null ? `${xe}%` : null,
    Me = Math.min(vfp, m - YHa - 6),
    Ke = xe !== null && Me >= wfp,
    He = K + 2,
    Ge = Efp,
    Ye = Ae !== null,
    ot = p || Ye || pe > 0 || x > Cfp,
    vt = m - He - 5,
    $e = Ye && vt > ge;
  if (!$e && Ye && P.kind === "thinking" && (A || ie !== "thinking")) {
    if (vt > zHa) Ae = "thinking", ge = zHa, $e = !0;
  }
  let Je = $e ? ge + Ge : 0,
    Rt = ot && vt > Je + le,
    Et = Je + (Rt ? le + Ge : 0),
    dt = ot && pe > 0 && vt > Et + fe,
    Dt = $e && P.kind === "thinking" && !d && !Rt && !dt,
    $t = he > 0 ? with1mTag(v.warning) : null,
    It = Ffp(S, he, $t),
    Zt = !$t && he > 0.5 ? "warning" : void 0,
    _n = he > 0 ? "warning" : void 0,
    Nn = [...(d ? [wa.createElement(Text, {
      dimColor: !0,
      key: "suffix"
    }, d)] : []), ...(Rt ? [wa.createElement(Text, {
      dimColor: !0,
      key: "elapsedTime"
    }, se)] : []), ...(dt ? [wa.createElement(Box, {
      flexDirection: "row",
      key: "tokens"
    }, wa.createElement(Ufp, {
      mode: e
    }), wa.createElement(Text, {
      dimColor: !0
    }, de, " tokens"))] : []), ...($e && Ae ? [P.kind === "thinking" && !t ? wa.createElement(Text, {
      key: "thinking",
      color: Zt ?? It
    }, Dt ? `(${Ae})` : Ae) : wa.createElement(Text, {
      dimColor: !_n,
      color: _n,
      key: "thinking"
    }, Ae)] : [])],
    Fn = Nn.length > 0 ? Dt ? wa.createElement(Tn, null, Nn) : wa.createElement(wa.Fragment, null, wa.createElement(Text, {
      dimColor: !0
    }, "("), wa.createElement(Tn, null, Nn), wa.createElement(Text, {
      dimColor: !0
    }, ")")) : null;
  return wa.createElement(Box, {
    ref: T,
    flexDirection: "column",
    width: "100%"
  }, wa.createElement(Box, {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 1,
    width: "100%"
  }, y ? wa.createElement(aoo, {
    status: y,
    columns: m
  }) : wa.createElement(wa.Fragment, null, wa.createElement(MHe, {
    frame: V,
    messageColor: s,
    stalledIntensity: a ? 0 : $,
    thinkingIntensity: a ? 0 : he,
    reducedMotion: t,
    time: S
  }), wa.createElement(TUt, {
    message: o,
    mode: e,
    messageColor: s,
    glimmerIndex: ee,
    flashOpacity: te,
    shimmerColor: i,
    stalledIntensity: a ? 0 : $,
    thinkingIntensity: a ? 0 : he
  }), Fn)), Ke && xe !== null && wa.createElement(Box, {
    flexDirection: "row",
    gap: 1,
    marginLeft: YHa,
    width: "100%"
  }, wa.createElement(Eq, {
    ratio: xe / 100,
    width: Me,
    variant: "pill"
  }), wa.createElement(Text, {
    dimColor: !0
  }, Re)));
}
function aoo(e: any) {
  let t = ioo.c(23),
    {
      status: n,
      columns: r
    } = e,
    o = Math.max(0, Math.ceil((n.deadline - Date.now()) / 1000)) * 1000,
    s = o >= 300000,
    i;
  if (t[0] !== o || t[1] !== s) i = formatDuration(o, {
    mostSignificantOnly: s
  }), t[0] = o, t[1] = s, t[2] = i;else i = t[2];
  let a = i,
    l;
  if (t[3] === Symbol.for("react.memo_cache_sentinel")) l = wa.createElement(Box, {
    "aria-hidden": !0,
    flexWrap: "wrap",
    height: 1,
    width: 2
  }, wa.createElement(Text, {
    color: "error"
  }, m8)), t[3] = l;else l = t[3];
  let c = l;
  if (n.kind === "stalled") {
    let R;
    if (t[4] === Symbol.for("react.memo_cache_sentinel")) R = wa.createElement(Text, {
      color: "error"
    }, "Waiting for API response"), t[4] = R;else R = t[4];
    let k;
    if (t[5] !== a) k = wa.createElement(wa.Fragment, null, c, wa.createElement(Box, {
      flexShrink: 1
    }, R, wa.createElement(Text, {
      dimColor: !0
    }, " \xB7 will retry in ", a, " \xB7 check your network"))), t[5] = a, t[6] = k;else k = t[6];
    return k;
  }
  let u = n.error.rateLimits,
    d;
  if (t[7] !== u) d = u?.resetsAt ? ` (${formatResetTime(u.resetsAt)})` : "", t[7] = u, t[8] = d;else d = t[8];
  let m = ` \xB7 Retrying in ${a}${d} \xB7 attempt ${n.attempt}/${n.maxRetries}`,
    f = n.attempt >= n.maxRetries || n.error.isNetworkDown || n.error.connection?.isSSLError || u,
    A;
  if (t[9] !== u || t[10] !== f || t[11] !== n.error.formatted) {
    let R = u?.rateLimitType ? CUi(u.rateLimitType) : "usage limit";
    A = !f ? "API error" : u ? `${R[0]?.toUpperCase()}${R.slice(1)} reached` : n.error.formatted, t[9] = u, t[10] = f, t[11] = n.error.formatted, t[12] = A;
  } else A = t[12];
  let h = A,
    g = Math.max(10, r - 2 - tn(m) - 2),
    _;
  if (t[13] !== g || t[14] !== h) _ = truncateToWidth(h, g), t[13] = g, t[14] = h, t[15] = _;else _ = t[15];
  let y = _,
    T;
  if (t[16] !== y) T = wa.createElement(Text, {
    color: "error"
  }, y), t[16] = y, t[17] = T;else T = t[17];
  let S;
  if (t[18] !== m) S = wa.createElement(Text, {
    dimColor: !0
  }, m), t[18] = m, t[19] = S;else S = t[19];
  let v;
  if (t[20] !== T || t[21] !== S) v = wa.createElement(wa.Fragment, null, c, wa.createElement(Box, {
    flexShrink: 1
  }, T, S)), t[20] = T, t[21] = S, t[22] = v;else v = t[22];
  return v;
}
function Ufp(e: any) {
  let t = ioo.c(2),
    {
      mode: n
    } = e;
  switch (n) {
    case "tool-input":
    case "tool-use":
    case "responding":
    case "thinking":
      {
        let r;
        if (t[0] === Symbol.for("react.memo_cache_sentinel")) r = wa.createElement(Box, {
          width: 2
        }, wa.createElement(Text, {
          "aria-hidden": !0,
          dimColor: !0
        }, et.arrowDown)), t[0] = r;else r = t[0];
        return r;
      }
    case "requesting":
      {
        let r;
        if (t[1] === Symbol.for("react.memo_cache_sentinel")) r = wa.createElement(Box, {
          width: 2
        }, wa.createElement(Text, {
          "aria-hidden": !0,
          dimColor: !0
        }, et.arrowUp)), t[1] = r;else r = t[1];
        return r;
      }
  }
}
var ioo: any,
  wa: any,
  fte: any,
  Efp: any,
  zHa: any,
  Cfp = 16000,
  vfp = 40,
  wfp = 8,
  YHa = 2,
  Rfp: any,
  xfp = 2000,
  kfp: any,
  Hfp: any,
  JHa = 3000,
  Ifp = 2,
  Dfp = 1e4,
  Pfp = 20000,
  Ofp = 30000,
  Lfp = 45000;
var loo = b(() => {
  Ai();
  sl();
  Hc();
  ze();
  Ct();
  PF();
  ps();
  EH();
  zs();
  _xe();
  HBn();
  SUt();
  soo();
  GZ();
  ioo = M(rt(), 1), wa = M(Te(), 1), fte = M(Te(), 1), Efp = tn(" \xB7 "), zHa = tn("thinking"), Rfp = [1e4, 45000, 300000], kfp = {
    r: 153,
    g: 153,
    b: 153
  }, Hfp = {
    r: 185,
    g: 185,
    b: 185
  };
});
export {jHa,WHa,GHa,VHa,KHa,Mfp,Nfp,Bfp,Ffp,XHa,aoo,Ufp,ioo,wa,fte,Efp,zHa,Cfp,vfp,wfp,YHa,Rfp,xfp,kfp,Hfp,JHa,Ifp,Dfp,Pfp,Ofp,Lfp,loo};
