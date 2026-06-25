// @ts-nocheck
import {yD} from "../config/2259_R9r.ts";
import {Zp,d1} from "../../vendor/m2705.ts";
import {truncateToWidth as xs} from "../../vendor/m239.ts";
import {SY,xdt} from "../../vendor/m4031.ts";
import {ls,w8,fg} from "../../vendor/m2232.ts";
import {ece,mY} from "../tools/3889_allowBundle.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {dM,hA,Pa} from "../../vendor/m720.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {CIo,AGt,AIo} from "../../vendor/m4892.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {ST,kye,po} from "../tools/5224_userPromptCount.ts";
import {Ljn,VPe} from "../core/4898_type.ts";
import {teleportResumeCodeSession as Lqe,qD} from "../permissions/3888_validateSessionRepository.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {RY,Ydt} from "../session/4089_message.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Xo} from "../../vendor/m240.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Summarize the last tool call of an ultraplan/cloud session for display.
 * @param toolName  name of the tool that was invoked
 * @param toolInput tool input object (used to extract a human-readable hint)
 * @param maxWidth  maximum render width for the truncated summary
 */
function vIo(toolName, toolInput, maxWidth) {
  if (toolName === yD) return "Review the plan in Claude Code on the web";
  if (!toolInput || typeof toolInput !== "object") return toolName;
  if (toolName === Zp && "questions" in toolInput) {
    let questions = toolInput.questions;
    if (Array.isArray(questions) && questions[0] && typeof questions[0] === "object") {
      let questionText = "question" in questions[0] && typeof questions[0].question === "string" && questions[0].question ? questions[0].question : "header" in questions[0] && typeof questions[0].header === "string" ? questions[0].header : null;
      if (questionText) {
        let normalized = questionText.replace(/\s+/g, " ").trim();
        return `Answer in browser: ${xs(normalized, maxWidth - 10)}`;
      }
    }
  }
  for (let value of Object.values(toolInput)) if (typeof value === "string" && value.trim()) {
    let normalized = value.replace(/\s+/g, " ").trim();
    return `${toolName} ${xs(normalized, maxWidth)}`;
  }
  return toolName;
}
/** Panel rendering an ultraplan cloud session's status, stats and actions. */
function rfm(props) {
  let reactCompilerCache = Njn.c(78),
    {
      session: session,
      onDone: onDone,
      onBack: onBack,
      onKill: onKill
    } = props,
    isActive = session.status === "running" || session.status === "pending",
    ultraplanPhase = session.ultraplanPhase,
    statusLabel = isActive ? ultraplanPhase ? tfm[ultraplanPhase] : "running" : session.status,
    elapsedTime = SY(session.startTime, isActive, 1000, 0, session.endTime),
    agentSpawnCount = 0,
    toolCallCount = 0,
    lastToolUse = null;
  for (let logEntry of session.log) {
    if (logEntry.type !== "assistant") continue;
    for (let contentBlock of logEntry.message.content) {
      if (contentBlock.type !== "tool_use") continue;
      if (toolCallCount++, lastToolUse = contentBlock, contentBlock.name === ls || contentBlock.name === w8) agentSpawnCount++;
    }
  }
  let agentsWorkingCount = 1 + agentSpawnCount,
    lastToolCallSummary;
  if (reactCompilerCache[0] !== lastToolUse) lastToolCallSummary = lastToolUse ? vIo(lastToolUse.name, lastToolUse.input, 60) : null, reactCompilerCache[0] = lastToolUse, reactCompilerCache[1] = lastToolCallSummary;else lastToolCallSummary = reactCompilerCache[1];
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
  if (reactCompilerCache[6] !== session.sessionId) sessionUrl = ece(session.sessionId), reactCompilerCache[6] = session.sessionId, reactCompilerCache[7] = sessionUrl;else sessionUrl = reactCompilerCache[7];
  let sessionLink = sessionUrl,
    resolvedOnBack;
  if (reactCompilerCache[8] !== onBack || reactCompilerCache[9] !== onDone) resolvedOnBack = onBack ?? (() => onDone("Cloud session details dismissed", {
    display: "system"
  })), reactCompilerCache[8] = onBack, reactCompilerCache[9] = onDone, reactCompilerCache[10] = resolvedOnBack;else resolvedOnBack = reactCompilerCache[10];
  let handleBack = resolvedOnBack,
    [showStopConfirm, setShowStopConfirm] = MWe.useState(!1);
  if (showStopConfirm) {
    let onCancelStopDialog;
    if (reactCompilerCache[11] === Symbol.for("react.memo_cache_sentinel")) onCancelStopDialog = () => setShowStopConfirm(!1), reactCompilerCache[11] = onCancelStopDialog;else onCancelStopDialog = reactCompilerCache[11];
    let warningText;
    if (reactCompilerCache[12] === Symbol.for("react.memo_cache_sentinel")) warningText = na.jsx(v, {
      dimColor: !0,
      children: "This will terminate the Claude Code on the web session."
    }), reactCompilerCache[12] = warningText;else warningText = reactCompilerCache[12];
    let confirmLabel = ultraplanPhase === "plan_ready" ? "Terminate session and discard plan" : "Terminate session",
      onConfirmStop;
    if (reactCompilerCache[13] !== handleBack || reactCompilerCache[14] !== onKill) onConfirmStop = () => {
      onKill?.(), handleBack();
    }, reactCompilerCache[13] = handleBack, reactCompilerCache[14] = onKill, reactCompilerCache[15] = onConfirmStop;else onConfirmStop = reactCompilerCache[15];
    let onCancelConfirm;
    if (reactCompilerCache[16] === Symbol.for("react.memo_cache_sentinel")) onCancelConfirm = () => setShowStopConfirm(!1), reactCompilerCache[16] = onCancelConfirm;else onCancelConfirm = reactCompilerCache[16];
    let stopDialog;
    if (reactCompilerCache[17] !== confirmLabel || reactCompilerCache[18] !== onConfirmStop) stopDialog = na.jsx(Jn, {
      title: "Stop ultraplan?",
      onCancel: onCancelStopDialog,
      color: "background",
      children: na.jsxs($, {
        flexDirection: "column",
        gap: 1,
        children: [warningText, na.jsx(Bl, {
          confirmLabel: confirmLabel,
          cancelLabel: "Back",
          onConfirm: onConfirmStop,
          onCancel: onCancelConfirm
        })]
      })
    }), reactCompilerCache[17] = confirmLabel, reactCompilerCache[18] = onConfirmStop, reactCompilerCache[19] = stopDialog;else stopDialog = reactCompilerCache[19];
    return stopDialog;
  }
  let titleIcon = ultraplanPhase === "plan_ready" ? dM : hA,
    titleIconEl;
  if (reactCompilerCache[20] !== titleIcon) titleIconEl = na.jsxs(v, {
    color: "background",
    children: [titleIcon, " "]
  }), reactCompilerCache[20] = titleIcon, reactCompilerCache[21] = titleIconEl;else titleIconEl = reactCompilerCache[21];
  let ultraplanLabel;
  if (reactCompilerCache[22] === Symbol.for("react.memo_cache_sentinel")) ultraplanLabel = na.jsx(v, {
    bold: !0,
    children: "ultraplan"
  }), reactCompilerCache[22] = ultraplanLabel;else ultraplanLabel = reactCompilerCache[22];
  let statusInfo;
  if (reactCompilerCache[23] !== elapsedTime || reactCompilerCache[24] !== statusLabel) statusInfo = na.jsxs(v, {
    dimColor: !0,
    children: [" \xB7 ", elapsedTime, " \xB7 ", statusLabel]
  }), reactCompilerCache[23] = elapsedTime, reactCompilerCache[24] = statusLabel, reactCompilerCache[25] = statusInfo;else statusInfo = reactCompilerCache[25];
  let titleEl;
  if (reactCompilerCache[26] !== titleIconEl || reactCompilerCache[27] !== statusInfo) titleEl = na.jsxs(v, {
    children: [titleIconEl, ultraplanLabel, statusInfo]
  }), reactCompilerCache[26] = titleIconEl, reactCompilerCache[27] = statusInfo, reactCompilerCache[28] = titleEl;else titleEl = reactCompilerCache[28];
  let planReadyTick;
  if (reactCompilerCache[29] !== ultraplanPhase) planReadyTick = ultraplanPhase === "plan_ready" && na.jsxs(v, {
    color: "success",
    children: [Xe.tick, " "]
  }), reactCompilerCache[29] = ultraplanPhase, reactCompilerCache[30] = planReadyTick;else planReadyTick = reactCompilerCache[30];
  let agentsLabel;
  if (reactCompilerCache[31] !== agentsWorking) agentsLabel = Sn(agentsWorking, "agent"), reactCompilerCache[31] = agentsWorking, reactCompilerCache[32] = agentsLabel;else agentsLabel = reactCompilerCache[32];
  let agentWorkingVerb = ultraplanPhase ? nfm[ultraplanPhase] : "working",
    toolCallsLabel;
  if (reactCompilerCache[33] !== toolCalls) toolCallsLabel = Sn(toolCalls, "call"), reactCompilerCache[33] = toolCalls, reactCompilerCache[34] = toolCallsLabel;else toolCallsLabel = reactCompilerCache[34];
  let statsEl;
  if (reactCompilerCache[35] !== agentsWorking || reactCompilerCache[36] !== planReadyTick || reactCompilerCache[37] !== agentsLabel || reactCompilerCache[38] !== agentWorkingVerb || reactCompilerCache[39] !== toolCallsLabel || reactCompilerCache[40] !== toolCalls) statsEl = na.jsxs(v, {
    children: [planReadyTick, agentsWorking, " ", agentsLabel, " ", agentWorkingVerb, " \xB7 ", toolCalls, " tool", " ", toolCallsLabel]
  }), reactCompilerCache[35] = agentsWorking, reactCompilerCache[36] = planReadyTick, reactCompilerCache[37] = agentsLabel, reactCompilerCache[38] = agentWorkingVerb, reactCompilerCache[39] = toolCallsLabel, reactCompilerCache[40] = toolCalls, reactCompilerCache[41] = statsEl;else statsEl = reactCompilerCache[41];
  let lastToolCallEl;
  if (reactCompilerCache[42] !== lastToolCall) lastToolCallEl = lastToolCall && na.jsx(v, {
    dimColor: !0,
    children: lastToolCall
  }), reactCompilerCache[42] = lastToolCall, reactCompilerCache[43] = lastToolCallEl;else lastToolCallEl = reactCompilerCache[43];
  let sessionLinkTextEl;
  if (reactCompilerCache[44] !== sessionLink) sessionLinkTextEl = na.jsx(v, {
    dimColor: !0,
    children: sessionLink
  }), reactCompilerCache[44] = sessionLink, reactCompilerCache[45] = sessionLinkTextEl;else sessionLinkTextEl = reactCompilerCache[45];
  let sessionLinkEl;
  if (reactCompilerCache[46] !== sessionLink || reactCompilerCache[47] !== sessionLinkTextEl) sessionLinkEl = na.jsx(Ss, {
    url: sessionLink,
    children: sessionLinkTextEl
  }), reactCompilerCache[46] = sessionLink, reactCompilerCache[47] = sessionLinkTextEl, reactCompilerCache[48] = sessionLinkEl;else sessionLinkEl = reactCompilerCache[48];
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
          Zl(sessionLink), onDone();
          return;
        }
      case "stop":
        {
          setShowStopConfirm(!0);
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
  if (reactCompilerCache[66] !== menuOptions || reactCompilerCache[67] !== handleMenuChange) menuEl = na.jsx(hr, {
    options: menuOptions,
    onChange: handleMenuChange
  }), reactCompilerCache[66] = menuOptions, reactCompilerCache[67] = handleMenuChange, reactCompilerCache[68] = menuEl;else menuEl = reactCompilerCache[68];
  let bodyEl;
  if (reactCompilerCache[69] !== statsEl || reactCompilerCache[70] !== lastToolCallEl || reactCompilerCache[71] !== sessionLinkEl || reactCompilerCache[72] !== menuEl) bodyEl = na.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [statsEl, lastToolCallEl, sessionLinkEl, menuEl]
  }), reactCompilerCache[69] = statsEl, reactCompilerCache[70] = lastToolCallEl, reactCompilerCache[71] = sessionLinkEl, reactCompilerCache[72] = menuEl, reactCompilerCache[73] = bodyEl;else bodyEl = reactCompilerCache[73];
  let panelEl;
  if (reactCompilerCache[74] !== handleBack || reactCompilerCache[75] !== titleEl || reactCompilerCache[76] !== bodyEl) panelEl = na.jsx(Jn, {
    title: titleEl,
    onCancel: handleBack,
    color: "background",
    children: bodyEl
  }), reactCompilerCache[74] = handleBack, reactCompilerCache[75] = titleEl, reactCompilerCache[76] = bodyEl, reactCompilerCache[77] = panelEl;else panelEl = reactCompilerCache[77];
  return panelEl;
}
/** Horizontal stage progress bar for an ultrareview session (Find -> Verify -> Dedupe). */
function ofm(props) {
  let reactCompilerCache = Njn.c(15),
    {
      stage: stage,
      completed: completed,
      hasProgress: hasProgress
    } = props,
    stageIndex;
  if (reactCompilerCache[0] !== stage) stageIndex = stage ? d0l.indexOf(stage) : -1, reactCompilerCache[0] = stage, reactCompilerCache[1] = stageIndex;else stageIndex = reactCompilerCache[1];
  let currentStageIdx = stageIndex,
    isSetupPhase = !completed && !hasProgress,
    setupEl;
  if (reactCompilerCache[2] !== isSetupPhase) setupEl = isSetupPhase ? na.jsx(v, {
    color: "background",
    children: "Setup"
  }) : na.jsx(v, {
    dimColor: !0,
    children: "Setup"
  }), reactCompilerCache[2] = isSetupPhase, reactCompilerCache[3] = setupEl;else setupEl = reactCompilerCache[3];
  let arrowEl;
  if (reactCompilerCache[4] === Symbol.for("react.memo_cache_sentinel")) arrowEl = na.jsx(v, {
    dimColor: !0,
    children: " \u2192 "
  }), reactCompilerCache[4] = arrowEl;else arrowEl = reactCompilerCache[4];
  let stageItems;
  if (reactCompilerCache[5] !== completed || reactCompilerCache[6] !== currentStageIdx || reactCompilerCache[7] !== isSetupPhase) stageItems = d0l.map((stageName, idx) => {
    let isCurrentStage = !completed && !isSetupPhase && idx === currentStageIdx;
    return na.jsxs(m0l.Fragment, {
      children: [idx > 0 && na.jsx(v, {
        dimColor: !0,
        children: " \u2192 "
      }), isCurrentStage ? na.jsx(v, {
        color: "background",
        children: p0l[stageName]
      }) : na.jsx(v, {
        dimColor: !0,
        children: p0l[stageName]
      })]
    }, stageName);
  }), reactCompilerCache[5] = completed, reactCompilerCache[6] = currentStageIdx, reactCompilerCache[7] = isSetupPhase, reactCompilerCache[8] = stageItems;else stageItems = reactCompilerCache[8];
  let completedTickEl;
  if (reactCompilerCache[9] !== completed) completedTickEl = completed && na.jsxs(v, {
    children: [" ", na.jsx(bs, {
      status: "success"
    })]
  }), reactCompilerCache[9] = completed, reactCompilerCache[10] = completedTickEl;else completedTickEl = reactCompilerCache[10];
  let barEl;
  if (reactCompilerCache[11] !== setupEl || reactCompilerCache[12] !== stageItems || reactCompilerCache[13] !== completedTickEl) barEl = na.jsxs(v, {
    children: [setupEl, arrowEl, stageItems, completedTickEl]
  }), reactCompilerCache[11] = setupEl, reactCompilerCache[12] = stageItems, reactCompilerCache[13] = completedTickEl, reactCompilerCache[14] = barEl;else barEl = reactCompilerCache[14];
  return barEl;
}
/** Build the one-line status text for an ultrareview session. */
function sfm(session) {
  let reviewProgress = session.reviewProgress;
  if (!reviewProgress) return session.status === "completed" ? "done" : "setting up";
  let bugsVerified = reviewProgress.bugsVerified,
    bugsRefuted = reviewProgress.bugsRefuted ?? 0;
  if (session.status === "completed") {
    let parts = [`${bugsVerified} ${Sn(bugsVerified, "finding")}`];
    if (bugsRefuted > 0) parts.push(`${bugsRefuted} refuted`);
    return parts.join(" \xB7 ");
  }
  return CIo(reviewProgress.stage, reviewProgress.bugsFound, bugsVerified, bugsRefuted);
}
/** Panel rendering an ultrareview cloud session's stage bar, status and actions. */
function ifm(props) {
  let reactCompilerCache = Njn.c(57),
    {
      session: session,
      onDone: onDone,
      onBack: onBack,
      onKill: onKill
    } = props,
    isCompleted = session.status === "completed",
    isActive = session.status === "running" || session.status === "pending",
    [showStopConfirm, setShowStopConfirm] = MWe.useState(!1),
    elapsedTime = SY(session.startTime, isActive, 1000, 0, session.endTime),
    dismissCb;
  if (reactCompilerCache[0] !== onDone) dismissCb = () => onDone("Cloud session details dismissed", {
    display: "system"
  }), reactCompilerCache[0] = onDone, reactCompilerCache[1] = dismissCb;else dismissCb = reactCompilerCache[1];
  let handleDismiss = dismissCb,
    handleBack = onBack ?? handleDismiss,
    sessionUrl;
  if (reactCompilerCache[2] !== session.sessionId) sessionUrl = ece(session.sessionId), reactCompilerCache[2] = session.sessionId, reactCompilerCache[3] = sessionUrl;else sessionUrl = reactCompilerCache[3];
  let sessionLink = sessionUrl,
    statusLabel = isCompleted ? "ready" : isActive ? "running" : session.status;
  if (showStopConfirm) {
    let onCancelStop;
    if (reactCompilerCache[4] === Symbol.for("react.memo_cache_sentinel")) onCancelStop = () => setShowStopConfirm(!1), reactCompilerCache[4] = onCancelStop;else onCancelStop = reactCompilerCache[4];
    let archiveWarning;
    if (reactCompilerCache[5] === Symbol.for("react.memo_cache_sentinel")) archiveWarning = na.jsx(v, {
      dimColor: !0,
      children: "This archives the cloud session and stops local tracking. The review will not complete and any findings so far are discarded."
    }), reactCompilerCache[5] = archiveWarning;else archiveWarning = reactCompilerCache[5];
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
    if (reactCompilerCache[8] !== handleBack || reactCompilerCache[9] !== onKill) stopDialogEl = na.jsx(Jn, {
      title: "Stop ultrareview?",
      onCancel: onCancelStop,
      color: "background",
      children: na.jsxs($, {
        flexDirection: "column",
        gap: 1,
        children: [archiveWarning, na.jsx(hr, {
          options: stopMenuOptions,
          onChange: choice => {
            if (choice === "stop") onKill?.(), handleBack();else setShowStopConfirm(!1);
          }
        })]
      })
    }), reactCompilerCache[8] = handleBack, reactCompilerCache[9] = onKill, reactCompilerCache[10] = stopDialogEl;else stopDialogEl = reactCompilerCache[10];
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
          Zl(sessionLink), onDone();
          break e;
        }
      case "stop":
        {
          setShowStopConfirm(!0);
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
    titleIcon = isCompleted ? dM : hA,
    titleIconEl;
  if (reactCompilerCache[20] !== titleIcon) titleIconEl = na.jsxs(v, {
    color: "background",
    children: [titleIcon, " "]
  }), reactCompilerCache[20] = titleIcon, reactCompilerCache[21] = titleIconEl;else titleIconEl = reactCompilerCache[21];
  let ultrareviewLabel;
  if (reactCompilerCache[22] === Symbol.for("react.memo_cache_sentinel")) ultrareviewLabel = na.jsx(v, {
    bold: !0,
    children: "ultrareview"
  }), reactCompilerCache[22] = ultrareviewLabel;else ultrareviewLabel = reactCompilerCache[22];
  let statusInfoEl;
  if (reactCompilerCache[23] !== elapsedTime || reactCompilerCache[24] !== statusLabel) statusInfoEl = na.jsxs(v, {
    dimColor: !0,
    children: [" \xB7 ", elapsedTime, " \xB7 ", statusLabel]
  }), reactCompilerCache[23] = elapsedTime, reactCompilerCache[24] = statusLabel, reactCompilerCache[25] = statusInfoEl;else statusInfoEl = reactCompilerCache[25];
  let titleEl;
  if (reactCompilerCache[26] !== titleIconEl || reactCompilerCache[27] !== statusInfoEl) titleEl = na.jsxs(v, {
    children: [titleIconEl, ultrareviewLabel, statusInfoEl]
  }), reactCompilerCache[26] = titleIconEl, reactCompilerCache[27] = statusInfoEl, reactCompilerCache[28] = titleEl;else titleEl = reactCompilerCache[28];
  let inputGuideEl;
  if (reactCompilerCache[29] === Symbol.for("react.memo_cache_sentinel")) inputGuideEl = na.jsxs(bn, {
    children: [na.jsx(at, {
      chord: "enter",
      action: "select"
    }), na.jsx(at, {
      chord: "escape",
      action: "go back"
    })]
  }), reactCompilerCache[29] = inputGuideEl;else inputGuideEl = reactCompilerCache[29];
  let reviewStage = session.reviewProgress?.stage,
    hasReviewProgress = !!session.reviewProgress,
    stageBarEl;
  if (reactCompilerCache[30] !== isCompleted || reactCompilerCache[31] !== reviewStage || reactCompilerCache[32] !== hasReviewProgress) stageBarEl = na.jsx(ofm, {
    stage: reviewStage,
    completed: isCompleted,
    hasProgress: hasReviewProgress
  }), reactCompilerCache[30] = isCompleted, reactCompilerCache[31] = reviewStage, reactCompilerCache[32] = hasReviewProgress, reactCompilerCache[33] = stageBarEl;else stageBarEl = reactCompilerCache[33];
  let statusText;
  if (reactCompilerCache[34] !== session) statusText = sfm(session), reactCompilerCache[34] = session, reactCompilerCache[35] = statusText;else statusText = reactCompilerCache[35];
  let statusTextEl;
  if (reactCompilerCache[36] !== statusText) statusTextEl = na.jsx(v, {
    children: statusText
  }), reactCompilerCache[36] = statusText, reactCompilerCache[37] = statusTextEl;else statusTextEl = reactCompilerCache[37];
  let sessionLinkTextEl;
  if (reactCompilerCache[38] !== sessionLink) sessionLinkTextEl = na.jsx(v, {
    dimColor: !0,
    children: sessionLink
  }), reactCompilerCache[38] = sessionLink, reactCompilerCache[39] = sessionLinkTextEl;else sessionLinkTextEl = reactCompilerCache[39];
  let sessionLinkEl;
  if (reactCompilerCache[40] !== sessionLink || reactCompilerCache[41] !== sessionLinkTextEl) sessionLinkEl = na.jsx(Ss, {
    url: sessionLink,
    children: sessionLinkTextEl
  }), reactCompilerCache[40] = sessionLink, reactCompilerCache[41] = sessionLinkTextEl, reactCompilerCache[42] = sessionLinkEl;else sessionLinkEl = reactCompilerCache[42];
  let sessionInfoColEl;
  if (reactCompilerCache[43] !== statusTextEl || reactCompilerCache[44] !== sessionLinkEl) sessionInfoColEl = na.jsxs($, {
    flexDirection: "column",
    children: [statusTextEl, sessionLinkEl]
  }), reactCompilerCache[43] = statusTextEl, reactCompilerCache[44] = sessionLinkEl, reactCompilerCache[45] = sessionInfoColEl;else sessionInfoColEl = reactCompilerCache[45];
  let menuEl;
  if (reactCompilerCache[46] !== onMenuChange || reactCompilerCache[47] !== activeMenuOptions) menuEl = na.jsx(hr, {
    options: activeMenuOptions,
    onChange: onMenuChange
  }), reactCompilerCache[46] = onMenuChange, reactCompilerCache[47] = activeMenuOptions, reactCompilerCache[48] = menuEl;else menuEl = reactCompilerCache[48];
  let bodyEl;
  if (reactCompilerCache[49] !== stageBarEl || reactCompilerCache[50] !== sessionInfoColEl || reactCompilerCache[51] !== menuEl) bodyEl = na.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [stageBarEl, sessionInfoColEl, menuEl]
  }), reactCompilerCache[49] = stageBarEl, reactCompilerCache[50] = sessionInfoColEl, reactCompilerCache[51] = menuEl, reactCompilerCache[52] = bodyEl;else bodyEl = reactCompilerCache[52];
  let panelEl;
  if (reactCompilerCache[53] !== handleBack || reactCompilerCache[54] !== bodyEl || reactCompilerCache[55] !== titleEl) panelEl = na.jsx(Jn, {
    title: titleEl,
    onCancel: handleBack,
    color: "background",
    inputGuide: inputGuideEl,
    children: bodyEl
  }), reactCompilerCache[53] = handleBack, reactCompilerCache[54] = bodyEl, reactCompilerCache[55] = titleEl, reactCompilerCache[56] = panelEl;else panelEl = reactCompilerCache[56];
  return panelEl;
}
/** Top-level cloud session details view (dispatches to ultraplan/ultrareview or generic). */
function f0l({
  session: session,
  toolUseContext: toolUseContext,
  onDone: onDone,
  onBack: onBack,
  onKill: onKill
}) {
  let [isTeleporting, setIsTeleporting] = MWe.useState(!1),
    [teleportError, setTeleportError] = MWe.useState(null),
    recentMessages = MWe.useMemo(() => {
      if (session.isUltraplan || session.isRemoteReview) return [];
      return ST(Ljn(session.log)).filter(msg => msg.type !== "progress").slice(-3);
    }, [session]),
    isActive = session.status === "running" || session.status === "pending",
    elapsedTime = SY(session.startTime, isActive, 1000, 0, session.endTime);
  if (session.isUltraplan) return na.jsx(rfm, {
    session: session,
    onDone: onDone,
    onBack: onBack,
    onKill: onKill
  });
  if (session.isRemoteReview) return na.jsx(ifm, {
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
    setIsTeleporting(!0), setTeleportError(null);
    try {
      await Lqe(session.sessionId);
    } catch (err) {
      setTeleportError(Ce(err));
    } finally {
      setIsTeleporting(!1);
    }
  }
  let truncatedTitle = xs(session.title, 50),
    displayStatus = session.status === "pending" ? "starting" : session.status;
  return na.jsx($, {
    flexDirection: "column",
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKeyDown,
    children: na.jsxs(Jn, {
      title: "Cloud session details",
      onCancel: dismissSession,
      color: "background",
      inputGuide: na.jsxs(bn, {
        children: [onBack && na.jsx(at, {
          chord: "left",
          action: "go back"
        }), na.jsx(at, {
          chord: ["escape", "enter", "space"],
          action: "close"
        }), !isTeleporting && na.jsx(at, {
          chord: "t",
          action: "teleport"
        })]
      }),
      children: [na.jsxs($, {
        flexDirection: "column",
        children: [na.jsxs(v, {
          children: [na.jsx(v, {
            bold: !0,
            children: "Status"
          }), ":", " ", displayStatus === "running" || displayStatus === "starting" ? na.jsx(v, {
            color: "background",
            children: displayStatus
          }) : displayStatus === "completed" ? na.jsx(v, {
            color: "success",
            children: displayStatus
          }) : na.jsx(v, {
            color: "error",
            children: displayStatus
          })]
        }), na.jsxs(v, {
          children: [na.jsx(v, {
            bold: !0,
            children: "Runtime"
          }), ": ", elapsedTime]
        }), na.jsxs(v, {
          wrap: "truncate-end",
          children: [na.jsx(v, {
            bold: !0,
            children: "Title"
          }), ": ", truncatedTitle]
        }), na.jsxs(v, {
          children: [na.jsx(v, {
            bold: !0,
            children: "Progress"
          }), ":", " ", na.jsx(AGt, {
            session: session
          })]
        }), na.jsxs(v, {
          children: [na.jsx(v, {
            bold: !0,
            children: "Session URL"
          }), ":", " ", na.jsx(Ss, {
            url: ece(session.sessionId),
            children: na.jsx(v, {
              dimColor: !0,
              children: ece(session.sessionId)
            })
          })]
        })]
      }), session.log.length > 0 && na.jsxs($, {
        flexDirection: "column",
        marginTop: 1,
        children: [na.jsxs(v, {
          children: [na.jsx(v, {
            bold: !0,
            children: "Recent messages"
          }), ":"]
        }), na.jsx($, {
          flexDirection: "column",
          height: 10,
          overflowY: "hidden",
          children: recentMessages.map((msg, idx) => na.jsx(RY, {
            message: msg,
            lookups: kye,
            addMargin: idx > 0,
            tools: toolUseContext.options.tools,
            commands: toolUseContext.options.commands,
            verbose: toolUseContext.options.verbose,
            inProgressToolUseIDs: new Set(),
            progressMessagesForMessage: [],
            shouldAnimate: !1,
            shouldShowDot: !1,
            style: "condensed",
            isTranscriptMode: !1,
            isStatic: !0
          }, idx))
        }), na.jsx($, {
          marginTop: 1,
          children: na.jsxs(v, {
            dimColor: !0,
            italic: !0,
            children: ["Showing last ", recentMessages.length, " of ", session.log.length, " ", "messages"]
          })
        })]
      }), teleportError && na.jsx($, {
        marginTop: 1,
        children: na.jsxs(v, {
          color: "error",
          children: ["Teleport failed: ", teleportError]
        })
      }), isTeleporting && na.jsx(v, {
        color: "background",
        children: "Teleporting to session\u2026"
      })]
    })
  });
}
var Njn, m0l, MWe, na, tfm, nfm, d0l, p0l;
var wIo = b(() => {
  Zs();
  Pa();
  xdt();
  je();
  mY();
  fg();
  d1();
  Jg();
  Ct();
  Xo();
  VPe();
  po();
  lr();
  qD();
  Ol();
  Is();
  d_();
  di();
  Wo();
  ff();
  Ydt();
  AIo();
  Njn = x(tt(), 1), m0l = x(et(), 1), MWe = x(et(), 1), na = x(oe(), 1);
  tfm = {
    needs_input: "input required",
    plan_ready: "ready"
  }, nfm = {
    needs_input: "waiting",
    plan_ready: "done"
  };
  d0l = ["finding", "verifying", "synthesizing"], p0l = {
    finding: "Find",
    verifying: "Verify",
    synthesizing: "Dedupe"
  };
});

export {vIo,rfm,ofm,sfm,ifm,f0l,Njn,m0l,MWe,na,tfm,nfm,d0l,p0l,wIo};
