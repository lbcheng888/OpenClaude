// @ts-nocheck
import {VO as LO} from "../config/2251_zBr.ts";
import {Fm as Gm,Z1 as j1} from "../../vendor/m2693.ts";
import {truncateToWidth as Vs} from "../../vendor/m237.ts";
import {fileReadTool as wY,gct as Vlt} from "../../vendor/m3964.ts";
import {Cs as vs,p5 as z8,Ph as rg} from "../../vendor/m2224.ts";
import {oce as Kle,OY as TY} from "../tools/3871_allowBundle.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Kn as Vn,Li as Di} from "../../vendor/m2572.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {ac as sc,e_ as n_} from "../../vendor/m3338.ts";
import {QM as $M,lv as ov,sl as rl} from "../../vendor/m715.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {Cn as En,dr as fr} from "../../vendor/m231.ts";
import {Link as Fs} from "../../vendor/m2427.ts";
import {Oc as Dc,b_ as T_} from "../../vendor/m2039.ts";
import {pr as Ar,Yl as zl} from "../../vendor/m2562.ts";
import {Bs as Os,rA as lA} from "../../vendor/m2550.ts";
import {avo as nCo,n8t as xjt,lvo as rCo} from "../../vendor/m4862.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {wT as yT,a_e as Vge,lo} from "../tools/5190_userPromptCount.ts";
import {KGn as iGn,KDe as kDe} from "../core/4868_type.ts";
import {teleportResumeCodeSession as K3e,RP as wP} from "./3870_validateSessionRepository.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {jY as xY,Hct as sct} from "./4025_message.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {ps as ds} from "../../vendor/m238.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function getLastToolCallSummary(toolName, toolInput, maxWidth) {
  if (toolName === LO) return "Review the plan in Claude Code on the web";
  if (!toolInput || typeof toolInput !== "object") return toolName;
  if (toolName === Gm && "questions" in toolInput) {
    let questions = toolInput.questions;
    if (Array.isArray(questions) && questions[0] && typeof questions[0] === "object") {
      let questionText = "question" in questions[0] && typeof questions[0].question === "string" && questions[0].question ? questions[0].question : "header" in questions[0] && typeof questions[0].header === "string" ? questions[0].header : null;
      if (questionText) {
        let normalized = questionText.replace(/\s+/g, " ").trim();
        return `Answer in browser: ${Vs(normalized, maxWidth - 10)}`;
      }
    }
  }
  for (let value of Object.values(toolInput)) if (typeof value === "string" && value.trim()) {
    let normalized = value.replace(/\s+/g, " ").trim();
    return `${toolName} ${Vs(normalized, maxWidth)}`;
  }
  return toolName;
}
function UltraplanSessionPanel(props) {
  let reactCompilerCache = jg6.c(78),
    {
      session: session,
      onDone: onDone,
      onBack: onBack,
      onKill: onKill
    } = props,
    isActive = session.status === "running" || session.status === "pending",
    ultraplanPhase = session.ultraplanPhase,
    statusLabel = isActive ? ultraplanPhase ? ultraplanPhaseLabel[ultraplanPhase] : "running" : session.status,
    elapsedTime = wY(session.startTime, isActive, 1000, 0, session.endTime),
    agentSpawnCount = 0,
    toolCallCount = 0,
    lastToolUse = null;
  for (let logEntry of session.log) {
    if (logEntry.type !== "assistant") continue;
    for (let contentBlock of logEntry.message.content) {
      if (contentBlock.type !== "tool_use") continue;
      if (toolCallCount++, lastToolUse = contentBlock, contentBlock.name === vs || contentBlock.name === z8) agentSpawnCount++;
    }
  }
  let agentsWorkingCount = 1 + agentSpawnCount,
    lastToolCallSummary;
  if (reactCompilerCache[0] !== lastToolUse) lastToolCallSummary = lastToolUse ? getLastToolCallSummary(lastToolUse.name, lastToolUse.input, 60) : null, reactCompilerCache[0] = lastToolUse, reactCompilerCache[1] = lastToolCallSummary;else lastToolCallSummary = reactCompilerCache[1];
  let statsObj;
  if (reactCompilerCache[2] !== toolCallCount || reactCompilerCache[3] !== agentsWorkingCount || reactCompilerCache[4] !== lastToolCallSummary) statsObj = {
    agentsWorking: agentsWorkingCount,
    toolCalls: toolCallCount,
    lastToolCall: lastToolCallSummary
  }, reactCompilerCache[2] = toolCallCount, reactCompilerCache[3] = agentsWorkingCount, reactCompilerCache[4] = lastToolCallSummary, reactCompilerCache[5] = statsObj;else statsObj = reactCompilerCache[5];
  let {
      agentsWorking: agentsWorking,
      toolCalls: toolCalls,
      lastToolCall: lastToolCall
    } = statsObj,
    sessionUrl;
  if (reactCompilerCache[6] !== session.sessionId) sessionUrl = Kle(session.sessionId), reactCompilerCache[6] = session.sessionId, reactCompilerCache[7] = sessionUrl;else sessionUrl = reactCompilerCache[7];
  let sessionLink = sessionUrl,
    resolvedOnBack;
  if (reactCompilerCache[8] !== onBack || reactCompilerCache[9] !== onDone) resolvedOnBack = onBack ?? (() => onDone("Cloud session details dismissed", {
    display: "system"
  })), reactCompilerCache[8] = onBack, reactCompilerCache[9] = onDone, reactCompilerCache[10] = resolvedOnBack;else resolvedOnBack = reactCompilerCache[10];
  let handleBack = resolvedOnBack,
    [showStopConfirm, setShowStopConfirm] = B7.useState(false);
  if (showStopConfirm) {
    let onCancelStopDialog;
    if (reactCompilerCache[11] === Symbol.for("react.memo_cache_sentinel")) onCancelStopDialog = () => setShowStopConfirm(false), reactCompilerCache[11] = onCancelStopDialog;else onCancelStopDialog = reactCompilerCache[11];
    let warningText;
    if (reactCompilerCache[12] === Symbol.for("react.memo_cache_sentinel")) warningText = B7.default.createElement(w, {
      dimColor: true
    }, "This will terminate the Claude Code on the web session."), reactCompilerCache[12] = warningText;else warningText = reactCompilerCache[12];
    let confirmLabel = ultraplanPhase === "plan_ready" ? "Terminate session and discard plan" : "Terminate session",
      onConfirmStop;
    if (reactCompilerCache[13] !== handleBack || reactCompilerCache[14] !== onKill) onConfirmStop = () => {
      onKill?.(), handleBack();
    }, reactCompilerCache[13] = handleBack, reactCompilerCache[14] = onKill, reactCompilerCache[15] = onConfirmStop;else onConfirmStop = reactCompilerCache[15];
    let onCancelConfirm;
    if (reactCompilerCache[16] === Symbol.for("react.memo_cache_sentinel")) onCancelConfirm = () => setShowStopConfirm(false), reactCompilerCache[16] = onCancelConfirm;else onCancelConfirm = reactCompilerCache[16];
    let stopDialog;
    if (reactCompilerCache[17] !== confirmLabel || reactCompilerCache[18] !== onConfirmStop) stopDialog = B7.default.createElement(Vn, {
      title: "Stop ultraplan?",
      onCancel: onCancelStopDialog,
      color: "background"
    }, B7.default.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, warningText, B7.default.createElement(sc, {
      confirmLabel: confirmLabel,
      cancelLabel: "Back",
      onConfirm: onConfirmStop,
      onCancel: onCancelConfirm
    }))), reactCompilerCache[17] = confirmLabel, reactCompilerCache[18] = onConfirmStop, reactCompilerCache[19] = stopDialog;else stopDialog = reactCompilerCache[19];
    return stopDialog;
  }
  let titleIcon = ultraplanPhase === "plan_ready" ? $M : ov,
    titleIconEl;
  if (reactCompilerCache[20] !== titleIcon) titleIconEl = B7.default.createElement(w, {
    color: "background"
  }, titleIcon, " "), reactCompilerCache[20] = titleIcon, reactCompilerCache[21] = titleIconEl;else titleIconEl = reactCompilerCache[21];
  let ultraplanLabel;
  if (reactCompilerCache[22] === Symbol.for("react.memo_cache_sentinel")) ultraplanLabel = B7.default.createElement(w, {
    bold: true
  }, "ultraplan"), reactCompilerCache[22] = ultraplanLabel;else ultraplanLabel = reactCompilerCache[22];
  let statusInfo;
  if (reactCompilerCache[23] !== elapsedTime || reactCompilerCache[24] !== statusLabel) statusInfo = B7.default.createElement(w, {
    dimColor: true
  }, " \xB7 ", elapsedTime, " \xB7 ", statusLabel), reactCompilerCache[23] = elapsedTime, reactCompilerCache[24] = statusLabel, reactCompilerCache[25] = statusInfo;else statusInfo = reactCompilerCache[25];
  let titleEl;
  if (reactCompilerCache[26] !== titleIconEl || reactCompilerCache[27] !== statusInfo) titleEl = B7.default.createElement(w, null, titleIconEl, ultraplanLabel, statusInfo), reactCompilerCache[26] = titleIconEl, reactCompilerCache[27] = statusInfo, reactCompilerCache[28] = titleEl;else titleEl = reactCompilerCache[28];
  let planReadyTick;
  if (reactCompilerCache[29] !== ultraplanPhase) planReadyTick = ultraplanPhase === "plan_ready" && B7.default.createElement(w, {
    color: "success"
  }, Ze.tick, " "), reactCompilerCache[29] = ultraplanPhase, reactCompilerCache[30] = planReadyTick;else planReadyTick = reactCompilerCache[30];
  let agentsLabel;
  if (reactCompilerCache[31] !== agentsWorking) agentsLabel = En(agentsWorking, "agent"), reactCompilerCache[31] = agentsWorking, reactCompilerCache[32] = agentsLabel;else agentsLabel = reactCompilerCache[32];
  let agentWorkingVerb = ultraplanPhase ? ultraplanPhaseWorkingVerb[ultraplanPhase] : "working",
    toolCallsLabel;
  if (reactCompilerCache[33] !== toolCalls) toolCallsLabel = En(toolCalls, "call"), reactCompilerCache[33] = toolCalls, reactCompilerCache[34] = toolCallsLabel;else toolCallsLabel = reactCompilerCache[34];
  let statsEl;
  if (reactCompilerCache[35] !== agentsWorking || reactCompilerCache[36] !== planReadyTick || reactCompilerCache[37] !== agentsLabel || reactCompilerCache[38] !== agentWorkingVerb || reactCompilerCache[39] !== toolCallsLabel || reactCompilerCache[40] !== toolCalls) statsEl = B7.default.createElement(w, null, planReadyTick, agentsWorking, " ", agentsLabel, " ", agentWorkingVerb, " \xB7 ", toolCalls, " tool", " ", toolCallsLabel), reactCompilerCache[35] = agentsWorking, reactCompilerCache[36] = planReadyTick, reactCompilerCache[37] = agentsLabel, reactCompilerCache[38] = agentWorkingVerb, reactCompilerCache[39] = toolCallsLabel, reactCompilerCache[40] = toolCalls, reactCompilerCache[41] = statsEl;else statsEl = reactCompilerCache[41];
  let lastToolCallEl;
  if (reactCompilerCache[42] !== lastToolCall) lastToolCallEl = lastToolCall && B7.default.createElement(w, {
    dimColor: true
  }, lastToolCall), reactCompilerCache[42] = lastToolCall, reactCompilerCache[43] = lastToolCallEl;else lastToolCallEl = reactCompilerCache[43];
  let sessionLinkTextEl;
  if (reactCompilerCache[44] !== sessionLink) sessionLinkTextEl = B7.default.createElement(w, {
    dimColor: true
  }, sessionLink), reactCompilerCache[44] = sessionLink, reactCompilerCache[45] = sessionLinkTextEl;else sessionLinkTextEl = reactCompilerCache[45];
  let sessionLinkEl;
  if (reactCompilerCache[46] !== sessionLink || reactCompilerCache[47] !== sessionLinkTextEl) sessionLinkEl = B7.default.createElement(Fs, {
    url: sessionLink
  }, sessionLinkTextEl), reactCompilerCache[46] = sessionLink, reactCompilerCache[47] = sessionLinkTextEl, reactCompilerCache[48] = sessionLinkEl;else sessionLinkEl = reactCompilerCache[48];
  let openLabel = ultraplanPhase === "plan_ready" ? "Review in Claude Code on the web" : ultraplanPhase === "needs_input" ? "Answer in Claude Code on the web" : "Open in Claude Code on the web",
    openDescription;
  if (reactCompilerCache[49] !== ultraplanPhase) openDescription = ultraplanPhase === "plan_ready" && {
    description: "Approve, edit, or comment on the plan"
  }, reactCompilerCache[49] = ultraplanPhase, reactCompilerCache[50] = openDescription;else openDescription = reactCompilerCache[50];
  let openOption;
  if (reactCompilerCache[51] !== openLabel || reactCompilerCache[52] !== openDescription) openOption = {
    label: openLabel,
    value: "open",
    ...openDescription
  }, reactCompilerCache[51] = openLabel, reactCompilerCache[52] = openDescription, reactCompilerCache[53] = openOption;else openOption = reactCompilerCache[53];
  let stopOptions;
  if (reactCompilerCache[54] !== onKill || reactCompilerCache[55] !== ultraplanPhase || reactCompilerCache[56] !== isActive) stopOptions = onKill && isActive ? [{
    label: "Stop ultraplan",
    value: "stop",
    ...(ultraplanPhase === "plan_ready" && {
      description: "Discard the generated plan"
    })
  }] : [], reactCompilerCache[54] = onKill, reactCompilerCache[55] = ultraplanPhase, reactCompilerCache[56] = isActive, reactCompilerCache[57] = stopOptions;else stopOptions = reactCompilerCache[57];
  let backOption;
  if (reactCompilerCache[58] === Symbol.for("react.memo_cache_sentinel")) backOption = {
    label: "Back",
    value: "back"
  }, reactCompilerCache[58] = backOption;else backOption = reactCompilerCache[58];
  let menuOptions;
  if (reactCompilerCache[59] !== openOption || reactCompilerCache[60] !== stopOptions) menuOptions = [openOption, ...stopOptions, backOption], reactCompilerCache[59] = openOption, reactCompilerCache[60] = stopOptions, reactCompilerCache[61] = menuOptions;else menuOptions = reactCompilerCache[61];
  let handleMenuChange;
  if (reactCompilerCache[62] !== handleBack || reactCompilerCache[63] !== onDone || reactCompilerCache[64] !== sessionLink) handleMenuChange = choice => {
    switch (choice) {
      case "open":
        {
          Dc(sessionLink), onDone();
          return;
        }
      case "stop":
        {
          setShowStopConfirm(true);
          return;
        }
      case "back":
        {
          handleBack();
          return;
        }
    }
  }, reactCompilerCache[62] = handleBack, reactCompilerCache[63] = onDone, reactCompilerCache[64] = sessionLink, reactCompilerCache[65] = handleMenuChange;else handleMenuChange = reactCompilerCache[65];
  let menuEl;
  if (reactCompilerCache[66] !== menuOptions || reactCompilerCache[67] !== handleMenuChange) menuEl = B7.default.createElement(Ar, {
    options: menuOptions,
    onChange: handleMenuChange
  }), reactCompilerCache[66] = menuOptions, reactCompilerCache[67] = handleMenuChange, reactCompilerCache[68] = menuEl;else menuEl = reactCompilerCache[68];
  let bodyEl;
  if (reactCompilerCache[69] !== statsEl || reactCompilerCache[70] !== lastToolCallEl || reactCompilerCache[71] !== sessionLinkEl || reactCompilerCache[72] !== menuEl) bodyEl = B7.default.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, statsEl, lastToolCallEl, sessionLinkEl, menuEl), reactCompilerCache[69] = statsEl, reactCompilerCache[70] = lastToolCallEl, reactCompilerCache[71] = sessionLinkEl, reactCompilerCache[72] = menuEl, reactCompilerCache[73] = bodyEl;else bodyEl = reactCompilerCache[73];
  let panelEl;
  if (reactCompilerCache[74] !== handleBack || reactCompilerCache[75] !== titleEl || reactCompilerCache[76] !== bodyEl) panelEl = B7.default.createElement(Vn, {
    title: titleEl,
    onCancel: handleBack,
    color: "background"
  }, bodyEl), reactCompilerCache[74] = handleBack, reactCompilerCache[75] = titleEl, reactCompilerCache[76] = bodyEl, reactCompilerCache[77] = panelEl;else panelEl = reactCompilerCache[77];
  return panelEl;
}
function UltrareviewStageBar(props) {
  let reactCompilerCache = jg6.c(15),
    {
      stage: stage,
      completed: completed,
      hasProgress: hasProgress
    } = props,
    stageIndex;
  if (reactCompilerCache[0] !== stage) stageIndex = stage ? reviewStageOrder.indexOf(stage) : -1, reactCompilerCache[0] = stage, reactCompilerCache[1] = stageIndex;else stageIndex = reactCompilerCache[1];
  let currentStageIdx = stageIndex,
    isSetupPhase = !completed && !hasProgress,
    setupEl;
  if (reactCompilerCache[2] !== isSetupPhase) setupEl = isSetupPhase ? B7.default.createElement(w, {
    color: "background"
  }, "Setup") : B7.default.createElement(w, {
    dimColor: true
  }, "Setup"), reactCompilerCache[2] = isSetupPhase, reactCompilerCache[3] = setupEl;else setupEl = reactCompilerCache[3];
  let arrowEl;
  if (reactCompilerCache[4] === Symbol.for("react.memo_cache_sentinel")) arrowEl = B7.default.createElement(w, {
    dimColor: true
  }, " \u2192 "), reactCompilerCache[4] = arrowEl;else arrowEl = reactCompilerCache[4];
  let stageItems;
  if (reactCompilerCache[5] !== completed || reactCompilerCache[6] !== currentStageIdx || reactCompilerCache[7] !== isSetupPhase) stageItems = reviewStageOrder.map((stageName, idx) => {
    let isCurrentStage = !completed && !isSetupPhase && idx === currentStageIdx;
    return B7.default.createElement(B7.default.Fragment, {
      key: stageName
    }, idx > 0 && B7.default.createElement(w, {
      dimColor: true
    }, " \u2192 "), isCurrentStage ? B7.default.createElement(w, {
      color: "background"
    }, reviewStageDisplayName[stageName]) : B7.default.createElement(w, {
      dimColor: true
    }, reviewStageDisplayName[stageName]));
  }), reactCompilerCache[5] = completed, reactCompilerCache[6] = currentStageIdx, reactCompilerCache[7] = isSetupPhase, reactCompilerCache[8] = stageItems;else stageItems = reactCompilerCache[8];
  let completedTickEl;
  if (reactCompilerCache[9] !== completed) completedTickEl = completed && B7.default.createElement(w, null, " ", B7.default.createElement(Os, {
    status: "success"
  })), reactCompilerCache[9] = completed, reactCompilerCache[10] = completedTickEl;else completedTickEl = reactCompilerCache[10];
  let barEl;
  if (reactCompilerCache[11] !== setupEl || reactCompilerCache[12] !== stageItems || reactCompilerCache[13] !== completedTickEl) barEl = B7.default.createElement(w, null, setupEl, arrowEl, stageItems, completedTickEl), reactCompilerCache[11] = setupEl, reactCompilerCache[12] = stageItems, reactCompilerCache[13] = completedTickEl, reactCompilerCache[14] = barEl;else barEl = reactCompilerCache[14];
  return barEl;
}
function getUltrareviewStatusText(session) {
  let reviewProgress = session.reviewProgress;
  if (!reviewProgress) return session.status === "completed" ? "done" : "setting up";
  let bugsVerified = reviewProgress.bugsVerified,
    bugsRefuted = reviewProgress.bugsRefuted ?? 0;
  if (session.status === "completed") {
    let parts = [`${bugsVerified} ${En(bugsVerified, "finding")}`];
    if (bugsRefuted > 0) parts.push(`${bugsRefuted} refuted`);
    return parts.join(" \xB7 ");
  }
  return nCo(reviewProgress.stage, reviewProgress.bugsFound, bugsVerified, bugsRefuted);
}
function UltrareviewSessionPanel(props) {
  let reactCompilerCache = jg6.c(57),
    {
      session: session,
      onDone: onDone,
      onBack: onBack,
      onKill: onKill
    } = props,
    isCompleted = session.status === "completed",
    isActive = session.status === "running" || session.status === "pending",
    [showStopConfirm, setShowStopConfirm] = B7.useState(false),
    elapsedTime = wY(session.startTime, isActive, 1000, 0, session.endTime),
    dismissCb;
  if (reactCompilerCache[0] !== onDone) dismissCb = () => onDone("Cloud session details dismissed", {
    display: "system"
  }), reactCompilerCache[0] = onDone, reactCompilerCache[1] = dismissCb;else dismissCb = reactCompilerCache[1];
  let handleDismiss = dismissCb,
    handleBack = onBack ?? handleDismiss,
    sessionUrl;
  if (reactCompilerCache[2] !== session.sessionId) sessionUrl = Kle(session.sessionId), reactCompilerCache[2] = session.sessionId, reactCompilerCache[3] = sessionUrl;else sessionUrl = reactCompilerCache[3];
  let sessionLink = sessionUrl,
    statusLabel = isCompleted ? "ready" : isActive ? "running" : session.status;
  if (showStopConfirm) {
    let onCancelStop;
    if (reactCompilerCache[4] === Symbol.for("react.memo_cache_sentinel")) onCancelStop = () => setShowStopConfirm(false), reactCompilerCache[4] = onCancelStop;else onCancelStop = reactCompilerCache[4];
    let archiveWarning;
    if (reactCompilerCache[5] === Symbol.for("react.memo_cache_sentinel")) archiveWarning = B7.default.createElement(w, {
      dimColor: true
    }, "This archives the cloud session and stops local tracking. The review will not complete and any findings so far are discarded."), reactCompilerCache[5] = archiveWarning;else archiveWarning = reactCompilerCache[5];
    let stopOption;
    if (reactCompilerCache[6] === Symbol.for("react.memo_cache_sentinel")) stopOption = {
      label: "Stop ultrareview",
      value: "stop"
    }, reactCompilerCache[6] = stopOption;else stopOption = reactCompilerCache[6];
    let stopMenuOptions;
    if (reactCompilerCache[7] === Symbol.for("react.memo_cache_sentinel")) stopMenuOptions = [stopOption, {
      label: "Back",
      value: "back"
    }], reactCompilerCache[7] = stopMenuOptions;else stopMenuOptions = reactCompilerCache[7];
    let stopDialogEl;
    if (reactCompilerCache[8] !== handleBack || reactCompilerCache[9] !== onKill) stopDialogEl = B7.default.createElement(Vn, {
      title: "Stop ultrareview?",
      onCancel: onCancelStop,
      color: "background"
    }, B7.default.createElement(B, {
      flexDirection: "column",
      gap: 1
    }, archiveWarning, B7.default.createElement(Ar, {
      options: stopMenuOptions,
      onChange: choice => {
        if (choice === "stop") onKill?.(), handleBack();else setShowStopConfirm(false);
      }
    }))), reactCompilerCache[8] = handleBack, reactCompilerCache[9] = onKill, reactCompilerCache[10] = stopDialogEl;else stopDialogEl = reactCompilerCache[10];
    return stopDialogEl;
  }
  let menuOptions;
  if (reactCompilerCache[11] !== isCompleted || reactCompilerCache[12] !== onKill || reactCompilerCache[13] !== isActive) menuOptions = isCompleted ? [{
    label: "Open in Claude Code on the web",
    value: "open"
  }, {
    label: "Dismiss",
    value: "dismiss"
  }] : [{
    label: "Open in Claude Code on the web",
    value: "open"
  }, ...(onKill && isActive ? [{
    label: "Stop ultrareview",
    value: "stop"
  }] : []), {
    label: "Back",
    value: "back"
  }], reactCompilerCache[11] = isCompleted, reactCompilerCache[12] = onKill, reactCompilerCache[13] = isActive, reactCompilerCache[14] = menuOptions;else menuOptions = reactCompilerCache[14];
  let activeMenuOptions = menuOptions,
    handleMenuChange;
  if (reactCompilerCache[15] !== handleBack || reactCompilerCache[16] !== handleDismiss || reactCompilerCache[17] !== onDone || reactCompilerCache[18] !== sessionLink) handleMenuChange = choice => {
    e: switch (choice) {
      case "open":
        {
          Dc(sessionLink), onDone();
          break e;
        }
      case "stop":
        {
          setShowStopConfirm(true);
          break e;
        }
      case "back":
        {
          handleBack();
          break e;
        }
      case "dismiss":
        handleDismiss();
    }
  }, reactCompilerCache[15] = handleBack, reactCompilerCache[16] = handleDismiss, reactCompilerCache[17] = onDone, reactCompilerCache[18] = sessionLink, reactCompilerCache[19] = handleMenuChange;else handleMenuChange = reactCompilerCache[19];
  let onMenuChange = handleMenuChange,
    titleIcon = isCompleted ? $M : ov,
    titleIconEl;
  if (reactCompilerCache[20] !== titleIcon) titleIconEl = B7.default.createElement(w, {
    color: "background"
  }, titleIcon, " "), reactCompilerCache[20] = titleIcon, reactCompilerCache[21] = titleIconEl;else titleIconEl = reactCompilerCache[21];
  let ultrareviewLabel;
  if (reactCompilerCache[22] === Symbol.for("react.memo_cache_sentinel")) ultrareviewLabel = B7.default.createElement(w, {
    bold: true
  }, "ultrareview"), reactCompilerCache[22] = ultrareviewLabel;else ultrareviewLabel = reactCompilerCache[22];
  let statusInfoEl;
  if (reactCompilerCache[23] !== elapsedTime || reactCompilerCache[24] !== statusLabel) statusInfoEl = B7.default.createElement(w, {
    dimColor: true
  }, " \xB7 ", elapsedTime, " \xB7 ", statusLabel), reactCompilerCache[23] = elapsedTime, reactCompilerCache[24] = statusLabel, reactCompilerCache[25] = statusInfoEl;else statusInfoEl = reactCompilerCache[25];
  let titleEl;
  if (reactCompilerCache[26] !== titleIconEl || reactCompilerCache[27] !== statusInfoEl) titleEl = B7.default.createElement(w, null, titleIconEl, ultrareviewLabel, statusInfoEl), reactCompilerCache[26] = titleIconEl, reactCompilerCache[27] = statusInfoEl, reactCompilerCache[28] = titleEl;else titleEl = reactCompilerCache[28];
  let inputGuideEl;
  if (reactCompilerCache[29] === Symbol.for("react.memo_cache_sentinel")) inputGuideEl = B7.default.createElement(hn, null, B7.default.createElement(lt, {
    chord: "enter",
    action: "select"
  }), B7.default.createElement(lt, {
    chord: "escape",
    action: "go back"
  })), reactCompilerCache[29] = inputGuideEl;else inputGuideEl = reactCompilerCache[29];
  let reviewStage = session.reviewProgress?.stage,
    hasReviewProgress = !!session.reviewProgress,
    stageBarEl;
  if (reactCompilerCache[30] !== isCompleted || reactCompilerCache[31] !== reviewStage || reactCompilerCache[32] !== hasReviewProgress) stageBarEl = B7.default.createElement(UltrareviewStageBar, {
    stage: reviewStage,
    completed: isCompleted,
    hasProgress: hasReviewProgress
  }), reactCompilerCache[30] = isCompleted, reactCompilerCache[31] = reviewStage, reactCompilerCache[32] = hasReviewProgress, reactCompilerCache[33] = stageBarEl;else stageBarEl = reactCompilerCache[33];
  let statusText;
  if (reactCompilerCache[34] !== session) statusText = getUltrareviewStatusText(session), reactCompilerCache[34] = session, reactCompilerCache[35] = statusText;else statusText = reactCompilerCache[35];
  let statusTextEl;
  if (reactCompilerCache[36] !== statusText) statusTextEl = B7.default.createElement(w, null, statusText), reactCompilerCache[36] = statusText, reactCompilerCache[37] = statusTextEl;else statusTextEl = reactCompilerCache[37];
  let sessionLinkTextEl;
  if (reactCompilerCache[38] !== sessionLink) sessionLinkTextEl = B7.default.createElement(w, {
    dimColor: true
  }, sessionLink), reactCompilerCache[38] = sessionLink, reactCompilerCache[39] = sessionLinkTextEl;else sessionLinkTextEl = reactCompilerCache[39];
  let sessionLinkEl;
  if (reactCompilerCache[40] !== sessionLink || reactCompilerCache[41] !== sessionLinkTextEl) sessionLinkEl = B7.default.createElement(Fs, {
    url: sessionLink
  }, sessionLinkTextEl), reactCompilerCache[40] = sessionLink, reactCompilerCache[41] = sessionLinkTextEl, reactCompilerCache[42] = sessionLinkEl;else sessionLinkEl = reactCompilerCache[42];
  let sessionInfoColEl;
  if (reactCompilerCache[43] !== statusTextEl || reactCompilerCache[44] !== sessionLinkEl) sessionInfoColEl = B7.default.createElement(B, {
    flexDirection: "column"
  }, statusTextEl, sessionLinkEl), reactCompilerCache[43] = statusTextEl, reactCompilerCache[44] = sessionLinkEl, reactCompilerCache[45] = sessionInfoColEl;else sessionInfoColEl = reactCompilerCache[45];
  let menuEl;
  if (reactCompilerCache[46] !== onMenuChange || reactCompilerCache[47] !== activeMenuOptions) menuEl = B7.default.createElement(Ar, {
    options: activeMenuOptions,
    onChange: onMenuChange
  }), reactCompilerCache[46] = onMenuChange, reactCompilerCache[47] = activeMenuOptions, reactCompilerCache[48] = menuEl;else menuEl = reactCompilerCache[48];
  let bodyEl;
  if (reactCompilerCache[49] !== stageBarEl || reactCompilerCache[50] !== sessionInfoColEl || reactCompilerCache[51] !== menuEl) bodyEl = B7.default.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, stageBarEl, sessionInfoColEl, menuEl), reactCompilerCache[49] = stageBarEl, reactCompilerCache[50] = sessionInfoColEl, reactCompilerCache[51] = menuEl, reactCompilerCache[52] = bodyEl;else bodyEl = reactCompilerCache[52];
  let panelEl;
  if (reactCompilerCache[53] !== handleBack || reactCompilerCache[54] !== bodyEl || reactCompilerCache[55] !== titleEl) panelEl = B7.default.createElement(Vn, {
    title: titleEl,
    onCancel: handleBack,
    color: "background",
    inputGuide: inputGuideEl
  }, bodyEl), reactCompilerCache[53] = handleBack, reactCompilerCache[54] = bodyEl, reactCompilerCache[55] = titleEl, reactCompilerCache[56] = panelEl;else panelEl = reactCompilerCache[56];
  return panelEl;
}
function jA4({
  session: session,
  toolUseContext: toolUseContext,
  onDone: onDone,
  onBack: onBack,
  onKill: onKill
}) {
  let [isTeleporting, setIsTeleporting] = B7.useState(false),
    [teleportError, setTeleportError] = B7.useState(null),
    recentMessages = B7.useMemo(() => {
      if (session.isUltraplan || session.isRemoteReview) return [];
      return yT(iGn(session.log)).filter(msg => msg.type !== "progress").slice(-3);
    }, [session]),
    isActive = session.status === "running" || session.status === "pending",
    elapsedTime = wY(session.startTime, isActive, 1000, 0, session.endTime);
  if (session.isUltraplan) return B7.default.createElement(UltraplanSessionPanel, {
    session: session,
    onDone: onDone,
    onBack: onBack,
    onKill: onKill
  });
  if (session.isRemoteReview) return B7.default.createElement(UltrareviewSessionPanel, {
    session: session,
    onDone: onDone,
    onBack: onBack,
    onKill: onKill
  });
  let dismissSession = () => onDone("Cloud session details dismissed", {
      display: "system"
    }),
    handleKeyDown = keyEvent => {
      if (keyEvent.key === " ") keyEvent.preventDefault(), onDone("Cloud session details dismissed", {
        display: "system"
      });else if (keyEvent.key === "left" && onBack) keyEvent.preventDefault(), onBack();else if (keyEvent.key === "t" && !keyEvent.ctrl && !keyEvent.meta && !isTeleporting) keyEvent.preventDefault(), doTeleport();else if (keyEvent.key === "return") keyEvent.preventDefault(), dismissSession();
    };
  async function doTeleport() {
    setIsTeleporting(true), setTeleportError(null);
    try {
      await K3e(session.sessionId);
    } catch (err) {
      setTeleportError(Se(err));
    } finally {
      setIsTeleporting(false);
    }
  }
  let truncatedTitle = Vs(session.title, 50),
    displayStatus = session.status === "pending" ? "starting" : session.status;
  return B7.default.createElement(B, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown
  }, B7.default.createElement(Vn, {
    title: "Cloud session details",
    onCancel: dismissSession,
    color: "background",
    inputGuide: B7.default.createElement(hn, null, onBack && B7.default.createElement(lt, {
      chord: "left",
      action: "go back"
    }), B7.default.createElement(lt, {
      chord: ["escape", "enter", "space"],
      action: "close"
    }), !isTeleporting && B7.default.createElement(lt, {
      chord: "t",
      action: "teleport"
    }))
  }, B7.default.createElement(B, {
    flexDirection: "column"
  }, B7.default.createElement(w, null, B7.default.createElement(w, {
    bold: true
  }, "Status"), ":", " ", displayStatus === "running" || displayStatus === "starting" ? B7.default.createElement(w, {
    color: "background"
  }, displayStatus) : displayStatus === "completed" ? B7.default.createElement(w, {
    color: "success"
  }, displayStatus) : B7.default.createElement(w, {
    color: "error"
  }, displayStatus)), B7.default.createElement(w, null, B7.default.createElement(w, {
    bold: true
  }, "Runtime"), ": ", elapsedTime), B7.default.createElement(w, {
    wrap: "truncate-end"
  }, B7.default.createElement(w, {
    bold: true
  }, "Title"), ": ", truncatedTitle), B7.default.createElement(w, null, B7.default.createElement(w, {
    bold: true
  }, "Progress"), ":", " ", B7.default.createElement(xjt, {
    session: session
  })), B7.default.createElement(w, null, B7.default.createElement(w, {
    bold: true
  }, "Session URL"), ":", " ", B7.default.createElement(Fs, {
    url: Kle(session.sessionId)
  }, B7.default.createElement(w, {
    dimColor: true
  }, Kle(session.sessionId))))), session.log.length > 0 && B7.default.createElement(B, {
    flexDirection: "column",
    marginTop: 1
  }, B7.default.createElement(w, null, B7.default.createElement(w, {
    bold: true
  }, "Recent messages"), ":"), B7.default.createElement(B, {
    flexDirection: "column",
    height: 10,
    overflowY: "hidden"
  }, recentMessages.map((msg, idx) => B7.default.createElement(xY, {
    key: idx,
    message: msg,
    lookups: Vge,
    addMargin: idx > 0,
    tools: toolUseContext.options.tools,
    commands: toolUseContext.options.commands,
    verbose: toolUseContext.options.verbose,
    inProgressToolUseIDs: new Set(),
    progressMessagesForMessage: [],
    shouldAnimate: false,
    shouldShowDot: false,
    style: "condensed",
    isTranscriptMode: false,
    isStatic: true
  }))), B7.default.createElement(B, {
    marginTop: 1
  }, B7.default.createElement(w, {
    dimColor: true,
    italic: true
  }, "Showing last ", recentMessages.length, " of ", session.log.length, " ", "messages"))), teleportError && B7.default.createElement(B, {
    marginTop: 1
  }, B7.default.createElement(w, {
    color: "error"
  }, "Teleport failed: ", teleportError)), isTeleporting && B7.default.createElement(w, {
    color: "background"
  }, "Teleporting to session\u2026")));
}
var jg6, B7, ultraplanPhaseLabel, ultraplanPhaseWorkingVerb, reviewStageOrder, reviewStageDisplayName;
var yjq = b(() => {
  pi();
  rl();
  Vlt();
  Je();
  TY();
  rg();
  j1();
  T_();
  St();
  ds();
  kDe();
  lo();
  fr();
  wP();
  zl();
  qs();
  n_();
  Di();
  ts();
  lA();
  sct();
  rCo();
  jg6 = L(nt(), 1), B7 = L(Te(), 1);
  ultraplanPhaseLabel = {
    needs_input: "input required",
    plan_ready: "ready"
  }, ultraplanPhaseWorkingVerb = {
    needs_input: "waiting",
    plan_ready: "done"
  };
  reviewStageOrder = ["finding", "verifying", "synthesizing"], reviewStageDisplayName = {
    finding: "Find",
    verifying: "Verify",
    synthesizing: "Dedupe"
  };
});

export {getLastToolCallSummary as uvo,UltraplanSessionPanel as Gom,UltrareviewStageBar as Vom,getUltrareviewStatusText as Kom,UltrareviewSessionPanel as zom,jA4 as lEl,jg6 as YGn,B7 as Vi,ultraplanPhaseLabel as jom,ultraplanPhaseWorkingVerb as Wom,reviewStageOrder as iEl,reviewStageDisplayName as aEl,yjq as dvo};
