// @ts-nocheck
import {tDe,f8n} from "../telemetry/4513_f8n.ts";
import {getGlobalConfig,saveGlobalConfig,getRemoteControlAtStartup,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getInitialSettings,updateSettingsForSource,getSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {isFableAvailable,modelDisplayString,isOpus1mMergeEnabled,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {bme,X2} from "../../vendor/m1450.ts";
import {Tyo,Syo,fJ,z_e} from "../../vendor/m4507.ts";
import {isModelAllowed,MO} from "../../vendor/m1451.ts";
import {v3o,KI} from "../../vendor/m234.ts";
import {t3t,zdo} from "../../vendor/m4211.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {clearRefusalFallbackModelLatch,setUserMsgOptIn,lt} from "../session/0131_sent.ts";
import {eDe,e6t} from "../../vendor/m4505.ts";
import {KR,Ug} from "../../vendor/m2264.ts";
import {Cyo,s6t} from "../telemetry/4511_agentPushNotifEnabled.ts";
import {Qe,fromEnum} from "../../vendor/m5.ts";
import {Nwn,sUi,xz} from "../agent/2734_partialTextChars.ts";
import {Ie,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {uc,dk,l4,zEe,vA,eNe,tE} from "../api/1448_month.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {oBr,R4} from "../agent/2214_available.ts";
import {PERMISSION_MODES} from "../../vendor/m716.ts";
import {t1,eKe,xO,eC} from "../../vendor/m717.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {transitionPlanAutoMode,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {Ms,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {isAgentsFleetEnabled,bv} from "../config/2204_shouldShowLaunchComposer.ts";
import {AJ,Bpt} from "../../vendor/m4508.ts";
import {A8,sl} from "../../vendor/m715.ts";
import {hc,Iy} from "../agent/2230_explicitlyRequested.ts";
import {k4,zfe} from "../../vendor/m2263.ts";
import {aEt,lEt} from "../../vendor/m714.ts";
import {wyo,mje,xyo} from "../../vendor/m4511.ts";
import {Qvn,aee} from "../session/2687_aee.ts";
import {sY,Vq} from "../../vendor/m5187.ts";
import {FF,ab} from "../config/3178_path.ts";
import {isAgentSwarmsEnabled,cb} from "../config/3298_isAgentSwarmsEnabled.ts";
import {getCliTeammateModeOverride,DEFAULT_TEAMMATE_MODE,clearCliTeammateModeOverride,vke} from "../../vendor/m3296.ts";
import {isBridgeEnabled,applyRemoteControlToAppState,Vk} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {YC,sn} from "../config/0047_namespace.ts";
import {Text} from "../../vendor/m2423.ts";
import {MB,eYe} from "../../vendor/m1292.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
function Upt(e, t) {
  return tDe() ? t : e;
}
function $pt() {
  let e = getGlobalConfig(),
    t = getInitialSettings();
  return {
    ...e,
    theme: t.theme ?? e.theme,
    editorMode: t.editorMode ?? e.editorMode,
    verbose: t.verbose ?? e.verbose,
    preferredNotifChannel: t.preferredNotifChannel ?? e.preferredNotifChannel,
    autoCompactEnabled: t.autoCompactEnabled ?? e.autoCompactEnabled,
    autoScrollEnabled: t.autoScrollEnabled ?? e.autoScrollEnabled,
    fileCheckpointingEnabled: t.fileCheckpointingEnabled ?? e.fileCheckpointingEnabled,
    showTurnDuration: t.showTurnDuration ?? e.showTurnDuration,
    showMessageTimestamps: t.showMessageTimestamps ?? e.showMessageTimestamps,
    terminalProgressBarEnabled: t.terminalProgressBarEnabled ?? e.terminalProgressBarEnabled,
    todoFeatureEnabled: t.todoFeatureEnabled ?? e.todoFeatureEnabled,
    teammateMode: t.teammateMode ?? e.teammateMode,
    remoteControlAtStartup: t.remoteControlAtStartup ?? e.remoteControlAtStartup,
    autoUploadSessions: t.autoUploadSessions ?? e.autoUploadSessions,
    inputNeededNotifEnabled: t.inputNeededNotifEnabled ?? e.inputNeededNotifEnabled,
    agentPushNotifEnabled: t.agentPushNotifEnabled ?? e.agentPushNotifEnabled
  };
}
function dil() {
  let e = isFableAvailable();
  return ["default", ...bme.filter(t => (e || !t.includes("fable")) && !Tyo(t) && !Syo(t) && isModelAllowed(t))];
}
function S8p(e) {
  let t = e.trim();
  if (!t || t.toLowerCase() === "default") return "default";
  if (t.length <= 3) {
    let n = t.toLowerCase(),
      r = T8p.get(n) ?? n;
    try {
      let o = v3o().of(r);
      if (o && o !== r) return o;
    } catch {}
  }
  return t.split(/\s+/).map(n => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(" ");
}
function A8n(e) {
  if (e === void 0) return modelDisplayString(t3t());
  if (e === null) return "Default (leader's model)";
  return modelDisplayString(e);
}
function qpt(e) {
  let {
    globalConfig: t,
    settingsData: n,
    themeSetting: r,
    currentOutputStyle: o,
    currentLanguage: s,
    externalIncludesApproved: i,
    thinkingEnabled: a,
    verbose: l,
    mainLoopModel: c,
    isFastMode: u,
    promptSuggestionEnabled: d,
    awaySummaryEnabled: p,
    showAutoInDefaultModePicker: m,
    showDefaultViewPicker: f,
    pushTogglesVisible: A,
    isConnectedToIde: h,
    isFileCheckpointingAvailable: g,
    workflowsToggleable: _,
    shouldShowExternalIncludesToggle: y,
    autoUpdaterDisabledReason: T,
    setAppState: S,
    setTheme: v,
    setGlobalConfig: R,
    setSettingsData: k,
    setChanges: x
  } = e;
  function H(O) {
    logEvent("tengu_config_model_changed", {
      from_model: c,
      to_model: O
    });
    let U = fJ(O),
      W = U ? void 0 : updateSettingsForSource("userSettings", {
        model: O ?? void 0
      });
    if (clearRefusalFallbackModelLatch(), S(G => ({
      ...G,
      mainLoopModel: O,
      mainLoopModelForSession: null
    })), x(G => {
      let V = modelDisplayString(O) + (eDe(O, !1, isOpus1mMergeEnabled()) ? " \xB7 Draws from usage credits" : "") + (U ? " \xB7 this session only \u2014 /model to set up" : "");
      if ("model" in G) {
        let {
          model: Q,
          ...K
        } = G;
        return {
          ...K,
          model: V
        };
      }
      return {
        ...G,
        model: V
      };
    }), W?.error) return {
      error: W.error
    };
  }
  function I(O) {
    KR("verbose", O), R($ => ({
      ...$,
      verbose: O
    })), S($ => ({
      ...$,
      verbose: O
    })), x($ => {
      if ("verbose" in $) {
        let {
          verbose: U,
          ...W
        } = $;
        return W;
      }
      return {
        ...$,
        verbose: O
      };
    });
  }
  function P(O) {
    KR("preferredNotifChannel", O), R($ => ({
      ...$,
      preferredNotifChannel: O
    }));
  }
  function L(O) {
    KR("inputNeededNotifEnabled", O), R($ => ({
      ...$,
      inputNeededNotifEnabled: O
    })), Cyo(), logEvent("tengu_push_notif_pref_changed", {
      key: Qe("inputNeededNotifEnabled"),
      value: String(O)
    });
  }
  function D(O) {
    KR("agentPushNotifEnabled", O), R($ => ({
      ...$,
      agentPushNotifEnabled: O
    })), Cyo(), logEvent("tengu_push_notif_pref_changed", {
      key: Qe("agentPushNotifEnabled"),
      value: String(O)
    });
  }
  return {
    settings: [{
      id: "autoCompact",
      label: "Auto-compact",
      value: t.autoCompactEnabled,
      type: "boolean",
      onChange(O) {
        KR("autoCompactEnabled", O), R($ => ({
          ...$,
          autoCompactEnabled: O
        })), logEvent("tengu_auto_compact_setting_changed", {
          enabled: O
        });
      }
    }, ...(Nwn() ? [{
      id: "switchModelsOnFlag",
      label: sUi,
      value: n?.switchModelsOnFlag ?? !0,
      type: "boolean",
      onChange(O) {
        updateSettingsForSource("userSettings", {
          switchModelsOnFlag: O
        }), k($ => ({
          ...$,
          switchModelsOnFlag: O
        })), logEvent("tengu_refusal_fallback_setting_changed", {
          enabled: O
        });
      }
    }] : []), {
      id: "tips",
      label: "Show tips",
      value: n?.spinnerTipsEnabled ?? !0,
      type: "boolean",
      onChange(O) {
        updateSettingsForSource("localSettings", {
          spinnerTipsEnabled: O
        }), k($ => ({
          ...$,
          spinnerTipsEnabled: O
        })), logEvent("tengu_tips_setting_changed", {
          enabled: O
        });
      }
    }, {
      id: "reduceMotion",
      label: "Reduce motion",
      value: n?.prefersReducedMotion ?? !1,
      type: "boolean",
      onChange(O) {
        updateSettingsForSource("localSettings", {
          prefersReducedMotion: O
        }), k($ => ({
          ...$,
          prefersReducedMotion: O
        })), S($ => ({
          ...$,
          settings: {
            ...$.settings,
            prefersReducedMotion: O
          }
        })), logEvent("tengu_reduce_motion_setting_changed", {
          enabled: O
        });
      }
    }, {
      id: "thinking",
      label: "Thinking mode",
      value: a ?? !0,
      type: "boolean",
      onChange(O) {
        S($ => ({
          ...$,
          thinkingEnabled: O
        })), updateSettingsForSource("userSettings", {
          alwaysThinkingEnabled: O ? void 0 : !1
        }), logEvent("tengu_thinking_toggled", {
          enabled: O
        }), Ie("thinking_toggle");
      }
    }, ...(uc() && dk() ? [{
      id: "fast",
      label: `Fast mode (${l4()})`,
      value: !!u,
      type: "boolean",
      onChange(O) {
        if (zEe(), updateSettingsForSource("userSettings", {
          fastMode: O ? !0 : void 0
        }), O) {
          let $ = !vA(c);
          S(U => ({
            ...U,
            ...($ && {
              mainLoopModel: eNe(),
              mainLoopModelForSession: null
            }),
            fastMode: !0
          })), x(U => ({
            ...U,
            ...($ && {
              model: eNe()
            }),
            "Fast mode": "ON"
          }));
        } else S($ => ({
          ...$,
          fastMode: !1
        })), x($ => ({
          ...$,
          "Fast mode": "OFF"
        }));
      }
    }] : []), ...(getFeatureValue_CACHED_MAY_BE_STALE("tengu_chomp_inflection", !1) ? [{
      id: "promptSuggestionEnabled",
      label: "Prompt suggestions",
      value: d,
      type: "boolean",
      onChange(O) {
        S($ => ({
          ...$,
          promptSuggestionEnabled: O
        })), updateSettingsForSource("userSettings", {
          promptSuggestionEnabled: O ? void 0 : !1
        });
      }
    }] : []), ...(getFeatureValue_CACHED_MAY_BE_STALE("tengu_sedge_lantern", !0) ? [{
      id: "recap",
      label: "Session recap",
      value: p,
      type: "boolean",
      onChange(O) {
        S($ => ({
          ...$,
          awaySummaryEnabled: O
        })), updateSettingsForSource("userSettings", {
          awaySummaryEnabled: O ? void 0 : !1
        }), k($ => ({
          ...$,
          awaySummaryEnabled: O ? void 0 : !1
        }));
      }
    }] : []), ...[], ...(g ? [{
      id: "checkpoints",
      label: "Rewind code (checkpoints)",
      value: t.fileCheckpointingEnabled,
      type: "boolean",
      onChange(O) {
        KR("fileCheckpointingEnabled", O), R($ => ({
          ...$,
          fileCheckpointingEnabled: O
        })), logEvent("tengu_file_history_snapshots_setting_changed", {
          enabled: O
        });
      }
    }] : []), ...(_ ? [{
      id: "workflows",
      label: "Dynamic workflows",
      value: n?.disableWorkflows === !0 ? !1 : n?.enableWorkflows ?? oBr(),
      type: "boolean",
      onChange(O) {
        let $ = O === oBr() ? void 0 : O;
        updateSettingsForSource("userSettings", {
          enableWorkflows: $,
          disableWorkflows: void 0
        }), k(U => ({
          ...U,
          enableWorkflows: $,
          disableWorkflows: void 0
        })), x(U => ({
          ...U,
          workflows: O ? "on" : "off"
        }));
      }
    }, {
      id: "workflowKeywordTriggerEnabled",
      label: "Ultracode keyword trigger",
      value: n?.workflowKeywordTriggerEnabled ?? !0,
      type: "boolean",
      onChange(O) {
        let $ = O ? void 0 : !1;
        updateSettingsForSource("userSettings", {
          workflowKeywordTriggerEnabled: $
        }), k(U => ({
          ...U,
          workflowKeywordTriggerEnabled: $
        })), x(U => ({
          ...U,
          ultracodeKeywordTrigger: O ? "on" : "off"
        }));
      }
    }] : []), {
      id: "verbose",
      label: Upt("Verbose output", "Verbose"),
      value: l,
      type: "boolean",
      onChange: I
    }, {
      id: "progressBar",
      label: "Terminal progress bar",
      value: t.terminalProgressBarEnabled,
      type: "boolean",
      onChange(O) {
        KR("terminalProgressBarEnabled", O), R($ => ({
          ...$,
          terminalProgressBarEnabled: O
        })), logEvent("tengu_terminal_progress_bar_setting_changed", {
          enabled: O
        });
      }
    }, ...(getFeatureValue_CACHED_MAY_BE_STALE("tengu_terminal_sidebar", !1) ? [{
      id: "showStatusInTerminalTab",
      label: "Show status in terminal tab",
      value: t.showStatusInTerminalTab ?? !1,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          showStatusInTerminalTab: O
        })), R($ => ({
          ...$,
          showStatusInTerminalTab: O
        })), logEvent("tengu_terminal_tab_status_setting_changed", {
          enabled: O
        });
      }
    }] : []), {
      id: "turnDuration",
      label: "Show turn duration",
      value: t.showTurnDuration,
      type: "boolean",
      onChange(O) {
        KR("showTurnDuration", O), R($ => ({
          ...$,
          showTurnDuration: O
        })), logEvent("tengu_show_turn_duration_setting_changed", {
          enabled: O
        });
      }
    }, ...(getFeatureValue_CACHED_MAY_BE_STALE("tengu_sepia_moth", !1) ? [{
      id: "precomputeCompactionEnabled",
      label: "Precompute compaction",
      value: n?.precomputeCompactionEnabled ?? !0,
      type: "boolean",
      onChange(O) {
        updateSettingsForSource("userSettings", {
          precomputeCompactionEnabled: O
        }), k($ => ({
          ...$,
          precomputeCompactionEnabled: O
        })), logEvent("tengu_precompute_compaction_setting_changed", {
          enabled: O
        });
      }
    }] : []), ...(getFeatureValue_CACHED_MAY_BE_STALE("tengu_silk_hinge", !1) ? [{
      id: "timestamps",
      label: "Show message timestamps",
      value: t.showMessageTimestamps,
      type: "boolean",
      onChange(O) {
        KR("showMessageTimestamps", O), R($ => ({
          ...$,
          showMessageTimestamps: O
        })), S($ => ({
          ...$,
          showMessageTimestamps: O
        })), logEvent("tengu_show_message_timestamps_setting_changed", {
          enabled: O
        });
      }
    }] : []), {
      id: "permissionMode",
      label: "Default permission mode",
      value: n?.permissions?.defaultMode || "default",
      options: (() => {
        let O = ["default", "plan"],
          $ = PERMISSION_MODES,
          U = ["bypassPermissions"];
        if (!m) U.push("auto");
        return [...O, ...$.filter(W => !O.includes(W) && !U.includes(W))];
      })(),
      type: "enum",
      onChange(O) {
        let $ = t1(O),
          U = eKe($) ? xO($) : $,
          W = updateSettingsForSource("userSettings", {
            permissions: {
              ...getSettingsForSource("userSettings")?.permissions,
              defaultMode: U
            }
          });
        if (W.error) return logForDebugging(`Failed to update default permission mode setting: ${W.error.message}`, {
          level: "error"
        }), {
          error: W.error
        };
        k(G => ({
          ...G,
          permissions: {
            ...G?.permissions,
            defaultMode: U
          }
        })), x(G => ({
          ...G,
          permissionMode: O
        }));
      }
    }, {
      id: "worktreeBaseRef",
      label: "Worktree base ref",
      value: n?.worktree?.baseRef ?? "fresh",
      options: ["fresh", "head"],
      type: "enum",
      onChange(O) {
        let $ = O,
          U = updateSettingsForSource("userSettings", {
            worktree: {
              ...getSettingsForSource("userSettings")?.worktree,
              baseRef: $
            }
          });
        if (U.error) return logForDebugging(`Failed to update worktree.baseRef in user settings: ${U.error.message}`, {
          level: "error"
        }), {
          error: U.error
        };
        k(W => ({
          ...W,
          worktree: {
            ...W?.worktree,
            baseRef: $
          }
        })), x(W => ({
          ...W,
          worktreeBaseRef: $
        }));
      }
    }, ...(m ? [{
      id: "useAutoModeDuringPlan",
      label: "Use auto mode during plan",
      value: n?.useAutoModeDuringPlan ?? !0,
      type: "boolean",
      onChange(O) {
        updateSettingsForSource("userSettings", {
          useAutoModeDuringPlan: O
        }), k($ => ({
          ...$,
          useAutoModeDuringPlan: O
        })), S($ => {
          let U = transitionPlanAutoMode($.toolPermissionContext);
          if (U === $.toolPermissionContext) return $;
          return {
            ...$,
            toolPermissionContext: U
          };
        }), x($ => ({
          ...$,
          "Use auto mode during plan": O
        }));
      }
    }] : []), {
      id: "gitignore",
      label: "Respect .gitignore in file picker",
      value: t.respectGitignore,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          respectGitignore: O
        })), R($ => ({
          ...$,
          respectGitignore: O
        })), logEvent("tengu_respect_gitignore_setting_changed", {
          enabled: O
        });
      }
    }, {
      id: "copyFullResponse",
      label: "Skip the /copy picker",
      value: t.copyFullResponse,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          copyFullResponse: O
        })), R($ => ({
          ...$,
          copyFullResponse: O
        }));
      }
    }, ...(Ms() ? [{
      id: "copyOnSelect",
      label: "Copy on select",
      value: t.copyOnSelect ?? !0,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          copyOnSelect: O
        })), R($ => ({
          ...$,
          copyOnSelect: O
        }));
      }
    }, {
      id: "autoScroll",
      label: Upt("Auto-scroll", "Auto-scroll output"),
      value: t.autoScrollEnabled,
      type: "boolean",
      onChange(O) {
        KR("autoScrollEnabled", O), R($ => ({
          ...$,
          autoScrollEnabled: O
        }));
      }
    }] : []), ...(tDe() ? isAgentsFleetEnabled() || AJ() ? [{
      id: "agentsView",
      label: "Agents view",
      value: AJ() && (t.leftArrowOpensAgents ?? !0) || isAgentsFleetEnabled() && (t.defaultToAgentsView ?? !1) ? "on" : "off",
      type: "managedEnum",
      onChange() {}
    }] : [] : [...(isAgentsFleetEnabled() ? [{
      id: "defaultToAgentsView",
      label: "Open agents view by default",
      value: t.defaultToAgentsView ?? !1,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          defaultToAgentsView: O
        })), R($ => ({
          ...$,
          defaultToAgentsView: O
        }));
      }
    }] : []), ...(AJ() ? [{
      id: "leftArrowOpensAgents",
      label: `${A8} opens agents`,
      value: t.leftArrowOpensAgents ?? !0,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          leftArrowOpensAgents: O
        })), R($ => ({
          ...$,
          leftArrowOpensAgents: O
        }));
      }
    }] : [])]), T ? {
      id: "autoUpdatesChannel",
      label: "Auto-update channel",
      value: "disabled",
      type: "managedEnum",
      onChange() {}
    } : {
      id: "autoUpdatesChannel",
      label: "Auto-update channel",
      value: n?.autoUpdatesChannel === "rc" ? "slow" : n?.autoUpdatesChannel ?? "latest",
      type: "managedEnum",
      onChange() {}
    }, {
      id: "theme",
      label: "Theme",
      value: hc("themes") && k4(r) ? `${r} (disabled in safe mode)` : r,
      type: "managedEnum",
      options: aEt,
      optionsHint: "For custom themes, use /theme.",
      onChange: v
    }, ...(tDe() ? [{
      id: "notifChannel",
      label: "Notifications",
      value: wyo(t.preferredNotifChannel),
      type: "managedEnum",
      options: [...mje],
      onChange: P
    }] : [{
      id: "notifChannel",
      label: "Local notifications",
      value: t.preferredNotifChannel,
      options: [...mje],
      type: "enum",
      onChange: P
    }, ...(A ? [...(Qvn() ? [{
      id: "inputNeededNotifEnabled",
      label: "Push when actions required",
      value: t.inputNeededNotifEnabled ?? !1,
      type: "boolean",
      onChange: L
    }] : []), {
      id: "agentPushNotifEnabled",
      label: "Push when Claude decides",
      value: t.agentPushNotifEnabled ?? !1,
      type: "boolean",
      onChange: D
    }] : [])]), {
      id: "outputStyle",
      label: "Output style",
      value: hc("outputStyles") && !Object.hasOwn(sY, o) ? `${o} (disabled in safe mode)` : o,
      type: "managedEnum",
      options: Object.keys(sY),
      optionsHint: "For custom styles, open /config.",
      onChange(O) {
        let $ = updateSettingsForSource("localSettings", {
          outputStyle: O
        });
        if (k(U => ({
          ...U,
          outputStyle: O
        })), $?.error) return {
          error: $.error
        };
      }
    }, ...(f ? [{
      id: "defaultView",
      label: "Default view",
      value: n?.defaultView === void 0 ? "default" : String(n.defaultView),
      options: ["transcript", "chat", "default"],
      type: "enum",
      onChange(O) {
        let $ = O === "default" ? void 0 : O;
        updateSettingsForSource("localSettings", {
          defaultView: $
        }), k(W => ({
          ...W,
          defaultView: $
        }));
        let U = $ === "chat";
        S(W => {
          if (W.isBriefOnly === U) return W;
          return {
            ...W,
            isBriefOnly: U
          };
        }), setUserMsgOptIn(U), x(W => ({
          ...W,
          "Default view": O
        })), logEvent("tengu_default_view_setting_changed", {
          value: fromEnum($ ?? "unset")
        });
      }
    }] : []), {
      id: "language",
      label: "Language",
      value: s ?? "Default (English)",
      type: "managedEnum",
      coerce: S8p,
      optionsHint: "Any language name or ISO code (e.g. 'ja'); use 'default' for English.",
      onChange(O) {
        let $ = O.toLowerCase() === "default" ? void 0 : O,
          U = updateSettingsForSource("userSettings", {
            language: $
          });
        if (k(W => ({
          ...W,
          language: $
        })), U?.error) return {
          error: U.error
        };
      }
    }, {
      id: "editor",
      label: "Editor mode",
      value: t.editorMode === "emacs" ? "normal" : t.editorMode || "normal",
      options: ["normal", "vim"],
      type: "enum",
      onChange(O) {
        KR("editorMode", O), R($ => ({
          ...$,
          editorMode: O
        })), logEvent("tengu_editor_mode_changed", {
          mode: O,
          source: Qe("config_panel")
        });
      }
    }, {
      id: "externalEditorContext",
      label: Upt("Show last response in external editor", "Show responses in IDE"),
      value: t.externalEditorContext ?? !1,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          externalEditorContext: O
        })), R($ => ({
          ...$,
          externalEditorContext: O
        })), logEvent("tengu_external_editor_context_changed", {
          enabled: O
        });
      }
    }, {
      id: "prStatus",
      label: Upt("Show PR status footer", "Show PR status"),
      value: t.prStatusFooterEnabled ?? !0,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => {
          if ($.prStatusFooterEnabled === O) return $;
          return {
            ...$,
            prStatusFooterEnabled: O
          };
        }), R($ => ({
          ...$,
          prStatusFooterEnabled: O
        })), logEvent("tengu_pr_status_footer_setting_changed", {
          enabled: O
        });
      }
    }, {
      id: "model",
      label: "Model",
      value: c === null ? "Default (recommended)" : c,
      type: "managedEnum",
      options: dil(),
      optionsHint: "For a specific model ID, use /model.",
      onChange(O) {
        let $ = O === "default" ? null : O;
        if (fJ($)) return isTmuxControlMode("model_fable_consent", "config_shorthand_blocked"), {
          error: Error("needs usage-credits consent \u2014 run /model first")
        };
        return H($);
      }
    }, ...(h ? [{
      id: "diffTool",
      label: "Diff tool",
      value: t.diffTool ?? "auto",
      options: ["terminal", "auto"],
      type: "enum",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          diffTool: O
        })), R($ => ({
          ...$,
          diffTool: O
        })), logEvent("tengu_diff_tool_changed", {
          tool: O,
          source: Qe("config_panel")
        });
      }
    }] : []), ...(!FF() ? [{
      id: "autoConnectIde",
      label: "Auto-connect to IDE (external terminal)",
      value: t.autoConnectIde ?? !1,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          autoConnectIde: O
        })), R($ => ({
          ...$,
          autoConnectIde: O
        })), logEvent("tengu_auto_connect_ide_changed", {
          enabled: O,
          source: Qe("config_panel")
        });
      }
    }] : []), ...(FF() ? [{
      id: "autoInstallIdeExtension",
      label: "Auto-install IDE extension",
      value: t.autoInstallIdeExtension ?? !0,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          autoInstallIdeExtension: O
        })), R($ => ({
          ...$,
          autoInstallIdeExtension: O
        })), logEvent("tengu_auto_install_ide_extension_changed", {
          enabled: O,
          source: Qe("config_panel")
        });
      }
    }] : []), {
      id: "chrome",
      label: Upt("Claude in Chrome enabled by default", "Claude in Chrome"),
      value: t.claudeInChromeDefaultEnabled ?? !1,
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => ({
          ...$,
          claudeInChromeDefaultEnabled: O
        })), R($ => ({
          ...$,
          claudeInChromeDefaultEnabled: O
        })), logEvent("tengu_claude_in_chrome_setting_changed", {
          enabled: O
        });
      }
    }, ...(isAgentSwarmsEnabled() ? (() => {
      let O = getCliTeammateModeOverride();
      return [{
        id: "teammateMode",
        label: O ? `Teammate mode [overridden: ${O}]` : "Teammate mode",
        value: t.teammateMode ?? DEFAULT_TEAMMATE_MODE,
        options: ["auto", "tmux", "in-process"],
        type: "enum",
        onChange(U) {
          if (U !== "auto" && U !== "tmux" && U !== "in-process") return;
          clearCliTeammateModeOverride(U), KR("teammateMode", U), R(W => ({
            ...W,
            teammateMode: U
          })), logEvent("tengu_teammate_mode_changed", {
            mode: fromEnum(U)
          });
        }
      }, {
        id: "teammateDefaultModel",
        label: "Default teammate model",
        value: A8n(t.teammateDefaultModel),
        type: "managedEnum",
        options: dil(),
        optionsHint: "For a specific model ID, open /config.",
        onChange(U) {
          let W = U === "default" ? null : U;
          if (fJ(W)) return isTmuxControlMode("model_fable_consent", "config_teammate_blocked"), {
            error: Error("needs usage-credits consent \u2014 run /model first")
          };
          saveGlobalConfig(G => G.teammateDefaultModel === W ? G : {
            ...G,
            teammateDefaultModel: W
          }), R(G => ({
            ...G,
            teammateDefaultModel: W
          }));
        }
      }];
    })() : []), ...(isBridgeEnabled() ? [{
      id: "remoteControl",
      label: "Enable Remote Control for all sessions",
      value: t.remoteControlAtStartup === void 0 ? "default" : String(t.remoteControlAtStartup),
      options: ["true", "false", "default"],
      type: "enum",
      onChange(O) {
        if (O === "default") KR("remoteControlAtStartup", void 0), saveGlobalConfig(U => {
          if (U.remoteControlAtStartup === void 0) return U;
          let W = {
            ...U
          };
          return delete W.remoteControlAtStartup, W;
        }), R(U => ({
          ...U,
          remoteControlAtStartup: void 0
        }));else {
          let U = O === "true";
          KR("remoteControlAtStartup", U), R(W => ({
            ...W,
            remoteControlAtStartup: U
          }));
        }
        let $ = getRemoteControlAtStartup();
        S(U => applyRemoteControlToAppState(U, $));
      }
    }] : []), ...[], ...(isBridgeEnabled(), []), ...[], ...(y ? [{
      id: "showExternalIncludesDialog",
      label: Upt("External CLAUDE.md includes", "External CLAUDE.md files"),
      value: i ? "true" : "false",
      type: "managedEnum",
      onChange() {}
    }] : []), ...(process.env.ANTHROPIC_API_KEY && !YC() ? [{
      id: "apiKey",
      consentGated: !0,
      label: Hyo.createElement(Text, null, "Use custom API key: ", Hyo.createElement(Text, {
        bold: !0
      }, MB(process.env.ANTHROPIC_API_KEY))),
      searchText: "Use custom API key",
      value: Boolean(process.env.ANTHROPIC_API_KEY && t.customApiKeyResponses?.approved?.includes(MB(process.env.ANTHROPIC_API_KEY))),
      type: "boolean",
      onChange(O) {
        saveGlobalConfig($ => {
          let U = {
            ...$
          };
          if (!U.customApiKeyResponses) U.customApiKeyResponses = {
            approved: [],
            rejected: []
          };
          if (!U.customApiKeyResponses.approved) U.customApiKeyResponses = {
            ...U.customApiKeyResponses,
            approved: []
          };
          if (!U.customApiKeyResponses.rejected) U.customApiKeyResponses = {
            ...U.customApiKeyResponses,
            rejected: []
          };
          if (process.env.ANTHROPIC_API_KEY) {
            let W = MB(process.env.ANTHROPIC_API_KEY);
            if (O) U.customApiKeyResponses = {
              ...U.customApiKeyResponses,
              approved: [...(U.customApiKeyResponses.approved ?? []).filter(G => G !== W), W],
              rejected: (U.customApiKeyResponses.rejected ?? []).filter(G => G !== W)
            };else U.customApiKeyResponses = {
              ...U.customApiKeyResponses,
              approved: (U.customApiKeyResponses.approved ?? []).filter(G => G !== W),
              rejected: [...(U.customApiKeyResponses.rejected ?? []).filter(G => G !== W), W]
            };
          }
          return U;
        }), R($pt());
      }
    }] : [])],
    helpers: {
      onChangeMainModelConfig: H,
      onChangeVerbose: I,
      changeNotifChannel: P,
      changeInputNeededNotif: L,
      changeAgentPushNotif: D
    }
  };
}
var Hyo,
  T8p,
  kyo = () => {},
  pil;
var Iyo = b(() => {
  ze();
  Qn();
  eYe();
  Ug();
  eC();
  ly();
  qe();
  Ct();
  ln();
  Vk();
  z_e();
  X2();
  MO();
  Mo();
  e6t();
  Iy();
  zfe();
  lEt();
  KI();
  ab();
  yr();
  R4();
  lt();
  xz();
  Vq();
  sn();
  zn();
  bv();
  Bpt();
  s6t();
  xyo();
  aee();
  cb();
  vke();
  zdo();
  tE();
  Pp();
  f8n();
  sl();
  Hyo = M(Te(), 1);
  T8p = new Map([["jp", "ja"], ["kr", "ko"], ["cn", "zh"], ["tw", "zh-Hant"]]);
  pil = {
    setGlobalConfig: kyo,
    setSettingsData: kyo,
    setChanges: kyo
  };
});
export {Upt,$pt,dil,S8p,A8n,qpt,Hyo,T8p,kyo,pil,Iyo};
