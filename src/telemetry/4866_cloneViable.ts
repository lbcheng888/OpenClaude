// @ts-nocheck
import {detectCurrentRepositoryWithHost as PI,_0 as Vh} from "../../vendor/m697.ts";
import {checkGate_CACHED_OR_BLOCKING as rS,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {findGitRoot as V5,ia as gK} from "../../vendor/m698.ts";
import {isTmuxControlMode as u_,Po as Fq} from "../../vendor/m638.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {L3e as ZmH,bIe as JGH} from "./3337_ignoreUntracked.ts";
import {b as L} from "../../runtime.ts";
import {dn as A6} from "../config/0137_namespace.ts";
/** Shape returned by {@link s3_}. */
interface CloneViabilityResult {
  /** Whether the current git repo can be cloned by the CCR bundle-seed path. */
  cloneViable: boolean;
  /**
   * Whether the bundle-seed feature is enabled at all (via env-var or feature
   * flag).  When false, cloneViable is always false and the caller should not
   * offer the bundle upload path.
   */
  bundleSeedEnabled: boolean;
}

/**
 * Determines whether the CCR (Cloud Code Remote) bundle-seed path is both
 * enabled and viable for the current working directory.
 *
 * - `bundleSeedEnabled` is true when `CCR_ENABLE_BUNDLE` env-var is set **or**
 *   the `tengu_ccr_bundle_seed_enabled` feature flag is on, **and** a Git
 *   bundle path exists in the cwd (`V5(u_()) !== null`).
 * - `cloneViable` is true when a git remote is detectable **and** either the
 *   remote is not on github.com, or the GitHub App is confirmed installed on
 *   the repo.
 *
 * Emits no telemetry of its own; callers are responsible for event logging.
 */
async function s3_(): Promise<CloneViabilityResult> {
  let [gitRemote, bundleSeedFlag] = await Promise.all([PI(), rS("tengu_ccr_bundle_seed_enabled")]),
    bundleSeedEnabled = V5(u_()) !== null && (q_(process.env.CCR_ENABLE_BUNDLE) || bundleSeedFlag);
  if (!bundleSeedEnabled) return {
    cloneViable: !1,
    bundleSeedEnabled: bundleSeedEnabled
  };
  return {
    cloneViable: gitRemote !== null && (gitRemote.host !== "github.com" || (await ZmH(gitRemote.owner, gitRemote.name))),
    bundleSeedEnabled: bundleSeedEnabled
  };
}

/** Lazy-init bundle for this module's dependencies. */
var eF6 = L(() => {
  o6();
  Fq();
  Vh();
  A6();
  gK();
  JGH();
});
export {s3_ as pgt,eF6 as Rjn};
