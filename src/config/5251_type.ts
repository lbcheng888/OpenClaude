// @ts-nocheck
import {collectFlagValueIndexes as oc,XQn} from "../../vendor/m5248.ts";
import {Ose,Lse,wZe} from "./2048_pathname.ts";
import {Rs,Qh,createUserMessage as U6,_N} from "../../vendor/m5161.ts";
import {$st,Ssa,uXr,lB,qO} from "../mcp/3159_scope.ts";
import {logEventAsync as Ug,kt} from "../../vendor/m132.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {qNt,WNt,wee} from "./3161_error.ts";
import {addMcpConfig as Fge,KA} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {cpe,vcr,aA} from "../../vendor/m234.ts";
import {TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {t_} from "../../vendor/m2594.ts";
import {P6o,dn} from "./0137_namespace.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
/**
 * MCP `add` command registration (Claude Code 2.1.190).
 *
 * Structure-exact reverse-engineered module. Only local bindings are renamed
 * and TypeScript annotations / comments are added; link-time symbols, literals,
 * operators, property names, and control flow are preserved verbatim.
 *
 * Ported from the v2.1.185 readable body (config/5218_type.ts). The stdio
 * URL-warning branch differs in v190: it now builds the suggested commands
 * through the `t_` helper and only prints them when both variants resolve.
 */
type RestoredUnknown = any;

/**
 * Registers the `claude mcp add <name> <commandOrUrl> [args...]` subcommand on
 * the given commander program/command instance.
 *
 * @param program - The commander command to attach the `add` action to.
 */
function registerMcpAddCommand(program: RestoredUnknown): RestoredUnknown {
  program.command("add <name> <commandOrUrl> [args...]").description(`Add an MCP server to Claude Code.

Examples:
  # Add HTTP server:
  claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

  # Add HTTP server with headers:
  claude mcp add --transport http corridor https://app.corridor.dev/api/mcp --header "Authorization: Bearer ..."

  # Add stdio server with environment variables:
  claude mcp add my-server -e API_KEY=xxx -- npx my-mcp-server

  # Add stdio server with subprocess flags:
  claude mcp add my-server -- my-command --some-flag arg1`).option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").option("-t, --transport <transport>", "Transport type (stdio, sse, http). Defaults to stdio if not specified.").option("-e, --env <env...>", "Set environment variables (e.g. -e KEY=value)").option("-H, --header <header...>", 'Set WebSocket headers (e.g. -H "X-Api-Key: abc123" -H "X-Custom: value")').option("--client-id <clientId>", "OAuth client ID for HTTP/SSE servers").option("--client-secret", "Prompt for OAuth client secret (or set MCP_CLIENT_SECRET env var)").option("--callback-port <port>", "Fixed port for OAuth callback (for servers requiring pre-registered redirect URIs)").helpOption("-h, --help", "Display help for command").addOption(new oc("--xaa", "Enable XAA (SEP-990) for this server. Requires 'claude mcp xaa setup' first. Also requires --client-id and --client-secret (for the MCP server's AS).").hideHelp(!Ose())).action(async (serverName, commandOrUrl, restArgs, options) => {
    let command = commandOrUrl,
      args = restArgs;
    if (!serverName) Rs(`Error: Server name is required.
Usage: claude mcp add <name> <command> [args...]`);else if (!command) Rs(`Error: Command is required when server name is provided.
Usage: claude mcp add <name> <command> [args...]`);
    try {
      let scope = $st(options.scope),
        transport = Ssa(options.transport);
      if (options.xaa && !Ose()) Rs("Error: --xaa requires CLAUDE_CODE_ENABLE_XAA=1 in your environment");
      let xaaEnabled = Boolean(options.xaa);
      if (xaaEnabled) {
        let missingRequirements = [];
        if (!options.clientId) missingRequirements.push("--client-id");
        if (!options.clientSecret) missingRequirements.push("--client-secret");
        if (!Lse()) missingRequirements.push("'claude mcp xaa setup' (settings.xaaIdp not configured)");
        if (missingRequirements.length) Rs(`Error: --xaa requires: ${missingRequirements.join(", ")}`);
      }
      let transportExplicit = options.transport !== void 0,
        looksLikeUrl = command.startsWith("http://") || command.startsWith("https://") || command.startsWith("localhost") || command.endsWith("/sse") || command.endsWith("/mcp");
      if (await Ug("tengu_mcp_add", {
        type: Le(transport),
        scope: Le(scope),
        source: Ve("command"),
        transport: Le(transport),
        transportExplicit: transportExplicit,
        looksLikeUrl: looksLikeUrl
      }), transport === "sse") {
        if (!command) return Qh("Error: URL is required for SSE transport.");
        let headers = options.header ? uXr(options.header) : void 0,
          callbackPort = options.callbackPort ? parseInt(options.callbackPort, 10) : void 0,
          oauth = options.clientId || callbackPort || xaaEnabled ? {
            ...(options.clientId && {
              clientId: options.clientId
            }),
            ...(callbackPort && {
              callbackPort: callbackPort
            }),
            ...(xaaEnabled && {
              xaa: !0
            })
          } : void 0,
          clientSecret = options.clientSecret && options.clientId ? await qNt() : void 0,
          serverConfig = {
            type: "sse",
            url: command,
            headers: headers,
            oauth: oauth
          };
        if (await Fge(serverName, serverConfig, scope), clientSecret) {
          let storeResult = await WNt(serverName, serverConfig, clientSecret);
          if (!storeResult.success) process.stderr.write(`Server added, but the client secret could not be stored${storeResult.warning ? ` (${storeResult.warning})` : ""}. Re-run with --client-secret once secure storage is available.
`);
        }
        if (process.stdout.write(`Added SSE MCP server ${serverName} with URL: ${cpe(command)} to ${scope} config
`), headers) process.stdout.write(`Headers: ${Pe(vcr(headers), null, 2)}
`);
      } else if (transport === "http") {
        if (!command) return Qh("Error: URL is required for HTTP transport.");
        let headers = options.header ? uXr(options.header) : void 0,
          callbackPort = options.callbackPort ? parseInt(options.callbackPort, 10) : void 0,
          oauth = options.clientId || callbackPort || xaaEnabled ? {
            ...(options.clientId && {
              clientId: options.clientId
            }),
            ...(callbackPort && {
              callbackPort: callbackPort
            }),
            ...(xaaEnabled && {
              xaa: !0
            })
          } : void 0,
          clientSecret = options.clientSecret && options.clientId ? await qNt() : void 0,
          serverConfig = {
            type: "http",
            url: command,
            headers: headers,
            oauth: oauth
          };
        if (await Fge(serverName, serverConfig, scope), clientSecret) {
          let storeResult = await WNt(serverName, serverConfig, clientSecret);
          if (!storeResult.success) process.stderr.write(`Server added, but the client secret could not be stored${storeResult.warning ? ` (${storeResult.warning})` : ""}. Re-run with --client-secret once secure storage is available.
`);
        }
        if (process.stdout.write(`Added HTTP MCP server ${serverName} with URL: ${cpe(command)} to ${scope} config
`), headers) process.stdout.write(`Headers: ${Pe(vcr(headers), null, 2)}
`);
      } else {
        if (options.clientId || options.clientSecret || options.callbackPort || options.xaa) process.stderr.write(`Warning: --client-id, --client-secret, --callback-port, and --xaa are only supported for HTTP/SSE transports and will be ignored for stdio.
`);
        let displayCommand = looksLikeUrl ? cpe(command) : command;
        if (!transportExplicit && looksLikeUrl) {
          process.stderr.write(`
Warning: The command "${displayCommand}" looks like a URL, but is being interpreted as a stdio server as --transport was not specified.
`);
          let httpSuggestion = t_("mcp add --transport http", serverName),
            sseSuggestion = t_("mcp add --transport sse", serverName);
          if (httpSuggestion && sseSuggestion) process.stderr.write(`If this is an HTTP server, use: ${httpSuggestion} ${displayCommand}
`), process.stderr.write(`If this is an SSE server, use: ${sseSuggestion} ${displayCommand}
`);else process.stderr.write(`If this is a remote server, re-run with --transport http (or sse).
`);
        }
        let env = P6o(options.env);
        await Fge(serverName, {
          type: "stdio",
          command: command,
          args: args,
          env: env
        }, scope), process.stdout.write(`Added stdio MCP server ${serverName} with command: ${displayCommand} ${args.join(" ")} to ${scope} config
`);
      }
      return U6(`File modified: ${lB(scope)}`);
    } catch (error) {
      return Qh(Ce(error));
    }
  });
}
var initMcpAddModule = b(() => {
  XQn();
  _N();
  kt();
  wee();
  KA();
  qO();
  wZe();
  dn();
  Ct();
  aA();
  tn();
});

export {registerMcpAddCommand as G8l,initMcpAddModule as V8l};
