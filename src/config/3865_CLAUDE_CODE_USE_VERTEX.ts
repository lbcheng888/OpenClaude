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
/** Build the env-variable map for Vertex AI configuration from wizard data. */
function nvp(wizardData: any): any {
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
function Q1a(props: any): any {
  let t = J1a.c(29),
    {
      onComplete: onComplete
    } = props,
    {
      goBack: goBack,
      wizardData: wizardData
    } = iu(),
    [errorMsg, setErrorMsg] = X1a.useState(null),
    settingsLabel: any;
  // Memoize the settings file label string
  if (t[0] === Symbol.for("react.memo_cache_sentinel")) settingsLabel = WP(Xf("userSettings") ?? "~/.claude/settings.json"), t[0] = settingsLabel;else settingsLabel = t[0];
  let l = settingsLabel,
    envMap: any;
  // Recompute env map when wizardData changes
  if (t[1] !== wizardData) envMap = nvp(wizardData), t[1] = wizardData, t[2] = envMap;else envMap = t[2];
  let u = envMap,
    envEntries: any;
  // Filter out undefined values for display
  if (t[3] !== u) envEntries = Object.entries(u).filter(ovp), t[3] = u, t[4] = envEntries;else envEntries = t[4];
  let p = envEntries,
    handleConfirm: any;
  // Recompute save handler when relevant wizard fields change
  if (t[5] !== u || t[6] !== onComplete || t[7] !== wizardData.authMethod || t[8] !== wizardData.pinFable || t[9] !== wizardData.pinHaiku || t[10] !== wizardData.pinOpus || t[11] !== wizardData.pinSonnet || t[12] !== wizardData.verifiedIdentity) handleConfirm = () => {
    let {
      error: saveError
    } = ao("userSettings", {
      env: u
    });
    if (saveError) {
      setErrorMsg(saveError.message);
      return;
    }
    W("tengu_vertex_setup_complete", {
      auth_method: Bo(wizardData.authMethod),
      pinned_models: Boolean(wizardData.pinSonnet || wizardData.pinOpus || wizardData.pinFable || wizardData.pinHaiku),
      verified: Boolean(wizardData.verifiedIdentity)
    }), onComplete(`Vertex AI configuration saved to ${l}.${wizardData.authMethod === "adc" ? " When your ADC token expires, run `gcloud auth application-default login` — Claude Code picks up refreshed credentials automatically." : ""}`);
  }, t[5] = u, t[6] = onComplete, t[7] = wizardData.authMethod, t[8] = wizardData.pinFable, t[9] = wizardData.pinHaiku, t[10] = wizardData.pinOpus, t[11] = wizardData.pinSonnet, t[12] = wizardData.verifiedIdentity, t[13] = handleConfirm;else handleConfirm = t[13];
  let f = handleConfirm,
    headerText: any;
  // Static header element - memo-cached
  if (t[14] === Symbol.for("react.memo_cache_sentinel")) headerText = dY.jsxs(v, {
    children: ["These will be written to ", l, " under env:"]
  }), t[14] = headerText;else headerText = t[14];
  let envList: any;
  // Rerender env list when entries change
  if (t[15] !== p) envList = dY.jsx($, {
    flexDirection: "column",
    children: p.map(rvp)
  }), t[15] = p, t[16] = envList;else envList = t[16];
  let verifiedBadge: any;
  // Show verified identity badge if available
  if (t[17] !== wizardData.verifiedIdentity) verifiedBadge = wizardData.verifiedIdentity && dY.jsxs(v, {
    dimColor: !0,
    children: [dY.jsx(bs, {
      status: "success",
      withSpace: !0
    }), "Verified as ", wizardData.verifiedIdentity]
  }), t[17] = wizardData.verifiedIdentity, t[18] = verifiedBadge;else verifiedBadge = t[18];
  let errorElement: any;
  if (t[19] !== errorMsg) errorElement = dY.jsx(Ba, {
    error: errorMsg
  }), t[19] = errorMsg, t[20] = errorElement;else errorElement = t[20];
  let confirmButtons: any;
  if (t[21] !== goBack || t[22] !== f) confirmButtons = dY.jsx(Bl, {
    confirmLabel: "Save",
    cancelLabel: "Cancel",
    onConfirm: f,
    onCancel: goBack
  }), t[21] = goBack, t[22] = f, t[23] = confirmButtons;else confirmButtons = t[23];
  let rootElement: any;
  if (t[24] !== envList || t[25] !== verifiedBadge || t[26] !== errorElement || t[27] !== confirmButtons) rootElement = dY.jsx(_c, {
    subtitle: "Confirm and save",
    children: dY.jsxs($, {
      flexDirection: "column",
      gap: 1,
      children: [headerText, envList, verifiedBadge, errorElement, confirmButtons]
    })
  }), t[24] = envList, t[25] = verifiedBadge, t[26] = errorElement, t[27] = confirmButtons, t[28] = rootElement;else rootElement = t[28];
  return rootElement;
}
/** Render a single env key=value row for display. */
function rvp(entry: any): any {
  let [key, value] = entry;
  return dY.jsxs(v, {
    children: ["  ", dY.jsx(v, {
      color: "suggestion",
      children: key
    }), " = ", value]
  }, key);
}
/** Filter predicate: keep only defined env entries. */
function ovp(entry: any): boolean {
  return entry[1] !== void 0;
}
var J1a, X1a, dY;
var Z1a = b(() => {
  je();
  kt();
  Tu();
  br();
  d_();
  I_();
  ff();
  Fy();
  PE();
  J1a = x(tt(), 1), X1a = x(et(), 1), dY = x(oe(), 1);
});

export {nvp,Q1a,rvp,ovp,J1a,X1a,dY,Z1a};
