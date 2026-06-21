// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {bst as nst,Vee as Lee,Uke as Eke,Est as rst} from "../telemetry/3337_level.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Qe} from "../../vendor/m5.ts";
import {PrivacySettingsDialog as qCo,GroveDialog as $Co,zvo as jCo} from "./4919_PrivacySettingsDialog.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var Nf4 = {};
pt(Nf4, {
  call: () => call
});
async function call(onDone) {
  if (!(await nst())) return onDone(kf4), null;
  let [groveSettingsResult, groveNoticeResult] = await Promise.all([Lee(), Eke()]);
  if (!groveSettingsResult.success) return onDone(kf4), null;
  let groveSettings = groveSettingsResult.data,
    noticeConfig = groveNoticeResult.success ? groveNoticeResult.data : null;
  async function handleGroveDialogDone(outcome) {
    if (outcome === "escape" || outcome === "defer") {
      onDone("Privacy settings dialog dismissed", {
        display: "system"
      });
      return;
    }
    await refreshAndReport();
  }
  async function refreshAndReport() {
    let updatedResult = await Lee();
    if (!updatedResult.success) {
      onDone("Unable to retrieve updated privacy settings", {
        display: "system"
      });
      return;
    }
    let updatedSettings = updatedResult.data,
      newValueStr = updatedSettings.grove_enabled ? "true" : "false";
    if (onDone(`"Help improve our AI models" set to ${newValueStr}.`), groveSettings.grove_enabled !== null && groveSettings.grove_enabled !== updatedSettings.grove_enabled) j("tengu_grove_policy_toggled", {
      state: updatedSettings.grove_enabled,
      location: Qe("settings")
    });
  }
  if (groveSettings.grove_enabled !== null) return kB_.createElement(qCo, {
    settings: groveSettings,
    domainExcluded: noticeConfig?.domain_excluded,
    onDone: refreshAndReport
  });
  return kB_.createElement($Co, {
    showIfAlreadyViewed: true,
    onDone: handleGroveDialogDone,
    location: "settings"
  });
}
var kB_,
  kf4 = "Review and manage your privacy settings at https://claude.ai/settings/data-privacy-controls";
var Vf4 = b(() => {
  jCo();
  Ct();
  rst();
  kB_ = L(Te(), 1);
});

export {Nf4 as vvl,call as Mim,kB_ as f8t,kf4 as Cvl,Vf4 as wvl};
