// @ts-nocheck
import {isOpus1mMergeEnabled as tC,parseUserSpecifiedModel as gs,getDefaultMainLoopModelSetting as lk,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {getSettingsForSource as Cn,ao,br as Er} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {He,mn as cn} from "./0600_feature_name.ts";
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
export {_s4 as $fc,qs4 as qfc};
