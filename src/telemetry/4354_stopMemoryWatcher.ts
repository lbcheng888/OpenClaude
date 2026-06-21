// @ts-nocheck
import {isFullscreenWithTTY as J_,b as L} from "../../runtime.ts";
import {gf as Jz,tA as xz} from "../config/2201_tA.ts";
import {PIn as OV_,jhe as ZKH,a9e as x8_,y1t as zV_} from "./3249_y1t.ts";
import {logForDebugging as y,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {mAo as wTq,pAo as YTq,cAo as TTq,dAo as $Tq,QJa as IiK} from "../config/4353_stores.ts";
import {Se as ZH,bt as R_} from "../../vendor/m195.ts";
import {aAo as KTq,lqn as lm6,sAo as _Tq,rAo as eOq,iAo as qTq,BJa as ZiK} from "./4351_level.ts";
import {M1 as Nv,sie as C9H} from "../../vendor/m2261.ts";
import {CJa as TiK,Qfo as rOq} from "../../vendor/m4348.ts";
import {checkHasTrustDialogAccepted as kO,Qn as O8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {_debugModuleInit as tZ_,dE as ih,GO as Sy} from "./2241_GO.ts";
import {Gi as B7,ReactHooks as n3} from "../../vendor/m133.ts";
import {tie as eXH,RQe as nZ_} from "../../vendor/m2234.ts";
import {Oe as bH,Ie as EH,ln as f6} from "./0594_feature_name.ts";
import {getGithubRepo as JVH,Ba as uK} from "../../vendor/m693.ts";
import {HBr as XE8,_yn as fA6} from "../../vendor/m2236.ts";
// @ts-nocheck
var sm6 = {};
J_(sm6, {
  stopMemoryWatcher: () => stopMemoryWatcher,
  startMemoryWatcher: () => startMemoryWatcher,
  notifyMemoryWrite: () => notifyMemoryWrite,
  maybeResyncStaleStores: () => maybeResyncStaleStores,
  isPermanentFailure: () => isPermanentFailure,
  _startFileWatcherForTesting: () => _startFileWatcherForTesting,
  _resyncTimerForTesting: () => _resyncTimerForTesting,
  _resetWatcherStateForTesting: () => _resetWatcherStateForTesting,
  _lastSyncCompletedAtForTesting: () => _lastSyncCompletedAtForTesting,
  _armResyncTimerForTesting: () => _armResyncTimerForTesting,
  UNLINK_RECOVERABLE_REASONS_BY_SCOPE: () => UNLINK_RECOVERABLE_REASONS_BY_SCOPE
});
function createInitialWatcherState() {
  return {
    syncState: null,
    debounceTimer: null,
    pushInProgress: false,
    hasPendingChanges: false,
    changeSeq: 0,
    currentPushPromise: null,
    pushSuppressedReason: null,
    lastSyncCompletedAt: null
  };
}
function isUnlinkRecoverable(scope, reason) {
  return UNLINK_RECOVERABLE_REASONS_BY_SCOPE[scope].has(reason);
}
function isPermanentFailure(err) {
  if (err.errorType === "no_oauth" || err.errorType === "server_unavailable") return true;
  if (err.httpStatus !== undefined && err.httpStatus >= 400 && err.httpStatus < 500 && err.httpStatus !== 409 && err.httpStatus !== 429) return true;
  return false;
}
function resolvePathScope(filePath) {
  let memDir = Jz(),
    relativePath = B5_.relative(memDir, filePath).replaceAll(B5_.sep, "/");
  if (relativePath === "" || relativePath.startsWith("..")) return null;
  let segments = relativePath.split("/");
  if (OV_(segments[0]) === "team") return "team";
  if (ZKH(relativePath)) return null;
  return "user";
}
function suppressPushForScope(scope, reason, extra) {
  let state = watcherStates[scope];
  if (state.pushSuppressedReason !== null) return;
  state.pushSuppressedReason = reason;
  let recoverableHint = isUnlinkRecoverable(scope, reason) ? " (recoverable via file deletion)" : "";
  if (y(`memory-watcher[${scope}]: suppressing retry for the rest of this session (${reason})${recoverableHint}`, {
    level: "warn"
  }), scope === "team") c("tengu_team_mem_push_suppressed", {
    reason: reason,
    ...extra
  });
}
async function performPush(scope, trigger = "watch") {
  let state = watcherStates[scope],
    multiStoreState = scope === "team" ? teamMultiStore : scope === "user" ? userMultiStore : null;
  if (multiStoreState) {
    state.pushInProgress = true;
    let savedSeq = state.changeSeq;
    try {
      let storeList = multiStoreState.stores,
        prevSuppressed = new Set(storeList.filter(s => s.suppressedReason !== null).map(s => s.mountName)),
        pushResult = await wTq(multiStoreState, trigger);
      if (!Object.values(pushResult.pushes).some(p => !p.success) && state.changeSeq === savedSeq) state.hasPendingChanges = false;
      if (scope === "team") {
        for (let store of storeList) if (store.suppressedReason !== null && !prevSuppressed.has(store.mountName)) c("tengu_team_mem_push_suppressed", {
          reason: store.suppressedReason,
          multistore: true,
          mount: store.mountName
        });
      }
      if (storeList.length > 0 && storeList.every(s => s.suppressedReason !== null)) suppressPushForScope(scope, storeList[0].suppressedReason, {
        multistore: true,
        stores: storeList.length
      });
    } catch (err) {
      y(`memory-watcher[${scope}]: multi-store sync error: ${ZH(err)}`, {
        level: "warn"
      });
    } finally {
      state.lastSyncCompletedAt = Date.now(), state.pushInProgress = false, state.currentPushPromise = null, scheduleResyncTimer();
    }
    return;
  }
  if (!state.syncState) return;
  state.pushInProgress = true;
  let savedSeq = state.changeSeq;
  try {
    let pushResult = await KTq(state.syncState);
    if (pushResult.success) {
      if (scope !== "user" || state.changeSeq === savedSeq) state.hasPendingChanges = false;
    }
    if (pushResult.success && pushResult.filesUploaded > 0) y(`memory-watcher[${scope}]: pushed ${pushResult.filesUploaded} files`, {
      level: "info"
    });else if (!pushResult.success) {
      if (y(`memory-watcher[${scope}]: push failed: ${pushResult.error}`, {
        level: "warn"
      }), isPermanentFailure(pushResult)) {
        if (pushResult.serverErrorCode === "team_memory_group_acl_denied" || pushResult.serverErrorCode === "team_memory_group_acl_unconfigured") y(`memory-watcher[${scope}]: ${pushResult.serverMessage || "Team memory is restricted to specific groups for your organization."} Contact your administrator for access.`, {
          level: "warn"
        });
        suppressPushForScope(scope, pushResult.serverErrorCode ?? (pushResult.httpStatus !== undefined ? `http_${pushResult.httpStatus}` : pushResult.errorType ?? "unknown"), {
          ...(pushResult.httpStatus && {
            status: pushResult.httpStatus
          }),
          ...(pushResult.serverMessage !== undefined && {
            server_message: pushResult.serverMessage
          }),
          ...(pushResult.serverErrorCode !== undefined && {
            server_error_code: pushResult.serverErrorCode
          }),
          ...(pushResult.serverErrorType !== undefined && {
            server_error_type: pushResult.serverErrorType
          })
        });
      }
    }
  } catch (err) {
    y(`memory-watcher[${scope}]: push error: ${ZH(err)}`, {
      level: "warn"
    });
  } finally {
    state.pushInProgress = false, state.currentPushPromise = null;
  }
}
function scheduleDebouncedPush(scope) {
  let state = watcherStates[scope];
  if (state.pushSuppressedReason !== null) return;
  if (state.hasPendingChanges = true, state.changeSeq++, state.debounceTimer) clearTimeout(state.debounceTimer);
  state.debounceTimer = setTimeout(onDebounceExpired, DEBOUNCE_DELAY_MS, scope);
}
function isUserSyncEnabled() {
  return userMultiStore ? lm6() : x8_();
}
function isScopeEnabled(scope) {
  return scope === "user" ? isUserSyncEnabled() : lm6();
}
function onDebounceExpired(scope) {
  let state = watcherStates[scope];
  if (scope === "user" && !isUserSyncEnabled()) {
    if (state.debounceTimer) clearTimeout(state.debounceTimer), state.debounceTimer = null;
    if (state.syncState) state.syncState.aborted = true;
    y("memory-watcher[user]: personal sync disabled mid-session \u2014 pausing (reversible)", {
      level: "info"
    });
    return;
  }
  if (scope === "user" && !state.pushInProgress && state.syncState?.aborted) state.syncState.aborted = false;
  if (state.pushInProgress) {
    scheduleDebouncedPush(scope);
    return;
  }
  if (state.pushSuppressedReason !== null) return;
  if (!state.hasPendingChanges) return;
  state.currentPushPromise = performPush(scope);
}
function maybeResyncStaleStores() {
  try {
    if (!watcherStarted) return;
    let intervalMs = YTq();
    if (intervalMs <= 0) return;
    let now = Date.now();
    for (let scope of ["team", "user"]) {
      if (!(scope === "team" ? teamMultiStore : userMultiStore)) continue;
      let state = watcherStates[scope];
      if (state.pushSuppressedReason !== null || state.pushInProgress) continue;
      if (state.lastSyncCompletedAt === null || now - state.lastSyncCompletedAt <= intervalMs) continue;
      if (!isScopeEnabled(scope)) continue;
      state.currentPushPromise = performPush(scope, "periodic");
    }
  } catch (err) {
    y(`memory-watcher: stale-store check failed: ${ZH(err)}`, {
      level: "warn"
    });
  }
}
function scheduleResyncTimer() {
  if (resyncTimerHandle) clearTimeout(resyncTimerHandle), resyncTimerHandle = null;
  if (!watcherStarted) return;
  let intervalMs = YTq();
  if (intervalMs <= 0) return;
  let now = Date.now(),
    earliest = null;
  for (let scope of ["team", "user"]) {
    if (!(scope === "team" ? teamMultiStore : userMultiStore)) continue;
    let state = watcherStates[scope];
    if (state.pushSuppressedReason !== null || state.pushInProgress || state.lastSyncCompletedAt === null) continue;
    let nextTime = isScopeEnabled(scope) ? state.lastSyncCompletedAt + intervalMs : now + intervalMs;
    if (earliest === null || nextTime < earliest) earliest = nextTime;
  }
  if (earliest === null) return;
  let delayMs = Math.max(earliest - now, MIN_RESYNC_DELAY_MS),
    timer = setTimeout(() => {
      resyncTimerHandle = null, maybeResyncStaleStores(), scheduleResyncTimer();
    }, delayMs);
  timer.unref?.(), resyncTimerHandle = timer;
}
function isScopeActive(scope) {
  if (scope === "team" && teamMultiStore) return true;
  if (scope === "user" && userMultiStore) return true;
  return watcherStates[scope].syncState !== null;
}
async function startFileWatcher(watchDir) {
  if (watcherStarted) return;
  watcherStarted = true, await fsMkdir.mkdir(watchDir, {
    recursive: true
  }).catch(K => y(`memory-watcher: mkdir ${watchDir} failed: ${ZH(K)}`, {
    level: "warn"
  }));
  let _ = K => {
      let O = resolvePathScope(K);
      if (O === null || !isScopeActive(O)) return;
      scheduleDebouncedPush(O);
    },
    onFileChanged = filePath => {
      let scope = resolvePathScope(filePath);
      if (scope === null || !isScopeActive(scope)) return;
      let T = watcherStates[scope];
      if (T.pushSuppressedReason !== null && isUnlinkRecoverable(scope, T.pushSuppressedReason)) y(`memory-watcher[${scope}]: unlink cleared suppression (was: ${T.pushSuppressedReason})`, {
        level: "info"
      }), T.pushSuppressedReason = null;
      scheduleDebouncedPush(scope);
    };
  fileWatcherInstance = Nv.watch(watchDir, {
    persistent: true,
    ignoreInitial: true,
    usePolling: USE_POLLING,
    interval: POLLING_INTERVAL_MS,
    ignorePermissionErrors: true,
    ignored: K => {
      let O = B5_.relative(Jz(), K).replaceAll(B5_.sep, "/");
      if (O === "" || O.startsWith("..")) return false;
      let T = O.split("/");
      if (OV_(T[0]) === "team") return false;
      return ZKH(O);
    }
  }), fileWatcherInstance.on("add", _), fileWatcherInstance.on("change", _), fileWatcherInstance.on("unlink", onFileChanged), fileWatcherInstance.on("error", K => {
    y(`memory-watcher: watcher error: ${ZH(K)}`, {
      level: "warn"
    });
  }), y(`memory-watcher: watching ${watchDir}`, {
    level: "debug"
  }), scheduleResyncTimer();
}
async function startMemoryWatcher() {
  try {
    await initializeWatcher();
  } finally {
    TiK();
  }
}
async function initializeWatcher() {
  if (!kO()) return;
  let shouldEnableTeam = process.env.CLAUDE_MEMORY_STORES?.trim() ? lm6() : tZ_() && _Tq("team"),
    shouldEnableUser = x8_() && _Tq("user");
  if (!shouldEnableTeam && !shouldEnableUser) return;
  B7(async () => stopMemoryWatcher());
  let parsedStores = null,
    storeConfigInvalid = false;
  if (shouldEnableTeam) try {
    parsedStores = eXH();
  } catch (err) {
    y(`memory-watcher: CLAUDE_MEMORY_STORES invalid, disabling team sync: ${ZH(err)}`, {
      level: "error"
    }), c("tengu_team_mem_multistore_config_invalid", {
      error: ZH(err)
    }), bH("team_memory_sync_watcher_start", "config_invalid"), parsedStores = null, storeConfigInvalid = true;
  }
  let githubRepo = await JVH();
  if (shouldEnableUser && githubRepo) watcherStates.user.syncState = eOq("user", githubRepo);
  if (parsedStores !== null) {
    let teamStores = parsedStores.filter(s => s.scope === "team"),
      userStores = parsedStores.filter(s => s.scope === "user");
    if (teamStores.length > 0) teamMultiStore = TTq(XE8(teamStores), teamStores.map(s => ({
      mount: s.mount,
      scope: s.scope
    })));
    if (userStores.length > 0) userMultiStore = TTq(XE8(userStores), userStores.map(Y => ({
      mount: Y.mount,
      scope: Y.scope
    }))), watcherStates.user.syncState = null;
    let doInitialPush = async (scope, multiStore) => {
      if (!multiStore) return;
      let state = watcherStates[scope];
      state.pushInProgress = true;
      let pushPromise = wTq(multiStore, "startup");
      state.currentPushPromise = pushPromise.then(() => {
        return;
      }).catch(() => {
        return;
      });
      try {
        await pushPromise;
      } catch (err) {
        y(`memory-watcher[${scope}]: multi-store initial sync failed: ${ZH(err)}`, {
          level: "warn"
        });
      } finally {
        state.lastSyncCompletedAt = Date.now(), state.pushInProgress = false, state.currentPushPromise = null, scheduleResyncTimer();
      }
    };
    if (await doInitialPush("team", teamMultiStore), await doInitialPush("user", userMultiStore), teamMultiStore) EH("team_memory_sync_watcher_start"), c("tengu_team_mem_sync_started", {
      multistore: true,
      stores: teamMultiStore.stores.length,
      watcher_started: true
    });
    if (userMultiStore) EH("personal_memory_sync_watcher_start"), c("tengu_personal_mem_sync_started", {
      multistore: true,
      watcher_started: true
    });
  }
  if (!githubRepo) {
    if (y("memory-watcher: no github.com remote, skipping sync", {
      level: "debug"
    }), teamMultiStore || userMultiStore) await startFileWatcher(userMultiStore ? Jz() : ih());
    return;
  }
  if (shouldEnableTeam && parsedStores === null && !storeConfigInvalid) watcherStates.team.syncState = eOq("team", githubRepo);
  if (watcherStates.team.syncState) await doInitialPullForScope("team");
  if (watcherStates.user.syncState) await doInitialPullForScope("user");
  if (watcherStates.team.syncState || watcherStates.user.syncState || teamMultiStore || userMultiStore) {
    let hasUserSync = watcherStates.user.syncState || userMultiStore;
    await startFileWatcher(hasUserSync ? Jz() : ih());
  }
}
async function doInitialPullForScope(scope) {
  let state = watcherStates[scope];
  if (!state.syncState) return;
  if (state.syncState.pulled) {
    if (y(`memory-watcher[${scope}]: initial pull skipped \u2014 basis already established by lazy pull-on-first-push`, {
      level: "debug"
    }), scope === "team") EH("team_memory_sync_watcher_start"), c("tengu_team_mem_sync_started", {
      initial_pull_success: true,
      initial_files_pulled: 0,
      initial_files_reaped: 0,
      watcher_started: true,
      server_has_content: state.syncState.serverChecksums.size > 0
    });else EH("personal_memory_sync_watcher_start");
    return;
  }
  let pullSuccess = false,
    filesPulled = 0,
    filesReaped = 0,
    serverHasContent = false;
  try {
    let pullResult = await qTq(state.syncState, {
      skipEtagCache: true
    });
    if (pullSuccess = pullResult.success, serverHasContent = pullResult.entryCount > 0, pullResult.success && (pullResult.filesWritten > 0 || pullResult.filesReaped > 0)) filesPulled = pullResult.filesWritten, filesReaped = pullResult.filesReaped, y(`memory-watcher[${scope}]: initial pull got ${pullResult.filesWritten} files` + (pullResult.filesReaped > 0 ? `, reaped ${pullResult.filesReaped} tombstoned` : ""), {
      level: "info"
    });
  } catch (err) {
    y(`memory-watcher[${scope}]: initial pull failed: ${ZH(err)}`, {
      level: "warn"
    });
  }
  if (scope === "team") EH("team_memory_sync_watcher_start"), c("tengu_team_mem_sync_started", {
    initial_pull_success: pullSuccess,
    initial_files_pulled: filesPulled,
    initial_files_reaped: filesReaped,
    watcher_started: true,
    server_has_content: serverHasContent
  });else EH("personal_memory_sync_watcher_start");
}
async function notifyMemoryWrite(filePath) {
  let scope = resolvePathScope(filePath);
  if (scope === null || !isScopeActive(scope)) return;
  scheduleDebouncedPush(scope);
}
async function stopMemoryWatcher() {
  if (resyncTimerHandle) clearTimeout(resyncTimerHandle), resyncTimerHandle = null;
  for (let scope of ["team", "user"]) {
    let state = watcherStates[scope];
    if (state.debounceTimer) clearTimeout(state.debounceTimer), state.debounceTimer = null;
  }
  if (fileWatcherInstance) await fileWatcherInstance.close().catch(() => {}), fileWatcherInstance = null;
  if (await Promise.all(["team", "user"].map(async scope => {
    let state = watcherStates[scope];
    if (state.currentPushPromise) try {
      await state.currentPushPromise;
    } catch {}
  })), resyncTimerHandle) clearTimeout(resyncTimerHandle), resyncTimerHandle = null;
  await Promise.all(["team", "user"].map(async scope => {
    let state = watcherStates[scope];
    if (!state.hasPendingChanges || state.pushSuppressedReason !== null) return;
    if (scope === "user" && !isUserSyncEnabled()) {
      if (state.hasPendingChanges = false, state.syncState) state.syncState.aborted = true;
      y("memory-watcher[user]: personal sync disabled \u2014 skipping shutdown flush", {
        level: "info"
      });
      return;
    }
    try {
      let multiStore = scope === "team" ? teamMultiStore : scope === "user" ? userMultiStore : null;
      if (multiStore) await Promise.all(multiStore.stores.filter(s => s.suppressedReason === null).map(s => $Tq(s)));else if (state.syncState) {
        if (scope === "user") state.syncState.aborted = false;
        await KTq(state.syncState);
      }
    } catch {}
  }));
}
function _resetWatcherStateForTesting(opts) {
  if (fileWatcherInstance = null, resyncTimerHandle) clearTimeout(resyncTimerHandle), resyncTimerHandle = null;
  watcherStarted = opts?.skipWatcher ?? false, teamMultiStore = opts?.multiStoreState ?? null, userMultiStore = opts?.userMultiStoreState ?? null, watcherStates.team = createInitialWatcherState(), watcherStates.team.syncState = opts?.teamSyncState ?? null, watcherStates.team.pushSuppressedReason = opts?.teamPushSuppressedReason ?? null, watcherStates.team.lastSyncCompletedAt = opts?.teamLastSyncCompletedAt ?? null, watcherStates.user = createInitialWatcherState(), watcherStates.user.syncState = opts?.userSyncState ?? null, watcherStates.user.pushSuppressedReason = opts?.userPushSuppressedReason ?? null, watcherStates.user.lastSyncCompletedAt = opts?.userLastSyncCompletedAt ?? null;
}
function _startFileWatcherForTesting(dir) {
  return startFileWatcher(dir);
}
function _lastSyncCompletedAtForTesting(scope) {
  return watcherStates[scope].lastSyncCompletedAt;
}
function _resyncTimerForTesting() {
  return resyncTimerHandle;
}
function _armResyncTimerForTesting() {
  scheduleResyncTimer();
}
var fsMkdir,
  B5_,
  DEBOUNCE_DELAY_MS = 2000,
  USE_POLLING,
  POLLING_INTERVAL_MS = 2000,
  fileWatcherInstance = null,
  watcherStarted = false,
  resyncTimerHandle = null,
  MIN_RESYNC_DELAY_MS = 1000,
  watcherStates,
  teamMultiStore = null,
  userMultiStore = null,
  UNLINK_RECOVERABLE_REASONS_BY_SCOPE;
var tm6 = L(() => {
  C9H();
  xz();
  zV_();
  Sy();
  n3();
  O8();
  UH();
  R_();
  uK();
  f6();
  v_();
  fA6();
  nZ_();
  rOq();
  ZiK();
  IiK();
  fsMkdir = require("fs/promises"), B5_ = require("path"), USE_POLLING = typeof Bun < "u";
  watcherStates = {
    team: createInitialWatcherState(),
    user: createInitialWatcherState()
  }, UNLINK_RECOVERABLE_REASONS_BY_SCOPE = {
    team: new Set(["team_memory_too_many_entries", "http_413"]),
    user: new Set()
  };
});

export {sm6 as Aqn,createInitialWatcherState as pqn,isUnlinkRecoverable as rXa,isPermanentFailure,resolvePathScope as fAo,suppressPushForScope as ZJa,performPush as sXa,scheduleDebouncedPush as mqn,isUserSyncEnabled as gAo,isScopeEnabled as iXa,onDebounceExpired as TUp,maybeResyncStaleStores,scheduleResyncTimer as u4t,isScopeActive as AAo,startFileWatcher as hAo,startMemoryWatcher,initializeWatcher as bUp,doInitialPullForScope as eXa,notifyMemoryWrite,stopMemoryWatcher,_resetWatcherStateForTesting,_startFileWatcherForTesting,_lastSyncCompletedAtForTesting,_resyncTimerForTesting,_armResyncTimerForTesting,fsMkdir as tXa,B5_ as $dt,DEBOUNCE_DELAY_MS as hUp,USE_POLLING as gUp,POLLING_INTERVAL_MS as _Up,fileWatcherInstance as M_e,watcherStarted as c4t,resyncTimerHandle as B9,MIN_RESYNC_DELAY_MS as yUp,watcherStates as IT,teamMultiStore as aJ,userMultiStore as F6,UNLINK_RECOVERABLE_REASONS_BY_SCOPE,tm6 as hqn};
