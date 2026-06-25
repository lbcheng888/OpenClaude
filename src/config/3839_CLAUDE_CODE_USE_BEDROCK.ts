// @ts-nocheck
import {iu} from "../../vendor/m3830.ts";
import {WP,Tu} from "../../vendor/m649.ts";
import {getSettingsFilePathForSource as Xf,ao,br} from "./0745_updateSettingsForSource.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Bo} from "../../vendor/m5.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {bs,ff} from "../../vendor/m2561.ts";
import {Ba,I_} from "../../vendor/m2584.ts";
import {Bl,d_} from "../../vendor/m3354.ts";
import {_c,PE} from "../../vendor/m3831.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Fy} from "../../vendor/m3832.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Builds the environment-variable map written to user settings when configuring
 * Claude Code to use Amazon Bedrock as the model provider.
 *
 * Sets CLAUDE_CODE_USE_BEDROCK and the appropriate AWS auth credentials based on
 * the chosen auth method, plus any pinned model overrides.
 */
function WAp(wizardData: any): any {
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
/**
 * Wizard confirmation screen: shows the Bedrock env vars that will be persisted,
 * an optional verified-identity badge, and Save/Cancel actions that write the
 * settings file and emit the setup-complete telemetry event.
 */
function WMa(props: any): any {
  let memoCache: any = $Ma.c(30),
    {
      onComplete: onComplete
    } = props,
    {
      goBack: goBack,
      wizardData: wizardData
    } = iu(),
    [errorMsg, setErrorMsg] = qMa.useState(null),
    settingsFilePath: any;
  if (memoCache[0] === Symbol.for("react.memo_cache_sentinel")) settingsFilePath = WP(Xf("userSettings") ?? "~/.claude/settings.json"), memoCache[0] = settingsFilePath;else settingsFilePath = memoCache[0];
  let displayPath = settingsFilePath,
    envVarMap: any;
  if (memoCache[1] !== wizardData) envVarMap = WAp(wizardData), memoCache[1] = wizardData, memoCache[2] = envVarMap;else envVarMap = memoCache[2];
  let computedEnvVars = envVarMap,
    filteredEntries: any;
  if (memoCache[3] !== computedEnvVars) filteredEntries = Object.entries(computedEnvVars).filter(KAp), memoCache[3] = computedEnvVars, memoCache[4] = filteredEntries;else filteredEntries = memoCache[4];
  let envEntries = filteredEntries,
    saveHandler: any;
  if (memoCache[5] !== computedEnvVars || memoCache[6] !== onComplete || memoCache[7] !== wizardData.authMethod || memoCache[8] !== wizardData.awsProfile || memoCache[9] !== wizardData.pinFable || memoCache[10] !== wizardData.pinHaiku || memoCache[11] !== wizardData.pinOpus || memoCache[12] !== wizardData.pinSonnet || memoCache[13] !== wizardData.verifiedIdentity) saveHandler = () => {
    let {
      error: saveError
    } = ao("userSettings", {
      env: computedEnvVars
    });
    if (saveError) {
      setErrorMsg(saveError.message);
      return;
    }
    W("tengu_bedrock_setup_complete", {
      auth_method: Bo(wizardData.authMethod),
      pinned_models: Boolean(wizardData.pinSonnet || wizardData.pinOpus || wizardData.pinFable || wizardData.pinHaiku),
      verified: Boolean(wizardData.verifiedIdentity)
    }), onComplete(`Bedrock configuration saved to ${displayPath}.${wizardData.authMethod === "profile" ? ` When your SSO session expires (typically 8 hours), run \`aws sso login --profile ${wizardData.awsProfile}\` — Claude Code picks up refreshed credentials automatically.` : ""}`);
  }, memoCache[5] = computedEnvVars, memoCache[6] = onComplete, memoCache[7] = wizardData.authMethod, memoCache[8] = wizardData.awsProfile, memoCache[9] = wizardData.pinFable, memoCache[10] = wizardData.pinHaiku, memoCache[11] = wizardData.pinOpus, memoCache[12] = wizardData.pinSonnet, memoCache[13] = wizardData.verifiedIdentity, memoCache[14] = saveHandler;else saveHandler = memoCache[14];
  let confirmSave = saveHandler,
    headerText: any;
  if (memoCache[15] === Symbol.for("react.memo_cache_sentinel")) headerText = nG.jsxs(v, {
    children: ["These will be written to ", displayPath, " under env:"]
  }), memoCache[15] = headerText;else headerText = memoCache[15];
  let envEntriesList: any;
  if (memoCache[16] !== envEntries) envEntriesList = nG.jsx($, {
    flexDirection: "column",
    children: envEntries.map(VAp)
  }), memoCache[16] = envEntries, memoCache[17] = envEntriesList;else envEntriesList = memoCache[17];
  let verifiedBadge: any;
  if (memoCache[18] !== wizardData.verifiedIdentity) verifiedBadge = wizardData.verifiedIdentity && nG.jsxs(v, {
    dimColor: !0,
    children: [nG.jsx(bs, {
      status: "success",
      withSpace: !0
    }), "Verified as ", wizardData.verifiedIdentity]
  }), memoCache[18] = wizardData.verifiedIdentity, memoCache[19] = verifiedBadge;else verifiedBadge = memoCache[19];
  let errorElement: any;
  if (memoCache[20] !== errorMsg) errorElement = nG.jsx(Ba, {
    error: errorMsg
  }), memoCache[20] = errorMsg, memoCache[21] = errorElement;else errorElement = memoCache[21];
  let actionBar: any;
  if (memoCache[22] !== goBack || memoCache[23] !== confirmSave) actionBar = nG.jsx(Bl, {
    confirmLabel: "Save",
    cancelLabel: "Cancel",
    onConfirm: confirmSave,
    onCancel: goBack
  }), memoCache[22] = goBack, memoCache[23] = confirmSave, memoCache[24] = actionBar;else actionBar = memoCache[24];
  let panel: any;
  if (memoCache[25] !== envEntriesList || memoCache[26] !== verifiedBadge || memoCache[27] !== errorElement || memoCache[28] !== actionBar) panel = nG.jsx(_c, {
    subtitle: "Confirm and save",
    children: nG.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [headerText, envEntriesList, verifiedBadge, errorElement, actionBar]
    })
  }), memoCache[25] = envEntriesList, memoCache[26] = verifiedBadge, memoCache[27] = errorElement, memoCache[28] = actionBar, memoCache[29] = panel;else panel = memoCache[29];
  return panel;
}
/** Renders one "KEY = value" line for the env-var list, masking sensitive keys. */
function VAp(entry: any): any {
  let [key, value] = entry;
  return nG.jsxs(v, {
    children: ["  ", nG.jsx(v, {
      color: "suggestion",
      children: key
    }), " =", " ", GAp.has(key) ? nG.jsx(v, {
      dimColor: !0,
      children: "(hidden)"
    }) : value]
  }, key);
}
/** Filter predicate: keep only env entries whose value is defined. */
function KAp(entry: any): any {
  return entry[1] !== void 0;
}
var $Ma: any, qMa: any, nG: any, GAp: any;
var GMa = b(() => {
  je();
  kt();
  Tu();
  br();
  d_();
  I_();
  ff();
  Fy();
  PE();
  $Ma = x(tt(), 1), qMa = x(et(), 1), nG = x(oe(), 1);
  GAp = new Set(["AWS_BEARER_TOKEN_BEDROCK", "AWS_SECRET_ACCESS_KEY", "AWS_SESSION_TOKEN"]);
});

export {WAp,WMa,VAp,KAp,$Ma,qMa,nG as isTerminalStatus,GAp,GMa};
