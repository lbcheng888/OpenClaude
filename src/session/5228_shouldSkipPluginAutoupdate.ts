// @ts-nocheck
import {ft,oo,b} from "../../runtime.ts";
import {NOTIFICATION_CHANNELS as Pon,EDITOR_MODES as Oon,LRt} from "../../vendor/m719.ts";
import {getIsNonInteractiveSession as kr,getSessionTrustAccepted as BKe,getOriginalCwd as gr,lt} from "./0132_sent.ts";
import {nt} from "../../vendor/m127.ts";
import {Ws,vd} from "./1465_promise.ts";
import {NK,Tu} from "../../vendor/m649.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {nI} from "../config/0577_externalHttp.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {fRt,vTr} from "../../vendor/m694.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {ba,u3,pd} from "../../vendor/m706.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {GH,lk} from "../../vendor/m125.ts";
import {pH,MQn} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {dA,xpe} from "../../vendor/m436.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "../config/0230_encoding.ts";
import {sRt,Xl} from "../config/0651_maxBytes.ts";
import {Le} from "../../vendor/m5.ts";
import {b8s} from "../../vendor/m1479.ts";
import {cn,$U,Ct} from "../../vendor/m197.ts";
import {wn,pf} from "../config/0693_timestamp.ts";
import {or,dn} from "../config/0137_namespace.ts";
import {Ne} from "../../vendor/m583.ts";
import {pje,$d} from "../config/0620_$d.ts";
import {Fv,qK} from "../../vendor/m709.ts";
import {Ufe,Jm} from "../config/2207_Jm.ts";
import {KSi,_$r} from "../../vendor/m2207.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Ir} from "../../vendor/m584.ts";
import {ia,findCanonicalGitRoot as zm} from "../../vendor/m698.ts";
import {yUe,XSi} from "../../vendor/m2208.ts";
import {fC,wbn} from "../config/2212_shouldShowLaunchComposer.ts";
// @ts-nocheck
var JY = {};
ft(JY, {
  shouldSkipPluginAutoupdate: () => shouldSkipPluginAutoupdate,
  setPathTrusted: () => setPathTrusted,
  setClientDataCacheKeyGetter: () => setClientDataCacheKeyGetter,
  saveGlobalConfig: () => saveGlobalConfig,
  saveCurrentProjectConfig: () => saveCurrentProjectConfig,
  resetTrustDialogAcceptedCache: () => resetTrustDialogAcceptedCache,
  recordFirstStartTime: () => recordFirstStartTime,
  isProjectScopeTrustAccepted: () => isProjectScopeTrustAccepted,
  isProjectConfigKey: () => isProjectConfigKey,
  isPathTrusted: () => isPathTrusted,
  isGlobalConfigKey: () => isGlobalConfigKey,
  isAutoUpdaterDisabled: () => isAutoUpdaterDisabled,
  hasClientDataCacheSlot: () => hasClientDataCacheSlot,
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
  getCachedClientData: () => getCachedClientData,
  getAutoUpdaterDisabledReason: () => getAutoUpdaterDisabledReason,
  formatAutoUpdaterDisabledReason: () => formatAutoUpdaterDisabledReason,
  enableConfigs: () => enableConfigs,
  deleteProjectConfig: () => deleteProjectConfig,
  deleteCurrentProjectConfigFields: () => deleteCurrentProjectConfigFields,
  checkHasTrustDialogAccepted: () => checkHasTrustDialogAccepted,
  _wouldLoseAuthStateForTesting: () => _wouldLoseAuthStateForTesting,
  _setGlobalConfigCacheForTesting: () => _setGlobalConfigCacheForTesting,
  _removeProjectHistoryForTesting: () => _removeProjectHistoryForTesting,
  _getConfigForTesting: () => _getConfigForTesting,
  _deleteCurrentProjectConfigFieldsForTesting: () => _deleteCurrentProjectConfigFieldsForTesting,
  _TEST_GLOBAL_CONFIG_FOR_TESTING: () => _TEST_GLOBAL_CONFIG_FOR_TESTING,
  PROJECT_CONFIG_KEYS: () => PROJECT_CONFIG_KEYS,
  NOTIFICATION_CHANNELS: () => Pon,
  GLOBAL_CONFIG_KEYS: () => GLOBAL_CONFIG_KEYS,
  EDITOR_MODES: () => Oon,
  DEFAULT_PROJECT_CONFIG: () => DEFAULT_PROJECT_CONFIG,
  DEFAULT_GLOBAL_CONFIG: () => DEFAULT_GLOBAL_CONFIG
});
function cV() {
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
  return GLOBAL_CONFIG_KEYS.includes(key);
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
  if (nt(process.env.CLAUDE_CODE_SANDBOXED)) return true;
  if (BKe()) return true;
  if (Ws()) return true;
  let config = getGlobalConfig(),
    projectPath = getProjectPathForConfig();
  if (config.projects?.[projectPath]?.hasTrustDialogAccepted) return true;
  let searchPath = NK(Lt());
  while (true) {
    if (config.projects?.[searchPath]?.hasTrustDialogAccepted) return true;
    let parentPath = NK(Rb.resolve(searchPath, ".."));
    if (parentPath === searchPath) break;
    searchPath = parentPath;
  }
  return false;
}
function isPathTrusted(path) {
  let config = getGlobalConfig(),
    normalizedPath = NK(Rb.resolve(path));
  while (true) {
    if (config.projects?.[normalizedPath]?.hasTrustDialogAccepted) return true;
    let parentPath = NK(Rb.resolve(normalizedPath, ".."));
    if (parentPath === normalizedPath) return false;
    normalizedPath = parentPath;
  }
}
function setPathTrusted(path) {
  let normalizedPath = NK(Rb.resolve(path));
  saveGlobalConfig(config => {
    if (config.projects?.[normalizedPath]?.hasTrustDialogAccepted) return config;
    return {
      ...config,
      projects: {
        ...config.projects,
        [normalizedPath]: {
          ...(config.projects?.[normalizedPath] ?? DEFAULT_PROJECT_CONFIG),
          hasTrustDialogAccepted: true
        }
      }
    };
  });
}
function isProjectConfigKey(key) {
  return PROJECT_CONFIG_KEYS.includes(key);
}
function L_t(reReadConfig) {
  let cachedConfig = ede.config;
  if (!cachedConfig) return false;
  let lostOauth = cachedConfig.oauthAccount !== undefined && reReadConfig.oauthAccount === undefined,
    lostOnboarding = cachedConfig.hasCompletedOnboarding === true && reReadConfig.hasCompletedOnboarding !== true;
  return lostOauth || lostOnboarding;
}
function saveGlobalConfig(updater) {
  let newConfig = null;
  try {
    if (UQn(nI(), cV, existing => {
      let updated = updater(existing);
      if (updated === existing) return existing;
      return newConfig = vOe({
        ...updated,
        projects: NMo(existing.projects)
      }), newConfig;
    }) && newConfig) OKt(newConfig);
  } catch (err) {
    A(`Failed to save config with lock: ${err}`, {
      level: "error"
    });
    let reRead = bSe(nI(), cV);
    if (L_t(reRead)) {
      A("saveGlobalConfig fallback: re-read config is missing auth that cache has; refusing to write. See GH #3117.", {
        level: "error"
      }), W("tengu_config_auth_loss_prevented", {});
      return;
    }
    let updated = updater(reRead);
    if (updated === reRead) return;
    newConfig = vOe({
      ...updated,
      projects: NMo(reRead.projects)
    }), BQn(newConfig, "save_global");
  }
}
function Fxm() {
  let total = xKt + NQn;
  if (total > 0) W("tengu_config_cache_stats", {
    cache_hits: xKt,
    cache_misses: NQn,
    hit_rate: xKt / total
  });
  xKt = 0, NQn = 0;
}
function MMo(config) {
  if (delete config.showSpinnerTree, config.installMethod !== undefined) return config;
  let legacy = config,
    installMethod = "unknown",
    autoUpdates = config.autoUpdates ?? true;
  switch (legacy.autoUpdaterStatus) {
    case "migrated":
      installMethod = "local";
      break;
    case "installed":
      installMethod = "native";
      break;
    case "disabled":
      autoUpdates = false;
      break;
    case "enabled":
    case "no_permissions":
    case "not_configured":
      installMethod = "global";
      break;
    case undefined:
      break;
  }
  return {
    ...config,
    installMethod: installMethod,
    autoUpdates: autoUpdates
  };
}
function vOe(config) {
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
function NMo(projects) {
  if (!projects) return projects;
  let result = {},
    changed = false;
  for (let [key, value] of Object.entries(projects)) {
    if (!value || typeof value !== "object") {
      result[key] = value;
      continue;
    }
    let entry = value;
    if (entry.history !== undefined) {
      changed = true;
      let {
        history: history,
        ...withoutHistory
      } = entry;
      result[key] = withoutHistory;
    } else result[key] = value;
  }
  return changed ? result : projects;
}
function Uxm() {
  if (DMo) return;
  DMo = true;
  let configPath = nI();
  fRt(configPath, {
    interval: Bxm,
    persistent: false
  }, stat => {
    if (stat.mtimeMs <= ede.mtime) return;
    Wt().readFile(configPath, {
      encoding: "utf-8"
    }).then(raw => {
      if (stat.mtimeMs <= ede.mtime) return;
      let parsed = ba(u3(raw), false);
      if (parsed === null || typeof parsed !== "object") return;
      ede = {
        config: MMo({
          ...cV(),
          ...parsed
        }),
        mtime: stat.mtimeMs
      }, ROe = {
        mtime: stat.mtimeMs,
        size: stat.size
      };
    }).catch(() => {});
  }), Si(async () => {
    C5l.unwatchFile(configPath), DMo = false;
  });
}
function OKt(config) {
  ede = {
    config: config,
    mtime: Date.now()
  }, ROe = null;
}
function getGlobalConfig() {
  if (ede.config) return xKt++, ede.config;
  NQn++;
  try {
    let stat = null;
    try {
      stat = Wt().statSync(nI());
    } catch {}
    let config = MMo(bSe(nI(), cV));
    return ede = {
      config: config,
      mtime: stat?.mtimeMs ?? Date.now()
    }, ROe = stat ? {
      mtime: stat.mtimeMs,
      size: stat.size
    } : null, Uxm(), config;
  } catch {
    return MMo(bSe(nI(), cV));
  }
}
function getRemoteControlAtStartup() {
  let value = GH()?.settings.remoteControlAtStartup ?? getGlobalConfig().remoteControlAtStartup;
  if (value !== undefined) return value;
  return (pH(), oo(MQn)).getCcrAutoConnectDefault();
}
function getDaemonColdStart() {
  let envVal = process.env.CLAUDE_CODE_DAEMON_COLD_START;
  if (envVal === "transient" || envVal === "ask") return envVal;
  let dynamicVal = GH()?.settings.daemonColdStart;
  if (dynamicVal !== undefined) return dynamicVal;
  return Pxm?.daemonColdStartGbDefault() ?? "transient";
}
function getCustomApiKeyStatus(apiKey) {
  let config = getGlobalConfig();
  if (config.customApiKeyResponses?.approved?.includes(apiKey)) return "approved";
  if (config.customApiKeyResponses?.rejected?.includes(apiKey)) return "rejected";
  return "new";
}
function BQn(config, callerName) {
  OKt(config);
  let diskOk = false;
  try {
    let configPath = nI();
    Wt().mkdirSync(Rb.dirname(configPath));
    let filtered = dA(config, (value, key) => Pe(value) !== Pe(DEFAULT_GLOBAL_CONFIG[key]));
    sRt(configPath, Pe(filtered, null, 2), {
      encoding: "utf-8",
      mode: 384,
      allowSymlink: true
    }), diskOk = true;
  } catch (err) {
    A(`Config fallback write also failed; continuing without persisting: ${err}`, {
      level: "error"
    });
  }
  return W("tengu_config_fallback_write", {
    caller: Le(callerName),
    disk_ok: diskOk
  }), diskOk;
}
function UQn(configPath, defaultFn, updater) {
  let defaultConfig = defaultFn(),
    configDir = Rb.dirname(configPath),
    fsModule = Wt();
  fsModule.mkdirSync(configDir);
  let release;
  try {
    let lockfilePath = `${configPath}.lock`,
      lockStart = Date.now();
    release = b8s(configPath, {
      lockfilePath: lockfilePath,
      onCompromised: msg => {
        A(`Config lock compromised: ${msg}`, {
          level: "error"
        });
      }
    });
    let lockMs = Date.now() - lockStart;
    if (lockMs > 100) A("Lock acquisition took longer than expected - another Claude instance may be running"), W("tengu_config_lock_contention", {
      lock_time_ms: lockMs
    });
    if (ROe && configPath === nI()) try {
      let stat = fsModule.statSync(configPath);
      if (stat.mtimeMs !== ROe.mtime || stat.size !== ROe.size) W("tengu_config_stale_write", {
        read_mtime: ROe.mtime,
        write_mtime: stat.mtimeMs,
        read_size: ROe.size,
        write_size: stat.size
      });
    } catch (statErr) {
      if (cn(statErr) !== "ENOENT") throw statErr;
    }
    let current = bSe(configPath, defaultFn);
    if (configPath === nI() && L_t(current)) return A("saveConfigWithLock: re-read config is missing auth that cache has; refusing to write to avoid wiping ~/.claude.json. See GH #3117.", {
      level: "error"
    }), W("tengu_config_auth_loss_prevented", {}), false;
    let updated = updater(current);
    if (updated === current) return false;
    let filtered = dA(updated, (value, key) => Pe(value) !== Pe(defaultConfig[key]));
    try {
      let filename = Rb.basename(configPath),
        backupDir = UMo();
      try {
        fsModule.mkdirSync(backupDir);
      } catch (mkdirErr) {
        if (cn(mkdirErr) !== "EEXIST") throw mkdirErr;
      }
      let backupIntervalMs = 60000,
        existingBackups = fsModule.readdirStringSync(backupDir).filter(name => name.startsWith(`${filename}.backup.`)).sort().reverse(),
        latestBackup = existingBackups[0],
        latestBackupTime = latestBackup ? Number(latestBackup.split(".backup.").pop()) : 0,
        shouldBackup = Number.isNaN(latestBackupTime) || Date.now() - latestBackupTime >= backupIntervalMs;
      if (shouldBackup) {
        let backupPath = Rb.join(backupDir, `${filename}.backup.${Date.now()}`);
        fsModule.copyFileSync(configPath, backupPath);
      }
      let keepCount = 5,
        backupsToPrune = shouldBackup ? fsModule.readdirStringSync(backupDir).filter(name => name.startsWith(`${filename}.backup.`)).sort().reverse() : existingBackups;
      for (let staleBackup of backupsToPrune.slice(keepCount)) try {
        fsModule.unlinkSync(Rb.join(backupDir, staleBackup));
      } catch {}
    } catch (backupErr) {
      if (cn(backupErr) !== "ENOENT") A(`Failed to backup config: ${backupErr}`, {
        level: "error"
      });
    }
    return sRt(configPath, Pe(filtered, null, 2), {
      encoding: "utf-8",
      mode: 384,
      allowSymlink: true
    }), true;
  } finally {
    if (release) release();
  }
}
function enableConfigs() {
  if (FMo) {
    if (PMo !== null) throw PMo;
    return;
  }
  let start = Date.now();
  wn("info", "enable_configs_started"), FMo = true;
  try {
    bSe(nI(), cV, true);
  } catch (err) {
    throw PMo = err, err;
  }
  wn("info", "enable_configs_completed", {
    duration_ms: Date.now() - start
  });
}
function UMo() {
  return Rb.join(or(), "backups");
}
function E5l(configPath) {
  let fsModule = Wt(),
    filename = Rb.basename(configPath),
    backupDir = UMo();
  try {
    let latest = fsModule.readdirStringSync(backupDir).filter(name => name.startsWith(`${filename}.backup.`)).sort().at(-1);
    if (latest) return Rb.join(backupDir, latest);
  } catch {}
  let configDir = Rb.dirname(configPath);
  try {
    let latest = fsModule.readdirStringSync(configDir).filter(name => name.startsWith(`${filename}.backup.`)).sort().at(-1);
    if (latest) return Rb.join(configDir, latest);
    let legacyPath = `${configPath}.backup`;
    try {
      return fsModule.statSync(legacyPath), legacyPath;
    } catch {}
  } catch {}
  return null;
}
function bSe(configPath, defaultFn, strict) {
  if (!FMo) throw Error("Config accessed before allowed.");
  let fsModule = Wt();
  try {
    let raw = fsModule.readFileSync(configPath, {
      encoding: "utf-8"
    });
    try {
      let parsed = qt(u3(raw));
      return {
        ...defaultFn(),
        ...parsed
      };
    } catch (parseErr) {
      let msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      throw new $U(msg, configPath, defaultFn());
    }
  } catch (err) {
    if (cn(err) === "ENOENT") {
      let backupPath = E5l(configPath);
      if (backupPath) process.stderr.write(`
Claude configuration file not found at: ${configPath}
A backup file exists at: ${backupPath}
You can manually restore it by running: cp "${backupPath}" "${configPath}"

`);
      return defaultFn();
    }
    if (err instanceof $U && strict) throw err;
    if (err instanceof $U) {
      if (A(`Config file corrupted, resetting to defaults: ${err.message}`, {
        level: "error"
      }), !xMo) {
        xMo = true;
        try {
          let hasBak = false;
          try {
            fsModule.statSync(`${configPath}.backup`), hasBak = true;
          } catch {}
          W("tengu_config_parse_error", {
            has_backup: hasBak
          });
        } finally {
          xMo = false;
        }
      }
      process.stderr.write(`
Claude configuration file at ${configPath} is corrupted: ${err.message}
`);
      let filename = Rb.basename(configPath),
        backupDir = UMo();
      try {
        fsModule.mkdirSync(backupDir);
      } catch (mkdirErr) {
        if (cn(mkdirErr) !== "EEXIST") throw mkdirErr;
      }
      let existingCorrupted = fsModule.readdirStringSync(backupDir).filter(name => name.startsWith(`${filename}.corrupted.`)),
        newCorruptedPath,
        alreadyBacked = false,
        rawContent = fsModule.readFileSync(configPath, {
          encoding: "utf-8"
        });
      for (let corruptedName of existingCorrupted) try {
        let existingContent = fsModule.readFileSync(Rb.join(backupDir, corruptedName), {
          encoding: "utf-8"
        });
        if (rawContent === existingContent) {
          alreadyBacked = true;
          break;
        }
      } catch {}
      if (!alreadyBacked) {
        newCorruptedPath = Rb.join(backupDir, `${filename}.corrupted.${Date.now()}`);
        try {
          fsModule.copyFileSync(configPath, newCorruptedPath), A(`Corrupted config backed up to: ${newCorruptedPath}`, {
            level: "error"
          });
        } catch {}
      }
      let latestBackup = E5l(configPath);
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
  if (!config.projects) return DEFAULT_PROJECT_CONFIG;
  let projectConfig = config.projects[projectPath] ?? DEFAULT_PROJECT_CONFIG;
  if (typeof projectConfig.allowedTools === "string") projectConfig.allowedTools = ba(projectConfig.allowedTools) ?? [];
  return projectConfig;
}
function saveCurrentProjectConfig(updater) {
  let projectPath = getProjectPathForConfig(),
    newConfig = null;
  try {
    if (UQn(nI(), cV, existing => {
      let projectConfig = existing.projects?.[projectPath] ?? DEFAULT_PROJECT_CONFIG,
        updated = updater(projectConfig);
      if (updated === projectConfig) return existing;
      return newConfig = vOe({
        ...existing,
        projects: {
          ...existing.projects,
          [projectPath]: updated
        }
      }), newConfig;
    }) && newConfig) OKt(newConfig);
  } catch (err) {
    A(`Failed to save config with lock: ${err}`, {
      level: "error"
    });
    let reRead = bSe(nI(), cV);
    if (L_t(reRead)) {
      A("saveCurrentProjectConfig fallback: re-read config is missing auth that cache has; refusing to write. See GH #3117.", {
        level: "error"
      }), W("tengu_config_auth_loss_prevented", {});
      return;
    }
    let projectConfig = reRead.projects?.[projectPath] ?? DEFAULT_PROJECT_CONFIG,
      updated = updater(projectConfig);
    if (updated === projectConfig) return;
    newConfig = vOe({
      ...reRead,
      projects: {
        ...reRead.projects,
        [projectPath]: updated
      }
    }), BQn(newConfig, "save_project");
  }
}
function deleteProjectConfig(projectPath) {
  let newConfig = null,
    existed = null;
  try {
    let didUpdate = UQn(nI(), cV, existing => {
      if (!existing.projects?.[projectPath]) return existed = false, existing;
      existed = true;
      let {
        [projectPath]: removed,
        ...rest
      } = existing.projects;
      return newConfig = vOe({
        ...existing,
        projects: rest
      }), newConfig;
    });
    if (didUpdate && newConfig) OKt(newConfig);
    return didUpdate || existed === false;
  } catch (err) {
    A(`Failed to save config with lock: ${err}`, {
      level: "error"
    });
    let reRead = bSe(nI(), cV);
    if (L_t(reRead)) return A("deleteProjectConfig fallback: re-read config is missing auth that cache has; refusing to write. See GH #3117.", {
      level: "error"
    }), W("tengu_config_auth_loss_prevented", {}), false;
    if (!reRead.projects?.[projectPath]) return true;
    let {
      [projectPath]: removed,
      ...rest
    } = reRead.projects;
    return newConfig = vOe({
      ...reRead,
      projects: rest
    }), BQn(newConfig, "delete_project");
  }
}
function deleteCurrentProjectConfigFields(fields) {
  return v5l(fields, {
    projectPath: getProjectPathForConfig,
    saveWithLock: updater => UQn(nI(), cV, updater),
    writeCache: OKt,
    readConfigFallback: () => bSe(nI(), cV),
    wouldLoseAuth: L_t,
    fallbackSave: config => BQn(config, "delete_project_fields")
  });
}
function _deleteCurrentProjectConfigFieldsForTesting(fields, opts) {
  return v5l(fields, opts);
}
function v5l(fields, opts) {
  let removeFields = projectConfig => {
      let result = {
        ...projectConfig
      };
      for (let field of fields) delete result[field];
      return result;
    },
    projectPath = opts.projectPath(),
    existingProject = opts.readConfigFallback().projects?.[projectPath];
  if (!existingProject || !fields.some(field => field in existingProject)) return true;
  let newConfig = null,
    existed = null;
  try {
    let didUpdate = opts.saveWithLock(existing => {
      let projectConfig = existing.projects?.[projectPath];
      if (!projectConfig || !fields.some(field => field in projectConfig)) return existed = false, existing;
      return existed = true, newConfig = vOe({
        ...existing,
        projects: {
          ...existing.projects,
          [projectPath]: removeFields(projectConfig)
        }
      }), newConfig;
    });
    if (didUpdate && newConfig) opts.writeCache(newConfig);
    return didUpdate || existed === false;
  } catch (err) {
    A(`Failed to save config with lock: ${err}`, {
      level: "error"
    });
    let reRead = opts.readConfigFallback();
    if (opts.wouldLoseAuth(reRead)) return A("deleteCurrentProjectConfigFields fallback: re-read config is missing auth that cache has; refusing to write. See GH #3117.", {
      level: "error"
    }), W("tengu_config_auth_loss_prevented", {}), false;
    let projectConfig = reRead.projects?.[projectPath];
    if (!projectConfig || !fields.some(field => field in projectConfig)) return true;
    return newConfig = vOe({
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
  return isAutoUpdaterDisabled() && !nt(process.env.FORCE_AUTOUPDATE_PLUGINS);
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
  if (Ne.DISABLE_UPDATES) return {
    type: "env",
    envVar: "DISABLE_UPDATES"
  };
  if (Ne.DISABLE_AUTOUPDATER) return {
    type: "env",
    envVar: "DISABLE_AUTOUPDATER"
  };
  let envVar = pje();
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
  if (OMo) return OMo;
  let newId = BMo.randomBytes(32).toString("hex");
  OMo = newId;
  try {
    saveGlobalConfig(c => ({
      ...c,
      userID: newId
    }));
  } catch (err) {
    A(`getOrCreateUserID: could not persist userID: ${err}`, {
      level: "error"
    });
  }
  return newId;
}
function getOrCreateMachineID() {
  let config = getGlobalConfig();
  if (config.machineID) return config.machineID;
  if (LMo) return LMo;
  let newId = BMo.randomBytes(32).toString("hex");
  LMo = newId;
  try {
    saveGlobalConfig(c => ({
      ...c,
      machineID: newId
    }));
  } catch (err) {
    A(`getOrCreateMachineID: could not persist machineID: ${err}`, {
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
      return Rb.join(or(), "CLAUDE.md");
    case "Local":
      return Rb.join(cwd, "CLAUDE.local.md");
    case "Project":
      return Rb.join(cwd, "CLAUDE.md");
    case "Managed":
      return Rb.join(Fv(), "CLAUDE.md");
    case "AutoMem":
      return Ufe();
  }
}
function getManagedClaudeRulesDir() {
  return Rb.join(Fv(), ".claude", "rules");
}
function getUserClaudeRulesDir() {
  return Rb.join(or(), "rules");
}
function _setGlobalConfigCacheForTesting(config) {
  ede.config = config, ede.mtime = config ? Date.now() : 0;
}
function setClientDataCacheKeyGetter(getter) {
  DKt = getter;
}
function getCachedClientData() {
  if (!DKt) return null;
  let config = getGlobalConfig(),
    slotKey = DKt(),
    slots = config.clientDataCacheSlots;
  if (slots != null && Object.hasOwn(slots, slotKey)) return KSi(slots, slotKey);
  let legacy = config.clientDataCache;
  return typeof legacy === "object" && legacy !== null ? legacy : null;
}
function hasClientDataCacheSlot() {
  if (!DKt) return false;
  let slots = getGlobalConfig().clientDataCacheSlots;
  return slots != null && Object.hasOwn(slots, DKt());
}
var BMo,
  C5l,
  Rb,
  Pxm,
  xMo = false,
  DEFAULT_PROJECT_CONFIG,
  DEFAULT_GLOBAL_CONFIG,
  GLOBAL_CONFIG_KEYS,
  PROJECT_CONFIG_KEYS,
  trustDialogAcceptedCache = false,
  Mxm,
  Vfb,
  ede,
  ROe = null,
  xKt = 0,
  NQn = 0,
  Bxm = 1000,
  DMo = false,
  FMo = false,
  PMo = null,
  getProjectPathForConfig,
  OMo = null,
  LMo = null,
  _getConfigForTesting,
  _wouldLoseAuthStateForTesting,
  _removeProjectHistoryForTesting,
  _TEST_GLOBAL_CONFIG_FOR_TESTING,
  DKt = null;
var tr = b(() => {
  Wi();
  xpe();
  lt();
  Jm();
  kt();
  _$r();
  Po();
  ud();
  vd();
  qe();
  pf();
  Ir();
  dn();
  Ct();
  Xl();
  ps();
  ia();
  pd();
  Tu();
  $d();
  vTr();
  qK();
  lk();
  yUe();
  tn();
  LRt();
  BMo = require("crypto"), C5l = require("fs"), Rb = require("path"), Pxm = (fC(), oo(wbn)), DEFAULT_PROJECT_CONFIG = {
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
  DEFAULT_GLOBAL_CONFIG = cV(), GLOBAL_CONFIG_KEYS = ["apiKeyHelper", "installMethod", "autoUpdates", "autoUpdatesProtectedForNative", "theme", "verbose", "preferredNotifChannel", "shiftEnterKeyBindingInstalled", "editorMode", "hasUsedBackslashReturn", "autoCompactEnabled", "autoScrollEnabled", "showTurnDuration", "externalEditorContext", "showMessageTimestamps", "diffTool", "env", "tipsHistory", "todoFeatureEnabled", "showExpandedTodos", "briefTranscript", "diffSidebarOpen", "messageIdleNotifThresholdMs", "autoConnectIde", "autoInstallIdeExtension", "fileCheckpointingEnabled", "terminalProgressBarEnabled", "showStatusInTerminalTab", "taskCompleteNotifEnabled", "inputNeededNotifEnabled", "agentPushNotifEnabled", "respectGitignore", "claudeInChromeDefaultEnabled", "hasCompletedClaudeInChromeOnboarding", "lspRecommendationDisabled", "lspRecommendationNeverPlugins", "lspRecommendationIgnoredCount", "copyFullResponse", "copyOnSelect", "leftArrowOpensAgents", "defaultToAgentsView", "permissionExplainerEnabled", "prStatusFooterEnabled", "remoteControlAtStartup", "autoUploadSessions", "autoAddRemoteControlDaemonWorker", "remoteDialogSeen"];
  PROJECT_CONFIG_KEYS = ["allowedTools", "hasTrustDialogAccepted", "hasCompletedProjectOnboarding"];
  Mxm = {
    ...DEFAULT_GLOBAL_CONFIG,
    autoUpdates: false
  }, Vfb = {
    ...DEFAULT_PROJECT_CONFIG
  };
  ede = {
    config: null,
    mtime: 0
  };
  Si(async () => {
    Fxm();
  });
  getProjectPathForConfig = Hn(() => {
    let cwd = gr(),
      gitRoot = zm(cwd);
    if (gitRoot) return NK(gitRoot);
    return NK(Rb.resolve(cwd));
  });
  _getConfigForTesting = bSe, _wouldLoseAuthStateForTesting = L_t, _removeProjectHistoryForTesting = NMo, _TEST_GLOBAL_CONFIG_FOR_TESTING = Mxm;
  XSi(() => getCachedClientData());
});

export {JY,cV,isGlobalConfigKey,resetTrustDialogAcceptedCache,checkHasTrustDialogAccepted,isProjectScopeTrustAccepted,checkTrustDialogAcceptedInternal as Lxm,isPathTrusted,setPathTrusted,isProjectConfigKey,L_t,saveGlobalConfig,Fxm,MMo,vOe,NMo,Uxm,OKt,getGlobalConfig,getRemoteControlAtStartup,getDaemonColdStart,getCustomApiKeyStatus,BQn,UQn,enableConfigs,UMo,E5l,bSe,getRawCurrentProjectConfigEntry,getCurrentProjectConfig,saveCurrentProjectConfig,deleteProjectConfig,deleteCurrentProjectConfigFields,_deleteCurrentProjectConfigFieldsForTesting,v5l,isAutoUpdaterDisabled,shouldSkipPluginAutoupdate,formatAutoUpdaterDisabledReason,getAutoUpdaterDisabledReason,getOrCreateUserID,getOrCreateMachineID,recordFirstStartTime,getMemoryPath,getManagedClaudeRulesDir,getUserClaudeRulesDir,_setGlobalConfigCacheForTesting,setClientDataCacheKeyGetter,getCachedClientData,hasClientDataCacheSlot,BMo,C5l,Rb,Pxm,xMo,DEFAULT_PROJECT_CONFIG,DEFAULT_GLOBAL_CONFIG,GLOBAL_CONFIG_KEYS,PROJECT_CONFIG_KEYS,trustDialogAcceptedCache as R5l,Mxm,Vfb,ede,ROe,xKt,NQn,Bxm,DMo,FMo,PMo,getProjectPathForConfig,OMo,LMo,_getConfigForTesting,_wouldLoseAuthStateForTesting,_removeProjectHistoryForTesting,_TEST_GLOBAL_CONFIG_FOR_TESTING,DKt,tr};
