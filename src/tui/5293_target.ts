// @ts-nocheck
import {_Ie,C$t} from "../../vendor/m4035.ts";
import {findCommand,isBridgeSafeCommand,findBridgeFallback,getSlashCommandToolSkills,isBridgeDispatchable,Sf} from "../tools/5142_toSlashCommands.ts";
import {hIe,getCommandName} from "../tools/4028_maxEditDistance.ts";
import {useClock} from "../../vendor/m2432.ts";
import {bo,Mc,mt,configProtoStore} from "../../vendor/m2458.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {mcpTools,sJ} from "../../vendor/m4311.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {ec,Dd} from "../../vendor/m687.ts";
import {getCcrAutoConnectDefault,isPersistentRemoteSessionEnabled,isRemoteControlInternalEventsEnabled,isBridgeEnabled,Vk} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {EWt,TYn,SYn,CWt} from "../../vendor/m5255.ts";
import {xO,eC} from "../../vendor/m717.ts";
import {FB,tE} from "../api/1448_month.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {g6,Qat,mte} from "../../vendor/m3821.ts";
import {Text} from "../../vendor/m2423.ts";
import {KJr,v9e} from "../../vendor/m3325.ts";
import {nu,aFl,lo} from "../tools/5190_userPromptCount.ts";
import {getSessionId,setMainLoopModelOverride,mainAgentId,lt} from "../session/0131_sent.ts";
import {qf,ry} from "../agent/2772_withFileTypes.ts";
import {clearBridgeSessionCache,saveBridgeSession,saveAgentColor,clearBridgeSession,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {Gi,ReactHooks} from "../../vendor/m133.ts";
import {tOa,dce,LFn} from "../permissions/3895_request_id.ts";
import {bT} from "../core/2797_toInfraSessionId.ts";
import {BRIDGE_SESSION_ENDED_DETAIL,BRIDGE_LOGIN_HINT} from "../core/3944_REMOTE_CONTROL_DISCONNECTED_MSG.ts";
import {dPo,uPo} from "../../vendor/m5290.ts";
import {fDl,dDl,_7n} from "../../vendor/m5082.ts";
import {MAX_DECLARED_DIALOG_KINDS} from "../session/5015_is_repl.ts";
import {nwn,KAe} from "../config/2691_reason.ts";
import {getDefaultMainLoopModel,isExemptDefaultResolvingPick,isModelAllowedUnderActiveEnforcement,parseUserSpecifiedModel,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {isModelAllowed,MO} from "../../vendor/m1451.ts";
import {_te,hlt} from "../config/3875_aU.ts";
import {bUn,jL} from "../../vendor/m3944.ts";
import {krt,Iee} from "../api/3147_claudeAiMcpEverConnected.ts";
import {Rae,xae,Gnt} from "../config/3017_hosts.ts";
import {Nae,qrt,$rt,jrt,Bae} from "../config/3151_error.ts";
import {O5n,Sue} from "../../vendor/m4650.ts";
import {Vpl} from "../telemetry/4652_call.ts";
import {C6t,fTo} from "../../vendor/m4559.ts";
import {g6t,fal} from "../../vendor/m4536.ts";
import {i_,elt,K0} from "../../vendor/m3824.ts";
import {$En,AC,ma,fC,Lp,kA,mg} from "../agent/2580_level.ts";
import {Upo,EU} from "../../vendor/m4256.ts";
import {detectCurrentRepositoryWithHost,ZI} from "../../vendor/m692.ts";
import {_i,hp} from "../session/1460_promise.ts";
import {Pz,e$e,bC} from "../session/2784_uuid.ts";
import {IYn,IWt,HWt,DAt,DYn} from "../../vendor/m5280.ts";
import {pPo,z3l} from "../../vendor/m5291.ts";
import {oy,sA} from "../../vendor/m2782.ts";
import {DWt,PYn} from "../../vendor/m5281.ts";
import {isBypassPermissionsModeDisabled} from "../telemetry/2224_kFe.ts";
import {isAutoModeGateEnabled,getAutoModeUnavailableReason,getAutoModeUnavailableNotification,transitionPermissionMode,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {Xse,yQe} from "../../vendor/m2218.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {xYn} from "../../vendor/m5263.ts";
import {YHe} from "../../vendor/m3881.ts";
import {Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Rn} from "../session/0615_length.ts";
import {Te} from "../../vendor/m2253.ts";
/**
 * Parse a bridge-safe slash command from raw user input.
 * Returns null if the input cannot be dispatched immediately via bridge.
 */
function fxm(e: any, t: any) {
  let n = _Ie(e);
  if (!n) return null;
  let r = findCommand(n.commandName, t);
  if (!r || !hIe(r, n.args)) return null;
  let o = r.type === "local" && isBridgeSafeCommand(r) ? r : findBridgeFallback(r);
  if (!o || o.type !== "local") return null;
  return {
    target: o,
    args: n.args,
    displayName: getCommandName(r)
  };
}

/**
 * React hook managing the full REPL bridge lifecycle:
 * initialization, message relay, permission callbacks, model/mode changes, and teardown.
 */
function J3l(e: any, t: any, n: any, r: any, o: any, s: any, i: any, a: any) {
  // Clock for scheduling retries
  let l = useClock(),
    // Ref to the active bridge instance
    c = $A.useRef(null),
    // Ref to the pending teardown promise
    u = $A.useRef(void 0),
    // Count of messages written to the bridge
    d = $A.useRef(0),
    // Ref to the scheduled retry timer handle
    p = $A.useRef(void 0),
    // Last snapshot index saved for reattach
    m = $A.useRef(0),
    // Saved bridge session ID for reattach
    f = $A.useRef(void 0),
    // Saved last sequence number for reattach
    A = $A.useRef(void 0),
    // Saved dialog kinds set for reattach
    h = $A.useRef(void 0),
    // Saved first message uuid for session continuity check
    g = $A.useRef(void 0),
    // Saved attestation state
    _ = $A.useRef(void 0),
    // Saved session ID for continuity check
    y = $A.useRef(void 0),
    // Teardown archive cleanup function
    T = $A.useRef(void 0),
    // Zustand store dispatch
    S = bo(),
    // Ref to current commands list
    v = $A.useRef(r);
  v.current = r;
  let R = $A.useRef(a);
  R.current = a;
  // Try to run a bridge message as an immediate slash command
  let k = (J: any) => {
      let ee = R.current;
      if (!ee) return !1;
      let te = fxm(J, v.current);
      if (!te) return !1;
      return logEvent("tengu_immediate_command_executed", {
        commandName: te.displayName,
        fromKeybinding: !1,
        bridgeOrigin: !0
      }), ee(te.target, te.args, te.displayName), !0;
    },
    x = $A.useRef(o);
  x.current = o;
  let H = $A.useRef(e);
  H.current = e;
  let I = Mc(),
    P = mcpTools(),
    {
      addNotification: L,
      removeNotification: D
    } = Ui(),
    N = mt((J: any) => J.replBridgeEnabled),
    O = mt((J: any) => J.replBridgeConnected),
    $ = mt((J: any) => J.replBridgeOutboundOnly),
    U = mt((J: any) => J.replBridgeInitialName),
    W = mt((J: any) => J.toolPermissionContext.mode),
    G = mt((J: any) => J.fastMode),
    [V, Q] = $A.useState(() => process.env.CLAUDE_BG_SOURCE === "spare");
  if (V && e.length > 0) Q(!1);
  $A.useEffect(() => {
    if (ec() || V) return;
    logEvent("tengu_bridge_repl_evaluated", {
      would_auto_on: getCcrAutoConnectDefault(),
      repl_bridge_enabled: I.getState().replBridgeEnabled
    });
  }, [I, V]);
  // Send system/init message to bridge when feature flag is enabled
  let K = $A.useCallback(() => {
    let J = c.current;
    if (!J || !getFeatureValue_CACHED_MAY_BE_STALE("tengu_bridge_system_init", !1)) return;
    (async () => {
      try {
        let ee = await getSlashCommandToolSkills(Pt()),
          te = I.getState(),
          ne = performance.now(),
          re = EWt({
            ...TYn(),
            tools: [],
            mcpClients: [],
            model: x.current,
            permissionMode: xO(te.toolPermissionContext.mode),
            commands: v.current.filter(isBridgeDispatchable),
            agents: te.agentDefinitions.activeAgents,
            skills: ee,
            plugins: [],
            pluginErrors: [],
            pluginWarnings: [],
            fastModeState: FB(x.current, te.fastMode)
          });
        SYn(re, ne), J.writeSdkMessages([re]);
      } catch (ee: any) {
        logForDebugging(`[bridge:repl] Failed to send system/init: ${Se(ee)}`, {
          level: "error"
        });
      }
    })();
  }, [I]);
  return $A.useEffect(() => {
    if (!O || $) return;
    K();
  }, [O, $, o, W, G, K]), $A.useEffect(() => {
    if (!N || ec() || V) return;
    let J = $;
    if (!J) D(g6), S((Ae: any) => Ae.replBridgeError === void 0 ? Ae : {
      ...Ae,
      replBridgeError: void 0
    });
    let ee = I.getState().replBridgeExplicit;
    // Notify user of bridge failure/disconnect with a warning notification
    function te(Ae: any, ge = !1) {
      if (logForDebugging(`[bridge:repl] notifyBridgeFailed detail="${Ae}" outboundOnly=${J} wasConnected=${ge}`), J) return;
      L({
        key: g6,
        kind: "warning",
        jsx: $A.default.createElement($A.default.Fragment, null, $A.default.createElement(Text, {
          color: "error"
        }, "Remote Control ", ge ? "disconnected" : "failed"), $A.default.createElement(Text, {
          dimColor: !0
        }, " \xB7 ", Ae || "/remote-control")),
        priority: "immediate",
        requeueOnPreempt: !0,
        invalidates: [g6]
      });
    }
    function ne(Ae: any) {
      te(Ae), S((ge: any) => ({
        ...ge,
        replBridgeError: Ae
      })), pe();
    }
    if (m.current >= Axm) {
      logForDebugging(`[bridge:repl] Hook: ${m.current} consecutive init failures, not retrying this session`), te(Qat), S((Ae: any) => {
        if (Ae.replBridgeError === Qat && !Ae.replBridgeEnabled) return Ae;
        return {
          ...Ae,
          replBridgeError: Qat,
          replBridgeEnabled: !1
        };
      });
      return;
    }
    // Register attestation-drop listener for unsigned messages
    if (!J) KJr(({
      status: Ae,
      payloadType: ge
    }: any) => {
      let Ce = ge === "control_response" ? "permission response" : "message";
      L({
        key: "bridge-attestation-drop",
        kind: "warning",
        jsx: $A.default.createElement($A.default.Fragment, null, $A.default.createElement(Text, {
          color: "error"
        }, "Remote Control: unsigned ", Ce, " rejected"), $A.default.createElement(Text, {
          dimColor: !0
        }, " \xB7 attestation: ", Ae)),
        priority: "immediate"
      });
      let xe = `Remote Control received a ${Ce} without a valid device signature (attestation: ${Ae}) and will not execute it.`;
      t((Re: any) => {
        let Me = Re.at(-1);
        if (Me?.type === "system" && Me.subtype === "informational" && Me.content === xe) return Re;
        return [...Re, nu(xe, "warning")];
      });
    });
    let re = !1,
      oe = e.length,
      ce = getSessionId(),
      ue = qf();
    // Reset saved reattach state if session has changed
    if (y.current !== void 0 && y.current !== ce) f.current = void 0, A.current = void 0, h.current = void 0, g.current = void 0, _.current = void 0, y.current = void 0, T.current?.(), T.current = void 0;
    let ae = _.current !== void 0 && e[0]?.uuid !== _.current;
    if (ae) clearBridgeSessionCache();
    let he = !ae && g.current !== void 0 ? Math.min(g.current, e.length) : void 0,
      se = !1,
      le = !1;
    // Schedule a retry after a delay, saving current bridge state for reattach
    function pe() {
      let Ae = H.current[0]?.uuid;
      p.current = l.setTimeout(() => {
        if (re) return;
        p.current = void 0;
        let ge = c.current;
        if (ge) f.current = ge.bridgeSessionId, A.current = ge.getLastSequenceNum(), h.current = _e.size > 0 ? new Set(_e) : void 0, g.current = d.current, _.current = Ae, y.current = ce, T.current?.(), T.current = ge.archive ? Gi(() => ge.archive?.()) : void 0;
        S((Ce: any) => {
          if (!Ce.replBridgeError) return Ce;
          return se = !0, {
            ...Ce,
            replBridgeEnabled: !1,
            ...(ge && {
              replBridgeSkipNextArchive: !0
            })
          };
        });
      }, mxm);
    }
    let de = new Map(),
      _e = new Set();
    // Restore previously saved dialog kinds for reattach
    if (!ae && f.current !== void 0) for (let Ae of h.current ?? []) _e.add(Ae);
    // Handle inbound control_response by dispatching to registered handler
    function fe(Ae: any) {
      let ge = Ae.response?.request_id;
      if (!ge) return !1;
      let Ce = de.get(ge);
      if (!Ce) return logForDebugging(`[bridge:repl] No handler for control_response request_id=${ge} (late response after local resolve, stale reattach dialog, or unknown id)`, {
        level: "verbose"
      }), !1;
      de.delete(ge);
      let xe = Ae.response;
      if (xe.subtype === "success" && xe.response && tOa(xe.response)) Ce(xe.response);
      return !0;
    }
    // Handle bridge state transitions (ready/connected/reconnecting/failed)
    function ie(Ae: any, ge: any) {
      if (logForDebugging(`[bridge:repl] handleStateChange state=${Ae} detail="${ge}" cancelled=${re} outboundOnly=${J}`), re) return;
      if (J) {
        if (logForDebugging(`[bridge:repl] Mirror state=${Ae}${ge ? ` detail=${ge}` : ""}`), Ae === "failed") S((xe: any) => {
          if (!xe.replBridgeConnected) return xe;
          return {
            ...xe,
            replBridgeConnected: !1
          };
        });else if (Ae === "ready" || Ae === "connected") S((xe: any) => {
          if (xe.replBridgeConnected) return xe;
          return {
            ...xe,
            replBridgeConnected: !0
          };
        });
        return;
      }
      let Ce = c.current;
      switch (Ae) {
        case "ready":
          D(g6), S((xe: any) => {
            let Re = Ce ? bT(Ce.bridgeSessionId, Ce.sessionIngressUrl) : xe.replBridgeSessionUrl,
              Me = Ce?.environmentId,
              Ke = Ce?.bridgeSessionId;
            if (xe.replBridgeConnected && !xe.replBridgeSessionActive && !xe.replBridgeReconnecting && xe.replBridgeSessionUrl === Re && xe.replBridgeEnvironmentId === Me && xe.replBridgeSessionId === Ke) return xe;
            return {
              ...xe,
              replBridgeConnected: !0,
              replBridgeSessionActive: !1,
              replBridgeReconnecting: !1,
              replBridgeSessionUrl: Re,
              replBridgeEnvironmentId: Me,
              replBridgeSessionId: Ke,
              replBridgeError: void 0
            };
          });
          break;
        case "connected":
          {
            D(g6), S((xe: any) => {
              if (xe.replBridgeSessionActive) return xe;
              return {
                ...xe,
                replBridgeConnected: !0,
                replBridgeSessionActive: !0,
                replBridgeReconnecting: !1,
                replBridgeError: void 0
              };
            }), K();
            break;
          }
        case "reconnecting":
          S((xe: any) => {
            if (xe.replBridgeReconnecting) return xe;
            return {
              ...xe,
              replBridgeReconnecting: !0,
              replBridgeSessionActive: !1
            };
          });
          break;
        case "failed":
          if (p.current?.(), te(ge, Ce !== null), ge === BRIDGE_SESSION_ENDED_DETAIL) {
            se = !0, le = !0, S((xe: any) => ({
              ...xe,
              replBridgeEnabled: !1,
              replBridgeReconnecting: !1,
              replBridgeSessionActive: !1,
              replBridgeConnected: !1,
              replBridgeError: void 0
            }));
            break;
          }
          S((xe: any) => ({
            ...xe,
            replBridgeError: ge,
            replBridgeReconnecting: !1,
            replBridgeSessionActive: !1,
            replBridgeConnected: !1
          })), pe();
          break;
      }
    }
    return (async () => {
      try {
        // Wait for previous teardown to complete before re-initializing
        if (u.current) logForDebugging("[bridge:repl] Hook: waiting for previous teardown to complete before re-init"), await u.current, u.current = void 0, logForDebugging("[bridge:repl] Hook: previous teardown complete, proceeding with re-init");
        if (re) return;
        let {
            initReplBridge: Ae
          } = await Promise.resolve().then(() => (dPo(), uPo)),
          ge = await Ae({
            outboundOnly: J,
            reattachSessionId: ae ? void 0 : f.current,
            reattachSequenceNum: ae ? void 0 : A.current,
            tags: J ? [fDl] : [ee ? dDl : _7n],
            getToolPermissionContext: () => I.getState().toolPermissionContext,
            getTools: () => s().tools,
            onInboundMessage: (Ce: any) => hxm(Ce, k, void 0),
            onPermissionResponse: fe,
            getInitializeState() {
              return {
                current_model: x.current,
                current_permission_mode: xO(I.getState().toolPermissionContext.mode)
              };
            },
            onDialogKindsDeclared: J ? void 0 : (Ce: any, xe: any) => {
              let Re = _e.size;
              for (let Me of Ce) {
                if (_e.size >= MAX_DECLARED_DIALOG_KINDS) break;
                _e.add(Me);
              }
              if (xe !== "restored" && _e.size > Re) {
                logEvent("tengu_repl_bridge_dialog_kinds_declared", {
                  kind_count: _e.size,
                  has_refusal_fallback: _e.has("refusal_fallback_prompt")
                });
                let Me = c.current;
                if (Me) saveBridgeSession(ce, Me.bridgeSessionId, Me.getLastSequenceNum(), ue, [..._e]);
              }
            },
            onInterrupt() {
              nwn(), logForDebugging("[bridge:repl] Remote interrupt → onCancel()"), n.current();
            },
            onSetModel(Ce: any) {
              let xe = Ce == null || Ce.trim().toLowerCase() === "default",
                Re = xe ? getDefaultMainLoopModel() : Ce;
              if (!xe && !isExemptDefaultResolvingPick(Re) && !(isModelAllowedUnderActiveEnforcement(Re) ?? isModelAllowed(Re))) {
                let Me = I.getState(),
                  Ke = _te(Re, parseUserSpecifiedModel(bUn(Me.mainLoopModelForSession, Me.mainLoopModel)));
                return L({
                  key: `model-restricted-bridge-${hlt(Re)}`,
                  kind: "warning",
                  text: Ke,
                  priority: "immediate"
                }), {
                  ok: !1,
                  error: Ke
                };
              }
              setMainLoopModelOverride(Re), S((Me: any) => {
                if (Me.mainLoopModelForSession === Re) return Me;
                return {
                  ...Me,
                  mainLoopModelForSession: Re
                };
              });
            },
            onSetMaxThinkingTokens(Ce: any) {
              let xe = Ce !== null;
              S((Re: any) => {
                if (Re.thinkingEnabled === xe) return Re;
                return {
                  ...Re,
                  thinkingEnabled: xe
                };
              });
            },
            onSetPermissionMode: (Ce: any) => gxm(Ce, I, S),
            onMcpStatus() {
              return I.getState().mcp.clients.map((Ce: any) => {
                let xe: any;
                if (Ce.config.type === "sse" || Ce.config.type === "http") xe = {
                  type: Ce.config.type,
                  url: Ce.config.url
                };else if (Ce.config.type === "claudeai-proxy") xe = {
                  type: "claudeai-proxy",
                  url: Ce.config.url,
                  id: Ce.config.id
                };else if (Ce.config.type === "stdio" || Ce.config.type === void 0) xe = {
                  type: "stdio",
                  command: Ce.config.command,
                  args: Ce.config.args
                };
                return {
                  name: Ce.name,
                  status: Ce.type,
                  config: xe,
                  scope: Ce.config.scope,
                  serverInfo: Ce.type === "connected" ? Ce.serverInfo : void 0,
                  error: Ce.type === "failed" ? Ce.error : void 0
                };
              });
            },
            async onMcpAuthenticate(Ce: any, xe: any) {
              let Re = I.getState().mcp.clients.find((Ge: any) => Ge.name === Ce)?.config;
              if (!Re) throw Error(`MCP server "${Ce}" not found`);
              if (Re.type === "claudeai-proxy") {
                let Ge = krt(Re);
                if (!Ge) throw Error("Unable to build claude.ai connector auth URL (missing org or server id)");
                return logEvent("tengu_claudeai_mcp_auth_started", {}), {
                  authUrl: Ge,
                  requiresUserAction: !0,
                  callbackExpected: !1
                };
              }
              if (Re.type !== "sse" && Re.type !== "http") throw Error(`Server type "${Re.type}" does not support OAuth authentication`);
              if (Rae(Re.url)) throw Error(xae(Ce, {
                scope: Re.scope
              }));
              let Me = (Ge: any) => {
                  let Ye: any,
                    ot = new Promise((Rt: any) => {
                      Ye = Rt;
                    }),
                    vt: any,
                    $e: any,
                    Je = Nae(Ce, Re, (Rt: any) => Ye(Rt), void 0, {
                      skipBrowserOpen: !0,
                      redirectUri: Ge,
                      onWaitingForCallback: (Rt: any, Et: any, dt: any) => {
                        vt = Et, $e = dt;
                      }
                    });
                  return qrt(Ce, Je), Promise.race([ot.then((Rt: any) => ({
                    authUrl: Rt,
                    callbackPort: vt,
                    state: $e
                  })), Je.then(() => null)]);
                },
                Ke = null,
                He = "localhost";
              if (xe && !Re.oauth?.clientId) try {
                Ke = await Me(xe), He = "custom";
              } catch (Ge: any) {
                logForDebugging(`[bridge:mcp] AS rejected custom redirectUri for ${Ce}; falling back to localhost: ${Se(Ge)}`);
              }
              if (He === "localhost") Ke = await Me();
              if (!Ke) return {
                requiresUserAction: !1,
                callbackExpected: !1
              };
              return {
                authUrl: Ke.authUrl,
                requiresUserAction: !0,
                callbackExpected: !0,
                redirectScheme: He,
                state: Ke.state,
                ...(He === "localhost" && {
                  callbackPort: Ke.callbackPort
                })
              };
            },
            async onMcpOauthCallbackUrl(Ce: any, xe: any) {
              let Re = $rt(Ce);
              if (!Re) throw Error(`No OAuth flow in progress for "${Ce}" — call mcp_authenticate first`);
              if (!Re(xe)) throw Error("Invalid callback URL — no authorization code. The flow is still open; retry with the full redirect URL.");
              let Me = jrt(Ce);
              if (Me) await Me;
            },
            async onMcpReconnect(Ce: any) {
              let xe = O5n();
              if (!xe) throw Error("MCP controls aren't available right now — the terminal is still starting up or is showing another view");
              Vpl(I.getState().mcp.clients, Ce);
              let Re = await xe(Ce);
              if (Re.client.type !== "connected") throw Error(Re.client.type === "failed" ? Re.client.error ?? "Connection failed" : `Server status: ${Re.client.type}`);
            },
            async onGetContextUsage() {
              let {
                  collectContextData: Ce
                } = await Promise.resolve().then(() => (C6t(), fTo)),
                xe = I.getState(),
                {
                  tools: Re,
                  customSystemPrompt: Me,
                  appendSystemPrompt: Ke
                } = s();
              return Ce({
                messages: H.current,
                getAppState: I.getState,
                options: {
                  mainLoopModel: x.current,
                  tools: Re,
                  agentDefinitions: xe.agentDefinitions,
                  customSystemPrompt: Me,
                  appendSystemPrompt: Ke
                }
              });
            },
            async onGetUsage() {
              let {
                collectUsageData: Ce
              } = await Promise.resolve().then(() => (g6t(), fal));
              return Ce({
                includeBehaviors: !1
              });
            },
            onSetColor(Ce: any) {
              let xe = Ce === "default";
              if (!xe && !i_.includes(Ce)) return {
                ok: !1,
                error: `Unknown color "${Ce}". Available: ${i_.join(", ")}, default`
              };
              let Re = xe ? void 0 : Ce,
                Me = getSessionId();
              saveAgentColor(Me, Ce, qf());
              let Ke = I.getState(),
                He = Ke.agent ? Ke.agentDefinitions.activeAgents.find((Ge: any) => Ge.agentType === Ke.agent) : void 0;
              return $En(AC(), elt({
                userOverride: Re,
                agentDefinitionColor: He?.color
              })), S((Ge: any) => {
                if (Ge.standaloneAgentContext?.color === Re) return Ge;
                return {
                  ...Ge,
                  standaloneAgentContext: {
                    ...Ge.standaloneAgentContext,
                    name: Ge.standaloneAgentContext?.name ?? "",
                    color: Re
                  }
                };
              }), {
                ok: !0
              };
            },
            onStateChange: ie,
            initialMessages: he !== void 0 ? e.slice(0, he) : e.length > 0 ? e : void 0,
            getMessages: () => H.current,
            initialName: U,
            enableSessionPersistence: J || isPersistentRemoteSessionEnabled() || isRemoteControlInternalEventsEnabled()
          });
        if (re) {
          if (logForDebugging("[bridge:repl] Hook: init cancelled during flight, tearing down"), ge) ge.teardown();
          return;
        }
        if (!ge) {
          if (m.current++, logForDebugging(`[bridge:repl] Init returned null (precondition or session creation failed); consecutive failures: ${m.current}`), p.current?.(), I.getState().replBridgeError !== void 0) pe();else if (ee && !J && isBridgeEnabled()) ne(BRIDGE_LOGIN_HINT);else S((Ce: any) => Ce.replBridgeEnabled ? {
            ...Ce,
            replBridgeEnabled: !1
          } : Ce);
          return;
        }
        if (c.current = ge, Upo(ge), detectCurrentRepositoryWithHost(), m.current = 0, !J) D(g6);
        if (f.current = void 0, A.current = void 0, h.current = void 0, g.current = void 0, _.current = void 0, y.current = void 0, T.current?.(), T.current = void 0, d.current = he ?? oe, _i()) Txm(ge.bridgeSessionId, J);else if (!J) saveBridgeSession(ce, ge.bridgeSessionId, ge.getLastSequenceNum(), ue, [..._e]);
        if (J) S((Ce: any) => {
          if (Ce.replBridgeConnected && Ce.replBridgeSessionId === ge.bridgeSessionId) return Ce;
          return {
            ...Ce,
            replBridgeConnected: !0,
            replBridgeSessionId: ge.bridgeSessionId,
            replBridgeSessionUrl: void 0,
            replBridgeConnectUrl: void 0
          };
        }), logForDebugging(`[bridge:repl] Mirror initialized, session=${ge.bridgeSessionId}`);else {
          let Ce = _xm(ge, de),
            xe = bT(ge.bridgeSessionId, ge.sessionIngressUrl);
          if (S((Re: any) => ({
            ...Re,
            replBridgePermissionCallbacks: Ce,
            replBridgeConnected: !0,
            replBridgeSessionUrl: xe,
            replBridgeEnvironmentId: ge.environmentId,
            replBridgeSessionId: ge.bridgeSessionId,
            replBridgeError: void 0
          })), ee) t((Re: any) => Re.some((Me: any) => Me.type === "system" && Me.subtype === "bridge_status" && Me.url === xe) ? Re : [...Re, aFl(xe)]);
          logForDebugging(`[bridge:repl] Hook initialized, session=${ge.bridgeSessionId}`);
        }
      } catch (Ae: any) {
        if (re) return;
        m.current++;
        let ge = Se(Ae);
        if (logForDebugging(`[bridge:repl] Init failed: ${ge}; consecutive failures: ${m.current}`), p.current?.(), J) S((Ce: any) => Ce.replBridgeEnabled ? {
          ...Ce,
          replBridgeEnabled: !1
        } : Ce);else ne(ge);
      }
    })(), () => {
      re = !0, KJr(void 0), p.current?.(), p.current = void 0;
      let Ae = I.getState().replBridgeSkipNextArchive;
      if (Ae) S((ge: any) => {
        if (!ge.replBridgeSkipNextArchive) return ge;
        return {
          ...ge,
          replBridgeSkipNextArchive: !1
        };
      });
      if (c.current) {
        let ge = c.current,
          Ce = !I.getState().replBridgeEnabled && !se,
          xe = Ae;
        if (!se) f.current = void 0, A.current = void 0, h.current = void 0, g.current = void 0, _.current = void 0, y.current = void 0, T.current?.(), T.current = void 0;
        if (!J) if ((Ce || le) && !Ae) {
          if (clearBridgeSession(ce, ue), _i()) yxm();
        } else if (Ae && !se) clearBridgeSessionCache();else saveBridgeSession(ce, ge.bridgeSessionId, ge.getLastSequenceNum(), ue, [..._e]);
        let Re = J !== I.getState().replBridgeOutboundOnly && I.getState().replBridgeEnabled,
          Me = Ae || se || Re ? void 0 : Ce ? "remote_control_disabled" : "host_exit";
        logForDebugging(`[bridge:repl] Hook cleanup: starting teardown for session=${ge.bridgeSessionId}${xe ? " (skipArchive)" : ""}${Me ? ` reason=${Me}` : ""}`), u.current = ge.teardown({
          skipArchive: xe,
          reason: Me
        }), c.current = null, Upo(null);
      }
      if (!se && !J) D(g6);
      S((ge: any) => {
        let Ce = se || J ? ge.replBridgeError : void 0;
        if (!ge.replBridgeConnected && !ge.replBridgeSessionActive && !ge.replBridgeReconnecting && !ge.replBridgeConnectUrl && !ge.replBridgeSessionUrl && !ge.replBridgeEnvironmentId && !ge.replBridgeSessionId && !ge.replBridgePermissionCallbacks && ge.replBridgeError === Ce) return ge;
        return {
          ...ge,
          replBridgeConnected: !1,
          replBridgeSessionActive: !1,
          replBridgeReconnecting: !1,
          replBridgeConnectUrl: void 0,
          replBridgeSessionUrl: void 0,
          replBridgeEnvironmentId: void 0,
          replBridgeSessionId: void 0,
          replBridgeError: Ce,
          replBridgePermissionCallbacks: void 0
        };
      }), d.current = 0;
    };
  }, [N, $, V, S, t, L, D, K, l]), $A.useEffect(() => {
    if (!O) return;
    let J = c.current;
    if (!J) return;
    // Clamp written index on compaction and relay only new messages
    if (d.current > e.length) logForDebugging(`[bridge:repl] Compaction detected: lastWrittenIndex=${d.current} > messages.length=${e.length}, clamping`);
    let ee = Math.min(d.current, e.length),
      te: any[] = [];
    for (let ne = ee; ne < e.length; ne++) {
      let re = e[ne];
      if (re && (re.type === "user" || re.type === "assistant" || re.type === "system" && re.subtype === "local_command")) te.push(re);
    }
    if (d.current = e.length, te.length > 0) J.writeMessages(te);
  }, [e, O]), $A.useEffect(() => {
    if (!O) return;
    // Flush pending SDK messages (task events, thinking tokens)
    let J = () => {
      let ee = c.current;
      if (!ee) return;
      let te = Pz().filter((ne: any) => ne.subtype === "task_started" || ne.subtype === "task_progress" || ne.subtype === "task_updated" || ne.subtype === "task_notification" || ne.subtype === "thinking_tokens");
      if (te.length > 0) ee.writeSdkMessages(te);
    };
    return e$e(J), J(), () => e$e(null);
  }, [O]), $A.useEffect(() => {
    if (!N) Pz();
  }, [N]), {
    sendBridgeResult: $A.useCallback(() => {
      c.current?.sendResult();
    }, [])
  };
}

/** Process an inbound message from the bridge, resolving content and enqueuing it. */
async function hxm(e: any, t: any, n: any) {
  let r = Y3l,
    o: any;
  Y3l = new Promise((s: any) => {
    o = s;
  });
  try {
    let s = IYn(e);
    if (!s) return;
    let {
        uuid: i
      } = s,
      a = void 0;
    // Attempt fast-path immediate command dispatch
    if (a?.kind !== "peer" && typeof s.content === "string" && t(s.content)) {
      logForDebugging(`[bridge:repl] Ran immediate command without enqueue: ${s.content.slice(0, 80)}${i ? ` uuid=${i}` : ""}`);
      return;
    }
    await r;
    let {
        resolveAndPrepend: l
      } = await Promise.resolve().then(() => (pPo(), z3l)),
      c = s.content,
      u = await l(e, c),
      d = typeof u === "string" ? u.slice(0, 80) : `[${u.length} content blocks]`;
    logForDebugging(`[bridge:repl] Injecting inbound user message: ${d}${i ? ` uuid=${i}` : ""}`);
    let p = IWt(a, s.clientPlatform);
    oy({
      value: u,
      mode: "prompt",
      agentId: mainAgentId(),
      uuid: i,
      skipSlashCommands: !0,
      ...(a?.kind === "peer" ? {
        origin: a,
        isMeta: !0,
        ...(DWt() && {
          priority: "later"
        })
      } : {
        bridgeOrigin: !0,
        clientPlatform: s.clientPlatform,
        ...(p && {
          origin: p
        }),
        ...(p?.kind === "task-notification" && HWt(void 0, s.clientPlatform) === "later" && {
          priority: "later"
        }),
        ...(DAt(s.clientPlatform, s.inboundOrigin) && {
          priority: "later",
          verifiedSlackHumanTurn: !0
        })
      })
    });
  } catch (s: any) {
    logForDebugging(`[bridge:repl] handleInboundMessage failed: ${s}`, {
      level: "error"
    });
  } finally {
    r.then(o, o);
  }
}

/** Apply a permission mode change requested by the remote bridge. */
function gxm(e: any, t: any, n: any) {
  if (e === "bypassPermissions") {
    if (isBypassPermissionsModeDisabled()) return {
      ok: !1,
      error: "Cannot set permission mode to bypassPermissions because it is disabled by settings or configuration"
    };
    if (!t.getState().toolPermissionContext.isBypassPermissionsModeAvailable) return {
      ok: !1,
      error: "Cannot set permission mode to bypassPermissions because the session was not launched with --dangerously-skip-permissions"
    };
  }
  if (e === "auto" && !isAutoModeGateEnabled()) {
    let r = getAutoModeUnavailableReason();
    return {
      ok: !1,
      error: r ? `Cannot set permission mode to auto: ${getAutoModeUnavailableNotification(r)}` : "Cannot set permission mode to auto"
    };
  }
  return n((r: any) => {
    let o = r.toolPermissionContext.mode;
    if (o === e) return r;
    let s = transitionPermissionMode(o, e, r.toolPermissionContext);
    return {
      ...r,
      toolPermissionContext: {
        ...s,
        mode: e
      }
    };
  }), setImmediate(() => {
    Xse.emit();
  }), {
    ok: !0
  };
}

/** Build the bridge permission request/response interface. */
function _xm(e: any, t: any) {
  return {
    sendRequest(n: any, r: any, o: any, s: any, i: any, a: any, l: any) {
      e.sendControlRequest({
        type: "control_request",
        request_id: n,
        request: {
          subtype: "can_use_tool",
          tool_name: r,
          display_name: dce(r),
          input: o,
          tool_use_id: s,
          description: i,
          ...(a && {
            permission_suggestions: a
          }),
          ...(l && {
            blocked_path: l
          })
        }
      });
    },
    sendResponse(n: any, r: any) {
      let o = {
        ...r
      };
      e.sendControlResponse({
        type: "control_response",
        response: {
          subtype: "success",
          request_id: n,
          response: o
        }
      });
    },
    cancelRequest(n: any) {
      e.sendControlCancelRequest(n), t.delete(n);
    },
    onResponse(n: any, r: any) {
      return t.set(n, r), () => {
        t.delete(n);
      };
    }
  };
}

/** Clear bridge session ID from the job directory on clean exit. */
async function yxm() {
  let e = process.env.CLAUDE_JOB_DIR;
  if (!e) return;
  try {
    let t = await ma(e);
    if (!t || t.bridgeSessionId === void 0) return;
    fC(e);
    let n = (await ma(e)) ?? t;
    await Lp(e, {
      ...n,
      bridgeSessionId: void 0,
      bridgeOutboundOnly: void 0,
      bridgeSessionSeq: void 0,
      updatedAt: new Date().toISOString()
    });
  } catch (t: any) {
    kA(t);
  }
}

/** Persist the active bridge session ID and outbound-only flag to the job directory. */
async function Txm(e: any, t: any) {
  let n = process.env.CLAUDE_JOB_DIR;
  if (!n) return;
  try {
    let r = await ma(n);
    if (!r || r.bridgeSessionId === e && r.bridgeOutboundOnly === t) return;
    fC(n);
    let o = (await ma(n)) ?? r;
    await Lp(n, {
      ...o,
      bridgeSessionId: e,
      bridgeOutboundOnly: t,
      bridgeSessionSeq: o.bridgeSessionId === e ? o.bridgeSessionSeq : void 0,
      updatedAt: new Date().toISOString()
    });
  } catch (r: any) {
    kA(r);
  }
}

// React namespace alias, retry delay constant, max consecutive init failures, and shared inbound serialization promise
var $A: any,
  mxm = 1e4,
  Axm = 3,
  Y3l: any;
var X3l = b(() => {
  lt();
  lt();
  Vk();
  LFn();
  mte();
  PYn();
  v9e();
  DYn();
  EU();
  Sf();
  Ld();
  ze();
  mg();
  KAe();
  Dd();
  zn();
  Ct();
  Gnt();
  Bae();
  Iee();
  Sue();
  xYn();
  configProtoStore();
  sJ();
  YHe();
  K0();
  ReactHooks();
  hp();
  Qn();
  Go();
  qe();
  ZI();
  bt();
  tE();
  Rn();
  sA();
  CWt();
  lo();
  Mo();
  MO();
  eC();
  ly();
  bC();
  ry();
  ja();
  C$t();
  yQe();
  jL();
  $A = M(Te(), 1);
  Y3l = Promise.resolve();
});
export {fxm,J3l,hxm,gxm,_xm,yxm,Txm,$A,mxm,Axm,Y3l,X3l};
