// @ts-nocheck
import {vSe,eZn} from "../../vendor/m5249.ts";
import {IOe,HOe} from "../mcp/5266_mcpServeHandler.ts";
import {G8l,V8l} from "../config/5251_type.ts";
import {Ose,wZe} from "../config/2048_pathname.ts";
import {K8l,z8l} from "../../vendor/m5251.ts";
import {wb,vb} from "../telemetry/5273_setupTokenHandler.ts";
import {createUserMessage as U6,_N} from "../../vendor/m5161.ts";
import {U1o,B1o} from "../telemetry/5274_mcpLogoutHandler.ts";
import {b} from "../../runtime.ts";
/**
 * Registers the `mcp` command group (Commander.js) for configuring and managing
 * MCP (Model Context Protocol) servers: serve, remove, list, get, login,
 * logout, add-json, add-from-claude-desktop, and reset-project-choices.
 *
 * @param parentCommand - The root Commander command to attach the `mcp` group to.
 */
function ZWl(parentCommand) {
  let mcpCommand = parentCommand.command("mcp").description("Configure and manage MCP servers").configureHelp(vSe()).enablePositionalOptions();
  if (mcpCommand.command("serve").description("Start the Claude Code MCP server").option("-d, --debug", "Enable debug mode", () => !0).option("--verbose", "Override verbose mode setting from config", () => !0).action(async ({
    debug: debugEnabled,
    verbose: verboseEnabled
  }) => {
    let {
      mcpServeHandler: serveHandler
    } = await Promise.resolve().then(() => (IOe(), HOe));
    await serveHandler({
      debug: debugEnabled,
      verbose: verboseEnabled
    });
  }), G8l(mcpCommand), Ose()) K8l(mcpCommand);
  mcpCommand.command("remove <name>").description("Remove an MCP server").option("-s, --scope <scope>", "Configuration scope (local, user, or project) - if not specified, removes from whichever scope it exists in").action(async (serverName, options) => {
    let [{
      mcpRemoveHandler: removeHandler
    }, {
      createSubcommandRoot: createRoot
    }] = await Promise.all([Promise.resolve().then(() => (IOe(), HOe)), Promise.resolve().then(() => (wb(), vb))]);
    return await removeHandler(await createRoot(), serverName, options), U6();
  }), mcpCommand.command("list").description("List configured MCP servers. Unapproved .mcp.json servers are shown as ⏸ Pending approval and not connected to; approved servers are health-checked.").action(async () => {
    let [{
      mcpListHandler: listHandler
    }, {
      createSubcommandRoot: createRoot
    }] = await Promise.all([Promise.resolve().then(() => (IOe(), HOe)), Promise.resolve().then(() => (wb(), vb))]);
    await listHandler(await createRoot());
  }), mcpCommand.command("get <name>").description("Get details about an MCP server. Unapproved .mcp.json servers are shown as ⏸ Pending approval and not connected to; approved servers are health-checked.").action(async serverName => {
    let [{
      mcpGetHandler: getHandler
    }, {
      createSubcommandRoot: createRoot
    }] = await Promise.all([Promise.resolve().then(() => (IOe(), HOe)), Promise.resolve().then(() => (wb(), vb))]);
    await getHandler(await createRoot(), serverName);
  }), mcpCommand.command("login <name>").description("Authenticate with an MCP server (HTTP, SSE, or claude.ai connector)").option("--no-browser", "Print the authorization URL instead of opening a browser (for SSH/headless sessions — paste the redirect URL back when prompted)").action(async (serverName, options) => {
    let {
      mcpLoginHandler: loginHandler
    } = await Promise.resolve().then(() => (U1o(), B1o));
    await loginHandler(serverName, options);
  }), mcpCommand.command("logout <name>").description("Clear stored OAuth credentials for an MCP server").action(async serverName => {
    let {
      mcpLogoutHandler: logoutHandler
    } = await Promise.resolve().then(() => (U1o(), B1o));
    await logoutHandler(serverName);
  }), mcpCommand.command("add-json <name> <json>").description("Add an MCP server (stdio or SSE) with a JSON string").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").option("--client-secret", "Prompt for OAuth client secret (or set MCP_CLIENT_SECRET env var)").action(async (serverName, jsonConfig, options) => {
    let [{
      mcpAddJsonHandler: addJsonHandler
    }, {
      createSubcommandRoot: createRoot
    }] = await Promise.all([Promise.resolve().then(() => (IOe(), HOe)), Promise.resolve().then(() => (wb(), vb))]);
    return await addJsonHandler(await createRoot(), serverName, jsonConfig, options), U6();
  }), mcpCommand.command("add-from-claude-desktop").description("Import MCP servers from Claude Desktop (Mac and WSL only)").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").action(async options => {
    let {
      mcpAddFromDesktopHandler: addFromDesktopHandler
    } = await Promise.resolve().then(() => (IOe(), HOe));
    await addFromDesktopHandler(options);
  }), mcpCommand.command("reset-project-choices").description("Reset all approved and rejected project-scoped (.mcp.json) servers within this project").action(async () => {
    let [{
      mcpResetChoicesHandler: resetChoicesHandler
    }, {
      createSubcommandRoot: createRoot
    }] = await Promise.all([Promise.resolve().then(() => (IOe(), HOe)), Promise.resolve().then(() => (wb(), vb))]);
    return await resetChoicesHandler(await createRoot()), U6();
  });
}
var eGl = b(() => {
  V8l();
  z8l();
  wZe();
  _N();
  eZn();
});

export {ZWl,eGl};
