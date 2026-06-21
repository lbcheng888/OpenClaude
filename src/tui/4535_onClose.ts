// @ts-nocheck
import {xx,$P} from "../../vendor/m4515.ts";
import {eb,pE} from "../../vendor/m2548.ts";
import {useTheme,useThemeSetting} from "../../vendor/m2274.ts";
import {$pt,qpt,A8n,Iyo} from "./4514_theme.ts";
import {getInitialSettings,updateSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {hN,Vq} from "../../vendor/m5187.ts";
import {getCurrentProjectConfig,getAutoUpdaterDisabledReason,saveGlobalConfig,formatAutoUpdaterDisabledReason,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {useTerminalFocus} from "../../vendor/m2380.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {mt,bo,configProtoStore} from "../../vendor/m2458.ts";
import {uc,vA,dk,tE} from "../api/1448_month.ts";
import {hasAutoModeOptInAnySource,getAutoModeEnabledState,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {L9,nJ} from "../config/4228_shouldToolsListOptInToBrief.ts";
import {ro,b,M} from "../../runtime.ts";
import {iil,s6t} from "../telemetry/4511_agentPushNotifEnabled.ts";
import {oH,gne} from "../../vendor/m4532.ts";
import {j$e,ab} from "../config/3178_path.ts";
import {je} from "../../vendor/m577.ts";
import {bc,Ug} from "../../vendor/m2264.ts";
import {eyn,R4} from "../agent/2214_available.ts";
import {getMemoryFiles,hasExternalClaudeMdIncludes,getExternalClaudeMdIncludes,zw} from "../config/2717_stripHtmlComments.ts";
import {Aae,Qvn,aee} from "../session/2687_aee.ts";
import {ra,Ap} from "../config/0614_Ap.ts";
import {hasStoredOAuthToken,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {tDe,f8n} from "../telemetry/4513_f8n.ts";
import {nal,w8n,Vyo,Zil,Gyo,eal,ral} from "../../vendor/m4533.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Dp} from "../../vendor/m2215.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {YC,KE,sn} from "../config/0047_namespace.ts";
import {MB,eYe} from "../../vendor/m1292.ts";
import {Qe,fromEnum} from "../../vendor/m5.ts";
import {A8,sl} from "../../vendor/m715.ts";
import {Or,Wo,Ts} from "../../vendor/m2542.ts";
import {recordExternalIncludesDecision,ClaudeMdExternalIncludesDialog,jyo} from "./4527_recordExternalIncludesDecision.ts";
import {AJ,Bpt} from "../../vendor/m4508.ts";
import {isAgentsFleetEnabled,bv} from "../config/2204_shouldShowLaunchComposer.ts";
import {Box} from "../../vendor/m2422.ts";
import {jpt,T8n} from "./4523_onThemeSelect.ts";
import {hc,Iy} from "../agent/2230_explicitlyRequested.ts";
import {k4,zfe} from "../../vendor/m2263.ts";
import {Text} from "../../vendor/m2423.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {gje,b8n} from "./4526_initial.ts";
import {fJ,z_e} from "../../vendor/m4507.ts";
import {isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {Uil,$il} from "../../vendor/m4528.ts";
import {jil,Wil} from "../../vendor/m4529.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {et,Ai} from "../../vendor/m2208.ts";
import {pr} from "../../vendor/m2562.ts";
import {Mil,Nil} from "../../vendor/m4527.ts";
import {uil,mje,Ryo,xyo} from "../../vendor/m4511.ts";
import {qP,uue} from "../config/4532_query.ts";
import {oQ,eC} from "../../vendor/m717.ts";
import {ze} from "../../vendor/m2452.ts";
import {Cv} from "../telemetry/2217_names.ts";
import {yb} from "../../vendor/m4521.ts";
import {Lr} from "../../vendor/m578.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function sal({
  onClose: e,
  context: t,
  setTabsHidden: n,
  onIsSearchModeChange: r,
  contentHeight: o
}) {
  let {
      headerFocused: s,
      focusHeader: i
    } = xx(),
    a = eb(),
    [, l] = useTheme(),
    c = useThemeSetting(),
    [u, d] = Wh.useState($pt),
    p = Wh.useRef(u),
    [m, f] = Wh.useState(getInitialSettings()),
    A = Wh.useRef(getInitialSettings()),
    [h, g] = Wh.useState(m?.outputStyle || hN),
    _ = Wh.useRef(h),
    [y, T] = Wh.useState(() => getCurrentProjectConfig().hasClaudeMdExternalIncludesApproved === !0),
    [S, v] = Wh.useState(m?.language),
    R = Wh.useRef(S),
    [k, x] = Wh.useState(0),
    [H, I] = Wh.useState(0),
    [P, L] = Wh.useState(!0),
    D = useTerminalFocus(),
    {
      rows: N,
      columns: O
    } = mr(),
    $ = Math.min(44, Math.max(14, O - 16)),
    U = o ?? Math.min(Math.floor(N * 0.8), 30),
    W = Math.max(5, U - 10),
    G = mt(Yt => Yt.mainLoopModel),
    V = mt(Yt => Yt.verbose),
    Q = mt(Yt => Yt.thinkingEnabled),
    K = mt(Yt => uc() ? Yt.fastMode : !1),
    Y = mt(Yt => Yt.promptSuggestionEnabled),
    J = mt(Yt => Yt.awaySummaryEnabled),
    ee = hasAutoModeOptInAnySource() || getAutoModeEnabledState() === "enabled",
    te = (L9(), ro(nJ)).isBriefEntitled(),
    ne = bo(),
    [re, oe] = Wh.useState({}),
    ce = Wh.useRef(Q);
  Wh.useEffect(() => iil(() => d($pt())), []);
  let [ue, ae] = Wh.useState(!1),
    [he, se] = Wh.useState(null),
    [le, pe] = Wh.useState(0),
    {
      query: de,
      setQuery: _e,
      cursorOffset: fe,
      handleKeyDown: ie,
      handlePaste: Ae
    } = oH({
      isActive: P && he === null && !s,
      onExit: () => L(!1),
      onExitUp: i,
      passthroughCtrlKeys: ["c", "d"]
    }),
    ge = !s;
  Wh.useEffect(() => {
    r(ge);
  }, [ge, r]);
  let Ce = j$e(t.options.mcpClients),
    xe = !je.CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING,
    Re = bc("disableWorkflows", !1),
    Me = bc("enableWorkflows", !1),
    Ke = eyn() && (Re.value !== !0 || Re.source === "userSettings") && (Me.source === "default" || Me.source === "userSettings"),
    He = Wh.use(getMemoryFiles(!0)),
    Ge = hasExternalClaudeMdIncludes(He),
    Ye = getAutoUpdaterDisabledReason(),
    ot = Aae() && !ra() && hasStoredOAuthToken(),
    {
      settings: vt,
      helpers: {
        onChangeMainModelConfig: $e,
        changeNotifChannel: Je,
        changeInputNeededNotif: Rt,
        changeAgentPushNotif: Et
      }
    } = qpt({
      globalConfig: u,
      settingsData: m,
      themeSetting: c,
      currentOutputStyle: h,
      currentLanguage: S,
      externalIncludesApproved: y,
      thinkingEnabled: Q,
      verbose: V,
      mainLoopModel: G,
      isFastMode: K,
      promptSuggestionEnabled: Y,
      awaySummaryEnabled: J,
      showAutoInDefaultModePicker: ee,
      showDefaultViewPicker: te,
      pushTogglesVisible: ot,
      isConnectedToIde: Ce,
      isFileCheckpointingAvailable: xe,
      workflowsToggleable: Ke,
      shouldShowExternalIncludesToggle: Ge,
      autoUpdaterDisabledReason: Ye,
      setAppState: ne,
      setTheme: l,
      setGlobalConfig: d,
      setSettingsData: f,
      setChanges: oe
    }),
    dt = tDe(),
    Dt = Wh.useMemo(() => {
      let Yt = dt ? nal(vt) : vt;
      if (!de) return Yt;
      let ye = de.toLowerCase();
      return Yt.filter(ve => {
        if (ve.id.toLowerCase().includes(ye)) return !0;
        if (("searchText" in ve ? ve.searchText : ve.label).toLowerCase().includes(ye)) return !0;
        if (ve.type === "enum") return ve.options.some(We => We.toLowerCase().includes(ye));
        return !1;
      });
    }, [vt, de, dt]);
  Wh.useEffect(() => {
    if (k >= Dt.length) {
      let Yt = Math.max(0, Dt.length - 1);
      x(Yt), I(Math.max(0, Yt - W + 1));
      return;
    }
    I(Yt => {
      if (k < Yt) return k;
      if (k >= Yt + W) return k - W + 1;
      return Yt;
    });
  }, [Dt.length, k, W]);
  let $t = Wh.useCallback(Yt => {
      I(ye => {
        if (Yt < ye) return Yt;
        if (Yt >= ye + W) return Yt - W + 1;
        return ye;
      });
    }, [W]),
    It = Wh.useCallback(() => {
      if (he !== null) return;
      let Yt = Object.entries(re).map(([We, ft]) => (logEvent("tengu_config_changed", {
          key: We,
          setting: We,
          value: Dp(String(ft))
        }), `Set ${We} to ${_t.bold(ft)}`)),
        ye = YC() ? void 0 : process.env.ANTHROPIC_API_KEY,
        ve = Boolean(ye && p.current.customApiKeyResponses?.approved?.includes(MB(ye))),
        Fe = Boolean(ye && u.customApiKeyResponses?.approved?.includes(MB(ye)));
      if (ve !== Fe) Yt.push(`${Fe ? "Enabled" : "Disabled"} custom API key`), logEvent("tengu_config_changed", {
        key: Qe("env.ANTHROPIC_API_KEY"),
        setting: Qe("env.ANTHROPIC_API_KEY"),
        value: Fe
      });
      if (u.theme !== p.current.theme) Yt.push(`Set theme to ${_t.bold(u.theme)}`);
      if (u.preferredNotifChannel !== p.current.preferredNotifChannel) Yt.push(`Set notifications to ${_t.bold(u.preferredNotifChannel)}`);
      if (h !== _.current) Yt.push(`Set output style to ${_t.bold(h)}`);
      if (S !== R.current) Yt.push(`Set response language to ${_t.bold(S ?? "Default (English)")}`);
      if (u.editorMode !== p.current.editorMode) Yt.push(`Set editor mode to ${_t.bold(u.editorMode || "emacs")}`);
      if (u.diffTool !== p.current.diffTool) Yt.push(`Set diff tool to ${_t.bold(u.diffTool)}`);
      if (u.autoConnectIde !== p.current.autoConnectIde) Yt.push(`${u.autoConnectIde ? "Enabled" : "Disabled"} auto-connect to IDE`);
      if (u.autoInstallIdeExtension !== p.current.autoInstallIdeExtension) Yt.push(`${u.autoInstallIdeExtension ? "Enabled" : "Disabled"} auto-install IDE extension`);
      if (u.autoCompactEnabled !== p.current.autoCompactEnabled) Yt.push(`${u.autoCompactEnabled ? "Enabled" : "Disabled"} auto-compact`);
      if (u.autoScrollEnabled !== p.current.autoScrollEnabled) Yt.push(`${u.autoScrollEnabled ? "Enabled" : "Disabled"} auto-scroll`);
      if (u.respectGitignore !== p.current.respectGitignore) Yt.push(`${u.respectGitignore ? "Enabled" : "Disabled"} respect .gitignore in file picker`);
      if (u.copyFullResponse !== p.current.copyFullResponse) Yt.push(`${u.copyFullResponse ? "Enabled" : "Disabled"} always copy full response`);
      if (u.copyOnSelect !== p.current.copyOnSelect) Yt.push(`${u.copyOnSelect ? "Enabled" : "Disabled"} copy on select`);
      if (u.leftArrowOpensAgents !== p.current.leftArrowOpensAgents) Yt.push(`${u.leftArrowOpensAgents ?? !0 ? "Enabled" : "Disabled"} ${A8} opens agents`);
      if (u.defaultToAgentsView !== p.current.defaultToAgentsView) Yt.push(`${u.defaultToAgentsView ? "Enabled" : "Disabled"} open agents view by default`);
      if (u.terminalProgressBarEnabled !== p.current.terminalProgressBarEnabled) Yt.push(`${u.terminalProgressBarEnabled ? "Enabled" : "Disabled"} terminal progress bar`);
      if (u.showStatusInTerminalTab !== p.current.showStatusInTerminalTab) Yt.push(`${u.showStatusInTerminalTab ? "Enabled" : "Disabled"} terminal tab status`);
      if (u.showTurnDuration !== p.current.showTurnDuration) Yt.push(`${u.showTurnDuration ? "Enabled" : "Disabled"} turn duration`);
      if (u.showMessageTimestamps !== p.current.showMessageTimestamps) Yt.push(`${u.showMessageTimestamps ? "Enabled" : "Disabled"} message timestamps`);
      if (u.remoteControlAtStartup !== p.current.remoteControlAtStartup) {
        let We = u.remoteControlAtStartup === void 0 ? "Reset Remote Control to default" : `${u.remoteControlAtStartup ? "Enabled" : "Disabled"} Remote Control for all sessions`;
        Yt.push(We);
      }
      if (m?.autoUpdatesChannel !== A.current?.autoUpdatesChannel) Yt.push(`Set auto-update channel to ${_t.bold(m?.autoUpdatesChannel === "rc" ? "slow" : m?.autoUpdatesChannel ?? "latest")}`);
      if (Yt.length > 0) e(Yt.join(`
`));else e("Config dialog dismissed", {
        display: "system"
      });
    }, [he, re, u, G, h, S, m?.autoUpdatesChannel, uc() ? m?.fastMode : void 0, e]);
  Or("confirm:no", It, {
    context: "Settings",
    isActive: he === null && !P && !s
  });
  let Zt = Wh.useCallback(Yt => dt && Yt.type === "managedEnum" && Yt.id === "showExternalIncludesDialog" && y, [dt, y]),
    _n = Wh.useCallback(Yt => w8n.find(ye => ye.id === Yt)?.isSet({
      settingsData: m,
      globalConfig: u
    }) ?? !1, [m, u]),
    Nn = Wh.useCallback(() => {
      let Yt = Dt[k];
      if (!Yt || !Yt.onChange) return;
      if (Yt.type === "boolean") {
        let ye = !Yt.value;
        if (Yt.onChange(ye), logEvent("tengu_config_changed", {
          setting: Yt.id,
          value: String(ye)
        }), Yt.id === "thinking") {
          if (ye === ce.current) ae(!1);else if (t.messages.some(Fe => Fe.type === "assistant")) ae(!0);
        }
        return;
      }
      if (Zt(Yt)) {
        recordExternalIncludesDecision(!1, "config_toggle"), T(!1);
        return;
      }
      if (Yt.id === "agentsView") {
        pe(0), se("AgentsView"), n(!0);
        return;
      }
      if (Yt.id === "notifChannel" && Yt.type === "managedEnum") {
        se("Notifications"), n(!0);
        return;
      }
      if (Yt.id === "theme" || Yt.id === "model" || Yt.id === "teammateDefaultModel" || Yt.id === "showExternalIncludesDialog" || Yt.id === "outputStyle" || Yt.id === "language") switch (Yt.id) {
        case "theme":
          se("Theme"), n(!0);
          return;
        case "model":
          se("Model"), n(!0);
          return;
        case "teammateDefaultModel":
          se("TeammateModel"), n(!0);
          return;
        case "showExternalIncludesDialog":
          se("ExternalIncludes"), n(!0);
          return;
        case "outputStyle":
          se("OutputStyle"), n(!0);
          return;
        case "language":
          se("Language"), n(!0);
          return;
      }
      if (Yt.id === "autoUpdatesChannel") {
        if (Ye) {
          se("EnableAutoUpdates"), n(!0);
          return;
        }
        if ((m?.autoUpdatesChannel ?? "latest") === "latest") se("ChannelDowngrade"), n(!0);else updateSettingsForSource("userSettings", {
          autoUpdatesChannel: void 0,
          minimumVersion: void 0
        }), f(ve => ({
          ...ve,
          autoUpdatesChannel: void 0,
          minimumVersion: void 0
        })), logEvent("tengu_autoupdate_channel_changed", {
          channel: Qe("latest")
        });
        return;
      }
      if (Yt.type === "enum") {
        let ve = (Yt.options.indexOf(Yt.value) + 1) % Yt.options.length,
          Fe = Yt.options[ve];
        Yt.onChange(Fe), logEvent("tengu_config_changed", {
          setting: Yt.id,
          value: Fe
        });
        return;
      }
    }, [Ye, Zt, Dt, k, m?.autoUpdatesChannel, n]),
    Fn = Yt => {
      ae(!1);
      let ye = Math.max(0, Math.min(Dt.length - 1, k + Yt));
      x(ye), $t(ye);
    };
  Wo({
    "select:previous": () => {
      if (k === 0) ae(!1), L(!0), I(0);else Fn(-1);
    },
    "select:next": () => Fn(1),
    "scroll:lineUp": () => Fn(-1),
    "scroll:lineDown": () => Fn(1),
    "select:accept": Nn,
    "settings:search": () => {
      L(!0), _e("");
    }
  }, {
    context: "Settings",
    isActive: he === null && !P && !s
  });
  let Dn = Wh.useMemo(() => [...(AJ() ? [{
      id: "leftArrowOpensAgents",
      label: `${A8} opens agents`,
      value: u.leftArrowOpensAgents ?? !0
    }] : []), ...(isAgentsFleetEnabled() ? [{
      id: "defaultToAgentsView",
      label: "Start in agent view",
      value: u.defaultToAgentsView ?? !1
    }] : [])], [u.leftArrowOpensAgents, u.defaultToAgentsView]),
    or = Wh.useCallback(() => {
      let Yt = Dn[le];
      if (!Yt) return;
      let ye = !Yt.value;
      if (Yt.id === "leftArrowOpensAgents") saveGlobalConfig(ve => ({
        ...ve,
        leftArrowOpensAgents: ye
      })), d(ve => ({
        ...ve,
        leftArrowOpensAgents: ye
      }));else saveGlobalConfig(ve => ({
        ...ve,
        defaultToAgentsView: ye
      })), d(ve => ({
        ...ve,
        defaultToAgentsView: ye
      }));
      logEvent("tengu_config_changed", {
        setting: fromEnum(Yt.id),
        value: ye ? Qe("true") : Qe("false")
      });
    }, [Dn, le]);
  Wo({
    "select:previous": () => pe(Yt => Math.max(0, Yt - 1)),
    "select:next": () => pe(Yt => Math.min(Dn.length - 1, Yt + 1)),
    "select:accept": or
  }, {
    context: "Settings",
    isActive: he === "AgentsView"
  });
  let vr = Wh.useCallback(Yt => {
    if (he !== null) return;
    if (s) return;
    if (P) {
      if (ie(Yt), Yt.key === "escape") {
        if (Yt.preventDefault(), de.length > 0) _e("");else L(!1);
        return;
      }
      if (Yt.key === "return" || Yt.key === "down") Yt.preventDefault(), L(!1), x(0), I(0);
      return;
    }
    if (Yt.key === "left" || Yt.key === "right" || Yt.key === "tab") {
      Yt.preventDefault(), Nn();
      return;
    }
    if (Yt.ctrl || Yt.meta) return;
    if (Yt.key.length === 1 && Yt.key !== " ") Yt.preventDefault(), L(!0), _e(Yt.key === "/" ? "" : Yt.key);
  }, [he, s, P, de, _e, ie, Nn]);
  return qn.createElement(Box, {
    flexDirection: "column",
    width: "100%",
    tabIndex: 0,
    autoFocus: !s,
    onKeyDown: vr,
    onPaste: Ae
  }, he === "Theme" ? qn.createElement(qn.Fragment, null, qn.createElement(jpt, {
    onThemeSelect: Yt => {
      l(Yt), se(null), n(!1);
    },
    onCancel: () => {
      se(null), n(!1);
    },
    helpText: hc("themes") ? `Custom themes are disabled in safe mode — ${KE()} to load them${k4(c) ? `. Your saved theme "${k4(c)}" is a custom theme; selecting a preset here replaces it` : ""}` : "",
    hideEscToCancel: !0,
    skipExitHandling: !0
  }), qn.createElement(Box, null, qn.createElement(Text, {
    dimColor: !0,
    italic: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: "enter",
    action: "select"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  }))))) : he === "Model" ? qn.createElement(qn.Fragment, null, qn.createElement(gje, {
    initial: G,
    onSelect: (Yt, ye) => {
      $e(Yt), se(null), n(!1);
    },
    onCancel: () => {
      se(null), n(!1);
    },
    showFastModeNotice: uc() ? K && vA(G) && dk() : !1
  }), qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: "enter",
    action: "confirm"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  })))) : he === "TeammateModel" ? qn.createElement(qn.Fragment, null, qn.createElement(gje, {
    initial: u.teammateDefaultModel ?? null,
    skipSettingsWrite: !0,
    headerText: "Default model for newly spawned teammates. The leader can override via the tool call's model parameter.",
    onSelect: (Yt, ye) => {
      if (se(null), n(!1), u.teammateDefaultModel === void 0 && Yt === null) return;
      if (fJ(Yt)) {
        isTmuxControlMode("model_fable_consent", "config_teammate_blocked"), oe(ve => ({
          ...ve,
          teammateDefaultModel: `${A8n(u.teammateDefaultModel)} (Fable 5 needs usage-credits consent — /model to set up)`
        }));
        return;
      }
      saveGlobalConfig(ve => ve.teammateDefaultModel === Yt ? ve : {
        ...ve,
        teammateDefaultModel: Yt
      }), d(ve => ({
        ...ve,
        teammateDefaultModel: Yt
      })), oe(ve => ({
        ...ve,
        teammateDefaultModel: A8n(Yt)
      })), logEvent("tengu_teammate_default_model_changed", {
        model: Yt
      });
    },
    onCancel: () => {
      se(null), n(!1);
    }
  }), qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: "enter",
    action: "confirm"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  })))) : he === "ExternalIncludes" ? qn.createElement(qn.Fragment, null, qn.createElement(ClaudeMdExternalIncludesDialog, {
    onDone: () => {
      T(getCurrentProjectConfig().hasClaudeMdExternalIncludesApproved === !0), se(null), n(!1);
    },
    externalIncludes: getExternalClaudeMdIncludes(He)
  }), qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: "enter",
    action: "confirm"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "disable external includes"
  })))) : he === "OutputStyle" ? qn.createElement(qn.Fragment, null, qn.createElement(Uil, {
    initialStyle: h,
    onComplete: Yt => {
      g(Yt ?? hN), se(null), n(!1), updateSettingsForSource("localSettings", {
        outputStyle: Yt
      }), logEvent("tengu_output_style_changed", {
        style: Yt ?? hN,
        source: Qe("config_panel"),
        settings_source: Qe("localSettings")
      });
    },
    onCancel: () => {
      se(null), n(!1);
    }
  }), qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: "enter",
    action: "confirm"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "cancel"
  })))) : he === "Language" ? qn.createElement(qn.Fragment, null, qn.createElement(jil, {
    initialLanguage: S,
    onComplete: Yt => {
      v(Yt), se(null), n(!1), updateSettingsForSource("userSettings", {
        language: Yt
      }), logEvent("tengu_language_changed", {
        language: Yt ?? "default",
        source: Qe("config_panel")
      });
    },
    onCancel: () => {
      se(null), n(!1);
    }
  }), qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: "enter",
    action: "confirm"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: "cancel"
  })))) : he === "AgentsView" ? qn.createElement(Kn, {
    title: "Agents view",
    onCancel: () => {
      se(null), n(!1);
    },
    hideBorder: !0,
    hideInputGuide: !0
  }, qn.createElement(Box, {
    flexDirection: "column"
  }, Dn.map((Yt, ye) => {
    let ve = ye === le;
    return qn.createElement(Box, {
      key: Yt.id
    }, qn.createElement(Box, {
      width: $,
      flexShrink: 0,
      marginRight: 1
    }, qn.createElement(Text, {
      color: ve ? "suggestion" : void 0,
      wrap: "truncate-end"
    }, ve ? et.pointer : " ", " ", Yt.label)), qn.createElement(Text, {
      color: ve ? "suggestion" : void 0
    }, String(Yt.value)));
  })), qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: ["enter", "space"],
    action: "toggle"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "close"
  })))) : he === "EnableAutoUpdates" ? qn.createElement(Kn, {
    title: "Enable Auto-Updates",
    onCancel: () => {
      se(null), n(!1);
    },
    hideBorder: !0,
    hideInputGuide: !0
  }, Ye?.type !== "config" ? qn.createElement(qn.Fragment, null, qn.createElement(Text, null, Ye?.type === "env" ? "Auto-updates are controlled by an environment variable and cannot be changed here." : "Auto-updates are disabled in development builds."), Ye?.type === "env" && qn.createElement(Text, {
    dimColor: !0
  }, "Unset ", Ye.envVar, " to re-enable auto-updates.")) : qn.createElement(pr, {
    options: [{
      label: "Enable with latest channel",
      value: "latest"
    }, {
      label: "Enable with stable channel",
      value: "stable"
    }],
    onChange: Yt => {
      se(null), n(!1), saveGlobalConfig(ye => ({
        ...ye,
        autoUpdates: !0
      })), d(ye => ({
        ...ye,
        autoUpdates: !0
      })), updateSettingsForSource("userSettings", {
        autoUpdatesChannel: Yt,
        minimumVersion: void 0
      }), f(ye => ({
        ...ye,
        autoUpdatesChannel: Yt,
        minimumVersion: void 0
      })), logEvent("tengu_autoupdate_enabled", {
        channel: Yt
      });
    }
  })) : he === "ChannelDowngrade" ? qn.createElement(Mil, {
    currentVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.185",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-20T06:38:30Z",
      GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
    }.VERSION,
    onChoice: Yt => {
      if (se(null), n(!1), Yt === "cancel") return;
      let ye = {
        autoUpdatesChannel: "stable"
      };
      if (Yt === "stay") ye.minimumVersion = {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION;
      updateSettingsForSource("userSettings", ye), f(ve => ({
        ...ve,
        ...ye
      })), logEvent("tengu_autoupdate_channel_changed", {
        channel: Qe("stable"),
        minimum_version_set: Yt === "stay"
      });
    }
  }) : he === "Notifications" ? qn.createElement(uil, {
    channel: u.preferredNotifChannel,
    showInputNeededRow: ot && Qvn(),
    showDoneRow: ot,
    inputNeededEnabled: u.inputNeededNotifEnabled ?? !1,
    doneEnabled: u.agentPushNotifEnabled ?? !1,
    onCycleChannel: () => {
      let Yt = mje.indexOf(u.preferredNotifChannel),
        ye = mje[(Yt + 1) % mje.length];
      Je(ye), logEvent("tengu_config_changed", {
        setting: Qe("notifChannel"),
        value: fromEnum(ye)
      });
    },
    onToggleInputNeeded: () => {
      let Yt = !(u.inputNeededNotifEnabled ?? !1);
      Rt(Yt), logEvent("tengu_config_changed", {
        setting: Qe("inputNeededNotifEnabled"),
        value: Yt ? Qe("true") : Qe("false")
      });
    },
    onToggleDone: () => {
      let Yt = !(u.agentPushNotifEnabled ?? !1);
      Et(Yt), logEvent("tengu_config_changed", {
        setting: Qe("agentPushNotifEnabled"),
        value: Yt ? Qe("true") : Qe("false")
      });
    },
    onClose: () => {
      se(null), n(!1);
    }
  }) : qn.createElement(Box, {
    flexDirection: "column",
    gap: 1,
    marginY: a ? void 0 : 1
  }, qn.createElement(qP, {
    query: de,
    isFocused: P && !s,
    isTerminalFocused: D,
    cursorOffset: fe,
    placeholder: "Search settings…"
  }), qn.createElement(Box, {
    flexDirection: "column"
  }, Dt.length === 0 ? qn.createElement(Text, {
    dimColor: !0,
    italic: !0
  }, 'No settings match "', de, '"') : qn.createElement(qn.Fragment, null, H > 0 && qn.createElement(Text, {
    dimColor: !0
  }, et.arrowUp, " ", H, " more above"), Dt.slice(H, H + W).map((Yt, ye) => {
    let ve = H + ye,
      Fe = ve === k && !s && !P,
      We = dt ? Vyo(Yt.id) : void 0,
      ft = We !== void 0 && (ve === 0 || Vyo(Dt[ve - 1]?.id ?? "") !== We),
      ke = We !== void 0 && Zil.has(We) && (We !== "Advanced" || Gyo(Yt.id)) && !Fe;
    return qn.createElement(qn.Fragment, {
      key: Yt.id
    }, ft && qn.createElement(Box, {
      marginTop: ve === H ? 0 : 1
    }, qn.createElement(Text, {
      dimColor: !0
    }, eal(We, Yt.id))), qn.createElement(Box, null, qn.createElement(Box, {
      width: $,
      flexShrink: 0,
      marginRight: 1
    }, qn.createElement(Text, {
      color: Fe ? "suggestion" : void 0,
      dimColor: ke,
      wrap: "truncate-end"
    }, Fe ? et.pointer : " ", " ", Yt.label)), qn.createElement(Box, {
      key: Fe ? "selected" : "unselected",
      flexGrow: 1,
      minWidth: 0
    }, We === "Advanced" && _n(Yt.id) && qn.createElement(Text, {
      color: "warning",
      dimColor: ke,
      wrap: "truncate-end"
    }, "→ settings.json "), Yt.type === "boolean" ? qn.createElement(Text, {
      color: Fe ? "suggestion" : void 0,
      dimColor: ke,
      wrap: "truncate-end"
    }, Yt.value.toString()) : Yt.id === "theme" ? qn.createElement(Text, {
      color: Fe ? "suggestion" : void 0,
      dimColor: ke,
      wrap: "truncate-end"
    }, I5p[Yt.value.toString()] ?? Yt.value.toString()) : !dt && Yt.id === "notifChannel" ? qn.createElement(Text, {
      color: Fe ? "suggestion" : void 0,
      dimColor: ke,
      wrap: "truncate-end"
    }, qn.createElement(D5p, {
      value: Yt.value.toString()
    })) : Yt.id === "permissionMode" ? qn.createElement(Text, {
      color: Fe ? "suggestion" : void 0,
      dimColor: ke,
      wrap: "truncate-end"
    }, oQ(Yt.value)) : Yt.id === "autoUpdatesChannel" && Ye ? qn.createElement(Text, {
      color: Fe ? "suggestion" : void 0,
      dimColor: ke,
      wrap: "truncate-end"
    }, "disabled", " ", qn.createElement(Text, {
      dimColor: !0
    }, "(", formatAutoUpdaterDisabledReason(Ye), ")")) : qn.createElement(Text, {
      color: Fe ? "suggestion" : void 0,
      dimColor: ke,
      wrap: "truncate-end"
    }, Yt.value.toString()), dt && Yt.type === "managedEnum" && !Zt(Yt) && (Yt.id !== "autoUpdatesChannel" || Ye !== null || (m?.autoUpdatesChannel ?? "latest") === "latest") && qn.createElement(Text, {
      color: Fe ? "suggestion" : "permission",
      dimColor: ke
    }, ` ${et.pointerSmall}`))), (Yt.id === "inputNeededNotifEnabled" || Yt.id === "agentPushNotifEnabled") && qn.createElement(Ryo, null), ue && Yt.id === "thinking" && qn.createElement(Box, {
      paddingLeft: 2
    }, qn.createElement(Text, {
      color: "warning"
    }, "Changing thinking mode mid-conversation will increase latency and may reduce quality.")));
  }), H + W < Dt.length && qn.createElement(Text, {
    dimColor: !0
  }, et.arrowDown, " ", Dt.length - H - W, " ", "more below"))), s ? qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: ["left", "right", "tab"],
    action: "switch",
    format: {
      keyCase: "lower"
    }
  }), qn.createElement(at, {
    chord: "down",
    action: "return"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: "close"
  }))) : P ? qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(Text, null, "Type to filter"), qn.createElement(at, {
    chord: ["enter", "down"],
    action: "select"
  }), qn.createElement(at, {
    chord: "up",
    action: "tabs"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: "clear"
  }))) : qn.createElement(Text, {
    dimColor: !0
  }, qn.createElement(Tn, null, qn.createElement(at, {
    chord: ["enter", "space"],
    action: "change"
  }), qn.createElement(lr, {
    action: "settings:search",
    context: "Settings",
    fallback: "/",
    description: "search"
  }), qn.createElement(lr, {
    action: "confirm:no",
    context: "Settings",
    fallback: "Esc",
    description: "close"
  })))));
}
function D5p(e) {
  let t = oal.c(4),
    {
      value: n
    } = e;
  switch (n) {
    case "auto":
      return "Auto";
    case "iterm2":
      {
        let r;
        if (t[0] === Symbol.for("react.memo_cache_sentinel")) r = qn.createElement(Text, null, "iTerm2 ", qn.createElement(Text, {
          dimColor: !0
        }, "(OSC 9)")), t[0] = r;else r = t[0];
        return r;
      }
    case "terminal_bell":
      {
        let r;
        if (t[1] === Symbol.for("react.memo_cache_sentinel")) r = qn.createElement(Text, null, "Terminal Bell ", qn.createElement(Text, {
          dimColor: !0
        }, "(\\a)")), t[1] = r;else r = t[1];
        return r;
      }
    case "kitty":
      {
        let r;
        if (t[2] === Symbol.for("react.memo_cache_sentinel")) r = qn.createElement(Text, null, "Kitty ", qn.createElement(Text, {
          dimColor: !0
        }, "(OSC 99)")), t[2] = r;else r = t[2];
        return r;
      }
    case "ghostty":
      {
        let r;
        if (t[3] === Symbol.for("react.memo_cache_sentinel")) r = qn.createElement(Text, null, "Ghostty ", qn.createElement(Text, {
          dimColor: !0
        }, "(OSC 777)")), t[3] = r;else r = t[3];
        return r;
      }
    case "iterm2_with_bell":
      return "iTerm2 w/ Bell";
    case "notifications_disabled":
      return "Disabled";
    default:
      return n;
  }
}
var oal, qn, Wh, I5p;
var ial = b(() => {
  ze();
  Ts();
  Ai();
  sl();
  Qn();
  eYe();
  Qn();
  Ug();
  cu();
  Cv();
  eC();
  ly();
  Ct();
  ln();
  T8n();
  configProtoStore();
  z_e();
  b8n();
  jyo();
  Nil();
  Li();
  yb();
  $il();
  Wil();
  zw();
  Iy();
  zfe();
  rs();
  readRoster();
  zs();
  $P();
  pE();
  uue();
  ab();
  yr();
  R4();
  Vq();
  Lr();
  sn();
  bv();
  Bpt();
  s6t();
  xyo();
  aee();
  Ao();
  Ap();
  gne();
  ki();
  tE();
  f8n();
  ral();
  Iyo();
  oal = M(rt(), 1), qn = M(Te(), 1), Wh = M(Te(), 1);
  I5p = {
    auto: "Auto (match terminal)",
    dark: "Dark mode",
    light: "Light mode",
    "dark-daltonized": "Dark mode (colorblind-friendly)",
    "light-daltonized": "Light mode (colorblind-friendly)",
    "dark-ansi": "Dark mode (ANSI colors only)",
    "light-ansi": "Light mode (ANSI colors only)"
  };
});
export {sal,D5p,oal,qn,Wh,I5p,ial};
