// @ts-nocheck
import {getIsRemoteMode,getAllowedChannels,mainAgentId,getSessionId,lt} from "../session/0131_sent.ts";
import {Mc,mt,bo,configProtoStore} from "../../vendor/m2458.ts";
import {useClock,yUe} from "../../vendor/m2432.ts";
import {Qqa,zqa,edo} from "../telemetry/4167_onResponse.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {z3,scalar} from "../mcp/0728_serverName.ts";
import {isMcpServerBlockedAtConnectTime,isMcpServerDisabled,getClaudeCodeMcpConfigs,filterDynamicMcpServersByPolicy,shouldSkipClaudeAiFetchForEnterpriseLockdown,filterMcpServersByPolicy,dedupClaudeAiMcpServers,suppressedConnectorsEqual,setMcpServerEnabled,px} from "../telemetry/3148_unwrapCcrProxyUrl.ts";
import {markClaudeInChromeUnwiredIfChrome,rye} from "../permissions/4648_shouldSuppressChromeOffer.ts";
import {mx,zz,RL,eY,Z$,$ae,rHn,n9e,O0} from "../tools/3222_name.ts";
import {M0,Exn} from "../../vendor/m3015.ts";
import {Vz,$kn,RQi,CL} from "../mcp/3149_scope.ts";
import {pU,m2n} from "../../vendor/m4032.ts";
import {bKr} from "../config/3190_ISSUES_EXPLAINER.ts";
import {ota,RHn} from "../telemetry/3187_mode.ts";
import {Bk,ym} from "../config/3332_flushAnalyticsSinks.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {on,wu,Rn} from "../session/0615_length.ts";
import {gateChannelServer,findChannelEntry,ChannelMessageNotificationSchema,wrapChannelMessage,ChannelPermissionNotificationSchema,CHANNEL_PERMISSION_METHOD,Gqe} from "../../vendor/m4165.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnumOpt,fromEnum,Qe} from "../../vendor/m5.ts";
import {oy,sA} from "../../vendor/m2782.ts";
import {QLe,nSt,eSt,YT} from "../tools/0323_ttl.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {B0,Pee} from "../telemetry/3153_Pee.ts";
import {A5n,lD,EJ} from "../../vendor/m4592.ts";
import {aMt,hQi,jxe,y7r,Iee} from "../api/3147_claudeAiMcpEverConnected.ts";
import {Cn,dr} from "../../vendor/m231.ts";
import {yee,Vnt} from "../../vendor/m3017.ts";
import {hasDisableClaudeAiConnectors,yr} from "../config/0740_updateSettingsForSource.ts";
import {ESo,bSo} from "../../vendor/m4648.ts";
import {b,M,ro} from "../../runtime.ts";
import {Te} from "../../vendor/m2253.ts";
import {MKr,LKr} from "../tools/3195_fetchMcpSkillsForClient.ts";
// Build a dedup key from a plugin error/warning entry
function P5n(e: any) {
  let t: any = "plugin" in e ? e.plugin : "no-plugin";
  return `${e.type}:${e.source}:${t}`;
}
// Append new plugin errors (by dedup key) to store state
function Upl(e: any, t: any) {
  if (t.length === 0) return;
  e((n: any) => {
    let r: any = new Set(n.plugins.errors.map((s: any) => P5n(s))),
      o: any = t.filter((s: any) => !r.has(P5n(s)));
    if (o.length === 0) return n;
    return {
      ...n,
      plugins: {
        ...n.plugins,
        errors: [...n.plugins.errors, ...o]
      }
    };
  });
}
// Append new plugin warnings (by dedup key) to store state
function $pl(e: any, t: any) {
  if (t.length === 0) return;
  e((n: any) => {
    let r: any = new Set(n.plugins.warnings.map((s: any) => P5n(s))),
      o: any = t.filter((s: any) => !r.has(P5n(s)));
    if (o.length === 0) return n;
    return {
      ...n,
      plugins: {
        ...n.plugins,
        warnings: [...n.plugins.warnings, ...o]
      }
    };
  });
}
// Hook that manages MCP server connections, reconnections, channel gating, tool/resource/prompt refresh
function qpl(e: any, t: any = !1) {
  let n: any = getIsRemoteMode(),
    r: any = Mc(),
    o: any = mt((I: any) => I.authVersion),
    s: any = iH.useRef(void 0),
    i: any = mt((I: any) => I.policyVersion),
    a: any = mt((I: any) => I.mcp.pluginReconnectKey),
    l: any = bo(),
    c: any = useClock(),
    u: any = iH.useRef(new Map()),
    d: any = iH.useRef(new Map()),
    p: any = iH.useRef(new Map()),
    m: any = iH.useRef(null),
    f: any = iH.useRef(new Set()),
    A: any = iH.useRef(new Set()),
    h: any = iH.useRef(null);
  if (h.current === null && !n) h.current = Qqa();
  iH.useEffect(() => {
    let I: any = h.current;
    if (!I) return;
    if (!zqa()) return;
    return l((P: any) => {
      if (P.channelPermissionCallbacks === I) return P;
      return {
        ...P,
        channelPermissionCallbacks: I
      };
    }), () => {
      l((P: any) => {
        if (P.channelPermissionCallbacks === void 0) return P;
        return {
          ...P,
          channelPermissionCallbacks: void 0
        };
      });
    };
  }, [l]);
  let {
      addNotification: g
    } = Ui(),
    _: any = 16,
    y: any = iH.useRef([]),
    T: any = iH.useRef(null),
    S: any = iH.useCallback(() => {
      T.current = null;
      let I: any = y.current;
      if (I.length === 0) return;
      y.current = [], l((P: any) => {
        let L: any = P.mcp;
        for (let D of I) {
          let {
              tools: N,
              commands: O,
              resources: $,
              resourceTemplates: U,
              ...W
            } = D,
            G: any = W.type === "disabled" || W.type === "failed" ? N ?? [] : N,
            V: any = W.type === "disabled" || W.type === "failed" ? O ?? [] : O,
            Q: any = W.type === "disabled" || W.type === "failed" ? $ ?? [] : $,
            K: any = W.type === "disabled" || W.type === "failed" ? U ?? [] : U,
            Y: any = z3(W.name),
            J: any = L.clients.findIndex((ce: any) => ce.name === W.name);
          if (W.type === "connected" && isMcpServerBlockedAtConnectTime(W.name, W.config)) {
            if (markClaudeInChromeUnwiredIfChrome(W.name), W.client.onclose = void 0, mx(W.name, W.config).catch(() => {}), J === -1) continue;
            L = {
              ...L,
              clients: L.clients.map((ce: any) => ce.name === W.name ? {
                name: W.name,
                type: "failed",
                config: W.config,
                error: "Blocked by enterprise managed policy"
              } : ce),
              tools: M0(L.tools, (ce: any) => ce.name?.startsWith(Y)),
              commands: M0(L.commands, (ce: any) => Vz(ce, W.name)),
              resources: pU(L.resources, W.name),
              resourceTemplates: pU(L.resourceTemplates, W.name)
            };
            continue;
          }
          let ee: any = J === -1 ? [...L.clients, W] : L.clients.map((ce: any) => ce.name === W.name ? W : ce),
            te: any = G === void 0 ? L.tools : [...M0(L.tools, (ce: any) => ce.name?.startsWith(Y)), ...G],
            ne: any = V === void 0 ? L.commands : [...M0(L.commands, (ce: any) => Vz(ce, W.name)), ...V],
            re: any = Q === void 0 ? L.resources : Q.length > 0 ? {
              ...L.resources,
              [W.name]: Q
            } : pU(L.resources, W.name),
            oe: any = K === void 0 ? L.resourceTemplates : K.length > 0 ? {
              ...L.resourceTemplates,
              [W.name]: K
            } : pU(L.resourceTemplates, W.name);
          L = {
            ...L,
            clients: ee,
            tools: te,
            commands: ne,
            resources: re,
            resourceTemplates: oe
          };
        }
        return {
          ...P,
          mcp: L
        };
      });
    }, [l]),
    v: any = iH.useCallback((I: any) => {
      if (y.current.push(I), T.current === null) T.current = c.setTimeout(S, _);
    }, [c, S]),
    R: any = iH.useCallback(({
      client: I,
      tools: P,
      commands: L,
      resources: D,
      resourceTemplates: N
    }) => {
      v({
        ...I,
        tools: P,
        commands: L,
        resources: D,
        resourceTemplates: N
      });
      {
        let O: any = bKr();
        if (O) g({
          key: "mcp-first-party-scope-expanded",
          kind: "event",
          priority: "high",
          text: O,
          color: "remember",
          timeoutMs: 12000
        });
      }
      switch (I.type) {
        case "connected":
          {
            p.current.set(I.name, D5n), ota(I.client, I.name, l), I.client.onclose = () => {
              if (Bk()) return;
              let V: any = I.config.type ?? "stdio";
              if (mx(I.name, I.config).catch(() => {
                logForDebugging(`Failed to invalidate the server cache: ${I.name}`);
              }), isMcpServerDisabled(I.name)) {
                on(I.name, "Server is disabled, skipping automatic reconnection");
                return;
              }
              if (V !== "stdio" && V !== "sdk") {
                let Q: any = Lzp(V);
                on(I.name, `${Q} transport closed/disconnected, attempting automatic reconnection`);
                let K: any = u.current.get(I.name);
                if (K) K(), u.current.delete(I.name);
                (async () => {
                  for (let J = 1; J <= amt; J++) {
                    if (isMcpServerDisabled(I.name)) {
                      on(I.name, "Server disabled during reconnection, stopping retry"), u.current.delete(I.name);
                      return;
                    }
                    if (isMcpServerBlockedAtConnectTime(I.name, I.config)) {
                      markClaudeInChromeUnwiredIfChrome(I.name), on(I.name, "Server blocked by managed policy during reconnection, stopping retry"), u.current.delete(I.name), v({
                        name: I.name,
                        type: "failed",
                        config: I.config,
                        error: "Blocked by enterprise managed policy"
                      });
                      return;
                    }
                    v({
                      ...I,
                      type: "pending",
                      reconnectAttempt: J,
                      maxReconnectAttempts: amt
                    });
                    let ee: any = c.now();
                    try {
                      let ne: any = await zz(I.name, I.config),
                        re: any = Math.round(c.now() - ee);
                      if (ne.client.type === "connected") {
                        on(I.name, `${Q} reconnection successful after ${re}ms (attempt ${J})`), u.current.delete(I.name), R(ne);
                        return;
                      }
                      if (on(I.name, `${Q} reconnection attempt ${J} completed with status: ${ne.client.type}`), J === amt) {
                        on(I.name, `Max reconnection attempts (${amt}) reached, giving up`), u.current.delete(I.name), R(ne);
                        return;
                      }
                    } catch (ne) {
                      let re: any = Math.round(c.now() - ee);
                      if (wu(I.name, `${Q} reconnection attempt ${J} failed after ${re}ms: ${ne}`), J === amt) {
                        on(I.name, `Max reconnection attempts (${amt}) reached, giving up`), u.current.delete(I.name), v({
                          ...I,
                          type: "failed"
                        });
                        return;
                      }
                    }
                    let te: any = Math.min(Bpl * Math.pow(2, J - 1), Fpl);
                    on(I.name, `Scheduling reconnection attempt ${J + 1} in ${te}ms`), await new Promise((ne: any) => {
                      let re: any = c.setTimeout(ne, te);
                      u.current.set(I.name, re);
                    });
                  }
                })();
              } else A.current.delete(I.name), v({
                ...I,
                type: "failed"
              });
            };
            let O: any = gateChannelServer(I.name, I.capabilities, I.config.pluginSource),
              $: any = findChannelEntry(I.name, getAllowedChannels()),
              U: any = $?.kind === "plugin" ? `${$.name}@${$.marketplace}` : void 0,
              W: any = !1,
              G: any = () => {
                if (A.current.add(I.name), I.client.setNotificationHandler(ChannelMessageNotificationSchema(), async (V: any) => {
                  let {
                    content: Q,
                    meta: K
                  } = V.params;
                  on(I.name, `notifications/claude/channel: ${Q.slice(0, 80)}`), logEvent("tengu_mcp_channel_message", {
                    content_length: Q.length,
                    meta_key_count: Object.keys(K ?? {}).length,
                    entry_kind: fromEnumOpt($?.kind),
                    is_dev: $?.dev ?? !1,
                    plugin: U
                  }), oy({
                    mode: "prompt",
                    agentId: mainAgentId(),
                    value: wrapChannelMessage(I.name, Q, K),
                    priority: "next",
                    isMeta: !0,
                    origin: {
                      kind: "channel",
                      server: I.name
                    },
                    skipSlashCommands: !0
                  });
                }), I.capabilities?.experimental?.["claude/channel/permission"] !== void 0) I.client.setNotificationHandler(ChannelPermissionNotificationSchema(), async (V: any) => {
                  let {
                      request_id: Q,
                      behavior: K
                    } = V.params,
                    Y: any = h.current?.resolve(Q, K, I.name) ?? !1;
                  on(I.name, `notifications/claude/channel/permission: ${Q} \u2192 ${K} (${Y ? "matched pending" : "no pending entry \u2014 stale or unknown ID"})`);
                });
              };
            switch (O.action) {
              case "register":
                on(I.name, "Channel notifications registered"), G(), W = !0;
                break;
              case "skip":
                {
                  let V: any = O.kind === "provider" || O.kind === "disabled" || O.kind === "capability",
                    Q: any = A.current.has(I.name);
                  if (V) A.current.delete(I.name), I.client.removeNotificationHandler("notifications/claude/channel"), I.client.removeNotificationHandler(CHANNEL_PERMISSION_METHOD);else if (Q) {
                    on(I.name, `Channel gate says skip:${O.kind} but was previously registered \u2014 preserving handler`), G(), W = !0;
                    break;
                  }
                  if (on(I.name, `Channel notifications skipped: ${O.reason}`), O.kind !== "capability" && O.kind !== "session" && !f.current.has(O.kind) && (O.kind === "marketplace" || O.kind === "allowlist" || $ !== void 0)) {
                    f.current.add(O.kind);
                    let K: any = O.kind === "disabled" ? "Channels are not currently available" : O.kind === "provider" ? "Channels are not available on Bedrock, Vertex, or Foundry" : O.kind === "policy" ? "Channels are not enabled for your org \xB7 have an administrator set channelsEnabled: true in managed settings" : O.reason;
                    g({
                      key: `channels-blocked-${O.kind}`,
                      priority: "high",
                      text: K,
                      color: "warning",
                      timeoutMs: 12000
                    });
                  }
                  break;
                }
            }
            if (W || O.action === "skip" && O.kind !== "capability") logEvent("tengu_mcp_channel_gate", {
              registered: W,
              skip_kind: O.action === "skip" ? fromEnum(O.kind) : void 0,
              entry_kind: fromEnumOpt($?.kind),
              is_dev: $?.dev ?? !1,
              plugin: U
            });
            if (I.capabilities?.tools?.listChanged) I.client.setNotificationHandler(QLe, async () => {
              on(I.name, "Received tools/list_changed notification, refreshing tools");
              try {
                let V: any = RL.cache.get(I.name);
                RL.cache.delete(I.name);
                let Q: any = await RL(I),
                  K: any = Q.length;
                if (V) V.then((Y: any) => {
                  logEvent("tengu_mcp_list_changed", {
                    type: Qe("tools"),
                    previousCount: Y.length,
                    newCount: K
                  });
                }, () => {
                  logEvent("tengu_mcp_list_changed", {
                    type: Qe("tools"),
                    newCount: K
                  });
                });else logEvent("tengu_mcp_list_changed", {
                  type: Qe("tools"),
                  newCount: K
                });
                v({
                  ...I,
                  tools: Q
                });
              } catch (V) {
                wu(I.name, `Failed to refresh tools after list_changed notification: ${Se(V)}`);
              }
            });
            if (I.capabilities?.prompts?.listChanged) I.client.setNotificationHandler(nSt, async () => {
              on(I.name, "Received prompts/list_changed notification, refreshing prompts"), logEvent("tengu_mcp_list_changed", {
                type: Qe("prompts")
              });
              try {
                eY.cache.delete(I.name);
                let [V, Q] = await Promise.all([eY(I), B0() ? CSo(I) : Promise.resolve([])]);
                v({
                  ...I,
                  commands: [...V, ...Q]
                }), Npl();
              } catch (V) {
                wu(I.name, `Failed to refresh prompts after list_changed notification: ${Se(V)}`);
              }
            });
            if (I.capabilities?.resources?.listChanged) I.client.setNotificationHandler(eSt, async () => {
              on(I.name, "Received resources/list_changed notification, refreshing resources"), logEvent("tengu_mcp_list_changed", {
                type: Qe("resources")
              });
              try {
                if (Z$.cache.delete(I.name), $ae.cache.delete(I.name), B0()) {
                  CSo.cache.delete(I.name), eY.cache.delete(I.name);
                  let [V, Q, K, Y] = await Promise.all([Z$(I), $ae(I), eY(I), CSo(I)]);
                  v({
                    ...I,
                    resources: V,
                    resourceTemplates: Q,
                    commands: [...K, ...Y]
                  }), Npl();
                } else {
                  let [V, Q] = await Promise.all([Z$(I), $ae(I)]);
                  v({
                    ...I,
                    resources: V,
                    resourceTemplates: Q
                  });
                }
              } catch (V) {
                wu(I.name, `Failed to refresh resources after list_changed notification: ${Se(V)}`);
              }
            });
            break;
          }
        case "failed":
          {
            let O: any = (p.current.get(I.name) ?? 0) + 1;
            if ($kn(I) && O <= D5n) {
              p.current.set(I.name, O);
              let $: any = Math.min(Bpl * Math.pow(2, O - 1), Fpl);
              on(I.name, `Transient ${I.errorCode ?? "<sse-no-code>"} on initial connect \u2014 retry ${O}/${D5n} in ${$}ms`), v({
                name: I.name,
                config: I.config,
                type: "pending",
                reconnectAttempt: O,
                maxReconnectAttempts: D5n
              });
              let U: any = u.current.get(I.name);
              if (U) U();
              let W: any = c.setTimeout(() => {
                if (u.current.delete(I.name), isMcpServerDisabled(I.name)) return;
                if (isMcpServerBlockedAtConnectTime(I.name, I.config)) {
                  markClaudeInChromeUnwiredIfChrome(I.name);
                  return;
                }
                zz(I.name, I.config).then(R, (G: any) => {
                  wu(I.name, `Initial-connect retry ${O} threw: ${Se(G)}`), v({
                    ...I
                  });
                });
              }, $);
              u.current.set(I.name, W);
            } else if (A5n(I, aMt)) lD("MCP", 1);
            break;
          }
        case "needs-auth":
          if (A5n(I, aMt)) lD("MCP", 1);
          break;
        case "pending":
        case "disabled":
          break;
      }
    }, [c, v, g, l]),
    k: any = getSessionId();
  iH.useEffect(() => {
    if (n) return;
    async function I() {
      let {
          servers: P,
          errors: L,
          warnings: D
        } = t ? {
          servers: {},
          errors: [],
          warnings: []
        } : await getClaudeCodeMcpConfigs(e),
        {
          configs: N,
          blocked: O
        } = filterDynamicMcpServersByPolicy(e),
        $: any = {
          ...P,
          ...N
        };
      if (O.length > 0) {
        O.sort(), logForDebugging(`MCP servers blocked by managed policy at connect time: ${O.join(", ")}`, {
          level: "warn"
        });
        let U: any = O.join(",");
        if (m.current !== U) m.current = U, g({
          key: "mcp-blocked-policy",
          kind: "warning",
          priority: "high",
          text: `MCP ${Cn(O.length, "server")} blocked by enterprise policy: ${O.join(", ")}`,
          color: "warning",
          timeoutMs: 12000
        });
        for (let W of O) {
          let G: any = e?.[W];
          if (G) mx(W, G).catch(() => {});
        }
      } else m.current = null;
      Upl(l, L), $pl(l, D), l((U: any) => {
        let {
          stale: W,
          ...G
        } = RQi(U.mcp, $);
        for (let K of W) {
          let Y: any = u.current.get(K.name);
          if (Y) Y(), u.current.delete(K.name);
          if (A.current.delete(K.name), p.current.delete(K.name), K.type === "connected") K.client.onclose = void 0, mx(K.name, K.config).catch(() => {});
        }
        let V: any = new Set(G.clients.map((K: any) => K.name)),
          Q: any = Object.entries($).filter(([K]) => !V.has(K)).map(([K, Y]) => ({
            name: K,
            type: isMcpServerDisabled(K) ? "disabled" : "pending",
            config: Y
          }));
        if (Q.length === 0 && W.length === 0) return U;
        return {
          ...U,
          mcp: {
            ...U.mcp,
            ...G,
            clients: [...G.clients, ...Q]
          }
        };
      });
    }
    I().catch((P: any) => {
      wu("useManageMCPConnections", `Failed to initialize servers as pending: ${Se(P)}`);
    });
  }, [t, e, l, k, a, i]), iH.useEffect(() => {
    if (n) return;
    let I: any = !1;
    async function P() {
      let L: any;
      if (t || shouldSkipClaudeAiFetchForEnterpriseLockdown()) L = Promise.resolve({});else {
        if (hQi(), s.current !== void 0 && s.current !== o) rHn();
        s.current = o, L = jxe();
      }
      let {
        servers: D,
        errors: N,
        warnings: O
      } = t ? {
        servers: {},
        errors: [],
        warnings: []
      } : await getClaudeCodeMcpConfigs(e);
      if (I) return;
      Upl(l, N), $pl(l, O);
      let $: any = {
          ...D,
          ...filterDynamicMcpServersByPolicy(e).configs
        },
        U: any = yee($, (K: any, Y: any) => isMcpServerDisabled(Y));
      n9e(R, U).catch((K: any) => {
        wu("useManageMcpConnections", `Failed to get MCP resources: ${Se(K)}`);
      });
      let W: any = {};
      if (!t) {
        let {
          allowed: K,
          blocked: Y
        } = filterMcpServersByPolicy(await L);
        if (W = K, I) return;
        if (hasDisableClaudeAiConnectors()) for (let te of r.getState().mcp.clients) {
          if (te.config.scope !== "claudeai") continue;
          if (te.type === "disabled") continue;
          let ne: any = u.current.get(te.name);
          if (ne) ne(), u.current.delete(te.name);
          if (A.current.delete(te.name), p.current.delete(te.name), te.type === "connected") te.client.onclose = void 0, mx(te.name, te.config).catch(() => {});
          v({
            name: te.name,
            type: "failed",
            config: te.config,
            error: "Disabled by disableClaudeAiConnectors setting"
          });
        }
        if (Y.length > 0) {
          logForDebugging(`claude.ai connectors blocked by managed policy at connect time: ${Y.join(", ")}`, {
            level: "warn"
          });
          for (let te of Y) {
            let ne: any = r.getState().mcp.clients.find((oe: any) => oe.name === te && oe.config.scope === "claudeai");
            if (!ne) continue;
            let re: any = u.current.get(te);
            if (re) re(), u.current.delete(te);
            if (ne.type === "connected") ne.client.onclose = void 0, mx(te, ne.config).catch(() => {});
            v({
              name: te,
              type: "failed",
              config: ne.config,
              error: "Blocked by enterprise managed policy"
            });
          }
        }
        let J: any = y7r();
        if (J) g({
          key: "claudeai-mcp-cross-org-override",
          priority: "immediate",
          text: J.level === "error" ? J.message : `\u26A0 ${J.message}`,
          color: J.level === "error" ? "error" : "warning",
          timeoutMs: 20000
        });
        let ee: any = [];
        if (Object.keys(W).length > 0) {
          let {
            servers: te,
            suppressed: ne
          } = await dedupClaudeAiMcpServers(W, $);
          if (I) return;
          W = te, ee = ne;
        }
        if (l((te: any) => suppressedConnectorsEqual(te.mcp.suppressedClaudeAiConnectors ?? [], ee) ? te : {
          ...te,
          mcp: {
            ...te.mcp,
            suppressedClaudeAiConnectors: ee
          }
        }), Object.keys(W).length > 0) {
          l((ne: any) => {
            let re: any = new Set(ne.mcp.clients.map((ce: any) => ce.name)),
              oe: any = Object.entries(W).filter(([ce]) => !re.has(ce)).map(([ce, ue]) => ({
                name: ce,
                type: isMcpServerDisabled(ce) ? "disabled" : "pending",
                config: ue
              }));
            if (oe.length === 0) return ne;
            return {
              ...ne,
              mcp: {
                ...ne.mcp,
                clients: [...ne.mcp.clients, ...oe]
              }
            };
          });
          let te: any = yee(W, (ne: any, re: any) => isMcpServerDisabled(re));
          n9e(R, te).catch((ne: any) => {
            wu("useManageMcpConnections", `Failed to get claude.ai MCP resources: ${Se(ne)}`);
          });
        }
      }
      let G: any = {
          ...$,
          ...W
        },
        V: any = {
          enterprise: 0,
          global: 0,
          project: 0,
          user: 0,
          plugin: 0,
          agent: 0,
          claudeai: 0
        },
        Q: any = [];
      for (let [K, Y] of Object.entries(G)) if (Y.scope === "enterprise") V.enterprise++;else if (Y.scope === "user") V.global++;else if (Y.scope === "project") V.project++;else if (Y.scope === "local") V.user++;else if (Y.scope === "dynamic") V.plugin++;else if (Y.scope === "agent") V.agent++;else if (Y.scope === "claudeai") V.claudeai++;
      logEvent("tengu_mcp_servers", {
        ...V,
        ...!1
      });
    }
    return P(), () => {
      I = !0;
    };
  }, [t, e, R, l, o, k, a, i]), iH.useEffect(() => {
    let I: any = u.current;
    return () => {
      for (let P of I.values()) P();
      if (I.clear(), T.current !== null) T.current(), T.current = null, S();
    };
  }, [S]);
  let x: any = iH.useCallback(async (I: any) => {
      let P: any = d.current.get(I);
      if (P) return P;
      let L: any = r.getState().mcp.clients.find((O: any) => O.name === I);
      if (!L) throw Error(`MCP server ${I} not found`);
      let D: any = u.current.get(I);
      if (D) D(), u.current.delete(I);
      let N: any = (async () => {
        v({
          name: I,
          type: "pending",
          config: L.config
        });
        try {
          let O: any = e?.[I] ?? (t ? void 0 : (await getClaudeCodeMcpConfigs(e)).servers[I]) ?? L.config;
          if (isMcpServerBlockedAtConnectTime(I, O)) throw markClaudeInChromeUnwiredIfChrome(I), Error(`MCP server ${I} is blocked by enterprise managed policy`);
          if (L.type === "connected") L.client.onclose = void 0;
          let $: any = await zz(I, O);
          return R($), $;
        } catch (O) {
          throw v(L), O;
        }
      })();
      d.current.set(I, N);
      try {
        return await N;
      } finally {
        d.current.delete(I);
      }
    }, [r, v, R, e, t]),
    H: any = iH.useCallback(async (I: any) => {
      let P: any = r.getState().mcp.clients.find((D: any) => D.name === I);
      if (!P) throw Error(`MCP server ${I} not found`);
      if (P.type !== "disabled") {
        let D: any = u.current.get(I);
        if (D) D(), u.current.delete(I);
        if (setMcpServerEnabled(I, !1), A.current.delete(I), p.current.delete(I), P.type === "connected") await mx(I, P.config);
        let N: any = {
          name: I,
          type: "disabled",
          config: P.config
        };
        return v(N), N;
      } else {
        let D: any = e?.[I] ?? (t ? void 0 : (await getClaudeCodeMcpConfigs(e)).servers[I]) ?? P.config;
        if (isMcpServerBlockedAtConnectTime(I, D)) throw markClaudeInChromeUnwiredIfChrome(I), Error(`MCP server ${I} is blocked by enterprise managed policy`);
        setMcpServerEnabled(I, !0), v({
          name: I,
          type: "pending",
          config: D
        });
        let N: any = await zz(I, D);
        return R(N), N.client;
      }
    }, [r, v, R, e, t]);
  return {
    reconnectMcpServer: x,
    toggleMcpServer: H
  };
}
// Map transport type string to a human-readable label
function Lzp(e: any): any {
  switch (e) {
    case "http":
      return "HTTP";
    case "ws":
    case "ws-ide":
      return "WebSocket";
    default:
      return "SSE";
  }
}
var iH: any,
  CSo: any,
  Npl = () => void Promise.resolve().then(() => (ESo(), bSo)).then((e: any) => e.clearSkillIndexCache(), () => {}),
  amt = 5,
  Bpl = 1000,
  Fpl = 30000,
  D5n = 3;
var jpl = b(() => {
  lt();
  lt();
  O0();
  Pee();
  YT();
  m2n();
  Vnt();
  Exn();
  Ct();
  px();
  qe();
  ym();
  yr();
  lt();
  Ld();
  yUe();
  configProtoStore();
  rye();
  bt();
  Rn();
  sA();
  EJ();
  dr();
  Gqe();
  edo();
  Iee();
  RHn();
  scalar();
  CL();
  iH = M(Te(), 1), CSo = (MKr(), ro(LKr)).fetchMcpSkillsForClient;
});
export {P5n,Upl,$pl,qpl,Lzp,iH,CSo,Npl,amt,Bpl,Fpl,D5n,jpl};
