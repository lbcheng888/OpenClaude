// @ts-nocheck
import {xD,po} from "../tools/5224_userPromptCount.ts";
import {wzt,slc} from "../../vendor/m5587.ts";
import {dnr,pnr,t2o} from "../../vendor/m5591.ts";
import {getInitialSettings as Fr,br} from "../config/0745_updateSettingsForSource.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {lnr,ZUo} from "../../vendor/m5589.ts";
import {ilc,alc} from "../../vendor/m5588.ts";
import {Mdt,yce} from "../../vendor/m4046.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {getPromptIndex as FJt,lt} from "../session/0132_sent.ts";
import {bu,oS} from "../config/2605_event_name.ts";
import {xfe,Dfe,S8} from "../config/2187_S8.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {I8e,x8e} from "../agent/4493_kind.ts";
import {fnr,r2o} from "../../vendor/m5593.ts";
import {unr,e2o} from "../agent/5591_success.ts";
import {Lyt,mnr} from "../../vendor/m5592.ts";
import {getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Ne} from "../../vendor/m583.ts";
import {nt} from "../../vendor/m127.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {et} from "../../vendor/m2261.ts";
/**
 * Feedback survey controller hook.
 *
 * Decides whether/when to surface the in-product feedback survey, drives its
 * lifecycle (appeared / responded / transcript-share prompts), and emits the
 * corresponding telemetry. Returns the survey state machine plus handlers.
 *
 * Params:
 *   message              - current message source (used to derive lastAssistantMessageId)
 *   suppress             - when truthy, the survey is never eligible to show
 *   userTurnCount        - running count of user turns (cadence gating)
 *   surveyType           - survey variant key (default "session")
 *   forceSuppress        - extra suppression flag
 *   otherSurveyActive    - true when another survey is already on screen
 */
function useFeedbackSurvey(message, suppress, userTurnCount, surveyType = "session", forceSuppress = !1, otherSurveyActive = !1) {
  let lastAssistantMessageIdRef = Qw.useRef("unknown");
  lastAssistantMessageIdRef.current = xD(message)?.message?.id || "unknown";
  let [cadenceState, setCadenceState] = Qw.useState(() => ({
      timeLastShown: null,
      timeLastShownAtClock: null,
      submitCountAtLastAppearance: null
    })),
    surveyConfig = wzt("tengu_feedback_survey_config", dnr),
    badSurveyTranscriptConfig = wzt("tengu_bad_survey_transcript_ask_config", pnr),
    fineSurveyTranscriptConfig = wzt("tengu_fine_survey_transcript_ask_config", pnr),
    goodSurveyTranscriptConfig = wzt("tengu_good_survey_transcript_ask_config", pnr),
    feedbackSurveyRate = Fr().feedbackSurveyRate,
    clock = As(),
    mountTimeRef = Qw.useRef(clock.now()),
    initialUserTurnCountRef = Qw.useRef(userTurnCount),
    userTurnCountRef = Qw.useRef(userTurnCount);
  userTurnCountRef.current = userTurnCount;
  let messageRef = Qw.useRef(message);
  messageRef.current = message;
  let telemetryContext = lnr(),
    telemetryContextRef = Qw.useRef(telemetryContext);
  telemetryContextRef.current = telemetryContext;
  let probabilityRolledRef = Qw.useRef(!1),
    lastRolledTurnRef = Qw.useRef(null),
    hasMessages = ilc(suppress),
    isOtherUiBlocking = Mdt(),
    recordShown = Qw.useCallback(submitCount => {
      let now = Date.now(),
        clockNow = clock.now();
      if (setCadenceState(prev => {
        if (prev.timeLastShown === now && prev.submitCountAtLastAppearance === submitCount) return prev;
        return {
          timeLastShown: now,
          timeLastShownAtClock: clockNow,
          submitCountAtLastAppearance: submitCount
        };
      }), Ot().feedbackSurveyState?.lastShownTime !== now) hn(prev => ({
        ...prev,
        feedbackSurveyState: {
          lastShownTime: now
        }
      }));
    }, [clock]),
    handleOpen = Qw.useCallback(appearanceId => {
      recordShown(userTurnCountRef.current), W("tengu_feedback_survey_event", {
        ...telemetryContextRef.current,
        event_type: Ve("appeared"),
        appearance_id: xr(appearanceId),
        last_assistant_message_id: xr(lastAssistantMessageIdRef.current),
        survey_type: Le(surveyType),
        prompt_index: FJt()
      }), bu("feedback_survey", {
        event_type: "appeared",
        appearance_id: appearanceId,
        survey_type: surveyType,
        enabled_via_override: xfe()
      });
    }, [recordShown, surveyType]),
    handleResponse = Qw.useCallback((appearanceId, response) => {
      recordShown(userTurnCountRef.current), W("tengu_feedback_survey_event", {
        ...telemetryContextRef.current,
        event_type: Ve("responded"),
        appearance_id: xr(appearanceId),
        response: Le(response),
        last_assistant_message_id: xr(lastAssistantMessageIdRef.current),
        survey_type: Le(surveyType),
        prompt_index: FJt()
      }), bu("feedback_survey", {
        event_type: "responded",
        appearance_id: appearanceId,
        response: response,
        survey_type: surveyType,
        enabled_via_override: xfe()
      });
    }, [recordShown, surveyType]),
    shouldShowTranscriptPrompt = Qw.useCallback(response => {
      if (response !== "bad" && response !== "fine" && response !== "good") return !1;
      if (Vi()) return !1;
      if (!Xs("allow_product_feedback")) return !1;
      if (I8e().kind === "disabled") return !1;
      if (fnr()) return !0;
      if (Ot().transcriptShareDismissed) return !1;
      let probability = response === "bad" ? badSurveyTranscriptConfig.probability : response === "fine" ? fineSurveyTranscriptConfig.probability : goodSurveyTranscriptConfig.probability;
      return Math.random() <= probability;
    }, [badSurveyTranscriptConfig.probability, fineSurveyTranscriptConfig.probability, goodSurveyTranscriptConfig.probability]),
    handleTranscriptPromptShown = Qw.useCallback((appearanceId, response) => {
      let trigger = response === "good" ? "good_feedback_survey" : response === "fine" ? "fine_feedback_survey" : "bad_feedback_survey";
      W("tengu_feedback_survey_event", {
        ...telemetryContextRef.current,
        event_type: Ve("transcript_prompt_appeared"),
        appearance_id: xr(appearanceId),
        last_assistant_message_id: xr(lastAssistantMessageIdRef.current),
        survey_type: Le(surveyType),
        trigger: Le(trigger)
      }), bu("feedback_survey", {
        event_type: "transcript_prompt_appeared",
        appearance_id: appearanceId,
        survey_type: surveyType,
        enabled_via_override: xfe()
      });
    }, [surveyType]),
    handleTranscriptSelect = Qw.useCallback(async (appearanceId, choice, response) => {
      let trigger = response === "good" ? "good_feedback_survey" : response === "fine" ? "fine_feedback_survey" : "bad_feedback_survey";
      if (W("tengu_feedback_survey_event", {
        ...telemetryContextRef.current,
        event_type: `transcript_share_${choice}`,
        appearance_id: xr(appearanceId),
        last_assistant_message_id: xr(lastAssistantMessageIdRef.current),
        survey_type: Le(surveyType),
        trigger: Le(trigger)
      }), choice === "dont_ask_again") hn(prev => ({
        ...prev,
        transcriptShareDismissed: !0
      }));
      if (choice === "yes") {
        let shareResult = await unr(messageRef.current, trigger, appearanceId);
        return W("tengu_feedback_survey_event", {
          ...telemetryContextRef.current,
          event_type: Ve(shareResult.success ? "transcript_share_submitted" : "transcript_share_failed"),
          appearance_id: appearanceId,
          trigger: Le(trigger),
          error_code: shareResult.errorCode
        }), shareResult;
      }
      return !1;
    }, [surveyType]),
    {
      state: surveyState,
      lastResponse: lastResponse,
      appearanceId: appearanceId,
      transcriptBundlePath: transcriptBundlePath,
      open: openSurvey,
      handleSelect: handleSelect,
      handleUndo: handleUndo,
      handleTranscriptSelect: handleTranscriptSelectAction
    } = Lyt({
      otherSurveyActive: otherSurveyActive,
      hideThanksAfterMs: surveyConfig.hideThanksAfterMs,
      onOpen: handleOpen,
      onSelect: handleResponse,
      shouldShowTranscriptPrompt: shouldShowTranscriptPrompt,
      onTranscriptPromptShown: handleTranscriptPromptShown,
      onTranscriptSelect: handleTranscriptSelect
    }),
    mainLoopModel = gs(),
    enabledForModel = Qw.useMemo(() => {
      if (surveyConfig.onForModels.length === 0) return !1;
      if (surveyConfig.onForModels.includes("*")) return !0;
      return surveyConfig.onForModels.includes(mainLoopModel);
    }, [surveyConfig.onForModels, mainLoopModel]),
    shouldShow = Qw.useMemo(() => {
      if (surveyState !== "closed") return !1;
      if (suppress) return !1;
      if (!hasMessages) return !1;
      if (isOtherUiBlocking) return !1;
      if (forceSuppress) return !1;
      if (otherSurveyActive) return !1;
      if (Ne.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY) return !1;
      if (Dfe()) return !1;
      if (!Xs("allow_product_feedback")) return !1;
      if (nt(process.env.CLAUDE_FORCE_DISPLAY_SURVEY) && !cadenceState.timeLastShown) return !0;
      if (!enabledForModel) return !1;
      let now = clock.now();
      if (cadenceState.timeLastShownAtClock !== null) {
        if (now - cadenceState.timeLastShownAtClock < surveyConfig.minTimeBetweenFeedbackMs) return !1;
        if (cadenceState.submitCountAtLastAppearance !== null && userTurnCount < cadenceState.submitCountAtLastAppearance + surveyConfig.minUserTurnsBetweenFeedback) return !1;
      } else {
        if (now - mountTimeRef.current < surveyConfig.minTimeBeforeFeedbackMs) return !1;
        if (userTurnCount < initialUserTurnCountRef.current + surveyConfig.minUserTurnsBeforeFeedback) return !1;
      }
      if (lastRolledTurnRef.current !== userTurnCount) lastRolledTurnRef.current = userTurnCount, probabilityRolledRef.current = Math.random() <= (feedbackSurveyRate ?? surveyConfig.probability);
      if (!probabilityRolledRef.current) return !1;
      let globalState = Ot().feedbackSurveyState;
      if (globalState?.lastShownTime) {
        if (Date.now() - globalState.lastShownTime < surveyConfig.minTimeBetweenGlobalFeedbackMs) return !1;
      }
      return !0;
    }, [clock, surveyState, suppress, hasMessages, isOtherUiBlocking, forceSuppress, otherSurveyActive, enabledForModel, cadenceState.timeLastShown, cadenceState.timeLastShownAtClock, cadenceState.submitCountAtLastAppearance, userTurnCount, surveyConfig.minTimeBetweenFeedbackMs, surveyConfig.minTimeBetweenGlobalFeedbackMs, surveyConfig.minUserTurnsBetweenFeedback, surveyConfig.minTimeBeforeFeedbackMs, surveyConfig.minUserTurnsBeforeFeedback, surveyConfig.probability, feedbackSurveyRate]);
  return Qw.useEffect(() => {
    if (shouldShow) openSurvey();
  }, [shouldShow, openSurvey]), {
    state: surveyState,
    lastResponse: lastResponse,
    appearanceId: appearanceId,
    transcriptBundlePath: transcriptBundlePath,
    handleSelect: handleSelect,
    handleUndo: handleUndo,
    handleTranscriptSelect: handleTranscriptSelectAction
  };
}
var Qw;
var clc = b(() => {
  lt();
  yce();
  slc();
  alc();
  S8();
  kt();
  je();
  QT();
  x8e();
  Bu();
  tr();
  Ir();
  dn();
  po();
  Ro();
  $d();
  br();
  oS();
  ZUo();
  e2o();
  t2o();
  mnr();
  r2o();
  Qw = x(et(), 1);
});

export {useFeedbackSurvey as llc,Qw,clc};
