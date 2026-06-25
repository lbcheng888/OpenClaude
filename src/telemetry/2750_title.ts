// @ts-nocheck
import {Hkt,WS} from "../api/1453_month.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Tl,mn} from "./0600_feature_name.ts";
import {isClaudeAISubscriber as Eo,Vv,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {withOAuth401Retry as N0,kk} from "../api/2037_withOAuth401Retry.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Vs,lT} from "../../vendor/m2195.ts";
import {b} from "../../runtime.ts";
/**
 * Usage / rate-limit utilization telemetry helpers.
 *
 * Fetches the OAuth usage report from the Anthropic API and shapes it into
 * the per-model / per-week utilization rows surfaced in the status UI.
 */

/** A single limit entry coming back from the usage report. */
interface UsageLimitEntry {
  /** Whether this limit feature is currently enabled. */
  is_enabled?: boolean;
  /** Reason the limit is disabled, when applicable. */
  disabled_reason?: string | null;
}

/**
 * Returns whether a usage limit entry should be treated as active.
 * Active if explicitly enabled, otherwise defers to the disabled-reason check.
 */
function wHn(limitEntry?: UsageLimitEntry): boolean {
  if (limitEntry?.is_enabled === !0) return !0;
  return Hkt(limitEntry?.disabled_reason ?? null);
}

/**
 * Reads the configured list of model display names that are included in the
 * usage-overage allowance, filtering out any non-string config values.
 */
function Mke(): string[] {
  let overageModels = it(t1d, []);
  return Array.isArray(overageModels) ? overageModels.filter(modelName => typeof modelName === "string") : [];
}

/** A weekly-scoped utilization record from the usage report. */
interface WeeklyScopedUsage {
  kind: string;
  scope?: { model?: { display_name: string } };
  percent: number;
  resets_at: string;
}

/**
 * Selects the weekly-scoped usage rows whose model matches one of the given
 * display names and maps them into title/limit rows for the UI.
 */
function cot(usageRecords: WeeklyScopedUsage[] | undefined, modelDisplayNames: string[]) {
  let normalizedNames = modelDisplayNames.map(name => name.toLowerCase());
  if (normalizedNames.length === 0) return [];
  return (usageRecords ?? []).filter(record => record.kind === "weekly_scoped" && record.scope?.model && normalizedNames.includes(record.scope.model.display_name.toLowerCase())).map(record => ({
    title: `Current week (${record.scope?.model?.display_name})`,
    limit: {
      utilization: record.percent,
      resets_at: record.resets_at
    }
  }));
}

/**
 * Fetches the current OAuth usage report from the API, retrying on auth
 * expiry (401 -> refresh -> retry). Returns the report payload, or `{}` when
 * usage reporting is not applicable for the current session.
 */
async function bae() {
  return Tl("api_usage_fetch", async () => {
    if (!Eo() || !Vv()) return {};
    let attemptCount = 0,
      response = await N0(async () => {
        attemptCount++, A(`fetchUtilization: GET /api/oauth/usage (attempt ${attemptCount})`);
        let httpResponse = await Vs.get("/api/oauth/usage", {
          timeout: 5000,
          headers: {
            "Content-Type": "application/json"
          },
          refreshOAuth: !0
        });
        if (!httpResponse.ok) throw Error(`Auth error: ${httpResponse.reason === "no-auth" ? httpResponse.detail : httpResponse.reason}`);
        return httpResponse;
      });
    return A(`fetchUtilization: 200 after ${attemptCount} attempt(s)${attemptCount > 1 ? " (401→refresh→retry succeeded)" : ""}`), response.data;
  });
}

/** Config key for the list of models included in the usage-overage allowance. */
var t1d = "tengu_usage_overage_included_models";

/** Lazy module initializer wiring up the usage-telemetry dependencies. */
var _ge = b(() => {
  lo();
  qe();
  WS();
  kk();
  mn();
  jn();
  lT();
});

export {wHn,Mke,cot,bae,t1d,_ge};
