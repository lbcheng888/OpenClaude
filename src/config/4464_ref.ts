// @ts-nocheck
import {cachePlugin as Aft,getVersionedCachePath as oN,getVersionedZipCachePath as $De,loadAllPluginsCacheOnly as np,path as Eg} from "../agent/4467_resolvePluginRoot.ts";
import {UGn,qEo,eP,$Gn,rH} from "./4461_operation.ts";
import {Xce,VGn,j5t,zGn,KGn,Y5t} from "../../vendor/m4462.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {WGn,GEo} from "../../vendor/m4461.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {OG,DGn,DDe} from "./4456_path.ts";
import {ts,AD,CD,v8r,oh} from "../../vendor/m2600.ts";
import {getSettingsForSource as An,ao,br} from "./0745_updateSettingsForSource.ts";
import {zh,PDe,c6} from "../../vendor/m4456.ts";
import {Ist,V4} from "../../vendor/m3150.ts";
import {krt,a1} from "./2689_withFileTypes.ts";
import {Gnt,eW} from "../../vendor/m2601.ts";
import {J2e,CO,zvn,ONi,YOt,Uie,JOt,Kvn,Whe} from "../../vendor/m2607.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {Jo,Ct} from "../../vendor/m197.ts";
import {jA,nH,II} from "../../vendor/m3268.ts";
import {Z0,tP,d6,dS} from "./4460_source.ts";
import {JRt,bk} from "../agent/0731_level.ts";
import {eD,wm} from "../../vendor/m707.ts";
import {If,cT,vu} from "../mcp/2200_mcpServerName.ts";
import {bu,oS} from "./2605_event_name.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le,Ve} from "../../vendor/m5.ts";
import {Iz,xz,slowOpTracer as pw} from "../telemetry/2606_skill_name.ts";
import {fI,k8} from "../../vendor/m2238.ts";
import {t_} from "../../vendor/m2594.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function getCurrentTimestamp() {
  return new Date().toISOString();
}
function safeResolvePath(baseDir, relativePath) {
  let resolvedFull = p6.resolve(baseDir, relativePath),
    resolvedBase = p6.resolve(baseDir) + p6.sep;
  if (!resolvedFull.startsWith(resolvedBase) && resolvedFull !== p6.resolve(baseDir)) throw Error(`Path traversal detected: "${relativePath}" would escape the base directory`);
  return resolvedFull;
}
async function materializeAndRegisterPlugin(pluginId, entry, scope = "user", projectPath, containmentRoot, resolvedTag, isAuto, marketplaceInstallLocation) {
  let effectiveSource = typeof entry.source === "string" && containmentRoot ? containmentRoot : entry.source,
    sourceWithRef = resolvedTag && typeof effectiveSource === "object" && (effectiveSource.source === "github" || effectiveSource.source === "url" || effectiveSource.source === "git-subdir") ? {
      ...effectiveSource,
      ref: resolvedTag.ref,
      sha: resolvedTag.sha
    } : effectiveSource,
    materializeResult = await Aft(sourceWithRef, {
      manifest: entry,
      containmentRoot: typeof entry.source === "string" && containmentRoot ? marketplaceInstallLocation : undefined
    }),
    resolvedContainmentRoot = containmentRoot || materializeResult.path,
    gitSha = resolvedTag?.sha ?? materializeResult.gitCommitSha ?? (await UGn(resolvedContainmentRoot)),
    now = getCurrentTimestamp(),
    versionString = await Xce(pluginId, entry.source, materializeResult.manifest, resolvedContainmentRoot, entry.version, resolvedTag?.sha ?? materializeResult.gitCommitSha),
    finalVersion = resolvedTag && (materializeResult.manifest.version || entry.version) ? `${versionString}-${resolvedTag.sha.substring(0, 12)}` : versionString,
    versionedCachePath = oN(pluginId, finalVersion),
    installPath = materializeResult.path;
  if (materializeResult.path !== versionedCachePath) {
    await Wt().mkdir(p6.dirname(versionedCachePath)), await Cft.rm(versionedCachePath, {
      recursive: true,
      force: true
    });
    let pathWithSep = materializeResult.path.endsWith(p6.sep) ? materializeResult.path : materializeResult.path + p6.sep;
    if (versionedCachePath.startsWith(pathWithSep)) {
      let tempPath = p6.join(p6.dirname(materializeResult.path), `.claude-plugin-temp-${Date.now()}-${ycl.randomBytes(4).toString("hex")}`);
      await Cft.rename(materializeResult.path, tempPath), await Wt().mkdir(p6.dirname(versionedCachePath)), await Cft.rename(tempPath, versionedCachePath);
    } else await Cft.rename(materializeResult.path, versionedCachePath);
    installPath = versionedCachePath;
  }
  let depsResult = await WGn(installPath);
  if (depsResult.error) A(`Plugin dependency install warning for ${pluginId}: ${depsResult.error}`, {
    level: "warn"
  });
  if (OG()) {
    let zipPath = $De(pluginId, finalVersion);
    await DGn(installPath, zipPath), installPath = zipPath;
  }
  if (resolvedTag && materializeResult.manifest.version && resolvedTag.version !== materializeResult.manifest.version) A(`Tag ${resolvedTag.ref} resolved to a commit whose plugin.json says version ${materializeResult.manifest.version} \u2014 using tag-derived ${resolvedTag.version} for constraint checks`, {
    level: "warn"
  });
  return qEo(pluginId, {
    version: finalVersion,
    installedAt: now,
    lastUpdated: now,
    installPath: installPath,
    gitCommitSha: gitSha,
    ...(resolvedTag && {
      resolvedVersion: resolvedTag.version
    }),
    ...(isAuto && {
      auto: true
    })
  }, scope, projectPath), {
    path: installPath,
    depConstraints: materializeResult.depConstraints,
    dependencies: materializeResult.manifest.dependencies,
    defaultEnabled: materializeResult.manifest.defaultEnabled
  };
}
function recordLocalPluginInstallation(pluginRecord, scope = "user", projectPath) {
  let now = getCurrentTimestamp();
  qEo(pluginRecord.pluginId, {
    version: pluginRecord.version || "unknown",
    installedAt: now,
    lastUpdated: now,
    installPath: pluginRecord.installPath
  }, scope, projectPath);
}
function formatResolutionError(err) {
  switch (err.reason) {
    case "cycle":
      return `Dependency cycle: ${err.chain.join(" \u2192 ")}`;
    case "cross-marketplace":
      {
        let marketplace = ts(err.dependency).marketplace,
          marketplaceLabel = marketplace ? `marketplace "${marketplace}"` : "a different marketplace",
          allowlistHint = marketplace ? ` Add "${marketplace}" to allowCrossMarketplaceDependenciesOn in the ROOT marketplace's marketplace.json (the marketplace of the plugin you're installing \u2014 only its allowlist applies; no transitive trust).` : "";
        return `Dependency "${err.dependency}" (required by ${err.requiredBy}) is in ${marketplaceLabel}, which is not in the allowlist \u2014 cross-marketplace dependencies are blocked by default. Install it manually first.${allowlistHint}`;
      }
    case "not-found":
      {
        let {
          marketplace: marketplace
        } = ts(err.missing);
        return marketplace ? `Dependency "${err.missing}" (required by ${err.requiredBy}) not found. Is the "${marketplace}" marketplace added?` : `Dependency "${err.missing}" (required by ${err.requiredBy}) not found in any configured marketplace`;
      }
  }
}
async function pruneOrphanedAutoDeps(pluginIds, scope, projectPath, {
  deleteDataDir = true
} = {}) {
  if (pluginIds.size === 0) return [];
  let installedPlugins = eP().plugins,
    installsWithUniqueEntries = [],
    idsToCleanFromSettings = [];
  for (let id of pluginIds) {
    let installs = installedPlugins[id],
      matchingInstall = installs?.find(entry => entry.scope === scope && entry.projectPath === projectPath);
    if (!matchingInstall) continue;
    if ($Gn(id, scope, projectPath), idsToCleanFromSettings.push(id), (installs?.length ?? 0) <= 1) installsWithUniqueEntries.push({
      id: id,
      installPath: matchingInstall.installPath
    });
  }
  if (idsToCleanFromSettings.length === 0) return [];
  let settingsKey = AD(scope),
    updatedEnabledPlugins = {
      ...An(settingsKey)?.enabledPlugins
    };
  for (let id of idsToCleanFromSettings) updatedEnabledPlugins[id] = undefined;
  let {
    error: writeError
  } = ao(settingsKey, {
    enabledPlugins: updatedEnabledPlugins
  });
  if (writeError) A(`pruneOrphanedAutoDeps: settings write failed at ${scope}: ${writeError.message}`);
  zh();
  for (let {
    id: id,
    installPath: installPath
  } of installsWithUniqueEntries) if (await PDe(installPath), await Ist(id), deleteDataDir) await krt(id);
  return Gnt(installsWithUniqueEntries.map(entry => entry.id)), idsToCleanFromSettings;
}
async function isPluginInstalledAndOnDisk(pluginId, scope) {
  let settingsKey = AD(scope);
  if (!J2e(settingsKey).has(pluginId)) return false;
  let projectPath = scope !== "user" ? Lt() : undefined,
    install = eP().plugins[pluginId]?.find(entry => entry.scope === scope && entry.projectPath === projectPath);
  if (!install) return false;
  try {
    return await Wt().stat(install.installPath), true;
  } catch (err) {
    if (Jo(err)) return false;
    throw err;
  }
}
function jGn(pluginId, knownMarketplaces) {
  let marketplace = ts(pluginId).marketplace,
    source = marketplace ? knownMarketplaces[marketplace]?.source : undefined;
  return source && !jA(source) ? marketplace : undefined;
}
async function collectNewDepsFromManifest(ctx) {
  let newIds = [];
  for (let rawDep of ctx.rootManifestDeps ?? []) {
    let depId = CO(rawDep, ctx.pluginId);
    if (ctx.closureSet.has(depId) || ctx.alreadyEnabled.has(depId) && !ctx.forceInclude.has(depId)) continue;
    let depMarketplace = ts(depId).marketplace;
    if (depMarketplace !== ctx.rootMarketplace && !(depMarketplace && ctx.allowedCrossMarketplaces.has(depMarketplace)) && !ctx.alreadyEnabled.has(depId)) {
      A(`${ctx.pluginId} plugin.json declares dependency "${depId}" in a different marketplace; not auto-installing \u2014 install it manually`, {
        level: "warn"
      });
      continue;
    }
    if (nH(depId)) return {
      ok: false,
      blockedDependency: depId
    };
    let blockedMarketplace = jGn(depId, ctx.knownMarketplaces);
    if (blockedMarketplace) return {
      ok: false,
      blockedDependency: depId,
      blockedMarketplace: blockedMarketplace
    };
    let depEntry = await Z0(depId);
    if (!depEntry) {
      A(`${ctx.pluginId} plugin.json declares dependency "${depId}" not found in any known marketplace; not auto-installing`, {
        level: "warn"
      });
      continue;
    }
    ctx.depInfo.set(depId, depEntry), newIds.push(depId);
  }
  return {
    ok: true,
    ids: newIds
  };
}
function computeEnabledStates({
  closure: closure,
  rootId: rootId,
  rootRequiredByDependent: rootRequiredByDependent,
  priorEnabled: priorEnabled,
  explicitAnywhere: explicitAnywhere,
  defaultsById: defaultsById,
  dependenciesById: dependenciesById
}) {
  let closureSet = new Set(closure),
    enabledSet = new Set();
  for (let id of closure) {
    let prior = priorEnabled[id],
      defaultEnabled = defaultsById.get(id) ?? true;
    if (prior !== undefined) {
      if (prior !== false || defaultEnabled) enabledSet.add(id);
      continue;
    }
    if (explicitAnywhere.has(id) || defaultEnabled || id === rootId && rootRequiredByDependent) enabledSet.add(id);
  }
  let workList = [...enabledSet];
  while (workList.length > 0) {
    let id = workList.pop();
    if (id === undefined) break;
    for (let dep of dependenciesById.get(id) ?? []) if (closureSet.has(dep) && !enabledSet.has(dep)) enabledSet.add(dep), workList.push(dep);
  }
  return new Map(closure.map(id => [id, enabledSet.has(id)]));
}
async function installResolvedPlugin({
  pluginId: pluginId,
  entry: entry,
  scope: scope,
  marketplaceInstallLocation: marketplaceInstallLocation,
  trigger: trigger,
  auto: auto,
  requiredByEnabledDependent: requiredByEnabledDependent
}) {
  let settingsKey = AD(scope);
  if (nH(pluginId)) return {
    ok: false,
    reason: "blocked-by-policy",
    pluginName: entry.name
  };
  let knownMarketplaces = await tP(),
    blockedMkt = jGn(pluginId, knownMarketplaces);
  if (blockedMkt) return {
    ok: false,
    reason: "marketplace-blocked-by-policy",
    pluginName: entry.name,
    marketplaceName: blockedMkt
  };
  let depInfoMap = new Map();
  if (JRt(entry.source) && !marketplaceInstallLocation) return {
    ok: false,
    reason: "local-source-no-location",
    pluginName: entry.name
  };
  if (marketplaceInstallLocation) depInfoMap.set(pluginId, {
    entry: entry,
    marketplaceInstallLocation: marketplaceInstallLocation
  });
  let rootMarketplace = ts(pluginId).marketplace,
    allowedCrossMarketplaces = new Set((rootMarketplace ? (await d6(rootMarketplace))?.allowCrossMarketplaceDependenciesOn : undefined) ?? []),
    projectPath = scope !== "user" ? Lt() : undefined,
    allInstalledPlugins = eP().plugins,
    alreadyEnabledInScope = new Set();
  for (let id of J2e(settingsKey)) if (allInstalledPlugins[id]?.some(inst => inst.scope === scope && inst.projectPath === projectPath)) alreadyEnabledInScope.add(id);
  let allPluginsList = await np(),
    allPlugins = allPluginsList.enabled.concat(allPluginsList.disabled),
    versionsBySource = new Map();
  for (let p of allPlugins) versionsBySource.set(p.source, p.resolvedVersion ?? p.manifest.version);
  let currentEnabledPlugins = An(settingsKey)?.enabledPlugins,
    forcedInclude = new Set();
  for (let p of allPlugins) {
    if (!p.depConstraints) continue;
    for (let [depName, constraint] of p.depConstraints) {
      if (constraint.version === undefined) continue;
      let qualifiedDep = CO(depName, p.source);
      if (Array.isArray(currentEnabledPlugins?.[qualifiedDep])) continue;
      if (nH(qualifiedDep) || jGn(qualifiedDep, knownMarketplaces)) {
        A(`installResolvedPlugin: ${qualifiedDep} version-unsatisfied but policy-blocked; not force-including`);
        continue;
      }
      if (!zvn(versionsBySource.get(qualifiedDep), constraint.version)) forcedInclude.add(qualifiedDep);
    }
  }
  let resolutionResult = await ONi(pluginId, async id => {
    if (depInfoMap.has(id)) return depInfoMap.get(id).entry;
    if (id === pluginId) return entry;
    let found = await Z0(id);
    if (found) depInfoMap.set(id, found);
    return found?.entry ?? null;
  }, alreadyEnabledInScope, allowedCrossMarketplaces, forcedInclude);
  if (!resolutionResult.ok) return {
    ok: false,
    reason: "resolution-failed",
    resolution: resolutionResult
  };
  for (let id of resolutionResult.closure) {
    if (id === pluginId || alreadyEnabledInScope.has(id)) continue;
    if (nH(id)) return {
      ok: false,
      reason: "dependency-blocked-by-policy",
      pluginName: entry.name,
      blockedDependency: id
    };
    let mkt = jGn(id, knownMarketplaces);
    if (mkt) return {
      ok: false,
      reason: "dependency-marketplace-blocked-by-policy",
      pluginName: entry.name,
      blockedDependency: id,
      marketplaceName: mkt
    };
  }
  let priorEnabledInScope = {
      ...(An(settingsKey)?.enabledPlugins ?? {})
    },
    allScopesEnabledPlugins = {};
  for (let key of eD()) Object.assign(allScopesEnabledPlugins, An(key)?.enabledPlugins ?? {});
  let explicitAnywhere = new Set(Object.keys(allScopesEnabledPlugins).filter(id => allScopesEnabledPlugins[id] !== undefined)),
    pluginSimpleName = ts(pluginId).name,
    isRequiredByEnabledDependent = requiredByEnabledDependent === true || allPlugins.some(p => {
      if (p.source === pluginId) return false;
      let enabledState = allScopesEnabledPlugins[p.source];
      return (enabledState !== undefined ? enabledState === true || Array.isArray(enabledState) : p.manifest.defaultEnabled !== false) && (p.manifest.dependencies ?? []).some(dep => {
        let qualified = CO(dep, p.source);
        return ts(qualified).marketplace ? qualified === pluginId : qualified === pluginSimpleName;
      });
    });
  function getCatalogEntry(id) {
    return id === pluginId ? entry : depInfoMap.get(id)?.entry;
  }
  let defaultsById = new Map(),
    dependenciesById = new Map();
  for (let id of resolutionResult.closure) {
    let catalogEntry = getCatalogEntry(id);
    defaultsById.set(id, catalogEntry?.defaultEnabled ?? true), dependenciesById.set(id, (catalogEntry?.dependencies ?? []).map(pe => CO(pe, id)));
  }
  let initialEnabledState = computeEnabledStates({
      closure: resolutionResult.closure,
      rootId: pluginId,
      rootRequiredByDependent: isRequiredByEnabledDependent,
      priorEnabled: priorEnabledInScope,
      explicitAnywhere: explicitAnywhere,
      defaultsById: defaultsById,
      dependenciesById: dependenciesById
    }),
    writtenEnabledStates = new Map(),
    writtenEnabledStates_2 = {};
  for (let id of resolutionResult.closure) {
    let prior = priorEnabledInScope[id];
    writtenEnabledStates_2[id] = Array.isArray(prior) ? prior : initialEnabledState.get(id) ?? true, writtenEnabledStates.set(id, writtenEnabledStates_2[id]);
  }
  let {
    error: settingsWriteError
  } = ao(settingsKey, {
    enabledPlugins: {
      ...priorEnabledInScope,
      ...writtenEnabledStates_2
    }
  });
  if (settingsWriteError) return {
    ok: false,
    reason: "settings-write-failed",
    message: settingsWriteError.message
  };
  function getLocalContainmentRoot(info) {
    return JRt(info.entry.source) ? safeResolvePath(info.marketplaceInstallLocation, info.entry.source) : undefined;
  }
  let materializedIds = new Set(),
    installQueue = resolutionResult.closure;
  function rollbackEnabledPlugins() {
    let rolledBack = {};
    for (let pe of installQueue) rolledBack[pe] = pe === pluginId && materializedIds.has(pe) && !Array.isArray(priorEnabledInScope[pe]) ? initialEnabledState.get(pluginId) ?? true : priorEnabledInScope[pe];
    let {
      error: rollbackError
    } = ao(settingsKey, {
      enabledPlugins: rolledBack
    });
    if (rollbackError) A(`Failed to roll back enabledPlugins after install failure for ${pluginId}: ${rollbackError.message}. Retry may skip un-cached deps; manually disable then reinstall to recover.`, {
      level: "error"
    });
  }
  let rootManifestDeps,
    rootManifestDeps_2 = new Map(),
    installedDepConstraints = new Map();
  try {
    if (!depInfoMap.has(pluginId)) {
      let marketplaceLoc = (await Z0(pluginId))?.marketplaceInstallLocation;
      if (marketplaceLoc) depInfoMap.set(pluginId, {
        entry: entry,
        marketplaceInstallLocation: marketplaceLoc
      });
    }
    let closureSet = new Set(installQueue),
      externalConstraints = new Map();
    for (let p of allPlugins) {
      if (!p.depConstraints) continue;
      if (closureSet.has(p.source)) continue;
      for (let [depName, constraint] of p.depConstraints) {
        if (constraint.version === undefined) continue;
        let qualified = CO(depName, p.source),
          existing = externalConstraints.get(qualified);
        if (existing) existing.push(constraint.version);else externalConstraints.set(qualified, [constraint.version]);
      }
    }
    let accumulatedConstraints = new Map(),
      tagLookupCache = new Map();
    async function materializeOne(id) {
      let info = depInfoMap.get(id);
      if (!info) return {
        ok: true,
        dependencies: undefined
      };
      let combinedRanges = [...(accumulatedConstraints.get(id) ?? []), ...(externalConstraints.get(id) ?? [])],
        resolvedTag,
        effectiveEntry = info.entry;
      if (combinedRanges.length > 0) {
        let rangeResult = YOt(combinedRanges);
        if (!rangeResult.ok) return {
          ok: false,
          reason: "range-conflict",
          dep: id,
          ranges: combinedRanges,
          why: rangeResult.reason
        };
        if (rangeResult.range !== "*") {
          let gitRefSource = VGn(info.entry.source),
            mktSource = knownMarketplaces[ts(id).marketplace ?? ""]?.source,
            isStringSource = gitRefSource === null && typeof info.entry.source === "string",
            gitUrlForLookup = isStringSource ? j5t(mktSource) : gitRefSource;
          if (gitUrlForLookup !== null) {
            let tag = await zGn(gitUrlForLookup, info.entry.name, rangeResult.range, tagLookupCache);
            if (tag === null && !isStringSource) return {
              ok: false,
              reason: "no-matching-tag",
              dep: id,
              range: rangeResult.range
            };
            if (tag === null) A(`materializeOne(${id}): no ${info.entry.name}--v* tag satisfying ${rangeResult.range} on marketplace repo; falling through to HEAD copy`);else if (resolvedTag = tag, isStringSource && typeof info.entry.source === "string") {
              let rewrittenSource = KGn(mktSource, info.entry.source);
              if (rewrittenSource !== null) effectiveEntry = {
                ...info.entry,
                source: rewrittenSource
              };
            }
          }
        }
      }
      let installed = await materializeAndRegisterPlugin(id, effectiveEntry, scope, projectPath, getLocalContainmentRoot({
        ...info,
        entry: effectiveEntry
      }), resolvedTag, auto === true || id !== pluginId, info.marketplaceInstallLocation);
      materializedIds.add(id), rootManifestDeps_2.set(id, installed.defaultEnabled), installedDepConstraints.set(id, installed.dependencies ?? []);
      for (let [depName, constraint] of installed.depConstraints ?? []) {
        if (constraint.version === undefined) continue;
        let qualified = CO(depName, id),
          existing = accumulatedConstraints.get(qualified);
        if (existing) existing.push(constraint.version);else accumulatedConstraints.set(qualified, [constraint.version]);
      }
      return {
        ok: true,
        dependencies: installed.dependencies ?? []
      };
    }
    for (let idx = resolutionResult.closure.length - 1; idx >= 0; idx--) {
      let id = resolutionResult.closure[idx];
      if (id === undefined) continue;
      let isForcedIncludeOnly = id !== pluginId && alreadyEnabledInScope.has(id),
        result;
      try {
        result = await materializeOne(id);
      } catch (err) {
        if (isForcedIncludeOnly) {
          A(`installResolvedPlugin: force-included ${id} fetch threw (${err instanceof Error ? err.message : String(err)}); skipping (pinner stays demoted)`);
          continue;
        }
        throw err;
      }
      if (!result.ok) {
        if (isForcedIncludeOnly) {
          A(result.reason === "range-conflict" ? `installResolvedPlugin: force-included ${id} has disjoint pinner ranges ${result.ranges.join(", ")}; skipping (pinner stays demoted)` : `installResolvedPlugin: force-included ${id} has no tag satisfying ${result.range}; skipping (pinner stays demoted)`);
          continue;
        }
        return rollbackEnabledPlugins(), result;
      }
      if (id === pluginId) rootManifestDeps = result.dependencies;
    }
    let rootManifestDepSet = new Set((rootManifestDeps ?? []).map(dep => CO(dep, pluginId)));
    for (let [id, ranges] of accumulatedConstraints) {
      if (closureSet.has(id) || forcedInclude.has(id) && rootManifestDepSet.has(id) || !alreadyEnabledInScope.has(id)) continue;
      let combined = ranges.concat(externalConstraints.get(id) ?? []),
        rangeResult = YOt(combined);
      if (!rangeResult.ok) return rollbackEnabledPlugins(), {
        ok: false,
        reason: "range-conflict",
        dep: id,
        ranges: combined,
        why: rangeResult.reason
      };
      let installedVersion = versionsBySource.get(id);
      if (rangeResult.range !== "*" && !zvn(installedVersion, rangeResult.range)) return rollbackEnabledPlugins(), {
        ok: false,
        reason: "range-conflict",
        dep: id,
        ranges: combined,
        why: "installed-unsatisfied",
        installed: installedVersion
      };
    }
    let pendingDepLayers = [{
      manifestDeps: rootManifestDeps,
      declaringId: pluginId
    }];
    while (pendingDepLayers.length > 0) {
      let nextLayerIds = [];
      for (let {
        manifestDeps: layerManifestDeps,
        declaringId: declaringId
      } of pendingDepLayers) {
        let collectResult = await collectNewDepsFromManifest({
          rootManifestDeps: layerManifestDeps,
          pluginId: declaringId,
          closureSet: closureSet,
          alreadyEnabled: alreadyEnabledInScope,
          forceInclude: forcedInclude,
          rootMarketplace: rootMarketplace,
          allowedCrossMarketplaces: allowedCrossMarketplaces,
          knownMarketplaces: knownMarketplaces,
          depInfo: depInfoMap
        });
        if (!collectResult.ok) {
          if (rollbackEnabledPlugins(), collectResult.blockedMarketplace) return {
            ok: false,
            reason: "dependency-marketplace-blocked-by-policy",
            pluginName: entry.name,
            blockedDependency: collectResult.blockedDependency,
            marketplaceName: collectResult.blockedMarketplace
          };
          return {
            ok: false,
            reason: "dependency-blocked-by-policy",
            pluginName: entry.name,
            blockedDependency: collectResult.blockedDependency
          };
        }
        for (let newId of collectResult.ids) {
          if (closureSet.has(newId)) continue;
          closureSet.add(newId), installQueue.push(newId), nextLayerIds.push(newId);
        }
      }
      if (nextLayerIds.length === 0) break;
      let newlyEnabled = {};
      for (let newId of nextLayerIds) newlyEnabled[newId] = true, writtenEnabledStates.set(newId, true);
      let {
        error: layerWriteError
      } = ao(settingsKey, {
        enabledPlugins: {
          ...(An(settingsKey)?.enabledPlugins ?? {}),
          ...newlyEnabled
        }
      });
      if (layerWriteError) return rollbackEnabledPlugins(), {
        ok: false,
        reason: "settings-write-failed",
        message: layerWriteError.message
      };
      let nextLayer = [];
      for (let newId of nextLayerIds) {
        let isForcedIncludeOnly = alreadyEnabledInScope.has(newId),
          result;
        try {
          result = await materializeOne(newId);
        } catch (err) {
          if (isForcedIncludeOnly) {
            A(`installResolvedPlugin: force-included ${newId} fetch threw (${err instanceof Error ? err.message : String(err)}); skipping (pinner stays demoted)`);
            continue;
          }
          throw err;
        }
        if (!result.ok) {
          if (isForcedIncludeOnly) {
            A(`installResolvedPlugin: force-included ${newId} ${result.reason}; skipping (pinner stays demoted)`);
            continue;
          }
          return rollbackEnabledPlugins(), result;
        }
        nextLayer.push({
          manifestDeps: result.dependencies,
          declaringId: newId
        });
      }
      pendingDepLayers = nextLayer;
    }
  } catch (err) {
    throw rollbackEnabledPlugins(), err;
  }
  if (rootManifestDeps !== undefined) {
    let manifestDepSet = new Set(rootManifestDeps.map(dep => CO(dep, pluginId)));
    for (let catalogDep of entry.dependencies ?? []) {
      let qualified = CO(catalogDep, pluginId);
      if (!manifestDepSet.has(qualified)) A(`Marketplace entry for ${pluginId} lists dependency "${catalogDep}" not present in plugin.json \u2014 catalog may be stale`);
    }
  }
  let finalDefaultsById = new Map(),
    finalDepsById = new Map();
  for (let id of installQueue) {
    let catalogEntry = getCatalogEntry(id);
    finalDefaultsById.set(id, catalogEntry?.defaultEnabled ?? rootManifestDeps_2.get(id) ?? true);
    let deps = (catalogEntry?.dependencies ?? []).map(dep => CO(dep, id));
    for (let de of installedDepConstraints.get(id) ?? []) deps.push(CO(de, id));
    finalDepsById.set(id, deps);
  }
  let finalEnabledState = computeEnabledStates({
      closure: installQueue,
      rootId: pluginId,
      rootRequiredByDependent: isRequiredByEnabledDependent,
      priorEnabled: priorEnabledInScope,
      explicitAnywhere: explicitAnywhere,
      defaultsById: finalDefaultsById,
      dependenciesById: finalDepsById
    }),
    enabledStateCorrections = {};
  for (let id of installQueue) {
    let prior = priorEnabledInScope[id],
      finalEnabled = finalEnabledState.get(id) ?? true;
    if (prior !== undefined && prior !== finalEnabled) continue;
    if (writtenEnabledStates.get(id) !== finalEnabled) enabledStateCorrections[id] = finalEnabled;
  }
  let correctionWriteSucceeded = true;
  if (Object.keys(enabledStateCorrections).length > 0) {
    let {
      error: correctionError
    } = ao(settingsKey, {
      enabledPlugins: {
        ...(An(settingsKey)?.enabledPlugins ?? {}),
        ...enabledStateCorrections
      }
    });
    if (correctionError) correctionWriteSucceeded = false, A(`Failed to apply defaultEnabled correction for ${pluginId}: ${correctionError.message}`, {
      level: "warn"
    });
  }
  let installedDisabled = installQueue.filter(id => finalEnabledState.get(id) === false && (correctionWriteSucceeded || writtenEnabledStates.get(id) === false));
  zh();
  let pluginMarketplace = ts(pluginId).marketplace,
    isOfficial = CD(pluginMarketplace),
    includeNameInTelemetry = isOfficial || If();
  bu("plugin_installed", {
    ...(includeNameInTelemetry && {
      "plugin.name": entry.name
    }),
    ...(includeNameInTelemetry && entry.version && {
      "plugin.version": entry.version
    }),
    ...(includeNameInTelemetry && pluginMarketplace && {
      "marketplace.name": pluginMarketplace
    }),
    "marketplace.is_official": String(isOfficial),
    ...(trigger && {
      "install.trigger": trigger
    }),
    ...(installedDisabled.includes(pluginId) && {
      "install.disabled_by_default": "true"
    })
  });
  let depNote = Uie([...materializedIds].filter(id => id !== pluginId));
  return {
    ok: true,
    closure: resolutionResult.closure,
    depNote: depNote,
    installedDisabled: installedDisabled
  };
}
function _cl({
  reason: reason,
  errorKind: errorKind,
  pluginId: pluginId,
  entry: entry,
  marketplaceName: marketplaceName,
  trigger: trigger
}) {
  W("tengu_plugin_install_failed", {
    reason: Le(reason),
    ...(errorKind && {
      error_kind: Le(errorKind)
    }),
    ...Iz(entry.name, marketplaceName, fI()),
    plugin_id: v8r(marketplaceName) ? pluginId : "third-party",
    trigger: Le(trigger),
    install_source: Ve(trigger === "hint" ? "ui-suggestion" : "ui-discover"),
    ...(entry.version && {
      version: cT(entry.version)
    })
  });
}
async function installPluginFromMarketplace({
  pluginId: pluginId,
  entry: entry,
  marketplaceName: marketplaceName,
  scope = "user",
  trigger = "user"
}) {
  try {
    let marketplaceLoc = (await Z0(pluginId))?.marketplaceInstallLocation,
      installResult = await installResolvedPlugin({
        pluginId: pluginId,
        entry: entry,
        scope: scope,
        marketplaceInstallLocation: marketplaceLoc,
        trigger: "ui"
      });
    if (!installResult.ok) switch (_cl({
      reason: installResult.reason,
      pluginId: pluginId,
      entry: entry,
      marketplaceName: marketplaceName,
      trigger: trigger
    }), installResult.reason) {
      case "local-source-no-location":
        return {
          success: false,
          error: `Cannot install local plugin "${installResult.pluginName}" without marketplace install location`
        };
      case "settings-write-failed":
        return {
          success: false,
          error: `Failed to update settings: ${installResult.message}`
        };
      case "resolution-failed":
        return {
          success: false,
          error: formatResolutionError(installResult.resolution)
        };
      case "blocked-by-policy":
        return {
          success: false,
          error: `Plugin "${installResult.pluginName}" is blocked by your organization's policy and cannot be installed`
        };
      case "dependency-blocked-by-policy":
        return {
          success: false,
          error: `Cannot install "${installResult.pluginName}": dependency "${installResult.blockedDependency}" is blocked by your organization's policy`
        };
      case "marketplace-blocked-by-policy":
        return {
          success: false,
          error: `Cannot install "${installResult.pluginName}": marketplace "${installResult.marketplaceName}" is blocked by your organization's policy`
        };
      case "dependency-marketplace-blocked-by-policy":
        return {
          success: false,
          error: `Cannot install "${installResult.pluginName}": dependency "${installResult.blockedDependency}" is from marketplace "${installResult.marketplaceName}", which is blocked by your organization's policy`
        };
      case "range-conflict":
        {
          let kind = installResult.dep === pluginId ? "Plugin" : "Dependency";
          return {
            success: false,
            error: JOt(kind, installResult.dep, installResult.ranges, installResult.why, installResult.installed)
          };
        }
      case "no-matching-tag":
        {
          let kind = installResult.dep === pluginId ? "Plugin" : "Dependency";
          return {
            success: false,
            error: Kvn(kind, installResult.dep, installResult.range)
          };
        }
    }
    W("tengu_plugin_installed", {
      ...Iz(entry.name, marketplaceName, fI()),
      plugin_id: v8r(marketplaceName) ? pluginId : "third-party",
      trigger: Le(trigger),
      install_source: Ve(trigger === "hint" ? "ui-suggestion" : "ui-discover"),
      ...(entry.version && {
        version: cT(entry.version)
      })
    });
    let enableCommandHint = t_("plugin enable", pluginId);
    return {
      success: true,
      message: installResult.installedDisabled.includes(pluginId) ? `\u2713 Installed ${entry.name}${installResult.depNote}. This plugin is disabled by default \u2014 enable it in /plugin${enableCommandHint ? ` or run: ${enableCommandHint}` : ""}` : `\u2713 Installed ${entry.name}${installResult.depNote}. Run /reload-plugins to activate.`,
      depNote: installResult.depNote,
      installedDisabled: installResult.installedDisabled.includes(pluginId)
    };
  } catch (err) {
    let message = err instanceof Error ? err.message : String(err);
    return A(`installPluginFromMarketplace failed for ${pluginId}: ${message}`, {
      level: "error"
    }), _cl({
      reason: "unexpected-error",
      errorKind: xz(err),
      pluginId: pluginId,
      entry: entry,
      marketplaceName: marketplaceName,
      trigger: trigger
    }), {
      success: false,
      error: `Failed to install: ${message}`
    };
  }
}
var ycl, Cft, p6;
var Qce = b(() => {
  kt();
  vu();
  Po();
  qe();
  Ct();
  ps();
  wm();
  br();
  eW();
  oS();
  pw();
  c6();
  Whe();
  rH();
  k8();
  dS();
  GEo();
  a1();
  oh();
  Eg();
  V4();
  II();
  Y5t();
  bk();
  DDe();
  ycl = require("crypto"), Cft = require("fs/promises"), p6 = require("path");
});

export {getCurrentTimestamp as Tcl,safeResolvePath as YGn,materializeAndRegisterPlugin as J5t,recordLocalPluginInstallation as Scl,formatResolutionError as zEo,pruneOrphanedAutoDeps as bcl,isPluginInstalledAndOnDisk as Ecl,jGn,collectNewDepsFromManifest as Szp,computeEnabledStates as gcl,installResolvedPlugin as X5t,_cl,installPluginFromMarketplace as UDe,ycl,Cft,p6,Qce};
