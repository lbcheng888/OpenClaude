// @ts-nocheck
import {isFullscreenWithTTY as pt,ro as Pr,b,M as L} from "../../runtime.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {mt as ft,bo as vo,configProtoStore as fo} from "../../vendor/m2458.ts";
import {isCustomTitleEnabled as X_e,loadSameRepoMessageLogsProgressive as u5t,enrichLogs as s8e,loadAllProjectsMessageLogsProgressive as z7n,getSessionIdFromLog as Ah,resetSessionFilePointer as ZY,recordContentReplacement as v6e,ja as za,b9e as X$e,restoreSessionMetadata as Iue,adoptResumedSessionFile as Hue} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {useTerminalTitle as ewe,YSn as pSn} from "../../vendor/m2449.ts";
import {Ie as He,Oe as Pe,ln as cn} from "../telemetry/0594_feature_name.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {DGn as GWn,ICo as wEo,DCo as REo} from "../../vendor/m4823.ts";
import {zR as VR,lg as og} from "../../vendor/m2269.ts";
import {findLiveNonInteractiveSession as yge,loadConversationForResume as jle,tce as Wle} from "../permissions/3867_restoreSkillStateFromMessages.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Qe,fromEnum as Ue} from "../../vendor/m5.ts";
import {_L as lL,lq as z4} from "../permissions/2705_matchSessionMode.ts";
import {scrubPathsConfig as u_,Rpt as rpt} from "../permissions/4454_toAgentInfos.ts";
import {getOriginalCwd as gr,switchSession as WE,lt as ct} from "../session/0131_sent.ts";
import {nu as Zc,lo} from "../tools/5190_userPromptCount.ts";
import {qT as LT,zE as jE} from "../../vendor/m125.ts";
import {renameRecordingForSession as KWt,wGt as zWt} from "../../vendor/m5414.ts";
import {M2n as JUn,H9 as h9} from "../telemetry/4045_contextWindow.ts";
import {sTe as jye,kGt as XWt,p5e as G8e,m5e as V8e,xGt as JWt,HGt as QWt,f5e as K8e} from "../permissions/5418_fileHistory.ts";
import {pDn as x0n} from "../../vendor/m3338.ts";
import {Y7 as O7,hp as gp} from "../session/1460_promise.ts";
import {_o,bt as St} from "../../vendor/m195.ts";
import {REPL as nMo,f1o as rMo} from "./5626_TranscriptHelpMenu.ts";
import {Eht as XAt,L1o as vMo} from "../../vendor/m5658.ts";
import {Jc as zc,vE as bE} from "../../vendor/m3837.ts";
import {vGn as BWn,xCo as EEo} from "./4818_before.tsx";
import {IGn as WWn,HCo as vEo} from "../permissions/4823_path.ts";
import {Ms as Ds,QFe as xFe,Pp as tm} from "../config/2273_loggedTmuxCcDisable.ts";
import {S5e as Q8e,GXn as ZJn} from "../../vendor/m5535.ts";
import {useTimeout as Nd} from "../../vendor/m2450.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Xa as Ja} from "../../vendor/m2509.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var moduleExports = {};
pt(moduleExports, {
  parsePrIdentifier: () => parsePrIdentifier,
  ResumeConversation: () => ResumeConversation,
  LiveBgMessage: () => LiveBgMessage_2
});
function parsePrIdentifier(input) {
  let numericId = parseInt(input, 10);
  if (!isNaN(numericId) && numericId > 0) return numericId;
  let urlMatch = input.match(/(?:https?:\/\/)?[^/\s]+\/[^\s]+?\/(?:pull|pull-requests|-\/merge_requests)\/(\d+)/);
  if (urlMatch?.[1]) return parseInt(urlMatch[1], 10);
  return null;
}
function ResumeConversation({
  commands: commandList,
  worktreePaths: worktreePathList,
  initialTools: initialToolList,
  mcpClients: mcpClientMap,
  dynamicMcpConfig: dynamicMcpConfigObj,
  debug: debugFlag,
  mainThreadAgentDefinition: mainThreadAgentDef,
  autoConnectIdeFlag: autoConnectIdeFlagValue,
  strictMcpConfig: strictMcpConfigFlag = false,
  systemPrompt: systemPromptText,
  appendSystemPrompt: appendSystemPromptText,
  initialSearchQuery: initialSearchQueryText,
  disableSlashCommands: disableSlashCommandsFlag = false,
  forkSession: forkSessionFlag,
  filterByPr: filterByPrValue,
  thinkingConfig: thinkingConfigObj,
  fallbackModel: fallbackModelName,
  onTurnComplete: onTurnCompleteHandler,
  onCaptureSnapshot: onCaptureSnapshotHandler
}) {
  let {
      rows: terminalRows
    } = hr(),
    agentDefinitions = ft(storeState => storeState.agentDefinitions),
    standaloneAgentCtx = ft(storeState => storeState.standaloneAgentContext),
    mainLoopModel = ft(storeState => storeState.mainLoopModel),
    dispatchStore = vo(),
    [sessionLogs, setSessionLogs] = mO.useState([]),
    [isLoading, setIsLoading] = mO.useState(true),
    [isResuming, setIsResuming] = mO.useState(false),
    [showAllProjects, setShowAllProjects] = mO.useState(false),
    [resumedSession, setResumedSession] = mO.useState(null),
    [liveSessionInfo, setLiveSessionInfo] = mO.useState(null),
    [crossProjectCommand, setCrossProjectCommand] = mO.useState(null),
    logsStateRef = mO.useRef(null),
    [reloadGeneration, setReloadGeneration] = mO.useState(0),
    loadedCountRef = mO.useRef(0),
    reloadCountRef = mO.useRef(0),
    filteredSessionLogs = mO.useMemo(() => {
      let mainLogs = sessionLogs.filter(logEntry => !logEntry.isSidechain);
      if (filterByPrValue !== undefined) {
        if (filterByPrValue === true) mainLogs = mainLogs.filter(logEntry => logEntry.prNumber !== undefined);else if (typeof filterByPrValue === "number") mainLogs = mainLogs.filter(logEntry => logEntry.prNumber === filterByPrValue);else if (typeof filterByPrValue === "string") {
          let parsedPrNumber = parsePrIdentifier(filterByPrValue);
          if (parsedPrNumber !== null) mainLogs = mainLogs.filter(logEntry2 => logEntry2.prNumber === parsedPrNumber);
        }
      }
      return mainLogs;
    }, [sessionLogs, filterByPrValue]),
    customTitleEnabled = X_e(),
    disableTerminalTitleEnv = mO.useMemo(() => Ge.CLAUDE_CODE_DISABLE_TERMINAL_TITLE, []);
  ewe(resumedSession || disableTerminalTitleEnv ? null : "claude \xB7 resume"), mO.useEffect(() => {
    u5t(worktreePathList).then(fH => {
      logsStateRef.current = fH, loadedCountRef.current = fH.logs.length, setSessionLogs(fH.logs), setIsLoading(false), He("screen_resume_conversation");
    }).catch(fH => {
      Pe("screen_resume_conversation", "resume_conversation_load_failed"), Ie(fH), setIsLoading(false);
    });
  }, [worktreePathList]);
  let KH = mO.useRef(false),
    isLoadingMoreRef = mO.useCallback(fH => {
      if (KH.current) return;
      let TH = logsStateRef.current;
      if (!TH || TH.nextIndex >= TH.allStatLogs.length) return;
      KH.current = true;
      let MH = false;
      s8e(TH.allStatLogs, TH.nextIndex, fH).then(PH => {
        if (logsStateRef.current !== TH) return;
        if (TH.nextIndex = PH.nextIndex, PH.logs.length > 0) {
          let DH = loadedCountRef.current;
          PH.logs.forEach((zH, RH) => {
            zH.value = DH + RH;
          }), setSessionLogs(zH => zH.concat(PH.logs)), loadedCountRef.current += PH.logs.length;
        } else if (TH.nextIndex < TH.allStatLogs.length) MH = true;
      }).finally(() => {
        if (KH.current = false, MH) isLoadingMoreRef(fH);
      });
    }, []),
    loadMoreLogs = mO.useCallback(batchSize => {
      setIsLoading(true);
      let currentLogsState = ++reloadCountRef.current,
        MH = logsStateRef.current;
      logsStateRef.current = null, setReloadGeneration(DH => DH + 1), (batchSize ? z7n() : u5t(worktreePathList)).then(DH => {
        if (reloadCountRef.current !== currentLogsState) return;
        logsStateRef.current = DH, loadedCountRef.current = DH.logs.length, setSessionLogs(DH.logs);
      }).catch(DH => {
        if (reloadCountRef.current !== currentLogsState) return;
        if (MH !== null) logsStateRef.current = MH;
        setSessionLogs(zH => zH.slice()), Ie(DH);
      }).finally(() => {
        if (reloadCountRef.current !== currentLogsState) return;
        setIsLoading(false);
      });
    }, [worktreePathList]),
    reloadLogs = mO.useCallback(() => {
      let fH = !showAllProjects;
      setShowAllProjects(fH), loadMoreLogs(fH);
    }, [showAllProjects, loadMoreLogs]);
  function AH() {
    process.exit(1);
  }
  async function handleCancel(fH) {
    setIsResuming(true);
    let TH = performance.now(),
      MH = GWn(fH, showAllProjects, worktreePathList);
    if (MH.isCrossProject) {
      if (!MH.isSameRepoWorktree) {
        let zH = await VR(MH.command);
        if (zH) process.stdout.write(zH);
        setCrossProjectCommand(MH.command);
        return;
      }
    }
    if (!forkSessionFlag) {
      let zH = Ah(fH);
      if (zH && (await yge(zH))) {
        setLiveSessionInfo({
          sessionId: zH,
          projectPath: fH.projectPath
        });
        return;
      }
    }
    let PH = false,
      DH = "load_error";
    try {
      let zH = await jle(fH, undefined, {
        forkSession: forkSessionFlag ?? false
      });
      if (!zH) throw j("tengu_session_resumed", {
        entrypoint: Qe("picker"),
        success: false,
        failure_reason: Qe("not_found_picker")
      }), PH = true, Error("Failed to load conversation");
      DH = "processing_error";
      {
        let QH = (lL(), Pr(z4)).matchSessionMode(zH.mode);
        if (QH) {
          let {
            getAgentDefinitionsWithOverrides: uH,
            getActiveAgentsFromList: UH
          } = (u_(), Pr(rpt));
          uH.cache.clear?.();
          let sH = await uH(gr());
          dispatchStore(q_ => ({
            ...q_,
            agentDefinitions: {
              ...sH,
              allAgents: sH.allAgents,
              activeAgents: UH(sH.allAgents)
            }
          })), zH.messages.push(Zc(QH, "warning"));
        }
      }
      if (zH.sessionId && !forkSessionFlag) WE(LT(zH.sessionId), "resume", fH.fullPath ? DH1.dirname(fH.fullPath) : null), await KWt(), await ZY(), JUn(zH.sessionId);else if (forkSessionFlag && zH.contentReplacements?.length) await v6e(zH.contentReplacements);
      let {
        agentDefinition: RH
      } = jye(zH.agentSetting, mainThreadAgentDef, agentDefinitions);
      if (RH?.mcpServers?.length) await x0n();
      if (dispatchStore(Be => ({
        ...Be,
        agent: RH?.agentType
      })), forkSessionFlag) XWt(zH.messages);
      let kH = G8e(zH.messages, mainLoopModel, Be => zH.messages.push(Zc(Be, "warning"))),
        Ce = kH ? V8e(zH.messages, kH, Boolean(forkSessionFlag)) : undefined;
      if (Ce) dispatchStore(Be => Be.mainLoopModel === Ce ? Be : {
        ...Be,
        mainLoopModel: Ce
      });
      {
        let {
            saveMode: Be
          } = (za(), Pr(X$e)),
          {
            isCoordinatorMode: Ke
          } = (lL(), Pr(z4));
        Be(Ke() ? "coordinator" : "normal");
      }
      let vH = JWt(zH.agentName, zH.agentColor),
        we = standaloneAgentCtx ? {
          ...vH,
          ...standaloneAgentCtx
        } : vH;
      if (we) dispatchStore(BH => ({
        ...BH,
        standaloneAgentContext: we
      }));
      if (O7(we?.name), Iue(forkSessionFlag ? {
        ...zH,
        worktreeSession: undefined,
        bridgeSessionId: undefined,
        bridgeLastSeq: undefined,
        bridgeDialogKinds: undefined
      } : zH), !forkSessionFlag && zH.bridgeSessionId) dispatchStore(Be => Be.replBridgeEnabled && !Be.replBridgeOutboundOnly ? Be : {
        ...Be,
        replBridgeEnabled: true,
        replBridgeOutboundOnly: false
      });
      if (!forkSessionFlag) {
        if (QWt(zH.worktreeSession), zH.sessionId) Hue();
      }
      j("tengu_session_resumed", {
        entrypoint: Qe("picker"),
        success: true,
        resume_duration_ms: Math.round(performance.now() - TH)
      }), setSessionLogs([]), setResumedSession({
        messages: zH.messages,
        fileHistorySnapshots: zH.fileHistorySnapshots,
        contentReplacements: zH.contentReplacements,
        agentName: zH.agentName,
        agentColor: zH.agentColor === "default" ? undefined : zH.agentColor,
        mainThreadAgentDefinition: RH
      });
    } catch (zH) {
      if (!PH) {
        let RH = DH;
        j("tengu_session_resumed", {
          entrypoint: Qe("picker"),
          success: false,
          failure_reason: Ue(RH),
          error_name: _o(zH).name
        });
      }
      throw Ie(zH), zH;
    }
  }
  if (liveSessionInfo) return mO.default.createElement(LiveBgMessage_2, {
    ...liveSessionInfo
  });
  if (crossProjectCommand) return mO.default.createElement(LiveBgMessage, {
    command: crossProjectCommand
  });
  if (resumedSession) return mO.default.createElement(nMo, {
    debug: debugFlag,
    commands: commandList,
    initialTools: initialToolList,
    initialMessages: resumedSession.messages,
    initialFileHistorySnapshots: resumedSession.fileHistorySnapshots,
    initialContentReplacements: resumedSession.contentReplacements,
    initialAgentName: resumedSession.agentName,
    initialAgentColor: resumedSession.agentColor,
    mcpClients: mcpClientMap,
    dynamicMcpConfig: XAt(dynamicMcpConfigObj ?? {}, resumedSession.mainThreadAgentDefinition, {
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
  if (isLoading && (sessionLogs.length === 0 || filteredSessionLogs.length === 0)) return mO.default.createElement(ScreenWrapper, null, mO.default.createElement(zc, {
    message: "Loading conversations\u2026"
  }));
  if (isResuming) return mO.default.createElement(ScreenWrapper, null, mO.default.createElement(zc, {
    message: "Resuming conversation\u2026"
  }));
  return mO.default.createElement(ScreenWrapper, null, mO.default.createElement(BWn, {
    logs: filteredSessionLogs,
    maxHeight: terminalRows,
    onCancel: AH,
    onSelect: handleCancel,
    onLogsChanged: customTitleEnabled ? () => loadMoreLogs(showAllProjects) : undefined,
    onLoadMore: isLoadingMoreRef,
    initialSearchQuery: initialSearchQueryText,
    isLoading: isLoading,
    reloadGeneration: reloadGeneration,
    showAllProjects: showAllProjects,
    onToggleAllProjects: reloadLogs,
    onAgenticSearch: WWn
  }));
}
function ScreenWrapper(props) {
  let reactCache = hs6.c(3),
    {
      children: childNodes
    } = props;
  if (!Ds()) return childNodes;
  let mouseTrackingFlag;
  if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) mouseTrackingFlag = xFe(), reactCache[0] = mouseTrackingFlag;else mouseTrackingFlag = reactCache[0];
  let wrappedElement;
  if (reactCache[1] !== childNodes) wrappedElement = mO.default.createElement(Q8e, {
    mouseTracking: mouseTrackingFlag
  }, childNodes), reactCache[1] = childNodes, reactCache[2] = wrappedElement;else wrappedElement = reactCache[2];
  return wrappedElement;
}
function LiveBgMessage(props) {
  let reactCache = hs6.c(8),
    {
      command: shellCommand
    } = props,
    timeoutDepsRef;
  if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) timeoutDepsRef = [], reactCache[0] = timeoutDepsRef;else timeoutDepsRef = reactCache[0];
  Nd(exitAfterCrossProject, 100, timeoutDepsRef);
  let differentDirText;
  if (reactCache[1] === Symbol.for("react.memo_cache_sentinel")) differentDirText = mO.default.createElement(w, null, "This conversation is from a different directory."), reactCache[1] = differentDirText;else differentDirText = reactCache[1];
  let toResumeText;
  if (reactCache[2] === Symbol.for("react.memo_cache_sentinel")) toResumeText = mO.default.createElement(w, null, "To resume, run:"), reactCache[2] = toResumeText;else toResumeText = reactCache[2];
  let commandBox;
  if (reactCache[3] !== shellCommand) commandBox = mO.default.createElement(B, {
    flexDirection: "column"
  }, toResumeText, mO.default.createElement(w, null, " ", shellCommand)), reactCache[3] = shellCommand, reactCache[4] = commandBox;else commandBox = reactCache[4];
  let copiedHintText;
  if (reactCache[5] === Symbol.for("react.memo_cache_sentinel")) copiedHintText = mO.default.createElement(w, {
    dimColor: true
  }, "(Command copied to clipboard)"), reactCache[5] = copiedHintText;else copiedHintText = reactCache[5];
  let outerBox;
  if (reactCache[6] !== commandBox) outerBox = mO.default.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, differentDirText, commandBox, copiedHintText), reactCache[6] = commandBox, reactCache[7] = outerBox;else outerBox = reactCache[7];
  return outerBox;
}
function exitAfterCrossProject() {
  process.exit(0);
}
function LiveBgMessage_2(props) {
  let reactCache = hs6.c(11),
    {
      sessionId: bgSessionId,
      projectPath: bgProjectPath
    } = props,
    timeoutDepsRef;
  if (reactCache[0] === Symbol.for("react.memo_cache_sentinel")) timeoutDepsRef = [], reactCache[0] = timeoutDepsRef;else timeoutDepsRef = reactCache[0];
  Nd(exitAfterLiveBg, 100, timeoutDepsRef);
  let cdPrefix;
  if (reactCache[1] !== bgProjectPath) cdPrefix = bgProjectPath && bgProjectPath !== gr() ? `cd ${Ja([bgProjectPath])} ${wEo()} ` : "", reactCache[1] = bgProjectPath, reactCache[2] = cdPrefix;else cdPrefix = reactCache[2];
  let prefixStr = cdPrefix,
    stillRunningText;
  if (reactCache[3] === Symbol.for("react.memo_cache_sentinel")) stillRunningText = mO.default.createElement(w, null, "That session is still running as a background agent."), reactCache[3] = stillRunningText;else stillRunningText = reactCache[3];
  let openAgentsText;
  if (reactCache[4] === Symbol.for("react.memo_cache_sentinel")) openAgentsText = mO.default.createElement(w, null, "Open ", mO.default.createElement(w, {
    bold: true
  }, "claude agents"), " to attach to it, or run:"), reactCache[4] = openAgentsText;else openAgentsText = reactCache[4];
  let forkCommandBox;
  if (reactCache[5] !== prefixStr || reactCache[6] !== bgSessionId) forkCommandBox = mO.default.createElement(B, {
    flexDirection: "column"
  }, openAgentsText, mO.default.createElement(w, null, " ", prefixStr, "claude --resume ", bgSessionId, " --fork-session")), reactCache[5] = prefixStr, reactCache[6] = bgSessionId, reactCache[7] = forkCommandBox;else forkCommandBox = reactCache[7];
  let branchOffText;
  if (reactCache[8] === Symbol.for("react.memo_cache_sentinel")) branchOffText = mO.default.createElement(w, {
    dimColor: true
  }, "to branch off a copy."), reactCache[8] = branchOffText;else branchOffText = reactCache[8];
  let outerBox;
  if (reactCache[9] !== forkCommandBox) outerBox = mO.default.createElement(B, {
    flexDirection: "column",
    gap: 1
  }, stillRunningText, forkCommandBox, branchOffText), reactCache[9] = forkCommandBox, reactCache[10] = outerBox;else outerBox = reactCache[10];
  return outerBox;
}
function exitAfterLiveBg() {
  process.exit(0);
}
var hs6, DH1, mO;
var moduleInit = b(() => {
  Ii();
  ct();
  bE();
  EEo();
  h9();
  ZJn();
  pSn();
  og();
  Je();
  cn();
  Ct();
  fo();
  jE();
  vEo();
  vMo();
  zWt();
  gp();
  Wle();
  REo();
  Or();
  St();
  tm();
  wn();
  lo();
  K8e();
  za();
  rMo();
  hs6 = L(nt(), 1), DH1 = require("path"), mO = L(Te(), 1);
});

export {moduleExports as fsc,parsePrIdentifier,ResumeConversation,ScreenWrapper as M1o,LiveBgMessage as x3m,exitAfterCrossProject as k3m,LiveBgMessage_2 as LiveBgMessage,exitAfterLiveBg as H3m,hs6 as aZn,DH1 as dsc,mO as Up,moduleInit as Asc};
