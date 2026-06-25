// @ts-nocheck
import {ft,oo,b,x} from "../../runtime.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {isCustomTitleEnabled as UTe,loadSameRepoMessageLogsProgressive as pKt,enrichLogs as _Ge,loadAllProjectsMessageLogsProgressive as OXn,getSessionIdFromLog as fh,resetSessionFilePointer as XY,recordContentReplacement as T8e,_a,P3e,restoreSessionMetadata as Jue,adoptResumedSessionFile as Yue} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Ne} from "../../vendor/m583.ts";
import {useTerminalTitle as Zve,MAn} from "../../vendor/m2459.ts";
import {He,xe,mn} from "../telemetry/0600_feature_name.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {bjn,JHo,XHo} from "../../vendor/m4855.ts";
import {sw,hg} from "../../vendor/m2280.ts";
import {findLiveNonInteractiveSession as Q_e,loadConversationForResume as Jle,Xle} from "../permissions/3885_restoreSkillStateFromMessages.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {NO,k4} from "../permissions/2717_matchSessionMode.ts";
import {kg,wft} from "../permissions/4476_toAgentInfos.ts";
import {getOriginalCwd as gr,switchSession as ZE,lt} from "../session/0132_sent.ts";
import {wc,po} from "../tools/5224_userPromptCount.ts";
import {FT,xS} from "../../vendor/m122.ts";
import {renameRecordingForSession as X7t,Q7t} from "../../vendor/m5447.ts";
import {w$n,V$} from "../telemetry/3911_contextWindow.ts";
import {NSe,tzt,nVe,rVe,ezt,nzt,oVe} from "../permissions/5451_fileHistory.ts";
import {Eat} from "../../vendor/m3354.ts";
import {S7,vd} from "../session/1465_promise.ts";
import {mo,Ct} from "../../vendor/m197.ts";
import {REPL as M2o,N2o} from "./5663_TranscriptHelpMenu.ts";
import {Kyt,a$o} from "../../vendor/m5696.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {fjn,zHo} from "./4850_before.ts";
import {Sjn,YHo} from "../permissions/4855_path.ts";
import {Cs,zet,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {wyt,Ktr} from "../../vendor/m5572.ts";
import {useTimeout as md} from "../../vendor/m2460.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Ma} from "../../vendor/m2519.ts";
import {je} from "../../vendor/m2462.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var rfc = {};
ft(rfc, {
  parsePrIdentifier: () => parsePrIdentifier,
  ResumeConversation: () => ResumeConversation,
  LiveBgMessage: () => LiveBgMessage
});
/**
 * Parse a PR/MR identifier from either a raw number or a host URL.
 * Returns the numeric PR number, or null when nothing matches.
 */
function parsePrIdentifier(input: string): number | null {
  let numericId = parseInt(input, 10);
  if (!isNaN(numericId) && numericId > 0) return numericId;
  let urlMatch = input.match(/(?:https?:\/\/)?[^/\s]+\/[^\s]+?\/(?:pull|pull-requests|-\/merge_requests)\/(\d+)/);
  if (urlMatch?.[1]) return parseInt(urlMatch[1], 10);
  return null;
}
/** Resume-conversation picker screen: lists past sessions and resumes the chosen one. */
function ResumeConversation({
  commands: commandList,
  worktreePaths: worktreePathList,
  initialTools: initialToolList,
  mcpClients: mcpClientMap,
  dynamicMcpConfig: dynamicMcpConfigObj,
  debug: debugFlag,
  mainThreadAgentDefinition: mainThreadAgentDef,
  autoConnectIdeFlag: autoConnectIdeFlagValue,
  strictMcpConfig: strictMcpConfigFlag = !1,
  systemPrompt: systemPromptText,
  appendSystemPrompt: appendSystemPromptText,
  initialSearchQuery: initialSearchQueryText,
  disableSlashCommands: disableSlashCommandsFlag = !1,
  forkSession: forkSessionFlag,
  filterByPr: filterByPrValue,
  thinkingConfig: thinkingConfigObj,
  fallbackModel: fallbackModelName,
  onTurnComplete: onTurnCompleteHandler,
  onCaptureSnapshot: onCaptureSnapshotHandler
}) {
  let {
      rows: terminalRows
    } = _r(),
    agentDefinitions = _t(storeState => storeState.agentDefinitions),
    standaloneAgentCtx = _t(storeState => storeState.standaloneAgentContext),
    mainLoopModel = _t(storeState => storeState.mainLoopModel),
    dispatchStore = bo(),
    [sessionLogs, setSessionLogs] = Zw.useState([]),
    [isLoading, setIsLoading] = Zw.useState(!0),
    [isResuming, setIsResuming] = Zw.useState(!1),
    [showAllProjects, setShowAllProjects] = Zw.useState(!1),
    [resumedSession, setResumedSession] = Zw.useState(null),
    [liveSessionInfo, setLiveSessionInfo] = Zw.useState(null),
    [crossProjectCommand, setCrossProjectCommand] = Zw.useState(null),
    logsStateRef = Zw.useRef(null),
    [reloadGeneration, setReloadGeneration] = Zw.useState(0),
    loadedCountRef = Zw.useRef(0),
    reloadCountRef = Zw.useRef(0),
    filteredSessionLogs = Zw.useMemo(() => {
      let mainLogs = sessionLogs.filter(logEntry => !logEntry.isSidechain);
      if (filterByPrValue !== void 0) {
        if (filterByPrValue === !0) mainLogs = mainLogs.filter(logEntry => logEntry.prNumber !== void 0);else if (typeof filterByPrValue === "number") mainLogs = mainLogs.filter(logEntry => logEntry.prNumber === filterByPrValue);else if (typeof filterByPrValue === "string") {
          let parsedPrNumber = parsePrIdentifier(filterByPrValue);
          if (parsedPrNumber !== null) mainLogs = mainLogs.filter(logEntry2 => logEntry2.prNumber === parsedPrNumber);
        }
      }
      return mainLogs;
    }, [sessionLogs, filterByPrValue]),
    customTitleEnabled = UTe(),
    disableTerminalTitleEnv = Zw.useMemo(() => Ne.CLAUDE_CODE_DISABLE_TERMINAL_TITLE, []);
  Zve(resumedSession || disableTerminalTitleEnv ? null : "claude \xB7 resume"), Zw.useEffect(() => {
    pKt(worktreePathList).then(loadResult => {
      logsStateRef.current = loadResult, loadedCountRef.current = loadResult.logs.length, setSessionLogs(loadResult.logs), setIsLoading(!1), He("screen_resume_conversation");
    }).catch(loadError => {
      xe("screen_resume_conversation", "resume_conversation_load_failed"), Ie(loadError), setIsLoading(!1);
    });
  }, [worktreePathList]);
  let isLoadingMoreFlagRef = Zw.useRef(!1),
    loadMoreLogsBatch = Zw.useCallback(batchSize => {
      if (isLoadingMoreFlagRef.current) return;
      let currentLogsState = logsStateRef.current;
      if (!currentLogsState || currentLogsState.nextIndex >= currentLogsState.allStatLogs.length) return;
      isLoadingMoreFlagRef.current = !0;
      let hasMore = !1;
      _Ge(currentLogsState.allStatLogs, currentLogsState.nextIndex, batchSize).then(enriched => {
        if (logsStateRef.current !== currentLogsState) return;
        if (currentLogsState.nextIndex = enriched.nextIndex, enriched.logs.length > 0) {
          let baseValue = loadedCountRef.current;
          enriched.logs.forEach((logEntry, offset) => {
            logEntry.value = baseValue + offset;
          }), setSessionLogs(prevLogs => prevLogs.concat(enriched.logs)), loadedCountRef.current += enriched.logs.length;
        } else if (currentLogsState.nextIndex < currentLogsState.allStatLogs.length) hasMore = !0;
      }).finally(() => {
        if (isLoadingMoreFlagRef.current = !1, hasMore) loadMoreLogsBatch(batchSize);
      });
    }, []),
    reloadAllLogs = Zw.useCallback(allProjects => {
      setIsLoading(!0);
      let currentReloadGen = ++reloadCountRef.current,
        prevLogsState = logsStateRef.current;
      logsStateRef.current = null, setReloadGeneration(gen => gen + 1), (allProjects ? OXn() : pKt(worktreePathList)).then(reloadResult => {
        if (reloadCountRef.current !== currentReloadGen) return;
        logsStateRef.current = reloadResult, loadedCountRef.current = reloadResult.logs.length, setSessionLogs(reloadResult.logs);
      }).catch(reloadError => {
        if (reloadCountRef.current !== currentReloadGen) return;
        if (prevLogsState !== null) logsStateRef.current = prevLogsState;
        setSessionLogs(prevLogs => prevLogs.slice()), Ie(reloadError);
      }).finally(() => {
        if (reloadCountRef.current !== currentReloadGen) return;
        setIsLoading(!1);
      });
    }, [worktreePathList]),
    toggleAllProjects = Zw.useCallback(() => {
      let nextShowAll = !showAllProjects;
      setShowAllProjects(nextShowAll), reloadAllLogs(nextShowAll);
    }, [showAllProjects, reloadAllLogs]);
  function handleCancel() {
    process.exit(1);
  }
  async function handleSelect(selectedLog) {
    setIsResuming(!0);
    let startTime = performance.now(),
      crossProjectInfo = bjn(selectedLog, showAllProjects, worktreePathList);
    if (crossProjectInfo.isCrossProject) {
      if (!crossProjectInfo.isSameRepoWorktree) {
        let copyResult = await sw(crossProjectInfo.command);
        if (copyResult) process.stdout.write(copyResult);
        setCrossProjectCommand(crossProjectInfo.command);
        return;
      }
    }
    if (!forkSessionFlag) {
      let sessionId = fh(selectedLog);
      if (sessionId && (await Q_e(sessionId))) {
        setLiveSessionInfo({
          sessionId: sessionId,
          projectPath: selectedLog.projectPath
        });
        return;
      }
    }
    let resumeFailedEmitted = !1,
      failureReason = "load_error";
    try {
      let loadedSession = await Jle(selectedLog, void 0, {
        forkSession: forkSessionFlag ?? !1
      });
      if (!loadedSession) throw W("tengu_session_resumed", {
        entrypoint: Ve("picker"),
        success: !1,
        failure_reason: Ve("not_found_picker")
      }), resumeFailedEmitted = !0, Error("Failed to load conversation");
      failureReason = "processing_error";
      {
        let sessionModeWarning = (NO(), oo(k4)).matchSessionMode(loadedSession.mode);
        if (sessionModeWarning) {
          let {
            getAgentDefinitionsWithOverrides: getAgentDefsWithOverrides,
            getActiveAgentsFromList: getActiveAgents
          } = (kg(), oo(wft));
          getAgentDefsWithOverrides.cache.clear?.();
          let agentDefsResult = await getAgentDefsWithOverrides(gr());
          dispatchStore(prevState => ({
            ...prevState,
            agentDefinitions: {
              ...agentDefsResult,
              allAgents: agentDefsResult.allAgents,
              activeAgents: getActiveAgents(agentDefsResult.allAgents)
            }
          })), loadedSession.messages.push(wc(sessionModeWarning, "warning"));
        }
      }
      if (loadedSession.sessionId && !forkSessionFlag) ZE(FT(loadedSession.sessionId), "resume", selectedLog.fullPath ? efc.dirname(selectedLog.fullPath) : null), await X7t(), await XY(), w$n(loadedSession.sessionId);else if (forkSessionFlag && loadedSession.contentReplacements?.length) await T8e(loadedSession.contentReplacements);
      let {
        agentDefinition: resolvedAgentDef
      } = NSe(loadedSession.agentSetting, mainThreadAgentDef, agentDefinitions);
      if (resolvedAgentDef?.mcpServers?.length) await Eat();
      if (dispatchStore(prevState => ({
        ...prevState,
        agent: resolvedAgentDef?.agentType
      })), forkSessionFlag) tzt(loadedSession.messages);
      let modelOverride = nVe(loadedSession.messages, mainLoopModel, warningMsg => loadedSession.messages.push(wc(warningMsg, "warning"))),
        resolvedModel = modelOverride ? rVe(loadedSession.messages, modelOverride, Boolean(forkSessionFlag)) : void 0;
      if (resolvedModel) dispatchStore(prevState => prevState.mainLoopModel === resolvedModel ? prevState : {
        ...prevState,
        mainLoopModel: resolvedModel
      });
      {
        let {
            saveMode: saveMode
          } = (_a(), oo(P3e)),
          {
            isCoordinatorMode: isCoordinatorMode
          } = (NO(), oo(k4));
        saveMode(isCoordinatorMode() ? "coordinator" : "normal");
      }
      let baseAgentContext = ezt(loadedSession.agentName, loadedSession.agentColor),
        agentContext = standaloneAgentCtx ? {
          ...baseAgentContext,
          ...standaloneAgentCtx
        } : baseAgentContext;
      if (agentContext) dispatchStore(prevState => ({
        ...prevState,
        standaloneAgentContext: agentContext
      }));
      if (S7(agentContext?.name), Jue(forkSessionFlag ? {
        ...loadedSession,
        worktreeSession: void 0,
        bridgeSessionId: void 0,
        bridgeLastSeq: void 0,
        bridgeDialogKinds: void 0
      } : loadedSession), !forkSessionFlag && loadedSession.bridgeSessionId) dispatchStore(prevState => prevState.replBridgeEnabled && !prevState.replBridgeOutboundOnly ? prevState : {
        ...prevState,
        replBridgeEnabled: !0,
        replBridgeOutboundOnly: !1
      });
      if (!forkSessionFlag) {
        if (nzt(loadedSession.worktreeSession), loadedSession.sessionId) Yue();
      }
      W("tengu_session_resumed", {
        entrypoint: Ve("picker"),
        success: !0,
        resume_duration_ms: Math.round(performance.now() - startTime)
      }), setSessionLogs([]), setResumedSession({
        messages: loadedSession.messages,
        fileHistorySnapshots: loadedSession.fileHistorySnapshots,
        contentReplacements: loadedSession.contentReplacements,
        agentName: loadedSession.agentName,
        agentColor: loadedSession.agentColor === "default" ? void 0 : loadedSession.agentColor,
        mainThreadAgentDefinition: resolvedAgentDef
      });
    } catch (resumeError) {
      if (!resumeFailedEmitted) {
        let failureReasonValue = failureReason;
        W("tengu_session_resumed", {
          entrypoint: Ve("picker"),
          success: !1,
          failure_reason: Le(failureReasonValue),
          error_name: mo(resumeError).name
        });
      }
      throw Ie(resumeError), resumeError;
    }
  }
  if (liveSessionInfo) return mR.jsx(LiveBgMessage, {
    ...liveSessionInfo
  });
  if (crossProjectCommand) return mR.jsx(t7m, {
    command: crossProjectCommand
  });
  if (resumedSession) return mR.jsx(M2o, {
    debug: debugFlag,
    commands: commandList,
    initialTools: initialToolList,
    initialMessages: resumedSession.messages,
    initialFileHistorySnapshots: resumedSession.fileHistorySnapshots,
    initialContentReplacements: resumedSession.contentReplacements,
    initialAgentName: resumedSession.agentName,
    initialAgentColor: resumedSession.agentColor,
    mcpClients: mcpClientMap,
    dynamicMcpConfig: Kyt(dynamicMcpConfigObj ?? {}, resumedSession.mainThreadAgentDefinition, {
      strictMcpConfig: strictMcpConfigFlag
    }),
    strictMcpConfig: strictMcpConfigFlag,
    systemPrompt: systemPromptText,
    appendSystemPrompt: appendSystemPromptText,
    mainThreadAgentDefinition: resumedSession.mainThreadAgentDefinition,
    autoConnectIdeFlag: autoConnectIdeFlagValue,
    disableSlashCommands: disableSlashCommandsFlag,
    thinkingConfig: thinkingConfigObj,
    fallbackModel: fallbackModelName,
    onTurnComplete: onTurnCompleteHandler,
    onCaptureSnapshot: onCaptureSnapshotHandler
  });
  if (isLoading && (sessionLogs.length === 0 || filteredSessionLogs.length === 0)) return mR.jsx(l$o, {
    children: mR.jsx(Hc, {
      message: "Loading conversations…"
    })
  });
  if (isResuming) return mR.jsx(l$o, {
    children: mR.jsx(Hc, {
      message: "Resuming conversation…"
    })
  });
  return mR.jsx(l$o, {
    children: mR.jsx(fjn, {
      logs: filteredSessionLogs,
      maxHeight: terminalRows,
      onCancel: handleCancel,
      onSelect: handleSelect,
      onLogsChanged: customTitleEnabled ? () => reloadAllLogs(showAllProjects) : void 0,
      onLoadMore: loadMoreLogsBatch,
      initialSearchQuery: initialSearchQueryText,
      isLoading: isLoading,
      reloadGeneration: reloadGeneration,
      showAllProjects: showAllProjects,
      onToggleAllProjects: toggleAllProjects,
      onAgenticSearch: Sjn
    })
  });
}
/** Optional mouse-tracking wrapper around screen children (memoized). */
function l$o(props) {
  let reactCache = Srr.c(3),
    {
      children: childNodes
    } = props;
  if (!Cs()) return childNodes;
  let mouseTrackingFlag;
  if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) mouseTrackingFlag = zet(), reactCache[0] = mouseTrackingFlag;else mouseTrackingFlag = reactCache[0];
  let wrappedElement;
  if (reactCache[1] !== childNodes) wrappedElement = mR.jsx(wyt, {
    mouseTracking: mouseTrackingFlag,
    children: childNodes
  }), reactCache[1] = childNodes, reactCache[2] = wrappedElement;else wrappedElement = reactCache[2];
  return wrappedElement;
}
/** Cross-project notice: the chosen session lives in another directory; shows the cd+resume command. */
function t7m(props) {
  let reactCache = Srr.c(8),
    {
      command: shellCommand
    } = props,
    timeoutDepsRef;
  if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) timeoutDepsRef = [], reactCache[0] = timeoutDepsRef;else timeoutDepsRef = reactCache[0];
  md(n7m, 100, timeoutDepsRef);
  let differentDirText;
  if (reactCache[1] === Symbol.for("react.memo_cache_sentinel")) differentDirText = mR.jsx(v, {
    children: "This conversation is from a different directory."
  }), reactCache[1] = differentDirText;else differentDirText = reactCache[1];
  let toResumeText;
  if (reactCache[2] === Symbol.for("react.memo_cache_sentinel")) toResumeText = mR.jsx(v, {
    children: "To resume, run:"
  }), reactCache[2] = toResumeText;else toResumeText = reactCache[2];
  let commandBox;
  if (reactCache[3] !== shellCommand) commandBox = mR.jsxs($, {
    flexDirection: "column",
    children: [toResumeText, mR.jsxs(v, {
      children: [" ", shellCommand]
    })]
  }), reactCache[3] = shellCommand, reactCache[4] = commandBox;else commandBox = reactCache[4];
  let copiedHintText;
  if (reactCache[5] === Symbol.for("react.memo_cache_sentinel")) copiedHintText = mR.jsx(v, {
    dimColor: !0,
    children: "(Command copied to clipboard)"
  }), reactCache[5] = copiedHintText;else copiedHintText = reactCache[5];
  let outerBox;
  if (reactCache[6] !== commandBox) outerBox = mR.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [differentDirText, commandBox, copiedHintText]
  }), reactCache[6] = commandBox, reactCache[7] = outerBox;else outerBox = reactCache[7];
  return outerBox;
}
function n7m() {
  process.exit(0);
}
/** Background-agent notice: the chosen session is still running; shows attach/fork commands. */
function LiveBgMessage(props) {
  let reactCache = Srr.c(11),
    {
      sessionId: bgSessionId,
      projectPath: bgProjectPath
    } = props,
    timeoutDepsRef;
  if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) timeoutDepsRef = [], reactCache[0] = timeoutDepsRef;else timeoutDepsRef = reactCache[0];
  md(r7m, 100, timeoutDepsRef);
  let cdPrefix;
  if (reactCache[1] !== bgProjectPath) cdPrefix = bgProjectPath && bgProjectPath !== gr() ? `cd ${Ma([bgProjectPath])} ${JHo()} ` : "", reactCache[1] = bgProjectPath, reactCache[2] = cdPrefix;else cdPrefix = reactCache[2];
  let prefixStr = cdPrefix,
    stillRunningText;
  if (reactCache[3] === Symbol.for("react.memo_cache_sentinel")) stillRunningText = mR.jsx(v, {
    children: "That session is still running as a background agent."
  }), reactCache[3] = stillRunningText;else stillRunningText = reactCache[3];
  let openAgentsText;
  if (reactCache[4] === Symbol.for("react.memo_cache_sentinel")) openAgentsText = mR.jsxs(v, {
    children: ["Open ", mR.jsx(v, {
      bold: !0,
      children: "claude agents"
    }), " to attach to it, or run:"]
  }), reactCache[4] = openAgentsText;else openAgentsText = reactCache[4];
  let forkCommandBox;
  if (reactCache[5] !== prefixStr || reactCache[6] !== bgSessionId) forkCommandBox = mR.jsxs($, {
    flexDirection: "column",
    children: [openAgentsText, mR.jsxs(v, {
      children: [" ", prefixStr, "claude --resume ", bgSessionId, " --fork-session"]
    })]
  }), reactCache[5] = prefixStr, reactCache[6] = bgSessionId, reactCache[7] = forkCommandBox;else forkCommandBox = reactCache[7];
  let branchOffText;
  if (reactCache[8] === Symbol.for("react.memo_cache_sentinel")) branchOffText = mR.jsx(v, {
    dimColor: !0,
    children: "to branch off a copy."
  }), reactCache[8] = branchOffText;else branchOffText = reactCache[8];
  let outerBox;
  if (reactCache[9] !== forkCommandBox) outerBox = mR.jsxs($, {
    flexDirection: "column",
    gap: 1,
    children: [stillRunningText, forkCommandBox, branchOffText]
  }), reactCache[9] = forkCommandBox, reactCache[10] = outerBox;else outerBox = reactCache[10];
  return outerBox;
}
function r7m() {
  process.exit(0);
}
var Srr, efc, Zw, mR;
var ofc = b(() => {
  ui();
  lt();
  OE();
  zHo();
  V$();
  Ktr();
  MAn();
  hg();
  je();
  mn();
  kt();
  uo();
  xS();
  YHo();
  a$o();
  Q7t();
  vd();
  Xle();
  XHo();
  Ir();
  Ct();
  tp();
  vn();
  po();
  oVe();
  _a();
  N2o();
  Srr = x(tt(), 1), efc = require("path"), Zw = x(et(), 1), mR = x(oe(), 1);
});
export {rfc,parsePrIdentifier,ResumeConversation,l$o,t7m,n7m,LiveBgMessage,r7m,Srr,efc,Zw,mR,ofc};
