// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {Uo,uk,qp} from "../../vendor/m137.ts";
import {P4,Bke,A7r,$ke} from "../../vendor/m2752.ts";
import {$l,Voe,g5s,p5s,m5s,WS} from "./1453_month.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "./2204_stopPeriodicGrowthBookRefresh.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {disableKeepAlive as pvr,getConfiguredProxyAuthHelper as ANe,clearProxyAuthHelperCache as gvr,ey} from "../config/1026_shouldBypassProxyWithCidr.ts";
import {getAnthropicApiKey as Gv,shouldUseWIFAuth as dE,handleOAuth401Error as cF,getClaudeAIOAuthTokens as qs,getAuthTokenSource as Ak,isAnthropicAuthEnabled as aT,isClaudeAISubscriber as Eo,clearAwsCredentialsCache as wse,clearGcpCredentialsCache as LRe,isEnterpriseSubscriber as yZe,clearApiKeyHelperCache as hZe,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {invalidateWIFToken as nDr,getWIFTokenCache as qAe,PXe} from "./1489_withCredentialsLock.ts";
import {getSdkOAuthTokenRefreshCallback as uSt,getHostAuthTokenRefreshCallback as dSt,lt} from "../session/0132_sent.ts";
import {xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {isFirstPartyProvider as Nl,isFirstPartyAnthropicBaseUrl as Su,getAPIProviderForAnalytics as g2,Ps} from "./1287_usesFirstPartyModelIds.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {rN,WWn} from "../../vendor/m4429.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {getCanonicalName as So,isNonCustomOpusModel as Yoe,isNonCustomFableModel as _Xe,isNonCustomMythosModel as yXe,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {t1t,r1t,kD,w7r,k7r,MHn,o1t} from "./2754_actualTokens.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {L4,t9e} from "../../vendor/m2781.ts";
import {lMo,po} from "../tools/5224_userPromptCount.ts";
import {Z6s,q0r} from "../../vendor/m1448.ts";
import {WorkloadIdentityError as Wp,TX} from "../../vendor/m140.ts";
import {c6i,XMt} from "../../vendor/m2747.ts";
import {b} from "../../runtime.ts";
import {jx} from "../../vendor/m196.ts";
import {dn} from "../config/0137_namespace.ts";
// @ts-nocheck

/** Env var name that holds the host-provided auth token (overridable). */
function Z6l(): string {
  return process.env.CLAUDE_CODE_HOST_AUTH_ENV_VAR || "ANTHROPIC_AUTH_TOKEN";
}

/** Whether 529 (overloaded) errors may be dropped for a given query source. */
function ALo(querySource: string | undefined): boolean {
  if (querySource === void 0) return !0;
  if (querySource.startsWith("agent:")) return !0;
  return z0m.has(querySource);
}

/** True when the retry watchdog is enabled. */
function ySe(): boolean {
  return nt(process.env.CLAUDE_CODE_RETRY_WATCHDOG);
}

/** Watchdog-retryable: overloaded errors or HTTP 429. */
function o5l(error: unknown): boolean {
  return _Se(error) || (error instanceof Uo && error.status === 429);
}

/** Remote-mode auth error: 401/403 from the API while CLAUDE_CODE_REMOTE is set. */
function kKt(error: unknown): boolean {
  return nt(process.env.CLAUDE_CODE_REMOTE) && error instanceof Uo && (error.status === 401 || error.status === 403);
}

/** True for connection-reset style errors that justify dropping keep-alive. */
function Y0m(error: unknown): boolean {
  if (!(error instanceof uk)) return !1;
  let parsed = P4(error);
  return parsed !== null && Bke.has(parsed.code);
}

/**
 * Core API request loop with retries, auth refresh, fallback-model and
 * backoff handling. Yields retry-status updates and returns the response.
 */
async function* gQn(getAuthState: any, sendRequest: any, options: any) {
  let maxRetries = ixm(options),
    requestContext = {
      model: options.model,
      thinkingConfig: options.thinkingConfig,
      ...($l() && {
        fastMode: options.fastMode
      })
    },
    authState = null,
    consecutive529Errors = options.initialConsecutive529Errors ?? 0,
    lastError,
    persistentRetryCount = 0,
    ccrAuthRetryCount = 0,
    oauthRefreshCount = 0,
    hostAuthRecoveryCount = 0,
    oauthAccessToken,
    seenOnErrorResults = new Set(),
    didEmitRetryStatus = !1;
  try {
    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      if (options.signal?.aborted) throw new qp();
      let attemptStart = Date.now(),
        fastModeActive = $l() ? requestContext.fastMode && !Voe() : !1;
      try {
        let isConnReset = Y0m(lastError);
        if (isConnReset && it("tengu_disable_keepalive_on_econnreset", !1)) A("Stale connection — disabling keep-alive for retry"), pvr();
        if (authState === null || lastError instanceof Uo && lastError.status === 401 || lastError instanceof Uo && lastError.status === 407 && ANe() || HKt(lastError) || l5l(lastError) || c5l(lastError) || isConnReset) {
          if (lastError instanceof Uo && lastError.status === 401 || HKt(lastError)) {
            if (!Gv() && dE()) await nDr(authState?.authToken);
            if (oauthAccessToken) {
              if (await cF(oauthAccessToken), qs()?.accessToken === oauthAccessToken) {
                if (uSt() !== null || !kKt(lastError) && ++oauthRefreshCount >= W0m) throw xe("api_request", "api_request_oauth_refresh_exhausted"), new xL(lastError, requestContext);
              } else oauthRefreshCount = 0;
            } else if (dSt() && !(Nl() && Su())) {
              let prevHostAuthToken = process.env[Z6l()],
                hostAuthCallback = dSt(),
                newHostAuthToken = null;
              try {
                newHostAuthToken = await hostAuthCallback();
              } catch (callbackError) {
                throw A(`host getHostAuthToken callback failed: ${Ce(callbackError)}`, {
                  level: "error"
                }), xe("host_auth_401_recovery", "host_auth_callback_failed"), new xL(lastError, requestContext);
              }
              if (newHostAuthToken && newHostAuthToken !== prevHostAuthToken) process.env[Z6l()] = newHostAuthToken, hostAuthRecoveryCount = 0, He("host_auth_401_recovery");else if (++hostAuthRecoveryCount >= G0m) throw xe("host_auth_401_recovery", newHostAuthToken === null ? "host_auth_callback_returned_null" : "host_auth_callback_returned_same_token"), new xL(lastError, requestContext);
            } else if (nt(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST) && Nl() && !dE() && Ak().source !== "apiKeyHelper" && !kKt(lastError)) throw xe("api_request", "api_request_host_managed_auth_fail"), new xL(lastError, requestContext);
          }
          authState = await getAuthState(), oauthAccessToken = aT() ? qs()?.accessToken : void 0;
        }
        let response = await sendRequest(authState, attempt, requestContext);
        return He("api_request"), response;
      } catch (error) {
        if (error instanceof xL) throw error;
        if (error instanceof qp) throw error;
        lastError = error, A(`API error (attempt ${attempt}/${maxRetries + 1}): ${error instanceof Uo ? `${error.status} ${error.message}` : Ce(error)}`, {
          level: "error"
        });
        let onErrorResult = await options.onError?.(error);
        if (onErrorResult && !seenOnErrorResults.has(onErrorResult)) {
          seenOnErrorResults.add(onErrorResult), attempt--;
          continue;
        }
        if ((t5l(error) || n5l(error) || !ySe() && Z0m(error)) && options.fallbackModel && options.fallbackModel !== options.model) {
          let fallbackReason = t5l(error) ? "model_not_found" : n5l(error) ? "permission_denied" : "server_error";
          throw W("tengu_api_model_not_found_fallback_triggered", {
            original_model: options.model,
            fallback_model: options.fallbackModel,
            provider: g2(),
            reason: Le(fallbackReason)
          }), new rN(options.model, options.fallbackModel, fallbackReason, error);
        }
        if (fastModeActive && !ySe() && error instanceof Uo && (error.status === 429 || _Se(error))) {
          let overageDisabledReason = error.headers?.get("anthropic-ratelimit-unified-overage-disabled-reason");
          if (overageDisabledReason !== null && overageDisabledReason !== void 0) {
            g5s(overageDisabledReason), requestContext.fastMode = !1;
            continue;
          }
          let unifiedResetDelay = uxm(error);
          if (unifiedResetDelay !== null && unifiedResetDelay < lxm) {
            await Kn(unifiedResetDelay, options.signal, {
              abortError: pMo
            });
            continue;
          }
          let rateLimitWindowMs = Math.max(unifiedResetDelay ?? axm, cxm),
            rateLimitKind = _Se(error) ? "overloaded" : "rate_limit";
          if (p5s(Date.now() + rateLimitWindowMs, rateLimitKind), $l()) requestContext.fastMode = !1;
          continue;
        }
        if (fastModeActive && a5l(error)) {
          m5s(), requestContext.fastMode = !1;
          continue;
        }
        if (_Se(error) && !ALo(options.querySource) && !ySe()) throw W("tengu_api_529_background_dropped", {
          query_source: options.querySource
        }), xe("api_request", "api_request_overload_background_dropped"), new xL(error, requestContext);
        let canonicalModel = So(options.model);
        if (_Se(error) && (process.env.FALLBACK_FOR_ALL_PRIMARY_MODELS || options.fallbackModel !== void 0 || !Eo() && (Yoe(canonicalModel) || _Xe(canonicalModel) || yXe(canonicalModel)))) {
          if (consecutive529Errors++, consecutive529Errors >= hQn) {
            if (options.fallbackModel) throw W("tengu_api_opus_fallback_triggered", {
              original_model: options.model,
              fallback_model: options.fallbackModel,
              provider: g2()
            }), Pt("api_request", "api_request_fallback_triggered"), new rN(options.model, options.fallbackModel, "overloaded", error);
            if (!process.env.IS_SANDBOX && !ySe()) throw W("tengu_api_custom_529_overloaded_error", {}), xe("api_request", "api_request_overload_repeated"), new xL(Error(t1t), requestContext);
          }
        }
        let watchdogRetry = ySe() && o5l(error);
        if (attempt > maxRetries && !watchdogRetry) throw xe("api_request", "api_request_retry_exhausted"), new xL(error, requestContext);
        if (kKt(error)) {
          if (ccrAuthRetryCount >= $0m) throw xe("api_request", "api_request_ccr_auth_exhausted"), new xL(error, requestContext);
          ccrAuthRetryCount++;
        }
        if (!(exm(error) || nxm(error) || (await rxm(error))) && (!(error instanceof Uo) || !oxm(error))) {
          let isNonRetryableStatus = error instanceof Uo && (error.status !== void 0 && X0m.has(error.status) && !(error.status === 404 && options.isNonStreamingRequest) || error.type === "billing_error" || Q0m.some(predicate => predicate(error)));
          if (error instanceof Uo && error.status !== void 0 && !isNonRetryableStatus && options.fallbackModel && options.fallbackModel !== options.model) {
            let errorType = error.type;
            throw W("tengu_api_fallback_last_resort", {
              status: error.status,
              errorType: Le(J0m.find(knownType => knownType === errorType) ?? "other"),
              provider: g2(),
              fastMode: requestContext.fastMode ?? !1
            }), Pt("api_request", "api_request_last_resort_fallback"), new rN(options.model, options.fallbackModel, "last_resort", error);
          }
          throw xe("api_request", "api_request_non_retryable"), new xL(error, requestContext);
        }
        if (error instanceof Uo) {
          let contextOverflow = i5l(error);
          if (contextOverflow) {
            let {
                inputTokens,
                contextLimit
              } = contextOverflow,
              maxTokensFloor = 1000,
              availableContext = Math.max(0, contextLimit - inputTokens - 1000);
            if (availableContext < fMo) throw Ie(Error(`availableContext ${availableContext} is less than FLOOR_OUTPUT_TOKENS ${fMo}`)), error;
            let thinkingBudgetPlusOne = (requestContext.thinkingConfig.type === "enabled" ? requestContext.thinkingConfig.budgetTokens : 0) + 1,
              adjustedMaxTokens = Math.max(fMo, availableContext, thinkingBudgetPlusOne);
            requestContext.maxTokensOverride = adjustedMaxTokens, W("tengu_max_tokens_context_overflow_adjustment", {
              inputTokens,
              contextLimit,
              adjustedMaxTokens,
              attempt
            });
            continue;
          }
        }
        let retryAfterHeader = s5l(error),
          delayMs;
        if (watchdogRetry && error instanceof Uo && error.status === 429) persistentRetryCount++, delayMs = dxm(error) ?? Math.min(qj(persistentRetryCount, retryAfterHeader, e5l), hMo);else if (watchdogRetry) persistentRetryCount++, delayMs = Math.min(qj(persistentRetryCount, retryAfterHeader, e5l), hMo);else if (kKt(error)) delayMs = q0m;else if (delayMs = qj(attempt, retryAfterHeader), !ySe() && delayMs > K0m) throw W("tengu_api_retry_after_too_long", {
          delayMs,
          status: error.status,
          provider: g2()
        }), xe("api_request", "api_request_retry_after_too_long"), new xL(error, requestContext);
        let reportedAttempt = watchdogRetry ? persistentRetryCount : attempt;
        if (W("tengu_api_retry", {
          attempt: reportedAttempt,
          delayMs,
          error: L4(Ce(error)),
          status: error.status,
          provider: g2(),
          attempt_duration_ms: Date.now() - attemptStart
        }), watchdogRetry) {
          if (delayMs > 60000) W("tengu_api_persistent_retry_wait", {
            status: error.status,
            delayMs,
            attempt: reportedAttempt,
            provider: g2()
          });
          let remainingDelay = delayMs;
          while (remainingDelay > 0) {
            if (options.signal?.aborted) throw new qp();
            if (error instanceof Uo) {
              let retryError = A7r(error);
              didEmitRetryStatus = !0, options.onRetryStatus?.({
                kind: "retrying",
                error: retryError,
                attempt: reportedAttempt,
                maxRetries,
                retryInMs: remainingDelay,
                deadline: Date.now() + remainingDelay
              }), yield lMo(retryError, remainingDelay, reportedAttempt, maxRetries);
            }
            let sliceDelay = Math.min(remainingDelay, j0m);
            await Kn(sliceDelay, options.signal, {
              abortError: pMo
            }), remainingDelay -= sliceDelay;
          }
          if (attempt >= maxRetries) attempt = maxRetries;
        } else {
          if (error instanceof Uo) {
            let retryError = A7r(error);
            didEmitRetryStatus = !0, options.onRetryStatus?.({
              kind: "retrying",
              error: retryError,
              attempt,
              maxRetries,
              retryInMs: delayMs,
              deadline: Date.now() + delayMs
            }), yield lMo(retryError, delayMs, attempt, maxRetries);
          }
          await Kn(delayMs, options.signal, {
            abortError: pMo
          });
        }
      }
    }
    throw xe("api_request", "api_request_retry_exhausted"), new xL(lastError, requestContext);
  } finally {
    if (didEmitRetryStatus) options.onRetryStatus?.(null);
  }
}

/** Reads the Retry-After header value (object or Headers form). */
function s5l(error: any): string | null {
  return (error.headers?.["retry-after"] || error.headers?.get?.("retry-after")) ?? null;
}

/** Exponential backoff with jitter, honoring a Retry-After header seconds value. */
function qj(attempt: number, retryAfterHeader: string | null | undefined, maxDelay: number = 32000): number {
  let cappedDelay = Math.min(V0m * Math.pow(2, attempt - 1), maxDelay),
    jitteredDelay = cappedDelay + Math.random() * 0.25 * cappedDelay;
  if (retryAfterHeader) {
    let retryAfterSeconds = parseInt(retryAfterHeader, 10);
    if (!isNaN(retryAfterSeconds)) return Math.max(retryAfterSeconds * 1000, jitteredDelay);
  }
  return jitteredDelay;
}

/** Parses the "input length and max_tokens exceed context limit" error. */
function i5l(error: any) {
  if (error.status !== 400 || !error.message) return;
  if (!r1t(error)) return;
  let contextLimitPattern = /input length and `max_tokens` exceed context limit: (\d+) \+ (\d+) > (\d+)/,
    match = error.message.match(contextLimitPattern);
  if (!match || match.length !== 4) return;
  if (!match[1] || !match[2] || !match[3]) {
    Ie(Error("Unable to parse max_tokens from max_tokens exceed context limit error message"));
    return;
  }
  let inputTokens = parseInt(match[1], 10),
    maxTokens = parseInt(match[2], 10),
    contextLimit = parseInt(match[3], 10);
  if (isNaN(inputTokens) || isNaN(maxTokens) || isNaN(contextLimit)) return;
  return {
    inputTokens,
    maxTokens,
    contextLimit
  };
}

/** True when the API rejected the request because fast mode is not enabled. */
function a5l(error: unknown): boolean {
  if (!(error instanceof Uo)) return !1;
  return error.status === 400 && (error.message?.includes("Fast mode is not enabled") ?? !1);
}

/** True for overloaded errors: HTTP 529 or an overloaded_error payload. */
function _Se(error: unknown): boolean {
  if (!(error instanceof Uo)) return !1;
  return error.status === 529 || (error.message?.includes('"type":"overloaded_error"') ?? !1);
}

/** True when the error is a model-not-found 404 for the requested model. */
function t5l(error: unknown): boolean {
  if (!(error instanceof Uo) || error.status !== 404) return !1;
  let message = error.message ?? "";
  return (error.type === "not_found_error" || message.includes('"type":"not_found_error"')) && message.includes("model:");
}

/** True when the error is a model permission 403 for the requested model. */
function n5l(error: unknown): boolean {
  if (!(error instanceof Uo) || error.status !== 403) return !1;
  let message = error.message ?? "";
  return (error.type === "permission_error" || message.includes('"type":"permission_error"')) && message.includes("model:");
}

/** True for a non-529 server error (5xx). */
function Z0m(error: unknown): boolean {
  return error instanceof Uo && error.status !== void 0 && error.status >= 500 && error.status < 600 && error.status !== 529;
}

/** True when the API reports the OAuth token has been revoked (403). */
function HKt(error: unknown): boolean {
  return error instanceof Uo && error.status === 403 && (error.message?.includes("OAuth token has been revoked") ?? !1);
}

/** True for AWS (Bedrock/Mantle) credential errors that warrant a cache clear. */
function l5l(error: unknown): boolean {
  if (nt(process.env.CLAUDE_CODE_USE_BEDROCK) || nt(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) || nt(process.env.CLAUDE_CODE_USE_MANTLE)) {
    if (Z6s(error) || error instanceof Uo && error.status === 403) return !0;
  }
  return !1;
}

/** Clears AWS credentials cache when the error is an AWS auth failure. */
function exm(error: unknown): boolean {
  if (l5l(error)) return wse(), !0;
  return !1;
}

/** True for GCP default-credentials / token refresh failure messages. */
function txm(error: unknown): boolean {
  if (!(error instanceof Error)) return !1;
  let message = error.message;
  return message.includes("Could not load the default credentials") || message.includes("Could not refresh access token") || message.includes("invalid_grant");
}

/** True for Vertex credential errors that warrant a cache clear. */
function c5l(error: unknown): boolean {
  if (nt(process.env.CLAUDE_CODE_USE_VERTEX)) {
    if (txm(error)) return !0;
    if (error instanceof Uo && error.status === 401) return !0;
  }
  return !1;
}

/** Clears GCP credentials cache when the error is a Vertex auth failure. */
function nxm(error: unknown): boolean {
  if (c5l(error)) return LRe(), !0;
  return !1;
}

/** Invalidates the WIF token cache on workload-identity auth/5xx errors. */
async function rxm(error: unknown): Promise<boolean> {
  if (error instanceof Wp && (error.statusCode === null || error.statusCode === 401 || error.statusCode >= 500)) {
    let wifTokenCache = await qAe().catch(() => null);
    if (wifTokenCache === null) return !1;
    return wifTokenCache.invalidate(), !0;
  }
  return !1;
}

/** Decides whether a given Uo API error is retryable. */
function oxm(error: any): boolean {
  if (c6i(error)) return !1;
  if (error.status === 429 && (error.error?.error?.details?.error_code === "credits_required" || error.message?.toLowerCase().includes("usage credits are required") || error.message?.toLowerCase().includes("extra usage is required"))) {
    let overageDisabledReason = error.headers?.get("anthropic-ratelimit-unified-overage-disabled-reason");
    if (overageDisabledReason !== "fetch_error" && overageDisabledReason !== "org_level_disabled_until") return !1;
  }
  if (ySe() && o5l(error)) return !0;
  if (kKt(error)) return !0;
  if (error.message?.includes('"type":"overloaded_error"')) return !0;
  if (i5l(error)) return !0;
  if (aT() && qs()?.accessToken && (error.status === 401 || HKt(error))) return !0;
  if (!Gv() && dE() && (error.status === 401 || HKt(error))) return !0;
  if (dSt() && !(Nl() && Su()) && error.status === 401) return !0;
  if (error.status === 407 && ANe()) return gvr(error.headers?.get("proxy-authenticate") ?? void 0), !0;
  let shouldRetryHeader = error.headers?.get("x-should-retry");
  if (shouldRetryHeader === "true" && (!Eo() || yZe())) return !0;
  if (shouldRetryHeader === "false") {
    let isServerError = error.status !== void 0 && error.status >= 500;
    return !1;
  }
  if (error instanceof uk) return !0;
  if (!error.status) return !1;
  if (error.status === 408) return !0;
  if (error.status === 409) return !0;
  if (error.status === 401) return hZe(), !0;
  if (HKt(error)) return !0;
  if (error.status === 429) return !Eo() || yZe();
  if (error.status && error.status >= 500) return !0;
  return !1;
}

/** Reads CLAUDE_CODE_MAX_RETRIES (clamped to mMo) or the default. */
function sxm(): number {
  if (process.env.CLAUDE_CODE_MAX_RETRIES) {
    let parsed = parseInt(process.env.CLAUDE_CODE_MAX_RETRIES, 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      if (parsed > mMo) {
        if (!r5l) r5l = !0, A(`CLAUDE_CODE_MAX_RETRIES=${parsed} clamped to ${mMo}`, {
          level: "warn"
        });
        return mMo;
      }
      return parsed;
    }
  }
  return U0m;
}

/** Resolves max retries from options or the configured/default value. */
function ixm(options: any): number {
  return options.maxRetries ?? sxm();
}

/** Retry-After delay in milliseconds from the header, or null. */
function uxm(error: any): number | null {
  let retryAfterHeader = s5l(error);
  if (retryAfterHeader) {
    let retryAfterSeconds = parseInt(retryAfterHeader, 10);
    if (!isNaN(retryAfterSeconds)) return retryAfterSeconds * 1000;
  }
  return null;
}

/** Delay until the unified rate-limit reset (ms), capped at hMo, or null. */
function dxm(error: any): number | null {
  let resetHeader = error.headers?.get?.("anthropic-ratelimit-unified-reset");
  if (!resetHeader) return null;
  let resetSeconds = Number(resetHeader);
  if (!Number.isFinite(resetSeconds)) return null;
  let delayMs = resetSeconds * 1000 - Date.now();
  if (delayMs <= 0) return null;
  return Math.min(delayMs, hMo);
}

var pMo = () => new qp(),
  /** Default max retries. */
  U0m = 10,
  /** Hard cap for CLAUDE_CODE_MAX_RETRIES. */
  mMo = 15,
  /** Minimum reserved output tokens. */
  fMo = 3000,
  /** Consecutive-529 threshold before Opus fallback. */
  hQn = 3,
  /** Max CCR auth retries. */
  $0m = 2,
  /** Fixed retry delay (ms) for remote-mode auth retries. */
  q0m = 1000,
  /** Max OAuth refresh attempts. */
  W0m = 2,
  /** Max host-auth recovery attempts. */
  G0m = 2,
  /** Base backoff delay (ms). */
  V0m = 500,
  /** Max allowed Retry-After delay (ms) when watchdog off. */
  K0m = 60000,
  z0m,
  /** Watchdog backoff cap (ms). */
  e5l = 300000,
  /** Max persistent retry delay (ms) ~ 6h. */
  hMo = 21600000,
  /** Watchdog sleep slice (ms). */
  j0m = 30000,
  xL,
  J0m,
  X0m,
  Q0m,
  /** Whether the clamp warning has already been logged. */
  r5l = !1,
  axm = 1800000,
  lxm = 20000,
  cxm = 600000;

var Q3e = b(() => {
  jx();
  TX();
  q0r();
  qe();
  vn();
  po();
  Ps();
  lt();
  lo();
  dn();
  Ct();
  WS();
  Ro();
  ey();
  mn();
  jn();
  kt();
  t9e();
  XMt();
  PXe();
  kD();
  $ke();
  WWn();
  WWn();
  z0m = new Set(["repl_main_thread", "repl_main_thread:outputStyle:custom", "repl_main_thread:outputStyle:Proactive", "repl_main_thread:outputStyle:Explanatory", "repl_main_thread:outputStyle:Learning", "sdk", "agent:custom", "agent:default", "agent:builtin", "compact", "hook_agent", "hook_prompt", "side_question", "auto_mode", ...[]]);
  xL = class xL extends Error {
    originalError;
    retryContext;
    constructor(originalError, retryContext) {
      let message = Ce(originalError);
      super(message);
      this.originalError = originalError;
      this.retryContext = retryContext;
      if (this.name = "RetryError", originalError instanceof Error && originalError.stack) this.stack = originalError.stack;
    }
  };
  J0m = ["invalid_request_error", "authentication_error", "billing_error", "permission_error", "not_found_error", "request_too_large", "rate_limit_error", "timeout_error", "api_error", "overloaded_error"], X0m = new Set([401, 407, 429, 404, 403, 413]), Q0m = [w7r, r1t, k7r, MHn, a5l, o1t];
});

export {Z6l,ALo,ySe,o5l,kKt,Y0m,gQn,s5l,qj,i5l,a5l,_Se,t5l,n5l,Z0m,HKt,l5l,exm,txm,c5l,nxm,rxm,oxm,sxm,ixm,uxm,dxm,pMo,U0m,mMo,fMo,hQn,$0m,q0m,W0m,G0m,V0m,K0m,z0m,e5l,hMo,j0m,xL as initXL,J0m,X0m,Q0m,r5l,axm,lxm,cxm,Q3e};
