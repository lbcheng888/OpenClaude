// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Ne as oH} from "../../vendor/m583.ts";
import {Dfe as GOH,xfe as ZOH,S8 as mF} from "./2187_S8.ts";
import {isPolicyAllowed as Y7,Bu as i5} from "../../vendor/m2213.ts";
import {dnr as ai6,t2o as WRq} from "../../vendor/m5591.ts";
import {getInitialSettings as n8,br as N8} from "./0745_updateSettingsForSource.ts";
import {getGlobalConfig as C_,saveGlobalConfig as P6,tr as T8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {bu as s1,oS as _j} from "./2605_event_name.ts";
import {b as L} from "../../runtime.ts";
import {Ir as _q} from "../../vendor/m584.ts";
/**
 * Semantic restoration for config/5662_probability.ts.
 * Runtime behavior is preserved; cross-module bundled symbols remain unchanged.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;
// FIXME: unverified name - compiler cache temporaries keep short names when usage is only positional.
/** Restored helper; preserves the original bundled control flow. */
function getFeedbackSurveyConfig(): any {
  if (!Y_("tengu_vscode_feedback_survey", !1)) return;
  if (oH.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY) return;
  if (GOH()) return;
  if (!Y7("allow_product_feedback")) return;
  let _ = Y_("tengu_feedback_survey_config", ai6);
  return {
    ..._,
    probability: n8().feedbackSurveyRate ?? _.probability,
    lastSurveyShownTime: C_().feedbackSurveyState?.lastShownTime ?? null
  };
}
/** Restored helper; preserves the original bundled control flow. */
function recordFeedbackSurveyEvent(H): any {
  if (logFeedbackSurveyEvent(H)) rememberFeedbackSurveyAppearance(H);
}
/** Restored helper; preserves the original bundled control flow. */
function logFeedbackSurveyEvent(H): any {
  if (!Y7("allow_product_feedback")) return !1;
  if (GOH() || oH.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY) return !1;
  return c("tengu_feedback_survey_event", {
    event_type: stringifyOptionalSurveyValue(H.event_type),
    appearance_id: stringifyOptionalSurveyValue(H.appearance_id),
    response: stringifyOptionalSurveyValue(H.response),
    survey_type: stringifyOptionalSurveyValue(H.survey_type),
    last_assistant_message_id: stringifyOptionalSurveyValue(H.last_assistant_message_id),
    surface: stringifyOptionalSurveyValue(H.surface)
  }), s1("feedback_survey", {
    event_type: stringifyOptionalSurveyValue(H.event_type),
    appearance_id: stringifyOptionalSurveyValue(H.appearance_id),
    response: stringifyOptionalSurveyValue(H.response),
    survey_type: stringifyOptionalSurveyValue(H.survey_type),
    enabled_via_override: ZOH()
  }), !0;
}
/** Restored helper; preserves the original bundled control flow. */
function rememberFeedbackSurveyAppearance(H): any {
  if (H.event_type !== "appeared") return;
  let _ = C_().feedbackSurveyState?.lastShownTime;
  if (_ !== void 0 && Date.now() - _ < SURVEY_APPEARANCE_DEDUPE_MS) return;
  P6(q => ({
    ...q,
    feedbackSurveyState: {
      lastShownTime: Date.now()
    }
  }));
}
/** Restored helper; preserves the original bundled control flow. */
function stringifyOptionalSurveyValue(H): any {
  return H == null ? void 0 : String(H);
}
var SURVEY_APPEARANCE_DEDUPE_MS = 60000;
var oLq = L(() => {
  WRq();
  T8();
  _q();
  N8();
  _j();
  mF();
  o6();
  y_();
  i5();
});
export {getFeedbackSurveyConfig as yyc,recordFeedbackSurveyEvent as Tyc,logFeedbackSurveyEvent as t9o,rememberFeedbackSurveyAppearance as VYm,stringifyOptionalSurveyValue as j6,SURVEY_APPEARANCE_DEDUPE_MS as GYm,oLq as n9o};
