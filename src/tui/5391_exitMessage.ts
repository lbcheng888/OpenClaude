// @ts-nocheck
import {Wjl,Gjl} from "../agent/5383_columns.ts";
import {aAn,Uve} from "../../vendor/m2390.ts";
import {pl,sM,Nu,Wu} from "../../vendor/m438.ts";
import {eYl,tYl} from "../../vendor/m5386.ts";
import {Yjl,Jjl} from "../../vendor/m5384.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {HBt,Nee,rat} from "../telemetry/3328_stdout.ts";
import {Hqa,ymo,kqa,Smo} from "../../vendor/m4069.ts";
import {cWl,aZn} from "../../vendor/m5259.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {h6,zft} from "../../vendor/m4552.ts";
import {Kjl,zjl} from "../../vendor/m5383.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {P6e,J9n} from "../core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {wu,$k} from "./2575_current.ts";
import {Qjl,Zjl} from "../../vendor/m5385.ts";
import {lde,H7t} from "../telemetry/5340_user_intent_store.ts";
import {useVoiceState as _I,The} from "../../vendor/m2467.ts";
import {Mxi,useSelection as ghe,$tt} from "../../vendor/m2457.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {hgt,WTe} from "../../vendor/m4890.ts";
import {j$t,C2n} from "../../vendor/m3844.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {useIsScreenReaderEnabled as Hd,Jve} from "../../vendor/m2444.ts";
import {Jas,YN,eYe,tQ,FS} from "../../vendor/m722.ts";
import {v5n,fmt,B5e} from "../core/4310_inFlight.ts";
import {pjl,dde,qJ,cyt} from "../../vendor/m5372.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {VoiceWarmupHint as UGe,cer} from "../../vendor/m5352.ts";
import {x5,Pa,Oas} from "../../vendor/m720.ts";
import {PFo,Njl} from "../../vendor/m5380.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {getIsRemoteMode as la,lt} from "../session/0132_sent.ts";
import {xy,nS} from "../config/2351_nS.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {Link as Ss,yie} from "../../vendor/m2437.ts";
import {sYl,NFo} from "../../vendor/m5389.ts";
import {b,x,oo} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {IAe} from "../../vendor/m1451.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
import {NO,k4} from "../permissions/2717_matchSessionMode.ts";
// @ts-nocheck
function lYl(props) {
  let memoCache = Mer.c(58),
    {
      exitMessage: exitMessage,
      leftArrowPending: leftArrowPending,
      leftArrowDetachAvailable: leftArrowDetachAvailable,
      vimMode: vimMode,
      hideVimModeIndicator: hideVimModeIndicator,
      mode: mode,
      toolPermissionContext: toolPermissionContext,
      suppressHint: suppressHint,
      suppressHintExceptStatusline: suppressHintExceptStatusline,
      isInputEmpty: isInputEmpty,
      isLoading: isLoading,
      isExternalLoading: isExternalLoadingProp,
      betweenCalls: betweenCallsProp,
      tasksSelected: tasksSelected,
      tmuxSelected: tmuxSelected,
      isPasting: isPasting,
      showExpandPasteHint: showExpandPasteHint,
      isSearching: isSearching,
      historyQuery: historyQuery,
      setHistoryQuery: setHistoryQuery,
      historyFailedMatch: historyFailedMatch,
      onOpenTasksDialog: onOpenTasksDialog
    } = props,
    suppressHintFinal = suppressHintExceptStatusline === undefined ? suppressHint : suppressHintExceptStatusline,
    isExternalLoading = isExternalLoadingProp === undefined ? false : isExternalLoadingProp,
    betweenCalls = betweenCallsProp === undefined ? true : betweenCallsProp;
  Wjl();
  let prKind = aAn(),
    prStatusEnabled;
  if (memoCache[0] !== prKind) prStatusEnabled = mBm(prKind) && !pl(), memoCache[0] = prKind, memoCache[1] = prStatusEnabled;else prStatusEnabled = memoCache[1];
  let prStatusEnabledFinal = prStatusEnabled,
    prFooterInfo = eYl(isLoading, prStatusEnabledFinal),
    branchPr = Yjl(),
    resolvedPr;
  if (memoCache[2] !== branchPr || memoCache[3] !== prFooterInfo.pr || memoCache[4] !== prStatusEnabledFinal) resolvedPr = prStatusEnabledFinal && prFooterInfo.pr ? prFooterInfo.pr : branchPr ? {
    number: branchPr.number,
    url: branchPr.url,
    reviewState: undefined,
    kind: undefined
  } : null, memoCache[2] = branchPr, memoCache[3] = prFooterInfo.pr, memoCache[4] = prStatusEnabledFinal, memoCache[5] = resolvedPr;else resolvedPr = memoCache[5];
  let pr = resolvedPr,
    prNeedsAuth = !pr && prStatusEnabledFinal && prFooterInfo.needsAuth,
    prUrlTemplate = _t(cBm),
    prDisplayUrl;
  if (memoCache[6] !== pr || memoCache[7] !== prUrlTemplate) prDisplayUrl = pr ? HBt(pr.url, prUrlTemplate) : undefined, memoCache[6] = pr, memoCache[7] = prUrlTemplate, memoCache[8] = prDisplayUrl;else prDisplayUrl = memoCache[8];
  Hqa(prDisplayUrl, pr?.url, pr?.kind);
  let setFooterState = bo(),
    prNumber = pr?.number,
    prUrl = pr?.url,
    prReviewState = pr?.reviewState,
    prKind2 = pr?.kind,
    prHasUpdate = prFooterInfo.lastUpdated > 0 || Nee.disabled,
    syncPrEffect,
    syncPrDeps;
  if (memoCache[9] !== prKind2 || memoCache[10] !== prNumber || memoCache[11] !== prReviewState || memoCache[12] !== prUrl || memoCache[13] !== prHasUpdate || memoCache[14] !== prUrlTemplate || memoCache[15] !== setFooterState) syncPrEffect = () => {
    setFooterState(prevState => {
      let keepFromStore = !prHasUpdate && prevState.prStatus !== null && (prNumber === undefined || prNumber === prevState.prStatus.number && prevState.prStatus.kind === prKind2 && prReviewState === undefined && prevState.prStatus.reviewState !== undefined),
        matchesStore = prevState.prStatus?.number === prNumber && prevState.prStatus?.url === prUrl && prevState.prStatus?.reviewState === prReviewState && prevState.prStatus?.kind === prKind2,
        nextPrStatus = keepFromStore || matchesStore ? prevState.prStatus : prNumber !== undefined && prUrl !== undefined ? {
          number: prNumber,
          url: prUrl,
          reviewState: prReviewState,
          kind: prKind2
        } : null,
        nextFooterLinks = cWl(prevState.footerLinks, ymo, kqa(nextPrStatus, nextPrStatus ? nextPrStatus.kind === "cr" ? nextPrStatus.url : HBt(nextPrStatus.url, prUrlTemplate) : undefined));
      if (nextPrStatus === prevState.prStatus && nextFooterLinks === prevState.footerLinks) return prevState;
      return {
        ...prevState,
        prStatus: nextPrStatus,
        footerLinks: nextFooterLinks
      };
    });
  }, syncPrDeps = [prNumber, prUrl, prReviewState, prKind2, prHasUpdate, prUrlTemplate, setFooterState], memoCache[9] = prKind2, memoCache[10] = prNumber, memoCache[11] = prReviewState, memoCache[12] = prUrl, memoCache[13] = prHasUpdate, memoCache[14] = prUrlTemplate, memoCache[15] = setFooterState, memoCache[16] = syncPrEffect, memoCache[17] = syncPrDeps;else syncPrEffect = memoCache[16], syncPrDeps = memoCache[17];
  TV.useEffect(syncPrEffect, syncPrDeps);
  let prNeedsAuthDeps, prNeedsAuthEffect;
  if (memoCache[18] !== prNeedsAuth || memoCache[19] !== setFooterState) prNeedsAuthEffect = () => {
    setFooterState(prevState => prevState.prNeedsAuth === prNeedsAuth ? prevState : {
      ...prevState,
      prNeedsAuth: prNeedsAuth
    });
  }, prNeedsAuthDeps = [prNeedsAuth, setFooterState], memoCache[18] = prNeedsAuth, memoCache[19] = setFooterState, memoCache[20] = prNeedsAuthDeps, memoCache[21] = prNeedsAuthEffect;else prNeedsAuthDeps = memoCache[20], prNeedsAuthEffect = memoCache[21];
  if (TV.useEffect(prNeedsAuthEffect, prNeedsAuthDeps), exitMessage.show) {
    let exitAction = exitMessage.action === "clear" ? "/clear" : Ws() || sM("catchupReplay") ? "detach (session keeps running)" : "exit",
      exitNode;
    if (memoCache[22] !== exitMessage.key || memoCache[23] !== exitAction) exitNode = si.jsxs(v, {
      dimColor: true,
      children: ["Press ", exitMessage.key, " again to", " ", exitAction]
    }, "exit-message"), memoCache[22] = exitMessage.key, memoCache[23] = exitAction, memoCache[24] = exitNode;else exitNode = memoCache[24];
    return exitNode;
  }
  if (isPasting) {
    let pastingNode;
    if (memoCache[25] === Symbol.for("react.memo_cache_sentinel")) pastingNode = si.jsx(v, {
      dimColor: true,
      children: "Pasting\u2026"
    }, "pasting-message"), memoCache[25] = pastingNode;else pastingNode = memoCache[25];
    return pastingNode;
  }
  if (showExpandPasteHint && !isSearching) {
    let expandPasteNode;
    if (memoCache[26] === Symbol.for("react.memo_cache_sentinel")) expandPasteNode = si.jsx(v, {
      dimColor: true,
      children: "paste again to expand"
    }, "expand-paste-hint"), memoCache[26] = expandPasteNode;else expandPasteNode = memoCache[26];
    return expandPasteNode;
  }
  let showVimIndicator;
  if (memoCache[27] !== hideVimModeIndicator || memoCache[28] !== isSearching || memoCache[29] !== vimMode) showVimIndicator = h6() && !hideVimModeIndicator && vimMode !== "NORMAL" && !isSearching, memoCache[27] = hideVimModeIndicator, memoCache[28] = isSearching, memoCache[29] = vimMode, memoCache[30] = showVimIndicator;else showVimIndicator = memoCache[30];
  let showVimIndicatorFinal = showVimIndicator,
    historySearchNode;
  if (memoCache[31] !== historyFailedMatch || memoCache[32] !== historyQuery || memoCache[33] !== isSearching || memoCache[34] !== setHistoryQuery) historySearchNode = isSearching && si.jsx(Kjl, {
    value: historyQuery,
    onChange: setHistoryQuery,
    historyFailedMatch: historyFailedMatch
  }), memoCache[31] = historyFailedMatch, memoCache[32] = historyQuery, memoCache[33] = isSearching, memoCache[34] = setHistoryQuery, memoCache[35] = historySearchNode;else historySearchNode = memoCache[35];
  let vimIndicatorNode;
  if (memoCache[36] !== showVimIndicatorFinal || memoCache[37] !== vimMode) vimIndicatorNode = showVimIndicatorFinal ? si.jsxs(v, {
    dimColor: true,
    children: ["-- ", vimMode, " --"]
  }, "vim-indicator") : null, memoCache[36] = showVimIndicatorFinal, memoCache[37] = vimMode, memoCache[38] = vimIndicatorNode;else vimIndicatorNode = memoCache[38];
  let showHint = !suppressHint && !showVimIndicatorFinal,
    denseShowHint = !suppressHintFinal && !showVimIndicatorFinal,
    hintBarNode;
  if (memoCache[39] !== betweenCalls || memoCache[40] !== isExternalLoading || memoCache[41] !== isInputEmpty || memoCache[42] !== isLoading || memoCache[43] !== leftArrowDetachAvailable || memoCache[44] !== leftArrowPending || memoCache[45] !== mode || memoCache[46] !== onOpenTasksDialog || memoCache[47] !== prNeedsAuth || memoCache[48] !== showHint || memoCache[49] !== denseShowHint || memoCache[50] !== tasksSelected || memoCache[51] !== tmuxSelected || memoCache[52] !== toolPermissionContext) hintBarNode = si.jsx(uBm, {
    mode: mode,
    toolPermissionContext: toolPermissionContext,
    showHint: showHint,
    denseShowHint: denseShowHint,
    isInputEmpty: isInputEmpty,
    isLoading: isLoading,
    isExternalLoading: isExternalLoading,
    betweenCalls: betweenCalls,
    leftArrowPending: leftArrowPending,
    leftArrowDetachAvailable: leftArrowDetachAvailable,
    tasksSelected: tasksSelected,
    tmuxSelected: tmuxSelected,
    onOpenTasksDialog: onOpenTasksDialog,
    prNeedsAuth: prNeedsAuth
  }), memoCache[39] = betweenCalls, memoCache[40] = isExternalLoading, memoCache[41] = isInputEmpty, memoCache[42] = isLoading, memoCache[43] = leftArrowDetachAvailable, memoCache[44] = leftArrowPending, memoCache[45] = mode, memoCache[46] = onOpenTasksDialog, memoCache[47] = prNeedsAuth, memoCache[48] = showHint, memoCache[49] = denseShowHint, memoCache[50] = tasksSelected, memoCache[51] = tmuxSelected, memoCache[52] = toolPermissionContext, memoCache[53] = hintBarNode;else hintBarNode = memoCache[53];
  let rootNode;
  if (memoCache[54] !== historySearchNode || memoCache[55] !== vimIndicatorNode || memoCache[56] !== hintBarNode) rootNode = si.jsxs($, {
    justifyContent: "flex-start",
    gap: 1,
    children: [historySearchNode, vimIndicatorNode, hintBarNode]
  }), memoCache[54] = historySearchNode, memoCache[55] = vimIndicatorNode, memoCache[56] = hintBarNode, memoCache[57] = rootNode;else rootNode = memoCache[57];
  return rootNode;
}
function cBm(state) {
  return state.settings?.prUrlTemplate;
}
function uBm({
  mode: mode,
  toolPermissionContext: toolPermissionContext,
  showHint: showHint,
  denseShowHint: denseShowHint,
  isInputEmpty: isInputEmpty,
  isLoading: isLoading,
  isExternalLoading: isExternalLoading,
  betweenCalls: betweenCalls,
  leftArrowPending: leftArrowPending,
  leftArrowDetachAvailable: leftArrowDetachAvailable,
  tasksSelected: tasksSelected,
  tmuxSelected: tmuxSelected,
  onOpenTasksDialog: onOpenTasksDialog,
  prNeedsAuth: prNeedsAuth
}) {
  let {
    columns: columns
  } = _r();
  P6e();
  let isStatuslineFooter = it("tengu_copper_thistle", false),
    cycleModeChord = wu("chat:cycleMode", "Chat", "shift+tab"),
    tasks = _t(state => state.tasks),
    taskDecorations = _t(state => state.taskDecorations),
    isTasksFooterActive = _t(state => state.footerSelection === "tasks" && state.coordinatorTaskIndex >= 0 || state.footerSelection === "workflows"),
    hasFooterSelection = _t(state => state.footerSelection !== null),
    viewSelectionMode = _t(state => state.viewSelectionMode),
    viewingAgentTaskId = _t(state => state.viewingAgentTaskId),
    expandedView = _t(state => state.expandedView),
    footerLinks = Qjl({
      excludeKeyed: isStatuslineFooter
    }),
    unusedFalse = _t(state => false),
    isVoiceEnabled = lde(),
    voiceState = _I(state => state.voiceState),
    voiceWarmingUp = _I(state => state.voiceWarmingUp),
    isInterruptible = Mxi(),
    getAppState = ghe().getState,
    isCoordinatorMode = aBm?.isCoordinatorMode() === true,
    backgroundTaskCount = TV.useMemo(() => zn(Object.values(tasks), hgt), [tasks]),
    ctrlTHint = j$t(),
    hasCtrlTHint = ctrlTHint !== undefined && ctrlTHint.length > 0,
    cancelChord = wu("chat:cancel", "Chat", "esc").toLowerCase(),
    toggleTodosChord = wu("app:toggleTodos", "Global", "ctrl+t"),
    pushToTalkChord = wu("voice:pushToTalk", "Chat", "space"),
    [showVoiceHint] = TV.useState(() => (Ot().voiceFooterHintSeenCount ?? 0) < lBm),
    voiceHintCountedRef = TV.useRef(false);
  TV.useEffect(() => {
    {
      if (!isVoiceEnabled || !showVoiceHint) return;
      if (voiceHintCountedRef?.current) return;
      if (voiceHintCountedRef) voiceHintCountedRef.current = true;
      let nextSeenCount = (Ot().voiceFooterHintSeenCount ?? 0) + 1;
      hn(prevConfig => {
        if ((prevConfig.voiceFooterHintSeenCount ?? 0) >= nextSeenCount) return prevConfig;
        return {
          ...prevConfig,
          voiceFooterHintSeenCount: nextSeenCount
        };
      });
    }
  }, [isVoiceEnabled, showVoiceHint, voiceHintCountedRef]);
  let isScreenReader = Hd();
  if (mode === "bash") return si.jsx(v, {
    color: "bashBorder",
    children: "! for shell mode"
  });
  let permissionMode = toolPermissionContext?.mode,
    showModeIndicator = !Jas(permissionMode),
    viewingAgentTask = viewingAgentTaskId ? tasks[viewingAgentTaskId] : undefined,
    isViewingTeammate = viewSelectionMode === "viewing-agent" && viewingAgentTask?.type === "in_process_teammate",
    teammateStopped = isViewingTeammate && viewingAgentTask != null && viewingAgentTask.status !== "running",
    hasBackgroundTasks = backgroundTaskCount > 0,
    leadingSegmentCount = (isCoordinatorMode || showModeIndicator ? 1 : 0) + (hasBackgroundTasks ? 1 : 0),
    prAuthHint = !isStatuslineFooter && prNeedsAuth && !footerLinks.some(link => link.key === ymo) ? si.jsx(v, {
      dimColor: true,
      children: "gh auth login"
    }, "pr-status") : null,
    nullPlaceholder = null,
    hasRoomForCycle = leadingSegmentCount < 2 && !((prAuthHint || footerLinks.length > 0) && columns < 60 + (nullPlaceholder ? 8 : 0)) && !(nullPlaceholder && columns < 56),
    sessionMode = Nu(),
    canEditPermissionMode = sessionMode ? sM("setPermissionMode") && !sessionMode.viewerOnly : !pl(),
    showAgentsHint = !isViewingTeammate && isInputEmpty && !hasFooterSelection && v5n(fmt({
      isBg: Ws(),
      isLoading: isLoading,
      isExternalLoading: isExternalLoading,
      betweenCalls: betweenCalls,
      inFlight: {
        count: 0,
        kinds: []
      }
    })) && Ot().leftArrowOpensAgents !== false,
    showShortcutsKey = !isScreenReader && viewingAgentTaskId === undefined && fBm(columns);
  if (isTasksFooterActive) return si.jsx($, {
    height: 1,
    overflow: "hidden",
    children: si.jsx(pjl, {})
  });
  if (isStatuslineFooter) {
    let taskCount = backgroundTaskCount,
      hasMultipleTasks = taskCount >= 2,
      hasAnyTasks = backgroundTaskCount >= 1,
      showModeCycle = !!permissionMode && showModeIndicator && canEditPermissionMode,
      unusedFlag = false,
      hasManageableTasks = dde(tasks, taskDecorations, viewingAgentTaskId).length > 0 || viewingAgentTaskId !== undefined && qJ(tasks[viewingAgentTaskId]),
      agentsAllowed = Ws() ? !isViewingTeammate && isInputEmpty && !hasFooterSelection : showAgentsHint,
      showVoicePushToTalk = isVoiceEnabled && voiceState === "idle" && showVoiceHint && showHint,
      hintKind = "none";
    if (isVoiceEnabled && voiceWarmingUp) hintKind = "warmup";else if (leftArrowPending && agentsAllowed && !isScreenReader) hintKind = "agents";else if (teammateStopped) hintKind = "interrupt";else if (!denseShowHint) hintKind = "none";else if (isLoading && !isInterruptible) hintKind = "interrupt";else if ((hasAnyTasks || hasManageableTasks) && !isTasksFooterActive) hintKind = "manage";else if (hasCtrlTHint) hintKind = "ctrl_t";else if (agentsAllowed && !isScreenReader) hintKind = "agents";else if (showVoicePushToTalk) hintKind = "voice";else if (showModeCycle) hintKind = "cycle";else hintKind = showHint && !isScreenReader ? "shortcuts" : "none";
    let toggleTasksLabel = expandedView === "tasks" ? "hide tasks" : "show tasks",
      cycleSuffix = hintKind === "cycle" ? si.jsxs(v, {
        dimColor: true,
        children: [" ", si.jsx(at, {
          chord: cycleModeChord,
          action: "cycle",
          parens: true,
          format: {
            keyCase: "lower"
          }
        })]
      }) : null,
      manageSuffix = hintKind === "manage" && hasAnyTasks ? si.jsxs(v, {
        dimColor: true,
        children: [" ", tasksSelected ? si.jsx(at, {
          chord: "enter",
          action: "view tasks",
          parens: true
        }) : si.jsx(at, {
          chord: "down",
          action: "manage",
          parens: true
        })]
      }) : null,
      hintNode = null;
    if (hintKind === "warmup") hintNode = si.jsx(UGe, {}, "voice-warmup");else if (hintKind === "manage" && !hasAnyTasks) hintNode = si.jsx(v, {
      dimColor: true,
      children: tasksSelected ? si.jsx(at, {
        chord: "enter",
        action: "view tasks"
      }) : si.jsx(at, {
        chord: "down",
        action: "manage"
      })
    });else if (hintKind === "interrupt") hintNode = si.jsx(v, {
      dimColor: true,
      children: si.jsx(at, {
        chord: cancelChord,
        action: teammateStopped ? "return to team lead" : "interrupt",
        format: {
          keyCase: "lower"
        }
      })
    });else if (hintKind === "ctrl_t") hintNode = si.jsx(v, {
      dimColor: true,
      children: si.jsx(at, {
        chord: toggleTodosChord,
        action: toggleTasksLabel,
        format: {
          keyCase: "lower"
        }
      })
    });else if (hintKind === "agents") hintNode = si.jsxs(v, {
      dimColor: true,
      children: [x5, " ", leftArrowPending ? "again " : "", "for agents"]
    });else if (hintKind === "voice") hintNode = si.jsxs(v, {
      dimColor: true,
      children: ["hold ", pushToTalkChord, " to speak"]
    });else if (hintKind === "shortcuts") hintNode = si.jsx(v, {
      dimColor: true,
      children: "? for shortcuts"
    });
    let modeNode = showModeCycle && permissionMode ? si.jsxs(v, {
        color: YN(permissionMode),
        children: [si.jsxs(v, {
          "aria-hidden": true,
          children: [eYe(permissionMode), " "]
        }), tQ(permissionMode).toLowerCase(), " on", cycleSuffix]
      }, "mode") : null,
      reservedNode = null,
      tasksNode = hasAnyTasks ? hasMultipleTasks ? si.jsx(dBm, {
        count: taskCount,
        selected: tasksSelected,
        onClick: onOpenTasksDialog
      }) : si.jsx(PFo, {
        tasksSelected: tasksSelected,
        onOpenDialog: onOpenTasksDialog
      }) : null;
    if (!modeNode && !reservedNode && !tasksNode && footerLinks.length === 0 && !hintNode) return Cs() ? si.jsx(v, {
      children: " "
    }) : null;
    let hasTrailingContent = tasksNode || footerLinks.length > 0 || hintNode;
    return si.jsxs($, {
      height: 1,
      overflow: "hidden",
      children: [modeNode && si.jsxs($, {
        flexShrink: 0,
        children: [modeNode, (reservedNode || hasTrailingContent) && si.jsx(v, {
          dimColor: true,
          children: " \xB7 "
        })]
      }), reservedNode && si.jsxs($, {
        flexShrink: 0,
        children: [reservedNode, hasTrailingContent && si.jsx(v, {
          dimColor: true,
          children: " \xB7 "
        })]
      }), tasksNode && si.jsxs($, {
        flexShrink: 0,
        children: [tasksNode, manageSuffix, (footerLinks.length > 0 || hintNode) && si.jsx(v, {
          dimColor: true,
          children: " \xB7 "
        })]
      }), footerLinks.map((link, index) => si.jsxs($, {
        flexShrink: 0,
        children: [si.jsx(aYl, {
          link: link
        }), (index < footerLinks.length - 1 || !!hintNode) && si.jsx(v, {
          dimColor: true,
          children: " \xB7 "
        })]
      }, link.url)), hintNode && si.jsx(v, {
        wrap: "truncate",
        children: hintNode
      }), null]
    });
  }
  let modeNode = permissionMode && showModeIndicator && canEditPermissionMode ? si.jsxs(v, {
      color: YN(permissionMode),
      children: [si.jsxs(v, {
        "aria-hidden": true,
        children: [eYe(permissionMode), " "]
      }), tQ(permissionMode).toLowerCase(), " on", hasRoomForCycle && si.jsxs(v, {
        dimColor: true,
        children: [" ", si.jsx(at, {
          chord: cycleModeChord,
          action: "cycle",
          parens: true,
          format: {
            keyCase: "lower"
          }
        })]
      })]
    }, "mode") : null,
    footerLinkNodes = footerLinks.map(link => si.jsx(aYl, {
      link: link
    }, link.key ?? link.url)),
    hintSegments = [...[]],
    shortcutHints = showHint ? pBm(isLoading, cancelChord, toggleTodosChord, hasCtrlTHint, expandedView, isInterruptible) : [];
  if (teammateStopped) hintSegments.push(si.jsx(v, {
    dimColor: true,
    children: si.jsx(at, {
      chord: cancelChord,
      action: "return to team lead",
      format: {
        keyCase: "lower"
      }
    })
  }, "esc-return"));else if (showHint) hintSegments.push(...shortcutHints);
  let bgDetachNode = (Ws() || la()) && leftArrowDetachAvailable && isInputEmpty && !hasFooterSelection && !isScreenReader ? si.jsxs(v, {
      dimColor: true,
      children: [x5, " for agents"]
    }, "bg-detach") : null,
    fgAgentsNode = showAgentsHint && !isScreenReader ? si.jsxs(v, {
      dimColor: true,
      children: [x5, " ", leftArrowPending ? "again " : "", "for agents"]
    }, "fg-agents") : null,
    hasManageableTasks = dde(tasks, taskDecorations, viewingAgentTaskId).length > 0 || viewingAgentTaskId !== undefined && qJ(tasks[viewingAgentTaskId]),
    tasksNode = hasBackgroundTasks ? si.jsx(PFo, {
      tasksSelected: tasksSelected,
      onOpenDialog: onOpenTasksDialog
    }) : null;
  if (hintSegments.length === 0 && !tasksNode && !modeNode && !prAuthHint && footerLinkNodes.length === 0 && !bgDetachNode && showHint) {
    if (!isScreenReader) hintSegments.push(si.jsx(v, {
      dimColor: true,
      children: "? for shortcuts"
    }, "shortcuts-hint"));
  }
  if (fgAgentsNode) hintSegments.push(fgAgentsNode);
  let copyOnSelect = Ot().copyOnSelect ?? true,
    showSelectionCopy = isInterruptible && (!copyOnSelect || xy());
  if (isVoiceEnabled && voiceWarmingUp) hintSegments.push(si.jsx(UGe, {}, "voice-warmup"));else if (Cs() && showSelectionCopy) {
    let isMacos = Yt() === "macos",
      lastPressHadAlt = isMacos && (getAppState()?.lastPressHadAlt ?? false);
    hintSegments.push(si.jsx(v, {
      dimColor: true,
      children: si.jsxs(bn, {
        children: [!copyOnSelect && si.jsx(at, {
          chord: "ctrl+c",
          action: "copy"
        }), xy() && (lastPressHadAlt ? si.jsx(v, {
          children: "set macOptionClickForcesSelection in VS Code settings"
        }) : si.jsxs(v, {
          children: [isMacos ? "option+click" : "shift+click", " to native select"]
        }))]
      })
    }, "selection-copy"));
  } else if (hintSegments.length > 0 && showHint && isVoiceEnabled && voiceState === "idle" && shortcutHints.length === 0 && showVoiceHint) hintSegments.push(si.jsxs(v, {
    dimColor: true,
    children: ["hold ", pushToTalkChord, " to speak"]
  }, "voice-hint"));
  if ((tasksNode || hasManageableTasks) && showHint && !isTasksFooterActive) hintSegments.push(si.jsx(v, {
    dimColor: true,
    children: tasksSelected ? si.jsx(at, {
      chord: "enter",
      action: "view tasks"
    }) : si.jsx(at, {
      chord: "down",
      action: "manage"
    })
  }, "manage-tasks"));
  if (hintSegments.length === 0 && !tasksNode && !modeNode && !nullPlaceholder && !prAuthHint && footerLinkNodes.length === 0 && !bgDetachNode) return Cs() ? si.jsx(v, {
    children: " "
  }) : null;
  return si.jsxs($, {
    height: 1,
    overflow: "hidden",
    children: [modeNode && si.jsxs($, {
      flexShrink: 0,
      children: [modeNode, (nullPlaceholder || bgDetachNode || prAuthHint || footerLinkNodes.length > 0 || tasksNode || hintSegments.length > 0) && si.jsx(v, {
        dimColor: true,
        children: " \xB7 "
      })]
    }), nullPlaceholder && si.jsxs($, {
      flexShrink: 0,
      children: [nullPlaceholder, (bgDetachNode || prAuthHint || footerLinkNodes.length > 0 || tasksNode || hintSegments.length > 0) && si.jsx(v, {
        dimColor: true,
        children: " \xB7 "
      })]
    }), bgDetachNode && si.jsxs($, {
      flexShrink: 0,
      children: [bgDetachNode, (prAuthHint || footerLinkNodes.length > 0 || tasksNode || hintSegments.length > 0) && si.jsx(v, {
        dimColor: true,
        children: " \xB7 "
      })]
    }), prAuthHint && si.jsxs($, {
      flexShrink: 0,
      children: [prAuthHint, (footerLinkNodes.length > 0 || tasksNode || hintSegments.length > 0) && si.jsx(v, {
        dimColor: true,
        children: " \xB7 "
      })]
    }), footerLinkNodes.length > 0 && si.jsxs($, {
      flexShrink: 0,
      children: [si.jsx(bn, {
        children: footerLinkNodes
      }), (tasksNode || hintSegments.length > 0) && si.jsx(v, {
        dimColor: true,
        children: " \xB7 "
      })]
    }), tasksNode && si.jsxs($, {
      flexShrink: 0,
      children: [tasksNode, hintSegments.length > 0 && si.jsx(v, {
        dimColor: true,
        children: " \xB7 "
      })]
    }), hintSegments.length > 0 && si.jsx(v, {
      wrap: "truncate",
      children: si.jsx(bn, {
        children: hintSegments
      })
    })]
  });
}
function pBm(isLoading, cancelChord, toggleTodosChord, hasCtrlTHint, expandedView, isInterruptible) {
  let toggleTasksLabel = expandedView === "tasks" ? "hide tasks" : "show tasks",
    showToggleTasks = hasCtrlTHint;
  return [...(isLoading && !isInterruptible ? [si.jsx(v, {
    dimColor: true,
    children: si.jsx(at, {
      chord: cancelChord,
      action: "interrupt",
      format: {
        keyCase: "lower"
      }
    })
  }, "esc")] : []), ...(showToggleTasks ? [si.jsx(v, {
    dimColor: true,
    children: si.jsx(at, {
      chord: toggleTodosChord,
      action: toggleTasksLabel,
      format: {
        keyCase: "lower"
      }
    })
  }, "toggle-tasks")] : [])];
}
function mBm(prKind) {
  if (Ws() && prKind === "unknown") return false;
  return Ot().prStatusFooterEnabled ?? true;
}
function aYl(props) {
  let memoCache = Mer.c(17),
    {
      link: link
    } = props,
    prefixNode;
  if (memoCache[0] !== link.prefix) prefixNode = link.prefix !== undefined && si.jsxs(si.Fragment, {
    children: [si.jsx(v, {
      dimColor: true,
      children: link.prefix
    }), " "]
  }), memoCache[0] = link.prefix, memoCache[1] = prefixNode;else prefixNode = memoCache[1];
  let labelDimmed = !link.color,
    fallbackLabel;
  if (memoCache[2] !== link.color || memoCache[3] !== link.label || memoCache[4] !== labelDimmed) fallbackLabel = si.jsx(v, {
    color: link.color,
    dimColor: labelDimmed,
    children: link.label
  }), memoCache[2] = link.color, memoCache[3] = link.label, memoCache[4] = labelDimmed, memoCache[5] = fallbackLabel;else fallbackLabel = memoCache[5];
  let underlineDimmed = !link.color,
    underlinedLabel;
  if (memoCache[6] !== link.color || memoCache[7] !== link.label || memoCache[8] !== underlineDimmed) underlinedLabel = si.jsx(v, {
    color: link.color,
    dimColor: underlineDimmed,
    underline: true,
    children: link.label
  }), memoCache[6] = link.color, memoCache[7] = link.label, memoCache[8] = underlineDimmed, memoCache[9] = underlinedLabel;else underlinedLabel = memoCache[9];
  let linkNode;
  if (memoCache[10] !== link.url || memoCache[11] !== fallbackLabel || memoCache[12] !== underlinedLabel) linkNode = si.jsx(Ss, {
    url: link.url,
    fallback: fallbackLabel,
    assumeSupport: false,
    children: underlinedLabel
  }), memoCache[10] = link.url, memoCache[11] = fallbackLabel, memoCache[12] = underlinedLabel, memoCache[13] = linkNode;else linkNode = memoCache[13];
  let result;
  if (memoCache[14] !== prefixNode || memoCache[15] !== linkNode) result = si.jsxs(v, {
    children: [prefixNode, linkNode]
  }), memoCache[14] = prefixNode, memoCache[15] = linkNode, memoCache[16] = result;else result = memoCache[16];
  return result;
}
function fBm(columns) {
  return Cs() && columns >= sYl;
}
var Mer,
  TV,
  si,
  aBm,
  lBm = 3,
  dBm;
var cYl = b(() => {
  je();
  yie();
  zft();
  $k();
  FS();
  Njl();
  WTe();
  cyt();
  Gjl();
  uo();
  Wu();
  lt();
  vd();
  B5e();
  Pa();
  jn();
  IAe();
  zjl();
  Jjl();
  Zjl();
  J9n();
  Smo();
  aZn();
  rat();
  tYl();
  Jve();
  Uve();
  Wo();
  Is();
  ui();
  C2n();
  cer();
  H7t();
  The();
  tp();
  NFo();
  nS();
  $tt();
  tr();
  Es();
  Mer = x(tt(), 1), TV = x(et(), 1), si = x(oe(), 1), aBm = (NO(), oo(k4));
  dBm = TV.memo(function (props) {
    let memoCache = Mer.c(11),
      {
        count: count,
        selected: selected,
        onClick: onClick
      } = props,
      [isHovered, setHovered] = TV.useState(false),
      isActive = selected || isHovered,
      iconNode;
    if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) iconNode = si.jsxs(v, {
      "aria-hidden": true,
      children: [Oas, " "]
    }), memoCache[0] = iconNode;else iconNode = memoCache[0];
    let labelNode;
    if (memoCache[1] !== count || memoCache[2] !== isActive) labelNode = si.jsxs(v, {
      color: "background",
      inverse: isActive,
      children: [iconNode, count, " background"]
    }), memoCache[1] = count, memoCache[2] = isActive, memoCache[3] = labelNode;else labelNode = memoCache[3];
    let content = labelNode;
    if (!onClick) return content;
    let handleClick;
    if (memoCache[4] !== onClick) handleClick = () => onClick(), memoCache[4] = onClick, memoCache[5] = handleClick;else handleClick = memoCache[5];
    let handleMouseEnter, handleMouseLeave;
    if (memoCache[6] === Symbol.for("react.memo_cache_sentinel")) handleMouseEnter = () => setHovered(true), handleMouseLeave = () => setHovered(false), memoCache[6] = handleMouseEnter, memoCache[7] = handleMouseLeave;else handleMouseEnter = memoCache[6], handleMouseLeave = memoCache[7];
    let clickableNode;
    if (memoCache[8] !== content || memoCache[9] !== handleClick) clickableNode = si.jsx($, {
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: content
    }), memoCache[8] = content, memoCache[9] = handleClick, memoCache[10] = clickableNode;else clickableNode = memoCache[10];
    return clickableNode;
  });
});

export {lYl,cBm,uBm,pBm,mBm,aYl,fBm,Mer,TV,si,aBm,lBm,dBm,cYl};
