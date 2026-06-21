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
function efp(wizardData: any): any {
  let envMap: any = {
    CLAUDE_CODE_USE_BEDROCK: "1",
    CLAUDE_CODE_USE_VERTEX: void 0,
    CLAUDE_CODE_USE_FOUNDRY: void 0,
    CLAUDE_CODE_USE_ANTHROPIC_AWS: void 0,
    AWS_REGION: wizardData.region,
    AWS_PROFILE: void 0,
    AWS_BEARER_TOKEN_BEDROCK: void 0,
    AWS_ACCESS_KEY_ID: void 0,
    AWS_SECRET_ACCESS_KEY: void 0,
    AWS_SESSION_TOKEN: void 0,
    ANTHROPIC_DEFAULT_SONNET_MODEL: void 0,
    ANTHROPIC_DEFAULT_OPUS_MODEL: void 0,
    ANTHROPIC_DEFAULT_HAIKU_MODEL: void 0,
    ANTHROPIC_DEFAULT_FABLE_MODEL: void 0,
    ANTHROPIC_SMALL_FAST_MODEL: void 0
  };
  switch (wizardData.authMethod) {
    case "profile":
      envMap.AWS_PROFILE = wizardData.awsProfile;
      break;
    case "bearer":
      envMap.AWS_BEARER_TOKEN_BEDROCK = wizardData.bearerToken;
      break;
    case "accessKey":
      if (envMap.AWS_ACCESS_KEY_ID = wizardData.accessKeyId, envMap.AWS_SECRET_ACCESS_KEY = wizardData.secretAccessKey, wizardData.sessionToken) envMap.AWS_SESSION_TOKEN = wizardData.sessionToken;
      break;
    case "environment":
    case void 0:
      break;
  }
  if (wizardData.pinSonnet) envMap.ANTHROPIC_DEFAULT_SONNET_MODEL = wizardData.pinSonnet;
  if (wizardData.pinOpus) envMap.ANTHROPIC_DEFAULT_OPUS_MODEL = wizardData.pinOpus;
  if (wizardData.pinFable) envMap.ANTHROPIC_DEFAULT_FABLE_MODEL = wizardData.pinFable;
  if (wizardData.pinHaiku) envMap.ANTHROPIC_DEFAULT_HAIKU_MODEL = wizardData.pinHaiku;
  return envMap;
}
function yHa(props: any): any {
  let memoCache: any = _Ha.c(30),
    {
      onComplete: onComplete
    } = props,
    {
      goBack: goBack,
      wizardData: wizardData
    } = Eu(),
    [errorMsg, setErrorMsg] = h6.useState(null),
    settingsFilePath: any;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) settingsFilePath = EO(getSettingsFilePathForSource("userSettings") ?? "~/.claude/settings.json"), memoCache[0] = settingsFilePath;else settingsFilePath = memoCache[0];
  let displayPath = settingsFilePath,
    envVarMap: any;
  if (memoCache[1] !== wizardData) envVarMap = efp(wizardData), memoCache[1] = wizardData, memoCache[2] = envVarMap;else envVarMap = memoCache[2];
  let computedEnvVars = envVarMap,
    filteredEntries: any;
  if (memoCache[3] !== computedEnvVars) filteredEntries = Object.entries(computedEnvVars).filter(rfp), memoCache[3] = computedEnvVars, memoCache[4] = filteredEntries;else filteredEntries = memoCache[4];
  let envEntries = filteredEntries,
    saveHandler: any;
  if (memoCache[5] !== computedEnvVars || memoCache[6] !== onComplete || memoCache[7] !== wizardData.authMethod || memoCache[8] !== wizardData.awsProfile || memoCache[9] !== wizardData.pinFable || memoCache[10] !== wizardData.pinHaiku || memoCache[11] !== wizardData.pinOpus || memoCache[12] !== wizardData.pinSonnet || memoCache[13] !== wizardData.verifiedIdentity) saveHandler = () => {
    let {
      error: saveError
    } = updateSettingsForSource("userSettings", {
      env: computedEnvVars
    });
    if (saveError) {
      setErrorMsg(saveError.message);
      return;
    }
    logEvent("tengu_bedrock_setup_complete", {
      auth_method: fromEnumOpt(wizardData.authMethod),
      pinned_models: Boolean(wizardData.pinSonnet || wizardData.pinOpus || wizardData.pinFable || wizardData.pinHaiku),
      verified: Boolean(wizardData.verifiedIdentity)
    }), onComplete(`Bedrock configuration saved to ${displayPath}.${wizardData.authMethod === "profile" ? ` When your SSO session expires (typically 8 hours), run \`aws sso login --profile ${wizardData.awsProfile}\` \u2014 Claude Code picks up refreshed credentials automatically.` : ""}`);
  }, memoCache[5] = computedEnvVars, memoCache[6] = onComplete, memoCache[7] = wizardData.authMethod, memoCache[8] = wizardData.awsProfile, memoCache[9] = wizardData.pinFable, memoCache[10] = wizardData.pinHaiku, memoCache[11] = wizardData.pinOpus, memoCache[12] = wizardData.pinSonnet, memoCache[13] = wizardData.verifiedIdentity, memoCache[14] = saveHandler;else saveHandler = memoCache[14];
  let confirmSave = saveHandler,
    headerText: any;
  if (memoCache[15] === Symbol.for("react.memo_cache_sentinel")) headerText = h6.default.createElement(Text, null, "These will be written to ", displayPath, " under env:"), memoCache[15] = headerText;else headerText = memoCache[15];
  let envEntriesList: any;
  if (memoCache[16] !== envEntries) envEntriesList = h6.default.createElement(Box, {
    flexDirection: "column"
  }, envEntries.map(nfp)), memoCache[16] = envEntries, memoCache[17] = envEntriesList;else envEntriesList = memoCache[17];
  let verifiedBadge: any;
  if (memoCache[18] !== wizardData.verifiedIdentity) verifiedBadge = wizardData.verifiedIdentity && h6.default.createElement(Text, {
    dimColor: !0
  }, h6.default.createElement(Bs, {
    status: "success",
    withSpace: !0
  }), "Verified as ", wizardData.verifiedIdentity), memoCache[18] = wizardData.verifiedIdentity, memoCache[19] = verifiedBadge;else verifiedBadge = memoCache[19];
  let errorElement: any;
  if (memoCache[20] !== errorMsg) errorElement = h6.default.createElement(nl, {
    error: errorMsg
  }), memoCache[20] = errorMsg, memoCache[21] = errorElement;else errorElement = memoCache[21];
  let actionBar: any;
  if (memoCache[22] !== goBack || memoCache[23] !== confirmSave) actionBar = h6.default.createElement(ac, {
    confirmLabel: "Save",
    cancelLabel: "Cancel",
    onConfirm: confirmSave,
    onCancel: goBack
  }), memoCache[22] = goBack, memoCache[23] = confirmSave, memoCache[24] = actionBar;else actionBar = memoCache[24];
  let panel: any;
  if (memoCache[25] !== envEntriesList || memoCache[26] !== verifiedBadge || memoCache[27] !== errorElement || memoCache[28] !== actionBar) panel = h6.default.createElement(React, {
    subtitle: "Confirm and save"
  }, h6.default.createElement(Box, {
    flexDirection: "column",
    gap: 1
  }, headerText, envEntriesList, verifiedBadge, errorElement, actionBar)), memoCache[25] = envEntriesList, memoCache[26] = verifiedBadge, memoCache[27] = errorElement, memoCache[28] = actionBar, memoCache[29] = panel;else panel = memoCache[29];
  return panel;
}
function nfp(entry: any): any {
  let [key, value] = entry;
  return h6.default.createElement(Text, {
    key: key
  }, "  ", h6.default.createElement(Text, {
    color: "suggestion"
  }, key), " =", " ", tfp.has(key) ? h6.default.createElement(Text, {
    dimColor: !0
  }, "(hidden)") : value);
}
function rfp(entry: any): any {
  return entry[1] !== void 0;
}
var _Ha: any, h6: any, tfp: any;
var THa = b(() => {
  ze();
  Ct();
  Iu();
  yr();
  e_();
  v_();
  rA();
  $y();
  CE();
  _Ha = M(rt(), 1), h6 = M(Te(), 1);
  tfp = new Set(["AWS_BEARER_TOKEN_BEDROCK", "AWS_SECRET_ACCESS_KEY", "AWS_SESSION_TOKEN"]);
});
export {efp,yHa,nfp,rfp,_Ha,h6,tfp,THa};
