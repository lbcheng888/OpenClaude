// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getCachePath as eve,setSessionCache as Wfe,isPolicyLimitsEligible as K3,loadCachedResponse as uDt,getSessionCache as lDt,getPolicyLimitsIneligibleReason as cDt,getResponseFromCache as X7,Bu} from "../../vendor/m2213.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {getAnthropicApiKeyWithSource as Yg,shouldUseWIFAuth as dE,isClaudeAISubscriber as Eo,getClaudeAIOAuthTokens as qs,checkAndRefreshOAuthTokenIfNeededWithOutcome as Gyn,getAuthTokenSource as Ak,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {qj,Q3e} from "../api/5225_model.ts";
import {sleep as Kn} from "./1488_withTimeout.ts";
import {getAuthHeadersAsync as cxt,kk} from "../api/2037_withOAuth401Retry.ts";
import {Fg,Le,Bo} from "../../vendor/m5.ts";
import {ho} from "../../vendor/m572.ts";
import {C$r,kbn,A$r} from "../../vendor/m2212.ts";
import {Fb,cn,Ct} from "../../vendor/m197.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Pt,xe,He,mn} from "./0600_feature_name.ts";
import {Hbn} from "../../vendor/m2214.ts";
import {Si,ud} from "../../vendor/m134.ts";
import {ap} from "../../vendor/m573.ts";
import {Bto} from "../../vendor/m3344.ts";
// @ts-nocheck
var $Bt = {};
ft($Bt, {
  waitForPolicyLimitsToLoad: () => waitForPolicyLimitsToLoad,
  stopBackgroundPolling: () => stopBackgroundPolling,
  startBackgroundPolling: () => startBackgroundPolling,
  shouldAwaitPolicyLimitsOnStartup: () => shouldAwaitPolicyLimitsOnStartup,
  refreshPolicyLimits: () => refreshPolicyLimits,
  recordPolicyLimitsStartupAwaitResult: () => recordPolicyLimitsStartupAwaitResult,
  logPolicyLimitsCacheStateAtFirstPrompt: () => logPolicyLimitsCacheStateAtFirstPrompt,
  loadPolicyLimits: () => loadPolicyLimits,
  initializePolicyLimitsLoadingPromise: () => initializePolicyLimitsLoadingPromise,
  clearPolicyLimitsCache: () => clearPolicyLimitsCache,
  _resetPolicyLimitsForTesting: () => _resetPolicyLimitsForTesting,
  POLICY_LIMITS_COLD_AWAIT_MS: () => POLICY_LIMITS_COLD_AWAIT_MS,
  FAIL_CLOSED_SHADOW_CACHE_TTL_MS: () => FAIL_CLOSED_SHADOW_CACHE_TTL_MS
});
function getCacheFileAgeMs() {
  try {
    return Math.max(0, Date.now() - fsModule.statSync(eve()).mtimeMs);
  } catch {
    return;
  }
}
function recordPolicyLimitsStartupAwaitResult(startupAwaitResult) {
  startupAwaitResultState = startupAwaitResult;
}
function teardownPolicyLimitsLoading() {
  if (stopBackgroundPolling(), Wfe(null), resolveLoadingPromise?.(), loadingPromise = null, resolveLoadingPromise = null, loadingPromiseTimeout !== null) clearTimeout(loadingPromiseTimeout), loadingPromiseTimeout = null;
}
function _resetPolicyLimitsForTesting() {
  teardownPolicyLimitsLoading(), firstPromptLogged = false, loadState = "not_started", loadStarted = false, startupFetchErrorCode = undefined, startupAwaitResultState = "not_awaited", cacheWriteFailureReported = false;
}
function initializePolicyLimitsLoadingPromise() {
  if (loadingPromise) return;
  if (K3()) loadingPromise = new Promise(resolve => {
    resolveLoadingPromise = resolve, loadingPromiseTimeout = setTimeout(timeoutResolve => {
      if (resolveLoadingPromise === timeoutResolve) A("Policy limits: Loading promise timed out, resolving anyway"), resolveLoadingPromise(), resolveLoadingPromise = null;
    }, LOADING_PROMISE_TIMEOUT_MS, resolve);
  });
}
function getPolicyLimitsUrl() {
  return `${Hs().BASE_API_URL}/api/claude_code/policy_limits`;
}
function canonicalizeForHash(value) {
  if (Array.isArray(value)) return value.map(canonicalizeForHash);
  if (value !== null && typeof value === "object") {
    let sorted = {};
    for (let [key, child] of Object.entries(value).sort(([a], [b_2]) => a.localeCompare(b_2))) sorted[key] = canonicalizeForHash(child);
    return sorted;
  }
  return value;
}
function hashPolicyLimits(value) {
  let canonical = canonicalizeForHash(value),
    serialized = Pe(canonical);
  return `sha256:${cryptoModule.createHash("sha256").update(serialized).digest("hex")}`;
}
function shouldAwaitPolicyLimitsOnStartup() {
  return K3() && uDt() === null;
}
async function waitForPolicyLimitsToLoad() {
  if (loadingPromise) await loadingPromise;
}
function resolveAuthType() {
  let apiKey = null;
  try {
    apiKey = Yg({
      skipRetrievingKeyFromApiKeyHelper: true
    }).key;
  } catch {}
  if (!apiKey && dE()) return "wif";
  if (Eo() && qs()?.accessToken) return "oauth";
  return apiKey ? "api_key" : "oauth";
}
async function fetchPolicyLimitsWithRetry(etag) {
  let result = null;
  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    if (result = await fetchPolicyLimitsOnce(etag), result.attempts = attempt, result.success) return result;
    if (result.skipRetry) return result;
    if (attempt > MAX_RETRIES) return result;
    let backoffMs = qj(attempt);
    A(`Policy limits: Retry ${attempt}/${MAX_RETRIES} after ${backoffMs}ms`), await Kn(backoffMs);
  }
  return result;
}
async function fetchPolicyLimitsOnce(etag) {
  let tokenRefreshOutcome;
  try {
    tokenRefreshOutcome = await Gyn();
    let authHeaders = await cxt();
    if (authHeaders.error) return {
      success: false,
      error: "Authentication required for policy limits",
      errorCode: "auth_failed",
      authUnavailableReason: authHeaders.reasonCode,
      tokenRefreshOutcome: tokenRefreshOutcome,
      skipRetry: true
    };
    let url = getPolicyLimitsUrl(),
      headers = {
        ...authHeaders.headers,
        "User-Agent": Fg()
      };
    if (etag) headers["If-None-Match"] = `"${etag}"`;
    let response = await ho.get(url, {
      headers: headers,
      timeout: REQUEST_TIMEOUT_MS,
      validateStatus: status => status === 200 || status === 304 || status === 404
    });
    if (response.status === 304) return A("Policy limits: Using cached restrictions (304)"), {
      success: true,
      response: null,
      etag: etag
    };
    if (response.status === 404) return A("Policy limits: No restrictions found (404)"), {
      success: true,
      response: C$r,
      etag: undefined
    };
    let parsed = kbn().safeParse(response.data);
    if (!parsed.success) return A(`Policy limits: Invalid response format - ${parsed.error.message}`), {
      success: false,
      error: "Invalid policy limits format",
      errorCode: "parse_failed"
    };
    return A("Policy limits: Fetched successfully"), {
      success: true,
      response: parsed.data
    };
  } catch (err) {
    let {
      kind: kind,
      status: status,
      message: message
    } = Fb(err);
    switch (A(`Policy limits: fetch failed (${kind}${status ? ` ${status}` : ""}) \u2014 ${message}`), kind) {
      case "auth":
        return {
          success: false,
          error: "Not authorized for policy limits",
          errorCode: "auth_failed",
          httpStatus: status,
          tokenRefreshOutcome: tokenRefreshOutcome,
          skipRetry: true
        };
      case "timeout":
        return {
          success: false,
          error: "Policy limits request timeout",
          errorCode: "timeout"
        };
      case "network":
        return {
          success: false,
          error: "Cannot connect to server",
          errorCode: "network_error"
        };
      default:
        return {
          success: false,
          error: message,
          errorCode: "request_failed",
          httpStatus: status
        };
    }
  }
}
async function savePolicyLimitsToCache(policyLimits) {
  try {
    let cachePath = eve();
    await fsPromisesModule.writeFile(cachePath, Pe(policyLimits, null, 2), {
      encoding: "utf-8",
      mode: 384
    }), A(`Policy limits: Saved to ${cachePath}`);
  } catch (err) {
    if (A(`Policy limits: Failed to save - ${err instanceof Error ? err.message : "unknown error"}`), !cacheWriteFailureReported) cacheWriteFailureReported = true, W("tengu_policy_limits_cache_write_failed", {
      errno: Le(classifyWriteErrno(err))
    });
  }
}
function classifyWriteErrno(err) {
  let code = cn(err);
  switch (code) {
    case "EACCES":
    case "EPERM":
    case "EROFS":
    case "ENOSPC":
    case "EDQUOT":
    case "ENOENT":
    case "ENOTDIR":
    case "EMFILE":
    case "ENFILE":
    case "EBUSY":
      return code;
    default:
      return "other";
  }
}
async function loadPolicyLimitsCore(trigger, awaited = false) {
  let isInitialLoad = trigger === "policy_limits_load" && !loadStarted;
  if (isInitialLoad) loadStarted = true;
  if (!K3()) return null;
  if (isInitialLoad) loadState = "in_flight";
  let cached = uDt(),
    cacheAgeMs = getCacheFileAgeMs();
  if (cached && !lDt()) Wfe(cached);
  let etag = cached ? hashPolicyLimits(cached) : undefined,
    authType = resolveAuthType(),
    startTime = Date.now();
  try {
    let result = await fetchPolicyLimitsWithRetry(etag);
    if (isInitialLoad) loadState = result.success ? "succeeded" : "failed", startupFetchErrorCode = result.success ? undefined : result.errorCode ?? "request_failed";
    let endTime = Date.now();
    if (W("tengu_policy_limits_fetch", {
      duration_ms: endTime - startTime,
      ms_since_startup: endTime - startupTimestamp,
      success: result.success,
      had_cache: cached !== null,
      cache_age_ms: cacheAgeMs,
      attempts: result.attempts,
      is_load: trigger === "policy_limits_load",
      awaited: awaited,
      auth_type: Le(authType),
      error_code: Bo(result.errorCode),
      token_source: Le(Ak().source),
      auth_unavailable_reason: Bo(result.authUnavailableReason),
      token_refresh_outcome: authType === "oauth" ? Bo(result.tokenRefreshOutcome) : undefined,
      http_status: result.httpStatus
    }), !result.success) {
      if (cached) return A("Policy limits: Using stale cache after fetch failure"), Wfe(cached), Pt(trigger, "stale_cache_used"), cached;
      return xe(trigger, result.errorCode ?? "request_failed"), null;
    }
    if (result.response === null && cached) {
      A("Policy limits: Cache still valid (304 Not Modified)"), Wfe(cached);
      try {
        let now = new Date();
        await fsPromisesModule.utimes(eve(), now, now);
      } catch {}
      return He(trigger), cached;
    }
    let policyLimits = result.response ?? C$r;
    return Wfe(policyLimits), await savePolicyLimitsToCache(policyLimits), A(Object.keys(policyLimits.restrictions).length > 0 ? "Policy limits: Applied new restrictions successfully" : "Policy limits: No restrictions (cached empty)"), He(trigger), policyLimits;
  } catch {
    if (isInitialLoad && loadState === "in_flight") loadState = "failed", startupFetchErrorCode = "unexpected_error";
    if (cached) return A("Policy limits: Using stale cache after error"), Wfe(cached), Pt(trigger, "stale_cache_used"), cached;
    return xe(trigger, "unexpected_error"), null;
  }
}
function logPolicyLimitsCacheStateAtFirstPrompt() {
  if (firstPromptLogged) return;
  firstPromptLogged = true;
  let ineligibleReason = cDt(),
    eligible = ineligibleReason === undefined,
    eligibleIfBaseUrlGateRemoved = ineligibleReason === "custom_base_url" ? cDt({
      skipBaseUrlCheck: true
    }) === undefined : eligible,
    hasCache = X7() !== null,
    cacheAgeMs = eligible ? getCacheFileAgeMs() : undefined,
    loadStateSnapshot = loadState,
    startupAwaitResultSnapshot = startupAwaitResultState,
    startupFetchErrorCodeSnapshot = startupFetchErrorCode,
    errorReportingGate;
  W("tengu_policy_limits_cache_state_at_first_prompt", {
    eligible: eligible,
    ineligible_reason: Bo(ineligibleReason),
    eligible_if_base_url_gate_removed: eligibleIfBaseUrlGateRemoved,
    has_cache: hasCache,
    cache_age_ms: cacheAgeMs,
    would_fail_closed: eligible && (!hasCache || (cacheAgeMs ?? 1 / 0) > FAIL_CLOSED_SHADOW_CACHE_TTL_MS),
    ms_since_startup: Date.now() - startupTimestamp,
    load_state: Le(loadStateSnapshot),
    startup_fetch_error_code: Bo(startupFetchErrorCodeSnapshot),
    startup_await_result: Le(startupAwaitResultSnapshot),
    error_reporting_gate: errorReportingGate
  });
}
async function loadPolicyLimits({
  startupAwaited = false
} = {}) {
  if (K3() && !loadingPromise) loadingPromise = new Promise(resolve => {
    resolveLoadingPromise = resolve;
  });
  let pendingResolve = resolveLoadingPromise;
  try {
    if (await loadPolicyLimitsCore("policy_limits_load", startupAwaited), K3()) startBackgroundPolling();
  } finally {
    if (pendingResolve) {
      if (pendingResolve(), resolveLoadingPromise === pendingResolve) {
        if (resolveLoadingPromise = null, loadingPromiseTimeout) clearTimeout(loadingPromiseTimeout), loadingPromiseTimeout = null;
      }
    }
  }
}
async function refreshPolicyLimits() {
  if (teardownPolicyLimitsLoading(), initializePolicyLimitsLoadingPromise(), !K3()) return;
  try {
    await fsPromisesModule.unlink(eve());
  } catch {}
  await loadPolicyLimits(), A("Policy limits: Refreshed after auth change");
}
async function clearPolicyLimitsCache() {
  teardownPolicyLimitsLoading();
  try {
    await fsPromisesModule.unlink(eve());
  } catch {}
}
async function pollPolicyLimits() {
  if (!K3()) return;
  let before = lDt(),
    beforeSerialized = before ? Pe(before) : null;
  try {
    await loadPolicyLimitsCore("policy_limits_poll");
    let after = lDt();
    if ((after ? Pe(after) : null) !== beforeSerialized) A("Policy limits: Changed during background poll");
  } catch {}
}
function startBackgroundPolling() {
  if (pollTimer !== null) return;
  if (!K3()) return;
  if (pollTimer = Hbn(() => void pollPolicyLimits(), POLL_INTERVAL_MS, {
    unref: true
  }), !shutdownHookRegistered) shutdownHookRegistered = true, Si(stopBackgroundPolling);
}
function stopBackgroundPolling() {
  pollTimer?.[Symbol.dispose](), pollTimer = null;
}
var cryptoModule,
  fsModule,
  fsPromisesModule,
  REQUEST_TIMEOUT_MS = 1e4,
  MAX_RETRIES = 5,
  POLL_INTERVAL_MS = 3600000,
  pollTimer = null,
  shutdownHookRegistered = false,
  loadingPromise = null,
  resolveLoadingPromise = null,
  loadingPromiseTimeout = null,
  LOADING_PROMISE_TIMEOUT_MS = 30000,
  POLICY_LIMITS_COLD_AWAIT_MS = 5000,
  FAIL_CLOSED_SHADOW_CACHE_TTL_MS = 86400000,
  firstPromptLogged = false,
  cacheWriteFailureReported = false,
  startupTimestamp,
  loadState = "not_started",
  loadStarted = false,
  startupFetchErrorCode,
  startupAwaitResultState = "not_awaited";
var _B = b(() => {
  ap();
  Sc();
  lo();
  ud();
  qe();
  Ct();
  kk();
  tn();
  mn();
  kt();
  Q3e();
  Bto();
  Bu();
  A$r();
  cryptoModule = require("crypto"), fsModule = require("fs"), fsPromisesModule = require("fs/promises");
  startupTimestamp = Date.now();
});

export {$Bt,getCacheFileAgeMs as f5l,recordPolicyLimitsStartupAwaitResult,teardownPolicyLimitsLoading as CMo,_resetPolicyLimitsForTesting,initializePolicyLimitsLoadingPromise,getPolicyLimitsUrl as gxm,canonicalizeForHash as SMo,hashPolicyLimits as _xm,shouldAwaitPolicyLimitsOnStartup,waitForPolicyLimitsToLoad,resolveAuthType as yxm,fetchPolicyLimitsWithRetry as Txm,fetchPolicyLimitsOnce as Sxm,savePolicyLimitsToCache as bxm,classifyWriteErrno as Exm,loadPolicyLimitsCore as g5l,logPolicyLimitsCacheStateAtFirstPrompt,loadPolicyLimits,refreshPolicyLimits,clearPolicyLimitsCache,pollPolicyLimits as Cxm,startBackgroundPolling,stopBackgroundPolling,cryptoModule as d5l,fsModule as p5l,fsPromisesModule as vGe,REQUEST_TIMEOUT_MS as pxm,MAX_RETRIES as gMo,POLL_INTERVAL_MS as mxm,pollTimer as wQn,shutdownHookRegistered as u5l,loadingPromise as RGe,resolveLoadingPromise as Zue,loadingPromiseTimeout as AGe,LOADING_PROMISE_TIMEOUT_MS as fxm,POLICY_LIMITS_COLD_AWAIT_MS,FAIL_CLOSED_SHADOW_CACHE_TTL_MS,firstPromptLogged as _Mo,cacheWriteFailureReported as yMo,startupTimestamp as h5l,loadState as D_t,loadStarted as TMo,startupFetchErrorCode as kQn,startupAwaitResultState as EMo,_B};
