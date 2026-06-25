// @ts-nocheck
import {Ny,uq} from "../../vendor/m3355.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {aYn,g0o} from "../../vendor/m4967.ts";
import {buildMcpToolName as Vl,ky} from "../agent/2238_explicitlyRequested.ts";
import {dl,eC,D6o,dn} from "../config/0137_namespace.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {zPl,Rgt} from "../../vendor/m4970.ts";
import {getActiveAgentsFromList as jB,kg} from "../permissions/4476_toAgentInfos.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {mo,Ct} from "../../vendor/m197.ts";
import {NPl,y0o} from "../../vendor/m4968.ts";
import {XOl,QOl} from "./4994_onExit.ts";
import {qm,GI,sP} from "../../vendor/m4535.ts";
import {aOl,lOl} from "./4978_source.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {x5,Lon,eQ,I5,Pa} from "../../vendor/m720.ts";
import {ku,rS} from "../../vendor/m2582.ts";
import {YOl,JOl} from "../../vendor/m4992.ts";
import {isFastModeReady as JG,Hue} from "../agent/4889_evictAfter.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {YPl,JPl} from "../permissions/4972_agent.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {rOl,oOl} from "../../vendor/m4976.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Agents management dialog (Claude Code v2.1.190).
 *
 * `ZOl` is the React component rendering the multi-mode "Agents" UI:
 *   list-agents -> agent-menu -> {run-agent | view-agent | edit-agent | delete-confirm}
 *   plus create-agent.
 *
 * It uses React Compiler memoization: `cache` is the per-render memo cache array
 * (`w0o.c(215)`), and the sentinel `Symbol.for("react.memo_cache_sentinel")`
 * marks slots that hold render-invariant values.
 *
 * The `*_m` helpers are stable predicate/selector functions hoisted out of the
 * component so they keep referential identity across renders.
 */
function ZOl(props: {
  tools: unknown;
  onExit: (value?: unknown, options?: { display?: string; nextInput?: string; submitNextInput?: boolean }) => void;
}) {
  let cache = w0o.c(215),
    {
      tools,
      onExit
    } = props,
    keyboardHint;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) keyboardHint = Ul.jsx(Ny, {
    children: Ul.jsxs(bn, {
      children: [Ul.jsx(at, {
        chord: ["up", "down"],
        action: "navigate"
      }), Ul.jsx(at, {
        chord: "enter",
        action: "select"
      }), Ul.jsx(at, {
        chord: "escape",
        action: "go back"
      })]
    })
  }), cache[0] = keyboardHint;else keyboardHint = cache[0];
  let keyboardHintNode = keyboardHint,
    initialMode;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) initialMode = {
    mode: "list-agents",
    source: "all"
  }, cache[1] = initialMode;else initialMode = cache[1];
  let [viewState, setViewState] = xgt.useState(initialMode),
    [selectedTab, setSelectedTab] = xgt.useState("running"),
    appState = _t(m_m),
    mcpTools = _t(p_m),
    toolPermissionContext = _t(d_m),
    tasks = _t(u_m),
    agentTypesInvokedThisSession = _t(c_m),
    updateAppState = bo(),
    {
      columns
    } = _r(),
    {
      allAgents,
      activeAgents
    } = appState,
    initialChanges;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) initialChanges = [], cache[2] = initialChanges;else initialChanges = cache[2];
  let [changes, setChanges] = xgt.useState(initialChanges),
    [promptInput, setPromptInput] = xgt.useState(""),
    [cursorOffset, setCursorOffset] = xgt.useState(0),
    runningByType: Map<string, number>,
    runningCount;
  if (cache[3] !== tasks) {
    runningByType = new Map(), runningCount = 0;
    for (let task of Object.values(tasks)) {
      if (task.type !== "local_agent" || task.agentType === "main-session" || task.status === "completed" || task.status === "failed" || task.status === "killed") continue;
      runningByType.set(task.agentType, (runningByType.get(task.agentType) ?? 0) + 1), runningCount++;
    }
    cache[3] = tasks, cache[4] = runningByType, cache[5] = runningCount;
  } else runningByType = cache[4], runningCount = cache[5];
  let runningInfo;
  if (cache[6] !== runningByType || cache[7] !== runningCount) runningInfo = {
    runningByType: runningByType,
    runningCount: runningCount
  }, cache[6] = runningByType, cache[7] = runningCount, cache[8] = runningInfo;else runningInfo = cache[8];
  let {
      runningByType: runningByTypeMap,
      runningCount: totalRunningCount
    } = runningInfo,
    availableTools = aYn(tools, mcpTools, toolPermissionContext),
    isReadOnlyFeature;
  if (cache[9] === Symbol.for("react.memo_cache_sentinel")) isReadOnlyFeature = Vl("agents"), cache[9] = isReadOnlyFeature;else isReadOnlyFeature = cache[9];
  let agentsFeatureDisabled = isReadOnlyFeature,
    disabledMessage;
  if (cache[10] === Symbol.for("react.memo_cache_sentinel")) disabledMessage = dl() ? `Creating and editing agents is unavailable in safe mode — ${eC()} to make changes` : `Creating and editing agents is unavailable in bare mode — ${D6o()} to make changes`, cache[10] = disabledMessage;else disabledMessage = cache[10];
  let disabledMessageText = disabledMessage,
    escapeState = Df(void 0, void 0, viewState.mode === "list-agents"),
    builtInAgents;
  if (cache[11] !== allAgents) builtInAgents = allAgents.filter(l_m), cache[11] = allAgents, cache[12] = builtInAgents;else builtInAgents = cache[12];
  let userSettingsAgents;
  if (cache[13] !== allAgents) userSettingsAgents = allAgents.filter(a_m), cache[13] = allAgents, cache[14] = userSettingsAgents;else userSettingsAgents = cache[14];
  let projectSettingsAgents;
  if (cache[15] !== allAgents) projectSettingsAgents = allAgents.filter(i_m), cache[15] = allAgents, cache[16] = projectSettingsAgents;else projectSettingsAgents = cache[16];
  let policySettingsAgents;
  if (cache[17] !== allAgents) policySettingsAgents = allAgents.filter(s_m), cache[17] = allAgents, cache[18] = policySettingsAgents;else policySettingsAgents = cache[18];
  let localSettingsAgents;
  if (cache[19] !== allAgents) localSettingsAgents = allAgents.filter(o_m), cache[19] = allAgents, cache[20] = localSettingsAgents;else localSettingsAgents = cache[20];
  let flagSettingsAgents;
  if (cache[21] !== allAgents) flagSettingsAgents = allAgents.filter(r_m), cache[21] = allAgents, cache[22] = flagSettingsAgents;else flagSettingsAgents = cache[22];
  let pluginAgents;
  if (cache[23] !== allAgents) pluginAgents = allAgents.filter(n_m), cache[23] = allAgents, cache[24] = pluginAgents;else pluginAgents = cache[24];
  let agentsBySource;
  if (cache[25] !== allAgents || cache[26] !== policySettingsAgents || cache[27] !== localSettingsAgents || cache[28] !== flagSettingsAgents || cache[29] !== pluginAgents || cache[30] !== builtInAgents || cache[31] !== userSettingsAgents || cache[32] !== projectSettingsAgents) agentsBySource = {
    "built-in": builtInAgents,
    userSettings: userSettingsAgents,
    projectSettings: projectSettingsAgents,
    policySettings: policySettingsAgents,
    localSettings: localSettingsAgents,
    flagSettings: flagSettingsAgents,
    plugin: pluginAgents,
    all: allAgents
  }, cache[25] = allAgents, cache[26] = policySettingsAgents, cache[27] = localSettingsAgents, cache[28] = flagSettingsAgents, cache[29] = pluginAgents, cache[30] = builtInAgents, cache[31] = userSettingsAgents, cache[32] = projectSettingsAgents, cache[33] = agentsBySource;else agentsBySource = cache[33];
  let agentsBySourceMap = agentsBySource,
    handleCreatedCb;
  if (cache[34] === Symbol.for("react.memo_cache_sentinel")) handleCreatedCb = createdMessage => {
    setChanges(prev => [...prev, createdMessage]), setViewState({
      mode: "list-agents",
      source: "all"
    });
  }, cache[34] = handleCreatedCb;else handleCreatedCb = cache[34];
  let handleAgentCreated = handleCreatedCb,
    deleteAgentCb;
  if (cache[35] !== updateAppState) deleteAgentCb = async agent => {
    try {
      await zPl(agent), updateAppState(prev => {
        let remainingAgents = prev.agentDefinitions.allAgents.filter(candidate => !(candidate.agentType === agent.agentType && candidate.source === agent.source));
        return {
          ...prev,
          agentDefinitions: {
            ...prev.agentDefinitions,
            allAgents: remainingAgents,
            activeAgents: jB(remainingAgents)
          }
        };
      }), setChanges(prev => [...prev, `Deleted agent: ${bt.bold(agent.agentType)}`]), setViewState({
        mode: "list-agents",
        source: "all"
      });
    } catch (caught) {
      let error = caught;
      A(`Failed to delete agent file for ${agent.agentType}: ${mo(error).message}`, {
        level: "error"
      });
    }
  }, cache[35] = updateAppState, cache[36] = deleteAgentCb;else deleteAgentCb = cache[36];
  let handleDeleteAgent = deleteAgentCb;
  switch (viewState.mode) {
    case "list-agents":
      {
        let sourceAgents;
        if (cache[37] !== agentsBySourceMap || cache[38] !== viewState.source) sourceAgents = viewState.source === "all" ? [...agentsBySourceMap["built-in"], ...agentsBySourceMap.userSettings, ...agentsBySourceMap.projectSettings, ...agentsBySourceMap.localSettings, ...agentsBySourceMap.policySettings, ...agentsBySourceMap.flagSettings, ...agentsBySourceMap.plugin] : agentsBySourceMap[viewState.source], cache[37] = agentsBySourceMap, cache[38] = viewState.source, cache[39] = sourceAgents;else sourceAgents = cache[39];
        let visibleAgents = sourceAgents,
          mergedAgentsCb;
        if (cache[40] !== activeAgents || cache[41] !== visibleAgents) mergedAgentsCb = NPl(visibleAgents, activeAgents), cache[40] = activeAgents, cache[41] = visibleAgents, cache[42] = mergedAgentsCb;else mergedAgentsCb = cache[42];
        let mergedAgents = mergedAgentsCb,
          dismissCb;
        if (cache[43] !== changes || cache[44] !== onExit) dismissCb = () => {
          let changeSummary = changes.length > 0 ? `Agent changes:
${changes.join(`
`)}` : void 0;
          onExit(changeSummary ?? "Agents dialog dismissed", {
            display: changes.length === 0 ? "system" : void 0
          });
        }, cache[43] = changes, cache[44] = onExit, cache[45] = dismissCb;else dismissCb = cache[45];
        let handleDismiss = dismissCb,
          runningTabTitle = totalRunningCount > 0 ? `Running (${totalRunningCount})` : "Running",
          runningTabContent;
        if (cache[46] !== onExit) runningTabContent = Ul.jsx(XOl, {
          onExit: () => onExit(void 0, {
            display: "skip"
          })
        }), cache[46] = onExit, cache[47] = runningTabContent;else runningTabContent = cache[47];
        let runningTab;
        if (cache[48] !== runningTabTitle || cache[49] !== runningTabContent) runningTab = Ul.jsx(qm, {
          title: runningTabTitle,
          id: "running",
          children: runningTabContent
        }), cache[48] = runningTabTitle, cache[49] = runningTabContent, cache[50] = runningTab;else runningTab = cache[50];
        let handleSelectAgentCb;
        if (cache[51] !== viewState) handleSelectAgentCb = agent => setViewState({
          mode: "agent-menu",
          agent: agent,
          previousMode: viewState
        }), cache[51] = viewState, cache[52] = handleSelectAgentCb;else handleSelectAgentCb = cache[52];
        let handleCreateNewCb;
        if (cache[53] === Symbol.for("react.memo_cache_sentinel")) handleCreateNewCb = agentsFeatureDisabled ? void 0 : () => setViewState({
          mode: "create-agent"
        }), cache[53] = handleCreateNewCb;else handleCreateNewCb = cache[53];
        let agentListContent;
        if (cache[54] !== changes || cache[55] !== viewState.source || cache[56] !== mergedAgents || cache[57] !== runningByTypeMap || cache[58] !== handleSelectAgentCb || cache[59] !== agentTypesInvokedThisSession) agentListContent = Ul.jsx(aOl, {
          source: viewState.source,
          agents: mergedAgents,
          runningByType: runningByTypeMap,
          usedThisSession: agentTypesInvokedThisSession,
          onSelect: handleSelectAgentCb,
          onCreateNew: handleCreateNewCb,
          changes: changes
        }), cache[54] = changes, cache[55] = viewState.source, cache[56] = mergedAgents, cache[57] = runningByTypeMap, cache[58] = handleSelectAgentCb, cache[59] = agentTypesInvokedThisSession, cache[60] = agentListContent;else agentListContent = cache[60];
        let disabledNotice;
        if (cache[61] === Symbol.for("react.memo_cache_sentinel")) disabledNotice = agentsFeatureDisabled && Ul.jsx($, {
          marginTop: 1,
          children: Ul.jsx(v, {
            dimColor: !0,
            children: disabledMessageText
          })
        }), cache[61] = disabledNotice;else disabledNotice = cache[61];
        let libraryTab;
        if (cache[62] !== agentListContent) libraryTab = Ul.jsx(qm, {
          title: "Library",
          id: "definitions",
          children: Ul.jsxs($, {
            flexDirection: "column",
            children: [agentListContent, disabledNotice]
          })
        }), cache[62] = agentListContent, cache[63] = libraryTab;else libraryTab = cache[63];
        let tabbedView;
        if (cache[64] !== selectedTab || cache[65] !== runningTab || cache[66] !== libraryTab) tabbedView = Ul.jsxs(GI, {
          title: "Agents",
          color: "permission",
          navFromContent: !0,
          selectedTab: selectedTab,
          onTabChange: setSelectedTab,
          children: [runningTab, libraryTab]
        }), cache[64] = selectedTab, cache[65] = runningTab, cache[66] = libraryTab, cache[67] = tabbedView;else tabbedView = cache[67];
        let footerHint = escapeState.pending ? `Press ${escapeState.keyName} again to exit` : `${x5}/${Lon} to switch \xB7 ${eQ}/${I5} to navigate \xB7 Enter to select \xB7 Esc to close`,
          footerNode;
        if (cache[68] !== footerHint) footerNode = Ul.jsx($, {
          marginTop: 1,
          children: Ul.jsx(v, {
            dimColor: !0,
            children: footerHint
          })
        }), cache[68] = footerHint, cache[69] = footerNode;else footerNode = cache[69];
        let dialogBody;
        if (cache[70] !== tabbedView || cache[71] !== footerNode) dialogBody = Ul.jsxs(ku, {
          color: "permission",
          children: [tabbedView, footerNode]
        }), cache[70] = tabbedView, cache[71] = footerNode, cache[72] = dialogBody;else dialogBody = cache[72];
        let dismissHandler;
        if (cache[73] !== handleDismiss) dismissHandler = Ul.jsx(f_m, {
          onCancel: handleDismiss
        }), cache[73] = handleDismiss, cache[74] = dismissHandler;else dismissHandler = cache[74];
        let listView;
        if (cache[75] !== dialogBody || cache[76] !== dismissHandler) listView = Ul.jsxs(Ul.Fragment, {
          children: [dialogBody, dismissHandler]
        }), cache[75] = dialogBody, cache[76] = dismissHandler, cache[77] = listView;else listView = cache[77];
        return listView;
      }
    case "create-agent":
      {
        let cancelCreateCb;
        if (cache[78] === Symbol.for("react.memo_cache_sentinel")) cancelCreateCb = () => setViewState({
          mode: "list-agents",
          source: "all"
        }), cache[78] = cancelCreateCb;else cancelCreateCb = cache[78];
        let createView;
        if (cache[79] !== activeAgents || cache[80] !== availableTools) createView = Ul.jsx(YOl, {
          tools: availableTools,
          existingAgents: activeAgents,
          onComplete: handleAgentCreated,
          onCancel: cancelCreateCb
        }), cache[79] = activeAgents, cache[80] = availableTools, cache[81] = createView;else createView = cache[81];
        return createView;
      }
    case "agent-menu":
      {
        let foundAgent;
        if (cache[82] !== allAgents || cache[83] !== viewState.agent.agentType || cache[84] !== viewState.agent.source) {
          let matchPredicate;
          if (cache[86] !== viewState.agent.agentType || cache[87] !== viewState.agent.source) matchPredicate = candidate => candidate.agentType === viewState.agent.agentType && candidate.source === viewState.agent.source, cache[86] = viewState.agent.agentType, cache[87] = viewState.agent.source, cache[88] = matchPredicate;else matchPredicate = cache[88];
          foundAgent = allAgents.find(matchPredicate), cache[82] = allAgents, cache[83] = viewState.agent.agentType, cache[84] = viewState.agent.source, cache[85] = foundAgent;
        } else foundAgent = cache[85];
        let currentAgent = foundAgent || viewState.agent,
          isEditable = currentAgent.source !== "built-in" && currentAgent.source !== "plugin" && currentAgent.source !== "flagSettings",
          runningCountForTypeCb;
        if (cache[89] !== currentAgent.agentType || cache[90] !== runningByTypeMap) runningCountForTypeCb = runningByTypeMap.get(currentAgent.agentType) ?? 0, cache[89] = currentAgent.agentType, cache[90] = runningByTypeMap, cache[91] = runningCountForTypeCb;else runningCountForTypeCb = cache[91];
        let runningCountForType = runningCountForTypeCb,
          runOption;
        if (cache[92] === Symbol.for("react.memo_cache_sentinel")) runOption = {
          label: "Run agent",
          value: "run"
        }, cache[92] = runOption;else runOption = cache[92];
        let viewRunningOptions;
        if (cache[93] !== runningCountForType) viewRunningOptions = runningCountForType > 0 ? [{
          label: "View running instance",
          value: "view-running"
        }] : [], cache[93] = runningCountForType, cache[94] = viewRunningOptions;else viewRunningOptions = cache[94];
        let viewOption;
        if (cache[95] === Symbol.for("react.memo_cache_sentinel")) viewOption = {
          label: "View agent",
          value: "view"
        }, cache[95] = viewOption;else viewOption = cache[95];
        let editOptions, deleteOptions;
        if (cache[96] !== isEditable) editOptions = isEditable && !agentsFeatureDisabled ? [{
          label: "Edit agent",
          value: "edit"
        }] : [], deleteOptions = isEditable ? [{
          label: "Delete agent",
          value: "delete"
        }] : [], cache[96] = isEditable, cache[97] = editOptions, cache[98] = deleteOptions;else editOptions = cache[97], deleteOptions = cache[98];
        let backOption;
        if (cache[99] === Symbol.for("react.memo_cache_sentinel")) backOption = {
          label: "Back",
          value: "back"
        }, cache[99] = backOption;else backOption = cache[99];
        let menuOptions;
        if (cache[100] !== viewRunningOptions || cache[101] !== editOptions || cache[102] !== deleteOptions) menuOptions = [runOption, ...viewRunningOptions, viewOption, ...editOptions, ...deleteOptions, backOption], cache[100] = viewRunningOptions, cache[101] = editOptions, cache[102] = deleteOptions, cache[103] = menuOptions;else menuOptions = cache[103];
        let menuOptionsList = menuOptions,
          handleMenuSelectCb;
        if (cache[104] !== currentAgent || cache[105] !== viewState || cache[106] !== onExit || cache[107] !== updateAppState || cache[108] !== tasks) handleMenuSelectCb = selectedValue => {
          e: switch (selectedValue) {
            case "run":
              {
                setPromptInput(""), setCursorOffset(0), setViewState({
                  mode: "run-agent",
                  agent: currentAgent,
                  previousMode: viewState
                });
                break e;
              }
            case "view-running":
              {
                let runningTask = Object.values(tasks).find(task => task.type === "local_agent" && task.agentType === currentAgent.agentType && task.status !== "completed" && task.status !== "failed" && task.status !== "killed");
                if (runningTask) JG(runningTask.id, updateAppState), onExit(void 0, {
                  display: "skip"
                });
                break e;
              }
            case "view":
              {
                setViewState({
                  mode: "view-agent",
                  agent: currentAgent,
                  previousMode: viewState.previousMode
                });
                break e;
              }
            case "edit":
              {
                setViewState({
                  mode: "edit-agent",
                  agent: currentAgent,
                  previousMode: viewState
                });
                break e;
              }
            case "delete":
              {
                setViewState({
                  mode: "delete-confirm",
                  agent: currentAgent,
                  previousMode: viewState
                });
                break e;
              }
            case "back":
              setViewState(viewState.previousMode);
          }
        }, cache[104] = currentAgent, cache[105] = viewState, cache[106] = onExit, cache[107] = updateAppState, cache[108] = tasks, cache[109] = handleMenuSelectCb;else handleMenuSelectCb = cache[109];
        let handleMenuSelect = handleMenuSelectCb,
          handleMenuCancelCb;
        if (cache[110] !== viewState.previousMode) handleMenuCancelCb = () => setViewState(viewState.previousMode), cache[110] = viewState.previousMode, cache[111] = handleMenuCancelCb;else handleMenuCancelCb = cache[111];
        let selectCancelCb;
        if (cache[112] !== viewState.previousMode) selectCancelCb = () => setViewState(viewState.previousMode), cache[112] = viewState.previousMode, cache[113] = selectCancelCb;else selectCancelCb = cache[113];
        let menuSelect;
        if (cache[114] !== handleMenuSelect || cache[115] !== menuOptionsList || cache[116] !== selectCancelCb) menuSelect = Ul.jsx(hr, {
          options: menuOptionsList,
          onChange: handleMenuSelect,
          onCancel: selectCancelCb
        }), cache[114] = handleMenuSelect, cache[115] = menuOptionsList, cache[116] = selectCancelCb, cache[117] = menuSelect;else menuSelect = cache[117];
        let lastChangeNotice;
        if (cache[118] !== changes) lastChangeNotice = changes.length > 0 && Ul.jsx($, {
          marginTop: 1,
          children: Ul.jsx(v, {
            dimColor: !0,
            children: changes.at(-1)
          })
        }), cache[118] = changes, cache[119] = lastChangeNotice;else lastChangeNotice = cache[119];
        let menuBody;
        if (cache[120] !== menuSelect || cache[121] !== lastChangeNotice) menuBody = Ul.jsxs($, {
          flexDirection: "column",
          children: [menuSelect, lastChangeNotice]
        }), cache[120] = menuSelect, cache[121] = lastChangeNotice, cache[122] = menuBody;else menuBody = cache[122];
        let menuDialog;
        if (cache[123] !== viewState.agent.agentType || cache[124] !== handleMenuCancelCb || cache[125] !== menuBody) menuDialog = Ul.jsx(Jn, {
          title: viewState.agent.agentType,
          onCancel: handleMenuCancelCb,
          hideInputGuide: !0,
          children: menuBody
        }), cache[123] = viewState.agent.agentType, cache[124] = handleMenuCancelCb, cache[125] = menuBody, cache[126] = menuDialog;else menuDialog = cache[126];
        let menuKeyboardHint;
        if (cache[127] === Symbol.for("react.memo_cache_sentinel")) menuKeyboardHint = Ul.jsx($, {
          marginLeft: 2,
          marginTop: 1,
          children: keyboardHintNode
        }), cache[127] = menuKeyboardHint;else menuKeyboardHint = cache[127];
        let menuView;
        if (cache[128] !== menuDialog) menuView = Ul.jsxs(Ul.Fragment, {
          children: [menuDialog, menuKeyboardHint]
        }), cache[128] = menuDialog, cache[129] = menuView;else menuView = cache[129];
        return menuView;
      }
    case "view-agent":
      {
        let foundAgent;
        if (cache[130] !== allAgents || cache[131] !== viewState.agent) {
          let matchPredicate;
          if (cache[133] !== viewState.agent) matchPredicate = candidate => candidate.agentType === viewState.agent.agentType && candidate.source === viewState.agent.source, cache[133] = viewState.agent, cache[134] = matchPredicate;else matchPredicate = cache[134];
          foundAgent = allAgents.find(matchPredicate), cache[130] = allAgents, cache[131] = viewState.agent, cache[132] = foundAgent;
        } else foundAgent = cache[132];
        let currentAgent = foundAgent || viewState.agent,
          handleCancelCb;
        if (cache[135] !== currentAgent || cache[136] !== viewState.previousMode) handleCancelCb = () => setViewState({
          mode: "agent-menu",
          agent: currentAgent,
          previousMode: viewState.previousMode
        }), cache[135] = currentAgent, cache[136] = viewState.previousMode, cache[137] = handleCancelCb;else handleCancelCb = cache[137];
        let handleBackCb;
        if (cache[138] !== currentAgent || cache[139] !== viewState.previousMode) handleBackCb = () => setViewState({
          mode: "agent-menu",
          agent: currentAgent,
          previousMode: viewState.previousMode
        }), cache[138] = currentAgent, cache[139] = viewState.previousMode, cache[140] = handleBackCb;else handleBackCb = cache[140];
        let viewContent;
        if (cache[141] !== currentAgent || cache[142] !== allAgents || cache[143] !== availableTools || cache[144] !== handleBackCb) viewContent = Ul.jsx(YPl, {
          agent: currentAgent,
          tools: availableTools,
          allAgents: allAgents,
          onBack: handleBackCb
        }), cache[141] = currentAgent, cache[142] = allAgents, cache[143] = availableTools, cache[144] = handleBackCb, cache[145] = viewContent;else viewContent = cache[145];
        let viewDialog;
        if (cache[146] !== currentAgent.agentType || cache[147] !== handleCancelCb || cache[148] !== viewContent) viewDialog = Ul.jsx(Jn, {
          title: currentAgent.agentType,
          onCancel: handleCancelCb,
          hideInputGuide: !0,
          children: viewContent
        }), cache[146] = currentAgent.agentType, cache[147] = handleCancelCb, cache[148] = viewContent, cache[149] = viewDialog;else viewDialog = cache[149];
        let viewKeyboardHint;
        if (cache[150] === Symbol.for("react.memo_cache_sentinel")) viewKeyboardHint = Ul.jsx($, {
          marginLeft: 2,
          marginTop: 1,
          children: Ul.jsx(Ny, {
            children: Ul.jsx(bn, {
              children: Ul.jsx(at, {
                chord: ["enter", "escape"],
                action: "go back"
              })
            })
          })
        }), cache[150] = viewKeyboardHint;else viewKeyboardHint = cache[150];
        let agentView;
        if (cache[151] !== viewDialog) agentView = Ul.jsxs(Ul.Fragment, {
          children: [viewDialog, viewKeyboardHint]
        }), cache[151] = viewDialog, cache[152] = agentView;else agentView = cache[152];
        return agentView;
      }
    case "delete-confirm":
      {
        let handleCancelCb;
        if (cache[153] !== viewState) handleCancelCb = () => {
          if ("previousMode" in viewState) setViewState(viewState.previousMode);
        }, cache[153] = viewState, cache[154] = handleCancelCb;else handleCancelCb = cache[154];
        let handleCancel = handleCancelCb,
          confirmPrompt;
        if (cache[155] !== viewState.agent.agentType) confirmPrompt = Ul.jsxs(v, {
          children: ["Are you sure you want to delete the agent", " ", Ul.jsx(v, {
            bold: !0,
            children: viewState.agent.agentType
          }), "?"]
        }), cache[155] = viewState.agent.agentType, cache[156] = confirmPrompt;else confirmPrompt = cache[156];
        let sourceLine;
        if (cache[157] !== viewState.agent.source) sourceLine = Ul.jsx($, {
          marginTop: 1,
          children: Ul.jsxs(v, {
            dimColor: !0,
            children: ["Source: ", viewState.agent.source]
          })
        }), cache[157] = viewState.agent.source, cache[158] = sourceLine;else sourceLine = cache[158];
        let confirmDeleteCb;
        if (cache[159] !== handleDeleteAgent || cache[160] !== viewState.agent) confirmDeleteCb = () => void handleDeleteAgent(viewState.agent), cache[159] = handleDeleteAgent, cache[160] = viewState.agent, cache[161] = confirmDeleteCb;else confirmDeleteCb = cache[161];
        let confirmButtons;
        if (cache[162] !== handleCancel || cache[163] !== confirmDeleteCb) confirmButtons = Ul.jsx($, {
          marginTop: 1,
          children: Ul.jsx(Bl, {
            confirmLabel: "Yes, delete",
            cancelLabel: "No, cancel",
            onConfirm: confirmDeleteCb,
            onCancel: handleCancel
          })
        }), cache[162] = handleCancel, cache[163] = confirmDeleteCb, cache[164] = confirmButtons;else confirmButtons = cache[164];
        let deleteDialog;
        if (cache[165] !== handleCancel || cache[166] !== confirmPrompt || cache[167] !== sourceLine || cache[168] !== confirmButtons) deleteDialog = Ul.jsxs(Jn, {
          title: "Delete agent",
          onCancel: handleCancel,
          color: "error",
          children: [confirmPrompt, sourceLine, confirmButtons]
        }), cache[165] = handleCancel, cache[166] = confirmPrompt, cache[167] = sourceLine, cache[168] = confirmButtons, cache[169] = deleteDialog;else deleteDialog = cache[169];
        let deleteKeyboardHint;
        if (cache[170] === Symbol.for("react.memo_cache_sentinel")) deleteKeyboardHint = Ul.jsx($, {
          marginLeft: 2,
          marginTop: 1,
          children: Ul.jsx(Ny, {
            children: Ul.jsxs(bn, {
              children: [Ul.jsx(at, {
                chord: ["up", "down"],
                action: "navigate"
              }), Ul.jsx(at, {
                chord: "enter",
                action: "select"
              }), Ul.jsx(at, {
                chord: "escape",
                action: "cancel"
              })]
            })
          })
        }), cache[170] = deleteKeyboardHint;else deleteKeyboardHint = cache[170];
        let deleteView;
        if (cache[171] !== deleteDialog) deleteView = Ul.jsxs(Ul.Fragment, {
          children: [deleteDialog, deleteKeyboardHint]
        }), cache[171] = deleteDialog, cache[172] = deleteView;else deleteView = cache[172];
        return deleteView;
      }
    case "run-agent":
      {
        let currentAgent = viewState.agent,
          runTitle = `Run ${currentAgent.agentType}`,
          handleCancelCb;
        if (cache[173] !== viewState.previousMode) handleCancelCb = () => setViewState(viewState.previousMode), cache[173] = viewState.previousMode, cache[174] = handleCancelCb;else handleCancelCb = cache[174];
        let handleSubmitCb;
        if (cache[175] !== currentAgent.agentType || cache[176] !== onExit) handleSubmitCb = rawValue => {
          let trimmedValue = rawValue.trim();
          if (!trimmedValue) return;
          onExit(void 0, {
            display: "skip",
            nextInput: `@agent-${currentAgent.agentType} ${trimmedValue}`,
            submitNextInput: !0
          });
        }, cache[175] = currentAgent.agentType, cache[176] = onExit, cache[177] = handleSubmitCb;else handleSubmitCb = cache[177];
        let handleExitCb;
        if (cache[178] !== viewState.previousMode) handleExitCb = () => setViewState(viewState.previousMode), cache[178] = viewState.previousMode, cache[179] = handleExitCb;else handleExitCb = cache[179];
        let promptInputField;
        if (cache[180] !== columns || cache[181] !== cursorOffset || cache[182] !== promptInput || cache[183] !== handleSubmitCb || cache[184] !== handleExitCb) promptInputField = Ul.jsx($, {
          marginTop: 1,
          children: Ul.jsx(ga, {
            value: promptInput,
            onChange: setPromptInput,
            onSubmit: handleSubmitCb,
            onExit: handleExitCb,
            focus: !0,
            showCursor: !0,
            columns: columns,
            cursorOffset: cursorOffset,
            onChangeCursorOffset: setCursorOffset,
            placeholder: "Describe the task…"
          })
        }), cache[180] = columns, cache[181] = cursorOffset, cache[182] = promptInput, cache[183] = handleSubmitCb, cache[184] = handleExitCb, cache[185] = promptInputField;else promptInputField = cache[185];
        let runDialog;
        if (cache[186] !== runTitle || cache[187] !== handleCancelCb || cache[188] !== promptInputField) runDialog = Ul.jsx(Jn, {
          title: runTitle,
          subtitle: "Enter a prompt for this subagent",
          onCancel: handleCancelCb,
          isCancelActive: !1,
          hideInputGuide: !0,
          children: promptInputField
        }), cache[186] = runTitle, cache[187] = handleCancelCb, cache[188] = promptInputField, cache[189] = runDialog;else runDialog = cache[189];
        let runKeyboardHint;
        if (cache[190] === Symbol.for("react.memo_cache_sentinel")) runKeyboardHint = Ul.jsx($, {
          marginLeft: 2,
          marginTop: 1,
          children: Ul.jsx(Ny, {
            children: "Enter to run \xB7 Esc to go back"
          })
        }), cache[190] = runKeyboardHint;else runKeyboardHint = cache[190];
        let runView;
        if (cache[191] !== runDialog) runView = Ul.jsxs(Ul.Fragment, {
          children: [runDialog, runKeyboardHint]
        }), cache[191] = runDialog, cache[192] = runView;else runView = cache[192];
        return runView;
      }
    case "edit-agent":
      {
        let foundAgent;
        if (cache[193] !== allAgents || cache[194] !== viewState.agent) {
          let matchPredicate;
          if (cache[196] !== viewState.agent) matchPredicate = candidate => candidate.agentType === viewState.agent.agentType && candidate.source === viewState.agent.source, cache[196] = viewState.agent, cache[197] = matchPredicate;else matchPredicate = cache[197];
          foundAgent = allAgents.find(matchPredicate), cache[193] = allAgents, cache[194] = viewState.agent, cache[195] = foundAgent;
        } else foundAgent = cache[195];
        let currentAgent = foundAgent || viewState.agent,
          editTitle = `Edit agent: ${currentAgent.agentType}`,
          handleCancelCb;
        if (cache[198] !== viewState.previousMode) handleCancelCb = () => setViewState(viewState.previousMode), cache[198] = viewState.previousMode, cache[199] = handleCancelCb;else handleCancelCb = cache[199];
        let handleSavedCb, handleBackCb;
        if (cache[200] !== viewState.previousMode) handleSavedCb = savedMessage => {
          handleAgentCreated(savedMessage), setViewState(viewState.previousMode);
        }, handleBackCb = () => setViewState(viewState.previousMode), cache[200] = viewState.previousMode, cache[201] = handleSavedCb, cache[202] = handleBackCb;else handleSavedCb = cache[201], handleBackCb = cache[202];
        let editContent;
        if (cache[203] !== currentAgent || cache[204] !== availableTools || cache[205] !== handleSavedCb || cache[206] !== handleBackCb) editContent = Ul.jsx(rOl, {
          agent: currentAgent,
          tools: availableTools,
          onSaved: handleSavedCb,
          onBack: handleBackCb
        }), cache[203] = currentAgent, cache[204] = availableTools, cache[205] = handleSavedCb, cache[206] = handleBackCb, cache[207] = editContent;else editContent = cache[207];
        let editDialog;
        if (cache[208] !== editTitle || cache[209] !== handleCancelCb || cache[210] !== editContent) editDialog = Ul.jsx(Jn, {
          title: editTitle,
          onCancel: handleCancelCb,
          hideInputGuide: !0,
          children: editContent
        }), cache[208] = editTitle, cache[209] = handleCancelCb, cache[210] = editContent, cache[211] = editDialog;else editDialog = cache[211];
        let editKeyboardHint;
        if (cache[212] === Symbol.for("react.memo_cache_sentinel")) editKeyboardHint = Ul.jsx($, {
          marginLeft: 2,
          marginTop: 1,
          children: keyboardHintNode
        }), cache[212] = editKeyboardHint;else editKeyboardHint = cache[212];
        let editView;
        if (cache[213] !== editDialog) editView = Ul.jsxs(Ul.Fragment, {
          children: [editDialog, editKeyboardHint]
        }), cache[213] = editDialog, cache[214] = editView;else editView = cache[214];
        return editView;
      }
    default:
      return null;
  }
}
/** Predicate: agent comes from a plugin. */
function n_m(agent) {
  return agent.source === "plugin";
}
/** Predicate: agent comes from CLI flag settings. */
function r_m(agent) {
  return agent.source === "flagSettings";
}
/** Predicate: agent comes from local settings. */
function o_m(agent) {
  return agent.source === "localSettings";
}
/** Predicate: agent comes from policy settings. */
function s_m(agent) {
  return agent.source === "policySettings";
}
/** Predicate: agent comes from project settings. */
function i_m(agent) {
  return agent.source === "projectSettings";
}
/** Predicate: agent comes from user settings. */
function a_m(agent) {
  return agent.source === "userSettings";
}
/** Predicate: agent is a built-in agent. */
function l_m(agent) {
  return agent.source === "built-in";
}
/** Selector: agent types invoked during this session. */
function c_m(state) {
  return state.agentTypesInvokedThisSession;
}
/** Selector: running/queued tasks. */
function u_m(state) {
  return state.tasks;
}
/** Selector: current tool permission context. */
function d_m(state) {
  return state.toolPermissionContext;
}
/** Selector: MCP tools. */
function p_m(state) {
  return state.mcp.tools;
}
/** Selector: agent definitions (all + active). */
function m_m(state) {
  return state.agentDefinitions;
}
/**
 * Tiny helper component that wires the "confirm:no" key to the dialog's cancel
 * handler. Renders nothing.
 */
function f_m(props: { onCancel: () => void }) {
  let cache = w0o.c(1),
    {
      onCancel
    } = props,
    keyContext;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) keyContext = {
    context: "Confirmation"
  }, cache[0] = keyContext;else keyContext = cache[0];
  return Or("confirm:no", onCancel, keyContext), null;
}
var w0o, xgt, Ul;
var eLl = b(() => {
  Gc();
  Pa();
  TI();
  g0o();
  ui();
  je();
  ss();
  uo();
  Hue();
  y0o();
  kg();
  ky();
  qe();
  dn();
  Ct();
  Ol();
  Is();
  d_();
  di();
  uq();
  Wo();
  rS();
  sP();
  rh();
  JPl();
  oOl();
  lOl();
  Rgt();
  JOl();
  QOl();
  w0o = x(tt(), 1), xgt = x(et(), 1), Ul = x(oe(), 1);
});

export {ZOl,n_m,r_m,o_m,s_m,i_m,a_m,l_m,c_m,u_m,d_m,p_m,m_m,f_m,w0o,xgt,Ul,eLl};
