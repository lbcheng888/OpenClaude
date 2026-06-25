// @ts-nocheck
import {g1e as oMe,Xze as LVe} from "../../vendor/m574.ts";
import {Hge as nhe,Y1t as JOt} from "../api/3029_expanded.ts";
import {externalHttp as Ob,_k as Xx} from "../core/0576_isCancel.ts";
import {iUn as H1n,Oao as Xto} from "../../vendor/m3769.ts";
import {logForDebugging as v,qe as je} from "./0236_setHasFormattedOutput.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Pt as Bt,He,xe as Pe,mn as cn} from "../telemetry/0600_feature_name.ts";
import {A8 as G8,vu as od} from "../mcp/2200_mcpServerName.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {isCancel as cB,isAxiosError as nT} from "../../vendor/m573.ts";
import {mo as _o,Ct as St} from "../../vendor/m197.ts";
import {sleep as Fn} from "../telemetry/1488_withTimeout.ts";
import {Wt as jt,ps as bs} from "../../vendor/m230.ts";
import {ite as tte,SUn as G1n,Xao as fno} from "./3778_level.ts";
import {b} from "../../runtime.ts";
import {Ii as oa} from "../../vendor/m690.ts";
import {tn as Xt} from "./0230_encoding.ts";
// @ts-nocheck
function makeHttpGet(url, options) {
  return oMe(url) ? nhe.get(url, options) : Ob.get(url, options);
}
async function fetchVersionFromRepo(channel = "latest", baseUrl, extraConfig) {
  let startTime = Date.now(),
    attemptCount = 0;
  try {
    let response = await H1n($signal => (attemptCount++, makeHttpGet(`${baseUrl}/${channel}`, {
        timeout: VERSION_CHECK_TIMEOUT_MS,
        responseType: "text",
        signal: $signal,
        ...extraConfig
      })), {
        attempts: VERSION_CHECK_MAX_RETRIES,
        timeoutMs: VERSION_CHECK_TIMEOUT_MS,
        onRetry: ($attempt, $err) => {
          v(`Version check failed on attempt ${$attempt}/${VERSION_CHECK_MAX_RETRIES}, retrying: ${$err instanceof Error ? $err.message : String($err)}`);
        }
      }),
      latencyMs = Date.now() - startTime;
    if (j("tengu_version_check_success", {
      latency_ms: latencyMs,
      attempt: attemptCount
    }), attemptCount > 1) Bt("update_check", "update_check_binary_repo_retry");else He("update_check");
    return response.data.trim();
  } catch (err) {
    let latencyMs = Date.now() - startTime,
      errMsg = err instanceof Error ? err.message : String(err),
      httpStatus = extractHttpStatus(err);
    Pe("update_check", "update_check_binary_repo_failed"), j("tengu_version_check_failure", {
      latency_ms: latencyMs,
      http_status: httpStatus,
      is_timeout: isTimeoutError(err),
      attempt: attemptCount,
      platform: G8(getPlatformSafe()),
      channel: Ue(channel)
    });
    let w = Error(`Failed to fetch version from ${baseUrl}/${channel} after ${attemptCount} attempt(s): ${errMsg}`);
    throw v(`Failed to fetch version from ${baseUrl}/${channel} after ${attemptCount} attempt(s): ${errMsg}`, {
      level: "error"
    }), w;
  }
}
async function resolveVersionOrChannel(versionOrChannel) {
  if (/^v?\d+\.\d+\.\d+(-\S+)?$/.test(versionOrChannel)) {
    let normalizedVersion = versionOrChannel.startsWith("v") ? versionOrChannel.slice(1) : versionOrChannel;
    if (/^99\.99\./.test(normalizedVersion)) throw Error(`Version ${normalizedVersion} is not available for installation. Use 'stable' or 'latest'.`);
    return normalizedVersion;
  }
  let channel = versionOrChannel;
  if (channel !== "stable" && channel !== "latest" && channel !== "rc") throw Error(`Invalid channel: ${versionOrChannel}. Use 'latest' or 'stable'`);
  if (channel === "rc") throw Error(`Invalid channel: ${versionOrChannel}. Use 'stable' or 'latest'`);
  return fetchVersionFromRepo(channel, DOWNLOADS_BASE_URL);
}
function getStallTimeoutMs() {
  return Number(process.env.CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING) || DEFAULT_STALL_TIMEOUT_MS;
}
async function downloadBinaryWithChecksumVerify(url, expectedChecksum, destPath, extraConfig = {}) {
  let lastError,
    hadChecksumMismatch = false;
  for (let retryIndex = 1; retryIndex <= DOWNLOAD_MAX_RETRIES; retryIndex++) {
    let abortCtrl = new AbortController(),
      stallTimer,
      clearStallTimer = () => {
        if (stallTimer) clearTimeout(stallTimer), stallTimer = undefined;
      },
      resetStallTimer = () => {
        clearStallTimer(), stallTimer = setTimeout(ctrl => ctrl.abort(), getStallTimeoutMs(), abortCtrl);
      };
    try {
      resetStallTimer();
      let response = await makeHttpGet(url, {
        timeout: DOWNLOAD_REQUEST_TIMEOUT_MS,
        responseType: "arraybuffer",
        signal: abortCtrl.signal,
        onDownloadProgress: () => {
          resetStallTimer();
        },
        ...extraConfig
      });
      clearStallTimer();
      let dataBuffer = Buffer.isBuffer(response.data) ? response.data : Buffer.from(response.data),
        hasher = jXK.createHash("sha256");
      hasher.update(dataBuffer);
      let computedHash = hasher.digest("hex");
      if (computedHash !== expectedChecksum) throw Error(`Checksum mismatch: expected ${expectedChecksum}, got ${computedHash}`);
      return await fv6.writeFile(destPath, dataBuffer), await fv6.chmod(destPath, 493), hadChecksumMismatch;
    } catch (err) {
      clearStallTimer();
      let wasCancelled = cB(err),
        isChecksumMismatch = err instanceof Error && err.message.includes("Checksum mismatch"),
        wrappedError = wasCancelled ? new StallTimeoutError() : _o(err);
      if (lastError = wrappedError, (wasCancelled || isChecksumMismatch) && retryIndex < DOWNLOAD_MAX_RETRIES) {
        if (isChecksumMismatch) hadChecksumMismatch = true;
        v(`Download ${isChecksumMismatch ? "checksum mismatch" : "stalled"} on attempt ${retryIndex}/${DOWNLOAD_MAX_RETRIES}, retrying...`), await Fn(1000);
        continue;
      }
      throw Object.assign(wrappedError, {
        attempt: retryIndex
      });
    }
  }
  throw lastError ?? Error("Download failed after all retries");
}
async function downloadNativeBinaryVersion(version, stagingPath, baseUrl, extraConfig) {
  let fsProm = jt();
  await fsProm.rm(stagingPath, {
    recursive: true,
    force: true
  });
  let platform = tte(),
    startTime = Date.now();
  j("tengu_binary_download_attempt", {});
  let manifest;
  try {
    manifest = (await makeHttpGet(`${baseUrl}/${version}/manifest.json`, {
      timeout: 1e4,
      responseType: "json",
      ...extraConfig
    })).data;
  } catch (err) {
    let latencyMs = Date.now() - startTime,
      errMsg = err instanceof Error ? err.message : String(err);
    throw Pe("update_download", "update_download_manifest_failed"), j("tengu_binary_manifest_fetch_failure", {
      latency_ms: latencyMs,
      http_status: extractHttpStatus(err),
      is_timeout: isTimeoutError(err),
      platform: G8(platform)
    }), v(`Failed to fetch manifest from ${baseUrl}/${version}/manifest.json: ${errMsg}`, {
      level: "error"
    }), err;
  }
  let platformEntry = manifest.platforms[platform];
  if (!platformEntry) throw Pe("update_download", "update_download_platform_not_found"), j("tengu_binary_platform_not_found", {}), Error(`Native binaries for ${platform} are not available on this release channel (version ${version} ships: ${Object.keys(manifest.platforms).sort().join(", ")}).`);
  let checksum = platformEntry.checksum,
    binaryFilename = G1n(platform),
    downloadUrl = `${baseUrl}/${version}/${platform}/${binaryFilename}`;
  await fsProm.mkdir(stagingPath);
  let localBinaryPath = JXK.join(stagingPath, binaryFilename);
  try {
    let hadChecksumRetry = await downloadBinaryWithChecksumVerify(downloadUrl, checksum, localBinaryPath, extraConfig || {}),
      latencyMs = Date.now() - startTime;
    if (hadChecksumRetry) Bt("update_download", "update_download_checksum_retry");else He("update_download");
    j("tengu_binary_download_success", {
      latency_ms: latencyMs
    });
  } catch (err) {
    let latencyMs = Date.now() - startTime,
      errMsg = err instanceof Error ? err.message : String(err),
      isChecksumMismatch = errMsg.includes("Checksum mismatch");
    if (isChecksumMismatch) Pe("update_download", "update_download_checksum_mismatch");else if (err instanceof StallTimeoutError) Pe("update_download", "update_download_stall_timeout");else Pe("update_download", "update_download_binary_failed");
    throw j("tengu_binary_download_failure", {
      latency_ms: latencyMs,
      http_status: extractHttpStatus(err),
      is_timeout: isTimeoutError(err),
      is_checksum_mismatch: isChecksumMismatch,
      attempt: getAttemptNumber(err),
      platform: G8(platform)
    }), v(`Failed to download binary from ${downloadUrl}: ${errMsg}`, {
      level: "error"
    }), err;
  }
}
async function downloadNativeBinaryInstall(version, stagingPath) {
  return await downloadNativeBinaryVersion(version, stagingPath, DOWNLOADS_BASE_URL), "binary";
}
function extractHttpStatus(err) {
  if (nT(err) && err.response) return err.response.status;
  return;
}
function isTimeoutError(err) {
  if (err instanceof StallTimeoutError) return true;
  if (cB(err)) return true;
  if (nT(err) && (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT")) return true;
  if (err !== null && typeof err === "object" && "code" in err && err.code === "ETIMEDOUT") return true;
  let msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  return msg.includes("timeout") || msg.includes("timed out");
}
function getAttemptNumber(err) {
  if (err !== null && typeof err === "object" && "attempt" in err && typeof err.attempt === "number") return err.attempt;
  return;
}
function getPlatformSafe() {
  try {
    return tte();
  } catch {
    return "unknown";
  }
}
var jXK,
  fv6,
  JXK,
  DOWNLOADS_BASE_URL = "https://downloads.claude.ai/claude-code-releases",
  VERSION_CHECK_TIMEOUT_MS = 30000,
  VERSION_CHECK_MAX_RETRIES = 3,
  DEFAULT_STALL_TIMEOUT_MS = 120000,
  DOWNLOAD_MAX_RETRIES = 3,
  DOWNLOAD_REQUEST_TIMEOUT_MS = 600000,
  StallTimeoutError;
var b_q = b(() => {
  cn();
  Ct();
  od();
  JOt();
  Xx();
  LVe();
  je();
  St();
  oa();
  bs();
  Xt();
  fno();
  Xto();
  jXK = require("crypto"), fv6 = require("fs/promises"), JXK = require("path");
  StallTimeoutError = class StallTimeoutError extends Error {
    constructor() {
      super("Download stalled: no data received for 120 seconds");
      this.name = "StallTimeoutError";
    }
  };
});
export {makeHttpGet as Yao,fetchVersionFromRepo as aEp,resolveVersionOrChannel as _$t,getStallTimeoutMs as uEp,downloadBinaryWithChecksumVerify as dEp,downloadNativeBinaryVersion as pEp,downloadNativeBinaryInstall as gPa,extractHttpStatus as zao,isTimeoutError as jao,getAttemptNumber as mEp,getPlatformSafe as fEp,jXK as mPa,fv6 as yUn,JXK as fPa,DOWNLOADS_BASE_URL as hPa,VERSION_CHECK_TIMEOUT_MS as dPa,VERSION_CHECK_MAX_RETRIES as pPa,DEFAULT_STALL_TIMEOUT_MS as lEp,DOWNLOAD_MAX_RETRIES as Kao,DOWNLOAD_REQUEST_TIMEOUT_MS as cEp,StallTimeoutError as TUn,b_q as Jao};
