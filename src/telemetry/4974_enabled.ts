// @ts-nocheck
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {bnl as BrK,Mk as JZ} from "../config/4439_operation.ts";
import {react as uY,W6 as HU} from "../../vendor/m4434.ts";
import {aLa as c8K,L2t as Ay_} from "../../vendor/m3914.ts";
import {loadAllPlugins as jX,gg as BA} from "../agent/4445_resolvePluginRoot.ts";
import {$ia as ye7,initXL as DV} from "../agent/3279_code.ts";
import {Q6e as YBH,uqt as Nu_} from "../tools/4432_encoding.ts";
import {getAgentDefinitionsWithOverrides as Vk,scrubPathsConfig as tA} from "../permissions/4454_toAgentInfos.ts";
import {getOriginalCwd as G8,getTotalOutputTokens as JJ,lt as w_} from "../session/0131_sent.ts";
import {Hee as ue,qxe as yWH} from "../config/3142_i.ts";
import {o9e as YIH,AIn as IW6,p1t as BN_} from "../../vendor/m3224.ts";
import {IIn as oW6,Kae as l7H} from "../../vendor/m3247.ts";
import {loadPluginHooks as rzH,z2e as qbH} from "../../vendor/m2766.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {LF as kC,axe as FPH} from "../../vendor/m2767.ts";
import {getConnectablePluginMcpServerNames as ig8,px as YZ} from "./3148_unwrapCcrProxyUrl.ts";
import {hL as _V,gz as Je,_z as xi} from "./2692__z.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {b as L} from "../../runtime.ts";
/**
 * Plugin refresh logic and MCP cache-impact helpers.
 * Part of the telemetry / plugin subsystem.
 */

// ---------------------------------------------------------------------------
// Types (local, inferred from usage)
// ---------------------------------------------------------------------------

/** Updater callback passed to refreshActivePlugins — mutates AppState via immer-style setter. */
type AppStateUpdater = (updater: (prev: any) => any) => void;

/** Shape returned by refreshActivePlugins. */
interface RefreshActivePluginsResult {
  enabled_count: number;
  disabled_count: number;
  command_count: number;
  agent_count: number;
  hook_count: number;
  mcp_count: number;
  lsp_count: number;
  error_count: number;
  errors: unknown[];
  warnings: unknown[];
  agentDefinitions: any;
  pluginCommands: unknown[];
}

/** Shape returned by computeMcpCacheImpact. */
interface McpCacheImpactResult {
  mcpServersAdded: string[];
  mcpServersRemoved: string[];
  toolSearchEnabled: boolean;
  wouldInvalidateCache: boolean;
}

/** Options passed to logMcpCacheImpact alongside the impact result. */
interface McpCacheImpactOptions {
  warned: boolean;
  forced: boolean;
}

// ---------------------------------------------------------------------------
// refreshActivePlugins
// ---------------------------------------------------------------------------

/**
 * Clears all plugin caches, re-loads plugins (enabled/disabled/errors/warnings),
 * hydrates MCP and LSP server counts, updates AppState, and returns a summary.
 */
async function refreshActivePlugins(setAppState: AppStateUpdater): Promise<RefreshActivePluginsResult> {
  N("refreshActivePlugins: clearing all plugin caches"), BrK(), uY(), c8K();
  let pluginLoadResult = await jX();
  ye7();
  let [pluginCommands, agentDefinitions] = await Promise.all([YBH(), Vk(G8())]),
    {
      enabled: enabledPlugins,
      disabled: disabledPlugins,
      errors: loadErrors,
      warnings: loadWarnings
    } = pluginLoadResult,
    [mcpCountsPerPlugin, lspCountsPerPlugin] = await Promise.all([Promise.all(enabledPlugins.map(async plugin => {
      if (plugin.mcpServers) return Object.keys(plugin.mcpServers).length;
      let servers = await ue(plugin, loadErrors);
      if (servers) plugin.mcpServers = servers;
      return servers ? Object.keys(servers).length : 0;
    })), Promise.all(enabledPlugins.map(async plugin => {
      if (plugin.lspServers) return Object.keys(plugin.lspServers).length;
      let servers = await YIH(plugin, loadErrors);
      if (servers) plugin.lspServers = servers;
      return servers ? Object.keys(servers).length : 0;
    }))]),
    totalMcpCount = mcpCountsPerPlugin.reduce((acc, count) => acc + count, 0),
    totalLspCount = lspCountsPerPlugin.reduce((acc, count) => acc + count, 0),
    allWarnings = [...loadWarnings, ...IW6(enabledPlugins)];
  setAppState(prev => ({
    ...prev,
    plugins: {
      ...prev.plugins,
      enabled: enabledPlugins,
      disabled: disabledPlugins,
      commands: pluginCommands,
      errors: mergePluginErrors(prev.plugins.errors, loadErrors),
      warnings: mergePluginWarnings(prev.plugins.warnings, allWarnings),
      needsRefresh: !1
    },
    agentDefinitions,
    mcp: {
      ...prev.mcp,
      pluginReconnectKey: prev.mcp.pluginReconnectKey + 1
    }
  })), oW6();
  let hookLoadFailed = !1;
  try {
    await rzH();
  } catch (err) {
    hookLoadFailed = !0, EH(err), N(`refreshActivePlugins: loadPluginHooks failed: ${GH(err)}`);
  }
  let totalHookCount = enabledPlugins.reduce((acc, plugin) => {
    if (!plugin.hooksConfig) return acc;
    return acc + Object.values(plugin.hooksConfig).reduce((hookAcc: number, hookGroup: any) => hookAcc + (hookGroup?.reduce((innerAcc: number, entry: any) => innerAcc + entry.hooks.length, 0) ?? 0), 0);
  }, 0);
  return kC.emit(), N(`refreshActivePlugins: ${enabledPlugins.length} enabled, ${pluginCommands.length} commands, ${agentDefinitions.allAgents.length} agents, ${totalHookCount} hooks, ${totalMcpCount} MCP, ${totalLspCount} LSP`), {
    enabled_count: enabledPlugins.length,
    disabled_count: disabledPlugins.length,
    command_count: pluginCommands.length,
    agent_count: agentDefinitions.allAgents.length,
    hook_count: totalHookCount,
    mcp_count: totalMcpCount,
    lsp_count: totalLspCount,
    error_count: loadErrors.length + (hookLoadFailed ? 1 : 0),
    errors: loadErrors,
    warnings: allWarnings,
    agentDefinitions,
    pluginCommands
  };
}

// ---------------------------------------------------------------------------
// mergePluginErrors
// ---------------------------------------------------------------------------

/**
 * Merges pre-existing plugin errors with a fresh batch from a reload,
 * deduplicating by a composite key so each unique error appears once.
 */
function mergePluginErrors(existingErrors: unknown[], newErrors: unknown[]): unknown[] {
  let filteredExisting = (existingErrors as any[]).filter((err: any) => err.source === "lsp-manager" || err.source.startsWith("plugin:")),
    newErrorKeys = new Set(newErrors.map(getErrorKey));
  return [...filteredExisting.filter((err: any) => !newErrorKeys.has(getErrorKey(err))), ...newErrors];
}

// ---------------------------------------------------------------------------
// getErrorKey
// ---------------------------------------------------------------------------

/** Derives a stable dedup key for a plugin error object. */
function getErrorKey(error: any): string {
  return error.type === "generic-error" ? `generic-error:${error.source}:${error.error}` : `${error.type}:${error.source}`;
}

// ---------------------------------------------------------------------------
// mergePluginWarnings
// ---------------------------------------------------------------------------

/**
 * Merges pre-existing plugin warnings with fresh ones from a reload,
 * deduplicating by `${type}:${source}`.
 */
function mergePluginWarnings(existingWarnings: unknown[], newWarnings: unknown[]): unknown[] {
  let filteredExisting = (existingWarnings as any[]).filter((w: any) => w.source.startsWith("plugin:")),
    newWarningKeys = new Set(newWarnings.map((w: any) => `${(w as any).type}:${(w as any).source}`));
  return [...filteredExisting.filter((w: any) => !newWarningKeys.has(`${w.type}:${w.source}`)), ...newWarnings];
}

// ---------------------------------------------------------------------------
// computeMcpCacheImpact
// ---------------------------------------------------------------------------

/**
 * Compares the set of plugin-sourced MCP clients currently connected against
 * the set that *would* be connected according to the latest dynamic config,
 * returning which servers were added/removed and whether caching would be
 * invalidated.
 */
async function computeMcpCacheImpact(appState: {
  mcpClients: any[];
  dynamicMcpConfig?: Record<string, unknown>;
  model: string;
}): Promise<McpCacheImpactResult> {
  let currentPluginClientNames = new Set(appState.mcpClients.filter(client => client.config.pluginSource !== void 0).map(client => client.name)),
    expectedServerNames = await ig8(appState.dynamicMcpConfig ?? {}),
    mcpServersAdded = [...expectedServerNames].filter(name => !currentPluginClientNames.has(name)).sort(),
    mcpServersRemoved = [...currentPluginClientNames].filter(name => !expectedServerNames.has(name)).sort(),
    hasChanges = mcpServersAdded.length > 0 || mcpServersRemoved.length > 0,
    toolSearchOn = _V() && Je(appState.model),
    wouldInvalidateCache = hasChanges && !toolSearchOn && JJ() > 0;
  return {
    mcpServersAdded,
    mcpServersRemoved,
    toolSearchEnabled: toolSearchOn,
    wouldInvalidateCache
  };
}

// ---------------------------------------------------------------------------
// logMcpCacheImpact
// ---------------------------------------------------------------------------

/**
 * Emits a `tengu_reload_plugins_cache_impact` telemetry event describing
 * whether MCP servers changed and whether a cache-warming warning was shown.
 */
function logMcpCacheImpact(impact: McpCacheImpactResult, options: McpCacheImpactOptions): void {
  c("tengu_reload_plugins_cache_impact", {
    mcp_changed: impact.mcpServersAdded.length > 0 || impact.mcpServersRemoved.length > 0,
    tool_search_on: impact.toolSearchEnabled,
    warned: options.warned,
    forced: options.forced
  });
}

// ---------------------------------------------------------------------------
// Lazy module initializer
// ---------------------------------------------------------------------------

var dg6 = L(() => {
  w_();
  y_();
  l7H();
  YZ();
  tA();
  FH();
  L_();
  S6();
  DV();
  FPH();
  xi();
  HU();
  JZ();
  Nu_();
  qbH();
  BN_();
  yWH();
  Ay_();
  BA();
});

export {refreshActivePlugins as vye,mergePluginErrors as flm,getErrorKey as YRl,mergePluginWarnings as Alm,computeMcpCacheImpact as JRl,logMcpCacheImpact as XRl,dg6 as RVn};
