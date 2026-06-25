// @ts-nocheck
import {UOt as jL_,A8r as lu8} from "../../vendor/m2598.ts";
import {CD as sh,ts as Y9,_Ni as yR7,oh as i$} from "../../vendor/m2600.ts";
import {jRt as YD_,bk as c0} from "../agent/0731_level.ts";
import {If as WY,cT as kJ,vu as D3} from "../mcp/2200_mcpServerName.ts";
import {bu as o1,oS as _j} from "../config/2605_event_name.ts";
import {Le as QH,isKeybindingCustomizationEnabled as XD} from "../../vendor/m5.ts";
import {e$ as jx,dNi as ZR7,Fhe as FzH} from "../agent/2600_attributionMcpServer.ts";
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {os as $9} from "../api/0465_getOauthConfig.ts";
import {Ie as SH,vn as y6} from "../session/0621_length.ts";
import {getGlobalConfig as N_,tr as O8} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {WOt as XL_,GOt as PL_,Bvn as TM6,eW as gi} from "../../vendor/m2601.ts";
import {dl as p4,dn as $6} from "../config/0137_namespace.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function hashPluginId(pluginName, marketplace) {
  let key = marketplace ? `${pluginName}@${marketplace.toLowerCase()}` : pluginName;
  return jL_(key);
}
function getPluginScope(pluginName, marketplace, orgPluginSet) {
  if (marketplace === builtinMarketplace) return "default-bundle";
  if (sh(marketplace)) return "official";
  if (marketplace !== undefined && YD_.has(marketplace.toLowerCase())) return "community";
  if (orgPluginSet?.has(pluginName)) return "org";
  return "user-local";
}
function isOfficialOrBundledScope(scope) {
  return scope === "official" || scope === "default-bundle";
}
function isSafeToLogPluginName(scope) {
  return isOfficialOrBundledScope(scope) || scope === "community";
}
function logSkillActivated(skillName, skillSource, invocationTrigger) {
  let sourceType = skillSource?.type === "prompt" ? skillSource.source : undefined,
    pluginInfo = skillSource?.type === "prompt" ? skillSource.pluginInfo : undefined,
    marketplaceName = pluginInfo ? Y9(pluginInfo.repository).marketplace : undefined,
    isRedacted = sourceType === "builtin" || sourceType === "bundled" || sourceType === "plugin" && sh(marketplaceName) || WY();
  o1("skill_activated", {
    "skill.name": isRedacted ? skillName : "custom_skill",
    invocation_trigger: invocationTrigger,
    ...(sourceType && {
      "skill.source": sourceType
    }),
    ...(skillSource?.kind && {
      "skill.kind": skillSource.kind
    }),
    ...(isRedacted && pluginInfo && {
      "plugin.name": pluginInfo.pluginManifest.name
    }),
    ...(isRedacted && marketplaceName && {
      "marketplace.name": marketplaceName
    })
  });
}
function buildSkillSourceContext(skillSource, skillLoadedFrom, skillKind, skillCreatedBy) {
  return {
    ...(skillSource && {
      skill_source: QH(skillSource)
    }),
    ...(skillLoadedFrom && {
      skill_loaded_from: QH(skillLoadedFrom)
    }),
    ...(skillKind && {
      skill_kind: QH(skillKind)
    }),
    ...(skillCreatedBy && {
      skill_created_by: QH(skillCreatedBy)
    })
  };
}
function buildSkillNameHash(skillName, skillCategory) {
  if (skillCategory !== "custom") return {};
  return {
    skill_name_hash: XD(jL_(skillName))
  };
}
function buildSearchResult({
  rawName: rawName,
  canonicalName: canonicalName,
  isMcp: isMcp,
  isBuiltIn: isBuiltIn,
  isBundled: isBundled,
  isOfficial: isOfficial
}) {
  let category = isMcp ? "mcp" : isBuiltIn || isBundled || isOfficial ? rawName : "custom";
  return {
    sanitizedName: XD(category),
    skillNameHash: buildSkillNameHash(canonicalName, category)
  };
}
function getPluginEnabledReason(plugin, orgPluginSet, seedPaths) {
  if (plugin.isBuiltin) return "default-enable";
  if (orgPluginSet?.has(plugin.name)) return "org-policy";
  if (seedPaths.some(p => plugin.path.startsWith(p.endsWith(pathModule.sep) ? p : p + pathModule.sep))) return "seed-mount";
  return "user-install";
}
function buildPluginTelemetryPayload(pluginName, marketplace, orgPluginSet = null) {
  let scope = getPluginScope(pluginName, marketplace, orgPluginSet),
    isSafe = isSafeToLogPluginName(scope) || yR7(pluginName, marketplace);
  return {
    plugin_id_hash: hashPluginId(pluginName, marketplace),
    plugin_scope: QH(scope),
    plugin_name_redacted: isSafe ? pluginName : jx,
    marketplace_name_redacted: isSafe && marketplace ? marketplace : jx,
    is_official_plugin: isOfficialOrBundledScope(scope)
  };
}
function buildPluginEventPayload(pluginName, marketplace, orgPluginSet = null) {
  return {
    _PROTO_plugin_name: pluginName,
    ...(marketplace && {
      _PROTO_marketplace_name: marketplace
    }),
    ...buildPluginTelemetryPayload(pluginName, marketplace, orgPluginSet)
  };
}
function logPluginFolderShadowed(pluginName, marketplace, component) {
  c("tengu_plugin_folder_shadowed", {
    component: QH(component),
    ...buildPluginEventPayload(pluginName, marketplace)
  });
}
function logPluginNameCollision(itemType, skills, collisionInfo) {
  let nameToSources = new Map();
  for (let {
    name: name,
    source: source
  } of skills) {
    let existing = nameToSources.get(name);
    if (existing === undefined) nameToSources.set(name, [source]);else existing.push(source);
  }
  for (let [name, sources] of nameToSources) {
    let deduped = $9(sources);
    if (deduped.length < 2) continue;
    c("tengu_plugin_name_collision", {
      item_type: QH(itemType),
      _PROTO_skill_name: name,
      item_name_hash: hashPluginId(name),
      source_count: deduped.length,
      sources: deduped.sort().join(","),
      ...(collisionInfo.resolves && {
        winner_source: sources.at(-1)
      })
    });
  }
}
function buildPluginPayloadFromInfo(pluginInfo, orgPluginSet = null) {
  let {
    name: name,
    marketplace: marketplace
  } = Y9(pluginInfo);
  return buildPluginEventPayload(name, marketplace, orgPluginSet);
}
function buildPluginPayloadFromManifest(pluginManifest, orgPluginSet = null) {
  let {
    marketplace: marketplace
  } = Y9(pluginManifest.repository);
  return buildPluginEventPayload(pluginManifest.pluginManifest.name, marketplace, orgPluginSet);
}
function logOfficialPluginUpdateChecks(plugins, orgPluginSet) {
  for (let plugin of plugins) try {
    let {
      marketplace: K
    } = Y9(plugin.repository);
    if (isOfficialOrBundledScope(getPluginScope(plugin.name, K, orgPluginSet))) ZR7(plugin.name, K);
  } catch (K) {
    SH(K);
  }
}
function logPluginsLoaded(plugins, orgPluginSet, seedPaths) {
  let isEnterprise = WY(),
    numStartups = N_().numStartups,
    now = Date.now(),
    newPreambles = [];
  for (let plugin of plugins) {
    let {
        marketplace: marketplace
      } = Y9(plugin.repository),
      preamble = XL_(plugin.repository);
    if (!preamble) newPreambles.push(plugin.repository);
    let {
        sessionsSinceLastUse: sessionsSinceLastUse,
        daysSinceLastUse: daysSinceLastUse
      } = preamble ? PL_(preamble, numStartups, now) : {
        sessionsSinceLastUse: 0,
        daysSinceLastUse: 0
      },
      scope = getPluginScope(plugin.name, marketplace, orgPluginSet),
      enabledReason = getPluginEnabledReason(plugin, orgPluginSet, seedPaths),
      skillPathCount = (plugin.skillsPath ? 1 : 0) + (plugin.skillsPaths?.length ?? 0),
      commandPathCount = (plugin.commandsPath ? 1 : 0) + (plugin.commandsPaths?.length ?? 0),
      agentPathCount = (plugin.agentsPath ? 1 : 0) + (plugin.agentsPaths?.length ?? 0),
      isSafe = isOfficialOrBundledScope(scope) || isEnterprise;
    o1("plugin_loaded", {
      "plugin.name": isSafe ? plugin.name : jx,
      ...(marketplace && {
        "marketplace.name": isSafe ? marketplace : jx
      }),
      ...(isSafe && plugin.manifest.version && {
        "plugin.version": plugin.manifest.version
      }),
      "plugin.scope": scope,
      enabled_via: enabledReason,
      plugin_id_hash: hashPluginId(plugin.name, marketplace),
      has_hooks: plugin.hooksConfig !== undefined,
      has_mcp: !plugin.skipMcpDiscovery && plugin.mcpServers !== undefined,
      host_owned_mcp: plugin.skipMcpDiscovery === true,
      skill_path_count: skillPathCount,
      command_path_count: commandPathCount,
      agent_path_count: agentPathCount,
      safe_mode: String(p4())
    }), c("tengu_plugin_enabled_for_session", {
      ...buildPluginEventPayload(plugin.name, marketplace, orgPluginSet),
      enabled_via: QH(enabledReason),
      skill_path_count: skillPathCount,
      command_path_count: commandPathCount,
      agent_path_count: agentPathCount,
      has_mcp: !plugin.skipMcpDiscovery && plugin.mcpServers !== undefined,
      host_owned_mcp: plugin.skipMcpDiscovery === true,
      has_lsp: plugin.lspServers !== undefined,
      has_hooks: plugin.hooksConfig !== undefined,
      has_settings: plugin.settings !== undefined,
      sessions_since_last_use: sessionsSinceLastUse,
      days_since_last_use: daysSinceLastUse,
      safe_mode: p4(),
      ...(plugin.settings && {
        settings_keys: Object.keys(plugin.settings).sort().join(",")
      }),
      ...(plugin.manifest.version && {
        version: kJ(plugin.manifest.version)
      })
    });
  }
  if (newPreambles.length > 0) TM6(newPreambles);
}
function classifyPluginLoadError(err) {
  let msg = String(err?.message ?? err);
  if (/ENOTFOUND|ECONNREFUSED|EAI_AGAIN|ETIMEDOUT|ECONNRESET|network|Could not resolve|Connection refused|timed out/i.test(msg)) return "network";
  if (/\b404\b|not found|does not exist|no such plugin/i.test(msg)) return "not-found";
  if (/\b40[13]\b|EACCES|EPERM|permission denied|unauthorized/i.test(msg)) return "permission";
  if (/invalid|malformed|schema|validation|parse error/i.test(msg)) return "validation";
  return "unknown";
}
function logPluginLoadFailures(failures, orgPluginSet, opts) {
  for (let failure of failures) {
    let {
        name: pluginName,
        marketplace: marketplace
      } = Y9(failure.source),
      displayName = "plugin" in failure && failure.plugin ? failure.plugin : pluginName;
    c("tengu_plugin_load_failed", {
      error_category: QH(failure.type),
      cache_only: opts?.cacheOnly ?? false,
      ...("component" in failure && {
        component: QH(failure.component)
      }),
      ...("errno" in failure && failure.errno && {
        errno: failure.errno
      }),
      ...buildPluginEventPayload(displayName, marketplace, orgPluginSet)
    });
  }
}
var pathModule,
  builtinMarketplace = "builtin";
var FW = L(() => {
  v_();
  D3();
  O8();
  $6();
  y6();
  FzH();
  i$();
  c0();
  gi();
  _j();
  lu8();
  pathModule = require("path");
});
export {hashPluginId as Uhe,getPluginScope as j2e,isOfficialOrBundledScope as xwe,isSafeToLogPluginName as Kvd,logSkillActivated as zOt,buildSkillSourceContext as $he,buildSkillNameHash as zvd,buildSearchResult as Vnt,getPluginEnabledReason as D8r,buildPluginTelemetryPayload as jvd,buildPluginEventPayload as Iz,logPluginFolderShadowed as Wvn,logPluginNameCollision as Dwe,buildPluginPayloadFromInfo as n$,buildPluginPayloadFromManifest as qhe,logOfficialPluginUpdateChecks as wNi,logPluginsLoaded as kNi,classifyPluginLoadError as xz,logPluginLoadFailures as HNi,pathModule as x8r,builtinMarketplace as Vvd,FW as slowOpTracer};
