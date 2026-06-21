// @ts-nocheck
import {dE as ih,byn as HG_,Bw as CJ,MFe as O2H,GO as Sy} from "../telemetry/2241_GO.ts";
import {gf as Jz,tA as xz} from "./2201_tA.ts";
import {jhe as ZKH,OIn as TV_,y1t as zV_} from "../telemetry/3249_y1t.ts";
import {dn as Z6,Se as ZH,bt as R_} from "../../vendor/m195.ts";
import {logForDebugging as y,qe as UH} from "./0234_setHasFormattedOutput.ts";
import {SGe as qA_,tv as xX} from "../../vendor/m232.ts";
import {Oe as bH,Ie as EH,isTmuxControlMode as B_,ln as f6} from "../telemetry/0594_feature_name.ts";
import {g$ as sI,nie as v9H,DFe as mSH,$fe as HzH,xBr as DE8} from "../../vendor/m2235.ts";
import {je as dH} from "../../vendor/m577.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {$Ja as LiK,qJa as hiK} from "../../vendor/m4351.ts";
import {PFe as pSH,_yn as fA6} from "../../vendor/m2236.ts";
import {Wn as s6} from "../api/0459_getOauthConfig.ts";
import {logEvent as c,Ct as v_} from "../../vendor/m131.ts";
import {fromEnum as QH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
import {Lr as l8} from "../../vendor/m578.ts";
// @ts-nocheck
function $vO(content) {
  return kiK.createHash("sha256").update(content, "utf8").digest("hex");
}
function TTq(backends, mounts) {
  if (backends.length !== mounts.length) throw Error("createMultiStoreState: length mismatch");
  let teamMemPath = ih(),
    userMemPath = Jz();
  return {
    stores: backends.map((backend, idx) => {
      let mountSpec = mounts[idx],
        mountConfig = typeof mountSpec === "string" ? {
          mount: mountSpec,
          scope: "team"
        } : mountSpec,
        isUserScope = mountConfig.scope === "user";
      return {
        backend: backend,
        mountName: mountConfig.mount,
        scope: mountConfig.scope,
        mountDir: isUserScope ? userMemPath : (wU.join(teamMemPath, mountConfig.mount) + wU.sep).normalize("NFC"),
        excludeKey: isUserScope ? ZKH : null,
        remoteHashes: new Map(),
        createdAtMs: Date.now(),
        pullWrittenMtimes: new Map(),
        pulled: false,
        suppressedReason: null
      };
    }),
    inFlight: null
  };
}
function zTq(filename) {
  if (filename.startsWith(".")) return false;
  return YvO.some(ext => filename.endsWith(ext));
}
function NiK(filePath) {
  let slashIdx = filePath.lastIndexOf("/");
  return slashIdx === -1 ? filePath : filePath.slice(slashIdx + 1);
}
async function ViK(dirPath, excludeKey) {
  let entries = new Map(),
    diskPaths = new Set(),
    skippedSecretPaths = [],
    diskTrusted = true;
  async function recurse(currentDir) {
    let dirEntries;
    try {
      dirEntries = await Ju.readdir(currentDir, {
        withFileTypes: true
      });
    } catch (err) {
      let code = Z6(err);
      if (code === "ENOENT") return;
      if (code === "EACCES" || code === "EPERM") {
        diskTrusted = false;
        return;
      }
      throw err;
    }
    await Promise.all(dirEntries.map(async entry => {
      let fullPath = wU.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (excludeKey) {
          let relPath = wU.relative(dirPath, fullPath).split(wU.sep).join("/");
          if (excludeKey(relPath)) return;
        }
        await recurse(fullPath);
        return;
      }
      if (!entry.isFile() || !zTq(entry.name)) return;
      let virtualPath = "/" + wU.relative(dirPath, fullPath).split(wU.sep).join("/");
      diskPaths.add(virtualPath);
      try {
        let stat = await Ju.stat(fullPath);
        if (stat.size > MAX_FILE_SIZE_BYTES) {
          y(`multi-store-sync: skipping oversized ${virtualPath} (${stat.size}B)`, {
            level: "info"
          });
          return;
        }
        let content = await Ju.readFile(fullPath, "utf8");
        if (qA_(content).length > 0) {
          skippedSecretPaths.push(virtualPath), y(`multi-store-sync: skipping ${virtualPath} (secret detected)`, {
            level: "warn"
          });
          return;
        }
        entries.set(virtualPath, {
          content: content,
          sha256: $vO(content)
        });
      } catch (err) {
        let code = Z6(err);
        if (code === "ENOENT") return;
        if (code === "EACCES" || code === "EPERM") {
          diskTrusted = false;
          return;
        }
        throw err;
      }
    }));
  }
  return await recurse(dirPath), {
    entries: entries,
    diskPaths: diskPaths,
    diskTrusted: diskTrusted,
    skippedSecretPaths: skippedSecretPaths
  };
}
async function rm6(store, relativePath) {
  let cleanPath = relativePath.replace(/^\/+/, ""),
    resolvedKey = store.scope === "user" ? await TV_(cleanPath) : await HG_(wU.join(store.mountName, cleanPath).split(wU.sep).join("/"));
  if (!resolvedKey.normalize("NFC").startsWith(store.mountDir)) throw new CJ(`path escapes mount ${store.mountName}: ${relativePath}`);
  return resolvedKey;
}
async function viK(store, relativePath, content) {
  let diskPath = await rm6(store, relativePath);
  await Ju.mkdir(wU.dirname(diskPath), {
    recursive: true
  }), await Ju.writeFile(diskPath, content, "utf8");
}
async function EiK(store, relativePath) {
  if (store.pulled) return false;
  try {
    let diskPath = await rm6(store, relativePath),
      stat = await Ju.stat(diskPath),
      lastWrittenMtime = store.pullWrittenMtimes.get(relativePath);
    if (lastWrittenMtime !== undefined) return stat.mtimeMs > lastWrittenMtime;
    return stat.mtimeMs >= store.createdAtMs - 1000;
  } catch {
    return false;
  }
}
async function SiK(store, relativePath) {
  if (store.pulled) return;
  try {
    let diskPath = await rm6(store, relativePath),
      stat = await Ju.stat(diskPath);
    store.pullWrittenMtimes.set(relativePath, stat.mtimeMs);
  } catch {}
}
async function CiK(store, relativePath) {
  try {
    let diskPath = await rm6(store, relativePath);
    await Ju.unlink(diskPath);
  } catch (err) {
    if (err instanceof CJ) {
      y(`multi-store-sync[${store.mountName}]: refusing to delete escaping path ${relativePath}`, {
        level: "warn"
      });
      return;
    }
    if (Z6(err) === "ENOENT") return;
    throw err;
  }
}
async function OTq(items, maxConcurrency, handler) {
  let index = 0,
    workers = Array.from({
      length: Math.min(maxConcurrency, items.length)
    }, async () => {
      while (index < items.length) {
        let currentIdx = index++;
        await handler(items[currentIdx]);
      }
    });
  await Promise.all(workers);
}
async function wvO(store) {
  if (await biK(store)) return {
    success: false,
    entriesListed: 0,
    filesWritten: 0,
    filesDeleted: 0,
    error: "mount dir canonicity check failed (fail closed)"
  };
  let bulkResult = await AvO(store);
  if (bulkResult !== "not-attempted" && bulkResult !== "fell-back") return bulkResult;
  let usedFallback = bulkResult === "fell-back",
    remoteEntries;
  try {
    remoteEntries = await store.backend.list();
  } catch (err) {
    if (usedFallback) bH("team_memory_multistore_bulk_inflate", "fallback_failed");
    return {
      success: false,
      entriesListed: 0,
      filesWritten: 0,
      filesDeleted: 0,
      permanent: err instanceof sI ? err.reason : undefined,
      error: ZH(err)
    };
  }
  remoteEntries = remoteEntries.filter(e => zTq(NiK(e.path)) && !(store.excludeKey && store.excludeKey(e.path.replace(/^\/+/, ""))));
  let remoteMap = new Map();
  for (let entry of remoteEntries) remoteMap.set(entry.path, {
    id: entry.id,
    sha256: entry.sha256
  });
  let diskSnapshot = await ViK(store.mountDir, store.excludeKey),
    toFetch = remoteEntries.filter(e => diskSnapshot.entries.get(e.path)?.sha256 !== e.sha256 && store.remoteHashes.get(e.path)?.sha256 !== e.sha256),
    toDelete = diskSnapshot.diskTrusted ? [...diskSnapshot.diskPaths].filter(p => !remoteMap.has(p) && store.remoteHashes.has(p)) : [],
    filesWritten = 0,
    filesDeleted = 0,
    concurrentPreserved = 0,
    lastError,
    lastPermanentError;
  await OTq(toFetch, SYNC_MAX_CONCURRENT, async entry => {
    try {
      let content = await store.backend.read(entry.id);
      if (await EiK(store, entry.path)) {
        concurrentPreserved++;
        return;
      }
      await viK(store, entry.path, content.content), await SiK(store, entry.path), filesWritten++;
    } catch (err) {
      if (err instanceof v9H) {
        remoteMap.delete(entry.path);
        return;
      }
      if (err instanceof CJ) {
        y(`multi-store-sync[${store.mountName}]: refusing to write escaping path ${entry.path}`, {
          level: "warn"
        }), remoteMap.delete(entry.path);
        return;
      }
      if (err instanceof sI) lastPermanentError ??= err.reason;
      lastError ??= ZH(err);
    }
  });
  for (let deletePath of toDelete) try {
    await CiK(store, deletePath), filesDeleted++;
  } catch (err) {
    lastError ??= ZH(err);
  }
  if (lastError) {
    if (usedFallback) bH("team_memory_multistore_bulk_inflate", "fallback_failed");
    return {
      success: false,
      entriesListed: remoteEntries.length,
      filesWritten: filesWritten,
      filesDeleted: filesDeleted,
      permanent: lastPermanentError,
      error: lastError
    };
  }
  if (store.remoteHashes = remoteMap, store.pulled = true, store.pullWrittenMtimes.clear(), concurrentPreserved > 0) EH("team_memory_multistore_concurrent_write_preserved"), y(`multi-store-sync[${store.mountName}]: preserved ${concurrentPreserved} concurrent local write(s) during first pull`, {
    level: "info"
  });
  return {
    success: true,
    entriesListed: remoteEntries.length,
    filesWritten: filesWritten,
    filesDeleted: filesDeleted,
    filesSkippedConcurrent: concurrentPreserved
  };
}
async function AvO(store) {
  if (store.pulled || store.remoteHashes.size > 0) return "not-attempted";
  let backend = store.backend;
  if (!backend.exportAll) return "not-attempted";
  if (dH.CLAUDE_CODE_DISABLE_MEMORY_BULK_INFLATE) return "not-attempted";
  if (!j_("tengu_memory_bulk_inflate", true)) return "not-attempted";
  let logPrefix = `multi-store-sync[${store.mountName}]`,
    exportedData;
  try {
    exportedData = await backend.exportAll();
  } catch (err) {
    let errType = err instanceof v9H ? "not_found" : "http_error";
    return B_("team_memory_multistore_bulk_inflate", errType), y(`${logPrefix}: bulk inflate unavailable (${ZH(err)}) \u2014 using per-file pull`, {
      level: "debug"
    }), "fell-back";
  }
  let writtenEntries = new Map(),
    idToPath = new Map(),
    concurrentPreserved = 0,
    inflateResult = await LiK({
      source: exportedData,
      maxConcurrentWrites: SYNC_MAX_CONCURRENT,
      maxLineLength: MAX_BULK_LINE_LENGTH,
      handleMemory: async item => {
        let cleanPath = pSH(item.path),
          isValid = zTq(NiK(cleanPath)) && !(store.excludeKey && store.excludeKey(cleanPath.replace(/^\/+/, "")));
        if (idToPath.set(item.memoryId, isValid ? cleanPath : null), !isValid) return;
        try {
          if (await EiK(store, cleanPath)) concurrentPreserved++;else await viK(store, cleanPath, item.content), await SiK(store, cleanPath);
        } catch (err) {
          if (err instanceof CJ) {
            y(`${logPrefix}: refusing to write escaping path ${cleanPath}`, {
              level: "warn"
            });
            return;
          }
          throw err;
        }
        writtenEntries.set(cleanPath, {
          id: item.memoryId,
          sha256: item.contentSha256
        });
      }
    }),
    hadUnlinkError = false;
  for (let [diskPath, entry] of writtenEntries) if (idToPath.get(entry.id) !== diskPath) {
    writtenEntries.delete(diskPath);
    try {
      await CiK(store, diskPath);
    } catch (J) {
      y(`${logPrefix}: failed to remove superseded ${diskPath} (${ZH(J)})`, {
        level: "warn"
      }), hadUnlinkError = true;
    }
  }
  let netFilesWritten = writtenEntries.size - concurrentPreserved;
  if (!inflateResult.ok || hadUnlinkError) {
    let failReason = inflateResult.ok ? "dedupe_unlink_failed" : inflateResult.reason;
    return B_("team_memory_multistore_bulk_inflate", failReason), y(`${logPrefix}: bulk inflate incomplete (${failReason}) after ${netFilesWritten} file(s) \u2014 using per-file pull`, {
      level: "warn"
    }), "fell-back";
  }
  let filteredCount = s6([...idToPath.values()], p => p !== null);
  if (store.remoteHashes = writtenEntries, store.pulled = true, store.pullWrittenMtimes.clear(), EH("team_memory_multistore_bulk_inflate"), concurrentPreserved > 0) EH("team_memory_multistore_concurrent_write_preserved");
  return y(`${logPrefix}: bulk inflated ${netFilesWritten} file(s) from ${inflateResult.memoryLines} exported memory line(s)`, {
    level: "info"
  }), {
    success: true,
    entriesListed: filteredCount,
    filesWritten: netFilesWritten,
    filesDeleted: 0,
    filesSkippedConcurrent: concurrentPreserved
  };
}
async function biK(store) {
  let scopeParts = store.scope === "user" ? [] : ["team", store.mountName];
  if (store.scope === "team" && (await O2H(ih(), "team")) === "escape") return y(`multi-store-sync[${store.mountName}]: team memory root escapes its canonical location \u2014 failing closed`, {
    level: "error"
  }), true;
  if ((await O2H(store.mountDir, ...scopeParts)) === "escape") return y(`multi-store-sync[${store.mountName}]: mount dir escapes its canonical location \u2014 failing closed`, {
    level: "error"
  }), true;
  return false;
}
async function $Tq(store) {
  if (store.backend.mode === "ro") return EMPTY_PUSH_RESULT;
  if (await biK(store)) return B_("team_memory_multistore_conflict", "root_escape"), EMPTY_PUSH_RESULT;
  if (!store.pulled) return EMPTY_PUSH_RESULT;
  let diskSnapshot = await ViK(store.mountDir, store.excludeKey),
    toWrite = [];
  for (let [diskPath, fileInfo] of diskSnapshot.entries) {
    let remoteEntry = store.remoteHashes.get(diskPath);
    if (remoteEntry?.sha256 === fileInfo.sha256) continue;
    toWrite.push({
      path: diskPath,
      content: fileInfo.content,
      known: remoteEntry
    });
  }
  let toDelete = [];
  if (diskSnapshot.diskTrusted) {
    for (let [remotePath, remoteEntry] of store.remoteHashes) if (!diskSnapshot.diskPaths.has(remotePath)) toDelete.push({
      path: remotePath,
      ref: remoteEntry
    });
  }
  let filesWritten = 0,
    filesDeleted = 0,
    conflicts = 0,
    firstError,
    firstError_2;
  function recordError(err) {
    if (err instanceof sI) {
      firstError_2 ??= err.reason, firstError ??= err.message;
      return;
    }
    if (err instanceof mSH) {
      firstError ??= err.message;
      return;
    }
    firstError ??= ZH(err);
  }
  return await OTq(toWrite, SYNC_MAX_CONCURRENT, async A => {
    try {
      let f;
      if (A.known) f = await store.backend.update(A.known.id, A.content, A.known.sha256);else try {
        f = await store.backend.create(A.path, A.content);
      } catch (j) {
        if (j instanceof HzH && j.existingId) f = await store.backend.update(j.existingId, A.content, null);else throw j;
      }
      store.remoteHashes.set(A.path, f), filesWritten++;
    } catch (f) {
      if (f instanceof HzH) {
        if (f.actual && A.known) store.remoteHashes.set(A.path, {
          id: A.known.id,
          sha256: f.actual
        });
        conflicts++;
        return;
      }
      recordError(f);
    }
  }), await OTq(toDelete, SYNC_MAX_CONCURRENT, async A => {
    try {
      await store.backend.delete(A.ref.id, A.ref.sha256), store.remoteHashes.delete(A.path), filesDeleted++;
    } catch (f) {
      if (f instanceof HzH) {
        if (f.actual) store.remoteHashes.set(A.path, {
          id: A.ref.id,
          sha256: f.actual
        });
        conflicts++;
        return;
      }
      if (f instanceof v9H) {
        store.remoteHashes.delete(A.path);
        return;
      }
      recordError(f);
    }
  }), {
    success: !firstError,
    filesWritten: filesWritten,
    filesDeleted: filesDeleted,
    conflicts: conflicts,
    secretsSkipped: diskSnapshot.skippedSecretPaths.length,
    permanent: firstError_2,
    error: firstError
  };
}
function YTq() {
  if (dH.CLAUDE_CODE_DISABLE_MEMORY_PERIODIC_RESYNC) return 0;
  let intervalMinutes = j_("tengu_memory_store_resync_interval_minutes", DEFAULT_RESYNC_INTERVAL_MINUTES);
  if (!Number.isFinite(intervalMinutes) || intervalMinutes <= 0) return 0;
  return Math.max(intervalMinutes, MIN_RESYNC_INTERVAL_MINUTES) * 60000;
}
async function wTq(multiStoreState, trigger = "watch") {
  if (multiStoreState.inFlight) return multiStoreState.inFlight;
  let p = DvO(multiStoreState, trigger);
  multiStoreState.inFlight = p;
  try {
    return await p;
  } finally {
    multiStoreState.inFlight = null;
  }
}
async function DvO(multiStoreState, trigger) {
  let pullResults = {},
    pushResults = {},
    teamRootEscaped = (await O2H(ih(), "team")) === "escape";
  if (teamRootEscaped) y("multi-store-sync: team memory root escapes its canonical location \u2014 failing all stores closed", {
    level: "error"
  });
  await Promise.all(multiStoreState.stores.map(async $ => {
    if ($.suppressedReason !== null) {
      pullResults[$.mountName] = SUPPRESSED_SYNC_RESULT;
      return;
    }
    let Y = w => {
      pullResults[$.mountName] = {
        success: false,
        entriesListed: 0,
        filesWritten: 0,
        filesDeleted: 0,
        error: w
      };
    };
    if (teamRootEscaped && $.scope === "team") {
      Y("team memory root canonicity check failed (fail closed)");
      return;
    }
    try {
      await Ju.mkdir($.mountDir, {
        recursive: true
      });
      let w = $.scope === "user" ? [] : ["team", $.mountName];
      if ((await O2H($.mountDir, ...w)) === "escape") {
        y(`multi-store-sync[${$.mountName}]: mount dir escapes its canonical location \u2014 skipping pull+push (fail closed)`, {
          level: "error"
        }), Y("mount dir canonicity check failed (fail closed)");
        return;
      }
      pullResults[$.mountName] = await wvO($);
    } catch (w) {
      pullResults[$.mountName] = {
        success: false,
        entriesListed: 0,
        filesWritten: 0,
        filesDeleted: 0,
        error: ZH(w)
      };
    }
  })), await Promise.all(multiStoreState.stores.map(async $ => {
    if ($.suppressedReason !== null) {
      pushResults[$.mountName] = EMPTY_PUSH_RESULT;
      return;
    }
    try {
      pushResults[$.mountName] = await $Tq($);
    } catch (Y) {
      pushResults[$.mountName] = {
        ...EMPTY_PUSH_RESULT,
        success: false,
        error: ZH(Y)
      };
    }
  }));
  for (let $ of multiStoreState.stores) {
    if ($.suppressedReason !== null) continue;
    let Y = pullResults[$.mountName]?.permanent ?? pushResults[$.mountName]?.permanent;
    if (Y) $.suppressedReason = Y, y(`multi-store-sync[${$.mountName}]: suppressing further sync (${Y})`, {
      level: "warn"
    });
  }
  let summary = {
    stores: multiStoreState.stores.length,
    stores_suppressed: s6(multiStoreState.stores, $ => $.suppressedReason !== null),
    pull_written: Object.values(pullResults).reduce(($, Y) => $ + Y.filesWritten, 0),
    pull_deleted: Object.values(pullResults).reduce(($, Y) => $ + Y.filesDeleted, 0),
    push_written: Object.values(pushResults).reduce(($, Y) => $ + Y.filesWritten, 0),
    push_deleted: Object.values(pushResults).reduce(($, Y) => $ + Y.filesDeleted, 0),
    conflicts: Object.values(pushResults).reduce(($, Y) => $ + Y.conflicts, 0),
    secrets_skipped: Object.values(pushResults).reduce(($, Y) => $ + Y.secretsSkipped, 0),
    pull_failures: s6(Object.values(pullResults), $ => !$.success),
    push_failures: s6(Object.values(pushResults), $ => !$.success)
  };
  if (c("tengu_team_mem_multistore_sync", {
    ...summary,
    trigger: QH(trigger)
  }), summary.pull_failures === 0) EH("team_memory_multistore_pull");else bH("team_memory_multistore_pull", "multistore_pull_failed");
  if (summary.push_failures === 0) EH("team_memory_multistore_push");else bH("team_memory_multistore_push", "multistore_push_failed");
  if (summary.conflicts > 0) EH("team_memory_multistore_conflict");
  return y(`multi-store-sync: ${summary.stores} store(s) \u2014 ` + `pull \u2193${summary.pull_written}/\u2212${summary.pull_deleted}, ` + `push \u2191${summary.push_written}/\u2212${summary.push_deleted}` + (summary.conflicts ? `, ${summary.conflicts} conflict(s)` : "") + (summary.pull_failures || summary.push_failures ? `, failures pull=${summary.pull_failures} push=${summary.push_failures}` : ""), {
    level: "info"
  }), {
    pulls: pullResults,
    pushes: pushResults
  };
}
var kiK,
  Ju,
  wU,
  MAX_FILE_SIZE_BYTES = 102400,
  SYNC_MAX_CONCURRENT = 6,
  MAX_BULK_LINE_LENGTH,
  YvO,
  EMPTY_PUSH_RESULT,
  DEFAULT_RESYNC_INTERVAL_MINUTES = 60,
  MIN_RESYNC_INTERVAL_MINUTES = 1,
  SUPPRESSED_SYNC_RESULT;
var IiK = L(() => {
  xz();
  zV_();
  Sy();
  UH();
  l8();
  R_();
  xX();
  f6();
  t6();
  v_();
  fA6();
  DE8();
  hiK();
  kiK = require("crypto"), Ju = require("fs/promises"), wU = require("path"), MAX_BULK_LINE_LENGTH = MAX_FILE_SIZE_BYTES * 6 + 16384;
  YvO = [".md", ".txt", ".json", ".jsonl"];
  EMPTY_PUSH_RESULT = {
    success: true,
    filesWritten: 0,
    filesDeleted: 0,
    conflicts: 0,
    secretsSkipped: 0
  };
  SUPPRESSED_SYNC_RESULT = {
    success: true,
    entriesListed: 0,
    filesWritten: 0,
    filesDeleted: 0
  };
});

export {$vO as lUp,TTq as cAo,zTq as uAo,NiK as GJa,ViK as VJa,rm6 as dqn,viK as KJa,EiK as zJa,SiK as YJa,CiK as JJa,OTq as lAo,wvO as uUp,AvO as dUp,biK as XJa,$Tq as dAo,YTq as pAo,wTq as mAo,DvO as AUp,kiK as jJa,Ju as N9,wU as B6,MAX_FILE_SIZE_BYTES as WJa,SYNC_MAX_CONCURRENT as uqn,MAX_BULK_LINE_LENGTH as aUp,YvO as cUp,EMPTY_PUSH_RESULT as l4t,DEFAULT_RESYNC_INTERVAL_MINUTES as pUp,MIN_RESYNC_INTERVAL_MINUTES as mUp,SUPPRESSED_SYNC_RESULT as fUp,IiK as QJa};
