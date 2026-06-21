// @ts-nocheck
import {Le as bH,qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {Cp as JO,rM as iV} from "../../vendor/m4493.ts";
import {s5n as VB6,MTo as zYq} from "../../vendor/m4580.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {b as L} from "../../runtime.ts";
/**
 * Supervisor socket connector for background rendezvous.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function gk4(H: RestoredUnknown, _: RestoredUnknown, q: RestoredUnknown, K: RestoredUnknown, O: RestoredUnknown): RestoredUnknown {
  let T,
    z = !1,
    $ = 0,
    Y = !1,
    A;
  function w(): RestoredUnknown {
    if (z) return;
    let j = new Fk4.Socket(),
      J = !1;
    j.on("error", () => f()), j.once("close", () => {
      if (T === j) T = void 0;
      if (z) return;
      if (J) q();
      f();
    }), j.once("connect", () => {
      J = !0, $ = 0, Y = !1, T = j, j.write(bH({
        proto: JO,
        role: "supervisor",
        supervisorPid: process.pid,
        auth: O
      }) + `
`), K?.(), VB6(j, D => {
        let M;
        try {
          M = d_(D);
        } catch {
          return;
        }
        if (M && typeof M === "object" && "type" in M) _(M);
      });
    }), j.connect(H);
  }
  function f(): RestoredUnknown {
    if (z || A || Y) return;
    if ($ >= Uk4) {
      Y = !0, N(`[bg-rv] ${H}: ${$} connect attempts failed \u2014 giving up (pid-poll is liveness backstop)`, {
        level: "warn"
      }), c("tengu_bg_rv_connect_exhausted", {
        attempts: $
      });
      return;
    }
    let j = Bk4[Math.min($, Bk4.length - 1)];
    $++, A = setTimeout(() => {
      A = void 0, w();
    }, j), A.unref();
  }
  return w(), {
    send(j) {
      if (!T || T.destroyed) {
        if ($ >= Uk4) $ = 0, Y = !1, f();
        return !1;
      }
      try {
        return T.write(bH(j) + `
`), !0;
      } catch (J) {
        return N(`[bg-rv] send failed: ${String(J)}`), !1;
      }
    },
    close() {
      if (z = !0, A) clearTimeout(A);
      T?.destroy(), T = void 0;
    }
  };
}
var Fk4,
  Bk4,
  Uk4 = 30;
var Qk4 = L(() => {
  y_();
  FH();
  H6();
  zYq();
  iV();
  Fk4 = require("net"), Bk4 = [100, 250, 500, 1000, 2000];
});
export {gk4 as TUl,Fk4 as yUl,Bk4 as gUl,Uk4 as _Ul,Qk4 as SUl};
