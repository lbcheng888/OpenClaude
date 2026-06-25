// @ts-nocheck
import {recordFileHistorySnapshot as cUt,_a as za} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Ie,vn as wn} from "./0621_length.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {pl as Dl,Wu as Sd} from "../../vendor/m438.ts";
import {getIsNonInteractiveSession as kr,getSessionId as kt,getOriginalCwd as gr,lt as ct} from "./0132_sent.ts";
import {lc as Sc,mg as jg} from "../../vendor/m2209.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {In as Dn,cn as ln,Jo as ls,Ct as St} from "../../vendor/m197.ts";
import {Gu as pd,Xl as mc} from "../config/0651_maxBytes.ts";
import {Wke as FRe} from "../../vendor/m2770.ts";
import {or as sr,dn as an} from "../config/0137_namespace.ts";
import {Xke as KRe,s9e as H2e} from "../telemetry/2792_eventName.ts";
import {b} from "../../runtime.ts";
import {J$e as b2e} from "../../vendor/m2773.ts";
import {Ir as Or} from "../../vendor/m584.ts";
// @ts-nocheck
function reduceFileHistoryAction(state, action) {
  switch (action.kind) {
    case "track":
      try {
        let latestSnapshot = state.snapshots.at(-1);
        if (!latestSnapshot) return state;
        let nextTrackSequence = (state.trackSequence ?? 0) + 1;
        if (latestSnapshot.trackedFileBackups[action.trackingPath]) return {
          ...state,
          trackSequence: nextTrackSequence
        };
        let updatedTrackedFiles = state.trackedFiles.has(action.trackingPath) ? state.trackedFiles : new Set(state.trackedFiles).add(action.trackingPath),
          updatedSnapshot = {
            ...latestSnapshot,
            trackedFileBackups: {
              ...latestSnapshot.trackedFileBackups,
              [action.trackingPath]: action.backup
            }
          },
          nextState = {
            ...state,
            snapshots: (() => {
              let arr = state.snapshots.slice();
              return arr[arr.length - 1] = updatedSnapshot, arr;
            })(),
            trackedFiles: updatedTrackedFiles,
            trackSequence: nextTrackSequence
          };
        return debugPrintState(nextState), cUt(action.messageId, updatedSnapshot, true).catch(err => {
          Ie(Error(`FileHistory: Failed to record snapshot: ${err}`));
        }), j("tengu_file_history_track_edit_success", {
          isNewFile: action.isAddingFile,
          version: action.backup.version
        }), v(`FileHistory: Tracked file modification for ${action.filePath}`), nextState;
      } catch (err) {
        return Ie(err), j("tengu_file_history_track_edit_failed", {}), state;
      }
    case "snapshot":
      try {
        let mergedBackups = {
            ...action.trackedFileBackups
          },
          prevSnapshot = state.snapshots.at(-1);
        if (prevSnapshot) for (let trackedPath of state.trackedFiles) {
          if (trackedPath in mergedBackups) continue;
          let existingBackup = prevSnapshot.trackedFileBackups[trackedPath];
          if (existingBackup) mergedBackups[trackedPath] = existingBackup;
        }
        let snapshotTime = new Date(),
          newSnapshotEntry = {
            messageId: action.messageId,
            trackedFileBackups: mergedBackups,
            timestamp: snapshotTime
          },
          allSnapshots = [...state.snapshots, newSnapshotEntry],
          nextState = {
            ...state,
            snapshots: allSnapshots.length > MAX_SNAPSHOT_COUNT ? allSnapshots.slice(-MAX_SNAPSHOT_COUNT) : allSnapshots,
            snapshotSequence: (state.snapshotSequence ?? 0) + 1
          };
        return debugPrintState(nextState), syncFileHistoryToDisk(state, nextState).catch(Ie), cUt(action.messageId, newSnapshotEntry, false).catch(err => {
          Ie(Error(`FileHistory: Failed to record snapshot: ${err}`));
        }), v(`FileHistory: Added snapshot for ${action.messageId}, tracking ${state.trackedFiles.size} files`), j("tengu_file_history_snapshot_success", {
          trackedFilesCount: state.trackedFiles.size,
          snapshotCount: nextState.snapshots.length
        }), nextState;
      } catch (err) {
        return Ie(err), j("tengu_file_history_snapshot_failed", {}), state;
      }
    case "touch":
      return {
        ...state,
        trackSequence: (state.trackSequence ?? 0) + 1
      };
  }
}
function isFileCheckpointingEnabled() {
  if (Dl()) return false;
  if (kr()) return isFileCheckpointingEnabledForSdk();
  return Sc("fileCheckpointingEnabled", true).value && !Ge.CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING;
}
function isFileCheckpointingEnabledForSdk() {
  return rt(process.env.CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING) && !Ge.CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING;
}
async function trackFileEdit(getState, dispatch, filePath, messageId) {
  if (!isFileCheckpointingEnabled()) return;
  let trackingPath = normalizeToRelativePath(filePath),
    currentState = getState();
  if (!currentState) return;
  let latestSnapshot = currentState.snapshots.at(-1);
  if (!latestSnapshot) {
    v("FileHistory: Missing most recent snapshot", {
      level: "error"
    }), j("tengu_file_history_track_edit_failed", {});
    return;
  }
  if (latestSnapshot.trackedFileBackups[trackingPath]) {
    dispatch({
      kind: "touch"
    });
    return;
  }
  let backupEntry;
  try {
    backupEntry = await createBackupFile(filePath, 1);
  } catch (err) {
    v(`FileHistory: failed to back up ${filePath}: ${err instanceof Error ? err.message : String(err)}`, {
      level: "error"
    }), j("tengu_file_history_track_edit_failed", {});
    return;
  }
  let isNewFile = backupEntry.backupFileName === null;
  dispatch({
    kind: "track",
    trackingPath: trackingPath,
    filePath: filePath,
    backup: backupEntry,
    messageId: messageId,
    isAddingFile: isNewFile
  });
}
async function makeSnapshotForMessage(getState, dispatch, messageId) {
  if (!isFileCheckpointingEnabled()) return;
  let currentState = getState();
  if (!currentState) return;
  let newBackups = {},
    latestSnapshot = currentState.snapshots.at(-1);
  if (latestSnapshot) v(`FileHistory: Making snapshot for message ${messageId}`), await Promise.all(Array.from(currentState.trackedFiles, async trackedPath => {
    try {
      let absolutePath = resolveToAbsolutePath(trackedPath),
        prevBackup = latestSnapshot.trackedFileBackups[trackedPath],
        nextVersion = prevBackup ? prevBackup.version + 1 : 1,
        fileStat;
      try {
        fileStat = await fsPromises.stat(absolutePath);
      } catch (err) {
        if (!Dn(err)) throw err;
      }
      if (!fileStat) {
        newBackups[trackedPath] = {
          backupFileName: null,
          version: nextVersion,
          backupTime: new Date()
        }, j("tengu_file_history_backup_deleted_file", {
          version: nextVersion
        }), v(`FileHistory: Missing tracked file: ${trackedPath}`);
        return;
      }
      if (prevBackup && prevBackup.backupFileName !== null && !(await hasFileChangedSinceBackup(absolutePath, prevBackup.backupFileName, fileStat))) {
        newBackups[trackedPath] = prevBackup;
        return;
      }
      newBackups[trackedPath] = await createBackupFile(absolutePath, nextVersion);
    } catch (err) {
      v(`FileHistory: Failed to back up ${trackedPath}: ${err}`, {
        level: "error"
      }), j("tengu_file_history_backup_file_failed", {});
    }
  }));
  dispatch({
    kind: "snapshot",
    messageId: messageId,
    trackedFileBackups: newBackups
  });
}
async function rewindToSnapshot(getState, messageId) {
  if (!isFileCheckpointingEnabled()) return;
  let currentState = getState();
  if (!currentState) return;
  let targetSnapshot = currentState.snapshots.findLast(snap => snap.messageId === messageId);
  if (!targetSnapshot) throw Ie(Error(`FileHistory: Snapshot for ${messageId} not found`)), j("tengu_file_history_rewind_failed", {
    trackedFilesCount: currentState.trackedFiles.size,
    snapshotFound: false
  }), Error("The selected snapshot was not found");
  try {
    v(`FileHistory: [Rewind] Rewinding to snapshot for ${messageId}`);
    let changedFiles = await applySnapshotToFilesystem(currentState, targetSnapshot);
    v(`FileHistory: [Rewind] Finished rewinding to ${messageId}`), j("tengu_file_history_rewind_success", {
      trackedFilesCount: currentState.trackedFiles.size,
      filesChangedCount: changedFiles.length
    });
  } catch (err) {
    throw Ie(err), j("tengu_file_history_rewind_failed", {
      trackedFilesCount: currentState.trackedFiles.size,
      snapshotFound: true
    }), err;
  }
}
function hasSnapshotForMessage(state, messageId) {
  if (!isFileCheckpointingEnabled()) return false;
  return state.snapshots.some(snap => snap.messageId === messageId);
}
async function computeRewindDiffStats(state, messageId) {
  if (!isFileCheckpointingEnabled()) return;
  let targetSnapshot = state.snapshots.findLast(snap => snap.messageId === messageId);
  if (!targetSnapshot) return;
  let diffResults = await Promise.all(Array.from(state.trackedFiles, async trackedPath => {
      try {
        let absolutePath = resolveToAbsolutePath(trackedPath),
          backupEntry = targetSnapshot.trackedFileBackups[trackedPath],
          backupFileName = backupEntry ? backupEntry.backupFileName : findEarliestBackupFileName(trackedPath, state);
        if (backupFileName === undefined) return v("FileHistory: Error finding the backup file to apply", {
          level: "error"
        }), j("tengu_file_history_rewind_restore_file_failed", {
          dryRun: true
        }), null;
        let diffStats = await computeFileDiffStats(absolutePath, backupFileName === null ? undefined : backupFileName);
        if (diffStats?.insertions || diffStats?.deletions) return {
          filePath: absolutePath,
          stats: diffStats
        };
        if (backupFileName === null && (await pd(absolutePath))) return {
          filePath: absolutePath,
          stats: diffStats
        };
        return null;
      } catch (err) {
        return Ie(err), j("tengu_file_history_rewind_restore_file_failed", {
          dryRun: true
        }), null;
      }
    })),
    changedFiles = [],
    totalInsertions = 0,
    totalDeletions = 0;
  for (let result of diffResults) {
    if (!result) continue;
    changedFiles.push(result.filePath), totalInsertions += result.stats?.insertions || 0, totalDeletions += result.stats?.deletions || 0;
  }
  return {
    filesChanged: changedFiles,
    insertions: totalInsertions,
    deletions: totalDeletions
  };
}
async function applySnapshotToFilesystem(state, targetSnapshot) {
  let restoredPaths = [];
  for (let trackedPath of state.trackedFiles) try {
    let absolutePath = resolveToAbsolutePath(trackedPath),
      backupEntry = targetSnapshot.trackedFileBackups[trackedPath],
      backupFileName = backupEntry ? backupEntry.backupFileName : findEarliestBackupFileName(trackedPath, state);
    if (backupFileName === undefined) {
      v("FileHistory: Error finding the backup file to apply", {
        level: "error"
      }), j("tengu_file_history_rewind_restore_file_failed", {
        dryRun: false
      });
      continue;
    }
    if (backupFileName === null) {
      try {
        await fsPromises.unlink(absolutePath), v(`FileHistory: [Rewind] Deleted ${absolutePath}`), restoredPaths.push(absolutePath);
      } catch (err) {
        if (!Dn(err)) throw err;
      }
      continue;
    }
    if (await hasFileChangedSinceBackup(absolutePath, backupFileName)) await copyBackupToTarget(absolutePath, backupFileName), v(`FileHistory: [Rewind] Restored ${absolutePath} from ${backupFileName}`), restoredPaths.push(absolutePath);
  } catch (err) {
    v(`FileHistory: [Rewind] Failed to restore ${trackedPath}: ${err instanceof Error ? err.message : String(err)}`, {
      level: "error"
    }), j("tengu_file_history_rewind_restore_file_failed", {
      dryRun: false
    });
  }
  return restoredPaths;
}
async function hasFileChangedSinceBackup(targetPath, backupFileName, targetStat) {
  let resolvedBackupPath = resolveBackupFilePath(backupFileName),
    currentStat = targetStat ?? null;
  if (!currentStat) try {
    currentStat = await fsPromises.stat(targetPath);
  } catch (err) {
    if (!Dn(err)) return true;
  }
  let backupStat = null;
  try {
    backupStat = await fsPromises.stat(resolvedBackupPath);
  } catch (err) {
    if (!Dn(err)) return true;
  }
  return compareFileStats(currentStat, backupStat, async () => {
    try {
      let [targetContent, backupContent] = await Promise.all([fsPromises.readFile(targetPath, "utf-8"), fsPromises.readFile(resolvedBackupPath, "utf-8")]);
      return targetContent !== backupContent;
    } catch {
      return true;
    }
  });
}
function compareFileStats(currentStat, backupStat, readAndCompare) {
  if (currentStat === null !== (backupStat === null)) return true;
  if (currentStat === null || backupStat === null) return false;
  if (currentStat.mode !== backupStat.mode || currentStat.size !== backupStat.size) return true;
  if (currentStat.mtimeMs < backupStat.mtimeMs) return false;
  return readAndCompare();
}
async function computeFileDiffStats(targetPath, backupFileName) {
  let changedFiles = [],
    insertions = 0,
    deletions = 0;
  try {
    let resolvedBackupPath = backupFileName ? resolveBackupFilePath(backupFileName) : undefined,
      [targetContent, backupContent] = await Promise.all([readFileOrNull(targetPath), resolvedBackupPath ? readFileOrNull(resolvedBackupPath) : null]);
    if (targetContent === null && backupContent === null) return {
      filesChanged: changedFiles,
      insertions: insertions,
      deletions: deletions
    };
    changedFiles.push(targetPath), FRe(targetContent ?? "", backupContent ?? "").forEach(c => {
      if (c.added) insertions += c.count || 0;
      if (c.removed) deletions += c.count || 0;
    });
  } catch (err) {
    Ie(Error(`FileHistory: Error generating diffStats: ${err}`));
  }
  return {
    filesChanged: changedFiles,
    insertions: insertions,
    deletions: deletions
  };
}
function buildBackupFileName(content, version) {
  return `${cryptoModule.createHash("sha256").update(content).digest("hex").slice(0, 16)}@v${version}`;
}
function resolveBackupFilePath(backupFileName, sessionIdOverride) {
  let backupBaseDir = sr();
  return pathModule.join(backupBaseDir, "file-history", sessionIdOverride || kt(), backupFileName);
}
async function createBackupFile(filePath, version) {
  if (filePath === null) return {
    backupFileName: null,
    version: version,
    backupTime: new Date()
  };
  let backupFileName = buildBackupFileName(filePath, version),
    backupPath = resolveBackupFilePath(backupFileName),
    fileStat;
  try {
    fileStat = await fsPromises.stat(filePath);
  } catch (err) {
    if (Dn(err)) return {
      backupFileName: null,
      version: version,
      backupTime: new Date()
    };
    throw err;
  }
  try {
    await fsPromises.copyFile(filePath, backupPath);
  } catch (err) {
    if (!Dn(err)) throw err;
    await fsPromises.mkdir(pathModule.dirname(backupPath), {
      recursive: true
    }), await fsPromises.copyFile(filePath, backupPath);
  }
  return await fsPromises.chmod(backupPath, fileStat.mode), j("tengu_file_history_backup_file_created", {
    version: version,
    fileSize: fileStat.size
  }), {
    backupFileName: backupFileName,
    version: version,
    backupTime: new Date()
  };
}
async function copyBackupToTarget(targetPath, backupFileName) {
  let backupPath = resolveBackupFilePath(backupFileName),
    backupStat;
  try {
    backupStat = await fsPromises.stat(backupPath);
  } catch (err) {
    if (Dn(err)) {
      j("tengu_file_history_rewind_restore_file_failed", {}), v(`FileHistory: [Rewind] Backup file not found: ${backupPath}`, {
        level: "error"
      });
      return;
    }
    throw err;
  }
  try {
    await fsPromises.copyFile(backupPath, targetPath);
  } catch (err) {
    if (!Dn(err)) throw err;
    await fsPromises.mkdir(pathModule.dirname(targetPath), {
      recursive: true
    }), await fsPromises.copyFile(backupPath, targetPath);
  }
  await fsPromises.chmod(targetPath, backupStat.mode);
}
function findEarliestBackupFileName(trackedPath, state) {
  for (let snap of state.snapshots) {
    let backupEntry = snap.trackedFileBackups[trackedPath];
    if (backupEntry !== undefined && backupEntry.version === 1) return backupEntry.backupFileName;
  }
  return;
}
function normalizeToRelativePath(filePath) {
  if (!pathModule.isAbsolute(filePath)) return filePath;
  let cwd = gr();
  if (filePath.startsWith(cwd)) return pathModule.relative(cwd, filePath);
  return filePath;
}
function resolveToAbsolutePath(trackedPath) {
  if (pathModule.isAbsolute(trackedPath)) return trackedPath;
  return pathModule.join(gr(), trackedPath);
}
function initFileHistoryFromLegacy(legacySnapshots, dispatch) {
  if (!isFileCheckpointingEnabled()) return;
  let normalizedSnapshots = [],
    allTrackedFiles = new Set();
  for (let snap of legacySnapshots) {
    let normalizedBackups = {};
    for (let [filePath, backup] of Object.entries(snap.trackedFileBackups)) {
      let normalizedPath = normalizeToRelativePath(filePath);
      allTrackedFiles.add(normalizedPath), normalizedBackups[normalizedPath] = backup;
    }
    normalizedSnapshots.push({
      ...snap,
      trackedFileBackups: normalizedBackups
    });
  }
  dispatch({
    snapshots: normalizedSnapshots,
    trackedFiles: allTrackedFiles,
    snapshotSequence: normalizedSnapshots.length
  });
}
async function copyBackupsOnSessionRestore(sessionState, newSessionId) {
  if (!isFileCheckpointingEnabled()) return;
  let legacySnapshots = sessionState.fileHistorySnapshots;
  if (!legacySnapshots || sessionState.messages.length === 0) return;
  let oldSessionId = sessionState.messages.at(-1)?.sessionId;
  if (!oldSessionId) {
    Ie(Error("FileHistory: Failed to copy backups on restore (no previous session id)"));
    return;
  }
  let currentSessionId = newSessionId ?? kt();
  if (oldSessionId === currentSessionId) {
    v(`FileHistory: No need to copy file history for resuming with same session id: ${currentSessionId}`);
    return;
  }
  try {
    let newSessionDir = pathModule.join(sr(), "file-history", currentSessionId);
    await fsPromises.mkdir(newSessionDir, {
      recursive: true
    });
    let failedSnapshotCount = 0;
    if (await Promise.allSettled(legacySnapshots.map(async snap => {
      let backupEntries = Object.values(snap.trackedFileBackups).filter(entry => entry.backupFileName !== null);
      if (!(await Promise.allSettled(backupEntries.map(async ({
        backupFileName: backupName
      }) => {
        let oldPath = resolveBackupFilePath(backupName, oldSessionId),
          newPath = pathModule.join(newSessionDir, backupName);
        try {
          await fsPromises.link(oldPath, newPath);
        } catch (err) {
          let errCode = ln(err);
          if (errCode === "EEXIST") return;
          if (errCode === "ENOENT") throw v(`FileHistory: Failed to copy backup ${backupName} on restore (backup file does not exist in ${oldSessionId})`, {
            level: "error"
          }), err;
          v(`FileHistory: hard link failed (${errCode}), falling back to copy: ${oldPath} -> ${newPath}`, {
            level: "error"
          });
          try {
            await fsPromises.copyFile(oldPath, newPath);
          } catch (copyErr) {
            if (ls(copyErr)) throw v(`FileHistory: copy fallback failed for ${oldPath}: ${copyErr}`), copyErr;
            throw Ie(Error("FileHistory: Error copying over backup from previous session")), copyErr;
          }
        }
        v(`FileHistory: Copied backup ${backupName} from session ${oldSessionId} to ${currentSessionId}`);
      }))).some(result => result.status === "rejected")) cUt(snap.messageId, snap, false).catch(_err => {
        Ie(Error("FileHistory: Failed to record copy backup snapshot"));
      });else failedSnapshotCount++;
    })), failedSnapshotCount > 0) j("tengu_file_history_resume_copy_failed", {
      numSnapshots: legacySnapshots.length,
      failedSnapshots: failedSnapshotCount
    });
  } catch (err) {
    if (ls(err)) {
      v(`FileHistory: backup-dir mkdir failed for session ${currentSessionId}: ${err}`);
      return;
    }
    Ie(err);
  }
}
async function syncFileHistoryToDisk(prevState, nextState) {
  let prevSnapshot = prevState.snapshots.at(-1),
    nextSnapshot = nextState.snapshots.at(-1);
  if (!nextSnapshot) return;
  for (let trackedPath of nextState.trackedFiles) {
    let absolutePath = resolveToAbsolutePath(trackedPath),
      prevBackup = prevSnapshot?.trackedFileBackups[trackedPath],
      nextBackup = nextSnapshot.trackedFileBackups[trackedPath];
    if (prevBackup?.backupFileName === nextBackup?.backupFileName && prevBackup?.version === nextBackup?.version) continue;
    let prevContent = null;
    if (prevBackup?.backupFileName) {
      let prevBackupPath = resolveBackupFilePath(prevBackup.backupFileName);
      prevContent = await readFileOrNull(prevBackupPath);
    }
    let nextContent = null;
    if (nextBackup?.backupFileName) {
      let nextBackupPath = resolveBackupFilePath(nextBackup.backupFileName);
      nextContent = await readFileOrNull(nextBackupPath);
    }
    if (prevContent !== nextContent) KRe(absolutePath, prevContent, nextContent);
  }
}
async function readFileOrNull(filePath) {
  try {
    return await fsPromises.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}
function debugPrintState(state) {
  if (isDebugStateEnabled) console.error(utilModule.inspect(state, false, 5));
}
var cryptoModule,
  fsPromises,
  pathModule,
  utilModule,
  MAX_SNAPSHOT_COUNT = 100,
  isDebugStateEnabled = false;
var s6 = b(() => {
  b2e();
  ct();
  Sd();
  Ct();
  H2e();
  je();
  Or();
  an();
  St();
  mc();
  wn();
  za();
  jg();
  cryptoModule = require("crypto"), fsPromises = require("fs/promises"), pathModule = require("path"), utilModule = require("util");
});
export {reduceFileHistoryAction as kqe,isFileCheckpointingEnabled as TT,isFileCheckpointingEnabledForSdk as wvp,trackFileEdit as I0e,makeSnapshotForMessage as nut,rewindToSnapshot as V2n,hasSnapshotForMessage as K2n,computeRewindDiffStats as s9t,applySnapshotToFilesystem as kvp,hasFileChangedSinceBackup as $Na,compareFileStats as Hvp,computeFileDiffStats as Ivp,buildBackupFileName as xvp,resolveBackupFilePath as wqe,createBackupFile as qNa,copyBackupToTarget as Dvp,findEarliestBackupFileName as WNa,normalizeToRelativePath as GNa,resolveToAbsolutePath as z2n,initFileHistoryFromLegacy as j2n,copyBackupsOnSessionRestore as Y2n,syncFileHistoryToDisk as Pvp,readFileOrNull as G2n,debugPrintState as FNa,cryptoModule as BNa,fsPromises as LE,pathModule as iG,utilModule as UNa,MAX_SNAPSHOT_COUNT as NNa,isDebugStateEnabled as Ovp,s6 as Pq};
