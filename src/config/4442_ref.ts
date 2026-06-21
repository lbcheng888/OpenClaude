// @ts-nocheck
import {cachePlugin as ept,getVersionedCachePath as DN,getVersionedZipCachePath as R0e,loadAllPluginsCacheOnly as Up,gg as mg} from "../agent/4445_resolvePluginRoot.ts";
import {Tjn as I6n,zgo as Who,MP as LP,Sjn as D6n,Mk as Pk} from "./4439_operation.ts";
import {eue as Fce,vjn as M6n,bqt as Z4t,Rjn as B6n,wjn as N6n,Eqt as eqt} from "../../vendor/m4440.ts";
import {jt,ws as bs} from "../../vendor/m228.ts";
import {Ejn as O6n,Jgo as Vho} from "../../vendor/m4439.ts";
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {gG as eG,pjn as E6n,M0e as _0e} from "./4434_path.ts";
import {gs as ms,cP as lP,lP as aP,Y3r as n3r,sh} from "../../vendor/m2589.ts";
import {getSettingsForSource as Cn,updateSettingsForSource as ao,yr as Er} from "./0740_updateSettingsForSource.ts";
import {react as Fh,N0e as y0e,W6 as D6} from "../../vendor/m4434.ts";
import {wrt as lrt,Hq as Aq} from "../../vendor/m3140.ts";
import {vtt as att,J1 as $1} from "./2678_withFileTypes.ts";
import {Fet as Tet,rz as $K} from "../../vendor/m2590.ts";
import {JUe as RUe,iL as JO,rCn as SEn,nDi as JIi,_Dt as X0t,jie as Die,yDt as Q0t,nCn as TEn,HAe as dAe} from "../../vendor/m2596.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {ds as ls,bt as St} from "../../vendor/m195.ts";
import {Uv as Lv,Lk as Dk,nI as JH} from "../../vendor/m3252.ts";
import {U0 as B0,NP as MP,V6 as O6,hS as cS} from "./4438_source.ts";
import {EEt as Xbt,ik as nk} from "../agent/0726_level.ts";
import {$D as gO,mf as gf} from "../../vendor/m702.ts";
import {wA as IA,_T as WS,$u as od} from "../mcp/2194_mcpServerName.ts";
import {Ou as Lu,uS as rS} from "./2594_event_name.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue,Qe} from "../../vendor/m5.ts";
import {oz as qK,sz as jK,tx as QR} from "../telemetry/2595_skill_name.ts";
import {BH as PH,m5 as Y8} from "../../vendor/m2230.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function getCurrentTimestamp() {
  return new Date().toISOString();
}
function safeResolvePath(baseDir, relativePath) {
  let resolvedFull = KU.resolve(baseDir, relativePath),
    resolvedBase = KU.resolve(baseDir) + KU.sep;
  if (!resolvedFull.startsWith(resolvedBase) && resolvedFull !== KU.resolve(baseDir)) throw Error(`Path traversal detected: "${relativePath}" would escape the base directory`);
  return resolvedFull;
}
async function materializeAndRegisterPlugin(pluginId, entry, scope = "user", projectPath, containmentRoot, resolvedTag, isAuto, marketplaceInstallLocation) {
  let effectiveSource = typeof entry.source === "string" && containmentRoot ? containmentRoot : entry.source,
    sourceWithRef = resolvedTag && typeof effectiveSource === "object" && (effectiveSource.source === "github" || effectiveSource.source === "url" || effectiveSource.source === "git-subdir") ? {
      ...effectiveSource,
      ref: resolvedTag.ref,
      sha: resolvedTag.sha
    } : effectiveSource,
    materializeResult = await ept(sourceWithRef, {
      manifest: entry,
      containmentRoot: typeof entry.source === "string" && containmentRoot ? marketplaceInstallLocation : undefined
    }),
    resolvedContainmentRoot = containmentRoot || materializeResult.path,
    gitSha = resolvedTag?.sha ?? materializeResult.gitCommitSha ?? (await I6n(resolvedContainmentRoot)),
    now = getCurrentTimestamp(),
    versionString = await Fce(pluginId, entry.source, materializeResult.manifest, resolvedContainmentRoot, entry.version, resolvedTag?.sha ?? materializeResult.gitCommitSha),
    finalVersion = resolvedTag && (materializeResult.manifest.version || entry.version) ? `${versionString}-${resolvedTag.sha.substring(0, 12)}` : versionString,
    versionedCachePath = DN(pluginId, finalVersion),
    installPath = materializeResult.path;
  if (materializeResult.path !== versionedCachePath) {
    await jt().mkdir(KU.dirname(versionedCachePath)), await h5_.rm(versionedCachePath, {
      recursive: true,
      force: true
    });
    let y = materializeResult.path.endsWith(KU.sep) ? materializeResult.path : materializeResult.path + KU.sep;
    if (versionedCachePath.startsWith(y)) {
      let S = KU.join(KU.dirname(materializeResult.path), `.claude-plugin-temp-${Date.now()}-${rrK.randomBytes(4).toString("hex")}`);
      await h5_.rename(materializeResult.path, S), await jt().mkdir(KU.dirname(versionedCachePath)), await h5_.rename(S, versionedCachePath);
    } else await h5_.rename(materializeResult.path, versionedCachePath);
    installPath = versionedCachePath;
  }
  let depsResult = await O6n(installPath);
  if (depsResult.error) v(`Plugin dependency install warning for ${pluginId}: ${depsResult.error}`, {
    level: "warn"
  });
  if (eG()) {
    let zipPath = R0e(pluginId, finalVersion);
    await E6n(installPath, zipPath), installPath = zipPath;
  }
  if (resolvedTag && materializeResult.manifest.version && resolvedTag.version !== materializeResult.manifest.version) v(`Tag ${resolvedTag.ref} resolved to a commit whose plugin.json says version ${materializeResult.manifest.version} \u2014 using tag-derived ${resolvedTag.version} for constraint checks`, {
    level: "warn"
  });
  return Who(pluginId, {
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
  Who(pluginRecord.pluginId, {
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
        let marketplace = ms(err.dependency).marketplace,
          marketplaceLabel = marketplace ? `marketplace "${marketplace}"` : "a different marketplace",
          allowlistHint = marketplace ? ` Add "${marketplace}" to allowCrossMarketplaceDependenciesOn in the ROOT marketplace's marketplace.json (the marketplace of the plugin you're installing \u2014 only its allowlist applies; no transitive trust).` : "";
        return `Dependency "${err.dependency}" (required by ${err.requiredBy}) is in ${marketplaceLabel}, which is not in the allowlist \u2014 cross-marketplace dependencies are blocked by default. Install it manually first.${allowlistHint}`;
      }
    case "not-found":
      {
        let {
          marketplace: marketplace
        } = ms(err.missing);
        return marketplace ? `Dependency "${err.missing}" (required by ${err.requiredBy}) not found. Is the "${marketplace}" marketplace added?` : `Dependency "${err.missing}" (required by ${err.requiredBy}) not found in any configured marketplace`;
      }
  }
}
async function pruneOrphanedAutoDeps(pluginIds, scope, projectPath, {
  deleteDataDir = true
} = {}) {
  if (pluginIds.size === 0) return [];
  let installedPlugins = LP().plugins,
    installsWithUniqueEntries = [],
    idsToCleanFromSettings = [];
  for (let id of pluginIds) {
    let installs = installedPlugins[id],
      matchingInstall = installs?.find(entry => entry.scope === scope && entry.projectPath === projectPath);
    if (!matchingInstall) continue;
    if (D6n(id, scope, projectPath), idsToCleanFromSettings.push(id), (installs?.length ?? 0) <= 1) installsWithUniqueEntries.push({
      id: id,
      installPath: matchingInstall.installPath
    });
  }
  if (idsToCleanFromSettings.length === 0) return [];
  let settingsKey = lP(scope),
    updatedEnabledPlugins = {
      ...Cn(settingsKey)?.enabledPlugins
    };
  for (let id of idsToCleanFromSettings) updatedEnabledPlugins[id] = undefined;
  let {
    error: writeError
  } = ao(settingsKey, {
    enabledPlugins: updatedEnabledPlugins
  });
  if (writeError) v(`pruneOrphanedAutoDeps: settings write failed at ${scope}: ${writeError.message}`);
  Fh();
  for (let {
    id: id,
    installPath: installPath
  } of installsWithUniqueEntries) if (await y0e(installPath), await lrt(id), deleteDataDir) await att(id);
  return Tet(installsWithUniqueEntries.map(entry => entry.id)), idsToCleanFromSettings;
}
async function isPluginInstalledAndOnDisk(pluginId, scope) {
  let settingsKey = lP(scope);
  if (!RUe(settingsKey).has(pluginId)) return false;
  let projectPath = scope !== "user" ? Pt() : undefined,
    install = LP().plugins[pluginId]?.find(entry => entry.scope === scope && entry.projectPath === projectPath);
  if (!install) return false;
  try {
    return await jt().stat(install.installPath), true;
  } catch (err) {
    if (ls(err)) return false;
    throw err;
  }
}
function getBlockedMarketplaceName(pluginId, knownMarketplaces) {
  let marketplace = ms(pluginId).marketplace,
    source = marketplace ? knownMarketplaces[marketplace]?.source : undefined;
  return source && !Lv(source) ? marketplace : undefined;
}
async function collectNewDepsFromManifest(ctx) {
  let newIds = [];
  for (let rawDep of ctx.rootManifestDeps ?? []) {
    let depId = JO(rawDep, ctx.pluginId);
    if (ctx.closureSet.has(depId) || ctx.alreadyEnabled.has(depId) && !ctx.forceInclude.has(depId)) continue;
    let depMarketplace = ms(depId).marketplace;
    if (depMarketplace !== ctx.rootMarketplace && !(depMarketplace && ctx.allowedCrossMarketplaces.has(depMarketplace)) && !ctx.alreadyEnabled.has(depId)) {
      v(`${ctx.pluginId} plugin.json declares dependency "${depId}" in a different marketplace; not auto-installing \u2014 install it manually`, {
        level: "warn"
      });
      continue;
    }
    if (Dk(depId)) return {
      ok: false,
      blockedDependency: depId
    };
    let blockedMarketplace = getBlockedMarketplaceName(depId, ctx.knownMarketplaces);
    if (blockedMarketplace) return {
      ok: false,
      blockedDependency: depId,
      blockedMarketplace: blockedMarketplace
    };
    let depEntry = await B0(depId);
    if (!depEntry) {
      v(`${ctx.pluginId} plugin.json declares dependency "${depId}" not found in any known marketplace; not auto-installing`, {
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
  let settingsKey = lP(scope);
  if (Dk(pluginId)) return {
    ok: false,
    reason: "blocked-by-policy",
    pluginName: entry.name
  };
  let knownMarketplaces = await MP(),
    blockedMkt = getBlockedMarketplaceName(pluginId, knownMarketplaces);
  if (blockedMkt) return {
    ok: false,
    reason: "marketplace-blocked-by-policy",
    pluginName: entry.name,
    marketplaceName: blockedMkt
  };
  let depInfoMap = new Map();
  if (Xbt(entry.source) && !marketplaceInstallLocation) return {
    ok: false,
    reason: "local-source-no-location",
    pluginName: entry.name
  };
  if (marketplaceInstallLocation) depInfoMap.set(pluginId, {
    entry: entry,
    marketplaceInstallLocation: marketplaceInstallLocation
  });
  let rootMarketplace = ms(pluginId).marketplace,
    allowedCrossMarketplaces = new Set((rootMarketplace ? (await O6(rootMarketplace))?.allowCrossMarketplaceDependenciesOn : undefined) ?? []),
    projectPath = scope !== "user" ? Pt() : undefined,
    allInstalledPlugins = LP().plugins,
    alreadyEnabledInScope = new Set();
  for (let id of RUe(settingsKey)) if (allInstalledPlugins[id]?.some(inst => inst.scope === scope && inst.projectPath === projectPath)) alreadyEnabledInScope.add(id);
  let allPluginsList = await Up(),
    allPlugins = allPluginsList.enabled.concat(allPluginsList.disabled),
    versionsBySource = new Map();
  for (let p of allPlugins) versionsBySource.set(p.source, p.resolvedVersion ?? p.manifest.version);
  let currentEnabledPlugins = Cn(settingsKey)?.enabledPlugins,
    forcedInclude = new Set();
  for (let p of allPlugins) {
    if (!p.depConstraints) continue;
    for (let [depName, constraint] of p.depConstraints) {
      if (constraint.version === undefined) continue;
      let qualifiedDep = JO(depName, p.source);
      if (Array.isArray(currentEnabledPlugins?.[qualifiedDep])) continue;
      if (Dk(qualifiedDep) || getBlockedMarketplaceName(qualifiedDep, knownMarketplaces)) {
        v(`installResolvedPlugin: ${qualifiedDep} version-unsatisfied but policy-blocked; not force-including`);
        continue;
      }
      if (!SEn(versionsBySource.get(qualifiedDep), constraint.version)) forcedInclude.add(qualifiedDep);
    }
  }
  let resolutionResult = await JIi(pluginId, async id => {
    if (depInfoMap.has(id)) return depInfoMap.get(id).entry;
    if (id === pluginId) return entry;
    let found = await B0(id);
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
    if (Dk(id)) return {
      ok: false,
      reason: "dependency-blocked-by-policy",
      pluginName: entry.name,
      blockedDependency: id
    };
    let mkt = getBlockedMarketplaceName(id, knownMarketplaces);
    if (mkt) return {
      ok: false,
      reason: "dependency-marketplace-blocked-by-policy",
      pluginName: entry.name,
      blockedDependency: id,
      marketplaceName: mkt
    };
  }
  let priorEnabledInScope = {
      ...(Cn(settingsKey)?.enabledPlugins ?? {})
    },
    allScopesEnabledPlugins = {};
  for (let key of gO()) Object.assign(allScopesEnabledPlugins, Cn(key)?.enabledPlugins ?? {});
  let explicitAnywhere = new Set(Object.keys(allScopesEnabledPlugins).filter(id => allScopesEnabledPlugins[id] !== undefined)),
    pluginSimpleName = ms(pluginId).name,
    isRequiredByEnabledDependent = requiredByEnabledDependent === true || allPlugins.some(p => {
      if (p.source === pluginId) return false;
      let enabledState = allScopesEnabledPlugins[p.source];
      return (enabledState !== undefined ? enabledState === true || Array.isArray(enabledState) : p.manifest.defaultEnabled !== false) && (p.manifest.dependencies ?? []).some(dep => {
        let qualified = JO(dep, p.source);
        return ms(qualified).marketplace ? qualified === pluginId : qualified === pluginSimpleName;
      });
    });
  function getCatalogEntry(id) {
    return id === pluginId ? entry : depInfoMap.get(id)?.entry;
  }
  let defaultsById = new Map(),
    dependenciesById = new Map();
  for (let id of resolutionResult.closure) {
    let catalogEntry = getCatalogEntry(id);
    defaultsById.set(id, catalogEntry?.defaultEnabled ?? true), dependenciesById.set(id, (catalogEntry?.dependencies ?? []).map(pe => JO(pe, id)));
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
    return Xbt(info.entry.source) ? safeResolvePath(info.marketplaceInstallLocation, info.entry.source) : undefined;
  }
  let materializedIds = new Set(),
    installQueue = resolutionResult.closure;
  function rollbackEnabledPlugins() {
    let se = {};
    for (let pe of installQueue) se[pe] = pe === pluginId && materializedIds.has(pe) && !Array.isArray(priorEnabledInScope[pe]) ? initialEnabledState.get(pluginId) ?? true : priorEnabledInScope[pe];
    let {
      error: ue
    } = ao(settingsKey, {
      enabledPlugins: se
    });
    if (ue) v(`Failed to roll back enabledPlugins after install failure for ${pluginId}: ${ue.message}. Retry may skip un-cached deps; manually disable then reinstall to recover.`, {
      level: "error"
    });
  }
  let rootManifestDeps,
    rootManifestDeps_2 = new Map(),
    installedDepConstraints = new Map();
  try {
    if (!depInfoMap.has(pluginId)) {
      let marketplaceLoc = (await B0(pluginId))?.marketplaceInstallLocation;
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
        let qualified = JO(depName, p.source),
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
        let rangeResult = X0t(combinedRanges);
        if (!rangeResult.ok) return {
          ok: false,
          reason: "range-conflict",
          dep: id,
          ranges: combinedRanges,
          why: rangeResult.reason
        };
        if (rangeResult.range !== "*") {
          let gitRefSource = M6n(info.entry.source),
            mktSource = knownMarketplaces[ms(id).marketplace ?? ""]?.source,
            isStringSource = gitRefSource === null && typeof info.entry.source === "string",
            gitUrlForLookup = isStringSource ? Z4t(mktSource) : gitRefSource;
          if (gitUrlForLookup !== null) {
            let tag = await B6n(gitUrlForLookup, info.entry.name, rangeResult.range, tagLookupCache);
            if (tag === null && !isStringSource) return {
              ok: false,
              reason: "no-matching-tag",
              dep: id,
              range: rangeResult.range
            };
            if (tag === null) v(`materializeOne(${id}): no ${info.entry.name}--v* tag satisfying ${rangeResult.range} on marketplace repo; falling through to HEAD copy`);else if (resolvedTag = tag, isStringSource && typeof info.entry.source === "string") {
              let qe = N6n(mktSource, info.entry.source);
              if (qe !== null) effectiveEntry = {
                ...info.entry,
                source: qe
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
      for (let [Ke, ke] of installed.depConstraints ?? []) {
        if (ke.version === undefined) continue;
        let We = JO(Ke, id),
          Ye = accumulatedConstraints.get(We);
        if (Ye) Ye.push(ke.version);else accumulatedConstraints.set(We, [ke.version]);
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
          v(`installResolvedPlugin: force-included ${id} fetch threw (${err instanceof Error ? err.message : String(err)}); skipping (pinner stays demoted)`);
          continue;
        }
        throw err;
      }
      if (!result.ok) {
        if (isForcedIncludeOnly) {
          v(result.reason === "range-conflict" ? `installResolvedPlugin: force-included ${id} has disjoint pinner ranges ${result.ranges.join(", ")}; skipping (pinner stays demoted)` : `installResolvedPlugin: force-included ${id} has no tag satisfying ${result.range}; skipping (pinner stays demoted)`);
          continue;
        }
        return rollbackEnabledPlugins(), result;
      }
      if (id === pluginId) rootManifestDeps = result.dependencies;
    }
    let rootManifestDepSet = new Set((rootManifestDeps ?? []).map(dep => JO(dep, pluginId)));
    for (let [id, ranges] of accumulatedConstraints) {
      if (closureSet.has(id) || forcedInclude.has(id) && rootManifestDepSet.has(id) || !alreadyEnabledInScope.has(id)) continue;
      let combined = ranges.concat(externalConstraints.get(id) ?? []),
        rangeResult = X0t(combined);
      if (!rangeResult.ok) return rollbackEnabledPlugins(), {
        ok: false,
        reason: "range-conflict",
        dep: id,
        ranges: combined,
        why: rangeResult.reason
      };
      let installedVersion = versionsBySource.get(id);
      if (rangeResult.range !== "*" && !SEn(installedVersion, rangeResult.range)) return rollbackEnabledPlugins(), {
        ok: false,
        reason: "range-conflict",
        dep: id,
        ranges: combined,
        why: "installed-unsatisfied",
        installed: installedVersion
      };
    }
    let newDepsResult = [{
      manifestDeps: rootManifestDeps,
      declaringId: pluginId
    }];
    while (newDepsResult.length > 0) {
      let he = [];
      for (let {
        manifestDeps: we,
        declaringId: Be
      } of newDepsResult) {
        let Ke = await collectNewDepsFromManifest({
          rootManifestDeps: we,
          pluginId: Be,
          closureSet: closureSet,
          alreadyEnabled: alreadyEnabledInScope,
          forceInclude: forcedInclude,
          rootMarketplace: rootMarketplace,
          allowedCrossMarketplaces: allowedCrossMarketplaces,
          knownMarketplaces: knownMarketplaces,
          depInfo: depInfoMap
        });
        if (!Ke.ok) {
          if (rollbackEnabledPlugins(), Ke.blockedMarketplace) return {
            ok: false,
            reason: "dependency-marketplace-blocked-by-policy",
            pluginName: entry.name,
            blockedDependency: Ke.blockedDependency,
            marketplaceName: Ke.blockedMarketplace
          };
          return {
            ok: false,
            reason: "dependency-blocked-by-policy",
            pluginName: entry.name,
            blockedDependency: Ke.blockedDependency
          };
        }
        for (let ke of Ke.ids) {
          if (closureSet.has(ke)) continue;
          closureSet.add(ke), installQueue.push(ke), he.push(ke);
        }
      }
      if (he.length === 0) break;
      let ge = {};
      for (let we of he) ge[we] = true, writtenEnabledStates.set(we, true);
      let {
        error: Ce
      } = ao(settingsKey, {
        enabledPlugins: {
          ...(Cn(settingsKey)?.enabledPlugins ?? {}),
          ...ge
        }
      });
      if (Ce) return rollbackEnabledPlugins(), {
        ok: false,
        reason: "settings-write-failed",
        message: Ce.message
      };
      let xe = [];
      for (let we of he) {
        let Be = alreadyEnabledInScope.has(we),
          Ke;
        try {
          Ke = await materializeOne(we);
        } catch (ke) {
          if (Be) {
            v(`installResolvedPlugin: force-included ${we} fetch threw (${ke instanceof Error ? ke.message : String(ke)}); skipping (pinner stays demoted)`);
            continue;
          }
          throw ke;
        }
        if (!Ke.ok) {
          if (Be) {
            v(`installResolvedPlugin: force-included ${we} ${Ke.reason}; skipping (pinner stays demoted)`);
            continue;
          }
          return rollbackEnabledPlugins(), Ke;
        }
        xe.push({
          manifestDeps: Ke.dependencies,
          declaringId: we
        });
      }
      newDepsResult = xe;
    }
  } catch (err) {
    throw rollbackEnabledPlugins(), err;
  }
  if (rootManifestDeps !== undefined) {
    let manifestDepSet = new Set(rootManifestDeps.map(dep => JO(dep, pluginId)));
    for (let catalogDep of entry.dependencies ?? []) {
      let qualified = JO(catalogDep, pluginId);
      if (!manifestDepSet.has(qualified)) v(`Marketplace entry for ${pluginId} lists dependency "${catalogDep}" not present in plugin.json \u2014 catalog may be stale`);
    }
  }
  let finalDefaultsById = new Map(),
    finalDepsById = new Map();
  for (let id of installQueue) {
    let catalogEntry = getCatalogEntry(id);
    finalDefaultsById.set(id, catalogEntry?.defaultEnabled ?? rootManifestDeps_2.get(id) ?? true);
    let deps = (catalogEntry?.dependencies ?? []).map(dep => JO(dep, id));
    for (let de of installedDepConstraints.get(id) ?? []) deps.push(JO(de, id));
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
        ...(Cn(settingsKey)?.enabledPlugins ?? {}),
        ...enabledStateCorrections
      }
    });
    if (correctionError) correctionWriteSucceeded = false, v(`Failed to apply defaultEnabled correction for ${pluginId}: ${correctionError.message}`, {
      level: "warn"
    });
  }
  let installedDisabled = installQueue.filter(id => finalEnabledState.get(id) === false && (correctionWriteSucceeded || writtenEnabledStates.get(id) === false));
  Fh();
  let pluginMarketplace = ms(pluginId).marketplace,
    isOfficial = aP(pluginMarketplace),
    includeNameInTelemetry = isOfficial || IA();
  Lu("plugin_installed", {
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
  let depNote = Die([...materializedIds].filter(id => id !== pluginId));
  return {
    ok: true,
    closure: resolutionResult.closure,
    depNote: depNote,
    installedDisabled: installedDisabled
  };
}
function trackPluginInstallFailure({
  reason: reason,
  errorKind: errorKind,
  pluginId: pluginId,
  entry: entry,
  marketplaceName: marketplaceName,
  trigger: trigger
}) {
  j("tengu_plugin_install_failed", {
    reason: Ue(reason),
    ...(errorKind && {
      error_kind: Ue(errorKind)
    }),
    ...qK(entry.name, marketplaceName, PH()),
    plugin_id: n3r(marketplaceName) ? pluginId : "third-party",
    trigger: Ue(trigger),
    install_source: Qe(trigger === "hint" ? "ui-suggestion" : "ui-discover"),
    ...(entry.version && {
      version: WS(entry.version)
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
    let marketplaceLoc = (await B0(pluginId))?.marketplaceInstallLocation,
      installResult = await installResolvedPlugin({
        pluginId: pluginId,
        entry: entry,
        scope: scope,
        marketplaceInstallLocation: marketplaceLoc,
        trigger: "ui"
      });
    if (!installResult.ok) switch (trackPluginInstallFailure({
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
          let l = installResult.dep === pluginId ? "Plugin" : "Dependency";
          return {
            success: false,
            error: Q0t(l, installResult.dep, installResult.ranges, installResult.why, installResult.installed)
          };
        }
      case "no-matching-tag":
        {
          let l = installResult.dep === pluginId ? "Plugin" : "Dependency";
          return {
            success: false,
            error: TEn(l, installResult.dep, installResult.range)
          };
        }
    }
    return j("tengu_plugin_installed", {
      ...qK(entry.name, marketplaceName, PH()),
      plugin_id: n3r(marketplaceName) ? pluginId : "third-party",
      trigger: Ue(trigger),
      install_source: Qe(trigger === "hint" ? "ui-suggestion" : "ui-discover"),
      ...(entry.version && {
        version: WS(entry.version)
      })
    }), {
      success: true,
      message: installResult.installedDisabled.includes(pluginId) ? `\u2713 Installed ${entry.name}${installResult.depNote}. This plugin is disabled by default \u2014 enable it in /plugin or run: claude plugin enable ${pluginId}` : `\u2713 Installed ${entry.name}${installResult.depNote}. Run /reload-plugins to activate.`,
      depNote: installResult.depNote,
      installedDisabled: installResult.installedDisabled.includes(pluginId)
    };
  } catch (err) {
    let message = err instanceof Error ? err.message : String(err);
    return v(`installPluginFromMarketplace failed for ${pluginId}: ${message}`, {
      level: "error"
    }), trackPluginInstallFailure({
      reason: "unexpected-error",
      errorKind: jK(err),
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
var rrK, h5_, KU;
var r4H = b(() => {
  Ct();
  od();
  Ko();
  je();
  St();
  bs();
  gf();
  Er();
  $K();
  rS();
  QR();
  D6();
  dAe();
  Pk();
  Y8();
  cS();
  Vho();
  $1();
  sh();
  mg();
  Aq();
  JH();
  eqt();
  nk();
  _0e();
  rrK = require("crypto"), h5_ = require("fs/promises"), KU = require("path");
});

export {getCurrentTimestamp as Pnl,safeResolvePath as kjn,materializeAndRegisterPlugin as Cqt,recordLocalPluginInstallation as Onl,formatResolutionError as Zgo,pruneOrphanedAutoDeps as Lnl,isPluginInstalledAndOnDisk as Mnl,getBlockedMarketplaceName as xjn,collectNewDepsFromManifest as Nqp,computeEnabledStates as Hnl,installResolvedPlugin as vqt,trackPluginInstallFailure as Inl,installPluginFromMarketplace as W0e,rrK as Dnl,h5_ as Ept,KU as K6,r4H as tue};
