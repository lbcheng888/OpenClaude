// @ts-nocheck
import {ft as isFullscreenWithTTY,oo as ro,b} from "../../runtime.ts";
import {zn as Wn} from "../api/0465_getOauthConfig.ts";
import {Wft as qpt,qft as $pt,eml as pil,AAo as Iyo} from "../tui/4534_theme.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {ep as Dp} from "../../vendor/m2223.ts";
import {getInitialSettings,br as yr} from "../config/0745_updateSettingsForSource.ts";
import {lc as bc,tw as KR,mg as Ug} from "../../vendor/m2209.ts";
import {Mbn as eyn,L2 as R4} from "./2222_available.ts";
import {n9 as L9,UY as nJ} from "../config/4246_shouldToolsListOptInToBrief.ts";
import {I1 as hN,lq as Vq} from "../../vendor/m5221.ts";
import {$l as uc,WS as tE} from "../api/1453_month.ts";
import {hasAutoModeOptInAnySource,getAutoModeEnabledState,cy as ly} from "../permissions/5219_verifyAutoModeGateAccess.ts";
import {pae as Aae,oee as aee} from "../session/2699_oee.ts";
import {Vi as ra,$d as Ap} from "../config/0620_$d.ts";
import {hasStoredOAuthToken,lo as Ao} from "../config/2036_withOAuthRefreshLock.ts";
import {J9e as j$e,uS as ab} from "../config/3192_path.ts";
import {Ne as je} from "../../vendor/m583.ts";
import {getAutoUpdaterDisabledReason,tr as Qn} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Ir as Lr} from "../../vendor/m584.ts";
import {IA as Cv} from "../telemetry/2225_names.ts";
var mil = {};
isFullscreenWithTTY(mil, {
  parseConfigShorthand: () => parseConfigShorthand,
  listConfigKeys: () => listConfigKeys,
  getConfigArgumentCompletions: () => getConfigArgumentCompletions,
  applyConfigShorthand: () => applyConfigShorthand,
  _resetSettableConfigKeysForTesting: () => _resetSettableConfigKeysForTesting
});

/**
 * Parse a "key=value" shorthand config string into an array of {key, raw} pairs.
 * Returns null if the input is not a valid shorthand assignment.
 */
function parseConfigShorthand(input: any): any {
  let trimmed = input.trim();
  if (!trimmed || !trimmed.includes("=")) return null;
  let tokens = trimmed.split(/\s+/);
  if (Wn(tokens, (token: any) => token.includes("=")) === 1) {
    // Single assignment: allow spaces in the value portion
    let eqIdx = trimmed.indexOf("=");
    let key = trimmed.slice(0, eqIdx);
    if (!key || /\s/.test(key)) return null;
    return [{
      key: key,
      raw: trimmed.slice(eqIdx + 1)
    }];
  }
  // Multiple key=value pairs separated by whitespace
  let pairs: any[] = [];
  for (let token of tokens) {
    let eqIdx = token.indexOf("=");
    if (eqIdx <= 0) return null;
    pairs.push({
      key: token.slice(0, eqIdx),
      raw: token.slice(eqIdx + 1)
    });
  }
  return pairs;
}

/** Find a config setting by key (case-insensitive). */
function b8p(keyName: any, settingsList: any): any {
  let lower = keyName.toLowerCase();
  return settingsList.find((setting: any) => setting.id.toLowerCase() === lower);
}

/** Apply a list of shorthand config pairs to current settings, returning results per pair. */
function applyConfigShorthand(pairs: any, appContext: any, extraArg: any): any {
  let {
    settings: settingsList
  } = qpt(Pyo(appContext, extraArg));
  return pairs.map(({
    key: key,
    raw: rawValue
  }: any) => C8p(key, rawValue, settingsList));
}

/** Apply a single key=value shorthand to the setting identified by key. */
function C8p(key: any, rawValue: any, settingsList: any): any {
  let matched = b8p(key, settingsList);
  if (logEvent("tengu_config_shorthand", {
    key_hash: Dp(key),
    matched: matched !== void 0
  }), !matched) return {
    ok: !1,
    message: `${key} isn't a /config setting. Run /config to see what's available.`
  };
  let label = "searchText" in matched ? matched.searchText : matched.label;
  if (matched.consentGated) return {
    ok: !1,
    message: `${label} can't be set with key=value — open /config to change it from the panel.`
  };
  switch (matched.type) {
    case "boolean":
      {
        let lowerVal = rawValue.toLowerCase();
        let isTruthy = ["true", "1", "on", "yes"].includes(lowerVal);
        let isFalsy = ["false", "0", "off", "no"].includes(lowerVal);
        if (!isTruthy && !isFalsy) return {
          ok: !1,
          message: `${label} takes true or false, not "${rawValue}".`
        };
        let result = matched.onChange(isTruthy);
        if (result?.error) return {
          ok: !1,
          message: `Couldn't save ${label}: ${result.error.message}`
        };
        return {
          ok: !0,
          message: `Set ${label} to ${isTruthy ? "true" : "false"}`
        };
      }
    case "enum":
    case "managedEnum":
      {
        let coerceFn = matched.type === "managedEnum" ? matched.coerce : void 0;
        if (!matched.options && !coerceFn) return {
          ok: !1,
          message: `${label} can't be set with key=value — use ${E8p.get(matched.id) ?? "/config"}.`
        };
        let coerced = coerceFn ? coerceFn(rawValue) : matched.options?.find((opt: any) => opt.toLowerCase() === rawValue.toLowerCase());
        if (coerced === void 0) {
          let hint = matched.type === "managedEnum" && matched.optionsHint ? ` ${matched.optionsHint}` : "";
          return {
            ok: !1,
            message: matched.options ? `${label} takes one of: ${matched.options.join(", ")}.${hint}` : `${label} doesn't accept "${rawValue}".${hint}`
          };
        }
        let saveResult = matched.onChange(coerced);
        if (saveResult?.error) return {
          ok: !1,
          message: `Couldn't save ${label}: ${saveResult.error.message}`
        };
        return {
          ok: !0,
          message: `Set ${label} to ${coerced}`
        };
      }
  }
}

/** List all settable config keys (non-consent-gated) with their accepted values, sorted. */
function listConfigKeys(appContext: any): any {
  let {
    settings: settingsList
  } = qpt(Pyo(appContext));
  return settingsList.flatMap((setting: any) => {
    if (setting.consentGated) return [];
    let valueSpec = setting.type === "boolean" ? "true|false" : setting.options ? setting.options.join("|") : setting.type === "managedEnum" && setting.coerce ? "<value>" : null;
    return valueSpec ? [`  ${setting.id}=${valueSpec}`] : [];
  }).sort().join(`\n`);
}

/** Return completions for a partial "key=value" argument string. */
function getConfigArgumentCompletions(appContext: any, partial: any): any {
  let allKeys = w8p();
  let eqIdx = partial.indexOf("=");
  if (eqIdx === -1) {
    // Completing the key part
    let lowerPartial = partial.toLowerCase();
    return allKeys.filter((entry: any) => entry.id.toLowerCase().startsWith(lowerPartial)).sort((entryA: any, entryB: any) => entryA.id.localeCompare(entryB.id)).map((entry: any) => ({
      value: `${entry.id}=`,
      description: entry.options?.slice(0, 4).join(" | ") ?? entry.hint,
      isFinal: !1,
      appendSpace: !1
    }));
  }
  // Completing the value part
  let keyPart = partial.slice(0, eqIdx);
  let valuePart = partial.slice(eqIdx + 1).toLowerCase();
  let matchedKey = allKeys.find((entry: any) => entry.id.toLowerCase() === keyPart.toLowerCase());
  if (!matchedKey?.options) return [];
  return matchedKey.options.filter((opt: any) => opt.toLowerCase().startsWith(valuePart)).map((opt: any) => ({
    value: `${matchedKey.id}=${opt}`,
    isFinal: !0
  }));
}

/** Build and cache the list of settable config key descriptors (id, options, hint). */
function w8p(): any {
  if (i6t) return i6t;
  // Provide a minimal stub app context just to enumerate settings
  let stubContext = {
    getAppState: () => ({
      thinkingEnabled: !1,
      verbose: !1,
      mainLoopModel: null,
      fastMode: !1,
      promptSuggestionEnabled: !1,
      awaySummaryEnabled: !1
    }),
    setAppState: () => {},
    options: {
      mcpClients: []
    }
  };
  let {
    settings: settingsList
  } = qpt(Pyo(stubContext));
  return i6t = settingsList.flatMap((setting: any) => {
    if (setting.consentGated) return [];
    let options = setting.type === "boolean" ? ["true", "false"] : "options" in setting && setting.options ? setting.options : void 0;
    if (options || setting.type === "managedEnum" && setting.coerce) return [{
      id: setting.id,
      options: options,
      hint: setting.type === "managedEnum" ? setting.optionsHint : void 0
    }];
    return [];
  }), i6t;
}

/** Reset the cached settable config keys (for testing). */
function _resetSettableConfigKeysForTesting(): any {
  i6t = void 0;
}

/** Build the Pyo (settings context object) from app context and optional theme setter. */
function Pyo(appContext: any, themeCallback?: any): any {
  let appState = appContext.getAppState();
  let initialSettings = getInitialSettings();
  let globalConfig = $pt();
  let disableWorkflows = bc("disableWorkflows", !1);
  let enableWorkflows = bc("enableWorkflows", !1);
  let workflowsToggleable = eyn() && (disableWorkflows.value !== !0 || disableWorkflows.source === "userSettings") && (enableWorkflows.source === "default" || enableWorkflows.source === "userSettings");
  let isBriefEntitled = (L9(), ro(nJ)).isBriefEntitled();
  return {
    globalConfig: globalConfig,
    settingsData: initialSettings,
    themeSetting: globalConfig.theme,
    currentOutputStyle: initialSettings?.outputStyle || hN,
    currentLanguage: initialSettings?.language,
    externalIncludesApproved: !1,
    thinkingEnabled: appState.thinkingEnabled,
    verbose: appState.verbose,
    mainLoopModel: appState.mainLoopModel,
    isFastMode: uc() ? appState.fastMode : !1,
    promptSuggestionEnabled: appState.promptSuggestionEnabled,
    awaySummaryEnabled: appState.awaySummaryEnabled,
    showAutoInDefaultModePicker: hasAutoModeOptInAnySource() || getAutoModeEnabledState() === "enabled",
    showDefaultViewPicker: isBriefEntitled,
    pushTogglesVisible: Aae() && !ra() && hasStoredOAuthToken(),
    isConnectedToIde: j$e(appContext.options.mcpClients),
    isFileCheckpointingAvailable: !je.CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING,
    workflowsToggleable: workflowsToggleable,
    shouldShowExternalIncludesToggle: !1,
    autoUpdaterDisabledReason: getAutoUpdaterDisabledReason(),
    setAppState: (newState: any) => appContext.setAppState(newState),
    setTheme: themeCallback?.setTheme ?? ((theme: any) => KR("theme", theme)),
    ...pil
  };
}
var E8p: any, i6t: any;
/** Module-level lazy-init block: initialise side-effects and build the special-case config key map. */
var h8n = b(() => {
  Iyo();
  Vq();
  Ct();
  aee();
  R4();
  Ao();
  Qn();
  Lr();
  Cv();
  tE();
  ab();
  ly();
  Ap();
  Ug();
  yr();
  E8p = new Map([["agentsView", "/config (Agents view row)"], ["autoUpdatesChannel", "/channel"], ["showExternalIncludesDialog", "/config (External CLAUDE.md row)"]]);
});
export {mil as tml,parseConfigShorthand,b8p as rJp,applyConfigShorthand,C8p as sJp,listConfigKeys,getConfigArgumentCompletions,w8p as aJp,_resetSettableConfigKeysForTesting,Pyo as vAo,E8p as oJp,i6t as D8t,h8n as OVn};
