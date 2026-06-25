// @ts-nocheck
import {XDe,DVn} from "../telemetry/4533_DVn.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,getRemoteControlAtStartup as sue,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getInitialSettings as Fr,ao,getSettingsForSource as An,br} from "../config/0745_updateSettingsForSource.ts";
import {isFableAvailable as Qoe,modelDisplayString as S2,isOpus1mMergeEnabled as cC,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {kme,T2} from "../../vendor/m1455.ts";
import {pAo,mAo,ZY,gTe} from "../../vendor/m4528.ts";
import {Oa,eO} from "../../vendor/m1456.ts";
import {SWo,p0} from "../../vendor/m236.ts";
import {Tqt,Ggo} from "../../vendor/m4229.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {clearRefusalFallbackModelLatch as vre,setUserMsgOptIn as Gde,lt} from "../session/0132_sent.ts";
import {JDe,w8t} from "../../vendor/m4527.ts";
import {tw,mg} from "../../vendor/m2209.ts";
import {_Ao,x8t} from "../telemetry/4531_agentPushNotifEnabled.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {AHn,Yqi,nj} from "../agent/2746_partialTextChars.ts";
import {He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {$l,vk,v3,xAe,Hf,jNe,WS} from "../api/1453_month.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {O$r,L2} from "../agent/2222_available.ts";
import {PERMISSION_MODES as KP} from "../../vendor/m721.ts";
import {fM,Qje,zP,FS} from "../../vendor/m722.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {transitionPlanAutoMode as tUt,cy} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {Cs,tp} from "../config/2284_loggedTmuxCcDisable.ts";
import {isAgentsFleetEnabled as hD,fC} from "../config/2212_shouldShowLaunchComposer.ts";
import {iDe,B5e} from "../core/4310_inFlight.ts";
import {x5,Pa} from "../../vendor/m720.ts";
import {buildMcpToolName as Vl,ky} from "../agent/2238_explicitlyRequested.ts";
import {J3,she} from "../../vendor/m2272.ts";
import {ORt,LRt} from "../../vendor/m719.ts";
import {TAo,$8e,bAo} from "../../vendor/m4531.ts";
import {$kn,oee} from "../session/2699_oee.ts";
import {Lj,lq} from "../../vendor/m5221.ts";
import {cB,uS} from "../config/3192_path.ts";
import {isAgentSwarmsEnabled as Wa,lb} from "../config/3314_isAgentSwarmsEnabled.ts";
import {getCliTeammateModeOverride as Meo,DEFAULT_TEAMMATE_MODE as yBt,clearCliTeammateModeOverride as Neo,pIe} from "../../vendor/m3312.ts";
import {resetBackendDetection as yqt,sye} from "../../vendor/m4227.ts";
import {isBridgeEnabled as AH,applyRemoteControlToAppState as RAo,pH} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {rA,dn} from "../config/0137_namespace.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {sF,XJe} from "../../vendor/m1297.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
/**
 * Config-panel / theme settings model for the TUI (v2.1.190).
 *
 * Builds the list of toggleable settings shown in /config and the helper
 * callbacks that persist each change to global config / settings data and emit
 * telemetry. Most entries are `{ id, label, value, type, onChange }` rows;
 * `type` is one of "boolean" | "enum" | "managedEnum".
 */

/** Pick the short label when the compact/feature variant is active, else the long one. */
function $ft(longLabel, shortLabel) {
  return XDe() ? shortLabel : longLabel;
}

/** Merge persisted settings over the global config to produce the effective config snapshot. */
function qft() {
  let globalConfig = Ot(),
    settings = Fr();
  return {
    ...globalConfig,
    theme: settings.theme ?? globalConfig.theme,
    editorMode: settings.editorMode ?? globalConfig.editorMode,
    verbose: settings.verbose ?? globalConfig.verbose,
    preferredNotifChannel: settings.preferredNotifChannel ?? globalConfig.preferredNotifChannel,
    autoCompactEnabled: settings.autoCompactEnabled ?? globalConfig.autoCompactEnabled,
    autoScrollEnabled: settings.autoScrollEnabled ?? globalConfig.autoScrollEnabled,
    fileCheckpointingEnabled: settings.fileCheckpointingEnabled ?? globalConfig.fileCheckpointingEnabled,
    showTurnDuration: settings.showTurnDuration ?? globalConfig.showTurnDuration,
    showMessageTimestamps: settings.showMessageTimestamps ?? globalConfig.showMessageTimestamps,
    terminalProgressBarEnabled: settings.terminalProgressBarEnabled ?? globalConfig.terminalProgressBarEnabled,
    todoFeatureEnabled: settings.todoFeatureEnabled ?? globalConfig.todoFeatureEnabled,
    teammateMode: settings.teammateMode ?? globalConfig.teammateMode,
    remoteControlAtStartup: settings.remoteControlAtStartup ?? globalConfig.remoteControlAtStartup,
    autoUploadSessions: settings.autoUploadSessions ?? globalConfig.autoUploadSessions,
    inputNeededNotifEnabled: settings.inputNeededNotifEnabled ?? globalConfig.inputNeededNotifEnabled,
    agentPushNotifEnabled: settings.agentPushNotifEnabled ?? globalConfig.agentPushNotifEnabled
  };
}

/** Build the list of selectable model ids (always leads with "default"; filters fable models when unavailable). */
function Zpl() {
  let fableAvailable = Qoe();
  return ["default", ...kme.filter(modelId => (fableAvailable || !modelId.includes("fable")) && !pAo(modelId) && !mAo(modelId) && Oa(modelId))];
}

/** Coerce a free-form language string to a display name: pass through "default", expand short ISO codes, else title-case. */
function nJp(input: string) {
  let trimmed = input.trim();
  if (!trimmed || trimmed.toLowerCase() === "default") return "default";
  if (trimmed.length <= 3) {
    let lower = trimmed.toLowerCase(),
      code = tJp.get(lower) ?? lower;
    try {
      let displayName = SWo().of(code);
      if (displayName && displayName !== code) return displayName;
    } catch {}
  }
  return trimmed.split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

/** Display label for a teammate default model: undefined → current default, null → leader's model, else the model display string. */
function PVn(model) {
  if (model === void 0) return S2(Tqt());
  if (model === null) return "Default (leader's model)";
  return S2(model);
}

/** Construct the settings model (rows + helper callbacks) for the /config panel. */
function Wft(props) {
  let {
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
  } = props;
  /** Change the main-loop model; emits telemetry, persists, and updates the changes summary. */
  function onChangeMainModelConfig(model) {
    W("tengu_config_model_changed", {
      from_model: mainLoopModel,
      to_model: model
    });
    let isShorthandBlocked = ZY(model),
      saveResult = isShorthandBlocked ? void 0 : ao("userSettings", {
        model: model ?? void 0
      });
    if (vre(), setAppState(prev => ({
      ...prev,
      mainLoopModel: model,
      mainLoopModelForSession: null
    })), setChanges(prev => {
      let summary = S2(model) + (JDe(model, !1, cC()) ? " \xB7 Draws from usage credits" : "") + (isShorthandBlocked ? " \xB7 this session only — /model to set up" : "");
      if ("model" in prev) {
        let {
          model: _omit,
          ...rest
        } = prev;
        return {
          ...rest,
          model: summary
        };
      }
      return {
        ...prev,
        model: summary
      };
    }), saveResult?.error) return {
      error: saveResult.error
    };
  }
  /** Toggle verbose output; persists to config + app state and updates the changes summary. */
  function onChangeVerbose(value) {
    tw("verbose", value), setGlobalConfig(prev => ({
      ...prev,
      verbose: value
    })), setAppState(prev => ({
      ...prev,
      verbose: value
    })), setChanges(prev => {
      if ("verbose" in prev) {
        let {
          verbose: _omit,
          ...rest
        } = prev;
        return rest;
      }
      return {
        ...prev,
        verbose: value
      };
    });
  }
  /** Change the preferred notification channel. */
  function changeNotifChannel(value) {
    tw("preferredNotifChannel", value), setGlobalConfig(prev => ({
      ...prev,
      preferredNotifChannel: value
    }));
  }
  /** Toggle the "push when input needed" notification preference; re-evaluates push state and emits telemetry. */
  function changeInputNeededNotif(value) {
    tw("inputNeededNotifEnabled", value), setGlobalConfig(prev => ({
      ...prev,
      inputNeededNotifEnabled: value
    })), _Ao(), W("tengu_push_notif_pref_changed", {
      key: Ve("inputNeededNotifEnabled"),
      value: String(value)
    });
  }
  /** Toggle the "push when Claude decides" notification preference; re-evaluates push state and emits telemetry. */
  function changeAgentPushNotif(value) {
    tw("agentPushNotifEnabled", value), setGlobalConfig(prev => ({
      ...prev,
      agentPushNotifEnabled: value
    })), _Ao(), W("tengu_push_notif_pref_changed", {
      key: Ve("agentPushNotifEnabled"),
      value: String(value)
    });
  }
  return {
    settings: [{
      id: "autoCompact",
      label: "Auto-compact",
      value: globalConfig.autoCompactEnabled,
      type: "boolean",
      onChange(value) {
        tw("autoCompactEnabled", value), setGlobalConfig(prev => ({
          ...prev,
          autoCompactEnabled: value
        })), W("tengu_auto_compact_setting_changed", {
          enabled: value
        });
      }
    }, ...(AHn() ? [{
      id: "switchModelsOnFlag",
      label: Yqi,
      value: settingsData?.switchModelsOnFlag ?? !0,
      type: "boolean",
      onChange(value) {
        ao("userSettings", {
          switchModelsOnFlag: value
        }), setSettingsData(prev => ({
          ...prev,
          switchModelsOnFlag: value
        })), W("tengu_refusal_fallback_setting_changed", {
          enabled: value
        });
      }
    }] : []), {
      id: "tips",
      label: "Show tips",
      value: settingsData?.spinnerTipsEnabled ?? !0,
      type: "boolean",
      onChange(value) {
        ao("localSettings", {
          spinnerTipsEnabled: value
        }), setSettingsData(prev => ({
          ...prev,
          spinnerTipsEnabled: value
        })), W("tengu_tips_setting_changed", {
          enabled: value
        });
      }
    }, {
      id: "reduceMotion",
      label: "Reduce motion",
      value: settingsData?.prefersReducedMotion ?? !1,
      type: "boolean",
      onChange(value) {
        ao("localSettings", {
          prefersReducedMotion: value
        }), setSettingsData(prev => ({
          ...prev,
          prefersReducedMotion: value
        })), setAppState(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            prefersReducedMotion: value
          }
        })), W("tengu_reduce_motion_setting_changed", {
          enabled: value
        });
      }
    }, {
      id: "thinking",
      label: "Thinking mode",
      value: thinkingEnabled ?? !0,
      type: "boolean",
      onChange(value) {
        setAppState(prev => ({
          ...prev,
          thinkingEnabled: value
        })), ao("userSettings", {
          alwaysThinkingEnabled: value ? void 0 : !1
        }), W("tengu_thinking_toggled", {
          enabled: value
        }), He("thinking_toggle");
      }
    }, ...($l() && vk() ? [{
      id: "fast",
      label: `Fast mode (${v3()})`,
      value: !!isFastMode,
      type: "boolean",
      onChange(value) {
        if (xAe(), ao("userSettings", {
          fastMode: value ? !0 : void 0
        }), value) {
          let needsModelSwap = !Hf(mainLoopModel);
          setAppState(prev => ({
            ...prev,
            ...(needsModelSwap && {
              mainLoopModel: jNe(),
              mainLoopModelForSession: null
            }),
            fastMode: !0
          })), setChanges(prev => ({
            ...prev,
            ...(needsModelSwap && {
              model: jNe()
            }),
            "Fast mode": "ON"
          }));
        } else setAppState(prev => ({
          ...prev,
          fastMode: !1
        })), setChanges(prev => ({
          ...prev,
          "Fast mode": "OFF"
        }));
      }
    }] : []), ...(it("tengu_chomp_inflection", !1) ? [{
      id: "promptSuggestionEnabled",
      label: "Prompt suggestions",
      value: promptSuggestionEnabled,
      type: "boolean",
      onChange(value) {
        setAppState(prev => ({
          ...prev,
          promptSuggestionEnabled: value
        })), ao("userSettings", {
          promptSuggestionEnabled: value ? void 0 : !1
        });
      }
    }] : []), ...(it("tengu_sedge_lantern", !0) ? [{
      id: "recap",
      label: "Session recap",
      value: awaySummaryEnabled,
      type: "boolean",
      onChange(value) {
        setAppState(prev => ({
          ...prev,
          awaySummaryEnabled: value
        })), ao("userSettings", {
          awaySummaryEnabled: value ? void 0 : !1
        }), setSettingsData(prev => ({
          ...prev,
          awaySummaryEnabled: value ? void 0 : !1
        }));
      }
    }] : []), ...[], ...(isFileCheckpointingAvailable ? [{
      id: "checkpoints",
      label: "Rewind code (checkpoints)",
      value: globalConfig.fileCheckpointingEnabled,
      type: "boolean",
      onChange(value) {
        tw("fileCheckpointingEnabled", value), setGlobalConfig(prev => ({
          ...prev,
          fileCheckpointingEnabled: value
        })), W("tengu_file_history_snapshots_setting_changed", {
          enabled: value
        });
      }
    }] : []), ...(workflowsToggleable ? [{
      id: "workflows",
      label: "Dynamic workflows",
      value: settingsData?.disableWorkflows === !0 ? !1 : settingsData?.enableWorkflows ?? O$r(),
      type: "boolean",
      onChange(value) {
        let nextEnable = value === O$r() ? void 0 : value;
        ao("userSettings", {
          enableWorkflows: nextEnable,
          disableWorkflows: void 0
        }), setSettingsData(prev => ({
          ...prev,
          enableWorkflows: nextEnable,
          disableWorkflows: void 0
        })), setChanges(prev => ({
          ...prev,
          workflows: value ? "on" : "off"
        }));
      }
    }, {
      id: "workflowKeywordTriggerEnabled",
      label: "Ultracode keyword trigger",
      value: settingsData?.workflowKeywordTriggerEnabled ?? !0,
      type: "boolean",
      onChange(value) {
        let nextValue = value ? void 0 : !1;
        ao("userSettings", {
          workflowKeywordTriggerEnabled: nextValue
        }), setSettingsData(prev => ({
          ...prev,
          workflowKeywordTriggerEnabled: nextValue
        })), setChanges(prev => ({
          ...prev,
          ultracodeKeywordTrigger: value ? "on" : "off"
        }));
      }
    }] : []), {
      id: "verbose",
      label: $ft("Verbose output", "Verbose"),
      value: verbose,
      type: "boolean",
      onChange: onChangeVerbose
    }, {
      id: "progressBar",
      label: "Terminal progress bar",
      value: globalConfig.terminalProgressBarEnabled,
      type: "boolean",
      onChange(value) {
        tw("terminalProgressBarEnabled", value), setGlobalConfig(prev => ({
          ...prev,
          terminalProgressBarEnabled: value
        })), W("tengu_terminal_progress_bar_setting_changed", {
          enabled: value
        });
      }
    }, ...(it("tengu_terminal_sidebar", !1) ? [{
      id: "showStatusInTerminalTab",
      label: "Show status in terminal tab",
      value: globalConfig.showStatusInTerminalTab ?? !1,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          showStatusInTerminalTab: value
        })), setGlobalConfig(prev => ({
          ...prev,
          showStatusInTerminalTab: value
        })), W("tengu_terminal_tab_status_setting_changed", {
          enabled: value
        });
      }
    }] : []), {
      id: "turnDuration",
      label: "Show turn duration",
      value: globalConfig.showTurnDuration,
      type: "boolean",
      onChange(value) {
        tw("showTurnDuration", value), setGlobalConfig(prev => ({
          ...prev,
          showTurnDuration: value
        })), W("tengu_show_turn_duration_setting_changed", {
          enabled: value
        });
      }
    }, ...(it("tengu_sepia_moth", !1) ? [{
      id: "precomputeCompactionEnabled",
      label: "Precompute compaction",
      value: settingsData?.precomputeCompactionEnabled ?? !0,
      type: "boolean",
      onChange(value) {
        ao("userSettings", {
          precomputeCompactionEnabled: value
        }), setSettingsData(prev => ({
          ...prev,
          precomputeCompactionEnabled: value
        })), W("tengu_precompute_compaction_setting_changed", {
          enabled: value
        });
      }
    }] : []), ...(it("tengu_silk_hinge", !1) ? [{
      id: "timestamps",
      label: "Show message timestamps",
      value: globalConfig.showMessageTimestamps,
      type: "boolean",
      onChange(value) {
        tw("showMessageTimestamps", value), setGlobalConfig(prev => ({
          ...prev,
          showMessageTimestamps: value
        })), setAppState(prev => ({
          ...prev,
          showMessageTimestamps: value
        })), W("tengu_show_message_timestamps_setting_changed", {
          enabled: value
        });
      }
    }] : []), {
      id: "permissionMode",
      label: "Default permission mode",
      value: settingsData?.permissions?.defaultMode || "default",
      options: (() => {
        let leading = ["default", "plan"],
          allModes = KP,
          excluded = ["bypassPermissions"];
        if (!showAutoInDefaultModePicker) excluded.push("auto");
        return [...leading, ...allModes.filter(mode => !leading.includes(mode) && !excluded.includes(mode))];
      })(),
      type: "enum",
      onChange(value) {
        let normalizedMode = fM(value),
          resolvedMode = Qje(normalizedMode) ? zP(normalizedMode) : normalizedMode,
          saveResult = ao("userSettings", {
            permissions: {
              ...An("userSettings")?.permissions,
              defaultMode: resolvedMode
            }
          });
        if (saveResult.error) return A(`Failed to update default permission mode setting: ${saveResult.error.message}`, {
          level: "error"
        }), {
          error: saveResult.error
        };
        setSettingsData(prev => ({
          ...prev,
          permissions: {
            ...prev?.permissions,
            defaultMode: resolvedMode
          }
        })), setChanges(prev => ({
          ...prev,
          permissionMode: value
        }));
      }
    }, {
      id: "worktreeBaseRef",
      label: "Worktree base ref",
      value: settingsData?.worktree?.baseRef ?? "fresh",
      options: ["fresh", "head"],
      type: "enum",
      onChange(value) {
        let baseRef = value,
          saveResult = ao("userSettings", {
            worktree: {
              ...An("userSettings")?.worktree,
              baseRef: baseRef
            }
          });
        if (saveResult.error) return A(`Failed to update worktree.baseRef in user settings: ${saveResult.error.message}`, {
          level: "error"
        }), {
          error: saveResult.error
        };
        setSettingsData(prev => ({
          ...prev,
          worktree: {
            ...prev?.worktree,
            baseRef: baseRef
          }
        })), setChanges(prev => ({
          ...prev,
          worktreeBaseRef: baseRef
        }));
      }
    }, ...(showAutoInDefaultModePicker ? [{
      id: "useAutoModeDuringPlan",
      label: "Use auto mode during plan",
      value: settingsData?.useAutoModeDuringPlan ?? !0,
      type: "boolean",
      onChange(value) {
        ao("userSettings", {
          useAutoModeDuringPlan: value
        }), setSettingsData(prev => ({
          ...prev,
          useAutoModeDuringPlan: value
        })), setAppState(prev => {
          let nextContext = tUt(prev.toolPermissionContext);
          if (nextContext === prev.toolPermissionContext) return prev;
          return {
            ...prev,
            toolPermissionContext: nextContext
          };
        }), setChanges(prev => ({
          ...prev,
          "Use auto mode during plan": value
        }));
      }
    }] : []), {
      id: "gitignore",
      label: "Respect .gitignore in file picker",
      value: globalConfig.respectGitignore,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          respectGitignore: value
        })), setGlobalConfig(prev => ({
          ...prev,
          respectGitignore: value
        })), W("tengu_respect_gitignore_setting_changed", {
          enabled: value
        });
      }
    }, {
      id: "copyFullResponse",
      label: "Skip the /copy picker",
      value: globalConfig.copyFullResponse,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          copyFullResponse: value
        })), setGlobalConfig(prev => ({
          ...prev,
          copyFullResponse: value
        }));
      }
    }, ...(Cs() ? [{
      id: "copyOnSelect",
      label: "Copy on select",
      value: globalConfig.copyOnSelect ?? !0,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          copyOnSelect: value
        })), setGlobalConfig(prev => ({
          ...prev,
          copyOnSelect: value
        }));
      }
    }, {
      id: "autoScroll",
      label: $ft("Auto-scroll", "Auto-scroll output"),
      value: globalConfig.autoScrollEnabled,
      type: "boolean",
      onChange(value) {
        tw("autoScrollEnabled", value), setGlobalConfig(prev => ({
          ...prev,
          autoScrollEnabled: value
        }));
      }
    }] : []), ...(XDe() ? hD() || iDe() ? [{
      id: "agentsView",
      label: "Agents view",
      value: iDe() && (globalConfig.leftArrowOpensAgents ?? !0) || hD() && (globalConfig.defaultToAgentsView ?? !1) ? "on" : "off",
      type: "managedEnum",
      onChange() {}
    }] : [] : [...(hD() ? [{
      id: "defaultToAgentsView",
      label: "Open agents view by default",
      value: globalConfig.defaultToAgentsView ?? !1,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          defaultToAgentsView: value
        })), setGlobalConfig(prev => ({
          ...prev,
          defaultToAgentsView: value
        }));
      }
    }] : []), ...(iDe() ? [{
      id: "leftArrowOpensAgents",
      label: `${x5} opens agents`,
      value: globalConfig.leftArrowOpensAgents ?? !0,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          leftArrowOpensAgents: value
        })), setGlobalConfig(prev => ({
          ...prev,
          leftArrowOpensAgents: value
        }));
      }
    }] : [])]), autoUpdaterDisabledReason ? {
      id: "autoUpdatesChannel",
      label: "Auto-update channel",
      value: "disabled",
      type: "managedEnum",
      onChange() {}
    } : {
      id: "autoUpdatesChannel",
      label: "Auto-update channel",
      value: settingsData?.autoUpdatesChannel === "rc" ? "slow" : settingsData?.autoUpdatesChannel ?? "latest",
      type: "managedEnum",
      onChange() {}
    }, {
      id: "theme",
      label: "Theme",
      value: Vl("themes") && J3(themeSetting) ? `${themeSetting} (disabled in safe mode)` : themeSetting,
      type: "managedEnum",
      options: ORt,
      optionsHint: "For custom themes, use /theme.",
      onChange: setTheme
    }, ...(XDe() ? [{
      id: "notifChannel",
      label: "Notifications",
      value: TAo(globalConfig.preferredNotifChannel),
      type: "managedEnum",
      options: [...$8e],
      onChange: changeNotifChannel
    }] : [{
      id: "notifChannel",
      label: "Local notifications",
      value: globalConfig.preferredNotifChannel,
      options: [...$8e],
      type: "enum",
      onChange: changeNotifChannel
    }, ...(pushTogglesVisible ? [...($kn() ? [{
      id: "inputNeededNotifEnabled",
      label: "Push when actions required",
      value: globalConfig.inputNeededNotifEnabled ?? !1,
      type: "boolean",
      onChange: changeInputNeededNotif
    }] : []), {
      id: "agentPushNotifEnabled",
      label: "Push when Claude decides",
      value: globalConfig.agentPushNotifEnabled ?? !1,
      type: "boolean",
      onChange: changeAgentPushNotif
    }] : [])]), {
      id: "outputStyle",
      label: "Output style",
      value: Vl("outputStyles") && !Object.hasOwn(Lj, currentOutputStyle) ? `${currentOutputStyle} (disabled in safe mode)` : currentOutputStyle,
      type: "managedEnum",
      options: Object.keys(Lj),
      optionsHint: "For custom styles, open /config.",
      onChange(value) {
        let saveResult = ao("localSettings", {
          outputStyle: value
        });
        if (setSettingsData(prev => ({
          ...prev,
          outputStyle: value
        })), saveResult?.error) return {
          error: saveResult.error
        };
      }
    }, ...(showDefaultViewPicker ? [{
      id: "defaultView",
      label: "Default view",
      value: settingsData?.defaultView === void 0 ? "default" : String(settingsData.defaultView),
      options: ["transcript", "chat", "default"],
      type: "enum",
      onChange(value) {
        let nextView = value === "default" ? void 0 : value;
        ao("localSettings", {
          defaultView: nextView
        }), setSettingsData(prev => ({
          ...prev,
          defaultView: nextView
        }));
        let isBriefOnly = nextView === "chat";
        setAppState(prev => {
          if (prev.isBriefOnly === isBriefOnly) return prev;
          return {
            ...prev,
            isBriefOnly: isBriefOnly
          };
        }), Gde(isBriefOnly), setChanges(prev => ({
          ...prev,
          "Default view": value
        })), W("tengu_default_view_setting_changed", {
          value: Le(nextView ?? "unset")
        });
      }
    }] : []), {
      id: "language",
      label: "Language",
      value: currentLanguage ?? "Default (English)",
      type: "managedEnum",
      coerce: nJp,
      optionsHint: "Any language name or ISO code (e.g. 'ja'); use 'default' for English.",
      onChange(value) {
        let language = value.toLowerCase() === "default" ? void 0 : value,
          saveResult = ao("userSettings", {
            language: language
          });
        if (setSettingsData(prev => ({
          ...prev,
          language: language
        })), saveResult?.error) return {
          error: saveResult.error
        };
      }
    }, {
      id: "editor",
      label: "Editor mode",
      value: globalConfig.editorMode === "emacs" ? "normal" : globalConfig.editorMode || "normal",
      options: ["normal", "vim"],
      type: "enum",
      onChange(value) {
        tw("editorMode", value), setGlobalConfig(prev => ({
          ...prev,
          editorMode: value
        })), W("tengu_editor_mode_changed", {
          mode: value,
          source: Ve("config_panel")
        });
      }
    }, {
      id: "externalEditorContext",
      label: $ft("Show last response in external editor", "Show responses in IDE"),
      value: globalConfig.externalEditorContext ?? !1,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          externalEditorContext: value
        })), setGlobalConfig(prev => ({
          ...prev,
          externalEditorContext: value
        })), W("tengu_external_editor_context_changed", {
          enabled: value
        });
      }
    }, {
      id: "prStatus",
      label: $ft("Show PR status footer", "Show PR status"),
      value: globalConfig.prStatusFooterEnabled ?? !0,
      type: "boolean",
      onChange(value) {
        hn(prev => {
          if (prev.prStatusFooterEnabled === value) return prev;
          return {
            ...prev,
            prStatusFooterEnabled: value
          };
        }), setGlobalConfig(prev => ({
          ...prev,
          prStatusFooterEnabled: value
        })), W("tengu_pr_status_footer_setting_changed", {
          enabled: value
        });
      }
    }, {
      id: "model",
      label: "Model",
      value: mainLoopModel === null ? "Default (recommended)" : mainLoopModel,
      type: "managedEnum",
      options: Zpl(),
      optionsHint: "For a specific model ID, use /model.",
      onChange(value) {
        let model = value === "default" ? null : value;
        if (ZY(model)) return Pt("model_fable_consent", "config_shorthand_blocked"), {
          error: Error("needs usage-credits consent — run /model first")
        };
        return onChangeMainModelConfig(model);
      }
    }, ...(isConnectedToIde ? [{
      id: "diffTool",
      label: "Diff tool",
      value: globalConfig.diffTool ?? "auto",
      options: ["terminal", "auto"],
      type: "enum",
      onChange(value) {
        hn(prev => ({
          ...prev,
          diffTool: value
        })), setGlobalConfig(prev => ({
          ...prev,
          diffTool: value
        })), W("tengu_diff_tool_changed", {
          tool: value,
          source: Ve("config_panel")
        });
      }
    }] : []), ...(!cB() ? [{
      id: "autoConnectIde",
      label: "Auto-connect to IDE (external terminal)",
      value: globalConfig.autoConnectIde ?? !1,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          autoConnectIde: value
        })), setGlobalConfig(prev => ({
          ...prev,
          autoConnectIde: value
        })), W("tengu_auto_connect_ide_changed", {
          enabled: value,
          source: Ve("config_panel")
        });
      }
    }] : []), ...(cB() ? [{
      id: "autoInstallIdeExtension",
      label: "Auto-install IDE extension",
      value: globalConfig.autoInstallIdeExtension ?? !0,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          autoInstallIdeExtension: value
        })), setGlobalConfig(prev => ({
          ...prev,
          autoInstallIdeExtension: value
        })), W("tengu_auto_install_ide_extension_changed", {
          enabled: value,
          source: Ve("config_panel")
        });
      }
    }] : []), {
      id: "chrome",
      label: $ft("Claude in Chrome enabled by default", "Claude in Chrome"),
      value: globalConfig.claudeInChromeDefaultEnabled ?? !1,
      type: "boolean",
      onChange(value) {
        hn(prev => ({
          ...prev,
          claudeInChromeDefaultEnabled: value
        })), setGlobalConfig(prev => ({
          ...prev,
          claudeInChromeDefaultEnabled: value
        })), W("tengu_claude_in_chrome_setting_changed", {
          enabled: value
        });
      }
    }, ...(Wa() ? (() => {
      let overrideMode = Meo();
      return [{
        id: "teammateMode",
        label: overrideMode ? `Teammate mode [overridden: ${overrideMode}]` : "Teammate mode",
        value: globalConfig.teammateMode ?? yBt,
        options: ["auto", "tmux", "iterm2", "in-process"],
        type: "enum",
        onChange(value) {
          if (value !== "auto" && value !== "tmux" && value !== "iterm2" && value !== "in-process") return;
          Neo(value), yqt(), tw("teammateMode", value), setGlobalConfig(prev => ({
            ...prev,
            teammateMode: value
          })), W("tengu_teammate_mode_changed", {
            mode: Le(value)
          });
        }
      }, {
        id: "teammateDefaultModel",
        label: "Default teammate model",
        value: PVn(globalConfig.teammateDefaultModel),
        type: "managedEnum",
        options: Zpl(),
        optionsHint: "For a specific model ID, open /config.",
        onChange(value) {
          let model = value === "default" ? null : value;
          if (ZY(model)) return Pt("model_fable_consent", "config_teammate_blocked"), {
            error: Error("needs usage-credits consent — run /model first")
          };
          hn(prev => prev.teammateDefaultModel === model ? prev : {
            ...prev,
            teammateDefaultModel: model
          }), setGlobalConfig(prev => ({
            ...prev,
            teammateDefaultModel: model
          }));
        }
      }];
    })() : []), ...(AH() ? [{
      id: "remoteControl",
      label: "Enable Remote Control for all sessions",
      value: globalConfig.remoteControlAtStartup === void 0 ? "default" : String(globalConfig.remoteControlAtStartup),
      options: ["true", "false", "default"],
      type: "enum",
      onChange(value) {
        if (value === "default") tw("remoteControlAtStartup", void 0), hn(prev => {
          if (prev.remoteControlAtStartup === void 0) return prev;
          let next = {
            ...prev
          };
          return delete next.remoteControlAtStartup, next;
        }), setGlobalConfig(prev => ({
          ...prev,
          remoteControlAtStartup: void 0
        }));else {
          let enabled = value === "true";
          tw("remoteControlAtStartup", enabled), setGlobalConfig(prev => ({
            ...prev,
            remoteControlAtStartup: enabled
          }));
        }
        let startupValue = sue();
        setAppState(prev => RAo(prev, startupValue));
      }
    }] : []), ...[], ...(AH(), []), ...[], ...(shouldShowExternalIncludesToggle ? [{
      id: "showExternalIncludesDialog",
      label: $ft("External CLAUDE.md includes", "External CLAUDE.md files"),
      value: externalIncludesApproved ? "true" : "false",
      type: "managedEnum",
      onChange() {}
    }] : []), ...(process.env.ANTHROPIC_API_KEY && !rA() ? [{
      id: "apiKey",
      consentGated: !0,
      label: CAo.createElement(v, null, "Use custom API key: ", CAo.createElement(v, {
        bold: !0
      }, sF(process.env.ANTHROPIC_API_KEY))),
      searchText: "Use custom API key",
      value: Boolean(process.env.ANTHROPIC_API_KEY && globalConfig.customApiKeyResponses?.approved?.includes(sF(process.env.ANTHROPIC_API_KEY))),
      type: "boolean",
      onChange(value) {
        hn(prev => {
          let next = {
            ...prev
          };
          if (!next.customApiKeyResponses) next.customApiKeyResponses = {
            approved: [],
            rejected: []
          };
          if (!next.customApiKeyResponses.approved) next.customApiKeyResponses = {
            ...next.customApiKeyResponses,
            approved: []
          };
          if (!next.customApiKeyResponses.rejected) next.customApiKeyResponses = {
            ...next.customApiKeyResponses,
            rejected: []
          };
          if (process.env.ANTHROPIC_API_KEY) {
            let keyHash = sF(process.env.ANTHROPIC_API_KEY);
            if (value) next.customApiKeyResponses = {
              ...next.customApiKeyResponses,
              approved: [...(next.customApiKeyResponses.approved ?? []).filter(entry => entry !== keyHash), keyHash],
              rejected: (next.customApiKeyResponses.rejected ?? []).filter(entry => entry !== keyHash)
            };else next.customApiKeyResponses = {
              ...next.customApiKeyResponses,
              approved: (next.customApiKeyResponses.approved ?? []).filter(entry => entry !== keyHash),
              rejected: [...(next.customApiKeyResponses.rejected ?? []).filter(entry => entry !== keyHash), keyHash]
            };
          }
          return next;
        }), setGlobalConfig(qft());
      }
    }] : [])],
    helpers: {
      onChangeMainModelConfig: onChangeMainModelConfig,
      onChangeVerbose: onChangeVerbose,
      changeNotifChannel: changeNotifChannel,
      changeInputNeededNotif: changeInputNeededNotif,
      changeAgentPushNotif: changeAgentPushNotif
    }
  };
}
var CAo,
  tJp,
  EAo = () => {},
  eml;
var AAo = b(() => {
  je();
  tr();
  XJe();
  mg();
  FS();
  cy();
  qe();
  kt();
  mn();
  pH();
  gTe();
  T2();
  eO();
  Ro();
  w8t();
  ky();
  she();
  LRt();
  p0();
  uS();
  br();
  L2();
  lt();
  nj();
  lq();
  dn();
  jn();
  fC();
  B5e();
  x8t();
  bAo();
  oee();
  lb();
  pIe();
  sye();
  Ggo();
  WS();
  tp();
  DVn();
  Pa();
  CAo = x(et(), 1);
  tJp = new Map([["jp", "ja"], ["kr", "ko"], ["cn", "zh"], ["tw", "zh-Hant"]]);
  eml = {
    setGlobalConfig: EAo,
    setSettingsData: EAo,
    setChanges: EAo
  };
});

export {$ft,qft,Zpl,nJp,PVn,Wft,CAo,tJp,EAo,eml,AAo};
