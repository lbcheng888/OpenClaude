// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {xm,Jm} from "../config/2207_Jm.ts";
import {CPn,t_e,g3e,JFt} from "./3265_JFt.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {x8n,sSo,w8n,I8n,O6t,Orl} from "../config/4375_stores.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {rSo,D6t,tSo,ZTo,nSo,mrl} from "./4373_level.ts";
import {jM,oie} from "../../vendor/m2269.ts";
import {Znl,jTo} from "../../vendor/m4370.ts";
import {checkHasTrustDialogAccepted as kd,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {hI,_E,Qfe,cO} from "./2249_cO.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {eie,ket} from "../../vendor/m2242.ts";
import {xe,He,mn} from "./0600_feature_name.ts";
import {getGithubRepo as z1e,ia} from "../../vendor/m698.ts";
import {eEn,tEn} from "../../vendor/m2244.ts";
var M8n = {};
ft(M8n, {
  stopMemoryWatcher: () => stopMemoryWatcher,
  startMemoryWatcher: () => startMemoryWatcher,
  rebuildStoreSet: () => rebuildStoreSet,
  notifyMemoryWrite: () => notifyMemoryWrite,
  maybeResyncStaleStores: () => maybeResyncStaleStores,
  isPermanentFailure: () => isPermanentFailure,
  _startFileWatcherForTesting: () => _startFileWatcherForTesting,
  _resyncTimerForTesting: () => _resyncTimerForTesting,
  _resetWatcherStateForTesting: () => _resetWatcherStateForTesting,
  _multiStoreStateForTesting: () => _multiStoreStateForTesting,
  _lastSyncCompletedAtForTesting: () => _lastSyncCompletedAtForTesting,
  _armResyncTimerForTesting: () => _armResyncTimerForTesting,
  UNLINK_RECOVERABLE_REASONS_BY_SCOPE: () => UNLINK_RECOVERABLE_REASONS_BY_SCOPE
});
/** Build a fresh per-scope watcher state record (team/user). */
function createInitialWatcherState() {
  return {
    syncState: null,
    debounceTimer: null,
    pushInProgress: !1,
    hasPendingChanges: !1,
    changeSeq: 0,
    currentPushPromise: null,
    pushSuppressedReason: null,
    lastSyncCompletedAt: null
  };
}
/** Whether a suppressed push for `scope` can be cleared by deleting the offending file. */
function isUnlinkRecoverable(scope: string, reason: string): boolean {
  return UNLINK_RECOVERABLE_REASONS_BY_SCOPE[scope].has(reason);
}
/** Classify a push failure as permanently fatal for this session (no retry worthwhile). */
function isPermanentFailure(err): boolean {
  if (err.errorType === "no_oauth" || err.errorType === "server_unavailable") return !0;
  if (err.httpStatus !== void 0 && err.httpStatus >= 400 && err.httpStatus < 500 && err.httpStatus !== 409 && err.httpStatus !== 429) return !0;
  return !1;
}
/** Map an absolute file path to its memory scope ("team" | "user") or null if outside the memory dir. */
function resolvePathScope(filePath: string): string | null {
  let memDir = xm(),
    relativePath = $mt.relative(memDir, filePath).replaceAll($mt.sep, "/");
  if (relativePath === "" || relativePath.startsWith("..")) return null;
  let segments = relativePath.split("/");
  if (CPn(segments[0]) === "team") return "team";
  if (t_e(relativePath)) return null;
  return "user";
}
/** Record `reason` as the suppression cause for `scope` and emit telemetry (team only). */
function suppressPushForScope(scope: string, reason: string, extra): void {
  let state = $y[scope];
  if (state.pushSuppressedReason !== null) return;
  state.pushSuppressedReason = reason;
  let recoverableHint = isUnlinkRecoverable(scope, reason) ? " (recoverable via file deletion)" : "";
  if (A(`memory-watcher[${scope}]: suppressing retry for the rest of this session (${reason})${recoverableHint}`, {
    level: "warn"
  }), scope === "team") W("tengu_team_mem_push_suppressed", {
    reason: reason,
    ...extra
  });
}
/** Push pending memory changes for `scope`, handling both multi-store and single-store sync states. */
async function performPush(scope: string, trigger = "watch"): Promise<void> {
  let state = $y[scope],
    multiStoreState = scope === "team" ? teamMultiStore : scope === "user" ? userMultiStore : null;
  if (multiStoreState) {
    state.pushInProgress = !0;
    let savedSeq = state.changeSeq;
    try {
      let storeList = multiStoreState.stores,
        prevSuppressed = new Set(storeList.filter(s => s.suppressedReason !== null).map(s => s.mountName)),
        pushResult = await x8n(multiStoreState, trigger);
      if (!Object.values(pushResult.pushes).some(p => !p.success) && state.changeSeq === savedSeq) state.hasPendingChanges = !1;
      if (scope === "team") {
        for (let store of storeList) if (store.suppressedReason !== null && !prevSuppressed.has(store.mountName)) W("tengu_team_mem_push_suppressed", {
          reason: store.suppressedReason,
          multistore: !0,
          mount: store.mountName
        });
      }
      if (storeList.length > 0 && storeList.every(s => s.suppressedReason !== null)) suppressPushForScope(scope, storeList[0].suppressedReason, {
        multistore: !0,
        stores: storeList.length
      });
    } catch (err) {
      A(`memory-watcher[${scope}]: multi-store sync error: ${Ce(err)}`, {
        level: "warn"
      });
    } finally {
      state.lastSyncCompletedAt = Date.now(), state.pushInProgress = !1, state.currentPushPromise = null, scheduleResyncTimer();
    }
    return;
  }
  if (!state.syncState) return;
  state.pushInProgress = !0;
  let savedSeq = state.changeSeq;
  try {
    let pushResult = await rSo(state.syncState);
    if (pushResult.success) {
      if (scope !== "user" || state.changeSeq === savedSeq) state.hasPendingChanges = !1;
    }
    if (pushResult.success && pushResult.filesUploaded > 0) A(`memory-watcher[${scope}]: pushed ${pushResult.filesUploaded} files`, {
      level: "info"
    });else if (!pushResult.success) {
      if (A(`memory-watcher[${scope}]: push failed: ${pushResult.error}`, {
        level: "warn"
      }), isPermanentFailure(pushResult)) {
        if (pushResult.serverErrorCode === "team_memory_group_acl_denied" || pushResult.serverErrorCode === "team_memory_group_acl_unconfigured") A(`memory-watcher[${scope}]: ${pushResult.serverMessage || "Team memory is restricted to specific groups for your organization."} Contact your administrator for access.`, {
          level: "warn"
        });
        suppressPushForScope(scope, pushResult.serverErrorCode ?? (pushResult.httpStatus !== void 0 ? `http_${pushResult.httpStatus}` : pushResult.errorType ?? "unknown"), {
          ...(pushResult.httpStatus && {
            status: pushResult.httpStatus
          }),
          ...(pushResult.serverMessage !== void 0 && {
            server_message: pushResult.serverMessage
          }),
          ...(pushResult.serverErrorCode !== void 0 && {
            server_error_code: pushResult.serverErrorCode
          }),
          ...(pushResult.serverErrorType !== void 0 && {
            server_error_type: pushResult.serverErrorType
          })
        });
      }
    }
  } catch (err) {
    A(`memory-watcher[${scope}]: push error: ${Ce(err)}`, {
      level: "warn"
    });
  } finally {
    state.pushInProgress = !1, state.currentPushPromise = null;
  }
}
/** Mark pending changes for `scope` and (re)arm the debounce timer that triggers a push. */
function scheduleDebouncedPush(scope: string): void {
  let state = $y[scope];
  if (state.pushSuppressedReason !== null) return;
  if (state.hasPendingChanges = !0, state.changeSeq++, state.debounceTimer) clearTimeout(state.debounceTimer);
  state.debounceTimer = setTimeout(onDebounceExpired, DEBOUNCE_DELAY_MS, scope);
}
/** Whether user-scope sync is currently enabled (multi-store vs single-store gating). */
function isUserSyncEnabled(): boolean {
  return userMultiStore ? D6t() : g3e();
}
/** Whether the given scope's sync is enabled. */
function isScopeEnabled(scope: string): boolean {
  return scope === "user" ? isUserSyncEnabled() : D6t();
}
/** Debounce-timer callback: perform a push for `scope` unless paused/suppressed/in-flight. */
function onDebounceExpired(scope: string): void {
  let state = $y[scope];
  if (scope === "user" && !isUserSyncEnabled()) {
    if (state.debounceTimer) clearTimeout(state.debounceTimer), state.debounceTimer = null;
    if (state.syncState) state.syncState.aborted = !0;
    A("memory-watcher[user]: personal sync disabled mid-session — pausing (reversible)", {
      level: "info"
    });
    return;
  }
  if (scope === "user" && !state.pushInProgress && state.syncState?.aborted) state.syncState.aborted = !1;
  if (state.pushInProgress) {
    scheduleDebouncedPush(scope);
    return;
  }
  if (state.pushSuppressedReason !== null) return;
  if (!state.hasPendingChanges) return;
  state.currentPushPromise = performPush(scope);
}
/** Periodically re-push stores whose last sync is older than the configured stale interval. */
function maybeResyncStaleStores(): void {
  try {
    if (!watcherStarted) return;
    let intervalMs = sSo();
    if (intervalMs <= 0) return;
    let now = Date.now();
    for (let scope of ["team", "user"]) {
      if (!(scope === "team" ? teamMultiStore : userMultiStore)) continue;
      let state = $y[scope];
      if (state.pushSuppressedReason !== null || state.pushInProgress) continue;
      if (state.lastSyncCompletedAt === null || now - state.lastSyncCompletedAt <= intervalMs) continue;
      if (!isScopeEnabled(scope)) continue;
      state.currentPushPromise = performPush(scope, "periodic");
    }
  } catch (err) {
    A(`memory-watcher: stale-store check failed: ${Ce(err)}`, {
      level: "warn"
    });
  }
}
/** Compute the next stale-resync deadline across scopes and arm a single shared timer. */
function scheduleResyncTimer(): void {
  if (resyncTimerHandle) clearTimeout(resyncTimerHandle), resyncTimerHandle = null;
  if (!watcherStarted) return;
  let intervalMs = sSo();
  if (intervalMs <= 0) return;
  let now = Date.now(),
    earliest = null;
  for (let scope of ["team", "user"]) {
    if (!(scope === "team" ? teamMultiStore : userMultiStore)) continue;
    let state = $y[scope];
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
/** Whether `scope` currently has an active sync (multi-store present or single-store state set). */
function isScopeActive(scope: string): boolean {
  if (scope === "team" && teamMultiStore) return !0;
  if (scope === "user" && userMultiStore) return !0;
  return $y[scope].syncState !== null;
}
/** Start watching `watchDir` for memory file changes and wire debounced pushes. */
async function startFileWatcher(watchDir: string): Promise<void> {
  if (watcherStarted) return;
  watcherStarted = !0, await fsMkdir.mkdir(watchDir, {
    recursive: !0
  }).catch(err => A(`memory-watcher: mkdir ${watchDir} failed: ${Ce(err)}`, {
    level: "warn"
  }));
  let onAddOrChange = filePath => {
      let scope = resolvePathScope(filePath);
      if (scope === null || !isScopeActive(scope)) return;
      scheduleDebouncedPush(scope);
    },
    onUnlink = filePath => {
      let scope = resolvePathScope(filePath);
      if (scope === null || !isScopeActive(scope)) return;
      let state = $y[scope];
      if (state.pushSuppressedReason !== null && isUnlinkRecoverable(scope, state.pushSuppressedReason)) A(`memory-watcher[${scope}]: unlink cleared suppression (was: ${state.pushSuppressedReason})`, {
        level: "info"
      }), state.pushSuppressedReason = null;
      scheduleDebouncedPush(scope);
    };
  fileWatcherInstance = jM.watch(watchDir, {
    persistent: !0,
    ignoreInitial: !0,
    usePolling: USE_POLLING,
    interval: POLLING_INTERVAL_MS,
    ignorePermissionErrors: !0,
    ignored: filePath => {
      let relativePath = $mt.relative(xm(), filePath).replaceAll($mt.sep, "/");
      if (relativePath === "" || relativePath.startsWith("..")) return !1;
      let segments = relativePath.split("/");
      if (CPn(segments[0]) === "team") return segments.at(-1) === ".memory-sync";
      return t_e(relativePath);
    }
  }), fileWatcherInstance.on("add", onAddOrChange), fileWatcherInstance.on("change", onAddOrChange), fileWatcherInstance.on("unlink", onUnlink), fileWatcherInstance.on("error", err => {
    A(`memory-watcher: watcher error: ${Ce(err)}`, {
      level: "warn"
    });
  }), A(`memory-watcher: watching ${watchDir}`, {
    level: "debug"
  }), scheduleResyncTimer();
}
/** Public entry: initialize the watcher, then run the registration finalizer. */
async function startMemoryWatcher(): Promise<void> {
  try {
    await initializeWatcher();
  } finally {
    Znl();
  }
}
/** Resolve enabled scopes, perform initial pull/push, and start the file watcher. */
async function initializeWatcher(): Promise<void> {
  if (!kd()) return;
  let shouldEnableTeam = process.env.CLAUDE_MEMORY_STORES?.trim() ? D6t() : hI() && tSo("team"),
    shouldEnableUser = g3e() && tSo("user");
  if (!shouldEnableTeam && !shouldEnableUser) return;
  Si(async () => stopMemoryWatcher());
  let parsedStores = null,
    storeConfigInvalid = !1;
  if (shouldEnableTeam) try {
    parsedStores = eie();
  } catch (err) {
    A(`memory-watcher: CLAUDE_MEMORY_STORES invalid, disabling team sync: ${Ce(err)}`, {
      level: "error"
    }), W("tengu_team_mem_multistore_config_invalid", {
      error: Ce(err)
    }), xe("team_memory_sync_watcher_start", "config_invalid"), parsedStores = null, storeConfigInvalid = !0;
  }
  let githubRepo = await z1e();
  if (shouldEnableUser && githubRepo) $y.user.syncState = ZTo("user", githubRepo);
  if (parsedStores !== null) {
    let teamStores = parsedStores.filter(s => s.scope === "team"),
      userStores = parsedStores.filter(s => s.scope === "user");
    if (teamStores.length > 0) teamMultiStore = w8n(eEn(teamStores), teamStores.map(s => ({
      mount: s.mount,
      scope: s.scope
    })));
    if (userStores.length > 0) userMultiStore = w8n(eEn(userStores), userStores.map(s => ({
      mount: s.mount,
      scope: s.scope
    }))), $y.user.syncState = null;
    let doInitialPush = async (scope, multiStore) => {
      if (!multiStore) return;
      let state = $y[scope];
      state.pushInProgress = !0;
      let pushPromise = x8n(multiStore, "startup");
      state.currentPushPromise = pushPromise.then(() => {
        return;
      }).catch(() => {
        return;
      });
      try {
        await pushPromise;
      } catch (err) {
        A(`memory-watcher[${scope}]: multi-store initial sync failed: ${Ce(err)}`, {
          level: "warn"
        });
      } finally {
        state.lastSyncCompletedAt = Date.now(), state.pushInProgress = !1, state.currentPushPromise = null, scheduleResyncTimer();
      }
    };
    if (await doInitialPush("team", teamMultiStore), await doInitialPush("user", userMultiStore), teamMultiStore) He("team_memory_sync_watcher_start"), W("tengu_team_mem_sync_started", {
      multistore: !0,
      stores: teamMultiStore.stores.length,
      watcher_started: !0
    });
    if (userMultiStore) He("personal_memory_sync_watcher_start"), W("tengu_personal_mem_sync_started", {
      multistore: !0,
      watcher_started: !0
    });
  }
  if (!githubRepo) {
    if (A("memory-watcher: no github.com remote, skipping sync", {
      level: "debug"
    }), teamMultiStore || userMultiStore) await startFileWatcher(userMultiStore ? xm() : _E());
    return;
  }
  if (shouldEnableTeam && parsedStores === null && !storeConfigInvalid) $y.team.syncState = ZTo("team", githubRepo);
  if ($y.team.syncState) await doInitialPullForScope("team");
  if ($y.user.syncState) await doInitialPullForScope("user");
  if ($y.team.syncState || $y.user.syncState || teamMultiStore || userMultiStore) {
    let hasUserSync = $y.user.syncState || userMultiStore;
    await startFileWatcher(hasUserSync ? xm() : _E());
  }
}
/** Perform the initial pull for `scope`, emitting started/pulled telemetry. */
async function doInitialPullForScope(scope: string): Promise<void> {
  let state = $y[scope];
  if (!state.syncState) return;
  if (state.syncState.pulled) {
    if (A(`memory-watcher[${scope}]: initial pull skipped — basis already established by lazy pull-on-first-push`, {
      level: "debug"
    }), scope === "team") He("team_memory_sync_watcher_start"), W("tengu_team_mem_sync_started", {
      initial_pull_success: !0,
      initial_files_pulled: 0,
      initial_files_reaped: 0,
      watcher_started: !0,
      server_has_content: state.syncState.serverChecksums.size > 0
    });else He("personal_memory_sync_watcher_start");
    return;
  }
  let pullSuccess = !1,
    filesPulled = 0,
    filesReaped = 0,
    serverHasContent = !1;
  try {
    let pullResult = await nSo(state.syncState, {
      skipEtagCache: !0
    });
    if (pullSuccess = pullResult.success, serverHasContent = pullResult.entryCount > 0, pullResult.success && (pullResult.filesWritten > 0 || pullResult.filesReaped > 0)) filesPulled = pullResult.filesWritten, filesReaped = pullResult.filesReaped, A(`memory-watcher[${scope}]: initial pull got ${pullResult.filesWritten} files` + (pullResult.filesReaped > 0 ? `, reaped ${pullResult.filesReaped} tombstoned` : ""), {
      level: "info"
    });
  } catch (err) {
    A(`memory-watcher[${scope}]: initial pull failed: ${Ce(err)}`, {
      level: "warn"
    });
  }
  if (scope === "team") He("team_memory_sync_watcher_start"), W("tengu_team_mem_sync_started", {
    initial_pull_success: pullSuccess,
    initial_files_pulled: filesPulled,
    initial_files_reaped: filesReaped,
    watcher_started: !0,
    server_has_content: serverHasContent
  });else He("personal_memory_sync_watcher_start");
}
/** Notify the watcher that `filePath` was written, scheduling a debounced push. */
async function notifyMemoryWrite(filePath: string): Promise<void> {
  let scope = resolvePathScope(filePath);
  if (scope === null || !isScopeActive(scope)) return;
  scheduleDebouncedPush(scope);
}
/** Tear down all timers/watchers and flush any pending changes before shutdown. */
async function stopMemoryWatcher(): Promise<void> {
  if (resyncTimerHandle) clearTimeout(resyncTimerHandle), resyncTimerHandle = null;
  for (let scope of ["team", "user"]) {
    let state = $y[scope];
    if (state.debounceTimer) clearTimeout(state.debounceTimer), state.debounceTimer = null;
  }
  if (fileWatcherInstance) await fileWatcherInstance.close().catch(() => {}), fileWatcherInstance = null;
  if (await Promise.all(["team", "user"].map(async scope => {
    let state = $y[scope];
    if (state.currentPushPromise) try {
      await state.currentPushPromise;
    } catch {}
  })), resyncTimerHandle) clearTimeout(resyncTimerHandle), resyncTimerHandle = null;
  await Promise.all(["team", "user"].map(async scope => {
    let state = $y[scope];
    if (!state.hasPendingChanges || state.pushSuppressedReason !== null) return;
    if (scope === "user" && !isUserSyncEnabled()) {
      if (state.hasPendingChanges = !1, state.syncState) state.syncState.aborted = !0;
      A("memory-watcher[user]: personal sync disabled — skipping shutdown flush", {
        level: "info"
      });
      return;
    }
    try {
      let multiStore = scope === "team" ? teamMultiStore : scope === "user" ? userMultiStore : null;
      if (multiStore) await Promise.all(multiStore.stores.filter(s => s.suppressedReason === null).map(s => I8n(s)));else if (state.syncState) {
        if (scope === "user") state.syncState.aborted = !1;
        await rSo(state.syncState);
      }
    } catch {}
  }));
}
/** Rebuild the team multi-store set from a new config, flushing/reaping stale store dirs. */
async function rebuildStoreSet(newStoreConfig): Promise<void> {
  if (!watcherStarted) return;
  if (!D6t() || !O6t()) return;
  let state = $y.team;
  if (state.syncState !== null) return;
  let hadInFlight = !1;
  while (state.currentPushPromise) {
    hadInFlight = !0;
    let inFlight = state.currentPushPromise;
    if (await inFlight.catch(() => {}), state.currentPushPromise === inFlight) state.currentPushPromise = null;
  }
  if (state.pushInProgress) return;
  if (state.pushInProgress = !0, state.debounceTimer) clearTimeout(state.debounceTimer), state.debounceTimer = null;
  let oldMultiStore = teamMultiStore,
    hadPendingFlush = state.hasPendingChanges,
    savedSeq = state.changeSeq,
    rebuildPromise = (async () => {
      let failedFlushMounts = new Set((oldMultiStore?.stores ?? []).filter(store => store.suppressedReason !== null || !store.pulled || store.backend.mode === "ro").map(store => store.mountName));
      if (oldMultiStore) await Promise.all(oldMultiStore.stores.filter(store => !failedFlushMounts.has(store.mountName)).map(async store => {
        let flushResult = await I8n(store).catch(() => null);
        if (flushResult === null || !flushResult.success || !store.pulled || flushResult.secretsSkipped > 0 || flushResult.conflicts > 0 || flushResult.diskTrusted === !1) failedFlushMounts.add(store.mountName);
      }));
      let newTeamStores = (newStoreConfig ?? []).filter(store => store.scope !== "user"),
        newMultiStore = newTeamStores.length > 0 ? w8n(eEn(newTeamStores), newTeamStores.map(store => ({
          mount: store.mount,
          scope: store.scope
        }))) : null,
        carriedOverMountDirs = new Set();
      if (newMultiStore && oldMultiStore) {
        let oldStoresByDir = new Map(oldMultiStore.stores.map(store => [store.mountDir, store]));
        newMultiStore.stores = newMultiStore.stores.map(store => {
          let oldStore = oldStoresByDir.get(store.mountDir);
          if (oldStore?.backend.partitionId !== store.backend.partitionId) return store;
          return carriedOverMountDirs.add(store.mountDir), {
            ...store,
            remoteHashes: oldStore.remoteHashes,
            pulled: oldStore.pulled,
            createdAtMs: oldStore.createdAtMs,
            pullWrittenMtimes: oldStore.pullWrittenMtimes,
            suppressedReason: oldStore.suppressedReason,
            invalidatedBasis: oldStore.invalidatedBasis
          };
        });
      }
      if (state.changeSeq !== savedSeq) for (let store of oldMultiStore?.stores ?? []) failedFlushMounts.add(store.mountName);
      if (teamMultiStore = newMultiStore, state.changeSeq === savedSeq) state.hasPendingChanges = !1;
      state.pushSuppressedReason = null, state.lastSyncCompletedAt = null;
      let reapCandidates = (oldMultiStore?.stores ?? []).filter(store => store.scope !== "user" && /^[A-Za-z0-9_-]+$/.test(store.mountName) && !carriedOverMountDirs.has(store.mountDir) && !failedFlushMounts.has(store.mountName)),
        reapableStores = [];
      for (let store of reapCandidates) if ((await Qfe(store.mountDir, "team", store.mountName)) === "ok") reapableStores.push(store);
      if (await Promise.all(reapableStores.map(store => fsMkdir.rm(store.mountDir, {
        recursive: !0,
        force: !0
      }).catch(err => A(`memory-watcher: reap ${store.mountName} failed: ${Ce(err)}`, {
        level: "warn"
      })))), W("tengu_team_mem_store_set_rebuilt", {
        old_stores: oldMultiStore?.stores.length ?? 0,
        new_stores: newMultiStore?.stores.length ?? 0,
        dirs_reaped: reapableStores.length,
        flush_failed_stores: failedFlushMounts.size,
        had_in_flight: hadInFlight,
        had_pending_flush: hadPendingFlush
      }), newMultiStore) {
        try {
          await x8n(newMultiStore, "rebuild");
        } catch (err) {
          A(`memory-watcher: rebuild initial sync failed: ${Ce(err)}`, {
            level: "warn"
          });
        }
        state.lastSyncCompletedAt = Date.now();
      }
    })();
  state.currentPushPromise = rebuildPromise.catch(() => {});
  try {
    await rebuildPromise;
  } finally {
    state.pushInProgress = !1, state.currentPushPromise = null, scheduleResyncTimer();
  }
}
/** Reset all module-level watcher state to a clean (optionally seeded) baseline for tests. */
function _resetWatcherStateForTesting(opts): void {
  if (fileWatcherInstance = null, resyncTimerHandle) clearTimeout(resyncTimerHandle), resyncTimerHandle = null;
  watcherStarted = opts?.skipWatcher ?? !1, teamMultiStore = opts?.multiStoreState ?? null, userMultiStore = opts?.userMultiStoreState ?? null, $y.team = createInitialWatcherState(), $y.team.syncState = opts?.teamSyncState ?? null, $y.team.pushSuppressedReason = opts?.teamPushSuppressedReason ?? null, $y.team.lastSyncCompletedAt = opts?.teamLastSyncCompletedAt ?? null, $y.user = createInitialWatcherState(), $y.user.syncState = opts?.userSyncState ?? null, $y.user.pushSuppressedReason = opts?.userPushSuppressedReason ?? null, $y.user.lastSyncCompletedAt = opts?.userLastSyncCompletedAt ?? null;
}
/** Test hook: start the file watcher on `dir`. */
function _startFileWatcherForTesting(dir: string) {
  return startFileWatcher(dir);
}
/** Test hook: read the last completed sync timestamp for `scope`. */
function _lastSyncCompletedAtForTesting(scope: string) {
  return $y[scope].lastSyncCompletedAt;
}
/** Test hook: read the active resync timer handle. */
function _resyncTimerForTesting() {
  return resyncTimerHandle;
}
/** Test hook: read the current team multi-store state. */
function _multiStoreStateForTesting() {
  return teamMultiStore;
}
/** Test hook: arm the resync timer. */
function _armResyncTimerForTesting() {
  scheduleResyncTimer();
}
var fsMkdir,
  $mt,
  DEBOUNCE_DELAY_MS = 2000,
  USE_POLLING,
  POLLING_INTERVAL_MS = 2000,
  fileWatcherInstance = null,
  watcherStarted = !1,
  resyncTimerHandle = null,
  MIN_RESYNC_DELAY_MS = 1000,
  $y,
  teamMultiStore = null,
  userMultiStore = null,
  UNLINK_RECOVERABLE_REASONS_BY_SCOPE;
var N8n = b(() => {
  oie();
  Jm();
  JFt();
  cO();
  ud();
  tr();
  qe();
  Ct();
  ia();
  mn();
  kt();
  tEn();
  ket();
  jTo();
  mrl();
  Orl();
  fsMkdir = require("fs/promises"), $mt = require("path"), USE_POLLING = typeof Bun < "u";
  $y = {
    team: createInitialWatcherState(),
    user: createInitialWatcherState()
  }, UNLINK_RECOVERABLE_REASONS_BY_SCOPE = {
    team: new Set(["team_memory_too_many_entries", "http_413"]),
    user: new Set()
  };
});
export {M8n,createInitialWatcherState as D8n,isUnlinkRecoverable as Frl,isPermanentFailure,resolvePathScope as iSo,suppressPushForScope as Lrl,performPush as Url,scheduleDebouncedPush as P8n,isUserSyncEnabled as cSo,isScopeEnabled as $rl,onDebounceExpired as e8p,maybeResyncStaleStores,scheduleResyncTimer as qmt,isScopeActive as aSo,startFileWatcher as lSo,startMemoryWatcher,initializeWatcher as n8p,doInitialPullForScope as Mrl,notifyMemoryWrite,stopMemoryWatcher,rebuildStoreSet,_resetWatcherStateForTesting,_startFileWatcherForTesting,_lastSyncCompletedAtForTesting,_resyncTimerForTesting,_multiStoreStateForTesting,_armResyncTimerForTesting,fsMkdir as O8n,$mt,DEBOUNCE_DELAY_MS as J5p,USE_POLLING as X5p,POLLING_INTERVAL_MS as Q5p,fileWatcherInstance as nTe,watcherStarted as Umt,resyncTimerHandle as i9,MIN_RESYNC_DELAY_MS as Z5p,$y,teamMultiStore as a9,userMultiStore as r6,UNLINK_RECOVERABLE_REASONS_BY_SCOPE,N8n};
