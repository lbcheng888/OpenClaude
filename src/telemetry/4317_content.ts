// @ts-nocheck
import {Vi as KK,$d as ZO} from "../config/0620_$d.ts";
import {isPolicyAllowed as Y7,Bu as i5} from "../../vendor/m2213.ts";
import {hasStoredOAuthToken as LG,lo as Mq} from "../config/2036_withOAuthRefreshLock.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Vs as _7,lT as rf} from "../../vendor/m2195.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {b as L} from "../../runtime.ts";
import {Sc as u1,OAUTH_BETA_HEADER as zG} from "../api/0465_getOauthConfig.ts";
// Team Onboarding Guide API — CRUD operations for org-scoped onboarding guides.
// Fires tengu_* telemetry events on create/update/delete.

/** API response wrapper returned by the onboarding endpoints. */
interface OnboardingResponse<T> {
  ok: boolean;
  reason?: string;
  detail?: string;
  data: T;
}

/** A single onboarding guide record returned by the API. */
interface OnboardingGuide {
  short_code: string;
  share_url: string;
  updated_at: string;
  [key: string]: unknown;
}

/** Returns true when the team-onboarding share feature is fully enabled for the current session. */
function P1_(): boolean {
  if (KK()) return !1;
  if (!Y7("allow_team_onboarding")) return !1;
  if (!LG()) return !1;
  return Y_("tengu_flint_harbor_share", !1);
}

/**
 * Unwraps an onboarding API response, throwing a descriptive error on failure.
 * @returns The `data` field of a successful response.
 */
function unwrapOnboardingResponse<T>(response: OnboardingResponse<T>): T {
  if (!response.ok) throw Error(response.reason === "no-auth" ? response.detail : `Onboarding guide unavailable: ${response.reason}`);
  return response.data;
}

/** Asserts the `allow_team_onboarding` policy flag is set; throws if not. */
function assertTeamOnboardingPolicy(): void {
  if (!Y7("allow_team_onboarding")) throw Error("Onboarding guide unavailable: policy-disabled");
}

/**
 * Creates a new onboarding guide for the current org.
 * Fires `tengu_team_onboarding_share_created`.
 * @param content - Markdown content of the guide.
 * @param name - Display name for the guide.
 */
async function aBK(content: string, name: string): Promise<OnboardingGuide> {
  assertTeamOnboardingPolicy();
  let apiResponse = await _7.post("/api/organizations/:orgUUID/claude_code/onboarding", {
      content: content,
      name: name
    }, onboardingRequestOptions),
    guide = unwrapOnboardingResponse(apiResponse);
  return c("tengu_team_onboarding_share_created", {}), guide;
}

/**
 * Updates an existing onboarding guide by short code.
 * Fires `tengu_team_onboarding_share_updated`.
 * @param shortCode - The short code identifying the guide to update.
 * @param content - New markdown content.
 */
async function z4q(shortCode: string, content: string): Promise<OnboardingGuide> {
  assertTeamOnboardingPolicy();
  let apiResponse = await _7.put(`/api/organizations/:orgUUID/claude_code/onboarding/${encodeURIComponent(shortCode)}`, {
      content: content
    }, onboardingRequestOptions),
    guide = unwrapOnboardingResponse(apiResponse);
  return c("tengu_team_onboarding_share_updated", {}), guide;
}

/**
 * Deletes an onboarding guide by short code.
 * Fires `tengu_team_onboarding_share_deleted`.
 * @param shortCode - The short code identifying the guide to delete.
 */
async function sBK(shortCode: string): Promise<void> {
  assertTeamOnboardingPolicy();
  let deleteResponse = await _7.delete(`/api/organizations/:orgUUID/claude_code/onboarding/${encodeURIComponent(shortCode)}`, onboardingRequestOptions);
  unwrapOnboardingResponse(deleteResponse), c("tengu_team_onboarding_share_deleted", {});
}

/**
 * Lists all onboarding guides for the current org.
 * @returns Array of guide records.
 */
async function $4q(): Promise<OnboardingGuide[]> {
  assertTeamOnboardingPolicy();
  let listResponse = await _7.get("/api/organizations/:orgUUID/claude_code/onboarding", onboardingRequestOptions);
  return unwrapOnboardingResponse(listResponse).guides;
}
var ONBOARDING_TIMEOUT_MS = 1e4,
  onboardingRequestOptions: {
    auth: string;
    timeout: number;
    headers: Record<string, string>;
  };

/** Lazy module initializer — sets up `onboardingRequestOptions` with auth, timeout, and beta header. */
var pI6 = L(() => {
  u1();
  Mq();
  ZO();
  o6();
  y_();
  rf();
  i5();
  onboardingRequestOptions = {
    auth: "teleport-org",
    timeout: ONBOARDING_TIMEOUT_MS,
    headers: {
      "anthropic-beta": zG
    }
  };
});
export {P1_ as gmt,unwrapOnboardingResponse as P5n,assertTeamOnboardingPolicy as O5n,aBK as rZa,z4q as fyo,sBK as oZa,$4q as hyo,ONBOARDING_TIMEOUT_MS as e3p,onboardingRequestOptions as D5n,pI6 as L5n};
