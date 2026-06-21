// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {Xr as qq} from "../../vendor/m321.ts";
import {we as NH} from "../../vendor/m455.ts";
import {E as h} from "../../vendor/m319.ts";
// @ts-nocheck
var _b7 = 50000,
  fg8 = 500000,
  gk_ = 4,
  getVscodeLogEventSchema = 400000,
  activeVscodeServer = 200000,
  AUTO_COMPACT_THRESHOLD = 50,
  LARGE_CONTEXT_THRESHOLD = 1e4;
function wP3() {
  let H = j_("tengu_auto_mode_config", {})?.enabled;
  return H === "enabled" || H === "disabled" || H === "opt-in" ? H : "opt-in";
}
function IWH(H, _, q) {
  return;
}
function zb7(H, _) {
  let q = H.find(K => K.name === "claude-vscode");
  if (q && q.type === "connected") {
    MIN_CONTEXT_FOR_COMPACT = q, q.client.setNotificationHandler(SONNET_KEEP_RECENT_COUNT(), async T => {
      let {
        eventName: z,
        eventData: $
      } = T.params;
      if (z === "tengu_feedback_survey_event") {
        _?.onFeedbackSurveyEvent?.($);
        return;
      }
      c(`tengu_vscode_${z}`, $);
    });
    let K = {
        tengu_vscode_review_upsell: j_("tengu_vscode_review_upsell", false),
        tengu_vscode_onboarding: j_("tengu_vscode_onboarding", false),
        tengu_quiet_fern: true,
        tengu_vscode_cc_auth: true,
        tengu_slate_ribbon: true,
        tengu_brick_follow: j_("tengu_brick_follow", false),
        tengu_vellum_siding: j_("tengu_vellum_siding", false),
        tengu_loggia_carousel: _?.refusalFallbackLaneEnabled ?? false,
        tengu_loggia_carousel_config: _?.refusalFallbackSettingToggleVisible ?? false,
        fable5_launch_show: _?.fable5LaunchShow ?? false
      },
      O = wP3();
    K.tengu_auto_mode_state = O === "opt-in" ? "enabled" : O, q.client.notification({
      method: "experiment_gates",
      params: {
        gates: K
      }
    }).catch(T => {
      y(`[VSCode] Failed to send experiment_gates notification: ${T.message}`);
    });
  }
}
var SONNET_KEEP_RECENT_COUNT,
  MIN_CONTEXT_FOR_COMPACT = null;
var zIH = L(() => {
  UH();
  qq();
  t6();
  v_();
  SONNET_KEEP_RECENT_COUNT = NH(() => h.object({
    method: h.literal("log_event"),
    params: h.object({
      eventName: h.string(),
      eventData: h.object({}).passthrough()
    })
  }));
});

export {_b7 as zOt,fg8 as Y5r,gk_ as YOt,getVscodeLogEventSchema as M$i,activeVscodeServer as N$i,AUTO_COMPACT_THRESHOLD as yP,LARGE_CONTEXT_THRESHOLD as B$i,wP3 as Hkd,IWH as dxe,zb7 as U$i,SONNET_KEEP_RECENT_COUNT as J5r,MIN_CONTEXT_FOR_COMPACT as F$i,zIH as Q2e};
