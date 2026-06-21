// @ts-nocheck
import {cDt as jL_,K3r as lu8} from "../../vendor/m2587.ts";
import {lP as sh,gs as Y9,F0i as yR7,sh as i$} from "../../vendor/m2589.ts";
import {SEt as YD_,ik as c0} from "../agent/0726_level.ts";
import {wA as WY,_T as kJ,$u as D3} from "../mcp/2194_mcpServerName.ts";
import {Ou as o1,uS as _j} from "../config/2594_event_name.ts";
import {fromEnum as QH,fromSanitizer_SANITIZER_OUTPUT_ONLY as XD} from "../../vendor/m5.ts";
import {I$ as jx,P0i as ZR7,vAe as FzH} from "../agent/2589_attributionMcpServer.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {fs as $9} from "../api/0459_getOauthConfig.ts";
import {De as SH,Rn as y6} from "../session/0615_length.ts";
import {getGlobalConfig as N_,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {pDt as XL_,mDt as PL_,YEn as TM6,rz as gi} from "../../vendor/m2590.ts";
import {Bl as p4,sn as $6} from "../config/0047_namespace.ts";
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

export {hashPluginId as RAe,getPluginScope as zUe,isOfficialOrBundledScope as zwe,isSafeToLogPluginName as Thd,logSkillActivated as hDt,buildSkillSourceContext as xAe,buildSkillNameHash as Shd,buildSearchResult as Uet,getPluginEnabledReason as t4r,buildPluginTelemetryPayload as bhd,buildPluginEventPayload as oz,logPluginFolderShadowed as ZEn,logPluginNameCollision as Ywe,buildPluginPayloadFromInfo as D$,buildPluginPayloadFromManifest as kAe,logOfficialPluginUpdateChecks as Y0i,logPluginsLoaded as J0i,classifyPluginLoadError as sz,logPluginLoadFailures as X0i,pathModule as e4r,builtinMarketplace as yhd,FW as tx};
