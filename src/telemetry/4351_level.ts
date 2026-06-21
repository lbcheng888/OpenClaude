// @ts-nocheck
import {dE as nP,MFe as fve,byn as kHt,Bw as KS,GO as OO} from "./2241_GO.ts";
import {DIn as YMt,OIn as XMt,jhe as Mae,a9e as pot,y1t as QMt} from "./3249_y1t.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {isFirstPartyAnthropicBaseUrl as Gu,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
import {isClaudeAISubscriber as Co,hasStoredOAuthToken as sE,hasOAuthScope as rXe,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {CLAUDE_AI_INFERENCE_SCOPE as y2,CLAUDE_AI_PROFILE_SCOPE as OSe,Wn as Gn,Dc as Hc} from "../api/0459_getOauthConfig.ts";
import {isAxiosError as nT} from "../../vendor/m567.ts";
import {kJa as nYa,wJa as Zza,RJa as eYa,xJa as tYa,HJa as rYa} from "../../vendor/m4349.ts";
import {si as ei,gT as dT} from "../../vendor/m2190.ts";
import {Lb as Db,dn as ln,bt as St} from "../../vendor/m195.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {sle as zae,B9e as f9e} from "../api/5191_model.ts";
import {sleep as Fn} from "./1483_withTimeout.ts";
import {SGe as G_t,tv as QC} from "../../vendor/m232.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {isTmuxControlMode as Bt,Ie as He,Oe as Pe,ln as cn} from "./0594_feature_name.ts";
import {ra as ta,Ap as hp} from "../config/0614_Ap.ts";
import {isPolicyAllowed as ii,rd as sd} from "../../vendor/m2205.ts";
import {xu as Ru,tA as iA} from "../config/2201_tA.ts";
import {sS as ZT,UO as T1} from "../config/2189_level.ts";
import {setTeamMemoryServerStatus as EWe,getTeamMemoryServerStatus as Sgt,lt as ct} from "../session/0131_sent.ts";
import {zw as Ww,$Bi as LNi} from "../config/2717_stripHtmlComments.ts";
import {b} from "../../runtime.ts";
import {ek as Xx} from "../core/0570_isCancel.ts";
// @ts-nocheck
function buildMemorySyncApiUrl(scope, repoSlug, view) {
  let viewParam = view ? `&view=${view}` : "";
  if (scope === "team") return `/api/claude_code/team_memory?repo=${encodeURIComponent(repoSlug)}${viewParam}`;
  return `/api/claude_code/memory?scope=user&repo=${encodeURIComponent(repoSlug)}${viewParam}`;
}
function getMemoryRootForScope(scope) {
  return scope === "team" ? nP() : YMt();
}
async function checkMemoryRootEscape(scope, memRoot, tag) {
  if ((await fve(memRoot, ...(scope === "team" ? ["team"] : []))) === "escape") return v(`${tag}: memory root escapes its canonical location \u2014 skipping sync (fail closed)`, {
    level: "error"
  }), true;
  return false;
}
function getMemoryWritePath(scope, relPath) {
  return scope === "team" ? kHt(relPath) : XMt(relPath);
}
function shouldSkipPath(scope, relPath) {
  if (scope === "user" && Mae(relPath)) return true;
  return false;
}
function getScopeTag(scope) {
  return scope === "team" ? "team-memory-sync" : "personal-memory-sync";
}
function createSyncState(scope, repoSlug) {
  return {
    scope: scope,
    repoSlug: repoSlug,
    lastKnownChecksum: null,
    serverChecksums: new Map(),
    serverMaxEntries: null,
    pulled: false,
    tombstonedKeys: new Set(),
    tombstonedPriorHashes: new Map(),
    keptDivergentHashes: new Map(),
    keptUnreadable: new Set(),
    pullPromise: null,
    aborted: false
  };
}
function computeSha256Checksum(content) {
  return "sha256:" + cryptoModule.createHash("sha256").update(content, "utf8").digest("hex");
}
function isMemorySyncAvailable() {
  if (!Gu()) return false;
  if (!Co()) return false;
  return sE() && rXe(y2) && rXe(OSe);
}
function truncateToMaxLength(str) {
  return str.length > MAX_SERVER_ERROR_STRING_LENGTH ? str.slice(0, MAX_SERVER_ERROR_STRING_LENGTH) : str;
}
function extractServerErrorFields(err) {
  if (!nT(err)) return {};
  return parseServerErrorData(err.response?.data);
}
function parseServerErrorData(data) {
  if (data === undefined || data === null) return {};
  let parseResult = nYa().safeParse(data);
  if (!parseResult.success) return {};
  let errorObj = parseResult.data.error;
  if (!errorObj) return {};
  return {
    ...(errorObj.message !== undefined && {
      serverMessage: truncateToMaxLength(errorObj.message)
    }),
    ...(errorObj.type !== undefined && {
      serverErrorType: truncateToMaxLength(errorObj.type)
    }),
    ...(errorObj.details?.error_code !== undefined && {
      serverErrorCode: truncateToMaxLength(errorObj.details.error_code)
    })
  };
}
async function fetchMemoryOnce(syncState, etag) {
  let tag = getScopeTag(syncState.scope);
  try {
    let headers = {};
    if (etag) headers["If-None-Match"] = `"${etag.replaceAll('"', "")}"`;
    let response = await ei.get(buildMemorySyncApiUrl(syncState.scope, syncState.repoSlug), {
      refreshOAuth: true,
      headers: headers,
      timeout: FETCH_TIMEOUT_MS,
      validateStatus: status => status === 200 || status === 304 || status === 404
    });
    if (!response.ok) return {
      success: false,
      error: response.reason === "no-auth" ? response.detail : response.reason,
      skipRetry: true,
      errorType: "auth"
    };
    let httpResponse = response.response;
    if (httpResponse.status === 304) return v(`${tag}: not modified (304)`, {
      level: "debug"
    }), {
      success: true,
      notModified: true,
      checksum: etag ?? undefined
    };
    if (httpResponse.status === 404) {
      let {
        serverErrorCode: errCode,
        serverMessage: errMsg
      } = parseServerErrorData(httpResponse.data);
      return v(`${tag}: 404 (code=${errCode ?? "none"}): ${errMsg ?? "no remote data"}`, {
        level: "debug"
      }), syncState.lastKnownChecksum = null, {
        success: true,
        isEmpty: true,
        serverErrorCode: errCode,
        serverMessage: errMsg
      };
    }
    let parseResult = Zza().safeParse(httpResponse.data);
    if (!parseResult.success) return v(`${tag}: invalid response format`, {
      level: "warn"
    }), {
      success: false,
      error: "Invalid memory response format",
      skipRetry: true,
      errorType: "parse"
    };
    let checksum = parseResult.data.checksum || httpResponse.headers.etag?.replace(/^"|"$/g, "") || undefined;
    if (checksum) syncState.lastKnownChecksum = checksum;
    return v(`${tag}: fetched successfully (checksum: ${checksum ?? "none"})`, {
      level: "debug"
    }), {
      success: true,
      data: parseResult.data,
      isEmpty: false,
      checksum: checksum
    };
  } catch (err) {
    let {
        kind: errKind,
        status: httpStatus,
        message: errMsg
      } = Db(err),
      bodyText = nT(err) ? Oe(err.response?.data ?? "") : "";
    if (errKind !== "other") v(`${tag}: fetch error ${httpStatus}: ${bodyText}`, {
      level: "warn"
    });
    let serverFields = extractServerErrorFields(err);
    switch (errKind) {
      case "auth":
        return {
          success: false,
          error: httpStatus === 403 ? `Forbidden by server policy: ${bodyText}` : `Not authorized for memory sync: ${bodyText}`,
          skipRetry: true,
          errorType: httpStatus === 403 ? "forbidden" : "auth",
          httpStatus: httpStatus,
          ...serverFields
        };
      case "timeout":
        return {
          success: false,
          error: "Memory sync request timeout",
          errorType: "timeout"
        };
      case "network":
        return {
          success: false,
          error: "Cannot connect to server",
          errorType: "network"
        };
      default:
        return {
          success: false,
          error: errMsg,
          errorType: "unknown",
          httpStatus: httpStatus,
          ...serverFields
        };
    }
  }
}
async function fetchEntryChecksums(syncState) {
  try {
    let response = await ei.get(buildMemorySyncApiUrl(syncState.scope, syncState.repoSlug, "hashes"), {
      refreshOAuth: true,
      timeout: FETCH_TIMEOUT_MS,
      validateStatus: status => status === 200 || status === 404
    });
    if (!response.ok) return {
      success: false,
      error: response.reason === "no-auth" ? response.detail : response.reason,
      errorType: "auth"
    };
    let httpResponse = response.response;
    if (httpResponse.status === 404) return syncState.lastKnownChecksum = null, {
      success: true,
      entryChecksums: {}
    };
    let parseResult = eYa().safeParse(httpResponse.data),
      checksum = (parseResult.success ? parseResult.data.checksum : undefined) || httpResponse.headers.etag?.replace(/^"|"$/g, ""),
      entryChecksums = parseResult.success ? parseResult.data.entryChecksums : undefined;
    if (!entryChecksums) return {
      success: false,
      error: "Server did not return entryChecksums (?view=hashes unsupported)",
      errorType: "parse"
    };
    if (checksum) syncState.lastKnownChecksum = checksum;
    return {
      success: true,
      version: parseResult.success ? parseResult.data.version : undefined,
      checksum: checksum,
      entryChecksums: entryChecksums,
      deletedEntries: parseResult.success ? parseResult.data.deletedEntries : undefined
    };
  } catch (err) {
    let {
        kind: errKind,
        status: httpStatus,
        message: errMsg
      } = Db(err),
      serverFields = extractServerErrorFields(err);
    switch (errKind) {
      case "auth":
        return {
          success: false,
          error: httpStatus === 403 ? "Forbidden by server policy" : "Not authorized",
          errorType: httpStatus === 403 ? "forbidden" : "auth",
          httpStatus: httpStatus,
          ...serverFields
        };
      case "timeout":
        return {
          success: false,
          error: "Timeout",
          errorType: "timeout"
        };
      case "network":
        return {
          success: false,
          error: "Network error",
          errorType: "network"
        };
      default:
        return {
          success: false,
          error: errMsg,
          errorType: "unknown",
          httpStatus: httpStatus,
          ...serverFields
        };
    }
  }
}
async function fetchMemoryWithRetries(syncState, etag) {
  let result = null;
  for (let attempt = 1; attempt <= MAX_FETCH_RETRIES + 1; attempt++) {
    if (result = await fetchMemoryOnce(syncState, etag), result.success || result.skipRetry) return result;
    if (attempt > MAX_FETCH_RETRIES) return result;
    let delayMs = zae(attempt);
    v(`${getScopeTag(syncState.scope)}: retry ${attempt}/${MAX_FETCH_RETRIES}`, {
      level: "debug"
    }), await Fn(delayMs);
  }
  return result;
}
function splitIntoBatches(entries) {
  let sortedKeys = Object.keys(entries).sort();
  if (sortedKeys.length === 0) return [];
  let baseSize = Buffer.byteLength('{"entries":{}}', "utf8"),
    entrySize = (key, value) => Buffer.byteLength(Oe(key), "utf8") + Buffer.byteLength(Oe(value), "utf8") + 2,
    batches = [],
    currentBatch = {},
    currentSize = baseSize;
  for (let key of sortedKeys) {
    let size = entrySize(key, entries[key]);
    if (currentSize + size > MAX_BATCH_BYTES && Object.keys(currentBatch).length > 0) batches.push(currentBatch), currentBatch = {}, currentSize = baseSize;
    currentBatch[key] = entries[key], currentSize += size;
  }
  return batches.push(currentBatch), batches;
}
async function uploadEntries(syncState, entries, etag, softDeleteKeys) {
  let tag = getScopeTag(syncState.scope);
  try {
    let headers = {
      "Content-Type": "application/json"
    };
    if (etag) headers["If-Match"] = `"${etag.replaceAll('"', "")}"`;
    let body = {
      entries: entries
    };
    if (softDeleteKeys.length > 0) body.soft_delete_keys = [...softDeleteKeys];
    let response = await ei.put(buildMemorySyncApiUrl(syncState.scope, syncState.repoSlug), body, {
      refreshOAuth: true,
      headers: headers,
      timeout: FETCH_TIMEOUT_MS,
      validateStatus: status => status === 200 || status === 412
    });
    if (!response.ok) return {
      success: false,
      error: response.reason === "no-auth" ? response.detail : response.reason,
      errorType: "auth"
    };
    let httpResponse = response.response;
    if (httpResponse.status === 412) return v(`${tag}: conflict (412 Precondition Failed)`, {
      level: "info"
    }), {
      success: false,
      conflict: true,
      error: "ETag mismatch"
    };
    let newChecksum = httpResponse.data?.checksum;
    if (newChecksum) syncState.lastKnownChecksum = newChecksum;
    let deletedNote = softDeleteKeys.length > 0 ? `, soft-deleted ${softDeleteKeys.length}` : "";
    return v(`${tag}: uploaded ${Object.keys(entries).length} entries${deletedNote} (checksum: ${newChecksum ?? "none"})`, {
      level: "debug"
    }), {
      success: true,
      checksum: newChecksum,
      lastModified: httpResponse.data?.lastModified
    };
  } catch (err) {
    let bodyText = nT(err) ? Oe(err.response?.data ?? "") : "";
    v(`${tag}: upload failed: ${err instanceof Error ? err.message : ""} ${bodyText}`, {
      level: "warn"
    });
    let {
        kind: errKind,
        status: httpStatus,
        message: errMsg
      } = Db(err),
      errorType = httpStatus === 403 ? "forbidden" : errKind === "http" || errKind === "other" ? "unknown" : errKind,
      serverFields = extractServerErrorFields(err),
      maxEntries,
      receivedEntries;
    if (httpStatus === 413 && nT(err)) {
      let parseResult = tYa().safeParse(err.response?.data);
      if (parseResult.success) maxEntries = parseResult.data.error.details.max_entries, receivedEntries = parseResult.data.error.details.received_entries;
    }
    return {
      success: false,
      error: errMsg,
      errorType: errorType,
      httpStatus: httpStatus,
      ...serverFields,
      ...(maxEntries !== undefined && {
        serverMaxEntries: maxEntries
      }),
      ...(receivedEntries !== undefined && {
        serverReceivedEntries: receivedEntries
      })
    };
  }
}
async function readLocalDiskEntries(scope, serverMaxEntries) {
  let tag = getScopeTag(scope),
    memRoot = getMemoryRootForScope(scope),
    entries = {},
    diskKeys = new Set(),
    skippedSecrets = [],
    diskTrusted = true;
  async function scanDir(dirPath) {
    try {
      let dirEntries = await fsPromises.readdir(dirPath, {
        withFileTypes: true
      });
      await Promise.all(dirEntries.map(async entry => {
        let fullPath = pathModule.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          let relPath = pathModule.relative(memRoot, fullPath).replaceAll("\\", "/");
          if (shouldSkipPath(scope, relPath)) return;
          await scanDir(fullPath);
        } else if (entry.isFile()) {
          if (entry.name.startsWith(".") || !(entry.name.endsWith(".md") || entry.name.endsWith(".txt"))) return;
          let relPath = pathModule.relative(memRoot, fullPath).replaceAll("\\", "/");
          if (shouldSkipPath(scope, relPath)) return;
          diskKeys.add(relPath);
          try {
            let stat = await fsPromises.stat(fullPath);
            if (stat.size > MAX_ENTRY_BYTES) {
              v(`${tag}: skipping oversized file ${entry.name} (${stat.size} > ${MAX_ENTRY_BYTES} bytes)`, {
                level: "info"
              });
              return;
            }
            let content = await fsPromises.readFile(fullPath, "utf8"),
              secretMatches = G_t(content);
            if (secretMatches.length > 0) {
              let firstMatch = secretMatches[0];
              skippedSecrets.push({
                path: relPath,
                ruleId: firstMatch.ruleId,
                label: firstMatch.label
              }), v(`${tag}: skipping "${relPath}" \u2014 detected ${firstMatch.label}`, {
                level: "warn"
              });
              return;
            }
            entries[relPath] = content;
          } catch {}
        }
      }));
    } catch (err) {
      let errCode = ln(err);
      if (errCode === "EACCES" || errCode === "EPERM") diskTrusted = false;
      if (errCode !== "ENOENT" && errCode !== "EACCES" && errCode !== "EPERM") throw err;
    }
  }
  if (await checkMemoryRootEscape(scope, memRoot, tag)) return {
    entries: {},
    diskKeys: new Set(),
    diskTrusted: false,
    skippedSecrets: skippedSecrets
  };
  await scanDir(memRoot);
  let sortedKeys = Object.keys(entries).sort();
  if (serverMaxEntries !== null && sortedKeys.length > serverMaxEntries) {
    let overflowKeys = sortedKeys.slice(serverMaxEntries);
    if (v(`${tag}: ${sortedKeys.length} local entries exceeds server cap of ${serverMaxEntries}; ${overflowKeys.length} file(s) will NOT sync: ${overflowKeys.join(", ")}. Consider consolidating or removing some memory files.`, {
      level: "warn"
    }), scope === "team") j("tengu_team_mem_entries_capped", {
      total_entries: sortedKeys.length,
      dropped_count: overflowKeys.length,
      max_entries: serverMaxEntries
    });
    let truncatedEntries = {};
    for (let key of sortedKeys.slice(0, serverMaxEntries)) truncatedEntries[key] = entries[key];
    return {
      entries: truncatedEntries,
      diskKeys: diskKeys,
      diskTrusted: diskTrusted,
      skippedSecrets: skippedSecrets
    };
  }
  return {
    entries: entries,
    diskKeys: diskKeys,
    diskTrusted: diskTrusted,
    skippedSecrets: skippedSecrets
  };
}
async function writeRemoteEntriesToDisk(scope, entries, serverChecksums) {
  let tag = getScopeTag(scope),
    writeOutcomes = await Promise.all(Object.entries(entries).map(async ([relPath, content]) => {
      let absPath;
      try {
        absPath = await getMemoryWritePath(scope, relPath);
      } catch (err) {
        if (err instanceof KS) return v(`${tag}: ${err.message}`, {
          level: "warn"
        }), {
          relPath: relPath,
          outcome: "failed"
        };
        throw err;
      }
      if (Buffer.byteLength(content, "utf8") > MAX_ENTRY_BYTES) return v(`${tag}: skipping oversized remote entry "${relPath}"`, {
        level: "info"
      }), {
        relPath: relPath,
        outcome: "failed"
      };
      try {
        let stat = await fsPromises.stat(absPath);
        if (stat.size > MAX_ENTRY_BYTES) {
          if (scope === "user") return v(`${tag}: keeping oversized local "${relPath}" (${stat.size} > ${MAX_ENTRY_BYTES} bytes) \u2014 pinned out of push delta this session (fail safe)`, {
            level: "warn"
          }), {
            relPath: relPath,
            outcome: "kept_divergent",
            unreadable: true
          };
        } else {
          let localContent = await fsPromises.readFile(absPath, "utf8");
          if (localContent === content) return {
            relPath: relPath,
            outcome: "matched"
          };
          if (scope === "user") {
            let serverChecksum = serverChecksums.get(relPath);
            if (!(serverChecksum !== undefined && computeSha256Checksum(localContent) === serverChecksum)) return v(`${tag}: keeping local "${relPath}" \u2014 not overwriting with server copy (unproven stale mirror; pinned out of push delta until locally edited)`, {
              level: "warn"
            }), {
              relPath: relPath,
              outcome: "kept_divergent",
              hashAtPull: computeSha256Checksum(localContent)
            };
          }
        }
      } catch (err) {
        let errCode = ln(err);
        if (scope === "user" && errCode !== undefined && errCode !== "ENOENT" && errCode !== "ENOTDIR") return v(`${tag}: keeping unreadable local "${relPath}" (${errCode}) \u2014 pinned out of push delta this session (fail safe)`, {
          level: "warn"
        }), {
          relPath: relPath,
          outcome: "kept_divergent",
          unreadable: true
        };
        if (errCode !== undefined && errCode !== "ENOENT" && errCode !== "ENOTDIR") v(`${tag}: unexpected read error for "${relPath}": ${errCode}`, {
          level: "debug"
        });
      }
      try {
        let parentDir = absPath.substring(0, absPath.lastIndexOf(pathModule.sep));
        return await fsPromises.mkdir(parentDir, {
          recursive: true
        }), await fsPromises.writeFile(absPath, content, "utf8"), {
          relPath: relPath,
          outcome: "written"
        };
      } catch (err) {
        return v(`${tag}: failed to write "${relPath}": ${err}`, {
          level: "warn"
        }), {
          relPath: relPath,
          outcome: "failed"
        };
      }
    })),
    filesWritten = Gn(writeOutcomes, o => o.outcome === "written"),
    unwrittenKeys = new Set(writeOutcomes.filter(o => o.outcome === "failed").map(o => o.relPath)),
    keptDivergentHashes = new Map(),
    keptUnreadable = new Set();
  for (let outcome of writeOutcomes) {
    if (outcome.outcome !== "kept_divergent") continue;
    if (outcome.unreadable) keptUnreadable.add(outcome.relPath);else if (outcome.hashAtPull !== undefined) keptDivergentHashes.set(outcome.relPath, outcome.hashAtPull);
  }
  return {
    filesWritten: filesWritten,
    unwrittenKeys: unwrittenKeys,
    keptDivergentHashes: keptDivergentHashes,
    keptUnreadable: keptUnreadable
  };
}
async function reapTombstonedFiles(syncState, tombstonedEntries) {
  let scope = syncState.scope,
    tag = getScopeTag(scope),
    entryKeys = Object.keys(tombstonedEntries);
  if (entryKeys.length === 0) return 0;
  let results = await Promise.all(entryKeys.map(async relPath => {
    let absPath;
    try {
      absPath = await getMemoryWritePath(scope, relPath);
    } catch {
      return false;
    }
    if (scope === "user") {
      let fileSize;
      try {
        fileSize = (await fsPromises.stat(absPath)).size;
      } catch (err) {
        if (ln(err) !== "ENOENT") v(`${tag}: cannot stat tombstoned "${relPath}" before reap: ${ln(err)}`, {
          level: "warn"
        });
        return false;
      }
      let priorHash = syncState.tombstonedPriorHashes.get(relPath);
      if (priorHash === undefined) return v(`${tag}: keeping unverifiable tombstoned "${relPath}" (no prior server hash) \u2014 not reaping`, {
        level: "debug"
      }), Bt(SCOPE_TELEMETRY_KEYS[scope].conflict, "unverified_tombstone_skip"), false;
      if (fileSize > MAX_ENTRY_BYTES) return v(`${tag}: keeping oversized tombstoned "${relPath}" (${fileSize} > ${MAX_ENTRY_BYTES} bytes) \u2014 not reaping`, {
        level: "warn"
      }), false;
      let fileContent;
      try {
        fileContent = await fsPromises.readFile(absPath, "utf8");
      } catch (err) {
        if (ln(err) !== "ENOENT") v(`${tag}: cannot read tombstoned "${relPath}" to verify before reap: ${ln(err)}`, {
          level: "warn"
        });
        return false;
      }
      if (computeSha256Checksum(fileContent) !== priorHash) return v(`${tag}: keeping locally-modified tombstoned "${relPath}" (diverged from server mirror) \u2014 not reaping`, {
        level: "warn"
      }), He(SCOPE_TELEMETRY_KEYS[scope].conflict), false;
    }
    try {
      return await fsPromises.unlink(absPath), true;
    } catch (err) {
      let errCode = ln(err);
      if (errCode !== "ENOENT") v(`${tag}: failed to reap tombstoned "${relPath}": ${errCode}`, {
        level: "warn"
      });
      return false;
    }
  }));
  return Gn(results, Boolean);
}
function shouldEnablePersonalMemorySync(e) {
  if (ta()) return false;
  if (!ii("allow_memory_sync")) return false;
  return isMemorySyncAvailable();
}
function shouldEnableTeamMemorySync() {
  if (!Ru()) return false;
  if (ta()) return false;
  if (!ii("allow_memory_sync")) return false;
  return ZT() !== null || isMemorySyncAvailable();
}
async function pullWithDedup(syncState, opts) {
  if (syncState.pullPromise) return syncState.pullPromise;
  let pullPromise = performPull(syncState, opts);
  syncState.pullPromise = pullPromise;
  try {
    return await pullPromise;
  } finally {
    syncState.pullPromise = null;
  }
}
async function performPull(syncState, opts) {
  let skipEtagCache = opts?.skipEtagCache ?? false,
    startTime = Date.now(),
    tag = getScopeTag(syncState.scope);
  if (!isMemorySyncAvailable()) return recordPullTelemetry(syncState.scope, startTime, {
    success: false,
    errorType: "no_oauth"
  }), {
    success: false,
    filesWritten: 0,
    filesReaped: 0,
    entryCount: 0,
    error: "OAuth not available"
  };
  if (await checkMemoryRootEscape(syncState.scope, getMemoryRootForScope(syncState.scope), tag)) return recordPullTelemetry(syncState.scope, startTime, {
    success: false,
    errorType: "aborted"
  }), {
    success: false,
    filesWritten: 0,
    filesReaped: 0,
    entryCount: 0,
    errorType: "aborted",
    error: "memory root escapes its canonical location \u2014 pull skipped (fail closed)"
  };
  let etagToUse = skipEtagCache ? null : syncState.lastKnownChecksum,
    fetchResult = await fetchMemoryWithRetries(syncState, etagToUse);
  if (!fetchResult.success) {
    if (syncState.scope === "team" && fetchResult.errorType === "forbidden") EWe("not-available");
    return recordPullTelemetry(syncState.scope, startTime, {
      success: false,
      errorType: fetchResult.errorType,
      status: fetchResult.httpStatus,
      serverMessage: fetchResult.serverMessage,
      serverErrorCode: fetchResult.serverErrorCode,
      serverErrorType: fetchResult.serverErrorType
    }), {
      success: false,
      filesWritten: 0,
      filesReaped: 0,
      entryCount: 0,
      error: fetchResult.error,
      errorType: fetchResult.errorType,
      ...(fetchResult.httpStatus !== undefined && {
        httpStatus: fetchResult.httpStatus
      })
    };
  }
  if (fetchResult.notModified) return syncState.pulled = true, recordPullTelemetry(syncState.scope, startTime, {
    success: true,
    notModified: true
  }), {
    success: true,
    filesWritten: 0,
    filesReaped: 0,
    entryCount: 0,
    notModified: true
  };
  if (fetchResult.isEmpty) {
    if (syncState.serverChecksums.clear(), syncState.tombstonedKeys.clear(), syncState.keptDivergentHashes.clear(), syncState.keptUnreadable.clear(), syncState.pulled = true, syncState.scope === "team") EWe(fetchResult.serverErrorCode === TEAM_MEMORY_FEATURE_UNAVAILABLE_CODE ? "not-available" : "empty");
    return recordPullTelemetry(syncState.scope, startTime, {
      success: true,
      serverErrorCode: fetchResult.serverErrorCode,
      serverMessage: fetchResult.serverMessage
    }), {
      success: true,
      filesWritten: 0,
      filesReaped: 0,
      entryCount: 0
    };
  }
  let remoteEntries = fetchResult.data.content.entries,
    remoteEntryChecksums = fetchResult.data.content.entryChecksums,
    remoteDeletedEntries = fetchResult.data.content.deletedEntries ?? {};
  syncState.tombstonedKeys = new Set(Object.keys(remoteDeletedEntries));
  let prevServerChecksums = new Map(syncState.serverChecksums);
  syncState.tombstonedPriorHashes = new Map();
  for (let relPath of syncState.tombstonedKeys) {
    let prevChecksum = prevServerChecksums.get(relPath);
    if (prevChecksum !== undefined) syncState.tombstonedPriorHashes.set(relPath, prevChecksum);
  }
  if (syncState.serverChecksums.clear(), remoteEntryChecksums) for (let [relPath, checksum] of Object.entries(remoteEntryChecksums)) syncState.serverChecksums.set(relPath, checksum);else v(`${tag}: server response missing entryChecksums (pre-#283027 deploy) \u2014 next push will be full, not delta`, {
    level: "debug"
  });
  let {
    filesWritten: filesWritten,
    unwrittenKeys: unwrittenKeys,
    keptDivergentHashes: keptDivergentHashes,
    keptUnreadable: keptUnreadable
  } = await writeRemoteEntriesToDisk(syncState.scope, remoteEntries, prevServerChecksums);
  syncState.keptDivergentHashes = keptDivergentHashes, syncState.keptUnreadable = keptUnreadable;
  let filesReaped = await reapTombstonedFiles(syncState, remoteDeletedEntries);
  if (filesWritten > 0 || filesReaped > 0) {
    let {
      clearMemoryFileCaches: clearMemoryFileCaches
    } = await Promise.resolve().then(() => (Ww(), LNi));
    clearMemoryFileCaches();
  }
  for (let relPath of unwrittenKeys) syncState.serverChecksums.delete(relPath);
  syncState.pulled = true;
  let entryCount = Object.keys(remoteEntries).length;
  if (syncState.scope === "team") EWe(entryCount > 0 ? "has-content" : "empty");
  return v(`${tag}: pulled ${filesWritten} files` + (filesReaped > 0 ? `, reaped ${filesReaped} tombstoned` : "") + (unwrittenKeys.size > 0 ? ` (${unwrittenKeys.size} entries skipped)` : ""), {
    level: "info"
  }), recordPullTelemetry(syncState.scope, startTime, {
    success: true,
    filesWritten: filesWritten,
    filesReaped: filesReaped
  }), {
    success: true,
    filesWritten: filesWritten,
    filesReaped: filesReaped,
    entryCount: entryCount
  };
}
async function performPush(syncState) {
  let startTime = Date.now(),
    tag = getScopeTag(syncState.scope),
    conflictRetries = 0;
  if (!isMemorySyncAvailable()) return recordPushTelemetry(syncState.scope, startTime, {
    success: false,
    errorType: "no_oauth"
  }), {
    success: false,
    filesUploaded: 0,
    error: "OAuth not available",
    errorType: "no_oauth"
  };
  if (syncState.scope === "team" && Sgt() === "not-available") return v(`${tag}: push skipped: server marked not-available`, {
    level: "debug"
  }), recordPushTelemetry(syncState.scope, startTime, {
    success: false,
    errorType: "server_unavailable"
  }), {
    success: false,
    filesUploaded: 0,
    error: "Team memory server marked not-available",
    errorType: "server_unavailable"
  };
  if (syncState.scope === "user" && !syncState.pulled) {
    let initialPullResult = await pullWithDedup(syncState, {
      skipEtagCache: true
    });
    if (!initialPullResult.success) {
      let resolvedErrorType = initialPullResult.errorType === "parse" ? "unknown" : initialPullResult.errorType ?? "network";
      return v(`${tag}: deferring push \u2014 no pull basis yet (initial pull not completed: ${initialPullResult.error}, type=${resolvedErrorType})`, {
        level: "warn"
      }), recordPushTelemetry(syncState.scope, startTime, {
        success: false,
        errorType: resolvedErrorType,
        status: initialPullResult.httpStatus
      }), {
        success: false,
        filesUploaded: 0,
        error: "initial pull not completed \u2014 deferring push to avoid blind overwrite",
        errorType: resolvedErrorType,
        ...(initialPullResult.httpStatus !== undefined && {
          httpStatus: initialPullResult.httpStatus
        })
      };
    }
  }
  let localDisk = await readLocalDiskEntries(syncState.scope, syncState.serverMaxEntries),
    localEntries = localDisk.entries,
    diskKeys = localDisk.diskKeys,
    diskTrusted = localDisk.diskTrusted,
    skippedSecrets = localDisk.skippedSecrets,
    softDeleteCandidates = [];
  if (syncState.pulled && diskTrusted) {
    for (let key of syncState.serverChecksums.keys()) if (!diskKeys.has(key) && !syncState.keptUnreadable.has(key) && !syncState.keptDivergentHashes.has(key)) softDeleteCandidates.push(key);
  } else if (syncState.pulled && !diskTrusted) v(`${tag}: dir inaccessible \u2014 suppressing soft-delete`, {
    level: "warn"
  });
  if (skippedSecrets.length > 0) {
    let secretPaths = skippedSecrets.map(s => `"${s.path}" (${s.label})`).join(", ");
    if (v(`${tag}: ${skippedSecrets.length} file(s) skipped due to detected secrets: ${secretPaths}. Remove the secret(s) to enable sync for these files.`, {
      level: "warn"
    }), syncState.scope === "team") j("tengu_team_mem_secret_skipped", {
      file_count: skippedSecrets.length,
      rule_ids: skippedSecrets.map(s => s.ruleId).join(",")
    });else Bt(SCOPE_TELEMETRY_KEYS[syncState.scope].conflict, "personal_memory_secret_skipped");
  }
  let localChecksums = new Map();
  for (let [relPath, content] of Object.entries(localEntries)) {
    let contentChecksum = computeSha256Checksum(content);
    if (syncState.tombstonedKeys.has(relPath)) {
      let priorHash = syncState.tombstonedPriorHashes.get(relPath);
      if (syncState.scope !== "user" || priorHash === undefined || priorHash === contentChecksum) {
        if (syncState.scope === "user" && priorHash === undefined) Bt(SCOPE_TELEMETRY_KEYS[syncState.scope].conflict, "unverified_tombstone_drop");
        continue;
      }
    }
    localChecksums.set(relPath, contentChecksum);
  }
  let hadConflict = false,
    filesUploaded = 0,
    filesSoftDeleted = 0;
  for (let retryIndex = 0; retryIndex <= MAX_CONFLICT_RETRIES; retryIndex++) {
    let deltaEntries = {};
    for (let [relPath, checksum] of localChecksums) {
      if (syncState.keptDivergentHashes.get(relPath) === checksum) continue;
      if (syncState.keptUnreadable.has(relPath)) continue;
      if (syncState.serverChecksums.get(relPath) !== checksum) deltaEntries[relPath] = localEntries[relPath];
    }
    if (Object.keys(deltaEntries).length === 0 && softDeleteCandidates.length === 0) {
      if (!diskTrusted) Bt(SCOPE_TELEMETRY_KEYS[syncState.scope].conflict, "root_escape");
      return recordPushTelemetry(syncState.scope, startTime, {
        success: true,
        filesUploaded: filesUploaded,
        ...(filesSoftDeleted > 0 && {
          filesSoftDeleted: filesSoftDeleted
        }),
        conflict: hadConflict,
        conflictRetries: conflictRetries
      }), {
        success: true,
        filesUploaded: filesUploaded,
        ...(filesSoftDeleted > 0 && {
          filesSoftDeleted: filesSoftDeleted
        }),
        ...(skippedSecrets.length > 0 && {
          skippedSecrets: skippedSecrets
        })
      };
    }
    let batches = splitIntoBatches(deltaEntries);
    if (batches.length === 0) batches.push({});
    let lastUploadResult;
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      if (syncState.aborted || syncState.scope === "user" && !pot()) return v(`${tag}: push aborted mid-flight (personal sync disabled) after ${batchIndex}/${batches.length} batch(es)`, {
        level: "warn"
      }), recordPushTelemetry(syncState.scope, startTime, {
        success: false,
        filesUploaded: filesUploaded,
        errorType: "aborted"
      }), {
        success: false,
        filesUploaded: filesUploaded,
        error: "push aborted \u2014 personal sync disabled mid-flight",
        errorType: "aborted"
      };
      let batchEntries = batches[batchIndex],
        batchSoftDeletes = batchIndex === 0 ? softDeleteCandidates : [];
      if (lastUploadResult = await uploadEntries(syncState, batchEntries, syncState.lastKnownChecksum, batchSoftDeletes), !lastUploadResult.success) break;
      for (let relPath of Object.keys(batchEntries)) syncState.serverChecksums.set(relPath, localChecksums.get(relPath)), syncState.keptDivergentHashes.delete(relPath), syncState.keptUnreadable.delete(relPath);
      if (filesUploaded += Object.keys(batchEntries).length, batchSoftDeletes.length > 0) {
        for (let relPath of batchSoftDeletes) syncState.serverChecksums.delete(relPath);
        filesSoftDeleted += batchSoftDeletes.length, softDeleteCandidates.length = 0;
      }
    }
    if (lastUploadResult = lastUploadResult, lastUploadResult.success) {
      if (syncState.scope === "team" && localChecksums.size > 0) EWe("has-content");
      let uploadSummary = filesSoftDeleted > 0 ? `${filesUploaded} of ${localChecksums.size} files, soft-deleted ${filesSoftDeleted}` : `${filesUploaded} of ${localChecksums.size} files`;
      return v(batches.length > 1 ? `${tag}: pushed ${uploadSummary} in ${batches.length} batches` : `${tag}: pushed ${uploadSummary} (delta)`, {
        level: "info"
      }), recordPushTelemetry(syncState.scope, startTime, {
        success: true,
        filesUploaded: filesUploaded,
        ...(filesSoftDeleted > 0 && {
          filesSoftDeleted: filesSoftDeleted
        }),
        conflict: hadConflict,
        conflictRetries: conflictRetries,
        putBatches: batches.length > 1 ? batches.length : undefined
      }), {
        success: true,
        filesUploaded: filesUploaded,
        ...(filesSoftDeleted > 0 && {
          filesSoftDeleted: filesSoftDeleted
        }),
        checksum: lastUploadResult.checksum,
        ...(skippedSecrets.length > 0 && {
          skippedSecrets: skippedSecrets
        })
      };
    }
    if (!lastUploadResult.conflict) {
      if (lastUploadResult.serverMaxEntries !== undefined) syncState.serverMaxEntries = lastUploadResult.serverMaxEntries, v(`${tag}: learned server max_entries=${lastUploadResult.serverMaxEntries} from 413; next push will truncate to this`, {
        level: "warn"
      });
      return recordPushTelemetry(syncState.scope, startTime, {
        success: false,
        filesUploaded: filesUploaded,
        ...(filesSoftDeleted > 0 && {
          filesSoftDeleted: filesSoftDeleted
        }),
        conflictRetries: conflictRetries,
        putBatches: batches.length > 1 ? batches.length : undefined,
        errorType: lastUploadResult.errorType,
        status: lastUploadResult.httpStatus,
        errorCode: lastUploadResult.serverErrorCode,
        serverMaxEntries: lastUploadResult.serverMaxEntries,
        serverReceivedEntries: lastUploadResult.serverReceivedEntries,
        serverMessage: lastUploadResult.serverMessage,
        serverErrorCode: lastUploadResult.serverErrorCode,
        serverErrorType: lastUploadResult.serverErrorType
      }), {
        success: false,
        filesUploaded: filesUploaded,
        ...(filesSoftDeleted > 0 && {
          filesSoftDeleted: filesSoftDeleted
        }),
        error: lastUploadResult.error,
        errorType: lastUploadResult.errorType,
        httpStatus: lastUploadResult.httpStatus,
        serverMessage: lastUploadResult.serverMessage,
        serverErrorCode: lastUploadResult.serverErrorCode,
        serverErrorType: lastUploadResult.serverErrorType
      };
    }
    if (hadConflict = true, retryIndex >= MAX_CONFLICT_RETRIES) return v(`${tag}: giving up after ${MAX_CONFLICT_RETRIES} conflict retries`, {
      level: "warn"
    }), recordPushTelemetry(syncState.scope, startTime, {
      success: false,
      filesUploaded: filesUploaded,
      ...(filesSoftDeleted > 0 && {
        filesSoftDeleted: filesSoftDeleted
      }),
      conflict: true,
      conflictRetries: conflictRetries,
      errorType: "conflict"
    }), {
      success: false,
      filesUploaded: filesUploaded,
      ...(filesSoftDeleted > 0 && {
        filesSoftDeleted: filesSoftDeleted
      }),
      conflict: true,
      error: "Conflict resolution failed after retries"
    };
    conflictRetries++, v(`${tag}: conflict (412), probing server hashes (attempt ${retryIndex + 1}/${MAX_CONFLICT_RETRIES})`, {
      level: "info"
    });
    let hashesResult = await fetchEntryChecksums(syncState);
    if (!hashesResult.success) {
      let resolvedErrorType = hashesResult.errorType === "parse" ? undefined : hashesResult.errorType;
      return recordPushTelemetry(syncState.scope, startTime, {
        success: false,
        filesUploaded: filesUploaded,
        ...(filesSoftDeleted > 0 && {
          filesSoftDeleted: filesSoftDeleted
        }),
        conflict: true,
        conflictRetries: conflictRetries,
        errorType: resolvedErrorType ?? "conflict",
        status: hashesResult.httpStatus,
        serverMessage: hashesResult.serverMessage,
        serverErrorCode: hashesResult.serverErrorCode,
        serverErrorType: hashesResult.serverErrorType
      }), {
        success: false,
        filesUploaded: filesUploaded,
        ...(filesSoftDeleted > 0 && {
          filesSoftDeleted: filesSoftDeleted
        }),
        conflict: true,
        error: `Conflict resolution hashes probe failed: ${hashesResult.error}`,
        ...(resolvedErrorType !== undefined && {
          errorType: resolvedErrorType
        }),
        ...(hashesResult.httpStatus !== undefined && {
          httpStatus: hashesResult.httpStatus
        }),
        ...(hashesResult.serverMessage !== undefined && {
          serverMessage: hashesResult.serverMessage
        }),
        ...(hashesResult.serverErrorCode !== undefined && {
          serverErrorCode: hashesResult.serverErrorCode
        }),
        ...(hashesResult.serverErrorType !== undefined && {
          serverErrorType: hashesResult.serverErrorType
        })
      };
    }
    let prevServerKeys = new Set(syncState.serverChecksums.keys()),
      prevServerChecksumsSnapshot = new Map(syncState.serverChecksums);
    syncState.serverChecksums.clear();
    for (let [relPath, checksum] of Object.entries(hashesResult.entryChecksums)) if (prevServerKeys.has(relPath) || diskKeys.has(relPath)) syncState.serverChecksums.set(relPath, checksum);
    if (syncState.scope === "user") {
      let divergentCount = 0;
      for (let [relPath, localChecksum] of localChecksums) {
        let prevServerChecksum = prevServerChecksumsSnapshot.get(relPath);
        if (prevServerChecksum === undefined) continue;
        if (hashesResult.entryChecksums[relPath] !== prevServerChecksum && localChecksum === prevServerChecksum) syncState.keptDivergentHashes.set(relPath, localChecksum), divergentCount++;
      }
      if (divergentCount > 0) Bt(SCOPE_TELEMETRY_KEYS[syncState.scope].conflict, "conflict_probe_kept_divergent");
    }
    if (softDeleteCandidates.length > 0) {
      let validSoftDeletes = softDeleteCandidates.filter(relPath => {
        let serverChecksum = hashesResult.entryChecksums[relPath];
        if (serverChecksum === undefined) return true;
        return serverChecksum === prevServerChecksumsSnapshot.get(relPath);
      });
      if (validSoftDeletes.length !== softDeleteCandidates.length) {
        let validSet = new Set(validSoftDeletes),
          staleSoftDeletes = softDeleteCandidates.filter(relPath => !validSet.has(relPath));
        v(`${tag}: dropping ${staleSoftDeletes.length} stale soft-delete(s) \u2014 concurrently re-created/modified server-side`, {
          level: "warn"
        });
        for (let relPath of staleSoftDeletes) syncState.serverChecksums.delete(relPath);
      }
      softDeleteCandidates.length = 0, softDeleteCandidates.push(...validSoftDeletes);
    }
    for (let relPath of Object.keys(hashesResult.deletedEntries ?? {})) {
      syncState.tombstonedKeys.add(relPath);
      let prevChecksum = prevServerChecksumsSnapshot.get(relPath);
      if (prevChecksum !== undefined) syncState.tombstonedPriorHashes.set(relPath, prevChecksum);
      if (syncState.scope !== "user") {
        localChecksums.delete(relPath);
        continue;
      }
      let localChecksum = localChecksums.get(relPath);
      if (localChecksum === undefined) continue;
      if (prevChecksum !== undefined && localChecksum === prevChecksum) localChecksums.delete(relPath);else if (prevChecksum !== undefined) ;else localChecksums.delete(relPath), Bt(SCOPE_TELEMETRY_KEYS[syncState.scope].conflict, "unverified_tombstone_drop");
    }
  }
  return recordPushTelemetry(syncState.scope, startTime, {
    success: false,
    filesUploaded: filesUploaded,
    ...(filesSoftDeleted > 0 && {
      filesSoftDeleted: filesSoftDeleted
    }),
    conflictRetries: conflictRetries
  }), {
    success: false,
    filesUploaded: filesUploaded,
    ...(filesSoftDeleted > 0 && {
      filesSoftDeleted: filesSoftDeleted
    }),
    error: "Unexpected end of conflict resolution loop"
  };
}
function recordPullTelemetry(scope, startTime, result) {
  let pullKey = SCOPE_TELEMETRY_KEYS[scope].pull,
    memType = scope === "team" ? "team_memory" : "personal_memory";
  if (result.success) He(pullKey);else switch (result.errorType) {
    case "no_oauth":
    case "auth":
    case "forbidden":
    case "timeout":
    case "network":
    case "aborted":
      Bt(pullKey, `${memType}_pull_${result.errorType}`);
      break;
    case "parse":
      Pe(pullKey, `${memType}_pull_parse`);
      break;
    default:
      Pe(pullKey, `${memType}_pull_unknown`);
  }
  if (scope !== "team") return;
  j("tengu_team_mem_sync_pull", {
    success: result.success,
    files_written: result.filesWritten ?? 0,
    not_modified: result.notModified ?? false,
    duration_ms: Date.now() - startTime,
    ...(result.filesReaped && {
      files_reaped: result.filesReaped
    }),
    ...(result.errorType && {
      errorType: result.errorType
    }),
    ...(result.status && {
      status: result.status
    }),
    ...(result.serverMessage !== undefined && {
      server_message: result.serverMessage
    }),
    ...(result.serverErrorCode !== undefined && {
      server_error_code: result.serverErrorCode
    }),
    ...(result.serverErrorType !== undefined && {
      server_error_type: result.serverErrorType
    })
  });
}
function recordPushTelemetry(scope, startTime, result) {
  let pushKey = SCOPE_TELEMETRY_KEYS[scope].push,
    conflictKey = SCOPE_TELEMETRY_KEYS[scope].conflict,
    memType = scope === "team" ? "team_memory" : "personal_memory";
  if (result.success) {
    if (He(pushKey), result.conflict) He(conflictKey);
  } else switch (result.errorType) {
    case "no_oauth":
      Bt(pushKey, `${memType}_push_no_oauth`);
      break;
    case "auth":
      Pe(pushKey, `${memType}_push_auth`);
      break;
    case "forbidden":
      Bt(pushKey, `${memType}_push_forbidden`);
      break;
    case "timeout":
      Pe(pushKey, `${memType}_push_timeout`);
      break;
    case "network":
      Pe(pushKey, `${memType}_push_network`);
      break;
    case "aborted":
      Bt(pushKey, `${memType}_push_aborted`);
      break;
    case "server_unavailable":
      Bt(pushKey, `${memType}_push_server_unavailable`);
      break;
    case "conflict":
      Pe(pushKey, `${memType}_push_conflict_exhausted`), Pe(conflictKey, `${memType}_conflict_exhausted`);
      break;
    default:
      Pe(pushKey, `${memType}_push_unknown`);
  }
  if (scope !== "team") return;
  j("tengu_team_mem_sync_push", {
    success: result.success,
    files_uploaded: result.filesUploaded ?? 0,
    conflict: result.conflict ?? false,
    conflict_retries: result.conflictRetries ?? 0,
    duration_ms: Date.now() - startTime,
    ...(result.filesSoftDeleted && {
      files_soft_deleted: result.filesSoftDeleted
    }),
    ...(result.errorType && {
      errorType: result.errorType
    }),
    ...(result.status && {
      status: result.status
    }),
    ...(result.putBatches && {
      put_batches: result.putBatches
    }),
    ...(result.errorCode && {
      error_code: result.errorCode
    }),
    ...(result.serverMaxEntries !== undefined && {
      server_max_entries: result.serverMaxEntries
    }),
    ...(result.serverReceivedEntries !== undefined && {
      server_received_entries: result.serverReceivedEntries
    }),
    ...(result.serverErrorCode !== undefined && {
      server_error_code: result.serverErrorCode
    }),
    ...(result.serverMessage !== undefined && {
      server_message: result.serverMessage
    }),
    ...(result.serverErrorType !== undefined && {
      server_error_type: result.serverErrorType
    })
  });
}
var cryptoModule,
  fsPromises,
  pathModule,
  FETCH_TIMEOUT_MS = 30000,
  MAX_ENTRY_BYTES = 250000,
  MAX_BATCH_BYTES = 200000,
  MAX_FETCH_RETRIES = 3,
  MAX_CONFLICT_RETRIES = 2,
  SCOPE_TELEMETRY_KEYS,
  MAX_SERVER_ERROR_STRING_LENGTH = 256,
  TEAM_MEMORY_FEATURE_UNAVAILABLE_CODE = "team_memory_feature_unavailable";
var lQK = b(() => {
  ct();
  Hc();
  iA();
  QMt();
  OO();
  mo();
  je();
  St();
  si();
  hp();
  QC();
  T1();
  Xt();
  cn();
  Ct();
  f9e();
  Xx();
  dT();
  sd();
  rYa();
  cryptoModule = require("crypto"), fsPromises = require("fs/promises"), pathModule = require("path");
  SCOPE_TELEMETRY_KEYS = {
    team: {
      pull: "team_memory_sync_pull",
      push: "team_memory_sync_push",
      conflict: "team_memory_sync_conflict"
    },
    user: {
      pull: "personal_memory_sync_pull",
      push: "personal_memory_sync_push",
      conflict: "personal_memory_sync_conflict"
    }
  };
});

export {buildMemorySyncApiUrl as nAo,getMemoryRootForScope as OJa,checkMemoryRootEscape as LJa,getMemoryWritePath as MJa,shouldSkipPath as IJa,getScopeTag as b0e,createSyncState as rAo,computeSha256Checksum as iqn,isMemorySyncAvailable as aqn,truncateToMaxLength as eAo,extractServerErrorFields as oAo,parseServerErrorData as NJa,fetchMemoryOnce as KFp,fetchEntryChecksums as zFp,fetchMemoryWithRetries as YFp,splitIntoBatches as JFp,uploadEntries as XFp,readLocalDiskEntries as QFp,writeRemoteEntriesToDisk as ZFp,reapTombstonedFiles as eUp,shouldEnablePersonalMemorySync as sAo,shouldEnableTeamMemorySync as lqn,pullWithDedup as iAo,performPull as tUp,performPush as aAo,recordPullTelemetry as Udt,recordPushTelemetry as Vce,cryptoModule as PJa,fsPromises as wU,pathModule as D6e,FETCH_TIMEOUT_MS as tAo,MAX_ENTRY_BYTES as I6e,MAX_BATCH_BYTES as VFp,MAX_FETCH_RETRIES as Zfo,MAX_CONFLICT_RETRIES as sqn,SCOPE_TELEMETRY_KEYS as Kce,MAX_SERVER_ERROR_STRING_LENGTH as DJa,TEAM_MEMORY_FEATURE_UNAVAILABLE_CODE as nUp,lQK as BJa};
