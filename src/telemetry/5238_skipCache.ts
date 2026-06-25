// @ts-nocheck
import {Ni as TK} from "../../vendor/m127.ts";
import {getProcessStartTimeAsync as xS,sigtermThenKill as ZyH,getProcessStartTime as wOH,isSameProcess as eM_,lE as UD} from "../../vendor/m1461.ts";
import {Nft as g5_,N8e as GBH,gx as yk,RVn as xp6,b8t as Dm_,F8e as RBH} from "../../vendor/m4514.ts";
import {U1 as XE,x0e as DGH} from "../config/3883_x0e.ts";
import {Tx as lL,lP as bk,CL as oV} from "../../vendor/m4609.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Le as tH} from "../../vendor/m5.ts";
import {NG as Vc,bL as iV} from "../../vendor/m4515.ts";
import {cn as L6,Ct as L_} from "../../vendor/m197.ts";
import {Yt as t_,Es as y9} from "../../vendor/m641.ts";
import {b as L} from "../../runtime.ts";
import {ig as Ow} from "../../vendor/m130.ts";
// FIXME: unverified name: Ud6
/* Adopts or reconnects to a background PTY host socket. */
/* Restored Claude Code 2.1.177 module: Background PTY host adoption and telemetry..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function Ud6(H: any, _: any, q: any, K: any, O: any, T: any): any {
  let z = TK(),
    $ = TK(),
    Y,
    A = new mk4.StringDecoder("utf8"),
    w,
    f = !1,
    j = !1,
    J = 0,
    D = 0,
    M,
    X,
    P,
    Z,
    W = 0,
    G,
    R = !1,
    h = !1,
    y = !1,
    E = "",
    v = !1,
    C = q;
  if (C === void 0) xS(_, {
    skipCache: !0
  }).then((l: any): any => {
    C = l;
  });
  let S = [],
    I = 0;
  // FIXME: unverified name: p
  function p(l: any): any {
    if (w) {
      if (w.destroyed) return !1;
      if (!w.write(l)) {
        if (!P) P = setTimeout((): any => {
          P = void 0, w?.destroy();
        }, JTT), P.unref();
        if (!Z && w.writableLength > xk4) Z = setTimeout((): any => {
          if (Z = void 0, w && !w.destroyed && w.writableLength > xk4) b(), w.destroy();
        }, DTT), Z.unref();
      }
      return !0;
    }
    if (I < 2 * g5_) S.push(l), I += l.length;
    return !1;
  }
  // FIXME: unverified name: b
  function b(): any {
    if (P) clearTimeout(P), P = void 0;
    if (Z) clearTimeout(Z), Z = void 0;
  }
  // FIXME: unverified name: x
  function x(l: any, n: any): any {
    if (j) return;
    if (j = !0, f = !0, X) clearTimeout(X), X = void 0;
    b(), w?.destroy(), w = void 0;
    let o = A.end();
    if (o) z.emit(o);
    $.emit({
      exitCode: l,
      signal: n
    });
  }
  // FIXME: unverified name: U
  function U(l: any): any {
    if (XE(lL(H), 1048576).then((n: any): any => n ?? "").then((n: any): any => {
      let o = n.slice(0, 2000).trim();
      if (o.length > 0) N(`[bg-pty] host crash: ${o}`, {
        level: "warn"
      });
      let i = [...o.matchAll(/\bE[A-Z]{2,14}\b/g)].find((t: any): any => !"/\\".includes(o[t.index - 1] ?? "."))?.[0];
      c("tengu_bg_ptyhost_crash", {
        hadBreadcrumb: o.length > 0,
        hadHello: R,
        via: tH(l),
        short: K,
        ...(i && {
          stderr_errno: i
        })
      });
    }), ZyH(W ? [-_, W] : [-_], l !== "hung" ? void 0 : C), O) {
      O.exited.then((n: any): any => x(n, O.signalCode ?? void 0), (): any => x(-1)), setTimeout(x, 1000, -1).unref();
      return;
    }
    x(-1);
  }
  // FIXME: unverified name: F
  function F(l: any): any {
    if (l.kind === GBH) {
      if (!h) {
        let n = A.write(l.payload);
        if (y) z.emit(n);else if (n.length > 0) {
          let o = (E + n).replaceAll(Vc, ""),
            i = getTrailingMarkerPrefixLength(o);
          E = i > 0 ? o.slice(o.length - i) : "";
          let t = i > 0 ? o.slice(0, o.length - i) : o;
          if (t.length > 0) z.emit(t);
        }
      }
    } else if (l.ctrl.t === "hello") {
      if (R) h = !0, A.end(), E = "";else OF_.unlink(bk(H)).catch((): any => {});
      R = !0, W = l.ctrl.replPid, G = l.ctrl.version;
    } else if (l.ctrl.t === "live") {
      if (!y) {
        if (y = !0, E.length > 0) z.emit(E), E = "";
      }
      if (h) h = !1, Y?.();
    } else if (l.ctrl.t === "exit") x(l.ctrl.code, l.ctrl.signal);else if (l.ctrl.t === "ping") p(yk({
      t: "pong"
    }));else if (l.ctrl.t === "auth-required") N(`[bg-pty] ${K ?? H}: host dropped input \u2014 DATA auth token missing or stale (version skew; respawn the worker to re-key)`, {
      level: "warn"
    });
  }
  // FIXME: unverified name: Q
  function Q(): any {
    if (f) return;
    let l = new uk4.Socket(),
      n = !1;
    l.on("error", (o: any): any => {
      v = L6(o) === "ENOENT", d();
    }), l.once("close", (): any => {
      if (w === l) w = void 0, b();
      if (f) return;
      if (n && !j) {
        try {
          process.kill(_, 0), N("[bg-pty] dropped by host; reconnecting", {
            level: "debug"
          }), D = jTT, J = 0, d();
          return;
        } catch {}
        U("close");
        return;
      }
      d();
    }), l.once("connect", (): any => {
      if (n = !0, J = 0, D = 0, w = l, l.on("drain", b), OF_.unlink(lL(H)).catch((): any => {}), p(yk({
        t: "pong"
      })), T) p(yk({
        t: "auth",
        token: T
      }));
      for (let i of S.splice(0)) p(i);
      I = 0;
      let o = xp6(F, (i: any): any => {
        N(`[bg-pty] frame error: ${i}`, {
          level: "warn"
        }), l.destroy();
      });
      l.on("data", o);
    }), l.connect(H);
  }
  // FIXME: unverified name: d
  function d(): any {
    if (f || M) return;
    try {
      process.kill(_, 0);
    } catch {
      f = !0, XE(bk(H), 8388608).then((n: any): any => n ?? "").then((n: any): any => {
        if (!R && n.length > 0) z.emit(n.replaceAll(Vc, ""));
        OF_.unlink(bk(H)).catch((): any => {}), U("connect");
      });
      return;
    }
    if (D > 0 && --D === 0) {
      U("hung");
      return;
    }
    if (q !== void 0 && v && J >= 3) N(`[bg-pty] ${H}: ENOENT on adopt \u2014 sock file externally deleted; respawning`, {
      level: "warn"
    }), c("tengu_bg_adopt_sock_unlinked", {}), J = Ik4;
    if (J >= Ik4) {
      N(`[bg-pty] ${H}: ${J} connect attempts failed; treating host as dead`, {
        level: "warn"
      });
      let n = C && wOH(_);
      if (!C || !n || C === n) try {
        process.kill(-_, "SIGKILL");
      } catch {
        try {
          process.kill(_, "SIGKILL");
        } catch {}
      }
      f = !0, XE(bk(H), 8388608).then((o: any): any => o ?? "").then((o: any): any => {
        if (!R && o.length > 0) z.emit(o.replaceAll(Vc, ""));
        if (OF_.unlink(bk(H)).catch((): any => {}), O) O.exited.then((i: any): any => x(i, O.signalCode ?? void 0), (): any => x(-1)), setTimeout(x, 1000, -1).unref();else x(-1);
      });
      return;
    }
    let l = bk4[Math.min(J, bk4.length - 1)];
    J++, M = setTimeout((): any => {
      M = void 0, Q();
    }, l), M.unref();
  }
  return Q(), {
    pid: _,
    replPid: (): any => W,
    replVersion: (): any => G,
    onResume: (l: any): any => {
      Y = l;
    },
    write: (l: any): any => {
      if (j) return;
      let n = Buffer.from(l, "utf8"),
        o = g5_ - 1;
      for (let i = 0; i < n.length; i += o) p(Dm_(n.subarray(i, i + o)));
    },
    resize: (l: any, n: any): any => p(yk({
      t: "resize",
      cols: l,
      rows: n
    })),
    kill: (l: any): any => {
      let n = l === "SIGKILL" ? "SIGKILL" : "SIGTERM",
        o = p(yk({
          t: "kill",
          sig: n
        }));
      if (t_() === "windows" && n === "SIGTERM" && o) {
        if (X) clearTimeout(X);
        X = setTimeout((i: any, t: any): any => {
          if (!eM_(i, C)) {
            t(-1);
            return;
          }
          try {
            process.kill(i, "SIGKILL");
          } catch {
            t(-1);
          }
        }, 5000, _, x), X.unref();
        return;
      }
      try {
        process.kill(-_, n);
      } catch {
        try {
          process.kill(_, n);
        } catch {
          x(-1);
        }
      }
      if (n === "SIGTERM" && !j) {
        if (X) clearTimeout(X);
        X = setTimeout((i: any, t: any): any => {
          if (!eM_(i, C)) {
            t(-1);
            return;
          }
          try {
            process.kill(-i, "SIGKILL");
          } catch {
            try {
              process.kill(i, "SIGKILL");
            } catch {
              t(-1);
            }
          }
        }, 5000, _, x), X.unref();
      }
    },
    dispose: (): any => {
      if (f = !0, M) clearTimeout(M), M = void 0;
      if (X) clearTimeout(X), X = void 0;
      b(), w?.destroy(), w = void 0;
    },
    onData: (l: any): any => ({
      dispose: z.subscribe(l)
    }),
    onExit: (l: any): any => ({
      dispose: $.subscribe(l)
    })
  };
}
function getTrailingMarkerPrefixLength(H: any): any {
  let _ = Math.min(Vc.length - 1, H.length);
  for (let q = _; q > 0; q--) if (H.endsWith(Vc.slice(0, q))) return q;
  return 0;
}
var OF_,
  uk4,
  mk4,
  bk4,
  Ik4 = 30,
  jTT = 4,
  JTT = 1e4,
  xk4,
  DTT = 50;
var pk4 = L((): any => {
  y_();
  FH();
  L_();
  DGH();
  UD();
  y9();
  Ow();
  oV();
  iV();
  RBH();
  OF_ = require("fs/promises"), uk4 = require("net"), mk4 = require("string_decoder"), bk4 = [50, 100, 250, 500, 1000, 2000], xk4 = 8 * g5_;
});
export {Ud6 as YQn,getTrailingMarkerPrefixLength as EDm,OF_ as UKt,uk4 as r8l,mk4 as o8l,bk4 as e8l,Ik4 as t8l,jTT as TDm,JTT as SDm,xk4 as n8l,DTT as bDm,pk4 as s8l};
