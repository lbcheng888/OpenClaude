// @ts-nocheck
import {RXn as Di6,vXn as ji6,wXn as Ji6,xXn as Mi6} from "../../vendor/m5448.ts";
import {getOriginalCwd as G8,lt as w_} from "../session/0131_sent.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {Qi as HK,$u as E3} from "../mcp/2194_mcpServerName.ts";
import {fYt as rl_,dr as P8} from "../../vendor/m231.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {QU as Ib,oTe as FwH} from "../../vendor/m5411.ts";
import {eOe as ChH,FGt as bg_} from "./5458_options.ts";
import {Tm as wT,Fk as PZ} from "../../vendor/m3341.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/** Restored Claude Code 2.1.177 module. Builds permission behavior options and labels for terminal selection controls. */
function buildBehaviorOption(H: any, _: any, q: any): any {
  switch (H) {
    case "yes":
    case "yes-enable-auto-mode":
      return {
        behavior: "allow",
        updatedInput: _.input,
        ...(q && {
          feedback: q
        })
      };
    case "yes-dont-ask-again":
      return {
        behavior: "allow",
        updatedInput: _.input,
        permissionUpdates: [{
          type: "addRules",
          rules: [{
            toolName: _.toolName
          }],
          behavior: "allow",
          destination: "localSettings"
        }]
      };
    case "no":
      return {
        behavior: "deny",
        ...(q && {
          feedback: q
        })
      };
  }
}
function formatBehaviorLabel(H: any): any {
  let _ = H.permissionResult.decisionReason,
    q = _?.type === "safetyCheck" && !_.classifierApprovable;
  return H.showAlwaysAllow && !q && !H.isAskCappedByOrg;
}
function getBehaviorColor(H: any): any {
  let _ = behaviorOptions.c(56),
    {
      payload: q,
      answer: K
    } = H,
    O;
  if (_[0] !== q) O = formatBehaviorLabel(q), _[0] = q, _[1] = O;else O = _[1];
  let T = O,
    {
      offered: z,
      enableAutoMode: $
    } = Di6(q.requestSource),
    Y;
  if (_[2] !== K || _[3] !== $ || _[4] !== q) Y = (U: any, F: any): any => {
    if (U === "yes-enable-auto-mode") $();
    K(buildBehaviorOption(U, q, F));
  }, _[2] = K, _[3] = $, _[4] = q, _[5] = Y;else Y = _[5];
  let A = Y,
    w;
  if (_[6] !== K) w = (): any => {
    K({
      behavior: "cancelled"
    });
  }, _[6] = K, _[7] = w;else w = _[7];
  let f = w,
    j;
  if (_[8] === Symbol.for("react.memo_cache_sentinel")) j = G8(), _[8] = j;else j = _[8];
  let J = j,
    D;
  if (_[9] === Symbol.for("react.memo_cache_sentinel")) D = {
    label: "Yes",
    value: "yes",
    feedbackConfig: {
      type: "accept"
    }
  }, _[9] = D;else D = _[9];
  let M;
  if (_[10] !== z || _[11] !== q.userFacingName || _[12] !== T) {
    if (M = [D], T) {
      let F;
      if (_[14] !== q.userFacingName) F = ReactRuntime.createElement(V, {
        bold: !0
      }, q.userFacingName), _[14] = q.userFacingName, _[15] = F;else F = _[15];
      let Q;
      if (_[16] === Symbol.for("react.memo_cache_sentinel")) Q = ReactRuntime.createElement(V, {
        bold: !0
      }, J), _[16] = Q;else Q = _[16];
      let d;
      if (_[17] !== F) d = {
        label: ReactRuntime.createElement(V, null, "Yes, and don't ask again for", " ", F, " commands in", " ", Q),
        value: "yes-dont-ask-again"
      }, _[17] = F, _[18] = d;else d = _[18];
      M.push(d);
    }
    if (z) {
      let F;
      if (_[19] === Symbol.for("react.memo_cache_sentinel")) F = {
        label: ji6,
        description: Ji6,
        value: "yes-enable-auto-mode"
      }, _[19] = F;else F = _[19];
      M.push(F);
    }
    let U;
    if (_[20] === Symbol.for("react.memo_cache_sentinel")) U = {
      label: "No",
      value: "no",
      feedbackConfig: {
        type: "reject"
      }
    }, _[20] = U;else U = _[20];
    M.push(U), _[10] = z, _[11] = q.userFacingName, _[12] = T, _[13] = M;
  } else M = _[13];
  let X = M,
    P;
  if (_[21] !== q.toolName) P = HK(q.toolName), _[21] = q.toolName, _[22] = P;else P = _[22];
  let Z;
  if (_[23] !== q.isMcp || _[24] !== P) Z = {
    toolName: P,
    isMcp: q.isMcp
  }, _[23] = q.isMcp, _[24] = P, _[25] = Z;else Z = _[25];
  let W = Z,
    G = q.workerBadge,
    R = q.requestSource,
    h;
  if (_[26] !== q.renderedToolUseMessage) h = q.renderedToolUseMessage !== "" && ReactRuntime.createElement(ReactRuntime.Fragment, null, "(", q.renderedToolUseMessage, ")"), _[26] = q.renderedToolUseMessage, _[27] = h;else h = _[27];
  let y;
  if (_[28] !== q.hasMcpSuffix) y = q.hasMcpSuffix ? ReactRuntime.createElement(V, {
    dimColor: !0
  }, " (MCP)") : "", _[28] = q.hasMcpSuffix, _[29] = y;else y = _[29];
  let E;
  if (_[30] !== q.userFacingName || _[31] !== h || _[32] !== y) E = ReactRuntime.createElement(V, null, q.userFacingName, h, y), _[30] = q.userFacingName, _[31] = h, _[32] = y, _[33] = E;else E = _[33];
  let v;
  if (_[34] !== q.description) v = rl_(q.description, 3), _[34] = q.description, _[35] = v;else v = _[35];
  let C;
  if (_[36] !== v) C = ReactRuntime.createElement(V, {
    dimColor: !0
  }, v), _[36] = v, _[37] = C;else C = _[37];
  let S;
  if (_[38] !== E || _[39] !== C) S = ReactRuntime.createElement(B, {
    flexDirection: "column",
    paddingX: 2,
    paddingY: 1
  }, E, C), _[38] = E, _[39] = C, _[40] = S;else S = _[40];
  let I;
  if (_[41] !== q.permissionResult) I = ReactRuntime.createElement(Ib, {
    permissionResult: q.permissionResult,
    toolType: "tool"
  }), _[41] = q.permissionResult, _[42] = I;else I = _[42];
  let p;
  if (_[43] !== f || _[44] !== A || _[45] !== X || _[46] !== W) p = ReactRuntime.createElement(ChH, {
    options: X,
    onSelect: A,
    onCancel: f,
    toolAnalyticsContext: W
  }), _[43] = f, _[44] = A, _[45] = X, _[46] = W, _[47] = p;else p = _[47];
  let b;
  if (_[48] !== I || _[49] !== p) b = ReactRuntime.createElement(B, {
    flexDirection: "column"
  }, I, p), _[48] = I, _[49] = p, _[50] = b;else b = _[50];
  let x;
  if (_[51] !== q.requestSource || _[52] !== q.workerBadge || _[53] !== S || _[54] !== b) x = ReactRuntime.createElement(wT, {
    title: "Tool use",
    workerBadge: G,
    requestSource: R
  }, S, b), _[51] = q.requestSource, _[52] = q.workerBadge, _[53] = S, _[54] = b, _[55] = x;else x = _[55];
  return x;
}
var behaviorOptions, ReactRuntime;
var initBehaviorOptions = L((): any => {
  w_();
  PZ();
  bg_();
  FwH();
  Mi6();
  nH();
  E3();
  P8();
  behaviorOptions = u(__(), 1), ReactRuntime = u(WH(), 1);
});

export {buildBehaviorOption as wLm,formatBehaviorLabel as ELo,getBehaviorColor as pVl,behaviorOptions as dVl,ReactRuntime as Ib,initBehaviorOptions as CLo};
