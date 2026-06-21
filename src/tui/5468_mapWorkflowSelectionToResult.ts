// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L,M as u} from "../../runtime.ts";
import {WORKFLOW_TOOL_NAME as bG} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {AI as iG,Mce as W4H} from "../../vendor/m4173.ts";
import {IVl as Qp4,DVl as cp4} from "../../vendor/m5466.ts";
import {iM as tV,q9 as Mu} from "../../vendor/m4604.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {ELo as jGq,CLo as JGq} from "./5460_behavior.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {getOriginalCwd as G8,lt as w_} from "../session/0131_sent.ts";
import {Qi as HK,$u as E3} from "../mcp/2194_mcpServerName.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {mU as lC,kIe as QZH} from "../../vendor/m4051.ts";
import {eOe as ChH,FGt as bg_} from "./5458_options.ts";
import {at as K_,rs as gq} from "../../vendor/m2546.ts";
import {Tm as wT,Fk as PZ} from "../../vendor/m3341.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {rt as __} from "../../vendor/m2255.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/* Restored Claude Code 2.1.177 module: Dynamic workflow permission dialog..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
var ip4 = {};
j_(ip4, {
  mapWorkflowSelectionToResult: (): any => mapWorkflowSelectionToResult,
  WorkflowPermissionDialog: (): any => WorkflowPermissionDialog,
  WORKFLOW_USAGE_WARNING: (): any => WORKFLOW_USAGE_WARNING
});
/* Maps a workflow permission dialog choice into a can-use-tool result. */
function mapWorkflowSelectionToResult(H: any, _: any, q: any, K: any): any {
  switch (H) {
    case "yes":
      return {
        behavior: "allow",
        updatedInput: {
          ..._.input,
          script: q
        },
        ...(K && {
          feedback: K
        })
      };
    case "yes-always":
      return {
        behavior: "allow",
        updatedInput: {
          ..._.input,
          script: q
        },
        ...(_.workflowName && {
          permissionUpdates: [{
            type: "addRules",
            rules: [{
              toolName: bG,
              ruleContent: _.workflowName
            }],
            behavior: "allow",
            destination: "localSettings"
          }]
        })
      };
    case "no":
      return {
        behavior: "deny",
        ...(K && {
          feedback: K
        })
      };
  }
}
/* Permission dialog for dynamic workflow scripts. */
function WorkflowPermissionDialog(H: any): any {
  let _ = dp4.c(72),
    {
      payload: q,
      answer: K
    } = H,
    [O, T] = DGq.useState(q.script),
    z;
  if (_[0] !== O) z = iG(O), _[0] = O, _[1] = z;else z = _[1];
  let $ = z,
    Y = "error" in $ ? null : $,
    A = Y?.scriptBody ?? O,
    w;
  if (_[2] !== A) w = Qp4(A), _[2] = A, _[3] = w;else w = _[3];
  let f = w,
    j;
  H: {
    let qH = collectWorkflowAgentPrompts,
      KH;
    if (_[4] === Symbol.for("react.memo_cache_sentinel")) KH = (OH: any): any => ({
      title: t2T[OH.kind] + (OH.annotation ? ` ${OH.annotation}` : ""),
      prompts: qH(OH)
    }), _[4] = KH;else KH = _[4];
    let zH = KH,
      _H = Y?.meta.phases;
    if (_H && _H.length > 0) {
      let OH;
      if (_[5] !== _H || _[6] !== f?.phases) {
        let AH;
        if (_[8] !== f?.phases) AH = (jH: any, MH: any): any => ({
          title: jH.title,
          detail: jH.detail,
          prompts: qH(f?.phases[MH])
        }), _[8] = f?.phases, _[9] = AH;else AH = _[9];
        let $H = _H.map(AH),
          wH = (f?.phases ?? []).slice(_H.length).map(zH);
        OH = [...$H, ...wH], _[5] = _H, _[6] = f?.phases, _[7] = OH;
      } else OH = _[7];
      j = OH;
      break H;
    }
    if (f && f.phases.length > 0) {
      let OH;
      if (_[10] !== f.phases) OH = f.phases.map(zH), _[10] = f.phases, _[11] = OH;else OH = _[11];
      j = OH;
      break H;
    }
    j = null;
  }
  let J = j,
    [D, M] = DGq.useState(J === null),
    X;
  if (_[12] !== O) X = function (KH: any): any {
    if (KH.ctrl && KH.key === "g") {
      KH.preventDefault();
      let zH = tV(O);
      if (zH.content !== null && zH.content !== O) T(zH.content), M(!1);
    }
  }, _[12] = O, _[13] = X;else X = _[13];
  let P = X,
    Z;
  if (_[14] !== K || _[15] !== q || _[16] !== O) Z = (qH: any, KH: any): any => {
    if (qH === "toggle") {
      M(toggleWorkflowSummaryView);
      return;
    }
    K(mapWorkflowSelectionToResult(qH, q, O, KH));
  }, _[14] = K, _[15] = q, _[16] = O, _[17] = Z;else Z = _[17];
  let W = Z,
    G;
  if (_[18] !== K) G = (): any => {
    K({
      behavior: "deny"
    });
  }, _[18] = K, _[19] = G;else G = _[19];
  let R = G,
    h = Y?.meta.description,
    y;
  H: {
    if (q.args === void 0) {
      y = void 0;
      break H;
    }
    let qH;
    if (_[20] !== q.args) {
      let KH;
      try {
        KH = bH(q.args);
      } catch {
        KH = String(q.args);
      }
      qH = KH.length > 120 ? KH.slice(0, 119) + "\u2026" : KH, _[20] = q.args, _[21] = qH;
    } else qH = _[21];
    y = qH;
  }
  let E = y,
    v;
  if (_[22] !== q) v = Boolean(q.workflowName) && jGq(q), _[22] = q, _[23] = v;else v = _[23];
  let C = v,
    S;
  if (_[24] === Symbol.for("react.memo_cache_sentinel")) S = {
    label: "Yes, run it",
    value: "yes",
    feedbackConfig: {
      type: "accept"
    }
  }, _[24] = S;else S = _[24];
  let I;
  if (_[25] !== J || _[26] !== q.workflowName || _[27] !== C || _[28] !== D) {
    if (I = [S], C) {
      let KH;
      if (_[30] !== q.workflowName) KH = S5.createElement(V, {
        bold: !0
      }, q.workflowName), _[30] = q.workflowName, _[31] = KH;else KH = _[31];
      let zH;
      if (_[32] === Symbol.for("react.memo_cache_sentinel")) zH = S5.createElement(V, {
        bold: !0
      }, G8()), _[32] = zH;else zH = _[32];
      let _H;
      if (_[33] !== KH) _H = {
        label: S5.createElement(V, null, "Yes, and don't ask again for", " ", KH, " in", " ", zH),
        value: "yes-always"
      }, _[33] = KH, _[34] = _H;else _H = _[34];
      I.push(_H);
    }
    if (J) {
      let KH = D ? "View workflow summary" : "View raw script",
        zH;
      if (_[35] !== KH) zH = {
        label: KH,
        value: "toggle"
      }, _[35] = KH, _[36] = zH;else zH = _[36];
      I.push(zH);
    }
    let qH;
    if (_[37] === Symbol.for("react.memo_cache_sentinel")) qH = {
      label: "No",
      value: "no",
      feedbackConfig: {
        type: "reject"
      }
    }, _[37] = qH;else qH = _[37];
    I.push(qH), _[25] = J, _[26] = q.workflowName, _[27] = C, _[28] = D, _[29] = I;
  } else I = _[29];
  let p = I,
    b;
  if (_[38] !== q.toolName) b = HK(q.toolName), _[38] = q.toolName, _[39] = b;else b = _[39];
  let x;
  if (_[40] !== q.isMcp || _[41] !== b) x = {
    toolName: b,
    isMcp: q.isMcp
  }, _[40] = q.isMcp, _[41] = b, _[42] = x;else x = _[42];
  let U = x,
    F;
  if (_[43] !== h) F = h && S5.createElement(B, {
    marginBottom: 1
  }, S5.createElement(V, {
    bold: !0
  }, h)), _[43] = h, _[44] = F;else F = _[44];
  let Q;
  if (_[45] !== J || _[46] !== O || _[47] !== D) Q = D || !J ? S5.createElement(B, {
    borderStyle: "dashed",
    borderColor: "subtle",
    paddingX: 1
  }, S5.createElement(lC, {
    code: O,
    filePath: "workflow.js"
  })) : S5.createElement(B, {
    flexDirection: "column"
  }, S5.createElement(V, null, "This dynamic workflow will spin up multiple subagents across the following phases:"), J.map(renderWorkflowPhaseSummary)), _[45] = J, _[46] = O, _[47] = D, _[48] = Q;else Q = _[48];
  let d;
  if (_[49] !== E) d = E && S5.createElement(B, {
    marginTop: 1
  }, S5.createElement(V, null, S5.createElement(V, {
    bold: !0,
    dimColor: !0
  }, "args:", " "), S5.createElement(V, {
    dimColor: !0
  }, E))), _[49] = E, _[50] = d;else d = _[50];
  let l;
  if (_[51] !== F || _[52] !== Q || _[53] !== d) l = S5.createElement(B, {
    flexDirection: "column",
    paddingX: 1,
    marginBottom: 1,
    overflow: "hidden"
  }, F, Q, d), _[51] = F, _[52] = Q, _[53] = d, _[54] = l;else l = _[54];
  let n;
  if (_[55] === Symbol.for("react.memo_cache_sentinel")) n = S5.createElement(B, {
    marginBottom: 1
  }, S5.createElement(V, {
    color: "warning"
  }, WORKFLOW_USAGE_WARNING)), _[55] = n;else n = _[55];
  let o;
  if (_[56] !== R || _[57] !== W || _[58] !== p || _[59] !== U) o = S5.createElement(ChH, {
    options: p,
    onSelect: W,
    onCancel: R,
    question: n,
    toolAnalyticsContext: U
  }), _[56] = R, _[57] = W, _[58] = p, _[59] = U, _[60] = o;else o = _[60];
  let i;
  if (_[61] === Symbol.for("react.memo_cache_sentinel")) i = S5.createElement(V, {
    dimColor: !0
  }, S5.createElement(K_, {
    chord: "ctrl+g",
    action: "edit script in $EDITOR"
  })), _[61] = i;else i = _[61];
  let t;
  if (_[62] !== o) t = S5.createElement(B, {
    flexDirection: "column",
    paddingX: 1
  }, o, i), _[62] = o, _[63] = t;else t = _[63];
  let a;
  if (_[64] !== P || _[65] !== l || _[66] !== t) a = S5.createElement(B, {
    flexDirection: "column",
    marginTop: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: P
  }, l, t), _[64] = P, _[65] = l, _[66] = t, _[67] = a;else a = _[67];
  let e;
  if (_[68] !== q.requestSource || _[69] !== q.workerBadge || _[70] !== a) e = S5.createElement(wT, {
    color: "permission",
    title: "Run a dynamic workflow?",
    workerBadge: q.workerBadge,
    requestSource: q.requestSource
  }, a), _[68] = q.requestSource, _[69] = q.workerBadge, _[70] = a, _[71] = e;else e = _[71];
  return e;
}
function renderWorkflowPhaseSummary(H: any, _: any): any {
  return S5.createElement(S5.Fragment, {
    key: _
  }, S5.createElement(V, null, "  ", _ + 1, ". ", H.title, H.detail ? S5.createElement(V, {
    dimColor: !0
  }, " \u2014 ", H.detail) : ""), H.prompts.length > 0 && S5.createElement(V, {
    dimColor: !0
  }, "     ", H.prompts.slice(0, 2).map(formatWorkflowPromptPreview).join("  "), H.prompts.length > 2 ? `  +${H.prompts.length - 2} more` : ""));
}
function formatWorkflowPromptPreview(H: any): any {
  return `\xB7 "${H.length > 60 ? H.slice(0, 59) + "\u2026" : H}"`;
}
function toggleWorkflowSummaryView(H: any): any {
  return !H;
}
function collectWorkflowAgentPrompts(H: any): any {
  let _ = new Set(),
    q = [];
  for (let K of H?.agents ?? []) if (K.prompt && !_.has(K.prompt)) _.add(K.prompt), q.push(K.prompt);
  return q;
}
var dp4, S5, DGq, WORKFLOW_USAGE_WARNING, t2T;
var rp4 = L((): any => {
  w_();
  gq();
  QZH();
  PZ();
  bg_();
  nH();
  E3();
  cp4();
  W4H();
  Mu();
  H6();
  JGq();
  dp4 = u(__(), 1), S5 = u(WH(), 1), DGq = u(WH(), 1), WORKFLOW_USAGE_WARNING = "Dynamic workflows can use a lot of tokens quickly by running many " + "subagents in parallel \u2014 which counts against your usage limit. Stop a " + "running workflow at any time with /workflows, or disable dynamic workflows in /config.", t2T = {
    loop: "loop",
    parallel: "parallel",
    sequential: "step"
  };
});

export {ip4 as MVl,mapWorkflowSelectionToResult,WorkflowPermissionDialog,renderWorkflowPhaseSummary as BLm,formatWorkflowPromptPreview as FLm,toggleWorkflowSummaryView as ULm,collectWorkflowAgentPrompts as $Lm,dp4 as PVl,S5 as Fu,DGq as vLo,WORKFLOW_USAGE_WARNING,t2T as MLm,rp4 as NVl};
