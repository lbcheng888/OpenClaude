// @ts-nocheck
import {isOpus1mMergeEnabled as tC,parseUserSpecifiedModel as gs,getDefaultMainLoopModelSetting as lk,Mo as Fo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {getSettingsForSource as Cn,updateSettingsForSource as ao,yr as Er} from "../config/0740_updateSettingsForSource.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Ie as He,ln as cn} from "./0594_feature_name.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function _s4() {
  if (!tC()) return;
  if (Cn("userSettings")?.model !== "opus") return;
  let targetModel = "opus[1m]",
    newModel = gs(targetModel) === gs(lk()) ? undefined : targetModel;
  ao("userSettings", {
    model: newModel
  }), j("tengu_opus_to_opus1m_migration", {}), He("migration_opus_to_opus1m");
}
var qs4 = b(() => {
  cn();
  Ct();
  Fo();
  Er();
});

export {_s4 as Qsc,qs4 as Zsc};
