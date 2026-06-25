// @ts-nocheck
import {lB,qO} from "../mcp/3159_scope.ts";
import {getMainThreadAgentType as JL,lt} from "../session/0132_sent.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {t_} from "../../vendor/m2594.ts";
import {getConfigFilePath as $G,eWe} from "../../vendor/m4595.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Dy,getSettingsSchema as ZS,SE} from "../../vendor/m2559.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {Rxn,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {isDebugMode as QL,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {oy,B8} from "../../vendor/m2385.ts";
import {nht,LKn} from "../../vendor/m4603.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {Sn,lr} from "../../vendor/m233.ts";
import {eQ,I5,Pa} from "../../vendor/m720.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {useTheme as ji} from "../../vendor/m2285.ts";
import {color as wo} from "../../vendor/m2431.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * MCP server management dialog (TUI).
 *
 * Renders the "Manage MCP servers" list grouped by scope (project / local /
 * user / enterprise / agent), plus claude.ai connectors, agent MCPs and
 * built-in dynamic MCPs. Handles selection, scrolling and the duplicate /
 * suppressed-connector hints.
 *
 * NOTE: module-level symbols (BSl, Wrm, Grm, g7n, Kvo, Vrm, Krm, gWt, USl, p9,
 * zl, FSl, zvo, …) are minified cross-module bindings and must stay verbatim.
 * Only local bindings are renamed below.
 */

/** Build the heading {label,path} for an MCP scope. */
function BSl(scope) {
  switch (scope) {
    case "project":
      return {
        label: "Project MCPs",
        path: lB(scope)
      };
    case "user":
      return {
        label: "User MCPs",
        path: lB(scope)
      };
    case "local":
      return {
        label: "Local MCPs",
        path: lB(scope)
      };
    case "enterprise":
      return {
        label: "Enterprise MCPs"
      };
    case "agent":
      {
        let agentType = JL();
        return {
          label: "Active agent MCPs",
          path: agentType ? `@${agentType} frontmatter` : "agent frontmatter"
        };
      }
    case "dynamic":
      return {
        label: "Built-in MCPs",
        path: "always available"
      };
    default:
      return {
        label: scope
      };
  }
}

/** Hint shown for a connector suppressed because it duplicates another server. */
function Wrm(props) {
  let cache = gWt.c(12),
    {
      s: suppressed
    } = props;
  if (suppressed.duplicateOf.startsWith("plugin:")) {
    let node;
    if (cache[0] === Symbol.for("react.memo_cache_sentinel")) node = zl.jsx(v, {
      dimColor: !0,
      children: "To use this connector instead, disable the plugin server in /plugins"
    }), cache[0] = node;else node = cache[0];
    return node;
  }
  switch (suppressed.duplicateOfScope) {
    case "local":
    case "user":
    case "project":
      {
        let removeCommand;
        if (cache[1] !== suppressed.duplicateOf) removeCommand = t_("mcp remove", suppressed.duplicateOf), cache[1] = suppressed.duplicateOf, cache[2] = removeCommand;else removeCommand = cache[2];
        let command = removeCommand,
          instruction;
        if (cache[3] !== command || cache[4] !== suppressed.duplicateOf || cache[5] !== suppressed.duplicateOfScope) instruction = command ? zl.jsxs(zl.Fragment, {
          children: ["run ", zl.jsx(v, {
            bold: !0,
            children: command
          })]
        }) : `remove the ${suppressed.duplicateOfScope}-scope server "${suppressed.duplicateOf}"`, cache[3] = command, cache[4] = suppressed.duplicateOf, cache[5] = suppressed.duplicateOfScope, cache[6] = instruction;else instruction = cache[6];
        let node;
        if (cache[7] !== instruction) node = zl.jsxs(v, {
          dimColor: !0,
          children: ["To use this connector instead,", " ", instruction]
        }), cache[7] = instruction, cache[8] = node;else node = cache[8];
        return node;
      }
    case "dynamic":
      {
        let node;
        if (cache[9] === Symbol.for("react.memo_cache_sentinel")) node = zl.jsx(v, {
          dimColor: !0,
          children: "To use this connector instead, drop it from your --mcp-config flag"
        }), cache[9] = node;else node = cache[9];
        return node;
      }
    case "enterprise":
    case "managed":
      {
        let node;
        if (cache[10] === Symbol.for("react.memo_cache_sentinel")) node = zl.jsx(v, {
          dimColor: !0,
          children: "An admin-managed server takes precedence here"
        }), cache[10] = node;else node = cache[10];
        return node;
      }
    default:
      {
        let node;
        if (cache[11] === Symbol.for("react.memo_cache_sentinel")) node = zl.jsx(v, {
          dimColor: !0,
          children: "To use this connector instead, remove the duplicate server from your configuration"
        }), cache[11] = node;else node = cache[11];
        return node;
      }
  }
}

/** Group servers by scope, sorting each bucket by name. */
function Grm(servers) {
  let byScope = new Map();
  for (let server of servers) {
    let scope = server.scope;
    if (!byScope.has(scope)) byScope.set(scope, []);
    byScope.get(scope).push(server);
  }
  for (let [, bucket] of byScope) bucket.sort((a, b) => a.name.localeCompare(b.name));
  return byScope;
}

/** Group heading row: bold label with an optional dimmed path. */
function g7n(props) {
  let cache = gWt.c(8),
    {
      label: label,
      path: path
    } = props,
    labelNode;
  if (cache[0] !== label) labelNode = zl.jsx(v, {
    bold: !0,
    children: label
  }), cache[0] = label, cache[1] = labelNode;else labelNode = cache[1];
  let hasPath = path ?? !1,
    pathNode;
  if (cache[2] !== path || cache[3] !== hasPath) pathNode = zl.jsx($G, {
    when: hasPath,
    children: path
  }), cache[2] = path, cache[3] = hasPath, cache[4] = pathNode;else pathNode = cache[4];
  let node;
  if (cache[5] !== labelNode || cache[6] !== pathNode) node = zl.jsxs($, {
    paddingLeft: 2,
    children: [labelNode, pathNode]
  }), cache[5] = labelNode, cache[6] = pathNode, cache[7] = node;else node = cache[7];
  return node;
}

/** Main MCP management dialog component. */
function Kvo({
  servers: servers,
  suppressedClaudeAiConnectors: suppressedConnectors = [],
  toolCountsByServer: toolCounts = {},
  agentServers: agentServersProp,
  onSelectServer: onSelectServer,
  onSelectAgentServer: onSelectAgentServer,
  onComplete: onComplete,
  showUnusedConnectors: showUnusedConnectors,
  onToggleUnusedConnectors: onToggleUnusedConnectors
}) {
  let [selectedIndex, setSelectedIndex] = p9.useState(0),
    {
      rows: rows
    } = Dy(_r()),
    isCompact = ZS(),
    agentServers = p9.useMemo(() => {
      let configuredAgentNames = new Set(servers.filter(server => server.scope === "agent").map(server => server.name));
      if (configuredAgentNames.size === 0) return agentServersProp;
      return agentServersProp.filter(agentServer => !configuredAgentNames.has(agentServer.name));
    }, [servers, agentServersProp]),
    serversByScope = p9.useMemo(() => {
      let nonClaudeAi = servers.filter(server => server.client.config.type !== "claudeai-proxy");
      return Grm(nonClaudeAi);
    }, [servers]),
    {
      claudeAiServers: claudeAiServers,
      unusedClaudeAiServers: unusedClaudeAiServers
    } = p9.useMemo(() => {
      let everConnected = Rxn(),
        active = [],
        unused = [];
      for (let server of servers) {
        if (server.client.config.type !== "claudeai-proxy") continue;
        if ((server.client.type === "needs-auth" || server.client.type === "failed") && !everConnected.has(server.name)) unused.push(server);else active.push(server);
      }
      return active.sort((a, b) => a.name.localeCompare(b.name)), unused.sort((a, b) => a.name.localeCompare(b.name)), {
        claudeAiServers: active,
        unusedClaudeAiServers: unused
      };
    }, [servers]),
    dynamicServers = p9.useMemo(() => (serversByScope.get("dynamic") ?? []).sort((a, b) => a.name.localeCompare(b.name)), [serversByScope]),
    selectableItems = p9.useMemo(() => {
      let items = [];
      for (let scope of FSl) {
        let bucket = serversByScope.get(scope) ?? [];
        for (let server of bucket) items.push({
          type: "server",
          server: server
        });
      }
      for (let server of claudeAiServers) items.push({
        type: "server",
        server: server
      });
      if (unusedClaudeAiServers.length > 0) {
        if (items.push({
          type: "unused-connectors-fold"
        }), showUnusedConnectors) for (let server of unusedClaudeAiServers) items.push({
          type: "server",
          server: server
        });
      }
      for (let agentServer of agentServers) items.push({
        type: "agent-server",
        agentServer: agentServer
      });
      for (let server of dynamicServers) items.push({
        type: "server",
        server: server
      });
      return items;
    }, [serversByScope, claudeAiServers, unusedClaudeAiServers, showUnusedConnectors, agentServers, dynamicServers]),
    handleCancel = p9.useCallback(() => {
      onComplete("MCP dialog dismissed", {
        display: "system"
      });
    }, [onComplete]),
    handleConfirm = p9.useCallback(() => {
      let item = selectableItems[selectedIndex];
      if (!item) return;
      if (item.type === "server") onSelectServer(item.server);else if (item.type === "agent-server") onSelectAgentServer(item.agentServer);else if (item.type === "unused-connectors-fold") onToggleUnusedConnectors();
    }, [selectableItems, selectedIndex, onSelectServer, onSelectAgentServer, onToggleUnusedConnectors]);
  Oo({
    "confirm:previous": () => setSelectedIndex(prev => prev === 0 ? selectableItems.length - 1 : prev - 1),
    "confirm:next": () => setSelectedIndex(prev => prev === selectableItems.length - 1 ? 0 : prev + 1),
    "confirm:yes": handleConfirm,
    "confirm:no": handleCancel
  }, {
    context: "Confirmation"
  }), p9.useEffect(() => {
    setSelectedIndex(prev => Math.min(prev, Math.max(0, selectableItems.length - 1)));
  }, [selectableItems.length]);
  let debugMode = QL(),
    hasFailedServer = p9.useMemo(() => {
      let unusedNames = showUnusedConnectors ? void 0 : new Set(unusedClaudeAiServers.map(server => server.name));
      return servers.some(server => server.client.type === "failed" && !unusedNames?.has(server.name));
    }, [servers, unusedClaudeAiServers, showUnusedConnectors]),
    rowItems = p9.useMemo(() => {
      let rowList = [],
        selectableCounter = 0;
      function pushServerRow(server, key) {
        let selectableIndex = selectableCounter++;
        rowList.push({
          key: key,
          selectableIndex: selectableIndex,
          node: zl.jsx(Vrm, {
            server: server,
            isSelected: selectedIndex === selectableIndex,
            toolCount: toolCounts[server.name]
          })
        });
      }
      for (let scope of FSl) {
        let bucket = serversByScope.get(scope);
        if (!bucket || bucket.length === 0) continue;
        let heading = BSl(scope);
        rowList.push({
          key: `heading-${scope}`,
          node: zl.jsx(g7n, {
            label: heading.label,
            path: heading.path
          })
        });
        for (let server of bucket) pushServerRow(server, `${scope}-${server.name}`);
        rowList.push({
          key: `spacer-${scope}`,
          node: zl.jsx(v, {
            children: " "
          })
        });
      }
      if (claudeAiServers.length > 0 || unusedClaudeAiServers.length > 0 || suppressedConnectors.length > 0) {
        rowList.push({
          key: "heading-claudeai",
          node: zl.jsx(g7n, {
            label: "claude.ai"
          })
        });
        for (let server of claudeAiServers) pushServerRow(server, `claudeai-${server.name}`);
        if (unusedClaudeAiServers.length > 0) {
          let foldIndex = selectableCounter++;
          if (rowList.push({
            key: "claudeai-unused-fold",
            selectableIndex: foldIndex,
            node: zl.jsx($, {
              children: zl.jsxs(v, {
                color: selectedIndex === foldIndex ? "suggestion" : void 0,
                children: [selectedIndex === foldIndex ? `${Xe.pointer} ` : "  ", showUnusedConnectors ? Xe.arrowDown : Xe.arrowRight, " ", "Show unused connectors", " ", zl.jsxs(v, {
                  dimColor: !0,
                  children: ["(", unusedClaudeAiServers.length, ")"]
                })]
              })
            })
          }), showUnusedConnectors) for (let server of unusedClaudeAiServers) pushServerRow(server, `claudeai-${server.name}`);
        }
        for (let connector of suppressedConnectors) rowList.push({
          key: `suppressed-${connector.name}`,
          node: zl.jsxs($, {
            children: [zl.jsx(v, {
              children: "  "
            }), zl.jsx(v, {
              children: connector.name
            }), zl.jsxs(v, {
              dimColor: !0,
              children: [" ", "\xB7 ", Xe.radioOff, " hidden — same URL as your server '", connector.duplicateOf, "'"]
            })]
          })
        }), rowList.push({
          key: `suppressed-hint-${connector.name}`,
          node: zl.jsx($, {
            paddingLeft: 4,
            children: zl.jsx(Wrm, {
              s: connector
            })
          })
        });
        rowList.push({
          key: "spacer-claudeai",
          node: zl.jsx(v, {
            children: " "
          })
        });
      }
      if (agentServers.length > 0) {
        rowList.push({
          key: "heading-agent-mcps",
          node: zl.jsx(g7n, {
            label: "Agent MCPs"
          })
        });
        let agentBaseIndex = selectableCounter;
        for (let sourceAgent of os(agentServers.flatMap(agentServer => agentServer.sourceAgents))) {
          rowList.push({
            key: `spacer-agent-${sourceAgent}`,
            node: zl.jsx(v, {
              children: " "
            })
          }), rowList.push({
            key: `subheading-agent-${sourceAgent}`,
            node: zl.jsx($, {
              paddingLeft: 2,
              children: zl.jsxs(v, {
                dimColor: !0,
                children: ["@", sourceAgent]
              })
            })
          });
          for (let agentServer of agentServers.filter(candidate => candidate.sourceAgents.includes(sourceAgent))) {
            let agentRowIndex = agentBaseIndex + agentServers.indexOf(agentServer);
            rowList.push({
              key: `agent-${sourceAgent}-${agentServer.name}`,
              selectableIndex: agentRowIndex,
              node: zl.jsx(Krm, {
                agentServer: agentServer,
                isSelected: selectedIndex === agentRowIndex
              })
            });
          }
        }
        selectableCounter = agentBaseIndex + agentServers.length, rowList.push({
          key: "spacer-agent-mcps",
          node: zl.jsx(v, {
            children: " "
          })
        });
      }
      if (dynamicServers.length > 0) {
        let heading = BSl("dynamic");
        rowList.push({
          key: "heading-dynamic",
          node: zl.jsx(g7n, {
            label: heading.label,
            path: heading.path
          })
        });
        for (let server of dynamicServers) pushServerRow(server, `dynamic-${server.name}`);
        rowList.push({
          key: "spacer-dynamic",
          node: zl.jsx(v, {
            children: " "
          })
        });
      }
      if (rowList.at(-1)?.key.startsWith("spacer-")) rowList.pop();
      return rowList;
    }, [serversByScope, claudeAiServers, unusedClaudeAiServers, showUnusedConnectors, suppressedConnectors, agentServers, dynamicServers, selectedIndex, toolCounts]);
  if (servers.length === 0 && agentServers.length === 0 && suppressedConnectors.length === 0) return null;
  let totalServerCount = servers.length + agentServers.length,
    maxVisibleRows = Math.max(qrm, rows - (isCompact ? $rm : Urm) - (hasFailedServer ? 1 : 0)),
    isScrollable = rowItems.length > maxVisibleRows,
    visibleCount = isScrollable ? Math.max(1, maxVisibleRows - 2) : maxVisibleRows,
    selectedRowIndex = Math.max(0, rowItems.findIndex(row => row.selectableIndex === selectedIndex)),
    scrollOffset = oy(selectedRowIndex - Math.floor(visibleCount / 2), 0, Math.max(0, rowItems.length - visibleCount)),
    visibleRows = rowItems.slice(scrollOffset, scrollOffset + visibleCount),
    aboveCount = scrollOffset,
    belowCount = rowItems.length - (scrollOffset + visibleRows.length);
  return zl.jsxs($, {
    flexDirection: "column",
    children: [zl.jsx(nht, {}), zl.jsx(Jn, {
      title: "Manage MCP servers",
      subtitle: `${totalServerCount} ${Sn(totalServerCount, "server")}`,
      onCancel: handleCancel,
      hideInputGuide: !0,
      children: zl.jsxs($, {
        flexDirection: "column",
        children: [aboveCount > 0 && zl.jsx($, {
          paddingLeft: 2,
          children: zl.jsxs(v, {
            dimColor: !0,
            children: [eQ, " ", aboveCount, " more above"]
          })
        }), visibleRows.map(row => zl.jsx(USl.Fragment, {
          children: row.node
        }, row.key)), belowCount > 0 && zl.jsx($, {
          paddingLeft: 2,
          children: zl.jsxs(v, {
            dimColor: !0,
            children: [I5, " ", belowCount, " more below"]
          })
        }), zl.jsxs($, {
          flexDirection: "column",
          marginTop: isScrollable ? 0 : 1,
          children: [hasFailedServer && zl.jsx(v, {
            dimColor: !0,
            children: debugMode ? "※ Error logs shown inline with --debug" : "※ Run claude --debug to see error logs"
          }), zl.jsxs(v, {
            dimColor: !0,
            children: [zl.jsx(Ss, {
              url: "https://code.claude.com/docs/en/mcp",
              children: "https://code.claude.com/docs/en/mcp"
            }), " ", "for help"]
          })]
        })]
      })
    }), zl.jsx($, {
      paddingX: 1,
      children: zl.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: zl.jsxs(bn, {
          children: [zl.jsx(at, {
            chord: ["up", "down"],
            action: "navigate"
          }), zl.jsx(at, {
            chord: "enter",
            action: "confirm"
          }), zl.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "cancel"
          })]
        })
      })
    })]
  });
}

/** Single MCP server row: status icon + name + status text. */
function Vrm(props) {
  let cache = gWt.c(35),
    {
      server: server,
      isSelected: isSelected,
      toolCount: toolCount
    } = props,
    [theme] = ji(),
    statusIcon,
    statusText;
  if (server.client.type === "disabled") {
    let icon;
    if (cache[0] !== theme) icon = wo("inactive", theme)(Xe.radioOff), cache[0] = theme, cache[1] = icon;else icon = cache[1];
    statusIcon = icon, statusText = "disabled";
  } else if (server.client.type === "connected") {
    let hasTools = !!server.client.capabilities?.tools;
    if (server.client.toolsListError) {
      let icon;
      if (cache[2] !== theme) icon = wo("warning", theme)(Xe.triangleUpOutline), cache[2] = theme, cache[3] = icon;else icon = cache[3];
      statusIcon = icon, statusText = "connected \xB7 tools fetch failed";
    } else if (hasTools && toolCount === 0) {
      let icon;
      if (cache[4] !== theme) icon = wo("warning", theme)(Xe.triangleUpOutline), cache[4] = theme, cache[5] = icon;else icon = cache[5];
      statusIcon = icon, statusText = "connected \xB7 no tools";
    } else if (hasTools && toolCount !== void 0) {
      let icon;
      if (cache[6] !== theme) icon = wo("success", theme)(Xe.tick), cache[6] = theme, cache[7] = icon;else icon = cache[7];
      statusIcon = icon;
      let toolLabel;
      if (cache[8] !== toolCount) toolLabel = Sn(toolCount, "tool"), cache[8] = toolCount, cache[9] = toolLabel;else toolLabel = cache[9];
      statusText = `connected \xB7 ${toolCount} ${toolLabel}`;
    } else {
      let icon;
      if (cache[10] !== theme) icon = wo("success", theme)(Xe.tick), cache[10] = theme, cache[11] = icon;else icon = cache[11];
      statusIcon = icon, statusText = "connected";
    }
  } else if (server.client.type === "pending") {
    let icon;
    if (cache[12] !== theme) icon = wo("inactive", theme)(Xe.radioOff), cache[12] = theme, cache[13] = icon;else icon = cache[13];
    statusIcon = icon;
    let {
      reconnectAttempt: reconnectAttempt,
      maxReconnectAttempts: maxReconnectAttempts
    } = server.client;
    if (reconnectAttempt && maxReconnectAttempts) statusText = `reconnecting (${reconnectAttempt}/${maxReconnectAttempts})…`;else statusText = "connecting…";
  } else if (server.client.type === "needs-auth") {
    let icon;
    if (cache[14] !== theme) icon = wo("warning", theme)(Xe.triangleUpOutline), cache[14] = theme, cache[15] = icon;else icon = cache[15];
    statusIcon = icon, statusText = "needs authentication";
  } else {
    let icon;
    if (cache[16] !== theme) icon = wo("error", theme)(Xe.cross), cache[16] = theme, cache[17] = icon;else icon = cache[17];
    statusIcon = icon, statusText = server.client.errorCode === "INVALID_CONFIG" ? "config issue" : "failed";
  }
  let pointerColor = isSelected ? "suggestion" : void 0,
    pointerText = isSelected ? `${Xe.pointer} ` : "  ",
    pointerNode;
  if (cache[18] !== pointerColor || cache[19] !== pointerText) pointerNode = zl.jsx(v, {
    color: pointerColor,
    children: pointerText
  }), cache[18] = pointerColor, cache[19] = pointerText, cache[20] = pointerNode;else pointerNode = cache[20];
  let nameColor = isSelected ? "suggestion" : void 0,
    nameNode;
  if (cache[21] !== server.name || cache[22] !== nameColor) nameNode = zl.jsx(v, {
    color: nameColor,
    children: server.name
  }), cache[21] = server.name, cache[22] = nameColor, cache[23] = nameNode;else nameNode = cache[23];
  let dimIcon = !isSelected,
    iconNode;
  if (cache[24] !== statusIcon || cache[25] !== dimIcon) iconNode = zl.jsxs(v, {
    dimColor: dimIcon,
    children: [" \xB7 ", statusIcon, " "]
  }), cache[24] = statusIcon, cache[25] = dimIcon, cache[26] = iconNode;else iconNode = cache[26];
  let dimText = !isSelected,
    textNode;
  if (cache[27] !== statusText || cache[28] !== dimText) textNode = zl.jsx(v, {
    dimColor: dimText,
    children: statusText
  }), cache[27] = statusText, cache[28] = dimText, cache[29] = textNode;else textNode = cache[29];
  let node;
  if (cache[30] !== pointerNode || cache[31] !== nameNode || cache[32] !== iconNode || cache[33] !== textNode) node = zl.jsxs($, {
    children: [pointerNode, nameNode, iconNode, textNode]
  }), cache[30] = pointerNode, cache[31] = nameNode, cache[32] = iconNode, cache[33] = textNode, cache[34] = node;else node = cache[34];
  return node;
}

/** Single agent-provided MCP server row. */
function Krm(props) {
  let cache = gWt.c(20),
    {
      agentServer: agentServer,
      isSelected: isSelected
    } = props,
    [theme] = ji(),
    statusIcon;
  if (cache[0] !== agentServer.needsAuth || cache[1] !== theme) statusIcon = agentServer.needsAuth ? wo("warning", theme)(Xe.triangleUpOutline) : wo("inactive", theme)(Xe.radioOff), cache[0] = agentServer.needsAuth, cache[1] = theme, cache[2] = statusIcon;else statusIcon = cache[2];
  let icon = statusIcon,
    statusText = agentServer.needsAuth ? "may need auth" : "agent-only",
    pointerColor = isSelected ? "suggestion" : void 0,
    pointerText = isSelected ? `${Xe.pointer} ` : "  ",
    pointerNode;
  if (cache[3] !== pointerColor || cache[4] !== pointerText) pointerNode = zl.jsx(v, {
    color: pointerColor,
    children: pointerText
  }), cache[3] = pointerColor, cache[4] = pointerText, cache[5] = pointerNode;else pointerNode = cache[5];
  let nameColor = isSelected ? "suggestion" : void 0,
    nameNode;
  if (cache[6] !== agentServer.name || cache[7] !== nameColor) nameNode = zl.jsx(v, {
    color: nameColor,
    children: agentServer.name
  }), cache[6] = agentServer.name, cache[7] = nameColor, cache[8] = nameNode;else nameNode = cache[8];
  let dimIcon = !isSelected,
    iconNode;
  if (cache[9] !== icon || cache[10] !== dimIcon) iconNode = zl.jsxs(v, {
    dimColor: dimIcon,
    children: [" \xB7 ", icon, " "]
  }), cache[9] = icon, cache[10] = dimIcon, cache[11] = iconNode;else iconNode = cache[11];
  let dimText = !isSelected,
    textNode;
  if (cache[12] !== statusText || cache[13] !== dimText) textNode = zl.jsx(v, {
    dimColor: dimText,
    children: statusText
  }), cache[12] = statusText, cache[13] = dimText, cache[14] = textNode;else textNode = cache[14];
  let node;
  if (cache[15] !== textNode || cache[16] !== pointerNode || cache[17] !== nameNode || cache[18] !== iconNode) node = zl.jsxs($, {
    children: [pointerNode, nameNode, iconNode, textNode]
  }), cache[15] = textNode, cache[16] = pointerNode, cache[17] = nameNode, cache[18] = iconNode, cache[19] = node;else node = cache[19];
  return node;
}
var gWt,
  USl,
  p9,
  zl,
  Urm = 12,
  $rm = 5,
  qrm = 3,
  FSl;
var zvo = b(() => {
  Zs();
  lt();
  Pa();
  SE();
  ui();
  B8();
  je();
  ss();
  wW();
  qO();
  qe();
  lr();
  uc();
  eWe();
  Is();
  di();
  Wo();
  LKn();
  gWt = x(tt(), 1), USl = x(et(), 1), p9 = x(et(), 1), zl = x(oe(), 1), FSl = ["project", "local", "user", "enterprise", "agent"];
});

export {BSl,Wrm,Grm,g7n,Kvo,Vrm,Krm,gWt,USl,p9,zl,Urm,$rm,qrm,FSl,zvo};
