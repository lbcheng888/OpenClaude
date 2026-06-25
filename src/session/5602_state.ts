// @ts-nocheck
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {ynr,Plc,Olc} from "./5601_onSelect.ts";
import {f4a,_xe,Y3t} from "../../vendor/m4045.ts";
import {o2o,_nr,s2o} from "../../vendor/m5598.ts";
import {Hlc,Ilc} from "../../vendor/m5599.ts";
import {Cnt,ss} from "../../vendor/m2553.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Ne} from "../../vendor/m583.ts";
import {lnr,ZUo} from "../../vendor/m5589.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Bo,Le} from "../../vendor/m5.ts";
import {adl} from "../../vendor/m4495.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Feedback survey state renderer.
 *
 * Renders the appropriate UI for a feedback survey based on its current state:
 * pending undo prompt, thanks/follow-up, transcript sharing flow, or the rating
 * question itself. Uses React forget-style memo caches (`i2o.c(n)`) to memoize
 * each JSX subtree against its dependencies.
 */

interface FeedbackSurveyProps {
  /** Current survey state machine value. */
  state:
    | "closed"
    | "pending"
    | "thanks"
    | "submitted"
    | "submitting"
    | "transcript_prompt"
    | string;
  /** The user's last rating response (e.g. "good" | "bad" | ...), or null/"dismissed". */
  lastResponse: string | null;
  /** Invoked when the user picks a rating. */
  handleSelect: (...args: any[]) => any;
  /** Invoked when the user undoes their feedback. */
  handleUndo: (...args: any[]) => any;
  /** Invoked when the user selects a transcript-sharing option. */
  handleTranscriptSelect: ((...args: any[]) => any) | undefined;
  /** Current text input value. */
  inputValue: string;
  /** Updates the text input value. */
  setInputValue: (value: string) => void;
  /** Requests follow-up feedback (e.g. opens /feedback). */
  onRequestFeedback: ((command: string) => any) | undefined;
  /** Identifier for the survey appearance/placement. */
  appearanceId: any;
  /** Type of survey shown. */
  surveyType: any;
  /** Message shown alongside the rating question. */
  message: any;
  /** Memory evaluation payload, if this is a memory survey. */
  memoryEvaluation: any;
  /** Whether to offer a "Not sure" option; defaults to false. */
  showNotSure: boolean | undefined;
  /** Path to the saved transcript bundle, if any. */
  transcriptBundlePath: string | undefined;
}

function kzt(props: FeedbackSurveyProps) {
  let memoCache = i2o.c(33),
    {
      state: surveyState,
      lastResponse,
      handleSelect,
      handleUndo,
      handleTranscriptSelect,
      inputValue,
      setInputValue,
      onRequestFeedback,
      appearanceId,
      surveyType,
      message,
      memoryEvaluation,
      showNotSure,
      transcriptBundlePath
    } = props,
    showNotSureResolved = showNotSure === void 0 ? !1 : showNotSure;
  if (surveyState === "closed") return null;
  if (surveyState === "pending") {
    let pendingNode;
    if (memoCache[0] !== handleUndo || memoCache[1] !== lastResponse)
      (pendingNode = bv.jsx(QWm, {
        lastResponse,
        onUndo: handleUndo
      })),
        (memoCache[0] = handleUndo),
        (memoCache[1] = lastResponse),
        (memoCache[2] = pendingNode);
    else pendingNode = memoCache[2];
    return pendingNode;
  }
  if (surveyState === "thanks") {
    let thanksNode;
    if (
      memoCache[3] !== appearanceId ||
      memoCache[4] !== inputValue ||
      memoCache[5] !== lastResponse ||
      memoCache[6] !== onRequestFeedback ||
      memoCache[7] !== setInputValue ||
      memoCache[8] !== surveyType
    )
      (thanksNode = bv.jsx(tGm, {
        lastResponse,
        inputValue,
        setInputValue,
        onRequestFeedback,
        appearanceId,
        surveyType
      })),
        (memoCache[3] = appearanceId),
        (memoCache[4] = inputValue),
        (memoCache[5] = lastResponse),
        (memoCache[6] = onRequestFeedback),
        (memoCache[7] = setInputValue),
        (memoCache[8] = surveyType),
        (memoCache[9] = thanksNode);
    else thanksNode = memoCache[9];
    return thanksNode;
  }
  if (surveyState === "submitted") {
    if (transcriptBundlePath) {
      let savedLabel;
      if (memoCache[10] === Symbol.for("react.memo_cache_sentinel"))
        (savedLabel = bv.jsxs(v, {
          color: "success",
          children: ["\u2713", " Transcript bundle saved"]
        })),
          (memoCache[10] = savedLabel);
      else savedLabel = memoCache[10];
      let pathLabel;
      if (memoCache[11] !== transcriptBundlePath)
        (pathLabel = bv.jsx(v, {
          dimColor: !0,
          wrap: "wrap",
          children: transcriptBundlePath
        })),
          (memoCache[11] = transcriptBundlePath),
          (memoCache[12] = pathLabel);
      else pathLabel = memoCache[12];
      let instructionLabel;
      if (memoCache[13] === Symbol.for("react.memo_cache_sentinel"))
        (instructionLabel = bv.jsx(v, {
          wrap: "wrap",
          children:
            "Send this file to your Anthropic account representative or attach it to your support request."
        })),
          (memoCache[13] = instructionLabel);
      else instructionLabel = memoCache[13];
      let bundleBox;
      if (memoCache[14] !== pathLabel)
        (bundleBox = bv.jsxs($, {
          marginTop: 1,
          flexDirection: "column",
          children: [savedLabel, pathLabel, instructionLabel]
        })),
          (memoCache[14] = pathLabel),
          (memoCache[15] = bundleBox);
      else bundleBox = memoCache[15];
      return bundleBox;
    }
    let thanksTranscriptNode;
    if (memoCache[16] === Symbol.for("react.memo_cache_sentinel"))
      (thanksTranscriptNode = bv.jsx($, {
        marginTop: 1,
        children: bv.jsxs(v, {
          color: "success",
          children: ["\u2713", " Thanks for sharing your transcript!"]
        })
      })),
        (memoCache[16] = thanksTranscriptNode);
    else thanksTranscriptNode = memoCache[16];
    return thanksTranscriptNode;
  }
  if (surveyState === "submitting") {
    let submittingNode;
    if (memoCache[17] === Symbol.for("react.memo_cache_sentinel"))
      (submittingNode = bv.jsx($, {
        marginTop: 1,
        children: bv.jsxs(v, {
          dimColor: !0,
          children: ["Sharing transcript", "\u2026"]
        })
      })),
        (memoCache[17] = submittingNode);
    else submittingNode = memoCache[17];
    return submittingNode;
  }
  if (surveyState === "transcript_prompt") {
    if (!handleTranscriptSelect) return null;
    if (inputValue && !ynr(inputValue.toLowerCase())) return null;
    let transcriptPromptNode;
    if (
      memoCache[18] !== handleTranscriptSelect ||
      memoCache[19] !== inputValue ||
      memoCache[20] !== setInputValue
    )
      (transcriptPromptNode = bv.jsx(Plc, {
        onSelect: handleTranscriptSelect,
        inputValue,
        setInputValue
      })),
        (memoCache[18] = handleTranscriptSelect),
        (memoCache[19] = inputValue),
        (memoCache[20] = setInputValue),
        (memoCache[21] = transcriptPromptNode);
    else transcriptPromptNode = memoCache[21];
    return transcriptPromptNode;
  }
  let normalizedInput = inputValue.length === 1 ? f4a(inputValue) : inputValue;
  if (normalizedInput && !o2o(normalizedInput, showNotSureResolved)) return null;
  if (memoryEvaluation) {
    let memoryNode;
    if (
      memoCache[22] !== handleSelect ||
      memoCache[23] !== inputValue ||
      memoCache[24] !== memoryEvaluation ||
      memoCache[25] !== setInputValue
    )
      (memoryNode = bv.jsx(Hlc, {
        evaluation: memoryEvaluation,
        onSelect: handleSelect,
        inputValue,
        setInputValue
      })),
        (memoCache[22] = handleSelect),
        (memoCache[23] = inputValue),
        (memoCache[24] = memoryEvaluation),
        (memoCache[25] = setInputValue),
        (memoCache[26] = memoryNode);
    else memoryNode = memoCache[26];
    return memoryNode;
  }
  let questionNode;
  if (
    memoCache[27] !== handleSelect ||
    memoCache[28] !== inputValue ||
    memoCache[29] !== message ||
    memoCache[30] !== setInputValue ||
    memoCache[31] !== showNotSureResolved
  )
    (questionNode = bv.jsx(_nr, {
      onSelect: handleSelect,
      inputValue,
      setInputValue,
      message,
      showNotSure: showNotSureResolved
    })),
      (memoCache[27] = handleSelect),
      (memoCache[28] = inputValue),
      (memoCache[29] = message),
      (memoCache[30] = setInputValue),
      (memoCache[31] = showNotSureResolved),
      (memoCache[32] = questionNode);
  else questionNode = memoCache[32];
  return questionNode;
}

/**
 * "Pending" feedback view: shows the recorded rating with an escape-to-undo hint.
 */
function QWm(props: { lastResponse: string | null; onUndo: (...args: any[]) => any }) {
  let memoCache = i2o.c(7),
    { lastResponse, onUndo } = props,
    onKey;
  if (memoCache[0] !== onUndo)
    (onKey = (_input: any, key: any) => {
      if (key.escape) return onUndo(), !0;
    }),
      (memoCache[0] = onUndo),
      (memoCache[1] = onKey);
  else onKey = memoCache[1];
  Cnt(onKey);
  let responseLabel =
      lastResponse && lastResponse !== "dismissed" ? XWm[lastResponse] : "",
    responseNode;
  if (memoCache[2] !== responseLabel)
    (responseNode = bv.jsx(v, {
      color: "text",
      children: responseLabel
    })),
      (memoCache[2] = responseLabel),
      (memoCache[3] = responseNode);
  else responseNode = memoCache[3];
  let undoChord;
  if (memoCache[4] === Symbol.for("react.memo_cache_sentinel"))
    (undoChord = bv.jsx(at, {
      chord: "escape",
      action: "undo"
    })),
      (memoCache[4] = undoChord);
  else undoChord = memoCache[4];
  let pendingRow;
  if (memoCache[5] !== responseNode)
    (pendingRow = bv.jsx($, {
      marginTop: 1,
      children: bv.jsxs(v, {
        dimColor: !0,
        children: ["Feedback: ", responseNode, " \xB7", " ", undoChord]
      })
    })),
      (memoCache[5] = responseNode),
      (memoCache[6] = pendingRow);
  else pendingRow = memoCache[6];
  return pendingRow;
}

/**
 * "Thanks" follow-up view: after a rating, optionally invites the user to press
 * a digit to leave detailed feedback (/feedback), logging a survey event.
 */
function tGm({
  lastResponse,
  inputValue,
  setInputValue,
  onRequestFeedback,
  appearanceId,
  surveyType
}: {
  lastResponse: string | null;
  inputValue: string;
  setInputValue: (value: string) => void;
  onRequestFeedback: ((command: string) => any) | undefined;
  appearanceId: any;
  surveyType: any;
}) {
  let resolvedResponse =
      lastResponse && lastResponse !== "dismissed" ? lastResponse : null,
    feedbackCommand = resolvedResponse ? "/feedback" : null,
    feedbackDisabled = Ne.DISABLE_FEEDBACK_COMMAND || Ne.DISABLE_BUG_COMMAND,
    canPromptFollowup = Boolean(
      onRequestFeedback &&
        resolvedResponse &&
        !(feedbackCommand === "/feedback" && feedbackDisabled)
    ),
    surveyContext = lnr(),
    surveyContextRef = Llc.useRef(surveyContext);
  return (
    (surveyContextRef.current = surveyContext),
    _xe({
      inputValue,
      setInputValue,
      isValidDigit: ZWm,
      enabled: canPromptFollowup,
      once: !0,
      mountDelayMs: 0,
      onDigit: () => {
        if (
          (W("tengu_feedback_survey_event", {
            ...surveyContextRef.current,
            event_type: Ve("followup_accepted"),
            response: Bo(lastResponse),
            ...(appearanceId && {
              appearance_id: appearanceId
            }),
            ...(surveyType && {
              survey_type: Le(surveyType)
            })
          }),
          resolvedResponse &&
            feedbackCommand === "/feedback" &&
            appearanceId &&
            surveyType)
        )
          adl({
            appearanceId,
            response: resolvedResponse,
            surveyType,
            setAt: Date.now()
          });
        if (feedbackCommand) onRequestFeedback?.(feedbackCommand);
      }
    }),
    bv.jsxs($, {
      marginTop: 1,
      flexDirection: "column",
      children: [
        bv.jsx(v, {
          color: "success",
          children: "Thanks for the feedback!"
        }),
        canPromptFollowup && resolvedResponse && feedbackCommand
          ? bv.jsxs(v, {
              dimColor: !0,
              children: [
                "(Optional) Press [",
                bv.jsx(v, {
                  color: "ansi:cyan",
                  children: "1"
                }),
                "] to",
                " ",
                eGm[resolvedResponse],
                " \xB7 ",
                feedbackCommand
              ]
            })
          : feedbackDisabled
            ? null
            : bv.jsx(v, {
                dimColor: !0,
                children: "Use /feedback to share detailed feedback anytime."
              })
      ]
    })
  );
}
var i2o: any,
  Llc: any,
  bv: any,
  XWm: Record<string, string>,
  ZWm = (digit: string) => digit === "1",
  eGm: Record<string, string>;
var Mlc = b(() => {
  kt();
  je();
  ss();
  Ir();
  Wo();
  ZUo();
  s2o();
  Ilc();
  Olc();
  Y3t();
  (i2o = x(tt(), 1)), (Llc = x(et(), 1)), (bv = x(oe(), 1));
  XWm = {
    bad: "Bad",
    fine: "Fine",
    good: "Good",
    not_sure: "Unsure"
  };
  eGm = {
    good: "tell us what went well",
    bad: "tell us what went wrong",
    fine: "tell us more",
    not_sure: "tell us more"
  };
});

export {kzt,QWm,tGm,i2o,Llc,bv,XWm,ZWm,eGm,Mlc};
