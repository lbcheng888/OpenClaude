// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,jn as t6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {hasBridgeEntitlement as IxH,isRunningInRemoteEnvironment as rQ,getBridgeEntitlementBlocker as To8,describeAuthPrecedenceBlocker as bR6,pH as sG} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {isFirstPartyProvider as Y1,Ps as $7} from "../api/1287_usesFirstPartyModelIds.ts";
import {getAuthTokenSource as n0,describeHowToDisableAuthTokenSource as NSH,lo as Xq} from "./2036_withOAuthRefreshLock.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function getBughunterConfig() {
  return j_("tengu_review_bughunter_config", null);
}
function getBughunterCostNote() {
  let costNote = getBughunterConfig()?.cost_note;
  return typeof costNote === "string" && costNote.length > 0 ? costNote : "$10-$20";
}
function getBughunterDurationNote() {
  let durationNote = getBughunterConfig()?.duration_note;
  return typeof durationNote === "string" && durationNote.length > 0 ? durationNote : "~10\u201320 min";
}
function getBughunterModel() {
  let model = getBughunterConfig()?.model;
  return typeof model === "string" && model.length > 0 ? model : undefined;
}
function getBughunterDiffLimits() {
  let config = getBughunterConfig(),
    clampPositiveInt = (raw, fallback) => typeof raw === "number" && Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : fallback;
  return {
    maxFiles: clampPositiveInt(config?.max_diff_files, 500),
    maxLines: clampPositiveInt(config?.max_diff_lines, 8000)
  };
}
function isUltraReviewAvailable() {
  return isUltraReviewEnabled() && IxH();
}
function isUltraReviewEnabled() {
  return getBughunterConfig()?.enabled === true && Y1() && !rQ();
}
function getUltraReviewUnavailableReason() {
  if (!isUltraReviewEnabled() || isUltraReviewAvailable()) return null;
  switch (To8()) {
    case "api_key_auth":
      return `${bR6({
        prefix: "ultra (cloud review) requires claude.ai account auth.",
        suffix: "to use ultra."
      })} See https://code.claude.com/docs/en/ultrareview.`;
    case "no_profile_scope":
      {
        let {
          source: source
        } = n0();
        if (source === "CLAUDE_CODE_OAUTH_TOKEN") return `ultra (cloud review) requires a full-scope login token. ${NSH(source)} Then run \`claude auth login\` to use it; see https://code.claude.com/docs/en/ultrareview.`;
        return "ultra (cloud review) requires a full-scope login token \u2014 run `claude auth login` to use it; see https://code.claude.com/docs/en/ultrareview.";
      }
    case "not_in_rollout":
      return "ultra (cloud review) isn't enabled for your account yet \u2014 run `claude auth login` to refresh your entitlements; see https://code.claude.com/docs/en/ultrareview.";
    default:
      return "ultra (cloud review) requires a claude.ai account \u2014 sign in to claude.ai to use it; see https://code.claude.com/docs/en/ultrareview.";
  }
}
var k0H = L(() => {
  sG();
  t6();
  Xq();
  $7();
});
export {getBughunterConfig as C6e,getBughunterCostNote as A6e,getBughunterDurationNote as Rte,getBughunterModel as S9a,getBughunterDiffLimits as Jdo,isUltraReviewAvailable as fG,isUltraReviewEnabled as pdt,getUltraReviewUnavailableReason as N9n,k0H as uxe};
