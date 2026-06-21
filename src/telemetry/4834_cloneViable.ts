// @ts-nocheck
import {detectCurrentRepositoryWithHost as PI,ZI as Vh} from "../../vendor/m692.ts";
import {checkGate_CACHED_OR_BLOCKING as rS,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {findGitRoot as V5,Ba as gK} from "../../vendor/m693.ts";
import {Pt as u_,Go as Fq} from "../../vendor/m632.ts";
import {st as q_} from "../../vendor/m5.ts";
import {C9e as ZmH,Oke as JGH} from "./3321_ignoreUntracked.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "../config/0047_namespace.ts";
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
  let [gitRemote, bundleSeedFlag] = await Promise.all([
      PI(),
      rS("tengu_ccr_bundle_seed_enabled"),
    ]),
    bundleSeedEnabled =
      V5(u_()) !== null &&
      (q_(process.env.CCR_ENABLE_BUNDLE) || bundleSeedFlag);

  if (!bundleSeedEnabled)
    return {
      cloneViable: !1,
      bundleSeedEnabled: bundleSeedEnabled,
    };

  return {
    cloneViable:
      gitRemote !== null &&
      (gitRemote.host !== "github.com" ||
        (await ZmH(gitRemote.owner, gitRemote.name))),
    bundleSeedEnabled: bundleSeedEnabled,
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

export {s3_ as Zmt,eF6 as MGn};
