// @ts-nocheck
import {getInitialSettings,updateSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {isClaudeAISubscriber,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {si,gT} from "../../vendor/m2190.ts";
import {eil,til} from "../../vendor/m4509.ts";
import {kn,SA} from "../config/0689_timestamp.ts";
import {Lb,bt} from "../../vendor/m195.ts";
import {isTmuxControlMode,Ie,Oe,ln} from "./0594_feature_name.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {b} from "../../runtime.ts";
import {kg} from "../../vendor/m129.ts";
import {C0} from "../../vendor/m2262.ts";
import {ca} from "../../vendor/m5.ts";
/** Read agentPushNotifEnabled and inputNeededNotifEnabled from settings, falling back to global config. */
function ail() {
  let initialSettings = getInitialSettings(),
    globalConfig = getGlobalConfig();
  return {
    agentPushNotifEnabled: initialSettings.agentPushNotifEnabled ?? globalConfig.agentPushNotifEnabled,
    inputNeededNotifEnabled: initialSettings.inputNeededNotifEnabled ?? globalConfig.inputNeededNotifEnabled
  };
}

/** Returns true if the current user is a Claude AI subscriber. */
function Eyo() {
  return isClaudeAISubscriber();
}

/** Fetch notification preferences from the server. */
async function h8p() {
  if (!Eyo()) return {
    ok: !1,
    reason: "no_auth"
  };
  try {
    let response = await si.get(lil, {
      timeout: nil
    });
    if (!response.ok) return {
      ok: !1,
      reason: "fetch_failed"
    };
    let parsed = eil().safeParse(response.data);
    if (!parsed.success) return kn("warn", "notif_prefs_fetch_parse_failed", {
      issues: parsed.error.issues.map(issue => issue.path.join(".")).join(",")
    }), {
      ok: !1,
      reason: "parse_failed"
    };
    return {
      ok: !0,
      prefs: parsed.data
    };
  } catch (err) {
    let {
      kind: errKind
    } = Lb(err);
    return kn("warn", "notif_prefs_fetch_failed", {
      kind: errKind
    }), {
      ok: !1,
      reason: "fetch_failed"
    };
  }
}

/** Patch notification preferences on the server based on current local settings. */
async function g8p(body) {
  if (!Eyo()) return;
  try {
    if (!(await si.patch(lil, body, {
      timeout: nil
    })).ok) {
      isTmuxControlMode("notif_prefs_patch", "no_auth");
      return;
    }
    kn("info", "notif_prefs_patch_ok", {}), Ie("notif_prefs_patch");
  } catch (err) {
    let {
      kind: errKind
    } = Lb(err);
    kn("warn", "notif_prefs_patch_failed", {
      kind: errKind
    }), Oe("notif_prefs_patch", "http_error");
  }
}

/** Build and send a patch from local notification settings to the server. */
function Cyo() {
  let localPrefs = ail(),
    featurePreference = {};
  if (typeof localPrefs.agentPushNotifEnabled === "boolean") featurePreference.bogosort = {
    enable_push: localPrefs.agentPushNotifEnabled
  };
  if (typeof localPrefs.inputNeededNotifEnabled === "boolean") featurePreference.code_requires_action = {
    enable_push: localPrefs.inputNeededNotifEnabled
  };
  if (Object.keys(featurePreference).length === 0) return;
  g8p({
    preferences: {
      feature_preference: featurePreference
    }
  });
}

/** Hydrate local notification prefs state from server, seeding unset local settings from server values. */
async function cil() {
  if (!Eyo()) {
    isTmuxControlMode("notif_prefs_hydrate", "no_auth"), o6t.setState(() => null), kn("info", "notif_prefs_hydrate_skipped", {
      reason: "no_auth"
    });
    return;
  }
  let fetchResult = await h8p();
  if (!fetchResult.ok) {
    Oe("notif_prefs_hydrate", fetchResult.reason), o6t.setState(() => null), kn("info", "notif_prefs_hydrate_skipped", {
      reason: fetchResult.reason
    });
    return;
  }
  let serverPrefs = fetchResult.prefs,
    reachability = serverPrefs.push_reachability ?? null;
  if (o6t.setState(() => reachability), reachability) logEvent("tengu_push_reachability", {
    has_active_channel: reachability.has_active_channel,
    platform_count: reachability.platforms.length
  });
  let featurePreference = serverPrefs.preferences?.feature_preference,
    serverBogosort = featurePreference?.bogosort?.enable_push,
    serverCodeRequiresAction = featurePreference?.code_requires_action?.enable_push,
    localPrefs = ail(),
    seedValues = {};
  if (localPrefs.agentPushNotifEnabled === void 0 && typeof serverBogosort === "boolean") seedValues.agentPushNotifEnabled = serverBogosort;
  if (localPrefs.inputNeededNotifEnabled === void 0 && typeof serverCodeRequiresAction === "boolean") seedValues.inputNeededNotifEnabled = serverCodeRequiresAction;
  if (kn("info", "notif_prefs_hydrate_result", {
    has_active_channel: reachability?.has_active_channel,
    server_bogosort: serverBogosort,
    server_code_requires_action: serverCodeRequiresAction,
    seeded: Object.keys(seedValues).length > 0
  }), Object.keys(seedValues).length === 0) {
    Ie("notif_prefs_hydrate");
    return;
  }
  updateSettingsForSource("userSettings", seedValues), ril.emit(), Ie("notif_prefs_hydrate");
}
var nil = 1e4,
  o6t,
  ril,
  oil,
  sil,
  iil,
  lil = "/api/claude_code/notification/preferences";
var s6t = b(() => {
  Ao();
  Qn();
  SA();
  bt();
  yr();
  kg();
  ln();
  Ct();
  gT();
  til();
  o6t = C0(void 0), ril = ca(), oil = o6t.getState, sil = o6t.subscribe, iil = ril.subscribe;
});
export {ail,Eyo,h8p,g8p,Cyo,cil,nil,o6t,ril,oil,sil,iil,lil,s6t};
