// @ts-nocheck
import {getAPIProvider as Hr,Ps as si} from "../api/1287_usesFirstPartyModelIds.ts";
import {isProSubscriber as lme,isMaxSubscriber as Woe,isTeamPremiumSubscriber as NEe,lo as mo} from "../config/2036_withOAuthRefreshLock.ts";
import {getSettingsForSource as Cn,ao,br as Er} from "../config/0745_updateSettingsForSource.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {He,mn as cn} from "./0600_feature_name.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function migrateSonnet45ToSonnet46() {
  if (Hr() !== "firstParty") return;
  if (!lme() && !Woe() && !NEe()) return;
  let currentModel = Cn("userSettings")?.model;
  if (currentModel !== "claude-sonnet-4-5-20250929" && currentModel !== "claude-sonnet-4-5-20250929[1m]" && currentModel !== "sonnet-4-5-20250929" && currentModel !== "sonnet-4-5-20250929[1m]") return;
  let has1mTag = currentModel.endsWith("[1m]");
  if (ao("userSettings", {
    model: has1mTag ? "sonnet[1m]" : "sonnet"
  }), vt().numStartups > 1) un(K => ({
    ...K,
    sonnet45To46MigrationTimestamp: Date.now()
  }));
  j("tengu_sonnet45_to_46_migration", {
    from_model: Ue(currentModel),
    has_1m: has1mTag
  }), He("migration_sonnet45_to_sonnet46");
}
var sonnet45MigrationInit = b(() => {
  cn();
  Ct();
  mo();
  nr();
  si();
  Er();
});
export {migrateSonnet45ToSonnet46 as zfc,sonnet45MigrationInit as jfc};
