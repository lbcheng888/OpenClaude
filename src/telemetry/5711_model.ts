// @ts-nocheck
import {getAPIProvider as Hr,Ps as si} from "../api/1287_usesFirstPartyModelIds.ts";
import {isLegacyModelRemapEnabled as sYe,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getSettingsForSource as Cn,ao,br as Er} from "../config/0745_updateSettingsForSource.ts";
import {saveGlobalConfig as un,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {He,mn as cn} from "./0600_feature_name.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function migrateLegacyOpusModel() {
  if (Hr() !== "firstParty") return;
  if (!sYe()) return;
  let currentModel = Cn("userSettings")?.model;
  if (currentModel !== "claude-opus-4-20250514" && currentModel !== "claude-opus-4-1-20250805" && currentModel !== "claude-opus-4-0" && currentModel !== "claude-opus-4-1") return;
  ao("userSettings", {
    model: "opus"
  }), un(t => ({
    ...t,
    legacyOpusMigrationTimestamp: Date.now()
  })), j("tengu_legacy_opus_migration", {
    from_model: Ue(currentModel)
  }), He("migration_legacy_opus_to_current");
}
var legacyOpusMigrationInit = b(() => {
  cn();
  Ct();
  nr();
  Fo();
  si();
  Er();
});
export {migrateLegacyOpusModel as Nfc,legacyOpusMigrationInit as Ffc};
