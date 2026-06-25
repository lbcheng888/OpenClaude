// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {q6,B_t} from "../../vendor/m5253.ts";
import {getAllMcpConfigs as x$,isMcpServerDisabled as Qk,KA} from "./3158_unwrapCcrProxyUrl.ts";
import {Qu,REPL_CONTEXT_NAME as pA,soe,mn} from "./0600_feature_name.ts";
import {Qh,createUserMessage as U6,gN,_N} from "../../vendor/m5161.ts";
import {oZn,v1o} from "../../vendor/m5258.ts";
import {kZe,$3,vfe} from "../../vendor/m2048.ts";
import {isFirstPartyProvider as Nl,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {getClaudeAIOAuthTokens as qs,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {LD,oHe} from "../../vendor/m2814.ts";
import {logEventAsync as Ug,kt} from "../../vendor/m132.ts";
import {kW,$9e} from "../../vendor/m3162.ts";
import {DHe,Mge,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {$Ft,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {P$,Uge,Ej,wee} from "../config/3161_error.ts";
import {stopCapturingEarlyInput as die,e2e} from "../../vendor/m2300.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {t_} from "../../vendor/m2594.ts";
/**
 * MCP server login/logout CLI handlers.
 *
 * Implements `claude mcp login <name>` and `claude mcp logout <name>`:
 * resolves the named MCP server, classifies its auth kind (claude.ai proxy,
 * unsupported transport, anthropic-hosted, or OAuth), and drives the OAuth
 * device/redirect flow when applicable.
 */

var B1o = {};
ft(B1o, {
  mcpLogoutHandler: () => mcpLogoutHandler,
  mcpLoginHandler: () => mcpLoginHandler
});

/**
 * Resolve a named MCP server, surfacing user-facing errors for the common
 * failure modes (not found, rejected/pending project server, config error).
 *
 * @param serverName    Name of the MCP server to resolve.
 * @param telemetryEvent Telemetry sub-event label for failure reporting.
 * @returns The resolved server config, or a rendered error result.
 */
async function resolveMcpServer(serverName: string, telemetryEvent: string) {
  await q6({
    hasDynamicMcpConfig: !1
  });
  let {
      servers: allServers,
      pendingProjectServers: pendingServers,
      rejectedProjectServers: rejectedServers
    } = await x$({
      includePendingProjectServers: !0,
      includeRejectedProjectServers: !0
    }),
    server = allServers[serverName];
  if (!server) {
    await Qu(telemetryEvent, "not_found");
    let knownServerNames = Object.keys(allServers).filter(name => !pendingServers.has(name) && !rejectedServers.has(name));
    return Qh(oZn(serverName, knownServerNames, pendingServers.size > 0));
  }
  if (rejectedServers.has(serverName)) return await Qu(telemetryEvent, "rejected"), Qh(`"${serverName}" is from .mcp.json and was rejected. Run \`claude mcp reset-project-choices\` to review it again.`);
  if (pendingServers.has(serverName)) return await Qu(telemetryEvent, "pending_approval"), Qh(`"${serverName}" is from .mcp.json and awaiting approval. Run \`claude\` in this directory to review it first.`);
  if (server.configError) return await Qu(telemetryEvent, "config_error"), Qh(`"${serverName}" has a configuration problem: ${server.configError}`);
  return server;
}

/**
 * Detect non-interactive OAuth situations that skip the login flow:
 * a static `Authorization` header, or first-party Claude auth.
 *
 * @returns A reason tag, or null when an interactive OAuth flow is needed.
 */
function classifyOAuthShortCircuit(serverConfig: any): "static_auth_header" | "first_party_auth" | null {
  if (kZe(serverConfig)) return "static_auth_header";
  if ($3(serverConfig.url) && Nl() && !!qs()?.accessToken) return "first_party_auth";
  return null;
}

/**
 * Render the "open this URL to authorize" prompt for the OAuth flow.
 *
 * @param browserOpened Whether a browser was already launched.
 * @param authUrl       The authorization URL to display.
 */
function renderAuthorizationPrompt(browserOpened: boolean, authUrl: string): string {
  return `${browserOpened ? "If the browser didn't open, visit:" : "Visit this URL to authorize:"}
  ${LD(authUrl)}

`;
}

/**
 * Handle `claude mcp login <name>`: authenticate with the named MCP server.
 *
 * @param serverName Name of the MCP server to log in to.
 * @param options    Login options (e.g. whether to open a browser).
 */
async function mcpLoginHandler(serverName: string, options: { browser?: boolean }) {
  await Ug("tengu_mcp_login", {});
  let server = await resolveMcpServer(serverName, "cli_mcp_login"),
    authInfo = kW(serverName, server);
  switch (authInfo.kind) {
    case "claudeai-proxy":
      {
        let authUrl = DHe(authInfo.config);
        if (!authUrl) return await Qu("cli_mcp_login", "claudeai_no_auth_url"), Qh(`Couldn't build the claude.ai authorization link for "${serverName}". Make sure you're signed in (\`claude login\`).`);
        if (await Ug("tengu_claudeai_mcp_auth_started", {}), options.browser) process.stdout.write(`Opening browser to authorize "${serverName}"…
`), await Zl(authUrl);
        return process.stdout.write(renderAuthorizationPrompt(options.browser, authUrl) + `Once authorized on claude.ai, the connector will be available the next time you start Claude Code.
`), await $Ft(serverName), await pA("cli_mcp_login"), U6();
      }
    case "unsupported-transport":
      return await Qu("cli_mcp_login", "unsupported_transport"), Qh(`"${serverName}" doesn't support OAuth login — it's only available for HTTP and SSE servers.`);
    case "anthropic-hosted":
      return await Qu("cli_mcp_login", "anthropic_hosted_blocked"), Qh(authInfo.message);
    case "oauth":
      {
        let shortCircuit = classifyOAuthShortCircuit(authInfo.config);
        if (shortCircuit === "static_auth_header") return await Qu("cli_mcp_login", "static_auth_header"), Qh(`"${serverName}" authenticates with the \`Authorization\` header in its configuration, so there's no separate login. Update that header to change its credentials.`);
        if (shortCircuit === "first_party_auth") return await Qu("cli_mcp_login", "first_party_auth"), Qh(`"${serverName}" authenticates automatically with your Claude login. Run \`claude login\` if you're not signed in.`);
        process.stdout.write(`Starting authentication for "${serverName}"…
`);
        let redirectPromptText = "Or paste the redirect URL here: ",
          abortController = new AbortController(),
          readlineInterface: any,
          noTtyStdin = !1,
          keepAliveTimer = setInterval(() => {}, 60000),
          abortPromise = new Promise((resolve, reject) => {
            abortController.signal.addEventListener("abort", () => reject(new P$()), {
              once: !0
            });
          });
        abortPromise.catch(() => {});
        try {
          await Uge(serverName, authInfo.config, {
            preserveStepUpState: !0
          }), await Promise.race([abortPromise, Ej(serverName, authInfo.config, authUrl => {
            if (process.stdout.write(renderAuthorizationPrompt(options.browser, authUrl) + `Waiting for authorization… (^C to cancel)
`), readlineInterface) readlineInterface.prompt();
          }, abortController.signal, {
            skipBrowserOpen: !options.browser,
            onWaitingForCallback: submitRedirectUrl => {
              if (!process.stdin.isTTY) {
                noTtyStdin = !0, abortController.abort();
                return;
              }
              if (!process.stdout.isTTY) return;
              die(), readlineInterface = JWl.createInterface({
                input: process.stdin,
                output: process.stdout,
                prompt: redirectPromptText
              }), readlineInterface.on("SIGINT", () => abortController.abort()), readlineInterface.on("close", () => abortController.abort()), readlineInterface.on("line", line => {
                let trimmedLine = line.trim();
                if (trimmedLine && submitRedirectUrl(trimmedLine)) return;
                if (trimmedLine) process.stdout.write(`That doesn't look like a redirect URL — paste the full address from your browser's address bar.
`);
                readlineInterface?.prompt();
              });
            }
          })]);
        } catch (error) {
          if (error instanceof P$) {
            if (noTtyStdin) return await Qu("cli_mcp_login", "no_tty_stdin"), Qh(`Couldn't complete authentication for "${serverName}": stdin isn't a terminal, so authentication can't be completed here. ` + "Re-run in an interactive terminal — e.g. `ssh -t` — and paste the redirect URL when prompted.");
            return await soe("cli_mcp_login", "cancelled"), gN(130);
          }
          return await Qu("cli_mcp_login", "oauth_flow_threw"), Qh(`Couldn't complete authentication for "${serverName}": ${Ce(error)}`);
        } finally {
          if (clearInterval(keepAliveTimer), readlineInterface) readlineInterface.close(), process.stdout.write(`
`);
        }
        return await $Ft(serverName), await pA("cli_mcp_login"), U6(Qk(serverName) ? `Authenticated with "${serverName}", but it's currently disabled. Enable it in /mcp for its tools to load.` : `Authenticated with "${serverName}". Its tools are now available in Claude Code.`);
      }
    default:
      {
        let exhaustiveCheck = authInfo;
      }
  }
}

/**
 * Handle `claude mcp logout <name>`: clear stored credentials for the
 * named MCP server.
 *
 * @param serverName Name of the MCP server to log out of.
 */
async function mcpLogoutHandler(serverName: string) {
  await Ug("tengu_mcp_logout", {});
  let server = await resolveMcpServer(serverName, "cli_mcp_logout"),
    authInfo = kW(serverName, server);
  switch (authInfo.kind) {
    case "claudeai-proxy":
      return await soe("cli_mcp_logout", "claudeai_proxy"), U6(`"${serverName}" is a claude.ai connector — its credentials live on claude.ai, not this machine. ` + `Disconnect it at ${LD(Mge())}`);
    case "unsupported-transport":
      return await Qu("cli_mcp_logout", "unsupported_transport"), Qh(`"${serverName}" doesn't use OAuth — there are no stored credentials to clear.`);
    case "anthropic-hosted":
      return await Uge(serverName, authInfo.config), await soe("cli_mcp_logout", "anthropic_hosted"), U6(`Cleared local credentials for "${serverName}". ${authInfo.message}`);
    case "oauth":
      {
        await Uge(serverName, authInfo.config), await pA("cli_mcp_logout");
        let loginHint = classifyOAuthShortCircuit(authInfo.config) === null ? t_("mcp login", serverName) : null,
          loginHintText = loginHint ? ` Run \`${loginHint}\` to authenticate again.` : "";
        return U6(`Signed out of "${serverName}".${loginHintText}`);
      }
    default:
      {
        let exhaustiveCheck = authInfo;
      }
  }
}
var JWl;
var U1o = b(() => {
  mn();
  kt();
  wee();
  vfe();
  $9e();
  wW();
  Ew();
  KA();
  B_t();
  lo();
  Jg();
  e2e();
  Ct();
  oHe();
  Ps();
  _N();
  v1o();
  JWl = require("readline");
});

export {B1o,resolveMcpServer as XWl,classifyOAuthShortCircuit as QWl,renderAuthorizationPrompt as YWl,mcpLoginHandler,mcpLogoutHandler,JWl,U1o};
