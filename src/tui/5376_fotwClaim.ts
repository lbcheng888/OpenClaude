// @ts-nocheck
import {mt as J_,bo as Zq,configProtoStore as wq} from "../../vendor/m2458.ts";
import {E2n as bb6,Lct as TpH} from "../telemetry/4037_level.ts";
import {useTimeout as zO,f0t as OG_} from "../../vendor/m2450.ts";
import {H_ as Ef,Zge as xGH} from "../../vendor/m3951.ts";
import {b as L,M as u} from "../../runtime.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Semantic restoration for tui/5334_fotwClaim.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
/** Surfaces feature-of-the-week credit claim notifications. */
function useFeatureOfTheWeekClaimNotification(H, _) : any {
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
export {useFeatureOfTheWeekClaimNotification as h8l,React as OOo,FINAL_CLAIM_TIMEOUT_MS as GJn,PENDING_CLAIM_TIMEOUT_MS as nDm,USAGE_SETTINGS_URL as rDm,FEATURE_CLAIM_NOTIFICATION_KEY as XAt,bI4 as g8l};
