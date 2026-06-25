// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {hasBridgeEntitlement as aIH,pH as yL} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {getIsRemoteMode as VK,lt as w_} from "../session/0132_sent.ts";
import {b as L} from "../../runtime.ts";
// ---------------------------------------------------------------------------
// Ultraplan feature-flag gate (bundle id 4811, export `fB_`).
//
// Exposes a single predicate, `L1H` (isUltraplanEnabled), which returns true
// only when ALL three conditions hold:
//   1. The `tengu_ultraplan_config` GrowthBook flag has `enabled: true`.
//   2. `aIH()` — the user holds the required entitlement (cloud/ultraplan).
//   3. `!VK()` — the session is NOT a remote/SSH/container session.
//
// Cross-module linkage symbols (preserved AS-IS):
//   Y_   – getFeatureFlag (GrowthBook feature lookup with typed default)
//   aIH  – isUltraplanEntitled / user entitlement check  // FIXME: unverified name
//   VK   – isRemoteSession (true when SSH, CLAUDE_CODE_REMOTE, or VK context)
//   L    – lazy module initializer factory (esbuild __esm)
//   w_   – init_thunk for the config/auth subsystem
//   yL   – init_thunk for the feature-flag subsystem
//   o6   – init_thunk for the GrowthBook subsystem
// ---------------------------------------------------------------------------

declare function Y_<T>(key: string, defaultValue: T): T;
declare function aIH(): boolean; // FIXME: unverified name
declare function VK(): boolean;
declare function L(body: () => void): () => void;
declare function w_(): void;
declare function yL(): void;
declare function o6(): void;

/** Returns `true` when the ultraplan feature is enabled, the user is entitled, and the session is not remote. */
function L1H(): boolean {
  return Y_("tengu_ultraplan_config", null)?.enabled === !0 && aIH() && !VK();
}

/** Lazy module initializer — forces the config, feature-flag, and GrowthBook subsystems to initialize. */
var fB_ = L(() => {
  w_();
  yL();
  o6();
});
export {L1H as wue,fB_ as EGt};
