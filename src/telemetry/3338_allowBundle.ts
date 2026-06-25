// @ts-nocheck
import {isPolicyAllowed as ii,Bu as sd} from "../../vendor/m2213.ts";
import {Pt as Bt,He,xe as Pe,mn as cn} from "./0600_feature_name.ts";
import {FOn as l0n,pga as jaa,fat as Yot,L3e as Z$e,bIe as gke} from "./3337_ignoreUntracked.ts";
import {detectCurrentRepositoryWithHost as BM,_0 as XI} from "../../vendor/m697.ts";
import {getInitialSettings as Kr,br as Er} from "../config/0745_updateSettingsForSource.ts";
import {NOn as a0n,nle as Vae} from "../core/3336_environment_id.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {checkGate_CACHED_OR_BLOCKING as YB,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {isTmuxControlMode as Pt,Po as Ko} from "../../vendor/m638.ts";
import {findGitRoot as Ou,ia as Ba} from "../../vendor/m698.ts";
import {b} from "../../runtime.ts";
import {dn as an} from "../config/0137_namespace.ts";
// @ts-nocheck
async function DyK({
  allowBundle = false,
  cwd: cwd
} = {}) {
  let errors = [];
  if (!ii("allow_remote_sessions")) return errors.push({
    type: "policy_blocked"
  }), Bt("bg_remote_eligibility_check", "policy_blocked"), errors;
  let [isLoggedOut, gitRemote] = await Promise.all([l0n(), BM(cwd)]),
    environments = null;
  if (isLoggedOut) errors.push({
    type: "not_logged_in"
  });else try {
    environments = await jaa();
  } catch {
    errors.push({
      type: "not_logged_in"
    });
  }
  let defaultEnvironmentId = Kr()?.remote?.defaultEnvironmentId,
    hasValidEnvironment = a0n(defaultEnvironmentId) || defaultEnvironmentId !== undefined && environments !== null && environments.some(env => env.environment_id === defaultEnvironmentId && env.kind === "byoc"),
    shouldUseBundle = allowBundle && (rt(process.env.CCR_FORCE_BUNDLE) || rt(process.env.CCR_ENABLE_BUNDLE) || (await YB("tengu_ccr_bundle_seed_enabled")));
  if (!(await Yot(cwd))) errors.push({
    type: "not_in_git_repo",
    cwd: cwd ?? Pt()
  });else if (shouldUseBundle && Ou(cwd ?? Pt()) !== null) ;else if (gitRemote === null) errors.push({
    type: "no_git_remote"
  });else if (!hasValidEnvironment && gitRemote.host === "github.com") {
    if (!(await Z$e(gitRemote.owner, gitRemote.name))) errors.push({
      type: "github_app_not_installed"
    });
  }
  if (errors.length === 0) He("bg_remote_eligibility_check");else Pe("bg_remote_eligibility_check", errors[0].type);
  return errors;
}
var MyK = b(() => {
  cn();
  Yn();
  sd();
  Ko();
  XI();
  an();
  Ba();
  Er();
  Vae();
  gke();
});
export {DyK as fga,MyK as hga};
