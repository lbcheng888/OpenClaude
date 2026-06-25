// @ts-nocheck
import {_E,sEn,$R,Qfe,cO} from "../telemetry/2249_cO.ts";
import {xm,Jm} from "./2207_Jm.ts";
import {t_e,APn,JFt} from "../telemetry/3265_JFt.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "./0230_encoding.ts";
import {cn,Ce,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {y7e,aA} from "../../vendor/m234.ts";
import {Pt,xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {U2,tie,HUe,Xfe,i9r} from "../../vendor/m2243.ts";
import {Ne} from "../../vendor/m583.ts";
import {grl,_rl} from "../../vendor/m4373.ts";
import {IUe,tEn} from "../../vendor/m2244.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck

/** Compute the hex sha256 of a UTF-8 string. */
function W5p(content) {
  return yrl.createHash("sha256").update(content, "utf8").digest("hex");
}

/**
 * Build the in-memory multi-store sync state from parallel arrays of backends
 * and mount specs. Each store tracks its mount dir, scope, remote hashes and
 * sync bookkeeping (suppression / invalidation basis).
 */
function w8n(backends, mounts) {
  if (backends.length !== mounts.length) throw Error("createMultiStoreState: length mismatch");
  let teamMemPath = _E(),
    userMemPath = xm();
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
        mountDir: isUserScope ? userMemPath : (KB.join(teamMemPath, mountConfig.mount) + KB.sep).normalize("NFC"),
        excludeKey: isUserScope ? t_e : null,
        remoteHashes: new Map(),
        createdAtMs: Date.now(),
        pullWrittenMtimes: new Map(),
        pulled: !1,
        suppressedReason: null,
        invalidatedBasis: null
      };
    }),
    inFlight: null
  };
}

/** Feature flag: whether the partition-aware (".memory-sync almanac") logic is on. */
function O6t() {
  return it("tengu_silk_almanac", !1);
}

/** Write the .memory-sync manifest stamping the store's partition id, if it's missing or stale. */
async function Erl(store) {
  if ((await k8n(store.mountDir))?.partition === store.backend.partitionId) return;
  let manifestText = Pe({
    v: brl,
    partition: store.backend.partitionId
  });
  await _L.mkdir(store.mountDir, {
    recursive: !0
  }), await _L.writeFile(KB.join(store.mountDir, Srl), manifestText, "utf8");
}

/** Read and validate the .memory-sync manifest in a mount dir; null if absent/invalid. */
async function k8n(dirPath) {
  try {
    let manifestText = await _L.readFile(KB.join(dirPath, Srl), "utf8"),
      manifest = qt(manifestText);
    if (manifest === null || typeof manifest !== "object" || manifest.v !== brl || typeof manifest.partition !== "string") return null;
    return manifest;
  } catch {
    return null;
  }
}

/** Whether a filename has an allowed memory extension (and isn't dotfile). */
function Crl(filename) {
  if (filename.startsWith(".")) return !1;
  return G5p.some(ext => filename.endsWith(ext));
}

/** Whether a virtual path is a valid memory path: no dot segments and an allowed extension. */
function Arl(virtualPath) {
  let segments = virtualPath.replace(/^\/+/, "").split("/");
  return segments.every(seg => !seg.startsWith(".")) && Crl(segments.at(-1));
}

/**
 * Recursively scan a mount dir, returning the on-disk memory entries (content +
 * sha256), the set of disk virtual paths, whether the disk listing is trusted
 * (no permission errors), and the paths skipped due to detected secrets.
 */
async function Rrl(dirPath, excludeKey) {
  let entries = new Map(),
    diskPaths = new Set(),
    skippedSecretPaths = [],
    diskTrusted = !0;
  async function recurse(currentDir) {
    let dirEntries;
    try {
      dirEntries = await _L.readdir(currentDir, {
        withFileTypes: !0
      });
    } catch (err) {
      let code = cn(err);
      if (code === "ENOENT") return;
      if (code === "EACCES" || code === "EPERM") {
        diskTrusted = !1;
        return;
      }
      throw err;
    }
    await Promise.all(dirEntries.map(async entry => {
      let fullPath = KB.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".")) return;
        if (excludeKey) {
          let relPath = KB.relative(dirPath, fullPath).split(KB.sep).join("/");
          if (excludeKey(relPath)) return;
        }
        await recurse(fullPath);
        return;
      }
      if (!entry.isFile() || !Crl(entry.name)) return;
      let virtualPath = "/" + KB.relative(dirPath, fullPath).split(KB.sep).join("/");
      diskPaths.add(virtualPath);
      try {
        let stat = await _L.stat(fullPath);
        if (stat.size > Trl) {
          A(`multi-store-sync: skipping oversized ${virtualPath} (${stat.size}B)`, {
            level: "info"
          });
          return;
        }
        let content = await _L.readFile(fullPath, "utf8");
        if (y7e(content).length > 0) {
          skippedSecretPaths.push(virtualPath), A(`multi-store-sync: skipping ${virtualPath} (secret detected)`, {
            level: "warn"
          });
          return;
        }
        entries.set(virtualPath, {
          content: content,
          sha256: W5p(content)
        });
      } catch (err) {
        let code = cn(err);
        if (code === "ENOENT") return;
        if (code === "EACCES" || code === "EPERM") {
          diskTrusted = !1;
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

/** Resolve a store-relative virtual path to a canonical disk path, throwing if it escapes the mount. */
async function H8n(store, relativePath) {
  let cleanPath = relativePath.replace(/^\/+/, ""),
    resolvedKey = store.scope === "user" ? await APn(cleanPath) : await sEn(KB.join(store.mountName, cleanPath).split(KB.sep).join("/"));
  if (!resolvedKey.normalize("NFC").startsWith(store.mountDir)) throw new $R(`path escapes mount ${store.mountName}: ${relativePath}`);
  return resolvedKey;
}

/** Write content to the resolved local disk path, creating parent dirs. */
async function vrl(store, relativePath, content) {
  let diskPath = await H8n(store, relativePath);
  await _L.mkdir(KB.dirname(diskPath), {
    recursive: !0
  }), await _L.writeFile(diskPath, content, "utf8");
}

/** Whether a local file was concurrently written (newer than our last pull mtime / store creation). */
async function wrl(store, relativePath) {
  if (store.pulled) return !1;
  try {
    let diskPath = await H8n(store, relativePath),
      stat = await _L.stat(diskPath),
      lastWrittenMtime = store.pullWrittenMtimes.get(relativePath);
    if (lastWrittenMtime !== void 0) return stat.mtimeMs > lastWrittenMtime;
    return stat.mtimeMs >= store.createdAtMs - 1000;
  } catch {
    return !1;
  }
}

/** Record the mtime of a just-pulled file so later concurrent-write checks are accurate. */
async function krl(store, relativePath) {
  try {
    let diskPath = await H8n(store, relativePath),
      stat = await _L.stat(diskPath);
    store.pullWrittenMtimes.set(relativePath, stat.mtimeMs);
  } catch {}
}

/** Delete a local file, ignoring missing files and refusing escaping paths. */
async function Hrl(store, relativePath) {
  try {
    let diskPath = await H8n(store, relativePath);
    await _L.unlink(diskPath);
  } catch (err) {
    if (err instanceof $R) {
      A(`multi-store-sync[${store.mountName}]: refusing to delete escaping path ${relativePath}`, {
        level: "warn"
      });
      return;
    }
    if (cn(err) === "ENOENT") return;
    throw err;
  }
}

/** Run a handler over items with bounded concurrency via a fixed pool of workers. */
async function oSo(items, maxConcurrency, handler) {
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

/**
 * After a pull, check the .memory-sync manifest's partition still matches the
 * backend. On mismatch: suppress (team scope) or invalidate the pull basis so a
 * fresh pull happens, recording the prior remote hashes as invalidatedBasis.
 */
async function Irl(store) {
  if (!O6t()) return;
  if (!store.pulled) return;
  let manifest = await k8n(store.mountDir);
  if (manifest?.partition === store.backend.partitionId) return;
  if (manifest !== null && store.scope !== "user") {
    xrl(store, "midSession");
    return;
  }
  if (store.remoteHashes.size === 0) return;
  A(`multi-store-sync[${store.mountName}]: .memory-sync manifest ${manifest === null ? "absent" : "partition mismatch"} — invalidating basis`, {
    level: "warn"
  }), Pt("team_memory_multistore_conflict", manifest === null ? "manifest_absent" : "manifest_mismatch"), W("tengu_team_mem_push_manifest_gate", {
    absent: manifest === null,
    remote_entries: store.remoteHashes.size
  }), store.invalidatedBasis = store.remoteHashes, store.remoteHashes = new Map(), store.pulled = !1;
}

/** Suppress further sync for a store whose mount dir belongs to a different partition. */
function xrl(store, trigger) {
  store.suppressedReason = "mount_dir_foreign_partition", store.remoteHashes = new Map(), store.pulled = !1, A(`multi-store-sync[${store.mountName}]: mount dir holds a different partition's .memory-sync — suppressing sync (remove the dir to re-mount)`, {
    level: "warn"
  }), Pt("team_memory_multistore_conflict", "foreign_partition_dir"), W("tengu_team_mem_foreign_partition_suppressed", {
    trigger: Le(trigger)
  });
}

/**
 * Pull remote memories into the local mount: optional bulk-inflate fast path,
 * else per-file fetch of changed entries plus deletion of locally-stale files.
 */
async function V5p(store) {
  if (await Drl(store)) return {
    success: !1,
    entriesListed: 0,
    filesWritten: 0,
    filesDeleted: 0,
    error: "mount dir canonicity check failed (fail closed)"
  };
  if (await Irl(store), store.suppressedReason !== null) return Prl;
  let bulkResult = await K5p(store);
  if (bulkResult !== "not-attempted" && bulkResult !== "fell-back") return bulkResult;
  let usedFallback = bulkResult === "fell-back",
    remoteEntries;
  try {
    remoteEntries = await store.backend.list();
  } catch (err) {
    if (usedFallback) xe("team_memory_multistore_bulk_inflate", "fallback_failed");
    return {
      success: !1,
      entriesListed: 0,
      filesWritten: 0,
      filesDeleted: 0,
      permanent: err instanceof U2 ? err.reason : void 0,
      error: Ce(err)
    };
  }
  remoteEntries = remoteEntries.filter(entry => Arl(entry.path) && !(store.excludeKey && store.excludeKey(entry.path.replace(/^\/+/, ""))));
  let remoteMap = new Map();
  for (let entry of remoteEntries) remoteMap.set(entry.path, {
    id: entry.id,
    sha256: entry.sha256
  });
  let diskSnapshot = await Rrl(store.mountDir, store.excludeKey),
    invalidatedBasis = store.invalidatedBasis ?? null,
    basis = invalidatedBasis ?? store.remoteHashes,
    toFetch = remoteEntries.filter(entry => {
      if (diskSnapshot.entries.get(entry.path)?.sha256 === entry.sha256) return !1;
      if (invalidatedBasis !== null && !diskSnapshot.diskPaths.has(entry.path)) return !0;
      return basis.get(entry.path)?.sha256 !== entry.sha256;
    }),
    toDelete = diskSnapshot.diskTrusted ? [...diskSnapshot.diskPaths].filter(diskPath => !remoteMap.has(diskPath) && basis.has(diskPath)) : [],
    filesWritten = 0,
    filesDeleted = 0,
    concurrentPreserved = 0,
    lastError,
    lastPermanentError;
  await oSo(toFetch, v8n, async entry => {
    try {
      let content = await store.backend.read(entry.id);
      if (!(invalidatedBasis !== null && diskSnapshot.diskPaths.has(entry.path)) && (await wrl(store, entry.path))) {
        concurrentPreserved++;
        return;
      }
      await vrl(store, entry.path, content.content), await krl(store, entry.path), filesWritten++;
    } catch (err) {
      if (err instanceof tie) {
        remoteMap.delete(entry.path);
        return;
      }
      if (err instanceof $R) {
        A(`multi-store-sync[${store.mountName}]: refusing to write escaping path ${entry.path}`, {
          level: "warn"
        }), remoteMap.delete(entry.path);
        return;
      }
      if (err instanceof U2) lastPermanentError ??= err.reason;
      lastError ??= Ce(err);
    }
  });
  for (let deletePath of toDelete) try {
    await Hrl(store, deletePath), filesDeleted++;
  } catch (err) {
    lastError ??= Ce(err);
  }
  if (lastError) {
    if (usedFallback) xe("team_memory_multistore_bulk_inflate", "fallback_failed");
    return {
      success: !1,
      entriesListed: remoteEntries.length,
      filesWritten: filesWritten,
      filesDeleted: filesDeleted,
      permanent: lastPermanentError,
      error: lastError
    };
  }
  if (store.remoteHashes = remoteMap, store.pulled = !0, store.invalidatedBasis = null, await Erl(store).catch(err => A(`multi-store-sync[${store.mountName}]: manifest write failed: ${Ce(err)}`, {
    level: "warn"
  })), concurrentPreserved > 0) He("team_memory_multistore_concurrent_write_preserved"), A(`multi-store-sync[${store.mountName}]: preserved ${concurrentPreserved} concurrent local write(s) during first pull`, {
    level: "info"
  });
  return {
    success: !0,
    entriesListed: remoteEntries.length,
    filesWritten: filesWritten,
    filesDeleted: filesDeleted,
    filesSkippedConcurrent: concurrentPreserved
  };
}

/**
 * Bulk-inflate fast path: try backend.exportAll() and stream-write all memories
 * at once. Returns "not-attempted" / "fell-back" sentinels or a sync result.
 */
async function K5p(store) {
  if (store.pulled || store.remoteHashes.size > 0 || (store.invalidatedBasis ?? null) !== null) return "not-attempted";
  let backend = store.backend;
  if (!backend.exportAll) return "not-attempted";
  if (Ne.CLAUDE_CODE_DISABLE_MEMORY_BULK_INFLATE) return "not-attempted";
  if (!it("tengu_memory_bulk_inflate", !0)) return "not-attempted";
  let logPrefix = `multi-store-sync[${store.mountName}]`,
    exportedData;
  try {
    exportedData = await backend.exportAll();
  } catch (err) {
    let errType = err instanceof tie ? "not_found" : "http_error";
    return Pt("team_memory_multistore_bulk_inflate", errType), A(`${logPrefix}: bulk inflate unavailable (${Ce(err)}) — using per-file pull`, {
      level: "debug"
    }), "fell-back";
  }
  let writtenEntries = new Map(),
    idToPath = new Map(),
    concurrentPreserved = 0,
    inflateResult = await grl({
      source: exportedData,
      maxConcurrentWrites: v8n,
      maxLineLength: q5p,
      handleMemory: async item => {
        let cleanPath = IUe(item.path),
          isValid = Arl(cleanPath) && !(store.excludeKey && store.excludeKey(cleanPath.replace(/^\/+/, "")));
        if (idToPath.set(item.memoryId, isValid ? cleanPath : null), !isValid) return;
        try {
          if (await wrl(store, cleanPath)) concurrentPreserved++;else await vrl(store, cleanPath, item.content), await krl(store, cleanPath);
        } catch (err) {
          if (err instanceof $R) {
            A(`${logPrefix}: refusing to write escaping path ${cleanPath}`, {
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
    hadUnlinkError = !1;
  for (let [diskPath, entry] of writtenEntries) if (idToPath.get(entry.id) !== diskPath) {
    writtenEntries.delete(diskPath);
    try {
      await Hrl(store, diskPath);
    } catch (err) {
      A(`${logPrefix}: failed to remove superseded ${diskPath} (${Ce(err)})`, {
        level: "warn"
      }), hadUnlinkError = !0;
    }
  }
  let netFilesWritten = writtenEntries.size - concurrentPreserved;
  if (!inflateResult.ok || hadUnlinkError) {
    let failReason = inflateResult.ok ? "dedupe_unlink_failed" : inflateResult.reason;
    return Pt("team_memory_multistore_bulk_inflate", failReason), A(`${logPrefix}: bulk inflate incomplete (${failReason}) after ${netFilesWritten} file(s) — using per-file pull`, {
      level: "warn"
    }), "fell-back";
  }
  let filteredCount = zn([...idToPath.values()], path => path !== null);
  if (store.remoteHashes = writtenEntries, store.pulled = !0, await Erl(store).catch(err => A(`${logPrefix}: manifest write failed: ${Ce(err)}`, {
    level: "warn"
  })), He("team_memory_multistore_bulk_inflate"), concurrentPreserved > 0) He("team_memory_multistore_concurrent_write_preserved");
  return A(`${logPrefix}: bulk inflated ${netFilesWritten} file(s) from ${inflateResult.memoryLines} exported memory line(s)`, {
    level: "info"
  }), {
    success: !0,
    entriesListed: filteredCount,
    filesWritten: netFilesWritten,
    filesDeleted: 0,
    filesSkippedConcurrent: concurrentPreserved
  };
}

/** Fail-closed canonicity check: true if team root or mount dir escapes its canonical location. */
async function Drl(store) {
  let scopeParts = store.scope === "user" ? [] : ["team", store.mountName];
  if (store.scope === "team" && (await Qfe(_E(), "team")) === "escape") return A(`multi-store-sync[${store.mountName}]: team memory root escapes its canonical location — failing closed`, {
    level: "error"
  }), !0;
  if ((await Qfe(store.mountDir, ...scopeParts)) === "escape") return A(`multi-store-sync[${store.mountName}]: mount dir escapes its canonical location — failing closed`, {
    level: "error"
  }), !0;
  return !1;
}

/**
 * Push local disk changes to the remote backend: create/update changed files
 * and delete remote entries no longer present on disk (when disk is trusted).
 */
async function I8n(store) {
  if (store.backend.mode === "ro") return P6t;
  if (await Drl(store)) return Pt("team_memory_multistore_conflict", "root_escape"), P6t;
  if (await Irl(store), !store.pulled) return P6t;
  let diskSnapshot = await Rrl(store.mountDir, store.excludeKey),
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
  let partitionMatches = !0,
    partitionForeign = !1;
  if (O6t()) {
    let manifest = await k8n(store.mountDir);
    partitionMatches = manifest?.partition === store.backend.partitionId, partitionForeign = manifest !== null && !partitionMatches;
  }
  let toDelete = [];
  if (diskSnapshot.diskTrusted && partitionMatches) {
    for (let [remotePath, remoteEntry] of store.remoteHashes) if (!diskSnapshot.diskPaths.has(remotePath)) toDelete.push({
      path: remotePath,
      ref: remoteEntry
    });
  }
  let filesWritten = 0,
    filesDeleted = 0,
    conflicts = 0,
    firstError,
    firstPermanentError;
  function recordError(err) {
    if (err instanceof U2) {
      firstPermanentError ??= err.reason, firstError ??= err.message;
      return;
    }
    if (err instanceof HUe) {
      firstError ??= err.message;
      return;
    }
    firstError ??= Ce(err);
  }
  return await oSo(partitionForeign ? [] : toWrite, v8n, async item => {
    try {
      let result;
      if (item.known) result = await store.backend.update(item.known.id, item.content, item.known.sha256);else try {
        result = await store.backend.create(item.path, item.content);
      } catch (err) {
        if (err instanceof Xfe && err.existingId) result = await store.backend.update(err.existingId, item.content, null);else throw err;
      }
      store.remoteHashes.set(item.path, result), filesWritten++;
    } catch (err) {
      if (err instanceof Xfe) {
        if (err.actual && item.known) store.remoteHashes.set(item.path, {
          id: item.known.id,
          sha256: err.actual
        });
        conflicts++;
        return;
      }
      recordError(err);
    }
  }), await oSo(toDelete, v8n, async item => {
    try {
      await store.backend.delete(item.ref.id, item.ref.sha256), store.remoteHashes.delete(item.path), filesDeleted++;
    } catch (err) {
      if (err instanceof Xfe) {
        if (err.actual) store.remoteHashes.set(item.path, {
          id: item.ref.id,
          sha256: err.actual
        });
        conflicts++;
        return;
      }
      if (err instanceof tie) {
        store.remoteHashes.delete(item.path);
        return;
      }
      recordError(err);
    }
  }), {
    success: !firstError,
    filesWritten: filesWritten,
    filesDeleted: filesDeleted,
    conflicts: conflicts,
    secretsSkipped: diskSnapshot.skippedSecretPaths.length,
    diskTrusted: diskSnapshot.diskTrusted,
    permanent: firstPermanentError,
    error: firstError
  };
}

/** Periodic resync interval in ms (0 = disabled), clamped to a minimum. */
function sSo() {
  if (Ne.CLAUDE_CODE_DISABLE_MEMORY_PERIODIC_RESYNC) return 0;
  let intervalMinutes = it("tengu_memory_store_resync_interval_minutes", z5p);
  if (!Number.isFinite(intervalMinutes) || intervalMinutes <= 0) return 0;
  return Math.max(intervalMinutes, j5p) * 60000;
}

/** Entry point: run a full multi-store sync, deduping concurrent runs via inFlight. */
async function x8n(multiStoreState, trigger = "watch") {
  if (multiStoreState.inFlight) return multiStoreState.inFlight;
  let inFlight = Y5p(multiStoreState, trigger);
  multiStoreState.inFlight = inFlight;
  try {
    return await inFlight;
  } finally {
    multiStoreState.inFlight = null;
  }
}

/** Core sync: pull all stores, then push all stores, then aggregate + report metrics. */
async function Y5p(multiStoreState, trigger) {
  let pullResults = {},
    pushResults = {},
    teamRootEscaped = (await Qfe(_E(), "team")) === "escape";
  if (teamRootEscaped) A("multi-store-sync: team memory root escapes its canonical location — failing all stores closed", {
    level: "error"
  });
  await Promise.all(multiStoreState.stores.map(async store => {
    if (O6t() && store.suppressedReason === null && !store.pulled && store.scope !== "user") {
      let manifest = await k8n(store.mountDir);
      if (manifest !== null && manifest.partition !== store.backend.partitionId) xrl(store, "firstPull");
    }
    if (store.suppressedReason !== null) {
      pullResults[store.mountName] = Prl;
      return;
    }
    let recordPullFailure = errMsg => {
      pullResults[store.mountName] = {
        success: !1,
        entriesListed: 0,
        filesWritten: 0,
        filesDeleted: 0,
        error: errMsg
      };
    };
    if (teamRootEscaped && store.scope === "team") {
      recordPullFailure("team memory root canonicity check failed (fail closed)");
      return;
    }
    try {
      await _L.mkdir(store.mountDir, {
        recursive: !0
      });
      let scopeParts = store.scope === "user" ? [] : ["team", store.mountName];
      if ((await Qfe(store.mountDir, ...scopeParts)) === "escape") {
        A(`multi-store-sync[${store.mountName}]: mount dir escapes its canonical location — skipping pull+push (fail closed)`, {
          level: "error"
        }), recordPullFailure("mount dir canonicity check failed (fail closed)");
        return;
      }
      pullResults[store.mountName] = await V5p(store);
    } catch (err) {
      pullResults[store.mountName] = {
        success: !1,
        entriesListed: 0,
        filesWritten: 0,
        filesDeleted: 0,
        error: Ce(err)
      };
    }
  })), await Promise.all(multiStoreState.stores.map(async store => {
    if (store.suppressedReason !== null) {
      pushResults[store.mountName] = P6t;
      return;
    }
    try {
      pushResults[store.mountName] = await I8n(store);
    } catch (err) {
      pushResults[store.mountName] = {
        ...P6t,
        success: !1,
        error: Ce(err)
      };
    }
  }));
  for (let store of multiStoreState.stores) {
    if (store.suppressedReason !== null) continue;
    let permanent = pullResults[store.mountName]?.permanent ?? pushResults[store.mountName]?.permanent;
    if (permanent) store.suppressedReason = permanent, A(`multi-store-sync[${store.mountName}]: suppressing further sync (${permanent})`, {
      level: "warn"
    });
  }
  let summary = {
    stores: multiStoreState.stores.length,
    stores_suppressed: zn(multiStoreState.stores, store => store.suppressedReason !== null),
    pull_written: Object.values(pullResults).reduce((acc, res) => acc + res.filesWritten, 0),
    pull_deleted: Object.values(pullResults).reduce((acc, res) => acc + res.filesDeleted, 0),
    push_written: Object.values(pushResults).reduce((acc, res) => acc + res.filesWritten, 0),
    push_deleted: Object.values(pushResults).reduce((acc, res) => acc + res.filesDeleted, 0),
    conflicts: Object.values(pushResults).reduce((acc, res) => acc + res.conflicts, 0),
    secrets_skipped: Object.values(pushResults).reduce((acc, res) => acc + res.secretsSkipped, 0),
    pull_failures: zn(Object.values(pullResults), res => !res.success),
    push_failures: zn(Object.values(pushResults), res => !res.success)
  };
  if (W("tengu_team_mem_multistore_sync", {
    ...summary,
    trigger: Le(trigger)
  }), summary.pull_failures === 0) He("team_memory_multistore_pull");else xe("team_memory_multistore_pull", "multistore_pull_failed");
  if (summary.push_failures === 0) He("team_memory_multistore_push");else xe("team_memory_multistore_push", "multistore_push_failed");
  if (summary.conflicts > 0) He("team_memory_multistore_conflict");
  return A(`multi-store-sync: ${summary.stores} store(s) — ` + `pull ↓${summary.pull_written}/−${summary.pull_deleted}, ` + `push ↑${summary.push_written}/−${summary.push_deleted}` + (summary.conflicts ? `, ${summary.conflicts} conflict(s)` : "") + (summary.pull_failures || summary.push_failures ? `, failures pull=${summary.pull_failures} push=${summary.push_failures}` : ""), {
    level: "info"
  }), {
    pulls: pullResults,
    pushes: pushResults
  };
}

var yrl,
  _L,
  KB,
  Trl = 102400,
  v8n = 6,
  q5p,
  G5p,
  Srl = ".memory-sync",
  brl = 1,
  P6t,
  z5p = 60,
  j5p = 1,
  Prl;
var Orl = b(() => {
  Jm();
  JFt();
  cO();
  qe();
  Ir();
  Ct();
  aA();
  tn();
  mn();
  jn();
  kt();
  tEn();
  i9r();
  _rl();
  yrl = require("crypto"), _L = require("fs/promises"), KB = require("path"), q5p = Trl * 6 + 16384;
  G5p = [".md", ".txt", ".json", ".jsonl"];
  P6t = {
    success: !0,
    filesWritten: 0,
    filesDeleted: 0,
    conflicts: 0,
    secretsSkipped: 0
  };
  Prl = {
    success: !0,
    entriesListed: 0,
    filesWritten: 0,
    filesDeleted: 0
  };
});

export {W5p,w8n,O6t,Erl,k8n,Crl,Arl,Rrl,H8n,vrl,wrl,krl,Hrl,oSo,Irl,xrl,V5p,K5p,Drl,I8n,sSo,x8n,Y5p,yrl,_L,KB,Trl,v8n,q5p,G5p,Srl,brl,P6t,z5p,j5p,Prl,Orl};
