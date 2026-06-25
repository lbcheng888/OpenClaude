// @ts-nocheck
import {gracefulShutdownSync,isAmberSentinelEnabled as ym} from "../config/3348_flushAnalyticsSinks.ts";
import {J6t as C4t,initKp as am,d8e as B6e} from "../config/4397_kind.ts";
import {VF as EF,wz as QK,J2 as K4} from "../session/2532_id.ts";
import {dA as sv,xpe as Epe} from "../../vendor/m436.ts";
import {A8e as X6e} from "./4444_name.ts";
import {kYn as MVn,HYn as NVn} from "../../vendor/m5043.ts";
import {XXl as AWl,wBo as iLo} from "./5447_stylepool_styles.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {Jdt as Pct} from "../../vendor/m4099.ts";
import {Rxe as hIe,isCommandEnabled,getCommandName} from "../tools/4092_done.ts";
import {kl as Jl,lh as ch} from "../../vendor/m2739.ts";
import {iy as oy,ef as sA} from "../../vendor/m2794.ts";
import {mainAgentId,lt} from "../session/0132_sent.ts";
import {xe as Oe,He as Ie,mn as ln} from "./0600_feature_name.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {$0 as E0,Cp as Om} from "../config/2223_level.ts";
import {Ve as Qe,Bo as fromEnumOpt,Le as fromEnum} from "../../vendor/m5.ts";
import {y1 as Q$,pee as Aee,SW as _q} from "./2793_consumer.ts";
import {Kl as wc,vQn as Rzn,replayableUserMessagesFilter,po as lo} from "../tools/5224_userPromptCount.ts";
import {kmn as Vun,eFe as oNe} from "../../vendor/m1459.ts";
import {hDn as CHn,qae as jae,Z4 as Nq} from "../agent/3198_code.ts";
import {o7t as RWt,IZn as RYn} from "../agent/5298_input.ts";
import {TT as vT,nut as nlt,kqe as p4e,Pq as _6} from "../session/3880_trackSequence.ts";
import {resolveSkillModelOverride,Ro as Mo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {b} from "../../runtime.ts";
import {Mm as Sf} from "../tools/5174_toSlashCommands.ts";
import {GZn as BYn} from "../tui/5331_selectableUserMessagesFilter.ts";
/**
 * Mark the user message identified by `targetUuid` as having been verified as a
 * human-originated turn (e.g. relayed through the Slack bridge).
 */
function gtr(messages: any, targetUuid: any) {
  if (targetUuid === void 0) return;
  for (let msg of messages) if (msg.type === "user" && msg.uuid === targetUuid) msg.verifiedSlackHumanTurn = !0;
}

/** Trigger a graceful synchronous shutdown (exit code 0). */
function Z2m() {
  gracefulShutdownSync(0);
}

/**
 * Handle a submitted prompt/command from the input box: flush queued commands,
 * run immediate local-jsx slash commands, queue input while a turn is active,
 * or kick off a fresh query via dQl.
 */
async function _tr(submitArgs: any) {
  let {
      helpers,
      queryGuard,
      isExternalLoading = !1,
      commands,
      onInputChange,
      setPastedContents,
      setToolJSX,
      getToolUseContext,
      messages,
      mainLoopModel,
      ideSelection,
      setUserInputOnProcessing,
      setAbortController,
      onQuery,
      getAppState,
      setAppState,
      onBeforeQuery,
      canUseTool,
      queuedCommands,
      uuid,
      skipSlashCommands
    } = submitArgs,
    {
      setCursorOffset,
      clearBuffer,
      resetHistory
    } = helpers;
  if (queuedCommands?.length) {
    C4t(), await dQl({
      inputSource: "queued",
      queuedCommands: queuedCommands,
      messages: messages,
      mainLoopModel: mainLoopModel,
      ideSelection: ideSelection,
      querySource: submitArgs.querySource,
      commands: commands,
      queryGuard: queryGuard,
      setToolJSX: setToolJSX,
      getToolUseContext: getToolUseContext,
      setUserInputOnProcessing: setUserInputOnProcessing,
      setAbortController: setAbortController,
      onQuery: onQuery,
      getAppState: getAppState,
      setAppState: setAppState,
      onBeforeQuery: onBeforeQuery,
      resetHistory: resetHistory,
      canUseTool: canUseTool,
      onInputChange: onInputChange,
      deferSlashToEngine: submitArgs.deferSlashToEngine
    });
    return;
  }
  let rawInput = submitArgs.input ?? "",
    mode = submitArgs.mode ?? "prompt",
    pastedContents = submitArgs.pastedContents ?? {},
    referencedIds = new Set(EF(rawInput).map((ref: any) => ref.id)),
    filteredPasted = sv(pastedContents, (item: any) => item.type !== "image" || referencedIds.has(item.id)),
    hasPastedAttachment = Object.values(filteredPasted).some(X6e);
  if (rawInput.trim() === "") return;
  if (mode !== "bash" && !skipSlashCommands && MVn.includes(rawInput.trim())) {
    if (commands.find((cmd: any) => cmd.name === "exit")) _tr({
      ...submitArgs,
      input: "/exit"
    });else Z2m();
    return;
  }
  AWl();
  let expandedInput = QK(rawInput, filteredPasted),
    pastedTextRefs = EF(rawInput).filter((ref: any) => filteredPasted[ref.id]?.type === "text"),
    pastedTextCount = pastedTextRefs.length,
    pastedTextBytes = pastedTextRefs.reduce((acc: any, ref: any) => acc + (filteredPasted[ref.id]?.content.length ?? 0), 0);
  if (logEvent("tengu_paste_text", {
    pastedTextCount: pastedTextCount,
    pastedTextBytes: pastedTextBytes
  }), !skipSlashCommands && expandedInput.trim().startsWith("/")) {
    let trimmedInput = expandedInput.trim(),
      {
        name: commandName,
        args: commandArgs
      } = Pct(trimmedInput),
      matchedCommand = commands.find((cmd: any) => hIe(cmd, commandArgs) && isCommandEnabled(cmd) && (cmd.name === commandName || cmd.aliases?.includes(commandName) || getCommandName(cmd) === commandName));
    if (matchedCommand && matchedCommand.type === "local-jsx" && (queryGuard.isActive || isExternalLoading)) {
      logEvent("tengu_immediate_command_executed", {
        commandName: matchedCommand.name
      }), onInputChange(""), setCursorOffset(0), setPastedContents({}), clearBuffer();
      let toolUseContext = getToolUseContext(messages, [], Jl(), mainLoopModel),
        didRenderJSX = !1,
        onCommandDone = (feedbackText: any, result: any) => {
          if (didRenderJSX = !0, setToolJSX({
            jsx: null,
            shouldHidePromptInput: !1,
            clearLocalJSX: !0
          }), feedbackText && result?.display !== "skip" && submitArgs.addNotification) submitArgs.addNotification({
            key: `immediate-${matchedCommand.name}`,
            kind: "feedback",
            text: feedbackText,
            priority: "immediate"
          });
          if (result?.nextInput) if (result.submitNextInput) oy({
            agentId: mainAgentId(),
            value: result.nextInput,
            mode: "prompt",
            origin: {
              kind: "auto-continuation"
            }
          });else onInputChange(result.nextInput);
        },
        renderedJSX = await (await matchedCommand.load()).call(onCommandDone, {
          ...toolUseContext,
          isMidTurn: !0
        }, commandArgs, commandName);
      if (renderedJSX && !didRenderJSX) setToolJSX({
        jsx: renderedJSX,
        shouldHidePromptInput: !1,
        isLocalJSXCommand: !0,
        isImmediate: !0
      });
      return;
    }
  }
  if (queryGuard.isActive || isExternalLoading) {
    if (mode !== "prompt" && mode !== "bash") {
      Oe("prompt_queued", "mode_not_queueable");
      return;
    }
    if (submitArgs.hasInterruptibleToolInProgress) {
      logForDebugging(`[interrupt] Aborting current turn: streamMode=${submitArgs.streamMode}`);
      let effort = E0(mainLoopModel, getAppState().effortValue);
      logEvent("tengu_cancel", {
        source: Qe("interrupt_on_submit"),
        streamMode: fromEnumOpt(submitArgs.streamMode),
        ...(effort && {
          effort_level: fromEnum(effort)
        })
      }), submitArgs.abortController?.abort("interrupt");
    }
    oy({
      agentId: mainAgentId(),
      value: expandedInput.trim(),
      preExpansionValue: rawInput.trim(),
      mode: mode,
      pastedContents: hasPastedAttachment ? filteredPasted : void 0,
      skipSlashCommands: skipSlashCommands,
      suppressWorkflowKeyword: submitArgs.suppressWorkflowKeyword,
      inputSource: submitArgs.inputSource,
      uuid: uuid,
      origin: {
        kind: "human"
      }
    }), Ie("prompt_queued"), onInputChange(""), setCursorOffset(0), setPastedContents({}), resetHistory(), clearBuffer();
    return;
  }
  C4t();
  let queuedCommand = {
    value: expandedInput,
    preExpansionValue: rawInput,
    mode: mode,
    pastedContents: hasPastedAttachment ? filteredPasted : void 0,
    skipSlashCommands: skipSlashCommands,
    suppressWorkflowKeyword: submitArgs.suppressWorkflowKeyword,
    uuid: uuid,
    agentId: mainAgentId(),
    origin: {
      kind: "human"
    }
  };
  Ie("prompt_submit"), await dQl({
    inputSource: submitArgs.inputSource ?? "typed",
    queuedCommands: [queuedCommand],
    messages: messages,
    mainLoopModel: mainLoopModel,
    ideSelection: ideSelection,
    querySource: submitArgs.querySource,
    commands: commands,
    queryGuard: queryGuard,
    setToolJSX: setToolJSX,
    getToolUseContext: getToolUseContext,
    setUserInputOnProcessing: setUserInputOnProcessing,
    setAbortController: setAbortController,
    onQuery: onQuery,
    getAppState: getAppState,
    setAppState: setAppState,
    onBeforeQuery: onBeforeQuery,
    resetHistory: resetHistory,
    canUseTool: canUseTool,
    onInputChange: onInputChange,
    deferSlashToEngine: submitArgs.deferSlashToEngine
  });
}

/**
 * Process one or more queued commands into messages, run side effects (file
 * history snapshots, slack-human verification), and dispatch the resulting
 * query to the engine.
 */
async function dQl(processArgs: any) {
  let {
      messages,
      mainLoopModel,
      ideSelection,
      querySource,
      queryGuard,
      setToolJSX,
      getToolUseContext,
      setUserInputOnProcessing,
      setAbortController,
      onQuery,
      getAppState,
      setAppState,
      onBeforeQuery,
      resetHistory,
      canUseTool,
      queuedCommands,
      inputSource
    } = processArgs,
    abortController = Jl();
  setAbortController(abortController);
  function buildContext() {
    return {
      ...getToolUseContext(messages, [], abortController, mainLoopModel),
      deferSlashToEngine: processArgs.deferSlashToEngine
    };
  }
  try {
    queryGuard.reserve(), am("query_process_user_input_start");
    let collectedMessages: any[] = [],
      shouldQuery = !1,
      allowedTools: any,
      model: any,
      effort: any,
      nextInput: any,
      submitNextInput: any,
      engineDeferredSlash: any,
      commandList = queuedCommands ?? [],
      firstWorkload = commandList[0]?.workload,
      sharedWorkload = firstWorkload !== void 0 && commandList.every((cmd: any) => cmd.workload === firstWorkload) ? firstWorkload : void 0,
      primaryIndex = Math.max(0, commandList.findIndex((cmd: any) => cmd.mode !== "task-notification" && Q$(cmd.origin) && !cmd.isMeta)),
      primaryValue = commandList[primaryIndex]?.value,
      primaryText = typeof primaryValue === "string" ? primaryValue : primaryValue ? wc(primaryValue, `
`) : "";
    await Vun(sharedWorkload, () => CHn(primaryText, async () => {
      let context = buildContext();
      for (let i = 0; i < commandList.length; i++) {
        let cmd = commandList[i],
          isPrimary = i === primaryIndex,
          origin = cmd.origin ?? (cmd.mode === "task-notification" ? {
            kind: "task-notification"
          } : void 0),
          promptSource = cmd.isMeta || !Aee(origin) ? "system" : cmd.inputSource ?? inputSource,
          processed = await RWt({
            input: cmd.value,
            preExpansionInput: cmd.preExpansionValue,
            promptSource: promptSource,
            suppressWorkflowKeyword: cmd.suppressWorkflowKeyword,
            mode: cmd.mode,
            setToolJSX: setToolJSX,
            context: context,
            pastedContents: cmd.pastedContents,
            messages: messages,
            setUserInputOnProcessing: isPrimary ? setUserInputOnProcessing : void 0,
            isAlreadyProcessing: !isPrimary,
            querySource: querySource,
            canUseTool: canUseTool,
            uuid: cmd.uuid,
            ideSelection: isPrimary ? ideSelection : void 0,
            skipSlashCommands: cmd.skipSlashCommands,
            bridgeOrigin: cmd.bridgeOrigin,
            isMeta: cmd.isMeta,
            skipAttachments: !isPrimary,
            origin: origin
          });
        if (origin) Rzn(processed.messages, origin);
        if (cmd.priority === "later") {
          for (let msg of processed.messages) if (msg.type === "user") msg.queuePriority = "later";
        }
        if (cmd.verifiedSlackHumanTurn) gtr(processed.messages, cmd.uuid);
        if (collectedMessages.push(...processed.messages), processed.engineDeferredSlash) engineDeferredSlash = processed.engineDeferredSlash;
        if (isPrimary) shouldQuery = processed.shouldQuery, allowedTools = processed.allowedTools, model = processed.model, effort = processed.effort, nextInput = processed.nextInput, submitNextInput = processed.submitNextInput;
      }
      if (am("query_process_user_input_end"), vT()) am("query_file_history_snapshot_start"), collectedMessages.filter(replayableUserMessagesFilter).forEach((msg: any) => {
        nlt(() => getAppState().fileHistory, (history: any) => setAppState((state: any) => {
          let nextHistory = p4e(state.fileHistory, history);
          if (nextHistory === state.fileHistory) return state;
          return {
            ...state,
            fileHistory: nextHistory
          };
        }), msg.uuid);
      }), am("query_file_history_snapshot_end");
      if (collectedMessages.length) {
        resetHistory(), setToolJSX({
          jsx: null,
          shouldHidePromptInput: !1,
          clearLocalJSX: !0
        });
        let primaryCommand = commandList[primaryIndex],
          primaryMode = primaryCommand?.mode ?? "prompt",
          primaryStringValue = primaryCommand && typeof primaryCommand.value === "string" ? primaryCommand.value : void 0,
          shouldRunBeforeQuery = primaryMode === "prompt" || primaryMode === "bash" && shouldQuery,
          stopHookActive = commandList.some((cmd: any) => cmd.stopHookActive) ? !0 : void 0,
          clientPlatform = primaryCommand?.clientPlatform;
        await onQuery(collectedMessages, abortController, shouldQuery, allowedTools ?? [], model ? resolveSkillModelOverride(model, mainLoopModel) : mainLoopModel, shouldRunBeforeQuery ? onBeforeQuery : void 0, primaryStringValue, effort, stopHookActive, clientPlatform, context.options?.activeSkill, engineDeferredSlash);
      } else queryGuard.cancelReservation(), setToolJSX({
        jsx: null,
        shouldHidePromptInput: !1,
        clearLocalJSX: !0
      }), resetHistory(), setAbortController(null), jae();
      if (nextInput) if (submitNextInput) oy({
        agentId: mainAgentId(),
        value: nextInput,
        mode: "prompt",
        origin: {
          kind: "auto-continuation"
        }
      });else processArgs.onInputChange(nextInput);
    }));
  } finally {
    queryGuard.cancelReservation(), setUserInputOnProcessing(void 0), jae();
  }
}
var pQl = b(() => {
  Epe();
  lt();
  ln();
  Ct();
  NVn();
  Sf();
  BYn();
  K4();
  ch();
  qe();
  Om();
  _6();
  iLo();
  ym();
  _q();
  sA();
  lo();
  Mo();
  RYn();
  B6e();
  Nq();
  oNe();
});
export {gtr,Z2m,_tr,dQl,pQl};
