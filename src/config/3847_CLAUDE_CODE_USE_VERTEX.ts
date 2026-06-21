// @ts-nocheck
import {Eu} from "../../vendor/m3812.ts";
import {EO,Iu} from "../../vendor/m643.ts";
import {getSettingsFilePathForSource,updateSettingsForSource,yr} from "./0740_updateSettingsForSource.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnumOpt} from "../../vendor/m5.ts";
import {Text} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {Bs,rA} from "../../vendor/m2550.ts";
import {nl,v_} from "../../vendor/m2573.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {React,CE} from "../../vendor/m3813.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {$y} from "../../vendor/m3814.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
/** Build the env-variable map for Vertex AI configuration from wizard data. */
function mAp(wizardData: any): any {
  let envMap: any = {
    CLAUDE_CODE_USE_VERTEX: "1",
    CLAUDE_CODE_USE_BEDROCK: void 0,
    CLAUDE_CODE_USE_FOUNDRY: void 0,
    CLAUDE_CODE_USE_ANTHROPIC_AWS: void 0,
    CLAUDE_CODE_USE_MANTLE: void 0,
    ANTHROPIC_VERTEX_PROJECT_ID: wizardData.projectId,
    CLOUD_ML_REGION: wizardData.region,
    GOOGLE_APPLICATION_CREDENTIALS: void 0,
    ANTHROPIC_DEFAULT_SONNET_MODEL: void 0,
    ANTHROPIC_DEFAULT_OPUS_MODEL: void 0,
    ANTHROPIC_DEFAULT_HAIKU_MODEL: void 0,
    ANTHROPIC_DEFAULT_FABLE_MODEL: void 0,
    ANTHROPIC_SMALL_FAST_MODEL: void 0
  };
  // Service account auth: write key file path into credentials env var
  if (wizardData.authMethod === "serviceAccount") envMap.GOOGLE_APPLICATION_CREDENTIALS = wizardData.keyFile;
  if (wizardData.pinSonnet) envMap.ANTHROPIC_DEFAULT_SONNET_MODEL = wizardData.pinSonnet;
  if (wizardData.pinOpus) envMap.ANTHROPIC_DEFAULT_OPUS_MODEL = wizardData.pinOpus;
  if (wizardData.pinFable) envMap.ANTHROPIC_DEFAULT_FABLE_MODEL = wizardData.pinFable;
  if (wizardData.pinHaiku) envMap.ANTHROPIC_DEFAULT_HAIKU_MODEL = wizardData.pinHaiku;
  return envMap;
}

/** Confirmation step of the Vertex AI setup wizard: shows env vars to be written and saves them. */
function wIa(e: any): any {
  let t = vIa.c(29);
  let {
    onComplete: onComplete
  } = e;
  let {
    goBack: goBack,
    wizardData: wizardData
  } = Eu();
  let [errorMsg, setErrorMsg] = FW.useState(null);
  let settingsLabel: any;
  // Memoize the settings file label string
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) settingsLabel = EO(getSettingsFilePathForSource("userSettings") ?? "~/.claude/settings.json"), t[0] = settingsLabel;else settingsLabel = t[0];
  let l = settingsLabel;
  let envMap: any;
  // Recompute env map when wizardData changes
  if (t[1] !== wizardData) envMap = mAp(wizardData), t[1] = wizardData, t[2] = envMap;else envMap = t[2];
  let u = envMap;
  let envEntries: any;
  // Filter out undefined values for display
  if (t[3] !== u) envEntries = Object.entries(u).filter(AAp), t[3] = u, t[4] = envEntries;else envEntries = t[4];
  let p = envEntries;
  let handleConfirm: any;
  // Recompute save handler when relevant wizard fields change
  if (t[5] !== u || t[6] !== onComplete || t[7] !== wizardData.authMethod || t[8] !== wizardData.pinFable || t[9] !== wizardData.pinHaiku || t[10] !== wizardData.pinOpus || t[11] !== wizardData.pinSonnet || t[12] !== wizardData.verifiedIdentity) handleConfirm = () => {
    let {
      error: saveError
    } = updateSettingsForSource("userSettings", {
      env: u
    });
    if (saveError) {
      setErrorMsg(saveError.message);
      return;
    }
    logEvent("tengu_vertex_setup_complete", {
      auth_method: fromEnumOpt(wizardData.authMethod),
      pinned_models: Boolean(wizardData.pinSonnet || wizardData.pinOpus || wizardData.pinFable || wizardData.pinHaiku),
      verified: Boolean(wizardData.verifiedIdentity)
    }), onComplete(`Vertex AI configuration saved to ${l}.${wizardData.authMethod === "adc" ? " When your ADC token expires, run `gcloud auth application-default login` — Claude Code picks up refreshed credentials automatically." : ""}`);
  }, t[5] = u, t[6] = onComplete, t[7] = wizardData.authMethod, t[8] = wizardData.pinFable, t[9] = wizardData.pinHaiku, t[10] = wizardData.pinOpus, t[11] = wizardData.pinSonnet, t[12] = wizardData.verifiedIdentity, t[13] = handleConfirm;else handleConfirm = t[13];
  let f = handleConfirm;
  let headerText: any;
  // Static header element - memo-cached
  if (t[14] === Symbol.for("react.memo_cache_sentinel")) headerText = FW.default.createElement(Text, null, "These will be written to ", l, " under env:"), t[14] = headerText;else headerText = t[14];
  let envList: any;
  // Rerender env list when entries change
  if (t[15] !== p) envList = FW.default.createElement(Box, {
    flexDirection: "column"
  }, p.map(fAp)), t[15] = p, t[16] = envList;else envList = t[16];
  let verifiedBadge: any;
  // Show verified identity badge if available
  if (t[17] !== wizardData.verifiedIdentity) verifiedBadge = wizardData.verifiedIdentity && FW.default.createElement(Text, {
    dimColor: !0
  }, FW.default.createElement(Bs, {
    status: "success",
    withSpace: !0
  }), "Verified as ", wizardData.verifiedIdentity), t[17] = wizardData.verifiedIdentity, t[18] = verifiedBadge;else verifiedBadge = t[18];
  let errorElement: any;
  if (t[19] !== errorMsg) errorElement = FW.default.createElement(nl, {
    error: errorMsg
  }), t[19] = errorMsg, t[20] = errorElement;else errorElement = t[20];
  let confirmButtons: any;
  if (t[21] !== goBack || t[22] !== f) confirmButtons = FW.default.createElement(ac, {
    confirmLabel: "Save",
    cancelLabel: "Cancel",
    onConfirm: f,
    onCancel: goBack
  }), t[21] = goBack, t[22] = f, t[23] = confirmButtons;else confirmButtons = t[23];
  let rootElement: any;
  if (t[24] !== envList || t[25] !== verifiedBadge || t[26] !== errorElement || t[27] !== confirmButtons) rootElement = FW.default.createElement(React, {
    subtitle: "Confirm and save"
  }, FW.default.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, headerText, envList, verifiedBadge, errorElement, confirmButtons)), t[24] = envList, t[25] = verifiedBadge, t[26] = errorElement, t[27] = confirmButtons, t[28] = rootElement;else rootElement = t[28];
  return rootElement;
}

/** Render a single env key=value row for display. */
function fAp(e: any): any {
  let [key, value] = e;
  return FW.default.createElement(Text, {
    key: key
  }, "  ", FW.default.createElement(Text, {
    color: "suggestion"
  }, key), " = ", value);
}

/** Filter predicate: keep only defined env entries. */
function AAp(e: any): boolean {
  return e[1] !== void 0;
}
var vIa: any, FW: any;
var RIa = b(() => {
  ze();
  Ct();
  Iu();
  yr();
  e_();
  v_();
  rA();
  $y();
  CE();
  vIa = M(rt(), 1), FW = M(Te(), 1);
});
export {mAp,wIa,fAp,AAp,vIa,FW,RIa};
