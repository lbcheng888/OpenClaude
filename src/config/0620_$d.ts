// @ts-nocheck
import {nt as q_} from "../../vendor/m127.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "./0137_namespace.ts";
/**
 * Non-essential traffic and telemetry mode helpers.
 *
 * Determines whether network telemetry/analytics features should be suppressed
 * based on environment variables:
 *   - `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` – disables all non-essential
 *     network traffic (strongest gate, implies `no-telemetry`).
 *   - `DISABLE_TELEMETRY` – disables telemetry only.
 *   - `DO_NOT_TRACK` – standard DNT signal; checked via `q_` (parseBoolEnv).
 *
 * Lazy-bundle init handle: `ZO` (depends on `A6`).
 */

// ---------------------------------------------------------------------------
// Cross-module symbols (kept AS-IS to preserve linkage)
// ---------------------------------------------------------------------------
//   q_  : parseBoolEnv  – parses an env-var string as a boolean
//   A6  : lazy-bundle init for the config namespace module
//   L   : lazy-bundle factory
// ---------------------------------------------------------------------------

declare function q_(value: string | undefined): boolean;
declare function A6(): void;
declare function L(init: () => void): () => void;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Traffic mode token returned by `getTrafficMode`. */
type TrafficMode = "essential-traffic" | "no-telemetry" | "default";

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Returns a token describing the current traffic-restriction mode:
 * - `"essential-traffic"` – `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is set.
 * - `"no-telemetry"`      – `DISABLE_TELEMETRY` or `DO_NOT_TRACK` is set.
 * - `"default"`           – no restrictions are active.
 */
function Sdq(): TrafficMode {
  if (process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return "essential-traffic";
  if (process.env.DISABLE_TELEMETRY) return "no-telemetry";
  if (q_(process.env.DO_NOT_TRACK)) return "no-telemetry";
  return "default";
}

/**
 * Returns `true` when all non-essential network traffic is disabled
 * (`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is set).
 */
function KK(): boolean {
  return Sdq() === "essential-traffic";
}

/**
 * Returns `true` when telemetry is disabled in any form — i.e. the traffic
 * mode is anything other than `"default"`.
 */
function eNH(): boolean {
  return Sdq() !== "default";
}

/**
 * Returns the name of the environment variable that disabled non-essential
 * traffic, or `null` if the feature is not restricted.
 *
 * Only reflects `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`; narrower
 * telemetry-only flags are not included here.
 */
function VdH(): string | null {
  if (process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC";
  return null;
}

/**
 * Returns the name of the environment variable that caused telemetry to be
 * disabled, or `null` if telemetry is active.
 *
 * Priority:
 * 1. `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`
 * 2. `DISABLE_TELEMETRY`
 * 3. `DO_NOT_TRACK`
 */
function Vs_(): string | null {
  if (process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC";
  if (process.env.DISABLE_TELEMETRY) return "DISABLE_TELEMETRY";
  if (q_(process.env.DO_NOT_TRACK)) return "DO_NOT_TRACK";
  return null;
}

// ---------------------------------------------------------------------------
// Lazy-bundle initialiser
// ---------------------------------------------------------------------------

/** Lazy-bundle init handle for the traffic-mode / telemetry-disable module. */
var ZO = L(() => {
  A6();
});
export {Sdq as Xns,KK as Vi,eNH as H1e,VdH as pje,Vs_ as vrn,ZO as $d};
