// @ts-nocheck
import {qt as d_,tn as H6} from "./0230_encoding.ts";
import {Vs as _7,lT as rf} from "../../vendor/m2195.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {Pt as n_,He as vH,mn as M6} from "../telemetry/0600_feature_name.ts";
import {b as L} from "../../runtime.ts";
import {MS as r2} from "../../vendor/m460.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {jt as k6} from "../../vendor/m253.ts";
/**
 * Ultrareview preflight check.
 *
 * Fetches the /v1/ultrareview/preflight endpoint to determine whether the
 * Ultrareview feature is available for the current user/org, and returns a
 * typed result describing the action to take (proceed / confirm / blocked).
 */

/** Builds a blocked-action result with a human-readable message and reason code. */
function makeBlockedResult(message: string, reason: string): UltrareviewPreflightData {
  return {
    action: "blocked",
    blocked: {
      message,
      action_url: null,
      reason
    }
  };
}

/** Fetches the Ultrareview preflight status from the API or fixture. */
async function fetchUltrareviewPreflight(): Promise<UltrareviewPreflightData | null> {
  let fixtureJson = process.env.CLAUDE_CODE_ULTRAREVIEW_PREFLIGHT_FIXTURE;
  if (fixtureJson) {
    let parseResult = getUltrareviewPreflightSchema().safeParse(d_(fixtureJson));
    return parseResult.success ? parseResult.data : null;
  }
  try {
    let response = await _7.get("/v1/ultrareview/preflight", {
      auth: "teleport-org",
      timeout: 5000
    });
    if (!response.ok) switch (response.reason) {
      case "essential-traffic-only":
        return makeBlockedResult("Ultrareview runs in Claude Code on the web and is unavailable when essential-traffic-only mode is active.", "zdr");
      case "data-residency":
        return makeBlockedResult("Ultrareview runs in Claude Code on the web and is unavailable on third-party providers.", "data_residency");
      case "no-auth":
        return makeBlockedResult("Ultrareview requires a Claude.ai account. Run /login to authenticate.", "no_oauth_token");
    }
    let schemaResult = getUltrareviewPreflightSchema().safeParse(response.data);
    if (!schemaResult.success) return N(`fetchUltrareviewPreflight schema mismatch: ${schemaResult.error.message}`), n_("api_ultrareview_preflight", "schema_mismatch"), null;
    return vH("api_ultrareview_preflight"), schemaResult.data;
  } catch (err) {
    return N(`fetchUltrareviewPreflight failed: ${err}`), n_("api_ultrareview_preflight", "request_failed"), null;
  }
}

// ---------------------------------------------------------------------------
// Types (inferred from zod schema below)
// ---------------------------------------------------------------------------

/** Parsed response shape returned by the /v1/ultrareview/preflight endpoint. */
interface UltrareviewPreflightData {
  action: "proceed" | "confirm" | "blocked";
  billing_note?: string | null;
  confirm?: {
    title?: string;
    body: string;
  } | null;
  blocked?: {
    message: string;
    action_url: string | null;
    reason?: string;
  } | null;
}

// ---------------------------------------------------------------------------
// Lazy-initialised zod schema
// ---------------------------------------------------------------------------

var getUltrareviewPreflightSchema: () => import("zod").ZodType<UltrareviewPreflightData>;
var initUltrareviewPreflightModule = L(() => {
  r2();
  FH();
  H6();
  M6();
  rf();
  getUltrareviewPreflightSchema = kH(() => k6.object({
    action: k6.enum(["proceed", "confirm", "blocked"]),
    billing_note: k6.string().nullable().optional(),
    confirm: k6.object({
      title: k6.string().optional(),
      body: k6.string()
    }).nullable().optional(),
    blocked: k6.object({
      message: k6.string(),
      action_url: k6.string().nullable(),
      reason: k6.string().optional()
    }).nullable().optional()
  }));
});
export {makeBlockedResult as eIo,fetchUltrareviewPreflight as BHl,getUltrareviewPreflightSchema as FHl,initUltrareviewPreflightModule as UHl};
