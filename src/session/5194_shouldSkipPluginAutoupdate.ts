// @ts-nocheck
import {isFullscreenWithTTY as pt,ro as Pr,b} from "../../runtime.ts";
import {NOTIFICATION_CHANNELS as utn,EDITOR_MODES as dtn,lEt as ptn} from "../../vendor/m714.ts";
import {getIsNonInteractiveSession as kr,getSessionTrustAccepted as RWe,getOriginalCwd as gr,lt as ct} from "./0131_sent.ts";
import {st as rt,fromEnum as Ue} from "../../vendor/m5.ts";
import {_i as wi,hp as gp} from "./1460_promise.ts";
import {u7 as XV,Iu as Pu} from "../../vendor/m643.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {RH as bH} from "../config/0571_externalHttp.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {jt,ws as bs} from "../../vendor/m228.ts";
import {Fa,V3 as H3,Pd as Pp} from "../../vendor/m701.ts";
import {Gi as qi,ReactHooks as Jd} from "../../vendor/m133.ts";
import {hH as pH,Kx as Wx} from "../../vendor/m128.ts";
import {Vk as qk,Nzn as YKn} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {sv as nv,Epe as ope} from "../../vendor/m434.ts";
import {Le as Oe,qt as Wt,Xt} from "../config/0228_encoding.ts";
import {Pbt as lbt,mc} from "../config/0645_maxBytes.ts";
import {w9s as g$s} from "../../vendor/m1474.ts";
import {dn as ln,T2 as d2,bt as St} from "../../vendor/m195.ts";
import {kn as xn,SA as wA} from "../config/0689_timestamp.ts";
import {tr as sr,sn as an} from "../config/0047_namespace.ts";
import {je as Ge} from "../../vendor/m577.ts";
import {A7e as XVe,Ap as hp} from "../config/0614_Ap.ts";
import {RR as wR,h7 as r7} from "../../vendor/m704.ts";
import {TFe as XBe,tA as iA} from "../config/2201_tA.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {Ba,findCanonicalGitRoot as Uf} from "../../vendor/m693.ts";
import {SFe as QCe,Jfi as $mi} from "../../vendor/m2201.ts";
import {bv as hv,G_n as s_n} from "../config/2204_shouldShowLaunchComposer.ts";
// @ts-nocheck
var $i = {};
pt($i, {
  shouldSkipPluginAutoupdate: () => shouldSkipPluginAutoupdate,
  setPathTrusted: () => setPathTrusted,
  saveGlobalConfig: () => saveGlobalConfig,
  saveCurrentProjectConfig: () => saveCurrentProjectConfig,
  resetTrustDialogAcceptedCache: () => resetTrustDialogAcceptedCache,
  recordFirstStartTime: () => recordFirstStartTime,
  isProjectScopeTrustAccepted: () => isProjectScopeTrustAccepted,
  isProjectConfigKey: () => isProjectConfigKey,
  isPathTrusted: () => isPathTrusted,
  isGlobalConfigKey: () => isGlobalConfigKey,
  isAutoUpdaterDisabled: () => isAutoUpdaterDisabled,
  getUserClaudeRulesDir: () => getUserClaudeRulesDir,
  getRemoteControlAtStartup: () => getRemoteControlAtStartup,
  getRawCurrentProjectConfigEntry: () => getRawCurrentProjectConfigEntry,
  getProjectPathForConfig: () => getProjectPathForConfig,
  getOrCreateUserID: () => getOrCreateUserID,
  getOrCreateMachineID: () => getOrCreateMachineID,
  getMemoryPath: () => getMemoryPath,
  getManagedClaudeRulesDir: () => getManagedClaudeRulesDir,
  getGlobalConfig: () => getGlobalConfig,
  getDaemonColdStart: () => getDaemonColdStart,
  getCustomApiKeyStatus: () => getCustomApiKeyStatus,
  getCurrentProjectConfig: () => getCurrentProjectConfig,
  getAutoUpdaterDisabledReason: () => getAutoUpdaterDisabledReason,
  formatAutoUpdaterDisabledReason: () => formatAutoUpdaterDisabledReason,
  enableConfigs: () => enableConfigs,
  deleteProjectConfig: () => deleteProjectConfig,
  deleteCurrentProjectConfigFields: () => deleteCurrentProjectConfigFields,
  checkHasTrustDialogAccepted: () => checkHasTrustDialogAccepted,
  _wouldLoseAuthStateForTesting: () => _wouldLoseAuthStateForTesting,
  _setGlobalConfigCacheForTesting: () => _setGlobalConfigCacheForTesting,
  _removeProjectHistoryForTesting: () => _getConfigForTesting,
  _getConfigForTesting: () => _deleteCurrentProjectConfigFieldsForTesting,
  _deleteCurrentProjectConfigFieldsForTesting: () => _TEST_GLOBAL_CONFIG_FOR_TESTING,
  _TEST_GLOBAL_CONFIG_FOR_TESTING: () => PROJECT_CONFIG_KEYS,
  PROJECT_CONFIG_KEYS: () => NOTIFICATION_CHANNELS,
  NOTIFICATION_CHANNELS: () => utn,
  GLOBAL_CONFIG_KEYS: () => EDITOR_MODES,
  EDITOR_MODES: () => dtn,
  DEFAULT_GLOBAL_CONFIG: () => DEFAULT_GLOBAL_CONFIG
});
function buildDefaultGlobalConfig() {
  return {
    numStartups: 0,
    installMethod: undefined,
    autoUpdates: undefined,
    theme: "dark",
    preferredNotifChannel: "auto",
    verbose: false,
    editorMode: "normal",
    autoCompactEnabled: true,
    autoScrollEnabled: true,
    showTurnDuration: true,
    externalEditorContext: false,
    showMessageTimestamps: false,
    hasSeenTasksHint: false,
    hasUsedStash: false,
    hasUsedBackgroundTask: false,
    queuedCommandUpHintCount: 0,
    diffTool: "auto",
    customApiKeyResponses: {
      approved: [],
      rejected: []
    },
    env: {},
    tipsHistory: {},
    memoryUsageCount: 0,
    promptQueueUseCount: 0,
    btwUseCount: 0,
    todoFeatureEnabled: true,
    showExpandedTodos: false,
    briefTranscript: false,
    messageIdleNotifThresholdMs: 60000,
    autoConnectIde: false,
    autoInstallIdeExtension: true,
    fileCheckpointingEnabled: true,
    terminalProgressBarEnabled: true,
    cachedDynamicConfigs: {},
    cachedGrowthBookFeatures: {},
    respectGitignore: true,
    copyFullResponse: false,
    unpinOpus47LaunchEffort: false,
    unpinOpus48LaunchEffort: false,
    unpinFable5LaunchEffort: false
  };
}
function isGlobalConfigKey(key) {
  return EDITOR_MODES.includes(key);
}
function resetTrustDialogAcceptedCache() {
  trustDialogAcceptedCache = false;
}
function checkHasTrustDialogAccepted() {
  return trustDialogAcceptedCache ||= checkTrustDialogAcceptedInternal();
}
function isProjectScopeTrustAccepted() {
  if (kr()) return true;
  return checkHasTrustDialogAccepted();
}
function checkTrustDialogAcceptedInternal() {
  if (rt(process.env.CLAUDE_CODE_SANDBOXED)) return true;
  if (RWe()) return true;
  if (wi()) return true;
  let config = getGlobalConfig(),
    projectPath = getProjectPathForConfig();
  if (config.projects?.[projectPath]?.hasTrustDialogAccepted) return true;
  let searchPath = XV(Pt());
  while (true) {
    if (config.projects?.[searchPath]?.hasTrustDialogAccepted) return true;
    let parentPath = XV(configFs.resolve(searchPath, ".."));
    if (parentPath === searchPath) break;
    searchPath = parentPath;
  }
  return false;
}
function isPathTrusted(path) {
  let config = getGlobalConfig(),
    normalizedPath = XV(configFs.resolve(path));
  while (true) {
    if (config.projects?.[normalizedPath]?.hasTrustDialogAccepted) return true;
    let parentPath = XV(configFs.resolve(normalizedPath, ".."));
    if (parentPath === normalizedPath) return false;
    normalizedPath = parentPath;
  }
}
function setPathTrusted(path) {
  let normalizedPath = XV(configFs.resolve(path));
  saveGlobalConfig(config => {
    if (config.projects?.[normalizedPath]?.hasTrustDialogAccepted) return config;
    return {
      ...config,
      projects: {
        ...config.projects,
        [normalizedPath]: {
          ...(config.projects?.[normalizedPath] ?? EMPTY_PROJECT_CONFIG),
          hasTrustDialogAccepted: true
        }
      }
    };
  });
}
function isProjectConfigKey(key) {
  return NOTIFICATION_CHANNELS.includes(key);
}
function wouldLoseAuthState(reReadConfig) {
  let cachedConfig = configCache.config;
  if (!cachedConfig) return false;
  let lostOauth = cachedConfig.oauthAccount !== undefined && reReadConfig.oauthAccount === undefined,
    lostOnboarding = cachedConfig.hasCompletedOnboarding === true && reReadConfig.hasCompletedOnboarding !== true;
  return lostOauth || lostOnboarding;
}
function saveGlobalConfig(updater) {
  let newConfig = null;
  try {
    if (saveConfigWithLock(bH(), buildDefaultGlobalConfig, existing => {
      let updated = updater(existing);
      if (updated === existing) return existing;
      return newConfig = stripProjectHistory({
        ...updated,
        projects: stripProjectTimestamps(existing.projects)
      }), newConfig;
    }) && newConfig) updateConfigCache(newConfig);
  } catch (err) {
    v(`Failed to save config with lock: ${err}`, {
      level: "error"
    });
    let reRead = readConfigFile(bH(), buildDefaultGlobalConfig);
    if (wouldLoseAuthState(reRead)) {
      v("saveGlobalConfig fallback: re-read config is missing auth that cache has; refusing to write. See GH #3117.", {
        level: "error"
      }), j("tengu_config_auth_loss_prevented", {});
      return;
    }
    let updated = updater(reRead);
    if (updated === reRead) return;
    newConfig = stripProjectHistory({
      ...updated,
      projects: stripProjectTimestamps(reRead.projects)
    }), fallbackWriteConfig(newConfig, "save_global");
  }
}
function flushConfigCacheStats() {
  let total = cacheHits + cacheMisses;
  if (total > 0) j("tengu_config_cache_stats", {
    cache_hits: cacheHits,
    cache_misses: cacheMisses,
    hit_rate: cacheHits / total
  });
  cacheHits = 0, cacheMisses = 0;
}
function migrateConfigFields(config) {
  if (delete config.showSpinnerTree, config.installMethod !== undefined) return config;
  let t = config,
    mutable = "unknown",
    installMethod = config.autoUpdates ?? true;
  switch (t.autoUpdaterStatus) {
    case "migrated":
      mutable = "local";
      break;
    case "installed":
      mutable = "native";
      break;
    case "disabled":
      installMethod = false;
      break;
    case "enabled":
    case "no_permissions":
    case "not_configured":
      mutable = "global";
      break;
    case undefined:
      break;
  }
  return {
    ...config,
    installMethod: mutable,
    autoUpdates: installMethod
  };
}
function stripProjectHistory(config) {
  let mutable = config;
  if (mutable.opus1mMergeNoticeSeenCount === undefined && mutable.voiceNoticeSeenCount === undefined && mutable.opus47LaunchSeenCount === undefined && mutable.opus48LaunchSeenCount === undefined) return config;
  let {
    opus1mMergeNoticeSeenCount: opus1mMergeNoticeSeenCount,
    voiceNoticeSeenCount: voiceNoticeSeenCount,
    opus47LaunchSeenCount: opus47LaunchSeenCount,
    opus48LaunchSeenCount: opus48LaunchSeenCount,
    ...rest
  } = mutable;
  return rest;
}
function stripProjectTimestamps(projects) {
  if (!projects) return projects;
  let result = {},
    changed = false;
  for (let [key, value] of Object.entries(projects)) {
    if (!value || typeof value !== "object") {
      result[key] = value;
      continue;
    }
    let s = value;
    if (s.history !== undefined) {
      changed = true;
      let {
        history: i,
        ...a
      } = s;
      result[key] = a;
    } else result[key] = value;
  }
  return changed ? result : projects;
}
function startConfigFileWatcher() {
  if (configWatcherActive) return;
  configWatcherActive = true;
  let configPath = bH();
  cryptoRandom_2.watchFile(configPath, {
    interval: cacheMisses_2,
    persistent: false
  }, t => {
    if (t.mtimeMs <= configCache.mtime) return;
    jt().readFile(configPath, {
      encoding: "utf-8"
    }).then(n => {
      if (t.mtimeMs <= configCache.mtime) return;
      let r = Fa(H3(n), false);
      if (r === null || typeof r !== "object") return;
      configCache = {
        config: migrateConfigFields({
          ...buildDefaultGlobalConfig(),
          ...r
        }),
        mtime: t.mtimeMs
      }, configCache_2 = {
        mtime: t.mtimeMs,
        size: t.size
      };
    }).catch(() => {});
  }), qi(async () => {
    cryptoRandom_2.unwatchFile(configPath), configWatcherActive = false;
  });
}
function updateConfigCache(config) {
  configCache = {
    config: config,
    mtime: Date.now()
  }, configCache_2 = null;
}
function getGlobalConfig() {
  if (configCache.config) return cacheHits++, configCache.config;
  cacheMisses++;
  try {
    let stat = null;
    try {
      stat = jt().statSync(bH());
    } catch {}
    let config = migrateConfigFields(readConfigFile(bH(), buildDefaultGlobalConfig));
    return configCache = {
      config: config,
      mtime: stat?.mtimeMs ?? Date.now()
    }, configCache_2 = stat ? {
      mtime: stat.mtimeMs,
      size: stat.size
    } : null, startConfigFileWatcher(), config;
  } catch {
    return migrateConfigFields(readConfigFile(bH(), buildDefaultGlobalConfig));
  }
}
function getRemoteControlAtStartup() {
  let H = pH()?.settings.remoteControlAtStartup ?? getGlobalConfig().remoteControlAtStartup;
  if (H !== undefined) return H;
  return (qk(), Pr(YKn)).getCcrAutoConnectDefault();
}
function getDaemonColdStart() {
  let envVal = process.env.CLAUDE_CODE_DAEMON_COLD_START;
  if (envVal === "transient" || envVal === "ask") return envVal;
  let dynamicVal = pH()?.settings.daemonColdStart;
  if (dynamicVal !== undefined) return dynamicVal;
  return gbDaemonColdStart?.daemonColdStartGbDefault() ?? "transient";
}
function getCustomApiKeyStatus(apiKey) {
  let config = getGlobalConfig();
  if (config.customApiKeyResponses?.approved?.includes(apiKey)) return "approved";
  if (config.customApiKeyResponses?.rejected?.includes(apiKey)) return "rejected";
  return "new";
}
function fallbackWriteConfig(config, callerName) {
  updateConfigCache(config);
  let diskOk = false;
  try {
    let configPath = bH();
    jt().mkdirSync(configFs.dirname(configPath));
    let filtered = nv(config, (value, key) => Oe(value) !== Oe(DEFAULT_GLOBAL_CONFIG[key]));
    lbt(configPath, Oe(filtered, null, 2), {
      encoding: "utf-8",
      mode: 384,
      allowSymlink: true
    }), diskOk = true;
  } catch (err) {
    v(`Config fallback write also failed; continuing without persisting: ${err}`, {
      level: "error"
    });
  }
  return j("tengu_config_fallback_write", {
    caller: Ue(callerName),
    disk_ok: diskOk
  }), diskOk;
}
function saveConfigWithLock(configPath, defaultFn, updater) {
  let defaultConfig = defaultFn(),
    fsModule = configFs.dirname(configPath),
    s = jt();
  s.mkdirSync(fsModule);
  let i;
  try {
    let a = `${configPath}.lock`,
      l = Date.now();
    i = g$s(configPath, {
      lockfilePath: a,
      onCompromised: m => {
        v(`Config lock compromised: ${m}`, {
          level: "error"
        });
      }
    });
    let c = Date.now() - l;
    if (c > 100) v("Lock acquisition took longer than expected - another Claude instance may be running"), j("tengu_config_lock_contention", {
      lock_time_ms: c
    });
    if (configCache_2 && configPath === bH()) try {
      let m = s.statSync(configPath);
      if (m.mtimeMs !== configCache_2.mtime || m.size !== configCache_2.size) j("tengu_config_stale_write", {
        read_mtime: configCache_2.mtime,
        write_mtime: m.mtimeMs,
        read_size: configCache_2.size,
        write_size: m.size
      });
    } catch (m) {
      if (ln(m) !== "ENOENT") throw m;
    }
    let u = readConfigFile(configPath, defaultFn);
    if (configPath === bH() && wouldLoseAuthState(u)) return v("saveConfigWithLock: re-read config is missing auth that cache has; refusing to write to avoid wiping ~/.claude.json. See GH #3117.", {
      level: "error"
    }), j("tengu_config_auth_loss_prevented", {}), false;
    let d = updater(u);
    if (d === u) return false;
    let p = nv(d, (m, f) => Oe(m) !== Oe(defaultConfig[f]));
    try {
      let m = configFs.basename(configPath),
        f = getConfigBackupDir();
      try {
        s.mkdirSync(f);
      } catch (C) {
        if (ln(C) !== "EEXIST") throw C;
      }
      let A = 60000,
        h = s.readdirStringSync(f).filter(C => C.startsWith(`${m}.backup.`)).sort().reverse(),
        g = h[0],
        _ = g ? Number(g.split(".backup.").pop()) : 0,
        y = Number.isNaN(_) || Date.now() - _ >= A;
      if (y) {
        let C = configFs.join(f, `${m}.backup.${Date.now()}`);
        s.copyFileSync(configPath, C);
      }
      let T = 5,
        S = y ? s.readdirStringSync(f).filter(C => C.startsWith(`${m}.backup.`)).sort().reverse() : h;
      for (let C of S.slice(T)) try {
        s.unlinkSync(configFs.join(f, C));
      } catch {}
    } catch (m) {
      if (ln(m) !== "ENOENT") v(`Failed to backup config: ${m}`, {
        level: "error"
      });
    }
    return lbt(configPath, Oe(p, null, 2), {
      encoding: "utf-8",
      mode: 384,
      allowSymlink: true
    }), true;
  } finally {
    if (i) i();
  }
}
function enableConfigs() {
  if (configsEnabled) {
    if (configsEnabledError !== null) throw configsEnabledError;
    return;
  }
  let start = Date.now();
  xn("info", "enable_configs_started"), configsEnabled = true;
  try {
    readConfigFile(bH(), buildDefaultGlobalConfig, true);
  } catch (t) {
    throw configsEnabledError = t, t;
  }
  xn("info", "enable_configs_completed", {
    duration_ms: Date.now() - start
  });
}
function getConfigBackupDir() {
  return configFs.join(sr(), "backups");
}
function findLatestBackup(configPath) {
  let fsModule = jt(),
    filename = configFs.basename(configPath),
    backupDir = getConfigBackupDir();
  try {
    let latest = fsModule.readdirStringSync(backupDir).filter(f => f.startsWith(`${filename}.backup.`)).sort().at(-1);
    if (latest) return configFs.join(backupDir, latest);
  } catch {}
  let configDir = configFs.dirname(configPath);
  try {
    let latest = fsModule.readdirStringSync(configDir).filter(f => f.startsWith(`${filename}.backup.`)).sort().at(-1);
    if (latest) return configFs.join(configDir, latest);
    let legacyPath = `${configPath}.backup`;
    try {
      return fsModule.statSync(legacyPath), legacyPath;
    } catch {}
  } catch {}
  return null;
}
function readConfigFile(configPath, defaultFn, strict) {
  if (!configsEnabled) throw Error("Config accessed before allowed.");
  let fsModule = jt();
  try {
    let raw = fsModule.readFileSync(configPath, {
      encoding: "utf-8"
    });
    try {
      let parsed = Wt(H3(raw));
      return {
        ...defaultFn(),
        ...parsed
      };
    } catch (err) {
      let msg = err instanceof Error ? err.message : String(err);
      throw new d2(msg, configPath, defaultFn());
    }
  } catch (err) {
    if (ln(err) === "ENOENT") {
      let backupPath = findLatestBackup(configPath);
      if (backupPath) process.stderr.write(`
Claude configuration file not found at: ${configPath}
A backup file exists at: ${backupPath}
You can manually restore it by running: cp "${backupPath}" "${configPath}"

`);
      return defaultFn();
    }
    if (err instanceof d2 && strict) throw err;
    if (err instanceof d2) {
      if (v(`Config file corrupted, resetting to defaults: ${err.message}`, {
        level: "error"
      }), !corruptionErrorLogged) {
        corruptionErrorLogged = true;
        try {
          let hasBak = false;
          try {
            fsModule.statSync(`${configPath}.backup`), hasBak = true;
          } catch {}
          j("tengu_config_parse_error", {
            has_backup: hasBak
          });
        } finally {
          corruptionErrorLogged = false;
        }
      }
      process.stderr.write(`
Claude configuration file at ${configPath} is corrupted: ${err.message}
`);
      let filename = configFs.basename(configPath),
        backupDir = getConfigBackupDir();
      try {
        fsModule.mkdirSync(backupDir);
      } catch (mkdirErr) {
        if (ln(mkdirErr) !== "EEXIST") throw mkdirErr;
      }
      let existingCorrupted = fsModule.readdirStringSync(backupDir).filter(f => f.startsWith(`${filename}.corrupted.`)),
        newCorruptedPath,
        alreadyBacked = false,
        rawContent = fsModule.readFileSync(configPath, {
          encoding: "utf-8"
        });
      for (let cf of existingCorrupted) try {
        let existingContent = fsModule.readFileSync(configFs.join(backupDir, cf), {
          encoding: "utf-8"
        });
        if (rawContent === existingContent) {
          alreadyBacked = true;
          break;
        }
      } catch {}
      if (!alreadyBacked) {
        newCorruptedPath = configFs.join(backupDir, `${filename}.corrupted.${Date.now()}`);
        try {
          fsModule.copyFileSync(configPath, newCorruptedPath), v(`Corrupted config backed up to: ${newCorruptedPath}`, {
            level: "error"
          });
        } catch {}
      }
      let latestBackup = findLatestBackup(configPath);
      if (newCorruptedPath) process.stderr.write(`The corrupted file has been backed up to: ${newCorruptedPath}
`);else if (alreadyBacked) process.stderr.write(`The corrupted file has already been backed up.
`);
      if (latestBackup) process.stderr.write(`A backup file exists at: ${latestBackup}
You can manually restore it by running: cp "${latestBackup}" "${configPath}"

`);else process.stderr.write(`
`);
    }
    return defaultFn();
  }
}
function getRawCurrentProjectConfigEntry() {
  return getGlobalConfig().projects?.[getProjectPathForConfig()];
}
function getCurrentProjectConfig() {
  let projectPath = getProjectPathForConfig(),
    config = getGlobalConfig();
  if (!config.projects) return EMPTY_PROJECT_CONFIG;
  let projectConfig = config.projects[projectPath] ?? EMPTY_PROJECT_CONFIG;
  if (typeof projectConfig.allowedTools === "string") projectConfig.allowedTools = Fa(projectConfig.allowedTools) ?? [];
  return projectConfig;
}
function saveCurrentProjectConfig(updater) {
  let projectPath = getProjectPathForConfig(),
    newConfig = null;
  try {
    if (saveConfigWithLock(bH(), buildDefaultGlobalConfig, existing => {
      let projectConfig = existing.projects?.[projectPath] ?? EMPTY_PROJECT_CONFIG,
        updated = updater(projectConfig);
      if (updated === projectConfig) return existing;
      return newConfig = stripProjectHistory({
        ...existing,
        projects: {
          ...existing.projects,
          [projectPath]: updated
        }
      }), newConfig;
    }) && newConfig) updateConfigCache(newConfig);
  } catch (err) {
    v(`Failed to save config with lock: ${err}`, {
      level: "error"
    });
    let reRead = readConfigFile(bH(), buildDefaultGlobalConfig);
    if (wouldLoseAuthState(reRead)) {
      v("saveCurrentProjectConfig fallback: re-read config is missing auth that cache has; refusing to write. See GH #3117.", {
        level: "error"
      }), j("tengu_config_auth_loss_prevented", {});
      return;
    }
    let projectConfig = reRead.projects?.[projectPath] ?? EMPTY_PROJECT_CONFIG,
      updated = updater(projectConfig);
    if (updated === projectConfig) return;
    newConfig = stripProjectHistory({
      ...reRead,
      projects: {
        ...reRead.projects,
        [projectPath]: updated
      }
    }), fallbackWriteConfig(newConfig, "save_project");
  }
}
function deleteProjectConfig(projectPath) {
  let newConfig = null,
    skipped = null;
  try {
    let didUpdate = saveConfigWithLock(bH(), buildDefaultGlobalConfig, existing => {
      if (!existing.projects?.[projectPath]) return skipped = false, existing;
      skipped = true;
      let {
        [projectPath]: _removed,
        ...rest
      } = existing.projects;
      return newConfig = stripProjectHistory({
        ...existing,
        projects: rest
      }), newConfig;
    });
    if (didUpdate && newConfig) updateConfigCache(newConfig);
    return didUpdate || skipped === false;
  } catch (err) {
    v(`Failed to save config with lock: ${err}`, {
      level: "error"
    });
    let reRead = readConfigFile(bH(), buildDefaultGlobalConfig);
    if (wouldLoseAuthState(reRead)) return v("deleteProjectConfig fallback: re-read config is missing auth that cache has; refusing to write. See GH #3117.", {
      level: "error"
    }), j("tengu_config_auth_loss_prevented", {}), false;
    if (!reRead.projects?.[projectPath]) return true;
    let {
      [projectPath]: _removed,
      ...rest
    } = reRead.projects;
    return newConfig = stripProjectHistory({
      ...reRead,
      projects: rest
    }), fallbackWriteConfig(newConfig, "delete_project");
  }
}
function deleteCurrentProjectConfigFields(fields) {
  return deleteProjectConfigFields(fields, {
    projectPath: getProjectPathForConfig,
    saveWithLock: updater => saveConfigWithLock(bH(), buildDefaultGlobalConfig, updater),
    writeCache: updateConfigCache,
    readConfigFallback: () => readConfigFile(bH(), buildDefaultGlobalConfig),
    wouldLoseAuth: wouldLoseAuthState,
    fallbackSave: config => fallbackWriteConfig(config, "delete_project_fields")
  });
}
function _TEST_GLOBAL_CONFIG_FOR_TESTING(fields, opts) {
  return deleteProjectConfigFields(fields, opts);
}
function deleteProjectConfigFields(fields, opts) {
  let removeFields = config => {
      let result = {
        ...config
      };
      for (let field of fields) delete result[field];
      return result;
    },
    projectPath = opts.projectPath(),
    existingProject = opts.readConfigFallback().projects?.[projectPath];
  if (!existingProject || !fields.some(f => f in existingProject)) return true;
  let newConfig = null,
    skipped = null;
  try {
    let didUpdate = opts.saveWithLock(existing => {
      let projectConfig = existing.projects?.[projectPath];
      if (!projectConfig || !fields.some(f => f in projectConfig)) return skipped = false, existing;
      return skipped = true, newConfig = stripProjectHistory({
        ...existing,
        projects: {
          ...existing.projects,
          [projectPath]: removeFields(projectConfig)
        }
      }), newConfig;
    });
    if (didUpdate && newConfig) opts.writeCache(newConfig);
    return didUpdate || skipped === false;
  } catch (err) {
    v(`Failed to save config with lock: ${err}`, {
      level: "error"
    });
    let reRead = opts.readConfigFallback();
    if (opts.wouldLoseAuth(reRead)) return v("deleteCurrentProjectConfigFields fallback: re-read config is missing auth that cache has; refusing to write. See GH #3117.", {
      level: "error"
    }), j("tengu_config_auth_loss_prevented", {}), false;
    let projectConfig = reRead.projects?.[projectPath];
    if (!projectConfig || !fields.some(f => f in projectConfig)) return true;
    return newConfig = stripProjectHistory({
      ...reRead,
      projects: {
        ...reRead.projects,
        [projectPath]: removeFields(projectConfig)
      }
    }), opts.fallbackSave(newConfig);
  }
}
function isAutoUpdaterDisabled() {
  return getAutoUpdaterDisabledReason() !== null;
}
function shouldSkipPluginAutoupdate() {
  return isAutoUpdaterDisabled() && !rt(process.env.FORCE_AUTOUPDATE_PLUGINS);
}
function formatAutoUpdaterDisabledReason(reason) {
  switch (reason.type) {
    case "development":
      return "development build";
    case "env":
      return `set by env: ${reason.envVar}`;
    case "config":
      return "config";
  }
}
function getAutoUpdaterDisabledReason() {
  if (Ge.DISABLE_UPDATES) return {
    type: "env",
    envVar: "DISABLE_UPDATES"
  };
  if (Ge.DISABLE_AUTOUPDATER) return {
    type: "env",
    envVar: "DISABLE_AUTOUPDATER"
  };
  let envVar = XVe();
  if (envVar) return {
    type: "env",
    envVar: envVar
  };
  let config = getGlobalConfig();
  if (config.autoUpdates === false && (config.installMethod !== "native" || config.autoUpdatesProtectedForNative !== true)) return {
    type: "config"
  };
  return null;
}
function getOrCreateUserID() {
  let config = getGlobalConfig();
  if (config.userID) return config.userID;
  if (cachedUserID) return cachedUserID;
  let newId = cryptoRandom.randomBytes(32).toString("hex");
  cachedUserID = newId;
  try {
    saveGlobalConfig(c => ({
      ...c,
      userID: newId
    }));
  } catch (err) {
    v(`getOrCreateUserID: could not persist userID: ${err}`, {
      level: "error"
    });
  }
  return newId;
}
function getOrCreateMachineID() {
  let config = getGlobalConfig();
  if (config.machineID) return config.machineID;
  if (cachedMachineID) return cachedMachineID;
  let newId = cryptoRandom.randomBytes(32).toString("hex");
  cachedMachineID = newId;
  try {
    saveGlobalConfig(c => ({
      ...c,
      machineID: newId
    }));
  } catch (err) {
    v(`getOrCreateMachineID: could not persist machineID: ${err}`, {
      level: "error"
    });
  }
  return newId;
}
function recordFirstStartTime() {
  if (!getGlobalConfig().firstStartTime) {
    let isoTime = new Date().toISOString();
    saveGlobalConfig(c => ({
      ...c,
      firstStartTime: c.firstStartTime ?? isoTime
    }));
  }
}
function getMemoryPath(scope) {
  let cwd = gr();
  switch (scope) {
    case "User":
      return configFs.join(sr(), "CLAUDE.md");
    case "Local":
      return configFs.join(cwd, "CLAUDE.local.md");
    case "Project":
      return configFs.join(cwd, "CLAUDE.md");
    case "Managed":
      return configFs.join(wR(), "CLAUDE.md");
    case "AutoMem":
      return XBe();
  }
}
function getManagedClaudeRulesDir() {
  return configFs.join(wR(), ".claude", "rules");
}
function getUserClaudeRulesDir() {
  return configFs.join(sr(), "rules");
}
function _setGlobalConfigCacheForTesting(config) {
  configCache.config = config, configCache.mtime = config ? Date.now() : 0;
}
var cryptoRandom,
  cryptoRandom_2,
  configFs,
  gbDaemonColdStart,
  corruptionErrorLogged = false,
  EMPTY_PROJECT_CONFIG,
  DEFAULT_GLOBAL_CONFIG,
  EDITOR_MODES,
  NOTIFICATION_CHANNELS,
  trustDialogAcceptedCache = false,
  trustDialogAcceptedCache_2,
  configFallback,
  configCache,
  configCache_2 = null,
  cacheHits = 0,
  cacheMisses = 0,
  cacheMisses_2 = 1000,
  configWatcherActive = false,
  configsEnabled = false,
  configsEnabledError = null,
  getProjectPathForConfig,
  cachedUserID = null,
  cachedMachineID = null,
  _deleteCurrentProjectConfigFieldsForTesting,
  _wouldLoseAuthStateForTesting,
  _getConfigForTesting,
  PROJECT_CONFIG_KEYS;
var O8 = b(() => {
  na();
  ope();
  ct();
  iA();
  Ct();
  Ko();
  Jd();
  gp();
  je();
  wA();
  Or();
  an();
  St();
  mc();
  bs();
  Ba();
  Pp();
  Pu();
  hp();
  r7();
  Wx();
  QCe();
  Xt();
  ptn();
  cryptoRandom = require("crypto"), cryptoRandom_2 = require("fs"), configFs = require("path"), gbDaemonColdStart = (hv(), Pr(s_n)), EMPTY_PROJECT_CONFIG = {
    allowedTools: [],
    mcpContextUris: [],
    mcpServers: {},
    enabledMcpjsonServers: [],
    disabledMcpjsonServers: [],
    hasTrustDialogAccepted: false,
    projectOnboardingSeenCount: 0,
    hasClaudeMdExternalIncludesApproved: false,
    hasClaudeMdExternalIncludesWarningShown: false
  };
  DEFAULT_GLOBAL_CONFIG = buildDefaultGlobalConfig(), EDITOR_MODES = ["apiKeyHelper", "installMethod", "autoUpdates", "autoUpdatesProtectedForNative", "theme", "verbose", "preferredNotifChannel", "shiftEnterKeyBindingInstalled", "editorMode", "hasUsedBackslashReturn", "autoCompactEnabled", "autoScrollEnabled", "showTurnDuration", "externalEditorContext", "showMessageTimestamps", "diffTool", "env", "tipsHistory", "todoFeatureEnabled", "showExpandedTodos", "briefTranscript", "diffSidebarOpen", "messageIdleNotifThresholdMs", "autoConnectIde", "autoInstallIdeExtension", "fileCheckpointingEnabled", "terminalProgressBarEnabled", "showStatusInTerminalTab", "taskCompleteNotifEnabled", "inputNeededNotifEnabled", "agentPushNotifEnabled", "respectGitignore", "claudeInChromeDefaultEnabled", "hasCompletedClaudeInChromeOnboarding", "lspRecommendationDisabled", "lspRecommendationNeverPlugins", "lspRecommendationIgnoredCount", "copyFullResponse", "copyOnSelect", "leftArrowOpensAgents", "defaultToAgentsView", "permissionExplainerEnabled", "prStatusFooterEnabled", "remoteControlAtStartup", "autoUploadSessions", "autoAddRemoteControlDaemonWorker", "remoteDialogSeen"];
  NOTIFICATION_CHANNELS = ["allowedTools", "hasTrustDialogAccepted", "hasCompletedProjectOnboarding"];
  trustDialogAcceptedCache_2 = {
    ...DEFAULT_GLOBAL_CONFIG,
    autoUpdates: false
  }, configFallback = {
    ...EMPTY_PROJECT_CONFIG
  };
  configCache = {
    config: null,
    mtime: 0
  };
  qi(async () => {
    flushConfigCacheStats();
  });
  getProjectPathForConfig = bn(() => {
    let e = gr(),
      t = Uf(e);
    if (t) return XV(t);
    return XV(configFs.resolve(e));
  });
  _deleteCurrentProjectConfigFieldsForTesting = readConfigFile, _wouldLoseAuthStateForTesting = wouldLoseAuthState, _getConfigForTesting = stripProjectTimestamps, PROJECT_CONFIG_KEYS = trustDialogAcceptedCache_2;
  $mi(() => getGlobalConfig().clientDataCache);
});

export {$i as pJ,buildDefaultGlobalConfig as KG,isGlobalConfigKey,resetTrustDialogAcceptedCache,checkHasTrustDialogAccepted,isProjectScopeTrustAccepted,checkTrustDialogAcceptedInternal as AEm,isPathTrusted,setPathTrusted,isProjectConfigKey,wouldLoseAuthState as AAt,saveGlobalConfig,flushConfigCacheStats as _Em,migrateConfigFields as _0o,stripProjectHistory as kPe,stripProjectTimestamps as y0o,startConfigFileWatcher as TEm,updateConfigCache as oWt,getGlobalConfig,getRemoteControlAtStartup,getDaemonColdStart,getCustomApiKeyStatus,fallbackWriteConfig as $zn,saveConfigWithLock as qzn,enableConfigs,getConfigBackupDir as b0o,findLatestBackup as PFl,readConfigFile as Gye,getRawCurrentProjectConfigEntry,getCurrentProjectConfig,saveCurrentProjectConfig,deleteProjectConfig,deleteCurrentProjectConfigFields,_TEST_GLOBAL_CONFIG_FOR_TESTING as _deleteCurrentProjectConfigFieldsForTesting,deleteProjectConfigFields as MFl,isAutoUpdaterDisabled,shouldSkipPluginAutoupdate,formatAutoUpdaterDisabledReason,getAutoUpdaterDisabledReason,getOrCreateUserID,getOrCreateMachineID,recordFirstStartTime,getMemoryPath,getManagedClaudeRulesDir,getUserClaudeRulesDir,_setGlobalConfigCacheForTesting,cryptoRandom as S0o,cryptoRandom_2 as Fzn,configFs as Rb,gbDaemonColdStart as mEm,corruptionErrorLogged as m0o,EMPTY_PROJECT_CONFIG as fAt,DEFAULT_GLOBAL_CONFIG,EDITOR_MODES as GLOBAL_CONFIG_KEYS,NOTIFICATION_CHANNELS as PROJECT_CONFIG_KEYS,trustDialogAcceptedCache as LFl,trustDialogAcceptedCache_2 as hEm,configFallback as buildProcessedSkillFiles,configCache as Kue,configCache_2 as xPe,cacheHits as nWt,cacheMisses as Bzn,cacheMisses_2 as yEm,configWatcherActive as f0o,configsEnabled as T0o,configsEnabledError as A0o,getProjectPathForConfig,cachedUserID as h0o,cachedMachineID as g0o,_deleteCurrentProjectConfigFieldsForTesting as _getConfigForTesting,_wouldLoseAuthStateForTesting,_getConfigForTesting as _removeProjectHistoryForTesting,PROJECT_CONFIG_KEYS as _TEST_GLOBAL_CONFIG_FOR_TESTING,O8 as Qn};
