// @ts-nocheck
import {vte as te,FY as TKH} from "../permissions/3921_toolName.ts";
import {kwl as Ej4,pft as AO_} from "../../vendor/m4940.ts";
import {Dge as VYH,K0 as dG} from "../../vendor/m3824.ts";
import {Or as S8,Ts as w9} from "../../vendor/m2542.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {cFn as PZ6,sce as KKH} from "../permissions/3874_permissionMode.ts";
import {vyn as F$6,uZ as Dt} from "../config/2245_displayName.ts";
import {Ab as zj,Rte as Lr} from "../../vendor/m3925.ts";
import {isBuiltInAgent as sA,scrubPathsConfig as tA} from "../permissions/4454_toAgentInfos.ts";
import {l_ as dA,dU as mC} from "../../vendor/m3932.ts";
import {et as aH,Ai as q7} from "../../vendor/m2208.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Semantic restoration for tui/4917_agent.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

// FIXME: unverified name
/** Internal restored helper for tui/4917_agent.ts; behavior is preserved. */
function xj4(H: any): any {
  let _ = GJq.c(48),
    {
      agent: q,
      tools: K,
      onBack: O
    } = H,
    T;
  if (_[0] !== q || _[1] !== K) T = te(q, K, !1), _[0] = q, _[1] = K, _[2] = T;else T = _[2];
  let z = T,
    $;
  if (_[3] !== q) $ = Ej4(q), _[3] = q, _[4] = $;else $ = _[4];
  let Y = $,
    A;
  if (_[5] !== q.agentType) A = VYH(q.agentType), _[5] = q.agentType, _[6] = A;else A = _[6];
  let w = A,
    f;
  if (_[7] === Symbol.for("react.memo_cache_sentinel")) f = {
    context: "Confirmation"
  }, _[7] = f;else f = _[7];
  S8("confirm:no", O, f);
  let j;
  if (_[8] !== O) j = (p: any): any => {
    if (p.key === "return") p.preventDefault(), O();
  }, _[8] = O, _[9] = j;else j = _[9];
  let J = j,
    D;
  if (_[10] !== Y) D = IK.createElement(V, {
    dimColor: !0
  }, Y), _[10] = Y, _[11] = D;else D = _[11];
  let M;
  if (_[12] === Symbol.for("react.memo_cache_sentinel")) M = IK.createElement(V, null, IK.createElement(V, {
    bold: !0
  }, "Description"), " (tells Claude when to use this agent):"), _[12] = M;else M = _[12];
  let X;
  if (_[13] !== q.whenToUse) X = IK.createElement(B, {
    flexDirection: "column"
  }, M, IK.createElement(B, {
    marginLeft: 2
  }, IK.createElement(V, null, q.whenToUse))), _[13] = q.whenToUse, _[14] = X;else X = _[14];
  let P;
  if (_[15] === Symbol.for("react.memo_cache_sentinel")) P = IK.createElement(V, null, IK.createElement(V, {
    bold: !0
  }, "Tools"), ":", " "), _[15] = P;else P = _[15];
  let Z;
  if (_[16] !== z) Z = IK.createElement(B, null, P, IK.createElement(ResolvedToolsList, {
    resolvedTools: z
  })), _[16] = z, _[17] = Z;else Z = _[17];
  let W;
  if (_[18] === Symbol.for("react.memo_cache_sentinel")) W = IK.createElement(V, {
    bold: !0
  }, "Model"), _[18] = W;else W = _[18];
  let G;
  if (_[19] !== q.model) G = PZ6(q.model), _[19] = q.model, _[20] = G;else G = _[20];
  let R;
  if (_[21] !== G) R = IK.createElement(V, null, W, ": ", G), _[21] = G, _[22] = R;else R = _[22];
  let h;
  if (_[23] !== q.permissionMode) h = q.permissionMode && IK.createElement(V, null, IK.createElement(V, {
    bold: !0
  }, "Permission mode"), ": ", q.permissionMode), _[23] = q.permissionMode, _[24] = h;else h = _[24];
  let y;
  if (_[25] !== q.memory) y = q.memory && IK.createElement(V, null, IK.createElement(V, {
    bold: !0
  }, "Memory"), ": ", F$6(q.memory)), _[25] = q.memory, _[26] = y;else y = _[26];
  let E;
  if (_[27] !== q.hooks) E = q.hooks && Object.keys(q.hooks).length > 0 && IK.createElement(V, null, IK.createElement(V, {
    bold: !0
  }, "Hooks"), ": ", Object.keys(q.hooks).join(", ")), _[27] = q.hooks, _[28] = E;else E = _[28];
  let v;
  if (_[29] !== q.skills) v = q.skills && q.skills.length > 0 && IK.createElement(V, null, IK.createElement(V, {
    bold: !0
  }, "Skills"), ":", " ", q.skills.length > 10 ? `${q.skills.length} skills` : q.skills.join(", ")), _[29] = q.skills, _[30] = v;else v = _[30];
  let C;
  if (_[31] !== q.agentType || _[32] !== w) C = w && IK.createElement(B, null, IK.createElement(V, null, IK.createElement(V, {
    bold: !0
  }, "Color"), ":", " ", IK.createElement(zj, {
    color: w,
    padded: !0
  }, q.agentType))), _[31] = q.agentType, _[32] = w, _[33] = C;else C = _[33];
  let S;
  if (_[34] !== q) S = !sA(q) && IK.createElement(IK.Fragment, null, IK.createElement(B, null, IK.createElement(V, null, IK.createElement(V, {
    bold: !0
  }, "System prompt"), ":")), IK.createElement(B, {
    marginLeft: 2,
    marginRight: 2
  }, IK.createElement(dA, null, q.getSystemPrompt()))), _[34] = q, _[35] = S;else S = _[35];
  let I;
  if (_[36] !== J || _[37] !== Z || _[38] !== R || _[39] !== h || _[40] !== y || _[41] !== E || _[42] !== v || _[43] !== C || _[44] !== S || _[45] !== D || _[46] !== X) I = IK.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: J
  }, D, X, Z, R, h, y, E, v, C, S), _[36] = J, _[37] = Z, _[38] = R, _[39] = h, _[40] = y, _[41] = E, _[42] = v, _[43] = C, _[44] = S, _[45] = D, _[46] = X, _[47] = I;else I = _[47];
  return I;
}
/** Internal restored helper for tui/4917_agent.ts; behavior is preserved. */
function ResolvedToolsList(H: any): any {
  let _ = GJq.c(12),
    {
      resolvedTools: q
    } = H;
  if (q.hasWildcard) {
    let w;
    if (_[0] === Symbol.for("react.memo_cache_sentinel")) w = IK.createElement(V, null, "All tools"), _[0] = w;else w = _[0];
    return w;
  }
  let {
    validTools: K,
    unavailableTools: O,
    invalidTools: T
  } = q;
  if (K.length === 0 && O.length === 0 && T.length === 0) {
    let w;
    if (_[1] === Symbol.for("react.memo_cache_sentinel")) w = IK.createElement(V, null, "None"), _[1] = w;else w = _[1];
    return w;
  }
  let z;
  if (_[2] !== K) z = K.length > 0 && IK.createElement(V, null, K.join(", ")), _[2] = K, _[3] = z;else z = _[3];
  let $;
  if (_[4] !== O) $ = O.length > 0 && IK.createElement(V, {
    color: "warning"
  }, aH.warning, " Not available to subagents:", " ", O.join(", ")), _[4] = O, _[5] = $;else $ = _[5];
  let Y;
  if (_[6] !== T) Y = T.length > 0 && IK.createElement(V, {
    color: "warning"
  }, aH.warning, " Unrecognized: ", T.join(", ")), _[6] = T, _[7] = Y;else Y = _[7];
  let A;
  if (_[8] !== z || _[9] !== $ || _[10] !== Y) A = IK.createElement(B, {
    flexDirection: "column"
  }, z, $, Y), _[8] = z, _[9] = $, _[10] = Y, _[11] = A;else A = _[11];
  return A;
}
var GJq, IK;
var uj4 = L((): any => {
  q7();
  nH();
  w9();
  dG();
  Dt();
  TKH();
  tA();
  KKH();
  Lr();
  mC();
  AO_();
  GJq = u(__(), 1), IK = u(WH(), 1);
});

export {xj4 as Owl,ResolvedToolsList as cam,GJq as swo,IK as $a,uj4 as Lwl};
