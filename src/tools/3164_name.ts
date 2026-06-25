// @ts-nocheck
import {Ne} from "../../vendor/m583.ts";
import {nt} from "../../vendor/m127.ts";
import {getIsRemoteMode as la,getIsNonInteractiveSession as kr,lt} from "../session/0132_sent.ts";
import {f3,m3,T0} from "../mcp/0733_serverName.ts";
import {kW,$9e} from "../../vendor/m3162.ts";
import {Ej,Wst,qst,Gst,P$,wee} from "../config/3161_error.ts";
import {Kxn,Cj,ReactRuntime as Ew} from "./3238_name.ts";
import {X0,p0n} from "../../vendor/m3027.ts";
import {ln,Vc,vn} from "../session/0621_length.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
/**
 * MCP OAuth authentication tools.
 *
 * Builds the two MCP tools that drive an OAuth flow for a server that requires
 * authentication:
 *   - `<server>__authenticate`          → starts the flow, returns an auth URL
 *   - `<server>__complete_authentication` → finishes the flow from a callback URL
 *
 * `Vxn` returns both tools (or none on a restricted/headless build).
 */

/** True when running in a remote/SSH context where the browser redirect cannot be loaded locally. */
function isRemoteSession(): boolean {
  return Ne.isSSH() || nt(process.env.CLAUDE_CODE_REMOTE) || la();
}

/** Extracts the connection URL from a server config, if it carries one. */
function getServerUrl(serverConfig: any): string | undefined {
  if ("url" in serverConfig) return serverConfig.url;
  return;
}

/** Reads the `redirect_uri` from an authorization URL, falling back to the default local callback. */
function extractRedirectUri(authUrl: string): string {
  try {
    let redirectUri = new URL(authUrl).searchParams.get("redirect_uri");
    if (redirectUri) return redirectUri;
  } catch {}
  return "http://localhost:<port>/callback";
}

/** Builds the OAuth tool pair for an MCP server, or an empty list on restricted builds. */
function Vxn(serverName: any, serverConfig: any): any[] {
  if (kr()) return [];
  return [createAuthenticateTool(serverName, serverConfig), createCompleteAuthTool(serverName)];
}

/** Tool that starts the OAuth flow and returns an authorization URL for the user to open. */
function createAuthenticateTool(serverName: any, serverConfig: any) {
  let serverUrl = getServerUrl(serverConfig),
    transport = serverConfig.type ?? "stdio",
    transportLabel = serverUrl ? `${transport} at ${serverUrl}` : transport,
    descriptionText = `The \`${serverName}\` MCP server (${transportLabel}) is installed but requires authentication. ` + "Call this tool to start the OAuth flow — you'll receive an authorization URL to share with the user. " + "Once the user completes authorization in their browser, the server's real tools will become available automatically.";
  return {
    name: f3(serverName, "authenticate"),
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
      return descriptionText;
    },
    async prompt() {
      return descriptionText;
    },
    get inputSchema() {
      return tKd();
    },
    async checkPermissions(input: any) {
      return {
        behavior: "allow",
        updatedInput: input
      };
    },
    async call(input: any, context: any) {
      let resolved = kW(serverName, serverConfig);
      if (resolved.kind === "claudeai-proxy") return {
        data: {
          status: "unsupported",
          message: `This is a claude.ai MCP connector. Ask the user to run /mcp and select "${serverName}" to authenticate.`
        }
      };
      if (resolved.kind === "unsupported-transport") return {
        data: {
          status: "unsupported",
          message: `Server "${serverName}" uses ${transport} transport which does not support OAuth from this tool. Ask the user to run /mcp and authenticate manually.`
        }
      };
      if (resolved.kind === "anthropic-hosted") return {
        data: {
          status: "unsupported",
          message: resolved.message
        }
      };
      let resolveAuthUrl: ((url: any) => void) | undefined,
        authUrlPromise = new Promise<any>(resolve => {
          resolveAuthUrl = resolve;
        }),
        {
          setAppState: setAppState
        } = context,
        oauthFlow = Ej(serverName, resolved.config, url => resolveAuthUrl?.(url), void 0, {
          skipBrowserOpen: !0
        });
      Wst(serverName, oauthFlow), oauthFlow.then(async () => {
        Kxn();
        let reconnected = await Cj(serverName, serverConfig),
          toolPrefix = m3(serverName);
        setAppState(prevState => ({
          ...prevState,
          mcp: {
            ...prevState.mcp,
            clients: prevState.mcp.clients.map(client => client.name === serverName ? reconnected.client : client),
            tools: [...X0(prevState.mcp.tools, tool => tool.name?.startsWith(toolPrefix)), ...reconnected.tools],
            commands: [...X0(prevState.mcp.commands, command => command.name?.startsWith(toolPrefix)), ...reconnected.commands],
            resources: reconnected.resources ? {
              ...prevState.mcp.resources,
              [serverName]: reconnected.resources
            } : prevState.mcp.resources
          }
        })), ln(serverName, `OAuth complete, reconnected with ${reconnected.tools.length} tool(s)`);
      }).catch(error => {
        Vc(serverName, `OAuth flow failed after tool-triggered start: ${Ce(error)}`);
      });
      try {
        let authUrl = await Promise.race([authUrlPromise, oauthFlow.then(() => null)]);
        if (authUrl) {
          let completeToolName = f3(serverName, "complete_authentication"),
            redirectUri = extractRedirectUri(authUrl),
            remoteHint = isRemoteSession() ? `

This session is remote, so after authorizing the browser will try to load \`${redirectUri}?code=...\` and show a connection error — that's expected. Ask the user to copy the full URL from the browser's address bar and paste it into chat, then call \`${completeToolName}\` with that URL as \`callback_url\`.` : `

If the browser shows a connection error on the redirect page, ask the user to paste the full URL from the address bar and call \`${completeToolName}\` with it.`;
          return {
            data: {
              status: "auth_url",
              authUrl: authUrl,
              message: `Ask the user to open this URL in their browser to authorize the ${serverName} MCP server:

${authUrl}

Once they complete the flow, the server's tools will become available automatically.${remoteHint}`
            }
          };
        }
        return {
          data: {
            status: "auth_url",
            message: `Authentication completed silently for ${serverName}. The server's tools should now be available.`
          }
        };
      } catch (error) {
        return {
          data: {
            status: "error",
            message: `Failed to start OAuth flow for ${serverName}: ${Ce(error)}. Ask the user to run /mcp and authenticate manually.`
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

/** Tool that completes an in-progress OAuth flow given the redirect callback URL. */
function createCompleteAuthTool(serverName: any) {
  let authenticateToolName = f3(serverName, "authenticate"),
    descriptionText = `Complete an in-progress OAuth flow for the \`${serverName}\` MCP server by submitting the callback URL. Call \`${authenticateToolName}\` first to start the flow and get the authorization URL. ` + "After the user authorizes in their browser, the browser is redirected to a `http://localhost:<port>/callback?code=...&state=...` URL — " + "on remote sessions that page fails to load, but the URL in the address bar is still valid. Pass that full URL here as `callback_url`.";
  return {
    name: f3(serverName, "complete_authentication"),
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
      return descriptionText;
    },
    async prompt() {
      return descriptionText;
    },
    get inputSchema() {
      return nKd();
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
        submitCallback = qst(serverName);
      if (!submitCallback) return {
        data: {
          status: "error",
          message: `No OAuth flow is in progress for ${serverName}. Call \`${authenticateToolName}\` first, then retry with the callback URL.`
        }
      };
      let hasAuthCode = !1;
      try {
        let parsed = new URL(callbackUrl);
        hasAuthCode = parsed.searchParams.has("code") || parsed.searchParams.has("error");
      } catch {}
      if (!hasAuthCode) return {
        data: {
          status: "error",
          message: "Invalid callback URL: missing authorization code. Ask the user to paste the full redirect URL from their browser's address bar, including the `?code=...&state=...` query string."
        }
      };
      let flowPromise = Gst(serverName);
      submitCallback(callbackUrl);
      try {
        return await flowPromise, {
          data: {
            status: "success",
            message: `Authentication complete for ${serverName}. The server's tools should now be available.`
          }
        };
      } catch (error) {
        if (error instanceof P$) return {
          data: {
            status: "error",
            message: `The OAuth flow for ${serverName} was cancelled (a newer attempt may have superseded it). Call \`${authenticateToolName}\` again to restart.`
          }
        };
        return {
          data: {
            status: "error",
            message: `Authentication failed for ${serverName}: ${Ce(error)}`
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
var tKd, nKd;
var Bsa = b(() => {
  p0n();
  Qr();
  lt();
  wee();
  $9e();
  Ew();
  T0();
  Ir();
  dn();
  Ct();
  vn();
  tKd = ve(() => C.object({})), nKd = ve(() => C.object({
    callback_url: C.string().describe("The full callback URL from the browser address bar after authorizing, e.g. http://localhost:<port>/callback?code=...&state=...")
  }));
});

export {isRemoteSession as rKd,getServerUrl as oKd,extractRedirectUri as sKd,Vxn,createAuthenticateTool as iKd,createCompleteAuthTool as aKd,tKd,nKd,Bsa};
