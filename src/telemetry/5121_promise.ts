// @ts-nocheck
import {hue as Y1H,bJ as xo,sM as oV} from "../../vendor/m4581.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnumOpt as A9,fromEnum as tH} from "../../vendor/m5.ts";
import {s5t as MU_,$xo as TXq} from "../../vendor/m5119.ts";
import {RZ as Ct,oUe as ASH,mF as _C,Wve as mXH,pF as HC,XS as pJ} from "../config/2341_XS.ts";
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {OUr as ey8,LUr as Hv8} from "../config/2345_kind.ts";
import {N1 as Zv,M4 as zp,iZe as $sH,NK as sn,L4 as Tp,BK as tn} from "../../vendor/m2339.ts";
import {S$r as QE8,gUe as hSH} from "../config/2421_gUe.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {bgSupervisorNoun as Jf,daemonHint as lqH,bv as wP} from "../config/2204_shouldShowLaunchComposer.ts";
import {T5 as Jg,UH as VG,uC as UM,zO as EN} from "../../vendor/m2268.ts";
import {rTn as WY6,lg as Jw} from "../../vendor/m2269.ts";
import {v0 as $L,Uve as bXH} from "../../vendor/m2285.ts";
import {OT as Mj,gue as A1H} from "../../vendor/m4582.ts";
import {Cp as JO,Csl as xeK,rM as iV,SG as Vc} from "../../vendor/m4493.ts";
import {qt as d_,Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {execFileNoThrow as B6,oa as l7} from "../../vendor/m684.ts";
import {je as oH} from "../../vendor/m577.ts";
import {RUr as ny8,Gve as pXH} from "../config/2342_useDecayCurve.ts";
import {JR as SW,U4 as Yp} from "../../vendor/m2426.ts";
import {_t as D_,cu as K5} from "../../vendor/m582.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/**
 * Semantic restoration for telemetry/5100_promise.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

/** Internal restored helper for telemetry/5100_promise.ts; behavior is preserved. */
function bufferMatchesAt(H: any, _: any, q: any): any {
  return H.length - _ >= q.length && H.compare(q, 0, q.length, _, _ + q.length) === 0;
}
/** Internal restored helper for telemetry/5100_promise.ts; behavior is preserved. */
function sharedSuffixPrefixLength(H: any, _: any): any {
  let q = Math.min(H.length, _.length - 1);
  H: for (let K = q; K > 0; K--) {
    let O = H.length - K;
    for (let T = 0; T < K; T++) if (H[O + T] !== _[T]) continue H;
    return K;
  }
  return 0;
}
// FIXME: unverified name
/** Internal restored helper for telemetry/5100_promise.ts; behavior is preserved. */
function CZ4(H: any): any {
  let _ = !1,
    q = !1,
    K,
    O = new Promise((z: any): any => {
      K = z;
    }),
    T = (): any => {
      if (_) return;
      let z;
      while ((z = H.read()) !== null) {
        let $ = typeof z === "string" ? Buffer.from(z, "utf8") : z;
        for (let Y = 0; Y < $.length; Y++) {
          let A = $[Y];
          if (q) {
            if (q = !1, A === vZ4) {
              _ = !0, K();
              return;
            }
            continue;
          }
          if (A === yZ4 || A === pKT || bufferMatchesAt($, Y, EZ4) || bufferMatchesAt($, Y, SZ4) || bufferMatchesAt($, Y, BKT) || bufferMatchesAt($, Y, UKT)) {
            _ = !0, K();
            return;
          }
          let w = A === zXq ? 1 : bufferMatchesAt($, Y, zc6) ? zc6.length : bufferMatchesAt($, Y, $c6) ? $c6.length : 0;
          if (w) Y += w - 1, q = !0;
        }
      }
    };
  if (H.on("readable", T), "resume" in H && "pause" in H) H.resume(), H.pause();
  return T(), {
    promise: O,
    cancel: (): any => {
      _ = !0, H.removeListener("readable", T);
    }
  };
}
// FIXME: unverified name
/** Internal restored helper for telemetry/5100_promise.ts; behavior is preserved. */
async function oo(H: any, _: any = {}): Promise<any> {
  let q = _.stdin ?? process.stdin,
    K = _.stdout ?? process.stdout,
    O = "columns" in K ? K.columns ?? 120 : 120,
    T = "rows" in K ? K.rows ?? 30 : 30,
    z = O,
    $ = T,
    Y = NZ4.randomUUID(),
    A = await Y1H(),
    w = Date.now(),
    f,
    j,
    J,
    D,
    M = !1;
  function X(): any {
    if (M) return;
    M = !0, c("tengu_bg_attach_first_frame", {
      ms: Date.now() - w,
      ack_ms: f,
      via: A9(j),
      tempo: A9(J),
      state: D
    });
  }
  let P,
    Z = new Promise(($H: any): any => {
      P = $H;
    }),
    W = !1,
    G = !1,
    R = !1,
    h,
    y = O,
    E = T,
    v = MU_(),
    C = Ct(),
    S = t_() === "windows" && !ey8(),
    I = _.holdScreenOnDisconnect && t_() === "windows" ? !0 : "isRaw" in q ? Boolean(q.isRaw) : !1,
    p = t_() === "windows",
    b = Buffer.from(Zv, "ascii"),
    x = Buffer.from(zp, "ascii"),
    U = p && QE8(),
    F = !1,
    Q,
    d;
  try {
    d = VZ4.connect(xo());
  } catch ($H) {
    return {
      outcome: "error",
      msg: GH($H)
    };
  }
  d.setTimeout(1e4, (): any => {
    if (!G) l("error", `${Jf()} did not respond \u2014 it may be stalled${lqH("restart")}`);
  });
  function l($H: any, wH: any): any {
    if (W) return;
    if (W = !0, clearTimeout(Q), c("tengu_bg_attach_outcome", {
      outcome: tH($H),
      got_ack: G,
      got_first_frame: M,
      ms: Date.now() - w,
      via: A9(j),
      tempo: A9(J)
    }), G) {
      let jH = _.alreadyInAlt || $H === "disconnected" && _.holdScreenOnDisconnect;
      K.write($sH + v.snapshot().map(sn).reverse().join("") + Zv + (t_() === "windows" ? FKT : "") + "\x1B[0m\x1B7" + Jg + "\x1B8" + (ASH() ? WY6 : "") + (jH ? "" : _C()));
    }
    if (!I) $L(q, !1);
    if (q.removeListener("readable", i), q.removeListener("end", t), "removeListener" in K) K.removeListener("resize", n);
    clearTimeout(h), d.destroy(), P({
      outcome: $H,
      msg: wH
    });
  }
  function n(): any {
    if (W) return;
    if (h === void 0) y = z, E = $;
    z = "columns" in K ? K.columns ?? O : O, $ = "rows" in K ? K.rows ?? T : T, clearTimeout(h), h = setTimeout((): any => {
      if (h = void 0, W) return;
      if (z < y || $ < E) K.write(VG + UM);
      Mj({
        proto: JO,
        op: "resize",
        short: H,
        cols: z,
        rows: $,
        attachId: Y
      });
    }, 50);
  }
  function o($H: any): any {
    if (W) return;
    let wH = typeof $H === "string" ? Buffer.from($H, "utf8") : $H,
      jH = 0;
    for (let MH = 0; MH < wH.length; MH++) {
      let TH = wH[MH];
      if (R) {
        if (R = !1, MH > jH) d.write(wH.subarray(jH, MH));
        if (TH === vZ4) return l("detached");
        d.write(Buffer.from([zXq, TH])), jH = MH + 1;
        continue;
      }
      if (TH === yZ4 || bufferMatchesAt(wH, MH, EZ4) || bufferMatchesAt(wH, MH, SZ4)) {
        if (MH > jH) d.write(wH.subarray(jH, MH));
        return l("detached");
      }
      if (S && TH === uKT) {
        if (MH > jH) d.write(wH.subarray(jH, MH));
        d.write(mKT), jH = MH + 1;
        continue;
      }
      let XH = TH === zXq ? 1 : bufferMatchesAt(wH, MH, zc6) ? zc6.length : bufferMatchesAt(wH, MH, $c6) ? $c6.length : 0;
      if (XH) {
        if (MH > jH) d.write(wH.subarray(jH, MH));
        MH += XH - 1, jH = MH + 1, R = !0;
      }
    }
    if (jH < wH.length) d.write(wH.subarray(jH));
  }
  function i(): any {
    let $H;
    while (($H = q.read()) !== null) o($H);
  }
  function t(): any {
    l("detached");
  }
  let a = ro,
    e = ro,
    qH = ro,
    KH = ro;
  function zH($H: any): any {
    if (!p) return $H;
    let wH = qH.length > 0,
      jH = wH ? Buffer.concat([qH, $H]) : $H;
    if (wH) qH = ro;
    if (U) {
      let hH = jH.lastIndexOf(b),
        PH = jH.lastIndexOf(x);
      if (hH !== PH) F = hH > PH;
    }
    let MH = jH.indexOf(b);
    if (MH < 0) {
      let hH = sharedSuffixPrefixLength(jH, b);
      if (hH === 0) return jH;
      return qH = Buffer.from(jH.subarray(jH.length - hH)), jH.subarray(0, jH.length - hH);
    }
    let TH = [],
      XH = 0,
      JH = MH;
    for (;;) {
      if (JH > XH) TH.push(jH.subarray(XH, JH));
      if (XH = JH + b.length, JH = jH.indexOf(b, XH), JH < 0) break;
    }
    let YH = jH.subarray(XH),
      fH = sharedSuffixPrefixLength(YH, b);
    if (fH > 0) qH = Buffer.from(YH.subarray(YH.length - fH));
    if (YH.length > fH) TH.push(YH.subarray(0, YH.length - fH));
    if (TH.length === 0) return ro;
    if (TH.length === 1) return TH[0];
    return Buffer.concat(TH);
  }
  function _H($H: any): any {
    let wH = KH.length > 0,
      jH = wH ? Buffer.concat([KH, $H]) : $H;
    if (wH) KH = ro;
    let MH = jH.indexOf(XU_);
    if (MH < 0) {
      let YH = sharedSuffixPrefixLength(jH, XU_);
      if (YH === 0) return jH;
      return KH = Buffer.from(jH.subarray(jH.length - YH)), jH.subarray(0, jH.length - YH);
    }
    let TH = [],
      XH = 0,
      JH = MH;
    while (JH >= 0) {
      let YH = JH + XU_.length;
      if (YH >= jH.length) {
        if (JH > XH) TH.push(jH.subarray(XH, JH));
        KH = Buffer.from(jH.subarray(JH)), XH = jH.length;
        break;
      }
      let fH = jH[YH];
      if (fH === 104 || fH === 108) {
        if (JH > XH) TH.push(jH.subarray(XH, JH));
        XH = YH + 1;
      }
      JH = jH.indexOf(XU_, Math.max(XH, JH + 1));
    }
    if (XH < jH.length) {
      let YH = jH.subarray(XH),
        fH = sharedSuffixPrefixLength(YH, XU_);
      if (fH > 0) KH = Buffer.from(YH.subarray(YH.length - fH));
      if (YH.length > fH) TH.push(YH.subarray(0, YH.length - fH));
    }
    if (TH.length === 0) return ro;
    if (TH.length === 1) return TH[0];
    return Buffer.concat(TH);
  }
  function OH($H: any): any {
    K.write($H), v.feed($H.toString("latin1"), (wH: any): any => {
      if (wH === 1004 && C) K.write(C);
    }), X();
  }
  function AH($H: any): any {
    if (W) return;
    let wH = e.length > 0 ? Buffer.concat([e, $H]) : $H,
      jH = wH.indexOf(hZ4);
    if (jH >= 0) {
      let TH = wH.subarray(0, jH);
      if (jH > 0) {
        let XH = _H(zH(TH));
        if (XH.length > 0) OH(XH);
      }
      return e = ro, qH = ro, KH = ro, l("detached", xeK(TH));
    }
    let MH = sharedSuffixPrefixLength(wH, hZ4);
    if (wH.length > MH) {
      let TH = wH.subarray(0, wH.length - MH),
        XH = _H(zH(TH));
      if (XH.length > 0) OH(XH);
    }
    if (e = MH > 0 ? Buffer.from(wH.subarray(wH.length - MH)) : ro, U) clearTimeout(Q), Q = setTimeout((): any => {
      if (!W && F) K.write(Zv);
    }, gKT);
  }
  return d.on("data", ($H: any): any => {
    if (W) return;
    if (G) {
      AH($H);
      return;
    }
    a = Buffer.concat([a, $H]);
    let wH = a.indexOf(10);
    if (wH < 0) return;
    let jH = a.subarray(0, wH).toString("utf8"),
      MH = a.subarray(wH + 1),
      TH;
    try {
      TH = d_(jH);
    } catch (YH) {
      return l("error", `bad ack: ${GH(YH)}`);
    }
    if (!TH.ok) return l("error", `${TH.code}: ${TH.error}`);
    if (G = !0, d.setTimeout(0), f = Date.now() - w, j = TH.op === "attach" ? TH.via : void 0, J = TH.op === "attach" ? TH.tempo : void 0, D = TH.op === "attach" ? TH.state : void 0, process.env.TMUX && !kZ4) kZ4 = !0, B6("tmux", ["set", "-as", "terminal-features", ",*:RGB"]);
    let JH = ((TH.op === "attach" ? TH.decModes : void 0) ?? []).map(Tp).join("");
    if (v.feed(JH), K.write(_.alreadyInAlt ? zp + Ct() + JH : mXH() + JH + (p ? zp : "") + `
  \x1B[2mAttaching\u2026\x1B[0m
`), "ref" in q) q.ref();
    if ($L(q, !0), "on" in K) K.on("resize", n);
    if (q.on("readable", i), "resume" in q && "pause" in q) q.resume(), q.pause();
    if (q.once("end", t), i(), MH.length) AH(MH);
  }), d.on("error", ($H: any): any => l("error", GH($H))), d.once("close", (): any => {
    if (!W) l(G ? "disconnected" : "error", "control socket closed");
  }), d.once("connect", (): any => {
    d.write(bH({
      proto: JO,
      op: "attach",
      short: H,
      auth: A,
      cols: O,
      rows: T,
      attachId: Y,
      caps: buildAttachCapabilities(),
      ...(_.holdingFrame && {
        holdingFrame: !0
      })
    }) + `
`);
  }), Z;
}
/** Internal restored helper for telemetry/5100_promise.ts; behavior is preserved. */
function buildAttachCapabilities(): any {
  return {
    terminal: oH.terminal,
    mux: process.env.TMUX ? "tmux" : process.env.ZELLIJ != null ? "zellij" : process.env.STY ? "screen" : null,
    ssh: oH.isSSH(),
    wheelFlood: ny8(),
    hyperlinks: SW(),
    progressReporting: ASH(),
    wtSession: !!process.env.WT_SESSION,
    isVscodeTerm: process.env.TERM_PROGRAM === "vscode",
    browser: process.env.BROWSER ?? null,
    colorLevel: D_.level,
    syncOutput: HC(),
    editor: process.env.VISUAL?.trim() || process.env.EDITOR?.trim() || null
  };
}
var NZ4,
  VZ4,
  zXq = 2,
  yZ4 = 26,
  vZ4 = 100,
  uKT = 8,
  mKT,
  zc6,
  $c6,
  EZ4,
  SZ4,
  pKT = 3,
  BKT,
  UKT,
  hZ4,
  XU_,
  FKT = "\x1B[?9001l",
  gKT = 100,
  ro,
  kZ4 = !1;
var $Xq = L((): any => {
  K5();
  wP();
  Hv8();
  pXH();
  Yp();
  pJ();
  EN();
  tn();
  Jw();
  y_();
  _q();
  L_();
  l7();
  hSH();
  y9();
  bXH();
  H6();
  A1H();
  TXq();
  oV();
  iV();
  NZ4 = require("crypto"), VZ4 = require("net"), mKT = Buffer.from([127]), zc6 = Buffer.from("\x1B[98;5u", "latin1"), $c6 = Buffer.from("\x1B[27;5;98~", "latin1"), EZ4 = Buffer.from("\x1B[122;5u", "latin1"), SZ4 = Buffer.from("\x1B[27;5;122~", "latin1"), BKT = Buffer.from("\x1B[99;5u", "latin1"), UKT = Buffer.from("\x1B[27;5;99~", "latin1"), hZ4 = Buffer.from(Vc, "ascii"), XU_ = Buffer.from("\x1B[?9001", "ascii");
  ro = Buffer.alloc(0);
});

export {bufferMatchesAt as Fue,sharedSuffixPrefixLength as a5t,CZ4 as dOl,oo as MJ,buildAttachCapabilities as UAm,NZ4 as sOl,VZ4 as iOl,zXq as qxo,yZ4 as aOl,vZ4 as lOl,uKT as PAm,mKT as OAm,zc6 as $7n,$c6 as q7n,EZ4 as cOl,SZ4 as uOl,pKT as LAm,BKT as MAm,UKT as NAm,hZ4 as rOl,XU_ as i5t,FKT as BAm,gKT as FAm,ro as LJ,kZ4 as oOl,$Xq as jxo};
