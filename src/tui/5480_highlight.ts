// @ts-nocheck
import {ay,E$} from "../../vendor/m2821.ts";
import {yIe,x3e} from "../../vendor/m3323.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {s9n,m3t} from "../../vendor/m3955.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {bo,_t,uo} from "../../vendor/m2468.ts";
import {W_t,G_t,V_t} from "../../vendor/m5292.ts";
import {FE,V1} from "../../vendor/m4006.ts";
import {gg,t1} from "../telemetry/2542_ignore1mTag.ts";
import {GD,Dw} from "../core/5176_encoding.ts";
import {fZl,hZl} from "../../vendor/m5478.ts";
import {_g,zR} from "../../vendor/m2562.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {ep} from "../../vendor/m2223.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {cZl,uZl} from "../../vendor/m5476.ts";
import {pZl,mZl} from "../../vendor/m5477.ts";
import {Gtt,FAn} from "../../vendor/m2464.ts";
import {gO,f4} from "../telemetry/2522_error_name.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {IA} from "../telemetry/2225_names.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function gZl(props) {
  let $cache = UBo.c(5),
    config = ay(),
    highlighter;
  if ($cache[0] !== config.syntaxHighlightingDisabled) highlighter = config.syntaxHighlightingDisabled ? null : yIe(), $cache[0] = config.syntaxHighlightingDisabled, $cache[1] = highlighter;else highlighter = $cache[1];
  let resolvedHighlighter = highlighter,
    element;
  if ($cache[2] !== resolvedHighlighter || $cache[3] !== props) element = lzt.jsx(z$m, {
    ...props,
    highlight: resolvedHighlighter
  }), $cache[2] = resolvedHighlighter, $cache[3] = props, $cache[4] = element;else element = $cache[4];
  return element;
}
function z$m(props) {
  let $cache = UBo.c(83),
    {
      payload: payload,
      answer: respond,
      highlight: highlighter
    } = props,
    questions = payload.questions,
    metadataSource = payload.metadataSource,
    [theme] = ji(),
    maxContentWidth = K$m;
  for (let question of questions) for (let option of question.options) {
    if (!option.preview) continue;
    let highlighted = s9n(option.preview, theme, highlighter);
    for (let line of highlighted.split(`
`)) maxContentWidth = Math.max(maxContentWidth, sn(line));
  }
  let minContentWidth = maxContentWidth,
    initialPastedContents;
  if ($cache[0] === Symbol.for("react.memo_cache_sentinel")) initialPastedContents = {}, $cache[0] = initialPastedContents;else initialPastedContents = $cache[0];
  let [pastedContents, setPastedContents] = Atr.useState(initialPastedContents),
    imageIdCounter = Atr.useRef(0),
    terminalSize = bo(),
    handleImagePasteImpl;
  if ($cache[1] !== terminalSize) handleImagePasteImpl = function (questionKey, content, mediaType, filename, dimensions, _unused) {
    imageIdCounter.current = imageIdCounter.current + 1;
    let imageId = imageIdCounter.current,
      attachment = {
        id: imageId,
        type: "image",
        content: content,
        mediaType: mediaType || "image/png",
        filename: filename || "Pasted image",
        dimensions: dimensions
      };
    W_t(attachment, terminalSize), G_t(attachment, terminalSize), setPastedContents(prev => ({
      ...prev,
      [questionKey]: {
        ...(prev[questionKey] ?? {}),
        [imageId]: attachment
      }
    }));
  }, $cache[1] = terminalSize, $cache[2] = handleImagePasteImpl;else handleImagePasteImpl = $cache[2];
  let handleImagePaste = handleImagePasteImpl,
    handleRemoveImageImpl;
  if ($cache[3] === Symbol.for("react.memo_cache_sentinel")) handleRemoveImageImpl = (questionKey, imageId) => {
    setPastedContents(prev => {
      let next = {
        ...(prev[questionKey] ?? {})
      };
      return delete next[imageId], {
        ...prev,
        [questionKey]: next
      };
    });
  }, $cache[3] = handleRemoveImageImpl;else handleRemoveImageImpl = $cache[3];
  let handleRemoveImage = handleRemoveImageImpl,
    imageAttachmentsMemo;
  if ($cache[4] !== pastedContents) imageAttachmentsMemo = Object.values(pastedContents).flatMap(Q$m).filter(X$m), $cache[4] = pastedContents, $cache[5] = imageAttachmentsMemo;else imageAttachmentsMemo = $cache[5];
  let imageAttachments = imageAttachmentsMemo,
    permissionMode = _t(J$m),
    rawImageLimits = FE(),
    imageLimitsMemo;
  if ($cache[6] !== rawImageLimits) imageLimitsMemo = gg(rawImageLimits), $cache[6] = rawImageLimits, $cache[7] = imageLimitsMemo;else imageLimitsMemo = $cache[7];
  let imageLimits = imageLimitsMemo,
    isInPlanMode = permissionMode === "plan",
    planFilePathMemo;
  if ($cache[8] !== isInPlanMode) planFilePathMemo = isInPlanMode ? GD() : undefined, $cache[8] = isInPlanMode, $cache[9] = planFilePathMemo;else planFilePathMemo = $cache[9];
  let planFilePath = planFilePathMemo,
    questionNav = fZl(),
    {
      currentQuestionIndex: currentQuestionIndex,
      answers: answers,
      questionStates: questionStates,
      isInTextInput: isInTextInput,
      nextQuestion: nextQuestion,
      prevQuestion: prevQuestion,
      updateQuestionState: updateQuestionState,
      setAnswer: setAnswer,
      setTextInputMode: setTextInputMode
    } = questionNav;
  _g("ask-user-question-text-input", isInTextInput);
  let currentQuestion = currentQuestionIndex < (questions?.length || 0) ? questions?.[currentQuestionIndex] : null,
    isOnSubmitTab = currentQuestionIndex === (questions?.length || 0),
    allAnsweredMemo;
  if ($cache[10] !== answers || $cache[11] !== questions) allAnsweredMemo = questions?.every(question => question?.question && !!answers[question.question]) ?? false, $cache[10] = answers, $cache[11] = questions, $cache[12] = allAnsweredMemo;else allAnsweredMemo = $cache[12];
  let allQuestionsAnswered = allAnsweredMemo,
    isSingleSelectQuestion = questions.length === 1 && !questions[0]?.multiSelect,
    handleCancelImpl;
  if ($cache[13] !== respond || $cache[14] !== isInPlanMode || $cache[15] !== metadataSource || $cache[16] !== questions.length) handleCancelImpl = () => {
    if (metadataSource) W("tengu_ask_user_question_rejected", {
      source_hash: ep(metadataSource),
      questionCount: questions.length,
      isInPlanMode: isInPlanMode
    });
    respond({
      behavior: "deny"
    });
  }, $cache[13] = respond, $cache[14] = isInPlanMode, $cache[15] = metadataSource, $cache[16] = questions.length, $cache[17] = handleCancelImpl;else handleCancelImpl = $cache[17];
  let handleCancel = handleCancelImpl,
    handleRespondToClaudeImpl;
  if ($cache[18] !== imageAttachments || $cache[19] !== respond || $cache[20] !== answers || $cache[21] !== imageLimits || $cache[22] !== isInPlanMode || $cache[23] !== metadataSource || $cache[24] !== questionStates || $cache[25] !== questions) handleRespondToClaudeImpl = async () => {
    let denyResult = await e9m({
      questions: questions,
      answers: answers,
      questionStates: questionStates,
      imageAttachments: imageAttachments,
      imageLimits: imageLimits
    });
    if (metadataSource) W("tengu_ask_user_question_respond_to_claude", {
      source_hash: ep(metadataSource),
      questionCount: questions.length,
      isInPlanMode: isInPlanMode
    });
    respond(denyResult);
  }, $cache[18] = imageAttachments, $cache[19] = respond, $cache[20] = answers, $cache[21] = imageLimits, $cache[22] = isInPlanMode, $cache[23] = metadataSource, $cache[24] = questionStates, $cache[25] = questions, $cache[26] = handleRespondToClaudeImpl;else handleRespondToClaudeImpl = $cache[26];
  let handleRespondToClaude = handleRespondToClaudeImpl,
    submitAnswersImpl;
  if ($cache[27] !== imageAttachments || $cache[28] !== respond || $cache[29] !== imageLimits || $cache[30] !== isInPlanMode || $cache[31] !== metadataSource || $cache[32] !== payload.input || $cache[33] !== questionStates || $cache[34] !== questions) submitAnswersImpl = async answersToSubmit => {
    let allowResult = await Z$m({
      questions: questions,
      answersToSubmit: answersToSubmit,
      questionStates: questionStates,
      input: payload.input,
      imageAttachments: imageAttachments,
      imageLimits: imageLimits
    });
    if (metadataSource) W("tengu_ask_user_question_accepted", {
      source_hash: ep(metadataSource),
      questionCount: questions.length,
      answerCount: Object.keys(answersToSubmit).length,
      isInPlanMode: isInPlanMode
    });
    respond(allowResult);
  }, $cache[27] = imageAttachments, $cache[28] = respond, $cache[29] = imageLimits, $cache[30] = isInPlanMode, $cache[31] = metadataSource, $cache[32] = payload.input, $cache[33] = questionStates, $cache[34] = questions, $cache[35] = submitAnswersImpl;else submitAnswersImpl = $cache[35];
  let submitAnswers = submitAnswersImpl,
    handleAnswerImpl;
  if ($cache[36] !== answers || $cache[37] !== pastedContents || $cache[38] !== questions.length || $cache[39] !== setAnswer || $cache[40] !== submitAnswers) handleAnswerImpl = (questionKey, value, previewLabel, advanceFlag) => {
    let shouldAdvance = advanceFlag === undefined ? true : advanceFlag,
      answerValue,
      isMultiValue = Array.isArray(value);
    if (isMultiValue) answerValue = value.join(", ");else if (previewLabel) answerValue = Object.values(pastedContents[questionKey] ?? {}).filter(Y$m).length > 0 ? `${previewLabel} (Image attached)` : previewLabel;else if (value === "__other__") answerValue = Object.values(pastedContents[questionKey] ?? {}).filter(j$m).length > 0 ? "(Image attached)" : value;else answerValue = value;
    let isSingleQuestion = questions.length === 1;
    if (!isMultiValue && isSingleQuestion && shouldAdvance) {
      let updatedAnswers = {
        ...answers,
        [questionKey]: answerValue
      };
      submitAnswers(updatedAnswers).catch(Ie);
      return;
    }
    setAnswer(questionKey, answerValue, shouldAdvance);
  }, $cache[36] = answers, $cache[37] = pastedContents, $cache[38] = questions.length, $cache[39] = setAnswer, $cache[40] = submitAnswers, $cache[41] = handleAnswerImpl;else handleAnswerImpl = $cache[41];
  let handleAnswer = handleAnswerImpl,
    handleFinalResponseImpl;
  if ($cache[42] !== answers || $cache[43] !== handleCancel || $cache[44] !== submitAnswers) handleFinalResponseImpl = function (action) {
    if (action === "cancel") {
      handleCancel();
      return;
    }
    if (action === "submit") submitAnswers(answers).catch(Ie);
  }, $cache[42] = answers, $cache[43] = handleCancel, $cache[44] = submitAnswers, $cache[45] = handleFinalResponseImpl;else handleFinalResponseImpl = $cache[45];
  let handleFinalResponse = handleFinalResponseImpl,
    lastTabIndex = isSingleSelectQuestion ? (questions?.length || 1) - 1 : questions?.length || 0,
    handleTabPrevImpl;
  if ($cache[46] !== currentQuestionIndex || $cache[47] !== prevQuestion) handleTabPrevImpl = () => {
    if (currentQuestionIndex > 0) prevQuestion();
  }, $cache[46] = currentQuestionIndex, $cache[47] = prevQuestion, $cache[48] = handleTabPrevImpl;else handleTabPrevImpl = $cache[48];
  let handleTabPrev = handleTabPrevImpl,
    handleTabNextImpl;
  if ($cache[49] !== currentQuestionIndex || $cache[50] !== lastTabIndex || $cache[51] !== nextQuestion) handleTabNextImpl = () => {
    if (currentQuestionIndex < lastTabIndex) nextQuestion();
  }, $cache[49] = currentQuestionIndex, $cache[50] = lastTabIndex, $cache[51] = nextQuestion, $cache[52] = handleTabNextImpl;else handleTabNextImpl = $cache[52];
  let handleTabNext = handleTabNextImpl,
    tabBindingsMemo;
  if ($cache[53] !== handleTabNext || $cache[54] !== handleTabPrev) tabBindingsMemo = {
    "tabs:previous": handleTabPrev,
    "tabs:next": handleTabNext
  }, $cache[53] = handleTabNext, $cache[54] = handleTabPrev, $cache[55] = tabBindingsMemo;else tabBindingsMemo = $cache[55];
  let tabBindings = !(isInTextInput && !isOnSubmitTab),
    tabsActive;
  if ($cache[56] !== tabBindings) tabsActive = {
    context: "Tabs",
    isActive: tabBindings
  }, $cache[56] = tabBindings, $cache[57] = tabsActive;else tabsActive = $cache[57];
  Oo(tabBindingsMemo, tabsActive);
  let we;
  if ($cache[58] !== allQuestionsAnswered || $cache[59] !== answers || $cache[60] !== currentQuestion || $cache[61] !== currentQuestionIndex || $cache[62] !== minContentWidth || $cache[63] !== handleCancel || $cache[64] !== handleFinalResponse || $cache[65] !== handleAnswer || $cache[66] !== handleRespondToClaude || $cache[67] !== handleTabNext || $cache[68] !== handleTabPrev || $cache[69] !== isSingleSelectQuestion || $cache[70] !== isOnSubmitTab || $cache[71] !== nextQuestion || $cache[72] !== handleImagePaste || $cache[73] !== pastedContents || $cache[74] !== payload.permissionResult || $cache[75] !== planFilePath || $cache[76] !== questionStates || $cache[77] !== questions || $cache[78] !== setTextInputMode || $cache[79] !== updateQuestionState) we = currentQuestion ? lzt.jsx(cZl, {
    question: currentQuestion,
    questions: questions,
    currentQuestionIndex: currentQuestionIndex,
    answers: answers,
    questionStates: questionStates,
    hideSubmitTab: isSingleSelectQuestion,
    minContentWidth: minContentWidth,
    planFilePath: planFilePath,
    onUpdateQuestionState: updateQuestionState,
    onAnswer: handleAnswer,
    onTextInputFocus: setTextInputMode,
    onCancel: handleCancel,
    onSubmit: nextQuestion,
    onTabPrev: handleTabPrev,
    onTabNext: handleTabNext,
    onRespondToClaude: handleRespondToClaude,
    onImagePaste: (We, Fe, ke, Ue, Ge) => handleImagePaste(currentQuestion.question, We, Fe, ke, Ue, Ge),
    pastedContents: pastedContents[currentQuestion.question] ?? {},
    onRemoveImage: We => handleRemoveImage(currentQuestion.question, We)
  }) : isOnSubmitTab ? lzt.jsx(pZl, {
    questions: questions,
    currentQuestionIndex: currentQuestionIndex,
    answers: answers,
    allQuestionsAnswered: allQuestionsAnswered,
    permissionResult: payload.permissionResult,
    onFinalResponse: handleFinalResponse
  }) : null, $cache[58] = allQuestionsAnswered, $cache[59] = answers, $cache[60] = currentQuestion, $cache[61] = currentQuestionIndex, $cache[62] = minContentWidth, $cache[63] = handleCancel, $cache[64] = handleFinalResponse, $cache[65] = handleAnswer, $cache[66] = handleRespondToClaude, $cache[67] = handleTabNext, $cache[68] = handleTabPrev, $cache[69] = isSingleSelectQuestion, $cache[70] = isOnSubmitTab, $cache[71] = nextQuestion, $cache[72] = handleImagePaste, $cache[73] = pastedContents, $cache[74] = payload.permissionResult, $cache[75] = planFilePath, $cache[76] = questionStates, $cache[77] = questions, $cache[78] = setTextInputMode, $cache[79] = updateQuestionState, $cache[80] = we;else we = $cache[80];
  let Oe;
  if ($cache[81] !== we) Oe = lzt.jsx(Gtt, {
    children: we
  }), $cache[81] = we, $cache[82] = Oe;else Oe = $cache[82];
  return Oe;
}
function j$m(attachment) {
  return attachment.type === "image";
}
function Y$m(attachment) {
  return attachment.type === "image";
}
function J$m(state) {
  return state.toolPermissionContext.mode;
}
function X$m(attachment) {
  return attachment.type === "image";
}
function Q$m(perQuestion) {
  return Object.values(perQuestion);
}
async function Z$m(args) {
  let {
      questions: questions,
      answersToSubmit: answersToSubmit,
      questionStates: questionStates,
      input: input
    } = args,
    annotations = {};
  for (let question of questions) {
    let answer = answersToSubmit[question.question],
      textInputValue = _Zl(question) ? questionStates[question.question]?.textInputValue : undefined,
      preview = (answer ? question.options.find(option => option.label === answer) : undefined)?.preview;
    if (preview || textInputValue?.trim()) annotations[question.question] = {
      ...(preview && {
        preview: preview
      }),
      ...(textInputValue?.trim() && {
        notes: textInputValue.trim()
      })
    };
  }
  let updatedInput = {
      ...input,
      answers: answersToSubmit,
      annotations: annotations
    },
    contentBlocks = await yZl(args.imageAttachments, args.imageLimits);
  return {
    behavior: "allow",
    updatedInput: updatedInput,
    ...(contentBlocks && contentBlocks.length > 0 && {
      contentBlocks: contentBlocks
    })
  };
}
async function e9m(args) {
  let {
      questions: questions,
      answers: answers,
      questionStates: questionStates
    } = args,
    feedback = `The user wants to clarify these questions.
    This means they may have additional information, context or questions for you.
    Take their response into account and then reformulate the questions if appropriate.
    Start by asking them what they would like to clarify.

    Questions asked:
${t9m(questions, answers, questionStates)}`,
    contentBlocks = await yZl(args.imageAttachments, args.imageLimits);
  return {
    behavior: "deny",
    feedback: feedback,
    ...(contentBlocks && contentBlocks.length > 0 && {
      contentBlocks: contentBlocks
    })
  };
}
function t9m(questions, answers, questionStates) {
  return questions.map(question => {
    let answer = answers[question.question],
      notes = _Zl(question) ? questionStates[question.question]?.textInputValue?.trim() : undefined,
      lines = [`- "${question.question}"`];
    if (lines.push(answer ? `  Answer: ${answer}` : "  (No answer provided)"), notes) lines.push(`  User notes: ${notes}`);
    return lines.join(`
`);
  }).join(`
`);
}
function _Zl(question) {
  return !question.multiSelect && question.options.some(option => option.preview);
}
async function yZl(attachments, limits) {
  if (attachments.length === 0) return;
  return Promise.all(attachments.map(async attachment => {
    let {
      block: block
    } = await gO({
      data: attachment.content,
      mediaType: attachment.mediaType,
      limits: limits
    });
    return block;
  }));
}
var UBo,
  Atr,
  lzt,
  K$m = 40;
var TZl = b(() => {
  FAn();
  uZl();
  mZl();
  hZl();
  zR();
  V1();
  E$();
  mc();
  je();
  ss();
  kt();
  uo();
  x3e();
  IA();
  f4();
  V_t();
  vn();
  m3t();
  t1();
  Dw();
  UBo = x(tt(), 1), Atr = x(et(), 1), lzt = x(oe(), 1);
});

export {gZl,z$m,j$m,Y$m,J$m,X$m,Q$m,Z$m,e9m,t9m,_Zl,yZl,UBo,Atr,lzt,K$m,TZl};
