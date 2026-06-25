// @ts-nocheck
import {_t as J_,bo as Zq,uo as wq} from "../../vendor/m2468.ts";
import {c4n as bb6,Qdt as TpH} from "../telemetry/4101_level.ts";
import {useTimeout as zO,WPt as OG_} from "../../vendor/m2460.ts";
import {initY_ as Ef,bye as xGH} from "../../vendor/m4018.ts";
import {b as L,x as u} from "../../runtime.ts";
import {et as WH} from "../../vendor/m2261.ts";
/**
 * Semantic restoration for tui/5334_fotwClaim.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
/** Surfaces feature-of-the-week credit claim notifications. */
function useFeatureOfTheWeekClaimNotification(H, _): any {
  let q = J_(z => z.fotwClaim),
    K = Zq();
  React.useEffect(() => {
    bb6();
  }, []);
  let O = q?.phase;
  zO(() => K(z => z.fotwClaim ? {
    ...z,
    fotwClaim: void 0
  } : z), O === void 0 || O === "pending" ? null : FINAL_CLAIM_TIMEOUT_MS, [O]), React.useEffect(() => {
    if (!q) {
      _(FEATURE_CLAIM_NOTIFICATION_KEY);
      return;
    }
    let z = Ef(q.amountMinorUnits, q.currency, "precise");
    switch (_(FEATURE_CLAIM_NOTIFICATION_KEY), q.phase) {
      case "pending":
        H({
          key: FEATURE_CLAIM_NOTIFICATION_KEY,
          text: `Thanks for trying the feature of the week. ${z} in usage credits on its way!`,
          priority: "immediate",
          requeueOnPreempt: !0,
          timeoutMs: PENDING_CLAIM_TIMEOUT_MS
        });
        return;
      case "granted":
        H({
          key: FEATURE_CLAIM_NOTIFICATION_KEY,
          text: `${z} in usage credits added to your account \xB7 expires in 90 days`,
          color: "success",
          priority: "immediate",
          requeueOnPreempt: !0,
          timeoutMs: FINAL_CLAIM_TIMEOUT_MS
        });
        return;
      case "failed":
        H({
          key: FEATURE_CLAIM_NOTIFICATION_KEY,
          text: "Something went wrong when adding your usage credits. Contact support for help.",
          color: "error",
          priority: "immediate",
          requeueOnPreempt: !0,
          timeoutMs: FINAL_CLAIM_TIMEOUT_MS
        });
        return;
      case "needs_payment_setup":
        H({
          key: FEATURE_CLAIM_NOTIFICATION_KEY,
          text: `To claim ${z} in usage credits, add a payment method at ${USAGE_SETTINGS_URL}, then run /${q.command} again to claim (claiming turns on extra usage billing)`,
          priority: "immediate",
          requeueOnPreempt: !0,
          timeoutMs: FINAL_CLAIM_TIMEOUT_MS
        });
        return;
    }
  }, [q, H, _]);
}
var React,
  FINAL_CLAIM_TIMEOUT_MS = 30000,
  PENDING_CLAIM_TIMEOUT_MS = 60000,
  USAGE_SETTINGS_URL = "https://claude.ai/settings/usage",
  FEATURE_CLAIM_NOTIFICATION_KEY = "fotw-claim";
var bI4 = L(() => {
  OG_();
  TpH();
  wq();
  xGH();
  React = u(WH(), 1);
});
export {useFeatureOfTheWeekClaimNotification as eJl,React as QFo,FINAL_CLAIM_TIMEOUT_MS as Ver,PENDING_CLAIM_TIMEOUT_MS as uUm,USAGE_SETTINGS_URL as dUm,FEATURE_CLAIM_NOTIFICATION_KEY as hyt,bI4 as tJl};
