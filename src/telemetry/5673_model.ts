// @ts-nocheck
import {getAPIProvider as Hr,li as si} from "../api/1282_usesFirstPartyModelIds.ts";
import {isLegacyModelRemapEnabled as sYe,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {getSettingsForSource as Cn,updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {Ie as He,ln as cn} from "./0594_feature_name.ts";
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

export {migrateLegacyOpusModel as zsc,legacyOpusMigrationInit as Ysc};
