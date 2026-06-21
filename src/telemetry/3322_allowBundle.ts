// @ts-nocheck
import {isPolicyAllowed as ii,rd as sd} from "../../vendor/m2205.ts";
import {isTmuxControlMode as Bt,Ie as He,Oe as Pe,ln as cn} from "./0594_feature_name.ts";
import {K0n as l0n,nca as jaa,Ast as Yot,C9e as Z$e,Oke as gke} from "./3321_ignoreUntracked.ts";
import {detectCurrentRepositoryWithHost as BM,ZI as XI} from "../../vendor/m692.ts";
import {getInitialSettings as Kr,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {V0n as a0n,rle as Vae} from "../core/3320_environment_id.ts";
import {st as rt} from "../../vendor/m5.ts";
import {checkGate_CACHED_OR_BLOCKING as YB,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {findGitRoot as Ou,Ba} from "../../vendor/m693.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "../config/0047_namespace.ts";
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

export {DyK as oca,MyK as sca};
