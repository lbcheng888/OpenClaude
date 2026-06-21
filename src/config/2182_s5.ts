// @ts-nocheck
import {st as q_} from "../../vendor/m5.ts";
import {isFirstPartyProvider as i1,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {getGatewayAuth as Tw,lt as w_} from "../session/0131_sent.ts";
import {MMe as eNH,Ap as ZO} from "./0614_Ap.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
/**
 * First-party telemetry / Datadog eligibility predicates.
 *
 * Exposes three query functions that callers use to decide whether
 * telemetry (especially first-party 1P event logging and Datadog) should be
 * active for the current session, plus two helpers that gate the feedback
 * survey on the same conditions.
 *
 * Lazy-bundle init handle: `mF` (depends on `w_`, `A6`, `V7`, `ZO`).
 */

// ---------------------------------------------------------------------------
// Cross-module symbols (kept AS-IS to preserve linkage)
// ---------------------------------------------------------------------------
//   q_  : parseBoolEnv  – parses an env-var string as a boolean
//   i1  : isFirstPartyProvider() – true when provider === "firstParty"
//   Tw  : getGatewayConfig() – returns { url, jwt } when running via a gateway, else undefined
//   eNH : isTelemetryDisabled() – true when any traffic-restriction mode is active (not "default")
//   w_  : lazy-bundle init for session module
//   A6  : lazy-bundle init for config namespace module
//   V7  : lazy-bundle init for api-provider module
//   ZO  : lazy-bundle init for traffic-mode / telemetry-disable module
//   L   : lazy-bundle factory

declare function q_(value: string | undefined): boolean;
declare function i1(): boolean;
declare function Tw(): { url: string; jwt: string } | undefined;
declare function eNH(): boolean;
declare function w_(): void;
declare function A6(): void;
declare function V7(): void;
declare function ZO(): void;
declare function L(init: () => void): () => void;

// ---------------------------------------------------------------------------
// Exported predicate functions
// ---------------------------------------------------------------------------

/**
 * Returns `true` when first-party telemetry should be suppressed because the
 * host manages the provider, OR because the active API provider is not the
 * first-party Anthropic backend.
 *
 * Concretely:
 *   - If `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` is set → returns `false`
 *     (the host takes responsibility; no suppression needed from Claude Code).
 *   - Otherwise → returns `!isFirstPartyProvider()`, i.e. `true` for any
 *     third-party provider (Bedrock, Vertex, Foundry, …).
 */
function GR5(): boolean {
  if (q_(process.env.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST)) return !1;
  return !i1();
}

/**
 * Returns `true` when the current deployment is a BYOC ("bring your own
 * cloud") environment that has NOT opted into Datadog logging
 * (`CLAUDE_CODE_BYOC_ENABLE_DATADOG` is falsy).
 *
 * Used to suppress Datadog shipping in BYOC tenants that have not explicitly
 * enabled it.
 */
function WF9(): boolean {
  return process.env.CLAUDE_CODE_ENVIRONMENT_KIND === "byoc" && !q_(process.env.CLAUDE_CODE_BYOC_ENABLE_DATADOG);
}

/**
 * Returns `true` when first-party 1P event logging (and Datadog) should be
 * disabled for this session.  True in any of the following cases:
 *   - The provider is third-party and not host-managed (`GR5()`)
 *   - The session is running behind a cloud gateway (`Tw() !== null`)
 *   - Telemetry has been disabled via environment variable (`eNH()`)
 */
function CI(): boolean {
  return GR5() || Tw() !== null || eNH();
}

/**
 * Returns `true` when the feedback survey has been forcibly enabled for OTEL
 * scenarios via `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL`.
 *
 * This acts as an override that makes the survey appear even in environments
 * where telemetry would normally suppress it.
 */
function ZOH(): boolean {
  return q_(process.env.CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL);
}

/**
 * Returns `true` when the feedback survey should be globally suppressed
 * because telemetry is disabled AND the OTEL override is not active.
 *
 * Equivalent to: `!isFeedbackSurveyOtelOverrideEnabled() && isTelemetryDisabled()`
 */
function GOH(): boolean {
  if (ZOH()) return !1;
  return eNH();
}

// ---------------------------------------------------------------------------
// Lazy-bundle initialiser
// ---------------------------------------------------------------------------

/** Lazy-bundle init handle for the telemetry-eligibility / feedback-survey-gate module. */
var mF = L(() => {
  w_();
  A6();
  V7();
  ZO();
});

export {GR5 as JYu,WF9 as Nmi,CI as u$,ZOH as Sfe,GOH as bfe,mF as s5};
