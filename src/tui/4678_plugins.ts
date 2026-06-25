// @ts-nocheck
import {getIsRemoteMode as la,getAllowedChannels as Nb,mainAgentId as rs,getSessionId as It,lt} from "../session/0132_sent.ts";
import {gc,_t,bo,uo} from "../../vendor/m2468.ts";
import {useClock as As,g2e} from "../../vendor/m2442.ts";
import {iKa,nKa,qho} from "../telemetry/4180_onResponse.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {m3,T0} from "../mcp/0733_serverName.ts";
import {isMcpServerBlockedAtConnectTime as H$,isMcpServerDisabled as Qk,getClaudeCodeMcpConfigs as Sj,filterDynamicMcpServersByPolicy as Nst,shouldSkipClaudeAiFetchForEnterpriseLockdown as Fst,filterMcpServersByPolicy as K4,dedupClaudeAiMcpServers as Lst,suppressedConnectorsEqual as NNt,setMcpServerEnabled as F9e,KA} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {markClaudeInChromeUnwiredIfChrome as iWe,kTe} from "../permissions/4676_shouldSuppressChromeOffer.ts";
import {zA,Cj,MD,xj,b$,Uae,Kxn,d3e,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {X0,p0n} from "../../vendor/m3027.ts";
import {D$,Ixn,Tsa,qO} from "../mcp/3159_scope.ts";
import {OB,Z3n} from "../../vendor/m4096.ts";
import {rQr} from "../config/3205_ISSUES_EXPLAINER.ts";
import {rla,yDn} from "../telemetry/3201_mode.ts";
import {isShuttingDown as ww,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {ln,Vc,vn} from "../session/0621_length.ts";
import {gateChannelServer as xpt,findChannelEntry as Uxe,ChannelMessageNotificationSchema as kpt,wrapChannelMessage as Hpt,ChannelPermissionNotificationSchema as Uho,CHANNEL_PERMISSION_METHOD as Eqn,d5e} from "../../vendor/m4178.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Bo,Le,Ve} from "../../vendor/m5.ts";
import {iy,ef} from "../../vendor/m2794.ts";
import {VMe,kCt,vCt,Qy} from "../tools/0325_ttl.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {mcpTools as eH,kee} from "../telemetry/3165_kee.ts";
import {JKn,bx,lJ} from "../../vendor/m4620.ts";
import {LNt,csa,xHe,eXr,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {BN,IEe} from "../../vendor/m452.ts";
import {hasDisableClaudeAiConnectors as rNe,br} from "../config/0745_updateSettingsForSource.ts";
import {Nvo,Mvo} from "../../vendor/m4676.ts";
import {b,x,oo} from "../../runtime.ts";
import {et} from "../../vendor/m2261.ts";
import {_Qr,gQr} from "../tools/3210_fetchMcpSkillsForClient.ts";
// @ts-nocheck
// Build a dedup key from a plugin error/warning entry
function P5n(entry: any) {
  let pluginKey: any = "plugin" in entry ? entry.plugin : "no-plugin";
  return `${entry.type}:${entry.source}:${pluginKey}`;
}
// Append new plugin errors (by dedup key) to store state
function wSl(setState: any, newErrors: any) {
  if (newErrors.length === 0) return;
  setState((state: any) => {
    let existingKeys: any = new Set(state.plugins.errors.map((e: any) => P5n(e))),
      added: any = newErrors.filter((e: any) => !existingKeys.has(P5n(e)));
    if (added.length === 0) return state;
    return {
      ...state,
      plugins: {
        ...state.plugins,
        errors: [...state.plugins.errors, ...added]
      }
    };
  });
}
// Append new plugin warnings (by dedup key) to store state
function kSl(setState: any, newWarnings: any) {
  if (newWarnings.length === 0) return;
  setState((state: any) => {
    let existingKeys: any = new Set(state.plugins.warnings.map((e: any) => P5n(e))),
      added: any = newWarnings.filter((e: any) => !existingKeys.has(P5n(e)));
    if (added.length === 0) return state;
    return {
      ...state,
      plugins: {
        ...state.plugins,
        warnings: [...state.plugins.warnings, ...added]
      }
    };
  });
}
// Hook that manages MCP server connections, reconnections, channel gating, tool/resource/prompt refresh
function HSl(mcpConfigOverrides: any, skipConfigLoad: any = !1) {
  let isRemoteMode: any = la(),
    appStore: any = gc(),
    authVersion: any = _t((s: any) => s.authVersion),
    authVersionRef: any = HH.useRef(void 0),
    policyVersion: any = _t((s: any) => s.policyVersion),
    pluginReconnectKey: any = _t((s: any) => s.mcp.pluginReconnectKey),
    setState: any = bo(),
    clock: any = As(),
    reconnectTimers: any = HH.useRef(new Map()),
    inFlightReconnects: any = HH.useRef(new Map()),
    initialConnectRetries: any = HH.useRef(new Map()),
    blockedPolicyKeyRef: any = HH.useRef(null),
    notifiedSkipKinds: any = HH.useRef(new Set()),
    channelHandlerRegistered: any = HH.useRef(new Set()),
    channelPermissionCallbacksRef: any = HH.useRef(null);
  if (channelPermissionCallbacksRef.current === null && !isRemoteMode) channelPermissionCallbacksRef.current = iKa();
  HH.useEffect(() => {
    let callbacks: any = channelPermissionCallbacksRef.current;
    if (!callbacks) return;
    if (!nKa()) return;
    return setState((state: any) => {
      if (state.channelPermissionCallbacks === callbacks) return state;
      return {
        ...state,
        channelPermissionCallbacks: callbacks
      };
    }), () => {
      setState((state: any) => {
        if (state.channelPermissionCallbacks === void 0) return state;
        return {
          ...state,
          channelPermissionCallbacks: void 0
        };
      });
    };
  }, [setState]);
  let {
      addNotification: addNotification
    } = Ci(),
    FLUSH_DELAY_MS: any = 16,
    pendingClientUpdates: any = HH.useRef([]),
    flushTimerRef: any = HH.useRef(null),
    flushClientUpdates: any = HH.useCallback(() => {
      flushTimerRef.current = null;
      let updates: any = pendingClientUpdates.current;
      if (updates.length === 0) return;
      pendingClientUpdates.current = [], setState((state: any) => {
        let mcp: any = state.mcp;
        for (let update of updates) {
          let {
              tools: tools,
              commands: commands,
              resources: resources,
              resourceTemplates: resourceTemplates,
              ...client
            } = update,
            nextTools: any = client.type === "disabled" || client.type === "failed" ? tools ?? [] : tools,
            nextCommands: any = client.type === "disabled" || client.type === "failed" ? commands ?? [] : commands,
            nextResources: any = client.type === "disabled" || client.type === "failed" ? resources ?? [] : resources,
            nextResourceTemplates: any = client.type === "disabled" || client.type === "failed" ? resourceTemplates ?? [] : resourceTemplates,
            toolPrefix: any = m3(client.name),
            existingIndex: any = mcp.clients.findIndex((c: any) => c.name === client.name);
          if (client.type === "connected" && H$(client.name, client.config)) {
            if (iWe(client.name), client.client.onclose = void 0, zA(client.name, client.config).catch(() => {}), existingIndex === -1) continue;
            mcp = {
              ...mcp,
              clients: mcp.clients.map((c: any) => c.name === client.name ? {
                name: client.name,
                type: "failed",
                config: client.config,
                error: "Blocked by enterprise managed policy"
              } : c),
              tools: X0(mcp.tools, (c: any) => c.name?.startsWith(toolPrefix)),
              commands: X0(mcp.commands, (c: any) => D$(c, client.name)),
              resources: OB(mcp.resources, client.name),
              resourceTemplates: OB(mcp.resourceTemplates, client.name)
            };
            continue;
          }
          let nextClients: any = existingIndex === -1 ? [...mcp.clients, client] : mcp.clients.map((c: any) => c.name === client.name ? client : c),
            mergedTools: any = nextTools === void 0 ? mcp.tools : [...X0(mcp.tools, (c: any) => c.name?.startsWith(toolPrefix)), ...nextTools],
            mergedCommands: any = nextCommands === void 0 ? mcp.commands : [...X0(mcp.commands, (c: any) => D$(c, client.name)), ...nextCommands],
            mergedResources: any = nextResources === void 0 ? mcp.resources : nextResources.length > 0 ? {
              ...mcp.resources,
              [client.name]: nextResources
            } : OB(mcp.resources, client.name),
            mergedResourceTemplates: any = nextResourceTemplates === void 0 ? mcp.resourceTemplates : nextResourceTemplates.length > 0 ? {
              ...mcp.resourceTemplates,
              [client.name]: nextResourceTemplates
            } : OB(mcp.resourceTemplates, client.name);
          mcp = {
            ...mcp,
            clients: nextClients,
            tools: mergedTools,
            commands: mergedCommands,
            resources: mergedResources,
            resourceTemplates: mergedResourceTemplates
          };
        }
        return {
          ...state,
          mcp: mcp
        };
      });
    }, [setState]),
    enqueueClientUpdate: any = HH.useCallback((update: any) => {
      if (pendingClientUpdates.current.push(update), flushTimerRef.current === null) flushTimerRef.current = clock.setTimeout(flushClientUpdates, FLUSH_DELAY_MS);
    }, [clock, flushClientUpdates]),
    applyConnectedClient: any = HH.useCallback(({
      client: client,
      tools: tools,
      commands: commands,
      resources: resources,
      resourceTemplates: resourceTemplates
    }) => {
      enqueueClientUpdate({
        ...client,
        tools: tools,
        commands: commands,
        resources: resources,
        resourceTemplates: resourceTemplates
      });
      {
        let scopeExpandedText: any = rQr();
        if (scopeExpandedText) addNotification({
          key: "mcp-first-party-scope-expanded",
          kind: "event",
          priority: "high",
          text: scopeExpandedText,
          color: "remember",
          timeoutMs: 12000
        });
      }
      switch (client.type) {
        case "connected":
          {
            initialConnectRetries.current.set(client.name, m7n), rla(client.client, client.name, setState, client.transportErrorState), client.client.onclose = () => {
              if (ww()) return;
              let transportType: any = client.config.type ?? "stdio";
              if (zA(client.name, client.config).catch(() => {
                A(`Failed to invalidate the server cache: ${client.name}`);
              }), Qk(client.name)) {
                ln(client.name, "Server is disabled, skipping automatic reconnection");
                return;
              }
              if (transportType !== "stdio" && transportType !== "sdk") {
                let transportLabel: any = Nrm(transportType);
                ln(client.name, `${transportLabel} transport closed/disconnected, attempting automatic reconnection`);
                let existingTimer: any = reconnectTimers.current.get(client.name);
                if (existingTimer) existingTimer(), reconnectTimers.current.delete(client.name);
                (async () => {
                  for (let attempt = 1; attempt <= fht; attempt++) {
                    if (Qk(client.name)) {
                      ln(client.name, "Server disabled during reconnection, stopping retry"), reconnectTimers.current.delete(client.name);
                      return;
                    }
                    if (H$(client.name, client.config)) {
                      iWe(client.name), ln(client.name, "Server blocked by managed policy during reconnection, stopping retry"), reconnectTimers.current.delete(client.name), enqueueClientUpdate({
                        name: client.name,
                        type: "failed",
                        config: client.config,
                        error: "Blocked by enterprise managed policy"
                      });
                      return;
                    }
                    enqueueClientUpdate({
                      ...client,
                      type: "pending",
                      reconnectAttempt: attempt,
                      maxReconnectAttempts: fht
                    });
                    let startedAt: any = clock.now();
                    try {
                      let result: any = await Cj(client.name, client.config),
                        elapsedMs: any = Math.round(clock.now() - startedAt);
                      if (result.client.type === "connected") {
                        ln(client.name, `${transportLabel} reconnection successful after ${elapsedMs}ms (attempt ${attempt})`), reconnectTimers.current.delete(client.name), applyConnectedClient(result);
                        return;
                      }
                      if (ln(client.name, `${transportLabel} reconnection attempt ${attempt} completed with status: ${result.client.type}`), attempt === fht) {
                        ln(client.name, `Max reconnection attempts (${fht}) reached, giving up`), reconnectTimers.current.delete(client.name), applyConnectedClient(result);
                        return;
                      }
                    } catch (err) {
                      let elapsedMs: any = Math.round(clock.now() - startedAt);
                      if (Vc(client.name, `${transportLabel} reconnection attempt ${attempt} failed after ${elapsedMs}ms: ${err}`), attempt === fht) {
                        ln(client.name, `Max reconnection attempts (${fht}) reached, giving up`), reconnectTimers.current.delete(client.name), enqueueClientUpdate({
                          ...client,
                          type: "failed"
                        });
                        return;
                      }
                    }
                    let backoffMs: any = Math.min(RSl * Math.pow(2, attempt - 1), vSl);
                    ln(client.name, `Scheduling reconnection attempt ${attempt + 1} in ${backoffMs}ms`), await new Promise((resolve: any) => {
                      let timer: any = clock.setTimeout(resolve, backoffMs);
                      reconnectTimers.current.set(client.name, timer);
                    });
                  }
                })();
              } else channelHandlerRegistered.current.delete(client.name), enqueueClientUpdate({
                ...client,
                type: "failed"
              });
            };
            let channelGate: any = xpt(client.name, client.capabilities, client.config.pluginSource),
              channelEntry: any = Uxe(client.name, Nb()),
              pluginLabel: any = channelEntry?.kind === "plugin" ? `${channelEntry.name}@${channelEntry.marketplace}` : void 0,
              registered: any = !1,
              registerChannelHandlers: any = () => {
                if (channelHandlerRegistered.current.add(client.name), client.client.setNotificationHandler(kpt(), async (notification: any) => {
                  let {
                    content: content,
                    meta: meta
                  } = notification.params;
                  ln(client.name, `notifications/claude/channel: ${content.slice(0, 80)}`), W("tengu_mcp_channel_message", {
                    content_length: content.length,
                    meta_key_count: Object.keys(meta ?? {}).length,
                    entry_kind: Bo(channelEntry?.kind),
                    is_dev: channelEntry?.dev ?? !1,
                    plugin: pluginLabel
                  }), iy({
                    mode: "prompt",
                    agentId: rs(),
                    value: Hpt(client.name, content, meta),
                    priority: "next",
                    isMeta: !0,
                    origin: {
                      kind: "channel",
                      server: client.name
                    },
                    skipSlashCommands: !0
                  });
                }), client.capabilities?.experimental?.["claude/channel/permission"] !== void 0) client.client.setNotificationHandler(Uho(), async (notification: any) => {
                  let {
                      request_id: requestId,
                      behavior: behavior
                    } = notification.params,
                    matched: any = channelPermissionCallbacksRef.current?.resolve(requestId, behavior, client.name) ?? !1;
                  ln(client.name, `notifications/claude/channel/permission: ${requestId} → ${behavior} (${matched ? "matched pending" : "no pending entry — stale or unknown ID"})`);
                });
              };
            switch (channelGate.action) {
              case "register":
                ln(client.name, "Channel notifications registered"), registerChannelHandlers(), registered = !0;
                break;
              case "skip":
                {
                  let removeHandlers: any = channelGate.kind === "provider" || channelGate.kind === "disabled" || channelGate.kind === "capability",
                    wasRegistered: any = channelHandlerRegistered.current.has(client.name);
                  if (removeHandlers) channelHandlerRegistered.current.delete(client.name), client.client.removeNotificationHandler("notifications/claude/channel"), client.client.removeNotificationHandler(Eqn);else if (wasRegistered) {
                    ln(client.name, `Channel gate says skip:${channelGate.kind} but was previously registered — preserving handler`), registerChannelHandlers(), registered = !0;
                    break;
                  }
                  if (ln(client.name, `Channel notifications skipped: ${channelGate.reason}`), channelGate.kind !== "capability" && channelGate.kind !== "session" && !notifiedSkipKinds.current.has(channelGate.kind) && (channelGate.kind === "marketplace" || channelGate.kind === "allowlist" || channelEntry !== void 0)) {
                    notifiedSkipKinds.current.add(channelGate.kind);
                    let skipText: any = channelGate.kind === "disabled" ? "Channels are not currently available" : channelGate.kind === "provider" ? "Channels are not available on Bedrock, Vertex, or Foundry" : channelGate.kind === "policy" ? "Channels are not enabled for your org \xB7 have an administrator set channelsEnabled: true in managed settings" : channelGate.reason;
                    addNotification({
                      key: `channels-blocked-${channelGate.kind}`,
                      priority: "high",
                      text: skipText,
                      color: "warning",
                      timeoutMs: 12000
                    });
                  }
                  break;
                }
            }
            if (registered || channelGate.action === "skip" && channelGate.kind !== "capability") W("tengu_mcp_channel_gate", {
              registered: registered,
              skip_kind: channelGate.action === "skip" ? Le(channelGate.kind) : void 0,
              entry_kind: Bo(channelEntry?.kind),
              is_dev: channelEntry?.dev ?? !1,
              plugin: pluginLabel
            });
            if (client.capabilities?.tools?.listChanged) client.client.setNotificationHandler(VMe, async () => {
              ln(client.name, "Received tools/list_changed notification, refreshing tools");
              try {
                let cached: any = MD.cache.get(client.name);
                MD.cache.delete(client.name);
                let refreshedTools: any = await MD(client),
                  newCount: any = refreshedTools.length;
                if (cached) cached.then((prev: any) => {
                  W("tengu_mcp_list_changed", {
                    type: Ve("tools"),
                    previousCount: prev.length,
                    newCount: newCount
                  });
                }, () => {
                  W("tengu_mcp_list_changed", {
                    type: Ve("tools"),
                    newCount: newCount
                  });
                });else W("tengu_mcp_list_changed", {
                  type: Ve("tools"),
                  newCount: newCount
                });
                enqueueClientUpdate({
                  ...client,
                  tools: refreshedTools
                });
              } catch (err) {
                Vc(client.name, `Failed to refresh tools after list_changed notification: ${Ce(err)}`);
              }
            });
            if (client.capabilities?.prompts?.listChanged) client.client.setNotificationHandler(kCt, async () => {
              ln(client.name, "Received prompts/list_changed notification, refreshing prompts"), W("tengu_mcp_list_changed", {
                type: Ve("prompts")
              });
              try {
                xj.cache.delete(client.name);
                let [prompts, skillCommands] = await Promise.all([xj(client), eH() ? Fvo(client) : Promise.resolve([])]);
                enqueueClientUpdate({
                  ...client,
                  commands: [...prompts, ...skillCommands]
                }), ASl();
              } catch (err) {
                Vc(client.name, `Failed to refresh prompts after list_changed notification: ${Ce(err)}`);
              }
            });
            if (client.capabilities?.resources?.listChanged) client.client.setNotificationHandler(vCt, async () => {
              ln(client.name, "Received resources/list_changed notification, refreshing resources"), W("tengu_mcp_list_changed", {
                type: Ve("resources")
              });
              try {
                if (b$.cache.delete(client.name), Uae.cache.delete(client.name), eH()) {
                  Fvo.cache.delete(client.name), xj.cache.delete(client.name);
                  let [refreshedResources, refreshedResourceTemplates, prompts, skillCommands] = await Promise.all([b$(client), Uae(client), xj(client), Fvo(client)]);
                  enqueueClientUpdate({
                    ...client,
                    resources: refreshedResources,
                    resourceTemplates: refreshedResourceTemplates,
                    commands: [...prompts, ...skillCommands]
                  }), ASl();
                } else {
                  let [refreshedResources, refreshedResourceTemplates] = await Promise.all([b$(client), Uae(client)]);
                  enqueueClientUpdate({
                    ...client,
                    resources: refreshedResources,
                    resourceTemplates: refreshedResourceTemplates
                  });
                }
              } catch (err) {
                Vc(client.name, `Failed to refresh resources after list_changed notification: ${Ce(err)}`);
              }
            });
            break;
          }
        case "failed":
          {
            let retryCount: any = (initialConnectRetries.current.get(client.name) ?? 0) + 1;
            if (Ixn(client) && retryCount <= m7n) {
              initialConnectRetries.current.set(client.name, retryCount);
              let backoffMs: any = Math.min(RSl * Math.pow(2, retryCount - 1), vSl);
              ln(client.name, `Transient ${client.errorCode ?? "<sse-no-code>"} on initial connect — retry ${retryCount}/${m7n} in ${backoffMs}ms`), enqueueClientUpdate({
                name: client.name,
                config: client.config,
                type: "pending",
                reconnectAttempt: retryCount,
                maxReconnectAttempts: m7n
              });
              let existingTimer: any = reconnectTimers.current.get(client.name);
              if (existingTimer) existingTimer();
              let timer: any = clock.setTimeout(() => {
                if (reconnectTimers.current.delete(client.name), Qk(client.name)) return;
                if (H$(client.name, client.config)) {
                  iWe(client.name);
                  return;
                }
                Cj(client.name, client.config).then(applyConnectedClient, (err: any) => {
                  Vc(client.name, `Initial-connect retry ${retryCount} threw: ${Ce(err)}`), enqueueClientUpdate({
                    ...client
                  });
                });
              }, backoffMs);
              reconnectTimers.current.set(client.name, timer);
            } else if (JKn(client, LNt)) bx("MCP", 1);
            break;
          }
        case "needs-auth":
          if (JKn(client, LNt)) bx("MCP", 1);
          break;
        case "pending":
        case "disabled":
          break;
      }
    }, [clock, enqueueClientUpdate, addNotification, setState]),
    sessionId: any = It();
  HH.useEffect(() => {
    if (isRemoteMode) return;
    async function initServers() {
      let {
          servers: servers,
          errors: errors,
          warnings: warnings
        } = skipConfigLoad ? {
          servers: {},
          errors: [],
          warnings: []
        } : await Sj(mcpConfigOverrides),
        {
          configs: dynamicConfigs,
          blocked: blocked
        } = Nst(mcpConfigOverrides),
        allConfigs: any = {
          ...servers,
          ...dynamicConfigs
        };
      if (blocked.length > 0) {
        blocked.sort(), A(`MCP servers blocked by managed policy at connect time: ${blocked.join(", ")}`, {
          level: "warn"
        });
        let blockedKey: any = blocked.join(",");
        if (blockedPolicyKeyRef.current !== blockedKey) blockedPolicyKeyRef.current = blockedKey, addNotification({
          key: "mcp-blocked-policy",
          kind: "warning",
          priority: "high",
          text: `MCP ${Sn(blocked.length, "server")} blocked by enterprise policy: ${blocked.join(", ")}`,
          color: "warning",
          timeoutMs: 12000
        });
        for (let name of blocked) {
          let config: any = mcpConfigOverrides?.[name];
          if (config) zA(name, config).catch(() => {});
        }
      } else blockedPolicyKeyRef.current = null;
      wSl(setState, errors), kSl(setState, warnings), setState((state: any) => {
        let {
          stale: stale,
          ...reconciled
        } = Tsa(state.mcp, allConfigs);
        for (let staleClient of stale) {
          let timer: any = reconnectTimers.current.get(staleClient.name);
          if (timer) timer(), reconnectTimers.current.delete(staleClient.name);
          if (channelHandlerRegistered.current.delete(staleClient.name), initialConnectRetries.current.delete(staleClient.name), staleClient.type === "connected") staleClient.client.onclose = void 0, zA(staleClient.name, staleClient.config).catch(() => {});
        }
        let existingNames: any = new Set(reconciled.clients.map((c: any) => c.name)),
          newClients: any = Object.entries(allConfigs).filter(([name]) => !existingNames.has(name)).map(([name, config]) => ({
            name: name,
            type: Qk(name) ? "disabled" : "pending",
            config: config
          }));
        if (newClients.length === 0 && stale.length === 0) {
          if (state.mcp.clientsInitialized) return state;
          return {
            ...state,
            mcp: {
              ...state.mcp,
              clientsInitialized: !0
            }
          };
        }
        return {
          ...state,
          mcp: {
            ...state.mcp,
            ...reconciled,
            clientsInitialized: !0,
            clients: [...reconciled.clients, ...newClients]
          }
        };
      });
    }
    initServers().catch((err: any) => {
      Vc("useManageMCPConnections", `Failed to initialize servers as pending: ${Ce(err)}`);
    });
  }, [skipConfigLoad, mcpConfigOverrides, setState, sessionId, pluginReconnectKey, policyVersion]), HH.useEffect(() => {
    if (isRemoteMode) return;
    let cancelled: any = !1;
    async function connectServers() {
      let claudeAiPromise: any;
      if (skipConfigLoad || Fst()) claudeAiPromise = Promise.resolve({});else {
        if (csa(), authVersionRef.current !== void 0 && authVersionRef.current !== authVersion) Kxn();
        authVersionRef.current = authVersion, claudeAiPromise = xHe();
      }
      let {
        servers: servers,
        errors: errors,
        warnings: warnings
      } = skipConfigLoad ? {
        servers: {},
        errors: [],
        warnings: []
      } : await Sj(mcpConfigOverrides);
      if (cancelled) return;
      wSl(setState, errors), kSl(setState, warnings);
      let localConfigs: any = {
          ...servers,
          ...Nst(mcpConfigOverrides).configs
        },
        enabledLocalConfigs: any = BN(localConfigs, (config: any, name: any) => Qk(name));
      d3e(applyConnectedClient, enabledLocalConfigs).catch((err: any) => {
        Vc("useManageMcpConnections", `Failed to get MCP resources: ${Ce(err)}`);
      });
      let claudeAiConfigs: any = {};
      if (!skipConfigLoad) {
        let {
          allowed: allowed,
          blocked: blocked
        } = K4(await claudeAiPromise);
        if (claudeAiConfigs = allowed, cancelled) return;
        if (rNe()) for (let client of appStore.getState().mcp.clients) {
          if (client.config.scope !== "claudeai") continue;
          if (client.type === "disabled") continue;
          let timer: any = reconnectTimers.current.get(client.name);
          if (timer) timer(), reconnectTimers.current.delete(client.name);
          if (channelHandlerRegistered.current.delete(client.name), initialConnectRetries.current.delete(client.name), client.type === "connected") client.client.onclose = void 0, zA(client.name, client.config).catch(() => {});
          enqueueClientUpdate({
            name: client.name,
            type: "failed",
            config: client.config,
            error: "Disabled by disableClaudeAiConnectors setting"
          });
        }
        if (blocked.length > 0) {
          A(`claude.ai connectors blocked by managed policy at connect time: ${blocked.join(", ")}`, {
            level: "warn"
          });
          for (let name of blocked) {
            let client: any = appStore.getState().mcp.clients.find((c: any) => c.name === name && c.config.scope === "claudeai");
            if (!client) continue;
            let timer: any = reconnectTimers.current.get(name);
            if (timer) timer(), reconnectTimers.current.delete(name);
            if (client.type === "connected") client.client.onclose = void 0, zA(name, client.config).catch(() => {});
            enqueueClientUpdate({
              name: name,
              type: "failed",
              config: client.config,
              error: "Blocked by enterprise managed policy"
            });
          }
        }
        let crossOrgOverride: any = eXr();
        if (crossOrgOverride) addNotification({
          key: "claudeai-mcp-cross-org-override",
          priority: "immediate",
          text: crossOrgOverride.level === "error" ? crossOrgOverride.message : `⚠ ${crossOrgOverride.message}`,
          color: crossOrgOverride.level === "error" ? "error" : "warning",
          timeoutMs: 20000
        });
        let suppressed: any = [];
        if (Object.keys(claudeAiConfigs).length > 0) {
          let {
            servers: dedupedServers,
            suppressed: dedupedSuppressed
          } = await Lst(claudeAiConfigs, localConfigs);
          if (cancelled) return;
          claudeAiConfigs = dedupedServers, suppressed = dedupedSuppressed;
        }
        if (setState((state: any) => NNt(state.mcp.suppressedClaudeAiConnectors ?? [], suppressed) ? state : {
          ...state,
          mcp: {
            ...state.mcp,
            suppressedClaudeAiConnectors: suppressed
          }
        }), Object.keys(claudeAiConfigs).length > 0) {
          setState((state: any) => {
            let existingNames: any = new Set(state.mcp.clients.map((c: any) => c.name)),
              newClients: any = Object.entries(claudeAiConfigs).filter(([name]) => !existingNames.has(name)).map(([name, config]) => ({
                name: name,
                type: Qk(name) ? "disabled" : "pending",
                config: config
              }));
            if (newClients.length === 0) return state;
            return {
              ...state,
              mcp: {
                ...state.mcp,
                clients: [...state.mcp.clients, ...newClients]
              }
            };
          });
          let enabledClaudeAiConfigs: any = BN(claudeAiConfigs, (config: any, name: any) => Qk(name));
          d3e(applyConnectedClient, enabledClaudeAiConfigs).catch((err: any) => {
            Vc("useManageMcpConnections", `Failed to get claude.ai MCP resources: ${Ce(err)}`);
          });
        }
      }
      let allMergedConfigs: any = {
          ...localConfigs,
          ...claudeAiConfigs
        },
        scopeCounts: any = {
          enterprise: 0,
          global: 0,
          project: 0,
          user: 0,
          plugin: 0,
          agent: 0,
          claudeai: 0
        },
        unusedList: any = [];
      for (let [name, config] of Object.entries(allMergedConfigs)) if (config.scope === "enterprise") scopeCounts.enterprise++;else if (config.scope === "user") scopeCounts.global++;else if (config.scope === "project") scopeCounts.project++;else if (config.scope === "local") scopeCounts.user++;else if (config.scope === "dynamic") scopeCounts.plugin++;else if (config.scope === "agent") scopeCounts.agent++;else if (config.scope === "claudeai") scopeCounts.claudeai++;
      W("tengu_mcp_servers", {
        ...scopeCounts,
        ...!1
      });
    }
    return connectServers(), () => {
      cancelled = !0;
    };
  }, [skipConfigLoad, mcpConfigOverrides, applyConnectedClient, setState, authVersion, sessionId, pluginReconnectKey, policyVersion]), HH.useEffect(() => {
    let timers: any = reconnectTimers.current;
    return () => {
      for (let cancel of timers.values()) cancel();
      if (timers.clear(), flushTimerRef.current !== null) flushTimerRef.current(), flushTimerRef.current = null, flushClientUpdates();
    };
  }, [flushClientUpdates]);
  let reconnectMcpServer: any = HH.useCallback(async (name: any) => {
      let inFlight: any = inFlightReconnects.current.get(name);
      if (inFlight) return inFlight;
      let existingClient: any = appStore.getState().mcp.clients.find((c: any) => c.name === name);
      if (!existingClient) throw Error(`MCP server ${name} not found`);
      let timer: any = reconnectTimers.current.get(name);
      if (timer) timer(), reconnectTimers.current.delete(name);
      let promise: any = (async () => {
        enqueueClientUpdate({
          name: name,
          type: "pending",
          config: existingClient.config
        });
        try {
          let config: any = mcpConfigOverrides?.[name] ?? (skipConfigLoad ? void 0 : (await Sj(mcpConfigOverrides)).servers[name]) ?? existingClient.config;
          if (H$(name, config)) throw iWe(name), Error(`MCP server ${name} is blocked by enterprise managed policy`);
          if (existingClient.type === "connected") existingClient.client.onclose = void 0;
          let result: any = await Cj(name, config);
          return applyConnectedClient(result), result;
        } catch (err) {
          throw enqueueClientUpdate(existingClient), err;
        }
      })();
      inFlightReconnects.current.set(name, promise);
      try {
        return await promise;
      } finally {
        inFlightReconnects.current.delete(name);
      }
    }, [appStore, enqueueClientUpdate, applyConnectedClient, mcpConfigOverrides, skipConfigLoad]),
    toggleMcpServer: any = HH.useCallback(async (name: any) => {
      let existingClient: any = appStore.getState().mcp.clients.find((c: any) => c.name === name);
      if (!existingClient) throw Error(`MCP server ${name} not found`);
      if (existingClient.type !== "disabled") {
        let timer: any = reconnectTimers.current.get(name);
        if (timer) timer(), reconnectTimers.current.delete(name);
        if (F9e(name, !1), channelHandlerRegistered.current.delete(name), initialConnectRetries.current.delete(name), existingClient.type === "connected") await zA(name, existingClient.config);
        let disabledClient: any = {
          name: name,
          type: "disabled",
          config: existingClient.config
        };
        return enqueueClientUpdate(disabledClient), disabledClient;
      } else {
        let config: any = mcpConfigOverrides?.[name] ?? (skipConfigLoad ? void 0 : (await Sj(mcpConfigOverrides)).servers[name]) ?? existingClient.config;
        if (H$(name, config)) throw iWe(name), Error(`MCP server ${name} is blocked by enterprise managed policy`);
        F9e(name, !0), enqueueClientUpdate({
          name: name,
          type: "pending",
          config: config
        });
        let result: any = await Cj(name, config);
        return applyConnectedClient(result), result.client;
      }
    }, [appStore, enqueueClientUpdate, applyConnectedClient, mcpConfigOverrides, skipConfigLoad]);
  return {
    reconnectMcpServer: reconnectMcpServer,
    toggleMcpServer: toggleMcpServer
  };
}
// Map transport type string to a human-readable label
function Nrm(transportType: any): any {
  switch (transportType) {
    case "http":
      return "HTTP";
    case "ws":
    case "ws-ide":
      return "WebSocket";
    default:
      return "SSE";
  }
}
var HH: any,
  Fvo: any,
  ASl = () => void Promise.resolve().then(() => (Nvo(), Mvo)).then((mod: any) => mod.clearSkillIndexCache(), () => {}),
  fht = 5,
  RSl = 1000,
  vSl = 30000,
  m7n = 3;
var ISl = b(() => {
  lt();
  lt();
  Ew();
  kee();
  Qy();
  Z3n();
  IEe();
  p0n();
  kt();
  KA();
  qe();
  Np();
  br();
  lt();
  fd();
  g2e();
  uo();
  kTe();
  Ct();
  vn();
  ef();
  lJ();
  lr();
  d5e();
  qho();
  wW();
  yDn();
  T0();
  qO();
  HH = x(et(), 1), Fvo = (_Qr(), oo(gQr)).fetchMcpSkillsForClient;
});

export {P5n as f7n,wSl,kSl,HSl,Nrm,HH,Fvo,ASl,fht,RSl,vSl,m7n,ISl};
