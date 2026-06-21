// @ts-nocheck
import {isFullscreenWithTTY as j_,ro as b8,b as L} from "../../runtime.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,checkGate_CACHED_OR_BLOCKING as rS,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {zF as pC,dNt as Vy_} from "./5192_waitForPolicyLimitsToLoad.ts";
import {rd as i5,NHt as _2_} from "../../vendor/m2205.ts";
import {X0n as qG6,cca as f9K,v9e as zxH} from "../../vendor/m3325.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Ao as Mq,c$ as nI} from "../config/2031_withOAuthRefreshLock.ts";
import {isFirstPartyProvider as i1,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {dc as p1,U8 as Tn} from "../../vendor/m1480.ts";
import {ra as KK,Ap as ZO} from "../config/0614_Ap.ts";
import {getOauthConfig as F9,Dc as u1} from "../api/0459_getOauthConfig.ts";
import {fo as $q} from "../../vendor/m566.ts";
import {ntn as ps_,qs as y9} from "../../vendor/m635.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {Oe as IH,Ie as vH,ln as M6} from "./0594_feature_name.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {Gp as BO} from "../../vendor/m567.ts";
import {ta as c7,wn as V6} from "../../vendor/m45.ts";
var JG6 = {};
j_(JG6, {
  untrustedDeviceHint: () => untrustedDeviceHint,
  recoverFromUntrustedDevice: () => recoverFromUntrustedDevice,
  readStoredTrustedDeviceToken: () => readStoredTrustedDeviceToken,
  isTrustedDeviceUnenrolled: () => isTrustedDeviceUnenrolled,
  isTrustedDeviceGateEnabled: () => isTrustedDeviceGateEnabled,
  isTrustedDeviceActiveForOrg: () => isTrustedDeviceActiveForOrg,
  isProactiveEnrollmentDisabled: () => isProactiveEnrollmentDisabled,
  getTrustedDeviceUnenrolledReason: () => getTrustedDeviceUnenrolledReason,
  getTrustedDeviceToken: () => getTrustedDeviceToken,
  getAttestationFilterPolicy: () => getAttestationFilterPolicy,
  enrollTrustedDeviceIfNeeded: () => enrollTrustedDeviceIfNeeded,
  enrollTrustedDevice: () => enrollTrustedDevice,
  clearTrustedDeviceTokenCache: () => clearTrustedDeviceTokenCache,
  clearTrustedDeviceToken: () => clearTrustedDeviceToken,
  _resetEnrollBackoffForTesting: () => _resetEnrollBackoffForTesting,
  PROACTIVE_ENROLLMENT_DISABLED_MESSAGE: () => PROACTIVE_ENROLLMENT_DISABLED_MESSAGE
});

/** Returns true if the `tengu_sessions_elevated_auth_disable_proactive_enrollment` feature flag is on. */
function isProactiveEnrollmentDisabled(): boolean {
  return Y_(h9K, !1);
}

/** Returns the policy-limits loader (waits for org policy limits to be available). */
function getPolicyLimitsLoader(): ReturnType<typeof b8> {
  return pC(), b8(Vy_);
}

/** Returns the org policy checker instance. */
function getOrgPolicyChecker(): ReturnType<typeof b8> {
  return i5(), b8(_2_);
}

/** Returns true if the trusted-device feature gate is enabled (flag on AND policy allows it). */
function isTrustedDeviceGateEnabled(): boolean {
  if (!Y_(fG6, !1)) return !1;
  return getOrgPolicyChecker().isPolicyAllowed(yy_);
}

/** Returns true if the trusted-device requirement is actively enforced for this org. */
function isTrustedDeviceActiveForOrg(): boolean {
  if (!Y_(fG6, !1)) return !1;
  return getOrgPolicyChecker().isPolicyEnforced(yy_);
}

/** Returns the attestation filter policy config, or the default empty policy if not enforced. */
function getAttestationFilterPolicy(): unknown {
  if (!Y_("tengu_bridge_attestation_enforce", !1)) return qG6;
  if (!isTrustedDeviceActiveForOrg()) return qG6;
  let rawConfig: unknown = Y_("tengu_bridge_attestation_enforce_config", {});
  return f9K(rawConfig);
}

/** Returns the stored trusted-device token if the gate is enabled, otherwise undefined. */
async function getTrustedDeviceToken(): Promise<string | undefined> {
  if (!isTrustedDeviceGateEnabled()) return;
  return readStoredTrustedDeviceToken();
}

/**
 * Returns true if the org enforces trusted devices but the device is not enrolled
 * (i.e., no stored token).
 */
async function isTrustedDeviceUnenrolled(): Promise<boolean> {
  if (!isTrustedDeviceActiveForOrg()) return !1;
  if (await readStoredTrustedDeviceToken()) return !1;
  return !0;
}

/**
 * Returns the human-readable reason why the device is considered unenrolled,
 * or null if not unenrolled.
 */
async function getTrustedDeviceUnenrolledReason(): Promise<string | null> {
  if (!(await isTrustedDeviceUnenrolled())) return null;
  if (isProactiveEnrollmentDisabled()) return PROACTIVE_ENROLLMENT_DISABLED_MESSAGE;
  return "Your organization requires Trusted Devices for Remote Control, but this device is not enrolled. Please run `/login` in Claude Code to enroll this device.";
}

/** Clears the memoized cache for readStoredTrustedDeviceToken. */
function clearTrustedDeviceTokenCache(): void {
  readStoredTrustedDeviceToken.cache?.clear?.();
}

/** Resets the enrollment backoff timestamp (for use in tests only). */
function _resetEnrollBackoffForTesting(): void {
  enrollBackoffTimestamp = 0;
}

/**
 * Attempts to recover from an untrusted-device 403 response by busting the token cache
 * and, if outside the backoff window, re-enrolling. Returns the new token if it changed.
 */
async function recoverFromUntrustedDevice(staleToken: string): Promise<string | undefined> {
  if (!isTrustedDeviceGateEnabled()) return;
  clearTrustedDeviceTokenCache();
  let currentToken: string | undefined = await getTrustedDeviceToken();
  if (!currentToken || currentToken === staleToken) {
    if (Date.now() - enrollBackoffTimestamp >= ENROLL_BACKOFF_MS)
      enrollBackoffTimestamp = Date.now(),
      await enrollTrustedDevice({
        serverRequested: !0
      }),
      currentToken = await getTrustedDeviceToken();
  }
  if (!currentToken || currentToken === staleToken) return;
  return N("[trusted-device] Token changed after untrusted_device 403 (cache bust or lazy enrollment); caller will retry"), currentToken;
}

/** Returns a short hint message when the device is not enrolled as a trusted device. */
function untrustedDeviceHint(): string {
  if (isProactiveEnrollmentDisabled()) return PROACTIVE_ENROLLMENT_DISABLED_MESSAGE;
  return "this device is not enrolled as a trusted device; run /login to enroll";
}

/**
 * If the device is unenrolled and proactive enrollment is not disabled,
 * attempts a lazy enrollment using the current OAuth token.
 */
async function enrollTrustedDeviceIfNeeded(): Promise<void> {
  if (!(await isTrustedDeviceUnenrolled())) return;
  if (isProactiveEnrollmentDisabled()) return;
  N("[trusted-device] Not enrolled, attempting lazy enrollment with OAuth token"), await enrollTrustedDevice();
}

/** Clears the persisted trusted-device token from the session store. */
function clearTrustedDeviceToken(): void {
  let {
    isClaudeAISubscriber: isClaudeAISubscriber
  } = (Mq(), b8(nI));
  if (!i1() || !isClaudeAISubscriber()) return;
  if (isProactiveEnrollmentDisabled()) return;
  readStoredTrustedDeviceToken.cache?.clear?.(), p1().mutate((state: Record<string, unknown>) => state.trustedDeviceToken ? {
    ...state,
    trustedDeviceToken: void 0
  } : state).catch(() => {});
}

/**
 * Enrolls the current device as a trusted device by posting to the Claude API.
 * Persists the returned device token and emits telemetry on success or failure.
 */
async function enrollTrustedDevice({
  serverRequested: serverRequested = !1
}: { serverRequested?: boolean } = {}): Promise<void> {
  let {
    isClaudeAISubscriber: isClaudeAISubscriber,
    getClaudeAIOAuthTokens: getClaudeAIOAuthTokens,
    checkAndRefreshOAuthTokenIfNeeded: checkAndRefreshOAuthTokenIfNeeded
  } = (Mq(), b8(nI));
  if (!i1() || !isClaudeAISubscriber()) return;
  try {
    if (!(await rS(fG6))) {
      N(`[trusted-device] Gate ${fG6} is off, skipping enrollment`);
      return;
    }
    if (isProactiveEnrollmentDisabled()) {
      N(`[trusted-device] Proactive enrollment disabled via ${h9K}, skipping`);
      return;
    }
    if (process.env.CLAUDE_TRUSTED_DEVICE_TOKEN) {
      N("[trusted-device] CLAUDE_TRUSTED_DEVICE_TOKEN env var is set, skipping enrollment (env var takes precedence)");
      return;
    }
    await getPolicyLimitsLoader().waitForPolicyLimitsToLoad();
    let orgPolicy = getOrgPolicyChecker();
    if (!(serverRequested ? orgPolicy.isPolicyAllowed(yy_) : orgPolicy.isPolicyEnforced(yy_))) {
      N(`[trusted-device] Org has not enabled ${yy_}, skipping enrollment`);
      return;
    }
    if (KK()) {
      N("[trusted-device] Essential traffic only, skipping enrollment");
      return;
    }
    await checkAndRefreshOAuthTokenIfNeeded();
    let accessToken: string | undefined = getClaudeAIOAuthTokens()?.accessToken;
    if (!accessToken) {
      N("[trusted-device] No OAuth token, skipping enrollment");
      return;
    }
    let baseApiUrl: string = F9().BASE_API_URL,
      enrollmentResponse: { status: number; data: Record<string, unknown> };
    try {
      enrollmentResponse = await $q.post(`${baseApiUrl}/api/auth/trusted_devices`, {
        display_name: `Claude Code on ${osModule.hostname()} \xB7 ${ps_("darwin")}`
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        timeout: 1e4,
        validateStatus: (status: number) => status < 500
      });
    } catch (requestErr: unknown) {
      N(`[trusted-device] Enrollment request failed: ${GH(requestErr)}`), IH("bridge_trusted_device_enroll", "request_failed");
      return;
    }
    if (enrollmentResponse.status !== 200 && enrollmentResponse.status !== 201) {
      N(`[trusted-device] Enrollment failed ${enrollmentResponse.status}: ${bH(enrollmentResponse.data).slice(0, 200)}`), IH("bridge_trusted_device_enroll", "http_error");
      return;
    }
    let deviceToken: unknown = enrollmentResponse.data?.device_token;
    if (!deviceToken || typeof deviceToken !== "string") {
      N("[trusted-device] Enrollment response missing device_token field"), IH("bridge_trusted_device_enroll", "missing_token");
      return;
    }
    try {
      let persistResult = await p1().mutate((sessionState: Record<string, unknown>) => ({
        ...sessionState,
        trustedDeviceToken: deviceToken
      }));
      if (!persistResult.success) {
        N(`[trusted-device] Failed to persist token: ${persistResult.warning ?? "unknown"}`), IH("bridge_trusted_device_enroll", "storage_failed");
        return;
      }
      readStoredTrustedDeviceToken.cache?.clear?.(), N(`[trusted-device] Enrolled device_id=${enrollmentResponse.data.device_id ?? "unknown"}`), vH("bridge_trusted_device_enroll");
    } catch (storageErr: unknown) {
      N(`[trusted-device] Storage write failed: ${GH(storageErr)}`), IH("bridge_trusted_device_enroll", "storage_failed");
    }
  } catch (unexpectedErr: unknown) {
    N(`[trusted-device] Enrollment error: ${GH(unexpectedErr)}`), IH("bridge_trusted_device_enroll", "unexpected_error");
  }
}

/** The `os` Node.js module, initialized lazily. */
var osModule: typeof import("os"),
  /** Feature flag name for the trusted-device elevated auth enforcement gate. */
  fG6 = "tengu_sessions_elevated_auth_enforcement",
  /** Policy name for requiring trusted devices in org policy checks. */
  yy_ = "require_trusted_devices",
  /** Feature flag name to disable proactive enrollment. */
  h9K = "tengu_sessions_elevated_auth_disable_proactive_enrollment",
  /** Minimum milliseconds to wait between enrollment attempts (5 minutes). */
  ENROLL_BACKOFF_MS = 300000,
  /** Timestamp of the last enrollment attempt, used for backoff. */
  enrollBackoffTimestamp = 0,
  /** Message shown when proactive enrollment is disabled by feature flag. */
  PROACTIVE_ENROLLMENT_DISABLED_MESSAGE = "Your organization requires Trusted Devices for Remote Control, but enrollment is temporarily disabled. Please try again later, or contact your administrator.",
  /** Memoized async function that reads the stored trusted-device token. */
  readStoredTrustedDeviceToken: (() => Promise<string | undefined>) & { cache?: Map<unknown, unknown> };

var hr = L(() => {
  BO();
  c7();
  u1();
  M6();
  o6();
  FH();
  L_();
  V7();
  y9();
  ZO();
  Tn();
  H6();
  zxH();
  osModule = require("os");
  readStoredTrustedDeviceToken = V6(async () => {
    let envToken: string | undefined = process.env.CLAUDE_TRUSTED_DEVICE_TOKEN;
    if (envToken) return envToken;
    return (await p1().readAsync())?.trustedDeviceToken;
  });
});

export {JG6 as tDn,isProactiveEnrollmentDisabled,getPolicyLimitsLoader as oGd,getOrgPolicyChecker as YJr,isTrustedDeviceGateEnabled,isTrustedDeviceActiveForOrg,getAttestationFilterPolicy,getTrustedDeviceToken,isTrustedDeviceUnenrolled,getTrustedDeviceUnenrolledReason,clearTrustedDeviceTokenCache,_resetEnrollBackoffForTesting,recoverFromUntrustedDevice,untrustedDeviceHint,enrollTrustedDeviceIfNeeded,clearTrustedDeviceToken,enrollTrustedDevice,osModule as pca,fG6 as Z0n,yy_ as iNt,h9K as mca,ENROLL_BACKOFF_MS as rGd,enrollBackoffTimestamp as zJr,PROACTIVE_ENROLLMENT_DISABLED_MESSAGE,readStoredTrustedDeviceToken,hr as lY};
