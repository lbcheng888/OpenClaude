// @ts-nocheck
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {oMt as PLt,cW as V5,P$e as d$e,$xe as Exe,Ert as srt} from "../../vendor/m3139.ts";
import {Se,Pn as Dn,bt as St} from "../../vendor/m195.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {Net as _et,sh} from "../../vendor/m2589.ts";
import {poe as toe,Iu as Pu} from "../../vendor/m643.ts";
import {jt,ws as bs} from "../../vendor/m228.ts";
import {qt as Wt,Xt} from "./0228_encoding.ts";
import {boe as doe,bbe as ibe} from "../../vendor/m724.ts";
import {Crt as irt,bL as pL,xee as gee,sQi as zJi,kee as _ee,Che as lhe,Hq as Aq} from "../../vendor/m3140.ts";
import {_ee as aee} from "../../vendor/m3017.ts";
import {uae as Qie,J1 as $1} from "./2678_withFileTypes.ts";
import {fs as ps} from "../api/0459_getOauthConfig.ts";
import {b} from "../../runtime.ts";
import {Lr as Or} from "../../vendor/m578.ts";
// @ts-nocheck
async function loadMcpbServer(plugin, mcpbSource, errors) {
  try {
    v(`Loading MCP servers from MCPB: ${mcpbSource}`);
    let repository = plugin.repository,
      result = await PLt(mcpbSource, plugin.path, repository, msg => {
        v(`MCPB [${plugin.name}]: ${msg}`);
      });
    if ("status" in result && result.status === "needs-config") return v(`MCPB ${mcpbSource} requires user configuration. ` + `User can configure via: /plugin \u2192 Manage plugins \u2192 ${plugin.name} \u2192 Configure`), null;
    let extractedResult = result,
      serverName = extractedResult.manifest.name;
    return v(`Loaded MCP server "${serverName}" from MCPB (extracted to ${extractedResult.extractedPath})`), {
      [serverName]: extractedResult.mcpConfig
    };
  } catch (err) {
    let errorMsg = Se(err);
    v(`Failed to load MCPB ${mcpbSource}: ${errorMsg}`, {
      level: "error"
    });
    let repository = plugin.repository;
    if (mcpbSource.startsWith("http") && (errorMsg.includes("download") || errorMsg.includes("network"))) errors.push({
      type: "mcpb-download-failed",
      source: repository,
      plugin: plugin.name,
      url: mcpbSource,
      reason: errorMsg
    });else if (errorMsg.includes("manifest") || errorMsg.includes("user configuration")) errors.push({
      type: "mcpb-invalid-manifest",
      source: repository,
      plugin: plugin.name,
      mcpbPath: mcpbSource,
      validationError: errorMsg
    });else errors.push({
      type: "mcpb-extract-failed",
      source: repository,
      plugin: plugin.name,
      mcpbPath: mcpbSource,
      reason: errorMsg
    });
    return null;
  }
}
async function discoverPluginMcpServers(plugin, errors = []) {
  if (Ge.CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS) {
    v(`Skipping plugin MCP server discovery for "${plugin.name}" (CLAUDE_CODE_SKIP_PLUGIN_MCP_SERVERS is set)`);
    return;
  }
  if (plugin.skipMcpDiscovery) return {};
  let mcpServersMap = {},
    isProjectScopedPlugin = _et(plugin),
    shouldSkipSource = source => {
      if (!isProjectScopedPlugin) return false;
      if (V5(source)) return v(`Skipping MCPB source "${source}" for project-scope @skills-dir plugin "${plugin.name}": repo-supplied plugins must declare MCP servers inline or via a local in-dir .mcp.json (no pre-approval download).`, {
        level: "warn"
      }), true;
      if (toe(source) || source.split(/[/\\]/).some(segment => /^\.\. [ .]*$/.test(segment))) return v(`Skipping out-of-directory MCP source "${source}" for project-scope @skills-dir plugin "${plugin.name}": repo-supplied plugins may only reference files inside the plugin directory.`, {
        level: "warn"
      }), true;
      return false;
    },
    dotMcpJson = await readMcpJsonFile(plugin.path, ".mcp.json");
  if (dotMcpJson) mcpServersMap = {
    ...mcpServersMap,
    ...dotMcpJson
  };
  if (plugin.manifest.mcpServers) {
    let mcpServersSpec = plugin.manifest.mcpServers;
    if (typeof mcpServersSpec === "string") {
      if (shouldSkipSource(mcpServersSpec)) ;else if (V5(mcpServersSpec)) {
        let a = await loadMcpbServer(plugin, mcpServersSpec, errors);
        if (a) mcpServersMap = {
          ...mcpServersMap,
          ...a
        };
      } else {
        let a = await readMcpJsonFile(plugin.path, mcpServersSpec);
        if (a) mcpServersMap = {
          ...mcpServersMap,
          ...a
        };
      }
    } else if (Array.isArray(mcpServersSpec)) {
      let results = await Promise.all(mcpServersSpec.map(async specEntry => {
        try {
          if (typeof specEntry === "string") {
            if (shouldSkipSource(specEntry)) return null;
            if (V5(specEntry)) return await loadMcpbServer(plugin, specEntry, errors);
            return await readMcpJsonFile(plugin.path, specEntry);
          }
          return specEntry;
        } catch (err) {
          return v(`Failed to load MCP servers from spec for plugin ${plugin.name}: ${err}`, {
            level: "error"
          }), null;
        }
      }));
      for (let entry of results) if (entry) mcpServersMap = {
        ...mcpServersMap,
        ...entry
      };
    } else mcpServersMap = {
      ...mcpServersMap,
      ...mcpServersSpec
    };
  }
  return Object.keys(mcpServersMap).length > 0 ? mcpServersMap : undefined;
}
async function readMcpJsonFile(pluginPath, filename) {
  let fs = jt(),
    fullPath = Yl7.join(pluginPath, filename),
    rawContent;
  try {
    rawContent = await fs.readFile(fullPath, {
      encoding: "utf-8"
    });
  } catch (err) {
    if (Dn(err)) return null;
    return v(`Failed to load MCP servers from ${fullPath}: ${err}`, {
      level: "error"
    }), null;
  }
  try {
    let parsed = Wt(rawContent),
      serversObj = parsed.mcpServers || parsed,
      validated = {};
    for (let [serverName, serverConfig] of Object.entries(serversObj)) {
      let parseResult = doe().safeParse(serverConfig);
      if (parseResult.success) validated[serverName] = parseResult.data;else v(`Invalid MCP server config for ${serverName} in ${fullPath}: ${parseResult.error.message}`, {
        level: "error"
      });
    }
    return validated;
  } catch (err) {
    return v(`Failed to load MCP servers from ${fullPath}: ${err}`, {
      level: "error"
    }), null;
  }
}
function getMissingChannelConfigs(plugin) {
  let channels = plugin.manifest.channels;
  if (!channels || channels.length === 0) return [];
  let repository = plugin.repository,
    missingConfigs = [];
  for (let channel of channels) {
    if (!channel.userConfig || Object.keys(channel.userConfig).length === 0) continue;
    let storedConfig = d$e(repository, channel.server) ?? {};
    if (!Exe(storedConfig, channel.userConfig).valid) missingConfigs.push({
      server: channel.server,
      displayName: irt(channel.displayName) ?? channel.server,
      configSchema: channel.userConfig
    });
  }
  return missingConfigs;
}
function namespaceMcpServersForPlugin(mcpServers, pluginName, pluginSource) {
  let namespacedMap = {};
  for (let [serverName, serverConfig] of Object.entries(mcpServers)) {
    let namespacedKey = `plugin:${pluginName}:${serverName}`,
      enrichedConfig = {
        ...serverConfig,
        scope: "dynamic",
        pluginSource: pluginSource
      };
    namespacedMap[namespacedKey] = enrichedConfig;
  }
  return namespacedMap;
}
function buildUserConfigForServer(plugin, serverName) {
  let pluginLevelUserConfig = plugin.manifest.userConfig,
    channelLevelUserConfig = plugin.manifest.channels?.find(ch => ch.server === serverName)?.userConfig;
  if (!pluginLevelUserConfig && !channelLevelUserConfig) return;
  let resolvedPluginConfig = pluginLevelUserConfig ? pL(gee(plugin)) : undefined,
    resolvedChannelConfig = channelLevelUserConfig ? d$e(plugin.repository, serverName) ?? undefined : undefined;
  return zJi({
    ...resolvedPluginConfig,
    ...resolvedChannelConfig
  }, {
    ...pluginLevelUserConfig,
    ...channelLevelUserConfig
  });
}
function resolvePluginMcpServerConfig(serverConfig, plugin, userConfig, errors, pluginName, serverName) {
  let missingVars = [],
    configError,
    originalUrl,
    urlMissingVars = [],
    expandEnvVar = value => {
      let expanded = _ee(value, plugin);
      if (userConfig) expanded = lhe(expanded, userConfig);
      let {
        expanded: finalExpanded,
        missingVars: vars
      } = aee(expanded);
      return missingVars.push(...vars), finalExpanded;
    },
    resolvedConfig;
  switch (serverConfig.type) {
    case undefined:
    case "stdio":
      {
        let mutableConfig = {
          ...serverConfig
        };
        if (mutableConfig.command) mutableConfig.command = expandEnvVar(mutableConfig.command);
        if (mutableConfig.args) mutableConfig.args = mutableConfig.args.map(arg => expandEnvVar(arg));
        let envWithPluginVars = {
          CLAUDE_PLUGIN_ROOT: plugin.path,
          CLAUDE_PLUGIN_DATA: Qie(plugin.source),
          ...(mutableConfig.env || {})
        };
        for (let [envKey, envVal] of Object.entries(envWithPluginVars)) if (!Sk3.has(envKey)) envWithPluginVars[envKey] = expandEnvVar(envVal);
        mutableConfig.env = envWithPluginVars, resolvedConfig = mutableConfig;
        break;
      }
    case "sse":
    case "http":
    case "ws":
      {
        let mutableConfig = {
          ...serverConfig
        };
        originalUrl = mutableConfig.url;
        let varCountBefore = missingVars.length;
        if (mutableConfig.url) mutableConfig.url = expandEnvVar(mutableConfig.url);
        if (urlMissingVars = missingVars.slice(varCountBefore), mutableConfig.headers) {
          let expandedHeaders = {};
          for (let [headerName, headerVal] of Object.entries(mutableConfig.headers)) expandedHeaders[headerName] = expandEnvVar(headerVal);
          mutableConfig.headers = expandedHeaders;
        }
        resolvedConfig = mutableConfig;
        break;
      }
    case "sse-ide":
    case "ws-ide":
    case "sdk":
    case "claudeai-proxy":
      resolvedConfig = serverConfig;
      break;
  }
  if (errors && missingVars.length > 0) {
    let joinedVars = ps(missingVars).join(", ");
    if (v(`Missing environment variables in plugin MCP config: ${joinedVars}`, {
      level: "warn"
    }), pluginName && serverName) errors.push({
      type: "mcp-config-invalid",
      source: plugin.source,
      plugin: pluginName,
      serverName: serverName,
      validationError: `Missing environment variables: ${joinedVars}`
    });
  }
  if ((resolvedConfig.type === "sse" || resolvedConfig.type === "http" || resolvedConfig.type === "ws") && "url" in resolvedConfig) {
    let urlIsValid = false;
    try {
      new URL(resolvedConfig.url), urlIsValid = true;
    } catch {}
    if (!urlIsValid) {
      if (configError = urlMissingVars.length > 0 ? `Missing environment variables: ${ps(urlMissingVars).join(", ")}` : originalUrl?.includes("${user_config.") ? `URL is unset or invalid \u2014 open /plugin manage and configure ${pluginName ?? "the plugin"} options` : `Plugin ${pluginName ?? plugin.source} has an invalid MCP url`, urlMissingVars.length === 0 && errors && pluginName && serverName) errors.push({
        type: "mcp-config-invalid",
        source: plugin.source,
        plugin: pluginName,
        serverName: serverName,
        validationError: configError
      });
    }
  }
  return configError ? {
    ...resolvedConfig,
    configError: configError
  } : resolvedConfig;
}
async function resolvePluginMcpServers(plugin, errors = []) {
  if (!plugin.enabled) return;
  let mcpServers = plugin.mcpServers || (await discoverPluginMcpServers(plugin, errors));
  if (!mcpServers) return;
  let resolvedServers = {};
  for (let [serverName, serverConfig] of Object.entries(mcpServers)) {
    let userConfig = buildUserConfigForServer(plugin, serverName);
    try {
      resolvedServers[serverName] = resolvePluginMcpServerConfig(serverConfig, plugin, userConfig, errors, plugin.name, serverName);
    } catch (err) {
      errors?.push({
        type: "generic-error",
        source: serverName,
        plugin: plugin.name,
        error: Se(err)
      });
    }
  }
  return namespaceMcpServersForPlugin(resolvedServers, plugin.name, plugin.source);
}
var Yl7, pg8, Sk3;
var yWH = b(() => {
  ibe();
  je();
  Or();
  St();
  bs();
  Pu();
  Xt();
  srt();
  $1();
  sh();
  Aq();
  Yl7 = require("path");
  pg8 = ["CLAUDE_PLUGIN_ROOT", "CLAUDE_PLUGIN_DATA"], Sk3 = new Set(pg8);
});

export {loadMcpbServer as iQi,discoverPluginMcpServers as Hee,readMcpJsonFile as m7r,getMissingChannelConfigs as f7r,namespaceMcpServersForPlugin as H2d,buildUserConfigForServer as I2d,resolvePluginMcpServerConfig as P2d,resolvePluginMcpServers as Hkn,Yl7 as aQi,pg8 as A7r,Sk3 as D2d,yWH as qxe};
