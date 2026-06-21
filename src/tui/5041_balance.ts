// @ts-nocheck
import {kz as Pr,M2e as GIH} from "../telemetry/2737_M2e.ts";
import {je as oH} from "../../vendor/m577.ts";
import {getSubscriptionType as YK,getRateLimitTier as Yn,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {useTheme as _K} from "../../vendor/m2274.ts";
import {_ce as V4H,fct as C4_} from "../telemetry/3958_fct.ts";
import {WD as bh,_me as _OH} from "../../vendor/m1285.ts";
import {bae as IGH,dnt as OI_} from "../../vendor/m2751.ts";
import {formatResetTime as pa,ps as H9} from "../../vendor/m238.ts";
import {H_ as Ef,Zge as xGH} from "../../vendor/m3951.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {iRn as xC6,unt as mC6} from "../../vendor/m2750.ts";
import {Hk as DZ,yOt as MV_,PF as ux} from "../api/2739_status.ts";
import {No as bq} from "../../vendor/m2421.ts";
import {k8t as UB_,iRo as vDq} from "../core/5036_call.ts";
import {Kn as n6,Li as L7} from "../../vendor/m2572.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {et as aH,Ai as q7} from "../../vendor/m2208.ts";
import {Jc as z3,vE as bP} from "../../vendor/m3837.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Lr as _q} from "../../vendor/m578.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Extra-usage spend-limit dialog and balance helpers for the overage nudge.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Return whether the Max upgrade command should be offered. */
function canShowUpgradeCommand() : any {
  return !Pr() && !oH.DISABLE_UPGRADE_COMMAND && YK() !== "enterprise";
}
/** Cross-module helper: reports org-level overage disablement while credits remain. */
function UX4(H: any) : any {
  return H.overageDisabledReason === "org_level_disabled_until" && H.balanceMinorUnits > 0;
}
/** Move the monthly spend limit by one step while respecting current usage and caps. */
function stepMonthlySpendLimit(H: any, _: any, q: any = null) : any {
  let K = H ?? I6T,
    O = _ === 1 ? Math.floor(K / GUH + 1) * GUH : Math.ceil(K / GUH - 1) * GUH,
    T = q === null ? GUH : _ === 1 ? Math.ceil((q + C6T) / GUH) * GUH : q;
  return Math.min(b6T, Math.max(T, O));
}
/** Cross-module component: prompts the user to raise, remove, wait, or upgrade after hitting the spend limit. */
function FX4({
  balance: H,
  onDone: _,
  context: q
}: any) : any {
  let [K, O] = UZ.useState(null),
    [T] = _K(),
    z = V4H(),
    $ = YK(),
    A = !($ === "max" && Yn() === "default_claude_max_20x") && canShowUpgradeCommand(),
    w = H.currency,
    [f, j] = UZ.useState(void 0),
    [J, D] = UZ.useState(void 0),
    [M, X] = UZ.useState(!1),
    [P, Z] = UZ.useState(0),
    [W, G] = UZ.useState(null);
  UZ.useEffect(() => {
    let p = bh();
    if (p) {
      j(p.spendLimitCents), D(p.spendLimitCents);
      return;
    }
    let b = !1;
    return IGH().then(x => {
      if (b) return;
      let U = x?.extra_usage?.monthly_limit ?? null,
        F = x?.extra_usage?.used_credits ?? 0,
        Q = U === null ? null : Math.max(U, F);
      j(Q), D(Q);
    }).catch(() => {
      if (b) return;
      j(null), D(null);
    }), () => {
      b = !0;
    };
  }, []);
  let R = UZ.useMemo(() => {
      if (z.resetsAt) return pa(z.resetsAt, !0);
      return;
    }, [z.resetsAt]),
    h = J !== void 0,
    y = !h ? "\u2026" : J === null ? "Unlimited" : Ef(J, w, "fit"),
    E = UZ.useMemo(() => {
      let p = [{
        id: "adjust",
        label: `Adjust monthly spend limit: ${y}`,
        hint: f === null ? "\u2190 or \u2192 to set a limit" : "\u2190 or \u2192 to adjust \xB7 Del to remove limit"
      }, {
        id: "wait",
        label: "Wait for limit to reset",
        hint: R ? `Resets ${R}` : ""
      }];
      if (A) {
        let b = $ === "max" ? "Max 20x" : "Max";
        p.push({
          id: "upgrade",
          label: `Upgrade to ${b} for higher session limits every month`,
          hint: ""
        });
      }
      return p;
    }, [y, R, A, $, f]);
  function v() : any {
    c("tengu_spend_limit_nudge_cancel", {}), _(void 0, {
      display: "skip"
    });
  }
  async function C() : any {
    if (!h || M) return;
    if (J === f) {
      G(f === null ? "Press \u2190 or \u2192 to set a limit." : "Press \u2192 to raise the limit, or Del to remove it.");
      return;
    }
    X(!0);
    let p = J ?? null,
      b = await xC6(p, w);
    if (!b.ok) {
      X(!1), G("Could not update your spend limit. Press Enter to retry.");
      return;
    }
    let x = b.disabledUntil != null ? new Date(b.disabledUntil) : null,
      U = x != null && (Number.isNaN(x.getTime()) || x > new Date());
    if (c("tengu_spend_limit_nudge_save", {
      removed: p === null,
      reblocked: U
    }), U) {
      X(!1);
      let Q = b.usedCredits !== null ? Math.max(f ?? 0, b.usedCredits) : f;
      j(Q ?? null), D(d => Q !== null && Q !== void 0 && d !== null ? Math.max(d ?? 0, Q) : d), G(b.usedCredits !== null ? `You've already used ${Ef(b.usedCredits, w, "fit")} this month \u2014 set your limit above that.` : "Your current spend is still over the new limit. Raise it higher or remove it.");
      return;
    }
    G(null);
    let F = {
      ...DZ,
      isUsingOverage: !0
    };
    if (delete F.overageDisabledReason, F.status === "rejected") F.status = "allowed";
    if (MV_(F), p === null) _(bq("success", T)("Removed monthly spend limit"));else _(bq("success", T)(`Increased monthly spend limit to ${Ef(p, w, "fit")}`));
  }
  function S(p: any) : any {
    if (p === "adjust") C();else if (p === "wait") c("tengu_spend_limit_nudge_wait", {}), _(void 0, {
      display: "skip"
    });else if (p === "upgrade") c("tengu_spend_limit_nudge_upgrade", {}), Promise.resolve().then(() => (UB_(), vDq)).then(({
      call: b
    }) => b(_, q)).then(b => {
      if (b) O(b);
    });
  }
  function I(p: any) : any {
    if (M) return;
    if (p.key === "up") {
      p.preventDefault(), G(null), Z(b => Math.max(0, b - 1));
      return;
    }
    if (p.key === "down") {
      p.preventDefault(), G(null), Z(b => Math.min(E.length - 1, b + 1));
      return;
    }
    if (p.key === "return") {
      p.preventDefault();
      let b = E[P];
      if (b) S(b.id);
      return;
    }
    if (E[P]?.id !== "adjust" || !h) return;
    if (p.key === "left") p.preventDefault(), G(null), D(b => stepMonthlySpendLimit(b ?? null, -1, f ?? null));else if (p.key === "right") p.preventDefault(), G(null), D(b => stepMonthlySpendLimit(b ?? null, 1, f ?? null));else if (p.key === "delete" || p.key === "backspace") p.preventDefault(), G(null), D(null);
  }
  if (K) return K;
  return UZ.default.createElement(n6, {
    title: "What do you want to do?",
    titleEnd: `Usage credit balance: ${Ef(H.amount, w)}`,
    onCancel: v,
    isCancelActive: !M,
    color: "suggestion"
  }, UZ.default.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: I
  }, UZ.default.createElement(B, {
    flexDirection: "column"
  }, E.map((p, b) => {
    let x = b === P;
    return UZ.default.createElement(B, {
      key: p.id,
      justifyContent: "space-between",
      gap: 2
    }, UZ.default.createElement(V, {
      color: x ? "suggestion" : void 0
    }, x ? aH.pointer : " ", " ", p.label), p.hint ? UZ.default.createElement(V, {
      dimColor: !0,
      wrap: "truncate-end"
    }, p.hint) : null);
  })), M ? UZ.default.createElement(z3, {
    message: "Updating spend limit\u2026"
  }) : W ? UZ.default.createElement(B, null, UZ.default.createElement(V, {
    color: "error"
  }, W)) : null));
}
var UZ,
  GUH = 500,
  C6T = 1000,
  b6T = 10000000000,
  I6T = 4000;
var gX4 = L(() => {
  q7();
  L7();
  bP();
  nH();
  y_();
  mC6();
  OI_();
  ux();
  C4_();
  _OH();
  Mq();
  xGH();
  _q();
  H9();
  GIH();
  UZ = u(WH(), 1);
});
export {canShowUpgradeCommand as bum,UX4 as HHl,stepMonthlySpendLimit as kHl,FX4 as IHl,UZ as aH,GUH as u8e,C6T as Eum,b6T as Cum,I6T as vum,gX4 as DHl};
