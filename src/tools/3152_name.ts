// @ts-nocheck
import {je} from "../../vendor/m577.ts";
import {st} from "../../vendor/m5.ts";
import {getIsRemoteMode,getIsNonInteractiveSession,lt} from "../session/0131_sent.ts";
import {Y3,z3,scalar} from "../mcp/0728_serverName.ts";
import {Rae,xae,Gnt} from "../config/3017_hosts.ts";
import {Nae,qrt,$rt,jrt,Kz,Bae} from "../config/3151_error.ts";
import {rHn,zz,O0} from "./3222_name.ts";
import {M0,Exn} from "../../vendor/m3015.ts";
import {on,wu,Rn} from "../session/0615_length.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn} from "../config/0047_namespace.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
/** Returns true if the current session is running in a remote context (SSH, env var, or remote mode). */
function b$d() {
  return je.isSSH() || st(process.env.CLAUDE_CODE_REMOTE) || getIsRemoteMode();
}
/** Extracts the URL from an MCP server config object, if present. */
function E$d(serverConfig: any) {
  if ("url" in serverConfig) return serverConfig.url;
  return;
}
/** Extracts the redirect URI from an OAuth authorization URL, falling back to a placeholder. */
function C$d(authUrl: any) {
  try {
    let redirectUri = new URL(authUrl).searchParams.get("redirect_uri");
    if (redirectUri) return redirectUri;
  } catch {}
  return "http://localhost:<port>/callback";
}
/** Builds the list of OAuth helper tools for a given MCP server (authenticate + complete_authentication). */
function nHn(serverName: any, serverConfig: any) {
  if (getIsNonInteractiveSession()) return [];
  return [v$d(serverName, serverConfig), w$d(serverName)];
}
/** Creates the "authenticate" tool for a given MCP server, initiating the OAuth flow. */
function v$d(serverName: any, serverConfig: any) {
  let serverUrl = E$d(serverConfig),
    transportType = serverConfig.type ?? "stdio",
    transportLabel = serverUrl ? `${transportType} at ${serverUrl}` : transportType,
    toolDescription = `The \`${serverName}\` MCP server (${transportLabel}) is installed but requires authentication. ` + "Call this tool to start the OAuth flow \u2014 you'll receive an authorization URL to share with the user. " + "Once the user completes authorization in their browser, the server's real tools will become available automatically.";
  return {
    name: Y3(serverName, "authenticate"),
    isMcp: !0,
    mcpInfo: {
      serverName: serverName,
      toolName: "authenticate"
    },
    isEnabled: () => !0,
    isConcurrencySafe: () => !1,
    isReadOnly: () => !1,
    toAutoClassifierInput: () => serverName,
    userFacingName: () => `${serverName} - authenticate (MCP)`,
    maxResultSizeChars: 1e4,
    renderToolUseMessage: () => `Authenticate ${serverName} MCP server`,
    async description() {
      return toolDescription;
    },
    async prompt() {
      return toolDescription;
    },
    get inputSchema() {
      return T$d();
    },
    async checkPermissions(input: any) {
      return {
        behavior: "allow",
        updatedInput: input
      };
    },
    async call(input: any, context: any) {
      if (serverConfig.type === "claudeai-proxy") return {
        data: {
          status: "unsupported",
          message: `This is a claude.ai MCP connector. Ask the user to run /mcp and select "${serverName}" to authenticate.`
        }
      };
      if (serverConfig.type !== "sse" && serverConfig.type !== "http") return {
        data: {
          status: "unsupported",
          message: `Server "${serverName}" uses ${transportType} transport which does not support OAuth from this tool. Ask the user to run /mcp and authenticate manually.`
        }
      };
      let sseConfig = serverConfig;
      if (Rae(sseConfig.url)) return {
        data: {
          status: "unsupported",
          message: xae(serverName, {
            scope: sseConfig.scope
          })
        }
      };
      let resolveAuthUrl: any,
        authUrlPromise = new Promise((resolve: any) => {
          resolveAuthUrl = resolve;
        }),
        {
          setAppState: setAppState
        } = context,
        oauthFlow = Nae(serverName, sseConfig, (authUrl: any) => resolveAuthUrl?.(authUrl), void 0, {
          skipBrowserOpen: !0
        });
      qrt(serverName, oauthFlow), oauthFlow.then(async () => {
        rHn();
        let reconnected = await zz(serverName, serverConfig),
          serverPrefix = z3(serverName);
        setAppState((prevState: any) => ({
          ...prevState,
          mcp: {
            ...prevState.mcp,
            clients: prevState.mcp.clients.map((client: any) => client.name === serverName ? reconnected.client : client),
            tools: [...M0(prevState.mcp.tools, (tool: any) => tool.name?.startsWith(serverPrefix)), ...reconnected.tools],
            commands: [...M0(prevState.mcp.commands, (cmd: any) => cmd.name?.startsWith(serverPrefix)), ...reconnected.commands],
            resources: reconnected.resources ? {
              ...prevState.mcp.resources,
              [serverName]: reconnected.resources
            } : prevState.mcp.resources
          }
        })), on(serverName, `OAuth complete, reconnected with ${reconnected.tools.length} tool(s)`);
      }).catch((err: any) => {
        wu(serverName, `OAuth flow failed after tool-triggered start: ${Se(err)}`);
      });
      try {
        let authUrl = await Promise.race([authUrlPromise, oauthFlow.then(() => null)]);
        if (authUrl) {
          let completeToolName = Y3(serverName, "complete_authentication"),
            redirectUri = C$d(authUrl),
            remoteNote = b$d() ? `

This session is remote, so after authorizing the browser will try to load \`${redirectUri}?code=...\` and show a connection error \u2014 that's expected. Ask the user to copy the full URL from the browser's address bar and paste it into chat, then call \`${completeToolName}\` with that URL as \`callback_url\`.` : `

If the browser shows a connection error on the redirect page, ask the user to paste the full URL from the address bar and call \`${completeToolName}\` with it.`;
          return {
            data: {
              status: "auth_url",
              authUrl: authUrl,
              message: `Ask the user to open this URL in their browser to authorize the ${serverName} MCP server:

${authUrl}

Once they complete the flow, the server's tools will become available automatically.${remoteNote}`
            }
          };
        }
        return {
          data: {
            status: "auth_url",
            message: `Authentication completed silently for ${serverName}. The server's tools should now be available.`
          }
        };
      } catch (err: any) {
        return {
          data: {
            status: "error",
            message: `Failed to start OAuth flow for ${serverName}: ${Se(err)}. Ask the user to run /mcp and authenticate manually.`
          }
        };
      }
    },
    mapToolResultToToolResultBlockParam(result: any, toolUseId: any) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result.message
      };
    }
  };
}
/** Creates the "complete_authentication" tool for a given MCP server, finishing an in-progress OAuth flow. */
function w$d(serverName: any) {
  let authenticateToolName = Y3(serverName, "authenticate"),
    toolDescription = `Complete an in-progress OAuth flow for the \`${serverName}\` MCP server by submitting the callback URL. Call \`${authenticateToolName}\` first to start the flow and get the authorization URL. ` + "After the user authorizes in their browser, the browser is redirected to a `http://localhost:<port>/callback?code=...&state=...` URL \u2014 " + "on remote sessions that page fails to load, but the URL in the address bar is still valid. Pass that full URL here as `callback_url`.";
  return {
    name: Y3(serverName, "complete_authentication"),
    isMcp: !0,
    mcpInfo: {
      serverName: serverName,
      toolName: "complete_authentication"
    },
    isEnabled: () => !0,
    isConcurrencySafe: () => !1,
    isReadOnly: () => !1,
    toAutoClassifierInput: () => serverName,
    userFacingName: () => `${serverName} - complete authentication (MCP)`,
    maxResultSizeChars: 1e4,
    renderToolUseMessage: () => `Complete authentication for ${serverName} MCP server`,
    async description() {
      return toolDescription;
    },
    async prompt() {
      return toolDescription;
    },
    get inputSchema() {
      return S$d();
    },
    async checkPermissions(input: any) {
      return {
        behavior: "allow",
        updatedInput: input
      };
    },
    async call(input: any) {
      let {
          callback_url: callbackUrl
        } = input,
        pendingResolver = $rt(serverName);
      if (!pendingResolver) return {
        data: {
          status: "error",
          message: `No OAuth flow is in progress for ${serverName}. Call \`${authenticateToolName}\` first, then retry with the callback URL.`
        }
      };
      let hasAuthCode = !1;
      try {
        let parsedUrl = new URL(callbackUrl);
        hasAuthCode = parsedUrl.searchParams.has("code") || parsedUrl.searchParams.has("error");
      } catch {}
      if (!hasAuthCode) return {
        data: {
          status: "error",
          message: "Invalid callback URL: missing authorization code. Ask the user to paste the full redirect URL from their browser's address bar, including the `?code=...&state=...` query string."
        }
      };
      let completionPromise = jrt(serverName);
      pendingResolver(callbackUrl);
      try {
        return await completionPromise, {
          data: {
            status: "success",
            message: `Authentication complete for ${serverName}. The server's tools should now be available.`
          }
        };
      } catch (err: any) {
        if (err instanceof Kz) return {
          data: {
            status: "error",
            message: `The OAuth flow for ${serverName} was cancelled (a newer attempt may have superseded it). Call \`${authenticateToolName}\` again to restart.`
          }
        };
        return {
          data: {
            status: "error",
            message: `Authentication failed for ${serverName}: ${Se(err)}`
          }
        };
      }
    },
    mapToolResultToToolResultBlockParam(result: any, toolUseId: any) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result.message
      };
    }
  };
}
var T$d, S$d;
var qQi = b(() => {
  Exn();
  Xr();
  lt();
  Gnt();
  Bae();
  O0();
  scalar();
  Lr();
  sn();
  bt();
  Rn();
  T$d = we(() => E.object({})), S$d = we(() => E.object({
    callback_url: E.string().describe("The full callback URL from the browser address bar after authorizing, e.g. http://localhost:<port>/callback?code=...&state=...")
  }));
});
export {b$d,E$d,C$d,nHn,v$d,w$d,T$d,S$d,qQi};
