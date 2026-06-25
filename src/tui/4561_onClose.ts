// @ts-nocheck
import {qw,sP} from "../../vendor/m4535.ts";
import {getSettingsSchema as ZS,SE} from "../../vendor/m2559.ts";
import {useTheme as ji,useThemeSetting as bve} from "../../vendor/m2285.ts";
import {qft,Wft,PVn,AAo} from "./4534_theme.ts";
import {getInitialSettings as Fr,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {I1,lq} from "../../vendor/m5221.ts";
import {getCurrentProjectConfig as eh,getAutoUpdaterDisabledReason as B_e,saveGlobalConfig as hn,formatAutoUpdaterDisabledReason as g$t,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {useTerminalFocus as nh} from "../../vendor/m2390.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {$l,Hf,vk,WS} from "../api/1453_month.ts";
import {hasAutoModeOptInAnySource as QDe,getAutoModeEnabledState as q8e,cy} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {n9,UY} from "../config/4246_shouldToolsListOptInToBrief.ts";
import {oo,b,x} from "../../runtime.ts";
import {jpl,x8t} from "../telemetry/4531_agentPushNotifEnabled.ts";
import {RH,lne} from "../../vendor/m4558.ts";
import {J9e,uS} from "../config/3192_path.ts";
import {Ne} from "../../vendor/m583.ts";
import {lc,mg} from "../../vendor/m2209.ts";
import {Mbn,L2} from "../agent/2222_available.ts";
import {getMemoryFiles as qA,hasExternalClaudeMdIncludes as iHn,getExternalClaudeMdIncludes as Yrt,ZR} from "../config/2729_stripHtmlComments.ts";
import {pae,$kn,oee} from "../session/2699_oee.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {hasStoredOAuthToken as pE,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {XDe,DVn} from "../telemetry/4533_DVn.ts";
import {wfl,sKn,nRo,Afl,tRo,Rfl,kfl} from "../../vendor/m4559.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {ep} from "../../vendor/m2223.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {rA,eC,dn} from "../config/0137_namespace.ts";
import {sF,XJe} from "../../vendor/m1297.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {x5,Pa} from "../../vendor/m720.ts";
import {Or,Oo,ss} from "../../vendor/m2553.ts";
import {recordExternalIncludesDecision as $Vn,ClaudeMdExternalIncludesDialog as MAo,NAo} from "./4547_recordExternalIncludesDecision.ts";
import {iDe,B5e} from "../core/4310_inFlight.ts";
import {isAgentsFleetEnabled as hD,fC} from "../config/2212_shouldShowLaunchComposer.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Gft,FVn} from "./4543_onThemeSelect.ts";
import {buildMcpToolName as Vl,ky} from "../agent/2238_explicitlyRequested.ts";
import {J3,she} from "../../vendor/m2272.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {V8e,UVn} from "./4546_initial.ts";
import {ZY,gTe} from "../../vendor/m4528.ts";
import {Pt,mn} from "../telemetry/0600_feature_name.ts";
import {Iml,xml} from "../../vendor/m4548.ts";
import {Pml,Oml} from "../../vendor/m4549.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {hr} from "../../vendor/m2573.ts";
import {vml,wml} from "../../vendor/m4547.ts";
import {Qpl,$8e,SAo,bAo} from "../../vendor/m4531.ts";
import {aP,aue} from "../config/4552_query.ts";
import {tQ,FS} from "../../vendor/m722.ts";
import {je} from "../../vendor/m2462.ts";
import {IA} from "../telemetry/2225_names.ts";
import {TS} from "../../vendor/m4541.ts";
import {Ir} from "../../vendor/m584.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Settings / Config panel TUI component.
 *
 * Renders a searchable, scrollable list of configuration settings plus a set of
 * sub-views (Theme, Model, TeammateModel, ExternalIncludes, OutputStyle,
 * Language, AgentsView, EnableAutoUpdates, ChannelDowngrade, Notifications)
 * that are swapped in based on the `activeSubView` state. On dismissal it
 * computes a human-readable summary of every changed setting and reports it via
 * `onClose`.
 *
 * Structure-exact 1:1 restoration; only local bindings renamed and types/comments added.
 */
function xfl({
  onClose,
  context,
  setTabsHidden,
  onIsSearchModeChange,
  contentHeight
}: {
  onClose: (message: string, opts?: { display?: string }) => void;
  context: { options: { mcpClients: unknown }; messages: Array<{ type: string }> };
  setTabsHidden: (hidden: boolean) => void;
  onIsSearchModeChange: (isSearchMode: boolean) => void;
  contentHeight?: number;
}) {
  let {
      headerFocused,
      focusHeader
    } = qw(),
    isCompact = ZS(),
    [, setTheme] = ji(),
    themeSetting = bve(),
    [globalConfig, setGlobalConfig] = jh.useState(qft),
    initialGlobalConfigRef = jh.useRef(globalConfig),
    [settingsData, setSettingsData] = jh.useState(Fr()),
    initialSettingsRef = jh.useRef(Fr()),
    [currentOutputStyle, setCurrentOutputStyle] = jh.useState(settingsData?.outputStyle || I1),
    initialOutputStyleRef = jh.useRef(currentOutputStyle),
    [externalIncludesApproved, setExternalIncludesApproved] = jh.useState(() => eh().hasClaudeMdExternalIncludesApproved === !0),
    [currentLanguage, setCurrentLanguage] = jh.useState(settingsData?.language),
    initialLanguageRef = jh.useRef(currentLanguage),
    [selectedIndex, setSelectedIndex] = jh.useState(0),
    [scrollOffset, setScrollOffset] = jh.useState(0),
    [searchMode, setSearchMode] = jh.useState(!0),
    isTerminalFocused = nh(),
    {
      rows: terminalRows,
      columns: terminalColumns
    } = _r(),
    labelColumnWidth = Math.min(44, Math.max(14, terminalColumns - 16)),
    panelHeight = contentHeight ?? Math.min(Math.floor(terminalRows * 0.8), 30),
    visibleRows = Math.max(5, panelHeight - 10),
    mainLoopModel = _t(state => state.mainLoopModel),
    verbose = _t(state => state.verbose),
    thinkingEnabled = _t(state => state.thinkingEnabled),
    isFastMode = _t(state => $l() ? state.fastMode : !1),
    promptSuggestionEnabled = _t(state => state.promptSuggestionEnabled),
    awaySummaryEnabled = _t(state => state.awaySummaryEnabled),
    showAutoInDefaultModePicker = QDe() || q8e() === "enabled",
    showDefaultViewPicker = (n9(), oo(UY)).isBriefEntitled(),
    setAppState = bo(),
    [changes, setChanges] = jh.useState({}),
    initialThinkingEnabledRef = jh.useRef(thinkingEnabled);
  jh.useEffect(() => jpl(() => setGlobalConfig(qft())), []);
  let [showThinkingWarning, setShowThinkingWarning] = jh.useState(!1),
    [activeSubView, setActiveSubView] = jh.useState(null),
    [agentsViewIndex, setAgentsViewIndex] = jh.useState(0),
    {
      query,
      setQuery,
      cursorOffset,
      handleKeyDown: searchHandleKeyDown,
      handlePaste
    } = RH({
      isActive: searchMode && activeSubView === null && !headerFocused,
      onExit: () => setSearchMode(!1),
      onExitUp: focusHeader,
      passthroughCtrlKeys: ["c", "d"]
    }),
    isSearchModeActive = !headerFocused;
  jh.useEffect(() => {
    onIsSearchModeChange(isSearchModeActive);
  }, [isSearchModeActive, onIsSearchModeChange]);
  let isConnectedToIde = J9e(context.options.mcpClients),
    isFileCheckpointingAvailable = !Ne.CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING,
    disableWorkflowsSetting = lc("disableWorkflows", !1),
    enableWorkflowsSetting = lc("enableWorkflows", !1),
    workflowsToggleable = Mbn() && (disableWorkflowsSetting.value !== !0 || disableWorkflowsSetting.source === "userSettings") && (enableWorkflowsSetting.source === "default" || enableWorkflowsSetting.source === "userSettings"),
    memoryFiles = jh.use(qA(!0)),
    shouldShowExternalIncludesToggle = iHn(memoryFiles),
    autoUpdaterDisabledReason = B_e(),
    pushTogglesVisible = pae() && !Vi() && pE(),
    {
      settings,
      helpers: {
        onChangeMainModelConfig,
        changeNotifChannel,
        changeInputNeededNotif,
        changeAgentPushNotif
      }
    } = Wft({
      globalConfig,
      settingsData,
      themeSetting,
      currentOutputStyle,
      currentLanguage,
      externalIncludesApproved,
      thinkingEnabled,
      verbose,
      mainLoopModel,
      isFastMode,
      promptSuggestionEnabled,
      awaySummaryEnabled,
      showAutoInDefaultModePicker,
      showDefaultViewPicker,
      pushTogglesVisible,
      isConnectedToIde,
      isFileCheckpointingAvailable,
      workflowsToggleable,
      shouldShowExternalIncludesToggle,
      autoUpdaterDisabledReason,
      setAppState,
      setTheme,
      setGlobalConfig,
      setSettingsData,
      setChanges
    }),
    isGroupedView = XDe(),
    filteredSettings = jh.useMemo(() => {
      let baseSettings = isGroupedView ? wfl(settings) : settings;
      if (!query) return baseSettings;
      let lowerQuery = query.toLowerCase();
      return baseSettings.filter(setting => {
        if (setting.id.toLowerCase().includes(lowerQuery)) return !0;
        if (("searchText" in setting ? setting.searchText : setting.label).toLowerCase().includes(lowerQuery)) return !0;
        if (setting.type === "enum") return setting.options.some(option => option.toLowerCase().includes(lowerQuery));
        return !1;
      });
    }, [settings, query, isGroupedView]);
  jh.useEffect(() => {
    if (selectedIndex >= filteredSettings.length) {
      let clampedIndex = Math.max(0, filteredSettings.length - 1);
      setSelectedIndex(clampedIndex), setScrollOffset(Math.max(0, clampedIndex - visibleRows + 1));
      return;
    }
    setScrollOffset(offset => {
      if (selectedIndex < offset) return selectedIndex;
      if (selectedIndex >= offset + visibleRows) return selectedIndex - visibleRows + 1;
      return offset;
    });
  }, [filteredSettings.length, selectedIndex, visibleRows]);
  let scrollToIndex = jh.useCallback(targetIndex => {
      setScrollOffset(offset => {
        if (targetIndex < offset) return targetIndex;
        if (targetIndex >= offset + visibleRows) return targetIndex - visibleRows + 1;
        return offset;
      });
    }, [visibleRows]),
    handleDismiss = jh.useCallback(() => {
      if (activeSubView !== null) return;
      let messages = Object.entries(changes).map(([changeKey, changeValue]) => (W("tengu_config_changed", {
          key: changeKey,
          setting: changeKey,
          value: ep(String(changeValue))
        }), `Set ${changeKey} to ${bt.bold(changeValue)}`)),
        apiKey = rA() ? void 0 : process.env.ANTHROPIC_API_KEY,
        wasApiKeyApproved = Boolean(apiKey && initialGlobalConfigRef.current.customApiKeyResponses?.approved?.includes(sF(apiKey))),
        isApiKeyApproved = Boolean(apiKey && globalConfig.customApiKeyResponses?.approved?.includes(sF(apiKey)));
      if (wasApiKeyApproved !== isApiKeyApproved) messages.push(`${isApiKeyApproved ? "Enabled" : "Disabled"} custom API key`), W("tengu_config_changed", {
        key: Ve("env.ANTHROPIC_API_KEY"),
        setting: Ve("env.ANTHROPIC_API_KEY"),
        value: isApiKeyApproved
      });
      if (globalConfig.theme !== initialGlobalConfigRef.current.theme) messages.push(`Set theme to ${bt.bold(globalConfig.theme)}`);
      if (globalConfig.preferredNotifChannel !== initialGlobalConfigRef.current.preferredNotifChannel) messages.push(`Set notifications to ${bt.bold(globalConfig.preferredNotifChannel)}`);
      if (currentOutputStyle !== initialOutputStyleRef.current) messages.push(`Set output style to ${bt.bold(currentOutputStyle)}`);
      if (currentLanguage !== initialLanguageRef.current) messages.push(`Set response language to ${bt.bold(currentLanguage ?? "Default (English)")}`);
      if (globalConfig.editorMode !== initialGlobalConfigRef.current.editorMode) messages.push(`Set editor mode to ${bt.bold(globalConfig.editorMode || "emacs")}`);
      if (globalConfig.diffTool !== initialGlobalConfigRef.current.diffTool) messages.push(`Set diff tool to ${bt.bold(globalConfig.diffTool)}`);
      if (globalConfig.autoConnectIde !== initialGlobalConfigRef.current.autoConnectIde) messages.push(`${globalConfig.autoConnectIde ? "Enabled" : "Disabled"} auto-connect to IDE`);
      if (globalConfig.autoInstallIdeExtension !== initialGlobalConfigRef.current.autoInstallIdeExtension) messages.push(`${globalConfig.autoInstallIdeExtension ? "Enabled" : "Disabled"} auto-install IDE extension`);
      if (globalConfig.autoCompactEnabled !== initialGlobalConfigRef.current.autoCompactEnabled) messages.push(`${globalConfig.autoCompactEnabled ? "Enabled" : "Disabled"} auto-compact`);
      if (globalConfig.autoScrollEnabled !== initialGlobalConfigRef.current.autoScrollEnabled) messages.push(`${globalConfig.autoScrollEnabled ? "Enabled" : "Disabled"} auto-scroll`);
      if (globalConfig.respectGitignore !== initialGlobalConfigRef.current.respectGitignore) messages.push(`${globalConfig.respectGitignore ? "Enabled" : "Disabled"} respect .gitignore in file picker`);
      if (globalConfig.copyFullResponse !== initialGlobalConfigRef.current.copyFullResponse) messages.push(`${globalConfig.copyFullResponse ? "Enabled" : "Disabled"} always copy full response`);
      if (globalConfig.copyOnSelect !== initialGlobalConfigRef.current.copyOnSelect) messages.push(`${globalConfig.copyOnSelect ? "Enabled" : "Disabled"} copy on select`);
      if (globalConfig.leftArrowOpensAgents !== initialGlobalConfigRef.current.leftArrowOpensAgents) messages.push(`${globalConfig.leftArrowOpensAgents ?? !0 ? "Enabled" : "Disabled"} ${x5} opens agents`);
      if (globalConfig.defaultToAgentsView !== initialGlobalConfigRef.current.defaultToAgentsView) messages.push(`${globalConfig.defaultToAgentsView ? "Enabled" : "Disabled"} open agents view by default`);
      if (globalConfig.terminalProgressBarEnabled !== initialGlobalConfigRef.current.terminalProgressBarEnabled) messages.push(`${globalConfig.terminalProgressBarEnabled ? "Enabled" : "Disabled"} terminal progress bar`);
      if (globalConfig.showStatusInTerminalTab !== initialGlobalConfigRef.current.showStatusInTerminalTab) messages.push(`${globalConfig.showStatusInTerminalTab ? "Enabled" : "Disabled"} terminal tab status`);
      if (globalConfig.showTurnDuration !== initialGlobalConfigRef.current.showTurnDuration) messages.push(`${globalConfig.showTurnDuration ? "Enabled" : "Disabled"} turn duration`);
      if (globalConfig.showMessageTimestamps !== initialGlobalConfigRef.current.showMessageTimestamps) messages.push(`${globalConfig.showMessageTimestamps ? "Enabled" : "Disabled"} message timestamps`);
      if (globalConfig.remoteControlAtStartup !== initialGlobalConfigRef.current.remoteControlAtStartup) {
        let remoteControlMessage = globalConfig.remoteControlAtStartup === void 0 ? "Reset Remote Control to default" : `${globalConfig.remoteControlAtStartup ? "Enabled" : "Disabled"} Remote Control for all sessions`;
        messages.push(remoteControlMessage);
      }
      if (settingsData?.autoUpdatesChannel !== initialSettingsRef.current?.autoUpdatesChannel) messages.push(`Set auto-update channel to ${bt.bold(settingsData?.autoUpdatesChannel === "rc" ? "slow" : settingsData?.autoUpdatesChannel ?? "latest")}`);
      if (messages.length > 0) onClose(messages.join(`
`));else onClose("Config dialog dismissed", {
        display: "system"
      });
    }, [activeSubView, changes, globalConfig, mainLoopModel, currentOutputStyle, currentLanguage, settingsData?.autoUpdatesChannel, $l() ? settingsData?.fastMode : void 0, onClose]);
  Or("confirm:no", handleDismiss, {
    context: "Settings",
    isActive: activeSubView === null && !searchMode && !headerFocused
  });
  let isExternalIncludesToggle = jh.useCallback(setting => isGroupedView && setting.type === "managedEnum" && setting.id === "showExternalIncludesDialog" && externalIncludesApproved, [isGroupedView, externalIncludesApproved]),
    isSettingOverriddenInJson = jh.useCallback(settingId => sKn.find(entry => entry.id === settingId)?.isSet({
      settingsData,
      globalConfig
    }) ?? !1, [settingsData, globalConfig]),
    handleAccept = jh.useCallback(() => {
      let setting = filteredSettings[selectedIndex];
      if (!setting || !setting.onChange) return;
      if (setting.type === "boolean") {
        let nextValue = !setting.value;
        if (setting.onChange(nextValue), W("tengu_config_changed", {
          setting: setting.id,
          value: String(nextValue)
        }), setting.id === "thinking") {
          if (nextValue === initialThinkingEnabledRef.current) setShowThinkingWarning(!1);else if (context.messages.some(message => message.type === "assistant")) setShowThinkingWarning(!0);
        }
        return;
      }
      if (isExternalIncludesToggle(setting)) {
        $Vn(!1, "config_toggle"), setExternalIncludesApproved(!1);
        return;
      }
      if (setting.id === "agentsView") {
        setAgentsViewIndex(0), setActiveSubView("AgentsView"), setTabsHidden(!0);
        return;
      }
      if (setting.id === "notifChannel" && setting.type === "managedEnum") {
        setActiveSubView("Notifications"), setTabsHidden(!0);
        return;
      }
      if (setting.id === "theme" || setting.id === "model" || setting.id === "teammateDefaultModel" || setting.id === "showExternalIncludesDialog" || setting.id === "outputStyle" || setting.id === "language") switch (setting.id) {
        case "theme":
          setActiveSubView("Theme"), setTabsHidden(!0);
          return;
        case "model":
          setActiveSubView("Model"), setTabsHidden(!0);
          return;
        case "teammateDefaultModel":
          setActiveSubView("TeammateModel"), setTabsHidden(!0);
          return;
        case "showExternalIncludesDialog":
          setActiveSubView("ExternalIncludes"), setTabsHidden(!0);
          return;
        case "outputStyle":
          setActiveSubView("OutputStyle"), setTabsHidden(!0);
          return;
        case "language":
          setActiveSubView("Language"), setTabsHidden(!0);
          return;
      }
      if (setting.id === "autoUpdatesChannel") {
        if (autoUpdaterDisabledReason) {
          setActiveSubView("EnableAutoUpdates"), setTabsHidden(!0);
          return;
        }
        if ((settingsData?.autoUpdatesChannel ?? "latest") === "latest") setActiveSubView("ChannelDowngrade"), setTabsHidden(!0);else ao("userSettings", {
          autoUpdatesChannel: void 0,
          minimumVersion: void 0
        }), setSettingsData(prev => ({
          ...prev,
          autoUpdatesChannel: void 0,
          minimumVersion: void 0
        })), W("tengu_autoupdate_channel_changed", {
          channel: Ve("latest")
        });
        return;
      }
      if (setting.type === "enum") {
        let nextOptionIndex = (setting.options.indexOf(setting.value) + 1) % setting.options.length,
          nextOption = setting.options[nextOptionIndex];
        setting.onChange(nextOption), W("tengu_config_changed", {
          setting: setting.id,
          value: nextOption
        });
        return;
      }
    }, [autoUpdaterDisabledReason, isExternalIncludesToggle, filteredSettings, selectedIndex, settingsData?.autoUpdatesChannel, setTabsHidden]),
    moveSelection = delta => {
      setShowThinkingWarning(!1);
      let nextIndex = Math.max(0, Math.min(filteredSettings.length - 1, selectedIndex + delta));
      setSelectedIndex(nextIndex), scrollToIndex(nextIndex);
    };
  Oo({
    "select:previous": () => {
      if (selectedIndex === 0) setShowThinkingWarning(!1), setSearchMode(!0), setScrollOffset(0);else moveSelection(-1);
    },
    "select:next": () => moveSelection(1),
    "scroll:lineUp": () => moveSelection(-1),
    "scroll:lineDown": () => moveSelection(1),
    "select:accept": handleAccept,
    "settings:search": () => {
      setSearchMode(!0), setQuery("");
    }
  }, {
    context: "Settings",
    isActive: activeSubView === null && !searchMode && !headerFocused
  });
  let agentsViewItems = jh.useMemo(() => [...(iDe() ? [{
      id: "leftArrowOpensAgents",
      label: `${x5} opens agents`,
      value: globalConfig.leftArrowOpensAgents ?? !0
    }] : []), ...(hD() ? [{
      id: "defaultToAgentsView",
      label: "Start in agent view",
      value: globalConfig.defaultToAgentsView ?? !1
    }] : [])], [globalConfig.leftArrowOpensAgents, globalConfig.defaultToAgentsView]),
    handleAgentsViewAccept = jh.useCallback(() => {
      let item = agentsViewItems[agentsViewIndex];
      if (!item) return;
      let nextValue = !item.value;
      if (item.id === "leftArrowOpensAgents") hn(prev => ({
        ...prev,
        leftArrowOpensAgents: nextValue
      })), setGlobalConfig(prev => ({
        ...prev,
        leftArrowOpensAgents: nextValue
      }));else hn(prev => ({
        ...prev,
        defaultToAgentsView: nextValue
      })), setGlobalConfig(prev => ({
        ...prev,
        defaultToAgentsView: nextValue
      }));
      W("tengu_config_changed", {
        setting: Le(item.id),
        value: nextValue ? Ve("true") : Ve("false")
      });
    }, [agentsViewItems, agentsViewIndex]);
  Oo({
    "select:previous": () => setAgentsViewIndex(index => Math.max(0, index - 1)),
    "select:next": () => setAgentsViewIndex(index => Math.min(agentsViewItems.length - 1, index + 1)),
    "select:accept": handleAgentsViewAccept
  }, {
    context: "Settings",
    isActive: activeSubView === "AgentsView"
  });
  let handleKeyDown = jh.useCallback(event => {
    if (activeSubView !== null) return;
    if (headerFocused) return;
    if (searchMode) {
      if (searchHandleKeyDown(event), event.key === "escape") {
        if (event.preventDefault(), query.length > 0) setQuery("");else setSearchMode(!1);
        return;
      }
      if (event.key === "return" || event.key === "down") event.preventDefault(), setSearchMode(!1), setSelectedIndex(0), setScrollOffset(0);
      return;
    }
    if (event.key === "left" || event.key === "right" || event.key === "tab") {
      event.preventDefault(), handleAccept();
      return;
    }
    if (event.ctrl || event.meta) return;
    if (event.key.length === 1 && event.key !== " ") event.preventDefault(), setSearchMode(!0), setQuery(event.key === "/" ? "" : event.key);
  }, [activeSubView, headerFocused, searchMode, query, setQuery, searchHandleKeyDown, handleAccept]);
  return us.jsx($, {
    flexDirection: "column",
    width: "100%",
    tabIndex: 0,
    autoFocus: !headerFocused,
    onKeyDown: handleKeyDown,
    onPaste: handlePaste,
    children: activeSubView === "Theme" ? us.jsxs(us.Fragment, {
      children: [us.jsx(Gft, {
        onThemeSelect: theme => {
          setTheme(theme), setActiveSubView(null), setTabsHidden(!1);
        },
        onCancel: () => {
          setActiveSubView(null), setTabsHidden(!1);
        },
        helpText: Vl("themes") ? `Custom themes are disabled in safe mode — ${eC()} to load them${J3(themeSetting) ? `. Your saved theme "${J3(themeSetting)}" is a custom theme; selecting a preset here replaces it` : ""}` : "",
        hideEscToCancel: !0,
        skipExitHandling: !0
      }), us.jsx($, {
        children: us.jsx(v, {
          dimColor: !0,
          italic: !0,
          children: us.jsxs(bn, {
            children: [us.jsx(at, {
              chord: "enter",
              action: "select"
            }), us.jsx(dr, {
              action: "confirm:no",
              context: "Confirmation",
              fallback: "Esc",
              description: "cancel"
            })]
          })
        })
      })]
    }) : activeSubView === "Model" ? us.jsxs(us.Fragment, {
      children: [us.jsx(V8e, {
        initial: mainLoopModel,
        onSelect: (model, source) => {
          onChangeMainModelConfig(model), setActiveSubView(null), setTabsHidden(!1);
        },
        onCancel: () => {
          setActiveSubView(null), setTabsHidden(!1);
        },
        showFastModeNotice: $l() ? isFastMode && Hf(mainLoopModel) && vk() : !1
      }), us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(at, {
            chord: "enter",
            action: "confirm"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "cancel"
          })]
        })
      })]
    }) : activeSubView === "TeammateModel" ? us.jsxs(us.Fragment, {
      children: [us.jsx(V8e, {
        initial: globalConfig.teammateDefaultModel ?? null,
        skipSettingsWrite: !0,
        headerText: "Default model for newly spawned teammates. The leader can override via the tool call's model parameter.",
        onSelect: (model, source) => {
          if (setActiveSubView(null), setTabsHidden(!1), globalConfig.teammateDefaultModel === void 0 && model === null) return;
          if (ZY(model)) {
            Pt("model_fable_consent", "config_teammate_blocked"), setChanges(prev => ({
              ...prev,
              teammateDefaultModel: `${PVn(globalConfig.teammateDefaultModel)} (Fable 5 needs usage-credits consent — /model to set up)`
            }));
            return;
          }
          hn(prev => prev.teammateDefaultModel === model ? prev : {
            ...prev,
            teammateDefaultModel: model
          }), setGlobalConfig(prev => ({
            ...prev,
            teammateDefaultModel: model
          })), setChanges(prev => ({
            ...prev,
            teammateDefaultModel: PVn(model)
          })), W("tengu_teammate_default_model_changed", {
            model
          });
        },
        onCancel: () => {
          setActiveSubView(null), setTabsHidden(!1);
        }
      }), us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(at, {
            chord: "enter",
            action: "confirm"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "cancel"
          })]
        })
      })]
    }) : activeSubView === "ExternalIncludes" ? us.jsxs(us.Fragment, {
      children: [us.jsx(MAo, {
        onDone: () => {
          setExternalIncludesApproved(eh().hasClaudeMdExternalIncludesApproved === !0), setActiveSubView(null), setTabsHidden(!1);
        },
        externalIncludes: Yrt(memoryFiles)
      }), us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(at, {
            chord: "enter",
            action: "confirm"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "disable external includes"
          })]
        })
      })]
    }) : activeSubView === "OutputStyle" ? us.jsxs(us.Fragment, {
      children: [us.jsx(Iml, {
        initialStyle: currentOutputStyle,
        onComplete: style => {
          setCurrentOutputStyle(style ?? I1), setActiveSubView(null), setTabsHidden(!1), ao("localSettings", {
            outputStyle: style
          }), W("tengu_output_style_changed", {
            style: style ?? I1,
            source: Ve("config_panel"),
            settings_source: Ve("localSettings")
          });
        },
        onCancel: () => {
          setActiveSubView(null), setTabsHidden(!1);
        }
      }), us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(at, {
            chord: "enter",
            action: "confirm"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "cancel"
          })]
        })
      })]
    }) : activeSubView === "Language" ? us.jsxs(us.Fragment, {
      children: [us.jsx(Pml, {
        initialLanguage: currentLanguage,
        onComplete: language => {
          setCurrentLanguage(language), setActiveSubView(null), setTabsHidden(!1), ao("userSettings", {
            language
          }), W("tengu_language_changed", {
            language: language ?? "default",
            source: Ve("config_panel")
          });
        },
        onCancel: () => {
          setActiveSubView(null), setTabsHidden(!1);
        }
      }), us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(at, {
            chord: "enter",
            action: "confirm"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Settings",
            fallback: "Esc",
            description: "cancel"
          })]
        })
      })]
    }) : activeSubView === "AgentsView" ? us.jsxs(Jn, {
      title: "Agents view",
      onCancel: () => {
        setActiveSubView(null), setTabsHidden(!1);
      },
      hideBorder: !0,
      hideInputGuide: !0,
      children: [us.jsx($, {
        flexDirection: "column",
        children: agentsViewItems.map((item, index) => {
          let isSelected = index === agentsViewIndex;
          return us.jsxs($, {
            children: [us.jsx($, {
              width: labelColumnWidth,
              flexShrink: 0,
              marginRight: 1,
              children: us.jsxs(v, {
                color: isSelected ? "suggestion" : void 0,
                wrap: "truncate-end",
                children: [isSelected ? Xe.pointer : " ", " ", item.label]
              })
            }), us.jsx(v, {
              color: isSelected ? "suggestion" : void 0,
              children: String(item.value)
            })]
          }, item.id);
        })
      }), us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(at, {
            chord: ["enter", "space"],
            action: "toggle"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "close"
          })]
        })
      })]
    }) : activeSubView === "EnableAutoUpdates" ? us.jsx(Jn, {
      title: "Enable Auto-Updates",
      onCancel: () => {
        setActiveSubView(null), setTabsHidden(!1);
      },
      hideBorder: !0,
      hideInputGuide: !0,
      children: autoUpdaterDisabledReason?.type !== "config" ? us.jsxs(us.Fragment, {
        children: [us.jsx(v, {
          children: autoUpdaterDisabledReason?.type === "env" ? "Auto-updates are controlled by an environment variable and cannot be changed here." : "Auto-updates are disabled in development builds."
        }), autoUpdaterDisabledReason?.type === "env" && us.jsxs(v, {
          dimColor: !0,
          children: ["Unset ", autoUpdaterDisabledReason.envVar, " to re-enable auto-updates."]
        })]
      }) : us.jsx(hr, {
        options: [{
          label: "Enable with latest channel",
          value: "latest"
        }, {
          label: "Enable with stable channel",
          value: "stable"
        }],
        onChange: channel => {
          setActiveSubView(null), setTabsHidden(!1), hn(prev => ({
            ...prev,
            autoUpdates: !0
          })), setGlobalConfig(prev => ({
            ...prev,
            autoUpdates: !0
          })), ao("userSettings", {
            autoUpdatesChannel: channel,
            minimumVersion: void 0
          }), setSettingsData(prev => ({
            ...prev,
            autoUpdatesChannel: channel,
            minimumVersion: void 0
          })), W("tengu_autoupdate_enabled", {
            channel
          });
        }
      })
    }) : activeSubView === "ChannelDowngrade" ? us.jsx(vml, {
      currentVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION,
      onChoice: choice => {
        if (setActiveSubView(null), setTabsHidden(!1), choice === "cancel") return;
        let nextSettings = {
          autoUpdatesChannel: "stable"
        };
        if (choice === "stay") nextSettings.minimumVersion = {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.VERSION;
        ao("userSettings", nextSettings), setSettingsData(prev => ({
          ...prev,
          ...nextSettings
        })), W("tengu_autoupdate_channel_changed", {
          channel: Ve("stable"),
          minimum_version_set: choice === "stay"
        });
      }
    }) : activeSubView === "Notifications" ? us.jsx(Qpl, {
      channel: globalConfig.preferredNotifChannel,
      showInputNeededRow: pushTogglesVisible && $kn(),
      showDoneRow: pushTogglesVisible,
      inputNeededEnabled: globalConfig.inputNeededNotifEnabled ?? !1,
      doneEnabled: globalConfig.agentPushNotifEnabled ?? !1,
      onCycleChannel: () => {
        let currentChannelIndex = $8e.indexOf(globalConfig.preferredNotifChannel),
          nextChannel = $8e[(currentChannelIndex + 1) % $8e.length];
        changeNotifChannel(nextChannel), W("tengu_config_changed", {
          setting: Ve("notifChannel"),
          value: Le(nextChannel)
        });
      },
      onToggleInputNeeded: () => {
        let nextValue = !(globalConfig.inputNeededNotifEnabled ?? !1);
        changeInputNeededNotif(nextValue), W("tengu_config_changed", {
          setting: Ve("inputNeededNotifEnabled"),
          value: nextValue ? Ve("true") : Ve("false")
        });
      },
      onToggleDone: () => {
        let nextValue = !(globalConfig.agentPushNotifEnabled ?? !1);
        changeAgentPushNotif(nextValue), W("tengu_config_changed", {
          setting: Ve("agentPushNotifEnabled"),
          value: nextValue ? Ve("true") : Ve("false")
        });
      },
      onClose: () => {
        setActiveSubView(null), setTabsHidden(!1);
      }
    }) : us.jsxs($, {
      flexDirection: "column",
      gap: 1,
      marginY: isCompact ? void 0 : 1,
      children: [us.jsx(aP, {
        query,
        isFocused: searchMode && !headerFocused,
        isTerminalFocused,
        cursorOffset,
        placeholder: "Search settings…"
      }), us.jsx($, {
        flexDirection: "column",
        children: filteredSettings.length === 0 ? us.jsxs(v, {
          dimColor: !0,
          italic: !0,
          children: ['No settings match "', query, '"']
        }) : us.jsxs(us.Fragment, {
          children: [scrollOffset > 0 && us.jsxs(v, {
            dimColor: !0,
            children: [Xe.arrowUp, " ", scrollOffset, " more above"]
          }), filteredSettings.slice(scrollOffset, scrollOffset + visibleRows).map((setting, index) => {
            let absoluteIndex = scrollOffset + index,
              isSelected = absoluteIndex === selectedIndex && !headerFocused && !searchMode,
              groupName = isGroupedView ? nRo(setting.id) : void 0,
              showGroupHeader = groupName !== void 0 && (absoluteIndex === 0 || nRo(filteredSettings[absoluteIndex - 1]?.id ?? "") !== groupName),
              isDimmed = groupName !== void 0 && Afl.has(groupName) && (groupName !== "Advanced" || tRo(setting.id)) && !isSelected;
            return us.jsxs(Ifl.Fragment, {
              children: [showGroupHeader && us.jsx($, {
                marginTop: absoluteIndex === scrollOffset ? 0 : 1,
                children: us.jsx(v, {
                  dimColor: !0,
                  children: Rfl(groupName, setting.id)
                })
              }), us.jsxs($, {
                children: [us.jsx($, {
                  width: labelColumnWidth,
                  flexShrink: 0,
                  marginRight: 1,
                  children: us.jsxs(v, {
                    color: isSelected ? "suggestion" : void 0,
                    dimColor: isDimmed,
                    wrap: "truncate-end",
                    children: [isSelected ? Xe.pointer : " ", " ", setting.label]
                  })
                }), us.jsxs($, {
                  flexGrow: 1,
                  minWidth: 0,
                  children: [groupName === "Advanced" && isSettingOverriddenInJson(setting.id) && us.jsx(v, {
                    color: "warning",
                    dimColor: isDimmed,
                    wrap: "truncate-end",
                    children: "→ settings.json "
                  }), setting.type === "boolean" ? us.jsx(v, {
                    color: isSelected ? "suggestion" : void 0,
                    dimColor: isDimmed,
                    wrap: "truncate-end",
                    children: setting.value.toString()
                  }) : setting.id === "theme" ? us.jsx(v, {
                    color: isSelected ? "suggestion" : void 0,
                    dimColor: isDimmed,
                    wrap: "truncate-end",
                    children: OXp[setting.value.toString()] ?? setting.value.toString()
                  }) : !isGroupedView && setting.id === "notifChannel" ? us.jsx(v, {
                    color: isSelected ? "suggestion" : void 0,
                    dimColor: isDimmed,
                    wrap: "truncate-end",
                    children: us.jsx(LXp, {
                      value: setting.value.toString()
                    })
                  }) : setting.id === "permissionMode" ? us.jsx(v, {
                    color: isSelected ? "suggestion" : void 0,
                    dimColor: isDimmed,
                    wrap: "truncate-end",
                    children: tQ(setting.value)
                  }) : setting.id === "autoUpdatesChannel" && autoUpdaterDisabledReason ? us.jsxs(v, {
                    color: isSelected ? "suggestion" : void 0,
                    dimColor: isDimmed,
                    wrap: "truncate-end",
                    children: ["disabled", " ", us.jsxs(v, {
                      dimColor: !0,
                      children: ["(", g$t(autoUpdaterDisabledReason), ")"]
                    })]
                  }) : us.jsx(v, {
                    color: isSelected ? "suggestion" : void 0,
                    dimColor: isDimmed,
                    wrap: "truncate-end",
                    children: setting.value.toString()
                  }), isGroupedView && setting.type === "managedEnum" && !isExternalIncludesToggle(setting) && (setting.id !== "autoUpdatesChannel" || autoUpdaterDisabledReason !== null || (settingsData?.autoUpdatesChannel ?? "latest") === "latest") && us.jsx(v, {
                    color: isSelected ? "suggestion" : "permission",
                    dimColor: isDimmed,
                    children: ` ${Xe.pointerSmall}`
                  })]
                }, isSelected ? "selected" : "unselected")]
              }), (setting.id === "inputNeededNotifEnabled" || setting.id === "agentPushNotifEnabled") && us.jsx(SAo, {}), showThinkingWarning && setting.id === "thinking" && us.jsx($, {
                paddingLeft: 2,
                children: us.jsx(v, {
                  color: "warning",
                  children: "Changing thinking mode mid-conversation will increase latency and may reduce quality."
                })
              })]
            }, setting.id);
          }), scrollOffset + visibleRows < filteredSettings.length && us.jsxs(v, {
            dimColor: !0,
            children: [Xe.arrowDown, " ", filteredSettings.length - scrollOffset - visibleRows, " ", "more below"]
          })]
        })
      }), headerFocused ? us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(at, {
            chord: ["left", "right", "tab"],
            action: "switch",
            format: {
              keyCase: "lower"
            }
          }), us.jsx(at, {
            chord: "down",
            action: "return"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Settings",
            fallback: "Esc",
            description: "close"
          })]
        })
      }) : searchMode ? us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(v, {
            children: "Type to filter"
          }), us.jsx(at, {
            chord: ["enter", "down"],
            action: "select"
          }), us.jsx(at, {
            chord: "up",
            action: "tabs"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Settings",
            fallback: "Esc",
            description: "clear"
          })]
        })
      }) : us.jsx(v, {
        dimColor: !0,
        children: us.jsxs(bn, {
          children: [us.jsx(at, {
            chord: ["enter", "space"],
            action: "change"
          }), us.jsx(dr, {
            action: "settings:search",
            context: "Settings",
            fallback: "/",
            description: "search"
          }), us.jsx(dr, {
            action: "confirm:no",
            context: "Settings",
            fallback: "Esc",
            description: "close"
          })]
        })
      })]
    })
  });
}
/**
 * Renders a human-readable label for a notification channel value, using a
 * React-Compiler memo cache to memoize the JSX for the richer multi-part labels.
 */
function LXp(props: { value: string }) {
  let memoCache = Hfl.c(4),
    {
      value: channelValue
    } = props;
  switch (channelValue) {
    case "auto":
      return "Auto";
    case "iterm2":
      {
        let cached;
        if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) cached = us.jsxs(v, {
          children: ["iTerm2 ", us.jsx(v, {
            dimColor: !0,
            children: "(OSC 9)"
          })]
        }), memoCache[0] = cached;else cached = memoCache[0];
        return cached;
      }
    case "terminal_bell":
      {
        let cached;
        if (memoCache[1] === Symbol.for("react.memo_cache_sentinel")) cached = us.jsxs(v, {
          children: ["Terminal Bell ", us.jsx(v, {
            dimColor: !0,
            children: "(\\a)"
          })]
        }), memoCache[1] = cached;else cached = memoCache[1];
        return cached;
      }
    case "kitty":
      {
        let cached;
        if (memoCache[2] === Symbol.for("react.memo_cache_sentinel")) cached = us.jsxs(v, {
          children: ["Kitty ", us.jsx(v, {
            dimColor: !0,
            children: "(OSC 99)"
          })]
        }), memoCache[2] = cached;else cached = memoCache[2];
        return cached;
      }
    case "ghostty":
      {
        let cached;
        if (memoCache[3] === Symbol.for("react.memo_cache_sentinel")) cached = us.jsxs(v, {
          children: ["Ghostty ", us.jsx(v, {
            dimColor: !0,
            children: "(OSC 777)"
          })]
        }), memoCache[3] = cached;else cached = memoCache[3];
        return cached;
      }
    case "iterm2_with_bell":
      return "iTerm2 w/ Bell";
    case "notifications_disabled":
      return "Disabled";
    default:
      return channelValue;
  }
}
var Hfl, Ifl, jh, us, OXp;
var Dfl = b(() => {
  je();
  ss();
  Zs();
  Pa();
  tr();
  XJe();
  tr();
  mg();
  Gc();
  IA();
  FS();
  cy();
  kt();
  mn();
  FVn();
  uo();
  gTe();
  UVn();
  NAo();
  wml();
  di();
  TS();
  xml();
  Oml();
  ZR();
  ky();
  she();
  Wo();
  uc();
  Is();
  sP();
  SE();
  aue();
  uS();
  br();
  L2();
  lq();
  Ir();
  dn();
  fC();
  B5e();
  x8t();
  bAo();
  oee();
  lo();
  $d();
  lne();
  ui();
  WS();
  DVn();
  kfl();
  AAo();
  Hfl = x(tt(), 1), Ifl = x(et(), 1), jh = x(et(), 1), us = x(oe(), 1);
  OXp = {
    auto: "Auto (match terminal)",
    dark: "Dark mode",
    light: "Light mode",
    "dark-daltonized": "Dark mode (colorblind-friendly)",
    "light-daltonized": "Light mode (colorblind-friendly)",
    "dark-ansi": "Dark mode (ANSI colors only)",
    "light-ansi": "Light mode (ANSI colors only)"
  };
});

export {xfl,LXp,Hfl,Ifl,jh,us,OXp,Dfl};
