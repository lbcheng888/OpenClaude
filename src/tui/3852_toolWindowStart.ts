// @ts-nocheck
import {tvn,khe,_O,yO,TO,KF,$Z} from "../../vendor/m2536.ts";
import {useAnimationFrame as Dm} from "../config/2452_isVisible.ts";
import {useResolvedTheme as TD} from "../../vendor/m2285.ts";
import {Glo,Vlo} from "../../vendor/m3849.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {formatDuration as Fi,formatNumber as qc,formatResetTime as AX,Xo} from "../../vendor/m240.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {A0e,J$t} from "../../vendor/m3847.ts";
import {Y$t,A2n} from "../../vendor/m3846.ts";
import {F4,iHe} from "../../vendor/m2820.ts";
import {H5,Pa} from "../../vendor/m720.ts";
import {h6i,nB} from "../api/2752_status.ts";
import {truncateToWidth as xs,XH} from "../../vendor/m239.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/** Compute compaction progress percentage from elapsed time (asymptotic, caps at 95%). */
function m1a(elapsedMs: any) {
  let seconds = Math.max(0, elapsedMs) / 1000,
    progress = 1 - Math.exp(-seconds / 90);
  return Math.min(95, Math.round(progress * 100));
}
/** Build the initial tool/thinking timing state. */
function f1a() {
  return {
    toolWindowStart: null,
    toolWindowEnd: null,
    thinkingBurstStart: null,
    wasThinking: !1
  };
}
/** Advance timing state by one tick, tracking tool-window and thinking-burst boundaries. */
function h1a(prevState: any, tick: any) {
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
/** Derive the display kind (tool-running / tool-done / thinking / thought-for / none) from timing state. */
function g1a(timingState: any, tick: any) {
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
/** Compute thinking intensity (0..1) ramping up after 10s of a thinking burst. */
function _1a(timingState: any, tick: any) {
  if (tick.hasActiveTools) return 0;
  if (!tick.isThinking || timingState.thinkingBurstStart === null) return 0;
  let burstMs = tick.now - timingState.thinkingBurstStart;
  return Math.min(Math.max((burstMs - 1e4) / 1e4, 0), 1);
}
/** Map frame time to a spinner glyph index. */
function RRp(frameTime: any) {
  let normalized = tvn(frameTime, _Rp);
  return Math.round(normalized * (khe().length - 1));
}
/** Pick the thinking caption escalating with elapsed thinking time. */
function vRp(thinkingMs: any) {
  if (thinkingMs >= ARp) return "almost done thinking";
  if (thinkingMs >= CRp) return "thinking some more";
  if (thinkingMs >= ERp) return "thinking more";
  if (thinkingMs >= bRp) return "still thinking";
  return "thinking";
}
/** Flash opacity oscillating with a 1s sine wave. */
function wRp(elapsedMs: any) {
  return _O((Math.sin(elapsedMs / 1000 * Math.PI) + 1) / 2);
}
/** Compute the animated warning/thinking color for the given frame. */
function kRp(elapsedMs: any, thinkingIntensity: any, overrideColor: any) {
  let seconds = (elapsedMs - S1a) / 1000,
    wave = elapsedMs < S1a ? 0 : (Math.sin(seconds * Math.PI * 2 / SRp) + 1) / 2,
    baseColor = yO(yRp, TRp, _O(wave));
  return TO(overrideColor && thinkingIntensity > 0 ? yO(baseColor, overrideColor, _O(thinkingIntensity)) : baseColor);
}
function b1a({
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
  effortSuffix: h,
  isCompacting: g = !1,
  compactingStartTime: _ = null,
  showToolCallTimer: T = !1,
  retryStatus: y = null
}) {
  let [S, E] = Dm(t ? null : e === "requesting" ? 50 : 100),
    R = TD(),
    w = Date.now(),
    k = u.current !== null ? u.current - l.current - c.current : w - l.current - c.current,
    I = lte.useRef(f1a()),
    D = {
      now: w,
      isThinking: e === "thinking",
      hasActiveTools: n,
      thinkingStatus: f,
      showToolCallTimer: T
    };
  I.current = h1a(I.current, D);
  let O = g1a(I.current, D),
    L = _1a(I.current, D),
    P = r.current,
    M = n || e === "thinking" || g,
    {
      isStalled: B,
      stalledIntensity: N,
      timeSinceLastToken: F
    } = Glo(E, P, M, t),
    V = lte.useRef(new Set()),
    G = lte.useRef(0);
  if (F === 0) {
    if (V.current.size > 0) W("tengu_spinner_stall_cleared", {
      max_stall_ms: Math.round(G.current),
      mode: Le(e),
      override_color: a != null,
      response_length: P,
      thresholds_fired: V.current.size
    }), V.current = new Set(), G.current = 0;
  } else {
    if (F > G.current) G.current = F;
    for (let threshold of gRp) if (F >= threshold && !V.current.has(threshold)) V.current.add(threshold), W("tengu_spinner_stalled_ui", {
      threshold_ms: threshold,
      mode: Le(e),
      override_color: a != null,
      time_since_last_token_ms: Math.round(F),
      response_length: P,
      render_loop_dark: F - threshold > 5000
    });
  }
  let z = t ? 0 : RRp(E),
    J = e === "requesting" ? 50 : 200,
    K = lte.useMemo(() => sn(o), [o]),
    j = K + 20,
    X = Math.floor(E / J),
    ee = t ? -100 : B ? -100 : e === "requesting" ? X % j - 10 : K + 10 - X % j,
    te = t ? 0 : e === "tool-use" ? wRp(E) : 0,
    ne = lte.useRef(P),
    se = lte.useRef(E);
  if (t) ne.current = P, se.current = E;else {
    let steps = Math.floor((E - se.current) / 50);
    if (steps > 0) {
      se.current += steps * 50;
      for (let step = 0; step < steps; step++) {
        let remaining = P - ne.current;
        if (remaining <= 0) break;
        let increment;
        if (remaining < 70) increment = 3;else if (remaining < 200) increment = Math.max(8, Math.ceil(remaining * 0.15));else increment = 50;
        ne.current = Math.min(ne.current + increment, P);
      }
    }
  }
  let re = ne.current,
    ue = Math.round(re / 4),
    le = lte.useRef(0),
    ce = lte.useRef(E);
  if (e !== "thinking" || n) le.current = 0, ce.current = E;else if (!t && (L > 0 || le.current > 0)) {
    let delta = E - ce.current;
    if (delta >= 50) {
      let steps = Math.floor(delta / 50),
        eased = le.current;
      for (let step = 0; step < steps; step++) {
        let diff = L - eased;
        if (Math.abs(diff) < 0.01) {
          eased = L;
          break;
        }
        eased += diff * 0.1;
      }
      le.current = eased, ce.current = E;
    }
  } else le.current = L, ce.current = E;
  let Se = t ? L : le.current,
    ie = Fi(k),
    ae = sn(ie),
    pe = ue,
    me = qc(pe),
    _e = `${Xe.arrowDown} ${me} tokens`,
    de = sn(_e),
    ge = O.kind === "thinking" ? vRp(O.thinkingMs) : "thinking",
    Te;
  switch (O.kind) {
    case "tool-running":
      Te = `running tool for ${Fi(O.toolMs)}`;
      break;
    case "tool-done":
      Te = `ran tool for ${Fi(O.toolMs)}`;
      break;
    case "thinking":
      Te = `${ge}${h}`;
      break;
    case "thought-for":
      Te = `thought for ${Math.max(1, Math.round(O.thoughtMs / 1000))}s`;
      break;
    case "none":
      Te = null;
      break;
  }
  let he = Te ? sn(Te) : 0,
    ye = lte.useRef(0),
    we = g && _ !== null ? Math.max(ye.current, m1a(w - _)) : null;
  ye.current = we ?? 0;
  let Oe = we !== null ? `${we}%` : null,
    We = Math.min(fRp, m - T1a - 6),
    Fe = we !== null && We >= hRp,
    ke = K + 2,
    Ue = pRp,
    Ge = Te !== null,
    ht = p || Ge || pe > 0 || k > mRp,
    pt = m - ke - 5,
    Be = Ge && pt > he;
  if (!Be && Ge && O.kind === "thinking" && (h || ge !== "thinking")) {
    if (pt > y1a) Te = "thinking", he = y1a, Be = !0;
  }
  let dt = Be ? he + Ue : 0,
    Dt = ht && pt > dt + ae,
    rt = dt + (Dt ? ae + Ue : 0),
    ot = ht && pe > 0 && pt > rt + de,
    Ht = Be && O.kind === "thinking" && !d && !Dt && !ot,
    zt = Se > 0 ? KF(R.warning) : null,
    Nt = kRp(E, Se, zt),
    nn = !zt && Se > 0.5 ? "warning" : void 0,
    _n = Se > 0 ? "warning" : void 0,
    Rn = [...(d ? [ym.jsx(v, {
      dimColor: !0,
      children: d
    }, "suffix")] : []), ...(Dt ? [ym.jsx(v, {
      dimColor: !0,
      children: ie
    }, "elapsedTime")] : []), ...(ot ? [ym.jsxs($, {
      flexDirection: "row",
      children: [ym.jsx(HRp, {
        mode: e
      }), ym.jsxs(v, {
        dimColor: !0,
        children: [me, " tokens"]
      })]
    }, "tokens")] : []), ...(Be && Te ? [O.kind === "thinking" && !t ? ym.jsx(v, {
      color: nn ?? Nt,
      children: Ht ? `(${Te})` : Te
    }, "thinking") : ym.jsx(v, {
      dimColor: !_n,
      color: _n,
      children: Te
    }, "thinking")] : [])],
    on = Rn.length > 0 ? Ht ? ym.jsx(bn, {
      children: Rn
    }) : ym.jsxs(ym.Fragment, {
      children: [ym.jsx(v, {
        dimColor: !0,
        children: "("
      }), ym.jsx(bn, {
        children: Rn
      }), ym.jsx(v, {
        dimColor: !0,
        children: ")"
      })]
    }) : null;
  return ym.jsxs($, {
    ref: S,
    flexDirection: "column",
    width: "100%",
    children: [ym.jsx($, {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 1,
      width: "100%",
      children: y ? ym.jsx(zlo, {
        status: y,
        columns: m
      }) : ym.jsxs(ym.Fragment, {
        children: [ym.jsx(A0e, {
          frame: z,
          messageColor: s,
          stalledIntensity: a ? 0 : N,
          thinkingIntensity: a ? 0 : Se,
          reducedMotion: t,
          time: E
        }), ym.jsx(Y$t, {
          message: o,
          mode: e,
          messageColor: s,
          glimmerIndex: ee,
          flashOpacity: te,
          shimmerColor: i,
          stalledIntensity: a ? 0 : N,
          thinkingIntensity: a ? 0 : Se
        }), on]
      })
    }), Fe && we !== null && ym.jsxs($, {
      flexDirection: "row",
      gap: 1,
      marginLeft: T1a,
      width: "100%",
      children: [ym.jsx(F4, {
        ratio: we / 100,
        width: We,
        variant: "pill"
      }), ym.jsx(v, {
        dimColor: !0,
        children: Oe
      })]
    })]
  });
}
/** Renders the retry/stalled status row (memoized via the compiler cache). */
function zlo(e: any) {
  let t = Klo.c(23),
    {
      status: n,
      columns: r
    } = e,
    o = Math.max(0, Math.ceil((n.deadline - Date.now()) / 1000)) * 1000,
    s = o >= 300000,
    i;
  if (t[0] !== o || t[1] !== s) i = Fi(o, {
    mostSignificantOnly: s
  }), t[0] = o, t[1] = s, t[2] = i;else i = t[2];
  let a = i,
    l;
  if (t[3] === Symbol.for("react.memo_cache_sentinel")) l = ym.jsx($, {
    "aria-hidden": !0,
    flexWrap: "wrap",
    height: 1,
    width: 2,
    children: ym.jsx(v, {
      color: "error",
      children: H5
    })
  }), t[3] = l;else l = t[3];
  let c = l;
  if (n.kind === "stalled") {
    let w;
    if (t[4] === Symbol.for("react.memo_cache_sentinel")) w = ym.jsx(v, {
      color: "error",
      children: "Waiting for API response"
    }), t[4] = w;else w = t[4];
    let H;
    if (t[5] !== a) H = ym.jsxs(ym.Fragment, {
      children: [c, ym.jsxs($, {
        flexShrink: 1,
        children: [w, ym.jsxs(v, {
          dimColor: !0,
          children: [" \xB7 will retry in ", a, " \xB7 check your network"]
        })]
      })]
    }), t[5] = a, t[6] = H;else H = t[6];
    return H;
  }
  let u = n.error.rateLimits,
    d;
  if (t[7] !== u) d = u?.resetsAt ? ` (${AX(u.resetsAt)})` : "", t[7] = u, t[8] = d;else d = t[8];
  let m = ` \xB7 Retrying in ${a}${d} \xB7 attempt ${n.attempt}/${n.maxRetries}`,
    f = n.attempt >= n.maxRetries || n.error.isNetworkDown || n.error.connection?.isSSLError || u,
    h;
  if (t[9] !== u || t[10] !== f || t[11] !== n.error.formatted) {
    let w = u?.rateLimitType ? h6i(u.rateLimitType) : "usage limit";
    h = !f ? "API error" : u ? `${w[0]?.toUpperCase()}${w.slice(1)} reached` : n.error.formatted, t[9] = u, t[10] = f, t[11] = n.error.formatted, t[12] = h;
  } else h = t[12];
  let g = h,
    _ = Math.max(10, r - 2 - sn(m) - 2),
    T;
  if (t[13] !== _ || t[14] !== g) T = xs(g, _), t[13] = _, t[14] = g, t[15] = T;else T = t[15];
  let y = T,
    S;
  if (t[16] !== y) S = ym.jsx(v, {
    color: "error",
    children: y
  }), t[16] = y, t[17] = S;else S = t[17];
  let E;
  if (t[18] !== m) E = ym.jsx(v, {
    dimColor: !0,
    children: m
  }), t[18] = m, t[19] = E;else E = t[19];
  let R;
  if (t[20] !== S || t[21] !== E) R = ym.jsxs(ym.Fragment, {
    children: [c, ym.jsxs($, {
      flexShrink: 1,
      children: [S, E]
    })]
  }), t[20] = S, t[21] = E, t[22] = R;else R = t[22];
  return R;
}
/** Renders the up/down arrow glyph box for the token-count row, by mode. */
function HRp(e: any) {
  let t = Klo.c(2),
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
        if (t[0] === Symbol.for("react.memo_cache_sentinel")) r = ym.jsx($, {
          width: 2,
          children: ym.jsx(v, {
            "aria-hidden": !0,
            dimColor: !0,
            children: Xe.arrowDown
          })
        }), t[0] = r;else r = t[0];
        return r;
      }
    case "requesting":
      {
        let r;
        if (t[1] === Symbol.for("react.memo_cache_sentinel")) r = ym.jsx($, {
          width: 2,
          children: ym.jsx(v, {
            "aria-hidden": !0,
            dimColor: !0,
            children: Xe.arrowUp
          })
        }), t[1] = r;else r = t[1];
        return r;
      }
  }
}
var Klo: any,
  lte: any,
  ym: any,
  pRp: any,
  y1a: any,
  mRp = 16000,
  fRp = 40,
  hRp = 8,
  T1a = 2,
  gRp: any,
  _Rp = 2000,
  yRp: any,
  TRp: any,
  S1a = 3000,
  SRp = 2,
  bRp = 1e4,
  ERp = 20000,
  CRp = 30000,
  ARp = 45000;
var jlo = b(() => {
  Zs();
  Pa();
  mc();
  je();
  kt();
  nB();
  Xo();
  XH();
  Is();
  iHe();
  A2n();
  J$t();
  Vlo();
  $Z();
  Klo = x(tt(), 1), lte = x(et(), 1), ym = x(oe(), 1), pRp = sn(" \xB7 "), y1a = sn("thinking"), gRp = [1e4, 45000, 300000], yRp = {
    r: 153,
    g: 153,
    b: 153
  }, TRp = {
    r: 185,
    g: 185,
    b: 185
  };
});

export {m1a,f1a,h1a,g1a,_1a,RRp,vRp,wRp,kRp,b1a,zlo,HRp,Klo,lte,ym,pRp,y1a,mRp,fRp,hRp,T1a,gRp,_Rp,yRp,TRp,S1a,SRp,bRp,ERp,CRp,ARp,jlo};
