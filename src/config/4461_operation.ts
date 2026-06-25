// @ts-nocheck
import {hw as ex,a1 as $1} from "./2689_withFileTypes.ts";
import {logForDebugging as v,qe as je} from "./0236_setHasFormattedOutput.ts";
import {Xd as Ip,cn as ln,In as Dn,Ce as Se,sp as Jp,mo as _o,Ct as St} from "../../vendor/m197.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {Wt as jt,ps as bs} from "../../vendor/m230.ts";
import {qt as Wt,TeamDeleteToolName as Oe,tn as Xt} from "./0230_encoding.ts";
import {XRt as Qbt,QRt as Zbt,bk as nk} from "../agent/0731_level.ts";
import {R5 as Gj,Pv as ek} from "../../vendor/m639.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {getPluginCachePath as T0e,getVersionedCachePath as DN,path as mg} from "../agent/4467_resolvePluginRoot.ts";
import {getOriginalCwd as gr,lt as ct} from "../session/0132_sent.ts";
import {getSettings_DEPRECATED as es,getSettingsForSource as Cn,getSettingsFilePathForSource as ZA,br as Er} from "./0745_updateSettingsForSource.ts";
import {getHeadForDir as _bt,VP as hO} from "../../vendor/m696.ts";
import {isTmuxControlMode as Pt,Po as Ko} from "../../vendor/m638.ts";
import {a2 as k2,wm as gf} from "../../vendor/m707.ts";
import {Fvn as pEn,ts as ms,oh as sh} from "../../vendor/m2600.ts";
import {Z0 as B0,dS as cS} from "./4460_source.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function Kp_() {
  return Qc.join(ex(), "installed_plugins.json");
}
function nxO() {
  return Qc.join(ex(), "installed_plugins_v2.json");
}
function LeK() {
  Q_H = null, L3_ = null, v("Cleared installed plugins cache");
}
function Op_(operation, err, recovered) {
  let errorKind = err instanceof SyntaxError ? "syntax-error" : err instanceof Error && err.name === "ZodError" ? "validation-error" : Ip(err) ?? "unknown";
  j("tengu_plugin_state_file_error", {
    operation: Ue(operation),
    error_kind: errorKind,
    recovered: recovered
  });
}
function ixO() {
  if (claudeInChromeWiredThisSession) return;
  let fs = jt(),
    installedPluginsPath = Kp_(),
    legacyV2Path = nxO();
  try {
    try {
      fs.renameSync(legacyV2Path, installedPluginsPath), v("Renamed installed_plugins_v2.json to installed_plugins.json");
      let i = $0();
      GeK(i), claudeInChromeWiredThisSession = true;
      return;
    } catch (renameErr) {
      let errCode = ln(renameErr);
      if (errCode !== "ENOENT" && errCode !== "EEXIST") throw renameErr;
      if (errCode === "EEXIST") try {
        fs.unlinkSync(legacyV2Path);
      } catch {}
    }
    let rawContent;
    try {
      rawContent = fs.readFileSync(installedPluginsPath, {
        encoding: "utf-8"
      });
    } catch (readErr) {
      if (!Dn(readErr)) throw readErr;
      claudeInChromeWiredThisSession = true;
      return;
    }
    let parsed = Wt(rawContent);
    if ((typeof parsed?.version === "number" ? parsed.version : 1) === 1) {
      let v1Data = Qbt().parse(parsed),
        v2Data = HYq(v1Data);
      Gj(installedPluginsPath, Oe(v2Data, null, 2)), v(`Converted installed_plugins.json from V1 to V2 format (${Object.keys(v1Data.plugins).length} plugins)`), GeK(v2Data);
    }
    claudeInChromeWiredThisSession = true;
  } catch (err) {
    let errMsg = Se(err);
    if (v(`Failed to migrate plugin files: ${errMsg}`, {
      level: "error"
    }), !Jp(err) && !(err instanceof SyntaxError)) Ie(_o(err));
    Op_("migrate-single-file", err, true), claudeInChromeWiredThisSession = true;
  }
}
function GeK(installedData) {
  let fs = jt(),
    pluginCacheDir = T0e();
  try {
    let activePaths = new Set();
    for (let installations of Object.values(installedData.plugins)) for (let entry of installations) activePaths.add(entry.installPath);
    let dirEntries = fs.readdirSync(pluginCacheDir);
    for (let entry of dirEntries) {
      if (!entry.isDirectory()) continue;
      let dirName = entry.name,
        fullPath = Qc.join(pluginCacheDir, dirName);
      if (fs.readdirSync(fullPath).some(sub => {
        if (!sub.isDirectory()) return false;
        let subPath = Qc.join(fullPath, sub.name);
        return fs.readdirSync(subPath).some(inner => inner.isDirectory());
      })) continue;
      if (!activePaths.has(fullPath)) fs.rmSync(fullPath, {
        recursive: true,
        force: true
      }), v(`Cleaned up legacy cache directory: ${dirName}`);
    }
  } catch (err) {
    let errMsg = Se(err);
    v(`Failed to clean up legacy cache: ${errMsg}`, {
      level: "warn"
    });
  }
}
function e$q() {
  let fs = jt(),
    filePath = Kp_(),
    rawContent;
  try {
    rawContent = fs.readFileSync(filePath, {
      encoding: "utf-8"
    });
  } catch (err) {
    if (Dn(err)) return null;
    throw err;
  }
  let parsed = Wt(rawContent);
  return {
    version: typeof parsed?.version === "number" ? parsed.version : 1,
    data: parsed
  };
}
function HYq(v1Data) {
  let v2Plugins = {};
  for (let [pluginId, entry] of Object.entries(v1Data.plugins)) {
    let cachedPath = DN(pluginId, entry.version);
    v2Plugins[pluginId] = [{
      scope: "user",
      installPath: cachedPath,
      version: entry.version,
      installedAt: entry.installedAt,
      lastUpdated: entry.lastUpdated,
      gitCommitSha: entry.gitCommitSha
    }];
  }
  return {
    version: 2,
    plugins: v2Plugins
  };
}
function $0() {
  if (Q_H !== null) return Q_H;
  let filePath = Kp_();
  try {
    let raw = e$q();
    if (raw) {
      if (raw.version === 2) {
        let parsed = Zbt().parse(raw.data);
        return Q_H = parsed, v(`Loaded ${Object.keys(parsed.plugins).length} installed plugins from ${filePath}`), parsed;
      }
      let v1Parsed = Qbt().parse(raw.data),
        converted = HYq(v1Parsed);
      return Q_H = converted, v(`Loaded and converted ${Object.keys(v1Parsed.plugins).length} plugins from V1 format`), converted;
    }
    return v("installed_plugins.json doesn't exist, returning empty V2 object"), Q_H = {
      version: 2,
      plugins: {}
    }, Q_H;
  } catch (err) {
    let errMsg = Se(err);
    if (v(`Failed to load installed_plugins.json: ${errMsg}. Starting with empty state.`, {
      level: "error"
    }), !Jp(err) && !(err instanceof SyntaxError)) Ie(_o(err));
    return Op_("load", err, true), Q_H = {
      version: 2,
      plugins: {}
    }, Q_H;
  }
}
function Tp_(installedData) {
  let fs = jt(),
    filePath = Kp_();
  try {
    fs.mkdirSync(ex());
    let serialized = Oe(installedData, null, 2);
    Gj(filePath, serialized), Q_H = installedData, v(`Saved ${Object.keys(installedData.plugins).length} installed plugins to ${filePath}`);
  } catch (err) {
    throw v(`Failed to save installed_plugins.json to ${filePath}: ${Se(err)}`, {
      level: "error"
    }), Op_("save", err, false), err;
  }
}
function zU6(pluginId, scope, projectPath) {
  let installed = hk(),
    installations = installed.plugins[pluginId];
  if (!installations) return;
  if (installed.plugins[pluginId] = installations.filter(entry => !(entry.scope === scope && entry.projectPath === projectPath)), installed.plugins[pluginId].length === 0) delete installed.plugins[pluginId];
  Tp_(installed), v(`Removed installation for ${pluginId} at scope ${scope}`);
}
function zp_() {
  if (L3_ === null) L3_ = $0();
  return L3_;
}
function hk() {
  try {
    let raw = e$q();
    if (raw) {
      if (raw.version === 2) return Zbt().parse(raw.data);
      let v1 = Qbt().parse(raw.data);
      return HYq(v1);
    }
    return {
      version: 2,
      plugins: {}
    };
  } catch (err) {
    let errMsg = Se(err);
    return v(`Failed to load installed plugins from disk: ${errMsg}`, {
      level: "error"
    }), Op_("load-from-disk", err, true), {
      version: 2,
      plugins: {}
    };
  }
}
function writeToTempFile(pluginId, scope, projectPath, newInstallPath, newVersion, newGitSha, newResolvedVersion) {
  let installed = hk(),
    installations = installed.plugins[pluginId];
  if (!installations) {
    v(`Cannot update ${pluginId} on disk: plugin not found in installed plugins`);
    return;
  }
  let entry = installations.find(e => e.scope === scope && e.projectPath === projectPath);
  if (entry) {
    if (entry.installPath = newInstallPath, entry.version !== undefined) entry.version = newVersion;
    if (newResolvedVersion !== undefined) entry.resolvedVersion = newResolvedVersion;else delete entry.resolvedVersion;
    if (entry.lastUpdated = new Date().toISOString(), newGitSha !== undefined) entry.gitCommitSha = newGitSha;
    let filePath = Kp_();
    Gj(filePath, Oe(installed, null, 2)), Q_H = null, v(`Updated ${pluginId} on disk to version ${newVersion} at ${newInstallPath}`);
  } else v(`Cannot update ${pluginId} on disk: no installation for scope ${scope}`);
}
async function moduleNamespace() {
  ixO();
  try {
    await qYq();
  } catch (err) {
    if (Jp(err) || err instanceof SyntaxError) v(`Plugin migration skipped (fs/parse error): ${Se(err)}`, {
      level: "error"
    });else Ie(err);
    Op_("migrate-from-enabled", err, true);
  }
  let installed = zp_();
  v(`Initialized versioned plugins system with ${Object.keys(installed.plugins).length} plugins`);
}
function ZeK(marketplaceName) {
  if (!marketplaceName) return {
    orphanedPaths: [],
    removedPluginIds: []
  };
  let installed = hk(),
    suffix = `@${marketplaceName}`,
    orphanedPaths = new Set(),
    removedIds = [];
  for (let pluginId of Object.keys(installed.plugins)) {
    if (!pluginId.endsWith(suffix)) continue;
    for (let entry of installed.plugins[pluginId] ?? []) if (entry.installPath) orphanedPaths.add(entry.installPath);
    delete installed.plugins[pluginId], removedIds.push(pluginId), v(`Removed installed plugin for marketplace removal: ${pluginId}`);
  }
  if (removedIds.length > 0) Tp_(installed);
  return {
    orphanedPaths: Array.from(orphanedPaths),
    removedPluginIds: removedIds
  };
}
function fLH(entry) {
  return entry.scope === "user" || entry.scope === "managed" || entry.projectPath === gr();
}
function $U6(...versions) {
  let found = versions.find(v => v && v !== "unknown");
  return found ? `v${found}` : undefined;
}
function YB(pluginId) {
  let installations = $0().plugins[pluginId];
  if (!installations || installations.length === 0) return false;
  if (!installations.some(fLH)) return false;
  return es().enabledPlugins?.[pluginId] !== undefined;
}
function wUH(pluginId) {
  let installations = $0().plugins[pluginId];
  if (!installations || installations.length === 0) return false;
  if (!installations.some(e => e.scope === "user" || e.scope === "managed")) return false;
  return es().enabledPlugins?.[pluginId] !== undefined;
}
function _Yq(pluginId, newEntry, scope = "user", projectPath) {
  let installed = hk(),
    existingList = installed.plugins[pluginId] || [],
    existingIdx = existingList.findIndex(e => e.scope === scope && e.projectPath === projectPath),
    wasManuallyInstalled = existingIdx >= 0 && existingList[existingIdx]?.auto !== true,
    shouldMarkAuto = newEntry.auto === true && !wasManuallyInstalled,
    entryToWrite = {
      scope: scope,
      installPath: newEntry.installPath,
      version: newEntry.version,
      installedAt: newEntry.installedAt,
      lastUpdated: newEntry.lastUpdated,
      gitCommitSha: newEntry.gitCommitSha,
      ...(newEntry.resolvedVersion && {
        resolvedVersion: newEntry.resolvedVersion
      }),
      ...(projectPath && {
        projectPath: projectPath
      }),
      ...(shouldMarkAuto && {
        auto: true
      })
    },
    isUpdate = existingIdx >= 0;
  if (isUpdate) existingList[existingIdx] = entryToWrite;else existingList.push(entryToWrite);
  installed.plugins[pluginId] = existingList, Tp_(installed), L3_ = null, v(`${isUpdate ? "Updated" : "Added"} installed plugin: ${pluginId} (scope: ${scope})`);
}
function yeK(pluginId, scope, projectPath) {
  let installed = hk(),
    entry = installed.plugins[pluginId]?.find(e => e.scope === scope && e.projectPath === projectPath);
  if (entry?.auto !== true) return false;
  return delete entry.auto, Tp_(installed), L3_ = null, true;
}
async function TU6(dir) {
  return (await _bt(dir)) ?? undefined;
}
async function ReK(pluginDir, pluginId) {
  let fs = jt(),
    manifestPath = Qc.join(pluginDir, ".claude-plugin", "plugin.json");
  try {
    let rawBytes = await fs.readFileBytes(manifestPath, 65537);
    if (rawBytes.length > 65536) return v(`Manifest for ${pluginId} exceeds 64 KB, treating as unversioned`), "unknown";
    return Wt(rawBytes.toString("utf-8")).version || "unknown";
  } catch {
    return v(`Could not extract version from manifest for ${pluginId}`), "unknown";
  }
}
async function qYq() {
  let managedPluginIds = new Set(Object.entries(Cn("policySettings")?.enabledPlugins || {}).filter(([id, val]) => id.includes("@") && val === true).map(([id]) => id)),
    currentCwd = Pt(),
    pluginScopeMap = new Map(),
    seenFilePaths = new Set();
  for (let source of k2) {
    let filePath = ZA(source);
    if (filePath) {
      if (seenFilePaths.has(filePath)) continue;
      seenFilePaths.add(filePath);
    }
    let enabledInSource = Cn(source)?.enabledPlugins || {};
    for (let id of Object.keys(enabledInSource)) {
      if (!id.includes("@")) continue;
      let scopeLabel = pEn(source);
      pluginScopeMap.set(id, {
        scope: scopeLabel,
        projectPath: scopeLabel === "user" ? undefined : currentCwd
      });
    }
  }
  for (let id of managedPluginIds) pluginScopeMap.set(id, {
    scope: "managed",
    projectPath: undefined
  });
  let rawFile = e$q(),
    fileExists = rawFile !== null,
    isV2 = fileExists && rawFile?.version === 2;
  if (pluginScopeMap.size === 0 && !fileExists) return;
  if (isV2 && rawFile) {
    let parsed = Zbt().safeParse(rawFile.data);
    if (parsed?.success) {
      let existingPlugins = parsed.data.plugins,
        allAccountedFor = [...pluginScopeMap.keys()].every(id => {
          let installs = existingPlugins[id];
          if (!installs || installs.length === 0) return false;
          if (managedPluginIds.has(id)) return installs.length === 1 && installs[0]?.scope === "managed";
          return true;
        }),
        noOrphanedManaged = Object.entries(existingPlugins).every(([id, installs]) => managedPluginIds.has(id) || !installs.some(e => e.scope === "managed"));
      if (allAccountedFor && noOrphanedManaged) {
        v("All plugins already exist, skipping migration");
        return;
      }
    }
  }
  v(fileExists ? "Syncing installed_plugins.json with enabledPlugins from all settings.json files" : "Creating installed_plugins.json from settings.json files");
  let now = new Date().toISOString(),
    mergedPlugins = {};
  if (fileExists) mergedPlugins = {
    ...$0().plugins
  };
  let updatedCount = 0,
    addedCount = 0;
  for (let [id, installs] of Object.entries(mergedPlugins)) {
    if (managedPluginIds.has(id)) continue;
    if (pluginScopeMap.has(id)) continue;
    if (!installs.some(e => e.scope === "managed")) continue;
    let filtered = installs.filter(e => e.scope !== "managed");
    if (filtered.length === 0) delete mergedPlugins[id];else mergedPlugins[id] = filtered;
    updatedCount++, v(`Dropped orphaned managed entry for ${id} (no longer policy-required)`);
  }
  for (let [id, scopeInfo] of pluginScopeMap) {
    let existingInstalls = mergedPlugins[id];
    if (existingInstalls && existingInstalls.length > 0) {
      let firstEntry = existingInstalls[0],
        changed = false;
      if (firstEntry && (firstEntry.scope !== scopeInfo.scope || firstEntry.projectPath !== scopeInfo.projectPath)) {
        if (firstEntry.scope = scopeInfo.scope, scopeInfo.projectPath) firstEntry.projectPath = scopeInfo.projectPath;else delete firstEntry.projectPath;
        firstEntry.lastUpdated = now, changed = true, v(`Updated ${id} scope to ${scopeInfo.scope} (settings.json is source of truth)`);
      }
      if (scopeInfo.scope === "managed") {
        if (existingInstalls.length > 1) v(`Collapsed ${id} to single managed entry (was ${existingInstalls.length})`), mergedPlugins[id] = existingInstalls.slice(0, 1), changed = true;
      } else if (existingInstalls.length > 1) {
        let seen = new Set(),
          deduped = existingInstalls.filter(e => {
            if (e.scope === "managed") return false;
            let key = `${e.scope}|${e.projectPath ?? ""}`;
            if (seen.has(key)) return false;
            return seen.add(key), true;
          });
        if (deduped.length < existingInstalls.length) v(`Cleaned ${id} (${existingInstalls.length}\u2192${deduped.length}: stripped stale managed and/or dedupes)`), mergedPlugins[id] = deduped, changed = true;
      }
      if (changed) updatedCount++;
    } else {
      let {
        name: pluginName,
        marketplace: marketplaceName
      } = ms(id);
      if (!pluginName || !marketplaceName) continue;
      try {
        v(`Looking up plugin ${id} in marketplace ${marketplaceName}`);
        let found = await B0(id);
        if (!found) {
          v(`Plugin ${id} not found in any marketplace, skipping`);
          continue;
        }
        let {
            entry: pluginEntry,
            marketplaceInstallLocation: marketplaceInstallLocation
          } = found,
          resolvedInstallPath,
          resolvedVersion,
          resolvedGitSha = undefined;
        if (typeof pluginEntry.source === "string") {
          let srcPath = Qc.join(marketplaceInstallLocation, pluginEntry.source);
          if (resolvedVersion = await ReK(srcPath, id), resolvedGitSha = await TU6(srcPath), resolvedVersion === "unknown" && pluginEntry.version) resolvedVersion = pluginEntry.version;
          if (resolvedVersion === "unknown" && resolvedGitSha) resolvedVersion = resolvedGitSha.substring(0, 12);
          resolvedInstallPath = DN(id, resolvedVersion);
        } else {
          let versionedBaseDir = Qc.dirname(DN(id, "x")),
            cachedVersionDirs;
          try {
            cachedVersionDirs = (await jt().readdir(versionedBaseDir)).filter(e => e.isDirectory()).map(e => e.name);
          } catch (readErr) {
            if (!Dn(readErr)) throw readErr;
            v(`External plugin ${id} not in cache, skipping`);
            continue;
          }
          if (cachedVersionDirs.length === 0) {
            v(`External plugin ${id} has no cached versions, skipping`);
            continue;
          }
          let preferredPath = pluginEntry.version ? DN(id, pluginEntry.version) : undefined,
            chosenPath = preferredPath && cachedVersionDirs.includes(Qc.basename(preferredPath)) ? preferredPath : Qc.join(versionedBaseDir, cachedVersionDirs[0]),
            chosenDirName = Qc.basename(chosenPath);
          resolvedInstallPath = chosenPath, resolvedGitSha = await TU6(chosenPath);
          let H = !("sha" in pluginEntry.source && pluginEntry.source.sha) && !pluginEntry.version && /^[0-9a-f]{12}(-[0-9a-f]{8})?$/.test(chosenDirName) && (await ReK(chosenPath, id)) === "unknown";
          if (resolvedVersion = H ? undefined : chosenDirName, H) v(`External plugin ${id} is ref-tracked (cache dir ${chosenDirName} is a git SHA, no manifest version), recording without a version so the loader re-clones it each load`);
        }
        mergedPlugins[id] = [{
          scope: scopeInfo.scope,
          installPath: resolvedInstallPath,
          ...(resolvedVersion !== undefined && {
            version: resolvedVersion
          }),
          installedAt: now,
          lastUpdated: now,
          gitCommitSha: resolvedGitSha,
          ...(scopeInfo.projectPath && {
            projectPath: scopeInfo.projectPath
          })
        }], addedCount++, v(`Added ${id} with scope ${scopeInfo.scope}`);
      } catch (lookupErr) {
        v(`Failed to add plugin ${id}: ${lookupErr}`);
      }
    }
  }
  if (!fileExists || updatedCount > 0 || addedCount > 0) Tp_({
    version: 2,
    plugins: mergedPlugins
  }), v(`Sync completed: ${addedCount} added, ${updatedCount} updated in installed_plugins.json`);
}
var Qc,
  claudeInChromeWiredThisSession = false,
  Q_H = null,
  L3_ = null;
var RZ = b(() => {
  Ct();
  ek();
  je();
  St();
  bs();
  wn();
  Xt();
  $1();
  nk();
  ct();
  Ko();
  hO();
  gf();
  Er();
  cS();
  sh();
  mg();
  Qc = require("path");
});
export {Kp_ as G5t,nxO as hzp,LeK as lcl,Op_ as V5t,ixO as gzp,GeK as icl,e$q as UEo,HYq as $Eo,$0 as Uw,Tp_ as K5t,zU6 as $Gn,zp_ as z5t,hk as eP,writeToTempFile as ccl,moduleNamespace as ucl,ZeK as scl,fLH as BDe,$U6 as qGn,YB as rq,wUH as k8e,_Yq as qEo,yeK as dcl,TU6 as UGn,ReK as acl,qYq as WEo,Qc as LG,claudeInChromeWiredThisSession as W5t,Q_H as ine,L3_ as Eft,RZ as rH};
