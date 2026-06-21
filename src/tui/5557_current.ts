// @ts-nocheck
import {_P as $k,lo as Aq} from "../tools/5190_userPromptCount.ts";
import {oQn as Ea6,gZl as Jo4} from "../../vendor/m5549.ts";
import {cQn as xa6,IMo as okq,DMo as akq} from "../../vendor/m5553.ts";
import {getInitialSettings as t8,yr as v8} from "../config/0740_updateSettingsForSource.ts";
import {useClock as b9} from "../../vendor/m2432.ts";
import {iQn as Ca6,kMo as ikq} from "../../vendor/m5551.ts";
import {_Zl as Do4,yZl as Mo4} from "../../vendor/m5550.ts";
import {Sct as P4_,Sce as c4H} from "../../vendor/m3981.ts";
import {getGlobalConfig as N_,saveGlobalConfig as M6,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {Qe as K_,fromEnum as QH,st as T_} from "../../vendor/m5.ts";
import {Br as a8,WS as LJ} from "../../vendor/m1456.ts";
import {getPromptIndex as vn_,lt as A_} from "../session/0131_sent.ts";
import {Ou as o1,uS as _j} from "../config/2594_event_name.ts";
import {Sfe as lOH,bfe as nOH,s5 as qg} from "../config/2182_s5.ts";
import {ra as TK,Ap as hO} from "../config/0614_Ap.ts";
import {isPolicyAllowed as _7,rd as t5} from "../../vendor/m2205.ts";
import {rje as jUH,oje as JUH} from "../agent/4471_kind.ts";
import {dQn as ma6,OMo as tkq} from "../../vendor/m5555.ts";
import {lQn as Ia6,HMo as rkq} from "../agent/5553_success.ts";
import {fht as H$_,uQn as ua6} from "../../vendor/m5554.ts";
import {getMainLoopModel as Q9,Mo as Qq} from "../permissions/1453_swapShrinksContextWindow.ts";
import {je as dH} from "../../vendor/m577.ts";
import {b as L,M as x} from "../../runtime.ts";
import {ze as iH} from "../../vendor/m2452.ts";
import {Lr as l8} from "../../vendor/m578.ts";
import {sn as $6} from "../config/0047_namespace.ts";
import {Te as WH} from "../../vendor/m2253.ts";
// @ts-nocheck
function hasProxyAuthHelper(H, _, q, K = "session", O = false, T = false) {
  let z = G0.useRef("unknown");
  z.current = $k(H)?.message?.id || "unknown";
  let [$, Y] = G0.useState(() => ({
      timeLastShown: null,
      timeLastShownAtClock: null,
      submitCountAtLastAppearance: null
    })),
    w = Ea6("tengu_feedback_survey_config", xa6),
    A = Ea6("tengu_bad_survey_transcript_ask_config", okq),
    f = Ea6("tengu_good_survey_transcript_ask_config", okq),
    j = t8().feedbackSurveyRate,
    J = b9(),
    D = G0.useRef(J.now()),
    M = G0.useRef(q),
    X = G0.useRef(q);
  X.current = q;
  let P = G0.useRef(H);
  P.current = H;
  let Z = Ca6(),
    W = G0.useRef(Z);
  W.current = Z;
  let G = G0.useRef(false),
    R = G0.useRef(null),
    k = Do4(_),
    V = P4_(),
    E = G0.useCallback(t => {
      let e = Date.now(),
        _H = J.now();
      if (Y(qH => {
        if (qH.timeLastShown === e && qH.submitCountAtLastAppearance === t) return qH;
        return {
          timeLastShown: e,
          timeLastShownAtClock: _H,
          submitCountAtLastAppearance: t
        };
      }), N_().feedbackSurveyState?.lastShownTime !== e) M6(qH => ({
        ...qH,
        feedbackSurveyState: {
          lastShownTime: e
        }
      }));
    }, [J]),
    v = G0.useCallback(t => {
      E(X.current), c("tengu_feedback_survey_event", {
        ...W.current,
        event_type: K_("appeared"),
        appearance_id: a8(t),
        last_assistant_message_id: a8(z.current),
        survey_type: QH(K),
        prompt_index: vn_()
      }), o1("feedback_survey", {
        event_type: "appeared",
        appearance_id: t,
        survey_type: K,
        enabled_via_override: lOH()
      });
    }, [E, K]),
    C = G0.useCallback((t, e) => {
      E(X.current), c("tengu_feedback_survey_event", {
        ...W.current,
        event_type: K_("responded"),
        appearance_id: a8(t),
        response: QH(e),
        last_assistant_message_id: a8(z.current),
        survey_type: QH(K),
        prompt_index: vn_()
      }), o1("feedback_survey", {
        event_type: "responded",
        appearance_id: t,
        response: e,
        survey_type: K,
        enabled_via_override: lOH()
      });
    }, [E, K]),
    S = G0.useCallback(t => {
      if (t !== "bad" && t !== "good") return false;
      if (TK()) return false;
      if (!_7("allow_product_feedback")) return false;
      if (jUH().kind === "disabled") return false;
      if (ma6()) return true;
      if (N_().transcriptShareDismissed) return false;
      let e = t === "bad" ? A.probability : f.probability;
      return Math.random() <= e;
    }, [A.probability, f.probability]),
    I = G0.useCallback((t, e) => {
      let _H = e === "good" ? "good_feedback_survey" : "bad_feedback_survey";
      c("tengu_feedback_survey_event", {
        ...W.current,
        event_type: K_("transcript_prompt_appeared"),
        appearance_id: a8(t),
        last_assistant_message_id: a8(z.current),
        survey_type: QH(K),
        trigger: QH(_H)
      }), o1("feedback_survey", {
        event_type: "transcript_prompt_appeared",
        appearance_id: t,
        survey_type: K,
        enabled_via_override: lOH()
      });
    }, [K]),
    m = G0.useCallback(async (t, e, _H) => {
      let qH = _H === "good" ? "good_feedback_survey" : "bad_feedback_survey";
      if (c("tengu_feedback_survey_event", {
        ...W.current,
        event_type: `transcript_share_${e}`,
        appearance_id: a8(t),
        last_assistant_message_id: a8(z.current),
        survey_type: QH(K),
        trigger: QH(qH)
      }), e === "dont_ask_again") M6(KH => ({
        ...KH,
        transcriptShareDismissed: true
      }));
      if (e === "yes") {
        let KH = await Ia6(P.current, qH, t);
        return c("tengu_feedback_survey_event", {
          ...W.current,
          event_type: K_(KH.success ? "transcript_share_submitted" : "transcript_share_failed"),
          appearance_id: t,
          trigger: QH(qH),
          error_code: KH.errorCode
        }), KH;
      }
      return false;
    }, [K]),
    {
      state: b,
      lastResponse: p,
      appearanceId: U,
      transcriptBundlePath: Q,
      open: g,
      handleSelect: d,
      handleUndo: l,
      handleTranscriptSelect: n
    } = H$_({
      otherSurveyActive: T,
      hideThanksAfterMs: w.hideThanksAfterMs,
      onOpen: v,
      onSelect: C,
      shouldShowTranscriptPrompt: S,
      onTranscriptPromptShown: I,
      onTranscriptSelect: m
    }),
    o = Q9(),
    i = G0.useMemo(() => {
      if (w.onForModels.length === 0) return false;
      if (w.onForModels.includes("*")) return true;
      return w.onForModels.includes(o);
    }, [w.onForModels, o]),
    a = G0.useMemo(() => {
      if (b !== "closed") return false;
      if (_) return false;
      if (!k) return false;
      if (V) return false;
      if (O) return false;
      if (T) return false;
      if (dH.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY) return false;
      if (nOH()) return false;
      if (!_7("allow_product_feedback")) return false;
      if (T_(process.env.CLAUDE_FORCE_DISPLAY_SURVEY) && !$.timeLastShown) return true;
      if (!i) return false;
      let t = J.now();
      if ($.timeLastShownAtClock !== null) {
        if (t - $.timeLastShownAtClock < w.minTimeBetweenFeedbackMs) return false;
        if ($.submitCountAtLastAppearance !== null && q < $.submitCountAtLastAppearance + w.minUserTurnsBetweenFeedback) return false;
      } else {
        if (t - D.current < w.minTimeBeforeFeedbackMs) return false;
        if (q < M.current + w.minUserTurnsBeforeFeedback) return false;
      }
      if (R.current !== q) R.current = q, G.current = Math.random() <= (j ?? w.probability);
      if (!G.current) return false;
      let e = N_().feedbackSurveyState;
      if (e?.lastShownTime) {
        if (Date.now() - e.lastShownTime < w.minTimeBetweenGlobalFeedbackMs) return false;
      }
      return true;
    }, [J, b, _, k, V, O, T, i, $.timeLastShown, $.timeLastShownAtClock, $.submitCountAtLastAppearance, q, w.minTimeBetweenFeedbackMs, w.minTimeBetweenGlobalFeedbackMs, w.minUserTurnsBetweenFeedback, w.minTimeBeforeFeedbackMs, w.minUserTurnsBeforeFeedback, w.probability, j]);
  return G0.useEffect(() => {
    if (a) g();
  }, [a, g]), {
    state: b,
    lastResponse: p,
    appearanceId: U,
    transcriptBundlePath: Q,
    handleSelect: d,
    handleUndo: l,
    handleTranscriptSelect: n
  };
}
var G0;
var hasNonSecretEnvKeys = L(() => {
  A_();
  c4H();
  Jo4();
  Mo4();
  qg();
  v_();
  iH();
  LJ();
  JUH();
  t5();
  O8();
  l8();
  $6();
  Aq();
  Qq();
  hO();
  v8();
  _j();
  ikq();
  rkq();
  akq();
  ua6();
  tkq();
  G0 = x(WH(), 1);
});

export {hasProxyAuthHelper as TZl,G0 as Fx,hasNonSecretEnvKeys as SZl};
