// @ts-nocheck
import {qt as d_,tn as H6} from "../config/0230_encoding.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {wn as I6,pf as L$} from "../config/0693_timestamp.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {b as L} from "../../runtime.ts";
// Session subsystem — OAuth/bridge access-token refresh scheduler.
//
// Drives proactive refresh of per-session access tokens: it decodes the JWT
// expiry, schedules a timer to refresh shortly before expiry (minus a buffer),
// retries on transient failures with bounded attempts, and supports cancelling
// per-session or all sessions. A monotonic per-session "generation" counter is
// used to invalidate stale in-flight refreshes when a session is rescheduled
// or cancelled.
//
// External (cross-module) helpers referenced here (kept under their bundle
// names because they are defined in other modules):
//   d_  - JSON.parse wrapper used throughout the bundle
//   N   - structured logger (message, { level } options)
//   GH  - format an unknown error/throwable into a string
//   c   - record a named telemetry event (eventName, payload)
//   I6  - record a leveled telemetry event (level, eventName)
//   L   - esbuild-style lazy module initializer factory
//   y_, FH, L$, L_, H6 - lazy module initializers invoked by enH

/**
 * Format a millisecond duration into a short human string.
 * Under a minute -> seconds (e.g. "45s"); otherwise minutes and optional
 * remainder seconds (e.g. "5m", "5m 30s").
 */
function formatDurationShort(durationMs: number): string {
  if (durationMs < 60000) return `${Math.round(durationMs / 1000)}s`;
  let minutes = Math.floor(durationMs / 60000),
    seconds = Math.round(durationMs % 60000 / 1000);
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
}

/**
 * Decode the JSON payload (second segment) of a JWT access token.
 * Strips the "sk-ant-si-" prefix if present. Returns the parsed payload
 * object, or null if the token is not a well-formed three-part JWT or decode
 * fails.
 */
function decodeJwtPayload(token: string): unknown {
  let segments = (token.startsWith("sk-ant-si-") ? token.slice(10) : token).split(".");
  if (segments.length !== 3 || !segments[1]) return null;
  try {
    return d_(Buffer.from(segments[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

/**
 * Extract the `exp` (expiry, seconds since epoch) claim from a JWT access
 * token. Returns the numeric expiry, or null if it cannot be decoded.
 */
function getJwtExpiry(token: string): number | null {
  let payload = decodeJwtPayload(token);
  if (payload !== null && typeof payload === "object" && "exp" in payload && typeof payload.exp === "number") return payload.exp;
  return null;
}

/** Options for {@link createTokenRefreshScheduler}. */
interface TokenRefreshSchedulerOptions {
  /** Obtain the current access token (e.g. read from credentials store). */
  getAccessToken: () => Promise<string | null | undefined>;
  /** Called after a successful refresh with the session id and new token. */
  onRefresh: (sessionId: string, token: string) => void;
  /** Label used as a prefix in log messages (e.g. "remote-bridge"). */
  label: string;
  /** How long before expiry to refresh, in ms. Defaults to {@link DEFAULT_REFRESH_BUFFER_MS}. */
  refreshBufferMs?: number;
}

/** Public surface returned by {@link createTokenRefreshScheduler}. */
interface TokenRefreshScheduler {
  /** Schedule a refresh based on the JWT expiry of the given token. */
  schedule: (sessionId: string, token: string) => void;
  /** Schedule a refresh based on an `expires_in` (seconds) value. */
  scheduleFromExpiresIn: (sessionId: string, expiresInSeconds: number) => void;
  /** Cancel any pending refresh for a single session. */
  cancel: (sessionId: string) => void;
  /** Cancel all pending refreshes across every session. */
  cancelAll: () => void;
}

/**
 * Create a per-session access-token refresh scheduler.
 *
 * The scheduler refreshes each session's token shortly before it expires,
 * retries up to {@link MAX_REFRESH_FAILURES} times on transient "no token"
 * failures, and schedules a periodic follow-up refresh after each success.
 */
function createTokenRefreshScheduler({
  getAccessToken,
  onRefresh,
  label,
  refreshBufferMs = DEFAULT_REFRESH_BUFFER_MS
}: TokenRefreshSchedulerOptions): TokenRefreshScheduler {
  let refreshTimers = new Map<string, ReturnType<typeof setTimeout>>(),
    failureCounts = new Map<string, number>(),
    generations = new Map<string, number>();

  /** Increment and return the generation counter for a session. */
  function bumpGeneration(sessionId: string): number {
    let next = (generations.get(sessionId) ?? 0) + 1;
    return generations.set(sessionId, next), next;
  }

  /** Schedule a refresh based on the JWT expiry of the given token. */
  function schedule(sessionId: string, token: string): void {
    let expiry = getJwtExpiry(token);
    if (!expiry) {
      N(`[${label}:token] Could not decode JWT expiry for sessionId=${sessionId}, token prefix=${token.slice(0, 15)}…, keeping existing timer`);
      return;
    }
    let existingTimer = refreshTimers.get(sessionId);
    if (existingTimer) clearTimeout(existingTimer);
    let generation = bumpGeneration(sessionId),
      expiryIso = new Date(expiry * 1000).toISOString(),
      delayMs = expiry * 1000 - Date.now() - refreshBufferMs;
    if (delayMs <= 0) {
      N(`[${label}:token] Token for sessionId=${sessionId} expires=${expiryIso} (past or within buffer), refreshing immediately`), doRefresh(sessionId, generation);
      return;
    }
    N(`[${label}:token] Scheduled token refresh for sessionId=${sessionId} in ${formatDurationShort(delayMs)} (expires=${expiryIso}, buffer=${refreshBufferMs / 1000}s)`);
    let timer = setTimeout(doRefresh, delayMs, sessionId, generation);
    refreshTimers.set(sessionId, timer);
  }

  /** Schedule a refresh based on an `expires_in` (seconds) value. */
  function scheduleFromExpiresIn(sessionId: string, expiresInSeconds: number): void {
    let existingTimer = refreshTimers.get(sessionId);
    if (existingTimer) clearTimeout(existingTimer);
    let generation = bumpGeneration(sessionId),
      delayMs = Math.max(expiresInSeconds * 1000 - refreshBufferMs, 30000);
    N(`[${label}:token] Scheduled token refresh for sessionId=${sessionId} in ${formatDurationShort(delayMs)} (expires_in=${expiresInSeconds}s, buffer=${refreshBufferMs / 1000}s)`);
    let timer = setTimeout(doRefresh, delayMs, sessionId, generation);
    refreshTimers.set(sessionId, timer);
  }

  /**
   * Perform a refresh for the given session/generation. Skips if a newer
   * generation has superseded this one. On failure (no token) retries with a
   * bounded count; on success notifies `onRefresh` and schedules a follow-up.
   */
  async function doRefresh(sessionId: string, generation: number): Promise<void> {
    let token: string | null | undefined;
    try {
      token = await getAccessToken();
    } catch (error) {
      N(`[${label}:token] getAccessToken threw for sessionId=${sessionId}: ${GH(error)}`, {
        level: "error"
      });
    }
    if (generations.get(sessionId) !== generation) {
      N(`[${label}:token] doRefresh for sessionId=${sessionId} stale (gen ${generation} vs ${generations.get(sessionId)}), skipping`);
      return;
    }
    if (!token) {
      let failures = (failureCounts.get(sessionId) ?? 0) + 1;
      if (failureCounts.set(sessionId, failures), N(`[${label}:token] No OAuth token available for refresh, sessionId=${sessionId} (failure ${failures}/${MAX_REFRESH_FAILURES})`, {
        level: "error"
      }), I6("error", "bridge_token_refresh_no_oauth"), failures < MAX_REFRESH_FAILURES) {
        let retryTimer = setTimeout(doRefresh, REFRESH_RETRY_DELAY_MS, sessionId, generation);
        refreshTimers.set(sessionId, retryTimer);
      }
      return;
    }
    failureCounts.delete(sessionId), N(`[${label}:token] Refreshing token for sessionId=${sessionId}: new token prefix=${token.slice(0, 15)}…`), c("tengu_bridge_token_refreshed", {}), onRefresh(sessionId, token);
    let followupTimer = setTimeout(doRefresh, FOLLOWUP_REFRESH_INTERVAL_MS, sessionId, generation);
    refreshTimers.set(sessionId, followupTimer), N(`[${label}:token] Scheduled follow-up refresh for sessionId=${sessionId} in ${formatDurationShort(FOLLOWUP_REFRESH_INTERVAL_MS)}`);
  }

  /** Cancel any pending refresh for a single session. */
  function cancel(sessionId: string): void {
    bumpGeneration(sessionId);
    let timer = refreshTimers.get(sessionId);
    if (timer) clearTimeout(timer), refreshTimers.delete(sessionId);
    failureCounts.delete(sessionId);
  }

  /** Cancel all pending refreshes across every session. */
  function cancelAll(): void {
    for (let sessionId of generations.keys()) bumpGeneration(sessionId);
    for (let timer of refreshTimers.values()) clearTimeout(timer);
    refreshTimers.clear(), failureCounts.clear();
  }
  return {
    schedule,
    scheduleFromExpiresIn,
    cancel,
    cancelAll
  };
}

/** Default time before expiry to refresh a token (5 minutes). */
var DEFAULT_REFRESH_BUFFER_MS = 300000,
  /** Interval for the periodic follow-up refresh after a success (30 minutes). */
  FOLLOWUP_REFRESH_INTERVAL_MS = 1800000,
  /** Maximum consecutive "no token" failures before giving up. */
  MAX_REFRESH_FAILURES = 3,
  /** Delay before retrying after a transient "no token" failure (1 minute). */
  REFRESH_RETRY_DELAY_MS = 60000;

/** Lazy module initializer: pulls in this module's cross-module dependencies. */
var enH = L(() => {
  y_();
  FH();
  L$();
  L_();
  H6();
});
export {formatDurationShort as WHr,decodeJwtPayload as _Bs,getJwtExpiry as GHr,createTokenRefreshScheduler as Bdn,DEFAULT_REFRESH_BUFFER_MS as LBu,FOLLOWUP_REFRESH_INTERVAL_MS as hBs,MAX_REFRESH_FAILURES as gBs,REFRESH_RETRY_DELAY_MS as MBu,enH as VJe};
