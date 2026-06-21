// @ts-nocheck
import {truncateToWidth as U9,EH as HN} from "../../vendor/m237.ts";
import {zd as n5,dr as P8} from "../../vendor/m231.ts";
import {mt as J_,bo as Zq,configProtoStore as wq} from "../../vendor/m2458.ts";
import {xx as $0,$P as vk} from "../../vendor/m4515.ts";
import {useInterval as B1} from "../../vendor/m2446.ts";
import {NG as SE,kue as m_H} from "../agent/4859_evictAfter.ts";
import {ic as n4,Ny as Zf} from "../../vendor/m2574.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {formatDuration as p7,formatNumber as w1,ps as H9} from "../../vendor/m238.ts";
import {et as aH,Ai as q7} from "../../vendor/m2208.ts";
import {Wts as Xoq,sl as J4} from "../../vendor/m715.ts";
import {Bs as z9,rA as Dz} from "../../vendor/m2550.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/*
 * tui/4939_onExit.tsx - React/Ink terminal UI restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
function xeO(H: any): any {
  return H.type === "local_agent" && H.agentType !== "main-session" && H.status !== "completed" && H.status !== "failed" && H.status !== "killed";
}
// FIXME: unverified name
function ueO(H: any): any {
  return H.type === "local_agent" && H.agentType !== "main-session" && (H.status === "completed" || H.status === "failed" || H.status === "killed");
}
// FIXME: unverified name
function meO(H: any): any {
  let _ = H.result?.content?.[0]?.text ?? H.error ?? H.description;
  return U9(n5(_), 60);
}
// FIXME: unverified name
function IJ4(H: any): any {
  let _ = cg6.c(47),
    {
      onExit: q
    } = H,
    K = J_(geO),
    O = J_(FeO),
    T = Zq(),
    {
      headerFocused: z,
      focusHeader: $
    } = $0(),
    [Y, A] = EB_.useState(),
    [, w] = EB_.useState(0),
    f;
  if (_[0] !== O) {
    f = new Map();
    for (let [x, U] of O) f.set(U, x);
    _[0] = O, _[1] = f;
  } else f = _[1];
  let j = f,
    J;
  if (_[2] !== K) J = Object.values(K).filter(xeO).sort(UeO), _[2] = K, _[3] = J;else J = _[3];
  let D = J,
    M;
  if (_[4] !== K) M = Object.values(K).filter(ueO).sort(BeO).slice(0, 5), _[4] = K, _[5] = M;else M = _[5];
  let X = M,
    P;
  if (_[6] !== X || _[7] !== D) P = [...D, ...X], _[6] = X, _[7] = D, _[8] = P;else P = _[8];
  let Z = P,
    W;
  if (_[9] !== w) W = (): any => w(peO), _[9] = w, _[10] = W;else W = _[10];
  B1(W, D.length > 0 ? 1000 : null);
  let G = Z.findIndex((x: any): any => x.id === Y),
    R = G >= 0 ? Z[G] : Y === void 0 ? Z[0] : void 0,
    h,
    y;
  if (_[11] !== R || _[12] !== Y) h = (): any => {
    if (R && R.id !== Y) A(R.id);
  }, y = [R, Y], _[11] = R, _[12] = Y, _[13] = h, _[14] = y;else h = _[13], y = _[14];
  EB_.useEffect(h, y);
  let E;
  if (_[15] !== Z || _[16] !== $ || _[17] !== z || _[18] !== q || _[19] !== R || _[20] !== Y || _[21] !== G || _[22] !== T) E = (x: any): any => {
    if (z) return;
    if (Y !== void 0 && G < 0) {
      if (x.key === "up" || x.key === "down") x.preventDefault(), A(Z[0]?.id);
      return;
    }
    let U = G < 0 ? 0 : G;
    if (x.key === "up") {
      if (x.preventDefault(), U === 0 || Z.length === 0) $();else A(Z[U - 1]?.id);
      return;
    }
    if (x.key === "down") {
      x.preventDefault(), A(Z[Math.min(U + 1, Z.length - 1)]?.id);
      return;
    }
    if (!R) return;
    if (x.key === "return") {
      x.preventDefault(), SE(R.id, T), q();
      return;
    }
    if (x.key === "x" && !x.ctrl && !x.meta && !x.superKey && R.status === "running") x.preventDefault(), R.abortController?.abort();
  }, _[15] = Z, _[16] = $, _[17] = z, _[18] = q, _[19] = R, _[20] = Y, _[21] = G, _[22] = T, _[23] = E;else E = _[23];
  let v = E,
    C = !z,
    S;
  if (_[24] !== Z.length) S = Z.length === 0 && u3.createElement(n4, null, "No subagents are currently running."), _[24] = Z.length, _[25] = S;else S = _[25];
  let I;
  if (_[26] !== z || _[27] !== j || _[28] !== D || _[29] !== R?.id) {
    let x;
    if (_[31] !== z || _[32] !== j || _[33] !== R?.id) x = (U: any): any => u3.createElement(QeO, {
      key: U.id,
      task: U,
      isSelected: U.id === R?.id && !z,
      name: j.get(U.id)
    }), _[31] = z, _[32] = j, _[33] = R?.id, _[34] = x;else x = _[34];
    I = D.map(x), _[26] = z, _[27] = j, _[28] = D, _[29] = R?.id, _[30] = I;
  } else I = _[30];
  let p;
  if (_[35] !== X || _[36] !== z || _[37] !== j || _[38] !== D.length || _[39] !== R?.id) p = X.length > 0 && u3.createElement(u3.Fragment, null, u3.createElement(B, {
    marginTop: D.length > 0 ? 1 : 0
  }, u3.createElement(V, {
    bold: !0,
    dimColor: !0
  }, "Recently completed")), X.map((x: any): any => u3.createElement(ceO, {
    key: x.id,
    task: x,
    isSelected: x.id === R?.id && !z,
    name: j.get(x.id)
  }))), _[35] = X, _[36] = z, _[37] = j, _[38] = D.length, _[39] = R?.id, _[40] = p;else p = _[40];
  let b;
  if (_[41] !== v || _[42] !== I || _[43] !== p || _[44] !== C || _[45] !== S) b = u3.createElement(B, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: C,
    onKeyDown: v
  }, S, I, p), _[41] = v, _[42] = I, _[43] = p, _[44] = C, _[45] = S, _[46] = b;else b = _[46];
  return b;
}
// FIXME: unverified name
function peO(H: any): any {
  return H + 1;
}
// FIXME: unverified name
function BeO(H: any, _: any): any {
  return (_.endTime ?? 0) - (H.endTime ?? 0);
}
// FIXME: unverified name
function UeO(H: any, _: any): any {
  return H.startTime - _.startTime;
}
// FIXME: unverified name
function FeO(H: any): any {
  return H.agentNameRegistry;
}
// FIXME: unverified name
function geO(H: any): any {
  return H.tasks;
}
// FIXME: unverified name
function QeO(H: any): any {
  let _ = cg6.c(30),
    {
      task: q,
      isSelected: K,
      name: O
    } = H,
    T = q.progress?.summary || q.description,
    z;
  if (_[0] !== T) z = U9(T, 50), _[0] = T, _[1] = z;else z = _[1];
  let $ = z,
    Y = Math.max(0, Date.now() - q.startTime - (q.totalPausedMs ?? 0)),
    A;
  if (_[2] !== Y) A = p7(Y), _[2] = Y, _[3] = A;else A = _[3];
  let w = A,
    f = q.progress?.tokenCount,
    j = K ? "suggestion" : void 0,
    J = K ? "selected, running:" : "running:",
    D = K ? `${aH.pointer} ` : "  ",
    M;
  if (_[4] === Symbol.for("react.memo_cache_sentinel")) M = u3.createElement(V, {
    color: "success"
  }, Xoq), _[4] = M;else M = _[4];
  let X;
  if (_[5] !== J || _[6] !== D) X = u3.createElement(V, {
    "aria-label": J
  }, D, M), _[5] = J, _[6] = D, _[7] = X;else X = _[7];
  let P = O || q.agentType,
    Z;
  if (_[8] !== P) Z = u3.createElement(V, {
    bold: !0
  }, P), _[8] = P, _[9] = Z;else Z = _[9];
  let W;
  if (_[10] !== O || _[11] !== q.agentType) W = O && u3.createElement(V, {
    dimColor: !0
  }, " \xB7 ", q.agentType), _[10] = O, _[11] = q.agentType, _[12] = W;else W = _[12];
  let G;
  if (_[13] !== $) G = u3.createElement(V, {
    dimColor: !0
  }, " \xB7 ", $), _[13] = $, _[14] = G;else G = _[14];
  let R;
  if (_[15] !== w) R = u3.createElement(V, {
    dimColor: !0
  }, " \xB7 ", w), _[15] = w, _[16] = R;else R = _[16];
  let h;
  if (_[17] !== f) h = f !== void 0 && f > 0 && u3.createElement(V, {
    dimColor: !0
  }, " \xB7 ", w1(f), " tokens"), _[17] = f, _[18] = h;else h = _[18];
  let y;
  if (_[19] !== K) y = K && u3.createElement(V, {
    dimColor: !0
  }, " \xB7 x to stop"), _[19] = K, _[20] = y;else y = _[20];
  let E;
  if (_[21] !== Z || _[22] !== W || _[23] !== G || _[24] !== R || _[25] !== h || _[26] !== y || _[27] !== j || _[28] !== X) E = u3.createElement(B, null, u3.createElement(V, {
    color: j
  }, X, " ", Z, W, G, R, h, y)), _[21] = Z, _[22] = W, _[23] = G, _[24] = R, _[25] = h, _[26] = y, _[27] = j, _[28] = X, _[29] = E;else E = _[29];
  return E;
}
// FIXME: unverified name
function ceO(H: any): any {
  let _ = cg6.c(18),
    {
      task: q,
      isSelected: K,
      name: O
    } = H,
    T = K ? "suggestion" : void 0,
    z = !K,
    $ = K ? "selected, " : "",
    Y = K ? `${aH.pointer} ` : "  ",
    A;
  if (_[0] !== $ || _[1] !== Y) A = u3.createElement(V, {
    "aria-label": $
  }, Y), _[0] = $, _[1] = Y, _[2] = A;else A = _[2];
  let w = q.status === "completed" ? "success" : "error",
    f;
  if (_[3] !== w) f = u3.createElement(z9, {
    status: w,
    withSpace: !0
  }), _[3] = w, _[4] = f;else f = _[4];
  let j = O || q.agentType,
    J;
  if (_[5] !== j) J = u3.createElement(V, {
    bold: !0
  }, j), _[5] = j, _[6] = J;else J = _[6];
  let D;
  if (_[7] !== q) D = meO(q), _[7] = q, _[8] = D;else D = _[8];
  let M;
  if (_[9] !== D) M = u3.createElement(V, {
    dimColor: !0
  }, " \xB7 ", D), _[9] = D, _[10] = M;else M = _[10];
  let X;
  if (_[11] !== T || _[12] !== M || _[13] !== z || _[14] !== A || _[15] !== f || _[16] !== J) X = u3.createElement(B, null, u3.createElement(V, {
    color: T,
    dimColor: z
  }, A, f, J, M)), _[11] = T, _[12] = M, _[13] = z, _[14] = A, _[15] = f, _[16] = J, _[17] = X;else X = _[17];
  return X;
}
var cg6, u3, EB_;
var xJ4 = L((): any => {
  q7();
  J4();
  nH();
  wq();
  m_H();
  H9();
  P8();
  HN();
  Zf();
  Dz();
  vk();
  cg6 = u(__(), 1), u3 = u(WH(), 1), EB_ = u(WH(), 1);
});
export {xeO as Oam,ueO as Lam,meO as Mam,IJ4 as PRl,peO as Nam,BeO as Bam,UeO as Fam,FeO as Uam,geO as $am,QeO as qam,ceO as jam,cg6 as wVn,u3 as qd,EB_ as y8t,xJ4 as ORl};
