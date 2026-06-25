// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Ce,Jo,Ct} from "../../vendor/m197.ts";
import {VO,Tit,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {bDn,oQr} from "../../vendor/m3205.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {logEventAsync as Ug,kt} from "../../vendor/m132.ts";
import {Qu,REPL_CONTEXT_NAME as pA,mn} from "../telemetry/0600_feature_name.ts";
import {Qh,createUserMessage as U6,dGe,Rs,_N} from "../../vendor/m5161.ts";
import {dZn,uZn} from "../config/5263_setup.ts";
import {AWl,CWl} from "../tools/5264_startMCPServer.ts";
import {getMcpConfigByName as I$,removeMcpConfig as Hxn,readRawMcpJsonServersFromCwd as Dst,getMcpConfigsByScope as RC,getAllMcpConfigs as x$,addMcpConfig as Fge,doesEnterpriseMcpConfigExist as E1,isMcpServerDisabled as Qk,isMcpServerAllowedByPolicy as Oae,KA} from "../telemetry/3158_unwrapCcrProxyUrl.ts";
import {qxn,Psa,Gxn,qNt,WNt,wee} from "../config/3161_error.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {$st,UNt,lB,BNt,qO} from "./3159_scope.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {getCurrentProjectConfig as eh,getGlobalConfig as Ot,deleteCurrentProjectConfigFields as MKt,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {R1o,oZn,v1o} from "../../vendor/m5258.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {t_} from "../../vendor/m2594.ts";
import {py,i0e} from "../../vendor/m3768.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {lpe,aA} from "../../vendor/m234.ts";
import {q6,B_t} from "../../vendor/m5253.ts";
import {nht,LKn} from "../../vendor/m4603.ts";
import {gracefulShutdown as gi,flushAnalyticsSinks as B3e,QOn,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {Z8,BOt} from "../../vendor/m2595.ts";
import {ba,pd} from "../../vendor/m706.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {kWl,wWl} from "../../vendor/m5264.ts";
import {render as G8,je} from "../../vendor/m2462.ts";
import {AppStateProvider as IE,pq} from "../../vendor/m3370.ts";
import {KeybindingSetup as kC,WW} from "../../vendor/m3362.ts";
import {Y8l,J8l} from "../../vendor/m5252.ts";
import {getSettingsForSource as An,getLocalSettingsValidationErrors as hCe,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {JS,ez} from "../../vendor/m2239.ts";
import {C1o,A1o} from "../../vendor/m5257.ts";
import {iCe,T0} from "./0733_serverName.ts";
import {RUn,kct} from "../../vendor/m3779.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
var HOe = {};
ft(HOe, {
  mcpServeHandler: () => mcpServeHandler,
  mcpResetChoicesHandler: () => mcpResetChoicesHandler,
  mcpRemoveHandler: () => mcpRemoveHandler,
  mcpListHandler: () => mcpListHandler,
  mcpGetHandler: () => mcpGetHandler,
  mcpAddJsonHandler: () => mcpAddJsonHandler,
  mcpAddFromDesktopHandler: () => mcpAddFromDesktopHandler
});
/**
 * Format a validation/error object into a single human-readable line.
 * Prefers the first `issues[]` entry (message + path) and appends a
 * "(+N more)" suffix when multiple issues exist; otherwise falls back to
 * the generic stringifier `Ce` with whitespace collapsed.
 */
function EPm(error: any): string {
  let issues = error?.issues;
  if (Array.isArray(issues) && issues.length > 0) {
    let firstIssue = issues[0],
      message = typeof firstIssue.message === "string" ? firstIssue.message : Ce(error),
      pathSuffix = Array.isArray(firstIssue.path) && firstIssue.path.length > 0 ? ` (at ${firstIssue.path.join(".")})` : "",
      moreSuffix = issues.length > 1 ? ` (+${issues.length - 1} more)` : "";
    return message + pathSuffix + moreSuffix;
  }
  return Ce(error).replace(/\s+/g, " ").trim();
}
/**
 * Probe a single MCP server's connectivity/health and return a status line.
 * Attempts a tool listing when the server advertises tool capabilities,
 * distinguishing auth-needed, connected, and failure states.
 */
async function PWl(serverName: string, serverConfig: any): Promise<{ status: string; issue?: string }> {
  try {
    let connection = await VO(serverName, serverConfig);
    if (connection.type === "connected") {
      if (connection.capabilities.tools) try {
        await connection.client.listTools(void 0, {
          timeout: 5000
        });
      } catch (toolsError) {
        if (bDn(toolsError)) return {
          status: "! Needs authentication"
        };
        return {
          status: "! Connected \xB7 tools fetch failed",
          issue: EPm(toolsError)
        };
      }
      return {
        status: `${Xe.tick} Connected`
      };
    } else if (connection.type === "needs-auth") return {
      status: "! Needs authentication"
    };else return {
      status: `${Xe.cross} Failed to connect`
    };
  } catch (connectError) {
    return {
      status: `${Xe.cross} Connection error`
    };
  }
}
/** `claude mcp serve` — start the local MCP server in the current directory. */
async function mcpServeHandler({
  debug: debug,
  verbose: verbose
}: { debug?: boolean; verbose?: boolean }) {
  let cwd = DWl.cwd();
  await Ug("tengu_mcp_start", {});
  try {
    await xWl.stat(cwd);
  } catch (statError) {
    if (Jo(statError)) return await Qu("cli_mcp_serve", "cli_mcp_serve_cwd_missing"), Qh(`Error: Directory ${cwd} does not exist`);
    throw statError;
  }
  try {
    let {
      setup: setup
    } = await Promise.resolve().then(() => (dZn(), uZn));
    await setup(cwd, "default", !1, !1, void 0, !1);
    let {
      startMCPServer: startMCPServer
    } = await Promise.resolve().then(() => (AWl(), CWl));
    await startMCPServer(cwd, debug ?? !1, verbose ?? !1), await pA("cli_mcp_serve");
  } catch (serveError) {
    return await Qu("cli_mcp_serve", "cli_mcp_serve_start_failed"), Qh(`Error: Failed to start MCP server: ${serveError}`);
  }
}
/** `claude mcp remove <name>` — remove a server from one or all config scopes. */
async function mcpRemoveHandler(instance: any, serverName: string, options: any) {
  let existingServer = I$(serverName),
    cleanupSecureStorage = async () => {
      if (existingServer && (existingServer.type === "sse" || existingServer.type === "http")) try {
        await qxn(serverName, existingServer), await Psa(serverName, existingServer);
      } catch (cleanupError) {
        A(`mcp remove: secure-storage cleanup for "${serverName}" failed: ${Ce(cleanupError)}`, {
          level: "warn"
        });
      }
    },
    removedScope;
  try {
    if (options.scope) {
      let scope = $st(options.scope);
      await Ug("tengu_mcp_delete", {
        name: serverName,
        scope: Le(scope)
      }), await Hxn(serverName, scope), await cleanupSecureStorage(), removedScope = scope;
    } else {
      let localConfig = eh(),
        userConfig = Ot(),
        projectServers = await Dst().catch(() => ({})),
        existsInProject = Object.hasOwn(projectServers, serverName),
        matchingScopes = [];
      if (localConfig.mcpServers?.[serverName]) matchingScopes.push("local");
      if (existsInProject) matchingScopes.push("project");
      if (userConfig.mcpServers?.[serverName]) matchingScopes.push("user");
      if (matchingScopes.length === 0) {
        let allServerNames = [...Object.keys(localConfig.mcpServers ?? {}), ...Object.keys(projectServers), ...Object.keys(userConfig.mcpServers ?? {})];
        return await Qu("cli_mcp_remove", "cli_mcp_remove_not_found"), Qh(R1o(serverName, os(allServerNames)));
      } else if (matchingScopes.length === 1) {
        let onlyScope = matchingScopes[0];
        await Ug("tengu_mcp_delete", {
          name: serverName,
          scope: Le(onlyScope)
        }), await Hxn(serverName, onlyScope), await cleanupSecureStorage(), removedScope = onlyScope;
      } else {
        process.stderr.write(`MCP server "${serverName}" exists in multiple scopes:
`), matchingScopes.forEach(scope => {
          process.stderr.write(`  - ${UNt(scope)} (${lB(scope)})
`);
        });
        let removeCommands = matchingScopes.map(scope => t_("mcp remove", serverName, `-s ${scope}`)).filter(command => command !== null);
        if (removeCommands.length > 0) process.stderr.write(`
To remove from a specific scope, use:
`), removeCommands.forEach(command => process.stderr.write(`  ${command}
`));else process.stderr.write(`
Specify a scope with -s to remove from a specific one.
`);
        return await Qu("cli_mcp_remove", "cli_mcp_remove_ambiguous_scope"), Qh();
      }
    }
  } catch (removeError) {
    return await Qu("cli_mcp_remove", "cli_mcp_remove_failed"), Qh(Ce(removeError));
  }
  await pA("cli_mcp_remove");
  let serverLabel = options.scope ? serverName : `"${serverName}"`;
  instance.render(kT.jsx(py, {
    children: kT.jsxs($, {
      flexDirection: "column",
      children: [kT.jsxs(v, {
        children: ["Removed MCP server ", serverLabel, " from ", removedScope, " config"]
      }), kT.jsxs(v, {
        children: ["File modified: ", lB(removedScope)]
      })]
    })
  })), await instance.waitUntilExit();
}
/**
 * Resolve display-time server configs, expanding scoped entries from their
 * on-disk source (without variable expansion) so listings show the raw,
 * unexpanded config; non-scoped entries are passed through `lpe`.
 */
function OWl(servers: Record<string, any>): Record<string, any> {
  let scopeServersCache = new Map<string, any>(),
    resolved: Record<string, any> = {};
  for (let [name, server] of Object.entries(servers)) if (server.scope === "local" || server.scope === "user" || server.scope === "project" || server.scope === "enterprise") {
    let scopeServers = scopeServersCache.get(server.scope);
    if (!scopeServers) scopeServers = RC(server.scope, {
      expandVars: !1
    }).servers, scopeServersCache.set(server.scope, scopeServers);
    resolved[name] = scopeServers[name] ?? server;
  } else resolved[name] = lpe(server);
  return resolved;
}
/** Format one MCP server entry into a single listing line, or null if unknown type. */
function RPm({
  name: name,
  server: server,
  status: status
}: { name: string; server: any; status: string }): string | null {
  if (server.type === "sse") return `${name}: ${server.url} (SSE) - ${status}`;
  if (server.type === "http") return `${name}: ${server.url} (HTTP) - ${status}`;
  if (server.type === "claudeai-proxy") return `${name}: ${server.url} - ${status}`;
  if (!server.type || server.type === "stdio") {
    let args = Array.isArray(server.args) ? server.args : [];
    return `${name}: ${server.command} ${args.join(" ")} - ${status}`;
  }
  return null;
}
/** React component: renders the resolved server-status list (memoized via compiler cache). */
function vPm(props: { promise: Promise<any[]> }) {
  let cache = IWl.c(10),
    {
      promise: promise
    } = props,
    statusEntries = pZn.use(promise),
    textComponent,
    boxComponent,
    joinedLines;
  if (cache[0] !== statusEntries) {
    let lines = statusEntries.map(RPm).filter(wPm);
    boxComponent = py, textComponent = v, joinedLines = lines.join(`
`), cache[0] = statusEntries, cache[1] = textComponent, cache[2] = boxComponent, cache[3] = joinedLines;
  } else textComponent = cache[1], boxComponent = cache[2], joinedLines = cache[3];
  let textElement;
  if (cache[4] !== textComponent || cache[5] !== joinedLines) textElement = kT.jsx(textComponent, {
    children: joinedLines
  }), cache[4] = textComponent, cache[5] = joinedLines, cache[6] = textElement;else textElement = cache[6];
  let boxElement;
  if (cache[7] !== boxComponent || cache[8] !== textElement) boxElement = kT.jsx(boxComponent, {
    children: textElement
  }), cache[7] = boxComponent, cache[8] = textElement, cache[9] = boxElement;else boxElement = cache[9];
  return boxElement;
}
/** Predicate: keep only non-null listing lines. */
function wPm(line: string | null): boolean {
  return line !== null;
}
/** `claude mcp list` — list configured MCP servers and probe their health. */
async function mcpListHandler(instance: any) {
  await Ug("tengu_mcp_list", {}), await q6({
    hasDynamicMcpConfig: !1
  });
  let {
    servers: servers,
    pendingProjectServers: pendingProjectServers
  } = await x$({
    includePendingProjectServers: !0
  });
  await pA("cli_mcp_list");
  let footer = kT.jsx(nht, {});
  if (Object.keys(servers).length === 0) {
    instance.render(kT.jsx(py, {
      children: kT.jsxs($, {
        flexDirection: "column",
        children: [kT.jsx(v, {
          children: "No MCP servers configured. Use `claude mcp add` to add a server."
        }), footer]
      })
    })), await instance.waitUntilExit(), await gi(0);
    return;
  }
  let resolvedServers = OWl(servers),
    statusPromise = Z8(Object.entries(servers), async ([name, server]) => ({
      name: name,
      server: resolvedServers[name] ?? server,
      status: pendingProjectServers.has(name) ? LWl : (await PWl(name, server)).status
    }), {
      concurrency: Tit()
    });
  instance.render(kT.jsx(pZn.Suspense, {
    fallback: kT.jsxs(v, {
      children: ["Checking MCP server health\u2026", `

`]
    }),
    children: kT.jsxs($, {
      flexDirection: "column",
      children: [kT.jsx(vPm, {
        promise: statusPromise
      }), footer]
    })
  })), await instance.waitUntilExit(), await gi(0);
}
/** `claude mcp get <name>` — print full details for a single configured server. */
async function mcpGetHandler(instance: any, serverName: string) {
  await Ug("tengu_mcp_get", {
    name: serverName
  }), await q6({
    hasDynamicMcpConfig: !1
  });
  let {
      servers: servers,
      pendingProjectServers: pendingProjectServers,
      rejectedProjectServers: rejectedProjectServers
    } = await x$({
      includePendingProjectServers: !0,
      includeRejectedProjectServers: !0
    }),
    server = servers[serverName] ?? null,
    projectApprovalState = pendingProjectServers.has(serverName) ? "pending" : rejectedProjectServers.has(serverName) ? "rejected" : null;
  if (!server) {
    await Qu("cli_mcp_get", "cli_mcp_get_not_found");
    let knownNames = Object.keys(servers).filter(name => !pendingProjectServers.has(name) && !rejectedProjectServers.has(name));
    return Qh(oZn(serverName, knownNames, pendingProjectServers.size > 0));
  }
  let statusInfo = projectApprovalState === "pending" ? {
      status: LWl
    } : projectApprovalState === "rejected" ? {
      status: kPm
    } : await PWl(serverName, server),
    resolvedServer = OWl({
      [serverName]: server
    })[serverName] ?? server,
    detailLines = [`${serverName}:`, `  Scope: ${UNt(server.scope)}`, `  Status: ${statusInfo.status}`, ...(statusInfo.issue ? [`  Issue: ${statusInfo.issue}`] : [])];
  if ((server.type === "sse" || server.type === "http") && (resolvedServer.type === "sse" || resolvedServer.type === "http")) {
    if (detailLines.push(`  Type: ${server.type}`), detailLines.push(`  URL: ${resolvedServer.url}`), resolvedServer.headers) {
      detailLines.push("  Headers:");
      for (let [headerName, headerValue] of Object.entries(resolvedServer.headers)) detailLines.push(`    ${headerName}: ${headerValue}`);
    }
    if (server.oauth?.clientId || server.oauth?.callbackPort) {
      let oauthDetails = [];
      if (server.oauth.clientId) {
        if (oauthDetails.push("client_id configured"), (await Gxn(serverName, server))?.clientSecret) oauthDetails.push("client_secret configured");
      }
      if (server.oauth.callbackPort) oauthDetails.push(`callback_port ${server.oauth.callbackPort}`);
      detailLines.push(`  OAuth: ${oauthDetails.join(", ")}`);
    }
  } else if (server.type === "stdio" && resolvedServer.type === "stdio") {
    detailLines.push("  Type: stdio"), detailLines.push(`  Command: ${resolvedServer.command}`);
    let args = Array.isArray(resolvedServer.args) ? resolvedServer.args : [];
    if (detailLines.push(`  Args: ${args.join(" ")}`), resolvedServer.env) {
      detailLines.push("  Environment:");
      for (let [envName, envValue] of Object.entries(resolvedServer.env)) detailLines.push(`    ${envName}=${envValue}`);
    }
  }
  if (server.timeout !== void 0) detailLines.push(`  Timeout: ${server.timeout}ms${server.timeout < 1000 ? " (ignored: below 1000ms minimum)" : ""}`);
  let removeCommand = server.scope === "local" || server.scope === "project" || server.scope === "user" ? t_("mcp remove", serverName, `-s ${server.scope}`) : null,
    removeHint = null;
  if (removeCommand) removeHint = `To remove this server, run: ${removeCommand}`;else if (server.scope === "user" || server.scope === "project" || server.scope === "local" || server.scope === "enterprise") removeHint = `To remove this server, edit ${lB(server.scope)}`;
  if (removeHint) detailLines.push(""), detailLines.push(removeHint);
  await pA("cli_mcp_get"), instance.render(kT.jsx(py, {
    children: kT.jsx(v, {
      children: detailLines.join(`
`)
    })
  })), await instance.waitUntilExit(), await gi(0);
}
/** `claude mcp add-json <name> <json>` — add a server from a raw JSON config. */
async function mcpAddJsonHandler(instance: any, serverName: string, jsonString: string, options: any) {
  let scope, serverType;
  try {
    scope = $st(options.scope);
    let parsedConfig = ba(jsonString, !1);
    if (parsedConfig === null) A("mcp add-json: user-provided JSON was empty, invalid, or null", {
      level: "error"
    });
    let clientSecret = options.clientSecret && parsedConfig && typeof parsedConfig === "object" && "type" in parsedConfig && (parsedConfig.type === "sse" || parsedConfig.type === "http" || parsedConfig.type === "streamable-http") && "url" in parsedConfig && typeof parsedConfig.url === "string" && "oauth" in parsedConfig && parsedConfig.oauth && typeof parsedConfig.oauth === "object" && "clientId" in parsedConfig.oauth ? await qNt() : void 0;
    if (await Fge(serverName, parsedConfig, scope), serverType = parsedConfig && typeof parsedConfig === "object" && "type" in parsedConfig ? String(parsedConfig.type || "stdio") : "stdio", serverType === "streamable-http") serverType = "http";
    if (clientSecret && parsedConfig && typeof parsedConfig === "object" && "type" in parsedConfig && (parsedConfig.type === "sse" || parsedConfig.type === "http" || parsedConfig.type === "streamable-http") && "url" in parsedConfig && typeof parsedConfig.url === "string") {
      let storeResult = await WNt(serverName, {
        type: parsedConfig.type === "sse" ? "sse" : "http",
        url: parsedConfig.url
      }, clientSecret);
      if (!storeResult.success) process.stderr.write(`Server added, but the client secret could not be stored${storeResult.warning ? ` (${storeResult.warning})` : ""}. Re-run with --client-secret once secure storage is available.
`);
    }
    await Ug("tengu_mcp_add", {
      scope: Le(scope),
      source: Ve("json"),
      type: serverType
    });
  } catch (addError) {
    return await Qu("cli_mcp_add_json", "cli_mcp_add_json_failed"), Qh(Ce(addError));
  }
  await pA("cli_mcp_add_json"), instance.render(kT.jsx(py, {
    children: kT.jsxs(v, {
      children: ["Added ", serverType, " MCP server ", serverName, " to ", scope, " config"]
    })
  })), await instance.waitUntilExit();
}
/** `claude mcp add-from-desktop` — import MCP servers from Claude Desktop config. */
async function mcpAddFromDesktopHandler(options: any) {
  try {
    let scope = $st(options.scope),
      platform = Yt();
    await Ug("tengu_mcp_add", {
      scope: Le(scope),
      platform: Le(platform),
      source: Ve("desktop")
    });
    let {
        readClaudeDesktopMcpServers: readClaudeDesktopMcpServers
      } = await Promise.resolve().then(() => (kWl(), wWl)),
      desktopServers = await readClaudeDesktopMcpServers();
    if (Object.keys(desktopServers).length === 0) return await pA("cli_mcp_add_from_desktop"), U6("No MCP servers found in Claude Desktop configuration or configuration file does not exist.");
    await pA("cli_mcp_add_from_desktop");
    let {
      unmount: unmount
    } = await G8(kT.jsx(IE, {
      children: kT.jsx(kC, {
        children: kT.jsx(Y8l, {
          servers: desktopServers,
          scope: scope,
          onDone: () => {
            unmount();
          }
        })
      })
    }), {
      exitOnCtrlC: !0,
      patchConsole: !1
    });
  } catch (desktopError) {
    return await Qu("cli_mcp_add_from_desktop", "cli_mcp_add_from_desktop_failed"), Qh(Ce(desktopError));
  }
}
/** `claude mcp reset-project-choices` — clear stored .mcp.json approvals/rejections. */
async function mcpResetChoicesHandler(instance: any) {
  if (await Ug("tengu_mcp_reset_mcpjson_choices", {}), !MKt(["enabledMcpjsonServers", "disabledMcpjsonServers", "enableAllProjectMcpServers"])) return dGe("Error: Failed to reset project choices: legacy approvals in ~/.claude.json could not be cleared (is the file writable?). Nothing was changed."), await Qu("cli_mcp_reset_choices", "cli_mcp_reset_choices_projectconfig_delete_failed"), await B3e(), Rs();
  let localSettings = An("localSettings");
  if (localSettings ? localSettings.enabledMcpjsonServers !== void 0 || localSettings.disabledMcpjsonServers !== void 0 || localSettings.enableAllProjectMcpServers !== void 0 : hCe().length > 0) {
    if (localSettings !== null && hCe().length > 0) return dGe("Error: Failed to reset project choices: settings.local.json carries validation warnings, and rewriting it would delete the warned entries \u2014 run /doctor and fix them, then re-run (legacy approvals in ~/.claude.json were cleared; local settings were not)"), await Qu("cli_mcp_reset_choices", "cli_mcp_reset_choices_settings_warnings_blocked"), await B3e(), Rs();
    let {
      error: writeError
    } = ao("localSettings", {
      enabledMcpjsonServers: void 0,
      disabledMcpjsonServers: void 0,
      enableAllProjectMcpServers: void 0
    });
    if (writeError) return dGe(`Error: Failed to reset project choices: ${writeError.message} (legacy approvals in ~/.claude.json were cleared; local settings were not)`), await Qu("cli_mcp_reset_choices", "cli_mcp_reset_choices_settings_write_failed"), await B3e(), Rs();
  }
  await pA("cli_mcp_reset_choices");
  let disclosure = null;
  try {
    let isMcpScoped = JS("mcp");
    if (!E1()) {
      let {
          serverNames: serverNames,
          pluginServerNames: pluginServerNames,
          rootServers: rootServers
        } = await C1o(),
        describeServer = name => iCe(name, pluginServerNames.has(name)),
        autoApprovedServers = [],
        stillRejectedServers = [],
        pendingCount = 0;
      for (let name of serverNames) {
        if (isMcpScoped && !pluginServerNames.has(name)) continue;
        let approvalState = BNt(name);
        if (approvalState === "approved") {
          if (Qk(name)) continue;
          let rootServer = rootServers[name];
          if (rootServer && !Oae(name, rootServer)) continue;
          autoApprovedServers.push(describeServer(name));
        } else if (approvalState === "rejected") stillRejectedServers.push(describeServer(name));else pendingCount++;
      }
      disclosure = {
        autoApprovedServers: autoApprovedServers,
        stillRejectedServers: stillRejectedServers,
        pendingCount: pendingCount,
        gatingErrors: RUn().length
      };
    }
  } catch (scanError) {
    A(`mcp reset-project-choices: post-reset disclosure scan failed: ${Ce(scanError)}`, {
      level: "warn"
    }), disclosure = null;
  }
  instance.render(kT.jsx(py, {
    children: kT.jsxs($, {
      flexDirection: "column",
      children: [kT.jsx(v, {
        children: "Project-scoped (.mcp.json) server approvals and rejections stored for this project have been reset."
      }), disclosure && disclosure.autoApprovedServers.length > 0 && kT.jsx(v, {
        children: HWl(disclosure.autoApprovedServers, "is still approved by other settings and will connect automatically without prompting.", "are still approved by other settings and will connect automatically without prompting.")
      }), disclosure && disclosure.stillRejectedServers.length > 0 && kT.jsx(v, {
        children: HWl(disclosure.stillRejectedServers, "remains rejected by other settings and will not prompt.", "remain rejected by other settings and will not prompt.")
      }), disclosure && disclosure.pendingCount > 0 && (disclosure.gatingErrors > 0 ? kT.jsx(v, {
        children: "Settings errors are currently blocking the approval prompt \u2014 run /doctor and fix them, then restart Claude Code to be prompted."
      }) : kT.jsx(v, {
        children: "You will be prompted for approval next time you start Claude Code."
      }))]
    })
  })), await instance.waitUntilExit();
}
/** Pluralize a server-name list into "1 server (x) <singular>" or "N servers (...) <plural>". */
function HWl(serverNames: string[], singularSuffix: string, pluralSuffix: string): string {
  return serverNames.length === 1 ? `1 server (${serverNames[0]}) ${singularSuffix}` : `${serverNames.length} servers (${serverNames.join(", ")}) ${pluralSuffix}`;
}
var IWl,
  xWl,
  DWl,
  pZn,
  kT,
  LWl = "\u23F8 Pending approval (run `claude` to approve)",
  kPm;
var IOe = b(() => {
  Zs();
  BOt();
  J8l();
  LKn();
  je();
  WW();
  mn();
  QOn();
  kt();
  wee();
  Ew();
  KA();
  oQr();
  T0();
  B_t();
  qO();
  A1o();
  pq();
  tr();
  qe();
  Ct();
  Np();
  pd();
  Es();
  aA();
  kct();
  ez();
  br();
  i0e();
  _N();
  v1o();
  IWl = x(tt(), 1), xWl = require("fs/promises"), DWl = require("process"), pZn = x(et(), 1), kT = x(oe(), 1);
  kPm = `${Xe.cross} Rejected (see disabledMcpjsonServers in settings)`;
});

export {HOe,EPm,PWl,mcpServeHandler,mcpRemoveHandler,OWl,RPm,vPm,wPm,mcpListHandler,mcpGetHandler,mcpAddJsonHandler,mcpAddFromDesktopHandler,mcpResetChoicesHandler,HWl,IWl,xWl,DWl,pZn,kT,LWl,kPm,IOe};
