// @ts-nocheck
import {wxe,c4t} from "../../vendor/m4099.ts";
import {findCommand as hb,isBridgeSafeCommand as b_t,findBridgeFallback as E_t,getSlashCommandToolSkills as lae,isBridgeDispatchable as QPo,Mm} from "../tools/5174_toSlashCommands.ts";
import {Rxe,getCommandName as mu} from "../tools/4092_done.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {bo,gc,_t,uo} from "../../vendor/m2468.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {shellToolNames as mv,isReplMode as IG} from "../../vendor/m4331.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {pl,Wu} from "../../vendor/m438.ts";
import {getCcrAutoConnectDefault as HMo,isPersistentRemoteSessionEnabled as P0e,isRemoteControlInternalEventsEnabled as IMo,isBridgeEnabled as AH,pH} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {ZKt,AZn,RZn,e7t} from "../../vendor/m5290.ts";
import {zP,FS} from "../../vendor/m722.ts";
import {lF,WS} from "../api/1453_month.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {Dq,Qct,ate} from "../../vendor/m3839.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Hto,M3e} from "../../vendor/m3341.ts";
import {wc,Y6l,po} from "../tools/5224_userPromptCount.ts";
import {getSessionId as It,setMainLoopModelOverride as Bg,mainAgentId as rs,lt} from "../session/0132_sent.ts";
import {Nm,D_} from "../agent/2784_withFileTypes.ts";
import {clearBridgeSessionCache as IXn,saveBridgeSession as lKt,saveAgentColor as g8t,clearBridgeSession as TOo,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {ael,Fce,G5n} from "../core/4328_id.ts";
import {gT} from "../core/2809_toInfraSessionId.ts";
import {BRIDGE_SESSION_ENDED_DETAIL as dpo,BRIDGE_LOGIN_HINT as D6e} from "../core/4006_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {FNo,NNo} from "../../vendor/m5327.ts";
import {qBl,BBl,dJn} from "../../vendor/m5112.ts";
import {MAX_DECLARED_DIALOG_KINDS as $Gt} from "../session/5045_request_id.ts";
import {Vkn,age} from "../config/2703_reason.ts";
import {Kg,isExemptDefaultResolvingPick as XT,isModelAllowedUnderActiveEnforcement as dF,parseUserSpecifiedModel as Qo,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Oa,eO} from "../../vendor/m1456.ts";
import {mte,hut} from "../config/3893_wB.ts";
import {X9n,V1} from "../../vendor/m4006.ts";
import {kW,$9e} from "../../vendor/m3162.ts";
import {DHe,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {Ej,Wst,qst,Gst,wee} from "../config/3161_error.ts";
import {h7n,Sue} from "../../vendor/m4678.ts";
import {OSl} from "../telemetry/4680_call.ts";
import {X8t,kRo} from "../../vendor/m4587.ts";
import {G8t,Ufl} from "../../vendor/m4562.ts";
import {__,eut,ix} from "../../vendor/m3842.ts";
import {Ivn,eb,Oi,mT,Id,Pm,Pf} from "../agent/2591_level.ts";
import {M_o,WB} from "../../vendor/m4274.ts";
import {detectCurrentRepositoryWithHost as cM,_0} from "../../vendor/m697.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {cj,l9e,RE} from "../session/2796_uuid.ts";
import {NZn,u7t,c7t,Y_t,FZn} from "../../vendor/m5317.ts";
import {BNo,r7l} from "../../vendor/m5328.ts";
import {iy,ef} from "../../vendor/m2794.ts";
import {d7t,BZn} from "../../vendor/m5318.ts";
import {isBypassPermissionsModeDisabled as N2} from "../telemetry/2232_vUe.ts";
import {isAutoModeGateEnabled as cv,getAutoModeUnavailableReason as iV,getAutoModeUnavailableNotification as OJ,transitionPermissionMode as PJ,cy} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {sve,SDt} from "../../vendor/m2226.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {PZn} from "../../vendor/m5299.ts";
import {F0e} from "../../vendor/m3899.ts";
import {tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {vn} from "../session/0621_length.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Parse a bridge-safe slash command from raw user input.
 * Returns null if the input cannot be dispatched immediately via bridge.
 */
function WMm(rawInput, commands) {
  let parsed = wxe(rawInput);
  if (!parsed) return null;
  let command = hb(parsed.commandName, commands);
  if (!command || !Rxe(command, parsed.args)) return null;
  let target = command.type === "local" && b_t(command) ? command : E_t(command);
  if (!target || target.type !== "local") return null;
  return {
    target: target,
    args: parsed.args,
    displayName: mu(command)
  };
}

/**
 * React hook managing the full REPL bridge lifecycle:
 * initialization, message relay, permission callbacks, model/mode changes, and teardown.
 */
function s7l(messages, setMessages, onCancelRef, commands, model, getSessionState, getDynamicState, runImmediateCommandRef) {
  // Clock for scheduling retries
  let clock = As(),
    // Ref to the active bridge instance
    bridgeRef = AS.useRef(null),
    // Ref to the pending teardown promise
    pendingTeardownRef = AS.useRef(void 0),
    // Count of messages written to the bridge
    lastWrittenIndexRef = AS.useRef(0),
    // Ref to the scheduled retry timer handle
    retryTimerRef = AS.useRef(void 0),
    // Last snapshot index saved for reattach
    failureCountRef = AS.useRef(0),
    // Saved bridge session ID for reattach
    savedSessionIdRef = AS.useRef(void 0),
    // Saved last sequence number for reattach
    savedSequenceNumRef = AS.useRef(void 0),
    // Saved dialog kinds set for reattach
    savedDialogKindsRef = AS.useRef(void 0),
    // Saved snapshot index for reattach
    savedSnapshotIndexRef = AS.useRef(void 0),
    // Saved first message uuid for session continuity check
    savedFirstUuidRef = AS.useRef(void 0),
    // Saved session ID for continuity check
    savedSessionContinuityRef = AS.useRef(void 0),
    // Teardown archive cleanup function ref
    archiveCleanupRef = AS.useRef(void 0),
    // Zustand store dispatch
    setAppState = bo(),
    // Ref to current commands list
    commandsRef = AS.useRef(commands);
  commandsRef.current = commands;
  let runImmediateRef = AS.useRef(runImmediateCommandRef);
  runImmediateRef.current = runImmediateCommandRef;
  // Try to run a bridge message as an immediate slash command
  let tryRunImmediateCommand = (message) => {
      let runImmediate = runImmediateRef.current;
      if (!runImmediate) return !1;
      let dispatch = WMm(message, commandsRef.current);
      if (!dispatch) return !1;
      return W("tengu_immediate_command_executed", {
        commandName: dispatch.displayName,
        fromKeybinding: !1,
        bridgeOrigin: !0
      }), runImmediate(dispatch.target, dispatch.args, dispatch.displayName), !0;
    },
    modelRef = AS.useRef(model);
  modelRef.current = model;
  let messagesRef = AS.useRef(messages);
  messagesRef.current = messages;
  let store = gc(),
    mcp = mv(),
    {
      addNotification: addNotification,
      removeNotification: removeNotification
    } = Ci(),
    replBridgeEnabled = _t((state) => state.replBridgeEnabled),
    replBridgeConnected = _t((state) => state.replBridgeConnected),
    replBridgeOutboundOnly = _t((state) => state.replBridgeOutboundOnly),
    replBridgeInitialName = _t((state) => state.replBridgeInitialName),
    permissionMode = _t((state) => state.toolPermissionContext.mode),
    fastMode = _t((state) => state.fastMode),
    [isSpareBgSource, setIsSpareBgSource] = AS.useState(() => process.env.CLAUDE_BG_SOURCE === "spare");
  if (isSpareBgSource && messages.length > 0) setIsSpareBgSource(!1);
  AS.useEffect(() => {
    if (pl() || isSpareBgSource) return;
    W("tengu_bridge_repl_evaluated", {
      would_auto_on: HMo(),
      repl_bridge_enabled: store.getState().replBridgeEnabled
    });
  }, [store, isSpareBgSource]);
  // Send system/init message to bridge when feature flag is enabled
  let sendSystemInit = AS.useCallback(() => {
    let bridge = bridgeRef.current;
    if (!bridge || !it("tengu_bridge_system_init", !1)) return;
    (async () => {
      try {
        let skills = await lae(Lt()),
          state = store.getState(),
          startTime = performance.now(),
          initMessage = ZKt({
            ...AZn(),
            tools: [],
            mcpClients: [],
            model: modelRef.current,
            permissionMode: zP(state.toolPermissionContext.mode),
            commands: commandsRef.current.filter(QPo),
            agents: state.agentDefinitions.activeAgents,
            skills: skills,
            plugins: [],
            pluginErrors: [],
            pluginWarnings: [],
            fastModeState: lF(modelRef.current, state.fastMode)
          });
        RZn(initMessage, startTime), bridge.writeSdkMessages([initMessage]);
      } catch (err) {
        A(`[bridge:repl] Failed to send system/init: ${Ce(err)}`, {
          level: "error"
        });
      }
    })();
  }, [store]);
  return AS.useEffect(() => {
    if (!replBridgeConnected || replBridgeOutboundOnly) return;
    sendSystemInit();
  }, [replBridgeConnected, replBridgeOutboundOnly, model, permissionMode, fastMode, sendSystemInit]), AS.useEffect(() => {
    if (!replBridgeEnabled || pl() || isSpareBgSource) return;
    let outboundOnly = replBridgeOutboundOnly;
    if (!outboundOnly) removeNotification(Dq), setAppState(state => state.replBridgeError === void 0 ? state : {
      ...state,
      replBridgeError: void 0
    });
    let bridgeExplicit = store.getState().replBridgeExplicit;
    // Notify user of bridge failure/disconnect with a warning notification
    function notifyBridgeFailed(detail, wasConnected = !1) {
      if (A(`[bridge:repl] notifyBridgeFailed detail="${detail}" outboundOnly=${outboundOnly} wasConnected=${wasConnected}`), outboundOnly) return;
      addNotification({
        key: Dq,
        kind: "warning",
        jsx: sde.jsxs(sde.Fragment, {
          children: [sde.jsxs(v, {
            color: "error",
            children: ["Remote Control ", wasConnected ? "disconnected" : "failed"]
          }), sde.jsxs(v, {
            dimColor: !0,
            children: [" \xB7 ", detail || "/remote-control"]
          })]
        }),
        priority: "immediate",
        requeueOnPreempt: !0,
        invalidates: [Dq]
      });
    }
    function notifyAndRetry(detail) {
      notifyBridgeFailed(detail), setAppState(state => ({
        ...state,
        replBridgeError: detail
      })), scheduleRetry();
    }
    if (failureCountRef.current >= GMm) {
      A(`[bridge:repl] Hook: ${failureCountRef.current} consecutive init failures, not retrying this session`), notifyBridgeFailed(Qct), setAppState(state => {
        if (state.replBridgeError === Qct && !state.replBridgeEnabled) return state;
        return {
          ...state,
          replBridgeError: Qct,
          replBridgeEnabled: !1
        };
      });
      return;
    }
    // Register attestation-drop listener for unsigned messages
    if (!outboundOnly) Hto(({
      status: status,
      payloadType: payloadType
    }) => {
      let messageLabel = payloadType === "control_response" ? "permission response" : "message";
      addNotification({
        key: "bridge-attestation-drop",
        kind: "warning",
        jsx: sde.jsxs(sde.Fragment, {
          children: [sde.jsxs(v, {
            color: "error",
            children: ["Remote Control: unsigned ", messageLabel, " rejected"]
          }), sde.jsxs(v, {
            dimColor: !0,
            children: [" \xB7 attestation: ", status]
          })]
        }),
        priority: "immediate"
      });
      let warningText = `Remote Control received a ${messageLabel} without a valid device signature (attestation: ${status}) and will not execute it.`;
      setMessages(prev => {
        let last = prev.at(-1);
        if (last?.type === "system" && last.subtype === "informational" && last.content === warningText) return prev;
        return [...prev, wc(warningText, "warning")];
      });
    });
    let cancelled = !1,
      initialMessageCount = messages.length,
      sessionId = It(),
      cwd = Nm();
    // Reset saved reattach state if session has changed
    if (savedSessionContinuityRef.current !== void 0 && savedSessionContinuityRef.current !== sessionId) savedSessionIdRef.current = void 0, savedSequenceNumRef.current = void 0, savedDialogKindsRef.current = void 0, savedSnapshotIndexRef.current = void 0, savedFirstUuidRef.current = void 0, savedSessionContinuityRef.current = void 0, archiveCleanupRef.current?.(), archiveCleanupRef.current = void 0;
    let firstUuidChanged = savedFirstUuidRef.current !== void 0 && messages[0]?.uuid !== savedFirstUuidRef.current;
    if (firstUuidChanged) IXn();
    let reattachMessageCount = !firstUuidChanged && savedSnapshotIndexRef.current !== void 0 ? Math.min(savedSnapshotIndexRef.current, messages.length) : void 0,
      disabledByRetry = !1,
      sessionEnded = !1;
    // Schedule a retry after a delay, saving current bridge state for reattach
    function scheduleRetry() {
      let firstUuid = messagesRef.current[0]?.uuid;
      retryTimerRef.current = clock.setTimeout(() => {
        if (cancelled) return;
        retryTimerRef.current = void 0;
        let bridge = bridgeRef.current;
        if (bridge) savedSessionIdRef.current = bridge.bridgeSessionId, savedSequenceNumRef.current = bridge.getLastSequenceNum(), savedDialogKindsRef.current = declaredDialogKinds.size > 0 ? new Set(declaredDialogKinds) : void 0, savedSnapshotIndexRef.current = lastWrittenIndexRef.current, savedFirstUuidRef.current = firstUuid, savedSessionContinuityRef.current = sessionId, archiveCleanupRef.current?.(), archiveCleanupRef.current = bridge.archive ? Si(() => bridge.archive?.()) : void 0;
        setAppState(state => {
          if (!state.replBridgeError) return state;
          return disabledByRetry = !0, {
            ...state,
            replBridgeEnabled: !1,
            ...(bridge && {
              replBridgeSkipNextArchive: !0
            })
          };
        });
      }, qMm);
    }
    let responseHandlers = new Map(),
      declaredDialogKinds = new Set();
    // Restore previously saved dialog kinds for reattach
    if (!firstUuidChanged && savedSessionIdRef.current !== void 0) for (let kind of savedDialogKindsRef.current ?? []) declaredDialogKinds.add(kind);
    // Handle inbound control_response by dispatching to registered handler
    function handlePermissionResponse(message) {
      let requestId = message.response?.request_id;
      if (!requestId) return !1;
      let handler = responseHandlers.get(requestId);
      if (!handler) return A(`[bridge:repl] No handler for control_response request_id=${requestId} (late response after local resolve, stale reattach dialog, or unknown id)`, {
        level: "verbose"
      }), !1;
      responseHandlers.delete(requestId);
      let response = message.response;
      if (response.subtype === "success" && response.response && ael(response.response)) handler(response.response);
      return !0;
    }
    // Handle bridge state transitions (ready/connected/reconnecting/failed)
    function handleStateChange(state, detail) {
      if (A(`[bridge:repl] handleStateChange state=${state} detail="${detail}" cancelled=${cancelled} outboundOnly=${outboundOnly}`), cancelled) return;
      if (outboundOnly) {
        if (A(`[bridge:repl] Mirror state=${state}${detail ? ` detail=${detail}` : ""}`), state === "failed") setAppState(appState => {
          if (!appState.replBridgeConnected) return appState;
          return {
            ...appState,
            replBridgeConnected: !1
          };
        });else if (state === "ready" || state === "connected") setAppState(appState => {
          if (appState.replBridgeConnected) return appState;
          return {
            ...appState,
            replBridgeConnected: !0
          };
        });
        return;
      }
      let bridge = bridgeRef.current;
      switch (state) {
        case "ready":
          removeNotification(Dq), setAppState(appState => {
            let sessionUrl = bridge ? gT(bridge.bridgeSessionId, bridge.sessionIngressUrl) : appState.replBridgeSessionUrl,
              environmentId = bridge?.environmentId,
              bridgeSessionId = bridge?.bridgeSessionId;
            if (appState.replBridgeConnected && !appState.replBridgeSessionActive && !appState.replBridgeReconnecting && appState.replBridgeSessionUrl === sessionUrl && appState.replBridgeEnvironmentId === environmentId && appState.replBridgeSessionId === bridgeSessionId) return appState;
            return {
              ...appState,
              replBridgeConnected: !0,
              replBridgeSessionActive: !1,
              replBridgeReconnecting: !1,
              replBridgeSessionUrl: sessionUrl,
              replBridgeEnvironmentId: environmentId,
              replBridgeSessionId: bridgeSessionId,
              replBridgeError: void 0
            };
          });
          break;
        case "connected":
          {
            removeNotification(Dq), setAppState(appState => {
              if (appState.replBridgeSessionActive) return appState;
              return {
                ...appState,
                replBridgeConnected: !0,
                replBridgeSessionActive: !0,
                replBridgeReconnecting: !1,
                replBridgeError: void 0
              };
            }), sendSystemInit();
            break;
          }
        case "reconnecting":
          setAppState(appState => {
            if (appState.replBridgeReconnecting) return appState;
            return {
              ...appState,
              replBridgeReconnecting: !0,
              replBridgeSessionActive: !1
            };
          });
          break;
        case "failed":
          if (retryTimerRef.current?.(), notifyBridgeFailed(detail, bridge !== null), detail === dpo) {
            disabledByRetry = !0, sessionEnded = !0, setAppState(appState => ({
              ...appState,
              replBridgeEnabled: !1,
              replBridgeReconnecting: !1,
              replBridgeSessionActive: !1,
              replBridgeConnected: !1,
              replBridgeError: void 0
            }));
            break;
          }
          setAppState(appState => ({
            ...appState,
            replBridgeError: detail,
            replBridgeReconnecting: !1,
            replBridgeSessionActive: !1,
            replBridgeConnected: !1
          })), scheduleRetry();
          break;
      }
    }
    return (async () => {
      try {
        // Wait for previous teardown to complete before re-initializing
        if (pendingTeardownRef.current) A("[bridge:repl] Hook: waiting for previous teardown to complete before re-init"), await pendingTeardownRef.current, pendingTeardownRef.current = void 0, A("[bridge:repl] Hook: previous teardown complete, proceeding with re-init");
        if (cancelled) return;
        let {
            initReplBridge: initReplBridge
          } = await Promise.resolve().then(() => (FNo(), NNo)),
          bridge = await initReplBridge({
            outboundOnly: outboundOnly,
            reattachSessionId: firstUuidChanged ? void 0 : savedSessionIdRef.current,
            reattachSequenceNum: firstUuidChanged ? void 0 : savedSequenceNumRef.current,
            tags: outboundOnly ? [qBl] : [bridgeExplicit ? BBl : dJn],
            getToolPermissionContext: () => store.getState().toolPermissionContext,
            getTools: () => getSessionState().tools,
            onInboundMessage: message => VMm(message, tryRunImmediateCommand, void 0),
            onPermissionResponse: handlePermissionResponse,
            getInitializeState() {
              return {
                current_model: modelRef.current,
                current_permission_mode: zP(store.getState().toolPermissionContext.mode)
              };
            },
            onDialogKindsDeclared: outboundOnly ? void 0 : (kinds, reason) => {
              let prevSize = declaredDialogKinds.size;
              for (let kind of kinds) {
                if (declaredDialogKinds.size >= $Gt) break;
                declaredDialogKinds.add(kind);
              }
              if (reason !== "restored" && declaredDialogKinds.size > prevSize) {
                W("tengu_repl_bridge_dialog_kinds_declared", {
                  kind_count: declaredDialogKinds.size,
                  has_refusal_fallback: declaredDialogKinds.has("refusal_fallback_prompt")
                });
                let bridge = bridgeRef.current;
                if (bridge) lKt(sessionId, bridge.bridgeSessionId, bridge.getLastSequenceNum(), cwd, [...declaredDialogKinds]);
              }
            },
            onInterrupt() {
              Vkn(), A("[bridge:repl] Remote interrupt → onCancel()"), onCancelRef.current();
            },
            onSetModel(modelArg) {
              let isDefault = modelArg == null || modelArg.trim().toLowerCase() === "default",
                resolvedModel = isDefault ? Kg() : modelArg;
              if (!isDefault && !XT(resolvedModel) && !(dF(resolvedModel) ?? Oa(resolvedModel))) {
                let state = store.getState(),
                  errorMessage = mte(resolvedModel, Qo(X9n(state.mainLoopModelForSession, state.mainLoopModel)));
                return addNotification({
                  key: `model-restricted-bridge-${hut(resolvedModel)}`,
                  kind: "warning",
                  text: errorMessage,
                  priority: "immediate"
                }), {
                  ok: !1,
                  error: errorMessage
                };
              }
              Bg(resolvedModel), setAppState(state => {
                if (state.mainLoopModelForSession === resolvedModel) return state;
                return {
                  ...state,
                  mainLoopModelForSession: resolvedModel
                };
              });
            },
            onSetMaxThinkingTokens(tokens) {
              let thinkingEnabled = tokens !== null;
              setAppState(state => {
                if (state.thinkingEnabled === thinkingEnabled) return state;
                return {
                  ...state,
                  thinkingEnabled: thinkingEnabled
                };
              });
            },
            onSetPermissionMode: mode => KMm(mode, store, setAppState),
            onMcpStatus() {
              return store.getState().mcp.clients.map(client => {
                let config;
                if (client.config.type === "sse" || client.config.type === "http") config = {
                  type: client.config.type,
                  url: client.config.url
                };else if (client.config.type === "claudeai-proxy") config = {
                  type: "claudeai-proxy",
                  url: client.config.url,
                  id: client.config.id
                };else if (client.config.type === "stdio" || client.config.type === void 0) config = {
                  type: "stdio",
                  command: client.config.command,
                  args: client.config.args
                };
                return {
                  name: client.name,
                  status: client.type,
                  config: config,
                  scope: client.config.scope,
                  serverInfo: client.type === "connected" ? client.serverInfo : void 0,
                  error: client.type === "failed" ? client.error : void 0
                };
              });
            },
            async onMcpAuthenticate(serverName, customRedirectUri) {
              let serverConfig = store.getState().mcp.clients.find(client => client.name === serverName)?.config;
              if (!serverConfig) throw Error(`MCP server "${serverName}" not found`);
              let authPlan = kW(serverName, serverConfig);
              if (authPlan.kind === "claudeai-proxy") {
                let authUrl = DHe(authPlan.config);
                if (!authUrl) throw Error("Unable to build claude.ai connector auth URL (missing org or server id)");
                return W("tengu_claudeai_mcp_auth_started", {}), {
                  authUrl: authUrl,
                  requiresUserAction: !0,
                  callbackExpected: !1
                };
              }
              if (authPlan.kind === "unsupported-transport") throw Error(`Server type "${authPlan.transport}" does not support OAuth authentication`);
              if (authPlan.kind === "anthropic-hosted") throw Error(authPlan.message);
              let startOAuthFlow = redirectUri => {
                  let resolveAuthUrl,
                    authUrlPromise = new Promise(resolve => {
                      resolveAuthUrl = resolve;
                    }),
                    callbackPort,
                    callbackState,
                    flowPromise = Ej(serverName, authPlan.config, value => resolveAuthUrl(value), void 0, {
                      skipBrowserOpen: !0,
                      redirectUri: redirectUri,
                      onWaitingForCallback: (url, port, state) => {
                        callbackPort = port, callbackState = state;
                      }
                    });
                  return Wst(serverName, flowPromise), Promise.race([authUrlPromise.then(url => ({
                    authUrl: url,
                    callbackPort: callbackPort,
                    state: callbackState
                  })), flowPromise.then(() => null)]);
                },
                flowResult = null,
                redirectScheme = "localhost";
              if (customRedirectUri && !authPlan.config.oauth?.clientId) try {
                flowResult = await startOAuthFlow(customRedirectUri), redirectScheme = "custom";
              } catch (err) {
                A(`[bridge:mcp] AS rejected custom redirectUri for ${serverName}; falling back to localhost: ${Ce(err)}`);
              }
              if (redirectScheme === "localhost") flowResult = await startOAuthFlow();
              if (!flowResult) return {
                requiresUserAction: !1,
                callbackExpected: !1
              };
              return {
                authUrl: flowResult.authUrl,
                requiresUserAction: !0,
                callbackExpected: !0,
                redirectScheme: redirectScheme,
                state: flowResult.state,
                ...(redirectScheme === "localhost" && {
                  callbackPort: flowResult.callbackPort
                })
              };
            },
            async onMcpOauthCallbackUrl(serverName, callbackUrl) {
              let completeCallback = qst(serverName);
              if (!completeCallback) throw Error(`No OAuth flow in progress for "${serverName}" — call mcp_authenticate first`);
              if (!completeCallback(callbackUrl)) throw Error("Invalid callback URL — no authorization code. The flow is still open; retry with the full redirect URL.");
              let pendingFlow = Gst(serverName);
              if (pendingFlow) await pendingFlow;
            },
            async onMcpReconnect(serverName) {
              let reconnect = h7n();
              if (!reconnect) throw Error("MCP controls aren't available right now — the terminal is still starting up or is showing another view");
              OSl(store.getState().mcp.clients, serverName);
              let result = await reconnect(serverName);
              if (result.client.type !== "connected") throw Error(result.client.type === "failed" ? result.client.error ?? "Connection failed" : `Server status: ${result.client.type}`);
            },
            async onGetContextUsage() {
              let {
                  collectContextData: collectContextData
                } = await Promise.resolve().then(() => (X8t(), kRo)),
                state = store.getState(),
                {
                  tools: tools,
                  customSystemPrompt: customSystemPrompt,
                  appendSystemPrompt: appendSystemPrompt
                } = getSessionState();
              return collectContextData({
                messages: messagesRef.current,
                getAppState: store.getState,
                options: {
                  mainLoopModel: modelRef.current,
                  tools: tools,
                  agentDefinitions: state.agentDefinitions,
                  customSystemPrompt: customSystemPrompt,
                  appendSystemPrompt: appendSystemPrompt
                }
              });
            },
            async onGetUsage() {
              let {
                collectUsageData: collectUsageData
              } = await Promise.resolve().then(() => (G8t(), Ufl));
              return collectUsageData({
                includeBehaviors: !1
              });
            },
            onSetColor(colorArg) {
              let isDefault = colorArg === "default";
              if (!isDefault && !__.includes(colorArg)) return {
                ok: !1,
                error: `Unknown color "${colorArg}". Available: ${__.join(", ")}, default`
              };
              let userOverride = isDefault ? void 0 : colorArg,
                sessionId = It();
              g8t(sessionId, colorArg, Nm());
              let state = store.getState(),
                agentDefinition = state.agent ? state.agentDefinitions.activeAgents.find(agent => agent.agentType === state.agent) : void 0;
              return Ivn(eb(), eut({
                userOverride: userOverride,
                agentDefinitionColor: agentDefinition?.color
              })), setAppState(state => {
                if (state.standaloneAgentContext?.color === userOverride) return state;
                return {
                  ...state,
                  standaloneAgentContext: {
                    ...state.standaloneAgentContext,
                    name: state.standaloneAgentContext?.name ?? "",
                    color: userOverride
                  }
                };
              }), {
                ok: !0
              };
            },
            onStateChange: handleStateChange,
            initialMessages: reattachMessageCount !== void 0 ? messages.slice(0, reattachMessageCount) : messages.length > 0 ? messages : void 0,
            getMessages: () => messagesRef.current,
            initialName: replBridgeInitialName,
            enableSessionPersistence: outboundOnly || P0e() || IMo()
          });
        if (cancelled) {
          if (A("[bridge:repl] Hook: init cancelled during flight, tearing down"), bridge) bridge.teardown();
          return;
        }
        if (!bridge) {
          if (failureCountRef.current++, A(`[bridge:repl] Init returned null (precondition or session creation failed); consecutive failures: ${failureCountRef.current}`), retryTimerRef.current?.(), store.getState().replBridgeError !== void 0) scheduleRetry();else if (bridgeExplicit && !outboundOnly && AH()) notifyAndRetry(D6e);else setAppState(state => state.replBridgeEnabled ? {
            ...state,
            replBridgeEnabled: !1
          } : state);
          return;
        }
        if (bridgeRef.current = bridge, M_o(bridge), cM(), failureCountRef.current = 0, !outboundOnly) removeNotification(Dq);
        if (savedSessionIdRef.current = void 0, savedSequenceNumRef.current = void 0, savedDialogKindsRef.current = void 0, savedSnapshotIndexRef.current = void 0, savedFirstUuidRef.current = void 0, savedSessionContinuityRef.current = void 0, archiveCleanupRef.current?.(), archiveCleanupRef.current = void 0, lastWrittenIndexRef.current = reattachMessageCount ?? initialMessageCount, Ws()) YMm(bridge.bridgeSessionId, outboundOnly);else if (!outboundOnly) lKt(sessionId, bridge.bridgeSessionId, bridge.getLastSequenceNum(), cwd, [...declaredDialogKinds]);
        if (outboundOnly) setAppState(state => {
          if (state.replBridgeConnected && state.replBridgeSessionId === bridge.bridgeSessionId) return state;
          return {
            ...state,
            replBridgeConnected: !0,
            replBridgeSessionId: bridge.bridgeSessionId,
            replBridgeSessionUrl: void 0,
            replBridgeConnectUrl: void 0
          };
        }), A(`[bridge:repl] Mirror initialized, session=${bridge.bridgeSessionId}`);else {
          let permissionCallbacks = zMm(bridge, responseHandlers),
            sessionUrl = gT(bridge.bridgeSessionId, bridge.sessionIngressUrl);
          if (setAppState(state => ({
            ...state,
            replBridgePermissionCallbacks: permissionCallbacks,
            replBridgeConnected: !0,
            replBridgeSessionUrl: sessionUrl,
            replBridgeEnvironmentId: bridge.environmentId,
            replBridgeSessionId: bridge.bridgeSessionId,
            replBridgeError: void 0
          })), bridgeExplicit) setMessages(prev => prev.some(message => message.type === "system" && message.subtype === "bridge_status" && message.url === sessionUrl) ? prev : [...prev, Y6l(sessionUrl)]);
          A(`[bridge:repl] Hook initialized, session=${bridge.bridgeSessionId}`);
        }
      } catch (err) {
        if (cancelled) return;
        failureCountRef.current++;
        let errorMessage = Ce(err);
        if (A(`[bridge:repl] Init failed: ${errorMessage}; consecutive failures: ${failureCountRef.current}`), retryTimerRef.current?.(), outboundOnly) setAppState(state => state.replBridgeEnabled ? {
          ...state,
          replBridgeEnabled: !1
        } : state);else notifyAndRetry(errorMessage);
      }
    })(), () => {
      cancelled = !0, Hto(void 0), retryTimerRef.current?.(), retryTimerRef.current = void 0;
      let skipNextArchive = store.getState().replBridgeSkipNextArchive;
      if (skipNextArchive) setAppState(state => {
        if (!state.replBridgeSkipNextArchive) return state;
        return {
          ...state,
          replBridgeSkipNextArchive: !1
        };
      });
      if (bridgeRef.current) {
        let bridge = bridgeRef.current,
          disabledAndNotRetried = !store.getState().replBridgeEnabled && !disabledByRetry,
          skipArchive = skipNextArchive;
        if (!disabledByRetry) savedSessionIdRef.current = void 0, savedSequenceNumRef.current = void 0, savedDialogKindsRef.current = void 0, savedSnapshotIndexRef.current = void 0, savedFirstUuidRef.current = void 0, savedSessionContinuityRef.current = void 0, archiveCleanupRef.current?.(), archiveCleanupRef.current = void 0;
        if (!outboundOnly) if ((disabledAndNotRetried || sessionEnded) && !skipNextArchive) {
          if (TOo(sessionId, cwd), Ws()) jMm();
        } else if (skipNextArchive && !disabledByRetry) IXn();else lKt(sessionId, bridge.bridgeSessionId, bridge.getLastSequenceNum(), cwd, [...declaredDialogKinds]);
        let outboundOnlyChanged = outboundOnly !== store.getState().replBridgeOutboundOnly && store.getState().replBridgeEnabled,
          teardownReason = skipNextArchive || disabledByRetry || outboundOnlyChanged ? void 0 : disabledAndNotRetried ? "remote_control_disabled" : "host_exit";
        A(`[bridge:repl] Hook cleanup: starting teardown for session=${bridge.bridgeSessionId}${skipArchive ? " (skipArchive)" : ""}${teardownReason ? ` reason=${teardownReason}` : ""}`), pendingTeardownRef.current = bridge.teardown({
          skipArchive: skipArchive,
          reason: teardownReason
        }), bridgeRef.current = null, M_o(null);
      }
      if (!disabledByRetry && !outboundOnly) removeNotification(Dq);
      setAppState(state => {
        let preservedError = disabledByRetry || outboundOnly ? state.replBridgeError : void 0;
        if (!state.replBridgeConnected && !state.replBridgeSessionActive && !state.replBridgeReconnecting && !state.replBridgeConnectUrl && !state.replBridgeSessionUrl && !state.replBridgeEnvironmentId && !state.replBridgeSessionId && !state.replBridgePermissionCallbacks && state.replBridgeError === preservedError) return state;
        return {
          ...state,
          replBridgeConnected: !1,
          replBridgeSessionActive: !1,
          replBridgeReconnecting: !1,
          replBridgeConnectUrl: void 0,
          replBridgeSessionUrl: void 0,
          replBridgeEnvironmentId: void 0,
          replBridgeSessionId: void 0,
          replBridgeError: preservedError,
          replBridgePermissionCallbacks: void 0
        };
      }), lastWrittenIndexRef.current = 0;
    };
  }, [replBridgeEnabled, replBridgeOutboundOnly, isSpareBgSource, setAppState, setMessages, addNotification, removeNotification, sendSystemInit, clock]), AS.useEffect(() => {
    if (!replBridgeConnected) return;
    let bridge = bridgeRef.current;
    if (!bridge) return;
    // Clamp written index on compaction and relay only new messages
    if (lastWrittenIndexRef.current > messages.length) A(`[bridge:repl] Compaction detected: lastWrittenIndex=${lastWrittenIndexRef.current} > messages.length=${messages.length}, clamping`);
    let startIndex = Math.min(lastWrittenIndexRef.current, messages.length),
      newMessages = [];
    for (let index = startIndex; index < messages.length; index++) {
      let message = messages[index];
      if (message && (message.type === "user" || message.type === "assistant" || message.type === "system" && message.subtype === "local_command")) newMessages.push(message);
    }
    if (lastWrittenIndexRef.current = messages.length, newMessages.length > 0) bridge.writeMessages(newMessages);
  }, [messages, replBridgeConnected]), AS.useEffect(() => {
    if (!replBridgeConnected) return;
    // Flush pending SDK messages (task events, thinking tokens)
    let flushSdkMessages = () => {
      let bridge = bridgeRef.current;
      if (!bridge) return;
      let sdkMessages = cj().filter(message => message.subtype === "task_started" || message.subtype === "task_progress" || message.subtype === "task_updated" || message.subtype === "task_notification" || message.subtype === "thinking_tokens");
      if (sdkMessages.length > 0) bridge.writeSdkMessages(sdkMessages);
    };
    return l9e(flushSdkMessages), flushSdkMessages(), () => l9e(null);
  }, [replBridgeConnected]), AS.useEffect(() => {
    if (!replBridgeEnabled) cj();
  }, [replBridgeEnabled]), {
    sendBridgeResult: AS.useCallback(() => {
      bridgeRef.current?.sendResult();
    }, [])
  };
}

/** Process an inbound message from the bridge, resolving content and enqueuing it. */
async function VMm(rawMessage, tryRunImmediateCommand, _unused) {
  let prevInboundPromise = o7l,
    resolveInbound;
  o7l = new Promise(resolve => {
    resolveInbound = resolve;
  });
  try {
    let inbound = NZn(rawMessage);
    if (!inbound) return;
    let {
        uuid: uuid
      } = inbound,
      origin = void 0;
    // Attempt fast-path immediate command dispatch
    if (origin?.kind !== "peer" && typeof inbound.content === "string" && tryRunImmediateCommand(inbound.content)) {
      A(`[bridge:repl] Ran immediate command without enqueue: ${inbound.content.slice(0, 80)}${uuid ? ` uuid=${uuid}` : ""}`);
      return;
    }
    await prevInboundPromise;
    let {
        resolveAndPrepend: resolveAndPrepend
      } = await Promise.resolve().then(() => (BNo(), r7l)),
      content = inbound.content,
      resolvedContent = await resolveAndPrepend(rawMessage, content),
      contentLabel = typeof resolvedContent === "string" ? resolvedContent.slice(0, 80) : `[${resolvedContent.length} content blocks]`;
    A(`[bridge:repl] Injecting inbound user message: ${contentLabel}${uuid ? ` uuid=${uuid}` : ""}`);
    let resolvedOrigin = u7t(origin, inbound.clientPlatform);
    iy({
      value: resolvedContent,
      mode: "prompt",
      agentId: rs(),
      uuid: uuid,
      skipSlashCommands: !0,
      ...(origin?.kind === "peer" ? {
        origin: origin,
        isMeta: !0,
        ...(d7t() && {
          priority: "later"
        })
      } : {
        bridgeOrigin: !0,
        clientPlatform: inbound.clientPlatform,
        ...(resolvedOrigin && {
          origin: resolvedOrigin
        }),
        ...(resolvedOrigin?.kind === "task-notification" && c7t(void 0, inbound.clientPlatform) === "later" && {
          priority: "later"
        }),
        ...(Y_t(inbound.clientPlatform, inbound.inboundOrigin) && {
          priority: "later",
          verifiedSlackHumanTurn: !0
        })
      })
    });
  } catch (err) {
    A(`[bridge:repl] handleInboundMessage failed: ${err}`, {
      level: "error"
    });
  } finally {
    prevInboundPromise.then(resolveInbound, resolveInbound);
  }
}

/** Apply a permission mode change requested by the remote bridge. */
function KMm(mode, store, setAppState) {
  if (mode === "bypassPermissions") {
    if (N2()) return {
      ok: !1,
      error: "Cannot set permission mode to bypassPermissions because it is disabled by settings or configuration"
    };
    if (!store.getState().toolPermissionContext.isBypassPermissionsModeAvailable) return {
      ok: !1,
      error: "Cannot set permission mode to bypassPermissions because the session was not launched with --dangerously-skip-permissions"
    };
  }
  if (mode === "auto" && !cv()) {
    let reason = iV();
    return {
      ok: !1,
      error: reason ? `Cannot set permission mode to auto: ${OJ(reason)}` : "Cannot set permission mode to auto"
    };
  }
  return setAppState(state => {
    let currentMode = state.toolPermissionContext.mode;
    if (currentMode === mode) return state;
    let nextContext = PJ(currentMode, mode, state.toolPermissionContext);
    return {
      ...state,
      toolPermissionContext: {
        ...nextContext,
        mode: mode
      }
    };
  }), setImmediate(() => {
    sve.emit();
  }), {
    ok: !0
  };
}

/** Build the bridge permission request/response interface. */
function zMm(bridge, responseHandlers) {
  return {
    sendRequest(requestId, toolName, input, toolUseId, description, permissionSuggestions, blockedPath) {
      bridge.sendControlRequest({
        type: "control_request",
        request_id: requestId,
        request: {
          subtype: "can_use_tool",
          tool_name: toolName,
          display_name: Fce(toolName),
          input: input,
          tool_use_id: toolUseId,
          description: description,
          ...(permissionSuggestions && {
            permission_suggestions: permissionSuggestions
          }),
          ...(blockedPath && {
            blocked_path: blockedPath
          })
        }
      });
    },
    sendResponse(requestId, response) {
      let responseCopy = {
        ...response
      };
      bridge.sendControlResponse({
        type: "control_response",
        response: {
          subtype: "success",
          request_id: requestId,
          response: responseCopy
        }
      });
    },
    cancelRequest(requestId) {
      bridge.sendControlCancelRequest(requestId), responseHandlers.delete(requestId);
    },
    onResponse(requestId, handler) {
      return responseHandlers.set(requestId, handler), () => {
        responseHandlers.delete(requestId);
      };
    }
  };
}

/** Clear bridge session ID from the job directory on clean exit. */
async function jMm() {
  let jobDir = process.env.CLAUDE_JOB_DIR;
  if (!jobDir) return;
  try {
    let metadata = await Oi(jobDir);
    if (!metadata || metadata.bridgeSessionId === void 0) return;
    mT(jobDir);
    let latest = (await Oi(jobDir)) ?? metadata;
    await Id(jobDir, {
      ...latest,
      bridgeSessionId: void 0,
      bridgeOutboundOnly: void 0,
      bridgeSessionSeq: void 0,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    Pm(err);
  }
}

/** Persist the active bridge session ID and outbound-only flag to the job directory. */
async function YMm(bridgeSessionId, outboundOnly) {
  let jobDir = process.env.CLAUDE_JOB_DIR;
  if (!jobDir) return;
  try {
    let metadata = await Oi(jobDir);
    if (!metadata || metadata.bridgeSessionId === bridgeSessionId && metadata.bridgeOutboundOnly === outboundOnly) return;
    mT(jobDir);
    let latest = (await Oi(jobDir)) ?? metadata;
    await Id(jobDir, {
      ...latest,
      bridgeSessionId: bridgeSessionId,
      bridgeOutboundOnly: outboundOnly,
      bridgeSessionSeq: latest.bridgeSessionId === bridgeSessionId ? latest.bridgeSessionSeq : void 0,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    Pm(err);
  }
}

// React namespace alias, JSX runtime alias, retry delay constant, max consecutive init failures, and shared inbound serialization promise
var AS,
  sde,
  qMm = 1e4,
  GMm = 3,
  o7l;
var i7l = b(() => {
  lt();
  lt();
  pH();
  G5n();
  ate();
  BZn();
  M3e();
  FZn();
  WB();
  Mm();
  fd();
  je();
  Pf();
  age();
  Wu();
  jn();
  kt();
  wee();
  $9e();
  wW();
  Sue();
  PZn();
  uo();
  IG();
  F0e();
  ix();
  ud();
  vd();
  tr();
  Po();
  qe();
  _0();
  Ct();
  WS();
  vn();
  ef();
  e7t();
  po();
  Ro();
  eO();
  FS();
  cy();
  RE();
  D_();
  _a();
  c4t();
  SDt();
  V1();
  AS = x(et(), 1), sde = x(oe(), 1);
  o7l = Promise.resolve();
});

export {WMm,s7l,VMm,KMm,zMm,jMm,YMm,AS,sde,qMm,GMm,o7l,i7l};
