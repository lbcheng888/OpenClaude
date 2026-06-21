// @ts-nocheck
import {Js as K7} from "../config/2697_oA.ts";
import {bo as Zq,configProtoStore as wq} from "../../vendor/m2458.ts";
import {kXn as Xi6,HXn as Pi6,bLo as fGq} from "./5452_key.ts";
import {hVl as yp4,gVl as vp4} from "../../vendor/m5461.ts";
import {b6e as CpH,kdt as V1_} from "../../vendor/m4317.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {sla as gHK,P0n as i06} from "../../vendor/m3306.ts";
import {mVl as kp4,fVl as Np4} from "../../vendor/m5460.ts";
import {Qi as HK,$u as E3} from "../mcp/2194_mcpServerName.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Tm as wT,Fk as PZ} from "../../vendor/m3341.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {QU as Ib,oTe as FwH} from "../../vendor/m5411.ts";
import {pr as X8,Yl as g4} from "../../vendor/m2562.ts";
import {Tn as G6,zs as E9} from "../../vendor/m2554.ts";
import {at as K_,rs as gq} from "../../vendor/m2546.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Semantic restoration for tui/5425_behavior.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
/** Restored helper; preserves the original bundled control flow. */
function mapPowerShellPermissionAnswer(H, _, q = {}) : any {
  switch (H) {
    case "yes":
      return {
        behavior: "allow",
        updatedInput: _.input,
        ...(q.feedback && {
          feedback: q.feedback
        })
      };
    case "yes-apply-suggestions":
      {
        let K = "suggestions" in _.permissionResult ? _.permissionResult.suggestions ?? [] : [];
        return {
          behavior: "allow",
          updatedInput: _.input,
          permissionUpdates: K
        };
      }
    case "yes-prefix-edited":
      {
        let K = (q.editablePrefix ?? "").trim();
        if (!K) return {
          behavior: "allow",
          updatedInput: _.input
        };
        return {
          behavior: "allow",
          updatedInput: _.input,
          permissionUpdates: [{
            type: "addRules",
            rules: [{
              toolName: K7,
              ruleContent: K
            }],
            behavior: "allow",
            destination: "localSettings"
          }]
        };
      }
    case "no":
      return {
        behavior: "deny",
        ...(q.feedback && {
          feedback: q.feedback
        })
      };
  }
}
/** Renders the PowerShell command permission dialog. */
function PowerShellPermissionDialog({
  payload: H,
  answer: _
}) : any {
  let q = Zq(),
    K = H.command,
    O = Xi6({
      toolName: H.toolName,
      toolInput: H.input,
      toolDescription: H.description
    }),
    [T, z] = ReactHooks.useState(""),
    [$, Y] = ReactHooks.useState(""),
    [A, w] = ReactHooks.useState(!1),
    [f, j] = ReactHooks.useState(!1),
    [J, D] = ReactHooks.useState("yes"),
    [M, X] = ReactHooks.useState(!1),
    [P, Z] = ReactHooks.useState(!1),
    [W, G] = ReactHooks.useState(K.includes(`
`) ? void 0 : K),
    R = ReactHooks.useRef(!1);
  ReactHooks.useEffect(() => {
    let x = !1;
    return yp4(K, U => CpH(U, U.text)).then(U => {
      if (x || R.current) return;
      if (U.length > 0) G(`${U[0]} *`);
    }).catch(() => {}), () => {
      x = !0;
    };
  }, [K]);
  let h = ReactHooks.useCallback(x => {
      R.current = !0, G(x);
    }, []),
    y = ReactHooks.useMemo(() => {
      if (!Y_("tengu_destructive_command_warning", !1)) return null;
      return gHK(K);
    }, [K]),
    E = H.permissionResult.suggestions,
    v = ReactHooks.useMemo(() => kp4({
      suggestions: E,
      onRejectFeedbackChange: Y,
      onAcceptFeedbackChange: z,
      yesInputMode: A,
      noInputMode: f,
      editablePrefix: W,
      onEditablePrefixChange: h
    }), [E, A, f, W, h]),
    C = ReactHooks.useMemo(() => HK(H.toolName), [H.toolName]),
    S = ReactHooks.useCallback(x => {
      if (c("tengu_permission_request_option_selected", {
        option_index: {
          yes: 1,
          "yes-apply-suggestions": 2,
          "yes-prefix-edited": 2,
          no: 3
        }[x]
      }), x === "yes") {
        let F = T.trim();
        c("tengu_accept_submitted", {
          toolName: C,
          isMcp: H.isMcp,
          has_instructions: !!F,
          instructions_length: F.length,
          entered_feedback_mode: M
        }), _(mapPowerShellPermissionAnswer("yes", H, {
          feedback: F || void 0
        }));
        return;
      }
      if (x === "no") {
        let F = $.trim();
        c("tengu_reject_submitted", {
          toolName: C,
          isMcp: H.isMcp,
          has_instructions: !!F,
          instructions_length: F.length,
          entered_feedback_mode: P
        }), _(mapPowerShellPermissionAnswer("no", H, {
          feedback: F || void 0
        }));
        return;
      }
      if (x === "yes-prefix-edited") {
        _(mapPowerShellPermissionAnswer("yes-prefix-edited", H, {
          editablePrefix: W
        }));
        return;
      }
      _(mapPowerShellPermissionAnswer(x, H));
    }, [_, H, T, $, W, C, M, P]),
    I = ReactHooks.useCallback(() => {
      c("tengu_permission_request_escape", {}), q(x => ({
        ...x,
        attribution: {
          ...x.attribution,
          escapeCount: x.attribution.escapeCount + 1
        }
      })), _({
        behavior: "deny"
      });
    }, [_, q]),
    p = ReactHooks.useCallback(x => {
      let U = {
        toolName: C,
        isMcp: H.isMcp
      };
      if (x === "yes") {
        if (A) w(!1), c("tengu_accept_feedback_mode_collapsed", U);else w(!0), X(!0), c("tengu_accept_feedback_mode_entered", U);
      } else if (x === "no") if (f) j(!1), c("tengu_reject_feedback_mode_collapsed", U);else j(!0), Z(!0), c("tengu_reject_feedback_mode_entered", U);
    }, [A, f, H.isMcp, C]),
    b = ReactHooks.useCallback(x => {
      if (x !== "yes" && A && !T.trim()) w(!1);
      if (x !== "no" && f && !$.trim()) j(!1);
      D(x);
    }, [A, f, T, $]);
  return React.createElement(wT, {
    title: "PowerShell command",
    workerBadge: H.workerBadge,
    requestSource: H.requestSource
  }, React.createElement(B, {
    flexDirection: "column",
    paddingX: 2,
    paddingY: 1
  }, React.createElement(V, {
    dimColor: O.visible
  }, H.renderedToolUseMessage), !O.visible && React.createElement(V, {
    dimColor: !0
  }, H.description), React.createElement(Pi6, {
    visible: O.visible,
    promise: O.promise
  })), React.createElement(B, {
    flexDirection: "column"
  }, React.createElement(Ib, {
    permissionResult: H.permissionResult,
    toolType: "command"
  }), y && React.createElement(B, {
    marginBottom: 1
  }, React.createElement(V, {
    color: "warning"
  }, y)), React.createElement(V, null, "Do you want to proceed?"), React.createElement(X8, {
    options: v,
    inlineDescriptions: !0,
    onChange: S,
    onCancel: I,
    onFocus: b,
    onInputModeToggle: p
  })), React.createElement(B, {
    justifyContent: "space-between",
    marginTop: 1
  }, React.createElement(V, {
    dimColor: !0
  }, React.createElement(G6, null, React.createElement(K_, {
    chord: "escape",
    action: "cancel"
  }), (J === "yes" && !A || J === "no" && !f) && React.createElement(K_, {
    chord: "tab",
    action: "amend"
  }), O.enabled && React.createElement(K_, {
    chord: O.chord,
    action: O.visible ? "hide" : "explain"
  })))));
}
var React, ReactHooks;
var Sp4 = L(() => {
  g4();
  E9();
  gq();
  PZ();
  fGq();
  FwH();
  Np4();
  nH();
  o6();
  y_();
  E3();
  wq();
  i06();
  V1_();
  vp4();
  React = u(WH(), 1), ReactHooks = u(WH(), 1);
});
export {mapPowerShellPermissionAnswer as IXn,PowerShellPermissionDialog as _Vl,React as Rg,ReactHooks as Nx,Sp4 as yVl};
