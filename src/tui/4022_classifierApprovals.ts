// @ts-nocheck
import {useTheme as jK} from "../../vendor/m2274.ts";
import {mt as w_,Mc as n1,configProtoStore as Yq} from "../../vendor/m2458.ts";
import {Eve as dXH,Ri as N7} from "../tools/2227_userFacingName.ts";
import {Gn as r6,sc as l4} from "../../vendor/m2455.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {Box as p} from "../../vendor/m2422.ts";
import {iqe as nmH,OUn as LS6} from "../../vendor/m3968.ts";
import {LUn as hS6,cao as Kqq} from "../../vendor/m3969.ts";
import {b as L,M as x} from "../../runtime.ts";
import {ze as rH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as ZH} from "../../vendor/m2253.ts";
// @ts-nocheck
function wrapClassifierApprovalsUpdater(setState) {
  return innerSetter => setState(state => {
    let K = innerSetter(state.classifierApprovals);
    if (K === state.classifierApprovals) return state;
    return {
      ...state,
      classifierApprovals: K
    };
  });
}
function getInitialApprovalState(ctx, toolName) {
  return;
}
function setAutoModeApproval(ctx, toolName, approval) {
  if (!ctx) return;
  ctx(K => {
    let O = K.approvals.get(toolName);
    if (O?.classifier === "auto-mode" && O.reason === approval) return K;
    let T = new Map(K.approvals);
    return T.set(toolName, {
      classifier: "auto-mode",
      reason: approval
    }), {
      ...K,
      approvals: T
    };
  });
}
function getAutoModeReason(ctx, toolName) {
  let q = ctx.classifierApprovals.approvals.get(toolName);
  if (!q || q.classifier !== "auto-mode") return;
  return q.reason;
}
function markToolChecking(ctx, toolName) {
  if (!ctx) return;
  ctx(q => {
    if (q.checking.has(toolName)) return q;
    let K = new Set(q.checking);
    return K.add(toolName), {
      ...q,
      checking: K
    };
  });
}
function clearToolChecking(ctx, toolName) {
  if (!ctx) return;
  ctx(q => {
    if (!q.checking.has(toolName)) return q;
    let K = new Set(q.checking);
    return K.delete(toolName), {
      ...q,
      checking: K
    };
  });
}
function clearToolApproval(ctx, toolName) {
  if (!ctx) return;
  ctx(q => {
    if (!q.approvals.has(toolName)) return q;
    let K = new Map(q.approvals);
    return K.delete(toolName), {
      ...q,
      approvals: K
    };
  });
}
function clearAllApprovals(ctx) {
  if (!ctx) return;
  ctx(_ => {
    if (_.approvals.size === 0 && _.checking.size === 0) return _;
    return {
      approvals: new Map(),
      checking: new Set()
    };
  });
}
function ClassifierApprovalResult(props) {
  let _ = EkK.c(42),
    {
      message: q,
      lookups: K,
      toolUseID: O,
      progressMessagesForMessage: T,
      style: z,
      tool: $,
      tools: Y,
      verbose: A,
      width: w,
      isTranscriptMode: f
    } = props,
    [j] = jK(),
    J = w_(selectIsBriefOnly),
    D = n1(),
    M;
  if (_[0] !== D || _[1] !== O) M = () => getInitialApprovalState(D.getState(), O), _[0] = D, _[1] = O, _[2] = M;else M = _[2];
  let [X] = kb_.useState(M),
    P;
  if (_[3] !== D || _[4] !== O) P = () => getAutoModeReason(D.getState(), O), _[3] = D, _[4] = O, _[5] = P;else P = _[5];
  let [Z] = kb_.useState(P),
    W;
  if (_[6] !== D.setState || _[7] !== O) W = () => {
    clearToolApproval(wrapClassifierApprovalsUpdater(D.setState), O);
  }, _[6] = D.setState, _[7] = O, _[8] = W;else W = _[8];
  let G;
  if (_[9] !== D || _[10] !== O) G = [D, O], _[9] = D, _[10] = O, _[11] = G;else G = _[11];
  if (kb_.useEffect(W, G), !q.toolUseResult || !$) return null;
  if ($.isTransparentWrapper?.()) return null;
  let R, h;
  if (_[12] !== J || _[13] !== f || _[14] !== K || _[15] !== q.toolUseResult || _[16] !== T || _[17] !== z || _[18] !== j || _[19] !== $ || _[20] !== O || _[21] !== Y || _[22] !== A) {
    h = Symbol.for("react.early_return_sentinel");
    H: {
      let B = $.outputSchema?.safeParse(q.toolUseResult);
      if (B && !B.success) {
        h = null;
        break H;
      }
      let U = B?.data ?? q.toolUseResult;
      R = $.renderToolResultMessage?.(U, dXH(T), {
        style: z,
        theme: j,
        tools: Y,
        verbose: A,
        isTranscriptMode: f,
        isBriefOnly: J,
        input: K.toolUseByToolUseID.get(O)?.input
      }) ?? null;
    }
    _[12] = J, _[13] = f, _[14] = K, _[15] = q.toolUseResult, _[16] = T, _[17] = z, _[18] = j, _[19] = $, _[20] = O, _[21] = Y, _[22] = A, _[23] = R, _[24] = h;
  } else R = _[23], h = _[24];
  if (h !== Symbol.for("react.early_return_sentinel")) return h;
  let y = R;
  if (y === null) return null;
  let v = $.userFacingName(undefined) === "" ? undefined : w,
    C;
  if (_[25] !== X) C = null, _[25] = X, _[26] = C;else C = _[26];
  let S;
  if (_[27] !== Z) S = Z && Vc.createElement(r6, {
    height: 1
  }, Vc.createElement(V, {
    dimColor: true
  }, "Allowed by auto mode classifier")), _[27] = Z, _[28] = S;else S = _[28];
  let I;
  if (_[29] !== y || _[30] !== v || _[31] !== C || _[32] !== S) I = Vc.createElement(p, {
    flexDirection: "column",
    width: v
  }, y, C, S), _[29] = y, _[30] = v, _[31] = C, _[32] = S, _[33] = I;else I = _[33];
  let u;
  if (_[34] !== f || _[35] !== K || _[36] !== O || _[37] !== A) u = Vc.createElement(nmH, null, Vc.createElement(hS6, {
    hookEvent: "PostToolUse",
    lookups: K,
    toolUseID: O,
    verbose: A,
    isTranscriptMode: f
  })), _[34] = f, _[35] = K, _[36] = O, _[37] = A, _[38] = u;else u = _[38];
  let b;
  if (_[39] !== I || _[40] !== u) b = Vc.createElement(p, {
    flexDirection: "column"
  }, I, u), _[39] = I, _[40] = u, _[41] = b;else b = _[41];
  return b;
}
function selectIsBriefOnly(ctx) {
  return ctx.isBriefOnly;
}
var EkK, Vc, kb_;
var CkK = L(() => {
  LS6();
  rH();
  Yq();
  N7();
  l4();
  Kqq();
  EkK = x(__(), 1), Vc = x(ZH(), 1), kb_ = x(ZH(), 1);
});

export {wrapClassifierApprovalsUpdater as mIe,getInitialApprovalState as qBa,setAutoModeApproval as jBa,getAutoModeReason as WBa,markToolChecking as GBa,clearToolChecking as fIe,clearToolApproval as VBa,clearAllApprovals as KBa,ClassifierApprovalResult as YBa,selectIsBriefOnly as $Cp,EkK as zBa,Vc as isTerminalStatus,kb_ as A$t,CkK as JBa};
