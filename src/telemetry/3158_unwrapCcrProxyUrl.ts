// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {Fv,qK} from "../../vendor/m709.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {cn,Ct} from "../../vendor/m197.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {hee} from "../api/3029_expanded.ts";
import {z2r,eet} from "../../vendor/m2198.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {t_,fT,Q8} from "../../vendor/m2594.ts";
import {mTn,hTn,Fli,vfe} from "../../vendor/m2048.ts";
import {getSettingsForSource as An,getInitialSettings as Fr,hasDisableClaudeAiConnectors as rNe,getAllPolicyTierSettings as Jpe,br} from "../config/0745_updateSettingsForSource.ts";
import {sYe,psn,msn,h3} from "../artifact/0736_allow.ts";
import {ONt,XJr} from "../../vendor/m3152.ts";
import {isClaudeInChromeMCPServer as Nhe,bO} from "../mcp/2592_trackClaudeInChromeTabId.ts";
import {KRe,q7,Mfe} from "../computer-use/2198_iTerm_app.ts";
import {CR,toe} from "../../vendor/m450.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {oYe,gA} from "../mcp/0733_serverName.ts";
import {Soe,oCe,KRt,ASr,jon,RSr,vSr,wSr} from "../../vendor/m729.ts";
import {getGlobalConfig as Ot,getCurrentProjectConfig as eh,saveGlobalConfig as hn,saveCurrentProjectConfig as TE,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {xe,He,mn} from "./0600_feature_name.ts";
import {C} from "../../vendor/m321.ts";
import {ba,pd} from "../../vendor/m706.ts";
import {getIsRemoteMode as la,getOriginalCwd as gr,getStrictMcpConfig as Pbe,lt} from "../session/0132_sent.ts";
import {xh,wm} from "../../vendor/m707.ts";
import {JS,ez} from "../../vendor/m2239.ts";
import {B9e,BNt,qO} from "../mcp/3159_scope.ts";
import {buildMcpToolName as Vl,ky} from "../agent/2238_explicitlyRequested.ts";
import {gTn,gxt} from "../api/2050_type.ts";
import {loadAllPluginsCacheOnly as np,loadAllPluginsForPreview as lXr,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {Txn,IHe,JJr} from "../config/3152_i.ts";
import {qnt,oh} from "../../vendor/m2600.ts";
import {dA,xpe} from "../../vendor/m436.ts";
import {xHe,Axn,wW} from "../api/3157_claudeAiMcpEverConnected.ts";
import {Fnt,Dvn} from "../../vendor/m2592.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Qr} from "../../vendor/m323.ts";
/** Module namespace object, populated by the module registration call below. */
var gsa = {};
ft(gsa, {
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
  MCP_SETTINGS_SCOPES: () => MCP_SETTINGS_SCOPES
});

/** Returns the path to the enterprise-managed MCP JSON file. */
function getEnterpriseMcpFilePath() {
  return Nge.join(Fv(), "managed-mcp.json");
}

/** Creates a null-prototype object to use as an MCP server map. */
function aB() {
  return Object.create(null);
}

/** Annotates every server entry in a server map with the given scope string. */
function vxn(serverMap: any, scope: any) {
  let result = aB();
  if (serverMap) for (let [serverName, serverConfig] of Object.entries(serverMap)) result[serverName] = {
    ...serverConfig,
    scope
  };
  return result;
}

/** Atomically writes the .mcp.json config file in the project root using a tmp-rename pattern. */
async function psa(configObject: any) {
  let mcpJsonPath = Nge.join(Lt(), ".mcp.json"),
    existingMode;
  try {
    existingMode = (await bj.stat(mcpJsonPath)).mode;
  } catch (err) {
    if (cn(err) !== "ENOENT") throw err;
  }
  let tmpPath = `${mcpJsonPath}.tmp.${process.pid}.${Date.now()}`,
    fileHandle = await bj.open(tmpPath, "w", existingMode ?? 420);
  try {
    await fileHandle.writeFile(Pe(configObject, null, 2), {
      encoding: "utf8"
    }), await fileHandle.datasync();
  } finally {
    await fileHandle.close();
  }
  try {
    if (existingMode !== void 0) await bj.chmod(tmpPath, existingMode);
    await bj.rename(tmpPath, mcpJsonPath);
  } catch (err) {
    try {
      await bj.unlink(tmpPath);
    } catch {}
    throw err;
  }
}

/** Extracts command + args array for a stdio-type server config, or returns null. */
function wxn(serverConfig: any) {
  if (serverConfig.type !== void 0 && serverConfig.type !== "stdio") return null;
  let stdioConfig = serverConfig;
  return [stdioConfig.command, ...(stdioConfig.args ?? [])];
}

/** Returns true if two string arrays are equal element-by-element. */
function msa(arrayA: any, arrayB: any) {
  if (arrayA.length !== arrayB.length) return !1;
  return arrayA.every((item: any, index: any) => item === arrayB[index]);
}

/** Expands environment variable references in a string using the hee helper. */
function PHe(value: any) {
  return hee(value).expanded;
}

/** Returns the URL string for a URL-based server config, or null if not applicable. */
function kxn(serverConfig: any) {
  return "url" in serverConfig ? serverConfig.url : null;
}

/**
 * If the URL is a CCR proxy URL, extracts the underlying MCP server URL
 * from the `mcp_url` query parameter. Returns the original URL unchanged if not a proxy URL.
 */
function unwrapCcrProxyUrl(url: any) {
  if (!z2r.some((pathSegment: any) => url.includes(pathSegment))) return url;
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
  let cmdArray = wxn(serverConfig);
  if (cmdArray) {
    if (options?.includeEnv === !1) return `stdio:${Pe(cmdArray)}`;
    let envEntries = Object.entries(serverConfig.env ?? {}).filter(([key]: any) => !CVd.has(key)).sort(([keyA]: any, [keyB]: any) => keyA < keyB ? -1 : keyA > keyB ? 1 : 0),
      envSuffix = envEntries.length > 0 ? `:${Pe(Object.fromEntries(envEntries))}` : "";
    return `stdio:${Pe(cmdArray)}${envSuffix}`;
  }
  let serverUrl = kxn(serverConfig);
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
      A(`Suppressing plugin MCP server "${pluginName}": duplicates manually-configured "${duplicatesManual}"`), suppressed.push({
        name: pluginName,
        duplicateOf: duplicatesManual
      });
      continue;
    }
    let earlierPlugin = seenPluginSigs.get(sig);
    if (earlierPlugin !== void 0) {
      A(`Suppressing plugin MCP server "${pluginName}": duplicates earlier plugin server "${earlierPlugin}"`), suppressed.push({
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
function AVd(serverConfig: any) {
  let urlVal = kxn(serverConfig);
  if (urlVal) return unwrapCcrProxyUrl(urlVal);
  let cmdArr = wxn(serverConfig);
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
      endpoint: AVd(serverConfig)
    });
  }
  let conflicts = [];
  for (let [serverName, entries] of serverNameToEntries) {
    if (entries.length < 2) continue;
    if (new Set(entries.map((entry: any) => entry.sig)).size < 2) continue;
    let removeCommands = entries.map((entry: any) => t_("mcp remove", serverName, `-s ${entry.scope}`)).filter((cmd: any) => cmd !== null);
    conflicts.push({
      path: `mcpServers.${serverName}`,
      message: `Server "${serverName}" is defined in multiple scopes with different endpoints: ${entries.map((entry: any) => `${entry.scope} (${entry.endpoint})`).join(", ")}. OAuth tokens are stored per endpoint, so authenticating in one context will not carry over.`,
      severity: "warning",
      suggestion: removeCommands.length > 0 ? `Keep the correct endpoint and remove the others: ${removeCommands.map((cmd: any) => `\`${cmd}\``).join(" or ")}` : "Keep the correct endpoint and remove the others from the scopes listed above.",
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
  let ccrConfig = await mTn(),
    sigToEntry = new Map();
  for (let [manualName, manualConfig] of Object.entries(manualServers)) {
    if (isMcpServerDisabled(manualName)) continue;
    if ((manualConfig.type === "sse" || manualConfig.type === "http") && (hTn(manualName, manualConfig, ccrConfig) || Fli(manualName, manualConfig, ccrConfig))) continue;
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
      A(`Suppressing claude.ai connector "${connectorName}": duplicates manually-configured "${duplicatesEntry.name}"`), suppressed.push({
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
function RVd() {
  if (shouldAllowManagedMcpServersOnly()) return An("policySettings") ?? {};
  return Fr();
}

/** Returns the initial settings, used as the source for "denied" MCP server rules. */
function vVd() {
  return Fr();
}

/** Returns true if the given MCP server (by name and/or config) is explicitly denied by enterprise policy. */
function isMcpServerDenied(serverName: any, serverConfig: any) {
  let settings = vVd();
  if (!settings.deniedMcpServers) return !1;
  for (let rule of settings.deniedMcpServers) if (sYe(rule) && rule.serverName === serverName) return !0;
  if (serverConfig) {
    let cmdArr = wxn(serverConfig);
    if (cmdArr) {
      let expandedCmd = cmdArr.map(PHe);
      for (let rule of settings.deniedMcpServers) if (psn(rule) && msa(rule.serverCommand.map(PHe), expandedCmd)) return !0;
    }
    let urlVal = kxn(serverConfig);
    if (urlVal) {
      let expandedUrl = PHe(urlVal);
      for (let rule of settings.deniedMcpServers) if (msn(rule) && ONt(expandedUrl, PHe(rule.serverUrl))) return !0;
    }
  }
  return !1;
}

/** Returns true if the given MCP server is allowed by enterprise policy (checks allowlist and denylist). */
function isMcpServerAllowedByPolicy(serverName: any, serverConfig: any) {
  if (isMcpServerDenied(serverName, serverConfig)) return !1;
  let settings = RVd();
  if (!settings.allowedMcpServers) return !0;
  if (settings.allowedMcpServers.length === 0) return !1;
  let hasCommandRule = settings.allowedMcpServers.some(psn),
    hasUrlRule = settings.allowedMcpServers.some(msn);
  if (serverConfig) {
    let cmdArr = wxn(serverConfig),
      urlVal = kxn(serverConfig);
    if (cmdArr) {
      if (hasCommandRule) {
        let expandedCmd = cmdArr.map(PHe);
        for (let rule of settings.allowedMcpServers) if (psn(rule) && msa(rule.serverCommand.map(PHe), expandedCmd)) return !0;
        return !1;
      } else {
        for (let rule of settings.allowedMcpServers) if (sYe(rule) && rule.serverName === serverName) return !0;
        return !1;
      }
    } else if (urlVal) {
      if (hasUrlRule) {
        let expandedUrl = PHe(urlVal);
        for (let rule of settings.allowedMcpServers) if (msn(rule) && ONt(expandedUrl, PHe(rule.serverUrl))) return !0;
        return !1;
      } else {
        for (let rule of settings.allowedMcpServers) if (sYe(rule) && rule.serverName === serverName) return !0;
        return !1;
      }
    } else {
      for (let rule of settings.allowedMcpServers) if (sYe(rule) && rule.serverName === serverName) return !0;
      return !1;
    }
  }
  for (let rule of settings.allowedMcpServers) if (sYe(rule) && rule.serverName === serverName) return !0;
  return !1;
}

/** Returns true if the server is a built-in in-process MCP server (Chrome extension or computer-use). */
function isBuiltinInProcessMcpServer(serverName: any) {
  return Nhe(serverName) || KRe(serverName);
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
  if (!wVd.has(serverConfig.scope)) return !1;
  if (serverConfig.scope === "claudeai" && rNe()) return !0;
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
function kVd(serverConfig: any) {
  let missingVarsList = [];
  function expandStr(strValue: any) {
    let {
      expanded,
      missingVars
    } = hee(strValue);
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
          env: stdioConfig.env ? CR(stdioConfig.env, expandStr) : void 0
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
          headers: urlConfig.headers ? CR(urlConfig.headers, expandStr) : void 0
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
    missingVars: os(missingVarsList)
  };
}

/** Adds (or validates and stores) an MCP server config into the specified scope. */
async function addMcpConfig(serverName: any, serverConfig: any, scope: any) {
  if (serverName.match(/[^a-zA-Z0-9_-]/)) throw Error(`Invalid name ${serverName}. Names can only contain letters, numbers, hyphens, and underscores.`);
  if (Nhe(serverName)) throw Error(`Cannot add MCP server "${serverName}": this name is reserved.`);
  if (KRe(serverName)) throw Error(`Cannot add MCP server "${serverName}": this name is reserved.`);
  if (serverName === oYe) throw Error(`Cannot add MCP server "${serverName}": this name is reserved.`);
  if (doesEnterpriseMcpConfigExist()) throw Error("Cannot add MCP server: enterprise MCP configuration is active and has exclusive control over MCP servers");
  let parseResult = Soe().safeParse(serverConfig);
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
        if (Ot().mcpServers?.[serverName]) throw Error(`MCP server ${serverName} already exists in user config`);
        break;
      }
    case "local":
      {
        if (eh().mcpServers?.[serverName]) throw Error(`MCP server ${serverName} already exists in local config`);
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
          await psa({
            mcpServers: existingServers
          });
        } catch (writeErr) {
          throw xe("mcp_config_add", "mcp_config_write_failed"), Error(`Failed to write to .mcp.json: ${writeErr}`);
        }
        break;
      }
    case "user":
      {
        hn((cfg: any) => ({
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
        TE((cfg: any) => ({
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
  He("mcp_config_add");
}

/** Removes an MCP server config from the specified scope. */
async function removeMcpConfig(serverName: any, scope: any) {
  switch (scope) {
    case "project":
      {
        let existingServers = await readRawMcpJsonServersFromCwd();
        if (!Object.hasOwn(existingServers, serverName)) throw Error(`No MCP server named "${serverName}" in .mcp.json`);
        delete existingServers[serverName];
        try {
          await psa({
            mcpServers: existingServers
          });
        } catch (writeErr) {
          throw xe("mcp_config_remove", "mcp_config_write_failed"), Error(`Failed to remove from .mcp.json: ${writeErr}`);
        }
        break;
      }
    case "user":
      {
        if (!Ot().mcpServers?.[serverName]) throw Error(`No MCP server named "${serverName}" in user scope`);
        hn((cfg: any) => {
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
        if (!eh().mcpServers?.[serverName]) throw Error(`No MCP server named "${serverName}" in local scope`);
        TE((cfg: any) => {
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
  He("mcp_config_remove");
}

/** Reads and returns the raw mcpServers object from the nearest .mcp.json file in the cwd. */
async function readRawMcpJsonServersFromCwd() {
  let mcpJsonPath = Nge.join(Lt(), ".mcp.json"),
    fileContents;
  try {
    fileContents = await bj.readFile(mcpJsonPath, "utf8");
  } catch (readErr) {
    if (cn(readErr) === "ENOENT") return {};
    throw readErr;
  }
  if (!fileContents.trim()) return {};
  let parseResult = C.object({
    mcpServers: C.record(C.string(), C.unknown()).default({})
  }).safeParse(ba(fileContents));
  if (!parseResult.success) throw Error(".mcp.json is malformed (not valid JSON, or mcpServers is not an object)");
  return parseResult.data.mcpServers;
}

/** Returns all MCP server configs for a given scope, optionally expanding environment variables. */
function getMcpConfigsByScope(scope: any, {
  expandVars = !0
} = {}) {
  if (la()) return {
    servers: aB(),
    errors: []
  };
  let scopeToSettingsKey = {
    project: "projectSettings",
    user: "userSettings",
    local: "localSettings"
  };
  if (scope in scopeToSettingsKey && !xh(scopeToSettingsKey[scope])) return {
    servers: aB(),
    errors: []
  };
  switch (scope) {
    case "project":
      {
        let resultServers = aB(),
          resultErrors = [],
          ancestorDirs = [],
          cwdPath = gr();
        while (cwdPath !== Nge.parse(cwdPath).root) ancestorDirs.push(cwdPath), cwdPath = Nge.dirname(cwdPath);
        for (let dirPath of ancestorDirs.reverse()) {
          let mcpFilePath = Nge.join(dirPath, ".mcp.json"),
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
            if (nonNotFoundErrors.length > 0) A(`MCP config errors for ${mcpFilePath}: ${Pe(nonNotFoundErrors.map((errItem: any) => errItem.message))}`, {
              level: "error"
            }), resultErrors.push(...nonNotFoundErrors);
            continue;
          }
          if (dirConfig.mcpServers) Object.assign(resultServers, vxn(dirConfig.mcpServers, scope));
          if (dirErrors.length > 0) resultErrors.push(...dirErrors);
        }
        return {
          servers: resultServers,
          errors: resultErrors
        };
      }
    case "user":
      {
        let userServers = Ot().mcpServers;
        if (!userServers) return {
          servers: aB(),
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
          servers: vxn(userConfig?.mcpServers, scope),
          errors: userErrors
        };
      }
    case "local":
      {
        let localServers = eh().mcpServers;
        if (!localServers) return {
          servers: aB(),
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
          servers: vxn(localConfig?.mcpServers, scope),
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
          if (nonNotFoundErrors.length > 0) return A(`Enterprise MCP config errors for ${enterpriseFilePath}: ${Pe(nonNotFoundErrors.map((errItem: any) => errItem.message))}`, {
            level: "error"
          }), {
            servers: aB(),
            errors: nonNotFoundErrors
          };
          return {
            servers: aB(),
            errors: []
          };
        }
        return {
          servers: vxn(enterpriseConfig.mcpServers, scope),
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
  if (JS("mcp")) return enterpriseServers[serverName] ?? null;
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
  if (projectServers[serverName] && B9e(serverName) === "approved") return projectServers[serverName];
  if (userServers[serverName]) return userServers[serverName];
  return null;
}

/**
 * Returns all MCP server configs available to Claude Code (merging all scopes,
 * running dedup against plugin servers, applying policy filters).
 */
async function getClaudeCodeMcpConfigs(extraServers: any = {}, options: any = {}) {
  if (Vl("mcpAutoDiscovered")) return {
    servers: aB(),
    pendingProjectServers: new Set(),
    rejectedProjectServers: new Set(),
    errors: [],
    warnings: []
  };
  let {
    servers: enterpriseServers
  } = getMcpConfigsByScope("enterprise");
  if (doesEnterpriseMcpConfigExist()) {
    let filteredEnterprise = aB();
    for (let [serverName, serverConfig] of Object.entries(enterpriseServers)) {
      if (!isMcpServerAllowedByPolicy(serverName, serverConfig)) continue;
      filteredEnterprise[serverName] = serverConfig;
    }
    return {
      servers: filteredEnterprise,
      pendingProjectServers: new Set(),
      rejectedProjectServers: new Set(),
      errors: [],
      warnings: []
    };
  }
  let isMcpRestricted = JS("mcp"),
    emptyResult = {
      servers: aB()
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
    claudeAiServers = isMcpRestricted ? aB() : gTn(),
    pluginServerMap = aB(),
    pluginLoadResult = options.pluginLoadResult ?? (await np()),
    pluginErrors = [],
    pluginWarnings = [];
  if (pluginLoadResult.errors.length > 0) for (let pluginErr of pluginLoadResult.errors) if (pluginErr.type === "mcp-config-invalid" || pluginErr.type === "mcpb-download-failed" || pluginErr.type === "mcpb-extract-failed" || pluginErr.type === "mcpb-invalid-manifest") {
    let errMsg = `Plugin MCP loading error - ${pluginErr.type}: ${fT(pluginErr)}`;
    A(errMsg, {
      level: "error"
    });
  } else {
    let errType = pluginErr.type;
    A(`Plugin not available for MCP: ${pluginErr.source} - error type: ${errType}`);
  }
  let pendingProjectServers = new Set(),
    rejectedProjectServers = new Set(),
    scopeCheckFn = options.includePendingProjectServers || options.includeRejectedProjectServers ? BNt : B9e,
    pluginResults = await Promise.all(pluginLoadResult.enabled.map(async (plugin: any) => {
      let pluginServers = await Txn(plugin, pluginErrors);
      if (!pluginServers || !qnt(plugin)) return pluginServers;
      return dA(pluginServers, (serverConfig: any, serverName: any) => {
        let approvalStatus = scopeCheckFn(serverName);
        if (approvalStatus === "approved") return !0;
        if (approvalStatus === "pending" && options.includePendingProjectServers) return pendingProjectServers.add(serverName), !0;
        if (approvalStatus === "rejected" && options.includeRejectedProjectServers) return rejectedProjectServers.add(serverName), !0;
        return !1;
      });
    }));
  for (let pluginResult of pluginResults) if (pluginResult) Object.assign(pluginServerMap, pluginResult);
  if (pluginErrors.length > 0) for (let pluginErr of pluginErrors) {
    let errMsg = `Plugin MCP server error - ${pluginErr.type}: ${fT(pluginErr)}`;
    A(errMsg, {
      level: "error"
    });
  }
  let approvedProjectServers = aB();
  for (let [serverName, serverConfig] of Object.entries(projectServers)) {
    let approvalStatus = scopeCheckFn(serverName);
    if (approvalStatus === "approved") {
      approvedProjectServers[serverName] = serverConfig;
      continue;
    }
    if (serverName in localServers || serverName in userServers || serverName in pluginServerMap || claudeAiServers[serverName]) continue;
    if (approvalStatus === "pending" && options.includePendingProjectServers) approvedProjectServers[serverName] = serverConfig, pendingProjectServers.add(serverName);else if (approvalStatus === "rejected" && options.includeRejectedProjectServers) approvedProjectServers[serverName] = serverConfig, rejectedProjectServers.add(serverName);
  }
  let manualServers = {};
  for (let [serverName, serverConfig] of Object.entries({
    ...claudeAiServers,
    ...userServers,
    ...approvedProjectServers,
    ...localServers,
    ...extraServers
  })) if (!isMcpServerDisabled(serverName) && !pendingProjectServers.has(serverName) && !rejectedProjectServers.has(serverName) && isMcpServerAllowedByPolicy(serverName, serverConfig)) manualServers[serverName] = serverConfig;
  let allowedPluginServers = {},
    blockedPluginServers = {};
  for (let [serverName, serverConfig] of Object.entries(pluginServerMap)) if (isMcpServerDisabled(serverName) || pendingProjectServers.has(serverName) || rejectedProjectServers.has(serverName) || !isMcpServerAllowedByPolicy(serverName, serverConfig)) blockedPluginServers[serverName] = serverConfig;else allowedPluginServers[serverName] = serverConfig;
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
    finalServers = aB();
  for (let [serverName, serverConfig] of Object.entries(mergedServers)) {
    if (!isMcpServerAllowedByPolicy(serverName, serverConfig)) continue;
    finalServers[serverName] = serverConfig;
  }
  for (let pendingOrRejectedSet of [pendingProjectServers, rejectedProjectServers]) for (let serverName of pendingOrRejectedSet) {
    let scopeVal = finalServers[serverName]?.scope;
    if (scopeVal !== "project" && scopeVal !== "dynamic") pendingOrRejectedSet.delete(serverName);
  }
  return {
    servers: finalServers,
    pendingProjectServers,
    rejectedProjectServers,
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
  let claudeAiServerPromise = xHe(),
    {
      servers: claudeCodeServers,
      pendingProjectServers,
      rejectedProjectServers,
      errors,
      warnings
    } = await getClaudeCodeMcpConfigs({}, options),
    {
      allowed: allowedClaudeAiServers
    } = filterMcpServersByPolicy(await claudeAiServerPromise);
  Axn();
  let filteredClaudeCodeServers = options.includePendingProjectServers || options.includeRejectedProjectServers ? dA(claudeCodeServers, (serverConfig: any, serverName: any) => !pendingProjectServers.has(serverName) && !rejectedProjectServers.has(serverName)) : claudeCodeServers,
    {
      servers: dedupedClaudeAiServers
    } = await dedupClaudeAiMcpServers(allowedClaudeAiServers, filteredClaudeCodeServers),
    mergedServers = Object.assign(aB(), dedupedClaudeAiServers, claudeCodeServers);
  for (let pendingOrRejectedSet of [pendingProjectServers, rejectedProjectServers]) for (let serverName of pendingOrRejectedSet) if (Object.hasOwn(dedupedClaudeAiServers, serverName)) mergedServers[serverName] = dedupedClaudeAiServers[serverName], pendingOrRejectedSet.delete(serverName);
  return {
    servers: mergedServers,
    pendingProjectServers,
    rejectedProjectServers,
    errors,
    warnings
  };
}

/** Returns the set of plugin-sourced MCP server names that are currently connectable. */
async function getConnectablePluginMcpServerNames(options: any = {}) {
  if (Pbe()) return new Set();
  let pluginLoadResult = await lXr(),
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
      expandVars,
      scope,
      filePath
    } = parseArgs,
    zodResult = C.object({
      mcpServers: C.record(C.string(), C.unknown())
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
      schemaFactory = Object.hasOwn(usa, serverType) ? usa[serverType] : void 0;
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
    if (Fnt(serverName) && validatedConfig.type !== "sdk") {
      addError(serverName, `"${serverName}" is a reserved MCP server name and was not loaded`, `Rename this server in your MCP config — "${serverName}" is reserved for internal use`);
      continue;
    }
    let finalConfig = validatedConfig;
    if (expandVars) {
      let {
        expanded: expandedConfig,
        missingVars: missingVarNames
      } = kVd(validatedConfig);
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
      expandVars,
      scope
    } = parseArgs,
    fsModule = Wt(),
    fileContents;
  try {
    fileContents = fsModule.readFileSync(filePath, {
      encoding: "utf8"
    });
  } catch (readErr) {
    if (cn(readErr) === "ENOENT") return {
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
    return A(`MCP config read error for ${filePath} (scope=${scope}): ${readErr}`, {
      level: "error"
    }), xe("mcp_config_parse", "mcp_config_read_failed"), {
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
  let parsedJson = ba(fileContents);
  if (!parsedJson) return A(`MCP config is not valid JSON: ${filePath} (scope=${scope}, length=${fileContents.length}, first100=${Pe(fileContents.slice(0, 100))})`, {
    level: "error"
  }), xe("mcp_config_parse", "mcp_config_invalid_json"), {
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
  return He("mcp_config_parse"), parseMcpConfig({
    configObject: parsedJson,
    expandVars,
    scope,
    filePath
  });
}

/** Returns true if the enterprise MCP config exists AND no policy tier allows all Claude.ai MCPs. */
function shouldSkipClaudeAiFetchForEnterpriseLockdown() {
  if (!doesEnterpriseMcpConfigExist()) return !1;
  if (Jpe().some((tier: any) => tier.allowAllClaudeAiMcps === !0)) return !1;
  return !0;
}

/** Returns true if enterprise policy requires that only managed MCP servers are allowed. */
function shouldAllowManagedMcpServersOnly() {
  return An("policySettings")?.allowManagedMcpServersOnly === !0;
}

/** Returns true if ALL provided MCP configs are the claude-vscode SDK server (the only allowed type with enterprise config). */
function areMcpConfigsAllowedWithEnterpriseMcpConfig(mcpConfigs: any) {
  return Object.values(mcpConfigs).every((cfg: any) => cfg.type === "sdk" && cfg.name === "claude-vscode");
}

/** Returns true if the given server name is the special q7 (computer-use) built-in server. */
function nXr(serverName: any) {
  return serverName === q7;
}

/** Returns true if the given MCP server is currently disabled in the project config. */
function isMcpServerDisabled(serverName: any) {
  let projectConfig = eh();
  if (nXr(serverName)) return !(projectConfig.enabledMcpServers || []).includes(serverName);
  return (projectConfig.disabledMcpServers || []).includes(serverName);
}

/** Adds or removes an item from an array based on the desired inclusion flag, returning the same reference if unchanged. */
function dsa(arr: any, item: any, shouldInclude: any) {
  if (arr.includes(item) === shouldInclude) return arr;
  return shouldInclude ? [...arr, item] : arr.filter((el: any) => el !== item);
}

/** Enables or disables a named MCP server in the project config, emitting a telemetry event for built-in toggles. */
function setMcpServerEnabled(serverName: any, enabled: any) {
  let isBuiltinToggle = nXr(serverName) && isMcpServerDisabled(serverName) === enabled;
  if (TE((cfg: any) => {
    if (nXr(serverName)) {
      let enabledList = cfg.enabledMcpServers || [],
        updatedList = dsa(enabledList, serverName, enabled);
      if (updatedList === enabledList) return cfg;
      return {
        ...cfg,
        enabledMcpServers: updatedList
      };
    }
    let disabledList = cfg.disabledMcpServers || [],
      updatedList = dsa(disabledList, serverName, !enabled);
    if (updatedList === disabledList) return cfg;
    return {
      ...cfg,
      disabledMcpServers: updatedList
    };
  }), isBuiltinToggle) W("tengu_builtin_mcp_toggle", {
    serverName,
    enabled
  });
  He("mcp_server_toggle");
}

/** Lazy-initialized module-level variables (fs/promises, path, env filter set, scopes, schema factory map, etc.). */
var bj, Nge, CVd, wVd, MCP_SETTINGS_SCOPES, usa, doesEnterpriseMcpConfigExist;
var KA = b(() => {
  toe();
  Wi();
  xpe();
  Qr();
  lt();
  Q8();
  bO();
  Mfe();
  tr();
  ky();
  Po();
  qe();
  Ct();
  ps();
  pd();
  gA();
  IHe();
  oh();
  Eg();
  wm();
  qK();
  ez();
  br();
  h3();
  tn();
  XJr();
  mn();
  kt();
  vfe();
  wW();
  gxt();
  Dvn();
  oCe();
  eet();
  qO();
  bj = require("fs/promises"), Nge = require("path");
  CVd = new Set(JJr);
  wVd = new Set(["dynamic", "agent", "claudeai"]);
  MCP_SETTINGS_SCOPES = ["enterprise", "local", "user", "project"];
  usa = {
    stdio: KRt,
    sse: ASr,
    http: jon,
    "streamable-http": jon,
    ws: RSr,
    sdk: vSr,
    "claudeai-proxy": wSr
  };
  doesEnterpriseMcpConfigExist = Hn(() => {
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

export {gsa,getEnterpriseMcpFilePath,aB,vxn,psa,wxn,msa,PHe,kxn,unwrapCcrProxyUrl,getMcpServerSignature,dedupPluginMcpServers,AVd,getMcpScopeConflicts,suppressedConnectorsEqual,dedupClaudeAiMcpServers,RVd,vVd,isMcpServerDenied,isMcpServerAllowedByPolicy,isBuiltinInProcessMcpServer,filterMcpServersByPolicy,isMcpServerBlockedAtConnectTime,filterDynamicMcpServersByPolicy,kVd,addMcpConfig,removeMcpConfig,readRawMcpJsonServersFromCwd,getMcpConfigsByScope,getMcpConfigByName,getClaudeCodeMcpConfigs,getAllMcpConfigs,getConnectablePluginMcpServerNames,parseMcpConfig,parseMcpConfigFromFilePath,shouldSkipClaudeAiFetchForEnterpriseLockdown,shouldAllowManagedMcpServersOnly,areMcpConfigsAllowedWithEnterpriseMcpConfig,nXr,isMcpServerDisabled,dsa,setMcpServerEnabled,bj,Nge,CVd,wVd,MCP_SETTINGS_SCOPES,usa,doesEnterpriseMcpConfigExist,KA};
