// @ts-nocheck
import {getAPIProvider as Hr,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
import {isProSubscriber as lme,isMaxSubscriber as Woe,isTeamPremiumSubscriber as NEe,Ao as mo} from "../config/2031_withOAuthRefreshLock.ts";
import {getSettingsForSource as Cn,updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {Ie as He,ln as cn} from "./0594_feature_name.ts";
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

export {migrateSonnet45ToSonnet46 as oic,sonnet45MigrationInit as sic};
