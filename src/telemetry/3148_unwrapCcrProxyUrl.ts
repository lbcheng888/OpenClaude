// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {RR,h7} from "../../vendor/m704.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {dn,bt} from "../../vendor/m195.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {_ee} from "../../vendor/m3017.ts";
import {wMr,Phn,Mhn,jni,sve} from "../../vendor/m2043.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {getSettingsForSource,getInitialSettings,hasDisableClaudeAiConnectors,getAllPolicyTierSettings,yr} from "../config/0740_updateSettingsForSource.ts";
import {aKe,knn,Hnn,J3} from "../artifact/0731_allow.ts";
import {iMt,h7r} from "../../vendor/m3142.ts";
import {isClaudeInChromeMCPServer,oL} from "../mcp/2581_trackClaudeInChromeTabId.ts";
import {uve,_K,wfe} from "../computer-use/2193_iTerm_app.ts";
import {hw,roe} from "../../vendor/m446.ts";
import {fs} from "../api/0459_getOauthConfig.ts";
import {iKe,Sw} from "../mcp/0728_serverName.ts";
import {boe,bbe,yEt,zAr,pnn,YAr,JAr,XAr} from "../../vendor/m724.ts";
import {getGlobalConfig,getCurrentProjectConfig,saveGlobalConfig,saveCurrentProjectConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Oe,Ie,ln} from "./0594_feature_name.ts";
import {E} from "../../vendor/m319.ts";
import {Fa,Pd} from "../../vendor/m701.ts";
import {getIsRemoteMode,getOriginalCwd,getStrictMcpConfig,lt} from "../session/0131_sent.ts";
import {xh,mf} from "../../vendor/m702.ts";
import {iS,RK} from "../../vendor/m2231.ts";
import {L$e,Nrt,CL} from "../mcp/3149_scope.ts";
import {hc,Iy} from "../agent/2230_explicitlyRequested.ts";
import {Nhn,jkt} from "../api/2045_type.ts";
import {loadAllPluginsCacheOnly,loadAllPluginsForPreview,gg} from "../agent/4445_resolvePluginRoot.ts";
import {TT,N5} from "../../vendor/m2583.ts";
import {Hkn,qxe,A7r} from "../config/3142_i.ts";
import {Net,sh} from "../../vendor/m2589.ts";
import {sv,Epe} from "../../vendor/m434.ts";
import {jxe,Lkn,Iee} from "../api/3147_claudeAiMcpEverConnected.ts";
import {Pet,qEn} from "../../vendor/m2581.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {Xr} from "../../vendor/m321.ts";
/** Module namespace object, populated by the module registration call below. */
var CQi = {};
isFullscreenWithTTY(CQi, {
  unwrapCcrProxyUrl: () => unwrapCcrProxyUrl,
  suppressedConnectorsEqual: () => suppressedConnectorsEqual,
  shouldSkipClaudeAiFetchForEnterpriseLockdown: () => shouldSkipClaudeAiFetchForEnterpriseLockdown,
  shouldAllowManagedMcpServersOnly: () => shouldAllowManagedMcpServersOnly,
  setMcpServerEnabled: () => setMcpServerEnabled,
  removeMcpConfig: () => removeMcpConfig,
  readRawMcpJsonServersFromCwd: () => readRawMcpJsonServersFromCwd,
  parseMcpConfigFromFilePath: () => parseMcpConfigFromFilePath,
  parseMcpConfig: () => parseMcpConfig,
  isMcpServerDisabled: () => isMcpServerDisabled,
  isMcpServerDenied: () => isMcpServerDenied,
  isMcpServerBlockedAtConnectTime: () => isMcpServerBlockedAtConnectTime,
  isMcpServerAllowedByPolicy: () => isMcpServerAllowedByPolicy,
  isCcrProxyUrl: () => isCcrProxyUrl,
  isBuiltinInProcessMcpServer: () => isBuiltinInProcessMcpServer,
  getMcpServerSignature: () => getMcpServerSignature,
  getMcpScopeConflicts: () => getMcpScopeConflicts,
  getMcpConfigsByScope: () => getMcpConfigsByScope,
  getMcpConfigByName: () => getMcpConfigByName,
  getEnterpriseMcpFilePath: () => getEnterpriseMcpFilePath,
  getConnectablePluginMcpServerNames: () => getConnectablePluginMcpServerNames,
  getClaudeCodeMcpConfigs: () => getClaudeCodeMcpConfigs,
  getAllMcpConfigs: () => getAllMcpConfigs,
  filterMcpServersByPolicy: () => filterMcpServersByPolicy,
  filterDynamicMcpServersByPolicy: () => filterDynamicMcpServersByPolicy,
  doesEnterpriseMcpConfigExist: () => doesEnterpriseMcpConfigExist,
  dedupPluginMcpServers: () => dedupPluginMcpServers,
  dedupClaudeAiMcpServers: () => dedupClaudeAiMcpServers,
  areMcpConfigsAllowedWithEnterpriseMcpConfig: () => areMcpConfigsAllowedWithEnterpriseMcpConfig,
  addMcpConfig: () => addMcpConfig,
  _resetCcrIngressBaseForTesting: () => _resetCcrIngressBaseForTesting,
  MCP_SETTINGS_SCOPES: () => MCP_SETTINGS_SCOPES
});

/** Returns the path to the enterprise-managed MCP JSON file. */
function getEnterpriseMcpFilePath() {
  return vhe.join(RR(), "managed-mcp.json");
}

/** Annotates every server entry in a server map with the given scope string. */
function Nkn(serverMap: any, scope: any) {
  if (!serverMap) return {};
  let result = {};
  for (let [serverName, serverConfig] of Object.entries(serverMap)) result[serverName] = {
    ...serverConfig,
    scope
  };
  return result;
}

/** Atomically writes the .mcp.json config file in the project root using a tmp-rename pattern. */
async function yQi(configObject: any) {
  let mcpJsonPath = vhe.join(Pt(), ".mcp.json"),
    existingMode;
  try {
    existingMode = (await Gz.stat(mcpJsonPath)).mode;
  } catch (err) {
    if (dn(err) !== "ENOENT") throw err;
  }
  let tmpPath = `${mcpJsonPath}.tmp.${process.pid}.${Date.now()}`,
    fileHandle = await Gz.open(tmpPath, "w", existingMode ?? 420);
  try {
    await fileHandle.writeFile(Le(configObject, null, 2), {
      encoding: "utf8"
    }), await fileHandle.datasync();
  } finally {
    await fileHandle.close();
  }
  try {
    if (existingMode !== void 0) await Gz.chmod(tmpPath, existingMode);
    await Gz.rename(tmpPath, mcpJsonPath);
  } catch (err) {
    try {
      await Gz.unlink(tmpPath);
    } catch {}
    throw err;
  }
}

/** Extracts command + args array for a stdio-type server config, or returns null. */
function Bkn(serverConfig: any) {
  if (serverConfig.type !== void 0 && serverConfig.type !== "stdio") return null;
  let stdioConfig = serverConfig;
  return [stdioConfig.command, ...(stdioConfig.args ?? [])];
}

/** Returns true if two string arrays are equal element-by-element. */
function TQi(arrayA: any, arrayB: any) {
  if (arrayA.length !== arrayB.length) return !1;
  return arrayA.every((item: any, index: any) => item === arrayB[index]);
}

/** Expands environment variable references in a string using the _ee helper. */
function Wxe(value: any) {
  return _ee(value).expanded;
}

/** Returns the URL string for a URL-based server config, or null if not applicable. */
function Fkn(serverConfig: any) {
  return "url" in serverConfig ? serverConfig.url : null;
}

/** Resets the cached CCR ingress base URL (for use in tests only). */
function _resetCcrIngressBaseForTesting() {
  SQi = process.env.SESSION_INGRESS_URL ?? process.env.ANTHROPIC_BASE_URL;
}

/**
 * Returns true if the given URL is proxied through the CCR (Claude Code Router) ingress.
 * Checks protocol+host match against the stored ingress base URL and path contains a known CCR path segment.
 */
function isCcrProxyUrl(url: any) {
  let ingressBase = SQi;
  if (!ingressBase) return !1;
  let parsedUrl, parsedBase;
  try {
    parsedUrl = new URL(url), parsedBase = new URL(ingressBase);
  } catch {
    return !1;
  }
  if ((parsedUrl.protocol === "wss:" ? `https://${parsedUrl.host}` : parsedUrl.protocol === "ws:" ? `http://${parsedUrl.host}` : parsedUrl.origin) !== parsedBase.origin) return !1;
  return wMr.some((pathSegment: any) => parsedUrl.pathname.includes(pathSegment));
}

/**
 * If the URL is a CCR proxy URL, extracts the underlying MCP server URL
 * from the `mcp_url` query parameter. Returns the original URL unchanged if not a proxy URL.
 */
function unwrapCcrProxyUrl(url: any) {
  if (!wMr.some((pathSegment: any) => url.includes(pathSegment))) return url;
  try {
    return new URL(url).searchParams.get("mcp_url") || url;
  } catch {
    return url;
  }
}

/**
 * Returns a canonical signature string for an MCP server config,
 * used to detect duplicate servers across scopes.
 */
function getMcpServerSignature(serverConfig: any, options: any) {
  let cmdArray = Bkn(serverConfig);
  if (cmdArray) {
    if (options?.includeEnv === !1) return `stdio:${Le(cmdArray)}`;
    let envEntries = Object.entries(serverConfig.env ?? {}).filter(([key]: any) => !j2d.has(key)).sort(([keyA]: any, [keyB]: any) => keyA < keyB ? -1 : keyA > keyB ? 1 : 0),
      envSuffix = envEntries.length > 0 ? `:${Le(Object.fromEntries(envEntries))}` : "";
    return `stdio:${Le(cmdArray)}${envSuffix}`;
  }
  let serverUrl = Fkn(serverConfig);
  if (serverUrl) return `url:${unwrapCcrProxyUrl(serverUrl)}`;
  return null;
}

/**
 * Deduplicates plugin MCP servers against manually-configured servers.
 * Returns the surviving server map and a list of suppressed entries.
 */
function dedupPluginMcpServers(pluginServers: any, manualServers: any) {
  let manualSigToName = new Map();
  for (let [manualName, manualConfig] of Object.entries(manualServers)) {
    let sig = getMcpServerSignature(manualConfig, {
      includeEnv: !1
    });
    if (sig && !manualSigToName.has(sig)) manualSigToName.set(sig, manualName);
  }
  let resultServers = {},
    suppressed = [],
    seenPluginSigs = new Map();
  for (let [pluginName, pluginConfig] of Object.entries(pluginServers)) {
    let sig = getMcpServerSignature(pluginConfig);
    if (sig === null) {
      resultServers[pluginName] = pluginConfig;
      continue;
    }
    let sigNoEnv = getMcpServerSignature(pluginConfig, {
        includeEnv: !1
      }),
      duplicatesManual = sigNoEnv !== null ? manualSigToName.get(sigNoEnv) : void 0;
    if (duplicatesManual !== void 0) {
      logForDebugging(`Suppressing plugin MCP server "${pluginName}": duplicates manually-configured "${duplicatesManual}"`), suppressed.push({
        name: pluginName,
        duplicateOf: duplicatesManual
      });
      continue;
    }
    let earlierPlugin = seenPluginSigs.get(sig);
    if (earlierPlugin !== void 0) {
      logForDebugging(`Suppressing plugin MCP server "${pluginName}": duplicates earlier plugin server "${earlierPlugin}"`), suppressed.push({
        name: pluginName,
        duplicateOf: earlierPlugin
      });
      continue;
    }
    seenPluginSigs.set(sig, pluginName), resultServers[pluginName] = pluginConfig;
  }
  return {
    servers: resultServers,
    suppressed
  };
}

/** Returns a human-readable endpoint description for an MCP server config. */
function W2d(serverConfig: any) {
  let urlVal = Fkn(serverConfig);
  if (urlVal) return unwrapCcrProxyUrl(urlVal);
  let cmdArr = Bkn(serverConfig);
  if (cmdArr) return cmdArr.join(" ");
  return serverConfig.type ?? "unknown";
}

/**
 * Returns a list of scope conflict warnings for servers defined in multiple
 * scopes with differing endpoints (OAuth tokens are per-endpoint).
 */
function getMcpScopeConflicts(scopeEntries: any) {
  let serverNameToEntries = new Map();
  for (let {
    scope: scopeName,
    servers: scopeServers
  } of scopeEntries) for (let [serverName, serverConfig] of Object.entries(scopeServers)) {
    let sig = getMcpServerSignature(serverConfig, {
      includeEnv: !1
    });
    if (!sig) continue;
    let entries = serverNameToEntries.get(serverName);
    if (!entries) serverNameToEntries.set(serverName, entries = []);
    entries.push({
      scope: scopeName,
      sig,
      endpoint: W2d(serverConfig)
    });
  }
  let conflicts = [];
  for (let [serverName, entries] of serverNameToEntries) {
    if (entries.length < 2) continue;
    if (new Set(entries.map((entry: any) => entry.sig)).size < 2) continue;
    conflicts.push({
      path: `mcpServers.${serverName}`,
      message: `Server "${serverName}" is defined in multiple scopes with different endpoints: ${entries.map((entry: any) => `${entry.scope} (${entry.endpoint})`).join(", ")}. OAuth tokens are stored per endpoint, so authenticating in one context will not carry over.`,
      severity: "warning",
      suggestion: `Keep the correct endpoint and remove the others: ${entries.map((entry: any) => `\`claude mcp remove ${serverName} -s ${entry.scope}\``).join(" or ")}`,
      mcpErrorMetadata: {
        scope: entries[0].scope,
        serverName,
        severity: "warning"
      }
    });
  }
  return conflicts;
}

/** Returns true if two suppressed-connector arrays have identical entries (name, duplicateOf, duplicateOfScope). */
function suppressedConnectorsEqual(arrayA: any, arrayB: any) {
  return arrayA.length === arrayB.length && arrayA.every((item: any, index: any) => item.name === arrayB[index]?.name && item.duplicateOf === arrayB[index]?.duplicateOf && item.duplicateOfScope === arrayB[index]?.duplicateOfScope);
}

/**
 * Deduplicates Claude.ai connector MCP servers against the manually-configured server set.
 * Disabled servers and those matching known CCR patterns are excluded before dedup.
 */
async function dedupClaudeAiMcpServers(claudeAiServers: any, manualServers: any) {
  let ccrConfig = await Phn(),
    sigToEntry = new Map();
  for (let [manualName, manualConfig] of Object.entries(manualServers)) {
    if (isMcpServerDisabled(manualName)) continue;
    if ((manualConfig.type === "sse" || manualConfig.type === "http") && (Mhn(manualName, manualConfig, ccrConfig) || jni(manualName, manualConfig, ccrConfig))) continue;
    let sig = getMcpServerSignature(manualConfig);
    if (sig && !sigToEntry.has(sig)) sigToEntry.set(sig, {
      name: manualName,
      scope: manualConfig.scope
    });
  }
  let resultServers = {},
    suppressed = [];
  for (let [connectorName, connectorConfig] of Object.entries(claudeAiServers)) {
    let sig = getMcpServerSignature(connectorConfig),
      duplicatesEntry = sig !== null ? sigToEntry.get(sig) : void 0;
    if (duplicatesEntry !== void 0) {
      logForDebugging(`Suppressing claude.ai connector "${connectorName}": duplicates manually-configured "${duplicatesEntry.name}"`), suppressed.push({
        name: connectorName,
        duplicateOf: duplicatesEntry.name,
        duplicateOfScope: duplicatesEntry.scope
      });
      continue;
    }
    resultServers[connectorName] = connectorConfig;
  }
  return {
    servers: resultServers,
    suppressed
  };
}

/** Returns the settings source to use for "allowed" MCP servers (policy or initial). */
function G2d() {
  if (shouldAllowManagedMcpServersOnly()) return getSettingsForSource("policySettings") ?? {};
  return getInitialSettings();
}

/** Returns the initial settings, used as the source for "denied" MCP server rules. */
function V2d() {
  return getInitialSettings();
}

/** Returns true if the given MCP server (by name and/or config) is explicitly denied by enterprise policy. */
function isMcpServerDenied(serverName: any, serverConfig: any) {
  let settings = V2d();
  if (!settings.deniedMcpServers) return !1;
  for (let rule of settings.deniedMcpServers) if (aKe(rule) && rule.serverName === serverName) return !0;
  if (serverConfig) {
    let cmdArr = Bkn(serverConfig);
    if (cmdArr) {
      let expandedCmd = cmdArr.map(Wxe);
      for (let rule of settings.deniedMcpServers) if (knn(rule) && TQi(rule.serverCommand.map(Wxe), expandedCmd)) return !0;
    }
    let urlVal = Fkn(serverConfig);
    if (urlVal) {
      let expandedUrl = Wxe(urlVal);
      for (let rule of settings.deniedMcpServers) if (Hnn(rule) && iMt(expandedUrl, Wxe(rule.serverUrl))) return !0;
    }
  }
  return !1;
}

/** Returns true if the given MCP server is allowed by enterprise policy (checks allowlist and denylist). */
function isMcpServerAllowedByPolicy(serverName: any, serverConfig: any) {
  if (isMcpServerDenied(serverName, serverConfig)) return !1;
  let settings = G2d();
  if (!settings.allowedMcpServers) return !0;
  if (settings.allowedMcpServers.length === 0) return !1;
  let hasCommandRule = settings.allowedMcpServers.some(knn),
    hasUrlRule = settings.allowedMcpServers.some(Hnn);
  if (serverConfig) {
    let cmdArr = Bkn(serverConfig),
      urlVal = Fkn(serverConfig);
    if (cmdArr) {
      if (hasCommandRule) {
        let expandedCmd = cmdArr.map(Wxe);
        for (let rule of settings.allowedMcpServers) if (knn(rule) && TQi(rule.serverCommand.map(Wxe), expandedCmd)) return !0;
        return !1;
      } else {
        for (let rule of settings.allowedMcpServers) if (aKe(rule) && rule.serverName === serverName) return !0;
        return !1;
      }
    } else if (urlVal) {
      if (hasUrlRule) {
        let expandedUrl = Wxe(urlVal);
        for (let rule of settings.allowedMcpServers) if (Hnn(rule) && iMt(expandedUrl, Wxe(rule.serverUrl))) return !0;
        return !1;
      } else {
        for (let rule of settings.allowedMcpServers) if (aKe(rule) && rule.serverName === serverName) return !0;
        return !1;
      }
    } else {
      for (let rule of settings.allowedMcpServers) if (aKe(rule) && rule.serverName === serverName) return !0;
      return !1;
    }
  }
  for (let rule of settings.allowedMcpServers) if (aKe(rule) && rule.serverName === serverName) return !0;
  return !1;
}

/** Returns true if the server is a built-in in-process MCP server (Chrome extension or computer-use). */
function isBuiltinInProcessMcpServer(serverName: any) {
  return isClaudeInChromeMCPServer(serverName) || uve(serverName);
}

/** Filters an MCP server map by enterprise policy, returning allowed and blocked lists. */
function filterMcpServersByPolicy(serverMap: any) {
  let allowed = {},
    blocked = [];
  for (let [serverName, serverConfig] of Object.entries(serverMap)) {
    let config = serverConfig;
    if (config.type === "sdk" || isMcpServerAllowedByPolicy(serverName, config)) allowed[serverName] = serverConfig;else blocked.push(serverName);
  }
  return {
    allowed,
    blocked
  };
}

/** Returns true if the server should be blocked at connection time (dynamic scope, claudeai lockdown, or policy denial). */
function isMcpServerBlockedAtConnectTime(serverName: any, serverConfig: any) {
  if (!K2d.has(serverConfig.scope)) return !1;
  if (serverConfig.scope === "claudeai" && hasDisableClaudeAiConnectors()) return !0;
  if (serverConfig.type === "sdk") return !1;
  if (isBuiltinInProcessMcpServer(serverName) || serverConfig.type === "sse-ide" || serverConfig.type === "ws-ide") return isMcpServerDenied(serverName, serverConfig);
  return !isMcpServerAllowedByPolicy(serverName, serverConfig);
}

/** Filters dynamic MCP server configs by policy, returning allowed configs and blocked names. */
function filterDynamicMcpServersByPolicy(dynamicConfigs: any) {
  if (!dynamicConfigs) return {
    configs: {},
    blocked: []
  };
  let allowed = {},
    blocked = [];
  for (let [serverName, serverConfig] of Object.entries(dynamicConfigs)) if (isMcpServerBlockedAtConnectTime(serverName, serverConfig)) blocked.push(serverName);else allowed[serverName] = serverConfig;
  return {
    configs: allowed,
    blocked
  };
}

/** Expands environment variable references in all string fields of a server config, collecting missing variable names. */
function z2d(serverConfig: any) {
  let missingVarsList = [];
  function expandStr(strValue: any) {
    let {
      expanded,
      missingVars
    } = _ee(strValue);
    return missingVarsList.push(...missingVars), expanded;
  }
  let expandedConfig;
  switch (serverConfig.type) {
    case void 0:
    case "stdio":
      {
        let stdioConfig = serverConfig;
        expandedConfig = {
          ...stdioConfig,
          command: expandStr(stdioConfig.command),
          args: stdioConfig.args.map(expandStr),
          env: stdioConfig.env ? hw(stdioConfig.env, expandStr) : void 0
        };
        break;
      }
    case "sse":
    case "http":
    case "ws":
      {
        let urlConfig = serverConfig;
        expandedConfig = {
          ...urlConfig,
          url: expandStr(urlConfig.url),
          headers: urlConfig.headers ? hw(urlConfig.headers, expandStr) : void 0
        };
        break;
      }
    case "sse-ide":
    case "ws-ide":
      expandedConfig = serverConfig;
      break;
    case "sdk":
      expandedConfig = serverConfig;
      break;
    case "claudeai-proxy":
      expandedConfig = serverConfig;
      break;
  }
  return {
    expanded: expandedConfig,
    missingVars: fs(missingVarsList)
  };
}

/** Adds (or validates and stores) an MCP server config into the specified scope. */
async function addMcpConfig(serverName: any, serverConfig: any, scope: any) {
  if (serverName.match(/[^a-zA-Z0-9_-]/)) throw Error(`Invalid name ${serverName}. Names can only contain letters, numbers, hyphens, and underscores.`);
  if (isClaudeInChromeMCPServer(serverName)) throw Error(`Cannot add MCP server "${serverName}": this name is reserved.`);
  if (uve(serverName)) throw Error(`Cannot add MCP server "${serverName}": this name is reserved.`);
  if (serverName === iKe) throw Error(`Cannot add MCP server "${serverName}": this name is reserved.`);
  if (doesEnterpriseMcpConfigExist()) throw Error("Cannot add MCP server: enterprise MCP configuration is active and has exclusive control over MCP servers");
  let parseResult = boe().safeParse(serverConfig);
  if (!parseResult.success) {
    let issuesSummary = parseResult.error.issues.map((issue: any) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
    throw Error(`Invalid configuration: ${issuesSummary}`);
  }
  let parsedConfig = parseResult.data;
  if (isMcpServerDenied(serverName, parsedConfig)) throw Error(`Cannot add MCP server "${serverName}": server is explicitly blocked by enterprise policy`);
  if (!isMcpServerAllowedByPolicy(serverName, parsedConfig)) throw Error(`Cannot add MCP server "${serverName}": not allowed by enterprise policy`);
  switch (scope) {
    case "project":
      {
        let existingServers = await readRawMcpJsonServersFromCwd();
        if (Object.hasOwn(existingServers, serverName)) throw Error(`MCP server ${serverName} already exists in .mcp.json`);
        break;
      }
    case "user":
      {
        if (getGlobalConfig().mcpServers?.[serverName]) throw Error(`MCP server ${serverName} already exists in user config`);
        break;
      }
    case "local":
      {
        if (getCurrentProjectConfig().mcpServers?.[serverName]) throw Error(`MCP server ${serverName} already exists in local config`);
        break;
      }
    case "dynamic":
      throw Error("Cannot add MCP server to scope: dynamic");
    case "enterprise":
      throw Error("Cannot add MCP server to scope: enterprise");
    case "claudeai":
      throw Error("Cannot add MCP server to scope: claudeai");
  }
  switch (scope) {
    case "project":
      {
        let existingServers = await readRawMcpJsonServersFromCwd();
        existingServers[serverName] = parsedConfig;
        try {
          await yQi({
            mcpServers: existingServers
          });
        } catch (writeErr) {
          throw Oe("mcp_config_add", "mcp_config_write_failed"), Error(`Failed to write to .mcp.json: ${writeErr}`);
        }
        break;
      }
    case "user":
      {
        saveGlobalConfig((cfg: any) => ({
          ...cfg,
          mcpServers: {
            ...cfg.mcpServers,
            [serverName]: parsedConfig
          }
        }));
        break;
      }
    case "local":
      {
        saveCurrentProjectConfig((cfg: any) => ({
          ...cfg,
          mcpServers: {
            ...cfg.mcpServers,
            [serverName]: parsedConfig
          }
        }));
        break;
      }
    default:
      throw Error(`Cannot add MCP server to scope: ${scope}`);
  }
  Ie("mcp_config_add");
}

/** Removes an MCP server config from the specified scope. */
async function removeMcpConfig(serverName: any, scope: any) {
  switch (scope) {
    case "project":
      {
        let existingServers = await readRawMcpJsonServersFromCwd();
        if (!Object.hasOwn(existingServers, serverName)) throw Error(`No MCP server found with name: ${serverName} in .mcp.json`);
        delete existingServers[serverName];
        try {
          await yQi({
            mcpServers: existingServers
          });
        } catch (writeErr) {
          throw Oe("mcp_config_remove", "mcp_config_write_failed"), Error(`Failed to remove from .mcp.json: ${writeErr}`);
        }
        break;
      }
    case "user":
      {
        if (!getGlobalConfig().mcpServers?.[serverName]) throw Error(`No user-scoped MCP server found with name: ${serverName}`);
        saveGlobalConfig((cfg: any) => {
          let {
            [serverName]: removed,
            ...rest
          } = cfg.mcpServers ?? {};
          return {
            ...cfg,
            mcpServers: rest
          };
        });
        break;
      }
    case "local":
      {
        if (!getCurrentProjectConfig().mcpServers?.[serverName]) throw Error(`No project-local MCP server found with name: ${serverName}`);
        saveCurrentProjectConfig((cfg: any) => {
          let {
            [serverName]: removed,
            ...rest
          } = cfg.mcpServers ?? {};
          return {
            ...cfg,
            mcpServers: rest
          };
        });
        break;
      }
    default:
      throw Error(`Cannot remove MCP server from scope: ${scope}`);
  }
  Ie("mcp_config_remove");
}

/** Reads and returns the raw mcpServers object from the nearest .mcp.json file in the cwd. */
async function readRawMcpJsonServersFromCwd() {
  let mcpJsonPath = vhe.join(Pt(), ".mcp.json"),
    fileContents;
  try {
    fileContents = await Gz.readFile(mcpJsonPath, "utf8");
  } catch (readErr) {
    if (dn(readErr) === "ENOENT") return {};
    throw readErr;
  }
  if (!fileContents.trim()) return {};
  let parseResult = E.object({
    mcpServers: E.record(E.string(), E.unknown()).default({})
  }).safeParse(Fa(fileContents));
  if (!parseResult.success) throw Error(".mcp.json is malformed (not valid JSON, or mcpServers is not an object)");
  return parseResult.data.mcpServers;
}

/** Returns all MCP server configs for a given scope, optionally expanding environment variables. */
function getMcpConfigsByScope(scope: any, {
  expandVars = !0
} = {}) {
  if (getIsRemoteMode()) return {
    servers: {},
    errors: []
  };
  let scopeToSettingsKey = {
    project: "projectSettings",
    user: "userSettings",
    local: "localSettings"
  };
  if (scope in scopeToSettingsKey && !xh(scopeToSettingsKey[scope])) return {
    servers: {},
    errors: []
  };
  switch (scope) {
    case "project":
      {
        let resultServers = {},
          resultErrors = [],
          ancestorDirs = [],
          cwdPath = getOriginalCwd();
        while (cwdPath !== vhe.parse(cwdPath).root) ancestorDirs.push(cwdPath), cwdPath = vhe.dirname(cwdPath);
        for (let dirPath of ancestorDirs.reverse()) {
          let mcpFilePath = vhe.join(dirPath, ".mcp.json"),
            {
              config: dirConfig,
              errors: dirErrors
            } = parseMcpConfigFromFilePath({
              filePath: mcpFilePath,
              expandVars,
              scope: "project"
            });
          if (!dirConfig) {
            let nonNotFoundErrors = dirErrors.filter((errItem: any) => !errItem.message.startsWith("MCP config file not found"));
            if (nonNotFoundErrors.length > 0) logForDebugging(`MCP config errors for ${mcpFilePath}: ${Le(nonNotFoundErrors.map((errItem: any) => errItem.message))}`, {
              level: "error"
            }), resultErrors.push(...nonNotFoundErrors);
            continue;
          }
          if (dirConfig.mcpServers) Object.assign(resultServers, Nkn(dirConfig.mcpServers, scope));
          if (dirErrors.length > 0) resultErrors.push(...dirErrors);
        }
        return {
          servers: resultServers,
          errors: resultErrors
        };
      }
    case "user":
      {
        let userServers = getGlobalConfig().mcpServers;
        if (!userServers) return {
          servers: {},
          errors: []
        };
        let {
          config: userConfig,
          errors: userErrors
        } = parseMcpConfig({
          configObject: {
            mcpServers: userServers
          },
          expandVars,
          scope: "user"
        });
        return {
          servers: Nkn(userConfig?.mcpServers, scope),
          errors: userErrors
        };
      }
    case "local":
      {
        let localServers = getCurrentProjectConfig().mcpServers;
        if (!localServers) return {
          servers: {},
          errors: []
        };
        let {
          config: localConfig,
          errors: localErrors
        } = parseMcpConfig({
          configObject: {
            mcpServers: localServers
          },
          expandVars,
          scope: "local"
        });
        return {
          servers: Nkn(localConfig?.mcpServers, scope),
          errors: localErrors
        };
      }
    case "enterprise":
      {
        let enterpriseFilePath = getEnterpriseMcpFilePath(),
          {
            config: enterpriseConfig,
            errors: enterpriseErrors
          } = parseMcpConfigFromFilePath({
            filePath: enterpriseFilePath,
            expandVars,
            scope: "enterprise"
          });
        if (!enterpriseConfig) {
          let nonNotFoundErrors = enterpriseErrors.filter((errItem: any) => !errItem.message.startsWith("MCP config file not found"));
          if (nonNotFoundErrors.length > 0) return logForDebugging(`Enterprise MCP config errors for ${enterpriseFilePath}: ${Le(nonNotFoundErrors.map((errItem: any) => errItem.message))}`, {
            level: "error"
          }), {
            servers: {},
            errors: nonNotFoundErrors
          };
          return {
            servers: {},
            errors: []
          };
        }
        return {
          servers: Nkn(enterpriseConfig.mcpServers, scope),
          errors: enterpriseErrors
        };
      }
  }
}

/** Returns the MCP server config for a given name by searching scopes in priority order. */
function getMcpConfigByName(serverName: any) {
  let {
    servers: enterpriseServers
  } = getMcpConfigsByScope("enterprise");
  if (iS("mcp")) return enterpriseServers[serverName] ?? null;
  let {
      servers: userServers
    } = getMcpConfigsByScope("user"),
    {
      servers: projectServers
    } = getMcpConfigsByScope("project"),
    {
      servers: localServers
    } = getMcpConfigsByScope("local");
  if (enterpriseServers[serverName]) return enterpriseServers[serverName];
  if (localServers[serverName]) return localServers[serverName];
  if (projectServers[serverName] && L$e(serverName) === "approved") return projectServers[serverName];
  if (userServers[serverName]) return userServers[serverName];
  return null;
}

/**
 * Returns all MCP server configs available to Claude Code (merging all scopes,
 * running dedup against plugin servers, applying policy filters).
 */
async function getClaudeCodeMcpConfigs(extraServers: any = {}, options: any = {}) {
  if (hc("mcpAutoDiscovered")) return {
    servers: {},
    pendingProjectServers: new Set(),
    errors: [],
    warnings: []
  };
  let {
    servers: enterpriseServers
  } = getMcpConfigsByScope("enterprise");
  if (doesEnterpriseMcpConfigExist()) {
    let filteredEnterprise = {};
    for (let [serverName, serverConfig] of Object.entries(enterpriseServers)) {
      if (!isMcpServerAllowedByPolicy(serverName, serverConfig)) continue;
      filteredEnterprise[serverName] = serverConfig;
    }
    return {
      servers: filteredEnterprise,
      pendingProjectServers: new Set(),
      errors: [],
      warnings: []
    };
  }
  let isMcpRestricted = iS("mcp"),
    emptyResult = {
      servers: {}
    },
    {
      servers: userServers
    } = isMcpRestricted ? emptyResult : getMcpConfigsByScope("user"),
    {
      servers: projectServers
    } = isMcpRestricted ? emptyResult : getMcpConfigsByScope("project"),
    {
      servers: localServers
    } = isMcpRestricted ? emptyResult : getMcpConfigsByScope("local"),
    claudeAiServers = isMcpRestricted ? {} : Nhn(),
    pluginServerMap = {},
    pluginLoadResult = options.pluginLoadResult ?? (await loadAllPluginsCacheOnly()),
    pluginErrors = [],
    pluginWarnings = [];
  if (pluginLoadResult.errors.length > 0) for (let pluginErr of pluginLoadResult.errors) if (pluginErr.type === "mcp-config-invalid" || pluginErr.type === "mcpb-download-failed" || pluginErr.type === "mcpb-extract-failed" || pluginErr.type === "mcpb-invalid-manifest") {
    let errMsg = `Plugin MCP loading error - ${pluginErr.type}: ${TT(pluginErr)}`;
    logForDebugging(errMsg, {
      level: "error"
    });
  } else {
    let errType = pluginErr.type;
    logForDebugging(`Plugin not available for MCP: ${pluginErr.source} - error type: ${errType}`);
  }
  let pendingProjectServers = new Set(),
    scopeCheckFn = options.includePendingProjectServers ? Nrt : L$e,
    pluginResults = await Promise.all(pluginLoadResult.enabled.map(async (plugin: any) => {
      let pluginServers = await Hkn(plugin, pluginErrors);
      if (!pluginServers || !Net(plugin)) return pluginServers;
      return sv(pluginServers, (serverConfig: any, serverName: any) => {
        let approvalStatus = scopeCheckFn(serverName);
        if (approvalStatus === "approved") return !0;
        if (approvalStatus === "pending" && options.includePendingProjectServers) return pendingProjectServers.add(serverName), !0;
        return !1;
      });
    }));
  for (let pluginResult of pluginResults) if (pluginResult) Object.assign(pluginServerMap, pluginResult);
  if (pluginErrors.length > 0) for (let pluginErr of pluginErrors) {
    let errMsg = `Plugin MCP server error - ${pluginErr.type}: ${TT(pluginErr)}`;
    logForDebugging(errMsg, {
      level: "error"
    });
  }
  let approvedProjectServers = {};
  for (let [serverName, serverConfig] of Object.entries(projectServers)) {
    let approvalStatus = scopeCheckFn(serverName);
    if (approvalStatus === "approved") approvedProjectServers[serverName] = serverConfig;else if (approvalStatus === "pending" && options.includePendingProjectServers && !localServers[serverName] && !userServers[serverName] && !claudeAiServers[serverName]) approvedProjectServers[serverName] = serverConfig, pendingProjectServers.add(serverName);
  }
  let manualServers = {};
  for (let [serverName, serverConfig] of Object.entries({
    ...claudeAiServers,
    ...userServers,
    ...approvedProjectServers,
    ...localServers,
    ...extraServers
  })) if (!isMcpServerDisabled(serverName) && !pendingProjectServers.has(serverName) && isMcpServerAllowedByPolicy(serverName, serverConfig)) manualServers[serverName] = serverConfig;
  let allowedPluginServers = {},
    blockedPluginServers = {};
  for (let [serverName, serverConfig] of Object.entries(pluginServerMap)) if (isMcpServerDisabled(serverName) || !isMcpServerAllowedByPolicy(serverName, serverConfig)) blockedPluginServers[serverName] = serverConfig;else allowedPluginServers[serverName] = serverConfig;
  let {
    servers: dedupedPluginServers,
    suppressed: suppressedPlugins
  } = dedupPluginMcpServers(allowedPluginServers, manualServers);
  Object.assign(dedupedPluginServers, blockedPluginServers);
  for (let {
    name: pluginName,
    duplicateOf: duplicateOfName
  } of suppressedPlugins) {
    let nameParts = pluginName.split(":");
    if (nameParts[0] !== "plugin" || nameParts.length < 3) continue;
    pluginWarnings.push({
      type: "mcp-server-suppressed-duplicate",
      source: pluginName,
      plugin: nameParts[1],
      serverName: nameParts.slice(2).join(":"),
      duplicateOf: duplicateOfName
    });
  }
  let mergedServers = Object.assign({}, claudeAiServers, dedupedPluginServers, userServers, approvedProjectServers, localServers),
    finalServers = {};
  for (let [serverName, serverConfig] of Object.entries(mergedServers)) {
    if (!isMcpServerAllowedByPolicy(serverName, serverConfig)) continue;
    finalServers[serverName] = serverConfig;
  }
  for (let serverName of pendingProjectServers) {
    let scopeVal = finalServers[serverName]?.scope;
    if (scopeVal !== "project" && scopeVal !== "dynamic") pendingProjectServers.delete(serverName);
  }
  return {
    servers: finalServers,
    pendingProjectServers,
    errors: pluginErrors,
    warnings: pluginWarnings
  };
}

/**
 * Returns all MCP configs (both Claude Code and Claude.ai connectors),
 * unless enterprise lockdown requires skipping the Claude.ai fetch.
 */
async function getAllMcpConfigs(options: any = {}) {
  if (shouldSkipClaudeAiFetchForEnterpriseLockdown()) return getClaudeCodeMcpConfigs({}, options);
  let claudeAiServerPromise = jxe(),
    {
      servers: claudeCodeServers,
      pendingProjectServers,
      errors,
      warnings
    } = await getClaudeCodeMcpConfigs({}, options),
    {
      allowed: allowedClaudeAiServers
    } = filterMcpServersByPolicy(await claudeAiServerPromise);
  Lkn();
  let filteredClaudeCodeServers = options.includePendingProjectServers ? sv(claudeCodeServers, (serverConfig: any, serverName: any) => !pendingProjectServers.has(serverName)) : claudeCodeServers,
    {
      servers: dedupedClaudeAiServers
    } = await dedupClaudeAiMcpServers(allowedClaudeAiServers, filteredClaudeCodeServers);
  return {
    servers: Object.assign({}, dedupedClaudeAiServers, claudeCodeServers),
    pendingProjectServers,
    errors,
    warnings
  };
}

/** Returns the set of plugin-sourced MCP server names that are currently connectable. */
async function getConnectablePluginMcpServerNames(options: any = {}) {
  if (getStrictMcpConfig()) return new Set();
  let pluginLoadResult = await loadAllPluginsForPreview(),
    {
      servers: mcpServers
    } = await getClaudeCodeMcpConfigs(options, {
      pluginLoadResult
    }),
    connectableNames = new Set();
  for (let [serverName, serverConfig] of Object.entries(mcpServers)) if (serverConfig.pluginSource !== void 0) connectableNames.add(serverName);
  return connectableNames;
}

/** Parses an MCP config object (already parsed JSON) and validates each server entry via zod schemas. */
function parseMcpConfig(parseArgs: any) {
  let {
      configObject,
      expandVars: expandVars,
      scope,
      filePath
    } = parseArgs,
    zodResult = E.object({
      mcpServers: E.record(E.string(), E.unknown())
    }).safeParse(configObject);
  if (!zodResult.success) {
    let hasServersKey = configObject !== null && typeof configObject === "object" && "servers" in configObject && !("mcpServers" in configObject);
    return {
      config: null,
      errors: zodResult.error.issues.map((issue: any) => ({
        ...(filePath && {
          file: filePath
        }),
        path: issue.path.join("."),
        message: hasServersKey ? 'Missing "mcpServers" — found "servers" instead. Claude Code reads MCP servers from the "mcpServers" key.' : issue.message,
        ...(hasServersKey && {
          suggestion: `Rename the top-level "servers" key to "mcpServers" in ${filePath ?? "your MCP config"}.`
        }),
        mcpErrorMetadata: {
          scope,
          severity: "fatal"
        }
      }))
    };
  }
  let parseErrors = [],
    parsedServers = {};
  function addError(serverName: any, message: any, suggestion: any) {
    parseErrors.push({
      ...(filePath && {
        file: filePath
      }),
      path: `mcpServers.${serverName}`,
      message,
      ...(suggestion && {
        suggestion
      }),
      mcpErrorMetadata: {
        scope,
        serverName,
        severity: "warning"
      }
    });
  }
  for (let [serverName, serverEntry] of Object.entries(zodResult.data.mcpServers)) {
    let serverType = serverEntry && typeof serverEntry === "object" && "type" in serverEntry && typeof serverEntry.type === "string" ? serverEntry.type : "stdio",
      schemaFactory = Object.hasOwn(gQi, serverType) ? gQi[serverType] : void 0;
    if (!schemaFactory) {
      addError(serverName, `Skipped — unknown MCP server type "${serverType}" for server "${serverName}"`, "Valid types are: stdio, sse, http (or streamable-http), ws, sdk");
      continue;
    }
    let zodServerResult = schemaFactory().safeParse(serverEntry);
    if (!zodServerResult.success) {
      let issuesSummary = zodServerResult.error.issues.map((issue: any) => {
        let cleanMsg = issue.message.replace(/^Invalid input: /, "");
        return `${issue.path.join(".") || "(root)"}: ${cleanMsg}`;
      }).join("; ");
      addError(serverName, `Skipped — invalid MCP server config for "${serverName}": ${issuesSummary}`);
      continue;
    }
    let validatedConfig = zodServerResult.data;
    if (Pet(serverName) && validatedConfig.type !== "sdk") {
      addError(serverName, `"${serverName}" is a reserved MCP server name and was not loaded`, `Rename this server in your MCP config — "${serverName}" is reserved for internal use`);
      continue;
    }
    let finalConfig = validatedConfig;
    if (expandVars) {
      let {
        expanded: expandedConfig,
        missingVars: missingVarNames
      } = z2d(validatedConfig);
      if (missingVarNames.length > 0) addError(serverName, `Missing environment variables: ${missingVarNames.join(", ")}`, `Set the following environment variables: ${missingVarNames.join(", ")}`);
      finalConfig = expandedConfig;
    }
    parsedServers[serverName] = finalConfig;
  }
  return {
    config: {
      mcpServers: parsedServers
    },
    errors: parseErrors
  };
}

/** Reads and parses an MCP config JSON file from disk, returning parsed config or structured errors. */
function parseMcpConfigFromFilePath(parseArgs: any) {
  let {
      filePath,
      expandVars: expandVars,
      scope
    } = parseArgs,
    fsModule = jt(),
    fileContents;
  try {
    fileContents = fsModule.readFileSync(filePath, {
      encoding: "utf8"
    });
  } catch (readErr) {
    if (dn(readErr) === "ENOENT") return {
      config: null,
      errors: [{
        file: filePath,
        path: "",
        message: `MCP config file not found: ${filePath}`,
        suggestion: "Check that the file path is correct",
        mcpErrorMetadata: {
          scope,
          severity: "fatal"
        }
      }]
    };
    return logForDebugging(`MCP config read error for ${filePath} (scope=${scope}): ${readErr}`, {
      level: "error"
    }), Oe("mcp_config_parse", "mcp_config_read_failed"), {
      config: null,
      errors: [{
        file: filePath,
        path: "",
        message: `Failed to read file: ${readErr}`,
        suggestion: "Check file permissions and ensure the file exists",
        mcpErrorMetadata: {
          scope,
          severity: "fatal"
        }
      }]
    };
  }
  let parsedJson = Fa(fileContents);
  if (!parsedJson) return logForDebugging(`MCP config is not valid JSON: ${filePath} (scope=${scope}, length=${fileContents.length}, first100=${Le(fileContents.slice(0, 100))})`, {
    level: "error"
  }), Oe("mcp_config_parse", "mcp_config_invalid_json"), {
    config: null,
    errors: [{
      file: filePath,
      path: "",
      message: "MCP config is not a valid JSON",
      suggestion: "Fix the JSON syntax errors in the file",
      mcpErrorMetadata: {
        scope,
        severity: "fatal"
      }
    }]
  };
  return Ie("mcp_config_parse"), parseMcpConfig({
    configObject: parsedJson,
    expandVars,
    scope,
    filePath
  });
}

/** Returns true if the enterprise MCP config exists AND no policy tier allows all Claude.ai MCPs. */
function shouldSkipClaudeAiFetchForEnterpriseLockdown() {
  if (!doesEnterpriseMcpConfigExist()) return !1;
  if (getAllPolicyTierSettings().some((tier: any) => tier.allowAllClaudeAiMcps === !0)) return !1;
  return !0;
}

/** Returns true if enterprise policy requires that only managed MCP servers are allowed. */
function shouldAllowManagedMcpServersOnly() {
  return getSettingsForSource("policySettings")?.allowManagedMcpServersOnly === !0;
}

/** Returns true if ALL provided MCP configs are the claude-vscode SDK server (the only allowed type with enterprise config). */
function areMcpConfigsAllowedWithEnterpriseMcpConfig(mcpConfigs: any) {
  return Object.values(mcpConfigs).every((cfg: any) => cfg.type === "sdk" && cfg.name === "claude-vscode");
}

/** Returns true if the given server name is the special _K (computer-use) built-in server. */
function S7r(serverName: any) {
  return serverName === _K;
}

/** Returns true if the given MCP server is currently disabled in the project config. */
function isMcpServerDisabled(serverName: any) {
  let projectConfig = getCurrentProjectConfig();
  if (S7r(serverName)) return !(projectConfig.enabledMcpServers || []).includes(serverName);
  return (projectConfig.disabledMcpServers || []).includes(serverName);
}

/** Adds or removes an item from an array based on the desired inclusion flag, returning the same reference if unchanged. */
function _Qi(arr: any, item: any, shouldInclude: any) {
  if (arr.includes(item) === shouldInclude) return arr;
  return shouldInclude ? [...arr, item] : arr.filter((el: any) => el !== item);
}

/** Enables or disables a named MCP server in the project config, emitting a telemetry event for built-in toggles. */
function setMcpServerEnabled(serverName: any, enabled: any) {
  let isBuiltinToggle = S7r(serverName) && isMcpServerDisabled(serverName) === enabled;
  if (saveCurrentProjectConfig((cfg: any) => {
    if (S7r(serverName)) {
      let enabledList = cfg.enabledMcpServers || [],
        updatedList = _Qi(enabledList, serverName, enabled);
      if (updatedList === enabledList) return cfg;
      return {
        ...cfg,
        enabledMcpServers: updatedList
      };
    }
    let disabledList = cfg.disabledMcpServers || [],
      updatedList = _Qi(disabledList, serverName, !enabled);
    if (updatedList === disabledList) return cfg;
    return {
      ...cfg,
      disabledMcpServers: updatedList
    };
  }), isBuiltinToggle) logEvent("tengu_builtin_mcp_toggle", {
    serverName,
    enabled: enabled
  });
  Ie("mcp_server_toggle");
}

/** Lazy-initialized module-level variables (fs/promises, path, CCR ingress URL, env filter set, etc.). */
var Gz, vhe, SQi, j2d, K2d, MCP_SETTINGS_SCOPES, gQi, doesEnterpriseMcpConfigExist;
var px = b(() => {
  roe();
  ta();
  Epe();
  Xr();
  lt();
  N5();
  oL();
  wfe();
  Qn();
  Iy();
  Go();
  qe();
  bt();
  ws();
  Pd();
  Sw();
  qxe();
  sh();
  gg();
  mf();
  h7();
  RK();
  yr();
  J3();
  Xt();
  h7r();
  ln();
  Ct();
  sve();
  Iee();
  jkt();
  qEn();
  bbe();
  CL();
  Gz = require("fs/promises"), vhe = require("path");
  SQi = process.env.SESSION_INGRESS_URL ?? process.env.ANTHROPIC_BASE_URL;
  j2d = new Set(A7r);
  K2d = new Set(["dynamic", "agent", "claudeai"]);
  MCP_SETTINGS_SCOPES = ["enterprise", "local", "user", "project"];
  gQi = {
    stdio: yEt,
    sse: zAr,
    http: pnn,
    "streamable-http": pnn,
    ws: YAr,
    sdk: JAr,
    "claudeai-proxy": XAr
  };
  doesEnterpriseMcpConfigExist = wn(() => {
    let {
      config: enterpriseConfig
    } = parseMcpConfigFromFilePath({
      filePath: getEnterpriseMcpFilePath(),
      expandVars: !0,
      scope: "enterprise"
    });
    return enterpriseConfig !== null;
  });
});
export {CQi,getEnterpriseMcpFilePath,Nkn,yQi,Bkn,TQi,Wxe,Fkn,_resetCcrIngressBaseForTesting,isCcrProxyUrl,unwrapCcrProxyUrl,getMcpServerSignature,dedupPluginMcpServers,W2d,getMcpScopeConflicts,suppressedConnectorsEqual,dedupClaudeAiMcpServers,G2d,V2d,isMcpServerDenied,isMcpServerAllowedByPolicy,isBuiltinInProcessMcpServer,filterMcpServersByPolicy,isMcpServerBlockedAtConnectTime,filterDynamicMcpServersByPolicy,z2d,addMcpConfig,removeMcpConfig,readRawMcpJsonServersFromCwd,getMcpConfigsByScope,getMcpConfigByName,getClaudeCodeMcpConfigs,getAllMcpConfigs,getConnectablePluginMcpServerNames,parseMcpConfig,parseMcpConfigFromFilePath,shouldSkipClaudeAiFetchForEnterpriseLockdown,shouldAllowManagedMcpServersOnly,areMcpConfigsAllowedWithEnterpriseMcpConfig,S7r,isMcpServerDisabled,_Qi,setMcpServerEnabled,Gz,vhe,SQi,j2d,K2d,MCP_SETTINGS_SCOPES,gQi,doesEnterpriseMcpConfigExist,px};
