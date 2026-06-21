// @ts-nocheck
import {uHl as ZX4,dHl as GX4} from "../../vendor/m5031.ts";
import {_o as Dq,bt as L_} from "../../vendor/m195.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {tge as BYH,G0n as PS6} from "../core/3320_environment_id.ts";
import {updateSettingsForSource as Yq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {_t as D_,cu as K5} from "../../vendor/m582.ts";
import {Jc as z3,vE as bP} from "../../vendor/m3837.ts";
import {Kn as n6,Li as L7} from "../../vendor/m2572.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {A7 as Z8H,mf as bz} from "../../vendor/m702.ts";
import {pr as X8,Yl as g4} from "../../vendor/m2562.ts";
import {Tn as G6,zs as E9} from "../../vendor/m2554.ts";
import {at as K_,rs as gq} from "../../vendor/m2546.ts";
import {lr as w8,readRoster as f1} from "../../vendor/m2547.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {dr as P8} from "../../vendor/m231.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Remote environment selection dialog and target picker.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function kX4(H: RestoredUnknown): RestoredUnknown {
  let _ = NDq.c(28),
    {
      onDone: q
    } = H,
    [K, O] = fwH.useState("loading"),
    T;
  if (_[0] === Symbol.for("react.memo_cache_sentinel")) T = [], _[0] = T;else T = _[0];
  let [z, $] = fwH.useState(T),
    [Y, A] = fwH.useState(null),
    [w, f] = fwH.useState(null),
    [j, J] = fwH.useState(null),
    [D, M] = fwH.useState(null),
    X,
    P;
  if (_[1] === Symbol.for("react.memo_cache_sentinel")) X = () => {
    let R = !1;
    return async function () {
      try {
        let E = await ZX4();
        if (R) return;
        $(E.availableTargets), A(E.selectedTarget), f(E.selectedTargetSource), J(E.environmentsError), O(null);
      } catch (E) {
        let v = E;
        if (R) return;
        let C = Dq(v);
        N(`Failed to fetch remote environments: ${C.message}`, {
          level: "error"
        }), M(C.message), O(null);
      }
    }(), () => {
      R = !0;
    };
  }, P = [], _[1] = X, _[2] = P;else X = _[1], P = _[2];
  fwH.useEffect(X, P);
  let Z;
  if (_[3] !== q || _[4] !== z) Z = function (h) {
    if (h === "cancel") {
      q();
      return;
    }
    O("updating");
    let y = z.find(v => BYH(v) === h);
    if (!y) {
      q("Error: Selected environment not found");
      return;
    }
    Yq("localSettings", {
      remote: {
        defaultEnvironmentId: BYH(y)
      }
    }), q(`Set default ${"remote environment"} to ${D_.bold(y.name)} (${BYH(y)})`);
  }, _[3] = q, _[4] = z, _[5] = Z;else Z = _[5];
  let W = Z;
  if (K === "loading") {
    let R;
    if (_[6] === Symbol.for("react.memo_cache_sentinel")) R = pT.createElement(z3, {
      message: "Loading environments\u2026"
    }), _[6] = R;else R = _[6];
    let h;
    if (_[7] !== q) h = pT.createElement(n6, {
      title: JQ6,
      onCancel: q,
      hideInputGuide: !0
    }, R), _[7] = q, _[8] = h;else h = _[8];
    return h;
  }
  if (D) {
    let R;
    if (_[9] !== D) R = pT.createElement(V, {
      color: "error"
    }, "Error: ", D), _[9] = D, _[10] = R;else R = _[10];
    let h;
    if (_[11] !== q || _[12] !== R) h = pT.createElement(n6, {
      title: JQ6,
      onCancel: q
    }, R), _[11] = q, _[12] = R, _[13] = h;else h = _[13];
    return h;
  }
  if (!Y) {
    let R;
    if (_[14] === Symbol.for("react.memo_cache_sentinel")) R = pT.createElement(V, null, "No remote environments available."), _[14] = R;else R = _[14];
    let h;
    if (_[15] !== j) h = j && pT.createElement(V, {
      dimColor: !0
    }, "(couldn't list environments: ", j, ")"), _[15] = j, _[16] = h;else h = _[16];
    let y;
    if (_[17] !== q || _[18] !== h) y = pT.createElement(n6, {
      title: JQ6,
      subtitle: hX4,
      onCancel: q
    }, R, h), _[17] = q, _[18] = h, _[19] = y;else y = _[19];
    return y;
  }
  let G;
  if (_[20] !== j || _[21] !== W || _[22] !== K || _[23] !== q || _[24] !== Y || _[25] !== w || _[26] !== z) G = pT.createElement(k6T, {
    targets: z,
    selectedTarget: Y,
    selectedTargetSource: w,
    environmentsError: j,
    loadingState: K,
    onSelect: W,
    onCancel: q
  }), _[20] = j, _[21] = W, _[22] = K, _[23] = q, _[24] = Y, _[25] = w, _[26] = z, _[27] = G;else G = _[27];
  return G;
}
function RX4(H: RestoredUnknown): RestoredUnknown {
  let _ = BYH(H),
    q = "";
  return {
    label: pT.createElement(V, null, H.name, " ", pT.createElement(V, {
      dimColor: !0
    }, "(", _, "", ")")),
    value: _
  };
}
function k6T(H: RestoredUnknown): RestoredUnknown {
  let _ = NDq.c(24),
    {
      targets: q,
      selectedTarget: K,
      selectedTargetSource: O,
      environmentsError: T,
      loadingState: z,
      onSelect: $,
      onCancel: Y
    } = H,
    A;
  if (_[0] !== O) A = O && O !== "localSettings" ? ` (from ${Z8H(O)} settings)` : "", _[0] = O, _[1] = A;else A = _[1];
  let w = A,
    f;
  if (_[2] !== K || _[3] !== O || _[4] !== w) f = O ? pT.createElement(V, null, "Currently using: ", pT.createElement(V, {
    bold: !0
  }, K.name), w) : void 0, _[2] = K, _[3] = O, _[4] = w, _[5] = f;else f = _[5];
  let j = f,
    J,
    D;
  if (_[6] !== q) {
    J = q.filter(N6T);
    let R = q.filter(PS6);
    D = [...J.map(RX4), ...[], ...R.map(RX4)], _[6] = q, _[7] = J, _[8] = D;
  } else J = _[7], D = _[8];
  let M = D,
    X;
  if (_[9] === Symbol.for("react.memo_cache_sentinel")) X = pT.createElement(V, {
    dimColor: !0
  }, hX4), _[9] = X;else X = _[9];
  let P;
  if (_[10] !== T || _[11] !== J) P = T && J.length === 0 && pT.createElement(V, {
    dimColor: !0
  }, "(couldn't list environments: ", T, ")"), _[10] = T, _[11] = J, _[12] = P;else P = _[12];
  let Z;
  if (_[13] !== z || _[14] !== $ || _[15] !== M || _[16] !== K) Z = z === "updating" ? pT.createElement(z3, {
    message: "Updating\u2026"
  }) : pT.createElement(X8, {
    options: M,
    defaultValue: BYH(K),
    onChange: $,
    onCancel: () => $("cancel"),
    layout: "compact-vertical"
  }), _[13] = z, _[14] = $, _[15] = M, _[16] = K, _[17] = Z;else Z = _[17];
  let W;
  if (_[18] === Symbol.for("react.memo_cache_sentinel")) W = pT.createElement(V, {
    dimColor: !0
  }, pT.createElement(G6, null, pT.createElement(K_, {
    chord: "enter",
    action: "select"
  }), pT.createElement(w8, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  }))), _[18] = W;else W = _[18];
  let G;
  if (_[19] !== Y || _[20] !== j || _[21] !== P || _[22] !== Z) G = pT.createElement(n6, {
    title: JQ6,
    subtitle: j,
    onCancel: Y,
    hideInputGuide: !0
  }, X, P, Z, W), _[19] = Y, _[20] = j, _[21] = P, _[22] = Z, _[23] = G;else G = _[23];
  return G;
}
function N6T(H: RestoredUnknown): RestoredUnknown {
  return !PS6(H);
}
var NDq,
  pT,
  fwH,
  JQ6 = "Select remote environment",
  hX4 = "Configure environments at: https://claude.ai/code";
var NX4 = L(() => {
  K5();
  nH();
  FH();
  L_();
  bz();
  N8();
  P8();
  GX4();
  f1();
  g4();
  E9();
  L7();
  gq();
  bP();
  NDq = u(__(), 1), pT = u(WH(), 1), fwH = u(WH(), 1);
});
export {kX4 as AHl,RX4 as pHl,k6T as hum,N6T as gum,NDq as rRo,pT as Vm,fwH as Hye,JQ6 as zVn,hX4 as fHl,NX4 as hHl};
