// @ts-nocheck
import {useTheme as ji} from "../../vendor/m2285.ts";
import {Df,TI} from "../../vendor/m2577.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {_t,bo,uo} from "../../vendor/m2468.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {hht,SPe,Sue} from "../../vendor/m4678.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {zA,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {Dxn,Bst,Ust,xxn,lB,qO} from "../mcp/3159_scope.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {Mge,DHe,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {sw,hg} from "../../vendor/m2280.ts";
import {fk,Sn,lr} from "../../vendor/m233.ts";
import {Ve} from "../../vendor/m5.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {kW,$9e} from "../../vendor/m3162.ts";
import {Uge,Ej,P$,wee} from "../config/3161_error.ts";
import {ln,vn} from "../session/0621_length.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {gd,xw} from "./3853_mode.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {ga,rh} from "../../vendor/m2550.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {kZe,$3,vfe} from "../../vendor/m2048.ts";
import {isFirstPartyProvider as Nl,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {getClaudeAIOAuthTokens as qs,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {bf,G8e} from "../../vendor/m4537.ts";
import {color as wo} from "../../vendor/m2431.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {_7n,Jvo} from "../../vendor/m4683.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {hr} from "../../vendor/m2573.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {TS} from "../../vendor/m4541.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function y7n(client) {
  let url = "url" in client.config ? client.config.url : null,
    errorCode = client.errorCode;
  if (errorCode === "INVALID_CONFIG" || errorCode === "AUTH_HEADER_REJECTED" || errorCode === "FIRST_PARTY_AUTH_REJECTED") return client.error ?? errorCode;
  if (errorCode) {
    let codeNum = Number(errorCode),
      desc = errorCode === "23" ? "request timed out" : Number.isInteger(codeNum) && codeNum >= 100 && codeNum <= 599 ? `HTTP ${errorCode}` : errorCode;
    return url ? `${desc} at ${url}` : desc;
  }
  return client.error ?? "";
}
function T7n(state, serverName, opts) {
  switch (state.client.type) {
    case "connected":
      if (state.client.toolsListError) return {
        message: `Reconnected to ${serverName}, but fetching tools failed: ${state.client.toolsListError}`,
        success: false
      };
      return {
        message: `Reconnected to ${serverName}.`,
        success: true
      };
    case "needs-auth":
      return {
        message: opts?.hasHeadersHelper ? `${serverName} requires authentication. Use 'Authenticate' if the upstream server uses OAuth, or check the headersHelper script and use 'Reconnect'.` : `${serverName} requires authentication. Use the 'Authenticate' option.`,
        success: false
      };
    case "failed":
      {
        let reason = y7n(state.client);
        return {
          message: reason ? `Failed to reconnect to ${serverName}: ${reason}` : `Failed to reconnect to ${serverName}.`,
          success: false
        };
      }
    default:
      return {
        message: `Unknown result when reconnecting to ${serverName}.`,
        success: false
      };
  }
}
function yWt(err, serverName) {
  let msg = err instanceof Error ? err.message : String(err);
  return `Error reconnecting to ${serverName}: ${msg}`;
}
function cWe({
  server: server,
  serverToolsCount: serverToolsCount,
  onViewTools: onViewTools,
  onCancel: onCancel,
  onComplete: onComplete,
  borderless = false
}) {
  let [theme] = ji();
  Df();
  let {
      columns: columns
    } = _r(),
    [confirmingAuth, setConfirmingAuth] = $C.useState(false),
    [errorMessage, setErrorMessage] = $C.useState(null),
    mcpState = _t(s => s.mcp),
    updateStore = bo(),
    [authUrl, setAuthUrl] = $C.useState(null),
    [connecting, setConnecting] = $C.useState(false),
    abortRef = $C.useRef(null),
    [confirmingClaudeAiAuth, setConfirmingClaudeAiAuth] = $C.useState(false),
    [claudeAiAuthUrl, setClaudeAiAuthUrl] = $C.useState(null),
    [confirmingClearAuth, setConfirmingClearAuth] = $C.useState(false),
    [clearAuthBrowserOpened, setClearAuthBrowserOpened] = $C.useState(false),
    [copied, setCopied] = $C.useState(false),
    clock = As(),
    copyResetTimerRef = $C.useRef(undefined),
    unmountedRef = $C.useRef(false),
    [callbackUrl, setCallbackUrl] = $C.useState(""),
    [cursorOffset, setCursorOffset] = $C.useState(0),
    [setWaitingForCallback, setWaitingForCallback_2] = $C.useState(null);
  $C.useEffect(() => () => {
    if (unmountedRef.current = true, abortRef.current?.abort(), copyResetTimerRef.current !== undefined) copyResetTimerRef.current();
  }, []);
  let isAuthenticated = server.isAuthenticated || server.client.type === "connected" && serverToolsCount > 0,
    reconnectServer = hht(),
    completeClaudeAiAuth = $C.useCallback(async () => {
      setConfirmingClaudeAiAuth(false), setClaudeAiAuthUrl(null), setConnecting(true);
      try {
        let result = await reconnectServer(server.name),
          isConnected = result.client.type === "connected";
        if (W("tengu_claudeai_mcp_auth_completed", {
          success: isConnected
        }), isConnected) onComplete(`Authentication successful. Connected to ${server.name}.`);else if (result.client.type === "needs-auth") onComplete(`Tried reconnecting, but ${server.name} is still unauthorized. Make sure the browser sign-in completed, then try again from /mcp.`);else {
          let reason = result.client.type === "failed" ? y7n(result.client) : "";
          onComplete(reason ? `Tried reconnecting to ${server.name}, but the connection failed: ${reason}` : `Tried reconnecting to ${server.name}, but the connection failed. Restart Claude Code to retry.`);
        }
      } catch (err) {
        W("tengu_claudeai_mcp_auth_completed", {
          success: false
        }), onComplete(yWt(err, server.name));
      } finally {
        setConnecting(false);
      }
    }, [reconnectServer, server.name, onComplete]),
    confirmClaudeAiClearAuth = $C.useCallback(async () => {
      await zA(server.name, {
        ...server.config,
        scope: server.scope
      }), updateStore(s => {
        let clients = s.mcp.clients.map(c => c.name === server.name ? {
            ...c,
            type: "needs-auth"
          } : c),
          tools = Dxn(s.mcp.tools, server.name),
          commands = Bst(s.mcp.commands, server.name),
          resources = Ust(s.mcp.resources, server.name);
        return {
          ...s,
          mcp: {
            ...s.mcp,
            clients: clients,
            tools: tools,
            commands: commands,
            resources: resources
          }
        };
      }), W("tengu_claudeai_mcp_clear_auth_completed", {}), onComplete(`Disconnected from ${server.name}.`), setConfirmingClearAuth(false), setClearAuthBrowserOpened(false);
    }, [server.name, server.config, server.scope, updateStore, onComplete]);
  Or("confirm:no", () => {
    abortRef.current?.abort(), abortRef.current = null, setConfirmingAuth(false), setAuthUrl(null);
  }, {
    context: "Confirmation",
    isActive: confirmingAuth
  }), Or("confirm:no", () => {
    setConfirmingClaudeAiAuth(false), setClaudeAiAuthUrl(null);
  }, {
    context: "Confirmation",
    isActive: confirmingClaudeAiAuth
  }), Or("confirm:no", () => {
    setConfirmingClearAuth(false), setClearAuthBrowserOpened(false);
  }, {
    context: "Confirmation",
    isActive: confirmingClearAuth
  });
  function handleKeyDown(key) {
    if (key.key === "return" && confirmingClaudeAiAuth) key.preventDefault(), completeClaudeAiAuth();
    if (key.key === "return" && confirmingClearAuth) if (key.preventDefault(), clearAuthBrowserOpened) confirmClaudeAiClearAuth();else setClearAuthBrowserOpened(true), Zl(Mge());
    if (key.key === "c" && !key.ctrl && !key.meta && !copied) {
      let urlToCopy = authUrl || claudeAiAuthUrl || (clearAuthBrowserOpened ? Mge() : null);
      if (urlToCopy) key.preventDefault(), sw(urlToCopy).then(text => {
        if (unmountedRef.current) return;
        if (text) process.stdout.write(text);
        if (setCopied(true), copyResetTimerRef.current !== undefined) copyResetTimerRef.current();
        copyResetTimerRef.current = clock.setTimeout(() => setCopied(false), 2000);
      });
    }
  }
  let serverLabel = fk(String(server.name)),
    serverPromptsCount = xxn(mcpState.commands, server.name).length,
    toggleServerEnabled = SPe(),
    startClaudeAiAuth = $C.useCallback(async () => {
      let url = (server.config.type === "claudeai-proxy" ? DHe(server.config) : null) ?? Mge();
      setClaudeAiAuthUrl(url), setConfirmingClaudeAiAuth(true), W("tengu_claudeai_mcp_auth_started", {}), await Zl(url);
    }, [server.config]),
    startClaudeAiClearAuth = $C.useCallback(() => {
      setConfirmingClearAuth(true), W("tengu_claudeai_mcp_clear_auth_started", {});
    }, []),
    toggleEnabled = $C.useCallback(async () => {
      let wasEnabled = server.client.type !== "disabled";
      try {
        if (await toggleServerEnabled(server.name), server.config.type === "claudeai-proxy") W("tengu_claudeai_mcp_toggle", {
          new_state: Ve(wasEnabled ? "disabled" : "enabled")
        });
        onCancel();
      } catch (err) {
        onComplete(`Failed to ${wasEnabled ? "disable" : "enable"} MCP server '${server.name}': ${Ce(err)}`);
      }
    }, [server.client.type, server.config.type, server.name, toggleServerEnabled, onCancel, onComplete]),
    authenticate = $C.useCallback(async () => {
      let authResult = kW(server.name, {
        ...server.config,
        scope: server.scope
      });
      if (authResult.kind === "anthropic-hosted") {
        setErrorMessage(authResult.message);
        return;
      }
      if (authResult.kind !== "oauth") return;
      setConfirmingAuth(true), setErrorMessage(null);
      let controller = new AbortController();
      abortRef.current = controller;
      try {
        if (server.isAuthenticated) await Uge(server.name, authResult.config, {
          preserveStepUpState: true
        });
        await Ej(server.name, authResult.config, setAuthUrl, controller.signal, {
          onWaitingForCallback: cb => {
            setWaitingForCallback_2(() => cb);
          }
        }), W("tengu_mcp_auth_config_authenticate", {
          wasAuthenticated: server.isAuthenticated
        });
        let result = await reconnectServer(server.name);
        if (result.client.type === "connected") {
          let message = isAuthenticated ? `Authentication successful. Reconnected to ${server.name}.` : `Authentication successful. Connected to ${server.name}.`;
          onComplete(message);
        } else if (result.client.type === "needs-auth") onComplete(`Got new credentials, but ${server.name} rejected them on reconnect. Try re-authenticating, or restart Claude Code if it persists.`);else {
          ln(server.name, "Reconnection failed after authentication");
          let reason = result.client.type === "failed" ? y7n(result.client) : "";
          onComplete(reason ? `Got new credentials, but reconnecting to ${server.name} failed: ${reason}` : `Got new credentials, but reconnecting to ${server.name} failed. Restart Claude Code to retry.`);
        }
      } catch (err) {
        if (err instanceof Error && !(err instanceof P$)) setErrorMessage(err.message);
      } finally {
        setConfirmingAuth(false), abortRef.current = null, setWaitingForCallback_2(null), setCallbackUrl("");
      }
    }, [server.isAuthenticated, server.config, server.name, server.scope, onComplete, reconnectServer, isAuthenticated]),
    clearAuth = async () => {
      if (server.config.type === "claudeai-proxy") return;
      if (server.config) await Uge(server.name, server.config), W("tengu_mcp_auth_config_clear", {}), await zA(server.name, {
        ...server.config,
        scope: server.scope
      }), updateStore(s => {
        let clients = s.mcp.clients.map(c => c.name === server.name ? {
            ...c,
            type: "failed"
          } : c),
          tools = Dxn(s.mcp.tools, server.name),
          commands = Bst(s.mcp.commands, server.name),
          resources = Ust(s.mcp.resources, server.name);
        return {
          ...s,
          mcp: {
            ...s.mcp,
            clients: clients,
            tools: tools,
            commands: commands,
            resources: resources
          }
        };
      }), onComplete(`Authentication cleared for ${server.name}.`);
    };
  if (confirmingAuth) {
    let helperText = server.config.type !== "claudeai-proxy" && server.config.oauth?.xaa ? " Authenticating via your identity provider" : " A browser window will open for authentication";
    return Yo.jsxs($, {
      flexDirection: "column",
      gap: 1,
      padding: 1,
      tabIndex: 0,
      autoFocus: true,
      onKeyDown: handleKeyDown,
      children: [Yo.jsxs(v, {
        color: "claude",
        children: ["Authenticating with ", server.name, "\u2026"]
      }), Yo.jsxs($, {
        children: [Yo.jsx(gd, {}), Yo.jsx(v, {
          children: helperText
        })]
      }), authUrl && Yo.jsxs($, {
        flexDirection: "column",
        children: [Yo.jsxs($, {
          children: [Yo.jsxs(v, {
            dimColor: true,
            children: ["If your browser doesn't open automatically, copy this URL manually", " "]
          }), copied ? Yo.jsx(v, {
            color: "success",
            children: "(Copied!)"
          }) : Yo.jsx(v, {
            dimColor: true,
            children: Yo.jsx(at, {
              chord: "c",
              action: "copy",
              parens: true
            })
          })]
        }), Yo.jsx(Ss, {
          url: authUrl
        })]
      }), confirmingAuth && authUrl && setWaitingForCallback && Yo.jsxs($, {
        flexDirection: "column",
        marginTop: 1,
        children: [Yo.jsx(v, {
          dimColor: true,
          children: "If the redirect page shows a connection error, paste the URL from your browser's address bar:"
        }), Yo.jsxs($, {
          children: [Yo.jsxs(v, {
            dimColor: true,
            children: ["URL ", ">", " "]
          }), Yo.jsx(ga, {
            value: callbackUrl,
            onChange: setCallbackUrl,
            onSubmit: submitted => {
              setWaitingForCallback(submitted.trim()), setCallbackUrl("");
            },
            cursorOffset: cursorOffset,
            onChangeCursorOffset: setCursorOffset,
            columns: columns - 8
          })]
        })]
      }), Yo.jsx($, {
        marginLeft: 3,
        children: Yo.jsxs(v, {
          dimColor: true,
          children: ["Return here after authenticating in your browser. Press", " ", Yo.jsx(at, {
            chord: "escape",
            action: "go back"
          }), "."]
        })
      })]
    });
  }
  if (confirmingClaudeAiAuth) return Yo.jsxs($, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown,
    children: [Yo.jsxs(v, {
      color: "claude",
      children: ["Authenticating with ", server.name, "\u2026"]
    }), Yo.jsxs($, {
      children: [Yo.jsx(gd, {}), Yo.jsx(v, {
        children: " A browser window will open for authentication"
      })]
    }), claudeAiAuthUrl && Yo.jsxs($, {
      flexDirection: "column",
      children: [Yo.jsxs($, {
        children: [Yo.jsxs(v, {
          dimColor: true,
          children: ["If your browser doesn't open automatically, copy this URL manually", " "]
        }), copied ? Yo.jsx(v, {
          color: "success",
          children: "(Copied!)"
        }) : Yo.jsx(v, {
          dimColor: true,
          children: Yo.jsx(at, {
            chord: "c",
            action: "copy",
            parens: true
          })
        })]
      }), Yo.jsx(Ss, {
        url: claudeAiAuthUrl
      })]
    }), Yo.jsxs($, {
      marginLeft: 3,
      flexDirection: "column",
      children: [Yo.jsxs(v, {
        color: "permission",
        children: ["Press ", Yo.jsx(v, {
          bold: true,
          children: "Enter"
        }), " after authenticating in your browser."]
      }), Yo.jsx(v, {
        dimColor: true,
        italic: true,
        children: Yo.jsx(dr, {
          action: "confirm:no",
          context: "Confirmation",
          fallback: "Esc",
          description: "back"
        })
      })]
    })]
  });
  if (confirmingClearAuth) return Yo.jsxs($, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDown,
    children: [Yo.jsxs(v, {
      color: "claude",
      children: ["Clear authentication for ", server.name]
    }), clearAuthBrowserOpened ? Yo.jsxs(Yo.Fragment, {
      children: [Yo.jsx(v, {
        children: 'Find the MCP server in the browser and click "Disconnect".'
      }), Yo.jsxs($, {
        flexDirection: "column",
        children: [Yo.jsxs($, {
          children: [Yo.jsxs(v, {
            dimColor: true,
            children: ["If your browser didn't open automatically, copy this URL manually", " "]
          }), copied ? Yo.jsx(v, {
            color: "success",
            children: "(Copied!)"
          }) : Yo.jsx(v, {
            dimColor: true,
            children: Yo.jsx(at, {
              chord: "c",
              action: "copy",
              parens: true
            })
          })]
        }), Yo.jsx(Ss, {
          url: Mge()
        })]
      }), Yo.jsxs($, {
        marginLeft: 3,
        flexDirection: "column",
        children: [Yo.jsxs(v, {
          color: "permission",
          children: ["Press ", Yo.jsx(v, {
            bold: true,
            children: "Enter"
          }), " when done."]
        }), Yo.jsx(v, {
          dimColor: true,
          italic: true,
          children: Yo.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "back"
          })
        })]
      })]
    }) : Yo.jsxs(Yo.Fragment, {
      children: [Yo.jsx(v, {
        children: 'This will open claude.ai in the browser. Find the MCP server in the list and click "Disconnect".'
      }), Yo.jsxs($, {
        marginLeft: 3,
        flexDirection: "column",
        children: [Yo.jsxs(v, {
          color: "permission",
          children: ["Press", " ", Yo.jsx(at, {
            chord: "enter",
            action: "open the browser",
            bold: true
          }), "."]
        }), Yo.jsx(v, {
          dimColor: true,
          italic: true,
          children: Yo.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "back"
          })
        })]
      })]
    })]
  });
  if (connecting) return Yo.jsxs($, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    children: [Yo.jsxs(v, {
      color: "text",
      children: ["Connecting to ", Yo.jsx(v, {
        bold: true,
        children: server.name
      }), "\u2026"]
    }), Yo.jsxs($, {
      children: [Yo.jsx(gd, {}), Yo.jsx(v, {
        children: " Establishing connection to MCP server"
      })]
    }), Yo.jsx(v, {
      dimColor: true,
      children: "This may take a few moments."
    })]
  });
  let menuOptions = [];
  if (server.client.type === "disabled") menuOptions.push({
    label: "Enable",
    value: "toggle-enabled"
  });
  if (server.client.type === "connected" && serverToolsCount > 0) menuOptions.push({
    label: "View tools",
    value: "tools"
  });
  let isAnthropicHosted = (server.config.type === "sse" || server.config.type === "http") && kZe(server.config),
    isManagedAuth = isAnthropicHosted || (server.config.type === "sse" || server.config.type === "http") && $3(server.config.url) && Nl() && !!qs()?.accessToken;
  if (server.config.type === "claudeai-proxy") {
    if (server.client.type === "connected") menuOptions.push({
      label: "Clear authentication",
      value: "claudeai-clear-auth"
    });else if (server.client.type !== "disabled") menuOptions.push({
      label: "Authenticate",
      value: "claudeai-auth"
    });
  } else {
    if (isAuthenticated) {
      if (!isManagedAuth) menuOptions.push({
        label: "Re-authenticate",
        value: "reauth"
      });
      menuOptions.push({
        label: "Clear authentication",
        value: "clear-auth"
      });
    }
    if (!isAuthenticated && !isManagedAuth) menuOptions.push({
      label: "Authenticate",
      value: "auth"
    });
  }
  let hasHeadersHelper = server.config.type !== "claudeai-proxy" && !!server.config.headersHelper;
  if (server.client.type !== "disabled") {
    if (server.client.type !== "needs-auth" || hasHeadersHelper || isAnthropicHosted) menuOptions.push({
      label: "Reconnect",
      value: "reconnectMcpServer"
    });
    menuOptions.push({
      label: "Disable",
      value: "toggle-enabled"
    });
  }
  if (menuOptions.length === 0) menuOptions.push({
    label: "Back",
    value: "back"
  });
  return Yo.jsx($, {
    flexDirection: "column",
    paddingX: borderless ? 1 : 0,
    children: Yo.jsxs(Jn, {
      title: `${serverLabel} MCP Server`,
      onCancel: onCancel,
      hideBorder: borderless,
      inputGuide: Yo.jsxs(bn, {
        children: [Yo.jsx(at, {
          chord: ["up", "down"],
          action: "navigate"
        }), Yo.jsx(at, {
          chord: "enter",
          action: "select"
        }), Yo.jsx(dr, {
          action: "confirm:no",
          context: "Confirmation",
          fallback: "Esc",
          description: "back"
        })]
      }),
      children: [Yo.jsxs($, {
        flexDirection: "column",
        gap: 0,
        children: [Yo.jsxs(bf, {
          box: "plain",
          columns: [{
            bold: true
          }, {}],
          children: [Yo.jsxs(bf.Row, {
            children: [Yo.jsx(Yo.Fragment, {
              children: "Status:"
            }), server.client.type === "disabled" ? Yo.jsxs(v, {
              children: [wo("inactive", theme)(Xe.radioOff), " disabled"]
            }) : server.client.type === "connected" ? server.client.toolsListError ? Yo.jsxs(v, {
              children: [Yo.jsx(bs, {
                status: "warning",
                withSpace: true
              }), "connected \xB7 tools fetch failed"]
            }) : server.client.capabilities?.tools && serverToolsCount === 0 ? Yo.jsxs(v, {
              children: [Yo.jsx(bs, {
                status: "warning",
                withSpace: true
              }), "connected \xB7 no tools"]
            }) : Yo.jsxs(v, {
              children: [Yo.jsx(bs, {
                status: "success",
                withSpace: true
              }), "connected"]
            }) : server.client.type === "pending" ? Yo.jsxs(v, {
              children: [Yo.jsx(v, {
                dimColor: true,
                children: Xe.radioOff
              }), " connecting\u2026"]
            }) : server.client.type === "needs-auth" ? Yo.jsxs(v, {
              children: [wo("warning", theme)(Xe.triangleUpOutline), " needs authentication"]
            }) : Yo.jsxs(v, {
              children: [Yo.jsx(bs, {
                status: "error",
                withSpace: true
              }), server.client.errorCode === "INVALID_CONFIG" ? "config issue" : "failed"]
            })]
          }), (server.client.type === "failed" || server.client.type === "needs-auth") && server.client.error && Yo.jsxs(bf.Row, {
            children: [Yo.jsx(Yo.Fragment, {
              children: "Issue:"
            }), Yo.jsx(v, {
              dimColor: true,
              children: server.client.error
            })]
          }), server.transport !== "claudeai-proxy" && Yo.jsxs(bf.Row, {
            children: [Yo.jsx(Yo.Fragment, {
              children: "Auth:"
            }), isAuthenticated ? Yo.jsxs(v, {
              children: [Yo.jsx(bs, {
                status: "success",
                withSpace: true
              }), "authenticated"]
            }) : Yo.jsxs(v, {
              children: [Yo.jsx(bs, {
                status: "error",
                withSpace: true
              }), "not authenticated"]
            })]
          }), Yo.jsxs(bf.Row, {
            children: [Yo.jsx(Yo.Fragment, {
              children: "URL:"
            }), Yo.jsx(v, {
              dimColor: true,
              children: server.config.url
            })]
          }), Yo.jsxs(bf.Row, {
            children: [Yo.jsx(Yo.Fragment, {
              children: "Config location:"
            }), Yo.jsx(v, {
              dimColor: true,
              children: lB(server.scope)
            })]
          })]
        }), server.client.type === "connected" && Yo.jsx(_7n, {
          serverToolsCount: serverToolsCount,
          serverPromptsCount: serverPromptsCount,
          serverResourcesCount: mcpState.resources[server.name]?.length || 0
        }), server.client.type === "connected" && serverToolsCount > 0 && Yo.jsxs($, {
          children: [Yo.jsx(v, {
            bold: true,
            children: "Tools: "
          }), Yo.jsxs(v, {
            dimColor: true,
            children: [serverToolsCount, " ", Sn(serverToolsCount, "tool")]
          })]
        }), server.client.type === "connected" && server.client.toolsListError && Yo.jsxs($, {
          flexDirection: "column",
          children: [Yo.jsx(v, {
            bold: true,
            children: "Issue: "
          }), Yo.jsx(v, {
            dimColor: true,
            children: server.client.toolsListError
          })]
        })]
      }), errorMessage && Yo.jsx($, {
        children: Yo.jsx(Ba, {
          error: errorMessage
        })
      }), menuOptions.length > 0 && Yo.jsx($, {
        children: Yo.jsx(hr, {
          options: menuOptions,
          onChange: async selected => {
            switch (selected) {
              case "tools":
                onViewTools();
                break;
              case "auth":
              case "reauth":
                await authenticate();
                break;
              case "clear-auth":
                await clearAuth();
                break;
              case "claudeai-auth":
                await startClaudeAiAuth();
                break;
              case "claudeai-clear-auth":
                startClaudeAiClearAuth();
                break;
              case "reconnectMcpServer":
                setConnecting(true);
                try {
                  let result = await reconnectServer(server.name);
                  if (server.config.type === "claudeai-proxy") W("tengu_claudeai_mcp_reconnect", {
                    success: result.client.type === "connected"
                  });
                  let {
                    message: message
                  } = T7n(result, server.name, {
                    hasHeadersHelper: hasHeadersHelper
                  });
                  onComplete(message);
                } catch (err) {
                  if (server.config.type === "claudeai-proxy") W("tengu_claudeai_mcp_reconnect", {
                    success: false
                  });
                  onComplete(yWt(err, server.name));
                } finally {
                  setConnecting(false);
                }
                break;
              case "toggle-enabled":
                await toggleEnabled();
                break;
              case "back":
                onCancel();
                break;
            }
          },
          onCancel: onCancel
        })
      })]
    })
  });
}
var $C, Yo;
var S7n = b(() => {
  Zs();
  kt();
  TI();
  ui();
  hg();
  je();
  ss();
  wee();
  vfe();
  $9e();
  wW();
  Ew();
  Sue();
  qO();
  uo();
  lo();
  Jg();
  Ct();
  vn();
  Ps();
  lr();
  uc();
  TS();
  Is();
  di();
  I_();
  Wo();
  ff();
  G8e();
  xw();
  rh();
  Jvo();
  $C = x(et(), 1), Yo = x(oe(), 1);
});

export {y7n,T7n,yWt,cWe,$C,Yo,S7n};
